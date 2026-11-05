/**
 * a2_k8_exam_data.js - Master Certification Exam Dataset for Level A2
 * (LOKAPRÓF A2 • ÍSLENSKA FYRIR ALLA 2 • HEILDARPRÓF)
 * 
 * 30 Comprehensive Questions:
 * - 1–6: Samfélagsorðaforði (Суспільство, податки, свята)
 * - 7–12: Málfræði A2 (Þátíð sterkra/veikra sagna, Miðmynd -st, Stýring)
 * - 13–18: Hagnýt samskipti (Heilbrigði 1700, Samgöngur, Bankar, Skóli)
 * - 19–24: Lestrarpróf (Читання автентичних документів Skatturinn / ASÍ)
 * - 25–30: Hlustunarpróf (Студійне аудіювання з нейроозвучкою Gunnar & Guðrún)
 */

export const A2_K8_EXAM_DATA = {
  examId: "a2_k8_lokaprof",
  chapterId: "a2_k8",
  titleUkr: "Великий сертифікаційний випускний іспит рівня A2 (Lokapróf A2)",
  titleIsl: "Lokapróf á stigi A2: Samfélag, málfræði og hlustun",
  passingScore: 85, // 26 / 30 for honors pass
  totalQuestions: 30,

  questions: [
    // 1–6: СУСПІЛЬНА ЛЕКСИКА ТА ІНСТИТУЦІЇ
    {
      id: 1,
      type: "choice",
      question: "Hvað er „skattframtal“ og hvenær á að skila því á Íslandi?",
      options: [
        "Það er skattaskýrsla sem allir íbúar skila rafrænt í mars á skatturinn.is",
        "Það er leigusamningur sem maður sýnir hjá HMS í janúar",
        "Það er umsókn um vegabréf hjá Þjóðskrá í júní",
        "Það er læknisvottorð sem maður sendir á heilsugæsluna"
      ],
      correct: 0,
      explanation: "Skattframtal — це щорічна податкова декларація, яку всі резиденти зобов'язані перевірити та подати онлайн у березні на порталі skatturinn.is."
    },
    {
      id: 2,
      type: "choice",
      question: "Hvernig nýtist „persónuafsláttur“ á launaseðli?",
      options: [
        "Hann dregst frá reiknuðum tekjuskatti svo þú borgar minni skatt",
        "Hann bætist við grunnlaunin sem bónusgreiðsla",
        "Hann greiðir fyrir strætókort og bensín",
        "Hann gildir aðeins ef þú vinnur á næturvöktum"
      ],
      correct: 0,
      explanation: "Persónuafsláttur — це фіксована щомісячна податкова знижка, яка віднімається від розрахованого прибуткового податку, зменшуючи суму до сплати."
    },
    {
      id: 3,
      type: "choice",
      question: "Hvaða stofnun afgreiðir dvalarleyfi og ríkisborgararétt á Íslandi?",
      options: [
        "Útlendingastofnun (ÚTL)",
        "Vegagerðin",
        "Strætó bs.",
        "Landsbókasafnið"
      ],
      correct: 0,
      explanation: "Útlendingastofnun (Імміграційна служба) розглядає заяви на надання та продовження дозволів на проживання (dvalarleyfi) і громадянство."
    },
    {
      id: 4,
      type: "choice",
      question: "Hvað er „stéttarfélag“ (t.d. Efling eða VR)?",
      options: [
        "Félag launafólks sem semur um lágmarkslaun og verndar réttindi starfsmanna",
        "Íþróttafélag sem rekur sundlaugar í Reykjavík",
        "Bílasala sem selur skoðaða bíla",
        "Reikningsstofa sem sér aðeins um skattframtöl"
      ],
      correct: 0,
      explanation: "Stéttarfélag (профспілка) укладає колективні договори (kjarasamningar), гарантує мінімальну оплату, надає юридичний захист та лікарняні виплати."
    },
    {
      id: 5,
      type: "choice",
      question: "Hvenær er þjóðhátíðardagur Íslands haldinn hátíðlegur?",
      options: [
        "17. júní (lýðveldisstofnun 1944)",
        "1. desember",
        "24. desember",
        "1. maí"
      ],
      correct: 0,
      explanation: "Þjóðhátíðardagur Íslands відзначається 17 червня на честь проголошення республіки у 1944 році на Тінґветлірі."
    },
    {
      id: 6,
      type: "choice",
      question: "Hvaða hefðbundni matur er borðaður á Þorrablóti í janúar og febrúar?",
      options: [
        "Hákarl, svið, súrsaðir hrútspungar og rúgbrauð",
        "Pítsa, hamborgari og franskar kartöflur",
        "Kjötsúpa með engu kjöti og hrísgrjónum",
        "Bara sætindi og ís"
      ],
      correct: 0,
      explanation: "На зимове свято Þorrablót традиційно споживають þorramatur: ферментовану акулу (hákarl), обпалені баранячі голови (svið) та кислі делікатеси."
    },

    // 7–12: ГРАМАТИКА РІВНЯ A2 (МИНУЛИЙ ЧАС ТА СЕРЕДНІЙ СТАН)
    {
      id: 7,
      type: "choice",
      question: "Hver er rétt þátíðarmynd af veikri sögninni „að tala“ (ég ...)?",
      options: [
        "ég talaði",
        "ég taldi",
        "ég tók",
        "ég tölum"
      ],
      correct: 0,
      explanation: "Слабке дієслово 1-ї групи að tala утворює минулий час за допомогою суфікса -aði: ég talaði, við töluðum."
    },
    {
      id: 8,
      type: "choice",
      question: "Hver er rétt þátíðarmynd af sterku sögninni „að fara“ í eintölu (hann ...)?",
      options: [
        "hann fór",
        "hann farið",
        "hann faraði",
        "hann fórum"
      ],
      correct: 0,
      explanation: "Сильне дієслово að fara в однині минулого часу змінює кореневу голосну на ó: ég/hann fór (ми: við fórum)."
    },
    {
      id: 9,
      type: "choice",
      question: "Hvernig breytist sögnin „að hitta“ í gagnkvæma miðmynd (við ... á morgun)?",
      options: [
        "Við hittumst á morgun",
        "Við hittum á morgun",
        "Við hittast á morgun",
        "Við hittum okkur á morgun"
      ],
      correct: 0,
      explanation: "Дієслова взаємної дії приєднують закінчення -st: við hittumst (ми зустрічаємося одне з одним)."
    },
    {
      id: 10,
      type: "choice",
      question: "Hvaða fall stýrir forsetningin „hjá“ (ég vinn hjá ...)?",
      options: [
        "Þágufalli (ÞGF / давальний відмінок)",
        "Þolfalli (ÞF / знахідний відмінок)",
        "Eignarfalli (EF / родовий відмінок)",
        "Nefnifalli (NF / називний відмінок)"
      ],
      correct: 0,
      explanation: "Прийменник hjá завжди вимагає давального відмінка (ÞGF): hjá fyrirtækinu, hjá lækninum."
    },
    {
      id: 11,
      type: "choice",
      question: "Hvernig er rétt að segja: «Я збираюся поїхати додому»?",
      options: [
        "Ég ætla að fara heim",
        "Ég ætla að fara heima",
        "Ég ætla að fór heim",
        "Ég fer í heima"
      ],
      correct: 0,
      explanation: "При позначенні напрямку руху (куди?) вживається прислівник «heim» (додому), на відміну від місця спокою «heima» (вдома)."
    },
    {
      id: 12,
      type: "choice",
      question: "Hvaða fall tekur sögnin „að hjálpa“ (hún hjálpar ...)?",
      options: [
        "Þágufall (ÞGF): hún hjálpar mér / vini sínum",
        "Þolfall (ÞF): hún hjálpar mig",
        "Eignarfall (EF): hún hjálpar mín",
        "Nefnifall (NF): hún hjálpar ég"
      ],
      correct: 0,
      explanation: "Дієслово að hjálpa (допомагати) завжди вимагає після себе давального відмінка (ÞGF): hjálpa mér, hjálpa fólkinu."
    },

    // 13–18: ПРАКТИЧНІ СОЦІАЛЬНІ СИТУАЦІЇ
    {
      id: 13,
      type: "choice",
      question: "Ef þú veikist skyndilega á kvöldin og þarft ráðgjöf hjúkrunarfræðings, hvert hringir þú?",
      options: [
        "Í síma 1700 (Læknavaktin / Heilsugæslan)",
        "Í síma 112 (bara ef lífsháski er á ferðum)",
        "Í Strætó upplýsingar",
        "Í Skattinn"
      ],
      correct: 0,
      explanation: "Цілодобова безкоштовна медична консультація медсестри надається за номером 1700 (Heilsugæslan), а 112 — лише для невідкладних екстрених випадків."
    },
    {
      id: 14,
      type: "choice",
      question: "Hvað þýðir það að „klappa inn“ í Strætó?",
      options: [
        "Að bera Klapp-kortið eða símann að skannanum til að staðfesta fargjaldið",
        "Að klappa bílstjóranum á öxlina",
        "Að klappa saman höndum þegar vagninn kemur",
        "Að biðja um kvittun á pappír"
      ],
      correct: 0,
      explanation: "„Að klappa inn“ — це валідувати проїзд, приклавши картку або QR-код додатку Klapp до зчитувача біля водія."
    },
    {
      id: 15,
      type: "choice",
      question: "Hvað eru „ógreiddar kröfur“ í heimabankanum þínum?",
      options: [
        "Rafrænir reikningar sem bíða greiðslu (t.d. rafmagn eða leikskóli)",
        "Peningar sem bankinn gefur þér ókeypis",
        "Kvittanir fyrir gömlum kaupum í Bónus",
        "Skilaboð frá vinum á samfélagsmiðlum"
      ],
      correct: 0,
      explanation: "Kröfur — це електронні платіжні вимоги (рахунки за комуналку, телефон, садок), які автоматично надходять в інтернет-банк."
    },
    {
      id: 16,
      type: "choice",
      question: "Hvað gerir þú í Mentor.is ef barnið þitt er veikt og getur ekki farið í grunnskóla?",
      options: [
        "Skráir veikindatilkynningu fyrir byrjun skóladags",
        "Hringir í lögregluna",
        "Sendir skilaboð á Landsbankann",
        "Bíður þangað til skólaárinu lýkur"
      ],
      correct: 0,
      explanation: "У системі Mentor.is батьки зобов'язані зафіксувати повідомлення про хворобу (veikindatilkynning) вранці до початку уроків."
    },
    {
      id: 17,
      type: "choice",
      question: "Hvað kveður vinnuverndarlöggjöfin á um varðandi hvíldartíma milli vakta?",
      options: [
        "Að minnsta kosti 11 tíma samfellda hvíld á hverjum 24 klukkustundum",
        "Engin hvíld er nauðsynleg ef þú færð kaffi",
        "Aðeins 4 tíma hvíld",
        "Bara hvíld um helgar"
      ],
      correct: 0,
      explanation: "Законодавство з охорони праці (Vinnueftirlitið/ASÍ) суворо вимагає щонайменше 11 годин безперервного відпочинку між робочими змінами."
    },
    {
      id: 18,
      type: "choice",
      question: "Hvernig er rétt að ávarpa samstarfsmenn og yfirmenn á íslenskum vinnustað?",
      options: [
        "Á skírnarnafni og nota „þú“ (jafnrétti og óformleg samskipti)",
        "Með „Herra forstjóri“ og nota „Þér“",
        "Aðeins með eftirnafni",
        "Ekki tala við yfirmenn nema með leyfi"
      ],
      correct: 0,
      explanation: "В ісландській корпоративній культурі панує рівність (jafnræði): до всіх, включно з директорами, звертаються на ім'я та на «ти»."
    },

    // 19–24: ЧИТАННЯ (LESTRARPRÓF: ТЕКСТ ПОДАТКОВОЇ ДЕКЛАРАЦІЇ)
    {
      id: 19,
      type: "choice",
      question: "Lestu textann: «Skattframtal 2026 er nú opið á skatturinn.is. Vinsamlegast yfirfarið tekjur, frádráttarliði og tilgreinið bankareikning til endurgreiðslu fyrir 15. mars.» Hvað verður notandi að gera?",
      options: [
        "Skrá sig inn, fara yfir upplýsingarnar og staðfesta bankareikning fyrir 15. mars",
        "Bíða fram á haust með að skoða tölvupóstinn",
        "Fara í eigin persónu á skattstofuna og bíða í röð",
        "Greiða sekt strax í dag"
      ],
      correct: 0,
      explanation: "Текст чітко вимагає перевірити дані доходів та вказати банківський рахунок для повернення коштів онлайн до 15 березня."
    },
    {
      id: 20,
      type: "choice",
      question: "Hvað þýðir orðið „endurgreiðsla“ í texta Skattsins?",
      options: [
        "Peningar sem ríkið endurgreiðir þér ef þú hefur borgað of mikinn skatt",
        "Nýr skattur sem þú verður að borga ríkinu",
        "Gjald fyrir að opna skattframtalið",
        "Lán sem þú tekur hjá bankanum"
      ],
      correct: 0,
      explanation: "Endurgreiðsla — повернення коштів (відшкодування переплаченого податку державою)."
    },
    {
      id: 21,
      type: "choice",
      question: "Lestu: «Samkvæmt kjarasamningi á starfsmaður rétt á orlofi, sem er að lágmarki 24 dagar á hverju orlofsári.» Hvað er „orlof“?",
      options: [
        "Launað leyfi frá störfum (frí / відпустка)",
        "Næturvakt um helgi",
        "Bónus sem greiddur er í matvörum",
        "Uppbót fyrir yfirvinnu"
      ],
      correct: 0,
      explanation: "Orlof — це щорічна оплачувана трудова відпустка, мінімальний розмір якої за тарифами становить 24 робочих дні."
    },
    {
      id: 22,
      type: "choice",
      question: "Hvað er „sjúkradagpeningar“ hjá stéttarfélagi?",
      options: [
        "Fjárhagsleg aðstoð þegar starfsmaður getur ekki unnið vegna langvarandi veikinda",
        "Kort sem gefur afslátt af lyfjum í apóteki",
        "Gjald sem læknirinn rukkar fyrir skoðun",
        "Greiðsla fyrir að mæta snemma í vinnuna"
      ],
      correct: 0,
      explanation: "Sjúkradagpeningar — це щоденна матеріальна допомога від профспілки у випадку тривалої втрати працездатності через хворобу."
    },
    {
      id: 23,
      type: "choice",
      question: "Lestu tilkynningu: «Kynntu þér rétt þinn til íslenskunámsstyrks hjá þínu stéttarfélagi. Flest stéttarfélög endurgreiða allt að 75–90% af námskeiðsgjaldi.» Hvað þýðir þetta?",
      options: [
        "Stéttarfélagið getur endurgreitt stóran hluta kostnaðar við að læra íslensku",
        "Þú verður að borga stéttarfélaginu 90% af laununum þínum",
        "Íslenskunámskeið eru bönnuð á vinnutíma",
        "Bara stjórnendur fá styrk til náms"
      ],
      correct: 0,
      explanation: "Профспілки повертають 75–90% вартості курсів ісландської мови через навчальні фонди (Starfsmenntastyrkur)."
    },
    {
      id: 24,
      type: "choice",
      question: "Hvað er „kennitala“ og hvers vegna er hún mikilvæg á Íslandi?",
      options: [
        "10 stafa persónuauðkenni sem allir þurfa fyrir banka, vinnu, heilsugæslu og skóla",
        "Símanúmer neyðarlínunnar",
        "Póstnúmer í Reykjavík",
        "Raðnúmer á strætómiða"
      ],
      correct: 0,
      explanation: "Kennitala — це 10-значний особистий ідентифікаційний код громадянина/резидента, без якого неможливо здійснити жодну адміністративну дію в Ісландії."
    },

    // 25–30: СЛУХАННЯ (HLUSTUNARPRÓF МЕЙН-СПІКЕРІВ GUNNAR & GUÐRÚN)
    {
      id: 25,
      type: "listening",
      audioUrl: "audio/exam/hlustun_a2k8_q25.mp3",
      question: "Hlustaðu á hljóðklippuna. Hvenær verða allir sem búa á Íslandi að skila skattframtali?",
      options: [
        "Í mars",
        "Í janúar",
        "Í júní",
        "Í desember"
      ],
      correct: 0,
      explanation: "Диктор Gunnar чітко промовляє: «Allir sem búa á Íslandi verða að skila skattframtali í mars»."
    },
    {
      id: 26,
      type: "listening",
      audioUrl: "audio/exam/hlustun_a2k8_q26.mp3",
      question: "Hlustaðu á hljóðklippuna. Hvaða dagur er sautjándi júní á Íslandi?",
      options: [
        "Þjóðhátíðardagur Íslendinga",
        "Fyrsti vetrardagur",
        "Sjómannadagurinn",
        "Gamlársdagur"
      ],
      correct: 0,
      explanation: "Диктор Guðrún вимовляє: «Þjóðhátíðardagur Íslendinga er haldinn hátíðlegur sautjánda júní á hverju ári»."
    },
    {
      id: 27,
      type: "listening",
      audioUrl: "audio/exam/hlustun_a2k8_q27.mp3",
      question: "Hlustaðu á hljóðklippuna. Hvað verður þú að gera ef þú skiptir um vinnu?",
      options: [
        "Láta nýja vinnuveitandann fá skattkortið sitt",
        "Kaupa nýjan bíl",
        "Fara úr landi í einn mánuð",
        "Gleyma persónuafslættinum"
      ],
      correct: 0,
      explanation: "Диктор Gunnar пояснює: «Ef þú skiptir um vinnu verður þú að láta nýja vinnuveitandann fá skattkortið þitt»."
    },
    {
      id: 28,
      type: "listening",
      audioUrl: "audio/exam/hlustun_a2k8_q28.mp3",
      question: "Hlustaðu á hljóðklippuna. Hvað borða Íslendingar á Þorrablóti?",
      options: [
        "Hefðbundinn mat eins og hákarl og svið",
        "Bara ítalska pizzu",
        "Ávexti og grænmeti",
        "Franskar kartöflur með tómatsósu"
      ],
      correct: 0,
      explanation: "Диктор Guðrún зазначає: «Á Þorrablóti borða Íslendingar hefðbundinn mat eins og hákarl og svið»."
    },
    {
      id: 29,
      type: "listening",
      audioUrl: "audio/exam/hlustun_a2k8_q29.mp3",
      question: "Hlustaðu á hljóðklippuna. Hvaða mál afgreiðir Útlendingastofnun?",
      options: [
        "Dvalarleyfi og endurnýjun á skilríkjum",
        "Viðgerðir á bílum",
        "Sölu á leikhúsmiðum",
        "Lánveitingar til kaupa á húsnæði"
      ],
      correct: 0,
      explanation: "Диктор Gunnar зазначає: «Útlendingastofnun afgreiðir dvalarleyfi og endurnýjun á skilríkjum»."
    },
    {
      id: 30,
      type: "listening",
      audioUrl: "audio/exam/hlustun_a2k8_q30.mp3",
      question: "Hlustaðu á kveðjuna. Hvað segir mælandinn í lokin?",
      options: [
        "Til hamingju með að ljúka námskeiðinu í íslensku á stigi A2!",
        "Gjörðu svo vel og komdu aftur á morgun",
        "Því miður féllstu á prófinu",
        "Takk fyrir viðskiptin og bless"
      ],
      correct: 0,
      explanation: "Диктор Guðrún урочисто віншує випускника: «Til hamingju með að ljúka námskeiðinu í íslensku á stigi A2!» (Вітаємо із завершенням курсу ісландської мови на рівні A2!)."
    }
  ]
};
