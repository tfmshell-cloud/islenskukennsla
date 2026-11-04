/**
 * bin_grammar_matrix_data.js
 * Академічний морфологічний довідник BÍN (Beygingarlýsing íslensks nútímamáls) для рівня A1 (Модулі 0–3)
 * Включає:
 * 1. Таблицю відмінювання іменників у 4 відмінках однини (NF, ÞF, ÞGF, EF) + суфіксальний артикль (Greinir)
 * 2. Повні парадигми дієвідмінювання 10 ключових дієслів (3 класи дієслів + сильні дієслова)
 * 3. 4 фундаментальні граматичні таблиці (Артикль Greinir, Числівники 1–4, Подвійне керування í/á, Звукові мутації Hljóðvarp)
 */

export const BIN_NOUNS_PARADIGMS = [
  // MODULE 0 (15 ANCHOR NOUNS)
  {
    id: 'n_afi', mod: 'M0', lemma: 'afi', ipa: '[ˈaːvɪ]', uk: 'дідусь', gender: 'kk.', declClass: 'Слабка чол. (-i ➔ -a)',
    nf: 'afi', tf: 'afa', tgf: 'afa', ef: 'afa', defNf: 'afinn (цей дідусь)',
    rule: 'Слабка чоловіча відміна на -i: у всіх непрямих відмінках однини (ÞF, ÞGF, EF) закінчення змінюється на -a.'
  },
  {
    id: 'n_a', mod: 'M0', lemma: 'á', ipa: '[auː]', uk: 'річка', gender: 'kvk.', declClass: 'Сильна жін. на голосний',
    nf: 'á', tf: 'á', tgf: 'á', ef: 'ár', defNf: 'áin (ця річка)',
    rule: 'Односкладовий іменник жін. роду: NF/ÞF/ÞGF незмінні (á), у родовому відмінку додається -r (til ár).'
  },
  {
    id: 'n_bok', mod: 'M0', lemma: 'bók', ipa: '[pouːk]', uk: 'книга', gender: 'kvk.', declClass: 'Сильна коренева жін.',
    nf: 'bók', tf: 'bók', tgf: 'bók', ef: 'bókar', defNf: 'bókin (ця книга)',
    rule: 'Сильна жіноча відміна на приголосний: в однині NF = ÞF = ÞGF (bók). У множині зазнає I-мутації: bækur!'
  },
  {
    id: 'n_dagur', mod: 'M0', lemma: 'dagur', ipa: '[ˈtaːɣʏr]', uk: 'день', gender: 'kk.', declClass: 'Сильна чол. з переголосом',
    nf: 'dagur', tf: 'dag', tgf: 'degi', ef: 'dags', defNf: 'dagurinn (цей день)',
    rule: 'У знахідному відпадає -ur (Góðan dag!), а в давальному кореневий "a" переходить в "e" перед закінченням -i (á hverjum degi)!'
  },
  {
    id: 'n_madur', mod: 'M0', lemma: 'maður', ipa: '[ˈmaːðʏr]', uk: 'людина / чоловік', gender: 'kk.', declClass: 'Коренева чол. нерегулярна',
    nf: 'maður', tf: 'mann', tgf: 'manni', ef: 'manns', defNf: 'maðurinn (ця людина)',
    rule: 'Давня основа mann-: у знахідному відмінку maður переходить у mann [manː], у давальному — manni, у множині — menn!'
  },
  {
    id: 'n_epli', mod: 'M0', lemma: 'epli', ipa: '[ˈɛhplɪ]', uk: 'яблуко', gender: 'hk.', declClass: 'Середній рід на -i',
    nf: 'epli', tf: 'epli', tgf: 'epli', ef: 'eplis', defNf: 'eplið (це яблуко)',
    rule: 'Іменники середнього роду на -i мають однакову форму в NF, ÞF та ÞGF однини (epli), родовий додає -s (eplis).'
  },
  {
    id: 'n_fadir', mod: 'M0', lemma: 'faðir', ipa: '[ˈfaːðɪr]', uk: 'батько', gender: 'kk.', declClass: 'Спорідненість (-ir ➔ -ur)',
    nf: 'faðir', tf: 'föður', tgf: 'föður', ef: 'föður', defNf: 'faðirinn (батько)',
    rule: 'Термін спорідненості: у знахідному, давальному та родовому відмінках однини зазнає U-мутації: faðir ➔ föður [ˈfœːðʏr]!'
  },
  {
    id: 'n_gata', mod: 'M0', lemma: 'gata', ipa: '[ˈkaːta]', uk: 'вулиця', gender: 'kvk.', declClass: 'Слабка жін. (-a ➔ -u + U-мутація)',
    nf: 'gata', tf: 'götu', tgf: 'götu', ef: 'götu', defNf: 'gatan (ця вулиця)',
    rule: 'Подвійна зміна: закінчення -a переходить у -u, а коренева "a" через U-hljóðvarp перетворюється на "ö": gata ➔ götu!'
  },
  {
    id: 'n_hus', mod: 'M0', lemma: 'hús', ipa: '[huːs]', uk: 'будинок', gender: 'hk.', declClass: 'Сильна середня відміна',
    nf: 'hús', tf: 'hús', tgf: 'húsi', ef: 'húss', defNf: 'húsið (цей будинок)',
    rule: 'Класичний середній рід на приголосний: NF = ÞF (hús), у давальному додається -i (í húsi), у родовому — -s (húss).'
  },
  {
    id: 'n_is', mod: 'M0', lemma: 'ís', ipa: '[iːs]', uk: 'лід / морозиво', gender: 'kk.', declClass: 'Сильна чол. без -ur',
    nf: 'ís', tf: 'ís', tgf: 'ís', ef: 'íss', defNf: 'ísinn (це морозиво)',
    rule: 'Основа закінчується на -s, тому закінчення називного зливається з основою: einn ís (NF = ÞF).'
  },
  {
    id: 'n_kaffi', mod: 'M0', lemma: 'kaffi', ipa: '[ˈkʰafːɪ]', uk: 'кава', gender: 'hk.', declClass: 'Незлічуване сер. роду',
    nf: 'kaffi', tf: 'kaffi', tgf: 'kaffi', ef: 'kaffis', defNf: 'kaffið (ця кава)',
    rule: 'Абсолютно стабільне слово в NF, ÞF та ÞGF. З означеним артиклем — kaffið (Takk fyrir kaffið!).'
  },
  {
    id: 'n_land', mod: 'M0', lemma: 'land', ipa: '[lant]', uk: 'країна / земля', gender: 'hk.', declClass: 'Сильна середня відміна',
    nf: 'land', tf: 'land', tgf: 'landi', ef: 'lands', defNf: 'landið (ця країна)',
    rule: 'За цим зразком відмінюються всі країни на -land: Ísland ➔ frá Íslandi (ÞGF 🟡), til Íslands (EF 🌸)!'
  },
  {
    id: 'n_matur', mod: 'M0', lemma: 'matur', ipa: '[ˈmaːtʏr]', uk: 'їжа', gender: 'kk.', declClass: 'Сильна чол. (-ur ➔ -∅)',
    nf: 'matur', tf: 'mat', tgf: 'mat', ef: 'matar', defNf: 'maturinn (ця їжа)',
    rule: 'У знахідному та давальному відмінках суфікс -ur відпадає: borða morgunmat (ÞF 🟢).'
  },
  {
    id: 'n_nafn', mod: 'M0', lemma: 'nafn', ipa: '[napn̥]', uk: 'ім\'я', gender: 'hk.', declClass: 'Сильна середня відміна',
    nf: 'nafn', tf: 'nafn', tgf: 'nafni', ef: 'nafns', defNf: 'nafnið (це ім\'я)',
    rule: 'Фонетичне правило fn ➔ [pn] зберігається у всіх відмінках: með nafni [ˈnapnɪ].'
  },
  {
    id: 'n_sol', mod: 'M0', lemma: 'sól', ipa: '[souːl]', uk: 'сонце', gender: 'kvk.', declClass: 'Сильна жін. на приголосний',
    nf: 'sól', tf: 'sól', tgf: 'sólu / sól', ef: 'sólar', defNf: 'sólin (сонце)',
    rule: 'Жіночий рід: означений артикль додається як -in ➔ sólin [ˈsouːlɪn].'
  },

  // MODULE 1 (PROFESSIONS & COUNTRIES)
  {
    id: 'n_laeknir', mod: 'K1', lemma: 'læknir', ipa: '[ˈlaiːknɪr]', uk: 'лікар', gender: 'kk.', declClass: 'Сильна чол. на -ir',
    nf: 'læknir', tf: 'lækni', tgf: 'lækni', ef: 'læknis', defNf: 'læknirinn (цей лікар)',
    rule: 'Іменники чоловічого роду на -ir у знахідному та давальному відмінках втрачають кінцеве -r: læknir ➔ lækni.'
  },
  {
    id: 'n_kennari', mod: 'K1', lemma: 'kennari', ipa: '[ˈcʰɛnːarɪ]', uk: 'вчитель', gender: 'kk.', declClass: 'Слабка чол. на -ari',
    nf: 'kennari', tf: 'kennara', tgf: 'kennara', ef: 'kennara', defNf: 'kennarinn (цей вчитель)',
    rule: 'Усі професії на -ari (kennari, forritari, bakari) у ÞF, ÞGF та EF однини змінюють -i на -a (kennara).'
  },
  {
    id: 'n_thjonn', mod: 'K1', lemma: 'þjónn', ipa: '[θjouːtn̥]', uk: 'офіціант', gender: 'kk.', declClass: 'Сильна чол. на -nn',
    nf: 'þjónn', tf: 'þjón', tgf: 'þjóni', ef: 'þjóns', defNf: 'þjónninn (цей офіціант)',
    rule: 'У називному подвоєне -nn дає [tn], але в знахідному (þjón) та давальному (þjóni) залишається одне чисте [n]!'
  },
  {
    id: 'n_verkfraedingur', mod: 'K1', lemma: 'verkfræðingur', ipa: '[ˈvɛr̥kfraiðiŋkʏr]', uk: 'інженер', gender: 'kk.', declClass: 'Сильна чол. на -ingur',
    nf: 'verkfræðingur', tf: 'verkfræðing', tgf: 'verkfræðingi', ef: 'verkfræðings', defNf: 'verkfræðingurinn',
    rule: 'Усі слова на -ingur (Íslendingur, verkfræðingur, reikningur) відкидають -ur у знахідному та мають -i у давальному.'
  },
  {
    id: 'n_ukraina', mod: 'K1', lemma: 'Úkraína', ipa: '[ˈuːkraiːna]', uk: 'Україна', gender: 'kvk.', declClass: 'Слабка жін. (-a ➔ -u)',
    nf: 'Úkraína', tf: 'Úkraínu', tgf: 'Úkraínu', ef: 'Úkraínu', defNf: '— (власна назва)',
    rule: 'Еталон слабкої жіночої відміни: Úkraína (NF) ➔ til/frá/í Úkraínu (ÞF/ÞGF/EF).'
  },

  // MODULE 2 (CAFE & FOOD)
  {
    id: 'n_samloka', mod: 'K2', lemma: 'samloka', ipa: '[ˈsamˌlɔːka]', uk: 'сендвіч', gender: 'kvk.', declClass: 'Слабка жін. (-a ➔ -u)',
    nf: 'samloka', tf: 'samloku', tgf: 'samloku', ef: 'samloku', defNf: 'samlokan (цей сендвіч)',
    rule: 'При замовленні в кав\'ярні (Þolfall 🟢): ein samloka ➔ Ég ætla að fá eina samloku!'
  },
  {
    id: 'n_ponnukaka', mod: 'K2', lemma: 'pönnukaka', ipa: '[ˈpʰœnːʏˌkʰaːka]', uk: 'млинець', gender: 'kvk.', declClass: 'Слабка жін. + U-hljóðvarp',
    nf: 'pönnukaka', tf: 'pönnuköku', tgf: 'pönnuköku', ef: 'pönnuköku', defNf: 'pönnukakan',
    rule: 'Класична U-мутація: коренева "a" у слові kaka переходить у "ö" перед закінченням -u ➔ pönnuköku!'
  },
  {
    id: 'n_snudur', mod: 'K2', lemma: 'snúður', ipa: '[ˈstnuːðʏr]', uk: 'булочка з корицею', gender: 'kk.', declClass: 'Сильна чол. (-ur ➔ -∅)',
    nf: 'snúður', tf: 'snúð', tgf: 'snúð / snúði', ef: 'snúðs', defNf: 'snúðurinn (ця булочка)',
    rule: 'При замовленні суфікс -ur відлітає: einn snúður ➔ Ég ætla að fá einn snúð!'
  },
  {
    id: 'n_reikningur', mod: 'K2', lemma: 'reikningur', ipa: '[ˈreiknɪŋkʏr]', uk: 'рахунок (у кафе)', gender: 'kk.', declClass: 'Сильна чол. (-ur ➔ -∅)',
    nf: 'reikningur', tf: 'reikning', tgf: 'reikningi', ef: 'reiknings', defNf: 'reikningurinn (ÞF: reikninginn)',
    rule: 'Фраза «Можна рахунок?»: Get ég fengið reikninginn? (Знахідний відмінок з означеним артиклем -inn).'
  },

  // MODULE 3 (ROUTINE & TIME)
  {
    id: 'n_morgunn', mod: 'K3', lemma: 'morgunn', ipa: '[ˈmɔrkʏn]', uk: 'ранок', gender: 'kk.', declClass: 'Сильна чол. зі стисненням',
    nf: 'morgunn', tf: 'morgun', tgf: 'morgni', ef: 'morguns', defNf: 'morgunninn',
    rule: 'У давальному відмінку голосна "u" випадає (morgni). Вираз «вранці / щоранку» — á morgnana.'
  },
  {
    id: 'n_kvold', mod: 'K3', lemma: 'kvöld', ipa: '[kʰvœlt]', uk: 'вечір', gender: 'hk.', declClass: 'Сильна середня відміна',
    nf: 'kvöld', tf: 'kvöld', tgf: 'kvöldi', ef: 'kvölds', defNf: 'kvöldið (цей вечір)',
    rule: 'Вираз «увечері» (конкретний вечір) — um kvöldið (Знахідний відмінок середнього роду з артиклем -ið).'
  },
  {
    id: 'n_vinna', mod: 'K3', lemma: 'vinna', ipa: '[ˈvɪnːa]', uk: 'робота / праця', gender: 'kvk.', declClass: 'Слабка жін. (-a ➔ -u)',
    nf: 'vinna', tf: 'vinnu', tgf: 'vinnu', ef: 'vinnu', defNf: 'vinnan (ÞF: vinnuna / ÞGF: vinnunni)',
    rule: 'Контраст руху і місця: «іду на роботу» ➔ í vinnuna (ÞF 🟢), «я на роботі» ➔ í vinnunni (ÞGF 🟡)!'
  }
];

