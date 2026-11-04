/**
 * k4_clothing_data.js - Academic Dataset for Lesson 4 (Kafli 4: Föt, litir og lýsingarorð)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 1 (Kafli 5: Föt og litir, pp. 78-95)
 * - Tölum saman 2022 (Vinnufatnaður, öryggi & lagaskipting)
 * - Viltu læra íslensku? (Þættir 4 & 5: Í fatabúð og verslunarmiðstöð)
 * - Litli málfræðingurinn & Árnastofnun (BÍN strong adjective declension & U-umlaut)
 */

export const K4_CLOTHING_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Урок 4: Одяг, кольори та узгодження прикметників",
  titleIsl: "Kafli 4: Föt, litir og lýsingarorð",
  level: "A1.2 (ÍFA 1 Kafli 5)",

  // 1. CLOTHING VOCABULARY BY GENDER (BÍN 4-Case Mappings)
  vocabulary: [
    // KARLKYN (MASCULINE)
    {
      id: "bolur",
      gender: "kk",
      genderLabel: "Чол. рід (kk.)",
      is: "bolur",
      ipa: "[ˈpɔːlʏr]",
      ukr: "футболка / теніска",
      plural: "bolir",
      defSingular: "bolurinn",
      defPlural: "bolirnir",
      icon: "👕",
      category: "top",
      samplePhrase: "Ég fer í rauðan bol.",
      sampleUkr: "Я вдягаю червону футболку."
    },
    {
      id: "frakki",
      gender: "kk",
      genderLabel: "Чол. рід (kk.)",
      is: "frakki",
      ipa: "[ˈfraʰkɪ]",
      ukr: "чоловіче пальто",
      plural: "frakkar",
      defSingular: "frakkinn",
      defPlural: "frakkarnir",
      icon: "🧥",
      category: "outerwear",
      samplePhrase: "Hann er í svörtum frakka.",
      sampleUkr: "Він у чорному пальті."
    },
    {
      id: "jakki",
      gender: "kk",
      genderLabel: "Чол. рід (kk.)",
      is: "jakki",
      ipa: "[ˈjahkɪ]",
      ukr: "піджак / куртка",
      plural: "jakkar",
      defSingular: "jakkinn",
      defPlural: "jakkarnir",
      icon: "👔",
      category: "outerwear",
      samplePhrase: "Má ég máta þennan bláa jakka?",
      sampleUkr: "Чи можу я поміряти цей синій піджак?"
    },
    {
      id: "trefill",
      gender: "kk",
      genderLabel: "Чол. рід (kk.)",
      is: "trefill",
      ipa: "[ˈtrɛːvɪtl̥]",
      ukr: "шарф",
      plural: "treflar",
      defSingular: "trefillinn",
      defPlural: "treflarnir",
      icon: "🧣",
      category: "accessory",
      samplePhrase: "Gleymdu ekki treflinum!",
      sampleUkr: "Не забудь шарф!"
    },
    {
      id: "kjóll",
      gender: "kk",
      genderLabel: "Чол. рід (kk.)",
      is: "kjóll",
      ipa: "[couːtl̥]",
      ukr: "сукня (в ісландській — чол. роду!)",
      plural: "kjólar",
      defSingular: "kjóllinn",
      defPlural: "kjólarnir",
      icon: "👗",
      category: "top",
      samplePhrase: "Þessi kjóll er mjög fallegur.",
      sampleUkr: "Ця сукня дуже гарна."
    },
    {
      id: "skór",
      gender: "kk",
      genderLabel: "Чол. рід (kk. ft.)",
      is: "skór",
      ipa: "[skouːr]",
      ukr: "черевики / взуття (pl. skór)",
      plural: "skór",
      defSingular: "skórinn",
      defPlural: "skórnir",
      icon: "👞",
      category: "footwear",
      samplePhrase: "Við förum úr skónum inni.",
      sampleUkr: "Ми знімаємо взуття всередині будинку."
    },
    {
      id: "sokkar",
      gender: "kk",
      genderLabel: "Чол. рід (kk. ft.)",
      is: "sokkar",
      ipa: "[ˈsɔhk-ar]",
      ukr: "шкарпетки (pl.)",
      plural: "sokkar",
      defSingular: "sokkurinn",
      defPlural: "sokkarnir",
      icon: "🧦",
      category: "footwear",
      samplePhrase: "Ullarsokkar eru nauðsynlegir á Íslandi.",
      sampleUkr: "Вовняні шкарпетки обов'язкові в Ісландії."
    },
    {
      id: "vettlingar",
      gender: "kk",
      genderLabel: "Чол. рід (kk. ft.)",
      is: "vettlingar",
      ipa: "[ˈvɛht-liŋgar]",
      ukr: "рукавиці без пальців / шорсткі рукавиці",
      plural: "vettlingar",
      defSingular: "vettlingurinn",
      defPlural: "vettlingarnir",
      icon: "🧤",
      category: "accessory",
      samplePhrase: "Ég prjónaði hlýja vettlinga.",
      sampleUkr: "Я сплела теплі рукавиці."
    },

    // KVENKYN (FEMININE)
    {
      id: "ulpa",
      gender: "kvk",
      genderLabel: "Жін. рід (kvk.)",
      is: "úlpa",
      ipa: "[ˈulpa]",
      ukr: "зимова парка / тепла куртка",
      plural: "úlpur",
      defSingular: "úlpan",
      defPlural: "úlpurnar",
      icon: "🧥",
      category: "outerwear",
      samplePhrase: "Ég fer í svarta úlpu.",
      sampleUkr: "Я вдягаю чорну куртку."
    },
    {
      id: "peysa",
      gender: "kvk",
      genderLabel: "Жін. рід (kvk.)",
      is: "peysa",
      ipa: "[ˈpʰeiːsa]",
      ukr: "светр (зокрема lopapeysa)",
      plural: "peysur",
      defSingular: "peysan",
      defPlural: "peysurnar",
      icon: "🧶",
      category: "top",
      samplePhrase: "Íslensk lopapeysa er vatnsfráhrindandi.",
      sampleUkr: "Ісландський вовняний светр відштовхує воду."
    },
    {
      id: "hufa",
      gender: "kvk",
      genderLabel: "Жін. рід (kvk.)",
      is: "húfa",
      ipa: "[ˈhuːva]",
      ukr: "шапка",
      plural: "húfur",
      defSingular: "húfan",
      defPlural: "húfurnar",
      icon: "🧢",
      category: "accessory",
      samplePhrase: "Ertu með rauða húfu?",
      sampleUkr: "У тебе є червона шапка?"
    },
    {
      id: "kapa",
      gender: "kvk",
      genderLabel: "Жін. рід (kvk.)",
      is: "kápa",
      ipa: "[ˈkʰauːpa]",
      ukr: "жіноче пальто",
      plural: "kápur",
      defSingular: "kápan",
      defPlural: "kápurnar",
      icon: "🧥",
      category: "outerwear",
      samplePhrase: "Hún kaupir nýja kápu í Kringlunni.",
      sampleUkr: "Вона купує нове пальто в Крінглані."
    },
    {
      id: "buxur",
      gender: "kvk",
      genderLabel: "Жін. рід (kvk. ft.)",
      is: "buxur",
      ipa: "[ˈpʏxsʏr]",
      ukr: "штани (завжди множина в жін. роді!)",
      plural: "buxur",
      defSingular: "buxurnar",
      defPlural: "buxurnar",
      icon: "👖",
      category: "bottom",
      samplePhrase: "Hann er í bláum buxum.",
      sampleUkr: "Він у синіх штанях (ÞGF: buxum)."
    },

    // HVORUGKYN (NEUTER)
    {
      id: "pils",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "pils",
      ipa: "[pʰɪls]",
      ukr: "спідниця",
      plural: "pils",
      defSingular: "pilsið",
      defPlural: "pilsin",
      icon: "👗",
      category: "bottom",
      samplePhrase: "Hún er í stuttu pilsi.",
      sampleUkr: "Вона в короткій спідниці."
    },
    {
      id: "vesti",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "vesti",
      ipa: "[ˈvɛstɪ]",
      ukr: "жилет / жилетка",
      plural: "vesti",
      defSingular: "vestið",
      defPlural: "vestin",
      icon: "🦺",
      category: "outerwear",
      samplePhrase: "Öryggisvesti er nauðsynlegt í vinnunni.",
      sampleUkr: "Сигнальний жилет обов'язковий на роботі."
    },
    {
      id: "bindi",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "bindi",
      ipa: "[ˈpɪntɪ]",
      ukr: "краватка",
      plural: "bindi",
      defSingular: "bindið",
      defPlural: "bindin",
      icon: "👔",
      category: "accessory",
      samplePhrase: "Hann er með rautt bindi.",
      sampleUkr: "У нього червона краватка."
    },
    {
      id: "belti",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "belti",
      ipa: "[ˈpɛl̥tɪ]",
      ukr: "ремінь / пояс",
      plural: "belti",
      defSingular: "beltið",
      defPlural: "beltin",
      icon: "🥋",
      category: "accessory",
      samplePhrase: "Spennir þú biltið?",
      sampleUkr: "Ти застібаєш ремінь?"
    },
    {
      id: "naerfot",
      gender: "hk",
      genderLabel: "Сер. рід (hk. ft.)",
      is: "nærföt",
      ipa: "[ˈnair-fœːt]",
      ukr: "термобілизна / спідній одяг",
      plural: "nærföt",
      defSingular: "nærfötin",
      defPlural: "nærfötin",
      icon: "🩳",
      category: "base_layer",
      samplePhrase: "Ullarnærföt eru fyrsta lag í vetrarkulda.",
      sampleUkr: "Вовняна термобілизна — це перший шар у зимовий холод."
    }
  ],

  // 2. LITIR OG STERK BEYGING LÝSINGARORÐA (COLORS & STRONG ADJECTIVE PARADIGMS)
  colors: [
    {
      id: "raudur",
      nameUkr: "червоний",
      hex: "#EF4444",
      kk: "rauður",
      kvk: "rauð",
      hk: "rautt",
      kkAcc: "rauðan",
      kvkAcc: "rauða",
      hkAcc: "rautt",
      kkDat: "rauðum",
      kvkDat: "rauðri",
      hkDat: "rauðu",
      pluralKk: "rauðir",
      pluralKvk: "rauðar",
      pluralHk: "rauð",
      ruleNote: "Класична сильна парадигма: -ur / - / -tt."
    },
    {
      id: "blar",
      nameUkr: "синій / блакитний",
      hex: "#3B82F6",
      kk: "blár",
      kvk: "blá",
      hk: "blátt",
      kkAcc: "bláan",
      kvkAcc: "bláa",
      hkAcc: "blátt",
      kkDat: "bláum",
      kvkDat: "blárri",
      hkDat: "bláu",
      pluralKk: "bláir",
      pluralKvk: "bláar",
      pluralHk: "blá",
      ruleNote: "Основа закінчується на голосний -á: подвійне -tt у середньому роді."
    },
    {
      id: "svartur",
      nameUkr: "чорний (з U-умлаутом!)",
      hex: "#1E293B",
      kk: "svartur",
      kvk: "svört",
      hk: "svart",
      kkAcc: "svartan",
      kvkAcc: "svarta",
      hkAcc: "svart",
      kkDat: "svörtum",
      kvkDat: "svartri",
      hkDat: "svörtu",
      pluralKk: "svartir",
      pluralKvk: "svartar",
      pluralHk: "svört",
      ruleNote: "⚠️ U-умлаут: коренева 'a' переходить у 'ö' у жін. роді однини (svört) та середньому роді множини (svört)!"
    },
    {
      id: "hvitur",
      nameUkr: "білий (з преаспірацією)",
      hex: "#F8FAFC",
      kk: "hvítur",
      kvk: "hvít",
      hk: "hvítt",
      kkAcc: "hvítan",
      kvkAcc: "hvíta",
      hkAcc: "hvítt",
      kkDat: "hvítum",
      kvkDat: "hvítri",
      hkDat: "hvítu",
      pluralKk: "hvítir",
      pluralKvk: "hvítar",
      pluralHk: "hvít",
      ruleNote: "Фонетична пастка: 'hvítt' вимовляється з преаспірацією [kvi:ʰt]!"
    },
    {
      id: "graenn",
      nameUkr: "зелений",
      hex: "#10B981",
      kk: "grænn",
      kvk: "græn",
      hk: "grænt",
      kkAcc: "grænan",
      kvkAcc: "græna",
      hkAcc: "grænt",
      kkDat: "grænum",
      kvkDat: "grænni",
      hkDat: "grænu",
      pluralKk: "grænir",
      pluralKvk: "grænar",
      pluralHk: "græn",
      ruleNote: "Основа на -n: у чол. роді подвійне -nn (grænn), у сер. роді -nt (grænt)."
    },
    {
      id: "gulur",
      nameUkr: "жовтий",
      hex: "#F59E0B",
      kk: "gulur",
      kvk: "gul",
      hk: "gult",
      kkAcc: "gulan",
      kvkAcc: "gula",
      hkAcc: "gult",
      kkDat: "gulum",
      kvkDat: "gulri",
      hkDat: "gulu",
      pluralKk: "gulir",
      pluralKvk: "gular",
      pluralHk: "gul",
      ruleNote: "Базова регулярна сильна відміна: gulur, gul, gult."
    },
    {
      id: "grar",
      nameUkr: "сірий",
      hex: "#64748B",
      kk: "grár",
      kvk: "grá",
      hk: "grátt",
      kkAcc: "gráan",
      kvkAcc: "gráa",
      hkAcc: "grátt",
      kkDat: "gráum",
      kvkDat: "grárri",
      hkDat: "gráu",
      pluralKk: "gráir",
      pluralKvk: "gráar",
      pluralHk: "grá",
      ruleNote: "Голосна основа: grár, grá, grátt."
    },
    {
      id: "brunn",
      nameUkr: "коричневий",
      hex: "#78350F",
      kk: "brúnn",
      kvk: "brún",
      hk: "brúnt",
      kkAcc: "brúnan",
      kvkAcc: "brúna",
      hkAcc: "brúnt",
      kkDat: "brúnum",
      kvkDat: "brúnni",
      hkDat: "brúnu",
      pluralKk: "brúnir",
      pluralKvk: "brúnar",
      pluralHk: "brún",
      ruleNote: "Основа на -n: brúnn, brún, brúnt."
    }
  ],

  // 3. ESSENTIAL ADJECTIVES FOR CLOTHING
  adjectives: [
    {
      id: "hlyr",
      ukr: "теплий",
      kk: "hlýr",
      kvk: "hlý",
      hk: "hlýtt",
      kkAcc: "hlýjan",
      kvkAcc: "hlýja",
      hkAcc: "hlýtt",
      kkDat: "hlýjum",
      kvkDat: "hlýrri",
      hkDat: "hlýju",
      note: "Критично для ісландського клімату: hlý peysa, hlýr jakki."
    },
    {
      id: "dyr",
      ukr: "дорогий",
      kk: "dýr",
      kvk: "dýr",
      hk: "dýrt",
      kkAcc: "dýran",
      kvkAcc: "dýra",
      hkAcc: "dýrt",
      kkDat: "dýrum",
      kvkDat: "dýrri",
      hkDat: "dýru",
      note: "Цінова оцінка в магазині: Þetta er of dýrt!"
    },
    {
      id: "odyr",
      ukr: "дешевий",
      kk: "ódýr",
      kvk: "ódýr",
      hk: "ódýrt",
      kkAcc: "ódýran",
      kvkAcc: "ódýra",
      hkAcc: "ódýrt",
      kkDat: "ódýrum",
      kvkDat: "ódýrri",
      hkDat: "ódýru",
      note: "Áttu eitthvað ódýrara?"
    },
    {
      id: "litill",
      ukr: "маленький",
      kk: "lítill",
      kvk: "lítil",
      hk: "lítið",
      kkAcc: "lítinn",
      kvkAcc: "litla",
      hkAcc: "lítið",
      kkDat: "litlum",
      kvkDat: "lítilli",
      hkDat: "litlu",
      note: "Нерегулярна сильна відміна з випадінням 'í' перед 'l' (litla, litlum)."
    },
    {
      id: "stor",
      ukr: "великий",
      kk: "stór",
      kvk: "stór",
      hk: "stórt",
      kkAcc: "stóran",
      kvkAcc: "stóra",
      hkAcc: "stórt",
      kkDat: "stórum",
      kvkDat: "stórri",
      hkDat: "stóru",
      note: "Розмірні категорії: Er þetta of stórt?"
    }
  ],

  // 4. VERB GOVERNANCE & PHRASAL EQUATIONS (FATA-REGLUR)
  verbs: [
    {
      id: "fara_i",
      inf: "að fara í",
      governs: "Þolfall (ÞF 🟢)",
      meaning: "одягати щось на себе (напрямок)",
      formula: "fara í + ÞF (🟢)",
      conjugationPres: {
        eg: "fer í",
        thu: "ferð í",
        hann: "fer í",
        vid: "förum í",
        thid: "farið í",
        their: "fara í"
      },
      examples: [
        { is: "Ég fer í svarta úlpu.", ukr: "Я вдягаю чорну куртку (úlpa -> úlpu 🟢)." },
        { is: "Hann fer í nýja skó.", ukr: "Він узуває нові черевики (skór -> skó 🟢)." }
      ]
    },
    {
      id: "fara_ur",
      inf: "að fara úr",
      governs: "Þágufall (ÞGF 🟡)",
      meaning: "знімати щось із себе (роздягатися)",
      formula: "fara úr + ÞGF (🟡)",
      conjugationPres: {
        eg: "fer úr",
        thu: "ferð úr",
        hann: "fer úr",
        vid: "förum úr",
        thid: "farið úr",
        their: "fara úr"
      },
      examples: [
        { is: "Ég fer úr úlpunni.", ukr: "Я знімаю куртку (úlpa -> úlpunni 🟡)." },
        { is: "Við förum úr skónum á ganginum.", ukr: "Ми знімаємо взуття в коридорі (skór -> skónum 🟡)." }
      ]
    },
    {
      id: "vera_i",
      inf: "að vera í",
      governs: "Þágufall (ÞGF 🟡)",
      meaning: "бути одягненим у щось (стан)",
      formula: "vera í + ÞGF (🟡)",
      conjugationPres: {
        eg: "er í",
        thu: "ert í",
        hann: "er í",
        vid: "erum í",
        thid: "eruð í",
        their: "eru í"
      },
      examples: [
        { is: "Hún er í hlýrri lopapeysu.", ukr: "Вона в теплій лопапейсі (hlý peysa -> hlýrri lopapeysu 🟡)." },
        { is: "Ég er í bláum buxum.", ukr: "Я в синіх штанях (buxur -> buxum 🟡)." }
      ]
    },
    {
      id: "mata",
      inf: "að máta",
      governs: "Þolfall (ÞF 🟢)",
      meaning: "приміряти одяг",
      formula: "máta + ÞF (🟢)",
      conjugationPres: {
        eg: "máta",
        thu: "mátar",
        hann: "mátar",
        vid: "mátum",
        thid: "mátið",
        their: "máta"
      },
      examples: [
        { is: "Má ég máta þessa peysu?", ukr: "Можна я приміряю цей светр? (peysa -> peysu 🟢)." }
      ]
    }
  ],

  // 5. WEATHER & LAYERING SIMULATOR PRESETS (LAGASKIPTING)
  layeringScenarios: [
    {
      id: "mild",
      titleUkr: "Літній день у Рейк'явіку (+13°C, вітерець)",
      titleIsl: "Sumardagur í Reykjavík",
      temp: "+13°C",
      weather: "Місцями сонячно, свіжий бриз із моря",
      idealLayers: [
        { layer: "Grunnlag (Базовий шар)", item: "Bolur (футболка)", correct: true },
        { layer: "Millilag (Середній шар)", item: "Létt peysa eða jakki (легка кофта)", correct: true },
        { layer: "Ytralag (Зовнішній шар)", item: "Engin þung úlpa þörf (парка не потрібна)", correct: true },
        { layer: "Neðri hluti (Низ)", item: "Léttar buxur og strigaskór (штани та кросівки)", correct: true }
      ],
      warningUkr: "Влітку в Ісландії погода мінлива: навіть коли сонце світить, завжди тримайте легку вітрівку в рюкзаку!"
    },
    {
      id: "autumn_rain",
      titleUkr: "Осінній дощ та штормовий вітер (+5°C, дощ 18 м/с)",
      titleIsl: "Haustrigning og hvassviðri",
      temp: "+5°C",
      weather: "Шквалистий дощ, боковий вітер",
      idealLayers: [
        { layer: "Grunnlag", item: "Langerma bolur (кофта з довгим рукавом)", correct: true },
        { layer: "Millilag", item: "Hlý ullarpeysa (вовняний светр)", correct: true },
        { layer: "Ytralag", item: "Vatnsheld og vindheld úlpa (непромокальна куртка з мембраною Gore-Tex)", correct: true },
        { layer: "Fylgihlutir", item: "Húfa og vatnsheldir skór (шапка та водонепроникні черевики)", correct: true }
      ],
      warningUkr: "Парасольки в Ісландії марні — вітер 18 м/с їх просто ламає! Лише якісний дощовик або куртка з глибоким каптуром."
    },
    {
      id: "arctic_blizzard",
      titleUkr: "Арктична завірюха на півночі (-6°C, мороз & буран)",
      titleIsl: "Vetrarstormur á Norðurlandi",
      temp: "-6°C",
      weather: "Буран, ожеледиця, вітер 22 м/с",
      idealLayers: [
        { layer: "1. lag (Grunnlag)", item: "Ullarnærföt (термобілизна з мериносової вовни top + buxur)", correct: true },
        { layer: "2. lag (Millilag)", item: "Íslensk lopapeysa eða flíspeysa (лопапейса)", correct: true },
        { layer: "3. lag (Ytralag)", item: "Dúnúlpa með hettu (пуховик із захистом від вітру)", correct: true },
        { layer: "Aukahlutir", item: "Vettlingar, hlý húfa, trefill og mannbroddar (рукавиці, шапка, шарф і льодоступи)", correct: true }
      ],
      warningUkr: "Правило рятувальників Landsbjörg: шерсть гріє навіть у вологому стані, тоді як бавовна охолоджує тіло."
    }
  ],

  // 6. STORE DIALOGUES (Í FATABÚÐINNI)
  dialogues: [
    {
      id: "lopapeysa_shop",
      titleUkr: "Діалог 1: Купівля лопапейси в ремісничій крамниці",
      titleIsl: "Í Handprjónasambandinu: Að kaupa lopapeysu",
      lines: [
        {
          speaker: "Gunnar",
          role: "Starfsmaður (Продавець)",
          is: "Góðan daginn! Get ég aðstoðað þig?",
          ipa: "[ˈkouːðan ˈtaːjɪn kɛːt jɛːx ˈaθstɔːðað θɪx]",
          ukr: "Доброго дня! Чи можу я вам допомогти?",
          note: "aðstoða e-n (+ ÞF) — допомагати комусь"
        },
        {
          speaker: "Поліна",
          role: "Viðskiptavinur (Покупчиня)",
          is: "Já, takk. Ég er að leita að hlýrri lopapeysu.",
          ipa: "[jauː tʰahk jɛːx ɛr aː ˈleiːta aːð ˈl̥iːrɪ ˈlɔːpaˌpʰeiːsʏ]",
          ukr: "Так, дякую. Я шукаю теплий вовняний светр (лопапейсу).",
          note: "að leita að e-u (+ ÞGF 🟡) — шукати щось"
        },
        {
          speaker: "Gunnar",
          role: "Starfsmaður",
          is: "Hvaða stærð ert þú í? Við eigum Small, Medium og Large.",
          ipa: "[ˈkʰvaːða staiːrð ɛrt θuː iː viːð ˈeiːjʏm smɔːl ˈmɛːtjʏm ɔːɣ lartʃ]",
          ukr: "Який у вас розмір? У нас є S, M та L.",
          note: "Hvaða stærð ert þú í? — стандартна ісландська фраза про розмір"
        },
        {
          speaker: "Поліна",
          role: "Viðskiptavinur",
          is: "Ég er vanalega í stærð Medium. Áttu þessa í svörtum og hvítum lit?",
          ipa: "[jɛːx ɛr ˈvaːnaˌlɛːɣa iː staiːrð ˈmɛːtjʏm auːhtʏ ˈθɛsːa iː ˈsvœrtʏm ɔːɣ ˈkviːtʏm lɪːt]",
          ukr: "Я зазвичай ношу розмір М. Чи є у вас ця в чорно-білому кольорі?",
          note: "í svörtum og hvítum lit (ÞGF після í)"
        },
        {
          speaker: "Gunnar",
          role: "Starfsmaður",
          is: "Já, hérna er hún! Má ég bjóða þér að máta hana?",
          ipa: "[jauː ˈhjɛrtna ɛr huːn mauː jɛːx ˈpjouːða θjɛːr aːð ˈmauːta ˈhaːna]",
          ukr: "Так, ось вона! Бажаєте поміряти?",
          note: "að máta e-ð (+ ÞF) — приміряти"
        },
        {
          speaker: "Поліна",
          role: "Viðskiptavinur",
          is: "Já, hvar er mátunarklefinn?",
          ipa: "[jauː kʰvaːr ɛr ˈmauːtʏnarˌkʰlɛːvɪn]",
          ukr: "Так, а де примірочна кабінка?",
          note: "Mátunarklefi — примірочна"
        },
        {
          speaker: "Gunnar",
          role: "Starfsmaður",
          is: "Mátunarklefinn er þarna til hægri við spegilinn.",
          ipa: "[ˈmauːtʏnarˌkʰlɛːvɪn ɛr ˈθartna tʰɪl ˈhaiːɣrɪ vɪð ˈspɛːjɪlɪn]",
          ukr: "Примірочна он там праворуч біля дзеркала.",
          note: "til hægri við — праворуч від"
        }
      ]
    },
    {
      id: "shoe_fitting",
      titleUkr: "Діалог 2: Вибір водонепроникного взуття в Kringlan",
      titleIsl: "Í skóbúð í Kringlunni: Gönguskór",
      lines: [
        {
          speaker: "Остап",
          role: "Kaupandi (Покупець)",
          is: "Góðan daginn. Eru þessir skór vatnsheldir?",
          ipa: "[ˈkouːðan ˈtaːjɪn ˈɛːrʏ ˈθɛsːɪr skouːr ˈvasːˌhɛltɪr]",
          ukr: "Доброго дня. Чи ці черевики водонепроникні?",
          note: "vatnsheldur (kk.) / vatnsheld (kvk.) / vatnshelt (hk.)"
        },
        {
          speaker: "Guðrún",
          role: "Afgreiðslukona (Продавчиня)",
          is: "Já, þeir eru með Gore-Tex filmu og mjög hlýir.",
          ipa: "[jauː θeiːr ˈɛːrʏ mɛð ˈɡɔr-tɛks ˈfɪlmʏ ɔːɣ mjœːɣ ˈl̥iːɪr]",
          ukr: "Так, вони з мембраною Gore-Tex і дуже теплі.",
          note: "hlýr -> pl. hlýir (kk. ft.)"
        },
        {
          speaker: "Остап",
          role: "Kaupandi",
          is: "Frábært! Hvað kosta þeir?",
          ipa: "[ˈfrauːpairt kʰvaːð ˈkʰɔsta θeiːr]",
          ukr: "Чудово! Скільки вони коштують?",
          note: "Hvað kosta þeir? (pl. skór)"
        },
        {
          speaker: "Guðrún",
          role: "Afgreiðslukona",
          is: "Þeir kosta tuttugu og níu þúsund krónur. Þeir eru á tilboði í dag!",
          ipa: "[θeiːr ˈkʰɔsta ˈtʏhtʏɣʏ ɔːɣ ˈniːjʏ ˈθuːsʏnt ˈkʰrouːnʏr]",
          ukr: "Вони коштують двадцять дев'ять тисяч крон. Сьогодні вони на знижці!",
          note: "á tilboði — на розпродажі / знижці"
        }
      ]
    }
  ]
};
