import { describe, expect, it } from "vitest";
import {
	constructQuestions,
	dataTypeQuestions,
	operatorQuestions,
	QUIZ_MODES,
} from "../lib/questionData";

describe("questionData", () => {
	describe("QUIZ_MODES", () => {
		it("should have all required modes defined", () => {
			expect(QUIZ_MODES["Data Types"]).toBeDefined();
			expect(QUIZ_MODES.Constructs).toBeDefined();
			expect(QUIZ_MODES.Operators).toBeDefined();
			expect(QUIZ_MODES.Champion).toBeDefined();
		});

		it("should have correct structure for each mode", () => {
			Object.values(QUIZ_MODES).forEach((mode) => {
				expect(mode).toHaveProperty("id");
				expect(mode).toHaveProperty("title");
				expect(mode).toHaveProperty("description");
				expect(mode).toHaveProperty("emoji");
			});
		});
	});

	describe("dataTypeQuestions", () => {
		it("should have all data type categories", () => {
			expect(dataTypeQuestions.character).toBeDefined();
			expect(dataTypeQuestions.string).toBeDefined();
			expect(dataTypeQuestions.integer).toBeDefined();
			expect(dataTypeQuestions.float).toBeDefined();
			expect(dataTypeQuestions.boolean).toBeDefined();
		});

		it("should have multiple questions per category", () => {
			expect(dataTypeQuestions.character.length).toBeGreaterThan(5);
			expect(dataTypeQuestions.string.length).toBeGreaterThan(5);
			expect(dataTypeQuestions.integer.length).toBeGreaterThan(5);
			expect(dataTypeQuestions.float.length).toBeGreaterThan(5);
			expect(dataTypeQuestions.boolean.length).toBeGreaterThan(3); // Boolean has fewer questions
		});

		it("should have correct structure for each question", () => {
			const question = dataTypeQuestions.character[0];
			expect(question).toHaveProperty("value");
			expect(question).toHaveProperty("dataType");
			expect(question).toHaveProperty("explanation");
			expect(question.dataType).toBe("character");
		});

		it("should have unique values in each category", () => {
			Object.values(dataTypeQuestions).forEach((questions) => {
				const values = questions.map((q) => q.value);
				const uniqueValues = new Set(values);
				// Most questions should be unique (allowing some duplicates for variety)
				expect(uniqueValues.size).toBeGreaterThan(questions.length * 0.8);
			});
		});
	});

	describe("constructQuestions", () => {
		it("should have multiple construct questions", () => {
			expect(constructQuestions.length).toBeGreaterThan(10);
		});

		it("should have correct structure for each question", () => {
			const question = constructQuestions[0];
			expect(question).toHaveProperty("code");
			expect(question).toHaveProperty("usedConstructs");
			expect(question).toHaveProperty("explanation");
			expect(Array.isArray(question.usedConstructs)).toBe(true);
		});

		it("should have valid construct types", () => {
			const validConstructs = ["sequence", "selection", "iteration"];

			constructQuestions.forEach((question) => {
				question.usedConstructs.forEach((construct) => {
					expect(validConstructs).toContain(construct);
				});
			});
		});

		it("should have code examples", () => {
			constructQuestions.forEach((question) => {
				expect(question.code.length).toBeGreaterThan(0);
			});
		});
	});

	describe("operatorQuestions", () => {
		it("should have multiple operator questions", () => {
			expect(operatorQuestions.length).toBeGreaterThan(20);
		});

		it("should have correct structure for each question", () => {
			const question = operatorQuestions[0];
			expect(question).toHaveProperty("code");
			expect(question).toHaveProperty("answer");
			expect(question).toHaveProperty("explanation");
			expect(question).toHaveProperty("operatorCategory");
		});

		it("should have valid operator categories", () => {
			const validCategories = [
				"addition",
				"subtraction",
				"multiplication",
				"division",
				"modulo",
				"integer-division",
				"exponentiation",
				"comparison",
				"mixed",
			];

			operatorQuestions.forEach((question) => {
				expect(validCategories).toContain(question.operatorCategory);
			});
		});

		it("should have code and answers", () => {
			operatorQuestions.forEach((question) => {
				expect(question.code.length).toBeGreaterThan(0);
				expect(question.answer.length).toBeGreaterThan(0);
			});
		});

		it("should have various operator types represented", () => {
			const categories = operatorQuestions.map((q) => q.operatorCategory);
			const uniqueCategories = new Set(categories);
			expect(uniqueCategories.size).toBeGreaterThan(5);
		});
	});

	describe("question quality", () => {
		it("should have total questions across all types", () => {
			const dataTypeCount = Object.values(dataTypeQuestions).reduce(
				(sum, questions) => sum + questions.length,
				0,
			);
			const totalQuestions =
				dataTypeCount + constructQuestions.length + operatorQuestions.length;

			// Should have over 100 questions total
			expect(totalQuestions).toBeGreaterThan(100);
		});

		it("should have explanations for all questions", () => {
			// Check data type questions
			Object.values(dataTypeQuestions)
				.flat()
				.forEach((q) => {
					expect(q.explanation.length).toBeGreaterThan(5);
				});

			// Check construct questions
			constructQuestions.forEach((q) => {
				expect(q.explanation.length).toBeGreaterThan(5);
			});

			// Check operator questions
			operatorQuestions.forEach((q) => {
				expect(q.explanation.length).toBeGreaterThan(5);
			});
		});
	});
});
