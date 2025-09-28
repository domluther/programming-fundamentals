/**
 * Programming Fundamentals Component Library
 * Export all reusable components for easy importing
 */

// Layout Components
export { Footer } from "./Footer";
export { Header } from "./Header";
export { SharedLayout, useSharedLayout } from "./SharedLayout";
export { SiteLayout } from "./SiteLayout";
export { SiteNavigation } from "./SiteNavigation";

// Quiz Components
export { ModeMenu } from "./ModeMenu";
export { QuizComponent } from "./QuizComponent";
export type {
	QuizButtonProps,
	QuizButtonSize,
	QuizButtonVariant,
} from "./QuizButton";
export { QuizButton } from "./QuizButton";

// Utility Components
export { ScoreButton } from "./ScoreButton";
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
