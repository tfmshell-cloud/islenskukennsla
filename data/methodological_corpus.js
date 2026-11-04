/**
 * methodological_corpus.js - Master Academic Knowledge Vault & Pedagogical Corpus
 * 
 * Official standard aligned 1:1 with "Íslenska fyrir alla" 1, 2, 3, 4
 * Authors: Sólborg Jónsdóttir & Þorbjörg Halldórsdóttir (Menntamálastofnun / Tungumálatorg)
 * Linguistic & morphological standard: Stofnun Árna Magnússonar (BÍN) & Háskóli Íslands
 */

export const METHODOLOGICAL_CORPUS = {
  version: "3.0-ACADEMIC-DEEP-CURRICULUM",
  lastAudit: "2026-11-04",
  officialAuthors: "Sólborg Jónsdóttir og Þorbjörg Halldórsdóttir",
  publisher: "Menntamálastofnun (MMS) / Tungumálatorg",
  academicPartners: [
    "Stofnun Árna Magnússonar í íslenskum fræðum (BÍN)",
    "Háskóli Íslands (Íslenska sem annað mál / Icelandic Online)",
    "Vinnumálastofnun (VMST - Íslenska fyrir atvinnulífið)"
  ],

  // 4 Full Books Chapter-by-Chapter Master Syllabus
  books: [
    {
      bookId: 1,
      title: "Íslenska fyrir alla 1",
      cefrLevel: "A1 (Grunnstig)",
      description: "Фундамент виживання, абетка, знайомство, базовий шопінг, час та побут",
      chaptersCount: 10,
      chapters: [
        {
          num: 1,
          titleIs: "Hvað heitir þú?",
          titleUk: "Як тебе звати? Знайомство та походження",
          grammar: "Дієслово vera, теперішній час, займенники (ég, þú, hann, hún, það, við, þið, þeir, þær, þau), frá + ÞGF 🟡 (Úkraína ➔ Úkraínu)",
          communication: "Привітатися (Sæll/Sæl), назвати ім'я, країну, місто проживання, володіння мовами",
          ourLessonRef: "Урок 1: Hver ert þú?"
        },
        {
          num: 2,
          titleIs: "Íslenska stafrófið",
          titleUk: "Ісландська абетка та звуки",
          grammar: "32 літери, 8 дифтонгів, тверді/м'які приголосні, правила довготи, преаспірація [hp, ht, hk], боковий вибух [tl̥]",
          communication: "Продиктувати по буквах своє ім'я (Stafa nafnið), прочитати вивіски та оголошення",
          ourLessonRef: "Урок 0: Stafrófið & Framburður"
        },
        {
          num: 3,
          titleIs: "Hvað ert þú að gera?",
          titleUk: "Що ти зараз робиш? Тривала дія",
          grammar: "Конструкція 'að vera að + infinitiv' (ég er að læra), дієслова щоденних дій, дієслівне керування",
          communication: "Розповісти, чим зайнятий прямо зараз, запитати співрозмовника про поточну дію",
          ourLessonRef: "Урок 1 (додатковий блок дієслів)"
        },
        {
          num: 4,
          titleIs: "Hvað kostar þetta?",
          titleUk: "Скільки це коштує? Кав'ярня, магазин, числівники",
          grammar: "Знахідний відмінок (Þolfall 🟢): snúður ➔ snúð, kaka ➔ köku (U-умляут), числівники 1-100, ціни в кронах",
          communication: "Замовити їжу/каву ('Ég ætla að fá...'), запитати ціну, розрахуватися карткою",
          ourLessonRef: "Урок 2: Á kaffihúsi 🟢"
        },
        {
          num: 5,
          titleIs: "Hvenær átt þú afmæli?",
          titleUk: "Коли твій день народження? Календар та дати",
          grammar: "Порядкові числівники (fyrsti, annar, þriðji), місяці, дати, прийменник í + ÞGF (í janúar)",
          communication: "Назвати свою дату народження, привітати зі святом (Til hamingju með afmælið)",
          ourLessonRef: "Урок 3: Блок дат"
        },
        {
          num: 6,
          titleIs: "Hvað er klukkan?",
          titleUk: "Котра година? Час та дні тижня",
          grammar: "Формули часу (Hálf fimm = 16:30), чверті (Korter yfir / í), дні тижня, прийменники á/um",
          communication: "Домовитися про зустріч, призначити час, запитати розклад",
          ourLessonRef: "Урок 3: Hversdagsleiki og Tími"
        },
        {
          num: 7,
          titleIs: "Hvað gerir þú?",
          titleUk: "Ким ти працюєш? Професії та щоденні обов'язки",
          grammar: "Назви професій (чоловічі та жіночі форми), зворотні дієслова рутини (vakna ➔ vaknast)",
          communication: "Описати свою професію, розклад робочого дня, що робиш вранці/ввечері",
          ourLessonRef: "Урок 3 & 4"
        },
        {
          num: 8,
          titleIs: "Hvað er í matinn?",
          titleUk: "Що на обід? Супермаркет, їжа та рецепти",
          grammar: "Партійний та масовий знахідний відмінок, назви продуктів, упаковки (pakki, flaska, dós)",
          communication: "Зробити покупки в Bónus/Krónan, зрозуміти меню та цінники",
          ourLessonRef: "Урок 2: Розширення"
        },
        {
          num: 9,
          titleIs: "Hvar er bankinn?",
          titleUk: "Де банк? Орієнтація в місті та адреси",
          grammar: "Прийменники місця та напрямку (hjá, við, á móti, til hægri, til vinstri), давальний відмінок",
          communication: "Запитати дорогу в Рейк'явіку, пояснити як пройти до банку чи пошти",
          ourLessonRef: "Урок 5: Місто"
        },
        {
          num: 10,
          titleIs: "Hvernig líður þér?",
          titleUk: "Як ти себе почуваєш? Здоров'я та самопочуття",
          grammar: "Безособові конструкції з давальним відмінком ('Mér líður vel/illa', 'Mér er kalt'), частини тіла",
          communication: "Описати симптоми, сказати що болить, попросити допомоги",
          ourLessonRef: "Урок 6: Медицина"
        }
      ]
    },
    {
      bookId: 2,
      title: "Íslenska fyrir alla 2",
      cefrLevel: "A2 (Miðstig 1)",
      description: "Соціальна автономія: оренда житла, банківські рахунки, транспорт, робочі процеси та візити до лікаря",
      chaptersCount: 8,
      chapters: [
        {
          num: 1,
          titleIs: "Fólk á förnum vegi",
          titleUk: "Люди навколо нас: зовнішність, характер та колеги",
          grammar: "Відмінювання прикметників (сильна форма: stór, lítill, ungur), опис кольору волосся/очей, складні професії",
          communication: "Детально описати зовнішність людини, розповісти колегам про свій досвід",
          ourLessonRef: "Урок 4: Спецмодуль"
        },
        {
          num: 2,
          titleIs: "Heimilið",
          titleUk: "Дім та житло: переїзд, меблі, побутова техніка та зарплата",
          grammar: "Орендна лексика (Húsaleiga, trygging), форми зарплатного розрахунку (Launamál), давальний відмінок житла",
          communication: "Обговорити договір оренди, купити побутову техніку, уточнити умови оплати праці",
          ourLessonRef: "Урок 5: Búseta og Þjóðskrá"
        },
        {
          num: 3,
          titleIs: "Dagurinn minn",
          titleUk: "Мій день: розгорнутий щоденник та звички",
          grammar: "Зворотні дієслова на -st (Miðmynd: klæðast, greiða sér), прислівники частоти (alltaf, stundum, aldrei)",
          communication: "Вести персональний щоденник ісландською, описувати нестандартний робочий графік",
          ourLessonRef: "Урок 3: Поглиблення"
        },
        {
          num: 4,
          titleIs: "Hvar, hvert, hvernig?",
          titleUk: "Де, куди, як? Рух vs Стан, погода та сезони",
          grammar: "Диференціація прийменників: рух (Í búðina 🟢 ÞF) проти перебування на місці (Í búðinni 🟡 ÞGF), пори року",
          communication: "Описати мінливу ісландську погоду (Veðurspá), пояснити маршрут поїздки",
          ourLessonRef: "Урок 5: Рух vs Стан"
        },
        {
          num: 5,
          titleIs: "Áhugamál",
          titleUk: "Інтереси, спорт, вільний час та настрій",
          grammar: "Конструкції з 'finnst': 'Mér finnst gaman að synda', вираження емоцій та настрою",
          communication: "Обговорити басейни (Sundlaugar), похід у гори, культурні заходи",
          ourLessonRef: "Урок 4: Хобі"
        },
        {
          num: 6,
          titleIs: "Get ég aðstoðað?",
          titleUk: "Сфера послуг: покупки, одяг, взуття та автомайстерня",
          grammar: "Дієслова повернення/обміну товару (skipta, fá endurgreitt), розміри одягу, поломки автомобіля",
          communication: "Обміняти товар у магазині, пояснити механіку проблему з авто (Á verkstæði)",
          ourLessonRef: "Урок 2 & 5: Сервіс"
        },
        {
          num: 7,
          titleIs: "Ég þarf að fá frí",
          titleUk: "Відпустка, лікарняні та трудові права",
          grammar: "Модальні дієслова прохання та дозволу (mega, þurfa, vilja), офіційні формулювання до керівника",
          communication: "Попросити відпустку (biðja um leyfi), повідомити про хворобу (tilkynna veikindi)",
          ourLessonRef: "Урок 7: Трудове право"
        },
        {
          num: 8,
          titleIs: "Á ferðinni",
          titleUk: "У дорозі: автобуси Strætó, відкриття рахунку в банку та телефонний етикет",
          grammar: "Офіційні телефонні діалоги, банківські терміни (stofna reikning, debetkort), квитки",
          communication: "Зателефонувати до установи, відкрити рахунок в Landsbankinn/Arion/Íslandsbanki",
          ourLessonRef: "Урок 5: Банк & Телефон"
        }
      ]
    },
    {
      bookId: 3,
      title: "Íslenska fyrir alla 3",
      cefrLevel: "B1.1 (Framhaldsstig 1)",
      description: "Поглиблена інтеграція: сусідські стосунки, нерухомість, надзвичайні ситуації, ринок праці та культура",
      chaptersCount: 8,
      chapters: [
        {
          num: 1,
          titleIs: "Nágrannar",
          titleUk: "Сусіди та співжиття: багатоквартирний будинок та правила",
          grammar: "Складні речення, прийменники спільного проживання, правила будинку (Húsreglur)",
          communication: "Вирішувати побутові питання із сусідами, брати участь у зборах мешканців",
          ourLessonRef: "Урок 5+"
        },
        {
          num: 2,
          titleIs: "Staðir",
          titleUk: "Місця та сервіси: стоматолог, лікарня та купівля авто",
          grammar: "Минулий час слабких дієслів (Þátíð veikra sagna: talaði, bjó, vann), медичні протоколи",
          communication: "Записатися до стоматолога (Tannlæknir), оформити купівлю автомобіля",
          ourLessonRef: "Урок 6+"
        },
        {
          num: 3,
          titleIs: "Heima er best",
          titleUk: "Ринок нерухомості: оголошення, купівля та продаж квартир",
          grammar: "Родовий відмінок (Eignarfall 🔴): приналежність, скорочення в оголошеннях нерухомості (Fasteignir)",
          communication: "Читати та аналізувати оголошення про оренду та продаж житла на Mbl.is / Visir.is",
          ourLessonRef: "Урок 5: Поглиблення"
        },
        {
          num: 4,
          titleIs: "Venjur og siðir",
          titleUk: "Традиції та свята: весілля, Новий рік та ісландські звичаї",
          grammar: "Безособовий минулий час, фольклорні звороти, традиційні привітання",
          communication: "Розуміти ісландські свята (Þorrablót, Jól, Áramót), брати участь у сімейних подіях",
          ourLessonRef: "Урок 8: Культура"
        },
        {
          num: 5,
          titleIs: "Neyðarlínan",
          titleUk: "Екстрені служби 112: поліція, ДТП та звіт про збитки",
          grammar: "Пасивний стан у поліцейських повідомленнях, складання протоколу ДТП (Tjónaskýrsla)",
          communication: "Повідомити про аварію диспетчеру 112, заповнити страховий формуляр",
          ourLessonRef: "Урок 7: Безпека"
        },
        {
          num: 6,
          titleIs: "Fjölskyldulíf",
          titleUk: "Сімейне життя крізь пори року",
          grammar: "Сильні дієслова минулого часу (Þátíð sterkra sagna), чергування голосних у корені (Ablaut)",
          communication: "Описувати сімейні спогади, планувати сезонні канікули та відпустки",
          ourLessonRef: "Урок 4+"
        },
        {
          num: 7,
          titleIs: "Atvinnuleit",
          titleUk: "Пошук роботи: резюме (Ferilskrá), співбесіда та мотивація",
          grammar: "Наказовий спосіб (Boðháttur), дієслова професійного заохочення та розпоряджень",
          communication: "Успішно пройти співбесіду ісландською, презентувати свій професійний досвід",
          ourLessonRef: "Урок 7: Atvinnulíf"
        },
        {
          num: 8,
          titleIs: "Á ferð og flugi",
          titleUk: "Подорожі світом та авіаперельоти",
          grammar: "Зведена таблиця неправильних та сильних дієслів, перфект (Núliðin tíð: hef farið)",
          communication: "Бронювати квитки, проходити аеропортовий контроль Keflavík, приймати іноземних гостей",
          ourLessonRef: "Урок 8: Подорожі"
        }
      ]
    },
    {
      bookId: 4,
      title: "Íslenska fyrir alla 4",
      cefrLevel: "B1.2 – B2 (Framhaldsstig 2)",
      description: "Повна мовна автономія: суспільні дебати, медіа RÚV, трудове право, профспілки та екологія",
      chaptersCount: 7,
      chapters: [
        {
          num: 1,
          titleIs: "Til Íslands",
          titleUk: "Історія імміграції: адаптація, виклики та культурний шок",
          grammar: "Аналітичні конструкції, складнопідрядні речення причини та наслідку",
          communication: "Дискутувати про інтеграцію, ділитися особистим досвідом переїзду",
          ourLessonRef: "Урок 8: Соціум"
        },
        {
          num: 2,
          titleIs: "Ferðalög",
          titleUk: "Внутрішній туризм, захист дикої природи та Safetravel",
          grammar: "Умовний спосіб (Viðtengingarháttur nútið / þátíð), гіпотетичні конструкції ('Ef ég væri...')",
          communication: "Читати синоптичні та вулканічні попередження Vedur.is, планувати походи",
          ourLessonRef: "Урок 8: Природа"
        },
        {
          num: 3,
          titleIs: "Í skólanum",
          titleUk: "Освітня система Ісландії: дитсадки, школи, університети",
          grammar: "Офіційна шкільна термінологія, комунікація в системі Mentor/Inna",
          communication: "Спілкуватися з вчителями дітей, брати участь у батьківських зборах (Foreldrafundir)",
          ourLessonRef: "Урок 8: Освіта"
        },
        {
          num: 4,
          titleIs: "Heilsan",
          titleUk: "Система охорони здоров'я та страхування Sjúkratryggingar",
          grammar: "Медичні виписки, складна анатомічна та фармакологічна термінологія",
          communication: "Користуватися порталом Heilsuvera, розуміти рецепти та протоколи лікування",
          ourLessonRef: "Урок 6: Поглиблення"
        },
        {
          num: 5,
          titleIs: "Fjölmiðlar og fréttir",
          titleUk: "Ісландські медіа: новини RÚV, політика та критичний аналіз",
          grammar: "Непряма мова, суб'єктивний кон'юнктив, аналіз заголовків преси",
          communication: "Дивитися та обговорювати випуски новин RÚV Fréttir, читати аналітичні статті",
          ourLessonRef: "Урок 8: Преса"
        },
        {
          num: 6,
          titleIs: "Atvinnumálin",
          titleUk: "Трудовий ринок: профспілки Efling/VR, табель зарплати та пенсії",
          grammar: "Аналіз зарплатного чека (Launaseðill: orlof, lífeyrissjóður, staðgreiðsla skatta), трудові договори",
          communication: "Захищати свої трудові права, звертатися до профспілкового представника (Trúnaðarmaður)",
          ourLessonRef: "Урок 7: Профспілки"
        },
        {
          num: 7,
          titleIs: "Vinnuumhverfi",
          titleUk: "Робоче середовище: ергономіка, техніка безпеки та культура праці",
          grammar: "Стандарти інспекції праці Vinnueftirlitið, правила безпеки на робочому місці",
          communication: "Брати участь у виробничих нарадах, звітувати про небезпечні фактори",
          ourLessonRef: "Урок 7: Безпека праці"
        }
      ]
    }
  ],

  // Синтезовані практичні правила з "Litli málfræðingurinn" (Þorbjörg Halldórsdóttir)
  litliMalfraedingurinnSynthesis: {
    nounGenderMarkers: {
      karlkyn_kk: "Чоловічий рід: сильний на -ur (snúður, dagur), -ll (stóll), -nn (steinn); слабкий на -i (bolli, nemandi).",
      kvenkyn_kvk: "Жіночий рід: сильний з нульовим закінченням у NF (bók, sól); слабкий на -a (samloka, pönnukaka, kona).",
      hvorugkyn_hk: "Середній рід: зазвичай збіг форми NF і ÞF (kaffi, borð, hús, glas)."
    },
    prepositionGovernance: {
      stjornar_tholfalli_thf: ["um (про/навколо)", "gegnum (крізь)", "kringum (навколо)", "í/á (рух: куди?)"],
      stjornar_thagufalli_thgf: ["að (до)", "af (з/від)", "frá (з)", "hjá (біля/у когось)", "úr (із середини)", "í/á (стан: де?)"],
      stjornar_eignarfalli_ef: ["til (до)", "milli / á milli (між)", "vegna (через те що)"]
    },
    uHljodvarpRule: "U-умляут: кореневий голосний 'a' обов'язково перетворюється на 'ö', якщо в наступному складі з'являється закінчення '-u': kaka ➔ köku, pönnukaka ➔ pönnuköku, tala ➔ við tölum."
  },

  // Синтезовані стандарти живого мовлення з "Tölum saman" (FA 2022)
  tolumSamanVocationalSynthesis: {
    kaffistofaEtiquette: [
      { is: "Má bjóða þér kaffi eða te?", uk: "Запропонувати вам каву чи чай?" },
      { is: "Viltu mjólk eða sykur út í kaffið?", uk: "Бажаєте молоко чи цукор у каву?" },
      { is: "Gjörðu svo vel!", uk: "Будь ласка! (Ось, тримайте)" },
      { is: "Takk kærlega fyrir!", uk: "Щиро дякую!" }
    ],
    clarificationPhrases: [
      { is: "Gætirðu talað aðeins hægar?", uk: "Чи могли б ви говорити трішки повільніше?" },
      { is: "Ég er að læra íslensku.", uk: "Я вивчаю ісландську мову." },
      { is: "Hvað þýðir þetta orð?", uk: "Що означає це слово?" },
      { is: "Geturðu endurtekið þetta?", uk: "Чи можете ви повторити це?" }
    ]
  }
};
