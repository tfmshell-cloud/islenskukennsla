/**
 * BinAuraSystem.js - BÍN (Beygingarlýsing íslensks nútímamáls) Grammar Engine
 * 4-Case Neon Aura System:
 * 🔵 Nefnifall (NF)  - Називний (#00E5FF)
 * 🟢 Þolfall (ÞF)    - Знахідний (#00E676)
 * 🟡 Þágufall (ÞGF)  - Давальний (#FFD600)
 * 🔴 Eignarfall (EF)  - Родовий (#FF0055)
 */

import { gameState } from './GameState.js';

export const BIN_CASES = {
  NF: {
    code: 'NF',
    name: 'Nefnifall',
    ukrainian: 'Називний відмінок',
    color: '#00E5FF',
    glow: 'rgba(0, 229, 255, 0.3)',
    bg: 'rgba(0, 229, 255, 0.12)',
    border: 'rgba(0, 229, 255, 0.5)',
    symbol: '🔵',
    question: 'Hver? Hvað? (Хто? Що?)',
    role: 'Суб\'єкт речення, підмет',
    example: 'Hún er kennari (Вона — вчителька)',
    cssClass: 'bin-nf'
  },
  ÞF: {
    code: 'ÞF',
    alias: 'TF',
    name: 'Þolfall',
    ukrainian: 'Знахідний відмінок',
    color: '#00E676',
    glow: 'rgba(0, 230, 118, 0.3)',
    bg: 'rgba(0, 230, 118, 0.12)',
    border: 'rgba(0, 230, 118, 0.5)',
    symbol: '🟢',
    question: 'Hvern? Hvað? (Кого? Що?)',
    role: 'Прямий додаток, рух кудись (í, á)',
    example: 'Ég tala íslensku (Я розмовляю ісландською)',
    cssClass: 'bin-tf'
  },
  ÞGF: {
    code: 'ÞGF',
    alias: 'TGF',
    name: 'Þágufall',
    ukrainian: 'Давальний відмінок',
    color: '#FFD600',
    glow: 'rgba(255, 214, 0, 0.35)',
    bg: 'rgba(255, 214, 0, 0.12)',
    border: 'rgba(255, 214, 0, 0.5)',
    symbol: '🟡',
    question: 'Hverjum? Hverju? (Кому? Чому?)',
    role: 'Прийменники: frá, að, af, hjá; статичне знаходження',
    example: 'frá Úkraínu (з України), á Íslandi (в Ісландії)',
    cssClass: 'bin-tgf'
  },
  EF: {
    code: 'EF',
    name: 'Eignarfall',
    ukrainian: 'Родовий відмінок',
    color: '#FF0055',
    glow: 'rgba(255, 0, 85, 0.35)',
    bg: 'rgba(255, 0, 85, 0.12)',
    border: 'rgba(255, 0, 85, 0.5)',
    symbol: '🔴',
    question: 'Hvers? (Кого? Чого? Чий?)',
    role: 'Приналежність, закінчення -s, прийменник til (до)',
    example: 'til Íslands (до Ісландії), bókin Jóns (книга Йона)',
    cssClass: 'bin-ef'
  }
};

export class BinAuraSystem {
  constructor() {
    this.cases = BIN_CASES;
    this.isActive = gameState.state.binAuraActive ?? true;
    this.selectedCaseFilter = null; // null or 'NF' | 'ÞF' | 'ÞGF' | 'EF'
    
    // Subscribe to gameState
    gameState.subscribe(state => {
      if (this.isActive !== state.binAuraActive) {
        this.isActive = state.binAuraActive;
        this.applyAuraStateToDOM();
      }
    });
  }

  /**
   * Get case data by normalized code
   */
  getCase(code) {
    if (!code) return null;
    const clean = code.toUpperCase().trim();
    if (clean === 'TF' || clean === 'ÞF') return this.cases['ÞF'];
    if (clean === 'TGF' || clean === 'ÞGF') return this.cases['ÞGF'];
    return this.cases[clean] || null;
  }

