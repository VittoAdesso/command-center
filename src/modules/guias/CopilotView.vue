<script setup>
import { ref } from 'vue'
import { useGuiaViva } from '../../composables/useGuiaViva'

const rootRef = ref(null)

useGuiaViva(rootRef, {
  title: "Centro de Mando · Microsoft 365 Copilot — Guía viva",
  scopeClass: "mod-copilot",
  themeStorageKey: null,
  blocks: ["bloque1","bloque2","bloque3","bloque4","bloque5","bloque6"],
  spyMode: "toggle",
  enableCopyBtns: true,
})
</script>

<template>
  <div ref="rootRef">
<div class="topbar">
  <div class="topbar-inner">
    <div class="brand">📡 Centro de Mando <span class="badge-fam">MICROSOFT 365 COPILOT · GUÍA VIVA</span><span class="badge-ver" title="Versión del archivo">v1.0 · completa</span></div>
    <button class="theme-btn" id="themeToggle" aria-label="Cambiar tema" title="Cambiar tema claro/oscuro">🌙</button>
  </div>
</div>

<div class="source-strip">
  <div class="wrap">
    <span class="pin">📍</span>
    <span>Fuente oficial raíz de esta guía:</span>
    <a href="https://learn.microsoft.com/es-es/microsoft-365/copilot/" target="_blank" rel="noopener">learn.microsoft.com/es-es/microsoft-365/copilot</a>
    <span style="color:var(--text-faint)">— cada bloque y cada módulo enlaza además su ruta específica.</span>
  </div>
  <div class="wrap vigencia">
    <span class="pin warn">⚠</span>
    <span>La IA en Microsoft 365 Copilot cambia rápido — ante dudas, confía en el botón "Ver módulo oficial" de cada sección.</span>
    <a class="vig-link" href="#foot-vigencia">Más detalle ↓</a>
  </div>
</div>

<nav class="block-nav" aria-label="Navegación por bloques">
  <div class="block-nav-inner">
    <a class="nav-pill available" href="#bloque1"><span class="dot"></span>1 · Fundamentos</a>
    <a class="nav-pill available" href="#bloque2"><span class="dot"></span>2 · Prompting</a>
    <a class="nav-pill available" href="#bloque3"><span class="dot"></span>3 · Por app</a>
    <a class="nav-pill available" href="#bloque4"><span class="dot"></span>4 · Casos de uso</a>
    <a class="nav-pill available" href="#bloque5"><span class="dot"></span>5 · Administración</a>
    <a class="nav-pill available" href="#bloque6"><span class="dot"></span>6 · Agentes</a>
  </div>
</nav>


