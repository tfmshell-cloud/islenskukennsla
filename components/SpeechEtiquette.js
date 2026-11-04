/**
 * SpeechEtiquette.js - Step 0.6: Complete Sociolinguistic & Etiquette Simulator (Module 0)
 * Based on "Íslenska fyrir alla 1" (Kafli 1) & Árnastofnun standards:
 * - 4 Interactive Scenarios:
 *   1. Знайомство та походження (Jón & Anna — Male/Female gender toggle)
 *   2. Як справи? Групові вітання та прощання (Hvað segirðu gott? / Sælir / Sælar / Sæl / Blessaður / Blessuð)
 *   3. Привітання за часом доби та ввічливість (Góðan daginn / Gott kvöld / Takk fyrir mig)
 *   4. Диктування імені по літерах (Stafsetning) та Числа 0–10 (Hvernig stafarðu það? / Símanúmer)
 * - Interactive Greetings & Numbers 0-10 Soundboard Matrix
 * - Interactive Patronymic Name Generator (-son / -dóttir)
 */

import { audioEngine } from './AudioEngine.js?v=7.1';

const EXTRA_SCENARIOS = {
  scenario_2: {
    id: 'scenario_2',
    badge: 'Сценарій 2 • Íslenska fyrir alla 1',
    title: 'Як справи? Групові вітання та прощання (Hvað segirðu gott?)',
    context: 'В ісландській мові вітання та прощання змінюються залежно від статі та кількості співрозмовників: Sæll (1 чол.), Sæl (1 жін.), Sælir (група чоловіків), Sælar (група жінок), Sæl (змішана група чоловіків і жінок).',
    lines: [
      {
        id: 201,
        speaker: 'Gunnar',
        avatar: '👨‍🦱',
        role: 'partner',
        is_text: 'Góðan daginn, Anna! Hvað segirðu gott?',
        ipa: '[ˈkouːðan ˈtaiːjɪn, ˈanːa! kʰvaːð ˈsɛijɪrðʏ kɔht?]',
        uk_text: 'Доброго дня, Анно! Як твої справи? (досл. «Що скажеш хорошого?»)',
        note: 'Hvað segirðu gott? — найпопулярніше ісландське питання «Як справи?» (segir þú ➔ segirðu).'
      },
      {
        id: 202,
        speaker: 'Anna',
        avatar: '👩‍🦰',
        role: 'user',
        is_text: 'Sæll, Gunnar! Ég segi bara allt gott. En þú?',
        ipa: '[saitl̥, ˈkʏnːar! jɛːx ˈsɛijɪ ˈpaːra alt kɔht. ɛn θuː?]',
        uk_text: 'Привіт, Гуннаре! У мене все чудово (досл. «Я кажу лише все добре»). А ти?',
        note: 'Стандартна відповідь за підручником Íslenska fyrir alla 1: «Ég segi bara allt gott / allt fínt».'
      },
      {
        id: 203,
        speaker: 'Gunnar',
        avatar: '👨‍🦱',
        role: 'partner',
        is_text: 'Allt fínt, takk! Sjáðu, þarna eru Jón og María. Komdu sæl, krakkar!',
        ipa: '[alt fint, tʰahk! ˈsjauːðʏ, ˈθartna ˈɛːrʏ joun ɔɣ ˈmaːriːa. ˈkʰɔmtʏ sail, ˈkʰrahkar!]',
        uk_text: 'Все файно, дякую! Дивись, он там Йон і Марія. Привіт вам (до змішаної групи), друзі!',
        note: 'Звернення до змішаної групи (чоловік + жінка) — середній рід множини: Sæl! (без -tl і без -ir/-ar).'
      },
      {
        id: 204,
        speaker: 'Anna',
        avatar: '👩‍🦰',
        role: 'user',
        is_text: 'Hæ krakkar! Ég þarf að fara núna. Blessaður, Gunnar! Sjáumst á morgun!',
        ipa: '[haiː ˈkʰrahkar! jɛːx θarf að ˈfaːra ˈnuːna. ˈplɛsːaðʏr, ˈkʏnːar! ˈsjauːʏmst auː ˈmɔrkʏn!]',
        uk_text: 'Привіт, друзі! Мені треба йти зараз. Бувай здоровий, Гуннаре! Побачимося завтра!',
        note: 'При прощанні з чоловіком кажуть «Blessaður», а з жінкою — «Blessuð» (або коротко «Bless / Sjáumst»).'
      },
      {
        id: 205,
        speaker: 'Gunnar',
        avatar: '👨‍🦱',
        role: 'partner',
        is_text: 'Blessuð, Anna! Góða helgi!',
        ipa: '[ˈplɛsːʏð, ˈanːa! ˈkouːða ˈhɛlcɪ!]',
        uk_text: 'Бувай здорова, Анно! Гарних вихідних!',
        note: 'Blessuð — форма прощання, адресована жінці; Góða helgi — гарних вихідних (Знахідний відмінок 🟢).'
      }
    ]
  },
  scenario_3: {
    id: 'scenario_3',
    badge: 'Сценарій 3 • Етикет часу доби',
    title: 'Привітання за часом доби та ввічливість (Góðan daginn / Gott kvöld)',
    context: 'В Ісландії привітання змінюється залежно від часу доби: з ранку до ~17:00 кажуть «Góðan daginn» (або «Góðan dag»), після 17:00 — «Gott kvöld» (або «Góða kvöldið»), а перед сном чи при пізньому прощанні — «Góða nótt».',
    lines: [
      {
        id: 301,
        speaker: 'Kateryna',
        avatar: '👩‍🔬',
        role: 'user',
        is_text: 'Góðan daginn! Fyrirgefðu, talar þú ensku eða íslensku?',
        ipa: '[ˈkouːðan ˈtaiːjɪn! ˈfɪːrɪrˌcɛvðʏ, ˈtʰaːlar θuː ˈɛnskʏ ˈɛːða ˈistlɛnskʏ?]',
        uk_text: 'Доброго дня! Перепрошую, ви розмовляєте англійською чи ісландською?',
        note: 'Fyrirgefðu [ˈfɪːrɪrˌcɛvðʏ] — «Вибачте / Перепрошую» для привернення уваги.'
      },
      {
        id: 302,
        speaker: 'Sigurður',
        avatar: '👨‍🏫',
        role: 'partner',
        is_text: 'Góðan dag! Við tölum íslensku hér. Gjörðu svo vel, fáðu þér sæti.',
        ipa: '[ˈkouːðan taːɣ! vɪːð ˈtʰœːlʏm ˈistlɛnskʏ çɛːr. ˈcjœrðʏ svɔː vɛːl, ˈfauːðʏ θjɛːr ˈsaiːtɪ.]',
        uk_text: 'Добрий день! Ми розмовляємо тут ісландською. Будь ласка (прошу), сідайте.',
        note: 'Gjörðu svo vel — універсальне «Прошу / Будь ласка» (коли щось подають або запрошують).'
      },
      {
        id: 303,
        speaker: 'Kateryna',
        avatar: '👩‍🔬',
        role: 'user',
        is_text: 'Takk kærlega! Og hvað segir maður um kvöldið?',
        ipa: '[tʰahk ˈcʰairlɛɣa! ɔɣ kʰvaːð ˈsɛijɪr ˈmaːðʏr ʏm ˈkʰvœltɪð?]',
        uk_text: 'Щиро дякую! А що кажуть увечері?',
        note: 'Takk kærlega / Þakka þér fyrir — щиро дякую.'
      },
      {
        id: 304,
        speaker: 'Sigurður',
        avatar: '👨‍🏫',
        role: 'partner',
        is_text: 'Um kvöldið segjum við: Gott kvöld! Og þegar við förum að sofa: Góða nótt!',
        ipa: '[ʏm ˈkʰvœltɪð ˈsɛijʏm vɪːð: kɔht kʰvœlt! ɔɣ ˈθɛːɣar vɪːð ˈfœːrʏm að ˈsɔːva: ˈkouːða nouht!]',
        uk_text: 'Увечері ми кажемо: Добрий вечір (Gott kvöld)! А коли йдемо спати: На добраніч (Góða nótt)!',
        note: 'У слові nótt [nouht] подвоєне tt дає чітку преаспірацію [ht] після дифтонга ó [ou].'
      },
      {
        id: 305,
        speaker: 'Kateryna',
        avatar: '👩‍🔬',
        role: 'user',
        is_text: 'Takk fyrir mig! Sjáumst síðar!',
        ipa: '[tʰahk ˈfɪːrɪr mɪːx! ˈsjauːʏmst ˈsiːðar!]',
        uk_text: 'Дякую за гостину (досл. «Дякую за себе»)! Побачимося пізніше!',
        note: 'Takk fyrir mig — обов’язкова культурна формула подяки після їжі, кави або візиту в гості.'
      }
    ]
  },
  scenario_4: {
    id: 'scenario_4',
    badge: 'Сценарій 4 • Літерування та телефон',
    title: 'Диктування імені по літерах (Stafsetning) та Числа 0–10',
    context: 'У банку, клініці чи реєстратурі (Íslenska fyrir alla 1) українське ім’я завжди просять продиктувати по літерах: «Hvernig stafarðu það?» (Як ти це пишеш по буквах?) та запитують номер телефону: «Hvað er símanúmerið þitt?».',
    lines: [
      {
        id: 401,
        speaker: 'Afgreiðslumaður',
        avatar: '🧑‍💼',
        role: 'partner',
        is_text: 'Góðan daginn. Hvað heitir þú fullu nafni?',
        ipa: '[ˈkouːðan ˈtaiːjɪn. kʰvaːð ˈheiːtɪr θuː ˈfʏtlʏ ˈnapnɪ?]',
        uk_text: 'Доброго дня. Як твоє повне ім’я?',
        note: 'fullu nafni — повним ім’ям (слово nafn вимовляється [napn], а fullu — [fʏtlʏ] з боковим вибухом ll).'
      },
      {
        id: 402,
        speaker: 'Taras',
        avatar: '👨‍💻',
        role: 'user',
        is_text: 'Ég heiti Taras. T - A - R - A - S.',
        ipa: '[jɛːx ˈheiːtɪ Taras. tʰɛː - aː - ɛr - aː - ɛs.]',
        uk_text: 'Мене звати Тарас. Т - А - Р - А - С.',
        note: 'Назви літер при диктуванні: T [tʰɛː], A [aː], R [ɛr], S [ɛs].'
      },
      {
        id: 403,
        speaker: 'Afgreiðslumaður',
        avatar: '🧑‍💼',
        role: 'partner',
        is_text: 'Hvernig stafarðu föðurnafnið? Og hvað er símanúmerið þitt?',
        ipa: '[ˈkʰvɛrtnɪɣ ˈstaːvarðʏ ˈfœːðʏrˌnapnɪð? ɔɣ kʰvaːð ɛːr ˈsiːmaˌnuːmɛrɪð θɪht?]',
        uk_text: 'Як пишеться по літерах прізвище? І який твій номер телефону?',
        note: 'Hvernig stafarðu það? — Як ти це диктуєш по літерах? (stafa = називати по буквах).'
      },
      {
        id: 404,
        speaker: 'Taras',
        avatar: '👨‍💻',
        role: 'user',
        is_text: 'Símanúmerið mitt er sjö - átta - fimm, fjórir - tveir - einn - núll.',
        ipa: '[ˈsiːmaˌnuːmɛrɪð mɪht ɛːr sjœː - ˈauhta - fɪmː, ˈfjouːrɪr - tʰveiːr - eitn̥ - nuːl.]',
        uk_text: 'Мій номер телефону: 7 - 8 - 5, 4 - 2 - 1 - 0.',
        note: 'Ісландські телефонні номери мають 7 цифр (формат XXX-XXXX). Зверніть увагу: átta [ˈauhta] (преаспірація), einn [eitn̥] (преназалізація).'
      },
      {
        id: 405,
        speaker: 'Afgreiðslumaður',
        avatar: '🧑‍💼',
        role: 'partner',
        is_text: 'Frábært, takk fyrir! Hérna er kortið þitt.',
        ipa: '[ˈfrauːpaitl̥t, tʰahk ˈfɪːrɪr! ˈçɛrtna ɛːr ˈkʰɔr̥tɪð θɪht.]',
        uk_text: 'Чудово, дякую! Ось твоя картка.',
        note: 'Hérna [ˈçɛrtna] — ось тут (rn переходить у [rtn]).'
      }
    ]
  }
};

