/**
 * DATA: LESSON A2.7 (BANKAR, FJÁRMÁL OG RAFRÆN SKILRÍKI)
 * Banking System, Auðkenni, Heimabanki & Electronic Invoices (Kröfur)
 * References: Landsbankinn, Arion banki, Íslandsbanki, Auðkenni.is
 */

export const A2_K7_BANKING_DATA = {
  id: "a2_k7",
  number: "A2.7",
  titleIsl: "Bankar, fjármál og rafræn skilríki",
  titleUkr: "Банківська система, фінанси та електронні ID (Auðkenni)",
  level: "A2.1 Фінансова автономія",
  source: "Íslenska fyrir alla 2 • Landsbankinn & Arion Standard • Auðkenni.is",

  // 1. CORE BANKING & FINANCES VOCABULARY
  vocabulary: [
    {
      word: "bankareikningur",
      article: "bankareikningurinn",
      gender: "kk",
      ipa: "[ˈpauŋkaˌreihkniŋkʏr]",
      translation: "банківський рахунок",
      sampleIsl: "Ég þarf að stofna bankareikning til að fá launin greidd.",
      sampleUkr: "Мені потрібно відкрити банківський рахунок, щоб отримувати зарплату.",
      category: "banking"
    },
    {
      word: "debetkort",
      article: "debetkortið",
      gender: "hk",
      ipa: "[ˈtɛːpɛtˌkʰɔr̥t]",
      translation: "дебетова платіжна картка",
      sampleIsl: "Debetkortið mitt gildir í öllum posum og hraðbönkum.",
      sampleUkr: "Моя дебетова картка діє у всіх платіжних терміналах та банкоматах.",
      category: "banking"
    },
    {
      word: "krafa",
      article: "krafan (ft. kröfur)",
      gender: "kvk",
      ipa: "[ˈkʰraːva]",
      translation: "електронна платіжна вимога / рахунок у heimabanki",
      sampleIsl: "Allar kröfur birtast sjálfkrafa í netbankanum.",
      sampleUkr: "Усі електронні рахунки автоматично з'являються в інтернет-банкінгу.",
      category: "online_banking"
    },
    {
      word: "heimabanki",
      article: "heimabankinn",
      gender: "kk",
      ipa: "[ˈheiːmaˌpauŋcɪ]",
      translation: "інтернет-банкінг (особистий кабінет клієнта)",
      sampleIsl: "Ég borga húsaleiguna og rafmagnið í heimabankanum.",
      sampleUkr: "Я оплачую оренду житла та електроенергію в інтернет-банкінгу.",
      category: "online_banking"
    },
    {
      word: "rafræn skilríki",
      article: "rafrænu skilríkin",
      gender: "hk.ft",
      ipa: "[ˈravˌraiːn ˈscɪlˌriːcɪ]",
      translation: "електронний цифровий підпис / мобільний ID (Auðkenni)",
      sampleIsl: "Rafræn skilríki eru nauðsynleg til að skrá sig inn í netbankann.",
      sampleUkr: "Електронні ID необхідні для входу в інтернет-банк.",
      category: "identity"
    },
    {
      word: "millifærsla",
      article: "millifærslan",
      gender: "kvk",
      ipa: "[ˈmɪtlɪˌfaiːrsla]",
      translation: "банківський переказ грошей з рахунку на рахунок",
      sampleIsl: "Millifærsla milli íslenskra banka tekur örfáar sekúndur.",
      sampleUkr: "Переказ між ісландськими банками займає лічені секунди.",
      category: "transactions"
    },
    {
      word: "hraðbanki",
      article: "hraðbankinn",
      gender: "kk",
      ipa: "[ˈr̥aːðˌpauŋcɪ]",
      translation: "банкомат (ATM)",
      sampleIsl: "Ég tók út tuttugu þúsund krónur í hraðbankanum.",
      sampleUkr: "Я зняв двадцять тисяч крон у банкоматі.",
      category: "banking"
    },
    {
      word: "leyninúmer",
      article: "leyninúmerið",
      gender: "hk",
      ipa: "[ˈleiːnɪˌnuːmɛr]",
      translation: "ПІН-код картки або таємний пароль",
      sampleIsl: "Gleymdu ekki leyninúmerinu fyrir nýja debetkortið.",
      sampleUkr: "Не забудьте ПІН-код для нової дебетової картки.",
      category: "security"
    }
  ],

  // 2. GRAMMAR MATRIX: FINANCIAL SYNTAX & PREPOSITIONS
  grammarRules: [
    {
      title: "1. Дієслова фінансових операцій та їх відмінкове керування",
      explanation: "• 'að borga + ÞF 🟢' — оплачувати щось (Ég borgaði reikninginn í gær).\n• 'að leggja inn á + ÞF 🟢' — покласти гроші на рахунок (Vinnuveitandi leggur launin inn á reikninginn).\n• 'að taka út úr + ÞGF 🟡' — зняти гроші з банкомату (Ég tók peninga út úr hraðbankanum).\n• 'að millifæra á + ÞF 🟢' — переказати кошти (Má ég millifæra á þig?)."
    },
    {
      title: "2. Система електронних рахунків (Kröfur) в інтернет-банкінгу",
      explanation: "В Ісландії немає паперових квитанцій на комунальні послуги чи рахунки лікаря:\nКожна установа виставляє електронну вимогу ('krafa') на номер вашої Kennitala. Вона автоматично потрапляє у вкладку 'Ógreiddar kröfur' у додатку вашого банку, де оплачується одним кліком."
    },
    {
      title: "3. Трійка провідних банків та додаток Auðkenni",
      explanation: "• Landsbankinn (найбільший державний комерційний банк).\n• Arion banki та Íslandsbanki.\nДля активації електронного підпису (Rafræn skilríki) або додатка 'Auðkenni' іноземцю необхідно особисто відвідати відділення банку з паспортом та посвідкою на проживання."
    }
  ],

  // 3. DIALOGUE: OPENING A BANK ACCOUNT
  dialogue: [
    {
      speaker: "Gunnar",
      speakerRole: "Viðskiptavinur (Клієнт)",
      textIsl: "Góðan daginn, mig langar að stofna nýjan bankareikning og virkja rafræn skilríki í símanum.",
      textUkr: "Доброго дня, я хочу відкрити новий банківський рахунок та активувати електронний ID у телефоні.",
      audio: "audio/dialogue/a2_k7_l1.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Þjónustufulltrúi (Спеціаліст банку)",
      textIsl: "Góðan daginn! Ertu með íslenska kennitölu og vegabréf eða ökuskírteini meðferðis?",
      textUkr: "Доброго дня! Чи маєте ви ісландську кенніталу та паспорт або посвідчення водія з собою?",
      audio: "audio/dialogue/a2_k7_l2.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Viðskiptavinur",
      textIsl: "Já, hérna er kennitöluskírteinið mitt og gild skilríki frá Útlendingastofnun.",
      textUkr: "Так, ось моє свідоцтво про кенніталу та дійсні документи від міграційної служби.",
      audio: "audio/dialogue/a2_k7_l3.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Þjónustufulltrúi",
      textIsl: "Frábært. Viltu fá debetkort og viltu að við virkjum netbankann og Auðkennis-appið strax?",
      textUkr: "Чудово. Бажаєте отримати дебетову картку та підключити інтернет-банк і додаток Auðkenni одразу?",
      audio: "audio/dialogue/a2_k7_l4.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Viðskiptavinur",
      textIsl: "Já takk, ég þarf að geta borgað reikninga og kröfur sem koma inn í heimabankann.",
      textUkr: "Так, будь ласка, мені потрібно оплачувати рахунки та електронні вимоги в онлайн-банкінгу.",
      audio: "audio/dialogue/a2_k7_l5.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Þjónustufulltrúi",
      textIsl: "Enginn vandi. Þú færð sent leyninúmer fyrir debetkortið í pósti eða beint í netbankann.",
      textUkr: "Жодних проблем. Ви отримаєте ПІН-код для дебетової картки поштою або прямо в інтернет-банк.",
      audio: "audio/dialogue/a2_k7_l6.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Viðskiptavinur",
      textIsl: "Hvað kostar að millifæra peninga yfir á annan reikning í íslenskum bönkum?",
      textUkr: "Скільки коштує переказати гроші на інший рахунок в ісландських банках?",
      audio: "audio/dialogue/a2_k7_l7.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Þjónustufulltrúi",
      textIsl: "Venjulegar millifærslur í netbanka eru ókeypis. Reikningurinn þinn er nú tilbúinn til notkunar.",
      textUkr: "Звичайні перекази в інтернет-банку безкоштовні. Ваш рахунок готовий до використання.",
      audio: "audio/dialogue/a2_k7_l8.mp3"
    }
  ],

  // 4. INTERACTIVE DRILLS
  drills: [
    {
      id: "drill_1",
      title: "Фінансові терміни та перекази",
      instruction: "Оберіть правильну дію або термін для банківської транзакції:",
      questions: [
        {
          prompt: "Як називається електронна платіжна вимога від компанії, що приходить в онлайн-банк?",
          options: ["Krafa", "Kvittun", "Samningur", "Skattur"],
          correct: 0,
          hint: "Термін «krafa» (мн. kröfur) позначає виставлений рахунок до сплати."
        },
        {
          prompt: "Який додаток є офіційним цифровим ідентифікатором для автентифікації на банківських сайтах Ісландії?",
          options: ["Auðkenni", "Instagram", "Klapp", "Straeto"],
          correct: 0,
          hint: "Додаток «Auðkenni» генерує захищені ключі електронного посвідчення особи (Rafræn skilríki)."
        },
        {
          prompt: "Як правильно сказати: «Я зняв гроші в банкоматі» від дієслова «að taka út úr + ÞGF»?",
          options: ["Ég tók út úr hraðbankanum.", "Ég tók út úr hraðbankann.", "Ég tók inn á hraðbanka.", "Ég tók af hraðbanka."],
          correct: 0,
          hint: "Прийменник «úr» керує давальним відмінком: hraðbanki ➔ hraðbankanum (ÞGF 🟡)."
        }
      ]
    }
  ]
};
