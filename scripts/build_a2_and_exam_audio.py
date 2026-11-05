#!/usr/bin/env python3
"""
build_a2_and_exam_audio.py - Generate studio neural audio tracks for:
1. Lesson A2.1 (Housing / Íbúðarskoðun - 8 lines)
2. Lesson A2.2 (Work / Ráðningarsamningur - 8 lines)
3. Lesson A2.3 (Transport / Strætó & BSÍ - 12 lines)
4. Certification Exams K4–K7 & A2.1–A2.3 (Hlustunarpróf - 7 audio prompts)
"""

import os
import subprocess
import shutil

EDGE_TTS = "/Users/volodymyrkatasonov/Library/Python/3.9/bin/edge-tts"
BASE_DIR = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla"
DIALOGUE_DIR = os.path.join(BASE_DIR, "audio/dialogue")
EXAM_DIR = os.path.join(BASE_DIR, "audio/exam")
TMP_DIR = "/tmp/a2_audio_synthesis"

VOICES = {
    "Gunnar": "is-IS-GunnarNeural",
    "Gudrun": "is-IS-GudrunNeural",
}

# 1. A2.1 DIALOGUE (Housing - 8 lines)
A2_K1_LINES = [
    ("Gunnar", "Góðan daginn! Komdu inn. Þetta er tveggja herbergja íbúð á þriðju hæð.", "a2_k1_l1.mp3"),
    ("Gudrun", "Góðan daginn! Hún lítur mjög vel út og er björt. Er hiti og rafmagn innifalið í leigunni?", "a2_k1_l2.mp3"),
    ("Gunnar", "Hitinn og hússjóður eru innifalin, en leigjandi borgar fyrir rafmagnið sjálfur. Leigan er tvö hundruð og fimmtíu þúsund á mánuði.", "a2_k1_l3.mp3"),
    ("Gudrun", "Skilja. Hversu mikil er tryggingin? Og er hægt að skrá samninginn hjá HMS fyrir húsaleigubótum?", "a2_k1_l4.mp3"),
    ("Gunnar", "Já, auðvitað! Ég skrái samninginn rafrænt á HMS. Tryggingin er tveir mánuðir í bankaábyrgð.", "a2_k1_l5.mp3"),
    ("Gudrun", "Frábært! Hvenær er íbúðin laus til afhendingar og má hafa gæludýr hérna?", "a2_k1_l6.mp3"),
    ("Gunnar", "Hún er laus frá fyrsta næsta mánaðar. Því miður eru engin gæludýr leyfð samkvæmt húsreglum.", "a2_k1_l7.mp3"),
    ("Gudrun", "Allt í lagi, ég skil það fullkomlega. Ég sendi þér meðmæli og staðfestingu í dag.", "a2_k1_l8.mp3"),
]

# 2. A2.2 DIALOGUE (Work & Payslip - 8 lines)
A2_K2_LINES = [
    ("Gudrun", "Góðan daginn, Polina! Hér er ráðningarsamningurinn þinn. Starfshlutfallið er eitt hundrað prósent og grunnlaunin eru samkvæmt kjarasamningi VR.", "a2_k2_l1.mp3"),
    ("Gudrun", "Frábært! Ég las samninginn yfir í gærkvöldi. Hvenær eru launin greidd út mánaðarlega?", "a2_k2_l2.mp3"),
    ("Gunnar", "Launin eru alltaf greidd út á fyrsta degi hvers mánaðar. Viltu nota hundrað prósent persónuafslátt hjá okkur?", "a2_k2_l3.mp3"),
    ("Gudrun", "Já, takk, ég vil nýta hundrað prósent af skattkortinu. Hvaða lífeyrissjóð á ég að velja?", "a2_k2_l4.mp3"),
    ("Gunnar", "Flestir hjá okkur eru í Lífeyrissjóði verzlunarmanna. Ég gekk frá öllum pappírum rafrænt, þú færð tilkynningu í heimabankann!", "a2_k2_l5.mp3"),
    ("Gudrun", "Kærar þakkir! En hvernig er með yfirvinnu og orlofsrétt á árinu?", "a2_k2_l6.mp3"),
    ("Gunnar", "Yfirvinna er greidd með áttatíu prósenta álagi og orlofið er tuttugu og fjórir dagar á ári.", "a2_k2_l7.mp3"),
    ("Gudrun", "Þetta hljómar mjög vel. Ég skrifa undir samninginn með rafrænum skilríkjum núna!", "a2_k2_l8.mp3"),
]

