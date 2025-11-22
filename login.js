const loginForm = document.getElementById('loginForm');
const loginStatus = document.getElementById('loginStatus');

const credentials = {
    admin: { password: 'admin123', role: 'ADMINISTRATOR', level: 'LEVEL 9 - OMEGA CLEARANCE' },
    user: { password: 'user123', role: 'STANDARD USER', level: 'LEVEL 3 - RESTRICTED' }
};

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;
    
    loginStatus.textContent = 'AUTHENTICATING...';
    loginStatus.style.color = '#00d4ff';
    
    setTimeout(() => {
        if (credentials[username] && credentials[username].password === password) {
            loginStatus.textContent = 'ACCESS GRANTED';
            loginStatus.style.color = '#00ff41';
            
            sessionStorage.setItem('userRole', userType);
            sessionStorage.setItem('username', username.toUpperCase());
            sessionStorage.setItem('clearanceLevel', credentials[username].level);
            sessionStorage.setItem('authenticated', 'true');
            
            const accessLogs = JSON.parse(localStorage.getItem('accessLogs') || '[]');
            accessLogs.push({
                timestamp: new Date().toISOString(),
                user: username.toUpperCase(),
                ip: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
                location: 'LOCAL',
                action: 'LOGIN',
                status: 'SUCCESS'
            });
            localStorage.setItem('accessLogs', JSON.stringify(accessLogs));
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            loginStatus.textContent = 'ACCESS DENIED - INVALID CREDENTIALS';
            loginStatus.style.color = '#ff0040';
            
            const accessLogs = JSON.parse(localStorage.getItem('accessLogs') || '[]');
            accessLogs.push({
                timestamp: new Date().toISOString(),
                user: username.toUpperCase(),
                ip: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
                location: 'UNKNOWN',
                action: 'FAILED_LOGIN',
                status: 'BLOCKED'
            });
            localStorage.setItem('accessLogs', JSON.stringify(accessLogs));
            
            document.getElementById('password').value = '';
            
            setTimeout(() => {
                loginStatus.textContent = '';
            }, 3000);
        }
    }, 1500);
});
