<script setup>
import { ref } from 'vue'
import { usePageEnv } from '../../composables/usePageEnv'

const rootRef = ref(null)

usePageEnv({
  title: 'Migración UiPath → PAD · v1.0',
  htmlClass: ['mod-migracion-uipath'],
  htmlAttrs: { 'data-theme': 'dark' },
})

const sections = [
  'intro',
  'antes',
  'extraer',
  'analizar',
  'mapeo',
  'construir',
  'validar',
  're',
  'errores',
  'checklist',
  'copilot',
]

function show(id, evt) {
  const scope = rootRef.value || document
  sections.forEach((s) => {
    const el = scope.querySelector('#s-' + s)
    if (el) el.classList.remove('active')
  })
  scope.querySelectorAll('nav a').forEach((a) => a.classList.remove('active'))
  const target = scope.querySelector('#s-' + id)
  if (target) target.classList.add('active')
  if (evt && evt.currentTarget) evt.currentTarget.classList.add('active')
  const sidebar = scope.querySelector('#sidebar')
  if (sidebar) sidebar.classList.remove('open')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function toggleNav() {
  const scope = rootRef.value || document
  const sidebar = scope.querySelector('#sidebar')
  if (sidebar) sidebar.classList.toggle('open')
}

function toggleTheme() {
  const scope = rootRef.value || document
  const html = document.documentElement
  const isDark = html.getAttribute('data-theme') === 'dark'
  html.setAttribute('data-theme', isDark ? 'light' : 'dark')
  const icon = scope.querySelector('#theme-icon')
  const label = scope.querySelector('#theme-label')
  if (icon) icon.textContent = isDark ? '🌙' : '☀️'
  if (label) label.textContent = isDark ? 'Modo oscuro' : 'Modo claro'
}

function copyCode(btn) {
  if (!btn || !btn.parentElement) return
  const block = btn.parentElement
  const text = block.innerText.replace('Copiar', '').replace('Copiado ✓', '').trim()
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copiado ✓'
    setTimeout(() => {
      btn.textContent = 'Copiar'
    }, 2000)
  })
}

function copyById(id, btn) {
  const scope = rootRef.value || document
  const el = scope.querySelector('#' + id)
  if (!el || !btn) return
  const text = el.innerText
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copiado'
    setTimeout(() => {
      btn.textContent = '📋 Copiar prompt'
    }, 2000)
  })
}
</script>

<template>
  <div ref="rootRef">
<div class="shell">

<!-- ══════════════════════════════
     NAV
══════════════════════════════ -->
<nav id="sidebar">
  <div class="nav-header">
    <div class="nav-version">v1.0 · Migración RPA</div>
    <div class="nav-title">UiPath <span>→</span> PAD</div>
  </div>

  <div class="nav-body">
    <div class="nav-label">Manual</div>
    <a @click="show('intro', $event)" class="active"><span class="nav-num">00</span> ¿Por dónde empiezo?</a>
    <a @click="show('antes', $event)"><span class="nav-num">01</span> Antes de tocar nada</a>
    <a @click="show('extraer', $event)"><span class="nav-num">02</span> Extraer de UiPath</a>
    <a @click="show('analizar', $event)"><span class="nav-num">03</span> Analizar el proceso</a>
    <a @click="show('mapeo', $event)"><span class="nav-num">04</span> Mapeo UiPath → PAD</a>
    <a @click="show('construir', $event)"><span class="nav-num">05</span> Construir en PAD</a>
    <a @click="show('validar', $event)"><span class="nav-num">06</span> Validar y hacer el corte</a>

    <div class="nav-label">Referencia</div>
    <a @click="show('re', $event)"><span class="nav-num">⬡</span> ¿Es REFramework?</a>
    <a @click="show('errores', $event)"><span class="nav-num">⚠</span> Errores frecuentes</a>
    <a @click="show('checklist', $event)"><span class="nav-num">✓</span> Checklist completo</a>

    <div class="nav-label">Kit IA</div>
    <a @click="show('copilot', $event)"><span class="nav-num">⊕</span> Prompts para Copilot</a>
  </div>

  <div class="nav-footer">
    <button class="theme-toggle" @click="toggleTheme()">
      <span class="theme-icon" id="theme-icon">☀️</span>
      <span id="theme-label">Modo claro</span>
    </button>
  </div>
</nav>

<!-- ══════════════════════════════
     MAIN
══════════════════════════════ -->
<main>

<!-- ── 00. INTRO ── -->
<div class="section active" id="s-intro">
  <div class="hero">
    <div class="hero-pill">📘 Guía completa · v1.0</div>
    <h1>Migra UiPath a <em>Power Automate Desktop</em><br>sin pagar a nadie</h1>
    <p>Manual paso a paso con kit de prompts para Copilot. Sin experiencia previa. Sin riesgo de romper nada.</p>
  </div>

  <h2 class="block-title">¿Qué consigues con esta guía?</h2>
  <div class="card-row">
    <div class="card">
      <div class="card-head"><div class="card-icon ic-blue">📂</div><h3>Extraer sin riesgo</h3></div>
      <p>Sacar los ficheros de UiPath sin tocar el robot original.</p>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-icon ic-green">🔍</div><h3>Entender la lógica</h3></div>
      <p>Leer un XAML aunque nunca hayas visto uno.</p>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-icon ic-amber">🔁</div><h3>Traducir a PAD</h3></div>
      <p>Con el mapa de equivalencias claro y sin perderse.</p>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-icon ic-red">🤖</div><h3>Usar Copilot</h3></div>
      <p>Prompts listos para copiar y pegar cuando Claude no esté disponible.</p>
    </div>
  </div>

  <div class="callout info">
    <span class="callout-icon">💡</span>
    <p><strong>Regla de oro:</strong> nunca migres línea a línea. Entiende qué hace el proceso y rediseñalo en PAD. Si copias el XAML tal cual, copias también todos sus problemas.</p>
  </div>

  <h2 class="block-title">Flujo de un vistazo</h2>
  <div class="progress-strip">
    <div class="progress-item" @click="show('antes', $event)"><span class="dot"></span>01 · Preparar</div>
    <div class="progress-item" @click="show('extraer', $event)"><span class="dot"></span>02 · Extraer</div>
    <div class="progress-item" @click="show('analizar', $event)"><span class="dot"></span>03 · Analizar</div>
    <div class="progress-item" @click="show('mapeo', $event)"><span class="dot"></span>04 · Mapear</div>
    <div class="progress-item" @click="show('construir', $event)"><span class="dot"></span>05 · Construir</div>
    <div class="progress-item" @click="show('validar', $event)"><span class="dot"></span>06 · Validar</div>
  </div>

  <div class="callout tip">
    <span class="callout-icon">🚀</span>
    <div>
      <strong>¿Tienes prisa? Empieza aquí:</strong>
      <ul>
        <li>Lee la sección 01 — 3 minutos</li>
        <li>Haz la extracción de la sección 02 — sin riesgo</li>
        <li>Pégame el XAML y lo analizamos juntos</li>
      </ul>
    </div>
  </div>
</div>

<!-- ── 01. ANTES ── -->
<div class="section" id="s-antes">
  <div class="section-title">01 · Antes de tocar nada</div>
  <p class="section-sub">Prepara el terreno para que nada pueda salir mal.</p>

  <h2 class="block-title">Documentos que necesitas</h2>

  <div class="card">
    <div class="card-head"><div class="card-icon ic-blue">📋</div><h3>PDD (Process Design Document)</h3></div>
    <p>Si existe, es tu mejor punto de partida. Describe qué hace el proceso en lenguaje humano. Pídelo antes de abrir ningún fichero.</p>
    <div style="margin-top:.6rem"><span class="tag tag-green">✓ Ideal tenerlo</span><span class="tag tag-amber">⚠ Si no existe, lo reconstruimos leyendo el XAML</span></div>
  </div>

  <div class="card">
    <div class="card-head"><div class="card-icon ic-amber">📁</div><h3>Carpeta del proyecto UiPath</h3></div>
    <p>Los ficheros .xaml y project.json del robot. Siempre trabajarás sobre una <strong>copia</strong>, nunca el original.</p>
    <div style="margin-top:.6rem"><span class="tag tag-blue">✓ Imprescindible</span></div>
  </div>

  <div class="card">
    <div class="card-head"><div class="card-icon ic-green">🖥️</div><h3>Acceso a las aplicaciones que usa el robot</h3></div>
    <p>Para regrabar los selectores en PAD necesitas acceso a las mismas apps (SAP, navegador, Excel…). Los selectores de UiPath <strong>no se trasladan</strong> — hay que regrabarlos.</p>
    <div style="margin-top:.6rem"><span class="tag tag-blue">✓ Necesario en fase 05</span></div>
  </div>

  <h2 class="block-title">Reglas de oro (0% de riesgo)</h2>

  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <h4>Nunca toques el proyecto original</h4>
        <p>Trabaja siempre sobre una copia. El robot original debe seguir funcionando exactamente igual.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <h4>No desinstales UiPath</h4>
        <p>Tiene que correr en paralelo durante toda la migración. Solo lo apagas cuando PAD está validado.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <h4>Empieza por el proceso más sencillo</h4>
        <p>El primero te enseña el método. Los siguientes serán mucho más rápidos.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">4</div>
      <div class="step-body">
        <h4>Documenta lo que haces</h4>
        <p>Un Word o OneNote con lo que encuentras en cada proceso. Cuando llegues al cuarto no recordarás cómo era el primero.</p>
      </div>
    </div>
  </div>
