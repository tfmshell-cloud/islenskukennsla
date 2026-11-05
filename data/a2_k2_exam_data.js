/**
 * a2_k2_exam_data.js - Official 15-Question Academic Certification Exam for Book 2 / Kafli 2
 * (LEVEL A2.2 FOUNDATION EXAM: VINNUMARKAÐUR, LAUNASEÐILL OG ÞÁTÍÐ STERKRA SAGNA)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 2: Vinna, pp. 28-49)
 * - Skatturinn (Persónuafsláttur & Launaseðill)
 * - Stéttarfélög (Efling & VR kjarasamningar)
 * - Árnastofnun BÍN (Þátíð sterkra sagna)
 */

export const A2_K2_EXAM_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Академічний сертифікаційний іспит: Урок A2.2 (Ринок праці та сильні дієслова)",
  titleIsl: "Lokapróf: Kafli 2 (ÍFA 2) — Vinna, launaseðill og þátíð sterkra sagna",
  chapterId: "a2_k2_work",
  passingScore: 80, // %
  xpReward: 180,
  gemReward: 15,

  questions: [
    {
      id: "q1",
      type: "single",
      promptUkr: "Яка форма 1-ї особи однини минулого часу (Þátíð) у сильного дієслова «að fara» (іти / їхати)?",
      options: [
        "ég fór",
        "ég fórði",
        "ég fóraði",
        "ég fari"
      ],
      correctIndex: 0,
      explanation: "Сильні дієслова 6-го аблаутного ряду (a ➔ ó) мають нульове закінчення в 1-й та 3-й особах однини минулого часу: ég fór, hann fór."
    },
    {
      id: "q2",
      type: "single",
      promptUkr: "Як утворюється минулий час сильного редуплікативного дієслова «að fá» (отримувати) у формі «я отримав»?",
      options: [
        "ég fékk",
        "ég fáaði",
        "ég fekkði",
        "ég fést"
      ],
      correctIndex: 0,
      explanation: "Дієслово «að fá» належить до 7-го сильного ряду: кореневий голосний змінюється на -é-, а подвоєне -kk позначає преаспірований вибух: ég fékk."
    },
    {
      id: "q3",
      type: "single",
      promptUkr: "Оберіть правильну форму множини (við - ми) минулого часу від дієслова «að fara»:",
      options: [
        "við fórum",
        "við fóruð",
        "við fóru",
        "við fór"
      ],
      correctIndex: 0,
      explanation: "У множині сильні дієслова приймають стандартне закінчення 1-ї особи -um: við fórum (ми пішли / поїхали)."
    },
    {
      id: "q4",
      type: "single",
      promptUkr: "Що в трудовому договорі означає термін «Starfshlutfall»?",
      options: [
        "Відсоток ставки / частка робочого часу (100% = повна ставка)",
        "Розмір погодинної оплати",
        "Номер профспілкового квитка",
        "Кількість днів оплачуваної відпустки"
      ],
      correctIndex: 0,
      explanation: "Starfshlutfall визначає зайнятість: 100% — повноцінний робочий день (~36–40 год/тиждень), 50% — половина ставки."
    },
    {
      id: "q5",
      type: "single",
      promptUkr: "Що таке «Persónuafsláttur» у податковій системі Ісландії (Skatturinn)?",
      options: [
        "Особиста податкова знижка (щомісячний неоподатковуваний мінімум ~64 900 kr)",
        "Штраф за несвоєчасну подачу податкової декларації",
        "Додаткова оплата за роботу вночі",
        "Знижка в супермаркеті Bónus"
      ],
      correctIndex: 0,
      explanation: "Persónuafsláttur — це фіксована податкова знижка, яка щомісяця вираховується з вашого податку на доходи. Її можна використовувати на 100% або ділити між роботами."
    },
    {
      id: "q6",
      type: "single",
      promptUkr: "Яка форма минулого часу є правильною для сильного дієслова «að koma» (приходити) у реченні «Він прийшов учора»?",
      options: [
        "Hann kom í gær.",
        "Hann komaði í gær.",
        "Hann komti í gær.",
        "Hann kemur í gær."
      ],
      correctIndex: 0,
      explanation: "Дієслово «að koma» має сильний минулий час: ég kom, þú komst, hann kom, við komum."
    },
    {
      id: "q7",
      type: "single",
      promptUkr: "Що на розрахунковому табелі зарплати (Launaseðill) позначає графа «Yfirvinna»?",
      options: [
        "Понаднормові години роботи, які оплачуються за підвищеною ставкою",
        "Базовий щомісячний оклад",
        "Пенсійний внесок роботодавця",
        "Оплата за проїзд у громадському транспорті"
      ],
      correctIndex: 0,
      explanation: "Yfirvinna — робота понад нормативну тривалість робочого дня. За колективними угодами оплачується з коефіцієнтом ~1.0385% від місячного окладу за годину."
    },
    {
      id: "q8",
      type: "single",
      promptUkr: "Яка стандартна обов'язкова частка вираховується із зарплати працівника до пенсійного фонду (Lífeyrissjóður)?",
      options: [
        "4% (при цьому роботодавець доплачує 11.5%)",
        "15% від усієї суми",
        "Тільки добровільні внески",
        "1% профспілкового внеску"
      ],
      correctIndex: 0,
      explanation: "Працівник сплачує обов'язкові 4% від загального заробітку, а роботодавець зобов'язаний додати 11.5% (разом 15.5%)."
    },
    {
      id: "q9",
      type: "single",
      promptUkr: "Що в Ісландії означає поняття «Orlof» на зарплатному табелі?",
      options: [
        "Відпускні накопичення (~10.17–13.04%), які виплачуються на окремий рахунок",
        "Оплата лікарняного листка",
        "Компенсація за купівлю спецодягу",
        "Премія за підсумками року"
      ],
      correctIndex: 0,
      explanation: "Orlof — це законодавчо закріплені відпускні, які нараховуються на кожну відпрацьовану годину і зазвичай виплачуються 1 травня."
    },
    {
      id: "q10",
      type: "single",
      promptUkr: "Оберіть речення, де правильно вжито минулий час дієслова «að taka» (брати) з урахуванням закону V2:",
      options: [
        "Í gær tók ég aukavakt.",
        "Í gær ég tók aukavakt.",
        "Í gær tókaði ég aukavakt.",
        "Ég í gær tók aukavakt."
      ],
      correctIndex: 0,
      explanation: "1) Обставина «Í gær» на 1-му місці викликає інверсію V2 (дієслово tók на 2-му місці). 2) Минулий час: ég tók."
    },
    {
      id: "q11",
      type: "single",
      promptUkr: "Що таке «Stéttarfélag» (наприклад, Efling або VR)?",
      options: [
        "Професійна спілка, що захищає трудові права та укладає колективні угоди",
        "Податкова інспекція Рейк'явіка",
        "Служба міграційного контролю",
        "Комерційний банк Ісландії"
      ],
      correctIndex: 0,
      explanation: "Stéttarfélag — профспілка. Членство дає право на компенсацію курсів ісландської мови (до 75-90%), спортивних абонементів та виплати по хворобі."
    },
    {
      id: "q12",
      type: "single",
      promptUkr: "Як називається кінцева сума зарплати «чистими», яка фактично надходить на банківський рахунок працівника?",
      options: [
        "Útborguð laun (Nettó)",
        "Heildarlaun (Brúttó)",
        "Grunnlaun",
        "Skattstofn"
      ],
      correctIndex: 0,
      explanation: "Útborguð laun — сума до виплати після вирахування податків, пенсійного фонду та профспілки."
    },
    {
      id: "q13",
      type: "single",
      promptUkr: "Яка форма минулого часу сильного дієслова «að drekka» (пити) відповідає формі «við» (ми)?",
      options: [
        "við drukkum",
        "við drakk",
        "við drekkum",
        "við drukkandi"
      ],
      correctIndex: 0,
      explanation: "3-й аблаутний ряд: ég drakk (однина) ➔ við drukkum (множина з чергуванням голосного u)."
    },
    {
      id: "q14",
      type: "single",
      promptUkr: "Що означає термін «Reynslutími» у трудовому договорі?",
      options: [
        "Випробувальний термін (зазвичай до 3 місяців)",
        "Загальний стаж роботи за фахом",
        "Час обідньої перерви",
        "Період виплати вихідної допомоги"
      ],
      correctIndex: 0,
      explanation: "Reynslutími — початковий період роботи, під час якого працівник і працедавець перевіряють відповідність посаді зі скороченим терміном звільнення."
    },
    {
      id: "q15",
      type: "single",
      promptUkr: "Як звучить минулий час від сильного дієслова «að lesa» (читати) у формі «я прочитав договір»?",
      options: [
        "Ég las samninginn.",
        "Ég lesaði samninginn.",
        "Ég lesti samninginn.",
        "Ég les samninginn."
      ],
      correctIndex: 0,
      explanation: "Дієслово «að lesa» — сильне 5-го ряду: ég les (теперішній) ➔ ég las (минулий час)."
    }
  ]
};
