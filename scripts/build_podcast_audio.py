#!/usr/bin/env python3
"""
build_podcast_audio.py - Generate studio-quality neural bilingual podcast episodes
Uses edge-tts (Ostap, Polina, Gunnar, Gudrun) and converts to .m4a with afconvert.
"""

import os
import subprocess
import shutil

EDGE_TTS = "/Users/volodymyrkatasonov/Library/Python/3.9/bin/edge-tts"
AFCONVERT = "/usr/bin/afconvert"
OUTPUT_DIR = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/podcasts"
TMP_DIR = "/tmp/podcast_build"

VOICE_MAP = {
    "Остап": "uk-UA-OstapNeural",
    "Поліна": "uk-UA-PolinaNeural",
    "Gunnar": "is-IS-GunnarNeural",
    "Guðrún": "is-IS-GudrunNeural",
}

EPISODES = {
    "ep1": {
        "out_name": "ep1_hver_ert_thu",
        "lines": [
            ("Остап", "Привіт усім слухачам курсу «Ісландська в дорозі»! Сьогодні в першому епізоді ми розбираємо одну з найдивовижніших таємниць острова: чому в Ісландії майже ні в кого немає прізвищ? Президент, ваш сусід чи колега — всі звертаються виключно на «ти»."),
            ("Guðrún", "Já, nákvæmlega! Við notum aldrei eftirnöfn í daglega lífinu. Ég heiti Guðrún Jónsdóttir, en allir segja bara: «Hæ Guðrún!» við mig. Það er mjög vinalegt og opið."),
            ("Поліна", "І тут зверніть увагу на саму форму імені: Guðrún Jónsdóttir означає буквально «Гудрун, донька Йона». А для хлопця це було б «Jónsson» — «син Йона». Тобто це патронім — по батькові, а не прізвище!"),
            ("Остап", "А як же запитати людину, як її звати? Чи кажуть ісландці повільно «Hvað heitir þú»?"),
            ("Guðrún", "Nei, í daglegu tali renna orðin saman í eitt: «Hvað heitirðu?» [kʰvaːð ˈheiːtɪrðʏ]. Og ef þú vilt spyrja hvaðan einhver kemur: «Hvaðan ertu?» [kʰvaːðan ˈɛr̥tʏ]."),
            ("Поліна", "Це явище називається клітика або Samruni. Займенник «þú» після дієслова перетворюється на хвостик «-ðu» або «-tu»."),
            ("Gunnar", "Og mundu eftir mikilvægustu reglunni í íslensku: V2-reglunni! Sögnin verður alltaf að vera í öðru sæti í aðalsetningu. Ef þú byrjar á orðinu «Núna», þá verður þú að segja: «Núna bý ég í Reykjavík», alls ekki «Núna ég bý»."),
            ("Поліна", "А якщо ви відповідаєте, звідки ви приїхали, прийменник «frá» завжди вимагає давального відмінка Þágufall 🟡: «Ég er frá Úkraínu»! Закінчення змінюється на «-u»."),
            ("Остап", "Повторюйте прямо за кермом за нашими носіями: «Góðan daginn! Ég heiti... Gaman að kynnast þér!»"),
            ("Gunnar", "Sömuleiðis! Mjög gaman að kynnast þér. Gangi þér vel að æfa!"),
            ("Guðrún", "Bless bless, og heyrumst í næsta þætti!")
        ]
    },
    "ep3": {
        "out_name": "ep3_i_budinni_og_bonus",
        "lines": [
            ("Остап", "Вітаємо знову! Епізод третій. Сьогодні ми вирушаємо до найвідоміших ісландських супермаркетів — Bónus із жовтою свинею та Krónan із зеленим яблуком. Як не розгубитися між цінниками, вагою та касами самообслуговування?"),
            ("Guðrún", "Í Bónus og Krónan þarftu oft að spyrja starfsfólkið um vörur. Þú getur sagt kurteislega: «Afsakið, hvar finn ég smjör og ost?» eða «Hvað kostar kílóið af eplum?»"),
            ("Поліна", "Зверніть увагу на граматичну конструкцію ваги та міри. Прийменник «af» вимагає після себе давального відмінка: «kíló af eplum» — кілограм яблук. А як щодо упаковок?"),
            ("Gunnar", "Já! Við tölum um: «einn pakki af kaffi» (пачка кави), «ein dós af tómötum» (бляшанка томатів) og «ein flaska af mjólk» (пляшка молока)."),
            ("Остап", "А коли ви підходите до каси, касир або автомат самообслуговування ставить вам два сакральних питання кожного ісландця!"),
            ("Gunnar", "Fyrsta spurningin er: «Viltu poka?» [ˈvɪltʏ ˈpʰɔːka]. Og þú svarar: «Já, takk, einn poka» eða «Nei, takk, ég er með eigin poka»."),
            ("Guðrún", "Og önnur spurningin er: «Má bjóða þér kvittun?» [kvɪhtʏn]. Og þú segir einfaldlega: «Nei, takk, það er komið!» eða «Já, takk»."),
            ("Поліна", "Запам'ятайте золоту фразу ввічливості: «Það er komið, takk!» [θaːð ɛr ˈkʰɔːmɪð tʰahk] — «Все добре, готово, дякую!»"),
            ("Остап", "Чудово! Тепер у супермаркеті ви почуватиметеся впевнено. Побачимося в наступному епізоді, де ми приборкаємо підступний ісландський годинник!"),
            ("Gunnar", "Takk fyrir innkaupin og eigið góðan dag!"),
            ("Guðrún", "Bless bless!")
        ]
    }
}

