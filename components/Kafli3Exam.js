/**
 * Kafli3Exam.js - Official 15-Question Final Certification Exam for Lesson 3 (Kafli 3: Dagleg rútína & Tími)
 * Based on "Íslenska fyrir alla 1" (Kafli 4) & Litli málfræðingurinn / Árnastofnun
 * 
 * Features:
 * - 4 Academic Blocks: Закон V2, Годинник & часовий парадокс, Дієслова 3-4 груп, Робочі зміни Vaktir
 * - Real-time progress tracking
 * - Deep linguistic explanations
 * - Luxury Certification Card (+150 XP, +10 Gems, Gold Seal)
 */

import { K3_EXAM_DATA } from '../data/k3_exam_data.js?v=7.9';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class Kafli3Exam {
  constructor(container, onComplete = null, onBackToRoutine = null) {
    this.container = container;
    this.onComplete = onComplete;
    this.onBackToRoutine = onBackToRoutine;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = {};
    this.isAnswered = false;
    this.startTime = Date.now();
  }

  isExamPassed() {
    return localStorage.getItem('isl_k3_exam_passed') === 'true';
  }

  getBestScore() {
    return parseInt(localStorage.getItem('isl_k3_exam_score') || '0', 10);
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
    if (this.currentIndex >= K3_EXAM_DATA.questions.length) {
      this.renderCertificationScreen();
      return;
    }

    const q = K3_EXAM_DATA.questions[this.currentIndex];
    const total = K3_EXAM_DATA.questions.length;
    const progressPercent = Math.round((this.currentIndex / total) * 100);

    this.container.innerHTML = `
      <div class="space-y-4 max-w-3xl mx-auto select-none-text">
        
        <!-- Header Banner -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-cyber-card to-cyber-deep border border-purple-500/30">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Академічний Сертифікаційний Іспит
              </span>
              <span class="text-xs text-slate-400 font-mono">Питання ${this.currentIndex + 1} з ${total}</span>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-white font-mono mt-1">
              ${K3_EXAM_DATA.title_uk}
            </h3>
          </div>

          <div class="flex items-center gap-3 self-end sm:self-center">
            <div class="text-right">
              <div class="text-[10px] font-mono text-slate-400 uppercase">Поточний бал</div>
              <div class="text-sm font-bold font-mono text-purple-300">${this.score} / ${this.currentIndex}</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-black/60 border border-slate-700 flex items-center justify-center text-xl font-bold font-mono text-purple-400">
              ${this.score}
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-black/60 rounded-full h-2 p-0.5 border border-slate-800">
          <div class="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-300" style="width: ${progressPercent}%"></div>
        </div>

        <!-- Question Card -->
        <div class="p-5 sm:p-6 rounded-2xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          
          <div class="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="space-y-1">
              <span class="px-2 py-0.5 rounded bg-black/60 border border-slate-700 text-[10px] font-mono text-purple-400 font-bold uppercase">
                ${this.getBlockName(q.block_id)}
              </span>
              <h4 class="text-sm sm:text-base font-bold text-white leading-relaxed">
                ${q.question_uk}
              </h4>
            </div>

            ${q.audio_prompt ? `
              <button id="exam-speak-btn" class="p-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 transition-all flex items-center gap-1.5 shrink-0" title="Прослухати зразок">
                <span>🔊</span><span class="text-xs font-mono hidden sm:inline">Звук</span>
              </button>
            ` : ''}
          </div>

          <!-- Options Grid -->
          <div class="space-y-2.5">
            ${q.options.map((opt, idx) => `
              <button 
                data-option-index="${idx}" 
                class="exam-option-btn w-full text-left p-3.5 rounded-xl border border-slate-800 hover:border-purple-500/50 bg-black/40 hover:bg-slate-900/60 transition-all flex items-start justify-between gap-3 group"
                ${this.isAnswered ? 'disabled' : ''}
              >
                <div class="flex items-start gap-3">
                  <span class="w-6 h-6 rounded-lg bg-black/60 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-400 group-hover:text-purple-300 group-hover:border-purple-400 shrink-0">
                    ${['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <div>
                    <span class="text-xs sm:text-sm font-mono font-bold text-slate-200 group-hover:text-white">${opt.text}</span>
                    ${this.isAnswered ? `<div class="text-[11px] text-slate-400 font-sans mt-0.5">${opt.note}</div>` : ''}
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
            <button id="exam-next-btn" class="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-bold text-xs font-mono shadow-lg transition-all hidden">
              Наступне питання ➔
            </button>
          </div>

        </div>

      </div>
    `;

    this.bindEvents(q);
  }

  getBlockName(blockId) {
    const b = K3_EXAM_DATA.blocks.find(item => item.id === blockId);
    return b ? b.name_uk : 'Тестовий блок';
  }

  bindEvents(q) {
    const speakBtn = this.container.querySelector('#exam-speak-btn');
    if (speakBtn && q.audio_prompt) {
      speakBtn.addEventListener('click', () => {
        this.speakText(q.audio_prompt);
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
        if (confirm('Ви впевнені, що хочете перервати іспит? Прогрес поточного проходження буде втрачено.')) {
          if (typeof this.onBackToRoutine === 'function') {
            this.onBackToRoutine();
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
    const isCorrect = selectedOpt.is_correct;

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

      if (opt.is_correct) {
        btn.className = 'w-full text-left p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-950/40 text-emerald-200 transition-all flex items-start justify-between gap-3';
        if (icon) icon.innerHTML = '✅';
      } else if (i === optIdx && !isCorrect) {
        btn.className = 'w-full text-left p-3.5 rounded-xl border-2 border-rose-500 bg-rose-950/40 text-rose-200 transition-all flex items-start justify-between gap-3';
        if (icon) icon.innerHTML = '❌';
      } else {
        btn.className = 'w-full text-left p-3.5 rounded-xl border border-slate-900 bg-black/30 text-slate-600 opacity-60 flex items-start justify-between gap-3';
      }
    });

    const feedbackBox = this.container.querySelector('#exam-feedback-box');
    const feedbackTitle = this.container.querySelector('#exam-feedback-title');
    const feedbackText = this.container.querySelector('#exam-feedback-text');
    const nextBtn = this.container.querySelector('#exam-next-btn');

    if (feedbackBox && feedbackTitle && feedbackText) {
      feedbackBox.classList.remove('hidden');
      if (isCorrect) {
        feedbackBox.className = 'p-4 rounded-xl border border-emerald-500/50 bg-emerald-950/30 text-emerald-200 space-y-1.5';
        feedbackTitle.innerHTML = '✅ РЕЗУЛЬТАТ: ВІРНО! (+1 бал)';
      } else {
        feedbackBox.className = 'p-4 rounded-xl border border-rose-500/50 bg-rose-950/30 text-rose-200 space-y-1.5';
        feedbackTitle.innerHTML = '❌ РЕЗУЛЬТАТ: НЕВІРНО!';
      }
      feedbackText.innerHTML = q.explanation_deep;
    }

    if (nextBtn) {
      nextBtn.classList.remove('hidden');
    }
  }

  speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'is-IS';
    utt.rate = 0.9;
    window.speechSynthesis.speak(utt);
  }

  renderCertificationScreen() {
    const total = K3_EXAM_DATA.questions.length;
    const isPassed = this.score >= K3_EXAM_DATA.passing_score;
    const percent = Math.round((this.score / total) * 100);

    const prevBest = this.getBestScore();
    if (this.score > prevBest) {
      localStorage.setItem('isl_k3_exam_score', String(this.score));
    }
    if (isPassed) {
      localStorage.setItem('isl_k3_exam_passed', 'true');
      if (typeof gameState?.addXP === 'function') {
        gameState.addXP(150);
      }
    }

    this.container.innerHTML = `
      <div class="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-cyber-card border-2 ${isPassed ? 'border-amber-400/80 shadow-2xl shadow-amber-500/20' : 'border-rose-500/50 shadow-xl'} space-y-6 text-center">
        
        <div class="space-y-2">
          <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-black/60 border ${isPassed ? 'border-amber-400 text-amber-300' : 'border-rose-500 text-rose-400'} flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
            ${isPassed ? '🏆' : '📚'}
          </div>
          <span class="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${isPassed ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}">
            ${isPassed ? 'ІСПИТ УСПІШНО СКЛАДЕНО' : 'ПОТРІБНО ПОВТОРИТИ МАТЕРІАЛ'}
          </span>
          <h2 class="text-xl sm:text-2xl font-black text-white font-mono">
            ${K3_EXAM_DATA.title_is}
          </h2>
          <p class="text-xs text-slate-400 font-sans">
            ${K3_EXAM_DATA.source_standard}
          </p>
        </div>

        <!-- Score Badge -->
        <div class="p-4 rounded-2xl bg-black/60 border border-slate-800 flex items-center justify-around gap-4">
          <div>
            <div class="text-xs text-slate-400 font-mono">Підсумковий бал</div>
            <div class="text-2xl sm:text-3xl font-black font-mono ${isPassed ? 'text-amber-300' : 'text-rose-400'}">
              ${this.score} / ${total}
            </div>
          </div>
          <div class="w-px h-10 bg-slate-800"></div>
          <div>
            <div class="text-xs text-slate-400 font-mono">Відсоток точності</div>
            <div class="text-2xl sm:text-3xl font-black font-mono text-cyan-300">
              ${percent}%
            </div>
          </div>
          <div class="w-px h-10 bg-slate-800"></div>
          <div>
            <div class="text-xs text-slate-400 font-mono">Поріг успіху</div>
            <div class="text-2xl sm:text-3xl font-black font-mono text-slate-300">
              ${K3_EXAM_DATA.passing_score} (80%)
            </div>
          </div>
        </div>

        <div class="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-lg mx-auto">
          ${isPassed 
            ? 'Вітаємо! Ви повністю опанували залізний закон V2, ісландський час та відмінювання сильних дієслів. Вам нараховано <strong>+150 XP</strong> та відкрито доступ до наступних модулів.' 
            : 'Для отримання академічного сертифіката необхідно набрати щонайменше 12 правильних відповідей із 15 (80%). Повторіть матеріал рутини та спробуйте ще раз.'}
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button id="exam-retry-btn" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-black/70 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-bold transition-all">
            🔄 Скласти іспит знову
          </button>
          ${isPassed ? `
            <button id="exam-continue-btn" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-mono font-extrabold shadow-lg transition-all">
              Продовжити навчання ➔
            </button>
          ` : ''}
        </div>

      </div>
    `;

    const retryBtn = this.container.querySelector('#exam-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.reset());
    }

    const contBtn = this.container.querySelector('#exam-continue-btn');
    if (contBtn) {
      contBtn.addEventListener('click', () => {
        if (typeof this.onComplete === 'function') {
          this.onComplete();
        } else if (typeof this.onBackToRoutine === 'function') {
          this.onBackToRoutine();
        }
      });
    }
  }
}