const GREETINGS_MATRIX = [
  { is: 'Sæll! / Komdu sæll!', ipa: '[saitl̥]', uk: 'Привіт! (до 1 чоловіка)', tag: 'Чол. одн. (kk.)' },
  { is: 'Sæl! / Komdu sæl!', ipa: '[sail]', uk: 'Привіт! (до 1 жінки)', tag: 'Жін. одн. (kvk.)' },
  { is: 'Sælir! / Komið þið sælir!', ipa: '[ˈsaiːlɪr]', uk: 'Привіт! (до групи чоловіків)', tag: 'Чол. мн. (kk. ft.)' },
  { is: 'Sælar! / Komið þið sælar!', ipa: '[ˈsaiːlar]', uk: 'Привіт! (до групи жінок)', tag: 'Жін. мн. (kvk. ft.)' },
  { is: 'Sæl! / Komið þið sæl!', ipa: '[sail]', uk: 'Привіт! (до змішаної групи ч.+ж.)', tag: 'Зміш. мн. (hk. ft.)' },
  { is: 'Góðan daginn! / Góðan dag!', ipa: '[ˈkouːðan ˈtaiːjɪn]', uk: 'Доброго дня! (ранок та день)', tag: 'Офіційно / Універс.' },
  { is: 'Gott kvöld! / Góða kvöldið!', ipa: '[kɔht kʰvœlt]', uk: 'Добрий вечір! (після 17:00)', tag: 'Вечір' },
  { is: 'Góða nótt!', ipa: '[ˈkouːða nouht]', uk: 'На добраніч!', tag: 'Ніч' },
  { is: 'Hvað segirðu gott?', ipa: '[kʰvaːð ˈsɛijɪrðʏ kɔht]', uk: 'Як справи? (Що скажеш хорошого?)', tag: 'Питання' },
  { is: 'Ég segi bara allt gott!', ipa: '[jɛːx ˈsɛijɪ ˈpaːra alt kɔht]', uk: 'У мене все добре!', tag: 'Відповідь' },
  { is: 'Bless! / Blessaður! / Blessuð!', ipa: '[plɛsː / ˈplɛsːaðʏr / ˈplɛsːʏð]', uk: 'Бувай! (універс. / до чол. / до жін.)', tag: 'Прощання' },
  { is: 'Sjáumst! / Góða helgi!', ipa: '[ˈsjauːʏmst / ˈkouːða ˈhɛlcɪ]', uk: 'Побачимося! / Гарних вихідних!', tag: 'Прощання' }
];

