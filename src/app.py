"""
HunterTestPrep Backend Application
Main entry point for the Flask application
"""

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import json
import os
import random

app = Flask(__name__)
CORS(app)

# Configuration
DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
QUESTIONS_FILE = os.path.join(DATA_DIR, 'questions.json')


def load_questions():
    """Load questions from JSON file."""
    if os.path.exists(QUESTIONS_FILE):
        with open(QUESTIONS_FILE, 'r') as f:
            return json.load(f).get('questions', [])
    return []


@app.route('/')
def index():
    """Home page route."""
    return jsonify({
        'name': 'HunterTestPrep API',
        'version': '1.0.0',
        'endpoints': {
            '/api/questions': 'Get all questions',
            '/api/questions/<section>': 'Get questions by section',
            '/api/quiz': 'Generate a quiz',
            '/api/check': 'Check answers'
        }
    })


@app.route('/api/questions')
def get_all_questions():
    """Get all questions."""
    questions = load_questions()
    return jsonify({
        'count': len(questions),
        'questions': questions
    })


@app.route('/api/questions/<section>')
def get_questions_by_section(section):
    """Get questions by section."""
    valid_sections = ['reading_comprehension', 'mathematics',
                      'quantitative_reasoning', 'writing']

    if section not in valid_sections:
        return jsonify({
            'error': f'Invalid section. Valid sections: {", ".join(valid_sections)}'
        }), 400

    questions = load_questions()
    filtered = [q for q in questions if q.get('section') == section]

    return jsonify({
        'section': section,
        'count': len(filtered),
        'questions': filtered
    })


@app.route('/api/quiz', methods=['POST'])
def generate_quiz():
    """Generate a quiz with specified parameters."""
    data = request.json or {}

    section = data.get('section')
    count = data.get('count', 10)
    difficulty = data.get('difficulty')
    shuffle = data.get('shuffle', True)

    questions = load_questions()

    # Filter by section if specified
    if section:
        questions = [q for q in questions if q.get('section') == section]

    # Filter by difficulty if specified
    if difficulty:
        questions = [q for q in questions if q.get('difficulty') == difficulty]

    # Shuffle if requested
    if shuffle:
        random.shuffle(questions)

    # Limit to requested count
    questions = questions[:count]

    # Remove correct answers for the quiz
    quiz_questions = []
    for q in questions:
        quiz_q = q.copy()
        quiz_q.pop('correct_answer', None)
        quiz_q.pop('explanation', None)
        quiz_questions.append(quiz_q)

    return jsonify({
        'count': len(quiz_questions),
        'questions': quiz_questions
    })


@app.route('/api/check', methods=['POST'])
def check_answers():
    """Check submitted answers and return results."""
    data = request.json

    if not data or 'answers' not in data:
        return jsonify({'error': 'No answers provided'}), 400

    answers = data['answers']  # Expected format: {question_id: answer}
    questions = load_questions()

    # Create lookup dictionary
    question_lookup = {q['id']: q for q in questions}

    results = {
        'total': len(answers),
        'correct': 0,
        'incorrect': 0,
        'details': []
    }

    for question_id, user_answer in answers.items():
        question = question_lookup.get(question_id)

        if not question:
            continue

        is_correct = user_answer == question.get('correct_answer')

        if is_correct:
            results['correct'] += 1
        else:
            results['incorrect'] += 1

        results['details'].append({
            'question_id': question_id,
            'user_answer': user_answer,
            'correct_answer': question.get('correct_answer'),
            'is_correct': is_correct,
            'explanation': question.get('explanation', '')
        })

    results['score'] = round((results['correct'] / results['total']) * 100, 1) if results['total'] > 0 else 0

    return jsonify(results)


@app.route('/api/sections')
def get_sections():
    """Get information about all test sections."""
    sections = {
        'reading_comprehension': {
            'name': 'Reading Comprehension',
            'question_count': 50,
            'time_minutes': 70,
            'description': 'Passage-based questions testing comprehension, vocabulary, and inference'
        },
        'mathematics': {
            'name': 'Mathematics Achievement',
            'question_count': 47,
            'time_minutes': 40,
            'description': 'Middle school math including fractions, geometry, and word problems'
        },
        'quantitative_reasoning': {
            'name': 'Quantitative Reasoning',
            'question_count': 37,
            'time_minutes': 35,
            'description': 'Logic, patterns, and quantitative comparisons'
        },
        'writing': {
            'name': 'Writing Assignment',
            'question_count': 1,
            'time_minutes': 40,
            'description': 'Essay or creative writing piece'
        }
    }

    return jsonify(sections)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
