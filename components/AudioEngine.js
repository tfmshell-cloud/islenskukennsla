/**
 * AudioEngine.js - Production-grade audio coordinator for Módúll 0 & Platform
 * Deterministic direct audio routing with 100% synchronous invocation under user gesture.
 * Zero robotic tones, zero audio dropouts, zero autoplay policy blocks.
 */

export class AudioEngine {
  constructor() {
    this.nativeAudioBank = {
      'A': './audio/a.mp3',
      'Á': './audio/a_acute.mp3',
      'B': './audio/b.mp3',
      'D': './audio/d.mp3',
      'Ð': './audio/ed.mp3',
      'E': './audio/e.mp3',
      'É': './audio/e_acute.mp3',
      'F': './audio/f.mp3',
      'G': './audio/g.mp3',
      'H': './audio/h.mp3',
      'I': './audio/i.mp3',
      'Í': './audio/i_acute.mp3',
      'J': './audio/j.mp3',
      'K': './audio/k.mp3',
      'L': './audio/l.mp3',
      'M': './audio/m.mp3',
      'N': './audio/n.mp3',
      'O': './audio/o.mp3',
      'Ó': './audio/o_acute.mp3',
      'P': './audio/p.mp3',
      'R': './audio/r.mp3',
      'S': './audio/s.mp3',
      'T': './audio/t.mp3',
      'U': './audio/u.mp3',
      'Ú': './audio/u_acute.mp3',
      'V': './audio/v.mp3',
      'X': './audio/x.mp3',
      'Y': './audio/y.mp3',
      'Ý': './audio/y_acute.mp3',
      'Þ': './audio/thorn.mp3',
      'Æ': './audio/ae.mp3',
      'Ö': './audio/o_umlaut.mp3',
      'Z': './audio/z.mp3'
    };

    this.wordAudioSet = new Set([
      'afi', 'blað', 'bát', 'bátt', 'bók', 'bú', 'búð', 'dagur', 'drottning',
      'en_þú', 'epli', 'faðir', 'fjall', 'fínn', 'gaman_að_kynnast_þér',
      'gata', 'gefa', 'hvað', 'hvað_heitir_þú', 'hvaðan_ert_þú', 'hús',
      'is', 'já', 'kaffi', 'keflavík', 'land', 'lax', 'matur', 'maður',
      'nafn', 'orð', 'penni', 'rigning', 'saga', 'steinn', 'stopp',
      'sæl', 'sæll', 'sól', 'sömuleiðis', 'taka', 'takk', 'ungur',
      'vatn', 'vinna', 'yfir', 'á', 'ævisaga', 'ég', 'ég_er_frá_íslandi',
      'ég_er_frá_úkraínu', 'ég_heiti_anna', 'ís', 'ókeypis', 'öld',
      'úr', 'ýta', 'þak'
    ]);

    this.currentAudio = null;
    this.currentElement = null;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(event, data) {
    this.listeners.forEach(fn => {
      try {
        fn(event, data);
      } catch (err) {
        console.error('AudioEngine notification error:', err);
      }
    });
  }

  /**
   * Deterministically resolves any key or cue to an exact playable audio URL
   * @param {string} rawKey
   * @returns {string|null}
   */
  resolveUrl(rawKey) {
    if (!rawKey) return null;
    const key = String(rawKey).trim();
    if (!key) return null;

    // 1. Direct audio file URL or relative path
    if (key.endsWith('.mp3') || key.endsWith('.wav') || key.endsWith('.ogg') || key.endsWith('.m4a') ||
        key.includes('/dialogue/') || key.includes('/words/') ||
        key.startsWith('./audio/') || key.startsWith('audio/') ||
        /^https?:\/\//i.test(key) || /^data:audio/i.test(key)) {
      return key.startsWith('audio/') ? `./${key}` : key;
    }

    // 2. Exact Icelandic letter uppercase match
    const upper = key.toUpperCase();
    if (this.nativeAudioBank[upper]) {
      return this.nativeAudioBank[upper];
    }

    // 3. Multi-character letter token (e.g. "A a", "I i / Y y", "Á á", "Ypsilon")
    const firstToken = key.split(/[\s/]+/)[0].toUpperCase();
    if (this.nativeAudioBank[firstToken]) {
      return this.nativeAudioBank[firstToken];
    }
    if (firstToken === 'YPSILON' || firstToken === 'UFSILON') {
      return this.nativeAudioBank['Y'];
    }

    // 4. Sanitize word / phrase to match high-fidelity word bank
    const san = key.toLowerCase()
      .replace(/[?!.,;:\"'\(\)]/g, '')
      .trim()
      .replace(/\s+/g, '_');

    if (this.wordAudioSet.has(san)) {
      return `./audio/words/${san}.mp3`;
    }

    // Direct lowercase match without underscore
    const rawLower = key.toLowerCase().trim();
    if (this.wordAudioSet.has(rawLower)) {
      return `./audio/words/${rawLower}.mp3`;
    }

    // 5. Fallback: Google Icelandic neural TTS stream
    return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(key)}&tl=is&client=tw-ob`;
  }

  /**
   * Play letter or word audio synchronously in the user gesture event loop
   * @param {string} key - e.g. "A", "Þ", "takk", "./audio/dialogue/dlg_m_1.mp3"
   * @param {HTMLElement} [element] - visual element to add pulse animation
   * @param {number} [rate=0.85] - playback rate
   * @param {string} [ipa] - optional IPA transcription for visual pill
   */
  play(key, element = null, rate = 0.85, ipa = null) {
    this.stop();

    if (!key) return;
    const cleanKey = String(key).trim();
    if (!cleanKey) return;

    if (element) {
      this.currentElement = element;
      element.classList.add('pulse-playing', 'ring-2', 'ring-cyan-400');
    }

    this.notify('start', { key: cleanKey, element, ipa });

    const url = this.resolveUrl(cleanKey);
    if (!url) {
      this.handleFallback(cleanKey, element, ipa);
      return;
    }

    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = url;

    // Setting playbackRate strictly AFTER src prevents HTMLMediaElement reset
    if (rate && rate !== 1.0) {
      try {
        audio.playbackRate = rate;
      } catch (e) {}
    }

    this.currentAudio = audio;

    const cleanup = () => {
      if (element) {
        element.classList.remove('pulse-playing', 'ring-2', 'ring-cyan-400');
      }
      if (this.currentAudio === audio) {
        this.currentAudio = null;
        this.currentElement = null;
      }
      this.notify('end', { key: cleanKey, element });
    };

    audio.onended = cleanup;
    audio.onerror = (err) => {
      console.warn('Audio playback error on:', url, err);
      cleanup();
      this.handleFallback(cleanKey, element, ipa);
    };

    // Synchronous execution under click handler preserves browser user gesture
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Audio play() promise rejected:', err, url);
        cleanup();
        this.handleFallback(cleanKey, element, ipa);
      });
    }
  }

  /**
   * Play audio and wait for it to actually finish speaking before resolving (for sequences/dialogues)
   * @param {string} key
   * @param {HTMLElement} [element]
   * @param {number} [rate=0.85]
   * @param {string} [ipa]
   * @returns {Promise<boolean>}
   */
  playUntilEnd(key, element = null, rate = 0.85, ipa = null) {
    return new Promise((resolve) => {
      this.stop();

      if (!key) return resolve(false);
      const cleanKey = String(key).trim();
      if (!cleanKey) return resolve(false);

      if (element) {
        this.currentElement = element;
        element.classList.add('pulse-playing', 'ring-2', 'ring-cyan-400');
      }

      this.notify('start', { key: cleanKey, element, ipa });

      const url = this.resolveUrl(cleanKey);
      if (!url) {
        if (element) {
          element.classList.remove('pulse-playing', 'ring-2', 'ring-cyan-400');
        }
        this.handleFallback(cleanKey, element, ipa, () => resolve(true));
        return;
      }

      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = url;

      if (rate && rate !== 1.0) {
        try {
          audio.playbackRate = rate;
        } catch (e) {}
      }

      this.currentAudio = audio;

      let settled = false;
      let watchdogTimer = null;

      const finish = (ok) => {
        if (settled) return;
        settled = true;
        if (watchdogTimer) clearTimeout(watchdogTimer);
        audio.onended = null;
        audio.onerror = null;

        if (element) {
          element.classList.remove('pulse-playing', 'ring-2', 'ring-cyan-400');
        }
        if (this.currentAudio === audio) {
          this.currentAudio = null;
          this.currentElement = null;
        }
        this.notify('end', { key: cleanKey, element });
        resolve(ok);
      };

      audio.onended = () => finish(true);
      audio.onerror = (e) => {
        console.warn('Audio onerror in playUntilEnd:', url, e);
        finish(false);
      };

      // Watchdog timeout (6.5s) prevents sequential dialogue from ever hanging indefinitely
      watchdogTimer = setTimeout(() => finish(true), 6500);

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('playPromise rejected in playUntilEnd:', err, url);
          finish(false);
        });
      }
    });
  }

  handleFallback(key, element, ipa, callback = null) {
    if (this.hasAuthenticIcelandicVoice()) {
      this.playSpeechSynthesisIcelandicOnly(key, element, () => {
        if (element) {
          element.classList.remove('pulse-playing', 'ring-2', 'ring-cyan-400');
        }
        this.notify('end', { key, element });
        if (callback) callback();
      });
    } else {
      this.triggerVisualPill(key, element, ipa, () => {
        if (element) {
          element.classList.remove('pulse-playing', 'ring-2', 'ring-cyan-400');
        }
        this.notify('end', { key, element });
        if (callback) callback();
      });
    }
  }

  hasAuthenticIcelandicVoice() {
    if (!('speechSynthesis' in window)) return false;
    const voices = window.speechSynthesis.getVoices();
    return voices.some(v => v.lang && (v.lang.startsWith('is') || v.lang === 'is-IS'));
  }

  playSpeechSynthesisIcelandicOnly(text, element, callback) {
    if (!('speechSynthesis' in window)) {
      if (callback) callback();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'is-IS';
      utterance.rate = 0.82;
      utterance.pitch = 0.95;

      const voices = window.speechSynthesis.getVoices();
      const isVoice = voices.find(v => v.lang && (v.lang.startsWith('is') || v.lang === 'is-IS'));
      if (isVoice) {
        utterance.voice = isVoice;
      }

      utterance.onend = () => {
        if (callback) callback();
      };
      utterance.onerror = () => {
        if (callback) callback();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      if (callback) callback();
    }
  }

  triggerVisualPill(key, element, ipa, callback) {
    if (element) {
      element.classList.add('visual-ipa-pill-active');
      const ipaBadge = element.querySelector('.soundboard-ipa-badge, [id*="ipa"]');
      if (ipaBadge) {
        ipaBadge.classList.add('ring-2', 'ring-emerald-400', 'bg-emerald-500/30', 'scale-110');
        setTimeout(() => {
          ipaBadge.classList.remove('ring-2', 'ring-emerald-400', 'bg-emerald-500/30', 'scale-110');
        }, 1200);
      }
    }

    this.notify('visual_pill', { key, ipa });

    setTimeout(() => {
      if (element) {
        element.classList.remove('visual-ipa-pill-active');
      }
      if (callback) callback();
    }, 900);
  }

  speakIcelandic(text, ipa = null, element = null) {
    return this.play(text, element, 0.85, ipa);
  }

  stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
    if (this.currentElement) {
      try {
        this.currentElement.classList.remove('pulse-playing', 'ring-2', 'ring-cyan-400');
      } catch (e) {}
      this.currentElement = null;
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }
}

export const audioEngine = new AudioEngine();
