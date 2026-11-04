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
      "a",
      "a_morgnana_borda_eg_morgunmat",
      "a_virkum_dogum_vakna_eg_klukkan_half_sjo",
      "aevisaga",
      "afi",
      "bandarikin",
      "bandaríkin",
      "bat",
      "batt",
      "bilstjori",
      "bjor",
      "bjór",
      "blad",
      "blað",
      "bok",
      "bolli",
      "borda",
      "borða",
      "braud",
      "brauð",
      "bretland",
      "bu",
      "bud",
      "bát",
      "bátt",
      "bílstjóri",
      "bók",
      "bú",
      "búð",
      "dagur",
      "danska",
      "drottning",
      "eg",
      "eg_aetla_ad_fa_eina_samloku_og_eitt_kaffi",
      "eg_aetla_ad_fa_einn_snud_og_einn_bolla_af_kaffi_takk",
      "eg_er",
      "eg_er_ekki_laeknir",
      "eg_er_fra_bandarikjunum",
      "eg_er_fra_bretlandi",
      "eg_er_fra_frakklandi",
      "eg_er_fra_islandi",
      "eg_er_fra_noregi",
      "eg_er_fra_pollandi",
      "eg_er_fra_pollandi_en_thu_ert_thu_verkfraedingur",
      "eg_er_fra_spani",
      "eg_er_fra_svithjod",
      "eg_er_fra_thyskalandi",
      "eg_er_fra_ukrainu",
      "eg_er_fra_ukrainu_eg_by_i_reykjavik_nuna",
      "eg_er_laeknir_a_landspitalanum",
      "eg_er_nemi_i_islensku_vid_haskola_islands",
      "eg_er_verkfraedingur_eg_tala_ukrainsku_og_ensku_reiprennandi_og_svolitid_islensku",
      "eg_fer_a_faetur_og_drekk_kaffi",
      "eg_fer_ad_sofa_snemma",
      "eg_fer_i_vinnuna_klukkan_atta",
      "eg_heiti_anna",
      "eg_kem_heim_klukkan_fimm",
      "eg_tala_danska",
      "eg_tala_ekkert_spaensku",
      "eg_tala_enska",
      "eg_tala_ensku_reiprennandi",
      "eg_tala_franska",
      "eg_tala_islenska",
      "eg_tala_polska",
      "eg_tala_spaenska",
      "eg_tala_svolitid_islensku",
      "eg_tala_thyska",
      "eg_tala_ukrainska",
      "eg_vakna_klukkan_sjo",
      "eg_vakna_venjulega_klukkan_sjo_en_thu",
      "eg_vinn_sem_sendill_i_reykjavik",
      "eina_ponnukoku",
      "eina_pönnuköku",
      "eina_samloku",
      "einn_bjor",
      "einn_bjór",
      "einn_snud",
      "einn_snúð",
      "eitt_kaffi",
      "eitt_vatn",
      "ekkert",
      "ekki",
      "en_thu",
      "en_þú",
      "enska",
      "epli",
      "er",
      "ert",
      "fadir",
      "fara",
      "faðir",
      "finn",
      "fjall",
      "flaska",
      "forritari",
      "fra",
      "fra_bandarikjunum",
      "fra_bretlandi",
      "fra_frakklandi",
      "fra_islandi",
      "fra_noregi",
      "fra_pollandi",
      "fra_spani",
      "fra_svithjod",
      "fra_thyskalandi",
      "fra_ukrainu",
      "frabaert_velkomin_til_islands",
      "frakkland",
      "franska",
      "frá",
      "frá_bandaríkjunum",
      "frá_bretlandi",
      "frá_frakklandi",
      "frá_noregi",
      "frá_póllandi",
      "frá_spáni",
      "frá_svíþjóð",
      "frá_íslandi",
      "frá_úkraínu",
      "frá_þýskalandi",
      "frábært_velkomin_til_íslands",
      "fínn",
      "gaman_ad_kynnast_ther",
      "gaman_ad_kynnast_ther_talar_thu_islensku",
      "gaman_að_kynnast_þér",
      "gaman_að_kynnast_þér_talar_þú_íslensku",
      "gata",
      "gefa",
      "get_eg_fengid_reikninginn_takk",
      "get_ég_fengið_reikninginn_takk",
      "gjordu_svo_vel_verdi_ther_ad_godu",
      "gjörðu_svo_vel_verði_þér_að_góðu",
      "godan_daginn_eg_heiti_kateryna_kovalenko",
      "godan_daginn_hvad_heitir_thu",
      "godan_daginn_hvad_ma_bjoda_ther",
      "góðan_daginn_hvað_heitir_þú",
      "góðan_daginn_hvað_má_bjóða_þér",
      "góðan_daginn_ég_heiti_kateryna_kovalenko",
      "hadegi",
      "hae_eg_er_fra_ukrainu_fra_odesu_eg_er_kokkur",
      "hae_olena_hvadan_ert_thu",
      "hann_er",
      "hann_er_bilstjori_hja_straeto",
      "hann_er_bílstjóri_hjá_strætó",
      "hann_er_logfraedingur_hja_raduneytinu",
      "hann_er_lögfræðingur_hjá_ráðuneytinu",
      "hann_er_thjonn_a_kaffi_rurek",
      "hann_er_þjónn_á_kaffi_rúrek",
      "hann_talar_ekki_islensku",
      "hann_talar_ekki_íslensku",
      "hjukrunarfraedingur",
      "hjúkrunarfræðingur",
      "hun_er",
      "hun_er_kennari_i_grunnskola",
      "hus",
      "hvad",
      "hvad_ert_thu_ad_atvinnu",
      "hvad_heitir_thu",
      "hvada",
      "hvada_tungumal_talar_thu",
      "hvadan",
      "hvadan_ert_thu",
      "hvadan_ert_thu_kateryna",
      "hvað",
      "hvað_ert_þú_að_atvinnu",
      "hvað_heitir_þú",
      "hvaða",
      "hvaða_tungumál_talar_þú",
      "hvaðan",
      "hvaðan_ert_þú",
      "hvaðan_ert_þú_kateryna",
      "hvenaer_ferdu_i_vinnuna",
      "hvenaer_vaknar_thu_a_morgnana",
      "hvenær_ferðu_í_vinnuna",
      "hvenær_vaknar_þú_á_morgnana",
      "hver",
      "hver_ert_thu",
      "hver_ert_þú",
      "hádegi",
      "hæ_olena_hvaðan_ert_þú",
      "hæ_ég_er_frá_úkraínu_frá_odesu_ég_er_kokkur",
      "hún_er",
      "hún_er_kennari_í_grunnskóla",
      "hús",
      "i_dag_er_eg_ekki_heima",
      "i_hadeginu_borda_eg_supu",
      "is",
      "island",
      "islenska",
      "ja",
      "ja_eg_laeri_islensku_a_hverjum_degi_eg_tala_svolitid_nuna",
      "ja_takk_og_eitt_glas_af_vatni",
      "jon_er_smidur_og_byggir_hus",
      "já",
      "já_takk_og_eitt_glas_af_vatni",
      "já_ég_læri_íslensku_á_hverjum_degi_ég_tala_svolítið_núna",
      "jón_er_smiður_og_byggir_hús",
      "kaffi",
      "kaka",
      "kateryna_er_verkfraedingur_fra_ukrainu",
      "kateryna_er_verkfræðingur_frá_úkraínu",
      "keflavik",
      "keflavík",
      "kennari",
      "klukka",
      "klukkan_atta_fer_eg_i_vinnuna",
      "klukkan_sjo_vakna_eg",
      "klukkan_sjö_vakna_ég",
      "klukkan_átta_fer_ég_í_vinnuna",
      "kokkur",
      "koma",
      "kvold",
      "kvöld",
      "laeknir",
      "land",
      "lax",
      "logfraedingur",
      "læknir",
      "lögfræðingur",
      "madur",
      "maria_er_hjukrunarfraedingur_a_bradamottoku",
      "maría_er_hjúkrunarfræðingur_á_bráðamóttöku",
      "matur",
      "maður",
      "mjolk",
      "mjólk",
      "morgunn",
      "nafn",
      "nei_eg_er_ekki_verkfraedingur_eg_er_lika_forritari",
      "nei_klukkan_fimm_fer_eg_heim_og_elda_kvoldmat",
      "nei_klukkan_fimm_fer_ég_heim_og_elda_kvöldmat",
      "nei_ég_er_ekki_verkfræðingur_ég_er_líka_forritari",
      "nemandi",
      "nemi",
      "noregur",
      "nott",
      "nótt",
      "okeypis",
      "old",
      "olena_er_kokkur_a_sjavarrettastad",
      "olena_er_kokkur_á_sjávarréttastað",
      "ord",
      "orð",
      "ostur",
      "paweł_er_forritari_hja_hugbunadarfyrirtaeki",
      "paweł_er_forritari_hjá_hugbúnaðarfyrirtæki",
      "penni",
      "polland",
      "polska",
      "ponnukaka",
      "ponnukoku",
      "pólland",
      "pólska",
      "pönnukaka",
      "pönnuköku",
      "reikningur",
      "reiprennandi",
      "rigning",
      "sael",
      "saelar_stelpur_thetta_er_vinkona_min_olena",
      "saell",
      "saell_ert_thu_nyi_forritarinn",
      "saell_ja_eg_heiti_paweł_gaman_ad_hitta_thig",
      "saga",
      "samloka",
      "samloku",
      "seint",
      "sendill",
      "sjukralidi",
      "sjúkraliði",
      "skinka",
      "smidur",
      "smiður",
      "snemma",
      "snud",
      "snudur",
      "snúð",
      "snúður",
      "sofa",
      "sol",
      "somuleidis",
      "somuleidis_hvadan_ert_thu",
      "spaenska",
      "spann",
      "spánn",
      "spænska",
      "steinn",
      "stopp",
      "student",
      "stúdent",
      "supa",
      "svithjod",
      "svolitid",
      "svolítið",
      "svíþjóð",
      "sæl",
      "sælar_stelpur_þetta_er_vinkona_mín_olena",
      "sæll",
      "sæll_ert_þú_nýi_forritarinn",
      "sæll_já_ég_heiti_paweł_gaman_að_hitta_þig",
      "sól",
      "sömuleiðis",
      "sömuleiðis_hvaðan_ert_þú",
      "súpa",
      "taka",
      "takk",
      "te",
      "thad_er",
      "thaer_eru",
      "thak",
      "thau_eru",
      "their_eru",
      "thid_erud",
      "thjonn",
      "thu_ert",
      "thyska",
      "thyskaland",
      "tolvunarfraedingur",
      "tölvunarfræðingur",
      "ukraina",
      "ukrainska",
      "um_kvoldid_les_eg_bok",
      "um_kvöldið_les_ég_bók",
      "ungur",
      "ur",
      "vakna",
      "vatn",
      "verkfraedingur",
      "verkfræðingur",
      "vid_erum",
      "viltu_mjolk_ut_i_kaffid",
      "viltu_mjólk_út_í_kaffið",
      "vinna",
      "vinnur_thu_lengi_a_kvoldin",
      "vinnur_þú_lengi_á_kvöldin",
      "við_erum",
      "yfir",
      "yta",
      "á",
      "á_morgnana_borða_ég_morgunmat",
      "á_virkum_dögum_vakna_ég_klukkan_hálf_sjö",
      "ævisaga",
      "ég",
      "ég_er",
      "ég_er_ekki_læknir",
      "ég_er_frá_bandaríkjunum",
      "ég_er_frá_bretlandi",
      "ég_er_frá_frakklandi",
      "ég_er_frá_noregi",
      "ég_er_frá_póllandi",
      "ég_er_frá_póllandi_en_þú_ert_þú_verkfræðingur",
      "ég_er_frá_spáni",
      "ég_er_frá_svíþjóð",
      "ég_er_frá_íslandi",
      "ég_er_frá_úkraínu",
      "ég_er_frá_úkraínu_ég_bý_í_reykjavík_núna",
      "ég_er_frá_þýskalandi",
      "ég_er_læknir_á_landspítalanum",
      "ég_er_nemi_í_íslensku_við_háskóla_íslands",
      "ég_er_verkfræðingur_ég_tala_úkraínsku_og_ensku_reiprennandi_og_svolítið_íslensku",
      "ég_fer_að_sofa_snemma",
      "ég_fer_á_fætur_og_drekk_kaffi",
      "ég_fer_í_vinnuna_klukkan_átta",
      "ég_heiti_anna",
      "ég_kem_heim_klukkan_fimm",
      "ég_tala_danska",
      "ég_tala_ekkert_spænsku",
      "ég_tala_enska",
      "ég_tala_ensku_reiprennandi",
      "ég_tala_franska",
      "ég_tala_pólska",
      "ég_tala_spænska",
      "ég_tala_svolítið_íslensku",
      "ég_tala_íslenska",
      "ég_tala_úkraínska",
      "ég_tala_þýska",
      "ég_vakna_klukkan_sjö",
      "ég_vakna_venjulega_klukkan_sjö_en_þú",
      "ég_vinn_sem_sendill_í_reykjavík",
      "ég_ætla_að_fá_eina_samloku_og_eitt_kaffi",
      "ég_ætla_að_fá_einn_snúð_og_einn_bolla_af_kaffi_takk",
      "í_dag_er_ég_ekki_heima",
      "í_hádeginu_borða_ég_súpu",
      "ís",
      "ísland",
      "íslenska",
      "ókeypis",
      "öld",
      "úkraína",
      "úkraínska",
      "úr",
      "ýta",
      "þak",
      "þau_eru",
      "það_er",
      "þeir_eru",
      "þið_eruð",
      "þjónn",
      "þær_eru",
      "þú_ert",
      "þýska",
      "þýskaland"
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
  resolveWordUrl(rawKey) {
    if (!rawKey) return null;
    const key = String(rawKey).trim();
    if (!key) return null;

    if (key.endsWith('.mp3') || key.endsWith('.wav') || key.endsWith('.ogg') || key.endsWith('.m4a') ||
        key.includes('/dialogue/') || key.includes('/words/') ||
        key.startsWith('./audio/') || key.startsWith('audio/')) {
      return key.startsWith('audio/') ? `./${key}` : key;
    }

    if (key === 'a' || key === 'á' || key === 'Á') {
      return './audio/words/á.mp3';
    }

    const san = key.toLowerCase()
      .replace(/[?!.,;:\"'\(\)]/g, '')
      .replace(/\//g, '_')
      .trim()
      .replace(/\s+/g, '_');

    if (this.wordAudioSet.has(san)) {
      return `./audio/words/${san}.mp3`;
    }

    const asciiTrans = san
      .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ý/g, 'y')
      .replace(/ð/g, 'd').replace(/þ/g, 'th').replace(/æ/g, 'ae').replace(/ö/g, 'o');
    if (this.wordAudioSet.has(asciiTrans)) {
      return `./audio/words/${asciiTrans}.mp3`;
    }

    return this.resolveUrl(rawKey);
  }

  playWord(key, element = null, rate = 0.85, ipa = null) {
    if (!key) return;
    const url = this.resolveWordUrl(key);
    if (url) {
      return this.play(url, element, rate, ipa);
    }
    return this.play(key, element, rate, ipa);
  }

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

    // 2. Sanitize multi-character word / phrase to match local studio MP3 bank FIRST
    const san = key.toLowerCase()
      .replace(/[?!.,;:\"'\(\)]/g, '')
      .replace(/\//g, '_')
      .trim()
      .replace(/\s+/g, '_');

    if (key.length > 1 && this.wordAudioSet.has(san)) {
      return `./audio/words/${san}.mp3`;
    }

    const asciiTrans = san
      .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ý/g, 'y')
      .replace(/ð/g, 'd').replace(/þ/g, 'th').replace(/æ/g, 'ae').replace(/ö/g, 'o');
    if (key.length > 1 && this.wordAudioSet.has(asciiTrans)) {
      return `./audio/words/${asciiTrans}.mp3`;
    }

    // 3. Exact Icelandic letter uppercase match
    const upper = key.toUpperCase();
    if (this.nativeAudioBank[upper]) {
      return this.nativeAudioBank[upper];
    }

    // 4. Multi-character letter token (e.g. "A a", "I i / Y y", "Á á", "Ypsilon")
    const firstToken = key.split(/[\s/]+/)[0].toUpperCase();
    if (this.nativeAudioBank[firstToken]) {
      return this.nativeAudioBank[firstToken];
    }
    if (firstToken === 'YPSILON' || firstToken === 'UFSILON') {
      return (key.includes('ý') || key.includes('Ý') || key.toLowerCase().includes('broddi')) ? this.nativeAudioBank['Ý'] : this.nativeAudioBank['Y'];
    }

    if (this.wordAudioSet.has(san)) {
      return `./audio/words/${san}.mp3`;
    }
    if (this.wordAudioSet.has(asciiTrans)) {
      return `./audio/words/${asciiTrans}.mp3`;
    }

    // 5. Fallback: null triggers Web Speech API or visual IPA pill without Chrome ORB error
    return null;
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
