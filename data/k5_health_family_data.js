/**
 * k5_health_family_data.js - Academic Dataset for Lesson 5 (Kafli 5: Fjölskyldan, líkaminn og heilsan)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 1 (Kafli 6: Fjölskyldan og líkaminn, pp. 96-115)
 * - Tölum saman 2022 (Slys, veikindi & Heilsuvera)
 * - Viltu læra íslensku? (Þættir 6, 7 & 10: Á heilsugæslunni, í apóteki, fjölskylda)
 * - Litli málfræðingurinn & Árnastofnun (Ópersónulegar sagnir, eignarfornöfn, R-fallbeyging ættingja)
 */

export const K5_HEALTH_FAMILY_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Урок 5: Сім'я, анатомія, здоров'я та безособові конструкції відчуттів",
  titleIsl: "Kafli 5: Fjölskyldan, líkaminn og heilsan",
  level: "A1.3 (ÍFA 1 Kafli 6)",

  // 1. FAMILY & KINSHIP (FJÖLSKYLDAN) WITH IRREGULAR STEM PARADIGMS
  familyMembers: [
    {
      id: "fadir",
      gender: "kk",
      is: "faðir",
      ipa: "[ˈfaːðɪr]",
      ukr: "батько (тато)",
      plural: "feður",
      acc: "föður",
      dat: "föður",
      gen: "föður",
      defSingular: "faðirinn",
      defPlural: "feðurnir",
      ruleNote: "⚠️ Історична R-відміна: в усіх непрямих відмінках однини корінь змінюється на föður (U-умлаут a -> ö)!",
      samplePhrase: "Faðir minn heitir Jón.",
      sampleUkr: "Мого батька звати Йон."
    },
    {
      id: "modir",
      gender: "kvk",
      is: "móðir",
      ipa: "[ˈmouːðɪr]",
      ukr: "мати (мама)",
      plural: "mæður",
      acc: "móður",
      dat: "móður",
      gen: "móður",
      defSingular: "móðirin",
      defPlural: "mæðurnar",
      ruleNote: "⚠️ В непрямих відмінках однини: móður. У множині I-умлаут ó -> æ: mæður!",
      samplePhrase: "Ég hringi í móður mína.",
      sampleUkr: "Я телефоную своїй мамі (ÞF: móður mína)."
    },
    {
      id: "brodir",
      gender: "kk",
      is: "bróðir",
      ipa: "[ˈprouːðɪr]",
      ukr: "брат",
      plural: "bræður",
      acc: "bróður",
      dat: "bróður",
      gen: "bróður",
      defSingular: "bróðirinn",
      defPlural: "bræðurnir",
      ruleNote: "⚠️ Непрямі відмінки: bróður. Множина з I-умлаутом: bræður.",
      samplePhrase: "Hann á einn bróður.",
      sampleUkr: "У нього є один брат."
    },
    {
      id: "systir",
      gender: "kvk",
      is: "systir",
      ipa: "[ˈsɪstɪr]",
      ukr: "сестра",
      plural: "systur",
      acc: "systur",
      dat: "systur",
      gen: "systur",
      defSingular: "systirin",
      defPlural: "systurnar",
      ruleNote: "⚠️ Непрямі відмінки та множина мають основу systur.",
      samplePhrase: "Systir mín býr í Kópavogi.",
      sampleUkr: "Моя сестра живе в Коупавогюрі."
    },
    {
      id: "sonur",
      gender: "kk",
      is: "sonur",
      ipa: "[ˈsɔːnʏr]",
      ukr: "син",
      plural: "synir",
      acc: "son",
      dat: "syni",
      gen: "sonar",
      defSingular: "sonurinn",
      defPlural: "synirnir",
      ruleNote: "⚠️ У давальному відмінку I-умлаут o -> y: syni! У родовому закінчення -ar: sonar.",
      samplePhrase: "Þetta er sonur minn.",
      sampleUkr: "Це мій син."
    },
    {
      id: "dottir",
      gender: "kvk",
      is: "dóttir",
      ipa: "[ˈtouhtɪr]",
      ukr: "донька",
      plural: "dætur",
      acc: "dóttur",
      dat: "dóttur",
      gen: "dóttur",
      defSingular: "dóttirin",
      defPlural: "dæturnar",
      ruleNote: "⚠️ Преаспірація перед tt: [touhtɪr]. Непрямі відмінки: dóttur. Множина: dætur.",
      samplePhrase: "Dóttir mín er sex ára.",
      sampleUkr: "Моїй доньці шість років."
    },
    {
      id: "afi",
      gender: "kk",
      is: "afi",
      ipa: "[ˈaːvɪ]",
      ukr: "дідусь",
      plural: "afar",
      acc: "afa",
      dat: "afa",
      gen: "afa",
      defSingular: "afinn",
      defPlural: "afarnir",
      ruleNote: "Слабка відміна чол. роду: afi -> afa.",
      samplePhrase: "Afi minn segir sögur.",
      sampleUkr: "Мій дідусь розповідає історії."
    },
    {
      id: "amma",
      gender: "kvk",
      is: "amma",
      ipa: "[ˈamːa]",
      ukr: "бабуся",
      plural: "ömmur",
      acc: "ömmu",
      dat: "ömmu",
      gen: "ömmu",
      defSingular: "amman",
      defPlural: "ömmurnar",
      ruleNote: "Слабка відміна жін. роду з U-умлаутом: amma -> ömmu.",
      samplePhrase: "Amma bakar pönnukökur.",
      sampleUkr: "Бабуся пече млинці."
    },
    {
      id: "eiginmadur",
      gender: "kk",
      is: "eiginmaður",
      ipa: "[ˈeiːjɪnˌmaːðʏr]",
      ukr: "чоловік (у шлюбі)",
      plural: "eiginmenn",
      acc: "eiginmann",
      dat: "eiginmanni",
      gen: "eiginmanns",
      defSingular: "eiginmaðurinn",
      defPlural: "eiginmennirnir",
      ruleNote: "Складне слово: eigin + maður (maður відмінюється нерегулярно: mann, manni, manns).",
      samplePhrase: "Eiginmaður hennar vinnur á Akureyri.",
      sampleUkr: "Її чоловік працює в Акюрейрі."
    },
    {
      id: "eiginkona",
      gender: "kvk",
      is: "eiginkona",
      ipa: "[ˈeiːjɪnˌkʰɔːna]",
      ukr: "дружина (у шлюбі)",
      plural: "eiginkonur",
      acc: "eiginkonu",
      dat: "eiginkonu",
      gen: "eiginkonu",
      defSingular: "eiginkonan",
      defPlural: "eiginkonurnar",
      ruleNote: "Складне слово: eigin + kona (велика форма: konan, konur).",
      samplePhrase: "Eiginkona mín er læknir.",
      sampleUkr: "Моя дружина — лікарка."
    },
    {
      id: "barn",
      gender: "hk",
      is: "barn",
      ipa: "[partn̥]",
      ukr: "дитина",
      plural: "börn",
      acc: "barn",
      dat: "barni",
      gen: "barns",
      defSingular: "barnið",
      defPlural: "börnin",
      ruleNote: "⚠️ U-умлаут у множині: barn -> börn! Боковий вибух у вимові: [partn̥].",
      samplePhrase: "Eigið þið börn?",
      sampleUkr: "Чи маєте ви дітей?"
    },
    {
      id: "foreldrar",
      gender: "kk",
      is: "foreldrar",
      ipa: "[ˈfɔrˌɛlt-rar]",
      ukr: "батьки (лише множина)",
      plural: "foreldrar",
      acc: "foreldra",
      dat: "foreldrum",
      gen: "foreldra",
      defSingular: "—",
      defPlural: "foreldrarnir",
      ruleNote: "Іменник вживається переважно у множині.",
      samplePhrase: "Foreldrar mínir búa í Úkraínu.",
      sampleUkr: "Мої батьки живуть в Україні."
    }
  ],

  // 2. BODY ANATOMY (LÍKAMINN)
  bodyParts: [
    {
      id: "hofud",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "höfuð",
      ipa: "[ˈhœːvʏð]",
      ukr: "голова",
      defSingular: "höfuðið",
      datSingular: "höfði / höfðinu",
      icon: "🧠",
      painPhrase: "Mér er illt í höfðinu.",
      painUkr: "У мене болить голова."
    },
    {
      id: "hals",
      gender: "kk",
      genderLabel: "Чол. рід (kk.)",
      is: "háls",
      ipa: "[hauls]",
      ukr: "горло / шия",
      defSingular: "hálsinn",
      datSingular: "hálsi / hálsinum",
      icon: "🧣",
      painPhrase: "Mér er illt í hálsinum.",
      painUkr: "У мене болить горло (ангіна)."
    },
    {
      id: "magi",
      gender: "kk",
      genderLabel: "Чол. рід (kk.)",
      is: "magi",
      ipa: "[ˈmaːjɪ]",
      ukr: "живіт / шлунок",
      defSingular: "maginn",
      datSingular: "maga / maganum",
      icon: "🫄",
      painPhrase: "Mér er illt í maganum.",
      painUkr: "У мене болить живіт."
    },
    {
      id: "bak",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "bak",
      ipa: "[paːk]",
      ukr: "спина",
      defSingular: "bakið",
      datSingular: "baki / bakinu",
      icon: "🧍",
      painPhrase: "Mér er illt í bakinu.",
      painUkr: "У мене болить спина."
    },
    {
      id: "tonn",
      gender: "kvk",
      genderLabel: "Жін. рід (kvk.)",
      is: "tönn",
      ipa: "[tʰœnː]",
      ukr: "зуб",
      defSingular: "tönnin",
      datSingular: "tönn / tönninni",
      icon: "🦷",
      painPhrase: "Mér er illt í tönninni.",
      painUkr: "У мене болить зуб (потрібен tannlæknir)."
    },
    {
      id: "eyra",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "eyra",
      ipa: "[ˈeiːra]",
      ukr: "вухо",
      defSingular: "eyrað",
      datSingular: "eyra / eyranu",
      icon: "👂",
      painPhrase: "Mér er illt í eyrinu.",
      painUkr: "У мене болить вухо."
    },
    {
      id: "auga",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "auga",
      ipa: "[ˈœyːɣa]",
      ukr: "око",
      defSingular: "augað",
      datSingular: "auga / auganu",
      icon: "👁️",
      painPhrase: "Mér er illt í augunum.",
      painUkr: "У мене болять очі."
    },
    {
      id: "oxl",
      gender: "kvk",
      genderLabel: "Жін. рід (kvk.)",
      is: "öxl",
      ipa: "[œksl̥]",
      ukr: "плече",
      defSingular: "öxlin",
      datSingular: "öxl / öxlinni",
      icon: "🦾",
      painPhrase: "Mér er illt í öxlinni.",
      painUkr: "У мене болить плече."
    },
    {
      id: "hond",
      gender: "kvk",
      genderLabel: "Жін. рід (kvk.)",
      is: "hönd",
      ipa: "[hœnt]",
      ukr: "рука (кисть)",
      defSingular: "höndin",
      datSingular: "hendi / hendinni",
      icon: "✋",
      painPhrase: "Mér er illt í hendinni.",
      painUkr: "У мене болить рука (кисть)."
    },
    {
      id: "fotur",
      gender: "kk",
      genderLabel: "Чол. рід (kk.)",
      is: "fótur",
      ipa: "[ˈfouːtʏr]",
      ukr: "нога / стопа",
      defSingular: "fóturinn",
      datSingular: "fæti / fætinum",
      icon: "🦵",
      painPhrase: "Mér er illt í fætinum.",
      painUkr: "У мене болить нога."
    },
    {
      id: "hne",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "hné",
      ipa: "[n̥jɛː]",
      ukr: "коліно",
      defSingular: "hnéð",
      datSingular: "hné / hnénu",
      icon: "🧎",
      painPhrase: "Mér er illt í hnénu.",
      painUkr: "У мене болить коліно."
    },
    {
      id: "brjost",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "brjóst",
      ipa: "[prjoust]",
      ukr: "груди / грудна клітка",
      defSingular: "brjóstið",
      datSingular: "brjósti / brjóstinu",
      icon: "🫀",
      painPhrase: "Mér er illt í brjóstinu.",
      painUkr: "У мене біль у грудях (терміновий симптом!)."
    }
  ],

  // 3. IMPERSONAL CONSTRUCTIONS (ÓPERSÓNULEGAR SAGNIR)
  impersonalConstructions: [
    {
      id: "mer_er_illt",
      formula: "Mér er illt í + ÞGF (🟡)",
      meaningUkr: "У мене болить...",
      governsCase: "Þágufall (Давальний 🟡)",
      paradigm: [
        { pers: "Mér", is: "Mér er illt í...", ukr: "У мене болить..." },
        { pers: "Þér", is: "Þér er illt í...", ukr: "У тебе болить..." },
        { pers: "Honum", is: "Honum er illt í...", ukr: "У нього болить..." },
        { pers: "Henni", is: "Henni er illt í...", ukr: "У неї болить..." },
        { pers: "Okkur", is: "Okkur er illt í...", ukr: "У нас болить..." },
        { pers: "Ykkur", is: "Ykkur er illt í...", ukr: "У вас болить..." },
        { pers: "Þeim", is: "Þeim er illt í...", ukr: "У них болить..." }
      ],
      rule: "Суб'єкт завжди стоїть у давальному відмінку (ÞGF: Mér, Þér, Honum, Henni), а дієслово 'vera' застигає в 3-й особі однини 'er'."
    },
    {
      id: "mer_er_kalt_heitt",
      formula: "Mér er kalt / heitt / óglatt (ÞGF 🟡)",
      meaningUkr: "Мені холодно / гаряче / мене нудить",
      governsCase: "Þágufall (Давальний 🟡)",
      paradigm: [
        { pers: "Mér", is: "Mér er kalt.", ukr: "Мені холодно." },
        { pers: "Mér", is: "Mér er heitt.", ukr: "Мені гаряче." },
        { pers: "Mér", is: "Mér er óglatt.", ukr: "Мене нудить." },
        { pers: "Mér", is: "Mér batnar.", ukr: "Мені стає краще." },
        { pers: "Mér", is: "Mér versnar.", ukr: "Мені гіршає." }
      ],
      rule: "Фізичні стани організму передаються давальним відмінком особи + сер. рід прикметника (kalt, heitt)."
    },
    {
      id: "mig_langar",
      formula: "Mig langar í + ÞF / að + nh. (🟢)",
      meaningUkr: "Я хочу (мені хочеться)",
      governsCase: "Þolfall (Знахідний 🟢)",
      paradigm: [
        { pers: "Mig", is: "Mig langar í vatn.", ukr: "Я хочу води (vatn -> ÞF)." },
        { pers: "Þig", is: "Þig langar að hvílast.", ukr: "Ти хочеш відпочити." },
        { pers: "Hann", is: "Hann langar í verkjalyf.", ukr: "Він хоче знеболювальне." },
        { pers: "Hana", is: "Hana langar að fara heim.", ukr: "Вона хоче піти додому." }
      ],
      rule: "⚠️ Пастка: дієслово 'að langa' вимагає ЗНАХІДНОГО відмінка (ÞF 🟢: Mig, Þig, Hann, Hana), а не давального!"
    },
    {
      id: "mer_finnst",
      formula: "Mér finnst + NF (🔵)",
      meaningUkr: "На мою думку / мені здається",
      governsCase: "Þágufall (Давальний 🟡) + Називний (NF 🔵)",
      paradigm: [
        { pers: "Mér", is: "Mér finnst þetta gott.", ukr: "Мені здається, це добре." },
        { pers: "Þér", is: "Hvernig finnst þér?", ukr: "Як тобі здається?" }
      ],
      rule: "Дієслово особистої думки 'finnst' вимагає суб'єкта в давальному відмінку (Mér, Þér, Honum)."
    }
  ],

  // 4. MEDICAL & PHARMACY DIALOGUES (Á HEILSUGÆSLUNNI OG Í APÓTEKI)
  dialogues: [
    {
      id: "doctor_visit",
      titleUkr: "Діалог 1: Візит до дільничного лікаря в Heilsugæslan",
      titleIsl: "Á heilsugæslunni: Hjá heimilislækni",
      lines: [
        {
          speaker: "Gunnar",
          role: "Læknir (Лікар)",
          is: "Góðan daginn! Hvað er að angra þig?",
          ipa: "[ˈkouːðan ˈtaːjɪn kʰvaːð ɛr aːð ˈaŋk-ra θɪx]",
          ukr: "Доброго дня! Що вас турбує?",
          note: "Hvað er að angra þig? — класичне медичне запитання лікаря"
        },
        {
          speaker: "Поліна",
          role: "Sjúklingur (Пацієнтка)",
          is: "Góðan daginn. Mér er mjög illt í hálsinum og ég er með háan hita.",
          ipa: "[ˈkouːðan ˈtaːjɪn mjɛːr ɛr mjœːx ɪl̥t iː ˈhaul-sɪnʏm ɔːɣ jɛːx ɛr mɛð ˈhauːan ˈhɪːta]",
          ukr: "Доброго дня. У мене дуже болить горло і висока температура.",
          note: "vera með hita — мати температуру / гарячку"
        },
        {
          speaker: "Gunnar",
          role: "Læknir",
          is: "Jæja, viltu opna munninn og segja 'Aaaa'? Já, hálsinn er mjög rauður. Þetta er líklega hálsbólga.",
          ipa: "[ˈjaiːja ˈvɪl̥tʏ ˈɔhp-na ˈmʏnːɪn ɔːɣ ˈseiːja aːː jauː ˈhaulsɪn ɛr mjœːx ˈrœyːðʏr ˈθɛhta ɛr ˈliːklɛːɣa ˈhaulsˌpoulka]",
          ukr: "Так, будь ласка, відкрийте рот і скажіть 'Ааа'. Так, горло дуже червоне. Це, швидше за все, ангіна.",
          note: "Hálsbólga — тонзиліт / ангіна"
        },
        {
          speaker: "Поліна",
          role: "Sjúklingur",
          is: "Þarf ég sýklalyf eða bara verkjalyf?",
          ipa: "[θarf jɛːx ˈsiːklaˌlɪːv ˈɛːða ˈpaːra ˈvɛrkaˌlɪːv]",
          ukr: "Мені потрібні антибіотики чи лише знеболювальне?",
          note: "Sýklalyf — антибіотики; Verkjalyf — знеболювальне"
        },
        {
          speaker: "Gunnar",
          role: "Læknir",
          is: "Ég sendi rafrænan lyfseðil í lyfjagáttina. Þú getur sótt lyfin í hvaða apótek sem er með kennitölu.",
          ipa: "[jɛːx ˈsɛntɪ ˈrav-raiːnan ˈlɪv-sɛːðɪl iː ˈlɪvjaˌkauht-ɪna θuː ˈcɛːtʏr souht ˈlɪːvɪn iː ˈkʰvaːða ˈaːpouˌtʰɛːk sɛm ɛr mɛð ˈcʰɛnːɪˌtʰœːlʏ]",
          ukr: "Я надіслав електронний рецепт у медичну базу. Ви можете забрати ліки в будь-якій аптеці за вашою кенніталою.",
          note: "Rafrænn lyfseðill — електронний рецепт у системі Heilsuvera"
        }
      ]
    },
    {
      id: "pharmacy_visit",
      titleUkr: "Діалог 2: Купівля ліків в аптеці Lyfja",
      titleIsl: "Í apótekinu: Afgreiðsla lyfja",
      lines: [
        {
          speaker: "Guðrún",
          role: "Lyfjafræðingur (Фармацевтка)",
          is: "Góðan daginn! Get ég hjálpað þér?",
          ipa: "[ˈkouːðan ˈtaːjɪn cɛːt jɛːx ˈçaulpað θjɛːr]",
          ukr: "Доброго дня! Можу вам допомогти?",
          note: "hjálpa e-m (+ ÞGF 🟡) — допомагати комусь"
        },
        {
          speaker: "Остап",
          role: "Viðskiptavinur (Клієнт)",
          is: "Góðan daginn. Læknirinn sendi lyfseðil á kennitöluna mína.",
          ipa: "[ˈkouːðan ˈtaːjɪn ˈlaihk-nɪrɪn ˈsɛntɪ ˈlɪv-sɛːðɪl auː ˈcʰɛnːɪˌtʰœːlʏna ˈmiːna]",
          ukr: "Доброго дня. Лікар надіслав рецепт на мою кенніталу.",
          note: "á kennitöluna mína (ÞF)"
        },
        {
          speaker: "Guðrún",
          role: "Lyfjafræðingur",
          is: "Hér eru sýklalyfin. Taktu eina töflu tvisvar á dag með mat í sjö daga. Ekki hætta fyrr!",
          ipa: "[çɛːr ˈɛːrʏ ˈsiːklaˌlɪːvɪn ˈtʰahtʏ ˈeiːna ˈtʰœflʏ ˈtvɪs-var auː taːx mɛð maːt iː sjœː ˈtaːɣa ˈɛhc-kɪ ˈhaihta fɪrː]",
          ukr: "Ось ваші антибіотики. Приймайте одну таблетку двічі на день під час їжі протягом семи днів. Не кидайте раніше!",
          note: "Tvisvar á dag — двічі на день"
        },
        {
          speaker: "Остап",
          role: "Viðskiptavinur",
          is: "Skilið. Áttu líka hálstöflur og nefúða?",
          ipa: "[ˈskɪːlɪð auːhtʏ ˈliːka ˈhaulsˌtʰœflʏr ɔːɣ ˈnɛːvˌuːða]",
          ukr: "Зрозуміло. Чи є у вас також льодяники для горла та спрей для носа?",
          note: "Hálstöflur (льодяники від болю в горлі), Nefúði (спрей для носа)"
        },
        {
          speaker: "Guðrún",
          role: "Lyfjafræðingur",
          is: "Já, hérna eru hálstöflur með hunangi. Það verða fjögur þúsund og fimm hundruð krónur.",
          ipa: "[jauː ˈhjɛrtna ˈɛːrʏ ˈhaulsˌtʰœflʏr mɛð ˈhʏːnaŋcɪ θaːð ˈvɛrða ˈfjœːɣʏr ˈθuːsʏnt ɔːɣ fɪm ˈhʏntrʏð ˈkʰrouːnʏr]",
          ukr: "Так, ось льодяники з медом. Разом чотири тисячі п'ятсот крон.",
          note: "Það verða... — З вас буде..."
        }
      ]
    }
  ]
};