</div>

<!-- ── 02. EXTRAER ── -->
<div class="section" id="s-extraer">
  <div class="section-title">02 · Extraer de UiPath</div>
  <p class="section-sub">Cómo sacar los ficheros que necesitas sin riesgo.</p>

  <div class="callout info">
    <span class="callout-icon">🔒</span>
    <p>Los ficheros .xaml son texto plano (XML). Abrirlos no ejecuta nada, no cambia nada. Es tan seguro como leer un Word.</p>
  </div>

  <h2 class="block-title">Método A — Desde UiPath Studio</h2>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-body"><h4>Abre UiPath Studio</h4><p>Solo abrir la app, no ejecutar nada.</p></div></div>
    <div class="step"><div class="step-num">2</div><div class="step-body"><h4>Abre el proyecto</h4><p>Panel izquierdo → Open → selecciona la carpeta del proceso.</p></div></div>
    <div class="step"><div class="step-num">3</div><div class="step-body"><h4>Localiza la carpeta</h4><p>Panel "Project" → clic derecho en el nombre → <strong>Open in File Explorer</strong>.</p></div></div>
    <div class="step"><div class="step-num">4</div><div class="step-body"><h4>Copia toda la carpeta</h4><p>Ctrl+A, copia, pega en otro sitio: <code style="font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:var(--accent-br)">C:\Migraciones\Proceso1_copia</code>. Esa copia es con la que trabajas.</p></div></div>
    <div class="step"><div class="step-num">5</div><div class="step-body"><h4>Abre Main.xaml con VSCode o Notepad++</h4><p>Clic derecho → Abrir con. En la sección 03 aprendemos a leerlo.</p></div></div>
  </div>

  <h2 class="block-title">Método B — Sin abrir Studio</h2>
  <div class="card">
    <p style="margin-bottom:.65rem">Los proyectos suelen estar en:</p>
    <div class="code-label">Rutas habituales en Windows</div>
    <div class="code-block">C:\Users\[TuUsuario]\Documents\UiPath\[NombreProyecto]\
C:\UiPath\Projects\[NombreProyecto]\
\\servidor\compartido\Robots\[NombreProyecto]\<button class="copy-btn" @click="copyCode($event.currentTarget)">Copiar</button></div>
    <p>Si no sabes la ruta: busca en el Explorador los ficheros <code style="font-family:'IBM Plex Mono',monospace;color:var(--accent-br);font-size:.8rem">*.xaml</code> o <code style="font-family:'IBM Plex Mono',monospace;color:var(--accent-br);font-size:.8rem">project.json</code>.</p>
  </div>

  <h2 class="block-title">Qué ficheros importan y cuáles no</h2>
  <div class="table-wrap">
    <table>
      <tr><th>Fichero</th><th>Para qué sirve</th><th>¿Lo necesitas?</th></tr>
      <tr><td>Main.xaml</td><td>Punto de entrada. Lógica principal u orquestador de sub-workflows.</td><td><span class="tag tag-green">Sí, siempre</span></td></tr>
      <tr><td>Otros .xaml</td><td>Sub-workflows: partes del proceso separadas en ficheros.</td><td><span class="tag tag-green">Sí, todos</span></td></tr>
      <tr><td>project.json</td><td>Metadatos: nombre, versión, dependencias (paquetes UiPath usados).</td><td><span class="tag tag-amber">Útil para dependencias</span></td></tr>
      <tr><td>Data/ o Assets/</td><td>Config, Excel de configuración, plantillas.</td><td><span class="tag tag-amber">Si existen, míralos</span></td></tr>
      <tr><td>.screenshots/</td><td>Imágenes para selectores basados en imagen.</td><td><span class="tag tag-blue">Solo si usa Computer Vision</span></td></tr>
      <tr><td>node_modules/</td><td>Librerías descargadas. Sin lógica del proceso.</td><td><span class="tag tag-red">No necesario</span></td></tr>
    </table>
  </div>
</div>

<!-- ── 03. ANALIZAR ── -->
<div class="section" id="s-analizar">
  <div class="section-title">03 · Analizar el proceso</div>
  <p class="section-sub">Entender qué hace el robot antes de migrar nada.</p>

  <div class="callout info">
    <span class="callout-icon">🧠</span>
    <p>No necesitas entender XML. Solo saber qué buscar. Los XAML tienen una estructura repetitiva y predecible.</p>
  </div>

  <h2 class="block-title">Qué buscar en el fichero</h2>
  <div class="card">
    <ul>
      <li><strong style="color:var(--accent-br)">DisplayName=</strong> — El nombre legible de cada acción. Es la lógica en humano.</li>
      <li><strong style="color:var(--accent-br)">InvokeWorkflowFile</strong> — Llama a otro .xaml. Hay sub-procesos separados.</li>
      <li><strong style="color:var(--accent-br)">Selector=</strong> — El selector de UI. Aquí verás las apps que automatiza.</li>
      <li><strong style="color:var(--accent-br)">TryCatch</strong> — Bloque de manejo de errores.</li>
      <li><strong style="color:var(--accent-br)">x:TypeArguments</strong> — El tipo de variable (String, DataTable, Int32…)</li>
    </ul>
  </div>

  <h2 class="block-title">Preguntas que debes responder antes de migrar</h2>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-body"><h4>¿Qué aplicaciones usa?</h4><p>Busca en los selectores: <code style="font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:var(--accent-br)">app=</code> o <code style="font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:var(--accent-br)">title=</code>. Chrome, SAP, Excel, app de escritorio…</p></div></div>
    <div class="step"><div class="step-num">2</div><div class="step-body"><h4>¿Cuántos pasos tiene?</h4><p>Cuenta los <code style="font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:var(--accent-br)">DisplayName=</code> en Main.xaml. Muchos InvokeWorkflow = proceso modular.</p></div></div>
    <div class="step"><div class="step-num">3</div><div class="step-body"><h4>¿Cómo maneja los errores?</h4><p>¿Hay TryCatch? ¿RetryScope? ¿Usa REFramework? → Ver sección "¿Es REFramework?"</p></div></div>
    <div class="step"><div class="step-num">4</div><div class="step-body"><h4>¿De dónde lee y dónde escribe?</h4><p>Busca: <code style="font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:var(--accent-br)">ReadRange</code> (Excel), <code style="font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:var(--accent-br)">GetQueueItems</code> (Orchestrator), <code style="font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:var(--accent-br)">DatabaseQuery</code>…</p></div></div>
    <div class="step"><div class="step-num">5</div><div class="step-body"><h4>¿Hay credenciales?</h4><p>Busca: <code style="font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:var(--accent-br)">GetCredential</code>, <code style="font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:var(--accent-br)">GetAsset</code>, o variables con nombres como <em>password</em>, <em>user</em>, <em>apiKey</em>.</p></div></div>
  </div>

  <h2 class="block-title">Señales de complejidad</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:.85rem;margin-bottom:1rem">
    <div class="card" style="border-color:rgba(62,207,110,.3)">
      <h3 style="color:var(--green);margin-bottom:.5rem;font-family:'Space Grotesk',sans-serif;font-size:.9rem;font-weight:600">🟢 Proceso simple</h3>
      <ul style="font-size:.82rem">
        <li>Un solo .xaml (o 2-4)</li>
        <li>Sequence lineal</li>
        <li>Sin REFramework ni colas</li>
        <li>1-2 aplicaciones</li>
        <li>Sin credenciales complejas</li>
      </ul>
    </div>
    <div class="card" style="border-color:rgba(224,85,85,.3)">
      <h3 style="color:var(--red);margin-bottom:.5rem;font-family:'Space Grotesk',sans-serif;font-size:.9rem;font-weight:600">🔴 Proceso complejo</h3>
      <ul style="font-size:.82rem">
        <li>Muchos .xaml anidados</li>
        <li>REFramework completo</li>
        <li>Colas de Orchestrator</li>
        <li>Múltiples aplicaciones</li>
        <li>Computer Vision / Image-based</li>
      </ul>
    </div>
  </div>
