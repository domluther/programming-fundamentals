
let currentMode = 'datatypes';
let currentQuestion = {};
let championQuestionType = ''; // Track which mode type for champion questions
let supportMode = false;
let selectedAnswer = '';
let questionAnswered = false;
// Separate stats for each mode with detailed tracking
let modeStats = {
	datatypes: {
		score: 0,
		streak: 0,
		totalQuestions: 0,
		correctAnswers: 0,
		recordStreak: 0,
		detailed: {
			character: {
				correct: 0,
				total: 0
			},
			string: {
				correct: 0,
				total: 0
			},
			integer: {
				correct: 0,
				total: 0
			},
			float: {
				correct: 0,
				total: 0
			},
			boolean: {
				correct: 0,
				total: 0
			}
		}
	},
	constructs: {
		score: 0,
		streak: 0,
		totalQuestions: 0,
		correctAnswers: 0,
		recordStreak: 0,
		detailed: {
			sequence: {
				correct: 0,
				total: 0
			},
			'selection-sequence': {
				correct: 0,
				total: 0
			},
			'iteration-sequence': {
				correct: 0,
				total: 0
			},
			'all-three': {
				correct: 0,
				total: 0
			}
		}
	},
	operators: {
		score: 0,
		streak: 0,
		totalQuestions: 0,
		correctAnswers: 0,
		recordStreak: 0,
		detailed: {
			addition: {
				correct: 0,
				total: 0
			},
			subtraction: {
				correct: 0,
				total: 0
			},
			multiplication: {
				correct: 0,
				total: 0
			},
			division: {
				correct: 0,
				total: 0
			},
			modulo: {
				correct: 0,
				total: 0
			},
			'integer-division': {
				correct: 0,
				total: 0
			},
			exponentiation: {
				correct: 0,
				total: 0
			},
			comparison: {
				correct: 0,
				total: 0
			},
			mixed: {
				correct: 0,
				total: 0
			}
		}
	},
	champion: {
		score: 0,
		streak: 0,
		totalQuestions: 0,
		correctAnswers: 0,
		recordStreak: 0,
		detailed: {
			datatypes: {
				correct: 0,
				total: 0
			},
			constructs: {
				correct: 0,
				total: 0
			},
			operators: {
				correct: 0,
				total: 0
			}
		}
	}
};

// localStorage functions for persistent stats
function saveStatsToLocalStorage() {
	try {
		localStorage.setItem('programmingFundamentalsStats', JSON.stringify(modeStats));
	} catch (error) {
		console.warn('Failed to save stats to localStorage:', error);
	}
}

function loadStatsFromLocalStorage() {
	try {
		const savedStats = localStorage.getItem('programmingFundamentalsStats');
		if (savedStats) {
			const parsedStats = JSON.parse(savedStats);
			// Merge saved stats with default structure to handle any new properties
			modeStats = mergeStatsWithDefaults(parsedStats, modeStats);
		}
	} catch (error) {
		console.warn('Failed to load stats from localStorage:', error);
		// Keep default modeStats if loading fails
	}
}

function mergeStatsWithDefaults(savedStats, defaultStats) {
	const merged = JSON.parse(JSON.stringify(defaultStats)); // Deep clone defaults
	
	// Merge each mode
	for (const mode in savedStats) {
		if (merged[mode]) {
			// Merge basic stats
			merged[mode].score = savedStats[mode].score || 0;
			merged[mode].streak = savedStats[mode].streak || 0;
			merged[mode].totalQuestions = savedStats[mode].totalQuestions || 0;
			merged[mode].correctAnswers = savedStats[mode].correctAnswers || 0;
			merged[mode].recordStreak = savedStats[mode].recordStreak || 0;
			
			// Merge detailed stats if they exist
			if (savedStats[mode].detailed && merged[mode].detailed) {
				for (const category in savedStats[mode].detailed) {
					if (merged[mode].detailed[category]) {
						merged[mode].detailed[category].correct = savedStats[mode].detailed[category].correct || 0;
						merged[mode].detailed[category].total = savedStats[mode].detailed[category].total || 0;
					}
				}
			}
		}
	}
	
	return merged;
}



