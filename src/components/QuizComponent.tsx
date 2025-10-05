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
	category?: string; // To track category in Champion mode
	// Keyword mode specific
	keywordPrompt?: string; // Dynamic prompt for keyword questions
	keywordAnswer?: string | string[]; // Answer(s) for keyword questions
	keywordType?: string; // Type of keyword question
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

			case "Keywords": {
				const baseQuestion =
					constructQuestions[
						Math.floor(Math.random() * constructQuestions.length)
					];

				// Generate a random question type based on available metadata
				const availableQuestionTypes = [];
				const metadata = baseQuestion.metadata;

				if (metadata?.variables && metadata.variables.length >= 1) {
					availableQuestionTypes.push("identify-variable");
				}
				if (
					metadata?.concatenationLines &&
					metadata.concatenationLines.length > 0
				) {
					availableQuestionTypes.push("find-concatenation");
				}
				if (metadata?.castingUsed && metadata.castingUsed.length > 0) {
					availableQuestionTypes.push("identify-casting");
					availableQuestionTypes.push("find-casting");
				}
				if (
					metadata?.operators?.arithmetic &&
					metadata.operators.arithmetic.length > 0
				) {
					availableQuestionTypes.push("identify-arithmetic-operator");
				}
				if (
					metadata?.operators?.comparison &&
					metadata.operators.comparison.length > 0
				) {
					availableQuestionTypes.push("identify-comparison-operator");
				}

				// Pick a random question type from available ones
				const selectedQuestionType =
					availableQuestionTypes.length > 0
						? availableQuestionTypes[
								Math.floor(Math.random() * availableQuestionTypes.length)
							]
						: "identify-variable"; // fallback

				// Generate question based on type
				let prompt = "";
				let answer: string | string[] = "";

				switch (selectedQuestionType) {
					case "identify-variable":
						prompt =
							"Give the identifier of one variable used in the algorithm.";
						answer = metadata?.variables || [];
						break;
					case "find-concatenation":
						prompt = "Give the line number where there is concatenation.";
						answer =
							metadata?.concatenationLines?.map((n) => n.toString()) || [];
						break;
					case "identify-casting":
						prompt =
							"Identify the function that converts data to a different type.";
						answer = metadata?.castingUsed?.map((c) => c.type) || [];
						break;
					case "find-casting":
						prompt = "Identify the line number where there is casting.";
						answer = metadata?.castingUsed?.map((c) => c.line.toString()) || [];
						break;
					case "identify-arithmetic-operator":
						prompt = "Give one arithmetic operator used in the algorithm.";
						answer = metadata?.operators?.arithmetic || [];
						break;
					case "identify-comparison-operator":
						prompt = "Give one comparison operator used in the algorithm.";
						answer = metadata?.operators?.comparison || [];
						break;
				}

				question = {
					...baseQuestion,
					keywordPrompt: prompt,
					keywordAnswer: answer,
					keywordType: selectedQuestionType,
				};
				questionType = `Keywords-${selectedQuestionType}`;
				break;
			}

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

				// Generate Keywords questions from the construct questions
				const keywordQuestionsWithCategory = [];
				for (const baseQuestion of constructQuestions) {
					const metadata = baseQuestion.metadata;
					const availableQuestionTypes = [];

					if (metadata?.variables && metadata.variables.length >= 1) {
						availableQuestionTypes.push("identify-variable");
					}
					if (
						metadata?.concatenationLines &&
						metadata.concatenationLines.length > 0
					) {
						availableQuestionTypes.push("find-concatenation");
					}
					if (metadata?.castingUsed && metadata.castingUsed.length > 0) {
						availableQuestionTypes.push("identify-casting");
						availableQuestionTypes.push("find-casting");
					}
					if (
						metadata?.operators?.arithmetic &&
						metadata.operators.arithmetic.length > 0
					) {
						availableQuestionTypes.push("identify-arithmetic-operator");
					}
					if (
						metadata?.operators?.comparison &&
						metadata.operators.comparison.length > 0
					) {
						availableQuestionTypes.push("identify-comparison-operator");
					}

					// Create a question for each available type
					for (const questionType of availableQuestionTypes) {
						let prompt = "";
						let answer: string | string[] = "";

						switch (questionType) {
							case "identify-variable":
								prompt =
									"Give the identifier of one variable used in the algorithm.";
								answer = metadata?.variables || [];
								break;
							case "find-concatenation":
								prompt = "Give the line number where there is concatenation.";
								answer =
									metadata?.concatenationLines?.map((n) => n.toString()) || [];
								break;
							case "identify-casting":
								prompt =
									"Identify the process that converts data to a different type.";
								answer = metadata?.castingUsed?.map((c) => c.type) || [];
								break;
							case "find-casting":
								prompt = "Identify the line number where there is casting.";
								answer =
									metadata?.castingUsed?.map((c) => c.line.toString()) || [];
								break;
							case "identify-arithmetic-operator":
								prompt = "Give one arithmetic operator used in the algorithm.";
								answer = metadata?.operators?.arithmetic || [];
								break;
							case "identify-comparison-operator":
								prompt = "Give one comparison operator used in the algorithm.";
								answer = metadata?.operators?.comparison || [];
								break;
						}

						keywordQuestionsWithCategory.push({
							...baseQuestion,
							sourceMode: "Keywords",
							category: questionType,
							keywordPrompt: prompt,
							keywordAnswer: answer,
							keywordType: questionType,
						});
					}
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
					...keywordQuestionsWithCategory,
				];

				question =
					allQuestions[Math.floor(Math.random() * allQuestions.length)];
				questionType = `${question.sourceMode}-${question.category}`;
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

			// Keywords mode always shows generic hint
			if (mode === "Keywords") {
				const keywordAnswers = question.keywordAnswer;
				let answerDisplay = "";

				if (Array.isArray(keywordAnswers)) {
					if (keywordAnswers.length === 1) {
						answerDisplay = keywordAnswers[0].toString();
					} else {
						answerDisplay = `Any of: ${keywordAnswers.join(", ")}`;
					}
				} else if (typeof keywordAnswers === "string") {
					answerDisplay = keywordAnswers;
				}

				// Generate generic hint based on question type
				let hint = "";
				switch (question.keywordType) {
					case "identify-variable":
						hint = "Variables are identifiers used to store data values.";
						break;
					case "find-concatenation":
						hint =
							"Concatenation joins strings together, often using the + operator.";
						break;
					case "identify-casting":
					case "find-casting":
						hint =
							"Casting converts data from one type to another (e.g., str(), int(), float()).";
						break;
					case "identify-arithmetic-operator":
						hint =
							"Arithmetic operators perform mathematical operations: +, -, *, /, %, **, //.";
						break;
					case "identify-comparison-operator":
						hint = "Comparison operators compare values: ==, !=, <, >, <=, >=.";
						break;
					default:
						hint = "Review the code carefully to identify the answer.";
				}

				if (correct) {
					return (
						<span>
							✅ Correct!
							<br />
							{hint}
						</span>
					);
				} else {
					return (
						<span>
							❌ No, the answer is: <strong>{answerDisplay}</strong>.<br />
							{hint}
						</span>
					);
				}
			}

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
		} else if (actualMode === "Keywords") {
			// For keywords, check if answer matches any of the valid answers
			const keywordAnswers = currentQuestion.keywordAnswer;
			const userAnswerTrimmed = userAnswer.trim().toLowerCase();

			if (Array.isArray(keywordAnswers)) {
				// Accept any of the valid answers (case-insensitive)
				correct = keywordAnswers.some(
					(ans) => ans.toString().toLowerCase() === userAnswerTrimmed,
				);
			} else if (typeof keywordAnswers === "string") {
				correct = keywordAnswers.toLowerCase() === userAnswerTrimmed;
			}
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
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">Character</div>
						<div className="mb-2 text-hint-card-text">
							A single letter, number or symbol
						</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							'a', '!', '2', ' '
						</div>
					</div>
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">String</div>
						<div className="mb-2 text-hint-card-text">A collection of characters</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							'hello', "panda1", ":D"
						</div>
					</div>
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">Integer</div>
						<div className="mb-2 text-hint-card-text">A whole number</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							2, 5, -1
						</div>
					</div>
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">Float / Real</div>
						<div className="mb-2 text-hint-card-text">A number with a decimal</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							-2.2, 3.14
						</div>
					</div>
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">Boolean</div>
						<div className="mb-2 text-hint-card-text">Has only two options</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							True or False
						</div>
					</div>
				</div>
			);
		}

		if (actualMode === "Constructs") {
			return (
				<div className="space-y-3">
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">Sequence</div>
						<div className="mb-2 text-hint-card-text">
							Instructions executed one after another in order.
						</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							Always present in any code.
						</div>
					</div>
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">Selection</div>
						<div className="mb-2 text-hint-card-text">Making decisions in code.</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							Look for: if, elif, else, switch
						</div>
					</div>
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">Iteration</div>
						<div className="mb-2 text-hint-card-text">Repeating code (loops).</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							Look for: for, while, do until
						</div>
					</div>
					<div className="p-3 bg-hint-tip-bg border border-hint-tip-border rounded-lg">
						<div className="font-medium text-center text-hint-tip-text">
							💡 Use checkboxes or press keys{" "}
							<kbd className="px-1 py-0.5 bg-background rounded border text-xs">
								1
							</kbd>
							,{" "}
							<kbd className="px-1 py-0.5 bg-background rounded border text-xs">
								2
							</kbd>
							,{" "}
							<kbd className="px-1 py-0.5 bg-background rounded border text-xs">
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
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">
							Arithmetic Operators
						</div>
						<div className="mb-2 text-hint-card-text">Mathematical operations.</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							+ (add), - (subtract), * (multiply), / (divide)
						</div>
					</div>
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">
							Special Operators
						</div>
						<div className="mb-2 text-hint-card-text">OCR specific operations.</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							MOD (remainder), DIV (integer division), ^ (power)
						</div>
					</div>
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">
							Comparison Operators
						</div>
						<div className="mb-2 text-hint-card-text">
							Compare values (result is true or false).
						</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							== (equal), != (not equal), &lt; (less than), &gt; (greater than),
							&lt;= (less than or equal to), &gt;= (greater than or equal to)
						</div>
					</div>
				</div>
			);
		}

		if (actualMode === "Keywords") {
			return (
				<div className="space-y-3">
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">Variables</div>
						<div className="mb-2 text-hint-card-text">
							Named storage locations - look for assignment statements.
						</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							Examples: age, name, total, price
						</div>
					</div>
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">Concatenation</div>
						<div className="mb-2 text-hint-card-text">
							Joining strings together using the + operator.
						</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							"Hello " + name → Joins text strings
						</div>
					</div>
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">Casting</div>
						<div className="mb-2 text-hint-card-text">
							Converting data from one type to another.
						</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							str(), int(), float() - conversion functions
						</div>
					</div>
					<div className="p-3 bg-hint-card-bg border-l-4 border-hint-card-border rounded-lg shadow-sm">
						<div className="mb-1 font-bold text-hint-card-title">Operators</div>
						<div className="mb-2 text-hint-card-text">
							Symbols that perform operations.
						</div>
						<div className="px-2 py-1 font-mono text-sm text-hint-card-code-text rounded bg-hint-card-code-bg">
							Arithmetic: +, -, *, / | Comparison: &lt;, &gt;, ==, !=
						</div>
					</div>
					<div className="p-3 bg-hint-tip-bg border border-hint-tip-border rounded-lg">
						<div className="font-medium text-center text-hint-tip-text">
							💡 Read the code line by line to find what the question asks for
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
			<Card className="p-4 border-l-4 border-stats-card-border bg-stats-card-bg">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="text-center">
						<div className="text-2xl font-bold text-stats-points">{points}</div>
						<div className="text-sm text-stats-label">Points</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-stats-streak">
							{currentStreak}
						</div>
						<div className="text-sm text-stats-label">Current Streak</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-stats-record">
							{modeStats?.recordStreak || 0}
						</div>
						<div className="text-sm text-stats-label">Best Streak</div>
					</div>
					<div className="text-center">
						<div
							className={cn(
								"text-2xl font-bold",
								accuracy >= 80
									? "text-stats-accuracy-high"
									: accuracy >= 60
										? "text-stats-accuracy-medium"
										: "text-stats-accuracy-low",
							)}
						>
							{accuracy}%
						</div>
						<div className="text-sm text-stats-label">Accuracy</div>
					</div>
				</div>
			</Card>

			{/* Question Section */}
			{currentQuestion && (
				<Card className="p-6 bg-card shadow-lg">
					<div className="mb-4 text-center">
						{(mode === "Data Types" ||
							(mode === "Champion" &&
								currentQuestion.sourceMode === "Data Types")) && (
							<div>
								<p className="p-4 mb-2 text-lg font-semibold text-left text-question-prompt-text bg-question-prompt-bg rounded-lg shadow">
									Identify the data type
								</p>
								<div className="p-4 mb-4 font-mono text-xl font-light text-left text-code-display-text bg-code-display-bg rounded-lg">
									{currentQuestion.value}
								</div>
							</div>
						)}

						{(mode === "Constructs" ||
							(mode === "Champion" &&
								currentQuestion.sourceMode === "Constructs")) && (
							<div>
								<p className="p-4 mb-2 text-lg font-semibold text-left text-question-prompt-text bg-question-prompt-bg rounded-lg shadow">
									Identify the programming constructs used
								</p>
								<pre className="p-4 mb-4 overflow-x-auto text-xl text-left text-code-display-text bg-code-display-bg rounded-lg">
									<code className="font-light">{currentQuestion.code}</code>
								</pre>
							</div>
						)}

						{(mode === "Operators" ||
							(mode === "Champion" &&
								currentQuestion.sourceMode === "Operators")) && (
							<div>
								<p className="p-4 mb-2 text-lg font-semibold text-left text-question-prompt-text bg-question-prompt-bg rounded-lg shadow">
									State the result of the following expression
								</p>
								<pre className="p-4 mb-4 overflow-x-auto text-xl text-left text-code-display-text bg-code-display-bg rounded-lg">
									<code className="font-light">{currentQuestion.code}</code>
								</pre>
							</div>
						)}

						{(mode === "Keywords" ||
							(mode === "Champion" &&
								currentQuestion.sourceMode === "Keywords")) && (
							<div>
								<p className="p-4 mb-2 text-lg font-semibold text-left text-question-prompt-text bg-question-prompt-bg rounded-lg shadow">
									{currentQuestion.keywordPrompt ||
										"Answer the question about the code"}
								</p>
								<pre className="p-4 mb-4 overflow-x-auto text-xl text-left text-code-display-text bg-code-display-bg rounded-lg">
									<code className="font-light">
										{(currentQuestion.code || "")
											.split("\n")
											.map((line, index) => (
												<div
													key={`line-${index}-${line.slice(0, 20)}`}
													className="flex"
												>
													<span className="inline-block w-8 mr-4 text-right text-code-line-number select-none">
														{index + 1}
													</span>
													<span>{line}</span>
												</div>
											))}
									</code>
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
									className="flex items-center space-x-3 cursor-pointer p-3 border-2 border-checkbox-label-border rounded-lg hover:border-checkbox-label-border-hover hover:bg-checkbox-label-bg-hover transition-colors duration-200 min-w-[120px] justify-center"
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
										<kbd className="px-2 py-1 mr-2 font-mono text-xs bg-checkbox-kbd-bg border rounded">
											1
										</kbd>
										Sequence
									</span>
								</label>

								<label
									htmlFor={selectionId}
									className="flex items-center space-x-3 cursor-pointer p-3 border-2 border-checkbox-label-border rounded-lg hover:border-checkbox-label-border-hover hover:bg-checkbox-label-bg-hover transition-colors duration-200 min-w-[120px] justify-center"
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
										<kbd className="px-2 py-1 mr-2 font-mono text-xs bg-checkbox-kbd-bg border rounded">
											2
										</kbd>
										Selection
									</span>
								</label>

								<label
									htmlFor={iterationId}
									className="flex items-center space-x-3 cursor-pointer p-3 border-2 border-checkbox-label-border rounded-lg hover:border-checkbox-label-border-hover hover:bg-checkbox-label-bg-hover transition-colors duration-200 min-w-[120px] justify-center"
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
										<kbd className="px-2 py-1 mr-2 font-mono text-xs bg-checkbox-kbd-bg border rounded">
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
										showFeedback ||
										(!constructsChecked.sequence &&
										!constructsChecked.selection &&
										!constructsChecked.iteration)
									}
									className="px-8 py-3 font-semibold text-action-button-text rounded-lg shadow-lg transition-all duration-200 transform bg-action-button-bg hover:bg-action-button-bg-hover hover:shadow-xl hover:-translate-y-1 disabled:bg-action-button-disabled disabled:hover:shadow-lg disabled:transform-none"
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
								className="p-6 text-lg font-bold text-center border-2 border-button-primary shadow-lg transition-all duration-200 sm:text-2xl focus:border-button-primary-hover focus:ring-4 focus:ring-button-primary/20 rounded-xl bg-gradient-to-r from-background to-button-primary/10 focus-visible:ring-button-primary/50"
								disabled={showFeedback}
							/>
							<p className="mt-1 text-xs text-center text-muted-foreground">
								Press Enter to submit
							</p>
						</div>
					)}

					{/* Feedback */}
					{showFeedback && (
						<div
							className={`p-4 rounded-lg mb-4 ${isCorrect ? "bg-feedback-success-bg text-feedback-success-text" : "bg-feedback-error-bg text-feedback-error-text"}`}
						>
							{feedback}
							<div className="mt-3 text-center space-y-3">
								<button
									type="button"
									onClick={() => generateQuestion()}
									aria-label="Generate next question"
									className="px-8 py-3 font-semibold text-action-button-text rounded-lg shadow-lg transition-all duration-200 transform bg-action-button-bg hover:bg-action-button-bg-hover hover:shadow-xl hover:-translate-y-1"
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
							<summary className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-button-primary focus:ring-offset-2 rounded-lg px-4 py-3 bg-hint-summary-bg border border-hint-summary-border hover:bg-hint-summary-bg-hover transition-all duration-200 shadow-sm hover:shadow-md list-none [&::-webkit-details-marker]:hidden">
								<span className="flex items-center font-semibold text-hint-summary-text">
									<span className="mr-2 text-lg">💡</span>
									Get help with this question
									<span className="ml-auto transition-transform duration-200 group-open:rotate-180">
										▼
									</span>
								</span>
							</summary>
							<div className="p-5 mt-3 border border-hint-summary-border rounded-lg shadow-sm bg-hint-content-bg">
								<div className="text-base">{getHintContent()}</div>
							</div>
						</details>
					)}
				</Card>
			)}
		</div>
	);
}
