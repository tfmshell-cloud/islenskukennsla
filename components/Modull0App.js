/**
 * Modull0App.js - Master Orchestrator for Íslenskukennsla Platform
 * 100% Ukrainian UI Chrome & Compact Single-Row A1 Navigation
 * 
 * Lessons (Рівень A1): [Урок 0: Абетка] | [Урок 1: Хто ти?] | [Урок 2: Кав'ярня 🟢] | [Урок 3: Рутина] | [🗺️ Мапа Саги]
 * Plus: Single Header with "● Local AI: localhost:1235" & "🤖 ШІ-Тьютор"
 */

import { M0_PHONETICS_DATA } from '../data/m0_phonetics.js?v=6.0';
import { AlphabetSoundboard } from './AlphabetSoundboard.js?v=6.0';
import { RaddstafirHub } from './RaddstafirHub.js?v=6.0';
import { BaraTalaAcoustics } from './BaraTalaAcoustics.js?v=6.0';
import { MinimalPairDuel } from './MinimalPairDuel.js?v=6.0';
import { IpaSoundBuilder } from './IpaSoundBuilder.js?v=6.0';
import { SpeechEtiquette } from './SpeechEtiquette.js?v=6.0';
import { InteractiveDrillEngine } from './InteractiveDrillEngine.js?v=6.0';
import { DailyWordEngine } from './DailyWordEngine.js?v=6.0';
import { DailyFocusArena } from './DailyFocusArena.js?v=6.0';
import { LocalAITutorPanel } from './LocalAITutorPanel.js?v=6.0';
import { Kafli1App } from './Kafli1App.js?v=6.0';
import { SagaRoadmap } from './SagaRoadmap.js?v=6.0';
import { DropsFlexionLab } from './DropsFlexionLab.js?v=6.0';
import { gameState } from './GameState.js?v=6.0';
import { binAuraSystem } from './BinAuraSystem.js?v=6.0';
import { audioEngine } from './AudioEngine.js?v=6.0';

export class Modull0App {
  constructor(rootElement) {
    this.root = rootElement;
    this.dataM0 = M0_PHONETICS_DATA;
    this.activeChapter = 'modull_0'; // default: 'modull_0', 'kafli_1', 'drops_lab', 'modull_3', 'saga_map', 'ai_tutor', 'level_a2', 'level_b1', 'level_b2'
    this.activeM0SubTab = 'soundboard'; // 'soundboard', 'acoustics', 'dialogue', 'drills'
    this.components = {};
    this.isAiOnline = false;
    this.focusArena = new DailyFocusArena(() => this.updateDagsamningurBadge());
  }

  init() {
    this.renderLayout();
    this.mountComponents();
    this.bindGlobalEvents();
    this.updateDagsamningurBadge();
    this.setupVisualPillNotification();
    this.setupGameStateSubscription();
    this.checkAiStatus();
    gameState.applyTheme();
    binAuraSystem.applyAuraStateToDOM();
  }

  async checkAiStatus() {
    try {
      const res = await fetch('http://localhost:1235/v1/models', { signal: AbortSignal.timeout(1500) });
      this.isAiOnline = res.ok;
    } catch (e) {
      this.isAiOnline = false;
    }
    const statusPill = this.root.querySelector('#header-ai-status');
    if (statusPill) {
      if (this.isAiOnline) {
        statusPill.className = 'flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 font-mono text-[11px] font-bold shadow-sm';
        statusPill.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><span>● Local AI: Онлайн (1235)</span>`;
      } else {
        statusPill.className = 'flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 border border-slate-700 text-slate-400 font-mono text-[11px]';
        statusPill.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-slate-500"></span><span>Local AI: Офлайн (1235)</span>`;
      }
    }
  }

