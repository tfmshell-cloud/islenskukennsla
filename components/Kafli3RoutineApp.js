/**
 * Kafli3RoutineApp.js
 * Повноцінний інтерактивний модуль Уроку 3: Dagleg rútína (Щоденна рутина та Закон V2)
 * Включає:
 * 1. 15 якірних слів Модуля 3 з озвучкою Gunnar Neural та транскрипцією IPA
 * 2. Інтерактивний конструктор інверсії V2 (Verb-Second Word Order Lab)
 * 3. Озвучений діалог «Робочий день у Рейк'явіку» (Guðrún & Gunnar)
 */

import { ANCHOR_WORDS_MASTER } from '../data/anchor_words_master.js?v=7.0';
import { audioEngine } from './AudioEngine.js?v=7.0';
import { gameState } from './GameState.js';

export class Kafli3RoutineApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'v2lab'; // 'v2lab' | 'vocab' | 'dialogue'
    this.currentExerciseIdx = 0;
    this.assembledTokens = [];
    this.feedback = null;

    this.v2Exercises = [
      {
        id: 1,
        directIs: 'Ég vakna klukkan sjö.',
        directUk: 'Я прокидаюся о сьомій годині (Прямий порядок: Підмет + Дієслово + Час).',
        promptUk: 'Перенесіть «Klukkan sjö» на перше місце з дотриманням Закону V2:',
        targetTokens: ['Klukkan sjö', 'vakna', 'ég'],
        bankTokens: ['ég', 'Klukkan sjö', 'vakna'],
        audioKey: 'klukkan_sjö_vakna_ég',
        explanation: 'Браво! Оскільки «Klukkan sjö» зайняло 1-шу позицію, дієслово «vakna» зобов\'язане залишитися на 2-й позиції, а підмет «ég» переходить на 3-тє місце!'
      },
      {
        id: 2,
        directIs: 'Ég fer í vinnuna klukkan átta.',
        directUk: 'Я йду на роботу о восьмій годині.',
        promptUk: 'Побудуйте речення з інверсією V2, починаючи з «Klukkan átta»:',
        targetTokens: ['Klukkan átta', 'fer', 'ég', 'í vinnuna'],
        bankTokens: ['ég', 'í vinnuna', 'Klukkan átta', 'fer'],
        audioKey: 'klukkan_átta_fer_ég_í_vinnuna',
        explanation: 'Бездоганно! «Klukkan átta» (Позиція 1) + «fer» (Позиція 2 — дієслово!) + «ég» (Позиція 3 — підмет) + «í vinnuna».'
      },
      {
        id: 3,
        directIs: 'Ég borða súpu í hádeginu.',
        directUk: 'Я їм суп опівдні (на обід).',
        promptUk: 'Почніть речення з обставини часу «Í hádeginu»:',
        targetTokens: ['Í hádeginu', 'borða', 'ég', 'súpu'],
        bankTokens: ['súpu', 'ég', 'Í hádeginu', 'borða'],
        audioKey: 'í_hádeginu_borða_ég_súpu',
        explanation: 'Точно в ціль! Дієслово «borða» стоїть строго на 2-му місці, а «súpu» стоїть у Знахідному відмінку (súpa ➔ súpu).'
      },
      {
        id: 4,
        directIs: 'Ég les bók um kvöldið.',
        directUk: 'Я читаю книгу ввечері.',
        promptUk: 'Почніть речення з «Um kvöldið» (Увечері):',
        targetTokens: ['Um kvöldið', 'les', 'ég', 'bók'],
        bankTokens: ['ég', 'bók', 'les', 'Um kvöldið'],
        audioKey: 'um_kvöldið_les_ég_bók',
        explanation: 'Ідеально! «Um kvöldið les ég bók» — класична ісландська інверсія V2.'
      }
    ];

    this.routineDialogue = [
      {
        speaker: 'Guðrún',
        avatar: '👩‍💼',
        is: 'Hvenær vaknar þú á morgnana?',
        ipa: '[ˈkʰvɛːnaiːr ˈvaknar θuː auː ˈmɔrknaːna?]',
        uk: 'Коли ти прокидаєшся вранці?',
        note: 'Hvenær [kʰvɛːnaiːr] — коли? Зверніть увагу на закінчення 2-ї особи -ar (þú vaknar).'
      },
      {
        speaker: 'Gunnar',
        avatar: '👨‍💻',
        is: 'Ég vakna venjulega klukkan sjö. En þú?',
        ipa: '[jɛːx ˈvakna ˈvɛnjʏˌlɛːɣa ˈkʰlʏhkan sjœː. ɛn θuː?]',
        uk: 'Я зазвичай прокидаюся о сьомій годині. А ти?',
        note: 'Прямий порядок слів: Підмет (Ég) + Дієслово (vakna).'
      },
      {
        speaker: 'Guðrún',
        avatar: '👩‍💼',
        is: 'Á virkum dögum vakna ég klukkan hálf sjö.',
        ipa: '[auː ˈvɪr̥kʏm ˈtœːɣʏm ˈvakna jɛːx ˈkʰlʏhkan haulv sjœː.]',
        uk: 'У робочі дні прокидаюся я о пів на сьому.',
        note: 'Інверсія V2: «Á virkum dögum» (1) + «vakna» (2) + «ég» (3)! «hálf sjö» = 06:30.'
      },
      {
        speaker: 'Gunnar',
        avatar: '👨‍💻',
        is: 'Hvenær ferðu í vinnuna?',
        ipa: '[ˈkʰvɛːnaiːr ˈfɛrðʏ iː ˈvɪnːʏna?]',
        uk: 'Коли ти йдеш на роботу?',
        note: 'ferðu = ferð + þú (злита розмовна форма «йдеш ти»).'
      },
      {
        speaker: 'Guðrún',
        avatar: '👩‍💼',
        is: 'Klukkan átta fer ég í vinnuna.',
        ipa: '[ˈkʰlʏhkan ˈauhta fɛːr jɛːx iː ˈvɪnːʏna.]',
        uk: 'О восьмій годині йду я на роботу.',
        note: 'Інверсія V2 після часу «Klukkan átta»: fer ég!'
      },
      {
        speaker: 'Gunnar',
        avatar: '👨‍💻',
        is: 'Vinnur þú lengi á kvöldin?',
        ipa: '[ˈvɪnːʏr θuː ˈlɛɲcɪ auː ˈkʰvœltɪn?]',
        uk: 'Ти довго працюєш вечорами?',
        note: 'У загальному питанні дієслово виходить на 1-ше місце (V1): Vinnur þú...?'
      },
      {
        speaker: 'Guðrún',
        avatar: '👩‍💼',
        is: 'Nei, klukkan fimm fer ég heim og elda kvöldmat.',
        ipa: '[neiː, ˈkʰlʏhkan fɪmː fɛːr jɛːx heiːm ɔɣ ˈɛlta ˈkʰvœltˌmaːt.]',
        uk: 'Ні, о п\'ятій годині йду я додому і готую вечерю.',
        note: 'Після коми «klukkan fimm» знову активує закон V2: fer ég heim!'
      }
    ];
  }

  render() {
    if (!this.container) return;
    window.__K3_APP__ = this;
    const words = ANCHOR_WORDS_MASTER?.module_3?.words || [];
    const ex = this.v2Exercises[this.currentExerciseIdx];

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Header & Sub-Tabs -->
        <div class="p-4 rounded-2xl bg-gradient-to-r from-purple-950/50 via-cyber-deep to-cyan-950/40 border border-purple-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Kafli 3 • Dagleg rútína & V2
              </span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                15 слів з озвучкою • Тренажер V2 • Діалог
              </span>
            </div>
            <h2 class="text-base sm:text-xl font-black text-white font-mono mt-1">
              ⏰ Урок 3: Щоденна рутина та Закон дієслова на 2-й позиції (V2)
            </h2>
          </div>

          <div class="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-slate-800 text-xs font-mono self-start md:self-auto flex-wrap">
            <button data-k3-tab="v2lab" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'v2lab' ? 'bg-purple-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              ⚡ Тренажер V2
            </button>
            <button data-k3-tab="klukkan" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'klukkan' ? 'bg-amber-400 text-black shadow-md font-extrabold' : 'text-amber-300 hover:text-white border border-amber-500/30'}">
              ⏰ Годинник & Зміни (ÍFA 1.4)
            </button>
            <button data-k3-tab="verbs" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'verbs' ? 'bg-cyan-400 text-black shadow-md font-extrabold' : 'text-cyan-300 hover:text-white border border-cyan-500/30'}">
              📐 Дієслова 3-4 груп
            </button>
            <button data-k3-tab="vocab" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'vocab' ? 'bg-cyan-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              📚 Словник (🔊)
            </button>
            <button data-k3-tab="dialogue" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'dialogue' ? 'bg-emerald-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              💬 Діалог
            </button>
          </div>
        </div>

        <!-- TAB 1: V2 INVERSION LAB -->
        <div class="${this.activeTab === 'v2lab' ? '' : 'hidden'} space-y-4">
          <!-- Visual Rule Diagram -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div class="p-4 rounded-xl bg-black/60 border border-emerald-500/30 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-emerald-400">1. Прямий порядок (Підмет на 1-му місці)</span>
                <button data-play-key="ég_vakna_klukkan_sjö" class="k3-audio-btn px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                  🔊 Слухати
                </button>
              </div>
              <div class="text-base sm:text-lg font-bold font-mono text-white">
                <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">1. Ég</span>
                <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">2. vakna</span>
                <span class="text-slate-300">klukkan sjö.</span>
              </div>
              <p class="text-xs text-slate-400 font-sans">Я прокидаюся о сьомій годині.</p>
            </div>

            <div class="p-4 rounded-xl bg-black/60 border border-purple-500/40 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-purple-300">2. Інверсія V2 (Час на 1-му місці ➔ Підмет за дієсловом!)</span>
                <button data-play-key="klukkan_sjö_vakna_ég" class="k3-audio-btn px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 font-mono text-xs">
                  🔊 Слухати
                </button>
              </div>
              <div class="text-base sm:text-lg font-bold font-mono text-white">
                <span class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">1. Klukkan sjö</span>
                <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">2. vakna</span>
                <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">3. ég.</span>
              </div>
              <p class="text-xs text-slate-400 font-sans">О сьомій годині прокидаюся я (Дієслово незмінно на 2-му місці!).</p>
            </div>
          </div>

          <!-- Interactive V2 Sentence Builder -->
          <div class="p-5 rounded-2xl bg-cyber-deep/95 border-2 border-purple-500/40 shadow-xl space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div>
                <span class="text-xs font-mono font-bold text-purple-300 uppercase">
                  🧩 Інтерактивний конструктор V2 (Завдання ${this.currentExerciseIdx + 1} з ${this.v2Exercises.length})
                </span>
                <h3 class="text-sm sm:text-base font-bold text-white font-sans mt-0.5">${ex.promptUk}</h3>
              </div>
              <button data-play-key="${ex.audioKey}" class="k3-audio-btn px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold">
                🔊 Підказка (Аудіо)
              </button>
            </div>

            <div class="p-3 rounded-xl bg-black/50 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span class="text-slate-400 font-mono">Вихідне речення:</span>
                <strong class="text-white font-mono ml-1.5">${ex.directIs}</strong>
              </div>
              <span class="text-slate-400 font-sans">🇺🇦 ${ex.directUk}</span>
            </div>

            <!-- Assembled Slots -->
            <div class="min-h-[64px] p-3.5 rounded-xl bg-black/80 border-2 border-dashed border-purple-500/40 flex items-center gap-2 flex-wrap">
              ${this.assembledTokens.length === 0 ? `
                <span class="text-xs font-mono text-slate-500">Натискайте на блоки слів нижче в правильному порядку (Позиція 1 ➔ Дієслово V2 ➔ Підмет)...</span>
              ` : this.assembledTokens.map((tok, idx) => `
                <button data-remove-idx="${idx}" class="k3-remove-token px-3.5 py-2 rounded-xl font-mono text-xs sm:text-sm font-extrabold border transition-all ${
                  idx === 1
                    ? 'bg-amber-500/25 border-amber-400 text-amber-200'
                    : 'bg-purple-500/25 border-purple-400 text-white'
                }">
                  <span class="text-[10px] opacity-70 mr-1">${idx + 1}.</span>${tok} ✕
                </button>
              `).join('')}
            </div>

            <!-- Word Bank -->
            <div class="flex items-center gap-2 flex-wrap">
              ${ex.bankTokens.map(tok => {
                const used = this.assembledTokens.includes(tok);
                return `
                  <button data-bank-tok="${tok}" ${used ? 'disabled' : ''} class="k3-bank-token px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-bold border transition-all ${
                    used
                      ? 'bg-slate-900 border-slate-800 text-slate-600 opacity-40 cursor-not-allowed'
                      : 'bg-cyber-deep hover:bg-purple-500/20 border-cyan-500/40 hover:border-purple-400 text-cyan-200 shadow-sm active:scale-95'
                  }">
                    + ${tok}
                  </button>
                `;
              }).join('')}
            </div>

            ${this.feedback ? `
              <div class="p-3.5 rounded-xl border ${this.feedback.ok ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-rose-950/40 border-rose-500/50 text-rose-200'} text-xs sm:text-sm font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>${this.feedback.msg}</div>
                ${this.feedback.ok ? `
                  <button id="k3-next-ex-btn" class="px-4 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-extrabold text-xs flex-shrink-0">
                    Наступне речення →
                  </button>
                ` : ''}
              </div>
            ` : ''}

            <div class="flex items-center justify-between pt-2 border-t border-slate-800">
              <button id="k3-reset-ex-btn" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs">
                ↺ Скинути
              </button>
              <button id="k3-check-ex-btn" class="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-black font-mono font-extrabold text-xs shadow-lg">
                ✓ Перевірити порядок V2
              </button>
            </div>
          </div>
        </div>


        <!-- TAB KLUKKAN: CLOCK & WORK SHIFTS (ÍFA 1 KAFLI 4) -->
        <div class="${this.activeTab === 'klukkan' ? '' : 'hidden'} space-y-4">
          
          <div class="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-cyber-card to-cyber-deep border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="space-y-1.5 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                <span>⏰ СТАНДАРТ ÍFA 1 KAFLI 4</span>
                <span>HVAÐ ER KLUKKAN?</span>
              </div>
              <h3 class="text-xl font-black text-white font-mono">Парадокс ісландського часу та робочий розклад</h3>
              <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
                В ісландській мові числівники для часу завжди стоять у <strong>середньому роді</strong>: 
                <em>eitt (1), tvö (2), þrjú (3), fjögur (4)</em>. 
                Головна пастка: <strong>«Hálf fimm» — це 04:30</strong> (половина до п'яти), а не 05:30!
              </p>
            </div>
            <div class="p-3.5 rounded-xl bg-black/60 border border-slate-700 font-mono text-xs text-right space-y-1 shrink-0">
              <div class="text-amber-300 font-bold">Hálf fimm = 04:30 ⚠️</div>
              <div class="text-cyan-300 font-bold">Korter yfir... (чверть по)</div>
              <div class="text-purple-300 font-bold">Korter í... (без чверті)</div>
            </div>
          </div>

          <!-- Interactive Time Calculator Simulator -->
          <div class="p-5 rounded-2xl bg-cyber-deep/95 border border-cyber-border shadow-xl space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h4 class="text-sm font-bold text-white font-mono flex items-center gap-2">
                <span>🕰️</span><span>Інтерактивний тренажер: Назвіть точний час</span>
              </h4>
              <span class="text-xs font-mono text-amber-400">Натисніть час для озвучування</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5" id="k3-clock-grid">
              ${[
                { t: '07:00', is: 'Klukkan er sjö', uk: 'Сьома година' },
                { t: '07:15', is: 'Korter yfir sjö', uk: 'Чверть по сьомій' },
                { t: '07:30', is: 'Hálf átta', uk: 'Пів на восьму (07:30!)' },
                { t: '07:45', is: 'Korter í átta', uk: 'За чверть восьма' },
                { t: '08:00', is: 'Klukkan er átta', uk: 'Восьма година' },
                { t: '08:10', is: 'Tíu mínútur yfir átta', uk: 'Десять хвилин по восьмій' },
                { t: '08:20', is: 'Tuttugu mínútur yfir átta', uk: 'Двадцять по восьмій' },
                { t: '08:50', is: 'Tíu mínútur í níu', uk: "За десять дев'ята" },
                { t: '12:00', is: 'Hádegi (klukkan tólf)', uk: 'Полудень (12:00)' },
                { t: '16:30', is: 'Hálf fimm', uk: "Пів на п'яту (16:30!)" },
                { t: '20:15', is: 'Korter yfir átta', uk: 'Чверть по восьмій вечора' },
                { t: '00:00', is: 'Miðnætti', uk: 'Опівніч' }
              ].map(item => `
                <div onclick="window.__K3_APP__.speakText('${item.is}')" class="p-3 rounded-xl bg-black/60 border border-slate-800 hover:border-amber-400 cursor-pointer transition-all space-y-1 group">
                  <div class="flex items-center justify-between text-xs font-mono">
                    <span class="text-amber-400 font-bold">${item.t}</span>
                    <span class="text-slate-600 group-hover:text-amber-300">🔊</span>
                  </div>
                  <div class="text-xs font-bold text-white font-mono">${item.is}</div>
                  <div class="text-[11px] text-slate-400 font-sans">${item.uk}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Work Shifts Card (Vaktir á vinnustöðum) -->
          <div class="p-4 sm:p-5 rounded-2xl bg-cyber-card border border-purple-500/30 shadow-xl space-y-3">
            <h4 class="text-sm font-bold text-white font-mono flex items-center gap-2">
              <span>💼</span><span>Графіки та робочі зміни в Ісландії (Vinnuvaktir)</span>
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="p-3.5 rounded-xl bg-black/50 border border-cyan-500/30 space-y-1">
                <span class="text-xs font-mono text-cyan-400 font-bold">🌅 Morgunvakt (07:00 – 15:00)</span>
                <p class="text-xs text-slate-300 font-sans">«Ég er á morgunvakt í dag. Ég vakna klukkan sex.» (Ранкова зміна)</p>
              </div>
              <div class="p-3.5 rounded-xl bg-black/50 border border-amber-500/30 space-y-1">
                <span class="text-xs font-mono text-amber-400 font-bold">🌇 Kvöldvakt (15:00 – 23:00)</span>
                <p class="text-xs text-slate-300 font-sans">«Á morgun er ég á kvöldvakt frá þrjú til ellefu.» (Вечірня зміна + ахтаналог)</p>
              </div>
              <div class="p-3.5 rounded-xl bg-black/50 border border-purple-500/30 space-y-1">
                <span class="text-xs font-mono text-purple-400 font-bold">🌙 Næturvakt (23:00 – 07:00)</span>
                <p class="text-xs text-slate-300 font-sans">«Næturvakt gefur 33% eða 45% álag samkvæmt kjarasamningi.» (Нічна зміна)</p>
              </div>
            </div>
          </div>

        </div>

        <!-- TAB VERBS: 3RD & 4TH CONJUGATION GROUPS (SAGNIR ÍFA 1.4) -->
        <div class="${this.activeTab === 'verbs' ? '' : 'hidden'} space-y-4">
          
          <div class="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-cyber-card to-cyber-deep border border-cyan-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="space-y-1.5 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                <span>⚡ ДІЄСЛОВА 3-Ї ТА 4-Ї ГРУП</span>
                <span>LITLI MÁLFRÆÐINGURINN & ÍFA 1.4</span>
              </div>
              <h3 class="text-xl font-black text-white font-mono">Дієслова на -ur (Група 3) та Сильні дієслова (Група 4)</h3>
              <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
                На відміну від 1-ї групи (<em>tala ➔ talar</em>), у 3-й групі в однині відбувається 
                <strong>I-hljóðvarp (I-умлаут)</strong>: голосна кореня змінюється: 
                <em>a ➔ e (fara ➔ ég fer)</em>, <em>o ➔ e (koma ➔ ég kem, sofa ➔ ég sef)</em>!
              </p>
            </div>
            <div class="p-3.5 rounded-xl bg-black/60 border border-slate-700 font-mono text-xs text-right space-y-1 shrink-0">
              <div class="text-cyan-300 font-bold">fara ➔ ég fer, við förum</div>
              <div class="text-emerald-300 font-bold">koma ➔ ég kem, við komum</div>
              <div class="text-amber-300 font-bold">sofa ➔ ég sef, við sofum</div>
            </div>
          </div>

          <!-- Conjugation Matrix Tables -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Table 1: Fara (3. flokkur) -->
            <div class="p-4 rounded-xl bg-black/60 border border-cyan-500/40 space-y-2.5">
              <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span class="text-xs font-mono font-bold text-cyan-300">fara (йти, їхати) • 3. flokkur</span>
                <span class="text-[11px] font-mono text-slate-400">a ➔ e (odnyna), a ➔ ö (við)</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">ég</span><strong class="text-cyan-300">fer</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">við</span><strong class="text-cyan-300">förum</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þú</span><strong class="text-cyan-300">ferð</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þið</span><strong class="text-cyan-300">farið</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">hann/hún</span><strong class="text-cyan-300">fer</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þeir/þær</span><strong class="text-cyan-300">fara</strong>
                </div>
              </div>
              <div class="text-[11px] text-slate-400 font-sans italic pt-1 border-t border-slate-800/60">
                Приклад V2: «Á hverjum degi <strong>fer ég</strong> í sund.»
              </div>
            </div>

            <!-- Table 2: Koma (3. flokkur) -->
            <div class="p-4 rounded-xl bg-black/60 border border-emerald-500/40 space-y-2.5">
              <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span class="text-xs font-mono font-bold text-emerald-300">koma (приходити, прибувати) • 3. flokkur</span>
                <span class="text-[11px] font-mono text-slate-400">o ➔ e (odnyna)</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">ég</span><strong class="text-emerald-300">kem</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">við</span><strong class="text-emerald-300">komum</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þú</span><strong class="text-emerald-300">kemur</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þið</span><strong class="text-emerald-300">komið</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">hann/hún</span><strong class="text-emerald-300">kemur</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þeir/þær</span><strong class="text-emerald-300">koma</strong>
                </div>
              </div>
              <div class="text-[11px] text-slate-400 font-sans italic pt-1 border-t border-slate-800/60">
                Приклад V2: «Klukkan fimm <strong>kemur hann</strong> heim.»
              </div>
            </div>

            <!-- Table 3: Sofa (4. flokkur / Sterk) -->
            <div class="p-4 rounded-xl bg-black/60 border border-purple-500/40 space-y-2.5">
              <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span class="text-xs font-mono font-bold text-purple-300">sofa (спати) • 4. flokkur (сильне)</span>
                <span class="text-[11px] font-mono text-slate-400">o ➔ e (odnyna)</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">ég</span><strong class="text-purple-300">sef</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">við</span><strong class="text-purple-300">sofum</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þú</span><strong class="text-purple-300">sefur</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þið</span><strong class="text-purple-300">sofið</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">hann/hún</span><strong class="text-purple-300">sefur</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þeir/þær</span><strong class="text-purple-300">sofa</strong>
                </div>
              </div>
              <div class="text-[11px] text-slate-400 font-sans italic pt-1 border-t border-slate-800/60">
                Приклад V2: «Á nóttunni <strong>sef ég</strong> í átta tíma.»
              </div>
            </div>

            <!-- Table 4: Vinna (4. flokkur / Sterk) -->
            <div class="p-4 rounded-xl bg-black/60 border border-amber-500/40 space-y-2.5">
              <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span class="text-xs font-mono font-bold text-amber-300">vinna (працювати) • 4. flokkur</span>
                <span class="text-[11px] font-mono text-slate-400">nn зберігається, -ur у 2-3 особі</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">ég</span><strong class="text-amber-300">vinn</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">við</span><strong class="text-amber-300">vinnum</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þú</span><strong class="text-amber-300">vinnur</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þið</span><strong class="text-amber-300">vinnið</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">hann/hún</span><strong class="text-amber-300">vinnur</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þeir/þær</span><strong class="text-amber-300">vinna</strong>
                </div>
              </div>
              <div class="text-[11px] text-slate-400 font-sans italic pt-1 border-t border-slate-800/60">
                Приклад V2: «Hvar <strong>vinnur þú</strong> í dag?»
              </div>
            </div>

          </div>

        </div>

        <!-- TAB 2: 15 ANCHOR WORDS OF MODULE 3 -->
        <div class="${this.activeTab === 'vocab' ? '' : 'hidden'} space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            ${words.map(w => `
              <div data-play-key="${w.is}" class="k3-audio-btn p-3 rounded-xl bg-cyber-deep/90 border border-slate-800 hover:border-cyan-400 cursor-pointer transition-all group flex flex-col justify-between gap-2">
                <div class="flex items-center justify-between text-[10px] font-mono">
                  <span class="px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">${w.pos}</span>
                  <span class="text-cyan-400 group-hover:scale-110 transition-transform">🔊 Слухати</span>
                </div>
                <div>
                  <div class="text-base font-black text-white font-mono group-hover:text-cyan-300">${w.is}</div>
                  <div class="text-xs font-mono text-cyan-400">${w.ipa}</div>
                  <div class="text-xs text-amber-200 font-sans mt-0.5">🇺🇦 ${w.uk}</div>
                </div>
                <div class="text-[10px] text-slate-400 font-sans border-t border-slate-800/80 pt-1">
                  ${w.note}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- TAB 3: INTERACTIVE ROUTINE DIALOGUE -->
        <div class="${this.activeTab === 'dialogue' ? '' : 'hidden'} space-y-3">
          <div class="p-3.5 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <h3 class="text-sm font-black text-white font-mono">💬 Робочий день у Рейк'явіку (Guðrún & Gunnar)</h3>
              <p class="text-xs text-slate-400 font-sans">Натискайте на будь-яку репліку, щоб почути живу вимову та розбір інверсії V2</p>
            </div>
          </div>

          <div class="space-y-2 max-w-3xl mx-auto">
            ${this.routineDialogue.map(line => `
              <div data-play-key="${line.is}" class="k3-audio-btn p-3.5 rounded-xl bg-cyber-deep/90 border border-slate-800 hover:border-emerald-400 cursor-pointer transition-all group">
                <div class="flex items-start gap-3">
                  <div class="w-9 h-9 rounded-xl bg-black/70 border border-slate-700 flex items-center justify-center text-base flex-shrink-0">
                    ${line.avatar}
                  </div>
                  <div class="flex-grow space-y-1">
                    <div class="flex items-center justify-between text-xs font-mono">
                      <strong class="text-white">${line.speaker}</strong>
                      <span class="text-cyan-400 group-hover:text-emerald-300">🔊 Озвучити репліку</span>
                    </div>
                    <div class="text-sm sm:text-base font-bold text-white font-mono">${line.is}</div>
                    <div class="text-xs font-mono text-cyan-400">${line.ipa}</div>
                    <div class="text-xs text-amber-200 font-sans">🇺🇦 ${line.uk}</div>
                    <div class="text-[11px] text-slate-400 font-sans border-t border-slate-800/80 pt-1">💡 ${line.note}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('.k3-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.dataset.k3Tab;
        this.render();
      });
    });

    this.container.querySelectorAll('.k3-audio-btn').forEach(el => {
      el.addEventListener('click', () => {
        const key = el.dataset.playKey;
        if (key) audioEngine.playWord(key, el);
      });
    });

    this.container.querySelectorAll('.k3-bank-token').forEach(btn => {
      btn.addEventListener('click', () => {
        const tok = btn.dataset.bankTok;
        if (!this.assembledTokens.includes(tok)) {
          this.assembledTokens.push(tok);
          this.feedback = null;
          this.render();
        }
      });
    });

    this.container.querySelectorAll('.k3-remove-token').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.removeIdx, 10);
        this.assembledTokens.splice(idx, 1);
        this.feedback = null;
        this.render();
      });
    });

    const resetBtn = this.container.querySelector('#k3-reset-ex-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.assembledTokens = [];
        this.feedback = null;
        this.render();
      });
    }

    const checkBtn = this.container.querySelector('#k3-check-ex-btn');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        const ex = this.v2Exercises[this.currentExerciseIdx];
        const isCorrect =
          this.assembledTokens.length === ex.targetTokens.length &&
          this.assembledTokens.every((t, i) => t === ex.targetTokens[i]);

        if (isCorrect) {
          this.feedback = { ok: true, msg: `✅ ${ex.explanation}` };
          audioEngine.playWord(ex.audioKey);
          if (gameState && typeof gameState.addXP === 'function') {
            gameState.addXP(15);
          }
        } else {
          this.feedback = {
            ok: false,
            msg: '❌ Перевірте порядок слів! Пам\'ятайте: на 1-му місці час, на 2-му місці — ДІЄСЛОВО (V2), і одразу на 3-му місці — підмет «ég».'
          };
        }
        this.render();
      });
    }

    const nextBtn = this.container.querySelector('#k3-next-ex-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentExerciseIdx = (this.currentExerciseIdx + 1) % this.v2Exercises.length;
        this.assembledTokens = [];
        this.feedback = null;
        this.render();
      });
    }
  }

  speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'is-IS';
    utt.rate = 0.9;
    window.speechSynthesis.speak(utt);
  }

}
