/**
 * a2_k3_transport_data.js - Academic Dataset for Level A2 • Lesson 3 (Kafli 3: Samgöngur og ferðalög)
 * 
 * Synchronized with:
 * - Íslenska fyrir alla 2 (Kafli 8: Á ferðinni & Kafli 4: Hvar, hvert, hvernig?)
 * - Strætó bs. & Klapp greiðslukerfi (Klappkort, Klapp-appið, fargjöld, stoppistöðvar)
 * - Isavia & Keflavíkurflugvöllur (Flugstöð Leifs Eiríkssonar, Flugrútan, innritun)
 * - SafeTravel.is & Vegagerðin (Færð á vegum, vetrarakstur, Hringvegur 1)
 * - Árnastofnun BÍN & Litli málfræðingurinn (Hreyfiprófessar: Í/Á + ÞF vs ÞGF, Til + EF)
 */

export const A2_K3_TRANSPORT_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Рівень A2 • Урок 3: Громадський транспорт Strætó, додаток Klapp, подорожі та дієслова руху",
  titleIsl: "Stig A2 • Kafli 3: Samgöngur, Klapp, ferðalög og hreyfisagnir",
  level: "A2.1 (ÍFA 2 Kafli 8 & 4)",
  book: "Íslenska fyrir alla 2",

  // 1. GRAMMAR: MOTION PREPOSITIONS & CASES (HREYFING VS KYRRSTAÐA)
  motionGrammar: {
    ruleTitle: "Граматика простору: Куди? (Hvert? 🟢 ÞF) vs Де? (Hvar? 🟡 ÞGF) та Genitive (Hvert? 🟣 EF)",
    description: "В ісландській мові вибір відмінка після прийменників í (в) та á (на) залежить від динаміки: рух у напрямку мети вимагає знахідного відмінка (Þolfall 🟢), а перебування на місці — давального відмінка (Þágufall 🟡). Прийменник til (до) завжди керує родовим відмінком (Eignarfall 🟣).",
    contrastTable: [
      {
        context: "Автобус / Зупинка",
        motionIs: "Ég fer í strætó / á stoppistöðina",
        motionCase: "ÞF 🟢 (Знахідний)",
        motionUkr: "Я сідаю в автобус / іду на зупинку",
        staticIs: "Ég er í strætó / á stoppistöðinni",
        staticCase: "ÞGF 🟡 (Давальний)",
        staticUkr: "Я їду в автобусі / стою на зупинці"
      },
      {
        context: "Аеропорт Кеflavík",
        motionIs: "Ég fer á flugvöllinn",
        motionCase: "ÞF 🟢 (Знахідний)",
        motionUkr: "Я їду в аеропорт (рух)",
        staticIs: "Ég er á flugvellinum",
        staticCase: "ÞGF 🟡 (Давальний)",
        staticUkr: "Я перебуваю в аеропорту (локація)"
      },
      {
        context: "Місто / Центр (Bærinn)",
        motionIs: "Við förum í bæinn",
        motionCase: "ÞF 🟢 (Знахідний)",
        motionUkr: "Ми їдемо в центр міста (101)",
        staticIs: "Við erum í bænum",
        staticCase: "ÞGF 🟡 (Давальний)",
        staticUkr: "Ми гуляємо в центрі міста"
      },
      {
        context: "Міста та Країни (Til + EF 🟣)",
        motionIs: "Flugrútan fer til Keflavíkur / til Akureyrar",
        motionCase: "EF 🟣 (Родовий)",
        motionUkr: "Автобус їде до Кеflavíк / до Акурейрі",
        staticIs: "Ég bý í Keflavík / á Akureyri",
        staticCase: "ÞGF 🟡 (Давальний)",
        staticUkr: "Я живу в Кеflavíк / в Акурейрі"
      }
    ],
    dativeVerbs: [
      {
        verb: "að aka (ek, ók, ókum)",
        governs: "+ ÞGF 🟡 (Давальний)",
        ukr: "керувати транспортом / їхати на авто",
        sampleIs: "Hann ekur nýjum bíl á hverjum degi.",
        sampleUkr: "Він щодня їздить на новому авто (bíl - ÞGF)."
      },
      {
        verb: "að hjóla",
        governs: "+ ÞGF 🟡 (Давальний) або без додатка",
        ukr: "їхати велосипедом",
        sampleIs: "Hún hjólar í vinnuna á morgnana.",
        sampleUkr: "Вона їздить на велосипеді на роботу вранці."
      },
      {
        verb: "að taka (tek, tók, tókum)",
        governs: "+ ÞF 🟢 (Знахідний)",
        ukr: "брати (автобус, таксі)",
        sampleIs: "Ég tek strætó númer 1 klukkan átta.",
        sampleUkr: "Я сідаю на автобус номер 1 о 8:00."
      },
      {
        verb: "að fara með",
        governs: "+ ÞGF 🟡 (Давальний)",
        ukr: "їхати чим-небудь (транспортом)",
        sampleIs: "Við förum alltaf með flugrútunni.",
        sampleUkr: "Ми завжди їдемо шатлом Flugrútan (ÞGF)."
      }
    ]
  },

  // 2. STRÆTÓ & KLAPP APP STANDARD
  straetoSystem: {
    title: "Міський транспорт Рейк'явіка: Strætó & Klapp",
    description: "У столичному регіоні (Höfuðborgarsvæðið) паперові квитки скасовані. Оплата здійснюється виключно через мобільний застосунок Klapp або безконтактну картку Klappkort.",
    fareCategories: [
      {
        nameIsl: "Stakt fargjald",
        nameUkr: "Одноразовий квиток",
        price: "630 kr.",
        duration: "Діє 75 хвилин (включає необмежені пересадки)",
        tip: "Після покупки квиток потрібно активувати (Virkja) перед посадкою та відсканувати QR-код у валідаторі біля водія."
      },
      {
        nameIsl: "Tímabilskort (Mánaðarkort)",
        nameUkr: "Місячний абонемент",
        price: "10.450 kr. / mán.",
        duration: "30 днів безлімітних поїздок",
        tip: "Працівники часто отримують Samgöngustyrkur (транспортну компенсацію) від роботодавця за відмову від авто."
      },
      {
        nameIsl: "Klapp tíukort (10 ferðir)",
        nameUkr: "Пакет на 10 поїздок",
        price: "5.850 kr.",
        duration: "Знижка 10% у порівнянні з разовими квитками",
        tip: "Зручно для тих, хто поєднує роботу з дому та офіс."
      }
    ],
    vocabulary: [
      { isl: "Stoppistöð", gen: "kvk", ipa: "[ˈstɔhpɪˌstœːð]", ukr: "зупинка автобуса" },
      { isl: "Næsta stoppistöð", gen: "kvk", ipa: "[ˈnaista ˈstɔhpɪˌstœːð]", ukr: "наступна зупинка (оголошення в салоні)" },
      { isl: "Vagn", gen: "kk", ipa: "[vakn]", ukr: "автобус / вагон (Vagn 1, Vagn 3, Vagn 6)" },
      { isl: "Að klappa", gen: "sögn", ipa: "[aːð ˈkʰlahpa]", ukr: "прикласти картку або телефон до сканера Klapp" },
      { isl: "Skiptistöð", gen: "kvk", ipa: "[ˈscɪftɪˌstœːð]", ukr: "вузлова станція пересадки (Hlemmur, BSÍ, Hamraborg, Fjörður)" },
      { isl: "Áætlun", gen: "kvk", ipa: "[ˈauːɛhtlʏn]", ukr: "розклад руху (Samkvæmt áætlun — за розкладом)" },
      { isl: "Töf", gen: "kvk", ipa: "[tʰœːv]", ukr: "затримка / запізнення автобуса" },
      { isl: "Að ýta á hnappinn", gen: "frasi", ipa: "[aːð ˈiːta au ˈnahhpɪn]", ukr: "натиснути кнопку зупинки 'STOP' перед виходом" }
    ]
  },

  // 3. KEFLAVÍKURFLUGVÖLLUR & LONG-DISTANCE TRAVEL
  longDistanceTravel: [
    {
      id: "flybus",
      nameIsl: "Flugrútan (Flybus)",
      route: "BSÍ Umferðarmiðstöð ⇄ Keflavíkurflugvöllur (KEF)",
      frequency: "Кожні 30-40 хв, підлаштовано під розклад авіарейсів",
      travelTime: "45 хвилин",
      price: "3.999 kr.",
      ukr: "Експрес-шатл з автовокзалу BSÍ до головного аеропорту країни."
    },
    {
      id: "straeto55",
      nameIsl: "Strætó Leið 55",
      route: "Fjörður (Hafnarfjörður) ⇄ Reykjanesbær ⇄ KEF Flugvöllur",
      frequency: "Кожні 60-120 хв",
      travelTime: "70 хвилин",
      price: "2.520 kr. (4 svæði)",
      ukr: "Міжміський муніципальний автобус. Дешевший за Flybus, але робить усі зупинки."
    },
    {
      id: "innanlandsflug",
      nameIsl: "Innanlandsflug (Reykjavíkurflugvöllur RKV)",
      route: "Reykjavík ⇄ Akureyri, Egilsstaðir, Ísafjörður",
      frequency: "Щоденно",
      travelTime: "45–60 хв",
      price: "12.000–25.000 kr.",
      ukr: "Внутрішні рейси авіакомпанії Icelandair з міського аеропорту Рейк'явіка."
    }
  ],

  // 4. SAFETRAVEL & ROAD CONDITIONS
  roadSafety: {
    source: "SafeTravel.is & Vegagerðin (Umferðin)",
    rules: [
      "Hringvegur 1: Головна кільцева дорога Ісландії довжиною 1322 км. Максимальна швидкість — 90 км/год.",
      "Ljósaskylda: Фари ближнього світла повинні бути увімкнені 24/7 у будь-яку пору року.",
      "Hálka (Ожеледиця): Чорний лід на мостах та перевалах (Heiði). Обов'язкова перевірка vedur.is перед виїздом.",
      "Lokaður vegur: Якщо на табло написано LOKAÐ / CLOSED — проїзд суворо заборонено (штраф від 250.000 kr.).",
      "Vetrardekk: Зимова гума (nagladekk або heilsársdekk) є юридичною вимогою в зимовий сезон."
    ],
    terms: [
      { isl: "Greiðfært", status: "ok", ukr: "дорога чиста, покриття сухе або вологе" },
      { isl: "Hálkublettir", status: "warn", ukr: "окремі ділянки ожеледиці, потрібна увага" },
      { isl: "Hálka", status: "danger", ukr: "суцільна ожеледиця на всій трасі" },
      { isl: "Snjóþekja", status: "warn", ukr: "утрамбований сніговий покрив" },
      { isl: "Ófært / Lokað", status: "closed", ukr: "траса непроїзна / офіційно закрита рятувальниками" }
    ]
  },

  // 5. AUTHENTIC DIALOGUES (Í STRÆTÓ OG Á BSÍ)
  dialogues: [
    {
      id: "straeto_trip",
      title: "Діалог 1: Поїздка в автобусі Strætó (Klappa inn í vagninn)",
      location: "Hlemmur stoppistöð",
      lines: [
        { speaker: "Ólafur (farþegi)", isl: "Fyrirgefðu, fer þessi vagn upp í Mjódd?", ukr: "Перепрошую, цей автобус іде в Мйодд?" },
        { speaker: "Bílstjóri", isl: "Já, vagn númer 3 fer beint í Mjódd. Gjörðu svo vel að klappa inn.", ukr: "Так, номер 3 іде прямо в Мйодд. Будь ласка, прикладіть квиток до сканера." },
        { speaker: "Ólafur", isl: "Ókei, ég er með Klapp-appið í símanum... Svona! Pípti það?", ukr: "Добре, у мене додаток Klapp у телефоні... Ось так! Спрацював звуковий сигнал?" },
        { speaker: "Bílstjóri", isl: "Já, græna ljósið kom upp. Allt í lagi, velkomin um borð!", ukr: "Так, засвітився зелений індикатор. Усе гаразд, ласкаво просимо на борт!" },
        { speaker: "Ólafur", isl: "Takk kærlega. Geturðu látið mig vita þegar við komum að Kringlunni?", ukr: "Дуже дякую. Чи можете підказати мені, коли ми під'їдемо до Крінглана?" },
        { speaker: "Bílstjóri", isl: "Það kemur sjálfvirkt á skjáinn og í hátalarann: Næsta stoppistöð: Kringlan.", ukr: "Це з'явиться автоматично на моніторі та в динаміках: Наступна зупинка: Крінглан." }
      ]
    },
    {
      id: "flybus_airport",
      title: "Діалог 2: На автовокзалі BSÍ — посадка на Flugrútan до аеропорту",
      location: "BSÍ Umferðarmiðstöð",
      lines: [
        { speaker: "Marta", isl: "Góðan daginn! Hvenær fer næsta Flugrúta út á Keflavíkurflugvöll?", ukr: "Доброго дня! Коли відправляється наступний шатл Flybus в аеропорт Кеflavík?" },
        { speaker: "Starfsmaður BSÍ", isl: "Næsti bíll fer eftir korter, klukkan tvö. Átt þú miða?", ukr: "Наступний автобус іде через чверть години, о 14:00. Ви маєте квиток?" },
        { speaker: "Marta", isl: "Nei, ég þarf að kaupa miða fyrir einn fullorðinn og tvær töskur.", ukr: "Ні, мені потрібно купити квиток для одного дорослого та дві валізи." },
        { speaker: "Starfsmaður BSÍ", isl: "Tveir farangurshlutir eru innifaldir í verðinu. Það gerir 3.999 krónur.", ukr: "Два місця багажу включено у вартість. З вас 3 999 крон." },
        { speaker: "Marta", isl: "Hérna er kortið. Hvað tekur ferðin langan tíma?", ukr: "Ось карта. Скільки часу триває поїздка?" },
        { speaker: "Starfsmaður BSÍ", isl: "Um það bil 45 mínútur ef færðin á Reykjanesbraut er góð.", ukr: "Приблизно 45 хвилин, якщо стан траси Рейк'янесбраут добрий." }
      ]
    }
  ]
};
