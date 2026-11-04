import re

# Precise alphabet list matching the user's prompt exactly:
alphabet_data_js = '''    const alphabetData = [
      { upper: 'A', lower: 'a', soundTag: 'a', example: 'Afi', transUk: 'дідусь' },
      { upper: 'Á', lower: 'á', soundTag: 'au', example: 'Á', transUk: 'річка' },
      { upper: 'B', lower: 'b', soundTag: 'be', example: 'Bók', transUk: 'книга' },
      { upper: 'D', lower: 'd', soundTag: 'de', example: 'Dagur', transUk: 'день' },
      { upper: 'Ð', lower: 'ð', soundTag: 'eð', example: 'Maður', transUk: 'чоловік' },
      { upper: 'E', lower: 'e', soundTag: 'e', example: 'Egg', transUk: 'яйце' },
      { upper: 'É', lower: 'é', soundTag: 'je', example: 'Ég', transUk: 'я' },
      { upper: 'F', lower: 'f', soundTag: 'eff', example: 'Fjall', transUk: 'гора' },
      { upper: 'G', lower: 'g', soundTag: 'ge', example: 'Gata', transUk: 'вулиця' },
      { upper: 'H', lower: 'h', soundTag: 'ha', example: 'Hús', transUk: 'будинок' },
      { upper: 'I', lower: 'i', soundTag: 'i', example: 'Ísland', transUk: 'Ісландія' },
      { upper: 'Í', lower: 'í', soundTag: 'i:', example: 'Ís', transUk: 'лід/морозиво' },
      { upper: 'J', lower: 'j', soundTag: 'joð', example: 'Jú', transUk: 'так (на заперечення)' },
      { upper: 'K', lower: 'k', soundTag: 'ka', example: 'Kaffi', transUk: 'кава' },
      { upper: 'L', lower: 'l', soundTag: 'ell', example: 'Lampa', transUk: 'лампа' },
      { upper: 'M', lower: 'm', soundTag: 'emm', example: 'Mamma', transUk: 'мама' },
      { upper: 'N', lower: 'n', soundTag: 'enn', example: 'Nafn', transUk: 'ім’я' },
      { upper: 'O', lower: 'o', soundTag: 'o', example: 'Oft', transUk: 'часто' },
      { upper: 'Ó', lower: 'ó', soundTag: 'ou', example: 'Óskar', transUk: 'Оскар' },
      { upper: 'P', lower: 'p', soundTag: 'pe', example: 'Penni', transUk: 'ручка' },
      { upper: 'R', lower: 'r', soundTag: 'err', example: 'Rigning', transUk: 'дощ' },
      { upper: 'S', lower: 's', soundTag: 'ess', example: 'Sól', transUk: 'сонце' },
      { upper: 'T', lower: 't', soundTag: 'te', example: 'Takk', transUk: 'дякую' },
      { upper: 'U', lower: 'u', soundTag: 'u', example: 'Ull', transUk: 'вовна' },
      { upper: 'Ú', lower: 'ú', soundTag: 'u:', example: 'Út', transUk: 'назовні' },
      { upper: 'V', lower: 'v', soundTag: 'vaff', example: 'Vatn', transUk: 'вода' },
      { upper: 'X', lower: 'x', soundTag: 'ex', example: 'Lax', transUk: 'лосось' },
      { upper: 'Y', lower: 'y', soundTag: 'i', example: 'Einkunn', transUk: 'оцінка' },
      { upper: 'Ý', lower: 'ý', soundTag: 'i:', example: 'Ýsa', transUk: 'пікша' },
      { upper: 'Z', lower: 'z', soundTag: 'seta', example: 'Zeta', transUk: 'зета (історична)' },
      { upper: 'Þ', lower: 'þ', soundTag: 'þorn', example: 'Þing', transUk: 'парламент/тінґ' },
      { upper: 'Æ', lower: 'æ', soundTag: 'ai', example: 'Ætla', transUk: 'мати намір' },
      { upper: 'Ö', lower: 'ö', soundTag: 'ö', example: 'Öld', transUk: 'вік/століття' }
    ];'''

