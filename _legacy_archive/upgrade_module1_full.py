import os
import re

index_path = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/index.html"
desktop_path = "/Users/volodymyrkatasonov/Desktop/Islenskukennsla_A1_B2.html"

with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

# Upgraded Section 1 HTML (Module 1)
modull1_replacement = """    <!-- ======================================================================= -->
    <!-- SECTION 3: MÓDÚLL 1 (KAFFIHÚSIÐ & ÞOLFALL ÞF) — INITIALLY HIDDEN         -->
    <!-- ======================================================================= -->
    <section id="modull-1" class="module-section hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" style="display:none;">
      
      <!-- 1. HERO SECTION & STUDIO MEDIA SLOT -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border relative overflow-hidden">
        <div class="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 max-w-4xl">
          <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
              <span>🇮🇸 MÓDÚLL 01</span> • <span>GRUNNSTIG A1.1</span> • <span>ÞOLFALL (ÞF) 🟢</span>
            </div>
            <span class="px-3 py-1 rounded-lg bg-cyber-deep border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
              Практичний рівень: A1.1
            </span>
          </div>
          <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <span>☕ Módúll 1 • Grunnstig A1.1: Í kaffihúsinu, Tölur 1–4 &amp; Þolfall ÞF 🟢</span>
          </h1>
          <p class="mt-3 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Замовлення в кав'ярні, узгодження чисел 1–4 за 3 родами та Знахідний відмінок об'єкта.
          </p>
        </div>

        <!-- Studio Media Slot Glowing Glass Card -->
        <div class="mt-8 p-6 rounded-2xl bg-cyber-deep/95 border border-emerald-500/40 shadow-2xl relative overflow-hidden">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyber-border/40">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xl text-emerald-400">
                🎧
              </div>
              <div>
                <h3 class="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2">
                  <span>Studio Audio Overview / Video Roleplay Embed Slot</span>
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <span class="text-xs text-slate-400 font-sans">24-bit 48kHz Master Track • Karl &amp; Guðrún Roleplay</span>
              </div>
            </div>
            <!-- Roleplay Mode Selector -->
            <div class="flex items-center gap-2">
              <button onclick="playStudioSample('all')" class="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all">
                🎭 Allt samtalið
              </button>
              <button onclick="playStudioSample('waiter')" class="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyber-void text-slate-300 border border-cyber-border/40 hover:text-white transition-all">
                👨‍🍳 Þjónn
              </button>
              <button onclick="playStudioSample('guest')" class="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyber-void text-slate-300 border border-cyber-border/40 hover:text-white transition-all">
                ☕ Gestur
              </button>
            </div>
          </div>

          <!-- Player Controls & Simulated Waveform -->
          <div class="mt-4 flex flex-col sm:flex-row items-center gap-4">
            <button id="studio-play-btn" onclick="toggleStudioPlay()" class="w-12 h-12 rounded-full btn-warm-3d flex items-center justify-center text-lg flex-shrink-0 shadow-lg">
              <span id="studio-play-icon">▶</span>
            </button>
            <div class="flex-grow w-full">
              <!-- Equalizer Waveform bars -->
              <div class="flex items-center justify-between gap-1 h-8 mb-2 px-1">
                <div class="w-1 bg-emerald-500/60 rounded-full h-3 animate-pulse"></div>
                <div class="w-1 bg-emerald-400 rounded-full h-6 animate-pulse" style="animation-delay: 150ms"></div>
                <div class="w-1 bg-neon-amber rounded-full h-4 animate-pulse" style="animation-delay: 300ms"></div>
                <div class="w-1 bg-neon-coral rounded-full h-7 animate-pulse" style="animation-delay: 75ms"></div>
                <div class="w-1 bg-emerald-400 rounded-full h-5 animate-pulse" style="animation-delay: 200ms"></div>
                <div class="w-1 bg-emerald-500/80 rounded-full h-8 animate-pulse" style="animation-delay: 250ms"></div>
                <div class="w-1 bg-neon-amber rounded-full h-4 animate-pulse" style="animation-delay: 100ms"></div>
                <div class="w-1 bg-emerald-400 rounded-full h-6 animate-pulse" style="animation-delay: 350ms"></div>
                <div class="w-1 bg-neon-coral rounded-full h-3 animate-pulse" style="animation-delay: 180ms"></div>
                <div class="w-1 bg-emerald-500 rounded-full h-7 animate-pulse" style="animation-delay: 220ms"></div>
              </div>
              <!-- Progress Bar -->
              <div class="w-full bg-cyber-void rounded-full h-2 overflow-hidden border border-cyber-border/40">
                <div id="studio-progress-bar" class="bg-gradient-to-r from-emerald-500 via-neon-amber to-neon-coral h-full w-1/3 transition-all"></div>
              </div>
            </div>
            <div class="flex items-center gap-3 text-xs font-mono text-slate-400 flex-shrink-0">
              <span id="studio-time-display">01:15 / 03:45</span>
              <span class="px-2 py-0.5 rounded bg-cyber-void border border-emerald-500/30 text-emerald-400 font-bold">0.80x</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. ACADEMIC BLOCK 1: Í KAFFIHÚSINU (ФРАЗОВИЙ КОНСТРУКТОР) -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-8">
        <div>
          <div class="flex items-center gap-2.5 text-neon-amber text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>Klasi 1 • Frasasmíði</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🍽️ 1. Í kaffihúsinu: Фразовий конструктор замовлення</span>
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            Універсальна модель замовлення в Ісландії: <strong class="text-neon-amber font-mono font-bold">„Ég ætla að fá... [Accusative Object], takk.“</strong> (Я буду / Я хотів би отримати...). Натисніть на картку, щоб прослухати звучання.
          </p>
        </div>

        <!-- 5 Interactive Menu Cards with Audio -->
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
            <div class="text-xs font-mono text-neon-coral mt-1">[Jeg ai-htla að fa einn kaffi]</div>
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
            <div class="text-xs font-mono text-neon-coral mt-1">[Jeg ai-htla að fa eina samloku]</div>
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
            <div class="text-xs font-mono text-neon-coral mt-1">[Jeg ai-htla að fa eitt vatn]</div>
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
            <div class="text-xs font-mono text-neon-coral mt-1">[Jeg ai-htla að fa eitt te]</div>
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
            <div class="text-xs font-mono text-neon-coral mt-1">[Jeg ai-htla að fa einn kökubita]</div>
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
              <h3 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                <span>☕ Ситуативний діалог: Замовлення та розрахунок у кав'ярні</span>
              </h3>
            </div>
            <button id="play-dialogue-m1-btn" onclick="playModule1Dialogue()" class="px-5 py-2.5 rounded-xl btn-warm-3d text-xs font-bold flex items-center gap-2 self-start sm:self-auto shadow-md">
              <span>▶️ Слухати весь діалог (Þjónn &amp; Gestur)</span>
            </button>
          </div>

          <div class="space-y-3.5 max-w-3xl mx-auto">
            <div id="m1-line-1" onclick="playLetterSound('Góðan daginn! Hvað má bjóða þér?', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
              <div class="w-10 h-10 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber flex items-center justify-center font-bold text-base flex-shrink-0">👨‍🍳</div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-neon-amber">Þjónn (Офіціант)</span>
                  <span class="text-xs font-mono text-neon-amber">🔊 0:02</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-neon-amber transition-colors font-mono">Góðan daginn! Hvað má bjóða þér?</p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans"><span class="font-mono text-neon-coral">[Gooðan dai-in! Hvað ma bjoða þer?]</span> • Доброго дня! Що вам запропонувати?</p>
              </div>
            </div>

            <div id="m1-line-2" onclick="playLetterSound('Góðan dag! Ég ætla að fá einn kaffi og eina samloku, takk.', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex items-start gap-3.5 group ml-3 sm:ml-6">
              <div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-base flex-shrink-0">☕</div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-emerald-400">Gestur (Гість)</span>
                  <span class="text-xs font-mono text-emerald-400">🔊 0:04</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-emerald-400 transition-colors font-mono">Góðan dag! Ég ætla að fá einn kaffi og eina samloku, takk.</p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans"><span class="font-mono text-neon-coral">[Gooðan dag! Jeg ai-htla að fa einn kaffi og eina samloku, ta-hk.]</span> • Доброго дня! Я буду одну каву та один сендвіч, дякую.</p>
              </div>
            </div>

            <div id="m1-line-3" onclick="playLetterSound('Eitthvað fleira?', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
              <div class="w-10 h-10 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber flex items-center justify-center font-bold text-base flex-shrink-0">👨‍🍳</div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-neon-amber">Þjónn (Офіціант)</span>
                  <span class="text-xs font-mono text-neon-amber">🔊 0:01</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-neon-amber transition-colors font-mono">Eitthvað fleira?</p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans"><span class="font-mono text-neon-coral">[Eit-hvað fleira?]</span> • Щось ще?</p>
              </div>
            </div>

            <div id="m1-line-4" onclick="playLetterSound('Nei, takk. Hvað kostar þetta?', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex items-start gap-3.5 group ml-3 sm:ml-6">
              <div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-base flex-shrink-0">☕</div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-emerald-400">Gestur (Гість)</span>
                  <span class="text-xs font-mono text-emerald-400">🔊 0:02</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-emerald-400 transition-colors font-mono">Nei, takk. Hvað kostar þetta?</p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans"><span class="font-mono text-neon-coral">[Nei, ta-hk. Hvað kostar þetta?]</span> • Ні, дякую. Скільки це коштує?</p>
              </div>
            </div>

            <div id="m1-line-5" onclick="playLetterSound('Það gerir 1500 krónur.', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
              <div class="w-10 h-10 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber flex items-center justify-center font-bold text-base flex-shrink-0">👨‍🍳</div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-neon-amber">Þjónn (Офіціант)</span>
                  <span class="text-xs font-mono text-neon-amber">🔊 0:02</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-neon-amber transition-colors font-mono">Það gerir 1500 krónur.</p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans"><span class="font-mono text-neon-coral">[Það gerir 1500 kronur.]</span> • З вас 1500 крон.</p>
              </div>
            </div>

            <div id="m1-line-6" onclick="playLetterSound('Gjörðu svo vel!', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex items-start gap-3.5 group ml-3 sm:ml-6">
              <div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-base flex-shrink-0">☕</div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-emerald-400">Gestur (Гість)</span>
                  <span class="text-xs font-mono text-emerald-400">🔊 0:01</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-emerald-400 transition-colors font-mono">Gjörðu svo vel!</p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans"><span class="font-mono text-neon-coral">[Gjörðu svo vel!]</span> • Прошу! / Тримайте!</p>
              </div>
            </div>

            <div id="m1-line-7" onclick="playLetterSound('Takk kærlega!', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
              <div class="w-10 h-10 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber flex items-center justify-center font-bold text-base flex-shrink-0">👨‍🍳</div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-neon-amber">Þjónn (Офіціант)</span>
                  <span class="text-xs font-mono text-neon-amber">🔊 0:01</span>
                </div>
                <p class="text-base font-bold text-white mt-0.5 group-hover:text-neon-amber transition-colors font-mono">Takk kærlega!</p>
                <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans"><span class="font-mono text-neon-coral">[Ta-hk kaerlega!]</span> • Щиро дякую!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. ACADEMIC BLOCK 2: TÖLUR 1–4 MEÐ KYNJUM (МАТРИЦЯ 3 РОДІВ) -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-6">
        <div>
          <div class="flex items-center gap-2.5 text-neon-coral text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>Klasi 2 • Beygingartöflur</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🔢 2. Tölur 1–4 með kynjum: Матриця узгодження за 3 родами</span>
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            В ісландській мові числівники <strong>від 1 до 4</strong> обов'язково узгоджуються в роді з іменником, який вони рахують. Натисніть на будь-яку комірку матриці для озвучення.
          </p>
        </div>

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
              <!-- 1 -->
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
              <!-- 2 -->
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
              <!-- 3 -->
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
              <!-- 4 -->
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

      <!-- 4. ACADEMIC BLOCK 3: ÞOLFALL (ÞF 🟢 — ЗНАХІДНИЙ ВІДМІНОК) -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-6">
        <div>
          <div class="flex items-center gap-2.5 text-emerald-400 text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>Klasi 3 • Málfræðiregla</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🟢 3. Þolfall (ÞF — Знахідний відмінок прямого об'єкта)</span>
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            Після дієслів отримання, купівлі та володіння, таких як <strong class="text-white font-mono">að fá</strong> (отримувати / брати), <strong class="text-white font-mono">að eiga</strong> (мати / володіти) та <strong class="text-white font-mono">að kaupa</strong> (купувати), прямий додаток <strong>ЗАВЖДИ</strong> ставиться у Знахідний відмінок (<span class="text-emerald-400 font-bold font-mono">Þolfall - ÞF</span>).
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- kk -->
          <div class="p-6 rounded-2xl bg-cyber-deep/85 border border-neon-amber/40 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="px-2.5 py-0.5 rounded bg-neon-amber/20 border border-neon-amber/40 text-neon-amber font-mono text-xs font-bold">Karlkyn (kk.)</span>
                <span class="text-xs font-mono text-slate-400">-i ➔ -a</span>
              </div>
              <h3 class="text-base font-bold text-white mb-2">Чоловічий рід (слабкі іменники)</h3>
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

          <!-- kvk -->
          <div class="p-6 rounded-2xl bg-cyber-deep/85 border border-emerald-500/40 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="px-2.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">Kvenkyn (kvk.)</span>
                <span class="text-xs font-mono text-slate-400">-a ➔ -u</span>
              </div>
              <h3 class="text-base font-bold text-white mb-2">Жіночий рід (слабкі іменники)</h3>
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

          <!-- hk -->
          <div class="p-6 rounded-2xl bg-cyber-deep/85 border border-neon-coral/40 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="px-2.5 py-0.5 rounded bg-neon-coral/20 border border-neon-coral/40 text-neon-coral font-mono text-xs font-bold">Hvorugkyn (hk.)</span>
                <span class="text-xs font-mono text-slate-400">NF = ÞF</span>
              </div>
              <h3 class="text-base font-bold text-white mb-2">Середній рід (без змін)</h3>
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

      <!-- 5. GAMIFIED TRAINER SUITE (4 INTERACTIVE JS MINI-GAMES) -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-10">
        <div>
          <div class="flex items-center gap-2.5 text-emerald-400 text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>Leikjasvæði • Gagnvirkir leikir</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <span>🎮 5. Гейміфікований тренажерний комплекс (4 інтерактивні міні-гри)</span>
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            Закріпіть знання на практиці: збирайте замовлення, узгоджуйте числівники з родами, перетворюйте закінчення у знахідний відмінок та будуйте репліки на швидкість!
          </p>
        </div>

        <!-- ========================================== -->
        <!-- GAME 1: Café Order Simulator               -->
        <!-- ========================================== -->
        <div class="p-6 rounded-2xl bg-cyber-deep/90 border border-emerald-500/40 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyber-border/40">
            <div>
              <span class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Leikur 1</span>
              <h3 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                <span>☕ Café Order Simulator (Симулятор замовлення в кав'ярні)</span>
              </h3>
              <p class="text-xs text-slate-300 mt-0.5 font-sans">
                Оберіть позиції меню та кількість. Тренажер автоматично побудує правильну фразу у знахідному відмінку (ÞF).
              </p>
            </div>
            <div class="flex items-center gap-3 self-start sm:self-auto">
              <span class="text-xs font-mono text-slate-400">Рахунок:</span>
              <span id="game1-score" class="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-sm font-bold">0 XP</span>
            </div>
          </div>

          <!-- Menu Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <!-- Menu item 1 -->
            <div class="p-3.5 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex items-center justify-between">
              <div>
                <div class="text-sm font-bold text-white font-mono">Kaffi (kk.)</div>
                <div class="text-xs text-slate-400">450 kr.</div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="changeSimQty('kaffi', -1)" class="w-7 h-7 rounded-lg bg-cyber-deep border border-cyber-border/40 text-white font-bold hover:border-emerald-400">-</button>
                <span id="sim-qty-kaffi" class="w-5 text-center font-mono font-bold text-emerald-400 text-sm">0</span>
                <button onclick="changeSimQty('kaffi', 1)" class="w-7 h-7 rounded-lg bg-cyber-deep border border-cyber-border/40 text-white font-bold hover:border-emerald-400">+</button>
              </div>
            </div>

            <!-- Menu item 2 -->
            <div class="p-3.5 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex items-center justify-between">
              <div>
                <div class="text-sm font-bold text-white font-mono">Samloka (kvk.)</div>
                <div class="text-xs text-slate-400">850 kr.</div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="changeSimQty('samloka', -1)" class="w-7 h-7 rounded-lg bg-cyber-deep border border-cyber-border/40 text-white font-bold hover:border-emerald-400">-</button>
                <span id="sim-qty-samloka" class="w-5 text-center font-mono font-bold text-emerald-400 text-sm">0</span>
                <button onclick="changeSimQty('samloka', 1)" class="w-7 h-7 rounded-lg bg-cyber-deep border border-cyber-border/40 text-white font-bold hover:border-emerald-400">+</button>
              </div>
            </div>

            <!-- Menu item 3 -->
            <div class="p-3.5 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex items-center justify-between">
              <div>
                <div class="text-sm font-bold text-white font-mono">Vatn (hk.)</div>
                <div class="text-xs text-slate-400">200 kr.</div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="changeSimQty('vatn', -1)" class="w-7 h-7 rounded-lg bg-cyber-deep border border-cyber-border/40 text-white font-bold hover:border-emerald-400">-</button>
                <span id="sim-qty-vatn" class="w-5 text-center font-mono font-bold text-emerald-400 text-sm">0</span>
                <button onclick="changeSimQty('vatn', 1)" class="w-7 h-7 rounded-lg bg-cyber-deep border border-cyber-border/40 text-white font-bold hover:border-emerald-400">+</button>
              </div>
            </div>

            <!-- Menu item 4 -->
            <div class="p-3.5 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex items-center justify-between">
              <div>
                <div class="text-sm font-bold text-white font-mono">Te (hk.)</div>
                <div class="text-xs text-slate-400">350 kr.</div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="changeSimQty('te', -1)" class="w-7 h-7 rounded-lg bg-cyber-deep border border-cyber-border/40 text-white font-bold hover:border-emerald-400">-</button>
                <span id="sim-qty-te" class="w-5 text-center font-mono font-bold text-emerald-400 text-sm">0</span>
                <button onclick="changeSimQty('te', 1)" class="w-7 h-7 rounded-lg bg-cyber-deep border border-cyber-border/40 text-white font-bold hover:border-emerald-400">+</button>
              </div>
            </div>

            <!-- Menu item 5 -->
            <div class="p-3.5 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex items-center justify-between sm:col-span-2 lg:col-span-2">
              <div>
                <div class="text-sm font-bold text-white font-mono">Kökubiti (kk.)</div>
                <div class="text-xs text-slate-400">650 kr.</div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="changeSimQty('kökubiti', -1)" class="w-7 h-7 rounded-lg bg-cyber-deep border border-cyber-border/40 text-white font-bold hover:border-emerald-400">-</button>
                <span id="sim-qty-kökubiti" class="w-5 text-center font-mono font-bold text-emerald-400 text-sm">0</span>
                <button onclick="changeSimQty('kökubiti', 1)" class="w-7 h-7 rounded-lg bg-cyber-deep border border-cyber-border/40 text-white font-bold hover:border-emerald-400">+</button>
              </div>
            </div>
          </div>

          <!-- Dynamic Live Receipt & Sentence Generator -->
          <div class="p-4 rounded-xl bg-cyber-void border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="w-full md:w-auto">
              <span class="text-[11px] font-mono text-slate-400 uppercase block">Побудована ісландська фраза:</span>
              <div id="sim-generated-phrase" class="text-base sm:text-lg font-bold text-emerald-400 font-mono mt-0.5">
                Ég ætla að fá... (Оберіть страви)
              </div>
              <div id="sim-receipt-sum" class="text-xs font-mono text-slate-300 mt-1">
                Разом до сплати: 0 krónur
              </div>
            </div>
            <button onclick="submitSimulatorOrder()" class="px-5 py-2.5 rounded-xl btn-warm-3d text-xs font-bold whitespace-nowrap shadow-lg">
              <span>🧾 Замовити та озвучити</span>
            </button>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- GAME 2: Gender Agreement Matcher 1–4       -->
        <!-- ========================================== -->
        <div class="p-6 rounded-2xl bg-cyber-deep/90 border border-neon-amber/40 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyber-border/40">
            <div>
              <span class="text-xs font-mono font-bold text-neon-amber uppercase tracking-widest">Leikur 2</span>
              <h3 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                <span>🔢 Gender Agreement Matcher 1–4 (Узгодження роду чисел)</span>
              </h3>
              <p class="text-xs text-slate-300 mt-0.5 font-sans">
                Оберіть правильну форму числівника відповідно до граматичного роду іменника.
              </p>
            </div>
            <div class="flex items-center gap-3 self-start sm:self-auto">
              <span class="text-xs font-mono text-slate-400">Правильно:</span>
              <span id="matcher-score-badge" class="px-3 py-1 rounded-lg bg-neon-amber/20 border border-neon-amber/40 text-neon-amber font-mono text-sm font-bold">0 / 4</span>
            </div>
          </div>

          <!-- Question Cards Container -->
          <div id="matcher-quiz-container" class="space-y-4">
            <!-- Q1 -->
            <div class="p-4 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span class="text-xs font-mono text-slate-400">1. Замовлення 3 чашок кави:</span>
                <div class="text-base font-bold text-white font-mono mt-0.5">
                  „Ég ætla að fá <span id="q1-blank" class="text-neon-amber underline decoration-wavy">______</span> kaffi.“ (kk. ч.р.)
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="checkMatcher(1, 'þrír', this)" class="matcher-btn-1 px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber text-xs font-mono text-white">þrír</button>
                <button onclick="checkMatcher(1, 'þrjár', this)" class="matcher-btn-1 px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber text-xs font-mono text-white">þrjár</button>
                <button onclick="checkMatcher(1, 'þrjú', this)" class="matcher-btn-1 px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber text-xs font-mono text-white">þrjú</button>
              </div>
            </div>

            <!-- Q2 -->
            <div class="p-4 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span class="text-xs font-mono text-slate-400">2. Замовлення 2 сендвічів:</span>
                <div class="text-base font-bold text-white font-mono mt-0.5">
                  „Ég ætla að fá <span id="q2-blank" class="text-neon-amber underline decoration-wavy">______</span> samlokur.“ (kvk. ж.р.)
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="checkMatcher(2, 'tveir', this)" class="matcher-btn-2 px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber text-xs font-mono text-white">tveir</button>
                <button onclick="checkMatcher(2, 'tvær', this)" class="matcher-btn-2 px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber text-xs font-mono text-white">tvær</button>
                <button onclick="checkMatcher(2, 'tvö', this)" class="matcher-btn-2 px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber text-xs font-mono text-white">tvö</button>
              </div>
            </div>

            <!-- Q3 -->
            <div class="p-4 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span class="text-xs font-mono text-slate-400">3. Замовлення 1 склянки води:</span>
                <div class="text-base font-bold text-white font-mono mt-0.5">
                  „Ég ætla að fá <span id="q3-blank" class="text-neon-amber underline decoration-wavy">______</span> vatn.“ (hk. с.р.)
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="checkMatcher(3, 'einn', this)" class="matcher-btn-3 px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber text-xs font-mono text-white">einn</button>
                <button onclick="checkMatcher(3, 'eina', this)" class="matcher-btn-3 px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber text-xs font-mono text-white">eina</button>
                <button onclick="checkMatcher(3, 'eitt', this)" class="matcher-btn-3 px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber text-xs font-mono text-white">eitt</button>
              </div>
            </div>

            <!-- Q4 -->
            <div class="p-4 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span class="text-xs font-mono text-slate-400">4. Замовлення 4 порцій шматочків торта:</span>
                <div class="text-base font-bold text-white font-mono mt-0.5">
                  „Ég ætla að fá <span id="q4-blank" class="text-neon-amber underline decoration-wavy">______</span> kökubita.“ (kk. ч.р.)
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="checkMatcher(4, 'fjórir', this)" class="matcher-btn-4 px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber text-xs font-mono text-white">fjórir</button>
                <button onclick="checkMatcher(4, 'fjórar', this)" class="matcher-btn-4 px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber text-xs font-mono text-white">fjórar</button>
                <button onclick="checkMatcher(4, 'fjögur', this)" class="matcher-btn-4 px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber text-xs font-mono text-white">fjögur</button>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- GAME 3: ÞF Flexion Transformer             -->
        <!-- ========================================== -->
        <div class="p-6 rounded-2xl bg-cyber-deep/90 border border-neon-coral/40 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyber-border/40">
            <div>
              <span class="text-xs font-mono font-bold text-neon-coral uppercase tracking-widest">Leikur 3</span>
              <h3 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                <span>🔄 ÞF Flexion Transformer (Трансформатор закінчень у Знахідний відмінок)</span>
              </h3>
              <p class="text-xs text-slate-300 mt-0.5 font-sans">
                Натисніть на картку, щоб активувати граматичну мутацію з Називного відмінка (NF) у Знахідний (ÞF) з підсвічуванням флексій.
              </p>
            </div>
            <button onclick="resetAllTransformers()" class="px-3 py-1.5 rounded-lg bg-cyber-void border border-neon-coral/40 text-xs font-mono text-neon-coral hover:bg-neon-coral/10">
              Скинути стан
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Card 1: samloka -->
            <div id="trans-card-1" onclick="toggleFlexion(1)" class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Kvenkyn (kvk.)</span>
                <span id="trans-badge-1" class="px-2 py-0.5 rounded bg-bin-nf/20 text-bin-nf font-bold">NF</span>
              </div>
              <div class="my-3 text-center">
                <span id="trans-root-1" class="text-xl font-bold font-mono text-white">samlok</span><span id="trans-flex-1" class="text-xl font-bold font-mono text-neon-coral">a</span>
              </div>
              <div class="text-[11px] text-slate-400 text-center font-sans">
                Клацніть для перетворення (-a &rarr; -u)
              </div>
            </div>

            <!-- Card 2: kökubiti -->
            <div id="trans-card-2" onclick="toggleFlexion(2)" class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Karlkyn (kk.)</span>
                <span id="trans-badge-2" class="px-2 py-0.5 rounded bg-bin-nf/20 text-bin-nf font-bold">NF</span>
              </div>
              <div class="my-3 text-center">
                <span id="trans-root-2" class="text-xl font-bold font-mono text-white">kökubit</span><span id="trans-flex-2" class="text-xl font-bold font-mono text-neon-amber">i</span>
              </div>
              <div class="text-[11px] text-slate-400 text-center font-sans">
                Клацніть для перетворення (-i &rarr; -a)
              </div>
            </div>

            <!-- Card 3: kaka -->
            <div id="trans-card-3" onclick="toggleFlexion(3)" class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Kvenkyn (kvk.)</span>
                <span id="trans-badge-3" class="px-2 py-0.5 rounded bg-bin-nf/20 text-bin-nf font-bold">NF</span>
              </div>
              <div class="my-3 text-center">
                <span id="trans-root-3" class="text-xl font-bold font-mono text-white">kak</span><span id="trans-flex-3" class="text-xl font-bold font-mono text-neon-coral">a</span>
              </div>
              <div class="text-[11px] text-slate-400 text-center font-sans">
                Клацніть для перетворення (a &rarr; u-умлаут)
              </div>
            </div>

            <!-- Card 4: vatn -->
            <div id="trans-card-4" onclick="toggleFlexion(4)" class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 hover:border-neon-coral cursor-pointer transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Hvorugkyn (hk.)</span>
                <span id="trans-badge-4" class="px-2 py-0.5 rounded bg-bin-nf/20 text-bin-nf font-bold">NF</span>
              </div>
              <div class="my-3 text-center">
                <span id="trans-root-4" class="text-xl font-bold font-mono text-white">vatn</span><span id="trans-flex-4" class="text-xl font-bold font-mono text-slate-400"></span>
              </div>
              <div class="text-[11px] text-slate-400 text-center font-sans">
                Клацніть для перевірки (NF = ÞF без змін)
              </div>
            </div>

            <!-- Card 5: samloki -->
            <div id="trans-card-5" onclick="toggleFlexion(5)" class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-2">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Karlkyn (kk.)</span>
                <span id="trans-badge-5" class="px-2 py-0.5 rounded bg-bin-nf/20 text-bin-nf font-bold">NF</span>
              </div>
              <div class="my-3 text-center">
                <span id="trans-root-5" class="text-xl font-bold font-mono text-white">samlok</span><span id="trans-flex-5" class="text-xl font-bold font-mono text-neon-amber">i</span>
              </div>
              <div class="text-[11px] text-slate-400 text-center font-sans">
                Клацніть для перетворення (-i &rarr; -a)
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- GAME 4: Speed Dialogue Builder             -->
        <!-- ========================================== -->
        <div class="p-6 rounded-2xl bg-cyber-deep/90 border border-neon-rose/40 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyber-border/40">
            <div>
              <span class="text-xs font-mono font-bold text-neon-rose uppercase tracking-widest">Leikur 4</span>
              <h3 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                <span>⚡ Speed Dialogue Builder (Конструктор реплік замовлення)</span>
              </h3>
              <p class="text-xs text-slate-300 mt-0.5 font-sans">
                Офіціант запитує: <strong class="text-neon-amber">„Hvað má bjóða þér?“</strong>. Складіть правильну відповідь, клікаючи на перемішані слова у правильному порядку.
              </p>
            </div>
            <button onclick="resetDialogueBuilder()" class="px-3 py-1.5 rounded-lg bg-cyber-void border border-neon-rose/40 text-xs font-mono text-neon-rose hover:bg-neon-rose/10">
              Перемішати знову
            </button>
          </div>

          <!-- Answer Drop Zone -->
          <div class="p-4 rounded-xl bg-cyber-void border-2 border-dashed border-neon-rose/40 min-h-[60px] flex flex-wrap items-center gap-2">
            <span id="builder-placeholder-text" class="text-xs text-slate-500 font-mono">Натискайте на слова нижче для складання репліки...</span>
            <div id="builder-selected-tokens" class="flex flex-wrap items-center gap-2"></div>
          </div>

          <!-- Token pool -->
          <div>
            <span class="text-xs font-mono text-slate-400 block mb-2">Доступні слова:</span>
            <div id="builder-tokens-pool" class="flex flex-wrap items-center gap-2">
              <!-- Tokens dynamically inserted by JS -->
            </div>
          </div>

          <!-- Action and Feedback -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div id="builder-feedback-msg" class="text-xs font-mono font-bold text-slate-400">
              Очікування вибору слів...
            </div>
            <div class="flex items-center gap-3">
              <button onclick="checkDialogueBuilder()" class="px-5 py-2.5 rounded-xl btn-warm-3d text-xs font-bold shadow-lg">
                <span>✓ Перевірити відповідь</span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </section>
"""

