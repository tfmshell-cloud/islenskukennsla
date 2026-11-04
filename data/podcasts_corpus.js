/**
 * podcasts_corpus.js - Master Bilingual Podcast Syllabus & Textual Scripts (22 Episodes)
 * 
 * Immersive Ukrainian-Icelandic audio series designed for in-car listening & daily commuting.
 * Based on:
 * - "Viltu læra íslensku?" (RÚV / Tungumálatorg 21-episode communicative series)
 * - "Tölum saman 2022" (Fræðslumiðstöð atvinnulífsins - Workplace communication)
 * - "Íslenska fyrir alla 1-4" (Menntamálastofnun)
 * - Stofnun Árna Magnússonar (BÍN & Íslensk nútímamálsorðabók)
 * 
 * Host Ensemble & Neural Voices:
 * - Остап (uk-UA-OstapNeural) - Провідний український аналітик, стратег адаптації в Ісландії
 * - Поліна (uk-UA-PolinaNeural) - Лінгвіст-філолог, мисливець за фонетичними пастками та граматикою
 * - Gunnar (is-IS-GunnarNeural) - Носій ісландської мови (чоловічі ролі: бариста, лікар, водій, майстер)
 * - Guðrún (is-IS-GudrunNeural) - Носій ісландської мови (жіночі ролі: колега, касир, консультант Efling)
 */