</div>

<!-- ── 04. MAPEO ── -->
<div class="section" id="s-mapeo">
  <div class="section-title">04 · Mapeo UiPath → PAD</div>
  <p class="section-sub">Equivalencias entre los conceptos de ambas herramientas.</p>

  <div class="callout info">
    <span class="callout-icon">📌</span>
    <p>PAD no es UiPath. La tabla da la equivalencia conceptual, pero en PAD se construye de forma diferente.</p>
  </div>

  <div class="table-wrap">
    <table>
      <tr><th>UiPath</th><th>Power Automate Desktop</th><th>Notas clave</th></tr>
      <tr><td>Workflow (.xaml)</td><td>Flow</td><td>Un .xaml = un Flow o Subflow.</td></tr>
      <tr><td>Activity</td><td>Action</td><td>Concepto idéntico.</td></tr>
      <tr><td>Sequence</td><td>Bloque de acciones</td><td>PAD es secuencial por defecto.</td></tr>
      <tr><td>Flowchart</td><td>If / Loop anidados</td><td>No hay Flowchart visual en PAD.</td></tr>
      <tr><td>State Machine</td><td>Variables estado + Switch/If</td><td>Sin equivalente nativo. O manual o Power Automate Cloud.</td></tr>
      <tr><td>Invoke Workflow</td><td>Run subflow</td><td>Los subflows en PAD van dentro del mismo Flow.</td></tr>
      <tr><td>Variable / Argument</td><td>Variable de flow</td><td>PAD no distingue In/Out/InOut tan estrictamente.</td></tr>
      <tr><td>Try-Catch</td><td>On block error</td><td>Se activa con "En caso de error" dentro de un bloque.</td></tr>
      <tr><td>Retry Scope</td><td>Loop manual con contador</td><td>Sin equivalente nativo.</td></tr>
      <tr><td>Log Message</td><td>Escribir en fichero de texto</td><td>PAD no tiene logging integrado como UiPath.</td></tr>
      <tr><td>Selector</td><td>Elemento de UI</td><td>Hay que regrabarlos — no se importan.</td></tr>
      <tr><td>REFramework</td><td>Estructura manual con Subflows</td><td>Sin plantilla oficial. Recrear Init/Process/Error/End.</td></tr>
      <tr><td>Orchestrator Queue</td><td>SharePoint List / Excel + PAC</td><td>Power Automate Cloud puede disparar el flow por elemento.</td></tr>
      <tr><td>Asset (Orchestrator)</td><td>Variable de entorno PAD / Dataverse</td><td>Para config compartida entre flows.</td></tr>
      <tr><td>Get Credential</td><td>Credential Manager de Windows</td><td>PAD puede leer credenciales del almacén de Windows.</td></tr>
    </table>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:.85rem">
    <div class="card" style="border-color:rgba(62,207,110,.3)">
      <h3 style="color:var(--green);margin-bottom:.6rem;font-family:'Space Grotesk',sans-serif;font-size:.9rem;font-weight:600">✅ Se gana con PAD</h3>
      <ul><li>Integración nativa M365 (SharePoint, Teams, Outlook, Excel Online)</li><li>Triggers basados en eventos con Power Automate Cloud</li><li>Sin coste adicional con licencia M365</li><li>Más fácil de mantener por IT generalista</li></ul>
    </div>
    <div class="card" style="border-color:rgba(224,85,85,.3)">
      <h3 style="color:var(--red);margin-bottom:.6rem;font-family:'Space Grotesk',sans-serif;font-size:.9rem;font-weight:600">❌ Se pierde con PAD</h3>
      <ul><li>Colas con prioridades y reintentos de Orchestrator</li><li>Dashboard de monitorización nativo</li><li>REFramework preconfigurado</li><li>Activities especializadas del marketplace UiPath</li></ul>
    </div>
  </div>
</div>

<!-- ── 05. CONSTRUIR ── -->
<div class="section" id="s-construir">
  <div class="section-title">05 · Construir en PAD</div>
  <p class="section-sub">Cómo montar el flow desde cero en Power Automate Desktop.</p>

  <div class="callout warn">
    <span class="callout-icon">⚠️</span>
    <div><strong>Principio fundamental:</strong> no traduzcas línea a línea.<br>
    El proceso correcto: <strong>1. Entiendo qué hace</strong> → <strong>2. Rediseño para PAD</strong> → <strong>3. Construyo.</strong></div>
  </div>

  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-body"><h4>Crea un flow nuevo con nombre claro</h4><p>PAD → Nuevo flow → Nombre: <code style="font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:var(--accent-br)">PRO_[NombreProceso]_v1</code></p></div></div>
    <div class="step"><div class="step-num">2</div><div class="step-body"><h4>Define los subflows primero</h4><p>Antes de ninguna acción, crea la estructura: <code style="font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:var(--accent-br)">Main · Init · Proceso · ManejoError</code>. Aunque el proceso sea simple, esta estructura te salva.</p></div></div>
    <div class="step"><div class="step-num">3</div><div class="step-body"><h4>Init: abre apps y configura variables</h4><p>Todo lo que el robot prepara antes de trabajar: abrir Excel, navegar a URL, inicializar contadores, cargar config, recuperar credenciales del Credential Manager.</p></div></div>
    <div class="step"><div class="step-num">4</div><div class="step-body"><h4>Proceso: la lógica de negocio</h4><p>Aquí va lo que hace realmente el robot. Nombres de variables descriptivos en castellano. Comentarios en pasos no obvios.</p></div></div>
    <div class="step"><div class="step-num">5</div><div class="step-body"><h4>Añade "On block error" en pasos críticos</h4><p>Selecciona acciones → clic derecho → "En caso de error". Define qué hacer: ¿parar? ¿continuar? ¿registrar y saltar? No dejes interacciones de UI sin manejo de error.</p></div></div>
    <div class="step"><div class="step-num">6</div><div class="step-body"><h4>Logging básico</h4><p>Acción <strong>Escribir texto en archivo</strong> (modo Append) en <code style="font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:var(--accent-br)">C:\Logs\NombreProceso_log.txt</code> con fecha/hora. Ponlo al inicio, en pasos clave y en manejadores de error.</p></div></div>
    <div class="step"><div class="step-num">7</div><div class="step-body"><h4>Regraba los selectores de UI</h4><p>Los selectores de UiPath no se pueden copiar. En PAD: añade acción de UI → "Seleccionar elemento de UI" → apunta al elemento real. PAD captura el selector automáticamente.</p></div></div>
    <div class="step"><div class="step-num">8</div><div class="step-body"><h4>Prueba subflow por subflow</h4><p>Primero Init. Cuando funciona, añade Proceso. Cuando funciona, simula un error y verifica ManejoError. Despacio al principio = horas ahorradas después.</p></div></div>
  </div>

  <h2 class="block-title">Estructura REFramework en PAD</h2>
  <div class="table-wrap">
    <table>
      <tr><th>Subflow</th><th>Qué hace</th></tr>
      <tr><td>Main</td><td>Llama a Init → Loop_Proceso → End</td></tr>
      <tr><td>Init</td><td>Abre apps, lee config, inicializa contadores y listas</td></tr>
      <tr><td>Loop_Proceso</td><td>For each sobre la lista de elementos. Llama a Proceso_Elemento por cada uno</td></tr>
      <tr><td>Proceso_Elemento</td><td>Procesa un solo elemento. Tiene su propio On block error</td></tr>
      <tr><td>Registro_Error</td><td>Recibe el error, escribe en log, marca elemento fallido, continúa</td></tr>
      <tr><td>End</td><td>Cierra apps, genera resumen, envía email si aplica</td></tr>
    </table>
  </div>
