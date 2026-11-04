/**
 * VeraGrammarHub.js - Complete Academic Grammar Engine for Kafli 1 (Íslenska fyrir alla 1 Standard)
 * Features:
 * 1. Interactive 6-Verb Present Tense Conjugation Matrix (vera, heita, tala, búa, læra, vinna) across all 10 pronouns
 * 2. Complete Personal Pronouns Table (Persónufornöfn: þeir vs þær vs þau rule)
 * 3. Prepositions of Origin, Residence & Work: frá vs í vs á + Þágufall (ÞGF 🟡) (Why í Reykjavík vs á Íslandi / á Akureyri)
 * 4. Question Word Order Architecture (V2 Statements vs V2 Wh-Questions vs V1 Yes/No Inversion + -tu/-ðu enclitics)
 * 5. Numbers 0–20 (Tölustafir), Age (Hvað ertu gamall/gömul?) & Marital Status (Hjúskaparstaða)
 */

import { audioEngine } from './AudioEngine.js?v=7.1';

const K1_VERB_PARADIGMS = {
  vera: {
    infinitive: 'að vera',
    uk: 'бути (неправильне дієслово-зв’язка)',
    groupBadge: 'Неправильне • Обов’язкове в реченні',
    ruleNote: 'В ісландській мові дієслово «vera» НІКОЛИ не опускається в теперішньому часі: «Ég er læknir» (Я є лікар), «Hún er frá Úkraínu» (Вона є з України).',
    forms: [
      { pronoun: 'ég', form: 'er', ipa: '[jɛːx ɛːr]', trans: 'я є', person: '1 ос. одн.' },
      { pronoun: 'þú', form: 'ert', ipa: '[θuː ɛr̥t]', trans: 'ти є', person: '2 ос. одн.' },
      { pronoun: 'hann', form: 'er', ipa: '[hanː ɛːr]', trans: 'він є', person: '3 ос. одн. (kk.)' },
      { pronoun: 'hún', form: 'er', ipa: '[huːn ɛːr]', trans: 'вона є', person: '3 ос. одн. (kvk.)' },
      { pronoun: 'það', form: 'er', ipa: '[θaːð ɛːr]', trans: 'воно є', person: '3 ос. одн. (hk.)' },
      { pronoun: 'við', form: 'erum', ipa: '[vɪːð ˈɛːrʏm]', trans: 'ми є', person: '1 ос. мн.' },
      { pronoun: 'þið', form: 'eruð', ipa: '[θɪːð ˈɛːrʏð]', trans: 'ви є', person: '2 ос. мн.' },
      { pronoun: 'þeir', form: 'eru', ipa: '[θeiːr ˈɛːrʏ]', trans: 'вони є (чол.)', person: '3 ос. мн. (kk.)' },
      { pronoun: 'þær', form: 'eru', ipa: '[θaiːr ˈɛːrʏ]', trans: 'вони є (жін.)', person: '3 ос. мн. (kvk.)' },
      { pronoun: 'þau', form: 'eru', ipa: '[θœyː ˈɛːrʏ]', trans: 'вони є (зміш.)', person: '3 ос. мн. (hk.)' }
    ]
  },
  heita: {
    infinitive: 'að heita',
    uk: 'зватися / називатися',
    groupBadge: 'Група -i (-i / -ir / -ir)',
    ruleNote: 'Дієслово «heita» відповідає на питання «Hvað heitir þú?». В однині має закінчення: ég heit-i, þú heit-ir, hann/hún heit-ir.',
    forms: [
      { pronoun: 'ég', form: 'heiti', ipa: '[jɛːx ˈheiːtɪ]', trans: 'мене звати', person: '1 ос. одн.' },
      { pronoun: 'þú', form: 'heitir', ipa: '[θuː ˈheiːtɪr]', trans: 'тебе звати', person: '2 ос. одн.' },
      { pronoun: 'hann', form: 'heitir', ipa: '[hanː ˈheiːtɪr]', trans: 'його звати', person: '3 ос. одн. (kk.)' },
      { pronoun: 'hún', form: 'heitir', ipa: '[huːn ˈheiːtɪr]', trans: 'її звати', person: '3 ос. одн. (kvk.)' },
      { pronoun: 'það', form: 'heitir', ipa: '[θaːð ˈheiːtɪr]', trans: 'воно зветься', person: '3 ос. одн. (hk.)' },
      { pronoun: 'við', form: 'heitum', ipa: '[vɪːð ˈheiːtʏm]', trans: 'нас звати', person: '1 ос. мн.' },
      { pronoun: 'þið', form: 'heitið', ipa: '[θɪːð ˈheiːtɪð]', trans: 'вас звати', person: '2 ос. мн.' },
      { pronoun: 'þeir', form: 'heita', ipa: '[θeiːr ˈheiːta]', trans: 'їх звати (чол.)', person: '3 ос. мн. (kk.)' },
      { pronoun: 'þær', form: 'heita', ipa: '[θaiːr ˈheiːta]', trans: 'їх звати (жін.)', person: '3 ос. мн. (kvk.)' },
      { pronoun: 'þau', form: 'heita', ipa: '[θœyː ˈheiːta]', trans: 'їх звати (зміш.)', person: '3 ос. мн. (hk.)' }
    ]
  },
  tala: {
    infinitive: 'að tala',
    uk: 'говорити / розмовляти (мовою)',
    groupBadge: 'Група -a (-a / -ar / -ar + U-умляут a➔ö)',
    ruleNote: 'Найбільший клас правильних дієслів на -a! УВАГА на 1 особу множини (við): закінчення -um викликає U-умляут кореневого a ➔ ö: «við tölum» [vɪːð ˈtʰœːlʏm]!',
    forms: [
      { pronoun: 'ég', form: 'tala', ipa: '[jɛːx ˈtʰaːla]', trans: 'я розмовляю', person: '1 ос. одн.' },
      { pronoun: 'þú', form: 'talar', ipa: '[θuː ˈtʰaːlar]', trans: 'ти розмовляєш', person: '2 ос. одн.' },
      { pronoun: 'hann', form: 'talar', ipa: '[hanː ˈtʰaːlar]', trans: 'він розмовляє', person: '3 ос. одн. (kk.)' },
      { pronoun: 'hún', form: 'talar', ipa: '[huːn ˈtʰaːlar]', trans: 'вона розмовляє', person: '3 ос. одн. (kvk.)' },
      { pronoun: 'það', form: 'talar', ipa: '[θaːð ˈtʰaːlar]', trans: 'воно розмовляє', person: '3 ос. одн. (hk.)' },
      { pronoun: 'við', form: 'tölum', ipa: '[vɪːð ˈtʰœːlʏm]', trans: 'ми розмовляємо (a➔ö!)', person: '1 ос. мн. ⚡' },
      { pronoun: 'þið', form: 'talið', ipa: '[θɪːð ˈtʰaːlɪð]', trans: 'ви розмовляєте', person: '2 ос. мн.' },
      { pronoun: 'þeir', form: 'tala', ipa: '[θeiːr ˈtʰaːla]', trans: 'вони розмовляють (ч.)', person: '3 ос. мн. (kk.)' },
      { pronoun: 'þær', form: 'tala', ipa: '[θaiːr ˈtʰaːla]', trans: 'вони розмовляють (ж.)', person: '3 ос. мн. (kvk.)' },
      { pronoun: 'þau', form: 'tala', ipa: '[θœyː ˈtʰaːla]', trans: 'вони розмовляють (зм.)', person: '3 ос. мн. (hk.)' }
    ]
  },
  bua: {
    infinitive: 'að búa',
    uk: 'жити / мешкати (í Reykjavík / á Íslandi)',
    groupBadge: 'Сильне дієслово (ú ➔ ý в однині)',
    ruleNote: 'Ключове дієслово Розділу 1 «Íslenska fyrir alla 1»! В однині кореневий ú змінюється на ý [iː]: ég bý, þú býrð, hann/hún býr. У множині повертається ú: við búum, þið búið, þau búa!',
    forms: [
      { pronoun: 'ég', form: 'bý', ipa: '[jɛːx piː]', trans: 'я живу / мешкаю', person: '1 ос. одн. ⚡' },
      { pronoun: 'þú', form: 'býrð', ipa: '[θuː pirð]', trans: 'ти живеш', person: '2 ос. одн. ⚡' },
      { pronoun: 'hann', form: 'býr', ipa: '[hanː piːr]', trans: 'він живе', person: '3 ос. одн. (kk.)' },
      { pronoun: 'hún', form: 'býr', ipa: '[huːn piːr]', trans: 'вона живе', person: '3 ос. одн. (kvk.)' },
      { pronoun: 'það', form: 'býr', ipa: '[θaːð piːr]', trans: 'воно живе', person: '3 ос. одн. (hk.)' },
      { pronoun: 'við', form: 'búum', ipa: '[vɪːð ˈpuːʏm]', trans: 'ми живемо', person: '1 ос. мн.' },
      { pronoun: 'þið', form: 'búið', ipa: '[θɪːð ˈpuːɪð]', trans: 'ви живете', person: '2 ос. мн.' },
      { pronoun: 'þeir', form: 'búa', ipa: '[θeiːr ˈpuːa]', trans: 'вони живуть (чол.)', person: '3 ос. мн. (kk.)' },
      { pronoun: 'þær', form: 'búa', ipa: '[θaiːr ˈpuːa]', trans: 'вони живуть (жін.)', person: '3 ос. мн. (kvk.)' },
      { pronoun: 'þau', form: 'búa', ipa: '[θœyː ˈpuːa]', trans: 'вони живуть (зміш.)', person: '3 ос. мн. (hk.)' }
    ]
  },
  laera: {
    infinitive: 'að læra',
    uk: 'вчити / вивчати (ісландську)',
    groupBadge: 'Група -i (-i / -ir / -ir)',
    ruleNote: 'Дієслово класу -i (як і heita): ég læri, þú lærir, hann/hún lærir. Вимагає Знахідного відмінка (Þolfall 🟢): «Ég læri íslensku».',
    forms: [
      { pronoun: 'ég', form: 'læri', ipa: '[jɛːx ˈlaiːrɪ]', trans: 'я вивчаю', person: '1 ос. одн.' },
      { pronoun: 'þú', form: 'lærir', ipa: '[θuː ˈlaiːrɪr]', trans: 'ти вивчаєш', person: '2 ос. одн.' },
      { pronoun: 'hann', form: 'lærir', ipa: '[hanː ˈlaiːrɪr]', trans: 'він вивчає', person: '3 ос. одн. (kk.)' },
      { pronoun: 'hún', form: 'lærir', ipa: '[huːn ˈlaiːrɪr]', trans: 'вона вивчає', person: '3 ос. одн. (kvk.)' },
      { pronoun: 'það', form: 'lærir', ipa: '[θaːð ˈlaiːrɪr]', trans: 'воно вивчає', person: '3 ос. одн. (hk.)' },
      { pronoun: 'við', form: 'lærum', ipa: '[vɪːð ˈlaiːrʏm]', trans: 'ми вивчаємо', person: '1 ос. мн.' },
      { pronoun: 'þið', form: 'lærið', ipa: '[θɪːð ˈlaiːrɪð]', trans: 'ви вивчаєте', person: '2 ос. мн.' },
      { pronoun: 'þeir', form: 'læra', ipa: '[θeiːr ˈlaiːra]', trans: 'вони вивчають (чол.)', person: '3 ос. мн. (kk.)' },
      { pronoun: 'þær', form: 'læra', ipa: '[θaiːr ˈlaiːra]', trans: 'вони вивчають (жін.)', person: '3 ос. мн. (kvk.)' },
      { pronoun: 'þau', form: 'læra', ipa: '[θœyː ˈlaiːra]', trans: 'вони вивчають (зміш.)', person: '3 ос. мн. (hk.)' }
    ]
  },
  vinna: {
    infinitive: 'að vinna',
    uk: 'працювати (hjá / á / í)',
    groupBadge: 'Група приголосних (-Ø / -ur / -ur)',
    ruleNote: 'Дієслово класу на приголосний (-ur): в 1-й особі однини закінчення нульове (ég vinn), а в 2-й та 3-й особі додається -ur (þú vinnur, hann/hún vinnur).',
    forms: [
      { pronoun: 'ég', form: 'vinn', ipa: '[jɛːx vɪnː]', trans: 'я працюю', person: '1 ос. одн. ⚡' },
      { pronoun: 'þú', form: 'vinnur', ipa: '[θuː ˈvɪnːʏr]', trans: 'ти працюєш', person: '2 ос. одн.' },
      { pronoun: 'hann', form: 'vinnur', ipa: '[hanː ˈvɪnːʏr]', trans: 'він працює', person: '3 ос. одн. (kk.)' },
      { pronoun: 'hún', form: 'vinnur', ipa: '[huːn ˈvɪnːʏr]', trans: 'вона працює', person: '3 ос. одн. (kvk.)' },
      { pronoun: 'það', form: 'vinnur', ipa: '[θaːð ˈvɪnːʏr]', trans: 'воно працює', person: '3 ос. одн. (hk.)' },
      { pronoun: 'við', form: 'vinnum', ipa: '[vɪːð ˈvɪnːʏm]', trans: 'ми працюємо', person: '1 ос. мн.' },
      { pronoun: 'þið', form: 'vinnið', ipa: '[θɪːð ˈvɪnːɪð]', trans: 'ви працюєте', person: '2 ос. мн.' },
      { pronoun: 'þeir', form: 'vinna', ipa: '[θeiːr ˈvɪnːa]', trans: 'вони працюють (чол.)', person: '3 ос. мн. (kk.)' },
      { pronoun: 'þær', form: 'vinna', ipa: '[θaiːr ˈvɪnːa]', trans: 'вони працюють (жін.)', person: '3 ос. мн. (kvk.)' },
      { pronoun: 'þau', form: 'vinna', ipa: '[θœyː ˈvɪnːa]', trans: 'вони працюють (зміш.)', person: '3 ос. мн. (hk.)' }
    ]
  }
};

