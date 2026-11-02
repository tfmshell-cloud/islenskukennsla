/**
 * LocalAITutorPanel.js - Dynamic AI Phonetics & Grammar Coach
 * Connected to local Gemma 2 server at http://localhost:1235/v1/chat/completions
 * Supports dynamic context injection for Módúll 0 & Kafli 1 (Hver ert þú?)
 */

import { audioEngine } from './AudioEngine.js?v=4.9';

export class LocalAITutorPanel {
  constructor(container) {
    this.container = container;
    this.endpoint = 'http://localhost:1235/v1/chat/completions';
    this.model = 'gemma-2-9b-it';
    this.isOnline = false;
    this.isLoading = false;
    this.currentChapter = 'modull_0'; // 'modull_0' or 'kafli_1'

    this.messages = [
      {
        role: 'assistant',
        content: 'Blessuð / Sælir! Я ваш віртуальний лінгвістичний коуч Árnastofnun & Bara tala. Запитуйте про ісландську вимову, фонологічні пастки, дієслово «að vera», відмінки чи життєві діалоги.'
      }
    ];

    this.updateSystemPrompt();
  }

  setChapter(chapterId) {
    this.currentChapter = chapterId;
    this.updateSystemPrompt();
    this.renderQuickPrompts();
  }

  updateSystemPrompt() {
    const basePrompt = `Ти — висококваліфікований фонетичний коуч і викладач ісландської мови Інституту Арні Маґнуссона (Stofnun Árna Magnússonar í íslenskum fræðum) та дослідницького проєкту Bara tala для україномовних студентів.
Твої правила:
1. Завжди відповідай чистою, професійною, але дружньою українською мовою.
2. Використовуй терміни артикуляційної фонетики та завжди надавай точну транскрипцію в Міжнародному фонетичному алфавіті (IPA) у квадратних дужках, наприклад: [tʰahk], [fjatl̥], [ˈlaiːknɪr].
3. Для слів пояснюй точне положення губ/язика та наводь когнітивні мнемоніки (у стилі Drops та Ylhýra).
4. Застерігай від типових помилок україномовних.`;

    if (this.currentChapter === 'kafli_1') {
      this.systemPrompt = `${basePrompt}
Поточний модуль: «Kafli 1: Hver ert þú? (Хто ти?)»
Твої ключові теми:
- Дієслово «að vera» (ég er, þú ert, hann/hún/það er, við erum, þið eruð, þeir/þær/þau eru). Пояснюй, чому дієслово «є» ніколи не випадає в ісландській мові!
- Прийменник «frá» + Давальний відмінок (ÞGF 🟡): frá Úkraínu, frá Íslandi, frá Bandaríkjunum.
- Професії (læknir, kennari, þjónn, sendill, forritari, verkfræðingur, kokkur).
- Питальні слова: Hver (хто), Hvaðan (звідки), Hvaða (який/які), Hvað (що/як).
- Заперечення «ekki» та правило дієслова на 2-й позиції (V2-reglan).`;
    } else {
      this.systemPrompt = `${basePrompt}
Поточний модуль: «Módúll 0: Stafrófið & Framburður (Абетка, фонетика та мовний етикет)»
База знань (78 джерел Árnastofnun, Bara tala, Ylhýra):
1. 32 літери абетки: знак акута (´) позначає якісно іншу фонему (a ➔ á [au], e ➔ é [jɛ], o ➔ ó [ou], i [ɪ] ➔ í [iː], u [ʏ] ➔ ú [uː]).
2. 5 фонетичних пасток:
   - Преаспірація перед pp, tt, kk: мікропауза з гортанним видихом [h] (takk [tʰahk], stopp [stɔhp]).
   - Боковий вибух ll ➔ [tl] (fjall [fjatl]) та nn ➔ [tn] після дифтонгів (steinn [steitn]), але після простих голосних — [nn] (penni).
   - Міжзубні: Þorn [θ] ТІЛЬКИ на початку слів (þak), Eð [ð] ТІЛЬКИ всередині та в кінці слів (maður, blað).
   - hv ➔ [kv] (hvað [kvað]), fn ➔ [pn] (nafn [napn]), fl ➔ [pl] (Keflavík).
   - 4 стани літери G: перед a/o/u ➔ [k] (gata), перед e/i ➔ [c] (gefa), між голосними ➔ [ɣ] (saga), у кінці ➔ [x] (ég).
3. 6 мінімальних пар Bara tala: ís [iːs] vs is [ɪs]; taka ['taːka] vs takk [tʰahk]; bát [pauːt] vs bátt [pauht]; bú [puː] vs búð [puːð]; fínn [fitn] vs penni ['pɛnnɪ]; Sæll [saitl] vs Sæl [sail].
4. Етикет:
   - Sæll [saitl] — виключно до чоловіка; Sæl [sail] — виключно до жінки.
   - Рівність: звертання виключно на «ти» (þú) до всіх людей.
   - Патроніми: ім'я батька в Ef. + -son / -dóttir.`;
    }
  }

