/* ═══════════════════════════════════════════
   CLAUDE CODE EVOLUTION — Animation Script
   Target duration: ~8 seconds
   Phases:
     1. Terminal CLI (Feb 2025)        ~2.5s
     2. Evolution pulse transition     ~1s
     3. Multi-platform reveal          ~3.5s
   ═══════════════════════════════════════════ */

// ── Auto-scale scene to fit viewport ─────
function autoScale() {
  const scene = document.querySelector('.scene');
  const scaleX = window.innerWidth / 1920;
  const scaleY = window.innerHeight / 1080;
  const scale = Math.min(scaleX, scaleY);
  scene.style.transform = `scale(${scale})`;
}
window.addEventListener('resize', autoScale);

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

function typeText(el, text, speed = 20) {
  return new Promise(resolve => {
    let i = 0;
    const iv = setInterval(() => {
      if (i < text.length) { el.textContent += text[i]; i++; }
      else { clearInterval(iv); resolve(); }
    }, speed);
  });
}

function show(el, cls = 'visible') { el.classList.add(cls); }

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

// ── Terminal output helper ────────────────

function addOutput(containerId, lines) {
  const container = document.getElementById(containerId);
  const frag = document.createDocumentFragment();
  lines.forEach(l => {
    const div = document.createElement('div');
    div.className = 'out-line' + (l.cls ? ' ' + l.cls : '');
    div.textContent = l.text;
    frag.appendChild(div);
  });
  container.appendChild(frag);
  return new Promise(async resolve => {
    const items = container.querySelectorAll('.out-line:not(.visible)');
    for (const item of items) {
      item.classList.add('visible');
      await wait(40);
    }
    resolve();
  });
}

// ── Main Timeline ────────────────────────

async function run() {
  autoScale();
  spawnParticles();

  const fadeOverlay    = document.getElementById('fadeOverlay');
  const phaseTerminal  = document.getElementById('phaseTerminal');
  const dateBadge      = document.getElementById('dateBadge');
  const terminal       = document.querySelector('.terminal');
  const evoPulse       = document.getElementById('evolutionPulse');
  const evoLabel       = document.getElementById('evoLabel');
  const platforms      = document.getElementById('platformsContainer');
  const platLabel      = document.getElementById('platformLabel');
  const connLines      = document.getElementById('connectionLines');

  // ── Fade in
  await wait(200);
  show(fadeOverlay, 'clear');
  await wait(400);

  // ════════════════════════════════════════
  // PHASE 1 — Terminal CLI  (~2.5s)
  // ════════════════════════════════════════
  show(phaseTerminal);
  await wait(150);
  show(dateBadge);
  await wait(250);
  show(terminal);
  await wait(300);

  // Command 1: npm install
  await typeText(document.getElementById('cmd1'), 'npm install -g @anthropic-ai/claude-code', 12);
  document.getElementById('cur1').style.display = 'none';
  await addOutput('out1', [
    { text: '+ @anthropic-ai/claude-code@0.1.0', cls: 'out-success' },
    { text: 'added 1 package in 2.3s', cls: 'out-dim' },
  ]);
  await wait(150);

  // Command 2: claude
  document.getElementById('tl2').classList.remove('hidden');
  await typeText(document.getElementById('cmd2'), 'claude', 18);
  document.getElementById('cur2').style.display = 'none';
  await addOutput('out2', [
    { text: '╭──────────────────────────────╮', cls: 'out-info' },
    { text: '│  Claude Code v0.1 — CLI Tool │', cls: 'out-info' },
    { text: '╰──────────────────────────────╯', cls: 'out-info' },
  ]);
  await wait(150);

  // Command 3
  document.getElementById('tl3').classList.remove('hidden');
  await typeText(document.getElementById('cmd3'), 'Crée un serveur Express...', 14);
  document.getElementById('cur3').style.display = 'none';
  await wait(300);

  // ════════════════════════════════════════
  // PHASE 2 — Evolution pulse  (~1s)
  // ════════════════════════════════════════
  phaseTerminal.classList.add('fade-out');
  await wait(300);

  show(evoPulse);
  document.querySelectorAll('.pulse-ring').forEach(r => r.classList.add('animate'));
  await wait(200);
  show(evoLabel);
  await wait(600);

  evoPulse.style.transition = 'opacity .3s ease';
  evoPulse.style.opacity = '0';
  await wait(350);

  // ════════════════════════════════════════
  // PHASE 3 — Multi-platform  (~3.5s)
  // ════════════════════════════════════════
  show(platforms);
  await wait(150);
  show(platLabel);
  await wait(200);

  // Reveal cards one by one
  const cards = ['cardBrowser', 'cardVscode', 'cardDesktop', 'cardIos'];
  for (const id of cards) {
    show(document.getElementById(id));
    await wait(250);
  }

  await wait(200);

  // Draw connection lines
  show(connLines);
  drawConnections();

  await wait(1800);

  // ── Fade out
  fadeOverlay.classList.remove('clear');
}

// ── Draw animated connection lines between cards ──

function drawConnections() {
  const svg = document.getElementById('connectionLines');
  const cards = ['cardBrowser', 'cardVscode', 'cardDesktop', 'cardIos'];
  const centers = cards.map(id => {
    const r = document.getElementById(id).getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });

  // Connect each pair of adjacent cards
  for (let i = 0; i < centers.length - 1; i++) {
    const a = centers[i], b = centers[i + 1];
    const mx = (a.x + b.x) / 2;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${a.x} ${a.y} Q ${mx} ${a.y - 60} ${b.x} ${b.y}`);
    path.setAttribute('class', 'conn-line');
    svg.appendChild(path);
  }

  // Also connect first to last in a big arc
  const first = centers[0], last = centers[centers.length - 1];
  const arcPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  arcPath.setAttribute('d', `M ${first.x} ${first.y} Q ${960} ${first.y + 180} ${last.x} ${last.y}`);
  arcPath.setAttribute('class', 'conn-line');
  svg.appendChild(arcPath);
}

// ── Start ────────────────────────────────
document.addEventListener('DOMContentLoaded', run);
