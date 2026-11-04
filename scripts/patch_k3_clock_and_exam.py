#!/usr/bin/env python3
"""
patch_k3_clock_and_exam.py - Add Interactive SVG Clock and Kafli3Exam to Kafli3RoutineApp.js
"""

path = '/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/components/Kafli3RoutineApp.js'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Import Kafli3Exam at top
import_exam = "import { Kafli3Exam } from './Kafli3Exam.js?v=7.9';"
if import_exam not in text:
    text = text.replace("import { gameState } from './GameState.js';", "import { gameState } from './GameState.js';\n" + import_exam, 1)

# 2. Add state for interactive clock in constructor
clock_init = """    this.clockHour = 4;
    this.clockMinute = 30;"""
if "this.clockHour =" not in text:
    text = text.replace("this.feedback = null;", "this.feedback = null;\n" + clock_init, 1)

# 3. Add exam tab button to header
old_tabs_bar = """            <button data-k3-tab="dialogue" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'dialogue' ? 'bg-emerald-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              💬 Діалог
            </button>"""

new_tabs_bar = """            <button data-k3-tab="dialogue" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'dialogue' ? 'bg-emerald-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}">
              💬 Діалог
            </button>
            <button data-k3-tab="exam" class="k3-tab-btn px-3 py-1.5 rounded-lg font-bold transition-all ${this.activeTab === 'exam' ? 'bg-amber-400 text-black shadow-md font-extrabold' : 'text-amber-300 hover:text-white border border-amber-500/30'}">
              📝 Іспит Уроку 3 (15)
            </button>"""

assert old_tabs_bar in text, "old_tabs_bar not found"
text = text.replace(old_tabs_bar, new_tabs_bar, 1)

# 4. Insert Interactive SVG Clock into TAB KLUKKAN
old_clock_section = '          <!-- Interactive Time Calculator Simulator -->'

