/**
 * AlphabetSoundboard.js - Compact 8x4 responsive grid (All 32 letters in one screen view)
 * 50% card size reduction with lightweight 3D-flip mnemonics and zero vertical scrolling.
 */

import { audioEngine } from './AudioEngine.js?v=5.9';

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
    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Compact Control Bar & Filter Tabs -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-cyber-border/30">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              32 літери
            </span>
            <h2 class="text-base sm:text-lg font-black text-white flex items-center gap-1.5 font-mono">
              <span>🔤 Ісландська абетка Stafrófið (8×4 Компактна матриця)</span>
            </h2>
            <span class="hidden md:inline text-[11px] text-slate-400 font-sans">• Клік на картку або 💡 мнемоніку</span>
          </div>

          <!-- Compact Filter Pills -->
          <div class="flex items-center gap-1 flex-wrap text-[11px]">
            <button data-filter="all" class="soundboard-filter px-2.5 py-1 rounded-lg font-mono font-bold transition-all ${this.currentFilter === 'all' ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Усі (32)
            </button>
            <button data-filter="monophthong" class="soundboard-filter px-2 py-1 rounded-lg font-mono font-bold transition-all ${this.currentFilter === 'monophthong' ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Монофтонги [6]
            </button>
            <button data-filter="diphthong" class="soundboard-filter px-2 py-1 rounded-lg font-mono font-bold transition-all ${this.currentFilter === 'diphthong' ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Дифтонги [6]
            </button>
            <button data-filter="consonant" class="soundboard-filter px-2 py-1 rounded-lg font-mono font-bold transition-all ${this.currentFilter === 'consonant' ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Приголосні [16]
            </button>
            <button data-filter="special_icelandic" class="soundboard-filter px-2 py-1 rounded-lg font-mono font-bold transition-all ${this.currentFilter === 'special_icelandic' ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Ð, Þ, Æ, Ö [4]
            </button>
          </div>
        </div>

        <!-- Tight 8x4 Grid Layout (32 letters fit cleanly in one view) -->
        <div id="soundboard-grid" class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          <!-- Populated dynamically -->
        </div>

        <!-- Compact Bottom Letter Inspector Panel -->
        <div id="soundboard-inspector" class="p-3 sm:p-4 rounded-xl bg-cyber-deep/95 border border-cyan-500/40 shadow-xl relative overflow-hidden">
          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            
            <div class="flex items-center gap-3.5 w-full md:w-auto">
              <div id="inspector-badge" class="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-400 flex items-center justify-center text-2xl font-black text-cyan-300 font-mono shadow-md flex-shrink-0 cursor-pointer hover:scale-105 transition-transform" title="Клік для прослуховування">
                ${this.selectedLetter.grapheme}
              </div>
              <div class="space-y-0.5 overflow-hidden">
                <div class="flex items-center gap-2 flex-wrap">
                  <span id="inspector-ipa" class="text-xs font-mono font-bold text-cyan-300 bg-black/60 px-2 py-0.2 rounded border border-cyan-500/40">
                    ${this.selectedLetter.ipa}
                  </span>
                  <span id="inspector-name" class="text-xs font-mono text-emerald-400 font-semibold truncate">
                    «${this.selectedLetter.letter_name}» ${this.selectedLetter.letter_name_ipa}
                  </span>
                  <span class="text-[10px] font-mono px-1.5 py-0.2 rounded ${this.selectedLetter.has_acute ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'}">
                    ${this.selectedLetter.has_acute ? '⚡ Broddur (´)' : 'Чиста'}
                  </span>
                </div>
                <div class="text-xs text-slate-200">
                  Зразок: <strong id="inspector-word" class="text-white font-mono font-bold">${this.selectedLetter.example_word}</strong> 
                  <span id="inspector-word-ipa" class="text-[11px] font-mono text-slate-400">${this.selectedLetter.word_ipa}</span> — 
                  <span id="inspector-word-trans" class="text-cyan-200">${this.selectedLetter.ukrainian_translation}</span>
                </div>
                <div id="inspector-guide" class="text-[11px] text-slate-400 font-sans truncate max-w-xl">
                  👄 <strong>Артикуляція:</strong> ${this.selectedLetter.articulation_guide}
                </div>
              </div>
            </div>

            <!-- Compact Inspector Audio Actions -->
            <div class="flex items-center gap-2 w-full md:w-auto justify-end flex-shrink-0">
              <button id="inspector-play-letter-btn" class="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95">
                <span>🔊 ${this.selectedLetter.upper === 'Y' ? 'Назва: [Ufsilon y]' : this.selectedLetter.upper === 'Ý' ? 'Назва: [Ufsilon með broddi]' : `Літера [${this.selectedLetter.upper}]`}</span>
              </button>
              <button id="inspector-play-word-btn" class="px-3 py-2 rounded-lg bg-cyber-deep border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95">
                <span>🗣️ <span id="inspector-word-label">${this.selectedLetter.example_word}</span></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Inline Semantic Rule of Broddur (´) -->
        <div class="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-cyan-500/5 to-transparent border border-amber-500/30 flex items-center gap-2.5 text-xs">
          <span class="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-bold font-mono flex items-center justify-center flex-shrink-0">´</span>
          <div class="text-[11px] text-slate-300 leading-tight">
            <strong class="text-amber-300 font-mono">${this.raddstafir.accent_semantic_rule.title}:</strong>
            Наголос в ісландській завжди на 1-му складі (*Áhersla á fyrsta atkvæði*). Значок (´) позначає якісно іншу фонему (наприклад: *A [a]* ➔ *Á [au]*; *E [ɛ]* ➔ *É [jɛ]*).
          </div>
        </div>
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
      const isFlipped = this.flippedCards.has(item.id);
      const isSpecial = ['Ð', 'Þ', 'Æ', 'Ö'].includes(item.upper);
      const hasAcute = item.has_acute;

      let borderStyle = 'border-slate-800 hover:border-cyan-400';
      let badgeStyle = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      if (isSpecial) {
        borderStyle = 'border-amber-500/50 hover:border-amber-400 shadow-sm shadow-amber-500/10';
        badgeStyle = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      } else if (hasAcute) {
        borderStyle = 'border-emerald-500/40 hover:border-emerald-400';
        badgeStyle = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      }

      return `
        <div class="flip-card-container h-28 relative cursor-pointer select-none group" data-id="${item.id}">
          <div class="flip-card-inner w-full h-full transition-transform duration-300 ${isFlipped ? 'flipped' : ''}" style="transform-style: preserve-3d;">
            
            <!-- FRONT FACE (50% compact height, dense information) -->
            <div class="flip-card-front absolute inset-0 w-full h-full p-2 rounded-xl bg-cyber-deep/90 border ${borderStyle} flex flex-col justify-between transition-all group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-cyan-500/10" style="backface-visibility: hidden;">
              
              <!-- Card Top: Number, Name, Flip Trigger -->
              <div class="flex items-center justify-between text-[10px] font-mono leading-none">
                <span class="text-slate-500 font-bold group-hover:text-cyan-400">#${String(item.id).padStart(2, '0')}</span>
                <span class="px-1 py-0.2 rounded border ${badgeStyle} text-[9px] font-semibold truncate max-w-[70px]" title="${item.letter_name}">
                  ${item.letter_name}
                </span>
                <button class="flip-trigger-btn w-4 h-4 rounded hover:bg-amber-500/20 text-amber-300 text-[10px] flex items-center justify-center transition-colors" title="Мнемоніка">
                  💡
                </button>
              </div>

              <!-- Card Center: Letter & IPA Code -->
              <div class="text-center my-0.5">
                <div class="text-xl sm:text-2xl font-black text-white font-mono group-hover:text-cyan-300 leading-none">
                  ${item.upper} <span class="text-base text-slate-400 group-hover:text-cyan-200">${item.lower}</span>
                </div>
                <div class="soundboard-ipa-badge mt-1 inline-block text-[10px] font-mono font-bold text-cyan-300 bg-black/60 px-1.5 py-0.2 rounded border border-cyan-500/30 leading-none transition-all">
                  ${item.ipa}
                </div>
              </div>

              <!-- Card Bottom: Example Word & Audio Trigger -->
              <div class="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-sans leading-none">
                <div class="truncate text-slate-300">
                  <strong class="font-mono text-white text-[11px]">${item.example_word}</strong>
                  <span class="text-[9px] text-slate-400 hidden sm:inline">(${item.ukrainian_translation})</span>
                </div>
                <button class="card-sound-btn w-5 h-5 rounded hover:bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 transition-colors" title="Слухати">
                  🔊
                </button>
              </div>
            </div>

            <!-- BACK FACE (Concise Ukrainian Mnemonic Hook) -->
            <div class="flip-card-back absolute inset-0 w-full h-full p-2 rounded-xl bg-gradient-to-br from-cyber-deep via-[#0d0918] to-cyber-void border border-amber-500/40 flex flex-col justify-between" style="backface-visibility: hidden; transform: rotateY(180deg);">
              <div class="flex items-center justify-between text-[10px] pb-1 border-b border-amber-500/20 leading-none">
                <span class="font-mono font-bold text-amber-300 flex items-center gap-1">
                  <span>💡</span> <strong>${item.upper} ${item.lower}</strong>
                </span>
                <button class="flip-back-btn text-[9px] text-slate-400 hover:text-white px-1 rounded bg-black/50">
                  ↩
                </button>
              </div>

              <div class="overflow-y-auto pr-0.5 text-[10px] leading-tight text-amber-100/90 font-sans line-clamp-3 my-0.5">
                ${item.ukrainian_mnemonic}
              </div>

              <div class="pt-1 border-t border-amber-500/20 flex items-center justify-between text-[10px]">
                <span class="font-mono text-[9px] text-cyan-300 font-bold">${item.ipa}</span>
                <button class="card-sound-btn px-1.5 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black font-mono text-[9px] font-bold flex items-center gap-1 transition-colors">
                  <span>🔊 Грати</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    // Filter click
    this.container.querySelectorAll('.soundboard-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentFilter = btn.dataset.filter;
        this.render();
      });
    });

    // Card delegation
    const grid = this.container.querySelector('#soundboard-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const cardContainer = e.target.closest('.flip-card-container');
        if (!cardContainer) return;

        const id = parseInt(cardContainer.dataset.id, 10);
        const item = this.alphabet.find(x => x.id === id);
        if (!item) return;

        // Sound button click
        if (e.target.closest('.card-sound-btn')) {
          e.stopPropagation();
          this.selectLetter(item);
          audioEngine.play(item.upper, cardContainer, 0.85, item.ipa);
          return;
        }

        // Flip trigger click
        if (e.target.closest('.flip-trigger-btn') || e.target.closest('.flip-back-btn')) {
          e.stopPropagation();
          this.toggleFlip(id);
          return;
        }

        // Card body click: select & play
        this.selectLetter(item);
        audioEngine.play(item.upper, cardContainer, 0.85, item.ipa);
      });
    }

    // Inspector buttons
    const playLetterBtn = this.container.querySelector('#inspector-play-letter-btn');
    if (playLetterBtn) {
      playLetterBtn.addEventListener('click', () => {
        audioEngine.play(this.selectedLetter.upper, playLetterBtn, 0.85, this.selectedLetter.ipa);
      });
    }

    const playWordBtn = this.container.querySelector('#inspector-play-word-btn');
    if (playWordBtn) {
      playWordBtn.addEventListener('click', () => {
        audioEngine.play(this.selectedLetter.example_word, playWordBtn, 0.85, this.selectedLetter.word_ipa);
      });
    }

    const badge = this.container.querySelector('#inspector-badge');
    if (badge) {
      badge.addEventListener('click', () => {
        audioEngine.play(this.selectedLetter.upper, badge, 0.85, this.selectedLetter.ipa);
      });
    }
  }

  toggleFlip(id) {
    if (this.flippedCards.has(id)) {
      this.flippedCards.delete(id);
    } else {
      this.flippedCards.add(id);
    }
    const card = this.container.querySelector(`.flip-card-container[data-id="${id}"] .flip-card-inner`);
    if (card) {
      card.classList.toggle('flipped', this.flippedCards.has(id));
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
    const playLetterBtn = this.container.querySelector('#inspector-play-letter-btn');

    if (badge) badge.innerText = item.grapheme;
    if (ipa) ipa.innerText = item.ipa;
    if (name) name.innerText = `«${item.letter_name}» ${item.letter_name_ipa}`;
    if (word) word.innerText = item.example_word;
    if (wordIpa) wordIpa.innerText = item.word_ipa;
    if (wordTrans) wordTrans.innerText = item.ukrainian_translation;
    if (wordLabel) wordLabel.innerText = item.example_word;
    
    let guideHtml = `👄 <strong>Артикуляція:</strong> ${item.articulation_guide}`;
    if (item.upper === 'Y' || item.upper === 'Ý') {
      guideHtml += ` <span class="inline-block mt-0.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">⚡ Правило близнюків: звук [${item.ipa}] тотожний ${item.upper === 'Y' ? 'I' : 'Í'}, але назва літери в абетці — «${item.letter_name}»!</span>`;
    }
    if (guide) guide.innerHTML = guideHtml;
    
    if (playLetterBtn) {
      const btnTitle = item.upper === 'Y' 
        ? '🔊 Назва: [Ufsilon y]' 
        : item.upper === 'Ý' 
          ? '🔊 Назва: [Ufsilon með broddi]' 
          : `🔊 Літера [${item.upper}]`;
      playLetterBtn.innerHTML = `<span>${btnTitle}</span>`;
    }
  }
}
