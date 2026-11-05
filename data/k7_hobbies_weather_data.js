/**
 * k7_hobbies_weather_data.js - Academic Dataset for Lesson 7 (Kafli 7: Tómstundir, sund og veður)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 1 (Kafli 8: Tómstundir og veður, pp. 136-155 — FINAL A1 CHAPTER)
 * - Tölum saman 2022 (Sundlaugar, útivist & veðurfræði)
 * - Viltu læra íslensku? (Þættir 9, 11 & 21: Í sundlaug og ferðalög um Ísland)
 * - Litli málfræðingurinn & Árnastofnun BÍN (Impersonal weather verbs: Það rignir, árstíðir)
 */

export const K7_HOBBIES_WEATHER_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Урок 7: Дозвілля, культура басейнів, погода та пори року (Фінал рівня A1)",
  titleIsl: "Kafli 7: Tómstundir, sund og veður",
  level: "A1.3 (ÍFA 1 Kafli 8 — A1 Lokakafli)",

  // 1. HOBBIES & FREE TIME (TÓMSTUNDIR & ÁHUGAMÁL)
  hobbies: [
    {
      id: "synda",
      inf: "að synda",
      ipa: "[aːð ˈsɪnta]",
      ukr: "плавати (зокрема в геотермальних басейнах)",
      category: "active",
      icon: "🏊",
      pres: "ég syndi, þú syndir, hann syndir, við syndum",
      samplePhrase: "Ég fer í sund þrisvar í viku.",
      sampleUkr: "Я ходжу в басейн тричі на тиждень."
    },
    {
      id: "hlaupa",
      inf: "að hlaupa",
      ipa: "[aːð ˈl̥œyːpʰa]",
      ukr: "бігати / здійснювати пробіжки",
      category: "active",
      icon: "🏃",
      pres: "ég hleyp, þú hleypur, hann hleypur, við hlaupum",
      ruleNote: "Сильне дієслово з чергуванням au -> ey в однині теперішнього часу!",
      samplePhrase: "Hann hleypur meðfram sjónum.",
      sampleUkr: "Він бігає вздовж узбережжя моря."
    },
    {
      id: "lesa",
      inf: "að lesa",
      ipa: "[aːð ˈlɛːsa]",
      ukr: "читати (національна пристрасть: Jólabókaflóð)",
      category: "quiet",
      icon: "📚",
      pres: "ég les, þú lest, hann les, við lesum",
      ruleNote: "Звичайне чергування в однині теперішнього часу: ég les, þú lest.",
      samplePhrase: "Íslendingar lesa mikið af bókum á veturna.",
      sampleUkr: "Ісландці читають багато книжок узимку."
    },
    {
      id: "prjona",
      inf: "að prjóna",
      ipa: "[aːð ˈpʰrjɔuːna]",
      ukr: "плести / в'язати (традиційні светри Lopapeysa)",
      category: "craft",
      icon: "🧶",
      pres: "ég prjóna, þú prjónar, hann prjónar, við prjónum",
      ruleNote: "Слабка відміна 1-ї групи: við prjónum (U-умлаут).",
      samplePhrase: "Hún prjónar hlýja lopapeysu.",
      sampleUkr: "Вона плете теплу лопапейсу."
    },
    {
      id: "spila",
      inf: "að spila",
      ipa: "[aːð ˈspɪːla]",
      ukr: "грати (на музичному інструменті: á + ÞF / у настільні ігри)",
      category: "culture",
      icon: "🎸",
      pres: "ég spila, þú spilar, hann spilar, við spilum",
      ruleNote: "Керування: spila á gítar / píanó (+ ÞF).",
      samplePhrase: "Ég spila á gítar á kvöldin.",
      sampleUkr: "Я граю на гітарі вечорами."
    },
    {
      id: "ferdast",
      inf: "að ferðast",
      ipa: "[aːð ˈfɛrðast]",
      ukr: "подорожувати (медіопасивне дієслово на -st)",
      category: "travel",
      icon: "🚗",
      pres: "ég ferðast, þú ferðast, hann ferðast, við ferðumst",
      ruleNote: "Медіопасивна форма: закінчення -st у всіх особах однини!",
      samplePhrase: "Við ferðumst um Ísland á sumrin.",
      sampleUkr: "Ми подорожуємо Ісландією влітку."
    }
  ],

  // 2. SWIMMING POOL CULTURE & ETIQUETTE (SUNDLAUGAMENNING)
  poolEtiquette: [
    {
      id: "sturta_an_sundfata",
      ruleIsl: "Þvo sér með sápu ÁN sundfata",
      ruleUkr: "Прийняти душ з милом БЕЗ купальника перед входом у басейн",
      importance: "ОБОВ'ЯЗКОВО ДЛЯ ВСІХ",
      icon: "🚿",
      desc: "Оскільки ісландські басейни мають мінімальний вміст хлору завдяки природному геотермальному оновленню води, сувора чистота тіла — це святий закон суспільства."
    },
    {
      id: "heitir_pottar",
      ruleIsl: "Heitir pottar (38°C – 42°C)",
      ruleUkr: "Гарячі геотермальні ванни",
      importance: "КУЛЬТУРНИЙ ЦЕНТР",
      icon: "♨️",
      desc: "Місце неквапливих дискусій, релаксації після роботи та соціалізації мешканців мікрорайону."
    },
    {
      id: "gufubad",
      ruleIsl: "Gufubað eða Eimbað",
      ruleUkr: "Парова лазня / геотермальна сауна",
      importance: "ЗДОРОВ'Я",
      icon: "🧖",
      desc: "Природна пара прямо з надр землі без електричного підігріву."
    }
  ],

  // 3. WEATHER & SEASONS (VEÐUR OG ÁRSTÍÐIR)
  seasons: [
    {
      id: "vor",
      is: "vor",
      gender: "hk",
      ipa: "[vɔːr]",
      ukr: "весна (березень – травень)",
      icon: "🌱",
      phrase: "Á vorin bráðnar snjórinn.",
      phraseUkr: "Навесні тане сніг."
    },
    {
      id: "sumar",
      is: "sumar",
      gender: "hk",
      ipa: "[ˈsʏːmar]",
      ukr: "літо (червень – серпень)",
      icon: "☀️",
      phrase: "Á sumrin er bjart allan sólarhringinn.",
      phraseUkr: "Влітку світло цілодобово (білі ночі)."
    },
    {
      id: "haust",
      is: "haust",
      gender: "hk",
      ipa: "[hœyst]",
      ukr: "осінь (вересень – листопад)",
      icon: "🍂",
      phrase: "Á haustin byrja norðurljósin að sjást.",
      phraseUkr: "Восени починає з'являтися північне сяйво."
    },
    {
      id: "vetur",
      is: "vetur",
      gender: "kk",
      ipa: "[ˈvɛːtʏr]",
      ukr: "зима (грудень – лютий)",
      icon: "❄️",
      phrase: "Á veturna er mikill snjór og frost.",
      phraseUkr: "Узимку багато снігу та мороз."
    }
  ],

  // 4. IMPERSONAL WEATHER PHRASES (ÓPERSÓNULEG VEÐURORÐ)
  weatherConditions: [
    {
      is: "Það rignir.",
      ipa: "[θaːð ˈrɪk-nɪr]",
      ukr: "Іде дощ.",
      icon: "🌧️",
      grammar: "Безособове дієслово (að rigna)"
    },
    {
      is: "Það snjóar.",
      ipa: "[θaːð ˈsnjouːar]",
      ukr: "Іде сніг.",
      icon: "🌨️",
      grammar: "Безособове дієслово (að snjóa)"
    },
    {
      is: "Það er sól og blíða.",
      ipa: "[θaːð ɛr souːl ɔːɣ ˈpliːða]",
      ukr: "Сонячно та приємно (безвітряна ясна погода).",
      icon: "🌤️",
      grammar: "Ідіома: sól og blíða"
    },
    {
      is: "Það er hvasst og vindur.",
      ipa: "[θaːð ɛr kʰvast ɔːɣ ˈvɪntʏr]",
      ukr: "Вітряно та штормить.",
      icon: "💨",
      grammar: "hvasst (сер. рід від hvass)"
    },
    {
      is: "Það er frost og hálka.",
      ipa: "[θaːð ɛr frɔst ɔːɣ ˈhaulka]",
      ukr: "Мороз та ожеледиця на дорогах.",
      icon: "🧊",
      grammar: "Hálka — ожеледь (небезпека для водіїв)"
    },
    {
      is: "Hvernig er veðrið í dag?",
      ipa: "[ˈkʰvɛrtnɪɣ ɛr ˈvɛːðrɪð iː taːx]",
      ukr: "Яка сьогодні погода?",
      icon: "❓",
      grammar: "Головне питання для смол-току"
    }
  ],

  // 5. COMMUNICATIVE DIALOGUE (Í SUNDLAUG & VEÐRIÐ)
  dialogues: [
    {
      id: "pool_chat",
      titleUkr: "Діалог: Бесіда в гарячому поттурі про погоду та відпочинок",
      titleIsl: "Í heita pottinum: Veðrið og daglegt líf",
      lines: [
        {
          speaker: "Gunnar",
          role: "Íslendingur í potti",
          is: "Sæll! Það er ansi hvasst í dag, en vatnið í pottinum er dásamlegt!",
          ipa: "[saitl̥ θaːð ɛr ˈansɪ kʰvast iː taːx ɛn ˈvahtnɪð iː ˈpʰɔht-ɪnʏm ɛr ˈtauːsaɱlɛxt]",
          ukr: "Привіт! Сьогодні добряче вітряно, але вода в поттурі просто чудова!",
          note: "ansi hvasst — добряче вітряно"
        },
        {
          speaker: "Поліна",
          role: "Gestur",
          is: "Já, mér finnst æðislegt að sitja hérna í þrjátíu og níu gráðum. Hvað gerir þú í frítímanum?",
          ipa: "[jauː mjɛːr fɪnst ˈaiːðɪslɛxt aːð ˈsɪht-ja ˈçɛrtna iː ˈθrjauːtɪjʏ ɔːɣ ˈniːjʏ ˈkrauːðʏm kʰvaːð ˈcɛːrɪr θuː iː ˈfriːˌtʰiːmanʏm]",
          ukr: "Так, мені неймовірно подобається сидіти тут при тридцяти дев'яти градусах. А чим ти займаєшся у вільний час?",
          note: "frítími — вільний час"
        },
        {
          speaker: "Gunnar",
          role: "Íslendingur í potti",
          is: "Ég fer oft á skíði á veturna og svo prjóna ég aðeins. En á sumrin ferðast ég um Vestfirði.",
          ipa: "[jɛːx fɛr ɔft auː ˈsciːðɪ auː ˈvɛːtʏrna ɔːɣ souː ˈpʰrjɔuːna jɛːx ˈaːðein-s ɛn auː ˈsʏmrɪn ˈfɛrðast jɛːx ʏm ˈvɛstˌfɪrðɪ]",
          ukr: "Узимку я часто катаюся на лижах і трохи плету. А влітку подорожую Західними фіордами.",
          note: "fara á skíði — кататися на лижах"
        },
        {
          speaker: "Поліна",
          role: "Gestur",
          is: "Frábært! Ég ætla líka að skoða náttúruna þegar hlýnar í veðri.",
          ipa: "[ˈfrauːpairt jɛːx ˈaiht-la ˈliːka aːð ˈskouːða ˈnauht-uːrʏna θɛːɣar ˈl̥iːnar iː ˈvɛːðrɪ]",
          ukr: "Чудово! Я теж збираюся досліджувати природу, коли потеплішає.",
          note: "hlýna í veðri — потеплішати"
        }
      ]
    }
  ]
};
