/**
 * VocabHubK1.js - Expanded Vocabulary & Mnemonics Hub for Kafli 1 (Íslenska fyrir alla 1 Standard)
 * Categories:
 * - Professions [12]
 * - Countries & Nationalities [10]
 * - Languages [8] + Proficiency Adverbs [3]
 * - Cities & Locations (í vs á + ÞGF 🟡) [10]
 * - Core Verbs, Age & Marital Status [12]
 * Total: 55 interactive 3D flipping cards with studio MP3 audio
 */

import { audioEngine } from './AudioEngine.js?v=7.1';

const CITIES_AND_LOCATIONS_K1 = [
  {
    id: 1,
    title: 'Reykjavík',
    sub: 'í Reykjavík (ÞGF 🟡)',
    ipa: '[ˈreiːcaˌviːk]',
    trans: 'Рейк’явік (столиця)',
    mnemonic: '🏙️ Буквально «Димна затока» (vík = затока). З усіма затоками та долинами вживається прийменник «í»: Ég bý í Reykjavík!',
    sentence: 'Ég bý í Reykjavík.',
    icon: '🏙️',
    audioText: 'Ég bý í Reykjavík.'
  },
  {
    id: 2,
    title: 'Akureyri',
    sub: 'á Akureyri (ÞGF 🟡)',
    ipa: '[ˈaːkʏrˌeirɪ]',
    trans: 'Акурейрі (столиця Півночі)',
    mnemonic: '🏔️ Корінь -eyri означає «піщана коса / мис». З усіма косами та мисами в ісландській мові ЗАВЖДИ вживається «á»: Hún býr á Akureyri!',
    sentence: 'Hún býr á Akureyri.',
    icon: '🏔️',
    audioText: 'Hún býr á Akureyri.'
  },
  {
    id: 3,
    title: 'Kópavogur',
    sub: 'í Kópavogi (ÞGF 🟡)',
    ipa: '[ˈkʰouːpaˌvɔːɣʏr]',
    trans: 'Коупавогюр (2-ге місто)',
    mnemonic: '🦭 Буквально «Затока тюленяти» (vogur = бухта/затока). Закінчення -ur у Давальному відмінку переходить в -i: í Kópavogi!',
    sentence: 'Ég bý í Kópavogi.',
    icon: '🦭',
    audioText: 'Ég bý í Kópavogi.'
  },
  {
    id: 4,
    title: 'Hafnarfjörður',
    sub: 'í Hafnarfirði (ÞGF 🟡)',
    ipa: '[ˈhapnarˌfjœrðʏr]',
    trans: 'Габнарфйордюр (місто ельфів)',
    mnemonic: '⚓ Буквально «Гавань-фіорд». Слово fjörður у Давальному відмінку змінюється на firði (з прийменником í): í Hafnarfirði!',
    sentence: 'Ég bý í Hafnarfirði.',
    icon: '⚓',
    audioText: 'Ég bý í Hafnarfirði.'
  },
  {
    id: 5,
    title: 'Selfoss',
    sub: 'á Selfossi (ÞGF 🟡)',
    ipa: '[ˈsɛlfɔsː]',
    trans: 'Сельфосс (Південна Ісландія)',
    mnemonic: '🌊 Поселення біля порогів/водоспадів (-foss) вживаються з прийменником «á» + закінчення -i: Hann býr á Selfossi!',
    sentence: 'Hann býr á Selfossi.',
    icon: '🌊',
    audioText: 'Hann býr á Selfossi.'
  },
  {
    id: 6,
    title: 'Ísafjörður',
    sub: 'á Ísafirði (ÞGF 🟡)',
    ipa: '[ˈiːsaˌfjœrðʏr]',
    trans: 'Ісафйордюр (Західні фіорди)',
    mnemonic: '❄️ Хоча в назві є -fjörður, історично місто розташоване на піщаній косі (eyri), тому ісландці кажуть: á Ísafirði!',
    sentence: 'Ég bý á Ísafirði.',
    icon: '❄️',
    audioText: 'Ég bý á Ísafirði.'
  },
  {
    id: 7,
    title: 'Akranes',
    sub: 'á Akranesi (ÞGF 🟡)',
    ipa: '[ˈaːkraˌnɛːs]',
    trans: 'Акранес (місто на мисі)',
    mnemonic: '半岛 Корінь -nes означає «мис / півострів». Усі міста на -nes (Akranes, Seltjarnarnes) завжди вживаються з «á»: á Akranesi!',
    sentence: 'Ég bý á Akranesi.',
    icon: '🗺️',
    audioText: 'Ég bý á Akranesi.'
  },
  {
    id: 8,
    title: 'heimilisfang',
    sub: 'Hvorugkyn (hk.)',
    ipa: '[ˈheiːmɪlɪsˌfaunk]',
    trans: 'домашня адреса',
    mnemonic: '🏠 heimili (дім) + fang (місце). Стандартне поле анкети в Íslenska fyrir alla 1: «Hvað er heimilisfangið þitt?».',
    sentence: 'Ég á heima á Laugavegi 12.',
    icon: '🏠',
    audioText: 'Ég á heima á Laugavegi 12.'
  },
  {
    id: 9,
    title: 'símanúmer',
    sub: 'Hvorugkyn (hk.)',
    ipa: '[ˈsiːmaˌnuːmɛr]',
    trans: 'номер телефону',
    mnemonic: '📱 sími (телефон, первісно «нитка/дріт») + númer. Питання: «Hvað er símanúmerið þitt?».',
    sentence: 'Hvað er símanúmerið þitt?',
    icon: '📱',
    audioText: 'Hvað er símanúmerið þitt?'
  },
  {
    id: 10,
    title: 'kennitala',
    sub: 'Kvenkyn (kvk.)',
    ipa: '[ˈcʰɛnːɪˌtʰaːla]',
    trans: 'ідентифікаційний код (10 цифр)',
    mnemonic: '🪪 Головний документ кожного мешканця Ісландії (ДДММРР-XXXX): kenni (розпізнавальний) + tala (число).',
    sentence: 'Hvað er kennitalan þín?',
    icon: '🪪',
    audioText: 'Hvað er kennitalan þín?'
  }
];