  async checkServerHealth() {
    try {
      const res = await fetch('http://localhost:1235/v1/models', { method: 'GET', signal: AbortSignal.timeout(2000) });
      this.isOnline = res.ok;
    } catch (e) {
      this.isOnline = false;
    }
    this.updateStatusBadge();
  }

  updateStatusBadge() {
    const badge = this.container.querySelector('#ai-server-status');
    if (!badge) return;
    if (this.isOnline) {
      badge.className = 'px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1';
      badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Gemma 2 (Online)`;
    } else {
      badge.className = 'px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1';
      badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Смарт-режим`;
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="p-4 sm:p-5 rounded-xl bg-cyber-deep/95 border border-cyan-500/40 shadow-xl space-y-3.5 max-w-3xl mx-auto">
        <!-- AI Header (Compact) -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-cyber-border/30">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-400 flex items-center justify-center text-lg shadow-sm">
              🤖
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm sm:text-base font-black text-white font-mono leading-none">
                  Árnastofnun AI Лінгвістичний Коуч
                </h3>
                <span id="ai-server-status" class="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
                  Зв'язок...
                </span>
              </div>
              <span id="ai-chapter-badge" class="text-[10px] text-slate-400 font-sans">
                Контекст: ${this.currentChapter === 'kafli_1' ? 'Kafli 1 (Hver ert þú?)' : 'Módúll 0 (Stafrófið)'} • Gemma 2 (:1235)
              </span>
            </div>
          </div>

          <button id="ai-clear-btn" class="px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/80 border border-slate-800 text-slate-400 hover:text-white text-[10px] font-mono transition-colors self-start sm:self-auto">
            Очистити чат
          </button>
        </div>

        <!-- Dynamic Quick Prompts Pills -->
        <div id="ai-quick-prompts-container" class="flex items-center gap-1.5 flex-wrap text-xs">
          <!-- Populated by renderQuickPrompts() -->
        </div>

        <!-- Chat Messages Container -->
        <div id="ai-messages-container" class="space-y-2.5 max-h-72 overflow-y-auto p-3 rounded-lg bg-black/60 border border-slate-800/80 pr-1.5 text-xs">
          <!-- Rendered messages -->
        </div>

        <!-- Chat Input Form -->
        <form id="ai-chat-form" class="flex items-center gap-2">
          <input
            id="ai-chat-input"
            type="text"
            placeholder="Запитайте про вимову, að vera, країни чи граматику..."
            class="flex-grow bg-black/80 border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors font-sans"
            autocomplete="off"
          />
          <button
            type="submit"
            id="ai-send-btn"
            class="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs font-mono shadow-sm transition-all flex items-center gap-1 flex-shrink-0"
          >
            <span>Надіслати ➔</span>
          </button>
        </form>
      </div>
    `;

    this.renderQuickPrompts();
    this.renderMessages();
    this.bindEvents();
    this.checkServerHealth();
  }

  renderQuickPrompts() {
    const box = this.container.querySelector('#ai-quick-prompts-container');
    const badge = this.container.querySelector('#ai-chapter-badge');
    if (badge) {
      badge.innerText = `Контекст: ${this.currentChapter === 'kafli_1' ? 'Kafli 1 (Hver ert þú?)' : 'Módúll 0 (Stafrófið)'} • Gemma 2 (:1235)`;
    }
    if (!box) return;

    let prompts = [];
    if (this.currentChapter === 'kafli_1') {
      prompts = [
        'Як відмінюється дієслово «að vera»?',
        'Чому «frá Úkraínu», а не «frá Úkraína»?',
        'Як побудувати заперечення з «ekki»?',
        'Як вимовити слово «læknir»?'
      ];
    } else {
      prompts = [
        'Як вимовити «Eyjafjallajökull»?',
        'Чому ll звучить як [tl]?',
        'Різниця між Þ та Ð?',
        'Преаспірація в слові «takk»'
      ];
    }

    box.innerHTML = `
      <span class="text-[10px] font-mono text-slate-500">Швидкі теми:</span>
      ${prompts.map(p => `
        <button class="ai-quick-prompt px-2 py-0.5 rounded bg-black/60 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-[11px] font-sans transition-all">
          ${p}
        </button>
      `).join('')}
    `;

    box.querySelectorAll('.ai-quick-prompt').forEach(btn => {
      btn.addEventListener('click', async () => {
        const text = btn.innerText.trim();
        if (this.isLoading) return;
        await this.sendMessage(text);
      });
    });
  }

  renderMessages() {
    const box = this.container.querySelector('#ai-messages-container');
    if (!box) return;

    box.innerHTML = this.messages.map((m, idx) => {
      const isUser = m.role === 'user';
      return `
        <div class="flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}">
          <div class="w-6 h-6 rounded ${isUser ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'} flex items-center justify-center text-xs font-bold flex-shrink-0">
            ${isUser ? '🧑' : '🇮🇸'}
          </div>
          <div class="max-w-[88%] p-2.5 rounded-xl ${isUser ? 'bg-amber-500/10 border border-amber-500/30 text-slate-100 rounded-tr-none' : 'bg-cyber-deep border border-cyan-500/30 text-slate-200 rounded-tl-none'} space-y-1 font-sans text-xs leading-relaxed">
            <div class="flex items-center justify-between text-[9px] font-mono ${isUser ? 'text-amber-400' : 'text-cyan-400'}">
              <span>${isUser ? 'Ви' : 'Árnastofnun Коуч'}</span>
              ${!isUser ? `
                <button class="ai-msg-speak-btn px-1 py-0.2 rounded bg-black/40 hover:bg-black text-[9px] text-cyan-300 font-mono transition-colors" data-msg-idx="${idx}" title="Слухати">
                  🔊 Озвучити
                </button>
              ` : ''}
            </div>
            <div class="whitespace-pre-wrap">${this.formatMessageContent(m.content)}</div>
          </div>
        </div>
      `;
    }).join('');

    box.scrollTop = box.scrollHeight;
  }

  formatMessageContent(text) {
    let safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    safe = safe.replace(/\[(.*?)\]/g, '<span class="font-mono text-cyan-300 font-bold bg-black/40 px-1 rounded">[$1]</span>');
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
    return safe;
  }

  bindEvents() {
    const form = this.container.querySelector('#ai-chat-form');
    const input = this.container.querySelector('#ai-chat-input');
    const clearBtn = this.container.querySelector('#ai-clear-btn');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text || this.isLoading) return;
        input.value = '';
        await this.sendMessage(text);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.messages = [this.messages[0]];
        this.renderMessages();
      });
    }

    const box = this.container.querySelector('#ai-messages-container');
    if (box) {
      box.addEventListener('click', (e) => {
        const btn = e.target.closest('.ai-msg-speak-btn');
        if (btn) {
          const idx = parseInt(btn.dataset.msgIdx, 10);
          const msg = this.messages[idx];
          if (msg) {
            const match = msg.content.match(/«(.*?)»/) || msg.content.match(/"(.*?)"/) || msg.content.match(/\[(.*?)\]/);
            const target = match ? match[1] : 'Ísland';
            audioEngine.play(target, btn);
          }
        }
      });
    }
  }

  async sendMessage(userText) {
    this.messages.push({ role: 'user', content: userText });
    this.isLoading = true;
    this.renderMessages();

    const box = this.container.querySelector('#ai-messages-container');
    if (box) {
      const loader = document.createElement('div');
      loader.id = 'ai-typing-indicator';
      loader.className = 'flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 p-1.5';
      loader.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span> Gemma 2 аналізує (${this.currentChapter})...`;
      box.appendChild(loader);
      box.scrollTop = box.scrollHeight;
    }

    try {
      let botResponse = '';
      if (this.isOnline) {
        const res = await fetch(this.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: this.model,
            messages: [
              { role: 'system', content: this.systemPrompt },
              ...this.messages.slice(-5)
            ],
            max_tokens: 380,
            temperature: 0.3
          }),
          signal: AbortSignal.timeout(10000)
        });

