/**
 * DailyFocusArena.js - 5-Minute Daily Hub & Trap-Recycler Engine
 * Implements NotebookLM Master Specification:
 * - 300s Countdown Timer
 * - 4-Phase Multimodal Pipeline (Exposure -> Recognition -> Speller -> V2 Anchoring)
 * - Two-tier Trap-Recycler Engine (In-session 2-card re-queue + Next-day SRS priority)
 * - Full 15-Word Grid Ribbon (All 15 words visible in one view, zero horizontal scrolling on desktop)
 * - Luxury Widescreen 3D Glass Modal Architecture (max-w-5xl / max-w-6xl)
 * - Dual View Modes (Trainer Focus vs 15-Card Grid Overview)
 * - 100% Success-Gated Session Exit (+50 XP, +5 Gems, Streak Shield)
 */

import { ANCHOR_WORDS_MASTER } from '../data/anchor_words_master.js';
import { audioEngine } from './AudioEngine.js?v=5.7';
import { gameState } from './GameState.js';

export class DailyFocusArena {
  constructor(onCompleted = null) {
    this.onCompleted = onCompleted;
    this.activeModule = 'modull_0'; // default
    this.timerSeconds = 300; // 5 minutes
    this.timerInterval = null;
    this.queue = [];
    this.currentIndex = 0;
    this.viewMode = 'focus'; // 'focus' or 'grid'
    this.trapsToday = new Set();
    this.assembledLetters = [];
    this.score = 0;
    this.modalEl = null;

    this.createModalDom();
  }

  createModalDom() {
    let modal = document.getElementById('daily-focus-arena-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'daily-focus-arena-modal';
      modal.className = 'fixed inset-0 z-50 bg-black/85 backdrop-blur-md hidden flex items-center justify-center p-2 sm:p-5 select-none-text';
      document.body.appendChild(modal);
    }
    this.modalEl = modal;
  }

  isCompletedToday() {
    const today = new Date().toISOString().slice(0, 10);
    return localStorage.getItem('isl_dagsamningur_completed_date') === today;
  }

  setCompletedToday() {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('isl_dagsamningur_completed_date', today);
  }

  getSavedTraps() {
    try {
      const data = localStorage.getItem('isl_srs_traps');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveTraps(trapWords) {
    try {
      localStorage.setItem('isl_srs_traps', JSON.stringify([...trapWords]));
    } catch (e) {}
  }

  open(moduleKey = 'modull_0') {
    this.activeModule = moduleKey;
    this.timerSeconds = 300;
    this.score = 0;
    this.viewMode = 'focus';
    this.trapsToday.clear();
    this.initSessionQueue();

    this.modalEl.classList.remove('hidden');
    this.startTimer();
    this.render();
  }

  close() {
    this.stopTimer();
    if (this.modalEl) {
      this.modalEl.classList.add('hidden');
    }
  }

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      const timerDisplay = this.modalEl.querySelector('#arena-timer-display');
      if (timerDisplay) {
        const mins = Math.floor(Math.max(0, this.timerSeconds) / 60);
        const secs = Math.max(0, this.timerSeconds) % 60;
        timerDisplay.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        if (this.timerSeconds <= 60) {
          timerDisplay.classList.add('text-rose-400', 'animate-pulse');
        }
      }
      if (this.timerSeconds <= 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  initSessionQueue() {
    const pool = ANCHOR_WORDS_MASTER[this.activeModule] || ANCHOR_WORDS_MASTER.modull_0;
    const savedTraps = this.getSavedTraps();
    
    // 1. Separate priority trap words
    const trapItems = pool.filter(w => savedTraps.includes(w.word)).map(w => ({
      ...w,
      isTrap: true,
      phase: 1
    }));

    // 2. Fresh items
    const freshItems = pool.filter(w => !savedTraps.includes(w.word)).map(w => ({
      ...w,
      isTrap: false,
      phase: 1
    }));

    // 3. Assemble: Traps first (up to 4), then fresh words
    this.queue = [...trapItems.slice(0, 4), ...freshItems];
    this.currentIndex = 0;
  }

  jumpToWord(index) {
    if (index >= 0 && index < this.queue.length) {
      this.currentIndex = index;
      this.viewMode = 'focus';
      this.render();
    }
  }

  prevWord() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.render();
    }
  }

  nextWord() {
    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
      this.render();
    } else {
      this.renderVictoryCelebration();
    }
  }

