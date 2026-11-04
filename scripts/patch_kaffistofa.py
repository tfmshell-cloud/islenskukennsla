#!/usr/bin/env python3
"""
patch_kaffistofa.py - Add Kaffistofan á vinnustaðnum (Tölum saman 2022) to DropsFlexionLab.js
"""

path = '/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/components/DropsFlexionLab.js'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update tab button
old_buttons = '''            <button data-lab-tab="cafe" class="lab-tab-btn px-3 py-1 rounded-lg font-bold transition-all ${this.activeLabTab === 'cafe' ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              ☕ Кав'ярня (Showcase & Barista)
            </button>'''

new_buttons = '''            <button data-lab-tab="cafe" class="lab-tab-btn px-3 py-1 rounded-lg font-bold transition-all ${this.activeLabTab === 'cafe' ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              ☕ Кав'ярня (Showcase & Barista)
            </button>
            <button data-lab-tab="kaffistofa" class="lab-tab-btn px-3 py-1 rounded-lg font-bold transition-all ${this.activeLabTab === 'kaffistofa' ? 'bg-gradient-to-r from-purple-400 to-cyan-400 text-black shadow-md font-extrabold' : 'text-purple-300 hover:text-white border border-purple-500/30'}">
              🏢 Kaffistofan (Tölum saman 2022)
            </button>'''

assert old_buttons in text, "old_buttons not found"
text = text.replace(old_buttons, new_buttons, 1)

# 2. Add Kaffistofa View right after lab-tab-view-cafe
target_end_cafe = '        </div>\n\n        <!-- ================= 2. FLYING FLEXIONS TAB ================= -->'

