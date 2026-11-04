import re

unit1_html = '''  <!-- ========================================================================= -->
  <!-- 3. UNIT 1: STAFRÓFIÐ, FRAMBURÐUR & KVEÐJUR (DAY 1 FOCUS)                  -->
  <!-- ========================================================================= -->
  <section id="unit1" class="py-24 relative z-10 border-t border-cyber-border bg-cyber-void/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber text-xs font-mono uppercase tracking-wider mb-3">
            Eining 1 &bull; Byrjendastig A1.1 &bull; Dagur 1 (Mímir & BÍN)
          </div>
          <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight" data-i18n="unit1_heading">
            Íslenska Stafrófið, Framburður & Kveðjur
          </h2>
          <p class="mt-2 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed" data-i18n="unit1_sub">
            Академічний курс вимови першого дня: інтерактивний саундборд абетки (32 літери), тренажер 4 фонетичних пасток і порепліковий діалог знайомства з підтримкою нативного чоловічого диктора (Karl / Gunnar).
          </p>
        </div>

        <!-- Voice Controller Pill -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div class="flex items-center gap-2.5 bg-cyber-deep px-4 py-2.5 rounded-xl border border-neon-amber/40 text-xs font-mono text-neon-amber shadow-lg shadow-neon-amber/15">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>🎙️ RÖDD: <strong id="voice-name-display" class="text-white">Karl / Gunnar (Male Baritone 0.80x · 0.88p)</strong></span>
          </div>
          <button onclick="playNativeMaleVoice('Góðan daginn! Ég heiti Karl og tala íslensku.', this)" class="px-4 py-2.5 rounded-xl btn-warm-3d text-xs font-mono font-bold flex items-center gap-2 transition-all">
            <span>🔊 Prófa rödd (Тест)</span>
          </button>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- 1. ІНТЕРАКТИВНИЙ САУНДБОРД АБЕТКИ (32 ЛІТЕРИ)                         -->
      <!-- ===================================================================== -->
      <div class="warm-glass-panel p-6 md:p-8 rounded-2xl border border-cyber-border mb-12 shadow-2xl">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-cyber-border/40 mb-6">
          <div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-neon-amber/20 text-neon-amber font-bold uppercase">Hluti 1 &bull; Stafrófið</span>
            <h3 class="text-xl font-bold text-white mt-1 flex items-center gap-2">
              <span>Stafrófið: 32 Bókstafir (Абетка)</span>
              <span class="text-xs px-2 py-0.5 rounded bg-neon-coral/20 text-neon-coral font-mono font-normal">32 stafir</span>
            </h3>
          </div>

          <!-- Filter Pills for Soundboard -->
          <div class="flex flex-wrap items-center gap-1.5 bg-cyber-deep p-1 rounded-xl border border-cyber-border text-xs font-mono">
            <button onclick="filterAlphabetSoundboard('all')" id="alpha-filter-all" class="alpha-filter-btn px-3 py-1.5 rounded-lg font-bold bg-neon-amber text-cyber-void transition-all">Allir (32)</button>
            <button onclick="filterAlphabetSoundboard('special')" id="alpha-filter-special" class="alpha-filter-btn px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-all">Sérstafir (Ð, Þ, Æ, Ö)</button>
            <button onclick="filterAlphabetSoundboard('accented')" id="alpha-filter-accented" class="alpha-filter-btn px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-all">Með broddi (Á, É, Í...)</button>
            <button onclick="filterAlphabetSoundboard('consonant')" id="alpha-filter-consonant" class="alpha-filter-btn px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-all">Samhljóð</button>
          </div>
        </div>

        <!-- Dynamic Grid of 32 Letters -->
        <div id="alphabet-grid" class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 font-mono">
          <!-- Populated dynamically via renderAlphabetTiles() -->
        </div>

        <!-- Selected Letter Inspector Bar -->
        <div id="letter-inspector" class="mt-8 p-5 rounded-xl bg-cyber-deep/95 border border-neon-amber/50 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-inner">
          <div class="flex items-center gap-4">
            <span id="inspect-letter" class="text-4xl sm:text-5xl font-black text-neon-amber font-mono">A a</span>
            <div>
              <div id="inspect-ipa" class="text-sm font-mono text-neon-coral font-bold">[a] eða [a:]</div>
              <div id="inspect-desc" class="text-xs text-slate-300 font-sans">Open front unrounded vowel</div>
              <div id="inspect-example" class="text-xs text-slate-300 mt-1 font-sans">
                Heiti: <strong class="text-neon-amber">a [a]</strong> &bull; Dæmi: <strong class="text-white">afi</strong> (дідусь)
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2.5 flex-shrink-0">
            <button onclick="speakSelectedLetter(this)" class="px-4 py-2.5 rounded-xl btn-warm-3d text-xs font-bold flex items-center gap-2">
              <span>🔊 Heiti stafs (Назва)</span>
            </button>
            <button onclick="playNativeMaleVoice(currentSelectedLetter.example, this)" class="px-4 py-2.5 rounded-xl btn-outline-warm text-xs font-bold flex items-center gap-2">
              <span>🗣️ Dæmi (Слово)</span>
            </button>
          </div>
        </div>

      </div>

      <!-- ===================================================================== -->
      <!-- 2. АУДІО-ТРЕНАЖЕР: 4 ФОНЕТИЧНІ ПАСТКИ (FRAMBURÐARÞJÁLFUN)              -->
      <!-- ===================================================================== -->
      <div class="mb-14">
        <div class="mb-6">
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-neon-coral/20 text-neon-coral font-bold uppercase">Hluti 2 &bull; Framburðarþjálfun</span>
          <h3 class="text-2xl font-bold text-white mt-1">4 Фонетичні пастки ісландської вимови (Hljóðfræðilegar gildrur)</h3>
          <p class="text-xs text-slate-300 mt-1">
            Клікніть будь-яке слово, щоб почути правильну аутентичну вимову чоловічим голосом диктора.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <!-- Trap 1: ll -> [tl] -->
          <div class="warm-glass-panel glow-nf p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-neon-amber/20 border border-neon-amber/50 text-neon-amber flex items-center justify-center font-mono font-bold text-xl mb-4">
                ll &rarr; [tl]
              </div>
              <h4 class="text-base font-bold text-white mb-1.5">1. Hliðarhljóð: ll &rarr; [tl]</h4>
              <p class="text-xs text-slate-300 leading-relaxed mb-4">
                Подвійне <em>ll</em> вимовляється не як просте [l], а як глухий бічний клацаючий звук <strong>[tl]</strong>.
              </p>
              <div class="space-y-2 mb-4">
                <button onclick="playNativeMaleVoice('Kolla', this)" class="w-full text-left p-2.5 rounded-lg bg-cyber-deep/80 hover:bg-cyber-deep border border-cyber-border/40 text-xs font-mono flex items-center justify-between group">
                  <span>Kolla <strong class="text-neon-amber">[kotla]</strong></span>
                  <span class="text-[11px] text-slate-400 group-hover:text-neon-amber">дівчина 🔊</span>
                </button>
                <button onclick="playNativeMaleVoice('Eyjafjallajökull', this)" class="w-full text-left p-2.5 rounded-lg bg-cyber-deep/80 hover:bg-cyber-deep border border-cyber-border/40 text-xs font-mono flex items-center justify-between group">
                  <span>Eyjafjalla... <strong class="text-neon-amber">[tl]</strong></span>
                  <span class="text-[11px] text-slate-400 group-hover:text-neon-amber">льодовик 🔊</span>
                </button>
                <button onclick="playNativeMaleVoice('Fjall', this)" class="w-full text-left p-2.5 rounded-lg bg-cyber-deep/80 hover:bg-cyber-deep border border-cyber-border/40 text-xs font-mono flex items-center justify-between group">
                  <span>Fjall <strong class="text-neon-amber">[fyatl]</strong></span>
                  <span class="text-[11px] text-slate-400 group-hover:text-neon-amber">гора 🔊</span>
                </button>
              </div>
            </div>
            <button onclick="playNativeMaleVoice('Eyjafjallajökull Kolla Fjall', this)" class="w-full py-2.5 rounded-xl btn-outline-warm text-xs font-mono font-bold flex items-center justify-center gap-2">
              <span>🔊 Spila öll dæmi [tl]</span>
            </button>
          </div>

          <!-- Trap 2: nn -> [tn] -->
          <div class="warm-glass-panel glow-tf p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-neon-coral/20 border border-neon-coral/50 text-neon-coral flex items-center justify-center font-mono font-bold text-xl mb-4">
                nn &rarr; [tn]
              </div>
              <h4 class="text-base font-bold text-white mb-1.5">2. Hljóðvarp: nn &rarr; [tn]</h4>
              <p class="text-xs text-slate-300 leading-relaxed mb-4">
                Після довгих голосних з акцентом (á, ó, ú, é, í, ý) та дифтонгів (ei, ey) подвійне <em>nn</em> перетворюється на <strong>[tn]</strong>.
              </p>
              <div class="space-y-2 mb-4">
                <button onclick="playNativeMaleVoice('einn', this)" class="w-full text-left p-2.5 rounded-lg bg-cyber-deep/80 hover:bg-cyber-deep border border-cyber-border/40 text-xs font-mono flex items-center justify-between group">
                  <span>einn <strong class="text-neon-coral">[eitn]</strong></span>
                  <span class="text-[11px] text-slate-400 group-hover:text-neon-coral">один 🔊</span>
                </button>
                <button onclick="playNativeMaleVoice('steinn', this)" class="w-full text-left p-2.5 rounded-lg bg-cyber-deep/80 hover:bg-cyber-deep border border-cyber-border/40 text-xs font-mono flex items-center justify-between group">
                  <span>steinn <strong class="text-neon-coral">[steitn]</strong></span>
                  <span class="text-[11px] text-slate-400 group-hover:text-neon-coral">камінь 🔊</span>
                </button>
                <button onclick="playNativeMaleVoice('fínn', this)" class="w-full text-left p-2.5 rounded-lg bg-cyber-deep/80 hover:bg-cyber-deep border border-cyber-border/40 text-xs font-mono flex items-center justify-between group">
                  <span>fínn <strong class="text-neon-coral">[fi:tn]</strong></span>
                  <span class="text-[11px] text-slate-400 group-hover:text-neon-coral">чудовий 🔊</span>
                </button>
              </div>
            </div>
            <button onclick="playNativeMaleVoice('einn steinn fínn', this)" class="w-full py-2.5 rounded-xl btn-outline-warm text-xs font-mono font-bold flex items-center justify-center gap-2">
              <span>🔊 Spila öll dæmi [tn]</span>
            </button>
          </div>

          <!-- Trap 3: fn/fl -> [pn/pl] -->
          <div class="warm-glass-panel glow-tgf p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-neon-purple/20 border border-neon-purple/50 text-neon-purple flex items-center justify-center font-mono font-bold text-xl mb-4">
                fn &rarr; [pn]
              </div>
              <h4 class="text-base font-bold text-white mb-1.5">3. Varamæli: fn/fl &rarr; [pn/pl]</h4>
              <p class="text-xs text-slate-300 leading-relaxed mb-4">
                Перед n або l літера f переходить у глухий губний <strong>[p]</strong>: fn &rarr; [pn], fl &rarr; [pl].
              </p>
              <div class="space-y-2 mb-4">
                <button onclick="playNativeMaleVoice('Hafnarfjörður', this)" class="w-full text-left p-2.5 rounded-lg bg-cyber-deep/80 hover:bg-cyber-deep border border-cyber-border/40 text-xs font-mono flex items-center justify-between group">
                  <span>Hafnar... <strong class="text-neon-purple">[hapnar-]</strong></span>
                  <span class="text-[11px] text-slate-400 group-hover:text-neon-purple">місто 🔊</span>
                </button>
                <button onclick="playNativeMaleVoice('afl', this)" class="w-full text-left p-2.5 rounded-lg bg-cyber-deep/80 hover:bg-cyber-deep border border-cyber-border/40 text-xs font-mono flex items-center justify-between group">
                  <span>afl <strong class="text-neon-purple">[apl]</strong></span>
                  <span class="text-[11px] text-slate-400 group-hover:text-neon-purple">сила 🔊</span>
                </button>
                <button onclick="playNativeMaleVoice('nafn', this)" class="w-full text-left p-2.5 rounded-lg bg-cyber-deep/80 hover:bg-cyber-deep border border-cyber-border/40 text-xs font-mono flex items-center justify-between group">
                  <span>nafn <strong class="text-neon-purple">[napn]</strong></span>
                  <span class="text-[11px] text-slate-400 group-hover:text-neon-purple">ім'я 🔊</span>
                </button>
              </div>
            </div>
            <button onclick="playNativeMaleVoice('Hafnarfjörður afl nafn', this)" class="w-full py-2.5 rounded-xl btn-outline-warm text-xs font-mono font-bold flex items-center justify-center gap-2">
              <span>🔊 Spila öll dæmi [pn/pl]</span>
            </button>
          </div>

          <!-- Trap 4: Preaspiration [h] -->
          <div class="warm-glass-panel glow-ef p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-neon-rose/20 border border-neon-rose/50 text-neon-rose flex items-center justify-center font-mono font-bold text-xl mb-4">
                [h]
              </div>
              <h4 class="text-base font-bold text-white mb-1.5">4. Aðblástur [h] (Преаспірація)</h4>
              <p class="text-xs text-slate-300 leading-relaxed mb-4">
                Придих <strong>[h]</strong> перед подвоєними глухими вибуховими pp, tt, kk або сполученнями pn, tn, kn.
              </p>
              <div class="space-y-2 mb-4">
                <button onclick="playNativeMaleVoice('takk', this)" class="w-full text-left p-2.5 rounded-lg bg-cyber-deep/80 hover:bg-cyber-deep border border-cyber-border/40 text-xs font-mono flex items-center justify-between group">
                  <span>takk <strong class="text-neon-rose">[ta-hk]</strong></span>
                  <span class="text-[11px] text-slate-400 group-hover:text-neon-rose">дякую 🔊</span>
                </button>
                <button onclick="playNativeMaleVoice('ætla', this)" class="w-full text-left p-2.5 rounded-lg bg-cyber-deep/80 hover:bg-cyber-deep border border-cyber-border/40 text-xs font-mono flex items-center justify-between group">
                  <span>ætla <strong class="text-neon-rose">[ai-htla]</strong></span>
                  <span class="text-[11px] text-slate-400 group-hover:text-neon-rose">мати намір 🔊</span>
                </button>
                <button onclick="playNativeMaleVoice('stoppa', this)" class="w-full text-left p-2.5 rounded-lg bg-cyber-deep/80 hover:bg-cyber-deep border border-cyber-border/40 text-xs font-mono flex items-center justify-between group">
                  <span>stoppa <strong class="text-neon-rose">[sto-hpa]</strong></span>
                  <span class="text-[11px] text-slate-400 group-hover:text-neon-rose">зупинити 🔊</span>
                </button>
              </div>
            </div>
            <button onclick="playNativeMaleVoice('takk ætla stoppa', this)" class="w-full py-2.5 rounded-xl btn-outline-warm text-xs font-mono font-bold flex items-center justify-center gap-2">
              <span>🔊 Spila öll dæmi [h]</span>
            </button>
          </div>

        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- 3. ІНТЕРАКТИВНИЙ АУДІО-ДІАЛОГ: "FYRSTA SAMTALIÐ" (ПЕРШЕ ЗНАЙОМСТВО)   -->
      <!-- ===================================================================== -->
      <div class="warm-glass-panel p-6 md:p-8 rounded-2xl border border-cyber-border shadow-2xl mb-12">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-cyber-border/40 mb-6">
          <div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-neon-amber/20 text-neon-amber font-bold uppercase">Hluti 3 &bull; Samtal</span>
            <h3 class="text-2xl font-bold text-white mt-1">Fyrsta samtalið: Kveðjur og kynning (Перше знайомство)</h3>
          </div>
          <button id="play-full-dialogue-btn" onclick="playFullDialogue()" class="px-5 py-2.5 rounded-xl btn-warm-3d text-xs font-black flex items-center gap-2 shadow-lg">
            <span>▶️ Spila allt samtalið (Слухати весь діалог підряд)</span>
          </button>
        </div>

        <div class="space-y-4 max-w-3xl mx-auto mb-10">
          
          <!-- Line 1 -->
          <div id="d1-line-1" onclick="playNativeMaleVoice('Sæll! Hvað heitir þú?', this)" class="p-4 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 cursor-pointer transition-all flex items-start gap-3.5 group">
            <div class="w-10 h-10 rounded-full bg-neon-amber/25 border border-neon-amber/50 text-neon-amber flex items-center justify-center font-bold text-sm flex-shrink-0">
              A
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-sm sm:text-base font-semibold text-white group-hover:text-neon-amber transition-colors">
                  „Sæll / Sæl! Hvað heitir þú?“
                </span>
                <span class="text-xs text-neon-amber font-mono">🔊 Karl 0:02</span>
              </div>
              <div class="text-xs text-amber-200/70 mt-1 font-sans">
                (Вітаю! [до чол./жін.] Як вас звати?)
              </div>
            </div>
          </div>

          <!-- Line 2 -->
          <div id="d1-line-2" onclick="playNativeMaleVoice('Ég heiti Jón. Hvað segirðu gott?', this)" class="p-4 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 cursor-pointer transition-all flex items-start gap-3.5 group ml-4 sm:ml-8">
            <div class="w-10 h-10 rounded-full bg-neon-rose/25 border border-neon-rose/50 text-neon-rose flex items-center justify-center font-bold text-sm flex-shrink-0">
              B
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-sm sm:text-base font-semibold text-white group-hover:text-neon-rose transition-colors">
                  „Ég heiti Jón. Hvað segirðu gott?“
                </span>
                <span class="text-xs text-neon-rose font-mono">🔊 Karl 0:03</span>
              </div>
              <div class="text-xs text-amber-200/70 mt-1 font-sans">
                (Мене звати Йон. Як ваші справи? / Що доброго скажете?)
              </div>
            </div>
          </div>

          <!-- Line 3 -->
          <div id="d1-line-3" onclick="playNativeMaleVoice('Allt gott, takk! Hvaðan ert þú?', this)" class="p-4 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 cursor-pointer transition-all flex items-start gap-3.5 group">
            <div class="w-10 h-10 rounded-full bg-neon-amber/25 border border-neon-amber/50 text-neon-amber flex items-center justify-center font-bold text-sm flex-shrink-0">
              A
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-sm sm:text-base font-semibold text-white group-hover:text-neon-amber transition-colors">
                  „Allt gott, takk! Hvaðan ert þú?“
                </span>
                <span class="text-xs text-neon-amber font-mono">🔊 Karl 0:02</span>
              </div>
              <div class="text-xs text-amber-200/70 mt-1 font-sans">
                (Дякую, все чудово! Звідки ви?)
              </div>
            </div>
          </div>

          <!-- Line 4 -->
          <div id="d1-line-4" onclick="playNativeMaleVoice('Ég er frá Úkraínu. En þú?', this)" class="p-4 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 cursor-pointer transition-all flex items-start gap-3.5 group ml-4 sm:ml-8">
            <div class="w-10 h-10 rounded-full bg-neon-rose/25 border border-neon-rose/50 text-neon-rose flex items-center justify-center font-bold text-sm flex-shrink-0">
              B
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-sm sm:text-base font-semibold text-white group-hover:text-neon-rose transition-colors">
                  „Ég er frá Úkraínu. En þú?“
                </span>
                <span class="text-xs text-neon-rose font-mono">🔊 Karl 0:03</span>
              </div>
              <div class="text-xs text-amber-200/70 mt-1 font-sans">
                (Я з України. А ви?)
              </div>
            </div>
          </div>

        </div>

        <!-- ІНТЕРАКТИВНА ВПРАВА: КОНСТРУКТОР ВЛАСНОЇ ВІДПОВІДІ -->
        <div class="p-6 rounded-2xl bg-cyber-deep border border-neon-amber/35 shadow-xl max-w-3xl mx-auto">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-neon-amber text-lg">✍️</span>
            <h4 class="text-base font-bold text-white">Інтерактивний конструктор знайомства: „Ég heiti... Ég er frá...“</h4>
          </div>
          <p class="text-xs text-slate-300 mb-4">
            Введіть своє ім'я та країну/місто — система згенерує ісландську граматичну конструкцію та озвучить її голосом диктора:
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-[11px] font-mono text-neon-amber mb-1 uppercase font-bold">Nafn þitt (Ваше ім'я)</label>
              <input type="text" id="custom-intro-name" value="Anna" oninput="updateCustomIntroPreview()" class="w-full px-3.5 py-2.5 rounded-xl bg-cyber-void border border-cyber-border text-white text-sm font-medium focus:border-neon-amber focus:outline-none transition-colors" placeholder="f.d. Anna eða Jón">
            </div>
            <div>
              <label class="block text-[11px] font-mono text-neon-coral mb-1 uppercase font-bold">Uppruni (Країна або місто)</label>
              <input type="text" id="custom-intro-place" value="Úkraínu" oninput="updateCustomIntroPreview()" class="w-full px-3.5 py-2.5 rounded-xl bg-cyber-void border border-cyber-border text-white text-sm font-medium focus:border-neon-coral focus:outline-none transition-colors" placeholder="f.d. Úkraínu, Kænugarði...">
            </div>
          </div>

          <div class="p-4 rounded-xl bg-cyber-void border border-neon-amber/20 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div class="text-[11px] font-mono text-slate-400">Forskoðun (Згенерована фраза):</div>
              <div id="custom-intro-preview" class="text-sm sm:text-base font-semibold text-neon-amber mt-0.5">
                „Ég heiti Anna og ég er frá Úkraínu. Gaman að kynnast þér!“
              </div>
            </div>
            <button onclick="speakCustomIntroduction(this)" class="px-5 py-2.5 rounded-xl btn-warm-3d text-xs font-black flex items-center gap-2 flex-shrink-0 shadow-lg">
              <span>🎙️ Hlusta á kynningu (Озвучити)</span>
            </button>
          </div>
        </div>

      </div>

      <!-- ===================================================================== -->
      <!-- 4. ПРИМІТКА ДЛЯ ВИКЛАДАЧА (KENNARANÓTA)                                -->
      <!-- ===================================================================== -->
      <div class="warm-glass-panel p-6 md:p-8 rounded-2xl border border-neon-violet/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-neon-violet/20 border border-neon-violet/40 flex items-center justify-center text-neon-violet font-bold text-2xl flex-shrink-0">
            📚
          </div>
          <div>
            <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-neon-violet/20 text-neon-violet font-mono text-[10px] font-bold uppercase mb-1">
              Kennaranóta &bull; A1.1 Aðalnámskrá
            </div>
            <h4 class="text-lg font-bold text-white">Методична примітка для викладачів курсу</h4>
            <p class="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Модуль відповідає 1-му розділу комплексу <em>Íslenska fyrir alla 1</em>. Рекомендовано відпрацьовувати пари опозицій: `Þ` [θ] vs `Ð` [ð], фонетичні пастки подвійного `ll` [tl] та діалог знайомства у парах перед переходом до відмінювання іменників.
            </p>
          </div>
        </div>

        <button onclick="triggerPrintWorksheet('Vinnublað 1: Stafrófið og framburður')" class="px-6 py-3.5 rounded-xl btn-outline-warm text-xs font-bold transition-all flex items-center gap-2.5 flex-shrink-0">
          <svg class="w-4 h-4 text-neon-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <span>Prenta verkefnablað 1 (PDF)</span>
        </button>
      </div>

    </div>
  </section>'''

