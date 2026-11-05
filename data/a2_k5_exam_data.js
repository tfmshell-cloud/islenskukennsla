/**
 * EXAM DATA: LESSON A2.5 (MENNTAKERFIÐ, LEIKSKÓLI, GRUNNSKÓLI & MENTOR)
 * 15 Questions covering Educational Systems, School Routines, Mentor & 4 Listening Tracks
 */

export const A2_K5_EXAM_DATA = {
  id: "a2_k5_exam",
  titleUkr: "Іспит A2.5: Освітня система, садочок та початкова школа",
  titleIsl: "Próf A2.5: Menntakerfið, leikskóli og grunnskóli",
  passingScore: 12,
  totalQuestions: 15,
  questions: [
    {
      id: "q1",
      type: "single",
      promptUkr: "З якого віку в Ісландії починається обов'язкова шкільна освіта (Grunnskóli)?",
      options: [
        "З 6 років",
        "З 7 років",
        "З 5 років",
        "З 4 років"
      ],
      correctIndex: 0,
      explanation: "Grunnskóli є обов'язковим за законом для всіх дітей з 6 років (1. bekkur) до 16 років (10. bekkur)."
    },
    {
      id: "q2",
      type: "single",
      promptUkr: "Що в ісландському дитячому садку означає термін «Aðlögun»?",
      options: [
        "Період адаптації дитини (1–2 тижні), коли батьки перебувають поруч у групі",
        "Щорічний екзамен з ісландської мови",
        "Обов'язкова вакцинація перед садком",
        "Перехід у старшу школу"
      ],
      correctIndex: 0,
      explanation: "Aðlögun — це плавний процес звикання дитини до вихователів та режиму садка, в якому один з батьків бере активну участь перші кілька днів."
    },
    {
      id: "q3",
      type: "single",
      promptUkr: "Яка форма минулого часу дієслова «að sækja» (забирати дитину зі школи) є правильною для «ég»?",
      options: [
        "ég sótti",
        "ég sækti",
        "ég sækjaði",
        "ég sóttu"
      ],
      correctIndex: 0,
      explanation: "Дієслово «að sækja» належить до групи з кореневим чергуванням æ ➔ ó: ég sótti, við sóttum."
    },
    {
      id: "q4",
      type: "single",
      promptUkr: "Що таке «Frístundaheimili» у системі початкової школи?",
      options: [
        "Група продовженого дня для учнів 1–4 класів після завершення основних уроків",
        "Літній табір у горах",
        "Шкільна бібліотека",
        "Канікули між семестрами"
      ],
      correctIndex: 0,
      explanation: "Frístundaheimili (frístund = дозвілля + heimili = дім) — це післяурочний догляд, де діти молодших класів граються, займаються творчістю та гуртками."
    },
    {
      id: "q5",
      type: "single",
      promptUkr: "Як правильно сказати: «Я йду з дитиною (barn — сер.р.) у садок» з прийменником 'með + ÞGF'?",
      options: [
        "Ég fer með barninu í leikskólann.",
        "Ég fer með barnið í leikskólann.",
        "Ég fer með barn í leikskólann.",
        "Ég fer með barnanna í leikskólann."
      ],
      correctIndex: 0,
      explanation: "Прийменник «með» вимагає давального відмінка (ÞGF 🟡): barn ➔ barni + -nu (суфіксальний артикль) = «barninu»."
    },
    {
      id: "q6",
      type: "single",
      promptUkr: "Який цифровий інструмент в Ісландії служить головним каналом сповіщень про відсутність дитини та зв'язку зі вчителями?",
      options: [
        "Mentor.is (InfoMentor / Karellen)",
        "Facebook Group",
        "WhatsApp",
        "Bónus App"
      ],
      correctIndex: 0,
      explanation: "Mentor.is є офіційним шкільним порталом для фіксації відвідування, повідомлень про хворобу (veikindatilkynning) та оцінок."
    },
    {
      id: "q7",
      type: "single",
      promptUkr: "Що таке «Pollagalli» у гардеробі ісландського дошкільняти?",
      options: [
        "Гумовий непромокальний дощовий комбінезон для прогулянок калюжами",
        "Святковий національний костюм",
        "Піжама для тихої години",
        "Змінне взуття для спортзалу"
      ],
      correctIndex: 0,
      explanation: "Pollagalli (polli = калюжа + galli = комбінезон) — незамінний елемент одягу для концепції «útivera» за будь-якої погоди."
    },
    {
      id: "q8",
      type: "single",
      promptUkr: "Як перекладається посада «Umsjónarkennari»?",
      options: [
        "Класний керівник / провідний куратор класу",
        "Директор школи",
        "Вчитель фізкультури",
        "Шкільний медбрат"
      ],
      correctIndex: 0,
      explanation: "Umsjónarkennari — це вчитель, закріплений за класом, який веде основні предмети, комунікує з батьками та проводить батьківські збори."
    },
    {
      id: "q9",
      type: "single",
      promptUkr: "Оберіть речення минулого часу з дієсловом «að fylgja» (супроводжувати/проводжати) та порядком слів V2:",
      options: [
        "Í morgun fylgdi ég syni mínum í skólann.",
        "Í morgun ég fylgdi syni mínum í skólann.",
        "Í morgun fylgjaði ég son minn í skólann.",
        "Ég í morgun fylgdi syni mínum í skólann."
      ],
      correctIndex: 0,
      explanation: "«Að fylgja» керує давальним відмінком (syni mínum), минулий час: «fylgdi». Інверсія V2 ставить дієслово на друге місце після «Í morgun»."
    },
    {
      id: "q10",
      type: "single",
      promptUkr: "Що в Ісландії означає поняття «Foreldraviðtal»?",
      options: [
        "Індивідуальна зустріч-консультація батьків із класним керівником щодо розвитку дитини",
        "Загальні батьківські збори всього міста",
        "Штрафна бесіда з поліцією",
        "Іспит для батьків першокласників"
      ],
      correctIndex: 0,
      explanation: "Foreldraviðtal (бесіда з батьками) проводиться 1-2 рази на рік індивідуально для кожної родини в конфіденційному форматі."
    },
    {
      id: "q11",
      type: "single",
      promptUkr: "Як сказати: «Він у школі» з прийменником знаходження 'í + ÞGF'?",
      options: [
        "Hann er í skólanum.",
        "Hann er í skólann.",
        "Hann er á skóla.",
        "Hann er við skóla."
      ],
      correctIndex: 0,
      explanation: "Стан спокою/перебування: «í + ÞGF» з артиклем: skóli ➔ skóla + -num = «í skólanum»."
    },
    {
      id: "q12",
      type: "single",
      audio: "audio/exam/hlustun_a2k5_q12.mp3",
      promptUkr: "🎧 Hlustunarpróf (Слухання): Прослухайте репліку вихователя: «Aðlögunin í leikskólanum tekur vanalega tvær vikur þar sem foreldri er með barninu fyrstu dagana.» Скільки триває адаптація?",
      options: [
        "Зазвичай 2 тижні, причому батьки перебувають поруч із дитиною в перші дні",
        "Лише 1 день",
        "Цілий місяць без присутності батьків",
        "3 дні суто на вихідних"
      ],
      correctIndex: 0,
      explanation: "У начитаному тексті чітко сказано: «tekur vanalega tvær vikur» (2 тижні) та «foreldri er með barninu fyrstu dagana»."
    },
    {
      id: "q13",
      type: "single",
      audio: "audio/exam/hlustun_a2k5_q13.mp3",
      promptUkr: "🎧 Hlustunarpróf (Слухання): Що повідомив батько: «Ég tilkynnti veikindi dóttur minnar í morgun í gegnum Mentor áður en skólinn byrjaði.»?",
      options: [
        "Він повідомив про хворобу доньки вранці через Mentor до початку уроків",
        "Він забув попередити школу",
        "Він зателефонував директору особисто о півдні",
        "Донька пішла на уроки здоровою"
      ],
      correctIndex: 0,
      explanation: "«tilkynnti veikindi dóttur minnar» (повідомив про хворобу) «í gegnum Mentor áður en skólinn byrjaði» (через Mentor до початку уроків)."
    },
    {
      id: "q14",
      type: "single",
      audio: "audio/exam/hlustun_a2k5_q14.mp3",
      promptUkr: "🎧 Hlustunarpróf (Слухання): Прослухайте оголошення: «Börnin í fyrsta til fjórða bekk geta verið á frístundaheimili eftir að hefðbundnum skóladegi lýkur.» Хто має право на подовжений день?",
      options: [
        "Діти з 1-го по 4-й клас після завершення звичайного навчального дня",
        "Лише учні 10-го класу",
        "Усі підлітки старшої школи",
        "Виключно діти вихователів"
      ],
      correctIndex: 0,
      explanation: "«Börnin í fyrsta til fjórða bekk» (діти з 1 по 4 клас) «geta verið á frístundaheimili» (можуть відвідувати групу продовженого дня)."
    },
    {
      id: "q15",
      type: "single",
      audio: "audio/exam/hlustun_a2k5_q15.mp3",
      promptUkr: "🎧 Hlustunarpróf (Слухання): Що надіслав вчитель: «Kennarinn sendi vikupóst til allra foreldra með mikilvægum upplýsingum um vettvangsferðina á föstudaginn.»?",
      options: [
        "Щотижневий лист батькам із важливою інформацією про екскурсію у п'ятницю",
        "Штраф за погану поведінку",
        "Запрошення на ремонт школи",
        "Повідомлення про скасування всіх занять"
      ],
      correctIndex: 0,
      explanation: "«vikupóst til allra foreldra» (щотижнева розсилка батькам) «með mikilvægum upplýsingum um vettvangsferðina» (про навчальну екскурсію/похід)."
    }
  ]
};
