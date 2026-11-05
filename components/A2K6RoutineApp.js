/**
 * A2K6RoutineApp.js - Master Interactive Application for Level A2 • Lesson 6
 * (Kafli 6: Dagurinn minn, vaktavinna og miðmynd)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 3: Daglegt líf og vaktavinna)
 * - Tölum saman 2022 (Samskipti á vinnustað & kaffistofan)
 * - ASÍ & SA Kjarasamningar (11 tíma hvíldartími & vaktir)
 * - Árnastofnun BÍN (Miðmynd sagna á -st)
 */

import { A2_K6_ROUTINE_DATA } from '../data/a2_k6_routine_data.js?v=1.0';
import { A2K6Exam } from './A2K6Exam.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class A2K6RoutineApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'grammar'; // 'grammar' | 'shifts' | 'rest' | 'dialogue' | 'exam'
    this.examComponent = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Top Hero Navigation Header -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-purple-950/50 via-cyber-card to-cyber-deep border border-purple-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Рівень A2 • Книга 2 • Урок 6
              </span>
              <span class="text-xs text-slate-400 font-mono">ÍFA 2 Kafli 3 • ASÍ Kjarasamningar & BÍN</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>🔄</span> Dagurinn minn, vaktavinna og miðmynd
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Позмінна робота (<span class="text-purple-300 font-mono">vaktavinna</span>), закон 11 годин відпочинку (<span class="text-amber-300 font-mono">hvíldartími</span>), баланс життя та зворотні дієслова на <span class="text-cyan-300 font-mono">-st</span> (miðmynd).
            </p>
          </div>

          <!-- Quick Stats / Exam Status Badge -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="a2k6-header-exam-btn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-400 text-black font-mono text-xs font-extrabold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer">
              <span>🎓</span>
              <span>Іспит A2.6 (+160 XP)</span>
            </button>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="grammar" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'grammar' ? 'bg-purple-500/20 border-purple-500/60 text-purple-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🔀</span><span>1. Miðmynd (Дієслова на -st)</span>
          </button>
          <button data-tab="shifts" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'shifts' ? 'bg-purple-500/20 border-purple-500/60 text-purple-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>⏰</span><span>2. Vaktavinna & Зміни</span>
          </button>
          <button data-tab="rest" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'rest' ? 'bg-purple-500/20 border-purple-500/60 text-purple-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>⚖️</span><span>3. Закон 11 год відпочинку</span>
          </button>
          <button data-tab="dialogue" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'dialogue' ? 'bg-purple-500/20 border-purple-500/60 text-purple-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🎧</span><span>4. Діалог: Зміна на виробництві</span>
          </button>
          <button data-tab="exam" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'exam' ? 'bg-purple-500/20 border-purple-500/60 text-purple-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🎓</span><span>5. Сертифікаційний іспит A2.6</span>
          </button>
        </div>

        <!-- Dynamic Content Area -->
        <div id="a2k6-content-area" class="min-h-[400px]">
          ${this.renderActiveTabContent()}
        </div>

      </div>
    `;

    this.bindEvents();
  }

  renderActiveTabContent() {
    switch (this.activeTab) {
      case 'grammar':
        return this.renderGrammarTab();
      case 'shifts':
        return this.renderShiftsTab();
      case 'rest':
        return this.renderRestTab();
      case 'dialogue':
        return this.renderDialogueTab();
      case 'exam':
        return `<div id="a2k6-exam-container"></div>`;
      default:
        return this.renderGrammarTab();
    }
  }

  // 1. GRAMMAR TAB (MIÐMYND)
  renderGrammarTab() {
    return `
      <div class="space-y-6">
        <!-- Rules Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${A2_K6_ROUTINE_DATA.grammarRules.map(rule => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-3 shadow-lg">
              <h4 class="text-sm font-bold font-mono text-purple-300 flex items-center gap-2">
                <span>📖</span><span>${rule.title}</span>
              </h4>
              <p class="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-line">${rule.explanation}</p>
            </div>
          `).join('')}
        </div>

        <!-- Vocabulary Grid -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-bold font-mono text-white flex items-center gap-2">
              <span>📋</span><span>Глосарій розпорядку та дієслова на -st</span>
            </h3>
            <span class="text-xs font-mono text-slate-400">${A2_K6_ROUTINE_DATA.vocabulary.length} термінів</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            ${A2_K6_ROUTINE_DATA.vocabulary.map(v => `
              <div class="p-4 rounded-xl bg-cyber-deep/60 border border-cyber-border hover:border-purple-400/40 transition-all space-y-2 group">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-purple-300">${v.word}</span>
                  <button class="a2-speak-btn p-1 text-slate-400 hover:text-white text-xs cursor-pointer" data-phrase="${v.word}">
                    🔊
                  </button>
                </div>
                <div class="text-[11px] font-mono text-slate-400">${v.article} • ${v.ipa}</div>
                <div class="text-xs font-sans text-slate-200">${v.translation}</div>
                <div class="pt-2 border-t border-cyber-border/40 text-[11px] font-mono text-cyan-300/90 leading-tight">
                  "${v.sampleIsl}"
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Drill Component -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-purple-500/30 space-y-4 shadow-xl">
          <div class="space-y-1">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Мікро-тренажер Miðmynd
            </span>
            <h3 class="text-base font-bold font-mono text-white">Практика дієслів на -st та норм відпочинку</h3>
          </div>

          <div class="space-y-4">
            ${A2_K6_ROUTINE_DATA.drills[0].questions.map((q, qIdx) => `
              <div class="p-4 rounded-2xl bg-cyber-deep/80 border border-cyber-border space-y-3">
                <p class="text-xs font-mono font-bold text-slate-200">${qIdx + 1}. ${q.prompt}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  ${q.options.map((opt, optIdx) => `
                    <button class="a2-drill-btn p-3 rounded-xl border border-cyber-border bg-black/40 hover:border-purple-400 text-left text-xs font-mono text-slate-300 transition-all cursor-pointer" data-q="${qIdx}" data-opt="${optIdx}" data-correct="${q.correct}">
                      ${opt}
                    </button>
                  `).join('')}
                </div>
                <div class="drill-feedback-a2 hidden text-[11px] font-mono p-2 rounded-lg"></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 2. SHIFTS TAB
  renderShiftsTab() {
    return `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
              ☀️
            </div>
            <div>
              <h3 class="text-base font-bold font-mono text-white">Dagvakt (08:00–16:00)</h3>
              <p class="text-xs font-mono text-slate-400">Стандартна денна зміна</p>
            </div>
          </div>
          <p class="text-xs text-slate-300 font-sans leading-relaxed">
            Базова ставка заробітної плати без надбавок. Передбачає ранкову каву (<span class="text-white font-mono">kaffitími</span>) на 15-20 хвилин та обіднє переривання (<span class="text-white font-mono">matarhlé</span>) о 12:00.
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-xl">
              🌆
            </div>
            <div>
              <h3 class="text-base font-bold font-mono text-white">Kvöldvakt (16:00–00:00)</h3>
              <p class="text-xs font-mono text-slate-400">Вечірня зміна</p>
            </div>
          </div>
          <p class="text-xs text-slate-300 font-sans leading-relaxed">
            Нараховується вечірня надбавка (<span class="text-indigo-300 font-mono">kvöldvaktarálag</span>, зазвичай +33% до погодинної ставки). Популярна у сфері логістики, готелів та догляду.
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xl">
              🌙
            </div>
            <div>
              <h3 class="text-base font-bold font-mono text-white">Næturvakt (00:00–08:00)</h3>
              <p class="text-xs font-mono text-slate-400">Нічна зміна</p>
            </div>
          </div>
          <p class="text-xs text-slate-300 font-sans leading-relaxed">
            Найвища ставка з нічною надбавкою (<span class="text-purple-300 font-mono">næturvaktarálag</span>, від +45% і більше). Вимагає суворого дотримання правил денного сну та адаптації.
          </p>
        </div>
      </div>
    `;
  }

  // 3. REST TAB
  renderRestTab() {
    return `
      <div class="p-6 rounded-3xl bg-cyber-card border border-amber-500/40 space-y-6 shadow-xl">
        <div class="flex items-center gap-3 border-b border-cyber-border pb-4">
          <div class="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
            ⚖️
          </div>
          <div>
            <h3 class="text-base font-bold font-mono text-white">Законне право на 11 годин безперервного відпочинку (11 tíma hvíld)</h3>
            <p class="text-xs font-mono text-amber-300">Стандарт ісландських профспілок Efling, VR та директив безпеки праці</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-300 leading-relaxed">
          <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
            <span class="font-mono font-bold text-white text-sm">Правило 24-годинного циклу:</span>
            <p>Протягом кожного 24-годинного періоду працівник зобов'язаний мати не менше 11 годин безперервного відпочинку між закінченням однієї зміни та виходом на наступну.</p>
          </div>
          <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
            <span class="font-mono font-bold text-white text-sm">Винятки та компенсація (Hvíldartímalengd):</span>
            <p>Якщо за виробничою необхідністю цей інтервал скорочено (але ніколи не менше 8 годин), роботодавець зобов'язаний надати компенсаційний оплачуваний час відпочинку протягом наступних днів.</p>
          </div>
        </div>
      </div>
    `;
  }

  // 4. DIALOGUE TAB
  renderDialogueTab() {
    return `
      <div class="p-6 rounded-3xl bg-cyber-card border border-purple-500/40 space-y-6 shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyber-border pb-4">
          <div>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Автентичний аудіодіалог
            </span>
            <h3 class="text-lg font-bold font-mono text-white mt-1">
              Передача зміни на виробництві (Vaktaskipti á vinnustað)
            </h3>
          </div>
          <span class="text-xs font-mono text-slate-400">8 студійних реплік • Guðrún & Gunnar Neural</span>
        </div>

        <div class="space-y-3">
          ${A2_K6_ROUTINE_DATA.dialogue.map((line, idx) => `
            <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2 hover:border-purple-400/40 transition-all">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-black/40 border border-cyber-border flex items-center justify-center text-xs font-bold text-purple-300">
                    ${idx + 1}
                  </span>
                  <span class="text-xs font-mono font-bold text-white">${line.speaker}</span>
                  <span class="text-[11px] font-mono text-slate-400">(${line.speakerRole})</span>
                </div>
                <button class="a2-speak-btn px-3 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-black border border-purple-500/40 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer" data-phrase="${line.textIsl}" data-audio="${line.audio || ''}">
                  <span>🔊</span><span>Слухати</span>
                </button>
              </div>
              <p class="text-sm font-mono text-purple-200 font-semibold pl-8">${line.textIsl}</p>
              <p class="text-xs font-sans text-slate-300 pl-8">${line.textUkr}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.container.querySelectorAll('.a2-tab-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeTab = btn.dataset.tab;
        audioEngine.playBlip?.();
        this.render();
        if (this.activeTab === 'exam') {
          this.mountExam();
        }
      };
    });

    const headerExamBtn = this.container.querySelector('#a2k6-header-exam-btn');
    if (headerExamBtn) {
      headerExamBtn.onclick = () => {
        this.activeTab = 'exam';
        audioEngine.playBlip?.();
        this.render();
        this.mountExam();
      };
    }

    this.bindSpeechButtons();
    this.bindDrillButtons();
  }

  mountExam() {
    const examCont = this.container.querySelector('#a2k6-exam-container');
    if (examCont) {
      this.examComponent = new A2K6Exam(
        examCont,
        null,
        () => {
          this.activeTab = 'grammar';
          this.render();
        }
      );
      this.examComponent.render();
    }
  }

  bindSpeechButtons() {
    this.container.querySelectorAll('.a2-speak-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const phrase = btn.dataset.phrase;
        const audioPath = btn.dataset.audio;
        if (audioPath && audioEngine) {
          audioEngine.play(audioPath, btn);
          return;
        }
        if (phrase && audioEngine) {
          audioEngine.speak(phrase, btn);
        }
      };
    });
  }

  bindDrillButtons() {
    this.container.querySelectorAll('.a2-drill-btn').forEach(btn => {
      btn.onclick = () => {
        const qIdx = btn.dataset.q;
        const optIdx = parseInt(btn.dataset.opt, 10);
        const correct = parseInt(btn.dataset.correct, 10);
        const parent = btn.closest('.space-y-3');
        const feedback = parent.querySelector('.drill-feedback-a2');

        parent.querySelectorAll('.a2-drill-btn').forEach(b => {
          b.disabled = true;
          b.classList.remove('border-purple-400', 'bg-purple-500/20');
        });

        feedback.classList.remove('hidden');
        if (optIdx === correct) {
          btn.classList.add('border-emerald-500', 'bg-emerald-500/20', 'text-white', 'font-bold');
          feedback.classList.add('bg-emerald-500/20', 'text-emerald-300', 'border', 'border-emerald-500/40');
          feedback.innerHTML = `✓ Rétt! Правильно! Відмінне знання граматики miðmynd.`;
          audioEngine.playSuccess?.();
          gameState.addPoints?.(10);
        } else {
          btn.classList.add('border-rose-500', 'bg-rose-500/20', 'text-white');
          feedback.classList.add('bg-rose-500/20', 'text-rose-300', 'border', 'border-rose-500/40');
          feedback.innerHTML = `✗ Rangt! Неправильно. Зверніть увагу на закінчення зворотного стану та норми відпочинку.`;
          audioEngine.playError?.();
        }
      };
    });
  }
}
