/**
 * Kafli7HobbiesWeatherApp.js - Master Interactive Application for Lesson 7
 * (Kafli 7: Tómstundir, sund og veður — Hobbies, Swimming Culture, Weather & A1 Grand Finale)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 1 (Kafli 8: Tómstundir og veður, pp. 136-155 — FINAL A1 CHAPTER)
 * - Tölum saman 2022 (Sundlaugar, útivist & veðurfræði)
 * - Viltu læra íslensku? (Þættir 9, 11 & 21: Í sundlaug og ferðalög um Ísland)
 * - Litli málfræðingurinn & Árnastofnun BÍN
 */

import { K7_HOBBIES_WEATHER_DATA } from '../data/k7_hobbies_weather_data.js?v=1.0';
import { Kafli7Exam } from './Kafli7Exam.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class Kafli7HobbiesWeatherApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'hobbies'; // 'hobbies' | 'sundlaug' | 'vedur' | 'dialogues' | 'exam'
    this.selectedHobbyCategory = 'all'; // 'all' | 'active' | 'quiet' | 'craft' | 'culture' | 'travel'
    this.examComponent = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Top Hero Navigation Header -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-cyber-card to-cyber-deep border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Рівень A1 • Фінал (Урок 7)
              </span>
              <span class="text-xs text-slate-400 font-mono">ÍFA 1 Kafli 8 & BÍN Standard</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>🏊</span> Tómstundir, sund og veður
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Культура геотермальних басейнів, безособова метеорологія (<span class="text-cyan-300 font-mono">Það rignir / Það snjóar</span>), пори року (<span class="text-amber-300 font-mono">á veturna</span>), хобі та підсумкова сертифікація за весь рівень A1.
            </p>
          </div>

          <!-- Quick Stats / Exam Status Badge -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="k7-header-exam-btn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-black font-mono text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2">
              <span>🎓</span>
              <span>Фінал A1 (+250 XP)</span>
            </button>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="hobbies" class="k7-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'hobbies' ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🏃</span><span>1. Tómstundir (Хобі)</span>
          </button>
          <button data-tab="sundlaug" class="k7-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'sundlaug' ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>♨️</span><span>2. Sundlaugamenning (Басейни)</span>
          </button>
          <button data-tab="vedur" class="k7-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'vedur' ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🌦️</span><span>3. Veður & Árstíðir (Погода)</span>
          </button>
          <button data-tab="dialogues" class="k7-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'dialogues' ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>💬</span><span>4. Spjall í potti (Діалоги)</span>
          </button>
          <button data-tab="exam" class="k7-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'exam' ? 'bg-indigo-500/30 border-indigo-500/70 text-indigo-300 font-bold' : 'border-indigo-500/30 text-indigo-400 hover:text-indigo-200'} transition-all flex items-center gap-2 ml-auto">
            <span>🎓</span><span>5. Lokapróf A1 (Іспит)</span>
          </button>
        </div>

        <!-- Main Tab Content Area -->
        <div id="k7-tab-content" class="min-h-[500px]"></div>

      </div>
    `;

    this.bindGlobalEvents();
    this.renderActiveTab();
  }

  bindGlobalEvents() {
    this.container.querySelectorAll('.k7-tab-btn').forEach(btn => {
      btn.onclick = () => {
        const tab = btn.dataset.tab;
        this.activeTab = tab;
        this.render();
      };
    });

    const headerExamBtn = this.container.querySelector('#k7-header-exam-btn');
    if (headerExamBtn) {
      headerExamBtn.onclick = () => {
        this.activeTab = 'exam';
        this.render();
      };
    }
  }

  renderActiveTab() {
    const content = this.container.querySelector('#k7-tab-content');
    if (!content) return;

    if (this.activeTab === 'hobbies') {
      this.renderHobbiesTab(content);
    } else if (this.activeTab === 'sundlaug') {
      this.renderSundlaugTab(content);
    } else if (this.activeTab === 'vedur') {
      this.renderVedurTab(content);
    } else if (this.activeTab === 'dialogues') {
      this.renderDialoguesTab(content);
    } else if (this.activeTab === 'exam') {
      this.renderExamTab(content);
    }
  }

  // TAB 1: HOBBIES & FREE TIME
  renderHobbiesTab(container) {
    const filteredHobbies = this.selectedHobbyCategory === 'all'
      ? K7_HOBBIES_WEATHER_DATA.hobbies
      : K7_HOBBIES_WEATHER_DATA.hobbies.filter(h => h.category === this.selectedHobbyCategory);

    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-4 bg-cyber-card/60 p-4 rounded-2xl border border-cyber-border">
          <div class="flex items-center gap-2 text-xs font-mono">
            <span class="text-slate-400">Фільтр категорій:</span>
            ${['all', 'active', 'quiet', 'craft', 'culture', 'travel'].map(cat => `
              <button class="k7-hobby-cat-btn px-3 py-1 rounded-lg border transition-all text-xs ${this.selectedHobbyCategory === cat ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'}" data-category="${cat}">
                ${cat === 'all' ? 'Всі' : cat === 'active' ? '🏃 Спорт' : cat === 'quiet' ? '📚 Спокійні' : cat === 'craft' ? '🧶 Рукоділля' : cat === 'culture' ? '🎸 Культура' : '🚗 Подорожі'}
              </button>
            `).join('')}
          </div>
          <span class="text-xs font-mono text-cyan-400">${filteredHobbies.length} активностей</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${filteredHobbies.map(h => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border hover:border-cyan-500/50 transition-all flex flex-col justify-between group shadow-lg">
              <div class="space-y-3">
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-3">
                    <span class="text-3xl p-2 rounded-xl bg-cyber-deep border border-cyber-border">${h.icon}</span>
                    <div>
                      <h3 class="text-lg font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">${h.inf}</h3>
                      <p class="text-xs font-mono text-cyan-400">${h.ipa}</p>
                    </div>
                  </div>
                  <button class="k7-speak-btn p-2 rounded-xl bg-cyber-deep hover:bg-cyan-500/20 border border-cyber-border hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all" data-phrase="${h.inf}">
                    🔊
                  </button>
                </div>

                <p class="text-sm text-slate-200 font-sans">${h.ukr}</p>

                <div class="p-3 rounded-xl bg-cyber-deep/80 border border-cyber-border/60 text-xs font-mono space-y-1">
                  <span class="text-slate-400 block text-[10px] uppercase tracking-wider">Теперішній час:</span>
                  <span class="text-amber-300 font-semibold">${h.pres}</span>
                  ${h.ruleNote ? `<p class="text-[11px] text-cyan-300/90 pt-1 border-t border-cyber-border/40 font-sans">${h.ruleNote}</p>` : ''}
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-cyber-border/60 flex items-center justify-between text-xs font-mono text-slate-400">
                <span class="truncate max-w-[200px] text-slate-300 font-sans italic">«${h.samplePhrase}»</span>
                <button class="k7-speak-btn text-cyan-400 hover:text-cyan-200 underline text-[11px]" data-phrase="${h.samplePhrase}">
                  Слухати
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.k7-hobby-cat-btn').forEach(btn => {
      btn.onclick = () => {
        this.selectedHobbyCategory = btn.dataset.category;
        this.renderHobbiesTab(container);
      };
    });

    this.bindSpeechButtons(container);
  }

  // TAB 2: SWIMMING POOL CULTURE
  renderSundlaugTab(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="p-6 rounded-3xl bg-gradient-to-r from-blue-950/40 via-cyan-950/20 to-cyber-deep border border-cyan-500/30 space-y-3">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Культурний феномен Ісландії
            </span>
          </div>
          <h3 class="text-xl font-bold font-mono text-white">Sundlaugamenning (Культура басейнів)</h3>
          <p class="text-sm text-slate-300 font-sans leading-relaxed">
            Геотермальний басейн в Ісландії — це не просто спорт, це <strong>головний клуб соціалізації країни</strong>. Тут обговорюють політику, новини, погоду та знайомляться люди будь-якого віку. Оскільки вода природна і майже не хлорується, діє найсуворіше санітарне правило Європи.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${K7_HOBBIES_WEATHER_DATA.poolEtiquette.map(p => `
            <div class="p-6 rounded-3xl bg-cyber-card border border-cyan-500/30 hover:border-cyan-400/60 transition-all flex flex-col justify-between space-y-4 shadow-xl">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-4xl p-3 rounded-2xl bg-cyber-deep border border-cyber-border">${p.icon}</span>
                  <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    ${p.importance}
                  </span>
                </div>
                <h4 class="text-lg font-bold font-mono text-white">${p.ruleIsl}</h4>
                <p class="text-xs font-mono text-cyan-400">${p.ruleUkr}</p>
                <p class="text-xs text-slate-300 font-sans leading-relaxed pt-2 border-t border-cyber-border">${p.desc}</p>
              </div>
              <button class="k7-speak-btn w-full py-2 rounded-xl bg-cyber-deep hover:bg-cyan-500/20 border border-cyber-border hover:border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center justify-center gap-2 transition-all" data-phrase="${p.ruleIsl}">
                <span>🔊</span><span>Вимова правила</span>
              </button>
            </div>
          `).join('')}
        </div>

        <!-- Practical Checklist / Rules -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4">
          <h4 class="text-sm font-bold font-mono text-cyan-300 uppercase tracking-wider flex items-center gap-2">
            <span>📋</span> Золоті правила відвідувача ісландського басейну
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-300">
            <div class="p-4 rounded-xl bg-cyber-deep border border-cyber-border/60 space-y-1">
              <div class="font-bold text-white flex items-center gap-2">
                <span class="text-red-400">❌</span> Взуття залишають біля входу
              </div>
              <p class="text-slate-400">У роздягальню не заходять у вуличному взутті (Fara úr skóm).</p>
            </div>
            <div class="p-4 rounded-xl bg-cyber-deep border border-cyber-border/60 space-y-1">
              <div class="font-bold text-white flex items-center gap-2">
                <span class="text-emerald-400">✅</span> Душ без купальника
              </div>
              <p class="text-slate-400">Спеціальні плакати показують зони обов'язкового миття голови та тіла.</p>
            </div>
            <div class="p-4 rounded-xl bg-cyber-deep border border-cyber-border/60 space-y-1">
              <div class="font-bold text-white flex items-center gap-2">
                <span class="text-amber-400">♨️</span> Температурний режим
              </div>
              <p class="text-slate-400">Поттури мають маркування: 38°C, 40°C, 42°C. Починають завжди з меншого.</p>
            </div>
            <div class="p-4 rounded-xl bg-cyber-deep border border-cyber-border/60 space-y-1">
              <div class="font-bold text-white flex items-center gap-2">
                <span class="text-cyan-400">🗣️</span> Смол-ток про погоду
              </div>
              <p class="text-slate-400">У поттурі заведено привітатися («Sæll / Sæl») та підтримати розмову.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindSpeechButtons(container);
  }

  // TAB 3: WEATHER & SEASONS
  renderVedurTab(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <!-- Seasons Section -->
        <div class="space-y-4">
          <h3 class="text-sm font-bold font-mono text-cyan-300 uppercase tracking-wider flex items-center gap-2">
            <span>📅</span> Árstíðirnar (Пори року та вживання «á + ÞGF 🟡»)
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${K7_HOBBIES_WEATHER_DATA.seasons.map(s => `
              <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border hover:border-cyan-500/50 transition-all space-y-3 shadow-lg">
                <div class="flex items-center justify-between">
                  <span class="text-3xl">${s.icon}</span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-deep border border-cyber-border text-slate-400 uppercase">${s.gender}</span>
                </div>
                <div>
                  <h4 class="text-lg font-bold font-mono text-white">${s.is}</h4>
                  <p class="text-xs font-mono text-cyan-400">${s.ipa}</p>
                  <p class="text-xs text-slate-300 font-sans mt-1">${s.ukr}</p>
                </div>
                <div class="p-3 rounded-xl bg-cyber-deep border border-cyber-border/60 text-xs font-mono space-y-1">
                  <span class="text-amber-300 block text-[11px] font-semibold">${s.phrase}</span>
                  <span class="text-slate-400 text-[10px] font-sans block">${s.phraseUkr}</span>
                </div>
                <button class="k7-speak-btn w-full py-1.5 rounded-lg bg-cyber-deep hover:bg-cyan-500/20 border border-cyber-border text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all" data-phrase="${s.phrase}">
                  🔊 Слухати приклад
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Weather Conditions & Impersonal Verbs -->
        <div class="space-y-4 pt-4 border-t border-cyber-border">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold font-mono text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <span>🌦️</span> Ópersónulegar veðursetningar (Безособові конструкції погоди)
            </h3>
            <span class="text-xs font-mono text-slate-400">ÍFA 1 Kafli 8 & BÍN</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${K7_HOBBIES_WEATHER_DATA.weatherConditions.map(w => `
              <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-3 shadow-lg">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-3xl">${w.icon}</span>
                    <button class="k7-speak-btn p-2 rounded-xl bg-cyber-deep hover:bg-cyan-500/20 border border-cyber-border text-slate-300 hover:text-cyan-300 transition-all" data-phrase="${w.is}">
                      🔊
                    </button>
                  </div>
                  <h4 class="text-lg font-bold font-mono text-white">${w.is}</h4>
                  <p class="text-xs font-mono text-cyan-400">${w.ipa}</p>
                  <p class="text-sm text-slate-200 font-sans">${w.ukr}</p>
                </div>
                <div class="pt-2 border-t border-cyber-border/60">
                  <span class="text-[11px] font-mono text-amber-300/90">${w.grammar}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindSpeechButtons(container);
  }

  // TAB 4: COMMUNICATIVE DIALOGUES
  renderDialoguesTab(container) {
    const d = K7_HOBBIES_WEATHER_DATA.dialogues[0];
    container.innerHTML = `
      <div class="space-y-6 max-w-4xl mx-auto">
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyan-500/30 space-y-2 shadow-xl">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Автентична ситуація
            </span>
            <span class="text-xs font-mono text-slate-400">Viltu læra íslensku? & Tölum saman</span>
          </div>
          <h3 class="text-xl font-bold font-mono text-white">${d.titleIsl}</h3>
          <p class="text-sm text-slate-300 font-sans">${d.titleUkr}</p>
        </div>

        <div class="space-y-4">
          ${d.lines.map((line, idx) => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border hover:border-cyan-500/40 transition-all space-y-3 shadow-lg">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded-md text-xs font-mono font-bold ${line.speaker === 'Gunnar' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'}">
                    ${line.speaker}
                  </span>
                  <span class="text-xs text-slate-400 font-mono">(${line.role})</span>
                </div>
                <button class="k7-speak-btn p-2 rounded-xl bg-cyber-deep hover:bg-cyan-500/20 border border-cyber-border text-slate-300 hover:text-cyan-300 transition-all text-xs" data-phrase="${line.is}">
                  🔊 Слухати
                </button>
              </div>

              <div class="space-y-1">
                <p class="text-base font-mono font-bold text-white">${line.is}</p>
                <p class="text-xs font-mono text-cyan-400/90">${line.ipa}</p>
                <p class="text-sm text-slate-300 font-sans pt-1 border-t border-cyber-border/40">${line.ukr}</p>
              </div>

              ${line.note ? `
                <div class="text-[11px] font-mono text-amber-300/80 bg-cyber-deep p-2 rounded-lg border border-cyber-border/40">
                  💡 Коментар: ${line.note}
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
    container.innerHTML = `<div id="k7-exam-wrapper" class="w-full"></div>`;
    const examWrapper = container.querySelector('#k7-exam-wrapper');

    this.examComponent = new Kafli7Exam(
      examWrapper,
      (score, total) => {
        gameState.completeLessonExam('k7_exit', score, total);
      },
      () => {
        this.activeTab = 'hobbies';
        this.render();
      }
    );
    this.examComponent.render();
  }

  bindSpeechButtons(container) {
    container.querySelectorAll('.k7-speak-btn').forEach(btn => {
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
