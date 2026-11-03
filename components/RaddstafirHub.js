/**
 * RaddstafirHub.js - Deep Dive into the Icelandic Vowel System (Raddstafir)
 * Step 0.2: Pure Monophthongs, Diphthongs, and the Semantic Rule of the Acute Accent (Broddur ´)
 */

import { audioEngine } from './AudioEngine.js?v=6.1';

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
          <div class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span class="flex items-center gap-1.5"><span>⚡</span> <span>Трансформація голосних через знак наголосу (Broddur):</span></span>
            <span class="text-[10px] text-amber-300/80 font-normal hidden sm:inline">Клікніть «Порівняти» або слово для прослуховування</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            ${[
              { base: "A", baseIpa: "[a]", mut: "Á", mutIpa: "[au]", name: "А ➔ АУ", wordKeyA: "afi", wordA: "Afi", transA: "дідусь", wordKeyB: "á", wordB: "Á", transB: "річка", desc: "Монофтонг переходить у відкритий дифтонг [au]" },
              { base: "E", baseIpa: "[ɛ]", mut: "É", mutIpa: "[jɛ]", name: "Е ➔ Є", wordKeyA: "epli", wordA: "Epli", transA: "яблуко", wordKeyB: "ég", wordB: "Ég", transB: "я", desc: "Короткий голосний йотується у плавний дифтонг [jɛ]" },
              { base: "I", baseIpa: "[ɪ]", mut: "Í", mutIpa: "[iː]", name: "И ➔ І: (Звичайна)", wordKeyA: "is", wordA: "Is", transA: "є", wordKeyB: "ís", wordB: "Ís", transB: "лід", desc: "Ненапружене коротке [ɪ] стає довгим напруженим [i:] у посмішці" },
              { base: "O", baseIpa: "[ɔ]", mut: "Ó", mutIpa: "[ou]", name: "О ➔ ОУ", wordKeyA: "orð", wordA: "Orð", transA: "слово", wordKeyB: "ókeypis", wordB: "Ókeypis", transB: "дарма", desc: "Коротке о стає англомовним дифтонгом [ou]" },
              { base: "U", baseIpa: "[ʏ]", mut: "Ú", mutIpa: "[uː]", name: "Ю-И ➔ У:", wordKeyA: "ungur", wordA: "Ungur", transA: "молодий", wordKeyB: "úr", wordB: "Úr", transB: "годинник", desc: "Переднє огублене [ʏ] переходить у чисте глибоке [u:]" },
              { base: "Y", baseIpa: "[ɪ]", mut: "Ý", mutIpa: "[iː]", name: "И ➔ І: (Ufsilon)", wordKeyA: "yfir", wordA: "Yfir", transA: "над", wordKeyB: "ýta", wordB: "Ýta", transB: "штовхати", desc: "Фонетичний близнюк I/Í: звуки однакові, але назва Y — «Ufsilon y»!" }
            ].map(pair => `
              <div class="p-3 rounded-xl bg-black/60 border border-slate-800 hover:border-cyan-400 transition-all space-y-2 group">
                <div class="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span class="text-xs font-bold text-amber-300 font-mono">${pair.name}</span>
                  <button class="vowel-pair-play-btn px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black font-mono text-[10px] font-bold transition-all flex items-center gap-1 active:scale-95 cursor-pointer" 
                    data-word-a="${pair.wordKeyA}" 
                    data-word-b="${pair.wordKeyB}" 
                    data-label-a="${pair.wordA}" 
                    data-label-b="${pair.wordB}"
                    title="Слухати контраст: ${pair.wordA} ➔ ${pair.wordB}">
                    <span>🔊 Порівняти</span>
                  </button>
                </div>
                <div class="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div class="vowel-subword-box p-1.5 rounded-lg bg-cyber-deep border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer" data-cue="${pair.wordKeyA}" title="Клік для прослуховування">
                    <div class="text-base font-black text-white">${pair.base} <span class="text-xs text-slate-400">${pair.baseIpa}</span></div>
                    <div class="text-[10px] text-cyan-300 font-sans mt-0.5 font-bold">${pair.wordA} <span class="text-slate-400 text-[9px] font-normal">(${pair.transA})</span></div>
                  </div>
                  <div class="vowel-subword-box p-1.5 rounded-lg bg-cyber-deep border border-amber-500/40 hover:border-amber-300 transition-all cursor-pointer" data-cue="${pair.wordKeyB}" title="Клік для прослуховування">
                    <div class="text-base font-black text-amber-300">${pair.mut} <span class="text-xs text-amber-400">${pair.mutIpa}</span></div>
                    <div class="text-[10px] text-amber-200 font-sans mt-0.5 font-bold">${pair.wordB} <span class="text-amber-400/80 text-[9px] font-normal">(${pair.transB})</span></div>
                  </div>
                </div>
                <div class="text-[10px] text-slate-400 font-sans leading-tight">
                  ${pair.desc}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Pedagogical Banner: The Y/I Twin Rule -->
        <div class="p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-cyan-500/10 to-emerald-500/10 border border-amber-500/40 shadow-md space-y-1.5">
          <div class="flex items-center gap-2">
            <span class="text-base">🧬</span>
            <h4 class="text-xs sm:text-sm font-black text-amber-300 font-mono">
              Фонетичний закон «Близнюків»: Чому літери Y / Ý та I / Í звучать однаково?
            </h4>
          </div>
          <p class="text-xs text-slate-200 leading-relaxed font-sans">
            В сучасній ісландській мові літери <strong>I</strong> та <strong>Y</strong> позначають <strong>абсолютно однаковий короткий голосний звук [ɪ]</strong> (як українське ненапружене «и»), а літери <strong>Í</strong> та <strong>Ý</strong> — <strong>однаковий довгий звук [iː]</strong> (як напружене «і»)!
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-0.5">
            <div class="p-2 rounded-lg bg-black/50 border border-slate-800 space-y-0.5">
              <div class="text-cyan-300 font-bold">1. Звичайна пара (I / Í):</div>
              <div class="text-white">• <strong>I i</strong> [ɪ]: назва <em>«i»</em>, приклад: <strong>Is</strong> (є)</div>
              <div class="text-white">• <strong>Í í</strong> [iː]: назва <em>«í»</em>, приклад: <strong>Ís</strong> (лід)</div>
            </div>
            <div class="p-2 rounded-lg bg-black/50 border border-amber-500/30 space-y-0.5">
              <div class="text-amber-300 font-bold">2. Пара з давньою історією (Y / Ý):</div>
              <div class="text-white">• <strong>Y y</strong> [ɪ]: офіційна назва <em>«Ufsilon y»</em> [ˈʏfsɪlɔn ˈiː], приклад: <strong>Yfir</strong> (над)</div>
              <div class="text-white">• <strong>Ý ý</strong> [iː]: офіційна назва <em>«Ufsilon ý»</em>, приклад: <strong>Ýta</strong> (штовхати)</div>
            </div>
          </div>
        </div>

        <!-- Dual Classification Grid: Pure Monophthongs vs Diphthongs -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          
          <!-- Pure Monophthongs (7 distinct cards) -->
          <div class="p-4 rounded-xl bg-cyber-deep border border-cyan-500/30 shadow-md space-y-3">
            <div class="flex items-center justify-between pb-1.5 border-b border-cyan-500/20">
              <div class="flex items-center gap-2">
                <span class="text-lg">🔵</span>
                <div>
                  <h4 class="font-bold text-white font-mono text-sm leading-none">Чисті монофтонги [7]</h4>
                  <span class="text-[10px] text-slate-400">Одиночні гладкі голосні звуки без ковзання</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs font-mono">
              ${[
                { letter: "A a", ipa: "[a]", desc: "Відкритий [а] (Afi)", cue: "afi" },
                { letter: "E e", ipa: "[ɛ]", desc: "Короткий відкритий [е] (Epli)", cue: "epli" },
                { letter: "I i", ipa: "[ɪ]", desc: "Ненапружений [и] (Is • назва «i»)", cue: "is" },
                { letter: "Y y", ipa: "[ɪ]", desc: "Близнюк [и] (Yfir • назва «Ufsilon y»)", cue: "yfir" },
                { letter: "O o", ipa: "[ɔ]", desc: "Короткий огублений [о] (Orð)", cue: "orð" },
                { letter: "U u", ipa: "[ʏ]", desc: "Передньо-огублений [ю-и] (Ungur)", cue: "ungur" },
                { letter: "Ö ö", ipa: "[œ]", desc: "Огублене [е-о] (Öld)", cue: "öld" }
              ].map(v => `
                <div class="p-2.5 rounded-lg bg-black/50 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer radd-card group" data-cue="${v.cue}" title="Слухати зразок: ${v.cue}">
                  <div class="flex items-center justify-between mb-1">
                    <strong class="text-white text-sm group-hover:text-cyan-300">${v.letter}</strong>
                    <span class="text-[11px] text-cyan-400 bg-cyan-500/10 px-1 rounded">${v.ipa}</span>
                  </div>
                  <div class="text-[10px] text-slate-300 font-sans">${v.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Diphthongs & Long Vowels (7 distinct cards) -->
          <div class="p-4 rounded-xl bg-cyber-deep border border-amber-500/30 shadow-md space-y-3">
            <div class="flex items-center justify-between pb-1.5 border-b border-amber-500/20">
              <div class="flex items-center gap-2">
                <span class="text-lg">⚡</span>
                <div>
                  <h4 class="font-bold text-white font-mono text-sm leading-none">Дифтонги та довгі звуки [7]</h4>
                  <span class="text-[10px] text-slate-400">Плавне ковзання від одного тембру до іншого</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs font-mono">
              ${[
                { letter: "Á á", ipa: "[au]", desc: "Дифтонг [ау] (Á)", cue: "á" },
                { letter: "É é", ipa: "[jɛ]", desc: "Йотований [йе] (Ég)", cue: "ég" },
                { letter: "Í í", ipa: "[iː]", desc: "Напружений довгий [і:] (Ís • назва «í»)", cue: "ís" },
                { letter: "Ý ý", ipa: "[iː]", desc: "Близнюк [і:] (Ýta • назва «Ufsilon ý»)", cue: "ýta" },
                { letter: "Ó ó", ipa: "[ou]", desc: "Дифтонг [оу] (Ókeypis)", cue: "ókeypis" },
                { letter: "Ú ú", ipa: "[uː]", desc: "Глибокий довгий [у:] (Úr)", cue: "úr" },
                { letter: "Æ æ", ipa: "[ai]", desc: "Широкий дифтонг [ай] (Ævisaga)", cue: "ævisaga" }
              ].map(v => `
                <div class="p-2.5 rounded-lg bg-black/50 border border-slate-800 hover:border-amber-400 transition-all cursor-pointer radd-card group" data-cue="${v.cue}" title="Слухати зразок: ${v.cue}">
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
    // Pure & Diphthong cards click
    this.container.querySelectorAll('.radd-card').forEach(card => {
      card.addEventListener('click', () => {
        const cue = card.dataset.cue;
        if (cue) audioEngine.play(cue, card);
      });
    });

    // Sub-word boxes in mutation cards
    this.container.querySelectorAll('.vowel-subword-box').forEach(box => {
      box.addEventListener('click', () => {
        const cue = box.dataset.cue;
        if (cue) audioEngine.play(cue, box, 0.9);
      });
    });

    // Sequential contrast comparison button
    this.container.querySelectorAll('.vowel-pair-play-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const wordA = btn.dataset.wordA;
        const wordB = btn.dataset.wordB;
        const labelA = btn.dataset.labelA;
        const labelB = btn.dataset.labelB;
        btn.disabled = true;
        try {
          btn.innerHTML = `<span>▶️ ${labelA}...</span>`;
          await audioEngine.playUntilEnd(wordA, btn, 0.9);
          
          await new Promise(r => setTimeout(r, 400));
          
          btn.innerHTML = `<span>▶️ ${labelB}...</span>`;
          await audioEngine.playUntilEnd(wordB, btn, 0.9);
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
