#!/usr/bin/env python3
"""
Web scraper for the NEXUS terminal project
Pulls data from Wikipedia, GitHub, Google, etc.
Built this to make the frontend actually useful instead of just looking cool
"""

import requests
from bs4 import BeautifulSoup
import json
import re
from urllib.parse import quote_plus, urljoin
import time
from datetime import datetime
import base64
from io import BytesIO
import random

class WebScraper:
    def __init__(self):
        # rotate through different user agents so we don't look like a bot
        # grabbed these from my actual browsers lol
        self.user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
        ]
        
        self.session = requests.Session()
        self.rotate_headers()
        
        # wait a bit between requests so we don't hammer the servers
        self.request_delay = 1  
        self.last_request_time = 0
    
    def rotate_headers(self):
        """Rotate user agent and headers to avoid detection"""
        self.session.headers.update({
            'User-Agent': random.choice(self.user_agents),
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Cache-Control': 'max-age=0'
        })
    
    def safe_request(self, url, timeout=10):
        """Make a safe request with rate limiting and error handling"""
        # Rate limiting
        elapsed = time.time() - self.last_request_time
        if elapsed < self.request_delay:
            time.sleep(self.request_delay - elapsed)
        
        # Rotate headers for each request
        self.rotate_headers()
        
        try:
            response = self.session.get(url, timeout=timeout)
            self.last_request_time = time.time()
            return response
        except Exception as e:
            print(f"[WARNING] Request failed: {e}")
            return None
    
    def scrape_person(self, name, sources, image_options):
        """Main scraping function"""
        results = {
            'name': name,
            'sources': [],
            'personal': {},
            'contact': {},
            'social': {},
            'additional': [],
            'images': []
        }
        
        print(f"[SCRAPER] Starting search for: {name}")
        
        # Search Google for the person
        if sources.get('news', False):
            google_data = self.search_google(name)
            results['additional'].extend(google_data['snippets'])
            results['sources'].append('Google Search')
        
        # Search Wikipedia
        wiki_data = self.search_wikipedia(name)
        if wiki_data:
            results['personal'].update(wiki_data['personal'])
            results['additional'].extend(wiki_data['facts'])
            results['sources'].append('Wikipedia')
            if image_options.get('scrapeImages') and wiki_data.get('image'):
                results['images'].append(wiki_data['image'])
        
        # Search GitHub (if developer)
        if sources.get('publicrecords', False):
            github_data = self.search_github(name)
            if github_data:
                results['social']['github'] = github_data['profile']
                results['additional'].extend(github_data['info'])
                results['sources'].append('GitHub')
        
        # Search for images
        if image_options.get('scrapeImages') or image_options.get('scrapeAllImages'):
            count = 12 if image_options.get('scrapeAllImages') else 4
            images = self.scrape_images(name, count)
            results['images'].extend(images)
        
        # Search social media mentions (Twitter/X via nitter)
        if sources.get('twitter', False):
            twitter_data = self.search_twitter(name)
            if twitter_data:
                results['additional'].extend(twitter_data)
                results['sources'].append('Twitter/X')
        
        # Search LinkedIn (public profiles only)
        if sources.get('linkedin', False):
            linkedin_data = self.search_linkedin(name)
            if linkedin_data:
                results['personal'].update(linkedin_data)
                results['sources'].append('LinkedIn')
        
        # Search news articles
        news_data = self.search_news(name)
        if news_data:
            results['additional'].extend(news_data)
            if 'News Articles' not in results['sources']:
                results['sources'].append('News Articles')
        
        return results
    
    def search_google(self, query):
        """Search Google for basic information"""
        try:
            url = f"https://www.google.com/search?q={quote_plus(query)}"
            response = self.safe_request(url)
            if not response:
                return {'snippets': []}
            soup = BeautifulSoup(response.text, 'html.parser')
            
            snippets = []
            for result in soup.select('.g')[:5]:
                snippet = result.select_one('.VwiC3b')
                if snippet:
                    snippets.append(snippet.get_text()[:200])
            
            return {'snippets': snippets}
        except Exception as e:
            print(f"[ERROR] Google search failed: {e}")
            return {'snippets': []}
    
    def search_wikipedia(self, name):
        """Search Wikipedia for person"""
        try:
            # Wikipedia API search
            search_url = f"https://en.wikipedia.org/w/api.php?action=opensearch&search={quote_plus(name)}&limit=1&format=json"
            response = self.safe_request(search_url)
            if not response:
                return None
            search_results = response.json()
            
            if not search_results[1]:
                return None
            
            page_title = search_results[1][0]
            page_url = search_results[3][0]
            
            # Get page content
            content_url = f"https://en.wikipedia.org/w/api.php?action=query&titles={quote_plus(page_title)}&prop=extracts|pageimages&exintro=1&explaintext=1&piprop=original&format=json"
            response = self.safe_request(content_url)
            data = response.json()
            
            page = list(data['query']['pages'].values())[0]
            extract = page.get('extract', '')
            
            # Parse basic info from extract
            personal = {}
            facts = []
            
            # Extract birth year, nationality, occupation from first paragraph
            lines = extract.split('\n')
            if lines:
                first_para = lines[0]
                facts.append(f"Wikipedia: {first_para[:200]}...")
                
                # Try to extract birth year
                birth_match = re.search(r'\b(19|20)\d{2}\b', first_para)
                if birth_match:
                    birth_year = int(birth_match.group())
                    personal['age'] = datetime.now().year - birth_year
                
                # Try to find occupation
                occupations = ['actor', 'singer', 'politician', 'scientist', 'engineer', 
                             'developer', 'entrepreneur', 'CEO', 'founder', 'author', 'artist']
                for occ in occupations:
                    if occ.lower() in first_para.lower():
                        personal['occupation'] = occ.title()
                        break
            
            # Get image if available
            image = None
            if 'original' in page:
                image = {
                    'url': page['original']['source'],
                    'source': 'Wikipedia',
                    'timestamp': datetime.now().strftime('%Y-%m-%d'),
                    'description': 'Wikipedia Profile Image'
                }
            
            return {
                'personal': personal,
                'facts': facts,
                'image': image,
                'url': page_url
            }
        except Exception as e:
            print(f"[ERROR] Wikipedia search failed: {e}")
            return None
    
    def search_github(self, name):
        """Search GitHub for user"""
        try:
            # Search GitHub users
            url = f"https://api.github.com/search/users?q={quote_plus(name)}&per_page=1"
            response = self.safe_request(url)
            data = response.json()
            
            if not data.get('items'):
                return None
            
            user = data['items'][0]
            username = user['login']
            
            # Get user details
            user_url = f"https://api.github.com/users/{username}"
            response = self.safe_request(user_url)
            user_data = response.json()
            
            info = []
            if user_data.get('name'):
                info.append(f"GitHub: {user_data['name']}")
            if user_data.get('bio'):
                info.append(f"Bio: {user_data['bio']}")
            if user_data.get('company'):
                info.append(f"Company: {user_data['company']}")
            if user_data.get('location'):
                info.append(f"Location: {user_data['location']}")
            if user_data.get('public_repos'):
                info.append(f"{user_data['public_repos']} public repositories")
            if user_data.get('followers'):
                info.append(f"{user_data['followers']} GitHub followers")
            
            return {
                'profile': f"github.com/{username}",
                'info': info,
                'avatar': user_data.get('avatar_url')
            }
        except Exception as e:
            print(f"[ERROR] GitHub search failed: {e}")
            return None
    
    def search_twitter(self, name):
        """Search for Twitter mentions (using Nitter public instance)"""
        try:
            # Use Nitter (Twitter frontend) for public data
            url = f"https://nitter.net/search?f=tweets&q={quote_plus(name)}"
            response = self.safe_request(url)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            mentions = []
            tweets = soup.select('.timeline-item')[:3]
            for tweet in tweets:
                content = tweet.select_one('.tweet-content')
                if content:
                    mentions.append(f"Twitter mention: {content.get_text()[:150]}...")
            
            return mentions
        except Exception as e:
            print(f"[ERROR] Twitter search failed: {e}")
            return []
    
    def search_linkedin(self, name):
        """Search for LinkedIn public profile (limited without API)"""
        try:
            # Google search for LinkedIn profiles
            url = f"https://www.google.com/search?q=site:linkedin.com+{quote_plus(name)}"
            response = self.safe_request(url)
            if not response:
                return {}
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Try to extract basic info from search results
            results = {}
            for result in soup.select('.g')[:1]:
                text = result.get_text()
                # Look for job titles
                if 'at' in text.lower():
                    parts = text.split('at')
                    if len(parts) > 1:
                        results['company'] = parts[1].split('-')[0].strip()[:50]
            
            return results
        except Exception as e:
            print(f"[ERROR] LinkedIn search failed: {e}")
            return {}
    
    def search_news(self, name):
        """Search for news articles"""
        try:
            # Use Google News
            url = f"https://news.google.com/search?q={quote_plus(name)}"
            response = self.safe_request(url)
            if not response:
                return []
            soup = BeautifulSoup(response.text, 'html.parser')
            
            news = []
            articles = soup.select('article')[:3]
            for article in articles:
                title = article.select_one('h3, h4')
                if title:
                    news.append(f"News: {title.get_text()[:150]}")
            
            return news
        except Exception as e:
            print(f"[ERROR] News search failed: {e}")
            return []
    
    def scrape_images(self, name, count=4):
        """Scrape images from various sources"""
        images = []
        
        try:
            # DuckDuckGo Images (no API key needed)
            url = f"https://duckduckgo.com/?q={quote_plus(name)}&iax=images&ia=images"
            response = self.safe_request(url)
            
            # Since DDG uses JavaScript, we'll use alternative sources
            # Google Images via search
            google_url = f"https://www.google.com/search?q={quote_plus(name)}+photo&tbm=isch"
            response = self.safe_request(google_url)
            if not response:
                return []
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract image URLs
            img_tags = soup.find_all('img')[:count]
            for i, img in enumerate(img_tags):
                src = img.get('src') or img.get('data-src')
                if src and src.startswith('http'):
                    images.append({
                        'url': src,
                        'source': 'Google Images',
                        'timestamp': datetime.now().strftime('%Y-%m-%d'),
                        'description': f'Image {i+1} from web search'
                    })
            
            # Fallback to public avatar APIs if no images found
            if len(images) < count:
                for i in range(count - len(images)):
                    images.append({
                        'url': f"https://i.pravatar.cc/400?img={hash(name + str(i)) % 70}",
                        'source': 'Avatar API',
                        'timestamp': datetime.now().strftime('%Y-%m-%d'),
                        'description': 'Profile Image'
                    })
        
        except Exception as e:
            print(f"[ERROR] Image scraping failed: {e}")
            # Fallback images
            for i in range(count):
                images.append({
                    'url': f"https://i.pravatar.cc/400?img={hash(name + str(i)) % 70}",
                    'source': 'Fallback',
                    'timestamp': datetime.now().strftime('%Y-%m-%d'),
                    'description': 'Profile Image'
                })
        
        return images


def main():
    """CLI interface for testing"""
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python scraper.py <name>")
        sys.exit(1)
    
    name = ' '.join(sys.argv[1:])
    
    scraper = WebScraper()
    sources = {
        'linkedin': True,
        'twitter': True,
        'news': True,
        'publicrecords': True
    }
    image_options = {
        'scrapeImages': True,
        'scrapeAllImages': False,
        'facialRecognition': False
    }
    
    results = scraper.scrape_person(name, sources, image_options)
    print(json.dumps(results, indent=2))


if __name__ == '__main__':
    main()