kaffistofa_view = '''        </div>

        <!-- ================= 1.5 KAFFISTOFAN Á VINNUSTAÐNUM (TÖLUM SAMAN 2022) ================= -->
        <div id="lab-tab-view-kaffistofa" class="lab-tab-view ${this.activeLabTab === 'kaffistofa' ? '' : 'hidden'} space-y-4">
          
          <!-- Header Banner -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-cyber-card to-cyber-deep border border-purple-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="space-y-1.5 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold">
                <span>🏢 ЕТИКЕТ НА РОБОЧОМУ МІСЦІ</span>
                <span>TÖLUM SAMAN 2022 (FA / FRÆÐSLUGÁTT)</span>
              </div>
              <h3 class="text-xl font-black text-white font-mono">Kaffistofan: Неписані правила ісландських колег</h3>
              <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Перерва на каву (<em>Kaffipása</em>) о 10:00 та 15:00 — це священний ритуал за колективним договором. 
                Тут відпрацьовуються дієслова з подвійним керуванням: <strong>bjóða einhverjum (ÞGF 🟡) eitthvað (ÞF 🟢)</strong> 
                та негласне правило: <em>«Allir ganga frá eftir sig í uppþvottavélina!»</em>
              </p>
            </div>
            <div class="p-3.5 rounded-xl bg-black/60 border border-slate-700 font-mono text-xs text-right space-y-1 shrink-0">
              <div class="text-slate-400">Граматичний фокус:</div>
              <div class="text-cyan-300 font-bold">Viltu kaffi eða te? (ÞF 🟢)</div>
              <div class="text-amber-300 font-bold">Út í kaffið (út í + ÞF 🟢)</div>
              <div class="text-emerald-300 font-bold">Þakka þér fyrir (ÞGF 🟡)</div>
            </div>
          </div>

          <!-- Workplace Etiquette Rule Card -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3.5 rounded-xl bg-black/50 border border-purple-500/30 space-y-1">
              <div class="text-xs font-mono font-bold text-purple-400 flex items-center gap-1.5">
                <span>☕ 1. ЗАПРОПОНУВАТИ НАПІЙ</span>
              </div>
              <p class="text-xs text-slate-300 font-sans">
                Якщо ви йдете до кавоварки, завжди запитайте колегу поруч: 
                <code class="text-cyan-300 font-mono">«Má bjóða þér kaffi?»</code> або 
                <code class="text-cyan-300 font-mono">«Viltu kaffisopa?»</code>
              </p>
            </div>
            <div class="p-3.5 rounded-xl bg-black/50 border border-emerald-500/30 space-y-1">
              <div class="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🍽️ 2. ПОСУДОМИЙКА (UPPÞVOTTAVÉL)</span>
              </div>
              <p class="text-xs text-slate-300 font-sans">
                Ніколи не залишайте чашку в раковині:
                <code class="text-emerald-300 font-mono">«Ganga frá bolla í uppþvottavél»</code>. 
                Якщо машина чиста, її розвантажує той, хто перший побачив!
              </p>
            </div>
            <div class="p-3.5 rounded-xl bg-black/50 border border-amber-500/30 space-y-1">
              <div class="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <span>🗣️ 3. П'ЯТНИЧНИЙ SMALL TALK</span>
              </div>
              <p class="text-xs text-slate-300 font-sans">
                Питання перед вихідними: 
                <code class="text-amber-300 font-mono">«Hvað eru plönin um helgina?»</code> (Які плани?) ➔ 
                відповідь: <code class="text-slate-200 font-mono">«Bara slaka á / fara í sund»</code>.
              </p>
            </div>
          </div>

          <!-- 3 Interactive Dialogue Scenarios -->
          <div class="p-4 sm:p-5 rounded-2xl bg-cyber-deep/95 border border-cyber-border shadow-xl space-y-4">
            <div class="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <h4 class="text-sm font-bold text-white font-mono flex items-center gap-2">
                <span>💬</span><span>Тренажер діалогів: Оберіть ситуацію з колегою</span>
              </h4>
              <span class="text-xs font-mono text-purple-400">Tölum saman • Hagnýt samtöl</span>
            </div>

            <!-- Dialogue Scenario Tabs -->
            <div class="flex flex-wrap items-center gap-2" id="kaffi-scenario-tabs">
              <button onclick="window.__DROPS_LAB__.switchKaffiScenario('s1')" id="k-tab-s1" class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 transition-all">
                Сценарій 1: «Viltu kaffi eða te?»
              </button>
              <button onclick="window.__DROPS_LAB__.switchKaffiScenario('s2')" id="k-tab-s2" class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-black/50 text-slate-400 border border-slate-800 hover:text-white transition-all">
                Сценарій 2: «Kannan er tóm» (Кавник порожній)
              </button>
              <button onclick="window.__DROPS_LAB__.switchKaffiScenario('s3')" id="k-tab-s3" class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-black/50 text-slate-400 border border-slate-800 hover:text-white transition-all">
                Сценарій 3: «Ganga frá í vélina»
              </button>
            </div>

            <!-- Scenario Content Feed -->
            <div id="kaffi-dialogue-feed" class="space-y-3 pt-2">
              <!-- Dynamically populated by DropsFlexionLab -->
            </div>
          </div>

          <!-- Interactive Workplace Etiquette Quiz -->
          <div class="p-4 sm:p-5 rounded-2xl bg-cyber-card border border-amber-500/30 shadow-xl space-y-3.5">
            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <span class="text-lg">🎯</span>
                <h4 class="text-sm font-bold text-white font-mono">Перевірка знань: Етикет на робочому місці (FA 2022)</h4>
              </div>
              <span class="text-xs font-mono text-amber-400 font-bold">+50 XP за кожну правильну відповідь</span>
            </div>

            <div class="space-y-3" id="kaffi-quiz-container">
              <!-- Populated by JS -->
            </div>
          </div>

        </div>

        <!-- ================= 2. FLYING FLEXIONS TAB ================= -->'''

assert target_end_cafe in text, "target_end_cafe not found"
text = text.replace(target_end_cafe, kaffistofa_view, 1)