export const BIN_VERBS_PARADIGMS = [
  {
    id: 'v_vera', infinitive: 'að vera', ipa: '[að ˈvɛːra]', uk: 'бути (є)', group: 'Нерегулярне супплетивне дієслово',
    eg: 'ég er [ɛːr]', thu: 'þú ert [ɛr̥t]', hann: 'hann/hún/það er [ɛːr]',
    vid: 'við erum [ˈɛːrʏm]', thid: 'þið eruð [ˈɛːrʏð]', their: 'þeir/þær/þau eru [ˈɛːrʏ]',
    note: 'Фундамент мови: ніколи не опускається в теперішньому часі. Не змінює відмінок іменника після себе (іменний присудок теж у Називному NF 🔵: Ég er læknir).'
  },
  {
    id: 'v_heita', infinitive: 'að heita', ipa: '[að ˈheiːta]', uk: 'називатися / зватися', group: 'Група -i (2-й клас)',
    eg: 'ég heiti [ˈheiːtɪ]', thu: 'þú heitir [ˈheiːtɪr]', hann: 'hann/hún/það heitir [ˈheiːtɪr]',
    vid: 'við heitum [ˈheiːtʏm]', thid: 'þið heitið [ˈheiːtɪð]', their: 'þeir/þær/þau heita [ˈheiːta]',
    note: 'Увага на закінчення однини: 1 особа має -i (ég heiti), а 2 та 3 особи мають -ir (þú heitir, hann heitir).'
  },
  {
    id: 'v_tala', infinitive: 'að tala', ipa: '[að ˈtʰaːla]', uk: 'говорити / розмовляти', group: 'Група -a (1-й клас, найрегулярніший)',
    eg: 'ég tala', thu: 'þú talar', hann: 'hann/hún/það talar',
    vid: 'við tölum (U-мутація!)', thid: 'þið talið', their: 'þeir/þær/þau tala',
    note: 'Еталон 1-ї групи на -a: ég tala, þú talar, hann talar. У 1-й особі множини перед -um коренева "a" переходить в "ö": við tölum!'
  },
  {
    id: 'v_aetla', infinitive: 'að ætla', ipa: '[að ˈaihtla]', uk: 'збиратися / мати намір', group: 'Група -a (1-й клас)',
    eg: 'ég ætla', thu: 'þú ætlar', hann: 'hann/hún/það ætlar',
    vid: 'við ætlum', thid: 'þið ætlið', their: 'þeir/þær/þau ætla',
    note: 'Сполучення tl вимовляється з преаспірацією [aihtla]. Конструкція «Ég ætla að fá...» — стандарт замовлення в кав\'ярні чи ресторані.'
  },
  {
    id: 'v_vakna', infinitive: 'að vakna', ipa: '[að ˈvakna]', uk: 'прокидатися', group: 'Група -a (1-й клас)',
    eg: 'ég vakna', thu: 'þú vaknar', hann: 'hann/hún/það vaknar',
    vid: 'við vöknum (U-мутація!)', thid: 'þið vaknið', their: 'þeir/þær/þau vakna',
    note: 'Як і в усіх дієсловах з кореневим "a", у формі «ми прокидаємося» діє U-hljóðvarp: við vöknum!'
  },
  {
    id: 'v_borda', infinitive: 'að borða', ipa: '[að ˈpɔrða]', uk: 'їсти', group: 'Група -a (1-й клас) + Знахідний ÞF 🟢',
    eg: 'ég borða', thu: 'þú borðar', hann: 'hann/hún/það borðar',
    vid: 'við borðum', thid: 'þið borðið', their: 'þeir/þær/þau borða',
    note: 'Керує Знахідним відмінком (Þolfall 🟢): Ég borða morgunmat / súpu / samloku.'
  },
  {
    id: 'v_fara', infinitive: 'að fara', ipa: '[að ˈfaːra]', uk: 'йти / їхати / вирушати', group: 'Сильне дієслово (I-мутація a ➔ e в однині)',
    eg: 'ég fer [fɛːr]', thu: 'þú ferð [fɛrð]', hann: 'hann/hún/það fer [fɛːr]',
    vid: 'við förum [ˈfœːrʏm]', thid: 'þið farið [ˈfaːrɪð]', their: 'þeir/þær/þau fara [ˈfaːra]',
    note: 'Усі 3 форми однини змінюють корінь a ➔ e (ég fer, þú ferð, hann fer), а 1 ос. множини має U-мутацію (við förum)!'
  },
  {
    id: 'v_koma', infinitive: 'að koma', ipa: '[að ˈkʰɔːma]', uk: 'приходити / прибувати', group: 'Сильне дієслово (I-мутація o ➔ e в однині)',
    eg: 'ég kem [cʰɛːm]', thu: 'þú kemur [ˈcʰɛːmʏr]', hann: 'hann/hún/það kemur [ˈcʰɛːmʏr]',
    vid: 'við komum [ˈkʰɔːmʏm]', thid: 'þið komið [ˈkʰɔːmɪð]', their: 'þeir/þær/þau koma [ˈkʰɔːma]',
    note: 'В однині o переходить в e, через що початкове k стає м\'яким піднебінним [cʰ]: ég kem, þú kemur!'
  },
  {
    id: 'v_vinna', infinitive: 'að vinna', ipa: '[að ˈvɪnːa]', uk: 'працювати', group: 'Сильне дієслово (3-й клас)',
    eg: 'ég vinn [vɪnː]', thu: 'þú vinnur [ˈvɪnːʏr]', hann: 'hann/hún/það vinnur [ˈvɪnːʏr]',
    vid: 'við vinnum [ˈvɪnːʏm]', thid: 'þið vinnið [ˈvɪnːɪð]', their: 'þeir/þær/þau vinna [ˈvɪnːa]',
    note: 'У 1-й особі однини закінчення нульове (ég vinn), у 2-й та 3-й особах — закінчення -ur (þú vinnur, hann vinnur).'
  },
  {
    id: 'v_sofa', infinitive: 'að sofa', ipa: '[að ˈsɔːva]', uk: 'спати', group: 'Сильне дієслово (I-мутація o ➔ e в однині)',
    eg: 'ég sef [sɛːv]', thu: 'þú sefur [ˈsɛːvʏr]', hann: 'hann/hún/það sefur [ˈsɛːvʏr]',
    vid: 'við sofum [ˈsɔːvʏm]', thid: 'þið sofið [ˈsɔːvɪð]', their: 'þeir/þær/þau sofa [ˈsɔːva]',
    note: 'В однині кореневе o змінюється на e: ég sef (я сплю), þú sefur (ти спиш).'
  }
];