# Replace Section 1 in html
pattern = r'<!-- ======================================================================= -->\s*<!-- SECTION 3: MÓDÚLL 1 \(KAFFIHÚSIÐ & ÞOLFALL ÞF\).*?</section>'
match = re.search(pattern, html, flags=re.DOTALL)
if match:
    html = html[:match.start()] + modull1_replacement.strip() + html[match.end():]
else:
    print("WARNING: Section 1 regex match not found directly, using fallback replacement!")
    # Fallback to id replacement
    sec_start = html.find('<section id="modull-1"')
    sec_end = html.find('</section>', sec_start) + len('</section>')
    html = html[:sec_start] + modull1_replacement.strip() + html[sec_end:]

# Now append/integrate JS functions for Game 1, 2, 3, 4 and Studio Audio Player into script
games_js = """
    /* =========================================================================
       6. MODULE 1 STUDIO MEDIA & GAMIFIED TRAINER SUITE LOGIC
       ========================================================================= */

    // Studio Player Simulated logic
    let isStudioPlaying = false;
    function toggleStudioPlay() {
      const btn = document.getElementById('studio-play-icon');
      const bar = document.getElementById('studio-progress-bar');
      const timeDisplay = document.getElementById('studio-time-display');

      if (!isStudioPlaying) {
        isStudioPlaying = true;
        if (btn) btn.innerText = '⏸';
        if (bar) bar.style.width = '75%';
        if (timeDisplay) timeDisplay.innerText = '02:48 / 03:45';
        playLetterSound('Góðan daginn! Hvað má bjóða þér? Góðan dag! Ég ætla að fá einn kaffi og eina samloku, takk.');
      } else {
        isStudioPlaying = false;
        if (btn) btn.innerText = '▶';
        if (bar) bar.style.width = '33%';
        if (timeDisplay) timeDisplay.innerText = '01:15 / 03:45';
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      }
    }

    function playStudioSample(role) {
      if (role === 'waiter') {
        playLetterSound('Góðan daginn! Hvað má bjóða þér? Eitthvað fleira? Það gerir 1500 krónur. Takk kærlega!');
      } else if (role === 'guest') {
        playLetterSound('Góðan dag! Ég ætla að fá einn kaffi og eina samloku, takk. Nei, takk. Hvað kostar þetta? Gjörðu svo vel!');
      } else {
        playModule1Dialogue();
      }
    }

    // GAME 1: Café Order Simulator
    const simState = {
      kaffi: 0,
      samloka: 0,
      vatn: 0,
      te: 0,
      kökubiti: 0
    };

    const simPrices = {
      kaffi: 450,
      samloka: 850,
      vatn: 200,
      te: 350,
      kökubiti: 650
    };

    let simScore = 0;

    function changeSimQty(item, delta) {
      simState[item] = Math.max(0, simState[item] + delta);
      const el = document.getElementById('sim-qty-' + item);
      if (el) el.innerText = simState[item];
      updateSimulatorReceipt();
    }

    function updateSimulatorReceipt() {
      let total = 0;
      let phraseParts = [];

      // Accusative forms mapping for quantities 1 and plural
      if (simState.kaffi > 0) {
        total += simState.kaffi * simPrices.kaffi;
        phraseParts.push(simState.kaffi === 1 ? 'einn kaffi' : simState.kaffi + ' kaffa');
      }
      if (simState.samloka > 0) {
        total += simState.samloka * simPrices.samloka;
        phraseParts.push(simState.samloka === 1 ? 'eina samloku' : simState.samloka + ' samlokur');
      }
      if (simState.vatn > 0) {
        total += simState.vatn * simPrices.vatn;
        phraseParts.push(simState.vatn === 1 ? 'eitt vatn' : simState.vatn + ' vötn');
      }
      if (simState.te > 0) {
        total += simState.te * simPrices.te;
        phraseParts.push(simState.te === 1 ? 'eitt te' : simState.te + ' te');
      }
      if (simState.kökubiti > 0) {
        total += simState.kökubiti * simPrices.kökubiti;
        phraseParts.push(simState.kökubiti === 1 ? 'einn kökubita' : simState.kökubiti + ' kökubita');
      }

      const phraseEl = document.getElementById('sim-generated-phrase');
      const sumEl = document.getElementById('sim-receipt-sum');

      if (phraseParts.length === 0) {
        if (phraseEl) phraseEl.innerText = 'Ég ætla að fá... (Оберіть страви)';
        if (sumEl) sumEl.innerText = 'Разом до сплати: 0 krónur';
      } else {
        const fullSentence = 'Ég ætla að fá ' + phraseParts.join(' og ') + ', takk.';
        if (phraseEl) phraseEl.innerText = fullSentence;
        if (sumEl) sumEl.innerText = 'Разом до сплати: ' + total + ' krónur';
      }
    }

    function submitSimulatorOrder() {
      const phraseEl = document.getElementById('sim-generated-phrase');
      if (!phraseEl || phraseEl.innerText.includes('(Оберіть страви)')) {
        alert('Будь ласка, оберіть хоча б одну позицію у симуляторі!');
        return;
      }
      simScore += 25;
      const scoreBadge = document.getElementById('game1-score');
      if (scoreBadge) scoreBadge.innerText = simScore + ' XP';
      playLetterSound(phraseEl.innerText);
    }

    // GAME 2: Gender Agreement Matcher 1-4
    let matcherCorrectCount = 0;
    const matcherAnswers = {
      1: 'þrír',
      2: 'tvær',
      3: 'eitt',
      4: 'fjórir'
    };

    function checkMatcher(qNum, selectedVal, btn) {
      const isCorrect = matcherAnswers[qNum] === selectedVal;
      const blankEl = document.getElementById('q' + qNum + '-blank');

      document.querySelectorAll('.matcher-btn-' + qNum).forEach(b => {
        b.classList.remove('bg-emerald-500/40', 'border-emerald-400', 'bg-rose-500/40', 'border-rose-400');
      });

      if (isCorrect) {
        btn.classList.add('bg-emerald-500/40', 'border-emerald-400');
        if (blankEl) {
          blankEl.innerText = selectedVal;
          blankEl.classList.remove('text-neon-amber', 'text-rose-400');
          blankEl.classList.add('text-emerald-400');
        }
        matcherCorrectCount = Math.min(4, matcherCorrectCount + 1);
        playLetterSound(selectedVal);
      } else {
        btn.classList.add('bg-rose-500/40', 'border-rose-400');
        if (blankEl) {
          blankEl.innerText = selectedVal;
          blankEl.classList.remove('text-neon-amber', 'text-emerald-400');
          blankEl.classList.add('text-rose-400');
        }
      }

      const scoreEl = document.getElementById('matcher-score-badge');
      if (scoreEl) scoreEl.innerText = matcherCorrectCount + ' / 4';
    }

    // GAME 3: ÞF Flexion Transformer
    const flexionData = {
      1: { nfRoot: 'samlok', nfFlex: 'a', pfRoot: 'samlok', pfFlex: 'u', gender: 'kvk.' },
      2: { nfRoot: 'kökubit', nfFlex: 'i', pfRoot: 'kökubit', pfFlex: 'a', gender: 'kk.' },
      3: { nfRoot: 'kak', nfFlex: 'a', pfRoot: 'kök', pfFlex: 'u', gender: 'kvk.' },
      4: { nfRoot: 'vatn', nfFlex: '', pfRoot: 'vatn', pfFlex: ' (NF = ÞF)', gender: 'hk.' },
      5: { nfRoot: 'samlok', nfFlex: 'i', pfRoot: 'samlok', pfFlex: 'a', gender: 'kk.' }
    };
    const flexionState = { 1: false, 2: false, 3: false, 4: false, 5: false };

    function toggleFlexion(cardId) {
      flexionState[cardId] = !flexionState[cardId];
      const isPF = flexionState[cardId];
      const data = flexionData[cardId];

      const badge = document.getElementById('trans-badge-' + cardId);
      const root = document.getElementById('trans-root-' + cardId);
      const flex = document.getElementById('trans-flex-' + cardId);
      const card = document.getElementById('trans-card-' + cardId);

      if (isPF) {
        if (badge) {
          badge.innerText = 'ÞF 🟢';
          badge.className = 'px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold';
        }
        if (root) root.innerText = data.pfRoot;
        if (flex) {
          flex.innerText = data.pfFlex;
          flex.className = 'text-xl font-bold font-mono text-emerald-400 underline';
        }
        if (card) card.classList.add('border-emerald-400', 'bg-emerald-500/10');
        playLetterSound(data.pfRoot + (data.pfFlex.includes(' ') ? '' : data.pfFlex));
      } else {
        if (badge) {
          badge.innerText = 'NF';
          badge.className = 'px-2 py-0.5 rounded bg-bin-nf/20 text-bin-nf font-bold';
        }
        if (root) root.innerText = data.nfRoot;
        if (flex) {
          flex.innerText = data.nfFlex;
          flex.className = 'text-xl font-bold font-mono text-neon-amber';
        }
        if (card) card.classList.remove('border-emerald-400', 'bg-emerald-500/10');
      }
    }

    function resetAllTransformers() {
      for (let i = 1; i <= 5; i++) {
        flexionState[i] = true;
        toggleFlexion(i);
      }
    }

    // GAME 4: Speed Dialogue Builder
    const targetDialogue = ['Ég', 'ætla', 'að', 'fá', 'einn', 'kaffi,', 'takk.'];
    let currentSelectedTokens = [];
    let poolTokens = ['fá', 'Ég', 'takk.', 'einn', 'að', 'kaffi,', 'ætla'];

    function initDialogueBuilder() {
      const poolEl = document.getElementById('builder-tokens-pool');
      const selectedEl = document.getElementById('builder-selected-tokens');
      const placeholder = document.getElementById('builder-placeholder-text');
      const feedback = document.getElementById('builder-feedback-msg');

      if (!poolEl || !selectedEl) return;
      currentSelectedTokens = [];
      selectedEl.innerHTML = '';
      if (placeholder) placeholder.style.display = 'inline';
      if (feedback) {
        feedback.innerText = 'Очікування вибору слів...';
        feedback.className = 'text-xs font-mono font-bold text-slate-400';
      }

      poolTokens = ['fá', 'Ég', 'takk.', 'einn', 'að', 'kaffi,', 'ætla'].sort(() => Math.random() - 0.5);
      poolEl.innerHTML = '';
      poolTokens.forEach((tok, idx) => {
        const b = document.createElement('button');
        b.id = 'token-' + idx;
        b.innerText = tok;
        b.className = 'px-3 py-1.5 rounded-lg bg-cyber-void border border-neon-rose/40 hover:border-neon-rose text-xs font-mono text-white transition-all';
        b.onclick = () => selectBuilderToken(tok, idx);
        poolEl.appendChild(b);
      });
    }

    function selectBuilderToken(tok, idx) {
      currentSelectedTokens.push(tok);
      const b = document.getElementById('token-' + idx);
      if (b) b.style.display = 'none';

      const placeholder = document.getElementById('builder-placeholder-text');
      if (placeholder) placeholder.style.display = 'none';

      const selectedEl = document.getElementById('builder-selected-tokens');
      if (selectedEl) {
        const chip = document.createElement('button');
        chip.innerText = tok;
        chip.className = 'px-3 py-1 rounded-lg bg-neon-rose/20 border border-neon-rose text-xs font-mono text-neon-rose font-bold flex items-center gap-1';
        chip.onclick = () => deselectBuilderToken(tok, idx, chip);
        selectedEl.appendChild(chip);
      }
    }

    function deselectBuilderToken(tok, idx, chip) {
      const indexInArr = currentSelectedTokens.indexOf(tok);
      if (indexInArr > -1) currentSelectedTokens.splice(indexInArr, 1);
      chip.remove();
      const b = document.getElementById('token-' + idx);
      if (b) b.style.display = 'inline-block';

      if (currentSelectedTokens.length === 0) {
        const placeholder = document.getElementById('builder-placeholder-text');
        if (placeholder) placeholder.style.display = 'inline';
      }
    }

    function checkDialogueBuilder() {
      const feedback = document.getElementById('builder-feedback-msg');
      const constructed = currentSelectedTokens.join(' ');
      const expected = targetDialogue.join(' ');

      if (constructed === expected) {
        if (feedback) {
          feedback.innerText = '🎉 Rétt! (Правильно!) +50 XP: „' + expected + '“';
          feedback.className = 'text-xs font-mono font-bold text-emerald-400 animate-bounce';
        }
        playLetterSound(expected);
      } else {
        if (feedback) {
          feedback.innerText = '❌ Помилка у порядку слів! Спробуйте ще раз.';
          feedback.className = 'text-xs font-mono font-bold text-rose-400';
        }
      }
    }

    function resetDialogueBuilder() {
      initDialogueBuilder();
    }

    // Initialize Game 4 on load
    window.addEventListener('DOMContentLoaded', () => {
      initDialogueBuilder();
    });
"""

# Check if games_js is already added, if not add before </script>
if 'initDialogueBuilder' not in html:
    html = html.replace('</script>\n</body>', games_js + '\n  </script>\n</body>')
else:
    # replace existing
    js_pattern = r'/\* =========================================================================\s*6\. MODULE 1 STUDIO MEDIA.*?</script>'
    html = re.sub(js_pattern, games_js.strip() + '\n  </script>', html, flags=re.DOTALL)

with open(index_path, "w", encoding="utf-8") as f:
    f.write(html)

with open(desktop_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Upgrade complete: Module 1 Hero, Studio Media Slot, Blocks 1-3, and 4 Gamified Mini-Games successfully installed!")
