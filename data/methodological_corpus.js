/**
 * methodological_corpus.js - Master Academic Knowledge Vault & Pedagogical Corpus
 * 
 * Central benchmark uniting the 6 core pillars of Icelandic Language Acquisition:
 * 1. Tungumálatorg (Íslenska fyrir alla 1-4) - Immigrant realia & communicative syllabus
 * 2. Háskóli Íslands (Icelandic Online IOL 1-5) - SLA Scaffolding & Form-Focused Syntax
 * 3. Árnastofnun & BÍN - Authoritative inflection matrix (NF 🔵, ÞF 🟢, ÞGF 🟡, EF 🔴)
 * 4. Bara tala (Máltækni) - Acoustic minimal pairs, phonetic traps, oral-first fluency
 * 5. Ylhýra - Positional phonetic laws, elision, middle voice (-st), auxiliary constructs
 * 6. Drops - Visual-spatial mnemonics, fast micro-drills, zero-friction retention
 */

export const METHODOLOGICAL_CORPUS = {
  version: "1.0-ACADEMIC",
  lastAudit: "2026-11-04",
  authoritativeInstitutions: [
    "Stofnun Árna Magnússonar í íslenskum fræðum (Árnastofnun)",
    "Háskóli Íslands (University of Iceland)",
    "Menntamálastofnun (MMS) / Tungumálatorg",
    "Bara tala (Máltækniverkefni & Almannarómur)"
  ],

  // 1. CEFR Progression Ladder & Immersion Target (Tungumálastiginn)
  cefrProgression: [
    {
      level: "A0 (Módúll 0)",
      target: "Stafrófið & Framburður (Phonetic Foundations)",
      ukrainianShare: 70,
      icelandicShare: 30,
      coreFocus: "32 літери, 8 акустичних пасток, 10 законів довготи, фонологічний вибух [tl], преаспірація [hk], етикет Sæll/Sæl.",
      pedagogicalSource: "Árnastofnun + Bara tala Acoustics"
    },
    {
      level: "A1.1 (Kafli 1)",
      target: "Hver ert þú? (Identity, Origin & Basic Morphology)",
      ukrainianShare: 60,
      icelandicShare: 40,
      coreFocus: "Дієслово vera, 6 дієслів теперішнього часу, займенники (þeir/þær/þau), frá + ÞGF 🟡, í vs á (ландшафтне правило), V2 синтаксис.",
      pedagogicalSource: "Íslenska fyrir alla 1 (Kafli 1) + Icelandic Online 1"
    },
    {
      level: "A1.2 (Kafli 2)",
      target: "Á kaffihúsi (Commerce, Ordering & Accusative Case)",
      ukrainianShare: 50,
      icelandicShare: 50,
      coreFocus: "Конструкція 'Ég ætla að fá...', Знахідний відмінок (ÞF 🟢), числівники einn/eina/eitt, ціни в кронах (krónur), пекарня Brauð & Co.",
      pedagogicalSource: "Íslenska fyrir alla 1 (Kafli 2-3) + Ylhýra"
    },
    {
      level: "A1.3 (Kafli 3)",
      target: "Hversdagsleiki (Daily Routine, Time & Reflexive Verbs)",
      ukrainianShare: 40,
      icelandicShare: 60,
      coreFocus: "Зворотні дієслова на -st (Miðmynd: vakna, klæða sig), годинник (Hvað er klukkan?), дні тижня, прийменники часу.",
      pedagogicalSource: "Íslenska fyrir alla 1 (Kafli 4) + Icelandic Online 1"
    },
    {
      level: "A2.1 (Kafli 4)",
      target: "Búseta og Þjóðskrá (Housing, Tenancy & Registration)",
      ukrainianShare: 30,
      icelandicShare: 70,
      coreFocus: "Оренда житла, реєстрація кеннітали (Kennitala), комунальні послуги, банк, офіційні форми.",
      pedagogicalSource: "Íslenska fyrir alla 2 + Bara tala Workplace"
    },
    {
      level: "A2.2 (Kafli 5)",
      target: "Heilsugæsla og Líkaminn (Healthcare & Pharmacy)",
      ukrainianShare: 20,
      icelandicShare: 80,
      coreFocus: "Симптоми, візит до лікаря, аптека (Lyfja), частини тіла, давальний суб'єкта ('Mér líður illa').",
      pedagogicalSource: "Íslenska fyrir alla 2 + MMS Health Modules"
    },
    {
      level: "B1-B2",
      target: "Atvinnulíf og Samfélag (Career, Society & Media)",
      ukrainianShare: 0,
      icelandicShare: 100,
      coreFocus: "Співбесіди на роботу, резюме (ferilskrá), профспілки (Efling/VR), новини RÚV, кон'юнктив (Viðtengingarháttur).",
      pedagogicalSource: "Icelandic Online 3-5 + RÚV Auðskilið"
    }
  ],

  // 2. The 6 Non-Negotiable Pedagogical Tenets of our Platform
  tenets: {
    tenet1_bínColorCoding: {
      rule: "Кожне ісландське слово, що підлягає відмінюванню, маркується кольоровою аурою BÍN:",
      nominative: "🔵 Nefnifall (NF) - Базова форма суб'єкта",
      accusative: "🟢 Þolfall (ÞF) - Прямий об'єкт дії (замовлення в кав'ярні, покупка)",
      dative: "🟡 Þágufall (ÞGF) - Адресат, місцезнаходження після í/á/frá",
      genitive: "🔴 Eignarfall (EF) - Приналежність, частина від цілого (til + EF)"
    },
    tenet2_v2WordOrder: {
      rule: "Закон другого місця дієслова (V2 Word Order):",
      explanation: "У розповідному реченні відмінюване дієслово СУВОРО займає 2-гу позицію. Якщо обставина часу або місця виноситься на початок, підмет переміщується на 3-тю позицію (Інверсія)."
    },
    tenet3_toponymRule: {
      rule: "Ландшафтний закон прийменників í та á:",
      prepI: "í + ÞGF 🟡: материкові країни, міста у фіордах (-fjörður), затоках (-vík, -vogur), долинах (-dalur).",
      prepA: "á + ÞGF 🟡: острови (Ísland), міста на піщаних косах (-eyri), мисах (-nes), порогах (-foss)."
    },
    tenet4_uUmlaut: {
      rule: "Закон U-умляута (U-hljóðvarp):",
      explanation: "Коли в суфіксі або закінченні з'являється голосний 'u', кореневий голосний 'a' обов'язково перетворюється на 'ö': tala ➔ við tölum, saga ➔ sögur."
    },
    tenet5_cliticization: {
      rule: "Закон зрощення із займенником þú (Samruni):",
      explanation: "У розмовному мовленні дієслово зливається із займенником: Hvað heitir þú? ➔ Hvað heitirðu?, Hvaðan ert þú? ➔ Hvaðan ertu?"
    },
    tenet6_auditoryDiscrimination: {
      rule: "Акустичний диференціатор Bara tala:",
      explanation: "Студент не повинен бачити лише орфографію; він зобов'язаний розрізняти преаспірацію ([tʰahk] vs [ˈtʰaːka]), боковий вибух ([saitl] vs [sail]) та міжзубні звуки ([θ] vs [ð])."
    }
  }
};
