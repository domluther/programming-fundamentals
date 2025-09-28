import type { ReactElement } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
	constructQuestions,
	type DataType,
	dataTypeQuestions,
	operatorQuestions,
} from "@/lib/questionData";
import type { Mode, ScoreManager } from "@/lib/scoreManager";
import { cn } from "@/lib/utils";

// Question interface to avoid 'any' type
interface QuestionData {
	explanation: string; // Required - all question types have this
	dataType?: DataType; // Only for Data Types mode
	value?: string; // Only for Data Types mode
	code?: string; // Only for Constructs and Operators modes
	usedConstructs?: string[]; // Only for Constructs mode
	answer?: string; // Only for Operators mode
	operatorCategory?: string; // Only for Operators mode
	sourceMode?: string; // To track original mode in Champion mode
}

interface QuizComponentProps {
	mode: Mode;
	onScoreUpdate: (isCorrect: boolean, questionType: string) => void;
	scoreManager: ScoreManager;
}

export function QuizComponent({
	mode,
	onScoreUpdate,
	scoreManager,
}: QuizComponentProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const sequenceId = useId();
	const selectionId = useId();
	const iterationId = useId();
	const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(
		null,
	);
	const [userAnswer, setUserAnswer] = useState("");
	const [showFeedback, setShowFeedback] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [feedback, setFeedback] = useState<string | ReactElement>("");
	const [stats, setStats] = useState({
		streak: 0,
		currentQuestionType: "",
	});

	// State for constructs checkboxes
	const [constructsChecked, setConstructsChecked] = useState({
		sequence: false,
		selection: false,
		iteration: false,
	});

	// Get current mode stats
	const modeStats = scoreManager.getAllModeStats()[mode];
	const currentStreak = scoreManager.getStreak(mode);
	const accuracy =
		modeStats && modeStats.attempts > 0
			? Math.round((modeStats.correct / modeStats.attempts) * 100)
			: 0;
	const points = modeStats ? modeStats.correct : 0;

	// Generate a random question based on the current mode
	const generateQuestion = useCallback(() => {
		let question: QuestionData | null;
		let questionType = "";
		switch (mode) {
			case "Data Types": {
				const categories = Object.keys(dataTypeQuestions);
				const randomCategory =
					categories[Math.floor(Math.random() * categories.length)];
				const questions = dataTypeQuestions[randomCategory];
				question = questions[Math.floor(Math.random() * questions.length)];
				questionType = `Data Types-${randomCategory}`;
				break;
			}

			case "Constructs":
				question =
					constructQuestions[
						Math.floor(Math.random() * constructQuestions.length)
					];
				questionType = `Constructs-${question.usedConstructs?.join("-") || ""}`;
				break;

			case "Operators":
				question =
					operatorQuestions[
						Math.floor(Math.random() * operatorQuestions.length)
					];
				questionType = `Operators-${question.operatorCategory}`;
				break;

			case "Champion": {
				// Mix of all question types
				const dataTypeQuestionsWithCategory = [];
				for (const [category, questions] of Object.entries(dataTypeQuestions)) {
					dataTypeQuestionsWithCategory.push(
						...questions.map((q) => ({
							...q,
							sourceMode: "Data Types",
							category,
						})),
					);
				}

				const allQuestions = [
					...dataTypeQuestionsWithCategory,
					...constructQuestions.map((q) => ({
						...q,
						sourceMode: "Constructs",
						category: q.usedConstructs.join("-"),
					})),
					...operatorQuestions.map((q) => ({
						...q,
						sourceMode: "Operators",
						category: q.operatorCategory,
					})),
				];

				question =
					allQuestions[Math.floor(Math.random() * allQuestions.length)];
				questionType = `${question.sourceMode}-${question.operatorCategory}`;
				break;
			}

			default:
				question = null;
		}

		setCurrentQuestion(question);
		setUserAnswer("");
		setShowFeedback(false);
		setFeedback("");
		setConstructsChecked({
			sequence: false,
			selection: false,
			iteration: false,
		});
		setStats((prev) => ({ ...prev, currentQuestionType: questionType }));

		// Focus the input after state updates for better UX
		setTimeout(() => {
			if (inputRef.current && mode !== "Constructs") {
				inputRef.current.focus();
			}
		}, 100);
	}, [mode]);

	const generateFeedback = useCallback(
		(correct: boolean, mode: Mode, question: QuestionData) => {
			const capitalisedExplanation = question.explanation
				? question.explanation.charAt(0).toUpperCase() +
					question.explanation.slice(1) +
					"."
				: "";

			if (correct) {
				return <span>✅ Correct! {capitalisedExplanation}</span>;
			}

			// Generate proper feedback based on question type
			if (mode === "Data Types") {
				const correctType = question.dataType as DataType;
				const article = correctType === "integer" ? "an" : "a";
				return (
					<span>
						❌ No, this is {article}{" "}
						<strong>
							{correctType === "boolean" ? "Boolean" : correctType}
						</strong>{" "}
						because {question.explanation}.
					</span>
				);
			} else if (mode === "Constructs") {
				const expectedConstructs = question.usedConstructs || [];
				const constructList = expectedConstructs.join(", ");
				return (
					<span>
						❌ No, this code uses: <strong>{constructList}</strong>.<br />
						{capitalisedExplanation}
					</span>
				);
			} else if (mode === "Operators") {
				return (
					<span>
						❌ No, the answer is <strong>{question.answer}</strong>.<br />
						{capitalisedExplanation}
					</span>
				);
			}

			return "❌ Unable to generate feedback.";
		},
		[],
	);

	// Check the user's answer
	const checkAnswer = useCallback(() => {
		if (!currentQuestion) return;

		// For constructs mode, check if at least one checkbox is selected
		if (
			(mode === "Constructs" ||
				(mode === "Champion" && currentQuestion.sourceMode === "Constructs")) &&
			!constructsChecked.sequence &&
			!constructsChecked.selection &&
			!constructsChecked.iteration
		) {
			return;
		}

		// For other modes, check if text input has content
		if (
			mode !== "Constructs" &&
			!(mode === "Champion" && currentQuestion.sourceMode === "Constructs") &&
			userAnswer.trim() === ""
		) {
			return;
		}

		let correct = false;

		// Determine the actual mode for checking (important for champion mode)
		const actualMode: Mode = (currentQuestion.sourceMode as Mode) || mode;

		if (actualMode === "Data Types") {
			// Shorthand lookup for common data type synonyms
			const dataTypeLookup: { [key: string]: string } = {
				int: "integer",
				integer: "integer",
				real: "float",
				float: "float",
				str: "string",
				string: "string",
				char: "character",
				character: "character",
				bool: "boolean",
				boolean: "boolean",
			};
			const lookedUpAnswer =
				dataTypeLookup[userAnswer.toLowerCase()] || "failed";
			correct = lookedUpAnswer === currentQuestion.dataType?.toLowerCase();
		} else if (actualMode === "Constructs") {
			// For constructs, check if selected checkboxes match expected constructs
			const selectedConstructs = Object.entries(constructsChecked)
				.filter(([_, checked]) => checked)
				.map(([construct, _]) => construct);
			const expectedConstructs = currentQuestion.usedConstructs || [];

			correct =
				selectedConstructs.length === expectedConstructs.length &&
				selectedConstructs.every((construct) =>
					expectedConstructs.includes(construct),
				);
		} else if (actualMode === "Operators") {
			correct = userAnswer.trim() === currentQuestion.answer;
		}

		setIsCorrect(correct);
		setShowFeedback(true);
		const generatedFeedback = generateFeedback(
			correct,
			actualMode,
			currentQuestion,
		);
		setFeedback(generatedFeedback);

		// Update the streak
		if (correct) {
			setStats((prev) => ({ ...prev, streak: prev.streak + 1 }));
		} else {
			setStats((prev) => ({ ...prev, streak: 0 }));
		}

		// Report to the score manager
		onScoreUpdate(correct, stats.currentQuestionType);
	}, [
		currentQuestion,
		userAnswer,
		constructsChecked,
		mode,
		onScoreUpdate,
		stats.currentQuestionType,
		generateFeedback,
	]);

	// Handle next question (either from feedback or Enter key)
	const handleNext = useCallback(() => {
		if (showFeedback) {
			generateQuestion();
		} else {
			checkAnswer();
		}
	}, [showFeedback, generateQuestion, checkAnswer]);

	// Generate first question on mount
	useEffect(() => {
		generateQuestion();
	}, [generateQuestion]);

	// Keyboard event handler
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === "Enter") {
				e.preventDefault();
				handleNext();
			}

			// Keyboard shortcuts for constructs mode (1, 2, 3 keys)
			if (
				(mode === "Constructs" ||
					(mode === "Champion" &&
						currentQuestion?.sourceMode === "Constructs")) &&
				!showFeedback
			) {
				if (e.key === "1") {
					e.preventDefault();
					setConstructsChecked((prev) => ({
						...prev,
						sequence: !prev.sequence,
					}));
				} else if (e.key === "2") {
					e.preventDefault();
					setConstructsChecked((prev) => ({
						...prev,
						selection: !prev.selection,
					}));
				} else if (e.key === "3") {
					e.preventDefault();
					setConstructsChecked((prev) => ({
						...prev,
						iteration: !prev.iteration,
					}));
				}
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [mode, currentQuestion, showFeedback, handleNext]);

	const getHintContent = () => {
		const actualMode = currentQuestion?.sourceMode || mode;

		if (mode === "Champion") {
			return null;
		}

		if (actualMode === "Data Types") {
			return (
				<div className="space-y-3">
					<div className="p-3 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-blue-600">Character</div>
						<div className="mb-2 text-gray-600">
							A single letter, number or symbol
						</div>
						<div className="px-2 py-1 font-mono text-sm text-gray-700 rounded bg-gray-50">
							'a', '!', '2', ' '
						</div>
					</div>
					<div className="p-3 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-blue-600">String</div>
						<div className="mb-2 text-gray-600">A collection of characters</div>
						<div className="px-2 py-1 font-mono text-sm text-gray-700 rounded bg-gray-50">
							'hello', "panda1", ":D"
						</div>
					</div>
					<div className="p-3 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-blue-600">Integer</div>
						<div className="mb-2 text-gray-600">A whole number</div>
						<div className="px-2 py-1 font-mono text-sm text-gray-700 rounded bg-gray-50">
							2, 5, -1
						</div>
					</div>
					<div className="p-3 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-blue-600">Float / Real</div>
						<div className="mb-2 text-gray-600">A number with a decimal</div>
						<div className="px-2 py-1 font-mono text-sm text-gray-700 rounded bg-gray-50">
							-2.2, 3.14
						</div>
					</div>
					<div className="p-3 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-blue-600">Boolean</div>
						<div className="mb-2 text-gray-600">Has only two options</div>
						<div className="px-2 py-1 font-mono text-sm text-gray-700 rounded bg-gray-50">
							True or False
						</div>
					</div>
				</div>
			);
		}

		if (actualMode === "Constructs") {
			return (
				<div className="space-y-3">
					<div className="p-3 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-blue-600">Sequence</div>
						<div className="mb-2 text-gray-600">
							Instructions executed one after another in order.
						</div>
						<div className="px-2 py-1 font-mono text-sm text-gray-700 rounded bg-gray-50">
							Always present in any code.
						</div>
					</div>
					<div className="p-3 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-blue-600">Selection</div>
						<div className="mb-2 text-gray-600">Making decisions in code.</div>
						<div className="px-2 py-1 font-mono text-sm text-gray-700 rounded bg-gray-50">
							Look for: if, elif, else, switch
						</div>
					</div>
					<div className="p-3 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-blue-600">Iteration</div>
						<div className="mb-2 text-gray-600">Repeating code (loops).</div>
						<div className="px-2 py-1 font-mono text-sm text-gray-700 rounded bg-gray-50">
							Look for: for, while, do until
						</div>
					</div>
					<div className="p-3 bg-blue-100 border border-blue-300 rounded-lg">
						<div className="font-medium text-center text-blue-700">
							💡 Use checkboxes or press keys{" "}
							<kbd className="px-1 py-0.5 bg-white rounded border text-xs">
								1
							</kbd>
							,{" "}
							<kbd className="px-1 py-0.5 bg-white rounded border text-xs">
								2
							</kbd>
							,{" "}
							<kbd className="px-1 py-0.5 bg-white rounded border text-xs">
								3
							</kbd>{" "}
							to toggle
						</div>
					</div>
				</div>
			);
		}

		if (actualMode === "Operators") {
			return (
				<div className="space-y-3">
					<div className="p-3 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-blue-600">
							Arithmetic Operators
						</div>
						<div className="mb-2 text-gray-600">Mathematical operations.</div>
						<div className="px-2 py-1 font-mono text-sm text-gray-700 rounded bg-gray-50">
							+ (add), - (subtract), * (multiply), / (divide)
						</div>
					</div>
					<div className="p-3 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-blue-600">
							Special Operators
						</div>
						<div className="mb-2 text-gray-600">OCR specific operations.</div>
						<div className="px-2 py-1 font-mono text-sm text-gray-700 rounded bg-gray-50">
							MOD (remainder), DIV (integer division), ^ (power)
						</div>
					</div>
					<div className="p-3 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-blue-600">
							Comparison Operators
						</div>
						<div className="mb-2 text-gray-600">
							Compare values (result is true or false).
						</div>
						<div className="px-2 py-1 font-mono text-sm text-gray-700 rounded bg-gray-50">
							== (equal), != (not equal), &lt; (less than), &gt; (greater than),
							&lt;= (less than or equal to), &gt;= (greater than or equal to)
						</div>
					</div>
				</div>
			);
		}

		return null;
	};

	return (
		<div className="space-y-6">
			{/* Mode Stats Display */}
			<Card className="p-4 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="text-center">
						<div className="text-2xl font-bold text-blue-600">{points}</div>
						<div className="text-sm text-gray-600">Points</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-green-600">
							{currentStreak}
						</div>
						<div className="text-sm text-gray-600">Current Streak</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-purple-600">
							{modeStats?.recordStreak || 0}
						</div>
						<div className="text-sm text-gray-600">Best Streak</div>
					</div>
					<div className="text-center">
						<div
							className={cn(
								"text-2xl font-bold",
								accuracy >= 80
									? "text-green-600"
									: accuracy >= 60
										? "text-yellow-600"
										: "text-red-600",
							)}
						>
							{accuracy}%
						</div>
						<div className="text-sm text-gray-600">Accuracy</div>
					</div>
				</div>
			</Card>

			{/* Question Section */}
			{currentQuestion && (
				<Card className="p-6 bg-white shadow-lg">
					<div className="mb-4 text-center">
						{(mode === "Data Types" ||
							(mode === "Champion" &&
								currentQuestion.sourceMode === "Data Types")) && (
							<div>
								<p className="p-4 mb-2 text-lg font-semibold text-left text-white bg-indigo-600 rounded-lg shadow">
									Identify the data type
								</p>
								<div className="p-4 mb-4 font-mono text-xl font-light text-left bg-gray-100 rounded-lg">
									{currentQuestion.value}
								</div>
							</div>
						)}

						{(mode === "Constructs" ||
							(mode === "Champion" &&
								currentQuestion.sourceMode === "Constructs")) && (
							<div>
								<p className="p-4 mb-2 text-lg font-semibold text-left text-white bg-indigo-600 rounded-lg shadow">
									Identify the programming constructs used
								</p>
								<pre className="p-4 mb-4 overflow-x-auto text-xl text-left bg-gray-100 rounded-lg">
									<code className="font-light">{currentQuestion.code}</code>
								</pre>
							</div>
						)}

						{(mode === "Operators" ||
							(mode === "Champion" &&
								currentQuestion.sourceMode === "Operators")) && (
							<div>
								<p className="p-4 mb-2 text-lg font-semibold text-left text-white bg-indigo-600 rounded-lg shadow">
									State the result of the following expression
								</p>
								<pre className="p-4 mb-4 overflow-x-auto text-xl text-left bg-gray-100 rounded-lg">
									<code className="font-light">{currentQuestion.code}</code>
								</pre>
							</div>
						)}
					</div>

					{/* Input Section */}
					{mode === "Constructs" ||
					(mode === "Champion" &&
						currentQuestion.sourceMode === "Constructs") ? (
						// Checkbox input for constructs
						<div className="mb-4">
							<div className="flex flex-wrap justify-center mb-4 gap-3 sm:gap-4">
								<label
									htmlFor={sequenceId}
									className="flex items-center space-x-3 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 min-w-[120px] justify-center"
								>
									<Checkbox
										id={sequenceId}
										checked={constructsChecked.sequence}
										onCheckedChange={(checked) =>
											setConstructsChecked((prev) => ({
												...prev,
												sequence: checked as boolean,
											}))
										}
										className="w-5 h-5"
									/>
									<span className="text-sm font-medium leading-none select-none">
										<kbd className="px-2 py-1 mr-2 font-mono text-xs bg-gray-100 border rounded">
											1
										</kbd>
										Sequence
									</span>
								</label>

								<label
									htmlFor={selectionId}
									className="flex items-center space-x-3 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 min-w-[120px] justify-center"
								>
									<Checkbox
										id={selectionId}
										checked={constructsChecked.selection}
										onCheckedChange={(checked) =>
											setConstructsChecked((prev) => ({
												...prev,
												selection: checked as boolean,
											}))
										}
										className="w-5 h-5"
									/>
									<span className="text-sm font-medium leading-none select-none">
										<kbd className="px-2 py-1 mr-2 font-mono text-xs bg-gray-100 border rounded">
											2
										</kbd>
										Selection
									</span>
								</label>

								<label
									htmlFor={iterationId}
									className="flex items-center space-x-3 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 min-w-[120px] justify-center"
								>
									<Checkbox
										id={iterationId}
										checked={constructsChecked.iteration}
										onCheckedChange={(checked) =>
											setConstructsChecked((prev) => ({
												...prev,
												iteration: checked as boolean,
											}))
										}
										className="w-5 h-5"
									/>
									<span className="text-sm font-medium leading-none select-none">
										<kbd className="px-2 py-1 mr-2 font-mono text-xs bg-gray-100 border rounded">
											3
										</kbd>
										Iteration
									</span>
								</label>
							</div>

							<div className="text-center">
								<Button
									onClick={checkAnswer}
									disabled={
										!constructsChecked.sequence &&
										!constructsChecked.selection &&
										!constructsChecked.iteration
									}
									className="px-8 py-3 font-semibold text-white rounded-lg shadow-lg transition-all duration-200 transform bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:-translate-y-1 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:shadow-lg disabled:transform-none"
								>
									Submit Answer
								</Button>
							</div>
						</div>
					) : (
						// Text input for other modes
						<div className="mb-4">
							<Input
								ref={inputRef}
								type="text"
								value={userAnswer}
								onChange={(e) => setUserAnswer(e.target.value)}
								placeholder="Enter your answer and press Enter..."
								onKeyPress={(e) => e.key === "Enter" && handleNext()}
								className="p-6 text-lg font-bold text-center border-2 border-indigo-200 shadow-lg transition-all duration-200 sm:text-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 rounded-xl bg-gradient-to-r from-white to-indigo-50 focus-visible:ring-indigo-200/50"
								disabled={showFeedback}
							/>
							<p className="mt-1 text-xs text-center text-gray-500">
								Press Enter to submit
							</p>
						</div>
					)}

					{/* Feedback */}
					{showFeedback && (
						<div
							className={`p-4 rounded-lg mb-4 ${isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
						>
							{feedback}
							<div className="mt-3 text-center space-y-3">
								<button
									type="button"
									onClick={() => generateQuestion()}
									aria-label="Generate next question"
									className="px-8 py-3 font-semibold text-white rounded-lg shadow-lg transition-all duration-200 transform bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:-translate-y-1"
								>
									<span className="mr-2">🎯</span>
									Next Question
								</button>
							</div>
						</div>
					)}

					{/* Hints Section - Details/Summary Pattern. Not in champion mode */}
					{mode !== "Champion" && (
						<details className="mt-6 group">
							<summary className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 shadow-sm hover:shadow-md list-none [&::-webkit-details-marker]:hidden">
								<span className="flex items-center font-semibold text-blue-800">
									<span className="mr-2 text-lg">💡</span>
									Get help with this question
									<span className="ml-auto transition-transform duration-200 group-open:rotate-180">
										▼
									</span>
								</span>
							</summary>
							<div className="p-5 mt-3 border border-blue-200 rounded-lg shadow-sm bg-gradient-to-br from-slate-50 to-blue-50">
								<div className="text-base">{getHintContent()}</div>
							</div>
						</details>
					)}
				</Card>
			)}
		</div>
	);
}
