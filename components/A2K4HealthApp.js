/**
 * A2K4HealthApp.js - Master Interactive Application for Level A2 • Lesson 4
 * (Kafli 4: Heilbrigðiskerfið, heilsugæslan og Heilsuvera)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 6 & 10: Heilsa og velferð)
 * - Heilsuvera.is & Lyfjagátt (Mínar síður & Rafræn skilríki)
 * - Læknavaktin 1700 (Símaráðgjöf hjúkrunarfræðinga)
 * - Landspítalinn Fossvogi (Bráðamóttaka)
 */

import { A2_K4_HEALTH_DATA } from '../data/a2_k4_health_data.js?v=1.0';
import { A2K4Exam } from './A2K4Exam.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class A2K4HealthApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'grammar'; // 'grammar' | 'institutions' | 'heilsuvera' | 'dialogue' | 'exam'
    this.examComponent = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Top Hero Navigation Header -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-rose-950/50 via-cyber-card to-cyber-deep border border-rose-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
                Рівень A2 • Книга 2 • Урок 4
              </span>
              <span class="text-xs text-slate-400 font-mono">ÍFA 2 Kafli 6 & 10 • Heilsuvera & 1700</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>🏥</span> Heilbrigðiskerfið, heilsugæslan og Heilsuvera
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Поліклініка Heilsugæslan, чергова лінія 1700 (<span class="text-rose-300 font-mono">Læknavaktin</span>), цифровий кабінет пацієнта (<span class="text-cyan-300 font-mono">Heilsuvera</span>) та модальний синтаксис приписів лікаря.
            </p>
          </div>

          <!-- Quick Stats / Exam Status Badge -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="a2k4-header-exam-btn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-400 text-black font-mono text-xs font-extrabold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer">
              <span>🎓</span>
              <span>Іспит A2.4 (+160 XP)</span>
            </button>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="grammar" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'grammar' ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>💊</span><span>1. Модальні дієслова & Симптоми</span>
          </button>
          <button data-tab="institutions" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'institutions' ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🏛️</span><span>2. Heilsugæslan & Læknavaktin 1700</span>
          </button>
          <button data-tab="heilsuvera" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'heilsuvera' ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>📱</span><span>3. Heilsuvera & Рецепти Lyfjagátt</span>
          </button>
          <button data-tab="dialogue" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'dialogue' ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🎧</span><span>4. Діалог: Дзвінок на 1700</span>
          </button>
          <button data-tab="exam" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'exam' ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🎓</span><span>5. Сертифікаційний іспит A2.4</span>
          </button>
        </div>

        <!-- Dynamic Content Area -->
        <div id="a2k4-content-area" class="min-h-[400px]">
          ${this.renderActiveTabContent()}
        </div>

      </div>
    `;

    this.bindEvents();
  }

  renderActiveTabContent() {
    switch (this.activeTab) {
      case 'grammar':
        return this.renderGrammarTab();
      case 'institutions':
        return this.renderInstitutionsTab();
      case 'heilsuvera':
        return this.renderHeilsuveraTab();
      case 'dialogue':
        return this.renderDialogueTab();
      case 'exam':
        return `<div id="a2k4-exam-container"></div>`;
      default:
        return this.renderGrammarTab();
    }
  }

  // 1. GRAMMAR & SYMPTOMS TAB
  renderGrammarTab() {
    return `
      <div class="space-y-6">
        <!-- Rules Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${A2_K4_HEALTH_DATA.grammarRules.map(rule => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-3 shadow-lg">
              <h4 class="text-sm font-bold font-mono text-rose-300 flex items-center gap-2">
                <span>🩺</span><span>${rule.title}</span>
              </h4>
              <p class="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-line">${rule.explanation}</p>
            </div>
          `).join('')}
        </div>

        <!-- Clinical Vocabulary Grid -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-bold font-mono text-white flex items-center gap-2">
              <span>📋</span><span>Ключовий медичний глосарій (Рівень A2)</span>
            </h3>
            <span class="text-xs font-mono text-slate-400">${A2_K4_HEALTH_DATA.vocabulary.length} термінів</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            ${A2_K4_HEALTH_DATA.vocabulary.map(v => `
              <div class="p-4 rounded-xl bg-cyber-deep/60 border border-cyber-border hover:border-rose-400/40 transition-all space-y-2 group">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-rose-300">${v.word}</span>
                  <button class="a2-speak-btn p-1 text-slate-400 hover:text-white text-xs cursor-pointer" data-phrase="${v.word}">
                    🔊
                  </button>
                </div>
                <div class="text-[11px] font-mono text-slate-400">${v.article} • ${v.ipa}</div>
                <div class="text-xs font-sans text-slate-200">${v.translation}</div>
                <div class="pt-2 border-t border-cyber-border/40 text-[11px] font-mono text-emerald-300/90 leading-tight">
                  "${v.sampleIsl}"
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Drill Component -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-rose-500/30 space-y-4 shadow-xl">
          <div class="space-y-1">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
              Мікро-тренажер симптомів
            </span>
            <h3 class="text-base font-bold font-mono text-white">Практика безособових медичних зворотів</h3>
          </div>

          <div class="space-y-4">
            ${A2_K4_HEALTH_DATA.drills[0].questions.map((q, qIdx) => `
              <div class="p-4 rounded-2xl bg-cyber-deep/80 border border-cyber-border space-y-3">
                <p class="text-xs font-mono font-bold text-slate-200">${qIdx + 1}. ${q.prompt}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  ${q.options.map((opt, optIdx) => `
                    <button class="a2-drill-btn p-3 rounded-xl border border-cyber-border bg-black/40 hover:border-rose-400 text-left text-xs font-mono text-slate-300 transition-all cursor-pointer" data-q="${qIdx}" data-opt="${optIdx}" data-correct="${q.correct}">
                      ${opt}
                    </button>
                  `).join('')}
                </div>
                <div class="drill-feedback-a2 hidden text-[11px] font-mono p-2 rounded-lg"></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 2. INSTITUTIONS TAB
  renderInstitutionsTab() {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-xl">
              🏥
            </div>
            <div>
              <h3 class="text-base font-bold font-mono text-white">Heilsugæslan (Поліклініка)</h3>
              <p class="text-xs font-mono text-slate-400">Первинна ланка медицини за місцем проживання</p>
            </div>
          </div>
          <div class="text-xs text-slate-300 font-sans space-y-2 leading-relaxed">
            <p>Кожен мешканець Ісландії прикріплюється до районної поліклініки (<span class="text-rose-300 font-mono">Heilsugæslustöð</span>). Тут приймають сімейні лікарі (<span class="text-rose-300 font-mono">heimilislæknar</span>) та ведуть облік дітей і вагітних.</p>
            <ul class="list-disc list-inside space-y-1 text-slate-400 font-mono text-[11px]">
              <li>Запис на прийом (<span class="text-white">tímapöntun</span>): через Heilsuvera або телефоном з 08:00 до 16:00.</li>
              <li>Планові консультації та направлення до вузьких спеціалістів (<span class="text-white">tilvísun</span>).</li>
              <li>Профілактичні щеплення та дитячі огляди (<span class="text-white">ungbarnavernd</span>).</li>
            </ul>
          </div>
        </div>

        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
              📞
            </div>
            <div>
              <h3 class="text-base font-bold font-mono text-white">Læknavaktin & Sími 1700</h3>
              <p class="text-xs font-mono text-slate-400">Служба чергових лікарів та нічний тріаж</p>
            </div>
          </div>
          <div class="text-xs text-slate-300 font-sans space-y-2 leading-relaxed">
            <p>Коли районна поліклініка зачинена (після 16:00, вночі та у вихідні), діє чергова служба <span class="text-amber-300 font-mono">Læknavaktin</span> (Háaleitisbraut 68 / Austurver).</p>
            <ul class="list-disc list-inside space-y-1 text-slate-400 font-mono text-[11px]">
              <li>Цілодобовий телефон <span class="text-white">1700</span>: медична консультація медсестер.</li>
              <li>Якщо загрози життю немає, але потрібен огляд — направляють на Læknavaktin.</li>
              <li>У разі критичного стану (інфаркт, важка травма) медсестра негайно викликає швидку через <span class="text-rose-400 font-bold">112</span>.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  // 3. HEILSUVERA TAB
  renderHeilsuveraTab() {
    return `
      <div class="p-6 rounded-3xl bg-cyber-card border border-cyan-500/40 space-y-6 shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyber-border pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xl">
              💻
            </div>
            <div>
              <h3 class="text-base font-bold font-mono text-white">Портал Heilsuvera.is & Електронні рецепти Lyfjagátt</h3>
              <p class="text-xs font-mono text-cyan-300">Державний стандарт електронної медицини Ісландії</p>
            </div>
          </div>
          <a href="https://www.heilsuvera.is" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/40 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer w-fit">
            <span>🌐</span><span>Відкрити Heilsuvera.is ↗</span>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
            <span class="text-xs font-mono font-bold text-cyan-300">1. Авторизація Rafræn skilríki</span>
            <p class="text-xs text-slate-300 font-sans leading-relaxed">
              Вхід на портал вимагає підтвердження на телефоні через мобільний ID або додаток Auðkenni. Паперові талони не існують.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
            <span class="text-xs font-mono font-bold text-cyan-300">2. Чат із поліклінікою (Netspjall)</span>
            <p class="text-xs text-slate-300 font-sans leading-relaxed">
              Можливість спілкуватися в чаті з медсестрою, надсилати фотографії висипу чи симптомів та ставити нетермінові запитання.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
            <span class="text-xs font-mono font-bold text-cyan-300">3. Оновлення рецептів (Endurnýjun)</span>
            <p class="text-xs text-slate-300 font-sans leading-relaxed">
              Кнопка запиту на подовження ліків. Рецепт надходить безпосередньо в базу Lyfjagátt і відпускається в будь-якій аптеці (Lyfja, Apótekarinn).
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // 4. DIALOGUE TAB
  renderDialogueTab() {
    return `
      <div class="p-6 rounded-3xl bg-cyber-card border border-rose-500/40 space-y-6 shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyber-border pb-4">
          <div>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
              Автентичний аудіодіалог
            </span>
            <h3 class="text-lg font-bold font-mono text-white mt-1">
              Дзвінок до чергової медсестри на номер 1700 (Símtal í 1700)
            </h3>
          </div>
          <span class="text-xs font-mono text-slate-400">8 студійних реплік • Gunnar & Guðrún Neural</span>
        </div>

        <div class="space-y-3">
          ${A2_K4_HEALTH_DATA.dialogue.map((line, idx) => `
            <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2 hover:border-rose-400/40 transition-all">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-black/40 border border-cyber-border flex items-center justify-center text-xs font-bold text-rose-300">
                    ${idx + 1}
                  </span>
                  <span class="text-xs font-mono font-bold text-white">${line.speaker}</span>
                  <span class="text-[11px] font-mono text-slate-400">(${line.speakerRole})</span>
                </div>
                <button class="a2-speak-btn px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-black border border-rose-500/40 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer" data-phrase="${line.textIsl}" data-audio="${line.audio || ''}">
                  <span>🔊</span><span>Слухати</span>
                </button>
              </div>
              <p class="text-sm font-mono text-rose-200 font-semibold pl-8">${line.textIsl}</p>
              <p class="text-xs font-sans text-slate-300 pl-8">${line.textUkr}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.container.querySelectorAll('.a2-tab-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeTab = btn.dataset.tab;
        audioEngine.playBlip?.();
        this.render();
        if (this.activeTab === 'exam') {
          this.mountExam();
        }
      };
    });

    const headerExamBtn = this.container.querySelector('#a2k4-header-exam-btn');
    if (headerExamBtn) {
      headerExamBtn.onclick = () => {
        this.activeTab = 'exam';
        audioEngine.playBlip?.();
        this.render();
        this.mountExam();
      };
    }

    this.bindSpeechButtons();
    this.bindDrillButtons();
  }

  mountExam() {
    const examCont = this.container.querySelector('#a2k4-exam-container');
    if (examCont) {
      this.examComponent = new A2K4Exam(
        examCont,
        null,
        () => {
          this.activeTab = 'grammar';
          this.render();
        }
      );
      this.examComponent.render();
    }
  }

  bindSpeechButtons() {
    this.container.querySelectorAll('.a2-speak-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const phrase = btn.dataset.phrase;
        const audioPath = btn.dataset.audio;
        if (audioPath && audioEngine) {
          audioEngine.play(audioPath, btn);
          return;
        }
        if (phrase && audioEngine) {
          audioEngine.speak(phrase, btn);
        }
      };
    });
  }

  bindDrillButtons() {
    this.container.querySelectorAll('.a2-drill-btn').forEach(btn => {
      btn.onclick = () => {
        const qIdx = btn.dataset.q;
        const optIdx = parseInt(btn.dataset.opt, 10);
        const correct = parseInt(btn.dataset.correct, 10);
        const parent = btn.closest('.space-y-3');
        const feedback = parent.querySelector('.drill-feedback-a2');

        parent.querySelectorAll('.a2-drill-btn').forEach(b => {
          b.disabled = true;
          b.classList.remove('border-rose-400', 'bg-rose-500/20');
        });

        feedback.classList.remove('hidden');
        if (optIdx === correct) {
          btn.classList.add('border-emerald-500', 'bg-emerald-500/20', 'text-white', 'font-bold');
          feedback.classList.add('bg-emerald-500/20', 'text-emerald-300', 'border', 'border-emerald-500/40');
          feedback.innerHTML = `✓ Rétt! Правильно! Відмінне засвоєння медичної норми.`;
          audioEngine.playSuccess?.();
          gameState.addPoints?.(10);
        } else {
          btn.classList.add('border-rose-500', 'bg-rose-500/20', 'text-white');
          feedback.classList.add('bg-rose-500/20', 'text-rose-300', 'border', 'border-rose-500/40');
          feedback.innerHTML = `✗ Rangt! Неправильно. Зверніть увагу на керування відмінком та приписи лікаря.`;
          audioEngine.playError?.();
        }
      };
    });
  }
}
