import { describe, expect, it } from "vitest";
import { formatNumber, roundToPrecision, unformatNumber } from "../lib/numberUtils";

describe("numberUtils", () => {
	describe("formatNumber", () => {
		it("should format numbers with thousands separators", () => {
			expect(formatNumber(0)).toBe("0");
			expect(formatNumber(1)).toBe("1");
			expect(formatNumber(50)).toBe("50");
			expect(formatNumber(999)).toBe("999");
			expect(formatNumber(1000)).toBe("1,000");
			expect(formatNumber(1500)).toBe("1,500");
			expect(formatNumber(10000)).toBe("10,000");
			expect(formatNumber(1000000)).toBe("1,000,000");
		});

		it("should handle decimal numbers", () => {
			expect(formatNumber(1234.56)).toBe("1,234.56");
			expect(formatNumber(0.5)).toBe("0.5");
			expect(formatNumber(999.999)).toBe("999.999");
		});

		it("should handle negative numbers", () => {
			expect(formatNumber(-1000)).toBe("-1,000");
			expect(formatNumber(-1234.56)).toBe("-1,234.56");
		});

		it("should handle floating-point precision issues", () => {
			// Common floating-point issues
			expect(formatNumber(0.1 + 0.2)).toBe("0.3");
		});
	});

	describe("unformatNumber", () => {
		it("should remove commas from formatted numbers", () => {
			expect(unformatNumber("1,000")).toBe("1000");
			expect(unformatNumber("1,234,567")).toBe("1234567");
			expect(unformatNumber("1,234.56")).toBe("1234.56");
		});

		it("should handle numbers without commas", () => {
			expect(unformatNumber("1000")).toBe("1000");
			expect(unformatNumber("0.5")).toBe("0.5");
		});
	});

	describe("roundToPrecision", () => {
		it("should round to specified precision", () => {
			expect(roundToPrecision(1.23456789, 2)).toBe(1.23);
			expect(roundToPrecision(1.23456789, 4)).toBe(1.2346);
			expect(roundToPrecision(1.99999, 2)).toBe(2);
		});

		it("should use default precision of 10", () => {
			const result = roundToPrecision(0.1 + 0.2);
			expect(result).toBeCloseTo(0.3, 10);
		});

		it("should handle edge cases", () => {
			expect(roundToPrecision(0)).toBe(0);
			// JavaScript's standard rounding behavior (round half away from zero)
			expect(roundToPrecision(-1.5, 0)).toBe(-1);
		});
	});
});
