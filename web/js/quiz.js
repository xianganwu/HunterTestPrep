/**
 * HunterTestPrep Quiz Engine
 * Handles quiz logic, timing, and scoring
 */

class Quiz {
    constructor(questions, options = {}) {
        this.questions = questions;
        this.currentIndex = 0;
        this.answers = {};
        this.timeLimit = options.timeLimit || 0; // in minutes, 0 = no limit
        this.remainingTime = this.timeLimit * 60; // in seconds
        this.startTime = null;
        this.endTime = null;
        this.isPaused = false;
        this.timerInterval = null;
        this.showExplanationsAfter = options.showExplanations === 'after';
        this.category = options.category || 'full';
        this.onTimeUpdate = options.onTimeUpdate || (() => {});
        this.onTimeUp = options.onTimeUp || (() => {});
    }

    start() {
        this.startTime = new Date();
        if (this.timeLimit > 0) {
            this.startTimer();
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (!this.isPaused) {
                this.remainingTime--;
                this.onTimeUpdate(this.formatTime(this.remainingTime));

                if (this.remainingTime <= 0) {
                    this.stopTimer();
                    this.onTimeUp();
                }
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    getTimeElapsed() {
        if (!this.startTime) return 0;
        const end = this.endTime || new Date();
        return Math.floor((end - this.startTime) / 1000);
    }

    getCurrentQuestion() {
        return this.questions[this.currentIndex];
    }

    getQuestionCount() {
        return this.questions.length;
    }

    getProgress() {
        return {
            current: this.currentIndex + 1,
            total: this.questions.length,
            percentage: ((this.currentIndex + 1) / this.questions.length) * 100
        };
    }

    goToQuestion(index) {
        if (index >= 0 && index < this.questions.length) {
            this.currentIndex = index;
            return true;
        }
        return false;
    }

    nextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            return true;
        }
        return false;
    }

    prevQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return true;
        }
        return false;
    }

    submitAnswer(questionId, answer) {
        this.answers[questionId] = answer;
    }

    getAnswer(questionId) {
        return this.answers[questionId];
    }

    isAnswered(questionId) {
        return this.answers.hasOwnProperty(questionId);
    }

    checkAnswer(question, answer) {
        return answer === question.correct;
    }

    finish() {
        this.endTime = new Date();
        this.stopTimer();
        return this.calculateResults();
    }

    calculateResults() {
        const results = {
            total: this.questions.length,
            correct: 0,
            incorrect: 0,
            skipped: 0,
            score: 0,
            timeElapsed: this.getTimeElapsed(),
            details: [],
            categoryBreakdown: {}
        };

        this.questions.forEach((question, index) => {
            const userAnswer = this.answers[question.id];
            const isCorrect = userAnswer === question.correct;
            const isSkipped = !userAnswer;

            if (isSkipped) {
                results.skipped++;
            } else if (isCorrect) {
                results.correct++;
            } else {
                results.incorrect++;
            }

            // Track by category
            const category = question.category || this.category;
            if (!results.categoryBreakdown[category]) {
                results.categoryBreakdown[category] = { total: 0, correct: 0 };
            }
            results.categoryBreakdown[category].total++;
            if (isCorrect) {
                results.categoryBreakdown[category].correct++;
            }

            results.details.push({
                index,
                question,
                userAnswer,
                isCorrect,
                isSkipped
            });
        });

        results.score = Math.round((results.correct / results.total) * 100);
        return results;
    }

    getQuestionStatus(questionId) {
        const question = this.questions.find(q => q.id === questionId);
        if (!question) return 'unknown';

        const answer = this.answers[questionId];
        if (!answer) return 'unanswered';

        if (this.showExplanationsAfter) {
            return answer === question.correct ? 'correct' : 'incorrect';
        }
        return 'answered';
    }

    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

/**
 * Timer class for writing practice
 */
class WritingTimer {
    constructor(minutes, onTick, onComplete) {
        this.totalSeconds = minutes * 60;
        this.remainingSeconds = this.totalSeconds;
        this.isRunning = false;
        this.intervalId = null;
        this.onTick = onTick;
        this.onComplete = onComplete;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
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
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    toggle() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
        return this.isRunning;
    }

    reset() {
        this.stop();
        this.remainingSeconds = this.totalSeconds;
        if (this.onTick) {
            this.onTick(this.formatTime());
        }
    }

    formatTime() {
        const mins = Math.floor(this.remainingSeconds / 60);
        const secs = this.remainingSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

/**
 * Progress Tracker - saves progress to localStorage
 */
class ProgressTracker {
    constructor() {
        this.storageKey = 'hunterTestPrep_progress';
        this.load();
    }

    load() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            this.data = JSON.parse(saved);
        } else {
            this.data = {
                totalQuestions: 0,
                totalCorrect: 0,
                totalTime: 0,
                streak: 0,
                sessions: [],
                categoryStats: {}
            };
        }
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    addSession(results) {
        const session = {
            date: new Date().toISOString(),
            category: results.category || 'full',
            total: results.total,
            correct: results.correct,
            score: results.score,
            timeElapsed: results.timeElapsed
        };

        this.data.sessions.unshift(session);
        if (this.data.sessions.length > 50) {
            this.data.sessions = this.data.sessions.slice(0, 50);
        }

        this.data.totalQuestions += results.total;
        this.data.totalCorrect += results.correct;
        this.data.totalTime += results.timeElapsed;

        // Update streak
        if (results.score >= 70) {
            this.data.streak++;
        } else {
            this.data.streak = 0;
        }

        // Update category stats
        Object.keys(results.categoryBreakdown || {}).forEach(cat => {
            if (!this.data.categoryStats[cat]) {
                this.data.categoryStats[cat] = { total: 0, correct: 0 };
            }
            this.data.categoryStats[cat].total += results.categoryBreakdown[cat].total;
            this.data.categoryStats[cat].correct += results.categoryBreakdown[cat].correct;
        });

        this.save();
    }

    getStats() {
        const accuracy = this.data.totalQuestions > 0
            ? Math.round((this.data.totalCorrect / this.data.totalQuestions) * 100)
            : 0;

        const hours = Math.floor(this.data.totalTime / 3600);
        const minutes = Math.floor((this.data.totalTime % 3600) / 60);
        const timeStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

        return {
            totalQuestions: this.data.totalQuestions,
            totalCorrect: this.data.totalCorrect,
            accuracy,
            streak: this.data.streak,
            totalTime: timeStr,
            categoryStats: this.data.categoryStats,
            recentSessions: this.data.sessions.slice(0, 10)
        };
    }

    clear() {
        this.data = {
            totalQuestions: 0,
            totalCorrect: 0,
            totalTime: 0,
            streak: 0,
            sessions: [],
            categoryStats: {}
        };
        this.save();
    }
}

// Export classes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Quiz, WritingTimer, ProgressTracker };
}
