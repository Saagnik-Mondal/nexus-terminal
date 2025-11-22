console.log('=== SCRIPT LOADING ===');

if (!sessionStorage.getItem('authenticated')) {
    window.location.href = 'login.html';
}

const userRole = sessionStorage.getItem('userRole');
const userName = sessionStorage.getItem('username');
const clearanceLevel = sessionStorage.getItem('clearanceLevel');

function loadDatabase() {
    const stored = localStorage.getItem('nexusDatabase');
    if (stored) {
        return JSON.parse(stored);
    }
    return getDefaultDatabase();
}

function saveDatabase(db) {
    localStorage.setItem('nexusDatabase', JSON.stringify(db));
}

function getDefaultDatabase() {
    return [
        {
            name: "John Matrix",
            status: "ACTIVE",
            id: "USG-4782-ALPHA",
            age: "34",
        nationality: "UNITED STATES",
        occupation: "CYBER SECURITY SPECIALIST",
        bloodType: "O+",
        city: "NEW YORK",
        address: "1247 CYBER AVENUE, MANHATTAN",
        coordinates: "40.7128° N, 74.0060° W",
        email: "j.matrix@encrypted.mil",
        phone: "+1-555-CLASSIFIED",
        encryptedId: "A7F9-2B4C-8E1D-3G5H",
        clearanceLevel: "LEVEL 5 - TOP SECRET",
        threatLevel: "LOW",
        lastAccess: "2045.11.20 14:23:41",
        dnaHash: "9A2F8C4E1B7D3A5F",
        retinalScan: "VERIFIED",
        fingerprint: "MATCH CONFIRMED",
        activities: [
            { time: "14:23:41", text: "ACCESS GRANTED: MAINFRAME DATABASE" },
            { time: "14:15:02", text: "BIOMETRIC SCAN COMPLETED" },
            { time: "13:45:18", text: "ENCRYPTION KEY VALIDATED" },
            { time: "12:30:55", text: "SECURE CONNECTION ESTABLISHED" },
            { time: "11:22:09", text: "LOGIN ATTEMPT FROM IP: 192.168.1.45" }
        ]
    },
    {
        name: "Sarah Connor",
        status: "UNDER SURVEILLANCE",
        id: "TRM-9453-BETA",
        age: "29",
        nationality: "CANADA",
        occupation: "AI RESEARCHER",
        bloodType: "AB-",
        city: "TORONTO",
        address: "8923 QUANTUM STREET, DOWNTOWN",
        coordinates: "43.6532° N, 79.3832° W",
        email: "s.connor@skynet.ca",
        phone: "+1-416-555-0199",
        encryptedId: "B3E6-9D2A-7F4C-1H8K",
        clearanceLevel: "LEVEL 4 - SECRET",
        threatLevel: "MEDIUM",
        lastAccess: "2045.11.21 22:18:33",
        dnaHash: "7F3E9A1C5B2D8F4A",
        retinalScan: "VERIFIED",
        fingerprint: "MATCH CONFIRMED",
        activities: [
            { time: "22:18:33", text: "ACCESSED NEURAL NETWORK FILES" },
            { time: "21:45:12", text: "UNUSUAL NETWORK ACTIVITY DETECTED" },
            { time: "20:30:44", text: "QUANTUM ENCRYPTION BYPASS ATTEMPT" },
            { time: "19:15:22", text: "SECURE CHANNEL ESTABLISHED" },
            { time: "18:05:01", text: "MULTIPLE LOGIN ATTEMPTS LOGGED" }
        ]
    },
    {
        name: "Marcus Kane",
        status: "ACTIVE",
        id: "NEX-7821-GAMMA",
        age: "42",
        nationality: "UNITED KINGDOM",
        occupation: "INTELLIGENCE ANALYST",
        bloodType: "A+",
        city: "LONDON",
        address: "4156 CIPHER LANE, WESTMINSTER",
        coordinates: "51.5074° N, 0.1278° W",
        email: "m.kane@mi6.gov.uk",
        phone: "+44-207-555-ENCRYPTED",
        encryptedId: "C9K2-4M7P-5N8R-2T6V",
        clearanceLevel: "LEVEL 6 - COSMIC TOP SECRET",
        threatLevel: "LOW",
        lastAccess: "2045.11.22 08:42:17",
        dnaHash: "3D8F2A9E7C1B5F4D",
        retinalScan: "VERIFIED",
        fingerprint: "MATCH CONFIRMED",
        activities: [
            { time: "08:42:17", text: "DECRYPTION PROTOCOL INITIATED" },
            { time: "08:15:33", text: "CLASSIFIED FILES ACCESSED" },
            { time: "07:50:29", text: "SATELLITE LINK ESTABLISHED" },
            { time: "07:22:44", text: "QUANTUM AUTHENTICATION SUCCESS" },
            { time: "06:45:11", text: "SECURE VAULT OPENED" }
        ]
    },
    {
        name: "Akira Tanaka",
        status: "ACTIVE",
        id: "JPX-3347-DELTA",
        age: "31",
        nationality: "JAPAN",
        occupation: "NETWORK ARCHITECT",
        bloodType: "B+",
        city: "TOKYO",
        address: "2718 NEON DISTRICT, SHIBUYA",
        coordinates: "35.6762° N, 139.6503° E",
        email: "a.tanaka@corp.tokyo.jp",
        phone: "+81-3-5555-ENCRYPTED",
        encryptedId: "D4W8-7X3Z-9Y2B-6C5F",
        clearanceLevel: "LEVEL 5 - TOP SECRET",
        threatLevel: "LOW",
        lastAccess: "2045.11.22 15:30:52",
        dnaHash: "8B5A3F9D2E7C1A4F",
        retinalScan: "VERIFIED",
        fingerprint: "MATCH CONFIRMED",
        activities: [
            { time: "15:30:52", text: "MAINFRAME SYNCHRONIZATION COMPLETE" },
            { time: "14:55:18", text: "FIREWALL UPDATE DEPLOYED" },
            { time: "13:42:05", text: "NETWORK SCAN PERFORMED" },
            { time: "12:18:37", text: "INTRUSION DETECTION ACTIVE" },
            { time: "11:05:22", text: "SYSTEM DIAGNOSTICS RUN" }
        ]
    },
    {
        name: "Viktor Volkov",
        status: "WATCHLIST",
        id: "RUS-6629-EPSILON",
        age: "38",
        nationality: "RUSSIA",
        occupation: "CRYPTOGRAPHER",
        bloodType: "O-",
        city: "MOSCOW",
        address: "9812 RED SQUARE DISTRICT",
        coordinates: "55.7558° N, 37.6173° E",
        email: "v.volkov@classified.ru",
        phone: "+7-495-555-ENCRYPTED",
        encryptedId: "E8J4-2K9M-7P3Q-5R1S",
        clearanceLevel: "LEVEL 3 - CONFIDENTIAL",
        threatLevel: "HIGH",
        lastAccess: "2045.11.19 03:27:44",
        dnaHash: "2E9C7F4A8D3B1E6C",
        retinalScan: "PENDING VERIFICATION",
        fingerprint: "PARTIAL MATCH",
        activities: [
            { time: "03:27:44", text: "UNAUTHORIZED ACCESS ATTEMPT BLOCKED" },
            { time: "02:45:19", text: "SUSPICIOUS PACKET ACTIVITY" },
            { time: "01:33:52", text: "ENCRYPTION BREACH DETECTED" },
            { time: "00:18:25", text: "MULTIPLE FAILED LOGIN ATTEMPTS" },
            { time: "23:55:07", text: "ALERT: ANOMALOUS BEHAVIOR LOGGED" }
        ]
    },
    {
        name: "Elena Rodriguez",
        status: "ACTIVE",
        id: "ESP-4491-ZETA",
        age: "27",
        nationality: "SPAIN",
        occupation: "DATA SCIENTIST",
        bloodType: "A-",
        city: "BARCELONA",
        address: "5534 DIGITAL BOULEVARD, EIXAMPLE",
        coordinates: "41.3851° N, 2.1734° E",
        email: "e.rodriguez@quantum.es",
        phone: "+34-93-555-ENCRYPTED",
        encryptedId: "F2V7-8W4X-3Y9Z-1A6B",
        clearanceLevel: "LEVEL 4 - SECRET",
        threatLevel: "LOW",
        lastAccess: "2045.11.21 16:55:29",
        dnaHash: "5C3A9F7E2D8B4F1A",
        retinalScan: "VERIFIED",
        fingerprint: "MATCH CONFIRMED",
        activities: [
            { time: "16:55:29", text: "BIG DATA ANALYSIS COMPLETED" },
            { time: "15:42:13", text: "MACHINE LEARNING MODEL UPDATED" },
            { time: "14:28:47", text: "DATABASE QUERY EXECUTED" },
            { time: "13:10:33", text: "NEURAL NETWORK TRAINING STARTED" },
            { time: "12:05:18", text: "DATA ENCRYPTION VERIFIED" }
        ]
    }
];
}

