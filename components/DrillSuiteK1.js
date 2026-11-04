/**
 * DrillSuiteK1.js - 10-Question Interactive Drill Engine for Kafli 1: Hver ert þú?
 * Vera forms, frá + dative, V2 syntax + ekki, question words, acoustic traps.
 */

import { audioEngine } from './AudioEngine.js?v=7.0';
import { gameState } from './GameState.js';

export class DrillSuiteK1 {
  constructor(container, drillQuestions) {
    this.container = container;
    this.questions = drillQuestions;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.userAnswers = {};
    this.isAnswered = false;
  }

  render() {
    if (this.currentIndex >= this.questions.length) {
      this.renderResults();
      return;
    }

    const q = this.questions[this.currentIndex];
    const total = this.questions.length;
    const progressPercent = Math.round(((this.currentIndex) / total) * 100);

    this.container.innerHTML = `
      <div class="space-y-4 max-w-2xl mx-auto">
        <!-- Header & XP -->
        <div class="flex items-center justify-between pb-2 border-b border-cyber-border/30">
          <div>
            <div class="flex items-center gap-1.5 mb-0.5">
              <span class="px-2 py-0.2 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/30">
                ${q.category_uk}
              </span>
              <span class="text-[11px] font-mono text-slate-400">Питання ${this.currentIndex + 1} / ${total}</span>
            </div>
            <h3 class="text-sm sm:text-base font-black text-white font-mono">
              🎯 Тренажер Kafli 1 (${total} завдань • Íslenska fyrir alla 1)
            </h3>
          </div>

          <div class="flex items-center gap-3 text-xs font-mono">
            <div class="text-right">
              <span class="text-[9px] text-slate-500 uppercase">XP</span>
              <div id="k1-xp-counter" class="text-sm font-black text-cyan-400 leading-none">${this.score} XP</div>
            </div>
            <div class="text-right pl-2 border-l border-slate-800">
              <span class="text-[9px] text-slate-500 uppercase">Серія</span>
              <div class="text-sm font-black text-amber-400 leading-none">🔥 ${this.streak}</div>
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
          <div class="bg-gradient-to-r from-cyan-500 via-emerald-400 to-rose-400 h-1.5 rounded-full transition-all duration-300" style="width: ${progressPercent}%;"></div>
        </div>

        <!-- Question Card -->
        <div class="p-4 sm:p-5 rounded-xl bg-cyber-deep/90 border border-cyber-border/40 shadow-xl space-y-3.5">
          <div class="text-xs sm:text-sm font-bold text-white font-sans leading-relaxed">
            ${q.prompt}
          </div>

          <!-- Options Grid -->
          <div id="k1-drill-options" class="space-y-2">
            ${q.options.map((opt, idx) => `
              <button data-opt-idx="${idx}" class="k1-option-btn w-full p-2.5 sm:p-3 rounded-lg text-left font-sans text-xs font-medium transition-all bg-black/40 hover:bg-black/80 border border-slate-800 hover:border-cyan-400 text-slate-200 flex items-start gap-2.5 group">
                <span class="w-5 h-5 rounded bg-cyber-deep border border-slate-700 flex items-center justify-center font-mono text-[10px] font-bold text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-400 flex-shrink-0">
                  ${String.fromCharCode(65 + idx)}
                </span>
                <span class="flex-grow pt-0.5 leading-snug">${opt}</span>
              </button>
            `).join('')}
          </div>

          <!-- Feedback Box -->
          <div id="k1-drill-feedback" class="hidden p-3 rounded-lg border transition-all space-y-2 text-xs">
            <div class="flex items-center gap-1.5 font-mono font-bold" id="k1-feedback-title"></div>
            <div class="text-slate-300 font-sans leading-relaxed" id="k1-feedback-text"></div>
            <div class="pt-1 flex justify-end">
              <button id="k1-drill-next-btn" class="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5">
                <span>Далі ➔</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('.k1-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isAnswered) return;
        const selectedIdx = parseInt(btn.dataset.optIdx, 10);
        this.submitAnswer(selectedIdx);
      });
    });

    const nextBtn = this.container.querySelector('#k1-drill-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentIndex++;
        this.isAnswered = false;
        this.render();
      });
    }
  }

  submitAnswer(selectedIdx) {
    this.isAnswered = true;
    const q = this.questions[this.currentIndex];
    const isCorrect = selectedIdx === q.correct_index;
    this.userAnswers[q.id] = selectedIdx;

    const options = this.container.querySelectorAll('.k1-option-btn');
    options.forEach(btn => {
      const idx = parseInt(btn.dataset.optIdx, 10);
      btn.disabled = true;
      if (idx === q.correct_index) {
        btn.classList.add('bg-emerald-500/20', 'border-emerald-400', 'text-emerald-200');
        btn.querySelector('span:first-child').classList.add('bg-emerald-500', 'text-black', 'border-emerald-400');
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('bg-rose-500/20', 'border-rose-500', 'text-rose-200');
        btn.querySelector('span:first-child').classList.add('bg-rose-500', 'text-white', 'border-rose-400');
      }
    });

    const fBox = this.container.querySelector('#k1-drill-feedback');
    const fTitle = this.container.querySelector('#k1-feedback-title');
    const fText = this.container.querySelector('#k1-feedback-text');

    if (isCorrect) {
      this.score += 20;
      this.streak++;
      gameState.addXP(20);
      gameState.playVictorySound();
      fBox.className = 'p-3 rounded-lg border border-emerald-500/50 bg-emerald-950/30 space-y-2';
      fTitle.innerHTML = `<span>🎉</span> <span class="text-emerald-400">Rétt! (Правильно! +20 XP)</span>`;
      fText.innerHTML = q.explanation;
    } else {
      this.streak = 0;
      fBox.className = 'p-3 rounded-lg border border-rose-500/50 bg-rose-950/30 space-y-2';
      fTitle.innerHTML = `<span>❌</span> <span class="text-rose-400">Ekki rétt (Неправильно)</span>`;
      fText.innerHTML = q.explanation;
    }

    fBox.classList.remove('hidden');

    const xpCounter = this.container.querySelector('#k1-xp-counter');
    if (xpCounter) xpCounter.innerText = `${this.score} XP`;
  }

  renderResults() {
    const total = this.questions.length;
    const maxScore = total * 20;
    const correctCount = Object.keys(this.userAnswers).filter(id => {
      const q = this.questions.find(x => x.id === parseInt(id, 10));
      return q && this.userAnswers[id] === q.correct_index;
    }).length;
    const percent = Math.round((correctCount / total) * 100);

    this.container.innerHTML = `
      <div class="p-6 sm:p-8 rounded-xl bg-cyber-deep/95 border border-rose-500/40 shadow-xl max-w-lg mx-auto text-center space-y-4">
        <div class="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500/20 to-cyan-500/20 border border-rose-400 flex items-center justify-center text-3xl mx-auto shadow-md">
          ${percent >= 80 ? '🏆' : '📚'}
        </div>

        <div class="space-y-1">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border border-rose-500/40 bg-rose-500/20 text-rose-300">
            Kafli 1: Meistari
          </span>
          <h3 class="text-xl sm:text-2xl font-black text-white font-mono mt-1">
            Результати тестування Розділу 1
          </h3>
        </div>

        <div class="grid grid-cols-3 gap-2 p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-center">
          <div>
            <div class="text-[10px] text-slate-400 uppercase">Точність</div>
            <div class="text-lg font-black text-white">${percent}%</div>
          </div>
          <div>
            <div class="text-[10px] text-slate-400 uppercase">Вірно</div>
            <div class="text-lg font-black text-emerald-400">${correctCount} / ${total}</div>
          </div>
          <div>
            <div class="text-[10px] text-slate-400 uppercase">XP</div>
            <div class="text-lg font-black text-cyan-400">${this.score} / ${maxScore}</div>
          </div>
        </div>

        <div class="pt-2 flex items-center justify-center">
          <button id="k1-retake-btn" class="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-black font-extrabold font-mono text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center gap-1.5">
            <span>🔄 Пройти тест знову</span>
          </button>
        </div>
      </div>
    `;

    const retakeBtn = this.container.querySelector('#k1-retake-btn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        this.currentIndex = 0;
        this.score = 0;
        this.streak = 0;
        this.userAnswers = {};
        this.isAnswered = false;
        this.render();
      });
    }
  }
}
