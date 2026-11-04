/**
 * RaddstafirHub.js - Deep Dive into the Icelandic Vowel System (Raddstafir)
 * Step 0.2: Pure Monophthongs, Diphthongs, and the Semantic Rule of the Acute Accent (Broddur ´)
 */

import { audioEngine } from './AudioEngine.js?v=7.0';

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

        <!-- NEW ÁRNASTOFNUN BLOCK A: Digraph Diphthongs (AU, EI, EY) & The #1 Foreigner Trap (Á vs AU) -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-950/30 via-cyber-deep to-black border border-purple-500/40 shadow-xl space-y-3.5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-2.5">
            <div>
              <span class="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-400/40 text-purple-300 font-mono text-[10px] font-bold uppercase">
                Árnastofnun & Íslenska fyrir alla • Складені дифтонги (Samsett tvíhljóð)
              </span>
              <h3 class="text-sm sm:text-base font-black text-white font-mono mt-1">
                🔥 3 Двобуквені дифтонги: <span class="text-amber-300">AU [œyː]</span>, <span class="text-cyan-300">EI [eiː]</span>, <span class="text-emerald-300">EY [eiː]</span> та пастка №1 (Á vs AU)
              </h3>
            </div>
            <button class="vowel-pair-play-btn px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-extrabold transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-md"
              data-word-a="á" data-word-b="auga" data-label-a="Á [auː]" data-label-b="Auga [œyːɣa]">
              <span>🔊 Порівняти пастку: Á [au] vs AU [œy]</span>
            </button>
          </div>

          <p class="text-xs text-slate-200 font-sans leading-relaxed">
            <strong>Головна помилка початківців:</strong> читати буквосполучення <strong>AU</strong> як українське «ау»! В ісландській мові звук <strong>[au]</strong> дає літера з акутом <strong>Á á</strong>, тоді як диграф <strong>AU au</strong> вимовляється як огублений передній дифтонг <strong>[œyː]</strong> (починається зі звука <strong>Ö [œ]</strong> і ковзає в <strong>[i/y]</strong> — близьке до нім. <em>eu</em> або укр. огубленого «е-й»). А диграфи <strong>EI</strong> та <strong>EY</strong> є абсолютними близнюками і завжди звучать як <strong>[eiː]</strong> («ей»).
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            ${[
              {
                digraph: "AU au",
                ipa: "[œyː]",
                title: "Огублений дифтонг [ö + й]",
                rule: "Поставте губи трубочкою для Ö [œ] і плавно перейдіть у [й]. Ніколи не читайте як «ау»!",
                examples: [
                  { w: "auga", ipa: "['œyːɣa]", uk: "око" },
                  { w: "brauð", ipa: "[prœyːð]", uk: "хліб" },
                  { w: "laugar", ipa: "['lœyːɣar]", uk: "гарячі джерела / басейни" }
                ]
              },
              {
                digraph: "EI ei",
                ipa: "[eiː]",
                title: "Чистий дифтонг [ей]",
                rule: "Плавний перехід від відкритого [ɛ] до напруженого [i]. Перед подвоєним nn викликає вибух [tn]!",
                examples: [
                  { w: "einn", ipa: "[eitn̥]", uk: "один (ч.р.)" },
                  { w: "heita", ipa: "['heiːta]", uk: "зватися" },
                  { w: "steinn", ipa: "[steitn̥]", uk: "камінь" }
                ]
              },
              {
                digraph: "EY ey",
                ipa: "[eiː]",
                title: "Фонетичний близнюк EI [ей]",
                rule: "За законом близнюків (Y = I), диграф EY звучить на 100% ідентично до EI — як чітке [ей]!",
                examples: [
                  { w: "eyja", ipa: "['eiːja]", uk: "острів" },
                  { w: "Reykjavík", ipa: "['reiːcaˌviːk]", uk: "Рейк'явік" },
                  { w: "keyra", ipa: "['cʰeiːra]", uk: "водити авто / їхати" }
                ]
              }
            ].map(d => `
              <div class="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <span class="text-base font-black text-amber-300 font-mono">${d.digraph}</span>
                    <span class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/40">${d.ipa}</span>
                  </div>
                  <div class="text-xs font-bold text-white font-sans mt-1.5">${d.title}</div>
                  <p class="text-[11px] text-slate-400 font-sans mt-1 leading-snug">${d.rule}</p>
                </div>
                <div class="space-y-1.5 pt-1">
                  ${d.examples.map(ex => `
                    <div class="radd-card p-2 rounded-lg bg-cyber-deep border border-slate-800 hover:border-cyan-400 cursor-pointer flex items-center justify-between text-xs font-mono transition-all" data-cue="${ex.w}">
                      <div>
                        <strong class="text-white">${ex.w}</strong>
                        <span class="text-cyan-400 text-[11px] ml-1">${ex.ipa}</span>
                        <span class="text-slate-400 font-sans text-[10px] ml-1">— ${ex.uk}</span>
                      </div>
                      <span class="text-cyan-300 text-xs">🔊</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- NEW ÁRNASTOFNUN BLOCK B: Academic Law of Vowel Length (Hljóðlengd & p,t,k,s + r,j,v Rule) -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-950/30 via-cyber-deep to-black border border-cyan-500/40 shadow-xl space-y-3.5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-2.5">
            <div>
              <span class="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] font-bold uppercase">
                Háskóli Íslands • Фонологічний закон складу (Hljóðlengd)
              </span>
              <h3 class="text-sm sm:text-base font-black text-white font-mono mt-1">
                ⏱️ Коли наголошений голосний ДОВГИЙ [Vː], а коли КОРОТКИЙ [V]? (Правило <span class="text-amber-300">p, t, k, s + r, j, v</span>)
              </h3>
            </div>
            <span class="text-[11px] font-mono text-cyan-300 bg-black/50 px-2.5 py-1 rounded-lg border border-cyan-500/30">
              Клікніть на будь-яке слово для перевірки довготи
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div class="p-3.5 rounded-xl bg-black/60 border border-emerald-500/40 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-mono font-extrabold text-emerald-300">1. ДОВГИЙ ГОЛОСНИЙ [Vː] (~350 мс)</span>
                <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">Відкритий / 1 приголосна</span>
              </div>
              <p class="text-[11px] text-slate-300 font-sans leading-relaxed">
                Наголошений голосний завжди <strong>довгий [ː]</strong>, якщо після нього стоїть <strong>не більше однієї приголосної</strong> або слово закінчується на голосний:
              </p>
              <div class="space-y-1.5 font-mono">
                <div class="radd-card p-2 rounded-lg bg-cyber-deep border border-slate-800 hover:border-emerald-400 cursor-pointer flex justify-between" data-cue="hús">
                  <span><strong>hús</strong> <span class="text-emerald-300">[huːs]</span> — дім</span><span>🔊</span>
                </div>
                <div class="radd-card p-2 rounded-lg bg-cyber-deep border border-slate-800 hover:border-emerald-400 cursor-pointer flex justify-between" data-cue="taka">
                  <span><strong>taka</strong> <span class="text-emerald-300">['tʰaːka]</span> — брати</span><span>🔊</span>
                </div>
                <div class="radd-card p-2 rounded-lg bg-cyber-deep border border-slate-800 hover:border-emerald-400 cursor-pointer flex justify-between" data-cue="maður">
                  <span><strong>maður</strong> <span class="text-emerald-300">['maːðʏr]</span> — людина</span><span>🔊</span>
                </div>
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-black/60 border border-amber-500/40 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-mono font-extrabold text-amber-300">2. ВИНЯТОК ÁRNASTOFNUN [Vː]</span>
                <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">p, t, k, s + r, j, v</span>
              </div>
              <p class="text-[11px] text-slate-300 font-sans leading-relaxed">
                Навіть перед 2 приголосними голосний залишається <strong>ДОВГИМ [ː]</strong>, якщо перша з них — <strong>p, t, k, s</strong>, а друга — сонорна/щілинна <strong>r, j, v</strong>:
              </p>
              <div class="space-y-1.5 font-mono">
                <div class="radd-card p-2 rounded-lg bg-cyber-deep border border-slate-800 hover:border-amber-400 cursor-pointer flex justify-between" data-cue="Esja">
                  <span><strong>Esja</strong> <span class="text-amber-300">['ɛːsja]</span> — гора Есья (s+j)</span><span>🔊</span>
                </div>
                <div class="radd-card p-2 rounded-lg bg-cyber-deep border border-slate-800 hover:border-amber-400 cursor-pointer flex justify-between" data-cue="titra">
                  <span><strong>titra</strong> <span class="text-amber-300">['tʰɪːtra]</span> — тремтіти (t+r)</span><span>🔊</span>
                </div>
                <div class="radd-card p-2 rounded-lg bg-cyber-deep border border-slate-800 hover:border-amber-400 cursor-pointer flex justify-between" data-cue="vökva">
                  <span><strong>vökva</strong> <span class="text-amber-300">['vœːkva]</span> — поливати (k+v)</span><span>🔊</span>
                </div>
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-black/60 border border-rose-500/40 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-mono font-extrabold text-rose-300">3. КОРОТКИЙ ГОЛОСНИЙ [V] (~170 мс)</span>
                <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold">2+ приголосні</span>
              </div>
              <p class="text-[11px] text-slate-300 font-sans leading-relaxed">
                Перед подвоєною приголосною або кластером із <strong>2 і більше приголосних</strong> (крім <em>p,t,k,s + r,j,v</em>) голосний стає <strong>різким і коротким</strong>:
              </p>
              <div class="space-y-1.5 font-mono">
                <div class="radd-card p-2 rounded-lg bg-cyber-deep border border-slate-800 hover:border-rose-400 cursor-pointer flex justify-between" data-cue="hestur">
                  <span><strong>hestur</strong> <span class="text-rose-300">['hɛstʏr]</span> — кінь (st)</span><span>🔊</span>
                </div>
                <div class="radd-card p-2 rounded-lg bg-cyber-deep border border-slate-800 hover:border-rose-400 cursor-pointer flex justify-between" data-cue="kaffi">
                  <span><strong>kaffi</strong> <span class="text-rose-300">['kʰaffɪ]</span> — кава (ff)</span><span>🔊</span>
                </div>
                <div class="radd-card p-2 rounded-lg bg-cyber-deep border border-slate-800 hover:border-rose-400 cursor-pointer flex justify-between" data-cue="barn">
                  <span><strong>barn</strong> <span class="text-rose-300">[partn̥]</span> — дитина (rn)</span><span>🔊</span>
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