// Initialize database
let database = loadDatabase();

// grabbed all these when page loads - probably could be cleaner but it works
let searchInput, searchBtn, searchStats, resultsSection, noResults, clearBtn;
let systemTime, addNewBtn, addFormSection, addPersonForm, cancelAddBtn, cancelFormBtn;
let dbCount, webScrapeBtn, webScrapeSection, cancelScrapeBtn, cancelScrapeFormBtn;
let webScrapeForm, scrapeProgress, scrapeLogs, scrapeProgressBar, scrapeResults;
let scrapeResultsContent, saveScrapeBtn, discardScrapeBtn, imageGallery;
let imageGalleryContent, imageCount, imageModal, modalImage, closeModal;

let scrapedData = null;
let scrapedImages = [];

function init() {
    searchInput = document.getElementById('searchInput');
    searchBtn = document.getElementById('searchBtn');
    searchStats = document.getElementById('searchStats');
    resultsSection = document.getElementById('resultsSection');
    noResults = document.getElementById('noResults');
    clearBtn = document.getElementById('clearBtn');
    systemTime = document.getElementById('systemTime');
    addNewBtn = document.getElementById('addNewBtn');
    addFormSection = document.getElementById('addFormSection');
    addPersonForm = document.getElementById('addPersonForm');
    cancelAddBtn = document.getElementById('cancelAddBtn');
    cancelFormBtn = document.getElementById('cancelFormBtn');
    dbCount = document.getElementById('dbCount');
    webScrapeBtn = document.getElementById('webScrapeBtn');
    webScrapeSection = document.getElementById('webScrapeSection');
    cancelScrapeBtn = document.getElementById('cancelScrapeBtn');
    cancelScrapeFormBtn = document.getElementById('cancelScrapeFormBtn');
    webScrapeForm = document.getElementById('webScrapeForm');
    scrapeProgress = document.getElementById('scrapeProgress');
    scrapeLogs = document.getElementById('scrapeLogs');
    scrapeProgressBar = document.getElementById('scrapeProgressBar');
    scrapeResults = document.getElementById('scrapeResults');
    scrapeResultsContent = document.getElementById('scrapeResultsContent');
    saveScrapeBtn = document.getElementById('saveScrapeBtn');
    discardScrapeBtn = document.getElementById('discardScrapeBtn');
    imageGallery = document.getElementById('imageGallery');
    imageGalleryContent = document.getElementById('imageGalleryContent');
    imageCount = document.getElementById('imageCount');
    imageModal = document.getElementById('imageModal');
    modalImage = document.getElementById('modalImage');
    closeModal = document.getElementById('closeModal');
    
    document.getElementById('userName').textContent = `USER: ${userName}`;
    document.getElementById('userRole').textContent = clearanceLevel;
    
    if (userRole === 'admin') {
        addNewBtn.style.display = 'inline-block';
        webScrapeBtn.style.display = 'inline-block';
        document.getElementById('adminTerminalBtn').style.display = 'inline-block';
    }
    
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    const adminTerminalBtn = document.getElementById('adminTerminalBtn');
    if (adminTerminalBtn) {
        adminTerminalBtn.addEventListener('click', () => {
            window.location.href = 'admin-terminal.html';
        });
    }
    
    updateDatabaseCount();
    updateTime();
    setInterval(updateTime, 1000);
    
    searchBtn.addEventListener('click', performSearch);
    addNewBtn.addEventListener('click', showAddForm);
    cancelAddBtn.addEventListener('click', hideAddForm);
    cancelFormBtn.addEventListener('click', hideAddForm);
    addPersonForm.addEventListener('submit', handleAddPerson);
    
    if (webScrapeBtn) {
        webScrapeBtn.addEventListener('click', () => {
            console.log('Web scrape button clicked!');
            showWebScrape();
        });
    } else {
        console.error('webScrapeBtn not found!');
    }
    
    cancelScrapeBtn.addEventListener('click', hideWebScrape);
    cancelScrapeFormBtn.addEventListener('click', hideWebScrape);
    webScrapeForm.addEventListener('submit', handleWebScrape);
    saveScrapeBtn.addEventListener('click', saveScrapeData);
    discardScrapeBtn.addEventListener('click', discardScrapeData);
    closeModal.addEventListener('click', () => imageModal.classList.remove('active'));
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) imageModal.classList.remove('active');
    });
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    clearBtn.addEventListener('click', clearResults);
    
    // Add typing effect
    searchInput.addEventListener('input', () => {
        playSound('type');
    });
}

