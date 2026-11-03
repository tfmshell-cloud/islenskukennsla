/**
 * m0_study_guide_data.js - Навчальний посібник Модуля 0: Stafrófið & Framburður
 * 
 * Базується на офіційних джерелах Árnastofnun, BÍN, Icelandic Online, Bara tala, Ylhýra та Elon.io.
 * Згенеровано та структуровано за матеріалами NotebookLM Studio.
 */

export const M0_STUDY_GUIDE_DATA = {
  title: "Навчальний посібник Модуля 0",
  icelandicTitle: "Stafrófið & Framburður",
  subtitle: "Абетка, фонетика та правила читання",
  sourcesNote: "Підготовлено на основі досліджень Árnastofnun, BÍN, Icelandic Online, Bara tala, Ylhýra та Elon.io",
  
  sections: [
    {
      id: "sec1_alphabet",
      number: 1,
      icon: "📖",
      title: "Загальний огляд ісландської графіки",
      summary: "32 літери, відсутність c/q/w/z, реформа 1973 року та якісна функція знака акута (´).",
      contentHtml: `
        <div class="space-y-4">
          <p class="text-sm leading-relaxed">
            Ісландська абетка побудована на латинській основі й налічує <strong class="text-cyan-400 font-bold">32 літери</strong>:
          </p>

          <!-- 32 Letters Interactive Grid -->
          <div class="p-3.5 rounded-xl bg-black/40 border border-cyan-500/30 flex flex-wrap gap-1.5 sm:gap-2 justify-center font-mono font-bold text-xs sm:text-sm">
            ${['A', 'Á', 'B', 'D', 'Ð', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'P', 'R', 'S', 'T', 'U', 'Ú', 'V', 'X', 'Y', 'Ý', 'Þ', 'Æ', 'Ö'].map(l => {
              const isSpecial = ['Ð', 'Þ', 'Æ', 'Ö'].includes(l);
              const isAccent = ['Á', 'É', 'Í', 'Ó', 'Ú', 'Ý'].includes(l);
              const colorCls = isSpecial 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                : isAccent 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-800/60 text-slate-200 border-slate-700';
              return `<span class="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg border ${colorCls} shadow-sm">${l}</span>`;
            }).join('')}
          </div>

          <!-- Feature 1: Absence of C, Q, W, Z -->
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 class="font-bold text-sm text-cyan-300 flex items-center gap-2">
              <span>🚫</span> 1. Повна відсутність літер c, q, w, z
            </h4>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              У питомих ісландських словах літери <code class="text-rose-400 font-mono font-bold">c, q, w, z</code> повністю відсутні. Вони трапляються лише у незасвоєних запозиченнях та іноземних власних назвах.
            </p>
            <div class="p-2.5 rounded-lg bg-black/50 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
              <strong class="text-amber-300">🏛️ Офіційна реформа 1973 року:</strong> Літера <code>z</code> була офіційно вилучена з ісландської орфографії й замінена на <code>s</code>. Наприклад: застарілі форми <em>íslenzka</em> та <em>verzlun</em> у сучасній мові пишуться виключно як <strong class="text-emerald-300">íslenska</strong> та <strong class="text-emerald-300">verslun</strong>.
            </div>
          </div>

          <!-- Feature 2: Acute Accent Function -->
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <h4 class="font-bold text-sm text-cyan-300 flex items-center gap-2">
              <span>⚡</span> 2. Статус літер із діакритичним знаком акута (´)
            </h4>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              У багатьох європейських мовах знак акута позначає динамічний наголос. <strong class="text-rose-400">В ісландській мові це НЕ ТАК!</strong>
            </p>
            <div class="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-xs sm:text-sm text-cyan-200 space-y-1">
              <div>🎯 <strong>Залізний закон наголосу:</strong> Головний наголос в ісландській мові <span class="underline decoration-cyan-400 font-bold">завжди фіксований на першому складі слова</span>!</div>
              <div>✨ <strong>Функція гострого акута (´):</strong> Це якісний маркер окремої фонеми — перетворює чистий монофтонг на дифтонг або напружений довгий звук.</div>
            </div>

            <!-- Phoneme Differentiation Table -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div class="p-2.5 rounded-lg bg-black/40 border border-slate-800 space-y-1">
                <span class="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Чисті монофтонги (без акута):</span>
                <ul class="space-y-0.5 text-slate-300 font-mono">
                  <li><strong>a</strong> [a] — відкритий звук [а]</li>
                  <li><strong>e</strong> [ɛ] — короткий звук [е]</li>
                  <li><strong>o</strong> [ɔ] — відкритий огублений [о]</li>
                </ul>
              </div>
              <div class="p-2.5 rounded-lg bg-black/40 border border-cyan-500/30 space-y-1">
                <span class="text-cyan-400 font-bold uppercase tracking-wider text-[10px]">Дифтонги та довгі звуки (з акутом):</span>
                <ul class="space-y-0.5 text-cyan-200 font-mono">
                  <li><strong>á</strong> [au] — дифтонг «ау» (<em>á</em> — річка)</li>
                  <li><strong>é</strong> [jɛ] — дифтонг «є» (<em>ég</em> — я)</li>
                  <li><strong>ó</strong> [ou] — огублений дифтонг «оу» (<em>ókeypis</em> — безкоштовно)</li>
                  <li><strong>ú</strong> [u:] — довге напружене «у» (<em>úr</em> — годинник)</li>
                </ul>
              </div>
            </div>

            <p class="text-xs text-slate-400 italic pt-1">
              * Самостійними літерами є також передній дифтонг <strong>Æ æ [ai]</strong> (<em>ævisaga</em> — біографія) та огублений монофтонг <strong>Ö ö [œ]</strong> (<em>öld</em> — століття).
            </p>
          </div>
        </div>
      `
    },
    {
      id: "sec2_twins",
      number: 2,
      icon: "👯",
      title: "Закон близнюків: вимова I / Y та Í / Ý",
      summary: "Графічні пари I/Y та Í/Ý вимовляються 100% однаково. Історичний i-переглас та етимологія.",
      contentHtml: `
        <div class="space-y-4">
          <p class="text-sm text-slate-300 leading-relaxed">
            В акустичному просторі сучасної ісландської мови діє фундаментальний орфоепічний <strong class="text-cyan-300">«Закон близнюків»</strong>: графічні пари <strong class="text-amber-300 font-mono">I / Y</strong> та <strong class="text-emerald-300 font-mono">Í / Ý</strong> вимовляються абсолютно однаково.
          </p>

          <!-- Twin Law Banner Visual -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">КОРОТКА ПАРА</span>
                <span class="font-mono text-base font-bold text-amber-400">[ɪ]</span>
              </div>
              <div class="text-base sm:text-lg font-black font-mono text-white">
                I [ɪ] <span class="text-amber-400">===</span> Y [ɪ]
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                Короткий, ненапружений звук <strong class="text-amber-300">[ɪ]</strong>, близький до ненаголошеного українського «и» у слові <em>«зима»</em>.
              </p>
              <div class="pt-1 flex flex-wrap gap-2 text-xs font-mono">
                <span class="px-2 py-1 rounded bg-black/50 border border-slate-700 text-slate-200">
                  <strong>is</strong> [ɪs] <em>(є)</em>
                </span>
                <span class="px-2 py-1 rounded bg-black/50 border border-slate-700 text-slate-200">
                  <strong>yfir</strong> ['ɪvɪr] <em>(над)</em>
                </span>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">ДОВГА ПАРА</span>
                <span class="font-mono text-base font-bold text-emerald-400">[iː]</span>
              </div>
              <div class="text-base sm:text-lg font-black font-mono text-white">
                Í [iː] <span class="text-emerald-400">===</span> Ý [iː]
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                Напружений довгий звук <strong class="text-emerald-300">[iː]</strong>, який вимовляється у <em>широкій посмішці</em> з вузькою щілиною губ.
              </p>
              <div class="pt-1 flex flex-wrap gap-2 text-xs font-mono">
                <span class="px-2 py-1 rounded bg-black/50 border border-slate-700 text-slate-200">
                  <strong>ís</strong> [iːs] <em>(лід / морозиво)</em>
                </span>
                <span class="px-2 py-1 rounded bg-black/50 border border-slate-700 text-slate-200">
                  <strong>ýta</strong> ['iːta] <em>(штовхати)</em>
                </span>
              </div>
            </div>
          </div>

          <!-- Historical Explanation (i-hljóðvarp) -->
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 class="font-bold text-sm text-cyan-300 flex items-center gap-2">
              <span>📜</span> Чому на письмі зберігаються різні літери?
            </h4>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              У давньоісландській мові літери <strong>Y</strong> та <strong>Ý</strong> позначали огублені передні звуки <em>[y]</em> та <em>[y:]</em> (подібні до німецького <em>ü</em> чи французького <em>u</em>). Вони виникли внаслідок <strong>i-перегласу (i-hljóðvarp)</strong> — звукової мутації, коли кореневі <em>u / ú</em> під впливом <em>i / j</em> у наступному складі переходили в <em>y / ý</em>:
            </p>
            <div class="flex items-center gap-2 flex-wrap text-xs font-mono py-1">
              <span class="px-2.5 py-1 rounded bg-black/60 border border-slate-700 text-cyan-300">sonur ➔ synir (сини)</span>
              <span class="px-2.5 py-1 rounded bg-black/60 border border-slate-700 text-cyan-300">fullur ➔ fylla (наповнювати)</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">
              З часом огублення зникло, і звучання повністю збіглося з <em>I / Í</em>. Збереження <em>Y / Ý</em> на письмі в сучасній мові є <strong class="text-amber-300">суто етимологічним та морфологічним</strong>: воно допомагає миттєво впізнавати спорідненість слів у межах однієї лексичної родини.
            </p>
          </div>
        </div>
      `
    },
    {
      id: "sec3_traps",
      number: 3,
      icon: "⚡",
      title: "Топ-5 фонетичних пасток ісландської мови",
      summary: "Преаспірація, боковий вибух ll/nn, правила міжзубних Þ/Ð, 4 стани літери G та кластери hv/fn/fl.",
      contentHtml: `
        <div class="space-y-4">
          <p class="text-sm text-slate-300 leading-relaxed">
            Для україномовного студента ісландська фонетика містить <strong class="text-rose-400 font-bold">5 специфічних акустичних пасток</strong>, що докорінно відрізняються від слов'янської артикуляції:
          </p>

          <!-- Trap 1: Preaspiration -->
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h4 class="font-bold text-sm text-cyan-300 flex items-center gap-2">
                <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">1</span>
                Преаспірація (Aðblástur) [h] перед pp, tt, kk
              </h4>
            </div>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Подвоєні глухі проривні <strong>pp, tt, kk</strong> не подовжуються в часі (як у слові «знання»). Замість цього перед ними виникає <strong class="text-cyan-300">глухий гортанний видих [h]</strong>.
            </p>
            <div class="p-2.5 rounded-lg bg-black/50 border border-cyan-500/30 text-xs text-slate-200 space-y-1">
              <div>🎯 <strong>Правило артикуляції:</strong> коротка мікропауза після голосного + випуск повітря через відкриту голосову щілину перед вибухом приголосного.</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1 font-mono text-xs">
                <div class="p-1.5 rounded bg-black/60 border border-slate-700"><strong>takk</strong> [tʰahk] <em>(дякую)</em></div>
                <div class="p-1.5 rounded bg-black/60 border border-slate-700"><strong>stopp</strong> [stɔhp] <em>(зупинка)</em></div>
                <div class="p-1.5 rounded bg-black/60 border border-slate-700"><strong>bátt</strong> [pauht] <em>(погано)</em></div>
              </div>
            </div>
          </div>

          <!-- Trap 2: Lateral explosion ll & nn -->
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 class="font-bold text-sm text-cyan-300 flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">2</span>
              Боковий вибух ll [tl] та носова асиміляція nn [tn]
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div class="p-2.5 rounded-lg bg-black/40 border border-amber-500/30 space-y-1">
                <span class="text-amber-400 font-bold uppercase tracking-wider text-[10px]">Боковий вибух ll ➔ [tl]:</span>
                <p class="text-slate-300">
                  Подвоєне <code>ll</code> майже завжди розмикається через боковий вибух <strong>[tl]</strong> (кінчик язика впирається в альвеоли).
                </p>
                <div class="font-mono text-amber-200">
                  <div>• <strong>fjall</strong> [fjatl] <em>(гора)</em></div>
                  <div>• <strong>Sæll</strong> [saitl] <em>(привіт чол.)</em></div>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-black/40 border border-emerald-500/30 space-y-1">
                <span class="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Асиміляція nn ➔ [tn] vs [nn]:</span>
                <p class="text-slate-300">
                  <code>nn</code> звучить як <strong>[tn]</strong> <span class="underline">ТІЛЬКИ після дифтонгів та довгих голосних</span>!
                </p>
                <div class="font-mono text-emerald-200">
                  <div>• <strong>steinn</strong> [steitn] <em>(камінь)</em></div>
                  <div>• <strong>vinna</strong> ['vɪnna] <em>(після короткого: [nn])</em></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Trap 3: Thorn vs Eth -->
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 class="font-bold text-sm text-cyan-300 flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">3</span>
              Правило міжзубних літер: Þorn (Þ þ) vs Eð (Ð ð)
            </h4>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr class="border-b border-slate-700 text-slate-400">
                    <th class="p-2">Параметр</th>
                    <th class="p-2 text-cyan-300 font-mono font-bold">Þorn (Þ þ) [θ]</th>
                    <th class="p-2 text-amber-300 font-mono font-bold">Eð (Ð ð) [ð]</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td class="p-2 font-bold text-slate-400">Акустика</td>
                    <td class="p-2 text-cyan-200">Глухий міжзубний (англ. <em>th</em> у <em>think</em>)</td>
                    <td class="p-2 text-amber-200">Дзвінкий міжзубний (англ. <em>th</em> у <em>this</em>)</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-slate-400">Позиція в слові</td>
                    <td class="p-2 text-cyan-200 font-bold">ВИКЛЮЧНО на початку слів або складів</td>
                    <td class="p-2 text-amber-200 font-bold">НІКОЛИ не стоїть на початку слів</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-slate-400">Локалізація</td>
                    <td class="p-2">Жодне ісландське слово не закінчується на Þ</td>
                    <td class="p-2">Стоїть у середині або наприкінці слів</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-slate-400">Приклади</td>
                    <td class="p-2 font-mono text-cyan-300"><strong>þak</strong> [θak] <em>(дах)</em></td>
                    <td class="p-2 font-mono text-amber-300"><strong>maður</strong> ['maðʏr], <strong>blað</strong> [plaːð]</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Trap 4: Four Guises of G -->
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 class="font-bold text-sm text-cyan-300 flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">4</span>
              Чотири позиційні стани літери G (Fjögur gervi G)
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div class="p-2 rounded bg-black/50 border border-slate-800 space-y-1">
                <span class="text-cyan-300 font-bold font-mono">1. Початок перед a, o, u, á, ó, ú:</span>
                <p class="text-slate-300">Глухий задньоязиковий <strong>[k]</strong> без придиху: <strong>gata</strong> ['kata] <em>(вулиця)</em>.</p>
              </div>
              <div class="p-2 rounded bg-black/50 border border-slate-800 space-y-1">
                <span class="text-cyan-300 font-bold font-mono">2. Початок перед e, i, í, y, ý, æ, ö:</span>
                <p class="text-slate-300">М'який піднебінний <strong>[c]</strong> <em>(кь)</em>: <strong>gefa</strong> ['cɛːva] <em>(давати)</em>.</p>
              </div>
              <div class="p-2 rounded bg-black/50 border border-slate-800 space-y-1">
                <span class="text-cyan-300 font-bold font-mono">3. У середині між голосними:</span>
                <p class="text-slate-300">М'який гортанний фрикатив <strong>[ɣ]</strong> <em>(м'яке «г»)</em>: <strong>saga</strong> ['saːɣa] <em>(сага)</em>.</p>
              </div>
              <div class="p-2 rounded bg-black/50 border border-slate-800 space-y-1">
                <span class="text-cyan-300 font-bold font-mono">4. Наприкінці після голосного:</span>
                <p class="text-slate-300">Велярний фрикатив <strong>[x]</strong> або <strong>[j]</strong>: <strong>ég</strong> [jɛːx] <em>(я)</em>.</p>
              </div>
            </div>
          </div>

          <!-- Trap 5: Labiovelars & F-clusters -->
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 class="font-bold text-sm text-cyan-300 flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">5</span>
              Лабіовелярні та F-кластери: hv [kv], fn [pn], fl [pl]
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div class="p-2 rounded bg-black/50 border border-slate-800">
                <strong class="text-amber-300 font-mono">hv- ➔ [kv]:</strong> сполучення <code>hv-</code> на початку слів завжди вимовляється як <strong>[kv]</strong>: <strong>hvað</strong> [kvað] <em>(що / як)</em>.
              </div>
              <div class="p-2 rounded bg-black/50 border border-slate-800">
                <strong class="text-emerald-300 font-mono">fn ➔ [pn] / fl ➔ [pl]:</strong> буква <code>f</code> перед <code>n, l</code> мутує в глухий вибуховий <strong>[p]</strong>: <strong>nafn</strong> [napn] <em>(ім'я)</em>, <strong>Keflavík</strong> ['cʰɛpla.viːk].
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "sec4_etiquette",
      number: 4,
      icon: "🤝",
      title: "Соціолінгвістичний етикет вітань",
      summary: "Граматичне узгодження вітання за родом/числом та егалітарне суспільство без «Ви» (Þú).",
      contentHtml: `
        <div class="space-y-4">
          <p class="text-sm text-slate-300 leading-relaxed">
            В ісландській мові привітання підпорядковане суворому граматичному принципу: <strong class="text-amber-300">воно узгоджується зі статтю та кількістю тих осіб, до яких звертаються</strong>, а не того, хто говорить!
          </p>

          <!-- Greetings Matrix Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div class="p-3.5 rounded-xl bg-black/50 border border-cyan-500/30 space-y-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Звертання до 1 особи:</span>
              <div class="space-y-1 font-mono text-xs">
                <div class="p-2 rounded bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
                  <span>До 1 чоловіка: <strong class="text-white">Sæll!</strong></span>
                  <span class="text-cyan-300 font-bold">[saitl]</span>
                </div>
                <div class="p-2 rounded bg-rose-950/30 border border-rose-500/30 flex items-center justify-between">
                  <span>До 1 жінки: <strong class="text-white">Sæl!</strong></span>
                  <span class="text-rose-300 font-bold">[sail]</span>
                </div>
              </div>
              <p class="text-[11px] text-slate-400 italic">
                * Зверніть увагу: у формі <em>Sæll</em> звучить вибух <code>[tl]</code>, а у <em>Sæl</em> — чисте м'яке <code>[l]</code>.
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-black/50 border border-amber-500/30 space-y-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Звертання до групи людей:</span>
              <div class="space-y-1 font-mono text-xs">
                <div class="p-1.5 rounded bg-black/60 border border-slate-700 flex items-center justify-between">
                  <span>Група чоловіків:</span>
                  <span class="text-amber-300 font-bold">Sælir! ['sailɪr]</span>
                </div>
                <div class="p-1.5 rounded bg-black/60 border border-slate-700 flex items-center justify-between">
                  <span>Група жінок:</span>
                  <span class="text-amber-300 font-bold">Sælar! ['sailar]</span>
                </div>
                <div class="p-1.5 rounded bg-black/60 border border-slate-700 flex items-center justify-between">
                  <span>Змішана група:</span>
                  <span class="text-emerald-300 font-bold">Sæl! / Sælir og sælar!</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Egalitarian Culture & Universal Thu -->
          <div class="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/30 to-black/60 border border-emerald-500/30 space-y-2">
            <h4 class="font-bold text-sm text-emerald-300 flex items-center gap-2">
              <span>🌍</span> Рівність та універсальне звертання на «ти» (Þú)
            </h4>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              В ісландському суспільстві <strong class="text-emerald-300">повністю відсутня форма ввічливого звертання на «Ви»</strong> у повсякденному житті. 
            </p>
            <p class="text-xs text-slate-300 leading-relaxed">
              До будь-якої людини (незалежно від віку, посади чи суспільного статусу — від Президента Ісландії та університетського професора до касира чи незнайомця на вулиці) звертаються виключно на <strong class="text-cyan-300 font-mono">þú</strong> <em>(ти)</em> і називають за <strong>першим ім'ям</strong>.
            </p>
          </div>
        </div>
      `
    },
    {
      id: "sec5_words_matrix",
      number: 5,
      icon: "📊",
      title: "Зведена матриця 15 опорних слів Модуля 0",
      summary: "Синтаксичне правило V2 (дієслово на 2-му місці) та повна таблиця 15 слів з аудіо-вимовою.",
      contentHtml: `
        <div class="space-y-4">
          <!-- V2 Rule Explanation -->
          <div class="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
            <h4 class="font-bold text-sm text-cyan-300 flex items-center gap-2">
              <span>📐</span> Синтаксичний закон V2 (Verb-Second Word Order)
            </h4>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
              В ісландському розповідному реченні діє суворе синтаксичне правило: <strong class="text-amber-300">відмінюване дієслово ЗАВЖДИ займає 2-ге місце</strong> у реченні!
            </p>
            <p class="text-xs text-slate-300 leading-relaxed">
              Якщо на 1-ше місце виноситься обставина часу або місця (наприклад, <em>«Í dag...»</em> — сьогодні), підмет переходить на 3-тє місце (відбувається <strong>інверсія</strong>):
            </p>
            <div class="p-2 rounded bg-black/60 font-mono text-xs text-cyan-200">
              <span class="text-slate-400">[1: Обставина]</span> <strong class="text-white">Í dag</strong> + 
              <span class="text-amber-300">[2: Дієслово V2]</span> <strong class="text-amber-300">býr</strong> + 
              <span class="text-cyan-300">[3: Підмет]</span> <strong class="text-cyan-300">afi</strong> + í Reykjavík.
            </div>
          </div>

          <!-- 15 Anchor Words Master Table -->
          <div class="overflow-x-auto rounded-xl border border-slate-800">
            <table class="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr class="bg-black/60 border-b border-slate-700 text-slate-400 font-mono text-[11px]">
                  <th class="p-2.5">#</th>
                  <th class="p-2.5">Слово</th>
                  <th class="p-2.5">Рід</th>
                  <th class="p-2.5">IPA</th>
                  <th class="p-2.5">Переклад</th>
                  <th class="p-2.5">Приклад у синтаксисі V2</th>
                  <th class="p-2.5 text-center">Аудіо</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/80 text-slate-300" id="study-guide-words-tbody">
                <!-- Dynamically populated or rendered rows -->
              </tbody>
            </table>
          </div>
        </div>
      `
    }
  ],

  // Full 15 Anchor Words with Audio Keys and V2 Sentences
  anchorWords: [
    {
      num: 1,
      word: "afi",
      gender: "m.",
      genderName: "Karlkyn (ч.р.)",
      ipa: "['avɪ]",
      uk: "дідусь",
      sentenceV2: "Í dag býr afi í Reykjavík.",
      sentenceTrans: "Сьогодні живе [V2] дідусь у Рейк'явіку.",
      audioKey: "afi"
    },
    {
      num: 2,
      word: "á",
      gender: "f.",
      genderName: "Kvenkyn (ж.р.)",
      ipa: "[auː]",
      uk: "річка",
      sentenceV2: "Þarna rennur stór á.",
      sentenceTrans: "Там протікає [V2] велика річка.",
      audioKey: "a"
    },
    {
      num: 3,
      word: "bók",
      gender: "f.",
      genderName: "Kvenkyn (ж.р.)",
      ipa: "[pouk]",
      uk: "книга",
      sentenceV2: "Í kvöld les ég góða bók.",
      sentenceTrans: "Сьогодні ввечері читаю [V2] я хорошу книгу.",
      audioKey: "bok"
    },
    {
      num: 4,
      word: "dagur",
      gender: "m.",
      genderName: "Karlkyn (ч.р.)",
      ipa: "['takʏr]",
      uk: "день",
      sentenceV2: "Í dag er fallegur dagur.",
      sentenceTrans: "Сьогодні є [V2] гарний день.",
      audioKey: "dagur"
    },
    {
      num: 5,
      word: "maður",
      gender: "m.",
      genderName: "Karlkyn (ч.р.)",
      ipa: "['maðʏr]",
      uk: "чоловік / людина",
      sentenceV2: "Núna talar þessi maður íslensku.",
      sentenceTrans: "Зараз розмовляє [V2] цей чоловік ісландською.",
      audioKey: "madur"
    },
    {
      num: 6,
      word: "epli",
      gender: "n.",
      genderName: "Hvorugkyn (с.р.)",
      ipa: "['ɛplɪ]",
      uk: "яблуко",
      sentenceV2: "Á morgnana borðar ég epli.",
      sentenceTrans: "Уранці їм [V2] я яблуко.",
      audioKey: "epli"
    },
    {
      num: 7,
      word: "faðir",
      gender: "m.",
      genderName: "Karlkyn (ч.р.)",
      ipa: "['favɪr]",
      uk: "батько",
      sentenceV2: "Hér vinnur faðir minn.",
      sentenceTrans: "Тут працює [V2] мій батько.",
      audioKey: "fadir"
    },
    {
      num: 8,
      word: "gata",
      gender: "f.",
      genderName: "Kvenkyn (ж.р.)",
      ipa: "['kata]",
      uk: "вулиця",
      sentenceV2: "Þar er löng gata.",
      sentenceTrans: "Там є [V2] довга вулиця.",
      audioKey: "gata"
    },
    {
      num: 9,
      word: "hús",
      gender: "n.",
      genderName: "Hvorugkyn (с.р.)",
      ipa: "[huːs]",
      uk: "будинок",
      sentenceV2: "Í dag sé ég stórt hús.",
      sentenceTrans: "Сьогодні бачу [V2] я великий будинок.",
      audioKey: "hus"
    },
    {
      num: 10,
      word: "ís",
      gender: "m.",
      genderName: "Karlkyn (ч.р.)",
      ipa: "[iːs]",
      uk: "морозиво / лід",
      sentenceV2: "Á kvöldin borðar hún kaldan ís.",
      sentenceTrans: "Увечері їсть [V2] вона холодне морозиво.",
      audioKey: "is"
    },
    {
      num: 11,
      word: "kaffi",
      gender: "m.",
      genderName: "Karlkyn (ч.р.)",
      ipa: "['kʰaffɪ]",
      uk: "кава",
      sentenceV2: "Á morgnana drekk ég heitt kaffi.",
      sentenceTrans: "Уранці п'ю [V2] я гарячу каву.",
      audioKey: "kaffi"
    },
    {
      num: 12,
      word: "land",
      gender: "n.",
      genderName: "Hvorugkyn (с.р.)",
      ipa: "[lant]",
      uk: "країна / земля",
      sentenceV2: "Ísland er fallegt land.",
      sentenceTrans: "Ісландія є [V2] красива країна.",
      audioKey: "land"
    },
    {
      num: 13,
      word: "matur",
      gender: "m.",
      genderName: "Karlkyn (ч.р.)",
      ipa: "['matʏr]",
      uk: "їжа",
      sentenceV2: "Núna er maturinn til.",
      sentenceTrans: "Зараз є [V2] їжа готова.",
      audioKey: "matur"
    },
    {
      num: 14,
      word: "nafn",
      gender: "n.",
      genderName: "Hvorugkyn (с.р.)",
      ipa: "[napn]",
      uk: "ім'я",
      sentenceV2: "Á kortinu stendur nafn mitt.",
      sentenceTrans: "На картці стоїть [V2] моє ім'я.",
      audioKey: "nafn"
    },
    {
      num: 15,
      word: "sól",
      gender: "f.",
      genderName: "Kvenkyn (ж.р.)",
      ipa: "[soul]",
      uk: "сонце",
      sentenceV2: "Í dag skín sól í Reykjavík.",
      sentenceTrans: "Сьогодні світить [V2] сонце у Рейк'явіку.",
      audioKey: "sol"
    }
  ],

  // Mind Map Data Structure (Based on NotebookLM Mind Map)
  mindMap: {
    title: "Модуль 0: Ісландська абетка, фонетика та правила читання",
    imageUri: "assets/m0_mind_map_notebooklm.png",
    branches: [
      {
        id: "vowels",
        name: "Голосні (Raddstafir) та безпечні правила наголосу",
        color: "emerald",
        icon: "🟢",
        badge: "7 монофтонгів • 7 дифтонгів",
        subBranches: [
          {
            name: "Залізні правила наголосу (Fixed 1st Syllable)",
            items: [
              { text: "Наголос ЗАВЖДИ на першому складі слова" },
              { text: "Знак акута (´): якісна переміна голосного, а не динамічний наголос" }
            ]
          },
          {
            name: "Прості короткі монофтонги",
            items: [
              { text: "Ненапружений відкритий A [a] (afi)", audio: "afi" },
              { text: "Короткий відкритий E [ɛ] (epli)", audio: "epli" },
              { text: "Ненапружене відкрите I [ɪ] (is)", audio: "is" },
              { text: "Відкритий огублений O [ɔ] (orð)" },
              { text: "Передній огублений U [ʏ] (ugla)" },
              { text: "Коротке ідентичне Y [ɪ] (yfir)" },
              { text: "Огублений передній Ö [œ] (öld)" }
            ]
          },
          {
            name: "Дифтонги та довгі звуки",
            items: [
              { text: "Дифтонг Á [au] (á — річка)", audio: "a" },
              { text: "Йотований É [jɛ] (ég — я)" },
              { text: "Напружений довгий Í [iː] (ís — лід)", audio: "is" },
              { text: "Огублений Ó [ou] (ókeypis)" },
              { text: "Довге напружене Ú [uː] (úr)" },
              { text: "Ідентичний довгий Ý [iː] (ýta — штовхати)", audio: "yta" },
              { text: "Передній дифтонг Æ [ai] (bær)" }
            ]
          },
          {
            name: "Закон близнюків (I/Y vs Í/Ý)",
            items: [
              { text: "Короткі близнюки: I [ɪ] === Y [ɪ] (коротке «и»)", audio: "is" },
              { text: "Довгі близнюки: Í [iː] === Ý [iː] (довге «і» у посмішці)", audio: "is" },
              { text: "Історичний i-hljóðvarp (переглас u/ú ➔ y/ý)" }
            ]
          }
        ]
      },
      {
        id: "traps",
        name: "Топ-5 фонетичних пасток",
        color: "rose",
        icon: "🔴",
        badge: "Акустичні вибухи & позиції",
        subBranches: [
          {
            name: "Преаспірація [h] (Aðblástur)",
            items: [
              { text: "Подвоєні проривні pp, tt, kk ➔ видих [h] перед розмиканням" },
              { text: "Еталонні слова: takk [tʰahk], stopp [stɔhp]", audio: "takk" }
            ]
          },
          {
            name: "Боковий та носовий вибух (ll, nn)",
            items: [
              { text: "Подвоєне ll ➔ [tl] (fjall [fjatl], Sæll [saitl])", audio: "saell" },
              { text: "Подвоєне nn ➔ [tn] ТІЛЬКИ після дифтонгів (steinn)", audio: "steinn" },
              { text: "Подвоєне nn ➔ [nn] після коротких (vinna, penni)" }
            ]
          },
          {
            name: "Міжзубні приголосні: Þorn vs Eð",
            items: [
              { text: "Буква Þ (Þorn): Виключно НА ПОЧАТКУ слів [θ] (þak)", audio: "thak" },
              { text: "Буква Ð (Eð): Виключно в СЕРЕДИНІ або КІНЦІ [ð] (maður)", audio: "madur" }
            ]
          },
          {
            name: "Чотири позиційні стани G",
            items: [
              { text: "Стан 1: На початку перед задніми [k] (gata)", audio: "gata" },
              { text: "Стан 2: На початку перед передніми [c] (gefa)" },
              { text: "Стан 3: Між голосними в середині [ɣ] (saga)" },
              { text: "Стан 4: В кінці після голосного [x] (ég)" }
            ]
          },
          {
            name: "Особливі буквосполучення",
            items: [
              { text: "Буквосполучення hv- на початку: завжди [kv] (hvað)", audio: "hvad" },
              { text: "Буквосполучення fn, fl: читаються [pn], [pl] (nafn)", audio: "nafn" }
            ]
          }
        ]
      },
      {
        id: "etiquette",
        name: "Соціолінгвістичний етикет",
        color: "amber",
        icon: "🟣",
        badge: "Рід, число та Þú",
        subBranches: [
          {
            name: "Привітання за родами та кількістю",
            items: [
              { text: "Звертання до 1 чоловіка: Sæll! [saitl] (вибух [tl])", audio: "saell" },
              { text: "Звертання до 1 жінки: Sæl! [sail] (м'яке [l])" },
              { text: "Звертання до групи людей: Sælir! (чол.), Sælar! (жін.), Sæl! (змішана)" }
            ]
          },
          {
            name: "Демократичне звертання",
            items: [
              { text: "Немає форми «Ви» у повсякденній ісландській мові" },
              { text: "Звертання виключно на «ти» (þú) та за першим ім'ям до кожного" }
            ]
          }
        ]
      },
      {
        id: "syntax",
        name: "Синтаксис та структура слів",
        color: "cyan",
        icon: "🟡",
        badge: "V2-порядок & 15 слів",
        subBranches: [
          {
            name: "Закон V2 (Verb-Second Word Order)",
            items: [
              { text: "Відмінюване дієслово ЗАВЖДИ займає 2-ге місце у реченні" },
              { text: "Інверсія: при винесенні обставини на 1-ше місце підмет іде на 3-тє місце" }
            ]
          },
          {
            name: "Опорні слова модуля",
            items: [
              { text: "15 опорних слів (afi, á, bók, dagur, maður, epli, faðir, gata, hús, ís, kaffi, land, matur, nafn, sól)" }
            ]
          }
        ]
      }
    ]
  },

  // Audio Overview (NotebookLM Podcast Deep Dive)
  podcast: {
    id: "m0_audio_overview",
    title: "Прихована логіка ісландської вимови",
    subtitle: "Аудіоогляд (NotebookLM Deep Dive Podcast)",
    audioUri: "audio/podcasts/m0_prykhovana_logika_vymovy.m4a",
    durationSec: 1042,
    durationText: "17:22",
    fileSizeText: "8.0 МБ (Оптимізовано зі 33 МБ)",
    description: "Поглиблений подкаст-діалог про фундаментальні принципи ісландської фонетики: від наголосу на 1-му складі та 'Закону близнюків' до розгадки феномену преаспірації [h] у слові 'takk' та бокового вибуху 'll' [tl].",
    chapters: [
      { timeSec: 0, timeText: "00:00", title: "Вступ та особливості 32 літер ісландської абетки" },
      { timeSec: 195, timeText: "03:15", title: "Залізний закон наголосу на 1-му складі та знак акута (´)" },
      { timeSec: 400, timeText: "06:40", title: "Закон близнюків: феномен I/Y [ɪ] та Í/Ý [iː]" },
      { timeSec: 560, timeText: "09:20", title: "Топ-пастки: преаспірація в «takk» та боковий вибух «ll»" },
      { timeSec: 770, timeText: "12:50", title: "Чотири стани літери G та міжзубні Þ vs Ð" },
      { timeSec: 910, timeText: "15:10", title: "Соціолінгвістичний етикет: формула вітань та культура Þú" }
    ]
  }
};
