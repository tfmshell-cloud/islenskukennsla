/**
 * k3_exam_data.js - Academic Certification Exam Data for Lesson 3 (Kafli 3: Dagleg rútína & Tími)
 * Aligned with Íslenska fyrir alla 1 (Kafli 4) and Litli málfræðingurinn (Mímir / FA)
 * 
 * 15 rigorous questions testing:
 * - Block 1: V2-reglan (Verb-Second Word Order Syntax & Inversion)
 * - Block 2: Tíminn & Klukkan (Icelandic Half-hour Paradox, Neuter Numerals, Intervals)
 * - Block 3: Sagnir 3. og 4. flokkur (I-hljóðvarp: fara, koma, sofa, vinna)
 * - Block 4: Dagleg rútína & Vaktir (Workplace Shifts, Prepositions, Daily Schedule)
 */

export const K3_EXAM_DATA = {
  exam_id: "k3_routine_cert_exam",
  title_is: "Próf 3: Dagleg rútína, klukkan og V2-reglan",
  title_uk: "Академічний Сертифікаційний Іспит: Урок 3 (Щоденна рутина, годинник та Закон V2)",
  passing_score: 12, // 12 / 15 (80%) required to pass
  total_questions: 15,
  source_standard: "Íslenska fyrir alla 1 (Kafli 4) + Litli málfræðingurinn (Mímir / FA)",

  blocks: [
    {
      id: "block_v2",
      name_uk: "Блок 1: Закон дієслова на другій позиції (V2-reglan)",
      weight: 4
    },
    {
      id: "block_time",
      name_uk: "Блок 2: Годинник та часовий парадокс (Tíminn & Klukkan)",
      weight: 4
    },
    {
      id: "block_verbs",
      name_uk: "Блок 3: Дієслова 3-ї та 4-ї груп (I-hljóðvarp & óreglulegar sagnir)",
      weight: 4
    },
    {
      id: "block_shifts",
      name_uk: "Блок 4: Робочі зміни та графік (Vaktir & Daglegt líf)",
      weight: 3
    }
  ],

  questions: [
    // BLOCK 1: V2 SYNTAX (4 QUESTIONS)
    {
      id: "k3_q1",
      block_id: "block_v2",
      question_uk: "Як правильно побудувати речення, якщо ви починаєте з обставини часу «Á morgnana» (Вранці): «Á morgnana ______ klukkan sjö»?",
      options: [
        { text: "vakna ég", is_correct: true, note: "Закон V2: обставина часу стоїть на 1-й позиції, тому дієслово «vakna» зобов'язане бути на 2-й позиції, а підмет «ég» переходить на 3-тє місце." },
        { text: "ég vakna", is_correct: false, note: "Помилка! Це порушення закону V2. Дієслово опиняється на 3-му місці." },
        { text: "vakna", is_correct: false, note: "Пропущено підмет «ég»." },
        { text: "ég vaknar", is_correct: false, note: "Неправильне закінчення дієслова для 1-ї особи (має бути vakna, а не vaknar)." }
      ],
      explanation_deep: "В ісландській мові закон V2 (Verb-Second) є залізним правилом головного речення: якщо на 1-ше місце виноситься час, місце чи прислівник, дієслово не рухається, а підмет зміщується на 3-тю позицію: «Á morgnana (1) vakna (2) ég (3)».",
      audio_prompt: "Á morgnana vakna ég klukkan sjö"
    },
    {
      id: "k3_q2",
      block_id: "block_v2",
      question_uk: "Оберіть граматично правильне питальне речення з питальним словом «Hvenær» (Коли):",
      options: [
        { text: "Hvenær ferðu í vinnuna?", is_correct: true, note: "Ідеально: Hvenær (1) + ferðu (2: дієслово ferð + злитий займенник þú) + í vinnuna." },
        { text: "Hvenær þú ferð í vinnuna?", is_correct: false, note: "Помилка: займенник þú стоїть перед дієсловом, зміщуючи дієслово на 3-тю позицію." },
        { text: "Hvenær fer í vinnuna þú?", is_correct: false, note: "Неправильний порядок членів речення." },
        { text: "Ferðu hvenær í vinnuna?", is_correct: false, note: "Питальне слово має починати спеціальне питання." }
      ],
      explanation_deep: "У спеціальних запитаннях питальне слово займає 1-шу позицію, а дієслово знову опиняється на 2-й: «Hvenær (1) fer (2) þú (3)...?», що в розмовній мові перетворюється на злиту клітику «ferðu».",
      audio_prompt: "Hvenær ferðu í vinnuna?"
    },
    {
      id: "k3_q3",
      block_id: "block_v2",
      question_uk: "У загальному питанні (без питального слова) яку позицію займає дієслово?",
      options: [
        { text: "1-шу позицію (V1): «Vinnur þú mikið?»", is_correct: true, note: "Загальні питання (так/ні) починаються безпосередньо з дієслова (Verb-First / V1)." },
        { text: "2-гу позицію: «Þú vinnur mikið?»", is_correct: false, note: "Це стверджувальна інтонаційна конструкція, а не нормативне ісландське питання." },
        { text: "Останню позицію в реченні", is_correct: false, note: "В ісландській мові дієслово ніколи не ставиться в кінець головного речення." },
        { text: "3-тю позицію після часток", is_correct: false, note: "Не відповідає германському синтаксису." }
      ],
      explanation_deep: "Загальні питання в ісландській мові використовують інверсію V1: дієслово виноситься на абсолютний початок речення: «Vinnur (1) þú (2) mikið (3)?».",
      audio_prompt: "Vinnur þú mikið á kvöldin?"
    },
    {
      id: "k3_q4",
      block_id: "block_v2",
      question_uk: "Який варіант є правильним після прислівника «Svo» (Потім):",
      options: [
        { text: "Svo fer ég heim.", is_correct: true, note: "«Svo» є обставиною (позиція 1), тому дієслово «fer» стоїть на 2-му місці, а підмет «ég» — на 3-му." },
        { text: "Svo ég fer heim.", is_correct: false, note: "Порушення V2: дієслово опинилося на 3-й позиції." },
        { text: "Svo fara ég heim.", is_correct: false, note: "«fara» — інфінітив, для ég потрібна форма fer." },
        { text: "Svo heim fer ég.", is_correct: false, note: "Неправильний порядок: heim має стояти після підмета." }
      ],
      explanation_deep: "Слова зв'язку, такі як «Svo» (потім) або «Þá» (тоді), займають першу позицію в реченні, тому за законом V2 наступним обов'язково йде дієслово: «Svo (1) fer (2) ég (3) heim».",
      audio_prompt: "Svo fer ég heim og elda kvöldmat"
    },

    // BLOCK 2: TIME TELLING & PARADOX (4 QUESTIONS)
    {
      id: "k3_q5",
      block_id: "block_time",
      question_uk: "Що буквально означає ісландська фраза «Klukkan er hálf fimm»?",
      options: [
        { text: "04:30 (пів на п'яту / 16:30)", is_correct: true, note: "Ісландський парадокс: «hálf fimm» — це половина до п'яти, тобто 04:30 або 16:30!" },
        { text: "05:30 (пів на шосту)", is_correct: false, note: "Помилка! Це калька з англійської 'half past four / five', яка в Ісландії призводить до запізнення на годину." },
        { text: "05:15", is_correct: false, note: "Це «korter yfir fimm»." },
        { text: "04:45", is_correct: false, note: "Це «korter í fimm»." }
      ],
      explanation_deep: "В ісландській мові (як і в німецькій чи українській «пів до п'ятої») слово «hálf» вказує на половину години, яка ще не настала: «hálf fimm» = 04:30. Якщо вам призначено зустріч «hálf tvö», ви маєте прийти о 13:30!",
      audio_prompt: "Klukkan er hálf fimm"
    },
    {
      id: "k3_q6",
      block_id: "block_time",
      question_uk: "У якій формі роду вживаються числівники 1-4 при називанні часу («Klukkan er ______»)?",
      options: [
        { text: "У середньому роді: eitt, tvö, þrjú, fjögur", is_correct: true, note: "Час узгоджується з середнім родом: klukkan er eitt (1:00), tvö (2:00), þrjú (3:00), fjögur (4:00)." },
        { text: "У чоловічому роді: einn, tveir, þrír, fjórir", is_correct: false, note: "Чоловічий рід не використовується для абстрактного часу." },
        { text: "У жіночому роді: ein, tvær, þrjár, fjórar", is_correct: false, note: "Жіночий рід не використовується." },
        { text: "У родовому відмінку", is_correct: false, note: "Потрібен називний відмінок середнього роду." }
      ],
      explanation_deep: "Числівники від 1 до 4 в ісландській мові змінюються за родами. При позначенні годин використовується середній рід: «Klukkan er eitt» (не einn), «Klukkan er tvö» (не tveir)!",
      audio_prompt: "Klukkan er tvö"
    },
    {
      id: "k3_q7",
      block_id: "block_time",
      question_uk: "Як ісландець скаже «07:45» (за чверть восьма)?",
      options: [
        { text: "Korter í átta", is_correct: true, note: "«korter» (чверть) + прийменник «í» (до) + «átta» = за чверть восьма." },
        { text: "Korter yfir sjö", is_correct: false, note: "Це 07:15 (чверть по сьомій)." },
        { text: "Hálf átta", is_correct: false, note: "Це 07:30." },
        { text: "Fimmtán yfir átta", is_correct: false, note: "Це 08:15." }
      ],
      explanation_deep: "Для 15 хвилин до початку наступної години вживається прийменник «í»: «korter í átta» (07:45). А для 15 хвилин після початку — «yfir»: «korter yfir sjö» (07:15).",
      audio_prompt: "Klukkan er korter í átta"
    },
    {
      id: "k3_q8",
      block_id: "block_time",
      question_uk: "Як ісландською мовою сказати «12:00» (полудень)?",
      options: [
        { text: "Hádegi (eða klukkan tólf)", is_correct: true, note: "«Hádegi» — полудень, середина дня (12:00)." },
        { text: "Miðnætti", is_correct: false, note: "«Miðnætti» — це 00:00 (опівніч)." },
        { text: "Morgun", is_correct: false, note: "«Morgun» — ранок." },
        { text: "Kvöldmatur", is_correct: false, note: "Це вечеря." }
      ],
      explanation_deep: "Полудень 12:00 називається «hádegi». Звідси походить «hádegismatur» — обід, та «í hádeginu» — в обідній час.",
      audio_prompt: "Klukkan er tólf á hádegi"
    },

    // BLOCK 3: VERBS 3RD & 4TH GROUPS (4 QUESTIONS)
    {
      id: "k3_q9",
      block_id: "block_verbs",
      question_uk: "Як відмінюється дієслово 3-ї групи «fara» (йти, їхати) для 1-ї особи однини (ég)?",
      options: [
        { text: "ég fer", is_correct: true, note: "I-hljóðvarp: голосна кореня «a» мутує в «e»: fara ➔ ég fer!" },
        { text: "ég fara", is_correct: false, note: "«fara» — це інфінітив." },
        { text: "ég farar", is_correct: false, note: "Це форма для 1-ї слабкої групи на -a, до якої fara не належить." },
        { text: "ég förum", is_correct: false, note: "«förum» — форма для множини við (ми)." }
      ],
      explanation_deep: "У дієсловах 3-ї групи (sagnir á -ur) в однині відбувається I-умлаут кореня: «a» переходить в «e»: fara ➔ ég fer, þú ferð, hann fer.",
      audio_prompt: "Ég fer í vinnuna klukkan átta"
    },
    {
      id: "k3_q10",
      block_id: "block_verbs",
      question_uk: "Як відмінюється дієслово «fara» для займенника «við» (ми)?",
      options: [
        { text: "við förum", is_correct: true, note: "U-hljóðvarp перед закінченням -um: «a» мутує в «ö»: við förum!" },
        { text: "við ferum", is_correct: false, note: "У множині I-умлаут не діє." },
        { text: "við farum", is_correct: false, note: "Кореневе «a» перед «u» обов'язково перетворюється на «ö»." },
        { text: "við fara", is_correct: false, note: "«fara» — форма множини для þeir/þær/þau." }
      ],
      explanation_deep: "Закінчення 1-ї особи множини «-um» активує U-умлаут: кореневе «a» перетворюється на «ö»: «við förum» (ми йдемо/їдемо).",
      audio_prompt: "Við förum saman í sund"
    },
    {
      id: "k3_q11",
      block_id: "block_verbs",
      question_uk: "Оберіть правильну форму дієслова «koma» (приходити) для «þú» (ти):",
      options: [
        { text: "þú kemur", is_correct: true, note: "I-hljóðvarp: «o» мутує в «e» + закінчення -ur: þú kemur!" },
        { text: "þú komar", is_correct: false, note: "Неправильно." },
        { text: "þú komur", is_correct: false, note: "Без зміни кореневої голосної форма неможлива." },
        { text: "þú kem", is_correct: false, note: "«kem» — форма для ég (ég kem)." }
      ],
      explanation_deep: "Дієслово «koma» зазнає мутації «o ➔ e» в однині: ég kem, þú kemur, hann kemur. У множині основа відновлюється: við komum, þið komið, þeir koma.",
      audio_prompt: "Hvenær kemur þú heim?"
    },
    {
      id: "k3_q12",
      block_id: "block_verbs",
      question_uk: "Як правильно сказати: «Я сплю вісім годин щоночі» за допомогою дієслова «sofa»?",
      options: [
        { text: "Ég sef í átta tíma.", is_correct: true, note: "Дієслово sofa в 1-й особі змінює «o» на «e»: ég sef!" },
        { text: "Ég sofa í átta tíma.", is_correct: false, note: "«sofa» — початкова форма (інфінітив)." },
        { text: "Ég sofar í átta tíma.", is_correct: false, note: "Неправильна флексія." },
        { text: "Ég sefur í átta tíma.", is_correct: false, note: "«sefur» — форма 2-ї та 3-ї особи (þú sefur, hann sefur)." }
      ],
      explanation_deep: "Сильне дієслово «sofa» (4-та група) має парадигму однини: ég sef, þú sefur, hann/hún sefur. Зверніть увагу на відсутність закінчення в 1-й особі: «ég sef».",
      audio_prompt: "Á hverri nóttu sef ég í átta tíma"
    },

    // BLOCK 4: WORK SHIFTS & DAILY SCHEDULE (3 QUESTIONS)
    {
      id: "k3_q13",
      block_id: "block_shifts",
      question_uk: "Які стандартні години ранкової зміни «Morgunvakt» на підприємствах Ісландії?",
      options: [
        { text: "07:00 – 15:00 (або 08:00 – 16:00)", is_correct: true, note: "Morgunvakt зазвичай починається о 07:00 або 08:00 і триває 8 годин." },
        { text: "15:00 – 23:00", is_correct: false, note: "Це Kvöldvakt (вечірня зміна)." },
        { text: "23:00 – 07:00", is_correct: false, note: "Це Næturvakt (нічна зміна)." },
        { text: "12:00 – 20:00", is_correct: false, note: "Це нестандартна зміна." }
      ],
      explanation_deep: "Класичний графік позмінної роботи (vaktavinna): morgunvakt (ранкова), kvöldvakt (вечірня) та næturvakt (нічна). Працівники кажуть: «Ég er á morgunvakt í dag».",
      audio_prompt: "Ég er á morgunvakt frá sjö til þrjú"
    },
    {
      id: "k3_q14",
      block_id: "block_shifts",
      question_uk: "Як правильно сказати ісландською «у будні дні (з понеділка по п'ятницю)»?",
      options: [
        { text: "Á virkum dögum", is_correct: true, note: "«Virkur dagur» — робочий/будній день. У давальному відмінку множини: «á virkum dögum»." },
        { text: "Um helgar", is_correct: false, note: "Це означає «на вихідних» (субота-неділя)." },
        { text: "Í vinnudögum", is_correct: false, note: "Ненормативний прийменник." },
        { text: "Á sunnudögum", is_correct: false, note: "Це означає «по неділях»." }
      ],
      explanation_deep: "Вираз «á virkum dögum» вимагає форми давального відмінка множини від прикметника «virkur» та іменника «dagur» (🟡 Þágufall: virkum dögum).",
      audio_prompt: "Á virkum dögum vakna ég mjög snemma"
    },
    {
      id: "k3_q15",
      block_id: "block_shifts",
      question_uk: "Що таке «Álag» у розрахунковому листі за вечірні або нічні зміни (kvöld- / næturvakt)?",
      options: [
        { text: "Обов'язкова відсоткова доплата за роботу в незручні години (33% – 45%)", is_correct: true, note: "Álag — це тарифна надбавка за вечірню, нічну чи вихідну зміну згідно з договорами Efling/VR." },
        { text: "Податковий штраф за запізнення", is_correct: false, note: "Невірно." },
        { text: "Вартість робочої форми", is_correct: false, note: "Невірно." },
        { text: "Оплата за обідню перерву", is_correct: false, note: "Невірно." }
      ],
      explanation_deep: "«Álag» (надбавка) гарантується колективними договорами (kjarasamningar): kvöldálag (вечірня надбавка зазвичай 33%) та næturálag (нічна надбавка 45%).",
      audio_prompt: "Næturvakt gefur gott álag samkvæmt kjarasamningi"
    }
  ]
};