# 3. Update switchTab method to color kaffistofa tab correctly
old_switch = '''        isTarget 
          ? (this.activeLabTab === 'cafe' 
              ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-black shadow-md' 
              : this.activeLabTab === 'exam' 
              ? 'bg-amber-400 text-black shadow-md' 
              : 'bg-cyan-500 text-black shadow-md')
          : (b.dataset.labTab === 'exam' ? 'text-amber-300 hover:text-white border border-amber-500/30' : 'text-slate-400 hover:text-white')'''

new_switch = '''        isTarget 
          ? (this.activeLabTab === 'cafe' 
              ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-black shadow-md' 
              : this.activeLabTab === 'kaffistofa'
              ? 'bg-gradient-to-r from-purple-400 to-cyan-400 text-black shadow-md font-extrabold'
              : this.activeLabTab === 'exam' 
              ? 'bg-amber-400 text-black shadow-md' 
              : 'bg-cyan-500 text-black shadow-md')
          : (b.dataset.labTab === 'exam' 
              ? 'text-amber-300 hover:text-white border border-amber-500/30' 
              : b.dataset.labTab === 'kaffistofa'
              ? 'text-purple-300 hover:text-white border border-purple-500/30'
              : 'text-slate-400 hover:text-white')'''

assert old_switch in text, "old_switch not found"
text = text.replace(old_switch, new_switch, 1)