export const PODCASTS_CORPUS = {
  version: "2.0-EXPANDED-22-EPISODES",
  seriesTitleUkr: "Ісландська в дорозі: від ландшафту до вільного спілкування",
  seriesTitleIsl: "Íslenska á ferðinni: Frá landslagi til færni",
  totalEpisodes: 22,
  readyAudioCount: 9,
  categories: [
    { id: "all", labelUkr: "Усі 22 епізоди", icon: "🌐" },
    { id: "foundation", labelUkr: "Фундамент & Фонетика (A0)", icon: "🌋" },
    { id: "daily", labelUkr: "Побут, Крамниці & Послуги (A1)", icon: "🛒" },
    { id: "health_transport", labelUkr: "Здоров'я & Транспорт (A1-A2)", icon: "🏥" },
    { id: "work", labelUkr: "Робота, Efling & Податки (A2-B1)", icon: "💼" },
    { id: "culture_civic", labelUkr: "Культура & Громадянство (B1-B2)", icon: "🇮🇸" }
  ],
  episodes: [
    {
      ep: 0,
      id: "ep0_landslag_hljodfaeri",
      category: "foundation",
      titleUkr: "Логіка ісландської граматики: від ландшафту до фонетики",
      titleIsl: "Rökfræði tungumálsins: Frá landslagi til hljóðfræði",
      level: "A0 (Фундамент)",
      sourceRef: "ÍFA 1 Kafli 1 & Bara tala acoustics",
      duration: "18:42",
      bilingualRatio: "80% UA / 20% IS",
      audioFile: "audio/podcasts/m1_logika_islanskoi_hramatyky_vid_landshaftu.m4a",
      fileStatus: "READY",
      statusLabel: "🎧 ГОТОВО ДО ПРОСЛУХОВУВАННЯ (8.8 MB)",
      situation: "Вступний концепт: чому ісландська збереглася без змін понад 1000 років, як вулканічний ландшафт сформував боковий вибух [tl] та преаспірацію перед подвоєними приголосними.",
      anchors: ["fjall [fjatl̥] (гора)", "jökull [ˈjœːkʏtl̥] (льодовик)", "takk [tʰahk] (дякую)", "Ísland [ˈistlant] (Ісландія)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Привіт усім! Сьогодні ми відкриваємо таємницю найконсервативнішої мови Європи. Чому сучасний ісландець може без перекладача читати давньоскандинавські саги 12-го століття? І чому ландшафт острова сформував цю унікальну фонетику?" },
        { speaker: "Gunnar", role: "Носій мови", text: "Góðan daginn! Já, nákvæmlega. Tungumálið okkar hefur varðveist vegna landfræðilegrar einangrunar. Hljóðin okkar, eins og ll í fjall eða kk í takk, eru hluti af náttúrunni." },
        { speaker: "Поліна", role: "Філолог", text: "І тут перша пастка для українця: в ісландській мові подвоєне LL майже ніколи не читається як звичайне «л». Це різкий боковий вибух [tl̥]! Коли ви дивитеся на вулкан або льодовик, ви кажете jökull [ˈjœːkʏtl̥], клацаючи язиком об альвеоли." },
        { speaker: "Gunnar", role: "Носій мови", text: "Og munið eftir aðblæstri (preaspiration)! Þegar þið segið takk, þá kemur lítill andardráttur fyrir k-hljóðið: [tʰahk]. Ekki bara venjulegt [tak]." },
        { speaker: "Остап", role: "Аналітик", text: "У цьому курсі ми розберемо кожен звук, кожен відмінок і кожну життєву ситуацію без води та порожньої балаканини. Поїхали!" }
      ]
    },
    {
      ep: "0.5",
      id: "ep05_prykhovana_logika_vymovy",
      category: "foundation",
      titleUkr: "Прихована логіка ісландської вимови та фонетичні пастки",
      titleIsl: "Falin rökfræði framburðar og hljóðkerfisins",
      level: "A0+ (Акустика)",
      sourceRef: "Árnastofnun standard & Bara tala",
      duration: "16:15",
      bilingualRatio: "75% UA / 25% IS",
      audioFile: "audio/podcasts/m0_prykhovana_logika_vymovy.m4a",
      fileStatus: "READY",
      statusLabel: "🎧 ГОТОВО ДО ПРОСЛУХОВУВАННЯ (8.0 MB)",
      situation: "Розбір 6 головних фонетичних пасток Рейк'явіка: правила довготи голосних, чому буквосполучення HV читається як [kv], глухі сонорні RL / RN та м'який звук G.",
      anchors: ["hvað [kʰvaːð] (що)", "hvítt [kʰviht] (біле)", "björn [pjœrtn] (ведмідь)", "barn [partn] (дитина)", "saga [ˈsaːɣa] (сага)"],
      script: [
        { speaker: "Поліна", role: "Філолог", text: "Сьогодні ми розбираємо, чому слова пишуться через 'H', а читаються як 'K'! Знамените ісландське слово 'hvað' (що) звучить як [kʰvaːð]. Звідки взявся цей глухий звук [k]?" },
        { speaker: "Gunnar", role: "Носій мови", text: "Þetta er söguleg hljóðbreyting. Áður fyrr var þetta blísturshljóð [xʷ], en í nútímaíslensku varð það að [kv]. Hvað, hvar, hvenær, hvítt!" },
        { speaker: "Остап", role: "Аналітик", text: "Тобто запам'ятовуємо правило для авто: бачите буквосполучення HV — вмикайте звук [kv]. А що з RN і RL у словах barn та björn?" },
        { speaker: "Guðrún", role: "Носій мови", text: "Þar kemur dálítill t-hljóð inn á milli: [partn] og [pjœrtn]. Þetta gerist af sjálfu sér þegar tungan færir sig frá r til n." },
        { speaker: "Поліна", role: "Філолог", text: "А буква G між голосними перетворюється на м'який задньоязиковий фрикатив [ɣ], як у слові saga [ˈsaːɣa]." }
      ]
    },
        {
      ep: 1,
      id: "ep1_hver_ert_thu",
      category: "foundation",
      titleUkr: "Хто ти? Таємниця ісландських по батькові та закон V2",
      titleIsl: "Hver ert þú? Föðurnöfn og V2-reglan",
      level: "A1.1 (Viltu læra íslensku? Ep. 1)",
      sourceRef: "ÍFA 1 Kafli 1 & Viltu læra íslensku? Þáttur 1",
      duration: "17:30",
      bilingualRatio: "60% UA / 40% IS",
      audioFile: "audio/podcasts/ep1_hver_ert_thu.m4a",
      fileStatus: "READY",
      statusLabel: "🎧 ГОТОВО ДО ПРОСЛУХОВУВАННЯ (0.45 MB)",
      situation: "Знайомство, культурна специфіка відсутності прізвищ (-son / -dóttir), клітики Samruni (Hvað heitirðu?) та жорсткий синтаксичний закон V2 (дієслово на 2-му місці).",
      anchors: ["Hvað heitirðu? [kʰvaːð ˈheiːtɪrðʏ]", "Hvaðan ertu? [kʰvaːðan ˈɛr̥tʏ]", "Ég er frá Úkraínu (ÞGF 🟡)", "V2: Núna bý ég í Reykjavík"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Привіт усім слухачам курсу «Ісландська в дорозі»! Сьогодні в першому епізоді ми розбираємо одну з найдивовижніших таємниць острова: чому в Ісландії майже ні в кого немає прізвищ? Президент, ваш сусід чи колега — всі звертаються виключно на «ти»." },
        { speaker: "Guðrún", role: "Носій мови", text: "Já, nákvæmlega! Við notum aldrei eftirnöfn í daglega lífinu. Ég heiti Guðrún Jónsdóttir, en allir segja bara: «Hæ Guðrún!» við mig. Það er mjög vinalegt og opið." },
        { speaker: "Поліна", role: "Філолог", text: "І тут зверніть увагу на саму форму імені: Guðrún Jónsdóttir означає буквально «Гудрун, донька Йона». А для хлопця це було б «Jónsson» — «син Йона». Тобто це патронім — по батькові, а не прізвище!" },
        { speaker: "Остап", role: "Аналітик", text: "А як же запитати людину, як її звати? Чи кажуть ісландці повільно «Hvað heitir þú»?" },
        { speaker: "Guðrún", role: "Носій мови", text: "Nei, í daglegu tali renna orðin saman í eitt: «Hvað heitirðu?» [kʰvaːð ˈheiːtɪrðʏ]. Og ef þú vilt spyrja hvaðan einhver kemur: «Hvaðan ertu?» [kʰvaːðan ˈɛr̥tʏ]." },
        { speaker: "Поліна", role: "Філолог", text: "Це явище називається клітика або Samruni. Займенник «þú» після дієслова перетворюється на хвостик «-ðu» або «-tu»." },
        { speaker: "Gunnar", role: "Носій мови", text: "Og mundu eftir mikilvægustu reglunni í íslensku: V2-reglunni! Sögnin verður alltaf að vera í öðru sæti í aðalsetningu. Ef þú byrjar á orðinu «Núna», þá verður þú að segja: «Núna bý ég í Reykjavík», alls ekki «Núna ég bý»." },
        { speaker: "Поліна", role: "Філолог", text: "А якщо ви відповідаєте, звідки ви приїхали, прийменник «frá» завжди вимагає давального відмінка Þágufall 🟡: «Ég er frá Úkraínu»! Закінчення змінюється на «-u»." },
        { speaker: "Остап", role: "Аналітик", text: "Повторюйте прямо за кермом за нашими носіями: «Góðan daginn! Ég heiti... Gaman að kynnast þér!»" },
        { speaker: "Gunnar", role: "Носій мови", text: "Sömuleiðis! Mjög gaman að kynnast þér. Gangi þér vel að æfa!" },
        { speaker: "Guðrún", role: "Носій мови", text: "Bless bless, og heyrumst í næsta þætti!" }
      ]
    },
    {
      ep: 2,
      id: "ep2_chomu_skladno_zamovyty_kavu",
      category: "daily",
      titleUkr: "Чому складно замовити каву в Рейк'явіку: знахідний відмінок та U-умлаут",
      titleIsl: "Á kaffihúsi: Leyndardómar þolfallsins og bakaríið",
      level: "A1.2 (Viltu læra íslensku? Ep. 2 & 7)",
      sourceRef: "ÍFA 1 Kafli 2 & Viltu læra íslensku? Þáttur 2",
      duration: "19:15",
      bilingualRatio: "50% UA / 50% IS",
      audioFile: "audio/podcasts/k2_chomu_skladno_zamovyty_kavu.m4a",
      fileStatus: "READY",
      statusLabel: "🎧 ГОТОВО ДО ПРОСЛУХОВУВАННЯ (9.7 MB)",
      situation: "Замовлення в кав'ярні та пекарні Brauð & Co. Знахідний відмінок іменників: чому snúður втрачає закінчення (einn snúð 🟢), а kaka мутує кореневу голосну (eina köku 🟢). Розрахунок у кронах.",
      anchors: ["Ég ætla að fá... (Я візьму...)", "Einn snúð (чол. рід ÞF)", "Eina samloku (жін. рід ÞF)", "Eitt kaffi (сер. рід ÞF)", "Það gerir 1.850 krónur"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Ви заходите в пекарню Brauð & Co в Рейк'явіку. На вітрині написано 'Snúður' [ˈstnuːðʏr]. Але якщо ви скажете 'Ég ætla að fá einn snúður', бариста зрозуміє, але це ріже слух. Чому?" },
        { speaker: "Gunnar", role: "Бариста Свейнн", text: "Vegna þess að sagnorðið 'fá' stjórnar þolfalli! Snúður er karlkyn. Í þolfalli fellur -ur niður: 'Ég ætla að fá einn snúð'." },
        { speaker: "Поліна", role: "Філолог", text: "А з жіночим родом ще цікавіше! Сендвіч 'samloka' стає 'eina samloku'. А от млинець 'pönnukaka' через суфіксальне -u мутує кореневий звук 'a' в 'ö': 'eina pönnuköku'! Це класичний U-умлаут." },
        { speaker: "Gunnar", role: "Бариста Свейнн", text: "Og þegar þú ert búinn að panta, segir þú: 'Það er komið, takk!' Og ég segi: 'Það gerir 1.850 krónur. Má bjóða þér kvittun?'" }
      ]
    },
        {
      ep: 3,
      id: "ep3_i_budinni_og_bonus",
      category: "daily",
      titleUkr: "У супермаркеті Bónus та Krónan: вага, упаковки та цінники",
      titleIsl: "Í búðinni: Bónus, Krónan og innkaup",
      level: "A1.2 (Viltu læra íslensku? Ep. 3)",
      sourceRef: "ÍFA 1 Kafli 3 & Viltu læra íslensku? Þáttur 3",
      duration: "16:45",
      bilingualRatio: "50% UA / 50% IS",
      audioFile: "audio/podcasts/ep3_i_budinni_og_bonus.m4a",
      fileStatus: "READY",
      statusLabel: "🎧 ГОТОВО ДО ПРОСЛУХОВУВАННЯ (0.39 MB)",
      situation: "Покупки в Bónus та Krónan. Як спитати вагу, знайти товар на полиці, назви мір (kíló, lítri, dós, pakki, flaska) та фрази біля каси самообслуговування.",
      anchors: ["Hvað kostar kílóið? (Скільки коштує кілограм?)", "Einn pakki af osti (пачка сиру)", "Ein flaska af mjólk (пляшка молока)", "Viltu poka? (Бажаєте пакет?)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Вітаємо знову! Епізод третій. Сьогодні ми вирушаємо до найвідоміших ісландських супермаркетів — Bónus із жовтою свинею та Krónan із зеленим яблуком. Як не розгубитися між цінниками, вагою та касами самообслуговування?" },
        { speaker: "Guðrún", role: "Консультант Bónus", text: "Í Bónus og Krónan þarftu oft að spyrja starfsfólkið um vörur. Þú getur sagt kurteislega: «Afsakið, hvar finn ég smjör og ost?» eða «Hvað kostar kílóið af eplum?»" },
        { speaker: "Поліна", role: "Філолог", text: "Зверніть увагу на граматичну конструкцію ваги та міри. Прийменник «af» вимагає після себе давального відмінка: «kíló af eplum» — кілограм яблук. А як щодо упаковок?" },
        { speaker: "Gunnar", role: "Касир", text: "Já! Við tölum um: «einn pakki af kaffi» (пачка кави), «ein dós af tómötum» (бляшанка томатів) og «ein flaska af mjólk» (пляшка молока)." },
        { speaker: "Остап", role: "Аналітик", text: "А коли ви підходите до каси, касир або автомат самообслуговування ставить вам два сакральних питання кожного ісландця!" },
        { speaker: "Gunnar", role: "Касир", text: "Fyrsta spurningin er: «Viltu poka?» [ˈvɪltʏ ˈpʰɔːka]. Og þú svarar: «Já, takk, einn poka» eða «Nei, takk, ég er með eigin poka»." },
        { speaker: "Guðrún", role: "Касирка", text: "Og önnur spurningin er: «Má bjóða þér kvittun?» [kvɪhtʏn]. Og þú segir einfaldlega: «Nei, takk, það er komið!» eða «Já, takk»." },
        { speaker: "Поліна", role: "Філолог", text: "Запам'ятайте золоту фразу ввічливості: «Það er komið, takk!» [θaːð ɛr ˈkʰɔːmɪð tʰahk] — «Все добре, готово, дякую!»" },
        { speaker: "Остап", role: "Аналітик", text: "Чудово! Тепер у супермаркеті ви почуватиметеся впевнено. Побачимося в наступному епізоді, де ми приборкаємо підступний ісландський годинник!" },
        { speaker: "Gunnar", role: "Касир", text: "Takk fyrir innkaupin og eigið góðan dag!" },
        { speaker: "Guðrún", role: "Касирка", text: "Bless bless!" }
      ]
    },
        {
      ep: 4,
      id: "ep4_klukkan_og_daglegt_lif",
      category: "daily",
      titleUkr: "Котра година? Ісландський парадокс часу та графік змін",
      titleIsl: "Hvað er klukkan? Tími, vaktir og dagleiki",
      level: "A1.3 (Viltu læra íslensku? Ep. 4)",
      sourceRef: "ÍFA 1 Kafli 4 & Viltu læra íslensku? Þáttur 4",
      duration: "17:10",
      bilingualRatio: "45% UA / 55% IS",
      audioFile: "audio/podcasts/ep4_klukkan_og_daglegt_lif.m4a",
      fileStatus: "READY",
      statusLabel: "🎧 ГОТОВО ДО ПРОСЛУХОВУВАННЯ (0.43 MB)",
      situation: "Як називати точний час, парадокс половин (hálf fimm = 04:30), робочі зміни (morgunvakt, kvöldvakt, næturvakt) та дні тижня.",
      anchors: ["Hvað er klukkan? (Котра година?)", "Hálf fimm (04:30! Пів до п'ятої)", "Korter yfir... / Korter í...", "Hvenær byrjar vaktin? (Коли зміна?)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Вітаємо в четвертому епізоді подкасту «Ісландська в дорозі»! Сьогодні ми розбираємо час. В Ісландії запізнення на роботу через неправильно зрозумілий годинник — це класика перших місяців життя." },
        { speaker: "Поліна", role: "Філолог", text: "Головна пастка: ви домовляєтеся про зустріч, і вам кажуть: «Hálf fimm». Якщо ви перекладете це англійською як half past five, тобто пів на шосту, ви запізнитеся рівно на годину! Бо в ісландській мові «hálf fimm» — це 04:30 або 16:30!" },
        { speaker: "Gunnar", role: "Носій мови", text: "Já, nákvæmlega! «Hálf fimm» þýðir hálftími í fimm, sem sagt fjögur þrjátíu. Og mundu að tölurnar fyrir tímann eru alltaf í hvorugkyni: eitt, tvö, þrjú, fjögur!" },
        { speaker: "Поліна", role: "Філолог", text: "А як щодо чвертей? Чверть по — це «korter yfir», а за чверть — «korter í»." },
        { speaker: "Guðrún", role: "Носій мови", text: "Rétt! «Korter yfir sjö» er sjö fimmtán. En «korter í átta» er sjö fjörutíu og fimm. Og tólf á hádegi heitir einfaldlega «hádegi»!" },
        { speaker: "Остап", role: "Аналітик", text: "На виробництві, у готелях чи на будівництві всі живуть за графіком змін — «vaktir». Гудрун, які бувають зміни?" },
        { speaker: "Guðrún", role: "Носій мови", text: "Við erum með þrjár meginvaktir: «morgunvakt» frá sjö til þrjú, «kvöldvakt» frá þrjú til ellefu, og «næturvakt» frá ellefu til sjö á morgnana." },
        { speaker: "Поліна", role: "Філолог", text: "І за вечірні та нічні зміни профспілки Efling та VR вимагають доплату — «álag» від 33% до 45% до вашої базової ставки!" },
        { speaker: "Gunnar", role: "Носій мови", text: "Ef þú vinnur á næturnar færðu næturálag. En mundu að hvílast vel á milli vakta!" },
        { speaker: "Остап", role: "Аналітик", text: "Повторюйте за нами прямо в дорозі: «Hvað er klukkan? — Klukkan er hálf fimm!»" },
        { speaker: "Guðrún", role: "Носій мови", text: "Gangi ykkur vel og sjáumst í næsta þætti!" },
        { speaker: "Gunnar", role: "Носій мови", text: "Bless bless!" }
      ]
    },
        {
      ep: 5,
      id: "ep5_heilsugaeslan_og_lyfja",
      category: "health_transport",
      titleUkr: "У поліклініці Heilsugæslan та аптеці: коли болить безособово",
      titleIsl: "Heilsugæslan og apótek: Verkir, lyf og tímapantanir",
      level: "A2.1 (Viltu læra íslensku? Ep. 10 & 11)",
      sourceRef: "ÍFA 2 Kafli 4 & Viltu læra íslensku? Þættir 10-11",
      duration: "19:40",
      bilingualRatio: "40% UA / 60% IS",
      audioFile: "audio/podcasts/ep5_heilsugaeslan_og_lyfja.m4a",
      fileStatus: "READY",
      statusLabel: "🎧 ГОТОВО ДО ПРОСЛУХОВУВАННЯ (0.40 MB)",
      situation: "Візит до районної поліклініки (Heilsugæslan) та чергової аптеки (Lyfja). Безособові конструкції болю: 'Mér er illt í...' (+ ÞGF 🟡). Запис на Heilsuvera та рецепти на ліки.",
      anchors: ["Mér er illt í höfðinu (Болить голова ÞGF)", "Ég er með hita (У мене температура)", "Tímapöntun á Heilsuvera", "Lyfseðill (рецепт)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Привіт усім! Сьогодні розбираємо найважливіше для життя: як записатися до лікаря в районну поліклініку Heilsugæslan та як купити ліки в аптеці Lyfja чи Apótekarinn." },
        { speaker: "Поліна", role: "Філолог", text: "В ісландській граматиці біль описується безособовою конструкцією через давальний відмінок Þágufall 🟡: «Mér er illt í...»! Тобто «Мені є зле в голові чи горлі», а не «мій живіт болить»." },
        { speaker: "Guðrún", role: "Лікар Heilsugæslan", text: "Góðan daginn! Velkomin á heilsugæsluna. Hvað amar að þér? Hvar finnurðu fyrir óþægindum?" },
        { speaker: "Поліна", role: "Пацієнтка", text: "Mér er illt í hálsinum og mér er óglatt. Og ég er með mikinn hita í dag." },
        { speaker: "Gunnar", role: "Лікар Heilsugæslan", text: "Ég skil. Taktu djúpan andardrátt. Þú ert með slæma hálsbólgu og hita. Ég ætla að skrifa upp á sýklalyf og verkjalyf fyrir þig." },
        { speaker: "Остап", role: "Аналітик", text: "А де взяти рецепт? Чи видає лікар паперовий бланк із печаткою?" },
        { speaker: "Guðrún", role: "Лікар Heilsugæslan", text: "Nei, engin pappírsblöð! Lyfseðillinn fer beint inn í rafræna kerfið með kennitölunni þinni. Þú ferð bara í næsta apótek og segir kennitöluna þína." },
        { speaker: "Поліна", role: "Пацієнтка", text: "А для запису до лікаря або консультації медсестри всі в Ісландії користуються державним порталом Heilsuvera.is з електронним підписом Rafræn skilríki!" },
        { speaker: "Gunnar", role: "Лікар Heilsugæslan", text: "Já! Á Heilsuveru geturðu líka sent skilaboð á heimilislækninn þinn eða endurnýjað lyfseðla. Það er mjög þægilegt." },
        { speaker: "Остап", role: "Аналітик", text: "Головна порада: якщо температура не спадає, а поліклініка зачинена, після 17:00 та на вихідних телефонуйте на чергову лінію 1700 або приїжджайте до Læknavaktin!" },
        { speaker: "Guðrún", role: "Лікар Heilsugæslan", text: "Góðan bata og passaðu upp á heilsuna!" },
        { speaker: "Gunnar", role: "Лікар Heilsugæslan", text: "Bless bless!" }
      ]
    },
    {
      ep: 6,
      id: "ep6_kennitala_og_thjodskra",
      category: "culture_civic",
      titleUkr: "Кеннітала, банк та оренда: перші юридичні кроки в Рейк'явіку",
      titleIsl: "Kennitala, banki og leigusamningur: Fyrstu skrefin",
      level: "A2.1 (Viltu læra íslensku? Ep. 12 & 13)",
      sourceRef: "ÍFA 2 Kafli 1 & Viltu læra íslensku? Þættir 12-13",
      duration: "18:50",
      bilingualRatio: "40% UA / 60% IS",
      audioFile: "audio/podcasts/ep6_kennitala_og_thjodskra.m4a",
      fileStatus: "READY",
      statusLabel: "🎧 АУДІОЗАПИС ГОТОВИЙ (436 KB AAC)",
      situation: "Отримання ідентифікаційного номера (Kennitala) у Þjóðskrá, відкриття банківського рахунку в Landsbankinn/Arion, активація електронного підпису (Rafræn skilríki) та підписання договору оренди (Leigusamningur) для отримання субсидії (Húsaleigubætur).",
      anchors: ["Kennitala (10 цифр)", "Rafræn skilríki (електронний підпис)", "Bankareikningur (банківський рахунок)", "Húsaleigubætur (житлова субсидія)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "В Ісландії без кеннітали ви не існуєте юридично. 10 цифр: перші шість — дата народження (DDMMYY), остання — століття (9 для 20-го, 0 для 21-го). Як відкрити банківський рахунок?" },
        { speaker: "Gunnar", role: "Банківський менеджер", text: "Góðan daginn. Til að opna bankareikning þarftu vegabréf, kennitölu og staðfestingu á heimilisfangi frá Þjóðskrá." },
        { speaker: "Поліна", role: "Філолог", text: "Найголовніше після отримання сім-карти — налаштувати 'Rafræn skilríki' (електронний паспорт у телефоні). Ним ви будете підписувати договір оренди (húsaleigusamningur), щоб держава компенсувала частину вартості оренди через житлові субсидії — húsaleigubætur!" },
        { speaker: "Guðrún", role: "Орендодавець", text: "Hér er leigusamningurinn. Leigan er tvö hundruð þúsund krónur á mánuði, trygging er þrír mánuðir. Skrifaðu undir rafrænt." }
      ]
    },
    {
      ep: 7,
      id: "ep7_straeto_og_ferdalog",
      category: "health_transport",
      titleUkr: "На автостанції BSÍ та в автобусі Strætó: як пересуватися островом",
      titleIsl: "Á ferð og flugi: Strætó, BSÍ og samgöngur",
      level: "A1.3 (Viltu læra íslensku? Ep. 5)",
      sourceRef: "ÍFA 1 Kafli 5 & Viltu læra íslensku? Þáttur 5",
      duration: "16:20",
      bilingualRatio: "35% UA / 65% IS",
      audioFile: "audio/podcasts/ep7_straeto_og_ferdalog.m4a",
      fileStatus: "READY",
      statusLabel: "🎧 АУДІОЗАПИС ГОТОВИЙ (362 KB AAC)",
      situation: "Транспортна система столичного регіону Höfuðborgarsvæðið: додаток Klapp, квитки на Strætó, автостанція BSÍ та пересадки на зупинках Hlemmur і Lækjartorg.",
      anchors: ["Klapp appið (додаток для квитків)", "Hvenær kemur næsti vagn? (Коли наступний?)", "Á endastöð (на кінцевій зупинці)", "Skiptimiði (квиток із правом пересадки)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Громадський транспорт у Рейк'явіку — це жовті автобуси Strætó. Готівку водії майже не приймають, усе працює через додаток Klapp або картку Klapp-kort." },
        { speaker: "Gunnar", role: "Водій Strætó", text: "Góðan daginn! Þú skannar bara símann hérna á skjánum. Píp! Það er komið." },
        { speaker: "Поліна", role: "Пасажирка", text: "Afsakið, stoppar þessi vagn við Háskóla Íslands? Hvenær erum við á endastöð?" },
        { speaker: "Gunnar", role: "Водій Strætó", text: "Já, vagn númer eitt stoppar beint fyrir framan Háskólann. Næsta stopp er Hlemmur! Skipting í aðra vagna fer fram þar." }
      ]
    },
    {
      ep: 8,
      id: "ep8_vinnumarkadurinn_efling",
      category: "work",
      titleUkr: "Робоче місце та профспілка Efling: табель оплати та твої права",
      titleIsl: "Vinnumarkaðurinn: Launaseðill, réttindi og stéttarfélög",
      level: "A2.2 (Viltu læra íslensku? Ep. 16 & Tölum saman)",
      sourceRef: "Fræðslumiðstöð atvinnulífsins & Efling Kjarasamningur",
      duration: "20:00",
      bilingualRatio: "30% UA / 70% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "Аналіз зарплатного чека (Launaseðill): обов'язкові рядки grunnlaun, yfirvinna (1,8%), orlof (10,17%), lífeyrissjóður (пенсійний фонд 4% + 11.5%) та звернення до довіреної особи (trúnaðarmaður) у профспілці Efling або VR.",
      anchors: ["Launaseðill (розрахунковий лист)", "Grunnlaun (базова ставка)", "Yfirvinna (понаднормові години)", "Orlof (відпускні)", "Trúnaðarmaður (довірена особа профспілки)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Першого числа кожного місяця ви отримуєте 'Launaseðill' — розрахунковий лист. Якщо ви не вмієте його читати, ви ризикуєте втратити чесно зароблені гроші за понаднормові години!" },
        { speaker: "Guðrún", role: "Представниця Efling", text: "Sælir! Á launaseðlinum verður þú alltaf að athuga þrennt: Í fyrsta lagi grunnlaun, í öðru lagi yfirvinnu (1,8% af mánaðarlaunum á tímann), og í þriðja lagi orlof (10,17%)." },
        { speaker: "Поліна", role: "Філолог", text: "Якщо роботодавець не платить вчасно чи порушує колективний договір (Kjarasamningur), ви звертаєтеся до свого довіреного представника (Trúnaðarmaður) або прямо в офіс Efling чи VR." },
        { speaker: "Gunnar", role: "Працівник", text: "Ég fór til Eflingar og þeir hjálpuðu mér að endurreikna launin mín. Ég fékk greiddar fimmtíu þúsund krónur sem vantaði!" }
      ]
    },
    {
      ep: 9,
      id: "ep9_hargreidslustofa",
      category: "daily",
      titleUkr: "У перукарні: типи стрижки, фарбування та запис на час",
      titleIsl: "Á hárgreiðslustofu: Klipping, litun og tímapöntun",
      level: "A1.3 (Viltu læra íslensku? Ep. 6)",
      sourceRef: "ÍFA 1 Kafli 6 & Viltu læra íslensku? Þáttur 6",
      duration: "15:40",
      bilingualRatio: "35% UA / 65% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "Візит до салону краси. Як пояснити бажану довжину, запитати про підрівнювання (klippa aðeins endana), фарбування (lita hárið) та догляд за бородою (snyrta skegg).",
      anchors: ["Ég vildi fá tíma í klippingu (Хотіла б записатися)", "Bara snyrta endana (Лише підрівняти кінці)", "Styttra á hliðunum (Коротше з боків)", "Hvernig viltu hafa það? (Як бажаєте?)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Перукарня в Ісландії — чудовий тренажер для розмовних прикметників довжини та форми. 'Stutt' (коротке), 'sítt' (довге), 'liðað' (хвилясте)." },
        { speaker: "Guðrún", role: "Перукарка", text: "Góðan daginn! Viltu fá klippingu eða líka litun? Og hvernig viltu hafa síddina?" },
        { speaker: "Поліна", role: "Клієнтка", text: "Ég vil bara láta snyrta endana, um tvo sentimetra. Og svo vildi ég fá létta strípur (мелірування)." },
        { speaker: "Gunnar", role: "Чоловіча стрижка", text: "Fyrir mig: styttra á hliðunum og snyrta skeggið, takk!" }
      ]
    },
    {
      ep: 10,
      id: "ep10_sundlaugamenning",
      category: "daily",
      titleUkr: "У басейні Sundlaug: суворий етикет та гарячі ванни",
      titleIsl: "Í sundlaug: Heitir pottar, hreinlæti og siðir",
      level: "A1.3 (Viltu læra íslensku? Ep. 9)",
      sourceRef: "ÍFA 1 Kafli 7 & Viltu læra íslensku? Þáttur 9",
      duration: "17:50",
      bilingualRatio: "40% UA / 60% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "Культура ісландських термальних басейнів (Sundlaugar). Правило обов'язкового душу без купальника (sápa án sundfata), температура ванн (heitir pottar: 38°C–42°C) та неформальні бесіди про погоду в басейні.",
      anchors: ["Fara í sund (йти в басейн)", "Þvo sér án sundfata (митися без плавок)", "Heitur pottur (гаряча ванна)", "Gufubað (парна/сауна)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Басейн для ісландця — це місце зборів парламенту, клубу знайомств і терапії. Але якщо ви порушите санітарний кодекс, на вас дивитимуться як на злочинця!" },
        { speaker: "Gunnar", role: "Носій мови", text: "Reglan er einföld og ströng: Þú verður að fara í sturtu og þvo þér vel með sápu ÁN sundfata áður en þú ferð ofan í laugina!" },
        { speaker: "Поліна", role: "Філолог", text: "Усі вказівники на стінах роздягальні це підкреслюють: höfuð (голова), handarkrika (пахви), nára (пах), fætur (стопи)." },
        { speaker: "Guðrún", role: "Співрозмовниця в поттурі", text: "Og svo fer maður í heita pottinn og spjallar: 'Það er kalt í dag en vatnið er dásamlegt!'" }
      ]
    },
    {
      ep: 11,
      id: "ep11_fataverslun_og_skor",
      category: "daily",
      titleUkr: "У магазині одягу та взуття: примірка, розміри та повернення",
      titleIsl: "Í fataverslun: Máta, stærðir og skilaréttur",
      level: "A2.1 (Viltu læra íslensku? Ep. 8)",
      sourceRef: "ÍFA 2 Kafli 2 & Viltu læra íslensku? Þáttur 8",
      duration: "16:00",
      bilingualRatio: "35% UA / 65% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "Купівля теплого одягу та дощовиків (lopapeysa, regnkápa, gönguskór). Як попросити інший розмір, знайти примірочну (mátunarklefi) та правила повернення товару за чеком (skilaréttur).",
      anchors: ["Má ég máta þetta? (Можна поміряти?)", "Ertu með stærri / minni stærð? (Маєте інший розмір?)", "Mátunarklefi (примірочна)", "Skilaréttur (право на обмін/повернення)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "В Ісландії є приказка: 'Það er ekki til vont veður, bara vondur fatnaður' (Немає поганої погоди, є лише поганий одяг). Як обрати правильні речі в Kringlan чи Smáralind?" },
        { speaker: "Guðrún", role: "Консультант магазину", text: "Góðan daginn! Get ég aðstoðað þig? Þessi úlpa er alveg vatnsheld og vindheld." },
        { speaker: "Поліна", role: "Покупчиня", text: "Já, takk. Má ég máta þessa úlpu? Hvar er mátunarklefinn? Og áttu hana til í stærð Medium?" },
        { speaker: "Guðrún", role: "Консультант магазину", text: "Mátunarklefarnir eru þarna vinstra megin. Og ef hún passar ekki hefurðu fjórtán daga skilarétt með kvittun." }
      ]
    },
    {
      ep: 12,
      id: "ep12_bilaverkstaedi_og_skodun",
      category: "health_transport",
      titleUkr: "На автосервісі: техогляд, шипована гума та ремонт",
      titleIsl: "Á bílaverkstæði: Aðalskoðun, negld dekk og viðgerðir",
      level: "A2.2 (Viltu læra íslensku? Ep. 17)",
      sourceRef: "ÍFA 2 Kafli 7 & Viltu læra íslensku? Þáttur 17",
      duration: "18:15",
      bilingualRatio: "35% UA / 65% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "Обслуговування автомобіля в Ісландії: щорічний техогляд (Aðalskoðun Frumherji/Tékkland), сезонна зміна гуми на шиповану (negld dekk) до 1 листопада, заміна мастила та ремонт гальм (bremsur).",
      anchors: ["Bílaverkstæði (автомайстерня)", "Aðalskoðun (державний техогляд)", "Negld dekk (шипована зимова гума)", "Bremsuklossar (гальмівні колодки)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Автомобіль в Ісландії — це питання виживання взимку. Кожен автомобіль проходить щорічний обов'язковий огляд — Aðalskoðun. Якщо на номерному знаку червона наліпка, у вас проблеми!" },
        { speaker: "Gunnar", role: "Автомеханік", text: "Góðan daginn! Hvað þarf að gera við bílinn? Er það skoðun eða heyrirðu eitthvað hljóð?" },
        { speaker: "Поліна", role: "Власниця авто", text: "Það er eitthvert skrítið hljóð þegar ég bremsa. Og svo þarf ég að skipta yfir á vetrardekk fyrir nóvember." },
        { speaker: "Gunnar", role: "Автомеханік", text: "Bremsuklossarnir eru slitnir. Við skiptum um þá og setjum bílinn á negld dekk. Ég hringi þegar hann er tilbúinn!" }
      ]
    },
    {
      ep: 13,
      id: "ep13_vinnumalastofnun_cv",
      category: "work",
      titleUkr: "Пошук роботи та Vinnumálastofnun: ісландське резюме та співбесіда",
      titleIsl: "Atvinnuleit: Ferilskrá (CV), Vinnumálastofnun og viðtal",
      level: "A2.2 (Viltu læra íslensku? Ep. 14)",
      sourceRef: "ÍFA 2 Kafli 6 & Viltu læra íslensku? Þáttur 14",
      duration: "19:00",
      bilingualRatio: "30% UA / 70% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "Як знайти роботу в Ісландії через портали Alfred.is та Vinnumálastofnun (VMST). Оформлення ісландського резюме (ferilskrá), вказівка рекомендацій (meðmælendur) та відповіді на типові питання співбесіди.",
      anchors: ["Ferilskrá (резюме / CV)", "Meðmælandi (рекомендавець)", "Atvinnuviðtal (співбесіда)", "Vinnumálastofnun (державна служба зайнятості)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "В ісландському резюме є один критичний пункт, без якого вас майже ніколи не візьмуть: Meðmælendur — контакти двох людей, які можуть підтвердити вашу чесність та працьовитість." },
        { speaker: "Guðrún", role: "HR менеджерка", text: "Góðan daginn! Velkomin í atvinnuviðtalið. Segðu mér aðeins frá fyrri reynslu þinni. Hvað hefur þú verið að gera?" },
        { speaker: "Поліна", role: "Кандидатка", text: "Ég hef unnið við þjónustustörf í tvö ár. Ég er stundvís, vinnusöm og á auðvelt með að vinna í hóp." },
        { speaker: "Guðrún", role: "HR менеджерка", text: "Frábært! Hér er talað bæði íslensku og ensku. Hvenær geturðu byrjað?" }
      ]
    },
    {
      ep: 14,
      id: "ep14_kaffistofan_tolumsaman",
      category: "work",
      titleUkr: "Кав'ярня на роботі Kaffistofa: неписаний кодекс колег",
      titleIsl: "Kaffistofan: Menning á vinnustað og létt spjall",
      level: "A2.1 (Tölum saman 2022 FA)",
      sourceRef: "Kennslubók: Tölum saman 2022 (Fræðslugátt)",
      duration: "17:30",
      bilingualRatio: "30% UA / 70% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "З книги 'Tölum saman 2022'. Перерва на каву (Kaffipása) о 10:00 та 15:00: як долучитися до розмови колег, етикет чергування біля кавоварки та посудомийки (ganga frá bolla), легкі теми для small talk.",
      anchors: ["Kaffistofa (кімната відпочинку/кухня)", "Má bjóða þér kaffi? (Пригостити кавою?)", "Ganga frá eftir sig (прибрати за собою чашку)", "Hvað ertu að gera um helgina? (Що робиш на вихідних?)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Kaffistofa — це серце будь-якої ісландської компанії. Тут вирішуються всі неофіційні питання, і саме тут зароджується довіра в колективі. Головне правило — завжди прибирати свою чашку в uppþvottavél!" },
        { speaker: "Gunnar", role: "Колега Свейнн", text: "Hæ! Viltu kaffi eða te? Við vorum einmitt að baka vöfflur í tilefni dagsins." },
        { speaker: "Поліна", role: "Співробітниця", text: "Já, takk, dásamlegt! Einn kaffibolla með smá mjólk. Hvernig gengur verkefnið hjá þér?" },
        { speaker: "Gunnar", role: "Колега Свейнн", text: "Það gengur bara vel, mikið að gera. Hvað eru plönin um helgina? Ætlarðu að skreppa í sveitina?" }
      ]
    },
    {
      ep: 15,
      id: "ep15_skoli_og_mentor",
      category: "culture_civic",
      titleUkr: "Школа та дитсадок: спілкування в додатку Mentor та батьківські збори",
      titleIsl: "Skóli og leikskóli: Mentor, veikindi barna og foreldrasamtal",
      level: "B1.1 (Viltu læra íslensku? Ep. 18)",
      sourceRef: "ÍFA 3 Kafli 4 & Viltu læra íslensku? Þáttur 18",
      duration: "18:40",
      bilingualRatio: "25% UA / 75% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "Шкільна та дошкільна система Ісландії (Leikskóli & Grunnskóli). Сповіщення про хворобу дитини через Mentor (Tilkynna veikindi), спілкування з класним керівником (Umsjónarkennari) та батьківські зустрічі.",
      anchors: ["InfoMentor / Mentor app", "Tilkynna forföll (повідомити про пропуск)", "Foreldraviðtal (індивідуальна бесіда з батьками)", "Nestisbox (ланчбокс для школи)"],
      script: [
        { speaker: "Поліна", role: "Мати", text: "Якщо дитина захворіла, ви зобов'язані до 08:30 ранку відмітити це в системі Mentor. Але як зателефонувати у дитсадок, якщо потрібна розмова з вихователем?" },
        { speaker: "Guðrún", role: "Вихователька leikskóli", text: "Góðan daginn. Leikskólinn Laugalækur. Hvernig get ég aðstoðað?" },
        { speaker: "Поліна", role: "Мати", text: "Góðan daginn. Ég er að hringja vegna drengsins míns, Alex. Hann er með hita í dag og verður heima." },
        { speaker: "Guðrún", role: "Вихователька leikskóli", text: "Þakka þér kærlega fyrir að láta vita. Vonandi batnar honum fljótt. Munið að hann þarf að vera hitalaus í einn sólarhring áður en hann kemur aftur." }
      ]
    },
    {
      ep: 16,
      id: "ep16_vegir_og_vedur",
      category: "health_transport",
      titleUkr: "Дороги та шторми: як читати Vedur.is, Vegagerðin та вижити на Ring Road",
      titleIsl: "Veður og færð: Vegagerðin, óveður og vetrarakstur",
      level: "A2.2 (Viltu læra íslensku? Ep. 20)",
      sourceRef: "ÍFA 2 Kafli 8 & Safetravel.is",
      duration: "19:20",
      bilingualRatio: "30% UA / 70% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "Зимовий рух кільцевою дорогою (Hringvegur 1). Попередження метеослужби (Gul / Appelsínugul / Rauð viðvörun), терміни стану доріг на Road.is (Greiðfært, Hálka, Snjóþekja, Ófært, Lokað) та контакти порятунку 112.",
      anchors: ["Gul viðvörun (жовте штормове попередження)", "Hálka (ожеледь)", "Ófært / Lokað (непроїзна / закрита дорога)", "Björgunarsveit (рятувальний загін Landsbjörg)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "В Ісландії є золоте правило далекобійників: ніколи не виїжджай з міста взимку, не відкривши vedur.is та umferdin.is! Якщо дорога 'Lokað' — це не рекомендація, це закритий шлагбаум." },
        { speaker: "Gunnar", role: "Рятувальник Landsbjörg", text: "Núna er appelsínugul viðvörun á Hellisheiði! Vindur er yfir þrjátíu metrar á sekúndu og blindbylur. Veginum hefur verið lokað." },
        { speaker: "Поліна", role: "Філолог", text: "Зверніть увагу на градацію стану доріг: 'greiðfært' (чиста дорога), 'hálkublettir' (плямами ожеледь), 'hálka' (суцільний лід), 'snjóþekja' (сніговий покрив), 'ófært' (непроїзно) і 'lokað' (рух закрито)!" }
      ]
    },
    {
      ep: 17,
      id: "ep17_skatturinn_og_kort",
      category: "work",
      titleUkr: "Податкова служба Skatturinn: Skattkort, податкові ступені та повернення",
      titleIsl: "Skatturinn: Persónuafsláttur, skattþrep og skattframtal",
      level: "B1.1 (ÍFA 3 & Ríkisskattstjóri)",
      sourceRef: "Skatturinn.is & ÍFA 3 Kafli 5",
      duration: "18:10",
      bilingualRatio: "25% UA / 75% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "Податкова система Ісландії: як активувати податкову картку (persónuafsláttur ~64.900 kr на місяць), щоб не переплачувати 31.45% податку з першої крони. Декларація доходів (Skattframtal) у березні та повернення податків (Endurgreiðsla).",
      anchors: ["Persónuafsláttur (особиста податкова знижка)", "Skattframtal (податкова декларація)", "Staðgreiðsla (податок біля джерела виплати)", "Endurgreiðsla skatts (повернення переплати)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Якщо ви при влаштуванні на роботу не сказали бухгалтеру 'Ég vil nýta persónuafsláttinn minn 100%', ви втратите майже 65 тисяч крон чистого доходу щомісяця!" },
        { speaker: "Guðrún", role: "Податковий консультант", text: "Persónuafsláttur er lögbundinn skattafsláttur. Hann dregst beint frá reiknuðum skatti í hverjum mánuði. Ef þú nýtir hann ekki, safnast hann upp." },
        { speaker: "Поліна", role: "Філолог", text: "У березні кожен мешканець заходить на skatturinn.is і перевіряє заповнену податкову декларацію — skattframtal. А в червні приходить повернення переплаченого — endurgreiðsla!" }
      ]
    },
    {
      ep: 18,
      id: "ep18_orlof_og_veikindi",
      category: "work",
      titleUkr: "Відпустка та лікарняні: твої непорушні трудові гарантії",
      titleIsl: "Orlof og veikindaréttur: Lög og réttindi launafólks",
      level: "B1.1 (Tölum saman & Kjarasamningar)",
      sourceRef: "ASÍ (Alþýðusamband Íslands) & Efling",
      duration: "17:40",
      bilingualRatio: "25% UA / 75% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "Правові норми відпусток в Ісландії: 24 робочі дні відпустки, накопичення відпускного фонду (Orlofsfé), виплата 1 травня, та оплачувані дні тимчасової непрацездатності (veikindaréttur) за наявності довідки (læknisvottorð).",
      anchors: ["Orlofsdagar (дні відпустки)", "Orlofssjóður (відпускний фонд)", "Veikindadagar (оплачувані лікарняні дні)", "Læknisvottorð (довідка від лікаря)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "1 травня — свято всіх працівників в Ісландії не лише через парад, а тому що на банківські рахунки виплачується нагромаджене за рік 'orlofsfé' (відпускні гроші)!" },
        { speaker: "Gunnar", role: "Профспілковий юрист", text: "Lágmarksorlof samkvæmt lögum eru tuttugu og fjórir virkir dagar á ári. Og veikindarétturinn eykst eftir því sem þú vinnur lengur hjá sama atvinnurekanda." },
        { speaker: "Поліна", role: "Філолог", text: "Пам'ятайте: якщо ви хворієте більше двох-трьох днів поспіль, працедавець має право вимагати офіційне медичне підтвердження — læknisvottorð, яке береться через Heilsuvera або у свого лікаря." }
      ]
    },
    {
      ep: 19,
      id: "ep19_hefdir_og_menning",
      category: "culture_civic",
      titleUkr: "Культура та свята: Þorrablót, 13 Йоласвейнарів та светр Lopapeysa",
      titleIsl: "Íslenskar hefðir: Þorrablót, jólasveinar og lopapeysa",
      level: "B1.2 (Viltu læra íslensku? Ep. 21)",
      sourceRef: "ÍFA 3 Kafli 8 & Viltu læra íslensku? Þáttur 21",
      duration: "21:00",
      bilingualRatio: "20% UA / 80% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "Занурення в ісландський національний характер. Зимове свято Þorrablót (традиційна їжа: hákarl — квашена акула, svið — бараняча голова, brennivín). 13 різдвяних бешкетників (jólasveinar) та національний вовняний светр Lopapeysa.",
      anchors: ["Þorrablót (старовинне свято середини зими)", "Hákarl og brennivín", "13 jólasveinar (йольські хлопці)", "Lopapeysa (в'язаний светр із вовни lopi)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "У січні-лютому настає місяць Торрі (Þorri), і вся країна збирається на бенкети Þorrablót. Це випробування не для слабких шлунків: ферментована акула hákarl із запахом аміаку!" },
        { speaker: "Gunnar", role: "Носій традицій", text: "Þetta er forfeðramatur okkar! Við borðum hákarl, svið og hrútspunga, og skola því niður með ísköldu Brennivíni. Þá finnur maður að maður er víkingur!" },
        { speaker: "Guðrún", role: "Носійка традицій", text: "En í desember koma þrettán jólasveinar ofan úr fjöllunum, einn af öðrum. Fyrsti kemur tólfta desember: Stekkjastaur! Börn setja skóinn í gluggann." },
        { speaker: "Поліна", role: "Філолог", text: "І головний символ тепла на острові — lopapeysa, в'язана з непряденої вовни lopi, яка містить унікальний водовідштовхувальний шар ланоліну." }
      ]
    },
    {
      ep: 20,
      id: "ep20_rikisborgararettur_prof",
      category: "culture_civic",
      titleUkr: "Іспит на громадянство Ісландії: структура, вимоги та секрети складання",
      titleIsl: "Íslenskupróf fyrir ríkisborgararétt: Kröfur, uppbygging og ráð",
      level: "B2 (Mímir & Menntamálastofnun)",
      sourceRef: "Mímir - símenntun & Menntamálastofnun ríkisborgararéttarpróf",
      duration: "22:15",
      bilingualRatio: "15% UA / 85% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "Повний розбір офіційного іспиту на громадянство (Íslenskupróf til ríkisborgararéttar), який двічі на рік проводить Mímir за стандартами Міністерства юстиції: 4 частини (hlustun — аудіювання, lestur — читання, ritun — письмове есе, tal — усне інтерв'ю).",
      anchors: ["Ríkisborgararéttarpróf (іспит на громадянство)", "Hlustunarskilningur (розуміння на слух)", "Ritunarverkefni (письмове завдання)", "Munnlegt viðtal (усна бесіда з екзаменатором)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Це кульмінація нашого академічного шляху. Для отримання паспорта Ісландії ви маєте скласти державний іспит у Mímir-símenntun. Яка структура і що вимагають екзаменатори?" },
        { speaker: "Guðrún", role: "Екзаменаторка Mímir", text: "Prófið skiptist í fjóra hluta: Hlustun (hlusta á stutt samtöl og fréttir), Lestur (skilja texta úr dagblöðum og tilkynningum), Ritun (skrifa bréf eða tölvupóst) og Tal (svara spurningum og lýsa mynd)." },
        { speaker: "Поліна", role: "Філолог", text: "Критерій оцінювання — не ідеальна відсутність акценту, а здатність вільно вирішувати життєві ситуації, вживати правильні часи дієслів та орієнтуватися у відмінках." },
        { speaker: "Gunnar", role: "Носій мови", text: "Ef þú hefur fylgt þessu námskeiði frá núlli til loka, þá ertu tilbúinn! Þú munt standast prófið með glæsibrag." }
      ]
    },
    {
      ep: 21,
      id: "ep21_framtid_og_velgengni",
      category: "culture_civic",
      titleUkr: "Фінал: Вільна інтеграція та життя в Ісландії без мовного бар'єру",
      titleIsl: "Framtíðin á Íslandi: Frjáls samskipti og samfélag",
      level: "B2+ (Свобода комунікації)",
      sourceRef: "Háskóli Íslands & Tungumálatorg",
      duration: "20:30",
      bilingualRatio: "10% UA / 90% IS",
      audioFile: null,
      fileStatus: "SCRIPT_READY",
      statusLabel: "📝 СЦЕНАРІЙ ЗАТВЕРДЖЕНО (ГОТОВИЙ ДО ЗАПИСУ)",
      situation: "Підсумковий випуск циклу. Перехід від адаптації до повного професійного та культурного життя в ісландському суспільстві, збереження рідної ідентичності та щира повага до мови Саг.",
      anchors: ["Að tala reiprennandi (говорити вільно)", "Vera virkur í samfélaginu (бути активним у суспільстві)", "Virðing fyrir tungumálinu (повага до мови)", "Gangi ykkur vel! (Успіхів усім!)"],
      script: [
        { speaker: "Остап", role: "Аналітик", text: "Ми пройшли шлях від розгубленості перед звуками [tl] і [kʰv] до розуміння законодавства, культури та живого спілкування без страху помилитися." },
        { speaker: "Gunnar", role: "Носій мови", text: "Þið hafið sýnt ótrúlegan dugnað. Að læra íslensku er lykillinn að hjörtum okkar Íslendinga. Þegar þið talið íslensku við okkur, þá opnast allar dyr." },
        { speaker: "Guðrún", role: "Носійка мови", text: "Kæru vinir frá Úkraínu, velkomin í okkar samfélag! Við óskum ykkur alls hins besta í framtíðinni á Íslandi." },
        { speaker: "Поліна", role: "Філолог", text: "Haltu áfram að æfa þig á hverjum degi, hlustaðu á útvarpið, talaðu við nágrannana, og mundu: tungumál er brú milli hjartna! Gangi ykkur vel!" }
      ]
    }
  ]
};
