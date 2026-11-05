# Керівництво зі створення та оновлення подкастів у NotebookLM Studio
**Проєкт:** *Ісландська мова для українців (Íslenska fyrir alla • Audio Ecosystem)*  
**Локація аудіофайлів у проєкті:** `audio/podcasts/`

---

## 1. Які джерела (Sources) завантажувати в Google NotebookLM

Для того щоб штучний інтелект NotebookLM створив якісний глибокий огляд (Audio Overview) із правильною вимовою та українсько-ісландським контекстом, завантажте у блокнот такі файли:

1. **Головний реєстр державних джерел:**  
   `data/icelandic_sources.txt`
2. **Повний корпус навчальних діалогів та ситуацій:**  
   `data/podcasts_corpus.js`
3. **Дані відповідного розділу (наприклад, для A2.8 або B1):**  
   `data/a2_k8_society_data.js` або профільний файл уроку.

---

## 2. Майстер-промпти для створення подкастів у NotebookLM Audio Overview

В інтерфейсі **NotebookLM -> Studio -> Audio Overview -> Customize** введіть такий системний промпт:

### Промпт А: Поглиблений білінгвальний подкаст (Deep Dive для авто)
```text
Role: You are hosts of an engaging, high-yield educational podcast for Ukrainians living and working in Iceland, titled "Ісландська в дорозі: від ландшафту до вільного спілкування".

Format & Language Rules:
1. Language: Primary narration, cultural context, and linguistic explanations MUST be in natural, vibrant Ukrainian.
2. Icelandic Authenticity: Whenever you pronounce Icelandic words, phrases, grammatical terms, or dialogues, pronounce them with native Icelandic phonetics (preserving lateral click [tl], preaspiration [hk/hp/ht], and correct word stress strictly on the FIRST syllable).
3. Hosts Dynamic:
   - Host 1 (Остап): Strategic analyst, practical guide to living and surviving in Iceland (housing, contracts, work, institutions).
   - Host 2 (Поліна): Passionate linguist, dissects grammatical nuances, case endings, verb conjugations, and phonetic traps.
4. Pedagogical Flow:
   - Introduce the cultural or practical situation (e.g. visiting Skatturinn, buying a car, shift work vaktavinna).
   - Act out short authentic Icelandic dialogue lines slowly and clearly.
   - Deconstruct the syntax, prepositions (governing dative/accusative), and idioms.
   - Summarize 3-4 golden takeaway phrases for immediate use today.
5. Tone: Respectful, encouraging, intellectually rigorous, zero condescension, highly practical for daily life in Iceland.
```

---

### Промпт Б: Фонетичний та граматичний спецвипуск (Explaining BÍN & Phonetics)
```text
Focus: Icelandic morphology and phonetic acoustics for Ukrainian speakers.
Explain why Icelandic sounds the way it does:
- The lateral release [tl] in words like "fjall", "jökull", "einn".
- Preaspiration before double k, p, t (e.g. "takk" -> [tʰahk]).
- Middle voice verbs on -st (e.g. "að hittast", "mér finnst").
- The V2 word order rule in declarative sentences vs questions.
Structure as a friendly conversation between Ostap and Polina, illustrating each rule with vivid, everyday examples in Reykjavík.
```

---

## 3. Куди зберігати згенерований аудіофайл

1. Після генерації в NotebookLM натисніть **Download (три крапки -> Завантажити)**. Файл збережеться як `.m4a` (або `.wav`).
2. Перейменуйте файл відповідно до конвенції проєкту:
   - Наприклад: `audio/podcasts/ep16_vegir_og_vedur.m4a`
   - Або великий випуск: `audio/podcasts/b1_vstup_vidtengingarhattur.m4a`
3. Скопіюйте файл у директорію:
   `/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/audio/podcasts/`
4. Запустіть автосинхронізацію `rsync` по 4 дзеркалах проєкту.
