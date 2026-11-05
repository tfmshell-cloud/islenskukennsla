/**
 * B1K1WorkplaceApp.js - Master Interactive Application for Level B1 • Lesson 1
 * (Íslenska fyrir alla 3 • Kafli 1: Atvinnulíf, samfélagsumræða og viðtengingarháttur)
 */

import { B1_K1_SOCIETY_DATA } from '../data/b1_k1_society_data.js?v=1.0';
import { B1K1Exam } from './B1K1Exam.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class B1K1WorkplaceApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'grammar'; // 'grammar' | 'economics' | 'dialogue' | 'exam'
    this.examComponent = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto pb-12 select-none">
        
        <!-- Top Hero Navigation Header -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-amber-950/60 via-cyber-card to-cyber-deep border border-amber-500/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/50">
                Рівень B1 • Книга 3 • Розділ 1
              </span>
              <span class="text-xs text-slate-400 font-mono">ÍFA 3 Kafli 1 • ASÍ, Seðlabankinn & RÚV</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>📊</span> Atvinnulíf, efnahagsumræða og viðtengingarháttur
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Професійна комунікація, макроекономіка Ісландії (<span class="text-amber-300 font-mono">verðbólga</span>, <span class="text-cyan-300 font-mono">stýrivextir</span>, <span class="text-emerald-300 font-mono">kaupmáttur</span>) та граматика умовного способу (<span class="text-purple-300 font-mono">viðtengingarháttur</span>).
            </p>
          </div>

          <!-- Quick Stats / Exam Status Badge -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="b1k1-header-exam-btn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-black font-mono text-xs font-extrabold shadow-xl hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer">
              <span>🎓</span>
              <span>Іспит B1.1 (+200 XP)</span>
            </button>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="grammar" class="b1-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'grammar' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>📐</span><span>1. Viðtengingarháttur (Кон'юнктив)</span>
          </button>
          <button data-tab="economics" class="b1-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'economics' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>📰</span><span>2. Макроекономіка & Новини RÚV</span>
          </button>
          <button data-tab="dialogue" class="b1-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'dialogue' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🎧</span><span>3. Діалог: Економічні дебати</span>
          </button>
          <button data-tab="exam" class="b1-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'exam' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🎓</span><span>4. Сертифікаційний іспит B1.1</span>
          </button>
        </div>

        <!-- Dynamic Content Area -->
        <div id="b1k1-content-area" class="min-h-[400px]">
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
      case 'economics':
        return this.renderEconomicsTab();
      case 'dialogue':
        return this.renderDialogueTab();
      case 'exam':
        return '<div id="b1k1-exam-mount-point"></div>';
      default:
        return this.renderGrammarTab();
    }
  }

  renderGrammarTab() {
    return `
      <div class="space-y-6">
        <!-- Rule 1: Subjunctive Present -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4">
          <div class="flex items-center gap-3 text-amber-400">
            <span class="text-2xl">📐</span>
            <h3 class="text-lg font-bold font-mono text-white">Viðtengingarháttur nútíðar (Теперішній час умовного способу)</h3>
          </div>
          <p class="text-sm font-sans text-slate-300 leading-relaxed">
            ${B1_K1_SOCIETY_DATA.grammarRules[0].contentUkr}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
              <span class="text-xs font-mono text-cyan-300 font-bold uppercase">Слабкі дієслова (на -a -> -i):</span>
              <ul class="text-xs font-mono text-slate-300 space-y-1">
                <li>• að tala -> <strong class="text-white">ég tali</strong>, þú talir, hann tali</li>
                <li>• við tölum, þið talið, þeir tali</li>
                <li>• Приклад: <em>Ég vona að hann tali við stjórann.</em></li>
              </ul>
            </div>
            <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
              <span class="text-xs font-mono text-purple-300 font-bold uppercase">Сильні дієслова (закінчення -i):</span>
              <ul class="text-xs font-mono text-slate-300 space-y-1">
                <li>• að fara -> <strong class="text-white">ég fari</strong>, þú farir, hann fari</li>
                <li>• að vera -> <strong class="text-white">ég sé</strong>, þú sért, hann sé</li>
                <li>• Приклад: <em>Við viljum að allt sé í lagi.</em></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Rule 2: Subjunctive Past & Conditionals -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4">
          <div class="flex items-center gap-3 text-amber-400">
            <span class="text-2xl">⏳</span>
            <h3 class="text-lg font-bold font-mono text-white">Viðtengingarháttur þátíðar (Минулий час та нереальні умови)</h3>
          </div>
          <p class="text-sm font-sans text-slate-300 leading-relaxed">
            ${B1_K1_SOCIETY_DATA.grammarRules[1].contentUkr}
          </p>

          <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <h4 class="text-xs font-mono font-bold text-amber-300 uppercase">Формула нереальної умови («Якби... то б...»):</h4>
            <div class="p-3 rounded-xl bg-black/60 font-mono text-xs text-white space-y-1">
              <div><strong class="text-amber-400">Ef</strong> + viðtengingarháttur þátíðar, <strong class="text-cyan-400">myndi</strong> + nafnháttur</div>
              <div class="text-slate-300 text-[11px] pt-1">
                • <em>Ef ég <strong>gæti</strong> talað reiprennandi, <strong>myndi</strong> ég sækja um starfið.</em> (Якби я міг говорити вільно, я б подався на цю посаду).<br>
                • <em>Ef vextir <strong>væru</strong> lægri, <strong>myndi</strong> verðbólga hjaðna.</em> (Якби ставки були нижчими, інфляція вщухла б).
              </div>
            </div>
          </div>
        </div>

        <!-- Vocabulary Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${B1_K1_SOCIETY_DATA.vocabulary.slice(0, 4).map(v => this.renderVocabCard(v)).join('')}
        </div>
      </div>
    `;
  }

  renderEconomicsTab() {
    return `
      <div class="space-y-6">
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4">
          <div class="flex items-center gap-3 text-amber-400">
            <span class="text-2xl">📰</span>
            <h3 class="text-lg font-bold font-mono text-white">Efnahagsmál, kjaraviðræður og fjölmiðlar</h3>
          </div>
          <p class="text-sm font-sans text-slate-300 leading-relaxed">
            ${B1_K1_SOCIETY_DATA.grammarRules[2].contentUkr}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
              <span class="text-xs font-mono text-emerald-300 font-bold uppercase">Сторони соціального діалогу:</span>
              <ul class="text-xs font-mono text-slate-300 space-y-1.5">
                <li>• <strong class="text-white">ASÍ:</strong> Конфедерація профспілок робітників</li>
                <li>• <strong class="text-white">SA:</strong> Асоціація роботодавців Ісландії</li>
                <li>• <strong class="text-white">Ríkissáttasemjari:</strong> Державний арбітр/посередник</li>
                <li>• <strong class="text-white">Karphúsið:</strong> Будівля мирних переговорів у Рейк'явіку</li>
              </ul>
            </div>
            <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
              <span class="text-xs font-mono text-cyan-300 font-bold uppercase">Медіа-джерела для рівня B1:</span>
              <ul class="text-xs font-mono text-slate-300 space-y-1.5">
                <li>• <strong class="text-white">RÚV Auðskilið:</strong> Новини спрощеною мовою з дикторською начиткою</li>
                <li>• <strong class="text-white">Heimildin:</strong> Аналітичні журналістські розслідування</li>
                <li>• <strong class="text-white">Kjarninn & Vísir:</strong> Щоденні дебати про бізнес та політику</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Vocabulary Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${B1_K1_SOCIETY_DATA.vocabulary.slice(4, 8).map(v => this.renderVocabCard(v)).join('')}
        </div>
      </div>
    `;
  }

  renderVocabCard(v) {
    return `
      <div class="p-4 rounded-2xl bg-cyber-card border border-cyber-border hover:border-amber-500/50 transition-all space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono px-2 py-0.5 rounded bg-black/40 text-amber-300 border border-cyber-border uppercase font-bold">${v.gender}</span>
          <a href="${v.binUrl}" target="_blank" class="text-[10px] font-mono text-cyan-400 hover:underline">BÍN ↗</a>
        </div>
        <div>
          <h4 class="text-base font-bold font-mono text-white">${v.word}</h4>
          <span class="text-[10px] font-mono text-slate-400">${v.ipa}</span>
        </div>
        <p class="text-xs font-sans text-amber-200 font-medium">${v.translationUkr}</p>
        <div class="pt-2 border-t border-cyber-border/40 text-[11px] font-mono text-slate-400">
          <span class="text-slate-300">«${v.exampleIsl}»</span>
        </div>
      </div>
    `;
  }

  renderDialogueTab() {
    return `
      <div class="space-y-6">
        <div class="p-6 rounded-3xl bg-cyber-card border border-amber-500/30 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
              Автентичний діалог B1 • Дебати SA та Efling
            </span>
            <span class="text-xs font-mono text-slate-400">8 реплік • Neural 24kHz</span>
          </div>
          <h3 class="text-lg font-bold font-mono text-white">Kjaraviðræður og efnahagslegur stöðugleiki</h3>
          <p class="text-xs text-slate-300">Діалог представника працедавців (SA) та голови профспілки Efling щодо купівельної спроможності, інфляції та умовного способу дієслів.</p>
        </div>

        <div class="space-y-4">
          ${B1_K1_SOCIETY_DATA.dialogue.map(l => `
            <div class="p-4 rounded-2xl bg-cyber-card border border-cyber-border flex items-start gap-4 hover:border-amber-500/40 transition-all">
              <div class="w-10 h-10 rounded-2xl bg-cyber-deep border border-cyber-border flex items-center justify-center text-xl shrink-0">
                ${l.avatar}
              </div>
              <div class="space-y-1.5 flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-amber-400">${l.speaker} <span class="text-slate-400 font-normal">(${l.speakerUkr})</span></span>
                  <button class="b1-dialogue-play-btn p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/30 transition-all cursor-pointer" data-audio="${l.audioUrl}">
                    <span>▶️</span>
                  </button>
                </div>
                <p class="text-sm font-mono text-white font-bold">${l.textIsl}</p>
                <p class="text-xs font-sans text-slate-400">${l.textUkr}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.container.querySelectorAll('.b1-tab-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeTab = btn.dataset.tab;
        audioEngine.playBlip?.();
        this.render();
      };
    });

    const headerExamBtn = this.container.querySelector('#b1k1-header-exam-btn');
    if (headerExamBtn) {
      headerExamBtn.onclick = () => {
        this.activeTab = 'exam';
        audioEngine.playBlip?.();
        this.render();
      };
    }

    this.container.querySelectorAll('.b1-dialogue-play-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const audioSrc = btn.dataset.audio;
        if (audioSrc) {
          audioEngine.play(audioSrc, btn);
        }
      };
    });

    if (this.activeTab === 'exam') {
      const mountPoint = this.container.querySelector('#b1k1-exam-mount-point');
      if (mountPoint) {
        this.examComponent = new B1K1Exam(mountPoint, null, () => {
          this.activeTab = 'grammar';
          this.render();
        });
        this.examComponent.render();
      }
    }
  }
}
