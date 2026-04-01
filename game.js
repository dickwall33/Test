// ===== CREATURE DATA =====
const CREATURES = [
    {
        id: 'blob',
        name: 'Blobbi',
        desc: 'A cheerful blob.\nEasy to care for!',
        personality: 'chill',
        hunger_rate: 0.8,
        happy_rate: 0.6,
        energy_rate: 0.5,
        frames: {
            idle: [
`   ████████
  ██░░░░░░██
 ██░░●░░●░░██
 ██░░░░░░░░██
 ██░░╰──╯░░██
  ██░░░░░░██
   ████████`,
`   ████████
  ██░░░░░░██
 ██░░●░░●░░██
 ██░░░░░░░░██
 ██░░╰──╯░░██
  ██░░░░░░██
   ████████`
            ],
            happy: [
`   ████████
  ██░░░░░░██
 ██░░^░░^░░██
 ██░░░░░░░░██
 ██░░╰▽▽╯░░██
  ██░░░░░░██
   ████████`
            ],
            sad: [
`   ████████
  ██░░░░░░██
 ██░░•░░•░░██
 ██░░░░░░░░██
 ██░░╭──╮░░██
  ██░░░░░░██
   ████████`
            ],
            eating: [
`   ████████
  ██░░░░░░██
 ██░░●░░●░░██
 ██░░░░░░░░██
 ██░░░○○░░░██
  ██░░░░░░██
   ████████`
            ],
            sleeping: [
`   ████████
  ██░░░░░░██
 ██░░—░░—░░██
 ██░░░░░░░░██
 ██░░░──░░░██
  ██░░░░░░██
   ████████`
            ],
            sick: [
`   ████████
  ██░░░░░░██
 ██░░x░░x░░██
 ██░░░░░░░░██
 ██░░░~~░░░██
  ██░░░░░░██
   ████████`
            ],
            evolved: [
`  ██████████
 ██▓▓▓▓▓▓▓▓██
██▓▓★▓▓▓★▓▓██
██▓▓▓▓▓▓▓▓▓▓██
██▓▓╰════╯▓▓██
 ██▓▓▓▓▓▓▓▓██
██▓▓▓▓▓▓▓▓▓▓██
  ██████████`
            ]
        }
    },
    {
        id: 'dino',
        name: 'Rawr Jr.',
        desc: 'A tiny dinosaur.\nLoves to play!',
        personality: 'energetic',
        hunger_rate: 1.2,
        happy_rate: 1.0,
        energy_rate: 0.8,
        frames: {
            idle: [
`      ██████
     ██●░●██
    ██░░░░░██
     ██▽▽▽██
      ██░██
  ████ ██ ████
 ██░░██  ██░██
  ██       ██
   ██     ██`,
`      ██████
     ██●░●██
    ██░░░░░██
     ██▽▽▽██
      ██░██
  ████ ██ ████
 ██░██  ██░░██
  ██       ██
   ██     ██`
            ],
            happy: [
`      ██████
     ██^░^██
    ██░░░░░██
     ██▽▽▽██
      ██░██
  ████ ██ ████
 ██░░██  ██░██
  ██       ██
   ██     ██`
            ],
            sad: [
`      ██████
     ██•░•██
    ██░░░░░██
     ██───██
      ██░██
  ████ ██ ████
 ██░░██  ██░██
  ██       ██
   ██     ██`
            ],
            eating: [
`      ██████
     ██●░●██
    ██░░░░░██
     ██○○○██
      ██░██
  ████ ██ ████
 ██░░██  ██░██
  ██       ██
   ██     ██`
            ],
            sleeping: [
`      ██████
     ██—░—██
    ██░░░░░██
     ██───██
      ██░██
  ████ ██ ████
 ██░░██  ██░██
  ██       ██
   ██     ██`
            ],
            sick: [
`      ██████
     ██x░x██
    ██░░░░░██
     ██~~~██
      ██░██
  ████ ██ ████
 ██░░██  ██░██
  ██       ██
   ██     ██`
            ],
            evolved: [
`    ████████
  ██▓▓★░★▓▓██
 ██▓▓░░░░░▓▓██
  ██▓▽▽▽▽▽▓██
   ██▓▓░▓▓██
████▓██░██▓████
██▓▓██░░░██▓▓██
 ██▓▓     ▓▓██
  ██▓▓   ▓▓██`
            ]
        }
    },
    {
        id: 'cat',
        name: 'Nyanta',
        desc: 'A sassy pixel cat.\nNeeds attention!',
        personality: 'needy',
        hunger_rate: 1.0,
        happy_rate: 1.3,
        energy_rate: 0.6,
        frames: {
            idle: [
` ██      ██
 ████  ████
██●░░░░░░●██
██░░░░░░░░██
██░░░▽▽░░░██
 ██░░░░░░██
  ████████
  ██░░░░██
  ██    ██`,
` ██      ██
 ████  ████
██●░░░░░░●██
██░░░░░░░░██
██░░░▽▽░░░██
 ██░░░░░░██
  ████████
  ██░░░░██
   ██  ██`
            ],
            happy: [
` ██      ██
 ████  ████
██^░░░░░░^██
██░░░░░░░░██
██░░╰▽▽╯░░██
 ██░░░░░░██
  ████████
  ██░░░░██
  ██    ██`
            ],
            sad: [
` ██      ██
 ████  ████
██•░░░░░░•██
██░░;░░;░░██
██░░╭──╮░░██
 ██░░░░░░██
  ████████
  ██░░░░██
  ██    ██`
            ],
            eating: [
` ██      ██
 ████  ████
██●░░░░░░●██
██░░░░░░░░██
██░░░○○░░░██
 ██░░░░░░██
  ████████
  ██░░░░██
  ██    ██`
            ],
            sleeping: [
` ██      ██
 ████  ████
██—░░░░░░—██
██░░░░░░░░██
██░░░──░░░██
 ██░░░░░░██
  ████████
  ██░░░░██
  ██    ██`
            ],
            sick: [
` ██      ██
 ████  ████
██x░░░░░░x██
██░░░░░░░░██
██░░░~~░░░██
 ██░░░░░░██
  ████████
  ██░░░░██
  ██    ██`
            ],
            evolved: [
`███      ███
█████  █████
██★░░░░░░★██
██▓▓▓▓▓▓▓▓██
██▓╰▽▽▽▽╯▓██
 ██▓▓▓▓▓▓██
 █████████
███▓▓▓▓▓███
 ███    ███`
            ]
        }
    },
    {
        id: 'ghost',
        name: 'Boo-boo',
        desc: 'A friendly ghost.\nLow maintenance!',
        personality: 'chill',
        hunger_rate: 0.5,
        happy_rate: 0.7,
        energy_rate: 0.4,
        frames: {
            idle: [
`    ██████
  ██░░░░░░██
 ██░░●░░●░░██
 ██░░░░░░░░██
 ██░░░○░░░░██
 ██░░░░░░░░██
 ██░░░░░░░░██
 █ ██ ██ ██ █`,
`    ██████
  ██░░░░░░██
 ██░░●░░●░░██
 ██░░░░░░░░██
 ██░░░○░░░░██
 ██░░░░░░░░██
 ██░░░░░░░░██
 ██ ██ ██ ██`
            ],
            happy: [
`    ██████
  ██░░░░░░██
 ██░░^░░^░░██
 ██░░░░░░░░██
 ██░░╰▽╯░░░██
 ██░░░░░░░░██
 ██░░░░░░░░██
 █ ██ ██ ██ █`
            ],
            sad: [
`    ██████
  ██░░░░░░██
 ██░░;░░;░░██
 ██░░░░░░░░██
 ██░░╭─╮░░░██
 ██░░░░░░░░██
 ██░░░░░░░░██
 █ ██ ██ ██ █`
            ],
            eating: [
`    ██████
  ██░░░░░░██
 ██░░●░░●░░██
 ██░░░░░░░░██
 ██░░░◎░░░░██
 ██░░░░░░░░██
 ██░░░░░░░░██
 █ ██ ██ ██ █`
            ],
            sleeping: [
`    ██████
  ██░░░░░░██
 ██░░—░░—░░██
 ██░░░░░░░░██
 ██░░░─░░░░██
 ██░░░░░░░░██
 ██░░░░░░░░██
 █ ██ ██ ██ █`
            ],
            sick: [
`    ██████
  ██░░░░░░██
 ██░░x░░x░░██
 ██░░░░░░░░██
 ██░░░~░░░░██
 ██░░░░░░░░██
 ██░░░░░░░░██
 █ ██ ██ ██ █`
            ],
            evolved: [
`   ████████
 ██▓▓▓▓▓▓▓▓██
██▓▓★▓▓▓★▓▓██
██▓▓▓▓▓▓▓▓▓▓██
██▓▓╰══╯▓▓▓██
██▓▓▓▓▓▓▓▓▓▓██
██▓▓▓▓▓▓▓▓▓▓██
██ ██ ██ ██ ██`
            ]
        }
    },
    {
        id: 'robot',
        name: 'Botchi',
        desc: 'A tiny robot pal.\nVery predictable!',
        personality: 'balanced',
        hunger_rate: 0.9,
        happy_rate: 0.8,
        energy_rate: 0.9,
        frames: {
            idle: [
`  ██████████
 ██┌──┐┌──┐██
 ██│●░││░●│██
 ██└──┘└──┘██
 ██░░▫▫▫░░░██
  ██████████
  ░██░░░░██░
  ░██░░░░██░
  ░██    ██░`,
`  ██████████
 ██┌──┐┌──┐██
 ██│●░││░●│██
 ██└──┘└──┘██
 ██░░▫▫▫░░░██
  ██████████
  ░██░░░░██░
  ░██░░░░██░
   ██░  ░██`
            ],
            happy: [
`  ██████████
 ██┌──┐┌──┐██
 ██│^░││░^│██
 ██└──┘└──┘██
 ██░░▽▽▽░░░██
  ██████████
  ░██░░░░██░
  ░██░░░░██░
  ░██    ██░`
            ],
            sad: [
`  ██████████
 ██┌──┐┌──┐██
 ██│•░││░•│██
 ██└──┘└──┘██
 ██░░───░░░██
  ██████████
  ░██░░░░██░
  ░██░░░░██░
  ░██    ██░`
            ],
            eating: [
`  ██████████
 ██┌──┐┌──┐██
 ██│●░││░●│██
 ██└──┘└──┘██
 ██░░○○○░░░██
  ██████████
  ░██░░░░██░
  ░██░░░░██░
  ░██    ██░`
            ],
            sleeping: [
`  ██████████
 ██┌──┐┌──┐██
 ██│—░││░—│██
 ██└──┘└──┘██
 ██░░───░░░██
  ██████████
  ░██░░░░██░
  ░██░░░░██░
  ░██    ██░`
            ],
            sick: [
`  ██████████
 ██┌──┐┌──┐██
 ██│x░││░x│██
 ██└──┘└──┘██
 ██░░~~~░░░██
  ██████████
  ░██░░░░██░
  ░██░░░░██░
  ░██    ██░`
            ],
            evolved: [
` ████████████
██▓┌──┐┌──┐▓██
██▓│★░││░★│▓██
██▓└──┘└──┘▓██
██▓░▽▽▽▽▽░▓██
 ████████████
 ░██▓▓▓▓▓██░
 ░██▓▓▓▓▓██░
 ░███    ███░`
            ]
        }
    },
    {
        id: 'bunny',
        name: 'Hopscotch',
        desc: 'A bouncy bunny.\nAlways hungry!',
        personality: 'energetic',
        hunger_rate: 1.4,
        happy_rate: 0.9,
        energy_rate: 0.7,
        frames: {
            idle: [
`  ████  ████
  ██░██ █░██
  ██░░███░██
   ████████
  ██●░░░░●██
  ██░░░░░░██
  ██░╰▽▽╯░██
   ████████
    ██  ██`,
`  ████  ████
  ██░██ █░██
  ██░░███░██
   ████████
  ██●░░░░●██
  ██░░░░░░██
  ██░╰▽▽╯░██
   ████████
   ██    ██`
            ],
            happy: [
`  ████  ████
  ██░██ █░██
  ██░░███░██
   ████████
  ██^░░░░^██
  ██░░░░░░██
  ██░╰▽▽╯░██
   ████████
    ██  ██`
            ],
            sad: [
`  ████  ████
  ██░██ █░██
  ██░░███░██
   ████████
  ██•░░░░•██
  ██░;░░;░██
  ██░╭──╮░██
   ████████
    ██  ██`
            ],
            eating: [
`  ████  ████
  ██░██ █░██
  ██░░███░██
   ████████
  ██●░░░░●██
  ██░░░░░░██
  ██░○○○○░██
   ████████
    ██  ██`
            ],
            sleeping: [
`  ████  ████
  ██░██ █░██
  ██░░███░██
   ████████
  ██—░░░░—██
  ██░░░░░░██
  ██░░──░░██
   ████████
    ██  ██`
            ],
            sick: [
`  ████  ████
  ██░██ █░██
  ██░░███░██
   ████████
  ██x░░░░x██
  ██░░░░░░██
  ██░░~~░░██
   ████████
    ██  ██`
            ],
            evolved: [
` █████  █████
 ██▓██ ██▓██
 ██▓▓████▓██
  ██████████
 ██★▓▓▓▓▓★██
 ██▓▓▓▓▓▓▓██
 ██▓╰▽▽▽╯▓██
  ██████████
   ███  ███`
            ]
        }
    }
];