</div>

<!-- ── 06. VALIDAR ── -->
<div class="section" id="s-validar">
  <div class="section-title">06 · Validar y hacer el corte</div>
  <p class="section-sub">Cómo asegurarte de que PAD hace lo mismo que UiPath antes de apagar el original.</p>

  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-body"><h4>Prueba con datos de prueba, no producción</h4><p>Sandbox, copia de ficheros, registros con estado "TEST". Nunca valides por primera vez con datos reales.</p></div></div>
    <div class="step"><div class="step-num">2</div><div class="step-body"><h4>Ejecución paralela</h4><p>Corre UiPath y PAD sobre los mismos datos de prueba y compara resultados. ¿Output idéntico? ¿Tiempos razonables? ¿Errores gestionados igual?</p></div></div>
    <div class="step"><div class="step-num">3</div><div class="step-body"><h4>Prueba los casos de error deliberadamente</h4><p>Borra un fichero que necesita, desconecta la app, introduce un dato inválido. Verifica que PAD no se queda colgado.</p></div></div>
    <div class="step"><div class="step-num">4</div><div class="step-body"><h4>Valida con el responsable del proceso</h4><p>La persona de negocio (no IT) debe confirmar que el resultado es correcto. Un flow que funciona pero produce datos erróneos es un fallo de migración.</p></div></div>
    <div class="step"><div class="step-num">5</div><div class="step-body"><h4>Corte: activa PAD, para UiPath (no desinstales)</h4><p>Para el robot de UiPath. Activa PAD en producción. Mantén UiPath disponible 2-4 semanas por si aparecen casos no cubiertos.</p></div></div>
    <div class="step"><div class="step-num">6</div><div class="step-body"><h4>Documenta la migración</h4><p>Qué proceso era, qué hacía, cómo se migró, diferencias encontradas, fecha del corte. Guárdalo en SharePoint. Este documento es el activo que diferencia "lo hice yo sin dejar evidencia" de "lo hice yo con trazabilidad".</p></div></div>
  </div>

  <div class="callout tip">
    <span class="callout-icon">🏆</span>
    <p>Con 4-5 procesos migrados y documentados en SharePoint tienes un portfolio que demuestra capacidad técnica real. Eso vale más que cualquier certificación.</p>
  </div>
</div>

<!-- ── REF: REFramework ── -->
<div class="section" id="s-re">
  <div class="section-title">¿Es REFramework?</div>
  <p class="section-sub">Lo primero que debes saber antes de empezar cualquier migración.</p>

  <div class="callout info">
    <span class="callout-icon">📌</span>
    <p>No necesitas abrir ningún fichero ni entender código. Solo mira los <strong>nombres</strong> de los .xaml en la carpeta del proyecto.</p>
  </div>

  <h2 class="block-title">Paso 1 — Mira los nombres de los .xaml</h2>

  <div class="re-grid">
    <div class="re-card yes">
      <h3>🔴 ES REFramework</h3>
      <p style="font-size:.8rem;color:var(--text-dim);margin-bottom:.6rem">Si ves <strong>alguno</strong> de estos:</p>
      <ul class="file-list red">
        <li>📄 GetTransactionData.xaml</li>
        <li>📄 Process.xaml</li>
        <li>📄 SetTransactionStatus.xaml</li>
        <li>📄 InitAllApplications.xaml</li>
        <li>📄 InitAllSettings.xaml</li>
      </ul>
      <div style="margin-top:.75rem;padding-top:.65rem;border-top:1px solid var(--border)">
        <span class="tag tag-red">Complejidad media-alta</span>
        <span class="tag tag-amber">Procesa múltiples elementos en bucle</span>
      </div>
    </div>

    <div class="re-card no">
      <h3>🟢 NO es REFramework</h3>
      <p style="font-size:.8rem;color:var(--text-dim);margin-bottom:.6rem">Si solo ves nombres de pasos del proceso:</p>
      <ul class="file-list grn">
        <li>📄 Main.xaml</li>
        <li>📄 Login.xaml</li>
        <li>📄 RellenarFormulario.xaml</li>
        <li>📄 EnviarEmail.xaml</li>
        <li>📄 CerrarAplicacion.xaml</li>
      </ul>
      <div style="margin-top:.75rem;padding-top:.65rem;border-top:1px solid var(--border)">
        <span class="tag tag-green">Complejidad baja-media</span>
        <span class="tag tag-blue">Proceso lineal de principio a fin</span>
      </div>
    </div>
  </div>

  <h2 class="block-title">Paso 2 — Qué hacer según el resultado</h2>

  <div class="table-wrap">
    <table>
      <tr><th></th><th>🟢 No REFramework</th><th>🔴 Con REFramework</th></tr>
      <tr><td>¿Migrar ahora?</td><td><span class="tag tag-green">Sí, empieza por este</span></td><td><span class="tag tag-amber">Mejor después, cuando tengas práctica</span></td></tr>
      <tr><td>Tiempo estimado</td><td>1 – 3 días</td><td>3 – 7 días</td></tr>
      <tr><td>En PAD necesitas</td><td>Subflows simples</td><td>Estructura Loop completa + logging por elemento</td></tr>
      <tr><td>Mayor dificultad</td><td>Regrabar selectores</td><td>Reproducir colas y reintentos sin Orchestrator</td></tr>
      <tr><td>Riesgo si falla</td><td>Bajo</td><td>Medio-alto (puede afectar muchos registros)</td></tr>
    </table>
  </div>

  <h2 class="block-title">Paso 3 — ¿Usa colas de Orchestrator?</h2>

  <div class="card">
    <div class="card-head"><div class="card-icon ic-amber">📬</div><h3>Cómo detectarlo</h3></div>
    <p style="margin-bottom:.65rem">Busca estas palabras en Main.xaml o GetTransactionData.xaml:</p>
    <div class="code-block">GetQueueItems
AddQueueItem
SetTransactionStatus
OrchestratorQueueName<button class="copy-btn" @click="copyCode($event.currentTarget)">Copiar</button></div>
    <div class="callout warn" style="margin-bottom:0">
      <span class="callout-icon">⚠️</span>
      <p>Si aparecen, el proceso depende de Orchestrator para gestionar el trabajo. En PAD hay que reemplazarlo con SharePoint List / Excel + Power Automate Cloud. Es el escenario más complejo — déjalo para el final.</p>
    </div>
  </div>

  <h2 class="block-title">Resumen en 10 segundos</h2>

  <div class="summary-strip">
    <div class="strip-row"><span class="strip-num">01</span><p>Abre la carpeta del proyecto → mira los nombres de los .xaml</p></div>
    <div class="strip-row"><span class="strip-num">02</span><p>¿Ves GetTransactionData / Process / SetTransactionStatus? → <strong>REF → aparca, empieza por otro</strong></p></div>
    <div class="strip-row"><span class="strip-num">03</span><p>¿Solo Main + nombres de pasos? → <strong>No REF → empieza por este</strong></p></div>
    <div class="strip-row"><span class="strip-num">04</span><p>¿Dudas? → Dime los nombres de los .xaml y te digo en qué categoría cae sin que tengas que interpretar nada</p></div>
  </div>
</div>

