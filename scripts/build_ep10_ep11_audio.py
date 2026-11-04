#!/usr/bin/env python3
"""
build_ep10_ep11_audio.py - Generate studio-quality neural audio for Ep 10 & Ep 11
Uses edge-tts (Ostap, Polina, Gunnar, Gudrun) and converts to .m4a with afconvert.
"""

import os
import subprocess
import shutil

EDGE_TTS = "/Users/volodymyrkatasonov/Library/Python/3.9/bin/edge-tts"
AFCONVERT = "/usr/bin/afconvert"
OUTPUT_DIR = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/podcasts"
TMP_DIR = "/tmp/podcast_build_ep10_ep11"

VOICE_MAP = {
    "Остап": "uk-UA-OstapNeural",
    "Поліна": "uk-UA-PolinaNeural",
    "Gunnar": "is-IS-GunnarNeural",
    "Guðrún": "is-IS-GudrunNeural",
}

EPISODES = {
    "ep10": {
        "out_name": "ep10_sundlaugamenning",
        "lines": [
            ("Остап", "Вітаємо у десятому випуску нашого подкасту! Сьогодні ми занурюємося у серце ісландського суспільного життя — геотермальні басейни Sundlaugar."),
            ("Поліна", "Басейн для ісландців — це і клуб для спілкування, і спа-релакс, і місце обговорення політики. Але тут діє одне з найсуворіших гігієнічних правил у світі!"),
            ("Gunnar", "Góðan daginn! Reglan er mjög skýr og ófrávíkjanleg: Þú verður að fara í sturtu og þvo þér vandlega með sápu ÁN sundfata áður en þú ferð í laugina eða heita pottinn!"),
            ("Остап", "Так, у кожній душовій є наочна схема з зонами ретельного миття: höfuð (голова), handarkrikar (пахви), nárar (інтимна зона) та fætur (стопи)."),
            ("Guðrún", "Já, nákvæmlega! Og eftir sturtuna fer maður út í heita pottana. Hitastigið er frá þrjátíu og átta upp í fjörutíu og tvær gráður. Þar spjallar maður um veðrið og lífið!"),
            ("Поліна", "А які фрази допоможуть підтримати невимушену розмову в 'heitur pottur'?"),
            ("Gunnar", "Mjög algengt: 'Það er kalt í veðri en dásamlegt í pottinum!' eða 'Hvaðan ert þú?'"),
            ("Остап", "Запам'ятайте головні терміни: Sundlaug, Heitur pottur, Gufubað, Sturtusápa та Sundföt. Приємного відпочинку!"),
            ("Guðrún", "Njótið sundsins og sjáumst í næsta þætti!"),
            ("Gunnar", "Bless bless!")
        ]
    },
    "ep11": {
        "out_name": "ep11_fataverslun_og_skor",
        "lines": [
            ("Остап", "Привіт усім! Одинадцятий епізод присвячений шопінгу в торгових центрах Kringlan та Smáralind. Як правильно обрати одяг, поміряти та повернути річ у разі потреби?"),
            ("Поліна", "В Ісландії є приказка: 'Það er ekki til vont veður, bara vondur fatnaður' — Немає поганої погоди, є лише невідповідний одяг!"),
            ("Guðrún", "Góðan daginn og velkomin í búðina! Get ég aðstoðað þig við að finna rétta stærð eða lit?"),
            ("Поліна", "Já, takk. Má ég máta þessa úlpu? Hvar er mátunarklefinn? Og áttu hana til í stærð Medium?"),
            ("Guðrún", "Mátunarklefarnir eru þarna vinstra megin við speglana. Já, við eigum hana til í Medium og líka í svörtum lit!"),
            ("Остап", "А що робити, якщо одяг не підійшов удома? Які правила обміну?"),
            ("Gunnar", "Þú hefur vanalega fjórtán daga skilarétt með kvittun, svo framarlega sem verðmiðinn er á flíkinni og hún er ónotuð."),
            ("Поліна", "Запам'ятайте ключові поняття: Mátunarklefi, Skilaréttur, Kvittun, Verðmiði та Útsala (розпродаж)."),
            ("Остап", "Вдалих вам покупок і до зустрічі в наступному епізоді!"),
            ("Guðrún", "Gangi ykkur vel og bless bless!"),
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
        conv_res = subprocess.run(conv_cmd, capture_output=True, text=True)
        if conv_res.returncode != 0:
            print(f"ERROR: afconvert failed: {conv_res.stderr}")
            return

        size_mb = os.path.getsize(final_m4a) / (1024 * 1024)
        print(f"-> SUCCESS: {final_m4a} created! Size: {size_mb:.2f} MB")

    print("\nALL EP10 & EP11 BUILDS COMPLETED!")

if __name__ == "__main__":
    main()