<main class="wrap">

  <section class="hero">
    <span class="level-badge">● GUÍA COMPLETA · 6 DE 6 BLOQUES</span>
    <h1>Microsoft 365 <span class="accent">Copilot</span>,<br>de cero a referencia de equipo.</h1>
    <p class="lead">Guía de consulta rápida construida sobre las rutas oficiales de Microsoft Learn. No las sustituye: las sintetiza, las enlaza módulo a módulo y te dice por dónde empezar.</p>
    <div class="hero-meta">
      <div><strong>28</strong>módulos construidos</div>
      <div><strong>75</strong>unidades oficiales enlazadas</div>
      <div><strong>6/6</strong>bloques · guía completa</div>
    </div>
  </section>

  <section class="block-section" id="roadmap">
    <span class="section-label">Mapa de la guía</span>
    <h2>Hoja de ruta — 6 bloques, 3 niveles</h2>
    <p class="section-intro">La columna vertebral son las propias rutas de Microsoft Learn, de principiante a avanzado. Los bloques marcados «Próximamente» ya tienen su fuente enlazada: puedes adelantarte en Learn mientras los construyo.</p>

    <div class="roadmap-nivel">
      <div class="roadmap-nivel-title">Nivel básico</div>
      <div class="roadmap-grid">
        <div class="road-card done">
          <div class="road-card-top"><span class="road-num">BLOQUE 1</span><span class="status-pill disponible">● Disponible</span></div>
          <h3>Fundamentos</h3>
          <p>Qué es Copilot, cómo se conecta a tus datos de M365 y el compromiso de IA responsable de Microsoft.</p>
          <div class="road-source">🔗 <a href="https://learn.microsoft.com/es-es/training/paths/get-started-with-microsoft-365-copilot/" target="_blank" rel="noopener">Obtener Copilot en Microsoft 365 · 3 módulos</a></div>
        </div>
        <div class="road-card done">
          <div class="road-card-top"><span class="road-num">BLOQUE 2</span><span class="status-pill disponible">● Disponible</span></div>
          <h3>Prompting efectivo</h3>
          <p>Cómo construir indicaciones que de verdad rindan, con ejemplos por aplicación.</p>
          <div class="road-source">🔗 <a href="https://learn.microsoft.com/es-es/training/paths/craft-effective-prompts-copilot-microsoft-365/" target="_blank" rel="noopener">Crear indicaciones eficaces · 4 módulos</a></div>
        </div>
      </div>
    </div>

    <div class="roadmap-nivel">
      <div class="roadmap-nivel-title">Nivel intermedio</div>
      <div class="roadmap-grid">
        <div class="road-card done">
          <div class="road-card-top"><span class="road-num">BLOQUE 3</span><span class="status-pill disponible">● Disponible</span></div>
          <h3>Copilot por aplicación</h3>
          <p>Word, Excel, PowerPoint, Outlook, Teams y Copilot Chat — flujos de trabajo reales, datos de trabajo vs. datos web.</p>
          <div class="road-source">🔗 <a href="https://learn.microsoft.com/es-es/training/paths/draft-analyze-present-microsoft-365-copilot/" target="_blank" rel="noopener">Borrador, análisis y presentación (MS-4018)</a></div>
        </div>
        <div class="road-card done">
          <div class="road-card-top"><span class="road-num">BLOQUE 4</span><span class="status-pill disponible">● Disponible</span></div>
          <h3>Casos de uso por rol</h3>
          <p>Ejecutivos, ventas, marketing, finanzas, RR. HH., operaciones — y un módulo específico de TI muy relevante para DSI.</p>
          <div class="road-source">🔗 <a href="https://learn.microsoft.com/es-es/training/paths/empower-workforce-copilot-use-cases/" target="_blank" rel="noopener">Capacitar a sus empleados con casos de uso</a></div>
        </div>
      </div>
    </div>

    <div class="roadmap-nivel">
      <div class="roadmap-nivel-title">Nivel avanzado</div>
      <div class="roadmap-grid">
        <div class="road-card done">
          <div class="road-card-top"><span class="road-num">BLOQUE 5</span><span class="status-pill disponible">● Disponible</span></div>
          <h3>Administración y despliegue</h3>
          <p>Requisitos previos, licencias, preparación de datos para búsqueda, seguridad y cumplimiento. Tu vertiente DSI.</p>
          <div class="road-source">🔗 <a href="https://learn.microsoft.com/es-es/training/paths/prepare-your-organization-microsoft-365-copilot/" target="_blank" rel="noopener">Preparación de la organización</a></div>
        </div>
        <div class="road-card done">
          <div class="road-card-top"><span class="road-num">BLOQUE 6</span><span class="status-pill disponible">● Disponible</span></div>
          <h3>Agentes y Copilot Studio</h3>
          <p>Agentes predefinidos (Researcher, Analyst), administración de agentes y primer contacto con Copilot Studio.</p>
          <div class="road-source">🔗 <a href="https://learn.microsoft.com/es-es/training/paths/explore-microsoft-365-copilot-agent-administration/" target="_blank" rel="noopener">Exploración de Copilot y administración del agente</a></div>
        </div>
      </div>
    </div>
  </section>

  <section class="block-section" id="bloque1">
    <span class="section-label">Bloque 1 · Nivel básico</span>
    <h2>Fundamentos de Microsoft 365 Copilot</h2>
    <p class="section-intro">Ruta oficial: <a href="https://learn.microsoft.com/es-es/training/paths/get-started-with-microsoft-365-copilot/" target="_blank" rel="noopener">«Obtener Copilot en Microsoft 365»</a> — principiante, sin requisitos previos, 3 módulos. Aquí tienes cada módulo con sus unidades enlazadas y mi síntesis práctica debajo.</p>

    <!-- MÓDULO 1 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 1 DE 3</span><h3>Introducción al portal de Microsoft 365 Copilot</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/introduction-microsoft-365-copilot/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/introduction-microsoft-365-copilot/2-what-is-copilot" target="_blank" rel="noopener">¿Qué es Copilot?</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/introduction-microsoft-365-copilot/3-how-copilot-works" target="_blank" rel="noopener">Cómo funciona</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/introduction-microsoft-365-copilot/4-explore-core-components-copilot" target="_blank" rel="noopener">Componentes principales</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/introduction-microsoft-365-copilot/5-examine-microsoft-responsible-ai" target="_blank" rel="noopener">IA responsable</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/introduction-microsoft-365-copilot/6-knowledge-check" target="_blank" rel="noopener">Evaluación</a>
      </div>
      <span class="synth-label">En síntesis</span>
      <div class="synth">
        <p>Copilot no es un chatbot suelto: es un modelo de lenguaje conectado a tres piezas. <strong>Microsoft Graph</strong> aporta el contexto (tus correos, chats, documentos y reuniones, pero solo los que ya tienes permiso de ver — no hay fuga de datos entre usuarios ni grupos). Las <strong>apps de M365</strong> (Word, Excel, PowerPoint, Outlook, Teams, Loop) ponen la interfaz. Y el propio modelo razona sobre ambas cosas a la vez.</p>
        <p>Dicho de otra forma: la diferencia frente a un chat de IA genérico no está en el modelo, está en que Copilot ya conoce tu trabajo sin que se lo cuentes.</p>
        <p>El módulo también cubre el compromiso de Microsoft con la <strong>IA responsable</strong> — los principios estándar del sector (equidad, fiabilidad y seguridad, privacidad, inclusión, transparencia, rendición de cuentas), que conviene tener a mano si te toca defender Copilot ante resistencia interna en DSI.</p>
      </div>
      <div class="callout novedad">
        <strong>Novedad a vigilar</strong>
        Copilot Chat ha empezado a abrir la elección de modelo subyacente más allá del propio de Microsoft — entre las opciones añadidas figura Claude de Anthropic para tareas como analizar documentos largos o generar planes estructurados. Si tu organización solo tiene habilitado Copilot Premium, vale la pena confirmar con el Centro de administración si esta opción ya está disponible para vosotros. Fuente: <a href="https://learn.microsoft.com/es-es/microsoft-365/copilot/release-notes" target="_blank" rel="noopener">notas de la versión de M365 Copilot ↗</a>
      </div>
    </article>

    <!-- MÓDULO 2 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 2 DE 3</span><h3>Explora las posibilidades con Microsoft 365 Copilot</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/explore-possibilities-microsoft-365-copilot/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/explore-possibilities-microsoft-365-copilot/2-compose-summarize-documents-copilot" target="_blank" rel="noopener">Word</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/explore-possibilities-microsoft-365-copilot/3-summarize-draft-emails-copilot" target="_blank" rel="noopener">Outlook</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/explore-possibilities-microsoft-365-copilot/4-design-presentations-copilot" target="_blank" rel="noopener">PowerPoint</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/explore-possibilities-microsoft-365-copilot/5-analyze-transform-data-copilot" target="_blank" rel="noopener">Excel</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/explore-possibilities-microsoft-365-copilot/6-elevate-productivity-copilot-teams" target="_blank" rel="noopener">Teams</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/explore-possibilities-microsoft-365-copilot/7-empower-employees-microsoft-copilot" target="_blank" rel="noopener">Copilot Chat</a>
      </div>
      <span class="synth-label">En síntesis</span>
      <div class="synth">
        <p>El patrón de entrada se repite en casi todas las apps: panel lateral de Copilot, icono flotante en el documento, o cuadro «Iniciar con Copilot» al abrir un archivo en blanco. Aprendido una vez, vale para las demás.</p>
        <p><strong>Excel es el caso que mejor conviene memorizar</strong>, porque rompe el reflejo de «primero la fórmula»: en vez de escribir =BUSCARV(...), describes lo que quieres saber y Copilot explora el rango, detecta patrones, sugiere tablas dinámicas o visualizaciones, y responde preguntas de seguimiento en lenguaje natural. No modifica los datos al analizarlos — solo al pedírselo explícitamente para transformarlos (ordenar, dar estilo, crear columnas, generar gráficos).</p>
        <p>En <strong>Word y PowerPoint</strong> el caso de uso fuerte es el primer borrador a partir de un objetivo claro, y la edición dirigida después («reescribe esta sección», «hazlo más conciso»). En <strong>Outlook</strong>, resumir hilos largos y redactar respuestas con contexto. En <strong>Teams</strong>, ponerte al día de reuniones y chats sin haber estado presente. <strong>Copilot Chat</strong> es la capa transversal: vive fuera de un documento concreto y puede tirar de varios archivos, chats y correos a la vez para responder preguntas que cruzan fuentes.</p>
      </div>
    </article>

    <!-- MÓDULO 3 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 3 DE 3</span><h3>Optimizar y ampliar Microsoft 365 Copilot</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/optimize-and-extend-microsoft-365-copilot/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/optimize-and-extend-microsoft-365-copilot/2-examine-working-with-ai" target="_blank" rel="noopener">Trabajar con IA</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/optimize-and-extend-microsoft-365-copilot/3-best-practices-copilot" target="_blank" rel="noopener">Buenas prácticas</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/optimize-and-extend-microsoft-365-copilot/4-examine-effective-prompt" target="_blank" rel="noopener">Indicaciones efectivas</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/optimize-and-extend-microsoft-365-copilot/5-review-prompting-best-practices" target="_blank" rel="noopener">Mejores prácticas de petición</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/optimize-and-extend-microsoft-365-copilot/6-extend-copilot-with-plugins" target="_blank" rel="noopener">Ampliar con plugins</a>
      </div>
      <span class="synth-label">En síntesis</span>
      <div class="synth">
        <p>Este es el módulo con más jugo práctico de los tres. La idea central: el resultado de Copilot depende más de la claridad de tu indicación que del propio modelo. Tres palancas concretas:</p>
        <ul class="mini-list">
          <li><strong>Claro y conciso, pero con contexto real.</strong> «Resume esta reunión» rinde peor que «analiza esta transcripción y resume los puntos clave que planteó Susana». El detalle no sobra — orienta.</li>
          <li><strong>Dale a Copilot un punto de vista.</strong> «Eres un gestor de redes sociales escribiendo para LinkedIn» o «explícamelo como lo haría un profesor de Harvard» cambia el registro de la respuesta, no solo el contenido.</li>
          <li><strong>Itera en vez de rendirte al primer intento.</strong> El primer resultado es un borrador de trabajo, no la respuesta final. Pedir «sé más específico», dar feedback explícito y encadenar peticiones es el flujo normal, no un síntoma de que algo falla.</li>
        </ul>
        <p>El orden de la información también importa: las partes que pones al final de una indicación pesan más que las del principio, así que si quieres que Copilot priorice un archivo o dato concreto, colócalo en último lugar.</p>
        <p>Sobre los límites: Copilot rinde mejor en tareas repetitivas que en problemas de varios pasos encadenados (mejor trocearlos), sus respuestas no son deterministas (la misma indicación puede dar resultados distintos), y como cualquier LLM puede producir contenido sesgado o incorrecto — conviene revisar antes de dar por buena una respuesta sensible.</p>
        <p>Por último, la <strong>extensibilidad</strong>: más allá del uso conversacional, Copilot se puede ampliar con plugins y conectores para traer datos externos a la conversación — la puerta de entrada hacia Copilot Studio, que es justamente el Bloque 6.</p>
      </div>
    </article>

  </section>

  <section class="block-section" id="practica">
    <span class="section-label">Practica ya</span>
    <h2>6 indicaciones para empezar hoy</h2>
    <p class="section-intro">Pensadas para un perfil DSI / IT — adáptalas a tu caso y guárdate las que mejor te funcionen.</p>
    <div class="practice-grid" id="promptGrid">

      <div class="prompt-card">
        <span class="prompt-app">Excel</span>
        <p class="prompt-text">Analiza este inventario de activos y dime si hay equipos cuya garantía vence en los próximos 60 días. Crea una tabla dinámica agrupada por departamento.</p>
        <button class="copy-btn">Copiar</button>
      </div>

      <div class="prompt-card">
        <span class="prompt-app">Outlook</span>
        <p class="prompt-text">Resume los correos de este hilo destacando solo las decisiones tomadas y las tareas pendientes asignadas a mí. Ignora los mensajes puramente informativos.</p>
        <button class="copy-btn">Copiar</button>
      </div>

      <div class="prompt-card">
        <span class="prompt-app">Word</span>
        <p class="prompt-text">Eres un consultor de automatización de procesos explicando este informe técnico a un director general sin perfil técnico. Reescribe el resumen ejecutivo en ese tono, sin perder las cifras clave.</p>
        <button class="copy-btn">Copiar</button>
      </div>

      <div class="prompt-card">
        <span class="prompt-app">Teams</span>
        <p class="prompt-text">Sintetiza los mensajes y reuniones de este canal de los últimos 15 días sobre el despliegue de Copilot, y dime qué objeciones se han repetido más de una vez.</p>
        <button class="copy-btn">Copiar</button>
      </div>

      <div class="prompt-card">
        <span class="prompt-app">PowerPoint</span>
        <p class="prompt-text">Crea una presentación de 6 diapositivas para presentar a los responsables de área los resultados del primer mes de Copilot en DSI, basándote en este documento de métricas adjunto.</p>
        <button class="copy-btn">Copiar</button>
      </div>

      <div class="prompt-card">
        <span class="prompt-app">Copilot Chat</span>
        <p class="prompt-text">Busca en mis archivos y correos de las últimas dos semanas todo lo relacionado con «migración PAD» y dame un resumen del estado actual con los próximos pasos pendientes.</p>
        <button class="copy-btn">Copiar</button>
      </div>

    </div>
  </section>

  <section class="block-section" id="bloque2">
    <span class="section-label">Bloque 2 · Nivel básico</span>
    <h2>Prompting efectivo</h2>
    <p class="section-intro">Ruta oficial: <a href="https://learn.microsoft.com/es-es/training/paths/craft-effective-prompts-copilot-microsoft-365/" target="_blank" rel="noopener">«Crear indicaciones eficaces para Microsoft 365 Copilot»</a> — principiante, 4 módulos. Requisito previo: este módulo da por hecho el Bloque 1, exactamente como lo exige la propia ruta de Microsoft.</p>

    <div class="framework-box">
      <h3>El marco de las 4 piezas</h3>
      <p>Los cuatro módulos de este bloque enseñan la misma estructura aplicada a una intención distinta cada vez (resumir, crear, editar, preguntar). Una vez que la pillas, se repite siempre igual — por eso la explico aquí una sola vez y los módulos de abajo van directos al grano.</p>
      <div class="fw-grid">
        <div class="fw-item"><span class="fw-num">01</span><strong>Objetivo</strong><span>Qué quieres que haga Copilot. Sin esto no hay indicación.</span></div>
        <div class="fw-item"><span class="fw-num">02</span><strong>Contexto</strong><span>Para qué lo necesitas o quién lo va a leer.</span></div>
        <div class="fw-item"><span class="fw-num">03</span><strong>Origen</strong><span>Qué parte exacta de qué documento o dato debe usar.</span></div>
        <div class="fw-item"><span class="fw-num">04</span><strong>Expectativas</strong><span>Formato, longitud y tono del resultado.</span></div>
      </div>
      <span class="evolution-label">De indicación floja a las 4 piezas</span>
      <table class="prompt-table">
        <tr><th>Paso</th><th>Indicación</th></tr>
        <tr><td class="bad">Solo objetivo</td><td class="bad">«Resume este informe de incidencias.»</td></tr>
        <tr><td>+ Contexto</td><td>...para explicárselo a mi director, que no es perfil técnico.</td></tr>
        <tr><td>+ Origen</td><td>...centrándote solo en la sección de incidencias críticas (Sev1 y Sev2).</td></tr>
        <tr><td>+ Expectativas</td><td>...en 5 puntos, sin jerga técnica, listo para pegar en un correo.</td></tr>
      </table>
      <div class="final-prompt"><b>Indicación final</b>«Resume la sección de incidencias críticas (Sev1 y Sev2) de este informe en 5 puntos sin jerga técnica — es para mi director, que no tiene perfil técnico, y quiero poder pegar el resultado directo en un correo.»</div>
    </div>

    <!-- MÓDULO 1 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 1 DE 4</span><h3>Resumir y simplificar la información</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/summarize-simplify-information-with-microsoft-copilot-microsoft-365/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/summarize-simplify-information-with-microsoft-copilot-microsoft-365/2-simplify-extract-key-information-copilot-word" target="_blank" rel="noopener">Word</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/summarize-simplify-information-with-microsoft-copilot-microsoft-365/3-identify-key-information-summarize-powerpoint" target="_blank" rel="noopener">PowerPoint</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/summarize-simplify-information-with-microsoft-copilot-microsoft-365/4-spot-trends-visualize-data-copilot-excel" target="_blank" rel="noopener">Excel</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/summarize-simplify-information-with-microsoft-copilot-microsoft-365/5-highlight-key-decisions-action-items-teams-meetings" target="_blank" rel="noopener">Teams</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/summarize-simplify-information-with-microsoft-copilot-microsoft-365/6-catch-up-prepare-week-copilot-outlook" target="_blank" rel="noopener">Outlook</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/summarize-simplify-information-with-microsoft-copilot-microsoft-365/7-summarize-information-topic-copilot-microsoft-365" target="_blank" rel="noopener">Copilot Chat</a>
      </div>
      <span class="synth-label">En síntesis</span>
      <div class="synth">
        <p>El ejemplo de arriba (informe de incidencias) viene de este módulo, aplicado originalmente a resumir un documento de Word — el patrón se repite igual en PowerPoint (extraer lo clave de una presentación larga), Excel (detectar tendencias en una tabla y pedir que las visualice), Teams (sacar decisiones y tareas de una reunión sin haber estado) y Outlook (ponerte al día de la semana sin leer cada correo). Copilot Chat añade una capa más: puede resumir un tema cruzando varios documentos y correos a la vez, no solo uno.</p>
      </div>
    </article>

    <!-- MÓDULO 2 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 2 DE 4</span><h3>Crear y hacer borradores</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/create-draft-content-with-microsoft-copilot-microsoft-365/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/create-draft-content-with-microsoft-copilot-microsoft-365/2-draft-content-microsoft-copilot-word" target="_blank" rel="noopener">Word</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/create-draft-content-with-microsoft-copilot-microsoft-365/3-build-new-slides-agendas-to-do-lists-microsoft-copilot-powerpoint" target="_blank" rel="noopener">PowerPoint</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/create-draft-content-with-microsoft-copilot-microsoft-365/4-draft-emails-replies-meeting-agendas-microsoft-copilot-outlook" target="_blank" rel="noopener">Outlook</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/create-draft-content-with-microsoft-copilot-microsoft-365/5-brainstorm-new-ideas-lists-reports-across-microsoft-365-microsoft-copilot" target="_blank" rel="noopener">Copilot Chat</a>
      </div>
      <span class="synth-label">En síntesis</span>
      <div class="synth">
        <p>Aquí Copilot pasa de analizar a producir: cartas de presentación, planes y esquemas en Word; diapositivas y agendas nuevas en PowerPoint; ideas y listas en Copilot Chat. El caso de Outlook merece detalle porque tiene un flujo de botones concreto: icono Copilot en la barra de herramientas → «Borrador con Copilot» → escribes la indicación → «Generar opciones» (eliges tono y longitud) → «Generar» → revisas y, si no convence, «Regenerar borrador» en vez de empezar de cero.</p>
        <p><strong>Ojo con un detalle de plataforma:</strong> esta función solo está disponible en el Outlook nuevo (Windows, web u Outlook.com) — si tu equipo sigue en el Outlook clásico, no aparece. Vale la pena confirmarlo antes de prometérselo a tu equipo en una sesión de adopción.</p>
      </div>
    </article>

    <!-- MÓDULO 3 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 3 DE 4</span><h3>Editar y transformar contenido</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/edit-transform-content-with-microsoft-copilot-microsoft-365/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/edit-transform-content-with-microsoft-copilot-microsoft-365/2-write-organize-transform-content-copilot-word" target="_blank" rel="noopener">Word</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/edit-transform-content-with-microsoft-copilot-microsoft-365/3-add-images-slides-organize-presentation-copilot-powerpoint" target="_blank" rel="noopener">PowerPoint</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/edit-transform-content-with-microsoft-copilot-microsoft-365/4-format-sort-filter-highlight-data-copilot-excel" target="_blank" rel="noopener">Excel</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/edit-transform-content-with-microsoft-copilot-microsoft-365/5-rewrite-messages-replies-tone-copilot-outlook" target="_blank" rel="noopener">Outlook</a>
      </div>
      <span class="synth-label">En síntesis</span>
      <div class="synth">
        <p>El tercer verbo: ya no resumes ni creas desde cero, partes de algo existente y lo transformas. En Word, reorganizar esquemas y ganar confianza en la redacción. En PowerPoint, meter imágenes y reordenar diapositivas. En Excel, dar formato, ordenar, filtrar y resaltar datos sin tocar fórmulas a mano. Y en Outlook hay una herramienta con nombre propio que vale la pena conocer: <strong>Asesoramiento de Copilot</strong>, pensada específicamente para reescribir un mensaje ajustando el tono antes de enviarlo.</p>
      </div>
    </article>

    <!-- MÓDULO 4 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 4 DE 4</span><h3>Preguntar y analizar contenido</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/ask-analyze-content-with-microsoft-copilot-microsoft-365/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/ask-analyze-content-with-microsoft-copilot-microsoft-365/2-ask-copilot-recommendations-help-word" target="_blank" rel="noopener">Word</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/ask-analyze-content-with-microsoft-copilot-microsoft-365/3-get-design-tips-microsoft-copilot-powerpoint" target="_blank" rel="noopener">PowerPoint</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/ask-analyze-content-with-microsoft-copilot-microsoft-365/4-analyze-work-tables-using-copilot-excel" target="_blank" rel="noopener">Excel</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/ask-analyze-content-with-microsoft-copilot-microsoft-365/5-ask-questions-about-notes-copilot-onenote" target="_blank" rel="noopener">OneNote</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/ask-analyze-content-with-microsoft-copilot-microsoft-365/6-chat-copilot-about-meetings-messages-teams-outlook" target="_blank" rel="noopener">Teams / Outlook</a>
      </div>
      <span class="synth-label">En síntesis</span>
      <div class="synth">
        <p>El último verbo es preguntar en vez de mandar: pedir ayuda o recomendaciones en Word, sugerencias de diseño en PowerPoint, analizar tablas en Excel, preguntar sobre tus propias notas en OneNote, o sobre reuniones y mensajes en Teams/Outlook. Este módulo conecta directo con el Bloque 1: es la capa conversacional que cruza datos de toda la organización a través de Microsoft Graph — por eso solo te devuelve lo que ya tienes permiso de ver.</p>
      </div>
    </article>

  </section>

  <section class="block-section" id="practica2">
    <span class="section-label">Practica ya</span>
    <h2>Aplica las 4 piezas a tus propias indicaciones</h2>
    <p class="section-intro">Coge una indicación floja que uses normalmente y añádele las 4 piezas, una por una. Aquí tienes el antes/después de cuatro casos típicos de DSI.</p>
    <div class="practice-grid">

      <div class="prompt-card">
        <span class="prompt-app">Floja → Completa</span>
        <p class="prompt-text"><span style="color:var(--text-faint); text-decoration:line-through;">«Redacta un correo sobre el mantenimiento.»</span><br><br>«Redacta un correo al equipo de Infraestructura avisando de la ventana de mantenimiento del sábado de 22:00 a 02:00 — usa el motivo y el alcance de mi nota adjunta. Tono breve y directo, máximo 5 líneas.»</p>
        <button class="copy-btn">Copiar</button>
      </div>

      <div class="prompt-card">
        <span class="prompt-app">Floja → Completa</span>
        <p class="prompt-text"><span style="color:var(--text-faint); text-decoration:line-through;">«Resume esta reunión.»</span><br><br>«Resume esta transcripción de la reunión de seguimiento de Copilot centrándote solo en las objeciones planteadas por los responsables de área. Formato: tabla con columnas Objeción / Quién la planteó / Siguiente paso.»</p>
        <button class="copy-btn">Copiar</button>
      </div>

      <div class="prompt-card">
        <span class="prompt-app">Floja → Completa</span>
        <p class="prompt-text"><span style="color:var(--text-faint); text-decoration:line-through;">«Mejora esta presentación.»</span><br><br>«Reorganiza las diapositivas 4 a 8 de esta presentación para que sigan el orden Problema → Datos → Propuesta → Coste. Es para el comité de dirección, así que recorta texto y prioriza una idea por diapositiva.»</p>
        <button class="copy-btn">Copiar</button>
      </div>

      <div class="prompt-card">
        <span class="prompt-app">Floja → Completa</span>
        <p class="prompt-text"><span style="color:var(--text-faint); text-decoration:line-through;">«Analiza esta tabla.»</span><br><br>«Analiza la tabla de incidencias de este Excel y dime si hay algún departamento con un repunte de tickets en las últimas 4 semanas frente a la media anual. Responde en 3 frases, sin tecnicismos.»</p>
        <button class="copy-btn">Copiar</button>
      </div>

    </div>
  </section>

  <section class="block-section" id="bloque3">
    <span class="section-label">Bloque 3 · Nivel intermedio</span>
    <h2>Copilot por aplicación</h2>
    <p class="section-intro">Ruta oficial: <a href="https://learn.microsoft.com/es-es/training/paths/draft-analyze-present-microsoft-365-copilot/" target="_blank" rel="noopener">«Borrador, análisis y presentación con M365 Copilot» (MS-4018)</a> — 7 módulos. Su Módulo 1 es idéntico al Módulo 1 del Bloque 1 (ya lo tienes arriba), así que aquí van los 6 restantes — no repito nada que ya hayas visto.</p>

    <div class="framework-box">
      <h3>El interruptor que cambia todo: Trabajo vs. Web</h3>
      <p>Antes de entrar app por app, esto es lo único que de verdad hay que entender bien de Copilot Chat: arriba de la ventana hay un interruptor con dos modos, y cada uno responde con datos distintos.</p>
      <div class="fw-grid">
        <div class="fw-item"><span class="fw-num">MODO</span><strong>Trabajo</strong><span>Se apoya en tus datos de M365 (archivos, correo, reuniones de Teams) vía Graph + el modelo de lenguaje. Opcionalmente también web en vivo si lo activas. Aquí gestionas y completas tareas reales.</span></div>
        <div class="fw-item"><span class="fw-num">MODO</span><strong>Web</strong><span>Se apoya solo en el índice público de Bing + lo que el modelo aprendió en su entrenamiento. Cero datos de tu organización. Sirve para investigar o estar al día de noticias y tendencias.</span></div>
      </div>
      <p style="margin-top:4px;">Un matiz que conviene tener claro: <strong>Copilot Chat no es lo mismo que Copilot en Teams</strong> — son entradas distintas, con icono distinto. Y sea cual sea el modo, la propia documentación de Microsoft insiste en lo mismo que en el Bloque 1: revisa siempre las fuentes citadas antes de dar la respuesta por buena.</p>
    </div>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO · COPILOT CHAT</span><h3>Desbloquear productividad con chat de IA</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/unlock-productivity-unleash-creativity-ai-powered-chat/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/unlock-productivity-unleash-creativity-ai-powered-chat/2-understand-copilot-chat" target="_blank" rel="noopener">Comprender Copilot Chat</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/unlock-productivity-unleash-creativity-ai-powered-chat/3-optimize-workflow-work-mode-chat" target="_blank" rel="noopener">Modo trabajo</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/unlock-productivity-unleash-creativity-ai-powered-chat/4-maximize-productivity-web-mode-chat" target="_blank" rel="noopener">Modo web</a>
      </div>
      <span class="synth-label">En síntesis</span>
      <div class="synth"><p>El recuadro de arriba sale de este módulo. Para acceder desde Teams: icono de Copilot Chat en el lateral izquierdo → cambia a «Trabajo» arriba → escribe tu indicación → Enviar. Tip práctico: si Copilot te devuelve algo que no cuadra con lo que esperabas, lo primero es comprobar en qué modo estaba — es el fallo más común y el más fácil de pasar por alto.</p></div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO · POWERPOINT</span><h3>Crear presentaciones eficaces con IA</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/present-copilot-microsoft-powerpoint/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/present-copilot-microsoft-powerpoint/2-craft-engaging-slides" target="_blank" rel="noopener">Crear diapositivas</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/present-copilot-microsoft-powerpoint/3-refine-enhance-presentation" target="_blank" rel="noopener">Refinar y mejorar</a>
      </div>
      <span class="synth-label">En síntesis</span>
      <div class="synth"><p>Aquí el foco es el flujo completo de dos fases: primero generar la presentación entera desde un prompt (estructura + contenido de golpe), y después una pasada de refinamiento — ajustar diseño, recortar texto, mejorar coherencia entre diapositivas. Distinto del Bloque 2, que solo tocaba el prompt inicial.</p></div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO · WORD</span><h3>Borrador de documentos impactantes</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/draft-impactful-documents-using-ai/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/draft-impactful-documents-using-ai/2-get-started-word-copilot" target="_blank" rel="noopener">Crear contenido</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/draft-impactful-documents-using-ai/3-elevate-document" target="_blank" rel="noopener">Elevar el documento</a>
      </div>
      <span class="synth-label">En síntesis</span>
      <div class="synth"><p>Mismo patrón de dos fases que PowerPoint: borrador inicial completo, luego «elevar» el documento — el término concreto que usa Microsoft para la pasada de mejora (tono, estructura, claridad) una vez ya tienes contenido sobre el que trabajar en vez de la hoja en blanco.</p></div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO · TEAMS</span><h3>Reuniones más productivas con IA</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/make-your-meetings-more-productive-ai/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/make-your-meetings-more-productive-ai/2-grow-collaboration-teams" target="_blank" rel="noopener">Chats</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/make-your-meetings-more-productive-ai/3-amplify-collaboration-teams" target="_blank" rel="noopener">Reuniones</a>
      </div>
      <span class="synth-label">En síntesis</span>
      <div class="synth"><p>Separa dos terrenos que se mezclan en la cabeza pero son distintos en Copilot: colaboración en <strong>chats</strong> (conversaciones en curso, sacar tareas y decisiones sobre la marcha) y colaboración en <strong>reuniones</strong> (antes/durante/después de una convocatoria formal, con grabación y transcripción de por medio).</p></div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO · EXCEL</span><h3>Descubrir nuevas conclusiones de datos</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/uncover-new-data-insights-ai/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/uncover-new-data-insights-ai/2-simplify-data-analysis" target="_blank" rel="noopener">Resumen y análisis</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/uncover-new-data-insights-ai/3-customize-data-integration-analysis-visualization" target="_blank" rel="noopener">Integración y visualización</a>
      </div>
      <span class="synth-label">En síntesis</span>
      <div class="synth"><p>Profundiza donde el Bloque 2 solo apuntaba: no es ya «detecta tendencias», sino personalizar cómo Copilot integra, analiza y visualiza tus datos — más control sobre el tipo de gráfico, el cruce de columnas y el nivel de detalle del análisis.</p></div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO · OUTLOOK</span><h3>De la bandeja de entrada al impacto</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/from-inbox-impact-improve-your-email-workflows-ai/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/from-inbox-impact-improve-your-email-workflows-ai/2-draft-engaging-emails" target="_blank" rel="noopener">Correos atractivos</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/from-inbox-impact-improve-your-email-workflows-ai/3-simplify-meeting-administration" target="_blank" rel="noopener">Administrar reuniones</a>
      </div>
      <span class="synth-label">En síntesis</span>
      <div class="synth"><p>La novedad real frente al Bloque 2 es la segunda unidad: administración de reuniones desde Outlook con Copilot — convocar, reorganizar agendas y resolver solapes sin salir del correo, no solo redactar mensajes.</p></div>
    </article>

  </section>

  <section class="block-section" id="practica3">
    <span class="section-label">Practica ya</span>
    <h2>Encadena dos pasos, no uno</h2>
    <p class="section-intro">La habilidad nueva de este bloque es encadenar: generar y luego refinar. Aquí tienes el flujo en dos tiempos para cuatro casos típicos.</p>
    <div class="practice-grid">

      <div class="prompt-card">
        <span class="prompt-app">PowerPoint · Paso 1 → 2</span>
        <p class="prompt-text"><b>1.</b> «Crea una presentación de 8 diapositivas a partir de este documento de cierre de proyecto.»<br><b>2.</b> «Revisa el contraste de color y reduce el texto de cada diapositiva a un máximo de 3 líneas.»</p>
        <button class="copy-btn">Copiar</button>
      </div>

      <div class="prompt-card">
        <span class="prompt-app">Word · Paso 1 → 2</span>
        <p class="prompt-text"><b>1.</b> «Redacta un primer borrador del procedimiento de escalado de incidencias Sev1.»<br><b>2.</b> «Eleva el documento: hazlo más directo y añade una tabla de tiempos de respuesta por nivel.»</p>
        <button class="copy-btn">Copiar</button>
      </div>

      <div class="prompt-card">
        <span class="prompt-app">Copilot Chat · Modo trabajo</span>
        <p class="prompt-text">«Resume todos mis correos y chats de Teams de ayer sobre el despliegue de Copilot, destacando preguntas abiertas y próximos pasos.»</p>
        <button class="copy-btn">Copiar</button>
      </div>

      <div class="prompt-card">
        <span class="prompt-app">Copilot Chat · Modo web</span>
        <p class="prompt-text">«Compara tres herramientas de RPA líderes del mercado en precio, flexibilidad de licencia y soporte — quiero un resumen para justificar nuestra elección de plataforma.»</p>
        <button class="copy-btn">Copiar</button>
      </div>

    </div>
  </section>

  <section class="block-section" id="bloque4">
    <span class="section-label">Bloque 4 · Nivel intermedio</span>
    <h2>Casos de uso por rol</h2>
    <p class="section-intro">Ruta oficial: <a href="https://learn.microsoft.com/es-es/training/paths/empower-workforce-copilot-use-cases/" target="_blank" rel="noopener">«Capacitar a los empleados con casos de uso de Microsoft 365 Copilot»</a> — 10 módulos, uno por área de negocio. Cada módulo son ejercicios guiados con un escenario concreto, no teoría nueva — por eso aquí va en formato compacto: qué resuelve cada uno y el enlace directo. Si vas a compartir esto con gente de otros departamentos, empieza por su tarjeta.</p>

    <div class="role-grid">

      <div class="role-card highlight">
        <div class="role-card-top"><h4>TI</h4><span class="role-tag">TU ÁREA</span></div>
        <ul>
          <li>Copilot Chat resume una ficha técnica de un producto de seguridad y arma el plan de proyecto para implementarlo.</li>
          <li>Excel analiza activos de la empresa y genera gráficos de patrones de garantía que necesitan atención.</li>
          <li>Word edita un informe de implementación técnica; Outlook redacta el correo con los puntos clave para el cliente.</li>
        </ul>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/enhance-prompting-copilot-it/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>

      <div class="role-card">
        <div class="role-card-top"><h4>Ejecutivos</h4></div>
        <ul>
          <li>Business Chat en Teams sintetiza tus correos y chats de la semana sobre un tema concreto.</li>
          <li>Word redacta un discurso a accionistas a partir de la cuenta de resultados anual; PowerPoint construye la presentación que lo acompaña.</li>
        </ul>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/empower-workforce-copilot-executives/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>

      <div class="role-card">
        <div class="role-card-top"><h4>Ventas</h4></div>
        <ul>
          <li>Loop arma un informe de investigación de mercado para un mercado nuevo.</li>
          <li>Copilot Chat resume correos, reuniones y chats de un proyecto de los últimos 30 días en una lista de tareas.</li>
          <li>Word compara tres contratos de proveedor y recomienda acciones.</li>
        </ul>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/empower-workforce-copilot-sales/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>

      <div class="role-card">
        <div class="role-card-top"><h4>Marketing</h4></div>
        <ul>
          <li>Business Chat analiza tendencias de mercado y propone previsiones de ventas.</li>
          <li>Word consolida tres informes de marketing distintos en uno solo.</li>
          <li>Excel analiza una hoja de tendencias para un producto nuevo.</li>
        </ul>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/empower-workforce-copilot-marketing/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>

      <div class="role-card">
        <div class="role-card-top"><h4>Finanzas</h4></div>
        <ul>
          <li>Excel analiza ingresos previstos de una campaña y añade cálculos y gráficos nuevos.</li>
          <li>Word redacta el informe de campaña a partir de esos resultados financieros.</li>
        </ul>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/empower-workforce-copilot-finance/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>

      <div class="role-card">
        <div class="role-card-top"><h4>RR. HH.</h4></div>
        <ul>
          <li>Word crea una descripción de puesto y, por separado, compara currículums con una recomendación final.</li>
          <li>Loop genera preguntas de entrevista; Outlook redacta la carta de oferta.</li>
        </ul>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/empower-workforce-copilot-hr/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>

      <div class="role-card">
        <div class="role-card-top"><h4>Operaciones</h4></div>
        <ul>
          <li>Whiteboard hace lluvia de ideas de un plan de proyecto y las prioriza.</li>
          <li>Copilot Studio crea un agente de preguntas frecuentes del propio proyecto; Loop hace seguimiento de hitos.</li>
        </ul>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/empower-workforce-copilot-operations/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>

      <div class="role-card">
        <div class="role-card-top"><h4>Legal</h4></div>
        <ul>
          <li>El agente Researcher prepara un escrito orientado a un regulador; Copilot Studio monta un asistente de consultas normativas.</li>
          <li>Excel visualiza áreas de riesgo entre departamentos; OneNote arma un cuaderno de cumplimiento.</li>
        </ul>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/empower-workforce-microsoft-365-copilot-legal-use-case/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>

      <div class="role-card">
        <div class="role-card-top"><h4>Comunicaciones</h4></div>
        <ul>
          <li>Ejercicios guiados sobre escenarios empresariales de comunicación interna y externa con Copilot en las apps de M365.</li>
        </ul>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/empower-workforce-microsoft-365-copilot-communications-use-case/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>

      <div class="role-card">
        <div class="role-card-top"><h4>Servicio al cliente</h4></div>
        <ul>
          <li>Ejercicios guiados sobre escenarios de atención y soporte al cliente con Copilot en las apps de M365.</li>
        </ul>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/empower-workforce-microsoft-365-copilot-customer-service-use-case/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>

    </div>
    <p style="font-size:13px; color:var(--text-faint); margin-top:6px;">Comunicaciones y Servicio al cliente tienen menos detalle aquí porque la documentación pública no desglosa sus ejercicios paso a paso como en los demás — entra al módulo oficial para verlos completos.</p>
  </section>

  <section class="block-section" id="bloque5">
    <span class="section-label">Bloque 5 · Nivel intermedio</span>
    <h2>Administración y despliegue</h2>
    <p class="section-intro">Ruta oficial: <a href="https://learn.microsoft.com/es-es/training/paths/prepare-your-organization-microsoft-365-copilot/" target="_blank" rel="noopener">«Preparación de la organización para Microsoft 365 Copilot»</a> — solo 2 módulos, pero son los más densos de toda la guía: aquí Microsoft deja de hablar de prompts y empieza a hablar de tu trabajo real. Nivel intermedio de verdad — da por hecho criterio de TI general.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 1 DE 2</span><h3>Implementación de Copilot para Microsoft 365</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/implement-microsoft-365-copilot/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/implement-microsoft-365-copilot/2-get-ready-microsoft-365-copilot" target="_blank" rel="noopener">Prerrequisitos</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/implement-microsoft-365-copilot/3-implement-sharepoint-advanced-management-tools" target="_blank" rel="noopener">SharePoint Advanced Mgmt</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/implement-microsoft-365-copilot/4-prepare-your-data-copilot-searches" target="_blank" rel="noopener">Preparar datos</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/implement-microsoft-365-copilot/5-protect-copilot-data-microsoft-365-azure-security" target="_blank" rel="noopener">Proteger datos</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/implement-microsoft-365-copilot/6-assign-your-microsoft-365-copilot-licenses" target="_blank" rel="noopener">Licencias</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/implement-microsoft-365-copilot/7-extend-microsoft-365-copilot" target="_blank" rel="noopener">Ampliar Copilot</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/implement-microsoft-365-copilot/8-drive-microsoft-365-copilot-adoption" target="_blank" rel="noopener">Adopción y CoE</a>
      </div>

      <div class="subhead">▸ Prerrequisitos técnicos</div>
      <div class="sub-body">
        <p>Antes de licenciar a nadie, la organización necesita:</p>
        <ul>
          <li><strong>Licencia base</strong> M365 E3/E5, A3/A5 (educación) o Business Standard/Premium — Copilot va como complemento sobre una de estas, nunca solo.</li>
          <li><strong>Cuentas Microsoft Entra</strong> — las cuentas locales heredadas no autentican contra Copilot.</li>
          <li><strong>OneDrive</strong> (1 TB recomendado por usuario), <strong>Outlook nuevo</strong> para sugerencias en correo, <strong>Teams</strong> (admite versión actual y nueva), y <strong>Loop</strong> activado en el inquilino.</li>
          <li><strong>Canal de actualización</strong>: dispositivos en Canal Actual o Canal Mensual Empresarial — canales más antiguos se quedan fuera.</li>
          <li><strong>Red</strong>: experiencias clave (Excel, Word, PowerPoint, Teams, Loop) usan WebSocket (wss://) — hay que permitir esos puntos de conexión explícitamente.</li>
        </ul>
        <p>Recomendación de Microsoft para el lanzamiento: empieza con un <strong>grupo piloto</strong> — personal de TI, asistentes administrativos y servicio al cliente suelen ser los mejores primeros testers, porque ya son usuarios intensivos de Office.</p>
      </div>

      <div class="subhead">▸ Gobernanza con SharePoint Advanced Management (SAM)</div>
      <div class="sub-body">
        <p>Copilot construye sus respuestas con LLM + contenido de Microsoft Graph + web opcional — y buena parte de ese contenido de Graph vive en SharePoint. Si SharePoint está mal gobernado, Copilot hereda ese desorden. SAM ataca tres frentes:</p>
        <ul>
          <li><strong>Expansión de contenido</strong> — sitios inactivos que solo añaden ruido. La directiva de sitios inactivos los detecta automáticamente y notifica al propietario.</li>
          <li><strong>Uso compartido excesivo</strong> — los informes de Gobernanza de Acceso a Datos detectan sitios compartidos como «Todos excepto externos» o «Cualquiera», los más arriesgados. Para frenarlo hay dos herramientas con propósitos distintos: <strong>Restricted Access Control (RAC)</strong> cambia los permisos de verdad (solo entra quien está en el grupo autorizado); <strong>Restricted Content Discoverability (RCD)</strong> no toca permisos, solo saca el contenido de los resultados de Copilot y de la búsqueda — útil cuando el acceso ya es correcto pero no quieres que aparezca solo.</li>
          <li><strong>Ciclo de vida del contenido</strong> — sitios sin propietario válido, sin revisión periódica de acceso, sin política de archivado.</li>
        </ul>
        <p>Ejemplo real de cómo se aplica una directiva de bloqueo de descarga vía PowerShell (sin tocar Acceso Condicional de Entra):</p>
        <div class="code-line">Set-SPOSite -Identity &lt;SiteURL&gt; -BlockDownloadPolicy $true</div>
      </div>

      <div class="subhead">▸ Preparar los datos</div>
      <div class="sub-body">
        <p>Misma lógica que preparar un sitio para buscador: Copilot solo es tan bueno como los datos que indexa.</p>
        <ul>
          <li>Limpieza <strong>ROT</strong> (Redundante, Obsoleto, Trivial) — fichas de producto de hace 5 años, correos de campañas caducadas, tickets ya resueltos.</li>
          <li>Taxonomía clara de carpetas/sitios, nombres de archivo estandarizados, etiquetado con metadatos, consolidar versiones (solo la final).</li>
          <li>Designar un <strong>responsable de gobernanza de datos</strong> y documentar la política formalmente: qué está restringido, quién administra, cadencia de revisión.</li>
          <li>Cadencia recomendada: auditorías mensuales de nuevos orígenes, revisión trimestral de permisos y uso compartido externo, revisión anual de políticas.</li>
        </ul>
      </div>

      <div class="subhead">▸ Proteger los datos</div>
      <div class="sub-body">
        <p>El principio rector de Microsoft aquí es <strong>«acceso suficiente»</strong>: cada usuario solo ve lo que necesita, ni una carpeta más. Las piezas que lo aplican:</p>
        <ul>
          <li><strong>Microsoft Purview Information Protection</strong> + <strong>etiquetas de confidencialidad</strong> — clasificar y, si hace falta, cifrar documentos según sensibilidad.</li>
          <li><strong>Acceso condicional de Entra</strong> — exigir MFA o dispositivo gestionado para sitios sensibles, bloquear viajes imposibles.</li>
          <li><strong>Privileged Identity Management (PIM)</strong> — acceso de administrador solo cuando se necesita, nunca permanente.</li>
          <li><strong>Conectores Graph</strong> — limitar qué orígenes externos quedan expuestos a Copilot.</li>
        </ul>
      </div>

      <div class="subhead">▸ Licencias</div>
      <div class="sub-body">
        <p>Se asignan igual que cualquier otra licencia de M365: Centro de administración → Usuarios activos → seleccionar usuario → Licencias y aplicaciones → activar Microsoft 365 Copilot → Guardar. También vía PowerShell si lo prefieres scriptado.</p>
        <p>Gestión continua: revisa periódicamente los <strong>informes de uso</strong> para detectar licencias asignadas pero inactivas y reasignarlas — Microsoft recomienda concentrar licencias en 2-3 áreas de negocio en vez de repartirlas finas por todas partes, porque el efecto de aprendizaje entre compañeros se multiplica cuando un equipo entero tiene acceso.</p>
      </div>

      <div class="subhead">▸ Ampliar Copilot (preview de Bloque 6)</div>
      <div class="sub-body">
        <p>Los agentes son una versión acotada de Copilot, expertos en una o dos tareas. Dos formas de construirlos: <strong>declarativos</strong> (conocimiento + acciones sobre el modelo base de Copilot — más simples, se integran nativo en M365) y <strong>de motor personalizado</strong> (orquestador y modelo propios, vía Copilot Studio o Azure AI — más control, más trabajo). Para conectarlos a datos externos hay dos tipos de conector con diferencias prácticas importantes: los <strong>conectores Graph</strong> replican datos de forma síncrona y cualquier licencia M365 ve los resultados en buscador; los <strong>conectores Power Platform</strong> leen/escriben en tiempo real pero algunos requieren licencia Premium aparte. El Bloque 6 entra en esto con mucho más detalle.</p>
      </div>

      <div class="subhead">▸ Adopción y Centro de Excelencia</div>
      <div class="sub-body">
        <p>Microsoft estructura la adopción en 4 fases — útil como checklist directo para tu rol:</p>
        <ul>
          <li><strong>1. Preparar</strong> — revisar seguridad/datos, decidir dónde concentrar licencias, formar un <strong>consejo de IA</strong> (equipo de habilitación TI + gestión del cambio + patrocinador ejecutivo + experto en riesgos), gestionar expectativas («el usuario lleva el volante, Copilot copilota»).</li>
          <li><strong>2. Incorporación</strong> — comunidad de usuarios (Teams + Viva Engage), identificar campeones internos, formación continua — Microsoft estima <strong>6 a 12 meses</strong> hasta que un usuario integra Copilot a fondo en su forma de trabajar.</li>
          <li><strong>3. Impacto</strong> — medir con el Panel de Copilot, reunión periódica del consejo de IA, celebrar éxitos visibles.</li>
          <li><strong>4. Ampliar</strong> — conectar Copilot a datos fuera de M365 vía agentes, automatizar flujos tediosos (gastos, onboarding), considerar agentes de rol ya empaquetados por Microsoft (Servicio, Ventas, Finanzas).</li>
        </ul>
      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 2 DE 2</span><h3>Seguridad y cumplimiento de datos en Copilot</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/examine-data-security-microsoft-365-copilot/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/examine-data-security-microsoft-365-copilot/2-examine-copilot-uses-proprietary-business-data" target="_blank" rel="noopener">Uso de datos propios</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/examine-data-security-microsoft-365-copilot/3-examine-copilot-protects-sensitive-business-data" target="_blank" rel="noopener">Protección de datos</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/examine-data-security-microsoft-365-copilot/4-examine-microsoft-365-isolation-controls" target="_blank" rel="noopener">Aislamiento</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/examine-data-security-microsoft-365-copilot/5-examine-copilot-meets-regulatory-compliance-mandates" target="_blank" rel="noopener">Cumplimiento normativo</a>
      </div>
      <p class="section-intro" style="margin-bottom:14px;">Este módulo es munición directa para conversaciones de adopción con gente desconfiada — las objeciones más típicas («¿esto entrena un modelo con nuestros datos?», «¿se mezcla con otros clientes?») tienen respuesta oficial y verificable aquí.</p>

      <div class="subhead">▸ Qué hace Copilot con tus datos propios</div>
      <div class="sub-body">
        <ul>
          <li>Las indicaciones, las respuestas y los datos de Graph a los que accede <strong>no se comparten con otros clientes</strong> y <strong>no entrenan ningún LLM</strong> — ni los modelos base de Copilot, ni otros modelos de Microsoft, ni modelos de terceros (tipo OpenAI) — salvo que el administrador del inquilino decida explícitamente compartir feedback.</li>
          <li>Solo se accede al inquilino actual: ni a otros inquilinos donde el usuario sea invitado B2B, ni a inquilinos sincronizados.</li>
          <li>Todo el procesamiento corre sobre instancias propias de <strong>Azure OpenAI</strong>, no sobre el servicio público de OpenAI.</li>
          <li>El historial de interacciones se almacena cifrado, es gestionable vía Purview/búsqueda de contenido, admite políticas de retención, y el propio usuario puede borrar su historial.</li>
          <li>Para clientes UE: el tráfico se mantiene dentro del <strong>EU Data Boundary</strong> salvo que se use grounding web (Bing), que sale del límite de cumplimiento por diseño.</li>
        </ul>
      </div>

      <div class="subhead">▸ Aislamiento entre inquilinos</div>
      <div class="sub-body">
        <p>El aislamiento es lógico, no físico — pero con controles equivalentes: autorización Entra + RBAC por inquilino, aislamiento de almacenamiento a nivel de SharePoint Online, cifrado en tránsito y en reposo (TLS, BitLocker, IPsec), y centros de datos con control de acceso biométrico. Copilot corriendo en un inquilino no puede, por diseño, ver datos de otro inquilino.</p>
      </div>

      <div class="subhead">▸ Cumplimiento normativo</div>
      <div class="sub-body">
        <p>Cuatro pilares que Microsoft documenta explícitamente: <strong>privacidad</strong> (ISO/IEC 27018), <strong>transparencia</strong> (documentación pública de capacidades y límites, el usuario siempre puede rechazar una sugerencia), <strong>equidad</strong> (testing de sesgo antes y después del lanzamiento) y <strong>responsabilidad</strong> — incluido un compromiso de cobertura legal: si a un cliente lo demandan por infracción de derechos de autor derivada de un resultado de Copilot, Microsoft asume la defensa, siempre que se hayan usado los filtros de contenido integrados.</p>
      </div>
    </article>

  </section>

  <section class="block-section" id="checklist5">
    <span class="section-label">Practica ya</span>
    <h2>Checklist de despliegue</h2>
    <p class="section-intro">No hay prompts que copiar en este bloque — esto es trabajo de administrador. Aquí va lo que de verdad puedes llevarte a una reunión de planificación de rollout.</p>
    <div class="deploy-checklist">
      <div class="deploy-phase">
        <h4>Antes de licenciar a nadie</h4>
        <ul>
          <li>Confirmar que todos los candidatos tienen licencia base elegible (E3/E5/Business Premium) + Entra ID, nada de cuentas locales</li>
          <li>Validar canal de actualización (Actual o Mensual Empresarial) en los dispositivos del piloto</li>
          <li>Confirmar que los puntos de conexión WebSocket están permitidos en la red corporativa</li>
        </ul>
      </div>
      <div class="deploy-phase">
        <h4>Gobernanza de datos</h4>
        <ul>
          <li>Ejecutar el informe de sitios inactivos y la directiva de sitios de SharePoint inactivos en modo simulación</li>
          <li>Correr los informes de Gobernanza de Acceso a Datos para detectar uso compartido «Todos excepto externos» / «Cualquiera»</li>
          <li>Decidir caso por caso: ¿RAC (restringir permisos) o RCD (ocultar de Copilot sin tocar permisos)?</li>
          <li>Limpieza ROT: agenda una auditoría de contenido antes del piloto, no después</li>
        </ul>
      </div>
      <div class="deploy-phase">
        <h4>Piloto y adopción</h4>
        <ul>
          <li>Elegir grupo piloto: TI, administrativos, servicio al cliente suelen rendir mejor como primeros testers</li>
          <li>Formar el consejo de IA: habilitación TI + gestión del cambio + patrocinador ejecutivo + riesgos</li>
          <li>Montar el canal de comunidad (Teams + Viva Engage) antes del lanzamiento amplio, no después</li>
          <li>Fijar expectativa realista: 6-12 meses para adopción madura, no resultados el día 1</li>
        </ul>
      </div>
      <div class="deploy-phase">
        <h4>Para la conversación con escépticos</h4>
        <ul>
          <li>«¿Entrena un modelo con nuestros datos?» → No, salvo opt-in explícito del admin del inquilino</li>
          <li>«¿Se mezcla con otros clientes de Microsoft?» → No, aislamiento lógico por inquilino vía Entra + RBAC</li>
          <li>«¿Y si alguien nos demanda por algo que genera?» → Cobertura legal de Microsoft si se usaron los filtros integrados</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="block-section" id="bloque6">
    <span class="section-label">Bloque 6 · Cierra la guía</span>
    <h2>Agentes y Copilot Studio</h2>
    <p class="section-intro">Ruta oficial: <a href="https://learn.microsoft.com/es-es/training/paths/explore-microsoft-365-copilot-agent-administration/" target="_blank" rel="noopener">«Exploración de Microsoft 365 Copilot y administración del agente»</a> — 3 módulos. <strong>Nota de precisión:</strong> Microsoft cataloga esta ruta como nivel «Principiante», lo cual no encaja con la profundidad real del contenido — incluye RBAC de Power Platform, gobernanza de Purview y control de versiones de agentes. Probablemente el nivel está mal etiquetado en origen; trátalo como contenido de nivel intermedio-avanzado.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 1 DE 3</span><h3>Exploración de M365 Copilot y agentes</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/explore-microsoft-365-copilot-agents/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/explore-microsoft-365-copilot-agents/3-what-are-agents" target="_blank" rel="noopener">¿Qué son los agentes?</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/explore-microsoft-365-copilot-agents/4-compare-microsoft-365-copilot-agents" target="_blank" rel="noopener">Copilot vs. agentes</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/explore-microsoft-365-copilot-agents/5-compare-microsoft-365-copilot-licensing-models" target="_blank" rel="noopener">Modelos de licencia</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/explore-microsoft-365-copilot-agents/6-plan-deploy-microsoft-365-copilot-agents" target="_blank" rel="noopener">Planear e implementar</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/explore-microsoft-365-copilot-agents/7-explore-real-world-use-cases-copilot-agents" target="_blank" rel="noopener">Casos de uso reales</a>
      </div>
      <p style="font-size:12.5px; color:var(--text-faint); margin-bottom:14px;">La unidad 2 («Introducción al portal») es el mismo contenido que la unidad 1 del Bloque 1 — se omite aquí por duplicado, como ya pasó en el Bloque 3.</p>

      <div class="subhead">▸ ¿Qué son los agentes?</div>
      <div class="sub-body">
        <p>Microsoft distingue 4 tipos:</p>
        <ul>
          <li><strong>Precompilados por Microsoft</strong> — los 4 que ya vienen integrados: <strong>Asesor de avisos</strong> (Prompt Coach, ayuda a redactar y analizar prompts), <strong>Asesor de escritura</strong> (Writing Coach, feedback sobre cualquier texto), <strong>Agente investigador</strong> (Researcher, sintetiza datos de trabajo + web en informes citados, ideal para análisis de mercado), <strong>Agente analista</strong> (Analyst, científico de datos virtual con Python — convierte hojas de cálculo en visualizaciones e insights).</li>
          <li><strong>De sitio SharePoint listos para usar</strong> — Copilot crea uno automáticamente al crear un sitio nuevo (si licencia/permisos lo permiten), con ámbito limitado solo a ese sitio.</li>
          <li><strong>De usuario empresarial diario</strong> — sin código, deliberadamente limitados (sin IA generativa), creados en Copilot Chat o SharePoint.</li>
          <li><strong>Avanzados</strong> — requieren programación, +1000 conectores, vía Copilot Studio completo o Visual Studio Code.</li>
        </ul>
        <p>Los agentes se nutren de 3 orígenes de conocimiento: <strong>contenido web</strong> (sitios de confianza), <strong>contenido SharePoint</strong> (sitios/bibliotecas concretas) y <strong>conectores Copilot</strong> (Salesforce, ServiceNow, Jira...).</p>
        <p>Caso oficial de Microsoft que ilustra bien la limitación de los agentes de sitio: un director de ventas de «Contoso Camera» pide un discurso comparando dos cámaras, pero el agente automático del sitio de marketing solo conoce ese sitio — no puede comparar con el producto anterior porque esa info vive en otro sitio. La solución no es repetir la pregunta, es crear un <strong>agente personalizado</strong> con acceso a ambos sitios. Lección práctica: el ámbito de un agente es tan amplio como las fuentes que le des, no asume nada por ti.</p>
      </div>

      <div class="subhead">▸ Copilot vs. agentes — la distinción que más se confunde</div>
      <div class="sub-body">
        <table class="prompt-table">
          <tr><th>Criterio</th><th>Copilot</th><th>Agentes</th></tr>
          <tr><td>Interacción</td><td>Tiempo real, conversacional, dentro de la app</td><td>Programados o por evento, en segundo plano</td></tr>
          <tr><td>Funcionamiento</td><td>Modelos de Microsoft + Graph, nada que compilar</td><td>Se diseñan, prueban y publican como mini-apps en Copilot Studio</td></tr>
          <tr><td>Acceso a datos</td><td>Solo lo que el usuario individual puede ver</td><td>Cuentas de servicio/identidades administradas — acceso más amplio, más responsabilidad</td></tr>
          <tr><td>Personalización</td><td>Configuración de organización, no nuevas funciones</td><td>Ciclo de vida tipo software: versionado, pruebas, rollback</td></tr>
          <tr><td>Seguridad</td><td>Hereda permisos de usuario automáticamente</td><td>Requiere aprobación, pasos de revisión humana, supervisión activa</td></tr>
        </table>
        <p><strong>Patrón híbrido habitual:</strong> un agente genera la excepción (p. ej. una factura que no cuadra), Copilot la resume para que un humano decida en segundos en lugar de minutos.</p>
        <p>Casos de uso por categoría: <strong>aceleración de trabajo de conocimiento</strong> (Copilot resume, redacta; un agente puede agregar todas las transcripciones de la semana en un backlog priorizado), <strong>automatización de procesos repetibles</strong> (facturación, aprobaciones, onboarding), <strong>supervisión de operaciones TI</strong> — ejemplo oficial: un agente que consume un webhook de PagerDuty, ejecuta un runbook de diagnóstico, aplica la corrección si es segura y conocida, o crea un incidente con contexto ya precargado si no lo es.</p>
        <div class="mini-note">Esto va a sonarte de tu mundo RPA: las <strong>limitaciones operativas</strong> que Microsoft documenta para agentes son casi calcadas a las de cualquier robot de UiPath/PAD — alucinaciones/salidas incorrectas (mitigar con pasos de aprobación humana), <strong>automatización de interfaz frágil</strong> cuando el agente imita clics en vez de usar API (la misma razón por la que en PAD siempre prefieres un conector a un selector visual), y credenciales con permisos excesivos (limitar alcance y caducidad). Las buenas prácticas de gobernanza también calcan RPA: identidades de mínimo privilegio, credenciales en Azure Key Vault, pruebas en sandbox/modo simulación antes de producción, logging centralizado en Azure Monitor o tu SIEM.</div>
      </div>

      <div class="subhead">▸ Modelos de licencia</div>
      <div class="sub-body">
        <p>3 categorías de planes: <strong>Copilot Chat gratis</strong> (IA conversacional básica, sin grounding en datos de trabajo — solo web), <strong>M365 Copilot de pago</strong> (Business hasta 300 usuarios / Enterprise sin límite, ambos con grounding en Graph), <strong>Copilot Studio</strong> (crear agentes, vía créditos de consumo o paquetes de capacidad).</p>
        <p>2 modelos de pago: <strong>mensual por usuario</strong> (predecible, riesgo de licencias infrautilizadas — auditorías trimestrales recomendadas) vs <strong>pago por uso/consumo</strong> (flexible, factura junto a Azure, riesgo de picos de coste — alertas de presupuesto recomendadas). Recomendación de Microsoft: pilota con pago por uso antes de comprometerte a licencias mensuales fijas.</p>
        <p>Implicación específica para SharePoint: como Copilot respeta los permisos existentes, licenciar a todo el mundo en modo mensual puede ampliar silenciosamente quién puede <em>consultar</em> contenido sensible si la gobernanza de acceso no está cerrada primero — otra razón para que el Bloque 5 vaya antes que este.</p>
      </div>

      <div class="subhead">▸ Planear e implementar</div>
      <div class="sub-body">
        <p>Los controles de Copilot existen en dos niveles: <strong>de todo el inquilino</strong> (simple, rápido, poco flexible) y <strong>granulares</strong> (por app, característica o grupo — admite pilotos y despliegue por fases). Ejemplo oficial: una sanitaria bloqueó Copilot a nivel de inquilino mientras cumplimiento revisaba políticas, luego abrió Excel solo a Finanzas/Operaciones vía licencias basadas en grupo, y por último pilotó resúmenes de reuniones solo con el equipo ejecutivo.</p>
        <p>Gobernanza de roles: principio de mínimo privilegio (nunca Administrador Global por defecto), <strong>PIM</strong> para elevación justo-a-tiempo en roles sensibles (p. ej. publicar agentes), y <strong>separación de tareas</strong> — quien administra la configuración de Copilot no debería ser también quien aprueba la publicación de agentes.</p>
        <p>Microsoft mantiene un <strong>sitio de adopción de Copilot</strong> con kits de bienvenida, plantillas y guías de change management — recurso útil para reutilizar en vez de construir desde cero tus propios materiales de DSI.</p>
        <div class="mini-note">⚠ <strong>Agent 365</strong> aparece en el contenido oficial como panel centralizado para administrar identidad, permisos y auditoría de todos los agentes de IA del inquilino — pero Microsoft etiqueta explícitamente esta función como <strong>en versión preliminar</strong>, con la interfaz aún cambiando. Trátalo como una promesa de hacia dónde va la plataforma, no como algo que puedas planificar como estable todavía.</div>
      </div>

      <div class="subhead">▸ Casos de uso reales — qué herramienta para qué pregunta</div>
      <div class="sub-body">
        <ul>
          <li><strong>Copilot desde la app</strong> (Word/Excel/PowerPoint) — tareas de un único flujo de trabajo: redactar, resumir, generar un gráfico puntual.</li>
          <li><strong>Copilot Chat</strong> — capa de descubrimiento entre aplicaciones: «resume todas las reuniones de esta semana sobre X», agrega Outlook+Teams+SharePoint.</li>
          <li><strong>Agente investigador</strong> — información no estructurada dispersa (incidentes pasados, contratos largos, estado de proyecto disperso en Word+Planner+Teams).</li>
          <li><strong>Agente analista</strong> — datos estructurados: limpia hojas de cálculo, detecta anomalías, conecta con Power BI sin que el usuario escriba DAX.</li>
          <li><strong>Agente de usuario diario</strong> — preguntas repetitivas de un equipo concreto («¿qué fuente usamos en las plantillas?»), sin integración de sistemas.</li>
          <li><strong>Agente de SharePoint</strong> — gobernanza de contenido: aplicar etiquetas automáticamente, navegar bibliotecas sin conocer la estructura exacta de carpetas.</li>
          <li><strong>Agente avanzado personalizado</strong> — flujo multisistema con lógica propia: aprobación de gastos de extremo a extremo, revisión automática de NDAs, orquestación de cadena de suministro.</li>
        </ul>
      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 2 DE 3</span><h3>Tareas administrativas básicas para Copilot</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/perform-admin-tasks-microsoft-365-copilot/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/perform-admin-tasks-microsoft-365-copilot/2-manage-copilot-licenses-billing" target="_blank" rel="noopener">Licencias y facturación</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/perform-admin-tasks-microsoft-365-copilot/3-monitor-adjust-copilot-usage" target="_blank" rel="noopener">Supervisar consumo</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/perform-admin-tasks-microsoft-365-copilot/4-monitor-copilot-usage-adoption" target="_blank" rel="noopener">Uso y adopción</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/perform-admin-tasks-microsoft-365-copilot/5-manage-govern-copilot-prompts" target="_blank" rel="noopener">Gobernanza de prompts</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/perform-admin-tasks-microsoft-365-copilot/6-apply-operational-best-practices" target="_blank" rel="noopener">Buenas prácticas operativas</a>
      </div>

      <div class="subhead">▸ Licencias y facturación de pago por uso</div>
      <div class="sub-body">
        <p>Asignación <strong>individual</strong> (Centro de admin → Usuarios activos → usuario → Licencias y aplicaciones) sirve para pilotos pequeños y peticiones puntuales; <strong>por grupo</strong> en Entra ID escala mejor (alta automática a nuevos miembros, baja automática al salir) pero exige mantener la pertenencia al grupo al día.</p>
        <p>Habilitar pago por uso es un proceso de <strong>2 pasos obligatorios</strong> en Facturación &amp; uso del Centro de administración — si te saltas el segundo, el servicio queda deshabilitado aunque la política exista:</p>
        <ol style="padding-left:18px; color:var(--text-dim); font-size:14px; line-height:1.7;">
          <li><strong>Directiva de facturación</strong> — vincula una suscripción de Azure, define ámbito de usuarios, presupuesto y umbrales de alerta (hasta 10 políticas por inquilino).</li>
          <li><strong>Conexión a un servicio Copilot</strong> — pestaña «Servicios de pago por uso», asocias la política al servicio concreto (Copilot Chat, agentes de SharePoint...).</li>
        </ol>
      </div>

      <div class="subhead">▸ Supervisar y ajustar el consumo</div>
      <div class="sub-body">
        <p>Dos paneles con propósitos distintos: <strong>Centro de administración M365</strong> para comprobaciones rápidas (licencias, facturas, asignaciones); <strong>Microsoft Cost Management en Azure Portal</strong> para análisis de coste profundo, filtrado por servicio, agrupación por usuario/departamento, exportación a Power BI.</p>
        <p>Patrón útil para decidir si pasar de pago por uso a licencia fija: si el consumo es <strong>estacional</strong> (Finanzas solo en cierres trimestrales) el pago por uso sigue siendo el modelo correcto; si es <strong>constante</strong> (Operaciones todos los días) probablemente sale más barato pasar a licencia mensual. Cadencia recomendada: revisión semanal rápida + análisis mensual en profundidad.</p>
      </div>

      <div class="subhead">▸ Uso y adopción</div>
      <div class="sub-body">
        <p>La métrica base es <strong>habilitado vs. activo</strong> — usuarios con licencia frente a usuarios que realmente la usaron en el periodo. Una tasa de actividad baja apunta a brecha de comunicación, problema de permisos, o desajuste entre lo que Copilot ofrece y el flujo de trabajo real del equipo.</p>
        <p><strong>Copilot Analytics</strong> (vía panel de Copilot en Viva Insights) va un nivel más allá de los contadores: resúmenes de reuniones generados, frecuencia de uso por app, plantillas de Power BI listas para adopción e impacto. Patrón clásico a vigilar — el <strong>embudo de adopción</strong>: de 500 licenciados, 300 lo probaron una vez, solo 75 son usuarios semanales habituales. Ese hueco entre «probó una vez» y «usuario frecuente» es donde más rinde la formación dirigida.</p>
        <p>Estrategias técnicas (licencias por grupo, anclar Copilot Chat en Teams, formación específica por equipo) se combinan con culturales (líderes que lo usan visiblemente en reuniones, historias concretas en vez de eslóganes genéricos).</p>
      </div>

      <div class="subhead">▸ Gobernanza de prompts</div>
      <div class="sub-body">
        <p>Los prompts se pueden guardar, compartir, programar y eliminar desde el propio panel de Copilot en cada app. Buenas prácticas: convención de nombrado por departamento («Finanzas – Informe mensual»), documentar qué espera cada prompt como entrada/salida, revisión trimestral para archivar los que ya no se usan, y nunca insertar datos sensibles directamente en el texto del prompt — mejor apuntar a una ubicación protegida por permisos.</p>
        <div class="mini-note">⚠ <strong>Incoherencia detectada en la fuente oficial:</strong> esta unidad afirma primero que «actualmente no hay ningún repositorio de prompts centralizado ni gobernanza a nivel de administrador», pero dos párrafos después describe rutas concretas del centro de administración («Configuración → Copilot → Consultas», «Directivas de solicitud de Copilot») para compartir y restringir prompts de forma centralizada. Es una contradicción dentro del propio módulo — probablemente refleja una función en despliegue progresivo que no estaba disponible en todos los inquilinos cuando se escribió. Si necesitas esto para tu rol, verifícalo directamente en tu Centro de administración antes de asumir que existe.</div>
      </div>

      <div class="subhead">▸ Buenas prácticas operativas</div>
      <div class="sub-body">
        <p>Roles con alcance acotado en vez de Administrador Global por defecto — ejemplos oficiales: un técnico junior que solo resetea contraseñas necesita rol de soporte técnico, no facturación; un responsable de departamento que solo asigna licencias necesita Administrador de licencias, no acceso global; un responsable de cumplimiento que solo revisa auditorías necesita Administrador de cumplimiento, no Administrador de seguridad.</p>
        <p>Onboarding: vincular la licencia de Copilot a la incorporación a un grupo de seguridad para que se asigne y se retire automáticamente. Solución de problemas habituales: Copilot no aparece → comprobar licencia y versión de Office actualizada; problemas de red → revisar el Panel de estado del servicio de M365.</p>
        <p>Comunicación a usuarios finales: anuncios por email con capturas reales del botón Copilot (no solo «ya está disponible»), sesiones de demo en vivo grabadas para quien no pueda asistir, documentación de autoservicio en SharePoint/wiki interno.</p>
      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 3 DE 3</span><h3>Tareas administrativas básicas para agentes</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/perform-admin-tasks-microsoft-365-copilot-agents/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/perform-admin-tasks-microsoft-365-copilot-agents/2-create-copilot-chat-agent-part-1" target="_blank" rel="noopener">Crear agente Copilot Chat</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/perform-admin-tasks-microsoft-365-copilot-agents/4-create-sharepoint-agent" target="_blank" rel="noopener">Crear agente SharePoint</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/perform-admin-tasks-microsoft-365-copilot-agents/5-test-edit-agents" target="_blank" rel="noopener">Probar y editar</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/perform-admin-tasks-microsoft-365-copilot-agents/6-manage-user-access-permissions-agents" target="_blank" rel="noopener">Acceso y permisos</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/perform-admin-tasks-microsoft-365-copilot-agents/7-examine-agent-approval-governance" target="_blank" rel="noopener">Aprobación y gobernanza</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/perform-admin-tasks-microsoft-365-copilot-agents/8-monitor-manage-agent-lifecycle" target="_blank" rel="noopener">Ciclo de vida</a>
      </div>

      <div class="subhead">▸ Crear un agente: dos herramientas distintas</div>
      <div class="sub-body">
        <p><strong>Copilot Studio</strong> tiene dos experiencias: la <strong>«lite»</strong> para usuario empresarial sin programar (pestaña <em>Describir</em>, conversacional en lenguaje natural — Copilot Studio te hace preguntas de refinamiento sobre propósito, audiencia, tono, manejo de errores; o pestaña <em>Configurar</em>, paso a paso manual) y la <strong>«completa»</strong> para desarrolladores (flujos multi-paso, conectores personalizados, gobernanza fina).</p>
        <p>La <strong>herramienta de agente en SharePoint</strong> es distinta y más limitada — formulario de 3 pestañas (Información general, Orígenes, Comportamiento), hasta 20 orígenes igual que Copilot Chat, pero con diferencias claras: sin plantillas predefinidas, máximo 3 prompts iniciales (frente a ilimitados en Copilot Chat), mensaje de bienvenida exclusivo de SharePoint, y sin intérprete de código ni generador de imágenes — esas capacidades solo existen en agentes de Copilot Studio, no en SharePoint.</p>
      </div>

      <div class="subhead">▸ Probar y editar</div>
      <div class="sub-body">
        <p>Qué probar antes de publicar: <strong>instrucciones</strong> (tono, claridad, coherencia entre preguntas reformuladas, casos límite con errores poco comunes), <strong>fuentes de conocimiento</strong> (que realmente responda con datos del knowledge base, que detecte actualizaciones recientes, referencias cruzadas entre fuentes), y si aplica, <strong>capacidades</strong> de intérprete de código/generador de imágenes con consultas simples y complejas.</p>
        <p>Editar un agente de Copilot Chat reabre Copilot Studio con los campos ya rellenos; editar uno de SharePoint reabre la herramienta nativa (el agente vive como archivo <code>.agent</code> en Activos del sitio o en la biblioteca donde se creó). Detalle a tener en cuenta: tras editar las fuentes, hay que <strong>volver a compartir</strong> el agente con el mismo grupo para que se renueve el acceso a archivos/carpetas subyacentes — y los cambios pueden tardar varios minutos en propagarse a usuarios finales.</p>
      </div>

      <div class="subhead">▸ Acceso de usuario y permisos</div>
      <div class="sub-body">
        <p>3 categorías que conviene tener clarísimas porque es la confusión más común para administradores nuevos: <strong>gratis</strong> (Copilot Chat + agentes públicos/declarativos, incluido en cualquier suscripción M365 elegible), <strong>con licencia</strong> (crear/publicar agentes de inquilino requiere licencia de usuario Copilot Studio — tener Copilot Chat NO da automáticamente derecho a esto), <strong>consumo facturado</strong> (agentes premium o de alto volumen, vía paquetes de mensajes o pago por uso de Azure).</p>
        <p>Configurar el acceso es un proceso de <strong>2 pasos en 2 portales distintos</strong>:</p>
        <ol style="padding-left:18px; color:var(--text-dim); font-size:14px; line-height:1.7;">
          <li><strong>Centro de administración M365</strong> — asignar licencia de usuario Copilot Studio (esto da el derecho a nivel de inquilino).</li>
          <li><strong>Centro de administración Power Platform</strong> — asignar un <strong>rol de entorno</strong>: Usuario básico (solo usa agentes compartidos), Creador de entorno (crea/edita), Administrador de entorno (control total). Un entorno de Power Platform es el «área de trabajo» donde vive cada agente — RR.HH., Finanzas y TI pueden tener entornos separados, sin acceso cruzado salvo permiso explícito.</li>
        </ol>
        <p>La interfaz centralizada para todo esto es el <strong>Sistema de Control de Copilot</strong> en el Centro de administración M365 — bloquear/permitir agentes, asignar por usuario o grupo, gestionar políticas de facturación, todo en un solo sitio.</p>
      </div>

      <div class="subhead">▸ Aprobación y gobernanza</div>
      <div class="sub-body">
        <p>5 tipos de agente que un administrador gestiona: personalizados, compartidos, de primera persona (Microsoft), externos (terceros), y <strong>Frontier</strong> — experimentales, requieren más supervisión por estar en fases tempranas.</p>
        <p>Proceso de aprobación en 3 fases: <strong>envío</strong> (propósito, audiencia, permisos solicitados) → <strong>revisión</strong> (admins + a veces cumplimiento) → <strong>decisión</strong> (aprobar/rechazar/devolver). Roles habilitados: Administrador de IA y Lector global — de nuevo, evita Administrador Global salvo emergencia.</p>
        <p>Control de versiones: cada actualización de un agente debe revisarse antes de desplegarse — si un agente que antes solo leía contactos ahora pide acceso completo a CRM, eso exige nueva aprobación, no autoaprobación automática. Mantén capacidad de rollback a la versión anterior.</p>
        <p>El kit de gobernanza de Power Platform es extenso: <strong>políticas de datos</strong> (qué conectores permitir/bloquear), <strong>límites de uso compartido</strong> (frenar difusión de soluciones no certificadas), <strong>Advisor</strong> (recomendaciones automáticas sobre qué agentes necesitan atención), <strong>Catalog</strong> (repositorio de conectores/plantillas certificadas reutilizables), <strong>etiquetas MIP</strong> integradas con Purview, <strong>registro de auditoría</strong> en Purview (todo prompt y acción administrativa queda trazado), y <strong>Copilot Security Checker</strong> que avisa de configuraciones de riesgo antes de publicar. Para auditar cumplimiento: Centro de administración → Microsoft Purview → Auditar → buscar «Copilot» en nombres de actividad.</p>
      </div>

      <div class="subhead">▸ Ciclo de vida del agente</div>
      <div class="sub-body">
        <p>5 fases: creación → aprobación/implementación → mantenimiento → bloqueo (oculta el agente sin borrarlo) → eliminación (lo quita del inventario; se puede recuperar si es de la tienda). Procedimiento recomendado: avisar con 30 días de antelación antes de retirar un agente en uso activo.</p>
        <p>Supervisión vía Centro de administración M365 (Informes → Copilot → pestaña Agentes: adopción, errores, permisos en uso real vs. solicitados) y Centro de administración Power Platform (tiempo medio de respuesta, tasa de abandono). Ejemplo de troubleshooting oficial: agente de compras falla al leer pedidos → comprobar estado del servicio Dynamics 365 → revisar permisos del agente sobre esa tabla → examinar logs de llamadas API por si el token de autenticación caducó → renovar.</p>
      </div>
    </article>

  </section>

  <section class="block-section" id="checklist6">
    <span class="section-label">Practica ya</span>
    <h2>Matriz de decisión: ¿qué herramienta uso?</h2>
    <p class="section-intro">La pregunta que más se repite al cerrar esta guía no es «¿cómo lo construyo?» sino «¿debería ser esto un agente o basta con Copilot?». Esta tabla, construida sobre el marco oficial del Bloque 6, te ahorra el dilema la próxima vez que alguien en DSI te traiga una idea.</p>
    <table class="prompt-table">
      <tr><th>Si la necesidad es...</th><th>Usa</th><th>Por qué</th></tr>
      <tr><td>Resumir, redactar, analizar algo puntual</td><td>Copilot in-app</td><td>Una sola sesión, controlada por el usuario, sin nada que mantener</td></tr>
      <tr><td>Buscar info dispersa entre Outlook/Teams/SharePoint</td><td>Copilot Chat</td><td>Agrega entre apps sin que tengas que construir nada</td></tr>
      <tr><td>Volumen alto de preguntas repetitivas de un equipo</td><td>Agente precompilado o de usuario diario</td><td>Sin código, mantenimiento mínimo, Microsoft o el propio equipo lo sostiene</td></tr>
      <tr><td>Gobernanza de contenido / navegación de bibliotecas SharePoint</td><td>Agente de SharePoint</td><td>Diseñado específicamente para ese ámbito, gratis, fácil de acotar</td></tr>
      <tr><td>Proceso multisistema con lógica propia (aprobaciones, ERP, NDAs)</td><td>Agente avanzado personalizado</td><td>Solo esto orquesta varios sistemas con reglas de negocio reales</td></tr>
      <tr><td class="bad">Algo que ya hace un robot RPA estable en PAD/UiPath</td><td class="bad">Nada nuevo todavía</td><td class="bad">No migres solo por moda — migra si el robot actual es frágil o el caso de uso creció</td></tr>
    </table>
  </section>

  <footer>
    <p id="foot-vigencia" style="background:rgba(255,177,61,0.1); border-left:3px solid #ffb13d; border-radius:8px; padding:12px 16px; margin-bottom:18px; color:var(--text); font-size:13.5px; line-height:1.6;"><strong style="color:#ffb13d;">⚠ Vigencia del contenido —</strong> última verificación contra fuentes oficiales: <strong>21 de junio de 2026</strong> (guía completa, 6/6 bloques). Las funciones de IA de Microsoft 365 Copilot cambian con frecuencia — Agent 365 en particular sigue en versión preliminar y puede evolucionar de forma significativa. Ante cualquier duda, confirma siempre contra el botón "Ver módulo oficial" de la sección correspondiente antes que contra esta guía.</p>
    <span class="section-label">Guía Copilot completa</span>
    <p style="color:var(--text-dim); margin:6px 0 18px;">Los 6 bloques están construidos y validados contra fuentes oficiales — esta guía de Microsoft 365 Copilot queda cerrada. El siguiente paso en Centro de Mando es el tema Power Platform, como archivo independiente (<code>centro-mando-power-platform-entrenamiento.html</code>) cuando quieras arrancarlo.</p>
    <p>Esta guía sintetiza y enlaza la documentación oficial de Microsoft Learn; no la sustituye. Todo el contenido está redactado de cero a partir de las rutas y módulos citados — usa los enlaces para verificar o profundizar en cualquier punto. Generado el 21 de junio de 2026 · <strong>v1.0</strong> · 6/6 bloques.</p>
  </footer>

</main>

<button class="top-btn" id="topBtn" aria-label="Volver arriba" title="Volver arriba">↑</button>
  </div>
</template>

<style>

  html.mod-copilot{
    --bg:#15120e;
    --bg-elev:#1c1710;
    --bg-card:#211b14;
    --bg-card-hover:#27201766;
    --border:rgba(255,157,61,0.16);
    --border-soft:rgba(255,255,255,0.07);
    --text:#f3ead9;
    --text-dim:#b3a48d;
    --text-faint:#7d7261;
    --accent:#ff9d3d;
    --accent-soft:rgba(255,157,61,0.13);
    --accent-text:#1a1208;
    --teal:#3ec9b0;
    --teal-soft:rgba(62,201,176,0.13);
    --danger:#ff6b6b;
    --radius:14px;
    --radius-sm:8px;
    --shadow:0 12px 32px -12px rgba(0,0,0,0.55);
    --maxw:980px;
    --ff-display:'Bricolage Grotesque', sans-serif;
    --ff-body:'Manrope', sans-serif;
    --ff-mono:'JetBrains Mono', monospace;
  }
  html.mod-copilot[data-theme="light"], html.mod-copilot [data-theme="light"]{
    --bg:#fbf6ee;
    --bg-elev:#f4ead9;
    --bg-card:#ffffff;
    --bg-card-hover:#fff7ea;
    --border:rgba(201,111,31,0.22);
    --border-soft:rgba(34,28,20,0.09);
    --text:#241d14;
    --text-dim:#5e5240;
    --text-faint:#8a7d68;
    --accent:#c96f1f;
    --accent-soft:rgba(201,111,31,0.10);
    --accent-text:#fff8ee;
    --teal:#16876f;
    --teal-soft:rgba(22,135,111,0.10);
    --shadow:0 12px 28px -14px rgba(60,40,10,0.18);
  }
  html.mod-copilot *{box-sizing:border-box;}
  html.mod-copilot{scroll-behavior:smooth;}
  @media (prefers-reduced-motion: reduce){ html.mod-copilot{scroll-behavior:auto;} html.mod-copilot *{animation-duration:0.01ms !important; transition-duration:0.01ms !important;} }
  html.mod-copilot body{
    margin:0; background:var(--bg); color:var(--text);
    font-family:var(--ff-body); font-size:16px; line-height:1.6;
    -webkit-font-smoothing:antialiased;
    transition:background .25s ease, color .25s ease;
  }
  html.mod-copilot h1,html.mod-copilot h2,html.mod-copilot h3,html.mod-copilot h4{ font-family:var(--ff-display); margin:0; line-height:1.15; font-weight:700; letter-spacing:-0.01em;}
  html.mod-copilot a{ color:var(--accent); text-decoration:none; }
  html.mod-copilot a:hover{ text-decoration:underline; }
  html.mod-copilot a:focus-visible, html.mod-copilot button:focus-visible{ outline:2px solid var(--teal); outline-offset:2px; border-radius:4px;}
  html.mod-copilot .wrap{ max-width:var(--maxw); margin:0 auto; padding:0 24px; }
  html.mod-copilot code, html.mod-copilot .mono{ font-family:var(--ff-mono); }

  /* Topbar */
  html.mod-copilot .topbar{ position:sticky; top:0; z-index:30; backdrop-filter:blur(10px); background:color-mix(in srgb, var(--bg) 86%, transparent); border-bottom:1px solid var(--border-soft);}
  html.mod-copilot .topbar-inner{ max-width:var(--maxw); margin:0 auto; padding:14px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px;}
  html.mod-copilot .brand{ display:flex; align-items:center; gap:10px; font-family:var(--ff-display); font-weight:700; font-size:18px;}
  html.mod-copilot .brand .badge-fam{ font-family:var(--ff-mono); font-size:10px; font-weight:600; color:var(--text-faint); border:1px solid var(--border-soft); padding:2px 7px; border-radius:99px; letter-spacing:.04em;}
  html.mod-copilot .brand .badge-ver{ font-family:var(--ff-mono); font-size:10px; font-weight:700; color:var(--teal); background:var(--teal-soft); padding:2px 7px; border-radius:99px; letter-spacing:.03em;}
  html.mod-copilot .theme-btn{ background:var(--bg-card); border:1px solid var(--border-soft); color:var(--text); width:38px; height:38px; border-radius:99px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:16px; transition:transform .15s ease, border-color .15s ease;}
  html.mod-copilot .theme-btn:hover{ border-color:var(--accent); transform:scale(1.06);}

  /* Botón volver arriba */
  html.mod-copilot .top-btn{ position:fixed; right:22px; bottom:22px; z-index:40; width:44px; height:44px; border-radius:99px; background:var(--bg-card); border:1px solid var(--border); color:var(--accent); font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:var(--shadow); opacity:0; visibility:hidden; transform:translateY(8px); transition:opacity .2s ease, transform .2s ease, border-color .15s ease;}
  html.mod-copilot .top-btn.show{ opacity:1; visibility:visible; transform:translateY(0);}
  html.mod-copilot .top-btn:hover{ border-color:var(--accent); background:var(--accent-soft);}
  @media (max-width:640px){ html.mod-copilot .top-btn{ right:14px; bottom:14px; width:40px; height:40px;} }

  /* Source strip */
  html.mod-copilot .source-strip{ background:linear-gradient(90deg, var(--accent-soft), transparent); border-bottom:1px solid var(--border-soft); font-family:var(--ff-mono); font-size:12.5px; color:var(--text-dim);}
  html.mod-copilot .source-strip .wrap{ display:flex; align-items:center; gap:8px; padding:9px 24px; flex-wrap:wrap;}
  html.mod-copilot .source-strip .wrap.vigencia{ padding-top:0; padding-bottom:9px; border-top:1px dashed var(--border-soft); margin-top:0;}
  html.mod-copilot .source-strip .pin{ color:var(--accent); }
  html.mod-copilot .source-strip .pin.warn{ color:#ffb13d; }
  html.mod-copilot .source-strip a{ color:var(--text); border-bottom:1px dotted var(--accent); }
  html.mod-copilot .source-strip a:hover{ text-decoration:none; color:var(--accent);}
  html.mod-copilot .source-strip .vig-link{ color:#ffb13d; border-bottom:1px dotted #ffb13d; font-weight:600;}
  html.mod-copilot .source-strip .vig-link:hover{ color:#ffb13d; }

  /* Block nav pills */
  html.mod-copilot .block-nav{ position:sticky; top:65px; z-index:25; background:color-mix(in srgb, var(--bg) 92%, transparent); backdrop-filter:blur(8px); border-bottom:1px solid var(--border-soft); }
  html.mod-copilot .block-nav-inner{ max-width:var(--maxw); margin:0 auto; padding:10px 24px; display:flex; gap:8px; overflow-x:auto; scrollbar-width:thin; }
  html.mod-copilot .nav-pill{ flex-shrink:0; display:inline-flex; align-items:center; gap:6px; font-family:var(--ff-mono); font-size:12px; font-weight:600; padding:7px 14px; border-radius:99px; border:1px solid var(--border-soft); color:var(--text-dim); white-space:nowrap; cursor:pointer; transition:all .15s ease; background:var(--bg-card);}
  html.mod-copilot .nav-pill .dot{ width:6px; height:6px; border-radius:50%; background:var(--text-faint); flex-shrink:0;}
  html.mod-copilot .nav-pill.available{ color:var(--text); border-color:var(--border); }
  html.mod-copilot .nav-pill.available .dot{ background:var(--teal); }
  html.mod-copilot .nav-pill.pending .dot{ background:var(--accent); opacity:.6;}
  html.mod-copilot .nav-pill.pending::after{ content:"↗"; font-size:10px; opacity:.5; margin-left:1px;}
  html.mod-copilot .nav-pill:hover{ border-color:var(--accent); color:var(--accent); text-decoration:none;}
  html.mod-copilot .nav-pill.active{ background:var(--accent-soft); border-color:var(--accent); color:var(--accent);}

  /* Hero */
  html.mod-copilot .hero{ padding:56px 0 36px; }
  html.mod-copilot .level-badge{ display:inline-flex; align-items:center; gap:8px; font-family:var(--ff-mono); font-size:12px; font-weight:600; color:var(--accent); background:var(--accent-soft); border:1px solid var(--border); padding:6px 12px; border-radius:99px; letter-spacing:.03em; margin-bottom:18px;}
  html.mod-copilot .hero h1{ font-size:clamp(34px,5.5vw,52px); margin-bottom:14px;}
  html.mod-copilot .hero h1 .accent{ color:var(--accent); }
  html.mod-copilot .hero p.lead{ font-size:18px; color:var(--text-dim); max-width:640px; margin-bottom:0;}
  html.mod-copilot .hero-meta{ display:flex; gap:28px; margin-top:28px; flex-wrap:wrap;}
  html.mod-copilot .hero-meta div{ font-family:var(--ff-mono); font-size:12px; color:var(--text-faint);}
  html.mod-copilot .hero-meta strong{ display:block; font-family:var(--ff-display); font-size:22px; color:var(--text); font-weight:700;}

  /* Section headers */
  html.mod-copilot .section-label{ font-family:var(--ff-mono); font-size:12px; font-weight:600; color:var(--teal); letter-spacing:.08em; text-transform:uppercase; margin-bottom:8px; display:block;}
  html.mod-copilot section.block-section{ padding:34px 0;}
  html.mod-copilot section.block-section h2{ font-size:clamp(24px,3.4vw,30px); margin-bottom:10px;}
  html.mod-copilot .section-intro{ color:var(--text-dim); max-width:680px; margin-bottom:28px;}

  /* Roadmap */
  html.mod-copilot .roadmap-nivel{ margin-bottom:30px;}
  html.mod-copilot .roadmap-nivel-title{ font-family:var(--ff-mono); font-size:12px; color:var(--text-faint); text-transform:uppercase; letter-spacing:.08em; margin-bottom:12px; display:flex; align-items:center; gap:10px;}
  html.mod-copilot .roadmap-nivel-title::after{ content:""; flex:1; height:1px; background:var(--border-soft);}
  html.mod-copilot .roadmap-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px;}
  html.mod-copilot .road-card{ background:var(--bg-card); border:1px solid var(--border-soft); border-radius:var(--radius); padding:18px 18px 16px; transition:border-color .15s ease, transform .15s ease;}
  html.mod-copilot .road-card.done{ border-color:var(--border); }
  html.mod-copilot .road-card:hover{ transform:translateY(-2px); border-color:var(--accent);}
  html.mod-copilot .road-card-top{ display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;}
  html.mod-copilot .road-num{ font-family:var(--ff-mono); font-size:12px; color:var(--text-faint);}
  html.mod-copilot .status-pill{ font-family:var(--ff-mono); font-size:10.5px; font-weight:600; padding:3px 9px; border-radius:99px; letter-spacing:.03em;}
  html.mod-copilot .status-pill.disponible{ background:var(--teal-soft); color:var(--teal); }
  html.mod-copilot .status-pill.pendiente{ background:var(--border-soft); color:var(--text-faint);}
  html.mod-copilot .road-card h3{ font-size:16.5px; margin-bottom:6px;}
  html.mod-copilot .road-card p{ font-size:13.5px; color:var(--text-dim); margin:0 0 12px; line-height:1.5;}
  html.mod-copilot .road-source{ font-family:var(--ff-mono); font-size:11.5px; display:flex; align-items:center; gap:6px; color:var(--text-faint);}
  html.mod-copilot .road-source a{ color:var(--text-dim);}
  html.mod-copilot .road-source a:hover{ color:var(--accent);}

  /* Module cards */
  html.mod-copilot .module-card{ background:var(--bg-card); border:1px solid var(--border-soft); border-radius:var(--radius); padding:26px 26px 24px; margin-bottom:22px; box-shadow:var(--shadow);}
  html.mod-copilot .module-head{ display:flex; align-items:flex-start; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:14px; padding-bottom:16px; border-bottom:1px solid var(--border-soft);}
  html.mod-copilot .module-num{ font-family:var(--ff-mono); font-size:12px; color:var(--accent); font-weight:600; letter-spacing:.05em; margin-bottom:4px; display:block;}
  html.mod-copilot .module-head h3{ font-size:22px; }
  html.mod-copilot .module-link{ font-family:var(--ff-mono); font-size:12.5px; white-space:nowrap; border:1px solid var(--border); padding:7px 13px; border-radius:99px; color:var(--accent); flex-shrink:0;}
  html.mod-copilot .module-link:hover{ background:var(--accent-soft); text-decoration:none;}
  html.mod-copilot .units-list{ display:flex; flex-wrap:wrap; gap:8px; margin:0 0 20px;}
  html.mod-copilot .unit-chip{ font-family:var(--ff-mono); font-size:12px; color:var(--text-dim); background:var(--bg-elev); border:1px solid var(--border-soft); padding:6px 11px; border-radius:8px; transition:border-color .15s, color .15s;}
  html.mod-copilot .unit-chip:hover{ border-color:var(--teal); color:var(--teal); text-decoration:none;}
  html.mod-copilot .synth-label{ font-family:var(--ff-mono); font-size:11.5px; font-weight:600; color:var(--teal); text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; display:block;}
  html.mod-copilot .module-card .synth p{ margin:0 0 12px; color:var(--text); font-size:15px;}
  html.mod-copilot .module-card .synth p:last-child{ margin-bottom:0;}
  html.mod-copilot .module-card .synth strong{ color:var(--text); font-weight:700;}
  html.mod-copilot .mini-list{ margin:0 0 14px; padding-left:20px; color:var(--text);}
  html.mod-copilot .mini-list li{ margin-bottom:7px; font-size:15px;}

  html.mod-copilot .callout{ background:var(--teal-soft); border:1px solid rgba(62,201,176,0.3); border-left:3px solid var(--teal); border-radius:var(--radius-sm); padding:14px 18px; margin:16px 0; font-size:14.5px;}
  html.mod-copilot .callout strong{ color:var(--teal); display:block; font-family:var(--ff-mono); font-size:11.5px; text-transform:uppercase; letter-spacing:.05em; margin-bottom:6px;}
  html.mod-copilot .callout.novedad{ background:var(--accent-soft); border-color:rgba(255,157,61,0.35); border-left-color:var(--accent);}
  html.mod-copilot .callout.novedad strong{ color:var(--accent); }

  html.mod-copilot table.prompt-table{ width:100%; border-collapse:collapse; margin:14px 0 18px; font-size:14px;}
  html.mod-copilot table.prompt-table th, html.mod-copilot table.prompt-table td{ text-align:left; padding:10px 12px; border-bottom:1px solid var(--border-soft); vertical-align:top;}
  html.mod-copilot table.prompt-table th{ font-family:var(--ff-mono); font-size:11px; text-transform:uppercase; letter-spacing:.04em; color:var(--text-faint); font-weight:600;}
  html.mod-copilot table.prompt-table td.bad{ color:var(--text-faint); font-style:italic;}

  /* Framework box (Bloque 2) */
  html.mod-copilot .framework-box{ background:var(--bg-card); border:1px solid var(--border); border-left:3px solid var(--accent); border-radius:var(--radius); padding:26px 26px 22px; margin-bottom:28px;}
  html.mod-copilot .framework-box h3{ font-size:19px; margin-bottom:8px;}
  html.mod-copilot .framework-box > p{ color:var(--text-dim); font-size:14.5px; margin-bottom:18px;}
  html.mod-copilot .fw-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:12px; margin-bottom:20px;}
  html.mod-copilot .fw-item{ background:var(--bg-elev); border:1px solid var(--border-soft); border-radius:var(--radius-sm); padding:13px 15px;}
  html.mod-copilot .fw-item .fw-num{ font-family:var(--ff-mono); font-size:11px; color:var(--accent); font-weight:700; letter-spacing:.05em;}
  html.mod-copilot .fw-item strong{ display:block; font-size:14.5px; margin:3px 0 4px;}
  html.mod-copilot .fw-item span{ font-size:12.5px; color:var(--text-faint); line-height:1.4;}
  html.mod-copilot .evolution-label{ font-family:var(--ff-mono); font-size:11.5px; font-weight:600; color:var(--accent); text-transform:uppercase; letter-spacing:.06em; margin:4px 0 8px; display:block;}
  html.mod-copilot .final-prompt{ background:var(--accent-soft); border:1px solid rgba(255,157,61,0.3); border-radius:var(--radius-sm); padding:12px 16px; font-size:14.5px; margin-top:4px;}
  html.mod-copilot .final-prompt b{ color:var(--accent); font-family:var(--ff-mono); font-size:11px; text-transform:uppercase; letter-spacing:.05em; display:block; margin-bottom:5px;}

  /* Role grid (Bloque 4) */
  html.mod-copilot .role-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; margin-bottom:8px;}
  html.mod-copilot .role-card{ background:var(--bg-card); border:1px solid var(--border-soft); border-radius:var(--radius); padding:18px 20px; transition:border-color .15s, transform .15s;}
  html.mod-copilot .role-card:hover{ border-color:var(--accent); transform:translateY(-2px);}
  html.mod-copilot .role-card.highlight{ border-color:var(--accent); background:linear-gradient(160deg, var(--accent-soft), var(--bg-card) 60%);}
  html.mod-copilot .role-card-top{ display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;}
  html.mod-copilot .role-card h4{ font-size:16px; margin:0;}
  html.mod-copilot .role-tag{ font-family:var(--ff-mono); font-size:10px; font-weight:700; color:var(--accent); background:var(--accent-soft); padding:2px 8px; border-radius:99px; letter-spacing:.04em;}
  html.mod-copilot .role-card ul{ margin:0 0 12px; padding-left:18px; font-size:13.5px; color:var(--text-dim); line-height:1.5;}
  html.mod-copilot .role-card ul li{ margin-bottom:4px;}
  html.mod-copilot .role-card a.module-link{ font-size:11.5px; padding:5px 11px;}

  /* Bloque 5: subsecciones técnicas */
  html.mod-copilot .subhead{ font-family:var(--ff-mono); font-size:12px; font-weight:700; color:var(--teal); text-transform:uppercase; letter-spacing:.05em; margin:20px 0 8px; display:flex; align-items:center; gap:8px;}
  html.mod-copilot .subhead:first-of-type{ margin-top:6px;}
  html.mod-copilot .sub-body{ font-size:14px; color:var(--text-dim); line-height:1.6;}
  html.mod-copilot .sub-body ul{ margin:6px 0 10px; padding-left:18px;}
  html.mod-copilot .sub-body li{ margin-bottom:5px;}
  html.mod-copilot .code-line{ font-family:var(--ff-mono); font-size:12.5px; background:var(--bg-elev); border:1px solid var(--border-soft); border-radius:6px; padding:9px 13px; margin:8px 0; color:var(--teal); overflow-x:auto; white-space:pre;}
  html.mod-copilot .mini-note{ background:var(--teal-soft); border-left:3px solid var(--teal); border-radius:6px; padding:9px 13px; font-size:13px; margin:8px 0;}

  /* Checklist de despliegue */
  html.mod-copilot .deploy-checklist{ display:grid; gap:14px;}
  html.mod-copilot .deploy-phase{ background:var(--bg-card); border:1px solid var(--border-soft); border-radius:var(--radius); padding:16px 20px;}
  html.mod-copilot .deploy-phase h4{ font-size:14.5px; color:var(--accent); margin:0 0 10px; font-family:var(--ff-mono); text-transform:uppercase; letter-spacing:.04em;}
  html.mod-copilot .deploy-phase ul{ list-style:none; margin:0; padding:0; display:grid; gap:7px;}
  html.mod-copilot .deploy-phase li{ font-size:13.5px; color:var(--text-dim); padding-left:24px; position:relative; line-height:1.5;}
  html.mod-copilot .deploy-phase li::before{ content:"☐"; position:absolute; left:0; color:var(--accent); font-size:14px;}

  /* Practice */
  html.mod-copilot .practice-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; margin-top:22px;}
  html.mod-copilot .prompt-card{ background:var(--bg-card); border:1px solid var(--border-soft); border-radius:var(--radius); padding:18px; display:flex; flex-direction:column; gap:10px;}
  html.mod-copilot .prompt-app{ font-family:var(--ff-mono); font-size:11px; color:var(--accent); font-weight:600; text-transform:uppercase; letter-spacing:.05em;}
  html.mod-copilot .prompt-text{ font-size:14.5px; color:var(--text); flex:1; line-height:1.55;}
  html.mod-copilot .copy-btn{ align-self:flex-start; font-family:var(--ff-mono); font-size:11.5px; background:var(--bg-elev); color:var(--text-dim); border:1px solid var(--border-soft); padding:6px 12px; border-radius:8px; cursor:pointer; transition:all .15s ease;}
  html.mod-copilot .copy-btn:hover{ border-color:var(--teal); color:var(--teal);}
  html.mod-copilot .copy-btn.copied{ border-color:var(--teal); color:var(--teal); background:var(--teal-soft);}

  /* Footer */
  html.mod-copilot footer{ border-top:1px solid var(--border-soft); margin-top:50px; padding:32px 0 50px;}
  html.mod-copilot footer p{ color:var(--text-faint); font-size:13px; max-width:640px;}

  @media (max-width:640px){
    html.mod-copilot .hero{ padding:40px 0 24px;}
    html.mod-copilot .module-card{ padding:20px 18px;}
    html.mod-copilot .hero-meta{ gap:18px;}
  }

</style>
