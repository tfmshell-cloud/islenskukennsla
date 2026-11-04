/**
 * DailyFocusArena.js - 5-Minute Daily Hub & Trap-Recycler SRS Engine
 * Implements NotebookLM Master Specification:
 * - 300s Countdown Timer
 * - 4-Phase Multimodal Pipeline (Exposure -> Recognition -> Speller -> V2 Anchoring)
 * - Two-tier Trap-Recycler Engine (In-session 2-card re-queue + Next-day SRS priority)
 * - Success-Gated Error Mastery Round (Unmastered words loop until 100% learned)
 * - Explicit Review Mode (🔁 Повторення слів anytime)
 * - 15-Word Non-Scrolling Responsive Grid Ribbon with Status Badges (✓ Mastered, 🪤 Needs Review)
 * - Full Light/Dark Dual-Theme Support (High Contrast & Crystal Clarity)
 * - +50 XP, +5 Gems, Streak Shield on 100% Victory
 */

import { ANCHOR_WORDS_MASTER } from '../data/anchor_words_master.js?v=7.0';
import { audioEngine } from './AudioEngine.js?v=7.0';
import { gameState } from './GameState.js?v=7.0';

export class DailyFocusArena {
  constructor(onCompleted = null) {
    this.onCompleted = onCompleted;
    this.activeModule = 'modull_0';
    this.timerSeconds = 300; // 5 minutes
    this.timerInterval = null;
    this.queue = [];
    this.currentIndex = 0;
    this.viewMode = 'focus'; // 'focus' or 'grid'
    this.trapsToday = new Set();
    this.masteredWords = new Set();
    this.errorWords = new Set();
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

  open(moduleKey = 'modull_0', forceReview = false) {
    this.activeModule = moduleKey;
    this.timerSeconds = 300;
    this.score = 0;
    this.viewMode = 'focus';
    this.trapsToday.clear();
    this.masteredWords.clear();
    this.errorWords.clear();
    this.initSessionQueue(forceReview);

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

  initSessionQueue(isReview = false) {
    const pool = ANCHOR_WORDS_MASTER[this.activeModule] || ANCHOR_WORDS_MASTER.modull_0;
    const savedTraps = this.getSavedTraps();
    
    // 1. Separate priority trap words (SRS macro-loop)
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

    // 3. Traps first (up to 4), then fresh items to complete 15
    this.queue = [...trapItems.slice(0, 4), ...freshItems];
    this.currentIndex = 0;
  }

  startErrorMasteryRound(unmasteredWords) {
    this.queue = unmasteredWords.map(w => ({
      ...w,
      isTrap: true,
      phase: 2 // Start directly with Audio/Speller recognition
    }));
    this.currentIndex = 0;
    this.render();
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
      this.checkSessionCompletion();
    }
  }

  checkSessionCompletion() {
    const pool = ANCHOR_WORDS_MASTER[this.activeModule] || ANCHOR_WORDS_MASTER.modull_0;
    // Check if any words still have pending errors or remain unmastered
    const unmastered = pool.filter(w => !this.masteredWords.has(w.word) || this.errorWords.has(w.word));

    if (unmastered.length > 0) {
      // Trigger Trap-Recycler Mastery Round!
      this.renderErrorMasteryPrompt(unmastered);
    } else {
      this.renderVictoryCelebration();
    }
  }

  renderErrorMasteryPrompt(unmasteredWords) {
    this.modalEl.innerHTML = `
      <div class="modal-3d-glass w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 animate-scale-up">
        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-rose-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl mx-auto shadow-lg">
          🪤
        </div>

        <div class="space-y-2">
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            SRS Trap-Recycler: Закріплення Помилок
          </span>
          <h2 class="text-xl sm:text-2xl font-black arena-word-heading font-mono mt-2">
            Раунд подолання пасток (${unmasteredWords.length} ${unmasteredWords.length === 1 ? 'слово' : 'слова'})
          </h2>
          <p class="text-xs text-slate-400 font-sans leading-relaxed">
            За методикою EdTech, слово не покидає сесію, доки ви не назвете його правильно без помилок. 
            Повторімо проблемні слова зараз, щоб закрити сесію на 100%!
          </p>
        </div>

        <div class="p-3.5 rounded-2xl arena-trans-panel text-left space-y-2">
          <div class="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
            Слова, що потребують повторення:
          </div>
          <div class="flex flex-wrap gap-2">
            ${unmasteredWords.map(w => `
              <span class="px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center gap-1.5">
                <span>${w.icon}</span> <span>${w.word}</span> <span class="text-[10px] opacity-75">(${w.uk})</span>
              </span>
            `).join('')}
          </div>
        </div>

        <div class="pt-2">
          <button id="arena-start-mastery-btn" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all active:scale-95 cursor-pointer">
            Почати раунд закріплення ➔
          </button>
        </div>
      </div>
    `;

    const btn = this.modalEl.querySelector('#arena-start-mastery-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        this.startErrorMasteryRound(unmasteredWords);
      });
    }
  }

  render() {
    if (this.currentIndex >= this.queue.length) {
      this.checkSessionCompletion();
      return;
    }

    if (this.viewMode === 'grid') {
      this.renderGridView();
      return;
    }

    const currentItem = this.queue[this.currentIndex];
    const pool = ANCHOR_WORDS_MASTER[this.activeModule] || ANCHOR_WORDS_MASTER.modull_0;
    const totalGoal = 15;
    const masteredCount = pool.filter(w => this.masteredWords.has(w.word) && !this.errorWords.has(w.word)).length;
    const progressPercent = Math.round((masteredCount / totalGoal) * 100);

    const mins = Math.floor(Math.max(0, this.timerSeconds) / 60);
    const secs = Math.max(0, this.timerSeconds) % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    this.modalEl.innerHTML = `
      <div class="modal-3d-glass w-full rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[94vh] overflow-y-auto" style="width: min(96vw, 1180px) !important; max-width: 1180px !important;">
        
        <!-- Top HUD Header -->
        <div class="flex items-center justify-between pb-3 border-b border-cyan-500/20 gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="w-3 h-3 rounded-full bg-rose-500 animate-ping flex-shrink-0"></span>
            <div class="truncate">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-sm sm:text-base font-black arena-word-heading font-mono uppercase tracking-wider">
                  Dagsamningur • Щоденний Тренажер Слів
                </span>
                ${currentItem.isTrap || this.errorWords.has(currentItem.word) ? `
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    🪤 Повтор помилки
                  </span>
                ` : ''}
              </div>
              <span class="text-xs text-slate-400 font-sans">
                Засвоєно: <strong class="text-emerald-400 font-mono">${masteredCount}/15</strong> слів &bull; 4 фази мультимодального закріплення
              </span>
            </div>
          </div>

          <!-- Timer, Review Restart, View Toggle & Close -->
          <div class="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            <!-- 5-min Countdown Timer -->
            <div class="arena-hud-box flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold shadow-sm">
              <span>⏱️</span>
              <span id="arena-timer-display" class="${this.timerSeconds <= 60 ? 'text-rose-400 animate-pulse' : 'text-cyan-400 font-bold'}">${timeStr}</span>
            </div>

            <!-- Review / Repeat All Words Button -->
            <button id="arena-restart-btn" class="px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm hidden sm:inline-flex items-center gap-1" title="Почати сесію повторення спочатку">
              <span>🔁</span> <span>Повторити</span>
            </button>

            <!-- 15-Cards Grid View Toggle -->
            <button id="arena-toggle-view-btn" class="px-2.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm" title="Показати всі 15 карток разом">
              📋 Всі 15 слів
            </button>

            <!-- Close Modal -->
            <button id="arena-close-btn" class="w-8 h-8 rounded-xl bg-rose-500/10 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 hover:text-white flex items-center justify-center text-xs font-bold transition-all shadow-sm active:scale-90 cursor-pointer" title="Закрити арену">
              ✕
            </button>
          </div>
        </div>

        <!-- 15-WORD RESPONSIVE GRID RIBBON (ZERO HORIZONTAL SCROLLING ON DESKTOP) -->
        <div class="arena-ribbon-container space-y-1.5 p-2 rounded-2xl border">
          <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span>Прогрес слів (всі 15 доступні в 1 клік):</span>
            <span class="text-cyan-400 font-bold">Поточне: #${this.currentIndex + 1} «${currentItem.word}»</span>
          </div>

          <!-- 15-Col Master Responsive Grid -->
          <div class="arena-15-ribbon-grid">
            ${pool.slice(0, 15).map((w, idx) => {
              const isCurrent = currentItem.word === w.word;
              const isMastered = this.masteredWords.has(w.word) && !this.errorWords.has(w.word);
              const hasError = this.errorWords.has(w.word);

              let statusIcon = `#${idx + 1}`;
              let pillClass = 'arena-word-pill';

              if (isCurrent) {
                pillClass += ' arena-pill-active bg-cyan-500 text-black border-cyan-300 shadow-[0_0_16px_rgba(0,229,255,0.6)] scale-105 z-10';
              } else if (hasError) {
                pillClass += ' bg-rose-500/20 text-rose-300 border-rose-500/60';
                statusIcon = '🪤';
              } else if (isMastered) {
                pillClass += ' bg-emerald-500/20 text-emerald-300 border-emerald-500/60';
                statusIcon = '✓';
              } else {
                pillClass += ' text-slate-400 border-slate-700/60';
              }

              return `
                <button 
                  class="${pillClass} px-1.5 py-1.5 rounded-xl font-mono text-[11px] font-bold border transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer select-none" 
                  data-index="${idx}"
                  data-word="${w.word}"
                  title="${idx + 1}. ${w.word} (${w.uk})${isMastered ? ' — Засвоєно ✓' : hasError ? ' — Потребує повторення 🪤' : ''}">
                  <span class="text-[9px] opacity-75 leading-none">${statusIcon}</span>
                  <span class="truncate max-w-full font-bold leading-tight">${w.word}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-slate-900/60 rounded-full h-2 overflow-hidden border border-slate-800">
          <div class="bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 h-2 rounded-full transition-all duration-300" style="width: ${progressPercent}%;"></div>
        </div>

        <!-- Navigation Row: Prev Word | 4-Phase Tabs | Next Word -->
        <div class="flex items-center justify-between gap-2 pt-1">
          <button id="arena-prev-btn" class="arena-nav-btn px-3.5 py-2 rounded-xl border font-mono text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${this.currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''}" ${this.currentIndex === 0 ? 'disabled' : ''}>
            ◀ Попереднє
          </button>

          <!-- Clickable Phase Tabs for Current Word -->
          <div class="grid grid-cols-4 gap-1.5 text-xs font-mono flex-1 max-w-lg">
            <button class="arena-phase-tab py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer ${currentItem.phase === 1 ? 'active-tab bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold shadow-sm' : 'border'}" data-phase="1">
              1. Експозиція
            </button>
            <button class="arena-phase-tab py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer ${currentItem.phase === 2 ? 'active-tab bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold shadow-sm' : 'border'}" data-phase="2">
              2. Слух
            </button>
            <button class="arena-phase-tab py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer ${currentItem.phase === 3 ? 'active-tab bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold shadow-sm' : 'border'}" data-phase="3">
              3. Конструктор
            </button>
            <button class="arena-phase-tab py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer ${currentItem.phase === 4 ? 'active-tab bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold shadow-sm' : 'border'}" data-phase="4">
              4. V2-Речення
            </button>
          </div>

          <button id="arena-next-btn" class="arena-nav-btn px-3.5 py-2 rounded-xl border font-mono text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer">
            Наступне ▶
          </button>
        </div>

        <!-- Dynamic Phase Stage Container -->
        <div id="arena-stage-container" class="min-h-[340px] flex flex-col justify-center pt-1"></div>
      </div>
    `;

    // Bind Global Modal Controls
    const closeBtn = this.modalEl.querySelector('#arena-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const restartBtn = this.modalEl.querySelector('#arena-restart-btn');
    if (restartBtn) restartBtn.addEventListener('click', () => {
      this.open(this.activeModule, true);
    });

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
        const word = btn.dataset.word;
        const targetQueueIdx = this.queue.findIndex(item => item.word === word);
        if (targetQueueIdx !== -1) {
          this.jumpToWord(targetQueueIdx);
        } else {
          // Word was already mastered, jump to it fresh
          const match = pool.find(item => item.word === word);
          if (match) {
            this.queue.push({ ...match, phase: 1, isTrap: false });
            this.jumpToWord(this.queue.length - 1);
          }
        }
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
    const pool = ANCHOR_WORDS_MASTER[this.activeModule] || ANCHOR_WORDS_MASTER.modull_0;

    this.modalEl.innerHTML = `
      <div class="modal-3d-glass w-full rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[94vh] overflow-y-auto" style="width: min(96vw, 1180px) !important; max-width: 1180px !important;">
        <div class="flex items-center justify-between pb-3 border-b border-cyan-500/20">
          <div>
            <h2 class="text-base sm:text-lg font-black arena-word-heading font-mono flex items-center gap-2">
              <span>📋 Огляд 15 опорних слів (Anchor Words Matrix)</span>
            </h2>
            <div class="text-xs text-slate-400 font-sans mt-0.5">
              Натисніть 🔊 для прослуховування або «Тренувати це слово», щоб перейти в режим фокусу.
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
          ${pool.slice(0, 15).map((item, idx) => {
            const isMastered = this.masteredWords.has(item.word) && !this.errorWords.has(item.word);
            const hasError = this.errorWords.has(item.word);

            return `
              <div class="arena-theme-card p-4 rounded-2xl hover:border-cyan-400 transition-all flex flex-col justify-between space-y-2.5 group shadow-lg cursor-pointer">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-3">
                    <span class="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">${item.icon}</span>
                    <div>
                      <div class="flex items-center gap-1.5">
                        <span class="text-base font-black font-mono arena-word-heading group-hover:text-cyan-400 transition-colors">
                          ${item.word}
                        </span>
                        <span class="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                          ${item.gender}
                        </span>
                        ${isMastered ? '<span class="text-emerald-400 text-xs font-bold">✓</span>' : hasError ? '<span class="text-rose-400 text-xs font-bold">🪤</span>' : ''}
                      </div>
                      <span class="text-xs font-mono text-slate-400 block">${item.ipa}</span>
                    </div>
                  </div>

                  <button class="arena-grid-play-btn w-8 h-8 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 border border-cyan-500/30 text-cyan-400 hover:text-black flex items-center justify-center transition-all flex-shrink-0 cursor-pointer shadow-sm" data-word="${item.word}" title="Слухати вимову Gunnar">
                    🔊
                  </button>
                </div>

                <div class="text-xs border-t border-slate-700/50 pt-2 flex items-center justify-between">
                  <span class="text-slate-400 text-[11px]">Значення:</span>
                  <span class="text-cyan-400 font-bold">${item.uk}</span>
                </div>

                <div class="arena-v2-panel p-2.5 rounded-xl text-xs space-y-0.5">
                  <div class="font-mono text-emerald-400 font-bold">«${item.sentence_v2}»</div>
                  <div class="arena-v2-sub text-[10px]">${item.sentence_trans}</div>
                </div>

                <button class="arena-grid-select-btn w-full py-2 rounded-xl font-mono font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm" data-index="${idx}" data-word="${item.word}">
                  <span>⚡ Тренувати це слово (#${idx + 1})</span>
                </button>
              </div>
            `;
          }).join('')}
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
        const word = btn.dataset.word;
        const targetQueueIdx = this.queue.findIndex(item => item.word === word);
        if (targetQueueIdx !== -1) {
          this.jumpToWord(targetQueueIdx);
        } else {
          const match = pool.find(item => item.word === word);
          if (match) {
            this.queue.push({ ...match, phase: 1, isTrap: false });
            this.jumpToWord(this.queue.length - 1);
          }
        }
      });
    });
  }

  /* =========================================================================
     PHASE 1: PASSIVE EXPOSURE (SPACIOUS 2-COLUMN LUXURY HEROIC CARD)
     ========================================================================= */
  renderPhase1Exposure(stage, item) {
    stage.innerHTML = `
      <div class="arena-theme-card p-5 sm:p-6 rounded-3xl space-y-5">
        
        <!-- Spacious 2-Column Hero Layout -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          
          <!-- Left Column: Big Visual, Word, IPA, Gender & Audio Play -->
          <div class="md:col-span-5 text-center p-4 rounded-2xl arena-trans-panel space-y-3">
            <div class="text-6xl sm:text-7xl animate-bounce duration-1000 my-1">${item.icon}</div>
            
            <div>
              <div class="flex items-center justify-center gap-2">
                <h2 class="text-3xl sm:text-4xl font-black font-mono arena-word-heading tracking-wide">
                  ${item.word}
                </h2>
                <span class="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/40">
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
            <div class="p-4 rounded-2xl arena-trans-panel space-y-1">
              <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Значення українською:</span>
              <div class="text-xl sm:text-2xl font-black text-cyan-400 font-sans">
                🇺🇦 «${item.uk}»
              </div>
            </div>

            <!-- V2 Syntax Context Card -->
            <div class="p-4 rounded-2xl arena-v2-panel text-left space-y-1.5 shadow-md">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <span>⚡</span> <span>V2-Контекст (дієслово на 2-му місці)</span>
                </span>
                <span class="text-[10px] font-mono text-emerald-500">Правило V2</span>
              </div>
              <div class="font-mono text-base arena-v2-sentence font-bold leading-relaxed">
                «${item.sentence_v2}»
              </div>
              <div class="text-xs arena-v2-sub font-sans">
                ${item.sentence_trans}
              </div>
            </div>
          </div>
        </div>

        <!-- Action Navigation Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-700/50">
          <button id="arena-p1-skip-next-btn" class="arena-nav-btn py-3 rounded-xl border font-mono font-bold text-xs transition-all active:scale-95 cursor-pointer">
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
      <div class="arena-theme-card p-5 sm:p-6 rounded-3xl space-y-4">
        <div class="text-center space-y-2 py-1">
          <div class="text-xs sm:text-sm text-slate-400 font-sans">
            Уважно прослухайте вимову носія мови та оберіть переклад:
          </div>
          <button id="arena-p2-play-btn" class="px-6 py-3 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-400 font-mono font-black text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2.5 cursor-pointer">
            <span>🔊</span> <span>Слухати аудіо носія (Gunnar)</span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          ${options.map(opt => `
            <button class="arena-p2-opt arena-quiz-card p-4 rounded-2xl text-left transition-all flex items-center gap-3.5 group cursor-pointer shadow-md" data-word-id="${opt.id}">
              <span class="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">${opt.icon}</span>
              <div>
                <div class="font-bold text-sm arena-quiz-title group-hover:text-cyan-400">${opt.uk}</div>
                <div class="font-mono text-xs arena-quiz-sub mt-0.5">${opt.gender_name || opt.gender}</div>
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
            b.classList.add('bg-emerald-500/20', 'border-emerald-400', 'text-emerald-300');
          } else if (bId === chosenId && !isCorrect) {
            b.classList.add('bg-rose-500/20', 'border-rose-500', 'text-rose-300');
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
            <div><strong>❌ Помилка.</strong> Правильно: «${item.word}» = ${item.uk}. Повернемо через 2 картки на закріплення.</div>
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
      <div class="arena-theme-card p-5 sm:p-6 rounded-3xl space-y-5">
        <div class="text-center space-y-1">
          <div class="text-4xl">${item.icon}</div>
          <div class="text-lg font-bold arena-word-heading font-sans">«${item.uk}»</div>
          <div class="text-xs font-mono text-cyan-400">${item.gender_name || item.gender} &bull; ${item.ipa}</div>
        </div>

        <!-- Target Slot Holders -->
        <div class="flex items-center justify-center gap-2 sm:gap-2.5 py-2 flex-wrap">
          ${Array.from({ length: targetLength }).map((_, idx) => `
            <div id="speller-slot-${idx}" class="speller-slot w-12 h-14 sm:w-16 sm:h-18 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-black font-mono text-cyan-400 shadow-inner">
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
          ${scrambledTiles.map((tile) => `
            <button class="speller-tile-btn w-12 h-14 sm:w-16 sm:h-18 rounded-2xl border font-black font-mono text-xl sm:text-2xl transition-all shadow-md active:scale-90 cursor-pointer" data-char="${tile.char}">
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
          slots[currentPos].classList.add('border-cyan-400', 'bg-cyan-500/20');
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
      <div class="arena-theme-card p-5 sm:p-6 rounded-3xl space-y-4">
        <div class="arena-v2-panel p-5 rounded-2xl text-center space-y-2 shadow-lg">
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase tracking-wider">
            ⚡ Закон V2 (Дієслово завжди на 2-му синтаксичному місці)
          </span>
          <div class="text-xl sm:text-2xl font-black font-mono arena-v2-sentence tracking-wide mt-2">
            «${blankedSentence}»
          </div>
          <div class="text-sm arena-v2-sub font-sans">
            🇺🇦 ${item.sentence_trans}
          </div>
        </div>

        <div class="text-xs sm:text-sm text-slate-400 text-center font-sans">
          Оберіть правильне слово для завершення фрази:
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          ${options.map(opt => `
            <button class="arena-p4-opt arena-quiz-card p-4 rounded-2xl text-center transition-all group cursor-pointer shadow-md" data-word-id="${opt.id}">
              <div class="text-2xl mb-1 group-hover:scale-110 transition-transform">${opt.icon}</div>
              <div class="font-bold text-sm arena-quiz-title group-hover:text-cyan-400 font-mono">${opt.word}</div>
              <div class="text-xs arena-quiz-sub mt-0.5">${opt.uk}</div>
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
            b.classList.add('bg-emerald-500/20', 'border-emerald-400', 'text-emerald-300');
          } else if (bId === chosenId && !isCorrect) {
            b.classList.add('bg-rose-500/20', 'border-rose-500', 'text-rose-300');
          }
        });

        const fb = stage.querySelector('#arena-p4-feedback');
        fb.classList.remove('hidden');

        if (isCorrect) {
          gameState.playVictorySound();
          audioEngine.play(item.word);

          // Mark word as officially mastered!
          this.masteredWords.add(item.word);
          this.errorWords.delete(item.word);

          fb.className = 'p-4 rounded-2xl border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 flex items-center justify-between';
          fb.innerHTML = `
            <div><strong>🎉 Досконало!</strong> «${item.sentence_v2}» правильно зв'язано!</div>
            <button id="arena-p4-next" class="px-4 py-2 rounded-xl bg-emerald-500 text-black font-mono font-bold text-xs cursor-pointer shadow-md">Наступне слово ➔</button>
          `;
          fb.querySelector('#arena-p4-next').addEventListener('click', () => {
            this.nextWord();
          });
        } else {
          // Trap-Recycler Trigger with Step-Down to Phase 2
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
    // 1. Mark in active session error set
    this.errorWords.add(item.word);
    this.masteredWords.delete(item.word);
    this.trapsToday.add(item.word);

    // 2. Persist to localStorage for next-day SRS priority
    const saved = new Set(this.getSavedTraps());
    saved.add(item.word);
    this.saveTraps(saved);

    // 3. Clone item with step-down phase
    const recycled = {
      ...item,
      phase: stepDownPhase,
      isTrap: true
    };

    // 4. Re-queue: 2 cards ahead or at end of queue
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
          <h2 class="text-xl sm:text-2xl font-black arena-word-heading font-mono mt-2">
            Денну норму закріплено
          </h2>
          <p class="text-xs text-slate-400 font-sans">
            Усі 15 слів пройшли 4 мультимодальні дотики та синтаксис V2 без залишкових помилок.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-3 p-3.5 rounded-2xl arena-trans-panel font-mono">
          <div class="text-center">
            <span class="text-[10px] text-slate-400 uppercase">Нагорода</span>
            <div class="text-xl font-black text-cyan-400">+50 XP</div>
          </div>
          <div class="text-center border-l border-slate-700/50">
            <span class="text-[10px] text-slate-400 uppercase">Стрік захищено</span>
            <div class="text-xl font-black text-amber-400">🔥 +1 день</div>
          </div>
        </div>

        <div class="space-y-2 pt-2">
          <button id="arena-finish-btn" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-mono font-black text-sm uppercase tracking-wider shadow-xl transition-all active:scale-95 cursor-pointer">
            Продовжити навчання ➔
          </button>
          
          <button id="arena-review-again-btn" class="w-full py-2.5 rounded-xl border border-slate-700/60 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 font-mono text-xs font-bold transition-all cursor-pointer">
            🔁 Повторити ще раз 15 слів
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

    const reviewAgainBtn = this.modalEl.querySelector('#arena-review-again-btn');
    if (reviewAgainBtn) {
      reviewAgainBtn.addEventListener('click', () => {
        this.open(this.activeModule, true);
      });
    }
  }
}
