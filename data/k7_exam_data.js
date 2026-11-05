/**
 * k7_exam_data.js - Official 15-Question Final Certification Exam Dataset for Lesson 7
 * GRAND CEFR A1 EXIT CERTIFICATION EXAM (LOKAPRÓF FYRIR STIG A1)
 * 
 * Comprehensive synthesis of Íslenska fyrir alla 1 (Kafli 1-8):
 * - Фонетичні закони та преаспірація
 * - Закон інверсії дієслова V2
 * - Відмінювання за 4 відмінками (BÍN)
 * - Узгодження прикметників та U-умлаут
 * - Безособові конструкції болю та погоди
 * - Етикет басейнів Sundlaug та гастрономія
 */

export const K7_EXAM_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Генеральний випускний іспит рівня A1 (A1 Exit Exam)",
  titleIsl: "Lokapróf Stigs A1 (ÍFA 1 Heildarpróf)",
  chapterId: "kafli_7",
  totalQuestions: 15,
  passingScore: 12, // 80%
  xpReward: 250,
  gemsReward: 20,

  blocks: [
    { id: "grammar_syntax", nameUkr: "1. Закон V2 та синтаксис відмінків", questionsCount: 4 },
    { id: "morphology_umlaut", nameUkr: "2. Морфологія BÍN, прикметники та U-умлаут", questionsCount: 4 },
    { id: "impersonal_health", nameUkr: "3. Безособові конструкції відчуттів та здоров'я", questionsCount: 4 },
    { id: "culture_weather", nameUkr: "4. Культура басейнів Sundlaug, погода та побут", questionsCount: 3 }
  ],

  questions: [
    // BLOCK 1: GRAMMAR & SYNTAX
    {
      id: "q1",
      block: "grammar_syntax",
      questionUkr: "Згідно із законом V2, де має стояти дієслово, якщо речення починається з обставини часу 'Í dag' (сьогодні)?",
      promptIsl: "Í dag ___ ég í sund.",
      options: [
        { text: "fer (дієслово суворо на 2-й позиції)", isCorrect: true },
        { text: "ég fer (прямий порядок слів)", isCorrect: false },
        { text: "fara", isCorrect: false },
        { text: "fer ég ekki", isCorrect: false }
      ],
      explanation: "Закон V2 є непорушним: якщо першу позицію займає другорядний член (Í dag), дієслово підтягується на 2-гу позицію: 'Í dag fer ég í sund'."
    },
    {
      id: "q2",
      block: "grammar_syntax",
      questionUkr: "Котру годину означає ісландський вираз 'Klukkan er hálf fimm'?",
      promptIsl: "Klukkan er hálf fimm = ?",
      options: [
        { text: "17:30 (пів шостої)", isCorrect: false },
        { text: "16:30 (пів на п'яту, тобто половина до п'ятої!)", isCorrect: true },
        { text: "15:30", isCorrect: false },
        { text: "04:30 лише вночі", isCorrect: false }
      ],
      explanation: "Ісландський годинник рахує до наступної години: 'hálf fimm' означає 16:30 (половина до п'яти)."
    },
    {
      id: "q3",
      block: "grammar_syntax",
      questionUkr: "Якого відмінка вимагає фразове дієслово 'að fara í' (одягати щось) на відміну від 'að fara úr' (знімати)?",
      promptIsl: "fara í + ___ / fara úr + ___",
      options: [
        { text: "fara í + ÞF (Знахідний 🟢) / fara úr + ÞGF (Давальний 🟡)", isCorrect: true },
        { text: "Обидва вимагають Називного відмінка", isCorrect: false },
        { text: "fara í + ÞGF / fara úr + ÞF", isCorrect: false },
        { text: "Обидва вимагають Родового відмінка", isCorrect: false }
      ],
      explanation: "Напрямок на тіло: fara í + ÞF 🟢 ('Ég fer í úlpuna'). Рух з тіла / роздягання: fara úr + ÞGF 🟡 ('Ég fer úr úlpunni')."
    },
    {
      id: "q4",
      block: "grammar_syntax",
      questionUkr: "Який займенник множини слід вжити для змішаної групи людей (чоловіки + жінки)?",
      promptIsl: "Jón og Anna eru hérna. ___ búa í Reykjavík.",
      options: [
        { text: "Þeir (лише чоловіки)", isCorrect: false },
        { text: "Þær (лише жінки)", isCorrect: false },
        { text: "Þau (середній рід для змішаних груп 🔵)", isCorrect: true },
        { text: "Við", isCorrect: false }
      ],
      explanation: "Для групи осіб різної статі в ісландській мові вживається займенник середнього роду множини: 'Þau'."
    },

    // BLOCK 2: MORPHOLOGY & UMLAUT
    {
      id: "q5",
      block: "morphology_umlaut",
      questionUkr: "Як за правилом U-умлауту змінюється прикметник 'svartur' (чорний) у жіночому роді однини?",
      promptIsl: "Hér er ___ úlpa (kvk.).",
      options: [
        { text: "svört (a -> ö)", isCorrect: true },
        { text: "svart", isCorrect: false },
        { text: "svartur", isCorrect: false },
        { text: "svörtu", isCorrect: false }
      ],
      explanation: "U-умлаут перетворює 'a' на 'ö' у жін. роді однини: svartur (kk.) -> svört (kvk.)."
    },
    {
      id: "q6",
      block: "morphology_umlaut",
      questionUkr: "Як змінюється іменник 'faðir' (батько) у знахідному та давальному відмінках?",
      promptIsl: "Ég tala við ___ minn.",
      options: [
        { text: "faðir", isCorrect: false },
        { text: "föður (R-відміна з чергуванням a -> ö 🟡)", isCorrect: true },
        { text: "feður", isCorrect: false },
        { text: "faðann", isCorrect: false }
      ],
      explanation: "В усіх непрямих відмінках однини слово 'faðir' набуває форми 'föður'."
    },
    {
      id: "q7",
      block: "morphology_umlaut",
      questionUkr: "Як змінюється дієслово 'að sjóða' (варити) у першій особі теперішнього часу (Ég)?",
      promptIsl: "Ég ___ fiskinn.",
      options: [
        { text: "sjóða", isCorrect: false },
        { text: "sýð (аблаут jó -> ý)", isCorrect: true },
        { text: "sjóðum", isCorrect: false },
        { text: "sýður", isCorrect: false }
      ],
      explanation: "Сильне дієслово зазнає чергування голосної кореня: ég sýð, þú sýður, hann sýður."
    },
    {
      id: "q8",
      block: "morphology_umlaut",
      questionUkr: "Як сказати 'склянка води' за правилом партитиву (af + ÞGF)?",
      promptIsl: "Má ég fá eitt glas af ___?",
      options: [
        { text: "vatn", isCorrect: false },
        { text: "vatni (ÞGF 🟡)", isCorrect: true },
        { text: "vatns", isCorrect: false },
        { text: "vatninu", isCorrect: false }
      ],
      explanation: "Прийменник 'af' вимагає давального відмінка: glas af vatni."
    },

    // BLOCK 3: IMPERSONAL SYNTAX & HEALTH
    {
      id: "q9",
      block: "impersonal_health",
      questionUkr: "У якому відмінку стоїть займенник особи у виразі 'У мене болить голова'?",
      promptIsl: "___ er illt í höfðinu.",
      options: [
        { text: "Mér (Давальний відмінок ÞGF 🟡)", isCorrect: true },
        { text: "Ég (Називний)", isCorrect: false },
        { text: "Mig (Знахідний)", isCorrect: false },
        { text: "Mín (Родовий)", isCorrect: false }
      ],
      explanation: "Конструкція болю 'vera illt í' є безособовою і вимагає давального суб'єкта: 'Mér er illt...'."
    },
    {
      id: "q10",
      block: "impersonal_health",
      questionUkr: "Як сказати 'Мені холодно'?",
      promptIsl: "Rétt málnotkun:",
      options: [
        { text: "Ég er kaldur", isCorrect: false },
        { text: "Mér er kalt (давальний відмінок + сер. рід прикметника)", isCorrect: true },
        { text: "Mig er kalt", isCorrect: false },
        { text: "Mér er kalt veður", isCorrect: false }
      ],
      explanation: "'Mér er kalt' означає відчуття холоду. 'Ég er kaldur' означає черствий або жорстокий характер."
    },
    {
      id: "q11",
      block: "impersonal_health",
      questionUkr: "Що таке 'rafrænn lyfseðill' в системі Heilsuvera?",
      promptIsl: "Rafrænn lyfseðill er:",
      options: [
        { text: "Електронний рецепт на ліки, що прив'язується до Kennitala", isCorrect: true },
        { text: "Паперовий талон", isCorrect: false },
        { text: "Чек із магазину", isCorrect: false },
        { text: "Договір оренди", isCorrect: false }
      ],
      explanation: "Рецепти в Ісландії існують лише в електронному вигляді в базі Lyfjagátt/Heilsuvera."
    },
    {
      id: "q12",
      block: "impersonal_health",
      questionUkr: "Яку форму має слово 'höfuð' у виразі болю з артиклем у давальному відмінку?",
      promptIsl: "Mér er illt í ___.",
      audio: "audio/exam/hlustun_k7_q12.mp3",
      options: [
        { text: "höfðinu (синкопа höfuð -> höfði -> höfðinu 🟡)", isCorrect: true },
        { text: "höfuðið", isCorrect: false },
        { text: "höfðan", isCorrect: false },
        { text: "höfuðinu", isCorrect: false }
      ],
      explanation: "Слово 'höfuð' зазнає синкопи (випадає u): höfði -> höfðinu."
    },

    // BLOCK 4: CULTURE & WEATHER
    {
      id: "q13",
      block: "culture_weather",
      questionUkr: "Яке золоте санітарне правило діє у всіх термальних басейнах Ісландії (Sundlaugar)?",
      promptIsl: "Regla í sundlaugum:",
      audio: "audio/exam/hlustun_k7_swimming.mp3",
      options: [
        { text: "Прийняти душ із милом БЕЗ купальника перед виходом до басейну", isCorrect: true },
        { text: "Митися лише у плавках", isCorrect: false },
        { text: "Приносити власну хлорку", isCorrect: false },
        { text: "Не розмовляти у гарячих ваннах", isCorrect: false }
      ],
      explanation: "Обов'язковий душ із милом без плавок є фундаментальним гігієнічним кодексом ісландських басейнів."
    },
    {
      id: "q14",
      block: "culture_weather",
      questionUkr: "Як ісландською сказати 'Іде дощ'?",
      promptIsl: "Veðurathugun:",
      audio: "audio/exam/hlustun_k7_q14.mp3",
      options: [
        { text: "Það rignir.", isCorrect: true },
        { text: "Það er regnandi.", isCorrect: false },
        { text: "Regn kemur.", isCorrect: false },
        { text: "Það er rigninglegt.", isCorrect: false }
      ],
      explanation: "Безособове дієслово: 'Það rignir'."
    },
    {
      id: "q15",
      block: "culture_weather",
      questionUkr: "Яка пора року в Ісландії славиться явищем 'білих ночих' (bjartar nætur)?",
      promptIsl: "Hvenær er bjart allan sólarhringinn?",
      audio: "audio/exam/hlustun_k7_q15.mp3",
      options: [
        { text: "Á sumrin (влітку)", isCorrect: true },
        { text: "Á veturna (взимку)", isCorrect: false },
        { text: "Á haustin (восени)", isCorrect: false },
        { text: "Á vorin (навесні)", isCorrect: false }
      ],
      explanation: "Влітку (Á sumrin) в Ісландії сонце практично не заходить, панують білі ночі."
    }
  ]
};
