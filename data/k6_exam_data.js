/**
 * k6_exam_data.js - Official 15-Question Final Certification Exam Dataset for Lesson 6
 * Kafli 6: Matur, eldamennska og veitingahús (Food, Cooking, Restaurant & Partitive Syntax)
 * 
 * Based on:
 * - Íslenska fyrir alla 1 (Kafli 7)
 * - Tölum saman 2022 (Eldhús & Veitingastaðir)
 * - Litli málfræðingurinn & Árnastofnun BÍN
 */

export const K6_EXAM_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Сертифікаційний іспит: Їжа, кулінарія, ресторан та кількісні конструкції",
  titleIsl: "Lokapróf K6: Matur, eldamennska og veitingahús",
  chapterId: "kafli_6",
  totalQuestions: 15,
  passingScore: 12, // 80%
  xpReward: 150,
  gemsReward: 10,

  blocks: [
    { id: "icelandic_food", nameUkr: "1. Ісландська гастрономія (Lambakjöt, skyr, fiskur)", questionsCount: 4 },
    { id: "partitive_syntax", nameUkr: "2. Партитивні одиниці міри (af + ÞGF 🟡)", questionsCount: 4 },
    { id: "cooking_verbs", nameUkr: "3. Кулінарні дієслова та чергування (sjóða / sýð, baka)", questionsCount: 4 },
    { id: "restaurant_etiquette", nameUkr: "4. Етикет ресторану, рахунок та оплата (Reikningur)", questionsCount: 3 }
  ],

  questions: [
    // BLOCK 1: ICELANDIC FOOD
    {
      id: "q1",
      block: "icelandic_food",
      questionUkr: "Що таке 'skyr' в ісландській кулінарній традиції?",
      promptIsl: "Hvað er skyr?",
      options: [
        { text: "Солодкий газований напій", isCorrect: false },
        { text: "Традиційний густий кисломолочний сир/продукт із високим вмістом білка", isCorrect: true },
        { text: "Сушена баранина", isCorrect: false },
        { text: "Сорт печива", isCorrect: false }
      ],
      explanation: "Skyr — давній нордичний кисломолочний продукт, споріднений з м'яким сиром, що є візитівкою ісландського сніданку."
    },
    {
      id: "q2",
      block: "icelandic_food",
      questionUkr: "Яке м'ясо є основою традиційного супу 'íslensk kjötsúpa'?",
      promptIsl: "Íslensk kjötsúpa er búin til úr:",
      options: [
        { text: "nautakjöti (яловичина)", isCorrect: false },
        { text: "lambakjöti (ісландська баранина / ягнятина)", isCorrect: true },
        { text: "svínakjöti (свинина)", isCorrect: false },
        { text: "kjúklingi (курка)", isCorrect: false }
      ],
      explanation: "Традиційна ісландська кйотсупа готується виключно з добірного ягняти (lambakjöt) та коренеплодів (rótargrænmeti)."
    },
    {
      id: "q3",
      block: "icelandic_food",
      questionUkr: "Чи потрібно платити за воду з-під крана (kranavatn) в ісландських ресторанах?",
      promptIsl: "Kranavatn á veitingahúsum:",
      options: [
        { text: "Так, вона коштує як вино", isCorrect: false },
        { text: "Ні, вона завжди безкоштовна, надзвичайно чиста та подається в графинах", isCorrect: true },
        { text: "Її взагалі заборонено подавати", isCorrect: false },
        { text: "Лише за спеціальним дозволом лікаря", isCorrect: false }
      ],
      explanation: "В Ісландії вода з крана є джерельною природного льодовикового походження і в закладах харчування подається безкоштовно за замовчуванням."
    },
    {
      id: "q4",
      block: "icelandic_food",
      questionUkr: "Яка найважливіша біла промислова риба в ісландському меню?",
      promptIsl: "Vinsælasti hvítfiskurinn á Íslandi:",
      options: [
        { text: "Þorskur (тріска)", isCorrect: true },
        { text: "Hákarl (тухла акула)", isCorrect: false },
        { text: "Síld", isCorrect: false },
        { text: "Lúða", isCorrect: false }
      ],
      explanation: "Þorskur (атлантична тріска) та Ýsa (пікша) — головні білі риби щоденного раціону ісландців."
    },

    // BLOCK 2: PARTITIVE SYNTAX
    {
      id: "q5",
      block: "partitive_syntax",
      questionUkr: "Якого відмінка вимагає прийменник 'af' у партитивних конструкціях міри (наприклад, glas af...)?",
      promptIsl: "af + ___ (fallstjórnun)",
      options: [
        { text: "Þolfall (Знахідний 🟢)", isCorrect: false },
        { text: "Þágufall (Давальний 🟡)", isCorrect: true },
        { text: "Nefnifall (Називний 🔵)", isCorrect: false },
        { text: "Eignarfall (Родовий 🔴)", isCorrect: false }
      ],
      explanation: "Прийменник 'af' завжди керує ДАВАЛЬНИМ відмінком (ÞGF 🟡)! Тому: glas af vatni (vatn -> vatni), bolli af tei (te -> tei)."
    },
    {
      id: "q6",
      block: "partitive_syntax",
      questionUkr: "Як правильно сказати 'склянка води' ісландською мовою?",
      promptIsl: "Hvernig segir maður 'склянка води'?",
      options: [
        { text: "glas af vatn", isCorrect: false },
        { text: "glas af vatni (vatn -> vatni ÞGF 🟡)", isCorrect: true },
        { text: "glas með vatn", isCorrect: false },
        { text: "glas vatns", isCorrect: false }
      ],
      explanation: "Після 'af' іменник середнього роду 'vatn' приймає закінчення давального відмінка -i: 'glas af vatni'."
    },
    {
      id: "q7",
      block: "partitive_syntax",
      questionUkr: "Як сказати 'скибка хліба з сиром' (brauð у давальному відмінку)?",
      promptIsl: "Sneið af ___ með osti.",
      options: [
        { text: "brauði (brauð -> brauði 🟡)", isCorrect: true },
        { text: "brauð", isCorrect: false },
        { text: "brauðs", isCorrect: false },
        { text: "brauðum", isCorrect: false }
      ],
      explanation: "'Brauð' — іменник середнього роду. У давальному відмінку однини він має закінчення -i: 'sneið af brauði'."
    },
    {
      id: "q8",
      block: "partitive_syntax",
      questionUkr: "Яку форму має слово 'epli' (яблуко) у виразі 'два кілограми яблук' (множина давального відмінка)?",
      promptIsl: "Tvö kíló af ___.",
      options: [
        { text: "epli", isCorrect: false },
        { text: "eplum (закінчення множини ÞGF -um 🟡)", isCorrect: true },
        { text: "eplar", isCorrect: false },
        { text: "eplanna", isCorrect: false }
      ],
      explanation: "Усі іменники ісландської мови в множині давального відмінка закінчуються на -um: epli -> eplum! 'Tvö kíló af eplum'."
    },

    // BLOCK 3: COOKING VERBS
    {
      id: "q9",
      block: "cooking_verbs",
      questionUkr: "Як змінюється дієслово 'að sjóða' (варити) у першій особі однини теперішнього часу (Ég)?",
      promptIsl: "Ég ___ kartöflurnar.",
      options: [
        { text: "sjóða", isCorrect: false },
        { text: "sýð (чергування голосної jó -> ý)", isCorrect: true },
        { text: "sjóðum", isCorrect: false },
        { text: "sýður", isCorrect: false }
      ],
      explanation: "Сильне дієслово 'að sjóða' зазнає аблауту в однині теперішнього часу: ég sýð, þú sýður, hann sýður!"
    },
    {
      id: "q10",
      block: "cooking_verbs",
      questionUkr: "Яку форму має дієслово 'að baka' (пекти) у першій особі множини (Við)?",
      promptIsl: "Við ___ köku.",
      options: [
        { text: "bökum (U-умлаут a -> ö)", isCorrect: true },
        { text: "bakum", isCorrect: false },
        { text: "bökur", isCorrect: false },
        { text: "baka", isCorrect: false }
      ],
      explanation: "Закінчення 1-ї особи множини -um викликає обов'язковий U-умлаут кореневої 'a' на 'ö': við bökum (ми печемо)!"
    },
    {
      id: "q11",
      block: "cooking_verbs",
      questionUkr: "Що означає кулінарне дієслово 'að steikja'?",
      promptIsl: "Merking sagnarinnar 'að steikja':",
      options: [
        { text: "Варити у воді", isCorrect: false },
        { text: "Смажити на пательні або запікати м'ясо", isCorrect: true },
        { text: "Різати ножем", isCorrect: false },
        { text: "Мити посуд", isCorrect: false }
      ],
      explanation: "'Að steikja' — смажити на сковороді або запікати (stektur fiskur, steikt lambakjöt)."
    },
    {
      id: "q12",
      block: "cooking_verbs",
      questionUkr: "Як сказати 'Я нарізаю овочі' від дієслова 'að skera'?",
      promptIsl: "Ég ___ grænmetið.",
      options: [
        { text: "sker (нульове закінчення в 1-й особі)", isCorrect: true },
        { text: "skera", isCorrect: false },
        { text: "skerum", isCorrect: false },
        { text: "skeri", isCorrect: false }
      ],
      explanation: "Неправильне дієслово 'að skera' в 1-й особі однини має форму 'ég sker' (без закінчення -a)."
    },

    // BLOCK 4: RESTAURANT ETIQUETTE
    {
      id: "q13",
      block: "restaurant_etiquette",
      questionUkr: "Як чемно попросити рахунок в офіціанта ісландською мовою?",
      promptIsl: "Hvernig biður maður um reikninginn?",
      options: [
        { text: "Hvað kostar allt?", isCorrect: false },
        { text: "Má ég fá reikninginn, takk?", isCorrect: true },
        { text: "Gefðu mér peninga!", isCorrect: false },
        { text: "Ég vil borga núna strax!", isCorrect: false }
      ],
      explanation: "Стандартна ввічлива ісландська формула прохання рахунку: 'Má ég fá reikninginn, takk?'"
    },
    {
      id: "q14",
      block: "restaurant_etiquette",
      questionUkr: "Що означає запитання офіціанта: 'Greiðið þið saman eða sitthvoru lagi?'",
      promptIsl: "Spurning við greiðslu:",
      options: [
        { text: "Ви будете платити готівкою чи карткою?", isCorrect: false },
        { text: "Ви платите разом чи кожен окремо?", isCorrect: true },
        { text: "Чи сподобалася вам їжа?", isCorrect: false },
        { text: "Чи бажаєте ви десерт?", isCorrect: false }
      ],
      explanation: "'Sitthvoru lagi' означає роздільний рахунок, коли кожен відвідувач оплачує свою частку окремо."
    },
    {
      id: "q15",
      block: "restaurant_etiquette",
      questionUkr: "Чи прийнято в Ісландії залишати чайові (þjórfé) в ресторанах і кафе?",
      promptIsl: "Þjórfé á Íslandi:",
      options: [
        { text: "Ні, обслуговування вже повністю включено в рахунок згідно із законом", isCorrect: true },
        { text: "Так, обов'язково 20%", isCorrect: false },
        { text: "Лише якщо офіціант попросить", isCorrect: false },
        { text: "Чайові караються штрафом", isCorrect: false }
      ],
      explanation: "В Ісландії культура чайових відсутня: сервісний збір та гідна оплата праці персоналу гарантовані профспілковими колективними угодами і вже закладені в кінцеву ціну."
    }
  ]
};
