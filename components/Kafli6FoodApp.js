/**
 * Kafli6FoodApp.js - Master Interactive Application for Lesson 6
 * (Kafli 6: Matur, eldamennska og veitingahús — Food, Cooking, Restaurant & Partitive Syntax)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 1 (Kafli 7: Matur og drykkur, pp. 116-135)
 * - Tölum saman 2022 (Eldhús & Veitingastaðir)
 * - Viltu læra íslensku? (Þættir 3 & 9: Í matvöruverslun og á veitingastað)
 * - Litli málfræðingurinn & Árnastofnun BÍN
 */

import { K6_FOOD_DATA } from '../data/k6_food_data.js?v=1.0';
import { Kafli6Exam } from './Kafli6Exam.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class Kafli6FoodApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'vocab'; // 'vocab' | 'partitive' | 'cooking' | 'restaurant' | 'exam'
    this.selectedFoodCategory = 'all'; // 'all' | 'meat_fish' | 'dairy' | 'produce' | 'drinks'
    this.selectedUnitId = 'glas_af';
    this.selectedCookingVerbId = 'sjoda';
    this.examComponent = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Top Hero Navigation Header -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-cyber-card to-cyber-deep border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Модуль A1.3 • Урок 6
              </span>
              <span class="text-xs text-slate-400 font-mono">ÍFA 1 Kafli 7 & BÍN Standard</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>🍽️</span> Matur, eldamennska og veitingahús
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Гастрономія Ісландії, партитивні конструкції міри (<span class="text-amber-300 font-mono">glas af vatni 🟡</span>), кулінарні дієслова (<span class="text-emerald-400 font-mono">sjóða / sýð</span>), замовлення страв та ресторанний етикет.
            </p>
          </div>

          <!-- Quick Stats / Exam Status Badge -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="k6-header-exam-btn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-black font-mono text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2">
              <span>🏆</span>
              <span>Іспит K6 (+150 XP)</span>
            </button>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="vocab" class="k6-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'vocab' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🥗</span><span>1. Matur & Hefðir (Страви)</span>
          </button>
          <button data-tab="partitive" class="k6-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'partitive' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🧪</span><span>2. Mælieiningar (af + ÞGF 🟡)</span>
          </button>
          <button data-tab="cooking" class="k6-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'cooking' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🍳</span><span>3. Eldunarsagnir (Кулінарія)</span>
          </button>
          <button data-tab="restaurant" class="k6-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'restaurant' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🍷</span><span>4. Á Veitingastað (Ресторан)</span>
          </button>
          <button data-tab="exam" class="k6-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'exam' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>📝</span><span>5. Lokapróf (Сертифікаційний іспит)</span>
          </button>
        </div>

        <!-- ================= TAB 1: FOOD VOCABULARY ================= -->
        <div class="${this.activeTab === 'vocab' ? '' : 'hidden'} space-y-6">
          <div class="space-y-4">
            
            <!-- Category Filter Pills -->
            <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
              ${[
                { id: 'all', label: 'Усі продукти', icon: '🌐' },
                { id: 'meat_fish', label: 'М\'ясо та Риба', icon: '🥩' },
                { id: 'dairy', label: 'Молочне та Скір', icon: '🥣' },
                { id: 'produce', label: 'Хліб та Овочі', icon: '🍞' },
                { id: 'drinks', label: 'Напої', icon: '☕' }
              ].map(cat => `
                <button 
                  data-food-cat="${cat.id}" 
                  class="food-cat-btn px-3 py-1.5 rounded-xl border ${this.selectedFoodCategory === cat.id ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold' : 'border-slate-800 bg-black/40 text-slate-400 hover:text-white'} transition-all flex items-center gap-1.5"
                >
                  <span>${cat.icon}</span><span>${cat.label}</span>
                </button>
              `).join('')}
            </div>

            <!-- Vocabulary Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              ${K6_FOOD_DATA.vocabulary
                .filter(item => this.selectedFoodCategory === 'all' || item.category === this.selectedFoodCategory)
                .map(item => `
                  <div 
                    data-audio-text="${item.is}" 
                    class="food-item-card p-3.5 rounded-xl border border-slate-800 hover:border-amber-500/60 bg-black/40 hover:bg-slate-900/60 cursor-pointer transition-all space-y-2 group"
                  >
                    <div class="flex items-center justify-between">
                      <span class="text-2xl">${item.icon}</span>
                      <span class="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${item.gender === 'kk' ? 'bg-cyan-500/20 text-cyan-300' : item.gender === 'kvk' ? 'bg-purple-500/20 text-purple-300' : 'bg-emerald-500/20 text-emerald-300'}">
                        ${item.genderLabel}
                      </span>
                    </div>

                    <div>
                      <div class="text-sm font-bold font-mono text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                        <span>${item.is}</span>
                        <span class="text-slate-500 group-hover:text-amber-400 text-xs">🔊</span>
                      </div>
                      <div class="text-[11px] font-mono text-slate-400">${item.ipa}</div>
                      <div class="text-xs text-slate-300 font-sans mt-0.5">${item.ukr}</div>
                    </div>

                    <div class="border-t border-slate-800/80 pt-1.5 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                      <span>Означена: <span class="text-slate-200 font-bold">${item.defSingular}</span></span>
                      ${item.plural ? `<span>Мн: <span class="text-slate-200 font-bold">${item.plural}</span></span>` : ''}
                    </div>
                  </div>
                `).join('')}
            </div>

          </div>
        </div>

        <!-- ================= TAB 2: PARTITIVE QUANTIFIERS LAB ================= -->
        <div class="${this.activeTab === 'partitive' ? '' : 'hidden'} space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left: Unit Pickers (lg:col-span-5) -->
            <div class="lg:col-span-5 space-y-4">
              <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold font-mono text-amber-300 flex items-center gap-2">
                    <span>⚖️</span> ОДИНИЦІ МІРИ ТА ОБ'ЄМУ (MAGN)
                  </h3>
                  <span class="text-[11px] font-mono text-slate-400">af + ÞGF 🟡</span>
                </div>

                <div class="space-y-2">
                  ${K6_FOOD_DATA.partitiveUnits.map(pu => `
                    <button 
                      data-unit-id="${pu.id}" 
                      class="partitive-unit-btn w-full p-3.5 rounded-xl border ${this.selectedUnitId === pu.id ? 'border-amber-400 bg-amber-950/40 text-white' : 'border-slate-800 bg-black/40 text-slate-400 hover:text-white'} text-left transition-all space-y-1"
                    >
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-bold font-mono text-white">${pu.unit}</span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          ${pu.governs}
                        </span>
                      </div>
                      <div class="text-xs text-slate-300 font-sans">${pu.ukr}</div>
                    </button>
                  `).join('')}
                </div>

              </div>
            </div>

            <!-- Right: Dative Transformation Inspector (lg:col-span-7) -->
            <div class="lg:col-span-7 space-y-4">
              ${(() => {
                const pu = K6_FOOD_DATA.partitiveUnits.find(u => u.id === this.selectedUnitId) || K6_FOOD_DATA.partitiveUnits[0];
                return `
                  <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-5">
                    <div>
                      <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Граматичний аналізатор партитиву</span>
                      <h4 class="text-base sm:text-lg font-bold font-mono text-white mt-0.5">
                        ${pu.unit} (${pu.ukr})
                      </h4>
                    </div>

                    <!-- Examples Display -->
                    <div class="space-y-2.5">
                      ${pu.examples.map(ex => `
                        <div class="p-4 rounded-xl bg-black/60 border border-slate-800 flex items-center justify-between">
                          <div>
                            <div class="text-sm font-mono font-bold text-amber-300">${ex.is}</div>
                            <div class="text-xs text-slate-400 font-sans">${ex.ukr}</div>
                          </div>
                          <button data-speak-text="${ex.is}" class="partitive-speak-btn p-2 rounded-lg bg-amber-500/20 text-amber-300 hover:text-white text-xs font-mono">
                            🔊
                          </button>
                        </div>
                      `).join('')}
                    </div>

                    <!-- Academic Note -->
                    <div class="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                      <div class="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1.5">
                        <span>💡</span> ГРАМАТИЧНЕ ПРАВИЛО:
                      </div>
                      <p class="text-xs text-slate-300 font-sans leading-relaxed">
                        ${pu.ruleNote} В ісландській мові не можна казати *\*glas vatn* без прийменника. Обов'язкова зв'язка: <span class="font-mono text-white">af + Давальний відмінок (ÞGF 🟡)</span>.
                      </p>
                    </div>

                  </div>
                `;
              })()}
            </div>

          </div>
        </div>

        <!-- ================= TAB 3: COOKING VERBS ================= -->
        <div class="${this.activeTab === 'cooking' ? '' : 'hidden'} space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left: Cooking Verbs Selector (lg:col-span-5) -->
            <div class="lg:col-span-5 space-y-4">
              <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold font-mono text-amber-300 flex items-center gap-2">
                    <span>🍳</span> КУЛІНАРНІ ДІЄСЛОВА (ELDUN)
                  </h3>
                  <span class="text-[11px] font-mono text-slate-400">4 базових</span>
                </div>

                <div class="space-y-2">
                  ${K6_FOOD_DATA.cookingVerbs.map(cv => `
                    <button 
                      data-cooking-verb="${cv.id}" 
                      class="cooking-verb-btn w-full p-3.5 rounded-xl border ${this.selectedCookingVerbId === cv.id ? 'border-amber-400 bg-amber-950/40 text-white' : 'border-slate-800 bg-black/40 text-slate-400 hover:text-white'} text-left transition-all space-y-1"
                    >
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-bold font-mono text-white">${cv.inf}</span>
                        <span class="text-xs font-mono text-slate-400">${cv.ipa}</span>
                      </div>
                      <div class="text-xs text-slate-300 font-sans">${cv.meaningUkr}</div>
                    </button>
                  `).join('')}
                </div>

              </div>
            </div>

            <!-- Right: Conjugation Paradigm & Example (lg:col-span-7) -->
            <div class="lg:col-span-7 space-y-4">
              ${(() => {
                const cv = K6_FOOD_DATA.cookingVerbs.find(v => v.id === this.selectedCookingVerbId) || K6_FOOD_DATA.cookingVerbs[0];
                return `
                  <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
                    <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Відмінювання дієслова</span>
                        <h4 class="text-base sm:text-lg font-bold font-mono text-white">
                          ${cv.inf} (${cv.meaningUkr})
                        </h4>
                      </div>
                      <button id="cooking-speak-btn" data-speak="${cv.exampleIs}" class="p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono flex items-center gap-1.5">
                        <span>🔊</span><span>Зразок</span>
                      </button>
                    </div>

                    <!-- Conjugation Strings -->
                    <div class="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-1.5">
                      <div class="text-xs font-mono font-bold text-slate-300">Теперішній час (Nútíð):</div>
                      <div class="text-xs font-mono text-emerald-300 leading-relaxed font-bold">
                        ${cv.presConjugation}
                      </div>
                    </div>

                    <!-- Linguistic Rule -->
                    <div class="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                      <div class="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1.5">
                        <span>💡</span> МОРФОЛОГІЧНЕ ПРАВИЛО:
                      </div>
                      <p class="text-xs text-slate-300 font-sans leading-relaxed">
                        ${cv.rule}
                      </p>
                    </div>

                    <!-- Sample Sentence -->
                    <div class="p-3 rounded-xl bg-black/60 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div class="text-xs font-mono font-bold text-white">${cv.exampleIs}</div>
                        <div class="text-[11px] text-slate-400 font-sans">${cv.exampleUkr}</div>
                      </div>
                      <span class="text-lg">🥣</span>
                    </div>

                  </div>
                `;
              })()}
            </div>

          </div>
        </div>

        <!-- ================= TAB 4: RESTAURANT & DIALOGUES ================= -->
        <div class="${this.activeTab === 'restaurant' ? '' : 'hidden'} space-y-6">
          <div class="space-y-6">
            
            <!-- Quick Phrasal Guide for Dining Out -->
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-3">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 class="text-sm font-bold font-mono text-amber-300 flex items-center gap-2">
                  <span>🛎️</span> ЗОЛОТИЙ СЛОВНИК ВІДВІДУВАЧА РЕСТОРАНУ В РЕЙК'ЯВІКУ
                </h4>
                <span class="text-[11px] font-mono text-slate-400">7 ключових виразів</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                ${K6_FOOD_DATA.restaurantPhrases.map(ph => `
                  <div class="p-3 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-mono text-amber-400 font-bold">${ph.situation}</span>
                      <button data-speak-text="${ph.is}" class="partitive-speak-btn text-xs text-slate-400 hover:text-white p-1" title="Озвучити">
                        🔊
                      </button>
                    </div>
                    <div class="text-xs font-mono font-bold text-white">${ph.is}</div>
                    <div class="text-[11px] font-mono text-slate-500">${ph.ipa}</div>
                    <div class="text-xs text-slate-300 font-sans">${ph.ukr}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Authentic Dialogue -->
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-3 shadow-lg">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <h4 class="text-sm font-bold font-mono text-white">${K6_FOOD_DATA.dialogues[0].titleIsl}</h4>
                  <div class="text-[11px] text-slate-400 font-sans">${K6_FOOD_DATA.dialogues[0].titleUkr}</div>
                </div>
              </div>

              <div class="space-y-3">
                ${K6_FOOD_DATA.dialogues[0].lines.map(line => `
                  <div class="p-3 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-mono font-bold ${line.speaker === 'Gunnar' ? 'text-amber-400' : line.speaker === 'Поліна' ? 'text-purple-400' : 'text-cyan-400'}">
                        ${line.speaker} (${line.role})
                      </span>
                      <button data-speak-line="${line.is}" class="dia-speak-btn text-xs text-slate-400 hover:text-white p-1" title="Озвучити">
                        🔊
                      </button>
                    </div>
                    <div class="text-xs sm:text-sm font-mono font-bold text-white">${line.is}</div>
                    <div class="text-[11px] font-mono text-slate-500">${line.ipa}</div>
                    <div class="text-xs text-slate-300 font-sans">${line.ukr}</div>
                    <div class="text-[10px] text-amber-400/90 font-mono border-t border-slate-800/60 pt-1">💡 ${line.note}</div>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>
        </div>

        <!-- ================= TAB 5: CERTIFICATION EXAM ================= -->
        <div class="${this.activeTab === 'exam' ? '' : 'hidden'} space-y-4" id="k6-exam-container">
          <!-- Populated dynamically by Kafli6Exam -->
        </div>

      </div>
    `;

    this.bindEvents();
    this.mountExamIfActive();
  }

  bindEvents() {
    // Tab switching
    this.container.querySelectorAll('.k6-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.dataset.tab;
        this.render();
      });
    });

    // Top Header Exam Button
    const examHeaderBtn = this.container.querySelector('#k6-header-exam-btn');
    if (examHeaderBtn) {
      examHeaderBtn.addEventListener('click', () => {
        this.activeTab = 'exam';
        this.render();
      });
    }

    // Food category selection
    this.container.querySelectorAll('.food-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedFoodCategory = btn.dataset.foodCat;
        this.render();
      });
    });

    // Food cards audio
    this.container.querySelectorAll('.food-item-card').forEach(card => {
      card.addEventListener('click', () => {
        this.speakText(card.dataset.audioText);
      });
    });

    // Partitive Unit selection
    this.container.querySelectorAll('.partitive-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedUnitId = btn.dataset.unitId;
        this.render();
      });
    });

    // Partitive Speak Buttons
    this.container.querySelectorAll('.partitive-speak-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.speakText(btn.dataset.speakText);
      });
    });

    // Cooking Verb selection
    this.container.querySelectorAll('.cooking-verb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedCookingVerbId = btn.dataset.cookingVerb;
        this.render();
      });
    });

    // Cooking Speak Button
    const cookSpeakBtn = this.container.querySelector('#cooking-speak-btn');
    if (cookSpeakBtn) {
      cookSpeakBtn.addEventListener('click', () => {
        this.speakText(cookSpeakBtn.dataset.speak);
      });
    }

    // Dialogue Line Speak Buttons
    this.container.querySelectorAll('.dia-speak-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.speakText(btn.dataset.speakLine);
      });
    });
  }

  mountExamIfActive() {
    if (this.activeTab === 'exam') {
      const examContainer = this.container.querySelector('#k6-exam-container');
      if (examContainer) {
        this.examComponent = new Kafli6Exam(
          examContainer,
          () => {
            this.activeTab = 'vocab';
            this.render();
          },
          () => {
            this.activeTab = 'vocab';
            this.render();
          }
        );
        this.examComponent.render();
      }
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