// ===== ASCII ART EXTRAS =====
const EGG_ART = `
    ██████
  ██░░░░░░██
 ██░░░██░░░██
██░░░████░░░██
██░░░████░░░██
 ██░░░██░░░██
  ██░░░░░░██
    ██████
`;

const GRAVE_ART = `
     ██████
    ██    ██
   ██ REST ██
   ██  IN  ██
   ██ PEACE██
   ██      ██
   ██████████
  ████████████
`;

// ===== GAME STATE =====
let state = {
    screen: 'title',
    selectedCreature: 0,
    pet: null,
    isSleeping: false,
    isSick: false,
    isDead: false,
    evolved: false,
    poopCount: 0,
    tickInterval: null,
    animFrame: 0,
    animInterval: null,
    actionCooldown: false
};

// ===== DOM REFS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Screens
const screens = {
    title: $('#title-screen'),
    select: $('#select-screen'),
    game: $('#game-screen'),
    gameover: $('#gameover-screen'),
    evolve: $('#evolve-screen')
};

// ===== SCREEN MANAGEMENT =====
function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    state.screen = name;
}

// ===== TITLE SCREEN =====
$('#egg-art').textContent = EGG_ART;

$('#start-btn').addEventListener('click', () => {
    showScreen('select');
    updateCreaturePreview();
});