// Switch between different quiz modes (datatypes, constructs, operators, champion)
function switchMode(mode, btnElement) {
	currentMode = mode;
	// Update mode buttons
	document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
	// If called by a click, use the element. If called by script, find the element by ID.
	if (btnElement) {
		btnElement.classList.add('active');
	} else {
		document.getElementById(`mode-${mode}`).classList.add('active');
	}

	// Apply champion mode styling
	const container = document.querySelector('.container');
	if (mode === 'champion') {
		container.classList.add('champion-mode');
	} else {
		container.classList.remove('champion-mode');
	}

	// Update header
	const headerDesc = document.getElementById('headerDescription');
	switch (mode) {
		case 'datatypes':
			headerDesc.textContent = 'Identify the data type of each value';
			break;
		case 'constructs':
			headerDesc.textContent = 'Identify which programming constructs are used';
			break;
		case 'operators':
			headerDesc.textContent = 'Calculate the result of each expression';
			break;
		case 'champion':
			headerDesc.textContent = 'Master all programming fundamentals - no hints!';
			break;
	}
	// Update stats display for current mode
	updateStats();
	// Hide hints section and remove hints toggle for champion mode
	const hintToggle = document.getElementById('hintToggle');
	if (mode === 'champion') {
		document.getElementById('hintSection').classList.remove('show');
		hintToggle.style.display = 'none';
	} else {
		hintToggle.style.display = 'block';
		document.getElementById('hintSection').classList.remove('show');
		hintToggle.classList.remove('active');
		hintToggle.textContent = 'Show Hints';
	}

	// Reset support mode state if active
	if (supportMode) {
		supportMode = false;
		document.getElementById('textInput').style.display = 'block';
		document.getElementById('buttonSection').classList.remove('show');
		document.querySelector('.submit-btn').style.display = 'block';
		const supportToggle = document.getElementById('supportToggle');
		if (supportToggle) {
			supportToggle.classList.remove('active');
			supportToggle.textContent = 'Support Mode';
		}
	}
	generateQuestion();
}

function generateQuestion() {
	questionAnswered = false;
	selectedAnswer = '';
	// Clear previous question display
	document.getElementById('questionValue').style.display = 'none';
	document.getElementById('codeBlock').style.display = 'none';
	document.getElementById('textInput').style.display = 'block';
	document.getElementById('buttonSection').classList.remove('show');
	document.getElementById('checkboxSection').classList.remove('show');
	document.getElementById('nextQuestionContainer').innerHTML = '';
	const feedbackEl = document.getElementById('feedback');
	feedbackEl.textContent = '';
	feedbackEl.className = 'feedback'; // Resets to hidden state

	if (currentMode === 'champion') {
		// Champion mode randomly selects from all three question types
		const questionTypes = ['datatypes', 'constructs', 'operators'];
		championQuestionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

		if (championQuestionType === 'datatypes') {
			generateDataTypeQuestion();
		} else if (championQuestionType === 'constructs') {
			generateConstructQuestion();
		} else if (championQuestionType === 'operators') {
			generateOperatorQuestion();
		}
	} else if (currentMode === 'datatypes') {
		generateDataTypeQuestion();
	} else if (currentMode === 'constructs') {
		generateConstructQuestion();
	} else if (currentMode === 'operators') {
		generateOperatorQuestion();
	}
	resetUI();
	// Focus on text input if visible
	setTimeout(() => {
		const textInput = document.getElementById('textInput');
		if (textInput.style.display !== 'none' && !textInput.disabled) {
			textInput.focus();
		}
	}, 100);
}

