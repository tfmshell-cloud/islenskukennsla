# МАЙСТЕР-КАТАЛОГ ПРОМПТІВ ТА ТЕМ ДЛЯ GOOGLE NOTEBOOKLM STUDIO (УСІ 22 ЕПІЗОДИ)
**Проєкт:** *Ісландська мова для українців (Íslenska fyrir alla • Audio Ecosystem)*  
**Шаблон голосів та ведучих (з успішних випусків 0, 0.5, 2):**  
- **Остап (Host 1):** Практичний гід, аналітик життя в Ісландії, розбирає роботу, контракти, побут, інституції, звичаї, ділиться життєвим досвідом іммігранта.
- **Поліна (Host 2):** Експертка-філолог, фонетистка. Пояснює логіку мови, розбирає закінчення відмінків, преаспірацію, порядок слів V2, часи дієслів та пастки.
- **Автентична вимова:** Будь-які фрази та діалоги ісландською мовою вимовляються з рідною ісландською фонетикою (наголос строго на 1-й склад, боковий клік [tl], преаспірація [hk/hp/ht]).
- **Основна мова подкасту:** Природна, жива українська мова (80%) + автентичні ісландські діалоги та фрази (20%).

---

## БАЗОВИЙ СИСТЕМНИЙ ШАБЛОН ДЛЯ ПОЛЯ «CUSTOMIZE AUDIO OVERVIEW» В NOTEBOOKLM:

```text
Act as Ostap and Polina, charismatic hosts of the premier bilingual Ukrainian-Icelandic educational podcast "Ісландська в дорозі: від нуля до громадянства".

Target Duration: In-depth, engaging, 18-22 minute conversational masterclass.
Voice Template:
- Ostap: Pragmatic field analyst living in Iceland, focuses on practical navigation, legal realities, culture, work, survival tips, and questions learners face.
- Polina: Enthusiastic linguist and phonetician, breaks down grammar patterns, case endings, pronunciation traps, verb conjugations, and word order.

Language Rules:
- Primary storytelling and deconstruction: Natural, modern Ukrainian.
- Icelandic dialogues and terms: Crisp, authentic native Icelandic pronunciation (stress on the first syllable, proper preaspiration, lateral release).
- Acting: Both hosts act out authentic everyday dialogues slowly and clearly, then break down sentence structure and vocabulary.

Flow:
1. Warm hook & cultural context in Iceland.
2. Step-by-step roleplay of realistic dialogue.
3. Grammar and phonetic deconstruction (why this case? why this word order?).
4. Real-life exam/workplace pitfalls and how to avoid them.
5. 5 golden takeaway phrases to use today.
```

---

## КАТАЛОГ ПРОМПТІВ ДЛЯ КОЖНОГО ЕПІЗОДУ:

### Епізод 1: Хто ти? Кеннітала, родина та перші знайомства (Рівень A1.1)
- **Файл-джерело для завантаження в NotebookLM:** `notebooklm_sources/EP01_HVER_ERT_THU_DOSSIER.md`
- **Фокус епізоду:** Що таке 10-значна кеннітала (Þjóðskrá), чому без неї не можна відкрити рахунок у банку чи спортзал; феномен відсутності прізвищ (-son, -dóttir) та телефонні довідники за першим ім'ям; дієслово *að vera* (er, ert, erum); порядок слів V2; діалог знайомства на роботі.
- **Промпт для Studio:** Скопіюйте з `notebooklm_sources/EP01_STUDIO_PROMPT.md`.

---

### Епізод 3: У супермаркеті Bónus, Krónan та Nettó: Вага, ціни та каса (Рівень A1.1)
- **Фокус епізоду:** Продуктовий кошик, зважування овочів та фруктів (vigt), навігація цінниками (*kílóverð*, *tilboð*), діалог з касиром (*Pokapoki? Kvittun? Viltu borga með korti?*). Числівники від 1 до 1000 та ціни в ісландських кронах (krónur).
- **Промпт для Studio:**
  > Focus on supermarket shopping at Bónus and Krónan. Roleplay dialogue at the checkout counter: cashier asking about plastic bags, receipt, payment by card. Explain numbers up to 1000, prices in ISK, grocery vocabulary (skyr, mjólk, lambakjöt, brauð), and polite phrases "Já, takk", "Nei, takk", "Gjörðu svo vel".

