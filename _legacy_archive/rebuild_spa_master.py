import os

output_file = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/index.html"
desktop_file = "/Users/volodymyrkatasonov/Desktop/Islenskukennsla_A1_B2.html"

# Alphabet data (33 letters)
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

letter_cards_html = []
for idx, (upper, lower, ipa, word, ukr, desc) in enumerate(letters_data, start=1):
    is_special = upper in ['Á', 'É', 'Í', 'Ó', 'Ú', 'Ý', 'Ð', 'Þ', 'Æ', 'Ö']
    special_cls = "border-neon-coral/50 bg-neon-coral/10" if is_special else "border-amber-500/20 bg-cyber-deep/80"
    if upper in ['Ð', 'Þ', 'Æ', 'Ö']:
        special_cls = "border-neon-amber/70 bg-neon-amber/15 shadow-lg shadow-neon-amber/15"

    card = f"""          <!-- Letter {idx}: {upper} {lower} -->
          <div onclick="playLetterSound('{upper}', this); selectLetter('{upper} {lower}', '{ipa}', '{word}', '{ukr}', '{desc}')"
               class="letter-card relative p-4 rounded-2xl {special_cls} border hover:border-neon-amber hover:scale-105 hover:shadow-2xl hover:shadow-neon-amber/25 transition-all duration-200 cursor-pointer flex flex-col items-center justify-between group">
            <span class="absolute top-2.5 right-2.5 text-[10px] font-mono font-bold text-slate-500 group-hover:text-neon-amber">#{idx:02d}</span>
            <div class="text-2xl sm:text-3xl font-black text-white group-hover:text-neon-amber transition-colors font-mono mt-1">
              {upper} <span class="text-xl sm:text-2xl text-slate-400 group-hover:text-amber-200">{lower}</span>
            </div>
            <div class="mt-2 text-xs font-mono font-bold text-neon-coral bg-cyber-void/80 px-2.5 py-0.5 rounded-md border border-neon-coral/30 tracking-wider">
              {ipa}
            </div>
            <div class="mt-2.5 text-center w-full pt-2 border-t border-amber-500/10">
              <span class="text-xs font-bold text-slate-200 group-hover:text-white">{word}</span>
              <span class="block text-[11px] text-slate-400 truncate font-sans">({ukr})</span>
            </div>
          </div>"""
    letter_cards_html.append(card)

letters_grid_str = "\n".join(letter_cards_html)