svg_clock_component = '''          <!-- Interactive SVG Analog Clock & Time Picker -->
          <div class="p-5 rounded-2xl bg-cyber-deep/95 border-2 border-amber-500/40 shadow-2xl space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  🕰️ Інтерактивний Аналоговий SVG-Годинник
                </span>
                <h4 class="text-sm sm:text-base font-bold text-white font-mono mt-0.5">
                  Рухайте повзунки або оберіть пресет, щоб почути правильну ісландську вимову
                </h4>
              </div>
              <button onclick="window.__K3_APP__.speakCurrentClockTime()" class="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto">
                <span>🔊</span><span>Озвучити час</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <!-- SVG Analog Clock Dial (5 cols) -->
              <div class="md:col-span-5 flex flex-col items-center justify-center p-3 rounded-2xl bg-black/60 border border-slate-800">
                <svg viewBox="0 0 200 200" class="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-[0_0_15px_rgba(255,184,0,0.25)]">
                  <!-- Dial Background -->
                  <circle cx="100" cy="100" r="92" fill="#0A0612" stroke="#FFB800" stroke-width="3" />
                  <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
                  
                  <!-- Major 12 hour tick marks -->
                  ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => {
                    const rad = (deg - 90) * Math.PI / 180;
                    const x1 = 100 + 78 * Math.cos(rad);
                    const y1 = 100 + 78 * Math.sin(rad);
                    const x2 = 100 + 86 * Math.cos(rad);
                    const y2 = 100 + 86 * Math.sin(rad);
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFB800" stroke-width="${deg % 90 === 0 ? '3' : '1.5'}" />`;
                  }).join('')}

                  <!-- Cardinal numerals -->
                  <text x="100" y="28" fill="#FFD600" font-size="14" font-family="monospace" font-weight="bold" text-anchor="middle">12</text>
                  <text x="176" y="105" fill="#FFD600" font-size="14" font-family="monospace" font-weight="bold" text-anchor="middle">3</text>
                  <text x="100" y="180" fill="#FFD600" font-size="14" font-family="monospace" font-weight="bold" text-anchor="middle">6</text>
                  <text x="24" y="105" fill="#FFD600" font-size="14" font-family="monospace" font-weight="bold" text-anchor="middle">9</text>

                  <!-- Dynamic Hands -->
                  <!-- Hour Hand (Amber) -->
                  <line 
                    id="svg-clock-hour" 
                    x1="100" y1="100" 
                    x2="${100 + 48 * Math.cos(((this.clockHour % 12) * 30 + this.clockMinute * 0.5 - 90) * Math.PI / 180)}" 
                    y2="${100 + 48 * Math.sin(((this.clockHour % 12) * 30 + this.clockMinute * 0.5 - 90) * Math.PI / 180)}" 
                    stroke="#FFB800" stroke-width="4.5" stroke-linecap="round" 
                  />

                  <!-- Minute Hand (Cyan) -->
                  <line 
                    id="svg-clock-min" 
                    x1="100" y1="100" 
                    x2="${100 + 68 * Math.cos((this.clockMinute * 6 - 90) * Math.PI / 180)}" 
                    y2="${100 + 68 * Math.sin((this.clockMinute * 6 - 90) * Math.PI / 180)}" 
                    stroke="#00E5FF" stroke-width="2.5" stroke-linecap="round" 
                  />

                  <!-- Center Pin -->
                  <circle cx="100" cy="100" r="5" fill="#00E5FF" stroke="#FFFFFF" stroke-width="1.5" />
                </svg>

                <div class="mt-2 text-xs font-mono text-slate-400 flex items-center gap-3">
                  <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>Годинна стрілка</span>
                  <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>Хвилинна стрілка</span>
                </div>
              </div>

              <!-- Live Formula & Controls (7 cols) -->
              <div class="md:col-span-7 space-y-3.5">
                
                <!-- Live Display Box -->
                <div class="p-4 rounded-xl bg-black/70 border border-amber-500/40 space-y-1.5 shadow-lg">
                  <div class="flex items-center justify-between text-xs font-mono">
                    <span class="text-slate-400">Електронний час:</span>
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-bold" id="k3-time-digital">
                      ${String(this.clockHour).padStart(2, '0')}:${String(this.clockMinute).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div class="text-lg sm:text-2xl font-black text-white font-mono" id="k3-time-isl">
                    ${this.getIcelandicTimeString(this.clockHour, this.clockMinute).is}
                  </div>
                  <div class="text-xs sm:text-sm text-cyan-300 font-sans" id="k3-time-uk">
                    ${this.getIcelandicTimeString(this.clockHour, this.clockMinute).uk}
                  </div>
                  <div class="text-xs font-mono text-purple-300 italic pt-1 border-t border-slate-800" id="k3-time-ipa">
                    ${this.getIcelandicTimeString(this.clockHour, this.clockMinute).ipa}
                  </div>
                </div>

                <!-- Sliders -->
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span>Година (1–12): <strong class="text-amber-300" id="k3-val-hour">${this.clockHour}</strong></span>
                    <input 
                      type="range" min="1" max="12" step="1" value="${this.clockHour}" 
                      id="k3-slider-hour" 
                      class="w-48 accent-amber-400 cursor-pointer"
                    >
                  </div>
                  <div class="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span>Хвилини (0–55): <strong class="text-cyan-300" id="k3-val-min">${this.clockMinute}</strong></span>
                    <input 
                      type="range" min="0" max="55" step="5" value="${this.clockMinute}" 
                      id="k3-slider-min" 
                      class="w-48 accent-cyan-400 cursor-pointer"
                    >
                  </div>
                </div>

                <!-- Quick Presets -->
                <div class="space-y-1">
                  <span class="text-[11px] font-mono text-slate-400 uppercase">Швидкі тести на часові пастки:</span>
                  <div class="flex flex-wrap gap-1.5 text-xs font-mono">
                    <button onclick="window.__K3_APP__.setClockPreset(4, 30)" class="px-2.5 py-1 rounded bg-black/60 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-amber-300 transition-all">
                      ⚠️ 04:30 (Hálf fimm)
                    </button>
                    <button onclick="window.__K3_APP__.setClockPreset(7, 30)" class="px-2.5 py-1 rounded bg-black/60 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-amber-300 transition-all">
                      ⚠️ 07:30 (Hálf átta)
                    </button>
                    <button onclick="window.__K3_APP__.setClockPreset(7, 15)" class="px-2.5 py-1 rounded bg-black/60 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-cyan-300 transition-all">
                      07:15 (Korter yfir)
                    </button>
                    <button onclick="window.__K3_APP__.setClockPreset(7, 45)" class="px-2.5 py-1 rounded bg-black/60 hover:bg-slate-800 border border-slate-700 hover:border-purple-400 text-purple-300 transition-all">
                      07:45 (Korter í)
                    </button>
                    <button onclick="window.__K3_APP__.setClockPreset(12, 0)" class="px-2.5 py-1 rounded bg-black/60 hover:bg-slate-800 border border-slate-700 hover:border-emerald-400 text-emerald-300 transition-all">
                      12:00 (Hádegi)
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Interactive Time Calculator Simulator -->'''

