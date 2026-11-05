#!/usr/bin/env python3
"""
build_ep12_ep13_audio.py - Generate neural audio tracks for Ep 12 & Ep 13
Ep 12: Í apóteki: Lyf og lyfseðill (Pharmacy, prescriptions & dosage)
Ep 13: Bensínstöð og bílaleiga (Gas station self-service & car rental)
"""

import os
import subprocess
import shutil

EDGE_TTS = "/Users/volodymyrkatasonov/Library/Python/3.9/bin/edge-tts"
AFCONVERT = "/usr/bin/afconvert"
OUTPUT_DIR = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/podcasts"
TMP_DIR = "/tmp/podcast_build_ep12_ep13"

VOICE_MAP = {
    "Остап": "uk-UA-OstapNeural",
    "Поліна": "uk-UA-PolinaNeural",
    "Gunnar": "is-IS-GunnarNeural",
    "Guðrún": "is-IS-GudrunNeural",
}

EPISODES = {
    "ep12": {
        "out_name": "ep12_i_apoteki_lyf_og_lyfsedill",
        "lines": [
            ("Остап", "Вітаємо у дванадцятому випуску нашого подкасту! Сьогодні ми розбираємо життєво необхідну тему для кожного в Ісландії: як придбати ліки в аптеці Lyfja чи Apótekarinn, як діють електронні рецепти та як читати ісландські інструкції дозування."),
            ("Поліна", "В Ісландії майже не існує паперових рецептів. Усі лікарі відправляють призначення безпосередньо у загальнонаціональну електронну систему, прив'язану до вашого ідентифікаційного коду Kennitala."),
            ("Guðrún", "Góðan daginn! Get ég aðstoðað þig? Ertu með rafrænan lyfseðil frá lækni eða vantar þig lausasölulyf?"),
            ("Поліна", "Góðan daginn! Já, læknirinn minn á heilsugæslunni sendi rafrænan lyfseðil fyrir sýklalyfjum. Hér er kennitalan mín."),
            ("Guðrún", "Já, ég sé lyfseðilinn í kerfinu. Þetta eru sýklalyf. Þú átt að taka eina töflu tvisvar á dag með mat í sjö daga. Mjög mikilvægt er að klára allan skammtinn!"),
            ("Остап", "Зверніть увагу: sýklalyf — це антибіотики, lyfseðill — рецепт, а lausasölulyf — безрецептурні препарати, такі як знеболювальні parasetamól чи íbúfen."),
            ("Поліна", "Takk fyrir skýringarnar. Og áttu líka hálsbrjóstsykur og nefúða við kvefi?"),
            ("Guðrún", "Já, hérna eru lausasölulyf við kvefi. Hálsbrjóstsykurinn slær á særindi í hálsi og nefúðinn opnar öndunarveginn."),
            ("Gunnar", "Mundu alltaf að lesa límmiðann á lyfjaöskjunni! Þar stendur nákvæmlega: 'Takið eina töflu á dag' eða 'Geymist í kæli' ef lyfið þarf að vera í ísskáp."),
            ("Остап", "Запам'ятайте головні терміни: Apótek, Lyfseðill, Töflur, Skammtur, Sýklalyf та Kvef. Бажаємо вам міцного здоров'я!"),
            ("Guðrún", "Gangi þér vel og batni þér fljótt! Bless bless!"),
            ("Gunnar", "Bless!")
        ]
    },
    "ep13": {
        "out_name": "ep13_bensinstod_og_bilaleiga",
        "lines": [
            ("Остап", "Привіт усім! Тринадцятий випуск присвячений пересуванню Ісландією: оренда автомобіля в аеропорту Кеflavík та особливості заправки на автоматичних станціях N1, Orkan чи Olís."),
            ("Поліна", "Оренда автомобіля в Ісландії вимагає особливої уваги до страхування. Тут звичайне каско CDW не захищає від гравію, вулканічного попелу чи дверей, зірваних арктичним вітром!"),
            ("Gunnar", "Góðan daginn og velkomin til Íslands! Hér er bílaleigusamningurinn þinn. Þú valdir fjórhjóladrifinn jeppa, sem er nauðsynlegur ef þú ætlar upp á hálendið og F-vegi."),
            ("Поліна", "Já, takk! Hvaða tryggingar eru innifaldar? Ég vil hafa mölbrotatryggingu og sand- og öskutryggingu."),
            ("Gunnar", "Mjög skynsamlegt! Mölbrotatrygging ver bílinn fyrir grjótkasti á malarvegum, og sand- og öskutrygging ver lakk og rúður fyrir sandstormi. Og mundu: Haldið alltaf fast í bílhurðina þegar þið opnið hana í miklum vindi!"),
            ("Остап", "Золоте правило ісландського водія: тримайте двері обома руками, бо штормовий вітер легко вивертає дверні петлі назовні. А як щодо заправки па пальним?"),
            ("Guðrún", "Á bensínstöðvum notar maður sjálfsafgreiðsludælu. Þú setur greiðslukortið í dæluna, slærð inn PIN-númerið og velur annaðhvort bensín nítíu og fimm eða dísel."),
            ("Поліна", "En hvað ef ég vel valkostinn 'Fylling' eða fullan tank?"),
            ("Guðrún", "Þá tekur dælan frá ákveðna upphæð á kortinu sem tryggingu, en dregur aðeins raunverulega upphæð þegar þú lýkur við að dæla."),
            ("Остап", "Ключові слова для дороги: Bílaleiga, Bensínstöð, Sjálfsafgreiðsla, Bensín, Dísel, Mölbrotatrygging та F-vegur. Безпечних вам подорожей Кільцевою дорогою!"),
            ("Gunnar", "Akið varlega og njótið ferðarinnar um Ísland!"),
            ("Guðrún", "Bless bless!"),
            ("Gunnar", "Bless!")
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
            print(f"[{idx}/{len(lines)}] {speaker} ({voice}): {text[:45]}...")
            
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

    print("\nALL EPISODES GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
