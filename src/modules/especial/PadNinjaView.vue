<script setup>
import { ref } from 'vue'
import { usePageEnv } from '../../composables/usePageEnv'
import { useModuleScript } from '../../composables/useModuleScript'

const rootRef = ref(null)

usePageEnv({
  title: 'PAD Ninja · Guía viva de Power Automate',
  htmlClass: ['mod-pad-ninja'],
  htmlAttrs: { 'data-theme': 'dark' },
})

useModuleScript(rootRef, ({ root, on, onCleanup }) => {
  const scope = root || document
  const docRoot = document.documentElement

  /* ---------- Back to top ---------- */
  const backTop = scope.querySelector('#backTop')
  let scrollT
  on(
    window,
    'scroll',
    () => {
      clearTimeout(scrollT)
      scrollT = setTimeout(() => {
        if (backTop) backTop.classList.toggle('show', window.scrollY > 480)
      }, 60)
    },
    { passive: true },
  )
  onCleanup(() => clearTimeout(scrollT))

  /* ---------- Mobile drawer ---------- */
  const side = scope.querySelector('#side')
  const overlay = scope.querySelector('#overlay')
  const navToggle = scope.querySelector('#navToggle')
  function openNav(o) {
    if (side) side.classList.toggle('open', o)
    if (overlay) overlay.classList.toggle('show', o)
    if (navToggle) navToggle.setAttribute('aria-expanded', String(o))
  }
  if (navToggle && side) {
    on(navToggle, 'click', () => openNav(!side.classList.contains('open')))
  }
  if (overlay) {
    on(overlay, 'click', () => openNav(false))
  }
  if (backTop) {
    on(backTop, 'click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      openNav(false)
    })
  }

  /* ---------- Enlace "Más detalle" de vigencia: scroll robusto ---------- */
  const vigLink = scope.querySelector('a[href="#foot-vigencia"]')
  if (vigLink) {
    on(vigLink, 'click', (e) => {
      e.preventDefault()
      const target = scope.querySelector('#foot-vigencia')
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
      }
    })
  }

  /* ---------- Theme toggle (en memoria) ---------- */
  const themeBtn = scope.querySelector('#themeToggle')
  const moon = scope.querySelector('#iconMoon')
  const sun = scope.querySelector('#iconSun')
  if (themeBtn) {
    on(themeBtn, 'click', () => {
      const light = docRoot.getAttribute('data-theme') === 'light'
      docRoot.setAttribute('data-theme', light ? 'dark' : 'light')
      themeBtn.setAttribute('aria-pressed', String(!light))
      if (moon) moon.style.display = light ? '' : 'none'
      if (sun) sun.style.display = light ? 'none' : ''
    })
  }

  /* ---------- FR -> ES term toggles ---------- */
  scope.querySelectorAll('.fr-term').forEach((chip) => {
    on(chip, 'click', () => chip.classList.toggle('shown'))
  })
  scope.querySelectorAll('.fr-toggle-all').forEach((btn) => {
    on(btn, 'click', () => {
      const secScope = btn.closest('.section-body') || scope
      const isOn = !btn.classList.contains('on')
      btn.classList.toggle('on', isOn)
      btn.textContent = isOn ? '🇫🇷 Ocultar traducciones' : '🇫🇷 Traducir todo el francés'
      secScope.querySelectorAll('.fr-term').forEach((chip) => chip.classList.toggle('shown', isOn))
    })
  })

  /* ---------- Acordeón de BLOQUE completo ---------- */
  const blockHeads = Array.prototype.slice.call(scope.querySelectorAll('.bg-head.clickable'))
  blockHeads.forEach((head) => {
    on(head, 'click', () => {
      const group = head.closest('.block-group')
      if (!group) return
      const open = !group.classList.toggle('collapsed')
      head.setAttribute('aria-expanded', String(open))
    })
  })
  function expandBlockOf(el) {
    const group = el.closest('.block-group')
    if (group && group.classList.contains('collapsed')) {
      group.classList.remove('collapsed')
      const h = group.querySelector('.bg-head.clickable')
      if (h) h.setAttribute('aria-expanded', 'true')
    }
  }

  /* ---------- Accordions ---------- */
  const sections = Array.prototype.slice.call(scope.querySelectorAll('.doc-section'))
  sections.forEach((sec) => {
    const body = sec.querySelector('.section-body')
    sec._defaultOpen = sec.classList.contains('open')
    sec._origHTML = body ? body.innerHTML : ''
    const head = sec.querySelector('.section-head')
    if (head) {
      on(head, 'click', () => {
        const open = sec.classList.toggle('open')
        head.setAttribute('aria-expanded', String(open))
      })
    }
  })

  /* nav block expand/collapse (only the active block has sublist) */
  Array.prototype.slice.call(scope.querySelectorAll('.nav-block')).forEach((nb) => {
    const head = nb.querySelector('.nb-head')
    const sub = nb.querySelector('.nb-sub')
    if (!head) return
    if (!sub) {
      on(head, 'click', () => {
        const rm = scope.querySelector('#roadmap')
        if (rm) rm.scrollIntoView()
        openNav(false)
      })
      return
    }
    on(head, 'click', () => {
      const exp = head.getAttribute('aria-expanded') === 'true'
      head.setAttribute('aria-expanded', String(!exp))
      sub.style.display = exp ? 'none' : ''
    })
  })

  /* close drawer when a sub-link is tapped (mobile); also auto-expand the target block */
  Array.prototype.slice.call(scope.querySelectorAll('.nb-sub a')).forEach((a) => {
    on(a, 'click', () => {
      openNav(false)
      const href = a.getAttribute('href') || ''
      const id = href.slice(1)
      const target = id ? scope.querySelector('#' + id) : null
      if (target) expandBlockOf(target)
    })
  })

  /* ---------- Search ---------- */
  const input = scope.querySelector('#search')
  const clearBtn = scope.querySelector('#clearSearch')
  const groups = Array.prototype.slice.call(scope.querySelectorAll('.block-group'))
  const noRes = scope.querySelector('#noResults')
  const nrTerm = scope.querySelector('#nrTerm')

  function strip(s) {
    return s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  function highlight(rootEl, q) {
    const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const reTest = new RegExp(esc, 'i')
    const reAll = new RegExp('(' + esc + ')', 'gi')
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT
        if (n.parentElement && n.parentElement.closest('script,style,mark'))
          return NodeFilter.FILTER_REJECT
        return reTest.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
      },
    })
    const nodes = []
    let n
    while ((n = walker.nextNode())) nodes.push(n)
    nodes.forEach((node) => {
      const span = document.createElement('span')
      span.innerHTML = node.nodeValue.replace(reAll, '<mark>$1</mark>')
      node.parentNode.replaceChild(span, node)
    })
  }

  function resetAll() {
    sections.forEach((sec) => {
      const body = sec.querySelector('.section-body')
      if (body) body.innerHTML = sec._origHTML
      sec.style.display = ''
      sec.classList.toggle('open', sec._defaultOpen)
      const head = sec.querySelector('.section-head')
      if (head) head.setAttribute('aria-expanded', String(sec._defaultOpen))
    })
    groups.forEach((g) => {
      g.style.display = ''
      g.classList.remove('collapsed')
    })
    blockHeads.forEach((h) => h.setAttribute('aria-expanded', 'true'))
    if (noRes) noRes.style.display = 'none'
  }

  function runSearch() {
    if (!input) return
    const raw = input.value.trim()
    if (clearBtn) clearBtn.style.display = raw ? 'block' : 'none'
    if (!raw) {
      resetAll()
      return
    }
    const q = strip(raw)
    let anyMatch = false

    sections.forEach((sec) => {
      const body = sec.querySelector('.section-body')
      if (body) body.innerHTML = sec._origHTML
      const hay = strip(sec.textContent || '')
      if (hay.indexOf(q) !== -1) {
        sec.style.display = ''
        sec.classList.add('open')
        const head = sec.querySelector('.section-head')
        if (head) head.setAttribute('aria-expanded', 'true')
        expandBlockOf(sec)
        if (body) highlight(body, raw)
        anyMatch = true
      } else {
        sec.style.display = 'none'
      }
    })

    groups.forEach((g) => {
      const secs = Array.prototype.slice.call(g.querySelectorAll('.doc-section'))
      const visibleSecs = secs.filter((s) => s.style.display !== 'none').length
      const isRoadmap = g.id === 'roadmap'
      const roadHit = isRoadmap && strip(g.textContent || '').indexOf(q) !== -1
      if (isRoadmap) {
        g.style.display = roadHit ? '' : 'none'
        if (roadHit) anyMatch = true
      } else {
        g.style.display = visibleSecs ? '' : 'none'
      }
    })

    if (noRes) noRes.style.display = anyMatch ? 'none' : ''
    if (!anyMatch && nrTerm) nrTerm.textContent = raw
  }

  let searchTimer
  if (input) {
    on(input, 'input', () => {
      clearTimeout(searchTimer)
      searchTimer = setTimeout(runSearch, 90)
    })
    on(input, 'keydown', (e) => {
      if (e.key === 'Escape') {
        input.value = ''
        runSearch()
      }
    })
  }
  if (clearBtn && input) {
    on(clearBtn, 'click', () => {
      input.value = ''
      runSearch()
      input.focus()
    })
  }
  onCleanup(() => clearTimeout(searchTimer))

  /* ---------- Scrollspy (resalta sección activa en el índice) ---------- */
  const subLinks = Array.prototype.slice.call(scope.querySelectorAll('.nb-sub a'))
  const map = {}
  subLinks.forEach((a) => {
    const href = a.getAttribute('href') || ''
    map[href.slice(1)] = a
  })
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          const a = map[en.target.id]
          if (!a) return
          if (en.isIntersecting) {
            subLinks.forEach((x) => x.classList.remove('active'))
            a.classList.add('active')
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )
    scope.querySelectorAll('.block-group .doc-section').forEach((s) => spy.observe(s))
    onCleanup(() => spy.disconnect())
  }
})
</script>

<template>
  <div ref="rootRef">
<a href="#main" class="skip">Saltar al contenido</a>

<header class="bar" id="top">
  <button class="icon-btn" id="navToggle" aria-label="Abrir navegación" aria-expanded="false">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
  </button>
  <div class="brand">
    <span class="glyph">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5z"/></svg>
    </span>
    <span style="display:flex;flex-direction:column;line-height:1.1">
      <b>PAD&nbsp;Ninja</b>
      <span>Guía viva de Power Automate · desktop + nube</span>
    </span>
  </div>
  <span class="ver-pill" title="Versión 22 · guía completa, 22 bloques">v22</span>
  <div class="bar-spacer"></div>
  <div class="search-wrap">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
    <input id="search" type="search" placeholder="Buscar en la guía… (acciones, conceptos, atajos)" autocomplete="off" aria-label="Buscar en la guía">
    <button class="clear-x" id="clearSearch" aria-label="Limpiar búsqueda">✕</button>
  </div>
  <button class="icon-btn" id="themeToggle" aria-label="Cambiar tema claro/oscuro" aria-pressed="false">
    <svg id="iconMoon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
    <svg id="iconSun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="display:none"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
  </button>
</header>

<div class="source-strip" id="sourceStrip">
  <div class="ss-row">
    <span class="ss-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5z"/></svg></span>
    <span><b>Fuente oficial raíz de esta guía:</b> <a href="https://learn.microsoft.com/es-es/power-automate/" target="_blank" rel="noopener">learn.microsoft.com/es-es/power-automate</a> — el manual completo de Microsoft. Cada sección enlaza además a su página exacta de origen.</span>
  </div>
  <div class="ss-row">
    <span class="ss-icon ss-icon--warn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z"/></svg>
    </span>
    <span class="ss-vigencia">La IA en Power Automate cambia rápido — ante dudas, confía en el botón "Fuente oficial" de cada sección. <a href="#foot-vigencia" style="color:var(--warn); border-bottom:1px solid currentColor">Más detalle ↓</a></span>
  </div>
</div>

<div class="overlay" id="overlay"></div>