full_spa_html = f"""<!DOCTYPE html>
<html lang="uk" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Íslenskukennsla ⚡ WARM NEON: Кіберпанк-платформа ісландської мови (A1–B2)</title>

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
              border: 'rgba(255, 184, 0, 0.35)',
            }},
            neon: {{
              amber: '#FFB800',
              coral: '#FF5E00',
              rose: '#FF2A6D',
              violet: '#9D00FF',
              purple: '#B026FF',
              crimson: '#FF0055',
            }},
            bin: {{
              nf: '#FFB800',
              tf: '#FF5E00',
              tgf: '#B026FF',
              ef: '#FF0055',
            }}
          }}
        }}
      }}
    }};
  </script>

  <!-- EXACT WARM NEON CYBERPUNK STYLES -->
  <style>
    body {{
      background-color: #06040A;
      background-image: linear-gradient(135deg, #06040A 0%, #0E0716 50%, #150A21 100%);
      color: #F8FAFC;
      min-height: 100vh;
      overflow-x: hidden;
    }}

    .bg-warm-grid {{
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, rgba(255, 184, 0, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 42, 109, 0.04) 1px, transparent 1px);
    }}

    /* Master Glass Panel */
    .glass-panel {{
      background: rgba(20, 10, 32, 0.85);
      border: 1px solid rgba(255, 184, 0, 0.35);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 0 25px rgba(255, 184, 0, 0.12);
      border-radius: 20px;
      transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    }}

    .glass-panel:hover {{
      border-color: #FFB800;
      box-shadow: 0 0 30px rgba(255, 184, 0, 0.30);
      transform: translateY(-2px);
    }}

    .warm-nav {{
      background: rgba(10, 5, 18, 0.94);
      border-bottom: 1px solid rgba(255, 184, 0, 0.35);
      box-shadow: 0 4px 25px rgba(255, 94, 0, 0.22);
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

    /* Active speech pulse animation */
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
  <!-- 1. STICKY TOP NAVIGATION BAR & TAB SWITCHER                               -->
  <!-- ========================================================================= -->
  <header class="sticky top-0 z-50 warm-nav px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      <!-- Brand Logo -->
      <div class="flex items-center justify-between">
        <a href="javascript:void(0)" onclick="switchModule('modull-0')" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-amber via-neon-coral to-neon-rose p-[1px] shadow-lg shadow-neon-amber/20 group-hover:shadow-neon-amber/40 transition-all">
            <div class="w-full h-full bg-cyber-void rounded-[11px] flex items-center justify-center">
              <span class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-neon-amber to-neon-coral">Í</span>
            </div>
          </div>
          <div>
            <span class="text-base sm:text-lg font-black tracking-wider text-white font-mono flex items-center gap-2">
              Íslenskukennsla <span class="text-neon-amber animate-pulse">⚡</span> <span class="text-xs uppercase px-2 py-0.5 rounded bg-neon-coral/20 text-neon-coral font-sans font-bold border border-neon-coral/40">WARM NEON</span>
            </span>
            <span class="text-[11px] text-slate-400 block font-mono">Кіберпанк-платформа ісландської мови (A1–B2)</span>
          </div>
        </a>

        <!-- Mobile Audio Pill -->
        <div class="flex md:hidden items-center bg-cyber-deep/95 p-1 rounded-xl border border-neon-amber/40 text-xs font-mono">
          <span class="px-2 py-0.5 rounded-lg bg-neon-amber text-cyber-void font-black">IS</span>
          <span class="px-2 py-0.5 text-slate-300 font-bold">UK</span>
        </div>
      </div>

      <!-- Navigation Tabs (SPA Switcher) -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        <button id="tab-modull-0" onclick="switchModule('modull-0')" class="nav-tab px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 bg-amber-500/30 border-amber-400 text-amber-300 shadow-lg">
          Módúll 0: Stafrófið
        </button>
        <button id="tab-modull-1" onclick="switchModule('modull-1')" class="nav-tab px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 bg-slate-900/60 border-white/10 text-gray-400 hover:text-white hover:border-amber-400/50">
          Módúll 1: Kaffihúsið
        </button>
        <button id="tab-modull-2" onclick="switchModule('modull-2')" class="nav-tab px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 bg-slate-900/60 border-white/10 text-gray-400 hover:text-white hover:border-amber-400/50">
          Módúll 2: Rútína &amp; BÍN
        </button>
        <button id="tab-modull-3" onclick="switchModule('modull-3')" class="nav-tab px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 bg-slate-900/60 border-white/10 text-gray-400 hover:text-white hover:border-amber-400/50">
          Módúll 3: A2
        </button>
        <button id="tab-modull-4" onclick="switchModule('modull-4')" class="nav-tab px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 bg-slate-900/60 border-white/10 text-gray-400 hover:text-white hover:border-amber-400/50">
          Módúll 4: B1
        </button>
        <button id="tab-modull-5" onclick="switchModule('modull-5')" class="nav-tab px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 bg-slate-900/60 border-white/10 text-gray-400 hover:text-white hover:border-amber-400/50">
          Módúll 5: B2
        </button>
      </div>

      <!-- Controls & Status Badge -->
      <div class="hidden lg:flex items-center gap-3">
        <div id="male-voice-badge-nav" class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-deep/90 border border-neon-amber/30 text-xs font-mono text-neon-amber shadow-sm">
          <span class="w-2.5 h-2.5 rounded-full bg-neon-amber animate-ping"></span>
          <span id="voice-name-label">🎙️ Диктор (is-IS • 0.80x • 0.88p)</span>
        </div>
        <div class="flex items-center bg-cyber-deep/95 p-1 rounded-xl border border-neon-amber/40 text-xs font-mono">
          <span class="px-2.5 py-1 rounded-lg bg-neon-amber text-cyber-void font-black shadow">IS</span>
          <span class="px-2.5 py-1 text-slate-300 font-bold">UK</span>
        </div>
      </div>

    </div>
  </header>

  <main class="relative z-10 pt-8 pb-16">

    <!-- ======================================================================= -->
    <!-- SECTION 2: MÓDÚLL 0 (STAFRÓFIÐ & FRAMBURÐUR) — DEFAULT ACTIVE           -->
    <!-- ======================================================================= -->
    <section id="modull-0" class="module-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Module 0 Hero Banner -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border relative overflow-hidden">
        <div class="absolute -right-20 -top-20 w-80 h-80 bg-neon-amber/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <span>🇮🇸 MÓDÚLL 00</span> • <span>STAFRÓFIÐ &amp; FRAMBURÐUR</span> • <span>ДЕНЬ 1</span>
          </div>
          <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ісландська абетка, фонетика та перше знайомство
          </h1>
          <p class="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Комплексний ввідний модуль для першого дня вивчення: 32 офіційні літери ісландського правопису (плюс традиційна <span class="font-mono text-neon-amber">Z</span>), 4 базові фонетичні пастки ісландської вимови та перший практичний діалог знайомства.
          </p>
        </div>
      </div>

      <!-- 32 Letters Grid -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl">
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
            <span class="text-xs text-slate-400 font-mono">Темп вимови:</span>
            <span class="px-2.5 py-1 rounded-lg bg-cyber-deep border border-neon-amber/40 text-neon-amber font-mono text-xs font-bold">0.80x (Phonetic tempo)</span>
          </div>
        </div>

        <!-- 32+1 Letter Cards Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
{letters_grid_str}
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

      <!-- 4 Phonetic Traps -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl">
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
          <!-- Trap 1 -->
          <div onclick="playLetterSound('Kolla Eyjafjallajökull', this)" class="p-6 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-neon-amber/40 hover:border-neon-amber cursor-pointer transition-all duration-200 group">
            <div class="flex items-center justify-between mb-3">
              <span class="text-base sm:text-lg font-bold text-neon-amber group-hover:text-white transition-colors">1. Подвійне 'll' ➔ [tl]</span>
              <span class="px-2.5 py-1 rounded bg-neon-amber/20 border border-neon-amber/40 text-neon-amber font-mono text-xs font-bold">🔊 [tl]</span>
            </div>
            <p class="text-base font-mono font-bold text-white mb-2">
              Kolla <span class="text-neon-amber">[kotla]</span> • Eyjafjallajökull <span class="text-neon-amber">[eiia-fyatla-yökutl]</span>
            </p>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Случний боковий звук: перед подвійним <span class="font-mono text-neon-amber">L</span> утворюється виразне глухе змикання язика <span class="font-mono text-neon-amber font-bold">[tl]</span>.
            </p>
          </div>

          <!-- Trap 2 -->
          <div onclick="playLetterSound('Einn Steinn', this)" class="p-6 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-neon-coral/40 hover:border-neon-coral cursor-pointer transition-all duration-200 group">
            <div class="flex items-center justify-between mb-3">
              <span class="text-base sm:text-lg font-bold text-neon-coral group-hover:text-white transition-colors">2. Подвійне 'nn' ➔ [tn]</span>
              <span class="px-2.5 py-1 rounded bg-neon-coral/20 border border-neon-coral/40 text-neon-coral font-mono text-xs font-bold">🔊 [tn]</span>
            </div>
            <p class="text-base font-mono font-bold text-white mb-2">
              Einn <span class="text-neon-coral">[eitn]</span> • Steinn <span class="text-neon-coral">[steitn]</span>
            </p>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Після наголошених голосних та дифтонгів подвійне <span class="font-mono text-neon-coral">NN</span> переходить у пре-носовий звук <span class="font-mono text-neon-coral font-bold">[tn]</span>.
            </p>
          </div>

          <!-- Trap 3 -->
          <div onclick="playLetterSound('Hafnarfjörður Afl', this)" class="p-6 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-neon-purple/40 hover:border-neon-purple cursor-pointer transition-all duration-200 group">
            <div class="flex items-center justify-between mb-3">
              <span class="text-base sm:text-lg font-bold text-neon-purple group-hover:text-white transition-colors">3. Сполучення 'fn / fl' ➔ [pn / pl]</span>
              <span class="px-2.5 py-1 rounded bg-neon-purple/20 border border-neon-purple/40 text-neon-purple font-mono text-xs font-bold">🔊 [pn / pl]</span>
            </div>
            <p class="text-base font-mono font-bold text-white mb-2">
              Hafnarfjörður <span class="text-neon-purple">[hapnar-]</span> • Afl <span class="text-neon-purple">[apl]</span>
            </p>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Буква <span class="font-mono text-neon-purple">F</span> перед <span class="font-mono text-neon-purple">N</span> та <span class="font-mono text-neon-purple">L</span> оглушується і переходить у губний звук <span class="font-mono text-neon-purple font-bold">[p]</span>: <em>nafn</em> звучить як <span class="font-mono text-neon-purple">[napn]</span>.
            </p>
          </div>

          <!-- Trap 4 -->
          <div onclick="playLetterSound('Takk Ætla', this)" class="p-6 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-neon-rose/40 hover:border-neon-rose cursor-pointer transition-all duration-200 group">
            <div class="flex items-center justify-between mb-3">
              <span class="text-base sm:text-lg font-bold text-neon-rose group-hover:text-white transition-colors">4. Преаспірація (придих [h])</span>
              <span class="px-2.5 py-1 rounded bg-neon-rose/20 border border-neon-rose/40 text-neon-rose font-mono text-xs font-bold">🔊 [h]</span>
            </div>
            <p class="text-base font-mono font-bold text-white mb-2">
              Takk <span class="text-neon-rose">[ta-hk]</span> • Ætla <span class="text-neon-rose">[ai-htla]</span>
            </p>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Перед подвійними <span class="font-mono text-neon-rose">pp, tt, kk</span> виникає характерний гортанний придих — мікропауза <span class="font-mono text-neon-rose font-bold">[h]</span>.
            </p>
          </div>
        </div>
      </div>

      <!-- Dialogue 1: Jón & Anna -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cyber-border/40 mb-8">
          <div>
            <span class="text-xs font-mono font-bold text-neon-amber tracking-widest uppercase">Að kynnast (Знайомство)</span>
            <h2 class="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-3">
              <span>💬 Перший ситуативний діалог: Jón &amp; Anna</span>
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
              Клацніть на репліку для індивідуального прослуховування або запустіть автопрогравання.
            </p>
          </div>
          <button id="play-full-dialogue-btn" onclick="playFullDialogue()" class="px-6 py-3 rounded-xl btn-warm-3d text-xs font-black flex items-center gap-2 self-start sm:self-auto shadow-lg">
            <span>▶️ Слухати весь діалог (Spila allt samtalið)</span>
          </button>
        </div>

        <div class="space-y-4 max-w-3xl mx-auto">
          <!-- Line 1 -->
          <div id="dialogue-line-1" onclick="playLetterSound('Sæll! Hvað heitir þú?', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-4 group">
            <div class="w-11 h-11 rounded-full bg-neon-amber/25 border border-neon-amber/50 text-neon-amber flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">👨</div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-neon-amber">👨 Jón (Йон)</span>
                <span class="text-xs text-neon-amber font-mono">🔊 0:02</span>
              </div>
              <p class="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-neon-amber transition-colors font-mono">
                Sæll! Hvað heitir þú?
              </p>
              <p class="text-xs sm:text-sm text-amber-200/90 mt-1 font-sans">
                <span class="font-mono text-neon-coral">[Saitl! Hvað heitir þu?]</span> • Вітаю! Як тебе звати?
              </p>
            </div>
          </div>

          <!-- Line 2 -->
          <div id="dialogue-line-2" onclick="playLetterSound('Sæl! Ég heiti Anna. Hvaðan ert þú?', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-neon-rose cursor-pointer transition-all flex items-start gap-4 group ml-3 sm:ml-8">
            <div class="w-11 h-11 rounded-full bg-neon-rose/25 border border-neon-rose/50 text-neon-rose flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">👩</div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-neon-rose">👩 Anna (Анна)</span>
                <span class="text-xs text-neon-rose font-mono">🔊 0:03</span>
              </div>
              <p class="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-neon-rose transition-colors font-mono">
                Sæl! Ég heiti Anna. Hvaðan ert þú?
              </p>
              <p class="text-xs sm:text-sm text-amber-200/90 mt-1 font-sans">
                <span class="font-mono text-neon-coral">[Sail! Jeg heiti Anna. Hvaðan ert þu?]</span> • Вітаю! Мене звати Анна. Звідки ти?
              </p>
            </div>
          </div>

          <!-- Line 3 -->
          <div id="dialogue-line-3" onclick="playLetterSound('Ég er frá Íslandi. En þú?', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-4 group">
            <div class="w-11 h-11 rounded-full bg-neon-amber/25 border border-neon-amber/50 text-neon-amber flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">👨</div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-neon-amber">👨 Jón (Йон)</span>
                <span class="text-xs text-neon-amber font-mono">🔊 0:02</span>
              </div>
              <p class="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-neon-amber transition-colors font-mono">
                Ég er frá Íslandi. En þú?
              </p>
              <p class="text-xs sm:text-sm text-amber-200/90 mt-1 font-sans">
                <span class="font-mono text-neon-coral">[Jeg er fra Islandi. En þu?]</span> • Я з Ісландії. А ти?
              </p>
            </div>
          </div>

          <!-- Line 4 -->
          <div id="dialogue-line-4" onclick="playLetterSound('Ég er frá Úkraínu. Gaman að hitta þig!', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 hover:border-neon-rose cursor-pointer transition-all flex items-start gap-4 group ml-3 sm:ml-8">
            <div class="w-11 h-11 rounded-full bg-neon-rose/25 border border-neon-rose/50 text-neon-rose flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">👩</div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-neon-rose">👩 Anna (Анна)</span>
                <span class="text-xs text-neon-rose font-mono">🔊 0:03</span>
              </div>
              <p class="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-neon-rose transition-colors font-mono">
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

    <!-- ======================================================================= -->
    <!-- SECTION 3: MÓDÚLL 1 (KAFFIHÚSIÐ & ÞOLFALL ÞF) — INITIALLY HIDDEN         -->
    <!-- ======================================================================= -->
    <section id="modull-1" class="module-section hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" style="display:none;">
      
      <!-- Module 1 Header -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border">
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

      <!-- Block 1: Phrase Builder -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-8">
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

        <!-- Situational Dialogue (Þjónn & Gestur) -->
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
            <!-- 7 lines -->
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

      <!-- Block 2: 4x3 Number Gender Agreement Matrix -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-6">
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

      <!-- Block 3: Accusative Case (ÞF) -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-6">
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
          <!-- kk -->
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

          <!-- kvk -->
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

          <!-- hk -->
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

    </section>

    <!-- ======================================================================= -->
    <!-- SECTION 4: MÓDÚLL 2 (RÚTÍNA, V2 & BÍN) — INITIALLY HIDDEN                -->
    <!-- ======================================================================= -->
    <section id="modull-2" class="module-section hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" style="display:none;">
      
      <!-- Module 2 Header -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neon-coral/20 border border-neon-coral/40 text-neon-coral text-xs font-mono font-bold tracking-wider uppercase">
            <span>🇮🇸 MÓDÚLL 02</span> • <span>GRUNNSTIG A1.2</span> • <span>V2-REGLA &amp; BÍN</span>
          </div>
          <span class="px-3 py-1 rounded-lg bg-cyber-deep border border-neon-coral/30 text-neon-coral font-mono text-xs font-bold">
            Практичний рівень: A1.2
          </span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <span>⏰ Módúll 2 • Grunnstig A1.2: Daglegt líf, V2-regla &amp; BÍN</span>
        </h2>
        <p class="mt-2 text-sm sm:text-base text-slate-300 font-sans">
          Щоденна рутина, золоте синтаксичне правило <strong>V2</strong> (дієслово на другій позиції), заперечення <strong>ekki</strong> та 4 відмінки BÍN.
        </p>
      </div>

      <!-- Block 1: V2-Regla (Word Order) -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-6">
        <div>
          <div class="flex items-center gap-2.5 text-neon-amber text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>Málfræði • Orðaröð</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>📐 Правило V2: Дієслово завжди на 2-й позиції</span>
          </h3>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans leading-relaxed">
            В ісландському розповідному реченні відмінюване дієслово <strong>ЗАВЖДИ</strong> займає другу синтаксичну позицію. Якщо речення починається з обставини часу або місця, підмет і дієслово міняються місцями (інверсія: <span class="text-neon-amber font-mono font-bold">Обставина + Дієслово + Підмет</span>).
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Direct Order -->
          <div class="p-6 rounded-2xl bg-cyber-deep/85 border border-cyber-border/50">
            <div class="text-xs font-mono text-slate-400 mb-2 uppercase">1. Прямий порядок (SVO)</div>
            <div onclick="playLetterSound('Ég vakna snemma á morgnana.', this)" class="cursor-pointer group">
              <div class="text-lg font-bold text-white group-hover:text-neon-amber transition-colors font-mono">
                [1. Ég] <span class="text-neon-amber font-black">[2. vakna]</span> snemma á morgnana.
              </div>
              <div class="text-xs text-neon-coral font-mono mt-1">[Jeg vakna snemma au morgnana]</div>
              <p class="text-xs text-slate-300 mt-2 font-sans">
                Підмет (Ég) на 1-му місці, дієслово (vakna) строго на 2-му місці. «Я прокидаюся рано вранці.»
              </p>
            </div>
          </div>

          <!-- Inversion -->
          <div class="p-6 rounded-2xl bg-cyber-deep/85 border border-neon-amber/50">
            <div class="text-xs font-mono text-neon-amber mb-2 uppercase font-bold">2. Інверсія (V2 після обставини)</div>
            <div onclick="playLetterSound('Á morgnana vakna ég snemma.', this)" class="cursor-pointer group">
              <div class="text-lg font-bold text-white group-hover:text-neon-amber transition-colors font-mono">
                [1. Á morgnana] <span class="text-neon-amber font-black">[2. vakna]</span> ég snemma.
              </div>
              <div class="text-xs text-neon-coral font-mono mt-1">[Au morgnana vakna jeg snemma]</div>
              <p class="text-xs text-slate-300 mt-2 font-sans">
                Обставина (Á morgnana) на 1-му місці &rarr; дієслово (vakna) залишається на 2-му місці! «Вранці прокидаюся я рано.»
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Block 2: Negation "ekki" -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-6">
        <div>
          <div class="flex items-center gap-2.5 text-neon-rose text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>Neitun • Ekki</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🚫 Заперечення в ісландській мові: частка „ekki“</span>
          </h3>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans leading-relaxed">
            В ісландській мові немає окремої форми «не». Заперечна частка <strong class="text-neon-rose font-mono">ekki</strong> ставиться <strong>ОДРАЗУ ПІСЛЯ</strong> відмінюваного дієслова (або після підмета при інверсії).
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div onclick="playLetterSound('Ég tala ekki íslensku.', this)" class="p-5 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-neon-rose/40 cursor-pointer transition-all group">
            <div class="text-xs font-mono text-neon-rose font-bold mb-1">Дієслово + ekki</div>
            <div class="text-base font-bold text-white font-mono group-hover:text-neon-rose transition-colors">
              Ég tala <span class="text-neon-rose">ekki</span> íslensku.
            </div>
            <div class="text-xs font-mono text-neon-coral mt-1">[Jeg tala eh-ki islensku]</div>
            <div class="text-xs text-slate-300 mt-2 font-sans">«Я не розмовляю ісландською.»</div>
          </div>

          <div onclick="playLetterSound('Hann er ekki heima.', this)" class="p-5 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-neon-rose/40 cursor-pointer transition-all group">
            <div class="text-xs font-mono text-neon-rose font-bold mb-1">Дієслово vera + ekki</div>
            <div class="text-base font-bold text-white font-mono group-hover:text-neon-rose transition-colors">
              Hann er <span class="text-neon-rose">ekki</span> heima.
            </div>
            <div class="text-xs font-mono text-neon-coral mt-1">[Hann er eh-ki heima]</div>
            <div class="text-xs text-slate-300 mt-2 font-sans">«Його немає вдома.»</div>
          </div>

          <div onclick="playLetterSound('Í dag fer ég ekki í skólann.', this)" class="p-5 rounded-2xl bg-cyber-deep/85 hover:bg-cyber-deep border border-neon-rose/40 cursor-pointer transition-all group">
            <div class="text-xs font-mono text-neon-rose font-bold mb-1">Інверсія + ekki</div>
            <div class="text-base font-bold text-white font-mono group-hover:text-neon-rose transition-colors">
              Í dag fer ég <span class="text-neon-rose">ekki</span>...
            </div>
            <div class="text-xs font-mono text-neon-coral mt-1">[I dag fer jeg eh-ki i skolann]</div>
            <div class="text-xs text-slate-300 mt-2 font-sans">«Сьогодні я не йду до школи.»</div>
          </div>
        </div>
      </div>

      <!-- Block 3: Daily Routine & Shopping Dialogue -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-6">
        <div>
          <div class="flex items-center gap-2.5 text-neon-amber text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>Samtal • Í búðinni</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🛍️ Ситуативний діалог: Покупки в ісландському магазині</span>
          </h3>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            Розрахунок на касі, питання про наявність товару та вартість. Натисніть на репліку для озвучення.
          </p>
        </div>

        <div class="space-y-3.5 max-w-3xl mx-auto">
          <!-- 4 dialogue lines -->
          <div onclick="playLetterSound('Góðan dag! Eigið þið epli?', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
            <div class="w-10 h-10 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber flex items-center justify-center font-bold text-base flex-shrink-0">🛒</div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-neon-amber">Viðskiptavinur (Покупець)</span>
                <span class="text-xs font-mono text-neon-amber">🔊 0:02</span>
              </div>
              <p class="text-base font-bold text-white mt-0.5 group-hover:text-neon-amber transition-colors font-mono">Góðan dag! Eigið þið epli?</p>
              <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans"><span class="font-mono text-neon-coral">[Gooðan dag! Eijið þið epli?]</span> • Доброго дня! Чи є у вас яблука?</p>
            </div>
          </div>

          <div onclick="playLetterSound('Já, við eigum fersk epli hérna.', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex items-start gap-3.5 group ml-3 sm:ml-6">
            <div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-base flex-shrink-0">🏪</div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-emerald-400">Afgreiðslumaður (Продавець)</span>
                <span class="text-xs font-mono text-emerald-400">🔊 0:03</span>
              </div>
              <p class="text-base font-bold text-white mt-0.5 group-hover:text-emerald-400 transition-colors font-mono">Já, við eigum fersk epli hérna.</p>
              <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans"><span class="font-mono text-neon-coral">[Jau, við eijum fersk epli hjerna]</span> • Так, у нас тут є свіжі яблука.</p>
            </div>
          </div>

          <div onclick="playLetterSound('Hvað kostar kílóið?', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-neon-amber cursor-pointer transition-all flex items-start gap-3.5 group">
            <div class="w-10 h-10 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber flex items-center justify-center font-bold text-base flex-shrink-0">🛒</div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-neon-amber">Viðskiptavinur (Покупець)</span>
                <span class="text-xs font-mono text-neon-amber">🔊 0:02</span>
              </div>
              <p class="text-base font-bold text-white mt-0.5 group-hover:text-neon-amber transition-colors font-mono">Hvað kostar kílóið?</p>
              <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans"><span class="font-mono text-neon-coral">[Hvað kostar kiloið?]</span> • Скільки коштує кілограм?</p>
            </div>
          </div>

          <div onclick="playLetterSound('Það kostar 450 krónur.', this)" class="p-4 rounded-xl bg-cyber-void/80 hover:bg-cyber-void border border-cyber-border/40 hover:border-emerald-400 cursor-pointer transition-all flex items-start gap-3.5 group ml-3 sm:ml-6">
            <div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-base flex-shrink-0">🏪</div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-emerald-400">Afgreiðslumaður (Продавець)</span>
                <span class="text-xs font-mono text-emerald-400">🔊 0:02</span>
              </div>
              <p class="text-base font-bold text-white mt-0.5 group-hover:text-emerald-400 transition-colors font-mono">Það kostar 450 krónur.</p>
              <p class="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans"><span class="font-mono text-neon-coral">[Það kostar 450 kronur]</span> • Це коштує 450 крон.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Block 4: 4 BÍN Case Badges -->
      <div class="glass-panel p-6 sm:p-10 border border-cyber-border shadow-2xl space-y-6">
        <div>
          <div class="flex items-center gap-2.5 text-neon-amber text-xs font-mono uppercase tracking-widest font-bold mb-1">
            <span>BÍN • Beygingarlýsing Íslensks Nútímamáls</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>📚 4 відмінки ісландської мови за шкалою BÍN</span>
          </h3>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            Офіційна палітра 4 відмінків на прикладі слова <strong>hestur</strong> (кінь) та <strong>bók</strong> (книга).
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- NF -->
          <div class="p-5 rounded-2xl bg-cyber-deep/90 border border-bin-nf/50 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2.5 py-0.5 rounded bg-bin-nf/20 text-bin-nf font-mono text-xs font-bold">NF 🔹 Називний</span>
                <span class="text-[11px] font-mono text-slate-400">Hér er...</span>
              </div>
              <div class="text-base font-bold text-white font-mono mt-2">hestur / bók</div>
              <p class="text-xs text-slate-300 mt-1 font-sans">Хто? Що? Головний підмет речення.</p>
            </div>
            <div class="mt-3 pt-2 border-t border-bin-nf/20 text-[11px] font-mono text-bin-nf">Nefnifall</div>
          </div>

          <!-- ÞF -->
          <div class="p-5 rounded-2xl bg-cyber-deep/90 border border-bin-tf/50 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2.5 py-0.5 rounded bg-bin-tf/20 text-bin-tf font-mono text-xs font-bold">ÞF 🟢 Знахідний</span>
                <span class="text-[11px] font-mono text-slate-400">Um...</span>
              </div>
              <div class="text-base font-bold text-white font-mono mt-2">hest / bók</div>
              <p class="text-xs text-slate-300 mt-1 font-sans">Кого? Що? Прямий додаток дії.</p>
            </div>
            <div class="mt-3 pt-2 border-t border-bin-tf/20 text-[11px] font-mono text-bin-tf">Þolfall</div>
          </div>

          <!-- ÞGF -->
          <div class="p-5 rounded-2xl bg-cyber-deep/90 border border-bin-tgf/50 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2.5 py-0.5 rounded bg-bin-tgf/20 text-bin-tgf font-mono text-xs font-bold">ÞGF 🟡 Давальний</span>
                <span class="text-[11px] font-mono text-slate-400">Frá...</span>
              </div>
              <div class="text-base font-bold text-white font-mono mt-2">hesti / bók</div>
              <p class="text-xs text-slate-300 mt-1 font-sans">Кому? Чому? Непрямий адресат, стан.</p>
            </div>
            <div class="mt-3 pt-2 border-t border-bin-tgf/20 text-[11px] font-mono text-bin-tgf">Þágufall</div>
          </div>

          <!-- EF -->
          <div class="p-5 rounded-2xl bg-cyber-deep/90 border border-bin-ef/50 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2.5 py-0.5 rounded bg-bin-ef/20 text-bin-ef font-mono text-xs font-bold">EF 🔴 Родовий</span>
                <span class="text-[11px] font-mono text-slate-400">Til...</span>
              </div>
              <div class="text-base font-bold text-white font-mono mt-2">hests / bókar</div>
              <p class="text-xs text-slate-300 mt-1 font-sans">Кого? Чого? Належність, ціль.</p>
            </div>
            <div class="mt-3 pt-2 border-t border-bin-ef/20 text-[11px] font-mono text-bin-ef">Eignarfall</div>
          </div>
        </div>
      </div>

    </section>

    <!-- ======================================================================= -->
    <!-- SECTION 5: MÓDÚLL 3 (A2 CONTAINER) — PREPARED CONTAINER                  -->
    <!-- ======================================================================= -->
    <section id="modull-3" class="module-section hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" style="display:none;">
      <div class="glass-panel p-8 sm:p-12 border border-cyber-border text-center space-y-4">
        <span class="px-3.5 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/40 text-neon-purple text-xs font-mono font-bold tracking-wider uppercase">
          CEFR A2 • Grunnstig A2
        </span>
        <h2 class="text-3xl sm:text-4xl font-black text-white">Módúll 3: Óbeint frumlag, Forsetningar &amp; Þátíð</h2>
        <p class="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base font-sans">
          Схильні суб'єкти (mig langar / mér finnst), просторові прийменники руху vs стану (í / á) та перша система минулого часу дієслів.
        </p>
        <div class="inline-block mt-4 px-4 py-2 rounded-xl bg-cyber-deep border border-neon-purple/40 text-neon-purple font-mono text-xs">
          ⚙️ Контейнер підготовлено для інтеграції наступного кроку
        </div>
      </div>
    </section>

    <!-- ======================================================================= -->
    <!-- SECTION 6: MÓDÚLL 4 (B1 CONTAINER) — PREPARED CONTAINER                  -->
    <!-- ======================================================================= -->
    <section id="modull-4" class="module-section hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" style="display:none;">
      <div class="glass-panel p-8 sm:p-12 border border-cyber-border text-center space-y-4">
        <span class="px-3.5 py-1 rounded-full bg-neon-rose/20 border border-neon-rose/40 text-neon-rose text-xs font-mono font-bold tracking-wider uppercase">
          CEFR B1 • Milliþrep B1
        </span>
        <h2 class="text-3xl sm:text-4xl font-black text-white">Módúll 4: Kennimyndir, Lýsingarorð &amp; Sinn vs Hans</h2>
        <p class="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base font-sans">
          8 класів сильних дієслів (4 основні форми Kennimyndir), сильне та слабке відмінювання прикметників, опозиція sinn vs hans/hennar.
        </p>
        <div class="inline-block mt-4 px-4 py-2 rounded-xl bg-cyber-deep border border-neon-rose/40 text-neon-rose font-mono text-xs">
          ⚙️ Контейнер підготовлено для інтеграції наступного кроку
        </div>
      </div>
    </section>

    <!-- ======================================================================= -->
    <!-- SECTION 7: MÓDÚLL 5 (B2 CONTAINER) — PREPARED CONTAINER                  -->
    <!-- ======================================================================= -->
    <section id="modull-5" class="module-section hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" style="display:none;">
      <div class="glass-panel p-8 sm:p-12 border border-cyber-border text-center space-y-4">
        <span class="px-3.5 py-1 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber text-xs font-mono font-bold tracking-wider uppercase">
          CEFR B2 • Milliþrep B2
        </span>
        <h2 class="text-3xl sm:text-4xl font-black text-white">Módúll 5: Viðtengingarháttur, Miðmynd &amp; BÍN Reader</h2>
        <p class="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base font-sans">
          Умовний спосіб дієслів (Subjunctive), медіальний стан на -st, пасивний стан та аналіз академічних ісландських текстів за BÍN.
        </p>
        <div class="inline-block mt-4 px-4 py-2 rounded-xl bg-cyber-deep border border-neon-amber/40 text-neon-amber font-mono text-xs">
          ⚙️ Контейнер підготовлено для інтеграції наступного кроку
        </div>
      </div>
    </section>

  </main>

  <!-- ========================================================================= -->
  <!-- FOOTER                                                                    -->
  <!-- ========================================================================= -->
  <footer class="py-12 border-t border-cyber-border bg-cyber-void relative z-10 text-xs font-mono text-slate-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="text-lg text-neon-amber">⚡</span>
        <span>Íslenskukennsla WARM NEON &bull; BÍN samræmt kerfi (Módúll 0–5)</span>
      </div>
      <div>
        100% академічна українська локалізація та автентичний ісландський синтез звуку.
      </div>
    </div>
  </footer>

  <!-- ========================================================================= -->
  <!-- JAVASCRIPT: TAB ENGINE, AUDIO CONTROLLER, CANVAS PARTICLES                -->
  <!-- ========================================================================= -->
  <script>
    /* =========================================================================
       1. WORKING TAB NAVIGATION ENGINE (VANILLA JS)
       ========================================================================= */
    function switchModule(modId) {{
      // Hide all sections
      document.querySelectorAll('.module-section').forEach(sec => {{
        sec.classList.add('hidden');
        sec.style.display = 'none';
      }});
      
      // Reset all navigation tab styles
      document.querySelectorAll('.nav-tab').forEach(tab => {{
        tab.classList.remove('bg-amber-500/30', 'border-amber-400', 'text-amber-300', 'shadow-lg');
        tab.classList.add('bg-slate-900/60', 'border-white/10', 'text-gray-400');
      }});
      
      // Activate selected section
      const activeSec = document.getElementById(modId);
      if (activeSec) {{
        activeSec.classList.remove('hidden');
        activeSec.style.display = 'block';
      }}
      
      // Highlight selected tab
      const activeTab = document.getElementById('tab-' + modId);
      if (activeTab) {{
        activeTab.classList.add('bg-amber-500/30', 'border-amber-400', 'text-amber-300', 'shadow-lg');
        activeTab.classList.remove('bg-slate-900/60', 'border-white/10', 'text-gray-400');
      }}
      
      window.scrollTo({{ top: 0, behavior: 'smooth' }});
    }}

    /* =========================================================================
       2. 3D WARM SUNSET CYBER CANVAS ANIMATION
       ========================================================================= */
    const canvas = document.getElementById('warm-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const characters = ['Þ', 'Æ', 'Ð', 'Ö', 'Ý', 'Á', 'É', 'Ó', 'Ú', 'Í'];
    const warmColors = [
      'rgba(255, 184, 0, 0.75)',
      'rgba(255, 94, 0, 0.75)',
      'rgba(255, 42, 109, 0.70)',
      'rgba(176, 38, 255, 0.65)',
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
       3. PHONETIC LETTER MAPPING & WEB SPEECH AUDIO CONTROLLER
       ========================================================================= */
    const icelandicLetterNames = {{
      'A': 'a', 'a': 'a',
      'Á': 'á', 'á': 'á',
      'B': 'bé', 'b': 'bé',
      'D': 'dé', 'd': 'dé',
      'Ð': 'eð', 'ð': 'eð',
      'E': 'e', 'e': 'e',
      'É': 'ég', 'é': 'ég',
      'F': 'eff', 'f': 'eff',
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
      'V': 'vaff', 'v': 'vaff',
      'X': 'ex', 'x': 'ex',
      'Y': 'ufsilon i', 'y': 'ufsilon i',
      'Ý': 'ufsilon í', 'ý': 'ufsilon í',
      'Z': 'seta', 'z': 'seta',
      'Þ': 'þorn', 'þ': 'þorn',
      'Æ': 'æ', 'æ': 'æ',
      'Ö': 'ö', 'ö': 'ö'
    }};

    function playLetterSound(letterName, element) {{
      if (!('speechSynthesis' in window)) {{
        console.warn('SpeechSynthesis API is not supported in this browser.');
        return;
      }}

      window.speechSynthesis.cancel();

      const cleanKey = letterName.trim();
      const textToSpeak = icelandicLetterNames[cleanKey] || letterName;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'is-IS';
      utterance.rate = 0.80;
      utterance.pitch = 0.88;

      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(v => v.lang.startsWith('is') && (
        v.name.includes('Karl') || v.name.includes('Gunnar') || v.name.includes('Male') || v.name.includes('Wavenet-B')
      )) || voices.find(v => v.lang.startsWith('is'));

      if (maleVoice) utterance.voice = maleVoice;

      if (element) {{
        element.classList.add('pulse-playing', 'ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
        setTimeout(() => {{
          element.classList.remove('pulse-playing', 'ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
        }}, 2000);
      }}

      utterance.onend = () => {{
        if (element) element.classList.remove('pulse-playing', 'ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
      }};
      utterance.onerror = () => {{
        if (element) element.classList.remove('pulse-playing', 'ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
      }};

      window.speechSynthesis.speak(utterance);
    }}

    const speakIcelandic = playLetterSound;

    /* =========================================================================
       4. INSPECTOR BAR CONTROLLER
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
       5. SEQUENTIAL DIALOGUE PLAYERS
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

    let isPlayingM1Dialogue = false;
    async function playModule1Dialogue() {{
      if (isPlayingM1Dialogue) return;
      isPlayingM1Dialogue = true;
      const btn = document.getElementById('play-dialogue-m1-btn');
      if (btn) btn.innerHTML = `<span>⏳ Відтворення діалогу...</span>`;

      const lines = [
        {{ text: 'Góðan daginn! Hvað má bjóða þér?', id: 'm1-line-1' }},
        {{ text: 'Góðan dag! Ég ætla að fá einn kaffi og eina samloku, takk.', id: 'm1-line-2' }},
        {{ text: 'Eitthvað fleira?', id: 'm1-line-3' }},
        {{ text: 'Nei, takk. Hvað kostar þetta?', id: 'm1-line-4' }},
        {{ text: 'Það gerir 1500 krónur.', id: 'm1-line-5' }},
        {{ text: 'Gjörðu svo vel!', id: 'm1-line-6' }},
        {{ text: 'Takk kærlega!', id: 'm1-line-7' }}
      ];

      for (let i = 0; i < lines.length; i++) {{
        const el = document.getElementById(lines[i].id);
        playLetterSound(lines[i].text, el);
        await new Promise(r => setTimeout(r, 2800));
      }}

      if (btn) btn.innerHTML = `<span>▶️ Слухати весь діалог (Þjónn & Gestur)</span>`;
      isPlayingM1Dialogue = false;
    }}

    // Voice Auto-Detection update
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
    f.write(full_spa_html)

with open(desktop_file, 'w', encoding='utf-8') as f:
    f.write(full_spa_html)

print(f"Master rebuild complete: Generated {output_file} ({len(full_spa_html)} bytes)")
print(f"Master rebuild complete: Synchronized {desktop_file} ({len(full_spa_html)} bytes)")
