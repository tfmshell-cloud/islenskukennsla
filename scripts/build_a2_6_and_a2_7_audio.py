import asyncio
import os
import edge_tts

TRACKS = [
    # --- LESSON A2.6 DIALOGUE (Shift Work Handover & Routine) ---
    ("Gudrun", "Hæ Gunnar, ert þú á kvöldvakt í dag eða byrjarðu á næturvaktinni á morgun?", "dialogue", "a2_k6_l1.mp3"),
    ("Gunnar", "Sæl Guðrún. Ég er á dagvakt núna til klukkan fjögur, en svo tek ég tvær næturvaktir um helgina.", "dialogue", "a2_k6_l2.mp3"),
    ("Gudrun", "Hvernig finnst þér að vinna á vöktum? Er ekki erfitt að hvílast almennilega?", "dialogue", "a2_k6_l3.mp3"),
    ("Gunnar", "Jú, stundum er það krefjandi, en samkvæmt lögum verðum við alltaf að fá að minnsta kosti ellefu tíma samfellda hvíld.", "dialogue", "a2_k6_l4.mp3"),
    ("Gudrun", "Einmitt. Klæðist þú alltaf hlífðarfötum á vaktinni eða máttu vera í þínum eigin fötum?", "dialogue", "a2_k6_l5.mp3"),
    ("Gunnar", "Í verksmiðjunni verðum við alltaf að klæðast öryggisskóm, vesti og vera með heyrnarhlífar.", "dialogue", "a2_k6_l6.mp3"),
    ("Gudrun", "Gott að vita. Eigum við að hittast á kaffistofunni í hádeginu og fá okkur kaffibolla?", "dialogue", "a2_k6_l7.mp3"),
    ("Gunnar", "Já, endilega! Sjáumst þar klukkan tólf þegar matarhléið byrjar.", "dialogue", "a2_k6_l8.mp3"),

    # --- LESSON A2.6 EXAM LISTENING (Hlustunarpróf) ---
    ("Gudrun", "Samkvæmt kjarasamningi eiga starfsmenn rétt á að minnsta kosti ellefu tíma samfelldri hvíld milli vakta.", "exam", "hlustun_a2k6_q12.mp3"),
    ("Gunnar", "Á morgun ætlum við að hittast á kaffistofunni og ræða nýja vaktatöflu fyrir næsta mánuð.", "exam", "hlustun_a2k6_q13.mp3"),
    ("Gudrun", "Þegar ég vinn á næturvakt finnst mér alltaf best að sofa í dimmu herbergi á daginn.", "exam", "hlustun_a2k6_q14.mp3"),
    ("Gunnar", "Allir starfsmenn verða að klæðast viðurkenndum öryggisfatnaði áður en farið er inn á vinnusvæðið.", "exam", "hlustun_a2k6_q15.mp3"),

    # --- LESSON A2.7 DIALOGUE (Opening a Bank Account & Auðkenni) ---
    ("Gunnar", "Góðan daginn, mig langar að stofna nýjan bankareikning og virkja rafræn skilríki í símanum.", "dialogue", "a2_k7_l1.mp3"),
    ("Gudrun", "Góðan daginn! Ertu með íslenska kennitölu og vegabréf eða ökuskírteini meðferðis?", "dialogue", "a2_k7_l2.mp3"),
    ("Gunnar", "Já, hérna er kennitöluskírteinið mitt og gild skilríki frá Útlendingastofnun.", "dialogue", "a2_k7_l3.mp3"),
    ("Gudrun", "Frábært. Viltu fá debetkort og viltu að við virkjum netbankann og Auðkennis-appið strax?", "dialogue", "a2_k7_l4.mp3"),
    ("Gunnar", "Já takk, ég þarf að geta borgað reikninga og kröfur sem koma inn í heimabankann.", "dialogue", "a2_k7_l5.mp3"),
    ("Gudrun", "Enginn vandi. Þú færð sent leyninúmer fyrir debetkortið í pósti eða beint í netbankann.", "dialogue", "a2_k7_l6.mp3"),
    ("Gunnar", "Hvað kostar að millifæra peninga yfir á annan reikning í íslenskum bönkum?", "dialogue", "a2_k7_l7.mp3"),
    ("Gudrun", "Venjulegar millifærslur í netbanka eru ókeypis. Reikningurinn þinn er nú tilbúinn til notkunar.", "dialogue", "a2_k7_l8.mp3"),

    # --- LESSON A2.7 EXAM LISTENING (Hlustunarpróf) ---
    ("Gudrun", "Til að virkja rafræn skilríki í símanum þarftu að mæta persónulega í banka með gild skilríki.", "exam", "hlustun_a2k7_q12.mp3"),
    ("Gunnar", "Allar kröfur og ógreiddir reikningar birtast sjálfkrafa í heimabankanum undir greiðslum.", "exam", "hlustun_a2k7_q13.mp3"),
    ("Gudrun", "Þú getur tekið út reiðufé í öllum hraðbönkum Landsbankans með debetkortinu þínu.", "exam", "hlustun_a2k7_q14.mp3"),
    ("Gunnar", "Vinnuveitandinn minn leggur launin inn á nýja bankareikninginn minn síðasta dag hvers mánaðar.", "exam", "hlustun_a2k7_q15.mp3"),
]

VOICES = {
    "Gunnar": "is-IS-GunnarNeural",
    "Gudrun": "is-IS-GudrunNeural",
}

async def generate():
    base_dir = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio"
    for speaker, text, folder, fname in TRACKS:
        out_dir = os.path.join(base_dir, folder)
        os.makedirs(out_dir, exist_ok=True)
        fpath = os.path.join(out_dir, fname)
        if os.path.exists(fpath):
            print(f"Skipping {fname} (exists)")
            continue
        voice = VOICES[speaker]
        print(f"Generating {fname} ({speaker}): {text[:40]}...")
        comm = edge_tts.Communicate(text, voice)
        await comm.save(fpath)
    print("Successfully completed synthesis for A2.6 & A2.7!")

if __name__ == "__main__":
    asyncio.run(generate())
