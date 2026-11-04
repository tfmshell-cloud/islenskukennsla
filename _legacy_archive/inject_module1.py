import re

index_path = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/index.html"
desktop_path = "/Users/volodymyrkatasonov/Desktop/Islenskukennsla_A1_B2.html"

with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Ensure Module 0 has its id container if not present
if '<div id="modull-0">' not in html:
    # Wrap alphabet, traps, and dialogue in #modull-0
    html = html.replace('<!-- 2. FULL 32-LETTER ALPHABET GRID -->', '<div id="modull-0">\n  <!-- 2. FULL 32-LETTER ALPHABET GRID -->')
    # Close #modull-0 right before roadmap
    html = html.replace('<!-- ========================================================================= -->\n  <!-- 5. ROADMAP:', '</div>\n\n  <!-- ========================================================================= -->\n  <!-- 5. ROADMAP:')

module1_html = """  <!-- ========================================================================= -->
  <!-- MÓDÚLL 1: GRUNNSTIG A1.1 (Í KAFFIHÚSINU, TÖLUR 1-4 & ÞOLFALL ÞF 🟢)        -->
  <!-- ========================================================================= -->
  <section id="modull-1" class="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
    <div class="warm-glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-12">
      
      <!-- 1. SECTION HEADER -->
      <div class="pb-6 border-b border-cyber-border/40">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
            <span>🇮🇸 MÓDÚLL 01</span> • <span>GRUNNSTIG A1.1</span> • <span>ÞOLFALL (ÞF) 🟢</span>
          </div>
          <span class="px-3 py-1 rounded-lg bg-cyber-deep border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
            Практичний рівень: A1.1
          </span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <span>☕ Módúll 1 • Grunnstig A1.1: Í kaffihúsinu, Tölur 1–4 &amp; Þolfall ÞF 🟢</span>
        </h2>
        <p class="mt-2 text-sm sm:text-base text-slate-300 font-sans">
          Замовлення в кав'ярні, узгодження чисел 1–4 за 3 родами та Знахідний відмінок об'єкта.
        </p>
      </div>

      <!-- 2. BLOCK 1: Í KAFFIHÚSINU (ОБСЛУГОВУВАННЯ В КАВ'ЯРНІ) -->
      <div class="space-y-8">
        <div>
          <div class="flex items-center gap-2.5 text-neon-amber text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>Klasi 1 • Frasasmíði</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🍽️ 1. Í kaffihúsinu (Обслуговування в кав'ярні)</span>
          </h3>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            Головна мовна модель замовлення в Ісландії: конструкція <strong class="text-neon-amber font-mono">„Ég ætla að fá...“</strong> (Я буду / Я хотів би отримати...). Натисніть на будь-яку картку, щоб прослухати вимову.
          </p>
        </div>

        <!-- Phrase Builder Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <!-- Item 1: kaffi -->
          <div onclick="playLetterSound('Ég ætla að fá einn kaffi', this)" class="p-5 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-cyber-border/50 hover:border-neon-amber cursor-pointer transition-all duration-200 group">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-0.5 rounded bg-neon-amber/20 border border-neon-amber/40 text-neon-amber font-mono text-[11px] font-bold">kk. (m.) • Karlkyn</span>
              <span class="text-xs font-mono text-neon-amber">🔊 [kaffi]</span>
            </div>
            <div class="text-base sm:text-lg font-bold text-white group-hover:text-neon-amber transition-colors font-mono">
              Ég ætla að fá einn kaffi
            </div>
            <div class="text-xs font-mono text-neon-coral mt-1">
              [Jeg ai-htla að fa einn kaffi]
            </div>
            <div class="mt-2.5 pt-2 border-t border-cyber-border/30 text-xs text-slate-300 font-sans flex items-center justify-between">
              <span>Кава: <strong>kaffi</strong> (ч.р.)</span>
              <span class="text-amber-200/90 font-medium">«Я буду одну каву»</span>
            </div>
          </div>

          <!-- Item 2: samloku -->
          <div onclick="playLetterSound('Ég ætla að fá eina samloku', this)" class="p-5 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-emerald-500/40 hover:border-emerald-400 cursor-pointer transition-all duration-200 group">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] font-bold">kvk. (f.) • ÞF samloku</span>
              <span class="text-xs font-mono text-emerald-400">🔊 [samloku]</span>
            </div>
            <div class="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors font-mono">
              Ég ætla að fá eina samloku
            </div>
            <div class="text-xs font-mono text-neon-coral mt-1">
              [Jeg ai-htla að fa eina samloku]
            </div>
            <div class="mt-2.5 pt-2 border-t border-cyber-border/30 text-xs text-slate-300 font-sans flex items-center justify-between">
              <span>Сендвіч: <strong>samloka &rarr; samloku</strong> (ж.р. ÞF)</span>
              <span class="text-emerald-300/90 font-medium">«Я буду один сендвіч»</span>
            </div>
          </div>

          <!-- Item 3: vatn -->
          <div onclick="playLetterSound('Ég ætla að fá eitt vatn', this)" class="p-5 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-cyber-border/50 hover:border-neon-coral cursor-pointer transition-all duration-200 group">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-0.5 rounded bg-neon-coral/20 border border-neon-coral/40 text-neon-coral font-mono text-[11px] font-bold">hk. (n.) • Hvorugkyn</span>
              <span class="text-xs font-mono text-neon-coral">🔊 [vatn]</span>
            </div>
            <div class="text-base sm:text-lg font-bold text-white group-hover:text-neon-coral transition-colors font-mono">
              Ég ætla að fá eitt vatn
            </div>
            <div class="text-xs font-mono text-neon-coral mt-1">
              [Jeg ai-htla að fa eitt vatn]
            </div>
            <div class="mt-2.5 pt-2 border-t border-cyber-border/30 text-xs text-slate-300 font-sans flex items-center justify-between">
              <span>Вода: <strong>vatn</strong> (с.р.)</span>
              <span class="text-amber-200/90 font-medium">«Я буду одну воду»</span>
            </div>
          </div>

          <!-- Item 4: te -->
          <div onclick="playLetterSound('Ég ætla að fá eitt te', this)" class="p-5 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-cyber-border/50 hover:border-neon-coral cursor-pointer transition-all duration-200 group">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-0.5 rounded bg-neon-coral/20 border border-neon-coral/40 text-neon-coral font-mono text-[11px] font-bold">hk. (n.) • Hvorugkyn</span>
              <span class="text-xs font-mono text-neon-coral">🔊 [te]</span>
            </div>
            <div class="text-base sm:text-lg font-bold text-white group-hover:text-neon-coral transition-colors font-mono">
              Ég ætla að fá eitt te
            </div>
            <div class="text-xs font-mono text-neon-coral mt-1">
              [Jeg ai-htla að fa eitt te]
            </div>
            <div class="mt-2.5 pt-2 border-t border-cyber-border/30 text-xs text-slate-300 font-sans flex items-center justify-between">
              <span>Чай: <strong>te</strong> (с.р.)</span>
              <span class="text-amber-200/90 font-medium">«Я буду один чай»</span>
            </div>
          </div>

          <!-- Item 5: kökubita -->
          <div onclick="playLetterSound('Ég ætla að fá einn kökubita', this)" class="p-5 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-emerald-500/40 hover:border-emerald-400 cursor-pointer transition-all duration-200 group sm:col-span-2 lg:col-span-2">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] font-bold">kk. (m.) • ÞF kökubita</span>
              <span class="text-xs font-mono text-emerald-400">🔊 [kökubita]</span>
            </div>
            <div class="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors font-mono">
              Ég ætla að fá einn kökubita
            </div>
            <div class="text-xs font-mono text-neon-coral mt-1">
              [Jeg ai-htla að fa einn kökubita]
            </div>
            <div class="mt-2.5 pt-2 border-t border-cyber-border/30 text-xs text-slate-300 font-sans flex items-center justify-between">
              <span>Шматочок торта: <strong>kökubiti &rarr; kökubita</strong> (ч.р. слабкий ÞF)</span>
              <span class="text-emerald-300/90 font-medium">«Я буду шматочок торта»</span>
            </div>
          </div>

        </div>

        <!-- Full Situational Dialogue (Þjónn & Gestur) -->
        <div class="p-6 rounded-2xl bg-cyber-deep/90 border border-cyber-border/60 shadow-inner">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyber-border/40 mb-6">
            <div>
              <span class="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase">Raunverulegt samtal</span>
              <h4 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                <span>☕ Діалог: Замовлення та розрахунок у кав'ярні</span>
              </h4>
            </div>
            <button id="play-dialogue-m1-btn" onclick="playModule1Dialogue()" class="px-5 py-2.5 rounded-xl btn-warm-3d text-xs font-bold flex items-center gap-2 self-start sm:self-auto shadow-md">
              <span>▶️ Слухати весь діалог (Þjónn &amp; Gestur)</span>
            </button>
          </div>

          <div class="space-y-3.5 max-w-3xl mx-auto">

            <!-- Line 1: Þjónn -->
            <div id="m1-line-1" onclick="playLetterSound('Góðan daginn! Hvað má bjóða þér?', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
              <div class="w-10 h-10 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber flex items-center justify-center font-bold text-base flex-shrink-0">
                👨‍🍳
              </div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-neon-amber">Þjónn (Офіціант)</span>
                  <span class="text-xs font-mono text-neon-amber">🔊 0:02</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-neon-amber transition-colors font-mono">
                  Góðan daginn! Hvað má bjóða þér?
                </p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans">
                  <span class="font-mono text-neon-coral">[Gooðan dai-in! Hvað ma bjoða þer?]</span> • Доброго дня! Що вам запропонувати?
                </p>
              </div>
            </div>

            <!-- Line 2: Gestur -->
            <div id="m1-line-2" onclick="playLetterSound('Góðan dag! Ég ætla að fá einn kaffi og eina samloku, takk.', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex items-start gap-3.5 group ml-3 sm:ml-6">
              <div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-base flex-shrink-0">
                ☕
              </div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-emerald-400">Gestur (Гість)</span>
                  <span class="text-xs font-mono text-emerald-400">🔊 0:04</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-emerald-400 transition-colors font-mono">
                  Góðan dag! Ég ætla að fá einn kaffi og eina samloku, takk.
                </p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans">
                  <span class="font-mono text-neon-coral">[Gooðan dag! Jeg ai-htla að fa einn kaffi og eina samloku, ta-hk.]</span> • Доброго дня! Я буду одну каву та один сендвіч, дякую.
                </p>
              </div>
            </div>

            <!-- Line 3: Þjónn -->
            <div id="m1-line-3" onclick="playLetterSound('Eitthvað fleira?', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
              <div class="w-10 h-10 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber flex items-center justify-center font-bold text-base flex-shrink-0">
                👨‍🍳
              </div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-neon-amber">Þjónn (Офіціант)</span>
                  <span class="text-xs font-mono text-neon-amber">🔊 0:01</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-neon-amber transition-colors font-mono">
                  Eitthvað fleira?
                </p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans">
                  <span class="font-mono text-neon-coral">[Eit-hvað fleira?]</span> • Щось ще?
                </p>
              </div>
            </div>

            <!-- Line 4: Gestur -->
            <div id="m1-line-4" onclick="playLetterSound('Nei, takk. Hvað kostar þetta?', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex items-start gap-3.5 group ml-3 sm:ml-6">
              <div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-base flex-shrink-0">
                ☕
              </div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-emerald-400">Gestur (Гість)</span>
                  <span class="text-xs font-mono text-emerald-400">🔊 0:02</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-emerald-400 transition-colors font-mono">
                  Nei, takk. Hvað kostar þetta?
                </p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans">
                  <span class="font-mono text-neon-coral">[Nei, ta-hk. Hvað kostar þetta?]</span> • Ні, дякую. Скільки це коштує?
                </p>
              </div>
            </div>

            <!-- Line 5: Þjónn -->
            <div id="m1-line-5" onclick="playLetterSound('Það gerir 1500 krónur.', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
              <div class="w-10 h-10 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber flex items-center justify-center font-bold text-base flex-shrink-0">
                👨‍🍳
              </div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-neon-amber">Þjónn (Офіціант)</span>
                  <span class="text-xs font-mono text-neon-amber">🔊 0:02</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-neon-amber transition-colors font-mono">
                  Það gerir 1500 krónur.
                </p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans">
                  <span class="font-mono text-neon-coral">[Það gerir 1500 kronur.]</span> • З вас 1500 крон.
                </p>
              </div>
            </div>

            <!-- Line 6: Gestur -->
            <div id="m1-line-6" onclick="playLetterSound('Gjörðu svo vel!', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex items-start gap-3.5 group ml-3 sm:ml-6">
              <div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-base flex-shrink-0">
                ☕
              </div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-emerald-400">Gestur (Гість)</span>
                  <span class="text-xs font-mono text-emerald-400">🔊 0:01</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-emerald-400 transition-colors font-mono">
                  Gjörðu svo vel!
                </p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans">
                  <span class="font-mono text-neon-coral">[Gjörðu svo vel!]</span> • Прошу! / Тримайте!
                </p>
              </div>
            </div>

            <!-- Line 7: Þjónn -->
            <div id="m1-line-7" onclick="playLetterSound('Takk kærlega!', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
              <div class="w-10 h-10 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber flex items-center justify-center font-bold text-base flex-shrink-0">
                👨‍🍳
              </div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-neon-amber">Þjónn (Офіціант)</span>
                  <span class="text-xs font-mono text-neon-amber">🔊 0:01</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-neon-amber transition-colors font-mono">
                  Takk kærlega!
                </p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans">
                  <span class="font-mono text-neon-coral">[Ta-hk kaerlega!]</span> • Щиро дякую!
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- 3. BLOCK 2: TÖLUR 1–4 MEÐ KYNJUM (ЧИСЛІВНИКИ 1–4 ЗА 3 РОДАМИ) -->
      <div class="space-y-6">
        <div>
          <div class="flex items-center gap-2.5 text-neon-coral text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>Klasi 2 • Beygingartöflur</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🔢 2. Tölur 1–4 með kynjum (Числівники 1–4 за 3 родами)</span>
          </h3>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            В ісландській мові числівники <strong>від 1 до 4</strong> обов'язково узгоджуються в роді з іменником, який вони рахують. Натисніть на будь-яку комірку матриці для озвучення.
          </p>
        </div>

        <!-- 4x3 Matrix Table Container -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse rounded-2xl overflow-hidden border border-cyber-border/60 bg-cyber-deep/80">
            <thead>
              <tr class="bg-cyber-void/90 border-b border-cyber-border/70 text-xs font-mono font-bold text-slate-300">
                <th class="p-4 border-r border-cyber-border/40 text-center w-16 text-neon-amber">Tala</th>
                <th class="p-4 border-r border-cyber-border/40 text-neon-amber">
                  Karlkyn (kk. ♂)
                  <span class="block text-[10px] font-normal text-slate-400 font-sans">Чоловічий рід</span>
                </th>
                <th class="p-4 border-r border-cyber-border/40 text-emerald-400">
                  Kvenkyn (kvk. ♀)
                  <span class="block text-[10px] font-normal text-slate-400 font-sans">Жіночий рід</span>
                </th>
                <th class="p-4 text-neon-coral">
                  Hvorugkyn (hk. ⚲)
                  <span class="block text-[10px] font-normal text-slate-400 font-sans">Середній рід</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-cyber-border/30 text-sm font-mono">
              
              <!-- Number 1 -->
              <tr class="hover:bg-cyber-void/40 transition-colors">
                <td class="p-4 font-black text-center text-lg text-neon-amber border-r border-cyber-border/40 bg-cyber-void/50">1</td>
                <td onclick="playLetterSound('einn', this)" class="p-4 border-r border-cyber-border/40 cursor-pointer hover:bg-neon-amber/10 transition-colors group">
                  <div class="font-bold text-white group-hover:text-neon-amber">einn</div>
                  <div class="text-xs text-neon-amber font-sans">[eitn]</div>
                  <div class="text-[11px] text-slate-400 mt-1 font-sans">einn kaffi (1 кава)</div>
                </td>
                <td onclick="playLetterSound('eina', this)" class="p-4 border-r border-cyber-border/40 cursor-pointer hover:bg-emerald-500/10 transition-colors group">
                  <div class="font-bold text-white group-hover:text-emerald-400">eina (ÞF) / ein (NF)</div>
                  <div class="text-xs text-emerald-400 font-sans">[eina] / [ein]</div>
                  <div class="text-[11px] text-slate-400 mt-1 font-sans">eina samloku (1 сендвіч)</div>
                </td>
                <td onclick="playLetterSound('eitt', this)" class="p-4 cursor-pointer hover:bg-neon-coral/10 transition-colors group">
                  <div class="font-bold text-white group-hover:text-neon-coral">eitt</div>
                  <div class="text-xs text-neon-coral font-sans">[eht]</div>
                  <div class="text-[11px] text-slate-400 mt-1 font-sans">eitt vatn (1 вода)</div>
                </td>
              </tr>

              <!-- Number 2 -->
              <tr class="hover:bg-cyber-void/40 transition-colors">
                <td class="p-4 font-black text-center text-lg text-neon-amber border-r border-cyber-border/40 bg-cyber-void/50">2</td>
                <td onclick="playLetterSound('tveir', this)" class="p-4 border-r border-cyber-border/40 cursor-pointer hover:bg-neon-amber/10 transition-colors group">
                  <div class="font-bold text-white group-hover:text-neon-amber">tveir</div>
                  <div class="text-xs text-neon-amber font-sans">[tveir]</div>
                  <div class="text-[11px] text-slate-400 mt-1 font-sans">tveir kaffar (2 кави)</div>
                </td>
                <td onclick="playLetterSound('tvær', this)" class="p-4 border-r border-cyber-border/40 cursor-pointer hover:bg-emerald-500/10 transition-colors group">
                  <div class="font-bold text-white group-hover:text-emerald-400">tvær</div>
                  <div class="text-xs text-emerald-400 font-sans">[tvair]</div>
                  <div class="text-[11px] text-slate-400 mt-1 font-sans">tvær samlokur (2 сендвічі)</div>
                </td>
                <td onclick="playLetterSound('tvö', this)" class="p-4 cursor-pointer hover:bg-neon-coral/10 transition-colors group">
                  <div class="font-bold text-white group-hover:text-neon-coral">tvö</div>
                  <div class="text-xs text-neon-coral font-sans">[tvö]</div>
                  <div class="text-[11px] text-slate-400 mt-1 font-sans">tvö vötn (2 води)</div>
                </td>
              </tr>

              <!-- Number 3 -->
              <tr class="hover:bg-cyber-void/40 transition-colors">
                <td class="p-4 font-black text-center text-lg text-neon-amber border-r border-cyber-border/40 bg-cyber-void/50">3</td>
                <td onclick="playLetterSound('þrír', this)" class="p-4 border-r border-cyber-border/40 cursor-pointer hover:bg-neon-amber/10 transition-colors group">
                  <div class="font-bold text-white group-hover:text-neon-amber">þrír</div>
                  <div class="text-xs text-neon-amber font-sans">[þrir]</div>
                  <div class="text-[11px] text-slate-400 mt-1 font-sans">þrír kaffar (3 кави)</div>
                </td>
                <td onclick="playLetterSound('þrjár', this)" class="p-4 border-r border-cyber-border/40 cursor-pointer hover:bg-emerald-500/10 transition-colors group">
                  <div class="font-bold text-white group-hover:text-emerald-400">þrjár</div>
                  <div class="text-xs text-emerald-400 font-sans">[þrjai-r]</div>
                  <div class="text-[11px] text-slate-400 mt-1 font-sans">þrjár samlokur (3 сендвічі)</div>
                </td>
                <td onclick="playLetterSound('þrjú', this)" class="p-4 cursor-pointer hover:bg-neon-coral/10 transition-colors group">
                  <div class="font-bold text-white group-hover:text-neon-coral">þrjú</div>
                  <div class="text-xs text-neon-coral font-sans">[þrju]</div>
                  <div class="text-[11px] text-slate-400 mt-1 font-sans">þrjú te (3 чаї)</div>
                </td>
              </tr>

              <!-- Number 4 -->
              <tr class="hover:bg-cyber-void/40 transition-colors">
                <td class="p-4 font-black text-center text-lg text-neon-amber border-r border-cyber-border/40 bg-cyber-void/50">4</td>
                <td onclick="playLetterSound('fjórir', this)" class="p-4 border-r border-cyber-border/40 cursor-pointer hover:bg-neon-amber/10 transition-colors group">
                  <div class="font-bold text-white group-hover:text-neon-amber">fjórir</div>
                  <div class="text-xs text-neon-amber font-sans">[fjorir]</div>
                  <div class="text-[11px] text-slate-400 mt-1 font-sans">fjórir kaffar (4 кави)</div>
                </td>
                <td onclick="playLetterSound('fjórar', this)" class="p-4 border-r border-cyber-border/40 cursor-pointer hover:bg-emerald-500/10 transition-colors group">
                  <div class="font-bold text-white group-hover:text-emerald-400">fjórar</div>
                  <div class="text-xs text-emerald-400 font-sans">[fjorar]</div>
                  <div class="text-[11px] text-slate-400 mt-1 font-sans">fjórar samlokur (4 сендвічі)</div>
                </td>
                <td onclick="playLetterSound('fjögur', this)" class="p-4 cursor-pointer hover:bg-neon-coral/10 transition-colors group">
                  <div class="font-bold text-white group-hover:text-neon-coral">fjögur</div>
                  <div class="text-xs text-neon-coral font-sans">[fjögur]</div>
                  <div class="text-[11px] text-slate-400 mt-1 font-sans">fjögur vötn (4 води)</div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <!-- 4. BLOCK 3: ÞOLFALL (ÞF 🟢 — ЗНАХІДНИЙ ВІДМІНОК ОБ'ЄКТА) -->
      <div class="space-y-6">
        <div>
          <div class="flex items-center gap-2.5 text-emerald-400 text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>Klasi 3 • Málfræðiregla</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🟢 3. Þolfall (ÞF — Знахідний відмінок прямого об'єкта)</span>
          </h3>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            Після дієслів отримання та володіння, таких як <strong class="text-white font-mono">að fá</strong> (отримувати / брати) та <strong class="text-white font-mono">að eiga</strong> (мати / володіти), прямий додаток <strong>ЗАВЖДИ</strong> ставиться у Знахідний відмінок (<span class="text-emerald-400 font-bold font-mono">Þolfall - ÞF</span>).
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <!-- Karlkyn Card -->
          <div class="p-6 rounded-2xl bg-cyber-deep/85 border border-neon-amber/40 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="px-2.5 py-0.5 rounded bg-neon-amber/20 border border-neon-amber/40 text-neon-amber font-mono text-xs font-bold">Karlkyn (kk.)</span>
                <span class="text-xs font-mono text-slate-400">-i ➔ -a</span>
              </div>
              <h4 class="text-base font-bold text-white mb-2">Чоловічий рід (слабкі іменники)</h4>
              <p class="text-xs text-slate-300 leading-relaxed font-sans mb-3">
                Слабкі іменники чоловічого роду на <strong>-i</strong> у знахідному відмінку (ÞF) змінюють закінчення на <strong>-a</strong>.
              </p>
              <div class="space-y-2 p-3 rounded-xl bg-cyber-void/80 border border-neon-amber/20 font-mono text-xs">
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">samloki (NF)</span>
                  <span class="text-neon-amber font-bold">&rarr; samloka (ÞF)</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">kökubiti (NF)</span>
                  <span class="text-neon-amber font-bold">&rarr; kökubita (ÞF)</span>
                </div>
              </div>
            </div>
            <div onclick="playLetterSound('Ég ætla að fá einn kökubita', this)" class="mt-4 pt-3 border-t border-cyber-border/30 text-xs font-mono text-neon-amber cursor-pointer hover:underline flex items-center justify-between">
              <span>🔊 Ég ætla að fá einn kökubita</span>
              <span>&rarr;</span>
            </div>
          </div>

          <!-- Kvenkyn Card -->
          <div class="p-6 rounded-2xl bg-cyber-deep/85 border border-emerald-500/40 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="px-2.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">Kvenkyn (kvk.)</span>
                <span class="text-xs font-mono text-slate-400">-a ➔ -u</span>
              </div>
              <h4 class="text-base font-bold text-white mb-2">Жіночий рід (слабкі іменники)</h4>
              <p class="text-xs text-slate-300 leading-relaxed font-sans mb-3">
                Слабкі іменники жіночого роду на <strong>-a</strong> у знахідному відмінку (ÞF) обов'язково переходять у закінчення <strong>-u</strong>.
              </p>
              <div class="space-y-2 p-3 rounded-xl bg-cyber-void/80 border border-emerald-500/20 font-mono text-xs">
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">samloka (NF)</span>
                  <span class="text-emerald-400 font-bold">&rarr; samloku (ÞF)</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">kaka (NF)</span>
                  <span class="text-emerald-400 font-bold">&rarr; köku (ÞF)</span>
                </div>
              </div>
            </div>
            <div onclick="playLetterSound('Ég ætla að fá eina samloku', this)" class="mt-4 pt-3 border-t border-cyber-border/30 text-xs font-mono text-emerald-400 cursor-pointer hover:underline flex items-center justify-between">
              <span>🔊 Ég ætla að fá eina samloku</span>
              <span>&rarr;</span>
            </div>
          </div>

          <!-- Hvorugkyn Card -->
          <div class="p-6 rounded-2xl bg-cyber-deep/85 border border-neon-coral/40 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="px-2.5 py-0.5 rounded bg-neon-coral/20 border border-neon-coral/40 text-neon-coral font-mono text-xs font-bold">Hvorugkyn (hk.)</span>
                <span class="text-xs font-mono text-slate-400">NF = ÞF</span>
              </div>
              <h4 class="text-base font-bold text-white mb-2">Середній рід (без змін)</h4>
              <p class="text-xs text-slate-300 leading-relaxed font-sans mb-3">
                Іменники середнього роду у знахідному відмінку однини повністю збігаються з формою називного відмінка (NF = ÞF).
              </p>
              <div class="space-y-2 p-3 rounded-xl bg-cyber-void/80 border border-neon-coral/20 font-mono text-xs">
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">vatn (NF)</span>
                  <span class="text-neon-coral font-bold">&rarr; vatn (ÞF) (без змін)</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">te (NF)</span>
                  <span class="text-neon-coral font-bold">&rarr; te (ÞF) (без змін)</span>
                </div>
              </div>
            </div>
            <div onclick="playLetterSound('Ég ætla að fá eitt vatn', this)" class="mt-4 pt-3 border-t border-cyber-border/30 text-xs font-mono text-neon-coral cursor-pointer hover:underline flex items-center justify-between">
              <span>🔊 Ég ætla að fá eitt vatn</span>
              <span>&rarr;</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
"""

