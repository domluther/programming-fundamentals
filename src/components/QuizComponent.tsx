import { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { dataTypeQuestions, constructQuestions, operatorQuestions } from '@/lib/questionData';
import type { Mode } from '@/lib/scoreManager';

interface QuizComponentProps {
  mode: Mode;
  onScoreUpdate: (isCorrect: boolean, questionType: string) => void;
}

export function QuizComponent({ mode, onScoreUpdate }: QuizComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [stats, setStats] = useState({
    streak: 0,
    currentQuestionType: ''
  });

  // State for constructs checkboxes
  const [constructsChecked, setConstructsChecked] = useState({
    sequence: false,
    selection: false,
    iteration: false
  });

  // Generate a random question based on the current mode
  const generateQuestion = useCallback(() => {
    let question;
    let questionType = '';
    
    switch (mode) {
      case 'Data Types':
        const categories = Object.keys(dataTypeQuestions);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const questions = dataTypeQuestions[randomCategory];
        question = questions[Math.floor(Math.random() * questions.length)];
        questionType = `datatypes-${randomCategory}`;
        break;
        
      case 'Constructs':
        question = constructQuestions[Math.floor(Math.random() * constructQuestions.length)];
        questionType = `constructs-${question.constructs.join('-')}`;
        break;
        
      case 'Operators':
        question = operatorQuestions[Math.floor(Math.random() * operatorQuestions.length)];
        questionType = `operators-${question.category}`;
        break;
        
      case 'Champion':
        // Mix of all question types
        const allQuestions = [
          ...Object.values(dataTypeQuestions).flat().map(q => ({ ...q, sourceMode: 'datatypes' })),
          ...constructQuestions.map(q => ({ ...q, sourceMode: 'constructs' })),
          ...operatorQuestions.map(q => ({ ...q, sourceMode: 'operators' }))
        ];
        question = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        questionType = `champion-${question.sourceMode}`;
        break;
        
      default:
        question = null;
    }
    
    setCurrentQuestion(question);
    setUserAnswer('');
    setShowFeedback(false);
    setFeedback('');
    setConstructsChecked({ sequence: false, selection: false, iteration: false });
    setStats(prev => ({ ...prev, currentQuestionType: questionType }));
    
    // Focus the input after state updates for better UX
    setTimeout(() => {
      if (inputRef.current && mode !== 'Constructs') {
        inputRef.current.focus();
      }
    }, 100);
  }, [mode]);

  // Check the user's answer
  const checkAnswer = useCallback(() => {
    if (!currentQuestion) return;

    // For constructs mode, check if at least one checkbox is selected
    if ((mode === 'Constructs' || (mode === 'Champion' && currentQuestion.sourceMode === 'Constructs')) && 
        !constructsChecked.sequence && !constructsChecked.selection && !constructsChecked.iteration) {
      return;
    }

    // For other modes, check if text input has content
    if ((mode !== 'Constructs' && !(mode === 'Champion' && currentQuestion.sourceMode === 'Constructs')) && 
        userAnswer.trim() === '') {
      return;
    }

    let correct = false;
    
    // Determine the actual mode for checking (important for champion mode)
    const actualMode = currentQuestion.sourceMode || mode;
    
    if (actualMode === 'Data Types') {
      correct = userAnswer.toLowerCase() === currentQuestion.type.toLowerCase();
    } else if (actualMode === 'constructs') {
      // For constructs, check if selected checkboxes match expected constructs
      const selectedConstructs = Object.entries(constructsChecked)
        .filter(([_, checked]) => checked)
        .map(([construct, _]) => construct);
      const expectedConstructs = currentQuestion.constructs;
      
      correct = selectedConstructs.length === expectedConstructs.length &&
                selectedConstructs.every(construct => expectedConstructs.includes(construct));
    } else if (actualMode === 'operators') {
      correct = userAnswer.trim() === currentQuestion.answer;
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Update the streak locally
    if (correct) {
      setFeedback(`✅ Correct! ${currentQuestion.explanation || ''}`);
      setStats(prev => ({ ...prev, streak: prev.streak + 1 }));
    } else {
      // Generate proper feedback based on question type
      let correctAnswerFeedback = '';
      
      if (actualMode === 'datatypes') {
        const correctType = currentQuestion.type as 'character' | 'string' | 'integer' | 'float' | 'boolean';
        const typeExplanations = {
          character: "it's a single character in quotes",
          string: "it's text (multiple characters) in quotes", 
          integer: "it's a whole number without quotes",
          float: "it's a decimal number",
          boolean: "it's either True or False (without quotes)"
        };
        const article = correctType === 'integer' ? 'an' : 'a';
        correctAnswerFeedback = `No, this is ${article} ${correctType} because ${typeExplanations[correctType]}.`;
      } else if (actualMode === 'constructs') {
        const expectedConstructs = currentQuestion.constructs;
        const constructList = expectedConstructs.join(', ');
        correctAnswerFeedback = `No, this code uses: ${constructList}. ${currentQuestion.explanation}`;
      } else if (actualMode === 'operators') {
        correctAnswerFeedback = `No, the answer is ${currentQuestion.answer}. ${currentQuestion.explanation}`;
      }
      
      setFeedback(`❌ ${correctAnswerFeedback}`);
      setStats(prev => ({ ...prev, streak: 0 }));
    }

    // Report to the score manager
    onScoreUpdate(correct, stats.currentQuestionType);
  }, [currentQuestion, userAnswer, constructsChecked, mode, onScoreUpdate, stats.currentQuestionType]);

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
      if (e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      }
      
      // Keyboard shortcuts for constructs mode (1, 2, 3 keys)
      if ((mode === 'Constructs' || (mode === 'Champion' && currentQuestion?.sourceMode === 'Constructs')) && !showFeedback) {
        if (e.key === '1') {
          e.preventDefault();
          setConstructsChecked(prev => ({ ...prev, sequence: !prev.sequence }));
        } else if (e.key === '2') {
          e.preventDefault();
          setConstructsChecked(prev => ({ ...prev, selection: !prev.selection }));
        } else if (e.key === '3') {
          e.preventDefault();
          setConstructsChecked(prev => ({ ...prev, iteration: !prev.iteration }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode, currentQuestion, showFeedback, handleNext]);

  const getHintContent = () => {
    const actualMode = currentQuestion?.sourceMode || mode;
    
    if (mode === 'Champion') {
      return (
        <></>
      );
    }
    
    if (actualMode === 'Data Types') {
      return (
        <div className="text-sm space-y-1">
          <p><strong>Character:</strong> Single character in quotes like 'a' or '5'</p>
          <p><strong>String:</strong> Text in quotes like "hello" or 'world'</p>
          <p><strong>Integer:</strong> Whole numbers like 42 or -15</p>
          <p><strong>Float:</strong> Decimal numbers like 3.14 or -2.5</p>
          <p><strong>Boolean:</strong> True or False (without quotes)</p>
        </div>
      );
    }
    
    if (actualMode === 'constructs') {
      return (
        <div className="text-sm space-y-1">
          <p><strong>Sequence:</strong> Instructions executed in order</p>
          <p><strong>Selection:</strong> if-else statements or switch cases</p>
          <p><strong>Iteration:</strong> Loops (while, for, repeat-until)</p>
          <p className="italic text-blue-600">Use checkboxes below or press keys 1, 2, 3 to toggle sequence, selection, iteration</p>
        </div>
      );
    }
    
    if (actualMode === 'operators') {
      return (
        <div className="text-sm space-y-1">
          <p>Remember order of operations: Brackets, Powers, Multiply/Divide, Add/Subtract</p>
          <p><strong>DIV:</strong> Integer division (ignores remainder)</p>
          <p><strong>MOD:</strong> Modulo (returns remainder)</p>
          <p><strong>/:</strong> Regular division (returns decimal)</p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="space-y-6">

      {/* Question Section */}
      {currentQuestion && (
        <Card className="p-6 bg-white shadow-lg">
          <div className="text-center mb-4">
            {(mode === 'Data Types' || (mode === 'Champion' && currentQuestion.sourceMode === 'Data Types')) && (
              <div>
                <p className="text-left text-lg mb-2 p-4 font-semibold text-white bg-indigo-600 rounded-lg shadow">Identify the data type</p>
                <div className="text-left text-xl font-mono font-light bg-gray-100 p-4 rounded-lg mb-4">
                  {currentQuestion.value}
                </div>
              </div>
            )}

            {(mode === 'Constructs' || (mode === 'Champion' && currentQuestion.sourceMode === 'Constructs')) && (
              <div>
                <p className="text-left text-lg mb-2 p-4 font-semibold text-white bg-indigo-600 rounded-lg shadow">Identify the programming constructs used</p>
                <pre className="text-left bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-xl">
                  <code className="font-light">{currentQuestion.code}</code>
                </pre>
              </div>
            )}

            {(mode === 'Operators' || (mode === 'Champion' && currentQuestion.sourceMode === 'Operators')) && (
              <div>
                <p className="text-left text-lg mb-2 p-4 font-semibold text-white bg-indigo-600 rounded-lg shadow">State the result of the following expression</p>
                <pre className="text-left bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-xl">
                  <code className="font-light">{currentQuestion.code}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Input Section */}
          {(mode === 'Constructs' || (mode === 'Champion' && currentQuestion.sourceMode === 'Constructs')) ? (
            // Checkbox input for constructs
            <div className="mb-4">
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4">
                <label className="flex items-center space-x-3 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 min-w-[120px] justify-center">
                  <Checkbox
                    id="sequence"
                    checked={constructsChecked.sequence}
                    onCheckedChange={(checked) => 
                      setConstructsChecked(prev => ({ ...prev, sequence: checked as boolean }))
                    }
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium leading-none select-none">
                    <kbd className="mr-2 px-2 py-1 text-xs bg-gray-100 border rounded font-mono">1</kbd>
                    Sequence
                  </span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 min-w-[120px] justify-center">
                  <Checkbox
                    id="selection"
                    checked={constructsChecked.selection}
                    onCheckedChange={(checked) => 
                      setConstructsChecked(prev => ({ ...prev, selection: checked as boolean }))
                    }
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium leading-none select-none">
                    <kbd className="mr-2 px-2 py-1 text-xs bg-gray-100 border rounded font-mono">2</kbd>
                    Selection
                  </span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 min-w-[120px] justify-center">
                  <Checkbox
                    id="iteration"
                    checked={constructsChecked.iteration}
                    onCheckedChange={(checked) => 
                      setConstructsChecked(prev => ({ ...prev, iteration: checked as boolean }))
                    }
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium leading-none select-none">
                    <kbd className="mr-2 px-2 py-1 text-xs bg-gray-100 border rounded font-mono">3</kbd>
                    Iteration
                  </span>
                </label>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={checkAnswer} 
                  disabled={!constructsChecked.sequence && !constructsChecked.selection && !constructsChecked.iteration}
                  className="px-8 py-3 font-semibold text-white transition-all duration-200 transform rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:-translate-y-1 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:shadow-lg disabled:transform-none"
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
                onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                className="p-6 text-lg font-bold text-center transition-all duration-200 border-2 border-indigo-200 shadow-lg sm:text-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 rounded-xl bg-gradient-to-r from-white to-indigo-50 focus-visible:ring-indigo-200/50"
                disabled={showFeedback}
              />
              <p className="text-xs text-gray-500 mt-1 text-center">Press Enter to submit</p>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {isCorrect ? (
                feedback
              ) : (
                <div>
                  {/* Special formatting for datatypes feedback to bold the data type */}
                  {(mode === 'Data Types' || (mode === 'Champion' && currentQuestion.sourceMode === 'Data Types')) && !isCorrect ? (
                    <span>
                      ❌ No, this is {currentQuestion.type === 'integer' ? 'an' : 'a'} <strong>{currentQuestion.type === 'boolean' ? 'Boolean' : currentQuestion.type}</strong> because{' '}
                      {{
                        character: "it's a single character in quotes",
                        string: "it's text (multiple characters) in quotes", 
                        integer: "it's a whole number without quotes",
                        float: "it's a decimal number",
                        boolean: "it's either True or False (without quotes)"
                      }[currentQuestion.type as 'character' | 'string' | 'integer' | 'float' | 'boolean']}.
                    </span>
                  ) : (
                    feedback
                  )}
                </div>
              )}
              <div className="text-center mt-3 space-y-3">
                <button
                  type="button"
                  onClick={() => generateQuestion()}
                  aria-label="Generate next question"
                  className="px-8 py-3 font-semibold text-white transition-all duration-200 transform rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:-translate-y-1"
                >
                  <span className="mr-2">🎯</span>
                  Next Question
                </button>
              </div>
            </div>
          )}

          {/* Hints Section - Details/Summary Pattern. Not in champion mode */}
          {mode !== 'Champion' && (
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
            <div className="p-4 mt-3 border-l-4 border-blue-400 rounded-r-lg shadow-inner bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="text-sm font-light text-blue-800">
                {getHintContent()}
              </div>
            </div>
          </details>
          )}

        </Card>
      )}
    </div>
  );
}