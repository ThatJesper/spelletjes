// Gigantische Gecategoriseerde Database gebaseerd op het echte Thirty Seconds bordspel
const wordDatabase = {
    makkelijk: [
        // Bekende Personen & Figuren
        "Donald Trump", "Max Verstappen", "Koning Willem-Alexander", "Sinterklaas", "Barbie", 
        "Harry Potter", "Mark Rutte", "Lionel Messi", "Cristiano Ronaldo", "Michael Jackson", 
        "Beyoncé", "SpongeBob", "Ed Sheeran", "Johan Cruijff", "Enzo Knol", "Chantal Janzen",
        "Spider-Man", "Snelle", "Martien Meiland", "Freek Vonk", "André Hazes", "Adolf Hitler",
        // Merken, Media & Bedrijven
        "Albert Heijn", "Efteling", "IKEA", "TikTok", "Netflix", "YouTube", "McDonald's", 
        "PlayStation", "Spotify", "Action", "Basic-Fit", "Coca-Cola", "Google", "Hema",
        "NOS Journaal", "Instagram", "Apple", "Nintendo", "Jumbo", "Ferrari", "Disney",
        // Geografie & Locaties
        "Parijs", "Amsterdam", "Nederland", "Duitsland", "London", "Frankrijk", "België", 
        "Rotterdam", "Utrecht", "Eiffeltoren", "Schiphol", "De Efteling", "Rome", "Spanje",
        // Dagelijkse Begrippen, Sport & Entertainment
        "Kipnugget", "Frikandelbroodje", "Stofzuiger", "Zwembad", "Vliegtuig", "Koffiezetapparaat",
        "Supermarkt", "Verjaardag", "Voetbal", "Goudvis", "Hond", "Pannenkoek", "Fiets", 
        "Toverstaf", "Paraplu", "Televisie", "Kerstboom", "Chocolade", "Pizza", "School", 
        "Treinvertraging", "Weersverwachting", "Zonnebril", "Tandenborstel", "Prullenbak",
        "Formule 1", "Tinder", "Wie is de Mol?", "Koffie", "Bier", "Kater", "Strand"
    ],
    middel: [
        // Bekende Personen & Media
        "Geert Wilders", "Femke Halsema", "Elon Musk", "Taylor Swift", "Justin Bieber",
        "Maarten van der Weijden", "Rihanna", "Bill Gates", "Ariana Grande", "Kylie Jenner", 
        "Tom Cruise", "Gordon", "Gerard Joling", "Suzan & Freek", "Arjen Lubach", "Joost Klein",
        "Louis van Gaal", "Kim Kardashian", "Kanye West", "Billie Eilish", "Doutzen Kroes",
        "Martin Garrix", "Duncan Laurence", "Flemming", "Amalia", "Eminem", "Johnny Depp",
        "The Voice of Holland", "Expeditie Robinson", "Maestro", "Vandaag Inside", "Ex on the Beach",
        // Maatschappij, Geld & Politiek
        "Bitcoin", "Inflatie", "Klimaatverandering", "Kunstmatige Intelligentie", "Thuisbezorgd", 
        "Hypotheek", "Studiefinanciering", "Quarantaine", "Huizenmarkt", "Stikstofcrisis",
        "Belastingdienst", "Asielzoekers", "Boerenprotest", "Aandelen", "Cryptovaluta",
        "Kringloopwinkel", "Zorgverzekering", "Kamer van Koophandel", "CAO", "Gemeentehuis",
        // Geografie & Cultuur
        "Ameland", "Utrecht Centraal", "Berlijnse Muur", "New York", "Italië", "Belastingparadijs",
        "De Alpen", "IJsselmeer", "Waddeneilanden", "Scheveningen", "Suikerfeest", "Carnaval",
        // Dagelijkse Begrippen, Lifestyle & Trends
        "Zonnepaneel", "Bakfiets", "Airfryer", "Smartwatch", "Podcast", "Thuiswerken", 
        "Burn-out", "Wereldreis", "Vegetariër", "Klimaatneutraal", "Microplastic", "Glow-up",
        "Work-life balance", "Brainstormen", "Matcha", "Filterbubbel", "Duurzaamheid",
        "Glutenallergie", "Havermelk", "Padellen", "Festival", "Glamping", "Uber"
    ],
    moeilijk: [
        // Politiek, Historie & Internationale Figuren
        "Sigrid Kaag", "Angela Merkel", "Joe Biden", "Zendaya", "Cillian Murphy", 
        "Margriet van der Linden", "Dick Schoof", "Caroline van der Plas", "Emmanuel Macron",
        "Volodymyr Zelensky", "Barack Obama", "Nelson Mandela", "Winston Churchill", "Juliana",
        "Christopher Nolan", "Margot Robbie", "Pedro Pascal", "Timothée Chalamet",
        // Merken & Specifieke Instanties
        "ChatGPT", "Shein", "Ryanair", "AliExpress", "Temu", "OpenAI", "Nvidia", "Tesla",
        "ASML", "Europese Unie", "Verenigde Naties", "NAVO", "Unicef", "Rijksmuseum",
        // Abstracte & Bureaucratische Begrippen
        "Auteursrecht", "Bureaucratie", "Algoritme", "Deepfake", "Globalisering", 
        "Monopolie", "Procrastinatie", "Recessie", "Subsidie", "Coalitieakkoord", 
        "Infrastructuur", "Gentrificatie", "Mantelzorg", "Polarisatie", "Sabbatical", 
        "Vrijmibo", "Crypto-mining", "Identiteitsfraude", "Netwerktopologie",
        "Kansberekening", "Jurisprudentie", "Prestatiedruk", "Popalisme", "Fuseren",
        "Dividend", "Insolventie", "Bbp (Bruto Binnenlands Product)", "Synergie",
        // Geografie & Specifieke Cultuur (Echte 30-Seconds krakers)
        "Klimanjaro", "Middellandse Zee", "Canarische Eilanden", "Veluwe", "Keukenhof",
        "Rode Kruis", "Prinsjesdag", "Grachtengordel", "Stedentrip", "Hunebedden"
    ]
};