  /**
   * Wrap word/phrase with BÍN neon aura markup
   */
  wrap(text, caseCode, gloss = '', explanation = '') {
    const c = this.getCase(caseCode);
    if (!c) return text;

    const tooltip = `${c.symbol} ${c.name} (${c.ukrainian})\n❓ ${c.question}\n📖 ${explanation || c.role}`;
    const safeTooltip = tooltip.replace(/"/g, '&quot;');

    return `<span class="bin-aura ${c.cssClass} inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md font-bold cursor-help transition-all duration-300" 
                  data-bin-case="${c.code}" 
                  data-bin-gloss="${gloss}"
                  data-bin-tooltip="${safeTooltip}"
                  title="${safeTooltip}">
      <span>${text}</span>
      <span class="text-[9px] opacity-80 font-mono tracking-tighter">${c.symbol}</span>
    </span>`;
  }

  /**
   * Toggle global BÍN X-Ray state
   */
  toggleAura() {
    this.isActive = !this.isActive;
    gameState.state.binAuraActive = this.isActive;
    gameState.saveState();
    this.applyAuraStateToDOM();
    return this.isActive;
  }

  /**
   * Apply global CSS state
   */
  applyAuraStateToDOM() {
    const appEl = document.getElementById('app') || document.body;
    if (this.isActive) {
      appEl.classList.remove('bin-auras-hidden');
      appEl.classList.add('bin-auras-active');
    } else {
      appEl.classList.add('bin-auras-hidden');
      appEl.classList.remove('bin-auras-active');
    }

    // Update all toggle buttons
    document.querySelectorAll('.bin-xray-toggle-btn').forEach(btn => {
      btn.innerHTML = this.isActive 
        ? `<span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span><span>💡 BÍN Рентген: УВІМК</span>`
        : `<span class="w-2 h-2 rounded-full bg-slate-400"></span><span>💡 BÍN Рентген: ВИМК</span>`;
      btn.classList.toggle('active', this.isActive);
    });
  }

  /**
   * Render compact interactive 4-Case BÍN Legend Header Bar
   */
  renderCaseLegend() {
    return `
      <div class="bin-legend-bar flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl border text-xs font-mono transition-colors">
        <div class="flex items-center gap-2">
          <span class="bin-legend-title font-bold uppercase text-[10px] tracking-wider text-slate-400">BÍN Аура 4-х відмінків:</span>
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="bin-pill-nf px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1 shadow-sm font-semibold" title="Nefnifall (Називний) - Hver? Hvað?">
              <span>🔵</span> <strong class="font-bold">NF</strong> <span class="hidden sm:inline text-[10px] opacity-80">(Називний)</span>
            </span>
            <span class="bin-pill-tf px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1 shadow-sm font-semibold" title="Þolfall (Знахідний) - Hvern? Hvað?">
              <span>🟢</span> <strong class="font-bold">ÞF</strong> <span class="hidden sm:inline text-[10px] opacity-80">(Знахідний)</span>
            </span>
            <span class="bin-pill-tgf px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1 shadow-sm font-semibold" title="Þágufall (Давальний) - frá + ÞGF 🟡">
              <span>🟡</span> <strong class="font-bold">ÞGF</strong> <span class="hidden sm:inline text-[10px] opacity-80">(Давальний)</span>
            </span>
            <span class="bin-pill-ef px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1 shadow-sm font-semibold" title="Eignarfall (Родовий) - Hvers?">
              <span>🔴</span> <strong class="font-bold">EF</strong> <span class="hidden sm:inline text-[10px] opacity-80">(Родовий)</span>
            </span>
          </div>
        </div>

        <button class="bin-xray-toggle-btn px-2.5 py-1 rounded-lg border font-mono text-[11px] font-bold flex items-center gap-1.5 transition-all ${this.isActive ? 'active' : ''}">
          ${this.isActive 
            ? `<span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span><span>💡 BÍN Рентген: УВІМК</span>`
            : `<span class="w-2 h-2 rounded-full bg-slate-400"></span><span>💡 BÍN Рентген: ВИМК</span>`
          }
        </button>
      </div>
    `;
  }

  /**
   * Bind event handlers for legend bar and interactive tooltips
   */
  bindEvents(container = document) {
    container.querySelectorAll('.bin-xray-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleAura();
      });
    });

    // Delegated click for case aura inspection
    container.querySelectorAll('.bin-aura').forEach(el => {
      el.addEventListener('click', (e) => {
        const caseCode = el.dataset.binCase;
        const c = this.getCase(caseCode);
        if (c) {
          gameState.playFlexionFlySound();
        }
      });
    });
  }
}

export const binAuraSystem = new BinAuraSystem();
