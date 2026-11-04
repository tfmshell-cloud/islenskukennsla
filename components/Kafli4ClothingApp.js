/**
 * Kafli4ClothingApp.js - Master Interactive Application for Lesson 4 (Kafli 4: Föt, litir og lýsingarorð)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 1 (Kafli 5: Föt og litir, pp. 78-95)
 * - Tölum saman 2022 (Vinnufatnaður, öryggi & lagaskipting)
 * - Viltu læra íslensku? (Þættir 4 & 5: Í fatabúð)
 * - Litli málfræðingurinn & Árnastofnun BÍN
 */

import { K4_CLOTHING_DATA } from '../data/k4_clothing_data.js?v=1.0';
import { Kafli4Exam } from './Kafli4Exam.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class Kafli4ClothingApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'layering'; // 'layering' | 'adjectives' | 'verbs' | 'store' | 'exam'
    this.selectedScenarioId = 'autumn_rain';
    this.selectedColorId = 'svartur';
    this.selectedGender = 'kk'; // 'kk' | 'kvk' | 'hk'
    this.builderVerbId = 'fara_i';
    this.builderItemId = 'ulpa';
    this.examComponent = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Top Hero Navigation Header -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-cyber-card to-cyber-deep border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Модуль A1.2 • Урок 4
              </span>
              <span class="text-xs text-slate-400 font-mono">ÍFA 1 Kafli 5 & BÍN Standard</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>👗</span> Föt, litir og lýsingarorð
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Одяг, кольори, сильна відміна прикметників, U-умлаут (<span class="text-amber-300 font-mono">svartur ➔ svört</span>), дієслова одягання (<span class="text-emerald-400 font-mono">fara í 🟢 / úr 🟡</span>) та ісландська шаруватість (Lagaskipting).
            </p>
          </div>

          <!-- Quick Stats / Exam Status Badge -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="k4-header-exam-btn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-mono text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2">
              <span>🏆</span>
              <span>Іспит K4 (+150 XP)</span>
            </button>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="layering" class="k4-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'layering' ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🧥</span><span>1. Fataskápur (Шаруватість)</span>
          </button>
          <button data-tab="adjectives" class="k4-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'adjectives' ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🎨</span><span>2. Lýsingarorð (Кольори & BÍN)</span>
          </button>
          <button data-tab="verbs" class="k4-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'verbs' ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🔄</span><span>3. Sagnir (Керування відмінками)</span>
          </button>
          <button data-tab="store" class="k4-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'store' ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🛍️</span><span>4. Í Fatabúð (Діалоги в крамниці)</span>
          </button>
          <button data-tab="exam" class="k4-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'exam' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>📝</span><span>5. Lokapróf (Сертифікаційний іспит)</span>
          </button>
        </div>

        <!-- ================= TAB 1: ARCTIC LAYERING & WARDROBE ================= -->
        <div class="${this.activeTab === 'layering' ? '' : 'hidden'} space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left: Weather Scenarios & Mannequin Rules (lg:col-span-5) -->
            <div class="lg:col-span-5 space-y-4">
              <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold font-mono text-emerald-300 flex items-center gap-2">
                    <span>🌦️</span> ІСЛАНДСЬКА ПОГОДА & СЦЕНАРІЙ
                  </h3>
                  <span class="text-[11px] font-mono text-slate-400">Lagaskipting</span>
                </div>

                <!-- Scenario Selector Pills -->
                <div class="space-y-2">
                  ${K4_CLOTHING_DATA.layeringScenarios.map(sc => `
                    <button 
                      data-scenario-id="${sc.id}" 
                      class="scenario-pill-btn w-full p-3 rounded-xl border ${this.selectedScenarioId === sc.id ? 'border-emerald-500 bg-emerald-950/40 text-white' : 'border-slate-800 bg-black/40 text-slate-400 hover:text-white'} text-left transition-all space-y-1"
                    >
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-bold font-mono text-slate-200">${sc.titleIsl}</span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold ${sc.id === 'arctic_blizzard' ? 'bg-cyan-500/20 text-cyan-300' : sc.id === 'autumn_rain' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}">
                          ${sc.temp}
                        </span>
                      </div>
                      <div class="text-[11px] text-slate-400 font-sans">${sc.titleUkr}</div>
                    </button>
                  `).join('')}
                </div>

                <!-- Current Scenario Breakdown -->
                ${(() => {
                  const sc = K4_CLOTHING_DATA.layeringScenarios.find(s => s.id === this.selectedScenarioId) || K4_CLOTHING_DATA.layeringScenarios[0];
                  return `
                    <div class="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-3">
                      <div class="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                        <span>⚠️</span> ПРАВИЛО БЕЗПЕКИ LANDSBJÖRG:
                      </div>
                      <p class="text-xs text-slate-300 font-sans leading-relaxed">
                        ${sc.warningUkr}
                      </p>
                      <div class="space-y-1.5 border-t border-slate-800/80 pt-2 text-xs font-mono">
                        ${sc.idealLayers.map(l => `
                          <div class="flex items-start gap-2 text-slate-300">
                            <span class="text-emerald-400 shrink-0">✓</span>
                            <div>
                              <span class="text-slate-400">${l.layer}:</span> 
                              <span class="font-bold text-white">${l.item}</span>
                            </div>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  `;
                })()}

              </div>
            </div>

            <!-- Right: Interactive Vocabulary Grid & Audio Soundboard (lg:col-span-7) -->
            <div class="lg:col-span-7 space-y-4">
              <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 class="text-sm font-bold font-mono text-emerald-300 flex items-center gap-2">
                    <span>🗄️</span> FATAORÐAFORÐI (СЛОВНИК ЕЛЕМЕНТІВ ОДЯГУ)
                  </h3>
                  <span class="text-[11px] font-mono text-slate-400">Натисніть на картку для озвучки 🔊</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  ${K4_CLOTHING_DATA.vocabulary.map(item => `
                    <div 
                      data-audio-text="${item.is}" 
                      class="clothing-card p-3 rounded-xl border border-slate-800 hover:border-emerald-500/60 bg-black/40 hover:bg-slate-900/60 cursor-pointer transition-all space-y-2 group"
                    >
                      <div class="flex items-center justify-between">
                        <span class="text-2xl">${item.icon}</span>
                        <span class="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${item.gender === 'kk' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : item.gender === 'kvk' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}">
                          ${item.genderLabel}
                        </span>
                      </div>

                      <div>
                        <div class="text-sm font-bold font-mono text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                          <span>${item.is}</span>
                          <span class="text-slate-500 group-hover:text-emerald-400 text-xs">🔊</span>
                        </div>
                        <div class="text-[11px] font-mono text-slate-400">${item.ipa}</div>
                        <div class="text-xs text-slate-300 font-sans mt-0.5">${item.ukr}</div>
                      </div>

                      <div class="border-t border-slate-800/80 pt-1.5 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                        <span>Множина: <span class="text-slate-200 font-bold">${item.plural}</span></span>
                        <span>Арктикль: <span class="text-slate-200 font-bold">${item.defSingular}</span></span>
                      </div>
                    </div>
                  `).join('')}
                </div>

              </div>
            </div>

          </div>
        </div>

        <!-- ================= TAB 2: ADJECTIVE & COLOR MATRIX ================= -->
        <div class="${this.activeTab === 'adjectives' ? '' : 'hidden'} space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left: Color Swatches & Gender Switcher (lg:col-span-5) -->
            <div class="lg:col-span-5 space-y-4">
              <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold font-mono text-emerald-300 flex items-center gap-2">
                    <span>🎨</span> ПАЛІТРА КОЛЬОРІВ (LITIR)
                  </h3>
                  <span class="text-[11px] font-mono text-slate-400">8 базових</span>
                </div>

                <!-- Color Swatch Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  ${K4_CLOTHING_DATA.colors.map(col => `
                    <button 
                      data-color-id="${col.id}" 
                      class="color-swatch-btn p-3 rounded-xl border ${this.selectedColorId === col.id ? 'border-emerald-400 bg-emerald-950/40 shadow-lg' : 'border-slate-800 bg-black/40 hover:border-slate-600'} transition-all text-left space-y-1.5"
                    >
                      <div class="w-full h-6 rounded-lg border border-white/20" style="background-color: ${col.hex}"></div>
                      <div class="text-xs font-mono font-bold text-white">${col.kk}</div>
                      <div class="text-[10px] text-slate-400 font-sans truncate">${col.nameUkr}</div>
                    </button>
                  `).join('')}
                </div>

                <!-- Gender Switcher -->
                <div class="space-y-2 pt-2 border-t border-slate-800">
                  <div class="text-xs font-mono font-bold text-slate-300">Оберіть граматичний рід іменника:</div>
                  <div class="grid grid-cols-3 gap-2">
                    <button data-gender="kk" class="gender-btn py-2 px-3 rounded-xl border ${this.selectedGender === 'kk' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold' : 'border-slate-800 bg-black/40 text-slate-400'} font-mono text-xs">
                      Karlkyn (Чол.)
                    </button>
                    <button data-gender="kvk" class="gender-btn py-2 px-3 rounded-xl border ${this.selectedGender === 'kvk' ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-bold' : 'border-slate-800 bg-black/40 text-slate-400'} font-mono text-xs">
                      Kvenkyn (Жін.)
                    </button>
                    <button data-gender="hk" class="gender-btn py-2 px-3 rounded-xl border ${this.selectedGender === 'hk' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold' : 'border-slate-800 bg-black/40 text-slate-400'} font-mono text-xs">
                      Hvorugkyn (Сер.)
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <!-- Right: Dynamic Inflection Card & BÍN Academic Rules (lg:col-span-7) -->
            <div class="lg:col-span-7 space-y-4">
              ${(() => {
                const color = K4_CLOTHING_DATA.colors.find(c => c.id === this.selectedColorId) || K4_CLOTHING_DATA.colors[0];
                return `
                  <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
                    <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Сильна відміна прикметника</span>
                        <h4 class="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2">
                          <span class="w-3.5 h-3.5 rounded-full" style="background-color: ${color.hex}"></span>
                          ${color.kk} / ${color.kvk} / ${color.hk}
                        </h4>
                      </div>
                      <button id="color-speak-btn" data-speak="${color.kk}, ${color.kvk}, ${color.hk}" class="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                        <span>🔊</span><span>Озвучити</span>
                      </button>
                    </div>

                    <!-- Inflection Table -->
                    <div class="overflow-x-auto">
                      <table class="w-full text-xs font-mono">
                        <thead>
                          <tr class="border-b border-slate-800 text-slate-400 text-[11px]">
                            <th class="py-2 text-left">Відмінок</th>
                            <th class="py-2 text-left text-cyan-300">Karlkyn (Чол.)</th>
                            <th class="py-2 text-left text-purple-300">Kvenkyn (Жін.)</th>
                            <th class="py-2 text-left text-emerald-300">Hvorugkyn (Сер.)</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800/60">
                          <tr>
                            <td class="py-2.5 font-bold text-cyan-400 flex items-center gap-1">🔵 Nf. (Називний)</td>
                            <td class="py-2.5 font-bold text-white">${color.kk}</td>
                            <td class="py-2.5 font-bold ${color.id === 'svartur' ? 'text-amber-300 bg-amber-400/10 px-1 rounded' : 'text-white'}">${color.kvk}</td>
                            <td class="py-2.5 font-bold text-white">${color.hk}</td>
                          </tr>
                          <tr>
                            <td class="py-2.5 font-bold text-emerald-400 flex items-center gap-1">🟢 Þf. (Знахідний)</td>
                            <td class="py-2.5 text-slate-200">${color.kkAcc}</td>
                            <td class="py-2.5 text-slate-200">${color.kvkAcc}</td>
                            <td class="py-2.5 text-slate-200">${color.hkAcc}</td>
                          </tr>
                          <tr>
                            <td class="py-2.5 font-bold text-amber-400 flex items-center gap-1">🟡 Þgf. (Давальний)</td>
                            <td class="py-2.5 text-slate-200">${color.kkDat}</td>
                            <td class="py-2.5 text-slate-200">${color.kvkDat}</td>
                            <td class="py-2.5 text-slate-200">${color.hkDat}</td>
                          </tr>
                          <tr>
                            <td class="py-2.5 font-bold text-purple-400">Множина (Fleirtala)</td>
                            <td class="py-2.5 text-slate-400">${color.pluralKk}</td>
                            <td class="py-2.5 text-slate-400">${color.pluralKvk}</td>
                            <td class="py-2.5 ${color.id === 'svartur' ? 'text-amber-300 font-bold' : 'text-slate-400'}">${color.pluralHk}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- Academic Note / Trap Alert -->
                    <div class="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                      <div class="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1.5">
                        <span>💡</span> ГРАМАТИЧНИЙ АНАЛІЗ BÍN:
                      </div>
                      <p class="text-xs text-slate-300 font-sans leading-relaxed">
                        ${color.ruleNote}
                      </p>
                    </div>

                  </div>
                `;
              })()}

            </div>

          </div>
        </div>

        <!-- ================= TAB 3: VERB GOVERNANCE LAB ================= -->
        <div class="${this.activeTab === 'verbs' ? '' : 'hidden'} space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left: Verb Selector & Mechanics (lg:col-span-5) -->
            <div class="lg:col-span-5 space-y-4">
              <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold font-mono text-emerald-300 flex items-center gap-2">
                    <span>⚙️</span> ДІЄСЛОВА ОДЯГУ ТА КЕРУВАННЯ
                  </h3>
                  <span class="text-[11px] font-mono text-slate-400">Fatasagnir</span>
                </div>

                <div class="space-y-2.5">
                  ${K4_CLOTHING_DATA.verbs.map(v => `
                    <button 
                      data-builder-verb="${v.id}" 
                      class="builder-verb-btn w-full p-3.5 rounded-xl border ${this.builderVerbId === v.id ? 'border-emerald-500 bg-emerald-950/40 text-white' : 'border-slate-800 bg-black/40 text-slate-400 hover:text-white'} text-left transition-all space-y-1"
                    >
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-bold font-mono text-white">${v.inf}</span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold ${v.governs.includes('ÞF') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}">
                          ${v.governs}
                        </span>
                      </div>
                      <div class="text-xs text-slate-300 font-sans">${v.meaning}</div>
                      <div class="text-[10px] font-mono text-slate-500">${v.formula}</div>
                    </button>
                  `).join('')}
                </div>

              </div>
            </div>

            <!-- Right: Interactive Sentence Constructor (lg:col-span-7) -->
            <div class="lg:col-span-7 space-y-4">
              <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-5">
                <div>
                  <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Інтерактивний симулятор відмінків</span>
                  <h4 class="text-base font-bold font-mono text-white mt-0.5">
                    Конструктор фрази одягання
                  </h4>
                </div>

                <!-- Items Selector for Builder -->
                <div class="space-y-2">
                  <div class="text-xs font-mono text-slate-400">Оберіть елемент гардеробу:</div>
                  <div class="flex flex-wrap gap-2">
                    ${K4_CLOTHING_DATA.vocabulary.slice(0, 8).map(item => `
                      <button 
                        data-builder-item="${item.id}" 
                        class="builder-item-btn px-3 py-1.5 rounded-xl border ${this.builderItemId === item.id ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 font-bold' : 'border-slate-800 bg-black/40 text-slate-400 hover:text-white'} font-mono text-xs transition-all flex items-center gap-1.5"
                      >
                        <span>${item.icon}</span>
                        <span>${item.is}</span>
                      </button>
                    `).join('')}
                  </div>
                </div>

                <!-- Generated Sentence Display -->
                ${(() => {
                  const verb = K4_CLOTHING_DATA.verbs.find(v => v.id === this.builderVerbId) || K4_CLOTHING_DATA.verbs[0];
                  const item = K4_CLOTHING_DATA.vocabulary.find(i => i.id === this.builderItemId) || K4_CLOTHING_DATA.vocabulary[0];
                  
                  let transformedNoun = item.is;
                  let prepCase = 'ÞF 🟢';
                  let ukrVerb = 'вдягаю';

                  if (verb.id === 'fara_i') {
                    prepCase = 'ÞF (Знахідний 🟢)';
                    ukrVerb = 'вдягаю';
                    if (item.gender === 'kk') transformedNoun = `${item.is} (bol -> bol)`;
                    if (item.gender === 'kvk') transformedNoun = item.id === 'buxur' ? 'buxur' : `${item.is.slice(0, -1)}u (úlpa -> úlpu)`;
                    if (item.gender === 'hk') transformedNoun = item.is;
                  } else if (verb.id === 'fara_ur') {
                    prepCase = 'ÞGF (Давальний 🟡)';
                    ukrVerb = 'знімаю';
                    if (item.gender === 'kk') transformedNoun = item.id === 'skor' ? 'skónum' : `${item.is}i`;
                    if (item.gender === 'kvk') transformedNoun = item.id === 'buxur' ? 'buxum' : `${item.is.slice(0, -1)}unni`;
                    if (item.gender === 'hk') transformedNoun = `${item.is}i`;
                  } else if (verb.id === 'vera_i') {
                    prepCase = 'ÞGF (Давальний 🟡)';
                    ukrVerb = 'одягнений у';
                    if (item.gender === 'kk') transformedNoun = item.id === 'skor' ? 'skónum' : `${item.is}i`;
                    if (item.gender === 'kvk') transformedNoun = item.id === 'buxur' ? 'buxum' : `${item.is.slice(0, -1)}u`;
                    if (item.gender === 'hk') transformedNoun = `${item.is}i`;
                  }

                  const sampleSentence = verb.id === 'fara_i' 
                    ? `Ég fer í ${item.id === 'ulpa' ? 'svarta úlpu' : item.id === 'skor' ? 'hlýja skó' : item.is}.`
                    : verb.id === 'fara_ur'
                    ? `Ég fer úr ${item.id === 'ulpa' ? 'úlpunni' : item.id === 'skor' ? 'skónum' : item.is}.`
                    : `Ég er í ${item.id === 'ulpa' ? 'svartri úlpu' : item.id === 'skor' ? 'hlýjum skóm' : item.is}.`;

                  return `
                    <div class="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                          Керування: ${prepCase}
                        </span>
                        <button id="builder-speak-btn" data-speak="${sampleSentence}" class="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:text-white text-xs font-mono flex items-center gap-1">
                          <span>🔊</span><span>Послухати</span>
                        </button>
                      </div>

                      <div class="text-base sm:text-lg font-mono font-bold text-emerald-300">
                        ${sampleSentence}
                      </div>

                      <div class="text-xs text-slate-400 font-sans">
                        💡 Граматичне правило: дієслово <span class="font-mono text-white">${verb.inf}</span> вимагає відмінка <span class="font-bold text-amber-300">${verb.governs}</span>.
                      </div>
                    </div>
                  `;
                })()}

              </div>
            </div>

          </div>
        </div>

        <!-- ================= TAB 4: STORE DIALOGUES ================= -->
        <div class="${this.activeTab === 'store' ? '' : 'hidden'} space-y-6">
          <div class="space-y-4">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${K4_CLOTHING_DATA.dialogues.map(dia => `
                <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-3 shadow-lg">
                  <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h4 class="text-sm font-bold font-mono text-white">${dia.titleIsl}</h4>
                      <div class="text-[11px] text-slate-400 font-sans">${dia.titleUkr}</div>
                    </div>
                  </div>

                  <div class="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                    ${dia.lines.map(line => `
                      <div class="p-3 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                        <div class="flex items-center justify-between">
                          <span class="text-xs font-mono font-bold ${line.speaker === 'Gunnar' || line.speaker === 'Guðrún' ? 'text-cyan-400' : 'text-purple-400'}">
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
              `).join('')}
            </div>

          </div>
        </div>

        <!-- ================= TAB 5: CERTIFICATION EXAM ================= -->
        <div class="${this.activeTab === 'exam' ? '' : 'hidden'} space-y-4" id="k4-exam-container">
          <!-- Populated dynamically by Kafli4Exam -->
        </div>

      </div>
    `;

    this.bindEvents();
    this.mountExamIfActive();
  }

  bindEvents() {
    // Tab switching
    this.container.querySelectorAll('.k4-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.dataset.tab;
        this.render();
      });
    });

    // Top Header Exam Button
    const examHeaderBtn = this.container.querySelector('#k4-header-exam-btn');
    if (examHeaderBtn) {
      examHeaderBtn.addEventListener('click', () => {
        this.activeTab = 'exam';
        this.render();
      });
    }

    // Scenario selection
    this.container.querySelectorAll('.scenario-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedScenarioId = btn.dataset.scenarioId;
        this.render();
      });
    });

    // Clothing cards audio
    this.container.querySelectorAll('.clothing-card').forEach(card => {
      card.addEventListener('click', () => {
        const text = card.dataset.audioText;
        this.speakText(text);
      });
    });

    // Color Swatch Selection
    this.container.querySelectorAll('.color-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedColorId = btn.dataset.colorId;
        this.render();
      });
    });

    // Gender Switcher
    this.container.querySelectorAll('.gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedGender = btn.dataset.gender;
        this.render();
      });
    });

    // Color Speak Button
    const colSpeakBtn = this.container.querySelector('#color-speak-btn');
    if (colSpeakBtn) {
      colSpeakBtn.addEventListener('click', () => {
        this.speakText(colSpeakBtn.dataset.speak);
      });
    }

    // Builder Verb Selection
    this.container.querySelectorAll('.builder-verb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.builderVerbId = btn.dataset.builderVerb;
        this.render();
      });
    });

    // Builder Item Selection
    this.container.querySelectorAll('.builder-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.builderItemId = btn.dataset.builderItem;
        this.render();
      });
    });

    // Builder Speak Button
    const builderSpeakBtn = this.container.querySelector('#builder-speak-btn');
    if (builderSpeakBtn) {
      builderSpeakBtn.addEventListener('click', () => {
        this.speakText(builderSpeakBtn.dataset.speak);
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
      const examContainer = this.container.querySelector('#k4-exam-container');
      if (examContainer) {
        this.examComponent = new Kafli4Exam(
          examContainer,
          () => {
            this.activeTab = 'layering';
            this.render();
          },
          () => {
            this.activeTab = 'layering';
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
