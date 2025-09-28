import type { Mode } from "./scoreManager";

// Question types and interfaces
export interface DataTypeQuestion {
	value: string;
	dataType: DataType;
	explanation: string;
}

export type DataType = "character" | "string" | "integer" | "float" | "boolean";

export interface ConstructQuestion {
	code: string;
	usedConstructs: string[];
	explanation: string;
}

export interface OperatorQuestion {
	code: string;
	answer: string;
	explanation: string;
	operatorCategory: string;
}

export interface QuizMode {
	id: Mode;
	title: string;
	description: string;
	emoji: string;
}

export const QUIZ_MODES: Record<string, QuizMode> = {
	"Data Types": {
		id: "Data Types",
		title: "Data Types",
		description: "Identify the data type of each value",
		emoji: "📝",
	},
	Constructs: {
		id: "Constructs",
		title: "Constructs",
		description: "Identify programming constructs in code",
		emoji: "🏗️",
	},
	Operators: {
		id: "Operators",
		title: "Operators",
		description: "Solve operator expressions and comparisons",
		emoji: "🔢",
	},
	Champion: {
		id: "Champion",
		title: "Champion",
		description: "Mixed questions from all categories",
		emoji: "🏆",
	},
};

const INDENT = "   "; // 3 spaces for indentation - used for consistency

