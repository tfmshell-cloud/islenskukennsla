/**
 * SagaRoadmap.js - Duolingo-style Saga Roadmap across Iceland
 * Stylized cyberpunk topology map of Iceland with milestone nodes, stars, and fast travel.
 */

import { gameState } from './GameState.js';

export class SagaRoadmap {
  constructor(container, onNavigateChapter) {
    this.container = container;
    this.onNavigateChapter = onNavigateChapter;
    this.milestones = [
      {
        id: 'keflavik',
        targetChapter: 'modull_0',
        name: 'Keflavíkurflugvöllur (Аеропорт Кеflavík)',
        topic: 'Урок 0: Абетка та звуки (Stafrófið)',
        desc: 'Прибуття до Ісландії: 32 літери, 3D мнемоніки, вимова та гортанна преаспірація [h].',
        coords: { x: 14, y: 72 },
        icon: '🔤',
        stars: 3,
        xpReward: 100,
        rune: 'ᚨ (Áss)'
      },
      {
        id: 'reykjavik',
        targetChapter: 'kafli_1',
        name: 'Reykjavík Miðbær (Центр Рейк\'явіка)',
        topic: 'Урок 1: Хто ти? (Hver ert þú?)',
        desc: 'Перше знайомство: дієслово «að vera», професії, країни, frá + ÞGF 🟡 та імміграційна служба.',
        coords: { x: 25, y: 64 },
        icon: '🌟',
        stars: 3,
        xpReward: 150,
        rune: 'ᚱ (Reið)'
      },
      {
        id: 'vesturbaer',
        targetChapter: 'drops_lab',
        name: 'Kaffihús Vesturbæjar (Кав\'ярня Рейк\'явік)',
        topic: 'Урок 2: У кав\'ярні (Знахідний відмінок 🟢)',
        desc: 'Замовлення в кав\'ярні, жива SVG-вітрина страв, бариста Свейн та реактор знахідного відмінка Þolfall.',
        coords: { x: 23, y: 55 },
        icon: '☕',
        stars: 3,
        xpReward: 100,
        rune: 'ᚲ (Kaun)'
      },
      {
        id: 'thingvellir',
        targetChapter: 'modull_3',
        name: 'Þingvellir (Розлом плит & Парламент)',
        topic: 'Урок 3: Щоденна рутина та V2 (Rútína)',
        desc: 'Парламент вікінгів: щоденна рутина, закон другого дієслова V2 та ісландський час.',
        coords: { x: 38, y: 56 },
        icon: '⏰',
        stars: 3,
        xpReward: 200,
        rune: 'ᚦ (Þurs)'
      },
      {
        id: 'kringlan',
        targetChapter: 'kafli_4',
        name: 'Kringlan & Smáralind (Торгові центри)',
        topic: 'Урок 4: Одяг, кольори та сильні прикметники (Föt & litir)',
        desc: 'Шопінг у Рейк\'явіку: сильна відміна прикметників, U-умлаут (svartur -> svört), прийменники fara í/úr та арктична шаруватість.',
        coords: { x: 44, y: 58 },
        icon: '👗',
        stars: 3,
        xpReward: 200,
        rune: 'ᚷ (Gebo)'
      },
      {
        id: 'heilsugaeslan',
        targetChapter: 'kafli_5',
        name: 'Heilsugæslan & Lyfja (Поліклініка)',
        topic: 'Урок 5: Сім\'я, анатомія та здоров\'я (Líkaminn & heilsa)',
        desc: 'Дільнична лікарня: безособовий синтаксис (Mér er illt í... + ÞGF 🟡), частини тіла, R-відміна родичів та система Heilsuvera.',
        coords: { x: 50, y: 62 },
        icon: '🩺',
        stars: 3,
        xpReward: 200,
        rune: 'ᚺ (Hagall)'
      },
      {
        id: 'veitingahus',
        targetChapter: 'kafli_6',
        name: 'Íslenskur Veitingastaður (Ресторан & Кйотсупа)',
        topic: 'Урок 6: Їжа, кулінарія та ресторан (Matur & eldamennska)',
        desc: 'Гастрономія Ісландії: партитивні конструкції (glas af vatni 🟡), кулінарні дієслова (að sjóða -> ég sýð), замовлення страв.',
        coords: { x: 62, y: 54 },
        icon: '🍽️',
        stars: 3,
        xpReward: 200,
        rune: 'ᚾ (Nauðr)'
      },
      {
        id: 'sundlaug',
        targetChapter: 'saga_map',
        name: 'Laugardalslaug (Термальні басейни)',
        topic: 'Урок 7: Дозвілля, басейни та погода (ФІНАЛ РІВНЯ A1)',
        desc: 'Культура геотермальних басейнів, пори року, погода та Великий сертифікаційний іспит рівня A1.',
        coords: { x: 74, y: 45 },
        icon: '🏊',
        stars: 0,
        xpReward: 300,
        rune: 'ᛁ (Ís)'
      }
    ];
  }