const PREPOSITIONS_PLACE_MATRIX = [
  {
    prep: 'í + Þágufall 🟡',
    title: 'Коли вживається «í» (в / у)?',
    subtitle: 'Материкові країни, столиця Рейк’явік, більшість міст у долинах/затоках та установи',
    color: 'cyan',
    items: [
      { nom: 'Reykjavík (kvk.)', dat: 'Ég bý í Reykjavík', ipa: '[jɛːx piː iː ˈreiːcaˌviːk]', uk: 'Я живу в Рейк’явіку (буквально «Димна затока» — затоки беруть í!)' },
      { nom: 'Kópavogur (kk.)', dat: 'Ég bý í Kópavogi', ipa: '[jɛːx piː iː ˈkʰouːpaˌvɔijɪ]', uk: 'Я живу в Коупавогюрі (-ur ➔ -i)' },
      { nom: 'Hafnarfjörður (kk.)', dat: 'Ég bý í Hafnarfirði', ipa: '[jɛːx piː iː ˈhapnarˌfɪrðɪ]', uk: 'Я живу в Габнарфйордюрі (фіорди беруть í!)' },
      { nom: 'Úkraína (kvk.)', dat: 'Ég bý í Úkraínu', ipa: '[jɛːx piː iː ˈuːkraiːnʏ]', uk: 'Я живу в Україні (материкові країни беруть í)' },
      { nom: 'Pólland (hk.)', dat: 'Hann býr í Póllandi', ipa: '[hanː piːr iː ˈpʰoutlantɪ]', uk: 'Він живе в Польщі (+ -i)' },
      { nom: 'skóli / banki', dat: 'Ég vinn í skóla / í banka', ipa: '[jɛːx vɪnː iː ˈskouːla]', uk: 'Я працюю в школі / в банку' }
    ]
  },
  {
    prep: 'á + Þágufall 🟡',
    title: 'Коли вживається «á» (на / в)?',
    subtitle: 'Острови (Ísland!), ісландські міста на мисах/півостровах/пагорбах та робочі заклади',
    color: 'amber',
    items: [
      { nom: 'Ísland (hk. — острів!)', dat: 'Ég bý á Íslandi', ipa: '[jɛːx piː auː ˈistlantɪ]', uk: 'Я живу в Ісландії (усі острови в ісландській мові вживаються з «á»!)' },
      { nom: 'Akureyri (kvk. — коса/мис)', dat: 'Hún býr á Akureyri', ipa: '[huːn piːr auː ˈaːkʏrˌeirɪ]', uk: 'Вона живе в Акурейрі (eyri = піщана коса ➔ завжди «á»!)' },
      { nom: 'Selfoss (kk. — поріг)', dat: 'Hann býr á Selfossi', ipa: '[hanː piːr auː ˈsɛlfɔsːɪ]', uk: 'Він живе в Сельфоссі (міста біля водоспадів/мисів беруть «á»)' },
      { nom: 'Ísafjörður / Akranes', dat: 'Ég bý á Ísafirði / á Akranesi', ipa: '[jɛːx piː auː ˈiːsaˌfɪrðɪ]', uk: 'Я живу в Ісафйордюрі / в Акранесі (традиційні поселення на косах/мисах)' },
      { nom: 'Spánn / Ítalía (винятки)', dat: 'Þau búa á Spáni / á Ítalíu', ipa: '[θœyː ˈpuːa auː ˈspauːnɪ]', uk: 'Вони живуть в Іспанії / Італії (півострови традиційно з «á»!)' },
      { nom: 'spítali / kaffihús', dat: 'Ég vinn á spítala / á kaffihúsi', ipa: '[jɛːx vɪnː auː ˈspiːtala]', uk: 'Я працюю в лікарні / в кав’ярні' }
    ]
  }
];