  renderLayout() {
    const s = gameState.state;

    this.root.innerHTML = `
      <div id="app-root" class="min-h-screen text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
        <!-- Ambient Cyber Glows -->
        <div class="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div class="fixed bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

        <!-- ================= TOP HEADER (Consolidated) ================= -->
        <!-- ================= UNIFIED 3-TIER STICKY HEADER ================= -->
        <header id="app-sticky-header" class="sticky top-0 z-50 shadow-md backdrop-blur-md transition-all">
          
          <!-- ================= BLOCK 1 (TOP): BRAND DASHBOARD & USER HUD ================= -->
          <div id="block1-brand-dashboard" class="border-b border-slate-800/80 bg-cyber-void/95">
            <div class="max-w-7xl mx-auto px-3 sm:px-6 h-11 flex items-center justify-between gap-2.5">
              
              <!-- Left: Brand Logo, Title & Dagsamningur Beacon -->
              <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <a href="index.html" class="flex items-center gap-2 group flex-shrink-0">
                  <span class="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 via-emerald-400 to-amber-400 flex items-center justify-center text-sm font-black text-black shadow-md group-hover:scale-105 transition-transform">
                    🇮🇸
                  </span>
                  <span class="header-logo-title text-xs sm:text-sm font-black font-mono tracking-tight text-white">ÍSLENSKA</span>
                  <span class="platform-badge text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">A1</span>
                </a>

                <!-- Dagsamningur Red/Green Beacon Mount -->
                <div id="header-dagsamningur-mount" class="flex items-center flex-shrink-0"></div>
              </div>

              <!-- Right: AI Indicator, Player HUD, Theme Switcher & AI Tutor -->
              <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                
                <!-- AI Status Pill -->
                <div id="header-ai-status" class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 border border-slate-700 text-slate-400 font-mono text-[10px] font-bold" title="Статус ШІ">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="hidden md:inline">ШІ-Тьютор</span>
                </div>

                <!-- HUD: XP, Streak, Gems -->
                <div id="hud-container" class="flex items-center gap-1.5 bg-black/70 px-2 py-0.5 rounded-lg border border-slate-800 text-[11px] font-mono shadow-sm">
                  <span class="text-cyan-400 font-bold" title="Досвід (XP)">⚡ <span id="hud-xp-val">${s.xp}</span></span>
                  <span class="text-amber-400 font-bold hidden sm:inline" title="Серія днів">🔥 <span id="hud-streak-val">${s.streak}</span></span>
                  <span class="text-emerald-400 font-bold hidden sm:inline" title="Кристали">💎 <span id="hud-gems-val">${s.gems}</span></span>
                </div>

                <!-- Light/Dark Theme Switcher -->
                <button id="theme-toggle-btn" class="px-2 py-0.5 rounded-lg border border-slate-800 font-mono text-[10px] font-bold flex items-center bg-black/50 hover:bg-black transition-all" title="Тема оформлення">
                  <span id="theme-toggle-icon">${s.theme === 'light' ? '☀️' : '🌙'}</span>
                </button>

                <!-- In-Context Quick AI Tutor Modal Trigger Button -->
                <button id="header-open-ai-btn" class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-[11px] font-mono shadow-sm flex items-center gap-1 transition-all transform hover:scale-105 active:scale-95 cursor-pointer" title="Відкрити ШІ-Тьютора Árnastofnun">
                  <span>🤖</span><span>ШІ-Коуч</span>
                </button>
              </div>
            </div>
          </div>

          <!-- ================= BLOCK 2 (MIDDLE): LESSONS SELECTOR + BÍN CASES & X-RAY ================= -->
          <div id="block2-lessons-bar" class="border-b border-slate-800/80 bg-cyber-deep/95">
            <div class="max-w-7xl mx-auto px-3 sm:px-6 h-10 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
              
              <!-- Left: Lessons 0, 1, 2, 3 + Saga Map -->
              <div class="flex items-center gap-1 font-mono text-xs py-0.5 flex-nowrap flex-shrink-0">
                <button data-chapter="modull_0" class="chapter-nav-btn nav-btn ${this.activeChapter === 'modull_0' ? 'active' : ''}">
                  🔤 Урок 0: Абетка
                </button>
                <button data-chapter="kafli_1" class="chapter-nav-btn nav-btn ${this.activeChapter === 'kafli_1' ? 'active' : ''}">
                  🌟 Урок 1: Хто ти?
                </button>
                <button data-chapter="drops_lab" class="chapter-nav-btn nav-btn ${this.activeChapter === 'drops_lab' ? 'active' : ''}">
                  ☕ Урок 2: Кав'ярня 🟢
                </button>
                <button data-chapter="modull_3" class="chapter-nav-btn nav-btn ${this.activeChapter === 'modull_3' ? 'active' : ''}">
                  ⏰ Урок 3: Рутина
                </button>
                <button data-chapter="saga_map" class="chapter-nav-btn nav-btn nav-btn-saga ${this.activeChapter === 'saga_map' ? 'active' : ''}">
                  🗺️ Мапа Саги
                </button>
              </div>

              <!-- Right: BÍN 4 Cases & X-Ray Switcher (Neat & Compact) -->
              <div class="flex items-center gap-1.5 flex-shrink-0 text-[10px] font-mono">
                <!-- BÍN X-Ray Switcher -->
                <button class="bin-xray-toggle-btn px-2 py-0.5 rounded-lg border font-mono text-[10px] font-bold flex items-center gap-1 transition-all ${s.binAuraActive ? 'active' : ''}" title="BÍN 4 відмінки">
                  ${s.binAuraActive 
                    ? `<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span><span>BÍN Рентген</span>`
                    : `<span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span><span>BÍN Рентген</span>`
                  }
                </button>

                <!-- BÍN 4 Cases inline legend -->
                <div class="flex items-center gap-0.5 bg-black/60 px-1.5 py-0.5 rounded border border-slate-800" title="BÍN 4 відмінки">
                  <span class="px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[9px] font-bold" title="Nefnifall (Називний)">NF</span>
                  <span class="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold" title="Þolfall (Знахідний)">ÞF</span>
                  <span class="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-bold" title="Þágufall (Давальний)">ÞGF</span>
                  <span class="px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[9px] font-bold" title="Eignarfall (Родовий)">EF</span>
                </div>
              </div>

            </div>
          </div>

          <!-- ================= BLOCK 3 (BOTTOM PINNED): ALL 7 M0 SUB-TABS (SINGLE ROW, NO SCROLL) ================= -->
          <div id="block3-subnav-ribbon" class="px-2 sm:px-6 py-1 bg-black/90 border-b border-cyan-500/20 ${this.activeChapter === 'modull_0' ? '' : 'hidden'}">
            <div class="max-w-7xl mx-auto">
              <div id="m0-subnav-bar" class="grid grid-cols-7 gap-1 sm:gap-1.5 text-center font-mono">
                <button data-m0-sub="soundboard" class="m0-sub-btn sub-tab-btn truncate px-1 py-1 text-[11px] sm:text-xs font-bold ${this.activeM0SubTab === 'soundboard' ? 'active' : ''}">
                  1. Матриця (32)
                </button>
                <button data-m0-sub="raddstafir" class="m0-sub-btn sub-tab-btn truncate px-1 py-1 text-[11px] sm:text-xs font-bold ${this.activeM0SubTab === 'raddstafir' ? 'active' : ''}">
                  2. Голосні
                </button>
                <button data-m0-sub="traps" class="m0-sub-btn sub-tab-btn truncate px-1 py-1 text-[11px] sm:text-xs font-bold ${this.activeM0SubTab === 'traps' ? 'active' : ''}">
                  3. Пастки (5)
                </button>
                <button data-m0-sub="duel" class="m0-sub-btn sub-tab-btn truncate px-1 py-1 text-[11px] sm:text-xs font-bold ${this.activeM0SubTab === 'duel' ? 'active' : ''}">
                  4. Дуель
                </button>
                <button data-m0-sub="builder" class="m0-sub-btn sub-tab-btn truncate px-1 py-1 text-[11px] sm:text-xs font-bold ${this.activeM0SubTab === 'builder' ? 'active' : ''}">
                  5. Конструктор
                </button>
                <button data-m0-sub="dialogue" class="m0-sub-btn sub-tab-btn truncate px-1 py-1 text-[11px] sm:text-xs font-bold ${this.activeM0SubTab === 'dialogue' ? 'active' : ''}">
                  6. Симулятор
                </button>
                <button data-m0-sub="drills" class="m0-sub-btn sub-tab-btn truncate px-1 py-1 text-[11px] sm:text-xs font-bold ${this.activeM0SubTab === 'drills' ? 'active' : ''}">
                  7. Тренажер (20+SRS)
                </button>
              </div>
            </div>
          </div>
        </header>

        <!-- ================= MAIN WORKSPACE ================= -->
        <main class="max-w-7xl mx-auto px-3 sm:px-6 py-3 space-y-3">
          
          <!-- ================= TAB 0: УРОК 0 (АБЕТКА ТА ЗВУКИ) ================= -->
          <div id="chapter-container-modull_0" class="chapter-view ${this.activeChapter === 'modull_0' ? '' : 'hidden'} space-y-3">
            <!-- M0 Sub-Sections (7 Dedicated Containers) -->
            <div id="m0-sec-soundboard" class="m0-view ${this.activeM0SubTab === 'soundboard' ? '' : 'hidden'}"></div>
            <div id="m0-sec-raddstafir" class="m0-view ${this.activeM0SubTab === 'raddstafir' ? '' : 'hidden'}"></div>
            <div id="m0-sec-traps" class="m0-view ${this.activeM0SubTab === 'traps' ? '' : 'hidden'}"></div>
            <div id="m0-sec-duel" class="m0-view ${this.activeM0SubTab === 'duel' ? '' : 'hidden'}"></div>
            <div id="m0-sec-builder" class="m0-view ${this.activeM0SubTab === 'builder' ? '' : 'hidden'}"></div>
            <div id="m0-sec-dialogue" class="m0-view ${this.activeM0SubTab === 'dialogue' ? '' : 'hidden'}"></div>
            <div id="m0-sec-drills" class="m0-view ${this.activeM0SubTab === 'drills' ? '' : 'hidden'}"></div>
          </div>

          <!-- ================= TAB 1: УРОК 1 (ХТО ТИ?) ================= -->
          <div id="chapter-container-kafli_1" class="chapter-view ${this.activeChapter === 'kafli_1' ? '' : 'hidden'}">
            <!-- Populated by Kafli1App -->
          </div>

          <!-- ================= TAB 2: УРОК 2 (У КАВ'ЯРНІ 🟢) ================= -->
          <div id="chapter-container-drops_lab" class="chapter-view ${this.activeChapter === 'drops_lab' ? '' : 'hidden'}">
            <!-- Populated by DropsFlexionLab (SVG Virtual Showcase, Reactor, Barista, Card Tap) -->
          </div>

          <!-- ================= TAB 3: УРОК 3 (РУТИНА ТА V2) ================= -->
          <div id="chapter-container-modull_3" class="chapter-view ${this.activeChapter === 'modull_3' ? '' : 'hidden'} space-y-4">
            <div class="p-4 sm:p-5 rounded-2xl bg-cyber-deep/95 border border-cyan-500/30 shadow-xl space-y-4">
              <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                <div class="space-y-0.5">
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    Рівень A1.2 • Урок 3
                  </span>
                  <h3 class="text-base sm:text-lg font-black text-white font-mono">
                    ⏰ Урок 3: Щоденна рутина та закон другого дієслова V2
                  </h3>
                </div>
                <span class="text-xs font-mono text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30 font-bold">
                  +120 XP
                </span>
              </div>

              <!-- V2 Rule Card -->
              <div class="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-2">
                <div class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  ⚡ Золоте правило ісландського синтаксису (V2-reglan):
                </div>
                <p class="text-xs text-slate-300 font-sans leading-relaxed">
                  У розповідному реченні <strong>змінюване дієслово завжди стоїть на другій синтаксичній позиції</strong>, незалежно від того, з чого починається речення (з підмета чи з обставини часу):
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div class="p-2.5 rounded-lg bg-cyber-deep border border-cyan-500/30">
                    <div class="text-slate-400 text-[10px]">Прямий порядок слів:</div>
                    <div class="text-white font-bold">Ég <span class="text-cyan-300">vakna</span> klukkan sjö.</div>
                    <div class="text-[11px] text-slate-400 font-sans mt-0.5">Я прокидаюся о сьомій годині.</div>
                  </div>
                  <div class="p-2.5 rounded-lg bg-cyber-deep border border-amber-500/30">
                    <div class="text-slate-400 text-[10px]">Інверсія (обставина часу на 1-му місці):</div>
                    <div class="text-white font-bold">Klukkan sjö <span class="text-amber-300">vakna</span> ég.</div>
                    <div class="text-[11px] text-slate-400 font-sans mt-0.5">О сьомій годині прокидаюся я (дієслово на 2-му місці!).</div>
                  </div>
                </div>
              </div>

              <!-- Daily Verbs Routine Matrix -->
              <div class="space-y-2">
                <span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Словник дій щоденної рутини:
                </span>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div class="p-2.5 rounded-xl bg-black/50 border border-slate-800 space-y-1">
                    <div class="flex items-center justify-between text-white font-bold">
                      <span>að vakna</span> <span>⏰</span>
                    </div>
                    <div class="text-[10px] text-cyan-400">[ˈvaːkna]</div>
                    <div class="text-[11px] text-slate-300 font-sans">прокидатися від сну</div>
                  </div>
                  <div class="p-2.5 rounded-xl bg-black/50 border border-slate-800 space-y-1">
                    <div class="flex items-center justify-between text-white font-bold">
                      <span>að fara á fætur</span> <span>🛏️</span>
                    </div>
                    <div class="text-[10px] text-cyan-400">[ˈfaiːra au ˈfaiːtʏr]</div>
                    <div class="text-[11px] text-slate-300 font-sans">вставати з ліжка на ноги</div>
                  </div>
                  <div class="p-2.5 rounded-xl bg-black/50 border border-slate-800 space-y-1">
                    <div class="flex items-center justify-between text-white font-bold">
                      <span>að borða morgunmat</span> <span>🥣</span>
                    </div>
                    <div class="text-[10px] text-cyan-400">[ˈpɔrða ˈmɔrkʏnˌmaiːt]</div>
                    <div class="text-[11px] text-slate-300 font-sans">снідати зранку</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ================= TAB 4: МАПА САГИ (SAGA ROADMAP) ================= -->
          <div id="chapter-container-saga_map" class="chapter-view ${this.activeChapter === 'saga_map' ? '' : 'hidden'}">
            <!-- Populated by SagaRoadmap -->
          </div>

        </main>

        <!-- Floating Quick-Access Button for AI Coach -->
        <button id="floating-ai-tutor-btn" class="fixed bottom-5 right-5 z-40 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 text-black font-mono font-black text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-cyan-300 cursor-pointer" title="Відкрити ШІ-Тьютора Árnastofnun">
          <span class="text-base">🤖</span>
          <span class="hidden sm:inline">ШІ-Коуч Árnastofnun</span>
          <span class="sm:hidden font-bold">ШІ</span>
        </button>

        <!-- ================= IN-CONTEXT FULLSCREEN / LARGE POPUP MODAL FOR AI TUTOR ================= -->
        <div id="ai-tutor-modal-overlay" class="fixed inset-0 z-[100] hidden flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md transition-all">
          <!-- Clickable backdrop to dismiss and return to exact lesson position -->
          <div id="ai-modal-backdrop-dismiss" class="absolute inset-0 cursor-pointer" title="Натисніть на фон, щоб повернутися до уроку"></div>
          
          <!-- Modal Window Container -->
          <div class="relative w-full max-w-4xl h-[92vh] sm:h-[86vh] max-h-[820px] bg-cyber-deep/98 border border-cyan-500/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 ring-1 ring-cyan-500/30">
            <div id="ai-modal-tutor-mount" class="w-full h-full flex flex-col overflow-hidden"></div>
          </div>
        </div>

      </div>
    `;
  }

