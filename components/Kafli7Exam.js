/**
 * Kafli7Exam.js - Official 15-Question Final Certification Exam for Lesson 7 & CEFR Level A1
 * (GRAND A1 EXIT CERTIFICATION EXAM — LOKAPRÓF FYRIR STIG A1)
 * 
 * Comprehensive synthesis of Íslenska fyrir alla 1 (Kafli 1-8):
 * - Фонетичні закони, боковий вибух [tl], преаспірація
 * - Закон V2 та інверсія
 * - 4 відмінки BÍN (NF 🔵, ÞF 🟢, ÞGF 🟡, EF 🔴)
 * - Узгодження прикметників та U-умлаут
 * - Безособові конструкції відчуттів та здоров'я
 * - Етикет басейнів Sundlaug та гастрономія
 */

import { K7_EXAM_DATA } from '../data/k7_exam_data.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class Kafli7Exam {
  constructor(container, onComplete = null, onBackToLesson = null) {
    this.container = container;
    this.onComplete = onComplete;
    this.onBackToLesson = onBackToLesson;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = {};
    this.isAnswered = false;
    this.startTime = Date.now();
  }

  isExamPassed() {
    return localStorage.getItem('isl_k7_exam_passed') === 'true';
  }

  getBestScore() {
    return parseInt(localStorage.getItem('isl_k7_exam_score') || '0', 10);
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
    if (this.currentIndex >= K7_EXAM_DATA.questions.length) {
      this.renderCertificationScreen();
      return;
    }

    const q = K7_EXAM_DATA.questions[this.currentIndex];
    const total = K7_EXAM_DATA.questions.length;
    const progressPercent = Math.round((this.currentIndex / total) * 100);

    this.container.innerHTML = `
      <div class="space-y-4 max-w-3xl mx-auto select-none">
        
        <!-- Header Banner -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-purple-950/40 to-cyber-deep border-2 border-amber-400/50 shadow-xl">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
                🏆 ВЕЛИКИЙ ВИПУСКНИЙ ІСПИТ РІВНЯ A1
              </span>
              <span class="text-xs text-slate-400 font-mono">Питання ${this.currentIndex + 1} з ${total}</span>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-white font-mono mt-1">
              ${K7_EXAM_DATA.titleUkr}
            </h3>
          </div>

          <div class="flex items-center gap-3 self-end sm:self-center">
            <div class="text-right">
              <div class="text-[10px] font-mono text-slate-400 uppercase">Бал атестації</div>
              <div class="text-sm font-bold font-mono text-amber-300">${this.score} / ${this.currentIndex}</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-black/60 border border-amber-400/40 flex items-center justify-center text-xl font-bold font-mono text-amber-400">
              ${this.score}
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-black/60 rounded-full h-2.5 p-0.5 border border-slate-800">
          <div class="bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 h-full rounded-full transition-all duration-300" style="width: ${progressPercent}%"></div>
        </div>

        <!-- Question Card -->
        <div class="p-5 sm:p-6 rounded-2xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          
          <div class="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="space-y-1">
              <span class="px-2 py-0.5 rounded bg-black/60 border border-slate-700 text-[10px] font-mono text-amber-400 font-bold uppercase">
                ${this.getBlockName(q.block)}
              </span>
              <h4 class="text-sm sm:text-base font-bold text-white leading-relaxed">
                ${q.questionUkr}
              </h4>
              ${q.promptIsl ? `
                <div class="p-2.5 rounded-lg bg-black/40 border border-slate-800 text-sm font-mono text-amber-300 font-bold flex items-center justify-between">
                  <span>${q.promptIsl}</span>
                  <button id="exam-speak-btn" class="p-1 rounded text-slate-400 hover:text-white" title="Прослухати зразок">
                    🔊
                  </button>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Options Grid -->
          <div class="space-y-2.5">
            ${q.options.map((opt, idx) => `
              <button 
                data-option-index="${idx}" 
                class="exam-option-btn w-full text-left p-3.5 rounded-xl border border-slate-800 hover:border-amber-400/50 bg-black/40 hover:bg-slate-900/60 transition-all flex items-start justify-between gap-3 group"
                ${this.isAnswered ? 'disabled' : ''}
              >
                <div class="flex items-start gap-3">
                  <span class="w-6 h-6 rounded-lg bg-black/60 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-400 group-hover:text-amber-300 group-hover:border-amber-400 shrink-0">
                    ${['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <div>
                    <span class="text-xs sm:text-sm font-mono font-bold text-slate-200 group-hover:text-white">${opt.text}</span>
                  </div>
                </div>
                <div class="option-status-icon text-sm"></div>
              </button>
            `).join('')}
          </div>

          <!-- Answer Feedback Box -->
          <div id="exam-feedback-box" class="hidden p-4 rounded-xl border space-y-2">
            <div id="exam-feedback-title" class="text-xs font-bold font-mono"></div>
            <p id="exam-feedback-text" class="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed"></p>
          </div>

          <!-- Action Controls -->
          <div class="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <button id="exam-quit-btn" class="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs font-mono">
              ✕ Вийти з іспиту
            </button>
            <button id="exam-next-btn" class="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono shadow-lg transition-all hidden">
              Наступне питання ➔
            </button>
          </div>

        </div>

      </div>
    `;

    this.bindEvents(q);
  }

  getBlockName(blockId) {
    const b = K7_EXAM_DATA.blocks.find(item => item.id === blockId);
    return b ? b.nameUkr : 'Тестовий блок';
  }

  bindEvents(q) {
    const speakBtn = this.container.querySelector('#exam-speak-btn');
    if (speakBtn && q.promptIsl) {
      speakBtn.addEventListener('click', () => {
        const cleanText = q.promptIsl.replace(/___/g, '').trim();
        this.speakText(cleanText);
      });
    }

    this.container.querySelectorAll('.exam-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isAnswered) return;
        const optIdx = parseInt(btn.dataset.optionIndex, 10);
        this.handleAnswer(optIdx, q);
      });
    });

    const nextBtn = this.container.querySelector('#exam-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentIndex++;
        this.isAnswered = false;
        this.render();
      });
    }

    const quitBtn = this.container.querySelector('#exam-quit-btn');
    if (quitBtn) {
      quitBtn.addEventListener('click', () => {
        if (confirm("Ви впевнені, що хочете перервати іспит? Прогрес поточного проходження буде втрачено.")) {
          if (typeof this.onBackToLesson === 'function') {
            this.onBackToLesson();
          } else {
            this.reset();
          }
        }
      });
    }
  }

  handleAnswer(optIdx, q) {
    this.isAnswered = true;
    const selectedOpt = q.options[optIdx];
    const isCorrect = selectedOpt.isCorrect;

    if (isCorrect) {
      this.score++;
      if (typeof gameState?.playTriumphFanfare === 'function') {
        gameState.playTriumphFanfare();
      }
    }

    this.answers[this.currentIndex] = {
      questionId: q.id,
      selected: optIdx,
      isCorrect: isCorrect
    };

    const optBtns = this.container.querySelectorAll('.exam-option-btn');
    optBtns.forEach((btn, i) => {
      btn.disabled = true;
      const opt = q.options[i];
      const icon = btn.querySelector('.option-status-icon');

      if (opt.isCorrect) {
        btn.classList.remove('border-slate-800', 'bg-black/40');
        btn.classList.add('border-emerald-500', 'bg-emerald-950/40', 'text-emerald-300');
        if (icon) icon.innerHTML = '✅';
      } else if (i === optIdx && !isCorrect) {
        btn.classList.remove('border-slate-800', 'bg-black/40');
        btn.classList.add('border-rose-500', 'bg-rose-950/40', 'text-rose-300');
        if (icon) icon.innerHTML = '❌';
      } else {
        btn.classList.add('opacity-40');
      }
    });

    // Show feedback
    const feedbackBox = this.container.querySelector('#exam-feedback-box');
    const feedbackTitle = this.container.querySelector('#exam-feedback-title');
    const feedbackText = this.container.querySelector('#exam-feedback-text');
    const nextBtn = this.container.querySelector('#exam-next-btn');

    if (feedbackBox && feedbackTitle && feedbackText) {
      feedbackBox.classList.remove('hidden');
      if (isCorrect) {
        feedbackBox.className = 'p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 space-y-1.5';
        feedbackTitle.className = 'text-xs font-bold font-mono text-emerald-400 flex items-center gap-1.5';
        feedbackTitle.innerHTML = '<span>✅</span> ВІДМІННО! ПРАВИЛЬНА ВІДПОВІДЬ';
      } else {
        feedbackBox.className = 'p-4 rounded-xl border border-rose-500/40 bg-rose-950/30 space-y-1.5';
        feedbackTitle.className = 'text-xs font-bold font-mono text-rose-400 flex items-center gap-1.5';
        feedbackTitle.innerHTML = '<span>💡</span> ЛІНГВІСТИЧНЕ РОЗ\'ЯСНЕННЯ';
      }
      feedbackText.textContent = q.explanation;
    }

    if (nextBtn) {
      nextBtn.classList.remove('hidden');
      if (this.currentIndex === K7_EXAM_DATA.questions.length - 1) {
        nextBtn.textContent = 'Отримати фінальний сертифікат A1 🏆';
      }
    }
  }

  renderCertificationScreen() {
    const total = K7_EXAM_DATA.questions.length;
    const passed = this.score >= K7_EXAM_DATA.passingScore;
    const percent = Math.round((this.score / total) * 100);

    const prevBest = this.getBestScore();
    if (this.score > prevBest) {
      localStorage.setItem('isl_k7_exam_score', this.score.toString());
    }
    if (passed) {
      localStorage.setItem('isl_k7_exam_passed', 'true');
      localStorage.setItem('isl_cefr_a1_certified', 'true');
      if (gameState && typeof gameState.addXp === 'function') {
        gameState.addXp(K7_EXAM_DATA.xpReward);
      }
      if (gameState && typeof gameState.addGems === 'function') {
        gameState.addGems(K7_EXAM_DATA.gemsReward);
      }
    }

    this.container.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6 text-center select-none">
        
        <!-- Grand Certificate Card -->
        <div class="relative p-8 rounded-3xl bg-gradient-to-b from-cyber-card via-black/90 to-cyber-deep border-2 ${passed ? 'border-amber-400 shadow-[0_0_60px_rgba(251,191,36,0.3)]' : 'border-slate-800'} space-y-6">
          
          <!-- Watermark / Stamp -->
          <div class="inline-flex items-center justify-center w-24 h-24 rounded-full ${passed ? 'bg-amber-400/20 text-amber-300 border-2 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.5)]' : 'bg-slate-800 text-slate-500 border border-slate-700'} text-5xl mx-auto">
            ${passed ? '🇮🇸' : '📚'}
          </div>

          <div class="space-y-2">
            <span class="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase ${passed ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 shadow-sm' : 'bg-slate-800 text-slate-400'}">
              ${passed ? 'ОФІЦІЙНИЙ ВИПУСКНИЙ СЕРТИФІКАТ РІВНЯ A1' : 'ІСПИТ ПОТРЕБУЄ ДООПРАЦЮВАННЯ'}
            </span>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white">
              ${K7_EXAM_DATA.titleIsl}
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 font-sans max-w-md mx-auto">
              ${passed 
                ? 'Вітаємо! Ви успішно завершили повний курс Íslenska fyrir alla 1 (Уроки 0–7) та підтвердили базовий рівень володіння ісландською мовою CEFR A1. Вам відкрито доступ до рівня A2!' 
                : 'Для отримання випускного сертифіката A1 необхідно набрати мінімум 12 правильних відповідей (80%). Спробуйте ще раз!'}
            </p>
          </div>

          <!-- Score Matrix -->
          <div class="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-black/60 border border-slate-800 max-w-md mx-auto">
            <div>
              <div class="text-[10px] font-mono text-slate-400 uppercase">Результат</div>
              <div class="text-lg sm:text-xl font-bold font-mono ${passed ? 'text-emerald-400' : 'text-rose-400'}">
                ${this.score} / ${total}
              </div>
            </div>
            <div>
              <div class="text-[10px] font-mono text-slate-400 uppercase">Відсоток</div>
              <div class="text-lg sm:text-xl font-bold font-mono ${passed ? 'text-amber-400' : 'text-slate-300'}">
                ${percent}%
              </div>
            </div>
            <div>
              <div class="text-[10px] font-mono text-slate-400 uppercase">Винагорода</div>
              <div class="text-lg sm:text-xl font-bold font-mono text-amber-400">
                ${passed ? `+${K7_EXAM_DATA.xpReward} XP` : '0 XP'}
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button id="exam-restart-btn" class="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 font-mono text-xs font-bold transition-all">
              🔄 Перескласти іспит
            </button>
            <button id="exam-finish-btn" class="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 text-black font-mono text-xs font-extrabold shadow-lg hover:brightness-110 transition-all">
              ${passed ? 'Повернутися до каталогу курсу A1 ➔' : 'Повернутися до вивчення матеріалу'}
            </button>
          </div>

        </div>

      </div>
    `;

    const restartBtn = this.container.querySelector('#exam-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.reset();
      });
    }

    const finishBtn = this.container.querySelector('#exam-finish-btn');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        if (typeof this.onBackToLesson === 'function') {
          this.onBackToLesson();
        } else if (typeof this.onComplete === 'function') {
          this.onComplete();
        }
      });
    }
  }

  speakText(text) {
    if (!text) return;
    if (audioEngine && typeof audioEngine.speakIcelandic === 'function') {
      audioEngine.speakIcelandic(text);
      return;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'is-IS';
      utt.rate = 0.85;
      window.speechSynthesis.speak(utt);
    }
  }
}
