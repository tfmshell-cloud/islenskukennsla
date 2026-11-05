/**
 * A2K3Exam.js - Interactive Academic Certification Exam Component for Book 2 / Kafli 3
 * (LEVEL A2.1 CERTIFICATION EXAM: SAMGÖNGUR, KLAPP OG HREYFISAGNIR)
 */

import { A2_K3_EXAM_DATA } from '../data/a2_k3_exam_data.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class A2K3Exam {
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
    const q = A2_K3_EXAM_DATA.questions[this.currentIndex];
    const total = A2_K3_EXAM_DATA.questions.length;
    const progress = Math.round(((this.currentIndex) / total) * 100);

    if (this.isSubmitted) {
      this.renderResults();
      return;
    }

    this.container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 select-none pb-12">
        <!-- Header -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-amber-500/40 shadow-xl space-y-4">
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Рівень A2 • Книга 2 • Кафлі 3
            </span>
            <span class="text-xs font-mono text-slate-400">Питання ${this.currentIndex + 1} з ${total}</span>
          </div>
          <div>
            <h2 class="text-xl font-bold font-mono text-white">${A2_K3_EXAM_DATA.titleUkr}</h2>
            <p class="text-xs font-mono text-amber-400 mt-1">${A2_K3_EXAM_DATA.titleIsl}</p>
          </div>
          <!-- Progress Bar -->
          <div class="w-full bg-cyber-deep h-2 rounded-full overflow-hidden border border-cyber-border">
            <div class="bg-gradient-to-r from-amber-500 to-cyan-400 h-full transition-all duration-300" style="width: ${progress}%"></div>
          </div>
        </div>

        <!-- Question Card -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-6 shadow-xl">
          <div class="space-y-2">
            <span class="text-xs font-mono text-cyan-400 uppercase tracking-wider">Завдання #${this.currentIndex + 1}</span>
            <h3 class="text-lg font-mono font-bold text-white leading-relaxed">${q.promptUkr}</h3>
          </div>

          <!-- Options -->
          <div class="space-y-3">
            ${q.options.map((opt, idx) => `
              <button 
                class="exam-option-btn w-full p-4 rounded-2xl border text-left font-mono text-sm transition-all flex items-center justify-between group ${this.answers[this.currentIndex] === idx ? 'border-amber-400 bg-amber-950/40 text-amber-200 shadow-md' : 'border-cyber-border bg-cyber-deep/60 text-slate-300 hover:border-slate-500 hover:text-white'}"
                data-idx="${idx}"
              >
                <div class="flex items-center gap-3">
                  <span class="w-6 h-6 rounded-full border border-cyber-border flex items-center justify-center text-xs font-bold ${this.answers[this.currentIndex] === idx ? 'border-amber-400 bg-amber-400 text-black' : 'group-hover:border-slate-400'}">
                    ${['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <span>${opt}</span>
                </div>
                <span class="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
              </button>
            `).join('')}
          </div>

          <!-- Nav Controls -->
          <div class="flex items-center justify-between pt-4 border-t border-cyber-border">
            <button 
              id="exam-prev-btn" 
              class="px-4 py-2 rounded-xl border border-cyber-border text-slate-400 font-mono text-xs hover:text-white disabled:opacity-40"
              ${this.currentIndex === 0 ? 'disabled' : ''}
            >
              ← Попереднє
            </button>

            ${this.currentIndex === total - 1 ? `
              <button 
                id="exam-finish-btn" 
                class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-400 text-black font-mono font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
              >
                <span>🏆</span><span>Завершити іспит</span>
              </button>
            ` : `
              <button 
                id="exam-next-btn" 
                class="px-6 py-2.5 rounded-xl bg-cyber-card border border-cyber-border text-white font-mono font-bold text-xs hover:border-amber-400 transition-all flex items-center gap-2"
              >
                <span>Далі</span><span>➔</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('.exam-option-btn').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx, 10);
        this.answers[this.currentIndex] = idx;
        audioEngine.playSfx('click');
        this.render();
      };
    });

    const prevBtn = this.container.querySelector('#exam-prev-btn');
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.render();
        }
      };
    }

    const nextBtn = this.container.querySelector('#exam-next-btn');
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (this.currentIndex < A2_K3_EXAM_DATA.questions.length - 1) {
          this.currentIndex++;
          this.render();
        }
      };
    }

    const finishBtn = this.container.querySelector('#exam-finish-btn');
    if (finishBtn) {
      finishBtn.onclick = () => this.calculateResults();
    }
  }

  calculateResults() {
    let correctCount = 0;
    A2_K3_EXAM_DATA.questions.forEach((q, idx) => {
      if (this.answers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    this.score = Math.round((correctCount / A2_K3_EXAM_DATA.questions.length) * 100);
    this.isSubmitted = true;

    if (this.score >= A2_K3_EXAM_DATA.passingScore) {
      audioEngine.playSfx('level_up');
      gameState.addXp(A2_K3_EXAM_DATA.xpReward);
      gameState.addGems(A2_K3_EXAM_DATA.gemReward);
      if (this.onComplete) this.onComplete(this.score);
    } else {
      audioEngine.playSfx('quiz_wrong');
    }

    this.render();
  }

  renderResults() {
    const passed = this.score >= A2_K3_EXAM_DATA.passingScore;
    const total = A2_K3_EXAM_DATA.questions.length;

    this.container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 select-none pb-12">
        <div class="p-8 rounded-3xl ${passed ? 'bg-gradient-to-b from-amber-950/40 to-cyber-card border-amber-500/50' : 'bg-gradient-to-b from-rose-950/40 to-cyber-card border-rose-500/50'} border text-center space-y-4 shadow-2xl">
          <span class="text-6xl">${passed ? '🚌' : '⚠️'}</span>
          <div class="space-y-1">
            <span class="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${passed ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'} border">
              ${passed ? 'Атестацію складено успішно' : 'Необхідне доопрацювання'}
            </span>
            <h2 class="text-2xl font-bold font-mono text-white mt-2">
              ${passed ? 'Вітаємо! Іспит A2.3 зараховано!' : 'Іспит A2.3 не складено'}
            </h2>
            <p class="text-sm font-sans text-slate-300">
              ${passed 
                ? `Ви успішно засвоїли тему міського транспорту Strætó, системи Klapp, аеропорту Keflavík та граматику прийменників руху!` 
                : `Для отримання сертифіката потрібно набрати мінімум ${A2_K3_EXAM_DATA.passingScore}%. Спробуйте ще раз!`}
            </p>
          </div>

          <!-- Score Card -->
          <div class="py-4 px-6 rounded-2xl bg-cyber-deep border border-cyber-border inline-flex items-center gap-6 font-mono">
            <div>
              <div class="text-xs text-slate-400">Результат</div>
              <div class="text-2xl font-bold ${passed ? 'text-amber-400' : 'text-rose-400'}">${this.score}%</div>
            </div>
            <div class="w-px h-8 bg-cyber-border"></div>
            <div>
              <div class="text-xs text-slate-400">Винагорода</div>
              <div class="text-2xl font-bold text-amber-400">${passed ? `+${A2_K3_EXAM_DATA.xpReward} XP` : '0 XP'}</div>
            </div>
          </div>

          <div class="pt-4 flex items-center justify-center gap-4 font-mono text-xs">
            <button id="exam-retry-btn" class="px-5 py-2.5 rounded-xl border border-cyber-border text-slate-300 hover:text-white font-bold transition-all">
              🔄 Спробувати знову
            </button>
            <button id="exam-back-btn" class="px-5 py-2.5 rounded-xl bg-amber-400 text-black font-extrabold shadow-lg hover:brightness-110 transition-all">
              ← Повернутися до уроку A2.3
            </button>
          </div>
        </div>

        <!-- Answers Review -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4">
          <h3 class="text-base font-bold font-mono text-white">Аналіз відповідей (${total} питань)</h3>
          <div class="space-y-4">
            ${A2_K3_EXAM_DATA.questions.map((q, idx) => {
              const isCorrect = this.answers[idx] === q.correctIndex;
              return `
                <div class="p-4 rounded-xl border ${isCorrect ? 'border-amber-500/30 bg-amber-950/10' : 'border-rose-500/30 bg-rose-950/10'} space-y-2">
                  <div class="flex items-center justify-between text-xs font-mono">
                    <span class="text-slate-400">Питання #${idx + 1}</span>
                    <span class="${isCorrect ? 'text-amber-400' : 'text-rose-400'} font-bold">${isCorrect ? '✓ Правильно' : '✗ Помилка'}</span>
                  </div>
                  <div class="text-sm font-bold text-white">${q.promptUkr}</div>
                  <div class="text-xs font-mono ${isCorrect ? 'text-amber-300' : 'text-rose-300'}">
                    Ваша відповідь: ${this.answers[idx] !== undefined ? q.options[this.answers[idx]] : 'Немає відповіді'}
                  </div>
                  ${!isCorrect ? `
                    <div class="text-xs font-mono text-emerald-400">
                      Правильна відповідь: ${q.options[q.correctIndex]}
                    </div>
                  ` : ''}
                  <div class="text-xs font-sans text-slate-400 pt-1 border-t border-cyber-border/40">
                    💡 ${q.explanation}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    const retryBtn = this.container.querySelector('#exam-retry-btn');
    if (retryBtn) {
      retryBtn.onclick = () => {
        this.currentIndex = 0;
        this.score = 0;
        this.answers = {};
        this.isSubmitted = false;
        this.render();
      };
    }

    const backBtn = this.container.querySelector('#exam-back-btn');
    if (backBtn) {
      backBtn.onclick = () => {
        if (this.onBackToLesson) this.onBackToLesson();
      };
    }
  }
}
