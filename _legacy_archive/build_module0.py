import os

output_file = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/index.html"
desktop_file = "/Users/volodymyrkatasonov/Desktop/Islenskukennsla_A1_B2.html"

# Define the 33 alphabet items explicitly:
letters_data = [
    ("A", "a", "[a]", "Afi", "дідусь", "звичайний відкритий голосний"),
    ("Á", "á", "[au]", "Á", "річка / на", "дифтонг, звучить як [au]"),
    ("B", "b", "[be]", "Bók", "книга", "глухий придиховий [p/b]"),
    ("D", "d", "[de]", "Dagur", "день", "глухий ясенний [t/d]"),
    ("Ð", "ð", "[eð]", "Maður", "людина / чоловік", "дзвінкий щілинний, ніколи не стоїть на початку слова"),
    ("E", "e", "[e]", "Egg", "яйце", "короткий відкритий [e]"),
    ("É", "é", "[je]", "Ég", "я", "звучить як [je] з легким йотуванням"),
    ("F", "f", "[eff]", "Fjall", "гора", "на початку [f], у середині між голосними [v], перед l/n [p]"),
    ("G", "g", "[ge]", "Gata", "вулиця", "на початку [k/g], між голосними часто як м'який [gh]"),
    ("H", "h", "[ha]", "Hús", "будинок", "чіткий гортанний придих"),
    ("I", "i", "[i]", "Ísland", "Ісландія", "короткий відкритий звук [ɪ]"),
    ("Í", "í", "[i:]", "Ís", "лід / морозиво", "довгий напружений звук [i:]"),
    ("J", "j", "[joð]", "Jú", "так (у відповідь на заперечення)", "напівголосний [j]"),
    ("K", "k", "[ka]", "Kaffi", "кава", "глухий з сильним придихом [kʰ]"),
    ("L", "l", "[ell]", "Lampa", "лампа", "ясенний боковий, у сполученні ll звучить як [tl]"),
    ("M", "m", "[emm]", "Mamma", "мама", "губний носовий"),
    ("N", "n", "[enn]", "Nafn", "ім'я", "носовий ясенний, у сполученні nn як [tn]"),
    ("O", "o", "[o]", "Oft", "часто", "короткий огублений [ɔ]"),
    ("Ó", "ó", "[ou]", "Óskar", "Оскар", "дифтонг, звучить як [ou]"),
    ("P", "p", "[pe]", "Penni", "ручка", "глухий губний з придихом [pʰ]"),
    ("R", "r", "[err]", "Rigning", "дощ", "яскравий альвеолярний дрижачий [r]"),
    ("S", "s", "[ess]", "Sól", "сонце", "завжди глухий свистячий [s]"),
    ("T", "t", "[te]", "Takk", "дякую", "глухий ясенний з придихом [tʰ]"),
    ("U", "u", "[u]", "Ull", "вовна", "огублений передній/середній [ʏ]"),
    ("Ú", "ú", "[u:]", "Út", "назовні", "глибокий довгий огублений [u:]"),
    ("V", "v", "[vaff]", "Vatn", "вода", "губно-зубний дзвінкий [v]"),
    ("X", "x", "[ex]", "Lax", "лосось", "глухе сполучення [ks]"),
    ("Y", "y", "[i]", "Einkunn", "оцінка", "фонетично ідентична до I [ɪ]"),
    ("Ý", "ý", "[i:]", "Ýsa", "пікша", "фонетично ідентична до Í [i:]"),
    ("Z", "z", "[seta]", "Zeta", "зета", "історична літера (замінена на S, звучить як [s])"),
    ("Þ", "þ", "[þorn]", "Þing", "парламент / альтинг", "глухий щілинний, зустрічається ТІЛЬКИ на початку слів"),
    ("Æ", "æ", "[ai]", "Ætla", "мати намір", "широкий дифтонг [ai]"),
    ("Ö", "ö", "[ö]", "Öld", "століття / епоха", "огублений передній голосний [œ]")
]

# Generate Alphabet Cards HTML
alphabet_cards_html = []
for idx, (upper, lower, ipa, word, ukr, desc) in enumerate(letters_data, start=1):
    is_special = upper in ['Á', 'É', 'Í', 'Ó', 'Ú', 'Ý', 'Ð', 'Þ', 'Æ', 'Ö']
    special_classes = "border-neon-coral/50 bg-neon-coral/10" if is_special else "border-cyber-border/40 bg-cyber-deep/80"
    if upper in ['Ð', 'Þ', 'Æ', 'Ö']:
        special_classes = "border-neon-amber/70 bg-neon-amber/15 shadow-lg shadow-neon-amber/15"

    card = f"""          <!-- Letter {idx}: {upper} {lower} -->
          <div onclick="playLetterSound('{upper}', this); selectLetter('{upper} {lower}', '{ipa}', '{word}', '{ukr}', '{desc}')"
               class="letter-card relative p-4 rounded-2xl {special_classes} border hover:border-neon-amber hover:scale-105 hover:shadow-2xl hover:shadow-neon-amber/20 transition-all duration-200 cursor-pointer flex flex-col items-center justify-between group">
            <span class="absolute top-2.5 right-2.5 text-[10px] font-mono font-bold text-slate-500 group-hover:text-neon-amber">#{idx:02d}</span>
            <div class="text-2xl sm:text-3xl font-black text-white group-hover:text-neon-amber transition-colors font-mono mt-1">
              {upper} <span class="text-xl sm:text-2xl text-slate-400 group-hover:text-amber-200">{lower}</span>
            </div>
            <div class="mt-2 text-xs font-mono font-bold text-neon-coral bg-cyber-void/70 px-2.5 py-0.5 rounded-md border border-neon-coral/30 tracking-wider">
              {ipa}
            </div>
            <div class="mt-2.5 text-center w-full pt-2 border-t border-cyber-border/20">
              <span class="text-xs font-bold text-slate-200 group-hover:text-white">{word}</span>
              <span class="block text-[11px] text-slate-400 truncate font-sans">({ukr})</span>
            </div>
          </div>"""
    alphabet_cards_html.append(card)

