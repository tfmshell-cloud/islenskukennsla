/**
 * SpeechEtiquette.js - Step 0.6: Jón & Anna Dialogue Simulator & Pragmatics
 * Features:
 * - 100% Native Audio Playback for all dialogue turns (male & female scenarios)
 * - Compact Messenger/Chat UI layout (50% less vertical clutter)
 * - Gender Toggle (👨 Karlkyn / 👩 Kvenkyn) with sociolinguistic feedback
 * - Interactive Patronymic Name Generator
 * - Dual Theme AAA Contrast (Obsidian Dark & Nordic Light Paper)
 */

import { audioEngine } from './AudioEngine.js?v=5.9';

export class SpeechEtiquette {
  constructor(container, dialogueData) {
    this.container = container;
    this.data = dialogueData || {};
    this.userGender = 'male'; // 'male' (Karlkyn) | 'female' (Kvenkyn)
    this.showTranslation = true;
    this.isPlayingAll = false;
  }

  render() {
    const isMale = this.userGender === 'male';
    const lines = isMale 
      ? (this.data.scenario_male || this.data.dialogue_lines || [])
      : (this.data.scenario_female || this.data.dialogue_lines || []);

    this.container.innerHTML = `
      <div class="space-y-3.5">
        
        <!-- Compact Control Bar: Gender Toggle & Audio Controls -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl dlg-header-card border text-xs font-mono shadow-sm">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider dlg-badge">
              Крок 0.6 • Симулятор діалогу
            </span>
            <span class="font-bold dlg-title text-xs sm:text-sm">Jón & Anna</span>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-1.5 flex-wrap">
            <!-- Gender Switcher -->
            <div class="flex items-center p-0.5 rounded-lg border dlg-toggle-group">
              <button id="gender-toggle-male" class="px-2.5 py-1 rounded-md font-bold text-[11px] transition-all ${isMale ? 'dlg-toggle-active-male shadow-sm' : 'dlg-toggle-inactive'}">
                👨 Чоловік (Karlkyn)
              </button>
              <button id="gender-toggle-female" class="px-2.5 py-1 rounded-md font-bold text-[11px] transition-all ${!isMale ? 'dlg-toggle-active-female shadow-sm' : 'dlg-toggle-inactive'}">
                👩 Жінка (Kvenkyn)
              </button>
            </div>

            <!-- Translation Toggle -->
            <button id="toggle-translations-btn" class="px-2.5 py-1 rounded-lg border font-bold text-[11px] transition-all flex items-center gap-1 dlg-ctrl-btn">
              <span>👁️ Переклад:</span>
              <strong id="trans-state-label" class="dlg-trans-toggle-state">${this.showTranslation ? 'ТАК' : 'НІ'}</strong>
            </button>

            <!-- Play Full Dialogue Button -->
            <button id="play-full-dialogue-btn" class="px-3 py-1 rounded-lg dlg-play-all-btn font-extrabold text-[11px] font-mono shadow-sm transition-all flex items-center gap-1 active:scale-95">
              <span>▶️ Весь діалог</span>
            </button>
          </div>
        </div>

        <!-- Compact Gender Mode Context Banner -->
        <div class="px-3 py-2 rounded-xl dlg-context-banner border text-xs flex items-center gap-2">
          <span class="text-base">${isMale ? '👨' : '👩'}</span>
          <div class="font-sans leading-tight">
            <strong>${isMale ? 'Режим: Студент-чоловік' : 'Режим: Студентка-жінка'}</strong> — зверніть увагу: звертаючись до ${isMale ? 'вас, кажуть' : 'вас, кажуть'} 
            <strong class="font-mono dlg-accent-word">${isMale ? 'Sæll! [saitl]' : 'Sæl! [sail]'}</strong>, а форма походження: 
            <strong class="font-mono dlg-accent-word">${isMale ? 'Úkraínumaður' : 'Úkraínukona'}</strong>.
          </div>
        </div>

        <!-- ================= COMPACT CHAT FEED (Messenger Style) ================= -->
        <div class="max-w-2xl mx-auto space-y-2 py-1">
          ${lines.map((line, idx) => {
            const isUser = line.role === 'user';
            const audioPath = line.audio_file || `./audio/dialogue/${isMale ? 'dlg_m' : 'dlg_f'}_${idx + 1}.mp3`;

            return `
              <div 
                id="dialogue-line-${line.id}" 
                class="dialogue-card p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer group shadow-sm ${
                  isUser 
                    ? 'ml-auto max-w-[92%] sm:max-w-[85%] dlg-bubble-user rounded-tr-sm' 
                    : 'mr-auto max-w-[92%] sm:max-w-[85%] dlg-bubble-jon rounded-tl-sm'
                }" 
                data-line-id="${line.id}" 
                data-audio-file="${audioPath}" 
                data-audio-cue="${line.is_text}">
                