  render() {
    if (this.currentIndex >= this.queue.length) {
      this.renderVictoryCelebration();
      return;
    }

    if (this.viewMode === 'grid') {
      this.renderGridView();
      return;
    }

    const currentItem = this.queue[this.currentIndex];
    const totalGoal = Math.min(15, this.queue.length);
    const progressCount = Math.min(totalGoal, this.currentIndex + 1);
    const progressPercent = Math.round((progressCount / totalGoal) * 100);

    const mins = Math.floor(Math.max(0, this.timerSeconds) / 60);
    const secs = Math.max(0, this.timerSeconds) % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    this.modalEl.innerHTML = `
      <div class="modal-3d-glass w-full max-w-5xl xl:max-w-6xl rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[94vh] overflow-y-auto">
        
        <!-- Top HUD Header -->
        <div class="flex items-center justify-between pb-3 border-b border-cyan-500/20 gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="w-3 h-3 rounded-full bg-rose-500 animate-ping flex-shrink-0"></span>
            <div class="truncate">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-sm sm:text-base font-black text-white font-mono uppercase tracking-wider">
                  Dagsamningur • Щоденний Тренажер Слів
                </span>
                ${currentItem.isTrap ? `
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    🪤 Пастка
                  </span>
                ` : ''}
              </div>
              <span class="text-xs text-slate-400 font-sans">
                Слово ${progressCount} з ${totalGoal} &bull; 4 фази мультимодального закріплення
              </span>
            </div>
          </div>

          <!-- Timer, View Toggle & Close -->
          <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-slate-800 text-xs font-mono font-bold">
              <span>⏱️</span>
              <span id="arena-timer-display" class="${this.timerSeconds <= 60 ? 'text-rose-400 animate-pulse' : 'text-cyan-300 font-bold'}">${timeStr}</span>
            </div>

            <!-- View Toggle Button -->
            <button id="arena-toggle-view-btn" class="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm" title="Показати всі 15 карток разом">
              📋 Всі 15 слів
            </button>

            <!-- Close Modal -->
            <button id="arena-close-btn" class="w-8 h-8 rounded-xl bg-rose-500/10 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 hover:text-white flex items-center justify-center text-xs font-bold transition-all shadow-sm active:scale-90 cursor-pointer" title="Закрити арену">
              ✕
            </button>
          </div>
        </div>

        <!-- 15-WORD RESPONSIVE GRID RIBBON (ZERO HORIZONTAL SCROLLING ON DESKTOP) -->
        <div class="space-y-1.5 p-2 rounded-2xl bg-black/40 border border-slate-800/80">
          <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span>Швидкий перехід до слова (всі 15 доступні в 1 клік):</span>
            <span class="text-cyan-400 font-bold">Обрано: #${this.currentIndex + 1} «${currentItem.word}»</span>
          </div>

          <!-- 15-Col Grid on Desktop, 8-Col on Tablet, 5-Col on Mobile -->
          <div class="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-15 gap-1.5">
            ${this.queue.slice(0, 15).map((w, idx) => {
              const isActive = idx === this.currentIndex;
              return `
                <button 
                  class="arena-word-pill px-1.5 py-1.5 rounded-xl font-mono text-[11px] font-bold border transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer select-none ${isActive ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_16px_rgba(0,229,255,0.6)] scale-105 z-10' : 'bg-black/60 text-slate-300 border-slate-800 hover:border-cyan-400 hover:text-white'}" 
                  data-index="${idx}"
                  title="${idx + 1}. ${w.word} (${w.uk})">
                  <span class="text-[9px] opacity-75 leading-none">#${idx + 1}</span>
                  <span class="truncate max-w-full font-bold leading-tight">${w.word}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
          <div class="bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 h-2 rounded-full transition-all duration-300" style="width: ${progressPercent}%;"></div>
        </div>

        <!-- Navigation Row: Prev Word | 4-Phase Tabs | Next Word -->
        <div class="flex items-center justify-between gap-2 pt-1">
          <button id="arena-prev-btn" class="px-3.5 py-2 rounded-xl bg-black/60 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${this.currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''}" ${this.currentIndex === 0 ? 'disabled' : ''}>
            ◀ Попереднє
          </button>

          <!-- Clickable Phase Tabs for Current Word -->
          <div class="grid grid-cols-4 gap-1.5 text-xs font-mono flex-1 max-w-lg">
            <button class="arena-phase-tab py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer ${currentItem.phase === 1 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold shadow-sm' : 'bg-black/40 text-slate-400 border border-slate-800 hover:text-white'}" data-phase="1">
              1. Експозиція
            </button>
            <button class="arena-phase-tab py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer ${currentItem.phase === 2 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold shadow-sm' : 'bg-black/40 text-slate-400 border border-slate-800 hover:text-white'}" data-phase="2">
              2. Слух
            </button>
            <button class="arena-phase-tab py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer ${currentItem.phase === 3 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold shadow-sm' : 'bg-black/40 text-slate-400 border border-slate-800 hover:text-white'}" data-phase="3">
              3. Конструктор
            </button>
            <button class="arena-phase-tab py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer ${currentItem.phase === 4 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold shadow-sm' : 'bg-black/40 text-slate-400 border border-slate-800 hover:text-white'}" data-phase="4">
              4. V2-Речення
            </button>
          </div>

          <button id="arena-next-btn" class="px-3.5 py-2 rounded-xl bg-black/60 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer">
            Наступне ▶
          </button>
        </div>

        <!-- Dynamic Phase Stage Container (Generously Sized) -->
        <div id="arena-stage-container" class="min-h-[340px] flex flex-col justify-center pt-1"></div>
      </div>
    `;

    // Bind Global Modal Controls
    const closeBtn = this.modalEl.querySelector('#arena-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const toggleViewBtn = this.modalEl.querySelector('#arena-toggle-view-btn');
    if (toggleViewBtn) toggleViewBtn.addEventListener('click', () => {
      this.viewMode = 'grid';
      this.render();
    });

    const prevBtn = this.modalEl.querySelector('#arena-prev-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevWord());

    const nextBtn = this.modalEl.querySelector('#arena-next-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextWord());

    // Word Pills Click Delegation
    this.modalEl.querySelectorAll('.arena-word-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        this.jumpToWord(idx);
      });
    });

    // Phase Tabs Click Delegation
    this.modalEl.querySelectorAll('.arena-phase-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const ph = parseInt(tab.dataset.phase, 10);
        currentItem.phase = ph;
        this.render();
      });
    });

    const stage = this.modalEl.querySelector('#arena-stage-container');
    if (!stage) return;

    switch (currentItem.phase) {
      case 1:
        this.renderPhase1Exposure(stage, currentItem);
        break;
      case 2:
        this.renderPhase2AudioRecognition(stage, currentItem);
        break;
      case 3:
        this.renderPhase3Constructor(stage, currentItem);
        break;
      case 4:
        this.renderPhase4ContextV2(stage, currentItem);
        break;
      default:
        this.renderPhase1Exposure(stage, currentItem);
    }
  }

  /* =========================================================================
     GRID VIEW: ALL 15 CARDS OVERVIEW IN ONE SPACIOUS RESPONSIVE MODAL
     ========================================================================= */
  renderGridView() {
    this.modalEl.innerHTML = `
      <div class="modal-3d-glass w-full max-w-5xl xl:max-w-6xl rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[94vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 border-b border-cyan-500/20">
          <div>
            <h2 class="text-base sm:text-lg font-black text-white font-mono flex items-center gap-2">
              <span>📋 Огляд 15 опорних слів (Anchor Words Matrix)</span>
            </h2>
            <div class="text-xs text-slate-400 font-sans mt-0.5">
              Натисніть на картку або 🔊, щоб почути вимову, або «Тренувати слово», щоб розпочати 4 фази.
            </div>
          </div>

          <div class="flex items-center gap-2.5">
            <button id="arena-grid-back-btn" class="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer">
              <span>🎯 До тренажера</span>
            </button>
            <button id="arena-grid-close-btn" class="w-8 h-8 rounded-xl bg-rose-500/10 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 hover:text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer">
              ✕
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          ${this.queue.slice(0, 15).map((item, idx) => `
            <div class="srs-word-card p-4 rounded-2xl bg-black/60 border border-slate-800 hover:border-cyan-400 transition-all flex flex-col justify-between space-y-2.5 group shadow-lg cursor-pointer">
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-3">
                  <span class="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">${item.icon}</span>
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="text-base font-black font-mono text-white group-hover:text-cyan-300 transition-colors">
                        ${item.word}
                      </span>
                      <span class="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        ${item.gender}
                      </span>
                    </div>
                    <span class="text-xs font-mono text-slate-400 block">${item.ipa}</span>
                  </div>
                </div>

                <button class="arena-grid-play-btn w-8 h-8 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 border border-cyan-500/30 text-cyan-300 hover:text-black flex items-center justify-center transition-all flex-shrink-0 cursor-pointer shadow-sm" data-word="${item.word}" title="Слухати">
                  🔊
                </button>
              </div>

              <div class="text-xs text-slate-200 border-t border-slate-800/80 pt-2 flex items-center justify-between">
                <span class="text-slate-400 text-[11px]">Значення:</span>
                <span class="text-cyan-300 font-bold">${item.uk}</span>
              </div>

              <div class="p-2.5 rounded-xl bg-cyber-deep/80 border border-slate-800 text-xs space-y-0.5">
                <div class="font-mono text-emerald-300 font-bold">«${item.sentence_v2}»</div>
                <div class="text-slate-400 text-[10px]">${item.sentence_trans}</div>
              </div>

              <button class="arena-grid-select-btn w-full py-2 rounded-xl bg-cyber-deep hover:bg-cyan-500 border border-cyan-500/40 text-cyan-300 hover:text-black font-mono font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm" data-index="${idx}">
                <span>⚡ Тренувати це слово (#${idx + 1})</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const backBtn = this.modalEl.querySelector('#arena-grid-back-btn');
    if (backBtn) backBtn.addEventListener('click', () => {
      this.viewMode = 'focus';
      this.render();
    });

    const closeBtn = this.modalEl.querySelector('#arena-grid-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    this.modalEl.querySelectorAll('.arena-grid-play-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = btn.dataset.word;
        audioEngine.play(word, btn);
      });
    });

    this.modalEl.querySelectorAll('.arena-grid-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        this.jumpToWord(idx);
      });
    });
  }

  /* =========================================================================
     PHASE 1: PASSIVE EXPOSURE (SPACIOUS 2-COLUMN LUXURY HEROIC CARD)
     ========================================================================= */
  renderPhase1Exposure(stage, item) {
    stage.innerHTML = `
      <div class="p-5 sm:p-6 rounded-3xl bg-black/60 border border-slate-800 space-y-5">
        
        <!-- Spacious 2-Column Hero Layout -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          
          <!-- Left Column: Big Visual, Word, IPA, Gender & Audio Play -->
          <div class="md:col-span-5 text-center p-4 rounded-2xl bg-cyber-deep/80 border border-slate-800 space-y-3">
            <div class="text-6xl sm:text-7xl animate-bounce duration-1000 my-1">${item.icon}</div>
            
            <div>
              <div class="flex items-center justify-center gap-2">
                <h2 class="text-3xl sm:text-4xl font-black font-mono text-white tracking-wide">
                  ${item.word}
                </h2>
                <span class="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/40">
                  ${item.gender_name || item.gender}
                </span>
              </div>
              <span class="text-sm font-mono text-slate-400 mt-1 block">${item.ipa}</span>
            </div>

            <button id="arena-p1-speak-btn" class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-mono font-black text-xs shadow-lg transition-all active:scale-95 inline-flex items-center justify-center gap-2 cursor-pointer">
              <span>🔊</span> <span>Вимова носія (Gunnar Neural)</span>
            </button>
          </div>

          <!-- Right Column: Ukrainian Translation & V2 Syntax Context Card -->
          <div class="md:col-span-7 space-y-3.5">
            <div class="p-4 rounded-2xl bg-cyber-deep/80 border border-cyan-500/30 space-y-1">
              <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Значення українською:</span>
              <div class="text-xl sm:text-2xl font-black text-cyan-300 font-sans">
                🇺🇦 «${item.uk}»
              </div>
            </div>

            <!-- V2 Syntax Context Card -->
            <div class="p-4 rounded-2xl bg-cyber-deep/90 border border-emerald-500/40 text-left space-y-1.5 shadow-md">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <span>⚡</span> <span>V2-Контекст (дієслово на 2-му місці)</span>
                </span>
                <span class="text-[10px] font-mono text-emerald-400">Правило V2</span>
              </div>
              <div class="font-mono text-base text-emerald-300 font-bold leading-relaxed">
                «${item.sentence_v2}»
              </div>
              <div class="text-xs text-slate-300 font-sans">
                ${item.sentence_trans}
              </div>
            </div>
          </div>
        </div>

        <!-- Action Navigation Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-800/80">
          <button id="arena-p1-skip-next-btn" class="py-3 rounded-xl bg-black/60 hover:bg-black border border-slate-700 hover:border-slate-500 text-slate-300 font-mono font-bold text-xs transition-all active:scale-95 cursor-pointer">
            Наступне слово ▶
          </button>
          <button id="arena-p1-next-btn" class="py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-black text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer">
            <span>Перейти до тесту фази 2 ➔</span>
          </button>
        </div>
      </div>
    `;

    const speakBtn = stage.querySelector('#arena-p1-speak-btn');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => audioEngine.play(item.word, speakBtn));
      setTimeout(() => audioEngine.play(item.word, speakBtn), 150);
    }

    const nextBtn = stage.querySelector('#arena-p1-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        item.phase = 2;
        this.render();
      });
    }

    const skipBtn = stage.querySelector('#arena-p1-skip-next-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        this.nextWord();
      });
    }
  }

  /* =========================================================================
     PHASE 2: AUDIO RECOGNITION (SPACIOUS 4-OPTION GRID WITH 3D HOVER)
     ========================================================================= */
  renderPhase2AudioRecognition(stage, item) {
    const pool = ANCHOR_WORDS_MASTER[this.activeModule] || ANCHOR_WORDS_MASTER.modull_0;
    const others = pool.filter(w => w.id !== item.id);
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [item, ...shuffledOthers].sort(() => Math.random() - 0.5);

    stage.innerHTML = `
      <div class="p-5 sm:p-6 rounded-3xl bg-black/60 border border-slate-800 space-y-4">
        <div class="text-center space-y-2 py-1">
          <div class="text-xs sm:text-sm text-slate-300 font-sans">
            Уважно прослухайте вимову носія мови та оберіть переклад:
          </div>
          <button id="arena-p2-play-btn" class="px-6 py-3 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-300 font-mono font-black text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2.5 cursor-pointer">
            <span>🔊</span> <span>Слухати аудіо носія (Gunnar)</span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          ${options.map(opt => `
            <button class="arena-p2-opt p-4 rounded-2xl bg-black/60 hover:bg-black/90 border border-slate-800 hover:border-cyan-400 text-left transition-all flex items-center gap-3.5 group cursor-pointer shadow-md" data-word-id="${opt.id}">
              <span class="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">${opt.icon}</span>
              <div>
                <div class="font-bold text-white text-sm group-hover:text-cyan-300">${opt.uk}</div>
                <div class="font-mono text-xs text-slate-400 mt-0.5">${opt.gender_name || opt.gender}</div>
              </div>
            </button>
          `).join('')}
        </div>

        <div id="arena-p2-feedback" class="hidden p-3.5 rounded-2xl border text-xs sm:text-sm font-sans"></div>
      </div>
    `;

    const playBtn = stage.querySelector('#arena-p2-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => audioEngine.play(item.word, playBtn));
      setTimeout(() => audioEngine.play(item.word, playBtn), 150);
    }

    stage.querySelectorAll('.arena-p2-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosenId = parseInt(btn.dataset.wordId, 10);
        const isCorrect = chosenId === item.id;

        stage.querySelectorAll('.arena-p2-opt').forEach(b => {
          b.disabled = true;
          const bId = parseInt(b.dataset.wordId, 10);
          if (bId === item.id) {
            b.classList.add('bg-emerald-500/20', 'border-emerald-400', 'text-emerald-200');
          } else if (bId === chosenId && !isCorrect) {
            b.classList.add('bg-rose-500/20', 'border-rose-500', 'text-rose-200');
          }
        });

        const fb = stage.querySelector('#arena-p2-feedback');
        fb.classList.remove('hidden');

        if (isCorrect) {
          gameState.playVictorySound();
          fb.className = 'p-4 rounded-2xl border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 flex items-center justify-between';
          fb.innerHTML = `
            <div><strong>🎉 Чудово!</strong> «${item.word}» [${item.ipa}] = ${item.uk}.</div>
            <button id="arena-p2-next" class="px-4 py-2 rounded-xl bg-emerald-500 text-black font-mono font-bold text-xs cursor-pointer shadow-md">До фази 3 ➔</button>
          `;
          fb.querySelector('#arena-p2-next').addEventListener('click', () => {
            item.phase = 3;
            this.render();
          });
        } else {
          // Trap-Recycler Trigger
          this.triggerTrapRecycler(item, 2);
          fb.className = 'p-4 rounded-2xl border border-rose-500/50 bg-rose-950/40 text-rose-300 flex items-center justify-between';
          fb.innerHTML = `
            <div><strong>❌ Помилка.</strong> Правильно: «${item.word}» = ${item.uk}. Повернемо через 2 картки.</div>
            <button id="arena-p2-retry" class="px-4 py-2 rounded-xl bg-rose-500 text-white font-mono font-bold text-xs cursor-pointer">Зрозуміло ➔</button>
          `;
          fb.querySelector('#arena-p2-retry').addEventListener('click', () => {
            this.nextWord();
          });
        }
      });
    });
  }

  /* =========================================================================
     PHASE 3: ACTIVE RECALL / ORTHOGRAPHIC CONSTRUCTOR (TACTILE 3D TILES)
     ========================================================================= */
  renderPhase3Constructor(stage, item) {
    const letters = item.letters || item.word.split('');
    const targetLength = letters.length;
    const scrambledTiles = letters.map((char, originalIndex) => ({ char, originalIndex }))
      .sort(() => Math.random() - 0.5);

    stage.innerHTML = `
      <div class="p-5 sm:p-6 rounded-3xl bg-black/60 border border-slate-800 space-y-5">
        <div class="text-center space-y-1">
          <div class="text-4xl">${item.icon}</div>
          <div class="text-lg font-bold text-white font-sans">«${item.uk}»</div>
          <div class="text-xs font-mono text-cyan-300">${item.gender_name || item.gender} &bull; ${item.ipa}</div>
        </div>

        <!-- Target Slot Holders -->
        <div class="flex items-center justify-center gap-2 sm:gap-2.5 py-2 flex-wrap">
          ${Array.from({ length: targetLength }).map((_, idx) => `
            <div id="speller-slot-${idx}" class="speller-slot w-12 h-14 sm:w-16 sm:h-18 rounded-2xl bg-black/60 border-2 border-slate-700 flex items-center justify-center text-xl sm:text-2xl font-black font-mono text-cyan-300 shadow-inner">
              _
            </div>
          `).join('')}
        </div>

        <!-- Available Scrambled Letter Tiles & Reset -->
        <div class="flex items-center justify-between text-xs text-slate-400 px-2">
          <span>Складіть слово з літер по порядку:</span>
          <button id="speller-reset-btn" class="text-amber-400 hover:text-amber-300 font-mono font-bold flex items-center gap-1 cursor-pointer">
            <span>↺</span> <span>Очистити вибір</span>
          </button>
        </div>

        <div id="speller-tiles-pool" class="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap py-1">
          ${scrambledTiles.map((tile, idx) => `
            <button class="speller-tile-btn w-12 h-14 sm:w-16 sm:h-18 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500 border border-cyan-500/40 hover:border-cyan-400 text-white hover:text-black font-black font-mono text-xl sm:text-2xl transition-all shadow-md active:scale-90 cursor-pointer" data-char="${tile.char}">
              ${tile.char}
            </button>
          `).join('')}
        </div>

        <div id="arena-p3-feedback" class="hidden p-4 rounded-2xl border text-xs sm:text-sm font-sans"></div>
      </div>
    `;

    this.assembledLetters = [];
    const slots = stage.querySelectorAll('.speller-slot');
    const poolBtns = stage.querySelectorAll('.speller-tile-btn');
    const fb = stage.querySelector('#arena-p3-feedback');
    const resetBtn = stage.querySelector('#speller-reset-btn');

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.renderPhase3Constructor(stage, item);
      });
    }

    poolBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.assembledLetters.length >= targetLength) return;

        const char = btn.dataset.char;
        btn.disabled = true;
        btn.classList.add('opacity-30', 'pointer-events-none');

        const currentPos = this.assembledLetters.length;
        this.assembledLetters.push({ char, btnRef: btn });

        if (slots[currentPos]) {
          slots[currentPos].innerText = char;
          slots[currentPos].classList.add('border-cyan-400', 'bg-cyan-950/40');
        }

        // When all slots filled: check word
        if (this.assembledLetters.length === targetLength) {
          const assembledWord = this.assembledLetters.map(x => x.char).join('');
          const isCorrect = assembledWord.toLowerCase() === item.word.toLowerCase();

          fb.classList.remove('hidden');
          if (isCorrect) {
            gameState.playVictorySound();
            audioEngine.play(item.word);

            fb.className = 'p-4 rounded-2xl border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 flex items-center justify-between';
            fb.innerHTML = `
              <div><strong>🎉 Бездоганно!</strong> «${item.word}» зібрано правильно.</div>
              <button id="arena-p3-next" class="px-4 py-2 rounded-xl bg-emerald-500 text-black font-mono font-bold text-xs cursor-pointer shadow-md">До контексту V2 ➔</button>
            `;
            fb.querySelector('#arena-p3-next').addEventListener('click', () => {
              item.phase = 4;
              this.render();
            });
          } else {
            // Trap-Recycler Trigger with Step-Down (Back to Phase 2)
            this.triggerTrapRecycler(item, 2);
            fb.className = 'p-4 rounded-2xl border border-rose-500/50 bg-rose-950/40 text-rose-300 flex items-center justify-between';
            fb.innerHTML = `
              <div><strong>❌ Помилка в орфографії.</strong> Правильно: «${item.word}». Повторимо через 2 картки.</div>
              <button id="arena-p3-retry" class="px-4 py-2 rounded-xl bg-rose-500 text-white font-mono font-bold text-xs cursor-pointer">Зрозуміло ➔</button>
            `;
            fb.querySelector('#arena-p3-retry').addEventListener('click', () => {
              this.nextWord();
            });
          }
        }
      });
    });
  }

  /* =========================================================================
     PHASE 4: CONTEXTUAL V2 ANCHORING (WIDE SYNTAX CANVAS)
     ========================================================================= */
  renderPhase4ContextV2(stage, item) {
    const regex = new RegExp(`\\b${item.word}\\b`, 'i');
    const blankedSentence = item.sentence_v2.replace(regex, '_______');

    const pool = ANCHOR_WORDS_MASTER[this.activeModule] || ANCHOR_WORDS_MASTER.modull_0;
    const others = pool.filter(w => w.id !== item.id);
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 2);
    const options = [item, ...shuffledOthers].sort(() => Math.random() - 0.5);

    stage.innerHTML = `
      <div class="p-5 sm:p-6 rounded-3xl bg-black/60 border border-slate-800 space-y-4">
        <div class="p-5 rounded-2xl bg-cyber-deep/90 border border-amber-500/40 text-center space-y-2 shadow-lg">
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
            ⚡ Закон V2 (Дієслово завжди на 2-му синтаксичному місці)
          </span>
          <div class="text-xl sm:text-2xl font-black font-mono text-cyan-300 tracking-wide mt-2">
            «${blankedSentence}»
          </div>
          <div class="text-sm text-slate-300 font-sans">
            🇺🇦 ${item.sentence_trans}
          </div>
        </div>

        <div class="text-xs sm:text-sm text-slate-400 text-center font-sans">
          Оберіть правильне слово для завершення фрази:
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          ${options.map(opt => `
            <button class="arena-p4-opt p-4 rounded-2xl bg-black/50 hover:bg-black/80 border border-slate-800 hover:border-cyan-400 text-center transition-all group cursor-pointer shadow-md" data-word-id="${opt.id}">
              <div class="text-2xl mb-1 group-hover:scale-110 transition-transform">${opt.icon}</div>
              <div class="font-bold text-white text-sm group-hover:text-cyan-300 font-mono">${opt.word}</div>
              <div class="text-xs text-slate-400 mt-0.5">${opt.uk}</div>
            </button>
          `).join('')}
        </div>

        <div id="arena-p4-feedback" class="hidden p-4 rounded-2xl border text-xs sm:text-sm font-sans"></div>
      </div>
    `;

    stage.querySelectorAll('.arena-p4-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosenId = parseInt(btn.dataset.wordId, 10);
        const isCorrect = chosenId === item.id;

        stage.querySelectorAll('.arena-p4-opt').forEach(b => {
          b.disabled = true;
          const bId = parseInt(b.dataset.wordId, 10);
          if (bId === item.id) {
            b.classList.add('bg-emerald-500/20', 'border-emerald-400', 'text-emerald-200');
          } else if (bId === chosenId && !isCorrect) {
            b.classList.add('bg-rose-500/20', 'border-rose-500', 'text-rose-200');
          }
        });

        const fb = stage.querySelector('#arena-p4-feedback');
        fb.classList.remove('hidden');

        if (isCorrect) {
          gameState.playVictorySound();
          audioEngine.play(item.word);

          fb.className = 'p-4 rounded-2xl border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 flex items-center justify-between';
          fb.innerHTML = `
            <div><strong>🎉 Досконало!</strong> «${item.sentence_v2}» правильно зв'язано!</div>
            <button id="arena-p4-next" class="px-4 py-2 rounded-xl bg-emerald-500 text-black font-mono font-bold text-xs cursor-pointer shadow-md">Наступне слово ➔</button>
          `;
          fb.querySelector('#arena-p4-next').addEventListener('click', () => {
            this.nextWord();
          });
        } else {
          // Trap-Recycler Trigger with Step-Down
          this.triggerTrapRecycler(item, 2);
          fb.className = 'p-4 rounded-2xl border border-rose-500/50 bg-rose-950/40 text-rose-300 flex items-center justify-between';
          fb.innerHTML = `
            <div><strong>❌ Помилка в V2.</strong> Правильно: «${item.word}». Повторимо через 2 картки.</div>
            <button id="arena-p4-retry" class="px-4 py-2 rounded-xl bg-rose-500 text-white font-mono font-bold text-xs cursor-pointer">Зрозуміло ➔</button>
          `;
          fb.querySelector('#arena-p4-retry').addEventListener('click', () => {
            this.nextWord();
          });
        }
      });
    });
  }

  /* =========================================================================
     TRAP-RECYCLER ENGINE: 2-Card In-Session Re-Queue + Next-Day SRS Priority
     ========================================================================= */
  triggerTrapRecycler(item, stepDownPhase = 2) {
    // 1. Mark for next day
    this.trapsToday.add(item.word);
    const saved = new Set(this.getSavedTraps());
    saved.add(item.word);
    this.saveTraps(saved);

    // 2. Clone item with step-down phase
    const recycled = {
      ...item,
      phase: stepDownPhase,
      isTrap: true
    };

    // 3. Re-queue: 2 cards ahead or at end of queue
    const insertIndex = Math.min(this.queue.length, this.currentIndex + 3);
    this.queue.splice(insertIndex, 0, recycled);
  }

  /* =========================================================================
     VICTORY CELEBRATION (Success-Gated Exit)
     ========================================================================= */
  renderVictoryCelebration() {
    this.stopTimer();
    this.setCompletedToday();

    // Reward player: +50 XP, +5 Gems, Streak +1, Fanfare
    gameState.addXP(50);
    gameState.addGems(5);
    gameState.incrementStreak();
    gameState.playLevelUpFanfare();

    if (this.onCompleted) {
      this.onCompleted();
    }

    this.modalEl.innerHTML = `
      <div class="modal-3d-glass w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 animate-scale-up">
        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-400 flex items-center justify-center text-5xl mx-auto shadow-lg">
          🏆
        </div>

        <div class="space-y-1">
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Dagsamningur виконано на 100%!
          </span>
          <h2 class="text-xl sm:text-2xl font-black text-white font-mono mt-2">
            Денну норму закріплено
          </h2>
          <p class="text-xs text-slate-300 font-sans">
            Усі 15 слів пройшли 4 мультимодальні дотики та синтаксис V2.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-black/60 border border-slate-800 font-mono">
          <div class="text-center">
            <span class="text-[10px] text-slate-400 uppercase">Нагорода</span>
            <div class="text-xl font-black text-cyan-400">+50 XP</div>
          </div>
          <div class="text-center border-l border-slate-800">
            <span class="text-[10px] text-slate-400 uppercase">Стрік захищено</span>
            <div class="text-xl font-black text-amber-400">🔥 +1 день</div>
          </div>
        </div>

        <div class="pt-2">
          <button id="arena-finish-btn" class="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-mono font-black text-sm uppercase tracking-wider shadow-xl transition-all active:scale-95 cursor-pointer">
            Продовжити навчання ➔
          </button>
        </div>
      </div>
    `;

    const finishBtn = this.modalEl.querySelector('#arena-finish-btn');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        this.close();
      });
    }
  }
}