  render() {
    const state = gameState.state;

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Header & Stats Bar -->
        <div class="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 via-cyber-deep to-amber-500/10 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div class="space-y-0.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.2 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                Duolingo Engine
              </span>
              <h2 class="text-base sm:text-lg font-black text-white font-mono flex items-center gap-1.5">
                <span>🗺️ Шлях Саги: Карта подорожі Ісландією</span>
              </h2>
            </div>
            <p class="text-xs text-slate-300 font-sans">
              Рухайтесь Кільцевою дорогою (Hringvegur): відкривайте локації, здобувайте кристали 💎 та бали XP!
            </p>
          </div>

          <!-- Player HUD -->
          <div class="flex items-center gap-3 text-xs font-mono self-start sm:self-auto bg-black/60 px-3 py-1.5 rounded-xl border border-slate-800">
            <div class="flex items-center gap-1 text-cyan-400 font-bold" title="Бали досвіду">
              <span>⚡</span> <span id="map-xp-badge">${state.xp} XP</span>
            </div>
            <div class="flex items-center gap-1 text-amber-400 font-bold" title="Дні поспіль">
              <span>🔥</span> <span id="map-streak-badge">${state.streak} дні</span>
            </div>
            <div class="flex items-center gap-1 text-emerald-400 font-bold" title="Кристали">
              <span>💎</span> <span id="map-gems-badge">${state.gems}</span>
            </div>
            <div class="text-slate-300 text-[10px] border-l border-slate-700 pl-2 hidden md:inline">
              ${state.vikingTitle}
            </div>
          </div>
        </div>

        <!-- Stylized Cyberpunk Iceland Map Viewport -->
        <div class="relative w-full h-80 sm:h-96 rounded-2xl bg-[#06040A] border border-cyan-500/40 overflow-hidden shadow-2xl select-none">
          <!-- Aurora Borealis effect background -->
          <div class="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-emerald-500/5 to-rose-500/10 pointer-events-none"></div>
          <div class="absolute top-1/4 left-1/3 w-64 h-24 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none animate-pulse"></div>

          <!-- SVG Topology Contour of Iceland & Trail -->
          <svg viewBox="0 0 100 100" class="w-full h-full preserve-3d" preserveAspectRatio="none">
            <!-- Stylized Iceland Island Contour -->
            <path d="M 12 70 Q 10 50 16 35 Q 22 20 40 18 Q 60 16 75 22 Q 92 30 90 48 Q 88 62 78 72 Q 65 82 45 84 Q 25 86 16 78 Z" 
                  fill="#0E0716" stroke="rgba(0, 229, 255, 0.25)" stroke-width="0.8" stroke-dasharray="1.5, 1" />
            
            <!-- Interior Glaciers (Vatnajökull & Langjökull contours) -->
            <path d="M 55 60 Q 65 52 75 62 Q 70 74 58 72 Z" fill="rgba(0, 229, 255, 0.08)" stroke="rgba(0, 229, 255, 0.3)" stroke-width="0.5" />
            <path d="M 32 42 Q 40 38 42 48 Q 35 52 30 46 Z" fill="rgba(0, 230, 118, 0.06)" stroke="rgba(0, 230, 118, 0.25)" stroke-width="0.4" />

            <!-- Cyber Ring Road (Hringvegur 1 Trail) -->
            <path d="M 14 72 L 25 64 L 23 55 L 38 56 L 48 52 L 58 22 L 86 35 L 75 72 L 45 82 Z" 
                  fill="none" stroke="rgba(255, 184, 0, 0.35)" stroke-width="1.2" stroke-dasharray="2, 2" class="animate-pulse" />
          </svg>

          <!-- Interactive Milestone Checkpoint Nodes -->
          ${this.milestones.map((m, idx) => {
            const isUnlocked = state.unlockedNodes.includes(m.id);
            const isCurrent = m.id === 'reykjavik' || m.id === 'keflavik';

            let borderCls = isUnlocked ? 'border-amber-400 bg-black/80 text-amber-300 ring-4 ring-amber-400/20 shadow-amber-500/40' : 'border-slate-800 bg-black/60 text-slate-600 opacity-60';
            if (isCurrent) {
              borderCls = 'border-cyan-400 bg-black/90 text-cyan-300 ring-4 ring-cyan-400/30 shadow-cyan-500/50 animate-bounce';
            }

            return `
              <div class="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group" style="left: ${m.coords.x}%; top: ${m.coords.y}%;" data-node-id="${m.id}" data-target-chapter="${m.targetChapter}">
                <!-- Glowing Node Circle -->
                <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 ${borderCls} flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-110">
                  <span class="text-sm sm:text-base leading-none">${m.icon}</span>
                  <span class="text-[8px] font-mono font-bold leading-none mt-0.5 text-amber-400">
                    ${'★'.repeat(m.stars)}${'☆'.repeat(3 - m.stars)}
                  </span>
                </div>

                <!-- Hover Card Tooltip -->
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 sm:w-56 p-2.5 rounded-xl bg-cyber-deep/95 border border-cyan-500/50 shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-30 space-y-1 text-xs">
                  <div class="flex items-center justify-between text-[10px] font-mono">
                    <span class="text-amber-400 font-bold">${m.rune}</span>
                    <span class="text-cyan-400 font-bold">+${m.xpReward} XP</span>
                  </div>
                  <strong class="font-mono text-white text-xs block leading-tight">${m.name}</strong>
                  <div class="text-[10px] text-cyan-300 font-mono font-bold">${m.topic}</div>
                  <p class="text-[10px] text-slate-300 font-sans leading-tight line-clamp-2">${m.desc}</p>
                  <div class="pt-1 text-[9px] font-mono text-amber-300 font-bold text-center">
                    ${isUnlocked ? '➔ Клікніть, щоб перейти' : '🔒 Заблоковано'}
                  </div>
                </div>

                <!-- Node Label Pill -->
                <div class="mt-1 -translate-x-1/4 px-1.5 py-0.2 rounded bg-black/80 border border-slate-800 text-[9px] font-mono font-bold text-slate-300 whitespace-nowrap hidden sm:block">
                  #${idx + 1} ${m.name.split('(')[0]}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Saga Legend & Fast Travel Bar -->
        <div class="p-3 rounded-xl bg-cyber-deep border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
          <div class="flex items-center gap-3 flex-wrap text-[11px]">
            <span class="text-slate-400">Легенда карти:</span>
            <span class="flex items-center gap-1 text-cyan-300"><span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> Активна сага</span>
            <span class="flex items-center gap-1 text-amber-300"><span class="w-2 h-2 rounded-full bg-amber-400"></span> Пройдено</span>
            <span class="flex items-center gap-1 text-slate-500"><span class="w-2 h-2 rounded-full bg-slate-700"></span> Попереду</span>
          </div>
          <div class="flex items-center gap-2">
            <button id="quick-jump-m0" class="px-2.5 py-1 rounded-lg bg-black/60 hover:bg-cyan-500/20 text-cyan-300 border border-slate-800 text-[11px] font-bold transition-all">
              ➔ До Уроку 0 (Абетка)
            </button>
            <button id="quick-jump-k1" class="px-2.5 py-1 rounded-lg bg-black/60 hover:bg-cyan-500/20 text-cyan-300 border border-slate-800 text-[11px] font-bold transition-all">
              ➔ До Уроку 1 (Хто ти?)
            </button>
            <button id="quick-jump-cafe" class="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-bold transition-all shadow-sm">
              ➔ До Уроку 2 (Кав'ярня 🟢)
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('[data-node-id]').forEach(node => {
      node.addEventListener('click', () => {
        const targetChapter = node.dataset.targetChapter;
        const nodeId = node.dataset.nodeId;

        gameState.unlockNode(nodeId);

        if (this.onNavigateChapter) {
          this.onNavigateChapter(targetChapter);
        }
      });
    });

    const jumpM0 = this.container.querySelector('#quick-jump-m0');
    if (jumpM0 && this.onNavigateChapter) {
      jumpM0.addEventListener('click', () => this.onNavigateChapter('modull_0'));
    }

    const jumpK1 = this.container.querySelector('#quick-jump-k1');
    if (jumpK1 && this.onNavigateChapter) {
      jumpK1.addEventListener('click', () => this.onNavigateChapter('kafli_1'));
    }

    const jumpCafe = this.container.querySelector('#quick-jump-cafe');
    if (jumpCafe && this.onNavigateChapter) {
      jumpCafe.addEventListener('click', () => this.onNavigateChapter('drops_lab'));
    }
  }
}
