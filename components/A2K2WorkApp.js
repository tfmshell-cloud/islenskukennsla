/**
 * A2K2WorkApp.js - Master Interactive Application for Level A2 • Lesson 2
 * (Kafli 2: Vinna, starfsumhverfi og þátíð sterkra sagna — Book 2 Work & Labor Market)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 2: Vinna, pp. 28-49)
 * - Tölum saman 2022 (Vinnustaðurinn og samskipti við samstarfsfólk)
 * - Skatturinn (Persónuafsláttur & Launaseðill)
 * - Stéttarfélög (Efling & VR kjarasamningar)
 * - Litli málfræðingurinn & Árnastofnun BÍN (Þátíð sterkra sagna)
 */

import { A2_K2_WORK_DATA } from '../data/a2_k2_work_data.js?v=1.0';
import { A2K2Exam } from './A2K2Exam.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class A2K2WorkApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'grammar'; // 'grammar' | 'contracts' | 'payslip' | 'dialogue' | 'exam'
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
                Рівень A2 • Книга 2 • Урок 2
              </span>
              <span class="text-xs text-slate-400 font-mono">ÍFA 2 Kafli 2 & Skatturinn Standard</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>💼</span> Vinna, launaseðill og sterkar sagnir
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Минулий час сильних дієслів (<span class="text-emerald-300 font-mono">fór / fékk / kom</span>), трудові договори (<span class="text-cyan-300 font-mono">ráðningarsamningur</span>), розрахунок табеля зарплати та податкова знижка Skatturinn.
            </p>
          </div>

          <!-- Quick Stats / Exam Status Badge -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="a2k2-header-exam-btn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-mono text-xs font-extrabold shadow-lg hover:brightness-110 transition-all flex items-center gap-2">
              <span>🎓</span>
              <span>Іспит A2.2 (+180 XP)</span>
            </button>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="grammar" class="a2k2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'grammar' ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>⚡</span><span>1. Sterkar sagnir (Аблаут)</span>
          </button>
          <button data-tab="contracts" class="a2k2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'contracts' ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>📑</span><span>2. Ráðning & Skattur (Договір)</span>
          </button>
          <button data-tab="payslip" class="a2k2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'payslip' ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🧾</span><span>3. Launaseðill (Зарплата)</span>
          </button>
          <button data-tab="dialogue" class="a2k2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'dialogue' ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>💬</span><span>4. Samningur (Діалог)</span>
          </button>
          <button data-tab="exam" class="a2k2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'exam' ? 'bg-emerald-500/30 border-emerald-500/70 text-emerald-300 font-bold' : 'border-emerald-500/30 text-emerald-400 hover:text-emerald-200'} transition-all flex items-center gap-2 ml-auto">
            <span>🎓</span><span>5. Lokapróf A2.2 (Іспит)</span>
          </button>
        </div>

        <!-- Main Tab Content Area -->
        <div id="a2k2-tab-content" class="min-h-[500px]"></div>

      </div>
    `;

    this.bindGlobalEvents();
    this.renderActiveTab();
  }

  bindGlobalEvents() {
    this.container.querySelectorAll('.a2k2-tab-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeTab = btn.dataset.tab;
        this.render();
      };
    });

    const headerExamBtn = this.container.querySelector('#a2k2-header-exam-btn');
    if (headerExamBtn) {
      headerExamBtn.onclick = () => {
        this.activeTab = 'exam';
        this.render();
      };
    }
  }

  renderActiveTab() {
    const content = this.container.querySelector('#a2k2-tab-content');
    if (!content) return;

    if (this.activeTab === 'grammar') {
      this.renderGrammarTab(content);
    } else if (this.activeTab === 'contracts') {
      this.renderContractsTab(content);
    } else if (this.activeTab === 'payslip') {
      this.renderPayslipTab(content);
    } else if (this.activeTab === 'dialogue') {
      this.renderDialogueTab(content);
    } else if (this.activeTab === 'exam') {
      this.renderExamTab(content);
    }
  }

  // TAB 1: STRONG VERBS (ÞÁTÍÐ STERKRA SAGNA)
  renderGrammarTab(container) {
    const g = A2_K2_WORK_DATA.pastTenseStrongGrammar;
    container.innerHTML = `
      <div class="space-y-6">
        <div class="p-6 rounded-3xl bg-cyber-card border border-emerald-500/40 space-y-3 shadow-xl">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Граматичний закон аблауту
            </span>
            <span class="text-xs font-mono text-slate-400">BÍN & Litli málfræðingurinn</span>
          </div>
          <h3 class="text-xl font-bold font-mono text-white">${g.ruleTitle}</h3>
          <p class="text-sm text-slate-300 font-sans leading-relaxed">${g.description}</p>
        </div>

        <!-- Paradigm Table (fara - fór) -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <h4 class="text-sm font-bold font-mono text-emerald-300 uppercase tracking-wider">
            Зразок відмінювання: ${g.inflectionTable.verb}
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div class="p-4 rounded-2xl bg-cyber-deep border border-cyber-border space-y-2">
              <span class="text-slate-400 uppercase tracking-wider font-bold">Однина (Eintala):</span>
              ${g.inflectionTable.singular.map(row => `
                <div class="flex items-center justify-between py-1 border-b border-cyber-border/40">
                  <span class="text-slate-300 font-semibold">${row.person} <strong class="text-emerald-300 font-bold">${row.form}</strong></span>
                  <span class="text-[10px] text-slate-500">${row.note}</span>
                </div>
              `).join('')}
            </div>
            <div class="p-4 rounded-2xl bg-cyber-deep border border-cyber-border space-y-2">
              <span class="text-slate-400 uppercase tracking-wider font-bold">Множина (Fleirtala):</span>
              ${g.inflectionTable.plural.map(row => `
                <div class="flex items-center justify-between py-1 border-b border-cyber-border/40">
                  <span class="text-slate-300 font-semibold">${row.person} <strong class="text-cyan-300 font-bold">${row.form}</strong></span>
                  <span class="text-[10px] text-slate-500">${row.note}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 6 Ablaut Classes Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${g.ablautClasses.map(cls => `
            <div class="p-5 rounded-3xl bg-cyber-card border border-cyber-border hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4 shadow-lg">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-bold font-mono text-emerald-300">${cls.classNum}</h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-deep border border-cyber-border text-slate-400">${cls.pattern}</span>
                </div>
                <div class="space-y-2 pt-2 border-t border-cyber-border/60">
                  ${cls.verbs.map(v => `
                    <div class="p-3 rounded-xl bg-cyber-deep border border-cyber-border/60 text-xs font-mono space-y-1">
                      <div class="flex items-center justify-between">
                        <span class="text-slate-400">${v.inf} ➔ <strong class="text-emerald-300">${v.pastSg}</strong></span>
                        <button class="a2k2-speak-btn text-emerald-400 hover:text-white" data-phrase="${v.phrase}">🔊</button>
                      </div>
                      <span class="text-[11px] text-amber-300 block font-sans italic">${v.phrase}</span>
                      <span class="text-[10px] text-slate-400 block font-sans">${v.ukr}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindSpeechButtons(container);
  }

  // TAB 2: CONTRACTS & TAX DEDUCTIONS
  renderContractsTab(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${A2_K2_WORK_DATA.workplaceVocabulary.map(item => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-3 shadow-lg">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-3xl">${item.icon}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyber-deep text-emerald-300 border border-emerald-500/30">${item.category}</span>
                </div>
                <h4 class="text-base font-bold font-mono text-white">${item.termIsl}</h4>
                <p class="text-xs font-mono text-emerald-400">${item.ipa}</p>
                <p class="text-xs text-slate-300 font-sans font-semibold">${item.ukr}</p>
                <p class="text-xs text-slate-400 font-sans leading-relaxed pt-2 border-t border-cyber-border">${item.desc}</p>
              </div>
              <button class="a2k2-speak-btn w-full py-1.5 rounded-lg bg-cyber-deep hover:bg-emerald-500/20 border border-cyber-border text-emerald-300 font-mono text-xs transition-all flex items-center justify-center gap-1.5" data-phrase="${item.termIsl}">
                <span>🔊</span><span>Вимова терміна</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindSpeechButtons(container);
  }

  // TAB 3: PAYSLIP ANATOMY (LAUNASEÐILL)
  renderPayslipTab(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="p-6 rounded-3xl bg-cyber-card border border-emerald-500/40 space-y-3 shadow-xl">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Стандарт Skatturinn
            </span>
          </div>
          <h3 class="text-xl font-bold font-mono text-white">Анатомія ісландського табеля зарплати (Launaseðill)</h3>
          <p class="text-sm text-slate-300 font-sans leading-relaxed">
            Кожен працівник в Ісландії отримує електронний зарплатний лист у свій інтернет-банк 1-го числа кожного місяця. Ось із чого він складається:
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${A2_K2_WORK_DATA.payslipComponents.map(p => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border hover:border-emerald-500/50 transition-all space-y-3 shadow-lg">
              <div class="flex items-center justify-between">
                <span class="text-3xl">${p.icon}</span>
                <span class="text-xs font-mono text-emerald-400 font-bold">${p.termIsl}</span>
              </div>
              <div>
                <h4 class="text-sm font-bold text-white font-mono">${p.ukr}</h4>
                <p class="text-xs text-slate-300 font-sans mt-1 leading-relaxed">${p.desc}</p>
              </div>
              <button class="a2k2-speak-btn w-full py-1.5 rounded-lg bg-cyber-deep hover:bg-emerald-500/20 border border-cyber-border text-slate-300 hover:text-white font-mono text-xs transition-all" data-phrase="${p.termIsl}">
                🔊 Вимова терміна
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindSpeechButtons(container);
  }

  // TAB 4: COMMUNICATIVE DIALOGUE
  renderDialogueTab(container) {
    const d = A2_K2_WORK_DATA.dialogue;
    container.innerHTML = `
      <div class="space-y-6 max-w-4xl mx-auto">
        <div class="p-6 rounded-3xl bg-cyber-card border border-emerald-500/40 space-y-2 shadow-xl">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Реальна робоча ситуація
            </span>
            <span class="text-xs font-mono text-slate-400">Tölum saman 2022 & Skatturinn</span>
          </div>
          <h3 class="text-xl font-bold font-mono text-white">${d.titleIsl}</h3>
          <p class="text-sm text-slate-300 font-sans">${d.titleUkr}</p>
          <p class="text-xs text-slate-400 font-sans pt-1 border-t border-cyber-border">${d.situation}</p>
        </div>

        <div class="space-y-4">
          ${d.lines.map(line => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border hover:border-emerald-500/40 transition-all space-y-3 shadow-lg">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold ${line.speaker === 'Guðrún' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'}">
                    ${line.speaker}
                  </span>
                  <span class="text-xs text-slate-400 font-mono">(${line.role})</span>
                </div>
                <button class="a2k2-speak-btn p-2 rounded-xl bg-cyber-deep hover:bg-emerald-500/20 border border-cyber-border text-slate-300 hover:text-emerald-300 transition-all text-xs" data-phrase="${line.is}">
                  🔊 Слухати
                </button>
              </div>

              <div class="space-y-1">
                <p class="text-base font-mono font-bold text-white">${line.is}</p>
                <p class="text-xs font-mono text-emerald-400">${line.ipa}</p>
                <p class="text-sm text-slate-300 font-sans pt-1 border-t border-cyber-border/40">${line.ukr}</p>
              </div>

              ${line.note ? `
                <div class="text-[11px] font-mono text-amber-300/90 bg-cyber-deep p-2 rounded-lg border border-cyber-border/40">
                  💡 Мовний коментар: ${line.note}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindSpeechButtons(container);
  }

  // TAB 5: EXIT EXAM
  renderExamTab(container) {
    container.innerHTML = `<div id="a2k2-exam-wrapper" class="w-full"></div>`;
    const examWrapper = container.querySelector('#a2k2-exam-wrapper');

    this.examComponent = new A2K2Exam(
      examWrapper,
      (score, total) => {
        gameState.completeLessonExam('a2_k2_exit', score, total);
      },
      () => {
        this.activeTab = 'grammar';
        this.render();
      }
    );
    this.examComponent.render();
  }

  bindSpeechButtons(container) {
    container.querySelectorAll('.a2k2-speak-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const phrase = btn.dataset.phrase;
        if (phrase) {
          audioEngine.speak(phrase, 'is-IS');
        }
      };
    });
  }
}
