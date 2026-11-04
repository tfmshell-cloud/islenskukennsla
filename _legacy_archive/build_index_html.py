import os

output_file = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/index.html"
desktop_file = "/Users/volodymyrkatasonov/Desktop/Islenskukennsla_A1_B2.html"

html_content = """<!DOCTYPE html>
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
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          colors: {
            cyber: {
              void: '#06040A',
              deep: '#0E0716',
              panel: 'rgba(20, 10, 32, 0.85)',
              border: 'rgba(255, 140, 0, 0.35)',
              borderGlow: '#FF8C00',
            },
            neon: {
              amber: '#FFB800',
              coral: '#FF5E00',
              rose: '#FF2A6D',
              violet: '#9D00FF',
              purple: '#B026FF',
              crimson: '#FF0055',
            },
            bin: {
              nf: '#FFB800',   // Golden Amber (Nefnifall - Називний)
              tf: '#FF5E00',   // Sunset Coral (Þolfall - Знахідний)
              tgf: '#B026FF',  // Neon Violet (Þágufall - Давальний)
              ef: '#FF0055',   // Crimson Rose (Eignarfall - Родовий)
            }
          }
        }
      }
    };
  </script>

  <style>
    /* Warm Neon Cyberpunk Aesthetics */
    body {
      background: radial-gradient(circle at 50% -10%, #1c0b30 0%, #0e0716 45%, #06040a 100%);
      color: #F8FAFC;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Ambient Warm Grid Lines */
    .bg-warm-grid {
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, rgba(255, 140, 0, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 42, 109, 0.04) 1px, transparent 1px);
    }

    /* Translucent Glass Panels */
    .warm-glass-panel {
      background: rgba(20, 10, 32, 0.85);
      border: 1px solid rgba(255, 140, 0, 0.35);
      box-shadow: 0 0 20px rgba(255, 184, 0, 0.15);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-radius: 16px;
      transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .warm-glass-panel:hover {
      border-color: #FFB800;
      box-shadow: 0 0 28px rgba(255, 184, 0, 0.30), inset 0 0 15px rgba(255, 140, 0, 0.08);
      transform: translateY(-2px);
    }

    .warm-nav {
      background: rgba(10, 5, 18, 0.94);
      border-bottom: 1px solid rgba(255, 140, 0, 0.35);
      box-shadow: 0 4px 25px rgba(255, 94, 0, 0.22);
      backdrop-filter: blur(20px);
    }

    /* 3D Tactile Buttons */
    .btn-warm-3d {
      background: linear-gradient(135deg, #FFB800 0%, #FF5E00 100%);
      color: #06040A;
      font-weight: 800;
      border-radius: 12px;
      box-shadow: 0 4px 0 #D47A00, 0 0 16px rgba(255, 184, 0, 0.35);
      transition: all 0.15s ease;
      cursor: pointer;
    }

    .btn-warm-3d:hover {
      transform: translateY(-1px);
      box-shadow: 0 5px 0 #D47A00, 0 0 25px rgba(255, 184, 0, 0.55);
      filter: brightness(1.08);
    }

    .btn-warm-3d:active {
      transform: translateY(3px);
      box-shadow: 0 1px 0 #D47A00;
    }

    .btn-outline-warm {
      background: rgba(255, 184, 0, 0.08);
      border: 1px solid rgba(255, 184, 0, 0.45);
      color: #FFB800;
      border-radius: 12px;
      transition: all 0.2s ease;
    }

    .btn-outline-warm:hover {
      background: rgba(255, 184, 0, 0.20);
      border-color: #FFB800;
      box-shadow: 0 0 18px rgba(255, 184, 0, 0.40);
      color: #FFFFFF;
      transform: translateY(-1px);
    }

    /* Soundboard Letter Tile */
    .letter-tile-warm {
      background: rgba(18, 8, 30, 0.90);
      border: 1px solid rgba(255, 140, 0, 0.30);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      transition: all 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .letter-tile-warm:hover {
      border-color: #FFB800;
      box-shadow: 0 0 22px rgba(255, 184, 0, 0.45);
      transform: translateY(-3px) scale(1.03);
    }

    /* BÍN Glow Accents */
    .glow-nf { border-color: rgba(255, 184, 0, 0.45); box-shadow: 0 0 20px rgba(255, 184, 0, 0.20); }
    .glow-tf { border-color: rgba(255, 94, 0, 0.45); box-shadow: 0 0 20px rgba(255, 94, 0, 0.20); }
    .glow-tgf { border-color: rgba(176, 38, 255, 0.45); box-shadow: 0 0 20px rgba(176, 38, 255, 0.20); }
    .glow-ef { border-color: rgba(255, 0, 85, 0.45); box-shadow: 0 0 20px rgba(255, 0, 85, 0.20); }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: #06040A; }
    ::-webkit-scrollbar-thumb {
      background: #2D123D;
      border-radius: 4px;
      border: 1px solid rgba(255, 140, 0, 0.3);
    }
    ::-webkit-scrollbar-thumb:hover { background: #551D75; }
  </style>
</head>
<body class="bg-cyber-void font-sans antialiased text-slate-100 bg-warm-grid min-h-screen relative selection:bg-neon-amber selection:text-cyber-void">

  <!-- ========================================================================= -->
  <!-- 1. FIXED NAVIGATION BAR                                                   -->
  <!-- ========================================================================= -->
  <header class="fixed top-0 left-0 right-0 z-50 warm-nav transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <a href="#hero" class="flex items-center gap-3 group focus:outline-none">
        <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-neon-amber via-neon-coral to-neon-rose p-0.5 shadow-lg shadow-neon-amber/25 group-hover:scale-105 transition-transform">
          <div class="w-full h-full bg-cyber-deep rounded-[10px] flex items-center justify-center font-black text-lg text-neon-amber tracking-wider">
            ⚡
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="font-extrabold text-lg tracking-tight text-white group-hover:text-neon-amber transition-colors">Íslenskukennsla ⚡ WARM NEON</span>
            <span class="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold bg-neon-amber/20 text-neon-amber border border-neon-amber/40">A1–B2</span>
          </div>
          <span class="text-[11px] font-mono tracking-widest uppercase text-neon-coral">Гібридна платформа вивчення ісландської мови • BÍN &amp; Mímir</span>
        </div>
      </a>

      <!-- Desktop Nav Links -->
      <nav class="hidden lg:flex items-center gap-1 bg-cyber-deep/90 p-1.5 rounded-full border border-cyber-border shadow-inner text-xs font-semibold">
        <a href="#hero" class="px-4 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-neon-amber/15 transition-all">Головна</a>
        <a href="#unit1" class="px-4 py-1.5 rounded-full text-neon-amber hover:text-white hover:bg-neon-amber/20 transition-all flex items-center gap-1.5">
          <span>Модуль 01: Абетка</span>
          <span class="w-2 h-2 rounded-full bg-neon-amber animate-pulse"></span>
        </a>
        <a href="#traps" class="px-4 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-neon-coral/15 transition-all">Фонетичні пастки</a>
        <a href="#dialogue" class="px-4 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-neon-coral/15 transition-all">Діалог</a>
        <a href="#curriculum" class="px-4 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-neon-violet/15 transition-all">Програма (2–12)</a>
      </nav>

      <!-- Right Bar: Male Voice Pill & Language Badge -->
      <div class="flex items-center gap-3">
        <div id="male-voice-badge-nav" class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyber-deep border border-neon-amber/40 text-xs font-mono text-neon-amber shadow-lg shadow-neon-amber/15">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>🎙️ Karl (is-IS • 0.80x • 0.88p)</span>
        </div>

        <div class="flex items-center bg-cyber-deep border border-cyber-border rounded-xl px-2.5 py-1 text-xs font-mono font-bold text-neon-amber">
          <span>🇺🇦 UK • 🇮🇸 IS</span>
        </div>
      </div>

    </div>
  </header>

  <!-- ========================================================================= -->
  <!-- 2. HERO SECTION & LEVEL FILTER PILLS                                      -->
  <!-- ========================================================================= -->
  <section id="hero" class="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden z-10">
    
    <!-- 3D Warm Sunset Canvas Rendering Glowing Characters -->
    <canvas id="warm-canvas" class="absolute inset-0 pointer-events-none z-0 w-full h-full opacity-75"></canvas>
    
    <!-- Ambient Glow Orbs -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-neon-amber/15 rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute top-1/3 left-1/4 w-[420px] h-[280px] bg-neon-rose/15 rounded-full blur-[130px] pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      
      <!-- Pill Badge -->
      <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyber-void/90 border border-neon-amber/50 shadow-lg shadow-neon-amber/25 mb-8 backdrop-blur-md">
        <span class="flex h-2 w-2 rounded-full bg-neon-amber animate-ping"></span>
        <span class="text-xs font-mono font-bold tracking-wider text-neon-amber uppercase">
          ⚡ WARM NEON CYBERPUNK • AKADEMÍSK ÍSLENSKA A1–B2
        </span>
      </div>

      <!-- Main Headline -->
      <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
        <span>Íslenskukennsla</span><br>
        <span class="bg-gradient-to-r from-neon-amber via-neon-coral to-neon-rose bg-clip-text text-transparent filter drop-shadow-[0_0_35px_rgba(255,184,0,0.45)]">
          Lærðu frá stafrófi til B2
        </span>
      </h1>

      <!-- Ukrainian Subtitle -->
      <p class="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-8">
        Гібридна платформа вивчення ісландської мови (A1–B2) • Синхронізовано з Beygingarlýsing íslensks nútímamáls (BÍN) та навчальним комплексом <em>Íslenska fyrir alla 1–4</em> (Mímir).
      </p>

      <!-- Level Filter Pills -->
      <div class="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button onclick="filterCurriculum('all')" id="filter-pill-all" class="level-pill px-4 py-2 rounded-xl text-xs font-mono font-bold bg-neon-amber text-cyber-void shadow-md transition-all">Усі модулі (12)</button>
        <button onclick="filterCurriculum('A1.1')" id="filter-pill-A1.1" class="level-pill px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 hover:text-white bg-cyber-deep/80 border border-cyber-border transition-all">A1.1 (Абетка)</button>
        <button onclick="filterCurriculum('A1.2')" id="filter-pill-A1.2" class="level-pill px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 hover:text-white bg-cyber-deep/80 border border-cyber-border transition-all">A1.2</button>
        <button onclick="filterCurriculum('A2')" id="filter-pill-A2" class="level-pill px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 hover:text-white bg-cyber-deep/80 border border-cyber-border transition-all">A2</button>
        <button onclick="filterCurriculum('B1')" id="filter-pill-B1" class="level-pill px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 hover:text-white bg-cyber-deep/80 border border-cyber-border transition-all">B1</button>
        <button onclick="filterCurriculum('B2')" id="filter-pill-B2" class="level-pill px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 hover:text-white bg-cyber-deep/80 border border-cyber-border transition-all">B2</button>
      </div>

      <!-- BÍN 4-Case Spectrum Badges -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div class="warm-glass-panel glow-nf p-4 rounded-xl text-left border-l-4 border-l-bin-nf">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-mono font-bold text-bin-nf">NF • NEFNIFALL</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bin-nf/20 text-bin-nf">Хто? Що?</span>
          </div>
          <div class="text-sm font-bold text-white">hestur <span class="text-xs text-slate-400 font-normal">(кінь)</span></div>
          <div class="text-[11px] text-slate-400 mt-1">Hér er hestur. (Називний)</div>
        </div>

        <div class="warm-glass-panel glow-tf p-4 rounded-xl text-left border-l-4 border-l-bin-tf">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-mono font-bold text-bin-tf">ÞF • ÞOLFALL</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bin-tf/20 text-bin-tf">Кого? Що?</span>
          </div>
          <div class="text-sm font-bold text-white">hest <span class="text-xs text-slate-400 font-normal">(коня)</span></div>
          <div class="text-[11px] text-slate-400 mt-1">Um hest. (Знахідний)</div>
        </div>

        <div class="warm-glass-panel glow-tgf p-4 rounded-xl text-left border-l-4 border-l-bin-tgf">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-mono font-bold text-bin-tgf">ÞGF • ÞÁGUFALL</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bin-tgf/20 text-bin-tgf">Кому? Чому?</span>
          </div>
          <div class="text-sm font-bold text-white">hesti <span class="text-xs text-slate-400 font-normal">(коню)</span></div>
          <div class="text-[11px] text-slate-400 mt-1">Frá hesti. (Давальний)</div>
        </div>

        <div class="warm-glass-panel glow-ef p-4 rounded-xl text-left border-l-4 border-l-bin-ef">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-mono font-bold text-bin-ef">EF • EIGNARFALL</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bin-ef/20 text-bin-ef">Чий? Кого?</span>
          </div>
          <div class="text-sm font-bold text-white">hests <span class="text-xs text-slate-400 font-normal">(коня)</span></div>
          <div class="text-[11px] text-slate-400 mt-1">Til hests. (Родовий)</div>
        </div>
      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 3. EINING 1: STAFRÓFIÐ (FULL 32 LETTERS GRID)                             -->
  <!-- ========================================================================= -->
  <section id="unit1" class="py-20 relative z-10 border-t border-cyber-border bg-cyber-void/85">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Module Header -->
      <div class="mb-10">
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber text-xs font-mono font-bold uppercase tracking-wider mb-3">
          Модуль 01 • Стіг A1.1 (День 1)
        </span>
        <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Eining 1: Stafrófið, Framburður &amp; Kveðjur
        </h2>
        <p class="mt-2 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Ісландська абетка (32 літери), 4 фонетичні пастки та ситуативний діалог знайомства.
        </p>
      </div>

      <!-- Soundboard Glass Panel -->
      <div class="warm-glass-panel p-6 md:p-8 rounded-2xl border border-cyber-border mb-16 shadow-2xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-cyber-border/40 mb-6">
          <h3 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span class="text-2xl">🔤</span>
            <span>Ісландська абетка (Íslenska stafrófið — 32 stafir)</span>
          </h3>
          <span class="text-xs font-mono text-neon-amber flex items-center gap-2 bg-cyber-deep px-3 py-1.5 rounded-lg border border-neon-amber/30">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Натисніть на картку для озвучки (Web Speech is-IS)</span>
          </span>
        </div>

        <!-- 32 Alphabet Cards Grid (ALL 32 LETTERS + Z WRITTEN EXPLICITLY) -->
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3.5 font-mono">
          
          <!-- 1. A a -->
          <div onclick="speakIcelandic('A', this); updateInspector('A a', '[a]', 'Afi', 'дідусь')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">A a</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[a]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Afi</span>
          </div>

          <!-- 2. Á á -->
          <div onclick="speakIcelandic('Á', this); updateInspector('Á á', '[au]', 'Á', 'річка')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-neon-coral/50 bg-neon-coral/10">
            <span class="text-xl sm:text-2xl font-black text-neon-coral">Á á</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[au]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Á</span>
          </div>

          <!-- 3. B b -->
          <div onclick="speakIcelandic('B', this); updateInspector('B b', '[be]', 'Bók', 'книга')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">B b</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[be]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Bók</span>
          </div>

          <!-- 4. D d -->
          <div onclick="speakIcelandic('D', this); updateInspector('D d', '[de]', 'Dagur', 'день')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">D d</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[de]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Dagur</span>
          </div>

          <!-- 5. Ð ð -->
          <div onclick="speakIcelandic('Ð', this); updateInspector('Ð ð', '[eð]', 'Maður', 'чоловік')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-neon-amber/70 bg-neon-amber/15 shadow-lg shadow-neon-amber/20">
            <span class="text-xl sm:text-2xl font-black text-neon-amber">Ð ð</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[eð]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Maður</span>
          </div>

          <!-- 6. E e -->
          <div onclick="speakIcelandic('E', this); updateInspector('E e', '[e]', 'Egg', 'яйце')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">E e</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[e]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Egg</span>
          </div>

          <!-- 7. É é -->
          <div onclick="speakIcelandic('É', this); updateInspector('É é', '[je]', 'Ég', 'я')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-neon-coral/50 bg-neon-coral/10">
            <span class="text-xl sm:text-2xl font-black text-neon-coral">É é</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[je]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Ég</span>
          </div>

          <!-- 8. F f -->
          <div onclick="speakIcelandic('F', this); updateInspector('F f', '[eff]', 'Fjall', 'гора')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">F f</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[eff]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Fjall</span>
          </div>

          <!-- 9. G g -->
          <div onclick="speakIcelandic('G', this); updateInspector('G g', '[ge]', 'Gata', 'вулиця')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">G g</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[ge]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Gata</span>
          </div>

          <!-- 10. H h -->
          <div onclick="speakIcelandic('H', this); updateInspector('H h', '[ha]', 'Hús', 'будинок')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">H h</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[ha]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Hús</span>
          </div>

          <!-- 11. I i -->
          <div onclick="speakIcelandic('I', this); updateInspector('I i', '[i]', 'Ísland', 'Ісландія')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">I i</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[i]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Ísland</span>
          </div>

          <!-- 12. Í í -->
          <div onclick="speakIcelandic('Í', this); updateInspector('Í í', '[i:]', 'Ís', 'лід/морозиво')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-neon-coral/50 bg-neon-coral/10">
            <span class="text-xl sm:text-2xl font-black text-neon-coral">Í í</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[i:]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Ís</span>
          </div>

          <!-- 13. J j -->
          <div onclick="speakIcelandic('J', this); updateInspector('J j', '[joð]', 'Jú', 'так (на заперечення)')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">J j</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[joð]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Jú</span>
          </div>

          <!-- 14. K k -->
          <div onclick="speakIcelandic('K', this); updateInspector('K k', '[ka]', 'Kaffi', 'кава')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">K k</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[ka]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Kaffi</span>
          </div>

          <!-- 15. L l -->
          <div onclick="speakIcelandic('L', this); updateInspector('L l', '[ell]', 'Lampa', 'лампа')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">L l</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[ell]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Lampa</span>
          </div>

          <!-- 16. M m -->
          <div onclick="speakIcelandic('M', this); updateInspector('M m', '[emm]', 'Mamma', 'мама')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">M m</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[emm]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Mamma</span>
          </div>

          <!-- 17. N n -->
          <div onclick="speakIcelandic('N', this); updateInspector('N n', '[enn]', 'Nafn', 'ім’я')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">N n</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[enn]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Nafn</span>
          </div>

          <!-- 18. O o -->
          <div onclick="speakIcelandic('O', this); updateInspector('O o', '[o]', 'Oft', 'часто')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">O o</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[o]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Oft</span>
          </div>

          <!-- 19. Ó ó -->
          <div onclick="speakIcelandic('Ó', this); updateInspector('Ó ó', '[ou]', 'Óskar', 'Оскар')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-neon-coral/50 bg-neon-coral/10">
            <span class="text-xl sm:text-2xl font-black text-neon-coral">Ó ó</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[ou]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Óskar</span>
          </div>

          <!-- 20. P p -->
          <div onclick="speakIcelandic('P', this); updateInspector('P p', '[pe]', 'Penni', 'ручка')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">P p</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[pe]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Penni</span>
          </div>

          <!-- 21. R r -->
          <div onclick="speakIcelandic('R', this); updateInspector('R r', '[err]', 'Rigning', 'дощ')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">R r</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[err]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Rigning</span>
          </div>

          <!-- 22. S s -->
          <div onclick="speakIcelandic('S', this); updateInspector('S s', '[ess]', 'Sól', 'сонце')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">S s</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[ess]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Sól</span>
          </div>

          <!-- 23. T t -->
          <div onclick="speakIcelandic('T', this); updateInspector('T t', '[te]', 'Takk', 'дякую')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">T t</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[te]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Takk</span>
          </div>

          <!-- 24. U u -->
          <div onclick="speakIcelandic('U', this); updateInspector('U u', '[u]', 'Ull', 'вовна')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">U u</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[u]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Ull</span>
          </div>

          <!-- 25. Ú ú -->
          <div onclick="speakIcelandic('Ú', this); updateInspector('Ú ú', '[u:]', 'Út', 'назовні')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-neon-coral/50 bg-neon-coral/10">
            <span class="text-xl sm:text-2xl font-black text-neon-coral">Ú ú</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[u:]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Út</span>
          </div>

          <!-- 26. V v -->
          <div onclick="speakIcelandic('V', this); updateInspector('V v', '[vaff]', 'Vatn', 'вода')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">V v</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[vaff]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Vatn</span>
          </div>

          <!-- 27. X x -->
          <div onclick="speakIcelandic('X', this); updateInspector('X x', '[ex]', 'Lax', 'лосось')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">X x</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[ex]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Lax</span>
          </div>

          <!-- 28. Y y -->
          <div onclick="speakIcelandic('Y', this); updateInspector('Y y', '[i]', 'Einkunn', 'оцінка')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
            <span class="text-xl sm:text-2xl font-black text-white">Y y</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[i]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Einkunn</span>
          </div>

          <!-- 29. Ý ý -->
          <div onclick="speakIcelandic('Ý', this); updateInspector('Ý ý', '[i:]', 'Ýsa', 'пікша')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-neon-coral/50 bg-neon-coral/10">
            <span class="text-xl sm:text-2xl font-black text-neon-coral">Ý ý</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[i:]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Ýsa</span>
          </div>

          <!-- 30. Z z -->
          <div onclick="speakIcelandic('Z', this); updateInspector('Z z', '[seta]', 'Zeta', 'зета (історична)')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all opacity-80">
            <span class="text-xl sm:text-2xl font-black text-white">Z z</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[seta]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Zeta</span>
          </div>

          <!-- 31. Þ þ -->
          <div onclick="speakIcelandic('Þ', this); updateInspector('Þ þ', '[þorn]', 'Þing', 'парламент/тінґ')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-neon-amber/70 bg-neon-amber/15 shadow-lg shadow-neon-amber/20">
            <span class="text-xl sm:text-2xl font-black text-neon-amber">Þ þ</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[þorn]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Þing</span>
          </div>

          <!-- 32. Æ æ -->
          <div onclick="speakIcelandic('Æ', this); updateInspector('Æ æ', '[ai]', 'Ætla', 'мати намір')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-neon-amber/70 bg-neon-amber/15 shadow-lg shadow-neon-amber/20">
            <span class="text-xl sm:text-2xl font-black text-neon-amber">Æ æ</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[ai]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Ætla</span>
          </div>

          <!-- 33. Ö ö -->
          <div onclick="speakIcelandic('Ö', this); updateInspector('Ö ö', '[ö]', 'Öld', 'вік/століття')" class="letter-tile-warm p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-neon-amber/70 bg-neon-amber/15 shadow-lg shadow-neon-amber/20">
            <span class="text-xl sm:text-2xl font-black text-neon-amber">Ö ö</span>
            <span class="text-xs text-neon-coral font-bold mt-1 tracking-wider">[ö]</span>
            <span class="text-xs text-slate-300 font-sans mt-0.5">Öld</span>
          </div>

        </div>

        <!-- Selected Letter Inspector Bar -->
        <div id="letter-inspector" class="mt-8 p-5 rounded-xl bg-cyber-deep/95 border border-neon-amber/50 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-inner">
          <div class="flex items-center gap-4">
            <span id="inspect-letter" class="text-4xl sm:text-5xl font-black text-neon-amber font-mono">A a</span>
            <div>
              <div id="inspect-ipa" class="text-base font-mono text-neon-coral font-bold">[a]</div>
              <div id="inspect-example" class="text-xs text-slate-300 mt-1 font-sans">
                Приклад: <strong id="inspect-word" class="text-white text-sm">Afi</strong> (<span id="inspect-trans">дідусь</span>)
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2.5 flex-shrink-0">
            <button onclick="speakSelectedLetter(this)" class="px-4 py-2.5 rounded-xl btn-warm-3d text-xs font-bold flex items-center gap-2">
              <span>🔊 Heiti stafs (Назва)</span>
            </button>
            <button onclick="speakSelectedWord(this)" class="px-4 py-2.5 rounded-xl btn-outline-warm text-xs font-bold flex items-center gap-2">
              <span>🗣️ Dæmi: <span id="inspect-btn-word" class="font-bold">Afi</span></span>
            </button>
          </div>
        </div>

      </div>

      <!-- ===================================================================== -->
      <!-- 4. FRAMBURÐARÞJÁLFUN (4 PHONETIC TRAPS)                               -->
      <!-- ===================================================================== -->
      <div id="traps" class="warm-glass-panel p-6 md:p-8 rounded-2xl border border-cyber-border mb-16 shadow-2xl">
        <div class="pb-5 border-b border-cyber-border/40 mb-6">
          <h3 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span class="text-2xl">🧩</span>
            <span>Фонетичні пастки (Framburðarþjálfun — 4 правила)</span>
          </h3>
          <p class="text-xs text-slate-300 mt-1">Клікніть на будь-яку картку, щоб прослухати звучання слів рідним голосом диктора.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Card 1: ll -> [tl] -->
          <div onclick="speakIcelandic('Kolla Eyjafjallajökull', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/50 cursor-pointer transition-all group glow-nf">
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

          <!-- Card 2: nn -> [tn] -->
          <div onclick="speakIcelandic('Einn Steinn', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/50 cursor-pointer transition-all group glow-tf">
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

          <!-- Card 3: fn / fl -> [pn / pl] -->
          <div onclick="speakIcelandic('Hafnarfjörður Afl', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/50 cursor-pointer transition-all group glow-tgf">
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

          <!-- Card 4: Preaspiration [h] -->
          <div onclick="speakIcelandic('Takk Ætla', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/50 cursor-pointer transition-all group glow-ef">
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

      <!-- ===================================================================== -->
      <!-- 5. FYRSTA SAMTALIÐ (FIRST DIALOGUE)                                   -->
      <!-- ===================================================================== -->
      <div id="dialogue" class="warm-glass-panel p-6 md:p-8 rounded-2xl border border-cyber-border mb-16 shadow-2xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-cyber-border/40 mb-6">
          <h3 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span class="text-2xl">💬</span>
            <span>Ситуативний діалог: Перше знайомство (Fyrsta samtalið)</span>
          </h3>
          <button id="play-full-dialogue-btn" onclick="playFullDialogue()" class="px-5 py-2.5 rounded-xl btn-warm-3d text-xs font-black flex items-center gap-2 shadow-lg">
            <span>▶️ Spila allt samtalið (Слухати весь діалог)</span>
          </button>
        </div>

        <div class="space-y-4 max-w-3xl mx-auto">
          
          <!-- Line 1: Jón -->
          <div id="d1-line-1" onclick="speakIcelandic('Sæll! Hvað heitir þú?', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 cursor-pointer transition-all flex items-start gap-4 group">
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
          <div id="d1-line-2" onclick="speakIcelandic('Sæl! Ég heiti Anna. Hvaðan ert þú?', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 cursor-pointer transition-all flex items-start gap-4 group ml-4 sm:ml-8">
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
          <div id="d1-line-3" onclick="speakIcelandic('Ég er frá Íslandi. En þú?', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 cursor-pointer transition-all flex items-start gap-4 group">
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
          <div id="d1-line-4" onclick="speakIcelandic('Ég er frá Úkraínu. Gaman að hitta þig!', this)" class="p-5 rounded-2xl bg-cyber-deep/90 hover:bg-cyber-deep border border-cyber-border/40 cursor-pointer transition-all flex items-start gap-4 group ml-4 sm:ml-8">
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
      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 6. CURRICULUM PREVIEW (UNITS 2 TO 12 CARDS)                               -->
  <!-- ========================================================================= -->
  <section id="curriculum" class="py-20 relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="mb-12">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-amber/20 border border-neon-amber/40 text-neon-amber text-xs font-mono uppercase tracking-wider mb-3">
          Академічна програма (12 модулів)
        </span>
        <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Навчальний план: від A1.2 до B2
        </h2>
        <p class="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
          Кожен модуль розроблено відповідно до вимог Háskóli Íslands та словника BÍN.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- Unit 2 -->
        <div class="curriculum-item warm-glass-panel glow-nf p-6 rounded-2xl flex flex-col justify-between" data-stage="A1.2">
          <div>
            <div class="flex items-center justify-between gap-3 mb-4">
              <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neon-amber/20 text-neon-amber border border-neon-amber/40">CEFR A1.2</span>
              <span class="text-xs font-mono text-slate-400">EINING 02</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Persónufornöfn &amp; Sögnin að vera</h3>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Відмінювання дієслова <em>að vera</em> (бути) у теперішньому часі (ég er, þú ert, hann/hún/það er), займенники та базова побудова речень.
            </p>
            <div class="p-3 rounded-xl bg-cyber-deep/95 border border-neon-amber/30 font-mono text-xs mb-4 space-y-1 text-slate-300">
              <div>&bull; Ég er, þú ert, hann er</div>
              <div>&bull; Við erum, þið eruð, þeir eru</div>
            </div>
          </div>
          <div class="text-[11px] font-mono text-bin-nf font-bold uppercase">NF • Називний відмінок</div>
        </div>

        <!-- Unit 3 -->
        <div class="curriculum-item warm-glass-panel glow-tf p-6 rounded-2xl flex flex-col justify-between" data-stage="A1.2">
          <div>
            <div class="flex items-center justify-between gap-3 mb-4">
              <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neon-coral/20 text-neon-coral border border-neon-coral/40">CEFR A1.2</span>
              <span class="text-xs font-mono text-slate-400">EINING 03</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Kyn Nafnorða &amp; Greinirinn</h3>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Три роди іменників: чоловічий (kk: -ur), жіночий (kvk: -a/-ø) та середній (hk: -ø). Суфіксальний означений артикль (-inn, -in, -ið).
            </p>
            <div class="p-3 rounded-xl bg-cyber-deep/95 border border-neon-coral/30 font-mono text-xs mb-4 space-y-1 text-slate-300">
              <div>&bull; kk: hestur &rarr; hestur<span class="text-neon-amber font-bold">inn</span></div>
              <div>&bull; kvk: bók &rarr; bók<span class="text-neon-coral font-bold">in</span></div>
              <div>&bull; hk: borð &rarr; borð<span class="text-neon-rose font-bold">ið</span></div>
            </div>
          </div>
          <div class="text-[11px] font-mono text-bin-tf font-bold uppercase">KK / KVK / HK Артиклі</div>
        </div>

        <!-- Unit 4 -->
        <div class="curriculum-item warm-glass-panel glow-tf p-6 rounded-2xl flex flex-col justify-between" data-stage="A2">
          <div>
            <div class="flex items-center justify-between gap-3 mb-4">
              <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neon-coral/20 text-neon-coral border border-neon-coral/40">CEFR A2.1</span>
              <span class="text-xs font-mono text-slate-400">EINING 04</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Fjórir Málföll (NF, ÞF, ÞGF, EF)</h3>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Чотири відмінки іменників в однині та множині за шкалою BÍN. Керування відмінками та базові парадигми словозміни.
            </p>
            <div class="p-3 rounded-xl bg-cyber-deep/95 border border-neon-coral/30 font-mono text-xs mb-4 space-y-1 text-slate-300">
              <div>&bull; NF: dagur &bull; ÞF: dag</div>
              <div>&bull; ÞGF: degi &bull; EF: dags</div>
            </div>
          </div>
          <div class="text-[11px] font-mono text-bin-tf font-bold uppercase">NF / ÞF / ÞGF / EF Відмінки</div>
        </div>

        <!-- Unit 5 -->
        <div class="curriculum-item warm-glass-panel glow-tgf p-6 rounded-2xl flex flex-col justify-between" data-stage="A2">
          <div>
            <div class="flex items-center justify-between gap-3 mb-4">
              <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/40">CEFR A2.1</span>
              <span class="text-xs font-mono text-slate-400">EINING 05</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Forsetningar &amp; Fallstjórn</h3>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Прийменники, що керують знахідним (um, gegnum), давальним (að, frá, af, hjá) та родовим (til, millum) відмінками. Рух vs. стан.
            </p>
            <div class="p-3 rounded-xl bg-cyber-deep/95 border border-neon-purple/30 font-mono text-xs mb-4 space-y-1 text-slate-300">
              <div>&bull; <span class="text-neon-amber font-bold">Til</span> Íslands [EF]</div>
              <div>&bull; <span class="text-neon-coral font-bold">Frá</span> Úkraínu [ÞGF]</div>
            </div>
          </div>
          <div class="text-[11px] font-mono text-bin-tgf font-bold uppercase">ÞGF • Давальний прийменниковий</div>
        </div>

        <!-- Unit 6 -->
        <div class="curriculum-item warm-glass-panel glow-tgf p-6 rounded-2xl flex flex-col justify-between" data-stage="A2">
          <div>
            <div class="flex items-center justify-between gap-3 mb-4">
              <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/40">CEFR A2.2</span>
              <span class="text-xs font-mono text-slate-400">EINING 06</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Veikar &amp; Sterkar Sagnir (Nútíð)</h3>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Відмінювання слабких дієслів (-ar, -ir, -ur) та найуживаніших сильних дієслів у теперішньому часі (fara, koma, taka, sjá).
            </p>
            <div class="p-3 rounded-xl bg-cyber-deep/95 border border-neon-purple/30 font-mono text-xs mb-4 space-y-1 text-slate-300">
              <div>&bull; tala &rarr; ég tala, þú talar</div>
              <div>&bull; fara &rarr; ég fer [hljóðvarp a&rarr;e]</div>
            </div>
          </div>
          <div class="text-[11px] font-mono text-bin-tgf font-bold uppercase">Дієслова • Теперішній час</div>
        </div>

        <!-- Unit 7 -->
        <div class="curriculum-item warm-glass-panel glow-ef p-6 rounded-2xl flex flex-col justify-between" data-stage="A2">
          <div>
            <div class="flex items-center justify-between gap-3 mb-4">
              <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neon-rose/20 text-neon-rose border border-neon-rose/40">CEFR A2.2</span>
              <span class="text-xs font-mono text-slate-400">EINING 07</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Tölur, Klukkan &amp; Daglegt líf</h3>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Відмінювання числівників 1–4 (einn, tveir, þrír, fjórir) у всіх родах та відмінках. Питання про час і повсякденний розпорядок.
            </p>
            <div class="p-3 rounded-xl bg-cyber-deep/95 border border-neon-rose/30 font-mono text-xs mb-4 space-y-1 text-slate-300">
              <div>&bull; einn, ein, eitt &bull; tveir, tvær, tvö</div>
              <div>&bull; Hvað er klukkan? Hálf fimm.</div>
            </div>
          </div>
          <div class="text-[11px] font-mono text-bin-ef font-bold uppercase">Числівники 1–4 та час</div>
        </div>

        <!-- Unit 8 -->
        <div class="curriculum-item warm-glass-panel glow-ef p-6 rounded-2xl flex flex-col justify-between" data-stage="B1">
          <div>
            <div class="flex items-center justify-between gap-3 mb-4">
              <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neon-rose/20 text-neon-rose border border-neon-rose/40">CEFR B1.1</span>
              <span class="text-xs font-mono text-slate-400">EINING 08</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Þátíð &amp; Kennimyndir Sagna</h3>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Чотири основні форми сильних дієслів (інфінітив, однина мин. часу, множина мин. часу, дієприкметник минулого часу) за BÍN.
            </p>
            <div class="p-3 rounded-xl bg-cyber-deep/95 border border-neon-rose/30 font-mono text-xs mb-4 space-y-1 text-slate-300">
              <div>&bull; að brjóta &ndash; braut &ndash; brutum &ndash; brotið</div>
              <div>&bull; að taka &ndash; tók &ndash; tókum &ndash; tekið</div>
            </div>
          </div>
          <div class="text-[11px] font-mono text-bin-ef font-bold uppercase">Kennimyndir • 4 форми</div>
        </div>

        <!-- Unit 9 -->
        <div class="curriculum-item warm-glass-panel glow-ef p-6 rounded-2xl flex flex-col justify-between" data-stage="B1">
          <div>
            <div class="flex items-center justify-between gap-3 mb-4">
              <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neon-rose/20 text-neon-rose border border-neon-rose/40">CEFR B1.1</span>
              <span class="text-xs font-mono text-slate-400">EINING 09</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Ópersónulegar Sagnir</h3>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Безособові дієслова з підметом у непрямому відмінку: <em>Mig langar</em> (ÞF), <em>Mér finnst</em> (ÞGF), <em>Mér líður vel</em>.
            </p>
            <div class="p-3 rounded-xl bg-cyber-deep/95 border border-neon-rose/30 font-mono text-xs mb-4 space-y-1 text-slate-300">
              <div>&bull; <span class="text-neon-coral font-bold">Mig</span> langar að læra íslensku [ÞF]</div>
              <div>&bull; <span class="text-neon-amber font-bold">Mér</span> finnst þetta gaman [ÞGF]</div>
            </div>
          </div>
          <div class="text-[11px] font-mono text-bin-ef font-bold uppercase">ÞF / ÞGF Безособові</div>
        </div>

        <!-- Unit 10 -->
        <div class="curriculum-item warm-glass-panel glow-nf p-6 rounded-2xl flex flex-col justify-between" data-stage="B1">
          <div>
            <div class="flex items-center justify-between gap-3 mb-4">
              <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neon-amber/20 text-neon-amber border border-neon-amber/40">CEFR B1.2</span>
              <span class="text-xs font-mono text-slate-400">EINING 10</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Lýsingarorð &amp; Eignarfornöfn</h3>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Сильне та слабке відмінювання прикметників, ступені порівняння та суттєва різниця між <em>sinn</em> (свій власний) та <em>hans/hennar</em>.
            </p>
            <div class="p-3 rounded-xl bg-cyber-deep/95 border border-neon-amber/30 font-mono text-xs mb-4 space-y-1 text-slate-300">
              <div>&bull; Jón tók bókina <span class="text-neon-amber font-bold">sína</span> (свою)</div>
              <div>&bull; Jón tók bókina <span class="text-neon-coral font-bold">hans</span> (його)</div>
            </div>
          </div>
          <div class="text-[11px] font-mono text-bin-nf font-bold uppercase">Прикметники &amp; Свій/Його</div>
        </div>

        <!-- Unit 11 -->
        <div class="curriculum-item warm-glass-panel glow-tgf p-6 rounded-2xl flex flex-col justify-between" data-stage="B2">
          <div>
            <div class="flex items-center justify-between gap-3 mb-4">
              <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/40">CEFR B2.1</span>
              <span class="text-xs font-mono text-slate-400">EINING 11</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Viðtengingarháttur &amp; Skilyrði</h3>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Утворення та використання кон'юнктива (Subjunctive) у підрядних реченнях, непрямій мові та умовних конструкціях (*ef*, *þó að*).
            </p>
            <div class="p-3 rounded-xl bg-cyber-deep/95 border border-neon-purple/30 font-mono text-xs mb-4 space-y-1 text-slate-300">
              <div>&bull; „Ef ég <span class="text-neon-purple font-bold">væri</span> ríkur...“</div>
              <div>&bull; Hann sagði að hún <span class="text-neon-amber font-bold">kæmi</span> á morgun.</div>
            </div>
          </div>
          <div class="text-[11px] font-mono text-bin-tgf font-bold uppercase">Subjunctive • Кон'юнктив</div>
        </div>

        <!-- Unit 12 -->
        <div class="curriculum-item warm-glass-panel glow-ef p-6 rounded-2xl flex flex-col justify-between" data-stage="B2">
          <div>
            <div class="flex items-center justify-between gap-3 mb-4">
              <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neon-rose/20 text-neon-rose border border-neon-rose/40">CEFR B2.2</span>
              <span class="text-xs font-mono text-slate-400">EINING 12</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Þolmynd, Miðmynd &amp; BÍN Reader</h3>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Медіальні дієслова на *-st* (hittast, takast), пасивний стан (þolmynd) та академічний синтаксичний аналіз за базою BÍN.
            </p>
            <div class="p-3 rounded-xl bg-cyber-deep/95 border border-neon-rose/30 font-mono text-xs mb-4 space-y-1 text-slate-300">
              <div>&bull; Við <span class="text-neon-amber font-bold">hittumst</span> á morgun [MM]</div>
              <div>&bull; Húsið var <span class="text-neon-coral font-bold">byggt</span> árið 1920 [Þolmynd]</div>
            </div>
          </div>
          <div class="text-[11px] font-mono text-bin-ef font-bold uppercase">BÍN Reader • Пасив &amp; Медіал</div>
        </div>

      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 7. FOOTER                                                                 -->
  <!-- ========================================================================= -->
  <footer class="py-12 border-t border-cyber-border bg-cyber-void relative z-10 text-xs font-mono text-slate-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="text-lg text-neon-amber">⚡</span>
        <span>Íslenskukennsla WARM NEON &bull; BÍN &amp; Mímir samræmt kerfi</span>
      </div>
      <div>
        100% академічна українська локалізація та нативний ісландський синтез звуку.
      </div>
    </div>
  </footer>

  <!-- ========================================================================= -->
  <!-- JAVASCRIPT: AUDIO ENGINE & INTERACTIVITY                                  -->
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

    let mouseX = 0, mouseY = 0;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class WarmParticle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.char = characters[Math.floor(Math.random() * characters.length)];
        this.x = (Math.random() - 0.5) * canvas.width * 1.5;
        this.y = (Math.random() - 0.5) * canvas.height * 1.5;
        this.z = init ? Math.random() * 800 + 100 : 900;
        this.color = warmColors[Math.floor(Math.random() * warmColors.length)];
        this.size = Math.random() * 22 + 14;
        this.vz = Math.random() * 0.7 + 0.3;
      }
      update() {
        this.z -= this.vz;
        if (this.z <= 10) this.reset(false);
      }
      draw() {
        const factor = 400 / this.z;
        const x = this.x * factor + canvas.width / 2 + (mouseX * 0.05);
        const y = this.y * factor + canvas.height / 2 + (mouseY * 0.05);
        const fontSize = Math.max(8, this.size * factor);

        if (x > -50 && x < canvas.width + 50 && y > -50 && y < canvas.height + 50) {
          ctx.save();
          ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 12;
          ctx.fillText(this.char, x, y);
          ctx.restore();
        }
      }
    }

    for (let i = 0; i < 48; i++) {
      particles.push(new WarmParticle());
    }

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - canvas.width / 2);
      mouseY = (e.clientY - canvas.height / 2);
    });

    function animateCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();

    /* =========================================================================
       2. ROBUST WEB SPEECH AUDIO ENGINE (is-IS, Rate 0.80, Pitch 0.88)
       ========================================================================= */
    const phoneticLetterNames = {
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
    };

    function speakIcelandic(text, cardElement) {
      if (!('speechSynthesis' in window)) {
        console.log('SpeechSynthesis unavailable');
        return;
      }

      window.speechSynthesis.cancel();

      // If single letter is passed, map to spelled-out Icelandic name
      const cleanKey = text.trim();
      const textToSpeak = phoneticLetterNames[cleanKey] || text;

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

      // Visual active glow on player card
      if (cardElement) {
        cardElement.classList.add('ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
      }

      utterance.onend = () => {
        if (cardElement) cardElement.classList.remove('ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
      };
      utterance.onerror = () => {
        if (cardElement) cardElement.classList.remove('ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
      };

      window.speechSynthesis.speak(utterance);
    }

    // Current Inspector state
    let currentInspectorLetter = 'A';
    let currentInspectorWord = 'Afi';

    function updateInspector(letterPair, ipa, word, trans) {
      document.getElementById('inspect-letter').innerText = letterPair;
      document.getElementById('inspect-ipa').innerText = ipa;
      document.getElementById('inspect-word').innerText = word;
      document.getElementById('inspect-trans').innerText = trans;
      document.getElementById('inspect-btn-word').innerText = word;
      currentInspectorLetter = letterPair.split(' ')[0];
      currentInspectorWord = word;
    }

    function speakSelectedLetter(btnElement) {
      speakIcelandic(currentInspectorLetter, btnElement);
    }

    function speakSelectedWord(btnElement) {
      speakIcelandic(currentInspectorWord, btnElement);
    }

    // Play all dialogue lines sequentially
    let isPlayingDialogue = false;
    async function playFullDialogue() {
      if (isPlayingDialogue) return;
      isPlayingDialogue = true;
      const btn = document.getElementById('play-full-dialogue-btn');
      if (btn) btn.innerHTML = `<span>⏳ Відтворення...</span>`;

      const lines = [
        { text: 'Sæll! Hvað heitir þú?', id: 'd1-line-1' },
        { text: 'Sæl! Ég heiti Anna. Hvaðan ert þú?', id: 'd1-line-2' },
        { text: 'Ég er frá Íslandi. En þú?', id: 'd1-line-3' },
        { text: 'Ég er frá Úkraínu. Gaman að hitta þig!', id: 'd1-line-4' }
      ];

      for (let i = 0; i < lines.length; i++) {
        const el = document.getElementById(lines[i].id);
        speakIcelandic(lines[i].text, el);
        await new Promise(r => setTimeout(r, 2600));
      }

      if (btn) btn.innerHTML = `<span>▶️ Spila allt samtalið (Слухати весь діалог)</span>`;
      isPlayingDialogue = false;
    }

    // Level Filter logic
    function filterCurriculum(stage) {
      document.querySelectorAll('.level-pill').forEach(btn => {
        btn.classList.remove('bg-neon-amber', 'text-cyber-void', 'font-bold');
        btn.classList.add('text-slate-300', 'font-medium');
      });

      const activeBtn = document.getElementById('filter-pill-' + stage);
      if (activeBtn) {
        activeBtn.classList.remove('text-slate-300', 'font-medium');
        activeBtn.classList.add('bg-neon-amber', 'text-cyber-void', 'font-bold');
      }

      document.querySelectorAll('.curriculum-item').forEach(card => {
        if (stage === 'all' || card.getAttribute('data-stage') === stage) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }

    // Preload voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        const v = voices.find(v => v.lang.startsWith('is') && (
          v.name.includes('Karl') || v.name.includes('Gunnar') || v.name.includes('Male') || v.name.includes('Wavenet-B')
        )) || voices.find(v => v.lang.startsWith('is'));
        const navPill = document.getElementById('male-voice-badge-nav');
        if (navPill && v) {
          navPill.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span><span>🎙️ ${v.name.split(' ')[0]} (is-IS • 0.80x • 0.88p)</span>`;
        }
      };
    }
  </script>
</body>
</html>
"""

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

with open(desktop_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Generated {output_file} ({len(html_content)} bytes)")
print(f"Synchronized {desktop_file} ({len(html_content)} bytes)")
