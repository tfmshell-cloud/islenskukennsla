/**
 * UnifiedPodcastPlayer.js - Єдиний компактний аудіоплеєр та Студія подкастів NotebookLM Master
 * Кокпіт-архітектура: ВСЕ ПОМІЩАЄТЬСЯ НА ОДНОМУ ЕКРАНІ без безкінечного скролінгу.
 * Верхній плеєр + 2 збалансовані блоки (Плейлист зліва + Транскрипт справа).
 */

import { PODCASTS_CORPUS } from '../data/podcasts_corpus.js?v=3.0';

export class UnifiedPodcastPlayer {
  constructor(container, options = {}) {
    this.container = container;
    this.isEmbeddedInLesson = options.isEmbedded || false;
    this.activeEpisodeNum = options.defaultEp || 1;
    this.activeFilter = 'all'; // 'all' | 'A1' | 'A2' | 'B1'
    this.activeTabRight = 'transcript'; // 'transcript' | 'context'
    this.playbackRate = 1.0;
  }

  // Отримати епізод за номером або за ідентифікатором
  getEpisode(epIdentifier) {
    if (epIdentifier === 'm0') return PODCASTS_CORPUS.episodes.find(e => e.id === 'm0_prykhovana_logika_vymovy');
    if (epIdentifier === 'm1') return PODCASTS_CORPUS.episodes.find(e => e.id === 'm1_logika_islanskoi_hramatyky_vid_landshaftu');
    return PODCASTS_CORPUS.episodes.find(e => String(e.ep) === String(epIdentifier)) || PODCASTS_CORPUS.episodes[0];
  }

  // Фільтрація епізодів за категоріями
  getFilteredEpisodes() {
    const list = PODCASTS_CORPUS.episodes || [];
    if (this.activeFilter === 'all') return list;
    if (this.activeFilter === 'A1') {
      return list.filter(e => e.level.includes('A0') || e.level.includes('A1'));
    }
    if (this.activeFilter === 'A2') {
      return list.filter(e => e.level.includes('A2'));
    }
    if (this.activeFilter === 'B1') {
      return list.filter(e => e.level.includes('B1') || e.level.includes('B2'));
    }
    return list;
  }

