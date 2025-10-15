// Global variables
let currentQuiz = null;
let userAnswers = [];
const API_URL = window.location.origin;

// Check server status on page load
async function checkServerStatus() {
    try {
        const response = await fetch(`${API_URL}/api/health`);
        const data = await response.json();
        
        const badge = document.getElementById('statusBadge');
        if (data.apiKeyConfigured) {
            badge.textContent = '✅ Server Ready';
            badge.style.background = 'rgba(40, 167, 69, 0.8)';
        } else {
            badge.textContent = '⚠️ Server Running (No API Key)';
            badge.style.background = 'rgba(255, 193, 7, 0.8)';
            showError('Server is running but OpenAI API key is not configured. Check server logs.');
        }
    } catch (error) {
        const badge = document.getElementById('statusBadge');
        badge.textContent = '❌ Server Offline';
        badge.style.background = 'rgba(220, 53, 69, 0.8)';
        showError('Cannot connect to server. Make sure the backend is running on port 3000.');
    }
}

// Initialize on page load
checkServerStatus();

// Tab switching
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    
    const tabs = document.querySelectorAll('.tab');
    if (tabName === 'generator') tabs[0].classList.add('active');
    if (tabName === 'quiz') tabs[1].classList.add('active');
    if (tabName === 'results') tabs[2].classList.add('active');
    
    document.getElementById(tabName).classList.add('active');
}

