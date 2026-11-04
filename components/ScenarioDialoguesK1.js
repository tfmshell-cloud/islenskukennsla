/**
 * ScenarioDialoguesK1.js - 3 Interactive Life Scenarios for Kafli 1:
 * 1. Útlendingastofnun (Kateryna from Ukraine)
 * 2. Workplace IT (Jón & Paweł from Poland)
 * 3. Cafe Meeting (Anna, María & Olena from Ukraine)
 */

import { audioEngine } from './AudioEngine.js?v=6.7';

export class ScenarioDialoguesK1 {
  constructor(container, scenariosData) {
    this.container = container;
    this.scenarios = scenariosData;
    this.activeScenarioIdx = 0;
    this.showTranslations = true;
    this.isPlayingAll = false;
  }

  render() {
    const sc = this.scenarios[this.activeScenarioIdx];

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Header & Scenario Tabs -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-cyber-border/30">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/30">
              Урок 1 • Діалоги
            </span>
            <h3 class="text-sm sm:text-base font-black text-white font-mono">
              💬 Реальні життєві ситуації та бесіди (3 сценарії)
            </h3>
          </div>

          <div class="flex items-center gap-2 text-xs">
            <button id="toggle-k1-trans-btn" class="px-2.5 py-1 rounded-lg bg-black/60 border border-slate-800 text-slate-300 font-mono font-bold transition-all flex items-center gap-1.5">
              <span>👁️ Переклад: <strong id="k1-trans-state" class="text-amber-400">${this.showTranslations ? 'ТАК' : 'НІ'}</strong></span>
            </button>
            <button id="play-full-k1-scenario-btn" class="px-3.5 py-1 rounded-lg bg-rose-500 hover:bg-rose-400 text-black font-extrabold font-mono shadow-sm transition-all flex items-center gap-1">
              <span>▶️ Весь діалог</span>
            </button>
          </div>
        </div>

        <!-- Scenario Switcher Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
          ${this.scenarios.map((s, idx) => `
            <button data-sc-idx="${idx}" class="scenario-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${this.activeScenarioIdx === idx ? 'bg-rose-500 text-black shadow-md shadow-rose-500/30' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              #${idx + 1}: ${s.title.split('(')[0]}
            </button>
          `).join('')}
        </div>

        <!-- Scenario Context Info Banner -->
        <div class="p-3 rounded-xl bg-gradient-to-r from-rose-500/10 via-cyber-deep to-cyber-deep border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div class="space-y-0.5">
            <div class="flex items-center gap-2">
              <span class="font-bold text-white font-mono text-sm">${sc.title}</span>
              <span class="px-1.5 py-0.2 rounded bg-black/60 text-[10px] font-mono text-rose-300 border border-rose-500/30">${sc.location}</span>
            </div>
            <p class="text-[11px] text-slate-300 font-sans">${sc.context}</p>
          </div>
          <div class="text-[10px] font-mono text-slate-400 self-start sm:self-auto">
            Учасники: ${sc.speakers.join(', ')}
          </div>
        </div>

        <!-- Dialogue Lines Bubbles -->
        <div class="space-y-2 max-w-3xl mx-auto">
          ${sc.dialogue.map((line, idx) => {
            const isAlt = idx % 2 === 1;
            const roleBorder = isAlt ? 'border-cyan-500/40 hover:border-cyan-400' : 'border-rose-500/40 hover:border-rose-400';
            const alignClass = isAlt ? 'ml-4 sm:ml-12' : 'mr-4 sm:mr-12';

            return `
              <div id="k1-dlg-line-${idx}" class="k1-dialogue-card p-3 rounded-xl bg-cyber-deep/90 border ${roleBorder} transition-all cursor-pointer group ${alignClass}" data-cue="${line.is}">
                <div class="flex items-start gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-black/60 border border-slate-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    ${line.avatar}
                  </div>
                  <div class="flex-grow space-y-0.5">
                    <div class="flex items-center justify-between text-[10px] font-mono">
                      <span class="font-bold text-white">${line.speaker} <span class="text-slate-400 font-sans">(${line.role})</span></span>
                      <span class="text-slate-500 group-hover:text-amber-400 flex items-center gap-1">
                        <span>🔊</span> <span class="hidden sm:inline">Слухати</span>
                      </span>
                    </div>

                    <div class="text-sm sm:text-base font-bold text-white font-mono group-hover:text-amber-200 transition-colors leading-snug">
                      ${line.is}
                    </div>

                    <div class="text-[11px] font-mono text-cyan-400 font-semibold">
                      ${line.ipa}
                    </div>

                    <div class="k1-uk-trans text-[11px] text-amber-200/90 font-sans ${this.showTranslations ? '' : 'hidden'}">
                      🇺🇦 ${line.uk}
                    </div>

                    <div class="text-[10px] text-slate-400 font-sans border-t border-slate-800/60 pt-0.5 mt-0.5">
                      💡 ${line.note}
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('.scenario-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.scIdx, 10);
        this.activeScenarioIdx = idx;
        this.render();
      });
    });

    const toggleBtn = this.container.querySelector('#toggle-k1-trans-btn');
    const stateLabel = this.container.querySelector('#k1-trans-state');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.showTranslations = !this.showTranslations;
        if (stateLabel) {
          stateLabel.innerText = this.showTranslations ? 'ТАК' : 'НІ';
          stateLabel.className = this.showTranslations ? 'text-amber-400' : 'text-slate-500';
        }
        this.container.querySelectorAll('.k1-uk-trans').forEach(el => {
          el.classList.toggle('hidden', !this.showTranslations);
        });
      });
    }

    this.container.querySelectorAll('.k1-dialogue-card').forEach(card => {
      card.addEventListener('click', () => {
        const cue = card.dataset.cue;
        audioEngine.play(cue, card);
      });
    });

    const playAllBtn = this.container.querySelector('#play-full-k1-scenario-btn');
    if (playAllBtn) {
      playAllBtn.addEventListener('click', async () => {
        if (this.isPlayingAll) return;
        this.isPlayingAll = true;
        playAllBtn.disabled = true;

        const currentSc = this.scenarios[this.activeScenarioIdx];

        for (let i = 0; i < currentSc.dialogue.length; i++) {
          const line = currentSc.dialogue[i];
          const card = this.container.querySelector(`#k1-dlg-line-${i}`);
          playAllBtn.innerText = `▶️ ${line.speaker}...`;
          if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          await audioEngine.play(line.is, card);
          await new Promise(r => setTimeout(r, 1100));
        }

        playAllBtn.disabled = false;
        playAllBtn.innerText = `▶️ Весь діалог`;
        this.isPlayingAll = false;
      });
    }
  }
}
