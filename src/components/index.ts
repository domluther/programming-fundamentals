/**
 * Programming Fundamentals Component Library
 * Export all reusable components for easy importing
 */

// Layout Components
export { Footer } from "./Footer";
export { Header } from "./Header";
// Quiz Components
export { ModeMenu } from "./ModeMenu";
export type {
	QuizButtonProps,
	QuizButtonSize,
	QuizButtonVariant,
} from "./QuizButton";
export { QuizButton } from "./QuizButton";
export { QuizComponent } from "./QuizComponent";
// Utility Components
export { ScoreButton } from "./ScoreButton";
export { SharedLayout, useSharedLayout } from "./SharedLayout";
export { SiteLayout } from "./SiteLayout";
export { SiteNavigation } from "./SiteNavigation";
export { StatsModal } from "./StatsModal";
export { ThemeToggle } from "./theme-toggle";

/**
 * Usage Example:
 *
 * import {
 *   SiteLayout,
 *   SharedLayout,
 *   QuizComponent,
 *   ModeMenu,
 *   StatsModal,
 *   QuizButton,
 *   ScoreButton,
 *   Header,
 *   Footer,
 *   SiteNavigation,
 *   ThemeToggle
 * } from "@/components";
 */
