import { beforeEach, describe, expect, it } from "vitest";
import { ScoreManager } from "../lib/scoreManager";

describe("ScoreManager", () => {
	let scoreManager: ScoreManager;

	beforeEach(() => {
		localStorage.clear();
		scoreManager = new ScoreManager();
	});

	describe("initialization", () => {
		it("should initialize with blank scores if no data exists", () => {
			const stats = scoreManager.getAllModeStats();
			expect(stats["Data Types"].attempts).toBe(0);
			expect(stats["Data Types"].correct).toBe(0);
			expect(stats.Constructs.attempts).toBe(0);
			expect(stats.Operators.attempts).toBe(0);
			expect(stats.Champion.attempts).toBe(0);
		});

		it("should load existing scores from localStorage", () => {
			const mockData = {
				"Data Types": {
					attempts: 10,
					correct: 8,
					streak: 3,
					recordStreak: 5,
					detailed: {
						character: { correct: 2, attempts: 2 },
						string: { correct: 2, attempts: 3 },
						integer: { correct: 2, attempts: 2 },
						float: { correct: 1, attempts: 2 },
						boolean: { correct: 1, attempts: 1 },
					},
				},
				Constructs: {
					attempts: 5,
					correct: 4,
					streak: 2,
					recordStreak: 2,
					detailed: {
						sequence: { correct: 1, attempts: 1 },
						"Sequence & Selection": { correct: 1, attempts: 1 },
						"Sequence & Iteration": { correct: 1, attempts: 2 },
						"Sequence, Selection & Iteration": { correct: 1, attempts: 1 },
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
				Champion: {
					attempts: 0,
					correct: 0,
					streak: 0,
					recordStreak: 0,
					detailed: {
						"Data Types": { correct: 0, attempts: 0 },
						Constructs: { correct: 0, attempts: 0 },
						Operators: { correct: 0, attempts: 0 },
					},
				},
			};
			localStorage.setItem(
				"programming-fundamentals-stats",
				JSON.stringify(mockData),
			);

			const manager = new ScoreManager();
			const stats = manager.getAllModeStats();

			expect(stats["Data Types"].attempts).toBe(10);
			expect(stats["Data Types"].correct).toBe(8);
			expect(stats.Constructs.attempts).toBe(5);
		});
	});

	describe("recordScore", () => {
		it("should record a correct answer and increment streak", () => {
			scoreManager.recordScore(true, "Data Types-character", "Data Types");

			const stats = scoreManager.getAllModeStats();
			expect(stats["Data Types"].attempts).toBe(1);
			expect(stats["Data Types"].correct).toBe(1);
			expect(stats["Data Types"].streak).toBe(1);
		});

		it("should record an incorrect answer and reset streak", () => {
			// Build up a streak first
			scoreManager.recordScore(true, "Data Types-character", "Data Types");
			scoreManager.recordScore(true, "Data Types-string", "Data Types");
			scoreManager.recordScore(true, "Data Types-integer", "Data Types");

			// Then record an incorrect answer
			scoreManager.recordScore(false, "Data Types-float", "Data Types");

			const stats = scoreManager.getAllModeStats();
			expect(stats["Data Types"].attempts).toBe(4);
			expect(stats["Data Types"].correct).toBe(3);
			expect(stats["Data Types"].streak).toBe(0);
		});

		it("should update record streak when current streak exceeds it", () => {
			scoreManager.recordScore(true, "Data Types-character", "Data Types");
			scoreManager.recordScore(true, "Data Types-string", "Data Types");
			scoreManager.recordScore(true, "Data Types-integer", "Data Types");

			const stats = scoreManager.getAllModeStats();
			expect(stats["Data Types"].recordStreak).toBe(3);
		});

		it("should track detailed stats by question type", () => {
			scoreManager.recordScore(true, "Data Types-character", "Data Types");
			scoreManager.recordScore(false, "Data Types-character", "Data Types");
			scoreManager.recordScore(true, "Data Types-string", "Data Types");

			const stats = scoreManager.getAllModeStats();
			expect(stats["Data Types"].detailed.character.attempts).toBe(2);
			expect(stats["Data Types"].detailed.character.correct).toBe(1);
			expect(stats["Data Types"].detailed.string.attempts).toBe(1);
			expect(stats["Data Types"].detailed.string.correct).toBe(1);
		});

		it("should persist scores to localStorage", () => {
			scoreManager.recordScore(true, "Data Types-character", "Data Types");

			const savedData = localStorage.getItem("programming-fundamentals-stats");
			expect(savedData).toBeTruthy();

			const parsedData = JSON.parse(savedData!);
			expect(parsedData["Data Types"].correct).toBe(1);
		});
	});

	describe("getStreak", () => {
		it("should return current streak for a mode", () => {
			scoreManager.recordScore(true, "Operators-addition", "Operators");
			scoreManager.recordScore(true, "Operators-subtraction", "Operators");

			expect(scoreManager.getStreak("Operators")).toBe(2);
		});

		it("should return 0 for mode with no attempts", () => {
			expect(scoreManager.getStreak("Champion")).toBe(0);
		});
	});

	describe("getOverallStats", () => {
		it("should calculate overall statistics across all modes", () => {
			scoreManager.recordScore(true, "Data Types-character", "Data Types");
			scoreManager.recordScore(false, "Data Types-string", "Data Types");
			scoreManager.recordScore(true, "Constructs-sequence", "Constructs");
			scoreManager.recordScore(true, "Operators-addition", "Operators");

			const overall = scoreManager.getOverallStats();
			expect(overall.totalAttempts).toBe(4);
			expect(overall.totalCorrect).toBe(3);
			expect(overall.accuracy).toBe(75);
		});

		it("should return 0 accuracy when no attempts", () => {
			const overall = scoreManager.getOverallStats();
			expect(overall.accuracy).toBe(0);
		});
	});

	describe("resetAllScores", () => {
		it("should reset all scores to initial state", () => {
			scoreManager.recordScore(true, "Data Types-character", "Data Types");
			scoreManager.recordScore(true, "Constructs-sequence", "Constructs");

			scoreManager.resetAllScores();

			const stats = scoreManager.getAllModeStats();
			expect(stats["Data Types"].attempts).toBe(0);
			expect(stats["Data Types"].correct).toBe(0);
			expect(stats.Constructs.attempts).toBe(0);
		});

		it("should persist reset to localStorage", () => {
			scoreManager.recordScore(true, "Data Types-character", "Data Types");
			scoreManager.resetAllScores();

			const savedData = localStorage.getItem("programming-fundamentals-stats");
			expect(savedData).not.toBeNull();
			
			const parsedData = JSON.parse(savedData!);
			expect(parsedData["Data Types"].attempts).toBe(0);
			expect(parsedData["Data Types"].correct).toBe(0);
		});
	});
});
