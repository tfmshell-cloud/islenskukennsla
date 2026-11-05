/**
 * Modull0App.js - Master Orchestrator for Íslenskukennsla Platform
 * Світовий стандарт освітньої архітектури:
 * 1. 4 Глобальні Стовпи: [📚 УРОКИ] | [🎙️ ПОДКАСТИ] | [📝 ІСПИТИ] | [🏛️ ДЕРЖПОРТАЛИ]
 * 2. Чіткий селектор рівнів: [A1 Початковий] | [A2 Практичний] | [B1 Громадянство] (без дублювання каталогів!)
 * 3. ЄДИНА 5-РІВНЕВА СУБНАВІГАЦІЯ ДЛЯ КОЖНОГО УРОКУ:
 *    [🎧 1. Подкаст уроку] | [📖 2. Теорія & Правила] | [🔤 3. Словник & BÍN] | [💬 4. Діалоги] | [🏆 5. Іспит уроку]
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
import { A2K4HealthApp } from './A2K4HealthApp.js?v=1.0';
import { A2K5EducationApp } from './A2K5EducationApp.js?v=1.0';
import { A2K6RoutineApp } from './A2K6RoutineApp.js?v=1.0';
import { A2K7BankingApp } from './A2K7BankingApp.js?v=1.0';
import { A2K8SocietyApp } from './A2K8SocietyApp.js?v=1.0';
import { B1K1WorkplaceApp } from './B1K1WorkplaceApp.js?v=1.0';
import { SourcesVaultApp } from './SourcesVaultApp.js?v=1.0';
import { BinMorphologyLab } from './BinMorphologyLab.js?v=7.1';
import { gameState } from './GameState.js?v=7.1';
import { binAuraSystem } from './BinAuraSystem.js?v=7.1';
import { audioEngine } from './AudioEngine.js?v=7.1';
import { UnifiedPodcastPlayer } from './UnifiedPodcastPlayer.js?v=1.0';
import { UnifiedExamsCenter } from './UnifiedExamsCenter.js?v=1.0';

export const LESSON_PODCAST_MAP = {
  'modull_0': 'm0',
  'kafli_1': '1',
  'drops_lab': '2',
  'modull_3': '4',
  'kafli_4': '11',
  'kafli_5': '5',
  'kafli_6': '3',
  'kafli_7': '10',
  'a2_k1': '7',
  'a2_k2': '8',
  'a2_k3': '6',
  'a2_k4': '12',
  'a2_k5': '15',
  'a2_k6': '14',
  'a2_k7': '17',
  'a2_k8': '19',
  'b1_k1': '20'
};

export const CURRICULUM_LEVELS = {
  'A1': {
    name: 'A1: Початковий',
    icon: '📘',
    lessons: [
      { id: 'modull_0', num: '0', title: '0: Абетка', fullTitle: 'Урок 0: Абетка та звуки (Stafrófið & Framburður)', level: 'A1.0' },
      { id: 'kafli_1', num: '1', title: '1: Хто ти?', fullTitle: 'Урок 1: Хто ти? (Hver ert þú? — Країни, професії, að vera)', level: 'A1.1' },
      { id: 'drops_lab', num: '2', title: '2: Кав\'ярня', fullTitle: 'Урок 2: У кав\'ярні (Í kaffihúsinu — Знахідний відмінок Þolfall 🟢)', level: 'A1.1' },
      { id: 'modull_3', num: '3', title: '3: Рутина', fullTitle: 'Урок 3: Щоденна рутина та V2 (Rútína & V2-reglan)', level: 'A1.2' },
      { id: 'kafli_4', num: '4', title: '4: Одяг', fullTitle: 'Урок 4: Одяг, кольори та сильна відміна (Föt, litir & lýsingarorð)', level: 'A1.2' },
      { id: 'kafli_5', num: '5', title: '5: Здоров\'я', fullTitle: 'Урок 5: Сім\'я, анатомія та здоров\'я (Fjölskyldan, líkaminn & heilsan)', level: 'A1.2' },
      { id: 'kafli_6', num: '6', title: '6: Їжа', fullTitle: 'Урок 6: Їжа, кулінарія та ресторан (Matur, eldamennska & veitingahús)', level: 'A1.3' },
      { id: 'kafli_7', num: '7', title: '7: Фінал A1', fullTitle: 'Урок 7: Дозвілля, басейни та погода (Tómstundir, sund & veður)', level: 'A1.3' }
    ]
  },
  'A2': {
    name: 'A2: Практичний',
    icon: '📗',
    lessons: [
      { id: 'a2_k1', num: 'A2.1', title: 'A2.1: Житло', fullTitle: 'Урок A2.1: Житлові умови, договори оренди та минулий час (Húsnæði & þátíð)', level: 'A2.1' },
      { id: 'a2_k2', num: 'A2.2', title: 'A2.2: Робота', fullTitle: 'Урок A2.2: Ринок праці, табель зарплати та сильні дієслова (Vinna & sterkar sagnir)', level: 'A2.2' },
      { id: 'a2_k3', num: 'A2.3', title: 'A2.3: Транспорт', fullTitle: 'Урок A2.3: Громадський транспорт Strætó, Klapp, аеропорт та подорожі', level: 'A2.3' },
      { id: 'a2_k4', num: 'A2.4', title: 'A2.4: Здоров\'я', fullTitle: 'Урок A2.4: Система охорони здоров\'я, Heilsugæslan, лінія 1700 та Heilsuvera', level: 'A2.4' },
      { id: 'a2_k5', num: 'A2.5', title: 'A2.5: Освіта', fullTitle: 'Урок A2.5: Освітня система, дитячий садок Leikskóli, школа та Mentor.is', level: 'A2.5' },
      { id: 'a2_k6', num: 'A2.6', title: 'A2.6: Розклад', fullTitle: 'Урок A2.6: Розклад дня, позмінна робота, 11-годинний відпочинок та стан на -st', level: 'A2.6' },
      { id: 'a2_k7', num: 'A2.7', title: 'A2.7: Банки', fullTitle: 'Урок A2.7: Банківська система, інтернет-банкінг, вимоги kröfur та Auðkenni', level: 'A2.7' },
      { id: 'a2_k8', num: 'A2.8', title: 'A2.8: Фінал A2', fullTitle: 'Урок A2.8: Ісландське суспільство, податки у Skatturinn та випускний іспит Lokapróf A2', level: 'A2.8' }
    ]
  },
  'B1': {
    name: 'B1: Громадянство',
    icon: '📙',
    lessons: [
      { id: 'b1_k1', num: 'B1.1', title: 'B1.1: Громадянство', fullTitle: 'Урок B1.1: Трудове життя, економічні дебати та іспит на громадянство (Mímir)', level: 'B1.1' }
    ]
  }
};

export class Modull0App {
  constructor(rootElement) {
    this.root = rootElement;
    this.dataM0 = M0_PHONETICS_DATA;
    this.activeGlobalTab = 'lessons'; // 'lessons' | 'podcasts' | 'exams' | 'sources'
    this.activeLevel = 'A1'; // 'A1' | 'A2' | 'B1'
    this.activeChapter = 'modull_0'; // current active lesson id
    this.activeLessonSubTab = 'theory'; // 'podcast' | 'theory' | 'vocab' | 'dialogues' | 'exam'
    this.activeM0SubTab = 'soundboard'; // internal m0 subtab
    this.components = {};
    this.podcastPlayer = null;
    this.examsCenter = null;
    this.isAiOnline = false;
    this.focusArena = new DailyFocusArena(() => this.updateDagsamningurBadge());
  }

  init() {
    this.renderLayout();
    this.mountComponents();
    this.bindGlobalEvents();
    this.updateDagsamningurBadge();
    this.checkAiStatus();
    gameState.applyTheme();
    binAuraSystem.applyAuraStateToDOM();
    this.renderLessonPills();
    this.updateHeroBanner();
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

        <!-- ================= TOP HEADER ================= -->
        <header id="app-sticky-header" class="sticky top-0 z-50 shadow-lg backdrop-blur-md transition-all border-b border-slate-800">
          
          <!-- ================= BLOCK 1: GLOBAL PILLARS & BRAND ================= -->
          <div id="block1-brand-dashboard" class="bg-cyber-void/95 border-b border-slate-800/80">
            <div class="max-w-7xl mx-auto px-3 sm:px-6 h-12 flex items-center justify-between gap-3">
              
              <!-- Left: Brand Logo -->
              <div class="flex items-center gap-3 flex-shrink-0">
                <a href="index.html" class="flex items-center gap-2 group flex-shrink-0">
                  <span class="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 via-emerald-400 to-amber-400 flex items-center justify-center text-base font-black text-black shadow-md group-hover:scale-105 transition-transform">
                    🇮🇸
                  </span>
                  <span class="header-logo-title text-sm sm:text-base font-black font-mono tracking-tight text-white">ÍSLENSKA</span>
                </a>
              </div>

              <!-- Center: 4 Global Nav Pillars -->
              <nav class="flex items-center gap-1 sm:gap-2 font-mono text-xs font-bold overflow-x-auto scrollbar-none py-1">
                <button data-pillar="lessons" class="global-pillar-btn px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${this.activeGlobalTab === 'lessons' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-md font-extrabold' : 'bg-black/50 text-slate-400 border-slate-800 hover:text-white'}">
                  <span>📚</span><span>УРОКИ</span>
                </button>
                <button data-pillar="podcasts" class="global-pillar-btn px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${this.activeGlobalTab === 'podcasts' ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-md font-extrabold' : 'bg-black/50 text-slate-400 border-slate-800 hover:text-white'}">
                  <span>🎙️</span><span>ПОДКАСТИ</span>
                  <span class="px-1.5 py-0.2 rounded-full bg-amber-400 text-black text-[9px] font-black">13 MASTER</span>
                </button>
                <button data-pillar="exams" class="global-pillar-btn px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${this.activeGlobalTab === 'exams' ? 'bg-purple-500/20 text-purple-300 border-purple-500/60 shadow-md font-extrabold' : 'bg-black/50 text-slate-400 border-slate-800 hover:text-white'}">
                  <span>📝</span><span>ІСПИТИ</span>
                  <span class="px-1.5 py-0.2 rounded-full bg-purple-500/30 text-purple-200 border border-purple-500/40 text-[9px]">17</span>
                </button>
                <button data-pillar="sources" class="global-pillar-btn px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${this.activeGlobalTab === 'sources' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-md font-extrabold' : 'bg-black/50 text-slate-400 border-slate-800 hover:text-white'}">
                  <span>🏛️</span><span class="hidden sm:inline">ДЕРЖПОРТАЛИ & BÍN</span><span class="sm:hidden">BÍN</span>
                </button>
              </nav>

              <!-- Right: User HUD, Theme, AI Coach -->
              <div class="flex items-center gap-2 flex-shrink-0">
                <div id="hud-container" class="flex items-center gap-1.5 bg-black/70 px-2 py-1 rounded-lg border border-slate-800 text-[11px] font-mono shadow-sm">
                  <span class="text-cyan-400 font-bold" title="Досвід (XP)">⚡ <span id="hud-xp-val">${s.xp}</span></span>
                  <span class="text-amber-400 font-bold hidden md:inline" title="Серія днів">🔥 <span id="hud-streak-val">${s.streak}</span></span>
                  <span class="text-emerald-400 font-bold hidden md:inline" title="Кристали">💎 <span id="hud-gems-val">${s.gems}</span></span>
                </div>

                <button id="theme-toggle-btn" class="p-1.5 rounded-lg border border-slate-800 font-mono text-xs font-bold flex items-center bg-black/50 hover:bg-black transition-all" title="Тема оформлення">
                  <span id="theme-toggle-icon">${s.theme === 'light' ? '☀️' : '🌙'}</span>
                </button>

                <button id="header-open-ai-btn" class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-[11px] font-mono shadow-sm flex items-center gap-1 transition-all transform hover:scale-105 active:scale-95 cursor-pointer" title="Відкрити ШІ-Тьютора Árnastofnun">
                  <span>🤖</span><span class="hidden sm:inline">ШІ-Коуч</span>
                </button>
              </div>

            </div>
          </div>

          <!-- ================= BLOCK 2: LEVEL SELECTOR & LESSONS BAR ================= -->
          <div id="block2-lessons-bar" class="border-b border-slate-800/80 bg-cyber-deep/95 ${this.activeGlobalTab === 'lessons' ? '' : 'hidden'}">
            <div class="max-w-7xl mx-auto px-3 sm:px-6 min-h-[44px] py-1.5 flex items-center justify-between gap-3 overflow-x-auto">
              
              <!-- Left: Level Switcher Pills (A1, A2, B1) + Dynamic Lessons -->
              <div class="flex items-center gap-2 font-mono text-xs flex-shrink-0">
                
                <div class="flex items-center gap-1 bg-black/70 p-1 rounded-xl border border-slate-800">
                  <button data-level="A1" class="level-tab-btn px-2.5 py-1 rounded-lg font-extrabold border transition-all ${this.activeLevel === 'A1' ? 'bg-cyan-500 text-black border-cyan-400 shadow-md' : 'bg-transparent text-cyan-300 border-transparent hover:bg-cyan-950/40'}">
                    📘 A1 (0–7)
                  </button>
                  <button data-level="A2" class="level-tab-btn px-2.5 py-1 rounded-lg font-extrabold border transition-all ${this.activeLevel === 'A2' ? 'bg-emerald-500 text-black border-emerald-400 shadow-md' : 'bg-transparent text-emerald-300 border-transparent hover:bg-emerald-950/40'}">
                    📗 A2 (1–8)
                  </button>
                  <button data-level="B1" class="level-tab-btn px-2.5 py-1 rounded-lg font-extrabold border transition-all ${this.activeLevel === 'B1' ? 'bg-amber-500 text-black border-amber-400 shadow-md' : 'bg-transparent text-amber-300 border-transparent hover:bg-amber-950/40'}">
                    📙 B1
                  </button>
                </div>

                <span class="text-slate-700 font-bold px-1">➔</span>

                <!-- Dynamic Lesson Pills for activeLevel -->
                <div id="dynamic-lessons-container" class="flex items-center gap-1.5 font-mono text-xs">
                  <!-- Injected by renderLessonPills() -->
                </div>

              </div>

              <!-- Right: BÍN 4 Cases & X-Ray Switcher -->
              <div class="flex items-center gap-1.5 flex-shrink-0 text-[10px] font-mono">
                <button class="bin-xray-toggle-btn px-2 py-0.5 rounded-lg border font-mono text-[10px] font-bold flex items-center gap-1 transition-all ${s.binAuraActive ? 'active' : ''}" title="BÍN 4 відмінки">
                  ${s.binAuraActive 
                    ? `<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span><span>BÍN Рентген</span>`
                    : `<span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span><span>BÍN Рентген</span>`
                  }
                </button>
                <div class="flex items-center gap-0.5 bg-black/60 px-1.5 py-0.5 rounded border border-slate-800" title="BÍN 4 відмінки">
                  <span class="px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[9px] font-bold">NF</span>
                  <span class="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold">ÞF</span>
                  <span class="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-bold">ÞGF</span>
                  <span class="px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[9px] font-bold">EF</span>
                </div>
              </div>

            </div>
          </div>

          <!-- ================= BLOCK 3: UNIVERSAL 5-TIER SUB-NAVIGATION DOCK ================= -->
          <div id="block3-subnav-ribbon" class="px-3 sm:px-6 py-1.5 bg-black/95 border-b border-cyan-500/20 ${this.activeGlobalTab === 'lessons' ? '' : 'hidden'}">
            <div class="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto font-mono scrollbar-none">
              
              <!-- 5 Universal Pillars for ANY lesson -->
              <div id="universal-subnav-buttons" class="flex items-center gap-1.5 text-xs font-bold">
                <button data-subtab="podcast" class="lesson-subtab-btn px-3 py-1 rounded-lg border transition-all ${this.activeLessonSubTab === 'podcast' ? 'bg-amber-500 text-black border-amber-400 font-extrabold shadow-md' : 'bg-black/60 text-amber-300 border-amber-500/40 hover:bg-amber-950/40'} flex items-center gap-1.5">
                  <span>🎧</span><span>1. Подкаст уроку</span>
                </button>
                <button data-subtab="theory" class="lesson-subtab-btn px-3 py-1 rounded-lg border transition-all ${this.activeLessonSubTab === 'theory' ? 'bg-cyan-500 text-black border-cyan-400 font-extrabold shadow-md' : 'bg-black/60 text-cyan-300 border-cyan-500/40 hover:bg-cyan-950/40'} flex items-center gap-1.5">
                  <span>📖</span><span>2. Теорія & Правила</span>
                </button>
                <button data-subtab="vocab" class="lesson-subtab-btn px-3 py-1 rounded-lg border transition-all ${this.activeLessonSubTab === 'vocab' ? 'bg-emerald-500 text-black border-emerald-400 font-extrabold shadow-md' : 'bg-black/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-950/40'} flex items-center gap-1.5">
                  <span>🔤</span><span>3. Словник & BÍN</span>
                </button>
                <button data-subtab="dialogues" class="lesson-subtab-btn px-3 py-1 rounded-lg border transition-all ${this.activeLessonSubTab === 'dialogues' ? 'bg-purple-500 text-black border-purple-400 font-extrabold shadow-md' : 'bg-black/60 text-purple-300 border-purple-500/40 hover:bg-purple-950/40'} flex items-center gap-1.5">
                  <span>💬</span><span>4. Діалоги & Практика</span>
                </button>
                <button data-subtab="exam" class="lesson-subtab-btn px-3 py-1 rounded-lg border transition-all ${this.activeLessonSubTab === 'exam' ? 'bg-rose-500 text-black border-rose-400 font-extrabold shadow-md' : 'bg-black/60 text-rose-300 border-rose-500/40 hover:bg-rose-950/40'} flex items-center gap-1.5">
                  <span>🏆</span><span>5. Іспит уроку</span>
                </button>
              </div>

              <!-- Right: Active Lesson Info Badge -->
              <div id="subnav-active-lesson-label" class="hidden md:flex items-center gap-2 text-[11px] text-slate-400 font-mono flex-shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span id="subnav-lesson-badge" class="font-bold text-white">Урок 0: Абетка</span>
              </div>

            </div>
          </div>

        </header>

        <!-- ================= MAIN WORKSPACE (SWITCHABLE BETWEEN 4 PILLARS) ================= -->
        <main class="max-w-7xl mx-auto px-3 sm:px-6 py-4 space-y-4">
          
          <!-- ================= PILLAR 1: УРОКИ (LESSONS WORKSPACE) ================= -->
          <div id="workspace-lessons" class="${this.activeGlobalTab === 'lessons' ? '' : 'hidden'} space-y-4">
            
            <!-- Hero Lesson Header Banner -->
            <div id="lesson-hero-banner" class="p-4 rounded-2xl bg-cyber-card border border-slate-800 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span id="hero-curriculum-badge" class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">УРОК 0 • АБЕТКА ТА ЗВУКИ</span>
                  <span id="hero-level-badge" class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">A1.0</span>
                </div>
                <h1 id="hero-curriculum-title" class="text-base sm:text-lg font-bold text-white tracking-tight">
                  Урок 0: Абетка та звуки (Stafrófið & Framburður)
                </h1>
              </div>
              
              <div class="flex items-center gap-2 font-mono text-xs">
                <span class="px-3 py-1.5 rounded-xl bg-black/60 border border-slate-700 text-slate-300">
                  Розділ: <span id="hero-subtab-label" class="text-cyan-300 font-bold">2. Теорія & Правила</span>
                </span>
              </div>
            </div>

            <!-- Dynamic Mount for Lesson Podcast Player -->
            <div id="lesson-podcast-mount-point" class="${this.activeLessonSubTab === 'podcast' ? '' : 'hidden'} space-y-4">
              <!-- Rendered by UnifiedPodcastPlayer.renderLessonPlayer(...) -->
            </div>

            <!-- Underlying Chapter Views (Visible when NOT in podcast mode) -->
            <div id="all-chapter-containers" class="${this.activeLessonSubTab === 'podcast' ? 'hidden' : ''} space-y-4">
              
              <!-- ================= TAB 0: УРОК 0 ================= -->
              <div id="chapter-container-modull_0" class="chapter-view ${this.activeChapter === 'modull_0' ? '' : 'hidden'} space-y-3">
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

              <!-- ================= TAB 1: УРОК 1 ================= -->
              <div id="chapter-container-kafli_1" class="chapter-view ${this.activeChapter === 'kafli_1' ? '' : 'hidden'}"></div>

              <!-- ================= TAB 2: УРОК 2 ================= -->
              <div id="chapter-container-drops_lab" class="chapter-view ${this.activeChapter === 'drops_lab' ? '' : 'hidden'}"></div>

              <!-- ================= TAB 3: УРОК 3 ================= -->
              <div id="chapter-container-modull_3" class="chapter-view ${this.activeChapter === 'modull_3' ? '' : 'hidden'}"></div>

              <!-- ================= TAB 4: УРОК 4 ================= -->
              <div id="chapter-container-kafli_4" class="chapter-view ${this.activeChapter === 'kafli_4' ? '' : 'hidden'}"></div>

              <!-- ================= TAB 5: УРОК 5 ================= -->
              <div id="chapter-container-kafli_5" class="chapter-view ${this.activeChapter === 'kafli_5' ? '' : 'hidden'}"></div>

              <!-- ================= TAB 6: УРОК 6 ================= -->
              <div id="chapter-container-kafli_6" class="chapter-view ${this.activeChapter === 'kafli_6' ? '' : 'hidden'}"></div>

              <!-- ================= TAB 7: УРОК 7 ================= -->
              <div id="chapter-container-kafli_7" class="chapter-view ${this.activeChapter === 'kafli_7' ? '' : 'hidden'}"></div>

              <!-- ================= TABS A2.1 - A2.8 ================= -->
              <div id="chapter-container-a2_k1" class="chapter-view ${this.activeChapter === 'a2_k1' ? '' : 'hidden'}"></div>
              <div id="chapter-container-a2_k2" class="chapter-view ${this.activeChapter === 'a2_k2' ? '' : 'hidden'}"></div>
              <div id="chapter-container-a2_k3" class="chapter-view ${this.activeChapter === 'a2_k3' ? '' : 'hidden'}"></div>
              <div id="chapter-container-a2_k4" class="chapter-view ${this.activeChapter === 'a2_k4' ? '' : 'hidden'}"></div>
              <div id="chapter-container-a2_k5" class="chapter-view ${this.activeChapter === 'a2_k5' ? '' : 'hidden'}"></div>
              <div id="chapter-container-a2_k6" class="chapter-view ${this.activeChapter === 'a2_k6' ? '' : 'hidden'}"></div>
              <div id="chapter-container-a2_k7" class="chapter-view ${this.activeChapter === 'a2_k7' ? '' : 'hidden'}"></div>
              <div id="chapter-container-a2_k8" class="chapter-view ${this.activeChapter === 'a2_k8' ? '' : 'hidden'}"></div>

              <!-- ================= TAB B1.1 ================= -->
              <div id="chapter-container-b1_k1" class="chapter-view ${this.activeChapter === 'b1_k1' ? '' : 'hidden'}"></div>

              <!-- ================= TAB SAGA ROADMAP ================= -->
              <div id="chapter-container-saga_map" class="chapter-view ${this.activeChapter === 'saga_map' ? '' : 'hidden'}"></div>

            </div>

          </div>

          <!-- ================= PILLAR 2: ПОДКАСТИ (FULL STUDIO WORKSPACE) ================= -->
          <div id="workspace-podcasts" class="${this.activeGlobalTab === 'podcasts' ? '' : 'hidden'} space-y-4">
            <!-- Populated by UnifiedPodcastPlayer.renderStudio() -->
          </div>

          <!-- ================= PILLAR 3: ІСПИТИ (EXAMS WORKSPACE) ================= -->
          <div id="workspace-exams" class="${this.activeGlobalTab === 'exams' ? '' : 'hidden'} space-y-4">
            <!-- Populated by UnifiedExamsCenter.render() -->
          </div>

          <!-- ================= PILLAR 4: ДЕРЖПОРТАЛИ & BÍN (SOURCES WORKSPACE) ================= -->
          <div id="workspace-sources" class="${this.activeGlobalTab === 'sources' ? '' : 'hidden'} space-y-4">
            <div id="chapter-container-sources_vault"></div>
            <div id="chapter-container-bin_grammar" class="mt-6"></div>
          </div>

        </main>

        <!-- Floating Quick-Access Button for AI Coach -->
        <button id="floating-ai-tutor-btn" class="fixed bottom-5 right-5 z-40 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 text-black font-mono font-black text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-cyan-300 cursor-pointer" title="Відкрити ШІ-Тьютора Árnastofnun">
          <span class="text-base">🤖</span>
          <span class="hidden sm:inline">ШІ-Коуч Árnastofnun</span>
          <span class="sm:hidden font-bold">ШІ</span>
        </button>

        <!-- Modal for AI Tutor -->
        <div id="ai-tutor-modal-overlay" class="fixed inset-0 z-[100] hidden flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md transition-all">
          <div id="ai-modal-backdrop-dismiss" class="absolute inset-0 cursor-pointer"></div>
          <div class="relative w-full max-w-4xl h-[92vh] sm:h-[86vh] max-h-[820px] bg-cyber-deep/98 border border-cyan-500/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 ring-1 ring-cyan-500/30">
            <div id="ai-modal-tutor-mount" class="w-full h-full flex flex-col overflow-hidden"></div>
          </div>
        </div>

      </div>
    `;
  }

  mountComponents() {
    // Mount Saga Roadmap
    const sagaContainer = this.root.querySelector('#chapter-container-saga_map');
    if (sagaContainer) {
      this.components.sagaMap = new SagaRoadmap(sagaContainer, (targetChapter) => {
        this.switchChapter(targetChapter);
      });
      this.components.sagaMap.render();
    }

    // Mount Module 0 sub-components
    const guideContainer = this.root.querySelector('#m0-sec-guide');
    if (guideContainer) {
      this.components.guide = new Module0StudyGuide(guideContainer, () => this.switchM0SubTab('exam'));
      this.components.guide.render();
    }
    const m0FlashcardsContainer = this.root.querySelector('#m0-sec-flashcards');
    if (m0FlashcardsContainer) {
      this.components.m0Flashcards = new FlashcardDeckEngine(m0FlashcardsContainer, 'modull_0');
      this.components.m0Flashcards.render();
    }
    const soundboardContainer = this.root.querySelector('#m0-sec-soundboard');
    if (soundboardContainer) {
      this.components.soundboard = new AlphabetSoundboard(
        soundboardContainer,
        this.dataM0.alphabet,
        this.dataM0.raddstafir_classification
      );
      this.components.soundboard.render();
    }
    const raddstafirContainer = this.root.querySelector('#m0-sec-raddstafir');
    if (raddstafirContainer) {
      this.components.raddstafir = new RaddstafirHub(
        raddstafirContainer,
        this.dataM0.raddstafir_classification
      );
      this.components.raddstafir.render();
    }
    const trapsContainer = this.root.querySelector('#m0-sec-traps');
    if (trapsContainer) {
      this.components.traps = new BaraTalaAcoustics(
        trapsContainer,
        this.dataM0.acoustic_traps
      );
      this.components.traps.render();
    }
    const duelContainer = this.root.querySelector('#m0-sec-duel');
    if (duelContainer) {
      this.components.duel = new MinimalPairDuel(
        duelContainer,
        this.dataM0.minimal_pairs
      );
      this.components.duel.render();
    }
    const builderContainer = this.root.querySelector('#m0-sec-builder');
    if (builderContainer) {
      this.components.builder = new IpaSoundBuilder(
        builderContainer,
        this.dataM0.ipa_sound_builder
      );
      this.components.builder.render();
    }
    const dialogueContainer = this.root.querySelector('#m0-sec-dialogue');
    if (dialogueContainer) {
      this.components.dialogue = new SpeechEtiquette(
        dialogueContainer,
        this.dataM0.dialogue_and_pragmatics
      );
      this.components.dialogue.render();
    }
    const drillsContainer = this.root.querySelector('#m0-sec-drills');
    if (drillsContainer) {
      this.components.drills = new InteractiveDrillEngine(
        drillsContainer,
        this.dataM0.drill_suite
      );
      this.components.drills.render();
    }
    const examContainer = this.root.querySelector('#m0-sec-exam');
    if (examContainer) {
      this.components.exam = new Module0Exam(
        examContainer,
        () => this.switchChapter('kafli_1'),
        () => this.switchM0SubTab('guide')
      );
      this.components.exam.render();
    }

    // Mount Lesson 1
    const k1Container = this.root.querySelector('#chapter-container-kafli_1');
    if (k1Container) {
      this.components.kafli1 = new Kafli1App(k1Container, () => this.switchChapter('drops_lab'));
      this.components.kafli1.render();
    }

    // Mount Lesson 2
    const dropsContainer = this.root.querySelector('#chapter-container-drops_lab');
    if (dropsContainer) {
      this.components.dropsLab = new DropsFlexionLab(dropsContainer, () => this.switchChapter('modull_3'));
      this.components.dropsLab.render();
    }

    // Mount Lesson 3
    const k3Container = this.root.querySelector('#chapter-container-modull_3');
    if (k3Container) {
      this.components.kafli3 = new Kafli3RoutineApp(k3Container);
      this.components.kafli3.render();
    }

    // Mount Lesson 4
    const k4Container = this.root.querySelector('#chapter-container-kafli_4');
    if (k4Container) {
      this.components.kafli4 = new Kafli4ClothingApp(k4Container);
      this.components.kafli4.render();
    }

    // Mount Lesson 5
    const k5Container = this.root.querySelector('#chapter-container-kafli_5');
    if (k5Container) {
      this.components.kafli5 = new Kafli5HealthFamilyApp(k5Container);
      this.components.kafli5.render();
    }

    // Mount Lesson 6
    const k6Container = this.root.querySelector('#chapter-container-kafli_6');
    if (k6Container) {
      this.components.kafli6 = new Kafli6FoodApp(k6Container);
      this.components.kafli6.render();
    }

    // Mount Lesson 7
    const k7Container = this.root.querySelector('#chapter-container-kafli_7');
    if (k7Container) {
      this.components.kafli7 = new Kafli7HobbiesWeatherApp(k7Container);
      this.components.kafli7.render();
    }

    // Mount A2 Lessons
    const a2k1C = this.root.querySelector('#chapter-container-a2_k1');
    if (a2k1C) { this.components.a2_k1 = new A2K1HousingApp(a2k1C); this.components.a2_k1.render(); }

    const a2k2C = this.root.querySelector('#chapter-container-a2_k2');
    if (a2k2C) { this.components.a2_k2 = new A2K2WorkApp(a2k2C); this.components.a2_k2.render(); }

    const a2k3C = this.root.querySelector('#chapter-container-a2_k3');
    if (a2k3C) { this.components.a2_k3 = new A2K3TransportApp(a2k3C); this.components.a2_k3.render(); }

    const a2k4C = this.root.querySelector('#chapter-container-a2_k4');
    if (a2k4C) { this.components.a2_k4 = new A2K4HealthApp(a2k4C); this.components.a2_k4.render(); }

    const a2k5C = this.root.querySelector('#chapter-container-a2_k5');
    if (a2k5C) { this.components.a2_k5 = new A2K5EducationApp(a2k5C); this.components.a2_k5.render(); }

    const a2k6C = this.root.querySelector('#chapter-container-a2_k6');
    if (a2k6C) { this.components.a2_k6 = new A2K6RoutineApp(a2k6C); this.components.a2_k6.render(); }

    const a2k7C = this.root.querySelector('#chapter-container-a2_k7');
    if (a2k7C) { this.components.a2_k7 = new A2K7BankingApp(a2k7C); this.components.a2_k7.render(); }

    const a2k8C = this.root.querySelector('#chapter-container-a2_k8');
    if (a2k8C) { this.components.a2_k8 = new A2K8SocietyApp(a2k8C); this.components.a2_k8.render(); }

    // Mount B1.1
    const b1k1C = this.root.querySelector('#chapter-container-b1_k1');
    if (b1k1C) { this.components.b1_k1 = new B1K1WorkplaceApp(b1k1C); this.components.b1_k1.render(); }

    // Mount Sources & BÍN
    const srcC = this.root.querySelector('#chapter-container-sources_vault');
    if (srcC) { this.components.sourcesVault = new SourcesVaultApp(srcC); this.components.sourcesVault.render(); }

    const binC = this.root.querySelector('#chapter-container-bin_grammar');
    if (binC) { this.components.binGrammar = new BinMorphologyLab(binC); this.components.binGrammar.render(); }

    // Mount AI Coach
    const aiMount = this.root.querySelector('#ai-modal-tutor-mount');
    if (aiMount) {
      this.components.aiTutor = new LocalAITutorPanel(aiMount);
      this.components.aiTutor.render();
    }

    // Mount Podcast Studio
    const podcastStudioContainer = this.root.querySelector('#workspace-podcasts');
    if (podcastStudioContainer) {
      this.podcastPlayer = new UnifiedPodcastPlayer(podcastStudioContainer);
      this.podcastPlayer.renderStudio();
    }

    // Mount Exams Center
    const examsCenterContainer = this.root.querySelector('#workspace-exams');
    if (examsCenterContainer) {
      this.examsCenter = new UnifiedExamsCenter(examsCenterContainer, (targetChapter) => {
        this.switchGlobalPillar('lessons');
        this.switchChapter(targetChapter);
        this.switchLessonSubTab('exam');
      });
      this.examsCenter.render();
    }
  }

  bindGlobalEvents() {
    // 1. Global Pillar Switchers
    this.root.querySelectorAll('.global-pillar-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pillar = btn.dataset.pillar;
        if (pillar) this.switchGlobalPillar(pillar);
      });
    });

    // 2. Level Switcher Buttons
    this.root.querySelectorAll('.level-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const level = btn.dataset.level;
        if (level) this.switchLevel(level);
      });
    });

    // 3. Universal Lesson Sub-Tab Buttons
    this.root.querySelectorAll('.lesson-subtab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sub = btn.dataset.subtab;
        if (sub) this.switchLessonSubTab(sub);
      });
    });

    // 4. Modal AI Tutor triggers
    const openAiBtn = this.root.querySelector('#header-open-ai-btn');
    if (openAiBtn) openAiBtn.addEventListener('click', () => this.openAiTutorModal());

    const floatingAiBtn = this.root.querySelector('#floating-ai-tutor-btn');
    if (floatingAiBtn) floatingAiBtn.addEventListener('click', () => this.openAiTutorModal());

    const backdropDismiss = this.root.querySelector('#ai-modal-backdrop-dismiss');
    if (backdropDismiss) backdropDismiss.addEventListener('click', () => this.closeAiTutorModal());

    // 5. Theme Toggle
    const themeBtn = this.root.querySelector('#theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const newTheme = gameState.toggleTheme();
        const icon = this.root.querySelector('#theme-toggle-icon');
        if (icon) icon.innerText = newTheme === 'light' ? '☀️' : '🌙';
      });
    }

    // 6. Escape key for modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeAiTutorModal();
    });
  }

  // Switch between 4 Core Pillars: lessons, podcasts, exams, sources
  switchGlobalPillar(pillarId) {
    this.activeGlobalTab = pillarId;

    // Update pillar buttons styling
    this.root.querySelectorAll('.global-pillar-btn').forEach(btn => {
      const isTarget = btn.dataset.pillar === pillarId;
      btn.className = isTarget
        ? 'global-pillar-btn px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-md font-extrabold'
        : 'global-pillar-btn px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 bg-black/50 text-slate-400 border-slate-800 hover:text-white';
    });

    // Toggle Block 2 & Block 3 visibility
    const block2 = this.root.querySelector('#block2-lessons-bar');
    const block3 = this.root.querySelector('#block3-subnav-ribbon');
    if (block2) block2.classList.toggle('hidden', pillarId !== 'lessons');
    if (block3) block3.classList.toggle('hidden', pillarId !== 'lessons');

    // Toggle Workspace views
    const wsLessons = this.root.querySelector('#workspace-lessons');
    const wsPodcasts = this.root.querySelector('#workspace-podcasts');
    const wsExams = this.root.querySelector('#workspace-exams');
    const wsSources = this.root.querySelector('#workspace-sources');

    if (wsLessons) wsLessons.classList.toggle('hidden', pillarId !== 'lessons');
    if (wsPodcasts) {
      wsPodcasts.classList.toggle('hidden', pillarId !== 'podcasts');
      if (pillarId === 'podcasts' && this.podcastPlayer) this.podcastPlayer.renderStudio();
    }
    if (wsExams) {
      wsExams.classList.toggle('hidden', pillarId !== 'exams');
      if (pillarId === 'exams' && this.examsCenter) this.examsCenter.render();
    }
    if (wsSources) wsSources.classList.toggle('hidden', pillarId !== 'sources');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Switch Level: A1, A2, B1
  switchLevel(level) {
    this.activeLevel = level;

    // Update level tab button styles
    this.root.querySelectorAll('.level-tab-btn').forEach(btn => {
      const isTarget = btn.dataset.level === level;
      btn.className = isTarget
        ? 'level-tab-btn px-2.5 py-1 rounded-lg font-extrabold border transition-all bg-cyan-500 text-black border-cyan-400 shadow-md'
        : 'level-tab-btn px-2.5 py-1 rounded-lg font-extrabold border transition-all bg-transparent text-slate-300 border-transparent hover:bg-white/10';
    });

    // Select first lesson of the level
    const lvlInfo = CURRICULUM_LEVELS[level];
    if (lvlInfo && lvlInfo.lessons.length > 0) {
      this.switchChapter(lvlInfo.lessons[0].id);
    }

    this.renderLessonPills();
  }

  // Render the Dynamic Lessons Row for activeLevel
  renderLessonPills() {
    const container = this.root.querySelector('#dynamic-lessons-container');
    if (!container) return;

    const lvlInfo = CURRICULUM_LEVELS[this.activeLevel] || CURRICULUM_LEVELS['A1'];

    container.innerHTML = lvlInfo.lessons.map(l => {
      const isTarget = l.id === this.activeChapter;
      return `
        <button data-chapter="${l.id}" class="lesson-pill-btn px-2.5 py-1 rounded-lg font-mono text-xs font-bold transition-all border ${isTarget ? 'bg-cyan-500 text-black border-cyan-400 shadow-md font-extrabold' : 'bg-black/60 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'}" title="${l.fullTitle}">
          ${l.title}
        </button>
      `;
    }).join('');

    // Bind click events on lesson pills
    container.querySelectorAll('.lesson-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.dataset.chapter;
        if (cid) this.switchChapter(cid);
      });
    });
  }

  // Switch to another Lesson
  switchChapter(chapterId) {
    this.activeChapter = chapterId;

    // Detect level from chapterId
    if (chapterId.startsWith('a2_') && this.activeLevel !== 'A2') {
      this.activeLevel = 'A2';
    } else if (chapterId.startsWith('b1_') && this.activeLevel !== 'B1') {
      this.activeLevel = 'B1';
    } else if (!chapterId.startsWith('a2_') && !chapterId.startsWith('b1_') && this.activeLevel !== 'A1') {
      this.activeLevel = 'A1';
    }

    // Refresh Lesson pills in Block 2
    this.renderLessonPills();

    // Update Hero Banner
    this.updateHeroBanner();

    // Toggle Chapter Containers
    this.root.querySelectorAll('.chapter-view').forEach(view => {
      view.classList.add('hidden');
    });

    const activeView = this.root.querySelector(`#chapter-container-${chapterId}`);
    if (activeView) activeView.classList.remove('hidden');

    // Handle Universal Sub-Tab
    this.switchLessonSubTab(this.activeLessonSubTab);
  }

  // Switch Universal Lesson Sub-Tab: podcast, theory, vocab, dialogues, exam
  switchLessonSubTab(subTabId) {
    this.activeLessonSubTab = subTabId;

    // Update subtab button styling
    this.root.querySelectorAll('.lesson-subtab-btn').forEach(btn => {
      const isTarget = btn.dataset.subtab === subTabId;
      btn.className = isTarget
        ? 'lesson-subtab-btn px-3 py-1 rounded-lg border transition-all bg-cyan-500 text-black border-cyan-400 font-extrabold shadow-md flex items-center gap-1.5'
        : 'lesson-subtab-btn px-3 py-1 rounded-lg border transition-all bg-black/60 text-slate-300 border-slate-800 hover:bg-slate-900 flex items-center gap-1.5';
    });

    // Update hero subtab label
    const subLabel = this.root.querySelector('#hero-subtab-label');
    const subNames = {
      'podcast': '1. Подкаст уроку 🎧',
      'theory': '2. Теорія & Правила 📖',
      'vocab': '3. Словник & BÍN 🔤',
      'dialogues': '4. Діалоги & Практика 💬',
      'exam': '5. Іспит уроку 🏆'
    };
    if (subLabel) subLabel.innerText = subNames[subTabId] || subTabId;

    const podcastMount = this.root.querySelector('#lesson-podcast-mount-point');
    const allChapters = this.root.querySelector('#all-chapter-containers');

    if (subTabId === 'podcast') {
      // Show podcast mount, hide standard chapter body
      if (podcastMount) {
        podcastMount.classList.remove('hidden');
        const epKey = LESSON_PODCAST_MAP[this.activeChapter] || '1';
        const lessonPodcastPlayer = new UnifiedPodcastPlayer(podcastMount, { isEmbedded: true });
        lessonPodcastPlayer.renderLessonPlayer(epKey);
      }
      if (allChapters) allChapters.classList.add('hidden');
    } else {
      // Hide podcast mount, show standard chapter body
      if (podcastMount) podcastMount.classList.add('hidden');
      if (allChapters) allChapters.classList.remove('hidden');

      // Dispatch to chapter-specific component actions
      this.dispatchSubTabToChapter(this.activeChapter, subTabId);
    }

    // Re-bind BÍN aurаs
    binAuraSystem.bindEvents(this.root);
  }

  // Dispatch sub-tab to internal component controllers
  dispatchSubTabToChapter(chapterId, subTabId) {
    if (chapterId === 'modull_0') {
      const m0Map = {
        'theory': 'guide',
        'vocab': 'soundboard',
        'dialogues': 'duel',
        'exam': 'exam'
      };
      this.switchM0SubTab(m0Map[subTabId] || 'soundboard');
    } else if (chapterId === 'kafli_1' && this.components.kafli1) {
      const k1Map = { 'theory': 'grammar', 'vocab': 'vocab', 'dialogues': 'dialogues', 'exam': 'exam' };
      if (this.components.kafli1.switchSubTab) this.components.kafli1.switchSubTab(k1Map[subTabId] || 'grammar');
    } else if (chapterId === 'drops_lab' && this.components.dropsLab) {
      const dMap = { 'theory': 'cafe', 'vocab': 'showcase', 'dialogues': 'tray', 'exam': 'exam' };
      if (this.components.dropsLab.switchTab) this.components.dropsLab.switchTab(dMap[subTabId] || 'cafe');
    } else if (chapterId === 'modull_3' && this.components.kafli3) {
      const k3Map = { 'theory': 'v2lab', 'vocab': 'vocab', 'dialogues': 'dialogue', 'exam': 'exam' };
      if (this.components.kafli3.switchTab) this.components.kafli3.switchTab(k3Map[subTabId] || 'v2lab');
    } else {
      // For A2 and other chapters
      const comp = this.components[chapterId];
      if (comp) {
        if (subTabId === 'exam' && comp.examComponent) {
          if (comp.switchTab) comp.switchTab('exam');
        } else if (comp.switchTab) {
          comp.switchTab(subTabId === 'vocab' ? 'vocab' : subTabId === 'dialogues' ? 'dialogues' : 'theory');
        }
      }
    }
  }

  switchM0SubTab(subTabId) {
    this.activeM0SubTab = subTabId;
    this.root.querySelectorAll('.m0-view').forEach(v => v.classList.add('hidden'));
    const target = this.root.querySelector(`#m0-sec-${subTabId}`);
    if (target) target.classList.remove('hidden');

    if (subTabId === 'guide' && this.components.guide) this.components.guide.render();
    else if (subTabId === 'flashcards' && this.components.m0Flashcards) this.components.m0Flashcards.render();
    else if (subTabId === 'duel' && this.components.duel) this.components.duel.render();
    else if (subTabId === 'builder' && this.components.builder) this.components.builder.render();
    else if (subTabId === 'dialogue' && this.components.dialogue) this.components.dialogue.render();
    else if (subTabId === 'raddstafir' && this.components.raddstafir) this.components.raddstafir.render();
    else if (subTabId === 'traps' && this.components.traps) this.components.traps.render();
    else if (subTabId === 'exam' && this.components.exam) this.components.exam.render();
  }

  updateHeroBanner() {
    const heroBadge = this.root.querySelector('#hero-curriculum-badge');
    const heroLevel = this.root.querySelector('#hero-level-badge');
    const heroTitle = this.root.querySelector('#hero-curriculum-title');
    const subnavLessonBadge = this.root.querySelector('#subnav-lesson-badge');

    let lessonObj = null;
    for (const lvl of Object.values(CURRICULUM_LEVELS)) {
      const found = lvl.lessons.find(l => l.id === this.activeChapter);
      if (found) { lessonObj = found; break; }
    }

    if (lessonObj) {
      if (heroBadge) heroBadge.innerText = `УРОК ${lessonObj.num}`;
      if (heroLevel) heroLevel.innerText = lessonObj.level;
      if (heroTitle) heroTitle.innerText = lessonObj.fullTitle;
      if (subnavLessonBadge) subnavLessonBadge.innerText = `${lessonObj.title}`;
    }
  }

  openLessonExam(chapterId) {
    this.switchChapter(chapterId);
    this.switchLessonSubTab('exam');
  }

  openAiTutorModal() {
    const modal = this.root.querySelector('#ai-tutor-modal-overlay');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    const input = modal.querySelector('#ai-chat-input');
    if (input) setTimeout(() => input.focus(), 60);
  }

  closeAiTutorModal() {
    const modal = this.root.querySelector('#ai-tutor-modal-overlay');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  updateDagsamningurBadge() {
    const mount = this.root.querySelector('#header-dagsamningur-mount');
    if (!mount) return;
    const completed = gameState.isTodayContractCompleted();
    mount.innerHTML = `
      <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full ${completed ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-400' : 'bg-rose-950/50 border-rose-500/50 text-rose-400'} border text-[10px] font-mono font-bold shadow-sm" title="Щоденна навчальна угода Dagsamningur">
        <span class="w-1.5 h-1.5 rounded-full ${completed ? 'bg-emerald-400' : 'bg-rose-400 animate-pulse'}"></span>
        <span class="hidden sm:inline">${completed ? 'Dagsamningur ✓' : 'Dagsamningur: 0/20'}</span>
      </div>
    `;
  }

  setupVisualPillNotification() {}
  setupGameStateSubscription() {}
}
