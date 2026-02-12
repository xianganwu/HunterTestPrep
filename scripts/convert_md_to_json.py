#!/usr/bin/env python3
"""
Convert Markdown question files to JSON format for the quiz application.

Usage:
    python convert_md_to_json.py <input_dir> <output_file>

Example:
    python convert_md_to_json.py ../questions ../data/questions.json
"""

import os
import re
import json
import argparse
from pathlib import Path


def parse_multiple_choice_question(text: str) -> dict:
    """Parse a multiple choice question from markdown format."""
    question = {
        'type': 'multiple_choice',
        'options': []
    }

    lines = text.strip().split('\n')

    # Extract question number and text
    question_match = re.match(r'###\s*Question\s*(\d+)', lines[0])
    if question_match:
        question['id'] = question_match.group(1)

    # Find question text (lines after header, before options)
    question_lines = []
    option_start = -1

    for i, line in enumerate(lines[1:], 1):
        if re.match(r'\([A-E]\)', line.strip()):
            option_start = i
            break
        elif line.strip() and not line.startswith('---'):
            question_lines.append(line.strip())

    question['question_text'] = ' '.join(question_lines)

    # Extract options
    if option_start > 0:
        for line in lines[option_start:]:
            option_match = re.match(r'\(([A-E])\)\s*(.+)', line.strip())
            if option_match:
                question['options'].append({
                    'label': option_match.group(1),
                    'text': option_match.group(2)
                })

    return question


def parse_markdown_file(filepath: Path, section: str) -> list:
    """Parse a markdown file and extract all questions."""
    questions = []

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by question headers
    question_blocks = re.split(r'(?=###\s*Question\s*\d+)', content)

    for block in question_blocks:
        if block.strip() and '### Question' in block:
            try:
                q = parse_multiple_choice_question(block)
                q['section'] = section
                q['source_file'] = filepath.name
                questions.append(q)
            except Exception as e:
                print(f"Error parsing question in {filepath}: {e}")

    return questions


def get_section_from_path(filepath: Path) -> str:
    """Determine section from file path."""
    path_str = str(filepath).lower()

    if 'reading' in path_str:
        return 'reading_comprehension'
    elif 'math' in path_str and 'quant' not in path_str:
        return 'mathematics'
    elif 'quant' in path_str:
        return 'quantitative_reasoning'
    elif 'writ' in path_str:
        return 'writing'

    return 'unknown'


def convert_directory(input_dir: str, output_file: str):
    """Convert all markdown files in directory to JSON."""
    input_path = Path(input_dir)
    all_questions = []

    # Process all markdown files
    for md_file in input_path.rglob('*.md'):
        if 'answers' in md_file.name.lower():
            continue  # Skip answer files

        section = get_section_from_path(md_file)
        questions = parse_markdown_file(md_file, section)
        all_questions.extend(questions)

        print(f"Processed {md_file.name}: {len(questions)} questions")

    # Write output
    output_data = {
        'version': '1.0',
        'total_questions': len(all_questions),
        'questions': all_questions
    }

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2)

    print(f"\nTotal: {len(all_questions)} questions written to {output_file}")


def main():
    parser = argparse.ArgumentParser(
        description='Convert markdown questions to JSON format'
    )
    parser.add_argument('input_dir', help='Directory containing markdown files')
    parser.add_argument('output_file', help='Output JSON file path')

    args = parser.parse_args()

    convert_directory(args.input_dir, args.output_file)


if __name__ == '__main__':
    main()
