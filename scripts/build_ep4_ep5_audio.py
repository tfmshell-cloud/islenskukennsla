#!/usr/bin/env python3
"""
build_ep4_ep5_audio.py - Generate studio-quality neural audio for Ep 4 & Ep 5
Uses edge-tts (Ostap, Polina, Gunnar, Gudrun) and converts to .m4a with afconvert.
"""

import os
import subprocess
import shutil

EDGE_TTS = "/Users/volodymyrkatasonov/Library/Python/3.9/bin/edge-tts"
AFCONVERT = "/usr/bin/afconvert"
OUTPUT_DIR = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/podcasts"
TMP_DIR = "/tmp/podcast_build_ep4_ep5"

VOICE_MAP = {
    "Остап": "uk-UA-OstapNeural",
    "Поліна": "uk-UA-PolinaNeural",
    "Gunnar": "is-IS-GunnarNeural",
    "Guðrún": "is-IS-GudrunNeural",
}

EPISODES = {
    "ep4": {
        "out_name": "ep4_klukkan_og_daglegt_lif",
        "lines": [
            ("Остап", "Вітаємо в четвертому епізоді подкасту «Ісландська в дорозі»! Сьогодні ми розбираємо час. В Ісландії запізнення на роботу через неправильно зрозумілий годинник — це класика перших місяців життя."),
            ("Поліна", "Головна пастка: ви домовляєтеся про зустріч, і вам кажуть: «Hálf fimm». Якщо ви перекладете це англійською як half past five, тобто пів на шосту, ви запізнитеся рівно на годину! Бо в ісландській мові «hálf fimm» — це 04:30 або 16:30!"),
            ("Gunnar", "Já, nákvæmlega! «Hálf fimm» þýðir hálftími í fimm, sem sagt fjögur þrjátíu. Og mundu að tölurnar fyrir tímann eru alltaf í hvorugkyni: eitt, tvö, þrjú, fjögur!"),
            ("Поліна", "А як щодо чвертей? Чверть по — це «korter yfir», а за чверть — «korter í»."),
            ("Guðrún", "Rétt! «Korter yfir sjö» er sjö fimmtán. En «korter í átta» er sjö fjörutíu og fimm. Og tólf á hádegi heitir einfaldlega «hádegi»!"),
            ("Остап", "На виробництві, у готелях чи на будівництві всі живуть за графіком змін — «vaktir». Гудрун, які бувають зміни?"),
            ("Guðrún", "Við erum með þrjár meginvaktir: «morgunvakt» frá sjö til þrjú, «kvöldvakt» frá þrjú til ellefu, og «næturvakt» frá ellefu til sjö á morgnana."),
            ("Поліна", "І за вечірні та нічні зміни профспілки Efling та VR вимагають доплату — «álag» від 33% до 45% до вашої базової ставки!"),
            ("Gunnar", "Ef þú vinnur á næturnar færðu næturálag. En mundu að hvílast vel á milli vakta!"),
            ("Остап", "Повторюйте за нами прямо в дорозі: «Hvað er klukkan? — Klukkan er hálf fimm!»"),
            ("Guðrún", "Gangi ykkur vel og sjáumst í næsta þætti!"),
            ("Gunnar", "Bless bless!")
        ]
    },
    "ep5": {
        "out_name": "ep5_heilsugaeslan_og_lyfja",
        "lines": [
            ("Остап", "Привіт усім! Сьогодні розбираємо найважливіше для життя: як записатися до лікаря в районну поліклініку Heilsugæslan та як купити ліки в аптеці Lyfja чи Apótekarinn."),
            ("Поліна", "В ісландській граматиці біль описується безособовою конструкцією через давальний відмінок Þágufall 🟡: «Mér er illt í...»! Тобто «Мені є зле в голові чи горлі», а не «мій живіт болить»."),
            ("Guðrún", "Góðan daginn! Velkomin á heilsugæsluna. Hvað amar að þér? Hvar finnurðu fyrir óþægindum?"),
            ("Поліна", "Mér er illt í hálsinum og mér er óglatt. Og ég er með mikinn hita í dag."),
            ("Gunnar", "Ég skil. Taktu djúpan andardrátt. Þú ert með slæma hálsbólgu og hita. Ég ætla að skrifa upp á sýklalyf og verkjalyf fyrir þig."),
            ("Остап", "А де взяти рецепт? Чи видає лікар паперовий бланк із печаткою?"),
            ("Guðrún", "Nei, engin pappírsblöð! Lyfseðillinn fer beint inn í rafræna kerfið með kennitölunni þinni. Þú ferð bara í næsta apótek og segir kennitöluna þína."),
            ("Поліна", "А для запису до лікаря або консультації медсестри всі в Ісландії користуються державним порталом Heilsuvera.is з електронним підписом Rafræn skilríki!"),
            ("Gunnar", "Já! Á Heilsuveru geturðu líka sent skilaboð á heimilislækninn þinn eða endurnýjað lyfseðla. Það er mjög þægilegt."),
            ("Остап", "Головна порада: якщо температура не спадає, а поліклініка зачинена, після 17:00 та на вихідних телефонуйте на чергову лінію 1700 або приїжджайте до Læknavaktin!"),
            ("Guðrún", "Góðan bata og passaðu upp á heilsuna!"),
            ("Gunnar", "Bless bless!")
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
    print("\nALL EP4 & EP5 BUILDS COMPLETED!")
