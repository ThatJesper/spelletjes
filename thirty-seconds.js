// Test woordenlijst - Eenvoudig uit te breiden
const wordDatabase = [
    "Willem Alexander", "Albert Heijn", "Parijs", "Stofzuiger", "Bitcoin",
    "Kipnugget", "Donald Trump", "TikTok", "Eiffeltoren", "Supermarkt",
    "Koffiezetapparaat", "Amsterdam", "Formule 1", "Barbie", "Toverstaf",
    "Zwembad", "Sinterklaas", "Iphone", "Netflix", "Pannenkoek",
    "Goudvis", "Frikandelbroodje", "Efteling", "Verjaardag", "Vliegtuig",
    "Hond", "IKEA", "Treinvertraging", "Voetbal", "Weersverwachting"
];

// Spelers variabelen
let unusedWords = [...wordDatabase];
let teams = []; // Bevat objecten { name: 'Rood', color: '#ffb3ba', score: 0 }
let currentTeamIndex = 0;
let currentRound = 1;
let timer = 30;
let timerInterval = null;
let currentWordsOfRound = [];
let guessedWordsCount = 0;

// Instellingen variabelen
let winCondition = 'points';
let targetPoints = 30;
let targetRounds = 5;

const teamTemplates = [
    { name: 'Rood', color: '#ffb3ba' },
    { name: 'Blauw', color: '#bae1ff' },
    { name: 'Groen', color: '#baffc9' },
    { name: 'Geel', color: '#ffffba' }
];

// Schermen detecteren
const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const timeUpOverlay = document.getElementById('time-up-overlay');

// Wisselen van weergave bij instellingen
document.getElementById('win-condition').addEventListener('change', (e) => {
    winCondition = e.target.value;
    document.getElementById('target-points-group').classList.toggle('hidden', winCondition === 'rounds');
    document.getElementById('target-rounds-group').classList.toggle('hidden', winCondition === 'points');
});

// Start het spel vanaf setup
document.getElementById('start-game-btn').addEventListener('click', () => {
    const count = parseInt(document.getElementById('team-count').value);
    winCondition = document.getElementById('win-condition').value;
    targetPoints = parseInt(document.getElementById('target-points').value) || 30;
    targetRounds = parseInt(document.getElementById('target-rounds').value) || 5;

    // Vul de actieve teams op basis van selectie
    teams = [];
    for(let i = 0; i < count; i++) {
        teams.push({ ...teamTemplates[i], score: 0 });
    }

    currentTeamIndex = 0;
    currentRound = 1;
    unusedWords = [...wordDatabase];

    setupScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    updateScoreboard();
    prepareNextTurn();
});

function updateScoreboard() {
    const grid = document.getElementById('scores-grid');
    grid.innerHTML = '';
    teams.forEach(team => {
        const row = document.createElement('div');
        row.className = 'score-row';
        row.style.backgroundColor = team.color;
        row.innerText = `Team ${team.name}: ${team.score} pnt`;
        grid.appendChild(row);
    });
}

function prepareNextTurn() {
    const currentTeam = teams[currentTeamIndex];
    
    // Header updaten
    document.getElementById('current-round-display').innerText = `Ronde: ${currentRound}`;
    const indicator = document.getElementById('current-team-indicator');
    indicator.innerText = `Team ${currentTeam.name} is aan de beurt`;
    indicator.style.backgroundColor = currentTeam.color;

    // Views resetten
    document.getElementById('pre-round-view').classList.remove('hidden');
    document.getElementById('active-round-view').classList.add('hidden');
    document.getElementById('next-turn-btn').classList.add('hidden');
    
    // Reset timer display
    document.getElementById('timer-display').innerText = "30";
    timer = 30;
}

// Klik op 'Start Beurt'
document.getElementById('start-turn-btn').addEventListener('click', () => {
    document.getElementById('pre-round-view').classList.add('hidden');
    document.getElementById('active-round-view').classList.remove('hidden');
    
    generateWordsForRound();
    startTimer();
});

function generateWordsForRound() {
    const container = document.getElementById('words-container');
    container.innerHTML = '';
    currentWordsOfRound = [];
    guessedWordsCount = 0;

    // Als de koek op is, reset de lijst
    if (unusedWords.length < 5) {
        unusedWords = [...wordDatabase];
    }

    // Pak 5 unieke woorden
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * unusedWords.length);
        const word = unusedWords.splice(randomIndex, 1)[0];
        currentWordsOfRound.push({ word: word, guessed: false });

        const wordDiv = document.createElement('div');
        wordDiv.className = 'word-item';
        wordDiv.innerText = word;
        
        // Klik functionaliteit (werkt altijd: tijdens én na de timer!)
        wordDiv.addEventListener('click', () => {
            currentWordsOfRound[i].guessed = !currentWordsOfRound[i].guessed;
            wordDiv.classList.toggle('guessed');
            
            // Update lokale teller
            guessedWordsCount = currentWordsOfRound.filter(w => w.guessed).length;
        });

        container.appendChild(wordDiv);
    }
}

function startTimer() {
    timer = 30;
    document.getElementById('timer-display').innerText = timer;
    
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer-display').innerText = timer;

        if (timer <= 0) {
            clearInterval(timerInterval);
            // Toon de grote "TIJD IS VOORBIJ" melding
            timeUpOverlay.classList.remove('hidden');
        }
    }, 1000);
}

// Sluit de overlay handmatig
document.getElementById('close-overlay-btn').addEventListener('click', () => {
    timeUpOverlay.classList.add('hidden');
    // Toon pas nu de handmatige "Volgende Team" knop op het scherm
    document.getElementById('next-turn-btn').classList.remove('hidden');
});

// Klik op 'Volgende Team & Punten Opslaan'
document.getElementById('next-turn-btn').addEventListener('click', () => {
    // Sla de punten op bij het huidige team
    teams[currentTeamIndex].score += guessedWordsCount;
    updateScoreboard();

    if (checkGameOver()) {
        showGameOver();
        return;
    }

    // Bepaal wie de volgende is
    currentTeamIndex++;
    if (currentTeamIndex >= teams.length) {
        currentTeamIndex = 0;
        currentRound++;
    }

    prepareNextTurn();
});

function checkGameOver() {
    const maxScore = Math.max(...teams.map(t => t.score));
    
    if (winCondition === 'points') {
        return maxScore >= targetPoints;
    } else if (winCondition === 'rounds') {
        // Ronde is helemaal af als het laatste team is geweest
        return currentRound > targetRounds && currentTeamIndex === teams.length - 1;
    } else if (winCondition === 'either') {
        const roundCondition = currentRound > targetRounds && currentTeamIndex === teams.length - 1;
        const scoreCondition = maxScore >= targetPoints;
        return roundCondition || scoreCondition;
    }
    return false;
}

function showGameOver() {
    gameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');

    // Zoek de winnaar
    let winner = teams[0];
    teams.forEach(t => {
        if (t.score > winner.score) winner = t;
    });

    document.getElementById('winner-display').innerHTML = `
        <h3 style="background-color: ${winner.color}; display: inline-block; padding: 10px 20px; border-radius: 20px;">
            Team ${winner.name} Wint! 🥳
        </h3>
    `;

    // Toon eindstand
    const finalGrid = document.getElementById('final-scores');
    finalGrid.innerHTML = '';
    teams.forEach(team => {
        const row = document.createElement('div');
        row.className = 'score-row';
        row.style.backgroundColor = team.color;
        row.innerText = `Team ${team.name}: ${team.score} punten`;
        finalGrid.appendChild(row);
    });
}
