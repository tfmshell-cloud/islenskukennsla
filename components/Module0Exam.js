/**
 * Module0Exam.js - Official 15-Question Final Certification Exam for Module 0
 * Comprehensive assessment covering:
 * - Block 1: Слухова та орфографічна диференціація (Q1-Q5)
 * - Block 2: Правила Þ vs Ð та Закон близнюків I/Y (Q6-Q9)
 * - Block 3: Соціолінгвістичний етикет (Q10-Q12)
 * - Block 4: Синтаксис V2 та структура речення (Q13-Q15)
 * 
 * Features:
 * - Authentic native audio playback (Gunnar Neural)
 * - Real-time progress across 4 blocks
 * - Deep linguistic explanations from Árnastofnun
 * - Luxury Certification Card (+150 XP, +10 Gems, Gold Seal)
 * - Dual-theme support (Dark Cyberpunk & Bright Light mode)
 */

import { M0_EXAM_DATA } from '../data/m0_exam_data.js?v=7.0';
import { audioEngine } from './AudioEngine.js?v=7.0';
import { gameState } from './GameState.js?v=7.0';

export class Module0Exam {
  constructor(container, onComplete = null, onOpenGuide = null) {
    this.container = container;
    this.onComplete = onComplete;
    this.onOpenGuide = onOpenGuide;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = {}; // { questionId: { chosenIndex, isCorrect } }
    this.isAnswered = false;
    this.startTime = Date.now();
  }

  isExamPassed() {
    return localStorage.getItem('isl_m0_exam_passed') === 'true';
  }

  getBestScore() {
    return parseInt(localStorage.getItem('isl_m0_exam_score') || '0', 10);
  }

  reset() {
    this.currentIndex = 0;
    this.score = 0;
    this.answers = {};
    this.isAnswered = false;
    this.startTime = Date.now();
    this.render();
  }

  render() {
    if (this.currentIndex >= M0_EXAM_DATA.questions.length) {
      this.renderCertificationScreen();
      return;
    }

    const q = M0_EXAM_DATA.questions[this.currentIndex];
    const total = M0_EXAM_DATA.questions.length;
    const progressPercent = Math.round((this.currentIndex / total) * 100);

    this.container.innerHTML = `
      <div class="space-y-4 max-w-3xl mx-auto select-none-text">
        
        <!-- Header Banner -->
        <div class="arena-theme-card p-4 sm:p-5 rounded-2xl space-y-3 shadow-xl">
          <div class="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-700/50">
            <div class="flex items-center gap-2.5">
              <span class="text-2xl sm:text-3xl">🎓</span>
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-sm sm:text-base font-black arena-word-heading font-mono">
                    Фінальний Атестаційний Екзамен Модуля 0
                  </h2>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    Рівень A1.0
                  </span>
                </div>
                <p class="text-xs text-slate-400 font-sans mt-0.5">
                  15 контрольних завдань • Поріг успішності: 12/15 (80%) • Нагорода: +150 XP
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 font-mono text-xs">
              <button id="m0-exam-open-guide-btn" class="px-2.5 py-1 rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1" title="Відкрити офіційний конспект правил">
                <span>📖</span><span class="hidden sm:inline">Конспект</span>
              </button>
              <div class="arena-hud-box px-3 py-1 rounded-xl border flex items-center gap-1.5 shadow-sm">
                <span class="text-slate-400 text-[10px]">Бали:</span>
                <span class="text-cyan-400 font-bold">${this.score} / ${this.currentIndex}</span>
              </div>
              <button id="m0-exam-restart-btn" class="px-2.5 py-1 rounded-xl border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 text-[11px] transition-all cursor-pointer" title="Почати з 1-го питання">
                ↺ Скинути
              </button>
            </div>
          </div>

          <!-- 4 Blocks Ribbon Navigator -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] sm:text-[11px] font-mono">
            ${M0_EXAM_DATA.blocks.map(b => {
              const isCurrentBlock = q.blockId === b.id;
              const isPassedBlock = q.blockId > b.id;
              return `
                <div class="p-2 rounded-xl border text-center transition-all ${
                  isCurrentBlock 
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold shadow-sm' 
                    : isPassedBlock 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'arena-hud-box text-slate-400 border-slate-800'
                }">
                  <div class="truncate">${b.name}</div>
                  <div class="text-[9px] opacity-75 mt-0.5">Завдання ${b.range[0]}–${b.range[1]}</div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Progress Bar -->
          <div class="space-y-1">
            <div class="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
              <span>Завдання ${this.currentIndex + 1} з ${total}</span>
              <span class="text-cyan-400 font-bold">${progressPercent}%</span>
            </div>
            <div class="w-full bg-slate-900/60 rounded-full h-2 overflow-hidden border border-slate-800">
              <div class="bg-gradient-to-r from-cyan-500 to-emerald-400 h-2 rounded-full transition-all duration-300" style="width: ${progressPercent}%;"></div>
            </div>
          </div>
        </div>

