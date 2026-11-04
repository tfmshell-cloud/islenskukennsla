/**
 * methodological_corpus.js - Master Academic Knowledge Vault & Pedagogical Corpus
 * 
 * Central benchmark uniting the 8 core institutions, schools and curricula of Icelandic Language Acquisition:
 * 1. Tungumálatorg / MMS (Íslenska fyrir alla 1-4) - National immigrant standard curriculum (Sólveig Steingrímsdóttir)
 * 2. Vinnumálastofnun (VMST) - Íslenska fyrir atvinnulífið / Íslenska fyrir atvinnulausa (Workplace immersion)
 * 3. Mímir - símenntun - Largest adult education institute in Iceland (Íslenska 1-5, functional communication)
 * 4. The Nordic Academy (Norræna akademían) - Rigorous structural grammar & citizenship exam prep
 * 5. Retor Fræðsla - Specialized vocational Icelandic (construction, healthcare, tourism, IT)
 * 6. The Tin Can Factory - Experiential cultural immersion & communicative conversational labs
 * 7. Háskóli Íslands (Icelandic Online IOL 1-5 & BA/Diploma) - Academic morphology, syntax & BÍN
 * 8. Bara tala & Árnastofnun - Acoustic minimal pairs, phonetic traps & authoritative inflection matrix
 */