files = [
    '/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/index-cyberpunk.html',
    '/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/index-volcanic.html'
]

# Replacement JS logic for Unit 1 interactive features
js_unit1_code = '''    /* =========================================================================
       NATIVE MALE VOICE AUDIO ENGINE & PHONETIC MAPPING (JS)
       ========================================================================= */
    function playNativeMaleVoice(textToSpeak, cardElement) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'is-IS';
        utterance.rate = 0.80;  // Academic tempo for phonetic clarity
        utterance.pitch = 0.88; // Deep baritone male pitch adjustment
        
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(v => v.lang.startsWith('is') && (
          v.name.includes('Karl') || v.name.includes('Gunnar') || v.name.includes('Male') || v.name.includes('Wavenet-B')
        )) || voices.find(v => v.lang.startsWith('is'));
        
        if (maleVoice) utterance.voice = maleVoice;

        if (cardElement) {
          cardElement.classList.add('ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
        }

        utterance.onend = () => {
          if (cardElement) cardElement.classList.remove('ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
        };
        utterance.onerror = () => {
          if (cardElement) cardElement.classList.remove('ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
          playRealAudio(textToSpeak, cardElement);
        };

        window.speechSynthesis.speak(utterance);
      } else {
        playRealAudio(textToSpeak, cardElement);
      }
    }

    // Spelled-out Icelandic phonetic mapper for single letters
    const letterPhoneticNames = {
      'A':'a', 'Á':'á', 'B':'bé', 'D':'dé', 'Ð':'eð', 'E':'e', 'É':'ég', 'F':'eff', 'G':'gé', 'H':'há',
      'I':'i', 'Í':'í', 'J':'joð', 'K':'ká', 'L':'ell', 'M':'emm', 'N':'enn', 'O':'o', 'Ó':'ó', 'P':'pé',
      'R':'err', 'S':'ess', 'T':'té', 'U':'u', 'Ú':'ú', 'V':'vaff', 'X':'ex', 'Y':'ufsilon i', 'Ý':'ufsilon í',
      'Z':'seta', 'Þ':'þorn', 'Æ':'æ', 'Ö':'ö'
    };

    function playLetterSound(letter, element) {
      const phoneticText = letterPhoneticNames[letter.toUpperCase()] || letter;
      playNativeMaleVoice(phoneticText, element);
    }

    // HTML5 Real MP3 Audio Fallback Bank
    const nativeAudioBank = {
      'A': './audio/a.mp3',
      'Á': './audio/a_acute.mp3',
      'B': './audio/b.mp3',
      'D': './audio/d.mp3',
      'Ð': './audio/ed.mp3',
      'E': './audio/e.mp3',
      'É': './audio/e_acute.mp3',
      'F': './audio/f.mp3',
      'G': './audio/g.mp3',
      'H': './audio/h.mp3',
      'I': './audio/i.mp3',
      'Í': './audio/i_acute.mp3',
      'J': './audio/j.mp3',
      'K': './audio/k.mp3',
      'L': './audio/l.mp3',
      'M': './audio/m.mp3',
      'N': './audio/n.mp3',
      'O': './audio/o.mp3',
      'Ó': './audio/o_acute.mp3',
      'P': './audio/p.mp3',
      'R': './audio/r.mp3',
      'S': './audio/s.mp3',
      'T': './audio/t.mp3',
      'U': './audio/u.mp3',
      'Ú': './audio/u_acute.mp3',
      'V': './audio/v.mp3',
      'X': './audio/x.mp3',
      'Y': './audio/y.mp3',
      'Ý': './audio/y_acute.mp3',
      'Z': './audio/z.mp3',
      'Þ': './audio/thorn.mp3',
      'Æ': './audio/ae.mp3',
      'Ö': './audio/o_umlaut.mp3'
    };

    let currentAudioInstance = null;

    function playRealAudio(letter, cardElement) {
      const key = letter.toUpperCase ? letter.toUpperCase() : letter;
      const audioUrl = nativeAudioBank[key] || nativeAudioBank[letter] || `./audio/${encodeURIComponent(letter)}.mp3`;

      if (currentAudioInstance) {
        currentAudioInstance.pause();
        currentAudioInstance.currentTime = 0;
      }

      currentAudioInstance = new Audio(audioUrl);

      if (cardElement) {
        cardElement.classList.add('ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
      }

      const cleanup = () => {
        if (cardElement) {
          cardElement.classList.remove('ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
        }
      };

      currentAudioInstance.onended = cleanup;
      currentAudioInstance.onerror = () => {
        cleanup();
        playToneChime(440, 0.2);
      };

      currentAudioInstance.play().catch(e => {
        playToneChime(440, 0.2);
        setTimeout(cleanup, 350);
      });
    }

    // Aliases
    function playMaleAudio(text, cardElement) { playNativeMaleVoice(text, cardElement); }
    function playVoiceSample(text, cardElement) { playNativeMaleVoice(text, cardElement); }
    function speakLetter(letter, cardElement) { playLetterSound(letter, cardElement); }
    function speakSelectedLetter(btnElement) { playLetterSound(currentSelectedLetter.upper, btnElement); }

    // Sequential Dialogue Player
    let isPlayingDialogue = false;
    async function playFullDialogue() {
      if (isPlayingDialogue) return;
      isPlayingDialogue = true;
      const btn = document.getElementById('play-full-dialogue-btn');
      if (btn) btn.innerHTML = `<span>⏳ Spilar samtalið...</span>`;

      const lines = [
        { text: 'Sæll! Hvað heitir þú?', id: 'd1-line-1' },
        { text: 'Ég heiti Jón. Hvað segirðu gott?', id: 'd1-line-2' },
        { text: 'Allt gott, takk! Hvaðan ert þú?', id: 'd1-line-3' },
        { text: 'Ég er frá Úkraínu. En þú?', id: 'd1-line-4' }
      ];

      for (let i = 0; i < lines.length; i++) {
        const el = document.getElementById(lines[i].id);
        playNativeMaleVoice(lines[i].text, el);
        await new Promise(r => setTimeout(r, 2600));
      }

      if (btn) btn.innerHTML = `<span>▶️ Spila allt samtalið (Слухати весь діалог підряд)</span>`;
      isPlayingDialogue = false;
    }

    // Custom Introduction Constructor
    function updateCustomIntroPreview() {
      const name = (document.getElementById('custom-intro-name').value || 'Anna').trim();
      const place = (document.getElementById('custom-intro-place').value || 'Úkraínu').trim();
      document.getElementById('custom-intro-preview').innerText = `„Ég heiti ${name} og ég er frá ${place}. Gaman að kynnast þér!“`;
    }

    function speakCustomIntroduction(btnElement) {
      const name = (document.getElementById('custom-intro-name').value || 'Anna').trim();
      const place = (document.getElementById('custom-intro-place').value || 'Úkraínu').trim();
      const sentence = `Ég heiti ${name} og ég er frá ${place}. Gaman að kynnast þér!`;
      playNativeMaleVoice(sentence, btnElement);
    }

    // Soundboard category filtering
    function filterAlphabetSoundboard(category) {
      document.querySelectorAll('.alpha-filter-btn').forEach(b => {
        b.classList.remove('bg-neon-amber', 'text-cyber-void', 'font-bold');
        b.classList.add('text-slate-400', 'font-medium');
      });
      const btn = document.getElementById('alpha-filter-' + category);
      if (btn) {
        btn.classList.remove('text-slate-400', 'font-medium');
        btn.classList.add('bg-neon-amber', 'text-cyber-void', 'font-bold');
      }

      document.querySelectorAll('.letter-tile-item').forEach(el => {
        const cat = el.getAttribute('data-cat');
        if (category === 'all' || cat === category) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      });
    }

    /* 32 Letters with detailed phonetic classifications & Latin transcriptions */
    const alphabetData = [
      { upper: 'A', lower: 'a', soundTag: 'a', ipa: '[a] eða [a:]', desc: 'Open front unrounded vowel', cat: 'vowel', example: 'afi', transUk: 'дідусь' },
      { upper: 'Á', lower: 'á', soundTag: 'au', ipa: '[au]', desc: 'Diphthong [a] to [u]', cat: 'accented', example: 'álfur', transUk: 'ельф' },
      { upper: 'B', lower: 'b', soundTag: 'be', ipa: '[p]', desc: 'Voiceless bilabial plosive', cat: 'consonant', example: 'bók', transUk: 'книга' },
      { upper: 'D', lower: 'd', soundTag: 'de', ipa: '[t]', desc: 'Voiceless alveolar plosive', cat: 'consonant', example: 'dagur', transUk: 'день' },
      { upper: 'Ð', lower: 'ð', soundTag: 'eð', ipa: '[ð]', desc: 'Voiced dental fricative', cat: 'special', example: 'maður', transUk: 'чоловік' },
      { upper: 'E', lower: 'e', soundTag: 'e', ipa: '[ɛ] eða [ɛ:]', desc: 'Open-mid front unrounded', cat: 'vowel', example: 'eldur', transUk: 'вогонь' },
      { upper: 'É', lower: 'é', soundTag: 'je', ipa: '[jɛ]', desc: 'Palatal glide + vowel', cat: 'accented', example: 'ég', transUk: 'я' },
      { upper: 'F', lower: 'f', soundTag: 'eff', ipa: '[f] / [v] / [p]', desc: 'Labiodental fricative / stop', cat: 'consonant', example: 'fara', transUk: 'іти' },
      { upper: 'G', lower: 'g', soundTag: 'ge', ipa: '[k] / [ɣ] / [j]', desc: 'Velar plosive / fricative', cat: 'consonant', example: 'góður', transUk: 'добрий' },
      { upper: 'H', lower: 'h', soundTag: 'ha', ipa: '[h]', desc: 'Voiceless glottal fricative', cat: 'consonant', example: 'hestur', transUk: 'кінь' },
      { upper: 'I', lower: 'i', soundTag: 'i', ipa: '[ɪ]', desc: 'Near-close near-front unrounded', cat: 'vowel', example: 'íslenska', transUk: 'ісландська' },
      { upper: 'Í', lower: 'í', soundTag: 'i:', ipa: '[i:]', desc: 'Close front unrounded long vowel', cat: 'accented', example: 'ís', transUk: 'лід/морозиво' },
      { upper: 'J', lower: 'j', soundTag: 'joð', ipa: '[j]', desc: 'Palatal approximant', cat: 'consonant', example: 'já', transUk: 'так' },
      { upper: 'K', lower: 'k', soundTag: 'ka', ipa: '[kʰ] / [k]', desc: 'Aspirated velar stop', cat: 'consonant', example: 'kaffi', transUk: 'кава' },
      { upper: 'L', lower: 'l', soundTag: 'ell', ipa: '[l]', desc: 'Alveolar lateral approximant', cat: 'consonant', example: 'land', transUk: 'земля' },
      { upper: 'M', lower: 'm', soundTag: 'emm', ipa: '[m]', desc: 'Bilabial nasal', cat: 'consonant', example: 'mamma', transUk: 'мама' },
      { upper: 'N', lower: 'n', soundTag: 'enn', ipa: '[n]', desc: 'Alveolar nasal', cat: 'consonant', example: 'nafn', transUk: 'ім’я' },
      { upper: 'O', lower: 'o', soundTag: 'o', ipa: '[ɔ]', desc: 'Open-mid back rounded', cat: 'vowel', example: 'orð', transUk: 'слово' },
      { upper: 'Ó', lower: 'ó', soundTag: 'ou', ipa: '[ou]', desc: 'Diphthong [o] to [u]', cat: 'accented', example: 'ólífa', transUk: 'оливка' },
      { upper: 'P', lower: 'p', soundTag: 'pe', ipa: '[pʰ] / [p]', desc: 'Aspirated bilabial stop', cat: 'consonant', example: 'panna', transUk: 'сковорода' },
      { upper: 'R', lower: 'r', soundTag: 'err', ipa: '[r]', desc: 'Alveolar trill', cat: 'consonant', example: 'rigning', transUk: 'дощ' },
      { upper: 'S', lower: 's', soundTag: 'ess', ipa: '[s]', desc: 'Voiceless alveolar sibilant', cat: 'consonant', example: 'sól', transUk: 'сонце' },
      { upper: 'T', lower: 't', soundTag: 'te', ipa: '[tʰ] / [t]', desc: 'Aspirated alveolar stop', cat: 'consonant', example: 'tala', transUk: 'говорити' },
      { upper: 'U', lower: 'u', soundTag: 'u', ipa: '[ʏ]', desc: 'Near-close near-front rounded', cat: 'vowel', example: 'ugla', transUk: 'сова' },
      { upper: 'Ú', lower: 'ú', soundTag: 'u:', ipa: '[u:]', desc: 'Close back rounded long vowel', cat: 'accented', example: 'út', transUk: 'назовні' },
      { upper: 'V', lower: 'v', soundTag: 'vaff', ipa: '[v]', desc: 'Voiced labiodental approximant', cat: 'consonant', example: 'vatn', transUk: 'вода' },
      { upper: 'X', lower: 'x', soundTag: 'ex', ipa: '[xs]', desc: 'Consonant cluster [xs]', cat: 'consonant', example: 'lax', transUk: 'лосось' },
      { upper: 'Y', lower: 'y', soundTag: 'ufsilon i', ipa: '[ɪ]', desc: 'Pronounced identical to I [ɪ]', cat: 'vowel', example: 'yfir', transUk: 'над/через' },
      { upper: 'Ý', lower: 'ý', soundTag: 'ufsilon í', ipa: '[i:]', desc: 'Pronounced identical to Í [i:]', cat: 'accented', example: 'ýsa', transUk: 'пікша' },
      { upper: 'Þ', lower: 'þ', soundTag: 'þorn', ipa: '[θ]', desc: 'Voiceless dental fricative', cat: 'special', example: 'þak', transUk: 'дах' },
      { upper: 'Æ', lower: 'æ', soundTag: 'ai', ipa: '[ai]', desc: 'Diphthong [a] to [i]', cat: 'special', example: 'bær', transUk: 'містечко' },
      { upper: 'Ö', lower: 'ö', soundTag: 'ö', ipa: '[œ]', desc: 'Open-mid front rounded vowel', cat: 'special', example: 'börn', transUk: 'діти' }
    ];

    let currentSelectedLetter = alphabetData[0];

    function renderAlphabetTiles() {
      const grid = document.getElementById('alphabet-grid');
      if (!grid) return;
      grid.innerHTML = '';
      alphabetData.forEach((item) => {
        const isSpecial = item.cat === 'special';
        const isAccented = item.cat === 'accented';
        const card = document.createElement('button');
        card.className = `letter-tile-item letter-tile-warm p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
          isSpecial ? 'border-neon-amber/70 bg-neon-amber/15 shadow-lg shadow-neon-amber/20' : 
          isAccented ? 'border-neon-coral/50 bg-neon-coral/10' : ''
        }`;
        card.setAttribute('data-cat', item.cat);
        card.innerHTML = `
          <div class="text-xl sm:text-2xl font-black ${isSpecial ? 'text-neon-amber' : isAccented ? 'text-neon-coral' : 'text-white'}">${item.upper} ${item.lower}</div>
          <div class="text-[10px] text-neon-coral font-mono mt-1 font-bold tracking-wider">[${item.soundTag}]</div>
        `;
        card.onclick = function() {
          selectAlphabetLetter(item, this);
        };
        grid.appendChild(card);
      });
    }

    function selectAlphabetLetter(item, cardElement) {
      currentSelectedLetter = item;
      document.getElementById('inspect-letter').innerText = `${item.upper} ${item.lower}`;
      document.getElementById('inspect-ipa').innerText = item.ipa;
      document.getElementById('inspect-desc').innerText = item.desc;
      const letterName = letterPhoneticNames[item.upper] || item.soundTag;
      document.getElementById('inspect-example').innerHTML = `Heiti: <strong class="text-neon-amber">${letterName} [${item.soundTag}]</strong> &bull; Dæmi: <strong class="text-white">${item.example}</strong> (${item.transUk})`;
      playLetterSound(item.upper, cardElement);
    }'''

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace Section unit1
    start_sec = content.find('<section id="unit1"')
    end_sec = content.find('</section>', start_sec) + len('</section>')
    if start_sec != -1 and end_sec != -1:
        content = content[:start_sec] + unit1_html + content[end_sec:]
        print(f'✅ Section unit1 replaced in {fpath}')
    else:
        print(f'⚠️ Section unit1 not found in {fpath}')

    # 2. Replace JS Audio engine & Alphabet functions
    # Look for audio engine comment until renderAlphabetTiles
    pattern = r'/\* =+[\r\n\s]+(?:HTML5 REAL MP3 AUDIO PLAYER|MALE VOICE NATIVE AUDIO ENGINE|2\. MALE VOICE NATIVE AUDIO ENGINE)[\s\S]*?renderAlphabetTiles\(\);'
    match = re.search(pattern, content)
    if match:
        content = content[:match.start()] + js_unit1_code + '\n\n    renderAlphabetTiles();' + content[match.end():]
        print(f'✅ Unit 1 JS engine replaced in {fpath}')
    else:
        print(f'⚠️ JS pattern not matched in {fpath}')

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'🎉 File {fpath} successfully updated!')
