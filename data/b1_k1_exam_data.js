/**
 * b1_k1_exam_data.js - Academic Examination Dataset for Level B1 • Lesson 1
 * (B1.1 PRÓF: VIÐTENGINGARHÁTTUR, EFNAHAGSMÁL OG KJARASAMNINGAR)
 * 15 Questions covering Subjunctive Mood, Economics & 4 Listening Tracks
 */

export const B1_K1_EXAM_DATA = {
  examId: "b1_k1_exam",
  chapterId: "b1_k1",
  titleUkr: "Іспит B1.1: Умовний спосіб (кон'юнктив), макроекономіка та трудові договори",
  titleIsl: "Próf B1.1: Viðtengingarháttur, efnahagsumræða og kjarasamningar",
  passingScore: 12, // 12 / 15
  totalQuestions: 15,

  questions: [
    {
      id: 1,
      type: "choice",
      question: "Hvenær er viðtengingarháttur (konjunktiv) aðallega notaður í nútímaíslensku?",
      options: [
        "Í aukasetningum eftir sagnir um ósk, vafa, vilja eða skilyrði (t.d. ég vil að...)",
        "Aðeins þegar maður talar um fortíðina í sögum",
        "Aðeins þegar maður spyr um klukkuna",
        "Bara í boðhætti þegar maður skipar einhverjum"
      ],
      correct: 0,
      explanation: "Viðtengingarháttur вживається у підрядних реченнях після дієслів волевиявлення, сумніву, наказу чи умови (vilja að, efast um að, vona að)."
    },
    {
      id: 2,
      type: "choice",
      question: "Hver er rétt mynd í viðtengingarhætti nútíðar af sögninni „að fara“ (ég vil að hann ...)?",
      options: [
        "fari (ég vil að hann fari)",
        "fer (hann fer)",
        "fór (hann fór)",
        "fara (að fara)"
      ],
      correct: 0,
      explanation: "Сильні дієслова у viðtengingarháttur nútíðar однини приймають закінчення -i: ég fari, þú farir, hann fari."
    },
    {
      id: 3,
      type: "choice",
      question: "Hvernig er rétt að segja óraunverulegt skilyrði: «Якби я був багатим, я б купив будинок»?",
      options: [
        "Ef ég væri ríkur, myndi ég kaupa hús",
        "Ef ég var ríkur, ég kaupa hús",
        "Ef ég er ríkur, ég keypti hús",
        "Ef ég verið ríkur, myndi ég keypti hús"
      ],
      correct: 0,
      explanation: "Нереальна умова в теперішньому часі будується: Ef + viðtengingarháttur þátíðar (ég væri...), myndi + nafnháttur (myndi kaupa)."
    },
    {
      id: 4,
      type: "choice",
      question: "Hver er viðtengingarháttur þátíðar af hjálparsögninni „að geta“ (ef ég ...)?",
      options: [
        "ég gæti",
        "ég geti",
        "ég gátu",
        "ég getaði"
      ],
      correct: 0,
      explanation: "Að geta -> þátíð fleirtala gátu -> I-умлаут dá/gá -> gæti (ég gæti — я міг би)."
    },
    {
      id: 5,
      type: "choice",
      question: "Hver er rétt mynd: «Ég óska þess að þú ... hamingjusamur»?",
      options: [
        "sért (viðtengingarháttur nútíðar af vera)",
        "ert (framsöguháttur)",
        "varst (þátíð)",
        "verið (lýsingarháttur)"
      ],
      correct: 0,
      explanation: "Після дієслова побажання (að óska þess að) обов'язковий viðtengingarháttur: ég sé, þú sért, hann sé."
    },
    {
      id: 6,
      type: "choice",
      question: "Hvað þýðir hugtakið „verðbólga“ í efnahagsfréttum?",
      options: [
        "Almenn hækkun á verðlagi á vörum og þjónustu sem rýrir gildi peninga",
        "Lækkun á sköttum einstaklinga",
        "Aukin sala á fasteignum í Reykjavík",
        "Gengi krónunnar gagnvart evru"
      ],
      correct: 0,
      explanation: "Verðbólga — це інфляція, тобто загальне зростання цін на товари та послуги, що зменшує купівельну спроможність грошей."
    },
    {
      id: 7,
      type: "choice",
      question: "Hver ákveður „stýrivexti“ á Íslandi og í hvaða tilgangi?",
      options: [
        "Peningastefnunefnd Seðlabanka Íslands til að hafa áhrif á verðbólgu og efnahagslíf",
        "Borgarstjórn Reykjavíkur til að greiða fyrir snjómokstur",
        "Stéttarfélagið Efling til að ákveða orlof",
        "Strætó bs. til að stilla fargjöld"
      ],
      correct: 0,
      explanation: "Stýrivextir (облікову ставку) встановлює Комітет монетарної політики Центрального банку (Seðlabankinn) для регулювання інфляції."
    },
    {
      id: 8,
      type: "choice",
      question: "Hvað er „kaupmáttur launa“?",
      options: [
        "Hversu mikið af vörum og þjónustu er hægt að kaupa fyrir launin",
        "Heildarfjöldi vinnustunda á mánuði",
        "Skattur sem dreginn er af launaseðli",
        "Upphæð persónuafsláttar"
      ],
      correct: 0,
      explanation: "Kaupmáttur — купівельна спроможність, тобто реальний обсяг товарів і послуг, які можна придбати за отриману заробітну плату."
    },
    {
      id: 9,
      type: "choice",
      question: "Hvað er „Karphúsið“ í tengslum við kjarasamninga?",
      options: [
        "Húsnæði ríkissáttasemjara þar sem samningafundir verkalýðsfélaga og atvinnurekenda fara fram",
        "Sjóminjasafnið við Grandagarð",
        "Aðalskrifstofa Skattsins",
        "Gamalt sjúkrahús á Akureyri"
      ],
      correct: 0,
      explanation: "Karphúsið — це резиденція Державного посередника (Ríkissáttasemjari), де відбуваються найважливіші переговори щодо колективних договорів."
    },
    {
      id: 10,
      type: "choice",
      question: "Hvernig er sögnin „að vilja“ í viðtengingarhætti þátíðar (ég ...)?",
      options: [
        "ég vildi (ég vildi að þú kæmir)",
        "ég vilji",
        "ég vildum",
        "ég viljandi"
      ],
      correct: 0,
      explanation: "Форма viðtengingarháttur þátíðar від að vilja в однині — ég vildi (я хотів би): «Ég vildi að veðrið væri betra»."
    },
    {
      id: 11,
      type: "choice",
      question: "Lestu setninguna: «Þótt veðrið ... slæmt, ætlum við að fara í göngutúr.» Hvaða form passar?",
      options: [
        "sé (viðtengingarháttur nútíðar eftir samtenginguna 'þótt')",
        "er (framsöguháttur)",
        "var (venjuleg þátíð)",
        "verið"
      ],
      correct: 0,
      explanation: "Сполучник допусту þótt (хоча) завжди вимагає після себе дієслова в умовному способі: «Þótt veðrið sé slæmt...»."
    },

    // 12–15: HLUSTUNARPRÓF B1 (STUDIO NEURAL TRACKS)
    {
      id: 12,
      type: "listening",
      audioUrl: "audio/exam/hlustun_b1k1_q12.mp3",
      question: "Hlustaðu á fréttina. Hvað tilkynnti Seðlabanki Íslands um stýrivexti?",
      options: [
        "Að stýrivextir verði óbreyttir í 9,25%",
        "Að stýrivextir lækki um 2%",
        "Að stýrivextir hækki í 15%",
        "Að stýrivöxtum verði hætt"
      ],
      correct: 0,
      explanation: "Диктор Gunnar промовляє: «Seðlabanki Íslands tilkynnti í morgun að stýrivextir verði óbreyttir í níu komma tuttugu og fimm prósentum»."
    },
    {
      id: 13,
      type: "listening",
      audioUrl: "audio/exam/hlustun_b1k1_q13.mp3",
      question: "Hlustaðu á hljóðklippuna. Hvers óskar mælandinn sér?",
      options: [
        "Að verðbólga hjaðni hraðar svo kaupmáttur aukist",
        "Að fólk fari í frí til útlanda",
        "Að allir fái nýja bíla",
        "Að veturinn verði kaldari"
      ],
      correct: 0,
      explanation: "Диктор Guðrún вимовляє: «Ég vildi óska þess að verðbólga hjaðnaði hraðar svo að fólk finni fyrir auknum kaupmætti»."
    },
    {
      id: 14,
      type: "listening",
      audioUrl: "audio/exam/hlustun_b1k1_q14.mp3",
      question: "Hlustaðu á yfirlýsinguna. Hvað sagði formaður verkalýðsfélagsins að væri nauðsynlegt?",
      options: [
        "Að tryggja lágmarkslaun sem duga til framfærslu",
        "Að fækka vinnustundum niður í tíu á viku",
        "Að hætta öllum samningum",
        "Að loka öllum verksmiðjum"
      ],
      correct: 0,
      explanation: "Диктор Gunnar пояснює: «Formaður verkalýðsfélagsins sagði að nauðsynlegt væri að tryggja lágmarkslaun sem dugi til framfærslu»."
    },
    {
      id: 15,
      type: "listening",
      audioUrl: "audio/exam/hlustun_b1k1_q15.mp3",
      question: "Hlustaðu á fréttina frá RÚV. Hvar funduðu samninganefndir fram á nótt?",
      options: [
        "Í Karphúsinu hjá ríkissáttasemjara",
        "Á veitingastað í miðbænum",
        "Á Keflavíkurflugvelli",
        "Í Háskóla Íslands"
      ],
      correct: 0,
      explanation: "Диктор Guðrún зазначає: «RÚV greinir frá því að samninganefndir hafi fundað fram á nótt í Karphúsinu hjá ríkissáttasemjara»."
    }
  ]
};
