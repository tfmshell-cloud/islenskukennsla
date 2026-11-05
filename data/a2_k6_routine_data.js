/**
 * DATA: LESSON A2.6 (DAGURINN MINN, VAKTAVINNA OG MIÐMYND)
 * Daily Life, Shift Work, 11-Hour Rest & Middle Voice (-st Verbs)
 * References: ÍFA 2 Kafli 3, Tölum saman 2022, SA & ASÍ Kjarasamningar
 */

export const A2_K6_ROUTINE_DATA = {
  id: "a2_k6",
  number: "A2.6",
  titleIsl: "Dagurinn minn, vaktavinna og miðmynd",
  titleUkr: "Розклад дня, позмінна робота та зворотні дієслова на -st",
  level: "A2.1 Життєвий ритм та граматика",
  source: "Íslenska fyrir alla 2 • Kafli 3 • ASÍ Kjarasamningar • Tölum saman 2022",

  // 1. CORE ROUTINE & SHIFT WORK VOCABULARY
  vocabulary: [
    {
      word: "vaktavinna",
      article: "vaktavinnan",
      gender: "kvk",
      ipa: "[ˈvax̥taˌvɪnːa]",
      translation: "позмінна робота (графік по змінах)",
      sampleIsl: "Margir innflytjendur á Íslandi vinna í vaktavinnu.",
      sampleUkr: "Багато іммігрантів в Ісландії працюють за змінним графіком.",
      category: "work_schedule"
    },
    {
      word: "dagvakt",
      article: "dagvaktin",
      gender: "kvk",
      ipa: "[ˈtaːɣˌvax̥t]",
      translation: "денна зміна (зазвичай 08:00–16:00)",
      sampleIsl: "Ég er á dagvakt frá mánudegi til föstudags.",
      sampleUkr: "Я на денній зміні з понеділка по п'ятницю.",
      category: "work_schedule"
    },
    {
      word: "næturvakt",
      article: "næturvaktin",
      gender: "kvk",
      ipa: "[ˈnaiːtʏrˌvax̥t]",
      translation: "нічна зміна (з підвищеною оплатою næturvaktarálag)",
      sampleIsl: "Næturvaktin er erfið en hún er betur borguð.",
      sampleUkr: "Нічна зміна важка, але вона краще оплачується.",
      category: "work_schedule"
    },
    {
      word: "hvíldartími",
      article: "hvíldartíminn",
      gender: "kk",
      ipa: "[ˈkviːltarˌtʰiːmɪ]",
      translation: "час щоденного відпочинку (мінімум 11 годин за законом)",
      sampleIsl: "Lögboðinn hvíldartími milli vakta er að minnsta kosti ellefu tímar.",
      sampleUkr: "Законний час відпочинку між змінами становить щонайменше 11 годин.",
      category: "work_schedule"
    },
    {
      word: "að klæðast",
      article: "klæðist - klæddist - klæðst",
      gender: "sögn (miðmynd)",
      ipa: "[ˈkʰlaiːðast]",
      translation: "одягатися / носити на собі (+ ÞGF)",
      sampleIsl: "Starfsmenn verða að klæðast öryggisfatnaði.",
      sampleUkr: "Працівники зобов'язані вдягати захисний спецодяг.",
      category: "middle_voice"
    },
    {
      word: "að hittast",
      article: "hittumst - hittumst - hist",
      gender: "sögn (miðmynd)",
      ipa: "[ˈhɪhtast]",
      translation: "зустрічатися один з одним (взаємна дія)",
      sampleIsl: "Við hittumst á kaffistofunni í hádeginu.",
      sampleUkr: "Ми зустрічаємося в кімнаті відпочинку опівдні.",
      category: "middle_voice"
    },
    {
      word: "að finnast",
      article: "finnst - fannst - fundist",
      gender: "sögn (miðmynd)",
      ipa: "[ˈfɪnːast]",
      translation: "здаватися / мати суб'єктивну думку (+ ÞGF)",
      sampleIsl: "Mér finnst vaktavinnan henta mér vel.",
      sampleUkr: "Мені здається, позмінна робота мені добре підходить.",
      category: "middle_voice"
    },
    {
      word: "matarhlé",
      article: "matarhléið",
      gender: "hk",
      ipa: "[ˈmaːtarˌl̥jɛː]",
      translation: "обідня перерва (зазвичай 30 хвилин)",
      sampleIsl: "Matarhléið byrjar klukkan tólf á hádegi.",
      sampleUkr: "Обідня перерва починається о 12:00 опівдні.",
      category: "routine"
    }
  ],

  // 2. GRAMMAR MATRIX: MIÐMYND (-ST VERBS)
  grammarRules: [
    {
      title: "1. Творення зворотного стану на -st (Miðmynd)",
      explanation: "Зворотний стан утворюється додаванням суфікса '-st' до дієслівної основи або особового закінчення (закінчення 2-ї особи -r випадає, а 1-ї особи мн. -um переходить у -umst):\n• ég kalla ➔ ég kallast (я називаюся)\n• við hittum ➔ við hittumst (ми зустрічаємося)\n• þú sérð ➔ þú sést (тебе видно)."
    },
    {
      title: "2. Чотири семантичні категорії дієслів на -st",
      explanation: "• Взаємна дія (Reciprocal): að hittast (зустрічатися), að sjást (бачитися), að talast við (перемовлятися).\n• Власне зворотна дія (Reflexive): að klæðast + ÞGF (вдягатися в щось), að greiða sér (розчісуватися).\n• Суб'єктивне сприйняття / думка (Impersonal): að finnast + ÞGF (Mér finnst þetta gott), að heppnast (вдаватися).\n• Мимовільна зміна стану (Spontaneous): að opnast (відчинятися), að lokast (зачинятися), að breytast (змінюватися)."
    },
    {
      title: "3. Закон 11 годин безперервного відпочинку (11 tíma hvíldartími)",
      explanation: "За ісландським трудовим законодавством та колективними угодами (kjarasamningar ASÍ):\nМіж кінцем однієї зміни та початком наступної працівник має отримати мінімум 11 годин безперервного відпочинку. Якщо цей інтервал порушується через надзвичайну ситуацію, нараховується спеціальна компенсація або додатковий відгул."
    }
  ],

  // 3. DIALOGUE: SHIFT WORK HANDOVER
  dialogue: [
    {
      speaker: "Guðrún",
      speakerRole: "Starfsmaður (Колега по зміні)",
      textIsl: "Hæ Gunnar, ert þú á kvöldvakt í dag eða byrjarðu á næturvaktinni á morgun?",
      textUkr: "Привіт, Гуннаре, ти на вечірній зміні сьогодні чи виходиш на нічну завтра?",
      audio: "audio/dialogue/a2_k6_l1.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Vaktstjóri (Керівник зміни)",
      textIsl: "Sæl Guðrún. Ég er á dagvakt núna til klukkan fjögur, en svo tek ég tvær næturvaktir um helgina.",
      textUkr: "Вітаю, Гудрун. Зараз я на денній зміні до 16:00, але потім візьму дві нічні на вихідних.",
      audio: "audio/dialogue/a2_k6_l2.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Starfsmaður",
      textIsl: "Hvernig finnst þér að vinna á vöktum? Er ekki erfitt að hvílast almennilega?",
      textUkr: "Як тобі працювати по змінах? Чи не важко повноцінно відпочити?",
      audio: "audio/dialogue/a2_k6_l3.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Vaktstjóri",
      textIsl: "Jú, stundum er það krefjandi, en samkvæmt lögum verðum við alltaf að fá að minnsta kosti ellefu tíma samfellda hvíld.",
      textUkr: "Так, інколи це непросто, але за законом ми завжди повинні мати щонайменше 11 годин безперервного відпочинку.",
      audio: "audio/dialogue/a2_k6_l4.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Starfsmaður",
      textIsl: "Einmitt. Klæðist þú alltaf hlífðarfötum á vaktinni eða máttu vera í þínum eigin fötum?",
      textUkr: "Саме так. Ти завжди одягаєш захисний спецодяг на зміні чи можна бути у своєму одязі?",
      audio: "audio/dialogue/a2_k6_l5.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Vaktstjóri",
      textIsl: "Í verksmiðjunni verðum við alltaf að klæðast öryggisskóm, vesti og vera með heyrnarhlífar.",
      textUkr: "На заводі ми завжди зобов'язані вдягати спецвзуття, жилет та захисні навушники.",
      audio: "audio/dialogue/a2_k6_l6.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Starfsmaður",
      textIsl: "Gott að vita. Eigum við að hittast á kaffistofunni í hádeginu og fá okkur kaffibolla?",
      textUkr: "Добре знати. Зустрінемося в їдальні-кав'ярні в обід та вип'ємо по чашці кави?",
      audio: "audio/dialogue/a2_k6_l7.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Vaktstjóri",
      textIsl: "Já, endilega! Sjáumst þar klukkan tólf þegar matarhléið byrjar.",
      textUkr: "Так, обов'язково! Побачимося там о 12:00, коли почнеться обідня перерва.",
      audio: "audio/dialogue/a2_k6_l8.mp3"
    }
  ],

  // 4. INTERACTIVE DRILLS
  drills: [
    {
      id: "drill_1",
      title: "Дієслова на -st та правила трудового відпочинку",
      instruction: "Оберіть правильну форму дієслова або юридичну норму відпочинку:",
      questions: [
        {
          prompt: "Як сказати «Ми зустрічаємося щодня» з дієсловом взаємної дії?",
          options: ["Við hittum á hverjum degi.", "Við hittumst á hverjum degi.", "Við hittast á hverjum degi.", "Við hitti á hverjum degi."],
          correct: 1,
          hint: "Взаємна дія для 1-ї особи множини має закінчення -umst: við hittumst."
        },
        {
          prompt: "Який відмінок вимагає дієслово «að klæðast» (вдягатися в щось)?",
          options: ["Nefnifall (NF 🔵)", "Þolfall (ÞF 🟢)", "Þágufall (ÞGF 🟡)", "Eignarfall (EF 🔴)"],
          correct: 2,
          hint: "«Að klæðast» керує давальним відмінком: Hann klæðist hlýjum fötum (ÞGF)."
        },
        {
          prompt: "Скільки годин безперервного відпочинку гарантує ісландський закон між робочими змінами?",
          options: ["8 годин", "10 годин", "11 годин", "14 годин"],
          correct: 2,
          hint: "Стандарт ASÍ та директиви ЄС: мінімум 11 samfelldir tímar hvíldar."
        }
      ]
    }
  ]
};
