import os
import re

index_path = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/index.html"
desktop_path = "/Users/volodymyrkatasonov/Desktop/Islenskukennsla_A1_B2.html"

with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

# 16 vocabulary cards data
vocab_16 = [
    ("kaffi", "m.", "[kaffi]", "кава", "Karlkyn • kaffi (ÞF)"),
    ("samloka", "f.", "[samloku]", "сендвіч", "Kvenkyn • samloku (ÞF)"),
    ("vatn", "n.", "[vatn]", "вода", "Hvorugkyn • vatn (ÞF)"),
    ("te", "n.", "[te]", "чай", "Hvorugkyn • te (ÞF)"),
    ("kökubiti", "m.", "[kökubita]", "шматочок торта", "Karlkyn • kökubita (ÞF)"),
    ("ostur", "m.", "[ost]", "сир", "Karlkyn • ost (ÞF)"),
    ("mjólk", "f.", "[mjólk]", "молоко", "Kvenkyn • mjólk (ÞF)"),
    ("sykur", "m.", "[sykur]", "цукор", "Karlkyn • sykur (ÞF)"),
    ("brauð", "n.", "[brauð]", "хліб", "Hvorugkyn • brauð (ÞF)"),
    ("epli", "n.", "[epli]", "яблуко", "Hvorugkyn • epli (ÞF)"),
    ("kaffibolli", "m.", "[kaffibolla]", "чашка кави", "Karlkyn • kaffibolla (ÞF)"),
    ("matseðill", "m.", "[matseðil]", "меню", "Karlkyn • matseðil (ÞF)"),
    ("reikningur", "m.", "[reikning]", "рахунок", "Karlkyn • reikning (ÞF)"),
    ("þjónn", "m.", "[þjónn]", "офіціант", "Karlkyn • þjón (ÞF)"),
    ("gestur", "m.", "[gest]", "гість / клієнт", "Karlkyn • gest (ÞF)"),
    ("króna", "f.", "[krónu]", "крона", "Kvenkyn • krónu (ÞF)")
]

vocab_cards_html = []
for idx, (word, gender, ipa, ukr, note) in enumerate(vocab_16, start=1):
    gender_badge = ""
    border_cls = ""
    if gender == "m.":
        gender_badge = '<span class="px-2 py-0.5 rounded bg-neon-amber/20 border border-neon-amber/40 text-neon-amber font-mono text-[10px] font-bold">kk. (m.)</span>'
        border_cls = "border-neon-amber/30 hover:border-neon-amber"
    elif gender == "f.":
        gender_badge = '<span class="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold">kvk. (f.)</span>'
        border_cls = "border-emerald-500/30 hover:border-emerald-400"
    else:
        gender_badge = '<span class="px-2 py-0.5 rounded bg-neon-coral/20 border border-neon-coral/40 text-neon-coral font-mono text-[10px] font-bold">hk. (n.)</span>'
        border_cls = "border-neon-coral/30 hover:border-neon-coral"

    card = f"""          <!-- Vocab {idx}: {word} -->
          <div onclick="playLetterSound('{word}', this)"
               class="p-4 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border {border_cls} cursor-pointer transition-all duration-200 group flex flex-col justify-between">
            <div class="flex items-center justify-between mb-2">
              {gender_badge}
              <span class="text-xs font-mono text-neon-coral">{ipa}</span>
            </div>
            <div>
              <div class="text-lg font-bold text-white group-hover:text-neon-amber transition-colors font-mono">
                {word}
              </div>
              <div class="text-xs text-slate-300 font-sans mt-0.5">
                {ukr}
              </div>
            </div>
            <div class="mt-3 pt-2 border-t border-cyber-border/30 text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>{note}</span>
              <span class="group-hover:translate-x-1 transition-transform">🔊</span>
            </div>
          </div>"""
    vocab_cards_html.append(card)

vocab_grid_str = "\n".join(vocab_cards_html)