function generateDataTypeQuestion() {
	const dataTypes = ['character', 'string', 'integer', 'float', 'boolean'];
	const selectedType = dataTypes[Math.floor(Math.random() * dataTypes.length)];
	const questionsOfType = dataTypeQuestions[selectedType];
	currentQuestion = questionsOfType[Math.floor(Math.random() * questionsOfType.length)];
	document.getElementById('questionValue').textContent = currentQuestion.value;
	document.getElementById('questionValue').style.display = 'block';
	document.getElementById('textInput').placeholder = 'Enter data type...';
	// Setup support mode buttons
	const buttonSection = document.getElementById('buttonSection');
	buttonSection.innerHTML = `
            
                    <button class="answer-btn" onclick="selectAnswer('boolean')">Boolean</button>
                    <button class="answer-btn" onclick="selectAnswer('character')">Character</button>
                    <button class="answer-btn" onclick="selectAnswer('string')">String</button>
                    <button class="answer-btn" onclick="selectAnswer('integer')">Integer</button>
                    <button class="answer-btn" onclick="selectAnswer('float')">Float</button>
        `;
}

function generateConstructQuestion() {
	currentQuestion = constructQuestions[Math.floor(Math.random() * constructQuestions.length)];
	document.getElementById('codeBlock').textContent = currentQuestion.code;
	document.getElementById('codeBlock').style.display = 'block';
	document.getElementById('textInput').style.display = 'none';
	// Setup checkboxes
	const checkboxSection = document.getElementById('checkboxSection');
	checkboxSection.innerHTML = `
            
                    <label class="checkbox-item">
                        <input type="checkbox" id="sequence" value="sequence">
                        <span>Sequence</span>
                    </label>
                    <label class="checkbox-item">
                        <input type="checkbox" id="selection" value="selection">
                        <span>Selection</span>
                    </label>
                    <label class="checkbox-item">
                        <input type="checkbox" id="iteration" value="iteration">
                        <span>Iteration</span>
                    </label>
        `;
	checkboxSection.classList.add('show');
}

function generateOperatorQuestion() {
	currentQuestion = operatorQuestions[Math.floor(Math.random() * operatorQuestions.length)];
	document.getElementById('codeBlock').textContent = currentQuestion.code;
	document.getElementById('codeBlock').style.display = 'block';
	document.getElementById('textInput').placeholder = 'Enter the result...';
}

function updateHints() {
	const hintSection = document.getElementById('hintSection');
	let hintsHTML = '';
	if (currentMode === 'datatypes') {
		hintsHTML = `
                
                                <div class="hint-item">
                                    <div class="hint-title">Character</div>
                                    <div class="hint-description">A single letter, number or symbol</div>
                                    <div class="hint-examples">'a', '!', '2', ' '</div>
                                </div>
                                <div class="hint-item">
                                    <div class="hint-title">String</div>
                                    <div class="hint-description">A collection of characters</div>
                                    <div class="hint-examples">'hello', "panda1", ":D"</div>
                                </div>
                                <div class="hint-item">
                                    <div class="hint-title">Integer</div>
                                    <div class="hint-description">A whole number</div>
                                    <div class="hint-examples">2, 5, -1</div>
                                </div>
                                <div class="hint-item">
                                    <div class="hint-title">Float / Real</div>
                                    <div class="hint-description">A number with a decimal</div>
                                    <div class="hint-examples">-2.2, 3.14</div>
                                </div>
                                <div class="hint-item">
                                    <div class="hint-title">Boolean</div>
                                    <div class="hint-description">Has only two options</div>
                                    <div class="hint-examples">True or False</div>
                                </div>`;
		// Add the duck support section only for datatypes mode
		hintsHTML += `
                                <div class="duck-support-container">
                                    <button id="supportDuck" onclick="toggleSupportMode()" class="${supportMode ? 'active' : ''}">🦆</button>
                                </div>`;
	} else if (currentMode === 'constructs') {
		hintsHTML = `
                
                                <div class="hint-item">
                                    <div class="hint-title">Sequence</div>
                                    <div class="hint-description">Instructions executed one after another in order.</div>
                                    <div class="hint-examples">Always present in any code.</div>
                                </div>
                                <div class="hint-item">
                                    <div class="hint-title">Selection</div>
                                    <div class="hint-description">Making decisions in code.</div>
                                    <div class="hint-examples">Look for: if, elif, else, switch</div>
                                </div>
                                <div class="hint-item">
                                    <div class="hint-title">Iteration</div>
                                    <div class="hint-description">Repeating code (loops).</div>
                                    <div class="hint-examples">Look for: for, while, do until</div>
                                </div>`;
	} else if (currentMode === 'operators') {
		hintsHTML = `
                
                                <div class="hint-item">
                                    <div class="hint-title">Arithmetic Operators</div>
                                    <div class="hint-description">Mathematical operations.</div>
                                    <div class="hint-examples">+ (add), - (subtract), * (multiply), / (divide)</div>
                                </div>
                                <div class="hint-item">
                                    <div class="hint-title">Special Operators</div>
                                    <div class="hint-description">OCR specific operations.</div>
                                    <div class="hint-examples">MOD (remainder), DIV (integer division), ^ (power)</div>
                                </div>
                                <div class="hint-item">
                                    <div class="hint-title">Comparison Operators</div>
                                    <div class="hint-description">Compare values (result is true or false).</div>
                                    <div class="hint-examples">== (equal), != (not equal), < ><= >=
                                    </div>
                                </div>`;
	}
	hintSection.innerHTML = hintsHTML;
}

