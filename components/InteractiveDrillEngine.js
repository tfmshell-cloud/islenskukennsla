/**
 * InteractiveDrillEngine.js - Advanced 20-Exercise Multimethodological Phonetics Quiz Engine
 * NotebookLM verified pedagogical suite:
 * Category 1: Audio Discrimination (5 questions)
 * Category 2: Trap Dictation (5 questions)
 * Category 3: Phonetic Rule Detector (5 questions)
 * Category 4: Picture Sound Assembly (5 questions)
 */

import { audioEngine } from './AudioEngine.js?v=5.8';
import { gameState } from './GameState.js';

export class InteractiveDrillEngine {
  constructor(container, drillQuestions) {
    this.container = container;
    this.allQuestions = drillQuestions || [];
    this.activeCategory = 'all'; // 'all', 'audio_discrimination', 'trap_dictation', 'phonetic_rule_detector', 'picture_sound_assembly'
    this.filteredQuestions = [...this.allQuestions];
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.userAnswers = {};
    this.isAnswered = false;
  }

  setCategory(cat) {
    this.activeCategory = cat;
    if (cat === 'all') {
      this.filteredQuestions = [...this.allQuestions];
    } else {
      this.filteredQuestions = this.allQuestions.filter(q => q.category === cat);
    }
    this.currentIndex = 0;
    this.isAnswered = false;
    this.render();
  }