// Data Type Questions
export const dataTypeQuestions: Record<string, DataTypeQuestion[]> = {
	character: [
		{
			value: "'a'",
			dataType: "character",
			explanation: "it's a single letter with quotes",
		},
		{
			value: "'!'",
			dataType: "character",
			explanation: "it's a single symbol with quotes",
		},
		{
			value: "'9'",
			dataType: "character",
			explanation: "it's a single number with quotes",
		},
		{
			value: "'@'",
			dataType: "character",
			explanation: "it's a single symbol with quotes",
		},
		{
			value: "' '",
			dataType: "character",
			explanation: "it's a single space character with quotes",
		},
		{
			value: "'Z'",
			dataType: "character",
			explanation: "it's a single letter with quotes",
		},
		{
			value: "'$'",
			dataType: "character",
			explanation: "it's a single symbol with quotes",
		},
		{
			value: "'%'",
			dataType: "character",
			explanation: "it's a single symbol with quotes",
		},
		{
			value: "'&'",
			dataType: "character",
			explanation: "it's a single symbol with quotes",
		},
		{
			value: "'*'",
			dataType: "character",
			explanation: "it's a single symbol with quotes",
		},
		{
			value: "'#'",
			dataType: "character",
			explanation: "it's a single symbol with quotes",
		},
		{
			value: "'+'",
			dataType: "character",
			explanation: "it's a single symbol with quotes",
		},
		{
			value: "'='",
			dataType: "character",
			explanation: "it's a single symbol with quotes",
		},
		{
			value: "'?'",
			dataType: "character",
			explanation: "it's a single symbol with quotes",
		},
		{
			value: "'x'",
			dataType: "character",
			explanation: "it's a single letter with quotes",
		},
		{
			value: "'5'",
			dataType: "character",
			explanation: "it's a single number with quotes",
		},
	],
	string: [
		{
			value: "'hello'",
			dataType: "string",
			explanation: "it's a collection of characters with quotes",
		},
		{
			value: '"world"',
			dataType: "string",
			explanation: "it's a collection of characters with quotes",
		},
		{
			value: '":D"',
			dataType: "string",
			explanation: "it's a collection of symbols with quotes",
		},
		{
			value: '"panda1"',
			dataType: "string",
			explanation: "it's a collection of characters and numbers with quotes",
		},
		{
			value: "'Python'",
			dataType: "string",
			explanation: "it's a collection of characters with quotes",
		},
		{
			value: '"123abc"',
			dataType: "string",
			explanation: "it's a collection of characters and numbers with quotes",
		},
		{
			value: "'Good morning!'",
			dataType: "string",
			explanation: "it's a collection of characters with quotes",
		},
		{
			value: '"Hello World"',
			dataType: "string",
			explanation: "it's a collection of characters with quotes",
		},
		{
			value: '"Computer Science"',
			dataType: "string",
			explanation: "it's a collection of characters with quotes",
		},
		{
			value: "'123'",
			dataType: "string",
			explanation: "it's numbers in quotes, making it a string",
		},
		{
			value: '"OCR GCSE"',
			dataType: "string",
			explanation: "it's a collection of characters and spaces with quotes",
		},
		{
			value: "'True'",
			dataType: "string",
			explanation: "it's the word True in quotes, making it a string",
		},
		{
			value: '"False"',
			dataType: "string",
			explanation: "it's the word False in quotes, making it a string",
		},
		{
			value: "'£25.50'",
			dataType: "string",
			explanation: "it's characters including a currency symbol in quotes",
		},
		{
			value: '"user@email.com"',
			dataType: "string",
			explanation: "it's an email address in quotes, making it a string",
		},
		{
			value: "'Programming is fun!'",
			dataType: "string",
			explanation: "it's a sentence with spaces and punctuation in quotes",
		},
	],
	integer: [
		{
			value: "42",
			dataType: "integer",
			explanation: "it's a whole number without quotes",
		},
		{
			value: "0",
			dataType: "integer",
			explanation: "it's zero, which is a whole number",
		},
		{
			value: "-15",
			dataType: "integer",
			explanation: "it's a negative whole number",
		},
		{
			value: "100",
			dataType: "integer",
			explanation: "it's a positive whole number",
		},
		{
			value: "-7",
			dataType: "integer",
			explanation: "it's a negative whole number",
		},
		{
			value: "256",
			dataType: "integer",
			explanation: "it's a positive whole number",
		},
		{
			value: "-999",
			dataType: "integer",
			explanation: "it's a negative whole number",
		},
		{
			value: "1",
			dataType: "integer",
			explanation: "it's a positive whole number",
		},
		{
			value: "-1",
			dataType: "integer",
			explanation: "it's a negative whole number",
		},
		{
			value: "50",
			dataType: "integer",
			explanation: "it's a positive whole number",
		},
		{
			value: "2024",
			dataType: "integer",
			explanation: "it's a positive whole number",
		},
		{
			value: "-100",
			dataType: "integer",
			explanation: "it's a negative whole number",
		},
		{
			value: "365",
			dataType: "integer",
			explanation: "it's a positive whole number",
		},
		{
			value: "12",
			dataType: "integer",
			explanation: "it's a positive whole number",
		},
		{
			value: "-50",
			dataType: "integer",
			explanation: "it's a negative whole number",
		},
		{
			value: "999",
			dataType: "integer",
			explanation: "it's a positive whole number",
		},
	],
	float: [
		{
			value: "3.14",
			dataType: "float",
			explanation: "it's a decimal number",
		},
		{
			value: "-2.5",
			dataType: "float",
			explanation: "it's a negative decimal number",
		},
		{
			value: "0.0",
			dataType: "float",
			explanation: "it's zero as a decimal number",
		},
		{
			value: "25.99",
			dataType: "float",
			explanation: "it's a positive decimal number",
		},
		{
			value: "-15.75",
			dataType: "float",
			explanation: "it's a negative decimal number",
		},
		{
			value: "1.0",
			dataType: "float",
			explanation: "it's one as a decimal number",
		},
		{
			value: "100.5",
			dataType: "float",
			explanation: "it's a decimal number with a fractional part",
		},
		{
			value: "-0.1",
			dataType: "float",
			explanation: "it's a small negative decimal number",
		},
		{
			value: "2.718",
			dataType: "float",
			explanation: "it's a decimal number with multiple decimal places",
		},
		{
			value: "99.99",
			dataType: "float",
			explanation: "it's a decimal number often used for prices",
		},
		{
			value: "-273.15",
			dataType: "float",
			explanation: "it's a negative decimal number (absolute zero temperature)",
		},
		{
			value: "0.5",
			dataType: "float",
			explanation: "it's a decimal representing one half",
		},
		{
			value: "123.456",
			dataType: "float",
			explanation: "it's a decimal number with three decimal places",
		},
		{
			value: "-1.234",
			dataType: "float",
			explanation: "it's a negative decimal number",
		},
		{
			value: "9.8",
			dataType: "float",
			explanation: "it's a decimal number (Earth's gravity)",
		},
		{
			value: "37.5",
			dataType: "float",
			explanation: "it's a decimal number (normal body temperature)",
		},
	],
	boolean: [
		{
			value: "True",
			dataType: "boolean",
			explanation: "Booleans are true or false",
		},
		{
			value: "False",
			dataType: "boolean",
			explanation: "Booleans are true or false",
		},
		{
			value: "true",
			dataType: "boolean",
			explanation: "Booleans are true or false",
		},
		{
			value: "false",
			dataType: "boolean",
			explanation: "Booleans are true or false",
		},
	],
};