function selectAnswer(answer) {
	selectedAnswer = answer;
	// Reset all buttons
	document.querySelectorAll('.answer-btn').forEach(btn => btn.style.background = '#4facfe');
	// Highlight selected button
	event.target.style.background = '#28a745';
	// Auto-submit in support mode
	if (supportMode && currentMode === 'datatypes') {
		setTimeout(checkAnswer, 200);
	}
}

function checkAnswer() {
	if (questionAnswered) return;

	let userAnswer = '';
	let isCorrect = false;

	// Determine which question type we're dealing with (handles both regular and champion modes)
	let questionType = currentMode;
	if (currentMode === 'champion') {
		questionType = championQuestionType;
	}

	if (questionType === 'datatypes') {
		if (supportMode) {
			userAnswer = selectedAnswer.toLowerCase();
			if (!userAnswer) {
				alert('Please select an answer first!');
				return;
			}
		} else {
			userAnswer = document.getElementById('textInput').value.toLowerCase().trim();
			if (!userAnswer) {
				alert('Please enter an answer!');
				return;
			}
		}
		const correctType = currentQuestion.type;
		isCorrect = userAnswer === correctType || (correctType === 'float' && ['real', 'float/real'].includes(userAnswer));
	} else if (questionType === 'constructs') {
		const selectedConstructs = Array.from(document.querySelectorAll('#checkboxSection input:checked')).map(cb => cb.value);
		if (selectedConstructs.length === 0) {
			alert('Please select at least one construct!');
			return;
		}
		const expectedConstructs = currentQuestion.constructs.sort();
		isCorrect = JSON.stringify(expectedConstructs) === JSON.stringify(selectedConstructs.sort());
	} else if (questionType === 'operators') {
		userAnswer = document.getElementById('textInput').value.toLowerCase().trim();
		if (!userAnswer) {
			alert('Please enter an answer!');
			return;
		}
		isCorrect = userAnswer === currentQuestion.answer.toLowerCase();
	}
	questionAnswered = true;
	disableUI();
	const currentStats = modeStats[currentMode];
	currentStats.totalQuestions++;

	// In champion mode, also update the original mode's main stats
	let originalModeStats = null;
	if (currentMode === 'champion') {
		originalModeStats = modeStats[questionType];
		originalModeStats.totalQuestions++;
	}

	// Track detailed stats based on question type
	trackDetailedStats(questionType, isCorrect);

	const feedbackEl = document.getElementById('feedback');
	if (isCorrect) {
		currentStats.correctAnswers++;
		currentStats.score++;
		currentStats.streak++;
		if (currentStats.streak > currentStats.recordStreak) {
			currentStats.recordStreak = currentStats.streak;
		}
		
		// In champion mode, also update the original mode's main stats
		if (originalModeStats) {
			originalModeStats.correctAnswers++;
			originalModeStats.score++;
			originalModeStats.streak++;
			if (originalModeStats.streak > originalModeStats.recordStreak) {
				originalModeStats.recordStreak = originalModeStats.streak;
			}
		}
		
		feedbackEl.innerHTML = 'Well done! 🥳';
		feedbackEl.className = 'feedback correct show';
	} else {
		currentStats.streak = 0;
		
		// In champion mode, also reset the original mode's streak
		if (originalModeStats) {
			originalModeStats.streak = 0;
		}
		let feedbackText = '';
		if (questionType === 'datatypes') {
			const article = ['a', 'e', 'i', 'o', 'u'].includes(currentQuestion.type[0]) ? 'an' : 'a';
			feedbackText = `No, this is ${article} 
                                <strong>${currentQuestion.type}</strong> because ${currentQuestion.explanation}. 😢`;
		} else if (questionType === 'constructs') {
			const correctConstructs = currentQuestion.constructs.join(', ');
			feedbackText = `No, the correct constructs are 
                                <strong>${correctConstructs}</strong> because ${currentQuestion.explanation}. 😢`;
		} else if (questionType === 'operators') {
			feedbackText = `No, the correct answer is 
                                <strong>${currentQuestion.answer}</strong> because ${currentQuestion.explanation}. 😢`;
		}
		feedbackEl.innerHTML = feedbackText;
		feedbackEl.className = 'feedback incorrect show';
	}
	const nextBtnContainer = document.getElementById('nextQuestionContainer');
	nextBtnContainer.innerHTML = `
                                <button class="next-btn" onclick="generateQuestion()">Next Question</button>`;
	
	// Save updated stats to localStorage
	saveStatsToLocalStorage();
	updateStats();
}

