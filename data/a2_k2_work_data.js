/**
 * a2_k2_work_data.js - Academic Dataset for Level A2 • Lesson 2 (Kafli 2: Vinna og starfsumhverfi)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 2: Vinna, pp. 28-49)
 * - Tölum saman 2022 (Vinnustaðurinn, kaffistofa og samskipti við samstarfsfólk)
 * - Skatturinn (Ráðningarsamningur, Persónuafsláttur & Launaseðill standards)
 * - Stéttarfélög (Efling & VR kjarasamningar)
 * - Litli málfræðingurinn & Árnastofnun BÍN (Þátíð sterkra sagna: 7 hljóðskiptaraðir)
 */

export const A2_K2_WORK_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Рівень A2 • Урок 2: Ринок праці, трудовий договір, податки та минулий час сильних дієслів",
  titleIsl: "Stig A2 • Kafli 2: Vinnumarkaður, launaseðill og þátíð sterkra sagna",
  level: "A2.1 (ÍFA 2 Kafli 2)",
  book: "Íslenska fyrir alla 2",

  // 1. STRONG VERBS IN PAST TENSE (ÞÁTÍÐ STERKRA SAGNA — ABLAUT)
  pastTenseStrongGrammar: {
    ruleTitle: "Минулий час сильних дієслів (Sterkar sagnir — Hljóðskipti)",
    description: "Сильні дієслова утворюють минулий час не за допомогою закінчень -aði/-ti/-ði, а шляхом зміни кореневого голосного (аблаут — hljóðskipti). В 1-й та 3-й особах однини минулого часу сильні дієслова НЕ мають закінчення (ég fór, hann fór)!",
    inflectionTable: {
      verb: "að fara (fór — fórum)",
      singular: [
        { person: "ég", form: "fór", note: "нульове закінчення" },
        { person: "þú", form: "fórst", note: "закінчення -st" },
        { person: "hann / hún / það", form: "fór", note: "нульове закінчення (як в ég!)" }
      ],
      plural: [
        { person: "við", form: "fórum", note: "закінчення -um" },
        { person: "þið", form: "fóruð", note: "закінчення -uð" },
        { person: "þeir / þær / þau", form: "fóru", note: "закінчення -u" }
      ]
    },
    ablautClasses: [
      {
        classNum: "1. Röð (í ➔ ei)",
        pattern: "að bíða ➔ beið",
        verbs: [
          { inf: "að bíða", pres: "ég bíð", pastSg: "ég beið", pastPl: "við biðum", ukr: "чекати", phrase: "Ég beið eftir strætó í hálftíma." },
          { inf: "að líta", pres: "ég lít", pastSg: "ég leit", pastPl: "við litum", ukr: "дивитися", phrase: "Hann leit á launaseðilinn sinn." }
        ]
      },
      {
        classNum: "2. Röð (jó/jú/ú ➔ au)",
        pattern: "að bjóða ➔ bauð",
        verbs: [
          { inf: "að bjóða", pres: "ég býð", pastSg: "ég bauð", pastPl: "við buðum", ukr: "пропонувати / запрошувати", phrase: "Guðrún bauð mér kaffi á kaffistofunni." }
        ]
      },
      {
        classNum: "3. Röð (i/e ➔ a)",
        pattern: "að finna ➔ fann / að drekka ➔ drakk",
        verbs: [
          { inf: "að finna", pres: "ég finn", pastSg: "ég fann", pastPl: "við fundum", ukr: "знаходити / відчувати", phrase: "Ég fann nýtt starf á Alfreð.is." },
          { inf: "að drekka", pres: "ég drekk", pastSg: "ég drakk", pastPl: "við drukkum", ukr: "пити", phrase: "Við drukkum morgunkaffi klukkan tíu." }
        ]
      },
      {
        classNum: "4. & 5. Röð (e/o ➔ a / á)",
        pattern: "að koma ➔ kom / að gefa ➔ gaf",
        verbs: [
          { inf: "að koma", pres: "ég kem", pastSg: "ég kom", pastPl: "við komum", ukr: "приходити", phrase: "Hann kom á réttum tíma í vinnuna." },
          { inf: "að gefa", pres: "ég gef", pastSg: "ég gaf", pastPl: "við gáfum", ukr: "давати", phrase: "Stjórnandinn gaf okkur frí á föstudaginn." }
        ]
      },
      {
        classNum: "6. Röð (a ➔ ó)",
        pattern: "að fara ➔ fór / að taka ➔ tók",
        verbs: [
          { inf: "að fara", pres: "ég fer", pastSg: "ég fór", pastPl: "við fórum", ukr: "іти / їхати", phrase: "Við fórum á starfsmannafund í morgun." },
          { inf: "að taka", pres: "ég tek", pastSg: "ég tók", pastPl: "við tókum", ukr: "брати", phrase: "Hún tók aukavakt um helgina." }
        ]
      },
      {
        classNum: "7. Röð (Редуплікативні: á/e ➔ é)",
        pattern: "að fá ➔ fékk / að ganga ➔ gekk",
        verbs: [
          { inf: "að fá", pres: "ég fæ", pastSg: "ég fékk", pastPl: "við fengum", ukr: "отримувати", phrase: "Ég fékk ráðningarsamninginn í gær." },
          { inf: "að ganga", pres: "ég geng", pastSg: "ég gekk", pastPl: "við gengum", ukr: "іти пішки / відбуватися", phrase: "Viðtalið gekk ljómandi vel!" }
        ]
      }
    ]
  },

  // 2. LABOR MARKET, CONTRACTS & TAX DEDUCTIONS
  workplaceVocabulary: [
    {
      termIsl: "Ráðningarsamningur",
      ipa: "[ˈrautnɪŋkarˌsamnɪŋkʏr]",
      ukr: "письмовий трудовий договір",
      icon: "📑",
      category: "legal",
      desc: "Обов'язковий документ за законом Ісландії при наймі понад 1 місяць. Вказує посаду (starfsheiti), ставку (starfshlutfall), базову зарплату та умови випробувального терміну (reynslutími)."
    },
    {
      termIsl: "Persónuafsláttur",
      ipa: "[ˈpʰɛrˌsouːnʏˌavˌslauht-ʏr]",
      ukr: "особиста податкова знижка (неоподатковуваний мінімум)",
      icon: "💳",
      category: "tax",
      desc: "Щомісячна фіксована податкова знижка від Skatturinn (~64 900 kr). Якщо ви не передали дозвіл роботодавцю використовувати вашу податкову картку, із зарплати утримають повний податок 31.45% без знижки!"
    },
    {
      termIsl: "Stéttarfélag",
      ipa: "[ˈstjehta-fjeːˌlaːx]",
      ukr: "профспілка (Efling, VR, SGS тощо)",
      icon: "🤝",
      category: "union",
      desc: "Організація, яка захищає права працівників, встановлює тарифні сітки (kjarasamningur), виплачує компенсації на курси мови, спортзал та оплачує лікарняні зі свого фонду (Sjúkrasjóður)."
    },
    {
      termIsl: "Kjarasamningur",
      ipa: "[ˈcʰaːraˌsamnɪŋkʏr]",
      ukr: "колективний трудовий договір",
      icon: "📜",
      category: "legal",
      desc: "Генеральна угода між профспілкою та роботодавцями, що гарантує мінімальну оплату праці, тривалість робочого тижня (36-40 год) та доплати за зміни."
    },
    {
      termIsl: "Reynslutími",
      ipa: "[ˈreiːnstlʏˌtʰiːmɪ]",
      ukr: "випробувальний термін (зазвичай до 3 місяців)",
      icon: "⏱️",
      category: "work",
      desc: "Період, під час якого термін попередження про звільнення (uppsagnarfrestur) зазвичай скорочений до 1 місяця або менше."
    }
  ],

  // 3. ANATOMY OF A PAYSLIP (LAUNASEÐILL)
  payslipComponents: [
    {
      id: "grunnlaun",
      termIsl: "Grunnlaun",
      ukr: "базовий оклад за місяць / годину",
      icon: "💵",
      desc: "Оплата за нормовані години роботи відповідно до ставки (starfshlutfall 100%, 80%, 50%)."
    },
    {
      id: "yfirvinna",
      termIsl: "Yfirvinna",
      ukr: "понаднормові години",
      icon: "⏰",
      desc: "Години роботи понад щотижневу норму. Оплачуються за підвищеною погодинною ставкою (yfirvinnukaup, 1.0385% від окладу)."
    },
    {
      id: "alagsgreidslur",
      termIsl: "Álagsgreiðslur",
      ukr: "доплати за вечірні, нічні та святкові зміни",
      icon: "🌙",
      desc: "Надбавки: kvöldálag (вечірні +33%), næturálag (нічні +45%), stórhátíðarálag (великі свята +137.5%)."
    },
    {
      id: "lifeyrissjodur",
      termIsl: "Lífeyrissjóður",
      ukr: "обов'язковий пенсійний фонд",
      icon: "🏦",
      desc: "Працівник сплачує 4% від доходу, а роботодавець додає 11.5% (разом 15.5% накопичень на пенсію)."
    },
    {
      id: "orlof",
      termIsl: "Orlof",
      ukr: "відпускні накопичення",
      icon: "🏖️",
      desc: "Зазвичай 10.17% (24 дні відпустки) або 13.04% (30 днів), які перераховуються на окремий рахунок orlofsreikningur 1 травня кожного року."
    },
    {
      id: "utborgud_laun",
      termIsl: "Útborguð laun (Nettó)",
      ukr: "чиста зарплата до виплати «на банківський рахунок»",
      icon: "🎉",
      desc: "Сума після відрахування податку (Staðgreiðsla), внесків до пенсійного фонду та профспілки з урахуванням Persónuafsláttur."
    }
  ],

  // 4. COMMUNICATIVE WORKPLACE DIALOGUE
  dialogue: {
    id: "signing_contract",
    titleUkr: "Діалог: Підписання трудового договору та податкова картка",
    titleIsl: "Undirritun ráðningarsamnings og skattkortið",
    situation: "Поліна прийшла до відділу кадрів ісландської компанії, щоб підписати трудовий договір ráðningarsamningur та уточнити дані податкової картки Persónuafsláttur.",
    lines: [
      {
        speaker: "Guðrún",
        role: "Mannauðsstjóri (HR менеджерка)",
        is: "Góðan daginn, Polina! Hér er ráðningarsamningurinn þinn. Starfshlutfallið er eitt hundrað prósent og grunnlaunin eru samkvæmt kjarasamningi VR.",
        ipa: "[ˈkouːðan ˈtaiːjɪn ˈpʰɔːlɪna çɛːr ɛr ˈrautnɪŋkarˌsamnɪŋkʏrɪnː θɪnː ˈstarfsˌl̥ʏtˌfadlɪð ɛr ˈeiht ˈhʏntrʏð ˈpʰrœyːsɛnt ɔːɣ ˈkrʏnːˌlœyːnɪn ɛrʏ ˈsamˌkʰvaiːmt ˈcʰaːraˌsamnɪŋcɪ fɛː-ɛr]",
        ukr: "Доброго дня, Поліно! Ось твій трудовий договір. Ставка — 100%, а базовий оклад відповідає колективному договору профспілки VR.",
        note: "starfshlutfall — відсоток зайнятості (ставка)",
        audio: "audio/dialogue/a2_k2_l1.mp3"
      },
      {
        speaker: "Поліна",
        role: "Starfsmaður (Співробітниця)",
        is: "Frábært! Ég las samninginn yfir í gærkvöldi. Hvenær eru launin greidd út mánaðarlega?",
        ipa: "[ˈfrauːpairt jɛːx laːs ˈsamnɪŋcɪn ˈɪːvɪr iː ˈcaiːrˌkʰvœltɪ ˈkʰvɛːnair ɛrʏ ˈlœyːnɪn ˈkreiht uːt ˈmauːnaðarˌlɛːka]",
        ukr: "Чудово! Я перечитала договір учора ввечері. Коли щомісяця виплачується заробітна плата?",
        note: "las — сильний минулий час від að lesa!",
        audio: "audio/dialogue/a2_k2_l2.mp3"
      },
      {
        speaker: "Guðrún",
        role: "Mannauðsstjóri (HR менеджерка)",
        is: "Launin eru alltaf greidd út á fyrsta degi hvers mánaðar. Viltu nota hundrað prósent persónuafslátt hjá okkur?",
        ipa: "[ˈlœyːnɪn ɛrʏ ˈaldla ˈkreiht uːt auː ˈfɪrsta ˈtɛiːjɪ kʰvɛrs ˈmauːnaðar ˈvɪltʏ ˈnɔːta ˈhʏntrʏð ˈpʰrœyːsɛnt ˈpʰɛrˌsouːnʏˌavˌslauht çauː ˈɔhkʏr]",
        ukr: "Зарплата завжди виплачується першого числа кожного місяця. Ти хочеш використати 100% особистої податкової знижки у нас?",
        note: "persónuafsláttur — податкова знижка",
        audio: "audio/dialogue/a2_k2_l3.mp3"
      },
      {
        speaker: "Поліна",
        role: "Starfsmaður (Співробітниця)",
        is: "Já, takk, ég vil nýta hundrað prósent af skattkortinu. Hvaða lífeyrissjóð á ég að velja?",
        ipa: "[jauː tʰahk jɛːx vɪl ˈniːta ˈhʏntrʏð ˈpʰrœyːsɛnt av ˈskahhtˌkʰɔrtɪnʏ ˈkʰvaːða ˈliːvˌeiːrɪsˌsjouːð auː jɛːx aːð ˈvɛːlja]",
        ukr: "Так, будь ласка, я хочу використати 100% податкової картки. А який пенсійний фонд мені обрати?",
        note: "nýta skattkort — застосувати податкову картку",
        audio: "audio/dialogue/a2_k2_l4.mp3"
      },
      {
        speaker: "Guðrún",
        role: "Mannauðsstjóri (HR менеджерка)",
        is: "Flestir hjá okkur eru í Lífeyrissjóði verzlunarmanna (LIVE). Ég gekk frá öllum pappírum rafrænt, þú færð tilkynningu í heimabankann!",
        ipa: "[ˈflɛstɪr çauː ˈɔhkʏr ɛrʏ iː ˈliːvˌeiːrɪsˌsjouːðɪ ˈvɛrstlʏnarˌmanːa ˈliːvɛ jɛːx cɛŋk frauː ˈœtlʏm ˈpʰahpʰiːrʏm ˈravˌraiːnt θuː faiːrð ˈtʰɪlˌcɪnːɪŋkʏ iː ˈheiːmaˌpaŋkanː]",
        ukr: "Більшість у нас перебувають у пенсійному фонді LIVE. Я вже оформила всі документи електронно, ти отримаєш сповіщення в інтернет-банкінг!",
        note: "gekk — сильний минулий час від að ganga!",
        audio: "audio/dialogue/a2_k2_l5.mp3"
      },
      {
        speaker: "Поліна",
        role: "Starfsmaður (Співробітниця)",
        is: "Kærar þakkir! En hvernig er með yfirvinnu og orlofsrétt á árinu?",
        ipa: "[ˈcʰaiːrar ˈθahcɪr ɛn ˈkʰvɛrnɪk ɛr mɛð ˈɪːvɪrˌvɪnːʏ ɔːɣ ˈɔrlɔvsˌrjɛht auː ˈauːrɪnʏ]",
        ukr: "Щиро дякую! А як щодо понаднормових годин та відпустки на рік?",
        note: "orlofsréttur — право на оплачувану відпустку",
        audio: "audio/dialogue/a2_k2_l6.mp3"
      },
      {
        speaker: "Guðrún",
        role: "Mannauðsstjóri (HR менеджерка)",
        is: "Yfirvinna er greidd með áttatíu prósenta álagi og orlofið er tuttugu og fjórir dagar á ári.",
        ipa: "[ˈɪːvɪrˌvɪnːa ɛr ˈkreih mɛð ˈauhtaˌtiːjʏ ˈpʰrœyːsɛnta ˈauːlaːjɪ ɔːɣ ˈɔrlɔvɪð ɛr ˈtʰʏhtʏkʏ ɔːɣ ˈfjouːrɪr ˈtaːkar auː ˈauːrɪ]",
        ukr: "Понаднормові оплачуються з надбавкою 80%, а відпустка становить 24 робочі дні на рік.",
        note: "álag — надбавка / коефіцієнт до ставки",
        audio: "audio/dialogue/a2_k2_l7.mp3"
      },
      {
        speaker: "Поліна",
        role: "Starfsmaður (Співробітниця)",
        is: "Þetta hljómar mjög vel. Ég skrifa undir samninginn með rafrænum skilríkjum núna!",
        ipa: "[ˈθɛhta ˈl̥jouːmar mjœːx vɛːl jɛːx ˈskrɪːva ˈʏntɪr ˈsamnɪŋkɪn mɛð ˈravˌraiːnʏm ˈscɪlˌriːcʏm ˈnuːna]",
        ukr: "Це звучить дуже добре. Я підпишу договір електронним підписом прямо зараз!",
        note: "skrifa undir með rafrænum skilríkjum",
        audio: "audio/dialogue/a2_k2_l8.mp3"
      }
    ]
  }
};
