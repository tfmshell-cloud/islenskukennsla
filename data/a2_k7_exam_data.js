/**
 * EXAM DATA: LESSON A2.7 (BANKAR, FJÁRMÁL OG RAFRÆN SKILRÍKI)
 * 15 Questions covering Banking, Kröfur, Auðkenni & 4 Listening Tracks
 */

export const A2_K7_EXAM_DATA = {
  id: "a2_k7_exam",
  titleUkr: "Іспит A2.7: Банківська система, фінанси та Auðkenni",
  titleIsl: "Próf A2.7: Bankar, fjármál og rafræn skilríki",
  passingScore: 12,
  totalQuestions: 15,
  questions: [
    {
      id: "q1",
      type: "single",
      promptUkr: "Які три провідні комерційні банки формують основу банківської системи Ісландії?",
      options: [
        "Landsbankinn, Arion banki, Íslandsbanki",
        "Deutsche Bank, BNP Paribas, UBS",
        "PrivatBank, Monobank, Oschadbank",
        "Nordea, Swedbank, DNB"
      ],
      correctIndex: 0,
      explanation: "Велика трійка ісландських банків — це Landsbankinn (найбільший), Arion banki та Íslandsbanki."
    },
    {
      id: "q2",
      type: "single",
      promptUkr: "Що в ісландському інтернет-банкінгу означає термін «Krafa» (мн. «Kröfur»)?",
      options: [
        "Електронна платіжна вимога (рахунок до сплати), виставлена постачальником послуг на вашу кенніталу",
        "Квитанція про успішну оплату",
        "Штрафний протокол дорожньої поліції",
        "Податкова декларація"
      ],
      correctIndex: 0,
      explanation: "«Krafa» — це вимога на оплату (за електрику, садок, мобільний зв'язок), яка надходить безпосередньо в розділ «Ógreiddar kröfur» онлайн-банку."
    },
    {
      id: "q3",
      type: "single",
      promptUkr: "Який документ та ідентифікатор є обов'язковими для відкриття банківського рахунку в Ісландії?",
      options: [
        "Kennitala (ісландський особистий номер) та дійсний закордонний паспорт",
        "Лише копія трудового договору",
        "Довідка про доходи з банку рідної країни",
        "Ісландське свідоцтво про народження"
      ],
      correctIndex: 0,
      explanation: "Для відкриття рахунку обов'язково потрібні зареєстрована ісландська Kennitala та закордонний паспорт."
    },
    {
      id: "q4",
      type: "single",
      promptUkr: "Що таке мобільний додаток «Auðkenni»?",
      options: [
        "Офіційний додаток електронної ідентифікації (Rafræn skilríki) для підтвердження платежів та входу на держпортали",
        "Додаток для відстеження курсу криптовалют",
        "Програма лояльності супермаркетів",
        "Навігаційна карта ісландських доріг"
      ],
      correctIndex: 0,
      explanation: "Auðkenni забезпечує безпечну двофакторну автентифікацію через генерацію сертифікатів Rafræn skilríki на смартфоні."
    },
    {
      id: "q5",
      type: "single",
      promptUkr: "Як правильно сказати: «Роботодавець поклав зарплату на мій рахунок» з прийменником 'inn á + ÞF'?",
      options: [
        "Vinnuveitandinn lagði launin inn á reikninginn minn.",
        "Vinnuveitandinn lagði launin inn á reikningnum mínum.",
        "Vinnuveitandinn lagði launin inn af reikningi.",
        "Vinnuveitandinn lagði launin inn til reiknings."
      ],
      correctIndex: 0,
      explanation: "Рух коштів: «inn á + ÞF 🟢»: reikningur ➔ reikninginn minn."
    },
    {
      id: "q6",
      type: "single",
      promptUkr: "Як ісландською мовою називається банкомат для видачі готівки?",
      options: [
        "Hraðbanki",
        "Bílastæði",
        "Pósthús",
        "Kaffistofa"
      ],
      correctIndex: 0,
      explanation: "Hraðbanki (hraður = швидкий + banki = банк) — ісландська назва банкомату (ATM)."
    },
    {
      id: "q7",
      type: "single",
      promptUkr: "Що в банківській термінології означає «Millifærsla»?",
      options: [
        "Прямий електронний грошовий переказ з одного банківського рахунку на інший",
        "Оренда банківської скриньки",
        "Заміна пластикової картки",
        "Комісія за конвертацію валюти"
      ],
      correctIndex: 0,
      explanation: "«Millifærsla» — банківський переказ, який у межах Ісландії виконується миттєво за номером рахунку та кенніталою отримувача."
    },
    {
      id: "q8",
      type: "single",
      promptUkr: "Як перекладається термін «Leyninúmer» для платіжної картки?",
      options: [
        "ПІН-код картки (таємний 4-значний номер)",
        "Номер банківського відділення",
        "CVV-код на звороті",
        "Номер кредитного договору"
      ],
      correctIndex: 0,
      explanation: "Leyninúmer (leynilegur = секретний + númer = номер) — це персональний ПІН-код картки для банкоматів та терміналів."
    },
    {
      id: "q9",
      type: "single",
      promptUkr: "Оберіть речення минулого часу з дієсловом «að borga» (платити) та порядком слів V2:",
      options: [
        "Í gær borgaði ég alla reikningana.",
        "Í gær ég borgaði alla reikningana.",
        "Í gær borgaði alla reikningana ég.",
        "Ég í gær borgaði alla reikningana."
      ],
      correctIndex: 0,
      explanation: "Після обставини часу «Í gær» присудок «borgaði» обов'язково займає друге місце, а підмет «ég» — третє."
    },
    {
      id: "q10",
      type: "single",
      promptUkr: "Що потрібно зробити клієнту для первинної активації Rafræn skilríki в додатку Auðkenni?",
      options: [
        "Особисто прийти до відділення будь-якого банку з дійсним закордонним паспортом",
        "Надіслати копію паспорта звичайною поштою",
        "Зателефонувати на радіостанцію",
        "Заповнити форму на автозаправці"
      ],
      correctIndex: 0,
      explanation: "Первинна активація електронного ID за ісландським законом вимагає особистої верифікації особи у відділенні банку (mæta persónulega)."
    },
    {
      id: "q11",
      type: "single",
      promptUkr: "Як правильно сказати: «Я зняв гроші в банкоматі» (hraðbanki — ч.р.)?",
      options: [
        "Ég tók út úr hraðbankanum.",
        "Ég tók út úr hraðbankann.",
        "Ég tók út af hraðbanka.",
        "Ég tók út í hraðbanka."
      ],
      correctIndex: 0,
      explanation: "«Að taka út úr + ÞGF 🟡»: hraðbanki ➔ hraðbankanum."
    },
    {
      id: "q12",
      type: "single",
      audio: "audio/exam/hlustun_a2k7_q12.mp3",
      promptUkr: "🎧 Hlustunarpróf (Слухання): Що повідомила консультантка банку: «Til að virkja rafræn skilríki í símanum þarftu að mæta persónulega í banka með gild skilríki.»?",
      options: [
        "Для активації електронного ID у телефоні необхідно особисто прийти в банк із дійсними документами",
        "Активацію можна зробити повністю онлайн без візиту до банку",
        "Електронні ID більше не потрібні в Ісландії",
        "Потрібно надіслати SMS-повідомлення до поліції"
      ],
      correctIndex: 0,
      explanation: "В аудіо чітко сказано: «mæta persónulega í banka með gild skilríki» (особисто прийти в банк із дійсними документами)."
    },
    {
      id: "q13",
      type: "single",
      audio: "audio/exam/hlustun_a2k7_q13.mp3",
      promptUkr: "🎧 Hlustunarpróf (Слухання): Прослухайте репліку диктора: «Allar kröfur og ógreiddir reikningar birtast sjálfkrafa í heimabankanum undir greiðslum.» Де з'являються неоплачені рахунки?",
      options: [
        "Автоматично в інтернет-банкінгу у розділі платежів",
        "У поштовій скриньці біля будинку",
        "На робочому столі керівника",
        "У SMS-повідомленнях від банку"
      ],
      correctIndex: 0,
      explanation: "«Allar kröfur og ógreiddir reikningar birtast sjálfkrafa í heimabankanum undir greiðslum» (автоматично в інтернет-банку)."
    },
    {
      id: "q14",
      type: "single",
      audio: "audio/exam/hlustun_a2k7_q14.mp3",
      promptUkr: "🎧 Hlustunarpróf (Слухання): Що пояснила спеціалістка: «Þú getur tekið út reiðufé í öllum hraðbönkum Landsbankans með debetkortinu þínu.»?",
      options: [
        "Ви можете зняти готівку у всіх банкоматах Landsbankinn за допомогою своєї дебетової картки",
        "Зняття готівки в банкоматах повністю заборонено",
        "Картка діє лише для оплати онлайн",
        "Банкомати приймають лише іноземні паспорти"
      ],
      correctIndex: 0,
      explanation: "«tekið út reiðufé í öllum hraðbönkum Landsbankans með debetkortinu þínu» (зняти готівку в банкоматах)."
    },
    {
      id: "q15",
      type: "single",
      audio: "audio/exam/hlustun_a2k7_q15.mp3",
      promptUkr: "🎧 Hlustunarpróf (Слухання): Коли роботодавець перераховує зарплату: «Vinnuveitandinn minn leggur launin inn á nýja bankareikninginn minn síðasta dag hvers mánaðar.»?",
      options: [
        "В останній день кожного місяця",
        "Щопонеділка вранці",
        "У перший день кожного кварталу",
        "Двічі на тиждень готівкою"
      ],
      correctIndex: 0,
      explanation: "«síðasta dag hvers mánaðar» означає «в останній день кожного місяця»."
    }
  ]
};
