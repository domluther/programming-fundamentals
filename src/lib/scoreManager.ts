export interface LevelInfo {
	emoji: string;
	title: string;
	description: string;
	minPoints: number;
	minAccuracy: number;
}

export interface DetailedStats {
	attempts: number;
	correct: number;
}

export interface ModeStats {
	attempts: number;
	correct: number;
	streak: number;
	recordStreak: number;
	detailed: Record<string, DetailedStats>;
}

export type Mode =
	| "Data Types"
	| "Constructs"
	| "Operators"
	| "Keywords"
	| "Champion";

export interface ScoreData {
	"Data Types": ModeStats;
	Constructs: ModeStats;
	Operators: ModeStats;
	Keywords: ModeStats;
	Champion: ModeStats;
}

const blankScoreData: ScoreData = {
	"Data Types": {
		attempts: 0,
		correct: 0,
		streak: 0,
		recordStreak: 0,
		detailed: {
			character: { correct: 0, attempts: 0 },
			string: { correct: 0, attempts: 0 },
			integer: { correct: 0, attempts: 0 },
			float: { correct: 0, attempts: 0 },
			boolean: { correct: 0, attempts: 0 },
		},
	},
	Constructs: {
		attempts: 0,
		correct: 0,
		streak: 0,
		recordStreak: 0,
		detailed: {
			sequence: { correct: 0, attempts: 0 },
			"Sequence & Selection": { correct: 0, attempts: 0 },
			"Sequence & Iteration": { correct: 0, attempts: 0 },
			"Sequence, Selection & Iteration": { correct: 0, attempts: 0 },
		},
	},
	Operators: {
		attempts: 0,
		correct: 0,
		streak: 0,
		recordStreak: 0,
		detailed: {
			addition: { correct: 0, attempts: 0 },
			subtraction: { correct: 0, attempts: 0 },
			multiplication: { correct: 0, attempts: 0 },
			division: { correct: 0, attempts: 0 },
			modulo: { correct: 0, attempts: 0 },
			"integer-division": { correct: 0, attempts: 0 },
			exponentiation: { correct: 0, attempts: 0 },
			comparison: { correct: 0, attempts: 0 },
			mixed: { correct: 0, attempts: 0 },
		},
	},
	Keywords: {
		attempts: 0,
		correct: 0,
		streak: 0,
		recordStreak: 0,
		detailed: {
			"identify-variable": { correct: 0, attempts: 0 },
			"find-concatenation": { correct: 0, attempts: 0 },
			"find-casting": { correct: 0, attempts: 0 },
			"identify-casting": { correct: 0, attempts: 0 },
			"identify-arithmetic-operator": { correct: 0, attempts: 0 },
			"identify-comparison-operator": { correct: 0, attempts: 0 },
		},
	},
	Champion: {
		attempts: 0,
		correct: 0,
		streak: 0,
		recordStreak: 0,
		detailed: {
			"Data Types": { correct: 0, attempts: 0 },
			Constructs: { correct: 0, attempts: 0 },
			Operators: { correct: 0, attempts: 0 },
			Keywords: { correct: 0, attempts: 0 },
		},
	},
};

export class ScoreManager {
	private storageKey: string;
	private scores: ScoreData = blankScoreData;
	private levels: LevelInfo[];
	private currentMode: Mode = "Data Types";

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
				const parsedScores = JSON.parse(stored);

