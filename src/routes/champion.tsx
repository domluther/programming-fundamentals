import { createFileRoute } from "@tanstack/react-router";
import { SharedLayout, QuizComponent } from "@/components";

export const Route = createFileRoute("/champion")({
	component: ChampionQuiz,
});

function ChampionQuiz() {
	return (
		<SharedLayout mode="Champion">
			{(recordScoreAndUpdate) => (
				<QuizComponent 
					mode="Champion" 
					onScoreUpdate={recordScoreAndUpdate} 
				/>
			)}
		</SharedLayout>
	);
}