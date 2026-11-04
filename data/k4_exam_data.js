/**
 * k4_exam_data.js - Official 15-Question Final Certification Exam Dataset for Lesson 4
 * Kafli 4: Föt, litir og lýsingarorð (Clothing, Colors, and Adjective Agreement)
 * 
 * Based on:
 * - Íslenska fyrir alla 1 (Kafli 5)
 * - Tölum saman 2022 (Vinnufatnaður & Lagaskipting)
 * - Litli málfræðingurinn & Árnastofnun BÍN
 */

export const K4_EXAM_DATA = {
  version: "1.0-ACADEMIC",
  titleUkr: "Сертифікаційний іспит: Одяг, кольори та сильна відміна прикметників",
  titleIsl: "Lokapróf K4: Föt, litir og lýsingarorð",
  chapterId: "kafli_4",
  totalQuestions: 15,
  passingScore: 12, // 80%
  xpReward: 150,
  gemsReward: 10,

  blocks: [
    { id: "gender_agreement", nameUkr: "1. Родове узгодження прикметників", questionsCount: 4 },
    { id: "umlaut_phonetics", nameUkr: "2. U-умлаут та фонетичні пастки (-tt, preaspiration)", questionsCount: 4 },
    { id: "verb_governance", nameUkr: "3. Керування дієслів одягу (fara í 🟢 / úr 🟡 / vera í 🟡)", questionsCount: 4 },
    { id: "real_life_store", nameUkr: "4. Крамниця, розміри та ісландська погода (Lagaskipting)", questionsCount: 3 }
  ],

  questions: [
    // BLOCK 1: GENDER AGREEMENT
    {
      id: "q1",
      block: "gender_agreement",
      questionUkr: "Яку форму прикметника 'rauður' слід вжити з іменником жіночого роду 'peysa' (светр) у називному відмінку (Nf.)?",
      promptIsl: "Hér er ___ peysa.",
      options: [
        { text: "rauður (чол. рід)", isCorrect: false },
        { text: "rauð (жін. рід)", isCorrect: true },
        { text: "rautt (сер. рід)", isCorrect: false },
        { text: "rauða (слабка форма)", isCorrect: false }
      ],
      explanation: "У сильній відміні прикметників жіночий рід однини має нульове закінчення: rauður (kk.) -> rauð (kvk.) -> rautt (hk.). Тому: 'Hér er rauð peysa'."
    },
    {
      id: "q2",
      block: "gender_agreement",
      questionUkr: "Якого граматичного роду слово 'kjóll' (сукня) в ісландській мові, і яке узгодження є правильним?",
      promptIsl: "Þetta er mjög falleg___ kjóll.",
      options: [
        { text: "Жіночого роду: falleg kjóll", isCorrect: false },
        { text: "Чоловічого роду: fallegur kjóll", isCorrect: true },
        { text: "Середнього роду: fallegt kjóll", isCorrect: false },
        { text: "Лише у множині: fallegar kjólar", isCorrect: false }
      ],
      explanation: "Ісландське слово 'kjóll' закінчується на -ur/-ll і належить до чоловічого роду (karlkyn)! Тому прикметник набуває закінчення чол. роду: 'fallegur kjóll'."
    },
    {
      id: "q3",
      block: "gender_agreement",
      questionUkr: "Оберіть правильну форму прикметника для середнього роду 'pils' (спідниця):",
      promptIsl: "Hún saumar ný___ pils.",
      options: [
        { text: "stutt (stuttur -> stutt)", isCorrect: true },
        { text: "stuttur", isCorrect: false },
        { text: "stutta", isCorrect: false },
        { text: "stuttri", isCorrect: false }
      ],
      explanation: "'Pils' — іменник середнього роду (hk.). Прикметник 'stuttur' (короткий) у середньому роді має суфікс -t: stuttur -> stutt (оскільки основа вже закінчується на -t, друге -t зливається)."
    },
    {
      id: "q4",
      block: "gender_agreement",
      questionUkr: "Як правильно сказати 'зелені черевики' (skór — чоловічий рід, множина)?",
      promptIsl: "Ég á græn___ skó.",
      options: [
        { text: "grænir (називний відмінок)", isCorrect: false },
        { text: "græna (знахідний відмінок plural kk.)", isCorrect: true },
        { text: "grænt", isCorrect: false },
        { text: "grænum", isCorrect: false }
      ],
      explanation: "Дієслово 'að eiga' (мати) вимагає знахідного відмінка (ÞF 🟢). У множині чол. роду закінчення знахідного відмінка -a: grænir skór (NF) -> ég á græna skó (ÞF)."
    },

    // BLOCK 2: UMLAUT & PHONETICS
    {
      id: "q5",
      block: "umlaut_phonetics",
      questionUkr: "За правилом U-умлауту, як змінюється корінь прикметника 'svartur' (чорний) у жіночому роді однини?",
      promptIsl: "Hún á ___ úlpu (úlpa er kvk.).",
      options: [
        { text: "svart", isCorrect: false },
        { text: "svört (a -> ö)", isCorrect: true },
        { text: "svartur", isCorrect: false },
        { text: "svarti", isCorrect: false }
      ],
      explanation: "Історичний U-умлаут перетворює кореневу голосну 'a' на 'ö' у жіночому роді однини: svartur (kk.) -> svört (kvk.)! Порівняйте: fagur -> fögur, gamall -> gömul."
    },
    {
      id: "q6",
      block: "umlaut_phonetics",
      questionUkr: "Як вимовляється форма середнього роду 'hvítt' (біле)?",
      promptIsl: "Þetta er hvítt lak.",
      options: [
        { text: "[kvi:ʰt] з чіткою глухою преаспірацією перед подвійним 'tt'", isCorrect: true },
        { text: "[hvi:t] як в англійській мові", isCorrect: false },
        { text: "[vi:t] без звуку [k]", isCorrect: false },
        { text: "[kvi:t-t] з паузою між двома 't'", isCorrect: false }
      ],
      explanation: "Буквосполучення 'hv' дає глухий проривний звук [kv-], а подвоєне 'tt' викликає феномен преаспірації (глухий видих перед змичкою): [kvi:ʰt]."
    },
    {
      id: "q7",
      block: "umlaut_phonetics",
      questionUkr: "Прикметник 'blár' (синій) закінчується на довгий голосний. Яку форму він має в середньому роді?",
      promptIsl: "Húsið er ___.",
      options: [
        { text: "blát", isCorrect: false },
        { text: "blátt (з подвоєнням -tt)", isCorrect: true },
        { text: "blár", isCorrect: false },
        { text: "blá", isCorrect: false }
      ],
      explanation: "Якщо основа прикметника закінчується на наголошений довгий голосний (blár, grár, hár, nýr), у середньому роді суфікс подвоюється: blátt, grátt, hátt, nýtt."
    },
    {
      id: "q8",
      block: "umlaut_phonetics",
      questionUkr: "У якій формі прикметник 'lítill' зазнає фонетичного скорочення (синкопи)?",
      promptIsl: "Við erum í ___ húsi.",
      options: [
        { text: "lítilli", isCorrect: false },
        { text: "litlu (випадає í, залишається коротке i)", isCorrect: true },
        { text: "lítilu", isCorrect: false },
        { text: "lítilum", isCorrect: false }
      ],
      explanation: "Прикметник 'lítill' є нерегулярним: перед закінченнями на голосний довге 'í' скорочується на коротке 'i', а суфіксальне -il- випадає: litlum, litlu, litla."
    },

    // BLOCK 3: VERB GOVERNANCE
    {
      id: "q9",
      block: "verb_governance",
      questionUkr: "Якого відмінка вимагає фразове дієслово 'að fara í' (вдягати щось на себе)?",
      promptIsl: "Ég fer í + ___ (stjórnar hvaða falli?)",
      options: [
        { text: "Nafnháttur (інфінітив)", isCorrect: false },
        { text: "Þolfall (Знахідний відмінок 🟢)", isCorrect: true },
        { text: "Þágufall (Давальний відмінок 🟡)", isCorrect: false },
        { text: "Eignarfall (Родовий відмінок 🔴)", isCorrect: false }
      ],
      explanation: "Рух у напрямку 'вдягання на тіло' позначається прийменником 'í' зі ЗНАХІДНИМ відмінком (ÞF 🟢): 'Ég fer í úlpuna' (úlpa -> úlpu)."
    },
    {
      id: "q10",
      block: "verb_governance",
      questionUkr: "Якого відмінка вимагає фразове дієслово 'að fara úr' (знімати з себе одяг / роздягатися)?",
      promptIsl: "Við förum úr + ___",
      options: [
        { text: "Þágufall (Давальний відмінок 🟡)", isCorrect: true },
        { text: "Þolfall (Знахідний відмінок 🟢)", isCorrect: false },
        { text: "Nefnifall (Називний відмінок 🔵)", isCorrect: false },
        { text: "Eignarfall (Родовий відмінок 🔴)", isCorrect: false }
      ],
      explanation: "Прийменник 'úr' (з, із) ЗАВЖДИ вимагає ДАВАЛЬНОГО відмінка (ÞGF 🟡)! Тому: 'Við förum úr skónum' (skór -> skónum)."
    },
    {
      id: "q11",
      block: "verb_governance",
      questionUkr: "Як правильно сказати 'Він одягнений у сині штани' (стан буття в одязі)?",
      promptIsl: "Hann er í ___ (buxur - kvk. ft.).",
      options: [
        { text: "bláar buxur (ÞF)", isCorrect: false },
        { text: "bláum buxum (ÞGF 🟡)", isCorrect: true },
        { text: "blár buxa", isCorrect: false },
        { text: "blá buxur", isCorrect: false }
      ],
      explanation: "Стан перебування в одязі 'vera í' вимагає давального відмінка (ÞGF 🟡). Множина давального відмінка для всіх родів закінчується на -um: bláum buxum."
    },
    {
      id: "q12",
      block: "verb_governance",
      questionUkr: "Як правильно спитати в магазині 'Чи можу я поміряти цю куртку?'",
      promptIsl: "Má ég ___ þennan jakka?",
      options: [
        { text: "fara úr", isCorrect: false },
        { text: "máta (+ ÞF 🟢)", isCorrect: true },
        { text: "vera í", isCorrect: false },
        { text: "kaupa til", isCorrect: false }
      ],
      explanation: "Дієслово 'að máta' означає 'приміряти' і керує знахідним відмінком (ÞF 🟢): 'Má ég máta þennan jakka?'"
    },

    // BLOCK 4: STORE & ARCTIC LAYERING
    {
      id: "q13",
      block: "real_life_store",
      questionUkr: "Як звучить стандартне ісландське запитання продавця про ваш розмір одягу?",
      promptIsl: "Spurning um fatastærð:",
      options: [
        { text: "Hvað er stærðin þín?", isCorrect: false },
        { text: "Hvaða stærð ert þú í?", isCorrect: true },
        { text: "Hversu stór ert þú?", isCorrect: false },
        { text: "Hvar eru fötin þín?", isCorrect: false }
      ],
      explanation: "В ісландській мові запитання про розмір формулюється ідіоматично через дієслово 'að vera í': 'Hvaða stærð ert þú í?' (У якому ти розмірі?). Відповідь: 'Ég er í stærð Medium'."
    },
    {
      id: "q14",
      block: "real_life_store",
      questionUkr: "Як ісландською називається примірочна кабінка у магазині одягу?",
      promptIsl: "Hvar er ___?",
      options: [
        { text: "biðsalurinn", isCorrect: false },
        { text: "mátunarklefinn", isCorrect: true },
        { text: "kaffistofan", isCorrect: false },
        { text: "bókasafnið", isCorrect: false }
      ],
      explanation: "Від дієслова 'máta' (приміряти) утворюється іменник 'mátunarklefi' (примірочна кабіна)."
    },
    {
      id: "q15",
      block: "real_life_store",
      questionUkr: "Чому ісландське правило 'lagaskipting' (шаруватість) забороняє бавовну (bómull) першим шаром у мороз?",
      promptIsl: "Af hverju er ull betri en bómull?",
      options: [
        { text: "Бавовна надто важка для прання", isCorrect: false },
        { text: "Бавовна вбирає вологу й холодить тіло, а вовна гріє навіть у вологому стані", isCorrect: true },
        { text: "Бавовна заборонена законом Ісландії", isCorrect: false },
        { text: "Вовна коштує дешевше", isCorrect: false }
      ],
      explanation: "Золоте правило безпеки в Ісландії: 'Bómull drepur' (бавовна вбиває від переохолодження, якщо промокнути). Вовняна термобілизна (ullarnærföt) зберігає тепло навіть при 30% вологості."
    }
  ]
};
