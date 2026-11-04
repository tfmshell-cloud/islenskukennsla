/**
 * Module0StudyGuide.js - Official Study Guide (Конспект), Mind Map & Audio Overview for Module 0
 * 
 * Based on Árnastofnun, BÍN, Icelandic Online, Bara tala, Ylhýra and NotebookLM Studio.
 * 
 * Features:
 * - 3 Master View Modes:
 *    1. 📖 Текстовий конспект (5 академічних розділів)
 *    2. 🧠 Ментальна карта (Mind Map NotebookLM)
 *    3. 🎙️ Аудіоогляд (NotebookLM Deep Dive Podcast 17:22)
 * - Streamable 64kbps AAC Audio Overview with Scrubber, Speed Controls & Clickable Chapters
 * - Interactive Mind Map with audio playback (Gunnar Neural)
 * - High-resolution original NotebookLM diagram preview with full-screen zoom
 * - Live search filter & chapter pills
 * - Copy to clipboard & clean print support
 * - Direct shortcut to Final Certification Exam (Sub-tab 8)
 * - Dual-theme support (Dark & Nordic Light)
 */

import { M0_STUDY_GUIDE_DATA } from '../data/m0_study_guide_data.js?v=6.7';
import { audioEngine } from './AudioEngine.js?v=6.7';

export class Module0StudyGuide {
  constructor(container, onJumpToExam = null) {
    this.container = container;
    this.onJumpToExam = onJumpToExam;
    this.data = M0_STUDY_GUIDE_DATA;
    this.viewMode = 'text'; // 'text', 'mindmap', or 'podcast'
    this.mindMapSubMode = 'tree'; // 'tree' or 'original'
    this.activeSection = 'all'; // 'all' or section id
    this.searchQuery = '';
    this.collapsedBranches = {}; // { branchId: boolean }
    this.audioPlaybackRate = 1.0;
  }

