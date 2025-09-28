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
 * Statistics modal for Programming Fundamentals practice site
 * Shows level progress, overall statistics, mode breakdown, and detailed category breakdown
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

	// Helper function to get accuracy color class (matching legacy color scheme)
	const getAccuracyColorClass = (correct: number, total: number): string => {
		if (total === 0) return "";
		const percentage = (correct / total) * 100;
		if (percentage >= 75) return "text-green-600 font-semibold"; // strong
		if (percentage >= 50) return "text-yellow-600 font-semibold"; // medium
		return "text-red-600 font-semibold"; // weak
	};

	const formatAccuracy = (correct: number, total: number): string => {
		if (total === 0) return "N/A";
		return Math.round((correct / total) * 100) + "%";
	};

	const formatQuestionCount = (correct: number, total: number): string => {
		if (total === 0) return "N/A";
		return `${correct}/${total}`;
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
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
				className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				role="document"
			>
				{/* Header */}
				<div className="flex items-center justify-between p-6 text-white bg-indigo-600">
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
						className="flex items-center justify-center w-8 h-8 text-2xl transition-colors text-white hover:text-gray-200"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
					{overallStats.totalAttempts > 0 ? (
						<div className="space-y-6">
							{/* Overall Statistics */}
							<Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
								<CardHeader className="pb-4">
									<CardTitle className="text-2xl text-indigo-800">🎯 Overall Statistics</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
										<div className="text-center p-4 bg-white rounded-lg shadow-sm">
											<div className="text-3xl font-bold text-green-600">{overallStats.totalPoints}</div>
											<div className="text-sm text-gray-600">Total Points</div>
										</div>
										<div className="text-center p-4 bg-white rounded-lg shadow-sm">
											<div className={cn("text-3xl font-bold", getAccuracyColorClass(overallStats.totalCorrect, overallStats.totalAttempts))}>
												{Math.round(overallStats.accuracy)}%
											</div>
											<div className="text-sm text-gray-600">Overall Accuracy</div>
										</div>
										<div className="text-center p-4 bg-white rounded-lg shadow-sm">
											<div className="text-3xl font-bold text-blue-600">{overallStats.totalCorrect}</div>
											<div className="text-sm text-gray-600">Total Correct</div>
										</div>
										<div className="text-center p-4 bg-white rounded-lg shadow-sm">
											<div className="text-3xl font-bold text-purple-600">{overallStats.totalAttempts}</div>
											<div className="text-sm text-gray-600">Total Questions</div>
										</div>
									</div>
								</CardContent>
							</Card>
							{/* Individual Mode Statistics */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Data Types Mode */}
								<Card className="p-4 bg-gray-50">
									<CardHeader className="pb-3">
										<CardTitle className="text-lg text-indigo-700">📝 Data Types</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2">
										<div className="flex justify-between">
											<span>Points:</span>
											<span className="font-semibold">{allModeStats.datatypes.score}</span>
										</div>
										<div className="flex justify-between">
											<span>Accuracy:</span>
											<span className={getAccuracyColorClass(allModeStats.datatypes.correctAnswers, allModeStats.datatypes.totalQuestions)}>
												{formatAccuracy(allModeStats.datatypes.correctAnswers, allModeStats.datatypes.totalQuestions)}
											</span>
										</div>
										<div className="flex justify-between">
											<span>Best Streak:</span>
											<span className="font-semibold">{allModeStats.datatypes.recordStreak}</span>
										</div>
										<div className="flex justify-between">
											<span>Questions:</span>
											<span className="font-semibold">{formatQuestionCount(allModeStats.datatypes.correctAnswers, allModeStats.datatypes.totalQuestions)}</span>
										</div>
									</CardContent>
								</Card>

								{/* Constructs Mode */}
								<Card className="p-4 bg-gray-50">
									<CardHeader className="pb-3">
										<CardTitle className="text-lg text-indigo-700">🏗️ Constructs</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2">
										<div className="flex justify-between">
											<span>Points:</span>
											<span className="font-semibold">{allModeStats.constructs.score}</span>
										</div>
										<div className="flex justify-between">
											<span>Accuracy:</span>
											<span className={getAccuracyColorClass(allModeStats.constructs.correctAnswers, allModeStats.constructs.totalQuestions)}>
												{formatAccuracy(allModeStats.constructs.correctAnswers, allModeStats.constructs.totalQuestions)}
											</span>
										</div>
										<div className="flex justify-between">
											<span>Best Streak:</span>
											<span className="font-semibold">{allModeStats.constructs.recordStreak}</span>
										</div>
										<div className="flex justify-between">
											<span>Questions:</span>
											<span className="font-semibold">{formatQuestionCount(allModeStats.constructs.correctAnswers, allModeStats.constructs.totalQuestions)}</span>
										</div>
									</CardContent>
								</Card>

								{/* Operators Mode */}
								<Card className="p-4 bg-gray-50">
									<CardHeader className="pb-3">
										<CardTitle className="text-lg text-indigo-700">� Operators</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2">
										<div className="flex justify-between">
											<span>Points:</span>
											<span className="font-semibold">{allModeStats.operators.score}</span>
										</div>
										<div className="flex justify-between">
											<span>Accuracy:</span>
											<span className={getAccuracyColorClass(allModeStats.operators.correctAnswers, allModeStats.operators.totalQuestions)}>
												{formatAccuracy(allModeStats.operators.correctAnswers, allModeStats.operators.totalQuestions)}
											</span>
										</div>
										<div className="flex justify-between">
											<span>Best Streak:</span>
											<span className="font-semibold">{allModeStats.operators.recordStreak}</span>
										</div>
										<div className="flex justify-between">
											<span>Questions:</span>
											<span className="font-semibold">{formatQuestionCount(allModeStats.operators.correctAnswers, allModeStats.operators.totalQuestions)}</span>
										</div>
									</CardContent>
								</Card>

								{/* Champion Mode */}
								<Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
									<CardHeader className="pb-3">
										<CardTitle className="text-lg text-yellow-700">🏆 Champion</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2">
										<div className="flex justify-between">
											<span>Points:</span>
											<span className="font-semibold">{allModeStats.champion.score}</span>
										</div>
										<div className="flex justify-between">
											<span>Accuracy:</span>
											<span className={getAccuracyColorClass(allModeStats.champion.correctAnswers, allModeStats.champion.totalQuestions)}>
												{formatAccuracy(allModeStats.champion.correctAnswers, allModeStats.champion.totalQuestions)}
											</span>
										</div>
										<div className="flex justify-between">
											<span>Best Streak:</span>
											<span className="font-semibold">{allModeStats.champion.recordStreak}</span>
										</div>
										<div className="flex justify-between">
											<span>Questions:</span>
											<span className="font-semibold">{formatQuestionCount(allModeStats.champion.correctAnswers, allModeStats.champion.totalQuestions)}</span>
										</div>
									</CardContent>
								</Card>
							</div>
							{/* Detailed Breakdown Section */}
							<Card className="p-6">
								<CardHeader className="pb-4">
									<CardTitle className="text-xl text-indigo-800">📊 Detailed Breakdown</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{/* Data Types Breakdown */}
										<div>
											<h4 className="font-semibold text-lg mb-3 text-indigo-700">📝 Data Types</h4>
											<div className="space-y-2 text-sm">
												{Object.entries(allModeStats.datatypes.detailed).map(([category, stats]) => (
													<div key={category} className="flex justify-between items-center py-1">
														<span className="capitalize">{category}:</span>
														<span className={cn("font-semibold", getAccuracyColorClass(stats.correct, stats.total))}>
															{stats.total > 0 ? `${stats.correct}/${stats.total}` : 'N/A'}
														</span>
													</div>
												))}
											</div>
										</div>

										{/* Constructs Breakdown */}
										<div>
											<h4 className="font-semibold text-lg mb-3 text-indigo-700">🏗️ Constructs</h4>
											<div className="space-y-2 text-sm">
												{Object.entries(allModeStats.constructs.detailed).map(([category, stats]) => (
													<div key={category} className="flex justify-between items-center py-1">
														<span className="capitalize">{category.replace('-', ' + ')}:</span>
														<span className={cn("font-semibold", getAccuracyColorClass(stats.correct, stats.total))}>
															{stats.total > 0 ? `${stats.correct}/${stats.total}` : 'N/A'}
														</span>
													</div>
												))}
											</div>
										</div>

										{/* Operators Breakdown */}
										<div>
											<h4 className="font-semibold text-lg mb-3 text-indigo-700">🔢 Operators</h4>
											<div className="space-y-2 text-sm">
												{Object.entries(allModeStats.operators.detailed).map(([category, stats]) => (
													<div key={category} className="flex justify-between items-center py-1">
														<span className="capitalize">{category.replace('-', ' ')}:</span>
														<span className={cn("font-semibold", getAccuracyColorClass(stats.correct, stats.total))}>
															{stats.total > 0 ? `${stats.correct}/${stats.total}` : 'N/A'}
														</span>
													</div>
												))}
											</div>
										</div>

										{/* Champion Breakdown */}
										<div>
											<h4 className="font-semibold text-lg mb-3 text-yellow-700">🏆 Champion</h4>
											<div className="space-y-2 text-sm">
												{Object.entries(allModeStats.champion.detailed).map(([category, stats]) => (
													<div key={category} className="flex justify-between items-center py-1">
														<span className="capitalize">{category}:</span>
														<span className={cn("font-semibold", getAccuracyColorClass(stats.correct, stats.total))}>
															{stats.total > 0 ? `${stats.correct}/${stats.total}` : 'N/A'}
														</span>
													</div>
												))}
											</div>
										</div>
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
				<div className="flex items-center justify-between p-6 bg-gray-50 border-t">
					<Button variant="destructive" onClick={handleResetScores}>
						Reset All Scores
					</Button>
					<Button onClick={onClose}>Close</Button>
				</div>
			</div>
		</div>
	);
}