  mountComponents() {
    // 1. Mount Saga Roadmap
    const sagaContainer = this.root.querySelector('#chapter-container-saga_map');
    if (sagaContainer) {
      this.components.sagaMap = new SagaRoadmap(sagaContainer, (targetChapter) => {
        this.switchChapter(targetChapter);
      });
      this.components.sagaMap.render();
    }

    // 2. Mount Módúll 0 components (All 7 Steps from NotebookLM 78-source specification)
    // Step 0.1: 32-letter academic matrix with Drops mnemonics & authentic audio
    const sbContainer = this.root.querySelector('#m0-sec-soundboard');
    if (sbContainer) {
      this.components.soundboard = new AlphabetSoundboard(
        sbContainer,
        this.dataM0.alphabet,
        this.dataM0.raddstafir_classification
      );
      this.components.soundboard.render();
    }

    // Step 0.2: Raddstafir Vowel System & Broddur acute transformation rule
    const radContainer = this.root.querySelector('#m0-sec-raddstafir');
    if (radContainer) {
      this.components.raddstafir = new RaddstafirHub(
        radContainer,
        this.dataM0.raddstafir_classification
      );
      this.components.raddstafir.render();
    }

    // Step 0.3: 4 Phonetic Traps & 4 Positional G-States
    const trapsContainer = this.root.querySelector('#m0-sec-traps');
    if (trapsContainer) {
      this.components.traps = new BaraTalaAcoustics(
        trapsContainer,
        this.dataM0.acoustic_traps
      );
      this.components.traps.render();
    }

    // Step 0.4: Bara tala Acoustic Minimal Pair Duel Arena
    const duelContainer = this.root.querySelector('#m0-sec-duel');
    if (duelContainer) {
      this.components.duel = new MinimalPairDuel(
        duelContainer,
        this.dataM0.minimal_pairs
      );
      this.components.duel.render();
    }

    // Step 0.5: IPA Sound Builder (Word assembly from phonemes)
    const builderContainer = this.root.querySelector('#m0-sec-builder');
    if (builderContainer) {
      this.components.builder = new IpaSoundBuilder(
        builderContainer,
        this.dataM0.ipa_sound_builder
      );
      this.components.builder.render();
    }

    // Step 0.6: Jón & Anna Dialogue Simulator & Gender Etiquette
    const dlgContainer = this.root.querySelector('#m0-sec-dialogue');
    if (dlgContainer) {
      this.components.dialogue = new SpeechEtiquette(
        dlgContainer,
        this.dataM0.dialogue_and_pragmatics
      );
      this.components.dialogue.render();
    }

    // Step 0.7: 20 Comprehensive Drills & 15-Word 4-Phase SRS Engine
    const drillContainer = this.root.querySelector('#m0-sec-drills');
    if (drillContainer) {
      drillContainer.innerHTML = `
        <div class="space-y-4">
          <!-- Segmented Mode Control (20 Drills vs 15-Word SRS) -->
          <div class="flex items-center justify-center gap-2 p-1 max-w-md mx-auto rounded-xl bg-black/60 border border-slate-800">
            <button id="m0-mode-drills-btn" class="flex-1 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-sm">
              🎯 20 Завдань (NotebookLM)
            </button>
            <button id="m0-mode-srs-btn" class="flex-1 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all text-slate-400 hover:text-white border border-transparent">
              🧠 Словник SRS (15 слів • 4 фази)
            </button>
          </div>

          <!-- Mount containers -->
          <div id="m0-drill-mount-20"></div>
          <div id="m0-drill-mount-srs" class="hidden"></div>
        </div>
      `;

      const mountDrills = drillContainer.querySelector('#m0-drill-mount-20');
      const mountSrs = drillContainer.querySelector('#m0-drill-mount-srs');
      const btnDrills = drillContainer.querySelector('#m0-mode-drills-btn');
      const btnSrs = drillContainer.querySelector('#m0-mode-srs-btn');

      if (mountDrills) {
        this.components.drills = new InteractiveDrillEngine(
          mountDrills,
          this.dataM0.drill_suite
        );
        this.components.drills.render();
      }

      if (mountSrs) {
        this.components.srs = new DailyWordEngine(
          mountSrs,
          this.dataM0.daily_word_engine
        );
        this.components.srs.render();
      }

      if (btnDrills && btnSrs && mountDrills && mountSrs) {
        btnDrills.addEventListener('click', () => {
          mountDrills.classList.remove('hidden');
          mountSrs.classList.add('hidden');
          btnDrills.className = 'flex-1 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-sm';
          btnSrs.className = 'flex-1 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all text-slate-400 hover:text-white border border-transparent';
        });

        btnSrs.addEventListener('click', () => {
          mountDrills.classList.add('hidden');
          mountSrs.classList.remove('hidden');
          btnSrs.className = 'flex-1 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all bg-amber-500/20 text-amber-300 border border-amber-400 shadow-sm';
          btnDrills.className = 'flex-1 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all text-slate-400 hover:text-white border border-transparent';
        });
      }
    }

    // 3. Mount Kafli 1 component
    const k1Container = this.root.querySelector('#chapter-container-kafli_1');
    if (k1Container) {
      this.components.kafli1 = new Kafli1App(k1Container);
      this.components.kafli1.render();
    }

    // 4. Mount Drops Flexion Lab (Cafe Simulator)
    const dropsContainer = this.root.querySelector('#chapter-container-drops_lab');
    if (dropsContainer) {
      this.components.dropsLab = new DropsFlexionLab(dropsContainer);
      this.components.dropsLab.render();
    }

    // 5. Mount In-Context AI Tutor Modal
    const aiMount = this.root.querySelector('#ai-modal-tutor-mount');
    if (aiMount) {
      this.components.ai_tutor = new LocalAITutorPanel(aiMount, () => this.closeAiTutorModal());
      this.components.ai_tutor.render();
      this.components.ai_tutor.setChapter(this.activeChapter === 'kafli_1' ? 'kafli_1' : 'modull_0');
    }

    // Bind BÍN aura events
    binAuraSystem.bindEvents(this.root);
  }

