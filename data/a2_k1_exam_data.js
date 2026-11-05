/**
 * a2_k1_exam_data.js - Official 15-Question Academic Certification Exam for Book 2 / Kafli 1
 * (LEVEL A2.1 FOUNDATION EXAM: HÚSNÆÐI, LEIGUSAMNINGAR OG ÞÁTÍÐ VEAKRA SAGNA)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 1: Húsnæði, pp. 6-27)
 * - HMS & Leiguskrá standards
 * - Árnastofnun BÍN (Þátíð veakra sagna)
 */

export const A2_K1_EXAM_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Академічний сертифікаційний іспит: Урок A2.1 (Житло та минулий час)",
  titleIsl: "Lokapróf: Kafli 1 (ÍFA 2) — Húsnæði, leigusamningar og þátíð",
  chapterId: "a2_k1_housing",
  passingScore: 80, // %
  xpReward: 160,
  gemReward: 12,

  questions: [
    {
      id: "q1",
      type: "single",
      promptUkr: "Як утворюється форма 1-ї особи однини минулого часу (Þátíð) від дієслова «að skoða» (оглядати)?",
      options: [
        "ég skoðaði",
        "ég skoðti",
        "ég skoðdi",
        "ég skoða"
      ],
      correctIndex: 0,
      explanation: "Слабкі дієслова 1-ї групи із закінченням -a в теперішньому часі утворюють минулий час за допомогою суфікса -aði: ég skoða ➔ ég skoðaði."
    },
    {
      id: "q2",
      type: "single",
      promptUkr: "Яка форма минулого часу є правильною для дієслова 2-ї групи «að kaupa» (купувати)?",
      options: [
        "ég keypti",
        "ég kaupaði",
        "ég kaupti",
        "ég keypði"
      ],
      correctIndex: 0,
      explanation: "Дієслово «að kaupa» належить до 2-ї слабкої групи: відбувається кореневий умлаут au ➔ ey та додається глухий суфікс -ti: ég keypti."
    },
    {
      id: "q3",
      type: "single",
      promptUkr: "Оберіть правильну форму 1-ї особи множини минулого часу: «Учора ми оглянули гарну квартиру»:",
      options: [
        "Í gær skoðuðum við flotta íbúð.",
        "Í gær skoðuðum við flott íbúð.",
        "Í gær við skoðuðum flotta íbúð.",
        "Í gær skoðuðum við flotta íbúðar."
      ],
      correctIndex: 0,
      explanation: "1) Закон V2 ставить присудок на другу позицію (skoðuðum við). 2) У множині суфікс -aði переходить у -uðum через U-умлаут. 3) Іменник íbúð (жін. рід) у знахідному відмінку (ÞF 🟢) вимагає форми прикметника flotta."
    },
    {
      id: "q4",
      type: "single",
      promptUkr: "Що в Ісландії означає термін «Tveggja herbergja íbúð»?",
      options: [
        "Квартира з 1 вітальнею та 1 спальнею (двокімнатна)",
        "Квартира з 2 окремими спальнями та вітальнею",
        "Студія з двома ліжками",
        "Будинок на дві сім'ї"
      ],
      correctIndex: 0,
      explanation: "В ісландській класифікації нерухомості рахуються всі житлові кімнати, включаючи вітальню (stofa). «Tveggja herbergja íbúð» — це вітальня + одна спальня."
    },
    {
      id: "q5",
      type: "single",
      promptUkr: "Яка державна установа в Ісландії відповідає за реєстрацію договорів оренди та нарахування субсидій (Húsaleigubætur)?",
      options: [
        "HMS (Húsnæðis- og mannvirkjastofnun)",
        "Vinnumálastofnun (VMST)",
        "Þjóðskrá Íslands",
        "Skatturinn"
      ],
      correctIndex: 0,
      explanation: "HMS (Húsnæðis- og mannvirkjastofnun) веде єдиний реєстр договорів оренди (Leiguskrá) та здійснює виплату житлових субсидій (Húsaleigubætur)."
    },
    {
      id: "q6",
      type: "single",
      promptUkr: "Як ісландською мовою сказати: «Електроенергія та опалення включені в оренду»?",
      options: [
        "Rafmagn og hiti eru innifalin í leigunni.",
        "Rafmagn og hiti eru úti í leigunni.",
        "Rafmagn og hiti borga í leigunni.",
        "Rafmagn og hiti heita innifalin í leigu."
      ],
      correctIndex: 0,
      explanation: "Ідіома «vera innifalinn í...» означає «бути включеним у...». У множині середнього роду: «eru innifalin»."
    },
    {
      id: "q7",
      type: "single",
      promptUkr: "Як звучить минулий час від дієслова «að leigja» (орендувати) у формі «вона орендувала»?",
      options: [
        "Hún leigði",
        "Hún leigaði",
        "Hún leigti",
        "Hún leigt"
      ],
      correctIndex: 0,
      explanation: "Основа закінчується на дзвінкий -g-, тому використовується дзвінкий суфікс -ði: að leigja ➔ hún leigði."
    },
    {
      id: "q8",
      type: "single",
      promptUkr: "Що таке «Tryggingarfé» (або «Trygging») під час оренди квартири?",
      options: [
        "Заставний депозит (зазвичай у розмірі 2-3 місяців оренди)",
        "Щомісячний платіж за вивіз сміття",
        "Страхування від пожежі, яке сплачує місто",
        "Плата рієлтору за показ квартири"
      ],
      correctIndex: 0,
      explanation: "Trygging — це гарантійний депозит, який зберігається у банку і повертається орендарю після завершення оренди за відсутності пошкоджень."
    },
    {
      id: "q9",
      type: "single",
      promptUkr: "Яке формулювання означає, що домашні тварини в будинку суворо заборонені?",
      options: [
        "Gæludýr bönnuð",
        "Gæludýr leyfð",
        "Gæludýr velkomin",
        "Gæludýr innifalin"
      ],
      correctIndex: 0,
      explanation: "Bannaður (сер. рід мн. bönnuð) означає «заборонений». «Gæludýr bönnuð» — тварини заборонені."
    },
    {
      id: "q10",
      type: "single",
      promptUkr: "Визначте граматично правильне речення з минулим часом дієслова «að tala» (говорити):",
      options: [
        "Ég talaði við leigusalann í morgun.",
        "Ég tala við leigusalann í morgun.",
        "Ég talað við leigusalann í morgun.",
        "Ég töluðum við leigusalann í morgun."
      ],
      correctIndex: 0,
      explanation: "1-а особа однини минулого часу слабкої 1-ї групи: ég talaði."
    },
    {
      id: "q11",
      type: "single",
      promptUkr: "Що в Ісландії означає «Hússjóður»?",
      options: [
        "Внесок у фонд співвласників будинку (прибирання, ліфт, освітлення під'їзду)",
        "Міський податок на купівлю землі",
        "Оплата за паркувальне місце біля супермаркету",
        "Кредитна ставка ісландського банку"
      ],
      correctIndex: 0,
      explanation: "Hússjóður — це щомісячний внесок у спільний фонд будинку (ОСББ) для утримання спільних приміщень."
    },
    {
      id: "q12",
      type: "single",
      audio: "audio/exam/hlustun_a2k1_q12.mp3",
      promptUkr: "Як перекладається термін «Einbýlishús»?",
      options: [
        "Окремий приватний житловий будинок",
        "Однокімнатна квартира",
        "Кімната в гуртожитку",
        "Таунхаус на кілька сімей"
      ],
      correctIndex: 0,
      explanation: "Einbýlishús (ein-býlis-hús) — приватний будинок на одну сім'ю з окремою прибудинковою територією."
    },
    {
      id: "q13",
      type: "single",
      audio: "audio/exam/hlustun_a2k1_q13.mp3",
      promptUkr: "Оберіть речення, в якому дотримано ісландський порядок слів V2 та форму минулого часу від «að borga» (платити):",
      options: [
        "Í gær borgaði hann húsaleiguna.",
        "Í gær hann borgaði húsaleiguna.",
        "Í gær hann borga húsaleiguna.",
        "Hann í gær borgaði húsaleiguna."
      ],
      correctIndex: 0,
      explanation: "Обставина часу «Í gær» на 1-му місці викликає інверсію V2: присудок «borgaði» на 2-му місці, підмет «hann» на 3-му."
    },
    {
      id: "q14",
      type: "single",
      audio: "audio/exam/hlustun_a2k1_q14.mp3",
      promptUkr: "Яка правильна форма минулого часу від дієслова «að senda» (надсилати) для «við» (ми)?",
      options: [
        "Við sendum umsóknina í gær.",
        "Við senduðum umsóknina í gær.",
        "Við sendtu umsóknina í gær.",
        "Við sendaði umsóknina í gær."
      ],
      correctIndex: 0,
      explanation: "Дієслово «að senda» у 2-й групі має основу на -d, минулий час: ég sendi, þú sendir, við sendum (збігається за формою з теп. часом)."
    },
    {
      id: "q15",
      type: "single",
      audio: "audio/exam/hlustun_a2k1_housing.mp3",
      promptUkr: "🎧 Hlustunarpróf (Слухання): Прослухайте аудіодикторку: «Við leigðum nýja stúdíóíbúð í miðbænum. Húsaleigan er tvö hundruð þúsund krónur og samningurinn er skráður hjá HMS.» Яке твердження є правильним?",
      options: [
        "Орендарі винайняли студію за 200 000 kr. і зареєстрували договір у HMS",
        "Квартира коштує 300 000 крон і знаходиться за містом",
        "Орендодавець відмовився від реєстрації в системі HMS",
        "У договорі не передбачено житлові субсидії"
      ],
      correctIndex: 0,
      explanation: "У начитаному записі чітко сказано: «stúdíóíbúð í miðbænum», «tvö hundruð þúsund» (200 000 kr.) та «samningurinn er skráður hjá HMS»."
    }
  ]
};