<!-- ── ERRORES ── -->
<div class="section" id="s-errores">
  <div class="section-title">⚠ Errores frecuentes</div>
  <p class="section-sub">Los fallos más comunes en migraciones — y cómo evitarlos.</p>

  <div class="card"><div class="card-head"><div class="card-icon ic-red">❌</div><h3>"Los selectores de UiPath los reutilizo en PAD"</h3></div><p><strong style="color:var(--red)">Falso.</strong> No son portables. Son capturas del motor de cada herramienta. En PAD hay que regrabarlos. No hay atajo.</p></div>

  <div class="card"><div class="card-head"><div class="card-icon ic-red">❌</div><h3>"Migro línea a línea, es lo más fiel"</h3></div><p><strong style="color:var(--red)">Error de diseño.</strong> Trasladar el XAML directamente replica también los problemas del original: esperas fijas, selectores frágiles, falta de manejo de errores. Rediseña, no copies.</p></div>

  <div class="card"><div class="card-head"><div class="card-icon ic-red">❌</div><h3>"No necesito logging, el flow es simple"</h3></div><p><strong style="color:var(--red)">Peligroso.</strong> Sin logging, cuando el flow falla en producción no sabes en qué paso. Añade siempre un log mínimo: inicio, pasos clave, errores. Con "Escribir texto" en un .txt es suficiente.</p></div>

  <div class="card"><div class="card-head"><div class="card-icon ic-red">❌</div><h3>"PAD tarda lo mismo que UiPath"</h3></div><p><strong style="color:var(--red)">No siempre.</strong> Para procesos intensivos en UI puede comportarse diferente. Mide los tiempos reales antes de comprometerte con plazos.</p></div>

  <div class="card"><div class="card-head"><div class="card-icon ic-red">❌</div><h3>"Empiezo por el proceso más crítico"</h3></div><p><strong style="color:var(--red)">Estrategia equivocada.</strong> El primer proceso siempre tiene más sorpresas de lo esperado. Empieza por el más simple. Cuando domines el método, los críticos serán mucho más manejables.</p></div>

  <div class="card"><div class="card-head"><div class="card-icon ic-red">❌</div><h3>"Desinstalo UiPath en cuanto PAD funciona"</h3></div><p><strong style="color:var(--red)">Demasiado pronto.</strong> Mantén UiPath operativo al menos 4 semanas. Los casos borde aparecen después del go-live.</p></div>
</div>

<!-- ── CHECKLIST ── -->
<div class="section" id="s-checklist">
  <div class="section-title">✓ Checklist completo</div>
  <p class="section-sub">Marca cada paso. Cuando todo está marcado, la migración está lista.</p>

  <h2 class="block-title">Fase 01 · Preparación</h2>
  <div class="card"><ul class="checklist">
    <li><input type="checkbox"> He identificado el proceso y tengo claro qué hace</li>
    <li><input type="checkbox"> Tengo (o he pedido) el PDD del proceso</li>
    <li><input type="checkbox"> He copiado la carpeta del proyecto a una ubicación separada</li>
    <li><input type="checkbox"> El robot original sigue funcionando sin cambios</li>
    <li><input type="checkbox"> Tengo acceso a las aplicaciones que usa el robot</li>
  </ul></div>

  <h2 class="block-title">Fase 02 · Análisis</h2>
  <div class="card"><ul class="checklist">
    <li><input type="checkbox"> He leído el Main.xaml y entiendo la estructura general</li>
    <li><input type="checkbox"> Sé cuántos sub-workflows tiene y qué hace cada uno</li>
    <li><input type="checkbox"> Sé qué aplicaciones automatiza</li>
    <li><input type="checkbox"> He identificado cómo maneja los errores</li>
    <li><input type="checkbox"> He identificado de dónde lee y dónde escribe datos</li>
    <li><input type="checkbox"> He evaluado si usa REFramework / colas / credenciales</li>
    <li><input type="checkbox"> He calificado la complejidad (simple / media / compleja)</li>
  </ul></div>

  <h2 class="block-title">Fase 03 · Construcción en PAD</h2>
  <div class="card"><ul class="checklist">
    <li><input type="checkbox"> Flow creado con nombre correcto y estructura de subflows</li>
    <li><input type="checkbox"> Subflow Init funcionando (abre apps, carga config)</li>
    <li><input type="checkbox"> Lógica de negocio construida en subflow Proceso</li>
    <li><input type="checkbox"> Selectores regrabados en PAD (no copiados de UiPath)</li>
    <li><input type="checkbox"> Manejo de errores añadido en pasos críticos</li>
    <li><input type="checkbox"> Logging básico implementado</li>
    <li><input type="checkbox"> Variables con nombres claros y consistentes</li>
    <li><input type="checkbox"> Credenciales en Credential Manager (no en texto plano)</li>
  </ul></div>

  <h2 class="block-title">Fase 04 · Validación y corte</h2>
  <div class="card"><ul class="checklist">
    <li><input type="checkbox"> Probado con datos de prueba (no producción)</li>
    <li><input type="checkbox"> Probados casos de error deliberados</li>
    <li><input type="checkbox"> Validado por el responsable del proceso de negocio</li>
    <li><input type="checkbox"> Ejecución paralela UiPath vs PAD comparada</li>
    <li><input type="checkbox"> Corte realizado: PAD activo, UiPath parado (no desinstalado)</li>
    <li><input type="checkbox"> Migración documentada en SharePoint</li>
    <li><input type="checkbox"> Plan de rollback definido</li>
  </ul></div>
</div>

<!-- ── COPILOT ── -->
<div class="section" id="s-copilot">
  <div class="section-title">⊕ Kit de prompts para Copilot</div>
  <p class="section-sub">Prompts listos para copiar y pegar en Copilot M365 Premium. Más directivos que los que usarías con Claude — necesario para compensar que Copilot necesita más dirección.</p>

  <div class="callout warn">
    <span class="callout-icon">⚠️</span>
    <div><strong>Antes de usar estos prompts:</strong>
      <ul>
        <li>Copilot no lee ficheros de tu disco. Pega el contenido del XAML en el chat.</li>
        <li>Si el XAML es muy largo, divide por secciones o subflows.</li>
        <li>Si Copilot inventa cosas, usa el Prompt de rescate.</li>
      </ul>
    </div>
  </div>

  <div class="prompt-card">
    <div class="prompt-card-head">
      <h4>📋 Prompt 1 · Analizar un XAML</h4>
      <span class="tag tag-blue">Análisis</span>
    </div>
    <div class="prompt-body">
      <p class="prompt-purpose">Úsalo al pegar el contenido de un .xaml para entender qué hace antes de migrar.</p>
      <div class="prompt-text" id="p1">Actúa como un experto en automatización RPA con experiencia en UiPath y Power Automate Desktop.

Voy a pegarte el contenido de un fichero .xaml de UiPath. Necesito que lo analices y me respondas exactamente esto, en este orden:

1. RESUMEN DEL PROCESO (2-3 frases): qué hace de forma simplificada, para alguien sin conocimientos técnicos.

2. APLICACIONES QUE USA: lista todas las apps o sistemas que automatiza (detectadas en selectores o DisplayName).

3. PASOS PRINCIPALES: lista numerada de los pasos en orden, con el DisplayName y una frase de qué hace.

4. MANEJO DE ERRORES: ¿tiene TryCatch? ¿RetryScope? ¿REFramework? Explica brevemente.

5. DATOS: ¿de dónde lee? ¿Dónde escribe resultados?

6. CREDENCIALES: ¿usa GetCredential, GetAsset u otra gestión de credenciales?

7. COMPLEJIDAD DE MIGRACIÓN A PAD: BAJA / MEDIA / ALTA con justificación breve.

Si algo no está claro en el XAML, dilo explícitamente en lugar de inventar.

Aquí tienes el contenido del XAML:
[PEGA AQUÍ EL CONTENIDO DEL .XAML]</div>
      <button class="copy-prompt" @click="copyById('p1', $event.currentTarget)">📋 Copiar prompt</button>
    </div>
  </div>

  <div class="prompt-card">
    <div class="prompt-card-head">
      <h4>🔁 Prompt 2 · Diseñar el equivalente en PAD</h4>
      <span class="tag tag-green">Diseño</span>
    </div>
    <div class="prompt-body">
      <p class="prompt-purpose">Úsalo después del análisis para obtener el diseño del flow en PAD paso a paso.</p>
      <div class="prompt-text" id="p2">Actúa como un experto en Power Automate Desktop (PAD).

Basándote en el análisis del proceso UiPath que hemos hecho, diseña cómo construir este proceso en PAD. Respóndeme exactamente esto:

1. ESTRUCTURA DE SUBFLOWS: lista los subflows a crear y qué hace cada uno.

2. ACCIONES PAD POR SUBFLOW: para cada subflow, lista las acciones de PAD en orden, con el nombre exacto de la acción y una frase de para qué sirve.

3. VARIABLES: nombre sugerido, tipo de dato y para qué se usa.

4. SELECTORES: qué elementos de UI hay que regrabar y en qué aplicación están.

5. MANEJO DE ERRORES: dónde y cómo añadir "On block error" para este proceso.

6. LOGGING: cómo implementar el logging básico.

