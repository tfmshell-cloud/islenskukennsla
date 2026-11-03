/**
 * IpaSoundBuilder.js - Interactive IPA Word Construction Engine
 * Step 0.5: Build Icelandic words not from orthographic letters, but from phonetic IPA blocks
 * Supports: hvað, nafn, steinn, fjall, takk with distractor pools and linguistic feedback (+25 XP)
 */

import { audioEngine } from './AudioEngine.js?v=6.2';
import { gameState } from './GameState.js';

export class IpaSoundBuilder {
  constructor(container, puzzlesData) {
    this.container = container;
    this.puzzles = puzzlesData || [];
    this.currentIdx = 0;
    this.placedPhonemes = [];
    this.isSolved = false;
    this.statusMessage = null; // { type: 'success' | 'error', text: '' }
  }

  render() {
    if (!this.puzzles || this.puzzles.length === 0) {
      this.container.innerHTML = `<div class="p-4 text-center text-slate-400">Немає доступних завдань конструктора IPA.</div>`;
      return;
    }

    const puzzle = this.puzzles[this.currentIdx];
    const targetLen = puzzle.target_ipa.length;

    // Available pool minus already placed ones (by index or multiset)
    // To allow duplicate phonemes like [n], track placed indices in pool
    const pool = puzzle.pool;

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Step Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-cyber-border/30">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30">
              Крок 0.5 • Фонетичний конструктор
            </span>
            <h2 class="text-base sm:text-lg font-black text-white flex items-center gap-1.5 font-mono">
              <span>🏗️ Конструктор слів IPA (IPA Sound Builder)</span>
            </h2>
          </div>
          <span class="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/30 font-bold">
            +25 XP за правильно зібране слово
          </span>
        </div>

        <!-- Concept Explainer -->
        <div class="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200 font-sans flex items-start gap-2.5">
          <span class="text-lg">💡</span>
          <div>
            <strong>Концепція Árnastofnun:</strong> В ісландській мові вимова часто суттєво відрізняється від написання. 
            Ваше завдання — зібрати звучання слова не з букв алфавіту, а з блоків міжнародної фонетичної транскрипції [IPA]. 
            Натискайте на фонеми внизу, щоб заповнити комірки.
          </div>
        </div>

        <!-- Word Selector Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
          ${this.puzzles.map((p, idx) => `
            <button data-puzzle-idx="${idx}" class="ipa-puzzle-tab px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${this.currentIdx === idx ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30' : 'bg-black/50 text-slate-400 border border-slate-800 hover:text-white'}">
              #${idx + 1}: ${p.word} (${p.display_ipa})
            </button>
          `).join('')}
        </div>

        <!-- Active Puzzle Arena -->
        <div class="p-5 sm:p-6 rounded-2xl bg-cyber-deep/95 border border-purple-500/30 shadow-2xl space-y-5">
          
          <!-- Word Target Banner -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400">Цільове ісландське слово:</div>
              <div class="flex items-baseline gap-3">
                <span class="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">${puzzle.word}</span>
                <span class="text-sm sm:text-base font-bold text-amber-300 font-sans">— «${puzzle.translation}»</span>
              </div>
            </div>

            <!-- Audio button for reference -->
            <button id="ipa-play-target-audio" class="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black font-mono text-xs font-bold transition-all flex items-center gap-2 border border-cyan-500/40 self-start sm:self-auto shadow-sm">
              <span>🔊</span> <span>Зразок вимови</span>
            </button>
          </div>

          <!-- Rule Hint Bar -->
          <div class="p-3 rounded-xl bg-black/60 border border-slate-800 text-xs font-sans text-slate-300 flex items-center gap-2">
            <span class="text-base text-cyan-400">🔍</span>
            <span><strong>Фонетичне правило:</strong> ${puzzle.rule_hint}</span>
          </div>

          <!-- Target Assembly Slots -->
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Комірки транскрипції (${this.placedPhonemes.length}/${targetLen}):</span>
              <span class="text-[11px] text-slate-500">Натисніть на встановлену фонему, щоб повернути її в пул</span>
            </div>

            <div class="flex items-center justify-center gap-2 sm:gap-3 p-4 rounded-xl bg-black/80 border border-slate-800 min-h-[76px] flex-wrap">
              ${puzzle.target_ipa.map((_, slotIdx) => {
                const placed = this.placedPhonemes[slotIdx];
                if (placed) {
                  return `
                    <button class="placed-slot-chip px-3.5 py-2 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-mono font-extrabold text-base shadow-lg shadow-purple-500/30 transform hover:scale-105 active:scale-95 transition-all border border-purple-300/40 flex items-center gap-1.5" data-slot-idx="${slotIdx}" title="Видалити фонему">
                      <span>${placed}</span>
                      <span class="text-[10px] text-purple-200 opacity-60">✕</span>
                    </button>
                  `;
                }
                return `
                  <div class="w-14 h-12 rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/40 flex items-center justify-center text-slate-600 font-mono text-xs font-bold">
                    ${slotIdx + 1}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Phoneme Selection Pool -->
          <div class="space-y-2">
            <div class="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
              Пул доступних фонем (виберіть правильні блоки):
            </div>
            <div class="flex items-center justify-center gap-2 flex-wrap p-3 rounded-xl bg-black/40 border border-slate-800/80">
              ${pool.map((phoneme, poolIdx) => {
                // Check how many times this phoneme appears in pool vs already placed
                const timesInPool = pool.filter(p => p === phoneme).length;
                const timesPlaced = this.placedPhonemes.filter(p => p === phoneme).length;
                const isExhausted = timesPlaced >= timesInPool;

                return `
                  <button 
                    class="pool-phoneme-btn px-4 py-2 rounded-xl font-mono font-bold text-sm sm:text-base transition-all ${
                      isExhausted 
                        ? 'opacity-30 bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed pointer-events-none' 
                        : 'bg-black/70 hover:bg-purple-600 text-cyan-300 hover:text-white border border-slate-700 hover:border-purple-400 hover:scale-105 shadow-md active:scale-95'
                    }" 
                    data-phoneme="${phoneme}" 
                    ${isExhausted ? 'disabled' : ''}>
                    ${phoneme}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Status Message Toast -->
          ${this.statusMessage ? `
            <div class="p-3.5 rounded-xl text-xs font-mono flex items-center justify-between gap-3 animate-fade-in ${
              this.statusMessage.type === 'success' 
                ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300' 
                : 'bg-rose-500/20 border border-rose-400 text-rose-300'
            }">
              <div class="flex items-center gap-2">
                <span class="text-base">${this.statusMessage.type === 'success' ? '🎉' : '⚠️'}</span>
                <span>${this.statusMessage.text}</span>
              </div>
              ${this.statusMessage.type === 'success' ? `
                <button id="ipa-next-puzzle-btn" class="px-3 py-1 rounded-lg bg-emerald-500 text-black font-extrabold text-xs font-mono shadow-md hover:bg-emerald-400 transition-all">
                  Наступне слово ➔
                </button>
              ` : ''}
            </div>
          ` : ''}

          <!-- Action Buttons -->
          <div class="flex items-center justify-between gap-3 pt-2">
            <button id="ipa-clear-btn" class="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold transition-all border border-slate-700">
              🔄 Очистити комірки
            </button>

            <button id="ipa-check-btn" class="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-mono text-xs sm:text-sm font-extrabold shadow-lg shadow-purple-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
              <span>✨ Перевірити транскрипцію</span>
            </button>
          </div>

        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Puzzle Selector Tabs
    this.container.querySelectorAll('.ipa-puzzle-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.currentIdx = parseInt(e.currentTarget.dataset.puzzleIdx, 10);
        this.placedPhonemes = [];
        this.statusMessage = null;
        this.isSolved = false;
        this.render();
      });
    });

