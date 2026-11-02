import sys

file_path = '/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/index-volcanic.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Navbar to add Male Voice Indicator
nav_target = '''        <!-- STRICT DUAL LANGUAGE PILL [ IS | UK ] ONLY -->'''
nav_replacement = '''        <!-- Male Voice Audio Engine Indicator -->
        <div id="male-voice-badge-nav" class="hidden md:flex items-center gap-2 px-3 py-1 rounded-xl bg-obsidian-900 border border-volcano-gold/30 text-xs font-mono text-volcano-champagne">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>🎙️ Karl / Gunnar (0.82x · 0.90)</span>
        </div>

        <!-- STRICT DUAL LANGUAGE PILL [ IS | UK ] ONLY -->'''

if nav_target in content:
    content = content.replace(nav_target, nav_replacement, 1)
    print('✅ Navbar updated with Male Voice Indicator')
else:
    print('⚠️ Navbar target not found')

# 2. Update Alphabet section with Male Voice Banner and active inspector
alpha_banner_target = '''      <!-- 32-Letter Interactive Alphabet Grid with Latin-Script Phonetic Notation -->'''
alpha_banner_replacement = '''      <!-- Male Voice Engine Status Banner -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 rounded-xl bg-obsidian-950/90 border border-volcano-gold/30 shadow-xl">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-xl bg-volcano-gold/20 border border-volcano-gold/50 flex items-center justify-center text-xl flex-shrink-0">🎙️</div>
          <div>
            <div class="text-xs font-mono font-bold text-volcano-gold flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>NATIVE MALE ICELANDIC VOICE CONTROLLER: <strong id="voice-name-display" class="text-volcano-champagne">Karl / Gunnar (Málrómur Male)</strong></span>
            </div>
            <div class="text-[11px] text-slate-300 mt-0.5">
              Тембр: Чоловічий баритон (Pitch 0.90) &bull; Темп: Академічна чіткість (Rate 0.82) &bull; Активний золотий контур при відтворенні
            </div>
          </div>
        </div>
        <button onclick="playMaleAudio('Góðan daginn! Ég heiti Karl og tala íslensku.', this)" class="px-4 py-2.5 rounded-xl btn-gold-3d text-xs font-mono font-bold flex items-center gap-2 transition-all flex-shrink-0">
          <span>🔊 Prófa rödd Karls (Тест)</span>
        </button>
      </div>

      <!-- 32-Letter Interactive Alphabet Grid with Latin-Script Phonetic Notation -->'''

if alpha_banner_target in content:
    content = content.replace(alpha_banner_target, alpha_banner_replacement, 1)
    print('✅ Alphabet header updated with Male Voice Controller Banner')
else:
    print('⚠️ Alphabet banner target not found')

# 3. Update Phonetic Traps buttons to pass 'this' and use playMaleAudio
traps_old = '''<button onclick="playVoiceSample('þing maður')" class="w-full py-2 rounded-lg btn-outline-gold text-xs font-mono font-bold flex items-center justify-center gap-2">'''
traps_new = '''<button onclick="playMaleAudio('þing maður', this)" class="w-full py-2 rounded-lg btn-outline-gold text-xs font-mono font-bold flex items-center justify-center gap-2">'''
content = content.replace(traps_old, traps_new)

traps2_old = '''<button onclick="playVoiceSample('Eyjafjallajökull Kolla')" class="w-full py-2 rounded-lg btn-outline-gold text-xs font-mono font-bold flex items-center justify-center gap-2">'''
traps2_new = '''<button onclick="playMaleAudio('Eyjafjallajökull Kolla', this)" class="w-full py-2 rounded-lg btn-outline-gold text-xs font-mono font-bold flex items-center justify-center gap-2">'''
content = content.replace(traps2_old, traps2_new)

traps3_old = '''<button onclick="playVoiceSample('einn steinn')" class="w-full py-2 rounded-lg btn-outline-gold text-xs font-mono font-bold flex items-center justify-center gap-2">'''
traps3_new = '''<button onclick="playMaleAudio('einn steinn', this)" class="w-full py-2 rounded-lg btn-outline-gold text-xs font-mono font-bold flex items-center justify-center gap-2">'''
content = content.replace(traps3_old, traps3_new)

