/* ============================================================
   CAT LAB — game.js
   Procedural SVG cat designer + care simulation.
   No dependencies. Single shared cat-render function so the
   creator preview and the nursery show the exact same creature.
   ============================================================ */
(() => {
'use strict';

/* ---------------------------------------------------------------
   DATA TABLES
   --------------------------------------------------------------- */
const TYPES = {
    classic:  { name: 'Classic',  ico: '🐱', desc: 'an ordinary house cat',           glow: null,                 bodyOpacity: 1   },
    cosmic:   { name: 'Cosmic',   ico: '🌌', desc: 'fur woven from the night sky',     glow: 'rgba(157,107,255,0.9)', bodyOpacity: 1, stars: true },
    ember:    { name: 'Ember',    ico: '🔥', desc: 'a cat made of living flame',       glow: 'rgba(255,120,40,0.95)', bodyOpacity: 1, flicker: true },
    aqua:     { name: 'Aqua',     ico: '🌊', desc: 'a sleek deep-sea drifter',         glow: 'rgba(56,200,255,0.85)', bodyOpacity: 0.96, bubbles: true },
    crystal:  { name: 'Crystal',  ico: '💎', desc: 'a translucent gemstone feline',    glow: 'rgba(170,230,255,0.9)', bodyOpacity: 0.78, facets: true },
    spectre:  { name: 'Spectre',  ico: '👻', desc: 'a gentle ghost cat',               glow: 'rgba(180,120,255,0.8)', bodyOpacity: 0.55, floaty: true },
    botanic:  { name: 'Botanic',  ico: '🌿', desc: 'a sprouting plant kitten',         glow: 'rgba(120,255,120,0.7)', bodyOpacity: 1, leaf: true },
};

const PATTERNS = {
    solid:   { name: 'Solid',   ico: '⬤' },
    tabby:   { name: 'Tabby',   ico: '〰️' },
    spots:   { name: 'Spotted', ico: '🔵' },
    patches: { name: 'Patched', ico: '🐾' },
    galaxy:  { name: 'Starry',  ico: '✨' },
    rainbow: { name: 'Prismatic', ico: '🌈' },
    aura:    { name: 'Aura',    ico: '💫' },
};

const SIZES = {
    teacup:   { name: 'Teacup',   ico: '🤏', scale: 0.62 },
    small:    { name: 'Small',    ico: '🐈', scale: 0.8  },
    medium:   { name: 'Medium',   ico: '🐱', scale: 1.0  },
    large:    { name: 'Large',    ico: '🐅', scale: 1.18 },
    chonk:    { name: 'Chonk',    ico: '🫃', scale: 1.32, chonk: true },
    colossal: { name: 'Colossal', ico: '🦁', scale: 1.5  },
};

const AGES = {
    kitten: { name: 'Kitten', ico: '🍼', headBoost: 1.18, glasses: false },
    young:  { name: 'Young',  ico: '🌱', headBoost: 1.06, glasses: false },
    adult:  { name: 'Adult',  ico: '⭐', headBoost: 1.0,  glasses: false },
    elder:  { name: 'Elder',  ico: '🎩', headBoost: 0.98, glasses: true },
};

const PERSONALITIES = {
    playful:      { name: 'Playful',      ico: '🤸', expr: 'happy',  hint: 'Bursting with zoomies. Loves to play.' },
    lazy:         { name: 'Lazy',         ico: '😴', expr: 'sleepy', hint: 'A professional napper. Energy drains slower.' },
    curious:      { name: 'Curious',      ico: '🔍', expr: 'wide',   hint: 'Wide-eyed and into everything.' },
    grumpy:       { name: 'Grumpy',       ico: '😾', expr: 'grumpy', hint: 'Judging you. Quietly. Constantly.' },
    affectionate: { name: 'Affectionate', ico: '🥰', expr: 'happy',  hint: 'A love sponge. Bonds with you quickly.' },
    mischievous:  { name: 'Mischievous',  ico: '😼', expr: 'smug',   hint: 'Chaos incarnate. Plotting something.' },
};

const DIETS = {
    fish:      { name: 'Fish',      ico: '🐟' },
    stardust:  { name: 'Stardust',  ico: '✨' },
    greens:    { name: 'Greens',    ico: '🥬' },
    lightning: { name: 'Lightning', ico: '⚡' },
    gems:      { name: 'Gems',      ico: '💎' },
    berries:   { name: 'Berries',   ico: '🫐' },
    moonbeams: { name: 'Moonbeams', ico: '🌙' },
    cream:     { name: 'Cream',     ico: '🥛' },
};

const FUR_SWATCHES   = ['#ff9ad1','#ffb86b','#ffe46b','#9dff8a','#6be0ff','#9d8aff','#ff6b6b','#ffffff','#1f1f2e','#c8956b','#b0b6c8','#ff5cc8'];
const ACCENT_SWATCHES= ['#5b3a8f','#2a2a44','#ffffff','#ff6b9d','#3a7bd5','#27c46b','#ffd45c','#e85d75','#7a4a2a','#000000','#6be0ff','#ff8a3a'];
const EYE_SWATCHES   = ['#ffd45c','#6be0ff','#9dff5c','#ff6bba','#9d6bff','#ff5c5c','#ffffff','#27c46b','#ff8a3a'];

/* ---------------------------------------------------------------
   STATE
   --------------------------------------------------------------- */
const defaultCat = () => ({
    name: '',
    type: 'cosmic',
    pattern: 'galaxy',
    fur: '#9d8aff',
    accent: '#5b3a8f',
    eye: '#6be0ff',
    size: 'medium',
    age: 'kitten',
    personality: 'playful',
    diet: 'stardust',
});

let cat = defaultCat();
let care = null;          // {hunger,happiness,energy,cleanliness,bond,sleeping,bornAt,lastSeen}
let careTimer = null;
let blinkTimer = null;
const SAVE_KEY = 'catlab.save.v1';

/* ---------------------------------------------------------------
   COLOR HELPERS
   --------------------------------------------------------------- */
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    return { r: parseInt(hex.slice(0,2),16), g: parseInt(hex.slice(2,4),16), b: parseInt(hex.slice(4,6),16) };
}
function rgbToHex(r,g,b){ const h = n => Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,'0'); return `#${h(r)}${h(g)}${h(b)}`; }
function shade(hex, pct){ const {r,g,b} = hexToRgb(hex); const f = pct/100; return rgbToHex(r+(255-r)*Math.max(0,f) + r*Math.min(0,f), g+(255-g)*Math.max(0,f)+g*Math.min(0,f), b+(255-b)*Math.max(0,f)+b*Math.min(0,f)); }
function luminance(hex){ const {r,g,b} = hexToRgb(hex); return (0.299*r + 0.587*g + 0.114*b)/255; }