const QUESTION_ARCHITECTURE = [
  {
    type: '1. Розповідне речення (Прямий порядок V2)',
    formula: '[1. Підмет] + [2. Дієслово] + [3. Додаток / Обставина]',
    example_is: 'Þú býrð í Reykjavík.',
    example_ipa: '[θuː pirð iː ˈreiːcaˌviːk]',
    example_uk: 'Ти живеш у Рейк’явіку.'
  },
  {
    type: '2. Запитання з питальним словом (Spurnarorð + V2)',
    formula: '[1. Питальне слово] + [2. Дієслово] + [3. Підмет (þú)]',
    example_is: 'Hvar býrð þú? (або злито: Hvar býrðu?)',
    example_ipa: '[kʰvaːr pirðʏ?]',
    example_uk: 'Де ти живеш? (Дієслово залишається на 2-й позиції після питального слова!)'
  },
  {
    type: '3. Загальне питання «Так / Ні» (Інверсія V1 + злиття -tu / -ðu)',
    formula: '[1. Дієслово!] + [2. Підмет] + [3. Обставина] ➔ Відповідь: Já / Nei + ekki',
    example_is: 'Býrð þú (Býrðu) í Reykjavík? — Já, ég bý í Reykjavík. / Nei, ég bý ekki í Reykjavík.',
    example_ipa: '[ˈpirðʏ iː ˈreiːcaˌviːk?]',
    example_uk: 'Ти живеш у Рейк’явіку? (Без питального слова дієслово стрибає на 1-ше місце — V1!)'
  }
];

