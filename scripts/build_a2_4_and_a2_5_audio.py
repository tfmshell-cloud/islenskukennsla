import asyncio
import os
import edge_tts

# Audio tracks to generate:
# A2.4 Dialogues (8 tracks)
# A2.4 Exam Listening (4 tracks)
# A2.5 Dialogues (8 tracks)
# A2.5 Exam Listening (4 tracks)

TRACKS = [
    # --- LESSON A2.4 DIALOGUE (Call to 1700 - Læknavaktin) ---
    ("Gunnar", "Góðan kvöldið, ég er að hringja í sautján hundruð af því að mér líður mjög illa.", "dialogue", "a2_k4_l1.mp3"),
    ("Gudrun", "Góða kvöldið. Hvert er kennitölunúmerið þitt og hvaða einkenni ertu með?", "dialogue", "a2_k4_l2.mp3"),
    ("Gunnar", "Kennitalan er núll einn núll tveir níutíu... Ég er með mikinn hita, svima og slæman verk í brjósti.", "dialogue", "a2_k4_l3.mp3"),
    ("Gudrun", "Hversu lengi hefur þú verið með þennan verk og ertu með mæði?", "dialogue", "a2_k4_l4.mp3"),
    ("Gunnar", "Verkurinn byrjaði fyrir tveimur tímum og mér finnst erfitt að anda djúpt.", "dialogue", "a2_k4_l5.mp3"),
    ("Gudrun", "Þetta gæti verið alvarlegt. Ég ætla að senda sjúkrabíl strax eða þú verður að koma á bráðamóttökuna í Fossvogi.", "dialogue", "a2_k4_l6.mp3"),
    ("Gunnar", "Er bráðamóttakan opin alla nóttina og þarf ég að hafa rafræn skilríki meðferðis?", "dialogue", "a2_k4_l7.mp3"),
    ("Gudrun", "Já, Landspítalinn í Fossvogi er opinn allan sólarhringinn. Taktu skilríki með og við látum lækninn vita.", "dialogue", "a2_k4_l8.mp3"),

    # --- LESSON A2.4 EXAM LISTENING (Hlustunarpróf) ---
    ("Gunnar", "Þú átt að taka tvær töflur af sýklalyfinu á hverjum morgni með mat í tíu daga.", "exam", "hlustun_a2k4_q12.mp3"),
    ("Gudrun", "Læknirinn endurnýjaði lyfseðilinn minn í gegnum Heilsuveru og lyfin eru tilbúin í Lyfju.", "exam", "hlustun_a2k4_q13.mp3"),
    ("Gunnar", "Ef þú þarft að ná í lækni utan dagvinnutíma heilsugæslunnar geturðu alltaf hringt í síma sautján hundruð.", "exam", "hlustun_a2k4_q14.mp3"),
    ("Gudrun", "Mér líður miklu betur í dag eftir að ég fór á heilsugæsluna og hitti heimilislækninn minn.", "exam", "hlustun_a2k4_q15.mp3"),

    # --- LESSON A2.5 DIALOGUE (Conversation at Leikskóli) ---
    ("Gudrun", "Komdu sæll, Gunnar! Ég er komin að sækja hann Emil. Hvernig gekk dagurinn hjá honum?", "dialogue", "a2_k5_l1.mp3"),
    ("Gunnar", "Sæl Guðrún! Dagurinn gekk mjög vel. Hann borðaði allan matinn sinn og svaf í tvo tíma.", "dialogue", "a2_k5_l2.mp3"),
    ("Gudrun", "Frábært að heyra. Fóru krakkarnir út að leika í morgun þrátt fyrir rigninguna?", "dialogue", "a2_k5_l3.mp3"),
    ("Gunnar", "Já, við vorum úti í einn og hálfan tíma. Allir voru í hlýjum ullarfötum og pollagalla.", "dialogue", "a2_k5_l4.mp3"),
    ("Gudrun", "Mundirðu eftir að skrá fjarvistina hans á morgun í Mentor? Við eigum tíma hjá tannlækni.", "dialogue", "a2_k5_l5.mp3"),
    ("Gunnar", "Já, ég sá tilkynninguna í Mentor-appinu. Það er allt skráð samkvæmt reglunum.", "dialogue", "a2_k5_l6.mp3"),
    ("Gudrun", "Þarf ég að koma með nýja vettlinga eða aukaföt fyrir föstudaginn?", "dialogue", "a2_k5_l7.mp3"),
    ("Gunnar", "Já, endilega komdu með auka ullarsokka og þurra vettlinga í hólfið hans.", "dialogue", "a2_k5_l8.mp3"),

    # --- LESSON A2.5 EXAM LISTENING (Hlustunarpróf) ---
    ("Gudrun", "Aðlögunin í leikskólanum tekur vanalega tvær vikur þar sem foreldri er með barninu fyrstu dagana.", "exam", "hlustun_a2k5_q12.mp3"),
    ("Gunnar", "Ég tilkynnti veikindi dóttur minnar í morgun í gegnum Mentor áður en skólinn byrjaði.", "exam", "hlustun_a2k5_q13.mp3"),
    ("Gudrun", "Börnin í fyrsta til fjórða bekk geta verið á frístundaheimili eftir að hefðbundnum skóladegi lýkur.", "exam", "hlustun_a2k5_q14.mp3"),
    ("Gunnar", "Kennarinn sendi vikupóst til allra foreldra með mikilvægum upplýsingum um vettvangsferðina á föstudaginn.", "exam", "hlustun_a2k5_q15.mp3"),
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
    print("Successfully completed synthesis for A2.4 & A2.5!")

if __name__ == "__main__":
    asyncio.run(generate())
