import { createFileRoute, Link } from "@tanstack/react-router";
import { SharedLayout } from "@/components";
import { Card } from "@/components/ui/card";
import { QUIZ_MODES } from "@/lib/questionData";
import type { Mode } from "@/lib/scoreManager";

export const Route = createFileRoute("/")({
	component: IndexPage,
});

function IndexPage() {
	const getRoutePath = (modeId: Mode): string => {
		switch (modeId) {
			case "Data Types":
				return "/datatypes";
			case "Constructs":
				return "/constructs";
			case "Operators":
				return "/operators";
			case "Keywords":
				return "/keywords";
			case "Champion":
				return "/champion";
			default:
				return "/";
		}
	};

	return (
		<SharedLayout>
			{() => (
				<div className="space-y-8 text-center">
					<div className="mb-12">
						<h2 className="mb-4 text-3xl font-bold text-foreground">
							Choose Your Quiz Mode
						</h2>
						<p className="text-lg text-muted-foreground">
							Master programming fundamentals with interactive quizzes
						</p>
					</div>

					<div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
						{Object.values(QUIZ_MODES).map((mode) => (
							<Card
								key={mode.id}
								className="p-6 transition-shadow cursor-pointer hover:shadow-lg"
							>
								<Link to={getRoutePath(mode.id)} className="block h-full">
									<div className="text-center">
										<div className="mb-4 text-6xl">{mode.emoji}</div>
										<h3 className="mb-2 text-2xl font-bold text-button-primary">
											{mode.title}
										</h3>
										<p className="text-muted-foreground">{mode.description}</p>
									</div>
								</Link>
							</Card>
						))}
					</div>
				</div>
			)}
		</SharedLayout>
	);
}