        <!-- Main Question Card -->
        <div class="arena-theme-card p-5 sm:p-6 rounded-3xl space-y-4 shadow-xl">
          
          <div class="flex items-start justify-between gap-3 flex-wrap">
            <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/40">
              ${q.blockTitle}
            </span>

            ${q.audioWord ? `
              <button id="exam-play-audio-btn" class="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-300 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95" data-word="${q.audioWord}">
                <span>🔊</span> <span>Вимова носія (Gunnar)</span>
              </button>
            ` : ''}
          </div>

          <!-- Question Context Statement -->
          <div class="arena-trans-panel p-4 rounded-2xl space-y-1 shadow-sm">
            <div class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Ситуація / Контекст:</div>
            <div class="text-base sm:text-lg font-bold arena-word-heading font-sans leading-relaxed">
              ${q.context}
            </div>
          </div>

          <!-- 4 Options Grid -->
          <div class="space-y-2.5 pt-1">
            <div class="text-xs text-slate-400 font-sans px-1">
              Оберіть єдино правильний варіант відповіді:
            </div>

            <div class="grid grid-cols-1 gap-2.5">
              ${q.options.map((opt, optIdx) => {
                const isSelected = this.answers[q.id]?.chosenIndex === optIdx;
                const hasAnswered = this.isAnswered;
                let optStyle = 'arena-quiz-card hover:border-cyan-400 cursor-pointer';

                if (hasAnswered) {
                  if (optIdx === q.correctIndex) {
                    optStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold shadow-md';
                  } else if (isSelected && optIdx !== q.correctIndex) {
                    optStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 shadow-md';
                  } else {
                    optStyle = 'opacity-40 border-slate-800 pointer-events-none';
                  }
                }

                return `
                  <button 
                    class="exam-option-btn ${optStyle} p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between group shadow-sm active:scale-[0.99]" 
                    data-opt-index="${optIdx}"
                    ${hasAnswered ? 'disabled' : ''}>
                    <div class="flex items-center gap-3">
                      <span class="w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                        hasAnswered && optIdx === q.correctIndex 
                          ? 'bg-emerald-500 text-black' 
                          : hasAnswered && isSelected 
                            ? 'bg-rose-500 text-white' 
                            : 'bg-black/40 text-cyan-400 border border-slate-700'
                      }">
                        ${String.fromCharCode(65 + optIdx)}
                      </span>
                      <span class="text-xs sm:text-sm font-sans ${hasAnswered && optIdx === q.correctIndex ? 'text-emerald-300 font-bold' : ''}">
                        ${opt}
                      </span>
                    </div>

                    ${hasAnswered ? `
                      <span class="text-sm font-bold">
                        ${optIdx === q.correctIndex ? '✓' : isSelected ? '✕' : ''}
                      </span>
                    ` : ''}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Detailed Explanation Box (Shown after answering) -->
          <div id="exam-explanation-box" class="${this.isAnswered ? '' : 'hidden'} arena-v2-panel p-4 rounded-2xl space-y-2 shadow-md animate-scale-up">
            <div class="flex items-center gap-2">
              <span class="text-sm">${this.answers[q.id]?.isCorrect ? '🎉' : '💡'}</span>
              <span class="text-xs font-mono font-bold uppercase tracking-wider ${this.answers[q.id]?.isCorrect ? 'text-emerald-400' : 'text-amber-400'}">
                ${this.answers[q.id]?.isCorrect ? 'Правильно!' : 'Помилка.'} Лінгвістичний аналіз Árnastofnun:
              </span>
            </div>
            <div class="text-xs arena-v2-sub font-sans leading-relaxed">
              ${q.explanation}
            </div>
            
            <div class="pt-2 text-right">
              <button id="exam-next-btn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-mono font-black text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer">
                ${this.currentIndex < total - 1 ? 'Наступне завдання ➔' : 'Завершити екзамен та отримати сертифікат ➔'}
              </button>
            </div>
          </div>

        </div>

      </div>
    `;

    this.bindEvents(q);
  }

  bindEvents(q) {
    // Open Guide
    const guideBtn = this.container.querySelector('#m0-exam-open-guide-btn');
    if (guideBtn && typeof this.onOpenGuide === 'function') {
      guideBtn.addEventListener('click', () => {
        this.onOpenGuide();
      });
    }

    // Restart
    const restartBtn = this.container.querySelector('#m0-exam-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        if (confirm('Бажаєте скинути екзамен і розпочати з 1-го питання?')) {
          this.reset();
        }
      });
    }