const NUMBERS_0_10 = [
  { num: 0, is: 'núll', ipa: '[nuːl]', trap: 'Довге [uː], одинарне [l]' },
  { num: 1, is: 'einn', ipa: '[eitn̥]', trap: 'Дифтонг ei + nn ➔ [tn]' },
  { num: 2, is: 'tveir', ipa: '[tʰveiːr]', trap: 'Придихове [tʰ] + дифтонг [eiː]' },
  { num: 3, is: 'þrír', ipa: '[θriːr]', trap: 'Глухий міжзубний Þ [θ] + довге [iː]' },
  { num: 4, is: 'fjórir', ipa: '[ˈfjouːrɪr]', trap: 'Дифтонг ó [ouː]' },
  { num: 5, is: 'fimm', ipa: '[fɪmː]', trap: 'Коротке [ɪ] + подвійне [mː]' },
  { num: 6, is: 'sex', ipa: '[sɛks]', trap: 'Літера x читається як [ks]' },
  { num: 7, is: 'sjö', ipa: '[sjœː]', trap: 'Лабіалізоване ö [œː]' },
  { num: 8, is: 'átta', ipa: '[ˈauhta]', trap: 'Дифтонг á [au] + преаспірація [ht]!' },
  { num: 9, is: 'níu', ipa: '[ˈniːjʏ]', trap: 'Довге [iː] + перехід у [ʏ]' },
  { num: 10, is: 'tíu', ipa: '[ˈtʰiːjʏ]', trap: 'Придихове [tʰ] + довге [iː]' }
];