function resetUI() {
	document.querySelector('.submit-btn').disabled = false;
	const textInput = document.getElementById('textInput');
	textInput.disabled = false;
	textInput.value = '';
	document.querySelectorAll('.answer-btn').forEach(btn => {
		btn.disabled = false;
		btn.style.background = '#4facfe';
	});
	document.querySelectorAll('#checkboxSection input').forEach(cb => {
		cb.checked = false;
		cb.disabled = false;
	});
}

function disableUI() {
	document.querySelector('.submit-btn').disabled = true;
	document.getElementById('textInput').disabled = true;
	document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
	document.querySelectorAll('#checkboxSection input').forEach(cb => cb.disabled = true);
}

function trackDetailedStats(questionType, isCorrect) {

	if (currentMode === 'champion') {
		// In champion mode, track stats in both champion mode AND the original mode
		const championStats = modeStats['champion'];
		const originalModeStats = modeStats[questionType];

		// Track in champion mode breakdown
		if (championStats.detailed[questionType]) {
			championStats.detailed[questionType].total++;
			if (isCorrect) {
				championStats.detailed[questionType].correct++;
			}
		}

		// Track in original mode's detailed stats
		let categoryKey = '';
		if (questionType === 'datatypes') {
			categoryKey = currentQuestion.type;
		} else if (questionType === 'constructs') {
			const constructs = currentQuestion.constructs.sort();
			if (constructs.length === 1) {
				categoryKey = constructs[0];
			} else if (constructs.length === 2) {
				categoryKey = constructs.join('-');
			} else if (constructs.length === 3) {
				categoryKey = 'all-three';
			}
		} else if (questionType === 'operators') {
			categoryKey = currentQuestion.category;
		}

		if (categoryKey && originalModeStats.detailed[categoryKey]) {
			originalModeStats.detailed[categoryKey].total++;
			if (isCorrect) {
				originalModeStats.detailed[categoryKey].correct++;
			}
		}
	} else {
		// Regular mode tracking
		const currentStats = modeStats[currentMode];
		let categoryKey = '';

		if (questionType === 'datatypes') {
			// Track by data type (character, string, integer, float, boolean)
			categoryKey = currentQuestion.type;
		} else if (questionType === 'constructs') {
			// Track by construct combination
			const constructs = currentQuestion.constructs.sort();
			if (constructs.length === 1) {
				categoryKey = constructs[0];
			} else if (constructs.length === 2) {
				categoryKey = constructs.join('-');
			} else if (constructs.length === 3) {
				categoryKey = 'all-three';
			}
		} else if (questionType === 'operators') {
			// Track by operator category
			categoryKey = currentQuestion.category;
		}

		if (categoryKey && currentStats.detailed[categoryKey]) {
			currentStats.detailed[categoryKey].total++;
			if (isCorrect) {
				currentStats.detailed[categoryKey].correct++;
			}
		}
	}
	
	// Save updated detailed stats to localStorage
	saveStatsToLocalStorage();
}