// ===== CREATURE SELECTION =====
function updateCreaturePreview() {
    const creature = CREATURES[state.selectedCreature];
    $('#preview-art').textContent = creature.frames.idle[0];
    $('#creature-name').textContent = creature.name;
    $('#creature-desc').textContent = creature.desc;
}

$('#prev-creature').addEventListener('click', () => {
    state.selectedCreature = (state.selectedCreature - 1 + CREATURES.length) % CREATURES.length;
    updateCreaturePreview();
});

$('#next-creature').addEventListener('click', () => {
    state.selectedCreature = (state.selectedCreature + 1) % CREATURES.length;
    updateCreaturePreview();
});

$('#choose-btn').addEventListener('click', () => {
    startGame(CREATURES[state.selectedCreature]);
});

// ===== START GAME =====
function startGame(creature) {
    state.pet = {
        creature: creature,
        hunger: 80,
        happiness: 80,
        energy: 80,
        health: 100,
        age: 0,
        tickCount: 0
    };
    state.isSleeping = false;
    state.isSick = false;
    state.isDead = false;
    state.evolved = false;
    state.poopCount = 0;

    $('#pet-name-display').textContent = creature.name;
    updateDisplay();
    showScreen('game');
    startGameLoop();
}

// ===== GAME LOOP =====
function startGameLoop() {
    // Clear any existing intervals
    if (state.tickInterval) clearInterval(state.tickInterval);
    if (state.animInterval) clearInterval(state.animInterval);

    // Main game tick every 3 seconds
    state.tickInterval = setInterval(gameTick, 3000);

    // Animation frame swap every 800ms
    state.animInterval = setInterval(() => {
        state.animFrame = (state.animFrame + 1) % 2;
        renderPet();
    }, 800);
}

