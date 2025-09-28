/**
 * GCSE CS Reusable Component Library
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
// Utility Components
export { ScoreButton } from "./ScoreButton";
export { SharedLayout, useSharedLayout } from "./SharedLayout";
// Layout Components
export { SiteLayout } from "./SiteLayout";
// Quiz Components
export { QuizComponent } from "./QuizComponent";
export { QuizLayout } from "./QuizLayout";
export { QuizStats } from "./QuizStats";
export { SiteNavigation } from "./SiteNavigation";
// Modal Components
export { StatsModal } from "./StatsModal";

/**
 * Usage Example:
 *
 * import {
 *   SiteLayout,
 *   SimpleQuizBody,
 *   StatsModal,
 *   QuizButton,
 *   ScoreButton,
 *   HintPanel,
 *   Header,
 *   Footer,
 *   CapacityCalculator,
 *   FileSizeCalculator
 * } from "@/components";
 */