// Load sample content
function loadSampleContent() {
    const sampleDiv = document.getElementById('sampleContent');
    const textarea = document.getElementById('content');
    
    if (sampleDiv.style.display === 'none') {
        sampleDiv.style.display = 'block';
        const paras = sampleDiv.querySelectorAll('p');
        let text = '';
        paras.forEach(p => text += p.textContent + '\n\n');
        textarea.value = text.trim();
    } else {
        sampleDiv.style.display = 'none';
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('errorAlert');
    errorDiv.textContent = '❌ ' + message;
    errorDiv.style.display = 'block';
    setTimeout(() => errorDiv.style.display = 'none', 8000);
    window.scrollTo(0, 0);
}

// Show success message
function showSuccess(message) {
    const successDiv = document.getElementById('successAlert');
    successDiv.textContent = '✅ ' + message;
    successDiv.style.display = 'block';
    setTimeout(() => successDiv.style.display = 'none', 4000);
    window.scrollTo(0, 0);
}

// Generate quiz
async function handleGenerateQuiz() {
    const content = document.getElementById('content').value.trim();
    
    if (!content) {
        showError('Please enter some educational content first!');
        return;
    }

    if (content.length < 100) {
        showError('Content must be at least 100 characters long!');
        return;
    }

    const options = {
        numQuestions: parseInt(document.getElementById('numQuestions').value),
        difficulty: document.getElementById('difficulty').value,
        subject: document.getElementById('subject').value,
        gradeLevel: document.getElementById('gradeLevel').value
    };

    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.textContent = '⏳ Generating...';
    
    showLoading();

    try {
        const response = await fetch(`${API_URL}/api/generate-quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content, options })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.error || 'Failed to generate quiz');
        }

        currentQuiz = data.quiz;
        userAnswers = new Array(currentQuiz.length).fill(null);
        
        showSuccess(`Generated ${currentQuiz.length} questions successfully!`);
        displayQuiz();

    } catch (error) {
        console.error('Quiz generation error:', error);
        showError(error.message || 'Failed to generate quiz. Check server logs.');
        document.getElementById('quizContainer').innerHTML = `
            <p style="text-align: center; padding: 40px; color: #dc3545;">
                ❌ ${error.message}
                <br><br>
                <small>Make sure the backend server is running with: npm start</small>
            </p>
        `;
    } finally {
        btn.disabled = false;
        btn.textContent = '🚀 Generate Quiz with AI';
    }
}

// Show loading animation
function showLoading() {
    document.getElementById('quizContainer').innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <h3>🤖 AI is Analyzing Your Content...</h3>
            <p>Creating custom questions from your material...</p>
            <p style="font-size: 0.9rem; color: #6c757d; margin-top: 10px;">This takes 15-30 seconds</p>
        </div>
    `;
    switchTab('quiz');
}

// Display quiz
function displayQuiz() {
    let html = `
        <div style="margin-bottom:30px">
            <h2>📝 Your Custom Quiz</h2>
            <p>Answer all questions and submit to see your results!</p>
        </div>
    `;
    
    currentQuiz.forEach((q, i) => {
        html += `<div class="question-card" id="q${i}">
            <div class="question-header">
                <span class="question-number">Question ${i+1}</span>
                <span class="question-type">${q.type.replace('-', ' ').toUpperCase()}</span>
            </div>
            <div class="question-text">${q.question}</div>`;

        if (q.type === 'multiple-choice') {
            html += '<ul class="options">';
            q.options.forEach((opt, j) => {
                html += `<li class="option" onclick="selectMC(${i},${j})"><strong>${String.fromCharCode(65+j)})</strong> ${opt}</li>`;
            });
            html += '</ul>';
        } else if (q.type === 'true-false') {
            html += `<ul class="options">
                <li class="option" onclick="selectTF(${i},true)"><strong>True</strong></li>
                <li class="option" onclick="selectTF(${i},false)"><strong>False</strong></li>
            </ul>`;
        } else if (q.type === 'short-answer') {
            html += `<textarea class="answer-input" id="ans${i}" placeholder="Type your answer here (2-3 sentences)..." onchange="userAnswers[${i}]=this.value"></textarea>`;
        } else if (q.type === 'fill-blank') {
            html += `<input type="text" class="answer-input" id="ans${i}" placeholder="Enter your answer..." onchange="userAnswers[${i}]=this.value">`;
        }
        
        html += '</div>';
    });

    html += `
        <div style="text-align:center;margin-top:30px">
            <button class="btn btn-primary" onclick="submitQuiz()" style="font-size:18px;padding:15px 30px">
                ✓ Submit Quiz
            </button>
        </div>
    `;
    
    document.getElementById('quizContainer').innerHTML = html;
}

// Select multiple choice option
function selectMC(qIdx, optIdx) {
    const card = document.getElementById(`q${qIdx}`);
    card.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
    card.querySelectorAll('.option')[optIdx].classList.add('selected');
    userAnswers[qIdx] = optIdx;
}

// Select true/false option
function selectTF(qIdx, val) {
    const card = document.getElementById(`q${qIdx}`);
    card.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
    card.querySelectorAll('.option')[val ? 0 : 1].classList.add('selected');
    userAnswers[qIdx] = val;
}

// Submit quiz
function submitQuiz() {
    if (userAnswers.some(a => a === null || a === '')) {
        alert('Please answer all questions before submitting!');
        return;
    }
    showResults();
}

// Show results
function showResults() {
    let correct = 0;
    let html = '';

    currentQuiz.forEach((q, i) => {
        const userAns = userAnswers[i];
        let isCorrect = false;

        if (q.type === 'multiple-choice') {
            isCorrect = userAns === q.correct;
        } else if (q.type === 'true-false') {
            isCorrect = userAns === q.correct;
        } else if (q.type === 'short-answer') {
            const userLower = String(userAns).toLowerCase();
            isCorrect = q.keyPoints && q.keyPoints.some(kp => userLower.includes(kp.toLowerCase()));
        } else if (q.type === 'fill-blank') {
            const correctLower = String(q.answer).toLowerCase().trim();
            const userLower = String(userAns).toLowerCase().trim();
            isCorrect = userLower === correctLower || userLower.includes(correctLower) || correctLower.includes(userLower);
        }

        if (isCorrect) correct++;

        html += `<div class="question-card">
            <div class="question-header">
                <span class="question-number ${isCorrect?'correct':'incorrect'}">Question ${i+1}</span>
                <span class="question-type">${q.type.replace('-', ' ').toUpperCase()}</span>
                <span class="status-indicator ${isCorrect?'status-correct':'status-incorrect'}">
                    ${isCorrect?'✓ Correct':'✗ Incorrect'}
                </span>
            </div>
            <div class="question-text">${q.question}</div>`;

        if (q.type === 'multiple-choice') {
            html += '<ul class="options">';
            q.options.forEach((opt, j) => {
                let cls = '';
                let mark = '';
                if (j === q.correct) {
                    cls = 'correct';
                    mark = ' ✓';
                } else if (j === userAns && !isCorrect) {
                    cls = 'incorrect';
                    mark = ' (Your answer)';
                }
                html += `<li class="option ${cls}"><strong>${String.fromCharCode(65+j)})</strong> ${opt}${mark}</li>`;
            });
            html += '</ul>';
        } else if (q.type === 'true-false') {
            html += `<ul class="options">
                <li class="option ${q.correct===true?'correct':(userAns===true&&!isCorrect?'incorrect':'')}">
                    <strong>True</strong> ${q.correct===true?' ✓':''}${userAns===true&&!isCorrect?' (Your answer)':''}
                </li>
                <li class="option ${q.correct===false?'correct':(userAns===false&&!isCorrect?'incorrect':'')}">
                    <strong>False</strong> ${q.correct===false?' ✓':''}${userAns===false&&!isCorrect?' (Your answer)':''}
                </li>
            </ul>`;
        } else if (q.type === 'short-answer') {
            html += `<div class="answer-review">
                <strong>Your Answer:</strong>
                <div class="answer-box user-answer">${userAns}</div>
                <strong>Sample Answer:</strong>
                <div class="answer-box correct-answer">${q.sampleAnswer || 'See explanation below'}</div>
            </div>`;
        } else if (q.type === 'fill-blank') {
            html += `<div class="answer-review">
                <strong>Your Answer:</strong> <span style="color:${isCorrect?'#28a745':'#dc3545'};font-weight:600">${userAns}</span><br><br>
                <strong>Correct Answer:</strong> <span style="color:#28a745;font-weight:600">${q.answer}</span>
            </div>`;
        }

        html += `<div class="explanation">
            <div class="explanation-title">💡 Explanation:</div>
            <div>${q.explanation}</div>
        </div></div>`;
    });

    const pct = Math.round((correct/currentQuiz.length)*100);
    const scoreHTML = `<div class="score-display">
        <h3>🎉 Quiz Complete!</h3>
        <p style="font-size:1.3rem;margin:10px 0">Score: <strong>${correct} / ${currentQuiz.length}</strong> (${pct}%)</p>
        <p style="font-size:1.1rem">${pct>=90?'🌟 Outstanding!':pct>=80?'🎯 Excellent!':pct>=70?'👍 Good job!':pct>=60?'📚 Keep practicing!':'💪 Review and try again!'}</p>
    </div>`;

    document.getElementById('resultsContainer').innerHTML = scoreHTML + html + `
        <div style="text-align:center;margin-top:30px">
            <button class="btn btn-primary" onclick="retakeQuiz()">🔄 Retake Quiz</button>
            <button class="btn btn-success" onclick="switchTab('generator')">➕ Generate New Quiz</button>
        </div>
    `;
    
    switchTab('results');
}

// Retake quiz
function retakeQuiz() {
    userAnswers = new Array(currentQuiz.length).fill(null);
    displayQuiz();
    switchTab('quiz');
}

// Log initialization
console.log('✅ Quiz Generator Frontend Ready!');
console.log('Server URL:', API_URL);