const ENCLITIC_MERGERS = [
  { full: 'Ert þú...?', merged: 'Ertu...?', ipa: '[ˈɛr̥tʏ]', uk: 'Ти є...? (Ertu frá Úkraínu?)', ex: 'Ertu frá Úkraínu?' },
  { full: 'Heitir þú...?', merged: 'Heitirðu...?', ipa: '[ˈheiːtɪrðʏ]', uk: 'Як тебе звати? (Hvað heitirðu?)', ex: 'Hvað heitirðu?' },
  { full: 'Býrð þú...?', merged: 'Býrðu...?', ipa: '[ˈpirðʏ]', uk: 'Де ти живеш? (Hvar býrðu?)', ex: 'Hvar býrðu?' },
  { full: 'Talar þú...?', merged: 'Talarðu...?', ipa: '[ˈtʰaːlarðʏ]', uk: 'Ти розмовляєш...? (Talarðu íslensku?)', ex: 'Talarðu íslensku?' },
  { full: 'Vinnur þú...?', merged: 'Vinnurðu...?', ipa: '[ˈvɪnːʏrðʏ]', uk: 'Де ти працюєш? (Hvar vinnurðu?)', ex: 'Hvar vinnurðu?' },
  { full: 'Segir þú...?', merged: 'Segirðu...?', ipa: '[ˈsɛijɪrðʏ]', uk: 'Як справи? (Hvað segirðu gott?)', ex: 'Hvað segirðu gott?' }
];