        if (res.ok) {
          const data = await res.json();
          if (data.choices && data.choices[0] && data.choices[0].message) {
            botResponse = data.choices[0].message.content.trim();
          }
        }
      }

      if (!botResponse) {
        botResponse = this.generateFallbackResponse(userText);
      }

      this.messages.push({ role: 'assistant', content: botResponse });
    } catch (err) {
      console.warn('AI Tutor fallback:', err);
      const fallback = this.generateFallbackResponse(userText);
      this.messages.push({ role: 'assistant', content: fallback });
    } finally {
      this.isLoading = false;
      const loader = this.container.querySelector('#ai-typing-indicator');
      if (loader) loader.remove();
      this.renderMessages();
    }
  }

  generateFallbackResponse(query) {
    const q = query.toLowerCase();

    // Kafli 1 answers
    if (q.includes('vera') || q.includes('відміню')) {
      return `Дієвідмінювання дієслова **að vera** (бути) у теперішньому часі:
• **ég er** [jɛːx ɛːr] (я є)
• **þú ert** [θuː ɛr̥t] (ти є)
• **hann / hún / það er** (він/вона/воно є)
• **við erum** [vɪːð ˈɛːrʏm] (ми є)
• **þið eruð** [θɪːð ˈɛːrʏð] (ви є)
• **þeir / þær / þau eru** [ˈɛːrʏ] (вони є)
⚠️ **Правило для українців:** в ісландській мові форма дієслова є обов'язковою в кожному реченні: *«Ég er verkfræðingur»* (Я інженер), казати *«Ég verkfræðingur»* не можна!`;
    }

    if (q.includes('frá') || q.includes('країн') || q.includes('давальн') || q.includes('úkraínu')) {
      return `Прийменник **frá** (з, від) ЗАВЖДИ вимагає **давального відмінка (ÞGF 🟡)**:
1. Жіночий рід на -a: **-a ➔ -u** (*frá Úkraínu*, *frá Danmörku*).
2. Сер./чол. на приголосний: **+ -i** (*frá Íslandi*, *frá Póllandi*, *frá Þýskalandi*).
3. Чоловічий рід: *Noregur* ➔ *frá Noregi*, *Spánn* ➔ *frá Spáni*.
4. Множина: *Bandaríkin* ➔ *frá Bandaríkjunum* (-unum).`;
    }

    if (q.includes('ekki') || q.includes('v2') || q.includes('запереч')) {
      return `Правило заперечення **«ekki»** та закон **V2**:
В ісландській мові дієслово завжди стоїть на **другій позиції (V2)**, а частка заперечення **ekki** йде одразу ПІСЛЯ дієслова:
• Прямий порядок: **Підмет + Дієслово + ekki** (*Ég er ekki læknir* — Я не лікар).
• Інверсія: **Обставина + Дієслово + Підмет + ekki** (*Núna er hann ekki heima* — Зараз він не вдома).`;
    }

    if (q.includes('læknir')) {
      return `Вимова слова **læknir** (лікар): **[ˈlaiːknɪr]**!
Зверніть увагу на сполучення **kn**: перед ним виникає характерна для ісландської гортанна мікропауза (преаспірація) **[hkn]**, ніби ви робите короткий видих перед [k]: *«лай-гкнір»*.`;
    }

    // Módúll 0 answers
    if (q.includes('eyjafjallajökull') || q.includes('вулкан')) {
      return `Вимова вулкана **Eyjafjallajökull**: [ˈeiːjaˌfjatlaˌjœːkʏtl̥]!
1. **Eyja-** [ˈeiːja-] — «острови»
2. **-fjalla-** [-fjatla-] — «гір» (ll ➔ [tl]!)
3. **-jökull** [-jœːkʏtl̥] — «льодовик» (ö як [œ], в кінці [tl]).`;
    }
    if (q.includes('ll') || q.includes('боков')) {
      return `Сполучення **ll** дає **боковий вибух** [tl̥] (hliðarsprenging).
👄 **Артикуляція:** кінчик язика на альвеолах [т], боки різко пропускають повітря [л]. Приклади: **Fjall** [fjatl̥], **Sæll** [saitl̥].`;
    }
    if (q.includes('þ') || q.includes('ð') || q.includes('міжзуб')) {
      return `Правило міжзубних літер:
1. **Þ (Þorn)** [θ]: глухий (англ. 'think'). Тільки на **ПОЧАТКУ** слів! (**Þing**, **Þú**).
2. **Ð (Eð)** [ð]: дзвінкий (англ. 'this'). Тільки в **СЕРЕДИНІ або КІНЦІ** слів! (**Maður**, **Blað**).`;
    }

    return `Цікаве запитання! В ісландській мові основними є принципи:
1. **Наголос ЗАВЖДИ на 1-му складі**.
2. **Дієслово завжди на 2-й позиції (V2)**.
3. **Прийменник frá керує давальним відмінком ÞGF**.
Запитайте про будь-яку конкретну граматичну тему чи вимову слова!`;
  }
}
