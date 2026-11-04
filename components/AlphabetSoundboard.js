/**
 * AlphabetSoundboard.js - Precision Academic 32-Letter Matrix (Stafrófið)
 * Top-pinned Acoustic & Articulation Inspector (zero text truncation) + 8x4 Interactive Grid
 * Separate click targets for Letter Phoneme vs Example Word audio.
 */

import { audioEngine } from './AudioEngine.js?v=7.0';

export class AlphabetSoundboard {
  constructor(container, alphabetData, raddstafirData) {
    this.container = container;
    this.alphabet = alphabetData;
    this.raddstafir = raddstafirData;
    this.selectedLetter = this.alphabet[0];
    this.currentFilter = 'all'; // 'all', 'monophthong', 'diphthong', 'consonant', 'special_icelandic'
    this.flippedCards = new Set();
  }

  render() {
    const sel = this.selectedLetter;
    const isTwin = sel.upper === 'Y' || sel.upper === 'Ý';

    this.container.innerHTML = `
      <div class="space-y-3.5">
        <!-- 1. TOP-PINNED ACADEMIC INSPECTOR (Zero truncation, immediate eye-level feedback) -->
        <div id="soundboard-inspector" class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyber-deep via-[#0a1324] to-[#0f172a] border-2 border-cyan-500/40 shadow-2xl">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            <!-- Left: Grapheme & Dual Audio Triggers (4 cols) -->
            <div class="lg:col-span-4 flex items-center gap-3.5 pb-3 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-800/90 pr-0 lg:pr-4">
              <div id="inspector-badge" class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border-2 border-cyan-400 flex items-center justify-center text-2xl sm:text-3xl font-black text-white font-mono shadow-lg flex-shrink-0 cursor-pointer hover:scale-105 transition-transform" title="Натисніть для прослуховування звука літери">
                ${sel.grapheme}
              </div>

              <div class="space-y-1.5 flex-grow min-w-0">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span id="inspector-ipa" class="text-xs sm:text-sm font-mono font-black text-cyan-300 bg-black/80 px-2.5 py-0.5 rounded-lg border border-cyan-500/50">
                    ${sel.ipa}
                  </span>
                  <span id="inspector-name" class="text-xs font-mono text-emerald-400 font-bold">
                    «${sel.letter_name}» ${sel.letter_name_ipa}
                  </span>
                </div>

                <div class="flex items-center gap-1.5 pt-0.5 flex-wrap">
                  <button id="inspector-play-letter-btn" class="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold font-mono text-xs flex items-center gap-1 shadow-md transition-all active:scale-95">
                    <span>🔊 Літера [${sel.upper}]</span>
                  </button>
                  <button id="inspector-play-word-btn" class="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-400/60 text-emerald-200 font-extrabold font-mono text-xs flex items-center gap-1 transition-all active:scale-95">
                    <span>🗣️ Слово: <strong id="inspector-word-label">${sel.example_word}</strong></span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Right: Full Articulation Biomechanics & Ukrainian Mnemonic (8 cols, ZERO truncation) -->
            <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-black/60 border border-slate-800/90 space-y-1">
                <div class="flex items-center justify-between text-[11px] font-mono text-cyan-400 font-bold">
                  <span>👄 АРТИКУЛЯЦІЯ ТА ФОНЕТИКА (ÁRNASTOFNUN)</span>
                  <span id="inspector-broddur-pill" class="px-1.5 py-0.2 rounded text-[10px] ${sel.has_acute ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'}">
                    ${sel.has_acute ? '⚡ Broddur (´)' : 'Базова графема'}
                  </span>
                </div>
                <p id="inspector-guide" class="text-xs text-slate-200 font-sans leading-relaxed">
                  ${sel.articulation_guide}
                  ${isTwin ? `<span class="block mt-1 text-amber-300 font-semibold">⚡ Фонологічний близнюк: вимова на 100% ідентична літері ${sel.upper === 'Y' ? 'I i' : 'Í í'}.</span>` : ''}
                </p>
              </div>

              <div class="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between text-[11px] font-mono text-amber-300 font-bold">
                    <span>💡 МНЕМОНІКА ТА ЯКІРНЕ СЛОВО</span>
                    <span id="inspector-word-ipa" class="font-mono text-cyan-300">${sel.word_ipa}</span>
                  </div>
                  <div class="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">
                    <span id="inspector-word">${sel.example_word}</span> — <span id="inspector-word-trans" class="text-amber-200 font-sans">${sel.ukrainian_translation}</span>
                  </div>
                </div>
                <p id="inspector-mnemonic" class="text-[11px] text-slate-300 font-sans leading-relaxed pt-1 border-t border-amber-500/20">
                  ${sel.ukrainian_mnemonic}
                </p>
              </div>
            </div>

          </div>
        </div>

        <!-- 2. FILTER BAR & LEGEND -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800/80">
          <div class="flex items-center gap-2 text-xs">
            <span class="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono font-bold">
              Матриця 32 літер (8×4)
            </span>
            <span class="text-slate-400 font-sans text-[11px]">
              Клік на верхню частину картки — <strong>звук літери</strong> • Клік на нижній рядок — <strong>вимова слова</strong>
            </span>
          </div>

          <div class="flex items-center gap-1 flex-wrap text-[11px]">
            <button data-filter="all" class="soundboard-filter px-2.5 py-1 rounded-lg font-mono font-bold transition-all ${this.currentFilter === 'all' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/60 text-slate-400 hover:text-white border border-slate-800'}">
              Усі (32)
            </button>
            <button data-filter="monophthong" class="soundboard-filter px-2.5 py-1 rounded-lg font-mono font-bold transition-all ${this.currentFilter === 'monophthong' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/60 text-slate-400 hover:text-white border border-slate-800'}">
              Монофтонги [6]
            </button>
            <button data-filter="diphthong" class="soundboard-filter px-2.5 py-1 rounded-lg font-mono font-bold transition-all ${this.currentFilter === 'diphthong' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/60 text-slate-400 hover:text-white border border-slate-800'}">
              Дифтонги [6]
            </button>
            <button data-filter="consonant" class="soundboard-filter px-2.5 py-1 rounded-lg font-mono font-bold transition-all ${this.currentFilter === 'consonant' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/60 text-slate-400 hover:text-white border border-slate-800'}">
              Приголосні [16]
            </button>
            <button data-filter="special_icelandic" class="soundboard-filter px-2.5 py-1 rounded-lg font-mono font-bold transition-all ${this.currentFilter === 'special_icelandic' ? 'bg-amber-500 text-black shadow-sm' : 'bg-black/60 text-amber-300/80 hover:text-amber-200 border border-amber-500/30'}">
              Ð, Þ, Æ, Ö [4]
            </button>
          </div>
        </div>

        <!-- 3. 8x4 INTERACTIVE ALPHABET GRID -->
        <div id="soundboard-grid" class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2"></div>
      </div>
    `;

    this.renderCards();
    this.bindEvents();
  }