function updateStats() {
	const currentStats = modeStats[currentMode];
	document.getElementById('score').textContent = currentStats.score;
	document.getElementById('streak').textContent = currentStats.streak;
	document.getElementById('recordStreak').textContent = currentStats.recordStreak;
	const accuracy = currentStats.totalQuestions > 0 ? Math.round((currentStats.correctAnswers / currentStats.totalQuestions) * 100) : 0;
	document.getElementById('accuracy').textContent = accuracy + '%';
}

function toggleSupportMode() {
	supportMode = !supportMode;
	const duck = document.getElementById('supportDuck');
	const duckFeedback = document.getElementById('duckFeedback');
	if (duck) duck.classList.toggle('active', supportMode);
	if (duckFeedback) duckFeedback.textContent = supportMode ? 'Support mode is ON!' : 'Click the duck to switch to button answers.';
	document.getElementById('textInput').style.display = supportMode ? 'none' : 'block';
	document.getElementById('buttonSection').classList.toggle('show', supportMode);
	document.querySelector('.submit-btn').style.display = supportMode ? 'none' : 'block';
}
document.getElementById('hintToggle').addEventListener('click', function() {
	const hintSection = document.getElementById('hintSection');
	hintSection.classList.toggle('show');
	this.classList.toggle('active');
	this.textContent = hintSection.classList.contains('show') ? 'Hide Hints' : 'Show Hints';
	if (hintSection.classList.contains('show')) updateHints();
});
document.addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
		if (questionAnswered) {
			document.querySelector('.next-btn')?.click();
		} else if (document.getElementById('textInput').style.display !== 'none') {
			// This condition prevents submission when text input is hidden
			checkAnswer();
		}
	}
});
// This now works on page load without causing an error.
switchMode('datatypes');

