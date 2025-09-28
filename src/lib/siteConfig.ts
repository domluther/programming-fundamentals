import type { LevelInfo } from "@/lib/scoreManager";

/** Configuration interface for GCSE CS practice sites */
export interface SiteConfig {
	/** Unique site identifier for score tracking */
	siteKey: string;
	/** Site title displayed in header */
	title: string;
	/** Site subtitle/description */
	subtitle: string;
	/** Site icon/emoji */
	icon: string;
	/** Scoring configuration */
	scoring: ScoringConfig;
}

export interface ScoringConfig {
	/** Custom level system (optional, falls back to duck levels) */
	customLevels?: LevelInfo[];
}

export interface Level {
	emoji: string;
	title: string;
	description: string;
	minPoints: number;
	minAccuracy: number;
}

/** Network Address Practice site configuration */
export const SITE_CONFIG: SiteConfig = {
	siteKey: "programming-fundamentals",
	title: "Programming Fundamentals",
	subtitle: "Master the basics of programming concepts",
	icon: "🦆",
	scoring: {
		customLevels: [
			{
				emoji: "🥚",
				title: "Code Chick",
				description: "Just cracked into the world of programming!",
				minPoints: 0,
				minAccuracy: 0,
			},
			{
				emoji: "🐣",
				title: "Variable Duckling",
				description: "Taking your first waddle through data types!",
				minPoints: 5,
				minAccuracy: 0,
			},
			{
				emoji: "🐤",
				title: "Loop Mallard",
				description: "Your control structures are really taking flight!",
				minPoints: 12,
				minAccuracy: 60,
			},
			{
				emoji: "🦆",
				title: "Function Goose",
				description: "Swimming smoothly through programming constructs!",
				minPoints: 25,
				minAccuracy: 70,
			},
			{
				emoji: "🦆✨",
				title: "Operator Teal",
				description: "Soaring through code with algorithmic brilliance!",
				minPoints: 50,
				minAccuracy: 80,
			},
			{
				emoji: "🪿👑",
				title: "Syntax Phoenix",
				description:
					"The legendary code sage - no programming concept can ruffle your feathers!",
				minPoints: 75,
				minAccuracy: 90,
			},
		],
	},
};