  render() {
    if (this.currentIndex >= this.filteredQuestions.length) {
      this.renderResults();
      return;
    }

    const q = this.filteredQuestions[this.currentIndex];
    const total = this.filteredQuestions.length;
    const progressPercent = Math.round(((this.currentIndex) / total) * 100);

    const categories = [
      { id: 'all', label: `Всі (${this.allQuestions.length})` },
      { id: 'audio_discrimination', label: '🎧 1. Аудіо (5)' },
      { id: 'trap_dictation', label: '✍️ 2. Диктант (5)' },
      { id: 'phonetic_rule_detector', label: '🔬 3. Правила (5)' },
      { id: 'picture_sound_assembly', label: '🧩 4. Збірка (5)' }
    ];

    this.container.innerHTML = `
      <div class="space-y-4 max-w-2xl mx-auto">
        <!-- Compact Drill Header & Categories Bar -->
        <div class="space-y-2 pb-2 border-b border-cyber-border/30">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-1.5 mb-0.5">
                <span class="px-2 py-0.2 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  ${q.category_uk || 'Фонетичне тренування'}
                </span>
                <span class="text-[11px] font-mono text-slate-400">Питання ${this.currentIndex + 1} / ${total}</span>
              </div>
              <h2 class="text-sm sm:text-base font-black text-white font-mono">
                🎯 20 Практичних завдань (NotebookLM Suite)
              </h2>
            </div>

            <div class="flex items-center gap-3 text-xs font-mono">
              <div class="text-right">
                <span class="text-[9px] text-slate-500 uppercase">Бали</span>
                <div id="drill-xp-counter" class="text-sm font-black text-cyan-400 leading-none">${this.score} XP</div>
              </div>
              <div class="text-right pl-2 border-l border-slate-800">
                <span class="text-[9px] text-slate-500 uppercase">Серія</span>
                <div class="text-sm font-black text-amber-400 leading-none">🔥 ${this.streak}</div>
              </div>
            </div>
          </div>

          <!-- Category Filter Pills -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
            ${categories.map(c => `
              <button class="drill-cat-pill px-2.5 py-1 rounded-lg border transition-all whitespace-nowrap ${
                this.activeCategory === c.id 
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-sm' 
                  : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'
              }" data-cat-id="${c.id}">
                ${c.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Sleek Progress Bar -->
        <div class="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
          <div class="bg-gradient-to-r from-cyan-500 via-emerald-400 to-amber-400 h-1.5 rounded-full transition-all duration-300" style="width: ${progressPercent}%;"></div>
        </div>

        <!-- Question Card -->
        <div class="p-4 sm:p-5 rounded-xl bg-cyber-deep/90 border border-cyber-border/40 shadow-xl space-y-3.5">
          <div class="flex items-start justify-between gap-3">
            <div class="text-xs sm:text-sm font-bold text-white font-sans leading-relaxed">
              ${q.question || q.prompt}
            </div>
            ${q.audio_prompt ? `
              <button id="drill-audio-prompt-btn" class="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 border border-cyan-500/40 text-cyan-300 hover:text-black font-mono text-xs font-bold transition-all flex items-center gap-1 flex-shrink-0 shadow-sm" title="Слухати аудіо-підказку">
                <span>🔊</span> <span>«${q.audio_prompt}»</span>
              </button>
            ` : ''}
          </div>

          <!-- Options List -->
          <div id="drill-options-container" class="space-y-2">
            ${q.options.map((opt, idx) => `
              <button data-opt-idx="${idx}" class="drill-option-btn w-full p-2.5 sm:p-3 rounded-lg text-left font-sans text-xs font-medium transition-all bg-black/40 hover:bg-black/80 border border-slate-800 hover:border-cyan-400 text-slate-200 flex items-start gap-2.5 group">
                <span class="w-5 h-5 rounded bg-cyber-deep border border-slate-700 flex items-center justify-center font-mono text-[10px] font-bold text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-400 flex-shrink-0">
                  ${String.fromCharCode(65 + idx)}
                </span>
                <span class="flex-grow pt-0.5 leading-snug">${opt}</span>
              </button>
            `).join('')}
          </div>

          <!-- Feedback Box -->
          <div id="drill-feedback-box" class="hidden p-3 rounded-lg border transition-all space-y-2 text-xs">
            <div class="flex items-center gap-1.5 font-mono font-bold" id="drill-feedback-title"></div>
            <div class="text-slate-300 font-sans leading-relaxed" id="drill-feedback-text"></div>
            <div class="pt-1 flex justify-end">
              <button id="drill-next-btn" class="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5">
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
    // Category pills
    this.container.querySelectorAll('.drill-cat-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.catId;
        this.setCategory(cat);
      });
    });

    const q = this.filteredQuestions[this.currentIndex];

    // Audio prompt button
    const audioBtn = this.container.querySelector('#drill-audio-prompt-btn');
    if (audioBtn && q.audio_prompt) {
      audioBtn.addEventListener('click', () => {
        audioEngine.play(q.audio_prompt, audioBtn);
      });
    }

    // Option buttons
    this.container.querySelectorAll('.drill-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isAnswered) return;
        const selectedIdx = parseInt(btn.dataset.optIdx, 10);
        this.submitAnswer(selectedIdx);
      });
    });

    // Next button
    const nextBtn = this.container.querySelector('#drill-next-btn');
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
    const q = this.filteredQuestions[this.currentIndex];
    const isCorrect = selectedIdx === q.correct_index;
    this.userAnswers[q.id] = selectedIdx;

    const options = this.container.querySelectorAll('.drill-option-btn');
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

    const fBox = this.container.querySelector('#drill-feedback-box');
    const fTitle = this.container.querySelector('#drill-feedback-title');
    const fText = this.container.querySelector('#drill-feedback-text');

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
      fTitle.innerHTML = `<span>❌</span> <span class="text-rose-400">Ekki alveg (Не зовсім)</span>`;
      fText.innerHTML = q.explanation;
    }

    fBox.classList.remove('hidden');

    const xpCounter = this.container.querySelector('#drill-xp-counter');
    if (xpCounter) xpCounter.innerText = `${this.score} XP`;
  }

  renderResults() {
    const total = this.filteredQuestions.length;
    const maxScore = total * 20;
    const correctCount = Object.keys(this.userAnswers).filter(id => {
      const q = this.filteredQuestions.find(x => x.id === parseInt(id, 10));
      return q && this.userAnswers[id] === q.correct_index;
    }).length;
    const percent = Math.round((correctCount / total) * 100);

    let badge = 'Byrjandi (Початківець)';
    let badgeColor = 'text-slate-300 border-slate-600 bg-slate-800';
    if (percent >= 90) {
      badge = '🏆 Árnastofnun Meistari';
      badgeColor = 'text-amber-300 border-amber-500/50 bg-amber-500/20';
    } else if (percent >= 70) {
      badge = '⭐ Bara tala Sérfræðingur';
      badgeColor = 'text-cyan-300 border-cyan-500/50 bg-cyan-500/20';
    }

    this.container.innerHTML = `
      <div class="p-6 sm:p-8 rounded-xl bg-cyber-deep/95 border border-cyan-500/40 shadow-xl max-w-lg mx-auto text-center space-y-4">
        <div class="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-400 flex items-center justify-center text-3xl mx-auto shadow-md">
          ${percent >= 80 ? '🏅' : '📚'}
        </div>

        <div class="space-y-1">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${badgeColor}">
            ${badge}
          </span>
          <h2 class="text-xl sm:text-2xl font-black text-white font-mono mt-1">
            Результати тренування
          </h2>
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

        <div class="pt-2 flex items-center justify-center gap-3">
          <button id="drill-retake-btn" class="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold font-mono text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center gap-1.5">
            <span>🔄 Пройти знову</span>
          </button>
          <button id="drill-all-btn" class="px-4 py-2 rounded-xl bg-black/50 hover:bg-black/80 border border-slate-700 text-slate-300 font-bold font-mono text-xs transition-all">
            Всі категорії (20)
          </button>
        </div>
      </div>
    `;

    const retakeBtn = this.container.querySelector('#drill-retake-btn');
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

    const allBtn = this.container.querySelector('#drill-all-btn');
    if (allBtn) {
      allBtn.addEventListener('click', () => {
        this.setCategory('all');
      });
    }
  }
}
