import { createFileRoute } from "@tanstack/react-router";
import { QuizComponent, SharedLayout } from "@/components";

export const Route = createFileRoute("/keywords")({
	component: KeywordsQuiz,
});

function KeywordsQuiz() {
	return (
		<SharedLayout mode="Keywords">
			{(recordScoreAndUpdate, scoreManager) => (
				<QuizComponent
					mode="Keywords"
					onScoreUpdate={recordScoreAndUpdate}
					scoreManager={scoreManager}
				/>
			)}
		</SharedLayout>
	);
}