				// Validate and migrate the score data structure
				const validatedScores = this.validateAndMigrateScores(parsedScores);
				return validatedScores;
			}
			// Return a deep copy to avoid mutations affecting the constant
			return JSON.parse(JSON.stringify(blankScoreData));
		} catch (error) {
			console.warn("Error loading scores:", error);
			return JSON.parse(JSON.stringify(blankScoreData));
		}
	}

	/**
	 * Validates the score data structure and adds missing modes if needed
	 */
	private validateAndMigrateScores(scores: unknown): ScoreData {
		try {
			// Type guard: ensure scores is an object
			if (!scores || typeof scores !== "object") {
				console.warn("Invalid scores format, returning blank");
				return JSON.parse(JSON.stringify(blankScoreData));
			}

			// Cast to a record type for safe access
			const scoresRecord = scores as Record<string, unknown>;

			// Check if all required modes exist
			const requiredModes: Mode[] = [
				"Data Types",
				"Constructs",
				"Operators",
				"Keywords",
				"Champion",
			];
			const blank = JSON.parse(JSON.stringify(blankScoreData)) as ScoreData;

			for (const mode of requiredModes) {
				const modeData = scoresRecord[mode];
				// If mode doesn't exist or is invalid, use blank data for that mode
				if (
					!modeData ||
					typeof modeData !== "object" ||
					typeof (modeData as Record<string, unknown>).streak !== "number" ||
					typeof (modeData as Record<string, unknown>).attempts !== "number" ||
					typeof (modeData as Record<string, unknown>).correct !== "number"
				) {
					console.warn(
						`Missing or invalid mode '${mode}', adding from blank data`,
					);
					scoresRecord[mode] = blank[mode];
				}
			}

			return scoresRecord as unknown as ScoreData;
		} catch (error) {
			console.warn("Error validating scores, returning blank:", error);
			return JSON.parse(JSON.stringify(blankScoreData));
		}
	}

	private saveScores(): void {
		try {
			localStorage.setItem(this.storageKey, JSON.stringify(this.scores));
		} catch (error) {
			console.warn("Error saving scores:", error);
		}
	}

	setCurrentMode(mode: Mode): void {
		this.currentMode = mode;
	}

	getStreak(mode?: Mode): number {
		const modeToUse = mode || this.currentMode;

		// Defensive check: ensure mode data exists
		if (!this.scores[modeToUse]) {
			console.warn(`Mode '${modeToUse}' not found in scores, reinitializing`);
			this.scores = this.validateAndMigrateScores(this.scores);
			this.saveScores();
		}

		return this.scores[modeToUse]?.streak ?? 0;
	}

	resetStreak(mode?: Mode): void {
		const modeToUse = mode || this.currentMode;

		// Defensive check: ensure mode data exists
		if (!this.scores[modeToUse]) {
			console.warn(`Mode '${modeToUse}' not found in scores, reinitializing`);
			this.scores = this.validateAndMigrateScores(this.scores);
		}

		this.scores[modeToUse].streak = 0;
		this.saveScores();
	}

	recordScore(isCorrect: boolean, questionType: string, mode?: Mode): void {
		if (!this.scores) {
			this.scores = JSON.parse(JSON.stringify(blankScoreData));
		}

		const modeToUse = mode || this.currentMode;

		// Defensive check: ensure mode data exists
		if (!this.scores[modeToUse]) {
			console.warn(`Mode '${modeToUse}' not found in scores, reinitializing`);
			this.scores = this.validateAndMigrateScores(this.scores);
		}

		const currentStats = this.scores[modeToUse];

		currentStats.attempts++;

		// In champion mode, also update the original mode's main stats
		let originalModeStats = null;
		if (modeToUse === "Champion") {
			// Extract the actual mode from questionType (e.g., "Data Types-character" -> "Data Types")
			const actualMode = questionType.split("-")[0] as
				| "Data Types"
				| "Constructs"
				| "Operators";
			originalModeStats = this.scores[actualMode];
			originalModeStats.attempts++;
		}

		// Track detailed stats based on question type
		this.trackDetailedStats(questionType, isCorrect, modeToUse);

		if (isCorrect) {
			currentStats.correct++;
			currentStats.streak++;
			if (currentStats.streak > currentStats.recordStreak) {
				currentStats.recordStreak = currentStats.streak;
			}

			// In champion mode, also update the original mode's main stats
			if (originalModeStats) {
				originalModeStats.correct++;
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

	private trackDetailedStats(
		questionType: string,
		isCorrect: boolean,
		mode: Mode,
	): void {
		if (mode === "Champion") {
			// In champion mode, the questionType is already in the format "Data Types-character", "Constructs-sequence", "Keywords-identify-variable", etc.
			const championStats = this.scores.Champion;
			const actualMode = questionType.split("-")[0] as
				| "Data Types"
				| "Constructs"
				| "Operators"
				| "Keywords";
			const originalModeStats = this.scores[actualMode];

			// Track in champion mode breakdown by actual mode
			if (championStats.detailed[actualMode]) {
				championStats.detailed[actualMode].attempts++;
				if (isCorrect) {
					championStats.detailed[actualMode].correct++;
				}
			}

			// Track in original mode's detailed stats using the full questionType
			const categoryKey = this.extractCategoryKey(questionType, actualMode);

			if (categoryKey && originalModeStats.detailed[categoryKey]) {
				originalModeStats.detailed[categoryKey].attempts++;
				if (isCorrect) {
					originalModeStats.detailed[categoryKey].correct++;
				}
			}
		} else {
			// Regular mode tracking
			const currentStats = this.scores[mode];
			const categoryKey = this.extractCategoryKey(questionType, mode);

			if (categoryKey && currentStats.detailed[categoryKey]) {
				currentStats.detailed[categoryKey].attempts++;
				if (isCorrect) {
					currentStats.detailed[categoryKey].correct++;
				}
			}
		}
	}

	private extractCategoryKey(questionType: string, mode: Mode): string {
		const parts = questionType.split("-");

		if (mode === "Data Types") {
			// For Data Types, the category is the second part (e.g., "Data Types-character" -> "character")
			return parts[1] || "";
		} else if (mode === "Constructs") {
			// For Constructs, build the category from construct combinations
			if (parts.length > 1) {
				const constructs = parts.slice(1).sort();
				if (constructs.length === 1) {
					return constructs[0];
				} else if (constructs.length === 2) {
					// One will always be "sequence", so we check for the other
					if (constructs.includes("selection")) {
						return "Sequence & Selection";
					} else if (constructs.includes("iteration")) {
						return "Sequence & Iteration";
					}
					// Fallback for any other two-construct combinations
					return constructs.join("-");
				} else if (constructs.length === 3) {
					return "Sequence, Selection & Iteration";
				}
			}
			return "";
		} else if (mode === "Operators") {
			// For operators, the category is the second part (e.g., "operators-addition" -> "addition")
			return parts[1] || "";
		} else if (mode === "Keywords") {
			// For Keywords, the category is everything after "Keywords-"
			// e.g., "Keywords-identify-variable" -> "identify-variable"
			if (parts.length > 1) {
				return parts.slice(1).join("-");
			}
			return "";
		}

		return "";
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

		Object.values(this.scores).forEach((stats) => {
			totalAttempts += stats.attempts;
			totalCorrect += stats.correct;
		});

		// Use current mode's streak
		currentModeStreak = this.scores[this.currentMode].streak;

		const totalPoints = totalCorrect;
		const accuracy =
			totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0;

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

	getModeStats(mode: Mode): ModeStats {
		// Defensive check: ensure mode data exists
		if (!this.scores[mode]) {
			console.warn(`Mode '${mode}' not found in scores, reinitializing`);
			this.scores = this.validateAndMigrateScores(this.scores);
			this.saveScores();
		}
		return this.scores[mode];
	}

	getAllModeStats(): ScoreData {
		// Defensive check: ensure all modes exist
		const requiredModes: Mode[] = [
			"Data Types",
			"Constructs",
			"Operators",
			"Keywords",
			"Champion",
		];
		let needsMigration = false;

		for (const mode of requiredModes) {
			if (!this.scores[mode]) {
				needsMigration = true;
				break;
			}
		}

		if (needsMigration) {
			console.warn("Some modes missing from scores, migrating data");
			this.scores = this.validateAndMigrateScores(this.scores);
			this.saveScores();
		}

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
			const modeTitle = this.getModeTitle(mode as Mode);
			typeStats[modeTitle] = {
				attempts: stats.attempts,
				correct: stats.correct,
				accuracy:
					stats.attempts > 0 ? (stats.correct / stats.attempts) * 100 : 0,
			};
		});

		return typeStats;
	}

	private getModeTitle(mode: Mode): string {
		const titles = {
			"Data Types": "Data Types",
			Constructs: "Constructs",
			Operators: "Operators",
			Keywords: "Keywords",
			Champion: "Champion",
		};
		return titles[mode];
	}

	resetAllScores(): void {
		this.scores = JSON.parse(JSON.stringify(blankScoreData));
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