Si alguna capacidad de UiPath no tiene equivalente directo en PAD, dilo claramente y propón la alternativa más próxima.

No inventes acciones que no existen en PAD. Si no estás seguro, dilo.</div>
      <button class="copy-prompt" @click="copyById('p2', $event.currentTarget)">📋 Copiar prompt</button>
    </div>
  </div>

  <div class="prompt-card">
    <div class="prompt-card-head">
      <h4>🆘 Prompt 3 · Rescate cuando Copilot se pierde</h4>
      <span class="tag tag-red">Rescate</span>
    </div>
    <div class="prompt-body">
      <p class="prompt-purpose">Cuando Copilot divaga, inventa cosas o da respuestas genéricas que no aplican a tu caso.</p>
      <div class="prompt-text" id="p3">Para. Necesito que reencafiles tu respuesta.

Estamos hablando específicamente de migrar el proceso [NOMBRE DEL PROCESO] de UiPath a Power Automate Desktop.

Problemas con tu respuesta anterior:
- [Describe qué está mal: "inventaste una acción que no existe en PAD", "la respuesta es genérica", "no respondiste lo que pedí", etc.]

Necesito que me respondas SOLO lo siguiente, de forma concreta y específica para este proceso:
[Indica exactamente qué necesitas]

Reglas:
- Si no sabes algo con certeza, dilo explícitamente. No inventes.
- Usa nombres reales de acciones de Power Automate Desktop.
- Responde solo lo que te pido, sin añadir información extra no solicitada.</div>
      <button class="copy-prompt" @click="copyById('p3', $event.currentTarget)">📋 Copiar prompt</button>
    </div>
  </div>

  <div class="prompt-card">
    <div class="prompt-card-head">
      <h4>📝 Prompt 4 · Generar documento de migración</h4>
      <span class="tag tag-amber">Documentación</span>
    </div>
    <div class="prompt-body">
      <p class="prompt-purpose">Al final de la migración, para generar el documento de evidencia en SharePoint.</p>
      <div class="prompt-text" id="p4">Actúa como experto en documentación de proyectos de automatización.

Basándote en todo lo que hemos hablado sobre la migración del proceso [NOMBRE], genera un documento estructurado con estas secciones:

1. DATOS DEL PROCESO
   - Nombre, herramienta original (UiPath), destino (PAD), fechas

2. QUÉ HACE EL PROCESO (para alguien no técnico, 3-5 frases)

3. APLICACIONES AUTOMATIZADAS

4. CAMBIOS RESPECTO AL ORIGINAL
   - Qué se mantuvo igual / qué se rediseñó y por qué / qué se mejoró

5. ESTRUCTURA DEL FLOW EN PAD (subflows y función de cada uno)

6. GESTIÓN DE ERRORES Y LOGGING

7. INSTRUCCIONES PARA EJECUTAR Y MONITORIZAR

8. NOTAS Y ADVERTENCIAS (casos borde, limitaciones encontradas)

Formato: claro, sin jerga técnica innecesaria. Lo leerá también alguien de negocio.</div>
      <button class="copy-prompt" @click="copyById('p4', $event.currentTarget)">📋 Copiar prompt</button>
    </div>
  </div>

  <div class="prompt-card">
    <div class="prompt-card-head">
      <h4>🔍 Prompt 5 · Priorizar qué proceso migrar primero</h4>
      <span class="tag tag-blue">Planificación</span>
    </div>
    <div class="prompt-body">
      <p class="prompt-purpose">Si tienes varios procesos en UiPath y no sabes por cuál empezar.</p>
      <div class="prompt-text" id="p5">Actúa como consultor de automatización RPA.

Tengo varios procesos en UiPath que quiero migrar a Power Automate Desktop. Para cada proceso que te describa, evalúa:

1. COMPLEJIDAD DE MIGRACIÓN (Baja/Media/Alta)
2. RIESGO (Bajo/Medio/Alto) — criticidad, consecuencias si falla
3. VALOR DE MIGRACIÓN (Bajo/Medio/Alto) — frecuencia, ahorro licencias, integración M365
4. RECOMENDACIÓN: migrar ahora / después / dejar en UiPath

Al final dame un orden de migración recomendado con justificación de una frase por proceso.

Los procesos que tengo son:
[Describe cada proceso: nombre, qué hace, apps que usa, frecuencia de ejecución]</div>
      <button class="copy-prompt" @click="copyById('p5', $event.currentTarget)">📋 Copiar prompt</button>
    </div>
  </div>

  <div class="callout tip">
    <span class="callout-icon">💡</span>
    <div><strong>Tips para mejores resultados con Copilot:</strong>
      <ul>
        <li>Sesión nueva para cada proceso — Copilot tiene contexto limitado.</li>
        <li>Si el XAML es muy largo, divídelo en bloques: primero variables, luego Main, luego cada sub-workflow.</li>
        <li>Copilot tiende a ser más genérico. Si necesitas precisión, usa el Prompt de Rescate.</li>
        <li>Cuando termines con Copilot, pégame los resultados y los verifico antes de construir nada.</li>
      </ul>
    </div>
  </div>
</div>

</main>
</div>

<button class="mob-toggle" @click="toggleNav()">☰</button>
  </div>
</template>

<style>

/* ═══════════════════════════════════════════
   TOKENS — DARK
═══════════════════════════════════════════ */
html.mod-migracion-uipath {
  --bg:         #0f1117;
  --bg2:        #181c28;
  --bg3:        #1f2438;
  --border:     #2a2f4a;
  --border2:    #353c5c;
  --text:       #dde1f0;
  --text-dim:   #7b82a0;
  --text-faint: #4a5070;
  --accent:     #5b8dee;
  --accent-dim: rgba(91,141,238,.12);
  --accent-br:  #7aa3f5;
  --green:      #3ecf6e;
  --green-dim:  rgba(62,207,110,.10);
  --amber:      #f0a030;
  --amber-dim:  rgba(240,160,48,.10);
  --red:        #e05555;
  --red-dim:    rgba(224,85,85,.10);
  --shadow:     0 2px 12px rgba(0,0,0,.35);
  --radius:     10px;
  --radius-sm:  6px;
}

html.mod-migracion-uipath[data-theme="light"], html.mod-migracion-uipath [data-theme="light"] {
  --bg:         #f5f7fc;
  --bg2:        #ffffff;
  --bg3:        #eef1f9;
  --border:     #d8dcea;
  --border2:    #c4c9de;
  --text:       #0f1422;
  --text-dim:   #5a6180;
  --text-faint: #9ba3c0;
  --accent:     #2d63d4;
  --accent-dim: rgba(45,99,212,.08);
  --accent-br:  #1a4db8;
  --green:      #1a8f48;
  --green-dim:  rgba(26,143,72,.08);
  --amber:      #c47a10;
  --amber-dim:  rgba(196,122,16,.08);
  --red:        #c43030;
  --red-dim:    rgba(196,48,48,.08);
  --shadow:     0 2px 10px rgba(0,0,0,.08);
}

/* ═══════════════════════════════════════════
   BASE
═══════════════════════════════════════════ */
html.mod-migracion-uipath *, html.mod-migracion-uipath *::before, html.mod-migracion-uipath *::after { box-sizing: border-box; margin: 0; padding: 0; }

html.mod-migracion-uipath { scroll-behavior: smooth; }

html.mod-migracion-uipath body {
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.7;
  color: var(--text);
  background: var(--bg);
  transition: background .2s, color .2s;
}

/* ═══════════════════════════════════════════
   LAYOUT
═══════════════════════════════════════════ */
html.mod-migracion-uipath .shell { display: flex; min-height: 100vh; }

/* ── NAV ── */
html.mod-migracion-uipath nav {
  width: 252px;
  min-width: 252px;
  background: var(--bg2);
  border-right: 1px solid var(--border);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: var(--border2) transparent;
}
html.mod-migracion-uipath nav::-webkit-scrollbar { width: 4px; }
html.mod-migracion-uipath nav::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }

html.mod-migracion-uipath .nav-header {
  padding: 1.35rem 1.25rem 1.1rem;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

html.mod-migracion-uipath .nav-version {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: var(--accent);
  letter-spacing: .05em;
  margin-bottom: .45rem;
  display: flex;
  align-items: center;
  gap: .4rem;
}

html.mod-migracion-uipath .nav-version::before {
  content: '';
  display: inline-block;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--green);
}

