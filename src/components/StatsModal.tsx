import { X } from "lucide-react";
import { useEffect, useId } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { DetailedStats, ScoreManager } from "@/lib/scoreManager";
import { cn } from "@/lib/utils";

interface StatsModalProps {
	isOpen: boolean;
	onClose: () => void;
	scoreManager: ScoreManager;
	/** Title for the modal */
	title?: string;
}

/**
 * Statistics modal for Programming Fundamentals practice site
 * Shows level progress, overall statistics, mode breakdown, and detailed category breakdown
 */
export function StatsModal({
	isOpen,
	onClose,
	scoreManager,
	title = "Your Progress",
}: StatsModalProps) {
	const titleId = useId();
	const headerIcon = "🏆";

	// Close modal on escape key press
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);

	// Don't render anything if not open
	if (!isOpen) return null;

	const overallStats = scoreManager.getOverallStats();
	const allModeStats = scoreManager.getAllModeStats();

	const handleResetScores = () => {
		if (
			confirm(
				"Are you sure you want to reset all scores? This cannot be undone.",
			)
		) {
			scoreManager.resetAllScores();
			window.location.reload(); // Refresh to update all displays
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-modal-overlay backdrop-blur-xs"
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
			onClick={onClose}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					onClose();
				}
			}}
			tabIndex={-1}
		>
			<div
				className="bg-background rounded-lg shadow-xl max-w-xl w-full max-h-[80vh] overflow-hidden"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				role="document"
			>
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 text-modal-header-text bg-header/80">
					<h2
						id={titleId}
						className="flex items-center text-2xl font-bold gap-2"
					>
						{headerIcon} {title}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="flex items-center justify-center w-8 h-8 text-2xl transition-colors hover:opacity-80"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Content */}
				<div className="p-4 overflow-y-auto max-h-[calc(80vh-140px)]">
					{overallStats.totalAttempts > 0 ? (
						<div className="space-y-6">
							{/* Level Info Card */}
							<Card className="text-level-card-text bg-level-card-bg">
								<CardHeader className="text-level-card-text">
									<div className="flex items-center gap-4">
										<div className="text-5xl animate-gentle-bounce">
											{overallStats.currentLevel.emoji}
										</div>
										<div className="flex-1 text-left">
											<CardTitle className="text-2xl">
												{overallStats.currentLevel.title}
											</CardTitle>
											<p className="mt-1 opacity-90">
												{overallStats.currentLevel.description}
											</p>
										</div>
									</div>
								</CardHeader>
								{overallStats.nextLevel && (
									<CardContent className="p-4 mx-4 rounded-md bg-card/20">
										<div className="flex items-center justify-between mb-2 text-sm font-semibold">
											<span>
												Progress to {overallStats.nextLevel.emoji}{" "}
												{overallStats.nextLevel.title}
											</span>
											<span>
												{Math.max(
													0,
													overallStats.nextLevel.minPoints -
														overallStats.totalPoints,
												)}{" "}
												points needed
											</span>
										</div>
										<Progress
											value={overallStats.progress}
											className="h-2 mb-3 [&>div]:bg-progress-bar"
										/>
										{/* Detailed requirements */}
										<div className="text-sm space-y-1">
											{overallStats.accuracy <
												overallStats.nextLevel.minAccuracy && (
												<div>
													🎯 {Math.round(overallStats.nextLevel.minAccuracy)}%
													accuracy required (currently{" "}
													{Math.round(overallStats.accuracy)}%)
												</div>
											)}
										</div>
									</CardContent>
								)}
								{!overallStats.nextLevel && (
									<CardContent className="pt-4">
										<div className="text-center">
											<div className="p-3 text-white bg-yellow-500 rounded-lg">
												<p className="text-lg font-semibold">
													🎉 Maximum Level Reached!
												</p>
												<p className="text-sm text-yellow-100">
													You&apos;re the ultimate master!
												</p>
											</div>
										</div>
									</CardContent>
								)}
							</Card>
							<Card className="p-4 gap-4">
								<CardHeader className="px-2 mb-0">
									<CardTitle className="flex items-center">
										📈 Overall Statistics
									</CardTitle>
								</CardHeader>
								<CardContent className="px-2">
									<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
										<div className="p-4 text-center border-l-4 rounded-lg bg-stats-card-bg border-stats-accuracy-high">
											<div className="text-2xl font-bold text-stats-accuracy-high">
												{overallStats.totalPoints}
											</div>
											<div className="text-sm text-muted-foreground">Total Points</div>
										</div>
										<div className="p-4 text-center border-l-4 rounded-lg bg-stats-card-bg border-stats-points">
											<div className="text-2xl font-bold text-stats-points">
												{overallStats.totalAttempts}
											</div>
											<div className="text-sm text-muted-foreground">
												Total Attempts
											</div>
										</div>
										<div className="p-4 text-center border-l-4 rounded-lg bg-stats-card-bg border-stats-record">
											<div className="text-2xl font-bold text-stats-record">
												{Math.floor(overallStats.accuracy)}%
											</div>
											<div className="text-sm text-muted-foreground">Accuracy</div>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Category Breakdown */}
							<Card className="p-4 gap-4">
								<CardHeader className="px-2 mb-0">
									<CardTitle className="flex items-center">
										📋 Breakdown by Category
									</CardTitle>
								</CardHeader>
								<CardContent className="px-2">
									<div className="space-y-4">
										{Object.entries(allModeStats).map(([mode, stats]) => {
											if (!stats || stats.attempts === 0) return null;

											const accuracy = Math.round(
												(stats.correct / stats.attempts) * 100,
											);

											return (
												<div
													key={mode}
													className="flex items-center justify-between p-4 rounded-lg bg-muted"
												>
													<div>
														<div className="text-lg font-semibold">
															{mode === "none" ? "Invalid Items" : mode}
														</div>
														<div className="text-sm text-muted-foreground">
															{stats.correct} correct out of {stats.attempts}{" "}
															attempts
														</div>
													</div>
													<div className="text-right">
														<div
															className={cn(
																"text-2xl font-bold",
																accuracy >= 80
																	? "text-stats-accuracy-high"
																	: accuracy >= 60
																		? "text-stats-accuracy-medium"
																		: "text-stats-accuracy-low",
															)}
														>
															{Math.round(accuracy)}%
														</div>
														<div className="text-xs text-muted-foreground">
															accuracy
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</CardContent>
							</Card>

							{/* Detailed Statistics */}
							<Card className="p-4 gap-4">
								<CardHeader className="px-2 mb-0">
									<CardTitle className="flex items-center">
										🔍 Detailed Breakdown
									</CardTitle>
								</CardHeader>
								<CardContent className="px-2">
									<div className="space-y-6">
										{Object.entries(allModeStats).map(([mode, stats]) => {
											if (!stats || stats.attempts === 0) return null;

											return (
												<div key={mode} className="space-y-3">
													<h4 className="pb-2 text-lg font-semibold capitalize border-b border-border">
														{mode === "none" ? "Invalid Items" : mode}
													</h4>
													<div className="space-y-2">
														{Object.entries(stats.detailed || {}).map(
															([subcat, subcatStats]) => {
																const detailedStat =
																	subcatStats as DetailedStats;
																if (
																	!detailedStat ||
																	detailedStat.attempts === 0
																)
																	return null;

																const subcatAccuracy = Math.round(
																	(detailedStat.correct /
																		detailedStat.attempts) *
																		100,
																);

																return (
																	<div
																		key={subcat}
																		className="flex items-center justify-between p-3 rounded-lg bg-muted"
																	>
																		<div>
																			<div className="font-medium capitalize">
																				{subcat
																					.replace(/([A-Z])/g, " $1")
																					.replace("-", " ")
																					.trim()}
																			</div>
																			<div className="text-sm text-muted-foreground">
																				{detailedStat.correct} correct out of{" "}
																				{detailedStat.attempts} attempts
																			</div>
																		</div>
																		<div className="text-right">
																			<div
																				className={cn(
																					"text-xl font-bold",
																					subcatAccuracy >= 80
																						? "text-stats-accuracy-high"
																						: subcatAccuracy >= 60
																							? "text-stats-accuracy-medium"
																							: "text-stats-accuracy-low",
																				)}
																			>
																				{subcatAccuracy}%
																			</div>
																			<div className="text-xs text-muted-foreground">
																				accuracy
																			</div>
																		</div>
																	</div>
																);
															},
														)}
													</div>
												</div>
											);
										})}
									</div>
								</CardContent>
							</Card>
						</div>
					) : (
						<div className="py-12 text-center">
							<div className="mb-4 text-6xl">🦆</div>
							<p className="mb-2 text-xl text-shadow-muted-foreground">
								No scores recorded yet
							</p>
							<p className="text-muted-foreground">
								Start practicing to see your progress!
							</p>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between p-4">
					<Button variant="destructive" onClick={handleResetScores}>
						Reset All Scores
					</Button>
					<Button onClick={onClose}>Close</Button>
				</div>
			</div>
		</div>
	);
}
