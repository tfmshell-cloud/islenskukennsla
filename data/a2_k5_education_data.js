/**
 * DATA: LESSON A2.5 (MENNTAKERFIÐ, LEIKSKÓLI, GRUNNSKÓLI & MENTOR)
 * Canonical Icelandic Education & Schooling Curriculum
 * References: ÍFA 2 Kafli 7, Tölum saman 2022, Mentor.is, Reykjavík Menntasvið
 */

export const A2_K5_EDUCATION_DATA = {
  id: "a2_k5",
  number: "A2.5",
  titleIsl: "Menntakerfið, leikskóli og grunnskóli",
  titleUkr: "Система освіти, дитячий садок та початкова школа",
  level: "A2.1 Освіта та сім'я",
  source: "Íslenska fyrir alla 2 • Kafli 7 • Tölum saman 2022 • Mentor.is",

  // 1. CORE EDUCATION & SCHOOL VOCABULARY
  vocabulary: [
    {
      word: "leikskóli",
      article: "leikskólinn",
      gender: "kk",
      ipa: "[ˈleikˌskouːlɪ]",
      translation: "дитячий садок (для дітей від 1 до 5-6 років)",
      sampleIsl: "Börn á Íslandi byrja oft í leikskóla eins eða tveggja ára gömul.",
      sampleUkr: "Діти в Ісландії часто йдуть у садок в один чи два роки.",
      category: "institutions"
    },
    {
      word: "grunnskóli",
      article: "grunnskólinn",
      gender: "kk",
      ipa: "[ˈkrʏnːˌskouːlɪ]",
      translation: "обов'язкова середня школа (1–10 класи, 6–16 років)",
      sampleIsl: "Grunnskóli er lögboðinn fyrir öll börn frá sex ára aldri.",
      sampleUkr: "Школа є обов'язковою за законом для всіх дітей з 6-річного віку.",
      category: "institutions"
    },
    {
      word: "aðlögun",
      article: "aðlögunin",
      gender: "kvk",
      ipa: "[ˈaðˌlœːkʏn]",
      translation: "адаптація дитини до садочка (зі щоденною присутністю батьків)",
      sampleIsl: "Aðlögunin tekur vanalega tvær vikur í leikskólanum.",
      sampleUkr: "Адаптація в садку зазвичай триває два тижні.",
      category: "routines"
    },
    {
      word: "útivera",
      article: "útiveran",
      gender: "kvk",
      ipa: "[ˈuːtɪˌvɛːra]",
      translation: "перебування / ігри на свіжому повітрі за будь-якої погоди",
      sampleIsl: "Útivera er mjög mikilvægur hluti af íslensku skólastarfi.",
      sampleUkr: "Прогулянки на вулиці є надзвичайно важливою частиною ісландського навчання.",
      category: "routines"
    },
    {
      word: "pollagalli",
      article: "pollagallinn",
      gender: "kk",
      ipa: "[ˈpʰɔhtlaˌkatlɪ]",
      translation: "непромокальний комбінезон від дощу та бруду (гумовий комбез)",
      sampleIsl: "Öll börn verða að eiga hlýjan pollagalla og stígvél.",
      sampleUkr: "Усі діти повинні мати теплий дощовий комбінезон та гумові чоботи.",
      category: "clothing"
    },
    {
      word: "frístundaheimili",
      article: "frístundaheimilið",
      gender: "hk",
      ipa: "[ˈfriːstʏntaˌheiːmɪlɪð]",
      translation: "група подовженого дня (післяурочний догляд для 1–4 класів)",
      sampleIsl: "Börnin fara á frístundaheimilið eftir að kennslu lýkur klukkan tvö.",
      sampleUkr: "Діти йдуть на продовжену групу після завершення уроків о 14:00.",
      category: "routines"
    },
    {
      word: "veikindatilkynning",
      article: "veikindatilkynningin",
      gender: "kvk",
      ipa: "[ˈveiːcɪntaˌtʰɪlˌcɪnːiŋk]",
      translation: "повідомлення про хворобу учня (вноситься батьками в Mentor)",
      sampleIsl: "Foreldrar verða að senda veikindatilkynningu fyrir klukkan átta.",
      sampleUkr: "Батьки зобов'язані надіслати сповіщення про хворобу дитини до 8:00.",
      category: "administration"
    },
    {
      word: "umsjónarkennari",
      article: "umsjónarkennarinn",
      gender: "kk",
      ipa: "[ˈʏmˌsjouːnarˌcɛnːarɪ]",
      translation: "класний керівник / головний вчитель групи",
      sampleIsl: "Umsjónarkennarinn boðar foreldra í foreldraviðtal tvisvar á ári.",
      sampleUkr: "Класний керівник запрошує батьків на індивідуальну бесіду двічі на рік.",
      category: "staff"
    }
  ],

  // 2. EDUCATION GRAMMAR MATRIX
  grammarRules: [
    {
      title: "1. Прийменники 'með' та 'hjá' з давальним відмінком (ÞGF 🟡)",
      explanation: "У контексті супроводу та перебування дітей вживаються прийменники, що керують давальним відмінком:\n• 'með + ÞGF' (з кимось): Ég fer með barnið (hk. barn ➔ barni + -ð) í leikskólann.\n• 'hjá + ÞGF' (у когось): Hann er hjá dagforeldri / hjá kennaranum.\n• 'í + ÞGF' (місцезнаходження): Hún er í skólanum / í leikskólanum."
    },
    {
      title: "2. Минулий час дієслів шкільного розпорядку (að fylgja, að sækja, að læra)",
      explanation: "Основні дієслова спілкування з навчальними закладами:\n• 'að fylgja' (супроводжувати) ➔ ég fylgdi, við fylgdum\n• 'að sækja' (забирати дитину) ➔ ég sótti, við sóttum (неправильне чергування æ ➔ ó!)\n• 'að læra' (вчитися) ➔ ég lærði, við lærðum\n• 'að tilkynna' (сповіщати) ➔ ég tilkynnti, við tilkynntum."
    },
    {
      title: "3. Конструкція 'að vera búinn að + inf' для завершених дій",
      explanation: "В ісландських закладах вихователі часто використовують розмовний перфект завершеності:\n• Hann er búinn að borða (Він уже поїв)\n• Hún er búin að sofa (Вона вже поспала)\n• Krakkarnir eru búnir að fara út (Діти вже сходили погуляти)."
    }
  ],

  // 3. DIALOGUE: LEIKSKÓLI PICKUP (CONVERSATION WITH EDUCATOR)
  dialogue: [
    {
      speaker: "Guðrún",
      speakerRole: "Foreldri (Мама дитини)",
      textIsl: "Komdu sæll, Gunnar! Ég er komin að sækja hann Emil. Hvernig gekk dagurinn hjá honum?",
      textUkr: "Добрий день, Гуннаре! Я прийшла забрати Еміля. Як пройшов його день?",
      audio: "audio/dialogue/a2_k5_l1.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Leikskólakennari (Вихователь садка)",
      textIsl: "Sæl Guðrún! Dagurinn gekk mjög vel. Hann borðaði allan matinn sinn og svaf í tvo tíma.",
      textUkr: "Вітаю, Гудрун! День пройшов дуже добре. Він з'їв усю свою їжу і спав дві години.",
      audio: "audio/dialogue/a2_k5_l2.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Foreldri",
      textIsl: "Frábært að heyra. Fóru krakkarnir út að leika í morgun þrátt fyrir rigninguna?",
      textUkr: "Чудово це чути. Діти виходили гуляти вранці, незважаючи на дощ?",
      audio: "audio/dialogue/a2_k5_l3.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Leikskólakennari",
      textIsl: "Já, við vorum úti í einn og hálfan tíma. Allir voru í hlýjum ullarfötum og pollagalla.",
      textUkr: "Так, ми були надворі півтори години. Всі були в теплій вовні та дощових комбінезонах.",
      audio: "audio/dialogue/a2_k5_l4.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Foreldri",
      textIsl: "Mundirðu eftir að skrá fjarvistina hans á morgun í Mentor? Við eigum tíma hjá tannlækni.",
      textUkr: "Ти пам'ятаєш сповіщення про його відсутність завтра в Mentor? У нас запис до зубного лікаря.",
      audio: "audio/dialogue/a2_k5_l5.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Leikskólakennari",
      textIsl: "Já, ég sá tilkynninguna í Mentor-appinu. Það er allt skráð samkvæmt reglunum.",
      textUkr: "Так, я бачив повідомлення в додатку Mentor. Усе зафіксовано за правилами.",
      audio: "audio/dialogue/a2_k5_l6.mp3"
    },
    {
      speaker: "Guðrún",
      speakerRole: "Foreldri",
      textIsl: "Þarf ég að koma með nýja vettlinga eða aukaföt fyrir föstudaginn?",
      textUkr: "Чи потрібно мені принести нові рукавиці або змінний одяг до п'ятниці?",
      audio: "audio/dialogue/a2_k5_l7.mp3"
    },
    {
      speaker: "Gunnar",
      speakerRole: "Leikskólakennari",
      textIsl: "Já, endilega komdu með auka ullarsokka og þurra vettlinga í hólfið hans.",
      textUkr: "Так, обов'язково покладіть запасні вовняні шкарпетки та сухі рукавиці в його шафку.",
      audio: "audio/dialogue/a2_k5_l8.mp3"
    }
  ],

  // 4. INTERACTIVE DRILL EXERCISES
  drills: [
    {
      id: "drill_1",
      title: "Шкільний розпорядок та дієслова минулого часу",
      instruction: "Оберіть правильну граматичну форму дієслова або прийменника:",
      questions: [
        {
          prompt: "Яка правильна форма минулого часу дієслова «að sækja» (забирати) для «ég»?",
          options: ["ég sótti", "ég sækti", "ég sækjaði", "ég sótt"],
          correct: 0,
          hint: "Дієслово «að sækja» має кореневе чергування æ ➔ ó: ég sótti."
        },
        {
          prompt: "Як сказати: «Я йду з дитиною в садок» з прийменником 'með + ÞGF'?",
          options: ["Ég fer með barnið í leikskólann.", "Ég fer með barninu í leikskólann.", "Ég fer með barn í leikskólann.", "Ég fer með barnann í leikskólann."],
          correct: 1,
          hint: "Іменник середнього роду 'barn' у давальному відмінку з артиклем: barni + nu = barninu (ÞGF 🟡)."
        },
        {
          prompt: "Який цифровий портал/додаток є основним стандартом комунікації шкіл і батьків в Ісландії?",
          options: ["Mentor.is", "Facebook Messenger", "TikTok", "Skatturinn"],
          correct: 0,
          hint: "Система Mentor (InfoMentor) використовується всіма ісландськими школами для обліку відвідування та оцінок."
        }
      ]
    }
  ]
};
