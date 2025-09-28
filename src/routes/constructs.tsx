import { createFileRoute } from "@tanstack/react-router";
import { SharedLayout, QuizComponent } from "@/components";

export const Route = createFileRoute("/constructs")({
	component: ConstructsQuiz,
});

function ConstructsQuiz() {
	return (
		<SharedLayout mode="constructs">
			{(recordScoreAndUpdate) => (
				<QuizComponent 
					mode="constructs" 
					onScoreUpdate={recordScoreAndUpdate} 
				/>
			)}
		</SharedLayout>
	);
}