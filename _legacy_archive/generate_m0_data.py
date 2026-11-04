import json
import os

m0_data = {
    "module_meta": {
        "id": "modull_0",
        "title_is": "Módúll 0: Stafrófið & Framburður",
        "title_uk": "Модуль 0: Ісландська абетка, фонологія та перше знайомство",
        "standard": "Árnastofnun / Bara tala / Drops / Ylhýra",
        "target_audience": "Україномовні студенти (A1 Grunnstig)",
        "theme": "Dark Obsidian & Warm Neon Cyberpunk",
        "version": "2.0-production"
    },
    "alphabet": [
        {
            "id": 1,
            "upper": "A",
            "lower": "a",
            "grapheme": "A a",
            "letter_name": "a",
            "letter_name_ipa": "[aː]",
            "ipa": "[a]",
            "ukrainian_mnemonic": "💧 Як крапля чистої криничної води: звичайний відкритий [а], як в українському слові «мама».",
            "articulation_guide": "Рот широко відкритий, спинка язика опущена внизу ротової порожнини, кінчик торкається нижніх різців.",
            "common_error": "Надмірне звуження рота або спроба огубити звук як англійське [ʌ]. В ісландській це завжди чистий відкритий [a].",
            "example_word": "Afi",
            "word_ipa": "[ˈaːvɪ]",
            "ukrainian_translation": "дідусь",
            "audio_file": "audio/a.mp3",
            "category": "monophthong",
            "has_acute": False
        },
        {
            "id": 2,
            "upper": "Á",
            "lower": "á",
            "grapheme": "Á á",
            "letter_name": "á",
            "letter_name_ipa": "[auː]",
            "ipa": "[au]",
            "ukrainian_mnemonic": "⚡ Знак наголосу тут змінює не гучність, а ЗВУК! Пам'ятай: «Á» кричить «АУ!», ніби наступив на гостру лаву.",
            "articulation_guide": "Швидкий плавний дифтонг: починається з широкого переднього [a] і миттєво ковзає в огублене [u].",
            "common_error": "Вимовляти як довге українське [а:]. Це фатальна помилка! «Á» — це завжди повноцінний дифтонг [au].",
            "example_word": "Á",
            "word_ipa": "[auː]",
            "ukrainian_translation": "річка / на (прийменник)",
            "audio_file": "audio/a_acute.mp3",
            "category": "diphthong",
            "has_acute": True
        },
        {
            "id": 3,
            "upper": "B",
            "lower": "b",
            "grapheme": "B b",
            "letter_name": "bé",
            "letter_name_ipa": "[pjɛː]",
            "ipa": "[p]",
            "ukrainian_mnemonic": "🛡️ Ісландське «B» — таємний брат «P»! Воно глухе й тверде, як базальтова скеля, без вібрації голосових зв'язок.",
            "articulation_guide": "Губи стуляються, як при українському [п], але без придиху (на відміну від ісландського 'P'). Зв'язки НЕ вібрують.",
            "common_error": "Дзвінка вібрація зв'язок як в українському «батько». В ісландській немає дзвінких проривних [b], [d], [g] — вони глухі [p], [t], [k]!",
            "example_word": "Bók",
            "word_ipa": "[pouːk]",
            "ukrainian_translation": "книга",
            "audio_file": "audio/b.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 4,
            "upper": "D",
            "lower": "d",
            "grapheme": "D d",
            "letter_name": "dé",
            "letter_name_ipa": "[tjɛː]",
            "ipa": "[t]",
            "ukrainian_mnemonic": "🪵 Стукає глухо, як сухий дубовий корінь. Звучить як глухе українське [т], без дзвінкості.",
            "articulation_guide": "Кінчик язика притискається до верхніх альвеол. Голосові зв'язки розімкнені (глухий альвеолярний проривний).",
            "common_error": "Дзвінка вимова [д]. Запам'ятайте: 'Dagur' звучить практично як [ˈtaːɣʏr].",
            "example_word": "Dagur",
            "word_ipa": "[ˈtaːɣʏr]",
            "ukrainian_translation": "день",
            "audio_file": "audio/d.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 5,
            "upper": "Ð",
            "lower": "ð",
            "grapheme": "Ð ð",
            "letter_name": "eð",
            "letter_name_ipa": "[ɛːθ]",
            "ipa": "[ð]",
            "ukrainian_mnemonic": "🧔 Літера-вікінг із перекресленою шапкою. Звучить як англійське 'th' у слові 'this' або 'weather'.",
            "articulation_guide": "Міжзубний фрикатив: кінчик язика м'яко висувається між верхніми й нижніми передніми зубами, повітря проходить із легким гудінням.",
            "common_error": "Вимовляти як звичайне українське [д]. Головне правило: 'Ð' НІКОЛИ не стоїть на початку ісландського слова!",
            "example_word": "Maður",
            "word_ipa": "[ˈmaːðʏr]",
            "ukrainian_translation": "людина / чоловік",
            "audio_file": "audio/ed.mp3",
            "category": "special_icelandic",
            "has_acute": False
        },
        {
            "id": 6,
            "upper": "E",
            "lower": "e",
            "grapheme": "E e",
            "letter_name": "e",
            "letter_name_ipa": "[ɛː]",
            "ipa": "[ɛ]",
            "ukrainian_mnemonic": "🥚 Короткий, чіткий відкритий звук, як перший склад у слові «екран» або розбите «egg» (яйце).",
            "articulation_guide": "Язик у передній позиції, куточки губ злегка розслаблені, нижня щелепа опущена трохи нижче, ніж для [і].",
            "common_error": "Пом'якшувати попередній приголосний (як у російській «е»). В ісландській приголосний перед 'e' лишається твердим!",
            "example_word": "Egg",
            "word_ipa": "[ɛkː]",
            "ukrainian_translation": "яйце",
            "audio_file": "audio/e.mp3",
            "category": "monophthong",
            "has_acute": False
        },
        {
            "id": 7,
            "upper": "É",
            "lower": "é",
            "grapheme": "É é",
            "letter_name": "é",
            "letter_name_ipa": "[jɛː]",
            "ipa": "[jɛ]",
            "ukrainian_mnemonic": "🪞 Літера самоусвідомлення: «Ég» означає «Я»! Звучить точнісінько як українське [є] в слові «Європа».",
            "articulation_guide": "Починається з язикового напівголосного глайду [j] і миттєво розкривається у відкритий [ɛ].",
            "common_error": "Вимовляти як чисте англійське або французьке [e]. Це повноцінне українське сполучення [йе / є].",
            "example_word": "Ég",
            "word_ipa": "[jɛːx]",
            "ukrainian_translation": "я (займенник 1 ос. одн.)",
            "audio_file": "audio/e_acute.mp3",
            "category": "diphthong",
            "has_acute": True
        },
        {
            "id": 8,
            "upper": "F",
            "lower": "f",
            "grapheme": "F f",
            "letter_name": "eff",
            "letter_name_ipa": "[ɛfː]",
            "ipa": "[f] / [v] / [p]",
            "ukrainian_mnemonic": "🦎 Літера-хамелеон: на початку — [f] (Fjall), між голосними — [v] (Hafa), а перед L/N вибухає як [p] (Afl, Hafnarfjörður)!",
            "articulation_guide": "На початку слова: верхні різці торкаються нижньої губи [f]. Між голосними переходить у дзвінке [v]. Перед l/n губи стуляються у проривний [p].",
            "common_error": "Вимовляти завжди як глухе [f]. Пам'ятайте, що в слові 'Hafna' звучить виразний звук [п]!",
            "example_word": "Fjall",
            "word_ipa": "[fjatl̥]",
            "ukrainian_translation": "гора",
            "audio_file": "audio/f.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 9,
            "upper": "G",
            "lower": "g",
            "grapheme": "G g",
            "letter_name": "ge",
            "letter_name_ipa": "[cɛː]",
            "ipa": "[k] / [c] / [ɣ] / [x]",
            "ukrainian_mnemonic": "🌀 Головний алхімік ісландської фонетики! Має 4 стани залежно від позиції в слові.",
            "articulation_guide": "На початку перед твердими — глухий [k]; перед м'якими голосними — піднебінне [c]; між голосними — м'яке українське [г/ɣ]; у кінці слова — [х].",
            "common_error": "Вимовляти скрізь як тверде українське дзвінке [ґ]. В ісландській звук 'g' надзвичайно пластичний.",
            "example_word": "Gata",
            "word_ipa": "[ˈkaːta]",
            "ukrainian_translation": "вулиця",
            "audio_file": "audio/g.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 10,
            "upper": "H",
            "lower": "h",
            "grapheme": "H h",
            "letter_name": "há",
            "letter_name_ipa": "[hauː]",
            "ipa": "[h]",
            "ukrainian_mnemonic": "🌬️ Теплий подих гейзера на морозі: чистий придиховий звук [h], як в українському «хата» або англійському «home».",
            "articulation_guide": "Голосова щілина злегка відкрита, повітря вільно виходить через гортань без вібрації зв'язок.",
            "common_error": "Хрипіти задньоязиковим твердим [х]. Звук має бути легким, повітряним і гортанним.",
            "example_word": "Hús",
            "word_ipa": "[huːs]",
            "ukrainian_translation": "будинок",
            "audio_file": "audio/h.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 11,
            "upper": "I",
            "lower": "i",
            "grapheme": "I i",
            "letter_name": "i",
            "letter_name_ipa": "[ɪː]",
            "ipa": "[ɪ]",
            "ukrainian_mnemonic": "🧊 Короткий і прохолодний відкритий звук, точно як українське наголошене [и] у слові «син» чи «мити».",
            "articulation_guide": "Язик піднятий високо, але рот розслаблений, звук відкритіший і коротший за українське [і].",
            "common_error": "Вимовляти як напружене довге [і:], плутаючи з літерою Í.",
            "example_word": "Ísland",
            "word_ipa": "[ˈistlant]",
            "ukrainian_translation": "Ісландія",
            "audio_file": "audio/i.mp3",
            "category": "monophthong",
            "has_acute": False
        },
        {
            "id": 12,
            "upper": "Í",
            "lower": "í",
            "grapheme": "Í í",
            "letter_name": "í",
            "letter_name_ipa": "[iː]",
            "ipa": "[iː]",
            "ukrainian_mnemonic": "🏔️ Гостра льодова бурулька (іскра)! Довгий, пронизливий і напружений звук [ііі], як в українському «ліс».",
            "articulation_guide": "Куточки губ розтягнуті в усмішці, середня спинка язика щільно притискається до твердого піднебіння.",
            "common_error": "Скорочувати до розслабленого [ɪ]. Пам'ятайте: 'Ís' (лід) звучить довго й дзвінко [iːs]!",
            "example_word": "Ís",
            "word_ipa": "[iːs]",
            "ukrainian_translation": "лід / морозиво",
            "audio_file": "audio/i_acute.mp3",
            "category": "monophthong",
            "has_acute": True
        },
        {
            "id": 13,
            "upper": "J",
            "lower": "j",
            "grapheme": "J j",
            "letter_name": "joð",
            "letter_name_ipa": "[jɔːθ]",
            "ipa": "[j]",
            "ukrainian_mnemonic": "🌱 Гнучкий і швидкий паросток: український звук [й], який поєднується з голосними у плавний акорд.",
            "articulation_guide": "Середня спинка язика наближається до твердого піднебіння, утворюючи вузьку щілину для дзвінкого ковзання.",
            "common_error": "Вимовляти як англійське дж [dʒ]. В ісландській це суто м'який звук [й].",
            "example_word": "Jú",
            "word_ipa": "[juː]",
            "ukrainian_translation": "так (ствердна відповідь на заперечне питання)",
            "audio_file": "audio/j.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 14,
            "upper": "K",
            "lower": "k",
            "grapheme": "K k",
            "letter_name": "ká",
            "letter_name_ipa": "[kʰauː]",
            "ipa": "[kʰ] / [cʰ]",
            "ukrainian_mnemonic": "☕ Горнятко пахучої кави (Kaffi) з сильним видихом пари! На початку слова завжди супроводжується потужним придихом [kʰ].",
            "articulation_guide": "Змикання задньої спинки язика з м'яким піднебінням розривається сильним поштовхом видихуваного повітря.",
            "common_error": "Сухий український [к] без повітряного струменя. Піднесіть долоню: ви маєте відчути теплий подих!",
            "example_word": "Kaffi",
            "word_ipa": "[ˈkʰafːɪ]",
            "ukrainian_translation": "кава",
            "audio_file": "audio/k.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 15,
            "upper": "L",
            "lower": "l",
            "grapheme": "L l",
            "letter_name": "ell",
            "letter_name_ipa": "[ɛlː]",
            "ipa": "[l] / [tl̥] / [l̥]",
            "ukrainian_mnemonic": "💡 Одинарне L — м'яке європейське світло лампи. Але обережно: подвійне «LL» — це вибуховий гейзер [tl]!",
            "articulation_guide": "Кінчик язика торкається верхніх ясен, струмінь повітря вільно обтікає язик з боків.",
            "common_error": "Вимовляти дуже тверде східнослов'янське [л] або пом'якшувати до [ль]. Це нейтральний альвеолярний звук.",
            "example_word": "Lampa",
            "word_ipa": "[ˈlamːpa]",
            "ukrainian_translation": "лампа",
            "audio_file": "audio/l.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 16,
            "upper": "M",
            "lower": "m",
            "grapheme": "M m",
            "letter_name": "emm",
            "letter_name_ipa": "[ɛmː]",
            "ipa": "[m]",
            "ukrainian_mnemonic": "🤱 Найтепліше слово у світі — «Mamma». Звучить абсолютно природно і рідно, як українське [м].",
            "articulation_guide": "Обидві губи щільно зімкнені, піднебінна завіска опущена, звук резонує в носовій порожнині.",
            "common_error": "Практично безпомилковий звук. Лише перед глухими p, t, k може частково оглушуватися.",
            "example_word": "Mamma",
            "word_ipa": "[ˈmamːa]",
            "ukrainian_translation": "мама",
            "audio_file": "audio/m.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 17,
            "upper": "N",
            "lower": "n",
            "grapheme": "N n",
            "letter_name": "enn",
            "letter_name_ipa": "[ɛnː]",
            "ipa": "[n] / [tn̥]",
            "ukrainian_mnemonic": "🏷️ Ім'я людини (Nafn). Одинарне N чисте, але після дифтонгів подвійне «NN» клацає як замок валізи [tn]!",
            "articulation_guide": "Кінчик язика впирається в альвеоли за верхніми зубами, повітря йде через ніс.",
            "common_error": "Забувати правило пре-назалізації: у слові 'steinn' звучить [steitn], а не просто довге [нн].",
            "example_word": "Nafn",
            "word_ipa": "[napn̥]",
            "ukrainian_translation": "ім'я / назва",
            "audio_file": "audio/n.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 18,
            "upper": "O",
            "lower": "o",
            "grapheme": "O o",
            "letter_name": "o",
            "letter_name_ipa": "[ɔː]",
            "ipa": "[ɔ]",
            "ukrainian_mnemonic": "⭕ Коротке відкрите коло: ісландське [ɔ], як у слові «часто» (Oft) або українському вигуку «ох!».",
            "articulation_guide": "Губи помірно округлені, язик відтягнутий назад, звук короткий і відкритий.",
            "common_error": "Вимовляти як дифтонг [ou] або закрите глибоке [у]. Дифтонгом є лише літера 'Ó'.",
            "example_word": "Oft",
            "word_ipa": "[ɔft]",
            "ukrainian_translation": "часто",
            "audio_file": "audio/o.mp3",
            "category": "monophthong",
            "has_acute": False
        },
        {
            "id": 19,
            "upper": "Ó",
            "lower": "ó",
            "grapheme": "Ó ó",
            "letter_name": "ó",
            "letter_name_ipa": "[ouː]",
            "ipa": "[ou]",
            "ukrainian_mnemonic": "🎭 Театральний вигук захоплення «ОУ!»: плавний ковзний дифтонг від округленого [о] до вузького [у].",
            "articulation_guide": "Починається з помірно відкритого [o] і завершується щільним огубленням на [u].",
            "common_error": "Вимовляти як звичайне довге монофтонгове [о:]. Це завжди чіткий дифтонг [ou].",
            "example_word": "Óskar",
            "word_ipa": "[ˈouskar]",
            "ukrainian_translation": "Оскар (чоловіче ім'я)",
            "audio_file": "audio/o_acute.mp3",
            "category": "diphthong",
            "has_acute": True
        },
        {
            "id": 20,
            "upper": "P",
            "lower": "p",
            "grapheme": "P p",
            "letter_name": "pé",
            "letter_name_ipa": "[pʰjɛː]",
            "ipa": "[pʰ]",
            "ukrainian_mnemonic": "✒️ Перо поета (Penni), яке ставить чорнильну крапку з дзвінким придихом і мікрохлопком губ!",
            "articulation_guide": "Губи щільно стискаються, повітряний тиск наростає і вибухає потужним струменем повітря [pʰ].",
            "common_error": "Слабкий звук без придиху, який ісландці сплутають з літерою B.",
            "example_word": "Penni",
            "word_ipa": "[ˈpʰɛnːɪ]",
            "ukrainian_translation": "ручка (для письма)",
            "audio_file": "audio/p.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 21,
            "upper": "R",
            "lower": "r",
            "grapheme": "R r",
            "letter_name": "err",
            "letter_name_ipa": "[ɛrː]",
            "ipa": "[r] / [r̥]",
            "ukrainian_mnemonic": "🌧️ Справжній північний дощ (Rigning): дзвінке, бадьоре й чітке гуркотіння кінчика язика!",
            "articulation_guide": "Кінчик язика активно вібрує біля альвеол. Перед глухими звуками та в кінці слів часто стає глухим шепітним [r̥].",
            "common_error": "Горлове гаркаве французьке або німецьке [ʁ]. В ісландській язик вібрує виключно спереду, як в українській!",
            "example_word": "Rigning",
            "word_ipa": "[ˈrɪkniŋk]",
            "ukrainian_translation": "дощ",
            "audio_file": "audio/r.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 22,
            "upper": "S",
            "lower": "s",
            "grapheme": "S s",
            "letter_name": "ess",
            "letter_name_ipa": "[ɛsː]",
            "ipa": "[s]",
            "ukrainian_mnemonic": "☀️ Яскраве сонце над фіордом (Sól). В ісландській воно ЗАВЖДИ глухе, сухе і свистяче, ніколи не дзвенить як [з]!",
            "articulation_guide": "Кінчик язика за нижніми різцями або біля альвеол, струмінь повітря вузький і пронизливий.",
            "common_error": "Озвінчувати між голосними як в англійській або німецькій ('rose' ➔ [z]). В ісландській 'S' завжди лишається [s].",
            "example_word": "Sól",
            "word_ipa": "[souːl]",
            "ukrainian_translation": "сонце",
            "audio_file": "audio/s.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 23,
            "upper": "T",
            "lower": "t",
            "grapheme": "T t",
            "letter_name": "té",
            "letter_name_ipa": "[tʰjɛː]",
            "ipa": "[tʰ]",
            "ukrainian_mnemonic": "🙏 Найважливіше слово ввічливості: «Takk» (дякую)! Починається з сильного придихового удару язика.",
            "articulation_guide": "Кінчик язика впирається у верхні альвеоли й відскакує з різким виходом повітряного струменя [tʰ].",
            "common_error": "Вимовляти слабко, як українське [т] без подиху, через що слово звучить нерозбірливо для ісландців.",
            "example_word": "Takk",
            "word_ipa": "[tʰahk]",
            "ukrainian_translation": "дякую",
            "audio_file": "audio/t.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 24,
            "upper": "U",
            "lower": "u",
            "grapheme": "U u",
            "letter_name": "u",
            "letter_name_ipa": "[ʏː]",
            "ipa": "[ʏ]",
            "ukrainian_mnemonic": "🐑 М'яка ісландська вовна (Ull). Унікальний звук: округліть губи як для [о], але спробуйте вимовити українське [и]!",
            "articulation_guide": "Передній/середній огублений голосний. Схожий на німецьке [ü] у слові 'Hütte' або французьке [y].",
            "common_error": "Вимовляти як звичайне українське глибоке [у]. Це кардинально спотворює ісландські слова!",
            "example_word": "Ull",
            "word_ipa": "[ʏtl̥]",
            "ukrainian_translation": "вовна / шерсть",
            "audio_file": "audio/u.mp3",
            "category": "monophthong",
            "has_acute": False
        },
        {
            "id": 25,
            "upper": "Ú",
            "lower": "ú",
            "grapheme": "Ú ú",
            "letter_name": "ú",
            "letter_name_ipa": "[uː]",
            "ipa": "[uː]",
            "ukrainian_mnemonic": "🚪 Шлях назовні (Út)! Ось тут нарешті живе справжнє, глибоке, густе українське [ууу] з напруженими губами.",
            "articulation_guide": "Язик сильно відтягнутий назад, губи витягнуті у вузьку трубочку, звук довгий і монолітний.",
            "common_error": "Плутати просте 'U' [ʏ] та 'Ú' [u:]. Запам'ятайте: Ú — це глибоке совине [у:], а U — м'яке переднє [ю/и].",
            "example_word": "Út",
            "word_ipa": "[uːt]",
            "ukrainian_translation": "назовні / геть",
            "audio_file": "audio/u_acute.mp3",
            "category": "monophthong",
            "has_acute": True
        },
        {
            "id": 26,
            "upper": "V",
            "lower": "v",
            "grapheme": "V v",
            "letter_name": "vaff",
            "letter_name_ipa": "[vafː]",
            "ipa": "[v]",
            "ukrainian_mnemonic": "🌊 Чиста джерельна вода (Vatn). Звучить м'яко й співуче, як дзвінке українське [в].",
            "articulation_guide": "Нижня губа легко торкається верхніх різців, голосові зв'язки вібрують без надмірного тертя.",
            "common_error": "Вимовляти як англійське губно-губне [w]. В ісландській це завжди чіткий губно-зубний [v].",
            "example_word": "Vatn",
            "word_ipa": "[vahtn̥]",
            "ukrainian_translation": "вода",
            "audio_file": "audio/v.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 27,
            "upper": "X",
            "lower": "x",
            "grapheme": "X x",
            "letter_name": "ex",
            "letter_name_ipa": "[ɛks]",
            "ipa": "[ks]",
            "ukrainian_mnemonic": "🐟 Сріблястий дикий лосось (Lax). Буква звучить як компактне, швидке глухе сполучення [кс].",
            "articulation_guide": "Миттєвий перехід від задньоязикового проривного [k] до свистячого щілинного [s].",
            "common_error": "Озвінчувати у [ґз] перед голосними. Звук завжди залишається виключно глухим [кс].",
            "example_word": "Lax",
            "word_ipa": "[laks]",
            "ukrainian_translation": "лосось / сьомга",
            "audio_file": "audio/x.mp3",
            "category": "consonant",
            "has_acute": False
        },
        {
            "id": 28,
            "upper": "Y",
            "lower": "y",
            "grapheme": "Y y",
            "letter_name": "ufsilon y",
            "letter_name_ipa": "[ˈʏfsɪlɔn ɪː]",
            "ipa": "[ɪ]",
            "ukrainian_mnemonic": "👯 Фонетичний близнюк літери I: пишеться по-іншому, але звучить АБСОЛЮТНО так само — короткий відкритий [ɪ]!",
            "articulation_guide": "Точно такий самий уклад, як і для простого 'I': короткий відкритий передній звук [ɪ].",
            "common_error": "Намагатися вимовити по-німецьки як [ü]. В сучасній ісландській мові 'Y' повністю злилася за звучанням з 'I'!",
            "example_word": "Einkunn",
            "word_ipa": "[ˈeiŋkʏnː]",
            "ukrainian_translation": "оцінка / бал",
            "audio_file": "audio/y.mp3",
            "category": "monophthong",
            "has_acute": False
        },
        {
            "id": 29,
            "upper": "Ý",
            "lower": "ý",
            "grapheme": "Ý ý",
            "letter_name": "ufsilon ý",
            "letter_name_ipa": "[ˈʏfsɪlɔn iː]",
            "ipa": "[iː]",
            "ukrainian_mnemonic": "🐟 Близнюк літери Í: улюблена ісландська риба пікша (Ýsa). Звучить як довгий напружений звук [iː].",
            "articulation_guide": "Ідентичний артикуляції 'Í': розтягнуті губи, високий підйом язика, довгий співучий тон [iː].",
            "common_error": "Плутати з короткою 'Y'. Пам'ятайте: гостра риска (broddur) завжди робить звук напруженим і довгим [iː].",
            "example_word": "Ýsa",
            "word_ipa": "[ˈiːsa]",
            "ukrainian_translation": "пікша (риба родини тріскових)",
            "audio_file": "audio/y_acute.mp3",
            "category": "monophthong",
            "has_acute": True
        },
        {
            "id": 30,
            "upper": "Þ",
            "lower": "þ",
            "grapheme": "Þ þ",
            "letter_name": "þorn",
            "letter_name_ipa": "[θɔrtn̥]",
            "ipa": "[θ]",
            "ukrainian_mnemonic": "👑 Гордий трон давніх королів! Буква рунічного походження. Звучить як глухе англійське 'th' у слові 'thing' або 'think'.",
            "articulation_guide": "Кінчик язика між передніми зубами, видихається чисте глухе повітря без вібрації зв'язок.",
            "common_error": "Вимовляти як тверде [т] чи [п]. Залізне правило: 'Þ' зустрічається ТІЛЬКИ на початку слів або коренів!",
            "example_word": "Þing",
            "word_ipa": "[θiŋk]",
            "ukrainian_translation": "парламент / збори (Альтинг)",
            "audio_file": "audio/thorn.mp3",
            "category": "special_icelandic",
            "has_acute": False
        },
        {
            "id": 31,
            "upper": "Æ",
            "lower": "æ",
            "grapheme": "Æ æ",
            "letter_name": "æ",
            "letter_name_ipa": "[aiː]",
            "ipa": "[ai]",
            "ukrainian_mnemonic": "🎯 Стріла наміру: «Ætla» (мати намір)! Широкий, відкритий, життєствердний дифтонг [АЙ!].",
            "articulation_guide": "Починається з широкого відкритого [a] і динамічно переходить у передній високий напівголосний [i].",
            "common_error": "Вимовляти як англійське коротке 'cat' [æ] або скандинавське [ɛ]. В ісландській це завжди повний дифтонг [ai]!",
            "example_word": "Ætla",
            "word_ipa": "[ˈaihtla]",
            "ukrainian_translation": "мати намір / планувати",
            "audio_file": "audio/ae.mp3",
            "category": "diphthong",
            "has_acute": False
        },
        {
            "id": 32,
            "upper": "Ö",
            "lower": "ö",
            "grapheme": "Ö ö",
            "letter_name": "ö",
            "letter_name_ipa": "[œː]",
            "ipa": "[œ]",
            "ukrainian_mnemonic": "⏳ Вікно в минулі епохи й століття (Öld). Дві крапки над O перетворюють його на відкритий звук, схожий на німецьке [ö] у 'Köpfe'.",
            "articulation_guide": "Відкритий передній огублений звук: рот відкритий на позицію [е], але губи округлені в кільце як для [о].",
            "common_error": "Вимовляти як російське м'яке йотування [йо]. В ісландській немає початкового [й], це чистий монофтонг [œ].",
            "example_word": "Öld",
            "word_ipa": "[œlt]",
            "ukrainian_translation": "століття / епоха",
            "audio_file": "audio/o_umlaut.mp3",
            "category": "monophthong",
            "has_acute": False
        }
    ],
    "raddstafir_classification": {
        "accent_semantic_rule": {
            "title": "Семантичний закон гострого наголосу (Broddur / Komma)",
            "explanation": "В ісландській мові діакритичний знак (´) над голосними НЕ є знаком силового наголосу (наголос в ісландській ЗАВЖДИ на першому складі слова: Hljóðáhersla er alltaf á fyrsta atkvæði!). Гострий знак позначає принципово іншу фонему — перехід монофтонга у відкритий дифтонг або зміну якості голосного з ненапруженого на довгий напружений.",
            "rule_tag": "Áhersla á fyrsta atkvæði (Наголос завжди на 1-му складі)"
        },
        "pure_monophthongs": [
            {"letter": "A a", "ipa": "[a]", "desc": "Чистий відкритий [а] (Afi)"},
            {"letter": "E e", "ipa": "[ɛ]", "desc": "Короткий відкритий [е] (Egg)"},
            {"letter": "I i / Y y", "ipa": "[ɪ]", "desc": "Відкритий ненапружений звук [и] (Ísland, Einkunn)"},
            {"letter": "O o", "ipa": "[ɔ]", "desc": "Короткий помірно огублений [о] (Oft)"},
            {"letter": "U u", "ipa": "[ʏ]", "desc": "Передньо-огублений [ю-и] (Ull)"},
            {"letter": "Ö ö", "ipa": "[œ]", "desc": "Відкритий передньо-огублений [е-о] (Öld)"}
        ],
        "diphthongs_and_long": [
            {"letter": "Á á", "ipa": "[au]", "desc": "Дифтонг [ау] (Á) замість монофтонга [a]"},
            {"letter": "É é", "ipa": "[jɛ]", "desc": "Йотований дифтонг [йе] (Ég) замість монофтонга [ɛ]"},
            {"letter": "Í í / Ý ý", "ipa": "[iː]", "desc": "Довгий напружений звук [і:] (Ís, Ýsa) замість короткого [ɪ]"},
            {"letter": "Ó ó", "ipa": "[ou]", "desc": "Дифтонг [оу] (Óskar) замість монофтонга [ɔ]"},
            {"letter": "Ú ú", "ipa": "[uː]", "desc": "Глибокий напружений монофтонг [у:] (Út) замість переднього [ʏ]"},
            {"letter": "Æ æ", "ipa": "[ai]", "desc": "Широкий відкритий дифтонг [ай] (Ætla)"},
            {"letter": "Au / Ey", "ipa": "[œy] / [ei]", "desc": "Комплексні дифтонги: Au ➔ [œy] (laust), Ey/Ei ➔ [ei] (einn)"}
        ],
        "contrastive_pairs": [
            {"base": "A [a]", "accented": "Á [au]", "contrast_example": "Afi [ˈaːvɪ] (дідусь) vs Á [auː] (річка)"},
            {"base": "E [ɛ]", "accented": "É [jɛ]", "contrast_example": "Egg [ɛkː] (яйце) vs Ég [jɛːx] (я)"},
            {"base": "I [ɪ]", "accented": "Í [iː]", "contrast_example": "Is [ɪs] (пхе!) vs Ís [iːs] (лід)"},
            {"base": "O [ɔ]", "accented": "Ó [ou]", "contrast_example": "Oft [ɔft] (часто) vs Óskar [ˈouskar] (Оскар)"},
            {"base": "U [ʏ]", "accented": "Ú [uː]", "contrast_example": "Ull [ʏtl̥] (вовна) vs Út [uːt] (назовні)"},
            {"base": "Y [ɪ]", "accented": "Ý [iː]", "contrast_example": "Ytri [ˈɪtrɪ] (зовнішній) vs Ýsa [ˈiːsa] (пікша)"}
        ]
    },
    "acoustic_traps": {
        "preaspiration": {
            "name_is": "Aðblástur (Преаспірація)",
            "rule": "Перед здвоєними глухими вибуховими pp, tt, kk утворюється мікропауза з сильним гортанним видихом повітря [h]. Перший звук фактично заміщується видихом!",
            "ipa_symbol": "[hC]",
            "diagram": "Голосний ➔ [h] подих гортані ➔ Глухий проривний [p / t / k]",
            "examples": [
                {"word": "Takk", "ipa": "[tʰahk]", "meaning": "дякую", "trap_note": "Не [такк], а виразне [та-гк]"},
                {"word": "Stopp", "ipa": "[stɔhp]", "meaning": "зупинка", "trap_note": "Замість подвоєння [пп] звучить видих [h] перед коротким [p]"},
                {"word": "Drottning", "ipa": "[ˈtrɔhtniŋk]", "meaning": "королева", "trap_note": "Преаспірація перед tt"}
            ]
        },
        "lateral_explosion": {
            "name_is": "Hliðarsprenging & Pre-nasalization (ll ➔ [tl], nn ➔ [tn])",
            "rule": "Буквосполучення 'll' майже завжди вибухає як боковий [tl]. Буквосполучення 'nn' переходить у пре-носовий [tn] ЛИШЕ після наголошених дифтонгів або довгих голосних (á, é, í, ó, ú, ý, æ, ei, ey). Після простих коротких голосних лишається [nn]!",
            "ipa_symbol": "[tl̥] / [tn̥]",
            "diagram": "Дифтонг + LL ➔ [tl] | Дифтонг + NN ➔ [tn] | Короткий монофтонг + NN ➔ [nn]",
            "examples": [
                {"word": "Fjall", "ipa": "[fjatl̥]", "meaning": "гора", "trap_note": "ll перетворюється на вибухове глухе [tl]"},
                {"word": "Steinn", "ipa": "[steitn̥]", "meaning": "камінь", "trap_note": "після дифтонга 'ei' подвійне nn переходить у [tn]"},
                {"word": "Vinna", "ipa": "[ˈvɪnːa]", "meaning": "працювати", "trap_note": "після короткого монофтонга 'i' звучить звичайне довге [nn]!"}
            ]
        },
        "interdentals": {
            "name_is": "Tannhljóð (Міжзубні правила: Þorn vs Eð)",
            "rule": "Суворе позиційне розмежування: літера Þorn [θ] вживається ТІЛЬКИ на початку слів (глухий міжзубний). Літера Eð [ð] вживається ТІЛЬКИ в середині або наприкінці слів (дзвінкий міжзубний). Жодне ісландське слово не починається з Ð і не закінчується на Þ!",
            "ipa_symbol": "Початок: [θ] | Середина/Кінець: [ð]",
            "diagram": "#_ Þ- [θ] (глухе think) <===> -Ð- / -Ð# [ð] (дзвінке this)",
            "examples": [
                {"word": "Þing", "ipa": "[θiŋk]", "meaning": "парламент", "trap_note": "Тільки на початку [θ]"},
                {"word": "Maður", "ipa": "[ˈmaːðʏr]", "meaning": "чоловік / людина", "trap_note": "Усередині слова між голосними [ð]"},
                {"word": "Blað", "ipa": "[plaːð]", "meaning": "газета / аркуш", "trap_note": "У кінці слова [ð]"}
            ]
        },
        "labiovelars_and_f_clusters": {
            "name_is": "Labiovelars & F-klasar (hv ➔ [kv], fn/fl ➔ [pn]/[pl])",
            "rule": "1) Буквосполучення 'hv' у літературній нормі звучить як [kv]. 2) Літера 'f' перед приголосними 'n' та 'l' мутує в глухий губний [p]! 3) Між голосними 'f' переходить у дзвінке [v].",
            "ipa_symbol": "hv ➔ [kv] | fn ➔ [pn] | fl ➔ [pl]",
            "diagram": "hv- ➔ [kv] | -fn- ➔ [pn] | -fl- ➔ [pl] | V_V -f- ➔ [v]",
            "examples": [
                {"word": "Hvað", "ipa": "[kʰvaːð]", "meaning": "що?", "trap_note": "Починається з [kv], а не [hv] чи [w]"},
                {"word": "Nafn", "ipa": "[napn̥]", "meaning": "ім'я", "trap_note": "Буква f перед n звучить чітко як [p]"},
                {"word": "Keflavík", "ipa": "[ˈcʰɛplaˌviːk]", "meaning": "Кеплавік", "trap_note": "fl переходить у [pl]"}
            ]
        },
        "g_states": {
            "name_is": "Fjögur gervi G (4 позиційні стани літери G)",
            "rule": "1. На початку перед a, o, u, á, ó, ú ➔ глухий [k] (Gata). 2. На початку перед e, i, í, y, ý, æ ➔ м'який піднебінний [c] (Gefa). 3. Між голосними ➔ м'який щілинний [ɣ] (Saga). 4. У кінці слова після голосного ➔ глухий велярний фрикатив [x] (Ég, Dag).",
            "ipa_symbol": "[k] / [c] / [ɣ] / [x]",
            "diagram": "G_back [k] | G_front [c] | V_G_V [ɣ] | V_G# [x]",
            "examples": [
                {"word": "Gata", "ipa": "[ˈkaːta]", "meaning": "вулиця", "trap_note": "Стан 1: глухий твердий проривний [k]"},
                {"word": "Gefa", "ipa": "[ˈcɛːva]", "meaning": "давати", "trap_note": "Стан 2: піднебінний проривний [c]"},
                {"word": "Saga", "ipa": "[ˈsaːɣa]", "meaning": "історія / сага", "trap_note": "Стан 3: між голосними м'яке українське [г]"},
                {"word": "Ég", "ipa": "[jɛːx]", "meaning": "я", "trap_note": "Стан 4: на кінці слова переходить у [х]"}
            ]
        }
    },
    "minimal_pairs": [
        {
            "id": "pair_1",
            "title": "Довгий напружений [iː] vs Короткий відкритий [ɪ]",
            "trap_type": "Vowel Length & Tension (Напруженість голосного)",
            "word_a": {
                "word": "Ís",
                "ipa": "[iːs]",
                "meaning": "лід / морозиво",
                "audio": "audio/i_acute.mp3",
                "duration_ms": 380,
                "wave_color": "#00E5FF",
                "acoustic_desc": "Високий напружений пік форманти F2 (~2500 Гц), тривалість 380 мс."
            },
            "word_b": {
                "word": "Is",
                "ipa": "[ɪs]",
                "meaning": "вигук невдоволення (пхе!)",
                "audio": "audio/i.mp3",
                "duration_ms": 190,
                "wave_color": "#FFD600",
                "acoustic_desc": "Короткий розслаблений сигнал (190 мс), централізована форманта."
            },
            "pedagogical_insight": "В ісландській мові довжина й напруженість голосного змінюють значення слова. В слові 'Ís' язик піднятий максимально високо, звук напружений і вдвічі довший."
        },
        {
            "id": "pair_2",
            "title": "Одинарний проривний vs Преаспірація [h]",
            "trap_type": "Preaspiration [h] (Гортанний видих)",
            "word_a": {
                "word": "Taka",
                "ipa": "[ˈtʰaːka]",
                "meaning": "брати / приймати",
                "audio": "audio/t.mp3",
                "duration_ms": 420,
                "wave_color": "#00E676",
                "acoustic_desc": "Чиста гладка вокальна інтервокальна зона без гортанного шуму."
            },
            "word_b": {
                "word": "Takk",
                "ipa": "[tʰahk]",
                "meaning": "дякую",
                "audio": "audio/t.mp3",
                "duration_ms": 310,
                "wave_color": "#FF0055",
                "acoustic_desc": "Шумовий сплеск гортанного шуму [h] (50-70 мс) перед розмиканням [k]."
            },
            "pedagogical_insight": "У 'taka' голосний [aː] довгий, а [k] одинарний. У 'takk' голосний короткий, після нього виникає виразний видих [h], що закриває склад."
        },
        {
            "id": "pair_3",
            "title": "Довгий дифтонг vs Преаспірований короткий склад",
            "trap_type": "Preaspiration & Duration in Stems",
            "word_a": {
                "word": "Bát",
                "ipa": "[pauːt]",
                "meaning": "човен (знахідний відмінок)",
                "audio": "audio/b.mp3",
                "duration_ms": 440,
                "wave_color": "#00E5FF",
                "acoustic_desc": "Довгий стабільний дифтонг [auː] тривалістю ~300 мс перед поодиноким [t]."
            },
            "word_b": {
                "word": "Bátt",
                "ipa": "[pauht]",
                "meaning": "човничок / стягнена форма",
                "audio": "audio/b.mp3",
                "duration_ms": 280,
                "wave_color": "#FF2A6D",
                "acoustic_desc": "Скорочений дифтонг [au] + різка пауза преаспірації [h] перед [t]."
            },
            "pedagogical_insight": "Подвоєння приголосного 'tt' призводить до скорочення попереднього голосного та вставки гортанного [h]."
        },
        {
            "id": "pair_4",
            "title": "Одинарний латеральний [l] vs Боковий вибух [tl]",
            "trap_type": "Lateral Explosion (Hliðarsprenging)",
            "word_a": {
                "word": "Fela",
                "ipa": "[ˈfɛːla]",
                "meaning": "ховати",
                "audio": "audio/l.mp3",
                "duration_ms": 390,
                "wave_color": "#FFD600",
                "acoustic_desc": "Плавний безперервний боковий тон без клацання язика."
            },
            "word_b": {
                "word": "Fella",
                "ipa": "[ˈfɛtla]",
                "meaning": "рубати / скидати",
                "audio": "audio/l.mp3",
                "duration_ms": 340,
                "wave_color": "#00E5FF",
                "acoustic_desc": "Чіткий альвеолярний замикаючий клацальний сплеск [t] перед виходом через боки [l]."
            },
            "pedagogical_insight": "Одинарне 'l' звучить плавно, а подвійне 'll' розкривається гострим вибуховим переходом [tl]."
        },
        {
            "id": "pair_5",
            "title": "Чистий носовий [n] vs Пре-назалізований прорив [tn]",
            "trap_type": "Pre-nasalization (nn після дифтонга)",
            "word_a": {
                "word": "Skína",
                "ipa": "[ˈsciːna]",
                "meaning": "світити / сяяти",
                "audio": "audio/n.mp3",
                "duration_ms": 410,
                "wave_color": "#00E676",
                "acoustic_desc": "Плавна носова сонорна резонансна лінія."
            },
            "word_b": {
                "word": "Steinn",
                "ipa": "[steitn̥]",
                "meaning": "камінь",
                "audio": "audio/s.mp3",
                "duration_ms": 360,
                "wave_color": "#FF5E00",
                "acoustic_desc": "Дифтонг [ei] раптово перекривається змичкою [t] перед глухим носовим [n̥]."
            },
            "pedagogical_insight": "Після дифтонга 'ei' сполучення 'nn' не подовжується, а отримує приголосну змичку [tn]."
        },
        {
            "id": "pair_6",
            "title": "Монофтонг [ɛ] vs Йотований дифтонг [jɛ]",
            "trap_type": "Vowel Quality: E vs É",
            "word_a": {
                "word": "Feta",
                "ipa": "[ˈfɛːta]",
                "meaning": "ступати / робити крок",
                "audio": "audio/e.mp3",
                "duration_ms": 350,
                "wave_color": "#00E5FF",
                "acoustic_desc": "Рівний відкритий фронтальний монофтонг [ɛ]."
            },
            "word_b": {
                "word": "Féta",
                "ipa": "[ˈfjɛːta]",
                "meaning": "розщеплювати",
                "audio": "audio/e_acute.mp3",
                "duration_ms": 400,
                "wave_color": "#B026FF",
                "acoustic_desc": "Висхідний глайд напівголосного [j] тривалістю ~90 мс перед [ɛ]."
            },
            "pedagogical_insight": "Значок (´) над É створює повноцінне йотування [jɛ], тоді як E є монофтонгом без жодного йотування."
        }
    ],
    "dialogue_and_pragmatics": {
        "title": "Að kynnast: Samtal milli Jóns og Önnu (Знайомство)",
        "context": "Перша автентична розмова в Рейк'явіку: вітання з урахуванням статі співрозмовника, країни походження з давальним відмінком (ÞGF) та ісландська система імен по батькові.",
        "dialogue_lines": [
            {
                "id": 1,
                "speaker": "Jón",
                "gender": "male",
                "avatar": "👨",
                "is_text": "Sæll! Hvað heitir þú?",
                "ipa": "[saitl̥! kʰvaːð ˈheiːtɪr θuː?]",
                "uk_text": "Вітаю! Як тебе звати?",
                "pragmatic_note": "Jón вітається словом 'Sæll' [saitl], бо звертається до чоловічої статі за замовчуванням у загальній формулі або наближаючись до незнайомця.",
                "audio_cue": "Sæll! Hvað heitir þú?"
            },
            {
                "id": 2,
                "speaker": "Anna",
                "gender": "female",
                "avatar": "👩",
                "is_text": "Sæl! Ég heiti Anna. Hvaðan ert þú?",
                "ipa": "[sail! jɛːx ˈheiːtɪ ˈanːa. ˈkʰvaːðan ɛr̥t θuː?]",
                "uk_text": "Вітаю! Мене звати Анна. Звідки ти?",
                "pragmatic_note": "Anna відповідає формою 'Sæl' [sail] з ОДНИМ 'l', тому що Jón — чоловік, а відповідь адресована саме йому (жіноча форма вітання: Sæl!).",
                "audio_cue": "Sæl! Ég heiti Anna. Hvaðan ert þú?"
            },
            {
                "id": 3,
                "speaker": "Jón",
                "gender": "male",
                "avatar": "👨",
                "is_text": "Ég er frá Íslandi. En þú?",
                "ipa": "[jɛːx ɛr̥ frauː ˈistlantɪ. ɛn θuː?]",
                "uk_text": "Я з Ісландії. А ти?",
                "pragmatic_note": "Прийменник 'frá' (з/від) вимагає давального відмінка (Þágufall / ÞGF 🟡): Ísland ➔ frá Íslandi (+i).",
                "audio_cue": "Ég er frá Íslandi. En þú?"
            },
            {
                "id": 4,
                "speaker": "Anna",
                "gender": "female",
                "avatar": "👩",
                "is_text": "Ég er frá Úkraínu. Gaman að hitta þig!",
                "ipa": "[jɛːx ɛr̥ frauː ˈuːkraiːnʏ. ˈkaːman að ˈhɪhta θɪx!]",
                "uk_text": "Я з України. Дуже приємно познайомитися!",
                "pragmatic_note": "Úkraína в давальному відмінку після frá змінює закінчення -a на -u: frá Úkraínu 🟡. 'Gaman að hitta þig' містить преаспірацію в 'hitta' [hɪhta].",
                "audio_cue": "Ég er frá Úkraínu. Gaman að hitta þig!"
            },
            {
                "id": 5,
                "speaker": "Jón",
                "gender": "male",
                "avatar": "👨",
                "is_text": "Sömuleiðis! Hvað heitir faðir þinn?",
                "ipa": "[ˈsœːmʏˌleiːðɪs! kʰvaːð ˈheiːtɪr ˈfaːðɪr θɪnː?]",
                "uk_text": "Навзаєм! Як звати твого батька?",
                "pragmatic_note": "'Sömuleiðis' — найпоширеніша ісландська ввічлива відповідь («так само / мені теж»).",
                "audio_cue": "Sömuleiðis! Hvað heitir faðir þinn?"
            },
            {
                "id": 6,
                "speaker": "Anna",
                "gender": "female",
                "avatar": "👩",
                "is_text": "Hann heitir Pétur, svo ég er Pétursdóttir.",
                "ipa": "[hanː ˈheiːtɪr ˈpʰjɛːtʏr, svɔ jɛːx ɛr̥ ˈpʰjɛːtʏrsˌtouhtɪr.]",
                "uk_text": "Його звати Петро, тому я — Петрівна (Pétursdóttir).",
                "pragmatic_note": "Ісландське ім'я по батькові: ім'я батька в родовому відмінку (Pétur ➔ Péturs) + частка dóttir (донька) з обов'язковою преаспірацією [touhtɪr]!",
                "audio_cue": "Hann heitir Pétur, svo ég er Pétursdóttir."
            },
            {
                "id": 7,
                "speaker": "Jón",
                "gender": "male",
                "avatar": "👨",
                "is_text": "Faðir minn heitir Einar, svo ég heiti Jón Einarsson. Velkomin til Íslands!",
                "ipa": "[ˈfaːðɪr mɪnː ˈheiːtɪr ˈeiːnar, svɔ jɛːx ˈheiːtɪ jouːn ˈeiːnarsˌsɔn. ˈvɛlˌkʰɔmɪn tʰɪl ˈistlants!]",
                "uk_text": "Мого батька звати Ейнар, тому я — Йон Ейнарссон. Ласкаво просимо до Ісландії!",
                "pragmatic_note": "Для чоловіків: родовний відмінок батька (Einars) + son (син). 'Velkomin' узгоджується з Анною у жіночому роді однини!",
                "audio_cue": "Faðir minn heitir Einar, svo ég heiti Jón Einarsson."
            },
            {
                "id": 8,
                "speaker": "Anna",
                "gender": "female",
                "avatar": "👩",
                "is_text": "Kærar þakkir! Þetta er yndislegt land.",
                "ipa": "[ˈcʰaiːrar ˈθahcɪr! ˈθɛhta ɛr̥ ˈɪntɪslɛxt lant.]",
                "uk_text": "Щиро дякую! Це чудова країна.",
                "pragmatic_note": "'Kærar þakkir' — щира подяка. Зверніть увагу на преаспірацію в слові 'þetta' [θɛhta].",
                "audio_cue": "Kærar þakkir! Þetta er yndislegt land."
            }
        ],
        "patronymic_culture": {
            "title": "Ісландська патронімічна система (Engin ættarnöfn)",
            "key_facts": [
                "В Ісландії практично немає спадкових прізвищ. 90% населення носять ім'я по батькові (föðurnafn) або рідше по матері (móðurnafn).",
                "Формула: [Ім'я батька у родовому відмінку Ef.] + -son (син) / -dóttir (донька).",
                "У телефонних довідниках і банках людей шукають за ПЕРШИМ (власним) ім'ям, а не за патронімом.",
                "До прем'єр-міністра чи президента офіційно звертаються просто за ім'ям: наприклад, «Katrín» або «Guðni»."
            ],
            "interactive_generator": [
                {"father": "Jón", "genitive": "Jóns", "son": "Jónsson", "daughter": "Jónsdóttir"},
                {"father": "Pétur", "genitive": "Péturs", "son": "Pétursson", "daughter": "Pétursdóttir"},
                {"father": "Einar", "genitive": "Einars", "son": "Einarsson", "daughter": "Einarsdóttir"},
                {"father": "Ólafur", "genitive": "Ólafs", "son": "Ólafsson", "daughter": "Ólafsdóttir"},
                {"father": "Guðrún", "genitive": "Guðrúnar", "son": "Guðrúnarson", "daughter": "Guðrúnardóttir"}
            ]
        },
        "gendered_greetings_matrix": {
            "title": "Матриця гендерних вітань (Sæll / Sæl)",
            "rules": [
                {"target": "До одного чоловіка (Karlkyn)", "word": "Sæll!", "ipa": "[saitl̥]", "note": "Зверніть увагу на боковий вибух [tl] через подвійне 'll'!"},
                {"target": "До однієї жінки (Kvenkyn)", "word": "Sæl!", "ipa": "[sail]", "note": "Одинарне 'l' звучить гладко й протяжно [sail] без клацання!"},
                {"target": "До групи чоловіків (Kk. ft.)", "word": "Sælir!", "ipa": "[ˈsaiːlɪr]", "note": "Форма множини чоловічого роду"},
                {"target": "До групи жінок (Kvk. ft.)", "word": "Sælar!", "ipa": "[ˈsaiːlar]", "note": "Форма множини жіночого роду"},
                {"target": "До змішаної групи або нейтрально", "word": "Sæl verið þið!", "ipa": "[sail ˈvɛːrɪð θɪð]", "note": "Універсальне ввічливе вітання до компанії"}
            ]
        },
        "preposition_fra_dative": {
            "rule": "Прийменник 'frá' (з, від) ЗАВЖДИ керує давальним відмінком (Þágufall / ÞGF 🟡)",
            "shifts": [
                {"nom": "Ísland (Ісландія)", "dat": "frá Íslandi", "change": "Додається закінчення -i"},
                {"nom": "Úkraína (Україна)", "dat": "frá Úkraínu", "change": "Закінчення -a переходить у -u"},
                {"nom": "Reykjavík (Рейк'явік)", "dat": "frá Reykjavík", "change": "Незмінна форма у давальному"},
                {"nom": "Kænugarður (Київ - давньосканд.)", "dat": "frá Kænugarði", "change": "-ur ➔ -i з пом'якшенням ð"},
                {"nom": "Danmörk (Данія)", "dat": "frá Danmörku", "change": "Додається закінчення -u"}
            ]
        }
    },
    "drill_suite": [
        {
            "id": 1,
            "category": "phonetic_traps",
            "category_uk": "Фонетична пастка #1: Преаспірація",
            "prompt": "Як правильно вимовляється слово «Takk» (дякую) в автентичній ісландській мові за стандартом Árnastofnun?",
            "audio_prompt": "Takk",
            "options": [
                "З довгим дзвінким [та-кк] без пауз і подихів",
                "З чіткою мікропаузою та гортанним видихом [h] перед коротким [k]: [tʰahk]",
                "Як англійське [tæk] з відкритим голосним",
                "З боковим клацанням язика [tatlk]"
            ],
            "correct_index": 1,
            "explanation": "Правильно: [tʰahk]! Подвоєні глухі проривні 'kk', 'tt', 'pp' викликають преаспірацію (aðblástur) — перший елемент фактично перетворюється на видих повітря з гортані [h]."
        },
        {
            "id": 2,
            "category": "phonetic_traps",
            "category_uk": "Фонетична пастка #2: Боковий вибух",
            "prompt": "Який звук утворюється при вимові сполучення «ll» у слові «Fjall» (гора)?",
            "audio_prompt": "Fjall",
            "options": [
                "Звичайне довге м'яке [лль] як в українському «сіль»",
                "Англійське тверде темне [ɫ]",
                "Вибуховий глухий ясенно-боковий звук [tl̥]: [fjatl]",
                "Французьке гаркаве [j]"
            ],
            "correct_index": 2,
            "explanation": "Правильно: [fjatl]! В ісландській мові подвійне 'll' майже завжди вибухає альвеолярним змиканням [tl]. Виняток становлять лише пестливі імена (Sigga, Palli) та іншомовні запозичення."
        },
        {
            "id": 3,
            "category": "phonetic_traps",
            "category_uk": "Фонетична пастка #3: Пре-назалізація",
            "prompt": "Чому в слові «Steinn» (камінь) подвійне «nn» звучить як [tn], а в слові «Vinna» (працювати) — як звичайне [nn]?",
            "audio_prompt": "Steinn Vinna",
            "options": [
                "Тому що 'nn' переходить у [tn] виключно після дифтонгів та довгих голосних з гострим знаком (´)",
                "Це залежить від діалекту півночі чи півдня Ісландії",
                "Тому що 'Vinna' — це дієслово, а 'Steinn' — іменник",
                "Обидва слова насправді вимовляються однаково"
            ],
            "correct_index": 0,
            "explanation": "Правильно! Закон Árnastofnun: 'nn' переходить у [tn] ЛИШЕ після наголошених дифтонгів (ei, ey, au) або голосних з гострим знаком (á, é, í, ó, ú, ý). Після простих коротких голосних лишається [nn]."
        },
        {
            "id": 4,
            "category": "phonetic_traps",
            "category_uk": "Фонетична пастка #4: Мутація F",
            "prompt": "Як звучить літера 'f' у сполученні 'fn' у слові «Nafn» (ім'я)?",
            "audio_prompt": "Nafn",
            "options": [
                "Як дзвінке [v]: [navn]",
                "Як глухе губне [p]: [napn]",
                "Як придихове [f]: [nafn]",
                "Літера взагалі не читається: [nan]"
            ],
            "correct_index": 1,
            "explanation": "Правильно: [napn]! Перед приголосними 'n' та 'l' літера 'f' асимілюється у глухий губний проривний [p] (наприклад: nafn [napn], Hafnarfjörður [hapnar-], afl [apl])."
        },
        {
            "id": 5,
            "category": "minimal_pairs",
            "category_uk": "Мінімальні пари #1: Vowel Duration",
            "prompt": "Яка головна акустична різниця між словами «Ís» (лід/морозиво) та «Is» (вигук нетерпіння)?",
            "audio_prompt": "Ís",
            "options": [
                "«Ís» має довгий напружений звук [iː], тоді як «Is» має короткий розслаблений [ɪ]",
                "«Ís» вимовляється зі свистом [z], а «Is» з [s]",
                "«Ís» починається з йотування [ji]",
                "Між ними немає жодної акустичної різниці"
            ],
            "correct_index": 0,
            "explanation": "Правильно! Літера Í позначає довгий напружений монофтонг [iː] (тривалість ~380 мс), тоді як проста літера I є відкритим ненапруженим звуком [ɪ] (тривалість ~190 мс)."
        },
        {
            "id": 6,
            "category": "minimal_pairs",
            "category_uk": "Мінімальні пари #2: Stop vs Preaspiration",
            "prompt": "Порівняйте пари «Taka» [ˈtʰaːka] та «Takk» [tʰahk]. Що відбувається з голосним звуком перед 'kk'?",
            "audio_prompt": "Taka Takk",
            "options": [
                "Голосний подовжується вдвічі",
                "Голосний скорочується і переривається видихом [h] перед змиканням",
                "Голосний переходить у дифтонг [au]",
                "Він взагалі зникає"
            ],
            "correct_index": 1,
            "explanation": "Правильно! Подвоєння проривного скорочує попередній голосний звук і створює фазу преаспірації [h] — це ключова ознака ісландської мови за протоколом Bara tala."
        },
        {
            "id": 7,
            "category": "minimal_pairs",
            "category_uk": "Мінімальні пари #3: LL vs L",
            "prompt": "Ви чуєте різницю між вітаннями «Sæll!» [saitl] (до чоловіка) та «Sæl!» [sail] (до жінки). Що відповідає за клацання [tl]?",
            "audio_prompt": "Sæll Sæl",
            "options": [
                "Слово «Sæll» має закінчення з подвійним 'll', яке зазнає бокового вибуху [tl]",
                "У слові «Sæl» звук 'l' взагалі не вимовляється",
                "Жіноча форма вимовляється з наголосом на другий склад",
                "Це випадкова граматична варіація"
            ],
            "correct_index": 0,
            "explanation": "Правильно: 'll' утворює вибухове глухе змикання [tl] у чоловічому вітанні Sæll [saitl]! У жіночому вітанні Sæl буква 'l' одинарна і звучить гладко [sail]."
        },
        {
            "id": 8,
            "category": "articulatory_correction",
            "category_uk": "Артикуляційна корекція #1: Þorn vs Eð",
            "prompt": "Студент написав ісландське слово, яке починається з літери «Ð» (*Ðagur) або закінчується на «Þ» (*Maðuþ). У чому полягає груба помилка?",
            "audio_prompt": "Dagur Maður",
            "options": [
                "Помилки немає, обидві літери взаємозамінні",
                "Літера «Þ» вживається ТІЛЬКИ на початку слів, а «Ð» — ТІЛЬКИ в середині або кінці слів!",
                "Літера «Ð» пишеться тільки у множині",
                "Літера «Þ» використовується тільки для запозичених англійських слів"
            ],
            "correct_index": 1,
            "explanation": "Абсолютне орфографічне правило: Þorn [θ] завжди ініціальне (Þing, Þú). Eð [ð] ніколи не стоїть першим, воно зустрічається виключно в інтервокальній позиції або в кінці слова (Maður, Blað)."
        },
        {
            "id": 9,
            "category": "articulatory_correction",
            "category_uk": "Артикуляційна корекція #2: Знак Broddur (´)",
            "prompt": "Студент стверджує: «В ісландському слові 'Óskar' значок над 'Ó' означає, що на цей склад падає сильний наголос». Чи правильне це твердження?",
            "audio_prompt": "Óskar",
            "options": [
                "Так, значок (´) завжди регулює силу наголосу в ісландській мові",
                "Ні! Наголос в ісландській ЗАВЖДИ на першому складі, а значок позначає інший звук — дифтонг [ou] замість [ɔ]",
                "Ні, наголос в ісландській завжди падає на останній склад слова",
                "Значок над літерою ставиться лише для краси історичного правопису"
            ],
            "correct_index": 1,
            "explanation": "Глибоке розуміння фонології: в ісландській мові наголос фіксований на першому складі. Значок бродур (broddur ´) змінює якість звука (O ➔ [ɔ], Ó ➔ [ou]; A ➔ [a], Á ➔ [au])."
        },
        {
            "id": 10,
            "category": "articulatory_correction",
            "category_uk": "Прагматика & Відмінки: Прийменник 'frá'",
            "prompt": "Як правильно сказати ісландською «Я з України» з дотриманням правила давального відмінка (Þágufall 🟡)?",
            "audio_prompt": "Ég er frá Úkraínu.",
            "options": [
                "Ég er frá Úkraína (називний відмінок NF)",
                "Ég er frá Úkraínu (давальний відмінок ÞGF: закінчення -a переходить у -u)",
                "Ég er af Úkraínu",
                "Ég kemur í Úkraíni"
            ],
            "correct_index": 1,
            "explanation": "Правильно: «Ég er frá Úkraínu»! Прийменник 'frá' (звідки) вимагає давального відмінка (Þágufall). Жіночий рід з закінченням -a в давальному відмінку обов'язково отримує закінчення -u."
        }
    ]
}

# Write data/m0_phonetics.json
json_path = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/data/m0_phonetics.json"
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(m0_data, f, ensure_ascii=False, indent=2)

# Write data/m0_phonetics.js (as an ES module and window global export)
js_path = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/data/m0_phonetics.js"
with open(js_path, 'w', encoding='utf-8') as f:
    f.write("// Production-grade decoupled phonetics dataset for Módúll 0 (Stafrófið & Framburður)\n")
    f.write("// Árnastofnun & Bara tala standard for Ukrainian learners\n\n")
    f.write("export const M0_PHONETICS_DATA = ")
    json.dump(m0_data, f, ensure_ascii=False, indent=2)
    f.write(";\n\n")
    f.write("// Global fallback for legacy non-module browsers\n")
    f.write("if (typeof window !== 'undefined') {\n")
    f.write("  window.M0_PHONETICS_DATA = M0_PHONETICS_DATA;\n")
    f.write("}\n")

print(f"✅ Generated {json_path} ({os.path.getsize(json_path)} bytes)")
print(f"✅ Generated {js_path} ({os.path.getsize(js_path)} bytes)")