  updateDagsamningurBadge() {
    const mount = this.root.querySelector('#header-dagsamningur-mount');
    if (!mount || !this.focusArena) return;

    const isDone = this.focusArena.isCompletedToday();

    if (isDone) {
      mount.innerHTML = `
        <button id="header-dagsamningur-btn" class="px-2 sm:px-2.5 py-1 rounded-xl font-mono text-[10px] sm:text-[11px] font-bold bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer" title="Денний таск виконано! Натисніть для повторення">
          <span>🟢</span>
          <span>Dagsamningur ✓</span>
          <span class="hidden md:inline text-[9px] text-emerald-400 font-sans font-normal">(Виконано)</span>
        </button>
      `;
    } else {
      mount.innerHTML = `
        <button id="header-dagsamningur-btn" class="px-2 sm:px-2.5 py-1 rounded-xl font-mono text-[10px] sm:text-[11px] font-extrabold bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/70 text-rose-300 shadow-[0_0_14px_rgba(244,63,94,0.5)] flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 animate-pulse cursor-pointer" title="Денна норма 15 слів! Натисніть, щоб захистити стрік">
          <span class="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
          <span>🔴 Dagsamningur (0/15)</span>
          <span class="hidden md:inline text-[9px] text-amber-300 font-sans font-normal">• Захисти стрік!</span>
        </button>
      `;
    }

    const btn = mount.querySelector('#header-dagsamningur-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        let currentMod = 'modull_0';
        if (this.activeChapter === 'kafli_1') currentMod = 'kafli_1';
        else if (this.activeChapter === 'drops_lab') currentMod = 'drops_lab';
        else if (this.activeChapter === 'modull_3') currentMod = 'modull_3';
        this.focusArena.open(currentMod);
      });
    }
  }

  setupGameStateSubscription() {
    gameState.subscribe(state => {
      const xpEl = this.root.querySelector('#hud-xp-val');
      const streakEl = this.root.querySelector('#hud-streak-val');
      const gemsEl = this.root.querySelector('#hud-gems-val');

      if (xpEl) xpEl.innerText = state.xp;
      if (streakEl) streakEl.innerText = state.streak;
      if (gemsEl) gemsEl.innerText = state.gems;
    });
  }

  setupVisualPillNotification() {
    const toast = this.root.querySelector('#visual-pill-toast');
    const toastText = this.root.querySelector('#visual-pill-text');

    audioEngine.subscribe((event, data) => {
      if (event === 'visual_pill' && toast && toastText) {
        toastText.innerText = data.ipa ? `Артикуляція: ${data.ipa} (${data.key})` : `Виразне звучання: ${data.key}`;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 1400);
      }
    });
  }

  bindGlobalEvents() {
    // In-Context AI Tutor Modal Triggers
    const headerAiBtn = this.root.querySelector('#header-open-ai-btn');
    if (headerAiBtn) {
      headerAiBtn.addEventListener('click', () => this.openAiTutorModal());
    }

    const floatingAiBtn = this.root.querySelector('#floating-ai-tutor-btn');
    if (floatingAiBtn) {
      floatingAiBtn.addEventListener('click', () => this.openAiTutorModal());
    }

    const backdropDismiss = this.root.querySelector('#ai-modal-backdrop-dismiss');
    if (backdropDismiss) {
      backdropDismiss.addEventListener('click', () => this.closeAiTutorModal());
    }

    // Close Modal on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = this.root.querySelector('#ai-tutor-modal-overlay');
        if (modal && !modal.classList.contains('hidden')) {
          this.closeAiTutorModal();
        }
      }
    });

    // Chapter switcher buttons (including the 2-row navigation panel)
    this.root.querySelectorAll('.chapter-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const chapter = btn.dataset.chapter;
        if (chapter) this.switchChapter(chapter);
      });
    });

    // M0 Sub-tab buttons
    this.root.querySelectorAll('.m0-sub-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sub = btn.dataset.m0Sub;
        this.switchM0SubTab(sub);
      });
    });

    // Theme toggle button
    const themeBtn = this.root.querySelector('#theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const newTheme = gameState.toggleTheme();
        const icon = this.root.querySelector('#theme-toggle-icon');
        const label = this.root.querySelector('#theme-toggle-label');
        if (icon) icon.innerText = newTheme === 'light' ? '☀️' : '🌙';
        if (label) label.innerText = newTheme === 'light' ? 'Світла' : 'Темна';
      });
    }
  }

  openAiTutorModal() {
    const modal = this.root.querySelector('#ai-tutor-modal-overlay');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    if (this.components.ai_tutor) {
      this.components.ai_tutor.setChapter(this.activeChapter === 'kafli_1' ? 'kafli_1' : 'modull_0');
    }

    const input = modal.querySelector('#ai-chat-input');
    if (input) setTimeout(() => input.focus(), 60);
  }

  closeAiTutorModal() {
    const modal = this.root.querySelector('#ai-tutor-modal-overlay');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  switchChapter(chapterId) {
    this.activeChapter = chapterId;

    // Update nav button active states across both rows using classList.toggle
    this.root.querySelectorAll('.chapter-nav-btn').forEach(b => {
      const isTarget = b.dataset.chapter === chapterId;
      if (b.classList.contains('from-cyan-500')) {
        // Keep header AI button styled with gradient
        return;
      }
      b.classList.toggle('active', isTarget);
    });

    // Update hero banner titles strictly in Ukrainian
    const heroBadge = this.root.querySelector('#hero-curriculum-badge');
    const heroTitle = this.root.querySelector('#hero-curriculum-title');
    if (heroBadge && heroTitle) {
      switch (chapterId) {
        case 'modull_0':
          heroBadge.innerText = 'УРОК 0 • АБЕТКА ТА ЗВУКИ';
          heroTitle.innerText = 'Урок 0: Абетка та звуки (Stafrófið & Framburður)';
          break;
        case 'kafli_1':
          heroBadge.innerText = 'УРОК 1 • ХТО ТИ? (ЗНАЙОМСТВО)';
          heroTitle.innerText = 'Урок 1: Хто ти? (Hver ert þú? — Країни, професії, að vera)';
          break;
        case 'drops_lab':
          heroBadge.innerText = 'УРОК 2 • У КАВ\'ЯРНІ (ЗНАХІДНИЙ ВІДМІНОК 🟢)';
          heroTitle.innerText = 'Урок 2: У кав\'ярні (Í kaffihúsinu — Знахідний відмінок Þolfall 🟢)';
          break;
        case 'modull_3':
          heroBadge.innerText = 'УРОК 3 • ЩОДЕННА РУТИНА ТА V2';
          heroTitle.innerText = 'Урок 3: Щоденна рутина та V2 (Rútína & V2-reglan)';
          break;
        case 'saga_map':
          heroBadge.innerText = 'МАПА САГИ • HRINGVEGUR 1';
          heroTitle.innerText = 'Мапа Саги: Кільцева дорога Ісландії (Roadmap)';
          break;
      }
    }

    // Toggle Block 3 ribbon (only visible for Lesson 0)
    const block3Ribbon = this.root.querySelector('#block3-subnav-ribbon');
    if (block3Ribbon) {
      block3Ribbon.classList.toggle('hidden', chapterId !== 'modull_0');
    }

    // Toggle chapter containers
    this.root.querySelectorAll('.chapter-view').forEach(view => {
      view.classList.add('hidden');
    });

    const activeView = this.root.querySelector(`#chapter-container-${chapterId}`);
    if (activeView) {
      activeView.classList.remove('hidden');
    }

    // Refresh components on switch
    if (chapterId === 'saga_map' && this.components.sagaMap) {
      this.components.sagaMap.render();
    }
    if (chapterId === 'drops_lab' && this.components.dropsLab) {
      this.components.dropsLab.render();
    }

    // Update AI Tutor chapter context
    if (this.components.ai_tutor) {
      this.components.ai_tutor.setChapter(chapterId === 'kafli_1' ? 'kafli_1' : 'modull_0');
    }

    // Re-bind BÍN aura events & Dagsamningur badge
    binAuraSystem.bindEvents(this.root);
    this.updateDagsamningurBadge();
  }

  switchM0SubTab(subTabId) {
    this.activeM0SubTab = subTabId;

    this.root.querySelectorAll('.m0-sub-btn').forEach(b => {
      const isTarget = b.dataset.m0Sub === subTabId;
      b.classList.toggle('active', isTarget);
    });

    this.root.querySelectorAll('.m0-view').forEach(v => {
      v.classList.add('hidden');
    });

    const targetSec = this.root.querySelector(`#m0-sec-${subTabId}`);
    if (targetSec) {
      targetSec.classList.remove('hidden');
    }

    // Refresh subcomponent state on reveal
    if (subTabId === 'duel' && this.components.duel) {
      this.components.duel.render();
    } else if (subTabId === 'builder' && this.components.builder) {
      this.components.builder.render();
    } else if (subTabId === 'dialogue' && this.components.dialogue) {
      this.components.dialogue.render();
    } else if (subTabId === 'raddstafir' && this.components.raddstafir) {
      this.components.raddstafir.render();
    } else if (subTabId === 'traps' && this.components.traps) {
      this.components.traps.render();
    }

    // Re-bind BÍN aura events & Dagsamningur badge
    binAuraSystem.bindEvents(this.root);
    this.updateDagsamningurBadge();
  }
}