// Construct Questions
export const constructQuestions: ConstructQuestion[] = [
	// SEQUENCE ONLY QUESTIONS
	{
		code: `a = 5
b = 10
print(a + b)`,
		usedConstructs: ["sequence"],
		explanation:
			"the code only uses sequence as instructions are executed in order without any decisions or loops",
	},
	{
		code: `a = 3
b = 4
c = a * b
print("Area: " + str(c))`,
		usedConstructs: ["sequence"],
		explanation:
			"the code only uses sequence as instructions are carried out one after another without decisions or loops",
	},
	{
		code: `name = input("Enter your name: ")
greeting = "Hello, " + name
print(greeting)`,
		usedConstructs: ["sequence"],
		explanation:
			"the code only uses sequence as it just takes input, creates a message, and prints it in order",
	},
	{
		code: `width = 5
length = 8
area = width * length
print("Area is " + str(area))`,
		usedConstructs: ["sequence"],
		explanation:
			"the code only uses sequence as it performs calculations and prints the result in order",
	},
	{
		code: `price = 25.50
tax = price * 0.1
total = price + tax
print("Total: £" + str(total))`,
		usedConstructs: ["sequence"],
		explanation:
			"the code only uses sequence as it calculates tax and total step by step",
	},
	{
		code: `firstName = input("First name: ")
lastName = input("Last name: ")
fullName = firstName + " " + lastName
print("Hello " + fullName)`,
		usedConstructs: ["sequence"],
		explanation:
			"the code only uses sequence as it gets inputs and combines them in order",
	},
	{
		code: `radius = float(input("Enter radius: "))
pi = 3.14159
area = pi * radius * radius
circumference = 2 * pi * radius
print("Area: " + str(area))
print("Circumference: " + str(circumference))`,
		usedConstructs: ["sequence"],
		explanation:
			"the code only uses sequence as it performs calculations and displays results in order",
	},
	{
		code: `temperature = int(input("Temperature in Celsius: "))
fahrenheit = (temperature * 9 / 5) + 32
print(str(temperature) + "°C = " + str(fahrenheit) + "°F")`,
		usedConstructs: ["sequence"],
		explanation:
			"the code only uses sequence as it converts temperature and prints the result",
	},

	// SEQUENCE + SELECTION QUESTIONS
	{
		code: `age = int(input("How old are you?"))
if age < 18 then
${INDENT}print("You are a student!")
else
${INDENT}print("You finished school")
endif`,
		usedConstructs: ["sequence", "selection"],
		explanation:
			"the code uses sequence to get input and selection (if-else) to make a decision",
	},
	{
		code: `score = 75
if score >= 90 then
${INDENT}print("Grade A")
elseif score >= 70 then
${INDENT}print("Grade B")
else
${INDENT}print("Grade C")
endif`,
		usedConstructs: ["sequence", "selection"],
		explanation:
			"the code uses sequence to set the score and selection (if-elseif-else) to determine the grade",
	},
	{
		code: `number = int(input("Enter a number: "))
switch number
case 1:
${INDENT}print("One")
case 2:
${INDENT}print("Two")
default:
${INDENT}print("Other")
endswitch`,
		usedConstructs: ["sequence", "selection"],
		explanation:
			"the code uses sequence for input and selection (switch case) to choose between different outputs",
	},
	{
		code: `day = input("Enter day: ")
switch day
case "Monday":
${INDENT}print("Start of week")
case "Friday":
${INDENT}print("Almost weekend")
default:
${INDENT}print("Normal day")
endswitch`,
		usedConstructs: ["sequence", "selection"],
		explanation:
			"the code uses sequence for input and selection (switch case) to decide based on the day",
	},
	{
		code: `temperature = int(input("Enter temperature: "))
if temperature < 0 then
${INDENT}print("Freezing")
elseif temperature < 20 then
${INDENT}print("Cold")
elseif temperature < 30 then
${INDENT}print("Warm")
else
${INDENT}print("Hot")
endif`,
		usedConstructs: ["sequence", "selection"],
		explanation:
			"the code uses sequence for input and selection (if-elseif-else) to classify the temperature",
	},
	{
		code: `name = input("Enter your name: ")
age = int(input("Enter your age: "))
if age >= 18 then
${INDENT}print("Welcome, " + name)
else
${INDENT}print("Sorry, too young")
endif`,
		usedConstructs: ["sequence", "selection"],
		explanation:
			"the code uses sequence for input and selection (if-else) to make a decision based on age",
	},
	{
		code: `num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))
if num1 > num2 then
${INDENT}print("First number is larger")
elseif num1 < num2 then
${INDENT}print("Second number is larger")
else
${INDENT}print("Numbers are equal")
endif`,
		usedConstructs: ["sequence", "selection"],
		explanation:
			"the code uses sequence for input and selection (if-elseif-else) to compare the numbers",
	},
	{
		code: `password = input("Enter password: ")
if password == "secret123" then
${INDENT}print("Access granted")
${INDENT}print("Welcome!")
else
${INDENT}print("Access denied")
endif`,
		usedConstructs: ["sequence", "selection"],
		explanation:
			"the code uses sequence for input and selection (if-else) to check the password",
	},
	{
		code: `grade = int(input("Enter your grade: "))
if grade >= 70 then
${INDENT}print("Well done!")
${INDENT}if grade >= 90 then
${INDENT}${INDENT}print("Excellent work!")
${INDENT}endif
else
${INDENT}print("Keep trying")
endif`,
		usedConstructs: ["sequence", "selection"],
		explanation:
			"the code uses sequence for input and selection with nested if statements to evaluate the grade",
	},
	{
		code: `day = input("Enter day of week: ")
switch day
case "Monday":
${INDENT}print("Start of work week")
case "Tuesday":
${INDENT}print("Getting into the swing")
case "Wednesday":
${INDENT}print("Hump day!")
case "Thursday":
${INDENT}print("Almost Friday")
case "Friday":
${INDENT}print("Weekend is near!")
default:
${INDENT}print("Weekend time!")
endswitch`,
		usedConstructs: ["sequence", "selection"],
		explanation:
			"the code uses sequence for input and selection (switch statement) to respond based on the day",
	},
	{
		code: `balance = 100.0
choice = input("Deposit or Withdraw? ")
amount = float(input("Enter amount: "))
if choice == "Deposit" then
${INDENT}balance = balance + amount
${INDENT}print("Deposited £" + str(amount))
elseif choice == "Withdraw" then
${INDENT}if amount <= balance then
${INDENT}${INDENT}balance = balance - amount
${INDENT}${INDENT}print("Withdrew £" + str(amount))
${INDENT}else
${INDENT}${INDENT}print("Insufficient funds")
${INDENT}endif
else
${INDENT}print("Invalid choice")
endif
print("New balance: £" + str(balance))`,
		usedConstructs: ["sequence", "selection"],
		explanation:
			"the code uses sequence for input and calculations, and selection with nested if statements to handle different banking operations",
	},
	{
		code: `year = int(input("Enter a year: "))
if year MOD 4 == 0 then
${INDENT}if year MOD 100 == 0 then
${INDENT}${INDENT}if year MOD 400 == 0 then
${INDENT}${INDENT}${INDENT}print("Leap year")
${INDENT}${INDENT}else
${INDENT}${INDENT}${INDENT}print("Not a leap year")
${INDENT}${INDENT}endif
${INDENT}else
${INDENT}${INDENT}print("Leap year")
${INDENT}endif
else
${INDENT}print("Not a leap year")
endif`,
		usedConstructs: ["sequence", "selection"],
		explanation:
			"the code uses sequence for input and selection with nested if statements to determine if a year is a leap year",
	},

	// SEQUENCE + ITERATION QUESTIONS
	{
		code: `total = 0
for i = 1 to 3
${INDENT}total = total + i
next i
print("Final: " + str(total))`,
		usedConstructs: ["sequence", "iteration"],
		explanation:
			"the code uses sequence for assignments and iteration (a for loop) to repeat the addition",
	},
	{
		code: `count = 0
while count < 5
${INDENT}print(count)
${INDENT}count = count + 1
endwhile`,
		usedConstructs: ["sequence", "iteration"],
		explanation:
			"the code uses sequence for the initial assignment and iteration (a while loop) to repeat the print statement",
	},
	{
		code: `do
${INDENT}password = input("Enter password: ")
until password == "letmein"
print("Access granted")`,
		usedConstructs: ["sequence", "iteration"],
		explanation:
			"the code uses sequence for input and iteration (a do until loop) to repeat until the correct password is entered",
	},
	{
		code: `x = 10
while x > 0
${INDENT}print(x)
${INDENT}x = x - 2
endwhile`,
		usedConstructs: ["sequence", "iteration"],
		explanation:
			"the code uses sequence for assignment and iteration (while loop) to keep subtracting until the condition is false",
	},
	{
		code: `sum = 0
do
${INDENT}num = int(input("Enter number: "))
${INDENT}sum = sum + num
until num == 0
print("Total: " + str(sum))`,
		usedConstructs: ["sequence", "iteration"],
		explanation:
			"the code uses sequence for assignment and addition, and iteration (do until loop) to keep adding numbers until 0 is entered",
	},
	{
		code: `for i = 1 to 3
${INDENT}for j = 1 to 2
${INDENT}${INDENT}print("i=" + str(i) + ", j=" + str(j))
${INDENT}next j
next i`,
		usedConstructs: ["sequence", "iteration"],
		explanation:
			"the code uses sequence for printing and iteration with nested for loops to generate pairs of values",
	},
	{
		code: `count = 1
do
${INDENT}print("Square: " + str(count * count))
${INDENT}count = count + 1
until count > 5`,
		usedConstructs: ["sequence", "iteration"],
		explanation:
			"the code uses sequence for calculation and iteration (do until loop) to repeat 5 times",
	},
	{
		code: `total = 1
for i = 1 to 4
${INDENT}total = total * i
next i
print("Factorial is " + str(total))`,
		usedConstructs: ["sequence", "iteration"],
		explanation:
			"the code uses sequence for the multiplication and iteration (for loop) to calculate the factorial",
	},
	{
		code: `number = int(input("Enter a number: "))
sum = 0
for i = 1 to number
${INDENT}sum = sum + i
next i
print("Sum is " + str(sum))`,
		usedConstructs: ["sequence", "iteration"],
		explanation:
			"the code uses sequence for setup and iteration (for loop) to calculate the sum of numbers",
	},
	{
		code: `count = 1
total = 0
while count <= 5
${INDENT}total = total + count
${INDENT}count = count + 1
endwhile
print("Total: " + str(total))`,
		usedConstructs: ["sequence", "iteration"],
		explanation:
			"the code uses sequence for initialization and iteration (while loop) to accumulate a total",
	},
	{
		code: `for outer = 1 to 3
${INDENT}for inner = 1 to 2
${INDENT}${INDENT}print("Outer: " + str(outer) + ", Inner: " + str(inner))
${INDENT}next inner
next outer`,
		usedConstructs: ["sequence", "iteration"],
		explanation:
			"the code uses sequence for printing and iteration with nested for loops to create combinations",
	},
	{
		code: `items = ["apple", "banana", "orange", "grape"]
count = 0
while count < 4
${INDENT}print(str(count + 1) + ". " + items[count])
${INDENT}count = count + 1
endwhile`,
		usedConstructs: ["sequence", "iteration"],
		explanation:
			"the code uses sequence for array setup and iteration (while loop) to display numbered list items",
	},
	{
		code: `name = "Programming"
for i = 0 to len(name) - 1
${INDENT}print("Character " + str(i + 1) + ": " + name[i])
next i`,
		usedConstructs: ["sequence", "iteration"],
		explanation:
			"the code uses sequence for string setup and iteration (for loop) to display each character with its position",
	},

	// ALL THREE CONSTRUCTS (SEQUENCE + SELECTION + ITERATION)
	{
		code: `for i = 1 to 5
${INDENT}if i MOD 2 == 0 then
${INDENT}${INDENT}print("Even")
${INDENT}else
${INDENT}${INDENT}print("Odd")
${INDENT}endif
next i`,
		usedConstructs: ["sequence", "selection", "iteration"],
		explanation:
			"the code uses all three constructs: sequence (instructions in order), selection (if-else), and iteration (for loop)",
	},
	{
		code: `marks = [85, 40, 67]
for i = 0 to 2
${INDENT}if marks[i] >= 50 then
${INDENT}${INDENT}print("Pass")
${INDENT}else
${INDENT}${INDENT}print("Fail")
${INDENT}endif
next i`,
		usedConstructs: ["sequence", "selection", "iteration"],
		explanation:
			"the code uses sequence for data setup, iteration (for loop) to go through marks, and selection (if-else) to check pass or fail",
	},
	{
		code: `target = 20
guess = 0
do
${INDENT}guess = int(input("Guess the number: "))
${INDENT}if guess < target then
${INDENT}${INDENT}print("Too low")
${INDENT}elseif guess > target then
${INDENT}${INDENT}print("Too high")
${INDENT}endif
until guess == target
print("Correct!")`,
		usedConstructs: ["sequence", "selection", "iteration"],
		explanation:
			"the code uses sequence for setup, iteration (do-until loop) to repeat guessing, and selection (if-elseif) to give feedback",
	},
	{
		code: `numbers = [5, 12, 8, 3, 15]
for i = 0 to 4
${INDENT}if numbers[i] > 10 then
${INDENT}${INDENT}print(str(numbers[i]) + " is large")
${INDENT}else
${INDENT}${INDENT}print(str(numbers[i]) + " is small")
${INDENT}endif
next i`,
		usedConstructs: ["sequence", "selection", "iteration"],
		explanation:
			"the code uses sequence for array setup, iteration (for loop) to go through elements, and selection (if-else) to categorize each number",
	},
	{
		code: `score = 0
attempts = 0
do
${INDENT}attempts = attempts + 1
${INDENT}answer = int(input("What is 7 x 8? "))
${INDENT}if answer == 56 then
${INDENT}${INDENT}score = score + 1
${INDENT}${INDENT}print("Correct!")
${INDENT}else
${INDENT}${INDENT}print("Wrong, try again")
${INDENT}endif
until answer == 56 OR attempts >= 3
print("Final score: " + str(score))`,
		usedConstructs: ["sequence", "selection", "iteration"],
		explanation:
			"the code uses all three constructs: sequence for initialization, iteration (do-until loop) to repeat questions, and selection (if-else) to check answers",
	},
	{
		code: `total = 0
number = 1
while number != 0
${INDENT}number = int(input("Enter number (0 to stop): "))
${INDENT}if number != 0 then
${INDENT}${INDENT}total = total + number
${INDENT}${INDENT}print("Running total: " + str(total))
${INDENT}endif
endwhile
print("Final total: " + str(total))`,
		usedConstructs: ["sequence", "selection", "iteration"],
		explanation:
			"the code uses sequence for initialization, iteration (while loop) to keep adding numbers, and selection (if statement) to check if number should be added",
	},
];