html.mod-migracion-uipath .nav-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.25;
}

html.mod-migracion-uipath .nav-title span { color: var(--accent); }

html.mod-migracion-uipath .nav-body { padding: .5rem 0 1rem; flex: 1; }

html.mod-migracion-uipath .nav-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding: .8rem 1.25rem .3rem;
}

html.mod-migracion-uipath nav a {
  display: flex;
  align-items: center;
  gap: .6rem;
  padding: .42rem 1.25rem;
  font-size: .82rem;
  font-weight: 400;
  color: var(--text-dim);
  text-decoration: none;
  border-left: 2px solid transparent;
  cursor: pointer;
  transition: color .12s, background .12s, border-color .12s;
  line-height: 1.4;
}

html.mod-migracion-uipath nav a:hover { color: var(--text); background: var(--accent-dim); }
html.mod-migracion-uipath nav a.active { color: var(--accent-br); border-left-color: var(--accent); background: var(--accent-dim); font-weight: 500; }

html.mod-migracion-uipath .nav-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: .68rem;
  color: var(--accent);
  min-width: 18px;
  flex-shrink: 0;
}

/* theme toggle */
html.mod-migracion-uipath .nav-footer {
  padding: .9rem 1.25rem;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}

html.mod-migracion-uipath .theme-toggle {
  display: flex;
  align-items: center;
  gap: .6rem;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: .3rem .75rem;
  cursor: pointer;
  font-size: .78rem;
  color: var(--text-dim);
  font-family: 'IBM Plex Sans', sans-serif;
  transition: all .15s;
  width: 100%;
  justify-content: center;
}
html.mod-migracion-uipath .theme-toggle:hover { border-color: var(--accent); color: var(--text); }
html.mod-migracion-uipath .theme-icon { font-size: .95rem; }

/* ── MAIN ── */

html.mod-migracion-uipath main {
    flex: 1;
    padding: 2.25rem 2.75rem 3rem;
    max-width: none;
    min-width: 0;
}


/* ── SECTIONS ── */
html.mod-migracion-uipath .section { display: none; }
html.mod-migracion-uipath .section.active { display: block; animation: fadeIn .15s ease; }

@keyframes fadeIn { from { opacity: .4; transform: translateY(4px); } to { opacity: 1; transform: none; } }

/* ═══════════════════════════════════════════
   TYPOGRAPHY
═══════════════════════════════════════════ */
html.mod-migracion-uipath .section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
  margin-bottom: .3rem;
}

html.mod-migracion-uipath .section-sub {
  font-size: .88rem;
  color: var(--text-dim);
  margin-bottom: 1.75rem;
}

html.mod-migracion-uipath .block-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: .92rem;
  font-weight: 600;
  color: var(--text);
  margin: 1.6rem 0 .75rem;
  display: flex;
  align-items: center;
  gap: .5rem;
}

html.mod-migracion-uipath .block-title::before {
  content: '';
  display: inline-block;
  width: 3px; height: 14px;
  background: var(--accent);
  border-radius: 2px;
  flex-shrink: 0;
}

/* ═══════════════════════════════════════════
   HERO
═══════════════════════════════════════════ */
html.mod-migracion-uipath .hero {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem 2.25rem;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
}

html.mod-migracion-uipath .hero::before {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 260px; height: 100%;
  background: radial-gradient(ellipse at top right, var(--accent-dim) 0%, transparent 70%);
  pointer-events: none;
}

html.mod-migracion-uipath .hero-pill {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  font-family: 'IBM Plex Mono', monospace;
  font-size: .68rem;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid rgba(91,141,238,.25);
  border-radius: 20px;
  padding: 3px 10px;
  margin-bottom: .9rem;
  letter-spacing: .04em;
}

html.mod-migracion-uipath .hero h1 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text);
  margin-bottom: .6rem;
}

html.mod-migracion-uipath .hero h1 em { color: var(--accent-br); font-style: normal; }

html.mod-migracion-uipath .hero p {
  font-size: .9rem;
  color: var(--text-dim);
  max-width: 540px;
}

/* ═══════════════════════════════════════════
   CARDS
═══════════════════════════════════════════ */
html.mod-migracion-uipath .card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem 1.4rem;
  margin-bottom: 1rem;
}

html.mod-migracion-uipath .card-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: .75rem;
  margin-bottom: 1rem;
}

html.mod-migracion-uipath .card-row .card { margin: 0; }

html.mod-migracion-uipath .card-head {
  display: flex;
  align-items: center;
  gap: .65rem;
  margin-bottom: .75rem;
}

html.mod-migracion-uipath .card-icon {
  width: 32px; height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .9rem;
  flex-shrink: 0;
}

html.mod-migracion-uipath .ic-blue  { background: var(--accent-dim); }
html.mod-migracion-uipath .ic-green { background: var(--green-dim); }
html.mod-migracion-uipath .ic-amber { background: var(--amber-dim); }
html.mod-migracion-uipath .ic-red   { background: var(--red-dim); }

html.mod-migracion-uipath .card h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: .92rem;
  font-weight: 600;
  color: var(--text);
}

html.mod-migracion-uipath .card p, html.mod-migracion-uipath .card li {
  font-size: .85rem;
  color: var(--text-dim);
  line-height: 1.65;
}

html.mod-migracion-uipath .card ul { padding-left: 1.15rem; }
html.mod-migracion-uipath .card li { margin-bottom: .25rem; }

/* ═══════════════════════════════════════════
   CALLOUTS
═══════════════════════════════════════════ */
html.mod-migracion-uipath .callout {
  display: flex;
  gap: .85rem;
  padding: .9rem 1.1rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1rem;
  font-size: .85rem;
  line-height: 1.6;
}

html.mod-migracion-uipath .callout-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }
html.mod-migracion-uipath .callout p, html.mod-migracion-uipath .callout li { font-size: .85rem; line-height: 1.6; }
html.mod-migracion-uipath .callout ul { padding-left: 1.1rem; margin-top: .25rem; }
html.mod-migracion-uipath .callout strong { font-weight: 600; }

html.mod-migracion-uipath .callout.info   { background: var(--accent-dim); border: 1px solid rgba(91,141,238,.2);  color: var(--accent-br); }
html.mod-migracion-uipath .callout.tip    { background: var(--green-dim);  border: 1px solid rgba(62,207,110,.2);  color: var(--green); }
html.mod-migracion-uipath .callout.warn   { background: var(--amber-dim);  border: 1px solid rgba(240,160,48,.2);  color: var(--amber); }
html.mod-migracion-uipath .callout.danger { background: var(--red-dim);    border: 1px solid rgba(224,85,85,.2);   color: var(--red); }

/* ═══════════════════════════════════════════
   STEPS
═══════════════════════════════════════════ */
html.mod-migracion-uipath .steps { position: relative; }

html.mod-migracion-uipath .step {
  display: flex;
  gap: 1.1rem;
  margin-bottom: 1.35rem;
  position: relative;
}

html.mod-migracion-uipath .step:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 15px; top: 34px;
  bottom: -1.35rem;
  width: 1px;
  background: var(--border);
}

html.mod-migracion-uipath .step-num {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--bg3);
  border: 1.5px solid var(--accent);
  color: var(--accent);
  font-family: 'Space Grotesk', sans-serif;
  font-size: .8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

html.mod-migracion-uipath .step-body { flex: 1; padding-top: 4px; }

html.mod-migracion-uipath .step-body h4 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: .9rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: .3rem;
}

html.mod-migracion-uipath .step-body p, html.mod-migracion-uipath .step-body li {
  font-size: .84rem;
  color: var(--text-dim);
  line-height: 1.65;
}

html.mod-migracion-uipath .step-body ul { padding-left: 1.1rem; margin-top: .3rem; }
html.mod-migracion-uipath .step-body li { margin-bottom: .2rem; }

/* ═══════════════════════════════════════════
   TABLE
═══════════════════════════════════════════ */
html.mod-migracion-uipath .table-wrap {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 1rem;
}

html.mod-migracion-uipath table { width: 100%; border-collapse: collapse; font-size: .82rem; }

html.mod-migracion-uipath th {
  background: var(--bg3);
  color: var(--text-faint);
  font-family: 'IBM Plex Mono', monospace;
  font-size: .67rem;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  padding: .65rem 1rem;
  text-align: left;
  white-space: nowrap;
}