function stopGameLoop() {
    clearInterval(state.tickInterval);
    clearInterval(state.animInterval);
    state.tickInterval = null;
    state.animInterval = null;
}

function gameTick() {
    if (state.isDead) return;

    const pet = state.pet;
    const c = pet.creature;

    // Decay stats
    pet.hunger = Math.max(0, pet.hunger - (0.8 * c.hunger_rate));
    pet.happiness = Math.max(0, pet.happiness - (0.5 * c.happy_rate));

    if (state.isSleeping) {
        pet.energy = Math.min(100, pet.energy + 3);
        if (pet.energy >= 100) {
            state.isSleeping = false;
            $('#zzz').classList.add('hidden');
        }
    } else {
        pet.energy = Math.max(0, pet.energy - (0.4 * c.energy_rate));
    }

    // Poop chance
    if (Math.random() < 0.08) {
        state.poopCount = Math.min(3, state.poopCount + 1);
    }

    // Poop lowers happiness and health
    if (state.poopCount > 0) {
        pet.happiness = Math.max(0, pet.happiness - (state.poopCount * 0.5));
        if (state.poopCount >= 2) {
            pet.health = Math.max(0, pet.health - 0.3);
        }
    }

    // Sickness check
    if (!state.isSick && (pet.hunger < 15 || pet.happiness < 10 || state.poopCount >= 3)) {
        if (Math.random() < 0.25) {
            state.isSick = true;
        }
    }

    // Sick = health drains
    if (state.isSick) {
        pet.health = Math.max(0, pet.health - 1.5);
    }

    // Low hunger = health drains
    if (pet.hunger <= 0) {
        pet.health = Math.max(0, pet.health - 1);
    }

    // Natural health regen when well-fed and happy
    if (!state.isSick && pet.hunger > 60 && pet.happiness > 50) {
        pet.health = Math.min(100, pet.health + 0.3);
    }

    // Age up
    pet.tickCount++;
    if (pet.tickCount % 20 === 0) {
        pet.age++;
    }

    // Evolution at age 5
    if (pet.age >= 5 && !state.evolved && pet.health > 50) {
        triggerEvolution();
        return;
    }

    // Death check
    if (pet.health <= 0) {
        triggerDeath();
        return;
    }

    updateDisplay();
}

