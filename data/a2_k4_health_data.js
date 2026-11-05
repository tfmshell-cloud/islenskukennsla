/**
 * DATA: LESSON A2.4 (HEILBRIGÐISKERFIÐ, HEILSUGÆSLAN & HEILSUVERA)
 * Canonical Icelandic Health & Welfare Curriculum
 * References: ÍFA 2 Kafli 6 & 10, Heilsuvera.is, Læknavaktin 1700
 */

export const A2_K4_HEALTH_DATA = {
  id: "a2_k4",
  number: "A2.4",
  titleIsl: "Heilbrigðiskerfið, heilsugæslan og Heilsuvera",
  titleUkr: "Система охорони здоров'я, поліклініка та портал Heilsuvera",
  level: "A2.1 Соціальна медицина",
  source: "Íslenska fyrir alla 2 • Kafli 6 & 10 • Heilsuvera.is & Læknavaktin",

  // 1. ANATOMY & CORE CLINICAL VOCABULARY
  vocabulary: [
    {
      word: "heilsugæsla",
      article: "heilsugæslan",
      gender: "kvk",
      ipa: "[ˈheil̥sʉˌcaiːsla]",
      translation: "поліклініка / центр первинної медичної допомоги",
      sampleIsl: "Ég er skráður á heilsugæsluna í mínu hverfi.",
      sampleUkr: "Я зареєстрований у поліклініці свого району.",
      category: "medical_institutions"
    },
    {
      word: "heimilislæknir",
      article: "heimilislæknirinn",
      gender: "kk",
      ipa: "[ˈheiːmɪlɪsˌlaihkknɪr]",
      translation: "сімейний лікар",
      sampleIsl: "Heimilislæknirinn minn sendi lyfseðil í tölvuna.",
      sampleUkr: "Мій сімейний лікар відправив рецепт у комп'ютерну базу.",
      category: "medical_institutions"
    },
    {
      word: "tímapöntun",
      article: "tímapöntunin",
      gender: "kvk",
      ipa: "[ˈtʰiːmaˌpœn̥tʏn]",
      translation: "запис на прийом / бронювання візиту",
      sampleIsl: "Tímapöntun fer fram í gegnum Heilsuveru eða í síma.",
      sampleUkr: "Запис на прийом здійснюється через Heilsuvera або телефоном.",
      category: "medical_institutions"
    },
    {
      word: "Læknavaktin",
      article: "Læknavaktin",
      gender: "kvk",
      ipa: "[ˈlaihknaˌvah̥tɪn]",
      translation: "служба чергових лікарів (позаробочий час)",
      sampleIsl: "Læknavaktin er opin á kvöldin og um helgar í Austurveri.",
      sampleUkr: "Чергова служба лікарів працює вечорами та у вихідні в Аустурвері.",
      category: "emergency"
    },
    {
      word: "hjúkrunarfræðingur",
      article: "hjúkrunarfræðingurinn",
      gender: "kk",
      ipa: "[ˈçuːkrʉnarˌfraiːðɪŋkʏr]",
      translation: "медична сестра / медбрат (з вищою освітою)",
      sampleIsl: "Hjúkrunarfræðingur á línunni 1700 metur ástand sjúklingsins.",
      sampleUkr: "Медсестра на лінії 1700 оцінює стан пацієнта.",
      category: "staff"
    },
    {
      word: "rafræn skilríki",
      article: "rafrænu skilríkin",
      gender: "hk.ft",
      ipa: "[ˈravˌraiːn ˈscɪlˌriːcɪ]",
      translation: "електронні ідентифікатори (автентифікація в телефоні)",
      sampleIsl: "Þú þarft rafræn skilríki til að skrá þig inn á Heilsuveru.",
      sampleUkr: "Вам потрібен електронний ID для входу в Heilsuvera.",
      category: "digital_health"
    },
    {
      word: "bráðamóttaka",
      article: "bráðamóttakan",
      gender: "kvk",
      ipa: "[ˈprauːðaˌmouhtaka]",
      translation: "відділення невідкладної допомоги (приймальний покій)",
      sampleIsl: "Bráðamóttakan á Landspítala í Fossvogi er opin allan sólarhringinn.",
      sampleUkr: "Приймальне відділення лікарні Ландспіталі у Фоссвогурі відкрите цілодобово.",
      category: "emergency"
    },
    {
      word: "lyfseðill",
      article: "lyfseðillinn",
      gender: "kk",
      ipa: "[ˈlɪvˌsɛðɪtl]",
      translation: "рецепт на ліки (електронний у Lyfjagátt)",
      sampleIsl: "Læknirinn endurnýjaði lyfseðilinn minn.",
      sampleUkr: "Лікар продовжив дію мого рецепта.",
      category: "pharmacy"
    }
  ],

  // 2. HEALTHCARE GRAMMAR MATRIX
  grammarRules: [
    {
      title: "1. Модальні дієслова у медичних приписах: að eiga að, að þurfa að, að mega",
      explanation: "В ісландській медичній практиці лікар чи медсестра дають інструкції за допомогою трьох модальних дієслів:\n• 'að eiga að + inf' — 'повинен / слід за рекомендацією лікаря' (Þú átt að taka þetta lyf á morgnana).\n• 'að þurfa að + inf' — 'мати потребу / бути змушеним' (Ég þarf að hitta lækni strax).\n• 'að mega' — 'мати дозвіл' / 'má ekki' — 'категорично заборонено' (Þú mátt ekki aka bíl eftir þetta lyf)."
    },
    {
      title: "2. Безособові структури симптомів (Mér líður... / Mér svimar / Mér er óglatt)",
      explanation: "Симптоми та внутрішні відчуття організму в ісландській мові не виражаються через 'Ég er':\n• 'Mér líður illa' (Мені зле / погано почуваюся) [ÞGF 🟡]\n• 'Mér svimar' (У мене паморочиться в голові) [ÞGF 🟡]\n• 'Mér er óglatt' (Мене нудить) [ÞGF 🟡]\n• 'Ég er með hita / verki í hálsinum' (У мене температура / біль у горлі) [vera með + Þf]."
    },
    {
      title: "3. Препозиція 'í + ÞGF' для позначення локалізації болю",
      explanation: "При позначенні місця болю використовується прийменник 'í' з давальним відмінком (ÞGF) та суфіксальним артиклем:\n• Mér er illt í höfðinu (höfuð ➔ höfði + -nu)\n• Mér er illt í maganum (magi ➔ maga + -num)\n• Mér er illt í bakinu (bak ➔ baki + -nu)\n• Mér er illt í hálsinum (háls ➔ hálsi + -num)."
    }
  ],

  // 3. DIALOGUE: CALL TO 1700 (LÆKNAVAKTIN TRIAGE)
  dialogue: [
    {
      speaker: "Gunnar",
      speakerRole: "Sjúklingur (Пацієнт)",
      textIsl: "Góðan kvöldið, ég er að hringja í sautján hundruð af því að mér líður mjög illa.",
      textUkr: "Доброго вечора, я телефоную на 1700, тому що мені дуже зле.",
      audio: "audio/dialogue/a2_k4_l1.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Hjúkrunarfræðingur (Медсестра чергової лінії)",
      textIsl: "Góða kvöldið. Hvert er kennitölunúmerið þitt og hvaða einkenni ertu með?",
      textUkr: "Доброго вечора. Який ваш номер кеннітали та які у вас симптоми?",
      audio: "audio/dialogue/a2_k4_l2.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Sjúklingur (Пацієнт)",
      textIsl: "Kennitalan er núll einn núll tveir níutíu... Ég er með mikinn hita, svima og slæman verk í brjósti.",
      textUkr: "Кеннітала: 010290... У мене висока температура, запаморочення та сильний біль у грудях.",
      audio: "audio/dialogue/a2_k4_l3.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Hjúkrunarfræðingur",
      textIsl: "Hversu lengi hefur þú verið með þennan verk og ertu með mæði?",
      textUkr: "Як довго у вас цей біль і чи є у вас задишка?",
      audio: "audio/dialogue/a2_k4_l4.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Sjúklingur",
      textIsl: "Verkurinn byrjaði fyrir tveimur tímum og mér finnst erfitt að anda djúpt.",
      textUkr: "Біль почався дві години тому, і мені важко глибоко дихати.",
      audio: "audio/dialogue/a2_k4_l5.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Hjúkrunarfræðingur",
      textIsl: "Þetta gæti verið alvarlegt. Ég ætla að senda sjúkrabíl strax eða þú verður að koma á bráðamóttökuna í Fossvogi.",
      textUkr: "Це може бути серйозно. Я відправлю швидку негайно або вам потрібно дістатися приймального відділення у Фоссвогурі.",
      audio: "audio/dialogue/a2_k4_l6.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Sjúklingur",
      textIsl: "Er bráðamóttakan opin alla nóttina og þarf ég að hafa rafræn skilríki meðferðis?",
      textUkr: "Приймальне відділення відкрите всю ніч і чи потрібно мати з собою електронний ID?",
      audio: "audio/dialogue/a2_k4_l7.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Hjúkrunarfræðingur",
      textIsl: "Já, Landspítalinn í Fossvogi er opinn allan sólarhringinn. Taktu skilríki með og við látum lækninn vita.",
      textUkr: "Так, Ландспіталін у Фоссвогурі відкритий цілодобово. Візьміть документи, ми попередимо лікаря.",
      audio: "audio/dialogue/a2_k4_l8.mp3"
    }
  ],

  // 4. INTERACTIVE DRILL EXERCISES
  drills: [
    {
      id: "drill_1",
      title: "Симптоми та безособові конструкції",
      instruction: "Виберіть правильну ісландську граматичну конструкцію для вираження болю або нездужання:",
      questions: [
        {
          prompt: "Як сказати: «У мене паморочиться в голові»?",
          options: ["Ég svima.", "Mér svimar.", "Ég er svimi.", "Mig svimar."],
          correct: 1,
          hint: "Дієслово 'að svima' вимагає давального відмінка суб'єкта: Mér svimar."
        },
        {
          prompt: "Як правильно сказати: «У мене болить спина» (bak)?",
          options: ["Mér er illt í bakið.", "Mér er illt í bakinu.", "Ég hef illt baki.", "Mér er illt á bakinu."],
          correct: 1,
          hint: "í + ÞGF з артиклем: bak ➔ baki + nu = bakinu."
        },
        {
          prompt: "Яке модальне дієслово використовується для припису лікаря «Вам слід приймати ці ліки щодня»?",
          options: ["Þú vilt taka...", "Þú átt að taka...", "Þú mátt taka...", "Þú kannt að taka..."],
          correct: 1,
          hint: "Конструкція 'að eiga að' передає зовнішнє лікарське призначення або моральне зобов'язання."
        }
      ]
    }
  ]
};