---

### Епізод 4: Котра година? Парадокс ісландського часу та розпорядок дня (Рівень A1.2)
- **Фокус епізоду:** Чому *hálf fimm* означає 16:30 (половина до п'яти), а не половина п'ятої; розпорядок дня, прийменники часу (*klukkan*, *á morgnana*, *á kvöldin*); позмінна робота (*vaktavinna*, *morgunvakt*, *kvöldvakt*, *næturvakt*).
- **Промпт для Studio:**
  > Deconstruct the Icelandic time-telling paradox (why "hálf fimm" is 4:30). Roleplay planning a shift schedule at work (morgunvakt vs kvöldvakt). Explain daily routine verbs (vakna, borða morgunmat, mæta í vinnu, fara að sofa) and reflexive forms.

---

### Епізод 5: Охорона здоров'я: Heilsugæslan, лінія 1700 та Heilsuvera (Рівень A1.2)
- **Фокус епізоду:** Первинна медицина в Ісландії; як дзвонити на чергову лінію медсестри 1700; додаток Heilsuvera та електронні рецепти; назви хвороб, симптомів (hiti, kvef, hósti, verkir) та частин тіла; діалог тріажу.
- **Промпт для Studio:**
  > Focus on the Icelandic primary healthcare system (Heilsugæslan) and calling nurse line 1700. Roleplay a triage phone call describing symptoms (fever, sore throat, back pain). Explain appointment booking, electronic prescriptions in Heilsuvera, and emergency line 112 vs 1700.

---

### Епізод 6: Громадський транспорт: Strætó, валідатор Klapp та станція BSÍ (Рівень A2.1)
- **Фокус епізоду:** Автобуси в Рейк'явіку, додаток та карта Klapp; як валідувати квиток (að klappa inn); купівля квитка на 75 хв; міжміські автобуси з автовокзалу BSÍ та шатл до аеропорту Keflavík (Flybus).
- **Промпт для Studio:**
  > Deconstruct public transport in Iceland. Roleplay boarding Strætó route 1 or 3, tapping the Klapp card/app, asking the driver if this bus stops at Lækjartorg or BSÍ. Explain transfer tickets (skiptimiði), night buses, and booking airport Flybus.

---

### Епізод 7: Житло та оренда: Огляд квартири, договір та субсидія Húsaleigubætur (Рівень A2.1)
- **Фокус епізоду:** Оренда квартири на mbl.is та leiga.is; огляд житла (skoðun á íbúð); що входить у вартість (hiti, rafmagn, hússjóður); офіційний договір оренди (húsaleigusamningur) та оформлення державної субсидії на житло через HMS.
- **Промпт для Studio:**
  > Roleplay viewing an apartment in Kópavogur with a landlord: asking about heating, electricity, deposit (trygging), and house association fees (hússjóður). Deconstruct the housing benefits (húsaleigubætur) via HMS and required contract terms.

---

### Епізод 8: Ринок праці та профспілка Efling: Права, табель зарплати Launaseðill (Рівень A2.2)
- **Фокус епізоду:** Профспілки (Efling, VR); трудовий договір (ráðningarsamningur); розшифровка табеля зарплати (launaseðill: grunnlaun, yfirvinna, orlof, lífeyrissjóður, stéttarfélagsgjald); лікарняні виплати та мовні гранти (styrkur).
- **Промпт для Studio:**
  > Deconstruct the Icelandic labor market and payslip (launaseðill). Roleplay an employee discussing their hours, overtime (yfirvinna), and union rights with an Efling shop steward (trúnaðarmaður). Explain pension funds (lífeyrissjóður), vacation allowance (orlof), and language course grants.

---

### Епізод 9: Сфера послуг: Перукарня, автомайстерня та бронювання часу (Рівень A2.2)
- **Фокус епізоду:** Як записатися на прийом (bóka tíma); діалог у перукарні (стрижка, миття голови, побажання довжини); ввічливі формулювання прохання (*Gætirðu...*, *Viltu gjera svo vel að...*).
- **Промпт для Studio:**
  > Roleplay booking an appointment and communicating preferences at a barbershop or service salon in Reykjavík. Explain polite requests, descriptive adjectives for styling/repairs, and price inquiries.

---

### Епізод 10: Культура басейнів Sundlaug: Гарячі ванни Heitir Pottar та соціальний етикет (Рівень A2.2)
- **Фокус епізоду:** Серце ісландського соціального життя — Sundlaug; суворе правило миття без купальника перед входом у воду; гарячі ванни (heitir pottar від 38°C до 44°C); теми для світської бесіди з місцевими у воді (погода, вулкан, політика).
- **Промпт для Studio:**
  > Deep dive into Iceland's quintessential swimming pool culture (Sundlaug). Explain the strict hygiene etiquette, the communal role of "heitir pottar", and typical topics Icelanders discuss while soaking. Roleplay purchasing a ticket and greeting locals in the hot tub.

---

### Епізод 11: Одяг, взуття та підготовка до ісландської зими (Рівень A2.2)
- **Фокус епізоду:** Одяг за принципом трьох шарів (ull, flís, skel); діалог у магазині одягу (примірка, розміри, повернення товару — *skila vöru / fá inneignarnótu*); бренди 66°Norður, Cintamani, Icewear.
- **Промпт для Studio:**
  > Roleplay shopping for outdoor winter clothing in Iceland. Explain dressing in layers (wool, fleece, waterproof shell), trying on sizes (stærðir), asking for discounts, and return policies (skilaréttur).

---

### Епізод 12: В аптеці: Рецепти, ліки та портал Lyfjagátt (Рівень A2.2)
- **Фокус епізоду:** Аптеки Lyfja та Apótekarinn; електронний рецепт (rafrænn lyfseðill), прикріплений до кеннітали; безрецептурні ліки (panodil, ibufen, vítamín, lýsi — риб'ячий жир); консультація з фармацевтом.
- **Промпт для Studio:**
  > Roleplay picking up a prescription at Lyfja. Explain the electronic prescription system (Lyfjagátt), OTC remedies, dosing instructions (taka eina töflu tvisvar á dag með mat), and the cultural staple "lýsi" (cod liver oil).

---

### Епізод 13: Автомобіль: АЗС, мийка та оренда авто (Рівень A2.2)
- **Фокус епізоду:** Самообслуговування на заправках (N1, Olís, Orkan, Costco); бензин 95 проти дизеля (dísel); перевірка тиску в шинах; безкоштовна автомийка на заправках; оренда авто та страховка від піску та гравію (SCDW, Ash & Ice protection).
- **Промпт для Studio:**
  > Roleplay refueling at an automated pump, washing a car at an Icelandic gas station, and picking up a rental car. Explain fuel types, tire maintenance for winter, gravel road insurance, and driving etiquette.

---

### Епізод 14: Корпоративна культура: Кухня Kaffistofan за посібником Tölum saman (Рівень A2.2)
- **Фокус епізоду:** Ісландська офісна кухня (Kaffistofan) — центр неформального спілкування; кавові паузи (kaffitími); типові теми (вихідні, діти, погода, відпустка); посібник *Tölum saman 2022*.
- **Промпт для Studio:**
  > Roleplay a coffee break conversation at "Kaffistofan" following the official "Tölum saman 2022" workplace integration textbook. Explain small talk etiquette, coffee culture, asking colleagues about their weekend, and breaking the language barrier.

---

### Епізод 15: Освіта: Дитячий садок Leikskóli, школа та портал Mentor.is (Рівень A2.2)
- **Фокус епізоду:** Дошкільна освіта (Leikskóli), початкова школа (Grunnskóli); адаптація дитини (aðlögun); шкільне харчування (mötuneyti); спілкування з класним керівником через портал Mentor.is (повідомлення про хворобу, батьківські збори foreldrafundir).
- **Промпт для Studio:**
  > Roleplay a conversation between a Ukrainian parent and an Icelandic kindergarten teacher (leikskólakennari). Deconstruct communication on the Mentor.is app, reporting sickness, packing outdoor clothes, and parent-teacher meetings.

---

### Епізод 16: Погода та безпека: Як читати Vedur.is та SafeTravel (Рівень A2.2)
- **Фокус епізоду:** Ісландські штормові кольорові рівні (gul, appelsínugul, rauð viðvörun); пориви вітру (vindhviður) до 40 м/с; стан доріг на сайті Vegagerðin (hálka — ожеледиця, ófært — непроїзно); сайт порятунку SafeTravel.is.
- **Промпт для Studio:**
  > Deconstruct Iceland's extreme weather and road warning system. Roleplay interpreting a weather warning on Vedur.is and road conditions on Umferdin.is before a road trip. Explain storm terms (hvassviðri, stormur, snjókoma, hálka) and safety protocols.

---

### Епізод 17: Податкова служба Skatturinn: Податкова картка та Skattframtal (Рівень A2.2)
- **Фокус епізоду:** Персональна податкова пільга (persónuafsláttur ~64.000 крон щомісяця); податкова картка (skattkort); передача картки працедавцю; щорічна податкова декларація у березні (skattframtal на skattur.is); перевірка повернення коштів (endurgreiðsla).
- **Промпт для Studio:**
  > Deconstruct Skatturinn (Icelandic Tax Authority). Roleplay a taxpayer consulting about their personal tax credit (persónuafsláttur), submitting the annual tax return (skattframtal) in March, and checking deduction categories.

---

### Епізод 18: Відпустка та лікарняні: Твої непорушні права за законом (Рівень A2.2)
- **Фокус епізоду:** Право на оплачувану відпустку (orlofsréttur 24-30 днів); відпускні виплати (orlof 10.17%); дні хвороби дитини (veikindi barna); виплати з лікарняного фонду профспілки (sjúkrasjóður) у разі тривалої хвороби.
- **Промпт для Studio:**
  > Explain the legal rights regarding paid leave (orlof) and sick days in Iceland. Roleplay requesting vacation time and submitting a medical certificate for union sick-fund coverage (sjúkrasjóður).

---

### Епізод 19: Ісландські традиції, свята та гастрономічні шоки (Рівень A2.2)
- **Фокус епізоду:** Зимовий фестиваль Þorrablót та традиційна їжа вікінгів (hákarl — ферментована акула, svið — бараняча голова, hrútspungar); 13 різдвяних Йоласвейнарів (Jólasveinar) та кіт Jólakötturinn; День незалежності 17 червня (Þjóðhátíðardagurinn).
- **Промпт для Studio:**
  > Explore Icelandic cultural traditions and bizarre holiday food. Discuss Þorrablót (fermented shark, sheep heads, Brennivín), the 13 Yule Lads (Jólasveinar), and National Day on June 17. Keep it humorous, culturally respectful, and vivid.

---

### Епізод 20: Великий іспит на громадянство Ісландії (Ríkisborgararéttarpróf) (Рівень B1)
- **Файл-джерело для завантаження в NotebookLM:** `notebooklm_sources/EP20_RIKISBORGARARETTUR_DOSSIER.md`
- **Фокус епізоду:** Повний розбір офіційного іспиту Mímir: 4 модулі (Hlustun, Lestur, Ritun, Tal); симуляція усної співбесіди з екзаменаторами; рятівні фрази та критерії оцінювання.
- **Промпт для Studio:** Скопіюйте з `notebooklm_sources/EP20_STUDIO_PROMPT.md`.

---

### Епізод 21: Інтеграція, кар'єра та майбутнє в Ісландії (Рівень B1/B2)
- **Фокус епізоду:** Визнання закордонних дипломів та кваліфікацій (ENIC-NARIC); університетське навчання (Háskóli Íslands, Háskólinn í Reykjavík); мовні курси вищих рівнів; кар'єрне зростання від некваліфікованої праці до фахівця; повноцінне життя в ісландському суспільстві.
- **Промпт для Studio:**
  > Capstone episode on long-term career growth, degree recognition via ENIC-NARIC, entering Icelandic universities, and achieving true cultural integration. Inspiring, motivating, and full of practical career advice for Ukrainians.
