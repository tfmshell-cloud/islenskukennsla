/**
 * k5_exam_data.js - Official 15-Question Final Certification Exam Dataset for Lesson 5
 * Kafli 5: Fjölskyldan, líkaminn og heilsan (Family, Body Parts, Health & Impersonal Syntax)
 * 
 * Based on:
 * - Íslenska fyrir alla 1 (Kafli 6)
 * - Tölum saman 2022 (Slys, veikindi & Heilsuvera)
 * - Litli málfræðingurinn & Árnastofnun BÍN
 */

export const K5_EXAM_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Сертифікаційний іспит: Сім'я, анатомія, здоров'я та безособові конструкції",
  titleIsl: "Lokapróf K5: Fjölskyldan, líkaminn og heilsan",
  chapterId: "kafli_5",
  totalQuestions: 15,
  passingScore: 12, // 80%
  xpReward: 150,
  gemsReward: 10,

  blocks: [
    { id: "impersonal_syntax", nameUkr: "1. Безособові конструкції відчуттів (Mér er illt / kalt)", questionsCount: 4 },
    { id: "anatomy_dative", nameUkr: "2. Анатомія та давальний відмінок болю (í + ÞGF 🟡)", questionsCount: 4 },
    { id: "kinship_r_inflection", nameUkr: "3. Сім'я та історична R-відміна (faðir/föður, móðir)", questionsCount: 4 },
    { id: "clinic_pharmacy", nameUkr: "4. Візит до лікаря, аптека та система Heilsuvera", questionsCount: 3 }
  ],

  questions: [
    // BLOCK 1: IMPERSONAL SYNTAX
    {
      id: "q1",
      block: "impersonal_syntax",
      questionUkr: "У якому відмінку стоїть займенник особи у фразі 'У мене болить...' (Mér er illt í...)?",
      promptIsl: "___ er illt í maganum.",
      options: [
        { text: "Nefnifall (Ég)", isCorrect: false },
        { text: "Þolfall (Mig)", isCorrect: false },
        { text: "Þágufall (Mér 🟡)", isCorrect: true },
        { text: "Eignarfall (Mín)", isCorrect: false }
      ],
      explanation: "Конструкція фізичного відчуття або болю 'vera illt í' є БЕЗОСОБОВОЮ і вимагає суб'єкта виключно в ДАВАЛЬНОМУ відмінку (ÞGF 🟡): 'Mér er illt...', 'Þér er illt...', 'Honum er illt...'."
    },
    {
      id: "q2",
      block: "impersonal_syntax",
      questionUkr: "Як сказати 'Мені холодно' відповідно до норм ісландської граматики?",
      promptIsl: "Hvernig segir maður 'Мені холодно'?",
      options: [
        { text: "Ég er kaldur (це означає 'я холодна людина за характером')", isCorrect: false },
        { text: "Mér er kalt (давальний відмінок + сер. рід 🟡)", isCorrect: true },
        { text: "Mig er kalt", isCorrect: false },
        { text: "Mér finnst kalt", isCorrect: false }
      ],
      explanation: "Фізичне відчуття температури виражається безособово: 'Mér er kalt' (мені холодно) або 'Mér er heitt' (мені гаряче). Вживання 'Ég er kaldur' означає емоційну холодність або черствість характеру!"
    },
    {
      id: "q3",
      block: "impersonal_syntax",
      questionUkr: "У чому полягає граматична різниця між 'að langa' (хотіти) та 'að finnast' (вважати)?",
      promptIsl: "___ langar í vatn / ___ finnst þetta gott.",
      options: [
        { text: "Langa вимагає Знахідного (Mig 🟢), а finnast — Давального (Mér 🟡)", isCorrect: true },
        { text: "Обидва дієслова вимагають Називного відмінка (Ég)", isCorrect: false },
        { text: "Langa вимагає Давального, а finnast — Родового", isCorrect: false },
        { text: "Вони взаємозамінні без зміни форми займенника", isCorrect: false }
      ],
      explanation: "Класична синтаксична пастка: дієслово бажання 'að langa' вимагає ЗНАХІДНОГО відмінка: 'Mig langar í...' (ÞF 🟢), тоді як дієслово особистої оцінки 'að finnast' вимагає ДАВАЛЬНОГО: 'Mér finnst...' (ÞGF 🟡)."
    },
    {
      id: "q4",
      block: "impersonal_syntax",
      questionUkr: "Як звучить вираз 'У неї болить голова'?",
      promptIsl: "Henni / Hún / Hana?",
      options: [
        { text: "Hún er illt í höfðinu", isCorrect: false },
        { text: "Hana er illt í höfðinu", isCorrect: false },
        { text: "Henni er illt í höfðinu (Hún -> Henni ÞGF 🟡)", isCorrect: true },
        { text: "Hennar er illt í höfðinu", isCorrect: false }
      ],
      explanation: "Займенник третьої особи жіночого роду 'hún' у давальному відмінку має форму 'henni': 'Henni er illt í höfðinu'."
    },

    // BLOCK 2: ANATOMY & DATIVE CASE
    {
      id: "q5",
      block: "anatomy_dative",
      questionUkr: "Прийменник 'í' у виразі 'Mér er illt í...' вимагає якого відмінка від частини тіла?",
      promptIsl: "Mér er illt í + ___ (fallstjórnun)",
      options: [
        { text: "Þolfall (Знахідний 🟢)", isCorrect: false },
        { text: "Þágufall (Давальний 🟡)", isCorrect: true },
        { text: "Nefnifall (Називний 🔵)", isCorrect: false },
        { text: "Eignarfall (Родовий 🔴)", isCorrect: false }
      ],
      explanation: "Оскільки біль знаходиться ВСЕРЕДИНІ певної частини тіла (статичний стан місця), прийменник 'í' керує давальним відмінком (ÞGF 🟡): höfuð -> höfðinu, háls -> hálsinum."
    },
    {
      id: "q6",
      block: "anatomy_dative",
      questionUkr: "Яку форму набуває іменник середнього роду 'höfuð' (голова) з означеним артиклем у давальному відмінку?",
      promptIsl: "Mér er illt í ___ (höfuð + greinir í ÞGF).",
      options: [
        { text: "höfuðið", isCorrect: false },
        { text: "höfðinu (випадає u, закінчення -inu 🟡)", isCorrect: true },
        { text: "höfuðinu", isCorrect: false },
        { text: "höfðan", isCorrect: false }
      ],
      explanation: "В іменнику 'höfuð' відбувається синкопа другого складу при додаванні закінчення: höfuð -> höfði (неозначена) -> höfðinu (означена з артиклем у ÞGF 🟡)."
    },
    {
      id: "q7",
      block: "anatomy_dative",
      questionUkr: "Як сказати 'У мене болить зуб' (tönn — жіночий рід)?",
      promptIsl: "Mér er illt í ___.",
      options: [
        { text: "tönninni (tönn -> tönn -> tönninni 🟡)", isCorrect: true },
        { text: "tönnina", isCorrect: false },
        { text: "tennur", isCorrect: false },
        { text: "tönninu", isCorrect: false }
      ],
      explanation: "'Tönn' — іменник жіночого роду. У давальному відмінку однини з артиклем він має закінчення -inni: 'Mér er illt í tönninni'."
    },
    {
      id: "q8",
      block: "anatomy_dative",
      questionUkr: "Як сказати 'У мене болить спина' (bak — середній рід)?",
      promptIsl: "Mér er illt í ___.",
      options: [
        { text: "bakinu (bak -> baki -> bakinu 🟡)", isCorrect: true },
        { text: "bakið", isCorrect: false },
        { text: "bökum", isCorrect: false },
        { text: "bakanna", isCorrect: false }
      ],
      explanation: "'Bak' — іменник середнього роду (hk.). У давальному відмінку з артиклем: bakið (NF) -> bakinu (ÞGF): 'Mér er illt í bakinu'."
    },

    // BLOCK 3: KINSHIP & R-INFLECTION
    {
      id: "q9",
      block: "kinship_r_inflection",
      questionUkr: "Яку форму має слово 'faðir' (батько) у реченні 'Я бачу свого батька' (Знахідний відмінок ÞF)?",
      promptIsl: "Ég sé ___ minn.",
      options: [
        { text: "faðir", isCorrect: false },
        { text: "föður (R-відміна з U-умлаутом 🟢)", isCorrect: true },
        { text: "faðann", isCorrect: false },
        { text: "feður", isCorrect: false }
      ],
      explanation: "Слово 'faðir' належить до давньої R-відміни: в усіх непрямих відмінках однини (ÞF, ÞGF, EF) воно змінює голосну 'a' на 'ö' через U-умлаут: föður! Тому: 'Ég sé föður minn'."
    },
    {
      id: "q10",
      block: "kinship_r_inflection",
      questionUkr: "Як звучить множина слова 'bróðir' (брати) у називному відмінку?",
      promptIsl: "Þeir eru tveir ___.",
      options: [
        { text: "bróðirar", isCorrect: false },
        { text: "bræður (з I-умлаутом ó -> æ)", isCorrect: true },
        { text: "bróður", isCorrect: false },
        { text: "bræðir", isCorrect: false }
      ],
      explanation: "Іменник 'bróðir' утворює множину за допомогою I-умлауту голосної кореня: ó переходить у æ: bróðir -> bræður! Аналогічно: móðir -> mæður."
    },
    {
      id: "q11",
      block: "kinship_r_inflection",
      questionUkr: "Яку форму має слово 'sonur' (син) у давальному відмінку (ÞGF 🟡)?",
      promptIsl: "Ég gef ___ mínum gjöf.",
      options: [
        { text: "soni", isCorrect: false },
        { text: "syni (з чергуванням o -> y 🟡)", isCorrect: true },
        { text: "son", isCorrect: false },
        { text: "sonar", isCorrect: false }
      ],
      explanation: "Слово 'sonur' у давальному відмінку однини має історичне чергування кореневої голосної o -> y: syni! 'Ég gef syni mínum gjöf'."
    },
    {
      id: "q12",
      block: "kinship_r_inflection",
      questionUkr: "Як в ісландській мові утворюється множина слова 'barn' (дитина)?",
      promptIsl: "Við eigum þrjú ___.",
      options: [
        { text: "barnar", isCorrect: false },
        { text: "börn (U-умлаут a -> ö)", isCorrect: true },
        { text: "börnum", isCorrect: false },
        { text: "barnir", isCorrect: false }
      ],
      explanation: "Іменник середнього роду 'barn' під дією суфікса множини зазнає U-умлауту: голосна 'a' переходить у 'ö': barn -> börn."
    },

    // BLOCK 4: CLINIC, PHARMACY & HEILSUVERA
    {
      id: "q13",
      block: "clinic_pharmacy",
      questionUkr: "Що таке 'rafrænn lyfseðill' в ісландській системі охорони здоров'я?",
      promptIsl: "Hvað er rafrænn lyfseðill?",
      audio: "audio/exam/hlustun_k5_q13.mp3",
      options: [
        { text: "Паперовий талон на чергу в лікарні", isCorrect: false },
        { text: "Електронний медичний рецепт, прив'язаний до кеннітали пацієнта", isCorrect: true },
        { text: "Чек про оплату прийому лікаря", isCorrect: false },
        { text: "Посвідчення лікаря", isCorrect: false }
      ],
      explanation: "В Ісландії лікарі не виписують паперових рецептів: 'rafrænn lyfseðill' відправляється в центральну базу Lyfjagátt / Heilsuvera, і будь-яка аптека країни відпускає ліки за номером Kennitala."
    },
    {
      id: "q14",
      block: "clinic_pharmacy",
      questionUkr: "Як ісландською називаються антибіотики та знеболювальні препарати?",
      promptIsl: "Hugtök í apóteki:",
      audio: "audio/exam/hlustun_k5_q14.mp3",
      options: [
        { text: "Sýklalyf (антибіотики) та Verkjalyf (знеболювальні)", isCorrect: true },
        { text: "Hálstöflur та Nefúði", isCorrect: false },
        { text: "Sápa та Sjampó", isCorrect: false },
        { text: "Kaffi та Te", isCorrect: false }
      ],
      explanation: "Sýkill (бактерія) + lyf (ліки) = Sýklalyf (антибіотики); Verkur (біль) + lyf = Verkjalyf (знеболювальне)."
    },
    {
      id: "q15",
      block: "clinic_pharmacy",
      questionUkr: "Який єдиний екстрений номер телефону діє в Ісландії для виклику швидкої (sjúkrabíll), поліції та рятувальників?",
      promptIsl: "Neyðarnúmerið á Íslandi er:",
      audio: "audio/exam/hlustun_k5_health.mp3",
      options: [
        { text: "911", isCorrect: false },
        { text: "112", isCorrect: true },
        { text: "118", isCorrect: false },
        { text: "1700", isCorrect: false }
      ],
      explanation: "Єдиний екстрений номер в Ісландії — 112 (Neyðarlínan). Інформаційна медична консультація медсестер — 1700."
    }
  ]
};
