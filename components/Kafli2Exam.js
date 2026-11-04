/**
 * Kafli2Exam.js - Official 15-Question Final Certification Exam for Lesson 2 (Kafli 2: Á kaffihúsi)
 * Based on "Íslenska fyrir alla 1" (Kafli 3 & 4) & Árnastofnun / Háskóli Íslands Academic Standards
 * 
 * Features:
 * - 4 Academic Blocks: Чоловічий рід (kk. ÞF 🟢), Жіночий рід та U-умляут (kvk. ÞF 🟢), Середній рід & числівники, Етикет кав'ярні та ціни
 * - Real-time progress tracking
 * - Deep linguistic explanations from Árnastofnun / BÍN
 * - Luxury Certification Card (+150 XP, +10 Gems, Gold Seal)
 * - Completion callback routing to Lesson 3 (Hversdagsleiki & Tími)
 */

import { K2_EXAM_DATA } from '../data/k2_exam_data.js?v=7.8';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class Kafli2Exam {
  constructor(container, onComplete = null, onBackToLab = null) {
    this.container = container;
    this.onComplete = onComplete;
    this.onBackToLab = onBackToLab;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = {};
    this.isAnswered = false;
    this.startTime = Date.now();
  }

  isExamPassed() {
    return localStorage.getItem('isl_k2_exam_passed') === 'true';
  }

  getBestScore() {
    return parseInt(localStorage.getItem('isl_k2_exam_score') || '0', 10);
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
    if (this.currentIndex >= K2_EXAM_DATA.questions.length) {
      this.renderCertificationScreen();
      return;
    }

    const q = K2_EXAM_DATA.questions[this.currentIndex];
    const total = K2_EXAM_DATA.questions.length;
    const progressPercent = Math.round((this.currentIndex / total) * 100);

    this.container.innerHTML = `
      <div class="space-y-4 max-w-3xl mx-auto select-none-text">
        
        <!-- Header Banner -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-cyber-card to-cyber-deep border border-emerald-500/30">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Á kaffihúsi 🟢
              </span>
              <span class="text-xs font-mono text-slate-400">Питання ${this.currentIndex + 1} з ${total}</span>
            </div>
            <h2 class="text-base sm:text-lg font-extrabold text-white mt-1">
              ${K2_EXAM_DATA.title_uk}
            </h2>
          </div>
          
          <div class="flex items-center gap-3">
            <div class="text-right">
              <div class="text-[10px] font-mono text-slate-400">Поточний бал</div>
              <div class="text-base font-bold font-mono text-emerald-300">${this.score} / ${this.currentIndex}</div>
            </div>
            <button id="k2-exam-reset-btn" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-mono transition-all" title="Почати спочатку">
              ↻ Скинути
            </button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
          <div class="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full transition-all duration-300" style="width: ${progressPercent}%"></div>
        </div>

        <!-- Question Card -->
        <div class="p-6 rounded-2xl bg-cyber-card border border-cyber-border shadow-xl space-y-5">
          
          <!-- Block Badge -->
          <div class="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>${this.getBlockName(q.block_id)}</span>
          </div>

          <!-- Question Body -->
          <div class="text-base sm:text-lg font-bold text-white leading-relaxed">
            ${q.question_uk}
          </div>

          <!-- Options Grid -->
          <div class="grid grid-cols-1 gap-2.5 pt-2">
            ${q.options.map((opt, idx) => `
              <button data-opt-idx="${idx}" class="k2-opt-btn w-full p-4 rounded-xl border text-left transition-all font-mono text-sm flex items-start gap-3 bg-cyber-deep/60 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50 text-slate-200">
                <span class="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0 mt-0.5">
                  ${String.fromCharCode(65 + idx)}
                </span>
                <span class="flex-1 font-sans text-sm">${opt.text}</span>
              </button>
            `).join('')}
          </div>

          <!-- Feedback & Explanation (Hidden until answered) -->
          <div id="k2-explanation-panel" class="hidden p-4 rounded-xl border text-xs leading-relaxed space-y-2"></div>

          <!-- Action Footer -->
          <div class="flex items-center justify-between pt-3 border-t border-slate-800/80">
            <div class="text-[11px] font-mono text-slate-400">
              Стандарт: <span class="text-emerald-300 font-semibold">Íslenska fyrir alla 1 (Kafli 3–4)</span>
            </div>
            <button id="k2-next-question-btn" class="hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-extrabold text-xs font-mono transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20">
              ${this.currentIndex === total - 1 ? 'Завершити іспит 🏆' : 'Наступне питання →'}
            </button>
          </div>

        </div>

      </div>
    `;

    this.bindEvents(q);
  }

  getBlockName(blockId) {
    const b = K2_EXAM_DATA.blocks.find(x => x.id === blockId);
    return b ? b.name_uk : 'Граматичний блок';
  }

  bindEvents(q) {
    const resetBtn = this.container.querySelector('#k2-exam-reset-btn');
    if (resetBtn) resetBtn.onclick = () => this.reset();

    const optButtons = this.container.querySelectorAll('.k2-opt-btn');
    const explPanel = this.container.querySelector('#k2-explanation-panel');
    const nextBtn = this.container.querySelector('#k2-next-question-btn');

    optButtons.forEach(btn => {
      btn.onclick = () => {
        if (this.isAnswered) return;
        this.isAnswered = true;
        const chosenIdx = parseInt(btn.dataset.optIdx, 10);
        const chosenOpt = q.options[chosenIdx];
        const isCorrect = chosenOpt.is_correct;

        if (isCorrect) {
          this.score += 1;
          audioEngine.playSuccess();
        } else {
          audioEngine.playError();
        }

        this.answers[q.id] = { chosenIndex: chosenIdx, isCorrect };

        // Colorize options
        optButtons.forEach((b, idx) => {
          b.disabled = true;
          const opt = q.options[idx];
          if (opt.is_correct) {
            b.className = 'w-full p-4 rounded-xl border text-left font-mono text-sm flex items-start gap-3 bg-emerald-950/40 border-emerald-500 text-emerald-200';
            b.querySelector('span').className = 'w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5';
            b.querySelector('span').innerText = '✓';
          } else if (idx === chosenIdx && !isCorrect) {
            b.className = 'w-full p-4 rounded-xl border text-left font-mono text-sm flex items-start gap-3 bg-rose-950/40 border-rose-500 text-rose-200';
            b.querySelector('span').className = 'w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5';
            b.querySelector('span').innerText = '✕';
          } else {
            b.className = 'w-full p-4 rounded-xl border text-left font-mono text-sm flex items-start gap-3 bg-slate-900/40 border-slate-800 text-slate-500 opacity-50';
          }
        });

        // Show Explanation
        if (explPanel) {
          explPanel.classList.remove('hidden');
          explPanel.className = `p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
            isCorrect ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
          }`;
          explPanel.innerHTML = `
            <div class="font-bold flex items-center gap-1.5 font-mono">
              <span>${isCorrect ? '✨ ПРАВИЛЬНО!' : '⚠️ ПОМИЛКА!'}</span>
              <span class="text-slate-300 font-normal">| ${chosenOpt.note}</span>
            </div>
            <div class="text-[11px] text-slate-300 pt-1 border-t border-slate-700/50">
              <strong class="text-cyan-300 font-mono">Правило BÍN:</strong> ${q.grammar_rule}
            </div>
          `;
        }

        if (nextBtn) {
          nextBtn.classList.remove('hidden');
          nextBtn.onclick = () => {
            this.currentIndex += 1;
            this.isAnswered = false;
            this.render();
          };
        }
      };
    });
  }

  renderCertificationScreen() {
    const total = K2_EXAM_DATA.questions.length;
    const isPassed = this.score >= K2_EXAM_DATA.passing_score;
    const percent = Math.round((this.score / total) * 100);

    if (isPassed) {
      localStorage.setItem('isl_k2_exam_passed', 'true');
      const prevBest = this.getBestScore();
      if (this.score > prevBest) {
        localStorage.setItem('isl_k2_exam_score', this.score.toString());
      }
      gameState.addXp(150);
      gameState.addGems(10);
      audioEngine.playFanfare();
    }

    this.container.innerHTML = `
      <div class="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-cyber-card border ${isPassed ? 'border-emerald-500/50 glow-emerald' : 'border-rose-500/50'} text-center space-y-6">
        
        <div class="w-20 h-20 mx-auto rounded-3xl ${isPassed ? 'bg-gradient-to-tr from-emerald-500 to-cyan-500' : 'bg-rose-500/20 border border-rose-500/40'} flex items-center justify-center text-4xl shadow-xl">
          ${isPassed ? '🏆' : '📚'}
        </div>

        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold ${
            isPassed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
          }">
            ${isPassed ? '● СЕРТИФІКАТ ЗДОБУТО (A1.2)' : '● ІСПИТ НЕ СКЛАДЕНО'}
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white">
            ${isPassed ? 'Вітаємо! Урок 2 Успішно Складено!' : 'Необхідно Повторити Матеріал'}
          </h2>
          <p class="text-slate-400 text-sm max-w-md mx-auto">
            ${isPassed 
              ? 'Ви бездоганно опанували знахідний відмінок їжі, числівники та етикет замовлення в кав\'ярні за стандартом Íslenska fyrir alla 1.' 
              : 'Для отримання сертифіката потрібно набрати мінімум 12 з 15 балів (80%). Повторіть флексії та спробуйте знову!'}
          </p>
        </div>

        <!-- Score Ring / Box -->
        <div class="grid grid-cols-2 gap-3 max-w-xs mx-auto font-mono">
          <div class="p-3 rounded-xl bg-black/50 border border-slate-800">
            <div class="text-[10px] text-slate-400">Ваш результат</div>
            <div class="text-2xl font-bold ${isPassed ? 'text-emerald-400' : 'text-rose-400'}">${this.score} / ${total}</div>
          </div>
          <div class="p-3 rounded-xl bg-black/50 border border-slate-800">
            <div class="text-[10px] text-slate-400">Відсоток успіху</div>
            <div class="text-2xl font-bold ${isPassed ? 'text-cyan-400' : 'text-slate-300'}">${percent}%</div>
          </div>
        </div>

        ${isPassed ? `
          <div class="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-around font-mono text-xs">
            <span class="text-amber-400 font-bold">+150 XP Досвіду</span>
            <span class="text-cyan-400 font-bold">+10 Кристалів 💎</span>
            <span class="text-emerald-400 font-bold">Розблоковано Урок 3</span>
          </div>
        ` : ''}

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button id="k2-exam-retry-btn" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-mono text-xs font-bold transition-all">
            ↻ Скласти ще раз
          </button>
          
          ${isPassed ? `
            <button id="k2-next-chapter-btn" class="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-mono text-xs font-extrabold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20">
              Перейти до Уроку 3: Рутина & Час →
            </button>
          ` : `
            <button id="k2-back-to-lab-btn" class="w-full sm:w-auto px-7 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-mono text-xs font-bold transition-all">
              Повернутися до тренажера кав'ярні ☕
            </button>
          `}
        </div>

      </div>
    `;

    const retryBtn = this.container.querySelector('#k2-exam-retry-btn');
    if (retryBtn) retryBtn.onclick = () => this.reset();

    const nextChBtn = this.container.querySelector('#k2-next-chapter-btn');
    if (nextChBtn) {
      nextChBtn.onclick = () => {
        if (typeof this.onComplete === 'function') {
          this.onComplete();
        }
      };
    }

    const backLabBtn = this.container.querySelector('#k2-back-to-lab-btn');
    if (backLabBtn) {
      backLabBtn.onclick = () => {
        if (typeof this.onBackToLab === 'function') {
          this.onBackToLab();
        }
      };
    }
  }
}