traps4_old = '''<button onclick="playVoiceSample('Hafnarfjörður takk ætla')" class="w-full py-2 rounded-lg btn-outline-gold text-xs font-mono font-bold flex items-center justify-center gap-2">'''
traps4_new = '''<button onclick="playMaleAudio('Hafnarfjörður takk ætla', this)" class="w-full py-2 rounded-lg btn-outline-gold text-xs font-mono font-bold flex items-center justify-center gap-2">'''
content = content.replace(traps4_old, traps4_new)

# 4. Update Dialogue 1 lines to use playMaleAudio(..., this)
content = content.replace("onclick=\"playVoiceSample('Sæll! Hvað heitir þú?')\"", "onclick=\"playMaleAudio('Sæll! Hvað heitir þú?', this)\"")
content = content.replace("onclick=\"playVoiceSample('Ég heiti Jón. Hvað segirðu gott?')\"", "onclick=\"playMaleAudio('Ég heiti Jón. Hvað segirðu gott?', this)\"")
content = content.replace("onclick=\"playVoiceSample('Allt gott, takk! Hvaðan ert þú?')\"", "onclick=\"playMaleAudio('Allt gott, takk! Hvaðan ert þú?', this)\"")
content = content.replace("onclick=\"playVoiceSample('Ég er frá Úkraínu. En þú?')\"", "onclick=\"playMaleAudio('Ég er frá Úkraínu. En þú?', this)\"")

# 5. Insert Dialogue 2 right after Dialogue 1
d1_end_target = '''        </div>
      </div>

    </div>
  </section>'''