export class SpeechEtiquette {
  constructor(container, dialogueData) {
    this.container = container;
    this.data = dialogueData || {};
    this.activeScenario = 'scenario_1'; // 'scenario_1' | 'scenario_2' | 'scenario_3' | 'scenario_4'
    this.userGender = 'male'; // 'male' (Karlkyn) | 'female' (Kvenkyn) for scenario_1
    this.showTranslation = true;
    this.isPlayingAll = false;
  }

  render() {
    const isMale = this.userGender === 'male';
    let lines = [];
    let contextBannerHtml = '';

    if (this.activeScenario === 'scenario_1') {
      lines = isMale
        ? (this.data.scenario_male || this.data.dialogue_lines || [])
        : (this.data.scenario_female || this.data.dialogue_lines || []);
      contextBannerHtml = `
        <div class="px-3 py-2 rounded-xl dlg-context-banner border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="text-base">${isMale ? '👨' : '👩'}</span>
            <div class="font-sans leading-tight">
              <strong>${isMale ? 'Режим: Студент-чоловік' : 'Режим: Студентка-жінка'}</strong> — звертаючись до вас, кажуть 
              <strong class="font-mono dlg-accent-word">${isMale ? 'Sæll! [saitl]' : 'Sæl! [sail]'}</strong>, а форма походження: 
              <strong class="font-mono dlg-accent-word">${isMale ? 'Úkraínumaður' : 'Úkraínukona'}</strong>.
            </div>
          </div>
          <!-- Gender Switcher -->
          <div class="flex items-center p-0.5 rounded-lg border dlg-toggle-group self-start sm:self-auto flex-shrink-0">
            <button id="gender-toggle-male" class="px-2.5 py-1 rounded-md font-bold text-[11px] transition-all ${isMale ? 'dlg-toggle-active-male shadow-sm' : 'dlg-toggle-inactive'}">
              👨 Чоловік
            </button>
            <button id="gender-toggle-female" class="px-2.5 py-1 rounded-md font-bold text-[11px] transition-all ${!isMale ? 'dlg-toggle-active-female shadow-sm' : 'dlg-toggle-inactive'}">
              👩 Жінка
            </button>
          </div>
        </div>
      `;
    } else {
      const scObj = EXTRA_SCENARIOS[this.activeScenario];
      lines = scObj.lines;
      contextBannerHtml = `
        <div class="px-3 py-2 rounded-xl dlg-context-banner border text-xs flex items-start gap-2">
          <span class="text-base mt-0.5">📘</span>
          <div class="font-sans leading-snug">
            <strong class="font-mono dlg-accent-word">${scObj.title}:</strong> ${scObj.context}
          </div>
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="space-y-4">
        
        <!-- Top Control Bar & 4 Scenario Tabs -->
        <div class="p-3 rounded-xl dlg-header-card border text-xs font-mono shadow-sm space-y-2.5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider dlg-badge">
                Крок 0.6 • Мовленнєвий етикет (Íslenska fyrir alla 1)
              </span>
              <span class="font-bold dlg-title text-xs sm:text-sm">4 інтерактивні діалоги + Числа 0–10</span>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-1.5 flex-wrap">
              <button id="toggle-translations-btn" class="px-2.5 py-1 rounded-lg border font-bold text-[11px] transition-all flex items-center gap-1 dlg-ctrl-btn">
                <span>👁️ Переклад:</span>
                <strong id="trans-state-label" class="dlg-trans-toggle-state">${this.showTranslation ? 'ТАК' : 'НІ'}</strong>
              </button>

              <button id="play-full-dialogue-btn" class="px-3 py-1 rounded-lg dlg-play-all-btn font-extrabold text-[11px] font-mono shadow-sm transition-all flex items-center gap-1 active:scale-95">
                <span>▶️ Весь діалог</span>
              </button>
            </div>
          </div>

          <!-- 4 Scenario Selector Tabs -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 pt-1 border-t border-slate-800/60">
            <button data-m0-sc="scenario_1" class="m0-sc-tab px-2.5 py-1.5 rounded-lg text-left font-bold text-[11px] transition-all border ${this.activeScenario === 'scenario_1' ? 'bg-cyan-500 text-black border-cyan-400 shadow-sm' : 'bg-black/40 text-slate-300 border-slate-800 hover:border-cyan-400/50'}">
              1. Знайомство (Jón & Anna)
            </button>
            <button data-m0-sc="scenario_2" class="m0-sc-tab px-2.5 py-1.5 rounded-lg text-left font-bold text-[11px] transition-all border ${this.activeScenario === 'scenario_2' ? 'bg-cyan-500 text-black border-cyan-400 shadow-sm' : 'bg-black/40 text-slate-300 border-slate-800 hover:border-cyan-400/50'}">
              2. Як справи? & Групові вітання
            </button>
            <button data-m0-sc="scenario_3" class="m0-sc-tab px-2.5 py-1.5 rounded-lg text-left font-bold text-[11px] transition-all border ${this.activeScenario === 'scenario_3' ? 'bg-cyan-500 text-black border-cyan-400 shadow-sm' : 'bg-black/40 text-slate-300 border-slate-800 hover:border-cyan-400/50'}">
              3. Час доби & Ввічливість
            </button>
            <button data-m0-sc="scenario_4" class="m0-sc-tab px-2.5 py-1.5 rounded-lg text-left font-bold text-[11px] transition-all border ${this.activeScenario === 'scenario_4' ? 'bg-cyan-500 text-black border-cyan-400 shadow-sm' : 'bg-black/40 text-slate-300 border-slate-800 hover:border-cyan-400/50'}">
              4. Літерування & Телефон (0–10)
            </button>
          </div>
        </div>

        <!-- Context Banner -->
        ${contextBannerHtml}

        <!-- ================= COMPACT CHAT FEED (Messenger Style) ================= -->
        <div class="max-w-2xl mx-auto space-y-2 py-1">
          ${lines.map((line, idx) => {
            const isUser = line.role === 'user';
            const audioPath = line.audio_file || '';

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

        <!-- ================= ACADEMIC TABLE 1: GREETINGS & FAREWELLS MATRIX (ÍSLENSKA FYRIR ALLA 1) ================= -->
        <div class="p-3.5 rounded-xl border dlg-patronymic-card shadow-sm space-y-2.5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1.5 border-b dlg-patronymic-divider text-xs">
            <div class="flex items-center gap-1.5 font-bold font-mono dlg-patronymic-title">
              <span>👋</span> <span>Таблиця 1 (Íslenska fyrir alla 1): Вітання, «Як справи?» та Прощання за родами і числом</span>
            </div>
            <span class="text-[10px] font-mono opacity-80">Натисніть на будь-яку фразу для прослуховування 🔊</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
            ${GREETINGS_MATRIX.map(g => `
              <div class="m0-etiquette-phrase-card p-2 rounded-lg border bg-black/40 border-slate-800 hover:border-cyan-400 cursor-pointer transition-all flex flex-col justify-between gap-1 group" data-phrase="${g.is.split('/')[0].trim()}">
                <div class="flex items-center justify-between gap-1">
                  <span class="font-mono font-bold text-white group-hover:text-cyan-300 text-xs">${g.is}</span>
                  <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex-shrink-0">${g.tag}</span>
                </div>
                <div class="flex items-center justify-between text-[11px]">
                  <span class="font-mono text-cyan-400">${g.ipa}</span>
                  <span class="text-slate-400 group-hover:text-amber-300">🔊</span>
                </div>
                <div class="text-[11px] font-sans text-slate-300">${g.uk}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ================= ACADEMIC TABLE 2: NUMBERS 0-10 & PHONETIC TRAPS (TÖLUSTAFIR 0-10) ================= -->
        <div class="p-3.5 rounded-xl border dlg-patronymic-card shadow-sm space-y-2.5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1.5 border-b dlg-patronymic-divider text-xs">
            <div class="flex items-center gap-1.5 font-bold font-mono dlg-patronymic-title">
              <span>🔢</span> <span>Таблиця 2 (Íslenska fyrir alla 1): Числа 0–10 (Tölustafir) та фонетичні пастки в числівниках</span>
            </div>
            <span class="text-[10px] font-mono opacity-80">Для диктування телефону: Hvað er símanúmerið þitt?</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
            ${NUMBERS_0_10.map(n => `
              <div class="m0-etiquette-phrase-card p-2 rounded-lg border bg-black/40 border-slate-800 hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between group" data-phrase="${n.is}">
                <div class="flex items-center justify-between">
                  <span class="text-base font-black font-mono text-amber-400">${n.num}</span>
                  <span class="font-mono font-bold text-white group-hover:text-amber-300 text-sm">${n.is}</span>
                  <span class="text-[11px] text-slate-400 group-hover:text-cyan-300">🔊</span>
                </div>
                <div class="text-[11px] font-mono text-cyan-300 mt-0.5">${n.ipa}</div>
                <div class="text-[10px] font-sans text-slate-400 leading-tight mt-1">${n.trap}</div>
              </div>
            `).join('')}
          </div>
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
              <span>🧬</span> <span>Інтерактивний генератор патронімів (Föðurnöfn & Móðurnöfn)</span>
            </div>
            <span class="text-[10px] font-mono opacity-80">[Ім'я батька/матері в Ef. 🔴] + -son / -dóttir</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div>
              <label class="block text-[10px] font-mono opacity-70 mb-0.5">Батько / Мати:</label>
              <select id="patronymic-father-select" class="w-full rounded-lg px-2 py-1 text-xs font-mono border dlg-select focus:outline-none">
                <option value="Jón">Jón (Ef: Jóns)</option>
                <option value="Einar">Einar (Ef: Einars)</option>
                <option value="Magnús">Magnús (Ef: Magnúsar)</option>
                <option value="Gunnar">Gunnar (Ef: Gunnars)</option>
                <option value="Ólafur">Ólafur (Ef: Ólafs)</option>
                <option value="Sigurður">Sigurður (Ef: Sigurðar)</option>
                <option value="Guðrún">Guðrún (мати, Ef: Guðrúnar)</option>
                <option value="Helga">Helga (мати, Ef: Helgu)</option>
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
              <div id="patronymic-result-rule" class="text-[9px] opacity-80">Jóns (Ef. 🔴) + son</div>
            </div>
          </div>
        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Scenario switcher tabs
    this.container.querySelectorAll('.m0-sc-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const sc = tab.dataset.m0Sc;
        if (sc && sc !== this.activeScenario) {
          this.isPlayingAll = false;
          audioEngine.stop();
          this.activeScenario = sc;
          this.render();
        }
      });
    });

