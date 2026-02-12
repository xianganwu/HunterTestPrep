/**
 * HunterTestPrep Main Application
 * Handles UI interactions and app state
 */

const app = {
    // State
    currentScreen: 'home',
    currentCategory: null,
    quiz: null,
    results: null,
    progress: new ProgressTracker(),
    writingTimer: null,
    settings: {
        questionCount: 25,
        timeLimit: 60,
        order: 'random',
        showExplanations: 'after'
    },

    // Initialize
    init() {
        this.setupEventListeners();
        this.updateHomeStats();
        console.log('HunterTestPrep initialized');
    },

    setupEventListeners() {
        // Setup button groups
        document.querySelectorAll('.button-group').forEach(group => {
            group.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.updateSetting(group.id, e.target.dataset.value);
                });
            });
        });

        // Writing textarea word count
        const textarea = document.getElementById('writing-response');
        if (textarea) {
            textarea.addEventListener('input', () => {
                const words = textarea.value.trim().split(/\s+/).filter(w => w.length > 0).length;
                document.getElementById('word-count').textContent = words;
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.currentScreen === 'quiz' && !this.quiz?.isPaused) {
                if (e.key === 'ArrowRight') this.nextQuestion();
                if (e.key === 'ArrowLeft') this.prevQuestion();
                if (e.key >= '1' && e.key <= '5') {
                    const options = ['A', 'B', 'C', 'D', 'E'];
                    const index = parseInt(e.key) - 1;
                    if (index < this.quiz.getCurrentQuestion().options.length) {
                        this.selectAnswer(options[index]);
                    }
                }
            }
        });
    },

    updateSetting(groupId, value) {
        switch (groupId) {
            case 'question-count-group':
                this.settings.questionCount = value === 'all' ? 'all' : parseInt(value);
                break;
            case 'time-limit-group':
                this.settings.timeLimit = parseInt(value);
                break;
            case 'order-group':
                this.settings.order = value;
                break;
            case 'explanations-group':
                this.settings.showExplanations = value;
                break;
        }
    },

    // Navigation
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(`${screenId}-screen`).classList.add('active');
        this.currentScreen = screenId;

        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        if (screenId === 'home') {
            document.querySelector('.nav-link[onclick*="showHome"]').classList.add('active');
        } else if (screenId === 'progress') {
            document.querySelector('.nav-link[onclick*="showProgress"]').classList.add('active');
        } else if (screenId === 'resources') {
            document.querySelector('.nav-link[onclick*="showResources"]').classList.add('active');
        }
    },

    showHome() {
        this.showScreen('home');
        this.updateHomeStats();
    },

    showProgress() {
        this.showScreen('progress');
        this.renderProgressScreen();
    },

    showResources() {
        this.showScreen('resources');
    },

    showResults() {
        this.showScreen('results');
    },

    // Quiz Flow
    startQuiz(category) {
        this.currentCategory = category;

        if (category === 'writing') {
            this.showWritingScreen();
            return;
        }

        // Show setup screen
        document.getElementById('setup-title').textContent = this.getCategoryName(category) + ' Practice';
        this.showScreen('setup');
    },

    beginQuiz() {
        const questions = this.getQuestionsForCategory(this.currentCategory);

        if (questions.length === 0) {
            alert('No questions available for this category.');
            this.showHome();
            return;
        }

        // Apply settings
        let selectedQuestions = [...questions];

        if (this.settings.order === 'random') {
            selectedQuestions = this.shuffle(selectedQuestions);
        }

        const count = this.settings.questionCount === 'all'
            ? selectedQuestions.length
            : Math.min(this.settings.questionCount, selectedQuestions.length);

        selectedQuestions = selectedQuestions.slice(0, count);

        // Add category to each question
        selectedQuestions.forEach(q => {
            q.category = q.category || this.currentCategory;
        });

        // Create quiz
        this.quiz = new Quiz(selectedQuestions, {
            timeLimit: this.settings.timeLimit,
            showExplanations: this.settings.showExplanations,
            category: this.currentCategory,
            onTimeUpdate: (time) => this.updateTimerDisplay(time),
            onTimeUp: () => this.handleTimeUp()
        });

        this.quiz.start();
        this.showScreen('quiz');
        this.renderQuizUI();
    },

    getQuestionsForCategory(category) {
        let questions = [];

        switch (category) {
            case 'reading':
                QuestionData.reading.passages.forEach(passage => {
                    passage.questions.forEach(q => {
                        questions.push({
                            ...q,
                            passage: passage.text,
                            passageTitle: passage.title,
                            category: 'reading'
                        });
                    });
                });
                break;

            case 'math':
                questions = QuestionData.math.questions.map(q => ({
                    ...q,
                    category: 'math'
                }));
                break;

            case 'quantitative':
                questions = QuestionData.quantitative.questions.map(q => ({
                    ...q,
                    category: 'quantitative'
                }));
                break;

            case 'full':
                // Mix all categories
                const reading = this.getQuestionsForCategory('reading');
                const math = this.getQuestionsForCategory('math');
                const quant = this.getQuestionsForCategory('quantitative');

                // Take proportional amounts
                questions = [
                    ...this.shuffle(reading).slice(0, 15),
                    ...this.shuffle(math).slice(0, 20),
                    ...this.shuffle(quant).slice(0, 15)
                ];
                questions = this.shuffle(questions);
                break;
        }

        return questions;
    },

    getCategoryName(category) {
        const names = {
            reading: 'Reading Comprehension',
            math: 'Mathematics',
            quantitative: 'Quantitative Reasoning',
            writing: 'Writing Practice',
            full: 'Full Practice Test'
        };
        return names[category] || category;
    },

    // Quiz UI
    renderQuizUI() {
        const question = this.quiz.getCurrentQuestion();
        const progress = this.quiz.getProgress();

        // Update header
        document.getElementById('quiz-category').textContent = this.getCategoryName(question.category);
        document.getElementById('quiz-progress').textContent = `Question ${progress.current} of ${progress.total}`;

        // Update progress bar
        document.getElementById('progress-bar').style.width = `${progress.percentage}%`;

        // Show/hide timer
        const timerEl = document.getElementById('quiz-timer');
        if (this.settings.timeLimit > 0) {
            timerEl.style.display = 'flex';
        } else {
            timerEl.style.display = 'none';
        }

        // Show passage if reading comprehension
        const passageContainer = document.getElementById('passage-container');
        if (question.passage) {
            passageContainer.classList.add('visible');
            document.getElementById('passage-content').innerHTML = `<pre>${question.passage}</pre>`;
        } else {
            passageContainer.classList.remove('visible');
        }

        // Render question
        document.getElementById('question-number').textContent = `Question ${progress.current}`;
        document.getElementById('question-text').textContent = question.text;

        // Render options
        const optionsContainer = document.getElementById('answer-options');
        const userAnswer = this.quiz.getAnswer(question.id);
        const showResult = this.settings.showExplanations === 'after' && userAnswer;

        optionsContainer.innerHTML = question.options.map(opt => {
            let classes = 'answer-option';
            if (userAnswer === opt.label) classes += ' selected';
            if (showResult) {
                classes += ' disabled';
                if (opt.label === question.correct) classes += ' correct';
                else if (userAnswer === opt.label) classes += ' incorrect';
            }

            return `
                <div class="${classes}" onclick="app.selectAnswer('${opt.label}')" data-value="${opt.label}">
                    <span class="answer-letter">${opt.label}</span>
                    <span class="answer-text">${opt.text}</span>
                </div>
            `;
        }).join('');

        // Show/hide explanation
        const explanationContainer = document.getElementById('explanation-container');
        if (showResult && question.explanation) {
            const isCorrect = userAnswer === question.correct;
            explanationContainer.className = `explanation-container visible ${isCorrect ? 'correct' : 'incorrect'}`;
            document.getElementById('explanation-status').textContent = isCorrect ? '✓ Correct!' : '✗ Incorrect';
            document.getElementById('explanation-text').innerHTML = `
                <strong>Answer: ${question.correct}</strong><br>
                ${question.explanation}
            `;
        } else {
            explanationContainer.classList.remove('visible');
        }

        // Update navigation buttons
        document.getElementById('prev-btn').disabled = progress.current === 1;
        const nextBtn = document.getElementById('next-btn');
        if (progress.current === progress.total) {
            nextBtn.innerHTML = 'Finish <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            nextBtn.classList.add('finish');
        } else {
            nextBtn.innerHTML = 'Next <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            nextBtn.classList.remove('finish');
        }

        // Update question dots
        this.renderQuestionDots();
        this.renderNavigatorGrid();
    },

    renderQuestionDots() {
        const container = document.getElementById('question-dots');
        const total = this.quiz.getQuestionCount();
        const current = this.quiz.currentIndex;

        // Only show dots if reasonable number
        if (total <= 20) {
            container.innerHTML = this.quiz.questions.map((q, i) => {
                let classes = 'question-dot';
                if (i === current) classes += ' current';
                else if (this.quiz.isAnswered(q.id)) {
                    if (this.settings.showExplanations === 'after') {
                        classes += this.quiz.getAnswer(q.id) === q.correct ? ' correct' : ' incorrect';
                    } else {
                        classes += ' answered';
                    }
                }
                return `<div class="${classes}"></div>`;
            }).join('');
        } else {
            container.innerHTML = '';
        }
    },

    renderNavigatorGrid() {
        const container = document.getElementById('navigator-grid');
        container.innerHTML = this.quiz.questions.map((q, i) => {
            let classes = 'nav-number';
            if (i === this.quiz.currentIndex) classes += ' current';
            else if (this.quiz.isAnswered(q.id)) {
                if (this.settings.showExplanations === 'after') {
                    classes += this.quiz.getAnswer(q.id) === q.correct ? ' correct' : ' incorrect';
                } else {
                    classes += ' answered';
                }
            }
            return `<button class="${classes}" onclick="app.goToQuestion(${i})">${i + 1}</button>`;
        }).join('');
    },

    selectAnswer(letter) {
        const question = this.quiz.getCurrentQuestion();
        if (this.settings.showExplanations === 'after' && this.quiz.isAnswered(question.id)) {
            return; // Already answered
        }

        this.quiz.submitAnswer(question.id, letter);
        this.renderQuizUI();
    },

    nextQuestion() {
        const progress = this.quiz.getProgress();
        if (progress.current === progress.total) {
            this.finishQuiz();
        } else {
            this.quiz.nextQuestion();
            this.renderQuizUI();
        }
    },

    prevQuestion() {
        this.quiz.prevQuestion();
        this.renderQuizUI();
    },

    goToQuestion(index) {
        this.quiz.goToQuestion(index);
        this.renderQuizUI();
    },

    toggleNavigator() {
        document.getElementById('question-navigator').classList.toggle('expanded');
    },

    togglePassage() {
        document.getElementById('passage-container').classList.toggle('collapsed');
        const btn = document.querySelector('.toggle-passage-btn span');
        btn.textContent = document.getElementById('passage-container').classList.contains('collapsed') ? 'Expand' : 'Collapse';
    },

    togglePause() {
        if (this.quiz.isPaused) {
            this.quiz.resume();
            this.closeModal('pause-modal');
        } else {
            this.quiz.pause();
            this.openModal('pause-modal');
        }
    },

    updateTimerDisplay(time) {
        const display = document.getElementById('timer-display');
        display.textContent = time;

        const timerEl = document.getElementById('quiz-timer');
        const seconds = this.quiz.remainingTime;

        if (seconds <= 60) {
            timerEl.classList.add('danger');
            timerEl.classList.remove('warning');
        } else if (seconds <= 300) {
            timerEl.classList.add('warning');
            timerEl.classList.remove('danger');
        } else {
            timerEl.classList.remove('warning', 'danger');
        }
    },

    handleTimeUp() {
        alert('Time is up!');
        this.finishQuiz();
    },

    endQuiz() {
        this.closeModal('pause-modal');
        this.openModal('confirm-end-modal');
    },

    confirmEndQuiz() {
        this.closeModal('confirm-end-modal');
        this.finishQuiz();
    },

    finishQuiz() {
        this.results = this.quiz.finish();
        this.results.category = this.currentCategory;
        this.progress.addSession(this.results);
        this.showScreen('results');
        this.renderResultsUI();
    },

    // Results UI
    renderResultsUI() {
        const r = this.results;

        // Date
        document.getElementById('results-date').textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Score circle animation
        const scoreCircle = document.getElementById('score-circle');
        const circumference = 2 * Math.PI * 54;
        scoreCircle.style.strokeDasharray = circumference;
        scoreCircle.style.strokeDashoffset = circumference;

        setTimeout(() => {
            const offset = circumference - (r.score / 100) * circumference;
            scoreCircle.style.strokeDashoffset = offset;
        }, 100);

        document.getElementById('score-value').textContent = r.score;

        // Stats
        document.getElementById('result-correct').textContent = r.correct;
        document.getElementById('result-incorrect').textContent = r.incorrect;
        document.getElementById('result-skipped').textContent = r.skipped;

        const mins = Math.floor(r.timeElapsed / 60);
        const secs = r.timeElapsed % 60;
        document.getElementById('result-time').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

        // Category breakdown
        const breakdownContainer = document.getElementById('breakdown-bars');
        const categories = Object.keys(r.categoryBreakdown);

        if (categories.length > 1) {
            document.getElementById('category-breakdown').style.display = 'block';
            breakdownContainer.innerHTML = categories.map(cat => {
                const data = r.categoryBreakdown[cat];
                const percent = Math.round((data.correct / data.total) * 100);
                return `
                    <div class="breakdown-item">
                        <span class="breakdown-label">${this.getCategoryName(cat)}</span>
                        <div class="breakdown-bar">
                            <div class="breakdown-fill ${cat}" style="width: ${percent}%"></div>
                        </div>
                        <span class="breakdown-percent">${percent}%</span>
                    </div>
                `;
            }).join('');
        } else {
            document.getElementById('category-breakdown').style.display = 'none';
        }
    },

    reviewAnswers() {
        this.showScreen('review');
        this.renderReviewList('all');
    },

    filterReview(filter) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.renderReviewList(filter);
    },

    renderReviewList(filter) {
        const container = document.getElementById('review-list');
        let items = this.results.details;

        if (filter === 'incorrect') {
            items = items.filter(item => !item.isCorrect && !item.isSkipped);
        } else if (filter === 'skipped') {
            items = items.filter(item => item.isSkipped);
        }

        container.innerHTML = items.map((item, i) => {
            const q = item.question;
            let statusClass = item.isSkipped ? 'skipped' : (item.isCorrect ? 'correct' : 'incorrect');

            return `
                <div class="review-item ${statusClass}">
                    <div class="review-question">
                        <strong>Question ${item.index + 1}:</strong> ${q.text}
                    </div>
                    <div class="review-answers">
                        ${q.options.map(opt => {
                            let classes = 'review-answer';
                            if (opt.label === item.userAnswer) classes += ' user-selected';
                            if (opt.label === q.correct) classes += ' correct-answer';
                            return `<div class="${classes}"><strong>${opt.label}.</strong> ${opt.text}</div>`;
                        }).join('')}
                    </div>
                    ${q.explanation ? `<div class="review-explanation"><strong>Explanation:</strong> ${q.explanation}</div>` : ''}
                </div>
            `;
        }).join('');

        if (items.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--gray-500);">No questions to display.</p>';
        }
    },

    // Writing Screen
    showWritingScreen() {
        this.showScreen('writing');

        // Populate prompts
        const select = document.getElementById('prompt-select');
        select.innerHTML = QuestionData.writing.prompts.map((p, i) =>
            `<option value="${i}">${p.title}</option>`
        ).join('');

        this.selectPrompt();

        // Initialize timer
        this.writingTimer = new WritingTimer(40,
            (time) => {
                document.getElementById('writing-timer-display').textContent = time;
            },
            () => {
                alert('Time is up! Review your essay.');
            }
        );
    },

    selectPrompt() {
        const index = document.getElementById('prompt-select').value;
        const prompt = QuestionData.writing.prompts[index];

        document.getElementById('writing-prompt').innerHTML = `
            <h3>${prompt.title}</h3>
            <div style="white-space: pre-wrap;">${prompt.text}</div>
        `;

        document.getElementById('sample-essay').innerHTML = `
            <h4>Sample Response</h4>
            <p>${prompt.sampleResponse}</p>
        `;
        document.getElementById('sample-essay').classList.remove('visible');
    },

    toggleWritingTimer() {
        const isRunning = this.writingTimer.toggle();
        document.getElementById('writing-timer-btn').textContent = isRunning ? 'Pause' : 'Start';
    },

    toggleSampleEssay() {
        document.getElementById('sample-essay').classList.toggle('visible');
    },

    // Progress Screen
    renderProgressScreen() {
        const stats = this.progress.getStats();

        // Overall stats
        document.getElementById('progress-stats').innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${stats.totalQuestions}</div>
                    <div class="stat-label">Questions Answered</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${stats.accuracy}%</div>
                    <div class="stat-label">Accuracy</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${stats.streak}</div>
                    <div class="stat-label">Current Streak</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${stats.totalTime}</div>
                    <div class="stat-label">Practice Time</div>
                </div>
            </div>
        `;

        // Category progress
        const catContainer = document.getElementById('category-progress');
        const categories = Object.keys(stats.categoryStats);
        if (categories.length > 0) {
            catContainer.innerHTML = categories.map(cat => {
                const data = stats.categoryStats[cat];
                const percent = Math.round((data.correct / data.total) * 100);
                return `
                    <div class="breakdown-item" style="margin-bottom: 1rem;">
                        <span class="breakdown-label">${this.getCategoryName(cat)}</span>
                        <div class="breakdown-bar">
                            <div class="breakdown-fill ${cat}" style="width: ${percent}%"></div>
                        </div>
                        <span class="breakdown-percent">${percent}%</span>
                    </div>
                `;
            }).join('');
        } else {
            catContainer.innerHTML = '<p style="color: var(--gray-500);">No practice sessions yet.</p>';
        }

        // Session history
        const historyContainer = document.getElementById('session-history');
        if (stats.recentSessions.length > 0) {
            historyContainer.innerHTML = stats.recentSessions.map(s => {
                const date = new Date(s.date).toLocaleDateString();
                return `
                    <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--gray-200);">
                        <span>${this.getCategoryName(s.category)}</span>
                        <span>${s.score}%</span>
                        <span style="color: var(--gray-500);">${date}</span>
                    </div>
                `;
            }).join('');
        } else {
            historyContainer.innerHTML = '<p style="color: var(--gray-500);">No sessions recorded yet.</p>';
        }
    },

    updateHomeStats() {
        const stats = this.progress.getStats();
        document.getElementById('stat-total').textContent = stats.totalQuestions;
        document.getElementById('stat-correct').textContent = `${stats.accuracy}%`;
        document.getElementById('stat-streak').textContent = stats.streak;
        document.getElementById('stat-time').textContent = stats.totalTime || '0m';
    },

    clearProgress() {
        if (confirm('Are you sure you want to clear all progress? This cannot be undone.')) {
            this.progress.clear();
            this.renderProgressScreen();
            this.updateHomeStats();
        }
    },

    // Modals
    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    },

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    },

    // Utilities
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    showTestFormat() {
        alert('Test Format Guide: The HCHS entrance exam includes Reading Comprehension (50 questions, 70 min), Writing Assignment (40 min), Quantitative Reasoning (37 questions, 35 min), and Mathematics Achievement (47 questions, 40 min).');
    },

    showStrategies() {
        alert('Test-Taking Strategies: Answer every question (no guessing penalty), manage your time wisely, read passages carefully, eliminate obviously wrong answers, and review your work if time permits.');
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
