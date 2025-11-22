// Loading Screen Animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContainer = document.getElementById('mainContainer');
    const loadingStatus = document.getElementById('loadingStatus');
    
    const steps = [
        { id: 'step1', text: 'ESTABLISHING ENCRYPTED CHANNEL...', delay: 300 },
        { id: 'step2', text: 'VERIFYING BIOMETRIC CREDENTIALS...', delay: 800 },
        { id: 'step3', text: 'LOADING DATABASE MODULES...', delay: 1300 },
        { id: 'step4', text: 'SYNCHRONIZING NEURAL INTERFACE...', delay: 1800 },
        { id: 'step5', text: 'ACCESSING MAINFRAME...', delay: 2300 }
    ];
    
    const statusMessages = [
        { text: 'INITIALIZING SECURE CONNECTION...', delay: 0 },
        { text: 'ENCRYPTING DATA STREAM...', delay: 1000 },
        { text: 'AUTHENTICATING USER...', delay: 2000 },
        { text: 'LOADING SYSTEM MODULES...', delay: 3000 },
        { text: 'ACCESS GRANTED - WELCOME', delay: 3800 }
    ];
    
    // Animate loading steps
    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepElement = document.getElementById(step.id);
            stepElement.classList.add('active');
        }, step.delay);
    });
    
    // Update status messages
    statusMessages.forEach((message) => {
        setTimeout(() => {
            loadingStatus.textContent = message.text;
        }, message.delay);
    });
    
    // Hide loading screen and show main content
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContainer.style.display = 'block';
        document.body.style.overflow = 'auto';
    }, 4500);
});
