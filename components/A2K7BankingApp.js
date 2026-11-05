/**
 * A2K7BankingApp.js - Master Interactive Application for Level A2 • Lesson 7
 * (Kafli 7: Bankar, fjármál og rafræn skilríki)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 8 & 9: Peningar, reikningar & bankaþjónusta)
 * - Landsbankinn, Arion banki & Íslandsbanki standards
 * - Auðkenni.is (Rafræn skilríki & tveggja þátta auðkenning)
 * - Skatturinn (Bankareikningar & kröfur)
 */

import { A2_K7_BANKING_DATA } from '../data/a2_k7_banking_data.js?v=1.0';
import { A2K7Exam } from './A2K7Exam.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class A2K7BankingApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'grammar'; // 'grammar' | 'banks' | 'krofur' | 'dialogue' | 'exam'
    this.examComponent = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Top Hero Navigation Header -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-cyber-card to-cyber-deep border border-emerald-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Рівень A2 • Книга 2 • Урок 7
              </span>
              <span class="text-xs text-slate-400 font-mono">ÍFA 2 • Landsbankinn, Arion & Auðkenni</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>💳</span> Bankar, fjármál og rafræn skilríki
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Відкриття банківського рахунку, додаток <span class="text-emerald-300 font-mono">Auðkenni</span>, оплата електронних вимог (<span class="text-cyan-300 font-mono">kröfur</span>) у heimabanki та фінансовий синтаксис.
            </p>
          </div>

          <!-- Quick Stats / Exam Status Badge -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="a2k7-header-exam-btn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-mono text-xs font-extrabold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer">
              <span>🎓</span>
              <span>Іспит A2.7 (+160 XP)</span>
            </button>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="grammar" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'grammar' ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>💰</span><span>1. Фінансові дієслова & Прийменники</span>
          </button>
          <button data-tab="banks" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'banks' ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🏦</span><span>2. Банки Ісландії & Auðkenni</span>
          </button>
          <button data-tab="krofur" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'krofur' ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>📱</span><span>3. Heimabanki & Рахунки Kröfur</span>
          </button>
          <button data-tab="dialogue" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'dialogue' ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🎧</span><span>4. Діалог: Відкриття рахунку</span>
          </button>
          <button data-tab="exam" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'exam' ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🎓</span><span>5. Сертифікаційний іспит A2.7</span>
          </button>
        </div>

        <!-- Dynamic Content Area -->
        <div id="a2k7-content-area" class="min-h-[400px]">
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
      case 'banks':
        return this.renderBanksTab();
      case 'krofur':
        return this.renderKrofurTab();
      case 'dialogue':
        return this.renderDialogueTab();
      case 'exam':
        return `<div id="a2k7-exam-container"></div>`;
      default:
        return this.renderGrammarTab();
    }
  }

  // 1. GRAMMAR TAB
  renderGrammarTab() {
    return `
      <div class="space-y-6">
        <!-- Rules Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${A2_K7_BANKING_DATA.grammarRules.map(rule => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-3 shadow-lg">
              <h4 class="text-sm font-bold font-mono text-emerald-300 flex items-center gap-2">
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
              <span>📋</span><span>Банківський та фінансовий глосарій (Рівень A2)</span>
            </h3>
            <span class="text-xs font-mono text-slate-400">${A2_K7_BANKING_DATA.vocabulary.length} термінів</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            ${A2_K7_BANKING_DATA.vocabulary.map(v => `
              <div class="p-4 rounded-xl bg-cyber-deep/60 border border-cyber-border hover:border-emerald-400/40 transition-all space-y-2 group">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-emerald-300">${v.word}</span>
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
        <div class="p-6 rounded-3xl bg-cyber-card border border-emerald-500/30 space-y-4 shadow-xl">
          <div class="space-y-1">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Мікро-тренажер фінансових транзакцій
            </span>
            <h3 class="text-base font-bold font-mono text-white">Практика дієслів borga, leggja inn á та taka út úr</h3>
          </div>

          <div class="space-y-4">
            ${A2_K7_BANKING_DATA.drills[0].questions.map((q, qIdx) => `
              <div class="p-4 rounded-2xl bg-cyber-deep/80 border border-cyber-border space-y-3">
                <p class="text-xs font-mono font-bold text-slate-200">${qIdx + 1}. ${q.prompt}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  ${q.options.map((opt, optIdx) => `
                    <button class="a2-drill-btn p-3 rounded-xl border border-cyber-border bg-black/40 hover:border-emerald-400 text-left text-xs font-mono text-slate-300 transition-all cursor-pointer" data-q="${qIdx}" data-opt="${optIdx}" data-correct="${q.correct}">
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

  // 2. BANKS & AUÐKENNI TAB
  renderBanksTab() {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xl">
              🏦
            </div>
            <div>
              <h3 class="text-base font-bold font-mono text-white">Банки Ісландії (Bankar á Íslandi)</h3>
              <p class="text-xs font-mono text-slate-400">Landsbankinn, Arion banki та Íslandsbanki</p>
            </div>
          </div>
          <div class="text-xs text-slate-300 font-sans space-y-2 leading-relaxed">
            <p>Для відкриття першого рахунку потрібні:</p>
            <ul class="list-disc list-inside space-y-1 text-slate-400 font-mono text-[11px]">
              <li><span class="text-white">Kennitala</span>: дійсний податковий номер від Þjóðskrá.</li>
              <li><span class="text-white">Vegabréf</span>: закордонний паспорт або посвідка Útlendingastofnun.</li>
              <li><span class="text-white">Debetkort</span>: випуск картки з ПІН-кодом (<span class="text-emerald-300">leyninúmer</span>).</li>
            </ul>
          </div>
        </div>

        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xl">
              🔑
            </div>
            <div>
              <h3 class="text-base font-bold font-mono text-white">Додаток Auðkenni (Rafræn skilríki)</h3>
              <p class="text-xs font-mono text-slate-400">Цифровий паспорт у мобільному телефоні</p>
            </div>
          </div>
          <div class="text-xs text-slate-300 font-sans space-y-2 leading-relaxed">
            <p>Електронний ID (<span class="text-cyan-300 font-mono">rafræn skilríki</span>) є ключем до всіх державних та фінансових сервісів країни.</p>
            <ul class="list-disc list-inside space-y-1 text-slate-400 font-mono text-[11px]">
              <li>Активація: вимагає особистого візиту у відділення будь-якого банку з паспортом.</li>
              <li>Вхід на <span class="text-white">Ísland.is, Skatturinn, Heilsuvera, Mentor</span> без введення паролів.</li>
              <li>Підтвердження електронних платежів та переказів грошей.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  // 3. KROFUR TAB
  renderKrofurTab() {
    return `
      <div class="p-6 rounded-3xl bg-cyber-card border border-cyan-500/40 space-y-6 shadow-xl">
        <div class="flex items-center gap-3 border-b border-cyber-border pb-4">
          <div class="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xl">
            📱
          </div>
          <div>
            <h3 class="text-base font-bold font-mono text-white">Система електронних рахунків (Kröfur) у Heimabanki</h3>
            <p class="text-xs font-mono text-cyan-300">Автоматичний документообіг рахунків на Kennitala</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
            <span class="text-xs font-mono font-bold text-cyan-300">1. Без паперових квитанцій</span>
            <p class="text-xs text-slate-300 font-sans leading-relaxed">
              Жодна компанія не надсилає паперові рахунки. Рахунок виставляється безпосередньо на вашу Kennitala і з'являється у вашому додатку банку.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
            <span class="text-xs font-mono font-bold text-cyan-300">2. Оплата одним кліком</span>
            <p class="text-xs text-slate-300 font-sans leading-relaxed">
              У розділі <span class="text-white font-mono">Ógreiddar kröfur</span> достатньо натиснути кнопку оплати та підтвердити операцію в додатку Auðkenni.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
            <span class="text-xs font-mono font-bold text-cyan-300">3. Автоплатежі (Boðgreiðslur)</span>
            <p class="text-xs text-slate-300 font-sans leading-relaxed">
              Можливість підключити регулярні рахунки (садочок, спортзал, оренда) на автоматичне списання щомісяця.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // 4. DIALOGUE TAB
  renderDialogueTab() {
    return `
      <div class="p-6 rounded-3xl bg-cyber-card border border-emerald-500/40 space-y-6 shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyber-border pb-4">
          <div>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Автентичний аудіодіалог
            </span>
            <h3 class="text-lg font-bold font-mono text-white mt-1">
              Відкриття рахунку у відділенні банку (Stofna bankareikning)
            </h3>
          </div>
          <span class="text-xs font-mono text-slate-400">8 студійних реплік • Gunnar & Guðrún Neural</span>
        </div>

        <div class="space-y-3">
          ${A2_K7_BANKING_DATA.dialogue.map((line, idx) => `
            <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2 hover:border-emerald-400/40 transition-all">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-black/40 border border-cyber-border flex items-center justify-center text-xs font-bold text-emerald-300">
                    ${idx + 1}
                  </span>
                  <span class="text-xs font-mono font-bold text-white">${line.speaker}</span>
                  <span class="text-[11px] font-mono text-slate-400">(${line.speakerRole})</span>
                </div>
                <button class="a2-speak-btn px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black border border-emerald-500/40 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer" data-phrase="${line.textIsl}" data-audio="${line.audio || ''}">
                  <span>🔊</span><span>Слухати</span>
                </button>
              </div>
              <p class="text-sm font-mono text-emerald-200 font-semibold pl-8">${line.textIsl}</p>
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

    const headerExamBtn = this.container.querySelector('#a2k7-header-exam-btn');
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
    const examCont = this.container.querySelector('#a2k7-exam-container');
    if (examCont) {
      this.examComponent = new A2K7Exam(
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
          b.classList.remove('border-emerald-400', 'bg-emerald-500/20');
        });

        feedback.classList.remove('hidden');
        if (optIdx === correct) {
          btn.classList.add('border-emerald-500', 'bg-emerald-500/20', 'text-white', 'font-bold');
          feedback.classList.add('bg-emerald-500/20', 'text-emerald-300', 'border', 'border-emerald-500/40');
          feedback.innerHTML = `✓ Rétt! Правильно! Відмінне знання банківських операцій.`;
          audioEngine.playSuccess?.();
          gameState.addPoints?.(10);
        } else {
          btn.classList.add('border-rose-500', 'bg-rose-500/20', 'text-white');
          feedback.classList.add('bg-rose-500/20', 'text-rose-300', 'border', 'border-rose-500/40');
          feedback.innerHTML = `✗ Rangt! Неправильно. Зверніть увагу на термінологію та відмінки прийменників.`;
          audioEngine.playError?.();
        }
      };
    });
  }
}