    // Gender toggle (Scenario 1)
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

    // Dialogue line clicks
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

    // Etiquette matrix & Numbers 0-10 soundboard clicks
    this.container.querySelectorAll('.m0-etiquette-phrase-card').forEach(card => {
      card.addEventListener('click', () => {
        const phrase = card.dataset.phrase;
        if (phrase) audioEngine.playWord(phrase, card);
      });
    });

    // Play / Stop full dialogue sequentially
    const playAllBtn = this.container.querySelector('#play-full-dialogue-btn');
    if (playAllBtn) {
      playAllBtn.addEventListener('click', async () => {
        if (this.isPlayingAll) {
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

            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            await audioEngine.playUntilEnd(audioFile || audioCue, card, 0.95);

            if (!this.isPlayingAll) break;
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
      const parent = fSelect.value;
      const isSon = gSelect.value === 'son';

      const genitiveMap = {
        'Jón': 'Jóns',
        'Einar': 'Einars',
        'Magnús': 'Magnúsar',
        'Gunnar': 'Gunnars',
        'Ólafur': 'Ólafs',
        'Sigurður': 'Sigurðar',
        'Guðrún': 'Guðrúnar',
        'Helga': 'Helgu'
      };

      const genitive = genitiveMap[parent] || `${parent}s`;
      const result = `${genitive}${isSon ? 'son' : 'dóttir'}`;
      rName.innerText = result;
      if (rRule) rRule.innerText = `${genitive} (Ef. 🔴) + ${isSon ? 'son' : 'dóttir'}`;
    };

    if (fSelect && gSelect) {
      fSelect.addEventListener('change', updatePatronymic);
      gSelect.addEventListener('change', updatePatronymic);
    }
  }
}
