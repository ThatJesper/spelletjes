const wordDatabase = [
    "Willem Alexander", "Albert Heijn", "Parijs", "Stofzuiger", "Bitcoin",
    "Kipnugget", "Donald Trump", "TikTok", "Eiffeltoren", "Supermarkt",
    "Koffiezetapparaat", "Amsterdam", "Formule 1", "Barbie", "Toverstaf",
    "Zwembad", "Sinterklaas", "Iphone", "Netflix", "Pannenkoek",
    "Goudvis", "Frikandelbroodje", "Efteling", "Verjaardag", "Vliegtuig",
    "Hond", "IKEA", "Treinvertraging", "Voetbal", "Weersverwachting"
];

let unusedWords = [...wordDatabase];
let teams = []; 
let currentTeamIndex = 0;
let currentRound = 1;
let timer = 30;
let timerInterval = null;
let currentWordsOfRound = [];
let guessedWordsCount = 0;

let winCondition = 'points';
let targetPoints = 30;
let targetRounds = 5;

const teamTemplates = [
    { name: 'Rood', color: '#ffb3ba' },
    { name: 'Blauw', color: '#bae1ff' },
    { name: 'Groen', color: '#baffc9' },
    { name: 'Geel', color: '#ffffba' }
];

const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const timeUpOverlay = document.getElementById('time-up-overlay');
const teamCountSelect = document.getElementById('team-count');
const playersInputSection = document.getElementById('players-input-section');

// 1. Zorg dat invoervelden alleen verschijnen wanneer nodig
document.getElementById('win-condition').addEventListener('change', (e) => {
    winCondition = e.target.value;
    document.getElementById('target-points-group').classList.toggle('hidden', winCondition === 'rounds');
    document.getElementById('target-rounds-group').classList.toggle('hidden', winCondition === 'points');
});

// 2. Genereer dynamisch spelersnaam velden op basis van team selectie
function renderPlayerInputs() {
    const count = parseInt(teamCountSelect.value);
    playersInputSection.innerHTML = '<label>Spelersnamen (gescheiden door komma\'s):</label>';
    
    for (let i = 0; i < count; i++) {
        const team = teamTemplates[i];
        const wrapper = document.createElement('div');
        wrapper.className = 'team-input-wrapper';
        wrapper.style.setProperty('--clr', team.color);
        
        wrapper.innerHTML = `
            <span style="font-weight:bold; color:#1e3a8a;">Team ${team.name}:</span>
            <input type="text" class="sub-player-input" id="team-players-${i}" value="Speler 1, Speler 2" placeholder="Naam 1, Naam 2">
        `;
        playersInputSection.appendChild(wrapper);
    }
}
teamCountSelect.addEventListener('change', renderPlayerInputs);
renderPlayerInputs(); // Eerste aanroep bij laden

// Start het spel
document.getElementById('start-game-btn').addEventListener('click', () => {
    const count = parseInt(teamCountSelect.value);
    winCondition = document.getElementById('win-condition').value;
    targetPoints = parseInt(document.getElementById('target-points').value) || 30;
    targetRounds = parseInt(document.getElementById('target-rounds').value) || 5;

    teams = [];
    for(let i = 0; i < count; i++) {
        // Pak de namen uit het inputveld en splits op komma
        const inputVal = document.getElementById(`team-players-${i}`).value;
        const playerArray = inputVal.split(',').map(name => name.trim()).filter(name => name !== "");
        
        // Als er niks is ingevuld, geef fallback namen
        if (playerArray.length === 0) playerArray.push("Speler 1");

        teams.push({ 
            ...teamTemplates[i], 
            score: 0, 
            players: playerArray,
            currentPlayerPointer: 0 // Houdt bij wie binnen dit team aan de beurt is
        });
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
    
    // Pak de huidige speler van het team
    const activePlayer = currentTeam.players[currentTeamIndex % currentTeam.players.length];
    const playerIndex = currentTeam.currentPlayerPointer % currentTeam.players.length;
    const currentActivePlayer = currentTeam.players[playerIndex];

    document.getElementById('current-round-display').innerText = `Ronde: ${currentRound}`;
    const indicator = document.getElementById('current-team-indicator');
    indicator.innerText = `Team ${currentTeam.name}`;
    indicator.style.backgroundColor = currentTeam.color;

    // Toon de speler die nu moet gaan omschrijven
    document.getElementById('active-player-name').innerText = currentActivePlayer;

    document.getElementById('pre-round-view').classList.remove('hidden');
    document.getElementById('active-round-view').classList.add('hidden');
    document.getElementById('next-turn-btn').classList.add('hidden');
    
    document.getElementById('timer-display').innerText = "30";
    timer = 30;
}

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

    if (unusedWords.length < 5) unusedWords = [...wordDatabase];

    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * unusedWords.length);
        const word = unusedWords.splice(randomIndex, 1)[0];
        currentWordsOfRound.push({ word: word, guessed: false });

        const wordDiv = document.createElement('div');
        wordDiv.className = 'word-item';
        wordDiv.innerText = word;
        
        wordDiv.addEventListener('click', () => {
            currentWordsOfRound[i].guessed = !currentWordsOfRound[i].guessed;
            wordDiv.classList.toggle('guessed');
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
            timeUpOverlay.classList.remove('hidden');
        }
    }, 1000);
}

document.getElementById('close-overlay-btn').addEventListener('click', () => {
    timeUpOverlay.classList.add('hidden');
    document.getElementById('next-turn-btn').classList.remove('hidden');
});

// Volgende team & punten opslaan + Berekening van Bonus
document.getElementById('next-turn-btn').addEventListener('click', () => {
    let finalPointsOfTurn = guessedWordsCount;
    
    // 4. Bonus-logica: Alle 5 goed? Dan 1 extra punt!
    if (finalPointsOfTurn === 5) {
        finalPointsOfTurn += 1;
    }

    teams[currentTeamIndex].score += finalPointsOfTurn;
    updateScoreboard();

    if (checkGameOver()) {
        showGameOver();
        return;
    }

    // Verschuif de spelerpointer voor de volgende beurt van DIT team
    teams[currentTeamIndex].currentPlayerPointer++;

    // Wissel naar volgende team
    currentTeamIndex++;
    if (currentTeamIndex >= teams.length) {
        currentTeamIndex = 0;
        currentRound++;
    }

    prepareNextTurn();
});

function checkGameOver() {
    const maxScore = Math.max(...teams.map(t => t.score));
    if (winCondition === 'points') return maxScore >= targetPoints;
    if (winCondition === 'rounds') return currentRound > targetRounds && currentTeamIndex === teams.length - 1;
    if (winCondition === 'either') {
        return (maxScore >= targetPoints) || (currentRound > targetRounds && currentTeamIndex === teams.length - 1);
    }
    return false;
}

function showGameOver() {
    gameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');

    let winner = teams[0];
    teams.forEach(t => { if (t.score > winner.score) winner = t; });

    document.getElementById('winner-display').innerHTML = `
        <h3 style="background-color: ${winner.color}; display: inline-block; padding: 10px 20px; border-radius: 20px;">
            Team ${winner.name} Wint! 🏆
        </h3>
    `;

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

// 5. Spel afbreken functionaliteit met extra veiligheidscheck
document.getElementById('abort-game-btn').addEventListener('click', () => {
    if (confirm("Weet je zeker dat je het huidige spel wilt afbreken? Alle punten gaan verloren.")) {
        clearInterval(timerInterval);
        location.reload(); // Herlaadt de pagina en brengt je terug naar setup
    }
});