unit1_section_markup = '''  <!-- ========================================================================= -->
  <!-- 3. UNIT 1: STAFRÓFIÐ, FRAMBURÐUR & KVEÐJUR (DAY 1)                         -->
  <!-- ========================================================================= -->
  <section id="unit1" class="py-24 relative z-10 border-t border-cyber-border bg-cyber-void/85">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Unit Header -->
      <div class="mb-12">
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber text-xs font-mono font-bold uppercase tracking-wider mb-3">
          Модуль 01 • Стіг A1.1 (День 1)
        </span>
        <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Eining 1: Stafrófið, Framburður & Kveðjur
        </h2>
        <p class="mt-2 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Ісландська абетка (32 літери), 4 фонетичні пастки та ситуативний діалог знайомства.
        </p>
      </div>

      <!-- 1. ІСЛАНДСЬКА АБЕТКА (ÍSLENSKA STAFRÓFIÐ — 32 STAFIR) -->
      <div class="warm-glass-panel p-6 md:p-8 rounded-2xl border border-cyber-border mb-12 shadow-2xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-cyber-border/40 mb-6">
          <h3 class="text-xl font-bold text-white flex items-center gap-2.5">
            <span class="text-2xl">🔤</span>
            <span>Ісландська абетка (Íslenska stafrófið — 32 stafir)</span>
          </h3>
          <span class="text-xs font-mono text-neon-amber flex items-center gap-2 bg-cyber-deep px-3 py-1.5 rounded-lg border border-neon-amber/30">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Натисніть на картку для озвучки (Karl / Gunnar)</span>
          </span>
        </div>

        <!-- 32 Alphabet Cards Grid -->
        <div id="alphabet-grid" class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3.5 font-mono">
          <!-- Dynamically populated via renderAlphabetTiles() -->
        </div>

        <!-- Selected Letter Inspector Bar -->
        <div id="letter-inspector" class="mt-8 p-5 rounded-xl bg-cyber-deep/95 border border-neon-amber/50 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-inner">
          <div class="flex items-center gap-4">
            <span id="inspect-letter" class="text-4xl sm:text-5xl font-black text-neon-amber font-mono">A a</span>
            <div>
              <div id="inspect-ipa" class="text-base font-mono text-neon-coral font-bold">[a]</div>
              <div id="inspect-example" class="text-xs text-slate-300 mt-1 font-sans">
                Приклад: <strong class="text-white text-sm">Afi</strong> (дідусь) &bull; Назва літери: <strong class="text-neon-amber">a</strong>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2.5 flex-shrink-0">
            <button onclick="speakSelectedLetter(this)" class="px-4 py-2.5 rounded-xl btn-warm-3d text-xs font-bold flex items-center gap-2">
              <span>🔊 Heiti stafs (Назва)</span>
            </button>
            <button onclick="playNativeMaleVoice(currentSelectedLetter.example, this)" class="px-4 py-2.5 rounded-xl btn-outline-warm text-xs font-bold flex items-center gap-2">
              <span>🗣️ Dæmi: <span id="inspect-btn-word" class="font-bold">Afi</span></span>
            </button>
          </div>
        </div>
      </div>

      <!-- 2. ФОНЕТИЧНІ ПАСТКИ (FRAMBURÐARÞJÁLFUN — 4 ПРАВИЛА) -->
      <div class="warm-glass-panel p-6 md:p-8 rounded-2xl border border-cyber-border mb-12 shadow-2xl">
        <div class="pb-5 border-b border-cyber-border/40 mb-6">
          <h3 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span class="text-2xl">🧩</span>
            <span>Фонетичні пастки (Framburðarþjálfun — 4 правила)</span>
          </h3>
          <p class="text-xs text-slate-300 mt-1">Клікніть на будь-яке правило чи приклад, щоб почути автентичну чоловічу вимову.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Trap 1 -->
          <div onclick="playNativeMaleVoice('Kolla Eyjafjallajökull', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/50 cursor-pointer transition-all group glow-nf">
            <div class="flex items-center justify-between mb-2">
              <span class="text-base font-bold text-neon-amber group-hover:text-white transition-colors">1. Подвійне 'll' ➔ [tl]</span>
              <span class="text-xs font-mono text-neon-amber">🔊 [tl]</span>
            </div>
            <p class="text-sm font-semibold text-white mb-2">
              Kolla <span class="text-neon-amber font-mono font-bold">[kotla]</span> • Eyjafjallajökull <span class="text-neon-amber font-mono font-bold">[eiia-fyatla-yökutl]</span>
            </p>
            <p class="text-xs text-slate-300 leading-relaxed font-sans">
              Случний боковий звук: перед подвійним L виникає виразне [t].
            </p>
          </div>

          <!-- Trap 2 -->
          <div onclick="playNativeMaleVoice('Einn Steinn', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/50 cursor-pointer transition-all group glow-tf">
            <div class="flex items-center justify-between mb-2">
              <span class="text-base font-bold text-neon-coral group-hover:text-white transition-colors">2. Подвійне 'nn' ➔ [tn]</span>
              <span class="text-xs font-mono text-neon-coral">🔊 [tn]</span>
            </div>
            <p class="text-sm font-semibold text-white mb-2">
              Einn <span class="text-neon-coral font-mono font-bold">[eitn]</span> • Steinn <span class="text-neon-coral font-mono font-bold">[steitn]</span>
            </p>
            <p class="text-xs text-slate-300 leading-relaxed font-sans">
              Після наголошених голосних та дифтонгів NN читається як [tn].
            </p>
          </div>

          <!-- Trap 3 -->
          <div onclick="playNativeMaleVoice('Hafnarfjörður Afl', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/50 cursor-pointer transition-all group glow-tgf">
            <div class="flex items-center justify-between mb-2">
              <span class="text-base font-bold text-neon-purple group-hover:text-white transition-colors">3. Сполучення 'fn / fl' ➔ [pn / pl]</span>
              <span class="text-xs font-mono text-neon-purple">🔊 [pn / pl]</span>
            </div>
            <p class="text-sm font-semibold text-white mb-2">
              Hafnarfjörður <span class="text-neon-purple font-mono font-bold">[hapnar-]</span> • Afl <span class="text-neon-purple font-mono font-bold">[apl]</span>
            </p>
            <p class="text-xs text-slate-300 leading-relaxed font-sans">
              Буква F перед N та L оглушується і переходить у губний [p].
            </p>
          </div>

          <!-- Trap 4 -->
          <div onclick="playNativeMaleVoice('Takk Ætla', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/50 cursor-pointer transition-all group glow-ef">
            <div class="flex items-center justify-between mb-2">
              <span class="text-base font-bold text-neon-rose group-hover:text-white transition-colors">4. Преаспірація (придих [h])</span>
              <span class="text-xs font-mono text-neon-rose">🔊 [h]</span>
            </div>
            <p class="text-sm font-semibold text-white mb-2">
              Takk <span class="text-neon-rose font-mono font-bold">[ta-hk]</span> • Ætla <span class="text-neon-rose font-mono font-bold">[ai-htla]</span>
            </p>
            <p class="text-xs text-slate-300 leading-relaxed font-sans">
              Перед подвійними pp, tt, kk утворюється коротка повітряна пауза-придих [h].
            </p>
          </div>

        </div>
      </div>

      <!-- 3. СИТУАТИВНИЙ ДІАЛОГ: ПЕРШЕ ЗНАЙОМСТВО (FYRSTA SAMTALIÐ) -->
      <div class="warm-glass-panel p-6 md:p-8 rounded-2xl border border-cyber-border mb-12 shadow-2xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-cyber-border/40 mb-6">
          <h3 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span class="text-2xl">💬</span>
            <span>Ситуативний діалог: Перше знайомство (Fyrsta samtalið)</span>
          </h3>
          <button id="play-full-dialogue-btn" onclick="playFullDialogue()" class="px-5 py-2.5 rounded-xl btn-warm-3d text-xs font-black flex items-center gap-2 shadow-lg">
            <span>▶️ Spila allt samtalið (Слухати весь діалог підряд)</span>
          </button>
        </div>

        <div class="space-y-4 max-w-3xl mx-auto">
          
          <!-- Line 1: Jón -->
          <div id="d1-line-1" onclick="playNativeMaleVoice('Sæll! Hvað heitir þú?', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 cursor-pointer transition-all flex items-start gap-4 group">
            <div class="w-10 h-10 rounded-full bg-neon-amber/25 border border-neon-amber/50 text-neon-amber flex items-center justify-center font-bold text-sm flex-shrink-0">
              👨
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-neon-amber">👨 Jón (Йон)</span>
                <span class="text-xs text-neon-amber font-mono">🔊 0:02</span>
              </div>
              <p class="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-neon-amber transition-colors">
                Sæll! Hvað heitir þú?
              </p>
              <p class="text-xs sm:text-sm text-amber-200/80 mt-1 font-sans">
                <span class="font-mono text-neon-coral">[Saitl! Hvað heitir þu?]</span> • Вітаю! Як тебе звати?
              </p>
            </div>
          </div>

          <!-- Line 2: Anna -->
          <div id="d1-line-2" onclick="playNativeMaleVoice('Sæl! Ég heiti Anna. Hvaðan ert þú?', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 cursor-pointer transition-all flex items-start gap-4 group ml-4 sm:ml-8">
            <div class="w-10 h-10 rounded-full bg-neon-rose/25 border border-neon-rose/50 text-neon-rose flex items-center justify-center font-bold text-sm flex-shrink-0">
              👩
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-neon-rose">👩 Anna (Анна)</span>
                <span class="text-xs text-neon-rose font-mono">🔊 0:03</span>
              </div>
              <p class="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-neon-rose transition-colors">
                Sæl! Ég heiti Anna. Hvaðan ert þú?
              </p>
              <p class="text-xs sm:text-sm text-amber-200/80 mt-1 font-sans">
                <span class="font-mono text-neon-coral">[Sail! Jeg heiti Anna. Hvaðan ert þu?]</span> • Вітаю! Мене звати Анна. Звідки ти?
              </p>
            </div>
          </div>

          <!-- Line 3: Jón -->
          <div id="d1-line-3" onclick="playNativeMaleVoice('Ég er frá Íslandi. En þú?', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 cursor-pointer transition-all flex items-start gap-4 group">
            <div class="w-10 h-10 rounded-full bg-neon-amber/25 border border-neon-amber/50 text-neon-amber flex items-center justify-center font-bold text-sm flex-shrink-0">
              👨
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-neon-amber">👨 Jón (Йон)</span>
                <span class="text-xs text-neon-amber font-mono">🔊 0:02</span>
              </div>
              <p class="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-neon-amber transition-colors">
                Ég er frá Íslandi. En þú?
              </p>
              <p class="text-xs sm:text-sm text-amber-200/80 mt-1 font-sans">
                <span class="font-mono text-neon-coral">[Jeg er fra Islandi. En þu?]</span> • Я з Ісландії. А ти?
              </p>
            </div>
          </div>

          <!-- Line 4: Anna -->
          <div id="d1-line-4" onclick="playNativeMaleVoice('Ég er frá Úkraínu. Gaman að hitta þig!', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 cursor-pointer transition-all flex items-start gap-4 group ml-4 sm:ml-8">
            <div class="w-10 h-10 rounded-full bg-neon-rose/25 border border-neon-rose/50 text-neon-rose flex items-center justify-center font-bold text-sm flex-shrink-0">
              👩
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-neon-rose">👩 Anna (Анна)</span>
                <span class="text-xs text-neon-rose font-mono">🔊 0:03</span>
              </div>
              <p class="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-neon-rose transition-colors">
                Ég er frá Úkraínu. Gaman að hitta þig!
              </p>
              <p class="text-xs sm:text-sm text-amber-200/80 mt-1 font-sans">
                <span class="font-mono text-neon-coral">[Jeg er fra Ukrainu. Gaman að hitta þig!]</span> • Я з України. Приємно познайомитися!
              </p>
            </div>
          </div>

        </div>

        <!-- ІНТЕРАКТИВНИЙ КОНСТРУКТОР ЗНАЙОМСТВА -->
        <div class="p-6 rounded-2xl bg-cyber-deep border border-neon-amber/35 shadow-xl max-w-3xl mx-auto mt-8">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-neon-amber text-lg">✍️</span>
            <h4 class="text-base font-bold text-white">Конструктор власної відповіді (Спробуйте самі)</h4>
          </div>
          <p class="text-xs text-slate-300 mb-4">
            Введіть своє ім'я та місто або країну для створення та озвучення персональної репліки:
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-[11px] font-mono text-neon-amber mb-1 uppercase font-bold">Ваше ім'я</label>
              <input type="text" id="custom-intro-name" value="Anna" oninput="updateCustomIntroPreview()" class="w-full px-3.5 py-2.5 rounded-xl bg-cyber-void border border-cyber-border text-white text-sm font-medium focus:border-neon-amber focus:outline-none transition-colors" placeholder="f.d. Anna eða Jón">
            </div>
            <div>
              <label class="block text-[11px] font-mono text-neon-coral mb-1 uppercase font-bold">Звідки ви (Країна/Місто)</label>
              <input type="text" id="custom-intro-place" value="Úkraínu" oninput="updateCustomIntroPreview()" class="w-full px-3.5 py-2.5 rounded-xl bg-cyber-void border border-cyber-border text-white text-sm font-medium focus:border-neon-coral focus:outline-none transition-colors" placeholder="f.d. Úkraínu, Kænugarði...">
            </div>
          </div>

          <div class="p-4 rounded-xl bg-cyber-void border border-neon-amber/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div class="text-[11px] font-mono text-slate-400">Ваша згенерована репліка:</div>
              <div id="custom-intro-preview" class="text-sm sm:text-base font-semibold text-neon-amber mt-0.5">
                „Ég heiti Anna og ég er frá Úkraínu. Gaman að hitta þig!“
              </div>
            </div>
            <button onclick="speakCustomIntroduction(this)" class="px-5 py-2.5 rounded-xl btn-warm-3d text-xs font-black flex items-center gap-2 flex-shrink-0 shadow-lg">
              <span>🎙️ Озвучити мою відповідь</span>
            </button>
          </div>
        </div>

      </div>

      <!-- Примітка для викладача (PDF) -->
      <div class="warm-glass-panel p-6 md:p-8 rounded-2xl border border-neon-violet/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-neon-violet/20 border border-neon-violet/40 flex items-center justify-center text-neon-violet font-bold text-2xl flex-shrink-0">
            📚
          </div>
          <div>
            <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-neon-violet/20 text-neon-violet font-mono text-[10px] font-bold uppercase mb-1">
              Kennaranóta &bull; A1.1 Aðalnámskrá
            </div>
            <h4 class="text-lg font-bold text-white">Методичний робочий аркуш для занять у класі</h4>
            <p class="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Відпрацювання 32 літер абетки, фонетичних опозицій Þ [θ] vs Ð [ð], подвійного ll [tl] та діалогу знайомства у парах.
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

render_tiles_js = '''    function renderAlphabetTiles() {
      const grid = document.getElementById('alphabet-grid');
      if (!grid) return;
      grid.innerHTML = '';
      alphabetData.forEach((item) => {
        const isSpecial = ['Þ', 'Ð', 'Æ', 'Ö'].includes(item.upper);
        const isAccented = ['Á', 'É', 'Í', 'Ó', 'Ú', 'Ý'].includes(item.upper);
        const card = document.createElement('button');
        card.className = `letter-tile-item letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
          isSpecial ? 'border-neon-amber/70 bg-neon-amber/15 shadow-lg shadow-neon-amber/20' : 
          isAccented ? 'border-neon-coral/50 bg-neon-coral/10' : ''
        }`;
        card.innerHTML = `
          <div class="text-xl sm:text-2xl font-black ${isSpecial ? 'text-neon-amber' : isAccented ? 'text-neon-coral' : 'text-white'}">${item.upper} ${item.lower}</div>
          <div class="text-[11px] text-neon-coral font-mono mt-1 font-bold tracking-wider">[${item.soundTag}]</div>
          <div class="text-[10px] text-slate-300 font-sans mt-0.5 truncate max-w-[80px]">${item.example}</div>
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
      document.getElementById('inspect-ipa').innerText = `[${item.soundTag}]`;
      document.getElementById('inspect-example').innerHTML = `Приклад: <strong class="text-white text-sm">${item.example}</strong> (${item.transUk}) &bull; Назва літери: <strong class="text-neon-amber">${letterPhoneticNames[item.upper] || item.soundTag}</strong>`;
      const btnWord = document.getElementById('inspect-btn-word');
      if (btnWord) btnWord.innerText = item.example;
      playLetterSound(item.upper, cardElement);
    }

    function speakSelectedLetter(btnElement) {
      playLetterSound(currentSelectedLetter.upper, btnElement);
    }

    // Play full dialogue sequentially
    let isPlayingDialogue = false;
    async function playFullDialogue() {
      if (isPlayingDialogue) return;
      isPlayingDialogue = true;
      const btn = document.getElementById('play-full-dialogue-btn');
      if (btn) btn.innerHTML = `<span>⏳ Spilar samtalið...</span>`;

      const lines = [
        { text: 'Sæll! Hvað heitir þú?', id: 'd1-line-1' },
        { text: 'Sæl! Ég heiti Anna. Hvaðan ert þú?', id: 'd1-line-2' },
        { text: 'Ég er frá Íslandi. En þú?', id: 'd1-line-3' },
        { text: 'Ég er frá Úkraínu. Gaman að hitta þig!', id: 'd1-line-4' }
      ];

      for (let i = 0; i < lines.length; i++) {
        const el = document.getElementById(lines[i].id);
        playNativeMaleVoice(lines[i].text, el);
        await new Promise(r => setTimeout(r, 2600));
      }

      if (btn) btn.innerHTML = `<span>▶️ Spila allt samtalið (Слухати весь діалог підряд)</span>`;
      isPlayingDialogue = false;
    }

    function updateCustomIntroPreview() {
      const name = (document.getElementById('custom-intro-name').value || 'Anna').trim();
      const place = (document.getElementById('custom-intro-place').value || 'Úkraínu').trim();
      document.getElementById('custom-intro-preview').innerText = `„Ég heiti ${name} og ég er frá ${place}. Gaman að hitta þig!“`;
    }

    function speakCustomIntroduction(btnElement) {
      const name = (document.getElementById('custom-intro-name').value || 'Anna').trim();
      const place = (document.getElementById('custom-intro-place').value || 'Úkraínu').trim();
      const sentence = `Ég heiti ${name} og ég er frá ${place}. Gaman að hitta þig!`;
      playNativeMaleVoice(sentence, btnElement);
    }'''

files = [
    '/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/index-cyberpunk.html',
    '/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/index-volcanic.html'
]

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace Section unit1
    start_sec = content.find('<section id="unit1"')
    end_sec = content.find('</section>', start_sec) + len('</section>')
    if start_sec != -1 and end_sec != -1:
        content = content[:start_sec] + unit1_section_markup + content[end_sec:]
        print(f'✅ Section unit1 updated in {fpath}')
    else:
        print(f'⚠️ Section unit1 not found in {fpath}')

    # 2. Replace alphabetData in JS
    alpha_pattern = r'const alphabetData = \[[\s\S]*?\];'
    content = re.sub(alpha_pattern, alphabet_data_js.strip(), content, count=1)

    # 3. Replace renderAlphabetTiles and related dialogue functions
    render_pattern = r'function renderAlphabetTiles\(\)\s*\{[\s\S]*?function toggleAccordion'
    match = re.search(render_pattern, content)
    if match:
        content = content[:match.start()] + render_tiles_js + '\n\n    renderAlphabetTiles();\n\n    function toggleAccordion' + content[match.end():]
        print(f'✅ renderAlphabetTiles and dialogue functions updated in {fpath}')
    else:
        print(f'⚠️ renderAlphabetTiles pattern not matched in {fpath}')

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'🎉 File {fpath} successfully updated!')
