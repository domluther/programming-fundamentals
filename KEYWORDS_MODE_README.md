# Keywords Mode - Test Implementation

## Overview
This is a test implementation of the Keywords mode for Programming Fundamentals. The Keywords mode is designed to help students practice identifying programming concepts like variables, operators, concatenation, and casting - mirroring the types of questions found in GCSE exams.

## What's Been Implemented

### 1. Data Structures (`questionData.ts`)

#### `KeywordMetadata` Interface
Added optional metadata to code questions:
```typescript
interface KeywordMetadata {
  variables?: string[];                    // e.g., ["age", "name", "total"]
  operators?: {
    arithmetic?: string[];                 // e.g., ["+", "*", "MOD"]
    comparison?: string[];                 // e.g., [">=", "==", "<"]
    boolean?: string[];                    // e.g., ["AND", "OR", "NOT"]
  };
  concatenationLines?: number[];           // Line numbers with string concatenation
  castingUsed?: {
    type: string;                          // e.g., "int()", "str()", "float()"
    line: number;
  }[];
  dataTypes?: {
    integers?: string[];
    floats?: string[];
    strings?: string[];
    booleans?: string[];
  };
}
```

#### Test Questions
Created `keywordTestQuestions` array with 15 questions from the original `constructQuestions`, each annotated with rich metadata.

Example:
```typescript
{
  code: `price = 25.50
tax = price * 0.1
total = price + tax
print("Total: £" + str(total))`,
  usedConstructs: ["sequence"],
  explanation: "...",
  metadata: {
    variables: ["price", "tax", "total"],
    operators: {
      arithmetic: ["*", "+"],
      comparison: [],
      boolean: [],
    },
    concatenationLines: [4],
    castingUsed: [{ type: "str()", line: 4 }],
    dataTypes: {
      floats: ["price", "tax", "total"],
    },
  },
}
```

### 2. Quiz Configuration

#### New Mode
Added "Keywords" to `QUIZ_MODES`:
- **Title**: Keywords
- **Description**: "Identify variables, operators, and programming concepts"
- **Emoji**: 🔍

#### Score Manager Updates
- Added Keywords to `Mode` type
- Added Keywords stats tracking in `ScoreData`
- Added detailed category tracking for Keywords questions

### 3. UI Components

#### Keywords Route (`/keywords`)
Created new route that displays the Keywords quiz using the existing QuizComponent infrastructure.

#### QuizComponent Updates
- Added Keywords case to question generation
- Keywords mode uses checkbox interface (same as Constructs)
- Currently shows: "Identify the programming constructs used" (placeholder)
- Keyboard shortcuts (1, 2, 3) work for selecting constructs

### 4. Navigation
- Added Keywords card to home page
- Route mapping in index page includes `/keywords` path

# Keywords Mode - Implementation Guide

## Overview
Keywords mode helps students practice GCSE-style questions about identifying programming concepts like variables, operators, concatenation, and casting from code snippets.

## ✅ Current Implementation Status

### Fully Working Features

1. **Navigation** - Keywords mode appears in top menu bar (🔍)
2. **Dynamic Questions** - Generates different question types based on metadata:
   - "Give the identifier of one variable used in the algorithm. [1]"
   - "Identify two variables that have been used in the algorithm. [2]"
   - "Give the line number where there is concatenation. [1]"
   - "Identify the process that converts data to a different type."
   - "Give one arithmetic operator used in the algorithm. [1]"
   - "Give one comparison operator used in the algorithm. [1]"

3. **Text Input** - Students type their answers (not checkboxes)
4. **Smart Validation** - Accepts any valid answer (case-insensitive)
5. **Helpful Hints** - Dropdown with guidance on variables, concatenation, casting, and operators
6. **Score Tracking** - Saves progress in localStorage

## Current Behavior

When you select Keywords mode:

1. **Random Question Generation**
   - Picks a random code snippet from 15 test questions
   - Analyzes metadata to see what questions can be asked
   - Randomly selects one question type (variables, operators, etc.)
   - Displays appropriate prompt

2. **User Interaction**
   - Code snippet shown in gray box
   - Dynamic question prompt (varies per question)
   - Text input for answer
   - Press Enter to submit

3. **Answer Validation**
   - Case-insensitive checking
   - Accepts any valid answer from the list
   - For variables: any variable name is correct
   - For line numbers: exact match required
   - For operators: any operator from that category works

4. **Feedback**
   - ✅ Shows correct message with explanation
   - ❌ Shows all possible correct answers if wrong

## Example Questions in Action

