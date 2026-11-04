#!/usr/bin/env python3
"""
enrich_kafli3.py - Synchronize Kafli3RoutineApp.js with Íslenska fyrir alla 1, Kafli 4
Adds:
1. Sub-tab: ⏰ Годинник (Klukkan) & Робочі зміни (Vaktir) with half-hour paradox
2. Sub-tab: ⚡ Дієслова 3-ї та 4-ї груп (I-hljóðvarp & óreglulegar sagnir)
"""

path = '/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/components/Kafli3RoutineApp.js'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update sub-tabs in header
old_tabs = '''          <div class="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-slate-800 text-xs font-mono self-start md:self-auto">
            <button data-k3-tab="v2lab" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'v2lab' ? 'bg-purple-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              ⚡ Тренажер Закону V2
            </button>
            <button data-k3-tab="vocab" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'vocab' ? 'bg-cyan-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              📚 15 Слів Рутини (🔊)
            </button>
            <button data-k3-tab="dialogue" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'dialogue' ? 'bg-emerald-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              💬 Діалог у Рейк'явіку
            </button>
          </div>'''

new_tabs = '''          <div class="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-slate-800 text-xs font-mono self-start md:self-auto flex-wrap">
            <button data-k3-tab="v2lab" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'v2lab' ? 'bg-purple-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              ⚡ Тренажер V2
            </button>
            <button data-k3-tab="klukkan" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'klukkan' ? 'bg-amber-400 text-black shadow-md font-extrabold' : 'text-amber-300 hover:text-white border border-amber-500/30'}">
              ⏰ Годинник & Зміни (ÍFA 1.4)
            </button>
            <button data-k3-tab="verbs" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'verbs' ? 'bg-cyan-400 text-black shadow-md font-extrabold' : 'text-cyan-300 hover:text-white border border-cyan-500/30'}">
              📐 Дієслова 3-4 груп
            </button>
            <button data-k3-tab="vocab" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'vocab' ? 'bg-cyan-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              📚 Словник (🔊)
            </button>
            <button data-k3-tab="dialogue" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'dialogue' ? 'bg-emerald-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              💬 Діалог
            </button>
          </div>'''

assert old_tabs in text, "old_tabs not found"
text = text.replace(old_tabs, new_tabs, 1)

