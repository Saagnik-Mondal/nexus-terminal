# NEXUS Terminal - Intelligence Gathering System

A sci-fi themed web application that scrapes real data from the internet and displays it in a cinematic hacking interface. Think Matrix meets OSINT tools.

![NEXUS Terminal](https://img.shields.io/badge/status-active-brightgreen) ![Python](https://img.shields.io/badge/python-3.9+-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## What is this?

Started as a weekend project to make something that looks like the computers from sci-fi movies but actually works. Combines real web scraping with a Matrix-style terminal interface. 

**Features:**
- 🌐 Real-time web scraping from Wikipedia, GitHub, Google News
- 🤖 AI-powered face recognition (age, gender, emotion detection)
- 💾 Persistent database using localStorage
- 🎨 Full sci-fi terminal aesthetic with animations
- 🔒 IP protection with user agent rotation and rate limiting
- 📸 Automatic image downloading and analysis

## Quick Start

```bash
git clone https://github.com/yourusername/nexus-terminal.git
cd nexus-terminal
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 api_server.py
```

Then open `index.html` in your browser. Server runs on `http://localhost:5001`

## Usage

- **Search Database:** Type a name and hit EXECUTE
- **Add Subject:** Click "+ ADD NEW SUBJECT" button
- **Web Scraping:** Click "🌐 WEB SEARCH", enter a famous person's name, select sources

Try searching: Elon Musk, Bill Gates, Tim Cook

## How It Works

**Frontend:** Vanilla JS + Face-api.js for AI face detection  
**Backend:** Flask + BeautifulSoup for web scraping  
**Data Sources:** Wikipedia, GitHub, Google Search, News

## Legal Notice

⚠️ **Educational purposes only.** Respect website ToS, robots.txt, and local laws. I'm not responsible for misuse.

## License

MIT - do whatever you want with it

Made by someone who watched too many sci-fi movies 🚀
