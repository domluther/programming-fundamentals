import { createFileRoute } from "@tanstack/react-router";
import { QuizComponent, SharedLayout } from "@/components";

export const Route = createFileRoute("/operators")({
	component: OperatorsQuiz,
});

function OperatorsQuiz() {
	return (
		<SharedLayout mode="Operators">
			{(recordScoreAndUpdate, scoreManager) => (
				<QuizComponent
					mode="Operators"
					onScoreUpdate={recordScoreAndUpdate}
					scoreManager={scoreManager}
				/>
			)}
		</SharedLayout>
	);
}
