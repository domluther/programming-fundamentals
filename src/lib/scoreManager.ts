export interface LevelInfo {
	emoji: string;
	title: string;
	description: string;
	minPoints: number;
	minAccuracy: number;
}

export interface DetailedStats {
	correct: number;
	total: number;
}

export interface ModeStats {
	score: number;
	streak: number;
	totalQuestions: number;
	correctAnswers: number;
	recordStreak: number;
	detailed: Record<string, DetailedStats>;
}

export interface ScoreData {
	datatypes: ModeStats;
	constructs: ModeStats;
	operators: ModeStats;
	champion: ModeStats;
}

const blankScoreData: ScoreData = {
	datatypes: {
		score: 0,
		streak: 0,
		totalQuestions: 0,
		correctAnswers: 0,
		recordStreak: 0,
		detailed: {
			character: { correct: 0, total: 0 },
			string: { correct: 0, total: 0 },
			integer: { correct: 0, total: 0 },
			float: { correct: 0, total: 0 },
			boolean: { correct: 0, total: 0 }
		}
	},
	constructs: {
		score: 0,
		streak: 0,
		totalQuestions: 0,
		correctAnswers: 0,
		recordStreak: 0,
		detailed: {
			sequence: { correct: 0, total: 0 },
			'selection-sequence': { correct: 0, total: 0 },
			'iteration-sequence': { correct: 0, total: 0 },
			'all-three': { correct: 0, total: 0 }
		}
	},
	operators: {
		score: 0,
		streak: 0,
		totalQuestions: 0,
		correctAnswers: 0,
		recordStreak: 0,
		detailed: {
			addition: { correct: 0, total: 0 },
			subtraction: { correct: 0, total: 0 },
			multiplication: { correct: 0, total: 0 },
			division: { correct: 0, total: 0 },
			modulo: { correct: 0, total: 0 },
			'integer-division': { correct: 0, total: 0 },
			exponentiation: { correct: 0, total: 0 },
			comparison: { correct: 0, total: 0 },
			mixed: { correct: 0, total: 0 }
		}
	},
	champion: {
		score: 0,
		streak: 0,
		totalQuestions: 0,
		correctAnswers: 0,
		recordStreak: 0,
		detailed: {
			datatypes: { correct: 0, total: 0 },
			constructs: { correct: 0, total: 0 },
			operators: { correct: 0, total: 0 }
		}
	}
};

export class ScoreManager {
	private storageKey: string;
	private scores: ScoreData = blankScoreData;
	private levels: LevelInfo[];
	private currentMode: 'datatypes' | 'constructs' | 'operators' | 'champion' = 'datatypes';

	// Default generic levels that can be used as fallback
	private static readonly DEFAULT_LEVELS: LevelInfo[] = [
		{
			emoji: "🥚",
			title: "Beginner",
			description: "Just getting started!",
			minPoints: 0,
			minAccuracy: 0,
		},
		{
			emoji: "🐣",
			title: "Novice",
			description: "Making progress!",
			minPoints: 5,
			minAccuracy: 0,
		},
		{
			emoji: "🐤",
			title: "Learner",
			description: "Building confidence!",
			minPoints: 12,
			minAccuracy: 60,
		},
		{
			emoji: "🦆",
			title: "Skilled",
			description: "Getting the hang of it!",
			minPoints: 25,
			minAccuracy: 70,
		},
		{
			emoji: "🦆✨",
			title: "Expert",
			description: "Impressive skills!",
			minPoints: 50,
			minAccuracy: 80,
		},
		{
			emoji: "🪿👑",
			title: "Master",
			description: "Absolute mastery achieved!",
			minPoints: 75,
			minAccuracy: 90,
		},
	];

	constructor(customLevels?: LevelInfo[]) {
		this.storageKey = `programming-fundamentals-stats`;
		this.levels = customLevels || ScoreManager.DEFAULT_LEVELS;
		this.scores = this.loadScores();
	}

	private loadScores(): ScoreData {
		try {
			const stored = localStorage.getItem(this.storageKey);
			if (stored) {
				const parsedStats = JSON.parse(stored);
				return this.mergeStatsWithDefaults(parsedStats, blankScoreData);
			}
			return { ...blankScoreData };
		} catch (error) {
			console.warn("Error loading scores:", error);
			return { ...blankScoreData };
		}
	}

