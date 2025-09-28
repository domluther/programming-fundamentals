import { createFileRoute } from "@tanstack/react-router";
import { SharedLayout } from "@/components/SharedLayout";
import { QuizComponent } from "@/components";

export const Route = createFileRoute("/constructs")({
	component: ConstructsQuiz,
});

function ConstructsQuiz() {
	return (
		<SharedLayout mode="Constructs">
			{(recordScoreAndUpdate, scoreManager) => (
				<QuizComponent
					mode="Constructs"
					onScoreUpdate={recordScoreAndUpdate}
					scoreManager={scoreManager}
				/>
			)}
		</SharedLayout>
	);
}
