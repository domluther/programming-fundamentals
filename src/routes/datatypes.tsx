import { createFileRoute } from "@tanstack/react-router";
import { SharedLayout, QuizComponent } from "@/components";

export const Route = createFileRoute("/datatypes")({
	component: DataTypesQuiz,
});

function DataTypesQuiz() {
	return (
		<SharedLayout mode="Data Types">
			{(recordScoreAndUpdate) => (
				<QuizComponent 
					mode="Data Types" 
					onScoreUpdate={recordScoreAndUpdate} 
				/>
			)}
		</SharedLayout>
	);
}