/**
 * Kafli1StudyMatrix.js - Interactive & Printable Academic Study Matrix for Lesson 1 (Kafli 1: Hver ert þú?)
 * Based on "Íslenska fyrir alla 1" & Google NotebookLM Studio Matrix:
 * 1. 👥 Матриця особових займенників (Persónufornöfn — 10 займенників + закон þeir/þær/þau)
 * 2. 🔄 Зведена 6-колонкова таблиця дієвідмінювання (vera, heita, tala [við tölum ⚠️], búa, læra, vinna)
 * 3. 🗺️ Топонімічна матриця прийменників frá, í та á (+ Давальний відмінок ÞGF 🟡)
 * 4. ❓ Порядок слів у питаннях (V2 Spurnarorð vs V1 Інверсія Já/Nei) та суфіксальне зрощення з -þú (Samruni)
 */

import { audioEngine } from './AudioEngine.js?v=7.3';

const PRONOUNS_TABLE = [
  { num: 'Однина (Eintala)', person: '1-ша особа', pro: 'ég', ipa: '[jɛːɣ]', uk: 'я', note: 'Звучить як йотоване «є-г» з м’яким гортанним кінцем.' },
  { num: 'Однина', person: '2-га особа', pro: 'þú', ipa: '[θuː]', uk: 'ти', note: 'Єдина універсальна форма звертання до всіх (від президента до дитини).' },
  { num: 'Однина', person: '3-тя ос. (чол.)', pro: 'hann', ipa: '[hanː]', uk: 'він', note: 'Для чоловіків та іменників чоловічого роду (kk. / m.).' },
  { num: 'Однина', person: '3-тя ос. (жін.)', pro: 'hún', ipa: '[huːn]', uk: 'вона', note: 'Для жінок та іменників жіночого роду (kvk. / f.).' },
  { num: 'Однина', person: '3-тя ос. (сер.)', pro: 'það', ipa: '[θaːð]', uk: 'воно / це', note: 'Для іменників середнього роду (hk. / n.) та вказівного «це».' },
  { num: 'Множина (Fleirtala)', person: '1-ша особа', pro: 'við', ipa: '[vɪːð]', uk: 'ми', note: 'Вимовляється з дзвінким міжзубним [ð] наприкінці.' },
  { num: 'Множина', person: '2-га особа', pro: 'þið', ipa: '[θɪːð]', uk: 'ви', note: 'Множинне звертання до кількох осіб.' },
  { num: 'Множина', person: '3-тя ос. (чол.)', pro: 'þeir', ipa: '[θeir]', uk: 'вони (чол.)', note: 'Виключно група чоловіків (10 чоловіків = þeir).' },
  { num: 'Множина', person: '3-тя ос. (жін.)', pro: 'þær', ipa: '[θair]', uk: 'вони (жін.)', note: 'Виключно група жінок (10 жінок = þær).' },
  { num: 'Множина', person: '3-тя ос. (зміш.)', pro: 'þau', ipa: '[θœy]', uk: 'вони (зміш.)', note: 'Змішана група (ч. + ж.) або середній рід. 10 чоловіків + 1 жінка = þau!' }
];

