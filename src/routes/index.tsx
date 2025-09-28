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
			case "Champion":
				return "/champion";
			default:
				return "/";
		}
	};

	return (
		<SharedLayout>
			{() => (
				<div className="text-center space-y-8">
					<div className="mb-12">
						<h2 className="mb-4 text-3xl font-bold text-gray-800">
							Choose Your Quiz Mode
						</h2>
						<p className="text-lg text-gray-600">
							Master programming fundamentals with interactive quizzes
						</p>
					</div>

					<div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
						{Object.values(QUIZ_MODES).map((mode) => (
							<Card
								key={mode.id}
								className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
							>
								<Link to={getRoutePath(mode.id)} className="block h-full">
									<div className="text-center">
										<div className="mb-4 text-6xl">{mode.emoji}</div>
										<h3 className="mb-2 text-2xl font-bold text-indigo-600">
											{mode.title}
										</h3>
										<p className="text-gray-600">{mode.description}</p>
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
