/**
 * Modull0App.js - Master Orchestrator for Íslenskukennsla Platform
 * 100% Ukrainian UI Chrome & Compact Single-Row A1 Navigation
 * 
 * Lessons (Рівень A1): [Урок 0: Абетка] | [Урок 1: Хто ти?] | [Урок 2: Кав'ярня 🟢] | [Урок 3: Рутина] | [🗺️ Мапа Саги]
 * Plus: Single Header with "● Local AI: localhost:1235" & "🤖 ШІ-Тьютор"
 */

import { M0_PHONETICS_DATA } from '../data/m0_phonetics.js?v=7.5';
import { AlphabetSoundboard } from './AlphabetSoundboard.js?v=7.1';
import { RaddstafirHub } from './RaddstafirHub.js?v=7.5';
import { BaraTalaAcoustics } from './BaraTalaAcoustics.js?v=7.5';
import { MinimalPairDuel } from './MinimalPairDuel.js?v=7.5';
import { IpaSoundBuilder } from './IpaSoundBuilder.js?v=7.5';
import { SpeechEtiquette } from './SpeechEtiquette.js?v=7.1';
import { InteractiveDrillEngine } from './InteractiveDrillEngine.js?v=7.1';
import { DailyWordEngine } from './DailyWordEngine.js?v=7.1';
import { DailyFocusArena } from './DailyFocusArena.js?v=7.1';
import { LocalAITutorPanel } from './LocalAITutorPanel.js?v=7.1';
import { Kafli1App } from './Kafli1App.js?v=7.11';
import { SagaRoadmap } from './SagaRoadmap.js?v=7.1';
import { DropsFlexionLab } from './DropsFlexionLab.js?v=7.8';
import { Module0Exam } from './Module0Exam.js?v=7.2';
import { Module0StudyGuide } from './Module0StudyGuide.js?v=7.9';
import { FlashcardDeckEngine } from './FlashcardDeckEngine.js?v=7.5';
import { Kafli3RoutineApp } from './Kafli3RoutineApp.js?v=7.1';
import { Kafli4ClothingApp } from './Kafli4ClothingApp.js?v=1.0';
import { Kafli5HealthFamilyApp } from './Kafli5HealthFamilyApp.js?v=1.0';
import { Kafli6FoodApp } from './Kafli6FoodApp.js?v=1.0';
import { Kafli7HobbiesWeatherApp } from './Kafli7HobbiesWeatherApp.js?v=1.0';
import { A2K1HousingApp } from './A2K1HousingApp.js?v=1.0';
import { A2K2WorkApp } from './A2K2WorkApp.js?v=1.0';
import { A2K3TransportApp } from './A2K3TransportApp.js?v=1.0';
import { BinMorphologyLab } from './BinMorphologyLab.js?v=7.1';
import { gameState } from './GameState.js?v=7.1';
import { binAuraSystem } from './BinAuraSystem.js?v=7.1';
import { audioEngine } from './AudioEngine.js?v=7.1';

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
                  <span class="platform-badge text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40">A1 • A2</span>
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
            <div class="max-w-7xl mx-auto px-3 sm:px-6 min-h-[42px] py-1 flex items-center justify-between gap-3 overflow-x-auto">
              
              <!-- Left: Lessons 0 to 7 + Hub Tools with clear A1 & A2 badges -->
              <div class="flex items-center gap-1.5 font-mono text-xs py-0.5 flex-nowrap flex-shrink-0">
                <button data-chapter="a1_hub" class="chapter-nav-btn nav-btn ${this.activeChapter === 'a1_hub' ? 'active' : ''} text-cyan-300 font-extrabold bg-cyan-950/50 border-cyan-500/60 shadow-sm" title="Оглядовий каталог усіх 8 уроків рівня A1">
                  📚 Каталог A1
                </button>
                <button data-chapter="a2_hub" class="chapter-nav-btn nav-btn ${this.activeChapter === 'a2_hub' ? 'active' : ''} text-emerald-300 font-extrabold bg-emerald-950/50 border-emerald-500/60 shadow-sm" title="Оглядовий каталог усіх 8 уроків рівня A2 (Книга 2: ÍFA 2)">
                  📗 Каталог A2
                </button>
                <button data-chapter="modull_0" class="chapter-nav-btn nav-btn ${this.activeChapter === 'modull_0' ? 'active' : ''}">
                  🔤 0: Абетка
                </button>
                <button data-chapter="kafli_1" class="chapter-nav-btn nav-btn ${this.activeChapter === 'kafli_1' ? 'active' : ''}">
                  🌟 1: Хто ти?
                </button>
                <button data-chapter="drops_lab" class="chapter-nav-btn nav-btn ${this.activeChapter === 'drops_lab' ? 'active' : ''}">
                  ☕ 2: Кав'ярня 🟢
                </button>
                <button data-chapter="modull_3" class="chapter-nav-btn nav-btn ${this.activeChapter === 'modull_3' ? 'active' : ''}">
                  ⏰ 3: Рутина
                </button>
                <button data-chapter="kafli_4" class="chapter-nav-btn nav-btn ${this.activeChapter === 'kafli_4' ? 'active' : ''}">
                  👗 4: Одяг
                </button>
                <button data-chapter="kafli_5" class="chapter-nav-btn nav-btn ${this.activeChapter === 'kafli_5' ? 'active' : ''}">
                  🩺 5: Здоров'я
                </button>
                <button data-chapter="kafli_6" class="chapter-nav-btn nav-btn ${this.activeChapter === 'kafli_6' ? 'active' : ''}">
                  🍽️ 6: Їжа
                </button>
                <button data-chapter="kafli_7" class="chapter-nav-btn nav-btn ${this.activeChapter === 'kafli_7' ? 'active' : ''}">
                  🏊 7: Фінал A1
                </button>

                <span class="text-slate-700 font-bold px-0.5">|</span>

                <button data-chapter="a2_k1" class="chapter-nav-btn nav-btn ${this.activeChapter === 'a2_k1' ? 'active' : ''} text-indigo-300 border-indigo-500/40" title="Рівень A2 • Книга 2 • Урок 1: Житло та минулий час">
                  🏠 A2.1: Житло
                </button>
                <button data-chapter="a2_k2" class="chapter-nav-btn nav-btn ${this.activeChapter === 'a2_k2' ? 'active' : ''} text-emerald-300 border-emerald-500/40" title="Рівень A2 • Книга 2 • Урок 2: Робота та сильні дієслова">
                  💼 A2.2: Робота
                </button>
                <button data-chapter="a2_k3" class="chapter-nav-btn nav-btn ${this.activeChapter === 'a2_k3' ? 'active' : ''} text-amber-300 border-amber-500/40" title="Рівень A2 • Книга 2 • Урок 3: Транспорт, Klapp та дієслова руху">
                  🚌 A2.3: Транспорт
                </button>
                
                <span class="text-slate-700 font-bold px-0.5">|</span>

                <button data-chapter="flashcards" class="chapter-nav-btn nav-btn ${this.activeChapter === 'flashcards' ? 'active' : ''} text-amber-300 border-amber-500/40">
                  🗂️ Картки
                </button>
                <button data-chapter="bin_grammar" class="chapter-nav-btn nav-btn ${this.activeChapter === 'bin_grammar' ? 'active' : ''} text-cyan-300 border-cyan-500/40">
                  🏛️ BÍN
                </button>
                <button data-chapter="saga_map" class="chapter-nav-btn nav-btn nav-btn-saga ${this.activeChapter === 'saga_map' ? 'active' : ''}">
                  🗺️ Сага
                </button>
                <a href="curriculum_dashboard.html" class="chapter-nav-btn nav-btn text-purple-300 border-purple-500/40 hover:bg-purple-950/40 flex items-center gap-1" title="Дорожня карта курсів, мовні школи та подкасти">
                  <span>📊</span><span class="hidden md:inline">Дашборд</span>
                </a>
                <a href="curriculum_dashboard.html?tab=podcasts" class="chapter-nav-btn nav-btn text-purple-300 border-purple-500/40 hover:bg-purple-950/40 flex items-center gap-1" title="Слухати 22 білінгвальні подкасти для авто">
                  <span>🎙️</span><span>Подкасти (22)</span>
                </a>
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

          <!-- ================= BLOCK 3 (BOTTOM PINNED): ERGONOMIC M0 SUB-NAVIGATION DOCK (ZERO TRUNCATION) ================= -->
          <div id="block3-subnav-ribbon" class="px-2 sm:px-6 py-1.5 bg-black/95 border-b border-cyan-500/20 ${this.activeChapter === 'modull_0' ? '' : 'hidden'}">
            <div class="max-w-7xl mx-auto">
              <div id="m0-subnav-bar" class="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap sm:justify-between font-mono scrollbar-none">
                <button data-m0-sub="guide" class="m0-sub-btn sub-tab-btn whitespace-nowrap px-2.5 py-1 text-[11px] font-bold ${this.activeM0SubTab === 'guide' ? 'active' : ''} text-cyan-300">
                  📖 0. Посібник & Подкаст
                </button>
                <button data-m0-sub="flashcards" class="m0-sub-btn sub-tab-btn whitespace-nowrap px-2.5 py-1 text-[11px] font-bold ${this.activeM0SubTab === 'flashcards' ? 'active' : ''} text-emerald-300">
                  🗂️ Картки (SRS)
                </button>
                <button data-m0-sub="soundboard" class="m0-sub-btn sub-tab-btn whitespace-nowrap px-2.5 py-1 text-[11px] font-bold ${this.activeM0SubTab === 'soundboard' ? 'active' : ''}">
                  1. Матриця (32)
                </button>
                <button data-m0-sub="raddstafir" class="m0-sub-btn sub-tab-btn whitespace-nowrap px-2.5 py-1 text-[11px] font-bold ${this.activeM0SubTab === 'raddstafir' ? 'active' : ''}">
                  2. Голосні
                </button>
                <button data-m0-sub="traps" class="m0-sub-btn sub-tab-btn whitespace-nowrap px-2.5 py-1 text-[11px] font-bold ${this.activeM0SubTab === 'traps' ? 'active' : ''}">
                  3. Пастки (5)
                </button>
                <button data-m0-sub="duel" class="m0-sub-btn sub-tab-btn whitespace-nowrap px-2.5 py-1 text-[11px] font-bold ${this.activeM0SubTab === 'duel' ? 'active' : ''}">
                  4. Акустична дуель
                </button>
                <button data-m0-sub="builder" class="m0-sub-btn sub-tab-btn whitespace-nowrap px-2.5 py-1 text-[11px] font-bold ${this.activeM0SubTab === 'builder' ? 'active' : ''}">
                  5. Звуковий конструктор
                </button>
                <button data-m0-sub="dialogue" class="m0-sub-btn sub-tab-btn whitespace-nowrap px-2.5 py-1 text-[11px] font-bold ${this.activeM0SubTab === 'dialogue' ? 'active' : ''}">
                  6. Симулятор діалогу
                </button>
                <button data-m0-sub="drills" class="m0-sub-btn sub-tab-btn whitespace-nowrap px-2.5 py-1 text-[11px] font-bold ${this.activeM0SubTab === 'drills' ? 'active' : ''}">
                  7. Тренажер (20)
                </button>
                <button data-m0-sub="exam" class="m0-sub-btn sub-tab-btn whitespace-nowrap px-2.5 py-1 text-[11px] font-bold ${this.activeM0SubTab === 'exam' ? 'active' : ''} text-amber-300">
                  🎓 8. Атестація (15 Q)
                </button>
              </div>
            </div>
          </div>
        </header>

        <!-- ================= MAIN WORKSPACE ================= -->
        <main class="max-w-7xl mx-auto px-3 sm:px-6 py-3 space-y-3">
          
          <!-- Persistent A1 & A2 Lessons Switcher (Always Visible Across All Screen Widths) -->
          <div class="p-2 sm:p-2.5 rounded-2xl bg-cyber-card/90 border border-cyber-border flex items-center justify-between gap-2 overflow-x-auto shadow-md">
            <div class="flex items-center gap-1.5 text-xs font-mono shrink-0">
              <button data-chapter="a1_hub" class="chapter-nav-btn px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold transition-all ${this.activeChapter === 'a1_hub' ? 'bg-cyan-400 text-black shadow-md' : 'bg-cyan-950/50 text-cyan-300 hover:text-white border border-cyan-500/40'}">
                📚 Каталог A1
              </button>
              <button data-chapter="a2_hub" class="chapter-nav-btn px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold transition-all ${this.activeChapter === 'a2_hub' ? 'bg-emerald-400 text-black shadow-md' : 'bg-emerald-950/50 text-emerald-300 hover:text-white border border-emerald-500/40'}">
                📗 Каталог A2
              </button>
              <button data-chapter="modull_0" class="chapter-nav-btn px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${this.activeChapter === 'modull_0' ? 'bg-cyan-500 text-black' : 'bg-black/50 text-slate-300 hover:text-white border border-slate-800'}">
                0: Абетка
              </button>
              <button data-chapter="kafli_1" class="chapter-nav-btn px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${this.activeChapter === 'kafli_1' ? 'bg-cyan-500 text-black' : 'bg-black/50 text-slate-300 hover:text-white border border-slate-800'}">
                1: Хто ти?
              </button>
              <button data-chapter="drops_lab" class="chapter-nav-btn px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${this.activeChapter === 'drops_lab' ? 'bg-emerald-500 text-black' : 'bg-black/50 text-slate-300 hover:text-white border border-slate-800'}">
                2: Кав'ярня 🟢
              </button>
              <button data-chapter="modull_3" class="chapter-nav-btn px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${this.activeChapter === 'modull_3' ? 'bg-purple-500 text-black' : 'bg-black/50 text-slate-300 hover:text-white border border-slate-800'}">
                3: Рутина
              </button>
              <button data-chapter="kafli_4" class="chapter-nav-btn px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${this.activeChapter === 'kafli_4' ? 'bg-emerald-500 text-black' : 'bg-black/50 text-slate-300 hover:text-white border border-slate-800'}">
                4: Одяг
              </button>
              <button data-chapter="kafli_5" class="chapter-nav-btn px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${this.activeChapter === 'kafli_5' ? 'bg-rose-500 text-black' : 'bg-black/50 text-slate-300 hover:text-white border border-slate-800'}">
                5: Здоров'я
              </button>
              <button data-chapter="kafli_6" class="chapter-nav-btn px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${this.activeChapter === 'kafli_6' ? 'bg-amber-500 text-black' : 'bg-black/50 text-slate-300 hover:text-white border border-slate-800'}">
                6: Їжа
              </button>
              <button data-chapter="kafli_7" class="chapter-nav-btn px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${this.activeChapter === 'kafli_7' ? 'bg-cyan-500 text-black' : 'bg-black/50 text-slate-300 hover:text-white border border-slate-800'}">
                7: Фінал A1
              </button>
              <span class="text-slate-700 font-bold px-0.5">|</span>
              <button data-chapter="a2_k1" class="chapter-nav-btn px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${this.activeChapter === 'a2_k1' ? 'bg-indigo-500 text-black shadow-md' : 'bg-black/50 text-indigo-300 hover:text-white border border-indigo-500/30'}" title="Книга 2: Житло та минулий час">
                A2.1: Житло
              </button>
              <button data-chapter="a2_k2" class="chapter-nav-btn px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${this.activeChapter === 'a2_k2' ? 'bg-emerald-500 text-black shadow-md' : 'bg-black/50 text-emerald-300 hover:text-white border border-emerald-500/30'}" title="Книга 2: Робота та сильні дієслова">
                A2.2: Робота
              </button>
              <button data-chapter="a2_k3" class="chapter-nav-btn px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${this.activeChapter === 'a2_k3' ? 'bg-amber-500 text-black shadow-md' : 'bg-black/50 text-amber-300 hover:text-white border border-amber-500/30'}" title="Книга 2: Транспорт, Klapp та дієслова руху">
                A2.3: Транспорт
              </button>
            </div>

            <div class="flex items-center gap-1 shrink-0 text-[10px] font-mono">
              <a href="curriculum_dashboard.html" class="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 font-bold transition-all flex items-center gap-1">
                <span>📚</span><span class="hidden sm:inline">Дорожня карта</span><span>(33 розд.)</span>
              </a>
            </div>
          </div>
          
          <!-- ================= TAB A1 HUB: ГОЛОВНИЙ КАТАЛОГ УРОКІВ РІВНЯ A1 ================= -->
          <div id="chapter-container-a1_hub" class="chapter-view ${this.activeChapter === 'a1_hub' ? '' : 'hidden'} space-y-4">
            <!-- Populated by renderA1Hub -->
          </div>

          <!-- ================= TAB A2 HUB: ГОЛОВНИЙ КАТАЛОГ УРОКІВ РІВНЯ A2 ================= -->
          <div id="chapter-container-a2_hub" class="chapter-view ${this.activeChapter === 'a2_hub' ? '' : 'hidden'} space-y-4">
            <!-- Populated by renderA2Hub -->
          </div>
          </div>

          <!-- ================= TAB 0: УРОК 0 (АБЕТКА ТА ЗВУКИ) ================= -->
          <div id="chapter-container-modull_0" class="chapter-view ${this.activeChapter === 'modull_0' ? '' : 'hidden'} space-y-3">
            <!-- M0 Sub-Sections (10 Dedicated Containers) -->
            <div id="m0-sec-guide" class="m0-view ${this.activeM0SubTab === 'guide' ? '' : 'hidden'}"></div>
            <div id="m0-sec-flashcards" class="m0-view ${this.activeM0SubTab === 'flashcards' ? '' : 'hidden'}"></div>
            <div id="m0-sec-soundboard" class="m0-view ${this.activeM0SubTab === 'soundboard' ? '' : 'hidden'}"></div>
            <div id="m0-sec-raddstafir" class="m0-view ${this.activeM0SubTab === 'raddstafir' ? '' : 'hidden'}"></div>
            <div id="m0-sec-traps" class="m0-view ${this.activeM0SubTab === 'traps' ? '' : 'hidden'}"></div>
            <div id="m0-sec-duel" class="m0-view ${this.activeM0SubTab === 'duel' ? '' : 'hidden'}"></div>
            <div id="m0-sec-builder" class="m0-view ${this.activeM0SubTab === 'builder' ? '' : 'hidden'}"></div>
            <div id="m0-sec-dialogue" class="m0-view ${this.activeM0SubTab === 'dialogue' ? '' : 'hidden'}"></div>
            <div id="m0-sec-drills" class="m0-view ${this.activeM0SubTab === 'drills' ? '' : 'hidden'}"></div>
            <div id="m0-sec-exam" class="m0-view ${this.activeM0SubTab === 'exam' ? '' : 'hidden'}"></div>
          </div>

          <!-- ================= TAB 1: УРОК 1 (ХТО ТИ?) ================= -->
          <div id="chapter-container-kafli_1" class="chapter-view ${this.activeChapter === 'kafli_1' ? '' : 'hidden'}">
            <!-- Populated by Kafli1App -->
          </div>

          <!-- ================= TAB 2: УРОК 2 (У КАВ'ЯРНІ 🟢) ================= -->
          <div id="chapter-container-drops_lab" class="chapter-view ${this.activeChapter === 'drops_lab' ? '' : 'hidden'}">
            <!-- Populated by DropsFlexionLab -->
          </div>

          <!-- ================= TAB 3: УРОК 3 (РУТИНА ТА V2) ================= -->
          <div id="chapter-container-modull_3" class="chapter-view ${this.activeChapter === 'modull_3' ? '' : 'hidden'} space-y-4">
            <!-- Populated by Kafli3RoutineApp -->
          </div>

          <!-- ================= TAB 4: УРОК 4 (ОДЯГ ТА ПРИКМЕТНИКИ) ================= -->
          <div id="chapter-container-kafli_4" class="chapter-view ${this.activeChapter === 'kafli_4' ? '' : 'hidden'} space-y-4">
            <!-- Populated by Kafli4ClothingApp -->
          </div>

          <!-- ================= TAB 5: УРОК 5 (СІМ'Я, АНАТОМІЯ ТА ЗДОРОВ'Я) ================= -->
          <div id="chapter-container-kafli_5" class="chapter-view ${this.activeChapter === 'kafli_5' ? '' : 'hidden'} space-y-4">
            <!-- Populated by Kafli5HealthFamilyApp -->
          </div>

          <!-- ================= TAB 6: УРОК 6 (ЇЖА ТА РЕСТОРАН) ================= -->
          <div id="chapter-container-kafli_6" class="chapter-view ${this.activeChapter === 'kafli_6' ? '' : 'hidden'} space-y-4">
            <!-- Populated by Kafli6FoodApp -->
          </div>

          <!-- ================= TAB 7: УРОК 7 (ДОЗВІЛЛЯ, БАСЕЙНИ ТА ПОГОДА - ФІНАЛ A1) ================= -->
          <div id="chapter-container-kafli_7" class="chapter-view ${this.activeChapter === 'kafli_7' ? '' : 'hidden'} space-y-4">
            <!-- Populated by Kafli7HobbiesWeatherApp -->
          </div>

          <!-- ================= TAB A2.1: УРОК A2.1 (ЖИТЛО, ОРЕНДА ТА МИНУЛИЙ ЧАС — КНИГА 2) ================= -->
          <div id="chapter-container-a2_k1" class="chapter-view ${this.activeChapter === 'a2_k1' ? '' : 'hidden'} space-y-4">
            <!-- Populated by A2K1HousingApp -->
          </div>

          <!-- ================= TAB A2.2: УРОК A2.2 (РОБОТА, ТАБЕЛЬ ЗАРПЛАТИ ТА СИЛЬНІ ДІЄСЛОВА) ================= -->
          <div id="chapter-container-a2_k2" class="chapter-view ${this.activeChapter === 'a2_k2' ? '' : 'hidden'} space-y-4">
            <!-- Populated by A2K2WorkApp -->
          </div>

          <!-- ================= TAB A2.3: УРОК A2.3 (ТРАНСПОРТ, KLAPP ТА ДІЄСЛОВА РУХУ) ================= -->
          <div id="chapter-container-a2_k3" class="chapter-view ${this.activeChapter === 'a2_k3' ? '' : 'hidden'} space-y-4">
            <!-- Populated by A2K3TransportApp -->
          </div>

          <!-- ================= TAB FLASHCARDS: 3D КАРТКИ & NOTEBOOKLM STUDIO ================= -->
          <div id="chapter-container-flashcards" class="chapter-view ${this.activeChapter === 'flashcards' ? '' : 'hidden'} space-y-4">
            <!-- Populated by FlashcardDeckEngine -->
          </div>

          <!-- ================= TAB BIN GRAMMAR: АКАДЕМІЧНИЙ ДОВІДНИК BÍN ================= -->
          <div id="chapter-container-bin_grammar" class="chapter-view ${this.activeChapter === 'bin_grammar' ? '' : 'hidden'} space-y-4">
            <!-- Populated by BinMorphologyLab -->
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

    // 2. Mount Módúll 0 components
    // Step 0.0: Study Guide (Офіційний Навчальний посібник Модуля 0 за матеріалами NotebookLM)
    const guideContainer = this.root.querySelector('#m0-sec-guide');
    if (guideContainer) {
      this.components.guide = new Module0StudyGuide(guideContainer, () => {
        this.switchM0SubTab('exam');
      });
      this.components.guide.render();
    }

    // Step 0.0b: Interactive 3D Flashcards inside M0 sub-tab
    const m0FlashcardsContainer = this.root.querySelector('#m0-sec-flashcards');
    if (m0FlashcardsContainer) {
      this.components.m0Flashcards = new FlashcardDeckEngine(m0FlashcardsContainer, 'modull_0');
      this.components.m0Flashcards.render();
    }

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

    // Mount Module 0 Final Certification Exam
    const examContainer = this.root.querySelector('#m0-sec-exam');
    if (examContainer) {
      this.components.exam = new Module0Exam(
        examContainer, 
        () => this.switchChapter('kafli_1'),
        () => this.switchM0SubTab('guide')
      );
      this.components.exam.render();
    }

    // 3. Mount Kafli 1 component
    const k1Container = this.root.querySelector('#chapter-container-kafli_1');
    if (k1Container) {
      this.components.kafli1 = new Kafli1App(k1Container, () => this.switchChapter('drops_lab'));
      this.components.kafli1.render();
    }

    // 4. Mount Drops Flexion Lab (Cafe Simulator)
    const dropsContainer = this.root.querySelector('#chapter-container-drops_lab');
    if (dropsContainer) {
      this.components.dropsLab = new DropsFlexionLab(dropsContainer, () => this.switchChapter('modull_3'));
      this.components.dropsLab.render();
    }

    // 4b. Mount Kafli 3 Routine & V2 App
    const k3Container = this.root.querySelector('#chapter-container-modull_3');
    if (k3Container) {
      this.components.kafli3 = new Kafli3RoutineApp(k3Container);
      this.components.kafli3.render();
    }

    // 4c. Mount Kafli 4 Clothing & Adjectives App
    const k4Container = this.root.querySelector('#chapter-container-kafli_4');
    if (k4Container) {
      this.components.kafli4 = new Kafli4ClothingApp(k4Container);
      this.components.kafli4.render();
    }

    // 4d. Mount Kafli 5 Health & Family App
    const k5Container = this.root.querySelector('#chapter-container-kafli_5');
    if (k5Container) {
      this.components.kafli5 = new Kafli5HealthFamilyApp(k5Container);
      this.components.kafli5.render();
    }

    // 4e. Mount Kafli 6 Food & Restaurant App
    const k6Container = this.root.querySelector('#chapter-container-kafli_6');
    if (k6Container) {
      this.components.kafli6 = new Kafli6FoodApp(k6Container);
      this.components.kafli6.render();
    }

    // 4f. Mount Kafli 7 Hobbies, Swimming & Weather App (A1 Finale)
    const k7Container = this.root.querySelector('#chapter-container-kafli_7');
    if (k7Container) {
      this.components.kafli7 = new Kafli7HobbiesWeatherApp(k7Container);
      this.components.kafli7.render();
    }

    // 4h. Mount Level A2 • Lesson 1 (Housing & Past Tense)
    const a2Container = this.root.querySelector('#chapter-container-a2_k1');
    if (a2Container) {
      this.components.a2_k1 = new A2K1HousingApp(a2Container);
      this.components.a2_k1.render();
    }

    // 4i. Mount Level A2 • Lesson 2 (Work, Payslip & Strong Verbs)
    const a2k2Container = this.root.querySelector('#chapter-container-a2_k2');
    if (a2k2Container) {
      this.components.a2_k2 = new A2K2WorkApp(a2k2Container);
      this.components.a2_k2.render();
    }

    // 4j. Mount Level A2 • Lesson 3 (Transport, Klapp & Motion Verbs)
    const a2k3Container = this.root.querySelector('#chapter-container-a2_k3');
    if (a2k3Container) {
      this.components.a2_k3 = new A2K3TransportApp(a2k3Container);
      this.components.a2_k3.render();
    }

    // 4g. Mount Curriculum Catalog Hubs (A1 & A2)
    this.renderA1Hub();
    this.renderA2Hub();

    // 4c. Mount Master Flashcards & NotebookLM Studio Hub
    const flashcardsContainer = this.root.querySelector('#chapter-container-flashcards');
    if (flashcardsContainer) {
      this.components.flashcardsHub = new FlashcardDeckEngine(flashcardsContainer, 'modull_0');
      this.components.flashcardsHub.render();
    }

    // 4d. Mount Academic BÍN Morphology & Grammar Lab
    const binGrammarContainer = this.root.querySelector('#chapter-container-bin_grammar');
    if (binGrammarContainer) {
      this.components.binGrammar = new BinMorphologyLab(binGrammarContainer);
      this.components.binGrammar.render();
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
        else if (this.activeChapter === 'kafli_4') currentMod = 'kafli_4';
        else if (this.activeChapter === 'kafli_5') currentMod = 'kafli_5';
        else if (this.activeChapter === 'kafli_6') currentMod = 'kafli_6';
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
      if (b.dataset.chapter && !b.classList.contains('nav-btn')) {
        if (isTarget) {
          b.classList.add('bg-cyan-500', 'text-black');
          b.classList.remove('bg-black/50', 'text-slate-300');
        } else {
          b.classList.remove('bg-cyan-500', 'bg-emerald-500', 'bg-purple-500', 'bg-rose-500', 'bg-amber-500', 'text-black');
          b.classList.add('bg-black/50', 'text-slate-300');
        }
      }
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
        case 'kafli_4':
          heroBadge.innerText = 'УРОК 4 • ОДЯГ ТА КОЛЬОРИ (СИЛЬНІ ПРИКМЕТНИКИ)';
          heroTitle.innerText = 'Урок 4: Одяг, кольори та сильна відміна (Föt, litir & lýsingarorð)';
          break;
        case 'kafli_5':
          heroBadge.innerText = 'УРОК 5 • СІМ\'Я ТА ЗДОРОВ\'Я (LÍKAMINN & HEILSA)';
          heroTitle.innerText = 'Урок 5: Сім\'я, анатомія та здоров\'я (Fjölskyldan, líkaminn & heilsan)';
          break;
        case 'kafli_6':
          heroBadge.innerText = 'УРОК 6 • ЇЖА ТА РЕСТОРАН (MATUR & ELDAMENNSKA)';
          heroTitle.innerText = 'Урок 6: Їжа, кулінарія та ресторан (Matur, eldamennska & veitingahús)';
          break;
        case 'kafli_7':
          heroBadge.innerText = 'УРОК 7 • ДОЗВІЛЛЯ, БАСЕЙНИ ТА ПОГОДА (ФІНАЛ A1)';
          heroTitle.innerText = 'Урок 7: Дозвілля, басейни та погода (Tómstundir, sund & veður)';
          break;
        case 'a2_k1':
          heroBadge.innerText = 'РІВЕНЬ A2 • КНИГА 2 • УРОК 1 (ЖИТЛО ТА МИНУЛИЙ ЧАС)';
          heroTitle.innerText = 'Урок A2.1: Житлові умови, договори оренди та минулий час (Húsnæði & þátíð)';
          break;
        case 'a2_k2':
          heroBadge.innerText = 'РІВЕНЬ A2 • КНИГА 2 • УРОК 2 (РОБОТА ТА СИЛЬНІ ДІЄСЛОВА)';
          heroTitle.innerText = 'Урок A2.2: Ринок праці, табель зарплати та сильні дієслова (Vinna & sterkar sagnir)';
          break;
        case 'a2_k3':
          heroBadge.innerText = 'РІВЕНЬ A2 • КНИГА 2 • УРОК 3 (ТРАНСПОРТ ТА ДІЄСЛОВА РУХУ)';
          heroTitle.innerText = 'Урок A2.3: Громадський транспорт Strætó, Klapp, аеропорт та подорожі';
          break;
        case 'a1_hub':
          heroBadge.innerText = 'КУРСОВИЙ КАТАЛОГ • РІВЕНЬ A1 (0–7)';
          heroTitle.innerText = 'Каталог усіх уроків рівня A1 (Íslenska fyrir alla 1, Розділи 1–8)';
          break;
        case 'a2_hub':
          heroBadge.innerText = 'КУРСОВИЙ КАТАЛОГ • РІВЕНЬ A2 (КНИГА 2: ÍSLENSKA FYRIR ALLA 2)';
          heroTitle.innerText = 'Каталог усіх 8 уроків рівня A2 (Соціальна автономія та побутова інтеграція)';
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
    if (chapterId === 'modull_3' && this.components.kafli3) {
      this.components.kafli3.render();
    }
    if (chapterId === 'kafli_4' && this.components.kafli4) {
      this.components.kafli4.render();
    }
    if (chapterId === 'kafli_5' && this.components.kafli5) {
      this.components.kafli5.render();
    }
    if (chapterId === 'kafli_6' && this.components.kafli6) {
      this.components.kafli6.render();
    }
    if (chapterId === 'kafli_7' && this.components.kafli7) {
      this.components.kafli7.render();
    }
    if (chapterId === 'a2_k1' && this.components.a2_k1) {
      this.components.a2_k1.render();
    }
    if (chapterId === 'a2_k2' && this.components.a2_k2) {
      this.components.a2_k2.render();
    }
    if (chapterId === 'a2_k3' && this.components.a2_k3) {
      this.components.a2_k3.render();
    }
    if (chapterId === 'a1_hub') {
      this.renderA1Hub();
    }
    if (chapterId === 'a2_hub') {
      this.renderA2Hub();
    }
    if (chapterId === 'flashcards' && this.components.flashcardsHub) {
      this.components.flashcardsHub.render();
    }
    if (chapterId === 'bin_grammar' && this.components.binGrammar) {
      this.components.binGrammar.render();
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
    if (subTabId === 'guide' && this.components.guide) {
      this.components.guide.render();
    } else if (subTabId === 'flashcards' && this.components.m0Flashcards) {
      this.components.m0Flashcards.render();
    } else if (subTabId === 'duel' && this.components.duel) {
      this.components.duel.render();
    } else if (subTabId === 'builder' && this.components.builder) {
      this.components.builder.render();
    } else if (subTabId === 'dialogue' && this.components.dialogue) {
      this.components.dialogue.render();
    } else if (subTabId === 'raddstafir' && this.components.raddstafir) {
      this.components.raddstafir.render();
    } else if (subTabId === 'traps' && this.components.traps) {
      this.components.traps.render();
    } else if (subTabId === 'exam' && this.components.exam) {
      this.components.exam.render();
    }

    // Re-bind BÍN aura events & Dagsamningur badge
    binAuraSystem.bindEvents(this.root);
    this.updateDagsamningurBadge();
  }

  openLessonExam(chapterId) {
    if (chapterId === 'modull_0') {
      this.switchChapter('modull_0');
      this.switchM0SubTab('exam');
    } else if (chapterId === 'kafli_1') {
      this.switchChapter('kafli_1');
      if (this.components.kafli1) {
        this.components.kafli1.activeTab = 'exam';
        this.components.kafli1.render();
      }
    } else if (chapterId === 'drops_lab') {
      this.switchChapter('drops_lab');
    } else if (chapterId === 'modull_3') {
      this.switchChapter('modull_3');
      if (this.components.kafli3) {
        this.components.kafli3.activeTab = 'exam';
        this.components.kafli3.render();
      }
    } else if (chapterId === 'kafli_4') {
      this.switchChapter('kafli_4');
      if (this.components.kafli4) {
        this.components.kafli4.activeTab = 'exam';
        this.components.kafli4.render();
      }
    } else if (chapterId === 'kafli_5') {
      this.switchChapter('kafli_5');
      if (this.components.kafli5) {
        this.components.kafli5.activeTab = 'exam';
        this.components.kafli5.render();
      }
    } else if (chapterId === 'kafli_6') {
      this.switchChapter('kafli_6');
      if (this.components.kafli6) {
        this.components.kafli6.activeTab = 'exam';
        this.components.kafli6.render();
      }
    } else if (chapterId === 'kafli_7') {
      this.switchChapter('kafli_7');
      if (this.components.kafli7) {
        this.components.kafli7.activeTab = 'exam';
        this.components.kafli7.render();
      }
    } else if (chapterId === 'a2_k1') {
      this.switchChapter('a2_k1');
      if (this.components.a2_k1) {
        this.components.a2_k1.activeTab = 'exam';
        this.components.a2_k1.render();
      }
    } else if (chapterId === 'a2_k2') {
      this.switchChapter('a2_k2');
      if (this.components.a2_k2) {
        this.components.a2_k2.activeTab = 'exam';
        this.components.a2_k2.render();
      }
    } else if (chapterId === 'a2_k3') {
      this.switchChapter('a2_k3');
      if (this.components.a2_k3) {
        this.components.a2_k3.activeTab = 'exam';
        this.components.a2_k3.render();
      }
    }
  }

  renderA1Hub() {
    const hubContainer = this.root.querySelector('#chapter-container-a1_hub');
    if (!hubContainer) return;

    const lessons = [
      {
        id: 'modull_0',
        num: '0',
        titleUkr: 'Абетка та фонетичні закони',
        titleIsl: 'Stafrófið & Hljóðfræði',
        level: 'A1.1 Базовий',
        source: 'ÍFA 1 Kafli 1 • Fonetika',
        icon: '🔤',
        color: 'cyan',
        cases: ['🔵 NF', '🎯 32 звуки', '🎧 Пастки'],
        topics: [
          '32 літери ісландської абетки та аудіоматриця',
          'Підступні дифтонги (ei/ey, au, æ) та боковий вибух [tl]',
          '20 інтерактивних аудіотренажерів та посібник'
        ],
        examLabel: 'Атестація 0 (15 Q)'
      },
      {
        id: 'kafli_1',
        num: '1',
        titleUkr: 'Хто ти? Знайомство та країни',
        titleIsl: 'Hver ert þú? & Lönd',
        level: 'A1.1 Початковий',
        source: 'ÍFA 1 Kafli 1–2 • Málfræði',
        icon: '🌟',
        color: 'cyan',
        cases: ['🔵 NF', '👥 Звертання', '🌍 Країни'],
        topics: [
          'Дієслово að vera (ég er, þú ert, hann er)',
          'Країни, мови спілкування, професії та числа',
          'Базова структура питального речення'
        ],
        examLabel: 'Іспит K1 (15 Q)'
      },
      {
        id: 'drops_lab',
        num: '2',
        titleUkr: 'У кав\'ярні: Знахідний відмінок',
        titleIsl: 'Í kaffihúsinu & Bónus',
        level: 'A1.1 Практичний',
        source: 'ÍFA 1 Kafli 3 • Tölum saman',
        icon: '☕',
        color: 'emerald',
        cases: ['🟢 ÞF', '☕ Замовлення', '🛒 Bónus'],
        topics: [
          'Знахідний відмінок іменників 3 родів (Þolfall 🟢)',
          'Формула замовлення: «Ég ætla að fá...»',
          'Касир у Bónus, числівники 1–4 та оплата'
        ],
        examLabel: 'Тренінг флексій 🟢'
      },
      {
        id: 'modull_3',
        num: '3',
        titleUkr: 'Щоденна рутина та закон V2',
        titleIsl: 'Rútína & V2-reglan',
        level: 'A1.2 Середній',
        source: 'ÍFA 1 Kafli 4 • Litli málfr.',
        icon: '⏰',
        color: 'purple',
        cases: ['⏰ Час', '🔄 V2 Закон', '🌅 Розклад'],
        topics: [
          'Ісландський годинник (Hvað er klukkan?) з аналоговим диском',
          'Синтаксичний закон другої позиції дієслова V2',
          'Дієслова 3–4 груп (að sofa, að vakna, að fara)'
        ],
        examLabel: 'Іспит K3 (15 Q)'
      },
      {
        id: 'kafli_4',
        num: '4',
        titleUkr: 'Одяг, кольори та сильні прикметники',
        titleIsl: 'Föt, litir & lýsingarorð',
        level: 'A1.2 Середній',
        source: 'ÍFA 1 Kafli 5 • Skilaréttur',
        icon: '👗',
        color: 'emerald',
        cases: ['👗 Гардероб', '🎨 Кольори', '🔀 U-умлаут'],
        topics: [
          'Кліматичний гардероб (лопапейса, термобілизна, дощовик)',
          'Сильна відміна прикметників у 3 родах (gulur/gul/gult)',
          'Чергування U-умлауту та повернення товару (Skilaréttur)'
        ],
        examLabel: 'Іспит K4 (15 Q)'
      },
      {
        id: 'kafli_5',
        num: '5',
        titleUkr: 'Сім\'я, анатомія та поліклініка',
        titleIsl: 'Fjölskyldan & Heilsan',
        level: 'A1.3 Просунутий',
        source: 'ÍFA 1 Kafli 6 • Heilsugæsla',
        icon: '🩺',
        color: 'rose',
        cases: ['🟡 ÞGF', '👨‍👩‍👧 Родина', '🏥 Поліклініка'],
        topics: [
          'Родинне дерево та R-відміна (faðir/föður, móðir/móður)',
          'Частини тіла та скарги на біль: «Mér er illt í... + ÞGF 🟡»',
          'Запис на прийом tímapöntun та візит до аптеки'
        ],
        examLabel: 'Іспит K5 (15 Q)'
      },
      {
        id: 'kafli_6',
        num: '6',
        titleUkr: 'Гастрономія, кулінарія та ресторан',
        titleIsl: 'Matur, eldun & veitingahús',
        level: 'A1.3 Просунутий',
        source: 'ÍFA 1 Kafli 7 • Matargerð',
        icon: '🍽️',
        color: 'amber',
        cases: ['🍽️ Кухня', '🟡 af + ÞGF', '🍳 Аблаут'],
        topics: [
          'Традиційні страви (Kjötsúpa, Plokkfiskur, Hangikjöt)',
          'Партитивні конструкції міри («glas af vatni + ÞGF 🟡»)',
          'Аблаут сильних кулінарних дієслів (sjóða ➔ sýð)'
        ],
        examLabel: 'Іспит K6 (15 Q)'
      },
      {
        id: 'kafli_7',
        num: '7',
        titleUkr: 'Дозвілля, басейни та погода (Фінал A1)',
        titleIsl: 'Tómstundir, sund & veður',
        level: 'A1.3 ФІНАЛ A1',
        source: 'ÍFA 1 Kafli 8 • A1 Lokapróf',
        icon: '🏊',
        color: 'cyan',
        cases: ['🏊 Басейни', '♨️ Pottar', '🌦️ Погода'],
        topics: [
          'Культура басейнів Sundlaug та обов\'язковий душ án sundfata',
          'Безособова метеорологія (Það rignir / Það snjóar)',
          'Великий підсумковий сертифікаційний іспит за весь рівень A1'
        ],
        examLabel: 'Випускний A1 🏆'
      }
    ];

    hubContainer.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Header Banner -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-cyber-card to-cyber-deep border border-cyan-500/40 shadow-2xl relative overflow-hidden">
          <div class="absolute -right-12 -top-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="space-y-3 relative z-10">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Рівень A1 • CEFR A1.1 – A1.3
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                8 Модулів • 100% Завершено
              </span>
              <span class="text-xs font-mono text-slate-400">Стандарт Íslenska fyrir alla 1 & BÍN</span>
            </div>

            <h2 class="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight flex items-center gap-3">
              <span>🇮🇸</span> Повний академічний каталог курсу A1
            </h2>

            <p class="text-sm text-slate-300 font-sans max-w-3xl leading-relaxed">
              Від повного опанування 32 літер абетки, дифтонгів та фонетичних пасток до вільного вирішення побутових справ в Ісландії: знайомства, кав'ярня, супермаркет, покупки одягу, візит до лікаря, ресторан та культура геотермальних басейнів.
            </p>

            <div class="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
              <button id="hub-start-first-lesson" class="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold shadow-lg transition-all flex items-center gap-2">
                <span>🚀</span><span>Почати з Уроку 0</span>
              </button>
              <a href="curriculum_dashboard.html" class="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-bold transition-all flex items-center gap-2">
                <span>🗺️</span><span>Дорожня карта B1–B2</span>
              </a>
              <a href="curriculum_dashboard.html?tab=podcasts" class="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold transition-all flex items-center gap-2">
                <span>🎙️</span><span>Подкасти для авто (22)</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 8-Card Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          ${lessons.map(l => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border hover:border-cyan-500/60 transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-0.5">
              
              <div class="space-y-3">
                <!-- Top Card Meta -->
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-2.5">
                    <span class="text-3xl p-2 rounded-xl bg-cyber-deep border border-cyber-border/80 group-hover:scale-110 transition-transform">${l.icon}</span>
                    <div>
                      <div class="flex items-center gap-1.5">
                        <span class="text-[10px] font-mono font-extrabold uppercase px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          УРОК ${l.num}
                        </span>
                        <span class="text-[10px] font-mono text-slate-400">${l.level}</span>
                      </div>
                      <h3 class="text-base font-bold font-mono text-white group-hover:text-cyan-300 transition-colors leading-snug mt-0.5">
                        ${l.titleUkr}
                      </h3>
                    </div>
                  </div>
                </div>

                <p class="text-xs font-mono text-cyan-400 italic">${l.titleIsl}</p>
                <p class="text-[11px] font-mono text-slate-400">${l.source}</p>

                <!-- Grammar Case Badges -->
                <div class="flex flex-wrap gap-1 pt-1">
                  ${l.cases.map(c => `
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyber-deep border border-cyber-border text-slate-300">
                      ${c}
                    </span>
                  `).join('')}
                </div>

                <!-- Learning Outcomes -->
                <ul class="text-xs text-slate-300 font-sans space-y-1.5 pt-2 border-t border-cyber-border/60">
                  ${l.topics.map(t => `
                    <li class="flex items-start gap-1.5">
                      <span class="text-cyan-400 shrink-0 text-[10px]">●</span>
                      <span class="leading-tight">${t}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- Action Buttons -->
              <div class="mt-4 pt-3 border-t border-cyber-border flex items-center gap-2 font-mono text-xs">
                <button class="hub-open-lesson-btn flex-1 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/40 font-bold transition-all text-center flex items-center justify-center gap-1" data-lesson="${l.id}">
                  <span>Почати</span><span>➔</span>
                </button>
                <button class="hub-open-exam-btn py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 font-bold transition-all text-center" data-lesson="${l.id}" title="${l.examLabel}">
                  <span>📝</span>
                </button>
              </div>

            </div>
          `).join('')}
        </div>

      </div>
    `;

    // Bind actions
    const startFirstBtn = hubContainer.querySelector('#hub-start-first-lesson');
    if (startFirstBtn) {
      startFirstBtn.onclick = () => this.switchChapter('modull_0');
    }

    hubContainer.querySelectorAll('.hub-open-lesson-btn').forEach(btn => {
      btn.onclick = () => {
        const lid = btn.dataset.lesson;
        if (lid) this.switchChapter(lid);
      };
    });

    hubContainer.querySelectorAll('.hub-open-exam-btn').forEach(btn => {
      btn.onclick = () => {
        const lid = btn.dataset.lesson;
        if (lid) this.openLessonExam(lid);
      };
    });
  }

  renderA2Hub() {
    const hubContainer = this.root.querySelector('#chapter-container-a2_hub');
    if (!hubContainer) return;

    const lessonsA2 = [
      {
        id: 'a2_k1',
        num: 'A2.1',
        titleUkr: 'Житлові умови та договори оренди',
        titleIsl: 'Húsnæði & Leigusamningar',
        level: 'A2.1 Соціальна база',
        source: 'ÍFA 2 Kafli 1 • HMS Standard',
        icon: '🏠',
        color: 'indigo',
        isActive: true,
        cases: ['⏳ Þátíð -aði', '📜 Leiga', '🏢 HMS'],
        topics: [
          'Минулий час слабких дієслів 1–3 груп (-aði, -ði, -ti, -di)',
          'Оренда житла, депозит (trygging) та договори HMS',
          'Житлові субсидії (Húsaleigubætur) та огляд квартири'
        ],
        examLabel: 'Іспит A2.1 (15 Q)'
      },
      {
        id: 'a2_k2',
        num: 'A2.2',
        titleUkr: 'Ринок праці, трудовий договір та зарплата',
        titleIsl: 'Vinna, Samningar & Launaseðill',
        level: 'A2.1 Трудова автономія',
        source: 'ÍFA 2 Kafli 2 • Skatturinn & Efling',
        icon: '💼',
        color: 'emerald',
        isActive: true,
        cases: ['7 рядів аблауту', '💰 Launaseðill', '🛡️ Efling'],
        topics: [
          '7 класів сильних дієслів у минулому часі (ablaut — hljóðskipti)',
          'Трудовий договір Ráðningarsamningur та податкова карта Persónuafsláttur',
          'Анатомія розрахункового листа Launaseðill: брутто, нетто, профспілка'
        ],
        examLabel: 'Іспит A2.2 (15 Q)'
      },
      {
        id: 'a2_k3',
        num: 'A2.3',
        titleUkr: 'Громадський транспорт Strætó, Klapp та перельоти',
        titleIsl: 'Samgöngur, Klapp & Ferðalög',
        level: 'A2.1 Мобільність',
        source: 'ÍFA 2 Kafli 8 & 4 • SafeTravel',
        icon: '🚌',
        color: 'amber',
        isActive: true,
        cases: ['🟢 ÞF vs 🟡 ÞGF', '📱 Klapp', '✈️ BSÍ / Flybus'],
        topics: [
          'Прийменники руху vs локації (Hvert? 🟢 ÞF vs Hvar? 🟡 ÞGF)',
          'Міський транспорт Strætó, тарифи, валідація у додатку Klapp',
          'Поїздки до аеропорту (Flugrútan) та безпека на трасах SafeTravel'
        ],
        examLabel: 'Іспит A2.3 (15 Q)'
      },
      {
        id: 'a2_k4',
        num: 'A2.4',
        titleUkr: 'Медична система, аптека та лікарняні фонди',
        titleIsl: 'Heilsugæslan, Apótek & Sjúkrasjóður',
        level: 'A2.2 Здоров\'я',
        source: 'ÍFA 2 Kafli 4 • Heilsuvera',
        icon: '🏥',
        color: 'rose',
        isActive: false,
        cases: ['🟡 Mér líður...', '💊 Lyfseðill', '🏥 Heilsuvera'],
        topics: [
          'Портал пацієнта Heilsuvera, запис до лікаря та скарги на здоров\'я',
          'Електронні рецепти в аптеці Lyfja / Apótek',
          'Виплати за лікарняними від профспілкового фонду Sjúkrasjóður'
        ],
        examLabel: 'У розробці ⏳'
      },
      {
        id: 'a2_k5',
        num: 'A2.5',
        titleUkr: 'Розклад дня та зворотні дієслова на -st',
        titleIsl: 'Dagurinn minn & Miðmynd',
        level: 'A2.2 Життєвий ритм',
        source: 'ÍFA 2 Kafli 3 • Málfræði',
        icon: '🔄',
        color: 'purple',
        isActive: false,
        cases: ['🔀 Miðmynd -st', '⏰ Vaktavinna', '🧘 Rútína'],
        topics: [
          'Зворотний стан дієслів на -st (að klæðast, að greiða sér, að hitta)',
          'Розширений щоденний графік та прислівники регулярності',
          'Опис позмінної роботи (Vaktavinna) та баланс відпочинку'
        ],
        examLabel: 'У розробці ⏳'
      },
      {
        id: 'a2_k6',
        num: 'A2.6',
        titleUkr: 'Система освіти, дитсадки та Mentor.is',
        titleIsl: 'Skólakerfið & Mentor.is',
        level: 'A2.2 Освіта родини',
        source: 'ÍFA 2 Kafli 6 • Skólamál',
        icon: '🎒',
        color: 'cyan',
        isActive: false,
        cases: ['🏫 Leikskóli', '📱 Mentor.is', '📝 Tilkynning'],
        topics: [
          'Дошкільна освіта Leikskóli та середня школа Grunnskóli',
          'Батьківський портал Mentor.is: повідомлення про хворобу дитини',
          'Комунікація з викладачами та участь у шкільних заходах'
        ],
        examLabel: 'У розробці ⏳'
      },
      {
        id: 'a2_k7',
        num: 'A2.7',
        titleUkr: 'Автомобіль в Ісландії, техогляд та сервіс',
        titleIsl: 'Bíllinn, Aðalskoðun & Tryggingar',
        level: 'A2.2 Автономія водія',
        source: 'ÍFA 2 Kafli 7 • Samgöngustofa',
        icon: '🚗',
        color: 'indigo',
        isActive: false,
        cases: ['🔧 Aðalskoðun', '🛡️ Kaskó', '⛽ Bensínstöð'],
        topics: [
          'Володіння автомобілем в Ісландії, щорічний техогляд Aðalskoðun',
          'Страхування (Ábyrgðartrygging, Kaskó) та взаємодія з майстернею',
          'Автозаправки самообслуговування та зимове обслуговування авто'
        ],
        examLabel: 'У розробці ⏳'
      },
      {
        id: 'a2_k8',
        num: 'A2.8',
        titleUkr: 'Ісландське суспільство та Випускний іспит A2',
        titleIsl: 'Samfélagið & Lokapróf A2',
        level: 'A2.2 ФІНАЛ A2',
        source: 'ÍFA 2 Kafli 8 • A2 Lokapróf',
        icon: '🏆',
        color: 'emerald',
        isActive: false,
        cases: ['🇮🇸 Samfélag', '🗳️ Réttindi', '🎓 Lokapróf'],
        topics: [
          'Суспільні норми, права іммігрантів, податкова декларація Skatturinn',
          'Ісландські свята, традиції та культурна спадщина',
          'Великий випускний сертифікаційний іспит за весь рівень A2'
        ],
        examLabel: 'Фінал A2 🏆'
      }
    ];

    hubContainer.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Header Banner -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-cyber-card to-cyber-deep border border-emerald-500/40 shadow-2xl relative overflow-hidden">
          <div class="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="space-y-3 relative z-10">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Рівень A2 • Miðstig 1 (CEFR A2.1 – A2.2)
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Книга 2: Íslenska fyrir alla 2 • 8 Модулів
              </span>
              <span class="text-xs font-mono text-slate-400">Стандарт HMS, Skatturinn & Árnastofnun BÍN</span>
            </div>

            <h2 class="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight flex items-center gap-3">
              <span>📗</span> Повний академічний каталог курсу A2
            </h2>

            <p class="text-sm text-slate-300 font-sans max-w-3xl leading-relaxed">
              Рівень повної соціальної та побутової автономії в Ісландії: оренда квартири через офіційну Leiguskrá (HMS), підписання трудових договорів Ráðningarsamningur, аудит зарплатних табелів Launaseðill, поїздки транспортом Strætó / Klapp, медицина Heilsuvera та шкільна взаємодія.
            </p>

            <div class="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
              <button id="hub-a2-start-first-lesson" class="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold shadow-lg transition-all flex items-center gap-2 cursor-pointer">
                <span>🚀</span><span>Почати з Уроку A2.1 (Житло)</span>
              </button>
              <button id="hub-a2-to-a1-btn" class="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold transition-all flex items-center gap-2 cursor-pointer">
                <span>📚</span><span>Каталог Уроків A1 (0–7)</span>
              </button>
              <a href="curriculum_dashboard.html" class="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-bold transition-all flex items-center gap-2">
                <span>🗺️</span><span>Дорожня карта (33 розд.)</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 8-Card Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          ${lessonsA2.map(l => `
            <div class="p-5 rounded-2xl bg-cyber-card border ${l.isActive ? 'border-emerald-500/50 hover:border-emerald-400 shadow-xl hover:-translate-y-0.5' : 'border-cyber-border opacity-70'} transition-all flex flex-col justify-between group">
              
              <div class="space-y-3">
                <!-- Top Card Meta -->
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-2.5">
                    <span class="text-3xl p-2 rounded-xl bg-cyber-deep border border-cyber-border/80 group-hover:scale-110 transition-transform">${l.icon}</span>
                    <div>
                      <div class="flex items-center gap-1.5">
                        <span class="text-[10px] font-mono font-extrabold uppercase px-1.5 py-0.2 rounded ${l.isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'}">
                          ${l.num}
                        </span>
                        <span class="text-[10px] font-mono text-slate-400">${l.level}</span>
                      </div>
                      <h3 class="text-base font-bold font-mono text-white ${l.isActive ? 'group-hover:text-emerald-300' : ''} transition-colors leading-snug mt-0.5">
                        ${l.titleUkr}
                      </h3>
                    </div>
                  </div>
                </div>

                <p class="text-xs font-mono text-emerald-400 italic">${l.titleIsl}</p>
                <p class="text-[11px] font-mono text-slate-400">${l.source}</p>

                <!-- Grammar Case Badges -->
                <div class="flex flex-wrap gap-1 pt-1">
                  ${l.cases.map(c => `
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyber-deep border border-cyber-border text-slate-300">
                      ${c}
                    </span>
                  `).join('')}
                </div>

                <!-- Learning Outcomes -->
                <ul class="text-xs text-slate-300 font-sans space-y-1.5 pt-2 border-t border-cyber-border/60">
                  ${l.topics.map(t => `
                    <li class="flex items-start gap-1.5">
                      <span class="${l.isActive ? 'text-emerald-400' : 'text-slate-500'} shrink-0 text-[10px]">●</span>
                      <span class="leading-tight">${t}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- Action Buttons -->
              <div class="mt-4 pt-3 border-t border-cyber-border flex items-center gap-2 font-mono text-xs">
                ${l.isActive ? `
                  <button class="hub-a2-open-lesson-btn flex-1 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black border border-emerald-500/40 font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer" data-lesson="${l.id}">
                    <span>Відкрити</span><span>➔</span>
                  </button>
                  <button class="hub-a2-open-exam-btn py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 font-bold transition-all text-center cursor-pointer" data-lesson="${l.id}" title="${l.examLabel}">
                    <span>📝</span>
                  </button>
                ` : `
                  <div class="w-full py-2 rounded-xl bg-cyber-deep border border-cyber-border text-slate-500 text-center font-mono text-xs">
                    ⏳ Заплановано
                  </div>
                `}
              </div>

            </div>
          `).join('')}
        </div>

      </div>
    `;

    // Bind A2 Hub actions
    const startFirstA2Btn = hubContainer.querySelector('#hub-a2-start-first-lesson');
    if (startFirstA2Btn) {
      startFirstA2Btn.onclick = () => this.switchChapter('a2_k1');
    }

    const toA1Btn = hubContainer.querySelector('#hub-a2-to-a1-btn');
    if (toA1Btn) {
      toA1Btn.onclick = () => this.switchChapter('a1_hub');
    }

    hubContainer.querySelectorAll('.hub-a2-open-lesson-btn').forEach(btn => {
      btn.onclick = () => {
        const lid = btn.dataset.lesson;
        if (lid) this.switchChapter(lid);
      };
    });

    hubContainer.querySelectorAll('.hub-a2-open-exam-btn').forEach(btn => {
      btn.onclick = () => {
        const lid = btn.dataset.lesson;
        if (lid) this.openLessonExam(lid);
      };
    });
  }
}