const VERBS_SUMMARY_ROWS = [
  {
    pronoun: 'ég',
    audioPro: 'ég',
    vera: { form: 'er', ipa: '[ɛr]', cue: 'ég er' },
    heita: { form: 'heiti', ipa: '[ˈheiti]', cue: 'ég heiti' },
    tala: { form: 'tala', ipa: '[ˈtʰala]', cue: 'ég tala' },
    bua: { form: 'bý', ipa: '[piː]', cue: 'ég bý' },
    laera: { form: 'læri', ipa: '[ˈlairɪ]', cue: 'ég læri' },
    vinna: { form: 'vinn', ipa: '[vɪnː]', cue: 'ég vinn' }
  },
  {
    pronoun: 'þú',
    audioPro: 'þú',
    vera: { form: 'ert', ipa: '[ɛrt]', cue: 'þú ert' },
    heita: { form: 'heitir', ipa: '[ˈheitɪr]', cue: 'þú heitir' },
    tala: { form: 'talar', ipa: '[ˈtʰalar]', cue: 'þú talar' },
    bua: { form: 'býrð', ipa: '[piːrð]', cue: 'þú býrð' },
    laera: { form: 'lærir', ipa: '[ˈlairɪr]', cue: 'þú lærir' },
    vinna: { form: 'vinnur', ipa: '[ˈvɪnːʏr]', cue: 'þú vinnur' }
  },
  {
    pronoun: 'hann / hún / það',
    audioPro: 'hann',
    vera: { form: 'er', ipa: '[ɛr]', cue: 'hann er' },
    heita: { form: 'heitir', ipa: '[ˈheitɪr]', cue: 'hún heitir' },
    tala: { form: 'talar', ipa: '[ˈtʰalar]', cue: 'hann talar' },
    bua: { form: 'býr', ipa: '[piːr]', cue: 'hún býr' },
    laera: { form: 'lærir', ipa: '[ˈlairɪr]', cue: 'hann lærir' },
    vinna: { form: 'vinnur', ipa: '[ˈvɪnːʏr]', cue: 'hún vinnur' }
  },
  {
    pronoun: 'við',
    audioPro: 'við',
    vera: { form: 'erum', ipa: '[ˈɛrʏm]', cue: 'við erum' },
    heita: { form: 'heitum', ipa: '[ˈheitʏm]', cue: 'við heitum' },
    tala: { form: 'tölum ⚠️', ipa: '[ˈtʰœlʏm]', cue: 'við tölum', highlight: true },
    bua: { form: 'búum', ipa: '[ˈpuːʏm]', cue: 'við búum' },
    laera: { form: 'lærum', ipa: '[ˈlairʏm]', cue: 'við lærum' },
    vinna: { form: 'vinnum', ipa: '[ˈvɪnːʏm]', cue: 'við vinnum' }
  },
  {
    pronoun: 'þið',
    audioPro: 'þið',
    vera: { form: 'eruð', ipa: '[ˈɛrʏð]', cue: 'þið eruð' },
    heita: { form: 'heitið', ipa: '[ˈheitɪð]', cue: 'þið heitið' },
    tala: { form: 'talið', ipa: '[ˈtʰalɪð]', cue: 'þið talið' },
    bua: { form: 'búið', ipa: '[ˈpuːɪð]', cue: 'þið búið' },
    laera: { form: 'lærið', ipa: '[ˈlairɪð]', cue: 'þið lærið' },
    vinna: { form: 'vinnið', ipa: '[ˈvɪnːɪð]', cue: 'þið vinnið' }
  },
  {
    pronoun: 'þeir / þær / þau',
    audioPro: 'þau',
    vera: { form: 'eru', ipa: '[ˈɛrʏ]', cue: 'þau eru' },
    heita: { form: 'heita', ipa: '[ˈheita]', cue: 'þau heita' },
    tala: { form: 'tala', ipa: '[ˈtʰala]', cue: 'þau tala' },
    bua: { form: 'búa', ipa: '[ˈpuːa]', cue: 'þau búa' },
    laera: { form: 'læra', ipa: '[ˈlaira]', cue: 'þau læra' },
    vinna: { form: 'vinna', ipa: '[ˈvɪnːa]', cue: 'þau vinna' }
  }
];