html.mod-migracion-uipath td {
  padding: .65rem 1rem;
  border-top: 1px solid var(--border);
  color: var(--text-dim);
  vertical-align: top;
  line-height: 1.5;
}

html.mod-migracion-uipath td:first-child {
  font-family: 'IBM Plex Mono', monospace;
  font-size: .78rem;
  color: var(--accent-br);
  white-space: nowrap;
}

html.mod-migracion-uipath tr:hover td { background: var(--accent-dim); }

/* ═══════════════════════════════════════════
   CODE
═══════════════════════════════════════════ */
html.mod-migracion-uipath .code-block {
  position: relative;
  background: #0a0c15;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: .85rem 1rem;
  font-family: 'IBM Plex Mono', monospace;
  font-size: .78rem;
  color: #a5b4fc;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.65;
  margin-bottom: .85rem;
}

html.mod-migracion-uipath[data-theme="light"] .code-block, html.mod-migracion-uipath [data-theme="light"] .code-block {
  background: #f0f2fa;
  color: #3730a3;
  border-color: var(--border);
}

html.mod-migracion-uipath .code-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: .65rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: .35rem;
}

html.mod-migracion-uipath .copy-btn {
  position: absolute;
  top: .65rem; right: .65rem;
  background: var(--bg3);
  border: 1px solid var(--border2);
  color: var(--text-dim);
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: .68rem;
  padding: 2px 9px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all .12s;
}
html.mod-migracion-uipath .copy-btn:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

/* ═══════════════════════════════════════════
   TAGS
═══════════════════════════════════════════ */
html.mod-migracion-uipath .tag {
  display: inline-block;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: .68rem;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 20px;
  margin: 2px 2px 2px 0;
  white-space: nowrap;
}

html.mod-migracion-uipath .tag-blue  { background: var(--accent-dim); color: var(--accent-br); border: 1px solid rgba(91,141,238,.25); }
html.mod-migracion-uipath .tag-green { background: var(--green-dim);  color: var(--green);     border: 1px solid rgba(62,207,110,.25); }
html.mod-migracion-uipath .tag-amber { background: var(--amber-dim);  color: var(--amber);     border: 1px solid rgba(240,160,48,.25); }
html.mod-migracion-uipath .tag-red   { background: var(--red-dim);    color: var(--red);       border: 1px solid rgba(224,85,85,.25); }

/* ═══════════════════════════════════════════
   CHECKLIST
═══════════════════════════════════════════ */
html.mod-migracion-uipath .checklist { list-style: none; padding: 0; }

html.mod-migracion-uipath .checklist li {
  display: flex;
  align-items: flex-start;
  gap: .6rem;
  padding: .45rem 0;
  border-bottom: 1px solid var(--border);
  font-size: .84rem;
  color: var(--text-dim);
  line-height: 1.55;
}

html.mod-migracion-uipath .checklist li:last-child { border-bottom: none; }

html.mod-migracion-uipath .checklist input[type="checkbox"] {
  accent-color: var(--accent);
  width: 14px; height: 14px;
  margin-top: 3px;
  flex-shrink: 0;
  cursor: pointer;
}

/* ═══════════════════════════════════════════
   PROMPT CARDS
═══════════════════════════════════════════ */
html.mod-migracion-uipath .prompt-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 1.25rem;
  overflow: hidden;
}

html.mod-migracion-uipath .prompt-card-head {
  background: var(--bg3);
  border-bottom: 1px solid var(--border);
  padding: .75rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

html.mod-migracion-uipath .prompt-card-head h4 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: .88rem;
  font-weight: 600;
  color: var(--text);
}

html.mod-migracion-uipath .prompt-body { padding: 1.1rem 1.2rem; }

html.mod-migracion-uipath .prompt-purpose {
  font-size: .8rem;
  color: var(--text-dim);
  margin-bottom: .85rem;
  padding-bottom: .75rem;
  border-bottom: 1px solid var(--border);
}

html.mod-migracion-uipath .prompt-text {
  background: #0a0c15;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: .9rem 1rem;
  font-family: 'IBM Plex Mono', monospace;
  font-size: .76rem;
  color: #c7d2fe;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.7;
}

html.mod-migracion-uipath[data-theme="light"] .prompt-text, html.mod-migracion-uipath [data-theme="light"] .prompt-text {
  background: #f0f2fa;
  color: #3730a3;
}

html.mod-migracion-uipath .copy-prompt {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  margin-top: .75rem;
  background: var(--bg3);
  border: 1px solid var(--border2);
  color: var(--text-dim);
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: .75rem;
  padding: .3rem .85rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all .12s;
}
html.mod-migracion-uipath .copy-prompt:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

/* ═══════════════════════════════════════════
   RE DETECTION CARDS
═══════════════════════════════════════════ */
html.mod-migracion-uipath .re-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .85rem;
  margin-bottom: 1.25rem;
}

html.mod-migracion-uipath .re-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.1rem 1.2rem;
}

html.mod-migracion-uipath .re-card.yes { border-color: rgba(224,85,85,.35); }
html.mod-migracion-uipath .re-card.no  { border-color: rgba(62,207,110,.35); }

html.mod-migracion-uipath .re-card h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: .9rem;
  font-weight: 700;
  margin-bottom: .65rem;
}

html.mod-migracion-uipath .re-card.yes h3 { color: var(--red); }
html.mod-migracion-uipath .re-card.no  h3 { color: var(--green); }

html.mod-migracion-uipath .file-list { list-style: none; padding: 0; }

html.mod-migracion-uipath .file-list li {
  font-family: 'IBM Plex Mono', monospace;
  font-size: .76rem;
  padding: .28rem 0;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: .4rem;
}

html.mod-migracion-uipath .file-list.red li { color: var(--red); }
html.mod-migracion-uipath .file-list.grn li { color: var(--green); }
html.mod-migracion-uipath .file-list li:last-child { border-bottom: none; }

/* summary strip */
html.mod-migracion-uipath .summary-strip {
  background: var(--bg2);
  border: 1px solid var(--accent);
  border-radius: var(--radius);
  padding: 1.1rem 1.3rem;
  display: flex;
  flex-direction: column;
  gap: .55rem;
}

html.mod-migracion-uipath .strip-row {
  display: flex;
  align-items: flex-start;
  gap: .75rem;
  font-size: .85rem;
}

html.mod-migracion-uipath .strip-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: .72rem;
  color: var(--accent);
  flex-shrink: 0;
  padding-top: 2px;
}

html.mod-migracion-uipath .strip-row p { color: var(--text-dim); line-height: 1.5; }
html.mod-migracion-uipath .strip-row strong { color: var(--text); font-weight: 500; }

/* ═══════════════════════════════════════════
   PROGRESS STRIP
═══════════════════════════════════════════ */
html.mod-migracion-uipath .progress-strip {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin-bottom: 1.75rem;
}

html.mod-migracion-uipath .progress-item {
  display: flex;
  align-items: center;
  gap: .45rem;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: .35rem .9rem;
  font-size: .78rem;
  color: var(--text-dim);
  cursor: pointer;
  transition: all .12s;
}

html.mod-migracion-uipath .progress-item:hover { border-color: var(--accent); color: var(--text); background: var(--accent-dim); }
html.mod-migracion-uipath .progress-item .dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

/* ═══════════════════════════════════════════
   MOBILE
═══════════════════════════════════════════ */
html.mod-migracion-uipath .mob-toggle {
  display: none;
  position: fixed;
  bottom: 1.25rem; right: 1.25rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 46px; height: 46px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 4px 18px rgba(91,141,238,.4);
  align-items: center;
  justify-content: center;
}

@media (max-width: 780px) {
  html.mod-migracion-uipath nav { position: fixed; left: -252px; z-index: 50; transition: left .22s; height: 100vh; }
  html.mod-migracion-uipath nav.open { left: 0; }
  html.mod-migracion-uipath main { padding: 1.25rem; }
  html.mod-migracion-uipath .mob-toggle { display: flex; }
  html.mod-migracion-uipath .re-grid { grid-template-columns: 1fr; }
  html.mod-migracion-uipath .hero h1 { font-size: 1.35rem; }
}

@media (prefers-reduced-motion: reduce) {
  html.mod-migracion-uipath * { animation: none !important; transition: none !important; }
}

html.mod-migracion-uipath :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

</style>