	private mergeStatsWithDefaults(savedStats: any, defaultStats: ScoreData): ScoreData {
		const merged = JSON.parse(JSON.stringify(defaultStats)); // Deep clone defaults
		
		// Merge each mode
		for (const mode in savedStats) {
			if (merged[mode as keyof ScoreData]) {
				// Merge basic stats
				merged[mode as keyof ScoreData].score = savedStats[mode].score || 0;
				merged[mode as keyof ScoreData].streak = savedStats[mode].streak || 0;
				merged[mode as keyof ScoreData].totalQuestions = savedStats[mode].totalQuestions || 0;
				merged[mode as keyof ScoreData].correctAnswers = savedStats[mode].correctAnswers || 0;
				merged[mode as keyof ScoreData].recordStreak = savedStats[mode].recordStreak || 0;
				
				// Merge detailed stats if they exist
				if (savedStats[mode].detailed && merged[mode as keyof ScoreData].detailed) {
					for (const category in savedStats[mode].detailed) {
						if (merged[mode as keyof ScoreData].detailed[category]) {
							merged[mode as keyof ScoreData].detailed[category].correct = savedStats[mode].detailed[category].correct || 0;
							merged[mode as keyof ScoreData].detailed[category].total = savedStats[mode].detailed[category].total || 0;
						}
					}
				}
			}
		}
		
		return merged;
	}

	private saveScores(): void {
		try {
			localStorage.setItem(this.storageKey, JSON.stringify(this.scores));
		} catch (error) {
			console.warn("Error saving scores:", error);
		}
	}

	setCurrentMode(mode: 'datatypes' | 'constructs' | 'operators' | 'champion'): void {
		this.currentMode = mode;
	}

	getStreak(mode?: 'datatypes' | 'constructs' | 'operators' | 'champion'): number {
		const modeToUse = mode || this.currentMode;
		return this.scores[modeToUse].streak;
	}

	resetStreak(mode?: 'datatypes' | 'constructs' | 'operators' | 'champion'): void {
		const modeToUse = mode || this.currentMode;
		this.scores[modeToUse].streak = 0;
		this.saveScores();
	}

	recordScore(isCorrect: boolean, questionType: string, mode?: 'datatypes' | 'constructs' | 'operators' | 'champion'): void {
		if (!this.scores) {
			this.scores = { ...blankScoreData };
		}

		const modeToUse = mode || this.currentMode;
		const currentStats = this.scores[modeToUse];
		
		currentStats.totalQuestions++;

		// In champion mode, also update the original mode's main stats
		let originalModeStats = null;
		if (modeToUse === 'champion') {
			// Extract the actual mode from questionType (e.g., "datatypes-character" -> "datatypes")
			const actualMode = questionType.split('-')[0] as 'datatypes' | 'constructs' | 'operators';
			originalModeStats = this.scores[actualMode];
			originalModeStats.totalQuestions++;
		}

		// Track detailed stats based on question type
		this.trackDetailedStats(questionType, isCorrect, modeToUse);

		if (isCorrect) {
			currentStats.correctAnswers++;
			currentStats.score++;
			currentStats.streak++;
			if (currentStats.streak > currentStats.recordStreak) {
				currentStats.recordStreak = currentStats.streak;
			}
			
			// In champion mode, also update the original mode's main stats
			if (originalModeStats) {
				originalModeStats.correctAnswers++;
				originalModeStats.score++;
				originalModeStats.streak++;
				if (originalModeStats.streak > originalModeStats.recordStreak) {
					originalModeStats.recordStreak = originalModeStats.streak;
				}
			}
		} else {
			currentStats.streak = 0;
			
			// In champion mode, also reset the original mode's streak
			if (originalModeStats) {
				originalModeStats.streak = 0;
			}
		}

		this.saveScores();
	}

	private trackDetailedStats(questionType: string, isCorrect: boolean, mode: 'datatypes' | 'constructs' | 'operators' | 'champion'): void {
		if (mode === 'champion') {
			// In champion mode, track stats in both champion mode AND the original mode
			const championStats = this.scores['champion'];
			const actualMode = questionType.split('-')[0] as 'datatypes' | 'constructs' | 'operators';
			const originalModeStats = this.scores[actualMode];

			// Track in champion mode breakdown
			if (championStats.detailed[actualMode]) {
				championStats.detailed[actualMode].total++;
				if (isCorrect) {
					championStats.detailed[actualMode].correct++;
				}
			}

			// Track in original mode's detailed stats
			let categoryKey = this.extractCategoryKey(questionType, actualMode);

			if (categoryKey && originalModeStats.detailed[categoryKey]) {
				originalModeStats.detailed[categoryKey].total++;
				if (isCorrect) {
					originalModeStats.detailed[categoryKey].correct++;
				}
			}
		} else {
			// Regular mode tracking
			const currentStats = this.scores[mode];
			let categoryKey = this.extractCategoryKey(questionType, mode);

			if (categoryKey && currentStats.detailed[categoryKey]) {
				currentStats.detailed[categoryKey].total++;
				if (isCorrect) {
					currentStats.detailed[categoryKey].correct++;
				}
			}
		}
	}

