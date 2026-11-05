import asyncio
import os
import edge_tts

OUTPUT_DIALOGUE_DIR = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/dialogue"
OUTPUT_EXAM_DIR = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/exam"

os.makedirs(OUTPUT_DIALOGUE_DIR, exist_ok=True)
os.makedirs(OUTPUT_EXAM_DIR, exist_ok=True)

# Edge-TTS Icelandic voices
VOICE_MALE = "is-IS-GunnarNeural"
VOICE_FEMALE = "is-IS-GudrunNeural"

# Dialogue A2.8: Skatturinn og framtalið (Податкова служба та податкова декларація)
# Starfsmaður Skattsins (Gunnar) & Umsækjandi (Guðrún)
DIALOGUE_A2_K8 = [
    ("a2_k8_l1.mp3", "Góðan daginn. Hvernig get ég aðstoðað þig hjá Skattinum í dag?", VOICE_MALE),
    ("a2_k8_l2.mp3", "Góðan dag. Ég þarf aðstoð við að skila inn skattframtali á netinu.", VOICE_FEMALE),
    ("a2_k8_l3.mp3", "Ekkert mál. Þú skráir þig inn á skatturinn.is með rafrænum skilríkjum.", VOICE_MALE),
    ("a2_k8_l4.mp3", "Já, ég er með Auðkenni í símanum. Hvar sé ég persónuafsláttinn minn?", VOICE_FEMALE),
    ("a2_k8_l5.mp3", "Hann kemur fram sjálfkrafa undir liðnum launagreiðslur og frádrættir.", VOICE_MALE),
    ("a2_k8_l6.mp3", "Gott að vita. En ef ég á ónýttan persónuafslátt frá fyrri mánuðum?", VOICE_FEMALE),
    ("a2_k8_l7.mp3", "Kerfið reiknar það sjálfkrafa og millifærir ofgreiddan skatt á bankareikninginn þinn.", VOICE_MALE),
    ("a2_k8_l8.mp3", "Frábært! Kærar þakkir fyrir skýrar upplýsingar og góða hjálp.", VOICE_FEMALE)
]

# Lokapróf A2 Hlustun (6 listening tasks: questions 25-30)
EXAM_A2_K8 = [
    ("hlustun_a2k8_q25.mp3", "Góðan dag. Allir sem búa á Íslandi verða að skila skattframtali í mars.", VOICE_MALE),
    ("hlustun_a2k8_q26.mp3", "Þjóðhátíðardagur Íslendinga er haldinn hátíðlegur sautjánda júní á hverju ári.", VOICE_FEMALE),
    ("hlustun_a2k8_q27.mp3", "Ef þú skiptir um vinnu verður þú að láta nýja vinnuveitandann fá skattkortið þitt.", VOICE_MALE),
    ("hlustun_a2k8_q28.mp3", "Á Þorrablóti borða Íslendingar hefðbundinn mat eins og hákarl og svið.", VOICE_FEMALE),
    ("hlustun_a2k8_q29.mp3", "Útlendingastofnun afgreiðir dvalarleyfi og endurnýjun á skilríkjum.", VOICE_MALE),
    ("hlustun_a2k8_q30.mp3", "Til hamingju með að ljúka námskeiðinu í íslensku á stigi A2!", VOICE_FEMALE)
]

async def generate():
    print("=== Generating A2.8 Dialogue tracks ===")
    for filename, text, voice in DIALOGUE_A2_K8:
        path = os.path.join(OUTPUT_DIALOGUE_DIR, filename)
        print(f"Generating {filename} ({voice}): {text}")
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(path)

    print("\n=== Generating Lokapróf A2 Exam Hlustun tracks ===")
    for filename, text, voice in EXAM_A2_K8:
        path = os.path.join(OUTPUT_EXAM_DIR, filename)
        print(f"Generating {filename} ({voice}): {text}")
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(path)

    print("\nAll 14 tracks generated successfully!")

if __name__ == "__main__":
    asyncio.run(generate())
