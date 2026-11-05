/**
 * a2_k8_society_data.js - Core Curriculum Dataset for Level A2 • Lesson 8
 * (Kafli 8: Íslenskt samfélag, réttindi og Lokapróf A2)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 8: Samfélagið & Menning)
 * - Skatturinn (Skattframtal & Persónuafsláttur)
 * - Útlendingastofnun (Dvalarleyfi & Réttindi)
 * - Alþýðusamband Íslands ASÍ (Réttindi á vinnumarkaði)
 */

export const A2_K8_SOCIETY_DATA = {
  chapterId: "a2_k8",
  chapterNum: "A2.8",
  titleUkr: "Ісландське суспільство, права, податки та випускний іспит A2",
  titleIsl: "Íslenskt samfélag, réttindi, skattar og Lokapróf A2",
  descriptionUkr: "Фінальний модуль ступеня A2: податкова декларація у Skatturinn, види дозволів на проживання (dvalarleyfi), профспілковий захист, ісландські національні свята та традиції, а також великий випускний сертифікаційний іспит Lokapróf A2.",
  badge: "ФІНАЛ РІВНЯ A2 • КНИГА 2 • УРОК 8",

  // 1. ANCHOR VOCABULARY (8 terms)
  vocabulary: [
    {
      id: "skattframtal",
      word: "skattframtal",
      gender: "hk",
      translationUkr: "податкова декларація",
      ipa: "[ˈskahtˌframˌtʰaːl]",
      exampleIsl: "Allir sem búa á Íslandi verða að skila skattframtali í mars.",
      exampleUkr: "Усі, хто живе в Ісландії, повинні подати податкову декларацію у березні.",
      binUrl: "https://bin.arnastofnun.is/beyging/skattframtal"
    },
    {
      id: "personuafslattur",
      word: "persónuafsláttur",
      gender: "kk",
      translationUkr: "особиста податкова знижка (пільга)",
      ipa: "[ˈpʰɛrsoːnʏˌafˌslauhtʏr]",
      exampleIsl: "Þú getur nýtt persónuafsláttinn þinn til að lækka skattinn af laununum.",
      exampleUkr: "Ви можете використати свою особисту знижку, щоб зменшити податок із зарплати.",
      binUrl: "https://bin.arnastofnun.is/beyging/pers%C3%B3nuafsl%C3%A1ttur"
    },
    {
      id: "dvalarleyfi",
      word: "dvalarleyfi",
      gender: "hk",
      translationUkr: "дозвіл на проживання",
      ipa: "[ˈtvaːlarˌleivɪ]",
      exampleIsl: "Útlendingastofnun gefur út dvalarleyfi fyrir útlendinga.",
      exampleUkr: "Імміграційна служба видає дозвіл на проживання для іноземців.",
      binUrl: "https://bin.arnastofnun.is/beyging/dvalarleyfi"
    },
    {
      id: "stettarfelag",
      word: "stéttarfélag",
      gender: "hk",
      translationUkr: "профспілка",
      ipa: "[ˈstjeihtarˌfjɛːlaɣ]",
      exampleIsl: "Stéttarfélagið hjálpar starfsmönnum og verndar réttindi þeirra.",
      exampleUkr: "Профспілка допомагає працівникам і захищає їхні права.",
      binUrl: "https://bin.arnastofnun.is/beyging/st%C3%A9ttarf%C3%A9lag"
    },
    {
      id: "thjodhathidardagur",
      word: "þjóðhátíðardagur",
      gender: "kk",
      translationUkr: "національне свято (День проголошення Республіки)",
      ipa: "[ˈθjouːðˌhauːtʰiːðarˌtaːɣʏr]",
      exampleIsl: "Þjóðhátíðardagur Íslands er haldinn hátíðlegur sautjánda júní.",
      exampleUkr: "Національне свято Ісландії відзначається сімнадцятого червня.",
      binUrl: "https://bin.arnastofnun.is/beyging/%C3%BEj%C3%B3%C3%B0h%C3%A1t%C3%AD%C3%B0ardagur"
    },
    {
      id: "thorrablot",
      word: "Þorrablót",
      gender: "hk",
      translationUkr: "Торраблот (традиційне зимове свято середини зими)",
      ipa: "[ˈθɔrːaˌplouːt]",
      exampleIsl: "Á Þorrablóti borðum við hefðbundinn mat eins og hákarl og svið.",
      exampleUkr: "На Торраблот ми їмо традиційну їжу, таку як акула та баранячі голови.",
      binUrl: "https://bin.arnastofnun.is/beyging/%C3%9Eorrabl%C3%B3t"
    },
    {
      id: "rettindi",
      word: "réttindi",
      gender: "hk.ft",
      translationUkr: "права (юридичні, громадянські, трудові)",
      ipa: "[ˈrjɛhtɪntɪ]",
      exampleIsl: "Allir á vinnumarkaði hafa réttindi samkvæmt kjarasamningi.",
      exampleUkr: "Усі на ринку праці мають права згідно з колективним трудовим договором.",
      binUrl: "https://bin.arnastofnun.is/beyging/r%C3%A9ttindi"
    },
    {
      id: "lokaprof",
      word: "lokapróf",
      gender: "hk",
      translationUkr: "випускний (фінальний) іспит",
      ipa: "[ˈlɔːkaˌpʰrouːf]",
      exampleIsl: "Lokaprófið á stigi A2 staðfestir getu til sjálfstæðra samskipta.",
      exampleUkr: "Випускний іспит рівня A2 підтверджує здатність до самостійної комунікації.",
      binUrl: "https://bin.arnastofnun.is/beyging/lokapr%C3%B3f"
    }
  ],

  // 2. CORE GRAMMAR & INSTITUTIONAL RULES
  grammarRules: [
    {
      id: "skattur_framtal",
      titleUkr: "1. Податкова декларація Skattframtal та електронний кабінет Skatturinn",
      icon: "🏛️",
      contentUkr: "Щороку в березні кожен мешканець Ісландії подає річну декларацію (skattframtal) через сайт skatturinn.is за допомогою Auðkenni. Податкова служба автоматично заповнює доходи від роботодавців, але платник зобов'язаний перевірити використання особистої податкової знижки (persónuafsláttur), відрахування за житло (vaxtabætur) та допомогу на дітей (barnabætur). Якщо сплачено більше податку, різницю держава повертає прямо на банківський рахунок наприкінці травня."
    },
    {
      id: "immigration_rights",
      titleUkr: "2. Імміграційні статуси Útlendingastofnun та трудові права",
      icon: "🛡️",
      contentUkr: "Перебування іноземців регулюється Імміграційною службою (Útlendingastofnun). Дозвіл на проживання (dvalarleyfi) буває тимчасовим (tímabundið) та постійним (ótímabundið / búsetuleyfi). Членство в профспілці (stéttarfélag) гарантує захист від незаконного звільнення, доступ до лікарняного фонду (sjúkrasjóður) та гранти на вивчення ісландської мови (starfsmenntastyrkur)."
    },
    {
      id: "culture_festivals",
      titleUkr: "3. Національні свята, традиції та суспільний етикет",
      icon: "🇮🇸",
      contentUkr: "Головні свята Ісландії: 17. júní (Þjóðhátíðardagur — День незалежності), Þorrablót (січень-лютий, традиційні страви þorramatur), Sjómannadagurinn (День моряка у червні), Verslunarmannahelgi (перші вихідні серпня). Етикет вимагає рівності: до прем'єр-міністра чи керівника звертаються на «ти» на ім'я (ég heiti...), без прізвищ чи титулів у повсякденному мовленні."
    }
  ],

  // 3. DIALOGUE: SKATTURINN (CONSULTATION ABOUT TAX RETURN)
  dialogue: [
    {
      id: "l1",
      speaker: "Starfsmaður Skattsins",
      speakerUkr: "Працівник податкової",
      textIsl: "Góðan daginn. Hvernig get ég aðstoðað þig hjá Skattinum í dag?",
      textUkr: "Доброго дня. Чим можу допомогти вам у податковій сьогодні?",
      audioUrl: "audio/dialogue/a2_k8_l1.mp3",
      avatar: "👨‍💼"
    },
    {
      id: "l2",
      speaker: "Umsækjandi",
      speakerUkr: "Заявник",
      textIsl: "Góðan dag. Ég þarf aðstoð við að skila inn skattframtali á netinu.",
      textUkr: "Доброго дня. Мені потрібна допомога з поданням податкової декларації онлайн.",
      audioUrl: "audio/dialogue/a2_k8_l2.mp3",
      avatar: "👩‍💻"
    },
    {
      id: "l3",
      speaker: "Starfsmaður Skattsins",
      speakerUkr: "Працівник податкової",
      textIsl: "Ekkert mál. Þú skráir þig inn á skatturinn.is með rafrænum skilríkjum.",
      textUkr: "Без проблем. Ви входите на skatturinn.is за допомогою електронних посвідчень.",
      audioUrl: "audio/dialogue/a2_k8_l3.mp3",
      avatar: "👨‍💼"
    },
    {
      id: "l4",
      speaker: "Umsækjandi",
      speakerUkr: "Заявник",
      textIsl: "Já, ég er með Auðkenni í símanum. Hvar sé ég persónuafsláttinn minn?",
      textUkr: "Так, у мене є Auðkenni в телефоні. Де я можу побачити свою податкову знижку?",
      audioUrl: "audio/dialogue/a2_k8_l4.mp3",
      avatar: "👩‍💻"
    },
    {
      id: "l5",
      speaker: "Starfsmaður Skattsins",
      speakerUkr: "Працівник податкової",
      textIsl: "Hann kemur fram sjálfkrafa undir liðnum launagreiðslur og frádrættir.",
      textUkr: "Вона автоматично відображається у пункті «виплати зарплати та відрахування».",
      audioUrl: "audio/dialogue/a2_k8_l5.mp3",
      avatar: "👨‍💼"
    },
    {
      id: "l6",
      speaker: "Umsækjandi",
      speakerUkr: "Заявник",
      textIsl: "Gott að vita. En ef ég á ónýttan persónuafslátt frá fyrri mánuðum?",
      textUkr: "Добре знати. А якщо в мене є невикористана знижка за попередні місяці?",
      audioUrl: "audio/dialogue/a2_k8_l6.mp3",
      avatar: "👩‍💻"
    },
    {
      id: "l7",
      speaker: "Starfsmaður Skattsins",
      speakerUkr: "Працівник податкової",
      textIsl: "Kerfið reiknar það sjálfkrafa og millifærir ofgreiddan skatt á bankareikninginn þinn.",
      textUkr: "Система порахує це автоматично і перекаже надміру сплачений податок на ваш банківський рахунок.",
      audioUrl: "audio/dialogue/a2_k8_l7.mp3",
      avatar: "👨‍💼"
    },
    {
      id: "l8",
      speaker: "Umsækjandi",
      speakerUkr: "Заявник",
      textIsl: "Frábært! Kærar þakkir fyrir skýrar upplýsingar og góða hjálp.",
      textUkr: "Чудово! Щиро дякую за чітку інформацію та хорошу допомогу.",
      audioUrl: "audio/dialogue/a2_k8_l8.mp3",
      avatar: "👩‍💻"
    }
  ]
};
