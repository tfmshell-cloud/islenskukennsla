/**
 * k6_food_data.js - Academic Dataset for Lesson 6 (Kafli 6: Matur, eldamennska og veitingahús)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 1 (Kafli 7: Matur og drykkur, pp. 116-135)
 * - Tölum saman 2022 (Eldhúsið, matarvenjur & veitingahús)
 * - Viltu læra íslensku? (Þættir 3 & 9: Í matvöruverslun og á veitingastað)
 * - Litli málfræðingurinn & Árnastofnun BÍN (Partitive syntax: af + ÞGF 🟡, eldunarsagnir)
 */

export const K6_FOOD_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Урок 6: Їжа, кулінарія, ресторан та кількісні конструкції (af + ÞGF)",
  titleIsl: "Kafli 6: Matur, eldamennska og veitingahús",
  level: "A1.3 (ÍFA 1 Kafli 7)",

  // 1. FOOD & DRINK VOCABULARY BY CATEGORY
  vocabulary: [
    // MEAT & FISH (KJÖT OG FISKUR)
    {
      id: "lambakjot",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "lambakjöt",
      ipa: "[ˈlampaˌcʰœːt]",
      ukr: "ісландська баранина / ягнятина",
      defSingular: "lambakjötið",
      category: "meat_fish",
      icon: "🥩",
      samplePhrase: "Íslenskt lambakjöt er heimsþekkt fyrir bragðgæði.",
      sampleUkr: "Ісландська баранина всесвітньо відома своїм смаком."
    },
    {
      id: "fiskur",
      gender: "kk",
      genderLabel: "Чол. рід (kk.)",
      is: "fiskur",
      ipa: "[ˈfɪskʏr]",
      ukr: "риба (загальна назва)",
      plural: "fiskar",
      defSingular: "fiskurinn",
      category: "meat_fish",
      icon: "🐟",
      samplePhrase: "Hver er fiskur dagsins?",
      sampleUkr: "Яка риба дня сьогодні?"
    },
    {
      id: "lax",
      gender: "kk",
      genderLabel: "Чол. рід (kk.)",
      is: "lax",
      ipa: "[laks]",
      ukr: "лосось / сьомга",
      plural: "laxar",
      defSingular: "laxinn",
      category: "meat_fish",
      icon: "🍣",
      samplePhrase: "Ég ætla að fá stektan lax.",
      sampleUkr: "Я візьму смаженого лосося (ÞF: stektan lax)."
    },
    {
      id: "thorskur",
      gender: "kk",
      genderLabel: "Чол. рід (kk.)",
      is: "þorskur",
      ipa: "[ˈθɔrskʏr]",
      ukr: "тріска",
      plural: "þorskar",
      defSingular: "þorskurinn",
      category: "meat_fish",
      icon: "🎣",
      samplePhrase: "Þorskur er mikilvægasti útflutningsfiskur Íslands.",
      sampleUkr: "Тріска — найважливіша експортна риба Ісландії."
    },
    {
      id: "kjuklingur",
      gender: "kk",
      genderLabel: "Чол. рід (kk.)",
      is: "kjúklingur",
      ipa: "[ˈcʰuːkliŋkʏr]",
      ukr: "курка / курча",
      plural: "kjúklingar",
      defSingular: "kjúklingurinn",
      category: "meat_fish",
      icon: "🍗",
      samplePhrase: "Viltu kjúkling eða fisk?",
      sampleUkr: "Ти хочеш курку чи рибу?"
    },

    // DAIRY & TRADITIONAL (MJÓLKURVÖRUR OG HEFÐIR)
    {
      id: "skyr",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "skyr",
      ipa: "[scɪːr]",
      ukr: "скір (традиційний густий ісландський кисломолочний сир/йогурт)",
      defSingular: "skyrið",
      category: "dairy",
      icon: "🥣",
      samplePhrase: "Skyr er prótínríkt og fitusnautt.",
      sampleUkr: "Скір багатий на протеїн і має низький вміст жиру."
    },
    {
      id: "mjolk",
      gender: "kvk",
      genderLabel: "Жін. рід (kvk.)",
      is: "mjólk",
      ipa: "[mjoul̥k]",
      ukr: "молоко",
      defSingular: "mjólkin",
      category: "dairy",
      icon: "🥛",
      samplePhrase: "Má bjóða þér mjólk í kaffið?",
      sampleUkr: "Бажаєте молока в каву?"
    },
    {
      id: "smjor",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "smjör",
      ipa: "[smjœːr]",
      ukr: "масло (ісландське Smjör)",
      defSingular: "smjörið",
      category: "dairy",
      icon: "🧈",
      samplePhrase: "Ég smyr brauðið með smjöri.",
      sampleUkr: "Я мажу хліб маслом (ÞGF: smjöri)."
    },
    {
      id: "ostur",
      gender: "kk",
      genderLabel: "Чол. рід (kk.)",
      is: "ostur",
      ipa: "[ˈɔstʏr]",
      ukr: "твердий сир",
      plural: "ostar",
      defSingular: "osturinn",
      category: "dairy",
      icon: "🧀",
      samplePhrase: "Má ég fá tvær sneiðar af osti?",
      sampleUkr: "Можна мені дві скибки сиру?"
    },

    // BREAD & PRODUCE (BRAUÐ OG GRÆNMETI)
    {
      id: "braud",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "brauð",
      ipa: "[prœyːð]",
      ukr: "хліб (зокрема rugbrauð — ісландський житній вулканічний хліб)",
      plural: "brauð",
      defSingular: "brauðið",
      category: "produce",
      icon: "🍞",
      samplePhrase: "Hér er nýbakað brauð.",
      sampleUkr: "Ось свіжоспечений хліб."
    },
    {
      id: "karto потреби",
      gender: "kvk",
      genderLabel: "Жін. рід (kvk. ft.)",
      is: "kartöflur",
      ipa: "[ˈkʰarˌtʰœflʏr]",
      ukr: "картопля (завжди множина)",
      plural: "kartöflur",
      defSingular: "kartöflurnar",
      category: "produce",
      icon: "🥔",
      samplePhrase: "Soðnar kartöflur með smjöri.",
      sampleUkr: "Варена картопля з маслом."
    },
    {
      id: "epli",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "epli",
      ipa: "[ˈɛhplɪ]",
      ukr: "яблуко",
      plural: "epli",
      defSingular: "eplið",
      category: "produce",
      icon: "🍎",
      samplePhrase: "Ég kaupi tvö kíló af eplum.",
      sampleUkr: "Я купую два кілограми яблук."
    },

    // DRINKS (DRYKKIR)
    {
      id: "vatn",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "vatn",
      ipa: "[vahtn̥]",
      ukr: "вода (ісландська кришталева вода з-під крана краща за пляшкову)",
      defSingular: "vatnið",
      category: "drinks",
      icon: "🚰",
      samplePhrase: "Kranavatn á Íslandi er tandurhreint.",
      sampleUkr: "Вода з-під крана в Ісландії бездоганно чиста."
    },
    {
      id: "kaffi",
      gender: "hk",
      genderLabel: "Сер. рід (hk.)",
      is: "kaffi",
      ipa: "[ˈkʰahfɪ]",
      ukr: "кава",
      defSingular: "kaffið",
      category: "drinks",
      icon: "☕",
      samplePhrase: "Einn bolla af kaffi, takk!",
      sampleUkr: "Одну чашку кави, будь ласка!"
    }
  ],

  // 2. PARTITIVE QUANTIFIERS & UNITS (MÆLIEININGAR OG MAGN MEÐ AF + ÞGF)
  partitiveUnits: [
    {
      id: "glas_af",
      unit: "glas af...",
      governs: "af + ÞGF (🟡)",
      ukr: "склянка...",
      examples: [
        { is: "glas af vatni", ukr: "склянка води (vatn -> vatni 🟡)" },
        { is: "glas af hvítvíni", ukr: "келих білого вина (hvítvín -> hvítvíni 🟡)" }
      ],
      ruleNote: "Прийменник 'af' (з, від) ЗАВЖДИ вимагає Давального відмінка (ÞGF 🟡)."
    },
    {
      id: "bolli_af",
      unit: "bolli af...",
      governs: "af + ÞGF (🟡)",
      ukr: "чашка...",
      examples: [
        { is: "bolli af kaffi", ukr: "чашка кави (kaffi -> kaffi 🟡)" },
        { is: "bolli af tei", ukr: "чашка чаю (te -> tei 🟡)" }
      ],
      ruleNote: "Поширена формула в кав'ярнях та ресторанах."
    },
    {
      id: "sneid_af",
      unit: "sneið af...",
      governs: "af + ÞGF (🟡)",
      ukr: "скибка / шматочок...",
      examples: [
        { is: "sneið af brauði", ukr: "скибка хліба (brauð -> brauði 🟡)" },
        { is: "sneið af köku", ukr: "шматочок пирога (kaka -> köku 🟡)" }
      ],
      ruleNote: "Іменник 'kaka' в давальному відмінку зазнає U-умлауту: köku."
    },
    {
      id: "kilo_af",
      unit: "kíló af...",
      governs: "af + ÞGF (🟡)",
      ukr: "кілограм...",
      examples: [
        { is: "kíló af eplum", ukr: "кілограм яблук (epli -> eplum 🟡)" },
        { is: "kíló af kjöti", ukr: "кілограм м'яса (kjöt -> kjöti 🟡)" }
      ],
      ruleNote: "У множині давального відмінка закінчення завжди -um (eplum)."
    },
    {
      id: "flaska_af",
      unit: "flaska af...",
      governs: "af + ÞGF (🟡)",
      ukr: "пляшка...",
      examples: [
        { is: "flaska af gosi", ukr: "пляшка газованої води (gos -> gosi 🟡)" },
        { is: "flaska af rauðvíni", ukr: "пляшка червоного вина (rauðvín -> rauðvíni 🟡)" }
      ],
      ruleNote: "Одиниці міри в магазині Vinbúðin або супермаркеті."
    }
  ],

  // 3. COOKING VERBS (ELDUNARSAGNIR)
  cookingVerbs: [
    {
      id: "sjoda",
      inf: "að sjóða",
      ipa: "[aːð ˈsjouːða]",
      meaningUkr: "варити / кип'ятити",
      presConjugation: "ég sýð, þú sýður, hann sýður, við sjóðum, þið sjóðið, þeir sjóða",
      rule: "Сильне дієслово з чергуванням голосної: jó -> ý в однині теперішнього часу!",
      exampleIs: "Ég sýð kartöflur í tíu mínútur.",
      exampleUkr: "Я варю картоплю десять хвилин."
    },
    {
      id: "steikja",
      inf: "að steikja",
      ipa: "[aːð ˈsteiːca]",
      meaningUkr: "смажити на пательні",
      presConjugation: "ég steiki, þú steikir, hann steikir, við steikjum, þið steikið, þeir steikja",
      rule: "Слабка відміна 2-ї групи (j-подовження в 1-й особі множини: við steikjum).",
      exampleIs: "Hann steikir laxinn á pönnunni.",
      exampleUkr: "Він смажить лосося на сковороді."
    },
    {
      id: "baka",
      inf: "að baka",
      ipa: "[aːð ˈpaːka]",
      meaningUkr: "пекти / випікати",
      presConjugation: "ég baka, þú bakar, hann bakar, við bökum, þið bakið, þeir baka",
      rule: "Слабка відміна 1-ї групи: U-умлаут у 1-й особі множини (við bökum!).",
      exampleIs: "Við bökum pönnukökur á sunnudögum.",
      exampleUkr: "Ми печемо млинці щонеділі."
    },
    {
      id: "skera",
      inf: "að skera",
      ipa: "[aːð ˈscɛːra]",
      meaningUkr: "різати / нарізати",
      presConjugation: "ég sker, þú skerð, hann sker, við skerum, þið skerið, þeir skera",
      rule: "Чергування e -> e (нульове закінчення в ég sker).",
      exampleIs: "Viltu skera brauðið og ostinn?",
      exampleUkr: "Чи не міг би ти нарізати хліб і сир?"
    }
  ],

  // 4. RESTAURANT PHRASES & ETIQUETTE (Á VEITINGAHÚSI)
  restaurantPhrases: [
    {
      is: "Ertu með laust borð fyrir tvo?",
      ipa: "[ˈɛr-tʏ mɛð lœyst pɔrð ˈfɪːrɪr tʰvɔː]",
      ukr: "Чи є у вас вільний столик на двох?",
      situation: "Вхід до ресторану (Borðapöntun)"
    },
    {
      is: "Má ég sjá matseðilinn og vínseðilinn?",
      ipa: "[mauː jɛːx sjauː ˈmatˌsɛːðɪlɪn ɔːɣ ˈviːnˌsɛːðɪlɪn]",
      ukr: "Можна подивитися меню та винну карту?",
      situation: "Вибір страв (Matseðill)"
    },
    {
      is: "Hver er réttur dagsins?",
      ipa: "[kʰvɛr ɛr ˈrjɛhtʏr ˈtaxsɪns]",
      ukr: "Яка сьогодні страва дня?",
      situation: "Спеціальна пропозиція шеф-кухаря"
    },
    {
      is: "Ég ætla að fá lambakjöt og eitt glas af kranavatni.",
      ipa: "[jɛːx ˈaiht-la aːð fauː ˈlampaˌcʰœːt ɔːɣ eiht klas aːð ˈkʰraːnaˌvahtnɪ]",
      ukr: "Я візьму баранину та одну склянку води з-під крана.",
      situation: "Замовлення головної страви (ÞF 🟢)"
    },
    {
      is: "Er þetta glútenfrítt eða laktósafrítt?",
      ipa: "[ɛr ˈθɛhta ˈkluːtɛnˌfriht ˈɛːða ˈlak-tʰouːsaˌfriht]",
      ukr: "Чи це безглютенове або безлактозне?",
      situation: "Алергени та дієтичні обмеження"
    },
    {
      is: "Má ég fá reikninginn, takk?",
      ipa: "[mauː jɛːx fauː ˈreihk-nɪŋcɪn tʰahk]",
      ukr: "Можна мені рахунок, будь ласка?",
      situation: "Оплата (Reikningur)"
    },
    {
      is: "Greiðum við saman eða sitthvoru lagi?",
      ipa: "[ˈkreiːðʏm viːð ˈsaːman ˈɛːða ˈsɪhtˌkʰvɔːrʏ ˈlaːjɪ]",
      ukr: "Ми платимо разом чи кожен окремо?",
      situation: "Роздільний рахунок"
    }
  ],

  // 5. RESTAURANT DIALOGUES (Á VEITINGASTAÐ)
  dialogues: [
    {
      id: "restaurant_order",
      titleUkr: "Діалог 1: Замовлення традиційної вечері в ресторані Рейк'явіка",
      titleIsl: "Á veitingastað í miðbænum: Kjötsúpa og fiskur",
      lines: [
        {
          speaker: "Gunnar",
          role: "Þjónn (Офіціант)",
          is: "Góðan daginn og velkomin! Eruð þið tilbúin að panta?",
          ipa: "[ˈkouːðan ˈtaːjɪn ɔːɣ ˈvɛl-kʰɔmɪn ˈɛːrʏð θɪð ˈtʰɪlˌpuːɪn aːð ˈpʰanta]",
          ukr: "Доброго дня та ласкаво просимо! Ви готові зробити замовлення?",
          note: "að vera tilbúinn — бути готовим"
        },
        {
          speaker: "Поліна",
          role: "Gestur (Гостя)",
          is: "Já, takk. Hver er súpa dagsins?",
          ipa: "[jauː tʰahk kʰvɛr ɛr ˈsuːpa ˈtaxsɪns]",
          ukr: "Так, дякую. Який сьогодні суп дня?",
          note: "súpa dagsins — суп дня"
        },
        {
          speaker: "Gunnar",
          role: "Þjónn",
          is: "Í dag erum við með hefðbundna íslenska kjötsúpu úr lambakjöti og rótargrænmeti. Hún er mjög hlýjandi!",
          ipa: "[iː taːx ˈɛːrʏm viːð mɛð ˈhɛvðˌpʏntna ˈiːsˌlɛnska ˈcʰœːtˌsuːpʏ ur ˈlampaˌcʰœːtɪ ɔːɣ ˈrouːtarˌkrain-mɛːtɪ]",
          ukr: "Сьогодні у нас традиційна ісландська кйотсупа (м'ясний суп) з баранини та коренеплодів. Вона чудово зігріває!",
          note: "Kjötsúpa — національний ісландський суп"
        },
        {
          speaker: "Остап",
          role: "Gestur",
          is: "Frábært! Ég ætla að fá eina kjötsúpu. Og fyrir aðalrétt tek ég pönnusteiktan þorsk.",
          ipa: "[ˈfrauːpairt jɛːx ˈaiht-la aːð fauː ˈeiːna ˈcʰœːtˌsuːpʏ ɔːɣ ˈfɪːrɪr ˈaːðalˌrjɛht tʰɛːk jɛːx ˈpʰœnːʏˌsteik-tan ˈθɔrsk]",
          ukr: "Чудово! Я візьму кйотсупу. А на головну страву — смажену тріску.",
          note: "aðalréttur — головна страва (ÞF 🟢)"
        },
        {
          speaker: "Gunnar",
          role: "Þjónn",
          is: "Og hvað má bjóða ykkur að drekka með matnum?",
          ipa: "[ɔːɣ kʰvaːð mauː ˈpjouːða ˈɪhkʏr aːð ˈtrɛhk-ka mɛð ˈmatnʏm]",
          ukr: "А що бажаєте випити до їжі?",
          note: "að bjóða ykkur — запропонувати вам (ÞGF 🟡)"
        },
        {
          speaker: "Поліна",
          role: "Gestur",
          is: "Bara kranavatn fyrir mig, takk, og einn bjór fyrir hann.",
          ipa: "[ˈpaːra ˈkʰraːnaˌvahtn ˈfɪːrɪr mɪx tʰahk ɔːɣ einn pjouːr ˈfɪːrɪr han]",
          ukr: "Лише воду з-під крана для мене, будь ласка, та одне пиво для нього.",
          note: "Kranavatn á Íslandi er alltaf ókeypis! (Вода безкоштовна)"
        }
      ]
    }
  ]
};
