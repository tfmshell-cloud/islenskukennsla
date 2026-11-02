/**
 * BaraTalaAcoustics.js - Step 0.3: Phonetic Trap Engine & Positional G-Rules
 * Focuses purely on:
 * 1. Preaspiration (pp, tt, kk ➔ [hp, ht, hk])
 * 2. Lateral Explosion (ll ➔ [tl], nn ➔ [tn])
 * 3. Interdentals (Þorn [θ] vs Eð [ð])
 * 4. Labiovelars & F-clusters (hv ➔ [kv], fn ➔ [pn], fl ➔ [pl])
 * 5. 4 Positional States of Letter G
 * High-contrast dual theme (Obsidian Dark & Nordic Light Paper)
 */

import { audioEngine } from './AudioEngine.js?v=5.5';

export class BaraTalaAcoustics {
  constructor(container, acousticTraps) {
    this.container = container;
    this.acousticTraps = acousticTraps || {};
    this.currentTrapKey = 'preaspiration';
  }

  render() {
    const trapKeys = Object.keys(this.acousticTraps);
    if (!this.acousticTraps[this.currentTrapKey] && trapKeys.length > 0) {
      this.currentTrapKey = trapKeys[0];
    }

    const trap = this.acousticTraps[this.currentTrapKey];

    this.container.innerHTML = `
      <div class="space-y-3">
        <!-- 5 Compact Trap Selector Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
          <button data-trap="preaspiration" class="trap-tab px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${this.currentTrapKey === 'preaspiration' ? 'active-trap-tab shadow-sm' : 'inactive-trap-tab'}">
            1. Преаспірація [h]
          </button>
          <button data-trap="lateral_explosion" class="trap-tab px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${this.currentTrapKey === 'lateral_explosion' ? 'active-trap-tab shadow-sm' : 'inactive-trap-tab'}">
            2. Боковий вибух [tl, tn]
          </button>
          <button data-trap="interdentals" class="trap-tab px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${this.currentTrapKey === 'interdentals' ? 'active-trap-tab shadow-sm' : 'inactive-trap-tab'}">
            3. Þorn [θ] vs Eð [ð]
          </button>
          <button data-trap="labiovelars_and_f_clusters" class="trap-tab px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${this.currentTrapKey === 'labiovelars_and_f_clusters' ? 'active-trap-tab shadow-sm' : 'inactive-trap-tab'}">
            4. hv ➔ [kv], fn ➔ [pn]
          </button>
          <button data-trap="g_states" class="trap-tab px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${this.currentTrapKey === 'g_states' ? 'active-trap-tab shadow-sm' : 'inactive-trap-tab'}">
            5. 4 стани літери G
          </button>
        </div>

        <!-- Active Trap Display Card -->
        <div id="trap-display-card" class="p-4 sm:p-5 rounded-2xl trap-main-card shadow-lg space-y-3.5 transition-all">
          ${trap ? `
            <div class="space-y-3">
              <!-- Header info of trap -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b trap-divider">
                <div class="flex items-center gap-2.5 flex-wrap">
                  <span class="px-2.5 py-1 min-w-[36px] rounded-lg trap-ipa-pill font-mono font-black text-xs sm:text-sm flex items-center justify-center shadow-sm">
                    ${trap.ipa_symbol || '⚡'}
                  </span>
                  <div>
                    <h3 class="text-sm sm:text-base font-black font-mono trap-title">${trap.name_is}</h3>
                    <span class="text-xs font-sans trap-subtitle font-medium">${trap.name_uk || 'Акустична пастка вимови'}</span>
                  </div>
                </div>
                
                <div class="px-2.5 py-1 rounded-lg trap-diagram-box text-xs font-mono font-bold shadow-sm self-start sm:self-auto flex items-center gap-1.5">
                  <span class="opacity-80">📐 Артикуляція:</span>
                  <span class="trap-diagram-text">${trap.diagram}</span>
                </div>
              </div>

              <!-- Linguistic Rule Explanation -->
              <div class="p-3 rounded-xl trap-rule-box space-y-1">
                <div class="trap-rule-title text-[10px] font-mono font-bold uppercase tracking-wider">Правило ортоепії:</div>
                <p class="trap-rule-text text-xs leading-relaxed font-sans">
                  ${trap.rule}
                </p>
              </div>

              <!-- Interactive Example Words Grid -->
              <div class="space-y-2">
                <div class="text-xs font-mono font-bold trap-section-title uppercase tracking-wider flex items-center gap-1.5">
                  <span>🔊 Еталонні слова-приклади з нативною аудіо-вимовою:</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  ${trap.examples.map(ex => `
                    <div class="trap-example-card p-3 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between space-y-2 shadow-sm" data-word="${ex.word}" data-ipa="${ex.ipa}">
                      <div>
                        <div class="flex items-center justify-between mb-1">
                          <span class="text-base sm:text-lg font-mono font-extrabold trap-word-text">${ex.word}</span>
                          <span class="text-xs font-mono font-bold trap-word-ipa px-2 py-0.5 rounded">${ex.ipa}</span>
                        </div>
                        <div class="trap-word-meaning text-xs font-sans font-bold">«${ex.meaning}»</div>
                        <div class="trap-note-box text-[11px] font-sans mt-1.5 leading-snug p-2 rounded-lg border">
                          💡 <strong class="trap-note-title">Пастка:</strong> <span class="trap-note-desc">${ex.trap_note}</span>
                        </div>
                      </div>

                      <button class="trap-play-btn w-full py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm mt-1" data-word="${ex.word}" data-ipa="${ex.ipa}">
                        <span>🔊 Слухати [${ex.word}]</span>
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Forensic Tip Summary Banner -->
              <div class="p-3 rounded-xl trap-tip-box flex items-start gap-2.5 text-xs">
                <span class="text-base">💡</span>
                <div class="space-y-0.5">
                  <strong class="trap-tip-title font-mono font-bold">Порада україномовному студенту:</strong>
                  <p class="trap-tip-desc font-sans leading-relaxed">
                    Українська мова схильна до пом'якшення та буквального читання літер. В ісландській мові ці фонетичні пастки є вирішальними, щоб носії мови в Рейк'явіку сприймали вашу вимову без непорозумінь.
                  </p>
                </div>
              </div>
            </div>
          ` : `
            <div class="p-4 text-center text-slate-400">Виберіть пастку для перегляду.</div>
          `}
        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Trap tab click
    this.container.querySelectorAll('.trap-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.currentTrapKey = e.currentTarget.dataset.trap;
        this.render();
      });
    });

    // Word example click (whole card)
    this.container.querySelectorAll('.trap-example-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const word = card.dataset.word;
        const ipa = card.dataset.ipa;
        audioEngine.play(word, card, 0.85, ipa);
      });
    });

    // Word play button click
    this.container.querySelectorAll('.trap-play-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = btn.dataset.word;
        const ipa = btn.dataset.ipa;
        const card = btn.closest('.trap-example-card');
        audioEngine.play(word, card || btn, 0.85, ipa);
      });
    });
  }
}
