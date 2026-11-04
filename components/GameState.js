/**
 * GameState.js - Duolingo Gamification Engine Core
 * Manages XP, Streaks (🔥), Crystals (💎), Viking Titles, and WebAudio Crystalline Victory Chimes
 */

export class GameState {
  constructor() {
    this.storageKey = 'islenskukennsla_gamestate_v2';
    this.listeners = new Set();
    this.audioContext = null;
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('LocalStorage error:', e);
      }
    }

    return {
      xp: 120,
      streak: 3,
      gems: 45,
      vikingTitle: 'Учень вікінгів (Víkinganemi) 🗡️',
      unlockedNodes: ['keflavik', 'reykjavik'],
      completedDrills: [],
      inventory: ['Galdrastafur (Руна захисту)', 'Kaffibolli (Чашка кави)'],
      binAuraActive: true,
      theme: 'dark'
    };
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {}
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  initAudio() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  addXP(amount = 20) {
    this.state.xp += amount;
    this.checkRankUp();
    this.saveState();
    this.playVictoryChime();
    return this.state.xp;
  }

  addGems(amount = 5) {
    this.state.gems += amount;
    this.saveState();
    this.playCrystalChime();
    return this.state.gems;
  }

  incrementStreak() {
    this.state.streak++;
    this.saveState();
  }

  unlockNode(nodeId) {
    if (!this.state.unlockedNodes.includes(nodeId)) {
      this.state.unlockedNodes.push(nodeId);
      this.addXP(50);
      this.addGems(15);
      this.playLevelUpFanfare();
      this.saveState();
    }
  }

  toggleBinAura() {
    this.state.binAuraActive = !this.state.binAuraActive;
    this.saveState();
    return this.state.binAuraActive;
  }

  toggleTheme() {
    this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
    this.saveState();
    this.applyTheme();
    return this.state.theme;
  }

  applyTheme() {
    const isLight = this.state.theme === 'light';
    const root = document.documentElement;
    const body = document.body;
    if (isLight) {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
      if (body) {
        body.classList.add('theme-light');
        body.classList.remove('theme-dark');
      }
    } else {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
      if (body) {
        body.classList.add('theme-dark');
        body.classList.remove('theme-light');
      }
    }
  }

  checkRankUp() {
    const xp = this.state.xp;
    if (xp >= 1000) {
      this.state.vikingTitle = 'Звання: Майстер Árnastofnun 👑';
    } else if (xp >= 600) {
      this.state.vikingTitle = 'Звання: Скальд / Оповідач (Skáld) 📜';
    } else if (xp >= 350) {
      this.state.vikingTitle = 'Звання: Вождь / Жрець (Goði) ⚡';
    } else if (xp >= 180) {
      this.state.vikingTitle = 'Звання: Справжній вікінг (Víkingur) 🛡️';
    } else {
      this.state.vikingTitle = 'Звання: Учень вікінгів (Víkinganemi) 🗡️';
    }
  }

  /**
   * Shimmering musical victory chime (Polyphonic acoustic bell arpeggio)
   * Replacing robotic synthesizer noises with pleasant game audio
   */
  playVictoryChime() {
    this.initAudio();
    if (!this.audioContext) return;

    try {
      // E major / Pentatonic chord frequencies: E5, G#5, B5, E6
      const chord = [659.25, 830.61, 987.77, 1318.51];
      const now = this.audioContext.currentTime;

      chord.forEach((freq, idx) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'triangle'; // Warm, bell-like tone
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.6);
      });
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  }

  /**
   * Sparkling gem crystal pickup sound
   */
  playCrystalChime() {
    this.initAudio();
    if (!this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      [1046.5, 1318.5, 1567.98].forEach((freq, i) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.06, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.35);
      });
    } catch (e) {}
  }

  /**
   * Pleasant gentle whoosh for flying flexion suffixes
   */
  playFlexionFlySound() {
    this.initAudio();
    if (!this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.28);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }

  /**
   * Soft WebAudio bell chime for item clicks in the Virtual Showcase
   */
  playBellChime() {
    this.initAudio();
    if (!this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      [1046.5, 1567.98].forEach((freq, idx) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04 / (idx + 1), now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now);
        osc.stop(now + 0.5);
      });
    } catch (e) {}
  }

  /**
   * Cashier POS terminal card tap sound (Dual-tone NFC confirmation)
   */
  playCardTapBeep() {
    this.initAudio();
    if (!this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      // Tone 1
      const osc1 = this.audioContext.createOscillator();
      const gain1 = this.audioContext.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1760, now);
      gain1.gain.setValueAtTime(0.06, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc1.connect(gain1);
      gain1.connect(this.audioContext.destination);
      osc1.start(now);
      osc1.stop(now + 0.08);

      // Tone 2 (higher confirmatory pitch)
      const osc2 = this.audioContext.createOscillator();
      const gain2 = this.audioContext.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(2637, now + 0.09);
      gain2.gain.setValueAtTime(0.08, now + 0.09);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc2.connect(gain2);
      gain2.connect(this.audioContext.destination);
      osc2.start(now + 0.09);
      osc2.stop(now + 0.28);
    } catch (e) {}
  }

  /**
   * Major fanfare for Milestone / Node unlocked
   */
  playLevelUpFanfare() {
    this.initAudio();
    if (!this.audioContext) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 - E5 - G5 - C6
      const now = this.audioContext.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.12 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.8);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.8);
      });
    } catch (e) {}
  }
}

export const gameState = new GameState();
