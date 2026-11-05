/**
 * UnifiedExamsCenter.js - Центр атестації та іспитів платформи
 * Об'єднує всі 17 іспитів (Уроки 0–7 A1, Уроки A2.1–A2.8, B1.1) в єдиний зрозумілий інтерфейс.
 */

import { gameState } from './GameState.js?v=7.1';

export class UnifiedExamsCenter {
  constructor(container, onLaunchExam) {
    this.container = container;
    this.onLaunchExam = onLaunchExam; // callback(chapterId)
  }

  render() {
    const s = gameState.state;

    const examsList = [
      // Рівень A1
      { id: 'modull_0', level: 'A1.0', title: 'Атестація Уроку 0: Stafrófið & Framburður', desc: 'Фонетична система, довгі/короткі голосні, подвійні приголосні та пастки вимови.', questions: 15, xp: 150, color: 'cyan', icon: '🔤' },
      { id: 'kafli_1', level: 'A1.1', title: 'Іспит Уроку 1: Hver ert þú? (Знайомство)', desc: 'Дієслово að vera, порядок слів, країни, національності, професії та займенники.', questions: 15, xp: 150, color: 'cyan', icon: '🌟' },
      { id: 'drops_lab', level: 'A1.1', title: 'Іспит Уроку 2: Í kaffihúsinu (Кав\'ярня)', desc: 'Знахідний відмінок (Þolfall 🟢), замовлення страв, рахунок та ввічливі звороти.', questions: 15, xp: 150, color: 'emerald', icon: '☕' },
      { id: 'modull_3', level: 'A1.2', title: 'Іспит Уроку 3: Dagleg rútína & V2-reglan', desc: 'Годинник, розпорядок дня, закон другої позиції дієслова (V2) та інверсія.', questions: 15, xp: 150, color: 'amber', icon: '⏰' },
      { id: 'kafli_4', level: 'A1.2', title: 'Іспит Уроку 4: Föt, litir & lýsingarorð', desc: 'Одяг, кольори, сильна відміна прикметників та правила 3 шарів одягу.', questions: 15, xp: 150, color: 'purple', icon: '👗' },
      { id: 'kafli_5', level: 'A1.2', title: 'Іспит Уроку 5: Fjölskyldan, líkaminn & heilsa', desc: 'Безособові конструкції болю (Mér er illt í...), частини тіла, Heilsuvera та 1700.', questions: 15, xp: 150, color: 'rose', icon: '🩺' },
      { id: 'kafli_6', level: 'A1.3', title: 'Іспит Уроку 6: Matur, eldamennska & verslun', desc: 'Супермаркет, гастрономія, рецепти, вага, упаковки та ресторанний етикет.', questions: 15, xp: 150, color: 'amber', icon: '🍽️' },
      { id: 'kafli_7', level: 'A1.3', title: 'Випускний Іспит A1: Tómstundir, sund & veður', desc: 'Культура басейнів Sundlaug, прогноз погоди Vedur.is та повна сертифікація A1.', questions: 15, xp: 250, color: 'cyan', icon: '🏆', isFinal: true },

      // Рівень A2
      { id: 'a2_k1', level: 'A2.1', title: 'Іспит A2.1: Húsnæði & Leigusamningur', desc: 'Оренда житла, огляд квартири, договір leigusamningur та субсидія HMS.', questions: 15, xp: 180, color: 'indigo', icon: '🏠' },
      { id: 'a2_k2', level: 'A2.2', title: 'Іспит A2.2: Vinnumarkaðurinn & Efling', desc: 'Трудові права, профспілка Efling, розрахунок зарплати launaseðill та фонди.', questions: 15, xp: 180, color: 'emerald', icon: '💼' },
      { id: 'a2_k3', level: 'A2.3', title: 'Іспит A2.3: Strætó, Klapp & Samgöngur', desc: 'Громадський транспорт, автобуси, поїздки островом, автостанція BSÍ.', questions: 15, xp: 180, color: 'amber', icon: '🚌' },
      { id: 'a2_k4', level: 'A2.4', title: 'Іспит A2.4: Heilsugæslan & Apótek', desc: 'Поліклініка, електронні рецепти за кенніталою, Lyfjagátt та ліки.', questions: 15, xp: 180, color: 'rose', icon: '🏥' },
      { id: 'a2_k5', level: 'A2.5', title: 'Іспит A2.5: Leikskóli, Grunnskóli & Mentor', desc: 'Дитячий садок, школа, портал Mentor.is, спортивний грант Frístund.', questions: 15, xp: 180, color: 'teal', icon: '🎒' },
      { id: 'a2_k6', level: 'A2.6', title: 'Іспит A2.6: Vaktavinna & Miðmynd', desc: 'Позмінний графік, відпочинок за законом, стан дієслів на -st (að þvo sér).', questions: 15, xp: 180, color: 'purple', icon: '🔄' },
      { id: 'a2_k7', level: 'A2.7', title: 'Іспит A2.7: Bankareikningur & Kröfur', desc: 'Банки, електронний підпис Auðkenni, оплата рахунків та фінанси.', questions: 15, xp: 180, color: 'emerald', icon: '💳' },
      { id: 'a2_k8', level: 'A2.8', title: 'Випускний Іспит A2: Samfélagið & Lokapróf', desc: 'Ісландське суспільство, податки у Skatturinn та підсумкова атестація A2.', questions: 15, xp: 300, color: 'amber', icon: '🏆', isFinal: true },

      // Рівень B1
      { id: 'b1_k1', level: 'B1.1', title: 'Іспит B1.1: Atvinnulíf & Ríkisborgararéttur', desc: 'Трудове життя, дебати, умовний спосіб та симуляція іспиту на громадянство.', questions: 15, xp: 200, color: 'orange', icon: '📊' }
    ];

    this.container.innerHTML = `
      <div class="space-y-4 font-sans">
        
        <!-- Верхній банер екзаменаційного центру -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900/80 to-amber-950/40 border border-cyan-500/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-400 text-black uppercase tracking-wider">
                📝 АТЕСТАЦІЙНИЙ ЦЕНТР
              </span>
              <span class="text-xs font-mono text-amber-300 font-bold">
                17 інтерактивних іспитів
              </span>
            </div>
            <h2 class="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>🎓</span><span>Офіційне тестування за стандартами Mímir & Menntamálastofnun</span>
            </h2>
            <p class="text-xs text-slate-300 max-w-2xl">
              Кожен іспит містить 15 структурованих питань з аудіосупроводом та моментальним аналізом помилок.
              Успішне складання додає XP до вашого прогресу та відкриває наступні модулі.
            </p>
          </div>

          <div class="flex items-center gap-2 font-mono text-xs">
            <span class="px-3 py-1.5 rounded-xl bg-black/60 border border-slate-700 text-cyan-300 font-bold">
              ⚡ Макс. досвід: 3 150 XP
            </span>
          </div>
        </div>

        <!-- Сітка всіх іспитів -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          ${examsList.map(ex => {
            const borderClass = ex.isFinal ? 'border-amber-500/60 ring-1 ring-amber-500/40 shadow-lg' : 'border-slate-800 hover:border-slate-700';
            return `
              <div class="p-4 rounded-xl bg-cyber-card border ${borderClass} space-y-3 flex flex-col justify-between transition-all">
                <div class="space-y-2">
                  <div class="flex items-center justify-between font-mono text-[11px]">
                    <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-bold text-cyan-300">
                      ${ex.level}
                    </span>
                    <span class="text-amber-400 font-bold">+${ex.xp} XP</span>
                  </div>

                  <h3 class="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>${ex.icon}</span><span>${ex.title}</span>
                  </h3>

                  <p class="text-xs text-slate-400 leading-relaxed font-sans">
                    ${ex.desc}
                  </p>
                </div>

                <button onclick="window.__EXAMS_CENTER__.launch('${ex.id}')" class="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 text-cyan-200 border border-cyan-500/40 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer">
                  <span>📝</span><span>Скласти іспит (15 питань) →</span>
                </button>
              </div>
            `;
          }).join('')}
        </div>

      </div>
    `;

    window.__EXAMS_CENTER__ = this;
  }

  launch(chapterId) {
    if (this.onLaunchExam) {
      this.onLaunchExam(chapterId);
    }
  }
}