  render() {
    const isPodcast = this.viewMode === 'podcast';
    const isMindMap = this.viewMode === 'mindmap';

    this.container.innerHTML = `
      <div class="space-y-4 max-w-4xl mx-auto select-none-text">
        
        <!-- Header Banner -->
        <div class="arena-theme-card p-4 sm:p-6 rounded-2xl space-y-4 shadow-xl border border-cyan-500/30">
          <div class="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-700/50">
            <div class="flex items-center gap-3">
              <span class="text-3xl sm:text-4xl">${isPodcast ? '🎙️' : isMindMap ? '🧠' : '📖'}</span>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h2 class="text-base sm:text-lg font-black arena-word-heading font-mono">
                    ${this.data.title}: ${this.data.icelandicTitle}
                  </h2>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    NotebookLM Studio
                  </span>
                </div>
                <p class="text-xs text-slate-400 mt-0.5">${this.data.subtitle} • За матеріалами NotebookLM & Árnastofnun</p>
              </div>
            </div>

            <!-- Action Buttons: Print & Copy -->
            <div class="flex items-center gap-2">
              <button id="guide-copy-btn" class="px-3 py-1.5 rounded-xl bg-black/60 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-400 text-xs font-mono font-bold transition-all flex items-center gap-1.5">
                <span>📋</span><span class="hidden sm:inline">Копіювати конспект</span>
              </button>
              <button id="guide-print-btn" class="px-3 py-1.5 rounded-xl bg-black/60 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-400 text-xs font-mono font-bold transition-all flex items-center gap-1.5">
                <span>🖨️</span><span class="hidden sm:inline">Друк / PDF</span>
              </button>
            </div>
          </div>

          <!-- Master View Switcher (3 Tabs: Text / Mind Map / Podcast) -->
          <div class="flex items-center justify-center p-1 rounded-xl bg-black/60 border border-slate-800 max-w-xl mx-auto">
            <button id="guide-view-text-btn" class="flex-1 py-1.5 px-2.5 rounded-lg font-mono text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${this.viewMode === 'text' ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400 shadow-sm' : 'text-slate-400 hover:text-white border border-transparent'}">
              <span>📖</span><span>Конспект</span>
            </button>
            <button id="guide-view-mindmap-btn" class="flex-1 py-1.5 px-2.5 rounded-lg font-mono text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${this.viewMode === 'mindmap' ? 'bg-purple-500/25 text-purple-300 border border-purple-400 shadow-sm' : 'text-slate-400 hover:text-white border border-transparent'}">
              <span>🧠</span><span>Карта</span>
            </button>
            <button id="guide-view-podcast-btn" class="flex-1 py-1.5 px-2.5 rounded-lg font-mono text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${this.viewMode === 'podcast' ? 'bg-amber-500/25 text-amber-300 border border-amber-400 shadow-sm' : 'text-slate-400 hover:text-white border border-transparent'}">
              <span>🎙️</span><span>Аудіоогляд (17 хв)</span>
            </button>
          </div>

          ${this.viewMode === 'text' ? this.renderTextControls() : this.viewMode === 'mindmap' ? this.renderMindMapControls() : ''}
        </div>

        <!-- Main Workspace (Text Guide vs Mind Map vs Podcast) -->
        <div id="guide-main-content">
          ${this.viewMode === 'text' ? this.renderTextView() : this.viewMode === 'mindmap' ? this.renderMindMapView() : this.renderPodcastView()}
        </div>

        <!-- Final Call to Action Card: Jump to Certification Exam -->
        <div class="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-black/60 to-cyan-500/15 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1 text-center sm:text-left">
            <div class="flex items-center justify-center sm:justify-start gap-2 text-amber-300 font-mono font-black text-sm">
              <span>🎓</span><span>ГОТОВІ ПІДТВЕРДИТИ СВОЇ ЗНАННЯ?</span>
            </div>
            <p class="text-xs text-slate-300 max-w-lg">
              Перевірте засвоєння всіх матеріалів у офіційному контрольному тесті Модуля 0: 15 запитань, аудіо носія мови та отримання іменного сертифіката A1.0!
            </p>
          </div>
          <button id="guide-go-exam-btn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold font-mono text-xs sm:text-sm shadow-lg transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer">
            <span>Розпочати Атестацію (15 Q)</span>
            <span>➔</span>
          </button>
        </div>

      </div>
    `;

    this.bindEvents();
    if (this.viewMode === 'text') {
      this.populateWordsTable();
    }
  }

  renderTextControls() {
    return `
      <!-- Section Navigation Pills & Search Bar -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-mono text-xs">
          <button data-guide-sec="all" class="guide-nav-pill px-2.5 py-1 rounded-lg border font-bold transition-all ${this.activeSection === 'all' ? 'bg-cyan-500 text-black border-cyan-400 shadow-md' : 'bg-black/40 text-slate-300 border-slate-700 hover:border-slate-500'}">
            Усі 5 розділів
          </button>
          ${this.data.sections.map(s => `
            <button data-guide-sec="${s.id}" class="guide-nav-pill px-2.5 py-1 rounded-lg border font-bold whitespace-nowrap transition-all ${this.activeSection === s.id ? 'bg-cyan-500 text-black border-cyan-400 shadow-md' : 'bg-black/40 text-slate-300 border-slate-700 hover:border-slate-500'}">
              ${s.icon} ${s.number}. ${s.title.split('.')[1] || s.title}
            </button>
          `).join('')}
        </div>

        <!-- Search Filter -->
        <div class="relative w-full sm:w-56 flex-shrink-0">
          <input 
            id="guide-search-input" 
            type="text" 
            placeholder="Пошук правила або слова..." 
            value="${this.searchQuery}"
            class="w-full px-3 py-1.5 pl-8 rounded-xl bg-black/50 border border-slate-700 focus:border-cyan-400 text-slate-100 placeholder-slate-500 font-sans text-xs outline-none transition-all"
          />
          <span class="absolute left-2.5 top-2 text-slate-500 text-xs">🔍</span>
        </div>
      </div>
    `;
  }

