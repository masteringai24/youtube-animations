// ===== AI Developer Workspace - Animation Controller =====

const TOTAL_DURATION = 25000; // 25 seconds

// ===== PARTICLE SYSTEM =====
function createBackgroundParticles() {
  const container = document.getElementById('particles');
  const count = 35;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.setProperty('--duration', (Math.random() * 4 + 4) + 's');
    p.style.setProperty('--delay', (Math.random() * 3) + 's');
    p.style.setProperty('--float-y', (-(Math.random() * 80 + 20)) + 'px');
    p.style.setProperty('--float-x', (Math.random() * 40 - 20) + 'px');
    p.style.setProperty('--max-opacity', (Math.random() * 0.4 + 0.2).toFixed(2));
    container.appendChild(p);
  }
}

// ===== AI ENTITY PARTICLES =====
function createAIParticles() {
  const container = document.getElementById('aiParticles');
  const count = 25;
  // Humanoid shape target positions (relative to center of ai-entity)
  const targets = [
    // Head
    { x: 0, y: -80 }, { x: -10, y: -85 }, { x: 10, y: -85 }, { x: -5, y: -75 }, { x: 5, y: -75 },
    // Neck
    { x: 0, y: -60 },
    // Torso
    { x: -15, y: -40 }, { x: 0, y: -40 }, { x: 15, y: -40 },
    { x: -20, y: -20 }, { x: 0, y: -20 }, { x: 20, y: -20 },
    { x: -15, y: 0 }, { x: 0, y: 0 }, { x: 15, y: 0 },
    // Arms
    { x: -40, y: -35 }, { x: -55, y: -25 }, { x: -65, y: -15 },
    { x: 40, y: -35 }, { x: 55, y: -25 }, { x: 65, y: -15 },
    // Extra glow points
    { x: -8, y: -50 }, { x: 8, y: -50 },
    { x: -25, y: -10 }, { x: 25, y: -10 }
  ];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'ai-particle';
    const size = Math.random() * 6 + 3;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = '30px';
    p.style.top = '30px';
    // Random start positions (scattered)
    const startX = (Math.random() * 400 - 200);
    const startY = (Math.random() * 400 - 200);
    const target = targets[i] || { x: Math.random() * 40 - 20, y: Math.random() * 40 - 20 };
    p.style.setProperty('--start-x', startX + 'px');
    p.style.setProperty('--start-y', startY + 'px');
    p.style.setProperty('--end-x', target.x + 'px');
    p.style.setProperty('--end-y', target.y + 'px');
    p.style.setProperty('--converge-delay', (Math.random() * 1.5) + 's');
    p.style.animationDelay = (Math.random() * 1.5) + 's';
    container.appendChild(p);
  }
}

// ===== TYPEWRITER EFFECT =====
function typewrite(elementId, text, speed, callback) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

// ===== CENTER SCREEN TYPEWRITER CODE =====
function typeCenterCode() {
  const container = document.getElementById('codeCenter');
  const lines = [
    { tokens: [{ t: 'keyword', v: 'export class ' }, { t: 'func', v: 'AIEngine' }, { t: 'brace', v: ' {' }] },
    { tokens: [{ t: '', v: '  ' }, { t: 'keyword', v: 'private ' }, { t: 'prop', v: 'model' }, { t: '', v: ': ' }, { t: 'func', v: 'NeuralNet' }, { t: '', v: ';' }] },
    { tokens: [{ t: '', v: '  ' }, { t: 'keyword', v: 'private ' }, { t: 'prop', v: 'context' }, { t: '', v: ': ' }, { t: 'func', v: 'ProjectContext' }, { t: '', v: ';' }] },
    { tokens: [] },
    { tokens: [{ t: '', v: '  ' }, { t: 'keyword', v: 'async ' }, { t: 'func', v: 'analyze' }, { t: 'brace', v: '(' }, { t: 'prop', v: 'code' }, { t: '', v: ': ' }, { t: 'func', v: 'string' }, { t: 'brace', v: ')' }, { t: 'brace', v: ' {' }] },
    { tokens: [{ t: '', v: '    ' }, { t: 'keyword', v: 'const ' }, { t: 'prop', v: 'tokens' }, { t: '', v: ' = ' }, { t: 'keyword', v: 'await ' }, { t: 'keyword', v: 'this' }, { t: '', v: '.' }, { t: 'func', v: 'tokenize' }, { t: 'brace', v: '(' }, { t: 'prop', v: 'code' }, { t: 'brace', v: ')' }, { t: '', v: ';' }] },
    { tokens: [{ t: '', v: '    ' }, { t: 'keyword', v: 'const ' }, { t: 'prop', v: 'ast' }, { t: '', v: ' = ' }, { t: 'keyword', v: 'this' }, { t: '', v: '.' }, { t: 'func', v: 'parse' }, { t: 'brace', v: '(' }, { t: 'prop', v: 'tokens' }, { t: 'brace', v: ')' }, { t: '', v: ';' }] },
    { tokens: [{ t: '', v: '    ' }, { t: 'keyword', v: 'return ' }, { t: 'keyword', v: 'this' }, { t: '', v: '.' }, { t: 'prop', v: 'model' }, { t: '', v: '.' }, { t: 'func', v: 'predict' }, { t: 'brace', v: '(' }, { t: 'prop', v: 'ast' }, { t: 'brace', v: ')' }, { t: '', v: ';' }] },
    { tokens: [{ t: '', v: '  ' }, { t: 'brace', v: '}' }] },
    { tokens: [] },
    { tokens: [{ t: '', v: '  ' }, { t: 'func', v: 'fixBug' }, { t: 'brace', v: '(' }, { t: 'prop', v: 'issue' }, { t: '', v: ': ' }, { t: 'func', v: 'Bug' }, { t: 'brace', v: ')' }, { t: '', v: ': ' }, { t: 'func', v: 'Fix' }, { t: 'brace', v: ' {' }] },
    { tokens: [{ t: '', v: '    ' }, { t: 'keyword', v: 'const ' }, { t: 'prop', v: 'patch' }, { t: '', v: ' = ' }, { t: 'keyword', v: 'this' }, { t: '', v: '.' }, { t: 'func', v: 'generatePatch' }, { t: 'brace', v: '(' }, { t: 'prop', v: 'issue' }, { t: 'brace', v: ')' }, { t: '', v: ';' }] },
    { tokens: [{ t: '', v: '    ' }, { t: 'keyword', v: 'return ' }, { t: 'prop', v: 'patch' }, { t: '', v: '.' }, { t: 'func', v: 'apply' }, { t: 'brace', v: '()' }, { t: '', v: ';' }] },
    { tokens: [{ t: '', v: '  ' }, { t: 'brace', v: '}' }] },
    { tokens: [{ t: 'brace', v: '}' }] },
  ];

  let lineIndex = 0;
  const lineDelay = 200;

  function addLine() {
    if (lineIndex >= lines.length) return;
    const lineData = lines[lineIndex];
    const div = document.createElement('div');
    div.className = 'code-line';
    div.style.opacity = '0';
    div.style.animation = 'codeLineAppear 0.3s ease forwards';

    lineData.tokens.forEach(token => {
      const span = document.createElement('span');
      if (token.t) span.className = token.t;
      span.textContent = token.v;
      div.appendChild(span);
    });

    container.appendChild(div);
    lineIndex++;
    setTimeout(addLine, lineDelay);
  }

  addLine();
}

