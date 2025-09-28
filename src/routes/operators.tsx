import { createFileRoute } from "@tanstack/react-router";
import { SharedLayout, QuizComponent } from "@/components";

export const Route = createFileRoute("/operators")({
	component: OperatorsQuiz,
});

function OperatorsQuiz() {
	return (
		<SharedLayout mode="operators">
			{(recordScoreAndUpdate) => (
				<QuizComponent 
					mode="operators" 
					onScoreUpdate={recordScoreAndUpdate} 
				/>
			)}
		</SharedLayout>
	);
}