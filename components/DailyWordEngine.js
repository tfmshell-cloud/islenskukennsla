/**
 * DailyWordEngine.js - Spaced Repetition (SRS) & 4-Phase Anchor Word Engine
 * Master dataset: 15 core anchor words from NotebookLM research
 * 
 * Phases:
 * Phase 1: Interactive Cards + Gender + IPA + Native Baritone Audio (Gunnar)
 * Phase 2: Audio Discrimination Test (Listen ➔ Match Icon/Ukrainian) + 15-Word Non-Scroll Grid Ribbon
 * Phase 3: Letter Spelling Constructor (Click scrambled tiles to assemble word) + Reset + 15-Word Grid Ribbon
 * Phase 4: V2 Syntax Inserter (Verb-second sentence integration) + 15-Word Grid Ribbon
 */

import { audioEngine } from './AudioEngine.js?v=5.9';
import { gameState } from './GameState.js?v=5.9';

export class DailyWordEngine {
  constructor(container, engineData) {
    this.container = container;
    this.data = engineData || { anchor_words: [] };
    this.words = this.data.anchor_words || [];
    this.activePhase = 1; // 1, 2, 3, 4
    
    // Quiz state for Phase 2, 3, 4
    this.p2Index = 0;
    this.p2Score = 0;
    this.p3Index = 0;
    this.p3Assembled = [];
    this.p3Score = 0;
    this.p4Index = 0;
    this.p4Score = 0;
  }

  setPhase(phaseNum) {
    this.activePhase = phaseNum;
    this.render();
  }

