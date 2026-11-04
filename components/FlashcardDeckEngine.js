/**
 * FlashcardDeckEngine.js
 * Інтерактивний 3D-тренажер флеш-карток (SRS Spaced Repetition + Gemini NotebookLM Studio)
 * Підтримує Колоди Модулів 0, 1, 2, 3, візуальні мнемоніки, озвучку Gunnar/Guðrún та Центр промптів NotebookLM.
 */

import { FLASHCARDS_DECKS, NOTEBOOKLM_PROMPTS_LIBRARY } from '../data/flashcards_master_data.js?v=7.4';
import { audioEngine } from './AudioEngine.js?v=7.0';
import { gameState } from './GameState.js';

export class FlashcardDeckEngine {
  constructor(container, initialDeckId = 'modull_0') {
    this.container = container;
    this.activeDeckId = FLASHCARDS_DECKS[initialDeckId] ? initialDeckId : 'modull_0';
    this.currentIndex = 0;
    this.isFlipped = false;
    this.showPromptsModal = false;

    // Load SRS mastery states from localStorage
    try {
      const saved = JSON.parse(localStorage.getItem('isl_flashcards_srs_v1') || '{}');
      this.srsState = saved; // { cardId: 'again' | 'good' | 'easy' }
    } catch (e) {
      this.srsState = {};
    }
  }

  setDeck(deckId) {
    if (FLASHCARDS_DECKS[deckId]) {
      this.activeDeckId = deckId;
      this.currentIndex = 0;
      this.isFlipped = false;
      this.render();
    }
  }

  saveSrs(cardId, status) {
    const prev = this.srsState[cardId];
    this.srsState[cardId] = status;
    try {
      localStorage.setItem('isl_flashcards_srs_v1', JSON.stringify(this.srsState));
    } catch (e) {}

    if (status === 'easy' && prev !== 'easy' && gameState && typeof gameState.addXP === 'function') {
      gameState.addXP(5);
    }
  }

  getDeckStats(deck) {
    let easy = 0;
    let good = 0;
    let again = 0;
    deck.cards.forEach(c => {
      const st = this.srsState[c.id];
      if (st === 'easy') easy++;
      else if (st === 'good') good++;
      else if (st === 'again') again++;
    });
    return { easy, good, again, total: deck.cards.length };
  }

