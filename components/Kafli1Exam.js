/**
 * Kafli1Exam.js - Official 15-Question Final Certification Exam for Lesson 1 (Kafli 1: Hver ert þú?)
 * Based on "Íslenska fyrir alla 1" & Árnastofnun / Háskóli Íslands Academic Standards
 * 
 * Features:
 * - 4 Academic Blocks: Займенники, Прийменники (frá/í/á + ÞGF), Дієвідмінювання, Синтаксис V2 & Samruni
 * - Authentic native audio playback (Gunnar Neural)
 * - Real-time progress tracking
 * - Deep linguistic explanations from Árnastofnun
 * - Luxury Certification Card (+150 XP, +10 Gems, Gold Seal)
 * - Dual-theme support (Dark Cyberpunk & Bright Light mode)
 */

import { K1_EXAM_DATA } from '../data/k1_exam_data.js?v=7.7';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class Kafli1Exam {
  constructor(container, onComplete = null, onOpenMatrix = null) {
    this.container = container;
    this.onComplete = onComplete;
    this.onOpenMatrix = onOpenMatrix;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = {}; // { questionId: { chosenIndex, isCorrect } }
    this.isAnswered = false;
    this.startTime = Date.now();
  }

  isExamPassed() {
    return localStorage.getItem('isl_k1_exam_passed') === 'true';
  }

  getBestScore() {
    return parseInt(localStorage.getItem('isl_k1_exam_score') || '0', 10);
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
    if (this.currentIndex >= K1_EXAM_DATA.questions.length) {
      this.renderCertificationScreen();
      return;
    }

    const q = K1_EXAM_DATA.questions[this.currentIndex];
    const total = K1_EXAM_DATA.questions.length;
    const progressPercent = Math.round((this.currentIndex / total) * 100);

    this.container.innerHTML = `
      <div class="space-y-4 max-w-3xl mx-auto select-none-text">
        
        <!-- Header Banner -->
        <div class="arena-theme-card p-4 sm:p-5 rounded-2xl space-y-3 shadow-xl border border-amber-500/30">
          <div class="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-700/50">
            <div class="flex items-center gap-2.5">
              <span class="text-2xl sm:text-3xl">🎓</span>
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-sm sm:text-base font-black arena-word-heading font-mono">
                    ${K1_EXAM_DATA.title}
                  </h2>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Рівень A1.1
                  </span>
                </div>
                <p class="text-xs text-slate-400 font-sans mt-0.5">
                  15 контрольних завдань • Поріг успішності: ${K1_EXAM_DATA.passingScore}/15 (80%) • Нагорода: +${K1_EXAM_DATA.rewardXp} XP
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 font-mono text-xs">
              <button id="k1-exam-open-matrix-btn" class="px-2.5 py-1 rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1" title="Відкрити Матрицю-Шпаргалку">
                <span>🎓</span><span class="hidden sm:inline">Шпаргалка</span>
              </button>
              <div class="arena-hud-box px-3 py-1 rounded-xl border flex items-center gap-1.5 shadow-sm">
                <span class="text-slate-400 text-[10px]">Бали:</span>
                <span class="text-amber-400 font-bold">${this.score} / ${this.currentIndex}</span>
              </div>
              <button id="k1-exam-restart-btn" class="px-2.5 py-1 rounded-xl border border-slate-700 hover:border-amber-400 text-slate-400 hover:text-amber-300 text-[11px] transition-all cursor-pointer" title="Почати з 1-го питання">
                ↺ Скинути
              </button>
            </div>
          </div>

          <!-- 4 Blocks Ribbon Navigator -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] sm:text-[11px] font-mono">
            ${K1_EXAM_DATA.blocks.map(b => {
              const isCurrentBlock = q.blockId === b.id;
              return `
                <div class="p-2 rounded-xl border text-center transition-all ${
                  isCurrentBlock 
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-sm' 
                    : 'bg-black/30 border-slate-800 text-slate-400'
                }">
                  <div class="text-[9px] uppercase tracking-wider text-slate-500">Блок ${b.num}</div>
                  <div class="truncate font-bold">${b.name}</div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Progress Bar -->
          <div class="space-y-1">
            <div class="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Питання ${this.currentIndex + 1} з ${total}</span>
              <span>${progressPercent}% завершено</span>
            </div>
            <div class="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
              <div class="bg-gradient-to-r from-amber-500 to-cyan-400 h-1.5 rounded-full transition-all duration-300" style="width: ${progressPercent}%"></div>
            </div>
          </div>
        </div>

        <!-- Question Card -->
        <div class="arena-theme-card p-5 sm:p-7 rounded-2xl shadow-xl space-y-5 border border-slate-700/50">
          
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs font-mono text-amber-400">
              <span class="font-bold uppercase tracking-wider">${q.blockName}</span>
              <span class="text-slate-500">#${this.currentIndex + 1}</span>
            </div>
            
            <h3 class="text-sm sm:text-base font-extrabold text-white leading-relaxed font-sans">
              ${q.prompt}
            </h3>
          </div>

          <!-- Audio Reference Button -->
          ${q.audioCue ? `
            <div class="flex items-center gap-2">
              <button id="k1-exam-play-cue-btn" class="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm">
                <span>🔊</span><span>Зразок ісландської вимови</span>
              </button>
            </div>
          ` : ''}

          <!-- Options Grid -->
          <div id="k1-exam-options-container" class="space-y-2.5 pt-1">
            ${q.options.map((opt, idx) => `
              <button data-opt-idx="${idx}" class="k1-exam-opt-btn w-full p-3.5 sm:p-4 rounded-xl text-left border text-xs sm:text-sm font-sans transition-all flex items-start gap-3 bg-black/40 border-slate-800 hover:border-amber-400 text-slate-200 cursor-pointer group">
                <span class="w-6 h-6 rounded-lg bg-black/60 border border-slate-700 text-slate-300 group-hover:text-amber-300 group-hover:border-amber-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  ${String.fromCharCode(65 + idx)}
                </span>
                <span class="flex-1 leading-snug">${opt}</span>
              </button>
            `).join('')}
          </div>

          <!-- Feedback Box -->
          <div id="k1-exam-feedback" class="hidden p-4 rounded-xl border space-y-2.5 transition-all text-xs font-sans">
            <div class="flex items-center gap-2 font-mono font-bold text-sm" id="k1-exam-feedback-status"></div>
            <div class="text-slate-300 leading-relaxed font-sans" id="k1-exam-feedback-expl"></div>
            
            <div class="pt-2 flex justify-end">
              <button id="k1-exam-next-btn" class="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold font-mono text-xs transition-all shadow-md transform hover:scale-105 active:scale-95 cursor-pointer">
                <span>${this.currentIndex + 1 < total ? 'Наступне питання ➔' : 'Завершити екзамен 🎓'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    `;

    this.bindEvents(q);
  }

  bindEvents(q) {
    // Open Matrix
    const matrixBtn = this.container.querySelector('#k1-exam-open-matrix-btn');
    if (matrixBtn && typeof this.onOpenMatrix === 'function') {
      matrixBtn.addEventListener('click', () => this.onOpenMatrix());
    }

    // Restart
    const restartBtn = this.container.querySelector('#k1-exam-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => this.reset());
    }

    // Play Cue Audio
    const playCueBtn = this.container.querySelector('#k1-exam-play-cue-btn');
    if (playCueBtn && q.audioCue) {
      playCueBtn.addEventListener('click', () => {
        audioEngine.playWord(q.audioCue, playCueBtn);
      });
    }

    // Option clicks
    const optBtns = this.container.querySelectorAll('.k1-exam-opt-btn');
    const feedbackBox = this.container.querySelector('#k1-exam-feedback');
    const feedbackStatus = this.container.querySelector('#k1-exam-feedback-status');
    const feedbackExpl = this.container.querySelector('#k1-exam-feedback-expl');
    const nextBtn = this.container.querySelector('#k1-exam-next-btn');

    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isAnswered) return;
        this.isAnswered = true;

        const chosenIdx = parseInt(btn.dataset.optIdx, 10);
        const isCorrect = chosenIdx === q.correctIndex;

        this.answers[q.id] = { chosenIndex: chosenIdx, isCorrect };

        // Disable all buttons
        optBtns.forEach(b => {
          b.disabled = true;
          b.classList.remove('hover:border-amber-400', 'cursor-pointer');
        });

        // Highlight correct and chosen
        optBtns[q.correctIndex].classList.add('bg-emerald-500/20', 'border-emerald-400', 'text-emerald-200');
        if (!isCorrect) {
          btn.classList.add('bg-rose-500/20', 'border-rose-500', 'text-rose-200');
        } else {
          this.score += 1;
        }

        // Show feedback
        if (feedbackBox) {
          feedbackBox.classList.remove('hidden');
          if (isCorrect) {
            feedbackBox.className = 'p-4 rounded-xl border border-emerald-500/50 bg-emerald-950/30 text-emerald-300 space-y-2';
            feedbackStatus.innerHTML = `<span>✅</span> <span>Правильно! (+1 бал)</span>`;
          } else {
            feedbackBox.className = 'p-4 rounded-xl border border-rose-500/50 bg-rose-950/30 text-rose-300 space-y-2';
            feedbackStatus.innerHTML = `<span>❌</span> <span>Помилка</span>`;
          }
          feedbackExpl.innerHTML = `<strong>Лінгвістичне пояснення Árnastofnun:</strong> ${q.explanation}`;
        }

        if (nextBtn) {
          nextBtn.focus();
        }
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentIndex += 1;
        this.isAnswered = false;
        this.render();
      });
    }
  }

  renderCertificationScreen() {
    const total = K1_EXAM_DATA.questions.length;
    const isPassed = this.score >= K1_EXAM_DATA.passingScore;
    const percent = Math.round((this.score / total) * 100);

    // Save state
    const prevBest = this.getBestScore();
    if (this.score > prevBest) {
      localStorage.setItem('isl_k1_exam_score', this.score.toString());
    }
    if (isPassed) {
      localStorage.setItem('isl_k1_exam_passed', 'true');
      gameState.addXp(K1_EXAM_DATA.rewardXp);
      gameState.addGems(K1_EXAM_DATA.rewardGems);
    }

    this.container.innerHTML = `
      <div class="space-y-6 max-w-2xl mx-auto py-4 select-none-text animate-fade-in">
        
        <!-- Luxury Certification Card -->
        <div class="arena-theme-card p-6 sm:p-8 rounded-3xl shadow-2xl border-2 ${isPassed ? 'border-amber-400 bg-gradient-to-b from-amber-950/30 via-cyber-deep to-black' : 'border-rose-500/40 bg-black/60'} text-center space-y-5">
          
          <div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl ${isPassed ? 'bg-gradient-to-br from-amber-400 via-emerald-400 to-cyan-400' : 'bg-slate-800'} flex items-center justify-center text-4xl sm:text-5xl shadow-2xl">
            ${isPassed ? '🏆' : '📚'}
          </div>

          <div class="space-y-1.5">
            <span class="px-3 py-1 rounded-full text-xs font-mono font-extrabold ${isPassed ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}">
              ${isPassed ? 'СЕРТИФІКАЦІЮ УСПІШНО ПРОЙДЕНО' : 'ПОТРІБНО ПОВТОРИТИ МАТЕРІАЛ'}
            </span>
            <h2 class="text-xl sm:text-2xl font-black text-white font-mono">
              ${isPassed ? 'Академічний сертифікат: Урок 1 (Kafli 1)' : 'Результат екзамену Уроку 1'}
            </h2>
            <p class="text-xs text-slate-300 font-sans">
              ${isPassed ? 'Вітаємо! Ви вільно володієте займенниками, топонімічними прийменниками та Законом V2.' : 'Для отримання сертифіката необхідно набрати мінімум 12 правильних відповідей (80%).'}
            </p>
          </div>

          <!-- Score Ring Box -->
          <div class="p-4 rounded-2xl bg-black/70 border border-slate-800 inline-flex items-center gap-6">
            <div class="text-left font-mono">
              <div class="text-xs text-slate-400">Ваш результат:</div>
              <div class="text-3xl font-black ${isPassed ? 'text-amber-400' : 'text-rose-400'}">
                ${this.score} / ${total}
              </div>
            </div>
            <div class="text-right font-mono border-l border-slate-800 pl-6">
              <div class="text-xs text-slate-400">Точність:</div>
              <div class="text-3xl font-black text-cyan-400">
                ${percent}%
              </div>
            </div>
          </div>

          ${isPassed ? `
            <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-mono">
              <div class="flex items-center gap-2 text-amber-300 font-bold">
                <span>🎁 Нагорода зарахована:</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-cyan-400 font-bold">+${K1_EXAM_DATA.rewardXp} XP</span>
                <span class="text-emerald-400 font-bold">+${K1_EXAM_DATA.rewardGems} 💎</span>
              </div>
            </div>
          ` : ''}

          <!-- Action Buttons -->
          <div class="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
            <button id="k1-exam-retry-btn" class="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white transition-all cursor-pointer">
              ↺ Пройти ще раз
            </button>
            <button id="k1-exam-back-matrix-btn" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-bold transition-all cursor-pointer">
              🎓 Повернутися до Шпаргалки
            </button>
            ${isPassed ? `
              <button id="k1-exam-next-chapter-btn" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold shadow-lg transition-all cursor-pointer">
                До Уроку 2 (Кав'ярня) ➔
              </button>
            ` : ''}
          </div>

        </div>

      </div>
    `;

    // Bind completion screen buttons
    const retryBtn = this.container.querySelector('#k1-exam-retry-btn');
    if (retryBtn) retryBtn.addEventListener('click', () => this.reset());

    const matrixBtn = this.container.querySelector('#k1-exam-back-matrix-btn');
    if (matrixBtn && typeof this.onOpenMatrix === 'function') {
      matrixBtn.addEventListener('click', () => this.onOpenMatrix());
    }

    const nextChapBtn = this.container.querySelector('#k1-exam-next-chapter-btn');
    if (nextChapBtn && typeof this.onComplete === 'function') {
      nextChapBtn.addEventListener('click', () => this.onComplete());
    }
  }
}
