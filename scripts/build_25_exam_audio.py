import asyncio
import os
import edge_tts

NEW_EXAM_AUDIO = [
    # K4 (2 new)
    ("Gunnar", "Hvaða stærð ert þú í? Við eigum til Medium og Large.", "hlustun_k4_q13.mp3"),
    ("Gudrun", "Fyrirgefðu, hvar er mátunarklefinn? Má ég máta þessa peysu?", "hlustun_k4_q14.mp3"),
    
    # K5 (2 new)
    ("Gudrun", "Læknirinn sendi rafrænan lyfseðil beint í tölvukerfi apótekanna í gegnum Heilsuveru.", "hlustun_k5_q13.mp3"),
    ("Gunnar", "Ég þarf að kaupa verkjalyf eins og parasetamól og sýklalyf í apótekinu.", "hlustun_k5_q14.mp3"),
    
    # K6 (2 new)
    ("Gudrun", "Fyrirgefðu, getum við fengið reikninginn? Við viljum borga núna.", "hlustun_k6_q13.mp3"),
    ("Gunnar", "Greiðið þið saman eða sitthvoru lagi? Hér er kortaposinn.", "hlustun_k6_q14.mp3"),
    
    # K7 (3 new)
    ("Gudrun", "Mér er mjög illt í höfðinu og hálsinum í dag.", "hlustun_k7_q12.mp3"),
    ("Gunnar", "Í dag er mikil rigning og rok úti. Ekki gleyma regnkápunni.", "hlustun_k7_q14.mp3"),
    ("Gudrun", "Á sumrin eru bjartar nætur á Íslandi og sólin sest varla um miðnætti.", "hlustun_k7_q15.mp3"),
    
    # A2.1 (3 new)
    ("Gunnar", "Þetta er fallegt einbýlishús með stórum garði í Hafnarfirði.", "hlustun_a2k1_q12.mp3"),
    ("Gudrun", "Við borguðum húsaleiguna og trygginguna á réttum tíma í gær.", "hlustun_a2k1_q13.mp3"),
    ("Gunnar", "Í síðustu viku sendum við rafræna umsókn um húsaleigubætur til HMS.", "hlustun_a2k1_q14.mp3"),
    
    # A2.2 (3 new)
    ("Gudrun", "Útborguð laun eru lögð inn á bankareikninginn minn um hver mánaðamót.", "hlustun_a2k2_q12.mp3"),
    ("Gunnar", "Í gær drukkum við kaffi saman á kaffistofunni og ræddum nýja samninginn.", "hlustun_a2k2_q13.mp3"),
    ("Gudrun", "Reynslutíminn er venjulega þrír mánuðir samkvæmt kjarasamningi stéttarfélagsins.", "hlustun_a2k2_q14.mp3"),
    
    # A2.3 (3 new)
    ("Gunnar", "Á Íslandi er ljósaskylda allan sólarhringinn, allan ársins hring á öllum vegum.", "hlustun_a2k3_q12.mp3"),
    ("Gudrun", "Vegurinn yfir Hellisheiði er lokaður vegna óveðurs og mikillar ófærðar.", "hlustun_a2k3_q13.mp3"),
    ("Gunnar", "Fyrirtækið greiðir samgöngustyrk fyrir þá starfsmenn sem nota strætó eða hjóla í vinnuna.", "hlustun_a2k3_q14.mp3"),
]

VOICES = {
    "Gunnar": "is-IS-GunnarNeural",
    "Gudrun": "is-IS-GudrunNeural",
}

async def generate():
    out_dir = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/exam"
    os.makedirs(out_dir, exist_ok=True)
    for speaker, text, fname in NEW_EXAM_AUDIO:
        voice = VOICES[speaker]
        fpath = os.path.join(out_dir, fname)
        if os.path.exists(fpath):
            print(f"Skipping {fname} (exists)")
            continue
        print(f"Generating {fname} ({speaker}): {text[:35]}...")
        comm = edge_tts.Communicate(text, voice)
        await comm.save(fpath)
    print("Done generating 18 exam audio files!")

if __name__ == "__main__":
    asyncio.run(generate())