    // Reference audio button
    const playAudioBtn = this.container.querySelector('#ipa-play-target-audio');
    if (playAudioBtn) {
      playAudioBtn.addEventListener('click', () => {
        const puzzle = this.puzzles[this.currentIdx];
        this.playWordAudio(puzzle, playAudioBtn);
      });
    }

    // Pool buttons (click to place into next empty slot)
    this.container.querySelectorAll('.pool-phoneme-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const puzzle = this.puzzles[this.currentIdx];
        if (this.placedPhonemes.length < puzzle.target_ipa.length) {
          const phoneme = e.currentTarget.dataset.phoneme;
          this.placedPhonemes.push(phoneme);
          this.statusMessage = null;
          this.render();

          // Auto-check if all slots filled
          if (this.placedPhonemes.length === puzzle.target_ipa.length) {
            this.validate();
          }
        }
      });
    });

    // Placed chips (click to remove)
    this.container.querySelectorAll('.placed-slot-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const slotIdx = parseInt(e.currentTarget.dataset.slotIdx, 10);
        this.placedPhonemes.splice(slotIdx, 1);
        this.statusMessage = null;
        this.render();
      });
    });

    // Clear button
    const clearBtn = this.container.querySelector('#ipa-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.placedPhonemes = [];
        this.statusMessage = null;
        this.render();
      });
    }

    // Check button
    const checkBtn = this.container.querySelector('#ipa-check-btn');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        this.validate();
      });
    }

    // Next puzzle button
    const nextBtn = this.container.querySelector('#ipa-next-puzzle-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentIdx = (this.currentIdx + 1) % this.puzzles.length;
        this.placedPhonemes = [];
        this.statusMessage = null;
        this.isSolved = false;
        this.render();
      });
    }
  }

  validate() {
    const puzzle = this.puzzles[this.currentIdx];
    const target = puzzle.target_ipa;

    if (this.placedPhonemes.length < target.length) {
      this.statusMessage = {
        type: 'error',
        text: `Заповніть усі ${target.length} комірки транскрипції перед перевіркою!`
      };
      this.render();
      return;
    }

    const isMatch = target.every((t, i) => t === this.placedPhonemes[i]);

    if (isMatch) {
      this.isSolved = true;
      gameState.addXP(25);
      this.statusMessage = {
        type: 'success',
        text: `Чудово! Слово ${puzzle.word} читається як ${puzzle.display_ipa}. +25 XP нараховано!`
      };
      this.render();
      this.playWordAudio(puzzle);
    } else {
      this.statusMessage = {
        type: 'error',
        text: `Не зовсім точно. Зібрано: ${this.placedPhonemes.join('')}, очікується інша послідовність. Спробуйте ще раз або очистіть помилкові фонеми!`
      };
      this.render();
    }
  }

  playWordAudio(puzzle, element = null) {
    audioEngine.play(puzzle.word, element, 0.85, puzzle.display_ipa);
  }
}