<div class="layout">
  <!-- ============ NAV ============ -->
  <nav class="side" id="side" aria-label="Índice de la guía">
    <p class="nav-label">Índice · 22 bloques</p>

    <div class="nav-block nav-zero" data-target="block-0">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">00</span> Antes de empezar</button>
      <ul class="nb-sub">
        <li><a href="#s001">0.1 · Automatización vs RPA vs IA: el panorama</a></li>
        <li><a href="#s002">0.2 · Proceso, bot, atendido/desatendido: el vocabulario</a></li>
        <li><a href="#s003">0.3 · Qué es un flujograma, y qué es un "proyecto" aquí</a></li>
        <li><a href="#s004">0.4 · Kanban y testing/QA: cómo se organiza este trabajo</a></li>
        <li><a href="#s005">0.5 · IA vs IA generativa</a></li>
      </ul>
    </div>

    <div class="nav-block" data-target="block-1">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">01</span> Cimientos</button>
      <ul class="nb-sub">
        <li><a href="#s11">1.1 · Qué es Power Automate Desktop</a></li>
        <li><a href="#s12">1.2 · Desktop flows vs Cloud flows</a></li>
        <li><a href="#s13">1.3 · Requisitos del sistema</a></li>
        <li><a href="#s14">1.4 · Qué instalas: MSI vs Store</a></li>
        <li><a href="#s15">1.5 · Cuentas, entornos y planes</a></li>
        <li><a href="#s16">1.6 · La Consola</a></li>
        <li><a href="#s17">1.7 · El Diseñador (anatomía)</a></li>
        <li><a href="#s18">1.8 · Atajos y gestos esenciales</a></li>
        <li><a href="#s19">1.9 · Límites y avisos de entrada</a></li>
      </ul>
    </div>

    <div class="nav-block" data-target="block-2">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">02</span> Tu primer flujo</button>
      <ul class="nb-sub">
        <li><a href="#s21">2.1 · Anatomía de un flujo</a></li>
        <li><a href="#s22">2.2 · Crea y ejecuta tu primer flujo</a></li>
        <li><a href="#s23">2.3 · Ejecutar y observar</a></li>
        <li><a href="#s24">2.4 · El Grabador (recorder)</a></li>
        <li><a href="#s25">2.5 · Grabar vs construir a mano</a></li>
      </ul>
    </div>
    <div class="nav-block" data-target="block-3">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">03</span> Variables y tipos</button>
      <ul class="nb-sub">
        <li><a href="#s31">3.1 · Qué es una variable y la notación %</a></li>
        <li><a href="#s32">3.2 · Tipos de datos</a></li>
        <li><a href="#s33">3.3 · Operar con variables</a></li>
        <li><a href="#s34">3.4 · El panel de Variables</a></li>
        <li><a href="#s35">3.5 · Entrada/salida y valores sensibles</a></li>
      </ul>
    </div>
    <div class="nav-block" data-target="block-4">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">04</span> Lógica y control</button>
      <ul class="nb-sub">
        <li><a href="#s41">4.1 · Condicionales (If/Else)</a></li>
        <li><a href="#s42">4.2 · Switch / Case</a></li>
        <li><a href="#s43">4.3 · Bucles (Loop, For each)</a></li>
        <li><a href="#s44">4.4 · Subflows, Wait, Go to, Region</a></li>
      </ul>
    </div>

    <p class="nav-label" style="margin-top:16px">Construir</p>
    <div class="nav-block" data-target="block-5">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">05</span> UI escritorio</button>
      <ul class="nb-sub">
        <li><a href="#s51">5.1 · Tres formas de localizar un elemento</a></li>
        <li><a href="#s52">5.2 · UI elements y selectores: anatomía</a></li>
        <li><a href="#s53">5.3 · Capturar y editar selectores (UIA vs MSAA)</a></li>
        <li><a href="#s54">5.4 · El repositorio de UI elements</a></li>
        <li><a href="#s55">5.5 · Clics, teclado y posición relativa</a></li>
        <li><a href="#s56">5.6 · Selectores robustos: por qué se rompe un flujo</a></li>
      </ul>
    </div>
    <div class="nav-block" data-target="block-6">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">06</span> Automatización web</button>
      <ul class="nb-sub">
        <li><a href="#s61">6.1 · Lanzar y conectar con el navegador</a></li>
        <li><a href="#s62">6.2 · Rellenar formularios web</a></li>
        <li><a href="#s63">6.3 · Extraer datos de una página</a></li>
        <li><a href="#s64">6.4 · Esperas y sincronización</a></li>
      </ul>
    </div>
    <div class="nav-block" data-target="block-7">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">07</span> Excel, archivos y datos</button>
      <ul class="nb-sub">
        <li><a href="#s71">7.1 · Excel: instancia, lanzar y adjuntar</a></li>
        <li><a href="#s72">7.2 · Leer y escribir en Excel</a></li>
        <li><a href="#s73">7.3 · Archivos: localizar, copiar, mover</a></li>
        <li><a href="#s74">7.4 · Carpetas: explorar y organizar</a></li>
      </ul>
    </div>
    <div class="nav-block" data-target="block-8">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">08</span> Datos, scripting y técnicas</button>
      <ul class="nb-sub">
        <li><a href="#s81">8.1 · Scripting: PowerShell, Python, VBScript, JS, C#</a></li>
        <li><a href="#s82">8.2 · Texto y expresiones regulares</a></li>
        <li><a href="#s83">8.3 · JSON y objetos</a></li>
        <li><a href="#s84">8.4 · HTTP/REST y descargas</a></li>
      </ul>
    </div>
    <div class="nav-block" data-target="block-9">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">09</span> Email y sistema</button>
      <ul class="nb-sub">
        <li><a href="#s91">9.1 · Tres formas de mandar correo: cuál usar</a></li>
        <li><a href="#s92">9.2 · Outlook de escritorio: el aviso que tienes que saber</a></li>
        <li><a href="#s93">9.3 · Email genérico (IMAP/SMTP) y Exchange</a></li>
        <li><a href="#s94">9.4 · Sistema: procesos, servicios, CMD</a></li>
      </ul>
    </div>

    <p class="nav-label" style="margin-top:16px">Integraciones</p>
    <div class="nav-block" data-target="block-10">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">10</span> SAP (ECC on-prem)</button>
      <ul class="nb-sub">
        <li><a href="#s101">10.1 · R/3 = ECC: aclaración de variantes</a></li>
        <li><a href="#s102">10.2 · Activar el scripting (lado servidor y cliente)</a></li>
        <li><a href="#s103">10.3 · Conectar y navegar por transacción</a></li>
        <li><a href="#s104">10.4 · IDs en vez de texto: el francés deja de importar</a></li>
        <li><a href="#s105">10.5 · Grabador de SAP y glosario FR→ES</a></li>
        <li><a href="#s106">10.6 · Módulos: FI, CO, MM, SD…</a></li>
        <li><a href="#s107">10.7 · FB60 vs MIRO: guía paso a paso</a></li>
      </ul>
    </div>

    <p class="nav-label" style="margin-top:16px">Calidad</p>
    <div class="nav-block" data-target="block-11">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">11</span> Errores + Debugging</button>
      <ul class="nb-sub">
        <li><a href="#s111">11.1 · Error por acción: On error</a></li>
        <li><a href="#s112">11.2 · On block error: tu Try/Catch</a></li>
        <li><a href="#s113">11.3 · Get last error y Throw custom error</a></li>
        <li><a href="#s114">11.4 · Breakpoints y stepping mode</a></li>
        <li><a href="#s115">11.5 · Logging: Log message y dónde queda</a></li>
        <li><a href="#s116">11.6 · Patrón de robustez recomendado</a></li>
      </ul>
    </div>
    <div class="nav-block" data-target="block-12">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">12</span> Testing y casos de prueba</button>
      <ul class="nb-sub">
        <li><a href="#s121">12.1 · El módulo Testing: qué es y qué no es</a></li>
        <li><a href="#s122">12.2 · Crear un caso de prueba (Given/When/Then)</a></li>
        <li><a href="#s123">12.3 · Test a desktop flow y Test a subflow</a></li>
        <li><a href="#s124">12.4 · Assert: validar el resultado</a></li>
      </ul>
    </div>

    <p class="nav-label" style="margin-top:16px">Operar y escalar</p>
    <div class="nav-block" data-target="block-13">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">13</span> Máquinas y desatendido</button>
      <ul class="nb-sub">
        <li><a href="#s131">13.1 · Attended vs unattended: la diferencia real</a></li>
        <li><a href="#s132">13.2 · Registrar una máquina (y el error típico de VM)</a></li>
        <li><a href="#s133">13.3 · Licencia: la Process license</a></li>
        <li><a href="#s134">13.4 · Qué pasa de verdad en una sesión desatendida</a></li>
        <li><a href="#s135">13.5 · Programar: Windows Task Scheduler, no hay nativo</a></li>
      </ul>
    </div>
    <div class="nav-block" data-target="block-14">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">14</span> Orquestación + interfaz</button>
      <ul class="nb-sub">
        <li><a href="#s141">14.1 · Disparar desde la nube: tipos de trigger</a></li>
        <li><a href="#s142">14.2 · Power Apps como interfaz de autoservicio</a></li>
        <li><a href="#s143">14.3 · Multi-máquina: grupos, colas y prioridad</a></li>
        <li><a href="#s144">14.4 · Work queues: colas de trabajo centralizadas</a></li>
        <li><a href="#s145">14.5 · Office Scripts: qué refresca de verdad y qué no</a></li>
        <li><a href="#s146">14.6 · Licencias atendido/desatendido y patrón multi-depto</a></li>
      </ul>
    </div>
    <div class="nav-block nav-alm" data-target="block-15">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">15</span> ALM (dev→prod, owners)</button>
      <ul class="nb-sub">
        <li><a href="#s151">15.1 · Solutions: el mecanismo de ALM en Power Platform</a></li>
        <li><a href="#s152">15.2 · Exportar/importar un desktop flow (no es directo)</a></li>
        <li><a href="#s153">15.3 · Managed vs unmanaged: cuál usar</a></li>
        <li><a href="#s154">15.4 · Connection references y environment variables</a></li>
        <li><a href="#s155">15.5 · Migrar a otro PC/cuenta dev, y promover a producción</a></li>
        <li><a href="#s156">15.6 · Versionado y patches</a></li>
        <li><a href="#s157">15.7 · Upgrade vs Stage for Upgrade vs Update</a></li>
        <li><a href="#s158">15.8 · El error de dependencias faltantes</a></li>
        <li><a href="#s159">15.9 · Rollback y el riesgo de flujos huérfanos</a></li>
        <li><a href="#s1510">15.10 · Version control nativo del flujo, y Git integration</a></li>
      </ul>
    </div>
    <div class="nav-block" data-target="block-16">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">16</span> Documentación</button>
      <ul class="nb-sub">
        <li><a href="#s161">16.1 · Documentar sin salir del flujo: Region/comentarios/nombres</a></li>
        <li><a href="#s162">16.2 · Copilot "Summarize actions & subflows"</a></li>
        <li><a href="#s163">16.3 · Repair with Copilot: cuando el self-healing normal falla</a></li>
      </ul>
    </div>

    <p class="nav-label" style="margin-top:16px">Potenciar</p>
    <div class="nav-block" data-target="block-17">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">17</span> Copilot en PAD</button>
      <ul class="nb-sub">
        <li><a href="#s171">17.1 · Crear flujos describiendo la tarea (Natural Language to Flow)</a></li>
        <li><a href="#s172">17.2 · Natural language to code: scripts sin saber programar</a></li>
        <li><a href="#s173">17.3 · Record with Copilot: deprecado, y la alternativa actual</a></li>
        <li><a href="#s174">17.4 · Disponibilidad real por región — y qué ves en tu tenant</a></li>
      </ul>
    </div>
    <div class="nav-block" data-target="block-18">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">18</span> Trucos y productividad</button>
      <ul class="nb-sub">
        <li><a href="#s181">18.1 · La jerarquía de acciones: cuál elegir primero</a></li>
        <li><a href="#s182">18.2 · UIA vs MSAA: el selector correcto para cada app</a></li>
        <li><a href="#s183">18.3 · Repartir la carga entre máquinas, sin saturar nada</a></li>
        <li><a href="#s184">18.4 · Timeouts largos: cuando un flujo tarda más de 24h</a></li>
      </ul>
    </div>

    <p class="nav-label" style="margin-top:16px">Proyectos y apéndice</p>
    <div class="nav-block" data-target="block-19">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">19</span> Proyecto guiado (capstone)</button>
      <ul class="nb-sub">
        <li><a href="#s191">19.1 · El robot completo, de un vistazo</a></li>
        <li><a href="#s192">19.2 · Main: el flujo de principio a fin</a></li>
        <li><a href="#s193">19.3 · El subflow de procesado de una factura</a></li>
        <li><a href="#s194">19.4 · Qué falta para llevarlo a producción de verdad</a></li>
      </ul>
    </div>
    <div class="nav-block" data-target="block-20">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">20</span> Migración UiPath → PAD</button>
      <ul class="nb-sub">
        <li><a href="#s201">20.1 · No hay conversor oficial: el panorama real</a></li>
        <li><a href="#s202">20.2 · Entender UiPath a fondo: Academy, docs, leer el .xaml</a></li>
        <li><a href="#s203">20.3 · Diferencias de fondo que rompen una migración directa</a></li>
        <li><a href="#s204">20.4 · Try/Catch vs On block error: el hueco del Throw/Rethrow</a></li>
        <li><a href="#s205">20.5 · Cómo abordar una migración real, paso a paso</a></li>
      </ul>
    </div>
    <div class="nav-block" data-target="block-21">
      <button class="nb-head" aria-expanded="true"><span class="nb-num">21</span> Construir las interfaces</button>
      <ul class="nb-sub">
        <li><a href="#s211">21.1 · Botón en Power Apps, paso a paso</a></li>
        <li><a href="#s212">21.2 · Tarjeta o comando en Teams, paso a paso</a></li>
        <li><a href="#s213">21.3 · Trigger de SharePoint, paso a paso</a></li>
        <li><a href="#s214">21.4 · Cuál elegir, y montando el patrón multi-departamento completo</a></li>
      </ul>
    </div>

    <p class="nav-label" style="margin-top:18px"><a href="#roadmap" style="color:var(--text-faint)">Ver el plan completo ↓</a></p>
  </nav>

  <!-- ============ MAIN ============ -->
  <main id="main">
    <section class="hero">
      <span class="kicker">De 0 a 100 · Ruta ninja</span>
      <h1>Power Automate Desktop, destilado</h1>
      <p class="lead">Tu guía de consulta: lo esencial de PAD reescrito para aprender desde cero, con el puente <strong>UiPath&nbsp;→&nbsp;PAD</strong> en cada tema y trucos de debugging donde más se sufre. Busca, despliega solo lo que necesites, y cada apartado enlaza a su página oficial.</p>
      <div class="meta-note">
        <span class="dot"></span>
        <p><b>Fiable y trazable, no inventado.</b> Todo el contenido está destilado de la documentación oficial de <b>Microsoft Learn</b> y reescrito — no es una copia. El botón <b>“Fuente oficial”</b> al pie de cada sección lleva a la página exacta para que lo verifiques y profundices. Mantengo los nombres de acciones e interfaz en <b>inglés</b> (como aparecen en el producto y en Learn) con su explicación en español.</p>
      </div>
    </section>

    <!-- ============ BLOQUE 0 ============ -->
    <section class="block-group block-zero" id="block-0">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-0">
        <span class="bg-badge">Bloque 00</span>
        <h2 class="bg-head-title">Antes de empezar</h2>
        <span class="bg-sub">El panorama general — a grosso modo, sin asumir que ya sabes nada de esto</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-0">

      <!-- 0.1 -->
      <article class="doc-section open" id="s001">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">0.1</span><span class="sh-title">Automatización, RPA e IA: tres cosas que no son lo mismo</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Antes de tocar PAD, conviene tener claras tres palabras que la gente mezcla constantemente — no son sinónimos, son <strong>círculos concéntricos</strong>, cada uno dentro del anterior:</p>
          <ul>
            <li><strong>Automatización</strong> — el concepto más amplio: cualquier cosa que haga un ordenador <strong>sin que un humano repita la acción cada vez</strong>. Una fórmula de Excel es automatización. Un email programado es automatización. Un macro es automatización.</li>
            <li><strong>RPA (Robotic Process Automation)</strong> — un <strong>subconjunto específico</strong> de automatización: software que imita lo que haría una persona usando el ratón y el teclado sobre las mismas pantallas que usaría un humano — clics, rellenar formularios, copiar datos — sin necesitar que la aplicación tenga una "puerta trasera" (API) para conectarse. PAD y UiPath son herramientas de RPA. Es la pieza que hace este curso, pero no es "toda la automatización que existe".</li>
            <li><strong>IA (Inteligencia Artificial)</strong> — otro concepto distinto, que puede o no estar presente en RPA. RPA "clásico" sigue <strong>reglas fijas</strong> que tú defines: si la pantalla cambia de forma que no contemplaste, el robot no se entera solo y se rompe. La IA, en cambio, <strong>aprende patrones</strong> a partir de datos — por eso Copilot dentro de PAD (Bloques 16-17) es la parte de <strong>IA</strong> metida dentro de una herramienta de <strong>RPA</strong>, no la misma cosa.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Para que quede claro de una vez</span>
            <p>"Automatizar algo" no significa automáticamente "hacer RPA" — podrías automatizarlo con una API, un script, o una fórmula, sin tocar ninguna pantalla. Y "usar RPA" no significa automáticamente "usar IA" — la mayoría de un flujo de PAD (acciones, bucles, condiciones) es lógica de reglas fijas, sin nada de IA de por medio. Cuando alguien dice "esto está automatizado con IA", vale la pena preguntar qué parte exacta usa IA y cuál es simplemente RPA tradicional con reglas — son cosas distintas y se venden mucho mezcladas.</p>
          </div>
          <a class="source" href="https://www.ibm.com/think/topics/rpa" target="_blank" rel="noopener">Fuente · IBM — Qué es la automatización robótica de procesos (RPA) ↗</a>
        </div>
      </article>

      <!-- 0.2 -->
      <article class="doc-section open" id="s002">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">0.2</span><span class="sh-title">Proceso, bot, atendido/desatendido: el vocabulario de base</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Cuatro palabras que vas a oír todo el rato en este mundo, explicadas a grosso modo y sin dar por hecho que las conoces:</p>
          <ul>
            <li><strong>Proceso</strong> — una secuencia de <strong>pasos concretos y repetibles</strong> que logran un resultado de negocio: "coger las facturas del correo, meterlas en el ERP, archivar el PDF". Un proceso existe <strong>independientemente</strong> de si lo automatizas o no — lo hace una persona hoy, a mano.</li>
            <li><strong>Bot / robot</strong> — el software que <strong>ejecuta</strong> uno o varios procesos automatizados. Importante: <strong>un bot puede tener varios procesos</strong> dentro — el mismo robot desatendido de una máquina podría encargarse del proceso de facturas por la mañana y de un proceso de informes por la tarde, programado en distintos horarios. "Bot" y "proceso" no son sinónimos: el bot es el ejecutor, el proceso es lo que se ejecuta.</li>
            <li><strong>Atendido (attended)</strong> — el robot corre <strong>en el ordenador de una persona, mientras esa persona está delante</strong>, normalmente como ayuda dentro de una tarea más grande que ella sigue controlando. Es un concepto general de RPA, no algo exclusivo de PAD — ya lo viste como feature concreta en el Bloque 13, pero la idea en sí es más amplia que la herramienta.</li>
            <li><strong>Desatendido (unattended)</strong> — el robot corre <strong>solo, sin nadie delante</strong>, normalmente en un horario programado o disparado por un evento, en una máquina dedicada a eso. Es el modo típico para procesos de volumen, como el robot de facturas del Proyecto Hilo.</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Ejemplo con el Proyecto Hilo</span>
            <p>El <strong>proceso</strong> es "procesar el lote de facturas mensual". El <strong>bot</strong> es el desktop flow que construimos a lo largo de la guía. Y ese mismo bot corre en modo <strong>desatendido</strong> en una máquina de IMA, de madrugada, sin que nadie tenga que estar delante de la pantalla viéndolo trabajar.</p>
          </div>
          <a class="source" href="https://www.blueprism.com/guides/robotic-process-automation-rpa/" target="_blank" rel="noopener">Fuente · SS&C Blue Prism — Qué es el software de RPA ↗</a>
        </div>
      </article>

      <!-- 0.3 -->
      <article class="doc-section open" id="s003">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">0.3</span><span class="sh-title">Qué es un flujograma, y qué es un "proyecto" en este contexto</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p><strong>Flujograma (flowchart)</strong> — un dibujo que representa un proceso paso a paso, usando un puñado de símbolos estándar y flechas que marcan el orden. No hace falta saber dibujar bien, solo conocer cuatro formas básicas:</p>
          <ul>
            <li><strong>Óvalo</strong> — inicio o fin del proceso.</li>
            <li><strong>Rectángulo</strong> — un paso, una acción concreta ("rellenar el formulario", "guardar el PDF").</li>
            <li><strong>Rombo (diamante)</strong> — una decisión, con normalmente dos salidas ("¿existe el PDF? Sí / No").</li>
            <li><strong>Flecha</strong> — el orden en que se ejecuta todo, de un símbolo al siguiente.</li>
          </ul>
          <p>Antes de construir cualquier robot de verdad, dibujar el proceso como flujograma —aunque sea en papel— te obliga a pensar en las decisiones y casos raros <strong>antes</strong> de escribir la primera acción en PAD, no a mitad de construcción. Es además una de las herramientas básicas de calidad reconocidas formalmente en gestión de procesos.</p>
          <p><strong>Qué es un "proyecto" aquí</strong> — en este contexto, un proyecto no es solo "el archivo del flujo" — es todo el paquete: el proceso identificado, el flujograma que lo describe, el desarrollo del robot en PAD, las pruebas (Bloque 12), y su paso a producción (Bloque 15). Cuando alguien dice "vamos a meter esto como proyecto", normalmente se refiere a tratarlo con ese ciclo completo, no solo a "hacer el flujo y ya".</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Para el robot de facturas del Proyecto Hilo, el flujograma de cabecera sería así de simple: <em>Inicio → Leer Excel → ¿Quedan filas? → (Sí) Procesar factura → vuelve a "¿Quedan filas?" → (No) Enviar informe → Fin</em>. Ese rombo de "¿Quedan filas?" es exactamente lo que se traduce al <code>For each</code> del Bloque 4 — el flujograma y el flujo real de PAD se corresponden casi línea a línea.</p>
          </div>
          <a class="source" href="https://asq.org/quality-resources/flowchart" target="_blank" rel="noopener">Fuente · ASQ (American Society for Quality) — Qué es un flujograma ↗</a>
        </div>
      </article>

      <!-- 0.4 -->
      <article class="doc-section open" id="s004">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">0.4</span><span class="sh-title">Kanban y testing/QA: cómo se organiza este trabajo en equipo</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Dos piezas de "cómo se trabaja", no de "cómo se construye un robot", pero que vas a encontrarte en cualquier equipo de automatización mínimamente organizado:</p>
          <ul>
            <li><strong>Kanban</strong> — un tablero visual con <strong>columnas</strong> que representan el estado de cada tarea, y <strong>tarjetas</strong> que representan trabajo concreto, moviéndose de izquierda a derecha según avanzan. La versión más simple tiene tres columnas: <strong>To Do</strong> (pendiente), <strong>In Progress</strong> (en marcha), <strong>Done</strong> (terminado) — aunque cada equipo adapta las columnas a su propio flujo real (por ejemplo, añadiendo "En pruebas" o "Esperando aprobación"). Un concepto clave es el <strong>WIP limit</strong> (work-in-progress limit): limitar cuántas tarjetas puede haber a la vez en una columna, para evitar que el equipo empiece veinte cosas a la vez sin terminar ninguna.</li>
            <li><strong>Testing / QA (Quality Assurance)</strong> — la disciplina general de <strong>comprobar que algo funciona como se espera</strong>, antes de que lo use gente de verdad. No es exclusivo de software: existe en manufactura, en procesos administrativos, en cualquier sitio donde un fallo cueste caro. Aplicado a RPA, es la idea de fondo detrás de todo el Bloque 12 (testing nativo de PAD) — antes de soltar un robot a producción, alguien comprueba con casos concretos que hace lo que debería, incluyendo los casos raros (factura sin PDF, campo vacío, etc.).</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Cómo encaja con el Proyecto Hilo</span>
            <p>En un Kanban real de equipo, el robot de facturas pasaría por columnas tipo: <em>Backlog → En desarrollo → En testing (Bloque 12) → Esperando promoción a producción (Bloque 15) → En producción</em>. El flujograma (0.3) se dibuja al principio, en "Backlog"; el testing ocurre justo antes de mover la tarjeta a producción — no es un paso opcional al final, es una columna más del tablero.</p>
          </div>
          <a class="source" href="https://www.atlassian.com/agile/kanban" target="_blank" rel="noopener">Fuente · Atlassian — Qué es Kanban ↗</a>
        </div>
      </article>

      <!-- 0.5 -->
      <article class="doc-section open" id="s005">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">0.5</span><span class="sh-title">IA vs IA generativa: la distinción que falta por hacer del todo</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>En 0.1 viste IA como concepto general, frente a RPA. Aquí toca un paso más: dentro de la propia IA, hay una distinción que se mezcla constantemente y que conviene tener clara, sobre todo porque Copilot (Bloques 16-17) es precisamente del segundo tipo:</p>
          <ul>
            <li><strong>IA "tradicional"</strong> — sistemas entrenados para <strong>analizar, clasificar o predecir</strong> sobre datos ya existentes: detectar si un email es spam, predecir si un cliente se va a dar de baja, reconocer un objeto en una foto. Da una <strong>respuesta dentro de un conjunto cerrado</strong> de posibilidades (sí/no, esta categoría o aquella, este número).</li>
            <li><strong>IA generativa</strong> — un <strong>subconjunto</strong> de la IA, enfocado específicamente en <strong>crear contenido nuevo</strong> (texto, imágenes, código) que no existía antes, a partir de patrones aprendidos de enormes cantidades de datos, normalmente mediante modelos de lenguaje (LLM). ChatGPT, Microsoft Copilot, Gemini son ejemplos de IA generativa.</li>
          </ul>
          <p>La diferencia práctica, resumida: la IA tradicional <strong>analiza y decide</strong> dentro de opciones ya definidas; la IA generativa <strong>produce algo nuevo</strong> que antes no existía como tal.</p>
          <div class="callout callout--proyecto">
            <span class="c-tag">Dónde lo ves en esta guía</span>
            <p>Cuando Copilot te <strong>resume</strong> un subflow en lenguaje natural (Bloque 16.2) o te <strong>genera</strong> código de PowerShell a partir de una descripción (Bloque 17.2), eso es IA <strong>generativa</strong> — está creando texto o código nuevo. Cuando el self-healing del Bloque 5 prueba variaciones de un selector roto, eso es lógica de reglas, sin IA generativa de por medio — y cuando Repair with Copilot (Bloque 16.3) decide cuál de los elementos del árbol de la pantalla es el correcto, ahí sí entra IA de verdad, razonando sobre un conjunto de opciones — un caso intermedio que vale la pena tener en mente.</p>
          </div>
          <a class="source" href="https://www.coursera.org/articles/ai-vs-generative-ai" target="_blank" rel="noopener">Fuente · Coursera — IA vs IA generativa: las diferencias explicadas ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 1 ============ -->
    <section class="block-group" id="block-1">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-1">
        <span class="bg-badge">Bloque 01</span>
        <h2 class="bg-head-title">Cimientos</h2>
        <span class="bg-sub">Qué es, cómo se instala, dónde se trabaja</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-1">

      <!-- 1.1 -->
      <article class="doc-section open" id="s11">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">1.1</span><span class="sh-title">¿Qué es Power Automate Desktop?</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Power Automate Desktop (PAD) es la herramienta de <strong>RPA</strong> (automatización robótica de procesos) de Microsoft para automatizar tareas repetitivas en tu ordenador Windows. Lo que construyes se llama <strong>flujo de escritorio</strong> (<em>desktop flow</em>): una secuencia de <strong>acciones</strong> que un “robot” ejecuta por ti — abrir aplicaciones, rellenar formularios, mover archivos, leer y escribir Excel, extraer datos de páginas web, gestionar correo, etc.</p>
          <p>Funciona tanto con aplicaciones <strong>modernas</strong> (web y escritorio) como <strong>heredadas</strong> (por ejemplo, emuladores de terminal). El robot puede interactuar con la máquina de tres maneras: mediante <strong>elementos de UI</strong> (lo más fiable), mediante <strong>imágenes</strong>, o mediante <strong>coordenadas</strong>. Para crear flujos tienes dos vías: arrastrar acciones predefinidas en el diseñador, o <strong>grabar</strong> tus clics con el grabador (<em>recorder</em>) y dejarlos listos para repetirse.</p>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p>PAD es el equivalente conceptual a <strong>UiPath Studio + el Robot</strong>: el lugar donde diseñas y ejecutas la automatización. Traducción de vocabulario: <code>process / workflow</code> ≈ <strong>desktop flow</strong>; <code>activity</code> ≈ <strong>action</strong>; las <code>activities</code> que arrastras del panel ≈ las <strong>actions</strong> del panel de acciones.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/introduction" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Introducción a los flujos de escritorio ↗</a>
        </div>
      </article>

      <!-- 1.2 -->
      <article class="doc-section open" id="s12">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">1.2</span><span class="sh-title">Desktop flows vs Cloud flows: las dos mitades de Power Automate</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Power Automate tiene dos familias de flujos que conviene no confundir:</p>
          <ul>
            <li><strong>Cloud flows</strong> — viven en la nube. Se disparan por <strong>eventos</strong> (llega un correo, se crea un registro, una hora programada…) y conectan servicios <em>online</em> mediante conectores: Outlook, SharePoint, Teams, Dataverse, etc.</li>
            <li><strong>Desktop flows</strong> (PAD) — viven en <strong>tu máquina</strong>. Manejan la interfaz de aplicaciones locales y la web: justo lo que un servicio en la nube no puede tocar por sí solo.</li>
          </ul>
          <p>La potencia real aparece al <strong>combinarlos</strong>: un cloud flow puede lanzar un desktop flow con la acción <code>Run a flow built with Power Automate for desktop</code>. Para intercambiar datos se usan <strong>variables de entrada</strong> (cloud → desktop) y <strong>variables de salida</strong> (desktop → cloud). Y un desktop flow se ejecuta en uno de dos modos: <strong>attended</strong> (atendido: hay una sesión de usuario, tú delante) o <strong>unattended</strong> (desatendido: corre solo, sin usuario).</p>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p>La orquestación que en UiPath hace <strong>Orchestrator</strong> (lanzar procesos, programarlos, attended vs unattended, colas) aquí se reparte entre <strong>Power Automate cloud</strong> y las <strong>máquinas</strong> que registras. El concepto attended/unattended es el mismo en ambas plataformas.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/trigger-desktop-flows" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Activar flujos de escritorio desde flujos de nube ↗</a>
        </div>
      </article>

      <!-- 1.3 -->
      <article class="doc-section open" id="s13">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">1.3</span><span class="sh-title">Requisitos: qué necesitas antes de instalar</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Antes de instalar, comprueba que tu equipo cumple lo siguiente:</p>
          <ul>
            <li><strong>Cuenta:</strong> permisos de <strong>administrador</strong> para instalar por <strong>MSI</strong>; con la versión de la <strong>Microsoft Store</strong> basta una cuenta estándar de Windows. Además, una cuenta para iniciar sesión (ver 1.5).</li>
            <li><strong>Sistema operativo:</strong> Windows 10 (Home/Pro/Enterprise), Windows 11 (Home/Pro/Enterprise) o Windows Server 2016/2019/2022/2025. <strong>Los procesadores ARM no están soportados.</strong></li>
            <li><strong>Hardware (mínimo):</strong> CPU 1,00 GHz con 2+ núcleos (<strong>4+ núcleos para modo desatendido</strong>), 1 GB de almacenamiento, 2 GB de RAM. <strong>Recomendado:</strong> 1,60 GHz, 2 GB de almacenamiento, 4 GB de RAM y <code>.NET Framework 4.7.2</code> o posterior.</li>
            <li><strong>Navegador:</strong> Microsoft Edge 80+, Google Chrome o Mozilla Firefox. <strong>TLS 1.2</strong>, un teclado conectado y conexión a Internet activa.</li>
            <li><strong>(Cuentas profesionales/educativas):</strong> un <strong>entorno</strong> con base de datos <strong>Dataverse</strong> (lo vemos en 1.5).</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · Windows Home</span>
            <p>En <strong>Windows Home</strong> puedes <strong>crear</strong> flujos, ejecutarlos <strong>localmente en modo atendido</strong> y monitorizarlos — pero <strong>no</strong> puedes disparar desktop flows <strong>desde la nube</strong> (no hay <em>cloud runtime</em>, y por tanto tampoco desatendido). Para eso necesitas Windows Pro/Enterprise/Server.</p>
          </div>
          <div class="callout callout--debug">
            <span class="c-tag">Despliegue · imágenes de VM</span>
            <p>No preinstales PAD dentro de una <strong>imagen base de máquina virtual</strong>: la información de registro de la máquina puede quedar retenida en la imagen clonada y causar comportamientos inesperados. Instálalo en <strong>cada máquina por separado</strong> tras el <em>imaging</em> (con scripts de despliegue si lo automatizas).</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/requirements" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Requisitos previos y limitaciones ↗</a>
        </div>
      </article>

      <!-- 1.4 -->
      <article class="doc-section open" id="s14">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">1.4</span><span class="sh-title">Qué instalas: dos apps, MSI vs Store</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Al instalar Power Automate para escritorio obtienes <strong>dos componentes</strong>:</p>
          <ul>
            <li><strong>Power Automate for desktop</strong> — la aplicación con la que <strong>construyes, editas y ejecutas</strong> flujos de escritorio. Es donde pasarás la mayor parte del tiempo.</li>
            <li><strong>Machine-runtime app</strong> — conecta tu máquina con la <strong>nube</strong> de Power Automate para desplegar RPA completa (por ejemplo, ejecuciones desatendidas lanzadas desde un cloud flow).</li>
          </ul>
          <p>Hay <strong>dos formas de instalación</strong>: la versión <strong>MSI</strong> (instalador independiente; requiere <strong>permisos de administrador</strong>) y la versión de la <strong>Microsoft Store</strong>. ¿No sabes cuál tienes? Ve a <em>Inicio → Agregar o quitar programas</em> y busca “Power Automate”: si aparece como <em>“Power Automate for desktop”</em> es la MSI; si aparece como <em>“Power Automate”</em> a secas, es la de la Store. Bajo el capó, la app usa el runtime <strong>.NET 8</strong>.</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>En entorno corporativo y para desatendido, la versión <strong>MSI</strong> es la habitual (se gestiona por SCCM/Intune y admite actualizaciones automáticas desde la versión 2.54). La de la <strong>Store</strong> encaja mejor para uso personal/atendido.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/install" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Instalar Power Automate ↗</a>
        </div>
      </article>

      <!-- 1.5 -->
      <article class="doc-section open" id="s15">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">1.5</span><span class="sh-title">Cuentas, entornos y qué desbloquea cada plan</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Inicias sesión con uno de <strong>tres tipos de cuenta</strong>, y aquí está la parte que conviene tener clara desde el principio, porque <strong>cambia mucho lo que puedes hacer</strong>:</p>
          <p><strong>Con cualquiera de las tres</strong> (Microsoft / profesional o educativa / organización premium) puedes usar el <strong>grabador</strong>, el <strong>diseñador</strong> de arrastrar y soltar, el soporte de todos los navegadores, las <strong>400+ acciones</strong> predefinidas (incluidas las de SAP, terminales heredados tipo mainframe/AS-400, Java o Citrix) y el <strong>manejo de excepciones</strong>.</p>
          <p><strong>Solo la cuenta de organización premium</strong> añade lo que hace falta para industrializar: <strong>conectividad con cloud flows</strong> (disparar y programar), almacenamiento en <strong>Dataverse</strong> con aislamiento por entorno y acceso por rol, <strong>compartir y colaborar</strong> en flujos, <strong>gestión y reporting centralizados</strong>, y extras como <strong>AI Builder</strong>, conectores premium/personalizados y <strong>RPA desatendido</strong> (con el complemento correspondiente).</p>
          <table class="tbl">
            <thead><tr><th>Capacidad</th><th>MSA / Work-school</th><th>Organización premium</th></tr></thead>
            <tbody>
              <tr><td>Crear y ejecutar en local (atendido)</td><td>Sí</td><td>Sí</td></tr>
              <tr><td>400+ acciones, grabador, navegadores</td><td>Sí</td><td>Sí</td></tr>
              <tr><td>Disparar/programar desde cloud flows</td><td>No</td><td>Sí</td></tr>
              <tr><td>Compartir flujos y RPA desatendido</td><td>No</td><td>Sí</td></tr>
              <tr><td>Almacenamiento</td><td>OneDrive (MSA) · Dataverse del entorno por defecto (work-school)</td><td>Dataverse en varios entornos</td></tr>
            </tbody>
          </table>
          <p><strong>Entornos (environments) y Dataverse:</strong> en cuentas profesionales/educativas, los desktop flows se guardan en el <strong>entorno por defecto</strong>, que necesita una base de datos <strong>Dataverse</strong>. Si ese entorno no tiene Dataverse, <strong>no podrás crear flujos</strong> (PAD te pedirá crear la base de datos primero). Un “entorno” es el contenedor de Power Platform que aporta aislamiento y control de acceso por rol.</p>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p>El concepto de <strong>environment</strong> de Power Platform no tiene equivalente directo en UiPath; lo más cercano serían los <em>tenants/folders</em> de Orchestrator. Y <strong>Dataverse</strong> como almacén central de tus flujos hace el papel de la base de datos de Orchestrator. <strong>Implicación práctica:</strong> con cuenta gratuita o básica aprendes y automatizas en local, pero para orquestar desde la nube y desatendido necesitas el plan premium de organización.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/requirements" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Comparación de cuentas de inicio de sesión ↗</a>
        </div>
      </article>

      <!-- 1.6 -->
      <article class="doc-section open" id="s16">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">1.6</span><span class="sh-title">La Consola: tu centro de mando</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>La <strong>consola</strong> es la pantalla de inicio de PAD: el sitio para <strong>gestionar</strong> tus flujos sin entrar a editarlos. Sus pestañas principales:</p>
          <ul>
            <li><strong>My flows</strong> — tus flujos.</li>
            <li><strong>Examples</strong> — ejemplos oficiales para aprender. Clic derecho sobre uno → <code>Create a copy</code> y se guarda en <em>My flows</em> para que lo trastees sin miedo (no puedes sobrescribir el ejemplo original; si lo editas, usa <code>Save as</code>).</li>
            <li><strong>Shared with me</strong> — flujos que otras personas han compartido contigo.</li>
          </ul>
          <p>Para <strong>crear</strong> un flujo: botón <code>New flow</code> → escribe un nombre → <code>Create</code>, y se abre el diseñador. Desde la propia consola también <strong>ejecutas, renombras, eliminas y compartes</strong> flujos; y con Copilot puedes <strong>generar automáticamente la descripción</strong> de un flujo desde sus propiedades.</p>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p>La consola ≈ tu vista de proyectos/automatizaciones (un “Orchestrator ligero” para lo local): desde aquí lanzas y administras. El <strong>diseñador</strong> (siguiente sección) ≈ <strong>UiPath Studio</strong> abierto dentro de un proceso concreto.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/create-flow" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Crear flujos de escritorio ↗</a>
        </div>
      </article>

      <!-- 1.7 -->
      <article class="doc-section open" id="s17">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">1.7</span><span class="sh-title">El Diseñador de flujos: anatomía de la pantalla</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>El <strong>flow designer</strong> es el entorno de desarrollo donde montas el flujo. Conviene tener su mapa claro desde el primer día:</p>
          <ul>
            <li><strong>Barra de menú</strong> (arriba) — <code>File</code> (Save / Save as, atajo <code>Ctrl+S</code>), <code>Edit</code> (incluye <code>Go to line</code> para saltar a una línea concreta en flujos largos), <code>Debug</code>, etc.</li>
            <li><strong>Toolbar</strong> — botones de ejecución (<code>Run</code> / <code>Stop</code> / <code>Pause</code>), el <strong>Recorder</strong> (grabador) y las opciones de depuración.</li>
            <li><strong>Panel de Acciones</strong> (izquierda) — el catálogo de <strong>todas</strong> las acciones disponibles, agrupadas por categoría y con su propio buscador. Arrastras desde aquí al flujo.</li>
            <li><strong>Workspace</strong> (centro) — el área de trabajo donde se ensambla el flujo. Aquí <strong>arrastras</strong> acciones para reordenarlas, las <strong>habilitas/deshabilitas</strong> (clic derecho → <code>Enable/Disable action</code>; una acción deshabilitada se salta al ejecutar) y las <strong>copias/pegas</strong> (incluso entre instancias del diseñador, o como texto plano a un editor para compartir trozos). Los <strong>subflows</strong> aparecen como <strong>pestañas</strong> sobre el workspace: todo flujo contiene el subflow <code>Main</code>, que es el que arranca al ejecutar; los demás se invocan con la acción <code>Run subflow</code>.</li>
            <li><strong>Panel de Variables / UI elements / Images</strong> (derecha) — las variables del flujo, los elementos de UI capturados y las imágenes guardadas.</li>
            <li><strong>Barra de estado</strong> (abajo) — muestra el número de <strong>errores</strong> (clic en <code>Errors</code> para abrir el panel) y los resultados de búsqueda.</li>
          </ul>
          <p>Tres funciones de navegación que te ahorrarán mucho tiempo: <strong>buscar en el flujo</strong> (campo arriba a la derecha, atajo <code>Ctrl+F</code>; encuentra texto, acciones o variables en todo el flujo), <strong>Go to line</strong> (<code>Edit → Go to line</code>) y <strong>Run from here</strong> (clic derecho en una acción → ejecuta el flujo <em>desde</em> ahí, ignorando las anteriores).</p>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging</span>
            <p><code>Run from here</code> es tu mejor amigo al depurar: evita repetir pasos lentos (login, navegación) cada vez que pruebas una sección posterior. <strong>Ojo:</strong> no está disponible para acciones dentro de bucles, condicionales ni dentro de <code>On block error</code>.</p>
          </div>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p>Panel de Acciones ≈ panel de <strong>Activities</strong>. Workspace ≈ el <strong>lienzo</strong> de Studio. Panel de Variables ≈ panel <strong>Variables/Arguments</strong>. Los <strong>UI elements</strong> ≈ los <code>selectors</code> (capturados, en UiPath, con el UI Explorer). El subflow <code>Main</code> ≈ tu <code>Main.xaml</code>; <code>Run subflow</code> ≈ <code>Invoke Workflow File</code> (interno).</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/designer-workspace" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Administrar el área de trabajo del diseñador ↗</a>
        </div>
      </article>

      <!-- 1.8 -->
      <article class="doc-section open" id="s18">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">1.8</span><span class="sh-title">Atajos y gestos esenciales</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>El kit mínimo para moverte por el diseñador sin frustrarte:</p>
          <table class="tbl">
            <thead><tr><th>Gesto / Atajo</th><th>Cómo</th><th>Para qué</th></tr></thead>
            <tbody>
              <tr><td>Ctrl + S</td><td>File → Save</td><td>Guardar el flujo.</td></tr>
              <tr><td>Ctrl + F</td><td>Campo de búsqueda (arriba dcha.)</td><td>Encontrar texto, una acción o una variable en todo el flujo.</td></tr>
              <tr><td>Ctrl + clic</td><td>Sobre varias acciones</td><td>Seleccionar acciones sueltas.</td></tr>
              <tr><td>Shift + clic</td><td>Primera y última acción</td><td>Seleccionar un rango de acciones.</td></tr>
              <tr><td>Arrastrar</td><td>Acción en el workspace</td><td>Reordenar y cambiar el orden de ejecución.</td></tr>
              <tr><td>Enable / Disable</td><td>Clic derecho en la acción</td><td>Saltarse una acción sin borrarla (útil al probar).</td></tr>
              <tr><td>Copiar como texto</td><td>Copiar acciones → pegar en un editor</td><td>Compartir trozos de flujo con otra persona.</td></tr>
              <tr><td>Run from here</td><td>Clic derecho → Run from here</td><td>Ejecutar desde una acción concreta.</td></tr>
              <tr><td>Go to line</td><td>Edit → Go to line</td><td>Saltar a una línea concreta en flujos largos.</td></tr>
            </tbody>
          </table>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>Al copiar/pegar acciones <strong>entre flujos</strong>, el diseñador de origen y el de destino deben estar en la <strong>misma versión</strong> de PAD. Si el esquema cambió entre versiones, la acción pegada — o sus UI elements/imágenes asociados — podría no reconocerse.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/designer-workspace" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Administrar el área de trabajo del diseñador ↗</a>
        </div>
      </article>

      <!-- 1.9 -->
      <article class="doc-section open" id="s19">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">1.9</span><span class="sh-title">Límites y avisos que conviene saber de entrada</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Cuatro cosas que es mejor conocer antes de invertir horas, no después:</p>
          <ul>
            <li><strong>Compatibilidad hacia adelante NO garantizada:</strong> PAD es retrocompatible, pero un flujo creado con una versión <strong>más nueva</strong> puede <strong>no abrirse ni ejecutarse</strong> en una más antigua (saldrá un error pidiéndote actualizar). Mantén la <strong>misma versión</strong> en todo el equipo.</li>
            <li><strong>Tamaño del flujo:</strong> en entornos de esquema v1, un desktop flow <strong>no puede superar 100&nbsp;MB</strong>; si lo supera, divide la lógica en flujos más pequeños.</li>
            <li><strong>Registro (logging):</strong> se registran como máximo <strong>10.000 acciones</strong> por ejecución; las que excedan ese número se <strong>ejecutan igualmente</strong>, pero no quedan en el log.</li>
            <li><strong>Proxy:</strong> PAD usa la configuración de proxy de Windows. Si tu proxy <strong>requiere autenticación</strong>, el administrador debe <strong>excluir a PAD</strong> o usar otro servidor sin autenticación.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>Los <strong>desktop flows no están soportados como herramienta dentro de Copilot Studio.</strong> Tenlo en cuenta si pensabas orquestarlos desde ahí.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/requirements" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Problemas conocidos y limitaciones ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 2 ============ -->
    <section class="block-group" id="block-2">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-2">
        <span class="bg-badge">Bloque 02</span>
        <h2 class="bg-head-title">Tu primer flujo</h2>
        <span class="bg-sub">Entiende, construye, ejecuta y graba</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-2">

      <!-- 2.1 -->
      <article class="doc-section open" id="s21">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">2.1</span><span class="sh-title">Anatomía de un flujo: acciones, líneas y orden de ejecución</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Un <strong>flujo</strong> es una <strong>lista ordenada de acciones</strong> que se ejecutan <strong>de arriba abajo</strong>, una tras otra — como líneas de código numeradas. No hay magia: la línea 1, luego la 2, luego la 3.</p>
          <p>Una <strong>acción</strong> es un paso concreto (abrir un programa, hacer clic, leer una celda de Excel, mostrar un mensaje). Cada acción tiene <strong>parámetros</strong> que configuras al añadirla; haces <strong>doble clic</strong> sobre ella para editarlos.</p>
          <ul>
            <li><strong>Añadir</strong> una acción: arrástrala desde el <strong>panel de Acciones</strong> (izquierda) al workspace, o doble clic sobre ella.</li>
            <li><strong>Reordenar</strong>: arrastra la acción arriba o abajo (cambia el orden de ejecución).</li>
            <li><strong>Saltarte</strong> una sin borrarla: clic derecho → <code>Disable action</code>.</li>
          </ul>
          <p>Todo flujo arranca en el subflow <code>Main</code>: la ejecución empieza en su primera línea. (Los subflows y cómo organizarlos los vimos en 1.7.)</p>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p>Una <strong>action</strong> ≈ una <code>activity</code>. El orden secuencial arriba-abajo equivale a una <strong>Sequence</strong> de UiPath: PAD es <strong>lineal por defecto</strong> (una lista numerada), no un <em>flowchart</em> visual con flechas. Y <code>Main</code> ≈ tu <code>Main.xaml</code>.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/designer-workspace" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Área de trabajo del diseñador ↗</a>
        </div>
      </article>

      <!-- 2.2 -->
      <article class="doc-section open" id="s22">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">2.2</span><span class="sh-title">Crea y ejecuta tu primer flujo, paso a paso</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>La secuencia completa, de la consola al “hola mundo”:</p>
          <ul>
            <li><strong>1. Crear:</strong> en la consola, <code>New flow</code> → escribe un nombre → <code>Create</code>. Se abre el diseñador.</li>
            <li><strong>2. Tu primera acción:</strong> en el panel de Acciones busca <code>Display message</code> (categoría <em>Message boxes</em>) y arrástrala a <code>Main</code>. Escribe el texto a mostrar.</li>
            <li><strong>3. Guardar:</strong> <code>Ctrl + S</code> (o File → Save).</li>
            <li><strong>4. Ejecutar:</strong> pulsa <code>Run</code> en la toolbar. Aparece tu cuadro de mensaje. <code>Stop</code> para detener.</li>
            <li><strong>5. Volver:</strong> cierra el diseñador y el flujo aparece en <strong>My flows</strong>.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco · aprende de los Examples</span>
            <p>En la consola, pestaña <strong>Examples</strong> → clic derecho en un ejemplo → <code>Create a copy</code> (se guarda en <em>My flows</em>). Diseccionar un flujo ya hecho enseña más rápido que partir de cero. No puedes sobrescribir el original: si lo editas, usa <code>Save as</code>.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/create-flow" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Crear flujos de escritorio ↗</a>
        </div>
      </article>

      <!-- 2.3 -->
      <article class="doc-section open" id="s23">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">2.3</span><span class="sh-title">Ejecutar y observar: tus primeros gestos de control</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Ejecutar no es solo darle a <code>Run</code>. Estos gestos te dejan <strong>ver qué hace el flujo</strong> mientras corre — el primer paso para depurar:</p>
          <ul>
            <li><code>Run</code> / <code>Stop</code> / <code>Pause</code> — ejecutar todo, detener o pausar.</li>
            <li><code>Run from here</code> (clic derecho en una acción) — ejecuta <strong>desde</strong> esa acción, ignorando las anteriores. (No disponible dentro de bucles, condicionales ni <code>On block error</code>.)</li>
            <li><code>Run next action</code> — ejecuta <strong>acción a acción</strong>, pausando tras cada una. Con el flujo en pausa, abre el <strong>panel de Variables</strong> y mira el valor de cada variable en ese punto exacto.</li>
            <li><code>Run delay</code> — milisegundos de espera tras cada acción en el diseñador. Súbelo para ver el flujo “a cámara lenta”.</li>
            <li><strong>Stepping mode</strong> (menú <code>Debug</code>): <code>Step over</code> (F11) y <code>Step out</code> (Shift+F11) para más control. A fondo en el Bloque 10.</li>
          </ul>
          <p>La <strong>barra de estado</strong> (abajo) muestra el número de errores; pulsa <code>Errors</code> para ver el panel.</p>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging · kit de arranque</span>
            <p><code>Run next action</code> + el <strong>panel de Variables</strong> es la forma más rápida de entender <em>por qué</em> un flujo hace lo que hace: lo pausas y ves los valores reales paso a paso. El debugging serio (breakpoints, errores, reintentos) va en el Bloque 10; esto es lo mínimo para no ir a ciegas.</p>
          </div>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p><code>Run next action</code> ≈ el <strong>Step</strong> del depurador de UiPath; mirar el panel de Variables en pausa ≈ el panel <strong>Locals</strong> con breakpoints. Mismo concepto: parar y observar el estado.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/debugging-flow" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Depurar un flujo de escritorio ↗</a>
        </div>
      </article>

      <!-- 2.4 -->
      <article class="doc-section open" id="s24">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">2.4</span><span class="sh-title">El Grabador (recorder): deja que PAD escriba el flujo por ti</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>El <strong>grabador</strong> replica tus clics y pulsaciones y los convierte en acciones automáticamente. Cómo va:</p>
          <ul>
            <li>Crea un flujo nuevo y pulsa <code>Recorder</code> en la toolbar → <code>Record</code> → realiza las acciones en la aplicación o página. Graba <strong>cada acción por separado</strong>, siguiendo los <strong>UI elements</strong>, y genera acciones de UI y de navegador. Tras cada clic, el resaltador muestra <em>“Wait for action”</em>: espera a que la capture.</li>
            <li><strong>Clic derecho</strong> sobre un elemento durante la grabación → menú con las acciones disponibles para ese elemento.</li>
            <li><code>Pause</code> suspende; <code>Add a comment</code> anota; <code>Done</code> convierte lo grabado en acciones. Los UI elements usados se añaden solos al <strong>panel de UI elements</strong>.</li>
          </ul>
          <p><strong>Modo de captura</strong> (apps de escritorio): <code>UIA</code> (UI Automation — moderno, recomendado: WPF, WinForms, UWP) o <code>MSAA</code> (heredado: VB6, Win32). Usa <strong>UIA siempre que puedas</strong>. Para <strong>web</strong>, lanza el navegador desde el icono de puntos → <code>Launch new web browser</code> (Edge/Chrome/Firefox), o empieza a grabar en un navegador ya abierto. Si una app no expone su API de accesibilidad, existe la <strong>grabación basada en imágenes</strong> (reconocimiento de imagen + OCR).</p>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · lo más importante del grabador</span>
            <p>El grabador <strong>no graba condicionales ni bucles</strong>, y casi siempre deja <strong>acciones redundantes</strong>. Úsalo para crear el <strong>esqueleto</strong> del flujo y luego <strong>edítalo a mano</strong>: limpia lo que sobre y añade la lógica. <strong>No despliegues un flujo grabado tal cual.</strong></p>
          </div>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p>El recorder de PAD ≈ el <strong>Recorder</strong> de UiPath (Web/Desktop), con la misma filosofía: graba el esqueleto y refínalo. Elegir <code>UIA</code> vs <code>MSAA</code> ≈ elegir el <em>framework</em>/método de selector según la aplicación.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/recording-flow" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Grabar flujos de escritorio ↗</a>
        </div>
      </article>

      <!-- 2.5 -->
      <article class="doc-section open" id="s25">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">2.5</span><span class="sh-title">Grabar vs construir a mano: cuándo usar cada uno</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <table class="tbl">
            <thead><tr><th>Enfoque</th><th>Cuándo brilla</th><th>Límite</th></tr></thead>
            <tbody>
              <tr><td>Grabar</td><td>Secuencias largas de clics en UI/web; primer borrador rápido del esqueleto.</td><td>No graba lógica (if/bucles); genera ruido que hay que limpiar.</td></tr>
              <tr><td>A mano</td><td>Control total, flujos limpios y mantenibles; imprescindible para lógica, variables y errores.</td><td>Más lento de teclear al principio.</td></tr>
            </tbody>
          </table>
          <p><strong>La receta que funciona:</strong> graba el esqueleto → elimina acciones redundantes → añade a mano la lógica (condicionales, bucles), las variables y el manejo de errores.</p>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging · el clásico “graba bien pero falla”</span>
            <p>Si un flujo grabado funciona al grabarlo pero <strong>falla al ejecutarlo</strong>, casi siempre es por <strong>timing</strong> (la aplicación aún no está lista → faltan esperas) o por <strong>selectores/UI elements frágiles</strong>. Lo atacamos a fondo en UI elements (Bloque 5) y en debugging (Bloque 10).</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/recording-flow" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Grabar frente a construir un flujo ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 3 ============ -->
    <section class="block-group" id="block-3">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-3">
        <span class="bg-badge">Bloque 03</span>
        <h2 class="bg-head-title">Variables y tipos de datos</h2>
        <span class="bg-sub">Que el flujo deje de hacer clics tontos y empiece a pensar</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-3">

      <!-- 3.1 -->
      <article class="doc-section open" id="s31">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">3.1</span><span class="sh-title">Qué es una variable y la notación %</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Una <strong>variable</strong> es un contenedor con nombre que guarda un dato entre acciones: un texto, un número, una fecha, un archivo, una lista… La idea: una acción produce un dato, lo metes en una variable, y otra acción lo usa más tarde.</p>
          <p>La regla de oro de PAD: para usar una variable, <strong>encierra su nombre entre signos de porcentaje</strong> — <code>%NombreCliente%</code>. Si te olvidas los <code>%</code>, PAD lee el texto literal “NombreCliente” en lugar del valor. Dentro de <code>%...%</code>, todo se <strong>evalúa</strong> como expresión.</p>
          <ul>
            <li><strong>Nombres:</strong> empiezan por letra y <strong>no distinguen mayúsculas/minúsculas</strong>.</li>
            <li><strong>Texto literal:</strong> entre comillas simples. Puedes mezclar: <code>'Hola, %UserName%!'</code> da <code>Hola, Alice!</code> si <code>UserName</code> es <code>Alice</code>.</li>
            <li><strong>El símbolo % como carácter</strong> (no como variable): se escapa duplicándolo → <code>%%</code>.</li>
            <li>PAD <strong>crea automáticamente</strong> las variables que generan las acciones (no las declaras a mano).</li>
          </ul>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p>Misma idea que las variables de UiPath, pero la <strong>sintaxis cambia</strong>: aquí todo va dentro de <code>%...%</code>, no entre llaves ni con expresiones VB. Concatenar es con <code>+</code> dentro del bloque de porcentajes, y el texto literal va en comillas simples.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/variable-manipulation" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Manipulación de variables y notación % ↗</a>
        </div>
      </article>

      <!-- 3.2 -->
      <article class="doc-section open" id="s32">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">3.2</span><span class="sh-title">Tipos de datos: los que usarás de verdad</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p><strong>Básicos:</strong></p>
          <ul>
            <li><strong>Texto</strong> — cualquier cadena de caracteres.</li>
            <li><strong>Número</strong> — se escribe sin <code>%</code> (hardcodeado). Solo con números haces operaciones matemáticas.</li>
            <li><strong>Booleano</strong> — <code>%True%</code> o <code>%False%</code>.</li>
          </ul>
          <p><strong>Avanzados (colecciones):</strong></p>
          <ul>
            <li><strong>Lista</strong> — un array de una dimensión. La creas con <code>Create new list</code> y <code>Add item to list</code>, o la recibes de acciones como <code>Get files in folder</code> o <code>Read text from file</code>. Acceso por índice (empieza en <strong>0</strong>): <code>%Lista[0]%</code>. Rebanado: <code>%Lista[2:4]%</code> (el índice final es el límite y <em>no</em> se incluye), <code>%Lista[:4]%</code>, <code>%Lista[2:]%</code>.</li>
            <li><strong>Datatable</strong> — una tabla 2D (filas y columnas), el equivalente a un array bidimensional. La devuelven <code>Read from Excel</code>, <code>Execute SQL statement</code> o <code>Extract data from web page</code>. Acceso a una celda: <code>%Tabla[Fila][Columna]%</code>.</li>
            <li><strong>Custom object</strong> — pares clave-valor (un diccionario, convertible a JSON). Acceso a una propiedad: <code>%Objeto.Propiedad%</code>.</li>
            <li><strong>Instancia</strong> — representa una app abierta (Browser, Excel, Outlook, Terminal…) que pasas de una acción a otra.</li>
          </ul>
          <p>Muchos tipos exponen <strong>propiedades</strong> con <code>%Variable.Propiedad%</code>. Ejemplo útil: <code>%Files.Count%</code> te da cuántos archivos hay en una lista de ficheros.</p>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p><strong>Lista</strong> ≈ <code>List&lt;T&gt;</code>/array; <strong>Datatable</strong> ≈ el <code>DataTable</code> de UiPath (idéntico concepto, lo usarás igual al leer Excel); <strong>Custom object</strong> ≈ <code>Dictionary</code>/<code>JObject</code>. La diferencia es el acceso: aquí siempre dentro de <code>%...%</code> con <code>[ ]</code> y <code>.</code>.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/variable-data-types" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Tipos de datos de variables ↗</a>
        </div>
      </article>

      <!-- 3.3 -->
      <article class="doc-section open" id="s33">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">3.3</span><span class="sh-title">Operar con variables: expresiones dentro de %…%</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Dentro de los porcentajes puedes hacer cálculos y comparaciones, no solo leer una variable:</p>
          <ul>
            <li><strong>Aritmética:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>. El <code>+</code> también <strong>concatena texto</strong>. Precedencia estándar; usa paréntesis para forzar el orden.</li>
            <li><strong>Comparaciones</strong> (<code>=</code>, <code>&lt;</code>, <code>&gt;</code>…) — devuelven <code>True</code>/<code>False</code>, y <strong>solo entre valores del mismo tipo</strong>.</li>
            <li><strong>Operadores lógicos</strong> (AND/OR) — para combinar varias condiciones en una sola expresión.</li>
            <li>Para crear o asignar un valor a mano, usa la acción <code>Set variable</code>.</li>
          </ul>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging · el error más común con tipos</span>
            <p>Si mezclas <strong>número y texto</strong> en una suma sin convertir, no sumas: <code>+</code> convierte el número a texto y los <strong>concatena</strong> (o peta en runtime). Antes de operar, convierte explícitamente los tipos. Es la causa nº 1 de “¿por qué me sale 510 en vez de 15?”.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/variable-manipulation" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Manipulación de variables y notación % ↗</a>
        </div>
      </article>

      <!-- 3.4 -->
      <article class="doc-section open" id="s34">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">3.4</span><span class="sh-title">El panel de Variables: tu cuadro de mandos</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>El panel de Variables (derecha del diseñador, visto en 1.7) muestra las variables de <strong>entrada/salida</strong> y las <strong>Flow variables</strong> del flujo actual. Desde ahí puedes:</p>
          <ul>
            <li><strong>Buscar</strong>, <strong>renombrar</strong> (actualiza el nombre en todas sus apariciones), <strong>find usages</strong> (ver dónde se usa), <strong>marcar como sensible</strong>, fijar (pin) y filtrar por tipo.</li>
            <li>Ver el <strong>valor actual</strong> de cada variable junto a su nombre <strong>mientras el flujo corre</strong>; el icono de la goma limpia todos los valores.</li>
            <li><strong>Doble clic</strong> en una variable → el visor de valor: muestra su tipo y expande datarows/datatables para ver el contenido.</li>
          </ul>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging · tu rayos X</span>
            <p>Combina esto con el Bloque 2: pausa con <code>Run next action</code> y haz <strong>doble clic</strong> en la variable. Ves su <strong>valor y su tipo reales</strong> en ese punto exacto. Es la forma más rápida de cazar por qué un flujo se desvía.</p>
          </div>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>Si <strong>renombras</strong> una variable a un nombre que <strong>ya existe</strong>, PAD te propone <strong>fusionar</strong> las dos. Una fusión involuntaria puede romper el flujo: confirma solo si de verdad quieres unirlas.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/manage-variables" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Administrar variables y el panel de variables ↗</a>
        </div>
      </article>

      <!-- 3.5 -->
      <article class="doc-section open" id="s35">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">3.5</span><span class="sh-title">Variables de entrada/salida y valores sensibles (encriptar)</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Las <strong>variables de entrada y salida</strong> son la puerta del flujo al exterior: intercambian datos entre <strong>nube ↔ desktop</strong> y entre <strong>desktop flows</strong> (vía la acción <code>Run desktop flow</code>). Las creas con el botón <code>+</code> del panel → <code>Input</code> (o <code>Output</code>). Campos de una variable de entrada:</p>
          <ul>
            <li><strong>Variable name</strong>, <strong>Data type</strong> (text, number, boolean, custom object, list, datatable, instance o session), <strong>Default value</strong> y <strong>External name</strong> (el nombre con el que la verá el flujo de nube al llamarla).</li>
            <li><strong>Mark as optional</strong> — permite no pasar valor sin que dé error (acepta Blank).</li>
            <li><strong>Mark as sensitive</strong> — lo importante para ti, ver abajo.</li>
          </ul>
          <p><strong>Valores sensibles (tu “encriptar”):</strong> al marcar una variable de entrada como <strong>sensible</strong>, su valor queda <strong>protegido y enmascarado</strong> — no se muestra ni se expone en los registros. Es el <strong>primer nivel</strong> para manejar contraseñas y datos delicados sin dejarlos a la vista. El almacenamiento serio de secretos (Azure Key Vault, credenciales centralizadas) lo veremos en <strong>Operación (Bloque 13)</strong>.</p>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p>Las <strong>Input/Output variables</strong> ≈ los <code>Arguments</code> (In/Out) de UiPath. <strong>Mark as sensitive</strong> ≈ usar <code>SecureString</code>/credenciales. Y los <em>assets/credentials</em> de Orchestrator ≈ Key Vault y las conexiones de nube (lo aterrizamos en el Bloque 13).</p>
          </div>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Primera pieza del robot: el <strong>listado de facturas</strong> del Excel será una <strong>Datatable</strong> (saldrá de <code>Read from Excel</code> en el Bloque 7), y recorreremos sus filas con un <strong>bucle</strong> (Bloque 4). La <strong>ruta del Excel</strong> y la <strong>carpeta de PDFs</strong> entrarán como variables de <strong>entrada</strong>; el <strong>usuario y contraseña</strong> del portal web irán como variable <strong>sensible</strong>. Ya tienes el esqueleto de datos del proyecto.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/manage-variables" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Variables de entrada/salida y sensibles ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 4 ============ -->
    <section class="block-group" id="block-4">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-4">
        <span class="bg-badge">Bloque 04</span>
        <h2 class="bg-head-title">Lógica y control de flujo</h2>
        <span class="bg-sub">Que el flujo decida, repita y se organice</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-4">

      <!-- 4.1 -->
      <article class="doc-section open" id="s41">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">4.1</span><span class="sh-title">Condicionales: If / Else if / Else / End</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Un condicional ejecuta un bloque de acciones <strong>solo si</strong> se cumple una condición; si no, lo salta. El <code>If</code> es el más usado: consta de <strong>dos operandos y un operador</strong> (equal, not equal, greater than…). Si la condición es verdadera, se ejecuta todo lo que hay entre <code>If</code> y <code>End</code>.</p>
          <ul>
            <li><code>Else</code> — define qué hacer cuando el <code>If</code> es falso. Va entre el <code>If</code> y el <code>End</code>.</li>
            <li><code>Else if</code> — para encadenar varias condiciones con lógicas distintas.</li>
            <li>Para varias condiciones a la vez, usa <strong>operadores lógicos</strong> (AND/OR) en una sola expresión, o <strong>anida</strong> un <code>If</code> dentro de otro (ambos deben cumplirse). Anidar mucho complica el flujo: a veces una sola expresión lógica es más limpia.</li>
          </ul>
          <p>Condicionales especiales muy útiles: <code>If file exists</code>, <code>If folder exists</code>, <code>If service</code> (running/paused/stopped) e <code>If process</code> (en ejecución o no).</p>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · mismo tipo</span>
            <p>Los operandos deben ser del <strong>mismo tipo de dato</strong>. Comparar tipos distintos (texto vs número) hace que la condición sea <strong>siempre falsa</strong> — sin error, simplemente nunca entra. Enlaza con los tipos del Bloque 3.</p>
          </div>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p><code>If/Else/Else if</code> ≈ <code>If</code> / <code>Flow Decision</code> de UiPath, pero aquí el <code>If</code> es un <strong>bloque</strong> que se cierra con <code>End</code>, no una actividad con dos ramas visuales.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/use-conditionals" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Usar condicionales ↗</a>
        </div>
      </article>

      <!-- 4.2 -->
      <article class="doc-section open" id="s42">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">4.2</span><span class="sh-title">Switch / Case / Default</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Cuando comparas <strong>una misma variable</strong> contra varios valores posibles, el <code>Switch</code> es más limpio que una pila de <code>Else if</code>. El <code>Switch</code> despacha la ejecución según el valor de una expresión: cada <code>Case</code> ejecuta su bloque si su valor coincide, y <code>Default</code> se ejecuta si <strong>ningún</strong> Case coincide.</p>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p><code>Switch / Case / Default</code> ≈ el <code>Switch</code> de UiPath. Mismo patrón: una entrada, varias salidas según valor, y un caso por defecto.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/conditionals" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones condicionales ↗</a>
        </div>
      </article>

      <!-- 4.3 -->
      <article class="doc-section open" id="s43">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">4.3</span><span class="sh-title">Bucles: Loop, Loop condition y For each</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Los bucles automatizan lo repetitivo sin duplicar acciones. Hay tres sabores:</p>
          <ul>
            <li><code>Loop</code> (simple) — repite un <strong>número fijo</strong> de veces (desde / hasta / paso).</li>
            <li><code>Loop condition</code> (while) — repite <strong>mientras</strong> una condición sea verdadera (dos operandos + operador). Si la condición es <strong>siempre</strong> verdadera, el bucle <strong>nunca termina</strong>.</li>
            <li><code>For each</code> — recorre una <strong>lista o datatable</strong> guardando el item/fila actual en una variable. Es el caballo de batalla para procesar colecciones (cada fila de un Excel, cada archivo de una carpeta…).</li>
          </ul>
          <p>Dentro de cualquier bucle: <code>Exit loop</code> sale antes de terminar; <code>Next loop</code> salta a la siguiente iteración.</p>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p><code>For each</code> ≈ <code>For Each</code>; <code>Loop condition</code> ≈ <code>While</code>/<code>Do While</code>; <code>Exit loop</code> ≈ <code>Break</code>; <code>Next loop</code> ≈ <code>Continue</code>.</p>
          </div>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Aquí arranca el motor del robot: un <code>For each</code> sobre la <strong>datatable de facturas</strong> (la que definimos en el Bloque 3). En cada vuelta tendremos una factura en una variable, y dentro del bucle haremos su trabajo —rellenar el formulario web y adjuntar su PDF (Bloques 6 y 7)—. Así se procesan las 1000 facturas, una a una.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/use-loops" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Usar bucles ↗</a>
        </div>
      </article>

      <!-- 4.4 -->
      <article class="doc-section open" id="s44">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">4.4</span><span class="sh-title">Control de flujo: subflows, Wait, Go to, Region, Stop</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>“Control de flujo” es alterar el orden en que se ejecutan acciones y subflows. Tus herramientas:</p>
          <ul>
            <li><code>Run subflow</code> — ejecuta otro subflow y, al terminar, <strong>vuelve</strong> al punto de partida. Sirve para <strong>reutilizar lógica</strong> sin repetir acciones. En su menú contextual, <em>Go to subflow</em> salta a esa pestaña.</li>
            <li><code>Wait</code> — suspende la ejecución unos segundos. Clave contra el “graba bien pero falla” por <strong>timing</strong>: dar tiempo a que la app esté lista.</li>
            <li><code>Region</code> / <code>End region</code> — agrupan acciones <strong>visualmente</strong> (puedes colapsarlas) para orden y mantenimiento; no tienen efecto funcional. Van en <strong>pares</strong> y en el mismo scope (no a caballo de un bucle o condicional).</li>
            <li><code>Label</code> + <code>Go to</code> — saltan la ejecución a una etiqueta. Desde la versión 2.46, la etiqueta puede estar en otro scope (p. ej. un condicional), salvo bloques de error, bucles y otros subflows.</li>
            <li><code>Stop flow</code> — termina el flujo (existe además la <em>parada segura</em> controlada desde el portal/diseñador).</li>
            <li><code>Throw custom error</code> — lanza un error propio; se coloca dentro de <code>On block error</code> para manejarlo (anticipo del Bloque 11).</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco · flujos limpios</span>
            <p><code>Region</code> para organizar visualmente, <code>Wait</code> para el timing, <code>Run subflow</code> para no repetir código. El <code>Go to</code>, <strong>con pinzas</strong>: abusar de saltos convierte un flujo en espagueti difícil de depurar.</p>
          </div>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p><code>Run subflow</code> ≈ <code>Invoke Workflow</code>; <code>Region</code> ≈ secuencias/anotaciones para agrupar; <code>Throw custom error</code> ≈ <code>Throw</code>.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/flowcontrol" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de control de flujo ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 5 ============ -->
    <section class="block-group" id="block-5">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-5">
        <span class="bg-badge">Bloque 05</span>
        <h2 class="bg-head-title">UI de escritorio</h2>
        <span class="bg-sub">Cómo PAD encuentra y toca lo que ve en pantalla</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-5">

      <!-- 5.1 -->
      <article class="doc-section open" id="s51">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">5.1</span><span class="sh-title">Tres formas de localizar un elemento en pantalla</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Cuando PAD tiene que hacer clic en algo, hay <strong>tres formas</strong> de decirle dónde está ese “algo”, de más a menos fiable:</p>
          <ul>
            <li><strong>UI elements (selectores)</strong> — PAD identifica el elemento por su <strong>estructura</strong> dentro de la aplicación (su sitio en el árbol de la interfaz), no por dónde está dibujado en pantalla. Es la vía <strong>recomendada</strong>: los desktop flows usan UI elements precisamente para <strong>no</strong> depender de imagen ni de coordenadas absolutas.</li>
            <li><strong>Imagen</strong> — PAD busca un <strong>patrón visual</strong> (un icono, un botón) en la pantalla. Útil cuando la app no expone su estructura (terminales heredados, ciertas apps gráficas).</li>
            <li><strong>Coordenadas</strong> — clic en una posición X/Y fija de la pantalla. Es la <strong>más frágil</strong>: si la ventana se mueve, cambia de tamaño o cambia la resolución, falla.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco · orden de preferencia</span>
            <p>Por defecto, usa siempre <strong>UI elements</strong>. Cae a <strong>imagen</strong> solo si la app no expone elementos (apps gráficas, algunos terminales). Usa <strong>coordenadas</strong> como último recurso — son las primeras en romperse con cualquier cambio de pantalla, resolución o ventana.</p>
          </div>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p><strong>UI element</strong> ≈ <code>selector</code> de UiPath; <strong>Imagen</strong> ≈ <em>Computer Vision</em> / coincidencia de imagen; <strong>Coordenadas</strong> ≈ <em>hardcoded click</em>. Misma jerarquía de fiabilidad en ambas plataformas.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/ui-elements" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Automatizar con UI elements ↗</a>
        </div>
      </article>

      <!-- 5.2 -->
      <article class="doc-section open" id="s52">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">5.2</span><span class="sh-title">UI elements y selectores: anatomía</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Un <strong>UI element</strong> es la ficha que identifica un componente concreto (un botón, un campo) dentro de una ventana o página. Por dentro, se compone de un <strong>selector</strong>: la ruta jerárquica que lo localiza.</p>
          <ul>
            <li>Los selectores usan la notación <code>&gt;</code> para indicar que cada elemento está <strong>contenido</strong> en el de su izquierda — como una ruta de carpetas.</li>
            <li>Al crear un UI element de una <strong>ventana de aplicación</strong>, su selector siempre arranca con el elemento raíz <code>:desktop</code>.</li>
            <li>Si capturas un componente <strong>dentro</strong> de una ventana, PAD crea <strong>dos</strong> UI elements automáticamente: el <strong>padre</strong> (la ventana) y el <strong>hijo</strong> (la estructura jerárquica hasta el componente).</li>
            <li>Hay <strong>dos orígenes</strong>: <strong>desktop UI elements</strong> (cualquier app de Windows, incluida la barra de direcciones de un navegador) y <strong>web UI elements</strong> (identificados por <strong>selectores CSS</strong>).</li>
          </ul>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p>El árbol de UI elements ≈ el <strong>UI Tree</strong> de UiPath; <code>:desktop</code> como raíz ≈ el nodo raíz del Explorer de selectores; la notación <code>&gt;</code> ≈ los <code>&lt;wnd&gt;</code> anidados del XML de un selector de UiPath, pero en forma de ruta legible.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/uiautomation" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Acciones de UI automation ↗</a>
        </div>
      </article>

      <!-- 5.3 -->
      <article class="doc-section open" id="s53">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">5.3</span><span class="sh-title">Capturar y editar selectores: UIA vs MSAA, y selectores de texto</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p><strong>Capturar:</strong> desde una acción de UI automation/browser automation, o desde el panel de UI elements → <code>Add UI element</code>. Pasa el ratón sobre el elemento (se enmarca en rojo) y pulsa <strong>Ctrl + clic izquierdo</strong> para fijarlo; <code>Done</code> para terminar.</p>
          <p>Para <strong>desktop UI elements</strong> hay dos tecnologías de selector — ya las vimos en el Bloque 2, aquí entran en juego de verdad:</p>
          <ul>
            <li><strong>UIA</strong> (UI Automation) — el framework moderno. Información más rica, jerarquía más fiable. <strong>Úsalo siempre que la app lo soporte</strong> (WPF, WinForms, UWP).</li>
            <li><strong>MSAA</strong> — el framework heredado, para apps que <strong>no</strong> exponen UIA (VB6, Win32 clásico).</li>
          </ul>
          <p><strong>Selectores basados en texto:</strong> si capturas un elemento por su contenido textual (botón <code>Capture</code>), PAD genera un selector basado en <strong>texto</strong> — usa el atributo <strong>Name</strong> en desktop y <strong>Text</strong> en navegador. Solo está disponible si el elemento <strong>tiene</strong> ese texto; no funciona en elementos sin valor de texto propio, aunque tengan hijos con texto dentro.</p>
          <p>Para <strong>web</strong>: el selector son uno o varios <strong>selectores CSS</strong>, también con notación <code>&gt;</code>. Se generan automáticamente, pero puedes editarlos a mano o construir uno desde cero para escenarios dinámicos (cambiando <code>Equals to</code> por otros operadores o expresiones regulares; usando variables si un atributo depende del resultado de una acción previa).</p>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · SAP es distinto</span>
            <p>En SAP, el selector basado en texto usa el atributo <strong>Text</strong> en lugar de <strong>Name</strong>. Pero la recomendación oficial es otra: <strong>SAP automatiza mejor con selectores por defecto basados en ID</strong>, no en texto. Esto enlaza directo con el Bloque 10 (y resuelve tu duda del idioma: un ID no cambia aunque el SAP esté en francés).</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/ui-elements" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — UI elements: tipos de selector ↗</a>
        </div>
      </article>

      <!-- 5.4 -->
      <article class="doc-section open" id="s54">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">5.4</span><span class="sh-title">El repositorio de UI elements</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Todos los UI elements capturados se guardan en el <strong>repositorio</strong> (panel de UI elements del diseñador, visto en 1.7), reutilizables por cualquier acción del flujo. Desde ahí:</p>
          <ul>
            <li><strong>Rename</strong> / <strong>Delete</strong> — clic derecho sobre el elemento.</li>
            <li><strong>Find usages</strong> — clic derecho → muestra <strong>todas las acciones</strong> del flujo que usan ese UI element. Doble clic en un resultado resalta la acción en el workspace. Imprescindible antes de tocar o borrar un selector compartido.</li>
            <li>La herramienta <strong>Inspect UI elements</strong> (menú <code>Tools</code>) muestra el árbol jerárquico completo de la máquina (desktop y web, con iconos distintos), permite ver atributos y valores de cada nodo, y capturar varios elementos a la vez marcándolos en el árbol.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Antes de editar o eliminar un UI element compartido, haz siempre <strong>Find usages</strong> primero. Te ahorra romper otra parte del flujo sin darte cuenta.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/inspect-ui-elements" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Inspeccionar un elemento de UI ↗</a>
        </div>
      </article>

      <!-- 5.5 -->
      <article class="doc-section open" id="s55">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">5.5</span><span class="sh-title">Clics, teclado y posición relativa</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Acciones de interacción más usadas:</p>
          <ul>
            <li><code>Click UI element in window</code> — clic dirigido a un UI element. Tiene <strong>Relative position</strong> (dónde dentro del marco rojo del elemento: <em>Center</em>, <em>Left</em>…) y <strong>Offset</strong> (ajuste fino en píxeles desde esa posición) — útil si el clic por defecto no impacta justo donde necesitas.</li>
            <li><code>Move mouse</code> + <code>Send mouse click</code> — el dúo para clics por <strong>coordenadas</strong>: primero mueves el cursor a una posición (con <strong>Relative to</strong>, que define respecto a qué se mide esa posición), luego envías el clic. El propio recorder genera este patrón cuando graba un clic sin UI element disponible.</li>
            <li><code>Move mouse to image</code> / <code>Move mouse to Text on Screen (OCR)</code> — localizan una <strong>imagen</strong> o un <strong>texto en pantalla</strong> y, con la opción <em>Send a click after moving mouse</em>, hacen clic ahí directamente.</li>
            <li><code>Block input</code> — bloquea ratón/teclado del usuario mientras el flujo corre, para que no interfiera. Requiere <strong>permisos de administrador</strong> para ejecutarse.</li>
          </ul>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p><code>Click UI element in window</code> ≈ <code>Click</code> activity; <code>Move mouse to image</code> ≈ Computer Vision <em>Click Image</em>; <code>Block input</code> ≈ <em>SetForegroundWindow + bloqueo</em> que se hace en UiPath para automatización desatendida limpia.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/mouseandkeyboard" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Acciones de ratón y teclado ↗</a>
        </div>
      </article>

      <!-- 5.6 -->
      <article class="doc-section open" id="s56">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">5.6</span><span class="sh-title">Selectores robustos: por qué un flujo grabado deja de funcionar</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Esto cierra el “graba bien pero falla” que dejamos pendiente del Bloque 2. Las causas más comunes cuando un selector se rompe:</p>
          <ul>
            <li><strong>Selectores demasiado largos o frágiles</strong> — cuantos más atributos encadena un selector, más fácil que <strong>uno</strong> de ellos cambie y rompa todo. Menos es más: dos atributos bien elegidos aguantan mejor que diez.</li>
            <li><strong>El elemento es dinámico</strong> — su Id, posición o texto cambian en cada carga (común en webs). Solución: <strong>ancla el selector al padre estable</strong> más cercano y navega desde ahí (por ejemplo: localizar primero el contenedor fijo, y dentro de él, el botón).</li>
            <li><strong>Coordenadas/imagen frente a cambios de pantalla</strong> — resolución distinta, ventana movida o redimensionada, tema visual distinto. Por eso son el último recurso (5.1).</li>
            <li><strong>Mezcla de idioma en selectores de texto</strong> — un selector que depende del atributo <strong>Name</strong>/<strong>Text</strong> se rompe si la app cambia de idioma entre entornos. Para SAP, ya lo viste: por eso se prefiere <strong>ID</strong>.</li>
          </ul>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging · el flujo de diagnóstico</span>
            <p>Si una acción de UI falla: <strong>1)</strong> reproduce manualmente el clic — ¿la app tardó en cargar? añade un <code>Wait</code> o una condición de espera. <strong>2)</strong> abre <strong>Inspect UI elements</strong> y compara los atributos actuales contra los del selector guardado — ¿cambió algo? <strong>3)</strong> si el selector es largo, <strong>pódalo</strong>: quita atributos no esenciales hasta quedarte con los mínimos que siguen identificando el elemento de forma única. <strong>4)</strong> si sigue fallando, plantéate anclar a un padre más estable en vez de al propio elemento dinámico.</p>
          </div>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Aquí cae la pieza de la <strong>web</strong> del robot: dentro del <code>For each</code> (Bloque 4), cada vuelta hará clic en los campos del <strong>formulario web</strong> usando UI elements capturados una vez — con selectores cortos y anclados a contenedores estables, para que aguanten las 1000 iteraciones sin romperse a mitad de lote. El relleno de campos y la extracción de datos los vemos en el Bloque 6.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/ui-elements" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Buenas prácticas de selectores ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 6 ============ -->
    <section class="block-group" id="block-6">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-6">
        <span class="bg-badge">Bloque 06</span>
        <h2 class="bg-head-title">Automatización web</h2>
        <span class="bg-sub">Navegador, formularios y extracción de datos</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-6">

      <!-- 6.1 -->
      <article class="doc-section open" id="s61">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">6.1</span><span class="sh-title">Lanzar y conectar con el navegador</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>La <strong>automatización web</strong> es un caso especial de UI automation pensado para páginas. Antes de tocar nada, necesitas una <strong>instancia de navegador</strong>: la creas con una acción <code>Launch new [Edge/Chrome/Firefox]</code> — los cuatro navegadores principales están soportados (Edge, Chrome, Firefox e Internet Explorer, este último <strong>en desuso</strong>: sigue funcionando en flujos existentes, pero no lo uses en automatizaciones nuevas).</p>
          <p>Para que la automatización funcione necesitas tener instalada la <strong>extensión de navegador</strong> de Power Automate correspondiente, o usar el método <strong>WebDriver</strong> (alternativa más reciente a la extensión). Con la instancia creada, ya puedes encadenar el resto de acciones de navegador apuntando a esa instancia — y, mientras el navegador trabaja, puedes seguir usando tu equipo para otra cosa.</p>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p><code>Launch new browser</code> ≈ <code>Open Browser</code> de UiPath. La <strong>extensión de navegador</strong> ≈ la extensión <em>UiPath Browser Extension</em> que también hay que instalar por navegador.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/webautomation" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de automatización de navegador ↗</a>
        </div>
      </article>

      <!-- 6.2 -->
      <article class="doc-section open" id="s62">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">6.2</span><span class="sh-title">Rellenar formularios web</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Con la instancia de navegador lista, las acciones de <strong>relleno de formularios</strong> son tu kit principal:</p>
          <ul>
            <li><code>Populate text field on web page</code> — escribe texto en un campo (un UI element capturado del campo).</li>
            <li><code>Set drop-down list value on web page</code> — selecciona o limpia un valor de un desplegable.</li>
            <li>Acciones equivalentes para <strong>radio buttons</strong> y <strong>checkboxes</strong> (marcar/seleccionar).</li>
            <li><code>Press button on web page</code> — pulsa un botón (por ejemplo, el submit del formulario).</li>
          </ul>
          <p>Todas estas acciones, igual que en UI de escritorio (Bloque 5), necesitan un <strong>UI element</strong> capturado del elemento en cuestión, además de la instancia de navegador.</p>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Esta es la pieza central del robot: dentro del <code>For each</code> (Bloque 4), cada vuelta hace <code>Populate text field</code> con los datos de la fila actual (<code>%CurrentItem['Campo']%</code>) y termina con <code>Press button on web page</code> para enviar. Con los selectores robustos del Bloque 5, aguanta las 1000 iteraciones.</p>
          </div>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging · cuando el formulario no se rellena</span>
            <p>Si <code>Populate text field</code> falla o escribe en el campo equivocado, sospecha primero del <strong>UI element</strong>: vuelve a capturarlo si la página cambió de estructura. Si el campo se valida con <strong>JavaScript</strong> al perder el foco, a veces hace falta una acción adicional para <strong>disparar ese evento</strong> (hay quien usa un script JS embebido para casos así — lo verás en el Bloque 8).</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/webautomation" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de automatización de navegador ↗</a>
        </div>
      </article>

      <!-- 6.3 -->
      <article class="doc-section open" id="s63">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">6.3</span><span class="sh-title">Extraer datos de una página</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Para sacar información de una web tienes dos niveles:</p>
          <ul>
            <li><code>Get details of web page</code> — propiedades de la <strong>página entera</strong> (seis opciones: título, URL, texto fuente, etc.). Se guarda en una variable de texto.</li>
            <li><code>Get details of element on web page</code> — una propiedad de un <strong>elemento concreto</strong> (un UI element capturado).</li>
            <li><code>Extract data from web page</code> — la potente: extrae <strong>valores individuales, listas, filas o tablas completas</strong> de partes concretas de la página, en un solo paso.</li>
          </ul>
          <p>No todas las propiedades existen siempre (por ejemplo, una página sin meta keywords). Comprueba el resultado con un <code>If</code> sobre si la variable viene <strong>vacía</strong>, y configura <strong>On error → continuar</strong> en la acción si quieres que el flujo siga aunque ese dato puntual falle.</p>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p><code>Extract data from web page</code> ≈ <code>Extract Structured Data</code> / Data Scraping wizard de UiPath; <code>Get details of element</code> ≈ <code>Get Attribute</code>.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/how-to/retrieve-details-web-page" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Recuperar detalles de una página web ↗</a>
        </div>
      </article>

      <!-- 6.4 -->
      <article class="doc-section open" id="s64">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">6.4</span><span class="sh-title">Esperas y sincronización: el timing en la web</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>La web es <strong>asíncrona</strong> por naturaleza (cargas, peticiones, animaciones): es donde más aparece el "graba bien pero falla" del Bloque 2. Tu defensa:</p>
          <ul>
            <li><code>Wait for web page content</code> — suspende el flujo hasta que un <strong>texto o elemento aparece o desaparece</strong> de la página. Mucho más fiable que un <code>Wait</code> fijo de segundos, porque se adapta a la velocidad real de carga.</li>
            <li><code>If web page content</code> — bloque condicional según si un texto/elemento existe o no en la página, para ramificar la lógica.</li>
            <li><code>Wait</code> (genérico, visto en el Bloque 4) — el último recurso cuando no hay un elemento claro que esperar.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Prioriza <strong>siempre</strong> <code>Wait for web page content</code> sobre un <code>Wait</code> de segundos fijos: un <code>Wait 5</code> es lento cuando la página carga rápido, e insuficiente el día que carga lento. Esperar a un elemento concreto se adapta solo.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/webautomation" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de automatización de navegador ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 7 ============ -->
    <section class="block-group" id="block-7">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-7">
        <span class="bg-badge">Bloque 07</span>
        <h2 class="bg-head-title">Excel, archivos y datos</h2>
        <span class="bg-sub">El listado de facturas y el PDF adjunto, controlados</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-7">

      <!-- 7.1 -->
      <article class="doc-section open" id="s71">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">7.1</span><span class="sh-title">Excel: instancia, lanzar y adjuntar a uno ya abierto</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Igual que con el navegador (Bloque 6), todo empieza con una <strong>instancia de Excel</strong>:</p>
          <ul>
            <li><code>Launch Excel</code> — abre un archivo nuevo o existente y genera una variable <code>ExcelInstance</code>. Si el archivo tiene contraseña, se indica en la sección <strong>Advanced</strong> de la acción.</li>
            <li><code>Attach to running Excel</code> — se engancha a un Excel <strong>ya abierto</strong> en vez de lanzar uno nuevo. Evita bloqueos de archivo y es útil si otro proceso (o persona) ya lo tiene abierto.</li>
          </ul>
          <p>Toda acción de Excel posterior necesita que le indiques <strong>a qué instancia</strong> se refiere — puedes tener varias instancias abiertas a la vez (por ejemplo, una para leer y otra para escribir, como en flujos de copiar datos entre libros).</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Marca la instancia como <strong>visible</strong> mientras desarrollas: ver el Excel en pantalla mientras el flujo actúa ayuda muchísimo a depurar paso a paso. Ocúltala solo cuando el flujo esté terminado y vaya a producción.</p>
          </div>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p><code>Launch Excel</code> ≈ <code>Excel Application Scope</code>; <code>Attach to running Excel</code> ≈ <code>Use Excel File</code> apuntando a una instancia ya abierta. El concepto de <strong>instancia explícita</strong> que pasas de acción en acción es más manual aquí que en UiPath, donde el scope la mantiene implícita.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/training/modules/pad-excel-automation/" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Automatización de Excel en Power Automate for desktop ↗</a>
        </div>
      </article>

      <!-- 7.2 -->
      <article class="doc-section open" id="s72">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">7.2</span><span class="sh-title">Leer y escribir en Excel</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Las acciones que más vas a usar:</p>
          <ul>
            <li><code>Read from Excel worksheet</code> — lee una <strong>celda individual</strong> o un <strong>rango</strong>. Cuando lees un rango, el resultado es una <strong>Datatable</strong> (el tipo que ya conoces del Bloque 3): justo lo que necesitas para recorrer un listado con un <code>For each</code>.</li>
            <li><code>Write to Excel worksheet</code> — escribe un valor o un rango en una posición concreta.</li>
            <li><code>Get first free column/row from Excel worksheet</code> — encuentra dónde <strong>acaba</strong> la última fila/columna con datos, para escribir <strong>a continuación</strong> sin pisar nada. Imprescindible al ir añadiendo filas (por ejemplo, el log de resultados de tu robot).</li>
            <li><code>Get active Excel worksheet</code> / <code>Set active Excel worksheet</code> — leen o cambian la <strong>hoja activa</strong> cuando el libro tiene varias pestañas.</li>
            <li><code>Copy cells from Excel worksheet</code> / <code>Paste cells to Excel worksheet</code> — copian rangos entre instancias o posiciones, útil para mover datos entre libros.</li>
            <li><code>Save Excel</code> / <code>Close Excel</code> — guardan y cierran al terminar, liberando el archivo.</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Aquí se cierra la primera mitad del robot: <code>Launch Excel</code> con la ruta de entrada (Bloque 3) → <code>Read from Excel worksheet</code> trae el listado entero como <strong>Datatable</strong> → el <code>For each</code> (Bloque 4) la recorre fila a fila → cada vuelta rellena el formulario web (Bloque 6). Para el <strong>informe final</strong> (OK/KO por correo), usaremos <code>Get first free row</code> + <code>Write to Excel worksheet</code> para ir anotando el resultado de cada factura conforme se procesa.</p>
          </div>
          <a class="source" href="https://github.com/MicrosoftDocs/power-automate-docs/blob/main/articles/desktop-flows/actions-reference/excel.md" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de Excel ↗</a>
        </div>
      </article>

      <!-- 7.3 -->
      <article class="doc-section open" id="s73">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">7.3</span><span class="sh-title">Archivos: localizar, copiar, mover y comprobar</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Para trabajar con archivos sueltos (tus PDFs de factura, por ejemplo):</p>
          <ul>
            <li><code>Get files in folder</code> — la acción de partida: devuelve una <strong>lista de archivos</strong> de una carpeta. Admite un <strong>filtro</strong> (por defecto <code>*</code>, todos; puedes poner <code>*.pdf</code> para solo PDFs) e <strong>Include subfolders</strong> para incluir subcarpetas.</li>
            <li><code>Copy file(s)</code> / <code>Move file(s)</code> — admiten una ruta única, una variable de archivo, o una <strong>lista</strong> entera de archivos a la vez, hacia una carpeta destino. <code>If file exists</code> en destino se resuelve con <strong>Overwrite</strong> o <strong>Do nothing</strong>.</li>
            <li><code>Rename file(s)</code> — renombra en lote (añadir, sustituir o quitar texto del nombre).</li>
            <li><code>Delete file(s)</code> — borra uno o varios.</li>
            <li><code>If file exists</code> (condicional, visto en el Bloque 4) — comprueba antes de operar.</li>
            <li><code>Wait for file</code> — suspende el flujo hasta que un archivo se <strong>crea o se borra</strong>. Útil si esperas que algo deposite un fichero (una exportación, una descarga) antes de seguir.</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>El adjunto del PDF se resuelve así: por cada fila del Excel tienes el <strong>nombre o ID de factura</strong>; con ese dato construyes la ruta esperada (<code>%CarpetaPDFs% + %CurrentItem['ID']% + '.pdf'%</code>) y compruebas con <strong>If file exists</strong> antes de intentar adjuntarlo en el formulario — así, si falta un PDF, lo marcas como <strong>KO</strong> en el informe (Bloque 11) en vez de que el flujo se caiga.</p>
          </div>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging</span>
            <p>Si <code>Get files in folder</code> devuelve <strong>menos archivos</strong> de los esperados, revisa el <strong>filtro</strong> (mayúsculas/minúsculas no suelen importar, pero la extensión exacta sí) y si <strong>Include subfolders</strong> debería estar activado.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/file" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de archivo ↗</a>
        </div>
      </article>

      <!-- 7.4 -->
      <article class="doc-section open" id="s74">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">7.4</span><span class="sh-title">Carpetas: explorar, crear y organizar</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>El equivalente a las acciones de archivo, pero para <strong>carpetas enteras</strong>:</p>
          <ul>
            <li><code>Get special folder</code> — recupera la ruta de carpetas estándar de Windows (Escritorio, Mis Imágenes, caché de Internet…) <strong>sin hardcodear</strong> la ruta — válido para cualquier usuario o máquina que ejecute el flujo.</li>
            <li><code>Create folder</code> — crea una carpeta nueva.</li>
            <li><code>Get subfolders in folder</code> — lista las subcarpetas de una carpeta (se puede ordenar por fecha de creación o nombre).</li>
            <li><code>Copy folder</code> / <code>Move folder</code> / <code>Rename folder</code> / <code>Delete folder</code> — gestión completa, con la misma lógica de <strong>Overwrite/Do nothing</strong> que vimos en archivos.</li>
            <li><code>Empty folder</code> — borra todo el contenido (archivos y subcarpetas) <strong>sin</strong> borrar la carpeta en sí.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Usa <code>Get special folder</code> en vez de escribir <code>C:\Users\TuNombre\Desktop</code> a mano: si el flujo se despliega en otra máquina o lo ejecuta otro usuario (Bloque 13), la ruta hardcodeada rompe y la especial no.</p>
          </div>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p><code>Get special folder</code> ≈ <code>Environment.GetFolderPath()</code> de UiPath; <code>Get files in folder</code> ≈ <code>Directory.GetFiles</code>. Mismo concepto, acción ya empaquetada sin necesidad de código.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/folder" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de carpeta ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 8 ============ -->
    <section class="block-group" id="block-8">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-8">
        <span class="bg-badge">Bloque 08</span>
        <h2 class="bg-head-title">Datos, scripting y técnicas</h2>
        <span class="bg-sub">La escotilla de escape cuando PAD solo no llega</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-8">

      <!-- 8.1 -->
      <article class="doc-section open" id="s81">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">8.1</span><span class="sh-title">Scripting: PowerShell, Python, VBScript, JavaScript y C#/VB.NET</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Lo que pediste explícitamente: PAD <strong>sí</strong> ejecuta código de verdad dentro de un flujo, vía las <strong>acciones de scripting</strong>. Es tu escotilla de escape cuando una acción nativa no llega — lógica compleja, llamadas a APIs específicas, manipulación que PAD no ofrece de fábrica. Lenguajes disponibles:</p>
          <ul>
            <li><code>Run PowerShell script</code> — el más usado en entornos Windows/empresa: gestiona sistema de archivos, registro y cualquier comando de la consola de PowerShell.</li>
            <li><code>Run Python script</code> — para lógica de datos o librerías que ya conozcas de Python.</li>
            <li><code>Run JavaScript</code> — de propósito general aquí (no solo para páginas web).</li>
            <li><code>Run DOS command</code> — comandos de la consola clásica de Windows (CMD).</li>
            <li><code>Run .NET script (C#/VB.NET)</code> — la incorporación más reciente: ejecuta código C# (v5.0) o VB.NET (v11.0) directamente.</li>
            <li><code>Run VBScript</code> — <strong>existe, pero está deprecado</strong>: Microsoft anunció en 2023 su retirada progresiva de Windows. No lo uses en flujos nuevos.</li>
          </ul>
          <p>Cada lenguaje devuelve resultados a su manera: <strong>PowerShell</strong> declara con <code>$</code> y devuelve con <code>Write-Output</code>; <strong>Python</strong> no necesita notación especial y devuelve con <code>print</code>; <strong>VBScript</strong> devuelve con <code>WScript.Echo</code>; <strong>JavaScript</strong> declara con <code>var</code> y también usa <code>WScript.Echo</code>. El resultado queda en una variable de salida propia de cada acción (p. ej. <code>PowershellOutput</code>), junto a una variable de <strong>error</strong> (<code>ScriptError</code>) si algo falla.</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco · genera el script con IA</span>
            <p>Las cinco acciones de scripting (PowerShell, VBScript, DOS, Python, JavaScript) tienen <strong>"natural language to script"</strong> de Copilot: describes en español/inglés lo que quieres que haga el script, y la IA te genera el código. Revisa siempre el resultado antes de confiar en él — disponible solo con cuenta profesional/educativa, y según región del tenant.</p>
          </div>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p>Estas acciones ≈ <code>Invoke Code</code> / <code>Invoke PowerShell</code> de UiPath. La diferencia clave: en PAD cada lenguaje tiene su <strong>propia acción dedicada</strong> en vez de un único Invoke Code configurable por lenguaje.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/scripting" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de scripting ↗</a>
        </div>
      </article>

      <!-- 8.2 -->
      <article class="doc-section open" id="s82">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">8.2</span><span class="sh-title">Texto y expresiones regulares</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Manipular texto sin tener que tirar de scripting:</p>
          <ul>
            <li><code>Join text</code> — une una lista en un solo texto con un delimitador.</li>
            <li><code>Split text</code> — parte un texto en lista, por delimitador (o expresión regular).</li>
            <li><code>Replace text</code> — sustituye una subcadena por otra (también admite regex).</li>
            <li><code>Parse text</code> — busca la primera (o todas) las apariciones de un patrón; con <strong>Is regular expression</strong> activado, ese patrón puede ser una regex. Desactivando <strong>First occurrence only</strong> devuelve una lista de coincidencias y otra de posiciones.</li>
            <li><code>Crop text</code> — recorta un texto usando marcadores (la primera aparición de un carácter o cadena).</li>
          </ul>
          <p>El motor de expresiones regulares de PAD es el de <strong>.NET</strong> — la misma sintaxis que ya conoces si has tocado regex en C# o PowerShell.</p>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Útil para construir el <strong>nombre del PDF</strong> a partir del ID de factura (concatenar/recortar texto), o para <strong>validar el formato</strong> de un campo del Excel (p. ej. comprobar con regex que un NIF/CIF tiene el patrón correcto) antes de lanzarlo al formulario web.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/text" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de texto ↗</a>
        </div>
      </article>

      <!-- 8.3 -->
      <article class="doc-section open" id="s83">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">8.3</span><span class="sh-title">JSON y objetos personalizados</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Cuando trabajas con APIs (8.4) o datos estructurados, el <strong>custom object</strong> (Bloque 3) es tu puente con JSON:</p>
          <ul>
            <li>Acciones de variables incluyen <strong>convertir un custom object a texto JSON</strong> — para enviarlo en el cuerpo de una petición HTTP, por ejemplo.</li>
            <li>Para ir en sentido contrario (texto JSON → objeto navegable con <code>%Objeto.Propiedad%</code>), se usa la acción equivalente de <strong>parseo de JSON</strong> dentro del mismo grupo de acciones.</li>
            <li><code>Create new list</code> / <code>Add item to list</code> — para construir listas dinámicamente, por ejemplo antes de convertirlas o de iterarlas.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Si una API te devuelve JSON y solo necesitas <strong>un campo suelto</strong>, no siempre hace falta parsear el objeto entero: a veces es más rápido un <code>Parse text</code> con regex sobre el texto crudo de la respuesta. Para estructuras anidadas o varios campos, el objeto parseado es más mantenible.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/variables" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de variables ↗</a>
        </div>
      </article>

      <!-- 8.4 -->
      <article class="doc-section open" id="s84">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">8.4</span><span class="sh-title">HTTP/REST y descargas web</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Cuando el sistema de destino tiene <strong>API</strong> en vez de (o además de) interfaz web, no hace falta automatizar clics:</p>
          <ul>
            <li><code>Invoke web service</code> — la acción HTTP genérica: URL, método (GET/POST/PUT…), tipo de contenido de petición y respuesta (JSON, XML…), <strong>cabeceras personalizadas</strong> y cuerpo de la petición. Si el servidor requiere autenticación, se configura en <strong>Advanced</strong>. El resultado llega a la variable <code>WebServiceResponse</code>; si la respuesta es un archivo, puedes guardarlo localmente.</li>
            <li><code>Download from web</code> — más simple: descarga texto o un archivo de una URL (también con autenticación opcional). El texto cae en <code>WebPageText</code>.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>La autenticación <strong>NTLM</strong> actualmente <strong>no está soportada</strong> en las peticiones web de PAD. Si el servidor de destino la exige, necesitarás otra vía (por ejemplo, un script de PowerShell con sus propias librerías de autenticación, visto en 8.1).</p>
          </div>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p><code>Invoke web service</code> ≈ <code>HTTP Request</code> de UiPath; <code>Download from web</code> ≈ <code>Download File</code>. Mismo patrón URL + método + headers + body.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/web" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones HTTP/web ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 9 ============ -->
    <section class="block-group" id="block-9">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-9">
        <span class="bg-badge">Bloque 09</span>
        <h2 class="bg-head-title">Email y sistema</h2>
        <span class="bg-sub">El informe final del robot, y tocar el sistema operativo</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-9">

      <!-- 9.1 -->
      <article class="doc-section open" id="s91">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">9.1</span><span class="sh-title">Tres formas de mandar correo: cuál usar</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>PAD tiene <strong>tres grupos de acciones</strong> distintos para email, y elegir el correcto te ahorra disgustos:</p>
          <ul>
            <li><strong>Outlook</strong> — automatiza el <strong>Outlook de escritorio instalado</strong> en tu máquina, como si fueras tú haciendo clic. Necesita Outlook abierto/instalable en la máquina que ejecuta el flujo.</li>
            <li><strong>Email (genérico)</strong> — habla directo con un servidor por <strong>IMAP</strong> (leer) o <strong>SMTP</strong> (enviar), sin pasar por ninguna aplicación. Funciona aunque no haya Outlook instalado.</li>
            <li><strong>Office 365 Outlook</strong> — usa el <strong>conector de Office 365</strong> (el mismo que usan los cloud flows) directamente desde el desktop flow, sin necesidad de tener Outlook abierto ni de crear un flujo de nube aparte. Requiere licencia <strong>Attended RPA</strong>, y un administrador puede desactivarlo por política DLP.</li>
            <li><strong>Exchange Server</strong> — para organizaciones con servidor Exchange propio (on-premise), vía conexión directa al servidor.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco · cuál elegir</span>
            <p>Si la máquina que ejecuta el flujo <strong>no tiene garantizado</strong> tener Outlook abierto (por ejemplo, una MV desatendida, Bloque 13), usa <strong>Email genérico (SMTP)</strong> u <strong>Office 365 Outlook</strong> — ambas evitan depender de que la aplicación esté corriendo. Reserva las acciones de <strong>Outlook</strong> para escenarios atendidos donde sabes que Outlook está abierto.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/training/modules/pad-email/" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Automatización de email en Power Automate for desktop ↗</a>
        </div>
      </article>

      <!-- 9.2 -->
      <article class="doc-section open" id="s92">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">9.2</span><span class="sh-title">Outlook de escritorio: el aviso que tienes que saber</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Esto es justo lo que preguntabas — apps "pesadas" que no funcionan si no están en las condiciones correctas. Acciones del grupo Outlook:</p>
          <ul>
            <li><code>Launch Outlook</code> — abre Outlook y crea la <strong>instancia</strong> que necesitan el resto de acciones (igual que Excel y el navegador).</li>
            <li><code>Retrieve email messages from Outlook</code> — trae mensajes de una cuenta/carpeta, con filtros (remitente, asunto, cuerpo…) y guarda adjuntos automáticamente si coinciden.</li>
            <li><code>Send email message through Outlook</code> — crea y envía un correo nuevo.</li>
            <li><code>Process email messages in Outlook</code> — mover, borrar o marcar como leído/no leído sobre los mensajes ya recuperados.</li>
            <li><code>Save Outlook email messages</code> / <code>Respond to Outlook message</code> (reply, reply all, forward) / <code>Close Outlook</code>.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · el aviso crítico</span>
            <p>Las acciones de <strong>Outlook automation NO soportan la nueva aplicación "Outlook para Windows"</strong> (la rediseñada, basada en web). Solo funcionan con el <strong>Outlook de escritorio clásico</strong>. Si tu organización ha migrado al Outlook nuevo, estas acciones <strong>no van a funcionar</strong> — la alternativa es <strong>Email genérico (SMTP/IMAP)</strong> u <strong>Office 365 Outlook</strong> (9.1), ninguna de las dos depende de qué versión de Outlook esté instalada.</p>
          </div>
          <p>Un matiz adicional sobre filtros: si filtras por remitente/destinatario (<code>From contains</code>/<code>To contains</code>) y las direcciones están guardadas en formato <strong>X.500</strong> (típico en entornos Exchange corporativos antiguos) en vez de SMTP normal, el filtro <strong>no encontrará resultados</strong> aunque la dirección sea correcta en formato visible.</p>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Aquí se cierra el robot: tras el <code>For each</code> (Bloque 4), con la Datatable de resultados OK/KO acumulada (Bloque 7), generas el cuerpo del informe — puedes activar <strong>Send as HTML</strong> en la acción de envío para dar formato (tabla, colores) en vez de texto plano — y lo mandas con <code>Send email message through Outlook</code> u, <strong>si la máquina desatendida no tiene Outlook</strong>, con <strong>Email genérico</strong>.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/outlook" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de Outlook ↗</a>
        </div>
      </article>

      <!-- 9.3 -->
      <article class="doc-section open" id="s93">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">9.3</span><span class="sh-title">Email genérico (IMAP/SMTP), Office 365 Outlook y Exchange</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p><strong>Email genérico:</strong> antes de cualquier acción, configuras el <strong>servidor</strong> — <code>Retrieve email messages</code> y <code>Process email messages</code> necesitan un servidor <strong>IMAP</strong>; <code>Send email</code> necesita uno <strong>SMTP</strong>. No dependen de ninguna aplicación instalada: funcionan en cualquier máquina con conexión al servidor de correo.</p>
          <p><strong>Office 365 Outlook</strong> (conector dentro del desktop flow): mismas acciones y mismos parámetros que usarías en un cloud flow, pero sin salir de PAD. Para <strong>adjuntar archivos</strong>, primero hay que convertirlos con <code>Convert file to binary data</code>.</p>
          <p><strong>Exchange Server:</strong> primero <code>Connect to Exchange server</code> para abrir la conexión; luego <code>Retrieve Exchange email messages</code>, <code>Process Exchange email messages</code> y <code>Send Exchange email message</code> — mismo patrón que Outlook, pero contra el servidor directamente.</p>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p>El grupo <strong>Outlook</strong> ≈ las actividades de <em>Outlook Desktop</em> de UiPath; <strong>Email genérico (IMAP/SMTP)</strong> ≈ las actividades <em>IMAP/SMTP Mail</em>; <strong>Exchange</strong> ≈ <em>Exchange Scope</em>. Mismo abanico de opciones, repartido en grupos de acciones distintos en vez de un único scope configurable.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/email" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de email genérico ↗</a>
        </div>
      </article>

      <!-- 9.4 -->
      <article class="doc-section open" id="s94">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">9.4</span><span class="sh-title">Sistema: procesos, servicios y CMD</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Para interactuar con el sistema operativo más allá de las aplicaciones:</p>
          <ul>
            <li><code>If process</code> / <code>If service</code> (condicionales, ya vistos en el Bloque 4) — comprueban si un proceso o servicio de Windows está <strong>en ejecución, pausado o detenido</strong> antes de actuar.</li>
            <li><code>Run application</code> — lanza un programa por su ruta ejecutable (alternativa genérica a <code>Launch Excel</code>/<code>Launch Outlook</code> para aplicaciones sin acciones dedicadas).</li>
            <li><code>Run DOS command</code> (Bloque 8) — para comandos puntuales de consola sin montar un script completo.</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Con esto, el robot completo queda definido de principio a fin: Excel → bucle → web + PDF → registro de resultados → informe por correo. El <strong>Bloque 19 (capstone)</strong> lo ensambla todo en un único flujo construible paso a paso.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/conditionals" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Acciones condicionales If process / If service ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 10 ============ -->
    <section class="block-group" id="block-10">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-10">
        <span class="bg-badge">Bloque 10</span>
        <h2 class="bg-head-title">SAP (ECC on-premise)</h2>
        <span class="bg-sub">GUI Scripting de escritorio, no automatización web</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-10">

      <!-- 10.1 -->
      <article class="doc-section open" id="s101">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">10.1</span><span class="sh-title">R/3, ECC, S/4HANA: aclaración importante — no son variantes, son el mismo linaje renombrado</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p><strong>Precisión que conviene fijar bien:</strong> R/3 y ECC <strong>no son dos sistemas distintos que convivan o se combinen</strong> — son el <strong>mismo producto con nombre distinto según la época</strong>. La cronología, confirmada en la propia comunidad oficial de SAP:</p>
          <ul>
            <li><strong>SAP R/3</strong> — lanzado en 1992. Arquitectura cliente-servidor de <strong>tres capas</strong> (de ahí el "3"). Fue el nombre del producto durante los 90 y primeros 2000.</li>
            <li>R/3 fue <strong>renombrado a SAP ERP</strong>, y más tarde <strong>renombrado de nuevo a SAP ECC</strong> (ERP Central Component) — lanzado en 2004. <strong>ECC es la evolución directa de R/3, construida sobre su misma base</strong>, no un sistema paralelo.</li>
            <li><strong>ECC 6.0</strong> (con el Enhancement Package 8, de 2016) es la <strong>última versión</strong> de esta línea — no hay "ECC 7" ni versiones más nuevas: la siguiente generación ya se llama <strong>S/4HANA</strong> (2015), un rediseño completo sobre base de datos HANA, con interfaz moderna Fiori (web).</li>
          </ul>
          <p>Así que si tu empresa dice <strong>"SAP ECC"</strong>, es la generación que sustituyó a R/3 — <strong>no existe un "ECC R/3" combinado</strong>. Es perfectamente normal que la gente use ambos nombres indistintamente en el día a día (mucha documentación y muchos usuarios veteranos siguen diciendo "R/3" por costumbre aunque el sistema real ya sea ECC), pero técnicamente son la misma línea de producto en dos momentos de su vida.</p>
          <p>Confirmado para tu caso: <strong>ECC on-premise con SAP GUI es 100% escritorio</strong>, no hay interfaz web de por medio. Por eso la automatización correcta es <strong>SAP GUI Scripting</strong> (este bloque), no automatización de navegador (Bloque 6).</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>¿Dudas de qué tienes? Mira el icono y el cliente que abres a diario: si es la ventana clásica con menú de árbol a la izquierda y transacciones tipo <code>FB60</code>/<code>MIRO</code> (típicas de facturas, ver 10.6), es <strong>SAP GUI sobre ECC</strong> — exactamente este bloque. Otra pista: en SAP GUI, el menú <code>System → Status</code> te muestra el release exacto (p. ej. "SAP ECC 6.0").</p>
          </div>
          <a class="source" href="https://community.sap.com/t5/enterprise-resource-planning-q-a/difference-between-sap-ecc-sap-r-3-sap-erp/qaq-p/9979730" target="_blank" rel="noopener">Fuente oficial · SAP Community — Diferencia entre SAP ECC, SAP R/3, SAP ERP ↗</a>
        </div>
      </article>

      <!-- 10.2 -->
      <article class="doc-section open" id="s102">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">10.2</span><span class="sh-title">Activar el scripting: lado servidor y lado cliente</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>SAP GUI Scripting viene <strong>desactivado por defecto</strong> (es una medida de seguridad de SAP). Hay que habilitarlo en <strong>dos sitios</strong>, y necesitarás a tu equipo de SAP para el primero:</p>
          <ul>
            <li><strong>Lado servidor</strong> (requiere <strong>acceso de administrador SAP</strong>): transacción <code>RZ11</code> → parámetro <code>sapgui/user_scripting</code> → comprobar su valor. Si está en <code>FALSE</code>, cambiarlo a <code>TRUE</code> y guardar. Si aparece el aviso <em>"Change not permanent, will be lost at server restart"</em>, hay que fijarlo de forma permanente vía <code>RZ10</code> y <strong>reiniciar el servidor</strong> para que aplique de verdad.</li>
            <li><strong>Lado cliente</strong> (en tu propio SAP GUI): <code>SAP GUI Options → Accessibility & Scripting → Scripting</code> → activar <strong>Enable scripting</strong> (y desactivar el resto de opciones de esa sección). Después, en <code>Security → Security Settings → Security Module → Open Security Configuration</code>, ajusta la acción por defecto (puedes marcar <strong>Allow as Default Action</strong> para que no salte un diálogo de seguridad cada vez que el script guarda un archivo).</li>
            <li><strong>Permisos de usuario:</strong> cada usuario que vaya a <strong>ejecutar</strong> los flujos automatizados necesita la autorización <code>S_SCR</code> asignada. Sin ella, las acciones de scripting fallan aunque todo lo demás esté bien configurado.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>Esto <strong>no lo decides ni lo activas tú solo</strong> desde tu puesto: necesitas coordinarte con el equipo de SAP de IMA para el parámetro de servidor y la autorización <code>S_SCR</code>. Llévate esta sección como checklist a esa conversación.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/how-to/sap-gui-scripting-configuration" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Configurar SAP GUI Scripting para Power Automate ↗</a>
        </div>
      </article>

      <!-- 10.3 -->
      <article class="doc-section open" id="s103">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">10.3</span><span class="sh-title">Conectar y navegar por transacción</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Con el scripting habilitado, el grupo de acciones <strong>SAP</strong> de PAD te da:</p>
          <ul>
            <li><code>Launch SAP</code> — abre el cliente SAP GUI y se conecta a un sistema. El <strong>modo de conexión</strong> puede ser por <strong>descripción de servidor</strong> (nombre/IP del sistema SAP, más credenciales de acceso) entre otras opciones.</li>
            <li><strong>Select SAP menu item</strong> / <strong>Select SAP navigation item</strong> (esta última, incorporada en una build reciente) — navega por menús y la barra de herramientas de la ventana SAP sin necesidad de clics simulados por coordenadas.</li>
            <li>Acciones de <strong>interacción</strong>: rellenar campos de texto, hacer clic en botones, extraer datos de un elemento SAP — todas dentro del mismo grupo, con la misma lógica que las acciones de UI de escritorio (Bloque 5), pero adaptadas a SAP.</li>
          </ul>
          <p><strong>Requisito de versión:</strong> Power Automate for desktop soporta automatización con <strong>SAP GUI versión 750 o posterior</strong>. Si tu cliente SAP GUI es más antiguo, hay que actualizarlo antes de automatizar.</p>
          <div class="callout callout--bridge">
            <span class="c-tag">Puente UiPath → PAD</span>
            <p>El grupo de acciones SAP de PAD ≈ el paquete <strong>SAP Activities</strong> de UiPath. Ambos se apoyan en la misma API subyacente: <strong>SAP GUI Scripting</strong>, propiedad de SAP, no de Microsoft ni de UiPath — por eso la activación (10.2) es idéntica sea cual sea la herramienta de automatización.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/sap" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de SAP ↗</a>
        </div>
      </article>

      <!-- 10.4 -->
      <article class="doc-section open" id="s104">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">10.4</span><span class="sh-title">IDs en vez de texto: por qué el francés deja de importar</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Esto es lo que cambia tu problema del francés. En el Bloque 5 viste los <strong>selectores de texto</strong> (atributo Name/Text). Para SAP, la doc oficial es explícita: <strong>las acciones de SAP usan el atributo Text en vez de Name</strong> para automatización de escritorio normal, pero para SAP en concreto <strong>la práctica recomendada es ir por el atributo <code>ID</code></strong> en vez de por texto.</p>
          <ul>
            <li>Con las acciones de SAP de PAD, interactúas con un elemento <strong>introduciendo directamente el valor de su atributo ID</strong> — no su etiqueta visible, no su posición en pantalla.</li>
            <li>Si no conoces el ID, usas el <strong>selector de elementos de PAD</strong> (UI element picker) para capturar el elemento SAP: al hacerlo así, PAD recupera <strong>solo el valor del ID</strong> — no añade el elemento al repositorio de UI elements del flujo, como sí hace con apps normales (Bloque 5).</li>
            <li>El <strong>ID de un campo SAP es el mismo</strong> independientemente del idioma de la interfaz: el campo de "Fecha de factura" tiene el mismo ID interno tanto si tu SAP está en francés, inglés o español. <strong>Por eso automatizar por ID hace que el idioma del cliente sea irrelevante</strong> para el flujo — exactamente lo que necesitas con tu SAP en francés.</li>
          </ul>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging · cuando un campo SAP no responde</span>
            <p>Si una acción SAP falla al rellenar o leer un campo, antes de sospechar del idioma comprueba: <strong>1)</strong> ¿capturaste el <strong>ID</strong> correcto con el picker, o quedó un valor manual mal escrito? <strong>2)</strong> ¿la transacción cambió de <strong>pantalla/paso</strong> respecto a cuando capturaste el elemento (los IDs pueden repetirse entre pantallas distintas de la misma transacción)? <strong>3)</strong> ¿el scripting sigue <strong>activado</strong> (10.2) — a veces se desactiva tras un reinicio de servidor si no se fijó por <code>RZ10</code>?</p>
          </div>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · variante SAP</span>
            <p>El mismo patrón del robot de facturas (Bloques 3-9) se traslada aquí: <code>Read from Excel</code> trae el listado → <code>For each</code> recorre cada factura → en vez de un formulario web, <code>Launch SAP</code> + navegación por transacción (p. ej. <code>FB60</code>/<code>MIRO</code>) + relleno por <strong>ID</strong> de cada campo → registro de resultado e informe final por correo (Bloque 9), exactamente igual.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/ui-elements" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Selectores de texto y atributo ID para SAP ↗</a>
        </div>
      </article>

      <!-- 10.5 -->
      <article class="doc-section open" id="s105">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">10.5</span><span class="sh-title">El grabador de SAP, y glosario FR → ES de lo que verás en pantalla</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>PAD tiene un <strong>desktop recorder</strong> (Bloque 2) que también funciona sobre SAP: traduce tus clics y pulsaciones en SAP GUI a acciones del flujo automáticamente. Igual que con cualquier grabación (Bloque 2.5): úsalo para el <strong>esqueleto</strong>, luego <strong>sustituye los valores fijos</strong> capturados por tus variables (el ID de factura, el importe…) para que el flujo sea dinámico y no repita siempre los mismos datos de prueba.</p>
          <p>SAP también tiene su <strong>propio motor de grabación</strong> (distinto al de PAD): genera <strong>VBScript</strong> basado en tus interacciones, que puedes pegar dentro de una acción <code>Run VBScript</code> de PAD (Bloque 8) y sustituir los valores fijos por variables — una vía "pro-code" alternativa al uso de las acciones SAP dedicadas.</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco · mientras aprendes, traduce sobre la marcha</span>
            <p>Como tu SAP está en francés, aquí tienes un <strong>glosario rápido</strong> de los términos que verás más a menudo al automatizar. Toca cada término (o el botón) para ver su traducción al instante — sin salir de la guía:</p>
            <button class="fr-toggle-all">🇫🇷 Traducir todo el francés</button>
            <table class="tbl">
              <thead><tr><th>En tu SAP (FR)</th><th>Dónde lo verás</th></tr></thead>
              <tbody>
                <tr><td><span class="fr-term"><span class="fr-flag">🇫🇷</span>Facture entrante<span class="fr-es">→ Factura entrante</span></span></td><td>Título de transacciones tipo MIRO/FB60.</td></tr>
                <tr><td><span class="fr-term"><span class="fr-flag">🇫🇷</span>Fournisseur<span class="fr-es">→ Proveedor</span></span></td><td>Campo de cabecera de la factura.</td></tr>
                <tr><td><span class="fr-term"><span class="fr-flag">🇫🇷</span>Date de la facture<span class="fr-es">→ Fecha de factura</span></span></td><td>Campo de cabecera.</td></tr>
                <tr><td><span class="fr-term"><span class="fr-flag">🇫🇷</span>Montant<span class="fr-es">→ Importe</span></span></td><td>Campo de importe total.</td></tr>
                <tr><td><span class="fr-term"><span class="fr-flag">🇫🇷</span>Société<span class="fr-es">→ Sociedad</span></span></td><td>Selector de empresa/sociedad SAP.</td></tr>
                <tr><td><span class="fr-term"><span class="fr-flag">🇫🇷</span>Enregistrer<span class="fr-es">→ Guardar</span></span></td><td>Botón de guardar (también ícono de disquete).</td></tr>
                <tr><td><span class="fr-term"><span class="fr-flag">🇫🇷</span>Annuler<span class="fr-es">→ Cancelar</span></span></td><td>Botón de cancelar.</td></tr>
                <tr><td><span class="fr-term"><span class="fr-flag">🇫🇷</span>Poste<span class="fr-es">→ Posición / línea</span></span></td><td>Cada línea de detalle de la factura.</td></tr>
                <tr><td><span class="fr-term"><span class="fr-flag">🇫🇷</span>Compte<span class="fr-es">→ Cuenta (contable)</span></span></td><td>Campo de cuenta contable por línea.</td></tr>
                <tr><td><span class="fr-term"><span class="fr-flag">🇫🇷</span>Erreur<span class="fr-es">→ Error</span></span></td><td>Mensajes de la barra de estado SAP.</td></tr>
                <tr><td><span class="fr-term"><span class="fr-flag">🇫🇷</span>Document enregistré<span class="fr-es">→ Documento guardado</span></span></td><td>Mensaje de confirmación tras guardar.</td></tr>
              </tbody>
            </table>
            <p style="margin-top:10px"><strong>Esto es un punto de partida, no un diccionario completo</strong> — iré ampliándolo con los términos exactos que te vayan saliendo en tus transacciones reales de financiero. Dime los que te encuentres y los añado.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/guidance/rpa-sap-playbook/vbscript-based-sap-gui-automation-overview" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Playbook RPA para SAP GUI ↗</a>
        </div>
      </article>

      <!-- 10.6 -->
      <article class="doc-section open" id="s106">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">10.6</span><span class="sh-title">Módulos de ECC: dónde vive tu financiero dentro del sistema</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>ECC se organiza en <strong>módulos</strong> (la propia documentación SAP los llama oficialmente "componentes" desde que pasó de R/3 a ECC, aunque en la práctica todo el mundo sigue diciendo "módulo"). Los que más probabilidad tienen de cruzarse con tu robot de facturas:</p>
          <ul>
            <li><strong>FI</strong> (Financial Accounting) — contabilidad financiera: facturas de proveedor, cuentas por pagar/cobrar, libro mayor. Es donde vive <code>FB60</code>.</li>
            <li><strong>CO</strong> (Controlling) — control de costes, centros de coste, rentabilidad. FI y CO se nombran juntos como <strong>FICO</strong> porque trabajan integrados.</li>
            <li><strong>MM</strong> (Materials Management) — compras, gestión de materiales, pedidos. Es donde vive <code>MIRO</code> (verificación de factura logística).</li>
            <li><strong>SD</strong> (Sales and Distribution) — ventas, facturación a cliente, distribución.</li>
            <li><strong>PP</strong> (Production Planning), <strong>HCM</strong> (Recursos Humanos), <strong>PM</strong> (Mantenimiento de planta), <strong>QM</strong> (Gestión de calidad) — el resto de módulos clásicos, menos probables en tu caso pero útiles tenerlos identificados si el robot crece a otras áreas.</li>
          </ul>
          <p>Saber en qué módulo vive una transacción te dice mucho antes de automatizarla: si el dato sale de <strong>FI</strong> es contabilidad pura; si sale de <strong>MM</strong>, normalmente hay un pedido de compra (PO) detrás.</p>
          <a class="source" href="https://www.techtarget.com/searchsap/definition/SAP-ERP-Central-Component-SAP-ECC" target="_blank" rel="noopener">Fuente · TechTarget (con cita de documentación SAP) — Módulos de SAP ECC ↗</a>
        </div>
      </article>

      <!-- 10.7 -->
      <article class="doc-section open" id="s107">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">10.7</span><span class="sh-title">FB60 vs MIRO: la guía paso a paso de las dos transacciones de factura</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Antes de automatizar facturas, hay que saber <strong>cuál de las dos transacciones</strong> usa tu proceso real — son distintas y el robot tiene que ir por la correcta:</p>
          <ul>
            <li><strong><code>FB60</code></strong> (módulo <strong>FI</strong>) — factura de proveedor <strong>sin pedido de compra (PO) detrás</strong>. Se usa para gastos directos: luz, teléfono, servicios… donde no hay un pedido previo en el sistema. Permite <strong>una sola línea de proveedor</strong> por documento.</li>
            <li><strong><code>MIRO</code></strong> (módulo <strong>MM</strong>, "Logistics Invoice Verification") — factura <strong>con referencia a un pedido de compra (PO)</strong> ya existente. El flujo completo suele ser: se crea el PO → se hace la recepción de mercancía (<code>MIGO</code>) → se verifica la factura con <code>MIRO</code>, que genera el documento contable en FI automáticamente.</li>
          </ul>
          <p><strong>Pasos típicos de <code>FB60</code></strong> (vía menú: <em>Accounting → Financial Accounting → Accounts Payable → Document entry → FB60 - Invoice</em>):</p>
          <ul>
            <li>Introducir el <strong>número de proveedor</strong> (vendor).</li>
            <li><strong>Fecha de factura</strong> e <strong>importe</strong> (a menudo llamado importe bruto, incluyendo IVA).</li>
            <li><strong>Importe de IVA/impuesto</strong> por separado.</li>
            <li><strong>Fecha de contabilización</strong> (posting date) — la fecha en la que el asiento entra en libros, que puede diferir de la fecha de factura.</li>
            <li>Guardar — genera un <strong>documento contable</strong> consultable luego con <code>FB03</code>.</li>
          </ul>
          <p><strong>Pasos típicos de <code>MIRO</code>:</strong></p>
          <ul>
            <li>Seleccionar el tipo de transacción <strong>Invoice</strong> (factura).</li>
            <li>Introducir la <strong>fecha de factura</strong>.</li>
            <li>Introducir el <strong>número de pedido de compra (PO)</strong> de referencia — sin él, MIRO no deja avanzar.</li>
            <li>El sistema trae las líneas del pedido; se contrastan cantidades/importes contra lo recibido.</li>
            <li>Guardar — genera el documento contable en FI automáticamente, consultable con <code>ME23N</code> (ver el pedido) o las transacciones de visualización de FI.</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · variante SAP</span>
            <p>Para tu robot, lo primero es <strong>identificar con tu equipo de financiero cuál de las dos usan</strong> para el lote de facturas que quieres automatizar — cambia los campos del Excel de entrada (MIRO necesita número de PO; FB60 no) y la transacción de destino en <code>Launch SAP</code> + navegación (10.3).</p>
          </div>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging · control de duplicados</span>
            <p>Ambas transacciones tienen <strong>control de factura duplicada</strong>, pero configurado de forma <strong>distinta y por separado</strong>: en MM se configura vía transacción <code>OMRDC</code>; en FI, mediante un ajuste en el <strong>maestro de proveedor</strong> ("Chk double inv." en datos de la sociedad). Si tu robot reprocesa una factura por error, el comportamiento de bloqueo <strong>depende de cuál de las dos transacciones</strong> estés usando — no asumas que el control es el mismo en ambas.</p>
          </div>
          <a class="source" href="https://answers.sap.com/questions/3296846/what-is-diffrence-between-miro-and-fb60.html" target="_blank" rel="noopener">Fuente oficial · SAP Community — Diferencia entre MIRO y FB60 ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 11 ============ -->
    <section class="block-group" id="block-11">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-11">
        <span class="bg-badge">Bloque 11</span>
        <h2 class="bg-head-title">Errores + Debugging a fondo</h2>
        <span class="bg-sub">Cuando algo falla, y cómo verlo venir antes</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-11">

      <!-- 11.1 -->
      <article class="doc-section open" id="s111">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">11.1</span><span class="sh-title">Error por acción: On error</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Por defecto, un desktop flow <strong>se detiene</strong> en cuanto una acción falla. Para cambiar ese comportamiento en una acción concreta, abres su panel <strong>On error</strong> (esquina inferior de cada acción):</p>
          <ul>
            <li><strong>Retry action if error occurs</strong> — reintenta la acción un número de veces tras un intervalo. Por defecto: <strong>1 reintento, cada 2 segundos</strong> — ajustable.</li>
            <li><strong>Continue flow run</strong> — si el reintento (si lo hay) también falla, esta opción evita que el flujo se detenga del todo.</li>
            <li>Con <strong>Continue flow run</strong> activado, un desplegable decide qué pasa después: <strong>Go to next action</strong> (sigue con la siguiente acción en orden), <strong>Repeat action</strong>, entre otras.</li>
          </ul>
          <p>Esta configuración es <strong>por acción individual</strong> — la ves en cualquier acción del flujo, no solo en las "propensas a fallar". Es el primer nivel de control de errores, antes de pasar al nivel de bloque (11.2).</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Reserva <code>On error</code> por acción para casos puntuales y predecibles (un campo web que a veces tarda en cargar). Para protección más amplia de varias acciones a la vez, <code>On block error</code> (11.2) es la herramienta correcta — evita configurar <code>On error</code> acción por acción en todo el flujo.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/errors" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Gestionar errores en desktop flows ↗</a>
        </div>
      </article>

      <!-- 11.2 -->
      <article class="doc-section open" id="s112">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">11.2</span><span class="sh-title">On block error: tu Try/Catch</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p><code>On block error</code> envuelve un <strong>grupo de acciones</strong> y funciona, igual que en otros lenguajes, como un <strong>Try/Catch</strong>: si cualquier acción dentro del bloque falla, el bloque captura el error en vez de tumbar el flujo entero.</p>
          <ul>
            <li>Ofrece las <strong>mismas opciones</strong> que <code>On error</code> de una acción individual (retry, continuar), pero aplicadas a <strong>todo el bloque</strong> de una vez.</li>
            <li>Una ventaja extra sobre el nivel de acción: <code>On block error</code> también captura <strong>errores de lógica inesperados</strong> — por ejemplo, intentar acceder a una posición de una lista que está fuera de rango.</li>
            <li>Puedes darle un <strong>nombre</strong> al bloque (recomendado: que describa el grupo de acciones que protege, no "Bloque1").</li>
            <li>Si hay política de reintento configurada, los reintentos arrancan <strong>desde el principio del bloque</strong>, no desde la acción que falló.</li>
            <li>Eliges si, tras un error, el flujo continúa desde el <strong>principio</strong> o el <strong>final</strong> del bloque.</li>
            <li>Si todos los reintentos del bloque fallan, se aplica lo que hayas configurado en su <strong>"Exception handling mode"</strong>.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · quién manda</span>
            <p>La configuración de error/retry de una <strong>acción individual</strong> dentro del bloque tiene <strong>prioridad</strong> sobre la del bloque que la envuelve. Si una acción concreta ya tiene su propio <code>On error</code>, el del bloque no la sobreescribe — conviene tenerlo presente si los resultados no son los esperados.</p>
          </div>
          <div class="callout callout--tip">
            <span class="c-tag">Truco · patrón global</span>
            <p>Un patrón muy usado: envolver <strong>todo el Main</strong> en un único <code>On block error</code> que, al fallar, llama a una <strong>subflow reutilizable</strong> (p. ej. <code>FlowExceptionHandler</code>) encargada de recoger el error y decidir qué hacer — log, aviso, notificación. Así tienes una red de seguridad global además de las específicas por tramo.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/errors" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Gestionar errores en desktop flows ↗</a>
        </div>
      </article>

      <!-- 11.3 -->
      <article class="doc-section open" id="s113">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">11.3</span><span class="sh-title">Get last error y Throw custom error</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Dos acciones que completan el manejo de errores:</p>
          <ul>
            <li><code>Get last error</code> — recupera el <strong>último error ocurrido</strong> en el flujo como variable de tipo error, con <strong>seis propiedades</strong>: nombre, ubicación e índice de la acción que falló, el subflow que la contiene, y el mensaje (<code>%LastError.Message%</code> es la que más usarás). Colócala dentro de un <code>On block error</code> para capturar los detalles justo después del fallo.</li>
            <li><code>Throw custom error</code> (ya vista en el Bloque 4) — lanza un error <strong>definido por ti</strong>, con nombre y mensaje propios. Se usa típicamente dentro de un <code>On block error</code> para forzar un fallo controlado cuando detectas una condición inválida que PAD no consideraría un error por sí solo.</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Aquí se cierra de verdad el manejo OK/KO del robot: envuelves el procesado de cada factura (relleno de formulario o SAP, adjuntar PDF) en un <code>On block error</code> con <strong>Continue flow run</strong>; si falla, <code>Get last error</code> trae <code>%LastError.Message%</code> y lo escribes en la columna de resultado del Excel de log (Bloque 7) como <strong>KO + motivo</strong>, en vez de que una factura problemática tumbe las 999 restantes.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/errors" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Gestionar errores en desktop flows ↗</a>
        </div>
      </article>

      <!-- 11.4 -->
      <article class="doc-section open" id="s114">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">11.4</span><span class="sh-title">Breakpoints y stepping mode</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Ya viste lo básico en el Bloque 2 (<code>Run next action</code> + panel de Variables). Aquí va el resto del kit de depuración:</p>
          <ul>
            <li><strong>Breakpoint</strong> — clic a la izquierda del número de línea de una acción para añadir/quitar uno. El flujo se <strong>pausa justo ahí</strong> al ejecutarse; reanudas con <strong>Run</strong> o <strong>Run next action</strong>.</li>
            <li><strong>Stepping Mode</strong> — un interruptor en el menú <strong>Debug</strong> de la barra del diseñador. Hay que <strong>activarlo explícitamente</strong>; no viene encendido por defecto.</li>
            <li>Con Stepping Mode activo, se desbloquean <strong>Step over</strong> (<code>F11</code>) y <strong>Step out</strong> (<code>Shift+F11</code>) — solo disponibles con el flujo <strong>pausado</strong>, no en ejecución libre.</li>
          </ul>
          <p><strong>Step over</strong> ejecuta la acción actual y pausa en la siguiente — si la acción actual es un <code>Run subflow</code>, ejecuta el subflow <strong>entero de un tirón</strong> y pausa justo después, sin que tengas que entrar paso a paso dentro de él. <strong>Step out</strong> sale del subflow en el que estás y vuelve a pausar en el flujo padre — útil para revisar lógica anidada sin perderte dentro de cada subflow.</p>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging · variables editables en pausa</span>
            <p>Con el flujo pausado, puedes <strong>editar en caliente</strong> el valor de variables Texto, Numérico, Booleano y Fecha/hora desde la ventana de valor de la variable — útil para probar cómo seguiría el flujo con un dato distinto sin tener que relanzar todo desde cero.</p>
          </div>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p><strong>Step over/Step out es relativamente reciente</strong> (disponibilidad general desde septiembre de 2025) y hay que <strong>activarlo a mano</strong> desde el menú <strong>Tools</strong> del diseñador antes de que aparezca como opción — si no lo ves, revisa ahí primero.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/debugging-flow" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Depurar desktop flows ↗</a>
        </div>
      </article>

      <!-- 11.5 -->
      <article class="doc-section open" id="s115">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">11.5</span><span class="sh-title">Logging: Log message y dónde queda realmente guardado</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p><code>Log message</code> (grupo <strong>Logging</strong>) añade un mensaje de texto propio (máx. <strong>128 caracteres</strong>) con severidad <strong>Info, Warning o Error</strong> a los detalles de ejecución del flujo.</p>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · dos letras pequeñas importantes</span>
            <p><strong>1)</strong> <code>Log message</code> es una <strong>función premium</strong>: requiere suscripción de Power Automate. <strong>2)</strong> Los logs de acción <strong>solo se suben al servicio de Power Automate cuando el flujo se lanza desde un cloud flow</strong> — si lo ejecutas directamente desde el <strong>diseñador de PAD</strong> (como haces normalmente en desarrollo), esos logs <strong>no</strong> se suben a ningún portal. Es fácil dar por hecho que se están guardando en algún sitio consultable y no es así en ejecución local.</p>
          </div>
          <p>Alternativas/complementos, según lo que necesites:</p>
          <ul>
            <li><code>Display message</code> (Bloque 1) — además de mostrar el mensaje en pantalla (útil en ejecuciones atendidas), también queda registrado en los detalles del flujo.</li>
            <li><strong>Logging propio</strong> — escribir tú mismo en un archivo, Excel, SharePoint o Dataverse con las acciones ya vistas (Bloque 7), si necesitas control total sobre dónde y cómo se guarda, independientemente de licencias.</li>
            <li><strong>Logs locales en bruto</strong> — distintos de <code>Log message</code>: hay logs de instalación/runtime en <code>%programdata%\Microsoft\Power Automate\Logs</code> (a nivel de máquina), y un archivo <code>Actions.log</code> por cada ejecución dentro de la carpeta de <em>runs</em> local del flujo — útiles para depurar problemas de la propia aplicación PAD, no como sustituto del logging de negocio.</li>
          </ul>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/logging" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Acción Log message ↗</a>
        </div>
      </article>

      <!-- 11.6 -->
      <article class="doc-section open" id="s116">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">11.6</span><span class="sh-title">Patrón de robustez recomendado</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Juntando todo lo de este bloque, la receta recomendada por la propia guía de buenas prácticas de Microsoft para un flujo en producción:</p>
          <ul>
            <li><strong>Envuelve</strong> las secciones críticas (y opcionalmente todo el Main) en <code>On block error</code> con nombre descriptivo.</li>
            <li>Dentro del bloque de captura, usa <code>Get last error</code> para <strong>recoger el detalle</strong> exacto de lo que falló.</li>
            <li>Registra ese detalle con <code>Log message</code> (si tienes licencia premium y lanzas desde cloud) o con tu <strong>logging propio</strong> a archivo/Excel/SharePoint — recuerda la limitación de 11.5 si dependes solo de <code>Log message</code> en ejecución local.</li>
            <li>Decide la <strong>política de reintento</strong> con criterio: reintentar tiene sentido para fallos transitorios (una carga lenta, un campo que tarda); no tiene sentido para errores de datos (un PDF que no existe nunca va a aparecer por reintentar).</li>
            <li>Usa <code>Throw custom error</code> para forzar un fallo controlado cuando detectes una condición de negocio inválida que PAD no vería como error técnico.</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Aplicado al robot completo: el <code>For each</code> de facturas (Bloque 4) queda envuelto en un <code>On block error</code> con <strong>Continue flow run</strong> por factura — un PDF que falte o un campo SAP que no responda no detiene el lote. <code>Get last error</code> alimenta la columna de motivo en el Excel de resultados (Bloque 7), y el informe final por correo (Bloque 9) resume cuántas fueron OK y cuántas KO, con el motivo de cada una.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/guidance/desktop-flow-coding-guidelines/monitor-automation" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Buenas prácticas de monitorización y logging ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 12 ============ -->
    <section class="block-group" id="block-12">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-12">
        <span class="bg-badge">Bloque 12</span>
        <h2 class="bg-head-title">Testing y casos de prueba</h2>
        <span class="bg-sub">El módulo nativo Testing — sí existe, y esto es lo que hace de verdad</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-12">

      <!-- 12.1 -->
      <article class="doc-section open" id="s121">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">12.1</span><span class="sh-title">El módulo Testing: qué es y qué no es</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>PAD tiene un módulo <strong>Testing</strong> dedicado (incorporado con la build <strong>2.54, marzo de 2025</strong>) que permite <strong>crear, editar, listar, ejecutar y depurar</strong> casos de prueba <strong>dentro del propio PAD</strong>, sin salir a otra herramienta. Vive en su propia pestaña <strong>Tests</strong> en la consola, separada de tus flujos normales, y los casos se pueden <strong>exportar/importar junto con el flujo</strong> que validan.</p>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>El módulo Testing es una <strong>función premium</strong>: requiere licencia Power Automate premium, y necesitas <strong>PAD versión 2.54 o superior</strong> instalada.</p>
          </div>
          <p><strong>Lo que NO hace:</strong> el módulo Testing <strong>no genera los casos de prueba con IA</strong> por ti — tú diseñas cada caso a mano (qué flujo probar, qué validar, con qué datos). La generación de casos de prueba <strong>con IA</strong> existe en Power Platform, pero es una capacidad de <strong>Copilot Studio</strong> y del <strong>Power Apps Test Engine</strong>, pensada para agentes y apps — no hay evidencia de que esa generación automática llegue a los desktop flows.</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Aun siendo manual, vale la pena: tener casos de prueba <strong>reproducibles</strong> para tu robot de facturas significa poder relanzar la validación entera cada vez que toques algo (un selector, una condición) sin tener que probarlo todo a mano otra vez.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/test-desktop-flows" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Crear y ejecutar casos de prueba para desktop flows ↗</a>
        </div>
      </article>

      <!-- 12.2 -->
      <article class="doc-section open" id="s122">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">12.2</span><span class="sh-title">Crear un caso de prueba: la estructura Given/When/Then</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Para crear un caso de prueba: en PAD, panel izquierdo → <strong>Tests</strong> → barra de comandos → <strong>+ New → Test case</strong>. Le das un nombre, eliges el <strong>desktop flow a validar</strong>, y se abre el diseñador de pruebas.</p>
          <p>Un caso de prueba sigue la estructura clásica <strong>Given / When / Then</strong> (dado / cuando / entonces), igual que en otros frameworks de testing:</p>
          <ul>
            <li><strong>Given</strong> — preparas las condiciones de partida: qué <strong>valores de entrada</strong> recibirá el flujo bajo prueba.</li>
            <li><strong>When</strong> — ejecutas el flujo (con la acción <code>Test a desktop flow</code>, 12.3).</li>
            <li><strong>Then</strong> — compruebas el resultado (con la acción <code>Assert</code>, 12.4).</li>
          </ul>
          <p>Todo caso de prueba usa, como mínimo, <strong>dos acciones</strong>: una que <strong>ejecuta</strong> tu flujo (o un subflow suyo) y otra que <strong>valida</strong> el resultado.</p>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/test-desktop-flows" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Crear y ejecutar casos de prueba para desktop flows ↗</a>
        </div>
      </article>

      <!-- 12.3 -->
      <article class="doc-section open" id="s123">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">12.3</span><span class="sh-title">Test a desktop flow y Test a subflow of a desktop flow</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Dos acciones del grupo <strong>Testing</strong> ejecutan lo que quieres validar:</p>
          <ul>
            <li><code>Test a desktop flow</code> — ejecuta el desktop flow completo que elegiste al crear el caso. Se comporta de forma parecida a <code>Run desktop flow</code>, pero pensada para contexto de validación: si el flujo necesita <strong>valores de entrada</strong>, los rellenas en los parámetros de la acción; cuando termina, puedes <strong>validar las variables de salida</strong> que produce. La ejecución del caso de prueba <strong>espera</strong> a que el flujo termine antes de continuar.</li>
            <li><code>Test a subflow of a desktop flow</code> — en vez de ejecutar el flujo entero, prueba <strong>un subflow concreto</strong> dentro de él. <strong>Solo soporta subflows locales</strong> (los que viven dentro de ese mismo flujo) — los <strong>subflows globales no son compatibles</strong> con esta acción.</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Para tu robot, lo más útil suele ser probar <strong>subflows concretos</strong> por separado: por ejemplo, un subflow que reciba una fila de factura simulada y compruebe que la lógica de "PDF no encontrado → marcar KO" (Bloque 11) funciona, sin tener que lanzar el robot completo con datos reales cada vez que cambias algo.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/testing" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de Testing ↗</a>
        </div>
      </article>

      <!-- 12.4 -->
      <article class="doc-section open" id="s124">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">12.4</span><span class="sh-title">Assert: validar que el resultado es el esperado</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p><code>Assert</code> comprueba si un valor coincide con lo que esperas. Si la comprobación falla, <strong>el caso de prueba falla</strong> — exactamente el mismo concepto que un <code>assert</code> en cualquier lenguaje de programación.</p>
          <ul>
            <li><strong>Assert expression</strong> — la condición a validar. Ejemplo de la propia documentación: <code>%OutputResult=ExpectedResult%</code> (comparar la salida real contra el valor esperado).</li>
            <li><strong>Assert message</strong> — un texto que explica qué salió mal si el test falla, por ejemplo <em>"Expected Sum to equal 25"</em> — esto es lo que verás al revisar un caso fallido, así que conviene que sea descriptivo.</li>
          </ul>
          <p>Puedes añadir <strong>varias acciones <code>Assert</code></strong> en el mismo caso de prueba, para validar distintas salidas de un mismo flujo de una sola pasada.</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco · patrón habitual</span>
            <p>El flujo típico de trabajo: <strong>1)</strong> defines las entradas (Given), <strong>2)</strong> ejecutas con <code>Test a desktop flow</code>/<code>Test a subflow</code> (When), <strong>3)</strong> añades uno o varios <code>Assert</code> sobre las variables de salida que te interesan (Then). Si el flujo cambia y un test empieza a fallar, revisas primero si es un <strong>fallo real</strong> en el flujo o si simplemente <strong>los valores esperados del Assert</strong> necesitan actualizarse porque el requisito cambió.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/testing" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Referencia de acciones de Testing ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 13 ============ -->
    <section class="block-group" id="block-13">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-13">
        <span class="bg-badge">Bloque 13</span>
        <h2 class="bg-head-title">Máquinas y desatendido</h2>
        <span class="bg-sub">Cuando el robot corre solo, sin nadie delante de la pantalla</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-13">

      <!-- 13.1 -->
      <article class="doc-section open" id="s131">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">13.1</span><span class="sh-title">Attended vs unattended: la diferencia real</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Ya viste la idea básica en el Bloque 1; aquí va el detalle operativo:</p>
          <ul>
            <li><strong>Attended (atendido)</strong> — el flujo corre con un <strong>usuario delante</strong>, normalmente disparado a mano por esa misma persona. Pensado para automatización a nivel individual: el robot ayuda mientras tú trabajas.</li>
            <li><strong>Unattended (desatendido)</strong> — corre <strong>sin nadie presente</strong>, en una máquina o servidor dedicado, normalmente disparado por un cloud flow programado.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>Atendido y desatendido tienen <strong>requisitos de sesión incompatibles</strong> entre sí: atendido necesita una sesión <strong>activa</strong>, desatendido necesita que los usuarios estén <strong>desconectados</strong> (o con sesión "disconnected"). La recomendación oficial es <strong>no mezclar</strong> automatización atendida y desatendida en la <strong>misma máquina o grupo de máquinas</strong>.</p>
          </div>
          <p>Es perfectamente normal <strong>combinar ambas</strong> dentro de un mismo proceso de negocio: por ejemplo, la parte de validación automática de un proceso va desatendida, y el paso final que requiere una decisión humana (revisar un caso dudoso antes de aprobar) va atendido — pero en máquinas distintas.</p>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/guidance/planning/attended-unattended" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Escenarios atendidos y desatendidos ↗</a>
        </div>
      </article>

      <!-- 13.2 -->
      <article class="doc-section open" id="s132">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">13.2</span><span class="sh-title">Registrar una máquina (y el error típico al usar una VM)</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Para que una máquina pueda ejecutar flujos en modo desatendido, primero hay que <strong>registrarla</strong> contra tu entorno de Power Automate. Una vez registrada, la gestionas desde el portal en <strong>Monitor → Machines</strong>: nombre, descripción, versión, grupo al que pertenece, estado, y cuántos flujos tiene corriendo o en cola.</p>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · el error clásico con VMs</span>
            <p>Si tu organización despliega máquinas virtuales a partir de una <strong>imagen base</strong> (lo habitual en IT), <strong>no preinstales PAD dentro de esa imagen base</strong>. Si lo haces, la información de <strong>registro de la máquina</strong> queda "congelada" en la imagen y se clona igual en cada VM nueva — provocando comportamiento inesperado (conflictos de identidad de máquina). La recomendación oficial es <strong>instalar PAD individualmente en cada máquina después</strong> del proceso de clonado, idealmente con scripts de despliegue automatizado para mantenerlo consistente.</p>
          </div>
          <p><strong>Requisitos de hardware para modo desatendido:</strong> a diferencia del mínimo general (1 GHz, 2 núcleos), el modo desatendido pide <strong>4 núcleos o más</strong> — conviene tenerlo en cuenta al dimensionar la VM/servidor antes de desplegar.</p>
          <p>El portal también ofrece <strong>modo mantenimiento</strong> por máquina o grupo: pausa todas las ejecuciones para poder hacer instalaciones o despliegues sin que un flujo se cruce a mitad de una actualización.</p>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/requirements" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Requisitos previos y limitaciones ↗</a>
        </div>
      </article>

      <!-- 13.3 -->
      <article class="doc-section open" id="s133">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">13.3</span><span class="sh-title">Licencia: la Process license</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>El modelo de licenciamiento para desatendido se simplificó respecto al esquema antiguo:</p>
          <ul>
            <li><strong>Antes</strong> — había que comprar una licencia <em>per-flow</em> para el cloud flow, más un add-on de unattended RPA por separado.</li>
            <li><strong>Ahora</strong> — se compra una <strong>Process license</strong> por cada <strong>sesión RPA en una máquina</strong>. Esa licencia cubre todos los cloud flows que invoquen desktop flows en esa máquina — no hay que licenciar cada flujo individualmente. Tampoco hay cantidad mínima de compra (el esquema antiguo exigía un mínimo de 5 packs).</li>
          </ul>
          <p>Un matiz importante de gobernanza: para poder <strong>asignar</strong> una Process license a una máquina, esa máquina tiene que haber sido <strong>registrada por un usuario con licencia Power Automate Premium</strong> — el registro inicial no lo puede hacer cualquiera.</p>
          <a class="source" href="https://learn.microsoft.com/es-es/power-platform/admin/power-automate-licensing/types" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Tipos de licencia de Power Automate ↗</a>
        </div>
      </article>

      <!-- 13.4 -->
      <article class="doc-section open" id="s134">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">13.4</span><span class="sh-title">Qué pasa de verdad en una sesión desatendida</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Vale la pena saber exactamente qué ocurre técnicamente, porque cambia cómo diseñas el flujo:</p>
          <ul>
            <li>Power Automate crea una <strong>sesión de escritorio remoto (RDP)</strong> en la máquina para ejecutar el flujo desatendido — usa las credenciales que indicaste al crear la conexión.</li>
            <li><strong>No puedes conectarte a la sesión de consola</strong> de esa máquina mientras corre una ejecución desatendida — no es como un RDP normal que puedes "ver en directo" tan fácilmente.</li>
            <li>La pantalla de la máquina destino queda <strong>bloqueada</strong> durante la ejecución desatendida — nadie puede ver lo que está pasando mirando físicamente esa pantalla.</li>
            <li>Cuando el flujo termina, Power Automate <strong>cierra la sesión</strong> y reporta su actividad. Por defecto crea una sesión nueva cada vez y la cierra al acabar — aunque existe una opción (<strong>"Reuse sessions for unattended runs"</strong>, configurable por máquina o grupo) para <strong>reutilizar</strong> la sesión entre ejecuciones en vez de crear una desde cero cada vez.</li>
            <li><strong>Las ejecuciones desatendidas no pueden correr con privilegios elevados</strong>, y <strong>iniciar sesión manualmente en la máquina mientras corre</strong> un flujo desatendido no está soportado — puede provocar que el flujo falle.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Si un flujo desatendido falla de forma intermitente y sospechas que alguien (o algo) está iniciando sesión en esa máquina mientras corre, revisa primero ahí — es una causa real y documentada de fallos desatendidos, no una rareza.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/run-unattended-desktop-flows" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Ejecutar desktop flows desatendidos ↗</a>
        </div>
      </article>

      <!-- 13.5 -->
      <article class="doc-section open" id="s135">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">13.5</span><span class="sh-title">Programar la ejecución: Windows Task Scheduler, porque PAD no tiene uno nativo</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p><strong>Confirmado:</strong> Power Automate for desktop <strong>no tiene un programador de tareas integrado</strong> dentro de la propia app. La forma "oficial" de programar ejecuciones es a través de un <strong>cloud flow</strong> con un disparador de <strong>recurrencia</strong>, que a su vez llama a tu desktop flow con la acción <code>Run a flow built with Power Automate for desktop</code> (ya vista en el Bloque 1) — esto requiere que el desktop flow esté <strong>publicado en la nube</strong> y la máquina <strong>registrada</strong>.</p>
          <p>Si lo que necesitas es disparar un flujo <strong>localmente</strong>, sin pasar por un cloud flow (por ejemplo, en un equipo sin licencia premium, o simplemente sin querer montar esa capa extra), la alternativa real que usa la comunidad es el propio <strong>Windows Task Scheduler</strong>:</p>
          <ul>
            <li>Crear una tarea programada que lance el flujo por su <strong>Flow ID</strong> a través de la aplicación de consola local de PAD.</li>
            <li>Alternativa más sencilla: crear un <strong>acceso directo</strong> a la URL de ejecución del flujo, y programar la tarea para abrir ese acceso directo a la hora deseada.</li>
          </ul>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging</span>
            <p>Si optas por la vía de Task Scheduler con acceso directo, comprueba primero que el <strong>acceso directo funciona ejecutándolo a mano</strong> con un doble clic — si falla así, fallará igual programado. Revisa también que la tarea esté configurada para ejecutarse con la <strong>sesión de usuario correcta</strong>: una tarea que se ejecute "no iniciada sesión" puede no tener acceso a abrir aplicaciones visibles en pantalla.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/run-scheduled-tasks" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Ejecutar un flujo en la nube programado ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 14 ============ -->
    <section class="block-group" id="block-14">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-14">
        <span class="bg-badge">Bloque 14</span>
        <h2 class="bg-head-title">Orquestación + interfaz</h2>
        <span class="bg-sub">De un robot suelto a un sistema que otros departamentos pueden usar</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-14">

      <!-- 14.1 -->
      <article class="doc-section open" id="s141">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">14.1</span><span class="sh-title">Disparar desde la nube: los tipos de trigger</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Ya viste cómo un cloud flow lanza tu desktop flow (Bloque 1, acción <code>Run a flow built with Power Automate for desktop</code>). Lo que cambia aquí es <strong>qué dispara ese cloud flow</strong> en primer lugar — y de ahí sale toda la orquestación:</p>
          <ul>
            <li><strong>Automated cloud flow</strong> — arranca por un <strong>evento</strong>: llega un correo, se crea o modifica un elemento en una lista de <strong>SharePoint</strong>, se sube un archivo... Hay triggers prediseñados para SharePoint (crear/modificar/borrar elemento, modificar archivo, clasificación de Syntex, entre otros) y para decenas de conectores más.</li>
            <li><strong>Instant cloud flow</strong> — arranca <strong>a mano</strong>, por ejemplo al pulsar un botón en la app móvil de Power Automate, o desde un control de Power Apps (14.2).</li>
            <li><strong>Scheduled cloud flow</strong> — arranca por <strong>recurrencia</strong> (cada día, cada semana...) — esta es la pieza que ya viste en el Bloque 13 como sustituto del scheduler que PAD no tiene.</li>
            <li><strong>Generative actions (preview)</strong> — en vez de definir tú la secuencia exacta de acciones, describes la <strong>intención</strong> y una IA elige el conjunto de acciones a ejecutar según el contexto. Es una capacidad de cloud flows en preview, no algo que toque directamente al desktop flow, pero vale la pena saber que existe si tu departamento empieza a experimentar con ella.</li>
          </ul>
          <p>Cuando el evento viene de SharePoint específicamente, la integración es directa: <strong>más de 40 acciones</strong> permiten manipular listas y bibliotecas desde el cloud flow, además del propio trigger de cambios.</p>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/triggers-introduction" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Tipos de trigger en Power Automate ↗</a>
        </div>
      </article>

      <!-- 14.2 -->
      <article class="doc-section open" id="s142">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">14.2</span><span class="sh-title">Power Apps como interfaz de autoservicio (tu caso de RRHH)</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Hay <strong>dos formas distintas</strong> de combinar Power Apps con tus flujos, y conviene no confundirlas:</p>
          <ul>
            <li><strong>Power Apps como disparador</strong> (la más conocida) — un botón en una <strong>canvas app</strong> dispara un cloud flow (trigger <strong>PowerApps</strong>), que a su vez puede lanzar tu desktop flow. Puedes pasar parámetros desde la app al flujo (texto, números) y recibir un valor de vuelta con <code>Respond to PowerApps</code> para mostrarlo en la app. Esto es exactamente lo que necesitas para un <strong>portal de autoservicio</strong>: un departamento como RRHH abre la app, rellena un par de campos, pulsa el botón, y dispara el robot sin tocar nada técnico.</li>
            <li><strong>Power Apps como interfaz del propio desktop flow</strong> (más reciente, y menos conocida) — una capacidad distinta donde el desktop flow <strong>abre una canvas app en la máquina del usuario</strong> como su interfaz visual: el flujo le pasa datos a la app para precargarla, el usuario interactúa, y lo que introduce <strong>vuelve al desktop flow</strong> para seguir la automatización. También permite que <strong>acciones de la app</strong> (como pulsar un botón) disparen <strong>subflows concretos</strong> del flujo, en vez de una ejecución estrictamente secuencial. No hay diseñador de apps dentro de PAD — la app se diseña y mantiene en el portal de Power Apps como siempre.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco · cuál usar</span>
            <p>Para tu caso (que otros departamentos <strong>disparen</strong> un robot sin saber nada de PAD), la primera vía —botón en canvas app → cloud flow → desktop flow— es la más sencilla y la más probada. La segunda vía (app como interfaz <strong>dentro</strong> del flujo) tiene más sentido cuando el propio robot necesita <strong>pedir datos a un humano a mitad de la automatización</strong> y no solo al principio.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-apps/maker/canvas-apps/how-to/trigger-flow" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Disparar un flujo desde una canvas app ↗</a>
        </div>
      </article>

      <!-- 14.3 -->
      <article class="doc-section open" id="s143">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">14.3</span><span class="sh-title">Multi-máquina: grupos, colas y prioridad</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Cuando un solo robot ya no basta y necesitas escalar a varias máquinas:</p>
          <ul>
            <li><strong>Machine group</strong> — agrupas varias máquinas registradas (Bloque 13). Asignas el desktop flow al <strong>grupo</strong> en vez de a una máquina concreta; Power Automate encola la ejecución y se la asigna automáticamente a la <strong>primera máquina del grupo que quede libre</strong>. La selección de máquina puede tardar hasta <strong>50 segundos</strong> — en ejecuciones muy cortas y disparadas en paralelo, puede dar la sensación de que corren en secuencia aunque no sea así.</li>
            <li><strong>Cola con prioridad</strong> — cada ejecución se encola con prioridad <strong>High</strong> o <strong>Normal</strong> (configurable en Opciones avanzadas del conector, también de forma dinámica). El orden de ejecución se decide por <strong>prioridad + momento de encolado</strong> — alta prioridad encolada antes gana. El propietario de la máquina/grupo puede además <strong>forzar un ítem al principio</strong> de la cola manualmente, saltándose el orden normal.</li>
            <li><strong>Ejecución concurrente</strong> — por defecto, una misma máquina no puede correr dos desktop flows del <strong>mismo usuario</strong> en paralelo. Para correr varios a la vez en <strong>una sola máquina física</strong>, hace falta <strong>Windows Server (2016/2019/2022) con Remote Desktop Services (RDS) activado</strong>, y usar <strong>cuentas de usuario distintas</strong> para cada conexión — el sistema operativo es quien permite sesiones simultáneas, no PAD por sí solo.</li>
          </ul>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging</span>
            <p>Si una ejecución se queda colgada en cola y nunca arranca, recuerda el <strong>timeout de 12 horas</strong> visto en el Bloque 13: pasado ese tiempo sin encontrar máquina libre, falla con el código <code>NoCandidateMachine</code> — revisa si el grupo realmente tiene capacidad disponible o si todas las máquinas están saturadas/desconectadas.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/manage-machine-groups" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Administrar grupos de máquinas ↗</a>
        </div>
      </article>

      <!-- 14.4 -->
      <article class="doc-section open" id="s144">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">14.4</span><span class="sh-title">Work queues: colas de trabajo centralizadas</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Distinto de la cola de <em>ejecuciones</em> de 14.3: las <strong>Work queues</strong> son colas de <strong>elementos de trabajo</strong> (transacciones) gestionadas y monitorizadas de forma centralizada, que tus robots van <strong>consumiendo</strong> a medida que tienen capacidad. Microsoft lo describe como llevar transacciones a una cola central y procesarlas <strong>concurrentemente</strong> a través de un grupo de máquinas dedicado — el ejemplo oficial habla de hasta <strong>20 máquinas</strong> en un mismo grupo trabajando sobre la misma cola.</p>
          <p>Es el patrón natural si tu robot de facturas crece de "un Excel con una lista" a "un flujo continuo de documentos llegando de varias fuentes": en vez de que cada robot sepa de dónde sacar su trabajo, todos los robots disponibles tiran de la <strong>misma cola central</strong>, y el sistema reparte la carga.</p>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · cuándo daría el salto</span>
            <p>Tu robot actual (un Excel, un bucle) no necesita esto — es la pieza que tendría sentido si, más adelante, el volumen de facturas crece tanto que un solo robot/máquina ya no da abasto y quieres repartir el trabajo entre varias máquinas sin que se pisen entre sí.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/work-queues" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Work queues ↗</a>
        </div>
      </article>

      <!-- 14.5 -->
      <article class="doc-section open" id="s145">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">14.5</span><span class="sh-title">Office Scripts: qué refresca de verdad y qué no (la parte que prometí confirmar)</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p><strong>Office Scripts no es una función de PAD</strong> — vive en <strong>Excel Online</strong> (la versión web), se escribe en <strong>TypeScript</strong>, y se invoca desde un <strong>cloud flow</strong> con la acción <strong>Run script</strong>. Aparece aquí, en orquestación, porque normalmente entra en juego cuando un cloud flow necesita tocar un Excel que vive en SharePoint/OneDrive sin pasar por un desktop flow.</p>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · el refresco no es fiable, y falla en silencio</span>
            <p>La propia documentación de troubleshooting de Microsoft lo dice sin rodeos: <strong>la mayoría de métodos de refresco no hacen nada cuando se llaman desde un flujo</strong> — ni siquiera lanzan error, simplemente no actualizan los datos. <code>Workbook.refreshAllDataConnections</code> <strong>solo refresca cuando la fuente es Power BI</strong>; para <strong>Power Query con fuentes externas</strong>, el refresco vía Office Scripts/Power Automate <strong>no es fiable</strong>. Tampoco se dispara el refresco para fórmulas que dependen de <strong>enlaces entre libros</strong>.</p>
          </div>
          <p>Si tu necesidad real es <strong>refrescar datos de Power BI</strong> de forma fiable, la vía recomendada por la comunidad y consistente con la documentación oficial es programar el refresco <strong>directamente en el servicio de Power BI</strong> (donde sí hay recurrencia de refresco nativa y fiable), no intentar forzarlo desde Excel Online vía script.</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Si lo que necesitas refrescar es un <strong>Excel con Power Query de fuentes externas</strong> (no Power BI) y el refresco tiene que ser fiable sí o sí, la alternativa que sigue funcionando con garantías es <strong>Power Automate Desktop</strong>: abrir el Excel de verdad (Bloque 7, <code>Launch Excel</code>) y refrescar desde ahí — a costa de necesitar una máquina encendida en el momento programado, claro.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/office/dev/scripts/testing/power-automate-troubleshooting" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Solución de problemas de Office Scripts en Power Automate ↗</a>
        </div>
      </article>

      <!-- 14.6 -->
      <article class="doc-section open" id="s146">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">14.6</span><span class="sh-title">Licencias atendido/desatendido a fondo, owner de máquina, y el patrón completo "varios departamentos lanzan sin pasar por ti"</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p><strong>Resumen claro de qué licencia cubre qué</strong> — esto se mencionó suelto en bloques anteriores; aquí va junto y completo:</p>
          <ul>
            <li><strong>Power Automate Premium (por usuario)</strong> — cubre <strong>RPA atendida</strong> (el flujo corre en la máquina del propio usuario, disparado por él) y el uso de conectores premium. Microsoft recomienda esta licencia para <strong>todos los usuarios</strong> de la organización que vayan a crear o ejecutar flujos.</li>
            <li><strong>Power Automate Process (por bot)</strong> — la que ya viste en el Bloque 13: cubre <strong>RPA desatendida</strong>. Se licencia por <strong>bot</strong> (una sesión de automatización en una máquina), no por flujo ni por usuario — un bot puede ejecutar <strong>un</strong> desktop flow desatendido <strong>a la vez</strong>; si necesitas varias ejecuciones desatendidas en paralelo, necesitas <strong>varios bots</strong> (varias licencias Process), no solo varias máquinas.</li>
            <li><strong>Process Hosted</strong> — superset de la Process license: añade capacidad de <strong>máquina alojada por Microsoft</strong> (vía Azure Virtual Machine Scale Sets), para tener RPA desatendida con <strong>cero infraestructura propia</strong> que mantener.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · la trampa de presupuesto más común</span>
            <p>La <strong>Process license cubre el bot/la ejecución</strong>, pero <strong>no da automáticamente acceso a conectores premium</strong> dentro del flujo. Un flujo desatendido que use Dataverse, SharePoint, SQL Server u otros conectores premium necesita <strong>las dos cosas a la vez</strong>: la Process license (para el bot) <strong>y</strong> una licencia per-user/per-flow asociada (para los conectores). Es una causa real y documentada de presupuestos de licencias mal calculados en renovaciones — antes de presupuestar un despliegue desatendido, confirma si tus flujos tocan conectores premium.</p>
          </div>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · automatizar Microsoft 365 en desatendido</span>
            <p>Si tu automatización desatendida toca aplicaciones de <strong>Microsoft 365/Office</strong> (Outlook, Excel de escritorio, Word...), hace falta además la <strong>Microsoft 365 - Unattended License</strong> — una licencia adicional específica para ese escenario, separada de la Process license general.</p>
          </div>
          <p><strong>Sobre el owner de máquina/conexión:</strong> quien <strong>registra</strong> una máquina necesita licencia Premium (Bloque 13); quien es <strong>owner</strong> de una máquina o grupo puede gestionar su modo mantenimiento, forzar prioridad en la cola (14.3), y ver/cancelar ejecuciones de las que sea propietario. La <strong>conexión</strong> que usa un cloud flow para disparar un desktop flow desatendido (Bloque 1, Bloque 9) pertenece a quien la creó — si esa persona pierde la licencia o dimite, la conexión deja de funcionar, así que conviene que las conexiones críticas de producción las cree una <strong>cuenta de servicio</strong> dedicada, no una persona concreta.</p>
          <div class="callout callout--proyecto">
            <span class="c-tag">Patrón completo · "varios departamentos lanzan sin pasar por mí"</span>
            <p>Juntando todo este bloque, así se monta de verdad el caso genérico (RRHH es solo un ejemplo; aplica a cualquier departamento que necesite lanzar un proceso tuyo sin saber nada de PAD): <strong>1)</strong> construyes el desktop flow y lo publicas en la nube con sus variables de entrada/salida (Bloque 1). <strong>2)</strong> Eliges el o los <strong>puntos de lanzamiento</strong> según dónde vive ya el departamento — un botón en una <strong>canvas app de Power Apps</strong> (14.2) si quieres un formulario dedicado; una <strong>tarjeta adaptativa o comando en Microsoft Teams</strong> si prefieres que lo disparen sin salir del chat (vía el conector de Teams sobre un instant cloud flow); o un trigger de <strong>SharePoint</strong> si el proceso arranca al subir un archivo o crear un elemento en una lista que ya usan. <strong>3)</strong> Para lanzamientos recurrentes sin intervención humana, añades un <strong>scheduled cloud flow</strong> en paralelo al manual — mismo desktop flow, dos formas de dispararlo. <strong>4)</strong> Registras la(s) máquina(s) que ejecutarán el trabajo, las agrupas si hay varios departamentos con volumen (14.3), y licencias el bot con Process license. <strong>5)</strong> El departamento que lanza nunca toca PAD ni sabe que existe — solo ve su botón, su tarjeta de Teams, o su lista de SharePoint.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-platform/admin/power-automate-licensing/faqs" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Preguntas frecuentes de licenciamiento de Power Automate ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 15 ============ -->
    <section class="block-group block-alm" id="block-15">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-15">
        <span class="bg-badge">Bloque 15</span>
        <h2 class="bg-head-title">ALM</h2>
        <span class="bg-sub">De tu máquina de desarrollo a producción, sin perder nada por el camino</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-15">

      <!-- 15.1 -->
      <article class="doc-section open" id="s151">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">15.1</span><span class="sh-title">Solutions: el mecanismo de ALM en Power Platform</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p><strong>ALM</strong> (Application Lifecycle Management) es la disciplina de gestionar cómo algo que construyes pasa de "lo estoy probando" a "esto es lo que usa la empresa de verdad", de forma controlada y reproducible. En todo Power Platform —Power Apps, Power Automate, Copilot Studio— el mecanismo que lo implementa es el mismo: la <strong>Solution</strong> (solución).</p>
          <ul>
            <li>Una <strong>solution</strong> es un <strong>contenedor</strong> que agrupa los componentes de tu automatización — flujos, tablas de Dataverse, apps, lo que sea — para poder moverlos <strong>juntos</strong> de un entorno a otro mediante exportar/importar.</li>
            <li>El patrón estándar recomendado: trabajas y pruebas en un entorno de <strong>desarrollo</strong>, validas en uno de <strong>test</strong>, y solo entonces promueves la solución al entorno de <strong>producción</strong> — los tres como entornos de Power Platform separados.</li>
            <li>Las solutions se pueden exportar y guardar en un <strong>control de versiones</strong> (Azure DevOps, GitHub) para que ese repositorio sea la <strong>fuente de verdad</strong> — si alguien borra el entorno de desarrollo por accidente, la solución exportada permite reconstruirlo.</li>
            <li>Para organizaciones más grandes, <strong>Pipelines</strong> dentro de Power Platform automatiza el paso de dev → test → prod sin tener que hacerlo a mano cada vez.</li>
          </ul>
          <a class="source" href="https://learn.microsoft.com/es-es/power-platform/alm/overview-alm" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Visión general de ALM en Power Platform ↗</a>
        </div>
      </article>

      <!-- 15.2 -->
      <article class="doc-section open" id="s152">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">15.2</span><span class="sh-title">Exportar/importar un desktop flow: no es un botón directo</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Aquí hay un matiz importante que difiere de los cloud flows: <strong>la app de Power Automate Desktop no tiene una opción directa de "exportar/importar" un desktop flow</strong>. El camino real, paso a paso:</p>
          <ul>
            <li><strong>1)</strong> En el <strong>portal cloud</strong> de Power Automate (no en PAD), crear una <strong>nueva solución</strong>.</li>
            <li><strong>2)</strong> Dentro de esa solución, <strong>"Add existing" → Desktop flow</strong>, y elegir el desktop flow que ya tienes creado para añadirlo como componente de la solución.</li>
            <li><strong>3)</strong> Desde la página de solutions, seleccionar la tuya y <strong>"Export solution"</strong> — eligiendo entre <strong>managed</strong> o <strong>unmanaged</strong> (15.3).</li>
            <li><strong>4)</strong> En el entorno destino, <strong>importar</strong> ese paquete de solución — el desktop flow llega junto con el resto de componentes que hayas incluido.</li>
          </ul>
          <p>Esto aplica igual si mueves entre entornos del <strong>mismo tenant</strong> (dev → test → prod) o hacia un <strong>tenant distinto</strong> por completo.</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Antes de exportar, confirma que estás situado en el <strong>entorno correcto</strong> — el mismo en el que se creó originalmente el desktop flow. Es un error común intentar añadir el flujo a una solución estando conectado al entorno equivocado y no encontrarlo en la lista de "Add existing".</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-platform/alm/overview-alm" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Visión general de ALM en Power Platform ↗</a>
        </div>
      </article>

      <!-- 15.3 -->
      <article class="doc-section open" id="s153">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">15.3</span><span class="sh-title">Managed vs unmanaged: cuál usar y cuándo</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Al exportar, eliges entre dos tipos de paquete — la diferencia es si el destino puede <strong>seguir editando</strong> lo que recibe:</p>
          <ul>
            <li><strong>Unmanaged</strong> — el entorno destino <strong>puede editar</strong> los componentes importados directamente. Útil para mover algo a otro entorno de <strong>desarrollo</strong> donde quieres seguir trabajando sobre ello, o para casos donde necesitas poder ajustar el flujo después de importarlo.</li>
            <li><strong>Managed</strong> — el entorno destino <strong>no puede editar</strong> el contenido de la solución directamente; solo se puede actualizar volviendo a importar una versión nueva desde el origen. Es la opción correcta para <strong>producción</strong>: evita que alguien modifique a mano algo en directo sin pasar por el proceso de control de cambios.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>Si tu solución es <strong>managed</strong> y contiene una <strong>app de Power Apps</strong> que llama a un flujo, hay un problema conocido: tras publicar/actualizar la solución managed, la app puede <strong>dejar de encontrar el flujo</strong> hasta que lo quitas y lo vuelves a añadir manualmente — algo a tener en cuenta si tu interfaz de autoservicio (Bloque 14, Bloque 21) viaja dentro de una solución managed.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/en-us/power-platform/alm/overview-alm" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Visión general de ALM en Power Platform ↗</a>
        </div>
      </article>

      <!-- 15.4 -->
      <article class="doc-section open" id="s154">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">15.4</span><span class="sh-title">Connection references y environment variables: por qué el flujo no se rompe al moverlo</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Un flujo movido de dev a prod normalmente necesita <strong>conexiones y valores distintos</strong> en cada sitio (otra cuenta de correo, otra ruta de SharePoint). Dos piezas de la solución resuelven esto sin tocar el flujo a mano cada vez:</p>
          <ul>
            <li><strong>Connection references</strong> — en vez de que el flujo tenga la conexión "quemada" dentro, apunta a una <strong>referencia</strong> que se resuelve por separado en cada entorno. Así, el mismo flujo en dev usa una conexión y en prod usa otra, sin editar el flujo en sí.</li>
            <li><strong>Environment variables</strong> — evitan <strong>valores hardcodeados</strong> dentro del flujo (una URL, una ruta, un ID) — defines la variable una vez en el flujo, y le das un valor distinto en cada entorno donde se importa la solución.</li>
          </ul>
          <p>Juntas, estas dos piezas son lo que hace que <strong>"exportar de dev e importar en prod" funcione de verdad</strong> sin tener que reconfigurar el flujo a mano cada vez que cambia de entorno.</p>
          <a class="source" href="https://learn.microsoft.com/es-es/training/modules/import-export-solutions/" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Importar y exportar soluciones con cloud flows ↗</a>
        </div>
      </article>

      <!-- 15.5 -->
      <article class="doc-section open" id="s155">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">15.5</span><span class="sh-title">Migrar a otro PC/cuenta dev, y promover a producción</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Aplicando todo lo anterior a dos situaciones muy concretas que te vas a encontrar:</p>
          <ul>
            <li><strong>Cambiar de máquina de desarrollo o de cuenta</strong> (por ejemplo, pasar de tu cuenta personal de pruebas a una cuenta corporativa Premium, o reinstalar tu equipo) — el desktop flow en sí <strong>no "vive" en tu PC</strong>, vive en el entorno de Power Automate al que estaba conectado tu PAD. Si simplemente cambias de máquina pero <strong>sigues siendo el mismo usuario en el mismo entorno</strong>, basta con instalar PAD en la máquina nueva e iniciar sesión — los flujos siguen ahí. Si lo que cambia es la <strong>cuenta/entorno</strong>, ahí sí necesitas el proceso de solución (15.2) para llevarte los flujos contigo.</li>
            <li><strong>Promover de dev a producción</strong> — sigue el patrón estándar de 15.1-15.4: solución con el desktop flow → exportar como <strong>managed</strong> desde dev → importar en el entorno de prod → revisar que las connection references y environment variables tomen los valores correctos de producción → probar antes de activar disparadores reales (recuerda el módulo Testing del Bloque 12 para esto).</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Si tu robot de facturas pasa de "lo estoy probando en mi cuenta" a "lo usa todo el departamento de forma oficial", este es el camino: el flujo nace y se prueba en tu entorno de desarrollo (con datos de prueba, Bloque 12), y cuando esté listo, se empaqueta en una solución managed y se importa al entorno de producción de IMA, con sus propias conexiones de Excel/SAP/correo apuntando a los sistemas reales.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-platform/alm/overview-alm" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Visión general de ALM en Power Platform ↗</a>
        </div>
      </article>

      <!-- 15.6 -->
      <article class="doc-section open" id="s156">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">15.6</span><span class="sh-title">Versionado y patches: actualizar sin re-exportar todo cada vez</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Cada solución tiene un número de versión con formato <strong><code>major.minor.build.revision</code></strong> (p. ej. <code>1.2.0.3</code>) — así sabes qué versión hay desplegada en cada entorno sin tener que abrir el contenido y compararlo a ojo.</p>
          <p>Para cambios pequeños sobre una solución ya desplegada, en vez de re-exportar la solución <strong>entera</strong> otra vez, existe el concepto de <strong>patch</strong> (parche):</p>
          <ul>
            <li>Un patch contiene <strong>solo los cambios</strong> sobre la solución padre — añadir o editar componentes — sin necesidad de incluir de nuevo todo lo que ya tenía la solución original.</li>
            <li>Se crea con <strong>"Clone a Patch"</strong> sobre una solución <strong>unmanaged</strong>. Mientras existan patches dependientes de ella, la solución original queda <strong>bloqueada</strong> — no se puede editar ni volver a exportar hasta resolver esa dependencia.</li>
            <li><strong>Regla importante de coherencia:</strong> un patch exportado como <strong>managed</strong> solo se puede importar sobre una solución padre que <strong>también sea managed</strong> — el tipo de protección del patch tiene que coincidir con el de su padre. Y los <strong>patches unmanaged no deben usarse en producción</strong>.</li>
            <li>Cuando ya acumulaste varios patches y quieres "consolidar" todo en una única versión limpia, usas <strong>"Clone Solution"</strong>: fusiona la solución original con todos sus patches en una nueva versión base, con un número <strong>major.minor superior</strong>, y elimina los patches sueltos.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Los patches son útiles para <strong>cambios incrementales rápidos</strong> en producción (arreglar un campo, ajustar una condición) sin tener que re-certificar la solución entera. Pero no los dejes acumularse indefinidamente — clona a una nueva versión base de vez en cuando para mantener el conjunto manejable.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-platform/alm/create-patches-simplify-solution-updates" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Crear patches para simplificar actualizaciones de soluciones ↗</a>
        </div>
      </article>

      <!-- 15.7 -->
      <article class="doc-section open" id="s157">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">15.7</span><span class="sh-title">Las 3 opciones al re-importar: Upgrade, Stage for Upgrade, Update</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Cuando importas una solución y el sistema detecta que ya existe una versión anterior instalada, aparece un aviso de actualización con <strong>tres opciones bien distintas</strong> en Advanced settings — elegir mal aquí puede borrar cosas sin querer:</p>
          <ul>
            <li><strong>Upgrade</strong> (opción por defecto) — sube a la última versión y <strong>fusiona todos los patches anteriores en un solo paso</strong>. <strong>Importante: cualquier componente que estuviera asociado a la versión anterior pero que NO esté en la nueva versión se ELIMINA.</strong> Garantiza que el resultado final quede exactamente igual a lo que define la solución que estás importando — ni más, ni menos.</li>
            <li><strong>Stage for Upgrade</strong> — sube de versión pero <strong>retrasa el borrado</strong> de la versión anterior y sus patches hasta que tú apliques la actualización más tarde. Útil cuando necesitas tener <strong>ambas versiones convivendo</strong> temporalmente en el sistema para migrar datos antes de completar el cambio. Al aplicar la actualización definitiva, se borra igual que en <strong>Upgrade</strong>.</li>
            <li><strong>Update</strong> — reemplaza con la nueva versión pero <strong>NO borra</strong> los componentes que no estén en ella; se quedan en el sistema sueltos. Ojo: si esos componentes se borraron en el entorno de <strong>origen</strong>, el entorno de <strong>destino</strong> puede acabar con componentes "huérfanos" que ya no existen donde se generó la solución.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>Si quitaste algo a propósito de tu solución (una acción vieja, un subflow que ya no usas) y quieres que <strong>desaparezca también en producción</strong> al actualizar, necesitas <strong>Upgrade</strong>, no Update — Update lo dejaría abandonado en el entorno destino sin que tú lo veas.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-apps/maker/data-platform/update-solutions" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Actualizar una solución ↗</a>
        </div>
      </article>

      <!-- 15.8 -->
      <article class="doc-section open" id="s158">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">15.8</span><span class="sh-title">El error más común: "Import failed due to missing dependencies"</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>El fallo de importación más frecuente en la práctica: la solución depende de un componente (tabla, columna, app, otro flujo) que <strong>existe en el entorno origen pero no en el destino</strong> — y la importación se detiene hasta resolverlo.</p>
          <p><strong>Causa típica:</strong> tu solución reutiliza componentes que ya existían sueltos en el entorno de origen (sin estar incluidos explícitamente en la solución), o el entorno origen recibió una actualización de Microsoft que el destino todavía no tiene.</p>
          <p><strong>Cómo diagnosticarlo:</strong> el propio portal te lleva a una página de <strong>"Missing dependencies"</strong> que lista los componentes que faltan, organizados en categorías (componentes no administrados, aplicaciones). Si el componente que falta es parte de una <strong>aplicación/solución de Microsoft</strong>, verás un botón <strong>Install/Update</strong> que te lleva directo al Power Platform admin center para instalarlo — si no tienes permisos de administrador, puedes copiar el enlace de instalación y pasárselo a quien sí los tenga.</p>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging</span>
            <p>Si el componente que falta es <strong>tuyo</strong> (no de Microsoft) y es una <strong>customización unmanaged</strong> del entorno origen que no incluiste en la solución: vuelve al origen, añade ese componente que falta a la solución, expórtala de nuevo, e importa esa versión actualizada. Otra vía para investigar manualmente: abre el paquete de la solución exportada (es un .zip), busca el archivo <code>solution.xml</code> dentro, y revisa qué dependencias declara.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/troubleshoot/power-platform/power-apps/solutions/missing-dependency-on-solution-import" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Error de dependencias faltantes al importar una solución ↗</a>
        </div>
      </article>

      <!-- 15.9 -->
      <article class="doc-section open" id="s159">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">15.9</span><span class="sh-title">Si algo sale mal: rollback, y el riesgo de los flujos huérfanos</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p><strong>Sobre deshacer un despliegue:</strong> Power Platform no tiene un botón nativo de "deshacer importación" fuera de un escenario concreto. Si usas <strong>Pipelines</strong> (15.1) para desplegar, sí existe una función de <strong>redeploy</strong>: desde el historial de ejecuciones del pipeline puedes volver a desplegar una <strong>versión anterior</strong> de la solución sobre producción, con las mismas comprobaciones de seguridad que un despliegue normal. El propio <strong>owner del pipeline</strong> controla si esta opción de redespliegue está permitida o no — no es algo que cualquiera pueda activar a su antojo.</p>
          <p>Si <strong>no</strong> usas Pipelines y desplegaste a mano (exportar/importar manual, como en 15.2), no hay un "deshacer" automático — el plan B realista es tener guardada la <strong>versión anterior exportada</strong> (15.1, control de versiones) y volver a importarla manualmente para revertir.</p>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · el riesgo que nadie ve venir</span>
            <p>Si alguien crea un flujo o una conexión <strong>fuera</strong> de una solución formal —algo muy fácil que pase en el día a día— y esa persona <strong>deja la organización</strong>, ese flujo y sus conexiones se quedan <strong>huérfanos</strong>: nadie es dueño formal, pueden dejar de funcionar sin previo aviso, y son difíciles de localizar porque no aparecen agrupados en ninguna solución. Es una de las razones de fondo por las que ALM con solutions importa incluso en equipos pequeños: todo lo que vaya a producción debería <strong>vivir dentro de una solución</strong>, no creado suelto en el entorno por defecto.</p>
          </div>
          <a class="source" href="https://www.microsoft.com/en-us/power-platform/blog/power-apps/redeploy-past-solution-versions-using-pipelines/" target="_blank" rel="noopener">Fuente oficial · Microsoft Power Platform Blog — Redesplegar versiones anteriores con Pipelines ↗</a>
        </div>
      </article>

      <!-- 15.10 -->
      <article class="doc-section open" id="s1510">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">15.10</span><span class="sh-title">Lo más reciente: historial de versiones propio del flujo, y Git nativo</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Dos capacidades más recientes, distintas del mecanismo de solutions (15.1) pero que conviene tener en el mapa porque cambian cómo trabajas el día a día:</p>
          <ul>
            <li><strong>Version control en el propio desktop flow</strong> — cada desktop flow tiene ahora su <strong>historial de versiones</strong>: cada vez que lo abres, puedes guardar <strong>borradores (drafts)</strong> según avanzas, y decidir cuándo <strong>publicar</strong> una versión como la oficial. El historial muestra <strong>quién cambió qué y cuándo</strong>, y permite <strong>comparar dos versiones cualquiera lado a lado</strong> — no solo la actual contra la anterior.</li>
            <li><strong>Git integration nativo</strong> — Power Platform permite sincronizar una solución directamente con un repositorio <strong>Git de Azure DevOps</strong> desde la propia experiencia de soluciones del portal, sin herramientas externas. Está pensado para el entorno de <strong>desarrollo</strong> — test y producción siguen desplegándose vía Pipelines (15.1), no vía Git directo.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>Dos efectos secundarios reales del version control de desktop flows: <strong>1)</strong> si guardas como <strong>draft</strong> (sin publicar), el <strong>self-healing</strong> de selectores de UI (Bloque 5) <strong>no repara</strong> elementos en cada ejecución — esa protección solo aplica a versiones publicadas. <strong>2)</strong> Importar un flujo publicado puede <strong>fallar</strong> si el entorno destino tiene un <strong>draft sin publicar</strong> de ese mismo flujo — revisa que no haya cambios a medias antes de importar.</p>
          </div>
          <p>Buenas prácticas oficiales para el historial de versiones: guarda <strong>drafts con frecuencia</strong> mientras desarrollas (tienes de dónde recuperar si algo sale mal), publica <strong>solo versiones probadas y estables</strong>, usa el <strong>historial para revertir</strong> en vez de reconstruir el flujo desde cero si algo se rompe, y si varios desarrolladores tocan el mismo flujo, <strong>coordinaos</strong> para no pisaros ediciones a la vez.</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Si tu equipo crece y empieza a sentir que falta "control de versiones de verdad" sobre los desktop flows, esto es justo lo que cubre ese hueco — sin tener que montar nada externo. Para PAD Ninja en concreto: por licencia M365, tu equipo trabaja exclusivamente con M365 Copilot Premium, así que confirma con tu administrador de Power Platform si el version control de desktop flows y el Git integration ya están habilitados en vuestro tenant antes de asumir que están disponibles — son capacidades relativamente nuevas (2025 wave 2 / Git integration general) y su disponibilidad puede depender de la versión de PAD y de la configuración del entorno.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/version-control" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Control de versiones en Power Automate Desktop ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 16 ============ -->
    <section class="block-group" id="block-16">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-16">
        <span class="bg-badge">Bloque 16</span>
        <h2 class="bg-head-title">Documentación</h2>
        <span class="bg-sub">Que el flujo se explique solo, dentro de seis meses y para otra persona</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-16">

      <!-- 16.1 -->
      <article class="doc-section open" id="s161">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">16.1</span><span class="sh-title">Documentar sin salir del flujo: Region, comentarios, nombres</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Antes de llegar a la IA (16.2), la base de un flujo legible son herramientas <strong>nativas y sin IA</strong>, recomendadas en la propia guía oficial de buenas prácticas:</p>
          <ul>
            <li><strong>Region / End region</strong> — acciones de flow control (ya vistas de pasada en el Bloque 4) que <strong>agrupan visualmente</strong> un conjunto de acciones bajo un nombre, sin ningún efecto funcional sobre el flujo. La región se puede <strong>colapsar y expandir</strong> en el diseñador — perfecto para que un flujo largo (como tu robot de facturas) se pueda leer por bloques lógicos: "Leer Excel", "Procesar formulario web", "Adjuntar PDF", "Enviar informe".</li>
            <li><strong>Dividir en subflows</strong> — más allá de la reutilización (Bloque 4), trocear un flujo largo en subflows con nombres descriptivos es en sí mismo una forma de documentación: el panel de subflows se convierte en un índice de lo que hace el robot.</li>
            <li><strong>Nombrar bien las acciones y variables</strong> — suena obvio, pero es la base: una acción renombrada como "Adjuntar PDF de factura al formulario" se explica sola; "Step 14" no.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Esta documentación "manual" no sustituye a un documento aparte si tu organización lo exige formalmente, pero es la que de verdad se mantiene actualizada — vive dentro del propio flujo, así que es imposible que quede desincronizada de lo que el robot hace en realidad (el problema clásico de la documentación externa que nadie actualiza).</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/guidance/desktop-flow-coding-guidelines/build-readable-flow-scripts" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Construir scripts de flujo legibles y mantenibles ↗</a>
        </div>
      </article>

      <!-- 16.2 -->
      <article class="doc-section open" id="s162">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">16.2</span><span class="sh-title">Copilot "Summarize actions & subflows": que la IA te explique el flujo</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Dentro del diseñador de PAD hay un panel lateral de <strong>Copilot</strong> con varias "skills" (habilidades) seleccionables — la que toca aquí es <strong>"Summarize actions & subflows"</strong>, pensada exactamente para generar documentación a partir de un flujo ya construido.</p>
          <ul>
            <li>Se activa eligiendo esa skill del <strong>selector de skills de Copilot</strong> en el diseñador, y escribiendo la petición en <strong>lenguaje natural</strong>.</li>
            <li>Puedes pedir un resumen de una <strong>acción concreta</strong> ("Summarize action in line 4"), de un <strong>rango</strong> ("What do actions from 3 to 12 do?"), o de un <strong>subflow entero por nombre</strong> ("Summarize subflow 'Main'").</li>
            <li>Puedes pedir <strong>el nivel de detalle</strong> que necesites — desde un resumen de un par de frases hasta una explicación más larga, simplemente indicándolo en la petición.</li>
            <li>Cada respuesta de Copilot tiene botones de <strong>feedback (pulgar arriba/abajo)</strong> para reportarlo a Microsoft, salvo que el administrador del tenant lo haya desactivado.</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Uso real: cuando el robot esté terminado, pides a Copilot un resumen del subflow <code>FlowExceptionHandler</code> (Bloque 11) y del bucle principal de procesado — útil tanto para documentación que entregues a tu equipo de DSI como para que, dentro de seis meses, tú mismo recuerdes rápido qué hace cada parte sin tener que releer acción por acción.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/copilot-in-power-automate-for-desktop" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Empezar con Copilot en Power Automate Desktop ↗</a>
        </div>
      </article>

      <!-- 16.3 -->
      <article class="doc-section open" id="s163">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">16.3</span><span class="sh-title">Repair with Copilot at runtime: cuando el self-healing normal ya falló</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Esta es la pieza que más fácil se malinterpreta por el nombre: <strong>"repair automation errors"</strong> con Copilot <strong>no es un chat</strong> al que le preguntas "¿por qué falló mi flujo?". Para entenderla, conviene compararla directamente con algo que ya conoces:</p>
          <ul>
            <li><strong>Self-healing normal (Bloque 5)</strong> — cuando PAD no encuentra el elemento con el selector guardado, <strong>prueba variaciones parecidas</strong> de ese mismo selector (otro atributo, una coincidencia parcial). Es una lógica de "buscar algo similar a lo que ya tenía" — sin IA generativa.</li>
            <li><strong>Repair with Copilot (esta sección)</strong> — entra en juego <strong>solo cuando ese intento normal ya falló</strong> y la acción está a punto de tumbar el flujo. En vez de rendirse, PAD le manda a Copilot el <strong>selector antiguo inválido</strong> y el <strong>árbol completo de elementos</strong> de esa ventana o pestaña (todos los botones, campos, etiquetas presentes). Copilot <strong>razona sobre ese árbol</strong> con IA generativa y decide cuál es el elemento correcto; PAD genera un <strong>selector nuevo</strong> a partir de esa respuesta, y la acción se ejecuta con él.</li>
          </ul>
          <p>En una frase: el Bloque 5 es <em>"prueba algo parecido a lo que ya tenías"</em>; esto es <em>"pregúntale a una IA que mire toda la pantalla y decida"</em> — un segundo nivel de defensa que solo se activa cuando el primero no fue suficiente.</p>
          <ul>
            <li><strong>Cuándo actúa:</strong> solo cuando el flujo se ejecuta <strong>vía portal</strong> (atendido o desatendido, como parte de un cloud flow con <code>Run a flow built with Power Automate for desktop</code>) y falla una acción de <strong>UI o navegador</strong> por no encontrar su elemento.</li>
            <li><strong>Tu decisión en cada caso:</strong> puedes usar el selector reparado <strong>solo para esa ejecución puntual</strong>, o <strong>guardarlo</strong> para próximas ejecuciones — no se decide solo, en silencio.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>Es una función de tipo <strong>preview</strong>, disponible inicialmente en la región US, y el maker puede <strong>activarla o desactivarla</strong> — no asumas que está encendida por defecto en tu entorno.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/faqs-repair-copilot" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — FAQ de Repair with Copilot at runtime ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 17 ============ -->
    <section class="block-group" id="block-17">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-17">
        <span class="bg-badge">Bloque 17</span>
        <h2 class="bg-head-title">Copilot en PAD</h2>
        <span class="bg-sub">Construir describiendo, en vez de arrastrando acción por acción</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-17">

      <!-- 17.1 -->
      <article class="doc-section open" id="s171">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">17.1</span><span class="sh-title">Crear flujos describiendo la tarea (Natural Language to Flow)</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Desde el panel de Copilot en el diseñador de PAD (el mismo panel del Bloque 16, con la skill <strong>"Create flows using Copilot"</strong>), puedes describir en lenguaje natural lo que quieres automatizar y Copilot genera la <strong>estructura inicial</strong> del flujo — acciones encadenadas listas para revisar y ajustar.</p>
          <ul>
            <li>Funciona tanto para <strong>crear un flujo nuevo desde cero</strong> como para <strong>añadir pasos</strong> a uno que ya tienes abierto.</li>
            <li>Ejemplo real citado por Microsoft: pedirle a Copilot que automatice <em>"leer y escribir contenido de un archivo Excel y luego enviarlo por correo"</em> genera directamente esa secuencia de acciones.</li>
            <li>Lo que genera es un <strong>punto de partida</strong>, no el flujo terminado — revisas, ajustas selectores/rutas concretas, y completas lo que Copilot no pudo inferir solo con la descripción.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>Esta capacidad es <strong>preview</strong>, está construida sobre <strong>Azure OpenAI Service</strong>, y la propia documentación es clara: <strong>no está pensada para producción</strong> tal cual — es para evaluar y dar feedback, no para que sea el método único de construcción de flujos críticos todavía.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/copilot-in-power-automate-for-desktop" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Empezar con Copilot en Power Automate Desktop ↗</a>
        </div>
      </article>

      <!-- 17.2 -->
      <article class="doc-section open" id="s172">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">17.2</span><span class="sh-title">Natural language to code: scripts sin tener que saber programar</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Una capacidad distinta y más concreta que 17.1: dentro de las acciones de <strong>scripting</strong> del Bloque 8 — <code>Run PowerShell</code>, <code>Run Python</code>, <code>Run JavaScript</code>, <code>Run VBScript</code>, <code>Run DOS command</code> — Copilot puede <strong>generar el código</strong> de esa acción a partir de una descripción en lenguaje natural de lo que quieres que haga.</p>
          <p>Pensada explícitamente para gente que <strong>no domina el lenguaje de script en cuestión</strong>: describes el objetivo ("lee este CSV y devuelve solo las filas donde el importe sea mayor a 1000"), Copilot escribe el PowerShell/Python correspondiente, y tú lo revisas antes de ejecutar.</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Microsoft lo recalca explícitamente: <strong>revisa siempre el resultado de Copilot</strong> antes de confiar en él, y formula peticiones claras y específicas con contexto — la calidad de la pregunta determina la calidad del script generado, igual que con cualquier asistente de IA.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/faqs-copilot-nl-to-code" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — FAQ de natural language to code en acciones de scripting ↗</a>
        </div>
      </article>

      <!-- 17.3 -->
      <article class="doc-section open" id="s173">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">17.3</span><span class="sh-title">Record with Copilot: deprecado — y cuál es la alternativa actual</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Si investigas por tu cuenta sobre Copilot en PAD, es muy probable que te encuentres con <strong>"Record with Copilot"</strong> (también llamado <em>AI Recorder</em>): una función que permitía compartir pantalla y <strong>narrar en voz alta</strong> la tarea —como si se la explicaras a otra persona— mientras Copilot capturaba voz, ratón y teclado para convertirlo todo en un desktop flow.</p>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · información que cambia rápido</span>
            <p>La propia página oficial de Microsoft Learn marca esta función como <strong>deprecada</strong> a día de hoy. La recomendación actual de Microsoft es: para crear un flujo, <strong>descríbelo en lenguaje natural</strong> con Copilot (17.1) y usa el <strong>grabador normal</strong> (Bloque 2) donde haga falta complementar; o, para automatización guiada por descripción de más alto nivel, valorar un <strong>agente de Copilot Studio con "computer use"</strong> — una capacidad distinta, fuera de PAD, que permite describir una tarea en lenguaje natural y que el agente la ejecute directamente sobre un ordenador.</p>
          </div>
          <p>Lo dejamos documentado aquí precisamente porque es un ejemplo real de algo que <strong>cambia rápido</strong> en el espacio de Copilot — si en algún momento ves referencias (vídeos, artículos) a "Record with Copilot" como función activa, contrástalo contra la fuente oficial antes de basar nada en ello.</p>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/create-flow-using-ai-recorder" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Record with Copilot (deprecado) ↗</a>
        </div>
      </article>

      <!-- 17.4 -->
      <article class="doc-section open" id="s174">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">17.4</span><span class="sh-title">Disponibilidad real por región — y qué verás tú en concreto</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>No todas las capacidades de Copilot en PAD están disponibles igual en todas las regiones — y la diferencia es grande, no un matiz menor:</p>
          <ul>
            <li><strong>Crear flujos con Copilot (17.1)</strong> — según documentación, su disponibilidad ha estado limitada a <strong>Estados Unidos</strong> en buena parte de su ciclo de preview. Conviene verificar el estado actual en tu propio entorno antes de asumir que está disponible.</li>
            <li><strong>Responder preguntas de producto y "Summarize actions & subflows" (Bloque 16)</strong> — disponibilidad mucho más amplia: Asia-Pacífico, Australia, Brasil, Canadá, Europa, Francia y más regiones.</li>
            <li><strong>Natural language to code (17.2)</strong> — lista de regiones también amplia (incluye Europa, Reino Unido, Alemania, Francia, entre otras).</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · activación por tenant</span>
            <p>Independientemente de la región, Copilot en Power Automate se activa o desactiva a nivel de <strong>tenant</strong> por un administrador — en regiones con GPU disponible (Reino Unido, Australia, Estados Unidos, India) viene <strong>activado por defecto</strong> y un admin debe contactar soporte para desactivarlo; en el resto de regiones se activa mediante el ajuste de <strong>"cross-geo data sharing"</strong> en el Power Platform admin center. No hay control a nivel de entorno individual, solo a nivel de tenant completo.</p>
          </div>
          <div class="callout callout--proyecto">
            <span class="c-tag">Tu contexto · IMA Ibérica</span>
            <p>Como tu departamento opera con <strong>M365 Copilot Premium</strong> como herramienta LLM estándar, lo más útil no es asumir qué capacidades de este bloque tienes activas, sino <strong>confirmarlo con tu administrador de Power Platform</strong> — tanto la región de tu entorno como el ajuste de "cross-geo data sharing" determinan qué ves realmente en tu diseñador de PAD.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/copilot-in-power-automate-for-desktop" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Empezar con Copilot en Power Automate Desktop ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 18 ============ -->
    <section class="block-group" id="block-18">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-18">
        <span class="bg-badge">Bloque 18</span>
        <h2 class="bg-head-title">Trucos y productividad</h2>
        <span class="bg-sub">Las decisiones pequeñas que hacen que un flujo aguante en producción</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-18">

      <!-- 18.1 -->
      <article class="doc-section open" id="s181">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">18.1</span><span class="sh-title">La jerarquía de acciones: cuál elegir primero, y por qué</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>La propia guía oficial de optimización de PAD da un <strong>orden de preferencia explícito</strong> para decidir qué tipo de acción usar al automatizar algo — de más a menos recomendable:</p>
          <ul>
            <li><strong>1) Acciones de conectores cloud</strong> — si lo que tocas tiene un conector de Power Automate (SharePoint, Dataverse...), úsalo antes que automatizar la interfaz a lo bruto.</li>
            <li><strong>2) Acciones específicas de la app/archivo</strong> — las acciones dedicadas de Excel, PDF, archivos/carpetas (Bloque 7) que ya conoces: más estables que simular clics.</li>
            <li><strong>3) UI automation y Browser automation</strong> — interactuar con elementos de interfaz reales (Bloques 5 y 6) cuando no hay conector ni acción específica.</li>
            <li><strong>4) Último recurso: imagen, OCR, ratón/teclado y portapapeles</strong> — <code>Move mouse to image</code>, <code>Extract text with OCR</code>, <code>Send keys</code>, <code>Send mouse click</code>. Son las menos fiables porque dependen de coordenadas o de coincidencia visual, no de la estructura real de la interfaz — resérvalas para cuando de verdad no hay otra vía.</li>
          </ul>
          <p>Para escenarios todavía más exigentes, la propia guía también menciona acciones de <strong>scripting</strong> (<code>Run Python</code>, <code>Run VBScript</code>, Bloque 8) y <strong>HTTP</strong> (<code>Invoke web service</code>) como alternativas avanzadas cuando ninguna de las anteriores encaja bien.</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Para extraer texto de una imagen o PDF, antes de recurrir a <code>Extract text with OCR</code> en un desktop flow, la documentación apunta a una alternativa potencialmente más fiable si tu escenario lo permite: la acción de conector cloud <strong>"Recognize text in an image or a PDF document"</strong> de AI Builder, disponible para cloud flows.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/guidance/desktop-flow-coding-guidelines/optimize-flow-performance" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Optimizar el rendimiento de un flujo ↗</a>
        </div>
      </article>

      <!-- 18.2 -->
      <article class="doc-section open" id="s182">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">18.2</span><span class="sh-title">UIA vs MSAA: el tipo de selector correcto para cada aplicación</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Cuando capturas un elemento de UI de escritorio (Bloque 5) — desde el grabador o desde el panel de UI elements — el grabador soporta <strong>dos tecnologías de selector</strong> distintas, elegibles desde el menú <strong>Capturing mode</strong>:</p>
          <ul>
            <li><strong>UIA (UI Automation)</strong> — el framework de accesibilidad <strong>moderno</strong> de Microsoft, pensado para apps construidas con frameworks actuales (WPF, WinForms, UWP). Ofrece información de elementos más completa, jerarquías más claras, y <strong>mayor fiabilidad</strong>.</li>
            <li><strong>MSAA (Microsoft Active Accessibility)</strong> — la tecnología <strong>anterior</strong> a UIA, que sigue siendo necesaria para algunas aplicaciones más antiguas que no exponen bien sus elementos vía UIA.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>La recomendación oficial es clara y directa: usa <strong>UIA siempre que sea posible</strong>, para mejor rendimiento, mantenibilidad y compatibilidad. El picker de UI elements opera en modo UIA <strong>por defecto</strong> — solo cambia a MSAA si una aplicación concreta (típicamente alguna más antigua o un control no estándar) no se deja capturar bien en UIA.</p>
          </div>
          <p>Para capturar manualmente cualquier elemento adicional, el atajo es <strong><code>Ctrl</code> + clic izquierdo</strong> sobre el elemento, desde el panel de UI elements o directamente desde una acción.</p>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/ui-elements" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Automatizar usando elementos de UI ↗</a>
        </div>
      </article>

      <!-- 18.3 -->
      <article class="doc-section open" id="s183">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">18.3</span><span class="sh-title">Repartir la carga entre máquinas, sin saturar nada</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Recordatorio del Bloque 14 con una capa más de detalle: los desktop flows quedan <strong>en cola hasta 12 horas</strong> esperando una máquina libre antes de fallar por <code>NoCandidateMachine</code>. La guía oficial de buenas prácticas recomienda una de estas dos estrategias para evitarlo en escenarios con volumen:</p>
          <ul>
            <li><strong>Repartir en el tiempo</strong> — si tienes pocas máquinas y controlas tú los disparadores, planifica que tus desktop flows se ejecuten <strong>en horas distintas</strong> en vez de todos a la vez, para no saturar la capacidad disponible.</li>
            <li><strong>Machine groups en paralelo</strong> (Bloque 14) — crea grupos de máquinas con <strong>configuración idéntica</strong> que ejecuten el mismo tipo de flujo en paralelo, repartiendo la carga automáticamente entre ellas.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Antes de comprometerte con un volumen de ejecuciones desatendidas en paralelo, calcula cuántas necesitarás de verdad y compra las <strong>Process licenses</strong> (Bloque 14.6) correspondientes con margen — quedarte corto de licencias es una causa directa de cola saturada que no tiene que ver con capacidad de máquina, sino con licenciamiento.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/run-desktop-flows-best-practices" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Buenas prácticas para ejecutar desktop flows ↗</a>
        </div>
      </article>

      <!-- 18.4 -->
      <article class="doc-section open" id="s184">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">18.4</span><span class="sh-title">Timeouts largos: cuando un flujo tarda más de 24 horas</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Si tu desktop flow procesa un volumen tan grande que la ejecución puede superar las <strong>24 horas</strong>, hay un timeout por defecto en la acción de cloud flow que lo lanza y que puede cortarlo antes de que termine, sin que sea un fallo real del flujo en sí.</p>
          <p>Para evitarlo, en el <strong>cloud flow</strong> que contiene la acción <code>Run a flow built with Power Automate for desktop</code>:</p>
          <ul>
            <li>Selecciona los <strong>tres puntos (…)</strong> en la esquina superior de esa acción.</li>
            <li>Elige <strong>Settings</strong>.</li>
            <li>Busca la opción <strong>Timeout</strong> y ajusta la duración a un valor acorde a lo que tu flujo necesita de verdad.</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Proyecto Hilo · robot de facturas</span>
            <p>Si el volumen de facturas creciera mucho (conectando con el escenario de Work queues del Bloque 14.4) y un lote completo empezara a acercarse a ejecuciones de varias horas, este es el ajuste que evita que el cloud flow dé por fallida una ejecución que en realidad solo necesitaba más tiempo.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/run-desktop-flows-best-practices" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Buenas prácticas para ejecutar desktop flows ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 19 ============ -->
    <section class="block-group" id="block-19">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-19">
        <span class="bg-badge">Bloque 19</span>
        <h2 class="bg-head-title">Proyecto guiado (capstone)</h2>
        <span class="bg-sub">Todo el Proyecto Hilo, por fin junto: el robot de facturas de principio a fin</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-19">

      <!-- 19.1 -->
      <article class="doc-section open" id="s191">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">19.1</span><span class="sh-title">El robot completo, de un vistazo</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Desde el Bloque 3 hemos ido dejando piezas sueltas del mismo robot — un Excel con cientos de facturas que hoy procesas a mano, una a una, rellenando un formulario web (o SAP) y adjuntando el PDF correspondiente. Este bloque no añade <strong>ningún concepto nuevo</strong>: cose todas esas piezas en el orden real en que se ejecutan, para que tengas el plano completo delante.</p>
          <p><strong>Lo que hace el robot, en una frase:</strong> lee un Excel con el listado de facturas → por cada fila, rellena un formulario (web o SAP) con sus datos y adjunta su PDF → registra si salió bien o mal → al terminar, manda un informe por correo con el resultado de todo el lote.</p>
          <div class="callout callout--tip">
            <span class="c-tag">Cómo leer este bloque</span>
            <p>Cada paso enlaza al bloque donde se explicó <strong>en detalle</strong> — esto es el "mapa de carreteras", no una repetición de las explicaciones. Si algo no te suena, vuelve al bloque referenciado antes de seguir.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/guidance/desktop-flow-coding-guidelines/build-readable-flow-scripts" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Construir scripts de flujo legibles y mantenibles ↗</a>
        </div>
      </article>

      <!-- 19.2 -->
      <article class="doc-section open" id="s192">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">19.2</span><span class="sh-title">Main: el flujo de principio a fin</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Así queda el subflow <code>Main</code> de arriba a abajo:</p>
          <ul>
            <li><strong>1) Variables de entrada</strong> (Bloque 3) — la ruta del Excel y de la carpeta de PDFs como variables de entrada normales; usuario y contraseña del portal (o de SAP) como <strong>variable sensible</strong>, encriptada.</li>
            <li><strong>2) Cargar el listado</strong> (Bloque 7) — <code>Launch Excel</code> con la ruta de entrada → <code>Read from Excel worksheet</code> trae todo el listado como una <strong>Datatable</strong> de una sola vez.</li>
            <li><strong>3) El bucle</strong> (Bloque 4) — <code>For each</code> sobre esa Datatable. En cada vuelta, <code>%CurrentItem%</code> es la fila de la factura actual.</li>
            <li><strong>4) Dentro del bucle: procesar una factura</strong> — en vez de meter toda la lógica suelta dentro del <code>For each</code>, se llama a un <strong>subflow</strong> dedicado, <code>ProcesarFactura</code>, pasándole la fila actual como parámetro (19.3 lo desarrolla entero).</li>
            <li><strong>5) Tras el bucle: el informe</strong> (Bloque 9) — con la Datatable de resultados OK/KO ya acumulada (Bloque 7), se genera el cuerpo del correo (con <code>Send as HTML</code> activado para que se vea como una tabla, no texto plano) y se envía con <code>Send email message through Outlook</code> — o con la acción de <strong>email genérico</strong> si la máquina desatendida no tiene Outlook instalado.</li>
          </ul>
          <div class="callout callout--debug">
            <span class="c-tag">Debugging</span>
            <p>Para mantener el <code>Main</code> legible (Bloque 16), las cuatro fases de arriba se marcan con <code>Region</code>/<code>End region</code>: "Carga de datos", "Bucle de procesado", "Informe final" — así, al abrir el flujo dentro de seis meses, el mapa general se lee de un vistazo sin tener que expandir nada.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/actions-reference/excel" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Acciones de Excel ↗</a>
        </div>
      </article>

      <!-- 19.3 -->
      <article class="doc-section open" id="s193">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">19.3</span><span class="sh-title">El subflow ProcesarFactura: el corazón del robot</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Todo este subflow vive envuelto en un único <code>On block error</code> con <strong>Continue flow run</strong> (Bloque 11) — así, una factura problemática <strong>no tumba las otras 999</strong>. Por dentro, en orden:</p>
          <ul>
            <li><strong>1) Construir la ruta del PDF</strong> (Bloque 8) — concatenar <code>%CarpetaPDFs%</code> + el ID de factura de la fila (<code>%CurrentItem['ID']%</code>) + <code>".pdf"</code>.</li>
            <li><strong>2) Comprobar que el PDF existe</strong> (Bloque 7) — <code>If file exists</code> sobre esa ruta. Si falta, se lanza un <code>Throw custom error</code> (Bloque 4/11) con un mensaje claro — eso lo recoge el <code>On block error</code> de arriba como un KO controlado, no como un fallo del sistema.</li>
            <li><strong>3) Rellenar el formulario</strong> (Bloques 5 y 6) — usando los <strong>UI elements capturados una sola vez</strong> con selectores cortos, anclados a contenedores estables (no a posiciones absolutas), <code>Populate text field</code> por cada campo con los datos de <code>%CurrentItem%</code>.</li>
            <li><strong>4) Adjuntar el PDF y enviar</strong> (Bloque 6) — adjuntar el archivo verificado en el paso 2, y <code>Press button on web page</code> para enviar el formulario.</li>
            <li><strong>5) Registrar el resultado</strong> (Bloque 7) — <code>Get first free row</code> + <code>Write to Excel worksheet</code> sobre el Excel de log: una fila por factura procesada, con columna de estado (<strong>OK</strong> o <strong>KO</strong>) y, si fue KO, el motivo exacto sacado de <code>Get last error</code> → <code>%LastError.Message%</code> (Bloque 11).</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Variante SAP</span>
            <p>Si tu lote de facturas se procesa por <strong>SAP</strong> en vez de un formulario web (Bloque 10), el subflow es el mismo esqueleto con el paso 3 cambiado: <code>Launch SAP</code> + navegación a la transacción (<strong>FB60</strong> o <strong>MIRO</strong>, según confirmes con financiero — MIRO necesita número de PO, FB60 no) + relleno de campos <strong>por ID</strong>, no por posición — así el idioma de la instalación de SAP deja de ser un problema.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/errors" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Gestionar errores en desktop flows ↗</a>
        </div>
      </article>

      <!-- 19.4 -->
      <article class="doc-section open" id="s194">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">19.4</span><span class="sh-title">Qué falta para llevarlo a producción de verdad</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>El flujo de 19.2 y 19.3 ya es un robot <strong>funcionalmente completo</strong>. Antes de que lo use todo el departamento de forma oficial, esto es lo que conecta con bloques posteriores que ya cubrimos:</p>
          <ul>
            <li><strong>Probarlo de verdad</strong> (Bloque 12) — antes de soltarlo con datos reales, un caso de prueba con <code>Test a subflow of a desktop flow</code> sobre <code>ProcesarFactura</code>, simulando una fila con un PDF que falta a propósito, para confirmar que el KO se registra bien sin tocar el Excel real.</li>
            <li><strong>Empaquetarlo y promoverlo</strong> (Bloque 15) — el flujo nace y se prueba en tu entorno de desarrollo; cuando esté listo, se mete en una <strong>solución managed</strong> y se importa al entorno de producción de IMA, con sus propias conexiones de Excel/SAP/correo apuntando a los sistemas reales — no a los de prueba.</li>
            <li><strong>Documentarlo</strong> (Bloque 16) — un resumen de Copilot ("Summarize actions & subflows") sobre <code>ProcesarFactura</code>, para que dentro de seis meses —o cualquier otra persona de tu equipo— entienda la lógica sin releer acción por acción.</li>
            <li><strong>Decidir quién lo lanza</strong> (Bloque 14) — si el robot pasa de "lo uso yo" a "lo lanza todo el departamento", un botón en Power Apps o un trigger de SharePoint, con su licencia <strong>Process</strong> correspondiente si corre desatendido.</li>
            <li><strong>Vigilar que escale</strong> (Bloque 14.4 / 18.4) — si el volumen crece mucho, ahí esperan <strong>Work queues</strong> y el ajuste de <strong>timeout</strong> largo; con el volumen actual de tu robot, ninguno de los dos hace falta todavía.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">El punto del capstone</span>
            <p>Si has seguido los Bloques 1 al 18, no hay nada en este robot que no hayas construido ya por partes. Este bloque no enseña nada nuevo a propósito — demuestra que, pieza a pieza, ya sabes construir un robot de producción real, de los que de verdad se usan en una empresa.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/guidance/planning-powerautomate-projects/deploying-and-refining-phase" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Fase de despliegue y refinamiento de un proyecto de Power Automate ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 20 ============ -->
    <section class="block-group" id="block-20">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-20">
        <span class="bg-badge">Bloque 20</span>
        <h2 class="bg-head-title">Migración UiPath → PAD</h2>
        <span class="bg-sub">El puente que hemos tendido en cada bloque, ahora consolidado de golpe</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-20">

      <!-- 20.1 -->
      <article class="doc-section open" id="s201">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">20.1</span><span class="sh-title">No hay conversor oficial: el panorama real</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Primero, la pregunta directa: <strong>Microsoft no ofrece ninguna herramienta oficial</strong> que convierta automáticamente un proyecto de UiPath (sus archivos <code>.xaml</code>) en un desktop flow de PAD. No existe un botón "importar desde UiPath".</p>
          <p>Lo que sí existe es un mercado de <strong>herramientas de terceros</strong> (consultoras y productos comerciales, no Microsoft) que prometen automatizar buena parte de la conversión analizando el XML interno de los archivos <code>.xaml</code> — extrayendo selectores, variables y lógica para reconstruirlos como acciones de PAD. Algunas citan cifras de precisión automática en torno al <strong>75-90%</strong> para la conversión base.</p>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · esto no es documentación de Microsoft</span>
            <p>Todo lo de esta sección sobre herramientas de terceros procede de <strong>material de comunidad y de proveedores comerciales</strong>, no de Microsoft Learn — no hay forma de verificar de forma independiente esas cifras de precisión, y conviene tratarlas como <strong>marketing del propio proveedor</strong>, no como un dato objetivo contrastado. Si exploras alguna de estas herramientas, hazlo con un piloto pequeño y verificación manual exhaustiva del resultado, nunca asumiendo que el porcentaje publicitado se va a cumplir en tu caso concreto.</p>
          </div>
          <p>La fuente de comunidad más citada coincide en algo importante: <strong>la migración nunca es un simple "lift-and-shift"</strong>. Cada plataforma es propietaria y no fue diseñada pensando en compatibilidad con la otra — incluso con la mejor herramienta de conversión, hace falta una <strong>auditoría previa y un rediseño consciente</strong>, no solo una traducción mecánica.</p>
          <a class="source" href="https://community.powerplatform.com/forums/thread/details/?threadid=d4c03a11-aa70-4cb2-93ce-45f01cce987c" target="_blank" rel="noopener">Fuente de comunidad · Power Platform Community — Cómo migrar de UiPath a Power Automate ↗</a>
        </div>
      </article>

      <!-- 20.2 -->
      <article class="doc-section open" id="s202">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">20.2</span><span class="sh-title">Entender UiPath a fondo antes de migrar: Academy, docs, y leer el .xaml directamente</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Antes de migrar un proceso, vale la pena entender <strong>de verdad</strong> qué hace en UiPath — no solo a ojo, sino con las herramientas oficiales de la propia plataforma. UiPath, igual que Microsoft con Power Automate, tiene su documentación y formación oficiales:</p>
          <ul>
            <li><strong>UiPath Academy</strong> (<code>academy.uipath.com</code>) — formación <strong>gratuita</strong> y oficial de UiPath, organizada en rutas de aprendizaje. La más relevante para entender procesos ya construidos es <strong>"RPA Developer Foundation"</strong> — un plan de ~20 cursos (unas 35 horas en total) que cubre desde el ecosistema Studio/Robot/Orchestrator hasta el desarrollo de proyectos de automatización empresarial, con diploma al terminar. Si los procesos a migrar usan <strong>StudioX</strong> (perfil citizen developer, no programador), existe el plan equivalente <strong>"RPA Citizen Developer Foundation"</strong>, más corto (~13 horas).</li>
            <li><strong>Documentación técnica oficial</strong> — <code>docs.uipath.com</code>, el equivalente de UiPath a Microsoft Learn: referencia completa de actividades, conceptos de Studio/Orchestrator, y guías de cada producto.</li>
          </ul>
          <p>Más allá de la formación, hay algo que puedes hacer tú mismo <strong>sin ninguna herramienta especial</strong>: un archivo <code>.xaml</code> de UiPath es, por debajo, <strong>XML legible</strong> — puedes abrirlo con cualquier editor de texto o visor de XML y leer directamente su estructura: el nombre de cada actividad (<code>DisplayName</code>), las secuencias (<code>Sequence</code>), las llamadas a otros workflows (<code>InvokeWorkflowFile</code>), y cualquier <strong>anotación</strong> que el desarrollador original haya dejado (<code>Annotation.AnnotationText</code>) explicando qué hace cada bloque.</p>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Antes de instalar nada o pagar por una herramienta de conversión, abre el <code>.xaml</code> del proceso a migrar en un editor de texto y búscalo por <code>DisplayName</code> y <code>AnnotationText</code> — en procesos bien documentados, esto solo ya te da un <strong>resumen legible</strong> de la lógica completa, suficiente para escribir la descripción en lenguaje llano que necesitas para el paso 2 del plan de migración (20.5).</p>
          </div>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>Esto funciona bien para <strong>leer e inventariar</strong> la lógica — no esperes poder copiar y pegar fragmentos del XML de UiPath directamente en PAD; los formatos internos de ambas plataformas son completamente distintos e incompatibles entre sí.</p>
          </div>
          <a class="source" href="https://academy.uipath.com/" target="_blank" rel="noopener">Fuente oficial UiPath · UiPath Academy — Formación gratuita de RPA, automatización e IA ↗</a>
        </div>
      </article>

      <!-- 20.3 -->
      <article class="doc-section open" id="s203">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">20.3</span><span class="sh-title">Diferencias de fondo que rompen una migración directa</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Más allá del vocabulario (ya cubierto bloque a bloque con los 27 puentes UiPath→PAD repartidos por la guía), hay <strong>diferencias estructurales</strong> entre ambas plataformas que ninguna herramienta de conversión puede resolver del todo:</p>
          <ul>
            <li><strong>Variable scope</strong> — UiPath permite definir el <strong>ámbito</strong> de cada variable explícitamente (a nivel de una secuencia concreta, de todo el workflow...). En PAD, las variables son, en la práctica, <strong>globales dentro del flujo</strong> — no hay ese mismo control de ámbito granular. Un proyecto de UiPath que dependa mucho de scoping deliberado necesita repensarse, no solo traducirse variable por variable.</li>
            <li><strong>Selectores volátiles</strong> — copiar un selector de UiPath tal cual no funciona en PAD; las tecnologías de selector son distintas (Bloque 18.2: UIA/MSAA) y los atributos que UiPath captura no se corresponden uno a uno con los de PAD.</li>
            <li><strong>Tipos .NET</strong> — UiPath, construido sobre .NET, da acceso a muchos tipos y clases del framework directamente. PAD no expone ese mismo catálogo — lógica que dependa de tipos .NET específicos de UiPath suele necesitar <strong>reescritura</strong>, a veces recurriendo a las acciones de scripting del Bloque 8 (PowerShell, Python) para cubrir el hueco.</li>
          </ul>
          <div class="callout callout--tip">
            <span class="c-tag">Truco</span>
            <p>Antes de migrar cualquier proceso, identifica primero los que dependen mucho de estas tres cosas (scoping fino, selectores complejos, tipos .NET avanzados) — esos son los candidatos a <strong>reconstruir desde cero</strong> en PAD en vez de intentar traducir, mientras que procesos más simples (Excel, archivos, formularios web sencillos) sí migran razonablemente bien siguiendo el mismo patrón lógico.</p>
          </div>
          <a class="source" href="https://www.cfb-bots.com/single-post/how-to-migrate-from-uipath-to-power-automate" target="_blank" rel="noopener">Fuente de comunidad · CFB Bots — Cómo migrar de UiPath a Power Automate ↗</a>
        </div>
      </article>

      <!-- 20.4 -->
      <article class="doc-section open" id="s204">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">20.4</span><span class="sh-title">Try/Catch vs On block error: el hueco real del Throw/Rethrow</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Ya viste el puente conceptual entre <code>Try/Catch</code> de UiPath y <code>On block error</code> de PAD (Bloque 11) — funcionalmente equivalentes para capturar errores. Pero hay un hueco más fino que merece su propia mención, porque sorprende a quien migra un proceso con manejo de errores elaborado:</p>
          <ul>
            <li>UiPath ofrece actividades dedicadas <strong><code>Throw</code></strong> y <strong><code>Rethrow</code></strong> para lanzar una excepción y propagar un error ya capturado, respectivamente. <strong>PAD no tiene una acción <code>Rethrow</code> equivalente</strong>. Para lanzar un error a propósito sí existe <code>Throw custom error</code> (Bloque 4/11), pero para <strong>repropagar</strong> un error ya capturado dentro de un <code>On block error</code>, no hay un mecanismo directo — la vía habitual es guardar el error en una variable y comprobarla después del bloque de captura, un workaround más manual que el de UiPath.</li>
            <li>UiPath también tiene un <strong>Global Exception Handler</strong> — un workflow que intercepta automáticamente <strong>cualquier</strong> excepción no capturada a nivel de todo el proyecto. <strong>PAD no tiene equivalente de gestor global</strong> para desktop flows — esa protección "general" hay que construirla a mano combinando <code>On block error</code> en los puntos clave con subflows reutilizables (el patrón de "bloque envolviendo todo el Main" que ya viste en el Bloque 11.6).</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>Si el proceso que migras depende mucho de <code>Rethrow</code> o del Global Exception Handler de UiPath para su lógica de errores, <strong>no esperes una traducción limpia</strong> — es de las piezas que con más probabilidad necesitan rediseñarse desde cero con el patrón de robustez de PAD (Bloque 11.6), no traducirse línea a línea.</p>
          </div>
          <a class="source" href="https://www.cfb-bots.com/single-post/how-to-migrate-from-uipath-to-power-automate" target="_blank" rel="noopener">Fuente de comunidad · CFB Bots — Cómo migrar de UiPath a Power Automate ↗</a>
        </div>
      </article>

      <!-- 20.5 -->
      <article class="doc-section open" id="s205">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">20.5</span><span class="sh-title">Cómo abordar una migración real, paso a paso</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Juntando todo lo anterior con lo que ya tienes investigado de migrar UiPath a PAD de forma independiente (sin consultoría externa), un plan de migración razonable para un proceso concreto:</p>
          <ul>
            <li><strong>1) Auditar antes de tocar nada</strong> — identifica si el proceso de UiPath usa scoping de variables fino, selectores muy complejos, tipos .NET avanzados, o <code>Rethrow</code>/Global Exception Handler (20.2-20.3). Cuantos más de estos use, menos sentido tiene "traducir" y más sentido tiene <strong>reconstruir</strong>.</li>
            <li><strong>2) Documentar la lógica, no el código</strong> — describe qué hace el proceso paso a paso en lenguaje llano, no acción por acción de UiPath. Esa descripción es la que realmente usarás para reconstruirlo en PAD con sus propios patrones (Bloques 1-19), no una traducción literal de actividades.</li>
            <li><strong>3) Reconstruir con los patrones de PAD</strong>, no con los de UiPath — usa <code>On block error</code> con el patrón del Bloque 11.6, UI elements con selectores UIA (Bloque 18.2), y subflows organizados como en el Bloque 16, en vez de intentar forzar una equivalencia 1:1 con cada actividad de UiPath.</li>
            <li><strong>4) Probar exhaustivamente</strong> (Bloque 12) — un proceso migrado necesita <strong>más</strong> testing que uno nuevo, porque es fácil que un comportamiento sutil de UiPath (orden de evaluación, manejo de tipos) no se replique exactamente igual en PAD sin que sea evidente a simple vista.</li>
          </ul>
          <div class="callout callout--proyecto">
            <span class="c-tag">Tu caso · DSI / IMA Ibérica</span>
            <p>Dado que ya confirmaste la viabilidad de migrar tú mismo procesos de volumen moderado sin pasar por consultoría externa, el plan de cuatro pasos de arriba es exactamente el marco para decidir, proceso a proceso de tu inventario UiPath, cuáles migran razonablemente bien con este enfoque manual y cuáles —por su complejidad de scoping/selectores/errores— quizás compensa más dejar correr en paralelo más tiempo o evaluar con más calma antes de migrar.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/guidance/planning-powerautomate-projects/introduction" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Planificación de un proyecto de Power Automate ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ BLOQUE 21 ============ -->
    <section class="block-group" id="block-21">
      <button class="bg-head clickable" aria-expanded="true" aria-controls="body-block-21">
        <span class="bg-badge">Bloque 21</span>
        <h2 class="bg-head-title">Construir las interfaces</h2>
        <span class="bg-sub">El "cómo" del Bloque 14: las 3 vías de autoservicio, paso a paso</span>
        <svg class="bg-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="block-body" id="body-block-21">

      <!-- 21.1 -->
      <article class="doc-section open" id="s211">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">21.1</span><span class="sh-title">Botón en Power Apps, paso a paso</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>El Bloque 14.2 explicó <strong>qué</strong> es esto — aquí va el <strong>cómo</strong>, montado desde cero:</p>
          <ul>
            <li><strong>1) El flujo en sí</strong> — crea un <strong>Instant cloud flow</strong> con el trigger <strong>Power Apps (V2)</strong>. Este trigger es el que conecta con la app — solo los flujos creados con él aparecen luego como opción dentro de Power Apps Studio.</li>
            <li><strong>2) Definir qué datos recibe el flujo</strong> — en cualquier acción dentro del flujo, busca el contenido dinámico y selecciona <strong>"Ask in PowerApps"</strong> sobre el campo que quieras recibir desde la app (por ejemplo, la ruta del Excel, o un ID de lote). Esto crea automáticamente un <strong>parámetro de entrada</strong> del trigger — conviene <strong>renombrar la acción</strong> antes de hacer esto, porque el nombre del parámetro hereda el nombre de la acción.</li>
            <li><strong>3) En el lado de Power Apps</strong> — añade un botón a tu canvas app, selecciónalo, ve a la pestaña <strong>Action</strong> → <strong>Power Automate</strong>, y elige el flujo recién creado de la lista. Esto añade automáticamente la fórmula <code>NombreDelFlujo.Run(...)</code> a la propiedad <strong>OnSelect</strong> del botón — solo te queda rellenar los parámetros con los valores de los controles de la pantalla (un text input, una variable, etc.) y cerrar el paréntesis.</li>
            <li><strong>4) (Opcional) Devolver una respuesta a la app</strong> — si el flujo necesita devolver algo a Power Apps tras ejecutarse (por ejemplo, "lote enviado correctamente"), añade la acción <strong>Respond to PowerApp</strong> al final del flujo.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo</span>
            <p>Si editas el flujo <strong>fuera</strong> de Power Apps Studio después de añadirlo a la app, tienes que volver a Power Apps y <strong>reconfirmar la conexión</strong> del flujo — si te saltas este paso, la app puede fallar al ejecutarlo incluso en versiones ya publicadas, y además puede generar problemas de validación visibles en el Power Platform admin center.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-apps/maker/canvas-apps/working-with-flows" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Usar el panel de Power Automate en Power Apps ↗</a>
        </div>
      </article>

      <!-- 21.2 -->
      <article class="doc-section open" id="s212">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">21.2</span><span class="sh-title">Tarjeta o comando en Teams, paso a paso</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Hay dos formas habituales de disparar un flujo desde Teams — elige según de dónde nace la petición:</p>
          <ul>
            <li><strong>A) Adaptive Card que recoge datos</strong> — crea un Instant cloud flow con trigger del conector de Teams, y usa la acción <strong>"Post an adaptive card to a Teams channel and wait for a response"</strong>. El cuerpo de la tarjeta se define en JSON (puedes diseñarlo visualmente en <code>adaptivecards.io/designer</code> y pegarlo). Cada campo de entrada de la tarjeta tiene un <strong>ID</strong>, que luego usas como contenido dinámico para leer lo que la persona rellenó al responder.</li>
            <li><strong>B) Trigger desde un mensaje ya escrito</strong> — el trigger <strong>"For a selected message"</strong> del conector de Teams permite que cualquier persona seleccione un mensaje del chat y lance el flujo a partir de su contenido (texto plano, quién lo envió, enlace al mensaje) — útil para "convierte este mensaje en una tarea" sin que nadie tenga que rellenar nada extra.</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · limitación real de las Adaptive Cards</span>
            <p>Solo se puede <strong>recoger datos</strong> de una Adaptive Card si se creó con una de las acciones <strong>"...and wait for a response"</strong> — una tarjeta publicada con la acción simple de "Post an adaptive card" (sin esperar respuesta) no permite capturar lo que la persona introduzca. Si tu interfaz necesita un formulario real dentro de Teams, asegúrate de usar la variante "wait for a response" desde el principio.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/overview-adaptive-cards" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Visión general de las Adaptive Cards ↗</a>
        </div>
      </article>

      <!-- 21.3 -->
      <article class="doc-section open" id="s213">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">21.3</span><span class="sh-title">Trigger de SharePoint, paso a paso</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Para que el departamento dispare el robot simplemente <strong>subiendo un archivo</strong> o <strong>rellenando un elemento de lista</strong>, sin tocar Power Automate ni PAD en absoluto, el conector de SharePoint trae varios triggers nativos según qué quieras vigilar:</p>
          <ul>
            <li><strong>"When an item is created"</strong> — dispara el flujo cada vez que se crea un elemento nuevo en una <strong>lista</strong> de SharePoint. El patrón típico de captura de demanda: el departamento rellena un formulario (Microsoft Forms o directamente la lista) y eso crea el elemento que dispara el robot.</li>
            <li><strong>"When a file is created in a folder"</strong> — dispara el flujo cuando se sube un archivo nuevo a una <strong>biblioteca de documentos</strong> concreta — el patrón típico para tu robot de facturas: el departamento de financiero arrastra el Excel del lote mensual a una carpeta, y eso solo ya dispara el procesado.</li>
            <li><strong>"When an item or a file is modified"</strong> — dispara tanto en creación como en cualquier modificación posterior; útil si quieres reaccionar a un cambio de estado en una columna concreta (por ejemplo, cuando alguien marca una columna "Aprobado" como <code>Sí</code>).</li>
          </ul>
          <div class="callout callout--warn">
            <span class="c-tag">Ojo · la trampa más común</span>
            <p>Estos triggers de SharePoint <strong>no se disparan</strong> si el archivo o elemento se crea dentro de una <strong>subcarpeta</strong> de la biblioteca/lista vigilada — solo reaccionan al nivel raíz configurado. Si el departamento necesita organizar sus subidas en subcarpetas, vas a necesitar <strong>un flujo por subcarpeta</strong>, o replantear la estructura para que todo entre en una carpeta plana.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/sharepoint/dev/business-apps/power-automate/sharepoint-connector-actions-triggers" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Conector de SharePoint para Power Automate: acciones y triggers ↗</a>
        </div>
      </article>

      <!-- 21.4 -->
      <article class="doc-section open" id="s214">
        <button class="section-head" aria-expanded="true">
          <span class="sh-id">21.4</span><span class="sh-title">Cuál elegir, y montando el patrón multi-departamento completo</span>
          <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="section-body">
          <p>Con las tres vías ya construidas técnicamente (21.1-21.3), la pregunta es cuál encaja con cada departamento — y la respuesta corta es: <strong>donde ya vive el departamento</strong>, no la que a ti más te guste como desarrollador.</p>
          <ul>
            <li><strong>Power Apps</strong> — cuando el departamento necesita rellenar <strong>varios campos con validación</strong> antes de lanzar el proceso (desplegables, campos obligatorios, formato de fecha) — más control de formulario que una Adaptive Card o una lista de SharePoint.</li>
            <li><strong>Teams</strong> — cuando el lanzamiento tiene que ocurrir <strong>sin salir del chat</strong> donde el departamento ya trabaja — especialmente bueno para procesos que arrancan a partir de una conversación o mensaje concreto (21.2-B).</li>
            <li><strong>SharePoint</strong> — cuando el departamento ya <strong>sube archivos o gestiona una lista</strong> como parte de su rutina diaria — el lanzamiento del robot es entonces <strong>invisible</strong>, no un paso nuevo que aprender, solo una consecuencia de algo que ya hacían.</li>
          </ul>
          <p>Recordando el patrón completo del Bloque 14.6 con las piezas técnicas ya en su sitio: construyes el desktop flow con sus variables de entrada/salida (Bloque 1) → eliges el punto o puntos de lanzamiento de arriba según dónde vive el departamento → registras la máquina (o grupo de máquinas, Bloque 14.3) que ejecutará el trabajo, con licencia <strong>Process</strong> si corre desatendido → y el departamento nunca toca PAD, ni sabe que existe — solo ve su botón, su tarjeta, o su lista de SharePoint de siempre.</p>
          <div class="callout callout--proyecto">
            <span class="c-tag">Cierre del Proyecto Hilo</span>
            <p>Para el robot de facturas, el patrón natural es <strong>21.3 (SharePoint)</strong>: financiero ya gestiona sus Excels en una biblioteca documental — basta con que suban el lote mensual a la carpeta correcta para que <strong>"When a file is created in a folder"</strong> dispare el flujo completo construido en el Bloque 19, sin que nadie de financiero tenga que abrir Power Automate, PAD, ni saber que cualquiera de las dos herramientas existe.</p>
          </div>
          <a class="source" href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/run-desktop-flows-best-practices" target="_blank" rel="noopener">Fuente oficial · Microsoft Learn — Buenas prácticas para ejecutar desktop flows ↗</a>
        </div>
      </article>
      </div>
    </section>

    <!-- ============ ROADMAP ============ -->
    <section class="block-group" id="roadmap">
      <div class="bg-head">
        <span class="bg-badge" style="background:linear-gradient(135deg,var(--bridge),var(--accent))">Plan</span>
        <h2>El mapa completo</h2>
        <span class="bg-sub">22 bloques · guía completa, desktop + nube</span>
      </div>
      <p style="max-width:72ch;color:var(--text-dim);margin:2px 0 18px;font-size:14.5px"><strong style="color:var(--text)">Hilo conductor:</strong> desde el Bloque 3 construimos a trozos un robot real —carga masiva de facturas (Excel → formulario web → adjunta PDF → bucle → informe OK/KO por correo)— que el bloque capstone ensambla entero. Lo verás en recuadros <span style="color:var(--proyecto);font-weight:600">Proyecto Hilo</span>.</p>
      <div class="road-grid">
        <div class="road-card done" style="border-color:var(--zero); border-style:dashed"><div class="rc-num" style="background:linear-gradient(135deg,var(--zero),var(--zero-dim));color:#fff;border-radius:6px;padding:1px 7px;display:inline-block">00</div><h3 style="color:var(--zero)">Antes de empezar</h3><p>Automatización vs RPA vs IA, proceso/bot, atendido/desatendido, flujograma, Kanban, testing/QA, IA vs IA generativa — a grosso modo.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">01</div><h3>Cimientos</h3><p>Qué es PAD, desktop vs nube, requisitos, instalación, consola y diseñador.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">02</div><h3>Tu primer flujo</h3><p>Anatomía de un flujo, crear y ejecutar, el grabador en acción.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">03</div><h3>Variables y tipos</h3><p>Notación <code>%Var%</code>, tipos, panel de Variables, entrada/salida y sensibles.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">04</div><h3>Lógica y control</h3><p>If/Else/Switch, Loop/For each/While, subflows, labels.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">05</div><h3>UI escritorio</h3><p>UI elements, repositorio, anclas, clics y captura — selectores robustos.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">06</div><h3>Automatización web</h3><p>Lanzar navegador, extraer datos, rellenar formularios, esperas.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">07</div><h3>Excel, archivos y datos</h3><p>Acciones de Excel, ficheros y carpetas, datatables.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">08</div><h3>Datos, scripting y técnicas</h3><p><strong>PowerShell, Python, VBScript, JavaScript, C#/VB.NET, CMD/DOS</strong>; regex, texto, JSON/objetos, HTTP/REST.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">09</div><h3>Email y sistema</h3><p>Outlook (con el aviso clave), Email genérico/Exchange, Office 365 Outlook, sistema, CMD.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">10</div><h3>SAP (ECC on-prem)</h3><p>GUI Scripting (no web), IDs vs idioma, módulos FI/MM, <code>FB60</code> vs <code>MIRO</code>, glosario FR→ES.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">11</div><h3>Errores + Debugging</h3><p>On block error, retry, logging, breakpoints, stepping — a fondo.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">12</div><h3>Testing y casos de prueba</h3><p>Módulo <strong>Testing</strong> (premium): <code>Assert</code>, <code>Test a desktop flow</code>, Given/When/Then.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">13</div><h3>Máquinas y desatendido</h3><p>Registrar MV, Process license, qué pasa de verdad en una sesión desatendida, Task Scheduler.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">14</div><h3>Orquestación + interfaz</h3><p>Triggers, Power Apps/Teams como UI, multi-MV/colas, work queues, Office Scripts, <strong>licencias atendido/desatendido a fondo</strong>.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done" style="border-color:var(--alm)"><div class="rc-num" style="background:linear-gradient(135deg,var(--alm),var(--alm-dim));color:#fff;border-radius:6px;padding:1px 7px;display:inline-block">15</div><h3 style="color:var(--alm)">ALM</h3><p>Solutions, export/import, managed vs unmanaged, versionado, patches, rollback, <strong>version control nativo, Git integration</strong>.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">16</div><h3>Documentación</h3><p>Region/comentarios, Copilot "Summarize actions & subflows", Repair with Copilot at runtime.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">17</div><h3>Copilot en PAD</h3><p>Crear flujos con lenguaje natural, natural language to code, Record with Copilot (deprecado), disponibilidad real.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">18</div><h3>Trucos y productividad</h3><p>Jerarquía de acciones, UIA vs MSAA, repartir carga entre máquinas, timeouts largos.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">19</div><h3>Proyecto guiado</h3><p>Capstone: el robot de facturas completo, ensamblado de punta a punta a partir de los Bloques 1-18.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">20</div><h3>Migración UiPath → PAD</h3><p>No hay conversor oficial, UiPath Academy/docs oficiales, diferencias de fondo, cómo migrar de verdad.</p><span class="rc-state">Disponible</span></div>
        <div class="road-card done"><div class="rc-num">21</div><h3>Construir las interfaces (Power Apps / Teams / SharePoint)</h3><p>El "cómo" paso a paso: botón en Power Apps, tarjeta en Teams, trigger de SharePoint, y cuál elegir.</p><span class="rc-state">Disponible</span></div>
      </div>
    </section>

    <div id="noResults">No hay coincidencias para <b id="nrTerm"></b>. Prueba con otro término (p. ej. <em>recorder</em>, <em>subflow</em>, <em>variables</em>).</div>

    <footer class="foot">
      <p id="foot-vigencia" style="background:var(--warn-soft); border-left:3px solid var(--warn); padding:10px 14px; border-radius:6px; margin-bottom:14px; color:var(--text); scroll-margin-top:80px"><strong style="color:var(--warn)">⚠ Vigencia del contenido —</strong> última verificación contra fuentes oficiales: <strong>julio de 2026</strong> (versión v22). Power Automate y, sobre todo, las funciones de <strong>Copilot/IA</strong> cambian con frecuencia: pueden deprecarse, cambiar de región disponible, o moverse de sitio en la interfaz sin previo aviso (el Bloque 17 documenta un caso real). Ante cualquier duda, confirma siempre contra el botón "Fuente oficial" de la sección correspondiente antes que contra esta guía.</p>
      <p><strong>PAD&nbsp;Ninja</strong> · Guía completa — <strong>22 bloques</strong> (Bloque 0 + Bloques 1-21). Contenido destilado y reescrito a partir de la documentación oficial de Microsoft Learn (consultada en junio de 2026); cada sección enlaza a su página de origen para verificación. El producto evoluciona: ante cualquier diferencia con tu versión instalada, manda la fuente oficial enlazada.</p>
      <p style="margin-top:16px;color:var(--text-dim)"><strong>Historial de versiones</strong></p>
      <ul style="margin:6px 0 0;padding-left:20px;font-size:12.5px;line-height:1.7">
        <li><strong>v22</strong> — + Bloque&nbsp;21, último bloque del mapa (Construir las interfaces · 4 secciones): el "cómo" paso a paso de las 3 vías descritas conceptualmente en el Bloque 14 — <strong>21.1</strong> botón en Power Apps (trigger Power Apps V2, "Ask in PowerApps", <code>OnSelect</code>, <code>Respond to PowerApp</code>); <strong>21.2</strong> Adaptive Card o "For a selected message" en Teams, con el aviso de que solo las variantes "wait for a response" permiten recoger datos; <strong>21.3</strong> los tres triggers de SharePoint ("When an item is created", "When a file is created in a folder", "When an item or a file is modified") con la trampa real de que no disparan en subcarpetas; <strong>21.4</strong> cuál elegir según dónde vive cada departamento, cerrando el patrón completo y aplicándolo al Proyecto Hilo. <strong>Guía completa: 22 bloques.</strong></li>
        <li><strong>v21</strong> — Nuevo <strong>Bloque 0 — "Antes de empezar"</strong> (5 secciones), posicionado al inicio de la guía con <strong>acento visual propio (gris, borde discontinuo)</strong> para diferenciarlo del cuerpo técnico: <strong>0.1</strong> automatización vs RPA vs IA como círculos concéntricos, no sinónimos; <strong>0.2</strong> proceso vs bot (un bot puede tener varios procesos) y atendido/desatendido como conceptos generales de RPA, no solo features de PAD; <strong>0.3</strong> qué es un flujograma (símbolos básicos) y qué es un "proyecto" en este contexto; <strong>0.4</strong> Kanban (columnas, tarjetas, WIP limits) y testing/QA como disciplina general; <strong>0.5</strong> IA vs IA generativa, con ejemplos concretos de dónde aparece cada una dentro de la propia guía (Copilot = generativa, self-healing = reglas, Repair with Copilot = IA no generativa). Mapa ahora a <strong>22 bloques</strong> en total. No desplaza la numeración 1-21 ya existente.</li>
        <li><strong>v20</strong> — Bloque&nbsp;20 ampliado a <strong>5 secciones</strong> (Migración UiPath → PAD): confirmado que <strong>no existe conversor oficial de Microsoft</strong> (herramientas de terceros presentadas con cautela explícita como marketing no verificable); nueva <strong>20.2: entender UiPath a fondo</strong> antes de migrar — UiPath Academy (gratuita, rutas RPA Developer/Citizen Developer Foundation), docs.uipath.com, y el hallazgo de que un <code>.xaml</code> es <strong>XML legible directamente</strong> sin herramientas especiales (confirmado contra el repo oficial de UiPath en GitHub); diferencias de fondo (variable scope, selectores, tipos .NET); <strong>PAD no tiene Rethrow ni Global Exception Handler</strong> de UiPath; y un plan de migración de 5 pasos aplicado a tu contexto en IMA.</li>
        <li><strong>v19</strong> — + Bloque&nbsp;19 (Proyecto guiado / capstone · 4 secciones): el <strong>Proyecto Hilo completo ensamblado</strong> por primera vez en un único flujo coherente — el <code>Main</code> de principio a fin, el subflow <code>ProcesarFactura</code> con su variante SAP, y qué falta para llevarlo a producción real, todo citando de vuelta a los 18 bloques donde cada pieza se explicó. No introduce conceptos nuevos a propósito: demuestra que, sumando lo ya construido, el robot real ya está completo.</li>
        <li><strong>v18</strong> — + Bloque&nbsp;18 (Trucos y productividad · 4 secciones): la <strong>jerarquía oficial de acciones</strong> (cloud connector &gt; acción específica de app &gt; UI/Browser automation &gt; imagen/OCR/coordenadas como último recurso), <strong>UIA vs MSAA</strong> (usa UIA siempre que puedas), repartir carga entre máquinas, y el ajuste de <strong>timeout</strong> para flujos de más de 24h. Además, a petición del usuario: nuevo <strong>aviso de vigencia</strong> permanente bajo la franja de fuente oficial y en el pie, con fecha de última verificación — Copilot/IA cambian rápido y conviene confirmar siempre contra la fuente oficial.</li>
        <li><strong>v17</strong> — + Bloque&nbsp;17 (Copilot en PAD · 4 secciones): crear flujos describiendo la tarea (preview, no para producción), <strong>natural language to code</strong> en acciones de scripting, y dos hallazgos importantes — <strong>"Record with Copilot" está deprecado</strong> según la documentación oficial (la alternativa es describir + grabador normal, o un agente de Copilot Studio con "computer use"), y la <strong>disponibilidad por región es muy desigual</strong> (crear flujos: solo US; resto de skills: muchas más regiones) — con nota específica para confirmarlo con el admin de Power Platform de IMA dado el contexto M365 Copilot Premium.</li>
        <li><strong>v16</strong> — + Bloque&nbsp;16 (Documentación · 3 secciones): documentar sin IA (Region/End region, subflows, nombres descriptivos), Copilot <strong>"Summarize actions & subflows"</strong> (resúmenes de acciones/rangos/subflows en lenguaje natural), y <strong>Repair with Copilot at runtime</strong> — hallazgo clave: no es un chat de troubleshooting, es autorreparación de selectores de UI rotos en producción, usando IA para leer el árbol completo de la interfaz.</li>
        <li><strong>v15</strong> — Bloque&nbsp;15 ampliado a <strong>10 secciones</strong> (ALM), con <strong>acento visual propio (índigo)</strong> en nav, header y roadmap: Solutions, exportar/importar un desktop flow, managed vs unmanaged, connection references/environment variables, migrar de máquina/cuenta, versionado y patches, las 3 opciones de re-importación, el error de dependencias faltantes, rollback con Pipelines y flujos huérfanos, y nueva <strong>15.10: version control nativo del propio desktop flow</strong> (drafts, publicar, comparar versiones lado a lado) + <strong>Git integration nativo</strong> con Azure DevOps para el entorno de desarrollo.</li>
        <li><strong>v14</strong> — Bloque&nbsp;14 ampliado a <strong>6 secciones</strong> (Orquestación + interfaz): tipos de trigger, Power Apps como interfaz —disparadora y como UI directa de un desktop flow—, multi-máquina con grupos/colas/prioridad, Work queues, Office Scripts (refresco de Power Query falla en silencio salvo fuente Power BI, confirmado con cita oficial), y nueva <strong>14.6: licenciamiento atendido/desatendido completo</strong> (incluida la trampa de doble licencia con conectores premium) + patrón generalizado de interfaz multi-departamento (Power Apps/Teams/SharePoint).</li>
        <li><strong>v13</strong> — + Bloque&nbsp;13 (Máquinas y desatendido · 5 secciones: attended vs unattended, registrar máquina y el aviso de no preinstalar en imagen base de VM, licencia Process license, qué pasa técnicamente en una sesión desatendida, programación con Windows Task Scheduler). Confirmado: PAD <strong>no tiene scheduler nativo</strong>.</li>
        <li><strong>v12</strong> — + Bloque&nbsp;12 (Testing y casos de prueba). Confirmado: módulo premium, PAD 2.54+.</li>
        <li><strong>v11</strong> — + Bloque&nbsp;11 (Errores + Debugging a fondo). Rediseño visual "Tech warm"; franja de fuente oficial fija; logo nuevo.</li>
        <li><strong>v10</strong> — Bloque&nbsp;10 ampliado a 7 secciones (SAP ECC on-premise): R/3=ECC aclarado, módulos, FB60 vs MIRO, glosario FR→ES.</li>
        <li><strong>v9</strong> — + Bloque&nbsp;9 (Email y sistema). Cierra el Proyecto Hilo completo.</li>
        <li><strong>v8</strong> — + Bloque&nbsp;8 (Datos, scripting y técnicas). VBScript deprecado; C#/VB.NET añadido.</li>
        <li><strong>v7</strong> — + Bloque&nbsp;7 (Excel, archivos y datos).</li>
        <li><strong>v6</strong> — + Bloque&nbsp;6 (Automatización web).</li>
        <li><strong>v5</strong> — + Bloque&nbsp;5 (UI de escritorio).</li>
        <li><strong>v4</strong> — + Bloque&nbsp;4 (Lógica y control).</li>
        <li><strong>v3</strong> — + Bloque&nbsp;3 (Variables y tipos). Inicio del Proyecto Hilo.</li>
        <li><strong>v2</strong> — Bloque&nbsp;1 (Cimientos) + Bloque&nbsp;2 (Tu primer flujo).</li>
      </ul>
    </footer>
  </main>