// ===== TERMINAL COMMANDS =====
function runTerminalSequence() {
  const commands = [
    { id: 'cmd1', cursorId: 'cursor1', text: 'npm run build', output: 'output1', outputText: 'Build completed successfully.', outputClass: 'success' },
    { id: 'cmd2', cursorId: 'cursor2', lineId: 'termLine2', text: 'git add . && git commit -m "feat: add AI engine"', output: 'output2', outputText: '[main a3f7b2c] feat: add AI engine\n 3 files changed, 142 insertions(+)' },
    { id: 'cmd3', cursorId: 'cursor3', lineId: 'termLine3', text: 'git push origin main', output: 'output3', outputText: 'To github.com:dev/ai-workspace.git\n   b1c4e5d..a3f7b2c  main -> main' },
  ];

  let cmdIndex = 0;

  function runCommand() {
    if (cmdIndex >= commands.length) return;
    const cmd = commands[cmdIndex];
    if (cmd.lineId) {
      document.getElementById(cmd.lineId).style.display = 'block';
    }
    typewrite(cmd.id, cmd.text, 45, () => {
      // Hide cursor
      const cursor = document.getElementById(cmd.cursorId);
      if (cursor) cursor.style.display = 'none';

      // Show output after a brief pause
      setTimeout(() => {
        const output = document.getElementById(cmd.output);
        output.innerHTML = cmd.outputText.replace(/\n/g, '<br>');
        if (cmd.outputClass === 'success') {
          output.innerHTML += ' <span class="success-mark">&#10003;</span>';
        }
        output.classList.add('visible');
        cmdIndex++;
        setTimeout(runCommand, 600);
      }, 400);
    });
  }

  runCommand();
}

// ===== SVG PATH LENGTH SETUP =====
function setupGitPaths() {
  const paths = document.querySelectorAll('.git-path');
  paths.forEach(path => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });
}

// ===== PHASE ORCHESTRATION =====
function runTimeline() {
  const scene = document.getElementById('scene');

  const phases = [
    { time: 7000, cls: 'phase-ai-awake' },
    { time: 10000, cls: 'phase-ai-work' },
    { time: 12000, cls: 'phase-ai-work-fix' },
    { time: 14000, cls: 'phase-terminal' },
    { time: 17000, cls: 'phase-git' },
    { time: 21000, cls: 'phase-finale' },
    { time: 23500, cls: 'phase-fadeout' },
  ];

  phases.forEach(p => {
    setTimeout(() => scene.classList.add(p.cls), p.time);
  });

  // Start center screen typewriter at 4s
  setTimeout(typeCenterCode, 4000);

  // Start terminal at 14.5s
  setTimeout(runTerminalSequence, 14500);

  // Loop: reload the page after fade-to-black for a clean restart
  setTimeout(() => {
    location.reload();
  }, TOTAL_DURATION + 500);
}

// ===== INITIALIZATION =====
function init() {
  createBackgroundParticles();
  createAIParticles();
  setupGitPaths();
  runTimeline();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