### Question Type 1: Identify Variable
```
Code:
price = 25.50
tax = price * 0.1
total = price + tax

Question: "Give the identifier of one variable used in the algorithm. [1]"
Valid Answers: price, tax, total
```

### Question Type 2: Find Concatenation
```
Code:
name = input("Enter your name: ")
greeting = "Hello, " + name
print(greeting)

Question: "Give the line number where there is concatenation. [1]"
Valid Answer: 2
```

### Question Type 3: Identify Casting
```
Code:
temperature = int(input("Temperature in Celsius: "))
fahrenheit = (temperature * 9 / 5) + 32
print(str(temperature) + "°C = " + str(fahrenheit) + "°F")

Question: "Identify the process that converts data to a different type."
Valid Answers: int(), str()
```

### Question Type 4: Identify Operator
```
Code:
age = int(input("Enter your age: "))
if age >= 18 then
   print("Welcome")
endif

Question: "Give one comparison operator used in the algorithm. [1]"
Valid Answer: >=
```

## Next Steps (Not Yet Implemented)

To fully implement Keywords mode, you would need to:

### 1. Create Keyword-Specific Questions
Instead of reusing construct questions, generate questions dynamically from metadata:

```typescript
// Example: Generate "identify variables" question
function generateVariableQuestion(questionWithMetadata: ConstructQuestion) {
  return {
    code: questionWithMetadata.code,
    prompt: "Identify two variables used in the program. [2]",
    answer: questionWithMetadata.metadata?.variables || [],
    marks: 2,
  };
}
```

### 2. New UI for Keywords Questions
Create different input types for different question types:
- **Variables**: Text input or multiple checkboxes
- **Find line number**: Number input
- **Casting identification**: Dropdown or text input
- **Operator classification**: Table with checkboxes (arithmetic vs comparison)

### 3. Answer Checking Logic
Update `checkAnswer()` to handle various Keywords question types:
- Multiple acceptable answers for variables
- Line number validation
- Operator classification

### 4. Question Generator
Create a function that randomly:
1. Picks a question from `keywordTestQuestions`
2. Picks a question type based on available metadata
3. Generates appropriate prompt and answer validation

Example:
```typescript
function generateKeywordQuestion() {
  const question = pickRandomQuestion();
  const questionTypes = getAvailableTypes(question.metadata);
  const type = pickRandom(questionTypes);
  
  switch(type) {
    case "identify-variables":
      return generateVariableQuestion(question);
    case "find-concatenation":
      return generateConcatenationQuestion(question);
    // etc...
  }
}
```

### 5. Add Metadata to All Questions
Once testing confirms the approach works, add metadata to all questions in `constructQuestions`.

## Example Exam-Style Questions

The metadata supports these question types:

1. **Identify variables** (2 marks)
   - "Identify two variables used in the program."
   - Answer from `metadata.variables`

2. **Find concatenation** (1 mark)
   - "Give the line number where there is concatenation."
   - Answer from `metadata.concatenationLines`

3. **Identify casting** (1 mark)
   - "Identify the process that converts integer data to string data."
   - Answer from `metadata.castingUsed`

4. **Classify operators** (variable marks)
   - "Tick (✓) one box in each row to identify if each operator is a comparison operator or an arithmetic operator."
   - Use `metadata.operators`

5. **Data type identification** (1 mark)
   - "Give the identifier of one variable that stores a float."
   - Answer from `metadata.dataTypes.floats`

6. **Boolean operators** (1 mark)
   - "Give one Boolean operator used in the algorithm."
   - Answer from `metadata.operators.boolean`

## Testing

To test the current implementation:
1. Start the dev server: `pnpm run dev`
2. Navigate to Keywords mode
3. Verify questions display correctly
4. Check that construct selection works
5. Verify feedback is appropriate

## Files Modified

1. `/src/lib/questionData.ts` - Added interfaces and test questions
2. `/src/lib/scoreManager.ts` - Added Keywords mode support
3. `/src/routes/keywords.tsx` - New route
4. `/src/routes/index.tsx` - Added Keywords routing
5. `/src/components/QuizComponent.tsx` - Added Keywords mode handling

## Architecture Decision

✅ **Chosen Approach**: Add metadata to existing questions
- Single source of truth for code snippets
- Can generate multiple question types from one code example
- Easy to maintain and extend
- Matches how real exams work (one code snippet, multiple questions)

❌ **Not Chosen**: Separate keyword questions
- Would duplicate code snippets
- More maintenance overhead
- Less flexible for generating variations