d2_html = '''        </div>
      </div>

      <!-- Dialogue 2: Everyday Survival & Situational Dialogue (A1.2–A2 Mímir) -->
      <div class="glass-obsidian p-6 md:p-8 rounded-2xl border border-volcano-gold/30 shadow-2xl mt-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-volcano-gold/20">
          <div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold uppercase">Samtal 1.2 &bull; A1–A2 Mímir</span>
            <h3 class="text-xl font-bold text-white mt-1">Á Kaffihúsi og í Bænum (У кав’ярні та місті)</h3>
          </div>
          <div class="text-xs text-volcano-champagne font-mono flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Rödd Karls &bull; Клікніть репліку для відтворення чоловічим тембром</span>
          </div>
        </div>

        <div class="space-y-4 max-w-3xl mx-auto">
          <!-- Line 1 -->
          <div onclick="playMaleAudio('Góðan daginn! Get ég fengið einn kaffibolla og eina samloku?', this)" class="p-4 rounded-2xl bg-obsidian-900/90 hover:bg-obsidian-800/90 border border-volcano-gold/25 cursor-pointer transition-all flex items-start gap-3 group">
            <div class="w-9 h-9 rounded-full bg-volcano-gold/25 border border-volcano-gold/50 text-volcano-champagne flex items-center justify-center font-bold text-xs flex-shrink-0">
              A
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-white group-hover:text-volcano-champagne transition-colors">
                  „Góðan daginn! Get ég fengið einn kaffibolla og eina samloku?“
                </span>
                <span class="text-xs text-volcano-gold font-mono">🎙️ Karl 0:03</span>
              </div>
              <div class="text-xs text-amber-200/70 mt-1">
                (Доброго дня! Чи можу я замовити чашку кави та сендвіч?)
              </div>
            </div>
          </div>

          <!-- Line 2 -->
          <div onclick="playMaleAudio('Já, gjörðu svo vel. Viltu mjólk eða sykur út í kaffið?', this)" class="p-4 rounded-2xl bg-obsidian-900/90 hover:bg-obsidian-800/90 border border-volcano-gold/25 cursor-pointer transition-all flex items-start gap-3 group ml-4 sm:ml-8">
            <div class="w-9 h-9 rounded-full bg-volcano-lava/25 border border-volcano-lava/50 text-red-300 flex items-center justify-center font-bold text-xs flex-shrink-0">
              B
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-white group-hover:text-red-200 transition-colors">
                  „Já, gjörðu svo vel. Viltu mjólk eða sykur út í kaffið?“
                </span>
                <span class="text-xs text-volcano-gold font-mono">🎙️ Karl 0:03</span>
              </div>
              <div class="text-xs text-amber-200/70 mt-1">
                (Так, будь ласка. Бажаєте молоко чи цукор до кави?)
              </div>
            </div>
          </div>

          <!-- Line 3 -->
          <div onclick="playMaleAudio('Bara smá mjólk, takk. Hvað kostar þetta samtals?', this)" class="p-4 rounded-2xl bg-obsidian-900/90 hover:bg-obsidian-800/90 border border-volcano-gold/25 cursor-pointer transition-all flex items-start gap-3 group">
            <div class="w-9 h-9 rounded-full bg-volcano-gold/25 border border-volcano-gold/50 text-volcano-champagne flex items-center justify-center font-bold text-xs flex-shrink-0">
              A
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-white group-hover:text-volcano-champagne transition-colors">
                  „Bara smá mjólk, takk. Hvað kostar þetta samtals?“
                </span>
                <span class="text-xs text-volcano-gold font-mono">🎙️ Karl 0:02</span>
              </div>
              <div class="text-xs text-amber-200/70 mt-1">
                (Лише трохи молока, дякую. Скільки це коштує разом?)
              </div>
            </div>
          </div>

          <!-- Line 4 -->
          <div onclick="playMaleAudio('Það gerir samtals sjö hundruð krónur.', this)" class="p-4 rounded-2xl bg-obsidian-900/90 hover:bg-obsidian-800/90 border border-volcano-gold/25 cursor-pointer transition-all flex items-start gap-3 group ml-4 sm:ml-8">
            <div class="w-9 h-9 rounded-full bg-volcano-lava/25 border border-volcano-lava/50 text-red-300 flex items-center justify-center font-bold text-xs flex-shrink-0">
              B
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-white group-hover:text-red-200 transition-colors">
                  „Það gerir samtals sjö hundruð krónur.“
                </span>
                <span class="text-xs text-volcano-gold font-mono">🎙️ Karl 0:03</span>
              </div>
              <div class="text-xs text-amber-200/70 mt-1">
                (Це разом коштує сімсот крон.)
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>'''

if d1_end_target in content:
    content = content.replace(d1_end_target, d2_html, 1)
    print('✅ Dialogue 2 inserted successfully')
else:
    print('⚠️ Dialogue 1 end target not found')

# 6. Insert B2 Academic Reader Section right after Unit 12
u12_end_target = '''        </div>

      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 5. TEACHERS & SCHOOLS WORKSPACE'''