// Stats Modal Functions
function openStatsModal() {
	updateStatsModal();
	document.getElementById('statsModal').classList.add('show');
	document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeStatsModal() {
	document.getElementById('statsModal').classList.remove('show');
	document.body.style.overflow = 'auto'; // Restore scrolling
}

function updateStatsModal() {
	// Calculate overall stats
	let totalPoints = 0;
	let totalCorrect = 0;
	let totalQuestions = 0;

	Object.values(modeStats).forEach(stats => {
		totalPoints += stats.score;
		totalCorrect += stats.correctAnswers;
		totalQuestions += stats.totalQuestions;
	});

	const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

	// Update overall stats display
	document.getElementById('overallPoints').textContent = totalPoints;
	
	const overallAccuracyElement = document.getElementById('overallAccuracy');
	if (totalQuestions > 0) {
		overallAccuracyElement.textContent = overallAccuracy + '%';
		// Apply color coding based on percentage
		if (overallAccuracy >= 75) {
			overallAccuracyElement.className = 'overall-stat-value strong';
		} else if (overallAccuracy >= 50) {
			overallAccuracyElement.className = 'overall-stat-value medium';
		} else {
			overallAccuracyElement.className = 'overall-stat-value weak';
		}
	} else {
		overallAccuracyElement.textContent = 'N/A';
		overallAccuracyElement.className = 'overall-stat-value';
	}

	// Update individual mode stats
	updateModeStatsDisplay('datatypes', '📝 Data Types');
	updateModeStatsDisplay('constructs', '🏗️ Constructs');
	updateModeStatsDisplay('operators', '🔢 Operators');
	updateModeStatsDisplay('champion', '🏆 Champion');
}

function updateModeStatsDisplay(mode, title) {
	const stats = modeStats[mode];
	const accuracy = stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0;

	document.getElementById(mode + 'Points').textContent = stats.score;
	
	const accuracyElement = document.getElementById(mode + 'Accuracy');
	if (stats.totalQuestions > 0) {
		accuracyElement.textContent = accuracy + '%';
		// Apply color coding based on percentage
		if (accuracy >= 75) {
			accuracyElement.className = 'strong';
		} else if (accuracy >= 50) {
			accuracyElement.className = 'medium';
		} else {
			accuracyElement.className = 'weak';
		}
	} else {
		accuracyElement.textContent = 'N/A';
		accuracyElement.className = '';
	}
	
	document.getElementById(mode + 'Streak').textContent = stats.recordStreak;
	document.getElementById(mode + 'Questions').textContent = stats.totalQuestions > 0 ? stats.correctAnswers + '/' + stats.totalQuestions : 'N/A';

	// Update detailed stats
	updateDetailedStatsDisplay(mode, stats);
}

function updateDetailedStatsDisplay(mode, stats) {
	if (mode === 'datatypes') {
		const detailed = stats.detailed;
		updateBreakdownItem('datatypesCharacter', detailed.character.correct, detailed.character.total);
		updateBreakdownItem('datatypesString', detailed.string.correct, detailed.string.total);
		updateBreakdownItem('datatypesInteger', detailed.integer.correct, detailed.integer.total);
		updateBreakdownItem('datatypesFloat', detailed.float.correct, detailed.float.total);
		updateBreakdownItem('datatypesBoolean', detailed.boolean.correct, detailed.boolean.total);
	} else if (mode === 'constructs') {
		const detailed = stats.detailed;
		updateBreakdownItem('constructsSequence', detailed.sequence.correct, detailed.sequence.total);
		updateBreakdownItem('constructsSequenceSelection', detailed['selection-sequence'].correct, detailed['selection-sequence'].total);
		updateBreakdownItem('constructsSequenceIteration', detailed['iteration-sequence'].correct, detailed['iteration-sequence'].total);
		updateBreakdownItem('constructsAllThree', detailed['all-three'].correct, detailed['all-three'].total);
	} else if (mode === 'operators') {
		const detailed = stats.detailed;
		updateBreakdownItem('operatorsAddition', detailed.addition.correct, detailed.addition.total);
		updateBreakdownItem('operatorsSubtraction', detailed.subtraction.correct, detailed.subtraction.total);
		updateBreakdownItem('operatorsMultiplication', detailed.multiplication.correct, detailed.multiplication.total);
		updateBreakdownItem('operatorsDivision', detailed.division.correct, detailed.division.total);
		updateBreakdownItem('operatorsModulo', detailed.modulo.correct, detailed.modulo.total);
		updateBreakdownItem('operatorsIntegerDivision', detailed['integer-division'].correct, detailed['integer-division'].total);
		updateBreakdownItem('operatorsExponentiation', detailed.exponentiation.correct, detailed.exponentiation.total);
		updateBreakdownItem('operatorsComparison', detailed.comparison.correct, detailed.comparison.total);
		updateBreakdownItem('operatorsMixed', detailed.mixed.correct, detailed.mixed.total);
	} else if (mode === 'champion') {
		const detailed = stats.detailed;
		updateBreakdownItem('championDatatypes', detailed.datatypes.correct, detailed.datatypes.total);
		updateBreakdownItem('championConstructs', detailed.constructs.correct, detailed.constructs.total);
		updateBreakdownItem('championOperators', detailed.operators.correct, detailed.operators.total);
	}
}

function updateBreakdownItem(elementId, correct, total) {
	const element = document.getElementById(elementId);
	
	if (total === 0) {
		element.textContent = 'N/A';
		element.className = '';
		return;
	}
	
	const percentage = (correct / total) * 100;
	element.textContent = correct + '/' + total;
	
	// Apply color coding based on percentage
	if (percentage >= 75) {
		element.className = 'breakdown-stat strong';
	} else if (percentage >= 50) {
		element.className = 'breakdown-stat medium';
	} else {
		element.className = 'breakdown-stat weak';
	}
}

// Close modal when clicking outside of it
document.getElementById('statsModal').addEventListener('click', function(e) {
	if (e.target === this) {
		closeStatsModal();
	}
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape' && document.getElementById('statsModal').classList.contains('show')) {
		closeStatsModal();
	}
});

// Initialize stats from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function() {
	loadStatsFromLocalStorage();
	// Update the stats display to show loaded values
	updateStats();
});