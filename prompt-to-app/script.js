/* ═══════════════════════════════════════════
   PROMPT TO APP — Animation Script
   Phases:
     1. Prompt typing
     2. AI processing
     3. File tree + code generation
     4. App preview reveal
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

// ── Helpers ──────────────────────────────

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function typeText(el, text, speed = 40) {
  return new Promise(resolve => {
    let i = 0;
    const iv = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        clearInterval(iv);
        resolve();
      }
    }, speed);
  });
}

function show(el, cls = 'visible') {
  el.classList.add(cls);
}

function hide(el, cls = 'visible') {
  el.classList.remove(cls);
}

// ── Particles ────────────────────────────

function spawnParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    container.appendChild(p);
  }
}

// ── Code Content ─────────────────────────

const CODE_HOME = [
  { text: '<span class="kw">import</span> React <span class="kw">from</span> <span class="str">\'react\'</span>;' },
  { text: '<span class="kw">import</span> { <span class="fn">Link</span> } <span class="kw">from</span> <span class="str">\'react-router-dom\'</span>;' },
  { text: '' },
  { text: '<span class="kw">export default function</span> <span class="fn">Home</span>() {' },
  { text: '  <span class="kw">return</span> (' },
  { text: '    <span class="op">&lt;</span><span class="tag">div</span> <span class="attr">className</span>=<span class="str">"hero"</span><span class="op">&gt;</span>' },
  { text: '      <span class="op">&lt;</span><span class="tag">h1</span><span class="op">&gt;</span>Bienvenue<span class="op">&lt;/</span><span class="tag">h1</span><span class="op">&gt;</span>' },
  { text: '      <span class="op">&lt;</span><span class="tag">p</span><span class="op">&gt;</span>Votre app, prête à l\'emploi.<span class="op">&lt;/</span><span class="tag">p</span><span class="op">&gt;</span>' },
  { text: '      <span class="op">&lt;</span><span class="fn">Link</span> <span class="attr">to</span>=<span class="str">"/login"</span><span class="op">&gt;</span>' },
  { text: '        <span class="op">&lt;</span><span class="tag">button</span><span class="op">&gt;</span>Commencer<span class="op">&lt;/</span><span class="tag">button</span><span class="op">&gt;</span>' },
  { text: '      <span class="op">&lt;/</span><span class="fn">Link</span><span class="op">&gt;</span>' },
  { text: '    <span class="op">&lt;/</span><span class="tag">div</span><span class="op">&gt;</span>' },
  { text: '  );' },
  { text: '}' },
];

const CODE_AUTH = [
  { text: '<span class="kw">import</span> { <span class="fn">createContext</span>, <span class="fn">useState</span> }' },
  { text: '  <span class="kw">from</span> <span class="str">\'react\'</span>;' },
  { text: '' },
  { text: '<span class="kw">export const</span> <span class="fn">AuthContext</span> =' },
  { text: '  <span class="fn">createContext</span>(<span class="num">null</span>);' },
  { text: '' },
  { text: '<span class="kw">export function</span> <span class="fn">AuthProvider</span>({ children }) {' },
  { text: '  <span class="kw">const</span> [<span class="pr">user</span>, <span class="fn">setUser</span>] =' },
  { text: '    <span class="fn">useState</span>(<span class="num">null</span>);' },
  { text: '' },
  { text: '  <span class="kw">const</span> <span class="fn">login</span> = <span class="kw">async</span> (email, pwd) <span class="op">=&gt;</span> {' },
  { text: '    <span class="kw">const</span> <span class="pr">res</span> = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">\'/api/login\'</span>, {' },
  { text: '      method: <span class="str">\'POST\'</span>,' },
  { text: '      body: <span class="fn">JSON.stringify</span>({ email, pwd })' },
  { text: '    });' },
  { text: '    <span class="fn">setUser</span>(<span class="kw">await</span> <span class="pr">res</span>.<span class="fn">json</span>());' },
  { text: '  };' },
  { text: '' },
  { text: '  <span class="kw">return</span> (' },
  { text: '    <span class="op">&lt;</span><span class="fn">AuthContext.Provider</span>' },
  { text: '      <span class="attr">value</span>={{ <span class="pr">user</span>, <span class="fn">login</span> }}<span class="op">&gt;</span>' },
  { text: '      { children }' },
  { text: '    <span class="op">&lt;/</span><span class="fn">AuthContext.Provider</span><span class="op">&gt;</span>' },
  { text: '  );' },
  { text: '}' },
];

const CODE_DB = [
  { text: '<span class="cm">// schema.prisma</span>' },
  { text: '' },
  { text: '<span class="kw">datasource</span> <span class="fn">db</span> {' },
  { text: '  <span class="pr">provider</span> = <span class="str">"postgresql"</span>' },
  { text: '  <span class="pr">url</span>      = <span class="fn">env</span>(<span class="str">"DATABASE_URL"</span>)' },
  { text: '}' },
  { text: '' },
  { text: '<span class="kw">generator</span> <span class="fn">client</span> {' },
  { text: '  <span class="pr">provider</span> = <span class="str">"prisma-client-js"</span>' },
  { text: '}' },
  { text: '' },
  { text: '<span class="kw">model</span> <span class="tp">User</span> {' },
  { text: '  <span class="pr">id</span>        <span class="tp">Int</span>      <span class="dec">@id</span> <span class="dec">@default</span>(<span class="fn">autoincrement</span>())' },
  { text: '  <span class="pr">email</span>     <span class="tp">String</span>   <span class="dec">@unique</span>' },
  { text: '  <span class="pr">password</span>  <span class="tp">String</span>' },
  { text: '  <span class="pr">name</span>      <span class="tp">String</span>?' },
  { text: '  <span class="pr">createdAt</span> <span class="tp">DateTime</span> <span class="dec">@default</span>(<span class="fn">now</span>())' },
  { text: '  <span class="pr">posts</span>     <span class="tp">Post</span>[]' },
  { text: '}' },
  { text: '' },
  { text: '<span class="kw">model</span> <span class="tp">Post</span> {' },
  { text: '  <span class="pr">id</span>        <span class="tp">Int</span>      <span class="dec">@id</span> <span class="dec">@default</span>(<span class="fn">autoincrement</span>())' },
  { text: '  <span class="pr">title</span>     <span class="tp">String</span>' },
  { text: '  <span class="pr">content</span>   <span class="tp">String</span>?' },
  { text: '  <span class="pr">author</span>    <span class="tp">User</span>     <span class="dec">@relation</span>(<span class="pr">fields</span>: [<span class="pr">authorId</span>], <span class="pr">references</span>: [<span class="pr">id</span>])' },
  { text: '  <span class="pr">authorId</span>  <span class="tp">Int</span>' },
  { text: '}' },
];

// ── Write Code to Panel ──────────────────

async function writeCode(containerId, lines, lineDelay = 60) {
  const container = document.getElementById(containerId);
  for (const line of lines) {
    const div = document.createElement('div');
    div.className = 'code-line';
    div.innerHTML = line.text || '&nbsp;';
    container.appendChild(div);
    await wait(lineDelay);
    div.classList.add('visible');
  }
}

// ── Energy Lines ─────────────────────────

function spawnEnergyLine() {
  const container = document.getElementById('energyLines');
  const line = document.createElement('div');
  line.className = 'energy-line';
  const y = 100 + Math.random() * 880;
  const width = 200 + Math.random() * 400;
  line.style.top = y + 'px';
  line.style.left = '-' + width + 'px';
  line.style.width = width + 'px';
  container.appendChild(line);

  line.animate([
    { left: -width + 'px', opacity: 0 },
    { left: '20%', opacity: .6 },
    { left: '110%', opacity: 0 },
  ], { duration: 1500 + Math.random() * 1000, easing: 'ease-in-out' })
    .onfinish = () => line.remove();
}

// ── Main Timeline ────────────────────────

async function run() {
  autoScale();
  spawnParticles();

  const fadeOverlay = document.getElementById('fadeOverlay');
  const promptBox = document.getElementById('promptBox');
  const promptText = document.getElementById('promptText');
  const promptSend = document.getElementById('promptSend');
  const aiProcessing = document.getElementById('aiProcessing');
  const aiStatus = document.getElementById('aiStatus');
  const aiSteps = document.querySelectorAll('.ai-step');
  const fileTreePanel = document.getElementById('fileTreePanel');
  const treeItems = document.querySelectorAll('.tree-item');
  const codePanels = document.getElementById('codePanels');
  const panels = document.querySelectorAll('.code-panel');
  const appPreview = document.getElementById('appPreview');
  const successBadge = document.getElementById('successBadge');

  // ── Fade in
  await wait(200);
  show(fadeOverlay, 'clear');
  await wait(400);

  // ── Phase 1: Prompt typing (~2s)
  show(promptBox);
  await wait(250);

  const promptMessage = "Crée-moi une application web avec une page d'accueil, un système d'authentification et une base de données";
  await typeText(promptText, promptMessage, 12);
  await wait(150);

  // Show send button
  show(promptSend);
  await wait(200);

  // "Send" — pulse + shrink
  promptSend.style.transform = 'scale(1.3)';
  await wait(100);
  promptBox.classList.add('sent');
  await wait(350);

  // ── Phase 2: AI Processing (~1.8s)
  show(aiProcessing);
  await wait(200);

  // Step-by-step analysis
  for (let i = 0; i < aiSteps.length; i++) {
    aiSteps[i].classList.add('active');
    if (i === 0) aiStatus.textContent = 'Analyse de la demande...';
    if (i === 1) aiStatus.textContent = 'Conception de l\'architecture...';
    if (i === 2) aiStatus.textContent = 'Génération du code...';

    // Spawn energy lines during processing
    for (let j = 0; j < 2; j++) {
      spawnEnergyLine();
      await wait(80);
    }

    await wait(200);
    aiSteps[i].classList.remove('active');
    aiSteps[i].classList.add('done');
    aiSteps[i].querySelector('.step-icon').innerHTML = '&#10003;';
    await wait(100);
  }

  await wait(150);
  hide(aiProcessing);
  await wait(200);

  // ── Phase 3: File tree + code (~1.5s)
  show(fileTreePanel);
  await wait(100);

  // Reveal tree items sequentially
  for (const item of treeItems) {
    item.classList.add('visible');
    await wait(30);
  }

  await wait(80);
  show(codePanels);
  await wait(80);

  // Show all panels at once, write code in parallel
  panels[0].classList.add('visible');
  panels[1].classList.add('visible');
  panels[2].classList.add('visible');

  const writeHome = writeCode('code1', CODE_HOME, 15);
  const writeAuth = writeCode('code2', CODE_AUTH, 12);
  const writeDb = writeCode('code3', CODE_DB, 10);

  // Keep spawning energy lines while code writes
  const energyIv = setInterval(() => spawnEnergyLine(), 150);

  await Promise.all([writeHome, writeAuth, writeDb]);
  clearInterval(energyIv);

  await wait(250);

  // ── Phase 4: App Preview (~1.5s)
  // Hide code panels + file tree
  codePanels.style.transition = 'opacity .3s ease, transform .3s ease';
  codePanels.style.opacity = '0';
  codePanels.style.transform = 'translateY(-50%) scale(.97)';
  fileTreePanel.style.transition = 'opacity .3s ease, transform .3s ease';
  fileTreePanel.style.opacity = '0';
  fileTreePanel.style.transform = 'translateY(-50%) translateX(-30px)';
  await wait(350);

  // Show the browser preview
  show(appPreview);
  await wait(200);

  // Animate preview elements
  document.querySelector('.preview-nav').classList.add('visible');
  await wait(100);
  document.querySelector('.preview-hero').classList.add('visible');
  await wait(150);

  const cards = document.querySelectorAll('.preview-card');
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add('visible');
    await wait(80);
  }

  await wait(200);

  // Success badge
  show(successBadge);

  // Final energy burst
  for (let i = 0; i < 4; i++) {
    spawnEnergyLine();
    await wait(50);
  }

  await wait(1200);

  // ── Fade out
  fadeOverlay.classList.remove('clear');
}

// ── Start ────────────────────────────────
document.addEventListener('DOMContentLoaded', run);