b2_reader_html = '''        </div>

      </div>

      <!-- ========================================================================= -->
      <!-- B2 FRÆÐILEGUR LESTUR & BÍN TEXTAGREINING (MALE VOICE ACADEMIC READER)     -->
      <!-- ========================================================================= -->
      <div id="b2-reader" class="glass-obsidian p-6 md:p-8 rounded-2xl border border-purple-500/40 shadow-2xl mt-12 mb-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-purple-500/30">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold font-mono text-lg flex-shrink-0">
              B2
            </div>
            <div>
              <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[11px] font-bold uppercase tracking-wider mb-1">
                Fræðilegur Lestur &bull; BÍN Textagreining &bull; Karl / Gunnar Male Audio
              </div>
              <h3 class="text-xl font-bold text-white">B2 Fræðilegur Lestur: Íslensk Tunga og Setningagreining</h3>
            </div>
          </div>
          <div class="text-xs text-purple-300 font-mono flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Чоловічий голос Карла (0.82x · 0.90) &bull; Клікніть речення</span>
          </div>
        </div>

        <p class="text-xs text-slate-300 mb-6 leading-relaxed">
          Академічний читацький зал рівня B2: тренування сприйняття автентичної ісландської мови на слух із залученням кон'юнктива (viðtengingarháttur), медіального стану (miðmynd) та пасивних форм (þolmynd).
        </p>

        <div class="space-y-4">
          <!-- B2 Sentence 1 -->
          <div onclick="playMaleAudio('Íslensk tunga hefur varðveist með ótrúlegum hætti í meira en þúsund ár.', this)" class="p-5 rounded-2xl bg-obsidian-900/90 hover:bg-obsidian-800/90 border border-purple-500/30 cursor-pointer transition-all group">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-sm sm:text-base font-semibold text-white group-hover:text-purple-200 transition-colors leading-relaxed">
                  „Íslensk tunga hefur <span class="text-purple-400 font-bold">varðveist</span> með ótrúlegum hætti í meira en þúsund ár.“
                </div>
                <div class="text-xs text-amber-200/80 mt-1.5 font-sans">
                  (Ісландська мова збереглася дивовижним чином протягом понад тисячі років.)
                </div>
                <div class="text-[11px] font-mono text-purple-300/70 mt-1">
                  [BÍN: varðveitast (miðmynd / медіальний стан) &bull; meira en þúsund ár (ef.ft)]
                </div>
              </div>
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold flex-shrink-0">
                <span>🎙️ Karl</span>
              </div>
            </div>
          </div>

          <!-- B2 Sentence 2 -->
          <div onclick="playMaleAudio('Beygingarkerfið er flókið og krefst nákvæmrar greiningar á miðmyndarsögnum og viðtengingarhætti.', this)" class="p-5 rounded-2xl bg-obsidian-900/90 hover:bg-obsidian-800/90 border border-purple-500/30 cursor-pointer transition-all group">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-sm sm:text-base font-semibold text-white group-hover:text-purple-200 transition-colors leading-relaxed">
                  „Beygingarkerfið er flókið og <span class="text-volcano-gold font-bold">krefst nákvæmrar greiningar</span> á miðmyndarsögnum og viðtengingarhætti.“
                </div>
                <div class="text-xs text-amber-200/80 mt-1.5 font-sans">
                  (Система словозміни є складною і вимагає точного аналізу медіальних дієслів та кон'юнктива.)
                </div>
                <div class="text-[11px] font-mono text-purple-300/70 mt-1">
                  [BÍN: krefjast stjórnar eignarfalli (EF) &bull; viðtengingarháttur (subjunctive)]
                </div>
              </div>
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold flex-shrink-0">
                <span>🎙️ Karl</span>
              </div>
            </div>
          </div>

          <!-- B2 Sentence 3 -->
          <div onclick="playMaleAudio('Fræðimenn telja að fornar bókmenntir séu órjúfanlegur hluti af þjóðarvitund Íslendinga.', this)" class="p-5 rounded-2xl bg-obsidian-900/90 hover:bg-obsidian-800/90 border border-purple-500/30 cursor-pointer transition-all group">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-sm sm:text-base font-semibold text-white group-hover:text-purple-200 transition-colors leading-relaxed">
                  „Fræðimenn telja að fornar bókmenntir <span class="text-emerald-400 font-bold">séu</span> órjúfanlegur hluti af þjóðarvitund Íslendinga.“
                </div>
                <div class="text-xs text-amber-200/80 mt-1.5 font-sans">
                  (Вчені вважають, що давня література є невіддільною частиною національної свідомості ісландців.)
                </div>
                <div class="text-[11px] font-mono text-purple-300/70 mt-1">
                  [BÍN: séu = viðtengingarháttur nútíðar af vera (кон'юнктив у непрямій мові)]
                </div>
              </div>
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold flex-shrink-0">
                <span>🎙️ Karl</span>
              </div>
            </div>
          </div>

          <!-- B2 Sentence 4 -->
          <div onclick="playMaleAudio('Þegar textinn er rannsakaður samkvæmt BÍN koma í ljós fornustu málfræðilögmálin.', this)" class="p-5 rounded-2xl bg-obsidian-900/90 hover:bg-obsidian-800/90 border border-purple-500/30 cursor-pointer transition-all group">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-sm sm:text-base font-semibold text-white group-hover:text-purple-200 transition-colors leading-relaxed">
                  „Þegar textinn <span class="text-blue-400 font-bold">er rannsakaður</span> samkvæmt BÍN koma í ljós fornustu málfræðilögmálin.“
                </div>
                <div class="text-xs text-amber-200/80 mt-1.5 font-sans">
                  (Коли текст досліджується згідно з BÍN, відкриваються найдавніші граматичні закономірності.)
                </div>
                <div class="text-[11px] font-mono text-purple-300/70 mt-1">
                  [BÍN: formleg þolmynd (пасивний стан: vera + lýsingarháttur þátíðar)]
                </div>
              </div>
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold flex-shrink-0">
                <span>🎙️ Karl</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 5. TEACHERS & SCHOOLS WORKSPACE'''

