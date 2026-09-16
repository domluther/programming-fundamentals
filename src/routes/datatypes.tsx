import { createFileRoute } from "@tanstack/react-router";
import { QuizComponent, SharedLayout } from "@/components";

interface DataTypesSearch {
	level?: "ks3" | "gcse";
}

export const Route = createFileRoute("/datatypes")({
	component: DataTypesQuiz,
	validateSearch: (search: Record<string, unknown>): DataTypesSearch => ({
		level: search.level === "ks3" ? "ks3" : undefined,
	}),
});

function DataTypesQuiz() {
	const { level } = Route.useSearch();

	return (
		<SharedLayout mode="Data Types">
			{(recordScoreAndUpdate, scoreManager) => (
				<QuizComponent
					mode="Data Types"
					onScoreUpdate={recordScoreAndUpdate}
					scoreManager={scoreManager}
					initialKS3={level === "ks3"}
				/>
			)}
		</SharedLayout>
	);
}
