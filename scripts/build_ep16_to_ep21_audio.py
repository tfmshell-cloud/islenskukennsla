#!/usr/bin/env python3
"""
build_ep16_to_ep21_audio.py - Generate neural audio tracks for Ep 16 - Ep 21
Completes all 22 podcast episodes of the curriculum!
"""

import os
import subprocess
import shutil

EDGE_TTS = "/Users/volodymyrkatasonov/Library/Python/3.9/bin/edge-tts"
AFCONVERT = "/usr/bin/afconvert"
OUTPUT_DIR = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/podcasts"
TMP_DIR = "/tmp/podcast_build_ep16_ep21"

VOICE_MAP = {
    "Остап": "uk-UA-OstapNeural",
    "Поліна": "uk-UA-PolinaNeural",
    "Gunnar": "is-IS-GunnarNeural",
    "Guðrún": "is-IS-GudrunNeural",
}

EPISODES = {
    "ep16": {
        "out_name": "ep16_vegir_og_vedur",
        "lines": [
            ("Остап", "Вітаємо у шістнадцятому випуску подкасту! Сьогодні говоримо про те, від чого в Ісландії залежить життя: про дороги, погодні шторми та сайти umferdin.is і vedur.is."),
            ("Поліна", "Золоте правило острова: ніколи не вирушайте за межі Рейк'явіка взимку, не перевіривши кольорові попередження метеослужби та карту доріг!"),
            ("Gunnar", "Góðan daginn! Ég er sjálfboðaliði í Björgunarsveitinni Landsbjörg. Núna er appelsínugul viðvörun á Hellisheiði og Reykjanesskaga. Blindbylur og vindur yfir þrjátíu metra á sekúndu!"),
            ("Поліна", "Ось ці терміни стану доріг ви бачите на табло: 'Greiðfært' — чистий асфальт, 'Hálkublettir' — місцями лід, 'Hálka' — суцільна ожеледь, 'Snjóþekja' — сніговий шар."),
            ("Gunnar", "Og ef vegurinn er merktur sem 'Ófært' eða 'Lokað', þá er stranglega bannað að aka áfram! Það er lífshættulegt."),
            ("Guðrún", "Munið eftir neyðarnúmerinu okkar: Einn einn tveir (112), og hlaðið niður Safetravel appinu áður en þið leggið af stað."),
            ("Остап", "Запам'ятайте головні слова: Vedur, Færð, Hálka, Lokað, Björgunarsveit та Neyðarnúmer 112. Безпечної вам дороги в будь-яку заметіль!"),
            ("Gunnar", "Farið varlega á vegunum og bless bless!"),
            ("Guðrún", "Bless!")
        ]
    },
    "ep17": {
        "out_name": "ep17_skatturinn_og_kort",
        "lines": [
            ("Остап", "Сімнадцятий випуск присвячений фінансам та податковій системі Skatturinn. Як зберегти свої гроші та не переплачувати податки?"),
            ("Поліна", "Головний інструмент кожного працюючого — Persónuafsláttur, обов'язкова податкова знижка у розмірі майже шістдесят п'ять тисяч крон щомісяця."),
            ("Guðrún", "Góðan daginn! Ég starfa hjá Skattinum. Þegar þú byrjar í nýrri vinnu verður þú að láta vinnuveitandann vita að þú viljir nýta skattkortið þitt hundrað prósent."),
            ("Поліна", "Якщо цього не зробити, бухгалтерія зніме податок тридцять один з половиною відсоток з першої ж заробленої крони!"),
            ("Gunnar", "En ef þú nýttir ekki persónuafsláttinn, tapast hann ekki! Kerfið geymir ónýttan afslátt og þú færð hann endurgreiddan í skattframtalinu í vor."),
            ("Guðrún", "Í mars skrá allir sig inn á skatturinn.is með Auðkenni og staðfesta skattframtalið. Ef þú átt rétt á endurgreiðslu, millifærir ríkið peningana beint á bankareikninginn þinn í maí."),
            ("Остап", "Ключові терміни: Skatturinn, Persónuafsláttur, Skattframtal, Launaseðill та Endurgreiðsla. Тримайте податки під повним контролем!"),
            ("Guðrún", "Gangi ykkur vel með skattframtalið og bless!"),
            ("Gunnar", "Bless!")
        ]
    },
    "ep18": {
        "out_name": "ep18_orlof_og_veikindi",
        "lines": [
            ("Остап", "Вісімнадцятий випуск — про ваші непорушні трудові права в Ісландії: відпустку Orlof, лікарняні виплати та захист профспілки."),
            ("Поліна", "Чи знали ви, що за законом кожен працівник має щонайменше двадцять чотири дні оплачуваної відпустки на рік?"),
            ("Gunnar", "Góðan daginn! Samkvæmt kjarasamningi safnar þú orlofi í hverjum mánuði. Fyrsta maí á hverju ári er orlofsféð greitt út á sérstakan orlofsreikning."),
            ("Поліна", "Це приємний ісландський бонус до весни! А що робити, якщо захворів?"),
            ("Guðrún", "Ef þú veikist, tilkynnir þú veikindi strax að morgni til vinnuveitanda. Eftir nokkra daga getur hann beðið um læknisvottorð frá heilsugæslunni."),
            ("Gunnar", "Og ef um langvarandi veikindi er að ræða, þá tekur Sjúkrasjóður stéttarfélagsins við og greiðir sjúkradagpeninga."),
            ("Остап", "Ключові слова випуску: Orlof, Orlofsfé, Veikindaréttur, Læknisvottorð та Sjúkrasjóður. Ваші права надійно захищені!"),
            ("Gunnar", "Góða hvíld og góða heilsu! Bless bless!"),
            ("Guðrún", "Bless!")
        ]
    },
    "ep19": {
        "out_name": "ep19_hefdir_og_menning",
        "lines": [
            ("Остап", "Дев'ятнадцятий випуск занурює нас у серце ісландської душі: зимове свято Þorrablót, тринадцять Йольських хлопців та вовняний светр Lopapeysa!"),
            ("Поліна", "Ісландська культура сповнена дивовижних звичаїв. Наприклад, у січні вся країна збирається смакувати традиційну їжу Торра — Þorramatur."),
            ("Gunnar", "Já, nákvæmlega! Á Þorrablóti borðum við hákarl, svið og hrútspunga, og skola þessu niður með Brennivíni. Þetta er matur forfeðra okkar sem hélt okkur á lífi í gegnum aldirnar."),
            ("Guðrún", "Og í desember koma þrettán jólasveinar ofan úr fjöllunum! Börn setja skóinn í gluggann á hverju kvöldi og fá annaðhvort litla gjöf eða kartöflu ef þau voru óþekk."),
            ("Поліна", "А зігріває ісландців у будь-яку погоду Lopapeysa — автентичний светр із непряденої овечої вовни з водовідштовхувальним ланоліном."),
            ("Остап", "Ключові поняття: Þorrablót, Þorramatur, Hákarl, Jólasveinar, Lopapeysa та Brennivín. Пізнавайте культуру країни з відкритим серцем!"),
            ("Gunnar", "Gleðilega hátíð og njótið hefðanna! Bless bless!"),
            ("Guðrún", "Bless!")
        ]
    },
    "ep20": {
        "out_name": "ep20_rikisborgararettur_prof",
        "lines": [
            ("Остап", "Двадцятий випуск — це вершина академічної підготовки: офіційний державний іспит на громадянство Ісландії у Mímir-símenntun!"),
            ("Поліна", "Для отримання паспорта з ісландським гербом необхідно скласти стандартизований мовний тест. Як він побудований?"),
            ("Guðrún", "Góðan daginn! Prófið hjá Mími skiptist í fjóra hluta: Hlustunarskilningur, Lestrarpróf, Ritun og Munnlegt viðtal."),
            ("Gunnar", "Í hlustuninni hlustar þú á stuttar fréttir og samtöl í búðum eða á vinnustað. Í rituninni skrifar þú stuttan tölvupóst, til dæmis til kennara eða húsfélags."),
            ("Поліна", "Головне, на що дивляться екзаменатори — це не відсутність акценту, а впевнене володіння базовою граматикою: закінченнями відмінків, минулим часом дієслів та здатністю вирішити побутову проблему."),
            ("Guðrún", "Ef þú hefur lært allar kaflana í Íslenska fyrir alla og æft þig daglega, þá munt þú standast prófið án vandræða!"),
            ("Остап", "Ключові терміни: Ríkisborgararéttarpróf, Hlustun, Lestur, Ritun, Munnlegt viðtal та Mímir. Успіху на шляху до громадянства!"),
            ("Gunnar", "Gangi ykkur ótrúlega vel á prófinu! Bless!"),
            ("Guðrún", "Bless bless!")
        ]
    },
    "ep21": {
        "out_name": "ep21_framtid_og_velgengni",
        "lines": [
            ("Остап", "Фінальний двадцять перший випуск нашого курсу! Ми пройшли неймовірний шлях від перших звуків абетки до повної мовної свободи."),
            ("Поліна", "Сьогодні ви можете самостійно винаймати житло, підписувати трудовий договір, спілкуватися з лікарем, подавати податкову декларацію та вести невимушену бесіду за кавою."),
            ("Gunnar", "Kæru vinir frá Úkraínu! Þið hafið lagt á ykkur mikla vinnu og sýnt ótrúlegan metnað. Að tala íslensku er lykillinn að samfélaginu okkar."),
            ("Guðrún", "Takk fyrir að sýna málinu okkar virðingu og ást. Þegar þið talið við okkur á íslensku, þá fögnum við ykkur sem jafningjum."),
            ("Поліна", "Не бійтеся робити помилки, говоріть щодня на роботі, у басейні та в крамниці. Мова — це міст між культурами та серцями!"),
            ("Остап", "Дякуємо, що були з нами впродовж усіх двадцяти двох випусків! Бажаємо вам успіху, добробуту та щасливого життя в Ісландії!"),
            ("Gunnar", "Til hamingju með árangurinn og gangi ykkur allt í haginn! Bless bless!"),
            ("Guðrún", "Gangi ykkur vel og sjáumst! Bless!")
        ]
    }
}

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    if os.path.exists(TMP_DIR):
        shutil.rmtree(TMP_DIR)
    os.makedirs(TMP_DIR, exist_ok=True)

    for ep_key, ep_data in EPISODES.items():
        out_name = ep_data["out_name"]
        lines = ep_data["lines"]
        ep_tmp = os.path.join(TMP_DIR, ep_key)
        os.makedirs(ep_tmp, exist_ok=True)

        print(f"\n=== GENERATING {ep_key.upper()}: {out_name} ({len(lines)} lines) ===")
        file_list = []

        for idx, (speaker, text) in enumerate(lines, 1):
            voice = VOICE_MAP.get(speaker, "is-IS-GunnarNeural")
            line_file = os.path.join(ep_tmp, f"line_{idx:02d}_{voice}.mp3")
            print(f"[{idx}/{len(lines)}] {speaker} ({voice}): {text[:40]}...")
            
            cmd = [
                EDGE_TTS,
                "--voice", voice,
                "--text", text,
                "--write-media", line_file
            ]
            res = subprocess.run(cmd, capture_output=True, text=True)
            if res.returncode != 0:
                print(f"ERROR: edge-tts failed on line {idx}: {res.stderr}")
                return

            file_list.append(line_file)

        # Concatenate line mp3s
        combined_mp3 = os.path.join(ep_tmp, f"{out_name}_combined.mp3")
        with open(combined_mp3, "wb") as outfile:
            for fname in file_list:
                with open(fname, "rb") as infile:
                    shutil.copyfileobj(infile, outfile)

        final_m4a = os.path.join(OUTPUT_DIR, f"{out_name}.m4a")
        conv_cmd = [
            AFCONVERT,
            "-f", "m4af",
            "-d", "aac",
            combined_mp3,
            final_m4a
        ]
        res = subprocess.run(conv_cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"ERROR: afconvert failed: {res.stderr}")
            return

        size_kb = os.path.getsize(final_m4a) / 1024
        print(f"SUCCESS: Generated {final_m4a} ({size_kb:.1f} KB)")

    print("\nALL REMAINING EPISODES (16 TO 21) GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
