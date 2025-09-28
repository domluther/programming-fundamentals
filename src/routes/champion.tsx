import { createFileRoute } from "@tanstack/react-router";
import { QuizComponent } from "@/components";
import { SharedLayout } from "@/components/SharedLayout";

export const Route = createFileRoute("/champion")({
	component: ChampionQuiz,
});

function ChampionQuiz() {
	return (
		<SharedLayout mode="Champion">
			{(recordScoreAndUpdate, scoreManager) => (
				<QuizComponent
					mode="Champion"
					onScoreUpdate={recordScoreAndUpdate}
					scoreManager={scoreManager}
				/>
			)}
		</SharedLayout>
	);
}
