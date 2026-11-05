/**
 * a2_k3_exam_data.js - Official 15-Question Academic Certification Exam for Book 2 / Kafli 3
 * (LEVEL A2.1 CERTIFICATION EXAM: SAMGÖNGUR, KLAPP, FERÐALÖG OG HREYFISAGNIR)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 8 & 4)
 * - Strætó bs. & Klapp greiðslukerfi
 * - SafeTravel & Vegagerðin regulations
 * - Árnastofnun BÍN (Hreyfiprófessar: ÞF vs ÞGF, Til + EF)
 */

export const A2_K3_EXAM_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Академічний сертифікаційний іспит: Урок A2.3 (Транспорт, Klapp та дієслова руху)",
  titleIsl: "Lokapróf: Kafli 3 (ÍFA 2) — Samgöngur, Klapp og hreyfisagnir",
  chapterId: "a2_k3_transport",
  passingScore: 80, // %
  xpReward: 160,
  gemReward: 12,

  questions: [
    {
      id: "q1",
      type: "single",
      promptUkr: "Яким відмінком керує дієслово «að aka» (керувати авто / їхати на авто)?",
      options: [
        "Þágufall (ÞGF 🟡 — Давальний відмінок)",
        "Þolfall (ÞF 🟢 — Знахідний відмінок)",
        "Eignarfall (EF 🟣 — Родовий відмінок)",
        "Nefnifall (NF 🔵 — Називний відмінок)"
      ],
      correctIndex: 0,
      explanation: "Дієслово «að aka» в ісландській мові вимагає після себе додатка в давальному відмінку (ÞGF 🟡): «Hann ekur nýjum bíl» (він їздить на новому авто)."
    },
    {
      id: "q2",
      type: "single",
      promptUkr: "Оберіть граматично правильне речення зі значенням динамічного руху (КУДИ?): «Я сідаю в автобус»:",
      options: [
        "Ég fer í strætó (Þolfall 🟢)",
        "Ég er í strætó (Þágufall 🟡)",
        "Ég fer til strætós",
        "Ég fer með strætó (Nefnifall 🔵)"
      ],
      correctIndex: 0,
      explanation: "Прийменник «í» при вираженні напрямку руху (Hvert? Куди?) вимагає знахідного відмінка (Þolfall 🟢): «Ég fer í strætó»."
    },
    {
      id: "q3",
      type: "single",
      promptUkr: "Оберіть граматично правильне речення зі значенням статичного перебування (ДЕ?): «Я їду в автобусі / перебуваю всередині автобуса»:",
      options: [
        "Ég er í strætó (Þágufall 🟡)",
        "Ég fer í strætó (Þolfall 🟢)",
        "Ég er á strætó",
        "Ég kem í strætó"
      ],
      correctIndex: 0,
      explanation: "При позначенні місця перебування (Hvar? Де?) прийменник «í» вимагає давального відмінка (Þágufall 🟡): «Ég er í strætó»."
    },
    {
      id: "q4",
      type: "single",
      promptUkr: "Як правильно сказати ісландською: «Ми їдемо в аеропорт Кеflavík» (напрямок руху):",
      options: [
        "Við förum á flugvöllinn (Þolfall 🟢)",
        "Við erum á flugvellinum (Þágufall 🟡)",
        "Við förum í flugvelli",
        "Við förum til flugvöllinn"
      ],
      correctIndex: 0,
      explanation: "Для аеропорту вживається прийменник «á». При русі (Куди?) іменник flugvöllur ставиться у знахідний відмінок з артиклем: «á flugvöllinn»."
    },
    {
      id: "q5",
      type: "single",
      promptUkr: "Яким відмінком керує прийменник напрямку «til» (до)?",
      options: [
        "Eignarfall (EF 🟣 — Родовий відмінок)",
        "Þágufall (ÞGF 🟡 — Давальний відмінок)",
        "Þolfall (ÞF 🟢 — Знахідний відмінок)",
        "Nefnifall (NF 🔵 — Називний відмінок)"
      ],
      correctIndex: 0,
      explanation: "Прийменник «til» (до) завжди без винятку керує родовим відмінком (Eignarfall 🟣): «til Keflavíkur», «til Íslands», «til Akureyrar»."
    },
    {
      id: "q6",
      type: "single",
      promptUkr: "Скільки часу діє одноразовий квиток (Stakt fargjald) у системі Klapp після активації?",
      options: [
        "75 хвилин (включаючи безкоштовні пересадки)",
        "30 хвилин",
        "2 години",
        "Лише одну зупинку"
      ],
      correctIndex: 0,
      explanation: "Стандартний одноразовий квиток Strætó / Klapp діє рівно 75 хвилин з моменту активації і дозволяє необмежену кількість пересадок між міськими лініями."
    },
    {
      id: "q7",
      type: "single",
      promptUkr: "Що означає дієслово «að klappa» у сучасному контексті громадського транспорту Рейк'явіка?",
      options: [
        "Прикласти картку Klappkort або відсканувати QR-код з додатку біля валідатора",
        "Аплодувати водієві після завершення рейсу",
        "Оплатити проїзд готівковими монетами",
        "Забронювати місце онлайн за 24 години"
      ],
      correctIndex: 0,
      explanation: "Неологізм «að klappa» означає валідацію поїздки: прикладання картки чи сканування екрана телефону на валідаторі автобуса."
    },
    {
      id: "q8",
      type: "single",
      promptUkr: "Що лунає в динаміках автобуса перед зупинкою: «Næsta stoppistöð...»?",
      options: [
        "Наступна зупинка...",
        "Кінцева станція...",
        "Обережно, двері зачиняються...",
        "Приготуйте квитки для контролю..."
      ],
      correctIndex: 0,
      explanation: "«Næsta stoppistöð» перекладається як «наступна зупинка» (жіночий рід від stöð)."
    },
    {
      id: "q9",
      type: "single",
      promptUkr: "Звідки відправляється експрес-шатл «Flugrútan» (Flybus) у Рейк'явіку?",
      options: [
        "BSÍ Umferðarmiðstöð (Центральний автовокзал)",
        "Harpa Tónlistarhús",
        "Háskóli Íslands",
        "Kringlan verslunarmiðstöð"
      ],
      correctIndex: 0,
      explanation: "Головна база та кінцева станція шатлів Flugrútan — це автовокзал BSÍ (Bifreiðastöð Íslands) у центрі Рейк'явіка."
    },
    {
      id: "q10",
      type: "single",
      promptUkr: "Яка максимальна дозволена швидкість на головній трасі країни Hringvegur 1 за межами міст?",
      options: [
        "90 км/год на асфальтованих ділянках (80 км/год на гравії)",
        "110 км/год",
        "130 км/год",
        "70 км/год"
      ],
      correctIndex: 0,
      explanation: "Законодавче обмеження швидкості на шосе в Ісландії становить 90 км/год на асфальті та 80 км/год на гравійних дорогах."
    },
    {
      id: "q11",
      type: "single",
      promptUkr: "Який стан дорожнього покриття на порталі Vegagerðin позначається як «Hálka»?",
      options: [
        "Ожеледиця (крижаний шар або чорний лід)",
        "Чиста та суха дорога",
        "Траса засипана свіжим піском",
        "Дорожні ремонтні роботи"
      ],
      correctIndex: 0,
      explanation: "Термін «Hálka» означає ожеледицю на дорозі. «Hálkublettir» — окремі слизькі ділянки."
    },
    {
      id: "q12",
      type: "single",
      promptUkr: "Що в Ісландії означає правило «Ljósaskylda»?",
      options: [
        "Обов'язкове цілодобове увімкнення фар ближнього світла в будь-яку пору року",
        "Вимога вимикати фари під час полярного дня",
        "Світловідбивні жилети для всіх пішоходів",
        "Обов'язкова наявність протитуманних фар"
      ],
      correctIndex: 0,
      explanation: "Ljósaskylda — законодавча вимога їздити з увімкненими фарами 24/7/365, навіть у сонячний літній полудень."
    },
    {
      id: "q13",
      type: "single",
      promptUkr: "Що робити водієві, якщо на електронному табло дороги з'явився напис «LOKAÐ / CLOSED»?",
      options: [
        "Негайно розвернутися або зупинитися: в'їзд категорично заборонено під загрозою величезного штрафу та небезпеки для життя",
        "Продовжувати рух повільно на швидкості до 30 км/год",
        "Увімкнути повний привід 4x4 і їхати далі",
        "Зателефонувати в поліцію для отримання усного дозволу"
      ],
      correctIndex: 0,
      explanation: "Напис «LOKAÐ» є абсолютним юридичним забороном руху рятувальними службами. Порушення тягне штраф понад 250 000 крон і повну оплату рятувальної операції."
    },
    {
      id: "q14",
      type: "single",
      promptUkr: "Що означає трудовий бонус «Samgöngustyrkur» у трудових договорах багатьох ісландських компаній?",
      options: [
        "Фінансова доплата працівникові за користування автобусом або велосипедом замість приватного авто",
        "Безкоштовне паливо для особистого авто",
        "Оплата штрафів за паркування",
        "Компенсація авіаквитків на відпустку"
      ],
      correctIndex: 0,
      explanation: "Samgöngustyrkur — це так звана «зелена субсидія на транспорт», яку роботодавці виплачують співробітникам за відмову від поїздок на авто на користь Strætó чи велосипеда."
    },
    {
      id: "q15",
      type: "single",
      promptUkr: "Як ісландською сказати «Я їду на велосипеді на роботу»?",
      options: [
        "Ég hjóla í vinnuna",
        "Ég tek hjól á vinnunni",
        "Ég fer með hjóli til vinnu",
        "Ég aka hjól í vinnu"
      ],
      correctIndex: 0,
      explanation: "Дієслово «að hjóla» (їхати велосипедом) природно вживається з «í vinnuna» (знахідний відмінок напрямку руху): «Ég hjóla í vinnuna»."
    }
  ]
};