if u12_end_target in content:
    content = content.replace(u12_end_target, b2_reader_html, 1)
    print('✅ B2 Academic Reader Section inserted')
else:
    print('⚠️ Unit 12 end target not found')

# 7. Replace JS Audio Engine with Male Voice Engine
js_audio_old = '''    function speakLetter(letter) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const phoneticName = icelandicLetterNames[letter.toUpperCase()] || letter;
        const utterance = new SpeechSynthesisUtterance(phoneticName);
        utterance.lang = 'is-IS';
        utterance.rate = 0.85; // crisp academic clarity
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      } else {
        playToneChime(440, 0.15);
      }
    }'''

js_audio_new = '''    /* =========================================================================
       MALE VOICE ENGINE CONTROLLER (KARL / GUNNAR / MÁLRÓMUR MALE)
       ========================================================================= */
    function getIcelandicMaleVoice() {
      if (!('speechSynthesis' in window)) return null;
      const voices = window.speechSynthesis.getVoices();
      // Search specifically for Icelandic Male Voice profiles (Karl / Gunnar / Wavenet-B / Male)
      return voices.find(v => v.lang.startsWith('is') && (
        v.name.includes('Karl') || 
        v.name.includes('Gunnar') || 
        v.name.includes('Male') || 
        v.name.includes('Wavenet-B') ||
        v.name.includes('Standard-B')
      )) || voices.find(v => v.lang.startsWith('is')) || null;
    }

    function playMaleAudio(text, cardElement) {
      if (!('speechSynthesis' in window)) {
        playToneChime(330, 0.25);
        return;
      }
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'is-IS';
      utterance.rate = 0.82; // Academic clarity tempo for learners
      utterance.pitch = 0.90; // Deep, masculine baritone pitch adjustment
      
      const maleVoice = getIcelandicMaleVoice();
      if (maleVoice) utterance.voice = maleVoice;

      // Visual active glow on player card
      if (cardElement) {
        cardElement.classList.add('ring-4', 'ring-amber-400', 'scale-105');
      }

      utterance.onend = () => {
        if (cardElement) cardElement.classList.remove('ring-4', 'ring-amber-400', 'scale-105');
      };
      utterance.onerror = () => {
        if (cardElement) cardElement.classList.remove('ring-4', 'ring-amber-400', 'scale-105');
      };

      window.speechSynthesis.speak(utterance);
    }

    function playVoiceSample(text, cardElement) {
      playMaleAudio(text, cardElement);
    }

    function speakLetter(letter, cardElement) {
      const phoneticName = icelandicLetterNames[letter.toUpperCase()] || letter;
      playMaleAudio(phoneticName, cardElement);
    }

    function updateMaleVoiceBadge() {
      const v = getIcelandicMaleVoice();
      const nameDisplay = document.getElementById('voice-name-display');
      const navDisplay = document.getElementById('male-voice-badge-nav');
      const label = v ? `${v.name} (is-IS)` : 'Karl (Baritone 0.82x · 0.90p)';
      if (nameDisplay) nameDisplay.innerText = label;
      if (navDisplay) navDisplay.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><span>🎙️ ${v ? v.name.split(' ')[0] : 'Karl'} (0.82x)</span>`;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateMaleVoiceBadge;
      setTimeout(updateMaleVoiceBadge, 400);
    }'''

