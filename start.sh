#!/bin/bash

# NEXUS Terminal - Setup Script
# Installs dependencies and starts the web scraping server

echo "=========================================="
echo "NEXUS Terminal - Setup & Launch"
echo "=========================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed!"
    echo "Please install Python 3 from https://www.python.org/"
    exit 1
fi

echo "✓ Python 3 found"
echo ""

# Install Python packages
echo "📦 Installing Python dependencies..."
pip3 install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
    echo ""
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Start the API server
echo "=========================================="
echo "🚀 Starting Web Scraping API Server..."
echo "=========================================="
echo ""
echo "The server will run on http://localhost:5000"
echo "Open index.html in your browser to use the interface"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 api_server.py
