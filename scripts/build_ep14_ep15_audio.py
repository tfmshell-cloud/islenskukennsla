#!/usr/bin/env python3
"""
build_ep14_ep15_audio.py - Generate neural audio tracks for Ep 14 & Ep 15
Ep 14: Kaffistofan: Menning á vinnustað og létt spjall (Tölum saman 2022)
Ep 15: Skóli og leikskóli: Mentor, veikindi barna og foreldrasamtal
"""

import os
import subprocess
import shutil

EDGE_TTS = "/Users/volodymyrkatasonov/Library/Python/3.9/bin/edge-tts"
AFCONVERT = "/usr/bin/afconvert"
OUTPUT_DIR = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/podcasts"
TMP_DIR = "/tmp/podcast_build_ep14_ep15"

VOICE_MAP = {
    "Остап": "uk-UA-OstapNeural",
    "Поліна": "uk-UA-PolinaNeural",
    "Gunnar": "is-IS-GunnarNeural",
    "Guðrún": "is-IS-GudrunNeural",
}

EPISODES = {
    "ep14": {
        "out_name": "ep14_kaffistofan_tolumsaman",
        "lines": [
            ("Остап", "Вітаємо у чотирнадцятому випуску нашого подкасту! Сьогодні ми занурюємося у святая святих ісландського офісу та виробництва — Kaffistofan, кімнату відпочинку та кухню, за матеріалами підручника Tölum saman 2022."),
            ("Поліна", "В ісландській робочій культурі є священні години: ранкова кава о десятій годині та пообідня о п'ятнадцятій. Пропустити Kaffipása — це майже образа для колективу!"),
            ("Gunnar", "Góðan daginn! Komdu sæl og sestu niður. Má bjóða þér nýlagað kaffi eða te? Við vorum einmitt að baka vöfflur!"),
            ("Поліна", "Já, takk kærlega! Ég fæ mér gjarnan einn bolla með smá mjólk. Hvað segirðu gott?"),
            ("Gunnar", "Allt fínt! En mundu eina mikilvæga reglu hérna á vinnustaðnum: Ganga alltaf frá eftir sig! Setja bollann beint í uppþvottavélina en ekki skilja hann eftir í vaskinum."),
            ("Остап", "Це найголовніший закон: 'Ganga frá eftir sig' — прибрати за собою, а 'uppþvottavél' — посудомийна машина. Залишити брудну чашку в раковині вважається поганим тоном!"),
            ("Guðrún", "Sæll Gunnar! Hvernig voru helgarplönin hjá þér? Fórstu kannski í sund eða á skíði?"),
            ("Gunnar", "Ég fór í sund á laugardaginn og svo slakaði ég bara á heima. Hvað með þig, Guðrún?"),
            ("Guðrún", "Við fjölskyldan fórum í göngutúr meðfram sjónum. Veðrið var dásamlegt!"),
            ("Поліна", "Чудові фрази для розмови за кавою: 'Hvað segirðu gott?', 'Hvað eru plönin um helgina?' та 'Viltu kaffi?'."),
            ("Остап", "Запам'ятайте ключові терміни: Kaffistofa, Kaffipása, Ganga frá eftir sig, Uppþvottavél та Vinnustaður. Легких вам розмов із колегами!"),
            ("Gunnar", "Njótið kaffisins og bless bless!"),
            ("Guðrún", "Bless!")
        ]
    },
    "ep15": {
        "out_name": "ep15_skoli_og_mentor",
        "lines": [
            ("Остап", "Привіт усім! П'ятнадцятий випуск присвячений родині та вихованню дітей в Ісландії: як влаштовані дитячі садки Leikskóli, початкова школа Grunnskóli та електронний кабінет Mentor.is."),
            ("Поліна", "В Ісландії практично вся комунікація між батьками та вчителями цифровізована. Захворіла дитина? Не треба дзвонити в школу — ви відкриваєте додаток Mentor або Vala і ставите помітку veikindi!"),
            ("Guðrún", "Góðan daginn! Ég er kennari í grunnskólanum. Ef barnið þitt er veikt, skráir þú forföll eða veikindi í Mentor fyrir klukkan átta á morgnana."),
            ("Поліна", "Góðan daginn! Já, sonur minn er með hita í dag svo hann kemst ekki í skólann. Ég skráði það í gegnum símann minn."),
            ("Guðrún", "Mjög gott! Og mundu að á morgun er foreldrasamtal. Þar ræðum við námsgengið, vellíðan í bekknum og hvernig honum gengur að læra íslensku."),
            ("Остап", "Foreldrasamtal — це індивідуальна батьківська бесіда, де вчитель ніколи не лає дитину привселюдно, а обговорює її індивідуальний поступ та комфорт у класі."),
            ("Gunnar", "Í leikskólanum og grunnskólanum eru allir úti að leika sér í hvaða veðri sem er! Mundu að senda hlý og vatnsheld útiföt með barninu á hverjum degi."),
            ("Поліна", "Так, Útiföt — вуличний водонепроникний одяг — обов'язковий і в сніг, і в дощ!"),
            ("Остап", "Ключові терміни для батьків: Leikskóli, Grunnskóli, Veikindi, Forföll, Foreldrasamtal та Útiföt. Успіхів вашим дітям у навчанні!"),
            ("Guðrún", "Gangi börnunum ykkar vel í skólanum! Bless bless!"),
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

    print("\nALL EPISODES (14 & 15) GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
