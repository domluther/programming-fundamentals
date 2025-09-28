/**
 * Programming Fundamentals Component Library
 * Export all reusable components for easy importing
 */

export { Footer } from "./Footer";
export { Header } from "./Header";
export type {
	QuizButtonProps,
	QuizButtonSize,
	QuizButtonVariant,
} from "./QuizButton";
export { QuizButton } from "./QuizButton";
// Quiz Components
export { QuizComponent } from "./QuizComponent";
// Utility Components
export { ScoreButton } from "./ScoreButton";
export { SharedLayout, useSharedLayout } from "./SharedLayout";
// Layout Components
export { SiteLayout } from "./SiteLayout";
export { SiteNavigation } from "./SiteNavigation";
// Modal Components
export { StatsModal } from "./StatsModal";

/**
 * Usage Example:
 *
 * import {
 *   SiteLayout,
 *   SharedLayout,
 *   QuizComponent,
 *   StatsModal,
 *   QuizButton,
 *   ScoreButton,
 *   Header,
 *   Footer,
 *   SiteNavigation
 * } from "@/components";
 */
