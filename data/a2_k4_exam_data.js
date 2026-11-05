/**
 * EXAM DATA: LESSON A2.4 (HEILBRIGÐISKERFIÐ, HEILSUGÆSLAN OG VELFERÐ)
 * 15 Questions with Grammar, Clinical Triage, Heilsuvera & 4 Listening Prompts (Hlustun)
 */

export const A2_K4_EXAM_DATA = {
  id: "a2_k4_exam",
  titleUkr: "Іспит A2.4: Охорона здоров'я, поліклініка та Heilsuvera",
  titleIsl: "Próf A2.4: Heilbrigðiskerfið, heilsugæslan og Heilsuvera",
  passingScore: 12,
  totalQuestions: 15,
  questions: [
    {
      id: "q1",
      type: "single",
      promptUkr: "Як правильно ісландською виразити симптом: «У мене паморочиться в голові»?",
      options: [
        "Mér svimar.",
        "Ég svima.",
        "Ég er svimi.",
        "Mig svimar."
      ],
      correctIndex: 0,
      explanation: "Дієслово «að svima» вимагає суб'єкта у давальному відмінку (ÞGF 🟡): «Mér svimar»."
    },
    {
      id: "q2",
      type: "single",
      promptUkr: "Яке модальне дієслово вживається для зовнішнього призначення лікаря: «Вам слід приймати ці ліки двічі на день»?",
      options: [
        "Þú átt að taka þetta lyf tvisvar á dag.",
        "Þú vilt taka þetta lyf tvisvar á dag.",
        "Þú mátt taka þetta lyf tvisvar á dag.",
        "Þú þarft taka þetta lyf tvisvar á dag."
      ],
      correctIndex: 0,
      explanation: "Конструкція «að eiga að + inf» виражає лікарську настанову або припис лікування."
    },
    {
      id: "q3",
      type: "single",
      promptUkr: "Як правильно сказати: «У мене болить живіт» (magi — ч.р.) з давальним відмінком та артиклем?",
      options: [
        "Mér er illt í maganum.",
        "Mér er illt í magann.",
        "Ég hef illt maganum.",
        "Mér er illt á maganum."
      ],
      correctIndex: 0,
      explanation: "Прийменник «í» з давальним відмінком болю: magi ➔ maga + -num (ÞGF) = «í maganum»."
    },
    {
      id: "q4",
      type: "single",
      promptUkr: "Що в ісландській медичній системі означає служба «Læknavaktin»?",
      options: [
        "Чергова служба лікарів у вечірній час, вихідні та святкові дні",
        "Швидка допомога для невідкладних операцій на серці",
        "Аптечний склад наркотичних препаратів",
        "Державна інспекція з контролю якості ліків"
      ],
      correctIndex: 0,
      explanation: "Læknavaktin забезпечує надання амбулаторної лікарської допомоги тоді, коли місцеві поліклініки (Heilsugæslan) зачинені."
    },
    {
      id: "q5",
      type: "single",
      promptUkr: "За яким телефонним номером в Ісландії можна отримати консультацію чергової медсестри та пройти медичний тріаж?",
      options: [
        "1700",
        "112",
        "1818",
        "118"
      ],
      correctIndex: 0,
      explanation: "Номер 1700 — це цілодобова телефонна консультація чергової медичної служби (Læknavaktin/Heilsuvera). Номер 112 призначений суто для екстреного виклику (Neyðarlínan)."
    },
    {
      id: "q6",
      type: "single",
      promptUkr: "Що необхідно мати для входу в особистий кабінет медичного порталу «Heilsuvera.is»?",
      options: [
        "Rafræn skilríki (електронний ID у мобільному телефоні)",
        "Паперовий талон з реєстратури",
        "Номер водійського посвідчення",
        "Особистий підпис консула"
      ],
      correctIndex: 0,
      explanation: "Авторизація на порталі Heilsuvera здійснюється виключно через захищені електронні сертифікати «Rafræn skilríki»."
    },
    {
      id: "q7",
      type: "single",
      promptUkr: "Як називається відділення невідкладної госпіталізації (приймальний покій) лікарні Ландспіталі у Фоссвогурі?",
      options: [
        "Bráðamóttaka",
        "Heilsugæsla",
        "Bókasafn",
        "Biðstofa"
      ],
      correctIndex: 0,
      explanation: "Bráðamóttaka (bráður = гострий/невідкладний + móttaka = прийом) — це травмпункт та приймальне відділення невідкладної допомоги."
    },
    {
      id: "q8",
      type: "single",
      promptUkr: "Як перекладається медична дія «að endurnýja lyfseðil»?",
      options: [
        "Продовжити термін дії / оновити електронний рецепт на ліки",
        "Купити ліки без рецепта",
        "Скласти новий графік чергувань у лікарні",
        "Анулювати медичну картку"
      ],
      correctIndex: 0,
      explanation: "«Endurnýja lyfseðil» означає надіслати запит своєму лікарю на поновлення рецепта через систему Heilsuvera."
    },
    {
      id: "q9",
      type: "single",
      promptUkr: "Оберіть граматично правильне речення минулого часу для дієслова «að hitta» (зустрічати / відвідувати лікаря):",
      options: [
        "Í gær hitti ég heimilislækninn minn.",
        "Í gær ég hitti heimilislækninn minn.",
        "Í gær hittaði ég heimilislækninn minn.",
        "Ég í gær hitti heimilislækninn minn."
      ],
      correctIndex: 0,
      explanation: "Минулий час від «hitta» (2-га слабка група): ég hitti. Інверсія V2: обставина «Í gær» вимагає дієслово на 2-му місці."
    },
    {
      id: "q10",
      type: "single",
      promptUkr: "Що в Ісландії означає поняття «Sjúkratryggingar Íslands» (SÍ)?",
      options: [
        "Державне медичне страхування, що компенсує більшу частину витрат на лікування та ліки",
        "Приватна страхова компанія для туристів",
        "Спеціальний податок на іноземних працівників",
        "Лікарняний профспілковий фонд"
      ],
      correctIndex: 0,
      explanation: "SÍ (Sjúkratryggingar Íslands) — це державний інститут медстрахування, права на який автоматично набуваються через 6 місяців легального проживання в країні."
    },
    {
      id: "q11",
      type: "single",
      promptUkr: "Як сказати: «У мене біль у горлі» (háls — ч.р.)?",
      options: [
        "Mér er illt í hálsinum.",
        "Mér er illt í hálsinn.",
        "Ég er með illt háls.",
        "Mér er hálsverkur."
      ],
      correctIndex: 0,
      explanation: "í + ÞGF з артиклем: háls ➔ hálsi + -num = «í hálsinum»."
    },
    {
      id: "q12",
      type: "single",
      audio: "audio/exam/hlustun_a2k4_q12.mp3",
      promptUkr: "🎧 Hlustunarpróf (Слухання): Прослухайте інструкцію лікаря: «Þú átt að taka tvær töflur af sýklalyfinu á hverjum morgni með mat í tíu daga.» Яке дозування призначено?",
      options: [
        "По 2 таблетки антибіотика щоранку з їжею протягом 10 днів",
        "По 1 таблетці ввечері перед сном",
        "По 2 таблетки лише при підвищенні температури",
        "По 3 таблетки на день без їжі"
      ],
      correctIndex: 0,
      explanation: "Диктор чітко озвучує: «tvær töflur af sýklalyfinu», «á hverjum morgni með mat» та «í tíu daga» (10 днів)."
    },
    {
      id: "q13",
      type: "single",
      audio: "audio/exam/hlustun_a2k4_q13.mp3",
      promptUkr: "🎧 Hlustunarpróf (Слухання): Прослухайте повідомлення пацієнтки: «Læknirinn endurnýjaði lyfseðilinn minn í gegnum Heilsuveru og lyfin eru tilbúin í Lyfju.» Де знаходяться ліки?",
      options: [
        "Рецепт продовжено через Heilsuvera, ліки вже готові до видачі в аптеці Lyfja",
        "Лікар відмовив у виписці рецепта",
        "Пацієнтка повинна прийти за паперовим рецептом у лікарню",
        "Ліки закінчилися на центральному складі"
      ],
      correctIndex: 0,
      explanation: "В аудіо чітко звучить: «endurnýjaði lyfseðilinn minn í gegnum Heilsuveru» та «lyfin eru tilbúin í Lyfju»."
    },
    {
      id: "q14",
      type: "single",
      audio: "audio/exam/hlustun_a2k4_q14.mp3",
      promptUkr: "🎧 Hlustunarpróf (Слухання): Що радить диктор: «Ef þú þarft að ná í lækni utan dagvinnutíma heilsugæslunnar geturðu alltaf hringt í síma sautján hundruð.»?",
      options: [
        "Телефонувати за номером 1700 у разі потреби лікаря в неробочий час поліклініки",
        "Чекати до ранку понеділка",
        "Їхати без дзвінка в поліцію",
        "Викликати приватне таксі"
      ],
      correctIndex: 0,
      explanation: "«utan dagvinnutíma heilsugæslunnar» — поза годинами роботи поліклініки слід телефонувати на «sautján hundruð» (1700)."
    },
    {
      id: "q15",
      type: "single",
      audio: "audio/exam/hlustun_a2k4_q15.mp3",
      promptUkr: "🎧 Hlustunarpróf (Слухання): Прослухайте репліку: «Mér líður miklu betur í dag eftir að ég fór á heilsugæsluna og hitti heimilislækninn minn.» Як змінився стан здоров'я?",
      options: [
        "Пацієнтка почувається набагато краще після візиту до сімейного лікаря",
        "Пацієнтці стало значно гірше",
        "Лікарня була зачинена",
        "Сімейний лікар відмовив у прийомі"
      ],
      correctIndex: 0,
      explanation: "«Mér líður miklu betur» означає «Мені набагато краще» після того як вона «fór á heilsugæsluna og hitti heimilislækninn»."
    }
  ]
};
