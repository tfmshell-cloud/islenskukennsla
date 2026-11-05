/**
 * UnifiedPodcastPlayer.js - Єдиний аудіоплеєр та студія подкастів NotebookLM Master
 * Працює як окрема сторінка Студії, так і як вбудований блок у кожному уроці.
 */

import { PODCASTS_CORPUS } from '../data/podcasts_corpus.js?v=3.0';

export class UnifiedPodcastPlayer {
  constructor(container, options = {}) {
    this.container = container;
    this.isEmbeddedInLesson = options.isEmbedded || false;
    this.activeEpisodeNum = options.defaultEp || 1;
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.playbackRate = 1.0;
  }

  // Отримати епізод за номером або за ідентифікатором
  getEpisode(epIdentifier) {
    if (epIdentifier === 'm0') return PODCASTS_CORPUS.episodes.find(e => e.id === 'm0_prykhovana_logika_vymovy');
    if (epIdentifier === 'm1') return PODCASTS_CORPUS.episodes.find(e => e.id === 'm1_logika_islanskoi_hramatyky_vid_landshaftu');
    return PODCASTS_CORPUS.episodes.find(e => String(e.ep) === String(epIdentifier)) || PODCASTS_CORPUS.episodes[0];
  }

  // Рендер повної Студії Подкастів (Головний розділ «🎙️ ПОДКАСТИ»)
  renderStudio() {
    const ep = this.getEpisode(this.activeEpisodeNum);
    const readyCount = PODCASTS_CORPUS.episodes.filter(e => e.statusLabel && e.statusLabel.includes('NOTEBOOKLM MASTER')).length;

    this.container.innerHTML = `
      <div class="space-y-4 font-sans">
        
        <!-- Верхній банер студії -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900/80 to-amber-950/40 border border-purple-500/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-400 text-black uppercase tracking-wider">
                🌟 NOTEBOOKLM MASTER STUDIO
              </span>
              <span class="text-xs font-mono text-cyan-300 font-bold">
                ${readyCount} з 22 епізодів готові
              </span>
            </div>
            <h2 class="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>🎙️</span><span>Білінгвальні Подкасти «Ісландська в дорозі»</span>
            </h2>
            <p class="text-xs text-slate-300 max-w-2xl">
              Студійні випуски з україномовними ведучими <strong>Остапом</strong> (побут, культура, виживання) та <strong>Поліною</strong> (фонетика, граматика BÍN). 
              Створено спеціально для вивчення мови в авто та навушниках.
            </p>
          </div>

          <div class="flex items-center gap-2 font-mono text-xs">
            <span class="px-3 py-1.5 rounded-xl bg-black/60 border border-slate-700 text-amber-300 font-bold">
              ⏱️ 4+ години аудіо
            </span>
          </div>
        </div>

        <!-- Центральний медіаплеєр -->
        <div class="p-4 sm:p-5 rounded-2xl bg-cyber-card border border-purple-500/30 shadow-2xl space-y-3.5">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span id="studio-ep-badge" class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[11px] font-mono font-bold">
                  Епізод ${ep.ep}
                </span>
                <span id="studio-status-badge" class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-mono font-bold">
                  ${ep.statusLabel || '🌟 NOTEBOOKLM MASTER'}
                </span>
                <span class="text-xs font-mono text-slate-400">⏱️ ${ep.duration}</span>
              </div>
              <h3 id="studio-track-title" class="text-base sm:text-lg font-bold text-white tracking-tight">
                ${ep.titleUkr}
              </h3>
              <div id="studio-track-sub" class="text-xs font-mono text-amber-200/90">
                🇮🇸 ${ep.titleIsl} • ${ep.bilingualRatio} • Рівень ${ep.level}
              </div>
            </div>

            <!-- Швидкість та завантаження -->
            <div class="flex items-center gap-2 self-start md:self-auto font-mono text-xs">
              <span class="text-slate-400 text-[11px]">Швидкість:</span>
              <button onclick="window.__STUDIO_PLAYER__.setSpeed(0.8)" class="speed-btn px-2 py-1 rounded border border-slate-700 hover:text-white ${this.playbackRate === 0.8 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold' : 'text-slate-400'}">0.8x</button>
              <button onclick="window.__STUDIO_PLAYER__.setSpeed(1.0)" class="speed-btn px-2 py-1 rounded border border-slate-700 hover:text-white ${this.playbackRate === 1.0 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold' : 'text-slate-400'}">1.0x</button>
              <button onclick="window.__STUDIO_PLAYER__.setSpeed(1.2)" class="speed-btn px-2 py-1 rounded border border-slate-700 hover:text-white ${this.playbackRate === 1.2 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold' : 'text-slate-400'}">1.2x</button>
              <a id="studio-dl-btn" href="${ep.audioFile}" download class="ml-2 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 text-[11px]" title="Завантажити mp4/m4a файл">
                <span>⬇️</span><span class="hidden sm:inline">Завантажити</span>
              </a>
            </div>
          </div>

          <!-- Аудіо тег HTML5 -->
          <audio id="studio-main-audio" controls class="w-full h-11 rounded-xl outline-none bg-black/80 border border-slate-700" src="${ep.audioFile}"></audio>
        </div>

        <!-- Сітка: Зліва список епізодів (22), Справа розбір активного епізоду -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          <!-- Ліва колонка: Список епізодів (5 колонок) -->
          <div class="lg:col-span-5 space-y-3">
            <div class="flex items-center justify-between font-mono text-xs text-slate-400">
              <span class="font-bold uppercase tracking-wider text-slate-300">ПЛЕЙЛИСТ (22 ЕПІЗОДИ)</span>
              <span class="text-amber-400 font-bold">13 Master готові</span>
            </div>

            <!-- Список карток епізодів -->
            <div class="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              ${PODCASTS_CORPUS.episodes.map(item => {
                const isSelected = String(item.ep) === String(ep.ep);
                const isMaster = item.statusLabel && item.statusLabel.includes('NOTEBOOKLM MASTER');
                return `
                  <div onclick="window.__STUDIO_PLAYER__.selectEpisode('${item.ep}')" class="p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-2 ${isSelected ? 'bg-purple-950/40 border-purple-500 shadow-md ring-1 ring-purple-500/50' : 'bg-cyber-card/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'}">
                    <div class="space-y-1">
                      <div class="flex items-center gap-1.5 font-mono text-[10px]">
                        <span class="px-1.5 py-0.2 rounded font-bold ${isSelected ? 'bg-purple-500 text-black' : 'bg-slate-800 text-slate-300'}">
                          Еп. ${item.ep}
                        </span>
                        ${isMaster ? '<span class="px-1.5 py-0.2 rounded bg-amber-400 text-black font-extrabold text-[9px]">MASTER</span>' : '<span class="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 text-[9px]">Preview</span>'}
                        <span class="text-slate-400">⏱️ ${item.duration}</span>
                      </div>
                      <div class="text-xs font-bold text-white leading-tight">
                        ${item.titleUkr}
                      </div>
                      <div class="text-[11px] font-mono text-slate-400 truncate max-w-[280px]">
                        ${item.titleIsl}
                      </div>
                    </div>
                    <span class="text-base text-slate-400 self-center">
                      ${isSelected ? '▶️' : '🎧'}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Права колонка: Деталі, якірні фрази та транскрипт (7 колонок) -->
          <div class="lg:col-span-7 space-y-4">
            
            <!-- Опис ситуації -->
            <div class="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-2">
              <div class="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                📍 Життєва ситуація та контекст
              </div>
              <p class="text-xs text-slate-200 leading-relaxed">
                ${ep.situation}
              </p>
            </div>

            <!-- Якірні фрази -->
            <div class="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-2">
              <div class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                ⚓ Ключові мовні маркери та фрази випуску
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                ${(ep.anchors || []).map(a => `
                  <div class="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                    <span class="text-amber-400">▪</span><span>${a}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Сценарій / Транскрипт -->
            <div class="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-3">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <div class="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                  💬 Транскрипт діалогу (Остап & Поліна & Носії)
                </div>
                <span class="text-[11px] font-mono text-slate-400">${(ep.script || []).length} реплік</span>
              </div>

              <div class="space-y-2.5 max-h-[350px] overflow-y-auto pr-1 text-xs">
                ${(ep.script || []).map(s => {
                  const isOstap = s.speaker === 'Остап';
                  const isPolina = s.speaker === 'Поліна';
                  const borderCol = isOstap ? 'border-cyan-500/40 bg-cyan-950/20' : isPolina ? 'border-purple-500/40 bg-purple-950/20' : 'border-emerald-500/40 bg-emerald-950/20';
                  const badgeCol = isOstap ? 'text-cyan-300' : isPolina ? 'text-purple-300' : 'text-emerald-300';
                  return `
                    <div class="p-2.5 rounded-lg border ${borderCol} space-y-1">
                      <div class="flex items-center justify-between text-[11px] font-mono">
                        <span class="font-bold ${badgeCol}">${s.speaker} (${s.role})</span>
                        <button onclick="window.__STUDIO_PLAYER__.speakText('${s.text.replace(/'/g, "\\'")}')" class="text-slate-400 hover:text-white" title="Озвучити синтезатором">🔊</button>
                      </div>
                      <p class="text-slate-200 leading-relaxed font-sans">${s.text}</p>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

          </div>

        </div>

      </div>
    `;

    // Зберегти посилання на глобальний об'єкт для кнопок
    window.__STUDIO_PLAYER__ = this;
  }

  // Рендер компактного аудіоплеєра всередині уроку
  renderLessonPlayer(epIdentifier) {
    const ep = this.getEpisode(epIdentifier);
    const isMaster = ep.statusLabel && ep.statusLabel.includes('NOTEBOOKLM MASTER');

    this.container.innerHTML = `
      <div class="p-4 sm:p-5 rounded-2xl bg-cyber-card border border-amber-500/40 shadow-xl space-y-4">
        
        <!-- Шапка епізоду уроку -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-800">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-amber-400 text-black font-mono text-[10px] font-black uppercase">
                ${isMaster ? '🌟 NOTEBOOKLM MASTER' : '🎧 ОЗВУЧКА УРОКУ'}
              </span>
              <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
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
              <span>⬇️</span><span>Завантажити для авто</span>
            </a>
          </div>
        </div>

        <!-- Аудіоплеєр -->
        <audio controls class="w-full h-11 rounded-xl outline-none bg-black/80 border border-slate-700" src="${ep.audioFile}"></audio>

        <!-- Опис та маркери -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-black/50 border border-slate-800 space-y-1.5">
            <div class="font-mono font-bold text-cyan-400 text-[11px]">📍 СИТУАЦІЯ ТА КОНТЕКСТ</div>
            <p class="text-slate-300 leading-relaxed">${ep.situation}</p>
          </div>
          <div class="p-3 rounded-xl bg-black/50 border border-slate-800 space-y-1.5">
            <div class="font-mono font-bold text-amber-400 text-[11px]">⚓ КЛЮЧОВІ МОВНІ ОПОРИ</div>
            <div class="space-y-1 font-mono text-[11px] text-slate-300">
              ${(ep.anchors || []).map(a => `<div>▪ ${a}</div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Повний транскрипт Остапа й Поліни -->
        <div class="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-2.5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              💬 Транскрипт випуску (Остап & Поліна)
            </span>
            <span class="text-[10px] font-mono text-slate-400">${(ep.script || []).length} реплік</span>
          </div>
          <div class="space-y-2 max-h-[300px] overflow-y-auto pr-1 text-xs">
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
      btn.className = 'speed-btn px-2 py-1 rounded border border-slate-700 hover:text-white text-slate-400';
    });
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
