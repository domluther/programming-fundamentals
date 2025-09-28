import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QUIZ_MODES, dataTypeQuestions, constructQuestions, operatorQuestions } from '@/lib/questionData';
import { QuizStats } from '@/components/QuizStats';
import type { Mode } from '@/lib/scoreManager';

interface QuizLayoutProps {
  mode: Mode;
  title: string;
  description: string;
}

export function QuizLayout({ mode, title, description }: QuizLayoutProps) {
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [stats, setStats] = useState({
    score: 0,
    streak: 0,
    recordStreak: 0,
    totalQuestions: 0,
    correctAnswers: 0
  });

  // Generate a random question based on the current mode
  const generateQuestion = () => {
    let question;
    
    switch (mode) {
      case 'Data Types':
        const categories = Object.keys(dataTypeQuestions);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const questions = dataTypeQuestions[randomCategory];
        question = questions[Math.floor(Math.random() * questions.length)];
        break;
        
      case 'Constructs':
        question = constructQuestions[Math.floor(Math.random() * constructQuestions.length)];
        break;
        
      case 'Operators':
        question = operatorQuestions[Math.floor(Math.random() * operatorQuestions.length)];
        break;
        
      case 'Champion':
        // Mix of all question types
        const allQuestions = [
          ...Object.values(dataTypeQuestions).flat(),
          ...constructQuestions,
          ...operatorQuestions
        ];
        question = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        break;
        
      default:
        question = null;
    }
    
    setCurrentQuestion(question);
    setUserAnswer('');
    setShowFeedback(false);
    setFeedback('');
  };

  // Check the user's answer
  const checkAnswer = () => {
    if (!currentQuestion || userAnswer.trim() === '') return;

    let correct = false;
    
    if (mode === 'Data Types') {
      correct = userAnswer.toLowerCase() === currentQuestion.type.toLowerCase();
    } else if (mode === 'Constructs') {
      // For constructs, check if answer matches any of the constructs
      const userAnswers = userAnswer.toLowerCase().split(',').map((s: string) => s.trim());
      const expectedConstructs = currentQuestion.constructs.map((c: string) => c.toLowerCase());
      correct = userAnswers.sort().join(',') === expectedConstructs.sort().join(',');
    } else if (mode === 'Operators') {
      correct = userAnswer.trim() === currentQuestion.answer;
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setFeedback(`✅ Correct! ${currentQuestion.explanation || ''}`);
      setStats(prev => ({
        ...prev,
        score: prev.score + 1,
        streak: prev.streak + 1,
        recordStreak: Math.max(prev.recordStreak, prev.streak + 1),
        totalQuestions: prev.totalQuestions + 1,
        correctAnswers: prev.correctAnswers + 1
      }));
    } else {
      setFeedback(`❌ Incorrect. ${currentQuestion.explanation || ''}`);
      setStats(prev => ({
        ...prev,
        streak: 0,
        totalQuestions: prev.totalQuestions + 1
      }));
    }
  };

  // Generate first question on mount
  useEffect(() => {
    generateQuestion();
  }, [mode]);

  const accuracy = stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">Programming Fundamentals</h1>
          <p className="text-xl">{description}</p>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.values(QUIZ_MODES).map((quizMode) => (
            <button
              key={quizMode.id}
              onClick={() => window.location.href = `/${quizMode.id}`}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === quizMode.id
                  ? 'bg-white text-indigo-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {quizMode.emoji} {quizMode.title}
            </button>
          ))}
        </div>

        {/* Stats Display */}
        <QuizStats 
          score={stats.score}
          streak={stats.streak}
          recordStreak={stats.recordStreak}
          accuracy={accuracy}
        />

        {/* Controls */}
        <div className="text-center mb-6">
          <Button
            onClick={() => setShowHints(!showHints)}
            variant="outline"
            className="text-white border-white hover:bg-white/10"
          >
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </Button>
        </div>

        {/* Hints Section */}
        {showHints && (
          <Card className="mb-6 p-4 bg-yellow-50 border-yellow-200">
            <h3 className="font-semibold mb-2">💡 Hints for {title}:</h3>
            {mode === 'Data Types' && (
              <div>
                <p><strong>Character:</strong> Single character in quotes like 'a' or '5'</p>
                <p><strong>String:</strong> Text in quotes like "hello" or 'world'</p>
                <p><strong>Integer:</strong> Whole numbers like 42 or -15</p>
                <p><strong>Float:</strong> Decimal numbers like 3.14 or -2.5</p>
                <p><strong>Boolean:</strong> True or False (without quotes)</p>
              </div>
            )}
            {mode === 'Constructs' && (
              <div>
                <p><strong>Sequence:</strong> Instructions executed in order</p>
                <p><strong>Selection:</strong> if-else statements or switch cases</p>
                <p><strong>Iteration:</strong> Loops (while, for, repeat-until)</p>
                <p>Answer with comma-separated values like: sequence, selection</p>
              </div>
            )}
            {mode === 'Operators' && (
              <div>
                <p>Remember order of operations: Brackets, Powers, Multiply/Divide, Add/Subtract</p>
                <p><strong>DIV:</strong> Integer division (ignores remainder)</p>
                <p><strong>MOD:</strong> Modulo (returns remainder)</p>
                <p><strong>/:</strong> Regular division (returns decimal)</p>
              </div>
            )}
          </Card>
        )}

        {/* Question Section */}
        {currentQuestion && (
          <Card className="mb-6 p-6 bg-white shadow-lg">
            <div className="text-center mb-4">
              {mode === 'Data Types' && (
                <div>
                  <p className="text-lg mb-2">What data type is this value?</p>
                  <div className="text-3xl font-mono bg-gray-100 p-4 rounded-lg mb-4">
                    {currentQuestion.value}
                  </div>
                </div>
              )}
              
              {mode === 'Constructs' && (
                <div>
                  <p className="text-lg mb-2">Which programming constructs are used in this code?</p>
                  <pre className="text-left bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
                    <code>{currentQuestion.code}</code>
                  </pre>
                </div>
              )}
              
              {mode === 'Operators' && (
                <div>
                  <p className="text-lg mb-2">What is the result of this expression?</p>
                  <pre className="text-left bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
                    <code>{currentQuestion.code}</code>
                  </pre>
                </div>
              )}
            </div>

            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer..."
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                className="flex-1"
              />
              <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>
                Submit
              </Button>
            </div>

            {showFeedback && (
              <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {feedback}
              </div>
            )}

            {showFeedback && (
              <div className="text-center">
                <Button onClick={generateQuestion} className="mr-2">
                  Next Question
                </Button>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}