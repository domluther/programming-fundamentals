import { createFileRoute } from "@tanstack/react-router";
import { SharedLayout, QuizComponent } from "@/components";

export const Route = createFileRoute("/operators")({
	component: OperatorsQuiz,
});

function OperatorsQuiz() {
	return (
		<SharedLayout mode="Operators">
			{(recordScoreAndUpdate) => (
				<QuizComponent 
					mode="Operators" 
					onScoreUpdate={recordScoreAndUpdate} 
				/>
			)}
		</SharedLayout>
	);
}