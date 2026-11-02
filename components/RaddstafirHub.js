/**
 * RaddstafirHub.js - Deep Dive into the Icelandic Vowel System (Raddstafir)
 * Step 0.2: Pure Monophthongs, Diphthongs, and the Semantic Rule of the Acute Accent (Broddur ´)
 */

import { audioEngine } from './AudioEngine.js?v=4.9';

export class RaddstafirHub {
  constructor(container, raddstafirData) {
    this.container = container;
    this.data = raddstafirData;
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Header Banner -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-cyber-border/30">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Крок 0.2 • Система Raddstafir
            </span>
            <h2 class="text-base sm:text-lg font-black text-white flex items-center gap-1.5 font-mono">
              <span>🌊 Система голосних: Монофтонги, Дифтонги & Broddur (´)</span>
            </h2>
          </div>
          <span class="text-xs font-mono text-slate-400">Наголос завжди на 1-му складі • Áhersla á fyrsta atkvæði</span>
        </div>

        <!-- Semantic Rule Banner of Broddur (´) -->
        <div class="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-cyan-500/10 to-transparent border border-amber-500/40 shadow-lg space-y-2">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-black font-mono text-xl flex items-center justify-center border border-amber-500/40 shadow-sm">
              ´
            </span>
            <div>
              <h3 class="text-sm font-black text-amber-300 font-mono">
                ${this.data.accent_semantic_rule.title}
              </h3>
              <span class="text-[10px] font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.2 rounded border border-cyan-500/30 font-bold">
                ${this.data.accent_semantic_rule.rule_tag}
              </span>
            </div>
          </div>
          <p class="text-xs text-slate-200 leading-relaxed font-sans">
            ${this.data.accent_semantic_rule.explanation}
          </p>
        </div>

        <!-- 6 Vowel Mutation Pairs (The Broddur Transformation) -->
        <div class="space-y-2">
          <div class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <span>⚡ Трансформація голосних через знак наголосу:</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            ${[
              { base: "A", baseIpa: "[a]", mut: "Á", mutIpa: "[au]", name: "А ➔ АУ", wordA: "Afi (дідусь)", wordB: "Á (річка)", desc: "Монофтонг переходить у відкритий дифтонг [au]" },
              { base: "E", baseIpa: "[ɛ]", mut: "É", mutIpa: "[jɛ]", name: "Е ➔ Є", wordA: "Epli (яблуко)", wordB: "Ég (я)", desc: "Короткий голосний йотується у плавний дифтонг [jɛ]" },
              { base: "I", baseIpa: "[ɪ]", mut: "Í", mutIpa: "[iː]", name: "И ➔ І:", wordA: "Is (є)", wordB: "Ís (лід)", desc: "Ненапружене коротке [ɪ] стає довгим напруженим [i:] у посмішці" },
              { base: "O", baseIpa: "[ɔ]", mut: "Ó", mutIpa: "[ou]", name: "О ➔ ОУ", wordA: "Orð (слово)", wordB: "Ókeypis (дарма)", desc: "Коротке о стає англомовним дифтонгом [ou]" },
              { base: "U", baseIpa: "[ʏ]", mut: "Ú", mutIpa: "[uː]", name: "Ю-И ➔ У:", wordA: "Ungur (молодий)", wordB: "Úr (годинник)", desc: "Переднє огублене [ʏ] переходить у чисте глибоке [u:]" },
              { base: "Y", baseIpa: "[ɪ]", mut: "Ý", mutIpa: "[iː]", name: "И ➔ І:", wordA: "Yfir (над)", wordB: "Ýta (штовхати)", desc: "Двійник пари I/Í: вимова 100% тотожна!" }
            ].map(pair => `
              <div class="p-3 rounded-xl bg-black/60 border border-slate-800 hover:border-cyan-400 transition-all space-y-2 group">
                <div class="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span class="text-xs font-bold text-amber-300 font-mono">${pair.name}</span>
                  <button class="vowel-pair-play-btn px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black font-mono text-[10px] font-bold transition-all flex items-center gap-1" data-base="${pair.base}" data-mut="${pair.mut}">
                    <span>🔊 Порівняти</span>
                  </button>
                </div>
                <div class="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div class="p-1.5 rounded-lg bg-cyber-deep border border-slate-800">
                    <div class="text-base font-black text-white">${pair.base} <span class="text-xs text-slate-400">${pair.baseIpa}</span></div>
                    <div class="text-[10px] text-slate-400 font-sans mt-0.5">${pair.wordA}</div>
                  </div>
                  <div class="p-1.5 rounded-lg bg-cyber-deep border border-amber-500/40">
                    <div class="text-base font-black text-amber-300">${pair.mut} <span class="text-xs text-amber-400">${pair.mutIpa}</span></div>
                    <div class="text-[10px] text-amber-200/90 font-sans mt-0.5">${pair.wordB}</div>
                  </div>
                </div>
                <div class="text-[10px] text-slate-400 font-sans leading-tight">
                  ${pair.desc}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Dual Classification Grid: Pure Monophthongs vs Diphthongs -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          
          <!-- Pure Monophthongs -->
          <div class="p-4 rounded-xl bg-cyber-deep border border-cyan-500/30 shadow-md space-y-3">
            <div class="flex items-center justify-between pb-1.5 border-b border-cyan-500/20">
              <div class="flex items-center gap-2">
                <span class="text-lg">🔵</span>
                <div>
                  <h4 class="font-bold text-white font-mono text-sm leading-none">Чисті монофтонги [6]</h4>
                  <span class="text-[10px] text-slate-400">Одиночні гладкі голосні звуки без ковзання</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs font-mono">
              ${this.data.pure_monophthongs.map(v => `
                <div class="p-2.5 rounded-lg bg-black/50 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer radd-card group" data-letter="${v.letter.split(' ')[0]}">
                  <div class="flex items-center justify-between mb-1">
                    <strong class="text-white text-sm group-hover:text-cyan-300">${v.letter}</strong>
                    <span class="text-[11px] text-cyan-400 bg-cyan-500/10 px-1 rounded">${v.ipa}</span>
                  </div>
                  <div class="text-[10px] text-slate-300 font-sans">${v.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Diphthongs & Long Vowels -->
          <div class="p-4 rounded-xl bg-cyber-deep border border-amber-500/30 shadow-md space-y-3">
            <div class="flex items-center justify-between pb-1.5 border-b border-amber-500/20">
              <div class="flex items-center gap-2">
                <span class="text-lg">⚡</span>
                <div>
                  <h4 class="font-bold text-white font-mono text-sm leading-none">Дифтонги та довгі звуки [6]</h4>
                  <span class="text-[10px] text-slate-400">Плавне ковзання від одного тембру до іншого</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs font-mono">
              ${this.data.diphthongs_and_long.map(v => `
                <div class="p-2.5 rounded-lg bg-black/50 border border-slate-800 hover:border-amber-400 transition-all cursor-pointer radd-card group" data-letter="${v.letter.split(' ')[0]}">
                  <div class="flex items-center justify-between mb-1">
                    <strong class="text-amber-300 text-sm group-hover:text-amber-200">${v.letter}</strong>
                    <span class="text-[11px] text-amber-400 bg-amber-500/10 px-1 rounded">${v.ipa}</span>
                  </div>
                  <div class="text-[10px] text-slate-300 font-sans">${v.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('.radd-card').forEach(card => {
      card.addEventListener('click', () => {
        const letter = card.dataset.letter;
        audioEngine.play(letter, card);
      });
    });

    this.container.querySelectorAll('.vowel-pair-play-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const base = btn.dataset.base;
        const mut = btn.dataset.mut;
        btn.disabled = true;
        try {
          btn.innerHTML = `<span>▶️ ${base}...</span>`;
          await audioEngine.playUntilEnd(base, btn, 0.9);
          
          await new Promise(r => setTimeout(r, 350));
          
          btn.innerHTML = `<span>▶️ ${mut}...</span>`;
          await audioEngine.playUntilEnd(mut, btn, 0.9);
        } catch (e) {
          console.warn('Vowel duel error:', e);
        } finally {
          setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = `<span>🔊 Порівняти</span>`;
          }, 300);
        }
      });
    });
  }
}
