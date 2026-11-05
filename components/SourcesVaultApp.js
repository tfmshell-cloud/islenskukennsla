/**
 * SourcesVaultApp.js - Master Interactive Component for Official Institutional Sources & Audio Coverage Matrix
 * 
 * Directly implements:
 * - data/icelandic_sources.txt (Official 8 sections of academic & government portals)
 * - data/official_sources_data.js
 * - Audio & Pronunciation System Registry (773 audio files audit + synthesis queue)
 */

import { OFFICIAL_SOURCES_DATA } from '../data/official_sources_data.js?v=2.0';
import { audioEngine } from './AudioEngine.js?v=7.3';

export class SourcesVaultApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'toolblock'; // 'toolblock' | 'audio_matrix' | 'raw_sources'
    this.selectedCategory = 'all';
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Top Hero Navigation Header -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/50 via-cyber-card to-cyber-deep border border-cyan-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Державні першоджерела & Аудіоматриця
              </span>
              <span class="text-xs text-slate-400 font-mono">Стандарт Ísland.is, MMS & Árnastofnun</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>🏛️</span> Офіційні портали та візуальний блок інструментів
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-3xl leading-relaxed">
              Централізований навігатор державними сервісами Ісландії, академічними базами відмінювання BÍN, навчальними стандартами ÍFA та структурована матриця контролю озвучення навчальних матеріалів (773 студійні файли).
            </p>
          </div>

          <!-- Quick Actions -->
          <div class="flex items-center gap-2 shrink-0">
            <a href="data/icelandic_sources.txt" target="_blank" class="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/40 font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
              <span>📄</span><span>Відкрити icelandic_sources.txt</span>
            </a>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="toolblock" class="sv-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'toolblock' ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🏛️</span><span>1. Візуальний блок держпорталів (${OFFICIAL_SOURCES_DATA.categories.reduce((acc, c) => acc + c.sources.length, 0)})</span>
          </button>
          <button data-tab="audio_matrix" class="sv-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'audio_matrix' ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🎙️</span><span>2. Матриця озвучення & Аудіо-реєстр (${OFFICIAL_SOURCES_DATA.audioRegistry.totalFilesOnDisk} файлів)</span>
          </button>
          <button data-tab="raw_sources" class="sv-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'raw_sources' ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>📜</span><span>3. Текстовий канонічний реєстр (.txt)</span>
          </button>
        </div>

        <!-- Dynamic View Container -->
        <div id="sv-content-area" class="min-h-[400px]">
          ${this.renderActiveTabContent()}
        </div>

      </div>
    `;

    this.bindEvents();
  }

  renderActiveTabContent() {
    switch (this.activeTab) {
      case 'toolblock':
        return this.renderToolblockTab();
      case 'audio_matrix':
        return this.renderAudioMatrixTab();
      case 'raw_sources':
        return this.renderRawSourcesTab();
      default:
        return '';
    }
  }

  // 1. VISUAL TOOLBLOCK TAB
  renderToolblockTab() {
    const categories = OFFICIAL_SOURCES_DATA.categories;
    const filteredCategories = this.selectedCategory === 'all' 
      ? categories 
      : categories.filter(c => c.id === this.selectedCategory);

    return `
      <div class="space-y-6">
        
        <!-- Category Filter Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-2 font-mono text-xs">
          <button data-category="all" class="sv-cat-btn px-3 py-1.5 rounded-lg border transition-all ${this.selectedCategory === 'all' ? 'bg-cyan-500 text-black font-extrabold shadow-md' : 'bg-cyber-deep border-cyber-border text-slate-400 hover:text-white'}">
            Всі категорії (${categories.reduce((acc, c) => acc + c.sources.length, 0)})
          </button>
          ${categories.map(c => `
            <button data-category="${c.id}" class="sv-cat-btn px-3 py-1.5 rounded-lg border transition-all ${this.selectedCategory === c.id ? 'bg-cyan-500 text-black font-extrabold shadow-md' : 'bg-cyber-deep border-cyber-border text-slate-400 hover:text-white'}">
              ${c.icon} ${c.nameUkr.split('.')[1] || c.nameUkr}
            </button>
          `).join('')}
        </div>

        <!-- Categorized Grid of Institutional Sources -->
        <div class="space-y-8">
          ${filteredCategories.map(cat => `
            <div class="space-y-4">
              <div class="flex items-center gap-2 border-b border-cyber-border pb-2">
                <span class="text-xl">${cat.icon}</span>
                <h3 class="text-base font-bold font-mono text-white">${cat.nameUkr}</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${cat.sources.map(src => `
                  <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border hover:border-cyan-500/50 transition-all flex flex-col justify-between shadow-lg group">
                    <div class="space-y-2.5">
                      <div class="flex items-start justify-between gap-2">
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          ${src.cefrLevel}
                        </span>
                        <span class="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyber-deep border border-cyber-border text-emerald-400 font-bold">
                          ${src.statusTag}
                        </span>
                      </div>

                      <div>
                        <h4 class="text-sm font-bold font-mono text-white group-hover:text-cyan-300 transition-colors leading-snug">
                          ${src.nameIsl}
                        </h4>
                        <p class="text-xs font-sans text-slate-300 mt-1">${src.nameUkr}</p>
                      </div>

                      <div class="text-[11px] font-mono text-slate-400">
                        Організація: <span class="text-slate-300">${src.authority}</span>
                      </div>

                      <p class="text-xs text-slate-400 font-sans leading-relaxed pt-1 border-t border-cyber-border/40">
                        ${src.practicalUse}
                      </p>

                      <!-- Key Terms -->
                      <div class="pt-1 flex flex-wrap gap-1">
                        ${src.keyTerms.map(t => `
                          <span class="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyber-deep border border-cyber-border/60 text-cyan-300">
                            ${t}
                          </span>
                        `).join('')}
                      </div>
                    </div>

                    <!-- Open Source Link Button -->
                    <div class="mt-4 pt-3 border-t border-cyber-border">
                      <a href="${src.url}" target="_blank" rel="noopener noreferrer" class="w-full py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/30 font-mono text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5">
                        <span>Відкрити першоджерело</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- SPECIAL SECTION: PLANNED INTERACTIVE EMULATOR WIDGETS -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-cyber-card to-cyber-deep border border-purple-500/40 space-y-4 shadow-xl">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                [ВІЗУАЛЬНИЙ БЛОК: ПЛАНУЄТЬСЯ ЕМУЛЯТОР]
              </span>
              <h3 class="text-lg font-bold font-mono text-white flex items-center gap-2">
                <span>🛠️</span> Заплановані інтерактивні емулятори державних систем
              </h3>
            </div>
            <span class="text-xs font-mono text-purple-300 hidden sm:inline">Архітектурний роадмап</span>
          </div>

          <p class="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Для максимального наближення до життя в Ісландії ми проєктуємо 4 інтерактивні тренажери-емулятори інтерфейсів державних установ, де студенти будуть тренуватися заповнювати форми ісландською мовою:
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div class="p-4 rounded-xl bg-cyber-deep border border-cyber-border space-y-2">
              <div class="text-2xl">📜</div>
              <h4 class="text-xs font-bold font-mono text-white">1. Емулятор HMS Húsaleigubætur</h4>
              <p class="text-[11px] text-slate-400 font-sans">
                Тренажер подання заяви на субсидію оренди житла через особистий кабінет HMS із перевіркою kennitala leigusala.
              </p>
            </div>
            <div class="p-4 rounded-xl bg-cyber-deep border border-cyber-border space-y-2">
              <div class="text-2xl">💰</div>
              <h4 class="text-xs font-bold font-mono text-white">2. Аудитор Launaseðill</h4>
              <p class="text-[11px] text-slate-400 font-sans">
                Інтерактивний сканер розрахункового листа: брутто-зарплата, відрахування в Efling, пенсійний фонд Lífeyrissjóður та Persónuafsláttur.
              </p>
            </div>
            <div class="p-4 rounded-xl bg-cyber-deep border border-cyber-border space-y-2">
              <div class="text-2xl">🩺</div>
              <h4 class="text-xs font-bold font-mono text-white">3. Емулятор Heilsuvera</h4>
              <p class="text-[11px] text-slate-400 font-sans">
                Тренажер онлайн-запису на прийом (Tímapöntun) та формулювання симптомів скарги на здоров'я у чаті з медсестрою.
              </p>
            </div>
            <div class="p-4 rounded-xl bg-cyber-deep border border-cyber-border space-y-2">
              <div class="text-2xl">📱</div>
              <h4 class="text-xs font-bold font-mono text-white">4. Емулятор Klapp-appið</h4>
              <p class="text-[11px] text-slate-400 font-sans">
                Віртуальний симулятор додатка Klapp: покупка квитка Stakt fargjald, зворотний відлік 75 хв та сканування валідатора.
              </p>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // 2. AUDIO COVERAGE MATRIX TAB
  renderAudioMatrixTab() {
    const reg = OFFICIAL_SOURCES_DATA.audioRegistry;

    return `
      <div class="space-y-6">
        
        <!-- Summary Stats Banner -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Аудіо-репозиторій платформи
              </span>
              <h3 class="text-xl font-bold font-mono text-white mt-1">
                Систематизований реєстр звукових доріжок (${reg.totalFilesOnDisk} файлів)
              </h3>
            </div>
            <div class="p-3 rounded-xl bg-cyber-deep border border-cyber-border font-mono text-xs text-right">
              <div class="text-slate-400">Студійні файли на диску:</div>
              <div class="text-emerald-400 text-lg font-bold">${reg.totalFilesOnDisk} файлів • ~42 МБ</div>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Платформа використовує дворівневу гібридну архітектуру вимови: для якірного фонду та подкастів підключено студійні доріжки native-speaker, а для динамічних форм впроваджено інтегрований рушій Web Speech API (is-IS) із моментальним фонетичним зворотним зв'язком.
          </p>
        </div>

        <!-- Category Breakdown Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          ${reg.categories.map(cat => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border flex flex-col justify-between space-y-3 shadow-lg">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-cyan-300 uppercase">${cat.format}</span>
                  <span class="text-xs font-mono font-bold ${cat.coveragePercent === 100 ? 'text-emerald-400' : 'text-amber-400'}">
                    ${cat.coveragePercent}% покрито
                  </span>
                </div>
                <h4 class="text-sm font-bold text-white font-mono">${cat.nameUkr}</h4>
                <div class="text-2xl font-bold font-mono text-white">${cat.count} <span class="text-xs text-slate-400 font-normal">файлів</span></div>
                <p class="text-xs text-slate-400 font-sans">${cat.description}</p>
              </div>

              <div class="pt-3 border-t border-cyber-border/60 text-[11px] font-mono text-slate-300">
                🎤 ${cat.voiceType}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- QUEUE FOR NEURAL SYNTHESIS -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-amber-500/40 space-y-4 shadow-xl">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ПЛАНОВИЙ ПУЛ НЕЙРООЗВУЧЕННЯ
              </span>
              <h3 class="text-base font-bold font-mono text-white">
                Черга пріоритетного студійного озвучення (A2 Діалоги & Hlustunarpróf)
              </h3>
            </div>
            <span class="text-xs font-mono text-slate-400">${reg.pendingVoiceoverQueue.length} активні позиції</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left font-mono text-xs">
              <thead>
                <tr class="border-b border-cyber-border text-slate-400">
                  <th class="pb-3">Модуль</th>
                  <th class="pb-3">Цільовий контент</th>
                  <th class="pb-3">Обсяг</th>
                  <th class="pb-3">Пріоритет</th>
                  <th class="pb-3">Поточний стан</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-cyber-border/40">
                ${reg.pendingVoiceoverQueue.map(item => `
                  <tr class="hover:bg-white/[0.02] transition-colors">
                    <td class="py-3 font-bold text-white">${item.module}</td>
                    <td class="py-3 text-cyan-300">${item.target}</td>
                    <td class="py-3 text-slate-300">${item.linesCount} фраз</td>
                    <td class="py-3">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${item.priority === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}">
                        ${item.priority}
                      </span>
                    </td>
                    <td class="py-3 text-slate-400 text-[11px] font-sans">${item.currentFallback}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        ${reg.completedVoiceovers ? `
        <!-- COMPLETED NEURAL SYNTHESIS LOG -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-emerald-500/40 space-y-4 shadow-xl">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                ВИКОНАНИЙ СТУДІЙНИЙ СИНТЕЗ
              </span>
              <h3 class="text-base font-bold font-mono text-white">
                Завершені пакети студійного нейроозвучення (100% готовність)
              </h3>
            </div>
            <span class="text-xs font-mono text-emerald-400 font-bold">${reg.completedVoiceovers.length} завершених пакетів</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left font-mono text-xs">
              <thead>
                <tr class="border-b border-cyber-border text-slate-400">
                  <th class="pb-3">Модуль</th>
                  <th class="pb-3">Контент</th>
                  <th class="pb-3">Кількість треків</th>
                  <th class="pb-3">Статус на диску</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-cyber-border/40">
                ${reg.completedVoiceovers.map(item => `
                  <tr class="hover:bg-white/[0.02] transition-colors">
                    <td class="py-3 font-bold text-white">${item.module}</td>
                    <td class="py-3 text-cyan-300">${item.target}</td>
                    <td class="py-3 text-emerald-300 font-bold">${item.linesCount} треків</td>
                    <td class="py-3">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        ✅ ${item.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        ` : ''}

      </div>
    `;
  }

  // 3. RAW SOURCES TEXT TAB
  renderRawSourcesTab() {
    return `
      <div class="space-y-4">
        <div class="p-4 rounded-2xl bg-cyber-card border border-cyber-border flex items-center justify-between">
          <span class="text-xs font-mono text-slate-300">Канонічний файл: data/icelandic_sources.txt (v2.0-ACADEMIC)</span>
          <a href="data/icelandic_sources.txt" download class="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-bold hover:bg-cyan-500 hover:text-black transition-all">
            Завантажити TXT
          </a>
        </div>

        <div class="p-6 rounded-2xl bg-black/80 border border-cyber-border font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre leading-relaxed select-text shadow-inner">
Loading canonical file...
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Sub-tab switching
    this.container.querySelectorAll('.sv-tab-btn').forEach(btn => {
      btn.onclick = () => {
        const tab = btn.dataset.tab;
        if (tab) {
          this.activeTab = tab;
          audioEngine.playSfx('click');
          this.render();

          if (tab === 'raw_sources') {
            this.loadRawTxt();
          }
        }
      };
    });

    // Category filter pills
    this.container.querySelectorAll('.sv-cat-btn').forEach(btn => {
      btn.onclick = () => {
        const cat = btn.dataset.category;
        if (cat) {
          this.selectedCategory = cat;
          audioEngine.playSfx('click');
          this.render();
        }
      };
    });
  }

  async loadRawTxt() {
    const rawContainer = this.container.querySelector('.select-text');
    if (!rawContainer) return;

    try {
      const resp = await fetch('data/icelandic_sources.txt?v=' + Date.now());
      if (resp.ok) {
        const txt = await resp.text();
        rawContainer.textContent = txt;
      } else {
        rawContainer.textContent = 'Не вдалося завантажити файл data/icelandic_sources.txt';
      }
    } catch (e) {
      rawContainer.textContent = 'Помилка мережі при завантаженні: ' + e.message;
    }
  }
}