  // Рендер повної Студії Подкастів (Кокпіт на 1 екран)
  renderStudio() {
    const ep = this.getEpisode(this.activeEpisodeNum);
    const filtered = this.getFilteredEpisodes();
    const readyCount = PODCASTS_CORPUS.episodes.filter(e => e.statusLabel && e.statusLabel.includes('MASTER')).length;

    this.container.innerHTML = `
      <div class="space-y-3 font-sans max-w-7xl mx-auto">
        
        <!-- ================= БЛОК 1: КОМПАКТНИЙ МЕДІА-КОКПІТ (ВЕРХНІЙ ПЛЕЄР) ================= -->
        <div class="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-amber-950/50 border border-purple-500/30 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          <!-- Ліва частина: Інформація про трек -->
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center text-xl shrink-0 shadow-md">
              🎙️
            </div>
            <div class="min-w-0 space-y-0.5">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="px-2 py-0.2 rounded bg-purple-500 text-black font-mono text-[10px] font-black uppercase">
                  Епізод ${ep.ep}
                </span>
                <span class="px-2 py-0.2 rounded bg-amber-400 text-black font-mono text-[10px] font-black uppercase">
                  MASTER
                </span>
                <span class="text-[11px] font-mono text-cyan-300 font-bold">⏱️ ${ep.duration}</span>
                <span class="text-[11px] font-mono text-slate-400 hidden sm:inline">• ${ep.level}</span>
              </div>
              <h2 class="text-sm sm:text-base font-extrabold text-white truncate tracking-tight" title="${ep.titleUkr}">
                ${ep.titleUkr}
              </h2>
              <div class="text-[11px] font-mono text-amber-200/80 truncate">
                🇮🇸 ${ep.titleIsl} • ${ep.bilingualRatio}
              </div>
            </div>
          </div>

          <!-- Центральна та права частина: Аудіо, Швидкість та Завантаження -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <audio id="studio-main-audio" controls class="h-10 w-full sm:w-64 md:w-72 rounded-xl outline-none bg-black/80 border border-slate-700" src="${ep.audioFile}"></audio>
            
            <div class="flex items-center justify-between sm:justify-start gap-1.5 font-mono text-xs">
              <div class="flex items-center bg-black/60 p-0.5 rounded-lg border border-slate-800">
                <button onclick="window.__STUDIO_PLAYER__.setSpeed(0.8)" class="speed-btn px-2 py-1 rounded text-[11px] font-bold ${this.playbackRate === 0.8 ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'}">0.8x</button>
                <button onclick="window.__STUDIO_PLAYER__.setSpeed(1.0)" class="speed-btn px-2 py-1 rounded text-[11px] font-bold ${this.playbackRate === 1.0 ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'}">1.0x</button>
                <button onclick="window.__STUDIO_PLAYER__.setSpeed(1.2)" class="speed-btn px-2 py-1 rounded text-[11px] font-bold ${this.playbackRate === 1.2 ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'}">1.2x</button>
              </div>

              <a id="studio-dl-btn" href="${ep.audioFile}" download class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 text-[11px] font-bold shadow-sm" title="Завантажити аудіофайли для авто">
                <span>⬇️</span><span class="hidden md:inline">Завантажити</span>
              </a>
            </div>
          </div>

        </div>

        <!-- ================= БЛОК 2 ТА 3: СІТКА НА ОДНІЙ СТОРІНЦІ (ПЛЕЙЛИСТ + ТРАНСКРИПТ) ================= -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
          
          <!-- ЛІВИЙ БЛОК (5 колонок): Плейлист із фільтрами та власним компактним скролом -->
          <div class="lg:col-span-5 p-3 rounded-2xl bg-cyber-card border border-slate-800 shadow-xl space-y-2.5 flex flex-col h-[560px]">
            
            <!-- Заголовок та фільтри плейлиста -->
            <div class="flex items-center justify-between gap-1 pb-2 border-b border-slate-800/80">
              <div class="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                <span>📻</span><span>ПЛЕЙЛИСТ</span>
                <span class="px-1.5 py-0.2 rounded-full bg-amber-400 text-black text-[10px] font-black">${readyCount}/22 ГОТОВІ</span>
              </div>
              <div class="text-[11px] font-mono text-slate-400">
                ⏱️ 5+ годин
              </div>
            </div>

            <!-- Селектор категорій/рівнів (Пілси) -->
            <div class="grid grid-cols-4 gap-1 font-mono text-[11px]">
              <button onclick="window.__STUDIO_PLAYER__.setFilter('all')" class="py-1 px-1.5 rounded-lg text-center font-bold border transition-all ${this.activeFilter === 'all' ? 'bg-cyan-500 text-black border-cyan-400 shadow-sm' : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white'}">
                Всі (22)
              </button>
              <button onclick="window.__STUDIO_PLAYER__.setFilter('A1')" class="py-1 px-1.5 rounded-lg text-center font-bold border transition-all ${this.activeFilter === 'A1' ? 'bg-cyan-500 text-black border-cyan-400 shadow-sm' : 'bg-black/40 text-cyan-400 border-slate-800 hover:text-white'}">
                A0–A1
              </button>
              <button onclick="window.__STUDIO_PLAYER__.setFilter('A2')" class="py-1 px-1.5 rounded-lg text-center font-bold border transition-all ${this.activeFilter === 'A2' ? 'bg-emerald-500 text-black border-emerald-400 shadow-sm' : 'bg-black/40 text-emerald-400 border-slate-800 hover:text-white'}">
                A2
              </button>
              <button onclick="window.__STUDIO_PLAYER__.setFilter('B1')" class="py-1 px-1.5 rounded-lg text-center font-bold border transition-all ${this.activeFilter === 'B1' ? 'bg-purple-500 text-black border-purple-400 shadow-sm' : 'bg-black/40 text-purple-400 border-slate-800 hover:text-white'}">
                B1–B2
              </button>
            </div>

            <!-- Скрол-зона списку епізодів (Автоматичний плавний скрол без розтягування сторінки) -->
            <div class="flex-1 overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700">
              ${filtered.map(item => {
                const isSelected = String(item.ep) === String(ep.ep);
                const isMaster = item.statusLabel && item.statusLabel.includes('MASTER');
                return `
                  <div onclick="window.__STUDIO_PLAYER__.selectEpisode('${item.ep}')" class="p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${isSelected ? 'bg-purple-950/70 border-purple-400 shadow-md ring-1 ring-purple-400/50' : 'bg-black/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'}">
                    <div class="min-w-0 space-y-0.5 flex-1">
                      <div class="flex items-center gap-1.5 font-mono text-[10px]">
                        <span class="px-1.5 py-0.2 rounded font-bold ${isSelected ? 'bg-purple-400 text-black' : 'bg-slate-800 text-slate-300'}">
                          Еп. ${item.ep}
                        </span>
                        ${isMaster ? '<span class="px-1 py-0.2 rounded bg-amber-400 text-black font-black text-[9px]">MASTER</span>' : '<span class="px-1 py-0.2 rounded bg-slate-800 text-slate-400 text-[9px]">Прев\'ю</span>'}
                        <span class="text-slate-400">${item.duration}</span>
                      </div>
                      <div class="text-xs font-bold text-white truncate ${isSelected ? 'text-amber-300' : ''}">
                        ${item.titleUkr}
                      </div>
                      <div class="text-[10px] text-slate-400 truncate font-mono">
                        ${item.titleIsl}
                      </div>
                    </div>
                    <div class="shrink-0 text-right font-mono">
                      <span class="w-6 h-6 rounded-lg ${isSelected ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400'} flex items-center justify-center text-xs font-black">
                        ${isSelected ? '▶' : '•'}
                      </span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

          </div>

          <!-- ПРАВИЙ БЛОК (7 колонок): Інтерактивний Транскрипт Остапа й Поліни та Контекст -->
          <div class="lg:col-span-7 p-3 sm:p-4 rounded-2xl bg-cyber-card border border-slate-800 shadow-xl space-y-2.5 flex flex-col h-[560px]">
            
            <!-- Шапка правого блоку з перемикачем (Транскрипт vs Ситуація & Якорі) -->
            <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
              <div class="flex items-center gap-1 font-mono text-xs">
                <button onclick="window.__STUDIO_PLAYER__.setRightTab('transcript')" class="px-3 py-1 rounded-lg font-bold border transition-all ${this.activeTabRight === 'transcript' ? 'bg-cyan-500 text-black border-cyan-400 shadow-sm' : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white'}">
                  💬 Діалог & Транскрипт (${(ep.script || []).length})
                </button>
                <button onclick="window.__STUDIO_PLAYER__.setRightTab('context')" class="px-3 py-1 rounded-lg font-bold border transition-all ${this.activeTabRight === 'context' ? 'bg-amber-500 text-black border-amber-400 shadow-sm' : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white'}">
                  📍 Ситуація & Якорі BÍN
                </button>
              </div>

              <div class="font-mono text-[11px] text-slate-400 hidden sm:block">
                Остап & Поліна
              </div>
            </div>

            <!-- Вміст вкладки 1: Повний живий транскрипт (з виділенням ведучих) -->
            <div class="flex-1 overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-slate-700 ${this.activeTabRight === 'transcript' ? '' : 'hidden'}">
              ${(ep.script && ep.script.length > 0) ? ep.script.map((line, idx) => {
                const isOstap = line.speaker === 'Остап';
                const isPolina = line.speaker === 'Поліна';
                const isNative = line.speaker === 'Gunnar' || line.speaker === 'Guðrún';
                
                const badgeColor = isOstap 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                  : isPolina 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                    : isNative 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-purple-500/20 text-purple-300 border-purple-500/40';

                return `
                  <div class="p-2.5 rounded-xl bg-black/40 border border-slate-800/80 space-y-1 hover:border-slate-700 transition-colors">
                    <div class="flex items-center justify-between text-[11px] font-mono">
                      <div class="flex items-center gap-1.5">
                        <span class="px-2 py-0.2 rounded font-bold border ${badgeColor}">
                          ${line.speaker}
                        </span>
                        <span class="text-slate-400 text-[10px]">• ${line.role}</span>
                      </div>
                      <span class="text-slate-600 text-[10px]">#${idx + 1}</span>
                    </div>
                    <div class="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans pl-1">
                      ${line.text}
                    </div>
                  </div>
                `;
              }).join('') : `
                <div class="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
                  <div class="text-3xl">🎧</div>
                  <div class="font-bold text-white text-sm">Повний 15-20 хвилинний аудіовипуск доступний у плеєрі зверху!</div>
                  <p class="text-xs max-w-md">Слухайте живу бесіду Остапа та Поліни через вбудований плеєр або завантажте трек у машину.</p>
                </div>
              `}
            </div>

            <!-- Вміст вкладки 2: Ситуація та Ключові Опори -->
            <div class="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-slate-700 ${this.activeTabRight === 'context' ? '' : 'hidden'}">
              <div class="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-1.5">
                <div class="font-mono font-bold text-cyan-400 text-xs flex items-center gap-1.5">
                  <span>📍</span><span>ЖИТТЄВА СИТУАЦІЯ ТА СЮЖЕТ</span>
                </div>
                <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">${ep.situation}</p>
              </div>

              <div class="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <div class="font-mono font-bold text-amber-400 text-xs flex items-center gap-1.5">
                  <span>⚓</span><span>КЛЮЧОВІ МОВНІ ОПОРИ ТА ВІДМІНКИ (BÍN)</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-slate-300">
                  ${(ep.anchors || []).map(a => `
                    <div class="p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-1.5">
                      <span class="text-amber-400 font-bold">▪</span>
                      <span class="leading-snug">${a}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 font-mono text-xs space-y-1 text-slate-300">
                <div class="font-bold text-purple-300">💡 РЕКОМЕНДАЦІЯ ДЛЯ ВОДІЇВ ТА ПІШОХОДІВ:</div>
                <p class="text-[11px] text-slate-400">Слухайте цей випуск у дорозі двічі: перший раз на швидкості 1.0x для сприйняття загального сюжету, другий раз — на швидкості 0.8x для точного повторення ісландських звуків за Поліною.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    `;

    // Зберігаємо екземпляр для глобального доступу з кнопок
    window.__STUDIO_PLAYER__ = this;
  }

  // Рендер компактного аудіоплеєра всередині кожного уроку
  renderLessonPlayer(epIdentifier) {
    const ep = this.getEpisode(epIdentifier);
    const isMaster = ep.statusLabel && ep.statusLabel.includes('MASTER');

    this.container.innerHTML = `
      <div class="p-4 sm:p-5 rounded-2xl bg-cyber-card border border-amber-500/40 shadow-xl space-y-3.5">
        
        <!-- Шапка епізоду уроку -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-800">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-amber-400 text-black font-mono text-[10px] font-black uppercase">
                ${isMaster ? '🌟 NOTEBOOKLM MASTER' : '🎧 ОЗВУЧКА УРОКУ'}
              </span>
              <span class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono text-[10px]">
                Епізод ${ep.ep}
              </span>
              <span class="text-xs font-mono text-cyan-300 font-bold">⏱️ ${ep.duration}</span>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-white tracking-tight">
              ${ep.titleUkr}
            </h3>
            <div class="text-xs font-mono text-amber-200/90">
              🇮🇸 ${ep.titleIsl} • ${ep.bilingualRatio}
            </div>
          </div>

          <div class="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
            <a href="${ep.audioFile}" download class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm">
              <span>⬇️</span><span>Завантажити</span>
            </a>
          </div>
        </div>

        <!-- Аудіоплеєр -->
        <audio controls class="w-full h-10 rounded-xl outline-none bg-black/80 border border-slate-700" src="${ep.audioFile}"></audio>

        <!-- Опис та маркери -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
          <div class="p-3 rounded-xl bg-black/50 border border-slate-800 space-y-1">
            <div class="font-mono font-bold text-cyan-400 text-[11px]">📍 СИТУАЦІЯ ТА КОНТЕКСТ</div>
            <p class="text-slate-300 leading-relaxed">${ep.situation}</p>
          </div>
          <div class="p-3 rounded-xl bg-black/50 border border-slate-800 space-y-1">
            <div class="font-mono font-bold text-amber-400 text-[11px]">⚓ КЛЮЧОВІ МОВНІ ОПОРИ</div>
            <div class="space-y-0.5 font-mono text-[11px] text-slate-300">
              ${(ep.anchors || []).map(a => `<div>▪ ${a}</div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Повний транскрипт Остапа й Поліни -->
        <div class="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-2">
          <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span class="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              💬 Транскрипт випуску (Остап & Поліна)
            </span>
            <span class="text-[10px] font-mono text-slate-400">${(ep.script || []).length} реплік</span>
          </div>
          <div class="space-y-1.5 max-h-[260px] overflow-y-auto pr-1 text-xs scrollbar-thin">
            ${(ep.script || []).map(s => `
              <div class="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-0.5">
                <div class="font-mono font-bold text-[10px] text-cyan-300">${s.speaker} (${s.role})</div>
                <div class="text-slate-200 font-sans leading-relaxed">${s.text}</div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  setSpeed(speed) {
    this.playbackRate = speed;
    const player = document.getElementById('studio-main-audio');
    if (player) player.playbackRate = speed;
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.className = `speed-btn px-2 py-1 rounded text-[11px] font-bold ${
        btn.innerText === `${speed}x` 
          ? 'bg-cyan-500 text-black' 
          : 'text-slate-400 hover:text-white'
      }`;
    });
  }

  setFilter(filterKey) {
    this.activeFilter = filterKey;
    this.renderStudio();
  }

  setRightTab(tabKey) {
    this.activeTabRight = tabKey;
    this.renderStudio();
  }

  selectEpisode(epNum) {
    this.activeEpisodeNum = epNum;
    this.renderStudio();
    const player = document.getElementById('studio-main-audio');
    if (player) {
      player.play().catch(() => {});
    }
  }

  speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'is-IS';
    utt.rate = 0.9;
    window.speechSynthesis.speak(utt);
  }
}
