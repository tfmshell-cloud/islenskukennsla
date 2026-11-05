/**
 * B1K1Exam.js - Academic Examination Component for Level B1 • Lesson 1
 * (B1.1 PRÓF: VIÐTENGINGARHÁTTUR, EFNAHAGSMÁL OG KJARASAMNINGAR)
 */

import { B1_K1_EXAM_DATA } from '../data/b1_k1_exam_data.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class B1K1Exam {
  constructor(container, onComplete = null, onBackToLesson = null) {
    this.container = container;
    this.onComplete = onComplete;
    this.onBackToLesson = onBackToLesson;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = {};
    this.isSubmitted = false;
  }

  render() {
    const q = B1_K1_EXAM_DATA.questions[this.currentIndex];
    const total = B1_K1_EXAM_DATA.questions.length;
    const progress = Math.round(((this.currentIndex) / total) * 100);

    if (this.isSubmitted) {
      this.renderResults();
      return;
    }

    const promptText = q.question || q.promptUkr;
    const audioTrack = q.audioUrl || q.audio;

    this.container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 select-none pb-12">
        <!-- Header -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-amber-500/50 shadow-xl space-y-4">
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Рівень B1 • Книга 3 • Розділ 1
            </span>
            <span class="text-xs font-mono text-slate-400">Питання ${this.currentIndex + 1} з ${total}</span>
          </div>
          <div>
            <h2 class="text-xl font-bold font-mono text-white flex items-center gap-2">
              <span>📊</span> ${B1_K1_EXAM_DATA.titleUkr}
            </h2>
            <p class="text-xs font-mono text-amber-400 mt-1">${B1_K1_EXAM_DATA.titleIsl}</p>
          </div>
          <!-- Progress Bar -->
          <div class="w-full bg-cyber-deep h-2 rounded-full overflow-hidden border border-cyber-border">
            <div class="bg-gradient-to-r from-amber-500 to-orange-400 h-full transition-all duration-300" style="width: ${progress}%"></div>
          </div>
        </div>

        <!-- Question Card -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-6 shadow-xl">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono text-amber-400 uppercase tracking-wider">Завдання #${this.currentIndex + 1}</span>
              ${q.type === 'listening' ? '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">🎧 Hlustunarpróf (Слухання)</span>' : ''}
            </div>
            <h3 class="text-lg font-mono font-bold text-white leading-relaxed">${promptText}</h3>
            ${audioTrack ? `
              <div class="pt-2">
                <button class="exam-audio-play-btn px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500 text-purple-200 hover:text-black border border-purple-500/40 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md" data-audio="${audioTrack}">
                  <span>🎧</span><span>Прослухати аудіофрагмент RÚV</span>
                </button>
              </div>
            ` : ''}
          </div>

          <!-- Options -->
          <div class="space-y-3">
            ${q.options.map((opt, idx) => `
              <button class="b1-exam-opt-btn w-full p-4 rounded-2xl border text-left font-mono text-sm transition-all flex items-center justify-between group ${this.answers[this.currentIndex] === idx ? 'bg-amber-500/20 border-amber-500 text-white font-bold shadow-md' : 'bg-cyber-deep/60 border-cyber-border text-slate-300 hover:border-amber-400/50 hover:text-white'}" data-index="${idx}">
                <div class="flex items-center gap-3">
                  <span class="w-7 h-7 rounded-xl bg-black/40 border border-cyber-border flex items-center justify-center text-xs font-bold text-amber-300 group-hover:border-amber-400">
                    ${['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <span>${opt}</span>
                </div>
                ${this.answers[this.currentIndex] === idx ? '<span class="text-amber-400 text-xs">✓ Обрано</span>' : ''}
              </button>
            `).join('')}
          </div>

          <!-- Navigation Footer -->
          <div class="flex items-center justify-between pt-4 border-t border-cyber-border">
            <button id="b1-exam-prev-btn" class="px-5 py-2.5 rounded-xl border border-cyber-border bg-cyber-deep/60 text-slate-300 hover:text-white hover:border-slate-500 font-mono text-xs transition-all ${this.currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}" ${this.currentIndex === 0 ? 'disabled' : ''}>
              ← Попереднє
            </button>

            ${this.currentIndex < total - 1 ? `
              <button id="b1-exam-next-btn" class="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer">
                Наступне →
              </button>
            ` : `
              <button id="b1-exam-submit-btn" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:opacity-90 text-black font-bold font-mono text-xs transition-all shadow-xl shadow-amber-500/30 cursor-pointer">
                Завершити іспит B1.1 ✓
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('.b1-exam-opt-btn').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index, 10);
        this.answers[this.currentIndex] = idx;
        audioEngine.playBlip?.();
        this.render();
      };
    });

    const audioBtn = this.container.querySelector('.exam-audio-play-btn');
    if (audioBtn) {
      audioBtn.onclick = (e) => {
        e.stopPropagation();
        const audioSrc = audioBtn.dataset.audio;
        if (audioSrc) {
          audioEngine.play(audioSrc, audioBtn);
        }
      };
    }

    const prevBtn = this.container.querySelector('#b1-exam-prev-btn');
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.render();
        }
      };
    }

    const nextBtn = this.container.querySelector('#b1-exam-next-btn');
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (this.currentIndex < B1_K1_EXAM_DATA.questions.length - 1) {
          this.currentIndex++;
          this.render();
        }
      };
    }

    const submitBtn = this.container.querySelector('#b1-exam-submit-btn');
    if (submitBtn) {
      submitBtn.onclick = () => {
        this.calculateResults();
      };
    }
  }

  calculateResults() {
    let score = 0;
    B1_K1_EXAM_DATA.questions.forEach((q, idx) => {
      const correctIdx = q.correctIndex !== undefined ? q.correctIndex : q.correct;
      if (this.answers[idx] === correctIdx) {
        score++;
      }
    });
    this.score = score;
    this.isSubmitted = true;

    const isPassed = this.score >= B1_K1_EXAM_DATA.passingScore;
    if (isPassed) {
      audioEngine.playSuccess?.();
      gameState.addPoints?.(200);
      gameState.markExamPassed?.('b1_k1');
    } else {
      audioEngine.playError?.();
    }

    this.render();
  }

  renderResults() {
    const total = B1_K1_EXAM_DATA.questions.length;
    const isPassed = this.score >= B1_K1_EXAM_DATA.passingScore;
    const pct = Math.round((this.score / total) * 100);

    this.container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 select-none pb-12">
        <div class="p-8 rounded-3xl bg-cyber-card border ${isPassed ? 'border-amber-500/70' : 'border-rose-500/60'} shadow-2xl space-y-6 text-center">
          <div class="w-20 h-20 mx-auto rounded-3xl ${isPassed ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'} flex items-center justify-center text-4xl shadow-lg">
            ${isPassed ? '📊' : '⚠️'}
          </div>

          <div class="space-y-2">
            <span class="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${isPassed ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}">
              ${isPassed ? 'Іспит B1.1 успішно складено!' : 'Спробуйте ще раз'}
            </span>
            <h2 class="text-2xl font-bold font-mono text-white">
              Результат: ${this.score} з ${total} (${pct}%)
            </h2>
            <p class="text-xs font-mono text-slate-300">
              ${isPassed ? 'Ви підтвердили володіння кон\'юнктивом (viðtengingarháttur), економічною термінологією та аналізом публічних заяв.' : `Для сертифікації B1.1 необхідно набрати щонайменше ${B1_K1_EXAM_DATA.passingScore} балів.`}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-cyber-border">
            <button id="b1-exam-retry-btn" class="w-full sm:w-auto px-6 py-3 rounded-xl border border-cyber-border bg-cyber-deep/80 hover:bg-white/10 text-white font-mono text-xs font-bold transition-all cursor-pointer">
              🔄 Перескласти іспит
            </button>
            <button id="b1-exam-back-btn" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all shadow-lg shadow-amber-500/20 cursor-pointer">
              📖 Огляд матеріалів B1.1
            </button>
          </div>
        </div>

        <!-- Answers Review -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4">
          <h3 class="text-base font-bold font-mono text-white flex items-center gap-2">
            <span>📋</span><span>Детальний аналіз відповідей:</span>
          </h3>
          <div class="space-y-3 divide-y divide-cyber-border/40">
            ${B1_K1_EXAM_DATA.questions.map((q, idx) => {
              const userAns = this.answers[idx];
              const correctIdx = q.correctIndex !== undefined ? q.correctIndex : q.correct;
              const isCorrect = userAns === correctIdx;
              const prompt = q.question || q.promptUkr;
              return `
                <div class="pt-3 space-y-1 font-mono text-xs">
                  <div class="flex items-start justify-between gap-2">
                    <span class="text-slate-300 font-bold">#${idx + 1}. ${prompt}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'} shrink-0">
                      ${isCorrect ? '✓ Правильно' : '✗ Помилка'}
                    </span>
                  </div>
                  <div class="text-slate-400 text-[11px]">
                    Ваша відповідь: <span class="${isCorrect ? 'text-emerald-300' : 'text-rose-400 font-bold'}">${userAns !== undefined ? q.options[userAns] : 'Немає відповіді'}</span>
                  </div>
                  ${!isCorrect ? `
                    <div class="text-emerald-300 text-[11px]">
                      Правильна відповідь: <span>${q.options[correctIdx]}</span>
                    </div>
                  ` : ''}
                  <div class="text-slate-400 text-[11px] bg-cyber-deep/40 p-2 rounded-lg border border-cyber-border/40 mt-1">
                    💡 ${q.explanation}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    const retryBtn = this.container.querySelector('#b1-exam-retry-btn');
    if (retryBtn) {
      retryBtn.onclick = () => {
        this.currentIndex = 0;
        this.score = 0;
        this.answers = {};
        this.isSubmitted = false;
        this.render();
      };
    }

    const backBtn = this.container.querySelector('#b1-exam-back-btn');
    if (backBtn && this.onBackToLesson) {
      backBtn.onclick = () => {
        this.onBackToLesson();
      };
    }
  }
}