export const ACADEMIC_GRAMMAR_CODEX = [
  {
    id: 'codex_greinir',
    badge: 'Таблиця №1 • Означеність',
    title: 'Суфіксальний означений артикль (Viðskeyttur greinir: -inn / -in / -ið)',
    summary: 'В ісландській мові немає окремого артикля перед словом (як англ. "the"). Замість цього артикль приклеюється до КІНЦЯ іменника і змінюється разом із ним за родами та відмінками!',
    columns: ['Рід іменника', 'Базовий суфікс', 'Називний (NF 🔵)', 'Знахідний (ÞF 🟢)', 'Давальний (ÞGF 🟡)', 'Приклад у мовленні'],
    rows: [
      ['Чоловічий (kk.)', '-inn / -nn', 'reikningur-inn (рахунок)', 'reikning-inn', 'reikning-num', 'Get ég fengið reikninginn? (Дайте цей рахунок)'],
      ['Жіночий (kvk. на приг.)', '-in', 'bók-in (книга)', 'bók-ina', 'bók-inni', 'Bókin er á borðinu (Книга на столі)'],
      ['Жіночий (kvk. на -a)', '-n', 'vinna-n (робота)', 'vinnu-na', 'vinnu-nni', 'Ég fer í vinnuna (Іду на роботу)'],
      ['Середній (hk.)', '-ið / -ð', 'hús-ið / kaffi-ð', 'hús-ið / kaffi-ð', 'húsi-nu / kaffi-nu', 'Takk fyrir kaffið! (Дякую за цю каву!)']
    ]
  },
  {
    id: 'codex_numerals',
    badge: 'Таблиця №2 • Числівники 1–4',
    title: 'Трьохродова система числівників 1–4 (Чому в Ісландії рахують за родами)',
    summary: 'Числівники від 1 до 4 в ісландській мові узгоджуються за родом (чоловічий, жіночий, середній) та відмінком із тим предметом, який ви рахуєте або замовляєте:',
    columns: ['Число', 'Чол. рід (kk. NF ➔ ÞF)', 'Жін. рід (kvk. NF ➔ ÞF)', 'Сер. рід (hk. NF = ÞF)', 'Живий приклад замовлення (Þolfall 🟢)'],
    rows: [
      ['1 (один/одна/одне)', 'einn ➔ einn', 'ein ➔ eina', 'eitt ➔ eitt', 'einn snúð (kk.) • eina samloku (kvk.) • eitt kaffi (hk.)'],
      ['2 (два/дві)', 'tveir ➔ tvo', 'tvær ➔ tvær', 'tvö ➔ tvö', 'tvo snúða (kk.) • tvær samlokur (kvk.) • tvö epli (hk.)'],
      ['3 (три)', 'þrír ➔ þrjá', 'þrjár ➔ þrjár', 'þrjú ➔ þrjú', 'þrjá bjóra (kk.) • þrjár kökur (kvk.) • þrjú glös (hk.)'],
      ['4 (чотири)', 'fjórir ➔ fjóra', 'fjórar ➔ fjórar', 'fjögur ➔ fjögur', 'fjóra stóla (kk.) • fjórar bækur (kvk.) • fjögur ár (hk.)']
    ]
  },
  {
    id: 'codex_prepositions',
    badge: 'Таблиця №3 • Просторовий синтаксис',
    title: 'Подвійне керування прийменників «í» (в/на) та «á» (на): Рух (ÞF 🟢) проти Місця (ÞGF 🟡)',
    summary: 'Як і в українській мові («іду в школу [Зн.в.]» проти «сиджу в школі [Місц.в.]»), прийменники «í» та «á» керують двома різними відмінками залежно від динаміки дії:',
    columns: ['Питання та семантика', 'Відмінок BÍN', 'Зі словом «vinna» (робота)', 'Зі словом «Reykjavík»', 'Зі словом «Ísland» (острів — прийменник á!)'],
    rows: [
      ['КУДИ? (Рух, напрямок, зміна місця)', 'Þolfall 🟢 (Знахідний)', 'Ég fer í vinnuna (Іду на роботу)', 'Ég fer í Reykjavík / til Reykjavíkur', 'Ég flýg á Ísland / til Íslands'],
      ['ДЕ? (Перебування на місці, статика)', 'Þágufall 🟡 (Давальний)', 'Ég er í vinnunni (Я на роботі)', 'Ég bý í Reykjavík (Живу в Рейк\'явіку)', 'Ég bý á Íslandi (Живу в Ісландії — «на острові»!)']
    ]
  },
  {
    id: 'codex_umlauts',
    badge: 'Таблиця №4 • Фонетичні закони основи',
    title: 'Закони переголосу голосних: U-hljóðvarp (a ➔ ö) та I-hljóðvarp (a/o ➔ e)',
    summary: 'Коренева голосна в ісландському слові змінюється не хаотично, а за двома математичними законами впливу закінчення на корінь:',
    columns: ['Тип мутації', 'Формула переходу', 'Коли спрацьовує?', 'Приклади в іменниках', 'Приклади в дієсловах'],
    rows: [
      ['U-hljóðvarp (U-умлаут)', 'a ➔ ö (або a ➔ u в ненагол.)', 'Коли в наступному складі з\'являється звук -u (-u, -um, -ur) або історично був звук u', 'kaka ➔ köku, gata ➔ götu, barn ➔ börn (мн.)', 'tala ➔ við tölum, vakna ➔ við vöknum, fara ➔ við förum'],
      ['I-hljóðvarp (I-умлаут)', 'a ➔ e • o ➔ e • á ➔ æ • ú/jó ➔ ý', 'В однині сильних дієслів та у множині кореневих іменників', 'dagur ➔ degi (ÞGF), bók ➔ bækur (мн.), maður ➔ menn', 'fara ➔ ég fer, koma ➔ ég kem, sofa ➔ ég sef']
    ]
  }
];