  renderMindMapControls() {
    return `
      <div class="flex items-center justify-between flex-wrap gap-2 pt-1 font-mono text-xs">
        <div class="flex items-center gap-1.5">
          <button id="mm-sub-tree-btn" class="px-3 py-1 rounded-lg border font-bold transition-all ${this.mindMapSubMode === 'tree' ? 'bg-purple-500/20 text-purple-300 border-purple-400 shadow-sm' : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white'}">
            🌳 Інтерактивне дерево знань
          </button>
          <button id="mm-sub-orig-btn" class="px-3 py-1 rounded-lg border font-bold transition-all ${this.mindMapSubMode === 'original' ? 'bg-purple-500/20 text-purple-300 border-purple-400 shadow-sm' : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white'}">
            🖼️ Оригінал NotebookLM
          </button>
        </div>

        <div class="flex items-center gap-2 text-[11px] text-slate-400">
          <span>Підказка: клікайте на іконку 🔊 для вимови носієм Gunnar</span>
        </div>
      </div>
    `;
  }

  renderTextView() {
    return `
      <div id="guide-sections-list" class="space-y-4">
        ${this.renderSectionsList()}
      </div>
    `;
  }

  renderSectionsList() {
    const q = this.searchQuery.toLowerCase().trim();
    const visibleSections = this.data.sections.filter(sec => {
      if (this.activeSection !== 'all' && sec.id !== this.activeSection) return false;
      if (!q) return true;
      const matchTitle = sec.title.toLowerCase().includes(q);
      const matchSummary = sec.summary.toLowerCase().includes(q);
      const matchContent = sec.contentHtml.toLowerCase().includes(q);
      const matchWords = this.data.anchorWords.some(w => 
        w.word.toLowerCase().includes(q) || 
        w.uk.toLowerCase().includes(q) || 
        w.sentenceV2.toLowerCase().includes(q)
      );
      return matchTitle || matchSummary || matchContent || (sec.id === 'sec5_words_matrix' && matchWords);
    });

    if (visibleSections.length === 0) {
      return `
        <div class="p-8 text-center text-slate-400 space-y-2 bg-black/40 rounded-2xl border border-slate-800">
          <div class="text-2xl">🔍</div>
          <div class="text-sm font-bold text-slate-300">Нічого не знайдено за запитом «${this.searchQuery}»</div>
          <p class="text-xs text-slate-500">Спробуйте інше слово або скиньте рядок пошуку.</p>
        </div>
      `;
    }

    return visibleSections.map(sec => `
      <div id="${sec.id}" class="arena-theme-card p-4 sm:p-6 rounded-2xl space-y-3 shadow-lg border border-slate-800 transition-all">
        <div class="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 class="text-sm sm:text-base font-black text-cyan-300 flex items-center gap-2 font-mono">
            <span class="text-lg">${sec.icon}</span>
            <span>Розділ ${sec.number}. ${sec.title}</span>
          </h3>
          <span class="text-[10px] font-mono text-slate-500">Модуль 0</span>
        </div>
        <p class="text-xs text-slate-400 italic">${sec.summary}</p>
        <div class="pt-2">
          ${sec.contentHtml}
        </div>
      </div>
    `).join('');
  }

