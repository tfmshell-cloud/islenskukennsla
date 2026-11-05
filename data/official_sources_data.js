/**
 * official_sources_data.js - Master Academic & Institutional Sources Dataset
 * Synchronized with data/icelandic_sources.txt
 * Powers the Visual Toolblock (Візуальний блок першоджерел) & Audio Coverage Matrix
 */

export const OFFICIAL_SOURCES_DATA = {
  version: "2.0-ACADEMIC",
  titleUkr: "Реєстр державних першоджерел, навчальних стандартів та цифрових порталів Ісландії",
  titleIsl: "Hestaheimildaskrá og opinberar þjónustugáttir Íslands",

  // 1. INSTITUTIONAL CATEGORIES
  categories: [
    {
      id: "linguistics",
      nameUkr: "1. Мовні стандарти та морфологічні бази (Árnastofnun)",
      icon: "🏛️",
      color: "cyan",
      sources: [
        {
          id: "bin",
          nameIsl: "BÍN - Beygingarlýsing íslensks nútímamáls",
          nameUkr: "Офіційна база відмінювання ісландських слів (понад 3 000 000 парадигм)",
          url: "https://bin.arnastofnun.is/",
          authority: "Stofnun Árna Magnússonar í íslenskum fræðum",
          cefrLevel: "A1–C2 (Усі рівні)",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: ІНТЕГРОВАНО",
          practicalUse: "Перевірка точних відмінкових закінчень (NF, ÞF, ÞGF, EF), ступенів порівняння прикметників та форм дієслів у минулому часі.",
          keyTerms: ["Beygingarmynd (форма відмінювання)", "Stofn (основа)", "Eintala/Fleirtala (однина/множина)"]
        },
        {
          id: "ordabok",
          nameIsl: "Íslensk nútímamálsorðabók",
          nameUkr: "Словник сучасної ісландської мови",
          url: "https://islenskordabok.arnastofnun.is/",
          authority: "Stofnun Árna Magnússonar",
          cefrLevel: "A1–C2",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: ІНТЕГРОВАНО",
          practicalUse: "Академічні тлумачення, транскрипція IPA, правильний наголос та приклади вживання слів у сучасному контексті.",
          keyTerms: ["Framburður (вимова)", "Merking (значення)", "Dæmi (приклади)"]
        },
        {
          id: "malfarsbankinn",
          nameIsl: "Málfarsbankinn",
          nameUkr: "Банк культури ісландської мови та ортоепії",
          url: "https://malfar.arnastofnun.is/",
          authority: "Árnastofnun",
          cefrLevel: "A2–B2",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: ДОВІДНИК",
          practicalUse: "Консультації щодо складних граматичних випадків, типових помилок, прийменникового керування та синонімів.",
          keyTerms: ["Málfar (культура мовлення)", "Rétt mál (нормативна мова)"]
        }
      ]
    },
    {
      id: "curriculum",
      nameUkr: "2. Національні навчальні підручники (MMS / Tungumálatorg)",
      icon: "📚",
      color: "emerald",
      sources: [
        {
          id: "ifa",
          nameIsl: "Íslenska fyrir alla 1, 2, 3, 4",
          nameUkr: "Державний стандарт підручників (4 томи • 33 розділи)",
          url: "https://tungumalatorg.is/ifa/",
          authority: "Menntamálastofnun (MMS) / Tungumálatorg",
          cefrLevel: "A1 (Том 1), A2 (Том 2), B1.1 (Том 3), B1.2–B2 (Том 4)",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: СТАНДАРТ КУРСУ",
          practicalUse: "Фундаментальна навчальна база для 95% акредитованих мовних шкіл Ісландії (Mímir, Retor, Tin Can Factory). Наш курс повністю синхронізовано з цим стандартом.",
          keyTerms: ["Kafli (розділ)", "Verkefni (вправи)", "Hlustun (аудіювання)"]
        },
        {
          id: "litli_malfraedingurinn",
          nameIsl: "Litli málfræðingurinn í heild",
          nameUkr: "Малий граматик: зведений довідник для іноземців",
          url: "https://tungumalatorg.is/ifu/files/2011/08/Litli-m%C3%A1lfr%C3%A6%C3%B0ingurinn-%C3%AD-heild1.pdf",
          authority: "Þorbjörg Halldórsdóttir / Mímir",
          cefrLevel: "A1–B2",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: ГРАМАТИЧНИЙ ЗОЛОТИЙ ФОНД",
          practicalUse: "Повний звід правил відмінювання сильних/слабких іменників, дієвідмін, чергувань U/I-умлаутів та порядку слів V2.",
          keyTerms: ["Veikar beygingar", "Sterkar beygingar", "Hljóðvarp"]
        },
        {
          id: "tolum_saman",
          nameIsl: "Kennslubók: Tölum saman (2022)",
          nameUkr: "Корпоративний розмовний посібник для ринку праці",
          url: "https://fraedslugatt.is/wp-content/uploads/2022/11/Kennslubok_Islenska_Tolum_saman_2022.pdf",
          authority: "Fræðslumiðstöð atvinnulífsins (FA)",
          cefrLevel: "A1–A2",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: КОРПОРАТИВНА МОВА",
          practicalUse: "Практична розмовна ісландська для офісу, кухні (Kaffistofan), будівництва, сервісу та взаємодії з колегами.",
          keyTerms: ["Vinnustaður (робоче місце)", "Kaffistofa (кухня/кімната відпочинку)", "Samstarfsfólk (колеги)"]
        }
      ]
    },
    {
      id: "gov_services",
      nameUkr: "3. Державні цифрові портали та реєстрація (Ísland.is & Þjóðskrá)",
      icon: "🇮🇸",
      color: "purple",
      sources: [
        {
          id: "island_is",
          nameIsl: "Ísland.is (Stafrænt Ísland)",
          nameUkr: "Єдиний державний портал електронних послуг Ісландії",
          url: "https://island.is/",
          authority: "Fjármála- og efnahagsráðuneytið",
          cefrLevel: "A2–B2",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: ДЕРЖПОСЛУГИ",
          practicalUse: "Особистий кабінет (Mínar síður), урядова поштова скринька Pósthólf, цифрові посвідчення водія, подання заяв на паспорти та пільги.",
          keyTerms: ["Mínar síður (мій кабінет)", "Pósthólf (поштова скринька)", "Stafrænt ökuskírteini (цифрові права)"]
        },
        {
          id: "thjodskra",
          nameIsl: "Þjóðskrá Íslands",
          nameUkr: "Національний реєстр населення Ісландії",
          url: "https://www.skra.is/",
          authority: "Þjóðskrá",
          cefrLevel: "A1–A2",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: РЕЄСТРАЦІЯ",
          practicalUse: "Отримання ідентифікаційного номера Kennitala, обов'язкова реєстрація та зміна адреси постійного проживання (Lögheimili).",
          keyTerms: ["Kennitala (ID-номер)", "Lögheimili (прописка)", "Flutningur (переїзд)"]
        },
        {
          id: "audkenni",
          nameIsl: "Auðkenni (Rafræn skilríki)",
          nameUkr: "Національна система цифрової ідентифікації та ЕЦП",
          url: "https://www.audkenni.is/",
          authority: "Auðkenni hf.",
          cefrLevel: "A1–A2",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: ЕЛЕКТРОННИЙ ПІДПИС",
          practicalUse: "Активація електронного підпису на SIM-картці або в додатку Auðkennisappið для входу в усі банки, Heilsuvera та держоргани.",
          keyTerms: ["Rafræn skilríki (цифровий підпис)", "PIN-númer", "Auðkenning (авторизація)"]
        }
      ]
    },
    {
      id: "housing_tax",
      nameUkr: "4. Житло, субсидії та оподаткування (HMS & Skatturinn)",
      icon: "🏠",
      color: "indigo",
      sources: [
        {
          id: "hms",
          nameIsl: "HMS - Húsnæðis- og mannvirkjastofnun",
          nameUkr: "Житлово-будівельна адміністрація Ісландії",
          url: "https://hms.is/",
          authority: "Innviðaráðuneytið",
          cefrLevel: "A2.1 (Урок A2.1)",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: ОРЕНДА ТА СУБСИДІЇ",
          practicalUse: "Офіційний реєстр договорів оренди Leiguskrá, оформлення щомісячних житлових субсидій Húsaleigubætur та сертифікація житла.",
          keyTerms: ["Leigusamningur (договір оренди)", "Húsaleigubætur (субсидії)", "Trygging (застава)"]
        },
        {
          id: "skatturinn",
          nameIsl: "Skatturinn (Ríkisskattstjóri)",
          nameUkr: "Державна податкова служба Ісландії",
          url: "https://www.skatturinn.is/",
          authority: "Skatturinn",
          cefrLevel: "A2.2 (Урок A2.2)",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: ПОДАТКИ ТА ЗАРПЛАТА",
          practicalUse: "Активація персональної податкової знижки Persónuafsláttur, перевірка розрахункових табелів Launaseðill, подання щорічної декларації Skattframtal.",
          keyTerms: ["Persónuafsláttur (податкова знижка)", "Launaseðill (зарплатний лист)", "Staðgreiðsla (податок біля джерела)"]
        }
      ]
    },
    {
      id: "health_safety",
      nameUkr: "5. Медицина, екстрені служби та безпека (Heilsuvera, 112, SafeTravel)",
      icon: "🩺",
      color: "rose",
      sources: [
        {
          id: "heilsuvera",
          nameIsl: "Heilsuvera & Heilsugæslan",
          nameUkr: "Національний портал електронної охорони здоров'я",
          url: "https://www.heilsuvera.is/",
          authority: "Heilsugæsla höfuðborgarsvæðisins & Embætti landlæknis",
          cefrLevel: "A1.5, A2.4",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: МЕДИЦИНА",
          practicalUse: "Запис на прийом до лікаря (Tímapöntun), чат із черговою медсестрою, перегляд електронних рецептів (Rafrænir lyfseðlar), довідки про хворобу.",
          keyTerms: ["Heilsugæsla (поліклініка)", "Tímapöntun (запис)", "Lyfseðill (рецепт)"]
        },
        {
          id: "emergency112",
          nameIsl: "Neyðarlínan 112 & Almannavarnir",
          nameUkr: "Єдина служба екстреного порятунку та цивільний захист",
          url: "https://112.is/",
          authority: "Neyðarlínan ohf.",
          cefrLevel: "A1–A2",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: ЕКСТРЕНА ДОПОМОГА",
          practicalUse: "Виклик поліції (Lögregla), швидкої (Sjúkrabíll), пожежників (Slökkvilið) та волонтерів Landsbjörg. Сповіщення про шторми та вулкани.",
          keyTerms: ["Neyðartilvik (надзвичайна ситуація)", "Sjúkrabíll (швидка)", "Lögregla (поліція)"]
        },
        {
          id: "safetravel",
          nameIsl: "SafeTravel & Vegagerðin (Umferðin)",
          nameUkr: "Безпека подорожей та офіційний моніторинг стану доріг",
          url: "https://safetravel.is/",
          authority: "Slysavarnafélagið Landsbjörg & Vegagerðin (road.is)",
          cefrLevel: "A2.3 (Урок A2.3)",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: БЕЗПЕКА ДОРІГ",
          practicalUse: "Щоденна перевірка стану трас: чиста дорога (Greiðfært), ожеледиця (Hálka), закрита траса (Lokaður vegur), правила водіння взимку.",
          keyTerms: ["Hálka (ожеледиця)", "Lokað (закрито)", "Vetrardekk (зимова гума)"]
        }
      ]
    },
    {
      id: "labor_unions",
      nameUkr: "6. Праця, кар'єра та профспілки (Vinnumálastofnun, Efling, VR)",
      icon: "💼",
      color: "amber",
      sources: [
        {
          id: "vmst",
          nameIsl: "Vinnumálastofnun (VMST) & Alfreð.is",
          nameUkr: "Державна служба зайнятості та портал пошуку роботи",
          url: "https://www.vinnumalastofnun.is/",
          authority: "Félags- og vinnumarkaðsráðuneytið",
          cefrLevel: "A2.2",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: РИНОК ПРАЦІ",
          practicalUse: "Реєстрація як шукач роботи, отримання допомоги по безробіттю (Atvinnuleysisbætur), складання резюме ісландською.",
          keyTerms: ["Ferilskrá (CV)", "Atvinnuleitandi (шукач роботи)", "Atvinnuleysisbætur (допомога)"]
        },
        {
          id: "efling",
          nameIsl: "Stéttarfélög: Efling & VR",
          nameUkr: "Найбільші профспілки працівників столиці та сфери послуг",
          url: "https://efling.is/",
          authority: "Efling stéttarfélag & VR",
          cefrLevel: "A2.2, A2.4",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: ЗАХИСТ ПРАВ",
          practicalUse: "Тарифні сітки мінімальної заробітної плати, виплати з фонду лікарняних Sjúkrasjóður, компенсація витрат на курси ісландської мови (Styrkur).",
          keyTerms: ["Kjarasamningur (колективний договір)", "Sjúkrasjóður (лікарняний фонд)", "Starfsmenntastyrkur (грант на навчання)"]
        }
      ]
    },
    {
      id: "transport_transit",
      nameUkr: "7. Громадський транспорт та авіація (Strætó, Klapp, KEF)",
      icon: "🚌",
      color: "amber",
      sources: [
        {
          id: "straeto_klapp",
          nameIsl: "Strætó bs. & Klapp greiðslukerfi",
          nameUkr: "Міський громадський транспорт та безконтактна оплата",
          url: "https://klapp.is/",
          authority: "Strætó bs.",
          cefrLevel: "A2.3 (Урок A2.3)",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: ТРАНСПОРТ",
          practicalUse: "Придбання разових квитків (Stakt fargjald на 75 хв), оформлення місячних абонементів, сканування QR-коду валідатора, планування поїздок.",
          keyTerms: ["Að klappa (валідувати квиток)", "Stoppistöð (зупинка)", "Tímabilskort (абонемент)"]
        },
        {
          id: "kef_flybus",
          nameIsl: "Keflavíkurflugvöllur (KEF) & Flugrútan (Flybus)",
          nameUkr: "Головні повітряні ворота Ісландії та аеропортовий шатл",
          url: "https://www.kefairport.is/",
          authority: "Isavia ohf. & Kexpress",
          cefrLevel: "A2.3",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: АЕРОПОРТ",
          practicalUse: "Трансфер з автовокзалу BSÍ до аеропорту Кеflavík, термінал Leifur Eiríksson, реєстрація на рейси (Innritun) та багажний контроль.",
          keyTerms: ["Brottför (відправлення)", "Koma (прибуття)", "Farangur (багаж)"]
        }
      ]
    },
    {
      id: "banking_finance",
      nameUkr: "8. Банківська система та цифрові платежі (Landsbankinn, Arion, Íslandsbanki)",
      icon: "💳",
      color: "emerald",
      sources: [
        {
          id: "landsbankinn",
          nameIsl: "Landsbankinn & Heimabanki",
          nameUkr: "Найбільший комерційний банк Ісландії та онлайн-банкінг",
          url: "https://www.landsbankinn.is/",
          authority: "Landsbankinn hf.",
          cefrLevel: "A2.7 (Урок A2.7)",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: ФІНАНСИ",
          practicalUse: "Відкриття розрахункового рахунку (Veltureikningur), сплата вимог (Ógreiddar kröfur), налаштування прямого дебету (Boðgreiðslur) та перекази (Millifærsla).",
          keyTerms: ["Kröfur (вимоги до сплати)", "Millifæra (переказувати кошти)", "Reikningsnúmer (номер рахунку)", "Heimabanki (інтернет-банк)"]
        },
        {
          id: "audkenni_sys",
          nameIsl: "Auðkenni appið & Rafræn skilríki",
          nameUkr: "Електронна ідентифікація та цифровий підпис громадянина",
          url: "https://www.audkenni.is/",
          authority: "Auðkenni hf.",
          cefrLevel: "A2.7 (Урок A2.7)",
          statusTag: "ВІЗУАЛЬНИЙ БЛОК: ЦИФРОВИЙ КЛЮЧ",
          practicalUse: "Авторизація в банківських системах через телефон із секретним PIN-кодом, активація електронного підпису та підтвердження транзакцій.",
          keyTerms: ["Leyniorð (пароль)", "Öryggistala (код безпеки)", "Skilríki (посвідчення/сертифікат)"]
        }
      ]
    }
  ],

  // 2. AUDIO REPOSITORY & PRONUNCIATION MATRIX
  audioRegistry: {
    totalFilesOnDisk: 894,
    categories: [
      {
        id: "phonetics",
        nameUkr: "Фонетика, абетка та дифтонги (Урок 0)",
        count: 100,
        coveragePercent: 100,
        status: "complete",
        format: "MP3 / M4A / WAV",
        voiceType: "Studio Native Speaker (Árnastofnun / Bara Tala)",
        description: "32 літери абетки, глухі та дзвінкі приголосні, боковий вибух [tl], преаспірація [ʰk], [ʰt], [ʰp]."
      },
      {
        id: "words",
        nameUkr: "Якірні слова та словниковий запас (Рівень A1 & A2)",
        count: 621,
        coveragePercent: 92,
        status: "high",
        format: "MP3",
        voiceType: "Studio Neural Speech Engine",
        description: "621 нормалізоване якірне слово: продукти, меблі, родина, кольори, професії, числівники, форми дієслів."
      },
      {
        id: "dialogues",
        nameUkr: "Автентичні діалоги уроків",
        count: 103,
        coveragePercent: 100,
        status: "complete",
        format: "MP3",
        voiceType: "Bilingual Dialogues Engine (Gunnar & Guðrún Neural)",
        description: "Діалоги знайомства (Урок 1), кав'ярня Bónus (Урок 2), перерва на кухні Kaffistofan, огляд квартири (A2.1), трудова угода (A2.2), валідація Klapp (A2.3), медична консультація лінії 1700 (A2.4), бесіда у садку Leikskóli (A2.5), передача зміни на виробництві (A2.6), відкриття рахунку в Landsbankinn (A2.7), податкова консультація Skatturinn (A2.8)."
      },
      {
        id: "exam_listening",
        nameUkr: "Аудіозапитання секцій слухання (Hlustunarpróf K4–K7 та A2.1–A2.8 Lokapróf)",
        count: 47,
        coveragePercent: 100,
        status: "complete",
        format: "MP3 (Neural 24kHz)",
        voiceType: "Studio Dual Neural (Gunnar & Guðrún)",
        description: "47 автентичних начитаних аудіоситуацій для перевірки розуміння на слух в іспитах рівнів A1 та A2 (включно з випускним Lokapróf A2)."
      },
      {
        id: "podcasts",
        nameUkr: "Білінгвальні студійні подкасти для авто (Епізоди 0–21)",
        count: 23,
        coveragePercent: 100, // 22 episodes + studio deep dive
        status: "complete",
        format: "AAC M4A / MP3 (35.1 MB)",
        voiceType: "Studio Multi-Voice (Остап, Поліна, Gunnar, Guðrún)",
        description: "22 повні студійні епізоди та вступний фоно-огляд для авто: від ландшафту та абетки до іспиту на громадянство."
      }
    ],

    // LOG OF COMPLETED STUDIO VOICE-OVERS
    completedVoiceovers: [
      {
        module: "Урок A2.1 (Житло)",
        target: "Діалог огляду квартири (Skoðun á íbúð) та дзвінок орендодавцю (a2_k1_l1 – a2_k1_l8)",
        linesCount: 8,
        status: "Синтезовано & Інтегровано (100%)"
      },
      {
        module: "Урок A2.2 (Ринок праці)",
        target: "Діалог узгодження умов трудового договору (Ráðningarsamningur, a2_k2_l1 – a2_k2_l8)",
        linesCount: 8,
        status: "Синтезовано & Інтегровано (100%)"
      },
      {
        module: "Урок A2.3 (Транспорт)",
        target: "Діалог посадки у Strætó 3 (Klappa inn) та квиткова каса BSÍ (a2_k3_l1 – a2_k3_l12)",
        linesCount: 12,
        status: "Синтезовано & Інтегровано (100%)"
      },
      {
        module: "Урок A2.4 (Охорона здоров'я)",
        target: "Діалог тріажу медсестри на лінії 1700 (a2_k4_l1 – a2_k4_l8) та 4 треки Hlustun",
        linesCount: 12,
        status: "Синтезовано & Інтегровано (100%)"
      },
      {
        module: "Урок A2.5 (Освіта & Садочок)",
        target: "Розмова з вихователем садка Leikskóli (a2_k5_l1 – a2_k5_l8) та 4 треки Hlustun",
        linesCount: 12,
        status: "Синтезовано & Інтегровано (100%)"
      },
      {
        module: "Урок A2.6 (Розклад дня & Miðmynd)",
        target: "Діалог зміни на виробництві (a2_k6_l1 – a2_k6_l8) та 4 треки Hlustun",
        linesCount: 12,
        status: "Синтезовано & Інтегровано (100%)"
      },
      {
        module: "Урок A2.7 (Банки & Auðkenni)",
        target: "Відкриття рахунку Landsbankinn (a2_k7_l1 – a2_k7_l8) та 4 треки Hlustun",
        linesCount: 12,
        status: "Синтезовано & Інтегровано (100%)"
      },
      {
        module: "Урок A2.8 (Суспільство & Lokapróf A2)",
        target: "Діалог у Skatturinn (a2_k8_l1 – a2_k8_l8) та 6 випускних треків Lokapróf",
        linesCount: 14,
        status: "Синтезовано & Інтегровано (100%)"
      },
      {
        module: "Іспити K4–K7 & A2.1–A2.8 Lokapróf",
        target: "Аудіо-питання на сприйняття на слух (Hlustunarpróf, 47 треків)",
        linesCount: 47,
        status: "Синтезовано & Інтегровано (100%)"
      }
    ],

    // QUEUE FOR FUTURE HIGH-FIDELITY STUDIO VOICE-OVERS
    pendingVoiceoverQueue: [
      {
        module: "Блок B1 (Íslenska fyrir alla 3)",
        target: "Студійне озвучення матеріалів першого розділу книги 3 (B1.1)",
        linesCount: 15,
        priority: "Level B1 Launch",
        currentFallback: "Web Speech API (is-IS) / Синтетичний рушій"
      }
    ]
  }
};
