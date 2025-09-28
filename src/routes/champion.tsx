import { createFileRoute } from "@tanstack/react-router";
import { SharedLayout, QuizComponent } from "@/components";

export const Route = createFileRoute("/champion")({
	component: ChampionQuiz,
});

function ChampionQuiz() {
	return (
		<SharedLayout mode="champion">
			{(recordScoreAndUpdate) => (
				<QuizComponent 
					mode="champion" 
					onScoreUpdate={recordScoreAndUpdate} 
				/>
			)}
		</SharedLayout>
	);
}