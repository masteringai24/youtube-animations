/* ═══════════════════════════════════════════
   AI OMNIPRESENCE — 5 cinematic scenes (~8s)
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

function spawnParticles() {
  const c = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = (Math.random() * 7) + 's';
    p.style.animationDuration = (5 + Math.random() * 5) + 's';
    c.appendChild(p);
  }
}

function spawnEnergyLine() {
  const c = document.getElementById('energyLines');
  const line = document.createElement('div');
  line.className = 'energy-line';
  const y = 80 + Math.random() * 920;
  const w = 250 + Math.random() * 500;
  line.style.top = y + 'px';
  line.style.left = '-' + w + 'px';
  line.style.width = w + 'px';
  c.appendChild(line);
  line.animate([
    { left: -w + 'px', opacity: 0 },
    { left: '20%', opacity: .7 },
    { left: '110%', opacity: 0 },
  ], { duration: 1100 + Math.random() * 800, easing: 'ease-in-out' })
    .onfinish = () => line.remove();
}

// ── Scene transitions ────────────────────
async function showScene(id, duration) {
  const stage = document.getElementById(id);
  stage.classList.add('active');
  // burst of energy lines on entry
  for (let i = 0; i < 3; i++) {
    spawnEnergyLine();
    await wait(80);
  }
  await wait(duration - 240);
}

async function exitScene(id) {
  const stage = document.getElementById(id);
  stage.classList.remove('active');
  stage.classList.add('exit');
  await wait(450);
  stage.style.display = 'none';
}

// ── Main timeline ────────────────────────
async function run() {
  autoScale();
  spawnParticles();

  const fade = document.getElementById('fadeOverlay');

  // Continuous ambient energy
  setInterval(spawnEnergyLine, 350);

  // Fade in
  await wait(150);
  fade.classList.add('clear');
  await wait(250);

  // ════════════════════════════════════════
  // SCENE 1 — Global network  (~1.6s)
  // ════════════════════════════════════════
  await showScene('stage1', 1600);
  await exitScene('stage1');

  // ════════════════════════════════════════
  // SCENE 2 — Code editor  (~1.7s)
  // ════════════════════════════════════════
  await showScene('stage2', 1700);
  await exitScene('stage2');

  // ════════════════════════════════════════
  // SCENE 3 — Cloud servers  (~1.5s)
  // ════════════════════════════════════════
  await showScene('stage3', 1500);
  await exitScene('stage3');

  // ════════════════════════════════════════
  // SCENE 4 — Smartphones  (~1.4s)
  // ════════════════════════════════════════
  await showScene('stage4', 1400);
  await exitScene('stage4');

  // ════════════════════════════════════════
  // SCENE 5 — Personal desktop  (~1.8s)
  // ════════════════════════════════════════
  await showScene('stage5', 1800);

  // Final fade out
  fade.classList.remove('clear');
}

document.addEventListener('DOMContentLoaded', run);