const TOPONYM_MATRIX = [
  {
    prep: 'frá',
    semantics: 'Походження (звідки)',
    rule: 'Універсально для всіх країн, міст та регіонів при відповіді на питання Hvaðan ert þú?',
    examples: [
      { text: 'frá Úkraínu', cue: 'frá Úkraínu' },
      { text: 'frá Íslandi', cue: 'frá Íslandi' },
      { text: 'frá Reykjavík', cue: 'frá Reykjavík' }
    ],
    dativeShifts: [
      '• Úkraína ➔ Úkraínu (ж.р. -a ➔ -u)',
      '• Ísland ➔ Íslandi (ср.р. додається -i)',
      '• Reykjavík (без змін)'
    ]
  },
  {
    prep: 'í',
    semantics: 'Проживання (у / в)',
    rule: '1. Материкові країни (за континентальним принципом). 2. Міста у затоках (-vík), долинах (-dalur), заглибинах (-vogur).',
    examples: [
      { text: 'í Úkraínu', cue: 'í Úkraínu' },
      { text: 'í Þýskalandi', cue: 'í Þýskalandi' },
      { text: 'í Reykjavík (затока -vík)', cue: 'í Reykjavík' },
      { text: 'í Kópavogi (затока -vogur)', cue: 'í Kópavogi' }
    ],
    dativeShifts: [
      '• Reykjavík (без змін)',
      '• Þýskaland ➔ Þýskalandi (+ -i)',
      '• Kópavogur ➔ Kópavogi (-ur ➔ -i)'
    ]
  },
  {
    prep: 'á',
    semantics: 'Проживання (на)',
    rule: '1. Острови (Ísland). 2. Міста на піщаних косах (-eyri), мисах (-nes), порогах/річках (-foss).',
    examples: [
      { text: 'á Íslandi (острів)', cue: 'á Íslandi' },
      { text: 'á Akureyri (коса -eyri)', cue: 'á Akureyri' },
      { text: 'á Selfossi (поріг -foss)', cue: 'á Selfossi' },
      { text: 'á Akranesi (мис -nes)', cue: 'á Akranesi' }
    ],
    dativeShifts: [
      '• Ísland ➔ Íslandi (+ -i)',
      '• Selfoss ➔ Selfossi (+ -i)',
      '• Akranes ➔ Akranesi (+ -i)'
    ]
  }
];

const SAMRUNI_QUESTIONS_MATRIX = [
  {
    type: 'Питальні питання (Spurnarorð)',
    law: 'Закон V2',
    structure: '[Питальне слово] + [V2 Дієслово] + [Підмет]',
    analytic: 'Hvað heitir þú?',
    analyticCue: 'Hvað heitir þú?',
    clitic: 'Hvað heitirðu?',
    cliticCue: 'Hvað heitirðu?',
    ipa: '[kvað ˈheitɪrðʏ]',
    uk: 'Як тебе звати?'
  },
  {
    type: 'Питальні питання (Spurnarorð)',
    law: 'Закон V2',
    structure: '[Питальне слово] + [V2 Дієслово] + [Підмет]',
    analytic: 'Hvaðan ert þú?',
    analyticCue: 'Hvaðan ert þú?',
    clitic: 'Hvaðan ertu?',
    cliticCue: 'Hvaðan ertu?',
    ipa: '[ˈkʰvaðan ɛrtʏ]',
    uk: 'Звідки ти?'
  },
  {
    type: 'Питальні питання (Spurnarorð)',
    law: 'Закон V2',
    structure: '[Питальне слово] + [V2 Дієслово] + [Підмет]',
    analytic: 'Hvar býrð þú?',
    analyticCue: 'Hvar býrð þú?',
    clitic: 'Hvar býrðu?',
    cliticCue: 'Hvar býrðu?',
    ipa: '[kvar ˈpiːrðʏ]',
    uk: 'Де ти живеш?'
  },
  {
    type: 'Загальні питання (Já/Nei)',
    law: 'Інверсія V1',
    structure: '[V1 Дієслово] + [Підмет þú] ➔ -tu / -ðu',
    analytic: 'Ert þú...?',
    analyticCue: 'Ert þú?',
    clitic: 'Ertu...?',
    cliticCue: 'Ertu frá Úkraínu?',
    ipa: '[ˈɛrtʏ]',
    uk: 'Ти є...? (Ertu frá Úkraínu?)'
  },
  {
    type: 'Загальні питання (Já/Nei)',
    law: 'Інверсія V1',
    structure: '[V1 Дієслово] + [Підмет þú] ➔ -tu / -ðu',
    analytic: 'Býrð þú...?',
    analyticCue: 'Býrð þú?',
    clitic: 'Býrðu...?',
    cliticCue: 'Býrð þú (Býrðu) í Reykjavík?',
    ipa: '[ˈpiːrðʏ]',
    uk: 'Ти живеш...? (Býrðu í Reykjavík?)'
  },
  {
    type: 'Загальні питання (Já/Nei)',
    law: 'Інверсія V1',
    structure: '[V1 Дієслово] + [Підмет þú] ➔ -tu / -ðu',
    analytic: 'Talar þú...?',
    analyticCue: 'Talar þú?',
    clitic: 'Talarðu...?',
    cliticCue: 'Talarðu íslensku?',
    ipa: '[ˈtʰalarðʏ]',
    uk: 'Ти розмовляєш...? (Talarðu íslensku?)'
  },
  {
    type: 'Загальні питання (Já/Nei)',
    law: 'Інверсія V1',
    structure: '[V1 Дієслово] + [Підмет þú] ➔ -tu / -ðu',
    analytic: 'Vinnur þú...?',
    analyticCue: 'Vinnur þú?',
    clitic: 'Vinnurðu...?',
    cliticCue: 'Hvar vinnurðu?',
    ipa: '[ˈvɪnːʏrðʏ]',
    uk: 'Ти працюєш...?'
  },
  {
    type: 'Загальні питання (Já/Nei)',
    law: 'Інверсія V1',
    structure: '[V1 Дієслово] + [Підмет þú] ➔ -tu / -ðu',
    analytic: 'Lærir þú...?',
    analyticCue: 'Lærir þú?',
    clitic: 'Lærirðu...?',
    cliticCue: 'Lærirðu?',
    ipa: '[ˈlairɪrðʏ]',
    uk: 'Ти вчиш...?'
  }
];