</div>

<button id="backTop" aria-label="Volver al inicio de la guía">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
  <span>Inicio</span>
</button>
  </div>
</template>

<style>

  html.mod-pad-ninja{
    --bg:#15120e; --bg2:#1a1610; --surface:#1c1812; --surface2:#241e16;
    --border:#332a1d; --border-soft:#2a2317;
    --text:#f3ede1; --text-dim:#b6a991; --text-faint:#7d735e;
    --accent:#ff9d3d; --accent-dim:#e08226; --accent-soft:rgba(255,157,61,.13);
    --bridge:#3ec9b0; --bridge-soft:rgba(62,201,176,.12);
    --debug:#ffc857; --debug-soft:rgba(255,200,87,.12);
    --tip:#8bc97a;   --tip-soft:rgba(139,201,122,.12);
    --warn:#ff6b5e;  --warn-soft:rgba(255,107,94,.12);
    --proyecto:#ff8cc8; --proyecto-soft:rgba(255,140,200,.10);
    --alm:#8c8cff; --alm-dim:#6f6fe6; --alm-soft:rgba(140,140,255,.13);
    --zero:#9aa0ab; --zero-dim:#7a808a; --zero-soft:rgba(154,160,171,.13);
    --mark:#ffc857; --mark-fg:#241a04;
    --shadow:0 1px 0 rgba(255,255,255,.02), 0 10px 30px -12px rgba(0,0,0,.6);
    --rad:12px; --rad-sm:8px;
    --sans:'Bricolage Grotesque', ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    --body:'Manrope', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    --mono:'JetBrains Mono', ui-monospace, "Cascadia Code", Consolas, monospace;
    --nav-w:300px; --bar-h:60px;
  }
  html.mod-pad-ninja[data-theme="light"]{
    --bg:#fbf6ee; --bg2:#f5ede0; --surface:#ffffff; --surface2:#f6efe2;
    --border:#e6dac3; --border-soft:#efe5d2;
    --text:#231c12; --text-dim:#6b5d44; --text-faint:#94886c;
    --accent:#c2620a; --accent-dim:#a04e06; --accent-soft:rgba(194,98,10,.09);
    --bridge:#0e7d6e; --bridge-soft:rgba(14,125,110,.09);
    --debug:#9c6a05; --debug-soft:rgba(156,106,5,.10);
    --tip:#2f7a3e;   --tip-soft:rgba(47,122,62,.09);
    --warn:#b13a2e;  --warn-soft:rgba(177,58,46,.08);
    --proyecto:#b8377e; --proyecto-soft:rgba(184,55,126,.08);
    --alm:#5b4fcf; --alm-dim:#473cb0; --alm-soft:rgba(91,79,207,.08);
    --zero:#6b7280; --zero-dim:#565d68; --zero-soft:rgba(107,114,128,.08);
    --mark:#ffd980; --mark-fg:#3a2400;
    --shadow:0 1px 2px rgba(35,28,18,.04), 0 14px 34px -18px rgba(35,28,18,.18);
  }

  html.mod-pad-ninja *{box-sizing:border-box}
  html.mod-pad-ninja{scroll-behavior:smooth}
  @media (prefers-reduced-motion: reduce){ html.mod-pad-ninja{scroll-behavior:auto} html.mod-pad-ninja *{animation:none!important;transition:none!important} }
  html.mod-pad-ninja body{
    margin:0; background:var(--bg); color:var(--text);
    font-family:var(--body); font-size:16px; line-height:1.62;
    -webkit-font-smoothing:antialiased;
  }
  html.mod-pad-ninja a{color:var(--accent); text-decoration:none}
  html.mod-pad-ninja a:hover{text-decoration:underline}

  /* skip link */
  html.mod-pad-ninja .skip{position:absolute; left:-999px; top:8px; background:var(--accent); color:#fff; padding:10px 16px; border-radius:8px; z-index:200; font-family:var(--sans); font-weight:600}
  html.mod-pad-ninja .skip:focus{left:12px}
  html.mod-pad-ninja :focus-visible{outline:2px solid var(--accent); outline-offset:2px; border-radius:4px}

  /* ===== top bar ===== */
  html.mod-pad-ninja header.bar{
    position:sticky; top:0; z-index:60; height:var(--bar-h);
    display:flex; align-items:center; gap:14px; padding:0 18px;
    background:color-mix(in srgb, var(--bg) 86%, transparent);
    backdrop-filter:blur(10px); border-bottom:1px solid var(--border);
  }
  html.mod-pad-ninja .brand{display:flex; align-items:center; gap:11px; font-family:var(--sans); font-weight:700; letter-spacing:-.01em; white-space:nowrap}
  html.mod-pad-ninja .brand .glyph{
    width:30px; height:30px; border-radius:8px; flex:0 0 auto;
    background:linear-gradient(135deg, var(--accent), var(--bridge));
    display:grid; place-items:center; color:#0b0d12; font-weight:700; font-size:15px;
    box-shadow:0 0 0 1px rgba(255,255,255,.08) inset;
  }
  html.mod-pad-ninja .brand .glyph svg{width:17px; height:17px}
  html.mod-pad-ninja .brand b{font-size:16px}
  html.mod-pad-ninja .brand span{color:var(--text-dim); font-weight:500; font-size:12.5px}
  html.mod-pad-ninja .ver-pill{font-family:var(--mono); font-size:11px; color:var(--accent); background:var(--accent-soft); border:1px solid var(--accent); border-radius:20px; padding:2px 9px; white-space:nowrap; align-self:center; flex:0 0 auto}
  html.mod-pad-ninja .bar-spacer{flex:1}
  html.mod-pad-ninja .search-wrap{position:relative; flex:1 1 420px; max-width:480px}
  html.mod-pad-ninja .search-wrap svg{position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--text-faint)}
  html.mod-pad-ninja #search{
    width:100%; height:40px; padding:0 38px 0 38px; border-radius:10px;
    background:var(--surface); border:1px solid var(--border); color:var(--text);
    font-family:var(--body); font-size:14.5px;
  }
  html.mod-pad-ninja #search::placeholder{color:var(--text-faint)}
  html.mod-pad-ninja #search:focus{border-color:var(--accent); background:var(--surface2)}
  html.mod-pad-ninja .clear-x{position:absolute; right:8px; top:50%; transform:translateY(-50%); border:0; background:transparent; color:var(--text-faint); cursor:pointer; padding:6px; border-radius:6px; display:none; font-family:var(--mono)}
  html.mod-pad-ninja .clear-x:hover{color:var(--text); background:var(--surface2)}
  html.mod-pad-ninja .icon-btn{
    width:40px; height:40px; flex:0 0 auto; border-radius:10px; cursor:pointer;
    background:var(--surface); border:1px solid var(--border); color:var(--text-dim);
    display:grid; place-items:center;
  }
  html.mod-pad-ninja .icon-btn:hover{color:var(--text); border-color:var(--accent)}
  html.mod-pad-ninja #navToggle{display:none}

  /* ===== layout ===== */
  html.mod-pad-ninja .layout{display:flex; align-items:flex-start}
  html.mod-pad-ninja nav.side{
    position:sticky; top:var(--bar-h); align-self:flex-start;
    width:var(--nav-w); flex:0 0 var(--nav-w);
    height:calc(100vh - var(--bar-h)); overflow-y:auto;
    border-right:1px solid var(--border); padding:22px 14px 60px;
    background:var(--bg);
  }
  html.mod-pad-ninja nav.side::-webkit-scrollbar{width:9px}
  html.mod-pad-ninja nav.side::-webkit-scrollbar-thumb{background:var(--border); border-radius:8px}
  html.mod-pad-ninja .nav-label{font-family:var(--sans); font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--text-faint); padding:0 10px; margin:6px 0 12px}
  html.mod-pad-ninja .nav-block{margin-bottom:4px}
  html.mod-pad-ninja .nav-block > .nb-head{
    display:flex; align-items:center; gap:9px; width:100%; text-align:left;
    border:0; background:transparent; cursor:pointer; color:var(--text);
    font-family:var(--sans); font-weight:600; font-size:14px; padding:9px 10px; border-radius:9px;
  }
  html.mod-pad-ninja .nav-block > .nb-head:hover{background:var(--surface)}
  html.mod-pad-ninja .nb-num{font-family:var(--mono); font-size:11.5px; color:var(--accent); background:var(--accent-soft); border-radius:6px; padding:2px 6px; flex:0 0 auto}
  html.mod-pad-ninja .nav-block.nav-alm .nb-num{color:var(--alm); background:var(--alm-soft)}
  html.mod-pad-ninja .nb-soon{margin-left:auto; font-family:var(--sans); font-size:10px; letter-spacing:.08em; text-transform:uppercase; color:var(--text-faint); border:1px solid var(--border); border-radius:20px; padding:2px 8px}
  html.mod-pad-ninja .nav-block.locked > .nb-head{color:var(--text-dim); cursor:pointer}
  html.mod-pad-ninja .nav-block.locked .nb-num{color:var(--text-faint); background:transparent; border:1px solid var(--border)}
  html.mod-pad-ninja .nb-sub{list-style:none; margin:2px 0 8px; padding:0 0 0 8px; border-left:1px solid var(--border-soft); margin-left:18px}
  html.mod-pad-ninja .nb-sub a{display:block; color:var(--text-dim); font-size:13.5px; padding:6px 10px; border-radius:7px; line-height:1.35}
  html.mod-pad-ninja .nb-sub a:hover{color:var(--text); background:var(--surface); text-decoration:none}
  html.mod-pad-ninja .nb-sub a.active{color:var(--accent); background:var(--accent-soft); font-weight:500}

  /* ===== main ===== */
  html.mod-pad-ninja main{flex:1 1 auto; min-width:0; padding:34px clamp(18px,4vw,56px) 120px; max-width:1000px}
  html.mod-pad-ninja .hero{margin-bottom:30px}
  html.mod-pad-ninja .kicker{font-family:var(--sans); font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:var(--accent); font-weight:600}
  html.mod-pad-ninja .hero h1{font-family:var(--sans); font-weight:700; letter-spacing:-.02em; font-size:clamp(28px,4.4vw,42px); line-height:1.08; margin:.35em 0 .25em}
  html.mod-pad-ninja .hero p.lead{font-size:17px; color:var(--text-dim); max-width:68ch; margin:0 0 18px}
  html.mod-pad-ninja .meta-note{
    display:flex; gap:13px; align-items:flex-start; background:var(--surface); border:1px solid var(--border);
    border-radius:var(--rad); padding:14px 16px; max-width:70ch; box-shadow:var(--shadow);
  }
  html.mod-pad-ninja .meta-note .dot{width:9px;height:9px;border-radius:50%;background:var(--tip);flex:0 0 auto;margin-top:7px;box-shadow:0 0 0 4px var(--tip-soft)}
  html.mod-pad-ninja .meta-note p{margin:0; font-size:13.5px; color:var(--text-dim); line-height:1.55}
  html.mod-pad-ninja .meta-note b{color:var(--text)}

  /* block group */
  html.mod-pad-ninja .block-group{margin-top:54px; scroll-margin-top:calc(var(--bar-h) + 14px)}
  html.mod-pad-ninja .bg-head{display:flex; align-items:center; gap:14px; padding-bottom:14px; border-bottom:1px solid var(--border); margin-bottom:8px}
  html.mod-pad-ninja .bg-head.clickable{cursor:pointer; user-select:none; border:0; background:transparent; width:100%; text-align:left; font:inherit; padding:0 0 14px}
  html.mod-pad-ninja .bg-head.clickable:hover .bg-head-title{color:var(--accent)}
  html.mod-pad-ninja .bg-chev{flex:0 0 auto; color:var(--text-faint); transition:transform .2s ease; margin-left:4px}
  html.mod-pad-ninja .block-group.collapsed .bg-chev{transform:rotate(-90deg)}
  html.mod-pad-ninja .block-body{overflow:hidden}
  html.mod-pad-ninja .block-group.collapsed .block-body{display:none}
  html.mod-pad-ninja .bg-badge{font-family:var(--mono); font-size:13px; color:#0b0d12; background:linear-gradient(135deg,var(--accent),var(--accent-dim)); padding:5px 11px; border-radius:8px; font-weight:600; flex:0 0 auto}
  html.mod-pad-ninja .bg-head h2{font-family:var(--sans); font-weight:700; font-size:clamp(22px,3vw,28px); letter-spacing:-.015em; margin:0}
  html.mod-pad-ninja .bg-head .bg-sub{color:var(--text-faint); font-size:13.5px; margin-left:auto; font-family:var(--sans)}

  /* doc section (accordion) */
  html.mod-pad-ninja .doc-section{border-bottom:1px solid var(--border-soft); scroll-margin-top:calc(var(--bar-h) + 14px)}
  html.mod-pad-ninja .section-head{
    display:flex; align-items:center; gap:12px; width:100%; text-align:left; cursor:pointer;
    background:transparent; border:0; color:var(--text); padding:20px 4px;
    font-family:var(--sans); font-weight:600; font-size:19px; letter-spacing:-.01em;
  }
  html.mod-pad-ninja .section-head:hover .sh-title{color:var(--accent)}
  html.mod-pad-ninja .sh-id{font-family:var(--mono); font-size:13px; color:var(--text-faint); flex:0 0 auto}

  /* Bloque con acento propio (p. ej. ALM) */
  html.mod-pad-ninja .block-group.block-alm{border-left:2px solid var(--alm); padding-left:18px; margin-left:-20px}
  html.mod-pad-ninja .block-alm .bg-badge{background:linear-gradient(135deg,var(--alm),var(--alm-dim)); color:#fff}
  html.mod-pad-ninja .block-alm .bg-head-title{color:var(--alm)}
  html.mod-pad-ninja .block-alm .sh-id{color:var(--alm); opacity:.85}
  html.mod-pad-ninja .block-alm .doc-section{border-left:2px solid var(--alm-soft); padding-left:14px; margin-left:-16px}
  @media (max-width:880px){ html.mod-pad-ninja .block-group.block-alm{margin-left:0; border-left-width:3px} html.mod-pad-ninja .block-alm .doc-section{margin-left:0} }

  /* Bloque 0: acento neutro, distinto del cuerpo técnico principal */
  html.mod-pad-ninja .block-group.block-zero{border-left:2px dashed var(--zero); padding-left:18px; margin-left:-20px}
  html.mod-pad-ninja .block-zero .bg-badge{background:linear-gradient(135deg,var(--zero),var(--zero-dim)); color:#fff}
  html.mod-pad-ninja .block-zero .bg-head-title{color:var(--zero)}
  html.mod-pad-ninja .block-zero .sh-id{color:var(--zero); opacity:.9}
  html.mod-pad-ninja .block-zero .doc-section{border-left:2px dashed var(--zero-soft); padding-left:14px; margin-left:-16px}
  html.mod-pad-ninja .nav-block.nav-zero .nb-num{color:var(--zero); background:var(--zero-soft)}
  @media (max-width:880px){ html.mod-pad-ninja .block-group.block-zero{margin-left:0; border-left-width:3px} html.mod-pad-ninja .block-zero .doc-section{margin-left:0} }
  html.mod-pad-ninja .sh-title{flex:1}
  html.mod-pad-ninja .chev{flex:0 0 auto; color:var(--text-faint); transition:transform .2s ease}
  html.mod-pad-ninja .doc-section.open .chev{transform:rotate(90deg); color:var(--accent)}
  html.mod-pad-ninja .section-body{display:none; padding:0 4px 26px}
  html.mod-pad-ninja .doc-section.open .section-body{display:block; animation:fade .22s ease}
  @keyframes fade{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
  html.mod-pad-ninja .section-body > *{max-width:72ch}
  html.mod-pad-ninja .section-body p{margin:0 0 14px}
  html.mod-pad-ninja .section-body ul{margin:0 0 16px; padding-left:22px}
  html.mod-pad-ninja .section-body li{margin:7px 0}
  html.mod-pad-ninja .section-body li::marker{color:var(--accent)}
  html.mod-pad-ninja .section-body strong{color:var(--text); font-weight:600}
  html.mod-pad-ninja code{font-family:var(--mono); font-size:.86em; background:var(--surface2); border:1px solid var(--border-soft); padding:1.5px 6px; border-radius:6px; color:var(--text); white-space:nowrap}
  html.mod-pad-ninja mark{background:var(--mark); color:var(--mark-fg); border-radius:3px; padding:0 2px}

  /* callouts */
  html.mod-pad-ninja .callout{border:1px solid var(--border); border-left-width:3px; border-radius:var(--rad-sm); padding:14px 16px; margin:18px 0; background:var(--surface); max-width:72ch}
  html.mod-pad-ninja .callout .c-tag{font-family:var(--sans); font-size:10.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; display:inline-block; margin-bottom:7px}
  html.mod-pad-ninja .callout p{margin:0; font-size:14px; color:var(--text-dim); line-height:1.58}
  html.mod-pad-ninja .callout p + p{margin-top:9px}
  html.mod-pad-ninja .callout strong{color:var(--text)}
  html.mod-pad-ninja .callout--bridge{border-left-color:var(--bridge); background:var(--bridge-soft)} html.mod-pad-ninja .callout--bridge .c-tag{color:var(--bridge)}
  html.mod-pad-ninja .callout--debug{border-left-color:var(--debug); background:var(--debug-soft)} html.mod-pad-ninja .callout--debug .c-tag{color:var(--debug)}
  html.mod-pad-ninja .callout--tip{border-left-color:var(--tip); background:var(--tip-soft)} html.mod-pad-ninja .callout--tip .c-tag{color:var(--tip)}
  html.mod-pad-ninja .callout--warn{border-left-color:var(--warn); background:var(--warn-soft)} html.mod-pad-ninja .callout--warn .c-tag{color:var(--warn)}
  html.mod-pad-ninja .callout--proyecto{border-left-color:var(--proyecto); background:var(--proyecto-soft)} html.mod-pad-ninja .callout--proyecto .c-tag{color:var(--proyecto)}

  /* FR -> ES translation chip */
  html.mod-pad-ninja .fr-term{
    display:inline-flex; align-items:center; gap:5px; cursor:pointer;
    background:var(--surface2); border:1px solid var(--border); border-radius:6px;
    padding:1px 7px 1px 8px; font-family:var(--mono); font-size:.86em; color:var(--text);
    transition:border-color .15s ease, background .15s ease;
  }
  html.mod-pad-ninja .fr-term:hover{border-color:var(--accent)}
  html.mod-pad-ninja .fr-term .fr-flag{font-size:.85em; opacity:.7}
  html.mod-pad-ninja .fr-term .fr-es{
    display:none; font-family:var(--body); font-style:italic; color:var(--accent);
    border-left:1px solid var(--border); padding-left:6px; margin-left:1px;
  }
  html.mod-pad-ninja .fr-term.shown .fr-es{display:inline}
  html.mod-pad-ninja .fr-term.shown{background:var(--accent-soft); border-color:var(--accent)}
  html.mod-pad-ninja .fr-toggle-all{
    display:inline-flex; align-items:center; gap:7px; cursor:pointer;
    background:var(--surface); border:1px solid var(--border); border-radius:20px;
    padding:6px 13px; font-family:var(--sans); font-weight:600; font-size:12.5px; color:var(--text-dim);
    margin:4px 0 14px;
  }
  html.mod-pad-ninja .fr-toggle-all:hover{border-color:var(--accent); color:var(--accent)}
  html.mod-pad-ninja .fr-toggle-all.on{background:var(--accent-soft); border-color:var(--accent); color:var(--accent)}

  /* source badge */
  html.mod-pad-ninja .source{
    display:inline-flex; align-items:center; gap:7px; margin-top:6px;
    font-family:var(--sans); font-size:12.5px; font-weight:500; color:var(--text-dim);
    background:var(--surface2); border:1px solid var(--border); border-radius:20px; padding:5px 12px;
  }
  html.mod-pad-ninja .source:hover{color:var(--accent); border-color:var(--accent); text-decoration:none}
  html.mod-pad-ninja .source::before{content:""; width:6px; height:6px; border-radius:50%; background:var(--accent)}

  /* table */
  html.mod-pad-ninja .tbl{width:100%; border-collapse:collapse; margin:8px 0 18px; font-size:14px; max-width:72ch}
  html.mod-pad-ninja .tbl th,html.mod-pad-ninja .tbl td{text-align:left; padding:10px 13px; border-bottom:1px solid var(--border-soft); vertical-align:top}
  html.mod-pad-ninja .tbl th{font-family:var(--sans); font-size:11.5px; letter-spacing:.06em; text-transform:uppercase; color:var(--text-faint); border-bottom:1px solid var(--border)}
  html.mod-pad-ninja .tbl td:first-child{font-family:var(--mono); font-size:12.5px; color:var(--accent); white-space:nowrap}
  html.mod-pad-ninja .tbl tr:hover td{background:var(--surface)}

  /* roadmap */
  html.mod-pad-ninja #roadmap .road-grid{display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:12px; margin-top:8px; max-width:none}
  html.mod-pad-ninja .road-card{background:var(--surface); border:1px solid var(--border); border-radius:var(--rad-sm); padding:15px 16px}
  html.mod-pad-ninja .road-card .rc-num{font-family:var(--mono); font-size:12px; color:var(--accent)}
  html.mod-pad-ninja .road-card h3{font-family:var(--sans); font-size:15px; margin:5px 0 6px; letter-spacing:-.01em}
  html.mod-pad-ninja .road-card p{font-size:13px; color:var(--text-dim); margin:0; line-height:1.5}
  html.mod-pad-ninja .road-card.done{border-color:var(--accent); background:linear-gradient(180deg,var(--accent-soft),transparent)}
  html.mod-pad-ninja .road-card .rc-state{display:inline-block; margin-top:10px; font-family:var(--sans); font-size:10px; letter-spacing:.08em; text-transform:uppercase; color:var(--text-faint); border:1px solid var(--border); border-radius:20px; padding:2px 9px}
  html.mod-pad-ninja .road-card.done .rc-state{color:var(--tip); border-color:var(--tip)}

  html.mod-pad-ninja #noResults{display:none; text-align:center; color:var(--text-dim); padding:60px 20px; font-size:16px}
  html.mod-pad-ninja #noResults b{color:var(--text)}

  html.mod-pad-ninja footer.foot{margin-top:70px; padding-top:22px; border-top:1px solid var(--border); color:var(--text-faint); font-size:12.5px; max-width:72ch}
  html.mod-pad-ninja footer.foot a{color:var(--text-dim)}

  /* root source strip */
  html.mod-pad-ninja .source-strip{
    display:flex; flex-direction:column; gap:6px;
    background:var(--surface2); border-bottom:1px solid var(--border);
    padding:9px 18px; font-family:var(--body); font-size:13px; color:var(--text-dim);
  }
  html.mod-pad-ninja .source-strip .ss-row{display:flex; align-items:center; gap:10px; flex-wrap:wrap}
  html.mod-pad-ninja .source-strip .ss-icon{
    width:20px; height:20px; border-radius:5px; flex:0 0 auto;
    background:var(--accent-soft); color:var(--accent); display:grid; place-items:center;
    font-family:var(--mono); font-size:11px; font-weight:700;
  }
  html.mod-pad-ninja .source-strip .ss-icon svg{width:12px; height:12px}
  html.mod-pad-ninja .source-strip .ss-icon.ss-icon--warn{background:var(--warn-soft); color:var(--warn)}
  html.mod-pad-ninja .source-strip b{color:var(--text); font-weight:600}
  html.mod-pad-ninja .source-strip a{color:var(--bridge); font-family:var(--mono); font-size:12.5px; font-weight:500; text-decoration:none; border-bottom:1px solid transparent}
  html.mod-pad-ninja .source-strip a:hover{border-bottom-color:var(--bridge)}
  html.mod-pad-ninja .source-strip .ss-vigencia{font-size:12.5px}
  html.mod-pad-ninja .source-strip .ss-vigencia b{color:var(--warn)}
  @media (max-width:880px){ html.mod-pad-ninja .source-strip{ top:var(--bar-h); font-size:12px; padding:8px 14px } }

  /* mobile drawer */
  html.mod-pad-ninja .overlay{display:none; position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:55}

  /* back-to-top floating button */
  html.mod-pad-ninja #backTop{
    position:fixed; right:22px; bottom:22px; z-index:50;
    display:flex; align-items:center; gap:8px;
    background:var(--surface); color:var(--text); border:1px solid var(--border);
    border-radius:50px; padding:11px 16px 11px 13px; cursor:pointer;
    font-family:var(--sans); font-weight:600; font-size:13.5px;
    box-shadow:var(--shadow); opacity:0; transform:translateY(10px) scale(.96);
    pointer-events:none; transition:opacity .2s ease, transform .2s ease, border-color .2s ease, background .2s ease;
  }
  html.mod-pad-ninja #backTop.show{ opacity:1; transform:none; pointer-events:auto; }
  html.mod-pad-ninja #backTop:hover{ border-color:var(--accent); background:var(--surface2); color:var(--accent) }
  html.mod-pad-ninja #backTop svg{ flex:0 0 auto }
  @media (max-width:560px){
    html.mod-pad-ninja #backTop span{ display:none }
    html.mod-pad-ninja #backTop{ padding:12px; border-radius:50%; }
  }
  @media (max-width:880px){
    html.mod-pad-ninja #navToggle{display:grid}
    html.mod-pad-ninja .search-wrap{flex:1 1 auto}
    html.mod-pad-ninja .brand span{display:none}
    html.mod-pad-ninja nav.side{
      position:fixed; top:var(--bar-h); left:0; transform:translateX(-105%);
      transition:transform .25s ease; z-index:58; box-shadow:var(--shadow); width:min(320px,86vw);
    }
    html.mod-pad-ninja nav.side.open{transform:none}
    html.mod-pad-ninja .overlay.show{display:block}
    html.mod-pad-ninja main{padding-top:26px}
  }

</style>