assert old_clock_section in text, "old_clock_section not found"
text = text.replace(old_clock_section, svg_clock_component, 1)

# 5. Add TAB EXAM view before the end of the container div
old_dialogue_end = '        <!-- TAB 3: INTERACTIVE ROUTINE DIALOGUE -->'
assert old_dialogue_end in text, "old_dialogue_end not found"

# Find end of TAB 3
idx_tab3 = text.find(old_dialogue_end)
idx_tab3_div_end = text.find('</div>\n      </div>\n    `;', idx_tab3)
assert idx_tab3_div_end != -1, "idx_tab3_div_end not found"

exam_tab_html = '''</div>

        <!-- TAB EXAM: CERTIFICATION EXAM (15 QUESTIONS) -->
        <div class="${this.activeTab === 'exam' ? '' : 'hidden'} space-y-4" id="k3-exam-container">
          <!-- Populated by Kafli3Exam -->
        </div>'''

text = text[:idx_tab3_div_end] + exam_tab_html + text[idx_tab3_div_end + 6:]

# 6. Add helper methods for Clock & Time calculation & Exam mounting
clock_helpers = '''
  getIcelandicTimeString(h, m) {
    const neuterHours = {
      1: 'eitt', 2: 'tvö', 3: 'þrjú', 4: 'fjögur', 5: 'fimm', 6: 'sex',
      7: 'sjö', 8: 'átta', 9: 'níu', 10: 'tíu', 11: 'ellefu', 12: 'tólf'
    };
    const nextH = h === 12 ? 1 : h + 1;

    if (m === 0) {
      if (h === 12) {
        return { is: 'Klukkan er tólf (Hádegi)', uk: 'Полудень / дванадцята година', ipa: '[ˈkʰlʏhkan ɛr toulv / ˈhauːˌtɛːjɪ]' };
      }
      return { 
        is: `Klukkan er ${neuterHours[h]}`, 
        uk: `${h}-та година рівно`, 
        ipa: `[ˈkʰlʏhkan ɛr ${neuterHours[h]}]` 
      };
    }
    if (m === 15) {
      return { 
        is: `Korter yfir ${neuterHours[h]}`, 
        uk: `Чверть по ${h}-й годині (${h}:15)`, 
        ipa: `[ˈkʰɔr̥tɛr ˈɪːvɪr ${neuterHours[h]}]` 
      };
    }
    if (m === 30) {
      return { 
        is: `Klukkan er hálf ${neuterHours[nextH]} ⚠️`, 
        uk: `Пів на ${nextH}-у годину (${h}:30! Половина до ${nextH}-ї)`, 
        ipa: `[ˈkʰlʏhkan ɛr haulv ${neuterHours[nextH]}]` 
      };
    }
    if (m === 45) {
      return { 
        is: `Korter í ${neuterHours[nextH]}`, 
        uk: `За чверть ${nextH}-та (${h}:45)`, 
        ipa: `[ˈkʰɔr̥tɛr iː ${neuterHours[nextH]}]` 
      };
    }
    if (m < 30) {
      return { 
        is: `${m} mínútur yfir ${neuterHours[h]}`, 
        uk: `${m} хвилин по ${h}-й годині`, 
        ipa: `[ˈmiːnuːtʏr ˈɪːvɪr ${neuterHours[h]}]` 
      };
    }
    const rem = 60 - m;
    return { 
      is: `${rem} mínútur í ${neuterHours[nextH]}`, 
      uk: `За ${rem} хвилин ${nextH}-та година`, 
      ipa: `[ˈmiːnuːtʏr iː ${neuterHours[nextH]}]` 
    };
  }

  setClockPreset(h, m) {
    this.clockHour = h;
    this.clockMinute = m;
    this.updateClockUI();
  }

  updateClockUI() {
    const digital = this.container.querySelector('#k3-time-digital');
    const isEl = this.container.querySelector('#k3-time-isl');
    const ukEl = this.container.querySelector('#k3-time-uk');
    const ipaEl = this.container.querySelector('#k3-time-ipa');
    const hourVal = this.container.querySelector('#k3-val-hour');
    const minVal = this.container.querySelector('#k3-val-min');
    const hourSlider = this.container.querySelector('#k3-slider-hour');
    const minSlider = this.container.querySelector('#k3-slider-min');

    if (digital) digital.textContent = `${String(this.clockHour).padStart(2, '0')}:${String(this.clockMinute).padStart(2, '0')}`;
    if (hourVal) hourVal.textContent = this.clockHour;
    if (minVal) minVal.textContent = this.clockMinute;
    if (hourSlider) hourSlider.value = this.clockHour;
    if (minSlider) minSlider.value = this.clockMinute;

    const data = this.getIcelandicTimeString(this.clockHour, this.clockMinute);
    if (isEl) isEl.textContent = data.is;
    if (ukEl) ukEl.textContent = '🇺🇦 ' + data.uk;
    if (ipaEl) ipaEl.textContent = data.ipa;

    // Update SVG Hands
    const hourLine = this.container.querySelector('#svg-clock-hour');
    const minLine = this.container.querySelector('#svg-clock-min');
    if (hourLine) {
      const hDeg = ((this.clockHour % 12) * 30 + this.clockMinute * 0.5 - 90) * Math.PI / 180;
      hourLine.setAttribute('x2', String(100 + 48 * Math.cos(hDeg)));
      hourLine.setAttribute('y2', String(100 + 48 * Math.sin(hDeg)));
    }
    if (minLine) {
      const mDeg = (this.clockMinute * 6 - 90) * Math.PI / 180;
      minLine.setAttribute('x2', String(100 + 68 * Math.cos(mDeg)));
      minLine.setAttribute('y2', String(100 + 68 * Math.sin(mDeg)));
    }
  }

  speakCurrentClockTime() {
    const data = this.getIcelandicTimeString(this.clockHour, this.clockMinute);
    const cleanIs = data.is.replace(/⚠️/g, '').replace(/\\(Hádegi\\)/g, 'Hádegi').trim();
    this.speakText(cleanIs);
  }

  mountExamIfActive() {
    if (this.activeTab === 'exam') {
      const examContainer = this.container.querySelector('#k3-exam-container');
      if (examContainer) {
        this.examComponent = new Kafli3Exam(
          examContainer,
          () => {
            this.activeTab = 'v2lab';
            this.render();
          },
          () => {
            this.activeTab = 'v2lab';
            this.render();
          }
        );
        this.examComponent.render();
      }
    }
  }
'''

idx_last_brace = text.rfind('}')
assert idx_last_brace != -1
text = text[:idx_last_brace] + clock_helpers + '\n}\n'

# 7. Wire slider listeners and mountExam in bindEvents()
clock_slider_binds = '''
    const hSlider = this.container.querySelector('#k3-slider-hour');
    if (hSlider) {
      hSlider.addEventListener('input', (e) => {
        this.clockHour = parseInt(e.target.value, 10);
        this.updateClockUI();
      });
    }

    const mSlider = this.container.querySelector('#k3-slider-min');
    if (mSlider) {
      mSlider.addEventListener('input', (e) => {
        this.clockMinute = parseInt(e.target.value, 10);
        this.updateClockUI();
      });
    }

    this.mountExamIfActive();
'''

target_bind_end = '    const nextBtn = this.container.querySelector(\'#k3-next-ex-btn\');'
assert target_bind_end in text, "target_bind_end not found"
text = text.replace(target_bind_end, clock_slider_binds + '\n    ' + target_bind_end, 1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Successfully patched Kafli3RoutineApp.js with SVG Clock and Kafli3Exam!')
