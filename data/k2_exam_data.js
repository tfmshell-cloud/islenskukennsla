/**
 * k2_exam_data.js - Academic Certification Exam Data for Lesson 2 (Kafli 2: Á kaffihúsi)
 * Aligned with Íslenska fyrir alla 1 (Kafli 3 & 4) and BÍN (Stofnun Árna Magnússonar)
 * 
 * 15 rigorous questions testing:
 * - Block 1: Accusative Case Masculine (kk. Þolfall 🟢: snúður ➔ snúð, bolli ➔ bolla)
 * - Block 2: Accusative Case Feminine (kvk. Þolfall 🟢: samloka ➔ samloku, kaka ➔ köku)
 * - Block 3: Accusative Neuter & Numeral Agreement (hk. Þolfall 🟢 + einn / eina / eitt)
 * - Block 4: Cafe Ordering Syntax, Realia & Prices in ISK (krónur)
 */

export const K2_EXAM_DATA = {
  exam_id: "k2_kaffihus_cert_exam",
  title_is: "Próf 2: Á kaffihúsi og í bakaríinu",
  title_uk: "Академічний Сертифікаційний Іспит: Урок 2 (Кав'ярня та пекарня)",
  passing_score: 12, // 12 / 15 (80%) required to pass
  total_questions: 15,
  source_standard: "Íslenska fyrir alla 1 (Kafli 3–4) + BÍN Stofnun Árna Magnússonar",

  blocks: [
    {
      id: "block_masculine",
      name_uk: "Блок 1: Чоловічий рід у знахідному відмінку (kk. ÞF 🟢)",
      weight: 4
    },
    {
      id: "block_feminine_umlaut",
      name_uk: "Блок 2: Жіночий рід та U-умляут (kvk. ÞF 🟢 & U-hljóðvarp)",
      weight: 4
    },
    {
      id: "block_neuter_numbers",
      name_uk: "Блок 3: Середній рід та числівники 1-4 (hk. ÞF 🟢 & Tölur)",
      weight: 4
    },
    {
      id: "block_cafe_realia",
      name_uk: "Блок 4: Етикет замовлення, рахунок у кронах та чеки",
      weight: 3
    }
  ],

  questions: [
    // BLOCK 1: MASCULINE ACCUSATIVE
    {
      id: "k2_q1",
      block_id: "block_masculine",
      question_uk: "Як змінюється іменник чоловічого роду «snúður» (булочка з корицею) у замовленні: «Ég ætla að fá einn ______»?",
      options: [
        { text: "snúð", is_correct: true, note: "Чоловічий рід втрачає закінчення називного відмінка -ur у знахідному (Nefnifall: snúður ➔ Þolfall 🟢: snúð)." },
        { text: "snúður", is_correct: false, note: "snúður — це форма називного відмінка (Nefnifall 🔵). Прямий об'єкт дії вимагає знахідного." },
        { text: "snúðu", is_correct: false, note: "Закінчення -u характерне для жіночого роду, а не сильного чоловічого." },
        { text: "snúðs", is_correct: false, note: "snúðs — це форма родового відмінка (Eignarfall 🔴)." }
      ],
      grammar_rule: "Іменники сильного чоловічого роду на -ur у знахідному відмінку однини (Þolfall 🟢) відкидають -ur, залишаючи чисту основу."
    },
    {
      id: "k2_q2",
      block_id: "block_masculine",
      question_uk: "Оберіть правильну форму для слабкого іменника чоловічого роду «bolli» (чашка/горнятко): «Ég ætla að fá einn ______ af kaffi».",
      options: [
        { text: "bolla", is_correct: true, note: "Слабкі іменники чоловічого роду на -i змінюють закінчення на -a в усіх непрямих відмінках однини (bolli ➔ bolla 🟢)." },
        { text: "bolli", is_correct: false, note: "bolli — це початкова словникова форма (Nefnifall 🔵)." },
        { text: "bollu", is_correct: false, note: "bolla (ж.р. булочка) має знахідний bollu, але чашка (bolli ч.р.) має знахідний bolla!" },
        { text: "bollar", is_correct: false, note: "bollar — це множина називного відмінка (Nefnifall fleirtala)." }
      ],
      grammar_rule: "Слабкий чоловічий рід (Veik karlkynsorð): закінчення називного -i переходить у -a в знахідному, давальному та родовому відмінках однини."
    },
    {
      id: "k2_q3",
      block_id: "block_masculine",
      question_uk: "Вам потрібен сік (appelsínusafi). Бариста запитує, що налити. Як правильно сказати?",
      options: [
        { text: "Ég ætla að fá appelsínusafa.", is_correct: true, note: "Safi (сік) — це слабкий чоловічий рід: safi ➔ safa 🟢." },
        { text: "Ég ætla að fá appelsínusafi.", is_correct: false, note: "Помилка відмінка: safi залишено в називному відмінку." },
        { text: "Ég ætla að fá appelsínusöfu.", is_correct: false, note: "Помилкове закінчення: у чоловічому роді закінчення -u не буває в знахідному однини." },
        { text: "Ég vil appelsínusafur.", is_correct: false, note: "Такого слова не існує; це штучне спотворення." }
      ],
      grammar_rule: "appelsínusafi (апельсиновий сік) у ролі додатка стає appelsínusafa 🟢."
    },
    {
      id: "k2_q4",
      block_id: "block_masculine",
      question_uk: "Як звучить замовлення на лате: «Gæti ég fengið einn ______?»",
      options: [
        { text: "latte", is_correct: true, note: "Запозичені слова типу latte, espresso, te не відмінюються або мають нульову флексію." },
        { text: "latta", is_correct: false, note: "Італійські запозичення не підлягають стандартній ісландизації в знахідному." },
        { text: "löttu", is_correct: false, note: "U-умляут не застосовується до незмінюваних іншомовних термінів." },
        { text: "lattes", is_correct: false, note: "lattes — це форма множини в англійській мові." }
      ],
      grammar_rule: "Іншомовні кавові терміни (latte, espresso, cappuccino) лишаються незмінними в знахідному відмінку однини."
    },

    // BLOCK 2: FEMININE ACCUSATIVE & U-UMLAUT
    {
      id: "k2_q5",
      block_id: "block_feminine_umlaut",
      question_uk: "Як змінюється іменник жіночого роду «samloka» (сендвіч) у знахідному відмінку (ÞF 🟢)?",
      options: [
        { text: "samloku", is_correct: true, note: "Слабкі іменники жіночого роду на -a в усіх непрямих відмінках однини отримують закінчення -u (samloka ➔ samloku 🟢)." },
        { text: "samloka", is_correct: false, note: "samloka — це називний відмінок (Nefnifall 🔵)." },
        { text: "samlokar", is_correct: false, note: "samlokur — це множина, але закінчення -ar не є формою однини." },
        { text: "samlok", is_correct: false, note: "Відкидання закінчення до кореня характерне для чоловічого роду (snúður ➔ snúð), але не для жіночого!" }
      ],
      grammar_rule: "Слабкі іменники жіночого роду (Veik kvenkynsorð) змінюють закінчення -a на -u в знахідному, давальному та родовому відмінках однини."
    },
    {
      id: "k2_q6",
      block_id: "block_feminine_umlaut",
      question_uk: "Увага, U-умляут! Що відбувається зі словом «kaka» (тістечко / пиріг) при замовленні «Ég ætla að fá eina ______»?",
      options: [
        { text: "köku", is_correct: true, note: "Закінчення -u викликає мутацію кореневого голосного a ➔ ö (U-hljóðvarp): kaka ➔ köku 🟢!" },
        { text: "kaku", is_correct: false, note: "Груба фонетична помилка: ісландська фонологія забороняє збереження 'a' перед 'u' (a...u ➔ ö...u)." },
        { text: "kaka", is_correct: false, note: "Залишено в називному відмінку." },
        { text: "kökur", is_correct: false, note: "kökur — це форма множини (пироги / тістечка)." }
      ],
      grammar_rule: "U-hljóðvarp (U-умляут): коли до основи з голосним «a» додається закінчення «-u», голосний кореня «a» обов'язково переходить у «ö»."
    },
    {
      id: "k2_q7",
      block_id: "block_feminine_umlaut",
      question_uk: "Традиційний тонкий ісландський млинець зветься «pönnukaka». Яка правильна форма в знахідному відмінку?",
      options: [
        { text: "pönnuköku", is_correct: true, note: "pönnukaka ➔ pönnuköku 🟢 (мутація другої основи -kaka ➔ -köku під дією -u)." },
        { text: "pönnukaku", is_correct: false, note: "Відсутність умляута — типова помилка іноземців." },
        { text: "pönnukökur", is_correct: false, note: "Це множина (млинці)." },
        { text: "pönnuköka", is_correct: false, note: "Такої гібридної форми не існує." }
      ],
      grammar_rule: "У складних іменниках жіночого роду умляут застосовується до останнього компонента: pönnukaka ➔ pönnuköku."
    },
    {
      id: "k2_q8",
      block_id: "block_feminine_umlaut",
      question_uk: "Ви хочете замовити піцу (pítsa). Яке закінчення матиме слово?",
      options: [
        { text: "pítsu", is_correct: true, note: "pítsa (жіночий рід на -a) ➔ pítsu 🟢." },
        { text: "pítsa", is_correct: false, note: "Називний відмінок." },
        { text: "pítsur", is_correct: false, note: "Множина." },
        { text: "pítsum", is_correct: false, note: "Давальний відмінок множини (-um)." }
      ],
      grammar_rule: "Будь-який жіночий рід на -a (навіть міжнародні слова) набуває форми на -u в знахідному відмінку однини."
    },

    // BLOCK 3: NEUTER & NUMERAL AGREEMENT
    {
      id: "k2_q9",
      block_id: "block_neuter_numbers",
      question_uk: "Слово «kaffi» (кава) є іменником середнього роду (hvorugkyn). Яка його форма в знахідному відмінку?",
      options: [
        { text: "kaffi", is_correct: true, note: "В іменниках середнього роду форма знахідного відмінка ПОВНІСТЮ ЗБІГАЄТЬСЯ з називним (Nefnifall = Þolfall)!" },
        { text: "kaffu", is_correct: false, note: "Закінчення -u буває лише у жіночому роді." },
        { text: "kaffið", is_correct: false, note: "kaffið — це форма з означеним артиклем (ця конкретна кава)." },
        { text: "kaffis", is_correct: false, note: "kaffis — це родовий відмінок (Eignarfall 🔴)." }
      ],
      grammar_rule: "Закон нейтрального збігу (Hvorugkyn): у середньому роді форма називного та знахідного відмінків завжди ідентична (eitt kaffi ➔ eitt kaffi)."
    },
    {
      id: "k2_q10",
      block_id: "block_neuter_numbers",
      question_uk: "Як правильно узгодити числівник «один» (1) з іменником середнього роду «croissant / brauð» (eitt brauð) у знахідному відмінку?",
      options: [
        { text: "eitt", is_correct: true, note: "Середній рід числівника: NF einn (ч.р.), ein (ж.р.), eitt (с.р.) ➔ ÞF einn (ч.р.), eina (ж.р.), eitt (с.р.). Форма eitt не змінюється!" },
        { text: "einn", is_correct: false, note: "einn — це чоловічий рід (einn snúð)." },
        { text: "eina", is_correct: false, note: "eina — це жіночий рід (eina samloku)." },
        { text: "einu", is_correct: false, note: "einu — це форма давального відмінка (Þágufall 🟡)." }
      ],
      grammar_rule: "Числівник 1 (einn) у знахідному відмінку: kk. einn, kvk. eina, hk. eitt."
    },
    {
      id: "k2_q11",
      block_id: "block_neuter_numbers",
      question_uk: "Оберіть граматично бездоганне речення для замовлення: 1 булочка з корицею (ч.р.), 1 сендвіч (ж.р.) і 1 кава (с.р.):",
      options: [
        { text: "Ég ætla að fá einn snúð, eina samloku og eitt kaffi.", is_correct: true, note: "Абсолютно вірно: einn snúð (ч.р. ÞF) + eina samloku (ж.р. ÞF) + eitt kaffi (с.р. ÞF)!" },
        { text: "Ég ætla að fá einn snúður, ein samloka og eitt kaffi.", is_correct: false, note: "Слова залишені в називному відмінку (помилка керування)." },
        { text: "Ég ætla að fá eina snúð, einn samloku og eina kaffi.", is_correct: false, note: "Повний хаос у родах числівників." },
        { text: "Ég vil fá snúðu, samlok og kaffu.", is_correct: false, note: "Вигадані неіснуючі форми закінчень." }
      ],
      grammar_rule: "Замовлення вимагає узгодження кожного об'єкта за родом у знахідному відмінку: kk. einn + ÞF, kvk. eina + ÞF, hk. eitt + ÞF."
    },
    {
      id: "k2_q12",
      block_id: "block_neuter_numbers",
      question_uk: "Як ісландською мовою сказати «дві чашки кави» (2 горнятка, bolli — ч.р.) у знахідному відмінку?",
      options: [
        { text: "tvo bolla", is_correct: true, note: "Числівник 2 у чоловічому роді: NF tveir ➔ ÞF tvo! Іменник: bolli ➔ bolla." },
        { text: "tvær bolla", is_correct: false, note: "tvær — це жіночий рід (tvær samlokur)." },
        { text: "tvö bolla", is_correct: false, note: "tvö — це середній рід (tvö kaffi)." },
        { text: "tveir bolli", is_correct: false, note: "Це форма називного відмінка." }
      ],
      grammar_rule: "Числівники 1-4 відмінюються за родами та відмінками. Чоловічий рід знахідного: tveir ➔ tvo (tvo bolla, tvo snúða)."
    },

    // BLOCK 4: CAFE REALIA, ISK PRICES & ETIQUETTE
    {
      id: "k2_q13",
      block_id: "block_cafe_realia",
      question_uk: "Бариста запитує: «Má bjóða þér kvittun?» (Чи запропонувати вам чек?). Як ввічливо відповісти «Ні, дякую»?",
      options: [
        { text: "Nei, takk.", is_correct: true, note: "Стандартна, універсальна та ввічлива відповідь у сфері обслуговування." },
        { text: "Nei, ekkert.", is_correct: false, note: "Звучить різко та некоректно без слова «takk»." },
        { text: "Ekki kaffi.", is_correct: false, note: "Не відповідає на запитання про чек." },
        { text: "Já, ekki.", is_correct: false, note: "Оксиморон: «так, ні»." }
      ],
      grammar_rule: "Етикет відмови в Ісландії: «Nei, takk» або «Nei, takk, það er gott» (Ні, дякую, усе гаразд)."
    },
    {
      id: "k2_q14",
      block_id: "block_cafe_realia",
      question_uk: "Рахунок становить 1.450 крон. Як бариста вимовляє цю суму ісландською?",
      options: [
        { text: "Eitt þúsund fjögur hundruð og fimmtíu krónur.", is_correct: true, note: "1000 = eitt þúsund, 400 = fjögur hundruð (с.р.), 50 = fimmtíu, krónur = жіночий рід множина." },
        { text: "Einn þúsund fjórir hundruð krónur.", is_correct: false, note: "þúsund та hundrað є іменниками середнього роду, тому einn / fjórir неприпустимі." },
        { text: "Fjórtán hundruð krónur.", is_correct: false, note: "Спрощена неточна форма, пропущено 50 крон." },
        { text: "Fimmtíu og fjögur þúsund.", is_correct: false, note: "Це 54 000 крон." }
      ],
      grammar_rule: "Ціни в Ісландії рахуються в кронах (krónur): 1.450 = eitt þúsund fjögur hundruð og fimmtíu krónur."
    },
    {
      id: "k2_q15",
      block_id: "block_cafe_realia",
      question_uk: "Ви зробили повне замовлення і хочете сказати «Це все (більше нічого не треба)». Яка ідіома використовується?",
      options: [
        { text: "Það er komið, takk.", is_correct: true, note: "«Það er komið» (дослівно: «воно прийшло / завершено») — найпоширеніша ідіома завершення замовлення в Ісландії!" },
        { text: "Þetta er allt búið.", is_correct: false, note: "«Það er búið» зазвичай означає «товар закінчився на складі»." },
        { text: "Ég er búinn að borga.", is_correct: false, note: "Це означає «Я вже заплатив»." },
        { text: "Hérna er ég.", is_correct: false, note: "Це означає «Ось я»." }
      ],
      grammar_rule: "Мовний стандарт замовлення в Ісландії: на питання «Eitthvað fleira?» (Щось ще?) відповідають «Nei, takk, það er komið»."
    }
  ]
};