  render() {
    if (!this.container) return;
    const deck = FLASHCARDS_DECKS[this.activeDeckId];
    const cards = deck.cards;
    const card = cards[this.currentIndex] || cards[0];
    const stats = this.getDeckStats(deck);
    const cardStatus = this.srsState[card.id] || 'unseen';

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Top Header & Deck Selector -->
        <div class="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-cyber-deep to-purple-950/40 border border-cyan-500/30 shadow-xl space-y-3">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  🗂️ Інтерактивні 3D Флеш-картки • SRS + NotebookLM
                </span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Вивчено: ${stats.easy} / ${stats.total} 🟢
                </span>
              </div>
              <h2 class="text-base sm:text-xl font-black text-white font-mono mt-1">
                ${deck.title}
              </h2>
              <p class="text-xs text-slate-400 font-sans">${deck.subtitle}</p>
            </div>

            <button id="fc-toggle-prompts-btn" class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-400/50 text-amber-300 text-xs font-mono font-bold transition-all flex items-center gap-2 self-start md:self-auto shadow-md">
              <span>✨ Промпти для Google NotebookLM (4 інструменти)</span>
            </button>
          </div>

          <!-- 4 Deck Switcher Pills -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
            ${Object.values(FLASHCARDS_DECKS).map(d => {
              const st = this.getDeckStats(d);
              const isAct = d.id === this.activeDeckId;
              return `
                <button data-deck-id="${d.id}" class="fc-deck-btn p-2.5 rounded-xl border text-left transition-all ${
                  isAct
                    ? 'bg-cyan-500 text-black border-cyan-300 font-extrabold shadow-lg shadow-cyan-500/20'
                    : 'bg-black/60 text-slate-300 border-slate-800 hover:border-cyan-500/50 hover:text-white'
                }">
                  <div class="flex items-center justify-between text-[10px] font-mono ${isAct ? 'text-black/80' : 'text-cyan-400'}">
                    <span>${d.id === 'modull_0' ? 'МОДУЛЬ 0' : d.id === 'kafli_1' ? 'УРОК 1' : d.id === 'kafli_2' ? 'УРОК 2' : 'УРОК 3'}</span>
                    <span>${st.easy}/${st.total} 🟢</span>
                  </div>
                  <div class="text-xs font-bold font-mono truncate mt-0.5">
                    ${d.title.replace(/^Колода \d:\s*/, '')}
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Collapsible NotebookLM Prompts Studio Drawer -->
        <div id="fc-prompts-drawer" class="${this.showPromptsModal ? '' : 'hidden'} p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-950/50 via-cyber-deep to-black border-2 border-amber-500/40 shadow-2xl space-y-4">
          <div class="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                🚀 Стратегія роботи з Google NotebookLM Studio (Права панель)
              </span>
              <h3 class="text-sm sm:text-base font-black text-white font-mono mt-0.5">
                Як змусити NotebookLM генерувати 20+ глибоких карток, таблиць та інфографік замість однієї поверхневої картки
              </h3>
              <p class="text-xs text-slate-300 font-sans mt-1">
                Коли ви натискаєте кнопку у правій панелі NotebookLM без додаткового промпту, алгоритм бере лише загальне резюме. Скопіюйте будь-який із цих 4 професійних промптів і вставте у поле <strong>«Налаштувати (Customize)»</strong> або безпосередньо в чат NotebookLM:
              </p>
            </div>
            <button id="fc-close-prompts-btn" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono">
              ✕ Закрити
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${NOTEBOOKLM_PROMPTS_LIBRARY.map(pr => `
              <div class="p-3.5 rounded-xl bg-black/70 border border-slate-800 hover:border-amber-500/40 flex flex-col justify-between gap-2.5">
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-mono font-bold text-amber-300">${pr.tool}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">${pr.badge}</span>
                  </div>
                  <div class="text-xs font-bold text-white font-sans">${pr.title}</div>
                  <p class="text-[11px] text-slate-400 font-sans">${pr.why}</p>
                  <pre class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-cyan-200 font-mono whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto select-all">${pr.promptText}</pre>
                </div>
                <button data-prompt-id="${pr.id}" class="fc-copy-prompt-btn w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-extrabold font-mono text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                  <span>📋 Скопіювати промпт для NotebookLM</span>
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Main 3D Flashcard Stage -->
        ${cards.some(c => c.visualImage) ? `
          <div class="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-cyber-deep to-purple-950/30 border border-cyan-500/40 space-y-2">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <div class="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                <span>🖼️ Галерея візуальних мнемо-карток Gemini Notebook (${cards.filter(c => c.visualImage).length} у колоді):</span>
              </div>
              <span class="text-[11px] font-mono text-slate-400">Клікніть на візуальну картку, щоб відкрити її розбір та озвучку</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              ${cards.map((vc, vIdx) => vc.visualImage ? `
                <div data-visual-jump="${vIdx}" class="fc-visual-jump-card p-2 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                  vIdx === this.currentIndex
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-md shadow-cyan-500/10'
                    : 'bg-black/60 border-slate-800 hover:border-cyan-500/50'
                }">
                  <img src="${vc.visualImage}" alt="${vc.frontMain}" class="w-20 h-14 rounded-lg object-cover border border-cyan-400/40 flex-shrink-0" />
                  <div class="min-w-0">
                    <div class="text-xs font-mono font-extrabold text-white truncate">${vc.frontMain}</div>
                    <div class="text-[11px] font-mono text-cyan-300 truncate">${vc.ipa}</div>
                    <div class="text-[10px] font-sans text-amber-300 truncate">${vc.backTitle}</div>
                  </div>
                </div>
              ` : '').join('')}
            </div>
          </div>
        ` : ''}

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          <!-- Left / Center: Active 3D Card (8 cols) -->
          <div class="lg:col-span-8 flex flex-col justify-between space-y-3">
            <!-- Progress Bar & Card Counter -->
            <div class="flex items-center justify-between text-xs font-mono px-1">
              <div class="flex items-center gap-2">
                <span class="text-cyan-400 font-bold">Картка ${this.currentIndex + 1} з ${cards.length}</span>
                <span class="text-slate-500">•</span>
                <span class="text-slate-300">${card.category}</span>
              </div>
              <div class="flex items-center gap-1.5">
                ${cardStatus === 'easy' ? '<span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px]">🟢 Знаю ідеально</span>' : ''}
                ${cardStatus === 'good' ? '<span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px]">🟡 Добре</span>' : ''}
                ${cardStatus === 'again' ? '<span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px]">🔴 Повторити</span>' : ''}
              </div>
            </div>

            <div class="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div class="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500 transition-all duration-300" style="width: ${Math.round(((this.currentIndex + 1) / cards.length) * 100)}%"></div>
            </div>

            <!-- Interactive Card Surface -->
            <div id="fc-active-card-surface" class="relative min-h-[360px] sm:min-h-[400px] rounded-2xl border-2 ${
              this.isFlipped
                ? 'border-emerald-400/70 bg-gradient-to-br from-[#07191e] via-cyber-deep to-[#0f172a]'
                : 'border-cyan-400/60 bg-gradient-to-br from-cyber-deep via-[#0a1324] to-[#111827]'
            } p-5 sm:p-7 shadow-2xl flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-cyan-500/10 select-none">

              ${!this.isFlipped ? `
                <!-- FRONT SIDE -->
                <div class="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <span class="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                    ЛИЦЬОВА СТОРОНА (Запитання & Вимова)
                  </span>
                  <button id="fc-speak-front-btn" class="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold font-mono text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95">
                    <span>🔊 Слухати вимову</span>
                  </button>
                </div>

                <div class="my-auto py-6 text-center space-y-4">
                  <div class="text-xs font-mono uppercase tracking-widest text-amber-300/90">
                    ${card.frontTop}
                  </div>
                  <div class="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight leading-tight">
                    ${card.frontMain}
                  </div>
                  <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-xl mx-auto leading-relaxed bg-black/40 px-4 py-2.5 rounded-xl border border-slate-800">
                    ❓ ${card.frontSub}
                  </p>
                </div>

                <div class="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                  <span>💡 Спробуйте спочатку вимовити вголос</span>
                  <span class="text-cyan-300 font-bold flex items-center gap-1 animate-pulse">
                    🔄 Натисніть на картку, щоб перевернути ➔
                  </span>
                </div>
              ` : `
                <!-- BACK SIDE (ANSWER + MNEMONIC + AUDIO EXAMPLE) -->
                <div class="flex items-center justify-between gap-2 border-b border-emerald-500/30 pb-3">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                      ЗВОРОТНА СТОРОНА (Розбір Árnastofnun)
                    </span>
                    <span class="px-2.5 py-1 rounded-lg bg-black/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
                      ${card.ipa}
                    </span>
                  </div>
                  <button id="fc-speak-back-btn" class="px-3 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold font-mono text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95">
                    <span>🔊 Слово</span>
                  </button>
                </div>

                <div class="my-auto py-4 grid grid-cols-1 ${card.visualImage ? 'md:grid-cols-12' : ''} gap-4 items-center">
                  ${card.visualImage ? `
                    <div class="md:col-span-5 flex flex-col items-center gap-1.5">
                      <a href="${card.visualImage}" target="_blank" rel="noopener" class="fc-zoom-img-link block w-full overflow-hidden rounded-xl border-2 border-cyan-400/60 shadow-xl group">
                        <img src="${card.visualImage}" alt="${card.frontMain}" class="w-full max-h-60 object-contain bg-[#050b14] mx-auto transition-transform duration-300 group-hover:scale-[1.02]" />
                      </a>
                      <a href="${card.visualImage}" target="_blank" rel="noopener" class="fc-zoom-img-link text-[10px] font-mono text-cyan-300 hover:text-cyan-200 underline">
                        🔍 Відкрити оригінал картки у повному розмірі ↗
                      </a>
                    </div>
                  ` : ''}
                  <div class="${card.visualImage ? 'md:col-span-7' : ''} space-y-3 text-left">
                    <div>
                      <div class="text-[11px] font-mono text-slate-400">${card.gender}</div>
                      <h3 class="text-xl sm:text-2xl font-black text-white font-mono">
                        ${card.frontMain} — <span class="text-amber-300">${card.backTitle}</span>
                      </h3>
                    </div>

                    <div class="p-3.5 rounded-xl bg-black/60 border border-slate-800 text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                      <strong class="text-cyan-300 font-mono block mb-1">🔬 Лінгвістичне пояснення:</strong>
                      ${card.explanation}
                    </div>

                    <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div class="space-y-0.5">
                        <div class="text-xs sm:text-sm font-bold text-white font-mono">«${card.exampleIs}»</div>
                        <div class="text-xs text-amber-200/90 font-sans">🇺🇦 ${card.exampleUk}</div>
                      </div>
                      <button id="fc-speak-example-btn" class="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-400/50 text-emerald-200 font-mono text-xs font-bold flex items-center gap-1 self-start sm:self-auto flex-shrink-0">
                        <span>🔊 Речення</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- SRS Self-Rating Bar -->
                <div class="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span class="text-[11px] font-mono text-slate-400">Оцініть, наскільки легко ви згадали цю картку:</span>
                  <div class="grid grid-cols-3 gap-2">
                    <button data-srs="again" class="fc-srs-btn px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/50 text-rose-300 font-mono font-bold text-xs transition-all">
                      🔴 Повторити
                    </button>
                    <button data-srs="good" class="fc-srs-btn px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/50 text-amber-300 font-mono font-bold text-xs transition-all">
                      🟡 Добре
                    </button>
                    <button data-srs="easy" class="fc-srs-btn px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-extrabold text-xs transition-all shadow-md">
                      🟢 Знаю (+5 XP)
                    </button>
                  </div>
                </div>
              `}
            </div>

            <!-- Navigation Bar Under Card -->
            <div class="flex items-center justify-between gap-2">
              <button id="fc-prev-btn" class="px-4 py-2 rounded-xl bg-black/70 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-bold transition-all">
                ← Попередня
              </button>
              <button id="fc-flip-btn" class="px-5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold transition-all">
                🔄 Перевернути картку
              </button>
              <button id="fc-next-btn" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-extrabold transition-all shadow-md">
                Наступна →
              </button>
            </div>
          </div>

          <!-- Right Column: Deck Cards List & Quick Jump (4 cols) -->
          <div class="lg:col-span-4 p-4 rounded-2xl bg-cyber-deep/90 border border-slate-800 flex flex-col justify-between space-y-3 max-h-[500px]">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-mono font-bold text-white">📋 Список карток колоди (${cards.length})</span>
              <span class="text-[10px] font-mono text-slate-400">Клікніть для переходу</span>
            </div>

            <div class="overflow-y-auto space-y-1.5 pr-1 flex-grow">
              ${cards.map((c, idx) => {
                const st = this.srsState[c.id];
                const isCur = idx === this.currentIndex;
                const badge = st === 'easy' ? '🟢' : st === 'good' ? '🟡' : st === 'again' ? '🔴' : '⚪';
                return `
                  <div data-card-idx="${idx}" class="fc-list-item p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                    isCur
                      ? 'bg-cyan-500/15 border-cyan-400 text-white'
                      : 'bg-black/50 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }">
                    <div class="min-w-0">
                      <div class="text-xs font-mono font-bold truncate">${idx + 1}. ${c.frontMain}</div>
                      <div class="text-[10px] text-slate-400 font-sans truncate">${c.backTitle}</div>
                    </div>
                    <div class="flex items-center gap-1.5 flex-shrink-0">
                      <button data-quick-audio="${c.audioKey}" class="fc-quick-audio-btn w-6 h-6 rounded-lg bg-black/60 hover:bg-cyan-500/20 border border-slate-700 text-cyan-300 text-[10px] flex items-center justify-center" title="Слухати">
                        🔊
                      </button>
                      <span class="text-xs">${badge}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const deck = FLASHCARDS_DECKS[this.activeDeckId];
    const cards = deck.cards;
    const card = cards[this.currentIndex] || cards[0];

    // Deck switcher
    this.container.querySelectorAll('.fc-deck-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setDeck(btn.dataset.deckId);
      });
    });

    // Toggle NotebookLM Prompts Drawer
    const togglePromptsBtn = this.container.querySelector('#fc-toggle-prompts-btn');
    if (togglePromptsBtn) {
      togglePromptsBtn.addEventListener('click', () => {
        this.showPromptsModal = !this.showPromptsModal;
        this.render();
      });
    }

    const closePromptsBtn = this.container.querySelector('#fc-close-prompts-btn');
    if (closePromptsBtn) {
      closePromptsBtn.addEventListener('click', () => {
        this.showPromptsModal = false;
        this.render();
      });
    }

    // Copy Prompt buttons
    this.container.querySelectorAll('.fc-copy-prompt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pr = NOTEBOOKLM_PROMPTS_LIBRARY.find(p => p.id === btn.dataset.promptId);
        if (pr && navigator.clipboard) {
          navigator.clipboard.writeText(pr.promptText);
          const orig = btn.innerHTML;
          btn.innerHTML = '<span>✅ Скопійовано! Вставте у NotebookLM</span>';
          setTimeout(() => {
            btn.innerHTML = orig;
          }, 2200);
        }
      });
    });

    // Card surface flip
    const surface = this.container.querySelector('#fc-active-card-surface');
    if (surface) {
      surface.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('a')) return;
        this.isFlipped = !this.isFlipped;
        this.render();
      });
    }

    // Visual gallery strip jump cards
    this.container.querySelectorAll('.fc-visual-jump-card').forEach(vc => {
      vc.addEventListener('click', () => {
        const idx = parseInt(vc.dataset.visualJump, 10);
        this.currentIndex = idx;
        this.isFlipped = true;
        this.render();
        const cardData = cards[idx];
        if (cardData && cardData.audioKey) {
          audioEngine.playWord(cardData.audioKey, vc, 0.85, cardData.ipa);
        }
      });
    });

    // Audio buttons on active card
    const speakFrontBtn = this.container.querySelector('#fc-speak-front-btn');
    if (speakFrontBtn) {
      speakFrontBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audioEngine.playWord(card.audioKey, speakFrontBtn, 0.85, card.ipa);
      });
    }

    const speakBackBtn = this.container.querySelector('#fc-speak-back-btn');
    if (speakBackBtn) {
      speakBackBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audioEngine.playWord(card.audioKey, speakBackBtn, 0.85, card.ipa);
      });
    }

    const speakExampleBtn = this.container.querySelector('#fc-speak-example-btn');
    if (speakExampleBtn) {
      speakExampleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audioEngine.playWord(card.exampleAudio || card.exampleIs, speakExampleBtn, 0.85, card.ipa);
      });
    }

    // SRS rating buttons
    this.container.querySelectorAll('.fc-srs-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const rating = btn.dataset.srs;
        this.saveSrs(card.id, rating);
        this.isFlipped = false;
        this.currentIndex = (this.currentIndex + 1) % cards.length;
        this.render();
      });
    });

    // Prev / Flip / Next buttons
    const prevBtn = this.container.querySelector('#fc-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.isFlipped = false;
        this.currentIndex = (this.currentIndex - 1 + cards.length) % cards.length;
        this.render();
      });
    }

    const flipBtn = this.container.querySelector('#fc-flip-btn');
    if (flipBtn) {
      flipBtn.addEventListener('click', () => {
        this.isFlipped = !this.isFlipped;
        this.render();
      });
    }

    const nextBtn = this.container.querySelector('#fc-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.isFlipped = false;
        this.currentIndex = (this.currentIndex + 1) % cards.length;
        this.render();
      });
    }

    // Right list items
    this.container.querySelectorAll('.fc-list-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const audioBtn = e.target.closest('.fc-quick-audio-btn');
        if (audioBtn) {
          e.stopPropagation();
          audioEngine.playWord(audioBtn.dataset.quickAudio, audioBtn);
          return;
        }
        const idx = parseInt(item.dataset.cardIdx, 10);
        this.currentIndex = idx;
        this.isFlipped = false;
        this.render();
      });
    });
  }
}