// Operator Questions
export const operatorQuestions: OperatorQuestion[] = [
	// ADDITION (+) OPERATORS
	{
		code: "a = 4 + 3",
		answer: "7",
		explanation: "4 + 3 equals 7",
		operatorCategory: "addition",
	},
	{
		code: "k = 6 + 9",
		answer: "15",
		explanation: "6 + 9 equals 15",
		operatorCategory: "addition",
	},
	{
		code: "a = 14 + 17",
		answer: "31",
		explanation: "14 + 17 equals 31",
		operatorCategory: "addition",
	},
	{
		code: "k = 19 + 13",
		answer: "32",
		explanation: "19 + 13 equals 32",
		operatorCategory: "addition",
	},
	{
		code: "x = 5\ny = 8\nz = x + y",
		answer: "13",
		explanation: "x is 5, y is 8, so x + y equals 13",
		operatorCategory: "addition",
	},
	{
		code: "num1 = 12\nnum2 = 7\ntotal = num1 + num2",
		answer: "19",
		explanation: "num1 is 12, num2 is 7, so total is 19",
		operatorCategory: "addition",
	},

	// SUBTRACTION (-) OPERATORS
	{
		code: "b = 10 - 6",
		answer: "4",
		explanation: "10 - 6 equals 4",
		operatorCategory: "subtraction",
	},
	{
		code: "num = 12 - 4",
		answer: "8",
		explanation: "12 - 4 equals 8",
		operatorCategory: "subtraction",
	},
	{
		code: "b = 20 - 8",
		answer: "12",
		explanation: "20 - 8 equals 12",
		operatorCategory: "subtraction",
	},
	{
		code: "num = 25 - 9",
		answer: "16",
		explanation: "25 - 9 equals 16",
		operatorCategory: "subtraction",
	},
	{
		code: "start = 30\nend = 18\ndifference = start - end",
		answer: "12",
		explanation: "start is 30, end is 18, so difference is 12",
		operatorCategory: "subtraction",
	},
	{
		code: "price = 50\ndiscount = 15\nfinal = price - discount",
		answer: "35",
		explanation: "price is 50, discount is 15, so final price is 35",
		operatorCategory: "subtraction",
	},

	// MULTIPLICATION (*) OPERATORS
	{
		code: "num = 5 * 3",
		answer: "15",
		explanation: "5 * 3 equals 15",
		operatorCategory: "multiplication",
	},
	{
		code: "num = 7 * 6",
		answer: "42",
		explanation: "7 * 6 equals 42",
		operatorCategory: "multiplication",
	},
	{
		code: "num = 4 * 9",
		answer: "36",
		explanation: "4 * 9 equals 36",
		operatorCategory: "multiplication",
	},
	{
		code: "num = 12 * 4",
		answer: "48",
		explanation: "12 * 4 equals 48",
		operatorCategory: "multiplication",
	},
	{
		code: "width = 6\nheight = 3\narea = width * height",
		answer: "18",
		explanation: "width is 6, height is 3, so area is 18",
		operatorCategory: "multiplication",
	},
	{
		code: "rate = 15\nhours = 4\npay = rate * hours",
		answer: "60",
		explanation: "rate is 15, hours is 4, so pay is 60",
		operatorCategory: "multiplication",
	},

	// DIVISION (/) OPERATORS
	{
		code: "num = 15 / 3",
		answer: "5",
		explanation: "15 / 3 equals 5",
		operatorCategory: "division",
	},
	{
		code: "num = 24 / 6",
		answer: "4",
		explanation: "24 / 6 equals 4",
		operatorCategory: "division",
	},
	{
		code: "num = 35 / 7",
		answer: "5",
		explanation: "35 / 7 equals 5",
		operatorCategory: "division",
	},
	{
		code: "num = 24 / 8",
		answer: "3",
		explanation: "24 / 8 equals 3",
		operatorCategory: "division",
	},
	{
		code: "total = 48\ngroups = 6\ngroup_size = total / groups",
		answer: "8",
		explanation: "total is 48, groups is 6, so group_size is 8",
		operatorCategory: "division",
	},
	{
		code: "distance = 120\ntime = 3\nspeed = distance / time",
		answer: "40",
		explanation: "distance is 120, time is 3, so speed is 40",
		operatorCategory: "division",
	},

	// MODULO (MOD) OPERATORS
	{
		code: "num = 17 MOD 5",
		answer: "2",
		explanation: "17 divided by 5 is 3 with a remainder of 2",
		operatorCategory: "modulo",
	},
	{
		code: "num = 13 MOD 4",
		answer: "1",
		explanation: "13 divided by 4 is 3 with remainder 1",
		operatorCategory: "modulo",
	},
	{
		code: "num = 21 MOD 7",
		answer: "0",
		explanation: "21 divided by 7 is 3 with remainder 0",
		operatorCategory: "modulo",
	},
	{
		code: "num = 18 MOD 5",
		answer: "3",
		explanation: "18 divided by 5 is 3 with remainder 3",
		operatorCategory: "modulo",
	},
	{
		code: "num = 22 MOD 6",
		answer: "4",
		explanation: "22 divided by 6 is 3 with remainder 4",
		operatorCategory: "modulo",
	},
	{
		code: "num = 29 MOD 8",
		answer: "5",
		explanation: "29 divided by 8 is 3 with remainder 5",
		operatorCategory: "modulo",
	},
	{
		code: "num = 16 MOD 3",
		answer: "1",
		explanation: "16 divided by 3 is 5 with remainder 1",
		operatorCategory: "modulo",
	},
	{
		code: "num = 31 MOD 9",
		answer: "4",
		explanation: "31 divided by 9 is 3 with remainder 4",
		operatorCategory: "modulo",
	},
	{
		code: "num = 23 MOD 4",
		answer: "3",
		explanation: "23 divided by 4 is 5 with remainder 3",
		operatorCategory: "modulo",
	},
	{
		code: "num = 27 MOD 5",
		answer: "2",
		explanation: "27 divided by 5 is 5 with remainder 2",
		operatorCategory: "modulo",
	},
	{
		code: "number = 19\ncheck = number MOD 3",
		answer: "1",
		explanation: "number is 19, 19 divided by 3 is 6 with remainder 1",
		operatorCategory: "modulo",
	},
	{
		code: "value = 26\nremainder = value MOD 4",
		answer: "2",
		explanation: "value is 26, 26 divided by 4 is 6 with remainder 2",
		operatorCategory: "modulo",
	},

	// INTEGER DIVISION (DIV) OPERATORS
	{
		code: "num = 17 DIV 5",
		answer: "3",
		explanation: "5 goes into 17 three whole times",
		operatorCategory: "integer-division",
	},
	{
		code: "num = 13 DIV 4",
		answer: "3",
		explanation: "4 goes into 13 three whole times",
		operatorCategory: "integer-division",
	},
	{
		code: "num = 25 DIV 7",
		answer: "3",
		explanation: "7 goes into 25 three whole times",
		operatorCategory: "integer-division",
	},
	{
		code: "num = 18 DIV 5",
		answer: "3",
		explanation: "5 goes into 18 three whole times",
		operatorCategory: "integer-division",
	},
	{
		code: "num = 22 DIV 6",
		answer: "3",
		explanation: "6 goes into 22 three whole times",
		operatorCategory: "integer-division",
	},
	{
		code: "num = 29 DIV 8",
		answer: "3",
		explanation: "8 goes into 29 three whole times",
		operatorCategory: "integer-division",
	},
	{
		code: "num = 16 DIV 3",
		answer: "5",
		explanation: "3 goes into 16 five whole times",
		operatorCategory: "integer-division",
	},
	{
		code: "num = 31 DIV 9",
		answer: "3",
		explanation: "9 goes into 31 three whole times",
		operatorCategory: "integer-division",
	},
	{
		code: "num = 23 DIV 4",
		answer: "5",
		explanation: "4 goes into 23 five whole times",
		operatorCategory: "integer-division",
	},
	{
		code: "num = 27 DIV 5",
		answer: "5",
		explanation: "5 goes into 27 five whole times",
		operatorCategory: "integer-division",
	},
	{
		code: "items = 38\nboxes = items DIV 6",
		answer: "6",
		explanation: "items is 38, 6 goes into 38 six whole times",
		operatorCategory: "integer-division",
	},
	{
		code: "minutes = 125\nhours = minutes DIV 60",
		answer: "2",
		explanation: "minutes is 125, 60 goes into 125 two whole times",
		operatorCategory: "integer-division",
	},

	// EXPONENTIATION (^) OPERATORS
	{
		code: "num = 2 ^ 3",
		answer: "8",
		explanation: "2 to the power of 3 (2 * 2 * 2) is 8",
		operatorCategory: "exponentiation",
	},
	{
		code: "num = 3 ^ 4",
		answer: "81",
		explanation: "3 to the power of 4 (3 * 3 * 3 * 3) is 81",
		operatorCategory: "exponentiation",
	},
	{
		code: "num = 2 ^ 4",
		answer: "16",
		explanation: "2 to the power of 4 (2 * 2 * 2 * 2) is 16",
		operatorCategory: "exponentiation",
	},
	{
		code: "num = 4 ^ 3",
		answer: "64",
		explanation: "4 to the power of 3 (4 * 4 * 4) is 64",
		operatorCategory: "exponentiation",
	},
	{
		code: "num = 5 ^ 2",
		answer: "25",
		explanation: "5 to the power of 2 (5 * 5) is 25",
		operatorCategory: "exponentiation",
	},
	{
		code: "num = 6 ^ 2",
		answer: "36",
		explanation: "6 to the power of 2 (6 * 6) is 36",
		operatorCategory: "exponentiation",
	},
	{
		code: "num = 7 ^ 2",
		answer: "49",
		explanation: "7 to the power of 2 (7 * 7) is 49",
		operatorCategory: "exponentiation",
	},
	{
		code: "num = 8 ^ 2",
		answer: "64",
		explanation: "8 to the power of 2 (8 * 8) is 64",
		operatorCategory: "exponentiation",
	},
	{
		code: "num = 3 ^ 3",
		answer: "27",
		explanation: "3 to the power of 3 is 27",
		operatorCategory: "exponentiation",
	},
	{
		code: "base = 4\nexponent = 2\nresult = base ^ exponent",
		answer: "16",
		explanation: "base is 4, exponent is 2, so 4 to the power of 2 is 16",
		operatorCategory: "exponentiation",
	},
	{
		code: "side = 5\nsquare = side ^ 2",
		answer: "25",
		explanation: "side is 5, so side squared is 25",
		operatorCategory: "exponentiation",
	},
	{
		code: "num = 2\ncube = num ^ 3",
		answer: "8",
		explanation: "num is 2, so 2 cubed is 8",
		operatorCategory: "exponentiation",
	},

	// EQUALITY (==) OPERATORS
	{
		code: "a = 8 == 8",
		answer: "true",
		explanation: "8 is equal to 8",
		operatorCategory: "comparison",
	},
	{
		code: "y = 5 == 7",
		answer: "false",
		explanation: "5 is not equal to 7",
		operatorCategory: "comparison",
	},
	{
		code: `h = "A" == "a"`,
		answer: "false",
		explanation: "the comparison is case-sensitive",
		operatorCategory: "comparison",
	},

	// NOT EQUAL (!=) OPERATORS
	{
		code: "i = 3 != 5",
		answer: "true",
		explanation: "3 is not equal to 5",
		operatorCategory: "comparison",
	},
	{
		code: "a = 9 != 4",
		answer: "true",
		explanation: "9 is not equal to 4",
		operatorCategory: "comparison",
	},
	{
		code: "b = 6 != 6",
		answer: "false",
		explanation: "6 is equal to 6",
		operatorCategory: "comparison",
	},

	// LESS THAN (<) OPERATORS
	{
		code: "k = 4 < 2",
		answer: "false",
		explanation: "4 is not less than 2",
		operatorCategory: "comparison",
	},
	{
		code: "c = 12 < 15",
		answer: "true",
		explanation: "12 is less than 15",
		operatorCategory: "comparison",
	},
	{
		code: "d = 8 < 3",
		answer: "false",
		explanation: "8 is not less than 3",
		operatorCategory: "comparison",
	},

	// LESS THAN OR EQUAL (<=) OPERATORS
	{
		code: "l = 6 >= 6",
		answer: "true",
		explanation: "6 is greater than or equal to 6",
		operatorCategory: "comparison",
	},
	{
		code: "e = 10 <= 10",
		answer: "true",
		explanation: "10 is less than or equal to 10",
		operatorCategory: "comparison",
	},
	{
		code: "f = 7 <= 5",
		answer: "false",
		explanation: "7 is not less than or equal to 5",
		operatorCategory: "comparison",
	},

	// GREATER THAN (>) OPERATORS
	{
		code: "j = 7 > 5",
		answer: "true",
		explanation: "7 is greater than 5",
		operatorCategory: "comparison",
	},
	{
		code: "g = 15 > 12",
		answer: "true",
		explanation: "15 is greater than 12",
		operatorCategory: "comparison",
	},
	{
		code: "h = 4 > 9",
		answer: "false",
		explanation: "4 is not greater than 9",
		operatorCategory: "comparison",
	},

	// GREATER THAN OR EQUAL (>=) OPERATORS
	{
		code: "m = 3 <= 2",
		answer: "false",
		explanation: "3 is not less than or equal to 2",
		operatorCategory: "comparison",
	},
	{
		code: "i = 8 >= 8",
		answer: "true",
		explanation: "8 is greater than or equal to 8",
		operatorCategory: "comparison",
	},
	{
		code: "j = 3 >= 7",
		answer: "false",
		explanation: "3 is not greater than or equal to 7",
		operatorCategory: "comparison",
	},

	// MIXED OPERATORS AND COMPLEX EXPRESSIONS
	{
		code: "n = 8 + 2 * 3",
		answer: "14",
		explanation:
			"multiplication is performed first (2 * 3 = 6), then addition (8 + 6 = 14)",
		operatorCategory: "mixed",
	},
	{
		code: "o = (5 + 3) * 2",
		answer: "16",
		explanation:
			"brackets are performed first (5 + 3 = 8), then multiplication (8 * 2 = 16)",
		operatorCategory: "mixed",
	},
	{
		code: "p = (10 - 2) * 3",
		answer: "24",
		explanation:
			"brackets are performed first (10 - 2 = 8), then multiplication (8 * 3 = 24)",
		operatorCategory: "mixed",
	},
	{
		code: "q = 10 - 2 * 3",
		answer: "4",
		explanation:
			"multiplication is performed first (2 * 3 = 6), then subtraction (10 - 6 = 4)",
		operatorCategory: "mixed",
	},
	{
		code: "a = 3\na = a + 2",
		answer: "5",
		explanation: "a starts as 3, then 2 is added, resulting in 5",
		operatorCategory: "mixed",
	},
	{
		code: "x = 10\nx = x / 2",
		answer: "5",
		explanation: "x starts as 10, then is divided by 2, resulting in 5",
		operatorCategory: "mixed",
	},
	{
		code: "count = 0\ncount = count + 1\ncount = count + 1",
		answer: "2",
		explanation: "count starts at 0 and is incremented twice",
		operatorCategory: "mixed",
	},
	{
		code: "val = 20\nval = val - 8\nval = val / 2",
		answer: "6",
		explanation: "20 minus 8 is 12, then 12 divided by 2 is 6",
		operatorCategory: "mixed",
	},
	{
		code: "a = 2\nb = 3\nc = (a + b) * 2",
		answer: "10",
		explanation: "Brackets first (2+3=5), then multiplication (5*2=10)",
		operatorCategory: "mixed",
	},
];
