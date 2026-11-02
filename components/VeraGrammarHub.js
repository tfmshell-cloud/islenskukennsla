/**
 * VeraGrammarHub.js - Interactive Grammar Engine for Kafli 1
 * Conjugation matrix of "að vera", "frá" + Dative converter, Question words, and Negation V2 syntax
 */

import { audioEngine } from './AudioEngine.js?v=5.8';

export class VeraGrammarHub {
  constructor(container, grammarData) {
    this.container = container;
    this.data = grammarData;
    this.selectedFormIndex = 0;
    this.activeCountryRuleIdx = 0;
  }

  render() {
    const currentForm = this.data.vera_conjugation.forms[this.selectedFormIndex];

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-cyber-border/30">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Урок 1 • Граматика
            </span>
            <h3 class="text-sm sm:text-base font-black text-white font-mono">
              ⚡ Дієслово «að vera», прийменник «frá» та синтаксис V2
            </h3>
          </div>
          <span class="text-xs font-mono text-slate-400">10 форм «бути» • Þágufall (ÞGF 🟡)</span>
        </div>

        <!-- 1. Interactive Vera Conjugation Matrix -->
        <div class="p-3.5 sm:p-4 rounded-xl bg-cyber-deep/90 border border-cyan-500/30 shadow-md space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg">👑</span>
              <div>
                <h4 class="text-xs sm:text-sm font-black text-white font-mono leading-none">
                  ${this.data.vera_conjugation.title}
                </h4>
                <span class="text-[10px] text-slate-400">Оберіть займенник, щоб побачити та почути форму</span>
              </div>
            </div>
            <button id="play-selected-vera-btn" class="px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold transition-all flex items-center gap-1 shadow-sm">
              <span>🔊 Слухати форму</span>
            </button>
          </div>

          <!-- Pronoun Selector Chips (10 Forms) -->
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs font-mono">
            ${this.data.vera_conjugation.forms.map((f, idx) => `
              <button data-form-idx="${idx}" class="vera-chip p-2 rounded-lg text-left transition-all border ${this.selectedFormIndex === idx ? 'bg-cyan-500 text-black font-bold border-cyan-400 shadow-md shadow-cyan-500/20' : 'bg-black/50 text-slate-300 border-slate-800 hover:border-cyan-400 hover:text-white'}">
                <div class="flex items-center justify-between text-[10px] ${this.selectedFormIndex === idx ? 'text-black/80' : 'text-slate-400'}">
                  <span>${f.person}</span>
                  <span>🔊</span>
                </div>
                <div class="text-xs sm:text-sm font-bold mt-0.5">
                  ${f.pronoun} <span class="${this.selectedFormIndex === idx ? 'text-black' : 'text-cyan-300'}">${f.form}</span>
                </div>
              </button>
            `).join('')}
          </div>

          <!-- Highlight Inspector Bar for Active Vera Form -->
          <div id="vera-inspector-bar" class="p-2.5 rounded-lg bg-black/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-3">
              <div class="text-base font-black text-white font-mono flex items-center gap-1.5">
                <span class="text-cyan-300">${currentForm.pronoun}</span>
                <span class="text-amber-400">${currentForm.form}</span>
                <span class="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/30">${currentForm.ipa}</span>
              </div>
              <div class="text-slate-300 font-sans">
                = «${currentForm.trans}» (${currentForm.person})
              </div>
            </div>
            <div class="text-[11px] text-amber-300/90 font-sans">
              ℹ️ В ісландській мові дієслово «є» ніколи не випадає!
            </div>
          </div>

          <!-- Pedagogical Comparative Alert for Ukrainians -->
          <div class="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 text-xs font-sans">
            <span class="text-base mt-0.5">💡</span>
            <div class="text-slate-300 leading-tight">
              <strong class="text-amber-300 font-mono">Порівняння з українською:</strong>
              ${this.data.vera_conjugation.pedagogical_note}
            </div>
          </div>
        </div>

        <!-- 2. Dual Grid: "frá" + Dative (ÞGF 🟡) & Negation "ekki" / V2 Syntax -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          
          <!-- "frá" + Dative Case Converter -->
          <div class="p-3.5 rounded-xl bg-cyber-deep border border-emerald-500/30 shadow-md space-y-2.5">
            <div class="flex items-center gap-2 pb-1.5 border-b border-emerald-500/20 text-xs">
              <span class="text-lg">🟡</span>
              <div>
                <h4 class="font-bold text-white font-mono leading-none">
                  ${this.data.dative_preposition_fra.title}
                </h4>
                <span class="text-[10px] text-emerald-400">Керування давальним відмінком країни</span>
              </div>
            </div>

            <div class="space-y-1.5 text-xs font-sans">
              ${this.data.dative_preposition_fra.rules.map(r => `
                <div class="p-2 rounded-lg bg-black/50 border border-slate-800 space-y-0.5">
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="text-slate-300 font-bold">${r.category}:</span>
                    <span class="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">${r.shift}</span>
                  </div>
                  <div class="flex items-center justify-between font-mono text-xs">
                    <span class="bin-aura bin-nf px-1.5 py-0.5 rounded text-cyan-300 font-bold" title="Nefnifall 🔵 (Називний відмінок: базовий підмет)">${r.example_nom}</span>
                    <span class="bin-aura bin-tgf px-1.5 py-0.5 rounded text-amber-300 font-bold" title="Þágufall 🟡 (Давальний відмінок після прийменника «frá»)">➔ ${r.example_dat}</span>
                  </div>
                  <div class="text-[10px] text-slate-500">${r.note}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Question Words & Negation "ekki" (V2) -->
          <div class="space-y-3.5">
            <!-- Question Words (Spurnarorð) -->
            <div class="p-3.5 rounded-xl bg-cyber-deep border border-cyan-500/30 shadow-md space-y-2">
              <div class="flex items-center gap-1.5 pb-1 border-b border-cyan-500/20 text-xs">
                <span class="text-lg">❓</span>
                <h4 class="font-bold text-white font-mono leading-none">Питальні слова (Spurnarorð)</h4>
              </div>

              <div class="grid grid-cols-2 gap-1.5 text-xs font-mono">
                ${this.data.question_words.map(q => `
                  <div class="p-2 rounded-lg bg-black/50 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer question-word-card" data-word="${q.example}">
                    <div class="flex items-center justify-between">
                      <strong class="text-cyan-300 text-sm">${q.word}</strong>
                      <span class="text-[10px] text-slate-400">${q.ipa}</span>
                    </div>
                    <div class="text-[11px] text-white font-sans font-medium">${q.meaning}</div>
                    <div class="text-[10px] text-slate-400 truncate mt-0.5" title="${q.example}">«${q.example}»</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Negation "ekki" & V2 placement -->
            <div class="p-3.5 rounded-xl bg-cyber-deep border border-rose-500/30 shadow-md space-y-2">
              <div class="flex items-center gap-1.5 pb-1 border-b border-rose-500/20 text-xs">
                <span class="text-lg">🚫</span>
                <div>
                  <h4 class="font-bold text-white font-mono leading-none">${this.data.negation_ekki_syntax.title}</h4>
                  <span class="text-[10px] text-rose-400 font-sans">Дієслово завжди на 2-й позиції!</span>
                </div>
              </div>

              <div class="p-2 rounded-lg bg-black/60 border border-slate-800 space-y-1 text-xs">
                <div class="font-mono text-cyan-300 font-bold text-[11px]">
                  Прямий порядок: <span class="text-white">${this.data.negation_ekki_syntax.formula_direct}</span>
                </div>
                <div class="space-y-0.5 text-[11px]">
                  ${this.data.negation_ekki_syntax.examples.map(ex => `
                    <div class="text-slate-300 flex items-center justify-between">
                      <span class="font-mono font-bold text-white">${ex.sentence}</span>
                      <span class="text-slate-400 text-[10px] font-sans">(${ex.trans})</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Vera chip selection
    this.container.querySelectorAll('.vera-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.formIdx, 10);
        this.selectedFormIndex = idx;
        const formObj = this.data.vera_conjugation.forms[idx];
        audioEngine.play(`${formObj.pronoun} ${formObj.form}`, btn, 0.85, formObj.ipa);
        this.render();
      });
    });

    // Play selected vera button
    const playVeraBtn = this.container.querySelector('#play-selected-vera-btn');
    if (playVeraBtn) {
      playVeraBtn.addEventListener('click', () => {
        const formObj = this.data.vera_conjugation.forms[this.selectedFormIndex];
        audioEngine.play(`${formObj.pronoun} ${formObj.form}`, playVeraBtn, 0.85, formObj.ipa);
      });
    }

    // Question word card clicks
    this.container.querySelectorAll('.question-word-card').forEach(card => {
      card.addEventListener('click', () => {
        const word = card.dataset.word;
        audioEngine.play(word, card);
      });
    });
  }
}
