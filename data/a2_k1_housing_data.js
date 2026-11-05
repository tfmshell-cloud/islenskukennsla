/**
 * a2_k1_housing_data.js - Academic Dataset for Level A2 • Lesson 1 (Kafli 1: Húsnæði og leigusamningar)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 1: Húsnæði, pp. 6-27 — BOOK 2 FOUNDATION)
 * - HMS (Húsnæðis- og mannvirkjastofnun — Official Housing Benefits & Leiguskrá standard)
 * - Litli málfræðingurinn & Árnastofnun BÍN (Þátíð veakra sagna: -aði, -ði, -ti, -di)
 * - Tölum saman 2022 (Íbúðaleit og samskipti við leigusala)
 */

export const A2_K1_HOUSING_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Рівень A2 • Урок 1: Житлові умови, договори оренди та минулий час слабких дієслів",
  titleIsl: "Stig A2 • Kafli 1: Húsnæði, leigusamningar og þátíð veakra sagna",
  level: "A2.1 (ÍFA 2 Kafli 1)",
  book: "Íslenska fyrir alla 2",

  // 1. WEAK VERBS IN PAST TENSE (ÞÁTÍÐ VEAKRA SAGNA)
  pastTenseGrammar: {
    ruleTitle: "Формування минулого часу слабких дієслів (Veikar sagnir)",
    description: "Слабкі дієслова в ісландській мові утворюють минулий час (Þátíð) за допомогою дентального суфікса (-aði, -ði, -ti, -di), без зміни кореневого голосного або з регулярним чергуванням (U-умлаут у множині).",
    classes: [
      {
        group: "1. Flokkur (-aði)",
        pattern: "Infinitiv ending á -a ➔ Þátíð -aði",
        desc: "Найбільш продуктивна група. Дієслова із закінченням -a в 1-й особі теперішнього часу (ég skoða ➔ ég skoðaði).",
        examples: [
          { inf: "að skoða", pres: "ég skoða", past: "ég skoðaði", ukr: "оглядати (квартиру)", phrase: "Við skoðuðum flotta íbúð í gær." },
          { inf: "að leigja", pres: "ég leigi", past: "ég leigði", ukr: "орендувати", phrase: "Hún leigði litla stúdíóíbúð í miðbænum." },
          { inf: "að borga", pres: "ég borga", past: "ég borgaði", ukr: "платити", phrase: "Hann borgaði húsaleiguna á réttum tíma." },
          { inf: "að tala", pres: "ég tala", past: "ég talaði", ukr: "говорити", phrase: "Ég talaði við leigusalann í morgun." }
        ]
      },
      {
        group: "2. Flokkur (-ði / -ti / -di)",
        pattern: "Dental ending eftir stofni",
        desc: "Дієслова із закінченням -ir в теперішньому часі (ég kaupi ➔ ég keypti). Суфікс залежить від кінцевого звука основи: глухий (-ti), дзвінкий (-ði / -di).",
        examples: [
          { inf: "að kaupa", pres: "ég kaupi", past: "ég keypti", ukr: "купувати", phrase: "Þau keyptu ný húsgögn í stofuna." },
          { inf: "að hitta", pres: "ég hitti", past: "ég hitti", ukr: "зустрічати", phrase: "Ég hitti eigandann í gærkvöldi." },
          { inf: "að senda", pres: "ég sendi", past: "ég sendi", ukr: "надсилати", phrase: "Við sendum umsókn um húsaleigubætur." }
        ]
      },
      {
        group: "3. Flokkur (-ði)",
        pattern: "Stofnlægt -i- fellur niður",
        desc: "Дієслова 3-ї групи на -ur (ég lifi ➔ ég lifði).",
        examples: [
          { inf: "að duga", pres: "það dugir", past: "það dugði", ukr: "бути достатнім", phrase: "Tryggingin dugði fyrir skemmdunum." },
          { inf: "að lifa", pres: "ég lifi", past: "ég lifði", ukr: "жити / виживати", phrase: "Þau lifðu góðu lífi í sveitinni." }
        ]
      }
    ]
  },

  // 2. HOUSING TYPES & VOCABULARY (HÚSNÆÐISGERÐIR)
  housingTypes: [
    {
      id: "studio",
      nameIsl: "Stúdíóíbúð",
      gender: "kvk",
      ipa: "[ˈstuːtjouːˌiːpuːð]",
      ukr: "однокімнатна квартира-студія (кухня суміщена з кімнатою)",
      icon: "🏢",
      details: "Зазвичай 25–45 м², популярний вибір для студентів та одинаків.",
      samplePhrase: "Ég leigi litla stúdíóíbúð í Vesturbænum.",
      sampleUkr: "Я орендую невелику студію у Вестурбайрі."
    },
    {
      id: "herbergi",
      nameIsl: "Herbergi til leigu",
      gender: "hk",
      ipa: "[ˈhɛrpɛrcɪ tʰɪːl ˈleiːkʏ]",
      ukr: "кімната в оренду (у спільній квартирі Sambýli)",
      icon: "🚪",
      details: "Спільне користування кухнею та санвузлом (sameiginlegt eldhús og bað).",
      samplePhrase: "Herbergið kostar hundrað þúsund krónur á mánuði.",
      sampleUkr: "Кімната коштує 100 000 крон на місяць."
    },
    {
      id: "tveggja_herb",
      nameIsl: "Tveggja herbergja íbúð",
      gender: "kvk",
      ipa: "[ˈtʰvɛcːa ˈhɛrpɛrca ˈiːpuːð]",
      ukr: "двокімнатна квартира (вітальня + 1 спальня)",
      icon: "🛋️",
      details: "В Ісландії кількість кімнат включає вітальню: tveggja herbergja = 1 спальня + stofa.",
      samplePhrase: "Við erum að leita að tveggja herbergja íbúð með svölum.",
      sampleUkr: "Ми шукаємо двокімнатну квартиру з балконом."
    },
    {
      id: "einbylishus",
      nameIsl: "Einbýlishús",
      gender: "hk",
      ipa: "[ˈeiːnˌpiːlɪsˌhuːs]",
      ukr: "окремий приватний житловий будинок",
      icon: "🏡",
      details: "Окремий будинок із власною ділянкою (garður) та гаражем (bílskúr).",
      samplePhrase: "Fjölskyldan býr í stóru einbýlishúsi í Kópavogi.",
      sampleUkr: "Сім'я живе у великому приватному будинку в Коупавогурі."
    },
    {
      id: "radhus",
      nameIsl: "Raðhús",
      gender: "hk",
      ipa: "[ˈraːðˌhuːs]",
      ukr: "таунхаус (блокований будинок зі спільними бічними стінами)",
      icon: "🏘️",
      details: "Поєднує переваги будинку та квартири з невеликим власним подвір'ям.",
      samplePhrase: "Þau skoðuðu raðhús í Grafarvogi.",
      sampleUkr: "Вони оглянули таунхаус у Графарвогурі."
    }
  ],

  // 3. RENTAL CONTRACT & FINANCIAL TERMS (LEIGUSAMNINGUR & HMS)
  rentalTerms: [
    {
      termIsl: "Húsaleigusamningur",
      ipa: "[ˈhuːsaˌleiːkʏˌsamnɪŋkʏr]",
      ukr: "офіційний договір оренди житла",
      icon: "📜",
      category: "legal",
      desc: "Стандартизований державою договір (Tímabundinn — строковий або Ótímabundinn — безстроковий). Повинен реєструватися в Leiguskrá HMS для отримання житлової допомоги."
    },
    {
      termIsl: "Trygging (Tryggingarfé)",
      ipa: "[ˈtʰrɪcːɪŋk / ˈtʰrɪcːɪŋkarˌfjɛː]",
      ukr: "заставний депозит (зазвичай 2-3 місяці)",
      icon: "🔒",
      category: "financial",
      desc: "Гарантійна сума на випадок пошкоджень житла або несплати оренди. Зберігається на спеціальному банківському рахунку (tryggingareikningur)."
    },
    {
      termIsl: "Húsaleigubætur",
      ipa: "[ˈhuːsaˌleiːkʏˌpaiːtʏr]",
      ukr: "державна субсидія на оренду житла (HMS)",
      icon: "🏛️",
      category: "financial",
      desc: "Щомісячна грошова виплата від Húsnæðis- og mannvirkjastofnun особам, які орендують офіційно зареєстроване житло."
    },
    {
      termIsl: "Hússjóður",
      ipa: "[ˈhuːsˌsjouːðʏr]",
      ukr: "комунальний фонд будинку / ОСББ",
      icon: "🧹",
      category: "financial",
      desc: "Оплата за прибирання сходів (stigagangur), освітлення та вивіз сміття. Завжди уточнюйте: innifalinn (включений) чи bætist við (додається)."
    },
    {
      termIsl: "Rafmagn og hiti innifalið",
      ipa: "[ˈravˌmakn ɔːɣ ˈhɪːtɪ ˈɪnɪˌfalɪð]",
      ukr: "електроенергія та геотермальне опалення включені в ціну",
      icon: "⚡",
      category: "utilities",
      desc: "Завдяки дешевій геотермальній енергії опалення в Ісландії часто включають у вартість, але електрика може оплачуватися окремо."
    },
    {
      termIsl: "Gæludýr leyfð / bönnuð",
      ipa: "[ˈcaiːlʏˌtiːr ˈleiːvð / ˈpœnːʏð]",
      ukr: "домашні тварини дозволені / заборонені",
      icon: "🐾",
      category: "rules",
      desc: "В багатоквартирних будинках Ісландії утримання собак або котів вимагає згоди 2/3 співвласників будинку."
    }
  ],

  // 4. COMMUNICATIVE APARTMENT VIEWING DIALOGUE (ÍBÚÐARSKOÐUN)
  dialogue: {
    id: "ibudarskodun",
    titleUkr: "Діалог: Огляд квартири та спілкування з орендодавцем",
    titleIsl: "Íbúðarskoðun og samskipti við leigusala",
    situation: "Поліна прийшла на відкритий огляд квартири (Opið hús) на вулиці Hringbraut у Рейк'явіку та обговорює умови оренди з орендодавцем Йоном.",
    lines: [
      {
        speaker: "Jón",
        role: "Leigusali (Орендодавець)",
        is: "Góðan daginn! Komdu inn. Þetta er tveggja herbergja íbúð á þriðju hæð.",
        ipa: "[ˈkouːðan ˈtaiːjɪn ˈkʰɔmtʏ ɪnː ˈθɛhta ɛr ˈtʰvɛcːa ˈhɛrpɛrca ˈiːpuːð auː ˈθrɪhjʏ haiːð]",
        ukr: "Доброго дня! Заходьте. Це двокімнатна квартира на третьому поверсі.",
        note: "tveggja herbergja — 1 вітальня + 1 спальня",
        audio: "audio/dialogue/a2_k1_l1.mp3"
      },
      {
        speaker: "Поліна",
        role: "Leigjandi (Орендарка)",
        is: "Góðan daginn! Hún lítur mjög vel út og er björt. Er hiti og rafmagn innifalið í leigunni?",
        ipa: "[ˈkouːðan ˈtaiːjɪn huːn ˈliːtʏr mjœːx vɛːl uːt ɔːɣ ɛr pjœrt ɛr ˈhɪːtɪ ɔːɣ ˈravˌmakn ˈɪnɪˌfalɪð iː ˈleiːkʏnːɪ]",
        ukr: "Доброго дня! Вона виглядає чудово і дуже світла. А опалення та електрика включені в оренду?",
        note: "vera innifalið í — бути включеним у...",
        audio: "audio/dialogue/a2_k1_l2.mp3"
      },
      {
        speaker: "Jón",
        role: "Leigusali (Орендодавець)",
        is: "Hitinn og hússjóður eru innifalin, en leigjandi borgar fyrir rafmagnið sjálfur. Leigan er tvö hundruð og fimmtíu þúsund á mánuði.",
        ipa: "[ˈhɪːtɪnː ɔːɣ ˈhuːsˌsjouːðʏr ɛrʏ ˈɪnɪˌfalɪn ɛn ˈleiːcanti ˈpɔrkar ˈfɪːrɪr ˈravˌmaknɪð ˈsjaulvʏr ˈleiːkan ɛr tʰvœː ˈhʏntrʏð ɔːɣ ˈfɪmtɪjʏ ˈθuːsʏnt auː ˈmauːnʏðɪ]",
        ukr: "Опалення та комуналка будинку включені, але електрику орендар оплачує сам. Оренда складає 250 000 крон на місяць.",
        note: "borgar fyrir (+ÞF 🟢)",
        audio: "audio/dialogue/a2_k1_l3.mp3"
      },
      {
        speaker: "Поліна",
        role: "Leigjandi (Орендарка)",
        is: "Skilja. Hversu mikil er tryggingin? Og er hægt að skrá samninginn hjá HMS fyrir húsaleigubótum?",
        ipa: "[ˈscɪːlja ˈkʰvɛrsʏ ˈmɪːcɪl ɛr ˈtʰrɪcːɪŋcɪn ɔːɣ ɛr haixt aːð skrauː ˈsamnɪŋkɪn çaul hauː-ɛm-ɛs ˈfɪːrɪr ˈhuːsaˌleiːkʏˌpouːtʏm]",
        ukr: "Зрозуміло. Який розмір депозиту? І чи можна зареєструвати договір у HMS для отримання житлової субсидії?",
        note: "skrá samning — зареєструвати договір",
        audio: "audio/dialogue/a2_k1_l4.mp3"
      },
      {
        speaker: "Jón",
        role: "Leigusali (Орендодавець)",
        is: "Já, auðvitað! Ég skrái samninginn rafrænt á HMS. Tryggingin er tveir mánuðir í bankaábyrgð.",
        ipa: "[jauː ˈœyðˌvɪhta jɛːx ˈskrauːjɪ ˈsamnɪŋkɪn ˈravˌraiːnt auː hauː-ɛm-ɛs ˈtʰrɪcːɪŋcɪn ɛr tʰveiːr ˈmauːnœyðɪr iː ˈpaŋkaˌauːpɪrks]",
        ukr: "Так, звісно! Я реєструю договір електронно на порталі HMS. Депозит — два місяці банківської гарантії.",
        note: "bankaábyrgð — банківська гарантія",
        audio: "audio/dialogue/a2_k1_l5.mp3"
      },
      {
        speaker: "Поліна",
        role: "Leigjandi (Орендарка)",
        is: "Frábært! Hvenær er íbúðin laus til afhendingar og má hafa gæludýr hérna?",
        ipa: "[ˈfrauːpairt ˈkʰvɛːnair ɛr ˈiːpuːðɪn lœyːs tʰɪːl ˈavˌhɛntɪŋkar ɔːɣ mauː ˈhaːva ˈcaiːlʏˌtiːr çɛrtna]",
        ukr: "Чудово! Коли квартира звільняється для передачі і чи дозволено тримати домашніх тварин?",
        note: "laus til afhendingar — вільна до заселення",
        audio: "audio/dialogue/a2_k1_l6.mp3"
      },
      {
        speaker: "Jón",
        role: "Leigusali (Орендодавець)",
        is: "Hún er laus frá fyrsta næsta mánaðar. Því miður eru engin gæludýr leyfð samkvæmt húsreglum.",
        ipa: "[huːn ɛr lœyːs frauː ˈfɪrsta ˈnaista ˈmauːnaðar θviː ˈmɪːðʏr ɛrʏ ˈeiŋcɪn ˈcaiːlʏˌtiːr ˈleiːvð ˈsamˌkʰvaiːmt ˈhuːsˌrɛklʏm]",
        ukr: "Вона вільна з першого числа наступного місяця. На жаль, тварини не дозволені правилами будинку.",
        note: "húsreglur — правила внутрішнього розпорядку будинку",
        audio: "audio/dialogue/a2_k1_l7.mp3"
      },
      {
        speaker: "Поліна",
        role: "Leigjandi (Орендарка)",
        is: "Allt í lagi, ég skil það fullkomlega. Ég sendi þér meðmæli og staðfestingu í dag.",
        ipa: "[ˈaldt iː ˈlaːjɪ jɛːx scɪːl θaːð ˈfʏtlˌkʰɔmlɛːka jɛːx ˈsɛntɪ θjɛːr ˈmɛðˌmaiːlɪ ɔːɣ ˈstaːðˌfɛstɪŋkʏ iː taiːx]",
        ukr: "Гаразд, я це повністю розумію. Я надішлю вам рекомендації та підтвердження сьогодні.",
        note: "meðmæli — рекомендації від попередніх орендодавців",
        audio: "audio/dialogue/a2_k1_l8.mp3"
      }
    ]
  }
};
