#!/bin/bash
# HunterTestPrep Installation Script

echo "==================================="
echo "HunterTestPrep Installation"
echo "==================================="

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required but not installed."
    exit 1
fi

echo "Python 3 found: $(python3 --version)"

# Create virtual environment
echo ""
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo ""
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Convert questions to JSON
echo ""
echo "Converting questions to JSON..."
python scripts/convert_md_to_json.py questions data/questions.json

echo ""
echo "==================================="
echo "Installation complete!"
echo ""
echo "To start the application:"
echo "  1. Activate the virtual environment:"
echo "     source venv/bin/activate"
echo "  2. Run the server:"
echo "     python src/app.py"
echo "  3. Open http://localhost:5000 in your browser"
echo "==================================="