# 2. Add TAB KLUKKAN & TAB VERBS before closing tab container
tab_klukkan_html = '''
        <!-- TAB KLUKKAN: CLOCK & WORK SHIFTS (ÍFA 1 KAFLI 4) -->
        <div class="${this.activeTab === 'klukkan' ? '' : 'hidden'} space-y-4">
          
          <div class="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-cyber-card to-cyber-deep border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="space-y-1.5 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                <span>⏰ СТАНДАРТ ÍFA 1 KAFLI 4</span>
                <span>HVAÐ ER KLUKKAN?</span>
              </div>
              <h3 class="text-xl font-black text-white font-mono">Парадокс ісландського часу та робочий розклад</h3>
              <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
                В ісландській мові числівники для часу завжди стоять у <strong>середньому роді</strong>: 
                <em>eitt (1), tvö (2), þrjú (3), fjögur (4)</em>. 
                Головна пастка: <strong>«Hálf fimm» — це 04:30</strong> (половина до п'яти), а не 05:30!
              </p>
            </div>
            <div class="p-3.5 rounded-xl bg-black/60 border border-slate-700 font-mono text-xs text-right space-y-1 shrink-0">
              <div class="text-amber-300 font-bold">Hálf fimm = 04:30 ⚠️</div>
              <div class="text-cyan-300 font-bold">Korter yfir... (чверть по)</div>
              <div class="text-purple-300 font-bold">Korter í... (без чверті)</div>
            </div>
          </div>

          <!-- Interactive Time Calculator Simulator -->
          <div class="p-5 rounded-2xl bg-cyber-deep/95 border border-cyber-border shadow-xl space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h4 class="text-sm font-bold text-white font-mono flex items-center gap-2">
                <span>🕰️</span><span>Інтерактивний тренажер: Назвіть точний час</span>
              </h4>
              <span class="text-xs font-mono text-amber-400">Натисніть час для озвучування</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5" id="k3-clock-grid">
              ${[
                { t: '07:00', is: 'Klukkan er sjö', uk: 'Сьома година' },
                { t: '07:15', is: 'Korter yfir sjö', uk: 'Чверть по сьомій' },
                { t: '07:30', is: 'Hálf átta', uk: 'Пів на восьму (07:30!)' },
                { t: '07:45', is: 'Korter í átta', uk: 'За чверть восьма' },
                { t: '08:00', is: 'Klukkan er átta', uk: 'Восьма година' },
                { t: '08:10', is: 'Tíu mínútur yfir átta', uk: 'Десять хвилин по восьмій' },
                { t: '08:20', is: 'Tuttugu mínútur yfir átta', uk: 'Двадцять по восьмій' },
                { t: '08:50', is: 'Tíu mínútur í níu', uk: 'За десять дев\'ята' },
                { t: '12:00', is: 'Hádegi (klukkan tólf)', uk: 'Полудень (12:00)' },
                { t: '16:30', is: 'Hálf fimm', uk: 'Пів на п\'яту (16:30!)' },
                { t: '20:15', is: 'Korter yfir átta', uk: 'Чверть по восьмій вечора' },
                { t: '00:00', is: 'Miðnætti', uk: 'Опівніч' }
              ].map(item => `
                <div onclick="window.__K3_APP__.speakText('${item.is}')" class="p-3 rounded-xl bg-black/60 border border-slate-800 hover:border-amber-400 cursor-pointer transition-all space-y-1 group">
                  <div class="flex items-center justify-between text-xs font-mono">
                    <span class="text-amber-400 font-bold">${item.t}</span>
                    <span class="text-slate-600 group-hover:text-amber-300">🔊</span>
                  </div>
                  <div class="text-xs font-bold text-white font-mono">${item.is}</div>
                  <div class="text-[11px] text-slate-400 font-sans">${item.uk}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Work Shifts Card (Vaktir á vinnustöðum) -->
          <div class="p-4 sm:p-5 rounded-2xl bg-cyber-card border border-purple-500/30 shadow-xl space-y-3">
            <h4 class="text-sm font-bold text-white font-mono flex items-center gap-2">
              <span>💼</span><span>Графіки та робочі зміни в Ісландії (Vinnuvaktir)</span>
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="p-3.5 rounded-xl bg-black/50 border border-cyan-500/30 space-y-1">
                <span class="text-xs font-mono text-cyan-400 font-bold">🌅 Morgunvakt (07:00 – 15:00)</span>
                <p class="text-xs text-slate-300 font-sans">«Ég er á morgunvakt í dag. Ég vakna klukkan sex.» (Ранкова зміна)</p>
              </div>
              <div class="p-3.5 rounded-xl bg-black/50 border border-amber-500/30 space-y-1">
                <span class="text-xs font-mono text-amber-400 font-bold">🌇 Kvöldvakt (15:00 – 23:00)</span>
                <p class="text-xs text-slate-300 font-sans">«Á morgun er ég á kvöldvakt frá þrjú til ellefu.» (Вечірня зміна + ахтаналог)</p>
              </div>
              <div class="p-3.5 rounded-xl bg-black/50 border border-purple-500/30 space-y-1">
                <span class="text-xs font-mono text-purple-400 font-bold">🌙 Næturvakt (23:00 – 07:00)</span>
                <p class="text-xs text-slate-300 font-sans">«Næturvakt gefur 33% eða 45% álag samkvæmt kjarasamningi.» (Нічна зміна)</p>
              </div>
            </div>
          </div>

        </div>

        <!-- TAB VERBS: 3RD & 4TH CONJUGATION GROUPS (SAGNIR ÍFA 1.4) -->
        <div class="${this.activeTab === 'verbs' ? '' : 'hidden'} space-y-4">
          
          <div class="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-cyber-card to-cyber-deep border border-cyan-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="space-y-1.5 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                <span>⚡ ДІЄСЛОВА 3-Ї ТА 4-Ї ГРУП</span>
                <span>LITLI MÁLFRÆÐINGURINN & ÍFA 1.4</span>
              </div>
              <h3 class="text-xl font-black text-white font-mono">Дієслова на -ur (Група 3) та Сильні дієслова (Група 4)</h3>
              <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
                На відміну від 1-ї групи (<em>tala ➔ talar</em>), у 3-й групі в однині відбувається 
                <strong>I-hljóðvarp (I-умлаут)</strong>: голосна кореня змінюється: 
                <em>a ➔ e (fara ➔ ég fer)</em>, <em>o ➔ e (koma ➔ ég kem, sofa ➔ ég sef)</em>!
              </p>
            </div>
            <div class="p-3.5 rounded-xl bg-black/60 border border-slate-700 font-mono text-xs text-right space-y-1 shrink-0">
              <div class="text-cyan-300 font-bold">fara ➔ ég fer, við förum</div>
              <div class="text-emerald-300 font-bold">koma ➔ ég kem, við komum</div>
              <div class="text-amber-300 font-bold">sofa ➔ ég sef, við sofum</div>
            </div>
          </div>

          <!-- Conjugation Matrix Tables -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Table 1: Fara (3. flokkur) -->
            <div class="p-4 rounded-xl bg-black/60 border border-cyan-500/40 space-y-2.5">
              <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span class="text-xs font-mono font-bold text-cyan-300">fara (йти, їхати) • 3. flokkur</span>
                <span class="text-[11px] font-mono text-slate-400">a ➔ e (odnyna), a ➔ ö (við)</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">ég</span><strong class="text-cyan-300">fer</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">við</span><strong class="text-cyan-300">förum</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þú</span><strong class="text-cyan-300">ferð</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þið</span><strong class="text-cyan-300">farið</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">hann/hún</span><strong class="text-cyan-300">fer</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þeir/þær</span><strong class="text-cyan-300">fara</strong>
                </div>
              </div>
              <div class="text-[11px] text-slate-400 font-sans italic pt-1 border-t border-slate-800/60">
                Приклад V2: «Á hverjum degi <strong>fer ég</strong> í sund.»
              </div>
            </div>

            <!-- Table 2: Koma (3. flokkur) -->
            <div class="p-4 rounded-xl bg-black/60 border border-emerald-500/40 space-y-2.5">
              <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span class="text-xs font-mono font-bold text-emerald-300">koma (приходити, прибувати) • 3. flokkur</span>
                <span class="text-[11px] font-mono text-slate-400">o ➔ e (odnyna)</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">ég</span><strong class="text-emerald-300">kem</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">við</span><strong class="text-emerald-300">komum</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þú</span><strong class="text-emerald-300">kemur</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þið</span><strong class="text-emerald-300">komið</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">hann/hún</span><strong class="text-emerald-300">kemur</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þeir/þær</span><strong class="text-emerald-300">koma</strong>
                </div>
              </div>
              <div class="text-[11px] text-slate-400 font-sans italic pt-1 border-t border-slate-800/60">
                Приклад V2: «Klukkan fimm <strong>kemur hann</strong> heim.»
              </div>
            </div>

            <!-- Table 3: Sofa (4. flokkur / Sterk) -->
            <div class="p-4 rounded-xl bg-black/60 border border-purple-500/40 space-y-2.5">
              <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span class="text-xs font-mono font-bold text-purple-300">sofa (спати) • 4. flokkur (сильне)</span>
                <span class="text-[11px] font-mono text-slate-400">o ➔ e (odnyna)</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">ég</span><strong class="text-purple-300">sef</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">við</span><strong class="text-purple-300">sofum</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þú</span><strong class="text-purple-300">sefur</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þið</span><strong class="text-purple-300">sofið</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">hann/hún</span><strong class="text-purple-300">sefur</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þeir/þær</span><strong class="text-purple-300">sofa</strong>
                </div>
              </div>
              <div class="text-[11px] text-slate-400 font-sans italic pt-1 border-t border-slate-800/60">
                Приклад V2: «Á nóttunni <strong>sef ég</strong> í átta tíma.»
              </div>
            </div>

            <!-- Table 4: Vinna (4. flokkur / Sterk) -->
            <div class="p-4 rounded-xl bg-black/60 border border-amber-500/40 space-y-2.5">
              <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span class="text-xs font-mono font-bold text-amber-300">vinna (працювати) • 4. flokkur</span>
                <span class="text-[11px] font-mono text-slate-400">nn зберігається, -ur у 2-3 особі</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">ég</span><strong class="text-amber-300">vinn</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">við</span><strong class="text-amber-300">vinnum</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þú</span><strong class="text-amber-300">vinnur</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þið</span><strong class="text-amber-300">vinnið</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">hann/hún</span><strong class="text-amber-300">vinnur</strong>
                </div>
                <div class="p-2 rounded bg-cyber-card border border-slate-800 flex justify-between items-center">
                  <span class="text-slate-400">þeir/þær</span><strong class="text-amber-300">vinna</strong>
                </div>
              </div>
              <div class="text-[11px] text-slate-400 font-sans italic pt-1 border-t border-slate-800/60">
                Приклад V2: «Hvar <strong>vinnur þú</strong> í dag?»
              </div>
            </div>

          </div>

        </div>
'''

target_div_vocab = '        <!-- TAB 2: 15 ANCHOR WORDS OF MODULE 3 -->'
assert target_div_vocab in text, "target_div_vocab not found"
text = text.replace(target_div_vocab, tab_klukkan_html + '\n        <!-- TAB 2: 15 ANCHOR WORDS OF MODULE 3 -->', 1)

# 3. Add speakText helper to Kafli3RoutineApp
speak_helper = '''
  speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'is-IS';
    utt.rate = 0.9;
    window.speechSynthesis.speak(utt);
  }
'''

idx_last = text.rfind('}')
assert idx_last != -1
text = text[:idx_last] + speak_helper + '\n}\n'

# 4. Attach window.__K3_APP__ in render()
old_render_start = '  render() {\n    if (!this.container) return;'
new_render_start = '  render() {\n    if (!this.container) return;\n    window.__K3_APP__ = this;'
assert old_render_start in text
text = text.replace(old_render_start, new_render_start, 1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Successfully enriched Kafli3RoutineApp.js with Clock (ÍFA 1.4) and Verbs 3-4 groups!')
