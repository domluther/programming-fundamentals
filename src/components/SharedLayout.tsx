import { useEffect, useState } from "react";
import { type Mode, ScoreManager } from "@/lib/scoreManager";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { ModeMenu } from "./ModeMenu";
import { ScoreButton } from "./ScoreButton";
import { SiteLayout } from "./SiteLayout";
import { StatsModal } from "./StatsModal";

interface SharedLayoutProps {
	mode?: Mode;
	children: (
		recordScoreAndUpdate: (isCorrect: boolean, questionType: string) => void,
		scoreManager: ScoreManager,
	) => React.ReactNode;
}

export function useSharedLayout(mode?: Mode) {
	const [showStatsModal, setShowStatsModal] = useState(false);
	// Score update trigger to force re-renders when score changes
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_scoreUpdateTrigger, setScoreUpdateTrigger] = useState(0);

	const siteConfig = SITE_CONFIG;

	// Score manager
	const [scoreManager] = useState(
		() => new ScoreManager(siteConfig.scoring.customLevels),
	);

	// Set the current mode whenever it changes
	useEffect(() => {
		if (mode) {
			scoreManager.setCurrentMode(mode);
		}
	}, [scoreManager, mode]);

	const overallStats = scoreManager.getOverallStats();

	// Function to record score and trigger re-render
	const recordScoreAndUpdate = (isCorrect: boolean, questionType: string) => {
		scoreManager.recordScore(isCorrect, questionType, mode);
		setScoreUpdateTrigger((prev) => prev + 1);
	};

	return {
		showStatsModal,
		setShowStatsModal,
		siteConfig,
		scoreManager,
		overallStats,
		recordScoreAndUpdate,
	};
}

export function SharedLayout({ mode, children }: SharedLayoutProps) {
	const {
		showStatsModal,
		setShowStatsModal,
		siteConfig,
		scoreManager,
		overallStats,
		recordScoreAndUpdate,
	} = useSharedLayout(mode);

	return (
		<SiteLayout
			title={siteConfig.title}
			subtitle={siteConfig.subtitle}
			titleIcon={siteConfig.icon}
			scoreButton={
				<ScoreButton
					levelEmoji={overallStats.currentLevel.emoji}
					levelTitle={overallStats.currentLevel.title}
					points={overallStats.totalPoints}
					onClick={() => setShowStatsModal(true)}
				/>
			}
		>
			{/* Mode Switch Buttons */}
			<ModeMenu />

			{/* Main Body */}
			<div className="max-w-4xl px-0 mx-auto sm:px-0">
				{children(recordScoreAndUpdate, scoreManager)}
			</div>
			<StatsModal
				isOpen={showStatsModal}
				onClose={() => setShowStatsModal(false)}
				scoreManager={scoreManager}
				title="Your Programming Progress"
			/>
		</SiteLayout>
	);
}
