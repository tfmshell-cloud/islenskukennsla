/**
 * A2K3TransportApp.js - Master Interactive Application for Level A2 • Lesson 3
 * (Kafli 3: Samgöngur, Klapp, ferðalög og hreyfisagnir — Book 2)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 8: Á ferðinni & Kafli 4: Hvar, hvert, hvernig?)
 * - Strætó bs. & Klapp greiðslukerfi
 * - Isavia & Keflavíkurflugvöllur (Flugrútan)
 * - SafeTravel.is & Vegagerðin regulations
 * - Árnastofnun BÍN & Litli málfræðingurinn (Hreyfiprófessar)
 */

import { A2_K3_TRANSPORT_DATA } from '../data/a2_k3_transport_data.js?v=1.0';
import { A2K3Exam } from './A2K3Exam.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class A2K3TransportApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'grammar'; // 'grammar' | 'straeto' | 'travel' | 'dialogues' | 'exam'
    this.examComponent = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Top Hero Navigation Header -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-amber-950/50 via-cyber-card to-cyber-deep border border-amber-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Рівень A2 • Книга 2 • Урок 3
              </span>
              <span class="text-xs text-slate-400 font-mono">ÍFA 2 Kafli 8 & 4 • BÍN Standard</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>🚌</span> Samgöngur, Klapp og hreyfisagnir
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Громадський транспорт Рейк'явіка (<span class="text-amber-300 font-mono">Strætó & Klapp</span>), поїздки до аеропорту (<span class="text-cyan-300 font-mono">Flugrútan</span>), безпека доріг (<span class="text-emerald-300 font-mono">SafeTravel</span>) та прийменники руху (<span class="text-rose-300 font-mono">ÞF vs ÞGF</span>).
            </p>
          </div>

          <!-- Quick Stats / Exam Status Badge -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="a2k3-header-exam-btn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-400 text-black font-mono text-xs font-extrabold shadow-lg hover:brightness-110 transition-all flex items-center gap-2">
              <span>🎓</span>
              <span>Іспит A2.3 (+160 XP)</span>
            </button>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="grammar" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'grammar' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>🧭</span><span>1. Hreyfing (Рух vs Стан)</span>
          </button>
          <button data-tab="straeto" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'straeto' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>📱</span><span>2. Strætó & Klapp</span>
          </button>
          <button data-tab="travel" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'travel' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>✈️</span><span>3. Ferðalög & SafeTravel</span>
          </button>
          <button data-tab="dialogues" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'dialogues' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2">
            <span>💬</span><span>4. Samtöl (Діалоги)</span>
          </button>
          <button data-tab="exam" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'exam' ? 'bg-amber-500/30 border-amber-500/70 text-amber-300 font-bold' : 'border-amber-500/30 text-amber-400 hover:text-amber-200'} transition-all flex items-center gap-2 ml-auto">
            <span>🎓</span><span>5. Lokapróf A2.3 (Іспит)</span>
          </button>
        </div>

        <!-- Dynamic Content Area -->
        <div id="a2k3-tab-content" class="min-h-[400px]">
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
      case 'straeto':
        return this.renderStraetoTab();
      case 'travel':
        return this.renderTravelTab();
      case 'dialogues':
        return this.renderDialoguesTab();
      case 'exam':
        return `<div id="a2k3-exam-container"></div>`;
      default:
        return '';
    }
  }

  // 1. GRAMMAR: MOTION VS LOCATION
  renderGrammarTab() {
    const mg = A2_K3_TRANSPORT_DATA.motionGrammar;
    return `
      <div class="space-y-6">
        <!-- Intro Card -->
        <div class="p-6 rounded-2xl bg-cyber-card border border-cyber-border space-y-3">
          <h3 class="text-lg font-bold font-mono text-white flex items-center gap-2">
            <span>🧭</span> ${mg.ruleTitle}
          </h3>
          <p class="text-sm text-slate-300 leading-relaxed font-sans">
            ${mg.description}
          </p>
        </div>

        <!-- Contrast Matrix Table -->
        <div class="p-6 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
          <h4 class="text-sm font-bold font-mono text-amber-300 uppercase tracking-wider">
            Фундаментальна матриця: Рух (Куди? Hvert?) vs Локація (Де? Hvar?)
          </h4>
          <div class="overflow-x-auto">
            <table class="w-full text-left font-mono text-xs">
              <thead>
                <tr class="border-b border-cyber-border text-slate-400">
                  <th class="pb-3">Контекст</th>
                  <th class="pb-3 text-emerald-300">Рух (Hvert? 🟢 ÞF / 🟣 EF)</th>
                  <th class="pb-3 text-amber-300">Локація (Hvar? 🟡 ÞGF)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-cyber-border/40">
                ${mg.contrastTable.map(row => `
                  <tr class="hover:bg-white/[0.02] transition-colors">
                    <td class="py-3 font-bold text-white">${row.context}</td>
                    <td class="py-3">
                      <div class="font-bold text-emerald-300">${row.motionIs}</div>
                      <div class="text-[11px] text-slate-400 font-sans">${row.motionUkr}</div>
                      <span class="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">${row.motionCase}</span>
                    </td>
                    <td class="py-3">
                      <div class="font-bold text-amber-300">${row.staticIs}</div>
                      <div class="text-[11px] text-slate-400 font-sans">${row.staticUkr}</div>
                      <span class="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] bg-amber-950/60 text-amber-400 border border-amber-500/30">${row.staticCase}</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Dative Motion Verbs -->
        <div class="p-6 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
          <h4 class="text-sm font-bold font-mono text-cyan-300 uppercase tracking-wider">
            Спеціальні дієслова руху, що керують давальним відмінком (Þágufall 🟡)
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${mg.dativeVerbs.map(v => `
              <div class="p-4 rounded-xl bg-cyber-deep border border-cyber-border space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-bold font-mono text-white text-sm">${v.verb}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">${v.governs}</span>
                </div>
                <div class="text-xs text-slate-400">${v.ukr}</div>
                <div class="pt-2 border-t border-cyber-border/50 text-xs font-mono text-cyan-300">
                  «${v.sampleIs}»
                </div>
                <div class="text-[11px] text-slate-400 font-sans">${v.sampleUkr}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 2. STRÆTÓ & KLAPP
  renderStraetoTab() {
    const sys = A2_K3_TRANSPORT_DATA.straetoSystem;
    return `
      <div class="space-y-6">
        <!-- System Overview -->
        <div class="p-6 rounded-2xl bg-cyber-card border border-cyber-border space-y-3">
          <h3 class="text-lg font-bold font-mono text-white flex items-center gap-2">
            <span>📱</span> ${sys.title}
          </h3>
          <p class="text-sm text-slate-300 font-sans leading-relaxed">
            ${sys.description}
          </p>
        </div>

        <!-- Fare Categories -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${sys.fareCategories.map(f => `
            <div class="p-5 rounded-2xl bg-cyber-card border border-cyber-border flex flex-col justify-between space-y-3 shadow-lg">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-amber-300 uppercase">${f.nameIsl}</span>
                  <span class="text-sm font-mono font-bold text-white bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">${f.price}</span>
                </div>
                <div class="text-sm font-bold text-white font-mono">${f.nameUkr}</div>
                <div class="text-xs text-slate-300 font-mono">${f.duration}</div>
              </div>
              <div class="pt-3 border-t border-cyber-border/60 text-xs text-slate-400 font-sans">
                💡 ${f.tip}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Passenger Vocabulary -->
        <div class="p-6 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
          <h4 class="text-sm font-bold font-mono text-amber-300 uppercase tracking-wider">
            Академічний словник пасажира (ÍFA 2 Kafli 8)
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            ${sys.vocabulary.map(v => `
              <div class="p-3.5 rounded-xl bg-cyber-deep border border-cyber-border space-y-1">
                <div class="flex items-center justify-between">
                  <span class="font-bold font-mono text-white text-sm">${v.isl}</span>
                  <span class="text-[10px] font-mono text-slate-400">${v.gen}</span>
                </div>
                <div class="text-[11px] font-mono text-amber-400">${v.ipa}</div>
                <div class="text-xs text-slate-300 font-sans">${v.ukr}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 3. TRAVEL & SAFETRAVEL
  renderTravelTab() {
    const travel = A2_K3_TRANSPORT_DATA.longDistanceTravel;
    const safety = A2_K3_TRANSPORT_DATA.roadSafety;

    return `
      <div class="space-y-6">
        <!-- Long Distance Travel Options -->
        <div class="p-6 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
          <h3 class="text-lg font-bold font-mono text-white flex items-center gap-2">
            <span>✈️</span> Міжміське сполучення та аеропорти (Keflavík & Innanlands)
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${travel.map(t => `
              <div class="p-4 rounded-xl bg-cyber-deep border border-cyber-border space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-bold font-mono text-white text-sm">${t.nameIsl}</span>
                  <span class="text-xs font-mono font-bold text-amber-300">${t.price}</span>
                </div>
                <div class="text-xs font-mono text-cyan-300">${t.route}</div>
                <div class="text-xs text-slate-300 font-sans">${t.ukr}</div>
                <div class="text-[11px] font-mono text-slate-400 pt-1 border-t border-cyber-border/40">
                  ⏱️ ${t.travelTime} • 🔄 ${t.frequency}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SafeTravel & Road Safety -->
        <div class="p-6 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold font-mono text-white flex items-center gap-2">
              <span>🚗</span> Безпека водіння та перевірка доріг (${safety.source})
            </h3>
            <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              SafeTravel.is Standard
            </span>
          </div>

          <!-- Rules List -->
          <ul class="text-xs font-sans text-slate-300 space-y-2 bg-cyber-deep p-4 rounded-xl border border-cyber-border">
            ${safety.rules.map(r => `
              <li class="flex items-start gap-2">
                <span class="text-amber-400 font-bold shrink-0">⚠️</span>
                <span>${r}</span>
              </li>
            `).join('')}
          </ul>

          <!-- Road Condition Statuses -->
          <h4 class="text-xs font-mono text-slate-400 uppercase pt-2">Кольорові індикатори порталу Vegagerðin (Umferðin):</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 font-mono text-xs">
            ${safety.terms.map(t => {
              let bg = 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40';
              if (t.status === 'warn') bg = 'bg-amber-950/60 text-amber-300 border-amber-500/40';
              if (t.status === 'danger') bg = 'bg-rose-950/60 text-rose-300 border-rose-500/40';
              if (t.status === 'closed') bg = 'bg-red-950 text-red-300 border-red-500 font-extrabold';
              return `
                <div class="p-3 rounded-xl border ${bg} space-y-1">
                  <div class="font-bold">${t.isl}</div>
                  <div class="text-[11px] font-sans text-slate-300">${t.ukr}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 4. DIALOGUES
  renderDialoguesTab() {
    const d = A2_K3_TRANSPORT_DATA.dialogues;
    return `
      <div class="space-y-6">
        ${d.map(dialogue => `
          <div class="p-6 rounded-2xl bg-cyber-card border border-cyber-border space-y-4">
            <div class="flex items-center justify-between border-b border-cyber-border pb-3">
              <div>
                <h3 class="text-base font-bold font-mono text-white">${dialogue.title}</h3>
                <span class="text-xs font-mono text-slate-400">📍 ${dialogue.location}</span>
              </div>
              <span class="px-2.5 py-0.5 rounded text-[11px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ÍFA 2 Praktík
              </span>
            </div>

            <!-- Dialogue Lines -->
            <div class="space-y-3">
              ${dialogue.lines.map((l, idx) => `
                <div class="p-3.5 rounded-xl ${idx % 2 === 0 ? 'bg-cyber-deep/80 border border-cyber-border' : 'bg-cyber-deep/30 border border-cyber-border/40'} space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-mono font-bold text-amber-300">${l.speaker}:</span>
                    <button class="a2k3-dlg-audio-btn px-2.5 py-1 rounded-lg bg-cyber-deep hover:bg-amber-500/20 border border-cyber-border text-slate-300 hover:text-amber-300 font-mono text-xs flex items-center gap-1 cursor-pointer transition-all" data-audio="${l.audio || ''}" data-phrase="${l.isl}">
                      <span>🔊</span><span>Слухати</span>
                    </button>
                  </div>
                  <div class="text-sm font-mono text-white font-medium">${l.isl}</div>
                  <div class="text-xs font-sans text-slate-400">${l.ukr}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  bindEvents() {
    this.container.querySelectorAll('.a2-tab-btn').forEach(btn => {
      btn.onclick = () => {
        const tab = btn.dataset.tab;
        if (tab) {
          this.activeTab = tab;
          audioEngine.playSfx('click');
          this.render();

          if (tab === 'exam') {
            this.mountExam();
          }
        }
      };
    });

    const headerExamBtn = this.container.querySelector('#a2k3-header-exam-btn');
    if (headerExamBtn) {
      headerExamBtn.onclick = () => {
        this.activeTab = 'exam';
        audioEngine.playSfx('click');
        this.render();
        this.mountExam();
      };
    }

    this.container.querySelectorAll('.a2k3-dlg-audio-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const audioPath = btn.dataset.audio;
        const phrase = btn.dataset.phrase;
        if (audioPath) {
          audioEngine.play(audioPath, btn);
        } else if (phrase) {
          audioEngine.speak(phrase, 'is-IS');
        }
      };
    });

    if (this.activeTab === 'exam') {
      this.mountExam();
    }
  }

  mountExam() {
    const examCont = this.container.querySelector('#a2k3-exam-container');
    if (examCont) {
      this.examComponent = new A2K3Exam(
        examCont,
        (score) => {
          console.log(`Exam A2.3 completed with score: ${score}%`);
        },
        () => {
          this.activeTab = 'grammar';
          this.render();
        }
      );
      this.examComponent.render();
    }
  }
}
