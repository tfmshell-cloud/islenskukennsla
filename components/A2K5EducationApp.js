/**
 * A2K5EducationApp.js - Master Interactive Application for Level A2 • Lesson 5
 * (Kafli 5: Menntakerfið, leikskóli og grunnskóli)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 7: Skóli og menntun)
 * - Tölum saman 2022 (Foreldrasamskipti & Leikskólastarf)
 * - Mentor.is & Karellen (Veikindatilkynningar & Foreldraviðtöl)
 * - Reykjavík Menntasvið (Frístundaheimili & Útivera)
 */

import { A2_K5_EDUCATION_DATA } from '../data/a2_k5_education_data.js?v=1.0';
import { A2K5Exam } from './A2K5Exam.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class A2K5EducationApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'grammar'; // 'grammar' | 'schools' | 'mentor' | 'dialogue' | 'exam'
    this.examComponent = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Top Hero Navigation Header -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-teal-950/50 via-cyber-card to-cyber-deep border border-teal-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/40">
                Рівень A2 • Книга 2 • Урок 5
              </span>
              <span class="text-xs text-slate-400 font-mono">ÍFA 2 Kafli 7 • Mentor.is & Menntasvið</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>🎒</span> Menntakerfið, leikskóli og grunnskóli
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Дитячий садок Leikskóli, початкова школа Grunnskóli, шкільний портал (<span class="text-teal-300 font-mono">Mentor.is</span>), концепція прогулянок (<span class="text-amber-300 font-mono">útivera & pollagalli</span>) та дієслова розпорядку.
            </p>
          </div>

          <!-- Quick Stats / Exam Status Badge -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="a2k5-header-exam-btn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-400 text-black font-mono text-xs font-extrabold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer">
              <span>🎓</span>
              <span>Іспит A2.5 (+160 XP)</span>
            </button>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="grammar" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'grammar' ? 'bg-teal-500/20 border-teal-500/60 text-teal-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>📚</span><span>1. Дієслова розпорядку & Прийменники</span>
          </button>
          <button data-tab="schools" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'schools' ? 'bg-teal-500/20 border-teal-500/60 text-teal-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🏫</span><span>2. Leikskóli, Grunnskóli & Útivera</span>
          </button>
          <button data-tab="mentor" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'mentor' ? 'bg-teal-500/20 border-teal-500/60 text-teal-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>💻</span><span>3. Батьківський портал Mentor.is</span>
          </button>
          <button data-tab="dialogue" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'dialogue' ? 'bg-teal-500/20 border-teal-500/60 text-teal-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🎧</span><span>4. Діалог: Розмова у садку</span>
          </button>
          <button data-tab="exam" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'exam' ? 'bg-teal-500/20 border-teal-500/60 text-teal-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🎓</span><span>5. Сертифікаційний іспит A2.5</span>
          </button>
        </div>

        <!-- Dynamic Content Area -->
        <div id="a2k5-content-area" class="min-h-[400px]">
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
      case 'schools':
        return this.renderSchoolsTab();
      case 'mentor':
        return this.renderMentorTab();
      case 'dialogue':
        return this.renderDialogueTab();
      case 'exam':
        return `<div id="a2k5-exam-container"></div>`;
      default:
        return this.renderGrammarTab();
    }
  }

  // 1. GRAMMAR TAB
  renderGrammarTab() {
    return `
      <div class="space-y-6">
        <!-- Rules Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${A2_K5_EDUCATION_DATA.grammarRules.map(rule => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-3 shadow-lg">
              <h4 class="text-sm font-bold font-mono text-teal-300 flex items-center gap-2">
                <span>📖</span><span>${rule.title}</span>
              </h4>
              <p class="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-line">${rule.explanation}</p>
            </div>
          `).join('')}
        </div>

        <!-- Education Vocabulary Grid -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-bold font-mono text-white flex items-center gap-2">
              <span>📋</span><span>Шкільний та освітній глосарій (Рівень A2)</span>
            </h3>
            <span class="text-xs font-mono text-slate-400">${A2_K5_EDUCATION_DATA.vocabulary.length} термінів</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            ${A2_K5_EDUCATION_DATA.vocabulary.map(v => `
              <div class="p-4 rounded-xl bg-cyber-deep/60 border border-cyber-border hover:border-teal-400/40 transition-all space-y-2 group">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-teal-300">${v.word}</span>
                  <button class="a2-speak-btn p-1 text-slate-400 hover:text-white text-xs cursor-pointer" data-phrase="${v.word}">
                    🔊
                  </button>
                </div>
                <div class="text-[11px] font-mono text-slate-400">${v.article} • ${v.ipa}</div>
                <div class="text-xs font-sans text-slate-200">${v.translation}</div>
                <div class="pt-2 border-t border-cyber-border/40 text-[11px] font-mono text-cyan-300/90 leading-tight">
                  "${v.sampleIsl}"
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Drill Component -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-teal-500/30 space-y-4 shadow-xl">
          <div class="space-y-1">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/40">
              Мікро-тренажер шкільного розпорядку
            </span>
            <h3 class="text-base font-bold font-mono text-white">Практика дієслів sækja, fylgja та прийменників með/hjá</h3>
          </div>

          <div class="space-y-4">
            ${A2_K5_EDUCATION_DATA.drills[0].questions.map((q, qIdx) => `
              <div class="p-4 rounded-2xl bg-cyber-deep/80 border border-cyber-border space-y-3">
                <p class="text-xs font-mono font-bold text-slate-200">${qIdx + 1}. ${q.prompt}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  ${q.options.map((opt, optIdx) => `
                    <button class="a2-drill-btn p-3 rounded-xl border border-cyber-border bg-black/40 hover:border-teal-400 text-left text-xs font-mono text-slate-300 transition-all cursor-pointer" data-q="${qIdx}" data-opt="${optIdx}" data-correct="${q.correct}">
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

  // 2. SCHOOLS TAB
  renderSchoolsTab() {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-xl">
              🧸
            </div>
            <div>
              <h3 class="text-base font-bold font-mono text-white">Leikskóli (Дитячий садок)</h3>
              <p class="text-xs font-mono text-slate-400">Перший освітній рівень (1–5 років)</p>
            </div>
          </div>
          <div class="text-xs text-slate-300 font-sans space-y-2 leading-relaxed">
            <p>В Ісландії відвідування садка платне (муніципальна субсидія покриває до 85%). Філософія базується на вільній грі, автономії дитини та перебуванні на свіжому повітрі.</p>
            <ul class="list-disc list-inside space-y-1 text-slate-400 font-mono text-[11px]">
              <li><span class="text-white">Aðlögun</span>: 1–2 тижні поступового звикання за присутності батьків.</li>
              <li><span class="text-white">Útivera</span>: діти гуляють двічі на день навіть у вітер і дощ.</li>
              <li><span class="text-white">Fatnaður</span>: обов'язкові вовняні терморечі (<span class="text-teal-300">ullarnærföt</span>), теплий фліс та гумовий комбез (<span class="text-teal-300">pollagalli</span>).</li>
            </ul>
          </div>
        </div>

        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xl">
              🎒
            </div>
            <div>
              <h3 class="text-base font-bold font-mono text-white">Grunnskóli (1–10 класи)</h3>
              <p class="text-xs font-mono text-slate-400">Обов'язкова освіта від 6 до 16 років</p>
            </div>
          </div>
          <div class="text-xs text-slate-300 font-sans space-y-2 leading-relaxed">
            <p>Обов'язкова та повністю безкоштовна державна школа. Усі підручники та канцтовари надаються школою.</p>
            <ul class="list-disc list-inside space-y-1 text-slate-400 font-mono text-[11px]">
              <li><span class="text-white">Skólamatur</span>: гарячий обід у школі (символічна плата батьків або безкоштовно).</li>
              <li><span class="text-white">Frístundaheimili</span>: після 13:30–14:00 діти молодших класів можуть залишатися в продовженій групі до 17:00.</li>
              <li><span class="text-white">Frístundastyrkur</span>: щорічна муніципальна субсидія (наприклад, 75 000 kr у Рейк'явіку) на оплату спортивних секцій чи музичної школи.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  // 3. MENTOR TAB
  renderMentorTab() {
    return `
      <div class="p-6 rounded-3xl bg-cyber-card border border-teal-500/40 space-y-6 shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyber-border pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-xl">
              📱
            </div>
            <div>
              <h3 class="text-base font-bold font-mono text-white">Портал комунікації Mentor.is & Karellen</h3>
              <p class="text-xs font-mono text-teal-300">Офіційна взаємодія родини та педагогічного колективу</p>
            </div>
          </div>
          <a href="https://www.mentor.is" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500 text-teal-300 hover:text-black border border-teal-500/40 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer w-fit">
            <span>🌐</span><span>Відкрити Mentor.is ↗</span>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
            <span class="text-xs font-mono font-bold text-teal-300">1. Повідомлення про хворобу (Veikindi)</span>
            <p class="text-xs text-slate-300 font-sans leading-relaxed">
              Якщо дитина захворіла, батьки зобов'язані відмітити це в додатку Mentor до 08:00 щоранку. Телефонні дзвінки не потрібні.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
            <span class="text-xs font-mono font-bold text-teal-300">2. Дозволи та екскурсії (Leyfi)</span>
            <p class="text-xs text-slate-300 font-sans leading-relaxed">
              Усі дозволи на виїзні екскурсії (<span class="text-white">vettvangsferðir</span>), публікацію фотографій чи походи в басейн підписуються через додаток.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
            <span class="text-xs font-mono font-bold text-teal-300">3. Зустрічі Foreldraviðtal</span>
            <p class="text-xs text-slate-300 font-sans leading-relaxed">
              Бронювання часу індивідуальної бесіди з класним керівником двічі на рік для обговорення соціалізації та успішності дитини.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // 4. DIALOGUE TAB
  renderDialogueTab() {
    return `
      <div class="p-6 rounded-3xl bg-cyber-card border border-teal-500/40 space-y-6 shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyber-border pb-4">
          <div>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/40">
              Автентичний аудіодіалог
            </span>
            <h3 class="text-lg font-bold font-mono text-white mt-1">
              Розмова з вихователем у садку під час зустрічі дитини (Sækir barn í leikskóla)
            </h3>
          </div>
          <span class="text-xs font-mono text-slate-400">8 студійних реплік • Guðrún & Gunnar Neural</span>
        </div>

        <div class="space-y-3">
          ${A2_K5_EDUCATION_DATA.dialogue.map((line, idx) => `
            <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2 hover:border-teal-400/40 transition-all">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-black/40 border border-cyber-border flex items-center justify-center text-xs font-bold text-teal-300">
                    ${idx + 1}
                  </span>
                  <span class="text-xs font-mono font-bold text-white">${line.speaker}</span>
                  <span class="text-[11px] font-mono text-slate-400">(${line.speakerRole})</span>
                </div>
                <button class="a2-speak-btn px-3 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500 text-teal-300 hover:text-black border border-teal-500/40 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer" data-phrase="${line.textIsl}" data-audio="${line.audio || ''}">
                  <span>🔊</span><span>Слухати</span>
                </button>
              </div>
              <p class="text-sm font-mono text-teal-200 font-semibold pl-8">${line.textIsl}</p>
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

    const headerExamBtn = this.container.querySelector('#a2k5-header-exam-btn');
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
    const examCont = this.container.querySelector('#a2k5-exam-container');
    if (examCont) {
      this.examComponent = new A2K5Exam(
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
          b.classList.remove('border-teal-400', 'bg-teal-500/20');
        });

        feedback.classList.remove('hidden');
        if (optIdx === correct) {
          btn.classList.add('border-emerald-500', 'bg-emerald-500/20', 'text-white', 'font-bold');
          feedback.classList.add('bg-emerald-500/20', 'text-emerald-300', 'border', 'border-emerald-500/40');
          feedback.innerHTML = `✓ Rétt! Правильно! Відмінне засвоєння шкільного синтаксису.`;
          audioEngine.playSuccess?.();
          gameState.addPoints?.(10);
        } else {
          btn.classList.add('border-rose-500', 'bg-rose-500/20', 'text-white');
          feedback.classList.add('bg-rose-500/20', 'text-rose-300', 'border', 'border-rose-500/40');
          feedback.innerHTML = `✗ Rangt! Неправильно. Зверніть увагу на відмінкове керування прийменників та форму минулого часу.`;
          audioEngine.playError?.();
        }
      };
    });
  }
}