// ===== DISPLAY =====
function getState() {
    if (state.isDead) return 'sick';
    if (state.isSleeping) return 'sleeping';
    if (state.isSick) return 'sick';
    if (state.pet.happiness > 70 && state.pet.hunger > 50) return 'happy';
    if (state.pet.happiness < 25 || state.pet.hunger < 20) return 'sad';
    return 'idle';
}

function renderPet() {
    if (!state.pet) return;
    const petState = getState();
    const frames = state.evolved
        ? state.pet.creature.frames.evolved
        : state.pet.creature.frames[petState];
    const frame = Array.isArray(frames) ? frames[state.animFrame % frames.length] : frames;
    const petArt = $('#pet-art');
    petArt.textContent = frame;

    // CSS classes
    petArt.className = '';
    if (state.isSleeping) petArt.classList.add('sleep-mode');
    if (state.isSick) petArt.classList.add('sick');
}

function updateDisplay() {
    const pet = state.pet;

    // Stats bars
    setBar('hunger-bar', pet.hunger);
    setBar('happy-bar', pet.happiness);
    setBar('energy-bar', pet.energy);
    setBar('health-bar', pet.health);

    // Age
    $('#age-display').textContent = `Age: ${pet.age}`;

    // Poop
    $('#poop-area').textContent = '💩'.repeat(state.poopCount);

    // Mood
    const mood = getMoodText();
    $('#mood-indicator').textContent = mood;

    // ZZZ
    if (state.isSleeping) {
        $('#zzz').classList.remove('hidden');
    } else {
        $('#zzz').classList.add('hidden');
    }

    renderPet();
}

function setBar(id, value) {
    const bar = $(`#${id}`);
    bar.style.width = `${Math.max(0, Math.min(100, value))}%`;
    if (value < 25) {
        bar.classList.add('low');
    } else {
        bar.classList.remove('low');
    }
}

function getMoodText() {
    if (state.isSick) return '* feeling sick *';
    if (state.isSleeping) return '* sleeping *';
    const pet = state.pet;
    if (pet.hunger < 15) return '* starving! *';
    if (pet.happiness < 15) return '* very sad *';
    if (pet.energy < 15) return '* exhausted *';
    if (pet.happiness > 80 && pet.hunger > 70) return '* so happy! *';
    if (pet.hunger < 35) return '* hungry *';
    if (pet.happiness < 35) return '* bored *';
    if (pet.energy < 30) return '* sleepy *';
    return '* content *';
}

