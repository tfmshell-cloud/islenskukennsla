/**
 * LocalAITutorPanel.js - Árnastofnun AI Linguistics & Phonetics Coach
 * Fullscreen / Modal-optimized architecture
 * Supports:
 * 1. Cloud AI (Google Gemini API via user key) - Works 100% on GitHub Pages over HTTPS
 * 2. Local AI (LM Studio Gemma 2 at http://localhost:1235) - Active on local environment
 * 3. Deep Offline Linguistic Knowledge Base (Árnastofnun & Bara tala verified rules)
 */

import { audioEngine } from './AudioEngine.js?v=6.0';
import { ANCHOR_WORDS_MASTER } from '../data/anchor_words_master.js?v=6.0';

export class LocalAITutorPanel {
  constructor(container, onClose = null) {
    this.container = container;
    this.onClose = onClose;
    this.endpoint = 'http://localhost:1235/v1/chat/completions';
    this.model = 'gemma-2-9b-it';
    this.geminiApiKey = localStorage.getItem('isl_gemini_api_key') || '';
    this.isOnline = false;
    this.isGeminiActive = Boolean(this.geminiApiKey);
    this.isLoading = false;
    this.currentChapter = 'modull_0'; // 'modull_0' or 'kafli_1'

    this.messages = [
      {
        role: 'assistant',
        content: 'Blessuð / Sælir! Я ваш лінгвістичний коуч Árnastofnun & Bara tala. Запитуйте про ісландську вимову, дієслово «að heita», фонологічні пастки, дієслово «að vera» чи відмінки.'
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
    const basePrompt = `Ти — кваліфікований лінгвістичний коуч Інституту Арні Маґнуссона (Stofnun Árna Magnússonar í íslenskum fræðum) та дослідницького проєкту Bara tala для україномовних студентів.
Твої правила:
1. Завжди відповідай живою, академічно точною, але дружньою українською мовою.
2. Використовуй міжнародну фонетичну транскрипцію (IPA) у квадратних дужках: [tʰahk], [fjatl̥], [ˈheiːtɪr].
3. Пояснюй граматичну різницю між особами (наприклад: ég heiti vs þú heitir), відмінками та формами.
4. Наводь чіткі приклади і порівняння з українською фонетикою.`;

    if (this.currentChapter === 'kafli_1') {
      this.systemPrompt = `${basePrompt}
Поточний модуль: «Kafli 1: Hver ert þú? (Хто ти?)»
Ключові теми:
- Дієслово «að vera» (ég er, þú ert, hann/hún er, við erum, þið eruð, þeir/þær/þau eru).
- Дієслово «að heita» (ég heiti, þú heitir, hann/hún heitir).
- Прийменник «frá» + Давальний відмінок (ÞGF): frá Úkraínu, frá Íslandi.
- Заперечення «ekki» та закон дієслова на другій позиції (V2).`;
    } else {
      this.systemPrompt = `${basePrompt}
Поточний модуль: «Módúll 0: Stafrófið & Framburður (Абетка, звуки, діалог)»
Ключові теми:
- 32 літери абетки, різниця між простими голосними та голосними з акутом (a/á, e/é, i/í, o/ó, u/ú).
- 5 фонетичних пасток: преаспірація (takk, stopp), латеральний вибух ll/nn (fjall, steinn), міжзубні літери (Þorn тільки на початку слів, Eð тільки всередині/кінці), 4 стани літери G, лабіовеляри hv ➔ [kv].
- Симулятор діалогу: звертання до чоловіка (Sæll [saitl]) та жінки (Sæl [sail]). Походження: Úkraínumaður (чол.) / Úkraínukona (жін.).
- Значення слів «heiti» (ім'я/назва) та «heita» (називатися).`;
    }
  }

  async checkServerHealth() {
    if (this.geminiApiKey) {
      this.isGeminiActive = true;
      this.updateStatusBadge();
      return;
    }

    if (window.location.protocol === 'http:') {
      try {
        const res = await fetch('http://localhost:1235/v1/models', { method: 'GET', signal: AbortSignal.timeout(1800) });
        this.isOnline = res.ok;
      } catch (e) {
        this.isOnline = false;
      }
    } else {
      this.isOnline = false;
    }

    this.updateStatusBadge();
  }

  updateStatusBadge() {
    const badge = this.container.querySelector('#ai-server-status');
    if (!badge) return;

    if (this.isGeminiActive) {
      badge.className = 'px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1';
      badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span> Gemini AI (Хмара)`;
    } else if (this.isOnline) {
      badge.className = 'px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1';
      badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Gemma 2 (Local:1235)`;
    } else {
      badge.className = 'px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1';
      badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Árnastofnun База`;
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="h-full flex flex-col p-3.5 sm:p-5 space-y-3 bg-cyber-deep/95 select-none-text">
        <!-- AI Header with Close Button -->
        <div class="flex items-center justify-between pb-2.5 border-b border-cyber-border/30 flex-shrink-0">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-400 flex items-center justify-center text-lg sm:text-xl shadow-sm flex-shrink-0">
              🤖
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-xs sm:text-sm font-black text-white font-mono leading-none">
                  Árnastofnun AI Лінгвістичний Коуч
                </h3>
                <span id="ai-server-status" class="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
                  Зв'язок...
                </span>
              </div>
              <span id="ai-chapter-badge" class="text-[10px] text-slate-400 font-sans block mt-0.5">
                Контекст: ${this.currentChapter === 'kafli_1' ? 'Kafli 1 (Hver ert þú?)' : 'Módúll 0 (Stafrófið)'}
              </span>
            </div>
          </div>

          <!-- Actions: Gemini Key, Clear, Close Modal -->
          <div class="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <button id="ai-config-key-btn" class="px-2 sm:px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-[10px] font-mono transition-colors flex items-center gap-1">
              <span>⚙️</span> <span class="hidden sm:inline">${this.geminiApiKey ? 'API Ключ ✓' : '+ Gemini API'}</span>
            </button>
            <button id="ai-clear-btn" class="px-2 sm:px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/80 border border-slate-800 text-slate-400 hover:text-white text-[10px] font-mono transition-colors">
              Очистити
            </button>
            <button id="ai-close-modal-btn" class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500/10 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 hover:text-rose-100 text-xs sm:text-sm font-bold flex items-center justify-center transition-all ml-1 shadow-sm active:scale-90" title="Закрити вікно (Esc)">
              ✕
            </button>
          </div>
        </div>

        <!-- Quick Prompts Pills -->
        <div id="ai-quick-prompts-container" class="flex items-center gap-1.5 flex-wrap text-xs flex-shrink-0"></div>

        <!-- Chat Messages Container (Expands to fill vertical space) -->
        <div id="ai-messages-container" class="flex-grow overflow-y-auto p-3 sm:p-4 rounded-xl bg-black/60 border border-slate-800/80 space-y-3 text-xs pr-2 min-h-0"></div>

        <!-- Chat Input Form (Anchored at bottom) -->
        <form id="ai-chat-form" class="flex items-center gap-2 pt-1 flex-shrink-0">
          <input
            id="ai-chat-input"
            type="text"
            placeholder="Запитайте про «heiti», «að vera», вимову чи правила..."
            class="flex-grow bg-black/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 sm:px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors font-sans shadow-inner"
            autocomplete="off"
          />
          <button
            type="submit"
            id="ai-send-btn"
            class="px-3.5 sm:px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs font-mono shadow-md transition-all flex items-center gap-1 flex-shrink-0 active:scale-95"
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
      badge.innerText = `Контекст: ${this.currentChapter === 'kafli_1' ? 'Kafli 1 (Hver ert þú?)' : 'Módúll 0 (Stafrófið)'}`;
    }
    if (!box) return;

    let prompts = [];
    if (this.currentChapter === 'kafli_1') {
      prompts = [
        'Різниця між «heiti» та «heitir»?',
        'Як відмінюється «að vera»?',
        'Чому «frá Úkraínu», а не «frá Úkraína»?',
        'Як побудувати заперечення з «ekki»?'
      ];
    } else {
      prompts = [
        'Різниця між «heiti» та «heitir»?',
        'Коли кажуть «Sæll!», а коли «Sæl!»?',
        'Чому ll звучить як [tl]?',
        'Преаспірація в слові «takk»'
      ];
    }

    box.innerHTML = `
      <span class="text-[10px] font-mono text-slate-500">Підказки:</span>
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
          <div class="max-w-[88%] p-2.5 rounded-xl ${isUser ? 'bg-amber-500/10 border border-amber-500/30 text-slate-100 rounded-tr-none' : 'bg-cyber-deep border border-cyan-500/30 text-slate-200 rounded-tl-none'} space-y-1 font-sans text-xs leading-relaxed shadow-sm">
            <div class="flex items-center justify-between text-[9px] font-mono ${isUser ? 'text-amber-400' : 'text-cyan-400'}">
              <span>${isUser ? 'Ви' : 'Árnastofnun Коуч'}</span>
              ${!isUser ? `
                <button class="ai-msg-speak-btn px-1.5 py-0.2 rounded bg-black/40 hover:bg-black text-[9px] text-cyan-300 font-mono transition-colors" data-msg-idx="${idx}" title="Слухати">
                  🔊 Озвучити
                </button>
              ` : ''}
            </div>
            <div class="whitespace-pre-wrap leading-relaxed">${this.formatMessageContent(m.content)}</div>
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
    const configKeyBtn = this.container.querySelector('#ai-config-key-btn');
    const closeBtn = this.container.querySelector('#ai-close-modal-btn');

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

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (this.onClose) this.onClose();
      });
    }

    if (configKeyBtn) {
      configKeyBtn.addEventListener('click', async () => {
        const curKey = this.geminiApiKey || '';
        const userKey = prompt('Введіть ваш Google Gemini API Key (або залиште порожнім для видалення):', curKey);
        if (userKey !== null) {
          const cleanKey = userKey.trim().replace(/^["'`]|["'`]$/g, '').trim();
          if (!cleanKey) {
            this.geminiApiKey = '';
            localStorage.removeItem('isl_gemini_api_key');
            this.isGeminiActive = false;
            this.updateStatusBadge();
            configKeyBtn.innerHTML = `<span>⚙️</span> <span class="hidden sm:inline">+ Gemini API</span>`;
            alert('ℹ️ Gemini API ключ видалено. Працює локальна база знань Árnastofnun.');
            return;
          }

          configKeyBtn.innerHTML = `<span>⏳</span> <span class="hidden sm:inline">Перевірка...</span>`;
          const testRes = await this.testGeminiKey(cleanKey);
          if (testRes.ok) {
            this.geminiApiKey = cleanKey;
            localStorage.setItem('isl_gemini_api_key', cleanKey);
            this.isGeminiActive = true;
            this.updateStatusBadge();
            configKeyBtn.innerHTML = `<span>⚙️</span> <span class="hidden sm:inline">API Ключ ✓</span>`;
            alert(`✅ Gemini API ключ успішно підтверджено!\nЗв'язок із моделлю (${testRes.model}) встановлено.`);
          } else {
            const saveAnyway = confirm(`⚠️ Google Gemini повернув помилку перевірки:\n"${testRes.error}"\n\nМожливо, є обмеження або друкарська помилка.\nВсе одно зберегти цей ключ?`);
            if (saveAnyway) {
              this.geminiApiKey = cleanKey;
              localStorage.setItem('isl_gemini_api_key', cleanKey);
              this.isGeminiActive = true;
              this.updateStatusBadge();
              configKeyBtn.innerHTML = `<span>⚙️</span> <span class="hidden sm:inline">API Ключ ⚠️</span>`;
            } else {
              configKeyBtn.innerHTML = `<span>⚙️</span> <span class="hidden sm:inline">${this.geminiApiKey ? 'API Ключ ✓' : '+ Gemini API'}</span>`;
            }
          }
        }
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

    const input = this.container.querySelector('#ai-chat-input');
    const sendBtn = this.container.querySelector('#ai-send-btn');
    if (input) input.disabled = true;
    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.classList.add('opacity-50');
    }

    const box = this.container.querySelector('#ai-messages-container');
    if (box) {
      const loader = document.createElement('div');
      loader.id = 'ai-typing-indicator';
      loader.className = 'flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 p-2';
      loader.innerHTML = `<span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> Árnastofnun аналізує запит...`;
      box.appendChild(loader);
      box.scrollTop = box.scrollHeight;
    }

    try {
      let botResponse = '';

      // 1. Try Google Gemini API if user configured key (Works 100% on GitHub Pages HTTPS)
      if (this.geminiApiKey) {
        const geminiRes = await this.queryGeminiApi(userText);
        if (geminiRes && geminiRes.success) {
          botResponse = geminiRes.text;
        } else if (geminiRes && geminiRes.error) {
          console.warn('[Árnastofnun AI] Gemini error:', geminiRes.error);
          botResponse = `⚠️ **Помилка виклику Google Gemini API:**\n\n> \`${geminiRes.error}\`\n\n💡 **Як вирішити:**\n• Перевірте свій ключ у кнопці **⚙️ API Ключ** угорі (можливо, ключ містить друкарську помилку або не активований у Google AI Studio).\n\n*(Нижче наведено довідку із локальної лінгвістичної бази Árnastofnun)*:\n\n---\n\n` + this.generateFallbackResponse(userText);
        }
      }

      // 2. Try Local LM Studio Gemma 2 (if on localhost:8000)
      if (!botResponse && window.location.protocol === 'http:' && this.isOnline) {
        botResponse = await this.queryLocalLmStudio(userText);
      }

      // 3. Fallback to Deep Linguistic Rule Engine
      if (!botResponse) {
        botResponse = this.generateFallbackResponse(userText);
      }

      this.messages.push({ role: 'assistant', content: botResponse });
    } catch (err) {
      console.warn('AI Tutor fallback triggered:', err);
      const fallback = this.generateFallbackResponse(userText);
      this.messages.push({ role: 'assistant', content: fallback });
    } finally {
      this.isLoading = false;
      const loader = this.container.querySelector('#ai-typing-indicator');
      if (loader) loader.remove();
      if (input) {
        input.disabled = false;
        input.focus();
      }
      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.classList.remove('opacity-50');
      }
      this.renderMessages();
    }
  }

  buildGeminiContents(userText) {
    const validContents = [];

    // History excluding initial greeting (index 0) and current user message (last index)
    const history = this.messages.slice(1, -1);

    for (const m of history) {
      const role = m.role === 'user' ? 'user' : 'model';
      // First turn must be user
      if (validContents.length === 0 && role !== 'user') continue;

      // Strict alternation: merge text if same role consecutively
      if (validContents.length > 0 && validContents[validContents.length - 1].role === role) {
        validContents[validContents.length - 1].parts[0].text += '\n\n' + m.content;
      } else {
        validContents.push({
          role,
          parts: [{ text: m.content }]
        });
      }
    }

    // Now append the current user text
    if (validContents.length > 0 && validContents[validContents.length - 1].role === 'user') {
      validContents[validContents.length - 1].parts[0].text += '\n\n' + userText;
    } else {
      validContents.push({
        role: 'user',
        parts: [{ text: userText }]
      });
    }

    return validContents;
  }

  async testGeminiKey(key) {
    if (!key) return { ok: false, error: 'Ключ порожній' };
    const models = ['gemini-1.5-flash', 'gemini-2.0-flash'];
    let lastErr = '';
    for (const m of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'Halló' }] }]
          }),
          signal: AbortSignal.timeout(8000)
        });
        if (res.ok) {
          return { ok: true, model: m };
        } else {
          const errData = await res.json().catch(() => ({}));
          lastErr = errData.error?.message || `HTTP ${res.status}: ${res.statusText}`;
        }
      } catch (e) {
        lastErr = e.message || 'Помилка мережі';
      }
    }
    return { ok: false, error: lastErr };
  }

  async queryGeminiApi(userText) {
    const key = (this.geminiApiKey || '').trim().replace(/^["'`]|["'`]$/g, '').trim();
    if (!key) return { success: false, error: 'API ключ не вказано' };

    const contents = this.buildGeminiContents(userText);
    const payload = {
      system_instruction: {
        parts: [{ text: this.systemPrompt }]
      },
      contents,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1000
      }
    };

    const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
    let lastError = null;

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(18000)
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (reply) {
            return { success: true, text: reply, model };
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          lastError = errData.error?.message || `HTTP ${res.status}: ${res.statusText}`;
          console.warn(`[Árnastofnun AI] Model ${model} returned error:`, lastError);
          // If invalid API key, no need to retry other models
          if (res.status === 400 && lastError.toLowerCase().includes('api key')) {
            break;
          }
        }
      } catch (err) {
        lastError = err.message || 'Помилка мережевого запиту';
        console.warn(`[Árnastofnun AI] Model ${model} fetch exception:`, err);
      }
    }

    return { success: false, error: lastError };
  }

  async queryLocalLmStudio(userText) {
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: this.systemPrompt },
            ...this.messages.slice(-5)
          ],
          max_tokens: 420,
          temperature: 0.3
        }),
        signal: AbortSignal.timeout(25000)
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content?.trim() || '';
      }
    } catch (e) {
      console.warn('LM Studio local call failed:', e);
    }
    return '';
  }

  /**
   * Deep Linguistic Knowledge Base (Árnastofnun & Bara tala verified rules)
   * Resolves exact student queries with targeted, accurate explanations.
   */
  generateFallbackResponse(query) {
    const q = query.toLowerCase();

    // 0. Dynamic search across all 60 Anchor Words in ANCHOR_WORDS_MASTER
    if (typeof ANCHOR_WORDS_MASTER === 'object') {
      const allWords = [
        ...(ANCHOR_WORDS_MASTER.modull_0 || []),
        ...(ANCHOR_WORDS_MASTER.kafli_1 || []),
        ...(ANCHOR_WORDS_MASTER.drops_lab || []),
        ...(ANCHOR_WORDS_MASTER.modull_3 || [])
      ];

      for (const item of allWords) {
        const wLower = item.word.toLowerCase();
        // Match word as a distinct word in query
        const regex = new RegExp(`(^|[\\s.,!?«»"'])${wLower}([\\s.,!?«»"']|$)`, 'i');
        if (regex.test(q)) {
          return `📖 **Словникова картка Árnastofnun: «${item.word}»**\n\n` +
            `• **Значення українською:** ${item.uk}\n` +
            `• **Вимова (IPA):** ${item.ipa}\n` +
            `• **Граматична категорія:** ${item.gender_name || item.gender}\n` +
            `• **Контекст V2:** «${item.sentence_v2}»\n` +
            `• **Переклад речення:** ${item.sentence_trans}\n\n` +
            `*(Підказка: Ви також можете прослухати автентичну вимову Gunnar у Щоденному Тренажері «Dagsamningur»)*.`;
        }
      }
    }

    // 1. «heiti» vs «heitir» (verb að heita & noun heiti)
    if (q.includes('heiti') || q.includes('heita') || q.includes('heitir')) {
      return `🌟 **Розбір слова «heiti» та дієслова «að heita»:**

В ісландській мові це два дуже важливі, взаємопов'язані поняття:

1. **Іменник «heiti» [ˈheiːtɪ] (середній рід):**
• Означає: **«ім'я»**, **«назва»**, **«найменування»**.
• Наприклад: *«Þetta heiti»* — «Ця назва / це ім'я».

2. **Дієслово «að heita» [auð ˈheiːta] (зватися / мати ім'я):**
Це дієслово теперішнього часу змінюється за особами:
• **Ég heiti** [jɛːx ˈheiːtɪ] — «Мене звати» (1-ша особа однини, закінчення **-i**)
• **Þú heitir** [θuː ˈheiːtɪr] — «Тебе звати» (2-га особа однини, закінчення **-ir**)
• **Hann / Hún heitir** [ˈheiːtɪr] — «Його / Її звати» (3-тя особа однини, закінчення **-ir**)
• **Hvað heitir þú?** [kʰvaːð ˈheiːtɪr θuː] — «Як тебе звати?»

💡 **Чому в одних фразах «heiti», а в інших «heitir»?**
- Коли кажете про **себе**: **«Ég heiti Anna»** [ˈheiːtɪ].
- Коли запитуєте співрозмовника (**ти**) або говорите про когось третього (**він/вона**): **«Hvað heitir þú?»** [ˈheiːtɪr].
*(Якщо ви мали на увазі форму «suð» — це ісландське слово «suð» [sʏːð] «гудіння/південь», а у запитанні «як тебе звати» нормативною фразою є саме «Hvað heitir þú?»).*`;
    }

    // 2. Gender greetings: Sæll vs Sæl
    if (q.includes('sæll') || q.includes('sæl') || (q.includes('привіт') && (q.includes('чоловік') || q.includes('жінк')))) {
      return `🌟 **Соціолінгвістичне правило вітання: Sæll vs Sæl**

В ісландській мові форма привітання залежить від граматичного роду **співрозмовника** (того, до кого ви звертаєтесь!):

1. **Sæll!** [saitl̥] — звертання виключно до **ЧОЛОВІКА**:
• Фонетика: подвоєне **ll** вимовляється як латеральний вибух **[tl̥]**!
• Наприклад: *«Sæll, Jón!»*

2. **Sæl!** [sail] — звертання виключно до **ЖІНКИ**:
• Фонетика: одиночне **l** вимовляється м'яко і гладко **[l]** без вибуху!
• Наприклад: *«Sæl, Anna!»*

3. **Sælir!** [ˈsaiːlɪr] — звертання до групи чоловіків.
4. **Sælar!** [ˈsaiːlar] — звертання до групи жінок.
5. **Sæl verið þið!** — до змішаної компанії.`;
    }

    // 3. Preaspiration (takk, stopp, bátt)
    if (q.includes('takk') || q.includes('преаспірац') || q.includes('stopp') || q.includes('bátt')) {
      return `🌬️ **Ісландська преаспірація (Aðblástur):**

Преаспірація — це коротке гортанне придихання **[h]** перед здвоєними глухими приголосними **pp, tt, kk**:

1. **Takk** ➔ вимовляється як **[tʰahk]** (не «такк», а короткий голосний + різкий видих повітря [h] перед звуком [k]).
2. **Stopp** ➔ **[stɔhp]**.
3. **Bátt** ➔ **[pauht]** (порівняйте з «Bát» [pauːt], де голосний довгий і видиху немає).

👄 **Як вимовляти українцю:** уявіть, що ви раптово завмираєте на долю секунди перед [к/т/п] і робите різкий видих у гортані.`;
    }

    // 4. Lateral explosion (ll, nn, fjall, steinn)
    if (q.includes('ll') || q.includes('боков') || q.includes('латеральн') || q.includes('fjall') || q.includes('steinn')) {
      return `⚡ **Боковий вибух (Hliðarsprenging) для «ll» та «nn»:**

1. **Сполучення «ll» ➔ [tl̥]:**
• Кінчик язика впирається в альвеоли як для звуку [т], а бокові краї язика різко пропускають потік повітря зі звуком [л].
• **Fjall** (гора) ➔ **[fjatl̥]** (не «фьялл»!).
• **Eyjafjallajökull** ➔ **[ˈeiːjaˌfjatlaˌjœːkʏtl̥]**.

2. **Сполучення «nn» після дифтонгів/довгих голосних ➔ [tn]:**
• **Steinn** (камінь) ➔ **[steitn]**.
• **Fínn** (чудовий) ➔ **[fitn]**.
• Але після простих коротких голосних «nn» лишається [n]: **penni** [ˈpʰɛnːɪ].`;
    }

    // 5. Interdentals: Þorn vs Eð (Strict word boundary match)
    if (/\b(þ|ð|þorn|eð)\b/i.test(q) || (q.includes('міжзуб') && (q.includes('букв') || q.includes('літер')))) {
      return `🦷 **Суворе правило міжзубних літер: Þ (Þorn) та Ð (Eð):**

1. **Þ (Þorn)** [θ]: глухий міжзубний звук (як англ. *thin / think*).
• ⚠️ **Правило:** зустрічається **ТІЛЬКИ на початку слів**!
• Приклади: **Þak** [θaːk] (дах), **Þú** [θuː] (ти), **Þing** [θiŋk] (парламент).

2. **Ð (Eð)** [ð]: дзвінкий міжзубний звук (як англ. *this / brother*).
• ⚠️ **Правило:** ніколи не буває на початку слова! Тільки **в середині або в кінці**!
• Приклади: **Maður** [ˈmaːðʏr] (чоловік), **Blað** [plaːð] (газета), **Hvað** [kʰvaːð] (що).`;
    }

    // 6. Preposition «frá» + Dative (ÞGF)
    if (q.includes('frá') || q.includes('країн') || q.includes('давальн') || q.includes('úkraínu')) {
      return `🗺️ **Прийменник «frá» (звідки) + Давальний відмінок (ÞGF 🟡):**

Прийменник **frá** завжди вимагає після себе форми давального відмінка:
1. **Жіночий рід на -a ➔ закінчення -u:**
• *Úkraína* ➔ **frá Úkraínu** [frau ˈuːkraiːnʏ] (не «frá Úkraína»!).
• *Danmörk* ➔ **frá Danmörku**.
2. **Середній рід на приголосний ➔ закінчення -i:**
• *Ísland* ➔ **frá Íslandi** [frau ˈistlantɪ].
• *Pólland* ➔ **frá Póllandi**.
3. **Чоловічий рід:**
• *Noregur* ➔ **frá Noregi**.
4. **Множина (-unum):**
• *Bandaríkin* ➔ **frá Bandaríkjunum**.`;
    }

    // 7. Verb «að vera»
    if (q.includes('vera') || (q.includes('бути') && q.includes('дієслов'))) {
      return `📘 **Дієвідмінювання дієслова «að vera» (бути) у теперішньому часі:**

• **Ég er** [jɛːx ɛːr] — Я є
• **Þú ert** [θuː ɛr̥t] — Ти є
• **Hann / Hún / Það er** [ɛːr] — Він / Вона / Воно є
• **Við erum** [vɪːð ˈɛːrʏm] — Ми є
• **Þið eruð** [θɪːð ˈɛːrʏð] — Ви є
• **Þeir / Þær / Þau eru** [ˈɛːrʏ] — Вони є

⚠️ **Закон для українців:** в ісландській мові зв'язку «є» не можна опускати!
Кажемо: *«Ég er forritari»* (Я є програміст). Речення *«Ég forritari»* є грубою помилкою.`;
    }

    // 8. 4 States of G
    if (q.includes('літер g') || q.includes('букв g') || q.includes('стани g') || q.includes('ég')) {
      return `🎭 **4 стани літери G в ісландській мові:**

1. **На початку перед a, o, u ➔ глухий [k]:**
• **Gata** [ˈkaːta] (вулиця).
2. **На початку перед e, i, y, æ ➔ м'який піднебінний [c] (як «кь»):**
• **Gefa** [ˈcɛːva] (давати).
3. **Між голосними всередині слова ➔ дзвінкий велярний фрикатив [ɣ]:**
• **Saga** [ˈsaːɣa] (історія/сага).
4. **У кінці слова після голосного ➔ глухий фрикатив [x] (як «х»):**
• **Ég** [jɛːx] (я), **Dag** [taːx] (день).`;
    }

    // 9. Twin Rule: Y vs I and Ý vs Í
    if (q.includes('ufsilon') || (q.includes('y') && q.includes('i')) || q.includes('близнюк')) {
      return `👯 **«Закон близнюків» (Y vs I та Ý vs Í):**

В сучасній ісландській мові:
1. **Літери I та Y вимовляються АБСОЛЮТНО ОДНАКОВО:**
• **I** [ɪ] та **Y** [ɪ] — короткий звук між «и» та «і» (як в англ. *bit*).
• Приклад: **Is** [ɪːs] та **Yfir** [ˈɪːvɪr] починаються з однакового голосного [ɪ]!
• **Різниця лише в назві літер:** **I** називається просто «і», а **Y** називається **«Уфсілон і» (Ufsilon y)**!

2. **Літери Í та Ý теж вимовляються ОДНАКОВО:**
• **Í** [iː] та **Ý** [iː] — довгий чистий звук «і» (як в англ. *see*).
• Приклад: **Ís** [iːs] (лід) та **Ýta** [ˈiːta] (штовхати).
• **Різниця в назві:** **Í** — «і з акутом», **Ý** — «Уфсілон ý».

💡 **Чому так сталось?** В давньоісландській мові літери Y/Ý вимовлялися з округленими губами [y] (як німецьке *ü*). Протягом століть губи розслабилися, і звук злився з [ɪ]/[iː], проте на письмі ісландці зберегли історичну орфографію саг!`;
    }

    // 10. Labiovelar HV -> [kv]
    if (q.includes('hv') || q.includes('hvað') || q.includes('hvaðan')) {
      return `🌊 **Правило літеросполучення HV ➔ [kv]:**

В ісландській мові поєднання літер **HV** на початку слів завжди читається як **[kv]** (глухий [k] + дзвінкий [v]):
• **Hvað** [kʰvaːð] — що?
• **Hvaðan** [ˈkʰvaːðan] — звідки?
• **Hver** [kʰvɛːr] — хто?
• **Hvísl** [kʰvisl] — шепіт.

⚠️ **Не вимовляйте як англійське «wh» чи «hv»!** Чіткий звук **[кв]**!`;
    }

    // 11. V2 Syntax Rule
    if (q.includes('v2') || q.includes('синтаксис') || q.includes('порядок слів') || q.includes('друге дієслово')) {
      return `⚡ **Закон другого дієслова (V2-reglan):**

В ісландській мові у будь-якому стверджувальному розповідному реченні **особове (змінюване) дієслово СТРОГО стоїть на ДРУГІЙ позиції**:
1. **Якщо на 1-му місці підмет:**
• *Ég [1] **heiti** [2] Jón [3].* (Мене звати Йон).
2. **Якщо на 1-му місці обставина часу або місця (інверсія):**
• *Nú [1] **tala** [2] ég [3] íslensku [4].* (Зараз розмовляю я ісландською).
• *Hér [1] **er** [2] kaffi [3].* (Тут є кава).

⚠️ Підмет переходить на 3-тю позицію, але дієслово завжди лишається на 2-й!`;
    }

    // 12. Cases Overview (NF, ÞF, ÞGF, EF)
    if (q.includes('відмінк') || q.includes('пада') || q.includes('þf') || q.includes('þgf') || q.includes('ef') || q.includes('nf')) {
      return `🏛️ **4 Відмінки ісландської мови (Föllin fjögur):**

В ісландській мові є 4 відмінки:
1. 🟢 **Nefnifall (NF) — Називний:** відповідає на питання *хто? що?* (суб'єкт речення). Приклад: *hestur* (кінь).
2. 🔵 **Þolfall (ÞF) — Знахідний:** прямий додаток (*кого? що?*). Приклад: *ég sé hest*.
3. 🟡 **Þágufall (ÞGF) — Давальний:** непрямий додаток (*кому? чому? / звідки? з ким?*). Приклад: *frá Íslandi*, *ég gef hesti*.
4. 🔴 **Eignarfall (EF) — Родовий:** приналежність (*кого? чого? чий?*). Приклад: *bók Jóns* (книга Йона).

У додатку система **BÍN Рентген** підсвічує ці відмінки відповідними фірмовими кольорами: 🟢 🔵 🟡 🔴.`;
    }

    // 13. Anchor words from Module 0
    const anchorMap = {
      'afi': 'Afi [ˈaːvɪ] — дідусь (ч.р., Karlkyn). Приклад: «Afi er heima» (Дідусь вдома).',
      'bók': 'Bók [pouːk] — книга (ж.р., Kvenkyn). Приклад: «Þetta er bók» (Це книга).',
      'dagur': 'Dagur [ˈtaːɣʏr] — день (ч.р.). Приклад: «Góðan dag» (Доброго дня).',
      'epli': 'Epli [ˈɛhplɪ] — яблуко (с.р., Hvorugkyn). Зверніть увагу: преаспірація [hp] перед p!',
      'faðir': 'Faðir [ˈfaːðɪr] — батько (ч.р.).',
      'gata': 'Gata [ˈkaːta] — вулиця (ж.р.). Приклад: «Hér er gata».',
      'hús': 'Hús [huːs] — будинок (с.р.). Приклад: «Þetta er stórt hús».',
      'ís': 'Ís [iːs] — лід / морозиво (ч.р.). Довгий голосний [iː].',
      'kaffi': 'Kaffi [ˈkʰafːɪ] — кава (с.р.). Приклад: «Ég vil kaffi» (Я хочу кави).',
      'land': 'Land [lant] — країна / земля (с.р.). Приклад: «Ísland er fagurt land».',
      'matur': 'Matur [ˈmaːtʏr] — їжа (ч.р.).',
      'nafn': 'Nafn [napn] — ім\'я (с.р.). Літеросполучення fn вимовляється як [pn]!',
      'sól': 'Sól [souːl] — сонце (ж.р.). Дифтонг ó [ou].'
    };
    for (const [key, expl] of Object.entries(anchorMap)) {
      if (q.includes(key)) {
        return `📖 **Словникова картка Árnastofnun:**\n\n${expl}`;
      }
    }

    // Default pedagogical response
    return `💡 **Лінгвістична довідка Árnastofnun:**

Ваше запитання стосується ісландської граматики або фонетики. Ось ключові орієнтири:
1. **Наголос:** завжди на першому складі слова.
2. **Дієслово:** стоїть на 2-й позиції у розповідному реченні (V2-правило).
3. **Особи:** «Ég heiti» (я звуся) vs «Þú heitir» (ти звешся).

Уточніть, будь ласка, яке конкретне слово, звук чи граматичну конструкцію ви хочете детально розібрати!`;
  }
}
