#!/usr/bin/env python3
"""
patch_k3_clock_ampm.py - Add AM/PM (24h) toggle and natural time qualifiers to Kafli3RoutineApp.js
"""

path = '/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/components/Kafli3RoutineApp.js'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add clockPeriod and clockFormat in constructor
old_ctor_clock = """    this.clockHour = 4;
    this.clockMinute = 30;"""

new_ctor_clock = """    this.clockHour = 4;
    this.clockMinute = 30;
    this.clockPeriod = 'PM'; // 'AM' | 'PM'
    this.clockFormat = '24h'; // '24h' | '12h'"""

assert old_ctor_clock in text
text = text.replace(old_ctor_clock, new_ctor_clock, 1)

# 2. Add AM/PM toggle bar in Clock UI
old_display_box_header = '''                  <div class="flex items-center justify-between text-xs font-mono">
                    <span class="text-slate-400">Електронний час:</span>
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-bold" id="k3-time-digital">
                      ${String(this.clockHour).padStart(2, '0')}:${String(this.clockMinute).padStart(2, '0')}
                    </span>
                  </div>'''

new_display_box_header = '''                  <div class="flex items-center justify-between text-xs font-mono flex-wrap gap-2">
                    <div class="flex items-center gap-1.5">
                      <span class="text-slate-400">Час:</span>
                      <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-bold" id="k3-time-digital">
                        ${this.getDigitalTimeString()}
                      </span>
                    </div>

                    <!-- AM/PM & 24h Switcher -->
                    <div class="flex items-center gap-1 bg-black/80 p-0.5 rounded-lg border border-slate-800 text-[11px] font-mono">
                      <button id="k3-btn-am" class="px-2 py-0.5 rounded transition-all ${this.clockPeriod === 'AM' ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}">
                        ☀️ AM
                      </button>
                      <button id="k3-btn-pm" class="px-2 py-0.5 rounded transition-all ${this.clockPeriod === 'PM' ? 'bg-amber-500/30 text-amber-300 border border-amber-400 font-bold' : 'text-slate-400 hover:text-white'}">
                        🌙 PM
                      </button>
                      <div class="w-px h-3.5 bg-slate-700 mx-0.5"></div>
                      <button id="k3-btn-mode" class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold hover:bg-purple-500/30 transition-all">
                        ${this.clockFormat}
                      </button>
                    </div>
                  </div>'''

assert old_display_box_header in text
text = text.replace(old_display_box_header, new_display_box_header, 1)

# 3. Update getIcelandicTimeString and add helper getDigitalTimeString, togglePeriod, toggleFormat
old_get_time = """  getIcelandicTimeString(h, m) {
    const neuterHours = {
      1: 'eitt', 2: 'tvö', 3: 'þrjú', 4: 'fjögur', 5: 'fimm', 6: 'sex',
      7: 'sjö', 8: 'átta', 9: 'níu', 10: 'tíu', 11: 'ellefu', 12: 'tólf'
    };"""

new_get_time = """  getDigitalTimeString() {
    let h24 = this.clockHour;
    if (this.clockPeriod === 'PM' && this.clockHour < 12) h24 = this.clockHour + 12;
    if (this.clockPeriod === 'AM' && this.clockHour === 12) h24 = 0;

    const mStr = String(this.clockMinute).padStart(2, '0');
    if (this.clockFormat === '24h') {
      return `${String(h24).padStart(2, '0')}:${mStr}`;
    } else {
      return `${String(this.clockHour).padStart(2, '0')}:${mStr} ${this.clockPeriod}`;
    }
  }

  getTimeQualifier() {
    let h24 = this.clockHour;
    if (this.clockPeriod === 'PM' && this.clockHour < 12) h24 = this.clockHour + 12;
    if (this.clockPeriod === 'AM' && this.clockHour === 12) h24 = 0;

    if (h24 === 12 && this.clockMinute === 0) return { is: 'á hádegi', uk: 'опівдні' };
    if (h24 === 0 && this.clockMinute === 0) return { is: 'á miðnætti', uk: 'опівночі' };
    if (h24 >= 6 && h24 < 12) return { is: 'á morgnana', uk: 'вранці' };
    if (h24 >= 12 && h24 < 18) return { is: 'síðdegis', uk: 'після обіду' };
    if (h24 >= 18 && h24 < 24) return { is: 'á kvöldin', uk: 'ввечері' };
    return { is: 'á nóttunni', uk: 'вночі' };
  }

  getIcelandicTimeString(h, m) {
    const neuterHours = {
      1: 'eitt', 2: 'tvö', 3: 'þrjú', 4: 'fjögur', 5: 'fimm', 6: 'sex',
      7: 'sjö', 8: 'átta', 9: 'níu', 10: 'tíu', 11: 'ellefu', 12: 'tólf'
    };
    const qual = this.getTimeQualifier();
    const dig = this.getDigitalTimeString();"""