export class Kafli1StudyMatrix {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <div class="space-y-5 max-w-5xl mx-auto">
        
        <!-- Top Banner with Print / Copy -->
        <div class="arena-theme-card p-4 sm:p-5 rounded-2xl border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <span class="text-3xl">🎓</span>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-base sm:text-lg font-black text-white font-mono">
                  НАВЧАЛЬНА МАТРИЦЯ (STUDY MATRIX): УРОК 1 (KAFLI 1)
                </h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Íslenska fyrir alla 1 • NotebookLM Studio
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">
                4 зведені академічні таблиці • Кожен займенник, дієслово, топонім і питання озвучені (клік 🔊)
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 self-start sm:self-auto">
            <button id="k1-matrix-print-btn" class="px-3 py-1.5 rounded-xl bg-black/60 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-400 text-xs font-mono font-bold transition-all flex items-center gap-1.5">
              <span>🖨️</span><span>Друк / PDF Шпаргалки</span>
            </button>
          </div>
        </div>

        <!-- ================= BLOCK 1: PERSONAL PRONOUNS MATRIX ================= -->
        <div class="arena-theme-card p-4 sm:p-6 rounded-2xl border border-cyan-500/40 shadow-xl space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                Матриця 1 • Займенники
              </span>
              <h4 class="text-sm sm:text-base font-black text-white font-mono mt-1">
                👥 1. Матриця особових займенників (Persónufornöfn)
              </h4>
            </div>
            <span class="text-[11px] font-mono text-slate-400">Суворе трикомпонентне розмежування þeir / þær / þau</span>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-800">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-black/70 text-slate-300 font-mono text-[11px] border-b border-slate-800">
                  <th class="p-2.5">Число</th>
                  <th class="p-2.5">Особа / Рід</th>
                  <th class="p-2.5">Займенник 🔊</th>
                  <th class="p-2.5">IPA</th>
                  <th class="p-2.5">Переклад</th>
                  <th class="p-2.5">Соціолінгвістичне правило / Нейро-примітка</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/80">
                ${PRONOUNS_TABLE.map((row, idx) => `
                  <tr class="hover:bg-cyan-500/5 transition-colors ${idx >= 7 ? 'bg-amber-500/5' : ''}">
                    <td class="p-2.5 font-mono text-slate-400 text-[11px]">${row.num}</td>
                    <td class="p-2.5 font-sans text-slate-300">${row.person}</td>
                    <td class="p-2.5">
                      <button class="k1-mat-audio-btn px-2.5 py-1 rounded-lg bg-black/60 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-400 font-mono font-black text-white flex items-center justify-between gap-2 w-24 transition-all" data-phrase="${row.pro}">
                        <span>${row.pro}</span><span class="text-cyan-400 text-[10px]">🔊</span>
                      </button>
                    </td>
                    <td class="p-2.5 font-mono text-cyan-300 font-semibold">${row.ipa}</td>
                    <td class="p-2.5 font-sans font-bold text-amber-200">${row.uk}</td>
                    <td class="p-2.5 font-sans text-slate-300 leading-snug">${row.note}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- ================= BLOCK 2: 6-VERB CONJUGATION SUMMARY TABLE ================= -->
        <div class="arena-theme-card p-4 sm:p-6 rounded-2xl border border-amber-500/40 shadow-xl space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                Матриця 2 • Дієвідмінювання Nútíð
              </span>
              <h4 class="text-sm sm:text-base font-black text-white font-mono mt-1">
                🔄 2. Зведена таблиця дієвідмінювання 6 базових дієслів у теперішньому часі (Nútíð)
              </h4>
            </div>
            <span class="text-[11px] font-mono text-slate-400">Натисніть на будь-яку форму у клітинці 🔊</span>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-800">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-black/70 text-slate-300 font-mono text-[11px] border-b border-slate-800">
                  <th class="p-2.5">Особа / Займенник</th>
                  <th class="p-2.5">vera [ˈvɛːra]<br><span class="text-[10px] text-slate-400 font-sans">(бути)</span></th>
                  <th class="p-2.5">heita [ˈheiːta]<br><span class="text-[10px] text-slate-400 font-sans">(зватися)</span></th>
                  <th class="p-2.5">tala [ˈtʰaːla]<br><span class="text-[10px] text-amber-300 font-sans">(говорити • a➔ö)</span></th>
                  <th class="p-2.5">búa [ˈpuːa]<br><span class="text-[10px] text-cyan-300 font-sans">(жити • ú➔ý)</span></th>
                  <th class="p-2.5">læra [ˈlaiːra]<br><span class="text-[10px] text-slate-400 font-sans">(вчити)</span></th>
                  <th class="p-2.5">vinna [ˈvɪnːa]<br><span class="text-[10px] text-emerald-300 font-sans">(працювати • -ur)</span></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/80">
                ${VERBS_SUMMARY_ROWS.map(row => `
                  <tr class="hover:bg-amber-500/5 transition-colors">
                    <td class="p-2.5 font-mono font-bold text-cyan-300 whitespace-nowrap">${row.pronoun}</td>
                    ${['vera', 'heita', 'tala', 'bua', 'laera', 'vinna'].map(vKey => {
                      const cell = row[vKey];
                      return `
                        <td class="p-2">
                          <button class="k1-mat-audio-btn w-full px-2 py-1.5 rounded-lg ${cell.highlight ? 'bg-amber-500/20 border-amber-400' : 'bg-black/60 border-slate-700'} hover:border-cyan-400 border text-left transition-all" data-phrase="${cell.cue}">
                            <div class="font-mono font-black text-white flex items-center justify-between gap-1">
                              <span>${cell.form}</span><span class="text-[10px] text-cyan-400">🔊</span>
                            </div>
                            <div class="font-mono text-[10px] text-slate-400">${cell.ipa}</div>
                          </button>
                        </td>
                      `;
                    }).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-sans text-slate-200 flex items-center gap-2">
            <span>⚠️</span>
            <span><strong class="text-amber-300 font-mono">Ключовий граматичний ефект у дієслові tala:</strong> У формі <strong class="text-white font-mono">við tölum</strong> відбувається <strong>U-переглас (U-hljóðvarp)</strong>: коренева буква <strong>a</strong> під впливом закінчення <strong>-um</strong> мутує в <strong>ö</strong> (<code class="text-amber-300">a ➔ ö</code>).</span>
          </div>
        </div>

        <!-- ================= BLOCK 3: TOPONYMIC PREPOSITIONS MATRIX (FRÁ / Í / Á + ÞGF 🟡) ================= -->
        <div class="arena-theme-card p-4 sm:p-6 rounded-2xl border border-emerald-500/40 shadow-xl space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                Матриця 3 • Географія та Давальний відмінок (ÞGF 🟡)
              </span>
              <h4 class="text-sm sm:text-base font-black text-white font-mono mt-1">
                🗺️ 3. Топонімічна матриця прийменників «frá», «í» та «á» (+ Давальний відмінок ÞGF 🟡)
              </h4>
            </div>
            <span class="text-[11px] font-mono text-slate-400">Вибір прийменника залежить від ландшафту!</span>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-800">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-black/70 text-slate-300 font-mono text-[11px] border-b border-slate-800">
                  <th class="p-2.5 text-center w-20">Прийменник</th>
                  <th class="p-2.5 w-36">Семантика</th>
                  <th class="p-2.5">Географічний рельєф та правило вибору</th>
                  <th class="p-2.5">Приклади з топонімами 🔊</th>
                  <th class="p-2.5">Форма Давального відмінка (ÞGF 🟡)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/80">
                ${TOPONYM_MATRIX.map(row => `
                  <tr class="hover:bg-emerald-500/5 transition-colors">
                    <td class="p-2.5 text-center">
                      <span class="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-sm font-black">${row.prep}</span>
                    </td>
                    <td class="p-2.5 font-sans font-bold text-white">${row.semantics}</td>
                    <td class="p-2.5 font-sans text-slate-200 leading-snug max-w-xs">${row.rule}</td>
                    <td class="p-2.5 space-y-1">
                      ${row.examples.map(ex => `
                        <button class="k1-mat-audio-btn w-full px-2.5 py-1 rounded-lg bg-black/60 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-400 font-mono font-bold text-white flex items-center justify-between gap-2 text-left transition-all" data-phrase="${ex.cue}">
                          <span>${ex.text}</span><span class="text-emerald-400 text-[10px]">🔊</span>
                        </button>
                      `).join('')}
                    </td>
                    <td class="p-2.5 font-mono text-[11px] text-amber-200 space-y-0.5">
                      ${row.dativeShifts.map(s => `<div>${s}</div>`).join('')}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- ================= BLOCK 4: QUESTION WORD ORDER & SAMRUNI (-ÞÚ CLITICIZATION) ================= -->
        <div class="arena-theme-card p-4 sm:p-6 rounded-2xl border border-rose-500/40 shadow-xl space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                Матриця 4 • Синтаксис V2/V1 та Samruni
              </span>
              <h4 class="text-sm sm:text-base font-black text-white font-mono mt-1">
                ❓ 4. Порядок слів у питаннях та суфіксальне зрощення з «-þú» (Samruni / Cliticization)
              </h4>
            </div>
            <span class="text-[11px] font-mono text-slate-400">Порівняйте аналітичну та злиту форми на слух 🔊</span>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-800">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-black/70 text-slate-300 font-mono text-[11px] border-b border-slate-800">
                  <th class="p-2.5">Тип питання</th>
                  <th class="p-2.5">Синтаксичний закон</th>
                  <th class="p-2.5">Базовий варіант 🔊</th>
                  <th class="p-2.5">Зі зрощенням (Samruni) 🔊</th>
                  <th class="p-2.5">IPA-вимова</th>
                  <th class="p-2.5">Переклад</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/80">
                ${SAMRUNI_QUESTIONS_MATRIX.map(row => `
                  <tr class="hover:bg-rose-500/5 transition-colors">
                    <td class="p-2.5 font-sans font-bold text-slate-200">${row.type}</td>
                    <td class="p-2.5">
                      <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold ${row.law.includes('V2') ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}">${row.law}</span>
                      <div class="text-[10px] font-mono text-slate-400 mt-0.5">${row.structure}</div>
                    </td>
                    <td class="p-2.5">
                      <button class="k1-mat-audio-btn w-full px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-slate-800 border border-slate-700 font-mono text-slate-300 flex items-center justify-between gap-2 transition-all" data-phrase="${row.analyticCue}">
                        <span>${row.analytic}</span><span class="text-slate-400 text-[10px]">🔊</span>
                      </button>
                    </td>
                    <td class="p-2.5">
                      <button class="k1-mat-audio-btn w-full px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 font-mono font-black text-amber-300 flex items-center justify-between gap-2 transition-all" data-phrase="${row.cliticCue}">
                        <span>${row.clitic}</span><span class="text-amber-300 text-xs">🔊</span>
                      </button>
                    </td>
                    <td class="p-2.5 font-mono text-cyan-300 font-semibold">${row.ipa}</td>
                    <td class="p-2.5 font-sans text-slate-200">${row.uk}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('.k1-mat-audio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const phrase = btn.getAttribute('data-phrase');
        if (phrase) {
          audioEngine.playWord(phrase, btn);
        }
      });
    });

    const printBtn = this.container.querySelector('#k1-matrix-print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }
}