const NUMBERS_11_20_AND_AGE = [
  { num: '11', is: 'ellefu', ipa: '[ˈɛtlɛvʏ]', uk: 'одинадцять (ll ➔ [tl])', ex: 'ellefu' },
  { num: '12', is: 'tólf', ipa: '[tʰoulf]', uk: 'дванадцять', ex: 'tólf' },
  { num: '13', is: 'þrettán', ipa: '[ˈθrɛhtauːn]', uk: 'тринадцять (tt ➔ [ht])', ex: 'þrettán' },
  { num: '14', is: 'fjórtán', ipa: '[ˈfjour̥tauːn]', uk: 'чотирнадцять', ex: 'fjórtán' },
  { num: '15', is: 'fimmtán', ipa: '[ˈfɪm̥tauːn]', uk: 'п’ятнадцять', ex: 'fimmtán' },
  { num: '16', is: 'sextán', ipa: '[ˈsɛkstauːn]', uk: 'шістнадцять', ex: 'sextán' },
  { num: '17', is: 'sautján', ipa: '[ˈsœyːtjaun]', uk: 'сімнадцять (au ➔ [œy])', ex: 'sautján' },
  { num: '18', is: 'átján', ipa: '[ˈauːtjaun]', uk: 'вісімнадцять', ex: 'átján' },
  { num: '19', is: 'nítján', ipa: '[ˈniːtjaun]', uk: 'дев’ятнадцять', ex: 'nítján' },
  { num: '20', is: 'tuttugu', ipa: '[ˈtʰʏhtʏɣʏ]', uk: 'двадцять (tt ➔ [ht])', ex: 'tuttugu' },
  { num: 'Вік (ч.)', is: 'Hvað ertu gamall?', ipa: '[kʰvaːð ˈɛr̥tʏ ˈkaːmatl̥?]', uk: 'Скільки тобі років? (до чоловіка)', ex: 'Hvað ertu gamall?' },
  { num: 'Вік (ж.)', is: 'Hvað ertu gömul?', ipa: '[kʰvaːð ˈɛr̥tʏ ˈkœːmʏl?]', uk: 'Скільки тобі років? (до жінки)', ex: 'Hvað ertu gömul?' },
  { num: '25 років', is: 'Ég er tuttugu og fimm ára.', ipa: '[jɛːx ɛːr ˈtʰʏhtʏɣʏ ɔɣ fɪmː ˈauːra]', uk: 'Мені 25 років (ára = років у Родовому відмінку 🔴)', ex: 'Ég er tuttugu og fimm ára.' },
  { num: 'Шлюб', is: 'giftur (kk.) / gift (kvk.)', ipa: '[ˈcɪftʏr / cɪft]', uk: 'одружений / заміжня', ex: 'Ég er giftur.' },
  { num: 'Вільний', is: 'einhleypur (kk.) / einhleyp (kvk.)', ipa: '[ˈeinˌl̥eiːpʏr]', uk: 'неодружений / незаміжня', ex: 'Hún er einhleyp.' },
  { num: 'Пара', is: 'í sambúð', ipa: '[iː ˈsamˌpuːð]', uk: 'у цивільному шлюбі / живемо разом', ex: 'Við erum í sambúð.' }
];

export class VeraGrammarHub {
  constructor(container, grammarData) {
    this.container = container;
    this.data = grammarData;
    this.activeVerbKey = 'vera'; // 'vera' | 'heita' | 'tala' | 'bua' | 'laera' | 'vinna'
    this.selectedFormIndex = 0;
  }