export const METHODOLOGICAL_CORPUS = {
  version: "2.0-ACADEMIC-EXPANDED",
  lastAudit: "2026-11-04",
  authoritativeInstitutions: [
    {
      id: "mimir",
      name: "Mímir - símenntun",
      location: "Höfðabakki 9, Reykjavík",
      role: "Провідний національний центр освіти дорослих та інтенсивної мовної адаптації",
      levels: "Íslenska 1 – Íslenska 5 (A1.1 – B2)",
      focus: "Практична інтеграція в соціум, побутові комунікативні ситуації, підготовка до ринку праці, взаємодія з державними органами.",
      textbookBase: "Íslenska fyrir alla 1-4 + власні модулі Mímir",
      strengths: "Широка мережа груп, акредитація профспілками (Fræðslusjóðir: Efling, VR, Samiðn покривають до 75-90% вартості)."
    },
    {
      id: "nordic_academy",
      name: "The Nordic Academy (Norræna akademían)",
      location: "Reykjavík / Online",
      role: "Академічна мовна школа з підвищеними вимогами до граматичної чистоти",
      levels: "A1 – C1, Спецкурс підготовки до іспиту на громадянство (Ríkisborgarapróf)",
      focus: "Глибоке розуміння синтаксису V2, морфології 4 відмінків BÍN, виправлення стійких помилок вимови.",
      textbookBase: "Академічні збірки, синтаксичні матриці, авторські граматичні компендіуми",
      strengths: "Малі групи (4-8 студентів), персоналізований фідбек, суворий контроль засвоєння правил."
    },
    {
      id: "retor",
      name: "Retor Fræðsla",
      location: "Kópavogur / On-site corporate",
      role: "Провідний провайдер корпоративної та галузевої ісландської мови (Starfstengd íslenska)",
      levels: "A1 – B2 (Галузеві треки)",
      focus: "Професійна термінологія для будівництва, готельно-ресторанного бізнесу, рибної промисловості, медицини та догляду.",
      textbookBase: "Íslenska fyrir atvinnulífið (VMST) + галузеві глосарії Retor",
      strengths: "Навчання безпосередньо на робочих місцях, акцент на техніку безпеки (Vinnueftirlitið) та комунікацію з колегами."
    },
    {
      id: "tin_can_factory",
      name: "The Tin Can Factory (Mál og Menning)",
      location: "Borgartún 1, Reykjavík",
      role: "Інноваційна школа занурювального та культурно-орієнтованого вивчення",
      levels: "A1 – B1",
      focus: "«Meet & Taste» методологія: вивчення ісландської через приготування національних страв (kjötsúpa, pönnukökur), пішохідні екскурсії, саги та міфи.",
      textbookBase: "Власні інтерактивні візуальні розробки + реалії ісландського побуту",
      strengths: "Повне подолання мовного бар'єру, розвиток вільного мовлення без страху зробити помилку."
    },
    {
      id: "multikulti",
      name: "Multikúltí",
      location: "Barónsstígur 3, Reykjavík",
      role: "Громадський мовний та міжкультурний центр",
      levels: "A1 – A2",
      focus: "Швидка соціалізація новоприбулих іммігрантів та біженців, базові розмовні клуби.",
      textbookBase: "Íslenska fyrir alla 1-2",
      strengths: "Гнучкий вечірній графік, доступна цінова політика, мультилінгвальна підтримка."
    },
    {
      id: "haskoli_islands",
      name: "Háskóli Íslands (IOL & Íslenska sem annað mál)",
      location: "Suðurgata, Reykjavík",
      role: "Вищий академічний та науковий стандарт викладання ісландської мови",
      levels: "Icelandic Online 1-5 (A1 – C1) + Університетський диплом / BA",
      focus: "Фундаментальна лінгвістика, порівняльна германістика, парадигми BÍN, історична фонологія.",
      textbookBase: "Icelandic Online (IOL), Handbók í íslenskri málfræði",
      strengths: "Найбільш структурована база синтаксису та морфології у світі."
    },
    {
      id: "vmst_atvinnulif",
      name: "Vinnumálastofnun (VMST) - Íslenska fyrir atvinnulífið / atvinnulausa",
      location: "Державна програма по всій Ісландії",
      role: "Державна програма інтеграції іноземців у ринок праці",
      levels: "A1.2 – B1.2",
      focus: "Трудове право, резюме (ferilskrá), співбесіда (atvinnuviðtal), права працівника (réttindi og skyldur), профспілкові договори (kjarasamningar).",
      textbookBase: "Íslenska fyrir atvinnulífið (модулі 1-4) + матеріали Vinnumálastofnun",
      strengths: "100% практична користь для працевлаштування та фінансової незалежності в Ісландії."
    },
    {
      id: "tungumalatorg_mms",
      name: "Tungumálatorg / Menntamálastofnun (Íslenska fyrir alla 1-4)",
      location: "Національний освітній портал Ісландії",
      role: "Золотий державний стандарт навчальних посібників для іноземців (автор: Sólveig Steingrímsdóttir)",
      levels: "Книга 1 (A1.1), Книга 2 (A1.2-A2.1), Книга 3 (A2.2), Книга 4 (B1.1-B1.2)",
      focus: "Реальні життєві ситуації в Ісландії, лексичний мінімум, автентичні аудіо-діалоги, граматичні зведення в кінці кожного розділу.",
      textbookBase: "Íslenska fyrir alla 1, 2, 3, 4 + робочі зошити (Vinnubók) + аудіо-база",
      strengths: "Базовий підручник для 95% мовних курсів в Ісландії; абсолютна узгодженість із реальним життям країни."
    }
  ],

  // 2. Comprehensive CEFR Roadmap & Lesson Concordance (Порівняльна таблиця)
  curriculumConcordance: [
    {
      level: "A0",
      ourModule: "Модуль 0: Stafrófið & Framburður",
      cefrTitle: "Абсолютний початківець / Фонетичний фундамент",
      islenskaFyrirAlla: "Вступний фонетичний модуль ÍFA 1 (bls. 5-11)",
      workplaceSyllabus: "Фонетика ісландських імен, назв вулиць, безпека: STOPP, HÆTTA",
      mimirLevel: "Íslenska 1 (перші 2 тижні)",
      grammarFocus: "32 літери, 8 дифтонгів, тверді/м'які приголосні, правила довготи голосних.",
      phoneticTrap: "Боковий вибух LL ➔ [tl̥], преаспірація PP/TT/KK ➔ [hp, ht, hk], HV ➔ [kv].",
      communicativeGoal: "Правильно прочитати будь-яке ісландське слово, привітатися (Sæll/Sæl, Góðan daginn)."
    },
    {
      level: "A1.1",
      ourModule: "Урок 1: Hver ert þú? (Хто ти?)",
      cefrTitle: "Елементарне виживання / Персональна ідентичність",
      islenskaFyrirAlla: "Íslenska fyrir alla 1 (Kafli 1: Hvað heitir þú? + Kafli 2: Hvaðan ert þú?)",
      workplaceSyllabus: "ÍFA Atvinnulíf Модуль 1: Перше знайомство на роботі, ім'я, країна походження, мови.",
      mimirLevel: "Íslenska 1 (тижні 3-6)",
      grammarFocus: "Дієслово vera, теперішній час регулярних дієслів (-a, -ir, -ar), займенники (ég, þú, hann, hún, það, við, þið, þeir, þær, þau), прийменник frá + ÞGF 🟡, í/á + ÞGF 🟡.",
      phoneticTrap: "Зрощення Samruni: Hvað heitirðu? [kʰvaːð ˈheiːtɪrðʏ], Hvaðan ertu? [kʰvaːðan ˈɛr̥tʏ].",
      communicativeGoal: "Назвати ім'я, національність, професію, місце проживання, сказати якими мовами володієш."
    },
    {
      level: "A1.2",
      ourModule: "Урок 2: Á kaffihúsi / Í bakaríinu (У кав'ярні / пекарні)",
      cefrTitle: "Базове споживання та торгівля",
      islenskaFyrirAlla: "Íslenska fyrir alla 1 (Kafli 3: Á kaffihúsi + Kafli 4: Í búðinni)",
      workplaceSyllabus: "ÍFA Atvinnulíf Модуль 1-2: Обідня перерва (Kaffistofa), замовлення ланчу, розуміння чека.",
      mimirLevel: "Íslenska 1 (завершення) – Íslenska 2 (початок)",
      grammarFocus: "Знахідний відмінок (Þolfall 🟢): чоловічий (-ur ➔ 0: snúður ➔ snúð), жіночий (-a ➔ -u: samloka ➔ samloku), середній (без змін: kaffi). Числівники 1-100, узгодження einn/eina/eitt. Конструкція 'Ég ætla að fá...'",
      phoneticTrap: "U-умляут при замовленні: pönnukaka ➔ pönnuköku, kaka ➔ köku.",
      communicativeGoal: "Замовити їжу/напій, запитати ціну ('Hvað kostar þetta?'), розрахуватися карткою ('Má bjóða þér kvittun?')."
    },
    {
      level: "A1.3",
      ourModule: "Урок 3: Hversdagsleiki og Tími (Щоденна рутина та час)",
      cefrTitle: "Організація побуту та розпорядок дня",
      islenskaFyrirAlla: "Íslenska fyrir alla 1 (Kafli 5: Hvað er klukkan? + Kafli 6: Daglegt líf)",
      workplaceSyllabus: "ÍFA Atvinnulíf Модуль 2: Графік змін (Vaktaplan), пунктуальність, лікарняні (Veikindi).",
      mimirLevel: "Íslenska 2",
      grammarFocus: "Годинник (Hvað er klukkan? Hálf fimm), дні тижня, зворотні дієслова (Miðmynd на -st: vakna ➔ vaknast, klæða sig), прийменники часу (á morgnana, um helgar).",
      phoneticTrap: "Чергування приголосних у дієсловах рутини (fer, ferð, förum).",
      communicativeGoal: "Описати свій типовий робочий день, узгодити час зустрічі, повідомити про запізнення."
    },
    {
      level: "A2.1",
      ourModule: "Урок 4: Búseta, Kennitala og Banki (Житло, реєстрація, банк)",
      cefrTitle: "Соціальна інтеграція та юридичні процедури",
      islenskaFyrirAlla: "Íslenska fyrir alla 2 (Kafli 1: Búseta + Kafli 2: Í bankanum)",
      workplaceSyllabus: "ÍFA Atvinnulíf Модуль 2-3: Відкриття рахунку, електронний ID (Rafræn skilríki), договір оренди.",
      mimirLevel: "Íslenska 2 – Íslenska 3",
      grammarFocus: "Давальний відмінок (Þágufall 🟡): іменники та прийменники (hjá, að, af, frá). Порядкові числівники, форми кеннітали.",
      phoneticTrap: "Вимова довгих складних слів (Þjóðskrá, Kennitala, Heimild).",
      communicativeGoal: "Орендувати житло, зареєструватися в Þjóðskrá, підтвердити банківський платіж через аутентифікатор."
    },
    {
      level: "A2.2",
      ourModule: "Урок 5: Heilsugæsla og Líkaminn (Охорона здоров'я та медицина)",
      cefrTitle: "Безпека життя та здоров'я",
      islenskaFyrirAlla: "Íslenska fyrir alla 2 (Kafli 5: Hjá lækninum + Kafli 6: Í apótekinu)",
      workplaceSyllabus: "ÍFA Atvinnulíf Модуль 3: Нещасні випадки на виробництві (Vinnuslys), виклик швидкої (112), Heilsuvera.",
      mimirLevel: "Íslenska 3",
      grammarFocus: "Безособові конструкції з давальним суб'єкта: 'Mér líður illa', 'Mér er kalt', 'Mig verkjar í...'. Частини тіла та відмінювання.",
      phoneticTrap: "Асиміляції у медичній термінології: lyfseðill [ˈlɪfpˌsɛːðɪtl].",
      communicativeGoal: "Пояснити симптоми в поліклініці (Heilsugæsla), купити ліки в аптеці (Lyfja), відкрити лікарняний лист."
    },
    {
      level: "B1.1",
      ourModule: "Урок 6: Atvinnulíf og Réttindi (Робота, резюме та профспілки)",
      cefrTitle: "Професійна автономність",
      islenskaFyrirAlla: "Íslenska fyrir alla 3 (Kafli 3: Vinna og starf + Kafli 4: Réttindi)",
      workplaceSyllabus: "ÍFA Atvinnulíf Модуль 4 (Повний): Трудовий договір (Ráðningarsamningur), Efling/VR, табель (Launaseðill).",
      mimirLevel: "Íslenska 4",
      grammarFocus: "Минулий час слабких і сильних дієслів (Þátíð), родова залежність (Eignarfall 🔴: til, vegna, millum), модальні дієслова (geta, vilja, eiga að).",
      phoneticTrap: "Швидкий темп ділової мови, редукція голосних у ненаголошених позиціях.",
      communicativeGoal: "Скласти резюме (Ferilskrá), пройти співбесіду, перевірити правильність нарахування зарплати та відпускних (Orlof)."
    },
    {
      level: "B1.2-B2",
      ourModule: "Урок 7+: Samfélag, Menning og Fréttir (Суспільство, новини та політика)",
      cefrTitle: "Вільне функціонування в ісландському суспільстві",
      islenskaFyrirAlla: "Íslenska fyrir alla 4 + RÚV Auðskilið",
      workplaceSyllabus: "Участь у зборах трудового колективу, ведення ділової переписки, юридичний захист.",
      mimirLevel: "Íslenska 5 / HÍ Diploma",
      grammarFocus: "Умовний спосіб / Кон'юнктив (Viðtengingarháttur: þótt, ef, svo að), пасивний стан (Þolmynd).",
      phoneticTrap: "Інтонаційні контури іронії, сленг, скорочення в SMS/чатах.",
      communicativeGoal: "Читати та обговорювати новини RÚV, дивитися дебати в Alþingi, вільно дискутувати з носіями мови."
    }
  ],

  // 3. Master Bilingual Podcast Production Roadmap (12 Епізодів)
  podcastProductionPlan: [
    {
      ep: 0,
      id: "ep0_landslag_hljodfaeri",
      titleUkr: "Логіка ісландської граматики: від ландшафту до фонетики",
      titleIsl: "Rökfræði tungumálsins: Frá landslagi til hljóðfræði",
      level: "A0 (Фундамент)",
      duration: "18:42",
      bilingualRatio: { ukr: 80, isl: 20 },
      fileStatus: "ГОТОВО (8.8 MB AAC/M4A у сховищі)",
      filePath: "audio/podcasts/Логіка_ісландської_граматики_від_ландшафту_до_фонетики.m4a",
      hosts: ["Остап (Аналітик)", "Gunnar (Носій)", "Поліна (Філолог)"],
      coreTopics: "Чому ісландська не змінилася за 1000 років? Зв'язок геології острова з фонетикою. 6 головних фонетичних пасток.",
      anchorTerms: ["fjall [fjatl̥]", "jökull [ˈjœːkʏtl̥]", "takk [tʰahk]", "Ísland [ˈistlant]"]
    },
    {
      ep: 1,
      id: "ep1_hver_ert_thu",
      titleUkr: "Хто ти? Таємниця ісландських по батькові та закон V2",
      titleIsl: "Hver ert þú? Föðurnöfn og V2-reglan",
      level: "A1.1",
      duration: "14:15",
      bilingualRatio: { ukr: 65, isl: 35 },
      fileStatus: "ГОТОВИЙ ДО ЗАПИСУ (Сценарій затверджено)",
      hosts: ["Остап", "Guðrún (Носій)"],
      coreTopics: "Чому в Ісландії немає прізвищ (Jónsson / Jónsdóttir)? Телефонна книга за іменами. Закон V2 та як звучить розмовне 'Hvað heitirðu?'.",
      anchorTerms: ["ég heiti...", "hvaðan ertu?", "ég bý í...", "ég vinn"]
    },
    {
      ep: 2,
      id: "ep2_kaffi_og_bakari",
      titleUkr: "Магія знахідного відмінка: як замовляти в Brauð & Co",
      titleIsl: "Á kaffihúsi: Þolfall og pönnukökur",
      level: "A1.2",
      duration: "15:30",
      bilingualRatio: { ukr: 50, isl: 50 },
      fileStatus: "В РОЗРОБЦІ",
      hosts: ["Олена", "Gunnar (Бариста Свейнн)"],
      coreTopics: "Знахідний відмінок у реальному житті: як відпадає -ur у snúður і чому pönnukaka перетворюється на pönnuköku. Рахунок у кронах.",
      anchorTerms: ["Ég ætla að fá...", "Einn snúð", "Eina pönnuköku", "Eitt kaffi", "Hvað kostar það?"]
    },
    {
      ep: 3,
      id: "ep3_daglegt_lif_og_timi",
      titleUkr: "Ісландський час: чому 'пів п'ятої' це не 16:30?",
      titleIsl: "Hvað er klukkan? Daglegt líf og vaktir",
      level: "A1.3",
      duration: "16:00",
      bilingualRatio: { ukr: 45, isl: 55 },
      fileStatus: "ЗАПЛАНОВАНО",
      hosts: ["Поліна", "Gunnar"],
      coreTopics: "Особливості визначення часу в ісландській (hálf fimm = 16:30, рух до 5-ї). Зворотні дієслова на -st та планування змін.",
      anchorTerms: ["Hvað er klukkan?", "Hálf fimm", "Ég vakna klukkan...", "Vaktaplan"]
    },
    {
      ep: 4,
      id: "ep4_kennitala_og_buseta",
      titleUkr: "Кеннітала та оренда: перші юридичні кроки в Рейк'явіку",
      titleIsl: "Kennitalan, leigumarkaðurinn og Þjóðskrá",
      level: "A2.1",
      duration: "18:00",
      bilingualRatio: { ukr: 40, isl: 60 },
      fileStatus: "ЗАПЛАНОВАНО",
      hosts: ["Остап", "Guðrún"],
      coreTopics: "Як працює 10-значна Kennitala (день-місяць-рік-століття). Реєстрація в Þjóðskrá. Спілкування з орендодавцем: húsaleiga, trygging.",
      anchorTerms: ["Kennitala", "Þjóðskrá", "Húsaleigusamningur", "Rafræn skilríki"]
    },
    {
      ep: 5,
      id: "ep5_hjá_laekninum",
      titleUkr: "У лікаря: коли суб'єкт не керує дією (Mér líður illa)",
      titleIsl: "Heilsugæslan: Mér er illt og ég er veikur",
      level: "A2.2",
      duration: "16:45",
      bilingualRatio: { ukr: 30, isl: 70 },
      fileStatus: "ЗАПЛАНОВАНО",
      hosts: ["Поліна", "Gunnar (Лікар)"],
      coreTopics: "Безособовий давальний відмінок для опису відчуттів та симптомів. Система Heilsuvera, запис до лікаря, аптечні терміни.",
      anchorTerms: ["Mér líður illa", "Mig verkjar í höfuðið", "Lyfseðill", "Heilsugæslustöð"]
    },
    {
      ep: 6,
      id: "ep6_vinnumarkadurinn_efling",
      titleUkr: "Ісландський ринок праці: твої права, зарплатний лист і профспілка Efling",
      titleIsl: "Vinnumarkaðurinn, launaseðill og stéttarfélög",
      level: "B1.1",
      duration: "20:00",
      bilingualRatio: { ukr: 20, isl: 80 },
      fileStatus: "ЗАПЛАНОВАНО",
      hosts: ["Остап", "Guðrún (Представник профспілки)"],
      coreTopics: "Аналіз зарплатного чека (Launaseðill): grunnlaun, yfirvinna, orlof, lífeyrissjóður. Як профспілки захищають іноземних працівників.",
      anchorTerms: ["Launaseðill", "Orlof", "Kjarasamningur", "Stéttarfélag", "Yfirvinna"]
    },
    {
      ep: 7,
      id: "ep7_islandske_vedur_og_samfelag",
      titleUkr: "Погода як національна філософія: Þetta reddast!",
      titleIsl: "Veðrið og menningin: Þetta reddast og gluggaveður",
      level: "B1.2",
      duration: "17:30",
      bilingualRatio: { ukr: 10, isl: 90 },
      fileStatus: "ЗАПЛАНОВАНО",
      hosts: ["Gunnar", "Guðrún"],
      coreTopics: "Ісландські унікальні концепти: Gluggaveður (віконна погода), Rúntur, менталітет 'Þetta reddast'. Синоптичні терміни на Vedur.is.",
      anchorTerms: ["Þetta reddast", "Gluggaveður", "Bálhvasst", "Óveður", "Gula viðvörun"]
    }
  ]
};
