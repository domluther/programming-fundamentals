// Question types and interfaces
export interface DataTypeQuestion {
  value: string;
  type: 'character' | 'string' | 'integer' | 'float' | 'boolean';
  explanation: string;
}

export interface ConstructQuestion {
  code: string;
  constructs: string[];
  explanation: string;
}

export interface OperatorQuestion {
  code: string;
  answer: string;
  explanation: string;
  category: string;
}

export interface QuizMode {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

export const QUIZ_MODES: Record<string, QuizMode> = {
  'Data Types': {
    id: 'Data Types',
    title: 'Data Types',
    description: 'Identify the data type of each value',
    emoji: '📝'
  },
  Constructs: {
    id: 'Constructs',
    title: 'Constructs',
    description: 'Identify programming constructs in code',
    emoji: '🏗️'
  },
  Operators: {
    id: 'Operators',
    title: 'Operators',
    description: 'Solve operator expressions and comparisons',
    emoji: '🔢'
  },
  Champion: {
    id: 'Champion',
    title: 'Champion',
    description: 'Mixed questions from all categories',
    emoji: '🏆'
  }
};

// Data Type Questions
export const dataTypeQuestions: Record<string, DataTypeQuestion[]> = {
  character: [
    {
      value: "'a'",
      type: "character",
      explanation: "it's a single letter with quotes"
    },
    {
      value: "'!'",
      type: "character",
      explanation: "it's a single symbol with quotes"
    },
    {
      value: "'9'",
      type: "character",
      explanation: "it's a single number with quotes"
    },
    {
      value: "'@'",
      type: "character",
      explanation: "it's a single symbol with quotes"
    },
    {
      value: "' '",
      type: "character",
      explanation: "it's a single space character with quotes"
    },
    {
      value: "'Z'",
      type: "character",
      explanation: "it's a single letter with quotes"
    },
    {
      value: "'$'",
      type: "character",
      explanation: "it's a single symbol with quotes"
    },
    {
      value: "'%'",
      type: "character",
      explanation: "it's a single symbol with quotes"
    },
    {
      value: "'&'",
      type: "character",
      explanation: "it's a single symbol with quotes"
    },
    {
      value: "'*'",
      type: "character",
      explanation: "it's a single symbol with quotes"
    },
    {
      value: "'#'",
      type: "character",
      explanation: "it's a single symbol with quotes"
    },
    {
      value: "'+'",
      type: "character",
      explanation: "it's a single symbol with quotes"
    },
    {
      value: "'='",
      type: "character",
      explanation: "it's a single symbol with quotes"
    },
    {
      value: "'?'",
      type: "character",
      explanation: "it's a single symbol with quotes"
    },
    {
      value: "'x'",
      type: "character",
      explanation: "it's a single letter with quotes"
    },
    {
      value: "'5'",
      type: "character",
      explanation: "it's a single number with quotes"
    }
  ],
  string: [
    {
      value: "'hello'",
      type: "string",
      explanation: "it's a collection of characters with quotes"
    },
    {
      value: "\"world\"",
      type: "string",
      explanation: "it's a collection of characters with quotes"
    },
    {
      value: "\":D\"",
      type: "string",
      explanation: "it's a collection of symbols with quotes"
    },
    {
      value: "\"panda1\"",
      type: "string",
      explanation: "it's a collection of characters and numbers with quotes"
    },
    {
      value: "'Python'",
      type: "string",
      explanation: "it's a collection of characters with quotes"
    },
    {
      value: "\"123abc\"",
      type: "string",
      explanation: "it's a collection of characters and numbers with quotes"
    },
    {
      value: "'Good morning!'",
      type: "string",
      explanation: "it's a collection of characters with quotes"
    },
    {
      value: "\"Hello World\"",
      type: "string",
      explanation: "it's a collection of characters with quotes"
    },
    {
      value: "\"Computer Science\"",
      type: "string",
      explanation: "it's a collection of characters with quotes"
    },
    {
      value: "'123'",
      type: "string",
      explanation: "it's numbers in quotes, making it a string"
    },
    {
      value: "\"OCR GCSE\"",
      type: "string",
      explanation: "it's a collection of characters and spaces with quotes"
    },
    {
      value: "'True'",
      type: "string",
      explanation: "it's the word True in quotes, making it a string"
    },
    {
      value: "\"False\"",
      type: "string",
      explanation: "it's the word False in quotes, making it a string"
    },
    {
      value: "'£25.50'",
      type: "string",
      explanation: "it's characters including a currency symbol in quotes"
    },
    {
      value: "\"user@email.com\"",
      type: "string",
      explanation: "it's an email address in quotes, making it a string"
    },
    {
      value: "'Programming is fun!'",
      type: "string",
      explanation: "it's a sentence with spaces and punctuation in quotes"
    }
  ],
  integer: [
    {
      value: "42",
      type: "integer",
      explanation: "it's a whole number without quotes"
    },
    {
      value: "0",
      type: "integer",
      explanation: "it's zero, which is a whole number"
    },
    {
      value: "-15",
      type: "integer",
      explanation: "it's a negative whole number"
    },
    {
      value: "100",
      type: "integer",
      explanation: "it's a positive whole number"
    },
    {
      value: "-7",
      type: "integer",
      explanation: "it's a negative whole number"
    },
    {
      value: "256",
      type: "integer",
      explanation: "it's a positive whole number"
    },
    {
      value: "-999",
      type: "integer",
      explanation: "it's a negative whole number"
    },
    {
      value: "1",
      type: "integer",
      explanation: "it's a positive whole number"
    },
    {
      value: "-1",
      type: "integer",
      explanation: "it's a negative whole number"
    },
    {
      value: "50",
      type: "integer",
      explanation: "it's a positive whole number"
    },
    {
      value: "2024",
      type: "integer",
      explanation: "it's a positive whole number"
    },
    {
      value: "-100",
      type: "integer",
      explanation: "it's a negative whole number"
    },
    {
      value: "365",
      type: "integer",
      explanation: "it's a positive whole number"
    },
    {
      value: "12",
      type: "integer",
      explanation: "it's a positive whole number"
    },
    {
      value: "-50",
      type: "integer",
      explanation: "it's a negative whole number"
    },
    {
      value: "999",
      type: "integer",
      explanation: "it's a positive whole number"
    }
  ],
  float: [
    {
      value: "3.14",
      type: "float",
      explanation: "it's a decimal number"
    },
    {
      value: "-2.5",
      type: "float",
      explanation: "it's a negative decimal number"
    },
    {
      value: "0.0",
      type: "float",
      explanation: "it's zero as a decimal number"
    },
    {
      value: "25.99",
      type: "float",
      explanation: "it's a positive decimal number"
    },
    {
      value: "-15.75",
      type: "float",
      explanation: "it's a negative decimal number"
    },
    {
      value: "1.0",
      type: "float",
      explanation: "it's one as a decimal number"
    },
    {
      value: "100.5",
      type: "float",
      explanation: "it's a decimal number with a fractional part"
    },
    {
      value: "-0.1",
      type: "float",
      explanation: "it's a small negative decimal number"
    },
    {
      value: "2.718",
      type: "float",
      explanation: "it's a decimal number with multiple decimal places"
    },
    {
      value: "99.99",
      type: "float",
      explanation: "it's a decimal number often used for prices"
    },
    {
      value: "-273.15",
      type: "float",
      explanation: "it's a negative decimal number (absolute zero temperature)"
    },
    {
      value: "0.5",
      type: "float",
      explanation: "it's a decimal representing one half"
    },
    {
      value: "123.456",
      type: "float",
      explanation: "it's a decimal number with three decimal places"
    },
    {
      value: "-1.234",
      type: "float",
      explanation: "it's a negative decimal number"
    },
    {
      value: "9.8",
      type: "float",
      explanation: "it's a decimal number (Earth's gravity)"
    },
    {
      value: "37.5",
      type: "float",
      explanation: "it's a decimal number (normal body temperature)"
    }
  ],
  boolean: [
    {
      value: "True",
      type: "boolean",
      explanation: "it's a boolean value representing true"
    },
    {
      value: "False",
      type: "boolean",
      explanation: "it's a boolean value representing false"
    }
  ]
};

// Construct Questions
export const constructQuestions: ConstructQuestion[] = [
  // SEQUENCE ONLY QUESTIONS
  {
    code: `a = 5
b = 10
print(a + b)`,
    constructs: ['sequence'],
    explanation: "the code only uses sequence as instructions are executed in order without any decisions or loops."
  }, {
    code: `a = 3
b = 4
c = a * b
print("Area: " + str(c))`,
    constructs: ['sequence'],
    explanation: "the code only uses sequence as instructions are carried out one after another without decisions or loops."
  }, {
    code: `name = input("Enter your name: ")
greeting = "Hello, " + name
print(greeting)`,
    constructs: ['sequence'],
    explanation: "the code only uses sequence as it just takes input, creates a message, and prints it in order."
  }, {
    code: `width = 5
length = 8
area = width * length
print("Area is " + str(area))`,
    constructs: ['sequence'],
    explanation: "the code only uses sequence as it performs calculations and prints the result in order."
  }, {
    code: `price = 25.50
tax = price * 0.1
total = price + tax
print("Total: £" + str(total))`,
    constructs: ['sequence'],
    explanation: "the code only uses sequence as it calculates tax and total step by step."
  }, {
    code: `firstName = input("First name: ")
lastName = input("Last name: ")
fullName = firstName + " " + lastName
print("Hello " + fullName)`,
    constructs: ['sequence'],
    explanation: "the code only uses sequence as it gets inputs and combines them in order."
  }, {
    code: `radius = float(input("Enter radius: "))
pi = 3.14159
area = pi * radius * radius
circumference = 2 * pi * radius
print("Area: " + str(area))
print("Circumference: " + str(circumference))`,
    constructs: ['sequence'],
    explanation: "the code only uses sequence as it performs calculations and displays results in order."
  }, {
    code: `temperature = int(input("Temperature in Celsius: "))
fahrenheit = (temperature * 9 / 5) + 32
print(str(temperature) + "°C = " + str(fahrenheit) + "°F")`,
    constructs: ['sequence'],
    explanation: "the code only uses sequence as it converts temperature and prints the result."
  },

  // SEQUENCE + SELECTION QUESTIONS
  {
    code: `age = int(input("How old are you?"))
if age < 18 then
  print("You are a student!")
else
  print("You finished school")
endif`,
    constructs: ['sequence', 'selection'],
    explanation: "the code uses sequence to get input and selection (if-else) to make a decision."
  }, {
    code: `score = 75
if score >= 90 then
  print("Grade A")
elseif score >= 70 then
  print("Grade B")
else
  print("Grade C")
endif`,
    constructs: ['sequence', 'selection'],
    explanation: "the code uses sequence to set the score and selection (if-elseif-else) to determine the grade."
  }, {
    code: `number = int(input("Enter a number: "))
switch number
case 1:
  print("One")
case 2:
  print("Two")
default:
  print("Other")
endswitch`,
    constructs: ['sequence', 'selection'],
    explanation: "the code uses sequence for input and selection (switch case) to choose between different outputs."
  }, {
    code: `day = input("Enter day: ")
switch day
case "Monday":
  print("Start of week")
case "Friday":
  print("Almost weekend")
default:
  print("Normal day")
endswitch`,
    constructs: ['sequence', 'selection'],
    explanation: "the code uses sequence for input and selection (switch case) to decide based on the day."
  }, {
    code: `temperature = int(input("Enter temperature: "))
if temperature < 0 then
  print("Freezing")
elseif temperature < 20 then
  print("Cold")
elseif temperature < 30 then
  print("Warm")
else
  print("Hot")
endif`,
    constructs: ['sequence', 'selection'],
    explanation: "the code uses sequence for input and selection (if-elseif-else) to classify the temperature."
  }, {
    code: `name = input("Enter your name: ")
age = int(input("Enter your age: "))
if age >= 18 then
  print("Welcome, " + name)
else
  print("Sorry, too young")
endif`,
    constructs: ['sequence', 'selection'],
    explanation: "the code uses sequence for input and selection (if-else) to make a decision based on age."
  }, {
    code: `num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))
if num1 > num2 then
  print("First number is larger")
elseif num1 < num2 then
  print("Second number is larger")
else
  print("Numbers are equal")
endif`,
    constructs: ['sequence', 'selection'],
    explanation: "the code uses sequence for input and selection (if-elseif-else) to compare the numbers."
  }, {
    code: `password = input("Enter password: ")
if password == "secret123" then
  print("Access granted")
  print("Welcome!")
else
  print("Access denied")
endif`,
    constructs: ['sequence', 'selection'],
    explanation: "the code uses sequence for input and selection (if-else) to check the password."
  }, {
    code: `grade = int(input("Enter your grade: "))
if grade >= 70 then
  print("Well done!")
  if grade >= 90 then
    print("Excellent work!")
  endif
else
  print("Keep trying")
endif`,
    constructs: ['sequence', 'selection'],
    explanation: "the code uses sequence for input and selection with nested if statements to evaluate the grade."
  }, {
    code: `day = input("Enter day of week: ")
switch day
case "Monday":
  print("Start of work week")
case "Tuesday":
  print("Getting into the swing")
case "Wednesday":
  print("Hump day!")
case "Thursday":
  print("Almost Friday")
case "Friday":
  print("Weekend is near!")
default:
  print("Weekend time!")
endswitch`,
    constructs: ['sequence', 'selection'],
    explanation: "the code uses sequence for input and selection (switch statement) to respond based on the day."
  }, {
    code: `balance = 100.0
choice = input("Deposit or Withdraw? ")
amount = float(input("Enter amount: "))
if choice == "Deposit" then
  balance = balance + amount
  print("Deposited £" + str(amount))
elseif choice == "Withdraw" then
  if amount <= balance then
    balance = balance - amount
    print("Withdrew £" + str(amount))
  else
    print("Insufficient funds")
  endif
else
  print("Invalid choice")
endif
print("New balance: £" + str(balance))`,
    constructs: ['sequence', 'selection'],
    explanation: "the code uses sequence for input and calculations, and selection with nested if statements to handle different banking operations."
  },
 {
  code: `year = int(input("Enter a year: "))
if year MOD 4 == 0 then
  if year MOD 100 == 0 then
    if year MOD 400 == 0 then
      print("Leap year")
    else
      print("Not a leap year")
    endif
  else
    print("Leap year")
  endif
else
  print("Not a leap year")
endif`,
  constructs: ['sequence', 'selection'],
  explanation: "the code uses sequence for input and selection with nested if statements to determine if a year is a leap year."
},

// SEQUENCE + ITERATION QUESTIONS
{
  code: `total = 0
for i = 1 to 3
  total = total + i
next i
print("Final: " + str(total))`,
  constructs: ['sequence', 'iteration'],
  explanation: "the code uses sequence for assignments and iteration (a for loop) to repeat the addition."
}, {
  code: `count = 0
while count < 5
  print(count)
  count = count + 1
endwhile`,
  constructs: ['sequence', 'iteration'],
  explanation: "the code uses sequence for the initial assignment and iteration (a while loop) to repeat the print statement."
}, {
  code: `do
  password = input("Enter password: ")
until password == "letmein"
print("Access granted")`,
  constructs: ['sequence', 'iteration'],
  explanation: "the code uses sequence for input and iteration (a do until loop) to repeat until the correct password is entered."
}, {
  code: `x = 10
while x > 0
  print(x)
  x = x - 2
endwhile`,
  constructs: ['sequence', 'iteration'],
  explanation: "the code uses sequence for assignment and iteration (while loop) to keep subtracting until the condition is false."
}, {
  code: `sum = 0
do
  num = int(input("Enter number: "))
  sum = sum + num
until num == 0
print("Total: " + str(sum))`,
  constructs: ['sequence', 'iteration'],
  explanation: "the code uses sequence for assignment and addition, and iteration (do until loop) to keep adding numbers until 0 is entered."
}, {
  code: `for i = 1 to 3
  for j = 1 to 2
    print("i=" + str(i) + ", j=" + str(j))
  next j
next i`,
  constructs: ['sequence', 'iteration'],
  explanation: "the code uses sequence for printing and iteration with nested for loops to generate pairs of values."
}, {
  code: `count = 1
do
  print("Square: " + str(count * count))
  count = count + 1
until count > 5`,
  constructs: ['sequence', 'iteration'],
  explanation: "the code uses sequence for calculation and iteration (do until loop) to repeat 5 times."
}, {
  code: `total = 1
for i = 1 to 4
  total = total * i
next i
print("Factorial is " + str(total))`,
  constructs: ['sequence', 'iteration'],
  explanation: "the code uses sequence for the multiplication and iteration (for loop) to calculate the factorial."
}, {
  code: `number = int(input("Enter a number: "))
sum = 0
for i = 1 to number
  sum = sum + i
next i
print("Sum is " + str(sum))`,
  constructs: ['sequence', 'iteration'],
  explanation: "the code uses sequence for setup and iteration (for loop) to calculate the sum of numbers."
}, {
  code: `count = 1
total = 0
while count <= 5
  total = total + count
  count = count + 1
endwhile
print("Total: " + str(total))`,
  constructs: ['sequence', 'iteration'],
  explanation: "the code uses sequence for initialization and iteration (while loop) to accumulate a total."
}, {
  code: `for outer = 1 to 3
  for inner = 1 to 2
    print("Outer: " + str(outer) + ", Inner: " + str(inner))
  next inner
next outer`,
  constructs: ['sequence', 'iteration'],
  explanation: "the code uses sequence for printing and iteration with nested for loops to create combinations."
}, {
  code: `items = ["apple", "banana", "orange", "grape"]
count = 0
while count < 4
  print(str(count + 1) + ". " + items[count])
  count = count + 1
endwhile`,
  constructs: ['sequence', 'iteration'],
  explanation: "the code uses sequence for array setup and iteration (while loop) to display numbered list items."
}, {
  code: `name = "Programming"
for i = 0 to len(name) - 1
  print("Character " + str(i + 1) + ": " + name[i])
next i`,
  constructs: ['sequence', 'iteration'],
  explanation: "the code uses sequence for string setup and iteration (for loop) to display each character with its position."
},

// ALL THREE CONSTRUCTS (SEQUENCE + SELECTION + ITERATION)
{
  code: `for i = 1 to 5
  if i MOD 2 == 0 then
    print("Even")
  else
    print("Odd")
  endif
next i`,
  constructs: ['sequence', 'selection', 'iteration'],
  explanation: "the code uses all three constructs: sequence (instructions in order), selection (if-else), and iteration (for loop)."
}, {
  code: `marks = [85, 40, 67]
for i = 0 to 2
  if marks[i] >= 50 then
    print("Pass")
  else
    print("Fail")
  endif
next i`,
  constructs: ['sequence', 'selection', 'iteration'],
  explanation: "the code uses sequence for data setup, iteration (for loop) to go through marks, and selection (if-else) to check pass or fail."
}, {
  code: `target = 20
guess = 0
do
  guess = int(input("Guess the number: "))
  if guess < target then
    print("Too low")
  elseif guess > target then
    print("Too high")
  endif
until guess == target
print("Correct!")`,
  constructs: ['sequence', 'selection', 'iteration'],
  explanation: "the code uses sequence for setup, iteration (do-until loop) to repeat guessing, and selection (if-elseif) to give feedback."
}, {
  code: `numbers = [5, 12, 8, 3, 15]
for i = 0 to 4
  if numbers[i] > 10 then
    print(str(numbers[i]) + " is large")
  else
    print(str(numbers[i]) + " is small")
  endif
next i`,
  constructs: ['sequence', 'selection', 'iteration'],
  explanation: "the code uses sequence for array setup, iteration (for loop) to go through elements, and selection (if-else) to categorize each number."
}, {
  code: `score = 0
attempts = 0
do
  attempts = attempts + 1
  answer = int(input("What is 7 x 8? "))
  if answer == 56 then
    score = score + 1
    print("Correct!")
  else
    print("Wrong, try again")
  endif
until answer == 56 OR attempts >= 3
print("Final score: " + str(score))`,
  constructs: ['sequence', 'selection', 'iteration'],
  explanation: "the code uses all three constructs: sequence for initialization, iteration (do-until loop) to repeat questions, and selection (if-else) to check answers."
}, {
  code: `total = 0
number = 1
while number != 0
  number = int(input("Enter number (0 to stop): "))
  if number != 0 then
    total = total + number
    print("Running total: " + str(total))
  endif
endwhile
print("Final total: " + str(total))`,
  constructs: ['sequence', 'selection', 'iteration'],
  explanation: "the code uses sequence for initialization, iteration (while loop) to keep adding numbers, and selection (if statement) to check if number should be added."
}
];


// Operator Questions
export const operatorQuestions: OperatorQuestion[] = [
  // ADDITION (+) OPERATORS
  {
    code: "a = 4 + 3",
    answer: "7",
    explanation: "4 + 3 equals 7",
    category: "addition"
  }, {
    code: "k = 6 + 9",
    answer: "15",
    explanation: "6 + 9 equals 15",
    category: "addition"
  }, {
    code: "a = 14 + 17",
    answer: "31",
    explanation: "14 + 17 equals 31",
    category: "addition"
  }, {
    code: "k = 19 + 13",
    answer: "32",
    explanation: "19 + 13 equals 32",
    category: "addition"
  }, {
    code: "x = 5\ny = 8\nz = x + y",
    answer: "13",
    explanation: "x is 5, y is 8, so x + y equals 13",
    category: "addition"
  }, {
    code: "num1 = 12\nnum2 = 7\ntotal = num1 + num2",
    answer: "19",
    explanation: "num1 is 12, num2 is 7, so total is 19",
    category: "addition"
  },

  // SUBTRACTION (-) OPERATORS
  {
    code: "b = 10 - 6",
    answer: "4",
    explanation: "10 - 6 equals 4",
    category: "subtraction"
  }, {
    code: "num = 12 - 4",
    answer: "8",
    explanation: "12 - 4 equals 8",
    category: "subtraction"
  }, {
    code: "b = 20 - 8",
    answer: "12",
    explanation: "20 - 8 equals 12",
    category: "subtraction"
  }, {
    code: "num = 25 - 9",
    answer: "16",
    explanation: "25 - 9 equals 16",
    category: "subtraction"
  }, {
    code: "start = 30\nend = 18\ndifference = start - end",
    answer: "12",
    explanation: "start is 30, end is 18, so difference is 12",
    category: "subtraction"
  }, {
    code: "price = 50\ndiscount = 15\nfinal = price - discount",
    answer: "35",
    explanation: "price is 50, discount is 15, so final price is 35",
    category: "subtraction"
  },

  // MULTIPLICATION (*) OPERATORS
  {
    code: "num = 5 * 3",
    answer: "15",
    explanation: "5 * 3 equals 15",
    category: "multiplication"
  }, {
    code: "num = 7 * 6",
    answer: "42",
    explanation: "7 * 6 equals 42",
    category: "multiplication"
  }, {
    code: "num = 4 * 9",
    answer: "36",
    explanation: "4 * 9 equals 36",
    category: "multiplication"
  }, {
    code: "num = 12 * 4",
    answer: "48",
    explanation: "12 * 4 equals 48",
    category: "multiplication"
  }, {
    code: "width = 6\nheight = 3\narea = width * height",
    answer: "18",
    explanation: "width is 6, height is 3, so area is 18",
    category: "multiplication"
  }, {
    code: "rate = 15\nhours = 4\npay = rate * hours",
    answer: "60",
    explanation: "rate is 15, hours is 4, so pay is 60",
    category: "multiplication"
  },

  // DIVISION (/) OPERATORS
  {
    code: "num = 15 / 3",
    answer: "5",
    explanation: "15 / 3 equals 5",
    category: "division"
  }, {
    code: "num = 24 / 6",
    answer: "4",
    explanation: "24 / 6 equals 4",
    category: "division"
  }, {
    code: "num = 35 / 7",
    answer: "5",
    explanation: "35 / 7 equals 5",
    category: "division"
  }, {
    code: "num = 24 / 8",
    answer: "3",
    explanation: "24 / 8 equals 3",
    category: "division"
  }, {
    code: "total = 48\ngroups = 6\ngroup_size = total / groups",
    answer: "8",
    explanation: "total is 48, groups is 6, so group_size is 8",
    category: "division"
  }, {
    code: "distance = 120\ntime = 3\nspeed = distance / time",
    answer: "40",
    explanation: "distance is 120, time is 3, so speed is 40",
    category: "division"
  },

  // MODULO (MOD) OPERATORS
  {
    code: "num = 17 MOD 5",
    answer: "2",
    explanation: "17 divided by 5 is 3 with a remainder of 2",
    category: "modulo"
  }, {
    code: "num = 13 MOD 4",
    answer: "1",
    explanation: "13 divided by 4 is 3 with remainder 1",
    category: "modulo"
  }, {
    code: "num = 21 MOD 7",
    answer: "0",
    explanation: "21 divided by 7 is 3 with remainder 0",
    category: "modulo"
  }, {
    code: "num = 18 MOD 5",
    answer: "3",
    explanation: "18 divided by 5 is 3 with remainder 3",
    category: "modulo"
  }, {
    code: "num = 22 MOD 6",
    answer: "4",
    explanation: "22 divided by 6 is 3 with remainder 4",
    category: "modulo"
  }, {
    code: "num = 29 MOD 8",
    answer: "5",
    explanation: "29 divided by 8 is 3 with remainder 5",
    category: "modulo"
  }, {
    code: "num = 16 MOD 3",
    answer: "1",
    explanation: "16 divided by 3 is 5 with remainder 1",
    category: "modulo"
  }, {
    code: "num = 31 MOD 9",
    answer: "4",
    explanation: "31 divided by 9 is 3 with remainder 4",
    category: "modulo"
  }, {
    code: "num = 23 MOD 4",
    answer: "3",
    explanation: "23 divided by 4 is 5 with remainder 3",
    category: "modulo"
  }, {
    code: "num = 27 MOD 5",
    answer: "2",
    explanation: "27 divided by 5 is 5 with remainder 2",
    category: "modulo"
  }, {
    code: "number = 19\ncheck = number MOD 3",
    answer: "1",
    explanation: "number is 19, 19 divided by 3 is 6 with remainder 1",
    category: "modulo"
  }, {
    code: "value = 26\nremainder = value MOD 4",
    answer: "2",
    explanation: "value is 26, 26 divided by 4 is 6 with remainder 2",
    category: "modulo"
  },

  // INTEGER DIVISION (DIV) OPERATORS
  {
    code: "num = 17 DIV 5",
    answer: "3",
    explanation: "5 goes into 17 three whole times",
    category: "integer-division"
  }, {
    code: "num = 13 DIV 4",
    answer: "3",
    explanation: "4 goes into 13 three whole times",
    category: "integer-division"
  }, {
    code: "num = 25 DIV 7",
    answer: "3",
    explanation: "7 goes into 25 three whole times",
    category: "integer-division"
  }, {
    code: "num = 18 DIV 5",
    answer: "3",
    explanation: "5 goes into 18 three whole times",
    category: "integer-division"
  }, {
    code: "num = 22 DIV 6",
    answer: "3",
    explanation: "6 goes into 22 three whole times",
    category: "integer-division"
  }, {
    code: "num = 29 DIV 8",
    answer: "3",
    explanation: "8 goes into 29 three whole times",
    category: "integer-division"
  }, {
    code: "num = 16 DIV 3",
    answer: "5",
    explanation: "3 goes into 16 five whole times",
    category: "integer-division"
  }, {
    code: "num = 31 DIV 9",
    answer: "3",
    explanation: "9 goes into 31 three whole times",
    category: "integer-division"
  }, {
    code: "num = 23 DIV 4",
    answer: "5",
    explanation: "4 goes into 23 five whole times",
    category: "integer-division"
  }, {
    code: "num = 27 DIV 5",
    answer: "5",
    explanation: "5 goes into 27 five whole times",
    category: "integer-division"
  }, {
    code: "items = 38\nboxes = items DIV 6",
    answer: "6",
    explanation: "items is 38, 6 goes into 38 six whole times",
    category: "integer-division"
  }, {
    code: "minutes = 125\nhours = minutes DIV 60",
    answer: "2",
    explanation: "minutes is 125, 60 goes into 125 two whole times",
    category: "integer-division"
  },

  // EXPONENTIATION (^) OPERATORS
  {
    code: "num = 2 ^ 3",
    answer: "8",
    explanation: "2 to the power of 3 (2 * 2 * 2) is 8",
    category: "exponentiation"
  }, {
    code: "num = 3 ^ 4",
    answer: "81",
    explanation: "3 to the power of 4 (3 * 3 * 3 * 3) is 81",
    category: "exponentiation"
  }, {
    code: "num = 2 ^ 4",
    answer: "16",
    explanation: "2 to the power of 4 (2 * 2 * 2 * 2) is 16",
    category: "exponentiation"
  }, {
    code: "num = 4 ^ 3",
    answer: "64",
    explanation: "4 to the power of 3 (4 * 4 * 4) is 64",
    category: "exponentiation"
  }, {
    code: "num = 5 ^ 2",
    answer: "25",
    explanation: "5 to the power of 2 (5 * 5) is 25",
    category: "exponentiation"
  }, {
    code: "num = 6 ^ 2",
    answer: "36",
    explanation: "6 to the power of 2 (6 * 6) is 36",
    category: "exponentiation"
  }, {
    code: "num = 7 ^ 2",
    answer: "49",
    explanation: "7 to the power of 2 (7 * 7) is 49",
    category: "exponentiation"
  }, {
    code: "num = 8 ^ 2",
    answer: "64",
    explanation: "8 to the power of 2 (8 * 8) is 64",
    category: "exponentiation"
  }, {
    code: "num = 3 ^ 3",
    answer: "27",
    explanation: "3 to the power of 3 is 27",
    category: "exponentiation"
  }, {
    code: "base = 4\nexponent = 2\nresult = base ^ exponent",
    answer: "16",
    explanation: "base is 4, exponent is 2, so 4 to the power of 2 is 16",
    category: "exponentiation"
  }, {
    code: "side = 5\nsquare = side ^ 2",
    answer: "25",
    explanation: "side is 5, so side squared is 25",
    category: "exponentiation"
  }, {
    code: "num = 2\ncube = num ^ 3",
    answer: "8",
    explanation: "num is 2, so 2 cubed is 8",
    category: "exponentiation"
  },

  // EQUALITY (==) OPERATORS
  {
    code: "a = 8 == 8",
    answer: "true",
    explanation: "8 is equal to 8",
    category: "comparison"
  }, {
    code: "y = 5 == 7",
    answer: "false",
    explanation: "5 is not equal to 7",
    category: "comparison"
  }, {
    code: `h = "A" == "a"`,
    answer: "false",
    explanation: "the comparison is case-sensitive",
    category: "comparison"
  },

  // NOT EQUAL (!=) OPERATORS
  {
    code: "i = 3 != 5",
    answer: "true",
    explanation: "3 is not equal to 5",
    category: "comparison"
  }, {
    code: "a = 9 != 4",
    answer: "true",
    explanation: "9 is not equal to 4",
    category: "comparison"
  }, {
    code: "b = 6 != 6",
    answer: "false",
    explanation: "6 is equal to 6",
    category: "comparison"
  },

  // LESS THAN (<) OPERATORS
  {
    code: "k = 4 < 2",
    answer: "false",
    explanation: "4 is not less than 2",
    category: "comparison"
  }, {
    code: "c = 12 < 15",
    answer: "true",
    explanation: "12 is less than 15",
    category: "comparison"
  }, {
    code: "d = 8 < 3",
    answer: "false",
    explanation: "8 is not less than 3",
    category: "comparison"
  },

  // LESS THAN OR EQUAL (<=) OPERATORS
  {
    code: "l = 6 >= 6",
    answer: "true",
    explanation: "6 is greater than or equal to 6",
    category: "comparison"
  }, {
    code: "e = 10 <= 10",
    answer: "true",
    explanation: "10 is less than or equal to 10",
    category: "comparison"
  }, {
    code: "f = 7 <= 5",
    answer: "false",
    explanation: "7 is not less than or equal to 5",
    category: "comparison"
  },

  // GREATER THAN (>) OPERATORS
  {
    code: "j = 7 > 5",
    answer: "true",
    explanation: "7 is greater than 5",
    category: "comparison"
  }, {
    code: "g = 15 > 12",
    answer: "true",
    explanation: "15 is greater than 12",
    category: "comparison"
  }, {
    code: "h = 4 > 9",
    answer: "false",
    explanation: "4 is not greater than 9",
    category: "comparison"
  },

  // GREATER THAN OR EQUAL (>=) OPERATORS
  {
    code: "m = 3 <= 2",
    answer: "false",
    explanation: "3 is not less than or equal to 2",
    category: "comparison"
  }, {
    code: "i = 8 >= 8",
    answer: "true",
    explanation: "8 is greater than or equal to 8",
    category: "comparison"
  }, {
    code: "j = 3 >= 7",
    answer: "false",
    explanation: "3 is not greater than or equal to 7",
    category: "comparison"
  },

  // MIXED OPERATORS AND COMPLEX EXPRESSIONS
  {
    code: "n = 8 + 2 * 3",
    answer: "14",
    explanation: "multiplication is performed first (2 * 3 = 6), then addition (8 + 6 = 14)",
    category: "mixed"
  }, {
    code: "o = (5 + 3) * 2",
    answer: "16",
    explanation: "brackets are performed first (5 + 3 = 8), then multiplication (8 * 2 = 16)",
    category: "mixed"
  }, {
    code: "p = (10 - 2) * 3",
    answer: "24",
    explanation: "brackets are performed first (10 - 2 = 8), then multiplication (8 * 3 = 24)",
    category: "mixed"
  }, {
    code: "q = 10 - 2 * 3",
    answer: "4",
    explanation: "multiplication is performed first (2 * 3 = 6), then subtraction (10 - 6 = 4)",
    category: "mixed"
  }, {
    code: "a = 3\na = a + 2",
    answer: "5",
    explanation: "a starts as 3, then 2 is added, resulting in 5",
    category: "mixed"
  }, {
    code: "x = 10\nx = x / 2",
    answer: "5",
    explanation: "x starts as 10, then is divided by 2, resulting in 5",
    category: "mixed"
  }, {
    code: "count = 0\ncount = count + 1\ncount = count + 1",
    answer: "2",
    explanation: "count starts at 0 and is incremented twice",
    category: "mixed"
  }, {
    code: "val = 20\nval = val - 8\nval = val / 2",
    answer: "6",
    explanation: "20 minus 8 is 12, then 12 divided by 2 is 6",
    category: "mixed"
  }, {
    code: "a = 2\nb = 3\nc = (a + b) * 2",
    answer: "10",
    explanation: "Brackets first (2+3=5), then multiplication (5*2=10)",
    category: "mixed"
  }
];