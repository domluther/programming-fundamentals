import { X } from "lucide-react";
import { useEffect, useId } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ScoreManager } from "@/lib/scoreManager";
import { cn } from "@/lib/utils";

interface StatsModalProps {
	isOpen: boolean;
	onClose: () => void;
	scoreManager: ScoreManager;
	/** Title for the modal */
	title?: string;
}

/**
 * Reusable statistics modal for GCSE CS practice sites
 * Shows level progress, statistics, and breakdown by category
 */
export function StatsModal({
	isOpen,
	onClose,
	scoreManager,
	title = "Your Progress",
}: StatsModalProps) {
	const headerIcon = "🏆";
	const titleId = useId();

	// Handle Escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			return () => document.removeEventListener("keydown", handleEscape);
		}
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const overallStats = scoreManager.getOverallStats();
	const typeStats = scoreManager.getScoresByType();

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
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs"
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
				className="bg-indigo-50 rounded-lg shadow-xl max-w-xl w-full max-h-[80vh] overflow-hidden"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				role="document"
			>
				{/* Header */}
				<div className="flex items-center justify-between p-4 text-indigo-50 bg-header/80">
					<p
						id={titleId}
						className="flex items-center gap-3 text-2xl font-bold"
					>
						<span>{headerIcon}</span>
						{title}
					</p>
					<button
						type="button"
						onClick={onClose}
						className="flex items-center justify-center w-8 h-8 text-2xl transition-colors text-indigo-50 hover:text-gray-200"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Content */}
				<div className="p-4 overflow-y-auto max-h-[calc(80vh-140px)]">
					{overallStats.totalAttempts > 0 ? (
						<div className="space-y-4 ">
							{/* Level Info Card */}
							<Card className="text-white bg-indigo-600">
								<CardHeader className="text-white ">
									<div className="flex items-center gap-4">
										<div className="text-5xl animate-gentle-bounce">
											{overallStats.level.emoji}
										</div>
										<div className="flex-1 text-left">
											<CardTitle className="text-2xl text-indigo-50">
												{overallStats.level.title}
											</CardTitle>
											<p className="mt-1 text-indigo-100">
												{overallStats.level.description}
											</p>
										</div>
									</div>
								</CardHeader>
								{overallStats.nextLevel && (
									<CardContent className="p-4 mx-4 rounded-md bg-white/20">
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
											className="h-2 mb-3 [&>div]:bg-green-600 "
										/>
										{/* Detailed requirements */}
										<div className="space-y-1 text-sm text-white">
											{overallStats.accuracy <
												overallStats.nextLevel.minAccuracy && (
												<div>
													🎯 {Math.round(overallStats.nextLevel.minAccuracy)}%
													accuracy required (currently{" "}
													{Math.floor(overallStats.accuracy)}%)
												</div>
											)}
										</div>
									</CardContent>
								)}
								{!overallStats.nextLevel && (
									<CardContent className="pt-4">
										<div className="text-center">
											<div className="p-3 text-white rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600">
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

							{/* Overall Statistics */}
							<Card className="gap-4 p-4">
								<CardHeader className="px-2 mb-0">
									<CardTitle className="flex items-center">
										📈 Overall Statistics
									</CardTitle>
								</CardHeader>
								<CardContent className="px-2">
									<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
										<div className="p-4 text-center border-l-4 border-green-500 rounded-lg bg-green-50">
											<div className="text-2xl font-bold text-green-600">
												{overallStats.totalCorrect}
											</div>
											<div className="text-sm text-gray-600">Correct</div>
										</div>
										<div className="p-4 text-center border-l-4 border-blue-500 rounded-lg bg-blue-50">
											<div className="text-2xl font-bold text-blue-600">
												{overallStats.totalAttempts}
											</div>
											<div className="text-sm text-gray-600">
												Total Attempts
											</div>
										</div>{" "}
										<div className="p-4 text-center border-l-4 border-purple-500 rounded-lg bg-purple-50">
											<div className="text-2xl font-bold text-purple-600">
												{Math.floor(overallStats.accuracy)}%
											</div>
											<div className="text-sm text-gray-600">Accuracy</div>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Breakdown by Category */}
							<Card className="gap-4 p-4">
								<CardHeader className="px-2 mb-0">
									<CardTitle className="flex items-center">
										📋 Breakdown by Category
									</CardTitle>
								</CardHeader>
								<CardContent className="px-2">
									<div className="space-y-4">
										{Object.entries(typeStats).map(
											([type, stats]) =>
												stats.attempts > 0 && (
													<div
														key={type}
														className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
													>
														<div>
															<div className="text-lg font-semibold">
																{type === "none" ? "Invalid Items" : type}
															</div>
															<div className="text-sm text-gray-600">
																{stats.correct} correct out of {stats.attempts}{" "}
																attempts
															</div>
														</div>
														<div className="text-right">
															<div
																className={cn(
																	"text-2xl font-bold",
																	stats.accuracy >= 80
																		? "text-green-600"
																		: stats.accuracy >= 60
																			? "text-yellow-600"
																			: "text-red-600",
																)}
															>
																{Math.round(stats.accuracy)}%
															</div>
															<div className="text-xs text-gray-500">
																accuracy
															</div>
														</div>
													</div>
												),
										)}
									</div>
								</CardContent>
							</Card>
						</div>
					) : (
						<div className="py-12 text-center">
							<div className="mb-4 text-6xl">🦆</div>
							<p className="mb-2 text-xl text-gray-600">
								No scores recorded yet
							</p>
							<p className="text-gray-500">
								Start practicing to see your progress!
							</p>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between p-4 bg-indigo-50">
					<Button variant="destructive" onClick={handleResetScores}>
						Reset All Scores
					</Button>
					<Button onClick={onClose}>Close</Button>
				</div>
			</div>
		</div>
	);
}