                <div class="flex items-start gap-2">
                  <span class="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 dlg-avatar shadow-sm">
                    ${line.avatar}
                  </span>

                  <div class="flex-grow space-y-0.5 min-w-0">
                    <!-- Speaker & Audio Button Row -->
                    <div class="flex items-center justify-between text-[10px] font-mono">
                      <span class="font-bold dlg-speaker-name">${line.speaker}</span>
                      <button class="dialogue-line-play-btn flex items-center gap-1 font-bold px-2 py-0.5 rounded dlg-line-btn opacity-85 group-hover:opacity-100 transition-opacity">
                        <span>🔊</span> <span class="hidden sm:inline">Слухати</span>
                      </button>
                    </div>

                    <!-- Icelandic Spoken Line -->
                    <div class="text-sm font-black font-mono dlg-speech-text tracking-tight leading-snug">
                      ${line.is_text}
                    </div>

                    <!-- Phonetic IPA Transcription -->
                    <div class="text-[11px] font-mono font-semibold dlg-ipa-text">
                      ${line.ipa}
                    </div>

                    <!-- Ukrainian Translation -->
                    <div class="dialogue-uk-translation text-xs font-sans font-semibold dlg-translation-text ${this.showTranslation ? '' : 'hidden'}">
                      🇺🇦 ${line.uk_text}
                    </div>

                    <!-- Pragmatic Note (Compact) -->
                    ${line.note || line.pragmatic_note ? `
                      <div class="text-[10px] font-sans dlg-note-text border-t pt-1 mt-1 leading-tight flex items-start gap-1">
                        <span>💡</span>
                        <span>${line.note || line.pragmatic_note}</span>
                      </div>
                    ` : ''}

                  </div>
                </div>