# Check if #modull-1 is already present in html
if '<section id="modull-1"' in html:
    # Replace existing #modull-1
    pattern = r'<section id="modull-1".*?</section>'
    html = re.sub(pattern, module1_html.strip(), html, flags=re.DOTALL)
else:
    # Insert right before #roadmap
    target = '<!-- ========================================================================= -->\n  <!-- 5. ROADMAP:'
    if target in html:
        html = html.replace(target, module1_html + '\n  ' + target)
    else:
        # fallback: insert before <section id="roadmap"
        html = html.replace('<section id="roadmap"', module1_html + '\n  <section id="roadmap"')

# Also add playModule1Dialogue script if not present
dialogue_script = """    // Module 1 Dialogue Sequencer
    let isPlayingM1Dialogue = false;
    async function playModule1Dialogue() {
      if (isPlayingM1Dialogue) return;
      isPlayingM1Dialogue = true;
      const btn = document.getElementById('play-dialogue-m1-btn');
      if (btn) btn.innerHTML = `<span>⏳ Відтворення діалогу...</span>`;

      const lines = [
        { text: 'Góðan daginn! Hvað má bjóða þér?', id: 'm1-line-1' },
        { text: 'Góðan dag! Ég ætla að fá einn kaffi og eina samloku, takk.', id: 'm1-line-2' },
        { text: 'Eitthvað fleira?', id: 'm1-line-3' },
        { text: 'Nei, takk. Hvað kostar þetta?', id: 'm1-line-4' },
        { text: 'Það gerir 1500 krónur.', id: 'm1-line-5' },
        { text: 'Gjörðu svo vel!', id: 'm1-line-6' },
        { text: 'Takk kærlega!', id: 'm1-line-7' }
      ];

      for (let i = 0; i < lines.length; i++) {
        const el = document.getElementById(lines[i].id);
        playLetterSound(lines[i].text, el);
        await new Promise(r => setTimeout(r, 2800));
      }

      if (btn) btn.innerHTML = `<span>▶️ Слухати весь діалог (Þjónn & Gestur)</span>`;
      isPlayingM1Dialogue = false;
    }
"""

if 'playModule1Dialogue' not in html:
    html = html.replace('</script>\n</body>', dialogue_script + '\n  </script>\n</body>')

with open(index_path, "w", encoding="utf-8") as f:
    f.write(html)

with open(desktop_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Successfully injected Module 1 into index.html and synchronized with Desktop!")
