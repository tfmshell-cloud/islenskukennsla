/**
 * b1_k1_society_data.js - Core Curriculum Dataset for Level B1 • Lesson 1
 * (Íslenska fyrir alla 3 • Kafli 1: Atvinnulíf, samfélagsumræða og viðtengingarháttur)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 3 (Kafli 1: Vinna, starfsumhverfi og kjaramál)
 * - Seðlabanki Íslands & Hagstofa Íslands (Verðbólga & Stýrivextir)
 * - Ríkissáttasemjari & ASÍ / SA (Kjaraviðræður)
 * - Árnastofnun BÍN (Viðtengingarháttur nútíðar og þátíðar)
 */

export const B1_K1_SOCIETY_DATA = {
  chapterId: "b1_k1",
  chapterNum: "B1.1",
  titleUkr: "Трудове життя, економічні дебати та кон'юнктив (умовний спосіб)",
  titleIsl: "Atvinnulíf, efnahagsumræða og viðtengingarháttur",
  descriptionUkr: "Старт просунутого рівня B1: професійна комунікація, макроекономіка Ісландії (інфляція verðbólga, облікова ставка stýrivextir, купівельна спроможність kaupmáttur), колективні трудові переговори kjaraviðræður та фундаментальний синтаксис умовного способу (viðtengingarháttur).",
  badge: "РІВЕНЬ B1 • КНИГА 3 • РОЗДІЛ 1",

  // 1. ANCHOR VOCABULARY (8 terms of Level B1)
  vocabulary: [
    {
      id: "vidtengingarhattur",
      word: "viðtengingarháttur",
      gender: "kk",
      translationUkr: "умовний спосіб (кон'юнктив / суб'юнктив)",
      ipa: "[ˈvɪːtˌtʰɛiŋciŋkarˌhauhtʏr]",
      exampleIsl: "Viðtengingarháttur er notaður eftir sagnir um ósk, vafa eða skilyrði.",
      exampleUkr: "Умовний спосіб вживається після дієслів бажання, сумніву або умови.",
      binUrl: "https://bin.arnastofnun.is/beyging/vi%C3%B0tengingarh%C3%A1ttur"
    },
    {
      id: "verdbolga",
      word: "verðbólga",
      gender: "kvk",
      translationUkr: "інфляція (зростання цін)",
      ipa: "[ˈvɛrðˌpoulka]",
      exampleIsl: "Markmið Seðlabankans er að halda verðbólgu nálægt tveimur og hálfu prósenti.",
      exampleUkr: "Мета Центрального банку — утримувати інфляцію близько двох з половиною відсотків.",
      binUrl: "https://bin.arnastofnun.is/beyging/ver%C3%B0b%C3%B3lga"
    },
    {
      id: "styrivextir",
      word: "stýrivextir",
      gender: "kk.ft",
      translationUkr: "облікова (процентна) ставка центробанку",
      ipa: "[ˈstiːrɪˌvɛkstɪr]",
      exampleIsl: "Peningastefnunefnd Seðlabankans ákveður stýrivexti til að hafa áhrif á efnahagslífið.",
      exampleUkr: "Комітет з монетарної політики Центрального банку визначає процентні ставки для впливу на економіку.",
      binUrl: "https://bin.arnastofnun.is/beyging/st%C3%BDrivextir"
    },
    {
      id: "kaupmattur",
      word: "kaupmáttur",
      gender: "kk",
      translationUkr: "купівельна спроможність",
      ipa: "[ˈkʰœipˌmauhtʏr]",
      exampleIsl: "Launahækkanir verða að skila auknum kaupmætti til að bæta lífskjör.",
      exampleUkr: "Підвищення заробітної плати має забезпечувати зростання купівельної спроможності для покращення рівня життя.",
      binUrl: "https://bin.arnastofnun.is/beyging/kaupm%C3%A1ttur"
    },
    {
      id: "kjaravidraedur",
      word: "kjaraviðræður",
      gender: "kvk.ft",
      translationUkr: "колективні трудові переговори (щодо зарплат і умов)",
      ipa: "[ˈcʰaːraˌvɪːðˌraiːðʏr]",
      exampleIsl: "Kjaraviðræður milli ASÍ og SA fara oft fram í Karphúsinu hjá ríkissáttasemjara.",
      exampleUkr: "Трудові переговори між конфедерацією профспілок ASÍ та асоціацією працедавців SA часто відбуваються у Карпхусі у державного посередника.",
      binUrl: "https://bin.arnastofnun.is/beyging/kjaravi%C3%B0r%C3%A6%C3%B0ur"
    },
    {
      id: "samkeppnishæfni",
      word: "samkeppnishæfni",
      gender: "kvk",
      translationUkr: "конкурентоспроможність",
      ipa: "[ˈsamˌcʰɛhpnɪsˌhaivnɪ]",
      exampleIsl: "Góð menntun og tækni auka samkeppnishæfni íslenskra fyrirtækja á alþjóðamarkaði.",
      exampleUkr: "Якісна освіта та технології підвищують конкурентоспроможність ісландських компаній на міжнародному ринку.",
      binUrl: "https://bin.arnastofnun.is/beyging/samkeppnish%C3%A6fni"
    },
    {
      id: "efnahagsmal",
      word: "efnahagsmál",
      gender: "hk.ft",
      translationUkr: "економічні питання, стан економіки",
      ipa: "[ˈɛpnaˌhaksˌmauːl]",
      exampleIsl: "Efnahagsmál eru mikið rædd í fjölmiðlum og á Alþingi.",
      exampleUkr: "Економічні питання широко обговорюються у засобах масової інформації та в парламенті (Альтингі).",
      binUrl: "https://bin.arnastofnun.is/beyging/efnahagsm%C3%A1l"
    },
    {
      id: "stodugleiki",
      word: "stöðugleiki",
      gender: "kk",
      translationUkr: "стабільність",
      ipa: "[ˈstœːðʏɣˌleicɪ]",
      exampleIsl: "Bæði verkalýðsfélög og atvinnurekendur stefna að efnahagslegum stöðugleika.",
      exampleUkr: "Як профспілки, так і роботодавці прагнуть до економічної стабільності.",
      binUrl: "https://bin.arnastofnun.is/beyging/st%C3%B6%C3%B0ugleiki"
    }
  ],

  // 2. GRAMMAR RULES OF LEVEL B1
  grammarRules: [
    {
      id: "vh_nutid",
      titleUkr: "1. Теперішній час умовного способу (Viðtengingarháttur nútíðar)",
      icon: "📐",
      contentUkr: "Вживається у підрядних реченнях після дієслів волевиявлення, бажання, наказу чи сумніву (að vilja, að óska, að krefjast, að vona, að efast um). Утворюється заміною тематичного голосного: слабкі дієслова мають закінчення -i у всіх особах однини (ég tali, þú talir, hann tali), сильні дієслова приймають суфікс -i до кореня теперішнього часу (ég fari, þú farir, hann fari; við förum, þið farið, þeir fari). Приклад: «Við krefjumst þess að laun verði hækkuð» (Ми вимагаємо, щоб зарплати були підвищені)."
    },
    {
      id: "vh_thatid",
      titleUkr: "2. Минулий час умовного способу (Viðtengingarháttur þátíðar) та нереальні умови",
      icon: "⏳",
      contentUkr: "Виражає нереальну, гіпотетичну або бажану дію («якби... то...»). Утворюється від основи множини минулого часу із чергуванням I-умлауту: að vera -> voru -> væri (ég væri — я був би), að fara -> fóru -> færi (hann færi — він поїхав би), að geta -> gátu -> gæti (ég gæti — я міг би), að vilja -> vildi (ég vildi — я хотів би). Приклад конструкції: «Ef stýrivextir væru lægri, gæti fólk keypt húsnæði» (Якби процентні ставки були нижчими, люди могли б купувати житло)."
    },
    {
      id: "media_debate",
      titleUkr: "3. Аналіз економічних новин RÚV та профспілкова термінологія",
      icon: "📰",
      contentUkr: "На рівні B1 студент переходить від простого діалогу в магазині до розуміння офіційних заяв на порталах RÚV Auðskilið, Kjarninn/Heimildin та Vísir. Ключові концепції: Kjarasamningar (колективні договори, що укладаються на 3–4 роки), Lágmarkslaun (законодавчий мінімум), Kjaraviðræður (переговори за участі держпосередника Ríkissáttasemjari у Karphúsið)."
    }
  ],

  // 3. DIALOGUE: ECONOMIC DEBATE & WORKPLACE CONTRACTS
  dialogue: [
    {
      id: "l1",
      speaker: "Gunnar",
      speakerUkr: "Економіст працедавців (SA)",
      textIsl: "Góðan dag, Guðrún. Hvernig líst þér á stöðuna í komandi kjaraviðræðum?",
      textUkr: "Доброго дня, Ґудрун. Як ти оцінюєш ситуацію у майбутніх колективних переговорах?",
      audioUrl: "audio/dialogue/b1_k1_l1.mp3",
      avatar: "👨‍💼"
    },
    {
      id: "l2",
      speaker: "Guðrún",
      speakerUkr: "Голова профспілки Efling",
      textIsl: "Sæll Gunnar. Við krefjumst þess að kaupmáttur launafólks verði varinn gegn verðbólgu.",
      textUkr: "Привіт, Ґуннаре. Ми вимагаємо, щоб купівельна спроможність працівників була захищена від інфляції.",
      audioUrl: "audio/dialogue/b1_k1_l2.mp3",
      avatar: "👩‍💼"
    },
    {
      id: "l3",
      speaker: "Gunnar",
      speakerUkr: "Економіст працедавців (SA)",
      textIsl: "Ég skil það vel, en ef stýrivextir Seðlabankans lækkuðu ekki, gæti mikil launahækkun aukið verðbólguna.",
      textUkr: "Я добре це розумію, але якби процентні ставки центробанку не знижувалися, різке підвищення зарплат могло б посилити інфляцію.",
      audioUrl: "audio/dialogue/b1_k1_l3.mp3",
      avatar: "👨‍💼"
    },
    {
      id: "l4",
      speaker: "Guðrún",
      speakerUkr: "Голова профспілки Efling",
      textIsl: "Það væri óásættanlegt að launafólk bæri eitt allar byrðar efnahagsstjórnarinnar.",
      textUkr: "Було б неприйнятно, щоб одні лише працівники несли весь тягар економічного управління.",
      audioUrl: "audio/dialogue/b1_k1_l4.mp3",
      avatar: "👩‍💼"
    },
    {
      id: "l5",
      speaker: "Gunnar",
      speakerUkr: "Економіст працедавців (SA)",
      textIsl: "Vissulega. Við viljum að samningar stuðli að stöðugleika og aukinni framleiðni í atvinnulífinu.",
      textUkr: "Звісно. Ми прагнемо, щоб договори сприяли стабільності та підвищенню продуктивності праці в економіці.",
      audioUrl: "audio/dialogue/b1_k1_l5.mp3",
      avatar: "👨‍💼"
    },
    {
      id: "l6",
      speaker: "Guðrún",
      speakerUkr: "Голова профспілки Efling",
      textIsl: "Ef ríkisstjórnin kæmi að borðinu með skattalækkanir og aðgerðir í húsnæðismálum, myndi það greiða fyrir samningum.",
      textUkr: "Якби уряд приєднався до переговорів зі зниженням податків та заходами в житловій сфері, це посприяло б укладенню угоди.",
      audioUrl: "audio/dialogue/b1_k1_l6.mp3",
      avatar: "👩‍💼"
    },
    {
      id: "l7",
      speaker: "Gunnar",
      speakerUkr: "Економіст працедавців (SA)",
      textIsl: "Það er skynsamleg nálgun. Við skulum vona að samningar náist fyrir lok mánaðarins.",
      textUkr: "Це розумний підхід. Будемо сподіватися, що згоди вдасться досягти до кінця місяця.",
      audioUrl: "audio/dialogue/b1_k1_l7.mp3",
      avatar: "👨‍💼"
    },
    {
      id: "l8",
      speaker: "Guðrún",
      speakerUkr: "Голова профспілки Efling",
      textIsl: "Sammála. Það er mikilvægt að allir aðilar sýni ábyrgð og vinni að sameiginlegu markmiði.",
      textUkr: "Згодна. Важливо, щоб усі сторони проявляли відповідальність і працювали заради спільної мети.",
      audioUrl: "audio/dialogue/b1_k1_l8.mp3",
      avatar: "👩‍💼"
    }
  ]
};
