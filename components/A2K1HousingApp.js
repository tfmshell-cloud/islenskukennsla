/**
 * A2K1HousingApp.js - Master Interactive Application for Level A2 • Lesson 1
 * (Kafli 1: Húsnæði, leigusamningar og þátíð veakra sagna — Book 2 Foundation)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 1: Húsnæði, pp. 6-27 — BOOK 2 FOUNDATION)
 * - HMS (Húsnæðis- og mannvirkjastofnun — Leiguskrá standard)
 * - Litli málfræðingurinn & Árnastofnun BÍN (Þátíð veakra sagna)
 * - Tölum saman 2022 (Íbúðaleit og samskipti við leigusala)
 */

import { A2_K1_HOUSING_DATA } from '../data/a2_k1_housing_data.js?v=1.0';
import { A2K1Exam } from './A2K1Exam.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class A2K1HousingApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'grammar'; // 'grammar' | 'housing' | 'contracts' | 'dialogue' | 'exam'
    this.examComponent = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Top Hero Navigation Header -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/50 via-cyber-card to-cyber-deep border border-indigo-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                Рівень A2 • Книга 2 • Урок 1
              </span>
              <span class="text-xs text-slate-400 font-mono">ÍFA 2 Kafli 1 & BÍN Standard</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>🏠</span> Húsnæði, leigusamningar og þátíð
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Минулий час слабких дієслів (<span class="text-indigo-300 font-mono">skoðaði / keypti</span>), оренда житла в Ісландії, субсидії HMS (<span class="text-amber-300 font-mono">húsaleigubætur</span>) та укладання договорів.
            </p>
          </div>

          <!-- Quick Stats / Exam Status Badge -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="a2k1-header-exam-btn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-black font-mono text-xs font-extrabold shadow-lg hover:brightness-110 transition-all flex items-center gap-2">
              <span>🎓</span>
              <span>Іспит A2.1 (+160 XP)</span>
            </button>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="grammar" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'grammar' ? 'bg-indigo-500/20 border-indigo-500/60 text-indigo-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>⏳</span><span>1. Þátíð (Минулий час)</span>
          </button>
          <button data-tab="housing" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'housing' ? 'bg-indigo-500/20 border-indigo-500/60 text-indigo-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🏢</span><span>2. Húsnæði (Типи житла)</span>
          </button>
          <button data-tab="contracts" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'contracts' ? 'bg-indigo-500/20 border-indigo-500/60 text-indigo-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>📜</span><span>3. Leiga & HMS (Оренда)</span>
          </button>
          <button data-tab="dialogue" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'dialogue' ? 'bg-indigo-500/20 border-indigo-500/60 text-indigo-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>💬</span><span>4. Skoðun (Огляд житла)</span>
          </button>
          <button data-tab="exam" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'exam' ? 'bg-indigo-500/30 border-indigo-500/70 text-indigo-300 font-bold' : 'border-indigo-500/30 text-indigo-400 hover:text-indigo-200'} transition-all flex items-center gap-2 ml-auto">
            <span>🎓</span><span>5. Lokapróf A2.1 (Іспит)</span>
          </button>
        </div>

        <!-- Main Tab Content Area -->
        <div id="a2k1-tab-content" class="min-h-[500px]"></div>

      </div>
    `;

    this.bindGlobalEvents();
    this.renderActiveTab();
  }

  bindGlobalEvents() {
    this.container.querySelectorAll('.a2-tab-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeTab = btn.dataset.tab;
        this.render();
      };
    });

    const headerExamBtn = this.container.querySelector('#a2k1-header-exam-btn');
    if (headerExamBtn) {
      headerExamBtn.onclick = () => {
        this.activeTab = 'exam';
        this.render();
      };
    }
  }

  renderActiveTab() {
    const content = this.container.querySelector('#a2k1-tab-content');
    if (!content) return;

    if (this.activeTab === 'grammar') {
      this.renderGrammarTab(content);
    } else if (this.activeTab === 'housing') {
      this.renderHousingTab(content);
    } else if (this.activeTab === 'contracts') {
      this.renderContractsTab(content);
    } else if (this.activeTab === 'dialogue') {
      this.renderDialogueTab(content);
    } else if (this.activeTab === 'exam') {
      this.renderExamTab(content);
    }
  }

  // TAB 1: WEAK VERBS IN PAST TENSE
  renderGrammarTab(container) {
    const g = A2_K1_HOUSING_DATA.pastTenseGrammar;
    container.innerHTML = `
      <div class="space-y-6">
        <div class="p-6 rounded-3xl bg-cyber-card border border-indigo-500/40 space-y-3 shadow-xl">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Фундаментальна граматика A2
            </span>
            <span class="text-xs font-mono text-slate-400">BÍN & Litli málfræðingurinn</span>
          </div>
          <h3 class="text-xl font-bold font-mono text-white">${g.ruleTitle}</h3>
          <p class="text-sm text-slate-300 font-sans leading-relaxed">${g.description}</p>
        </div>

        <!-- 3 Verb Classes -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${g.classes.map(cls => `
            <div class="p-5 rounded-3xl bg-cyber-card border border-cyber-border hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4 shadow-lg">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="text-base font-bold font-mono text-indigo-300">${cls.group}</h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-deep border border-cyber-border text-slate-400">${cls.pattern}</span>
                </div>
                <p class="text-xs text-slate-300 font-sans leading-relaxed">${cls.desc}</p>
                
                <div class="space-y-2 pt-2 border-t border-cyber-border/60">
                  ${cls.examples.map(ex => `
                    <div class="p-3 rounded-xl bg-cyber-deep border border-cyber-border/60 text-xs font-mono space-y-1">
                      <div class="flex items-center justify-between">
                        <span class="text-slate-400">${ex.inf} ➔ <strong class="text-indigo-300">${ex.past}</strong></span>
                        <button class="a2-speak-btn text-indigo-400 hover:text-white" data-phrase="${ex.phrase}" title="Слухати приклад">🔊</button>
                      </div>
                      <span class="text-[11px] text-amber-300 block font-sans italic">${ex.phrase}</span>
                      <span class="text-[10px] text-slate-400 block font-sans">${ex.ukr}</span>
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

  // TAB 2: HOUSING TYPES
  renderHousingTab(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${A2_K1_HOUSING_DATA.housingTypes.map(h => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4 shadow-lg">
              <div class="space-y-2">
                <div class="flex items-start justify-between">
                  <span class="text-3xl p-2 rounded-xl bg-cyber-deep border border-cyber-border">${h.icon}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyber-deep text-slate-400 border border-cyber-border">${h.gender}</span>
                </div>
                <div>
                  <h4 class="text-lg font-bold font-mono text-white">${h.nameIsl}</h4>
                  <p class="text-xs font-mono text-indigo-400">${h.ipa}</p>
                  <p class="text-xs text-slate-200 font-sans mt-1">${h.ukr}</p>
                </div>
                <p class="text-xs text-slate-400 font-sans leading-relaxed pt-2 border-t border-cyber-border">${h.details}</p>
              </div>

              <div class="p-3 rounded-xl bg-cyber-deep border border-cyber-border/60 space-y-1">
                <div class="flex items-center justify-between text-xs font-mono">
                  <span class="text-amber-300 font-bold truncate max-w-[200px]">${h.samplePhrase}</span>
                  <button class="a2-speak-btn text-indigo-400 hover:text-white" data-phrase="${h.samplePhrase}">🔊</button>
                </div>
                <span class="text-[11px] text-slate-400 font-sans block">${h.sampleUkr}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindSpeechButtons(container);
  }

  // TAB 3: CONTRACTS & FINANCIAL TERMS
  renderContractsTab(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${A2_K1_HOUSING_DATA.rentalTerms.map(t => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-3 shadow-lg">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-3xl">${t.icon}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyber-deep text-indigo-300 border border-indigo-500/30">${t.category}</span>
                </div>
                <h4 class="text-base font-bold font-mono text-white">${t.termIsl}</h4>
                <p class="text-xs font-mono text-indigo-400">${t.ipa}</p>
                <p class="text-xs text-slate-300 font-sans font-semibold">${t.ukr}</p>
                <p class="text-xs text-slate-400 font-sans leading-relaxed pt-2 border-t border-cyber-border">${t.desc}</p>
              </div>
              <button class="a2-speak-btn w-full py-1.5 rounded-lg bg-cyber-deep hover:bg-indigo-500/20 border border-cyber-border text-indigo-300 font-mono text-xs transition-all flex items-center justify-center gap-1.5" data-phrase="${t.termIsl}">
                <span>🔊</span><span>Вимова терміна</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindSpeechButtons(container);
  }

  // TAB 4: COMMUNICATIVE APARTMENT VIEWING DIALOGUE
  renderDialogueTab(container) {
    const d = A2_K1_HOUSING_DATA.dialogue;
    container.innerHTML = `
      <div class="space-y-6 max-w-4xl mx-auto">
        <div class="p-6 rounded-3xl bg-cyber-card border border-indigo-500/40 space-y-2 shadow-xl">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Побутова ситуація A2
            </span>
            <span class="text-xs font-mono text-slate-400">Tölum saman 2022 & ÍFA 2</span>
          </div>
          <h3 class="text-xl font-bold font-mono text-white">${d.titleIsl}</h3>
          <p class="text-sm text-slate-300 font-sans">${d.titleUkr}</p>
          <p class="text-xs text-slate-400 font-sans pt-1 border-t border-cyber-border">${d.situation}</p>
        </div>

        <div class="space-y-4">
          ${d.lines.map(line => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border hover:border-indigo-500/40 transition-all space-y-3 shadow-lg">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold ${line.speaker === 'Jón' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'}">
                    ${line.speaker}
                  </span>
                  <span class="text-xs text-slate-400 font-mono">(${line.role})</span>
                </div>
                <button class="a2-speak-btn p-2 rounded-xl bg-cyber-deep hover:bg-indigo-500/20 border border-cyber-border text-slate-300 hover:text-indigo-300 transition-all text-xs flex items-center gap-1.5 cursor-pointer" data-phrase="${line.is}" data-audio="${line.audio || ''}">
                  <span>🔊</span><span>Слухати</span>
                </button>
              </div>

              <div class="space-y-1">
                <p class="text-base font-mono font-bold text-white">${line.is}</p>
                <p class="text-xs font-mono text-indigo-400">${line.ipa}</p>
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
    container.innerHTML = `<div id="a2-exam-wrapper" class="w-full"></div>`;
    const examWrapper = container.querySelector('#a2-exam-wrapper');

    this.examComponent = new A2K1Exam(
      examWrapper,
      (score, total) => {
        gameState.completeLessonExam('a2_k1_exit', score, total);
      },
      () => {
        this.activeTab = 'grammar';
        this.render();
      }
    );
    this.examComponent.render();
  }

  bindSpeechButtons(container) {
    container.querySelectorAll('.a2-speak-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const audioPath = btn.dataset.audio;
        const phrase = btn.dataset.phrase;
        if (audioPath) {
          audioEngine.play(audioPath, btn);
        } else if (phrase) {
          audioEngine.speak(phrase, 'is-IS');
        }
      };
    });
  }
}