  renderWordRibbon(currentIndex, onSelect) {
    return `
      <div class="space-y-1.5 p-2 rounded-2xl bg-black/40 border border-slate-800/80 mb-3.5">
        <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
          <span>Швидкий вибір слова (1..15 без прокручування):</span>
          <span class="text-cyan-400 font-bold">${currentIndex + 1} / ${this.words.length}</span>
        </div>
        <!-- 15-Column Responsive Grid: Guaranteed zero horizontal scroll -->
        <div class="arena-15-ribbon-grid">
          ${this.words.map((w, idx) => {
            const isActive = idx === currentIndex;
            return `
              <button 
                class="srs-ribbon-pill px-1.5 py-1.5 rounded-xl font-mono text-[11px] font-bold border transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer select-none ${isActive ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_14px_rgba(0,229,255,0.6)] scale-105 z-10' : 'bg-black/60 text-slate-300 border-slate-800 hover:border-cyan-400 hover:text-white'}" 
                data-index="${idx}"
                title="${idx + 1}. ${w.word} (${w.uk})">
                <span class="text-[9px] opacity-75 leading-none">#${idx + 1}</span>
                <span class="truncate max-w-full font-bold leading-tight">${w.word}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  bindRibbonEvents(mount, onSelect) {
    mount.querySelectorAll('.srs-ribbon-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        onSelect(idx);
      });
    });
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-4 max-w-5xl mx-auto">
        <!-- SRS Engine Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyber-border/30">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                SRS Лексичний Двигун
              </span>
              <span class="text-[11px] font-mono text-slate-400">15 опорних слів • 4 фази</span>
            </div>
            <h2 class="text-sm sm:text-base font-black text-white font-mono flex items-center gap-2">
              <span>🧠 Щоденне закріплення лексики (Daily Word Engine)</span>
            </h2>
          </div>

          <!-- Phase Navigation Tabs -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-[11px]">
            <button class="srs-phase-btn px-2.5 py-1.5 rounded-lg border text-center transition-all cursor-pointer ${this.activePhase === 1 ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-sm' : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'}" data-phase="1">
              1. Картки (15)
            </button>
            <button class="srs-phase-btn px-2.5 py-1.5 rounded-lg border text-center transition-all cursor-pointer ${this.activePhase === 2 ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-sm' : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'}" data-phase="2">
              2. Аудіо-тест
            </button>
            <button class="srs-phase-btn px-2.5 py-1.5 rounded-lg border text-center transition-all cursor-pointer ${this.activePhase === 3 ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-sm' : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'}" data-phase="3">
              3. Конструктор
            </button>
            <button class="srs-phase-btn px-2.5 py-1.5 rounded-lg border text-center transition-all cursor-pointer ${this.activePhase === 4 ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-sm' : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'}" data-phase="4">
              4. Синтаксис V2
            </button>
          </div>
        </div>

        <!-- Phase Content Mount Point -->
        <div id="srs-phase-content" class="min-h-[340px]"></div>
      </div>
    `;

    this.bindHeaderEvents();

    const mount = this.container.querySelector('#srs-phase-content');
    if (!mount) return;

    switch (this.activePhase) {
      case 1:
        this.renderPhase1Cards(mount);
        break;
      case 2:
        this.renderPhase2AudioTest(mount);
        break;
      case 3:
        this.renderPhase3Constructor(mount);
        break;
      case 4:
        this.renderPhase4SyntaxV2(mount);
        break;
      default:
        this.renderPhase1Cards(mount);
    }
  }

  bindHeaderEvents() {
    this.container.querySelectorAll('.srs-phase-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ph = parseInt(btn.dataset.phase, 10);
        this.setPhase(ph);
      });
    });
  }

  /* =========================================================================
     PHASE 1: 15 INTERACTIVE FLASHCARDS (WORD + GENDER + IPA + AUDIO + V2)
     ========================================================================= */
  renderPhase1Cards(mount) {
    mount.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Натисніть на картку або кнопку 🔊, щоб почути вимову носія (Gunnar Neural):</span>
          <span class="font-mono text-cyan-400 font-bold">${this.words.length} слів</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          ${this.words.map((w, idx) => {
            let genderBadge = 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
            if (w.gender === 'm.') genderBadge = 'bg-sky-500/15 text-sky-300 border-sky-500/40';
            else if (w.gender === 'f.') genderBadge = 'bg-rose-500/15 text-rose-300 border-rose-500/40';
            else if (w.gender === 'n.') genderBadge = 'bg-amber-500/15 text-amber-300 border-amber-500/40';

            return `
              <div 
                class="srs-word-card p-4 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-slate-800 hover:border-cyan-500/50 shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-2.5 active:scale-[0.99]"
                data-word="${w.word}">
                
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-2.5">
                    <span class="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">${w.icon || '🏷️'}</span>
                    <div>
                      <div class="flex items-center gap-1.5">
                        <span class="text-base font-black font-mono text-white group-hover:text-cyan-300 transition-colors">
                          ${w.word}
                        </span>
                        <span class="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold border ${genderBadge}">
                          ${w.gender}
                        </span>
                      </div>
                      <span class="text-xs font-mono text-slate-400 block">${w.ipa}</span>
                    </div>
                  </div>

                  <button class="srs-card-play-btn w-8 h-8 rounded-xl bg-black/40 hover:bg-cyan-500 border border-slate-700 hover:border-cyan-400 text-cyan-300 hover:text-black flex items-center justify-center transition-all flex-shrink-0 shadow-sm cursor-pointer" data-word="${w.word}" title="Слухати вимову">
                    🔊
                  </button>
                </div>

                <!-- Ukrainian translation -->
                <div class="text-xs font-semibold text-slate-200 border-t border-slate-800/80 pt-2 flex items-center justify-between">
                  <span class="text-slate-400 text-[11px]">Переклад:</span>
                  <span class="text-cyan-300 font-bold">${w.uk}</span>
                </div>

                <!-- V2 Sentence Context -->
                <div class="p-2.5 rounded-xl bg-black/40 border border-slate-800/60 text-xs space-y-0.5 font-sans">
                  <div class="font-mono text-emerald-300 font-bold">«${w.sentence_v2}»</div>
                  <div class="text-[11px] text-slate-400 leading-tight">${w.sentence_trans}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    mount.querySelectorAll('.srs-word-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const word = card.dataset.word;
        audioEngine.play(word, card);
      });
    });

    mount.querySelectorAll('.srs-card-play-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = btn.dataset.word;
        audioEngine.play(word, btn);
      });
    });
  }

  /* =========================================================================
     PHASE 2: AUDIO DISCRIMINATION TEST (LISTEN ➔ SELECT WORD/MEANING)
     ========================================================================= */
  renderPhase2AudioTest(mount) {
    if (this.p2Index >= this.words.length) {
      this.renderPhaseSummary(mount, 'Фаза 2: Аудіо-тест', this.p2Score, this.words.length * 15, () => {
        this.p2Index = 0;
        this.p2Score = 0;
        this.renderPhase2AudioTest(mount);
      });
      return;
    }

    const targetWord = this.words[this.p2Index];
    // Generate 4 options: 1 correct, 3 random distractors
    const otherWords = this.words.filter(w => w.id !== targetWord.id);
    const shuffledOthers = [...otherWords].sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [targetWord, ...shuffledOthers].sort(() => Math.random() - 0.5);

    mount.innerHTML = `
      <div class="max-w-3xl mx-auto p-4 sm:p-6 rounded-3xl bg-cyber-deep/90 border border-cyber-border/40 space-y-4 shadow-xl">
        ${this.renderWordRibbon(this.p2Index, (idx) => {
          this.p2Index = idx;
          this.renderPhase2AudioTest(mount);
        })}

        <div class="flex items-center justify-between text-xs font-mono pt-1">
          <button id="p2-prev-word-btn" class="px-3 py-1.5 rounded-xl bg-black/60 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer ${this.p2Index === 0 ? 'opacity-40 cursor-not-allowed' : ''}" ${this.p2Index === 0 ? 'disabled' : ''}>
            ◀ Попереднє
          </button>
          <span class="text-slate-400 font-bold">Слово ${this.p2Index + 1} / ${this.words.length}</span>
          <button id="p2-skip-word-btn" class="px-3 py-1.5 rounded-xl bg-black/60 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer">
            Наступне ▶
          </button>
        </div>

        <div class="text-center py-3 space-y-2">
          <div class="text-xs sm:text-sm text-slate-300 font-sans">
            Уважно прослухайте вимову носія та оберіть відповідне значення:
          </div>
          <button id="p2-listen-btn" class="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-mono font-black text-sm shadow-lg transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer">
            <span>🔊</span> <span>Прослухати слово (Gunnar)</span>
          </button>
        </div>

        <div id="p2-options-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${options.map((opt, idx) => `
            <button class="p2-opt-btn p-4 rounded-2xl bg-black/50 hover:bg-black/80 border border-slate-800 hover:border-cyan-400 text-left transition-all flex items-center gap-3.5 group cursor-pointer shadow-md" data-word-id="${opt.id}">
              <span class="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">${opt.icon}</span>
              <div>
                <div class="font-bold text-white text-sm group-hover:text-cyan-300">${opt.uk}</div>
                <div class="font-mono text-xs text-slate-400 mt-0.5">${opt.gender_name || opt.gender}</div>
              </div>
            </button>
          `).join('')}
        </div>

        <div id="p2-feedback" class="hidden p-3.5 rounded-2xl border text-xs sm:text-sm font-sans"></div>
      </div>
    `;

    this.bindRibbonEvents(mount, (idx) => {
      this.p2Index = idx;
      this.renderPhase2AudioTest(mount);
    });

    const prevBtn = mount.querySelector('#p2-prev-word-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (this.p2Index > 0) {
        this.p2Index--;
        this.renderPhase2AudioTest(mount);
      }
    });

    const skipBtn = mount.querySelector('#p2-skip-word-btn');
    if (skipBtn) skipBtn.addEventListener('click', () => {
      this.p2Index++;
      this.renderPhase2AudioTest(mount);
    });

    const playBtn = mount.querySelector('#p2-listen-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        audioEngine.play(targetWord.word, playBtn);
      });
      setTimeout(() => audioEngine.play(targetWord.word, playBtn), 250);
    }

    mount.querySelectorAll('.p2-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosenId = parseInt(btn.dataset.wordId, 10);
        const isCorrect = chosenId === targetWord.id;

        mount.querySelectorAll('.p2-opt-btn').forEach(b => {
          b.disabled = true;
          const id = parseInt(b.dataset.wordId, 10);
          if (id === targetWord.id) {
            b.classList.add('bg-emerald-500/20', 'border-emerald-400', 'text-emerald-200');
          } else if (id === chosenId && !isCorrect) {
            b.classList.add('bg-rose-500/20', 'border-rose-500', 'text-rose-200');
          }
        });

        const fb = mount.querySelector('#p2-feedback');
        fb.classList.remove('hidden');

        if (isCorrect) {
          this.p2Score += 15;
          gameState.addXP(15);
          gameState.playVictorySound();
          fb.className = 'p-4 rounded-2xl border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 flex items-center justify-between';
          fb.innerHTML = `
            <div>
              <strong>🎉 Rétt!</strong> «${targetWord.word}» [${targetWord.ipa}] = ${targetWord.uk}. (+15 XP)
            </div>
            <button id="p2-next-btn" class="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold font-mono text-xs cursor-pointer shadow-md">Далі ➔</button>
          `;
        } else {
          fb.className = 'p-4 rounded-2xl border border-rose-500/50 bg-rose-950/40 text-rose-300 flex items-center justify-between';
          fb.innerHTML = `
            <div>
              <strong>❌ Ekki alveg.</strong> Правильно: «${targetWord.word}» [${targetWord.ipa}] = ${targetWord.uk}.
            </div>
            <button id="p2-next-btn" class="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold font-mono text-xs cursor-pointer">Далі ➔</button>
          `;
        }

        const nextBtn = fb.querySelector('#p2-next-btn');
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            this.p2Index++;
            this.renderPhase2AudioTest(mount);
          });
        }
      });
    });
  }

  /* =========================================================================
     PHASE 3: LETTER SPELLING CONSTRUCTOR
     ========================================================================= */
  renderPhase3Constructor(mount) {
    if (this.p3Index >= this.words.length) {
      this.renderPhaseSummary(mount, 'Фаза 3: Конструктор написання', this.p3Score, this.words.length * 20, () => {
        this.p3Index = 0;
        this.p3Score = 0;
        this.renderPhase3Constructor(mount);
      });
      return;
    }

    const targetWord = this.words[this.p3Index];
    const letters = targetWord.letters || targetWord.word.split('');
    const targetLength = letters.length;
    
    // Scrambled tiles with original index
    const scrambledTiles = letters.map((char, originalIndex) => ({ char, originalIndex }))
      .sort(() => Math.random() - 0.5);

    mount.innerHTML = `
      <div class="max-w-3xl mx-auto p-4 sm:p-6 rounded-3xl bg-cyber-deep/90 border border-cyber-border/40 space-y-4 shadow-xl">
        ${this.renderWordRibbon(this.p3Index, (idx) => {
          this.p3Index = idx;
          this.renderPhase3Constructor(mount);
        })}

        <div class="flex items-center justify-between text-xs font-mono pt-1">
          <button id="p3-prev-word-btn" class="px-3 py-1.5 rounded-xl bg-black/60 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer ${this.p3Index === 0 ? 'opacity-40 cursor-not-allowed' : ''}" ${this.p3Index === 0 ? 'disabled' : ''}>
            ◀ Попереднє
          </button>
          <span class="text-slate-400 font-bold">Слово ${this.p3Index + 1} / ${this.words.length}</span>
          <button id="p3-skip-word-btn" class="px-3 py-1.5 rounded-xl bg-black/60 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer">
            Наступне ▶
          </button>
        </div>

        <div class="text-center py-2 space-y-1">
          <div class="text-5xl">${targetWord.icon}</div>
          <div class="text-lg font-bold text-white font-sans">«${targetWord.uk}»</div>
          <div class="text-xs font-mono text-slate-400">${targetWord.gender_name || targetWord.gender} &bull; ${targetWord.ipa}</div>
        </div>

        <!-- Target Slot Holders -->
        <div class="flex items-center justify-center gap-2 sm:gap-2.5 py-2 flex-wrap">
          ${Array.from({ length: targetLength }).map((_, idx) => `
            <div id="p3-slot-${idx}" class="p3-slot w-12 h-14 sm:w-16 sm:h-18 rounded-2xl bg-black/60 border-2 border-slate-700 flex items-center justify-center text-xl sm:text-2xl font-black font-mono text-cyan-300 shadow-inner">
              _
            </div>
          `).join('')}
        </div>

        <!-- Available Scrambled Letter Tiles & Reset -->
        <div class="flex items-center justify-between text-xs text-slate-400 px-2 pt-1">
          <span>Натискайте на літери по порядку:</span>
          <button id="p3-clear-btn" class="text-amber-400 hover:text-amber-300 font-mono font-bold flex items-center gap-1 cursor-pointer">
            <span>↺</span> <span>Очистити</span>
          </button>
        </div>

        <div id="p3-tiles-pool" class="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap py-2">
          ${scrambledTiles.map((tile, idx) => `
            <button class="p3-tile-btn w-12 h-14 sm:w-16 sm:h-18 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500 border border-cyan-500/40 hover:border-cyan-400 text-white hover:text-black font-black font-mono text-xl sm:text-2xl transition-all shadow-md active:scale-90 cursor-pointer" data-char="${tile.char}">
              ${tile.char}
            </button>
          `).join('')}
        </div>

        <div id="p3-feedback" class="hidden p-4 rounded-2xl border text-xs sm:text-sm font-sans"></div>
      </div>
    `;

    this.bindRibbonEvents(mount, (idx) => {
      this.p3Index = idx;
      this.renderPhase3Constructor(mount);
    });

    const prevBtn = mount.querySelector('#p3-prev-word-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (this.p3Index > 0) {
        this.p3Index--;
        this.renderPhase3Constructor(mount);
      }
    });

    const skipBtn = mount.querySelector('#p3-skip-word-btn');
    if (skipBtn) skipBtn.addEventListener('click', () => {
      this.p3Index++;
      this.renderPhase3Constructor(mount);
    });

    const clearBtn = mount.querySelector('#p3-clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      this.renderPhase3Constructor(mount);
    });

    this.p3Assembled = [];
    const slots = mount.querySelectorAll('.p3-slot');
    const poolBtns = mount.querySelectorAll('.p3-tile-btn');
    const fb = mount.querySelector('#p3-feedback');

    poolBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.p3Assembled.length >= targetLength) return;

        const char = btn.dataset.char;
        btn.disabled = true;
        btn.classList.add('opacity-30', 'pointer-events-none');

        const currentPos = this.p3Assembled.length;
        this.p3Assembled.push({ char, btnRef: btn });

        if (slots[currentPos]) {
          slots[currentPos].innerText = char;
          slots[currentPos].classList.add('border-cyan-400', 'bg-cyan-950/40');
        }

        // When all slots filled: check word
        if (this.p3Assembled.length === targetLength) {
          const assembledWord = this.p3Assembled.map(x => x.char).join('');
          const isCorrect = assembledWord.toLowerCase() === targetWord.word.toLowerCase();

          fb.classList.remove('hidden');
          if (isCorrect) {
            this.p3Score += 20;
            gameState.addXP(20);
            gameState.playVictorySound();
            audioEngine.play(targetWord.word);

            fb.className = 'p-4 rounded-2xl border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 flex items-center justify-between';
            fb.innerHTML = `
              <div>
                <strong>🎉 Бездоганно!</strong> «${targetWord.word}» [${targetWord.ipa}] зібрано вірно! (+20 XP)
              </div>
              <button id="p3-next-btn" class="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold font-mono text-xs cursor-pointer shadow-md">Далі ➔</button>
            `;
          } else {
            fb.className = 'p-4 rounded-2xl border border-rose-500/50 bg-rose-950/40 text-rose-300 flex items-center justify-between';
            fb.innerHTML = `
              <div>
                <strong>❌ Помилка в порядку.</strong> Правильно: «${targetWord.word}». Спробуйте знову.
              </div>
              <button id="p3-retry-btn" class="px-4 py-2 rounded-xl bg-rose-500 text-white font-bold font-mono text-xs cursor-pointer">Скинути ↺</button>
            `;
            const retryBtn = fb.querySelector('#p3-retry-btn');
            if (retryBtn) {
              retryBtn.addEventListener('click', () => {
                this.renderPhase3Constructor(mount);
              });
            }
          }

          const nextBtn = fb.querySelector('#p3-next-btn');
          if (nextBtn) {
            nextBtn.addEventListener('click', () => {
              this.p3Index++;
              this.renderPhase3Constructor(mount);
            });
          }
        }
      });
    });
  }

  /* =========================================================================
     PHASE 4: V2 SYNTAX INSERTER
     ========================================================================= */
  renderPhase4SyntaxV2(mount) {
    if (this.p4Index >= this.words.length) {
      this.renderPhaseSummary(mount, 'Фаза 4: Синтаксис V2', this.p4Score, this.words.length * 20, () => {
        this.p4Index = 0;
        this.p4Score = 0;
        this.renderPhase4SyntaxV2(mount);
      });
      return;
    }

    const targetWord = this.words[this.p4Index];
    // Sentence blanking: replace target word with [ _____ ]
    const regex = new RegExp(`\\b${targetWord.word}\\b`, 'i');
    const blankedSentence = targetWord.sentence_v2.replace(regex, '_______');

    // Create 3 choices
    const otherWords = this.words.filter(w => w.id !== targetWord.id);
    const shuffledOthers = [...otherWords].sort(() => Math.random() - 0.5).slice(0, 2);
    const options = [targetWord, ...shuffledOthers].sort(() => Math.random() - 0.5);

    mount.innerHTML = `
      <div class="max-w-3xl mx-auto p-4 sm:p-6 rounded-3xl bg-cyber-deep/90 border border-cyber-border/40 space-y-4 shadow-xl">
        ${this.renderWordRibbon(this.p4Index, (idx) => {
          this.p4Index = idx;
          this.renderPhase4SyntaxV2(mount);
        })}

        <div class="flex items-center justify-between text-xs font-mono pt-1">
          <button id="p4-prev-word-btn" class="px-3 py-1.5 rounded-xl bg-black/60 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer ${this.p4Index === 0 ? 'opacity-40 cursor-not-allowed' : ''}" ${this.p4Index === 0 ? 'disabled' : ''}>
            ◀ Попереднє
          </button>
          <span class="text-slate-400 font-bold">Речення ${this.p4Index + 1} / ${this.words.length}</span>
          <button id="p4-skip-word-btn" class="px-3 py-1.5 rounded-xl bg-black/60 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer">
            Наступне ▶
          </button>
        </div>

        <div class="p-5 rounded-2xl bg-black/60 border border-amber-500/40 text-center space-y-2 shadow-lg">
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            Закон другого дієслова (V2-Regla)
          </span>
          <div class="text-xl sm:text-2xl font-black font-mono text-cyan-300 tracking-wide mt-2">
            «${blankedSentence}»
          </div>
          <div class="text-xs sm:text-sm text-slate-300 font-sans">
            🇺🇦 Переклад: ${targetWord.sentence_trans}
          </div>
        </div>

        <div class="text-xs sm:text-sm text-slate-400 text-center font-sans">
          Оберіть правильне слово, щоб завершити речення:
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          ${options.map(opt => `
            <button class="p4-opt-btn p-4 rounded-2xl bg-black/50 hover:bg-black/80 border border-slate-800 hover:border-cyan-400 text-center transition-all group cursor-pointer shadow-md" data-word-id="${opt.id}">
              <div class="text-2xl mb-1 group-hover:scale-110 transition-transform">${opt.icon}</div>
              <div class="font-bold text-white text-sm group-hover:text-cyan-300 font-mono">${opt.word}</div>
              <div class="text-xs text-slate-400 mt-0.5">${opt.uk}</div>
            </button>
          `).join('')}
        </div>

        <div id="p4-feedback" class="hidden p-4 rounded-2xl border text-xs sm:text-sm font-sans"></div>
      </div>
    `;

    this.bindRibbonEvents(mount, (idx) => {
      this.p4Index = idx;
      this.renderPhase4SyntaxV2(mount);
    });

    const prevBtn = mount.querySelector('#p4-prev-word-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (this.p4Index > 0) {
        this.p4Index--;
        this.renderPhase4SyntaxV2(mount);
      }
    });

    const skipBtn = mount.querySelector('#p4-skip-word-btn');
    if (skipBtn) skipBtn.addEventListener('click', () => {
      this.p4Index++;
      this.renderPhase4SyntaxV2(mount);
    });

    mount.querySelectorAll('.p4-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosenId = parseInt(btn.dataset.wordId, 10);
        const isCorrect = chosenId === targetWord.id;

        mount.querySelectorAll('.p4-opt-btn').forEach(b => {
          b.disabled = true;
          const id = parseInt(b.dataset.wordId, 10);
          if (id === targetWord.id) {
            b.classList.add('bg-emerald-500/20', 'border-emerald-400', 'text-emerald-200');
          } else if (id === chosenId && !isCorrect) {
            b.classList.add('bg-rose-500/20', 'border-rose-500', 'text-rose-200');
          }
        });

        const fb = mount.querySelector('#p4-feedback');
        fb.classList.remove('hidden');

        if (isCorrect) {
          this.p4Score += 20;
          gameState.addXP(20);
          gameState.playVictorySound();
          audioEngine.play(targetWord.word);

          fb.className = 'p-4 rounded-2xl border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 flex items-center justify-between';
          fb.innerHTML = `
            <div>
              <strong>🎉 Чудово!</strong> «${targetWord.sentence_v2}» правильно заповнено! (+20 XP)
            </div>
            <button id="p4-next-btn" class="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold font-mono text-xs cursor-pointer shadow-md">Далі ➔</button>
          `;
        } else {
          fb.className = 'p-4 rounded-2xl border border-rose-500/50 bg-rose-950/40 text-rose-300 flex items-center justify-between';
          fb.innerHTML = `
            <div>
              <strong>❌ Неправильне слово.</strong> Правильний варіант: «${targetWord.word}» [${targetWord.sentence_v2}].
            </div>
            <button id="p4-next-btn" class="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold font-mono text-xs cursor-pointer">Далі ➔</button>
          `;
        }

        const nextBtn = fb.querySelector('#p4-next-btn');
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            this.p4Index++;
            this.renderPhase4SyntaxV2(mount);
          });
        }
      });
    });
  }

  renderPhaseSummary(mount, phaseTitle, score, maxScore, onRestart) {
    const percent = Math.round((score / maxScore) * 100);
    mount.innerHTML = `
      <div class="p-6 sm:p-8 rounded-3xl bg-cyber-deep/95 border border-cyan-500/40 shadow-xl max-w-md mx-auto text-center space-y-4">
        <div class="text-5xl">🏆</div>
        <div class="space-y-1">
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            Фазу завершено!
          </span>
          <h3 class="text-xl font-black text-white font-mono mt-1">${phaseTitle}</h3>
        </div>

        <div class="p-4 rounded-2xl bg-black/60 border border-slate-800 font-mono flex items-center justify-around">
          <div>
            <div class="text-xs text-slate-400 uppercase">Успішність</div>
            <div class="text-2xl font-black text-white">${percent}%</div>
          </div>
          <div>
            <div class="text-xs text-slate-400 uppercase">Отримано XP</div>
            <div class="text-2xl font-black text-cyan-400">+${score} XP</div>
          </div>
        </div>

        <button id="srs-restart-phase-btn" class="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold font-mono text-xs uppercase shadow-md transition-all active:scale-95 cursor-pointer">
          🔄 Повторити фазу
        </button>
      </div>
    `;

    const btn = mount.querySelector('#srs-restart-phase-btn');
    if (btn) btn.addEventListener('click', onRestart);
  }
}
