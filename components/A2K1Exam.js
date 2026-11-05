/**
 * A2K1Exam.js - Interactive Academic Certification Exam Component for Book 2 / Kafli 1
 * (LEVEL A2.1 FOUNDATION CERTIFICATION EXAM)
 */

import { A2_K1_EXAM_DATA } from '../data/a2_k1_exam_data.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class A2K1Exam {
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
    const q = A2_K1_EXAM_DATA.questions[this.currentIndex];
    const total = A2_K1_EXAM_DATA.questions.length;
    const progress = Math.round(((this.currentIndex) / total) * 100);

    if (this.isSubmitted) {
      this.renderResults();
      return;
    }

    this.container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 select-none pb-12">
        <!-- Header -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-indigo-500/40 shadow-xl space-y-4">
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Рівень A2 • Книга 2 • Кафлі 1
            </span>
            <span class="text-xs font-mono text-slate-400">Питання ${this.currentIndex + 1} з ${total}</span>
          </div>
          <div>
            <h2 class="text-xl font-bold font-mono text-white">${A2_K1_EXAM_DATA.titleUkr}</h2>
            <p class="text-xs font-mono text-indigo-400 mt-1">${A2_K1_EXAM_DATA.titleIsl}</p>
          </div>
          <!-- Progress Bar -->
          <div class="w-full bg-cyber-deep h-2 rounded-full overflow-hidden border border-cyber-border">
            <div class="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300" style="width: ${progress}%"></div>
          </div>
        </div>

        <!-- Question Card -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-6 shadow-xl">
          <div class="space-y-2">
            <span class="text-xs font-mono text-cyan-400 uppercase tracking-wider">Завдання #${this.currentIndex + 1}</span>
            <h3 class="text-lg font-mono font-bold text-white leading-relaxed">${q.promptUkr}</h3>
            ${q.audio ? `
              <div class="pt-2">
                <button class="exam-audio-play-btn px-4 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500 text-indigo-300 hover:text-black border border-indigo-500/40 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm" data-audio="${q.audio}">
                  <span>🎧</span><span>Прослухати аудіозапис (Hlustun)</span>
                </button>
              </div>
            ` : ''}
          </div>

          <!-- Options -->
          <div class="space-y-3">
            ${q.options.map((opt, idx) => `
              <button class="a2-exam-opt-btn w-full p-4 rounded-2xl border text-left font-mono text-sm transition-all flex items-center justify-between group ${this.answers[this.currentIndex] === idx ? 'bg-indigo-500/20 border-indigo-500 text-white font-bold shadow-md' : 'bg-cyber-deep/60 border-cyber-border text-slate-300 hover:border-indigo-400/50 hover:text-white'}" data-index="${idx}">
                <div class="flex items-center gap-3">
                  <span class="w-7 h-7 rounded-xl bg-black/40 border border-cyber-border flex items-center justify-center text-xs font-bold text-indigo-300 group-hover:border-indigo-400">
                    ${['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <span>${opt}</span>
                </div>
                <span class="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">Обрати ➔</span>
              </button>
            `).join('')}
          </div>

          <!-- Navigation controls -->
          <div class="flex items-center justify-between pt-4 border-t border-cyber-border">
            <button id="a2-exam-prev-btn" class="px-4 py-2 rounded-xl border border-cyber-border text-xs font-mono text-slate-400 hover:text-white transition-all ${this.currentIndex === 0 ? 'opacity-40 pointer-events-none' : ''}">
              ← Назад
            </button>
            ${this.currentIndex === total - 1 ? `
              <button id="a2-exam-submit-btn" class="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-black font-mono font-bold text-xs shadow-lg hover:brightness-110 transition-all ${this.answers[this.currentIndex] === undefined ? 'opacity-50 pointer-events-none' : ''}">
                Завершити іспит 🏆
              </button>
            ` : `
              <button id="a2-exam-next-btn" class="px-6 py-2 rounded-xl bg-indigo-500/30 hover:bg-indigo-500 text-indigo-300 hover:text-black border border-indigo-500/50 font-mono font-bold text-xs transition-all ${this.answers[this.currentIndex] === undefined ? 'opacity-50 pointer-events-none' : ''}">
                Далі →
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('.a2-exam-opt-btn').forEach(btn => {
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

    const prevBtn = this.container.querySelector('#a2-exam-prev-btn');
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.render();
        }
      };
    }

    const nextBtn = this.container.querySelector('#a2-exam-next-btn');
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (this.currentIndex < A2_K1_EXAM_DATA.questions.length - 1) {
          this.currentIndex++;
          this.render();
        }
      };
    }

    const submitBtn = this.container.querySelector('#a2-exam-submit-btn');
    if (submitBtn) {
      submitBtn.onclick = () => {
        this.submitExam();
      };
    }
  }

  submitExam() {
    let correctCount = 0;
    A2_K1_EXAM_DATA.questions.forEach((q, idx) => {
      if (this.answers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    this.score = Math.round((correctCount / A2_K1_EXAM_DATA.questions.length) * 100);
    this.isSubmitted = true;

    if (this.score >= A2_K1_EXAM_DATA.passingScore) {
      gameState.addXp(A2_K1_EXAM_DATA.xpReward);
      gameState.addGems(A2_K1_EXAM_DATA.gemReward);
      if (this.onComplete) {
        this.onComplete(this.score, A2_K1_EXAM_DATA.questions.length);
      }
    }

    this.render();
  }

  renderResults() {
    const isPassed = this.score >= A2_K1_EXAM_DATA.passingScore;
    const total = A2_K1_EXAM_DATA.questions.length;

    this.container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 select-none pb-12">
        <div class="p-8 rounded-3xl bg-cyber-card border ${isPassed ? 'border-emerald-500/50 shadow-emerald-950/40' : 'border-rose-500/50 shadow-rose-950/40'} shadow-2xl text-center space-y-4">
          <span class="text-6xl">${isPassed ? '🏆' : '📚'}</span>
          <div>
            <h2 class="text-2xl font-bold font-mono text-white">
              ${isPassed ? 'Вітаємо! Іспит A2.1 успішно складено' : 'Іспит не складено (менше 80%)'}
            </h2>
            <p class="text-sm font-sans text-slate-300 mt-1">
              ${isPassed ? 'Ви успішно засвоїли граматику минулого часу та побутові норми оренди житла в Ісландії.' : 'Рекомендуємо повторити правила утворення минулого часу та умови оренди житла.'}
            </p>
          </div>

          <div class="flex items-center justify-center gap-6 py-4">
            <div class="p-4 rounded-2xl bg-cyber-deep border border-cyber-border text-center">
              <span class="text-xs font-mono text-slate-400 block">Результат:</span>
              <span class="text-3xl font-extrabold font-mono ${isPassed ? 'text-emerald-400' : 'text-rose-400'}">${this.score}%</span>
            </div>
            ${isPassed ? `
              <div class="p-4 rounded-2xl bg-cyber-deep border border-cyber-border text-center">
                <span class="text-xs font-mono text-slate-400 block">Нагорода:</span>
                <span class="text-2xl font-extrabold font-mono text-amber-300">+${A2_K1_EXAM_DATA.xpReward} XP / +${A2_K1_EXAM_DATA.gemReward} 💎</span>
              </div>
            ` : ''}
          </div>

          <div class="flex items-center justify-center gap-3 pt-4">
            <button id="a2-retake-btn" class="px-5 py-2.5 rounded-xl border border-cyber-border hover:bg-cyber-deep text-slate-300 hover:text-white font-mono text-xs font-bold transition-all">
              🔄 Скласти повторно
            </button>
            <button id="a2-back-lesson-btn" class="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-black font-mono text-xs font-extrabold transition-all">
              📖 До матеріалів уроку
            </button>
          </div>
        </div>

        <!-- Detailed Review Accordion -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4">
          <h3 class="text-base font-bold font-mono text-white flex items-center gap-2">
            <span>📝</span> Детальний розбір відповідей
          </h3>
          <div class="space-y-4">
            ${A2_K1_EXAM_DATA.questions.map((q, idx) => {
              const userAns = this.answers[idx];
              const isCorrect = userAns === q.correctIndex;
              return `
                <div class="p-4 rounded-2xl bg-cyber-deep border ${isCorrect ? 'border-emerald-500/30' : 'border-rose-500/30'} space-y-2 text-xs font-mono">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-white">Питання #${idx + 1}: ${q.promptUkr}</span>
                    <span class="px-2 py-0.5 rounded ${isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'} font-bold">
                      ${isCorrect ? 'ПРАВИЛЬНО' : 'ПОМИЛКА'}
                    </span>
                  </div>
                  <p class="text-slate-300">Ваша відповідь: <strong class="${isCorrect ? 'text-emerald-300' : 'text-rose-300'}">${q.options[userAns] || 'Немає відповіді'}</strong></p>
                  ${!isCorrect ? `<p class="text-emerald-300">Правильна відповідь: <strong>${q.options[q.correctIndex]}</strong></p>` : ''}
                  <p class="text-slate-400 font-sans pt-1 border-t border-cyber-border/40">💡 ${q.explanation}</p>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    const retakeBtn = this.container.querySelector('#a2-retake-btn');
    if (retakeBtn) {
      retakeBtn.onclick = () => {
        this.currentIndex = 0;
        this.answers = {};
        this.isSubmitted = false;
        this.render();
      };
    }

    const backBtn = this.container.querySelector('#a2-back-lesson-btn');
    if (backBtn && this.onBackToLesson) {
      backBtn.onclick = () => this.onBackToLesson();
    }
  }
}