/* ---------------------------------------------------------------
   SVG CAT RENDERER  — the heart of the lab
   Renders a unique cat from a config object. `expr` overrides the
   facial expression (used by the care screen for moods).
   --------------------------------------------------------------- */
let uid = 0;
function renderCat(c, opts = {}) {
    const id = 'cat' + (uid++);
    const sizeData = SIZES[c.size] || SIZES.medium;
    const ageData = AGES[c.age] || AGES.adult;
    const typeData = TYPES[c.type] || TYPES.classic;
    const expr = opts.expr || (PERSONALITIES[c.personality] || PERSONALITIES.playful).expr;

    const fur = c.fur, accent = c.accent, eye = c.eye;
    const furLight = shade(fur, 28);
    const furDark = shade(fur, -30);
    const lineColor = luminance(fur) > 0.55 ? 'rgba(40,30,60,0.55)' : 'rgba(255,255,255,0.5)';

    const scale = sizeData.scale * (opts.scaleMul || 1);
    const headBoost = ageData.headBoost;
    const bodyW = sizeData.chonk ? 70 : 58;

    // --- defs: gradients, filters, clip ---
    let defs = `
      <radialGradient id="${id}-fur" cx="45%" cy="32%" r="75%">
        <stop offset="0%" stop-color="${furLight}"/>
        <stop offset="60%" stop-color="${fur}"/>
        <stop offset="100%" stop-color="${furDark}"/>
      </radialGradient>
      <radialGradient id="${id}-eye" cx="50%" cy="40%" r="70%">
        <stop offset="0%" stop-color="${shade(eye,55)}"/>
        <stop offset="70%" stop-color="${eye}"/>
        <stop offset="100%" stop-color="${shade(eye,-35)}"/>
      </radialGradient>`;

    if (typeData.glow) {
        defs += `<filter id="${id}-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="${typeData.floaty ? 5 : 3.2}" result="b"/>
            <feFlood flood-color="${typeData.glow}" result="col"/>
            <feComposite in="col" in2="b" operator="in" result="g"/>
            <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>`;
    }
    if (c.pattern === 'rainbow') {
        defs += `<linearGradient id="${id}-rain" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ff5c5c"/><stop offset="25%" stop-color="#ffd45c"/>
            <stop offset="50%" stop-color="#9dff5c"/><stop offset="75%" stop-color="#6be0ff"/>
            <stop offset="100%" stop-color="#c86bff"/></linearGradient>`;
    }

    // Silhouette clip (head + body + ears) so patterns stay on the cat
    const silhouette = `
        <ellipse cx="100" cy="150" rx="${bodyW}" ry="42"/>
        <circle cx="100" cy="${92}" r="${44*headBoost}"/>
        <path d="M66,58 L58,18 L92,44 Z"/>
        <path d="M134,58 L142,18 L108,44 Z"/>`;
    defs += `<clipPath id="${id}-clip">${silhouette}</clipPath>`;

    // --- pattern overlay (inside the clip) ---
    let pattern = '';
    if (c.pattern === 'tabby') {
        pattern = `
            <path d="M100,50 Q100,90 100,140" stroke="${furDark}" stroke-width="5" fill="none" opacity="0.6"/>
            <path d="M78,60 Q72,100 80,150" stroke="${furDark}" stroke-width="4" fill="none" opacity="0.5"/>
            <path d="M122,60 Q128,100 120,150" stroke="${furDark}" stroke-width="4" fill="none" opacity="0.5"/>
            <path d="M60,120 Q100,128 140,120" stroke="${furDark}" stroke-width="4" fill="none" opacity="0.45"/>
            <path d="M62,150 Q100,160 138,150" stroke="${furDark}" stroke-width="4" fill="none" opacity="0.45"/>`;
    } else if (c.pattern === 'spots') {
        const spots = [[78,78,7],[122,82,6],[100,120,8],[72,140,6],[128,138,7],[100,158,6],[88,98,4],[116,112,5]];
        pattern = spots.map(([x,y,r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${accent}" opacity="0.65"/>`).join('');
    } else if (c.pattern === 'patches') {
        pattern = `
            <ellipse cx="72" cy="84" rx="26" ry="30" fill="${accent}" opacity="0.85"/>
            <ellipse cx="118" cy="150" rx="34" ry="28" fill="${accent}" opacity="0.85"/>`;
    } else if (c.pattern === 'galaxy') {
        const stars = [[78,72],[120,80],[96,108],[70,130],[130,128],[104,150],[86,92],[122,144],[64,96],[136,104]];
        pattern = stars.map(([x,y],i) => i%3===0
            ? `<path d="M${x},${y-4} L${x+1.3},${y-1.3} L${x+4},${y} L${x+1.3},${y+1.3} L${x},${y+4} L${x-1.3},${y+1.3} L${x-4},${y} L${x-1.3},${y-1.3} Z" fill="#fff" opacity="0.95"/>`
            : `<circle cx="${x}" cy="${y}" r="1.6" fill="#fff" opacity="0.85"/>`).join('');
    } else if (c.pattern === 'rainbow') {
        pattern = `<rect x="40" y="20" width="120" height="180" fill="url(#${id}-rain)" opacity="0.5"/>`;
    } else if (c.pattern === 'aura') {
        pattern = `
            <circle cx="100" cy="120" r="40" fill="none" stroke="${shade(accent,30)}" stroke-width="3" opacity="0.4"/>
            <circle cx="100" cy="120" r="30" fill="none" stroke="${shade(accent,50)}" stroke-width="2" opacity="0.35"/>`;
    }

    // type-specific in-clip texture
    if (typeData.facets) {
        pattern += `<path d="M100,52 L80,110 L100,150 L120,110 Z" fill="#fff" opacity="0.12"/>
                    <path d="M80,60 L120,150" stroke="#fff" stroke-width="1.5" opacity="0.18"/>`;
    }

    // --- expression: eyes + mouth ---
    const eL = 84, eR = 116, eY = 88;
    const sleeping = !!opts.sleeping;
    let eyes, mouth = '', brows = '', extras = '';

    function eyeBall(cx, sclY = 1) {
        return `<g class="eye-group">
            <ellipse cx="${cx}" cy="${eY}" rx="9" ry="${11*sclY}" fill="#fff" opacity="0.95"/>
            <ellipse cx="${cx}" cy="${eY}" rx="6.5" ry="${8*sclY}" fill="url(#${id}-eye)"/>
            <ellipse cx="${cx}" cy="${eY+1}" rx="${2.6}" ry="${5.5*sclY}" fill="#10101e"/>
            <circle cx="${cx-2.5}" cy="${eY-3}" r="2" fill="#fff"/>
        </g>`;
    }
    const closedEye = cx => `<path d="M${cx-9},${eY} Q${cx},${eY+7} ${cx+9},${eY}" stroke="${lineColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    const happyEye = cx => `<path d="M${cx-9},${eY+2} Q${cx},${eY-9} ${cx+9},${eY+2}" stroke="#10101e" stroke-width="3" fill="none" stroke-linecap="round"/>`;

    if (sleeping || expr === 'sleepy') {
        eyes = closedEye(eL) + closedEye(eR);
        mouth = `<path d="M100,108 q5,4 10,0" stroke="${lineColor}" stroke-width="2" fill="none"/>`;
        if (sleeping) extras += `<text x="138" y="58" font-size="16" fill="${lineColor}" opacity="0.8" class="zzz">z</text>`;
    } else if (expr === 'happy') {
        eyes = happyEye(eL) + happyEye(eR);
        mouth = `<path d="M92,104 Q100,114 108,104" stroke="#10101e" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    } else if (expr === 'wide') {
        eyes = eyeBall(eL, 1.25) + eyeBall(eR, 1.25);
        mouth = `<ellipse cx="100" cy="106" rx="3.5" ry="4" fill="#10101e"/>`;
    } else if (expr === 'grumpy') {
        eyes = eyeBall(eL, 0.7) + eyeBall(eR, 0.7);
        brows = `<line x1="74" y1="74" x2="92" y2="80" stroke="#10101e" stroke-width="3" stroke-linecap="round"/>
                 <line x1="126" y1="74" x2="108" y2="80" stroke="#10101e" stroke-width="3" stroke-linecap="round"/>`;
        mouth = `<path d="M92,108 Q100,102 108,108" stroke="#10101e" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    } else if (expr === 'smug') {
        eyes = `<path d="M75,86 q9,-3 18,0" stroke="#10101e" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M107,86 q9,-3 18,0" stroke="#10101e" stroke-width="3" fill="none" stroke-linecap="round"/>`;
        mouth = `<path d="M90,104 Q100,112 112,103" stroke="#10101e" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    } else if (expr === 'sad') {
        eyes = eyeBall(eL, 1.1) + eyeBall(eR, 1.1);
        brows = `<line x1="76" y1="76" x2="92" y2="72" stroke="${lineColor}" stroke-width="2.5" stroke-linecap="round"/>
                 <line x1="124" y1="76" x2="108" y2="72" stroke="${lineColor}" stroke-width="2.5" stroke-linecap="round"/>`;
        mouth = `<path d="M92,110 Q100,103 108,110" stroke="#10101e" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
        extras += `<circle cx="${eR+6}" cy="${eY+8}" r="2.6" fill="#7ec8ff" opacity="0.85"/>`;
    } else { // normal
        eyes = eyeBall(eL) + eyeBall(eR);
        mouth = `<path d="M92,104 Q100,110 108,104" stroke="#10101e" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    }

    // nose + whiskers + cheeks
    const face = `
        ${brows}
        ${eyes}
        <path d="M97,98 L103,98 L100,102 Z" fill="#ff8aa8"/>
        ${mouth}
        <g stroke="${lineColor}" stroke-width="1.5" stroke-linecap="round" opacity="0.7">
            <line x1="70" y1="98" x2="50" y2="94"/><line x1="70" y1="102" x2="50" y2="104"/>
            <line x1="130" y1="98" x2="150" y2="94"/><line x1="130" y1="102" x2="150" y2="104"/>
        </g>
        ${(expr==='happy'||c.personality==='affectionate') ? `<ellipse cx="76" cy="100" rx="6" ry="4" fill="#ff6b9d" opacity="0.35"/><ellipse cx="124" cy="100" rx="6" ry="4" fill="#ff6b9d" opacity="0.35"/>` : ''}
        ${extras}`;

    // accessories
    let accessories = '';
    if (ageData.glasses) {
        accessories += `<g stroke="#10101e" stroke-width="2" fill="none" opacity="0.85">
            <circle cx="${eL}" cy="${eY}" r="13"/><circle cx="${eR}" cy="${eY}" r="13"/>
            <line x1="${eL+13}" y1="${eY}" x2="${eR-13}" y2="${eY}"/>
        </g>`;
    }
    if (typeData.leaf) {
        accessories += `<g transform="translate(100,46)">
            <path d="M0,0 Q-10,-16 0,-26 Q10,-16 0,0 Z" fill="#5fd06a"/>
            <path d="M0,-2 Q8,-12 2,-22" stroke="#2f8f3a" stroke-width="1.5" fill="none"/>
            <rect x="-1.5" y="-2" width="3" height="8" fill="#7a5a2a"/>
        </g>`;
    }

    // ambient type extras (outside clip)
    let ambient = '';
    if (typeData.bubbles) {
        ambient += [[150,70,4],[158,100,3],[46,120,3.5],[154,140,2.5]]
            .map(([x,y,r],i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#aeefff" opacity="0.5"><animate attributeName="cy" values="${y};${y-18};${y}" dur="${3+i}s" repeatCount="indefinite"/></circle>`).join('');
    }
    if (typeData.stars) {
        ambient += [[40,50],[160,46],[36,150],[166,158]]
            .map(([x,y],i) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#fff"><animate attributeName="opacity" values="0.2;1;0.2" dur="${2+i*0.5}s" repeatCount="indefinite"/></circle>`).join('');
    }
    if (typeData.flicker) {
        ambient += [[48,90],[152,96],[60,150],[140,150]]
            .map(([x,y],i) => `<path d="M${x},${y} q4,-8 0,-14 q-4,6 0,14 Z" fill="#ffb347" opacity="0.7"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="${0.8+i*0.2}s" repeatCount="indefinite"/></path>`).join('');
    }

    const filter = typeData.glow ? ` filter="url(#${id}-glow)"` : '';
    const bodyOpacity = typeData.bodyOpacity;
    const floatCls = typeData.floaty ? ' is-floaty' : '';
    const sleepCls = sleeping ? ' is-sleeping' : '';

    // tail
    const tail = `<g class="tail">
        <path d="M150,150 Q186,150 178,108 Q174,90 162,98 Q172,108 168,128 Q162,146 150,150 Z"
              fill="url(#${id}-fur)" opacity="${bodyOpacity}"/>
    </g>`;

    return `
    <svg class="cat-svg${floatCls}${sleepCls}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="${esc(c.name||'cat')}">
      <defs>${defs}</defs>
      <g transform="translate(100,108) scale(${scale}) translate(-100,-108)"${filter}>
        ${ambient}
        ${tail}
        <g class="breathe">
          <ellipse cx="100" cy="150" rx="${bodyW}" ry="42" fill="url(#${id}-fur)" opacity="${bodyOpacity}"/>
          <ellipse cx="80" cy="186" rx="13" ry="9" fill="${furDark}" opacity="${bodyOpacity}"/>
          <ellipse cx="120" cy="186" rx="13" ry="9" fill="${furDark}" opacity="${bodyOpacity}"/>
          <g class="ear-l"><path d="M66,58 L58,18 L92,44 Z" fill="url(#${id}-fur)" opacity="${bodyOpacity}"/>
            <path d="M68,52 L63,28 L84,44 Z" fill="${shade(accent,10)}" opacity="0.85"/></g>
          <g class="ear-r"><path d="M134,58 L142,18 L108,44 Z" fill="url(#${id}-fur)" opacity="${bodyOpacity}"/>
            <path d="M132,52 L137,28 L116,44 Z" fill="${shade(accent,10)}" opacity="0.85"/></g>
          <circle cx="100" cy="92" r="${44*headBoost}" fill="url(#${id}-fur)" opacity="${bodyOpacity}"/>
          <g clip-path="url(#${id}-clip)">${pattern}</g>
          ${accessories}
          ${face}
        </g>
      </g>
    </svg>`;
}

function esc(s){ return String(s).replace(/[<>&"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c])); }

/* ---------------------------------------------------------------
   DOM HELPERS
   --------------------------------------------------------------- */
const $ = id => document.getElementById(id);
const screens = ['title-screen','creator-screen','care-screen'];
function showScreen(name){
    screens.forEach(s => $(s).classList.toggle('active', s === name));
    window.scrollTo(0,0);
}

/* ---------------------------------------------------------------
   CREATOR UI
   --------------------------------------------------------------- */
function buildChips(rowId, table, key, withIco = true){
    const row = $(rowId);
    row.innerHTML = '';
    Object.entries(table).forEach(([k, v]) => {
        const b = document.createElement('button');
        b.className = 'chip' + (cat[key] === k ? ' active' : '');
        b.innerHTML = (withIco ? `<span class="chip-ico">${v.ico}</span>` : '') + v.name;
        b.onclick = () => {
            cat[key] = k;
            row.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            b.classList.add('active');
            if (key === 'personality') $('personality-hint').textContent = v.hint;
            updatePreview();
        };
        row.appendChild(b);
    });
}

function buildSwatches(rowId, colors, key, customInputId){
    const row = $(rowId);
    row.innerHTML = '';
    colors.forEach(col => {
        const s = document.createElement('button');
        s.className = 'swatch' + (cat[key].toLowerCase() === col.toLowerCase() ? ' active' : '');
        s.style.background = col;
        s.onclick = () => {
            cat[key] = col;
            if (customInputId) $(customInputId).value = col;
            row.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
            s.classList.add('active');
            updatePreview();
        };
        row.appendChild(s);
    });
}

function buildCreator(){
    buildChips('type-row', TYPES, 'type');
    buildChips('pattern-row', PATTERNS, 'pattern');
    buildChips('size-row', SIZES, 'size');
    buildChips('age-row', AGES, 'age');
    buildChips('personality-row', PERSONALITIES, 'personality');
    buildChips('diet-row', DIETS, 'diet');
    buildSwatches('fur-swatches', FUR_SWATCHES, 'fur', 'fur-custom');
    buildSwatches('accent-swatches', ACCENT_SWATCHES, 'accent', 'accent-custom');
    buildSwatches('eye-swatches', EYE_SWATCHES, 'eye', null);
    $('personality-hint').textContent = PERSONALITIES[cat.personality].hint;
    $('cat-name-input').value = cat.name;
    $('fur-custom').value = cat.fur;
    $('accent-custom').value = cat.accent;
    updatePreview();
}

function updatePreview(){
    $('creator-cat').innerHTML = renderCat(cat, { scaleMul: 0.9 });
    const t = TYPES[cat.type], p = PERSONALITIES[cat.personality], d = DIETS[cat.diet];
    $('preview-summary').innerHTML =
        `A <b>${SIZES[cat.size].name.toLowerCase()}</b> ${AGES[cat.age].name.toLowerCase()} ${t.name} cat — ${t.desc}.<br>` +
        `${p.name}, with a taste for ${d.name.toLowerCase()} ${d.ico}`;
}

/* ---------------------------------------------------------------
   CARE / NURSERY
   --------------------------------------------------------------- */
function startCare(fresh){
    if (fresh){
        care = { hunger:85, happiness:80, energy:80, cleanliness:90, bond:5, sleeping:false, bornAt:Date.now(), lastSeen:Date.now() };
    }
    applyOfflineDecay();
    $('feed-icon').textContent = DIETS[cat.diet].ico;
    $('care-name').textContent = cat.name || 'Your Cat';
    $('care-traits').textContent = `${TYPES[cat.type].name} · ${SIZES[cat.size].name} · ${PERSONALITIES[cat.personality].name}`;
    lastMoodKey = null;
    renderCareCat();
    refreshCare();
    showScreen('care-screen');
    save();

    clearInterval(careTimer);
    careTimer = setInterval(tick, 4000);
    clearTimeout(blinkTimer);
    scheduleBlink();
}

function applyOfflineDecay(){
    if (!care.lastSeen) return;
    const mins = (Date.now() - care.lastSeen) / 60000;
    if (mins < 0.1) return;
    const lazy = cat.personality === 'lazy' ? 0.6 : 1;
    care.hunger      = clamp(care.hunger      - mins * 0.9);
    care.happiness   = clamp(care.happiness   - mins * 0.7);
    care.energy      = care.sleeping ? clamp(care.energy + mins * 1.5) : clamp(care.energy - mins * 0.6 * lazy);
    care.cleanliness = clamp(care.cleanliness - mins * 0.5);
    care.lastSeen = Date.now();
}

function clamp(v){ return Math.max(0, Math.min(100, v)); }

function tick(){
    const lazy = cat.personality === 'lazy' ? 0.6 : 1;
    if (care.sleeping){
        care.energy = clamp(care.energy + 7);
        if (care.energy >= 100){ care.sleeping = false; toast('Yawn… all rested!'); renderCareCat(); }
    } else {
        care.energy = clamp(care.energy - 1.2 * lazy);
    }
    care.hunger = clamp(care.hunger - 1.6);
    care.happiness = clamp(care.happiness - 1.1 - (care.hunger < 25 ? 1.5 : 0) - (care.cleanliness < 25 ? 1 : 0));
    care.cleanliness = clamp(care.cleanliness - 0.9);
    care.lastSeen = Date.now();
    refreshCare();
    save();
}

function moodOf(){
    if (care.sleeping) return { key:'sleepy', emoji:'😴', text:'Fast asleep', expr:'sleepy' };
    if (care.energy < 16) return { key:'tired', emoji:'🥱', text:'Exhausted', expr:'sleepy' };
    if (care.hunger < 22) return { key:'hungry', emoji:'🙀', text:'Starving!', expr:'sad' };
    if (care.cleanliness < 22) return { key:'dirty', emoji:'🤢', text:'Feeling grubby', expr:'grumpy' };
    if (care.happiness < 28) return { key:'sad', emoji:'😿', text:'Sad', expr:'sad' };
    if (care.happiness > 82 && care.bond > 55) return { key:'love', emoji:'😻', text:'Overjoyed!', expr:'happy' };
    if (care.happiness > 60) return { key:'happy', emoji:'😺', text:'Happy', expr:'happy' };
    const pe = PERSONALITIES[cat.personality].expr;
    const map = { grumpy:{emoji:'😼',text:'Unimpressed'}, smug:{emoji:'😼',text:'Plotting'}, wide:{emoji:'🐱',text:'Curious'}, sleepy:{emoji:'😌',text:'Relaxed'} };
    const m = map[pe] || { emoji:'😸', text:'Content' };
    return { key:'content', emoji:m.emoji, text:m.text, expr: pe === 'happy' ? 'normal' : pe };
}

let lastMoodKey = null;
function renderCareCat(){
    const mood = moodOf();
    $('care-cat').innerHTML = renderCat(cat, { expr: mood.expr, sleeping: care.sleeping, scaleMul: 1 });
    $('care-stage').classList.toggle('sleeping', care.sleeping);
}

function refreshCare(){
    const mood = moodOf();
    if (mood.key !== lastMoodKey){
        $('mood-emoji').textContent = mood.emoji;
        $('mood-emoji').style.animation = 'none'; void $('mood-emoji').offsetWidth; $('mood-emoji').style.animation = '';
        $('mood-text').textContent = mood.text;
        renderCareCat();
        lastMoodKey = mood.key;
    }
    setBar('hunger', care.hunger);
    setBar('happiness', care.happiness);
    setBar('energy', care.energy);
    setBar('cleanliness', care.cleanliness);
    setBar('bond', care.bond);

    const days = Math.floor((Date.now() - care.bornAt) / 86400000) + 1;
    $('care-days').textContent = 'Day ' + days;
    $('care-age-label').textContent = AGES[cat.age].name;

    document.querySelectorAll('.care-action').forEach(b => {
        const a = b.dataset.action;
        b.disabled = care.sleeping && a !== 'sleep';
    });
    $('sleep-icon').textContent = care.sleeping ? '☀️' : '🌙';
    $('sleep-label').textContent = care.sleeping ? 'Wake' : 'Sleep';
}

function setBar(stat, val){
    const bar = $(stat + '-bar');
    bar.style.width = val + '%';
    bar.classList.remove('high','mid','low');
    bar.classList.add(val > 55 ? 'high' : val > 28 ? 'mid' : 'low');
    $(stat + '-num').textContent = Math.round(val);
}

/* ---- actions ---- */
const ACTION_LINES = {
    feed:  ['Nom nom nom!', 'So tasty!', 'More please!'],
    play:  ['Wheee!', 'Zoomies!', 'Got it!'],
    pet:   ['Purrrr…', '*headbutt*', 'Purr purr purr'],
    groom: ['So fresh!', 'Sparkly clean!', '*preens*'],
    treat: ['A treat?! Yes!', 'Spoiled rotten 💕', 'Yummy!'],
};

function doAction(action){
    if (care.sleeping && action !== 'sleep') return;
    let particles = [], react = 'react-happy';

    switch(action){
        case 'feed':
            if (care.hunger > 96){ toast('Too full to eat!'); return; }
            care.hunger = clamp(care.hunger + 28);
            care.happiness = clamp(care.happiness + 4);
            particles = [DIETS[cat.diet].ico, DIETS[cat.diet].ico, '😋'];
            break;
        case 'play':
            if (care.energy < 14){ toast('Too sleepy to play…'); return; }
            care.happiness = clamp(care.happiness + 18);
            care.energy = clamp(care.energy - 14);
            care.hunger = clamp(care.hunger - 5);
            care.bond = clamp(care.bond + 9);
            particles = ['🧶','⭐','💫']; react = 'react-wiggle';
            break;
        case 'pet':
            care.happiness = clamp(care.happiness + 10);
            care.bond = clamp(care.bond + 7);
            care.energy = clamp(care.energy - 2);
            particles = ['💕','💗','✨'];
            break;
        case 'groom':
            if (care.cleanliness > 96){ toast('Already spotless!'); return; }
            care.cleanliness = clamp(care.cleanliness + 34);
            care.happiness = clamp(care.happiness + 4);
            particles = ['🫧','✨','🛁'];
            break;
        case 'treat':
            care.happiness = clamp(care.happiness + 15);
            care.hunger = clamp(care.hunger + 10);
            care.cleanliness = clamp(care.cleanliness - 4);
            care.bond = clamp(care.bond + 5);
            particles = ['🍬','😻','💕'];
            break;
        case 'sleep':
            care.sleeping = !care.sleeping;
            renderCareCat();
            toast(care.sleeping ? 'Nighty night… 💤' : 'Good morning! ☀️');
            refreshCare(); save();
            return;
    }

    care.lastSeen = Date.now();
    const line = ACTION_LINES[action];
    if (line) speak(line[Math.floor(Math.random()*line.length)]);
    spawnParticles(particles);
    const el = $('care-cat');
    el.classList.remove('react-happy','react-wiggle'); void el.offsetWidth; el.classList.add(react);
    refreshCare();
    save();
}

function spawnParticles(emojis){
    const layer = $('particle-layer');
    emojis.forEach((e, i) => {
        setTimeout(() => {
            const p = document.createElement('div');
            p.className = 'particle';
            p.textContent = e;
            p.style.left = (35 + Math.random()*30) + '%';
            p.style.top = (45 + Math.random()*15) + '%';
            p.style.setProperty('--rot', (Math.random()*40 - 20) + 'deg');
            layer.appendChild(p);
            setTimeout(() => p.remove(), 1400);
        }, i * 120);
    });
}

let speakTimer = null;
function speak(text){
    const b = $('speech-bubble');
    b.textContent = text;
    b.classList.remove('hidden');
    b.style.animation = 'none'; void b.offsetWidth; b.style.animation = '';
    clearTimeout(speakTimer);
    speakTimer = setTimeout(() => b.classList.add('hidden'), 1800);
}
function toast(text){ speak(text); }

function scheduleBlink(){
    const delay = 2500 + Math.random()*3000;
    blinkTimer = setTimeout(() => {
        const g = document.querySelectorAll('#care-cat .eye-group');
        g.forEach(e => e.classList.add('blink'));
        setTimeout(() => g.forEach(e => e.classList.remove('blink')), 130);
        scheduleBlink();
    }, delay);
}

/* ---------------------------------------------------------------
   PERSISTENCE
   --------------------------------------------------------------- */
function save(){
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ cat, care })); } catch(e){}
}
function load(){
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch(e){ return null; }
}

/* ---------------------------------------------------------------
   RANDOMIZER
   --------------------------------------------------------------- */
function randomKey(obj){ const k = Object.keys(obj); return k[Math.floor(Math.random()*k.length)]; }
function randomColor(){ return rgbToHex(Math.random()*255, Math.random()*255, Math.random()*255); }
const CUTE_NAMES = ['Nebula','Pixel','Mochi','Sirius','Glimmer','Biscuit','Zephyr','Luna','Comet','Pudding','Wasabi','Echo','Nimbus','Tofu','Quartz','Bramble'];

function randomize(){
    cat.type = randomKey(TYPES);
    cat.pattern = randomKey(PATTERNS);
    cat.size = randomKey(SIZES);
    cat.age = randomKey(AGES);
    cat.personality = randomKey(PERSONALITIES);
    cat.diet = randomKey(DIETS);
    cat.fur = Math.random() < 0.6 ? FUR_SWATCHES[Math.floor(Math.random()*FUR_SWATCHES.length)] : randomColor();
    cat.accent = ACCENT_SWATCHES[Math.floor(Math.random()*ACCENT_SWATCHES.length)];
    cat.eye = EYE_SWATCHES[Math.floor(Math.random()*EYE_SWATCHES.length)];
    if (!cat.name) cat.name = CUTE_NAMES[Math.floor(Math.random()*CUTE_NAMES.length)];
    buildCreator();
}

/* ---------------------------------------------------------------
   AMBIENT BACKGROUND PARTICLES
   --------------------------------------------------------------- */
function initBgParticles(){
    const c = $('bg-particles');
    for (let i = 0; i < 26; i++){
        const p = document.createElement('div');
        p.className = 'bgp';
        const s = 1 + Math.random()*3;
        p.style.width = p.style.height = s + 'px';
        p.style.left = Math.random()*100 + '%';
        p.style.top = (100 + Math.random()*30) + '%';
        p.style.animationDuration = (10 + Math.random()*16) + 's';
        p.style.animationDelay = (-Math.random()*20) + 's';
        c.appendChild(p);
    }
}

/* ---------------------------------------------------------------
   WIRING
   --------------------------------------------------------------- */
function refreshContinue(){
    const s = load();
    if (s && s.cat && s.care){
        $('continue-btn').classList.remove('hidden');
        $('continue-name').textContent = s.cat.name || 'your cat';
    } else {
        $('continue-btn').classList.add('hidden');
    }
}

function init(){
    initBgParticles();
    refreshContinue();

    $('new-btn').onclick = () => { cat = defaultCat(); buildCreator(); showScreen('creator-screen'); };
    $('continue-btn').onclick = () => {
        const s = load();
        if (s){ cat = Object.assign(defaultCat(), s.cat); care = s.care; startCare(false); }
    };
    $('back-to-title').onclick = () => { refreshContinue(); showScreen('title-screen'); };
    $('randomize-btn').onclick = randomize;
    $('bring-to-life-btn').onclick = () => {
        if (!cat.name.trim()) cat.name = CUTE_NAMES[Math.floor(Math.random()*CUTE_NAMES.length)];
        startCare(true);
    };
    $('new-cat-btn').onclick = () => {
        clearInterval(careTimer); clearTimeout(blinkTimer);
        refreshContinue();
        showScreen('title-screen');
    };

    $('cat-name-input').addEventListener('input', e => { cat.name = e.target.value; });
    $('fur-custom').addEventListener('input', e => {
        cat.fur = e.target.value;
        $('fur-swatches').querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
        updatePreview();
    });
    $('accent-custom').addEventListener('input', e => {
        cat.accent = e.target.value;
        $('accent-swatches').querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
        updatePreview();
    });

    document.querySelectorAll('.care-action').forEach(b => {
        b.addEventListener('click', () => doAction(b.dataset.action));
    });

    // decorative cat on the title screen
    $('logo-cat').innerHTML = renderCat(
        { name:'', type:'cosmic', pattern:'galaxy', fur:'#9d8aff', accent:'#5b3a8f', eye:'#6be0ff', size:'medium', age:'kitten', personality:'playful', diet:'stardust' },
        { expr:'happy', scaleMul: 0.95 }
    );

    window.addEventListener('beforeunload', () => { if (care) { care.lastSeen = Date.now(); save(); } });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
