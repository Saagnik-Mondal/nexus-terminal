#!/usr/bin/env python3
"""
Flask API Server for Web Scraping
Provides REST API for the frontend to call real web scraping
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scraper import WebScraper

app = Flask(__name__)
CORS(app)

scraper = WebScraper()

@app.route('/api/scrape', methods=['POST'])
def scrape():
    """Endpoint to scrape person data"""
    try:
        data = request.json
        name = data.get('name')
        sources = data.get('sources', {})
        image_options = data.get('imageOptions', {})
        
        if not name:
            return jsonify({'error': 'Name is required'}), 400
        
        print(f"[API] Scraping request for: {name}")
        
        results = scraper.scrape_person(name, sources, image_options)
        
        return jsonify(results)
    
    except Exception as e:
        print(f"[ERROR] Scraping failed: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Scraper API is running'})

if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1', port=5001, use_reloader=False)