const VERBS_AGE_FAMILY_K1 = [
  {
    id: 1,
    title: 'að vera (er / ert / erum)',
    sub: 'Дієслово-зв’язка',
    ipa: '[að ˈvɛːra]',
    trans: 'бути (є)',
    mnemonic: '👑 Головне дієслово мови: ég er, þú ert, hann/hún/það er, við erum, þið eruð, þeir/þær/þau eru.',
    sentence: 'Ég er frá Úkraínu.',
    icon: '👑',
    audioText: 'Ég er frá Úkraínu.'
  },
  {
    id: 2,
    title: 'að heita (heiti / heitir)',
    sub: 'Дієслово (-i)',
    ipa: '[að ˈheiːta]',
    trans: 'зватися / називатися',
    mnemonic: '🏷️ Ég heiti (мене звати), þú heitir (тебе звати), hann/hún heitir (його/її звати).',
    sentence: 'Hvað heitir þú?',
    icon: '🏷️',
    audioText: 'Hvað heitir þú?'
  },
  {
    id: 3,
    title: 'að búa (bý / býrð / býr)',
    sub: 'Сильне дієслово',
    ipa: '[að ˈpuːa]',
    trans: 'жити / мешкати',
    mnemonic: '🏡 В однині ú переходить в ý [iː]: ég bý, þú býrð, hann býr. У множині: við búum!',
    sentence: 'Hvar býrð þú?',
    icon: '🏡',
    audioText: 'Hvar býrð þú?'
  },
  {
    id: 4,
    title: 'að tala (tala / talar / tölum)',
    sub: 'Дієслово (-a)',
    ipa: '[að ˈtʰaːla]',
    trans: 'говорити / розмовляти',
    mnemonic: '🗣️ Клас -a: ég tala, þú talar, але у 1 ос. множини U-умляут a ➔ ö: við tölum!',
    sentence: 'Við tölum íslensku.',
    icon: '🗣️',
    audioText: 'Við tölum íslensku.'
  },
  {
    id: 5,
    title: 'að læra (læri / lærir)',
    sub: 'Дієслово (-i)',
    ipa: '[að ˈlaiːra]',
    trans: 'вчити / вивчати',
    mnemonic: '📖 Клас -i: ég læri, þú lærir, við lærum. Керує Знахідним відмінком (Þolfall 🟢): Ég læri íslensku.',
    sentence: 'Ég læri íslensku.',
    icon: '📖',
    audioText: 'Ég læri íslensku.'
  },
  {
    id: 6,
    title: 'að vinna (vinn / vinnur)',
    sub: 'Дієслово (-ur)',
    ipa: '[að ˈvɪnːa]',
    trans: 'працювати',
    mnemonic: '⚒️ Клас на приголосний: ég vinn (нульове закінчення!), þú vinnur, hann vinnur, við vinnum.',
    sentence: 'Hvar vinnurðu?',
    icon: '⚒️',
    audioText: 'Hvar vinnurðu?'
  },
  {
    id: 7,
    title: 'gamall (kk.) / gömul (kvk.)',
    sub: 'Прикметник віку',
    ipa: '[ˈkaːmatl̥ / ˈkœːmʏl]',
    trans: 'старий (віком)',
    mnemonic: '🎂 До чоловіка: «Hvað ertu gamall?» [kaːmatl̥], до жінки (U-умляут): «Hvað ertu gömul?» [kœːmʏl].',
    sentence: 'Hvað ertu gamall?',
    icon: '🎂',
    audioText: 'Hvað ertu gamall?'
  },
  {
    id: 8,
    title: 'giftur (kk.) / gift (kvk.)',
    sub: 'Сімейний стан',
    ipa: '[ˈcɪftʏr / cɪft]',
    trans: 'одружений / заміжня',
    mnemonic: '💍 Чоловік каже: «Ég er giftur», жінка каже (без закінчення -ur!): «Ég er gift».',
    sentence: 'Ég er giftur.',
    icon: '💍',
    audioText: 'Ég er giftur.'
  },
  {
    id: 9,
    title: 'einhleypur (kk.) / einhleyp (kvk.)',
    sub: 'Сімейний стан',
    ipa: '[ˈeinˌl̥eiːpʏr]',
    trans: 'неодружений / незаміжня (вільний)',
    mnemonic: '🦅 Буквально «той, що біжить сам» (einn + hlaupa). До жінки — без -ur: Hún er einhleyp.',
    sentence: 'Hún er einhleyp.',
    icon: '🦅',
    audioText: 'Hún er einhleyp.'
  },
  {
    id: 10,
    title: 'í sambúð',
    sub: 'Сімейний стан',
    ipa: '[iː ˈsamˌpuːð]',
    trans: 'у цивільному шлюбі (живуть разом)',
    mnemonic: '👩‍❤️‍👨 Дуже поширена в Ісландії офіційна форма партнерства: sam (разом) + búð (проживання).',
    sentence: 'Við erum í sambúð.',
    icon: '👩‍❤️‍👨',
    audioText: 'Við erum í sambúð.'
  },
  {
    id: 11,
    title: 'þeir / þær / þau',
    sub: 'Займенники 3 ос. мн.',
    ipa: '[θeiːr / θaiːr / θœyː]',
    trans: 'вони (чол. / жін. / зміш.)',
    mnemonic: '👥 þeir = тільки чоловіки; þær = тільки жінки; þau = чоловік + жінка разом!',
    sentence: 'Þau búa í Reykjavík.',
    icon: '👥',
    audioText: 'Þau búa í Reykjavík.'
  },
  {
    id: 12,
    title: 'tuttugu og fimm ára',
    sub: 'Конструкція віку',
    ipa: '[ˈtʰʏhtʏɣʏ ɔɣ fɪmː ˈauːra]',
    trans: '25 років (досл. «двадцяти і п’яти років»)',
    mnemonic: '🔢 Слово ára стоїть у Родовому відмінку множини (Eignarfall 🔴) після числа.',
    sentence: 'Ég er tuttugu og fimm ára.',
    icon: '🔢',
    audioText: 'Ég er tuttugu og fimm ára.'
  }
];

