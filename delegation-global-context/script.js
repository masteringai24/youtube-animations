/* ═══════════════════════════════════════════
   DELEGATION — GLOBAL CONTEXT
   ~8 seconds, 4 phases
   ═══════════════════════════════════════════ */

// ── Auto-scale ───────────────────────────
function autoScale() {
  const s = document.querySelector('.scene');
  const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  s.style.transform = `scale(${scale})`;
}
window.addEventListener('resize', autoScale);

// ── Helpers ──────────────────────────────
function wait(ms) { return new Promise(r => setTimeout(r, ms)); }
function show(el, cls = 'visible') { el.classList.add(cls); }
function hide(el, cls = 'visible') { el.classList.remove(cls); }

function spawnParticles() {
  const c = document.getElementById('particles');
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    c.appendChild(p);
  }
}

function spawnEnergyLine() {
  const c = document.getElementById('energyLines');
  const line = document.createElement('div');
  line.className = 'energy-line';
  const y = 100 + Math.random() * 880;
  const w = 200 + Math.random() * 400;
  line.style.top = y + 'px';
  line.style.left = '-' + w + 'px';
  line.style.width = w + 'px';
  c.appendChild(line);
  line.animate([
    { left: -w + 'px', opacity: 0 },
    { left: '20%', opacity: .6 },
    { left: '110%', opacity: 0 },
  ], { duration: 1200 + Math.random() * 800, easing: 'ease-in-out' })
    .onfinish = () => line.remove();
}

// ── Fly task cards from human to AI ──────
function flyCard(card, fromEl, toEl) {
  const from = fromEl.getBoundingClientRect();
  const to = toEl.getBoundingClientRect();
  const scene = document.querySelector('.scene').getBoundingClientRect();

  const startX = from.right - scene.left + 20;
  const startY = from.top + from.height / 2 - scene.top;
  const endX = to.left - scene.left - 30;
  const endY = to.top + to.height / 2 - scene.top;
  const midY = Math.min(startY, endY) - 60 - Math.random() * 40;

  card.style.position = 'absolute';
  card.style.left = startX + 'px';
  card.style.top = startY + 'px';
  card.style.opacity = '1';
  card.style.transform = 'none';
  card.style.zIndex = '20';

  return card.animate([
    { left: startX + 'px', top: startY + 'px', opacity: 1, transform: 'scale(1)' },
    { left: ((startX + endX) / 2) + 'px', top: midY + 'px', opacity: .9, transform: 'scale(.95)' },
    { left: endX + 'px', top: endY + 'px', opacity: 0, transform: 'scale(.3)' },
  ], { duration: 500, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }).finished;
}

// ── Draw SVG connections between file cards ──
function drawConnections() {
  const svg = document.getElementById('connectionsSvg');
  const cardsEl = document.getElementById('fileCards');
  const cardsRect = cardsEl.getBoundingClientRect();

  // Card centers relative to fileCards container
  function center(id) {
    const r = document.getElementById(id).getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - cardsRect.left,
      y: r.top + r.height / 2 - cardsRect.top
    };
  }

  const links = [
    ['fc0', 'fc1'], // index -> routes
    ['fc0', 'fc2'], // index -> auth
    ['fc0', 'fc3'], // index -> helpers
    ['fc1', 'fc2'], // routes -> auth
    ['fc1', 'fc3'], // routes -> helpers
    ['fc4', 'fc1'], // test -> routes
    ['fc2', 'fc3'], // auth -> helpers (env)
    ['fc0', 'fc4'], // index -> test
  ];

  const paths = [];
  links.forEach(([a, b]) => {
    const ca = center(a), cb = center(b);
    const mx = (ca.x + cb.x) / 2;
    const my = (ca.y + cb.y) / 2 - 25;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${ca.x} ${ca.y} Q ${mx} ${my} ${cb.x} ${cb.y}`);
    path.setAttribute('class', 'conn-line');
    svg.appendChild(path);
    paths.push(path);
  });

  return paths;
}

// ── Main Timeline ────────────────────────
async function run() {
  autoScale();
  spawnParticles();

  const fade       = document.getElementById('fadeOverlay');
  const human      = document.getElementById('humanFigure');
  const ai         = document.getElementById('aiEntity');
  const armRight   = document.getElementById('armRight');
  const aiCore     = document.querySelector('.ai-core');
  const taskCards  = document.querySelectorAll('.task-card');
  const projectMap = document.getElementById('projectMap');
  const treeItems  = document.querySelectorAll('.tree-item');
  const fileCards  = document.querySelectorAll('.file-card');
  const hlLabel    = document.getElementById('highlightLabel');
  const badge      = document.getElementById('successBadge');

  // ── Fade in
  await wait(200);
  show(fade, 'clear');
  await wait(350);

  // ════════════════════════════════════════
  // PHASE 1 — Figures appear  (~1.5s)
  // ════════════════════════════════════════
  show(human);
  await wait(300);
  show(ai);
  await wait(400);

  // Show task cards near the human
  for (const card of taskCards) {
    show(card);
    await wait(100);
  }
  await wait(300);

  // ════════════════════════════════════════
  // PHASE 2 — Delegation gesture  (~1.8s)
  // ════════════════════════════════════════
  // Human extends arm
  armRight.classList.add('extend');
  await wait(250);

  // Fly each task card to AI
  for (const card of taskCards) {
    flyCard(card, human, ai);
    spawnEnergyLine();
    await wait(180);
  }
  await wait(300);

  // AI absorbs — core pulses
  aiCore.classList.add('pulse');
  await wait(350);
  aiCore.classList.remove('pulse');
  await wait(200);

  // ════════════════════════════════════════
  // PHASE 3 — Global context reveal  (~3s)
  // ════════════════════════════════════════
  // Move figures to top corners
  human.classList.add('shrink-top');
  ai.classList.add('shrink-top');
  await wait(500);

  // Show project map
  show(projectMap);
  await wait(150);

  // File tree items
  for (const item of treeItems) {
    show(item);
    await wait(30);
  }
  await wait(150);

  // File cards — highlight one first, then all
  // Show only fc1 (routes.ts) first as "single file"
  const fc1 = document.getElementById('fc1');
  fc1.classList.add('visible', 'highlighted');
  await wait(300);

  // Brief "one file" label
  show(hlLabel);
  await wait(500);

  // Now reveal ALL cards
  for (const card of fileCards) {
    show(card);
    await wait(80);
  }
  fc1.classList.remove('highlighted');

  // All cards glow equally
  for (const card of fileCards) {
    card.classList.add('highlighted');
  }
  await wait(200);

  // Update label
  hide(hlLabel);
  await wait(100);

  // Remove glow from all
  for (const card of fileCards) {
    card.classList.remove('highlighted');
  }

  // Draw connections
  const paths = drawConnections();
  for (const p of paths) {
    p.classList.add('visible');
    spawnEnergyLine();
    await wait(60);
  }
  await wait(300);

  // ════════════════════════════════════════
  // PHASE 4 — Final emphasis  (~1.2s)
  // ════════════════════════════════════════
  // Final energy burst
  for (let i = 0; i < 5; i++) {
    spawnEnergyLine();
    await wait(60);
  }

  show(badge);
  await wait(1200);

  // Fade out
  fade.classList.remove('clear');
}

document.addEventListener('DOMContentLoaded', run);
