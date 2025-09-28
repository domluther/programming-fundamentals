import { createFileRoute } from "@tanstack/react-router";
import { QuizComponent } from "@/components";
import { SharedLayout } from "@/components/SharedLayout";

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