# Build Complete Section 1 HTML
section1_full_html = f"""    <!-- ======================================================================= -->
    <!-- SECTION 3: MÓDÚLL 1 (KAFFIHÚSIÐ & ÞOLFALL ÞF) — INITIALLY HIDDEN         -->
    <!-- ======================================================================= -->
    <section id="modull-1" class="module-section hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" style="display:none;">
      
      <!-- HERO HEADER -->
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
      </div>

      <!-- ===================================================================== -->
      <!-- 1. АКАДЕМІЧНИЙ БЛОК: ГЛИБОКА ГРАМАТИКА ТА МЕТОДИКА (THEORY & BÍN)     -->
      <!-- ===================================================================== -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-10">
        <div>
          <div class="flex items-center gap-2.5 text-emerald-400 text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>Málfræði • BÍN Samræming</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <span>📚 1. Академічна граматика: Керування дієслів та флексії Þolfall (ÞF 🟢)</span>
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans leading-relaxed">
            Фундаментальне правило ісландського синтаксису: перехідні дієслова отримання, володіння, споживання та купівлі завжди вимагають прямого додатка у Знахідному відмінку (Þolfall).
          </p>
        </div>

        <!-- Subsection 1.1: Verb Governance in Þolfall (ÞF) -->
        <div class="space-y-4">
          <h3 class="text-base sm:text-lg font-bold text-neon-amber font-mono flex items-center gap-2">
            <span>🔹 Керування дієслів (Verb Governance in Þolfall — 5 головних дієслів):</span>
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <!-- Verb 1: að fá -->
            <div onclick="playLetterSound('Ég ætla að fá kaffi', this)" class="p-4 rounded-xl bg-cyber-deep/90 border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition-all group">
              <div class="flex items-center justify-between text-xs font-mono mb-1">
                <span class="text-emerald-400 font-bold">að fá + ÞF</span>
                <span class="text-slate-400">отримати / взяти</span>
              </div>
              <div class="text-base font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                Ég ætla að fá <span class="text-emerald-400 underline">kaffi</span>.
              </div>
              <div class="text-xs font-mono text-neon-coral mt-1">[Jeg ai-htla að fa kaffi]</div>
              <div class="text-[11px] text-slate-300 mt-2 font-sans">«Я буду (хочу взяти) каву.»</div>
            </div>

            <!-- Verb 2: að eiga -->
            <div onclick="playLetterSound('Ég á eina samloku', this)" class="p-4 rounded-xl bg-cyber-deep/90 border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition-all group">
              <div class="flex items-center justify-between text-xs font-mono mb-1">
                <span class="text-emerald-400 font-bold">að eiga + ÞF</span>
                <span class="text-slate-400">мати / володіти</span>
              </div>
              <div class="text-base font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                Ég á <span class="text-emerald-400 underline">eina samloku</span>.
              </div>
              <div class="text-xs font-mono text-neon-coral mt-1">[Jeg au eina samloku]</div>
              <div class="text-[11px] text-slate-300 mt-2 font-sans">«У мене є один сендвіч.»</div>
            </div>

            <!-- Verb 3: að kaupa -->
            <div onclick="playLetterSound('Við kaupum eitt epli', this)" class="p-4 rounded-xl bg-cyber-deep/90 border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition-all group">
              <div class="flex items-center justify-between text-xs font-mono mb-1">
                <span class="text-emerald-400 font-bold">að kaupa + ÞF</span>
                <span class="text-slate-400">купувати</span>
              </div>
              <div class="text-base font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                Við kaupum <span class="text-emerald-400 underline">eitt epli</span>.
              </div>
              <div class="text-xs font-mono text-neon-coral mt-1">[Við kouypum eitt epli]</div>
              <div class="text-[11px] text-slate-300 mt-2 font-sans">«Ми купуємо одне яблуко.»</div>
            </div>

            <!-- Verb 4: að panta -->
            <div onclick="playLetterSound('Hann pantar einn kökubita', this)" class="p-4 rounded-xl bg-cyber-deep/90 border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition-all group">
              <div class="flex items-center justify-between text-xs font-mono mb-1">
                <span class="text-emerald-400 font-bold">að panta + ÞF</span>
                <span class="text-slate-400">замовляти</span>
              </div>
              <div class="text-base font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                Hann pantar <span class="text-emerald-400 underline">einn kökubita</span>.
              </div>
              <div class="text-xs font-mono text-neon-coral mt-1">[Hann pantar einn kökubita]</div>
              <div class="text-[11px] text-slate-300 mt-2 font-sans">«Він замовляє шматочок торта.»</div>
            </div>

            <!-- Verb 5: að drekka -->
            <div onclick="playLetterSound('Hún drekkur te', this)" class="p-4 rounded-xl bg-cyber-deep/90 border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition-all group sm:col-span-2 lg:col-span-2">
              <div class="flex items-center justify-between text-xs font-mono mb-1">
                <span class="text-emerald-400 font-bold">að drekka + ÞF</span>
                <span class="text-slate-400">пити</span>
              </div>
              <div class="text-base font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                Hún drekkur <span class="text-emerald-400 underline">te</span>.
              </div>
              <div class="text-xs font-mono text-neon-coral mt-1">[Hun drehk-kur te]</div>
              <div class="text-[11px] text-slate-300 mt-2 font-sans">«Вона п'є чай.»</div>
            </div>

          </div>
        </div>

        <!-- Subsection 1.2: Flexion Rules Matrix -->
        <div class="space-y-4 pt-4 border-t border-cyber-border/40">
          <h3 class="text-base sm:text-lg font-bold text-emerald-400 font-mono flex items-center gap-2">
            <span>🧩 Матриця змін закінчень іменників (Flexion Rules за 3 родами):</span>
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <!-- Karlkyn -->
            <div class="p-5 rounded-2xl bg-cyber-deep/90 border border-neon-amber/40 space-y-3">
              <div class="flex items-center justify-between text-xs font-mono">
                <span class="px-2.5 py-0.5 rounded bg-neon-amber/20 text-neon-amber font-bold">Karlkyn (kk. ♂)</span>
                <span class="text-slate-400">Чоловічий рід</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed font-sans">
                • <strong>Слабка відміна (-i ➔ -a):</strong> іменники на <em>-i</em> змінюють закінчення на <em>-a</em>:
              </p>
              <div class="p-3 rounded-xl bg-cyber-void/80 border border-neon-amber/20 font-mono text-xs space-y-1">
                <div>kökubit<span class="text-neon-coral font-bold">i</span> &rarr; kökubit<span class="text-neon-amber font-bold">a</span></div>
                <div>kaffiboll<span class="text-neon-coral font-bold">i</span> &rarr; kaffiboll<span class="text-neon-amber font-bold">a</span></div>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed font-sans">
                • <strong>Сильна відміна:</strong> втрачають закінчення <em>-ur</em> або лишаються без змін:
              </p>
              <div class="p-3 rounded-xl bg-cyber-void/80 border border-neon-amber/20 font-mono text-xs space-y-1">
                <div>ost<span class="text-slate-500 line-through">ur</span> &rarr; <span class="text-white font-bold">ost</span></div>
                <div>kaffi &rarr; <span class="text-white font-bold">kaffi</span></div>
              </div>
            </div>

            <!-- Kvenkyn -->
            <div class="p-5 rounded-2xl bg-cyber-deep/90 border border-emerald-500/40 space-y-3">
              <div class="flex items-center justify-between text-xs font-mono">
                <span class="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">Kvenkyn (kvk. ♀)</span>
                <span class="text-slate-400">Жіночий рід</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed font-sans">
                • <strong>Слабка відміна (-a ➔ -u):</strong> іменники на <em>-a</em> обов'язково переходять у <em>-u</em>:
              </p>
              <div class="p-3 rounded-xl bg-cyber-void/80 border border-emerald-500/20 font-mono text-xs space-y-1">
                <div>samlok<span class="text-neon-coral font-bold">a</span> &rarr; samlok<span class="text-emerald-400 font-bold">u</span></div>
                <div>kak<span class="text-neon-coral font-bold">a</span> &rarr; kök<span class="text-emerald-400 font-bold">u</span> (u-umlaut)</div>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed font-sans">
                • <strong>Множина (Сильна/Слабка):</strong> закінчення множини <em>-ur</em> зберігається у знахідному:
              </p>
              <div class="p-3 rounded-xl bg-cyber-void/80 border border-emerald-500/20 font-mono text-xs space-y-1">
                <div>tvær <span class="text-emerald-400 font-bold">samlokur</span> [ÞF]</div>
              </div>
            </div>

            <!-- Hvorugkyn -->
            <div class="p-5 rounded-2xl bg-cyber-deep/90 border border-neon-coral/40 space-y-3">
              <div class="flex items-center justify-between text-xs font-mono">
                <span class="px-2.5 py-0.5 rounded bg-neon-coral/20 text-neon-coral font-bold">Hvorugkyn (hk. ⚲)</span>
                <span class="text-slate-400">Середній рід</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed font-sans">
                • <strong>Правило нейтральності:</strong> Форма Знахідного відмінка (ÞF) <strong>повністю ідентична</strong> називному відмінку (NF = ÞF):
              </p>
              <div class="p-3 rounded-xl bg-cyber-void/80 border border-neon-coral/20 font-mono text-xs space-y-1">
                <div>vatn (NF) &rarr; <span class="text-neon-coral font-bold">vatn (ÞF)</span> (без змін)</div>
                <div>te (NF) &rarr; <span class="text-neon-coral font-bold">te (ÞF)</span> (без змін)</div>
                <div>epli (NF) &rarr; <span class="text-neon-coral font-bold">epli (ÞF)</span> (без змін)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Subsection 1.3: Number-Gender Agreement Matrix (4x3) -->
        <div class="space-y-4 pt-4 border-t border-cyber-border/40">
          <h3 class="text-base sm:text-lg font-bold text-neon-amber font-mono flex items-center gap-2">
            <span>🔢 Узгодження числівників 1–4 за 3 родами (Tölur 1–4 Matrix):</span>
          </h3>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse rounded-2xl overflow-hidden border border-cyber-border/60 bg-cyber-deep/80">
              <thead>
                <tr class="bg-cyber-void/90 border-b border-cyber-border/70 text-xs font-mono font-bold text-slate-300">
                  <th class="p-4 border-r border-cyber-border/40 text-center w-16 text-neon-amber">Tala</th>
                  <th class="p-4 border-r border-cyber-border/40 text-neon-amber">Karlkyn (kk. ♂)</th>
                  <th class="p-4 border-r border-cyber-border/40 text-emerald-400">Kvenkyn (kvk. ♀)</th>
                  <th class="p-4 text-neon-coral">Hvorugkyn (hk. ⚲)</th>
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
      </div>

      <!-- ===================================================================== -->
      <!-- 2. ДВОКОЛОНКОВИЙ ІНТЕРАКТИВНИЙ ДІАЛОГ ТА МЕДІА-СИНХРОНІЗАЦІЯ          -->
      <!-- ===================================================================== -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-8">
        <div>
          <div class="flex items-center gap-2.5 text-neon-amber text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>Raunverulegt samtal • Tvídálka</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <span>🎭 2. Двоколонковий інтерактивний діалог у кав'ярні</span>
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            Зліва — студійний візуальний плеєр з перемикачем рольових каналів; справа — інтерактивні репліки з аудіо-синтезатором.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          <!-- Left Column: Visuals & Studio Player Widget -->
          <div class="space-y-6">
            <!-- Visual Artwork Canvas/Card -->
            <div class="p-6 rounded-2xl bg-cyber-deep/90 border border-emerald-500/40 relative overflow-hidden group">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                  <span class="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider">Reykjavík Kaffihús • Live Session</span>
                </div>
                <span id="active-speaker-badge" class="px-3 py-1 rounded-full bg-cyber-void border border-emerald-500/40 text-xs font-mono text-emerald-400 font-bold">
                  👨 Þjónn (Офіціант)
                </span>
              </div>

              <!-- Stylized Cyberpunk Café Artwork Display -->
              <div class="w-full h-44 rounded-xl bg-gradient-to-br from-cyber-void via-[#150a21] to-[#0e0716] border border-cyber-border/40 flex flex-col items-center justify-center relative overflow-hidden shadow-inner p-4 text-center">
                <div class="text-5xl mb-2 select-none group-hover:scale-110 transition-transform">☕ 🥪 ✨</div>
                <div class="text-base font-bold text-white font-mono">Kaffihúsið í Miðbænum</div>
                <div class="text-xs text-amber-200/80 font-sans mt-0.5">Рейк'явік • Атмосфера кав'ярні з диктором Karl &amp; Guðrún</div>
              </div>

              <!-- Studio Audio Player Widget -->
              <div class="mt-5 p-4 rounded-xl bg-cyber-void/90 border border-cyber-border/60">
                <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span class="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span>🎧 Studio Master Audio:</span>
                    <span class="text-[10px] text-slate-500 font-normal">audio/kaffihusid_dialogue.mp3</span>
                  </span>
                  <span id="audio-widget-timer">00:00 / 01:45</span>
                </div>
                <div class="flex items-center gap-3">
                  <button id="dialogue-play-toggle" onclick="toggleDialoguePlayState()" class="w-10 h-10 rounded-full btn-warm-3d flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
                    <span id="dialogue-toggle-icon">▶</span>
                  </button>
                  <div class="flex-grow">
                    <div class="w-full bg-cyber-deep rounded-full h-2 overflow-hidden border border-cyber-border/40">
                      <div id="dialogue-progress-line" class="bg-gradient-to-r from-emerald-500 to-neon-amber h-full w-0 transition-all duration-300"></div>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded bg-cyber-deep border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-bold">0.80x</span>
                </div>
              </div>

              <div class="mt-4 flex items-center justify-between text-xs font-mono">
                <button onclick="playModule1Dialogue()" class="w-full py-2.5 rounded-xl btn-warm-3d font-bold text-xs shadow-md">
                  <span>▶️ Слухати весь діалог послідовно</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column: 7 Line-by-Line Speech Bubbles -->
          <div class="space-y-3.5">
            <!-- Line 1 -->
            <div id="m1-line-1" onclick="playDialogueLine(1, 'Góðan daginn! Hvað má bjóða þér?', 'waiter', this)" class="p-4 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
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

            <!-- Line 2 -->
            <div id="m1-line-2" onclick="playDialogueLine(2, 'Góðan dag! Ég ætla að fá einn kaffi og eina samloku, takk.', 'guest', this)" class="p-4 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex items-start gap-3.5 group ml-3 sm:ml-6">
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

            <!-- Line 3 -->
            <div id="m1-line-3" onclick="playDialogueLine(3, 'Eitthvað fleira?', 'waiter', this)" class="p-4 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
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

            <!-- Line 4 -->
            <div id="m1-line-4" onclick="playDialogueLine(4, 'Nei, takk. Hvað kostar þetta?', 'guest', this)" class="p-4 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex items-start gap-3.5 group ml-3 sm:ml-6">
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

            <!-- Line 5 -->
            <div id="m1-line-5" onclick="playDialogueLine(5, 'Það gerir 1500 krónur.', 'waiter', this)" class="p-4 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
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

            <!-- Line 6 -->
            <div id="m1-line-6" onclick="playDialogueLine(6, 'Gjörðu svo vel!', 'guest', this)" class="p-4 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex items-start gap-3.5 group ml-3 sm:ml-6">
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

            <!-- Line 7 -->
            <div id="m1-line-7" onclick="playDialogueLine(7, 'Takk kærlega!', 'waiter', this)" class="p-4 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
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

      <!-- ===================================================================== -->
      <!-- 3. 🎮 6 ІНТЕРАКТИВНИХ ТРЕНАЖЕРІВ НА JS (FULL GAME SUITE)               -->
      <!-- ===================================================================== -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-10">
        <div>
          <div class="flex items-center gap-2.5 text-emerald-400 text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>Leikjasvæði • 6 Gagnvirkir leikir</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <span>🎮 3. Комплекс із 6 інтерактивних тренажерів на JS</span>
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            Повна серія практичних міні-ігор: флексії, числівники, чек, аудіо-добір реплік, пошук помилок та аудіо-виклик чисел.
          </p>
        </div>

        <!-- ------------------------------------------------------------------- -->
        <!-- ТРЕНАЖЕР 1: Конструктор флексій ÞF                                  -->
        <!-- ------------------------------------------------------------------- -->
        <div class="p-6 rounded-2xl bg-cyber-deep/90 border border-neon-coral/40 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyber-border/40">
            <div>
              <span class="text-xs font-mono font-bold text-neon-coral uppercase tracking-widest">Тренажер 1</span>
              <h3 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                <span>🔄 Конструктор флексій ÞF (Accusative Flexion Transformer)</span>
              </h3>
              <p class="text-xs text-slate-300 mt-0.5 font-sans">
                Натисніть на картку для активації мутації закінчень у Знахідний відмінок з підсвічуванням.
              </p>
            </div>
            <button onclick="resetAllTransformers()" class="px-3.5 py-1.5 rounded-lg bg-cyber-void border border-neon-coral/40 text-xs font-mono text-neon-coral hover:bg-neon-coral/10">
              Скинути стан
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Card 1 -->
            <div id="trans-card-1" onclick="toggleFlexion(1)" class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Kvenkyn (kvk.)</span>
                <span id="trans-badge-1" class="px-2 py-0.5 rounded bg-bin-nf/20 text-bin-nf font-bold">NF</span>
              </div>
              <div class="my-3 text-center">
                <span id="trans-root-1" class="text-xl font-bold font-mono text-white">samlok</span><span id="trans-flex-1" class="text-xl font-bold font-mono text-neon-coral">a</span>
              </div>
              <div class="text-[11px] text-slate-400 text-center font-sans">Клацніть для перетворення (-a &rarr; -u)</div>
            </div>

            <!-- Card 2 -->
            <div id="trans-card-2" onclick="toggleFlexion(2)" class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Karlkyn (kk.)</span>
                <span id="trans-badge-2" class="px-2 py-0.5 rounded bg-bin-nf/20 text-bin-nf font-bold">NF</span>
              </div>
              <div class="my-3 text-center">
                <span id="trans-root-2" class="text-xl font-bold font-mono text-white">kökubit</span><span id="trans-flex-2" class="text-xl font-bold font-mono text-neon-amber">i</span>
              </div>
              <div class="text-[11px] text-slate-400 text-center font-sans">Клацніть для перетворення (-i &rarr; -a)</div>
            </div>

            <!-- Card 3 -->
            <div id="trans-card-3" onclick="toggleFlexion(3)" class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Kvenkyn (kvk.)</span>
                <span id="trans-badge-3" class="px-2 py-0.5 rounded bg-bin-nf/20 text-bin-nf font-bold">NF</span>
              </div>
              <div class="my-3 text-center">
                <span id="trans-root-3" class="text-xl font-bold font-mono text-white">kak</span><span id="trans-flex-3" class="text-xl font-bold font-mono text-neon-coral">a</span>
              </div>
              <div class="text-[11px] text-slate-400 text-center font-sans">Клацніть для перетворення (a &rarr; u-умлаут)</div>
            </div>

            <!-- Card 4 -->
            <div id="trans-card-4" onclick="toggleFlexion(4)" class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 hover:border-neon-coral cursor-pointer transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Hvorugkyn (hk.)</span>
                <span id="trans-badge-4" class="px-2 py-0.5 rounded bg-bin-nf/20 text-bin-nf font-bold">NF</span>
              </div>
              <div class="my-3 text-center">
                <span id="trans-root-4" class="text-xl font-bold font-mono text-white">vatn</span><span id="trans-flex-4" class="text-xl font-bold font-mono text-slate-400"></span>
              </div>
              <div class="text-[11px] text-slate-400 text-center font-sans">Клацніть для перевірки (NF = ÞF без змін)</div>
            </div>

            <!-- Card 5 -->
            <div id="trans-card-5" onclick="toggleFlexion(5)" class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-2">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Karlkyn (kk.)</span>
                <span id="trans-badge-5" class="px-2 py-0.5 rounded bg-bin-nf/20 text-bin-nf font-bold">NF</span>
              </div>
              <div class="my-3 text-center">
                <span id="trans-root-5" class="text-xl font-bold font-mono text-white">samlok</span><span id="trans-flex-5" class="text-xl font-bold font-mono text-neon-amber">i</span>
              </div>
              <div class="text-[11px] text-slate-400 text-center font-sans">Клацніть для перетворення (-i &rarr; -a)</div>
            </div>
          </div>
        </div>

        <!-- ------------------------------------------------------------------- -->
        <!-- ТРЕНАЖЕР 2: Квіз узгодження числівників 1–4 за 3 родами              -->
        <!-- ------------------------------------------------------------------- -->
        <div class="p-6 rounded-2xl bg-cyber-deep/90 border border-neon-amber/40 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyber-border/40">
            <div>
              <span class="text-xs font-mono font-bold text-neon-amber uppercase tracking-widest">Тренажер 2</span>
              <h3 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                <span>🔢 Квіз узгодження числівників 1–4 за 3 родами (6 завдань)</span>
              </h3>
              <p class="text-xs text-slate-300 mt-0.5 font-sans">
                Оберіть правильний числівник відповідно до роду іменника.
              </p>
            </div>
            <div class="flex items-center gap-3 self-start sm:self-auto">
              <span class="text-xs font-mono text-slate-400">Результат:</span>
              <span id="quiz2-score-badge" class="px-3 py-1 rounded-lg bg-neon-amber/20 border border-neon-amber/40 text-neon-amber font-mono text-sm font-bold">0 / 6</span>
            </div>
          </div>

          <div class="space-y-3.5">
            <!-- Q1 -->
            <div class="p-3.5 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div class="text-sm font-mono text-white">1. „Ég ætla að fá <span id="q2_1-blank" class="text-neon-amber underline">______</span> samlokur.“ (kvk. 3)</div>
              <div class="flex items-center gap-2">
                <button onclick="checkQuiz2(1, 'þrjár', this)" class="q2-btn-1 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">þrjár</button>
                <button onclick="checkQuiz2(1, 'þrír', this)" class="q2-btn-1 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">þrír</button>
                <button onclick="checkQuiz2(1, 'þrjú', this)" class="q2-btn-1 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">þrjú</button>
              </div>
            </div>

            <!-- Q2 -->
            <div class="p-3.5 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div class="text-sm font-mono text-white">2. „Ég ætla að fá <span id="q2_2-blank" class="text-neon-amber underline">______</span> vatn.“ (hk. 1)</div>
              <div class="flex items-center gap-2">
                <button onclick="checkQuiz2(2, 'einn', this)" class="q2-btn-2 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">einn</button>
                <button onclick="checkQuiz2(2, 'eina', this)" class="q2-btn-2 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">eina</button>
                <button onclick="checkQuiz2(2, 'eitt', this)" class="q2-btn-2 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">eitt</button>
              </div>
            </div>

            <!-- Q3 -->
            <div class="p-3.5 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div class="text-sm font-mono text-white">3. „Ég ætla að fá <span id="q2_3-blank" class="text-neon-amber underline">______</span> kaffa.“ (kk. 2)</div>
              <div class="flex items-center gap-2">
                <button onclick="checkQuiz2(3, 'tveir', this)" class="q2-btn-3 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">tveir</button>
                <button onclick="checkQuiz2(3, 'tvær', this)" class="q2-btn-3 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">tvær</button>
                <button onclick="checkQuiz2(3, 'tvö', this)" class="q2-btn-3 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">tvö</button>
              </div>
            </div>

            <!-- Q4 -->
            <div class="p-3.5 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div class="text-sm font-mono text-white">4. „Hún kaupir <span id="q2_4-blank" class="text-neon-amber underline">______</span> kökur.“ (kvk. 4)</div>
              <div class="flex items-center gap-2">
                <button onclick="checkQuiz2(4, 'fjórir', this)" class="q2-btn-4 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">fjórir</button>
                <button onclick="checkQuiz2(4, 'fjórar', this)" class="q2-btn-4 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">fjórar</button>
                <button onclick="checkQuiz2(4, 'fjögur', this)" class="q2-btn-4 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">fjögur</button>
              </div>
            </div>

            <!-- Q5 -->
            <div class="p-3.5 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div class="text-sm font-mono text-white">5. „Hann pantar <span id="q2_5-blank" class="text-neon-amber underline">______</span> kökubita.“ (kk. 1)</div>
              <div class="flex items-center gap-2">
                <button onclick="checkQuiz2(5, 'einn', this)" class="q2-btn-5 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">einn</button>
                <button onclick="checkQuiz2(5, 'eina', this)" class="q2-btn-5 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">eina</button>
                <button onclick="checkQuiz2(5, 'eitt', this)" class="q2-btn-5 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">eitt</button>
              </div>
            </div>

            <!-- Q6 -->
            <div class="p-3.5 rounded-xl bg-cyber-void/70 border border-cyber-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div class="text-sm font-mono text-white">6. „Við drekkum <span id="q2_6-blank" class="text-neon-amber underline">______</span> te.“ (hk. 2)</div>
              <div class="flex items-center gap-2">
                <button onclick="checkQuiz2(6, 'tveir', this)" class="q2-btn-6 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">tveir</button>
                <button onclick="checkQuiz2(6, 'tvær', this)" class="q2-btn-6 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">tvær</button>
                <button onclick="checkQuiz2(6, 'tvö', this)" class="q2-btn-6 px-3 py-1 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-white hover:border-emerald-400">tvö</button>
              </div>
            </div>
          </div>
        </div>

        <!-- ------------------------------------------------------------------- -->
        <!-- ТРЕНАЖЕР 3: Live-Симулятор замовлення та розрахунок чека             -->
        <!-- ------------------------------------------------------------------- -->
        <div class="p-6 rounded-2xl bg-cyber-deep/90 border border-emerald-500/40 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyber-border/40">
            <div>
              <span class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Тренажер 3</span>
              <h3 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                <span>🧾 Live-Симулятор замовлення та розрахунок чека</span>
              </h3>
              <p class="text-xs text-slate-300 mt-0.5 font-sans">
                Оберіть страви. Програма динамічно синтезує граматично узгоджене речення у ÞF та обчислює суму.
              </p>
            </div>
            <div class="flex items-center gap-3 self-start sm:self-auto">
              <span class="text-xs font-mono text-slate-400">Рахунок:</span>
              <span id="game1-score" class="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-sm font-bold">0 XP</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

          <div class="p-4 rounded-xl bg-cyber-void border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="w-full md:w-auto">
              <span class="text-[11px] font-mono text-slate-400 uppercase block">Побудована ісландська фраза:</span>
              <div id="sim-generated-phrase" class="text-base sm:text-lg font-bold text-emerald-400 font-mono mt-0.5">
                Ég ætla að fá... (Оберіть страви)
              </div>
              <div id="sim-receipt-sum" class="text-xs font-mono text-slate-300 mt-1">Разом до сплати: 0 krónur</div>
            </div>
            <button onclick="submitSimulatorOrder()" class="px-5 py-2.5 rounded-xl btn-warm-3d text-xs font-bold whitespace-nowrap shadow-lg">
              <span>🧾 Замовити та озвучити</span>
            </button>
          </div>
        </div>

        <!-- ------------------------------------------------------------------- -->
        <!-- ТРЕНАЖЕР 4: Аудіо-диктор та добір реплік                           -->
        <!-- ------------------------------------------------------------------- -->
        <div class="p-6 rounded-2xl bg-cyber-deep/90 border border-neon-rose/40 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyber-border/40">
            <div>
              <span class="text-xs font-mono font-bold text-neon-rose uppercase tracking-widest">Тренажер 4</span>
              <h3 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                <span>👂 Аудіо-диктор та добір реплік (Audio Dialogue Matcher)</span>
              </h3>
              <p class="text-xs text-slate-300 mt-0.5 font-sans">
                Прослухайте питання офіціанта та оберіть найбільш природну відповідь клієнта.
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button onclick="playLetterSound('Eitthvað fleira?')" class="px-3.5 py-1.5 rounded-lg btn-warm-3d text-xs font-bold flex items-center gap-2">
                <span>🔊 Слухати питання</span>
              </button>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 flex items-center justify-between">
            <span class="text-sm font-mono text-white">👨‍🍳 Офіціант запитує: <strong class="text-neon-amber">„Eitthvað fleira?“</strong></span>
            <span class="text-xs text-slate-400 font-sans">(«Щось ще?»)</span>
          </div>

          <div id="dialogue-matcher-options" class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button onclick="checkDialogueMatcher(1, false, this)" class="p-3.5 rounded-xl bg-cyber-void border border-cyber-border/40 hover:border-neon-rose text-left transition-all">
              <div class="text-xs font-mono text-slate-400">Варіант A</div>
              <div class="text-sm font-bold text-white mt-1 font-mono">„Já, ég heiti Anna.“</div>
              <div class="text-[11px] text-slate-400 mt-1 font-sans">«Так, мене звати Анна.»</div>
            </button>
            <button onclick="checkDialogueMatcher(2, true, this)" class="p-3.5 rounded-xl bg-cyber-void border border-cyber-border/40 hover:border-emerald-400 text-left transition-all">
              <div class="text-xs font-mono text-slate-400">Варіант B (Рекомендовано)</div>
              <div class="text-sm font-bold text-white mt-1 font-mono">„Nei, takk. Hvað kostar þetta?“</div>
              <div class="text-[11px] text-slate-400 mt-1 font-sans">«Ні, дякую. Скільки це коштує?»</div>
            </button>
            <button onclick="checkDialogueMatcher(3, false, this)" class="p-3.5 rounded-xl bg-cyber-void border border-cyber-border/40 hover:border-neon-rose text-left transition-all">
              <div class="text-xs font-mono text-slate-400">Варіант C</div>
              <div class="text-sm font-bold text-white mt-1 font-mono">„Góðan daginn, afi!“</div>
              <div class="text-[11px] text-slate-400 mt-1 font-sans">«Доброго дня, дідусю!»</div>
            </button>
          </div>
          <div id="matcher4-feedback" class="text-xs font-mono font-bold text-slate-400">Оберіть варіант відповіді...</div>
        </div>

        <!-- ------------------------------------------------------------------- -->
        <!-- ТРЕНАЖЕР 5: Детектор граматичних помилок                            -->
        <!-- ------------------------------------------------------------------- -->
        <div class="p-6 rounded-2xl bg-cyber-deep/90 border border-neon-coral/40 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyber-border/40">
            <div>
              <span class="text-xs font-mono font-bold text-neon-coral uppercase tracking-widest">Тренажер 5</span>
              <h3 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                <span>🔍 Детектор граматичних помилок (Grammar Error Hunter)</span>
              </h3>
              <p class="text-xs text-slate-300 mt-0.5 font-sans">
                Знайдіть та виправте граматичні помилки у родах і закінченнях знахідного відмінка.
              </p>
            </div>
            <div id="hunter-score-badge" class="px-3 py-1 rounded-lg bg-neon-coral/20 border border-neon-coral/40 text-neon-coral font-mono text-xs font-bold">
              0 / 3 виправлено
            </div>
          </div>

          <div class="space-y-4">
            <!-- Bug 1 -->
            <div class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span class="text-xs text-rose-400 font-mono font-bold">Помилка 1:</span>
                <div class="text-base font-mono text-white mt-0.5">„Ég ætla að fá <span class="text-rose-400 underline decoration-wavy">einn samloka</span>.“</div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="fixGrammarHunter(1, true, this)" class="px-3 py-1.5 rounded-lg bg-cyber-deep border border-emerald-500/40 text-xs font-mono text-emerald-400 hover:bg-emerald-500/20">eina samloku (Правильно)</button>
                <button onclick="fixGrammarHunter(1, false, this)" class="px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-slate-400 hover:text-white">eitt samloku</button>
              </div>
            </div>

            <!-- Bug 2 -->
            <div class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span class="text-xs text-rose-400 font-mono font-bold">Помилка 2:</span>
                <div class="text-base font-mono text-white mt-0.5">„Ég drekk <span class="text-rose-400 underline decoration-wavy">eitt kaffi</span>.“</div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="fixGrammarHunter(2, false, this)" class="px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-slate-400 hover:text-white">eina kaffi</button>
                <button onclick="fixGrammarHunter(2, true, this)" class="px-3 py-1.5 rounded-lg bg-cyber-deep border border-emerald-500/40 text-xs font-mono text-emerald-400 hover:bg-emerald-500/20">einn kaffi (Правильно)</button>
              </div>
            </div>

            <!-- Bug 3 -->
            <div class="p-4 rounded-xl bg-cyber-void/80 border border-cyber-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span class="text-xs text-rose-400 font-mono font-bold">Помилка 3:</span>
                <div class="text-base font-mono text-white mt-0.5">„Ég kaupi <span class="text-rose-400 underline decoration-wavy">eina kökubiti</span>.“</div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="fixGrammarHunter(3, true, this)" class="px-3 py-1.5 rounded-lg bg-cyber-deep border border-emerald-500/40 text-xs font-mono text-emerald-400 hover:bg-emerald-500/20">einn kökubita (Правильно)</button>
                <button onclick="fixGrammarHunter(3, false, this)" class="px-3 py-1.5 rounded-lg bg-cyber-deep border border-cyber-border/40 text-xs font-mono text-slate-400 hover:text-white">eitt kökubiti</button>
              </div>
            </div>
          </div>
        </div>

        <!-- ------------------------------------------------------------------- -->
        <!-- ТРЕНАЖЕР 6: Слуховий тренажер цін та чисел                         -->
        <!-- ------------------------------------------------------------------- -->
        <div class="p-6 rounded-2xl bg-cyber-deep/90 border border-neon-amber/40 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyber-border/40">
            <div>
              <span class="text-xs font-mono font-bold text-neon-amber uppercase tracking-widest">Тренажер 6</span>
              <h3 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                <span>🎧 Слуховий тренажер цін та чисел (Price &amp; Number Challenge)</span>
              </h3>
              <p class="text-xs text-slate-300 mt-0.5 font-sans">
                Натисніть «Прослухати ціну» та визначте точну суму, яку назвав диктор.
              </p>
            </div>
            <button onclick="playPriceChallengeAudio()" class="px-4 py-2 rounded-xl btn-warm-3d text-xs font-bold flex items-center gap-2 shadow-md">
              <span>🔊 Прослухати ціну</span>
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button onclick="checkPriceChallenge(850, this)" class="price-btn p-4 rounded-xl bg-cyber-void border border-cyber-border/40 hover:border-neon-amber font-mono text-base font-bold text-white text-center transition-all">
              850 kr.
            </button>
            <button onclick="checkPriceChallenge(1500, this)" class="price-btn p-4 rounded-xl bg-cyber-void border border-cyber-border/40 hover:border-neon-amber font-mono text-base font-bold text-white text-center transition-all">
              1500 kr.
            </button>
            <button onclick="checkPriceChallenge(2400, this)" class="price-btn p-4 rounded-xl bg-cyber-void border border-cyber-border/40 hover:border-neon-amber font-mono text-base font-bold text-white text-center transition-all">
              2400 kr.
            </button>
            <button onclick="checkPriceChallenge(3200, this)" class="price-btn p-4 rounded-xl bg-cyber-void border border-cyber-border/40 hover:border-neon-amber font-mono text-base font-bold text-white text-center transition-all">
              3200 kr.
            </button>
          </div>
          <div id="price-feedback-msg" class="text-xs font-mono font-bold text-slate-400">Клацніть «Прослухати ціну», щоб розпочати випробування...</div>
        </div>

      </div>

      <!-- ===================================================================== -->
      <!-- 4. 📚 РОЗШИРЕНИЙ СЛОВНИКОВИЙ ДЕК (16 KEY VOCABULARY CARDS)             -->
      <!-- ===================================================================== -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-cyber-border/40 gap-4">
          <div>
            <span class="text-xs font-mono font-bold text-neon-amber tracking-widest uppercase">Orðaforði • 16 Lykilorð</span>
            <h2 class="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-3">
              <span>📖 4. Розширений словниковий дек: Кав'ярня та рахунок (16 слів)</span>
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
              Базовий лексичний мінімум кав'ярні: рід іменника, міжнародна латинська транскрипція та форма Знахідного відмінка (ÞF).
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
{vocab_grid_str}
        </div>
      </div>

    </section>
"""