  render() {
    const activeVerb = K1_VERB_PARADIGMS[this.activeVerbKey] || K1_VERB_PARADIGMS.vera;
    const currentForm = activeVerb.forms[this.selectedFormIndex] || activeVerb.forms[0];

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-cyber-border/30">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Урок 1 • Повна академічна граматика (Íslenska fyrir alla 1)
            </span>
            <h3 class="text-sm sm:text-base font-black text-white font-mono">
              ⚡ 6 базових дієслів, займенники, прийменники «frá / í / á» та числа 0–20
            </h3>
          </div>
          <span class="text-xs font-mono text-slate-400">5 фундаментальних таблиць • 100% озвучено</span>
        </div>

        <!-- ================= TABLE 1: 6-VERB CONJUGATION MATRIX + 10 PERSONAL PRONOUNS ================= -->
        <div class="p-3.5 sm:p-4 rounded-xl bg-cyber-deep/90 border border-cyan-500/30 shadow-md space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-lg">👑</span>
              <div>
                <h4 class="text-xs sm:text-sm font-black text-white font-mono leading-none">
                  Таблиця 1: Дієвідмінювання 6 головних дієслів Уроку 1 у теперішньому часі (Nútíð)
                </h4>
                <span class="text-[10px] text-slate-400">Оберіть дієслово (3 класи відмінювання) та натисніть на займенник, щоб почути вимову</span>
              </div>
            </div>
            <button id="play-selected-vera-btn" class="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold transition-all flex items-center gap-1 shadow-sm self-start sm:self-auto">
              <span>🔊 Слухати: «${currentForm.pronoun} ${currentForm.form}»</span>
            </button>
          </div>

          <!-- 6 Verb Switcher Tabs -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 pt-1">
            ${Object.entries(K1_VERB_PARADIGMS).map(([key, v]) => `
              <button data-verb-key="${key}" class="k1-verb-tab px-2.5 py-1.5 rounded-lg text-left font-mono text-xs transition-all border ${this.activeVerbKey === key ? 'bg-amber-400 text-black font-black border-amber-300 shadow-sm' : 'bg-black/50 text-slate-300 border-slate-800 hover:border-amber-400/60'}">
                <div class="font-bold">${v.infinitive}</div>
                <div class="text-[10px] opacity-80 font-sans truncate">${v.uk.split('(')[0]}</div>
              </button>
            `).join('')}
          </div>

          <!-- Active Verb Class Badge & Pedagogical Rule -->
          <div class="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans">
            <div class="flex items-start gap-2">
              <span class="text-base">💡</span>
              <div class="text-slate-200 leading-snug">
                <strong class="text-amber-300 font-mono">${activeVerb.infinitive} (${activeVerb.groupBadge}):</strong>
                ${activeVerb.ruleNote}
              </div>
            </div>
          </div>

          <!-- Pronoun Selector Chips (10 Forms) -->
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs font-mono">
            ${activeVerb.forms.map((f, idx) => `
              <button data-form-idx="${idx}" class="vera-chip p-2 rounded-lg text-left transition-all border ${this.selectedFormIndex === idx ? 'bg-cyan-500 text-black font-bold border-cyan-400 shadow-md shadow-cyan-500/20' : 'bg-black/50 text-slate-300 border-slate-800 hover:border-cyan-400 hover:text-white'}">
                <div class="flex items-center justify-between text-[10px] ${this.selectedFormIndex === idx ? 'text-black/80' : 'text-slate-400'}">
                  <span>${f.person}</span>
                  <span>🔊</span>
                </div>
                <div class="text-xs sm:text-sm font-bold mt-0.5">
                  ${f.pronoun} <span class="${this.selectedFormIndex === idx ? 'text-black underline' : 'text-cyan-300'}">${f.form}</span>
                </div>
                <div class="text-[10px] font-sans truncate ${this.selectedFormIndex === idx ? 'text-black/90' : 'text-slate-400'}">${f.trans}</div>
              </button>
            `).join('')}
          </div>

          <!-- Highlight Inspector Bar for Active Verb Form -->
          <div id="vera-inspector-bar" class="p-2.5 rounded-lg bg-black/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-3 flex-wrap">
              <div class="text-base font-black text-white font-mono flex items-center gap-1.5">
                <span class="text-cyan-300">${currentForm.pronoun}</span>
                <span class="text-amber-400">${currentForm.form}</span>
                <span class="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/30">${currentForm.ipa}</span>
              </div>
              <div class="text-slate-300 font-sans font-semibold">
                = «${currentForm.trans}» (${currentForm.person})
              </div>
            </div>
            <div class="text-[11px] text-emerald-300 font-mono">
              📌 Закон 3-ї особи множини: þeir (тільки чол.) • þær (тільки жін.) • þau (чол. + жін. разом!)
            </div>
          </div>
        </div>

        <!-- ================= TABLE 2: Í VS Á VS FRÁ + DATIVE CASE (ÞGF 🟡) ================= -->
        <div class="p-3.5 sm:p-4 rounded-xl bg-cyber-deep/90 border border-emerald-500/30 shadow-md space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1.5 border-b border-emerald-500/20">
            <div class="flex items-center gap-2">
              <span class="text-lg">🧭</span>
              <div>
                <h4 class="text-xs sm:text-sm font-black text-white font-mono">
                  Таблиця 2 (Íslenska fyrir alla 1): Де ти живеш? «búa í» проти «búa á» та «frá» (+ Þágufall 🟡)
                </h4>
                <p class="text-[11px] text-slate-300 font-sans">
                  Головна пастка для початківців: чому ми кажемо <strong class="text-cyan-300 font-mono">«í Reykjavík»</strong> та <strong class="text-cyan-300 font-mono">«í Úkraínu»</strong>, але <strong class="text-amber-300 font-mono">«á Íslandi»</strong> та <strong class="text-amber-300 font-mono">«á Akureyri»</strong>? Натисніть для прослуховування!
                </p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${PREPOSITIONS_PLACE_MATRIX.map(col => `
              <div class="p-3 rounded-xl bg-black/40 border border-${col.color}-500/30 space-y-2">
                <div class="pb-1 border-b border-slate-800">
                  <div class="text-xs font-black font-mono text-${col.color}-300">${col.prep} — ${col.title}</div>
                  <div class="text-[10px] font-sans text-slate-400">${col.subtitle}</div>
                </div>
                <div class="space-y-1.5">
                  ${col.items.map(item => `
                    <div class="k1-audio-phrase-card p-2 rounded-lg bg-black/50 border border-slate-800 hover:border-${col.color}-400 cursor-pointer transition-all group" data-phrase="${item.dat}">
                      <div class="flex items-center justify-between text-xs font-mono">
                        <span class="text-slate-400 text-[10px]">${item.nom} ➔</span>
                        <strong class="text-white group-hover:text-${col.color}-300">${item.dat}</strong>
                        <span class="text-[10px] text-cyan-400">${item.ipa} 🔊</span>
                      </div>
                      <div class="text-[11px] font-sans text-slate-300 mt-0.5">${item.uk}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Origin "frá" + Dative Summary Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1">
            ${this.data.dative_preposition_fra.rules.map(r => `
              <div class="k1-audio-phrase-card p-2 rounded-lg bg-black/50 border border-slate-800 hover:border-emerald-400 cursor-pointer transition-all space-y-0.5" data-phrase="${r.example_dat.split(',')[0].trim()}">
                <div class="flex items-center justify-between text-[10px]">
                  <span class="text-slate-300 font-bold">${r.category}</span>
                  <span class="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">${r.shift}</span>
                </div>
                <div class="flex items-center justify-between font-mono text-xs">
                  <span class="bin-aura bin-nf px-1.5 py-0.5 rounded text-cyan-300 font-bold">${r.example_nom}</span>
                  <span class="bin-aura bin-tgf px-1.5 py-0.5 rounded text-amber-300 font-bold">➔ ${r.example_dat} 🔊</span>
                </div>
                <div class="text-[10px] text-slate-400">${r.note}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ================= TABLE 3: WORD ORDER IN QUESTIONS (V2 VS V1) & ENCLITIC MERGERS (-TU / -ÐU) ================= -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          
          <!-- Left: V2 vs V1 Question Architecture + Negation -->
          <div class="p-3.5 rounded-xl bg-cyber-deep border border-rose-500/30 shadow-md space-y-2.5">
            <div class="flex items-center gap-2 pb-1 border-b border-rose-500/20 text-xs">
              <span class="text-lg">📐</span>
              <div>
                <h4 class="font-bold text-white font-mono leading-none">
                  Таблиця 3: Порядок слів у питаннях (V2 проти V1) та заперечення «ekki»
                </h4>
                <span class="text-[10px] text-rose-300 font-sans">Закон підручника Íslenska fyrir alla 1</span>
              </div>
            </div>

            <div class="space-y-2 text-xs">
              ${QUESTION_ARCHITECTURE.map(qa => `
                <div class="k1-audio-phrase-card p-2.5 rounded-lg bg-black/50 border border-slate-800 hover:border-rose-400 cursor-pointer transition-all space-y-1" data-phrase="${qa.example_is.split('(')[0].split('—')[0].trim()}">
                  <div class="flex items-center justify-between">
                    <strong class="text-rose-300 font-mono text-[11px]">${qa.type}</strong>
                    <span class="text-[10px] font-mono text-slate-400">🔊</span>
                  </div>
                  <div class="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded inline-block">${qa.formula}</div>
                  <div class="font-mono font-bold text-white text-xs">${qa.example_is}</div>
                  <div class="text-[11px] font-sans text-slate-300">${qa.example_uk}</div>
                </div>
              `).join('')}
            </div>

            <!-- Enclitic Mergers (-tu / -ðu) -->
            <div class="pt-1 space-y-1.5">
              <div class="text-[11px] font-mono font-bold text-amber-300">
                🔗 Живе злиття дієслова із займенником «þú» у питаннях (-tu / -ðu):
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                ${ENCLITIC_MERGERS.map(m => `
                  <div class="k1-audio-phrase-card p-1.5 rounded-lg bg-black/60 border border-slate-800 hover:border-amber-400 cursor-pointer transition-all" data-phrase="${m.ex}">
                    <div class="text-[10px] font-mono text-slate-400">${m.full} ➔</div>
                    <div class="font-mono font-bold text-amber-300 text-xs flex items-center justify-between">
                      <span>${m.merged}</span> <span>🔊</span>
                    </div>
                    <div class="text-[10px] font-sans text-slate-300 truncate">${m.uk}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Right: Question Words + Numbers 11-20 & Age/Marital Status -->
          <div class="space-y-3.5">
            <!-- Question Words (Spurnarorð) -->
            <div class="p-3.5 rounded-xl bg-cyber-deep border border-cyan-500/30 shadow-md space-y-2">
              <div class="flex items-center justify-between pb-1 border-b border-cyan-500/20 text-xs">
                <div class="flex items-center gap-1.5">
                  <span class="text-lg">❓</span>
                  <h4 class="font-bold text-white font-mono leading-none">Таблиця 4: Усі питальні слова Уроку 1 (Spurnarorð)</h4>
                </div>
                <span class="text-[10px] font-mono text-cyan-300">Натисніть для озвучення 🔊</span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs font-mono">
                ${this.data.question_words.map(q => `
                  <div class="p-2 rounded-lg bg-black/50 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer question-word-card" data-word="${q.example}">
                    <div class="flex items-center justify-between">
                      <strong class="text-cyan-300 text-xs sm:text-sm">${q.word}</strong>
                      <span class="text-[10px] text-slate-400">🔊</span>
                    </div>
                    <div class="text-[10px] text-cyan-400/80">${q.ipa}</div>
                    <div class="text-[11px] text-white font-sans font-medium">${q.meaning}</div>
                    <div class="text-[10px] text-amber-200/90 truncate mt-0.5" title="${q.example}">«${q.example}»</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Numbers 11-20, Age & Marital Status -->
            <div class="p-3.5 rounded-xl bg-cyber-deep border border-amber-500/30 shadow-md space-y-2">
              <div class="flex items-center justify-between pb-1 border-b border-amber-500/20 text-xs">
                <div class="flex items-center gap-1.5">
                  <span class="text-lg">🎂</span>
                  <h4 class="font-bold text-white font-mono leading-none">Таблиця 5: Числа 11–20, Вік (Aldur) та Сімейний стан</h4>
                </div>
                <span class="text-[10px] font-mono text-amber-300">Íslenska fyrir alla 1</span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                ${NUMBERS_11_20_AND_AGE.map(item => `
                  <div class="k1-audio-phrase-card p-1.5 rounded-lg bg-black/50 border border-slate-800 hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between group" data-phrase="${item.ex}">
                    <div class="flex items-center justify-between font-mono">
                      <span class="text-[10px] font-black text-amber-400">${item.num}</span>
                      <span class="text-[10px] text-slate-400 group-hover:text-cyan-300">🔊</span>
                    </div>
                    <div class="font-mono font-bold text-white text-[11px] leading-tight mt-0.5">${item.is}</div>
                    <div class="text-[9px] font-mono text-cyan-300">${item.ipa}</div>
                    <div class="text-[10px] font-sans text-slate-300 leading-tight mt-0.5">${item.uk}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // 6-Verb tabs
    this.container.querySelectorAll('.k1-verb-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.verbKey;
        if (key && K1_VERB_PARADIGMS[key]) {
          this.activeVerbKey = key;
          const activeVerb = K1_VERB_PARADIGMS[key];
          const formObj = activeVerb.forms[this.selectedFormIndex] || activeVerb.forms[0];
          audioEngine.playWord(`${formObj.pronoun} ${formObj.form}`, btn);
          this.render();
        }
      });
    });

    // Pronoun chip selection
    this.container.querySelectorAll('.vera-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.formIdx, 10);
        this.selectedFormIndex = idx;
        const activeVerb = K1_VERB_PARADIGMS[this.activeVerbKey] || K1_VERB_PARADIGMS.vera;
        const formObj = activeVerb.forms[idx];
        audioEngine.playWord(`${formObj.pronoun} ${formObj.form}`, btn);
        this.render();
      });
    });

    // Play selected verb form button
    const playVeraBtn = this.container.querySelector('#play-selected-vera-btn');
    if (playVeraBtn) {
      playVeraBtn.addEventListener('click', () => {
        const activeVerb = K1_VERB_PARADIGMS[this.activeVerbKey] || K1_VERB_PARADIGMS.vera;
        const formObj = activeVerb.forms[this.selectedFormIndex];
        audioEngine.playWord(`${formObj.pronoun} ${formObj.form}`, playVeraBtn);
      });
    }

    // Question word card clicks
    this.container.querySelectorAll('.question-word-card').forEach(card => {
      card.addEventListener('click', () => {
        const word = card.dataset.word;
        audioEngine.playWord(word, card);
      });
    });

    // Audio phrase cards (í vs á, enclitics, numbers 11-20, age)
    this.container.querySelectorAll('.k1-audio-phrase-card').forEach(card => {
      card.addEventListener('click', () => {
        const phrase = card.dataset.phrase;
        if (phrase) audioEngine.playWord(phrase, card);
      });
    });
  }
}