// Update system time
function updateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    systemTime.textContent = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

// Update database count
function updateDatabaseCount() {
    dbCount.textContent = database.length;
}

// Show add form
function showAddForm() {
    addFormSection.style.display = 'block';
    resultsSection.style.display = 'none';
    noResults.style.display = 'none';
    addFormSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hide add form
function hideAddForm() {
    addFormSection.style.display = 'none';
    addPersonForm.reset();
}

// Show web scrape section
function showWebScrape() {
    webScrapeSection.style.display = 'block';
    addFormSection.style.display = 'none';
    resultsSection.style.display = 'none';
    noResults.style.display = 'none';
    scrapeProgress.style.display = 'none';
    scrapeResults.style.display = 'none';
    webScrapeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hide web scrape section
function hideWebScrape() {
    webScrapeSection.style.display = 'none';
    webScrapeForm.reset();
    scrapeProgress.style.display = 'none';
    scrapeResults.style.display = 'none';
    scrapedData = null;
}

// Simulate web scraping with realistic data
async function handleWebScrape(e) {
    e.preventDefault();
    
    const query = document.getElementById('scrapeQuery').value;
    const sources = {
        wikipedia: document.querySelector('[name="wikipedia"]').checked,
        github: document.querySelector('[name="github"]').checked,
        twitter: document.querySelector('[name="twitter"]').checked,
        linkedin: document.querySelector('[name="linkedin"]').checked,
        news: document.querySelector('[name="news"]').checked,
        google: document.querySelector('[name="google"]').checked
    };
    
    const imageOptions = {
        scrapeImages: document.querySelector('[name="scrapeImages"]').checked,
        scrapeAllImages: document.querySelector('[name="scrapeAllImages"]').checked,
        facialRecognition: document.querySelector('[name="facialRecognition"]').checked
    };
    
    // Show progress
    scrapeProgress.style.display = 'block';
    scrapeResults.style.display = 'none';
    scrapeLogs.innerHTML = '';
    scrapeProgressBar.style.width = '0%';
    scrapedImages = [];
    
    // Check if API server is available
    const useRealScraping = await checkAPIServer();
    
    if (useRealScraping) {
        await performRealWebScraping(query, sources, imageOptions);
    } else {
        addLog('[WARNING] ERROR: API Server not running', false, 0);
        addLog('Please start the server:', false, 300);
        addLog('cd "/Volumes/X9 Pro/Project0" && ./venv/bin/python3 api_server.py &', false, 600);
        setTimeout(() => {
            scrapeResults.style.display = 'none';
        }, 3000);
    }
}

// Check if API server is running
async function checkAPIServer() {
    try {
        const response = await fetch('http://localhost:5001/api/health', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Perform REAL web scraping using backend API
async function performRealWebScraping(query, sources, imageOptions) {
    addLog('[WEB] REAL WEB SCRAPING ACTIVATED', true, 0);
    addLog('Connecting to scraping server...', true, 300);
    
    try {
        addLog('Sending scraping request...', true, 600);
        
        const response = await fetch('http://localhost:5001/api/scrape', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: query,
                sources: sources,
                imageOptions: imageOptions
            })
        });
        
        if (!response.ok) {
            throw new Error('Scraping failed');
        }
        
        addLog('[OK] Receiving data from web...', true, 900);
        const data = await response.json();
        
        addLog(`[OK] Found data from: ${data.sources.join(', ')}`, true, 1200);
        addLog('Processing intelligence...', true, 1500);
        
        // Convert API response to our format
        scrapedData = convertAPIDataToFormat(data, query);
        scrapedImages = data.images || [];
        
        addLog(`[OK] ${scrapedImages.length} images downloaded`, true, 1800);
        addLog('[OK] REAL SCRAPING COMPLETE', true, 2100);
        
        scrapeProgressBar.style.width = '100%';
        
        setTimeout(() => {
            scrapeProgress.style.display = 'none';
            displayScrapedData(scrapedData);
            if (scrapedImages.length > 0) {
                displayImageGallery();
            }
            scrapeResults.style.display = 'block';
        }, 2500);
        
    } catch (error) {
        addLog('[WARNING] ERROR: Real scraping failed - ' + error.message, false, 0);
        addLog('Check API server is running on port 5001', false, 300);
    }
}

// Convert API data format to our display format
function convertAPIDataToFormat(apiData, originalQuery) {
    return {
        name: apiData.name || originalQuery,
        sources: apiData.sources,
        personal: {
            age: apiData.personal.age || Math.floor(Math.random() * 30 + 25),
            location: apiData.personal.location || 'Unknown',
            occupation: apiData.personal.occupation || 'Unknown',
            company: apiData.personal.company || 'Unknown',
            education: apiData.personal.education || 'Unknown'
        },
        contact: {
            email: apiData.contact.email || `${originalQuery.toLowerCase().replace(' ', '.')}@email.com`,
            phone: apiData.contact.phone || 'Not found',
            website: apiData.contact.website || 'Not found'
        },
        social: apiData.social || {},
        additional: apiData.additional || []
    };
}

// Helper function to add log entry
function addLog(text, isSuccess, delay) {
    setTimeout(() => {
        const logEntry = document.createElement('div');
        logEntry.className = `progress-log-entry ${isSuccess ? 'success' : 'error'}`;
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
        scrapeLogs.appendChild(logEntry);
        scrapeLogs.scrollTop = scrapeLogs.scrollHeight;
    }, delay);
}

// Display scraped data
function displayScrapedData(data) {
    let html = `
        <div class="scraped-data-section">
            <h4>SOURCES: ${data.sources.join(', ')}</h4>
        </div>
        
        <div class="scraped-data-section">
            <h4>PERSONAL INFORMATION</h4>
            <div class="scraped-item">
                <span class="label">NAME:</span>
                <span class="value">${data.name}</span>
            </div>
            <div class="scraped-item">
                <span class="label">AGE:</span>
                <span class="value">${data.personal.age}</span>
            </div>
            <div class="scraped-item">
                <span class="label">LOCATION:</span>
                <span class="value">${data.personal.location}</span>
            </div>
            <div class="scraped-item">
                <span class="label">OCCUPATION:</span>
                <span class="value">${data.personal.occupation}</span>
            </div>
            <div class="scraped-item">
                <span class="label">COMPANY:</span>
                <span class="value">${data.personal.company}</span>
            </div>
            <div class="scraped-item">
                <span class="label">EDUCATION:</span>
                <span class="value">${data.personal.education}</span>
            </div>
        </div>
        
        <div class="scraped-data-section">
            <h4>CONTACT INFORMATION</h4>
            <div class="scraped-item">
                <span class="label">EMAIL:</span>
                <span class="value">${data.contact.email}</span>
            </div>
            <div class="scraped-item">
                <span class="label">PHONE:</span>
                <span class="value">${data.contact.phone}</span>
            </div>
            <div class="scraped-item">
                <span class="label">WEBSITE:</span>
                <span class="value">${data.contact.website}</span>
            </div>
        </div>
    `;
    
    if (Object.keys(data.social).length > 0) {
        html += `<div class="scraped-data-section"><h4>SOCIAL MEDIA PROFILES</h4>`;
        for (const [platform, handle] of Object.entries(data.social)) {
            html += `
                <div class="scraped-item">
                    <span class="label">${platform.toUpperCase()}:</span>
                    <span class="value">${handle}</span>
                </div>
            `;
        }
        html += `</div>`;
    }
    
    if (data.additional.length > 0) {
        html += `<div class="scraped-data-section"><h4>ADDITIONAL INTELLIGENCE</h4>`;
        data.additional.forEach(item => {
            html += `<div class="scraped-item"><span class="value">• ${item}</span></div>`;
        });
        html += `</div>`;
    }
    
    scrapeResultsContent.innerHTML = html;
}

// Save scraped data to database
function saveScrapeData() {
    if (!scrapedData) return;
    
    // Check if already exists
    const exists = database.find(p => p.name.toUpperCase() === scrapedData.name.toUpperCase());
    if (exists) {
        if (!confirm(`Subject "${scrapedData.name}" already exists. Overwrite?`)) {
            return;
        }
        // Remove existing
        database = database.filter(p => p.name.toUpperCase() !== scrapedData.name.toUpperCase());
    }
    
    // Convert scraped data to database format
    const lat = (Math.random() * 180 - 90).toFixed(4);
    const lon = (Math.random() * 360 - 180).toFixed(4);
    const latDir = lat >= 0 ? 'N' : 'S';
    const lonDir = lon >= 0 ? 'E' : 'W';
    
    const newPerson = {
        name: scrapedData.name,
        status: 'ACTIVE',
        id: generateId(),
        age: scrapedData.personal.age.toString(),
        nationality: 'UNITED STATES',
        occupation: scrapedData.personal.occupation.toUpperCase(),
        bloodType: 'UNKNOWN',
        city: scrapedData.personal.location.toUpperCase(),
        address: `${scrapedData.personal.company.toUpperCase()} HEADQUARTERS`,
        coordinates: `${Math.abs(lat)}° ${latDir}, ${Math.abs(lon)}° ${lonDir}`,
        email: scrapedData.contact.email,
        phone: scrapedData.contact.phone,
        encryptedId: generateEncryptedId(),
        clearanceLevel: 'LEVEL 3 - CONFIDENTIAL',
        threatLevel: 'LOW',
        lastAccess: getCurrentTimestamp(),
        dnaHash: generateDNAHash(),
        retinalScan: 'PENDING VERIFICATION',
        fingerprint: 'PENDING VERIFICATION',
        profileImage: scrapedImages.length > 0 ? scrapedImages[0].url : null,
        images: scrapedImages,
        activities: [
            { time: new Date().toLocaleTimeString('en-US', { hour12: false }), text: `DATA SCRAPED FROM: ${scrapedData.sources.join(', ')}` },
            { time: new Date(Date.now() - 300000).toLocaleTimeString('en-US', { hour12: false }), text: `${scrapedImages.length} IMAGES DOWNLOADED AND STORED` },
            { time: new Date(Date.now() - 600000).toLocaleTimeString('en-US', { hour12: false }), text: 'WEB INTELLIGENCE GATHERED' },
            { time: new Date(Date.now() - 900000).toLocaleTimeString('en-US', { hour12: false }), text: 'SOCIAL MEDIA ANALYSIS COMPLETED' },
            { time: new Date(Date.now() - 1200000).toLocaleTimeString('en-US', { hour12: false }), text: 'PROFILE CREATED FROM WEB DATA' }
        ]
    };
    
    database.push(newPerson);
    saveDatabase(database);
    updateDatabaseCount();
    
    searchStats.textContent = `[OK] INTELLIGENCE ON "${newPerson.name}" SAVED TO DATABASE`;
    searchStats.style.color = 'var(--primary-color)';
    
    hideWebScrape();
    displayResult(newPerson);
}

// Discard scraped data
function discardScrapeData() {
    scrapedData = null;
    scrapedImages = [];
    hideWebScrape();
    searchStats.textContent = `SCRAPING OPERATION CANCELLED`;
    searchStats.style.color = 'var(--text-muted)';
}

// Open image in modal
function openImageModal(url) {
    modalImage.src = url;
    imageModal.classList.add('active');
}

// Display image gallery
function displayImageGallery() {
    imageGallery.style.display = 'block';
    imageCount.textContent = scrapedImages.length;
    
    imageGalleryContent.innerHTML = scrapedImages.map((img, index) => `
        <div class="gallery-item" onclick="openImageModal('${img.url}', ${index})">
            <img src="${img.url}" alt="${img.description}" onerror="this.src='https://via.placeholder.com/400x400/0a0e27/00ff41?text=IMAGE'" id="gallery-img-${index}" crossorigin="anonymous">
            <div class="gallery-item-overlay">
                <div><strong>${img.source}</strong></div>
                <div>${img.description}</div>
                <div>${img.timestamp}</div>
                <div id="face-analysis-${index}" class="face-analysis" style="margin-top:5px;font-size:11px;color:#00ff41;">
                    <span class="analyzing">[SCAN] AI ANALYZING...</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Start face analysis on all images
    setTimeout(() => analyzeFacesInGallery(), 1000);
}

// Open image in modal
function openImageModal(url, index) {
    modalImage.src = url;
    imageModal.classList.add('active');
}

// Analyze faces in all gallery images using face-api.js
async function analyzeFacesInGallery() {
    if (typeof faceapi === 'undefined') {
        console.log('Face-api.js not loaded yet');
        return;
    }
    
    try {
        // Load models (only once)
        if (!window.faceapiModelsLoaded) {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model'),
                faceapi.nets.ageGenderNet.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model'),
                faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model')
            ]);
            window.faceapiModelsLoaded = true;
        }
        
        // Analyze each image
        for (let i = 0; i < Math.min(scrapedImages.length, 12); i++) {
            const imgElement = document.getElementById(`gallery-img-${i}`);
            const analysisDiv = document.getElementById(`face-analysis-${i}`);
            
            if (!imgElement || !analysisDiv) continue;
            
            try {
                const detections = await faceapi
                    .detectSingleFace(imgElement, new faceapi.TinyFaceDetectorOptions())
                    .withAgeAndGender()
                    .withFaceExpressions();
                
                if (detections) {
                    const age = Math.round(detections.age);
                    const gender = detections.gender;
                    const genderProb = Math.round(detections.genderProbability * 100);
                    const expressions = detections.expressions;
                    const topEmotion = Object.keys(expressions).reduce((a, b) => 
                        expressions[a] > expressions[b] ? a : b
                    );
                    const emotionProb = Math.round(expressions[topEmotion] * 100);
                    
                    analysisDiv.innerHTML = `[OK] AGE: ~${age} | ${gender.toUpperCase()} (${genderProb}%) | ${topEmotion.toUpperCase()} (${emotionProb}%)`;
                    analysisDiv.style.color = '#00ff41';
                } else {
                    analysisDiv.innerHTML = '[WARNING] NO FACE DETECTED';
                    analysisDiv.style.color = '#ff9500';
                }
            } catch (err) {
                analysisDiv.innerHTML = '[WARNING] ANALYSIS FAILED';
                analysisDiv.style.color = '#ff4136';
            }
        }
    } catch (error) {
        console.error('Face analysis error:', error);
    }
}

// Make openImageModal available globally for onclick handlers
window.openImageModal = openImageModal;

// Generate unique ID
function generateId() {
    const prefixes = ['USG', 'TRM', 'NEX', 'JPX', 'RUS', 'ESP', 'GBR', 'FRA', 'IND', 'CHN'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const numbers = Math.floor(1000 + Math.random() * 9000);
    const suffixes = ['ALPHA', 'BETA', 'GAMMA', 'DELTA', 'EPSILON', 'ZETA', 'ETA', 'THETA'];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${prefix}-${numbers}-${suffix}`;
}

// Generate encrypted ID
function generateEncryptedId() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const parts = [];
    for (let i = 0; i < 4; i++) {
        let part = '';
        for (let j = 0; j < 4; j++) {
            part += chars[Math.floor(Math.random() * chars.length)];
        }
        parts.push(part);
    }
    return parts.join('-');
}

// Generate DNA hash
function generateDNAHash() {
    const chars = '0123456789ABCDEF';
    let hash = '';
    for (let i = 0; i < 16; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
}

// Get current timestamp
function getCurrentTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

// Handle add person form submission
function handleAddPerson(e) {
    e.preventDefault();
    
    const formData = new FormData(addPersonForm);
    const name = formData.get('name').toUpperCase();
    
    // Check if person already exists
    const exists = database.find(p => p.name.toUpperCase() === name);
    if (exists) {
        alert('[WARNING] ERROR: SUBJECT ALREADY EXISTS IN DATABASE');
        return;
    }
    
    // Generate coordinates (random for demo)
    const lat = (Math.random() * 180 - 90).toFixed(4);
    const lon = (Math.random() * 360 - 180).toFixed(4);
    const latDir = lat >= 0 ? 'N' : 'S';
    const lonDir = lon >= 0 ? 'E' : 'W';
    
    const newPerson = {
        name: formData.get('name'),
        status: formData.get('status'),
        id: generateId(),
        age: formData.get('age'),
        nationality: formData.get('nationality').toUpperCase(),
        occupation: formData.get('occupation').toUpperCase(),
        bloodType: formData.get('bloodType') || 'UNKNOWN',
        city: formData.get('city').toUpperCase(),
        address: formData.get('address').toUpperCase() || 'CLASSIFIED',
        coordinates: `${Math.abs(lat)}° ${latDir}, ${Math.abs(lon)}° ${lonDir}`,
        email: formData.get('email').toLowerCase(),
        phone: formData.get('phone') || 'CLASSIFIED',
        encryptedId: generateEncryptedId(),
        clearanceLevel: formData.get('clearanceLevel') || 'LEVEL 1 - BASIC',
        threatLevel: formData.get('threatLevel') || 'LOW',
        lastAccess: getCurrentTimestamp(),
        dnaHash: generateDNAHash(),
        retinalScan: 'VERIFIED',
        fingerprint: 'MATCH CONFIRMED',
        activities: [
            { time: new Date().toLocaleTimeString('en-US', { hour12: false }), text: 'SUBJECT ADDED TO DATABASE' },
            { time: new Date(Date.now() - 300000).toLocaleTimeString('en-US', { hour12: false }), text: 'BIOMETRIC DATA COLLECTED' },
            { time: new Date(Date.now() - 600000).toLocaleTimeString('en-US', { hour12: false }), text: 'INITIAL SCREENING COMPLETED' },
            { time: new Date(Date.now() - 900000).toLocaleTimeString('en-US', { hour12: false }), text: 'BACKGROUND CHECK INITIATED' },
            { time: new Date(Date.now() - 1200000).toLocaleTimeString('en-US', { hour12: false }), text: 'PROFILE CREATION STARTED' }
        ]
    };
    
    // Add to database
    database.push(newPerson);
    saveDatabase(database);
    updateDatabaseCount();
    
    // Show success message
    searchStats.textContent = `[OK] SUBJECT "${newPerson.name}" SUCCESSFULLY ADDED TO DATABASE`;
    searchStats.style.color = 'var(--primary-color)';
    
    // Hide form and show the new person
    hideAddForm();
    displayResult(newPerson);
    
    // Reset search input
    searchInput.value = '';
}

// Perform search
function performSearch() {
    const query = searchInput.value.trim().toUpperCase();
    
    if (!query) {
        searchStats.textContent = 'ERROR: QUERY CANNOT BE EMPTY';
        searchStats.style.color = 'var(--danger-color)';
        return;
    }
    
    // Hide other sections
    hideAddForm();
    hideWebScrape();
    
    // Show searching animation
    searchStats.textContent = 'SCANNING DATABASE...';
    searchStats.style.color = 'var(--text-secondary)';
    searchBtn.disabled = true;
    searchInput.disabled = true;
    
    // Simulate search delay
    setTimeout(() => {
        const result = database.find(person => 
            person.name.toUpperCase().includes(query)
        );
        
        if (result) {
            displayResult(result);
            searchStats.textContent = `MATCH FOUND - 1 RECORD RETRIEVED IN 0.${Math.floor(Math.random() * 900) + 100}s`;
            searchStats.style.color = 'var(--primary-color)';
        } else {
            showNoResults();
            searchStats.textContent = `NO MATCHES FOUND FOR "${query}"`;
            searchStats.style.color = 'var(--danger-color)';
        }
        
        searchBtn.disabled = false;
        searchInput.disabled = false;
    }, 1500);
}

// Display search result
function displayResult(person) {
    // Hide no results, show results section
    noResults.style.display = 'none';
    resultsSection.style.display = 'block';
    
    // Populate profile data
    const profileImageEl = document.getElementById('profileImage');
    if (person.profileImage) {
        profileImageEl.innerHTML = `<img src="${person.profileImage}" alt="${person.name}" onerror="this.style.display='none'; this.parentElement.textContent='${person.name.charAt(0)}'">`;
    } else {
        profileImageEl.textContent = person.name.charAt(0);
    }
    document.getElementById('profileName').textContent = person.name;
    document.getElementById('profileStatus').textContent = person.status;
    document.getElementById('profileId').textContent = person.id;
    
    // Set status color
    const statusElement = document.getElementById('profileStatus');
    if (person.status.includes('WATCHLIST') || person.status.includes('SURVEILLANCE')) {
        statusElement.style.color = 'var(--danger-color)';
    } else {
        statusElement.style.color = 'var(--primary-color)';
    }
    
    // Populate personal data
    document.getElementById('age').textContent = person.age;
    document.getElementById('nationality').textContent = person.nationality;
    document.getElementById('occupation').textContent = person.occupation;
    document.getElementById('bloodType').textContent = person.bloodType;
    
    // Populate location data
    document.getElementById('city').textContent = person.city;
    document.getElementById('address').textContent = person.address;
    document.getElementById('coordinates').textContent = person.coordinates;
    
    // Populate contact info
    document.getElementById('email').textContent = person.email;
    document.getElementById('phone').textContent = person.phone;
    document.getElementById('encryptedId').textContent = person.encryptedId;
    
    // Populate security clearance
    document.getElementById('clearanceLevel').textContent = person.clearanceLevel;
    document.getElementById('threatLevel').textContent = person.threatLevel;
    
    // Set threat level color
    const threatElement = document.getElementById('threatLevel');
    if (person.threatLevel === 'HIGH') {
        threatElement.style.color = 'var(--danger-color)';
    } else if (person.threatLevel === 'MEDIUM') {
        threatElement.style.color = '#ffaa00';
    } else {
        threatElement.style.color = 'var(--primary-color)';
    }
    
    document.getElementById('lastAccess').textContent = person.lastAccess;
    
    // Populate biometric data
    document.getElementById('dnaHash').textContent = person.dnaHash;
    document.getElementById('retinalScan').textContent = person.retinalScan;
    document.getElementById('fingerprint').textContent = person.fingerprint;
    
    // Populate activity log
    const activityLog = document.getElementById('activityLog');
    activityLog.innerHTML = '';
    person.activities.forEach((activity, index) => {
        setTimeout(() => {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.innerHTML = `
                <span class="log-time">[${activity.time}]</span>
                <span class="log-text">${activity.text}</span>
            `;
            activityLog.appendChild(logEntry);
        }, index * 200);
    });
    
    // Scroll to results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// Show no results
function showNoResults() {
    resultsSection.style.display = 'none';
    noResults.style.display = 'flex';
}

// Clear results
function clearResults() {
    resultsSection.style.display = 'none';
    noResults.style.display = 'none';
    addFormSection.style.display = 'none';
    webScrapeSection.style.display = 'none';
    searchInput.value = '';
    searchStats.textContent = `DATABASE CONTAINS ${database.length} RECORDS`;
    searchStats.style.color = 'var(--text-muted)';
    searchInput.focus();
    
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

function playSound(type) {
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    init();
});