export class VocabHubK1 {
  constructor(container, countriesData, professionsData, languagesData) {
    this.container = container;
    this.countries = countriesData;
    this.professions = professionsData;
    this.languages = languagesData;
    this.currentFilter = 'all'; // 'all', 'professions', 'countries', 'cities', 'verbs_family', 'languages'
    this.selectedItem = null;
    this.flippedCards = new Set();
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Filter Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-cyber-border/30">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Урок 1 • Повний словник (Íslenska fyrir alla 1)
            </span>
            <h3 class="text-sm sm:text-base font-black text-white font-mono">
              📚 55 інтерактивних карток: Професії, Країни, Міста (í/á), Дієслова, Вік і Мови
            </h3>
          </div>

          <!-- Compact Filter Pills -->
          <div class="flex items-center gap-1 flex-wrap text-xs font-mono">
            <button data-filter="all" class="vocab-filter-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.currentFilter === 'all' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Усі (55)
            </button>
            <button data-filter="professions" class="vocab-filter-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.currentFilter === 'professions' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Професії [12]
            </button>
            <button data-filter="countries" class="vocab-filter-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.currentFilter === 'countries' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Країни [10]
            </button>
            <button data-filter="cities" class="vocab-filter-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.currentFilter === 'cities' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Міста (í vs á) [10]
            </button>
            <button data-filter="verbs_family" class="vocab-filter-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.currentFilter === 'verbs_family' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Дієслова & Сім'я [12]
            </button>
            <button data-filter="languages" class="vocab-filter-btn px-2.5 py-1 rounded-lg font-bold transition-all ${this.currentFilter === 'languages' ? 'bg-cyan-500 text-black shadow-sm' : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'}">
              Мови [11]
            </button>
          </div>
        </div>

        <!-- Vocab Cards Grid (Compact 3D Flipping Cards) -->
        <div id="vocab-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          <!-- Populated dynamically -->
        </div>

        <!-- Selected Vocab Detail Drawer (Compact) -->
        <div id="vocab-detail-drawer" class="p-3.5 rounded-xl bg-cyber-deep/95 border border-amber-500/30 shadow-md">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3">
              <span id="detail-icon" class="text-2xl">💡</span>
              <div class="space-y-0.5">
                <div class="flex items-center gap-2">
                  <strong id="detail-title" class="text-sm font-bold font-mono text-white">Læknir</strong>
                  <span id="detail-ipa" class="font-mono text-cyan-300 text-[11px]">[ˈlaiːknɪr]</span>
                  <span id="detail-gender" class="text-[10px] text-slate-400 font-mono">(kk.)</span>
                </div>
                <div id="detail-trans" class="text-amber-200 font-sans">лікар</div>
                <div id="detail-mnemonic" class="text-[11px] text-slate-300 font-sans max-w-2xl line-clamp-2">
                  🩺 Лікар, що дає ліки: сполучення kn містить гортанну мікропаузу [hkn]!
                </div>
              </div>
            </div>
            <button id="detail-speak-btn" class="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs flex items-center gap-1.5 self-start sm:self-auto transition-all active:scale-95 shadow-sm">
              <span>🔊 Озвучити зразок</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.renderCards();
    this.bindEvents();
  }