if js_audio_old in content:
    content = content.replace(js_audio_old, js_audio_new, 1)
    print('✅ JS Audio Engine replaced with Male Voice Controller')
else:
    print('⚠️ js_audio_old target not found')

# 8. Update renderAlphabetTiles to pass cardElement to selectAlphabetLetter
render_tiles_old = '''        card.onclick = () => selectAlphabetLetter(item);'''
render_tiles_new = '''        card.onclick = function() { selectAlphabetLetter(item, this); };'''
content = content.replace(render_tiles_old, render_tiles_new, 1)

select_alpha_old = '''    function selectAlphabetLetter(item) {
      currentSelectedLetter = item;
      document.getElementById('inspect-letter').innerText = `${item.upper} ${item.lower}`;
      document.getElementById('inspect-ipa').innerText = item.ipa;
      const letterName = icelandicLetterNames[item.upper] || item.soundTag;
      document.getElementById('inspect-example').innerHTML = `Heiti: <strong class="text-volcano-gold">${letterName} [${item.soundTag}]</strong> &bull; Dæmi: <strong class="text-white">${item.example}</strong> (${item.transUk})`;
      speakLetter(item.upper);
    }

    function speakSelectedLetter() {
      speakLetter(currentSelectedLetter.upper);
    }

    function playVoiceSample(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'is-IS';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      } else {
        playToneChime(520, 0.2);
      }
    }'''

select_alpha_new = '''    function selectAlphabetLetter(item, cardElement) {
      currentSelectedLetter = item;
      document.getElementById('inspect-letter').innerText = `${item.upper} ${item.lower}`;
      document.getElementById('inspect-ipa').innerText = item.ipa;
      const letterName = icelandicLetterNames[item.upper] || item.soundTag;
      document.getElementById('inspect-example').innerHTML = `Heiti: <strong class="text-volcano-gold">${letterName} [${item.soundTag}]</strong> &bull; Dæmi: <strong class="text-white">${item.example}</strong> (${item.transUk})`;
      speakLetter(item.upper, cardElement);
    }

    function speakSelectedLetter(btnElement) {
      speakLetter(currentSelectedLetter.upper, btnElement);
    }'''

if select_alpha_old in content:
    content = content.replace(select_alpha_old, select_alpha_new, 1)
    print('✅ selectAlphabetLetter updated to pass cardElement')
else:
    print('⚠️ select_alpha_old not found')

# 9. Update inspect buttons to pass 'this'
content = content.replace('onclick="speakSelectedLetter()"', 'onclick="speakSelectedLetter(this)"')
content = content.replace('onclick="playVoiceSample(currentSelectedLetter.example)"', 'onclick="playMaleAudio(currentSelectedLetter.example, this)"')

# 10. In renderDrillQuestion, add Karl audio button to question prompt
drill_prompt_old = '''          <div class="p-4 rounded-xl bg-obsidian-900 border border-volcano-gold/30 text-sm md:text-base text-slate-100 font-sans leading-relaxed">
            ${q.prompt}
          </div>'''

drill_prompt_new = '''          <div class="p-4 rounded-xl bg-obsidian-900 border border-volcano-gold/30 text-sm md:text-base text-slate-100 font-sans leading-relaxed flex items-start justify-between gap-4">
            <div>${q.prompt}</div>
            <button onclick="playMaleAudio(\\'${q.prompt.replace(/\\'/g, \"\\\\\\'\")}\\', this)" class="px-2.5 py-1 rounded-lg btn-outline-gold text-xs font-mono font-bold flex items-center gap-1.5 flex-shrink-0" title="Hlusta á Karl (0.82x · 0.90)">
              <span>🎙️ Karl</span>
            </button>
          </div>'''

if drill_prompt_old in content:
    content = content.replace(drill_prompt_old, drill_prompt_new, 1)
    print('✅ Drill prompt audio button added')
else:
    print('⚠️ Drill prompt target not found')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('File index-volcanic.html updated successfully!')