  renderCards() {
    const grid = this.container.querySelector('#soundboard-grid');
    if (!grid) return;

    const filtered = this.alphabet.filter(item => {
      if (this.currentFilter === 'all') return true;
      if (this.currentFilter === 'special_icelandic') {
        return ['Ð', 'Þ', 'Æ', 'Ö'].includes(item.upper);
      }
      return item.category === this.currentFilter;
    });

    grid.innerHTML = filtered.map(item => {
      const isSelected = this.selectedLetter && this.selectedLetter.id === item.id;
      const isSpecial = ['Ð', 'Þ', 'Æ', 'Ö'].includes(item.upper);
      const hasAcute = item.has_acute;

      let borderStyle = isSelected
        ? 'border-cyan-400 ring-2 ring-cyan-400/40 bg-cyan-950/30'
        : 'border-slate-800/90 hover:border-cyan-400/70 bg-cyber-deep/90';
      let badgeStyle = 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';

      if (isSpecial && !isSelected) {
        borderStyle = 'border-amber-500/50 hover:border-amber-400 bg-cyber-deep/90';
        badgeStyle = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      } else if (hasAcute && !isSelected) {
        borderStyle = 'border-emerald-500/40 hover:border-emerald-400 bg-cyber-deep/90';
        badgeStyle = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      }

      return `
        <div class="letter-tile rounded-xl border ${borderStyle} p-2 flex flex-col justify-between transition-all cursor-pointer select-none group hover:-translate-y-0.5 shadow-sm" data-id="${item.id}">
          <!-- Top: Index & Letter Name -->
          <div class="flex items-center justify-between text-[10px] font-mono leading-none">
            <span class="text-slate-500 font-bold">#${String(item.id).padStart(2, '0')}</span>
            <span class="px-1.5 py-0.5 rounded border ${badgeStyle} text-[9px] font-bold">
              ${item.letter_name}
            </span>
          </div>

          <!-- Center: Grapheme & IPA -->
          <div class="text-center my-1.5">
            <div class="text-xl sm:text-2xl font-black text-white font-mono group-hover:text-cyan-300 leading-none">
              ${item.upper} <span class="text-base text-slate-400">${item.lower}</span>
            </div>
            <div class="soundboard-ipa-badge mt-1 inline-block text-[10px] font-mono font-bold text-cyan-300 bg-black/70 px-1.5 py-0.5 rounded border border-cyan-500/30 leading-none">
              ${item.ipa}
            </div>
          </div>

          <!-- Bottom: Clickable Word Pill (plays word audio directly!) -->
          <button class="tile-word-btn w-full pt-1.5 border-t border-slate-800/90 flex items-center justify-between text-[10px] font-sans text-left hover:text-emerald-300 transition-colors" title="Прослухати слово «${item.example_word}»">
            <div class="truncate">
              <strong class="font-mono text-white group-hover:text-emerald-300 text-[11px]">${item.example_word}</strong>
              <span class="text-[9px] text-slate-400 block truncate">${item.ukrainian_translation}</span>
            </div>
            <span class="text-cyan-400 text-xs flex-shrink-0 ml-1">🗣️</span>
          </button>
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    this.container.querySelectorAll('.soundboard-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentFilter = btn.dataset.filter;
        this.render();
      });
    });

    const grid = this.container.querySelector('#soundboard-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const tile = e.target.closest('.letter-tile');
        if (!tile) return;

        const id = parseInt(tile.dataset.id, 10);
        const item = this.alphabet.find(x => x.id === id);
        if (!item) return;

        this.selectLetter(item);

        // If user clicked the bottom word button, play the example WORD
        if (e.target.closest('.tile-word-btn')) {
          e.stopPropagation();
          audioEngine.playWord(item.example_word, tile, 0.85, item.word_ipa);
          return;
        }

        // Otherwise play the LETTER phoneme
        audioEngine.play(item.upper, tile, 0.85, item.ipa);
      });
    }

    const playLetterBtn = this.container.querySelector('#inspector-play-letter-btn');
    if (playLetterBtn) {
      playLetterBtn.addEventListener('click', () => {
        audioEngine.play(this.selectedLetter.upper, playLetterBtn, 0.85, this.selectedLetter.ipa);
      });
    }

    const playWordBtn = this.container.querySelector('#inspector-play-word-btn');
    if (playWordBtn) {
      playWordBtn.addEventListener('click', () => {
        audioEngine.playWord(this.selectedLetter.example_word, playWordBtn, 0.85, this.selectedLetter.word_ipa);
      });
    }

    const badge = this.container.querySelector('#inspector-badge');
    if (badge) {
      badge.addEventListener('click', () => {
        audioEngine.play(this.selectedLetter.upper, badge, 0.85, this.selectedLetter.ipa);
      });
    }
  }

  selectLetter(item) {
    this.selectedLetter = item;
    const badge = this.container.querySelector('#inspector-badge');
    const ipa = this.container.querySelector('#inspector-ipa');
    const name = this.container.querySelector('#inspector-name');
    const word = this.container.querySelector('#inspector-word');
    const wordIpa = this.container.querySelector('#inspector-word-ipa');
    const wordTrans = this.container.querySelector('#inspector-word-trans');
    const wordLabel = this.container.querySelector('#inspector-word-label');
    const guide = this.container.querySelector('#inspector-guide');
    const mnemonic = this.container.querySelector('#inspector-mnemonic');
    const broddurPill = this.container.querySelector('#inspector-broddur-pill');
    const playLetterBtn = this.container.querySelector('#inspector-play-letter-btn');

    if (badge) badge.innerText = item.grapheme;
    if (ipa) ipa.innerText = item.ipa;
    if (name) name.innerText = `«${item.letter_name}» ${item.letter_name_ipa}`;
    if (word) word.innerText = item.example_word;
    if (wordIpa) wordIpa.innerText = item.word_ipa;
    if (wordTrans) wordTrans.innerText = item.ukrainian_translation;
    if (wordLabel) wordLabel.innerText = item.example_word;
    if (mnemonic) mnemonic.innerText = item.ukrainian_mnemonic;

    if (broddurPill) {
      broddurPill.className = `px-1.5 py-0.2 rounded text-[10px] ${item.has_acute ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'}`;
      broddurPill.innerText = item.has_acute ? '⚡ Broddur (´)' : 'Базова графема';
    }

    const isTwin = item.upper === 'Y' || item.upper === 'Ý';
    if (guide) {
      guide.innerHTML = `${item.articulation_guide}${isTwin ? `<span class="block mt-1 text-amber-300 font-semibold">⚡ Фонологічний близнюк: вимова на 100% ідентична літері ${item.upper === 'Y' ? 'I i' : 'Í í'}.</span>` : ''}`;
    }

    if (playLetterBtn) {
      playLetterBtn.innerHTML = `<span>🔊 Літера [${item.upper}]</span>`;
    }

    this.renderCards();
  }
}