// Spelers variabelen
let pools = {
    makkelijk: [...wordDatabase.makkelijk],
    middel: [...wordDatabase.middel],
    moeilijk: [...wordDatabase.moeilijk]
};

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

// Invoervelden tonen/verbergen op basis van instellingen
document.getElementById('win-condition').addEventListener('change', (e) => {
    winCondition = e.target.value;
    document.getElementById('target-points-group').classList.toggle('hidden', winCondition === 'rounds');
    document.getElementById('target-rounds-group').classList.toggle('hidden', winCondition === 'points');
});

// Genereer spelersnaam velden per team
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
renderPlayerInputs();

// Start het spel
document.getElementById('start-game-btn').addEventListener('click', () => {
    const count = parseInt(teamCountSelect.value);
    winCondition = document.getElementById('win-condition').value;
    targetPoints = parseInt(document.getElementById('target-points').value) || 30;
    targetRounds = parseInt(document.getElementById('target-rounds').value) || 5;

    teams = [];
    for(let i = 0; i < count; i++) {
        const inputVal = document.getElementById(`team-players-${i}`).value;
        const playerArray = inputVal.split(',').map(name => name.trim()).filter(name => name !== "");
        
        if (playerArray.length === 0) playerArray.push("Speler 1");

        teams.push({ 
            ...teamTemplates[i], 
            score: 0, 
            players: playerArray,
            currentPlayerPointer: 0 
        });
    }

    currentTeamIndex = 0;
    currentRound = 1;
    resetPools();

    setupScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    updateScoreboard();
    prepareNextTurn();
});

function resetPools() {
    pools.makkelijk = [...wordDatabase.makkelijk];
    pools.middel = [...wordDatabase.middel];
    pools.moeilijk = [...wordDatabase.moeilijk];
}

// Trek een woord uit een categorie (en vul de pool aan als hij leeg raakt)
function pullWordFromCategory(category) {
    if (pools[category].length === 0) {
        pools[category] = [...wordDatabase[category]];
    }
    const randomIndex = Math.floor(Math.random() * pools[category].length);
    return pools[category].splice(randomIndex, 1)[0];
}

function generateWordsForRound() {
    const container = document.getElementById('words-container');
    container.innerHTML = '';
    currentWordsOfRound = [];
    guessedWordsCount = 0;

    let selectedWords = [];

    // Verdeling toepassen volgens specificaties
    selectedWords.push(pullWordFromCategory('makkelijk')); // 1x Makkelijk
    selectedWords.push(pullWordFromCategory('middel'));    // 2x Middel
    selectedWords.push(pullWordFromCategory('middel'));
    selectedWords.push(pullWordFromCategory('moeilijk'));  // 1x Moeilijk

    // 1x Volledig Random (Kan makkelijk, middel of moeilijk zijn)
    const categories = ['makkelijk', 'middel', 'moeilijk'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    selectedWords.push(pullWordFromCategory(randomCategory));

    // Schud de 5 woorden zodat het 'moeilijke' of 'makkelijke' woord niet altijd op dezelfde plek staat
    selectedWords.sort(() => Math.random() - 0.5);

    // Render de woorden naar het speelscherm
    selectedWords.forEach((word, i) => {
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
    });
}

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
    const playerIndex = currentTeam.currentPlayerPointer % currentTeam.players.length;
    const currentActivePlayer = currentTeam.players[playerIndex];

    document.getElementById('current-round-display').innerText = `Ronde: ${currentRound}`;
    const indicator = document.getElementById('current-team-indicator');
    indicator.innerText = `Team ${currentTeam.name}`;
    indicator.style.backgroundColor = currentTeam.color;

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

document.getElementById('next-turn-btn').addEventListener('click', () => {
    let finalPointsOfTurn = guessedWordsCount;
    
    // Bonus-logica: 5 goed = +1 bonuspunt
    if (finalPointsOfTurn === 5) {
        finalPointsOfTurn += 1; 
    }

    teams[currentTeamIndex].score += finalPointsOfTurn;
    updateScoreboard();

    if (checkGameOver()) {
        showGameOver();
        return;
    }

    teams[currentTeamIndex].currentPlayerPointer++;

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

document.getElementById('abort-game-btn').addEventListener('click', () => {
    if (confirm("Weet je zeker dat je het huidige spel wilt afbreken? Alle punten gaan verloren.")) {
        clearInterval(timerInterval);
        location.reload();
    }
});
