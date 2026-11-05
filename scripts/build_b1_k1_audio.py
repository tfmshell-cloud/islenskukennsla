import asyncio
import os
import edge_tts

OUTPUT_DIALOGUE_DIR = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/dialogue"
OUTPUT_EXAM_DIR = "/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/exam"

os.makedirs(OUTPUT_DIALOGUE_DIR, exist_ok=True)
os.makedirs(OUTPUT_EXAM_DIR, exist_ok=True)

VOICE_MALE = "is-IS-GunnarNeural"
VOICE_FEMALE = "is-IS-GudrunNeural"

# Dialogue B1.1: Efnahagsumræða og kjarasamningar (Економічні дебати та кон'юнктив)
# Gunnar (Hagfræðingur SA) & Guðrún (Formaður Eflingar)
DIALOGUE_B1_K1 = [
    ("b1_k1_l1.mp3", "Góðan dag, Guðrún. Hvernig líst þér á stöðuna í komandi kjaraviðræðum?", VOICE_MALE),
    ("b1_k1_l2.mp3", "Sæll Gunnar. Við krefjumst þess að kaupmáttur launafólks verði varinn gegn verðbólgu.", VOICE_FEMALE),
    ("b1_k1_l3.mp3", "Ég skil það vel, en ef stýrivextir Seðlabankans lækkuðu ekki, gæti mikil launahækkun aukið verðbólguna.", VOICE_MALE),
    ("b1_k1_l4.mp3", "Það væri óásættanlegt að launafólk bæri eitt allar byrðar efnahagsstjórnarinnar.", VOICE_FEMALE),
    ("b1_k1_l5.mp3", "Vissulega. Við viljum að samningar stuðli að stöðugleika og aukinni framleiðni í atvinnulífinu.", VOICE_MALE),
    ("b1_k1_l6.mp3", "Ef ríkisstjórnin kæmi að borðinu með skattalækkanir og aðgerðir í húsnæðismálum, myndi það greiða fyrir samningum.", VOICE_FEMALE),
    ("b1_k1_l7.mp3", "Það er skynsamleg nálgun. Við skulum vona að samningar náist fyrir lok mánaðarins.", VOICE_MALE),
    ("b1_k1_l8.mp3", "Sammála. Það er mikilvægt að allir aðilar sýni ábyrgð og vinni að sameiginlegu markmiði.", VOICE_FEMALE)
]

# Exam B1.1 Listening Comprehension (Hlustun 4 tracks: q12 - q15)
EXAM_B1_K1 = [
    ("hlustun_b1k1_q12.mp3", "Seðlabanki Íslands tilkynnti í morgun að stýrivextir verði óbreyttir í níu komma tuttugu og fimm prósentum.", VOICE_MALE),
    ("hlustun_b1k1_q13.mp3", "Ég vildi óska þess að verðbólga hjaðnaði hraðar svo að fólk finni fyrir auknum kaupmætti.", VOICE_FEMALE),
    ("hlustun_b1k1_q14.mp3", "Formaður verkalýðsfélagsins sagði að nauðsynlegt væri að tryggja lágmarkslaun sem dugi til framfærslu.", VOICE_MALE),
    ("hlustun_b1k1_q15.mp3", "RÚV greinir frá því að samninganefndir hafi fundað fram á nótt í Karphúsinu hjá ríkissáttasemjara.", VOICE_FEMALE)
]

async def generate():
    print("=== Generating B1.1 Dialogue tracks ===")
    for filename, text, voice in DIALOGUE_B1_K1:
        path = os.path.join(OUTPUT_DIALOGUE_DIR, filename)
        print(f"Generating {filename} ({voice}): {text[:45]}...")
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(path)

    print("\n=== Generating B1.1 Exam Listening tracks ===")
    for filename, text, voice in EXAM_B1_K1:
        path = os.path.join(OUTPUT_EXAM_DIR, filename)
        print(f"Generating {filename} ({voice}): {text[:45]}...")
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(path)

    print("\nAll 12 tracks for B1.1 generated successfully!")

if __name__ == "__main__":
    asyncio.run(generate())
