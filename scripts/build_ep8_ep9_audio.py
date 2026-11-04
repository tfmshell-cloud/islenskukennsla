#!/usr/bin/env python3
"""
build_ep8_ep9_audio.py - Generate studio-quality neural audio for Ep 8 & Ep 9
Uses edge-tts (Ostap, Polina, Gunnar, Gudrun) and converts to .m4a with afconvert.
"""

import os
import subprocess
import shutil

EDGE_TTS = "/Users/volodymyrkatasonov/Library/Python/3.9/bin/edge-tts"
AFCONVERT = "/usr/bin/afconvert"
OUTPUT_DIR = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/podcasts"
TMP_DIR = "/tmp/podcast_build_ep8_ep9"

VOICE_MAP = {
    "Остап": "uk-UA-OstapNeural",
    "Поліна": "uk-UA-PolinaNeural",
    "Gunnar": "is-IS-GunnarNeural",
    "Guðrún": "is-IS-GudrunNeural",
}

EPISODES = {
    "ep8": {
        "out_name": "ep8_vinnumarkadurinn_efling",
        "lines": [
            ("Остап", "Вітаємо у восьмому епізоді нашого аудіокурсу! Сьогодні тема, від якої залежить ваш добробут в Ісландії: ринок праці, зарплатний розрахунковий лист Launaseðill та захист прав через профспілку Efling."),
            ("Поліна", "Першого числа кожного місяця роботодавець зобов'язаний надати вам Launaseðill. Якщо ви не розумієте його рядків, ви ризикуєте втратити тисячі крон за перепрацювання!"),
            ("Guðrún", "Sælir öll! Á launaseðlinum verður þú alltaf að skoða fjóra meginliði: Grunnlaun (grunnkaup), yfirvinnu (sem er ein komma átta prósent af mánaðarlaunum á tímann), orlofið tíu komma sautján prósent, og lífeyrissjóðinn fjögur prósent."),
            ("Остап", "Зверніть увагу: до пенсійного фонду lífeyrissjóður ви сплачуєте чотири відсотки, а роботодавець додає ще одинадцять з половиною відсотків зверху!"),
            ("Gunnar", "Já, nákvæmlega! Og ef það vantar eitthvað á launaseðilinn þinn, eða ef vinnuveitandinn borgar ekki á réttum tíma, áttu rétt á að leita til trúnaðarmanns á vinnustaðnum eða beint til stéttarfélagsins."),
            ("Поліна", "Довірена особа Trúnaðarmaður — це обраний представник профспілки прямо на вашому підприємстві, готелі чи заводі. Його обов'язок — захищати ваші інтереси."),
            ("Guðrún", "Hjá Eflingu og VR færðu líka styrki: endurgreiðslu fyrir íslenskunám, líkamsræktarkort, gleraugu og sjúkrasjóð ef þú veikist!"),
            ("Остап", "Отже, тримайте в пам'яті: Grunnlaun, Yfirvinna, Orlof, Lífeyrissjóður, Kjarasamningur та Trúnaðarmaður. Знайте свої права!"),
            ("Gunnar", "Gangi ykkur vel í vinnunni og sjáumst í næsta þætti!"),
            ("Guðrún", "Bless bless og góða vinnuviku!")
        ]
    },
    "ep9": {
        "out_name": "ep9_hargreidslustofa",
        "lines": [
            ("Остап", "Привіт усім! Дев'ятий випуск присвячений візиту до перукарні — Hárgreiðslustofa. Це фантастична розмовна практика для побутових описів, довжини та прикметників!"),
            ("Поліна", "Перше, з чого все починається — це запис на певний час: tímapöntun. Наприклад: 'Ég vildi panta tíma í klippingu' — Я хотіла б записатися на стрижку."),
            ("Guðrún", "Góðan daginn og velkomin! Viltu fá klippingu eða líka litun og strípur? Og hvernig viltu hafa síddina á hárinu?"),
            ("Поліна", "Ég vil bara láta snyrta endana, um tvo sentimetra, takk. Og lita ræturnar."),
            ("Остап", "А якщо приходить чоловік на коротку стрижку та моделювання бороди?"),
            ("Gunnar", "Fyrir mig: styttra á hliðunum, aðeins lengra að ofan, og endilega snyrta skeggið með vél!"),
            ("Guðrún", "Ekkert mál! Viltu að ég setji vax eða hlaup í hárið á eftir? Og hvernig finnst þér hitinn á vatninu við þvottinn?"),
            ("Gunnar", "Vatnið er fullkomið, takk kærlega!"),
            ("Поліна", "Запам'ятайте ключові вирази: Hárgreiðslustofa, Klipping, Litun, Snyrta endana, Styttra á hliðunum та Hvað kostar klippingin?"),
            ("Остап", "Не бійтеся спілкуватися ісландською навіть у кріслі перукаря. Це відкриває серця місцевих жителів!"),
            ("Guðrún", "Sjáumst hress og fín í næsta þætti!"),
            ("Gunnar", "Bless bless!")
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

    print("\nALL EP8 & EP9 BUILDS COMPLETED!")

if __name__ == "__main__":
    main()