# 4. Add Kaffistofa helper methods before the class closing brace
kaffistofa_methods = '''
  /**
   * Kaffistofan Module Logic (Tölum saman 2022)
   */
  initKaffistofaModule() {
    window.__DROPS_LAB__ = this;
    this.activeKaffiScenario = 's1';
    this.renderKaffiScenario();
    this.renderKaffiQuiz();
  }

  switchKaffiScenario(scenId) {
    this.activeKaffiScenario = scenId;
    ['s1', 's2', 's3'].forEach(id => {
      const btn = this.container.querySelector(`#k-tab-${id}`);
      if (btn) {
        if (id === scenId) {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 transition-all';
        } else {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-black/50 text-slate-400 border border-slate-800 hover:text-white transition-all';
        }
      }
    });
    this.renderKaffiScenario();
  }

  renderKaffiScenario() {
    const feed = this.container.querySelector('#kaffi-dialogue-feed');
    if (!feed) return;

    const scenarios = {
      s1: {
        title: 'Сценарій 1: «Viltu kaffi eða te?» (Пригощання кавою на роботі)',
        lines: [
          { speaker: 'Sveinn (Колега)', role: 'is', text: 'Hæ! Má bjóða þér kaffi eða te?', trans: 'Привіт! Пригостити тебе кавою чи чаєм?' },
          { speaker: 'Þú (Ти)', role: 'ua', text: 'Já, takk, ég ætla að fá kaffi.', trans: 'Так, дякую, я візьму каву. (kaffi - ÞF 🟢)' },
          { speaker: 'Sveinn (Колега)', role: 'is', text: 'Viltu mjólk eða sykur út í kaffið?', trans: 'Бажаєш молоко чи цукор у каву? (út í + ÞF 🟢)' },
          { speaker: 'Þú (Ти)', role: 'ua', text: 'Bara smá mjólk, takk. Ekkert sykur.', trans: 'Лише трохи молока, дякую. Без цукру.' },
          { speaker: 'Sveinn (Колега)', role: 'is', text: 'Gjörðu svo vel!', trans: 'Будь ласка! Пригощайся! [ˈcœrðʏ sɔː vɛːl]' },
          { speaker: 'Þú (Ти)', role: 'ua', text: 'Þakka þér kærlega fyrir!', trans: 'Щиро тобі дякую! (Þakka + ÞGF 🟡)' }
        ]
      },
      s2: {
        title: 'Сценарій 2: «Kannan er tóm» (Кавник порожній: хто варить нову каву)',
        lines: [
          { speaker: 'Þú (Ти)', role: 'ua', text: 'Afsakið, er til meira kaffi eða á ég að laga nýtt?', trans: 'Перепрошую, чи є ще кава, чи мені зварити нову?' },
          { speaker: 'Guðrún (Колега)', role: 'is', text: 'Kannan er tóm, það væri frábært ef þú gætir hellt upp á!', trans: 'Кавник порожній, було б чудово, якби ти зварив нову!' },
          { speaker: 'Þú (Ти)', role: 'ua', text: 'Ekkert mál, ég laga nýja könnu strax.', trans: 'Без проблем, я зараз зварю новий кавник.' },
          { speaker: 'Guðrún (Колега)', role: 'is', text: 'Takk kærlega, þú ert bjargvættur dagsins!', trans: 'Щиро дякую, ти рятівник дня!' }
        ]
      },
      s3: {
        title: 'Сценарій 3: «Ganga frá í vélina» (Правило чистоти посуду)',
        lines: [
          { speaker: 'Guðrún (Колега)', role: 'is', text: 'Jæja, ertu að fara aftur að vinna?', trans: 'Ну що, повертаєшся до роботи?' },
          { speaker: 'Þú (Ти)', role: 'ua', text: 'Já, ég er tilbúinn. En fyrst geng ég frá bollanum.', trans: 'Так, готовий. Але спочатку приберу свою чашку.' },
          { speaker: 'Guðrún (Колега)', role: 'is', text: 'Frábært! Vélina má tæma líka ef hún er hrein.', trans: 'Чудово! Машину також можна розвантажити, якщо вона чиста.' },
          { speaker: 'Þú (Ти)', role: 'ua', text: 'Ég setti bollann í uppþvottavélina. Sjáumst seinna!', trans: 'Я поставив чашку в посудомийку. До зустрічі пізніше!' }
        ]
      }
    };

    const sc = scenarios[this.activeKaffiScenario] || scenarios.s1;

    feed.innerHTML = `
      <div class="text-xs font-mono text-slate-400 font-bold mb-2">${sc.title}</div>
      <div class="space-y-2">
        ${sc.lines.map(l => {
          const isIs = l.role === 'is';
          const cleanText = l.text.replace(/'/g, "\\\\'");
          return `
            <div class="p-3 rounded-xl border ${isIs ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-cyan-500/30 bg-cyan-950/20'} flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="space-y-0.5">
                <div class="flex items-center gap-2 text-xs font-mono">
                  <span class="${isIs ? 'text-emerald-400' : 'text-cyan-400'} font-bold">${l.speaker}:</span>
                  <span class="text-white font-mono font-bold">«${l.text}»</span>
                </div>
                <div class="text-[11px] text-slate-300 font-sans italic">${l.trans}</div>
              </div>
              <button onclick="window.__DROPS_LAB__.speakWorkplaceText('${cleanText}')" class="px-2.5 py-1 rounded-lg bg-black/70 hover:bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700 flex items-center gap-1 self-start sm:self-center transition-all shrink-0">
                <span>🔊</span><span>Вимова</span>
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  speakWorkplaceText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'is-IS';
    utt.rate = 0.9;
    window.speechSynthesis.speak(utt);
  }

  renderKaffiQuiz() {
    const quizEl = this.container.querySelector('#kaffi-quiz-container');
    if (!quizEl) return;

    const questions = [
      {
        q: '1. Ви заходите на кухню і хочете запропонувати каву колезі. Яка фраза граматично правильна?',
        options: [
          'Má bjóða þér kaffi? (ÞGF 🟡 þér + ÞF 🟢 kaffi)',
          'Má bjóða þig kaffi? (ÞF + ÞF)',
          'Viltu kaffið með mig? (неправильний прийменник)'
        ],
        correct: 0,
        tip: 'Дієслово «bjóða» вимагає адресата в давальному відмінку (þér 🟡), а запропонований напій — у знахідному (kaffi 🟢)!'
      },
      {
        q: '2. Ви допили каву в кімнаті відпочинку. Що є головним правилом корпоративної культури в Ісландії?',
        options: [
          'Залишити чашку в раковині (vaskur), щоб прибиральник помив її',
          'Поставити чашку безпосередньо в посудомийну машину (setja bollann í uppþvottavélina)',
          'Забрати брудну чашку на робочий стіл'
        ],
        correct: 1,
        tip: 'За посібником «Tölum saman 2022» та етикетом усіх ісландських фірм, кожен співробітник зобовʼязаний особисто прибрати за собою чашку в uppþvottavél.'
      },
      {
        q: '3. Колега каже вам: «Kannan er tóm!» (Кавник порожній). Що ви можете відповісти, запропонувавши допомогу?',
        options: [
          '«Það er allt í lagi, ég drekk ekki kaffi.»',
          '«Á ég að hella upp á nýja könnu?» (Чи мені зварити новий кавник?)',
          '«Hvar er kaffihúsið?»'
        ],
        correct: 1,
        tip: 'Фразеологізм «að hella upp á (kaffi)» означає «зварити / зафільтрувати нову каву».'
      }
    ];

    quizEl.innerHTML = questions.map((item, idx) => `
      <div class="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-2" id="k-quiz-card-${idx}">
        <div class="text-xs font-bold text-white font-mono">${item.q}</div>
        <div class="space-y-1.5">
          ${item.options.map((opt, oIdx) => `
            <button onclick="window.__DROPS_LAB__.checkKaffiAnswer(${idx}, ${oIdx}, ${item.correct}, '${item.tip.replace(/'/g, "\\\\'")}')" class="k-quiz-opt-${idx} w-full text-left p-2.5 rounded-lg bg-cyber-card hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 font-sans transition-all flex items-center justify-between">
              <span>${opt}</span>
              <span class="text-slate-500 text-[10px] font-mono">ОБРАТИ</span>
            </button>
          `).join('')}
        </div>
        <div id="k-quiz-feed-${idx}" class="hidden p-2.5 rounded-lg text-xs font-mono"></div>
      </div>
    `).join('');
  }

  checkKaffiAnswer(qIdx, selected, correct, tip) {
    const feed = this.container.querySelector(`#k-quiz-feed-${qIdx}`);
    const btns = this.container.querySelectorAll(`.k-quiz-opt-${qIdx}`);
    btns.forEach((b, i) => {
      b.disabled = true;
      if (i === correct) {
        b.className = 'w-full text-left p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500 text-xs text-emerald-200 font-bold';
      } else if (i === selected && selected !== correct) {
        b.className = 'w-full text-left p-2.5 rounded-lg bg-rose-500/20 border border-rose-500 text-xs text-rose-300 font-bold';
      } else {
        b.className = 'w-full text-left p-2.5 rounded-lg bg-black/40 border border-slate-900 text-xs text-slate-600';
      }
    });

    if (feed) {
      feed.classList.remove('hidden');
      if (selected === correct) {
        feed.className = 'p-2.5 rounded-lg text-xs font-mono bg-emerald-950/40 border border-emerald-500/40 text-emerald-300';
        feed.innerHTML = `✅ <strong>Rétt! (Вірно!)</strong> +50 XP. ${tip}`;
        gameState.addXP(50);
      } else {
        feed.className = 'p-2.5 rounded-lg text-xs font-mono bg-rose-950/40 border border-rose-500/40 text-rose-300';
        feed.innerHTML = `❌ <strong>Rangt! (Помилка)</strong> ${tip}`;
      }
    }
  }
'''

idx_last_brace = text.rfind('}')
assert idx_last_brace != -1
text = text[:idx_last_brace] + kaffistofa_methods + '\n}\n'

# 5. Call initKaffistofaModule in bindEvents
old_bind = '  bindEvents() {\n    // 1. Master Tab Switcher'
new_bind = '  bindEvents() {\n    this.initKaffistofaModule();\n\n    // 1. Master Tab Switcher'
assert old_bind in text
text = text.replace(old_bind, new_bind, 1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Successfully patched DropsFlexionLab.js with Kaffistofan workplace module!')
