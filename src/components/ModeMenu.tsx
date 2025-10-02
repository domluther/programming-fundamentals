import { Link, useLocation } from "@tanstack/react-router";
import { QuizButton } from "./QuizButton";

// Quiz mode button data
const QUIZ_MODES = [
	{ label: "Data Types", path: "/datatypes", emoji: "📝" },
	{ label: "Constructs", path: "/constructs", emoji: "🏗️" },
	{ label: "Operators", path: "/operators", emoji: "🔢" },
	{ label: "Keywords", path: "/keywords", emoji: "🔍" },
	{ label: "Champion", path: "/champion", emoji: "🏆" },
];

export const ModeMenu = () => {
	const location = useLocation();

	return (
		<div className="flex flex-row justify-center px-4 mt-2 mb-4 gap-2 sm:gap-4">
			{QUIZ_MODES.map((mode) => (
				<Link key={mode.path} to={mode.path} className="flex-1 sm:flex-none">
					<QuizButton
						variant="menu"
						className={`w-full sm:w-auto text-sm sm:text-base p-3 sm:p-6 ${
							location.pathname === mode.path
								? "text-white bg-green-600  hover:bg-green-700 hover:shadow-lg"
								: ""
						}`}
					>
						{mode.emoji} {mode.label}
					</QuizButton>
				</Link>
			))}
		</div>
	);
};