              </div>
            `;
          }).join('')}
        </div>

        <!-- ================= 4 SOCIOLINGUISTIC COMMENTARY CARDS ================= -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1">
          ${(this.data.sociolinguistic_notes || []).map(note => `
            <div class="p-2.5 rounded-xl border dlg-sociocard space-y-1 shadow-sm">
              <div class="flex items-center gap-1.5 text-xs font-bold font-mono dlg-socio-title">
                <span>${note.icon}</span> <span>${note.title}</span>
              </div>
              <p class="text-[11px] font-sans leading-relaxed dlg-socio-desc">
                ${note.desc}
              </p>
            </div>
          `).join('')}
        </div>

        <!-- ================= PATRONYMIC GENERATOR ================= -->
        <div class="p-3 rounded-xl border dlg-patronymic-card shadow-sm space-y-2">
          <div class="flex items-center justify-between gap-2 pb-1 border-b dlg-patronymic-divider text-xs">
            <div class="flex items-center gap-1.5 font-bold font-mono dlg-patronymic-title">
              <span>🧬</span> <span>Інтерактивний генератор патронімів</span>
            </div>
            <span class="text-[10px] font-mono opacity-80">[Ім'я батька в Ef.] + -son / -dóttir</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div>
              <label class="block text-[10px] font-mono opacity-70 mb-0.5">Батько:</label>
              <select id="patronymic-father-select" class="w-full rounded-lg px-2 py-1 text-xs font-mono border dlg-select focus:outline-none">
                <option value="Jón">Jón (Ef: Jóns)</option>
                <option value="Einar">Einar (Ef: Einars)</option>
                <option value="Magnús">Magnús (Ef: Magnúsar)</option>
                <option value="Gunnar">Gunnar (Ef: Gunnars)</option>
                <option value="Ólafur">Ólafur (Ef: Ólafs)</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-mono opacity-70 mb-0.5">Стать нащадка:</label>
              <select id="patronymic-gender-select" class="w-full rounded-lg px-2 py-1 text-xs font-mono border dlg-select focus:outline-none">
                <option value="son">Син ➔ -son</option>
                <option value="daughter">Донька ➔ -dóttir</option>
              </select>
            </div>

            <div class="p-2 rounded-lg border text-center font-mono dlg-result-box flex flex-col justify-center">
              <div id="patronymic-result-name" class="text-sm font-black dlg-result-name">Jónsson</div>
              <div id="patronymic-result-rule" class="text-[9px] opacity-80">Jóns (Ef.) + son</div>
            </div>
          </div>
        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Gender toggle
    const maleBtn = this.container.querySelector('#gender-toggle-male');
    const femaleBtn = this.container.querySelector('#gender-toggle-female');

    if (maleBtn && femaleBtn) {
      maleBtn.addEventListener('click', () => {
        if (this.userGender !== 'male') {
          this.userGender = 'male';
          this.render();
        }
      });
      femaleBtn.addEventListener('click', () => {
        if (this.userGender !== 'female') {
          this.userGender = 'female';
          this.render();
        }
      });
    }

    // Toggle translations
    const toggleTransBtn = this.container.querySelector('#toggle-translations-btn');
    if (toggleTransBtn) {
      toggleTransBtn.addEventListener('click', () => {
        this.showTranslation = !this.showTranslation;
        const label = this.container.querySelector('#trans-state-label');
        if (label) label.innerText = this.showTranslation ? 'ТАК' : 'НІ';
        this.container.querySelectorAll('.dialogue-uk-translation').forEach(el => {
          el.classList.toggle('hidden', !this.showTranslation);
        });
      });
    }

    // Dialogue line clicks (either whole bubble or specific audio button)
    this.container.querySelectorAll('.dialogue-card').forEach(card => {
      const playAudio = () => {
        const audioFile = card.dataset.audioFile;
        const audioCue = card.dataset.audioCue;
        audioEngine.play(audioFile || audioCue, card);
      };

      card.addEventListener('click', playAudio);

      const btn = card.querySelector('.dialogue-line-play-btn');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          playAudio();
        });
      }
    });

    // Play / Stop full dialogue sequentially
    const playAllBtn = this.container.querySelector('#play-full-dialogue-btn');
    if (playAllBtn) {
      playAllBtn.addEventListener('click', async () => {
        if (this.isPlayingAll) {
          // User clicked while playing: stop immediately
          this.isPlayingAll = false;
          audioEngine.stop();
          playAllBtn.innerText = '▶️ Весь діалог';
          playAllBtn.classList.remove('bg-rose-500', 'hover:bg-rose-600', 'text-white');
          this.container.querySelectorAll('.dialogue-card').forEach(c => {
            c.classList.remove('pulse-playing', 'ring-2', 'ring-cyan-400');
          });
          return;
        }

        this.isPlayingAll = true;
        playAllBtn.innerText = '⏹️ Зупинити';
        playAllBtn.classList.add('bg-rose-500', 'hover:bg-rose-600', 'text-white');

        try {
          const cards = Array.from(this.container.querySelectorAll('.dialogue-card'));
          for (let i = 0; i < cards.length; i++) {
            if (!this.isPlayingAll) break;

            const card = cards[i];
            const audioFile = card.dataset.audioFile;
            const audioCue = card.dataset.audioCue;

            // Scroll card into view smoothly
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Play audio and wait for it to actually finish speaking
            await audioEngine.playUntilEnd(audioFile || audioCue, card, 0.95);

            if (!this.isPlayingAll) break;

            // Natural conversational pause (400ms) between turns
            await new Promise(r => setTimeout(r, 400));
          }
        } catch (err) {
          console.error('Error playing dialogue sequence:', err);
        } finally {
          this.isPlayingAll = false;
          playAllBtn.innerText = '▶️ Весь діалог';
          playAllBtn.classList.remove('bg-rose-500', 'hover:bg-rose-600', 'text-white');
          this.container.querySelectorAll('.dialogue-card').forEach(c => {
            c.classList.remove('pulse-playing', 'ring-2', 'ring-cyan-400');
          });
        }
      });
    }

    // Patronymic generator
    const fSelect = this.container.querySelector('#patronymic-father-select');
    const gSelect = this.container.querySelector('#patronymic-gender-select');
    const rName = this.container.querySelector('#patronymic-result-name');
    const rRule = this.container.querySelector('#patronymic-result-rule');

    const updatePatronymic = () => {
      if (!fSelect || !gSelect || !rName) return;
      const father = fSelect.value;
      const isSon = gSelect.value === 'son';

      let genitive = `${father}s`;
      if (father === 'Magnús') genitive = 'Magnúsar';
      if (father === 'Ólafur') genitive = 'Ólafs';

      const result = `${genitive}${isSon ? 'son' : 'dóttir'}`;
      rName.innerText = result;
      if (rRule) rRule.innerText = `${genitive} (Ef.) + ${isSon ? 'son' : 'dóttir'}`;
    };

    if (fSelect && gSelect) {
      fSelect.addEventListener('change', updatePatronymic);
      gSelect.addEventListener('change', updatePatronymic);
    }
  }
}
