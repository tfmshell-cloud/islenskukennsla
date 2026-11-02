/**
 * DropsFlexionLab.js - Drops Visual & Kinesthetic Engine
 * 1. Station 2: Kaffi Reykjavík (Interactive Graphic Cafe Simulator)
 *    - Virtual Showcase: 6 animated inline SVG food & drink items with neon glows
 *    - Accusative Reactor: Order Tray ("Bakkinn") with flyout suffix morphing (-a ➔ -u, a ➔ ö)
 *    - Barista NPC Simulator: Sveinn the Barista with speech bubble, choices & POS card tap
 *    - Progression: +100 XP, unlock next milestone, celebratory confetti canvas
 * 2. Visual Flexion Flying Suffix Lab (Úkraína ➔ Úkraínu, Ísland ➔ Íslandi)
 * 3. Tactile Drag / Tap Sentence Puzzle Constructor with BÍN Auras
 * 4. Runic Glyphs of Power (Áss, Reið, Þurs, Sól)
 */

import { gameState } from './GameState.js';
import { audioEngine } from './AudioEngine.js?v=5.6';

export class DropsFlexionLab {
  constructor(container) {
    this.container = container;
    this.activeLabTab = 'cafe'; // 'cafe', 'flexions', 'constructor'

    // Station 2: Cafe Items Dataset
    this.cafeItems = {
      samloka: {
        id: 'samloka',
        name: 'Samloka',
        ipa: '[ˈsamˌlɔːka]',
        gender: 'kvk.',
        genderName: 'Жіночий рід',
        nf: 'samloka',
        tf: 'samloku',
        uk: 'сендвіч з шинкою та сиром',
        price: 1450,
        articleNf: 'ein',
        articleTf: 'eina',
        stem: 'samlok',
        nomEnding: '-a',
        accEnding: '-u',
        hasUmlaut: false,
        auraColor: '#00E676',
        explanation: 'Жіночий рід на -a: флексія -a відлітає, а на її місце стає смарагдове -u знахідного відмінка (Þolfall 🟢)!'
      },
      ponnukaka: {
        id: 'ponnukaka',
        name: 'Pönnukaka',
        ipa: '[ˈpʰœnːʏˌkʰaːka]',
        gender: 'kvk.',
        genderName: 'Жіночий рід',
        nf: 'pönnukaka',
        tf: 'pönnuköku',
        uk: 'ісландський тонкий млинець',
        price: 850,
        articleNf: 'ein',
        articleTf: 'eina',
        stem: 'pönnuk',
        nomEnding: '-a',
        accEnding: '-u',
        hasUmlaut: true,
        umlautRoot: 'kak',
        umlautMorph: 'kök',
        auraColor: '#00E676',
        explanation: 'УВАГА: U-hljóðvarp (U-мутація)! Коренева "a" перед закінченням "-u" спалахує і перетворюється на "ö": kaka ➔ köku!'
      },
      snudur: {
        id: 'snudur',
        name: 'Snúður',
        ipa: '[ˈstnuːðʏr]',
        gender: 'kk.',
        genderName: 'Чоловічий рід',
        nf: 'snúður',
        tf: 'snúð',
        uk: 'булочка з корицею та глазур\'ю',
        price: 750,
        articleNf: 'einn',
        articleTf: 'einn',
        stem: 'snúð',
        nomEnding: '-ur',
        accEnding: '-∅',
        hasUmlaut: false,
        auraColor: '#00E676',
        explanation: 'Чоловічий рід на -ur: закінчення -ur відкидається в знахідному відмінку, залишається чиста основа: einn snúð!'
      },
      kaffi: {
        id: 'kaffi',
        name: 'Kaffi',
        ipa: '[ˈkʰafːɪ]',
        gender: 'hk.',
        genderName: 'Середній рід',
        nf: 'kaffi',
        tf: 'kaffi',
        uk: 'гаряча чорна кава',
        price: 650,
        articleNf: 'eitt',
        articleTf: 'eitt',
        stem: 'kaffi',
        nomEnding: '-∅',
        accEnding: '-∅',
        hasUmlaut: false,
        auraColor: '#00E676',
        explanation: 'Середній рід: форми називного і знахідного відмінків ідентичні: eitt kaffi ➔ eitt kaffi (без змін)!'
      },
      vatn: {
        id: 'vatn',
        name: 'Vatn',
        ipa: '[vahtn̥]',
        gender: 'hk.',
        genderName: 'Середній рід',
        nf: 'vatn',
        tf: 'vatn',
        uk: 'льодовикова вода (безкоштовно)',
        price: 0,
        articleNf: 'eitt',
        articleTf: 'eitt',
        stem: 'vatn',
        nomEnding: '-∅',
        accEnding: '-∅',
        hasUmlaut: false,
        auraColor: '#00E676',
        explanation: 'Ісландська вода з-під крана найчистіша у світі. У середньому роді відмінювання стабільне: vatn ➔ vatn!'
      },
      bjor: {
        id: 'bjor',
        name: 'Bjór',
        ipa: '[pjouːr]',
        gender: 'kk.',
        genderName: 'Чоловічий рід',
        nf: 'bjór',
        tf: 'bjór',
        uk: 'ісландське крафтове пиво',
        price: 1500,
        articleNf: 'einn',
        articleTf: 'einn',
        stem: 'bjór',
        nomEnding: '-∅',
        accEnding: '-∅',
        hasUmlaut: false,
        auraColor: '#00E676',
        explanation: 'Основа bjór закінчується на кореневе -r (це не флексія -ur), тому в знахідному відмінку слово не змінюється: einn bjór!'
      }
    };

    // Active selected item in the Showcase / Tray
    this.activeCafeItemId = 'samloka';
    this.isTrayMorphed = false;
    this.baristaDialogueStep = 0; // 0: greeting, 1: answered, 2: paid
    this.totalBill = 4200;

    // Original flexion words
    this.activeFlexionWordKey = 'ukraina';
    this.flexionWords = {
      ukraina: {
        stem: 'Úkraín',
        nomEnding: '-a',
        datEnding: '-u',
        prep: 'frá',
        caseName: 'Þágufall (ÞGF 🟡)',
        auraColor: '#FFD600',
        explanation: 'Жіночий рід: закінчення -a відлітає, а на його місце прилітає золоте закінчення давального відмінка -u!'
      },
      island: {
        stem: 'Ísland',
        nomEnding: '-∅',
        datEnding: '-i',
        prep: 'frá',
        caseName: 'Þágufall (ÞGF 🟡)',
        auraColor: '#FFD600',
        explanation: 'Середній рід на приголосний: нульове закінчення відлітає, і додається давальне закінчення -i!'
      },
      bandarikin: {
        stem: 'Bandaríki',
        nomEnding: '-n',
        datEnding: '-nunum',
        prep: 'frá',
        caseName: 'Þágufall (ÞGF 🟡)',
        auraColor: '#FFD600',
        explanation: 'Множина з означеним артиклем: закінчення -n відлітає, натомість прикріплюється потужне -nunum!'
      },
      laeknir: {
        stem: 'Lækn',
        nomEnding: '-ir',
        datEnding: '-i',
        prep: 'hjá (у/біля)',
        caseName: 'Þágufall (ÞGF 🟡)',
        auraColor: '#FFD600',
        explanation: 'Чоловічий рід: називний закінчується на -ir, а в давальному відмінку залишається чисте закінчення -i.'
      }
    };

    // Constructor task state
    this.constructorTask = {
      targetSentence: 'Ég ætla að fá eina samloku og eitt kaffi',
      targetUk: 'Я візьму один сендвіч і одну каву',
      tokens: ['kaffi', 'eina', 'Ég', 'og', 'ætla', 'samloku', 'að', 'fá', 'eitt'],
      assembled: []
    };
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Confetti Canvas Layer -->
        <canvas id="cafe-confetti-canvas" class="fixed inset-0 pointer-events-none z-50 w-full h-full hidden"></canvas>

        <!-- Master Section Header & Sub-Navigation -->
        <div class="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-cyber-deep to-[#120722] border border-purple-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
          <div class="space-y-0.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Движок Drops • Графічний симулятор
              </span>
              <span class="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/30">
                Урок 2: У кав'ярні (Знахідний відмінок 🟢)
              </span>
            </div>
            <h2 class="text-base sm:text-xl font-black text-white font-mono flex items-center gap-2">
              <span>☕ Урок 2: У кав'ярні — Знахідний відмінок (Þolfall 🟢)</span>
            </h2>
          </div>

          <!-- Section Switcher Tabs -->
          <div class="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-slate-800 text-xs font-mono self-start sm:self-auto">
            <button data-lab-tab="cafe" class="lab-tab-btn px-3 py-1 rounded-lg font-bold transition-all ${this.activeLabTab === 'cafe' ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              ☕ Кав'ярня (Showcase & Barista)
            </button>
            <button data-lab-tab="flexions" class="lab-tab-btn px-3 py-1 rounded-lg font-bold transition-all ${this.activeLabTab === 'flexions' ? 'bg-cyan-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              ⚡ Флексії (ÞGF 🟡)
            </button>
            <button data-lab-tab="constructor" class="lab-tab-btn px-3 py-1 rounded-lg font-bold transition-all ${this.activeLabTab === 'constructor' ? 'bg-cyan-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              🧩 Конструктор речень
            </button>
          </div>
        </div>

        <!-- ================= 1. CAFE SIMULATOR TAB ================= -->
        <div id="lab-tab-view-cafe" class="lab-tab-view ${this.activeLabTab === 'cafe' ? '' : 'hidden'} space-y-4">
          
          <!-- 1.1 SVG VIRTUAL SHOWCASE (The Interactive Food & Drink Menu) -->
          <div class="p-4 sm:p-5 rounded-2xl bg-cyber-deep/95 border border-emerald-500/30 shadow-2xl space-y-3.5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
              <div>
                <span class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>✨ 1. Віртуальна SVG-вітрина страв & напоїв</span>
                </span>
                <p class="text-xs text-slate-300 font-sans mt-0.5">
                  Натискайте на страви: спостерігайте за живими SVG-анімаціями, слухайте кристальний передзвін та переміщуйте на піднос замовлення!
                </p>
              </div>
              <span class="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/30 self-start sm:self-auto">
                🔵 Називний (NF) ➔ 🟢 Знахідний (ÞF)
              </span>
            </div>

            <!-- The 6 Animated SVG Menu Items Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              ${Object.values(this.cafeItems).map(item => this.renderShowcaseCard(item)).join('')}
            </div>
          </div>

          <!-- 1.2 VISUAL MORPHING ACCUSATIVE REACTOR (The Order Tray "Bakkinn") -->
          <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#0e0716] via-[#090510] to-[#06040A] border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(0,230,118,0.15)] space-y-4 relative overflow-hidden">
            <!-- Neon Tray Background Lines -->
            <div class="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none"></div>

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
              <div>
                <span class="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡ 2. Реактор знахідного відмінка (Піднос замовлення • Bakkinn)</span>
                </span>
                <h3 class="text-sm sm:text-base font-bold text-white font-sans mt-0.5">
                  Динамічна трансформація закінчень під час замовлення: «Ég ætla að fá...»
                </h3>
              </div>

              <div class="flex items-center gap-2">
                <button id="cafe-trigger-morph-btn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-black font-extrabold text-xs uppercase tracking-wider font-mono shadow-lg shadow-emerald-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1.5">
                  <span>🚀 Замовити страву (Morph ÞF 🟢)</span>
                </button>
                <button id="cafe-reset-morph-btn" class="px-3 py-2 rounded-xl bg-black/60 hover:bg-black text-slate-400 hover:text-white text-xs font-mono border border-slate-800 transition-colors">
                  Скинути
                </button>
              </div>
            </div>

            <!-- The Interactive Tray Viewport -->
            <div id="cafe-tray-viewport" class="min-h-44 p-4 rounded-xl bg-black/90 border border-emerald-500/30 relative flex flex-col items-center justify-center text-center overflow-hidden">
              <!-- Rendered dynamically by renderTrayStage() -->
            </div>

            <!-- Linguistic Rule & Articulatory Hook for the selected item -->
            <div id="cafe-tray-explanation" class="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs font-sans text-slate-300 leading-relaxed flex items-start gap-2.5">
              <!-- Rendered dynamically -->
            </div>
          </div>

          <!-- 1.3 INTERACTIVE BARISTA NPC SIMULATOR (Sveinn the Barista) -->
          <div class="p-4 sm:p-5 rounded-2xl bg-cyber-deep/95 border border-cyan-500/40 shadow-2xl space-y-4">
            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <span class="text-base sm:text-lg">🧑‍🍳</span>
                <div>
                  <span class="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    3. Живий діалог з баристою (Sveinn á Kaffihúsinu)
                  </span>
                  <h4 class="text-sm font-bold text-white font-sans">
                    Оберіть ввічливу фразу для замовлення та оплатіть рахунок
                  </h4>
                </div>
              </div>
              <span class="text-xs font-mono text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30 font-bold">
                +100 XP за замовлення
              </span>
            </div>

            <!-- Barista Counter & Speech Arena -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              <!-- Left: Sveinn Avatar & Badge -->
              <div class="md:col-span-4 flex flex-col items-center text-center p-3.5 rounded-xl bg-black/70 border border-cyan-500/30 space-y-2">
                ${this.renderBaristaAvatar()}
                <div>
                  <div class="text-sm font-black text-white font-mono">Sveinn (Бариста)</div>
                  <div class="text-[10px] text-cyan-400 font-mono">Kaffihús Vesturbæjar • Reykjavík</div>
                </div>
                <div class="text-[11px] text-slate-400 font-sans italic">
                  «Góðan daginn! Hvað má bjóða þér?»
                </div>
              </div>

              <!-- Right: Dialogue Speech Bubble & Cashier POS Terminal -->
              <div class="md:col-span-8 space-y-3">
                <!-- Speech Bubble from Sveinn -->
                <div id="barista-speech-bubble" class="p-3.5 sm:p-4 rounded-xl bg-cyan-950/30 border border-cyan-400/50 relative shadow-lg">
                  <div class="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Sveinn segir:</span>
                    <span id="dialogue-step-badge" class="text-amber-400">Крок 1 з 3</span>
                  </div>
                  <div id="barista-speech-text" class="text-sm sm:text-base font-bold text-white font-mono leading-snug">
                    «Góðan daginn! Hvað má bjóða þér?»
                  </div>
                  <div id="barista-speech-trans" class="text-xs text-amber-200/90 font-sans mt-1">
                    🇺🇦 «Доброго дня! Що вам запропонувати?»
                  </div>
                </div>

                <!-- Customer Response Chips -->
                <div id="customer-response-chips" class="space-y-2">
                  <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Оберіть вашу репліку:
                  </span>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                    <button data-response-idx="0" class="barista-response-btn p-2.5 rounded-xl bg-black/60 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-400 text-left transition-all group">
                      <div class="font-bold text-white group-hover:text-cyan-300">☕ Ég ætla að fá einn kaffi</div>
                      <div class="text-[10px] text-slate-400">Я візьму одну каву</div>
                    </button>
                    <button data-response-idx="1" class="barista-response-btn p-2.5 rounded-xl bg-black/60 hover:bg-emerald-500/20 border border-slate-800 hover:border-emerald-400 text-left transition-all group">
                      <div class="font-bold text-white group-hover:text-emerald-300">🥪 Má ég fá eina samloku?</div>
                      <div class="text-[10px] text-slate-400">Можна мені сендвіч?</div>
                    </button>
                    <button data-response-idx="2" class="barista-response-btn p-2.5 rounded-xl bg-black/60 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-400 text-left transition-all group">
                      <div class="font-bold text-white group-hover:text-amber-300">💳 Hvað kostar þetta?</div>
                      <div class="text-[10px] text-slate-400">Скільки це коштує?</div>
                    </button>
                  </div>
                </div>

                <!-- 1.4 CASHIER CHECKOUT STEP (Contactless Card Tap POS) -->
                <div id="pos-terminal-checkout" class="hidden p-3.5 rounded-xl bg-black/80 border border-emerald-500/40 space-y-3">
                  <div class="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
                    <div class="flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <strong class="text-white">POS Термінал Kaffi Reykjavík</strong>
                    </div>
                    <span class="text-emerald-400 font-bold">4.200 ISK</span>
                  </div>

                  <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <!-- Virtual NFC Payment Card -->
                    <div id="aurora-pay-card" class="w-56 h-28 p-3 rounded-xl bg-gradient-to-tr from-cyan-600 via-emerald-600 to-indigo-900 border border-cyan-400 shadow-xl text-white flex flex-col justify-between cursor-pointer select-none transition-transform hover:scale-105 active:scale-95">
                      <div class="flex items-center justify-between text-[10px] font-mono font-bold">
                        <span>AURORA PAY</span>
                        <span>📶 NFC TAP</span>
                      </div>
                      <div class="text-xs font-mono tracking-widest text-cyan-200">
                        •••• •••• •••• 1944
                      </div>
                      <div class="flex items-center justify-between text-[9px] font-mono text-slate-200">
                        <span>VIKING EXPLORER</span>
                        <span>08/29</span>
                      </div>
                    </div>

                    <!-- Terminal Tap Area & Action -->
                    <div class="space-y-1.5 text-center sm:text-right">
                      <button id="tap-card-btn" class="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold text-xs uppercase tracking-wider font-mono shadow-lg shadow-emerald-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                        <span>📶 Торкнутися карткою (4.200 kr)</span>
                      </button>
                      <div id="pos-status-text" class="text-[11px] font-mono text-slate-400">
                        Піднесіть картку для безконтактної оплати
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Final Celebration Banner -->
                <div id="cafe-celebration-banner" class="hidden p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 border-2 border-emerald-400 text-center space-y-2">
                  <div class="text-2xl">🎉 🥳 ☕</div>
                  <div class="text-base font-black text-white font-mono">
                    Gjörðu svo vel! Замовлення успішно отримано та оплачено!
                  </div>
                  <p class="text-xs text-emerald-200 font-sans max-w-lg mx-auto">
                    Ви успішно застосували знахідний відмінок (Þolfall 🟢), поспілкувалися з баристою Свейном та здобули <strong>+100 XP</strong> і розблокували наступний вузол на мапі Саги!
                  </p>
                  <div class="pt-1 flex items-center justify-center gap-2">
                    <button id="replay-cafe-btn" class="px-3.5 py-1.5 rounded-lg bg-black/60 hover:bg-black text-slate-300 text-xs font-mono border border-slate-700">
                      Спробувати інше замовлення
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- ================= 2. FLYING FLEXIONS TAB ================= -->
        <div id="lab-tab-view-flexions" class="lab-tab-view ${this.activeLabTab === 'flexions' ? '' : 'hidden'} space-y-4">
          <div class="p-4 sm:p-5 rounded-2xl bg-cyber-deep/95 border border-purple-500/40 shadow-xl space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span class="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                  ⚡ Базовий аніматор зміни морфем (Flying Suffix Engine)
                </span>
                <h3 class="text-sm sm:text-base font-bold text-white font-sans mt-0.5">
                  Оберіть країну чи слово та спостерігайте за відлітанням флексії
                </h3>
              </div>

              <!-- Word Root Picker Pills -->
              <div class="flex items-center gap-1.5 flex-wrap text-xs font-mono">
                <button data-word-key="ukraina" class="flexion-word-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.activeFlexionWordKey === 'ukraina' ? 'bg-amber-400 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
                  Úkraína ➔ Úkraínu
                </button>
                <button data-word-key="island" class="flexion-word-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.activeFlexionWordKey === 'island' ? 'bg-amber-400 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
                  Ísland ➔ Íslandi
                </button>
                <button data-word-key="bandarikin" class="flexion-word-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.activeFlexionWordKey === 'bandarikin' ? 'bg-amber-400 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
                  Bandaríkin ➔ -unum
                </button>
                <button data-word-key="laeknir" class="flexion-word-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.activeFlexionWordKey === 'laeknir' ? 'bg-amber-400 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
                  Læknir ➔ Lækni
                </button>
              </div>
            </div>

            <!-- The Flexion Animation Stage (Interactive Viewport) -->
            <div id="flexion-stage" class="min-h-36 sm:min-h-40 p-4 rounded-xl bg-black/80 border border-slate-800/90 relative flex flex-col items-center justify-center text-center overflow-hidden">
              <!-- Rendered by renderFlexionStage() -->
            </div>

            <!-- Flexion Action Controls -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <div id="flexion-explanation" class="text-xs text-slate-300 font-sans">
                <!-- Explanation updated dynamically -->
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                <button id="trigger-morph-btn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-extrabold text-xs uppercase tracking-wider font-mono shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                  <span>🚀 Запустити політ флексії (Morph)</span>
                </button>
                <button id="reset-morph-btn" class="px-3 py-2.5 rounded-xl bg-black/60 hover:bg-black text-slate-400 hover:text-white text-xs font-mono border border-slate-800 transition-colors">
                  Скинути
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= 3. CONSTRUCTOR TAB ================= -->
        <div id="lab-tab-view-constructor" class="lab-tab-view ${this.activeLabTab === 'constructor' ? '' : 'hidden'} space-y-4">
          <div class="p-4 sm:p-5 rounded-2xl bg-cyber-deep/95 border border-cyan-500/40 shadow-xl space-y-3.5">
            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <span class="text-lg">🧩</span>
                <div>
                  <span class="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    Drops Конструктор речень (Правило V2)
                  </span>
                  <h4 class="text-sm font-bold text-white font-sans">
                    Зберіть замовлення за значенням: <strong class="text-cyan-200">«${this.constructorTask.targetUk}»</strong>
                  </h4>
                </div>
              </div>
              <span class="text-xs font-mono text-amber-300 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                +25 XP за правильний порядок
              </span>
            </div>

            <!-- Assembled Drop Zone Slots -->
            <div id="constructor-dropzone" class="min-h-14 p-2.5 rounded-xl bg-black/70 border-2 border-dashed border-cyan-500/40 flex items-center gap-2 flex-wrap transition-all">
              <!-- Assembled pills appear here -->
            </div>

            <!-- Available Magnetic Word Pills -->
            <div class="space-y-1.5 pt-1">
              <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Натискайте слова у правильному граматичному порядку:
              </span>
              <div id="constructor-tokens" class="flex items-center gap-2 flex-wrap">
                <!-- Tokens populated dynamically -->
              </div>
            </div>

            <!-- Feedback & Clear Bar -->
            <div id="constructor-feedback" class="hidden p-2.5 rounded-lg border text-xs font-mono font-bold flex items-center justify-between">
              <span id="constructor-feedback-text"></span>
              <button id="constructor-reset-btn" class="px-2 py-0.5 rounded bg-black/50 text-slate-400 hover:text-white text-[10px]">
                Спробувати знову
              </button>
            </div>
          </div>

          <!-- 4. Visual Runic Glyphs & Mnemonic Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div class="p-3 rounded-xl bg-black/60 border border-slate-800 hover:border-cyan-400 transition-all text-center space-y-1">
              <div class="text-2xl text-cyan-400 font-mono">ᚨ</div>
              <div class="text-xs font-bold text-white font-mono">Áss (Бог ефіру)</div>
              <div class="text-[10px] text-slate-400 font-sans">Символ чистого звуку та абетки Stafrófið</div>
            </div>
            <div class="p-3 rounded-xl bg-black/60 border border-slate-800 hover:border-amber-400 transition-all text-center space-y-1">
              <div class="text-2xl text-amber-400 font-mono">ᚱ</div>
              <div class="text-xs font-bold text-white font-mono">Reið (Колісниця)</div>
              <div class="text-[10px] text-slate-400 font-sans">Символ руху відмінків та динаміки флексій</div>
            </div>
            <div class="p-3 rounded-xl bg-black/60 border border-slate-800 hover:border-emerald-400 transition-all text-center space-y-1">
              <div class="text-2xl text-emerald-400 font-mono">ᚦ</div>
              <div class="text-xs font-bold text-white font-mono">Þurs (Велетень)</div>
              <div class="text-[10px] text-slate-400 font-sans">Міжзубний звук Þorn [θ] давніх скальдів</div>
            </div>
            <div class="p-3 rounded-xl bg-black/60 border border-slate-800 hover:border-rose-400 transition-all text-center space-y-1">
              <div class="text-2xl text-rose-400 font-mono">ᛋ</div>
              <div class="text-xs font-bold text-white font-mono">Sól (Сонце)</div>
              <div class="text-[10px] text-slate-400 font-sans">Світло перемоги та завершення випробування</div>
            </div>
          </div>
        </div>

      </div>
    `;

    // Render Sub-Views
    this.renderTrayStage(this.isTrayMorphed);
    this.renderFlexionStage(false);
    this.renderConstructor();
    this.bindEvents();
  }

  /**
   * Render individual Showcase Food Card with animated inline SVG
   */
  renderShowcaseCard(item) {
    const isSelected = item.id === this.activeCafeItemId;
    return `
      <div data-showcase-id="${item.id}" 
           class="showcase-card p-3 rounded-xl bg-black/70 border ${isSelected ? 'border-emerald-400 shadow-[0_0_16px_rgba(0,230,118,0.35)] scale-102' : 'border-slate-800 hover:border-emerald-500/50'} cursor-pointer transition-all duration-200 flex flex-col items-center text-center space-y-1.5 group select-none relative">
        
        <!-- SVG Vector Art -->
        <div class="relative w-16 h-16 flex items-center justify-center transform group-hover:scale-110 transition-transform">
          ${this.getItemSVG(item.id)}
        </div>

        <div class="w-full">
          <div class="flex items-center justify-between text-[9px] font-mono w-full px-1">
            <span class="text-slate-400 font-bold">${item.gender}</span>
            <span class="text-amber-300 font-bold">${item.price > 0 ? `${item.price} kr` : 'Ókeypis'}</span>
          </div>
          <div class="text-xs font-black text-white font-mono group-hover:text-emerald-300 transition-colors">
            ${item.name}
          </div>
          <div class="text-[9px] font-mono text-cyan-400 font-semibold">
            ${item.ipa}
          </div>
        </div>

        <div class="text-[10px] font-sans text-slate-400 leading-tight border-t border-slate-800/80 pt-1 w-full">
          ${item.uk.split('(')[0]}
        </div>

        <!-- BÍN Case Transformation Pill -->
        <div class="w-full mt-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 font-bold flex items-center justify-center gap-1">
          <span>🔵 ${item.nf}</span> ➔ <span>🟢 ${item.tf}</span>
        </div>
      </div>
    `;
  }

  /**
   * Get Crisp Inline SVG Graphics for each menu item
   */
  getItemSVG(id) {
    switch (id) {
      case 'kaffi':
        return `
          <svg viewBox="0 0 100 100" class="w-16 h-16 drop-shadow-[0_0_12px_rgba(255,184,0,0.4)]">
            <ellipse cx="50" cy="85" rx="36" ry="7" fill="#1A1028" stroke="#FFB800" stroke-width="2"/>
            <ellipse cx="50" cy="85" rx="28" ry="4" fill="#0E0716"/>
            <path d="M 26 38 L 32 78 Q 33 82 50 82 Q 67 82 68 78 L 74 38 Z" fill="#2E180A" stroke="#FFB800" stroke-width="2"/>
            <path d="M 72 44 C 86 44 86 68 70 70" fill="none" stroke="#FFB800" stroke-width="3.5" stroke-linecap="round"/>
            <ellipse cx="50" cy="40" rx="22" ry="6" fill="#45220C" stroke="#794622" stroke-width="1.5"/>
            <path d="M 44 40 Q 50 38 56 40" stroke="#E6A15C" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <path d="M 40 32 Q 38 22 43 14" fill="none" stroke="#00E5FF" stroke-width="2" stroke-linecap="round" class="animate-steam-1 opacity-70"/>
            <path d="M 50 30 Q 54 20 49 10" fill="none" stroke="#00E676" stroke-width="2.5" stroke-linecap="round" class="animate-steam-2 opacity-80"/>
            <path d="M 60 32 Q 63 24 58 15" fill="none" stroke="#FFD600" stroke-width="2" stroke-linecap="round" class="animate-steam-3 opacity-70"/>
          </svg>
        `;
      case 'snudur':
        return `
          <svg viewBox="0 0 100 100" class="w-16 h-16 drop-shadow-[0_0_12px_rgba(255,138,0,0.4)]">
            <circle cx="50" cy="52" r="38" fill="#5C2C16" stroke="#FF8A00" stroke-width="2"/>
            <circle cx="50" cy="50" r="36" fill="#B35D22"/>
            <path d="M 50 18 C 68 18 82 32 82 50 C 82 68 68 82 50 82 C 32 82 18 68 18 50 C 18 36 30 26 44 26 C 60 26 72 36 72 50 C 72 62 62 70 50 70 C 38 70 30 62 30 50 C 30 42 38 36 48 36 C 56 36 60 42 60 50 C 60 54 56 58 50 58 C 46 58 44 54 44 50" 
                  fill="none" stroke="#451804" stroke-width="5" stroke-linecap="round"/>
            <path d="M 32 46 Q 36 34 50 32 Q 64 34 68 46 Q 66 58 50 62 Q 38 60 32 46 Z" fill="#FFF5E6" opacity="0.88"/>
            <circle cx="45" cy="42" r="2.5" fill="#FFFFFF"/>
            <circle cx="58" cy="48" r="2" fill="#FFFFFF"/>
            <circle cx="40" cy="52" r="1.8" fill="#FFFFFF"/>
            <circle cx="52" cy="56" r="2.2" fill="#FFFFFF"/>
            <circle cx="62" cy="38" r="1.5" fill="#FFD600"/>
          </svg>
        `;
      case 'samloka':
        return `
          <svg viewBox="0 0 100 100" class="w-16 h-16 drop-shadow-[0_0_12px_rgba(0,230,118,0.4)]">
            <polygon points="15,75 85,75 50,20" fill="#78350F" stroke="#F59E0B" stroke-width="2"/>
            <polygon points="20,72 80,72 50,26" fill="#D97706"/>
            <path d="M 16 66 Q 25 58 36 66 Q 48 58 60 66 Q 72 58 84 66" fill="none" stroke="#10B981" stroke-width="5" stroke-linecap="round"/>
            <polygon points="22,62 78,62 50,27" fill="#F43F5E"/>
            <polygon points="24,56 76,56 50,28" fill="#FBBF24"/>
            <path d="M 68 56 Q 72 65 74 68" stroke="#FBBF24" stroke-width="4" stroke-linecap="round" fill="none"/>
            <polygon points="26,50 74,50 50,26" fill="#FDE68A" stroke="#B45309" stroke-width="2"/>
            <circle cx="45" cy="36" r="1.2" fill="#78350F"/>
            <circle cx="54" cy="40" r="1.2" fill="#78350F"/>
            <circle cx="42" cy="44" r="1.2" fill="#78350F"/>
          </svg>
        `;
      case 'ponnukaka':
        return `
          <svg viewBox="0 0 100 100" class="w-16 h-16 drop-shadow-[0_0_12px_rgba(255,214,0,0.4)]">
            <ellipse cx="50" cy="78" rx="42" ry="14" fill="#0E0716" stroke="#00E5FF" stroke-width="1.5"/>
            <path d="M 18 70 C 25 50 45 35 72 32 C 82 45 84 65 74 74 C 55 82 30 80 18 70 Z" fill="#EAB308" stroke="#B45309" stroke-width="2"/>
            <path d="M 28 66 C 36 54 50 44 70 42" stroke="#CA8A04" stroke-width="3" fill="none"/>
            <path d="M 38 72 C 45 62 58 54 74 54" stroke="#B45309" stroke-width="2.5" fill="none"/>
            <ellipse cx="58" cy="48" rx="6" ry="3.5" fill="#4C1D95" opacity="0.9"/>
            <circle cx="36" cy="58" r="1.2" fill="#FFFFFF"/>
            <circle cx="48" cy="50" r="1.5" fill="#FFFFFF"/>
            <circle cx="62" cy="60" r="1.2" fill="#FFFFFF"/>
            <circle cx="44" cy="68" r="1.4" fill="#FFFFFF"/>
            <circle cx="56" cy="68" r="1.5" fill="#FFFFFF"/>
          </svg>
        `;
      case 'vatn':
        return `
          <svg viewBox="0 0 100 100" class="w-16 h-16 drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">
            <ellipse cx="50" cy="22" rx="22" ry="5" fill="#0E0716" stroke="#00E5FF" stroke-width="2"/>
            <path d="M 28 22 L 35 82 Q 36 88 50 88 Q 64 88 65 82 L 72 22 Z" fill="rgba(0,229,255,0.12)" stroke="#00E5FF" stroke-width="2"/>
            <ellipse cx="50" cy="38" rx="19" ry="4.5" fill="rgba(0,229,255,0.4)" stroke="#38BDF8" stroke-width="1.5"/>
            <path d="M 31 38 L 35 82 Q 36 87 50 87 Q 64 87 65 82 L 69 38 Z" fill="#0284C7" opacity="0.7"/>
            <circle cx="44" cy="74" r="2" fill="#E0F2FE" class="animate-bubble-1"/>
            <circle cx="54" cy="65" r="2.5" fill="#BAE6FD" class="animate-bubble-2"/>
            <circle cx="48" cy="52" r="1.8" fill="#E0F2FE" class="animate-bubble-3"/>
            <path d="M 34 28 L 38 78" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linecap="round"/>
          </svg>
        `;
      case 'bjor':
        return `
          <svg viewBox="0 0 100 100" class="w-16 h-16 drop-shadow-[0_0_12px_rgba(255,184,0,0.4)]">
            <ellipse cx="50" cy="88" rx="20" ry="4" fill="#0E0716" stroke="#FFB800" stroke-width="2"/>
            <path d="M 30 30 L 36 86 Q 37 88 50 88 Q 63 88 64 86 L 70 30 Z" fill="#78350F" stroke="#FFB800" stroke-width="2"/>
            <path d="M 68 40 C 84 40 84 72 65 74" fill="none" stroke="#FFB800" stroke-width="4" stroke-linecap="round"/>
            <path d="M 31 40 L 36 86 Q 37 87 50 87 Q 63 87 64 86 L 69 40 Z" fill="#F59E0B" opacity="0.85"/>
            <circle cx="45" cy="75" r="1.5" fill="#FEF3C7" class="animate-bubble-1"/>
            <circle cx="54" cy="62" r="2" fill="#FEF3C7" class="animate-bubble-2"/>
            <circle cx="42" cy="50" r="1.5" fill="#FEF3C7" class="animate-bubble-3"/>
            <path d="M 28 32 C 26 26 34 22 40 25 C 46 18 58 18 64 24 C 70 20 76 26 72 32 C 74 38 68 42 64 38 C 58 40 54 36 50 38 C 44 36 38 40 32 36 C 28 38 26 34 28 32 Z" 
                  fill="#FFFFFF" stroke="#FEF3C7" stroke-width="1.5"/>
            <path d="M 33 34 Q 32 44 34 46" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          </svg>
        `;
      default:
        return `<span class="text-3xl">☕</span>`;
    }
  }

  /**
   * Render stylish Sveinn Barista SVG Avatar
   */
  renderBaristaAvatar() {
    return `
      <svg viewBox="0 0 100 100" class="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_16px_rgba(0,229,255,0.4)]">
        <ellipse cx="50" cy="26" rx="24" ry="12" fill="#1E1B4B" stroke="#00E5FF" stroke-width="1.5"/>
        <path d="M 26 26 Q 50 14 74 26" stroke="#6366F1" stroke-width="3" fill="none"/>
        <path d="M 32 30 Q 30 52 50 56 Q 70 52 68 30 Z" fill="#FCD34D"/>
        <circle cx="42" cy="36" r="2.5" fill="#0F172A"/>
        <circle cx="58" cy="36" r="2.5" fill="#0F172A"/>
        <path d="M 44 45 Q 50 50 56 45" stroke="#78350F" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path d="M 34 40 Q 32 58 50 62 Q 68 58 66 40 Q 58 50 50 50 Q 42 50 34 40 Z" fill="#D97706" opacity="0.85"/>
        <path d="M 26 26 C 20 34 22 46 28 48" stroke="#00E5FF" stroke-width="2.5" fill="none"/>
        <circle cx="28" cy="48" r="4.5" fill="#06040A" stroke="#00E5FF" stroke-width="2"/>
        <path d="M 28 48 Q 36 55 42 52" stroke="#00E5FF" stroke-width="2" fill="none"/>
        <circle cx="42" cy="52" r="2" fill="#00E676" class="animate-ping"/>
        <path d="M 26 62 L 74 62 L 80 95 L 20 95 Z" fill="#0F172A" stroke="#334155" stroke-width="2"/>
        <path d="M 36 62 L 42 95 M 64 62 L 58 95" stroke="#00E5FF" stroke-width="1.5" stroke-dasharray="2,2"/>
        <circle cx="50" cy="76" r="7" fill="#1E293B" stroke="#FFB800" stroke-width="1.5"/>
        <text x="50" y="80" text-anchor="middle" font-size="8" fill="#FFB800">☕</text>
      </svg>
    `;
  }

  /**
   * Render the Accusative Order Tray ("Bakkinn")
   */
  renderTrayStage(isMorphed = false) {
    const stage = this.container.querySelector('#cafe-tray-viewport');
    const explBox = this.container.querySelector('#cafe-tray-explanation');
    if (!stage) return;

    const item = this.cafeItems[this.activeCafeItemId];

    if (!isMorphed) {
      // BASE NOMINATIVE STATE (NF 🔵)
      stage.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center justify-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Базова форма підмета (Nefnifall 🔵)
            </span>
          </div>

          <!-- Tray Display Card -->
          <div class="flex items-center justify-center gap-3 flex-wrap">
            <div class="w-14 h-14 flex items-center justify-center">
              ${this.getItemSVG(item.id)}
            </div>

            <div class="text-2xl sm:text-4xl font-mono font-black tracking-wide flex items-center">
              <span class="text-slate-400 text-lg mr-2 font-sans">${item.articleNf}</span>
              ${item.hasUmlaut ? `
                <span class="text-white">${item.stem.slice(0, -item.umlautRoot.length)}</span>
                <span class="text-cyan-300 font-bold">${item.umlautRoot}</span>
              ` : `
                <span class="text-white">${item.stem}</span>
              `}
              <span class="text-cyan-400 font-extrabold px-1 rounded bg-cyan-500/10 border border-cyan-500/30 ml-0.5">
                ${item.nomEnding}
              </span>
            </div>
          </div>

          <div class="text-xs font-mono text-slate-400">
            «Þetta er <span class="text-cyan-300 font-bold">${item.articleNf} ${item.nf}</span>» (Це є ${item.uk})
          </div>
        </div>
      `;
    } else {
      // MORPHED ACCUSATIVE STATE (ÞF 🟢 WOW Animation)
      stage.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center justify-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-[0_0_12px_rgba(0,230,118,0.3)]">
              Знахідний відмінок прямого додатку (Þolfall 🟢)
            </span>
          </div>

          <div class="flex items-center justify-center gap-3 flex-wrap">
            <div class="w-14 h-14 flex items-center justify-center">
              ${this.getItemSVG(item.id)}
            </div>

            <div class="text-2xl sm:text-4xl font-mono font-black tracking-wide flex items-center relative">
              <span class="text-emerald-400 text-lg mr-2 font-sans font-bold">${item.articleTf}</span>
              
              ${item.hasUmlaut ? `
                <span class="text-white">${item.stem.slice(0, -item.umlautRoot.length)}</span>
                <!-- U-mutation visual spark -->
                <span class="animate-u-spark font-bold px-1">${item.umlautMorph}</span>
              ` : `
                <span class="text-white">${item.stem}</span>
              `}

              <!-- Detaching Red Suffix -->
              <span class="animate-suffix-flyout text-rose-500 font-bold opacity-60 text-lg ml-0.5">
                ${item.nomEnding}
              </span>

              <!-- Snapping Emerald Accusative Suffix -->
              <span class="animate-snap-emerald text-emerald-300 font-black px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-400 shadow-[0_0_14px_rgba(0,230,118,0.6)] ml-1">
                ${item.accEnding}
              </span>
            </div>
          </div>

          <div class="text-xs sm:text-sm font-mono text-emerald-300 font-bold animate-pulse">
            «Ég ætla að fá <span class="underline decoration-emerald-400 font-extrabold">${item.articleTf} ${item.tf}</span>, takk!» 
            <span class="text-slate-400 font-sans font-normal text-xs">(Я візьму ${item.uk}, будь ласка!)</span>
          </div>
        </div>
      `;
    }

    if (explBox) {
      explBox.innerHTML = `
        <span class="text-base sm:text-lg mt-0.5">💡</span>
        <div class="space-y-0.5">
          <div class="font-mono text-emerald-300 font-bold text-[11px] uppercase tracking-wider">
            ${item.genderName} (${item.gender}) • Правило перетворення:
          </div>
          <div>${item.explanation}</div>
        </div>
      `;
    }
  }

  /**
   * Trigger Confetti Canvas Animation
   */
  triggerConfetti() {
    const canvas = this.container.querySelector('#cafe-confetti-canvas');
    if (!canvas) return;

    canvas.classList.remove('hidden');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#00E5FF', '#00E676', '#FFD600', '#FF0055', '#B026FF', '#FFFFFF'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 50,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        velX: (Math.random() - 0.5) * 6,
        velY: Math.random() * 5 + 3,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8
      });
    }

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.velX;
        p.y += p.velY;
        p.rot += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      });

      if (frame < 180) {
        requestAnimationFrame(animate);
      } else {
        canvas.classList.add('hidden');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    requestAnimationFrame(animate);
  }

  /**
   * Render the original Flexion Stage (for other words)
   */
  renderFlexionStage(isMorphed = false) {
    const stage = this.container.querySelector('#flexion-stage');
    const explBox = this.container.querySelector('#flexion-explanation');
    const w = this.flexionWords[this.activeFlexionWordKey];
    if (!stage || !w) return;

    if (!isMorphed) {
      stage.innerHTML = `
        <div class="space-y-2">
          <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Початкова словникова форма (Nefnifall 🔵)
          </span>
          <div class="text-3xl sm:text-5xl font-mono font-black text-white tracking-wider flex items-center justify-center">
            <span>${w.stem}</span>
            <span id="morph-nom-ending" class="text-cyan-400 font-extrabold px-1 rounded bg-cyan-500/10 border border-cyan-500/30 ml-0.5">
              ${w.nomEnding}
            </span>
          </div>
          <div class="text-xs text-slate-400 font-mono">
            Керування: <span class="text-white font-bold">${w.prep}</span> + <span class="text-amber-400 font-bold">${w.caseName}</span>
          </div>
        </div>
      `;
    } else {
      stage.innerHTML = `
        <div class="space-y-2">
          <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
            Трансформована відмінкова форма (${w.caseName})
          </span>
          <div class="text-3xl sm:text-5xl font-mono font-black tracking-wider flex items-center justify-center relative">
            <span class="text-slate-400 mr-2 text-2xl sm:text-3xl font-sans">${w.prep}</span>
            <span class="text-white">${w.stem}</span>
            
            <span class="animate-suffix-flyout text-rose-500 font-bold opacity-60 text-xl ml-0.5">
              ${w.nomEnding}
            </span>

            <span class="animate-suffix-flyin text-amber-300 font-black px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400 shadow-[0_0_16px_rgba(255,214,0,0.5)] ml-1">
              ${w.datEnding}
            </span>
          </div>
          <div class="text-xs text-amber-300 font-mono font-bold animate-pulse">
            ✨ Флексія успішно закріпилася!
          </div>
        </div>
      `;
    }

    if (explBox) {
      explBox.innerHTML = `
        <div class="p-2 rounded-lg bg-black/60 border border-slate-800 text-xs">
          💡 <strong class="text-amber-300">Граматичне правило:</strong> ${w.explanation}
        </div>
      `;
    }
  }

  /**
   * Render the Sentence Puzzle Constructor
   */
  renderConstructor() {
    const dropzone = this.container.querySelector('#constructor-dropzone');
    const tokensBox = this.container.querySelector('#constructor-tokens');
    const feedbackBox = this.container.querySelector('#constructor-feedback');
    const feedbackText = this.container.querySelector('#constructor-feedback-text');
    if (!dropzone || !tokensBox) return;

    if (this.constructorTask.assembled.length === 0) {
      dropzone.innerHTML = `
        <div class="w-full text-center text-xs font-mono text-slate-500 py-3">
          Клацайте на слова нижче, щоб сформувати замовлення...
        </div>
      `;
    } else {
      dropzone.innerHTML = this.constructorTask.assembled.map((tok, idx) => `
        <div data-drop-idx="${idx}" class="assembled-word-pill px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-mono font-extrabold text-xs cursor-pointer shadow-md transform hover:scale-105 active:scale-95 flex items-center gap-1 group">
          <span>${tok}</span>
          <span class="text-[9px] opacity-60 group-hover:opacity-100">✕</span>
        </div>
      `).join('');
    }

    const availableTokens = this.constructorTask.tokens.filter(t => {
      const usedCount = this.constructorTask.assembled.filter(x => x === t).length;
      const totalCount = this.constructorTask.tokens.filter(x => x === t).length;
      return usedCount < totalCount;
    });

    tokensBox.innerHTML = availableTokens.map(tok => `
      <button data-token="${tok}" class="constructor-token-btn px-3 py-1.5 rounded-lg bg-cyber-deep hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-400 text-white font-mono text-xs font-bold transition-all transform hover:scale-105 active:scale-95 shadow-sm">
        ${tok}
      </button>
    `).join('');

    if (this.constructorTask.assembled.length === this.constructorTask.tokens.length) {
      const sentence = this.constructorTask.assembled.join(' ');
      const isCorrect = sentence === this.constructorTask.targetSentence;

      if (isCorrect) {
        gameState.addXP(25);
        this.triggerConfetti();
        if (feedbackBox && feedbackText) {
          feedbackBox.className = 'p-3 rounded-xl border border-emerald-500/60 bg-emerald-950/40 text-xs font-mono font-bold flex items-center justify-between text-emerald-300';
          feedbackText.innerHTML = `<span>🎉 Rétt! (Бездоганно! +25 XP)</span> <span class="text-slate-300 font-sans font-normal text-xs">«${sentence}»</span>`;
          feedbackBox.classList.remove('hidden');
        }
      } else {
        if (feedbackBox && feedbackText) {
          feedbackBox.className = 'p-3 rounded-xl border border-rose-500/60 bg-rose-950/40 text-xs font-mono font-bold flex items-center justify-between text-rose-300';
          feedbackText.innerHTML = `<span>❌ Порядок слів не зовсім вірний</span> <span class="text-slate-400 font-sans font-normal text-xs">Правило V2: дієслово «ætla» на 2-му місці!</span>`;
          feedbackBox.classList.remove('hidden');
        }
      }
    } else {
      if (feedbackBox) feedbackBox.classList.add('hidden');
    }
  }

  /**
   * Event Handlers Binding
   */
  bindEvents() {
    // 1. Master Tab Switcher (Cafe vs Flexions vs Constructor)
    this.container.querySelectorAll('.lab-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeLabTab = btn.dataset.labTab;
        this.container.querySelectorAll('.lab-tab-btn').forEach(b => {
          const isTarget = b.dataset.labTab === this.activeLabTab;
          b.className = `lab-tab-btn px-3 py-1 rounded-lg font-bold transition-all ${
            isTarget 
              ? (this.activeLabTab === 'cafe' ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-black shadow-md' : 'bg-cyan-500 text-black shadow-md')
              : 'text-slate-400 hover:text-white'
          }`;
        });

        this.container.querySelectorAll('.lab-tab-view').forEach(v => v.classList.add('hidden'));
        const targetView = this.container.querySelector(`#lab-tab-view-${this.activeLabTab}`);
        if (targetView) targetView.classList.remove('hidden');
      });
    });

    // 2. Showcase Card Click (Bell chime + selection)
    this.container.querySelectorAll('.showcase-card').forEach(card => {
      card.addEventListener('click', () => {
        const itemId = card.dataset.showcaseId;
        this.activeCafeItemId = itemId;
        this.isTrayMorphed = false;

        gameState.playBellChime();

        // Highlight selected card
        this.container.querySelectorAll('.showcase-card').forEach(c => {
          const isTarget = c.dataset.showcaseId === itemId;
          c.className = `showcase-card p-3 rounded-xl bg-black/70 border ${
            isTarget ? 'border-emerald-400 shadow-[0_0_16px_rgba(0,230,118,0.35)] scale-102' : 'border-slate-800 hover:border-emerald-500/50'
          } cursor-pointer transition-all duration-200 flex flex-col items-center text-center space-y-1.5 group select-none relative`;
        });

        this.renderTrayStage(false);
      });
    });

    // 3. Cafe Tray Accusative Morph Trigger
    const trayMorphBtn = this.container.querySelector('#cafe-trigger-morph-btn');
    if (trayMorphBtn) {
      trayMorphBtn.addEventListener('click', () => {
        this.isTrayMorphed = true;
        gameState.playFlexionFlySound();
        this.renderTrayStage(true);
      });
    }

    const trayResetBtn = this.container.querySelector('#cafe-reset-morph-btn');
    if (trayResetBtn) {
      trayResetBtn.addEventListener('click', () => {
        this.isTrayMorphed = false;
        this.renderTrayStage(false);
      });
    }

    // 4. Barista Response Chips
    this.container.querySelectorAll('.barista-response-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const respIdx = parseInt(btn.dataset.responseIdx, 10);
        this.baristaDialogueStep = 1;

        gameState.playVictoryChime();

        const speechText = this.container.querySelector('#barista-speech-text');
        const speechTrans = this.container.querySelector('#barista-speech-trans');
        const stepBadge = this.container.querySelector('#dialogue-step-badge');
        const posSection = this.container.querySelector('#pos-terminal-checkout');

        if (stepBadge) stepBadge.innerText = 'Крок 2 з 3: Оплата';

        if (respIdx === 0) {
          if (speechText) speechText.innerText = '«Gjörðu svo vel! Einn kaffi. Það gerir 4.200 krónur samtals.»';
          if (speechTrans) speechTrans.innerText = '🇺🇦 «Будь ласка! Одна кава. Разом це 4.200 крон. Оплата карткою?»';
        } else if (respIdx === 1) {
          if (speechText) speechText.innerText = '«Já, sjálfsagt! Eina samloku. Það gerir 4.200 krónur.»';
          if (speechTrans) speechTrans.innerText = '🇺🇦 «Так, звісно! Один сендвіч. З вас 4.200 крон.»';
        } else {
          if (speechText) speechText.innerText = '«Þetta gerir 4.200 krónur. Viltu borga með korti?»';
          if (speechTrans) speechTrans.innerText = '🇺🇦 «Це коштує 4.200 крон. Бажаєте оплатити карткою?»';
        }

        if (posSection) posSection.classList.remove('hidden');
      });
    });

    // 5. Contactless NFC Card Tap Button
    const tapCardBtn = this.container.querySelector('#tap-card-btn');
    const auroraCard = this.container.querySelector('#aurora-pay-card');
    const posStatus = this.container.querySelector('#pos-status-text');
    const celebrationBanner = this.container.querySelector('#cafe-celebration-banner');

    const handleCardPayment = () => {
      gameState.playCardTapBeep();

      if (auroraCard) {
        auroraCard.classList.add('animate-card-tap');
      }

      if (posStatus) {
        posStatus.className = 'text-[11px] font-mono text-emerald-400 font-bold animate-pulse';
        posStatus.innerText = '✓ BEEP! Samþykkt (Схвалено) — 4.200 ISK';
      }

      setTimeout(() => {
        gameState.addXP(100);
        gameState.unlockNode('thingvellir');
        this.triggerConfetti();

        if (celebrationBanner) celebrationBanner.classList.remove('hidden');
      }, 500);
    };

    if (tapCardBtn) tapCardBtn.addEventListener('click', handleCardPayment);
    if (auroraCard) auroraCard.addEventListener('click', handleCardPayment);

    // Replay Cafe Button
    const replayCafeBtn = this.container.querySelector('#replay-cafe-btn');
    if (replayCafeBtn) {
      replayCafeBtn.addEventListener('click', () => {
        this.baristaDialogueStep = 0;
        this.isTrayMorphed = false;
        this.render();
      });
    }

    // 6. Flexion Word Roots Switcher
    this.container.querySelectorAll('.flexion-word-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeFlexionWordKey = btn.dataset.wordKey;
        this.container.querySelectorAll('.flexion-word-btn').forEach(b => {
          const isTarget = b.dataset.wordKey === this.activeFlexionWordKey;
          b.className = `flexion-word-btn px-2.5 py-1 rounded-lg font-bold transition-all ${
            isTarget ? 'bg-amber-400 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'
          }`;
        });
        this.renderFlexionStage(false);
      });
    });

    // Flexion Morph Triggers
    const triggerBtn = this.container.querySelector('#trigger-morph-btn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        gameState.playFlexionFlySound();
        this.renderFlexionStage(true);
      });
    }

    const resetBtn = this.container.querySelector('#reset-morph-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.renderFlexionStage(false);
      });
    }

    // 7. Constructor Tokens
    const tokensBox = this.container.querySelector('#constructor-tokens');
    if (tokensBox) {
      tokensBox.addEventListener('click', (e) => {
        const btn = e.target.closest('.constructor-token-btn');
        if (!btn || btn.disabled) return;
        const token = btn.dataset.token;
        this.constructorTask.assembled.push(token);
        audioEngine.play(token);
        this.renderConstructor();
      });
    }

    // Constructor Word Remove
    const dropzone = this.container.querySelector('#constructor-dropzone');
    if (dropzone) {
      dropzone.addEventListener('click', (e) => {
        const pill = e.target.closest('.assembled-word-pill');
        if (!pill) return;
        const idx = parseInt(pill.dataset.dropIdx, 10);
        this.constructorTask.assembled.splice(idx, 1);
        this.renderConstructor();
      });
    }

    // Constructor Reset
    const resetConstBtn = this.container.querySelector('#constructor-reset-btn');
    if (resetConstBtn) {
      resetConstBtn.addEventListener('click', () => {
        this.constructorTask.assembled = [];
        this.renderConstructor();
      });
    }
  }
}
