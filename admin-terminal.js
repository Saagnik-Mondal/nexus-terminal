if (!sessionStorage.getItem('authenticated') || sessionStorage.getItem('userRole') !== 'admin') {
    window.location.href = 'login.html';
}

const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');
const systemTime = document.getElementById('systemTime');
const userName = sessionStorage.getItem('username');

let commandHistory = [];
let historyIndex = -1;
let accessLogs = JSON.parse(localStorage.getItem('accessLogs') || '[]');

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

updateTime();
setInterval(updateTime, 1000);

document.getElementById('userName').textContent = `USER: ${userName}`;
document.getElementById('backToMainBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
});

function addOutput(text, type = 'normal') {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    if (type === 'error') {
        line.innerHTML = `<span class="terminal-prompt error">ERROR</span><span class="terminal-text error">${text}</span>`;
    } else if (type === 'success') {
        line.innerHTML = `<span class="terminal-prompt success">SUCCESS</span><span class="terminal-text success">${text}</span>`;
    } else if (type === 'warning') {
        line.innerHTML = `<span class="terminal-prompt warning">WARNING</span><span class="terminal-text warning">${text}</span>`;
    } else if (type === 'data') {
        line.innerHTML = `<span class="terminal-text data">${text}</span>`;
    } else {
        line.innerHTML = `<span class="terminal-prompt">NEXUS@ADMIN</span><span class="terminal-text">${text}</span>`;
    }
    
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function addTable(headers, rows) {
    const table = document.createElement('div');
    table.className = 'terminal-table';
    
    const headerRow = document.createElement('div');
    headerRow.className = 'table-row table-header';
    headers.forEach(h => {
        const cell = document.createElement('div');
        cell.className = 'table-cell';
        cell.textContent = h;
        headerRow.appendChild(cell);
    });
    table.appendChild(headerRow);
    
    rows.forEach(row => {
        const rowEl = document.createElement('div');
        rowEl.className = 'table-row';
        row.forEach(cell => {
            const cellEl = document.createElement('div');
            cellEl.className = 'table-cell';
            cellEl.textContent = cell;
            rowEl.appendChild(cellEl);
        });
        table.appendChild(rowEl);
    });
    
    terminalOutput.appendChild(table);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function getDatabase() {
    return JSON.parse(localStorage.getItem('nexusDatabase') || '[]');
}

function saveDatabase(db) {
    localStorage.setItem('nexusDatabase', JSON.stringify(db));
}

function getRandomIP() {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

function initAccessLogs() {
    if (accessLogs.length === 0) {
        const locations = ['NEW YORK', 'LONDON', 'TOKYO', 'MOSCOW', 'BERLIN', 'PARIS', 'BEIJING'];
        const actions = ['LOGIN', 'SEARCH', 'VIEW_RECORD', 'LOGOUT', 'FAILED_LOGIN'];
        
        for (let i = 0; i < 15; i++) {
            const timestamp = new Date(Date.now() - Math.random() * 86400000 * 7).toISOString();
            accessLogs.push({
                timestamp: timestamp,
                user: Math.random() > 0.5 ? 'ADMIN' : 'USER',
                ip: getRandomIP(),
                location: locations[Math.floor(Math.random() * locations.length)],
                action: actions[Math.floor(Math.random() * actions.length)],
                status: Math.random() > 0.1 ? 'SUCCESS' : 'BLOCKED'
            });
        }
        localStorage.setItem('accessLogs', JSON.stringify(accessLogs));
    }
}

initAccessLogs();

const commands = {
    help: () => {
        addOutput('Available commands:', 'normal');
        addOutput('', 'normal');
        addOutput('SYSTEM COMMANDS:', 'data');
        addOutput('  help                  - Display this help menu', 'data');
        addOutput('  clear                 - Clear terminal screen', 'data');
        addOutput('  exit                  - Return to main interface', 'data');
        addOutput('  version               - Display system version', 'data');
        addOutput('', 'normal');
        addOutput('DATABASE COMMANDS:', 'data');
        addOutput('  ls                    - List all database records', 'data');
        addOutput('  ls --count            - Show total record count', 'data');
        addOutput('  users                 - Display all users in database', 'data');
        addOutput('  user <name>           - Search for specific user', 'data');
        addOutput('  stats                 - Show database statistics', 'data');
        addOutput('  delete <id>           - Delete record by ID', 'data');
        addOutput('  purge --all           - Delete all records (requires confirmation)', 'data');
        addOutput('', 'normal');
        addOutput('ACCESS CONTROL:', 'data');
        addOutput('  sessions              - Show active sessions', 'data');
        addOutput('  logs                  - Display access logs', 'data');
        addOutput('  logs --ip             - Show access by IP address', 'data');
        addOutput('  logs --failed         - Show failed login attempts', 'data');
        addOutput('  trace <ip>            - Trace IP address location', 'data');
        addOutput('', 'normal');
    },
    
    clear: () => {
        terminalOutput.innerHTML = '';
    },
    
    exit: () => {
        addOutput('Closing admin terminal...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    },
    
    version: () => {
        addOutput('NEXUS Command Interface v3.7.2', 'data');
        addOutput('Build: ALPHA-2045.11.23', 'data');
        addOutput('Encryption: QUANTUM-256', 'data');
        addOutput('Database Engine: NEXUS-CORE v12.4', 'data');
    },
    
    ls: (args) => {
        const db = getDatabase();
        
        if (args.includes('--count')) {
            addOutput(`Total records in database: ${db.length}`, 'success');
            return;
        }
        
        addOutput(`Listing ${db.length} database records:`, 'normal');
        addOutput('', 'normal');
        
        const headers = ['ID', 'NAME', 'STATUS', 'CLEARANCE', 'LAST ACCESS'];
        const rows = db.map(person => [
            person.id,
            person.name.substring(0, 20),
            person.status,
            person.clearanceLevel.split(' - ')[0],
            person.lastAccess
        ]);
        
        addTable(headers, rows);
    },
    
    users: () => {
        const db = getDatabase();
        addOutput(`Found ${db.length} users in database:`, 'normal');
        addOutput('', 'normal');
        
        db.forEach((person, index) => {
            addOutput(`[${index + 1}] ${person.name} - ${person.status} - ${person.occupation}`, 'data');
        });
    },
    
    user: (args) => {
        if (args.length === 0) {
            addOutput('Usage: user <name>', 'error');
            return;
        }
        
        const searchName = args.join(' ').toUpperCase();
        const db = getDatabase();
        const results = db.filter(p => p.name.toUpperCase().includes(searchName));
        
        if (results.length === 0) {
            addOutput(`No records found for: ${searchName}`, 'error');
            return;
        }
        
        addOutput(`Found ${results.length} matching record(s):`, 'success');
        addOutput('', 'normal');
        
        results.forEach(person => {
            addOutput('================================', 'data');
            addOutput(`ID: ${person.id}`, 'data');
            addOutput(`NAME: ${person.name}`, 'data');
            addOutput(`STATUS: ${person.status}`, 'data');
            addOutput(`AGE: ${person.age}`, 'data');
            addOutput(`NATIONALITY: ${person.nationality}`, 'data');
            addOutput(`OCCUPATION: ${person.occupation}`, 'data');
            addOutput(`LOCATION: ${person.city}`, 'data');
            addOutput(`EMAIL: ${person.email}`, 'data');
            addOutput(`CLEARANCE: ${person.clearanceLevel}`, 'data');
            addOutput(`THREAT LEVEL: ${person.threatLevel}`, 'data');
            addOutput(`LAST ACCESS: ${person.lastAccess}`, 'data');
            addOutput('================================', 'data');
        });
    },
    
    stats: () => {
        const db = getDatabase();
        const statuses = {};
        const threats = {};
        const nationalities = {};
        
        db.forEach(person => {
            statuses[person.status] = (statuses[person.status] || 0) + 1;
            threats[person.threatLevel] = (threats[person.threatLevel] || 0) + 1;
            nationalities[person.nationality] = (nationalities[person.nationality] || 0) + 1;
        });
        
        addOutput('DATABASE STATISTICS:', 'normal');
        addOutput('', 'normal');
        addOutput(`Total Records: ${db.length}`, 'data');
        addOutput('', 'normal');
        addOutput('STATUS BREAKDOWN:', 'data');
        Object.entries(statuses).forEach(([status, count]) => {
            addOutput(`  ${status}: ${count}`, 'data');
        });
        addOutput('', 'normal');
        addOutput('THREAT LEVEL ANALYSIS:', 'data');
        Object.entries(threats).forEach(([threat, count]) => {
            addOutput(`  ${threat}: ${count}`, 'data');
        });
        addOutput('', 'normal');
        addOutput('TOP NATIONALITIES:', 'data');
        Object.entries(nationalities)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .forEach(([nat, count]) => {
                addOutput(`  ${nat}: ${count}`, 'data');
            });
    },
    
    delete: (args) => {
        if (args.length === 0) {
            addOutput('Usage: delete <id>', 'error');
            return;
        }
        
        const id = args[0].toUpperCase();
        const db = getDatabase();
        const index = db.findIndex(p => p.id === id);
        
        if (index === -1) {
            addOutput(`Record not found: ${id}`, 'error');
            return;
        }
        
        const person = db[index];
        db.splice(index, 1);
        saveDatabase(db);
        
        addOutput(`Record deleted: ${person.name} (${id})`, 'success');
        addOutput('Database updated.', 'success');
    },
    
    purge: (args) => {
        if (!args.includes('--all')) {
            addOutput('Usage: purge --all', 'error');
            addOutput('WARNING: This will delete ALL database records!', 'warning');
            return;
        }
        
        const db = getDatabase();
        const count = db.length;
        
        addOutput('PURGE OPERATION INITIATED', 'warning');
        addOutput(`This will delete ${count} records permanently.`, 'warning');
        addOutput('Type "purge --confirm" to proceed.', 'warning');
        
        if (args.includes('--confirm')) {
            saveDatabase([]);
            addOutput(`${count} records purged from database.`, 'success');
            addOutput('Database reset complete.', 'success');
        }
    },
    
    sessions: () => {
        const currentSession = {
            user: userName,
            role: 'ADMINISTRATOR',
            ip: getRandomIP(),
            location: 'LOCAL',
            loginTime: new Date().toISOString(),
            status: 'ACTIVE'
        };
        
        addOutput('ACTIVE SESSIONS:', 'normal');
        addOutput('', 'normal');
        
        const headers = ['USER', 'ROLE', 'IP ADDRESS', 'LOCATION', 'STATUS'];
        const rows = [[
            currentSession.user,
            currentSession.role,
            currentSession.ip,
            currentSession.location,
            currentSession.status
        ]];
        
        addTable(headers, rows);
    },
    
    logs: (args) => {
        if (args.includes('--failed')) {
            const failed = accessLogs.filter(log => log.action === 'FAILED_LOGIN' || log.status === 'BLOCKED');
            addOutput(`FAILED ACCESS ATTEMPTS: ${failed.length}`, 'warning');
            addOutput('', 'normal');
            
            const headers = ['TIMESTAMP', 'USER', 'IP ADDRESS', 'LOCATION', 'STATUS'];
            const rows = failed.map(log => [
                new Date(log.timestamp).toLocaleString(),
                log.user,
                log.ip,
                log.location,
                log.status
            ]);
            
            addTable(headers, rows);
            return;
        }
        
        if (args.includes('--ip')) {
            const ipCounts = {};
            accessLogs.forEach(log => {
                ipCounts[log.ip] = (ipCounts[log.ip] || 0) + 1;
            });
            
            addOutput('ACCESS BY IP ADDRESS:', 'normal');
            addOutput('', 'normal');
            
            Object.entries(ipCounts)
                .sort((a, b) => b[1] - a[1])
                .forEach(([ip, count]) => {
                    addOutput(`${ip}: ${count} access(es)`, 'data');
                });
            return;
        }
        
        addOutput(`ACCESS LOGS (Last ${accessLogs.length} entries):`, 'normal');
        addOutput('', 'normal');
        
        const headers = ['TIMESTAMP', 'USER', 'IP ADDRESS', 'ACTION', 'STATUS'];
        const rows = accessLogs.slice(-10).reverse().map(log => [
            new Date(log.timestamp).toLocaleString(),
            log.user,
            log.ip,
            log.action,
            log.status
        ]);
        
        addTable(headers, rows);
    },
    
    trace: (args) => {
        if (args.length === 0) {
            addOutput('Usage: trace <ip>', 'error');
            return;
        }
        
        const ip = args[0];
        const log = accessLogs.find(l => l.ip === ip);
        
        if (!log) {
            addOutput(`No access logs found for IP: ${ip}`, 'error');
            return;
        }
        
        addOutput(`Tracing IP: ${ip}`, 'normal');
        addOutput('', 'normal');
        addOutput(`Location: ${log.location}`, 'data');
        addOutput(`Last User: ${log.user}`, 'data');
        addOutput(`Last Action: ${log.action}`, 'data');
        addOutput(`Status: ${log.status}`, 'data');
        addOutput(`Timestamp: ${new Date(log.timestamp).toLocaleString()}`, 'data');
        
        const allAccess = accessLogs.filter(l => l.ip === ip);
        addOutput(`Total Access Count: ${allAccess.length}`, 'data');
    }
};

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value.trim();
        
        if (input) {
            addOutput(`$ ${input}`, 'normal');
            commandHistory.unshift(input);
            historyIndex = -1;
            
            const [cmd, ...args] = input.split(' ');
            
            if (commands[cmd]) {
                commands[cmd](args);
            } else {
                addOutput(`Command not found: ${cmd}`, 'error');
                addOutput('Type "help" for available commands.', 'normal');
            }
        }
        
        terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = -1;
            terminalInput.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const input = terminalInput.value.trim();
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            terminalInput.value = matches[0] + ' ';
        } else if (matches.length > 1) {
            addOutput(`Possible commands: ${matches.join(', ')}`, 'normal');
        }
    }
});

addOutput('Type "help" to see available commands.', 'success');