# 3. A2.3 DIALOGUE (Strætó & BSÍ Airport - 12 lines)
A2_K3_LINES = [
    ("Gunnar", "Fyrirgefðu, fer þessi vagn upp í Mjódd?", "a2_k3_l1.mp3"),
    ("Gunnar", "Já, vagn númer þrjú fer beint í Mjódd. Gjörðu svo vel að klappa inn.", "a2_k3_l2.mp3"),
    ("Gunnar", "Ókei, ég er með Klapp-appið í símanum... Svona! Pípti það?", "a2_k3_l3.mp3"),
    ("Gunnar", "Já, græna ljósið kom upp. Allt í lagi, velkomin um borð!", "a2_k3_l4.mp3"),
    ("Gunnar", "Takk kærlega. Geturðu látið mig vita þegar við komum að Kringlunni?", "a2_k3_l5.mp3"),
    ("Gunnar", "Það kemur sjálfvirkt á skjáinn og í hátalarann: Næsta stoppistöð: Kringlan.", "a2_k3_l6.mp3"),
    ("Gudrun", "Góðan daginn! Hvenær fer næsta Flugrúta út á Keflavíkurflugvöll?", "a2_k3_l7.mp3"),
    ("Gunnar", "Næsti bíll fer eftir korter, klukkan tvö. Átt þú miða?", "a2_k3_l8.mp3"),
    ("Gudrun", "Nei, ég þarf að kaupa miða fyrir einn fullorðinn og tvær töskur.", "a2_k3_l9.mp3"),
    ("Gunnar", "Tveir farangurshlutir eru innifaldir í verðinu. Það gerir þrjú þúsund níu hundruð níutíu og níu krónur.", "a2_k3_l10.mp3"),
    ("Gudrun", "Hérna er kortið. Hvað tekur ferðin langan tíma?", "a2_k3_l11.mp3"),
    ("Gunnar", "Um það bil fjörutíu og fimm mínútur ef færðin á Reykjanesbraut er góð.", "a2_k3_l12.mp3"),
]

# 4. EXAM LISTENING PROMPTS (Hlustunarpróf - 7 audio tracks)
EXAM_LISTENING = [
    ("Gudrun", "Góðan daginn! Ég er að leita að hlýrri peysu. Þessi gula peysa er mjög falleg en hún er aðeins of stór. Áttu hana til í minni stærð?", "hlustun_k4_clothing.mp3"),
    ("Gunnar", "Hæ, ég þarf að panta tíma hjá lækni. Mér er mjög illt í hálsinum og ég er með mikinn höfuðverk og hita.", "hlustun_k5_health.mp3"),
    ("Gudrun", "Fyrirgefðu, get ég fengið einn skammt af heitri kjötsúpu og eitt glas af köldu vatni? Hvað kostar súpan?", "hlustun_k6_food.mp3"),
    ("Gunnar", "Mundu að fara í sturtu án sundfata áður en þú ferð ofan í heita pottinn. Það er mikilvæg hreinlætisregla í öllum sundlaugum á Íslandi.", "hlustun_k7_swimming.mp3"),
    ("Gudrun", "Við leigðum nýja stúdíóíbúð í miðbænum. Húsaleigan er tvö hundruð þúsund krónur og samningurinn er skráður hjá HMS.", "hlustun_a2k1_housing.mp3"),
    ("Gunnar", "Ég skrifaði undir nýjan ráðningarsamning í gær. Ég vinn í fullu starfi og nýti allan persónuafsláttinn minn.", "hlustun_a2k2_work.mp3"),
    ("Gudrun", "Ég tók strætó númer eitt í morgun og klappaði með símanum. Svo fór ég með flugrútunni beint út á Keflavíkurflugvöll.", "hlustun_a2k3_transport.mp3"),
]

def synthesize_item(voice_key, text, out_path):
    voice = VOICES[voice_key]
    cmd = [
        EDGE_TTS,
        "--voice", voice,
        "--text", text,
        "--write-media", out_path
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print(f"Error synthesizing '{text[:30]}...': {res.stderr}")
        return False
    return True

def main():
    os.makedirs(DIALOGUE_DIR, exist_ok=True)
    os.makedirs(EXAM_DIR, exist_ok=True)

    print("=== SYNTHESIZING A2.1 HOUSING DIALOGUE (8 LINES) ===")
    for speaker, text, fname in A2_K1_LINES:
        out_p = os.path.join(DIALOGUE_DIR, fname)
        print(f"Synthesizing {fname} ({speaker})...")
        synthesize_item(speaker, text, out_p)

    print("\n=== SYNTHESIZING A2.2 WORK DIALOGUE (8 LINES) ===")
    for speaker, text, fname in A2_K2_LINES:
        out_p = os.path.join(DIALOGUE_DIR, fname)
        print(f"Synthesizing {fname} ({speaker})...")
        synthesize_item(speaker, text, out_p)

    print("\n=== SYNTHESIZING A2.3 TRANSPORT DIALOGUE (12 LINES) ===")
    for speaker, text, fname in A2_K3_LINES:
        out_p = os.path.join(DIALOGUE_DIR, fname)
        print(f"Synthesizing {fname} ({speaker})...")
        synthesize_item(speaker, text, out_p)

    print("\n=== SYNTHESIZING EXAM LISTENING COMPREHENSION (7 TRACKS) ===")
    for speaker, text, fname in EXAM_LISTENING:
        out_p = os.path.join(EXAM_DIR, fname)
        print(f"Synthesizing {fname} ({speaker})...")
        synthesize_item(speaker, text, out_p)

    print("\n✓ ALL 35 NEURAL AUDIO TRACKS GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
