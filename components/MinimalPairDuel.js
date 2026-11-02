/**
 * MinimalPairDuel.js - Acoustic Minimal Pair Duel & Discrimination Arena (Bara tala Protocol)
 * Step 0.4: 6 Acoustic Minimal Pairs with Oscilloscope Waveform & Interactive Sound Discrimination Duel (+15 XP)
 */

import { audioEngine } from './AudioEngine.js?v=5.6';
import { gameState } from './GameState.js';

export class MinimalPairDuel {
  constructor(container, minimalPairsData) {
    this.container = container;
    this.pairs = minimalPairsData;
    this.currentPairIdx = 0;
    this.duelSecretTarget = null; // 'A' or 'B'
    this.duelSecretWord = null;
    this.duelAnswered = false;
  }

  render() {
    const p = this.pairs[this.currentPairIdx];

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-cyber-border/30">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Крок 0.4 • Bara tala Protocol
            </span>
            <h2 class="text-base sm:text-lg font-black text-white flex items-center gap-1.5 font-mono">
              <span>⚔️ Аудіо-дуель мінімальних пар & Звуковий дискримінатор</span>
            </h2>
          </div>
          <span class="text-xs font-mono text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30 font-bold">
            +15 XP за кожен правильний слуховий раунд
          </span>
        </div>

        <!-- 6 Minimal Pair Selector Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
          ${this.pairs.map((pair, idx) => `
            <button data-pair-idx="${idx}" class="duel-pair-tab px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${this.currentPairIdx === idx ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30' : 'bg-black/50 text-slate-400 border border-slate-800 hover:text-white'}">
              #${idx + 1}: ${pair.word_a.word} vs ${pair.word_b.word}
            </button>
          `).join('')}
        </div>

        <!-- Dual Word Comparison Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <!-- Word A -->
          <div id="pair-card-a" class="p-4 rounded-xl bg-black/60 border border-cyan-500/40 relative overflow-hidden group space-y-2">
            <div class="flex items-center justify-between text-[10px] font-mono">
              <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">Форма А</span>
              <span class="text-cyan-400 font-bold">${p.word_a.duration_ms} мс</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black text-white font-mono group-hover:text-cyan-300 transition-colors">
                ${p.word_a.word}
              </span>
              <span class="text-sm font-mono font-bold text-cyan-300">
                ${p.word_a.ipa}
              </span>
              <span class="text-xs text-slate-300 font-sans">«${p.word_a.meaning}»</span>
            </div>
            <div class="text-[11px] text-slate-400 font-sans border-t border-slate-800/80 pt-1.5">
              ${p.word_a.acoustic_desc}
            </div>
            <button id="play-word-a-btn" class="w-full py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-black font-bold font-mono text-xs flex items-center justify-center gap-1.5 transition-all">
              <span>🔊 Слухати Форму А [${p.word_a.word}]</span>
            </button>
          </div>

          <!-- Word B -->
          <div id="pair-card-b" class="p-4 rounded-xl bg-black/60 border border-rose-500/40 relative overflow-hidden group space-y-2">
            <div class="flex items-center justify-between text-[10px] font-mono">
              <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40">Форма B</span>
              <span class="text-rose-400 font-bold">${p.word_b.duration_ms} мс</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black text-white font-mono group-hover:text-rose-300 transition-colors">
                ${p.word_b.word}
              </span>
              <span class="text-sm font-mono font-bold text-rose-300">
                ${p.word_b.ipa}
              </span>
              <span class="text-xs text-slate-300 font-sans">«${p.word_b.meaning}»</span>
            </div>
            <div class="text-[11px] text-slate-400 font-sans border-t border-slate-800/80 pt-1.5">
              ${p.word_b.acoustic_desc}
            </div>
            <button id="play-word-b-btn" class="w-full py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500 border border-rose-500/40 hover:border-rose-400 text-rose-300 hover:text-black font-bold font-mono text-xs flex items-center justify-center gap-1.5 transition-all">
              <span>🔊 Слухати Форму B [${p.word_b.word}]</span>
            </button>
          </div>
        </div>

        <!-- Sequential Contrast Trigger -->
        <div class="flex items-center justify-center">
          <button id="play-compare-sequence-btn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-rose-500 text-black font-extrabold text-xs uppercase tracking-wider font-mono shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <span>⚡ Відтворити послідовний контраст A ➔ B</span>
          </button>
        </div>

        <!-- Oscilloscope Waveform Canvas -->
        <div class="p-3.5 rounded-xl bg-black/80 border border-slate-800/80 space-y-2">
          <div class="flex items-center justify-between text-[11px] font-mono">
            <span class="text-slate-400 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-ping"></span>
              Акустична осцилограма Bara tala: ${p.trap_type}
            </span>
            <div class="flex items-center gap-3">
              <span class="text-cyan-400 font-bold">${p.word_a.word} (${p.word_a.duration_ms}ms)</span>
              <span class="text-rose-400 font-bold">${p.word_b.word} (${p.word_b.duration_ms}ms)</span>
            </div>
          </div>
          <canvas id="duel-waveform-canvas" class="w-full h-24 rounded-lg bg-cyber-void border border-slate-900"></canvas>
        </div>

        <!-- ================= THE INTERACTIVE AUDITORY DUEL ARENA ================= -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-cyber-deep to-black border-2 border-emerald-500/50 shadow-2xl space-y-3.5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-emerald-500/30">
            <div class="flex items-center gap-2.5">
              <span class="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 text-xl flex items-center justify-center border border-emerald-500/40">
                🎮
              </span>
              <div>
                <h3 class="text-sm sm:text-base font-black text-white font-mono">
                  Слуховий поєдинок: Визначте слово на слух
                </h3>
                <span class="text-[11px] text-slate-300">
                  ШІ випадково загадав або форму А, або форму B. Прослухайте та оберіть правильну картку!
                </span>
              </div>
            </div>

            <button id="start-duel-round-btn" class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs font-mono transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/30 active:scale-95 flex-shrink-0">
              <span>🎲 Загадати та слухати</span>
            </button>
          </div>

          <!-- Duel Choices -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button id="duel-pick-a" class="p-3 rounded-xl border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-500/20 text-cyan-200 font-mono text-xs font-bold transition-all flex items-center justify-between group disabled:opacity-40" disabled>
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">A</span>
                <span class="text-sm font-black text-white">${p.word_a.word}</span>
                <span class="text-cyan-400">${p.word_a.ipa}</span>
              </div>
              <span class="text-[11px] text-slate-400 group-hover:text-cyan-300">«${p.word_a.meaning}»</span>
            </button>

            <button id="duel-pick-b" class="p-3 rounded-xl border border-rose-500/40 bg-rose-950/30 hover:bg-rose-500/20 text-rose-200 font-mono text-xs font-bold transition-all flex items-center justify-between group disabled:opacity-40" disabled>
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">B</span>
                <span class="text-sm font-black text-white">${p.word_b.word}</span>
                <span class="text-rose-400">${p.word_b.ipa}</span>
              </div>
              <span class="text-[11px] text-slate-400 group-hover:text-rose-300">«${p.word_b.meaning}»</span>
            </button>
          </div>

          <!-- Duel Feedback Output -->
          <div id="duel-result-box" class="hidden p-3 rounded-xl text-xs font-mono transition-all"></div>
        </div>

        <!-- Pedagogical Insight Callout -->
        <div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs">
          <span class="text-base mt-0.5">🎓</span>
          <div>
            <strong class="text-amber-300 font-mono">Педагогічний інсайт Árnastofnun:</strong>
            <span class="text-slate-300 font-sans ml-1">${p.pedagogical_insight}</span>
          </div>
        </div>

      </div>
    `;

    this.drawWaveform();
    this.bindEvents();
  }

  drawWaveform() {
    const canvas = this.container.querySelector('#duel-waveform-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600;
    const height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 96;

    ctx.clearRect(0, 0, width, height);

    // Subtle Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    const midY = height / 2;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(width, midY);
    ctx.stroke();

    const p = this.pairs[this.currentPairIdx];

    // Word A wave (Cyan)
    ctx.beginPath();
    ctx.strokeStyle = p.word_a.wave_color;
    ctx.lineWidth = 2.2;
    const samplesA = 100;
    const durRatioA = Math.min(1.0, p.word_a.duration_ms / 500);

    for (let i = 0; i <= samplesA; i++) {
      const progress = i / samplesA;
      const x = progress * (width * 0.45 * durRatioA) + 15;
      const env = Math.sin(progress * Math.PI) * (1 - 0.2 * Math.cos(progress * 4 * Math.PI));
      const freq = progress < 0.6 ? 12 : 24;
      const y = midY + Math.sin(progress * freq * Math.PI) * env * (height * 0.36);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Word B wave (Rose)
    ctx.beginPath();
    ctx.strokeStyle = p.word_b.wave_color;
    ctx.lineWidth = 2.2;
    const samplesB = 100;
    const durRatioB = Math.min(1.0, p.word_b.duration_ms / 500);
    const startXB = width * 0.52;

    for (let i = 0; i <= samplesB; i++) {
      const progress = i / samplesB;
      const x = startXB + progress * (width * 0.44 * durRatioB);
      let env = Math.sin(progress * Math.PI);
      if (p.trap_type.includes('Преаспірація') && progress > 0.45 && progress < 0.7) {
        env *= 0.3 + 0.15 * Math.random();
      }
      const freq = progress > 0.45 && progress < 0.7 ? 36 : 16;
      const y = midY + Math.sin(progress * freq * Math.PI) * env * (height * 0.36);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = p.word_a.wave_color;
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`${p.word_a.word} [${p.word_a.ipa}]`, 20, 18);

    ctx.fillStyle = p.word_b.wave_color;
    ctx.fillText(`${p.word_b.word} [${p.word_b.ipa}]`, startXB + 5, 18);
  }

  bindEvents() {
    // Tab switching
    this.container.querySelectorAll('.duel-pair-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.currentPairIdx = parseInt(tab.dataset.pairIdx, 10);
        this.duelSecretTarget = null;
        this.duelSecretWord = null;
        this.duelAnswered = false;
        this.render();
      });
    });

    const p = this.pairs[this.currentPairIdx];

    // Play Word A / B
    const btnA = this.container.querySelector('#play-word-a-btn');
    if (btnA) {
      btnA.addEventListener('click', () => {
        const cardA = this.container.querySelector('#pair-card-a');
        audioEngine.play(p.word_a.word, cardA, 0.85, p.word_a.ipa);
      });
    }

    const btnB = this.container.querySelector('#play-word-b-btn');
    if (btnB) {
      btnB.addEventListener('click', () => {
        const cardB = this.container.querySelector('#pair-card-b');
        audioEngine.play(p.word_b.word, cardB, 0.85, p.word_b.ipa);
      });
    }

    // Sequence contrast
    const compareBtn = this.container.querySelector('#play-compare-sequence-btn');
    if (compareBtn) {
      compareBtn.addEventListener('click', async () => {
        const cardA = this.container.querySelector('#pair-card-a');
        const cardB = this.container.querySelector('#pair-card-b');

        try {
          compareBtn.disabled = true;
          compareBtn.innerText = `▶️ ${p.word_a.word}...`;
          await audioEngine.playUntilEnd(p.word_a.word, cardA, 0.85, p.word_a.ipa);

          await new Promise(r => setTimeout(r, 350));

          compareBtn.innerText = `▶️ ${p.word_b.word}...`;
          await audioEngine.playUntilEnd(p.word_b.word, cardB, 0.85, p.word_b.ipa);
        } finally {
          compareBtn.disabled = false;
          compareBtn.innerText = `⚡ Відтворити послідовний контраст A ➔ B`;
        }
      });
    }

    // Auditory Duel Game
    const startDuelBtn = this.container.querySelector('#start-duel-round-btn');
    const pickABtn = this.container.querySelector('#duel-pick-a');
    const pickBBtn = this.container.querySelector('#duel-pick-b');
    const resultBox = this.container.querySelector('#duel-result-box');

    if (startDuelBtn) {
      startDuelBtn.addEventListener('click', () => {
        const isTargetA = Math.random() >= 0.5;
        this.duelSecretTarget = isTargetA ? 'A' : 'B';
        const targetObj = isTargetA ? p.word_a : p.word_b;
        this.duelSecretWord = targetObj.word;
        this.duelAnswered = false;

        audioEngine.play(this.duelSecretWord, startDuelBtn, 0.85);

        pickABtn.disabled = false;
        pickBBtn.disabled = false;
        startDuelBtn.innerText = '🔊 Повторити звук';

        resultBox.className = 'p-3 rounded-xl text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-2';
        resultBox.innerHTML = `<span>👂</span> <span>Слухайте звук... Яке слово прозвучало: <strong>Форма А</strong> чи <strong>Форма B</strong>?</span>`;
        resultBox.classList.remove('hidden');
      });
    }

    if (pickABtn && pickBBtn) {
      const handleAnswer = (choice) => {
        if (this.duelAnswered || !this.duelSecretTarget) return;
        this.duelAnswered = true;
        pickABtn.disabled = true;
        pickBBtn.disabled = true;

        const isWin = choice === this.duelSecretTarget;
        if (isWin) {
          gameState.addXP(15);
          gameState.playCorrectSound();
          resultBox.className = 'p-3 rounded-xl text-xs font-mono bg-emerald-500/20 border border-emerald-400 text-emerald-300 space-y-1';
          resultBox.innerHTML = `
            <div class="flex items-center gap-1.5 text-sm font-bold">
              <span>🎉</span> <span>Блискуче! Це саме форма ${this.duelSecretTarget}: «${this.duelSecretWord}»! (+15 XP)</span>
            </div>
            <p class="text-[11px] font-sans text-emerald-200/90">${p.pedagogical_insight}</p>
          `;
        } else {
          gameState.playWrongSound();
          resultBox.className = 'p-3 rounded-xl text-xs font-mono bg-rose-500/20 border border-rose-400 text-rose-300 space-y-1';
          resultBox.innerHTML = `
            <div class="flex items-center gap-1.5 text-sm font-bold">
              <span>❌</span> <span>Не зовсім. Це була форма ${this.duelSecretTarget}: «${this.duelSecretWord}».</span>
            </div>
            <p class="text-[11px] font-sans text-rose-200/90">${p.pedagogical_insight}</p>
          `;
        }
      };

      pickABtn.addEventListener('click', () => handleAnswer('A'));
      pickBBtn.addEventListener('click', () => handleAnswer('B'));
    }
  }
}