// ===== ACTIONS =====
function showEffect(emoji) {
    const el = $('#action-effect');
    el.textContent = emoji;
    el.classList.remove('hidden');
    el.style.animation = 'none';
    // Trigger reflow
    void el.offsetWidth;
    el.style.animation = '';
    setTimeout(() => el.classList.add('hidden'), 1000);
}

function animatePet(type) {
    const petArt = $('#pet-art');
    petArt.classList.remove('bounce', 'wiggle');
    void petArt.offsetWidth;
    petArt.classList.add(type);
    setTimeout(() => petArt.classList.remove(type), 500);
}

function doAction(action) {
    if (state.isDead || state.actionCooldown) return;

    // Brief cooldown to prevent spam
    state.actionCooldown = true;
    setTimeout(() => { state.actionCooldown = false; }, 600);

    const pet = state.pet;

    switch (action) {
        case 'feed':
            if (state.isSleeping) return;
            pet.hunger = Math.min(100, pet.hunger + 25);
            pet.happiness = Math.min(100, pet.happiness + 5);
            pet.energy = Math.max(0, pet.energy - 2);
            showEffect('🍖');
            // Show eating frame briefly
            $('#pet-art').textContent = pet.creature.frames.eating[0] || pet.creature.frames.eating;
            animatePet('bounce');
            break;

        case 'play':
            if (state.isSleeping) return;
            if (pet.energy < 10) {
                showEffect('😫');
                return;
            }
            pet.happiness = Math.min(100, pet.happiness + 20);
            pet.energy = Math.max(0, pet.energy - 12);
            pet.hunger = Math.max(0, pet.hunger - 5);
            showEffect('⚽');
            animatePet('bounce');
            break;

        case 'sleep':
            if (state.isSleeping) {
                // Wake up
                state.isSleeping = false;
                showEffect('☀️');
            } else {
                state.isSleeping = true;
                showEffect('💤');
            }
            break;

        case 'clean':
            if (state.poopCount > 0) {
                state.poopCount = 0;
                pet.happiness = Math.min(100, pet.happiness + 5);
                showEffect('✨');
                animatePet('wiggle');
            }
            break;

        case 'heal':
            if (state.isSick) {
                state.isSick = false;
                pet.health = Math.min(100, pet.health + 20);
                showEffect('💊');
                animatePet('wiggle');
            }
            break;

        case 'pet':
            if (state.isSleeping) return;
            pet.happiness = Math.min(100, pet.happiness + 10);
            showEffect('💕');
            animatePet('wiggle');
            break;
    }

    updateDisplay();
}

// Action buttons
$$('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        doAction(btn.dataset.action);
    });
});

// ===== EVOLUTION =====
function triggerEvolution() {
    state.evolved = true;
    stopGameLoop();

    const creature = state.pet.creature;
    const evolvedArt = Array.isArray(creature.frames.evolved)
        ? creature.frames.evolved[0]
        : creature.frames.evolved;

    $('#evolve-art').textContent = evolvedArt;
    $('#evolve-msg').textContent = `${creature.name} evolved into\nSuper ${creature.name}!`;
    showScreen('evolve');

    $('#evolve-ok-btn').onclick = () => {
        showScreen('game');
        startGameLoop();
        updateDisplay();
    };
}

// ===== DEATH =====
function triggerDeath() {
    state.isDead = true;
    stopGameLoop();

    const pet = state.pet;
    $('#grave-art').textContent = GRAVE_ART;
    $('#gameover-msg').textContent = `${pet.creature.name} has passed away...`;
    $('#final-age').textContent = `Lived to age ${pet.age}`;
    showScreen('gameover');
}

$('#restart-btn').addEventListener('click', () => {
    state = {
        screen: 'title',
        selectedCreature: 0,
        pet: null,
        isSleeping: false,
        isSick: false,
        isDead: false,
        evolved: false,
        poopCount: 0,
        tickInterval: null,
        animInterval: null,
        animFrame: 0,
        actionCooldown: false
    };
    showScreen('title');
});
