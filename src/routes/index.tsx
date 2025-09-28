import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { SharedLayout } from "@/components";
import { QUIZ_MODES } from "@/lib/questionData";

export const Route = createFileRoute("/")({
	component: IndexPage,
});

function IndexPage() {
	return (
		<SharedLayout>
			{() => (
				<div className="text-center space-y-8">
					<div className="mb-12">
						<h2 className="text-3xl font-bold mb-4 text-gray-800">Choose Your Quiz Mode</h2>
						<p className="text-lg text-gray-600">Master programming fundamentals with interactive quizzes</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
						{Object.values(QUIZ_MODES).map((mode) => (
							<Card key={mode.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
								<Link 
									to={`/${mode.id}` as any}
									className="block h-full"
								>
									<div className="text-center">
										<div className="text-6xl mb-4">{mode.emoji}</div>
										<h3 className="text-2xl font-bold mb-2 text-indigo-600">{mode.title}</h3>
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
