import { createFileRoute } from "@tanstack/react-router";
import { QuizComponent } from "@/components";
import { SharedLayout } from "@/components/SharedLayout";

export const Route = createFileRoute("/datatypes")({
	component: DataTypesQuiz,
});

function DataTypesQuiz() {
	return (
		<SharedLayout mode="Data Types">
			{(recordScoreAndUpdate, scoreManager) => (
				<QuizComponent
					mode="Data Types"
					onScoreUpdate={recordScoreAndUpdate}
					scoreManager={scoreManager}
				/>
			)}
		</SharedLayout>
	);
}