assert old_get_time in text
text = text.replace(old_get_time, new_get_time, 1)

# Also update the return objects in getIcelandicTimeString to include qual
old_ret_m0 = """    if (m === 0) {
      if (h === 12) {
        return { is: 'Klukkan er tólf (Hádegi)', uk: 'Полудень / дванадцята година', ipa: '[ˈkʰlʏhkan ɛr toulv / ˈhauːˌtɛːjɪ]' };
      }
      return { 
        is: `Klukkan er ${neuterHours[h]}`, 
        uk: `${h}-та година рівно`, 
        ipa: `[ˈkʰlʏhkan ɛr ${neuterHours[h]}]` 
      };
    }"""

new_ret_m0 = """    if (m === 0) {
      if (h === 12 && this.clockPeriod === 'PM') {
        return { is: `Klukkan er tólf á hádegi (${dig})`, uk: `Полудень (12:00)`, ipa: '[ˈkʰlʏhkan ɛr toulv auː ˈhauːˌtɛːjɪ]' };
      }
      if (h === 12 && this.clockPeriod === 'AM') {
        return { is: `Klukkan er tólf á miðnætti (${dig})`, uk: `Опівніч (00:00)`, ipa: '[ˈkʰlʏhkan ɛr toulv auː ˈmɪðˌnaihtɪ]' };
      }
      return { 
        is: `Klukkan er ${neuterHours[h]} ${qual.is} (${dig})`, 
        uk: `${h}-та година рівно ${qual.uk}`, 
        ipa: `[ˈkʰlʏhkan ɛr ${neuterHours[h]}]` 
      };
    }"""

assert old_ret_m0 in text
text = text.replace(old_ret_m0, new_ret_m0, 1)

# Update m30 return (half-hour)
old_ret_m30 = """    if (m === 30) {
      return { 
        is: `Klukkan er hálf ${neuterHours[nextH]} ⚠️`, 
        uk: `Пів на ${nextH}-у годину (${h}:30! Половина до ${nextH}-ї)`, 
        ipa: `[ˈkʰlʏhkan ɛr haulv ${neuterHours[nextH]}]` 
      };
    }"""

new_ret_m30 = """    if (m === 30) {
      return { 
        is: `Klukkan er hálf ${neuterHours[nextH]} ${qual.is} ⚠️ (${dig})`, 
        uk: `Пів на ${nextH}-у годину ${qual.uk} (${dig}! Половина до ${nextH}-ї)`, 
        ipa: `[ˈkʰlʏhkan ɛr haulv ${neuterHours[nextH]}]` 
      };
    }"""

assert old_ret_m30 in text
text = text.replace(old_ret_m30, new_ret_m30, 1)

# 4. Wire AM/PM and 24h buttons in bindEvents
old_bind_hour = "    const hSlider = this.container.querySelector('#k3-slider-hour');"

new_bind_hour = """    const btnAm = this.container.querySelector('#k3-btn-am');
    if (btnAm) {
      btnAm.addEventListener('click', () => {
        this.clockPeriod = 'AM';
        this.updateClockUI();
      });
    }

    const btnPm = this.container.querySelector('#k3-btn-pm');
    if (btnPm) {
      btnPm.addEventListener('click', () => {
        this.clockPeriod = 'PM';
        this.updateClockUI();
      });
    }

    const btnMode = this.container.querySelector('#k3-btn-mode');
    if (btnMode) {
      btnMode.addEventListener('click', () => {
        this.clockFormat = this.clockFormat === '24h' ? '12h' : '24h';
        btnMode.textContent = this.clockFormat;
        this.updateClockUI();
      });
    }

    const hSlider = this.container.querySelector('#k3-slider-hour');"""

assert old_bind_hour in text
text = text.replace(old_bind_hour, new_bind_hour, 1)

# 5. In updateClockUI, also update digital string and AM/PM buttons class
old_update_ui = """    if (digital) digital.textContent = `${String(this.clockHour).padStart(2, '0')}:${String(this.clockMinute).padStart(2, '0')}`;"""

new_update_ui = """    if (digital) digital.textContent = this.getDigitalTimeString();
    const btnAm = this.container.querySelector('#k3-btn-am');
    const btnPm = this.container.querySelector('#k3-btn-pm');
    if (btnAm && btnPm) {
      btnAm.className = `px-2 py-0.5 rounded transition-all ${this.clockPeriod === 'AM' ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`;
      btnPm.className = `px-2 py-0.5 rounded transition-all ${this.clockPeriod === 'PM' ? 'bg-amber-500/30 text-amber-300 border border-amber-400 font-bold' : 'text-slate-400 hover:text-white'}`;
    }"""

assert old_update_ui in text
text = text.replace(old_update_ui, new_update_ui, 1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Successfully patched Kafli3RoutineApp.js with AM/PM (24h) toggle and natural time qualifiers!')