alphabet_grid_str = "\n".join(alphabet_cards_html)

full_html = f"""<!DOCTYPE html>
<html lang="uk" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Íslenskukennsla ⚡ WARM NEON: Module 0 (Stafrófið & Framburður)</title>

  <!-- Typography: Plus Jakarta Sans & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <script>
    tailwind.config = {{
      darkMode: 'class',
      theme: {{
        extend: {{
          fontFamily: {{
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          }},
          colors: {{
            cyber: {{
              void: '#06040A',
              deep: '#0E0716',
              panel: 'rgba(20, 10, 32, 0.85)',
              border: 'rgba(255, 140, 0, 0.35)',
              borderGlow: '#FF8C00',
            }},
            neon: {{
              amber: '#FFB800',
              coral: '#FF5E00',
              rose: '#FF2A6D',
              violet: '#9D00FF',
              purple: '#B026FF',
              crimson: '#FF0055',
            }}
          }}
        }}
      }}
    }};
  </script>

  <style>
    /* Warm Neon Cyberpunk Aesthetics */
    body {{
      background: radial-gradient(circle at 50% -10%, #1c0b30 0%, #0e0716 45%, #06040a 100%);
      color: #F8FAFC;
      min-height: 100vh;
      overflow-x: hidden;
    }}

    /* Ambient Warm Grid Lines */
    .bg-warm-grid {{
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, rgba(255, 140, 0, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 42, 109, 0.04) 1px, transparent 1px);
    }}

    /* Translucent Glass Panels */
    .warm-glass-panel {{
      background: rgba(20, 10, 32, 0.85);
      border: 1px solid rgba(255, 140, 0, 0.35);
      box-shadow: 0 0 20px rgba(255, 184, 0, 0.15);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-radius: 20px;
      transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    }}

    .warm-glass-panel:hover {{
      border-color: #FFB800;
      box-shadow: 0 0 28px rgba(255, 184, 0, 0.28), inset 0 0 15px rgba(255, 140, 0, 0.08);
    }}

    .warm-nav {{
      background: rgba(10, 5, 18, 0.92);
      border-bottom: 1px solid rgba(255, 140, 0, 0.35);
      box-shadow: 0 4px 25px rgba(255, 94, 0, 0.20);
      backdrop-filter: blur(20px);
    }}

    /* 3D Tactile Buttons */
    .btn-warm-3d {{
      background: linear-gradient(135deg, #FFB800 0%, #FF5E00 100%);
      color: #06040A;
      box-shadow: 0 4px 0 #B23D00, 0 0 20px rgba(255, 184, 0, 0.35);
      transition: all 0.15s ease;
    }}
    .btn-warm-3d:hover {{
      transform: translateY(-2px);
      box-shadow: 0 6px 0 #B23D00, 0 0 25px rgba(255, 184, 0, 0.55);
    }}
    .btn-warm-3d:active {{
      transform: translateY(2px);
      box-shadow: 0 2px 0 #B23D00, 0 0 12px rgba(255, 184, 0, 0.3);
    }}

    .btn-outline-warm {{
      background: rgba(20, 10, 32, 0.7);
      border: 1px solid rgba(255, 184, 0, 0.5);
      color: #FFB800;
      transition: all 0.2s ease;
    }}
    .btn-outline-warm:hover {{
      background: rgba(255, 184, 0, 0.15);
      border-color: #FFB800;
      color: #FFF;
      box-shadow: 0 0 15px rgba(255, 184, 0, 0.3);
    }}

    /* Pulse animation classes */
    .pulse-playing {{
      ring-width: 4px !important;
      border-color: #FFB800 !important;
      box-shadow: 0 0 30px rgba(255, 184, 0, 0.75), inset 0 0 20px rgba(255, 94, 0, 0.4) !important;
      transform: scale(1.05) !important;
    }}
  </style>
</head>

<body class="bg-warm-grid text-slate-100 antialiased selection:bg-neon-amber selection:text-cyber-void">

  <!-- Interactive 3D Canvas Background -->
  <canvas id="warm-canvas" class="fixed inset-0 pointer-events-none z-0 opacity-40"></canvas>

  <!-- ========================================================================= -->
  <!-- 1. NAVIGATION BAR & SYSTEM CONTROLLER                                     -->
  <!-- ========================================================================= -->
  <nav class="sticky top-0 z-50 warm-nav px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      
      <!-- Brand Logo -->
      <a href="#" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-amber via-neon-coral to-neon-rose p-[1px] shadow-lg shadow-neon-amber/20 group-hover:shadow-neon-amber/40 transition-all">
          <div class="w-full h-full bg-cyber-void rounded-[11px] flex items-center justify-center">
            <span class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-neon-amber to-neon-coral">Í</span>
          </div>
        </div>
        <div>
          <span class="text-base sm:text-lg font-black tracking-wider text-white font-mono flex items-center gap-2">
            Íslenskukennsla <span class="text-neon-amber animate-pulse">⚡</span> <span class="text-xs uppercase px-2 py-0.5 rounded bg-neon-coral/20 text-neon-coral font-sans font-bold border border-neon-coral/40">WARM NEON</span>
          </span>
          <span class="text-[11px] text-slate-400 block font-mono">Módúll 0 • Stafrófið &amp; Framburður (День 1): Абетка, Фонетика &amp; Перший діалог</span>
        </div>
      </a>

      <!-- Controls & Audio Badge -->
      <div class="flex items-center gap-3">
        <!-- Voice Status Badge -->
        <div id="male-voice-badge-nav" class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-deep/90 border border-cyber-border text-xs font-mono text-neon-amber shadow-sm">
          <span class="w-2.5 h-2.5 rounded-full bg-neon-amber animate-ping"></span>
          <span id="voice-name-label">🎙️ Ісландський диктор (is-IS • 0.80x • 0.88p)</span>
        </div>

        <!-- Language Pill -->
        <div class="flex items-center bg-cyber-deep/95 p-1 rounded-xl border border-cyber-border/70 text-xs font-mono">
          <span class="px-2.5 py-1 rounded-lg bg-neon-amber text-cyber-void font-black shadow">IS</span>
          <span class="px-2.5 py-1 text-slate-300 font-bold">UK</span>
        </div>
      </div>

    </div>
  </nav>

  <!-- ========================================================================= -->
  <!-- HERO HEADER: MODULE 0 OVERVIEW                                            -->
  <!-- ========================================================================= -->
  <header class="relative z-10 pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div class="warm-glass-panel p-6 sm:p-10 border border-cyber-border relative overflow-hidden">
      <!-- Glow ambient decorative orb -->
      <div class="absolute -right-20 -top-20 w-80 h-80 bg-neon-amber/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -left-20 -bottom-20 w-80 h-80 bg-neon-rose/15 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10 max-w-3xl">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber text-xs font-mono font-bold tracking-wider uppercase mb-4">
          <span>🇮🇸 MÓDÚLL 0</span> • <span>STAFRÓFIÐ &amp; FRAMBURÐUR</span> • <span>ДЕНЬ 1</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Ісландська абетка, фонетика та перше знайомство
        </h1>
        <p class="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
          Комплексний ввідний модуль для першого дня вивчення: 32 офіційні літери ісландського правопису (плюс традиційна <span class="font-mono text-neon-amber">Z</span>), 4 базові фонетичні пастки ісландської вимови та перший практичний діалог знайомства.
        </p>

        <!-- Quick Jump Buttons -->
        <div class="mt-6 flex flex-wrap items-center gap-3">
          <a href="#alphabet" class="px-4 py-2 rounded-xl btn-warm-3d text-xs font-bold flex items-center gap-2">
            <span>🔤 32 літери абетки</span>
          </a>
          <a href="#traps" class="px-4 py-2 rounded-xl btn-outline-warm text-xs font-bold flex items-center gap-2">
            <span>🧩 4 фонетичні пастки</span>
          </a>
          <a href="#dialogue" class="px-4 py-2 rounded-xl btn-outline-warm text-xs font-bold flex items-center gap-2">
            <span>💬 Перший діалог</span>
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- ========================================================================= -->
  <!-- 2. FULL 32-LETTER ALPHABET GRID                                           -->
  <!-- ========================================================================= -->
  <section id="alphabet" class="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div class="warm-glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-cyber-border/40 gap-4 mb-8">
        <div>
          <span class="text-xs font-mono font-bold text-neon-amber tracking-widest uppercase">Íslenska stafrófið (32 stafir)</span>
          <h2 class="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-3">
            <span>🔤 Повна ісландська абетка</span>
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            Натисніть на будь-яку картку літери для відтворення автентичної ісландської вимови диктором.
          </p>
        </div>

        <div class="flex items-center gap-2 self-start md:self-auto">
          <span class="text-xs text-slate-400 font-mono">Швидкість:</span>
          <span class="px-2.5 py-1 rounded-lg bg-cyber-deep border border-neon-amber/40 text-neon-amber font-mono text-xs font-bold">0.80x (Phonetic tempo)</span>
        </div>
      </div>

      <!-- 32+1 Letter Cards Grid (Generated explicitly in HTML) -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
{alphabet_grid_str}
      </div>

      <!-- Selected Letter Interactive Inspector Bar -->
      <div id="inspector-panel" class="mt-10 p-6 rounded-2xl bg-cyber-deep/95 border border-neon-amber/50 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-5 w-full lg:w-auto">
          <div id="inspector-char" class="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-amber/20 to-neon-coral/20 border-2 border-neon-amber flex items-center justify-center text-4xl sm:text-5xl font-black text-neon-amber font-mono shadow-lg shadow-neon-amber/20 flex-shrink-0">
            A a
          </div>
          <div class="space-y-1">
            <div class="flex items-center gap-3">
              <span id="inspector-ipa" class="text-base font-mono font-bold text-neon-coral bg-cyber-void px-3 py-0.5 rounded border border-neon-coral/40">[a]</span>
              <span id="inspector-name-desc" class="text-xs font-mono text-amber-200/80">звичайний відкритий голосний</span>
            </div>
            <div class="text-sm text-slate-200 font-sans">
              Зразок у слові: <strong id="inspector-word" class="text-white text-base font-bold font-mono">Afi</strong> 
              (<span id="inspector-trans" class="text-slate-300">дідусь</span>)
            </div>
          </div>
        </div>

        <!-- Inspector Action Buttons -->
        <div class="flex items-center gap-3 w-full lg:w-auto justify-end flex-wrap">
          <button id="inspector-btn-letter" onclick="playCurrentInspectorLetter(this)" class="px-5 py-3 rounded-xl btn-warm-3d text-xs font-bold flex items-center gap-2">
            <span>🔊 Озвучити літеру</span>
          </button>
          <button id="inspector-btn-word" onclick="playCurrentInspectorWord(this)" class="px-5 py-3 rounded-xl btn-outline-warm text-xs font-bold flex items-center gap-2">
            <span>🗣️ Озвучити приклад: <span id="inspector-btn-word-label" class="font-bold">Afi</span></span>
          </button>
        </div>
      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 3. FRAMBURÐARÞJÁLFUN (4 PHONETIC TRAPS)                                    -->
  <!-- ========================================================================= -->
  <section id="traps" class="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div class="warm-glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl">
      
      <div class="pb-6 border-b border-cyber-border/40 mb-8">
        <span class="text-xs font-mono font-bold text-neon-coral tracking-widest uppercase">Framburðarþjálfun (4 reglur)</span>
        <h2 class="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-3">
          <span>🧩 4 головні фонетичні пастки ісландської мови</span>
        </h2>
        <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
          Клацніть на будь-яку картку правила, щоб почути правильну артикуляцію слів і звукових перетворень.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Trap 1: ll -> [tl] -->
        <div onclick="playLetterSound('Kolla Eyjafjallajökull', this)" class="trap-card p-6 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-neon-amber/40 hover:border-neon-amber cursor-pointer transition-all duration-200 group">
          <div class="flex items-center justify-between mb-3">
            <span class="text-base sm:text-lg font-bold text-neon-amber group-hover:text-white transition-colors">1. Подвійне 'll' ➔ [tl]</span>
            <span class="px-2.5 py-1 rounded bg-neon-amber/20 border border-neon-amber/40 text-neon-amber font-mono text-xs font-bold">🔊 [tl]</span>
          </div>
          <p class="text-base font-mono font-bold text-white mb-2">
            Kolla <span class="text-neon-amber">[kotla]</span> • Eyjafjallajökull <span class="text-neon-amber">[eiia-fyatla-yökutl]</span>
          </p>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Случний боковий звук: перед подвійним <span class="font-mono text-neon-amber">L</span> утворюється виразне глухе змикання язика <span class="font-mono text-neon-amber font-bold">[tl]</span>. Ніколи не вимовляйте м'яке подвійне «лл».
          </p>
        </div>

        <!-- Trap 2: nn -> [tn] -->
        <div onclick="playLetterSound('Einn Steinn', this)" class="trap-card p-6 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-neon-coral/40 hover:border-neon-coral cursor-pointer transition-all duration-200 group">
          <div class="flex items-center justify-between mb-3">
            <span class="text-base sm:text-lg font-bold text-neon-coral group-hover:text-white transition-colors">2. Подвійне 'nn' ➔ [tn]</span>
            <span class="px-2.5 py-1 rounded bg-neon-coral/20 border border-neon-coral/40 text-neon-coral font-mono text-xs font-bold">🔊 [tn]</span>
          </div>
          <p class="text-base font-mono font-bold text-white mb-2">
            Einn <span class="text-neon-coral">[eitn]</span> • Steinn <span class="text-neon-coral">[steitn]</span>
          </p>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Після наголошених голосних та дифтонгів (á, é, í, ó, ú, ý, æ, au, ei, ey) подвійне <span class="font-mono text-neon-coral">NN</span> переходить у пре-носовий звук <span class="font-mono text-neon-coral font-bold">[tn]</span>.
          </p>
        </div>

        <!-- Trap 3: fn / fl -> [pn / pl] -->
        <div onclick="playLetterSound('Hafnarfjörður Afl', this)" class="trap-card p-6 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-neon-purple/40 hover:border-neon-purple cursor-pointer transition-all duration-200 group">
          <div class="flex items-center justify-between mb-3">
            <span class="text-base sm:text-lg font-bold text-neon-purple group-hover:text-white transition-colors">3. Сполучення 'fn / fl' ➔ [pn / pl]</span>
            <span class="px-2.5 py-1 rounded bg-neon-purple/20 border border-neon-purple/40 text-neon-purple font-mono text-xs font-bold">🔊 [pn / pl]</span>
          </div>
          <p class="text-base font-mono font-bold text-white mb-2">
            Hafnarfjörður <span class="text-neon-purple">[hapnar-]</span> • Afl <span class="text-neon-purple">[apl]</span>
          </p>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Буква <span class="font-mono text-neon-purple">F</span> перед <span class="font-mono text-neon-purple">N</span> та <span class="font-mono text-neon-purple">L</span> оглушується і переходить у губний звук <span class="font-mono text-neon-purple font-bold">[p]</span>: <em class="text-white">nafn</em> читається як <span class="font-mono text-neon-purple">[napn]</span>.
          </p>
        </div>

        <!-- Trap 4: Preaspiration [h] -->
        <div onclick="playLetterSound('Takk Ætla', this)" class="trap-card p-6 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-neon-rose/40 hover:border-neon-rose cursor-pointer transition-all duration-200 group">
          <div class="flex items-center justify-between mb-3">
            <span class="text-base sm:text-lg font-bold text-neon-rose group-hover:text-white transition-colors">4. Преаспірація (придих [h])</span>
            <span class="px-2.5 py-1 rounded bg-neon-rose/20 border border-neon-rose/40 text-neon-rose font-mono text-xs font-bold">🔊 [h]</span>
          </div>
          <p class="text-base font-mono font-bold text-white mb-2">
            Takk <span class="text-neon-rose">[ta-hk]</span> • Ætla <span class="text-neon-rose">[ai-htla]</span>
          </p>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Перед подвійними <span class="font-mono text-neon-rose">pp, tt, kk</span> та сполученнями з іншими приголосними утворюється характерний гортанний придих — мікропауза <span class="font-mono text-neon-rose font-bold">[h]</span>.
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 4. FYRSTA SAMTALIÐ (FIRST DIALOGUE)                                       -->
  <!-- ========================================================================= -->
  <section id="dialogue" class="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
    <div class="warm-glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl">
      
      <!-- Dialogue Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cyber-border/40 mb-8">
        <div>
          <span class="text-xs font-mono font-bold text-neon-amber tracking-widest uppercase">Að kynnast (Знайомство)</span>
          <h2 class="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-3">
            <span>💬 Перший діалог: Jón & Anna</span>
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            Клацніть на репліку для індивідуального прослуховування або запустіть повний діалог.
          </p>
        </div>

        <button id="play-full-dialogue-btn" onclick="playFullDialogue()" class="px-6 py-3 rounded-xl btn-warm-3d text-xs font-black flex items-center gap-2 self-start sm:self-auto shadow-lg">
          <span>▶️ Слухати весь діалог (Spila allt samtalið)</span>
        </button>
      </div>

      <!-- Dialogue Bubbles Container -->
      <div class="space-y-4 max-w-3xl mx-auto">
        
        <!-- Line 1: Jón -->
        <div id="dialogue-line-1" onclick="playLetterSound('Sæll! Hvað heitir þú?', this)" class="dialogue-item p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-4 group">
          <div class="w-11 h-11 rounded-full bg-neon-amber/25 border border-neon-amber/50 text-neon-amber flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">
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
            <p class="text-xs sm:text-sm text-amber-200/90 mt-1 font-sans">
              <span class="font-mono text-neon-coral">[Saitl! Hvað heitir þu?]</span> • Вітаю! Як тебе звати?
            </p>
          </div>
        </div>

        <!-- Line 2: Anna -->
        <div id="dialogue-line-2" onclick="playLetterSound('Sæl! Ég heiti Anna. Hvaðan ert þú?', this)" class="dialogue-item p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-neon-rose cursor-pointer transition-all flex items-start gap-4 group ml-3 sm:ml-8">
          <div class="w-11 h-11 rounded-full bg-neon-rose/25 border border-neon-rose/50 text-neon-rose flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">
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
            <p class="text-xs sm:text-sm text-amber-200/90 mt-1 font-sans">
              <span class="font-mono text-neon-coral">[Sail! Jeg heiti Anna. Hvaðan ert þu?]</span> • Вітаю! Мене звати Анна. Звідки ти?
            </p>
          </div>
        </div>

        <!-- Line 3: Jón -->
        <div id="dialogue-line-3" onclick="playLetterSound('Ég er frá Íslandi. En þú?', this)" class="dialogue-item p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-4 group">
          <div class="w-11 h-11 rounded-full bg-neon-amber/25 border border-neon-amber/50 text-neon-amber flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">
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
            <p class="text-xs sm:text-sm text-amber-200/90 mt-1 font-sans">
              <span class="font-mono text-neon-coral">[Jeg er fra Islandi. En þu?]</span> • Я з Ісландії. А ти?
            </p>
          </div>
        </div>

        <!-- Line 4: Anna -->
        <div id="dialogue-line-4" onclick="playLetterSound('Ég er frá Úkraínu. Gaman að hitta þig!', this)" class="dialogue-item p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-neon-rose cursor-pointer transition-all flex items-start gap-4 group ml-3 sm:ml-8">
          <div class="w-11 h-11 rounded-full bg-neon-rose/25 border border-neon-rose/50 text-neon-rose flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">
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
            <p class="text-xs sm:text-sm text-amber-200/90 mt-1 font-sans">
              <span class="font-mono text-neon-coral">[Jeg er fra Ukrainu. Gaman að hitta þig!]</span> • Я з України. Приємно познайомитися!
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 5. ROADMAP: ФІКСОВАНИЙ ПЛАН НАШИХ НАСТУПНИХ КРОКІВ                         -->
  <!-- ========================================================================= -->
  <section id="roadmap" class="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
    <div class="warm-glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl">
      <div class="pb-6 border-b border-cyber-border/40 mb-8">
        <span class="text-xs font-mono font-bold text-neon-amber tracking-widest uppercase">Námsáætlun (Навчальний план)</span>
        <h2 class="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-3">
          <span>🗺️ Фіксований план наших наступних кроків</span>
        </h2>
        <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
          Послідовна траєкторія вивчення ісландської мови від першого знайомства до читання академічних текстів за системою BÍN.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        <!-- Step 0: Active / Completed -->
        <div class="p-5 rounded-2xl bg-cyber-deep/95 border-2 border-neon-amber shadow-lg shadow-neon-amber/20 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-1 rounded-full bg-neon-amber/20 text-neon-amber text-xs font-mono font-bold border border-neon-amber/40">✓ ПОТОЧНИЙ МОДУЛЬ</span>
              <span class="text-xs font-mono text-slate-400">ДЕНЬ 1</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Módúll 0 (Старт)</h3>
            <p class="text-xs text-slate-300 leading-relaxed font-sans">
              Абетка (32 літери), міжнародна латинська фонетика, 4 пастки вимови, перший діалог знайомства (Jón &amp; Anna).
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-cyber-border/40 flex items-center justify-between text-xs font-mono">
            <span class="text-emerald-400 font-bold">● Активно запущено</span>
            <span class="text-slate-400">100% Complete</span>
          </div>
        </div>

        <!-- Step 1: Next -->
        <div class="p-5 rounded-2xl bg-cyber-deep/80 border border-emerald-500/40 hover:border-emerald-500/70 transition-all flex flex-col justify-between group">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/40">▶ НАСТУПНИЙ КРОК</span>
              <span class="text-xs font-mono text-slate-400">CEFR A1.1</span>
            </div>
            <h3 class="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">Módúll 1: Grunnstig A1.1</h3>
            <p class="text-xs text-slate-300 leading-relaxed font-sans">
              Ситуація «У кав'ярні», числівники 1–4 з узгодженням за трьома родами, Знахідний відмінок (<strong class="text-emerald-400 font-mono">Þolfall - ÞF</strong> 🟢).
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-cyber-border/40 flex items-center justify-between text-xs font-mono">
            <span class="text-amber-400 font-bold">○ Готується до запуску</span>
            <span class="text-slate-400">ÞF фокус</span>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="p-5 rounded-2xl bg-cyber-deep/60 border border-cyber-border/40 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-1 rounded-full bg-cyber-void text-slate-400 text-xs font-mono font-bold border border-cyber-border/40">КРОК 2</span>
              <span class="text-xs font-mono text-slate-400">CEFR A1.2</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Módúll 2: Grunnstig A1.2</h3>
            <p class="text-xs text-slate-300 leading-relaxed font-sans">
              Щоденна рутина, базове синтаксичне правило <strong class="text-neon-coral font-mono">V2</strong>, заперечення <em>ekki</em>, покупки в ісландському магазині.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-cyber-border/40 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>План розробки</span>
            <span>V2 порядок слів</span>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="p-5 rounded-2xl bg-cyber-deep/60 border border-cyber-border/40 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-1 rounded-full bg-cyber-void text-slate-400 text-xs font-mono font-bold border border-cyber-border/40">КРОК 3</span>
              <span class="text-xs font-mono text-slate-400">CEFR A2</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Módúll 3: Grunnstig A2</h3>
            <p class="text-xs text-slate-300 leading-relaxed font-sans">
              Схильні суб'єкти (<em class="text-neon-purple">Óbeint frumlag</em>: mig/mér), подвійні просторові прийменники <em>í / á</em>, минулий час дієслів.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-cyber-border/40 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>План розробки</span>
            <span>ÞGF / ÞF суб'єкти</span>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="p-5 rounded-2xl bg-cyber-deep/60 border border-cyber-border/40 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-1 rounded-full bg-cyber-void text-slate-400 text-xs font-mono font-bold border border-cyber-border/40">КРОК 4</span>
              <span class="text-xs font-mono text-slate-400">CEFR B1</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Módúll 4: Milliþrep B1</h3>
            <p class="text-xs text-slate-300 leading-relaxed font-sans">
              8 класів сильних дієслів (<em class="text-neon-rose">Kennimyndir</em>), сильне та слабке відмінювання прикметників, опозиція <em>sinn</em> vs <em>hans/hennar</em>.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-cyber-border/40 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>План розробки</span>
            <span>4 форми дієслів</span>
          </div>
        </div>

        <!-- Step 5 -->
        <div class="p-5 rounded-2xl bg-cyber-deep/60 border border-cyber-border/40 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-1 rounded-full bg-cyber-void text-slate-400 text-xs font-mono font-bold border border-cyber-border/40">КРОК 5</span>
              <span class="text-xs font-mono text-slate-400">CEFR B2</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Módúll 5: Milliþrep B2</h3>
            <p class="text-xs text-slate-300 leading-relaxed font-sans">
              Умовний спосіб (<em class="text-neon-purple">Viðtengingarháttur</em>), суфіксальний пасивний стан (дієслова на <em>-st</em>), <strong class="text-neon-amber font-mono">BÍN Interlinear Reader</strong>.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-cyber-border/40 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>План розробки</span>
            <span>Академічний BÍN</span>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 6. FOOTER                                                                 -->
  <!-- ========================================================================= -->
  <footer class="py-12 border-t border-cyber-border bg-cyber-void relative z-10 text-xs font-mono text-slate-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="text-lg text-neon-amber">⚡</span>
        <span>Íslenskukennsla WARM NEON &bull; Módúll 0: Stafrófið &amp; Framburður</span>
      </div>
      <div>
        100% академічна українська локалізація та автентичний ісландський синтез звуку.
      </div>
    </div>
  </footer>

  <!-- ========================================================================= -->
  <!-- JAVASCRIPT: WEB SPEECH AUDIO CONTROLLER & CANVAS PARTICLES                -->
  <!-- ========================================================================= -->
  <script>
    /* =========================================================================
       1. 3D WARM SUNSET CYBER CANVAS ANIMATION
       ========================================================================= */
    const canvas = document.getElementById('warm-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const characters = ['Þ', 'Æ', 'Ð', 'Ö', 'Ý', 'Á', 'É', 'Ó', 'Ú', 'Í'];
    const warmColors = [
      'rgba(255, 184, 0, 0.75)',   // Warm Amber Gold
      'rgba(255, 94, 0, 0.75)',    // Sunset Coral
      'rgba(255, 42, 109, 0.70)',  // Neon Rose
      'rgba(176, 38, 255, 0.65)',  // Neon Violet
    ];

    function resizeCanvas() {{
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }}
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class WarmParticle {{
      constructor() {{ this.reset(true); }}
      reset(init = false) {{
        this.char = characters[Math.floor(Math.random() * characters.length)];
        this.x = (Math.random() - 0.5) * canvas.width * 1.5;
        this.y = (Math.random() - 0.5) * canvas.height * 1.5;
        this.z = init ? Math.random() * 800 + 100 : 900;
        this.color = warmColors[Math.floor(Math.random() * warmColors.length)];
        this.size = Math.random() * 12 + 10;
        this.speed = Math.random() * 0.75 + 0.35;
      }}
      update() {{
        this.z -= this.speed;
        if (this.z <= 10) this.reset();
      }}
      draw() {{
        const fov = 400;
        const scale = fov / (fov + this.z);
        const screenX = canvas.width / 2 + this.x * scale;
        const screenY = canvas.height / 2 + this.y * scale;

        if (screenX >= 0 && screenX <= canvas.width && screenY >= 0 && screenY <= canvas.height) {{
          ctx.save();
          ctx.font = `${{this.size * scale}}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 12 * scale;
          ctx.shadowColor = this.color;
          ctx.fillText(this.char, screenX, screenY);
          ctx.restore();
        }}
      }}
    }}

    for (let i = 0; i < 45; i++) {{
      particles.push(new WarmParticle());
    }}

    function animateCanvas() {{
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {{
        p.update();
        p.draw();
      }});
      requestAnimationFrame(animateCanvas);
    }}
    animateCanvas();

    /* =========================================================================
       2. PHONETIC LETTER MAPPING & WEB SPEECH AUDIO CONTROLLER
       ========================================================================= */
    const icelandicLetterNames = {{
      'A': 'a', 'a': 'a',
      'Á': 'á', 'á': 'á',
      'B': 'bé', 'b': 'bé',
      'D': 'dé', 'd': 'dé',
      'Ð': 'eð', 'ð': 'eð',        // Pristine "eð"
      'E': 'e', 'e': 'e',
      'É': 'ég', 'é': 'ég',
      'F': 'eff', 'f': 'eff',      // Pristine "eff"
      'G': 'gé', 'g': 'gé',
      'H': 'há', 'h': 'há',
      'I': 'i', 'i': 'i',
      'Í': 'í', 'í': 'í',
      'J': 'joð', 'j': 'joð',
      'K': 'ká', 'k': 'ká',
      'L': 'ell', 'l': 'ell',
      'M': 'emm', 'm': 'emm',
      'N': 'enn', 'n': 'enn',
      'O': 'o', 'o': 'o',
      'Ó': 'ó', 'ó': 'ó',
      'P': 'pé', 'p': 'pé',
      'R': 'err', 'r': 'err',
      'S': 'ess', 's': 'ess',
      'T': 'té', 't': 'té',
      'U': 'u', 'u': 'u',
      'Ú': 'ú', 'ú': 'ú',
      'V': 'vaff', 'v': 'vaff',    // Pristine "vaff"
      'X': 'ex', 'x': 'ex',
      'Y': 'ufsilon i', 'y': 'ufsilon i',     // Pristine "ufsilon i"
      'Ý': 'ufsilon í', 'ý': 'ufsilon í',     // Pristine "ufsilon í"
      'Z': 'seta', 'z': 'seta',
      'Þ': 'þorn', 'þ': 'þorn',    // Pristine "þorn"
      'Æ': 'æ', 'æ': 'æ',
      'Ö': 'ö', 'ö': 'ö'
    }};

    /**
     * Core Audio & Timing Controller: playLetterSound(letterName, element)
     */
    function playLetterSound(letterName, element) {{
      if (!('speechSynthesis' in window)) {{
        console.warn('SpeechSynthesis API is not supported in this browser.');
        return;
      }}

      window.speechSynthesis.cancel();

      // Clean input & apply phonetic letter mapping for single characters
      const cleanKey = letterName.trim();
      const textToSpeak = icelandicLetterNames[cleanKey] || letterName;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'is-IS';
      utterance.rate = 0.80;  // Academic tempo for phonetic clarity
      utterance.pitch = 0.88; // Deep baritone male pitch adjustment

      // Explicit Icelandic Male Voice Selection
      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(v => v.lang.startsWith('is') && (
        v.name.includes('Karl') || v.name.includes('Gunnar') || v.name.includes('Male') || v.name.includes('Wavenet-B')
      )) || voices.find(v => v.lang.startsWith('is'));

      if (maleVoice) utterance.voice = maleVoice;

      // 2-Second Visual Pulse Animation on Active Element
      if (element) {{
        element.classList.add('pulse-playing', 'ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
        setTimeout(() => {{
          element.classList.remove('pulse-playing', 'ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
        }}, 2000);
      }}

      utterance.onend = () => {{
        if (element) {{
          element.classList.remove('pulse-playing', 'ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
        }}
      }};
      utterance.onerror = () => {{
        if (element) {{
          element.classList.remove('pulse-playing', 'ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
        }}
      }};

      window.speechSynthesis.speak(utterance);
    }}

    // Alias for backward compatibility
    const speakIcelandic = playLetterSound;

    /* =========================================================================
       3. INTERACTIVE INSPECTOR CONTROLLER
       ========================================================================= */
    let currentInspectorLetter = 'A';
    let currentInspectorWord = 'Afi';

    function selectLetter(letterPair, ipa, word, ukr, desc) {{
      document.getElementById('inspector-char').innerText = letterPair;
      document.getElementById('inspector-ipa').innerText = ipa;
      document.getElementById('inspector-word').innerText = word;
      document.getElementById('inspector-trans').innerText = ukr;
      document.getElementById('inspector-name-desc').innerText = desc;
      document.getElementById('inspector-btn-word-label').innerText = word;

      currentInspectorLetter = letterPair.split(' ')[0];
      currentInspectorWord = word;
    }}

    function playCurrentInspectorLetter(btn) {{
      playLetterSound(currentInspectorLetter, btn);
    }}

    function playCurrentInspectorWord(btn) {{
      playLetterSound(currentInspectorWord, btn);
    }}

    /* =========================================================================
       4. SEQUENTIAL DIALOGUE PLAYER
       ========================================================================= */
    let isPlayingDialogue = false;
    async function playFullDialogue() {{
      if (isPlayingDialogue) return;
      isPlayingDialogue = true;
      const btn = document.getElementById('play-full-dialogue-btn');
      if (btn) btn.innerHTML = `<span>⏳ Відтворення діалогу...</span>`;

      const lines = [
        {{ text: 'Sæll! Hvað heitir þú?', id: 'dialogue-line-1' }},
        {{ text: 'Sæl! Ég heiti Anna. Hvaðan ert þú?', id: 'dialogue-line-2' }},
        {{ text: 'Ég er frá Íslandi. En þú?', id: 'dialogue-line-3' }},
        {{ text: 'Ég er frá Úkraínu. Gaman að hitta þig!', id: 'dialogue-line-4' }}
      ];

      for (let i = 0; i < lines.length; i++) {{
        const el = document.getElementById(lines[i].id);
        playLetterSound(lines[i].text, el);
        await new Promise(r => setTimeout(r, 2600));
      }}

      if (btn) btn.innerHTML = `<span>▶️ Слухати весь діалог (Spila allt samtalið)</span>`;
      isPlayingDialogue = false;
    }}

    // Voice Auto-Detection Badge update
    if ('speechSynthesis' in window) {{
      window.speechSynthesis.onvoiceschanged = () => {{
        const voices = window.speechSynthesis.getVoices();
        const v = voices.find(v => v.lang.startsWith('is') && (
          v.name.includes('Karl') || v.name.includes('Gunnar') || v.name.includes('Male') || v.name.includes('Wavenet-B')
        )) || voices.find(v => v.lang.startsWith('is'));
        const label = document.getElementById('voice-name-label');
        if (label && v) {{
          label.innerText = `🎙️ ${{v.name.split(' ')[0]}} (is-IS • 0.80x • 0.88p)`;
        }}
      }};
    }}
  </script>
</body>
</html>"""

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(full_html)

with open(desktop_file, 'w', encoding='utf-8') as f:
    f.write(full_html)

print(f"Generated {output_file} ({len(full_html)} bytes)")
print(f"Synchronized {desktop_file} ({len(full_html)} bytes)")
