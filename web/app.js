/**
 * HunterTestPrep Web Application
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('HunterTestPrep loaded');

    // Smooth scrolling for navigation links
    initSmoothScrolling();

    // Initialize any quiz functionality
    initQuizModule();
});

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Quiz Module
 * Handles practice question functionality
 */
function initQuizModule() {
    // Placeholder for quiz initialization
    // Will be expanded when quiz pages are created
}

/**
 * Question class for managing quiz questions
 */
class Question {
    constructor(data) {
        this.id = data.id;
        this.section = data.section;
        this.type = data.type;
        this.text = data.question_text;
        this.options = data.options;
        this.correctAnswer = data.correct_answer;
        this.explanation = data.explanation;
    }

    checkAnswer(selectedAnswer) {
        return selectedAnswer === this.correctAnswer;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'question-container';
        container.innerHTML = `
            <div class="question-text">${this.text}</div>
            <div class="options">
                ${this.options.map(opt => `
                    <label class="option">
                        <input type="radio" name="q${this.id}" value="${opt.label}">
                        <span class="option-label">${opt.label}.</span>
                        <span class="option-text">${opt.text}</span>
                    </label>
                `).join('')}
            </div>
        `;
        return container;
    }
}

/**
 * Quiz class for managing quiz sessions
 */
class Quiz {
    constructor(questions, options = {}) {
        this.questions = questions.map(q => new Question(q));
        this.currentIndex = 0;
        this.answers = {};
        this.timeLimit = options.timeLimit || null;
        this.startTime = null;
        this.shuffled = options.shuffle || false;
    }

    start() {
        this.startTime = new Date();
        if (this.shuffled) {
            this.shuffle();
        }
        this.renderCurrentQuestion();
    }

    shuffle() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    next() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            this.renderCurrentQuestion();
        }
    }

    previous() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.renderCurrentQuestion();
        }
    }

    submit() {
        const results = {
            total: this.questions.length,
            correct: 0,
            incorrect: 0,
            unanswered: 0,
            details: []
        };

        this.questions.forEach((q, i) => {
            const userAnswer = this.answers[q.id];
            const isCorrect = q.checkAnswer(userAnswer);

            if (!userAnswer) {
                results.unanswered++;
            } else if (isCorrect) {
                results.correct++;
            } else {
                results.incorrect++;
            }

            results.details.push({
                question: q,
                userAnswer,
                isCorrect
            });
        });

        results.score = Math.round((results.correct / results.total) * 100);
        return results;
    }

    renderCurrentQuestion() {
        const container = document.getElementById('quiz-container');
        if (!container) return;

        const question = this.questions[this.currentIndex];
        container.innerHTML = '';
        container.appendChild(question.render());

        // Update progress
        this.updateProgress();
    }

    updateProgress() {
        const progress = document.getElementById('quiz-progress');
        if (progress) {
            progress.textContent = `Question ${this.currentIndex + 1} of ${this.questions.length}`;
        }
    }
}

/**
 * Timer class for timed quizzes
 */
class Timer {
    constructor(minutes, onTick, onComplete) {
        this.totalSeconds = minutes * 60;
        this.remainingSeconds = this.totalSeconds;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.intervalId = null;
    }

    start() {
        this.intervalId = setInterval(() => {
            this.remainingSeconds--;

            if (this.onTick) {
                this.onTick(this.formatTime());
            }

            if (this.remainingSeconds <= 0) {
                this.stop();
                if (this.onComplete) {
                    this.onComplete();
                }
            }
        }, 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    pause() {
        this.stop();
    }

    resume() {
        this.start();
    }

    formatTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Question, Quiz, Timer };
}