def generate_episode(ep_key, ep_data):
    out_name = ep_data["out_name"]
    lines = ep_data["lines"]
    print(f"\n=== GENERATING {ep_key.upper()}: {out_name} ({len(lines)} lines) ===")
    
    ep_tmp = os.path.join(TMP_DIR, ep_key)
    if os.path.exists(ep_tmp):
        shutil.rmtree(ep_tmp)
    os.makedirs(ep_tmp, exist_ok=True)
    
    mp3_parts = []
    for i, (speaker, text) in enumerate(lines):
        voice = VOICE_MAP.get(speaker, "is-IS-GunnarNeural")
        part_path = os.path.join(ep_tmp, f"part_{i:02d}_{speaker}.mp3")
        print(f"[{i+1}/{len(lines)}] {speaker} ({voice}): {text[:45]}...")
        cmd = [
            EDGE_TTS,
            "--voice", voice,
            "--text", text,
            "--write-media", part_path
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Error generating line {i}: {res.stderr}")
            return False
        mp3_parts.append(part_path)
    
    # Concatenate MP3 parts
    combined_mp3 = os.path.join(ep_tmp, "combined.mp3")
    with open(combined_mp3, "wb") as out_f:
        for p in mp3_parts:
            with open(p, "rb") as in_f:
                out_f.write(in_f.read())
    
    # Convert to M4A with afconvert
    final_m4a = os.path.join(OUTPUT_DIR, f"{out_name}.m4a")
    conv_cmd = [
        AFCONVERT,
        "-f", "m4af",
        "-d", "aac",
        combined_mp3,
        final_m4a
    ]
    res_conv = subprocess.run(conv_cmd, capture_output=True, text=True)
    if res_conv.returncode != 0:
        print(f"Error in afconvert: {res_conv.stderr}")
        return False
    
    size_mb = os.path.getsize(final_m4a) / (1024 * 1024)
    print(f"-> SUCCESS: {final_m4a} created! Size: {size_mb:.2f} MB")
    return True

if __name__ == "__main__":
    os.makedirs(TMP_DIR, exist_ok=True)
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    for ep_k, ep_v in EPISODES.items():
        success = generate_episode(ep_k, ep_v)
        if not success:
            print(f"Failed to build {ep_k}")
            break
    print("\nALL PODCAST AUDIO BUILDS COMPLETED!")
