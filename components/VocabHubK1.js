/**
 * VocabHubK1.js - Compact Vocabulary & Mnemonics Hub for Kafli 1
 * Professions (12), Countries & Nationalities (10), Languages (8) & Proficiency Adverbs (3)
 */

import { audioEngine } from './AudioEngine.js?v=6.2';

export class VocabHubK1 {
  constructor(container, countriesData, professionsData, languagesData) {
    this.container = container;
    this.countries = countriesData;
    this.professions = professionsData;
    this.languages = languagesData;
    this.currentFilter = 'all'; // 'all', 'professions', 'countries', 'languages'
    this.selectedItem = null;
    this.flippedCards = new Set();
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Filter Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-cyber-border/30">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Урок 1 • Словниковий запас
            </span>
            <h3 class="text-sm sm:text-base font-black text-white font-mono">
              📚 Словник: Професії, Країни та Мови
            </h3>
          </div>

          <!-- Compact Filter Pills -->
          <div class="flex items-center gap-1 flex-wrap text-xs font-mono">
            <button data-filter="all" class="vocab-filter-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.currentFilter === 'all' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Усі (33)
            </button>
            <button data-filter="professions" class="vocab-filter-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.currentFilter === 'professions' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Професії [12]
            </button>
            <button data-filter="countries" class="vocab-filter-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.currentFilter === 'countries' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Країни [10]
            </button>
            <button data-filter="languages" class="vocab-filter-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.currentFilter === 'languages' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Мови [8] + Рівні [3]
            </button>
          </div>
        </div>

        <!-- Vocab Cards Grid (Compact 3D Flipping Cards) -->
        <div id="vocab-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          <!-- Populated dynamically -->
        </div>

        <!-- Selected Vocab Detail Drawer (Compact) -->
        <div id="vocab-detail-drawer" class="p-3.5 rounded-xl bg-cyber-deep/95 border border-amber-500/30 shadow-md">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3">
              <span id="detail-icon" class="text-2xl">💡</span>
              <div class="space-y-0.5">
                <div class="flex items-center gap-2">
                  <strong id="detail-title" class="text-sm font-bold font-mono text-white">Læknir</strong>
                  <span id="detail-ipa" class="font-mono text-cyan-300 text-[11px]">[ˈlaiːknɪr]</span>
                  <span id="detail-gender" class="text-[10px] text-slate-400 font-mono">(kk.)</span>
                </div>
                <div id="detail-trans" class="text-amber-200 font-sans">лікар</div>
                <div id="detail-mnemonic" class="text-[11px] text-slate-300 font-sans max-w-2xl line-clamp-2">
                  🩺 Лікар, що дає ліки: сполучення kn містить гортанну мікропаузу [hkn]!
                </div>
              </div>
            </div>
            <button id="detail-speak-btn" class="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs flex items-center gap-1.5 self-start sm:self-auto transition-all active:scale-95 shadow-sm">
              <span>🔊 Озвучити зразок</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.renderCards();
    this.bindEvents();
  }