  renderMindMapView() {
    const mm = this.data.mindMap;
    if (!mm) return `<div class="p-4 text-center text-slate-400">Ментальна карта відсутня</div>`;

    if (this.mindMapSubMode === 'original') {
      return `
        <div class="arena-theme-card p-4 sm:p-6 rounded-2xl space-y-4 shadow-xl border border-purple-500/30">
          <div class="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-800">
            <div>
              <h3 class="text-sm sm:text-base font-bold text-purple-300 font-mono">
                🖼️ Оригінальна ментальна карта Google NotebookLM
              </h3>
              <p class="text-xs text-slate-400">Повна векторна схема зв'язків Модуля 0</p>
            </div>
            <a href="${mm.imageUri}" target="_blank" class="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold transition-all flex items-center gap-1.5">
              <span>🔍</span><span>Відкрити повний розмір</span>
            </a>
          </div>

          <!-- Image Preview with Pan/Zoom container -->
          <div class="relative rounded-xl overflow-hidden bg-black/60 border border-slate-800 p-2 text-center group">
            <img 
              src="${mm.imageUri}" 
              alt="NotebookLM Mind Map" 
              class="max-h-[75vh] w-auto mx-auto object-contain rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        </div>
      `;
    }

    // Interactive Tree View
    return `
      <div class="space-y-4">
        
        <!-- Central Hub Node -->
        <div class="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-cyan-950/30 to-purple-950/40 border border-purple-500/40 text-center space-y-1 shadow-lg">
          <div class="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">Центральне ядро ментальної карти</div>
          <h3 class="text-base sm:text-lg font-black text-white font-mono">
            ${mm.title}
          </h3>
          <p class="text-xs text-slate-400">4 фундаментальні гілки • Фонетика, орфоепія, соціолінгвістика та синтаксис</p>
        </div>

        <!-- 4 Branches Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${mm.branches.map(branch => {
            const isCollapsed = this.collapsedBranches[branch.id];
            const borderCls = branch.color === 'emerald' ? 'border-emerald-500/40 hover:border-emerald-400/70' :
              branch.color === 'rose' ? 'border-rose-500/40 hover:border-rose-400/70' :
              branch.color === 'amber' ? 'border-amber-500/40 hover:border-amber-400/70' :
              'border-cyan-500/40 hover:border-cyan-400/70';

            const badgeCls = branch.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
              branch.color === 'rose' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
              branch.color === 'amber' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
              'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';

            return `
              <div class="arena-theme-card p-4 sm:p-5 rounded-2xl border ${borderCls} shadow-lg space-y-3 transition-all">
                
                <!-- Branch Header -->
                <div class="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <div class="flex items-center gap-2">
                    <span class="text-base sm:text-lg">${branch.icon}</span>
                    <div>
                      <h4 class="font-bold text-xs sm:text-sm text-slate-100 font-mono leading-tight">
                        ${branch.name}
                      </h4>
                      <span class="px-1.5 py-0.2 rounded text-[9px] font-mono border ${badgeCls}">
                        ${branch.badge}
                      </span>
                    </div>
                  </div>

                  <button class="mm-toggle-branch-btn w-6 h-6 rounded-lg bg-black/40 hover:bg-black text-slate-400 hover:text-white flex items-center justify-center text-xs font-mono transition-all" data-branch-id="${branch.id}" title="${isCollapsed ? 'Розгорнути' : 'Скласти'}">
                    ${isCollapsed ? '➕' : '➖'}
                  </button>
                </div>

                <!-- Sub-branches -->
                <div class="space-y-3 ${isCollapsed ? 'hidden' : ''}">
                  ${branch.subBranches.map(sub => `
                    <div class="p-3 rounded-xl bg-black/40 border border-slate-800/80 space-y-2">
                      <div class="text-xs font-bold text-slate-200 font-mono flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full ${branch.color === 'emerald' ? 'bg-emerald-400' : branch.color === 'rose' ? 'bg-rose-400' : branch.color === 'amber' ? 'bg-amber-400' : 'bg-cyan-400'}"></span>
                        <span>${sub.name}</span>
                      </div>
                      
                      <ul class="space-y-1.5 pl-2 text-xs">
                        ${sub.items.map(item => `
                          <li class="flex items-start justify-between gap-2 text-slate-300 leading-snug">
                            <span class="flex-1">• ${item.text}</span>
                            ${item.audio ? `
                              <button class="mm-audio-btn flex-shrink-0 w-6 h-6 rounded bg-black/60 hover:bg-cyan-500/20 text-cyan-400 border border-slate-700 hover:border-cyan-400 flex items-center justify-center text-[10px] transition-all cursor-pointer" data-audio-key="${item.audio}" title="Слухати вимову Gunnar">
                                🔊
                              </button>
                            ` : ''}
                          </li>
                        `).join('')}
                      </ul>
                    </div>
                  `).join('')}
                </div>

              </div>
            `;
          }).join('')}
        </div>

      </div>
    `;
  }