  renderCards() {
    const grid = this.container.querySelector('#vocab-grid');
    if (!grid) return;

    let items = [];

    if (this.currentFilter === 'all' || this.currentFilter === 'professions') {
      items.push(...this.professions.map(p => ({
        type: 'profession',
        id: `prof_${p.id}`,
        title: p.term,
        sub: p.gender === 'kk' ? 'чол. рід' : 'жін. рід',
        ipa: p.ipa,
        trans: p.translation,
        mnemonic: p.mnemonic_hook,
        sentence: p.example_sentence,
        icon: '💼',
        audioText: p.term
      })));
    }

    if (this.currentFilter === 'all' || this.currentFilter === 'countries') {
      items.push(...this.countries.map(c => ({
        type: 'country',
        id: `country_${c.id}`,
        title: c.country,
        sub: c.dative_fra,
        ipa: c.ipa,
        trans: c.translation,
        mnemonic: `🟡 ${c.dative_rule}. Національності: ${c.nationality_m} / ${c.nationality_f}.`,
        sentence: `Ég er frá ${c.dative_fra.replace('frá ', '')}.`,
        icon: c.flag || '🌍',
        audioText: c.dative_fra
      })));
    }

    if (this.currentFilter === 'all' || this.currentFilter === 'cities') {
      items.push(...CITIES_AND_LOCATIONS_K1.map(loc => ({
        type: 'city',
        id: `city_${loc.id}`,
        title: loc.title,
        sub: loc.sub,
        ipa: loc.ipa,
        trans: loc.trans,
        mnemonic: loc.mnemonic,
        sentence: loc.sentence,
        icon: loc.icon,
        audioText: loc.audioText
      })));
    }

    if (this.currentFilter === 'all' || this.currentFilter === 'verbs_family') {
      items.push(...VERBS_AGE_FAMILY_K1.map(vf => ({
        type: 'verb_family',
        id: `vf_${vf.id}`,
        title: vf.title,
        sub: vf.sub,
        ipa: vf.ipa,
        trans: vf.trans,
        mnemonic: vf.mnemonic,
        sentence: vf.sentence,
        icon: vf.icon,
        audioText: vf.audioText
      })));
    }

    if (this.currentFilter === 'all' || this.currentFilter === 'languages') {
      items.push(...this.languages.languages.map((l, idx) => ({
        type: 'language',
        id: `lang_${idx}`,
        title: l.name,
        sub: 'Tungumál',
        ipa: l.ipa,
        trans: l.meaning,
        mnemonic: `Мова спілкування: «Ég tala ${l.name.replace(/a$/, 'u')}» (у Знахідному відмінку 🟢 закінчення -a ➔ -u!).`,
        sentence: `Ég tala ${l.name.replace(/a$/, 'u')}.`,
        icon: l.flag || '🗣️',
        audioText: l.name
      })));

      items.push(...this.languages.proficiency_adverbs.map((a, idx) => ({
        type: 'proficiency',
        id: `adv_${idx}`,
        title: a.term,
        sub: 'Прислівник',
        ipa: a.ipa,
        trans: a.meaning,
        mnemonic: `Рівень володіння: ${a.example}`,
        sentence: a.example,
        icon: '⚡',
        audioText: a.example
      })));
    }

    grid.innerHTML = items.map(item => {
      const isFlipped = this.flippedCards.has(item.id);

      return `
        <div class="flip-card-container h-28 relative cursor-pointer select-none group" data-vocab-id="${item.id}" data-audio-text="${item.audioText}" data-title="${item.title}" data-ipa="${item.ipa}" data-trans="${item.trans}" data-mnemonic="${item.mnemonic}" data-sentence="${item.sentence}">
          <div class="flip-card-inner w-full h-full transition-transform duration-300 ${isFlipped ? 'flipped' : ''}" style="transform-style: preserve-3d;">
            
            <!-- FRONT FACE -->
            <div class="flip-card-front absolute inset-0 w-full h-full p-2 rounded-xl bg-cyber-deep/90 border border-slate-800 hover:border-amber-400 flex flex-col justify-between transition-all group-hover:scale-[1.02] shadow-sm" style="backface-visibility: hidden;">
              <div class="flex items-center justify-between text-[10px] font-mono leading-none">
                <span class="text-slate-400 font-bold">${item.icon}</span>
                <span class="text-[9px] text-slate-400 bg-black/40 px-1 py-0.2 rounded border border-slate-800 truncate max-w-[75%]">${item.sub}</span>
                <button class="flip-vocab-btn w-4 h-4 rounded text-amber-300 hover:bg-amber-500/20 flex items-center justify-center transition-colors" title="Мнемоніка">
                  💡
                </button>
              </div>

              <div class="text-center my-0.5">
                <div class="text-xs sm:text-sm font-black text-white font-mono group-hover:text-amber-300 transition-colors leading-tight truncate">
                  ${item.title}
                </div>
                <div class="text-[10px] font-mono text-cyan-300 mt-0.5 truncate">${item.ipa}</div>
              </div>

              <div class="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-sans leading-none">
                <span class="text-slate-300 truncate">${item.trans.split('•')[0]}</span>
                <button class="card-sound-btn text-cyan-400 hover:text-white flex items-center justify-center">
                  🔊
                </button>
              </div>
            </div>

            <!-- BACK FACE (MNEMONIC & GRAMMAR) -->
            <div class="flip-card-back absolute inset-0 w-full h-full p-2 rounded-xl bg-gradient-to-br from-cyber-deep to-cyber-void border border-amber-500/50 flex flex-col justify-between" style="backface-visibility: hidden; transform: rotateY(180deg);">
              <div class="flex items-center justify-between text-[10px] pb-1 border-b border-amber-500/20 leading-none">
                <strong class="font-mono text-amber-300 truncate text-[11px]">${item.title}</strong>
                <button class="flip-back-vocab-btn text-[9px] text-slate-400 px-1 rounded bg-black/50">↩</button>
              </div>

              <div class="text-[9px] leading-tight text-slate-200 font-sans overflow-y-auto pr-0.5 line-clamp-3 my-0.5">
                ${item.mnemonic}
              </div>

              <div class="pt-1 border-t border-amber-500/20 flex items-center justify-between text-[10px] font-mono">
                <span class="text-cyan-300 text-[9px] truncate">${item.sentence || ''}</span>
                <button class="card-sound-btn text-amber-300 text-[10px]">🔊</button>
              </div>
            </div>

          </div>
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    this.container.querySelectorAll('.vocab-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentFilter = btn.dataset.filter;
        this.render();
      });
    });

    const grid = this.container.querySelector('#vocab-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const card = e.target.closest('.flip-card-container');
        if (!card) return;

        const id = card.dataset.vocabId;
        const title = card.dataset.title;
        const ipa = card.dataset.ipa;
        const trans = card.dataset.trans;
        const mnemonic = card.dataset.mnemonic;
        const sentence = card.dataset.sentence;
        const audioText = card.dataset.audioText;

        // Flip trigger
        if (e.target.closest('.flip-vocab-btn') || e.target.closest('.flip-back-vocab-btn')) {
          e.stopPropagation();
          if (this.flippedCards.has(id)) {
            this.flippedCards.delete(id);
          } else {
            this.flippedCards.add(id);
          }
          const inner = card.querySelector('.flip-card-inner');
          if (inner) inner.classList.toggle('flipped', this.flippedCards.has(id));
          return;
        }

        // Sound trigger or card click: update drawer and speak
        this.updateDrawer({ title, ipa, trans, mnemonic, sentence, audioText });
        audioEngine.playWord(audioText || title, card);
      });
    }

    const drawerSpeakBtn = this.container.querySelector('#detail-speak-btn');
    if (drawerSpeakBtn) {
      drawerSpeakBtn.addEventListener('click', () => {
        const text = drawerSpeakBtn.dataset.audioText || 'Læknir';
        audioEngine.playWord(text, drawerSpeakBtn);
      });
    }
  }

  updateDrawer({ title, ipa, trans, mnemonic, sentence, audioText }) {
    const dTitle = this.container.querySelector('#detail-title');
    const dIpa = this.container.querySelector('#detail-ipa');
    const dTrans = this.container.querySelector('#detail-trans');
    const dMnemonic = this.container.querySelector('#detail-mnemonic');
    const dBtn = this.container.querySelector('#detail-speak-btn');

    if (dTitle) dTitle.innerText = title;
    if (dIpa) dIpa.innerText = ipa;
    if (dTrans) dTrans.innerText = trans;
    if (dMnemonic) dMnemonic.innerText = mnemonic;
    if (dBtn) {
      dBtn.dataset.audioText = sentence || audioText || title;
      dBtn.innerHTML = `<span>🔊 Озвучити «${title}»</span>`;
    }
  }
}
