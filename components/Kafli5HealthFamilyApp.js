/**
 * Kafli5HealthFamilyApp.js - Master Interactive Application for Lesson 5
 * (Kafli 5: Fjölskyldan, líkaminn og heilsan — Family, Anatomy, Health & Impersonal Syntax)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 1 (Kafli 6: Fjölskyldan og líkaminn, pp. 96-115)
 * - Tölum saman 2022 (Slys, veikindi & Heilsuvera)
 * - Viltu læra íslensku? (Þættir 6, 7 & 10: Á heilsugæslunni, í apóteki, fjölskylda)
 * - Litli málfræðingurinn & Árnastofnun BÍN
 */

import { K5_HEALTH_FAMILY_DATA } from '../data/k5_health_family_data.js?v=1.0';
import { Kafli5Exam } from './Kafli5Exam.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class Kafli5HealthFamilyApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'anatomy'; // 'anatomy' | 'family' | 'impersonal' | 'clinic' | 'exam'
    this.selectedBodyPartId = 'hofud';
    this.selectedFamilyId = 'fadir';
    this.selectedImpersonalPerson = 'Mér';
    this.selectedImpersonalState = 'kalt';
    this.examComponent = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Top Hero Navigation Header -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-rose-950/40 via-cyber-card to-cyber-deep border border-rose-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
                Модуль A1.3 • Урок 5
              </span>
              <span class="text-xs text-slate-400 font-mono">ÍFA 1 Kafli 6 & Heilsuvera Standard</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>🩺</span> Fjölskyldan, líkaminn og heilsan
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Сім'я та родовід, анатомія, безособові конструкції болю (<span class="text-amber-300 font-mono">Mér er illt í... + ÞGF 🟡</span>), фізичні відчуття (<span class="text-rose-400 font-mono">kalt / heitt</span>), візит до лікаря та аптека.
            </p>
          </div>

          <!-- Quick Stats / Exam Status Badge -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="k5-header-exam-btn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-black font-mono text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2">
              <span>🏆</span>
              <span>Іспит K5 (+150 XP)</span>
            </button>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="anatomy" class="k5-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'anatomy' ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🧠</span><span>1. Líkaminn (Анатомія & Біль)</span>
          </button>
          <button data-tab="family" class="k5-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'family' ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>👨‍👩‍👧</span><span>2. Fjölskyldan (Родина & R-відміна)</span>
          </button>
          <button data-tab="impersonal" class="k5-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'impersonal' ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>⚙️</span><span>3. Ópersónulegar (Безособовий синтаксис)</span>
          </button>
          <button data-tab="clinic" class="k5-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'clinic' ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🏥</span><span>4. Heilsugæslan & Apótek</span>
          </button>
          <button data-tab="exam" class="k5-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'exam' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>📝</span><span>5. Lokapróf (Сертифікаційний іспит)</span>
          </button>
        </div>

        <!-- ================= TAB 1: ANATOMY & PAIN SIMULATOR ================= -->
        <div class="${this.activeTab === 'anatomy' ? '' : 'hidden'} space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left: Interactive Body Parts Grid (lg:col-span-7) -->
            <div class="lg:col-span-7 space-y-4">
              <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold font-mono text-rose-300 flex items-center gap-2">
                    <span>🫀</span> LÍKAMINN (ЧАСТИНИ ТІЛА ТА ДАВАЛЬНИЙ ВІДМІНОК)
                  </h3>
                  <span class="text-[11px] font-mono text-slate-400">Клікніть для генерації фрази болю</span>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  ${K5_HEALTH_FAMILY_DATA.bodyParts.map(part => `
                    <button 
                      data-body-id="${part.id}" 
                      class="body-part-card p-3.5 rounded-xl border ${this.selectedBodyPartId === part.id ? 'border-rose-400 bg-rose-950/40 shadow-lg' : 'border-slate-800 bg-black/40 hover:border-slate-600'} text-left transition-all space-y-1.5 group"
                    >
                      <div class="flex items-center justify-between">
                        <span class="text-2xl">${part.icon}</span>
                        <span class="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${part.gender === 'kk' ? 'bg-cyan-500/20 text-cyan-300' : part.gender === 'kvk' ? 'bg-purple-500/20 text-purple-300' : 'bg-emerald-500/20 text-emerald-300'}">
                          ${part.genderLabel}
                        </span>
                      </div>
                      <div>
                        <div class="text-sm font-bold font-mono text-white group-hover:text-rose-300 transition-colors flex items-center justify-between">
                          <span>${part.is}</span>
                          <span class="text-slate-500 group-hover:text-rose-400 text-xs">🔊</span>
                        </div>
                        <div class="text-[11px] font-mono text-slate-400">${part.ipa}</div>
                        <div class="text-xs text-slate-300 font-sans mt-0.5">${part.ukr}</div>
                      </div>
                      <div class="border-t border-slate-800/80 pt-1 text-[10px] font-mono text-amber-300/90 truncate">
                        ÞGF: ${part.datSingular}
                      </div>
                    </button>
                  `).join('')}
                </div>

              </div>
            </div>

            <!-- Right: Pain Reactor & Medical Action Advice (lg:col-span-5) -->
            <div class="lg:col-span-5 space-y-4">
              ${(() => {
                const part = K5_HEALTH_FAMILY_DATA.bodyParts.find(p => p.id === this.selectedBodyPartId) || K5_HEALTH_FAMILY_DATA.bodyParts[0];
                return `
                  <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-5">
                    <div>
                      <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Генератор медичної скарги</span>
                      <h4 class="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2 mt-0.5">
                        <span>${part.icon}</span> ${part.is} (${part.ukr})
                      </h4>
                    </div>

                    <!-- Phrase Box -->
                    <div class="p-4 rounded-2xl bg-black/60 border border-rose-500/40 space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Þágufall (Давальний відмінок 🟡)
                        </span>
                        <button id="pain-phrase-speak-btn" data-speak="${part.painPhrase}" class="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:text-white text-xs font-mono flex items-center gap-1">
                          <span>🔊</span><span>Послухати</span>
                        </button>
                      </div>

                      <div class="text-base sm:text-lg font-mono font-bold text-rose-300">
                        ${part.painPhrase}
                      </div>

                      <div class="text-xs text-slate-300 font-sans">
                        🇺🇦 ${part.painUkr}
                      </div>
                    </div>

                    <!-- Grammar Anatomy Breakdown -->
                    <div class="space-y-2 border-t border-slate-800 pt-3 text-xs font-mono">
                      <div class="text-slate-400 font-bold">Морфологічна формула:</div>
                      <div class="p-3 rounded-xl bg-black/40 border border-slate-800 space-y-1.5 text-slate-300">
                        <div>1. Суб'єкт: <span class="text-amber-300 font-bold">Mér</span> (Давальний відмінок від Ég)</div>
                        <div>2. Дієслово: <span class="text-cyan-300 font-bold">er</span> (3-тя особа однини від vera)</div>
                        <div>3. Прикметник стану: <span class="text-rose-400 font-bold">illt</span> (сер. рід однини)</div>
                        <div>4. Прийменник місця: <span class="text-emerald-400 font-bold">í</span> + Давальний відмінок 🟡</div>
                        <div>5. Частина тіла: <span class="text-white font-bold">${part.datSingular}</span></div>
                      </div>
                    </div>

                    <!-- Emergency / Pharmacy Protocol -->
                    <div class="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                      <div class="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                        <span>🚑</span> МЕДИЧНИЙ ПРОТОКОЛ:
                      </div>
                      <p class="text-xs text-slate-300 font-sans leading-relaxed">
                        ${part.id === 'brjost' 
                          ? 'Увага! Біль у грудях є симптомом невідкладної допомоги: негайно телефонуйте 112 (Neyðarlínan)!'
                          : part.id === 'tonn'
                          ? 'Зубний біль: Heilsugæslan не лікує зуби. Необхідно записатися до приватного стоматолога (tannlæknir).'
                          : 'Зверніться до дільничної поліклініки (Heilsugæslan) через чат Heilsuvera.is або за номером 1700 для поради медсестри.'}
                      </p>
                    </div>

                  </div>
                `;
              })()}
            </div>

          </div>
        </div>

        <!-- ================= TAB 2: FAMILY & R-INFLECTION ================= -->
        <div class="${this.activeTab === 'family' ? '' : 'hidden'} space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left: Kinship Members Grid (lg:col-span-5) -->
            <div class="lg:col-span-5 space-y-4">
              <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold font-mono text-rose-300 flex items-center gap-2">
                    <span>👨‍👩‍👧‍👦</span> ÆTTINGJAR (ЧЛЕНИ РОДИНИ)
                  </h3>
                  <span class="text-[11px] font-mono text-slate-400">12 ключових слів</span>
                </div>

                <div class="space-y-2">
                  ${K5_HEALTH_FAMILY_DATA.familyMembers.map(fm => `
                    <button 
                      data-family-id="${fm.id}" 
                      class="family-card-btn w-full p-3 rounded-xl border ${this.selectedFamilyId === fm.id ? 'border-rose-400 bg-rose-950/40 text-white' : 'border-slate-800 bg-black/40 text-slate-400 hover:text-white'} text-left transition-all space-y-1"
                    >
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-bold font-mono text-white">${fm.is}</span>
                        <span class="text-xs font-mono text-slate-400">${fm.ipa}</span>
                      </div>
                      <div class="text-xs text-slate-300 font-sans">${fm.ukr}</div>
                    </button>
                  `).join('')}
                </div>

              </div>
            </div>

            <!-- Right: R-Inflection Paradigm & Umlaut Analyzer (lg:col-span-7) -->
            <div class="lg:col-span-7 space-y-4">
              ${(() => {
                const fm = K5_HEALTH_FAMILY_DATA.familyMembers.find(f => f.id === this.selectedFamilyId) || K5_HEALTH_FAMILY_DATA.familyMembers[0];
                return `
                  <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
                    <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Парадигма відмінювання родичів (BÍN)</span>
                        <h4 class="text-base sm:text-lg font-bold font-mono text-white">
                          ${fm.is} (${fm.ukr})
                        </h4>
                      </div>
                      <button id="family-speak-btn" data-speak="${fm.samplePhrase}" class="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-1.5">
                        <span>🔊</span><span>Зразок</span>
                      </button>
                    </div>

                    <!-- 4 Cases Table -->
                    <div class="overflow-x-auto">
                      <table class="w-full text-xs font-mono">
                        <thead>
                          <tr class="border-b border-slate-800 text-slate-400 text-[11px]">
                            <th class="py-2 text-left">Відмінок</th>
                            <th class="py-2 text-left text-cyan-300">Однина (Eintala)</th>
                            <th class="py-2 text-left text-purple-300">Множина (Fleirtala)</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800/60">
                          <tr>
                            <td class="py-2.5 font-bold text-cyan-400">🔵 Nf. (Називний)</td>
                            <td class="py-2.5 font-bold text-white">${fm.is}</td>
                            <td class="py-2.5 text-slate-200">${fm.plural}</td>
                          </tr>
                          <tr>
                            <td class="py-2.5 font-bold text-emerald-400">🟢 Þf. (Знахідний)</td>
                            <td class="py-2.5 text-slate-200">${fm.acc}</td>
                            <td class="py-2.5 text-slate-400">${fm.plural}</td>
                          </tr>
                          <tr>
                            <td class="py-2.5 font-bold text-amber-400">🟡 Þgf. (Давальний)</td>
                            <td class="py-2.5 text-slate-200">${fm.dat}</td>
                            <td class="py-2.5 text-slate-400">${fm.dat === 'syni' ? 'sonum' : fm.id === 'fadir' ? 'feðrum' : '—'}</td>
                          </tr>
                          <tr>
                            <td class="py-2.5 font-bold text-rose-400">🔴 Ef. (Родовий)</td>
                            <td class="py-2.5 text-slate-200">${fm.gen}</td>
                            <td class="py-2.5 text-slate-400">${fm.id === 'fadir' ? 'feðra' : '—'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- Academic Linguistic Alert -->
                    <div class="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                      <div class="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1.5">
                        <span>💡</span> АКАДЕМІЧНЕ ПРАВИЛО ВІДМІНИ:
                      </div>
                      <p class="text-xs text-slate-300 font-sans leading-relaxed">
                        ${fm.ruleNote}
                      </p>
                    </div>

                    <!-- Sample Phrase Box -->
                    <div class="p-3 rounded-xl bg-black/40 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div class="text-xs font-mono font-bold text-emerald-300">${fm.samplePhrase}</div>
                        <div class="text-[11px] text-slate-400 font-sans">${fm.sampleUkr}</div>
                      </div>
                      <span class="text-lg">💬</span>
                    </div>

                  </div>
                `;
              })()}
            </div>

          </div>
        </div>

        <!-- ================= TAB 3: IMPERSONAL SYNTAX LAB ================= -->
        <div class="${this.activeTab === 'impersonal' ? '' : 'hidden'} space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left: Person and State Switchers (lg:col-span-5) -->
            <div class="lg:col-span-5 space-y-4">
              <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold font-mono text-rose-300 flex items-center gap-2">
                    <span>⚙️</span> БЕЗОСОБОВІ СУБ'ЄКТИ
                  </h3>
                  <span class="text-[11px] font-mono text-slate-400">ÞGF 🟡 суб'єкти</span>
                </div>

                <!-- Persons Grid -->
                <div class="space-y-1.5">
                  <div class="text-xs font-mono text-slate-400">Оберіть особу в давальному відмінку:</div>
                  <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    ${['Mér (я)', 'Þér (ти)', 'Honum (він)', 'Henni (вона)', 'Okkur (ми)', 'Ykkur (ви)', 'Þeim (вони)'].map(pStr => {
                      const p = pStr.split(' ')[0];
                      return `
                        <button 
                          data-impersonal-person="${p}" 
                          class="impersonal-person-btn py-2 px-2.5 rounded-xl border ${this.selectedImpersonalPerson === p ? 'border-rose-400 bg-rose-950/40 text-rose-300 font-bold' : 'border-slate-800 bg-black/40 text-slate-400 hover:text-white'} font-mono text-xs transition-all"
                        >
                          ${pStr}
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>

                <!-- States Grid -->
                <div class="space-y-1.5 pt-3 border-t border-slate-800">
                  <div class="text-xs font-mono text-slate-400">Оберіть фізичний стан:</div>
                  <div class="grid grid-cols-2 gap-2">
                    ${[
                      { id: 'kalt', is: 'kalt', ukr: 'холодно' },
                      { id: 'heitt', is: 'heitt', ukr: 'гаряче' },
                      { id: 'illt', is: 'illt', ukr: 'боляче' },
                      { id: 'oglatt', is: 'óglatt', ukr: 'нудить' },
                      { id: 'batnar', is: 'batnar', ukr: 'кращає' },
                      { id: 'versnar', is: 'versnar', ukr: 'гіршає' }
                    ].map(st => `
                      <button 
                        data-impersonal-state="${st.id}" 
                        class="impersonal-state-btn p-2.5 rounded-xl border ${this.selectedImpersonalState === st.id ? 'border-amber-400 bg-amber-950/40 text-amber-300 font-bold' : 'border-slate-800 bg-black/40 text-slate-400 hover:text-white'} text-left font-mono text-xs transition-all"
                      >
                        <div class="font-bold text-white">${st.is}</div>
                        <div class="text-[10px] text-slate-400 font-sans">${st.ukr}</div>
                      </button>
                    `).join('')}
                  </div>
                </div>

              </div>
            </div>

            <!-- Right: Dynamic Impersonal Sentence Reactor (lg:col-span-7) -->
            <div class="lg:col-span-7 space-y-4">
              <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-5">
                <div>
                  <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Реактор синтаксису</span>
                  <h4 class="text-base font-bold font-mono text-white mt-0.5">
                    Безособове речення відчуття
                  </h4>
                </div>

                ${(() => {
                  const person = this.selectedImpersonalPerson;
                  const state = this.selectedImpersonalState;
                  
                  let sentence = '';
                  let ukrTrans = '';
                  if (state === 'batnar' || state === 'versnar') {
                    sentence = `${person} ${state}.`;
                    ukrTrans = state === 'batnar' ? `Особі (${person}) стає краще.` : `Особі (${person}) стає гірше.`;
                  } else {
                    sentence = `${person} er ${state}.`;
                    ukrTrans = state === 'kalt' ? `Особі (${person}) холодно.` : state === 'heitt' ? `Особі (${person}) гаряче.` : state === 'illt' ? `Особі (${person}) боляче.` : `Особу (${person}) нудить.`;
                  }

                  return `
                    <div class="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Суб'єкт у Давальному (ÞGF 🟡)
                        </span>
                        <button id="impersonal-speak-btn" data-speak="${sentence}" class="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:text-white text-xs font-mono flex items-center gap-1">
                          <span>🔊</span><span>Послухати</span>
                        </button>
                      </div>

                      <div class="text-lg sm:text-xl font-mono font-bold text-rose-300">
                        ${sentence}
                      </div>

                      <div class="text-xs text-slate-300 font-sans">
                        ${ukrTrans}
                      </div>

                      <div class="border-t border-slate-800/80 pt-2 text-[11px] text-slate-400 font-sans leading-relaxed">
                        💡 Зверніть увагу: дієслово ніколи не змінюється за особами (немає *\*Mér em* або *\*Þér ert*). Дієслово завжди застигає у формі 3-ї особи: <span class="font-mono text-cyan-300">er</span>.
                      </div>
                    </div>
                  `;
                })()}

              </div>
            </div>

          </div>
        </div>

        <!-- ================= TAB 4: CLINIC & PHARMACY ================= -->
        <div class="${this.activeTab === 'clinic' ? '' : 'hidden'} space-y-6">
          <div class="space-y-4">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${K5_HEALTH_FAMILY_DATA.dialogues.map(dia => `
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
        <div class="${this.activeTab === 'exam' ? '' : 'hidden'} space-y-4" id="k5-exam-container">
          <!-- Populated dynamically by Kafli5Exam -->
        </div>

      </div>
    `;

    this.bindEvents();
    this.mountExamIfActive();
  }

  bindEvents() {
    // Tab switching
    this.container.querySelectorAll('.k5-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.dataset.tab;
        this.render();
      });
    });

    // Top Header Exam Button
    const examHeaderBtn = this.container.querySelector('#k5-header-exam-btn');
    if (examHeaderBtn) {
      examHeaderBtn.addEventListener('click', () => {
        this.activeTab = 'exam';
        this.render();
      });
    }

    // Body Part Selection
    this.container.querySelectorAll('.body-part-card').forEach(card => {
      card.addEventListener('click', () => {
        this.selectedBodyPartId = card.dataset.bodyId;
        this.render();
      });
    });

    // Pain Phrase Speak Button
    const painSpeakBtn = this.container.querySelector('#pain-phrase-speak-btn');
    if (painSpeakBtn) {
      painSpeakBtn.addEventListener('click', () => {
        this.speakText(painSpeakBtn.dataset.speak);
      });
    }

    // Family Member Selection
    this.container.querySelectorAll('.family-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedFamilyId = btn.dataset.familyId;
        this.render();
      });
    });

    // Family Speak Button
    const famSpeakBtn = this.container.querySelector('#family-speak-btn');
    if (famSpeakBtn) {
      famSpeakBtn.addEventListener('click', () => {
        this.speakText(famSpeakBtn.dataset.speak);
      });
    }

    // Impersonal Person Selection
    this.container.querySelectorAll('.impersonal-person-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedImpersonalPerson = btn.dataset.impersonalPerson;
        this.render();
      });
    });

    // Impersonal State Selection
    this.container.querySelectorAll('.impersonal-state-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedImpersonalState = btn.dataset.impersonalState;
        this.render();
      });
    });

    // Impersonal Speak Button
    const impSpeakBtn = this.container.querySelector('#impersonal-speak-btn');
    if (impSpeakBtn) {
      impSpeakBtn.addEventListener('click', () => {
        this.speakText(impSpeakBtn.dataset.speak);
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
      const examContainer = this.container.querySelector('#k5-exam-container');
      if (examContainer) {
        this.examComponent = new Kafli5Exam(
          examContainer,
          () => {
            this.activeTab = 'anatomy';
            this.render();
          },
          () => {
            this.activeTab = 'anatomy';
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
