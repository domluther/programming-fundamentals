
# Programming Fundamentals

An interactive learning platform for mastering core programming concepts including data types, programming constructs, and operators. Built with modern React, TypeScript, and Tailwind CSS to provide an engaging educational experience.

## 🎯 Features

- **Data Types Practice** - Identify and work with integers, floats, strings, and booleans
- **Programming Constructs** - Master sequence, selection, and iteration patterns  
- **Operators Quiz** - Practice arithmetic, comparison, and logical operators
- **Champion Mode** - Advanced mixed challenges for experienced learners
- **Progress Tracking** - Built-in scoring system with streaks and accuracy metrics
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Educational Hints** - Contextual help and explanations for each concept

## 🚀 Live Demo

Visit the live application: [Programming Fundamentals](https://ocr-fundamentals.netlify.app/)

## 🛠️ Technology Stack

- **React 19** & **TypeScript** for type-safe component development
- **Vite** for fast development and optimized builds
- **TanStack React Router** for client-side routing
- **Tailwind CSS** for responsive, utility-first styling
- **Biome** for consistent code formatting and linting
- **Vitest + Testing Library** for comprehensive testing

## 🎮 How to Use

### Data Types Mode
Practice identifying data types in code:
- Analyze values and determine if they're integers, floats, strings, or booleans
- Get instant feedback with explanations
- Build understanding of fundamental data representations

### Programming Constructs Mode  
Master the three fundamental programming constructs:
- **Sequence:** Understanding step-by-step execution
- **Selection:** Working with if-else statements and conditions
- **Iteration:** Recognizing loops and repetition patterns

### Operators Mode
Practice different types of operators:
- **Arithmetic:** Addition, subtraction, multiplication, division
- **Comparison:** Equal to, greater than, less than operations  
- **Logical:** AND, OR, NOT operations

### Champion Mode
Advanced mixed challenges combining all concepts:
- Random questions from all categories
- Higher difficulty level
- Perfect for testing comprehensive understanding

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ and pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/domluther/programming-fundamentals.git
cd programming-fundamentals

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Available Scripts

```bash
# Development server
pnpm run dev

# Production build
pnpm run build

# Preview production build
pnpm run preview

# Run tests
pnpm run test
pnpm run test:run  # Run once
pnpm run test:ui   # Test UI

# Code quality
pnpm run lint      # Check linting
pnpm run format    # Format code
pnpm run type-check # TypeScript checking
```

## 📚 Educational Value

This application helps students understand:

- **Data Types:** Distinguishing between different types of values in programming
- **Program Structure:** How programs use sequence, selection, and iteration
- **Operators:** Essential tools for mathematical and logical operations
- **Problem Solving:** Building logical thinking skills through interactive practice

Perfect for:
- Computer Science students at any level
- Self-learners exploring programming concepts
- Educators looking for interactive teaching tools
- Anyone wanting to solidify their programming fundamentals

## 🧪 Testing

The application includes comprehensive test coverage for:
- Quiz question generation and validation
- User interaction flows
- Score tracking and persistence
- Component rendering and state management

Run tests with:
```bash
pnpm run test        # Watch mode
pnpm run test:run    # Single run
pnpm run test:ui     # Interactive UI
```

## 🏗️ Architecture

### Component Structure
- **Route Components:** Individual quiz pages with shared navigation
- **Quiz Components:** Interactive question and answer logic
- **Shared Components:** Reusable UI elements and layouts  
- **Hooks & Utils:** Quiz state management, scoring, and question data

### Key Files
- `src/routes/` - Application pages (datatypes, constructs, operators, champion)
- `src/components/` - Reusable React components  
- `src/lib/` - Business logic, configuration, and utility functions
- `src/contexts/` - React contexts for theme management

### Data Structure
Questions are organized by category with:
- Multiple question types (identification, code analysis, multiple choice)
- Detailed explanations and hints
- Difficulty progression within each mode
- Comprehensive answer validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`) 
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for programming students and educators worldwide
- Designed to make fundamental concepts accessible and engaging
- Utilizes modern web technologies for optimal learning experience

---

*For questions or support, please open an issue on GitHub.*


