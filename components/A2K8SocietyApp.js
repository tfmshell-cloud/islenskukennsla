/**
 * A2K8SocietyApp.js - Master Interactive Application for Level A2 • Lesson 8
 * (Kafli 8: Íslenskt samfélag, réttindi og Lokapróf A2)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 8: Samfélagið & Menning)
 * - Skatturinn (Skattframtal & Persónuafsláttur)
 * - Útlendingastofnun & ASÍ (Dvalarleyfi, Réttindi & Stéttarfélög)
 * - Lokapróf A2 Certification Engine
 */

import { A2_K8_SOCIETY_DATA } from '../data/a2_k8_society_data.js?v=1.0';
import { A2K8Exam } from './A2K8Exam.js?v=1.0';
import { audioEngine } from './AudioEngine.js?v=7.3';
import { gameState } from './GameState.js?v=7.0';

export class A2K8SocietyApp {
  constructor(container) {
    this.container = container;
    this.activeTab = 'society'; // 'society' | 'taxes' | 'culture' | 'dialogue' | 'exam'
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
                Рівень A2 • Книга 2 • Урок 8 (ФІНАЛ A2)
              </span>
              <span class="text-xs text-slate-400 font-mono">ÍFA 2 Kafli 8 • Skatturinn, ÚTL & ASÍ</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
              <span>🏆</span> Íslenskt samfélag, réttindi og Lokapróf A2
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Податкова декларація у <span class="text-amber-300 font-mono">Skatturinn</span>, захист прав у профспілці <span class="text-emerald-300 font-mono">ASÍ</span>, дозвіл на проживання <span class="text-cyan-300 font-mono">dvalarleyfi</span> та випускний екзамен <span class="text-purple-300 font-mono">Lokapróf A2</span>.
            </p>
          </div>

          <!-- Quick Stats / Exam Status Badge -->
          <div class="flex items-center gap-2 shrink-0">
            <button id="a2k8-header-exam-btn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-mono text-xs font-extrabold shadow-xl hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer">
              <span>🎓</span>
              <span>Lokapróf A2 (+300 XP)</span>
            </button>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cyber-border font-mono text-xs">
          <button data-tab="society" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'society' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🛡️</span><span>1. Права, Імміграція & Профспілки</span>
          </button>
          <button data-tab="taxes" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'taxes' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🏛️</span><span>2. Декларація Skattframtal & Податки</span>
          </button>
          <button data-tab="culture" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'culture' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🇮🇸</span><span>3. Свята, Традиції & Етикет</span>
          </button>
          <button data-tab="dialogue" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'dialogue' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🎧</span><span>4. Діалог: Консультація в Skatturinn</span>
          </button>
          <button data-tab="exam" class="a2-tab-btn px-4 py-2 rounded-xl border ${this.activeTab === 'exam' ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold' : 'border-cyber-border text-slate-400 hover:text-white'} transition-all flex items-center gap-2 cursor-pointer">
            <span>🎓</span><span>5. Випускний екзамен Lokapróf A2 (30 Q)</span>
          </button>
        </div>

        <!-- Dynamic Content Area -->
        <div id="a2k8-content-area" class="min-h-[400px]">
          ${this.renderActiveTabContent()}
        </div>

      </div>
    `;

    this.bindEvents();
  }

  renderActiveTabContent() {
    switch (this.activeTab) {
      case 'society':
        return this.renderSocietyTab();
      case 'taxes':
        return this.renderTaxesTab();
      case 'culture':
        return this.renderCultureTab();
      case 'dialogue':
        return this.renderDialogueTab();
      case 'exam':
        return '<div id="a2k8-exam-mount-point"></div>';
      default:
        return this.renderSocietyTab();
    }
  }

  renderSocietyTab() {
    return `
      <div class="space-y-6">
        <!-- Grammar/Rule Card 1 -->
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4">
          <div class="flex items-center gap-3 text-amber-400">
            <span class="text-2xl">🛡️</span>
            <h3 class="text-lg font-bold font-mono text-white">Útlendingastofnun, dvalarleyfi og stéttarfélög</h3>
          </div>
          <p class="text-sm font-sans text-slate-300 leading-relaxed">
            ${A2_K8_SOCIETY_DATA.grammarRules[1].contentUkr}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
              <span class="text-xs font-mono text-amber-300 font-bold uppercase">Імміграційні терміни:</span>
              <ul class="text-xs font-mono text-slate-300 space-y-1.5">
                <li>• <strong class="text-white">Dvalarleyfi:</strong> дозвіл на проживання</li>
                <li>• <strong class="text-white">Tímabundið / Ótímabundið:</strong> тимчасовий / постійний дозвіл</li>
                <li>• <strong class="text-white">Endurnýjun dvalarleyfis:</strong> продовження посвідки</li>
                <li>• <strong class="text-white">Atvinnuleyfi:</strong> дозвіл на роботу (VMST)</li>
              </ul>
            </div>
            <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
              <span class="text-xs font-mono text-emerald-300 font-bold uppercase">Профспілкові гарантії (ASÍ / Efling):</span>
              <ul class="text-xs font-mono text-slate-300 space-y-1.5">
                <li>• <strong class="text-white">Kjarasamningur:</strong> обов'язковий мінімум оплати праці</li>
                <li>• <strong class="text-white">Sjúkrasjóður:</strong> оплата лікарняних у разі довгої хвороби</li>
                <li>• <strong class="text-white">Starfsmenntastyrkur:</strong> грант 75–90% на курси ісландської</li>
                <li>• <strong class="text-white">Orlofssjóður:</strong> літня відпустка та оренда котеджів</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Vocabulary Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${A2_K8_SOCIETY_DATA.vocabulary.slice(0, 4).map(v => this.renderVocabCard(v)).join('')}
        </div>
      </div>
    `;
  }

  renderTaxesTab() {
    return `
      <div class="space-y-6">
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4">
          <div class="flex items-center gap-3 text-amber-400">
            <span class="text-2xl">🏛️</span>
            <h3 class="text-lg font-bold font-mono text-white">Skatturinn: Skattframtal og Persónuafsláttur</h3>
          </div>
          <p class="text-sm font-sans text-slate-300 leading-relaxed">
            ${A2_K8_SOCIETY_DATA.grammarRules[0].contentUkr}
          </p>

          <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
            <h4 class="text-xs font-mono font-bold text-amber-300 uppercase">Чекліст весняної податкової декларації (Mars):</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div class="p-3 rounded-xl bg-black/40 border border-cyber-border">
                <span class="text-amber-400 font-bold">1. Skrá inn</span><br>
                Авторизація на skatturinn.is через Auðkenni
              </div>
              <div class="p-3 rounded-xl bg-black/40 border border-cyber-border">
                <span class="text-amber-400 font-bold">2. Yfirfara tekjur</span><br>
                Звірка доходів з розрахунковими табелями (launaseðill)
              </div>
              <div class="p-3 rounded-xl bg-black/40 border border-cyber-border">
                <span class="text-amber-400 font-bold">3. Reikningur</span><br>
                Перевірка банківського рахунку для endurgreiðsla
              </div>
            </div>
          </div>
        </div>

        <!-- Vocabulary Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${A2_K8_SOCIETY_DATA.vocabulary.slice(4, 8).map(v => this.renderVocabCard(v)).join('')}
        </div>
      </div>
    `;
  }

  renderCultureTab() {
    return `
      <div class="space-y-6">
        <div class="p-6 rounded-3xl bg-cyber-card border border-cyber-border space-y-4">
          <div class="flex items-center gap-3 text-amber-400">
            <span class="text-2xl">🇮🇸</span>
            <h3 class="text-lg font-bold font-mono text-white">Menning, hátíðir og jafnrétti í samskiptum</h3>
          </div>
          <p class="text-sm font-sans text-slate-300 leading-relaxed">
            ${A2_K8_SOCIETY_DATA.grammarRules[2].contentUkr}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
              <span class="text-xs font-mono text-purple-300 font-bold uppercase">Головні дати та свята:</span>
              <ul class="text-xs font-mono text-slate-300 space-y-1.5">
                <li>• <strong class="text-white">17. júní:</strong> Þjóðhátíðardagur (День Республіки)</li>
                <li>• <strong class="text-white">Þorri (jan–feb):</strong> Þorrablót, hákarl, svið, hangikjöt</li>
                <li>• <strong class="text-white">Fyrsti sunnudagur í júní:</strong> Sjómannadagurinn</li>
                <li>• <strong class="text-white">Ágúst:</strong> Verslunarmannahelgi (вихідні на природі)</li>
              </ul>
            </div>
            <div class="p-4 rounded-2xl bg-cyber-deep/60 border border-cyber-border space-y-2">
              <span class="text-xs font-mono text-cyan-300 font-bold uppercase">Ісландський етикет рівності (Jafnræði):</span>
              <ul class="text-xs font-mono text-slate-300 space-y-1.5">
                <li>• До всіх звертаються на <strong class="text-white">«þú»</strong> (ти) і на ім'я.</li>
                <li>• Прізвищ у європейському розумінні майже немає — використовуються по батькові на <em>-son</em> / <em>-dóttir</em>.</li>
                <li>• У чергах, у басейні та транспорті дотримуються особистого простору.</li>
                <li>• Знімати вуличне взуття перед входом у житло або садок — непорушне правило!</li>
              </ul>
            </div>
          </div>
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
              Автентичний діалог • Skatturinn
            </span>
            <span class="text-xs font-mono text-slate-400">8 реплік • Neural 24kHz</span>
          </div>
          <h3 class="text-lg font-bold font-mono text-white">Samskipti hjá Skattinum: Aðstoð við skattframtal</h3>
          <p class="text-xs text-slate-300">Консультація у податковій службі щодо подання декларації онлайн, перевірки особистої знижки та повернення переплачених коштів.</p>
        </div>

        <div class="space-y-4">
          ${A2_K8_SOCIETY_DATA.dialogue.map(l => `
            <div class="p-4 rounded-2xl bg-cyber-card border border-cyber-border flex items-start gap-4 hover:border-amber-500/40 transition-all">
              <div class="w-10 h-10 rounded-2xl bg-cyber-deep border border-cyber-border flex items-center justify-center text-xl shrink-0">
                ${l.avatar}
              </div>
              <div class="space-y-1.5 flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-amber-400">${l.speaker} <span class="text-slate-400 font-normal">(${l.speakerUkr})</span></span>
                  <button class="a2-dialogue-play-btn p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/30 transition-all cursor-pointer" data-audio="${l.audioUrl}">
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
    // Tab switching
    this.container.querySelectorAll('.a2-tab-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeTab = btn.dataset.tab;
        audioEngine.playBlip?.();
        this.render();
      };
    });

    // Header exam button shortcut
    const headerExamBtn = this.container.querySelector('#a2k8-header-exam-btn');
    if (headerExamBtn) {
      headerExamBtn.onclick = () => {
        this.activeTab = 'exam';
        audioEngine.playBlip?.();
        this.render();
      };
    }

    // Audio playback for dialogue
    this.container.querySelectorAll('.a2-dialogue-play-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const audioSrc = btn.dataset.audio;
        if (audioSrc) {
          audioEngine.play(audioSrc, btn);
        }
      };
    });

    // Mount Exam component if on 'exam' tab
    if (this.activeTab === 'exam') {
      const mountPoint = this.container.querySelector('#a2k8-exam-mount-point');
      if (mountPoint) {
        this.examComponent = new A2K8Exam(mountPoint, null, () => {
          this.activeTab = 'society';
          this.render();
        });
        this.examComponent.render();
      }
    }
  }
}
