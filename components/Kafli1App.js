/**
 * Kafli1App.js - Main Orchestrator for Kafli 1: Hver ert þú?
 * Sub-navigation: [1. Граматика та vera] | [2. Словник & Мнемоніка] | [3. Діалоги] | [4. Тренажер (10)]
 */

import { K1_DATA } from '../data/k1_hver_ert_thu.js?v=7.1';
import { VeraGrammarHub } from './VeraGrammarHub.js?v=7.1';
import { VocabHubK1 } from './VocabHubK1.js?v=7.1';
import { ScenarioDialoguesK1 } from './ScenarioDialoguesK1.js?v=7.1';
import { DrillSuiteK1 } from './DrillSuiteK1.js?v=7.1';

export class Kafli1App {
  constructor(rootElement) {
    this.root = rootElement;
    this.data = K1_DATA;
    this.activeSubTab = 'grammar'; // 'grammar', 'vocab', 'dialogues', 'drills'
    this.subComponents = {};
  }

  render() {
    this.root.innerHTML = `
      <div class="space-y-4">
        <!-- Sub-Navigation Bar for Kafli 1 -->
        <div class="flex items-center justify-between pb-2 border-b border-cyber-border/30 gap-2 flex-wrap">
          <div class="flex items-center gap-1.5 overflow-x-auto text-xs font-mono scrollbar-none">
            <button data-subtab="grammar" class="k1-subnav-btn sub-tab-btn ${this.activeSubTab === 'grammar' ? 'active' : ''}">
              1. Граматика (5 таблиць)
            </button>
            <button data-subtab="vocab" class="k1-subnav-btn sub-tab-btn ${this.activeSubTab === 'vocab' ? 'active' : ''}">
              2. Словник & Міста (55)
            </button>
            <button data-subtab="dialogues" class="k1-subnav-btn sub-tab-btn ${this.activeSubTab === 'dialogues' ? 'active' : ''}">
              3. Діалоги (4 ситуації)
            </button>
            <button data-subtab="drills" class="k1-subnav-btn sub-tab-btn ${this.activeSubTab === 'drills' ? 'active' : ''}">
              4. Тренажер (20)
            </button>
          </div>

          <div class="flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Рівень A1.1 • Стандарт Íslenska fyrir alla 1
            </span>
          </div>
        </div>

        <!-- Containers for Sub-Components -->
        <div id="k1-section-grammar" class="k1-sub-section ${this.activeSubTab === 'grammar' ? '' : 'hidden'}"></div>
        <div id="k1-section-vocab" class="k1-sub-section ${this.activeSubTab === 'vocab' ? '' : 'hidden'}"></div>
        <div id="k1-section-dialogues" class="k1-sub-section ${this.activeSubTab === 'dialogues' ? '' : 'hidden'}"></div>
        <div id="k1-section-drills" class="k1-sub-section ${this.activeSubTab === 'drills' ? '' : 'hidden'}"></div>
      </div>
    `;

    this.mountSubComponents();
    this.bindEvents();
  }

  mountSubComponents() {
    const gContainer = this.root.querySelector('#k1-section-grammar');
    if (gContainer) {
      this.subComponents.grammar = new VeraGrammarHub(gContainer, this.data.grammar_system);
      this.subComponents.grammar.render();
    }

    const vContainer = this.root.querySelector('#k1-section-vocab');
    if (vContainer) {
      this.subComponents.vocab = new VocabHubK1(
        vContainer,
        this.data.countries_and_nationalities,
        this.data.professions,
        this.data.languages_and_proficiency
      );
      this.subComponents.vocab.render();
    }

    const dContainer = this.root.querySelector('#k1-section-dialogues');
    if (dContainer) {
      this.subComponents.dialogues = new ScenarioDialoguesK1(dContainer, this.data.scenarios);
      this.subComponents.dialogues.render();
    }

    const drContainer = this.root.querySelector('#k1-section-drills');
    if (drContainer) {
      this.subComponents.drills = new DrillSuiteK1(drContainer, this.data.drill_suite);
      this.subComponents.drills.render();
    }
  }

  bindEvents() {
    this.root.querySelectorAll('.k1-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const subtab = btn.dataset.subtab;
        this.switchSubTab(subtab);
      });
    });
  }

  switchSubTab(subtab) {
    this.activeSubTab = subtab;

    this.root.querySelectorAll('.k1-subnav-btn').forEach(b => {
      const isTarget = b.dataset.subtab === subtab;
      b.classList.toggle('active', isTarget);
    });

    this.root.querySelectorAll('.k1-sub-section').forEach(sec => {
      sec.classList.add('hidden');
    });

    const activeSec = this.root.querySelector(`#k1-section-${subtab}`);
    if (activeSec) {
      activeSec.classList.remove('hidden');
    }
  }
}