  renderCards() {
    const grid = this.container.querySelector('#vocab-grid');
    if (!grid) return;

    let items = [];

    if (this.currentFilter === 'all' || this.currentFilter === 'professions') {
      items.push(...this.professions.map(p => ({
        type: 'profession',
        id: `prof_${p.id}`,
        title: p.term,
        sub: p.gender === 'kk' ? 'чол. рід' : 'жін. рід',
        ipa: p.ipa,
        trans: p.translation,
        mnemonic: p.mnemonic_hook,
        sentence: p.example_sentence,
        icon: '💼',
        audioText: p.term
      })));
    }

    if (this.currentFilter === 'all' || this.currentFilter === 'countries') {
      items.push(...this.countries.map(c => ({
        type: 'country',
        id: `country_${c.id}`,
        title: c.country,
        sub: c.dative_fra,
        ipa: c.ipa,
        trans: c.translation,
        mnemonic: `🟡 ${c.dative_rule}. Національності: ${c.nationality_m} / ${c.nationality_f}.`,
        sentence: `Ég er frá ${c.dative_fra.replace('frá ', '')}.`,
        icon: c.flag || '🌍',
        audioText: c.dative_fra
      })));
    }

    if (this.currentFilter === 'all' || this.currentFilter === 'languages') {
      items.push(...this.languages.languages.map((l, idx) => ({
        type: 'language',
        id: `lang_${idx}`,
        title: l.name,
        sub: 'Tungumál',
        ipa: l.ipa,
        trans: l.meaning,
        mnemonic: `Мова спілкування: «Ég tala ${l.name}».`,
        sentence: `Ég tala ${l.name}.`,
        icon: l.flag || '🗣️',
        audioText: l.name
      })));

      items.push(...this.languages.proficiency_adverbs.map((a, idx) => ({
        type: 'proficiency',
        id: `adv_${idx}`,
        title: a.term,
        sub: 'Прислівник',
        ipa: a.ipa,
        trans: a.meaning,
        mnemonic: `Рівень володіння: ${a.example}`,
        sentence: a.example,
        icon: '⚡',
        audioText: a.example
      })));
    }

    grid.innerHTML = items.map(item => {
      const isFlipped = this.flippedCards.has(item.id);

      return `
        <div class="flip-card-container h-28 relative cursor-pointer select-none group" data-vocab-id="${item.id}" data-audio-text="${item.audioText}" data-title="${item.title}" data-ipa="${item.ipa}" data-trans="${item.trans}" data-mnemonic="${item.mnemonic}" data-sentence="${item.sentence}">
          <div class="flip-card-inner w-full h-full transition-transform duration-300 ${isFlipped ? 'flipped' : ''}" style="transform-style: preserve-3d;">
            
            <!-- FRONT FACE -->
            <div class="flip-card-front absolute inset-0 w-full h-full p-2 rounded-xl bg-cyber-deep/90 border border-slate-800 hover:border-amber-400 flex flex-col justify-between transition-all group-hover:scale-[1.02] shadow-sm" style="backface-visibility: hidden;">
              <div class="flex items-center justify-between text-[10px] font-mono leading-none">
                <span class="text-slate-400 font-bold">${item.icon}</span>
                <span class="text-[9px] text-slate-400 bg-black/40 px-1 py-0.2 rounded border border-slate-800">${item.sub}</span>
                <button class="flip-vocab-btn w-4 h-4 rounded text-amber-300 hover:bg-amber-500/20 flex items-center justify-center transition-colors" title="Мнемоніка">
                  💡
                </button>
              </div>

              <div class="text-center my-0.5">
                <div class="text-xs sm:text-sm font-black text-white font-mono group-hover:text-amber-300 transition-colors leading-tight truncate">
                  ${item.title}
                </div>
                <div class="text-[10px] font-mono text-cyan-300 mt-0.5">${item.ipa}</div>
              </div>

              <div class="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-sans leading-none">
                <span class="text-slate-300 truncate">${item.trans.split('•')[0]}</span>
                <button class="card-sound-btn text-cyan-400 hover:text-white flex items-center justify-center">
                  🔊
                </button>
              </div>
            </div>

            <!-- BACK FACE (MNEMONIC & GRAMMAR) -->
            <div class="flip-card-back absolute inset-0 w-full h-full p-2 rounded-xl bg-gradient-to-br from-cyber-deep to-cyber-void border border-amber-500/50 flex flex-col justify-between" style="backface-visibility: hidden; transform: rotateY(180deg);">
              <div class="flex items-center justify-between text-[10px] pb-1 border-b border-amber-500/20 leading-none">
                <strong class="font-mono text-amber-300 truncate text-[11px]">${item.title}</strong>
                <button class="flip-back-vocab-btn text-[9px] text-slate-400 px-1 rounded bg-black/50">↩</button>
              </div>

              <div class="text-[9px] leading-tight text-slate-200 font-sans overflow-y-auto pr-0.5 line-clamp-3 my-0.5">
                ${item.mnemonic}
              </div>

              <div class="pt-1 border-t border-amber-500/20 flex items-center justify-between text-[10px] font-mono">
                <span class="text-cyan-300 text-[9px] truncate">${item.sentence || ''}</span>
                <button class="card-sound-btn text-amber-300 text-[10px]">🔊</button>
              </div>
            </div>

          </div>
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    this.container.querySelectorAll('.vocab-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentFilter = btn.dataset.filter;
        this.render();
      });
    });

    const grid = this.container.querySelector('#vocab-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const card = e.target.closest('.flip-card-container');
        if (!card) return;

        const id = card.dataset.vocabId;
        const title = card.dataset.title;
        const ipa = card.dataset.ipa;
        const trans = card.dataset.trans;
        const mnemonic = card.dataset.mnemonic;
        const sentence = card.dataset.sentence;
        const audioText = card.dataset.audioText;

        // Flip trigger
        if (e.target.closest('.flip-vocab-btn') || e.target.closest('.flip-back-vocab-btn')) {
          e.stopPropagation();
          if (this.flippedCards.has(id)) {
            this.flippedCards.delete(id);
          } else {
            this.flippedCards.add(id);
          }
          const inner = card.querySelector('.flip-card-inner');
          if (inner) inner.classList.toggle('flipped', this.flippedCards.has(id));
          return;
        }

        // Sound trigger or card click: update drawer and speak
        this.updateDrawer({ title, ipa, trans, mnemonic, sentence, audioText });
        audioEngine.play(audioText || title, card, 0.85, ipa);
      });
    }

    const drawerSpeakBtn = this.container.querySelector('#detail-speak-btn');
    if (drawerSpeakBtn) {
      drawerSpeakBtn.addEventListener('click', () => {
        const text = drawerSpeakBtn.dataset.audioText || 'Læknir';
        audioEngine.play(text, drawerSpeakBtn);
      });
    }
  }

  updateDrawer({ title, ipa, trans, mnemonic, sentence, audioText }) {
    const dTitle = this.container.querySelector('#detail-title');
    const dIpa = this.container.querySelector('#detail-ipa');
    const dTrans = this.container.querySelector('#detail-trans');
    const dMnemonic = this.container.querySelector('#detail-mnemonic');
    const dBtn = this.container.querySelector('#detail-speak-btn');

    if (dTitle) dTitle.innerText = title;
    if (dIpa) dIpa.innerText = ipa;
    if (dTrans) dTrans.innerText = trans;
    if (dMnemonic) dMnemonic.innerText = mnemonic;
    if (dBtn) {
      dBtn.dataset.audioText = sentence || audioText || title;
      dBtn.innerHTML = `<span>🔊 Озвучити «${title}»</span>`;
    }
  }
}