	private extractCategoryKey(questionType: string, mode: 'datatypes' | 'constructs' | 'operators'): string {
		const parts = questionType.split('-');
		
		if (mode === 'datatypes') {
			// For datatypes, the category is the second part (e.g., "datatypes-character" -> "character")
			return parts[1] || '';
		} else if (mode === 'constructs') {
			// For constructs, build the category from construct combinations
			if (parts.length > 1) {
				const constructs = parts.slice(1).sort();
				if (constructs.length === 1) {
					return constructs[0];
				} else if (constructs.length === 2) {
					return constructs.join('-');
				} else if (constructs.length === 3) {
					return 'all-three';
				}
			}
			return '';
		} else if (mode === 'operators') {
			// For operators, the category is the second part (e.g., "operators-addition" -> "addition")
			return parts[1] || '';
		}
		
		return '';
	}

	getOverallStats(): {
		totalAttempts: number;
		totalCorrect: number;
		accuracy: number;
		totalPoints: number;
		currentLevel: LevelInfo;
		progress: number;
		nextLevel: LevelInfo | null;
		streak: number;
	} {
		// Calculate overall stats from all modes
		let totalAttempts = 0;
		let totalCorrect = 0;
		let currentModeStreak = 0;

		Object.values(this.scores).forEach(stats => {
			totalAttempts += stats.totalQuestions;
			totalCorrect += stats.correctAnswers;
		});

		// Use current mode's streak
		currentModeStreak = this.scores[this.currentMode].streak;

		const totalPoints = totalCorrect;
		const accuracy = totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0;

		// Find current level
		let currentLevel = this.levels[0];
		for (let i = this.levels.length - 1; i >= 0; i--) {
			const level = this.levels[i];
			if (totalPoints >= level.minPoints && accuracy >= level.minAccuracy) {
				currentLevel = level;
				break;
			}
		}

		// Find next level
		const currentLevelIndex = this.levels.indexOf(currentLevel);
		const nextLevel =
			currentLevelIndex < this.levels.length - 1
				? this.levels[currentLevelIndex + 1]
				: null;

		// Calculate progress to next level
		let progress = 100;
		if (nextLevel) {
			const pointsProgress = Math.min(
				100,
				(totalPoints / nextLevel.minPoints) * 100,
			);
			const accuracyProgress = Math.min(
				100,
				(accuracy / nextLevel.minAccuracy) * 100,
			);
			progress = Math.min(pointsProgress, accuracyProgress);
		}

		return {
			totalAttempts,
			totalCorrect,
			accuracy,
			totalPoints,
			currentLevel,
			progress,
			nextLevel,
			streak: currentModeStreak,
		};
	}

	getModeStats(mode: 'datatypes' | 'constructs' | 'operators' | 'champion'): ModeStats {
		return this.scores[mode];
	}

	getAllModeStats(): ScoreData {
		return this.scores;
	}

	getScoresByType(): Record<
		string,
		{ attempts: number; correct: number; accuracy: number }
	> {
		const typeStats: Record<
			string,
			{ attempts: number; correct: number; accuracy: number }
		> = {};

		// For the new structure, we'll return mode-based stats
		Object.entries(this.scores).forEach(([mode, stats]) => {
			const modeTitle = this.getModeTitle(mode as 'datatypes' | 'constructs' | 'operators' | 'champion');
			typeStats[modeTitle] = {
				attempts: stats.totalQuestions,
				correct: stats.correctAnswers,
				accuracy: stats.totalQuestions > 0 ? (stats.correctAnswers / stats.totalQuestions) * 100 : 0
			};
		});

		return typeStats;
	}

	private getModeTitle(mode: 'datatypes' | 'constructs' | 'operators' | 'champion'): string {
		const titles = {
			datatypes: 'Data Types',
			constructs: 'Constructs', 
			operators: 'Operators',
			champion: 'Champion'
		};
		return titles[mode];
	}

	resetAllScores(): void {
		this.scores = { ...blankScoreData };
		this.saveScores();
	}

	formatStreakEmojis(streak: number): string {
		if (streak === 0) return "";

		const denominations = [
			{ value: 50, emoji: "🪿" }, // Golden Goose for 50s
			{ value: 25, emoji: "🦅" }, // Eagle for 25s
			{ value: 10, emoji: "🦢" }, // Swan for 10s
			{ value: 5, emoji: "🦆" }, // Duck for 5s
			{ value: 1, emoji: "🐤" }, // Duckling for 1s
		];

		let result = "";
		let remaining = streak;

		for (const { value, emoji } of denominations) {
			const count = Math.floor(remaining / value);
			if (count > 0) {
				result += emoji.repeat(count);
				remaining -= count * value;
			}
		}

		return result;
	}
}
