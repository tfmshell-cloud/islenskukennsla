/**
 * BinMorphologyLab.js
 * Академічний Граматичний Кодекс та Морфологічна Матриця BÍN (Beygingarlýsing íslensks nútímamáls)
 * 3 режими:
 * 1. Іменники у 4 відмінках (NF 🔵, ÞF 🟢, ÞGF 🟡, EF 🌸) + Суфіксальний артикль (Greinir) з пошуком і фільтрами
 * 2. Повні парадигми дієвідмінювання 10 фундаментальних дієслів рівня A1
 * 3. 4 Академічні таблиці (Артикль Greinir, Числівники 1–4 за родами, Керування í/á, Звукові мутації Hljóðvarp)
 */

import { BIN_NOUNS_PARADIGMS, BIN_VERBS_PARADIGMS, ACADEMIC_GRAMMAR_CODEX } from '../data/bin_grammar_matrix_data.js?v=7.0';
import { audioEngine } from './AudioEngine.js?v=7.0';

export class BinMorphologyLab {
  constructor(container) {
    this.container = container;
    this.activeSection = 'nouns'; // 'nouns' | 'verbs' | 'codex'
    this.modFilter = 'ALL'; // 'ALL' | 'M0' | 'K1' | 'K2' | 'K3'
    this.genderFilter = 'ALL'; // 'ALL' | 'kk.' | 'kvk.' | 'hk.'
    this.searchQuery = '';
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Master Academic Header & Mode Switcher -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#091526] via-cyber-deep to-[#140b29] border border-cyan-500/40 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                🏛️ Beygingarlýsing íslensks nútímamáls (BÍN)
              </span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                4 Відмінки • Артикль Greinir • 10 Дієслів • Числівники 1–4
              </span>
            </div>
            <h2 class="text-base sm:text-xl font-black text-white font-mono">
              Академічний Граматичний Довідник та Морфологічна Матриця BÍN
            </h2>
            <p class="text-xs text-slate-400 font-sans">
              Повні парадигми відмінювання іменників, дієслівних класів, суфіксального артикля та числівників за стандартом Інституту Арні Маґнуссона
            </p>
          </div>

          <div class="flex items-center gap-1.5 bg-black/70 p-1.5 rounded-xl border border-slate-800 text-xs font-mono self-start lg:self-auto flex-wrap">
            <button data-bin-sec="nouns" class="bin-sec-btn px-3.5 py-2 rounded-lg font-extrabold transition-all ${
              this.activeSection === 'nouns'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }">
              📘 1. Відмінювання Іменників (${BIN_NOUNS_PARADIGMS.length})
            </button>
            <button data-bin-sec="verbs" class="bin-sec-btn px-3.5 py-2 rounded-lg font-extrabold transition-all ${
              this.activeSection === 'verbs'
                ? 'bg-emerald-400 text-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }">
              ⚡ 2. Парадигми Дієслів (${BIN_VERBS_PARADIGMS.length})
            </button>
            <button data-bin-sec="codex" class="bin-sec-btn px-3.5 py-2 rounded-lg font-extrabold transition-all ${
              this.activeSection === 'codex'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }">
              🏛️ 3. Граматичні Таблиці (4)
            </button>
          </div>
        </div>

        <!-- SECTION 1: NOUNS 4-CASE DECLENSION MATRIX -->
        <div class="${this.activeSection === 'nouns' ? '' : 'hidden'} space-y-3.5">
          <!-- Filter & Search Control Bar -->
          <div class="p-3.5 rounded-xl bg-cyber-deep/95 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div class="flex items-center gap-1.5 flex-wrap text-xs font-mono">
              <span class="text-slate-400 mr-1">Модуль:</span>
              ${['ALL', 'M0', 'K1', 'K2', 'K3'].map(m => `
                <button data-mod-filter="${m}" class="bin-mod-btn px-2.5 py-1 rounded-lg font-bold border transition-all ${
                  this.modFilter === m
                    ? 'bg-cyan-500 text-black border-cyan-400'
                    : 'bg-black/60 text-slate-400 border-slate-800 hover:text-white'
                }">
                  ${m === 'ALL' ? 'Усі' : m === 'M0' ? 'Модуль 0' : m === 'K1' ? 'Урок 1' : m === 'K2' ? 'Урок 2' : 'Урок 3'}
                </button>
              `).join('')}

              <span class="text-slate-600 mx-1">|</span>
              <span class="text-slate-400 mr-1">Рід:</span>
              ${['ALL', 'kk.', 'kvk.', 'hk.'].map(g => `
                <button data-gen-filter="${g}" class="bin-gen-btn px-2.5 py-1 rounded-lg font-bold border transition-all ${
                  this.genderFilter === g
                    ? 'bg-purple-500 text-black border-purple-400'
                    : 'bg-black/60 text-slate-400 border-slate-800 hover:text-white'
                }">
                  ${g === 'ALL' ? 'Усі роди' : g === 'kk.' ? 'Чол. (kk.)' : g === 'kvk.' ? 'Жін. (kvk.)' : 'Сер. (hk.)'}
                </button>
              `).join('')}
            </div>

            <div class="relative w-full md:w-64">
              <input
                id="bin-noun-search"
                type="text"
                value="${this.searchQuery}"
                placeholder="Пошук слова (hús, samloka, кава...)"
                class="w-full px-3 py-1.5 rounded-xl bg-black/80 border border-slate-700 focus:border-cyan-400 text-xs text-white font-sans focus:outline-none"
              />
            </div>
          </div>

          <!-- Responsive BÍN Declension Cards / Table -->
          <div id="bin-nouns-list" class="space-y-2.5">
            ${this.renderFilteredNouns()}
          </div>
        </div>

        <!-- SECTION 2: VERB CONJUGATION PARADIGMS -->
        <div class="${this.activeSection === 'verbs' ? '' : 'hidden'} space-y-3.5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            ${BIN_VERBS_PARADIGMS.map(v => `
              <div class="p-4 rounded-2xl bg-cyber-deep/95 border border-emerald-500/30 hover:border-emerald-400/60 shadow-lg space-y-3">
                <div class="flex items-start justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <div>
                    <div class="flex items-center gap-2">
                      <h3 class="text-base sm:text-lg font-black text-white font-mono">${v.infinitive}</h3>
                      <span class="text-xs font-mono text-cyan-300 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30">${v.ipa}</span>
                    </div>
                    <div class="text-xs text-amber-200 font-sans font-bold mt-0.5">🇺🇦 ${v.uk} • <span class="text-emerald-400 font-mono font-normal">${v.group}</span></div>
                  </div>
                  <button data-speak-word="${v.infinitive.replace('að ', '')}" class="bin-audio-trigger px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-400/50 text-emerald-200 font-mono text-xs font-bold flex items-center gap-1 flex-shrink-0">
                    <span>🔊 Слухати</span>
                  </button>
                </div>

                <!-- 6 Persons Grid -->
                <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div class="p-2 rounded-lg bg-black/60 border border-slate-800/90 space-y-1">
                    <div class="text-[10px] text-cyan-400 uppercase font-bold">Однина (Eintala)</div>
                    <div class="text-white">1. <strong class="text-cyan-200">${v.eg}</strong></div>
                    <div class="text-white">2. <strong class="text-cyan-200">${v.thu}</strong></div>
                    <div class="text-white">3. <strong class="text-cyan-200">${v.hann}</strong></div>
                  </div>
                  <div class="p-2 rounded-lg bg-black/60 border border-slate-800/90 space-y-1">
                    <div class="text-[10px] text-purple-400 uppercase font-bold">Множина (Fleirtala)</div>
                    <div class="text-white">1. <strong class="text-purple-200">${v.vid}</strong></div>
                    <div class="text-white">2. <strong class="text-purple-200">${v.thid}</strong></div>
                    <div class="text-white">3. <strong class="text-purple-200">${v.their}</strong></div>
                  </div>
                </div>

                <div class="text-xs text-slate-300 font-sans bg-black/40 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed">
                  💡 ${v.note}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTION 3: ACADEMIC GRAMMAR CODEX (4 TABLES) -->
        <div class="${this.activeSection === 'codex' ? '' : 'hidden'} space-y-4">
          ${ACADEMIC_GRAMMAR_CODEX.map(tbl => `
            <div class="p-4 sm:p-5 rounded-2xl bg-cyber-deep/95 border border-amber-500/30 shadow-xl space-y-3">
              <div class="space-y-1 border-b border-slate-800 pb-3">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ${tbl.badge}
                </span>
                <h3 class="text-sm sm:text-lg font-black text-white font-mono pt-0.5">${tbl.title}</h3>
                <p class="text-xs text-slate-300 font-sans leading-relaxed">${tbl.summary}</p>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr class="border-b border-slate-700 text-cyan-300 bg-black/60">
                      ${tbl.columns.map(col => `<th class="p-2.5 font-bold">${col}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/80">
                    ${tbl.rows.map(row => `
                      <tr class="hover:bg-white/5 transition-colors">
                        ${row.map((cell, idx) => `
                          <td class="p-2.5 ${idx === 0 ? 'font-bold text-amber-300' : 'text-slate-200 font-sans'}">${cell}</td>
                        `).join('')}
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderFilteredNouns() {
    const q = this.searchQuery.trim().toLowerCase();
    const list = BIN_NOUNS_PARADIGMS.filter(n => {
      if (this.modFilter !== 'ALL' && n.mod !== this.modFilter) return false;
      if (this.genderFilter !== 'ALL' && n.gender !== this.genderFilter) return false;
      if (q) {
        return (
          n.lemma.toLowerCase().includes(q) ||
          n.uk.toLowerCase().includes(q) ||
          n.tf.toLowerCase().includes(q) ||
          n.tgf.toLowerCase().includes(q)
        );
      }
      return true;
    });

    if (list.length === 0) {
      return `<div class="p-6 text-center text-slate-400 font-mono text-xs bg-black/50 rounded-xl border border-slate-800">Не знайдено іменників за вашим запитом.</div>`;
    }

    return list.map(n => `
      <div class="p-3.5 sm:p-4 rounded-2xl bg-cyber-deep/95 border border-slate-800 hover:border-cyan-500/50 transition-all shadow-md space-y-2.5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center gap-2.5 flex-wrap">
            <span class="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold">${n.mod}</span>
            <strong class="text-base sm:text-lg font-black text-white font-mono">${n.lemma}</strong>
            <span class="text-xs font-mono text-cyan-400 bg-black/60 px-2 py-0.5 rounded border border-slate-800">${n.ipa}</span>
            <span class="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold">${n.gender} • ${n.declClass}</span>
            <span class="text-xs sm:text-sm font-bold text-amber-200 font-sans">— ${n.uk}</span>
          </div>

          <button data-speak-word="${n.lemma}" class="bin-audio-trigger px-3 py-1 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-extrabold flex items-center gap-1 self-start sm:self-auto shadow-sm">
            <span>🔊 Вимова</span>
          </button>
        </div>

        <!-- 4 Cases + Greinir Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
          <div class="p-2 rounded-xl bg-cyan-950/30 border border-cyan-500/40">
            <div class="text-[10px] text-cyan-400 font-bold">1. Nefnifall 🔵 (Хто/Що)</div>
            <div class="text-sm font-black text-white mt-0.5">${n.nf}</div>
          </div>
          <div class="p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/40">
            <div class="text-[10px] text-emerald-400 font-bold">2. Þolfall 🟢 (Кого/Що)</div>
            <div class="text-sm font-black text-emerald-200 mt-0.5">${n.tf}</div>
          </div>
          <div class="p-2 rounded-xl bg-amber-950/30 border border-amber-500/40">
            <div class="text-[10px] text-amber-400 font-bold">3. Þágufall 🟡 (Ким/Де/Звідки)</div>
            <div class="text-sm font-black text-amber-200 mt-0.5">${n.tgf}</div>
          </div>
          <div class="p-2 rounded-xl bg-rose-950/30 border border-rose-500/40">
            <div class="text-[10px] text-rose-400 font-bold">4. Eignarfall 🌸 (Чий/Куди til)</div>
            <div class="text-sm font-black text-rose-200 mt-0.5">${n.ef}</div>
          </div>
          <div class="p-2 rounded-xl bg-purple-950/30 border border-purple-500/40 col-span-2 sm:col-span-1">
            <div class="text-[10px] text-purple-300 font-bold">+ Greinir (Означений)</div>
            <div class="text-xs font-bold text-purple-200 mt-0.5">${n.defNf}</div>
          </div>
        </div>

        <div class="text-[11px] text-slate-300 font-sans bg-black/50 px-3 py-1.5 rounded-lg border border-slate-800/80">
          🔬 <strong>Правило BÍN:</strong> ${n.rule}
        </div>
      </div>
    `).join('');
  }

  bindEvents() {
    this.container.querySelectorAll('.bin-sec-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeSection = btn.dataset.binSec;
        this.render();
      });
    });

    this.container.querySelectorAll('.bin-mod-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.modFilter = btn.dataset.modFilter;
        this.render();
      });
    });

    this.container.querySelectorAll('.bin-gen-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.genderFilter = btn.dataset.genFilter;
        this.render();
      });
    });

    const searchInput = this.container.querySelector('#bin-noun-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const listBox = this.container.querySelector('#bin-nouns-list');
        if (listBox) {
          listBox.innerHTML = this.renderFilteredNouns();
          this.bindAudioTriggers(listBox);
        }
      });
    }

    this.bindAudioTriggers(this.container);
  }

  bindAudioTriggers(rootEl) {
    rootEl.querySelectorAll('.bin-audio-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const w = btn.dataset.speakWord;
        if (w) audioEngine.playWord(w, btn);
      });
    });
  }
}
