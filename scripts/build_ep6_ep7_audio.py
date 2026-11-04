#!/usr/bin/env python3
"""
build_ep6_ep7_audio.py - Generate studio-quality neural audio for Ep 6 & Ep 7
Uses edge-tts (Ostap, Polina, Gunnar, Gudrun) and converts to .m4a with afconvert.
"""

import os
import subprocess
import shutil

EDGE_TTS = "/Users/volodymyrkatasonov/Library/Python/3.9/bin/edge-tts"
AFCONVERT = "/usr/bin/afconvert"
OUTPUT_DIR = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/podcasts"
TMP_DIR = "/tmp/podcast_build_ep6_ep7"

VOICE_MAP = {
    "Остап": "uk-UA-OstapNeural",
    "Поліна": "uk-UA-PolinaNeural",
    "Gunnar": "is-IS-GunnarNeural",
    "Guðrún": "is-IS-GudrunNeural",
}

EPISODES = {
    "ep6": {
        "out_name": "ep6_kennitala_og_thjodskra",
        "lines": [
            ("Остап", "Вітаємо в шостому епізоді! Сьогодні ми розбираємо три кити юридичної інтеграції в Ісландії: національний ідентифікаційний номер Kennitala, банківський рахунок та договір оренди житла leigusamningur."),
            ("Поліна", "Кеннітала складається з десяти цифр. Перші шість — це день, місяць і рік вашого народження. А остання цифра вказує на століття: дев'ятка для народжених у двадцятому столітті, або нуль — для двадцять першого!"),
            ("Gunnar", "Góðan daginn! Til að opna bankareikning hjá okkur þarftu vegabréf, kennitölu og staðfestingu á heimilisfangi frá Þjóðskrá. Við aðstoðum þig líka við að virkja netbankann."),
            ("Остап", "А як активувати електронний підпис на ісландському номері телефону?"),
            ("Guðrún", "Þú ferð með símann og vegabréfið í bankann eða til Auðkenni. Þar færðu virkjuð rafræn skilríki. Með þeim geturðu skráð þig inn á allar opinberar vefsíður!"),
            ("Поліна", "І це критично важливо! Бо саме за допомогою Rafræn skilríki ви будете підписувати húsaleigusamningur — договір оренди квартири чи кімнати."),
            ("Gunnar", "Já! Og þegar leigusamningurinn er þinglýstur geturðu sótt um húsaleigubætur hjá HMS (Húsnæðis- og mannvirkjastofnun). Það lækkar leiguna verulega!"),
            ("Остап", "Яку суму зазвичай просять у якості застави trygging?"),
            ("Guðrún", "Venjulega er tryggingin tveir til þrír mánuðir. Vertu viss um að skoða íbúðina vel og taka myndir áður en þú flytur inn!"),
            ("Поліна", "Запам'ятайте головні юридичні терміни: Kennitala, Rafræn skilríki, Bankareikningur, Leigusamningur та Húsaleigubætur."),
            ("Остап", "Усе це допоможе вам впевнено зробити перші кроки на острові без посередників та переплат!"),
            ("Gunnar", "Gangi ykkur vel og sjáumst í næsta þætti!"),
            ("Guðrún", "Bless bless!")
        ]
    },
    "ep7": {
        "out_name": "ep7_straeto_og_ferdalog",
        "lines": [
            ("Остап", "Привіт усім! Сьомий випуск присвячений транспорту. Як пересуватися Рейк'явіком та подорожувати Ісландією без власного авто?"),
            ("Поліна", "Головний громадський транспорт столиці — це жовті автобуси Strætó. Але забудьте про готівку в кишені! Водії майже не дають решти."),
            ("Gunnar", "Góðan daginn! Þú getur keypt miða í Klapp-appinu í símanum eða notað Klapp-kort. Þú skannar bara símann hérna á skjánum. Píp! Það er komið."),
            ("Поліна", "Зверніть увагу: один квиток у додатку Klapp діє сімдесят п'ять хвилин і дозволяє безкоштовно робити пересадки на будь-які інші міські маршрути!"),
            ("Остап", "А де головні вузлові станції для пересадок у столиці?"),
            ("Guðrún", "Stærstu skiptistöðvarnar eru Hlemmur, Lækjartorg í miðbænum, og Mjódd í Breiðholti. Þar mætast næstum allar leiðir."),
            ("Gunnar", "Og ef þú ert að fara út á land, til dæmis til Akureyrar eða Víkur, þá ferðu á BSÍ — Umferðarmiðstöðina eða tekur landsbyggðarstrætó frá Mjódd."),
            ("Поліна", "Корисні фрази для пасажира: «Afsakið, stoppar þessi vagn við Háskólann?» або «Hvenær erum við á endastöð?»"),
            ("Guðrún", "Og munið að ýta á rauða hnappinn «Stopp» í tíma áður en vagninn kemur á biðstöðina þína!"),
            ("Остап", "І ввічливе прощання з водієм: при виході ісландці часто кажуть водієві «Takk!»."),
            ("Gunnar", "Já, það er mjög algengt og kurteislegt: «Takk fyrir farið!»"),
            ("Guðrún", "Góða ferð og sjáumst í næsta þætti!"),
            ("Остап", "До зустрічі!")
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
        print(f"[{i+1}/{len(lines)}] {speaker} ({voice}): {text[:40]}...")
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
    print("\nALL EP6 & EP7 BUILDS COMPLETED!")