    // Audio Play
    const audioBtn = this.container.querySelector('#exam-play-audio-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const word = audioBtn.dataset.word;
        audioEngine.play(word, audioBtn);
      });
      // Auto play on question load if applicable
      setTimeout(() => audioEngine.play(q.audioWord, audioBtn), 200);
    }

    // Option Clicks
    this.container.querySelectorAll('.exam-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isAnswered) return;

        const chosenIndex = parseInt(btn.dataset.optIndex, 10);
        const isCorrect = chosenIndex === q.correctIndex;

        this.isAnswered = true;
        this.answers[q.id] = { chosenIndex, isCorrect };

        if (isCorrect) {
          this.score++;
          gameState.playVictorySound();
        }

        this.render();
      });
    });

    // Next Button
    const nextBtn = this.container.querySelector('#exam-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentIndex++;
        this.isAnswered = false;
        this.render();
      });
    }
  }

  renderCertificationScreen() {
    const total = M0_EXAM_DATA.questions.length;
    const isPassed = this.score >= M0_EXAM_DATA.passScore;
    const scorePercent = Math.round((this.score / total) * 100);

    if (isPassed) {
      localStorage.setItem('isl_m0_exam_passed', 'true');
      const prevBest = this.getBestScore();
      if (this.score > prevBest) {
        localStorage.setItem('isl_m0_exam_score', this.score.toString());
      }

      // Rewards
      gameState.addXP(M0_EXAM_DATA.awardXP);
      gameState.addGems(M0_EXAM_DATA.awardGems);
      gameState.playLevelUpFanfare();
    }

    const todayDate = new Date().toLocaleDateString('uk-UA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    this.container.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-5 animate-scale-up select-none-text">
        
        <!-- Victory Certificate Card -->
        <div class="arena-theme-card p-6 sm:p-8 rounded-3xl border-2 ${isPassed ? 'border-amber-400/80 shadow-[0_0_40px_rgba(251,191,36,0.25)]' : 'border-rose-500/50'} text-center space-y-5">
          
          <div class="w-24 h-24 rounded-full ${isPassed ? 'bg-gradient-to-br from-amber-400/30 to-emerald-500/30 border-2 border-amber-400' : 'bg-rose-500/20 border-2 border-rose-500'} flex items-center justify-center text-5xl mx-auto shadow-xl">
            ${isPassed ? '🏅' : '📚'}
          </div>

          <div class="space-y-1.5">
            <span class="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${isPassed ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}">
              ${isPassed ? 'Атестацію успішно складено!' : 'Спробуйте ще раз'}
            </span>
            <h2 class="text-xl sm:text-3xl font-black arena-word-heading font-mono mt-1">
              ${isPassed ? 'Сертифікат Майстерності: Модуль 0' : 'Результати контрольного тесту'}
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-md mx-auto">
              ${isPassed 
                ? 'Цим підтверджується бездоганне володіння ісландською абеткою, 5 фонетичними пастками, мовним етикетом та законом V2.' 
                : 'Для отримання сертифіката та відкриття наступного рівня необхідно набрати щонайменше 12 з 15 балів (80%).'
              }
            </p>
          </div>

          <!-- Score Card -->
          <div class="grid grid-cols-3 gap-2 sm:gap-4 p-4 rounded-2xl arena-trans-panel font-mono text-center">
            <div>
              <span class="text-[10px] text-slate-400 uppercase">Результат</span>
              <div class="text-xl sm:text-2xl font-black ${isPassed ? 'text-emerald-400' : 'text-rose-400'}">
                ${this.score} / ${total}
              </div>
            </div>
            <div class="border-x border-slate-700/50">
              <span class="text-[10px] text-slate-400 uppercase">Точність</span>
              <div class="text-xl sm:text-2xl font-black text-cyan-400">
                ${scorePercent}%
              </div>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 uppercase">Нагорода</span>
              <div class="text-xl sm:text-2xl font-black text-amber-400">
                +${isPassed ? M0_EXAM_DATA.awardXP : 20} XP
              </div>
            </div>
          </div>

          <!-- Formal Certificate Box (if passed) -->
          ${isPassed ? `
            <div class="p-5 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-transparent space-y-2 text-left font-serif shadow-inner">
              <div class="flex items-center justify-between text-xs font-mono text-amber-300">
                <span>Stofnun Árna Magnússonar í íslenskum fræðum</span>
                <span>Рівень A1.0</span>
              </div>
              <div class="text-base sm:text-lg text-slate-100 font-bold">
                Stafrófið, Hljóðfræði og V2-Reglan (Абетка, фонетика та V2)
              </div>
              <div class="text-xs text-slate-400 font-sans flex items-center justify-between pt-2 border-t border-amber-500/20">
                <span>Дата атестації: <strong>${todayDate}</strong></span>
                <span class="font-mono text-emerald-400 font-bold">✓ ВЕРИФІКОВАНО BARA TALA</span>
              </div>
            </div>
          ` : ''}

          <!-- Action Buttons -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <button id="exam-review-guide-btn" class="py-3 rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs transition-all active:scale-95 cursor-pointer">
              📖 Конспект правил
            </button>
            <button id="exam-retry-btn" class="py-3 rounded-xl border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white font-mono font-bold text-xs transition-all active:scale-95 cursor-pointer">
              🔁 Скласти ще раз
            </button>
            <button id="exam-proceed-k1-btn" class="py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-mono font-black text-xs uppercase tracking-wider shadow-xl transition-all active:scale-95 cursor-pointer">
              ${isPassed ? '🌟 До Уроку 1 ➔' : 'Матеріали ➔'}
            </button>
          </div>

        </div>

      </div>
    `;

    const guideBtn = this.container.querySelector('#exam-review-guide-btn');
    if (guideBtn && typeof this.onOpenGuide === 'function') {
      guideBtn.addEventListener('click', () => this.onOpenGuide());
    }

    const retryBtn = this.container.querySelector('#exam-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.reset());
    }

    const proceedBtn = this.container.querySelector('#exam-proceed-k1-btn');
    if (proceedBtn) {
      proceedBtn.addEventListener('click', () => {
        if (isPassed && this.onComplete) {
          this.onComplete();
        } else {
          // Switch to soundboard or Kafli 1
          const k1Btn = document.querySelector('button[data-chapter="kafli_1"]');
          if (isPassed && k1Btn) {
            k1Btn.click();
          } else {
            const firstTab = document.querySelector('button[data-m0-sub="soundboard"]');
            if (firstTab) firstTab.click();
          }
        }
      });
    }
  }
}