# Replace Section 1 in html
pattern = r'<!-- ======================================================================= -->\s*<!-- SECTION 3: MÓDÚLL 1 \(KAFFIHÚSIÐ & ÞOLFALL ÞF\).*?</section>'
match = re.search(pattern, html, flags=re.DOTALL)
if match:
    html = html[:match.start()] + section1_full_html.strip() + html[match.end():]
else:
    sec_start = html.find('<section id="modull-1"')
    sec_end = html.find('</section>', sec_start) + len('</section>')
    html = html[:sec_start] + section1_full_html.strip() + html[sec_end:]

# Master JS Logic for all 6 trainers + dialogue sync
new_js_logic = """
    /* =========================================================================
       6. MODULE 1 MASTER TRAINERS & DIALOGUE SYNCHRONIZATION LOGIC
       ========================================================================= */

    // Studio & Dialogue Synchronization state
    let activeSpeaker = 'waiter';
    let isDialogueSequencePlaying = false;

    function playDialogueLine(lineNum, text, speakerRole, el) {
      activeSpeaker = speakerRole;
      const speakerBadge = document.getElementById('active-speaker-badge');
      if (speakerBadge) {
        if (speakerRole === 'waiter') {
          speakerBadge.innerText = '👨 Þjónn (Офіціант)';
          speakerBadge.className = 'px-3 py-1 rounded-full bg-cyber-void border border-neon-amber/50 text-xs font-mono text-neon-amber font-bold';
        } else {
          speakerBadge.innerText = '☕ Gestur (Гість)';
          speakerBadge.className = 'px-3 py-1 rounded-full bg-cyber-void border border-emerald-500/50 text-xs font-mono text-emerald-400 font-bold';
        }
      }
      playLetterSound(text, el);
    }

    function toggleDialoguePlayState() {
      const icon = document.getElementById('dialogue-toggle-icon');
      if (!isDialogueSequencePlaying) {
        if (icon) icon.innerText = '⏸';
        playModule1Dialogue();
      } else {
        if (icon) icon.innerText = '▶';
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        isDialogueSequencePlaying = false;
      }
    }

    async function playModule1Dialogue() {
      if (isDialogueSequencePlaying) return;
      isDialogueSequencePlaying = true;
      const icon = document.getElementById('dialogue-toggle-icon');
      if (icon) icon.innerText = '⏸';

      const lines = [
        { num: 1, text: 'Góðan daginn! Hvað má bjóða þér?', role: 'waiter' },
        { num: 2, text: 'Góðan dag! Ég ætla að fá einn kaffi og eina samloku, takk.', role: 'guest' },
        { num: 3, text: 'Eitthvað fleira?', role: 'waiter' },
        { num: 4, text: 'Nei, takk. Hvað kostar þetta?', role: 'guest' },
        { num: 5, text: 'Það gerir 1500 krónur.', role: 'waiter' },
        { num: 6, text: 'Gjörðu svo vel!', role: 'guest' },
        { num: 7, text: 'Takk kærlega!', role: 'waiter' }
      ];

      for (let i = 0; i < lines.length; i++) {
        if (!isDialogueSequencePlaying) break;
        const line = lines[i];
        const el = document.getElementById('m1-line-' + line.num);
        playDialogueLine(line.num, line.text, line.role, el);
        
        const prog = document.getElementById('dialogue-progress-line');
        const timer = document.getElementById('audio-widget-timer');
        if (prog) prog.style.width = Math.round(((i + 1) / lines.length) * 100) + '%';
        if (timer) timer.innerText = `00:${(i + 1) * 14} / 01:45`;

        await new Promise(r => setTimeout(r, 2700));
      }

      if (icon) icon.innerText = '▶';
      isDialogueSequencePlaying = false;
    }

    // TRAINER 1: Accusative Flexion Transformer
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

    // TRAINER 2: Number-Gender Matrix Quiz (6 Questions)
    let quiz2Score = 0;
    const quiz2Answers = {
      1: 'þrjár',
      2: 'eitt',
      3: 'tveir',
      4: 'fjórar',
      5: 'einn',
      6: 'tvö'
    };

    function checkQuiz2(qNum, selectedVal, btn) {
      const isCorrect = quiz2Answers[qNum] === selectedVal;
      const blankEl = document.getElementById('q2_' + qNum + '-blank');

      document.querySelectorAll('.q2-btn-' + qNum).forEach(b => {
        b.classList.remove('bg-emerald-500/40', 'border-emerald-400', 'bg-rose-500/40', 'border-rose-400');
      });

      if (isCorrect) {
        btn.classList.add('bg-emerald-500/40', 'border-emerald-400');
        if (blankEl) {
          blankEl.innerText = selectedVal;
          blankEl.className = 'text-emerald-400 font-bold underline';
        }
        quiz2Score = Math.min(6, quiz2Score + 1);
        playLetterSound(selectedVal);
      } else {
        btn.classList.add('bg-rose-500/40', 'border-rose-400');
        if (blankEl) {
          blankEl.innerText = selectedVal;
          blankEl.className = 'text-rose-400 font-bold underline';
        }
      }

      const scoreEl = document.getElementById('quiz2-score-badge');
      if (scoreEl) scoreEl.innerText = quiz2Score + ' / 6';
    }

    // TRAINER 3: Café Order & Bill Simulator
    const simState = { kaffi: 0, samloka: 0, vatn: 0, te: 0, kökubiti: 0 };
    const simPrices = { kaffi: 450, samloka: 850, vatn: 200, te: 350, kökubiti: 650 };
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

    // TRAINER 4: Audio Dialogue Matcher
    function checkDialogueMatcher(optNum, isCorrect, btn) {
      const feedback = document.getElementById('matcher4-feedback');
      document.querySelectorAll('#dialogue-matcher-options button').forEach(b => {
        b.classList.remove('border-emerald-400', 'bg-emerald-500/20', 'border-rose-400', 'bg-rose-500/20');
      });

      if (isCorrect) {
        btn.classList.add('border-emerald-400', 'bg-emerald-500/20');
        if (feedback) {
          feedback.innerText = '🎉 Rétt! (Правильно!) Варіант B — логічна відповідь гостя.';
          feedback.className = 'text-xs font-mono font-bold text-emerald-400 animate-pulse';
        }
        playLetterSound('Nei, takk. Hvað kostar þetta?');
      } else {
        btn.classList.add('border-rose-400', 'bg-rose-500/20');
        if (feedback) {
          feedback.innerText = '❌ Неправильна відповідь для цієї ситуації. Спробуйте ще раз!';
          feedback.className = 'text-xs font-mono font-bold text-rose-400';
        }
      }
    }

    // TRAINER 5: Grammar Error Hunter
    let hunterScore = 0;
    const hunterFixed = { 1: false, 2: false, 3: false };

    function fixGrammarHunter(qNum, isCorrect, btn) {
      if (isCorrect && !hunterFixed[qNum]) {
        hunterFixed[qNum] = true;
        hunterScore++;
        btn.classList.add('bg-emerald-500/40', 'border-emerald-400');
        const badge = document.getElementById('hunter-score-badge');
        if (badge) badge.innerText = hunterScore + ' / 3 виправлено';
        playLetterSound(btn.innerText.replace(' (Правильно)', ''));
      } else if (!isCorrect) {
        btn.classList.add('bg-rose-500/40', 'border-rose-400');
      }
    }

    // TRAINER 6: Price & Number Audio Challenge
    let currentPriceTarget = 1500;
    const pricePhrases = {
      1500: 'Það gerir eitt þúsund og fimm hundruð krónur.',
      2400: 'Það gerir tvö þúsund og fjögur hundruð krónur.',
      850: 'Það gerir átta hundruð og fimmtíu krónur.',
      3200: 'Það gerir þrjú þúsund og tvö hundruð krónur.'
    };

    function playPriceChallengeAudio() {
      const keys = [1500, 2400, 850, 3200];
      currentPriceTarget = keys[Math.floor(Math.random() * keys.length)];
      playLetterSound(pricePhrases[currentPriceTarget]);
      const msg = document.getElementById('price-feedback-msg');
      if (msg) {
        msg.innerText = 'Диктор щойно озвучив ціну. Оберіть правильну картку!';
        msg.className = 'text-xs font-mono font-bold text-neon-amber';
      }
    }

    function checkPriceChallenge(selectedPrice, btn) {
      const msg = document.getElementById('price-feedback-msg');
      document.querySelectorAll('.price-btn').forEach(b => {
        b.classList.remove('border-emerald-400', 'bg-emerald-500/20', 'border-rose-400', 'bg-rose-500/20');
      });

      if (selectedPrice === currentPriceTarget) {
        btn.classList.add('border-emerald-400', 'bg-emerald-500/20');
        if (msg) {
          msg.innerText = `🎉 Rétt! (Правильно!) Ціна: ${selectedPrice} krónur.`;
          msg.className = 'text-xs font-mono font-bold text-emerald-400 animate-bounce';
        }
      } else {
        btn.classList.add('border-rose-400', 'bg-rose-500/20');
        if (msg) {
          msg.innerText = `❌ Неправильно. Прослухайте ще раз та спробуйте знову!`;
          msg.className = 'text-xs font-mono font-bold text-rose-400';
        }
      }
    }
"""

# Replace script part for Module 1
js_pattern = r'/\* =========================================================================\s*6\. MODULE 1.*?window\.speechSynthesis\.onvoiceschanged'
match_js = re.search(js_pattern, html, flags=re.DOTALL)
if match_js:
    html = html[:match_js.start()] + new_js_logic.strip() + '\n\n    // Voice Auto-Detection update\n    if (\'speechSynthesis\' in window) {\n      window.speechSynthesis.onvoiceschanged' + html[match_js.end():]
else:
    # Append before </script>
    html = html.replace('</script>\n</body>', new_js_logic + '\n  </script>\n</body>')

with open(index_path, "w", encoding="utf-8") as f:
    f.write(html)

with open(desktop_path, "w", encoding="utf-8") as f:
    f.write(html)

print(f"Master Module 1 Upgrade Complete! {len(html)} bytes written to {index_path} and synchronized to {desktop_path}")