  renderPodcastView() {
    const p = this.data.podcast;
    if (!p) return `<div class="p-6 text-center text-slate-400">Аудіоогляд наразі відсутній</div>`;

    return `
      <div class="space-y-4">
        
        <!-- Luxury Podcast Player Card -->
        <div class="arena-theme-card p-4 sm:p-6 rounded-2xl shadow-2xl border border-amber-500/40 space-y-5 bg-gradient-to-b from-amber-950/20 to-cyber-deep">
          
          <!-- Top Row: Cover & Track Info -->
          <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 pb-4 border-b border-slate-800">
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl shadow-xl flex-shrink-0 border border-amber-300/30">
              🎙️
            </div>

            <div class="space-y-1.5 text-center sm:text-left flex-1">
              <div class="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  NotebookLM Deep Dive
                </span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-400 border border-slate-800">
                  Тривалість: ${p.durationText}
                </span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                  ${p.fileSizeText}
                </span>
              </div>
              <h3 class="text-base sm:text-lg font-black text-white font-mono">
                «${p.title}»
              </h3>
              <p class="text-xs text-slate-300 leading-relaxed max-w-xl">
                ${p.description}
              </p>
            </div>
          </div>

          <!-- HTML5 Hidden Audio Element -->
          <audio id="podcast-audio-elem" src="${p.audioUri}" preload="metadata"></audio>

          <!-- Custom Player Controls Scrubber -->
          <div class="space-y-2 p-3 sm:p-4 rounded-xl bg-black/60 border border-slate-800">
            <!-- Scrubber Track Slider -->
            <div class="flex items-center gap-3">
              <span id="podcast-current-time" class="font-mono text-xs text-amber-300 w-12 text-right font-bold">00:00</span>
              <input 
                id="podcast-scrubber" 
                type="range" 
                min="0" 
                max="${p.durationSec}" 
                value="0" 
                step="1"
                class="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span id="podcast-total-time" class="font-mono text-xs text-slate-400 w-12">${p.durationText}</span>
            </div>

            <!-- Controls Row: Play/Pause, Rewind, Fast Forward, Speed, Download -->
            <div class="flex items-center justify-between flex-wrap gap-3 pt-2">
              
              <!-- Quick Skip Buttons & Main Play -->
              <div class="flex items-center gap-2 sm:gap-3 mx-auto sm:mx-0">
                <button id="podcast-skip-back-btn" class="w-9 h-9 rounded-xl bg-black/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center font-mono text-xs font-bold transition-all cursor-pointer" title="Назад на 15 секунд">
                  -15с
                </button>

                <button id="podcast-play-pause-btn" class="w-12 h-12 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-lg flex items-center justify-center shadow-lg transform hover:scale-105 active:scale-95 transition-all cursor-pointer" title="Відтворити / Пауза">
                  <span id="podcast-play-icon">▶</span>
                </button>

                <button id="podcast-skip-fwd-btn" class="w-9 h-9 rounded-xl bg-black/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center font-mono text-xs font-bold transition-all cursor-pointer" title="Вперед на 30 секунд">
                  +30с
                </button>
              </div>

              <!-- Speed Controls & Download Link -->
              <div class="flex items-center gap-2 mx-auto sm:mx-0 font-mono text-xs">
                <span class="text-slate-500 text-[10px]">Швидкість:</span>
                ${[0.8, 1.0, 1.25, 1.5].map(rate => `
                  <button class="podcast-speed-btn px-2 py-1 rounded-lg border text-[11px] font-bold transition-all ${this.audioPlaybackRate === rate ? 'bg-amber-500/20 text-amber-300 border-amber-400' : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white'}" data-rate="${rate}">
                    ${rate}x
                  </button>
                `).join('')}

                <a href="${p.audioUri}" download class="ml-2 px-2.5 py-1 rounded-lg bg-black/50 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-800 hover:border-slate-700 transition-all text-[11px]" title="Завантажити аудіофайл на пристрій">
                  💾 Завантажити
                </a>
              </div>

            </div>
          </div>

          <!-- Clickable Interactive Chapters List -->
          <div class="space-y-2 pt-2">
            <div class="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span class="font-bold text-amber-300">📑 Навігація по розділах подкасту (клікніть для перемотки):</span>
              <span>6 ключових тем</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${p.chapters.map((ch, idx) => `
                <button class="podcast-chapter-btn p-3 rounded-xl bg-black/40 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/40 text-left transition-all flex items-start gap-2.5 group cursor-pointer" data-time-sec="${ch.timeSec}">
                  <span class="px-2 py-0.5 rounded bg-black/60 border border-slate-700 group-hover:border-amber-400 text-amber-400 font-mono text-[11px] font-bold flex-shrink-0">
                    ${ch.timeText}
                  </span>
                  <div class="flex-1 min-w-0">
                    <div class="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors leading-snug">
                      ${ch.title}
                    </div>
                  </div>
                  <span class="text-slate-500 group-hover:text-amber-400 text-xs">▶</span>
                </button>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    `;
  }

  populateWordsTable() {
    const tbody = this.container.querySelector('#study-guide-words-tbody');
    if (!tbody) return;

    const q = this.searchQuery.toLowerCase().trim();
    const filtered = this.data.anchorWords.filter(w => {
      if (!q) return true;
      return w.word.toLowerCase().includes(q) || 
             w.uk.toLowerCase().includes(q) || 
             w.sentenceV2.toLowerCase().includes(q) ||
             w.genderName.toLowerCase().includes(q);
    });

    tbody.innerHTML = filtered.map(w => {
      const genderBadge = w.gender === 'm.' 
        ? '<span class="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-[10px] font-bold">ч.р.</span>'
        : w.gender === 'f.'
          ? '<span class="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono text-[10px] font-bold">ж.р.</span>'
          : '<span class="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-[10px] font-bold">с.р.</span>';

      return `
        <tr class="hover:bg-cyan-500/5 transition-colors">
          <td class="p-2.5 font-mono text-slate-500">${w.num}</td>
          <td class="p-2.5 font-mono font-bold text-white text-sm">${w.word}</td>
          <td class="p-2.5">${genderBadge}</td>
          <td class="p-2.5 font-mono text-cyan-300 text-xs">${w.ipa}</td>
          <td class="p-2.5 text-slate-200 font-medium">${w.uk}</td>
          <td class="p-2.5 text-xs text-slate-300 font-mono leading-tight">
            <span class="text-white">${w.sentenceV2}</span>
            <div class="text-[11px] text-slate-400 font-sans">${w.sentenceTrans}</div>
          </td>
          <td class="p-2.5 text-center">
            <button class="guide-word-audio-btn w-7 h-7 rounded-lg bg-black/60 hover:bg-cyan-500/20 text-cyan-400 border border-slate-700 hover:border-cyan-400 flex items-center justify-center transition-all mx-auto cursor-pointer" data-audio-key="${w.audioKey}" title="Слухати вимову ${w.word}">
              🔊
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Audio click handlers
    tbody.querySelectorAll('.guide-word-audio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-audio-key');
        if (key) {
          audioEngine.playWord(key);
        }
      });
    });
  }

  bindEvents() {
    // Mode Switcher: Text vs Mind Map vs Podcast
    const textBtn = this.container.querySelector('#guide-view-text-btn');
    if (textBtn) {
      textBtn.addEventListener('click', () => {
        this.stopPodcastAudio();
        this.viewMode = 'text';
        this.render();
      });
    }

    const mindmapBtn = this.container.querySelector('#guide-view-mindmap-btn');
    if (mindmapBtn) {
      mindmapBtn.addEventListener('click', () => {
        this.stopPodcastAudio();
        this.viewMode = 'mindmap';
        this.render();
      });
    }

    const podcastBtn = this.container.querySelector('#guide-view-podcast-btn');
    if (podcastBtn) {
      podcastBtn.addEventListener('click', () => {
        this.viewMode = 'podcast';
        this.render();
      });
    }

    // Mind Map Sub-mode: Tree vs Original Image
    const subTreeBtn = this.container.querySelector('#mm-sub-tree-btn');
    if (subTreeBtn) {
      subTreeBtn.addEventListener('click', () => {
        this.mindMapSubMode = 'tree';
        this.render();
      });
    }

    const subOrigBtn = this.container.querySelector('#mm-sub-orig-btn');
    if (subOrigBtn) {
      subOrigBtn.addEventListener('click', () => {
        this.mindMapSubMode = 'original';
        this.render();
      });
    }

    // Mind Map Audio click buttons
    this.container.querySelectorAll('.mm-audio-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = btn.getAttribute('data-audio-key');
        if (key) {
          audioEngine.playWord(key);
        }
      });
    });

    // Mind Map Collapse/Expand branch buttons
    this.container.querySelectorAll('.mm-toggle-branch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const branchId = btn.getAttribute('data-branch-id');
        this.collapsedBranches[branchId] = !this.collapsedBranches[branchId];
        this.render();
      });
    });

    // Navigation Pills (Text Mode)
    this.container.querySelectorAll('.guide-nav-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const secId = btn.getAttribute('data-guide-sec');
        this.activeSection = secId;
        this.render();
      });
    });

    // Search Input (Text Mode)
    const searchInput = this.container.querySelector('#guide-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const listContainer = this.container.querySelector('#guide-sections-list');
        if (listContainer) {
          listContainer.innerHTML = this.renderSectionsList();
          this.populateWordsTable();
        }
      });
    }

    // Copy to Clipboard
    const copyBtn = this.container.querySelector('#guide-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const fullText = this.generateCleanText();
        navigator.clipboard.writeText(fullText).then(() => {
          const original = copyBtn.innerHTML;
          copyBtn.innerHTML = `<span>✅</span><span>Скопійовано!</span>`;
          setTimeout(() => { copyBtn.innerHTML = original; }, 2200);
        }).catch(err => {
          console.warn('Clipboard write error:', err);
        });
      });
    }

    // Print / PDF Button
    const printBtn = this.container.querySelector('#guide-print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // CTA Button: Jump to Exam
    const examBtn = this.container.querySelector('#guide-go-exam-btn');
    if (examBtn && typeof this.onJumpToExam === 'function') {
      examBtn.addEventListener('click', () => {
        this.stopPodcastAudio();
        this.onJumpToExam();
      });
    }

    // Podcast Player Events (if in podcast mode)
    if (this.viewMode === 'podcast') {
      this.bindPodcastEvents();
    }
  }

  bindPodcastEvents() {
    const audio = this.container.querySelector('#podcast-audio-elem');
    const playBtn = this.container.querySelector('#podcast-play-pause-btn');
    const playIcon = this.container.querySelector('#podcast-play-icon');
    const scrubber = this.container.querySelector('#podcast-scrubber');
    const timeDisplay = this.container.querySelector('#podcast-current-time');
    const totalTimeDisplay = this.container.querySelector('#podcast-total-time');
    const skipBack = this.container.querySelector('#podcast-skip-back-btn');
    const skipFwd = this.container.querySelector('#podcast-skip-fwd-btn');

    if (!audio) return;

    audio.playbackRate = this.audioPlaybackRate;

    const formatTime = (secs) => {
      const s = Math.floor(secs || 0);
      const m = Math.floor(s / 60);
      const rem = s % 60;
      return `${m < 10 ? '0' : ''}${m}:${rem < 10 ? '0' : ''}${rem}`;
    };

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (audio.paused) {
          audio.play().catch(e => console.warn('Podcast play error:', e));
          if (playIcon) playIcon.innerText = '⏸';
        } else {
          audio.pause();
          if (playIcon) playIcon.innerText = '▶';
        }
      });
    }

    audio.addEventListener('play', () => {
      if (playIcon) playIcon.innerText = '⏸';
    });
    audio.addEventListener('pause', () => {
      if (playIcon) playIcon.innerText = '▶';
    });

    audio.addEventListener('timeupdate', () => {
      if (scrubber) scrubber.value = Math.floor(audio.currentTime);
      if (timeDisplay) timeDisplay.innerText = formatTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
      if (scrubber) scrubber.max = Math.floor(audio.duration || 1042);
      if (totalTimeDisplay) totalTimeDisplay.innerText = formatTime(audio.duration || 1042);
    });

    if (scrubber) {
      scrubber.addEventListener('input', (e) => {
        audio.currentTime = parseFloat(e.target.value);
        if (timeDisplay) timeDisplay.innerText = formatTime(audio.currentTime);
      });
    }

    if (skipBack) {
      skipBack.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 15);
      });
    }

    if (skipFwd) {
      skipFwd.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.duration || 1042, audio.currentTime + 30);
      });
    }

    // Speed buttons
    this.container.querySelectorAll('.podcast-speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const rate = parseFloat(btn.dataset.rate);
        this.audioPlaybackRate = rate;
        audio.playbackRate = rate;
        this.container.querySelectorAll('.podcast-speed-btn').forEach(b => {
          b.className = `podcast-speed-btn px-2 py-1 rounded-lg border text-[11px] font-bold transition-all ${parseFloat(b.dataset.rate) === rate ? 'bg-amber-500/20 text-amber-300 border-amber-400' : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white'}`;
        });
      });
    });

    // Clickable Chapter items
    this.container.querySelectorAll('.podcast-chapter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetSec = parseFloat(btn.dataset.timeSec);
        audio.currentTime = targetSec;
        audio.play().catch(e => console.warn('Play error:', e));
        if (playIcon) playIcon.innerText = '⏸';
      });
    });
  }

  stopPodcastAudio() {
    const audio = this.container.querySelector('#podcast-audio-elem');
    if (audio && !audio.paused) {
      audio.pause();
    }
  }

  generateCleanText() {
    return `НАВЧАЛЬНИЙ ПОСІБНИК: ${this.data.title} (${this.data.icelandicTitle})\n` +
      `${this.data.subtitle}\n` +
      `Джерела: ${this.data.sourcesNote}\n\n` +
      `Розділ 1. Загальний огляд ісландської графіки\n` +
      `- 32 літери: A, Á, B, D, Ð, E, É, F, G, H, I, Í, J, K, L, M, N, O, Ó, P, R, S, T, U, Ú, V, X, Y, Ý, Þ, Æ, Ö\n` +
      `- Відсутність c, q, w, z у питомих словах. Реформа 1973: z замінено на s.\n` +
      `- Наголос ЗАВЖДИ на 1-му складі. Акут (´) змінює якість фонеми (монофтонг ➔ дифтонг).\n\n` +
      `Розділ 2. Закон близнюків: вимова I / Y та Í / Ý\n` +
      `- Пара 1: I [ɪ] === Y [ɪ] (коротке ненапружене [ɪ], наприклад: is, yfir)\n` +
      `- Пара 2: Í [iː] === Ý [iː] (довге напружене [iː] у посмішці, наприклад: ís, ýta)\n` +
      `- Історичний i-hljóðvarp та етимологічне збереження коренів.\n\n` +
      `Розділ 3. Топ-5 фонетичних пасток ісландської мови\n` +
      `1. Преаспірація [h] перед pp, tt, kk (takk [tʰahk], stopp [stɔhp]).\n` +
      `2. Боковий вибух ll [tl] (fjall, Sæll) та асиміляція nn [tn] після дифтонгів (steinn).\n` +
      `3. Þorn [θ] (тільки на початку слів: þak) vs Eð [ð] (тільки всередині/кінці: maður).\n` +
      `4. Чотири стани літери G: [k] (gata), [c] (gefa), [ɣ] (saga), [x] (ég).\n` +
      `5. Кластери hv [kv] (hvað) та fn [pn] (nafn).\n\n` +
      `Розділ 4. Соціолінгвістичний етикет вітань\n` +
      `- Звертання до 1 чол.: Sæll! [saitl]\n` +
      `- Звертання до 1 жін.: Sæl! [sail]\n` +
      `- Множина: Sælir! (чол.), Sælar! (жін.), Sæl! (змішана)\n` +
      `- Егалітарна культура: відсутність «Ви», звертання на þú та на перше ім'я до всіх.\n\n` +
      `Розділ 5. Зведена матриця 15 опорних слів Модуля 0\n` +
      `- Правило V2: дієслово завжди на 2-му місці.\n` +
      this.data.anchorWords.map(w => `${w.num}. ${w.word} (${w.gender}) ${w.ipa} - ${w.uk} | V2: «${w.sentenceV2}»`).join('\n');
  }
}
