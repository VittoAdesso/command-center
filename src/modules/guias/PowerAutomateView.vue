<script setup>
import { ref } from 'vue'
import { useGuiaViva } from '../../composables/useGuiaViva'

const rootRef = ref(null)

useGuiaViva(rootRef, {
  title: "Centro de Mando · Power Automate — Guía viva",
  scopeClass: "mod-power-automate",
  themeStorageKey: "cm-theme",
  blocks: ["bloque1","bloque2","bloque3","bloque4"],
  spyMode: "exclusive",
  enableCopyBtns: false,
})
</script>

<template>
  <div ref="rootRef">
<div class="topbar">
  <div class="topbar-inner">
    <div class="brand">📡 Centro de Mando <span class="badge-fam">POWER AUTOMATE · GUÍA VIVA</span><span class="badge-ver badge-ver--wip" title="Versión del archivo">v0.1 · en construcción</span></div>
    <button class="theme-btn" id="themeToggle" aria-label="Cambiar tema" title="Cambiar tema claro/oscuro">🌙</button>
  </div>
</div>

<div class="source-strip">
  <div class="wrap">
    <span class="pin">📍</span>
    <span>Fuentes oficiales:</span>
    <a href="https://learn.microsoft.com/es-es/training/paths/demonstrate-capabilities-microsoft-power-automate/" target="_blank" rel="noopener">Ruta PL-900 Power Automate</a>
    <span style="color:var(--text-faint)">·</span>
    <a href="https://learn.microsoft.com/es-es/training/paths/pad-get-started/" target="_blank" rel="noopener">Get started with PAD</a>
    <span style="color:var(--text-faint)">— bloques 3 y 4 amplían con conocimiento de CoE y patrones de producción.</span>
  </div>
  <div class="wrap vigencia">
    <span class="pin warn">⚠</span>
    <span>Power Automate evoluciona rápido — confirma siempre contra los enlaces de módulo oficial antes que contra esta guía.</span>
  </div>
</div>

<nav class="block-nav" aria-label="Bloques de la guía">
  <div class="block-nav-inner">
    <a class="nav-pill available" href="#bloque1"><span class="dot"></span>1 · Fundamentos</a>
    <a class="nav-pill available" href="#bloque2"><span class="dot"></span>2 · Cloud Flows</a>
    <a class="nav-pill available" href="#bloque3"><span class="dot"></span>3 · PAD / RPA</a>
    <a class="nav-pill available" href="#bloque4"><span class="dot"></span>4 · Referencia CoE</a>
  </div>
</nav>

<button class="top-btn" id="topBtn" aria-label="Volver arriba">↑</button>

<div class="wrap">

  <div class="hero">
    <span class="level-badge">● GUÍA COMPLETA · 4/4 BLOQUES</span>
    <h1>Power <span class="accent">Automate</span>,<br>de los flows a la RPA.</h1>
    <p class="lead">Guía de consulta construida sobre las rutas oficiales de Microsoft Learn y enriquecida con conocimiento de CoE: Cloud Flows, Power Automate Desktop (PAD), patrones de producción y migración UiPath→PAD.</p>
    <div class="hero-meta">
      <div><strong>4</strong>bloques</div>
      <div><strong>Cloud + PAD</strong>cobertura completa</div>
      <div><strong>CoE-ready</strong>referencia práctica</div>
    </div>
  </div>

  <!-- MAPA DE BLOQUES -->
  <div style="padding:0 0 34px;">
    <span class="section-label">Mapa de la guía</span>
    <h2 style="margin-bottom:10px;">4 bloques — de lo conceptual a lo operativo</h2>
    <p class="section-intro">Bloques 1 y 2 siguen las rutas oficiales PL-900. Bloque 3 profundiza en PAD/RPA con material adicional de producción. Bloque 4 es referencia práctica para el CoE: patrones, migración, checklist.</p>
    <div class="roadmap-grid">
      <div class="road-card done">
        <div class="road-card-top"><span class="road-num">BLOQUE 1</span><span class="status-pill disponible">● Disponible</span></div>
        <h3>Fundamentos</h3>
        <p>Qué es Power Automate, tipos de flujo (cloud/desktop/BPF), Process Mining y cuándo usar cada modo.</p>
        <div class="road-source">🔗 <a href="https://learn.microsoft.com/es-es/training/modules/identify-microsoft-power-automate-components/" target="_blank" rel="noopener">Identificar componentes · módulo PL-900</a></div>
      </div>
      <div class="road-card done">
        <div class="road-card-top"><span class="road-num">BLOQUE 2</span><span class="status-pill disponible">● Disponible</span></div>
        <h3>Cloud Flows</h3>
        <p>Triggers, acciones, conectores, lógica de flujo, aprobaciones y Copilot para crear y describir flows.</p>
        <div class="road-source">🔗 <a href="https://learn.microsoft.com/es-es/training/modules/build-microsoft-power-automate-flow/" target="_blank" rel="noopener">Crear un flujo · módulo PL-900</a></div>
      </div>
      <div class="road-card done">
        <div class="road-card-top"><span class="road-num">BLOQUE 3</span><span class="status-pill disponible">● Disponible</span></div>
        <h3>PAD / RPA</h3>
        <p>Estructura de flows, categorías de acciones, variables, UI elements, subflows, manejo de errores y debugging.</p>
        <div class="road-source">🔗 <a href="https://learn.microsoft.com/es-es/training/paths/pad-get-started/" target="_blank" rel="noopener">Get started with PAD + ruta avanzada</a></div>
      </div>
      <div class="road-card done">
        <div class="road-card-top"><span class="road-num">BLOQUE 4</span><span class="status-pill disponible">● Disponible</span></div>
        <h3>Referencia CoE</h3>
        <p>Patrones de robustez, logging, credenciales, colas, selectores robustos, migración UiPath→PAD y checklist de producción.</p>
        <div class="road-source">🔗 Conocimiento de CoE + patrones de producción</div>
      </div>
    </div>
  </div>

  <!-- ==================== BLOQUE 1 ==================== -->
  <section class="block-section" id="bloque1">
    <span class="section-label">Bloque 1 · Fundamentos</span>
    <h2>Qué es Power Automate y cómo orientarse</h2>
    <p class="section-intro">Ruta oficial: <a href="https://learn.microsoft.com/es-es/training/modules/identify-microsoft-power-automate-components/" target="_blank" rel="noopener">«Identificar los componentes de Microsoft Power Automate»</a> (módulo PL-900). El mapa conceptual antes de ir a lo práctico.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO BASE</span><h3>Visión general: tipos de flujo y cuándo usarlos</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/identify-microsoft-power-automate-components/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/2-describe-process-mining" target="_blank" rel="noopener">2 · Process Mining</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/3-describe-use-cases-cloud-desktop-flows" target="_blank" rel="noopener">3 · Cloud vs Desktop flows</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/4-describe-use-cases-cloud-flow-templates" target="_blank" rel="noopener">4 · Plantillas de cloud flow</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/8-describe-power-automate-apps" target="_blank" rel="noopener">8 · Apps de Power Automate</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Los tres modos de Power Automate</p>
        <div class="sub-body">
          <p>Power Automate no es una sola herramienta sino tres modos con propósitos distintos:</p>
          <table class="prompt-table">
            <tr><th>Modo</th><th>Qué automatiza</th><th>Cuándo usarlo</th></tr>
            <tr><td><strong>Cloud Flows</strong></td><td>Procesos entre servicios en la nube (Outlook, SharePoint, Teams, Dataverse, APIs…)</td><td>Integrar sistemas conectados a internet, notificaciones, aprobaciones, procesamiento de datos</td></tr>
            <tr><td><strong>Desktop Flows (PAD)</strong></td><td>Tareas en el escritorio local: apps heredadas, navegadores, Excel, entrada de datos por UI</td><td>Sistemas sin API, apps legacy, procesos que requieren interacción con la interfaz de usuario</td></tr>
            <tr><td><strong>Business Process Flows</strong></td><td>Guías paso a paso para usuarios dentro de apps basadas en modelo (Dataverse)</td><td>Estandarizar un proceso de negocio que requiere pasos humanos secuenciales</td></tr>
          </table>
          <p>La combinación más potente en un CoE: un Cloud Flow que actúa como orquestador (recibe el trigger, gestiona la cola, envía notificaciones) y llama a un Desktop Flow que ejecuta la parte de automatización de escritorio.</p>
        </div>

        <p class="subhead">▸ Los tres tipos de Cloud Flow</p>
        <div class="sub-body">
          <ul>
            <li><strong>Automatizado:</strong> se dispara por un evento externo (nuevo email, nuevo ítem en lista de SharePoint, nuevo formulario enviado). El más habitual en CoE.</li>
            <li><strong>Instantáneo:</strong> se lanza manualmente — botón en la app móvil, en Teams o desde Power Apps. Útil para acciones on-demand que un usuario activa.</li>
            <li><strong>Programado:</strong> corre en un intervalo fijo (cada hora, cada día a las 8:00, el primer día del mes). Ideal para informes periódicos, sincronizaciones nocturnas.</li>
          </ul>
        </div>

        <p class="subhead">▸ Process Mining: antes de automatizar, entender el proceso real</p>
        <div class="sub-body">
          <p>Process Mining analiza datos de registros de sistemas (logs de ERP, CRM, SharePoint…) para visualizar cómo se ejecuta realmente un proceso en la organización — no cómo se supone que debería ejecutarse. Identifica variantes del proceso, cuellos de botella, retrabajos y pasos que nunca terminan a tiempo. El resultado es un mapa del proceso real que ayuda a decidir qué automatizar primero (mayor impacto, menor riesgo) y a diseñar la automatización sobre la realidad y no sobre el flujo ideal del papel.</p>
          <div class="mini-note">En el contexto del CoE de IMA: útil antes de empezar un proyecto de automatización para justificar el ROI con datos reales del proceso existente, no con estimaciones.</div>
        </div>

        <p class="subhead">▸ Plantillas: punto de partida, no solución completa</p>
        <div class="sub-body">
          <p>Power Automate incluye cientos de plantillas predefinidas (filtrable por conector, caso de uso o sector). Son útiles como punto de partida para entender la lógica de un tipo de flow, pero rara vez se usan directamente en producción sin ajustes — los conectores predeterminados, los campos de datos y los umbrales de condición siempre necesitan adaptarse al entorno concreto. En CoE: úsalas para aprender patrones, no como soluciones llave en mano.</p>
        </div>

      </div>
    </article>
  </section>

  <!-- ==================== BLOQUE 2 ==================== -->
  <section class="block-section" id="bloque2">
    <span class="section-label">Bloque 2 · Cloud Flows</span>
    <h2>Cloud Flows: triggers, acciones y aprobaciones</h2>
    <p class="section-intro">Fuentes: <a href="https://learn.microsoft.com/es-es/training/modules/identify-microsoft-power-automate-components/" target="_blank" rel="noopener">Módulo 1</a> (unidades 5-7) y <a href="https://learn.microsoft.com/es-es/training/modules/build-microsoft-power-automate-flow/" target="_blank" rel="noopener">Módulo 2</a> de la ruta PL-900 de Power Automate.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">CLOUD FLOWS · CONCEPTOS</span><h3>Triggers, acciones, conectores y lógica</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/identify-microsoft-power-automate-components/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/5-describe-how-power-automate-cloud-flows-use-connector-triggers-actions" target="_blank" rel="noopener">5 · Triggers y acciones</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/6-describe-loops-branching-cloud-flows" target="_blank" rel="noopener">6 · Loops y branching</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/7-describe-power-automate-use-cases-approvals" target="_blank" rel="noopener">7 · Aprobaciones</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Triggers, acciones y conectores — cómo encajan</p>
        <div class="sub-body">
          <p>Todo flow de nube tiene exactamente <strong>un trigger</strong> (el evento que lo inicia) y una o más <strong>acciones</strong> (lo que ocurre después). Los conectores son los puentes entre Power Automate y los sistemas externos — cada conector expone sus propios triggers y acciones. Ejemplo: el conector de SharePoint expone el trigger "Cuando se crea un elemento" y la acción "Actualizar elemento"; el conector de Teams expone "Publicar un mensaje", etc.</p>
          <table class="prompt-table">
            <tr><th>Tipo de trigger</th><th>Descripción</th><th>Ejemplo</th></tr>
            <tr><td>Automatizado</td><td>Evento en un sistema externo lo dispara</td><td>Nuevo email en Outlook → guardar adjunto en OneDrive</td></tr>
            <tr><td>Instantáneo/Manual</td><td>El usuario lo activa con un botón</td><td>Botón en Teams → crear tarea en Planner</td></tr>
            <tr><td>Programado</td><td>Se ejecuta a intervalos fijos</td><td>Cada lunes a las 8:00 → enviar informe semanal</td></tr>
          </table>
          <p>Las <strong>acciones</strong> se ejecutan en secuencia — cada acción puede usar la salida de la anterior como entrada. Tipos principales: operaciones de datos (filtrar, formatear, parsear JSON), acciones por conector (enviar email, crear carpeta, actualizar registro), acciones de control (condiciones, bucles, ramas paralelas) y acciones personalizadas (llamadas HTTP a APIs).</p>
        </div>

        <p class="subhead">▸ Controles: el inventario completo</p>
        <div class="sub-body">
          <p>Los controles son acciones especiales que gestionan la lógica del flow — cuándo ejecutar algo, cuántas veces, y qué hacer si algo falla.</p>
          <p><strong>Bucles (repetición):</strong></p>
          <ul>
            <li><strong>Apply to each:</strong> itera sobre cada elemento de una colección (lista, array, resultados de una consulta). Cada iteración ejecuta el bloque interior. Ejemplo: para cada respuesta de un Forms, enviar un email personalizado. Admite ejecución en paralelo (configurando la concurrencia) para procesar varios elementos simultáneamente.</li>
            <li><strong>Do until:</strong> repite un bloque hasta que una condición se cumpla, o hasta alcanzar el límite de iteraciones (por defecto 60, configurable). Útil para reintentar una operación o esperar a que un estado cambie. Siempre configurar un timeout para evitar bucles infinitos.</li>
          </ul>
          <p><strong>Ramas (decisión):</strong></p>
          <ul>
            <li><strong>Condition:</strong> evalúa una condición booleana y bifurca en rama "Sí" y rama "No". Pueden anidarse, aunque más de 3 niveles de anidamiento suele señalar que un Switch sería más limpio.</li>
            <li><strong>Switch:</strong> evalúa una sola expresión contra múltiples casos — cada caso puede tener su bloque de acciones. Equivale a un switch/case. Mucho más legible que apilar Conditions cuando hay 3+ posibles valores.</li>
            <li><strong>Parallel branch:</strong> ejecuta varias ramas de acciones simultáneamente — útil cuando pasos independientes no necesitan esperar el resultado del anterior. Ejemplo: al crearse un proyecto, una rama notifica en Teams y otra actualiza el registro en SharePoint a la vez, reduciendo el tiempo total del flow.</li>
          </ul>
          <p><strong>Gestión de errores:</strong></p>
          <ul>
            <li><strong>Scope:</strong> agrupa acciones en un bloque con nombre. Permite configurar "Ejecutar después" en las acciones siguientes al Scope para que se ejecuten incluso si el Scope falló — la base del patrón try-catch en cloud flows.</li>
            <li><strong>Ejecutar después (Run after):</strong> en cada acción se puede configurar cuándo debe ejecutarse respecto a la acción anterior: solo si la anterior tuvo éxito (por defecto), también si falló, si se omitió, o si se agotó el tiempo. Permite construir ramas de recuperación de errores sin detener el flow.</li>
          </ul>
          <div class="mini-note">Patrón recomendado para manejo de errores en cloud flows: <code>Scope (acciones principales)</code> → <code>Scope de errores</code> configurado con "Ejecutar después → ha fallado" → dentro: registrar el error con <code>outputs('NombreScope')?['body']</code> y enviar notificación.</div>
        </div>

        <p class="subhead">▸ Aprobaciones: los 4 tipos</p>
        <div class="sub-body">
          <p>Power Automate tiene acciones de aprobación nativas que envían la solicitud a los aprobadores y esperan su respuesta antes de continuar el flow. Los aprobadores pueden responder desde Outlook, Teams, la app móvil de Power Automate o SharePoint.</p>
          <table class="prompt-table">
            <tr><th>Tipo</th><th>Comportamiento</th><th>Cuándo usar</th></tr>
            <tr><td>Todos deben aprobar</td><td>Requiere aprobación unánime. Un rechazo cancela todo.</td><td>Revisiones de cumplimiento, documentos legales</td></tr>
            <tr><td>Primero en responder</td><td>El primer aprobador que actúa cierra el proceso.</td><td>Decisiones urgentes donde cualquier aprobador es suficiente</td></tr>
            <tr><td>Respuestas personalizadas</td><td>Opciones más allá de Aprobar/Rechazar (p.ej. "Necesito más info").</td><td>Cuando el flujo tiene más de dos caminos posibles</td></tr>
            <tr><td>Esperar todas las respuestas</td><td>Recoge feedback de todos pero no requiere unanimidad.</td><td>Comités donde importa el voto de todos pero no es bloqueante</td></tr>
          </table>
          <div class="mini-note">Patrón habitual en CoE: "Crear aprobación" + "Esperar aprobación" (permite cancelar si cambia algo) vs. "Iniciar y esperar aprobación" (más simple, sin posibilidad de cancelación en vuelo).</div>
        </div>

      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">CLOUD FLOWS · CONSTRUIR</span><h3>Crear, probar, monitorizar y compartir flows</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/build-microsoft-power-automate-flow/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-microsoft-power-automate-flow/3-create-modify-cloud-flows-use-copilot-power-automate" target="_blank" rel="noopener">3 · Crear con Copilot</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-microsoft-power-automate-flow/5-test-cloud-flow" target="_blank" rel="noopener">5 · Probar</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-microsoft-power-automate-flow/6-run-monitor-cloud-flows" target="_blank" rel="noopener">6 · Monitorizar</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-microsoft-power-automate-flow/7-share-cloud-flow" target="_blank" rel="noopener">7 · Compartir</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-microsoft-power-automate-flow/8-describe-existing-cloud-flow-use-copilot" target="_blank" rel="noopener">8 · Copilot explica el flow</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-microsoft-power-automate-flow/9-build-basic-desktop-flow-use-record-copilot" target="_blank" rel="noopener">9 · Record with Copilot (Desktop)</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Copilot para crear y modificar flows</p>
        <div class="sub-body">
          <p>Desde la página principal de Power Automate, la caja de Copilot permite describir el flow en lenguaje natural ("cuando alguien envía un formulario de Microsoft Forms, guarda las respuestas en una lista de SharePoint y notifica al responsable en Teams") y Copilot genera el flow. Se puede refinar iterativamente en el mismo diálogo. Copilot también puede <strong>describir un flow existente</strong> en lenguaje natural — útil para documentar flujos heredados o para que un nuevo miembro del equipo entienda un flow complejo rápidamente.</p>
        </div>

        <p class="subhead">▸ Probar, monitorizar y gestionar errores</p>
        <div class="sub-body">
          <p><strong>Probar:</strong> el botón "Probar" permite ejecutar el flow con un trigger real o con una ejecución anterior (re-ejecutar con los mismos datos). El historial de ejecuciones muestra cada paso con su entrada, salida y estado — verde (éxito), rojo (fallo).</p>
          <p><strong>Monitorizar:</strong> el historial de ejecuciones de cada flow (accesible desde la página del flow) muestra fecha, duración y estado de cada ejecución. Se puede filtrar por estado (fallido, correcto) y ver el detalle de cada paso. Para monitorización a escala, el Centro de administración de Power Platform tiene métricas de todos los flows del entorno.</p>
          <p><strong>Gestión de errores en flows de nube:</strong> configurar el comportamiento "Ejecutar después" en acciones para que las acciones de logging/notificación corran incluso si el paso anterior falló. Un Scope con "Run after failed/skipped" es el patrón recomendado para manejar fallos y enviar alertas sin que el flow se detenga silenciosamente.</p>
        </div>

        <p class="subhead">▸ Compartir flows</p>
        <div class="sub-body">
          <p>Los flows de nube se pueden compartir con otros usuarios o con grupos de seguridad como <strong>co-propietarios</strong> (pueden editar y administrar) o como <strong>usuarios de solo ejecución</strong> (pueden ejecutarlo pero no modificarlo). Los flows con conexiones a servicios (Outlook, SharePoint…) requieren que los usuarios de solo ejecución aporten sus propias conexiones o que el propietario las comparta. Para flows críticos de CoE, se recomienda asociar el flow a una cuenta de servicio compartida, no a la cuenta personal de quien lo creó — evita que el flow falle si esa persona abandona la organización.</p>
        </div>

        <p class="subhead">▸ Record with Copilot — gateway a PAD desde el cloud</p>
        <div class="sub-body">
          <p>Desde un cloud flow, se puede invocar un Desktop Flow (PAD). "Record with Copilot" es la función que permite grabar una tarea de escritorio y Copilot genera automáticamente el Desktop Flow correspondiente. Es el puente entre el mundo cloud y el mundo RPA: el cloud flow actúa de orquestador y el desktop flow ejecuta la parte que requiere interacción local con la UI.</p>
        </div>

      </div>
    </article>
  </section>

  <!-- ==================== BLOQUE 3 ==================== -->
  <section class="block-section" id="bloque3">
    <span class="section-label">Bloque 3 · PAD / RPA</span>
    <h2>Power Automate Desktop en profundidad</h2>
    <p class="section-intro">El bloque más denso. Cubre tanto los conceptos oficiales como el conocimiento práctico necesario para construir flows robustos en producción. Fuentes: <a href="https://learn.microsoft.com/es-es/training/paths/pad-get-started/" target="_blank" rel="noopener">ruta oficial PAD</a> + experiencia de CoE.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">PAD · ARQUITECTURA Y ACCIONES</span><h3>Estructura de un flow y categorías de acciones</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/paths/pad-get-started/" target="_blank" rel="noopener">Ver ruta oficial PAD ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/9-describe-actions-power-automate-desktop-flows" target="_blank" rel="noopener">Tipos de acciones PAD (PL-900)</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/paths/desktop-flows-robotic-process-automation-power-automate/" target="_blank" rel="noopener">Desktop flows + RPA (ruta avanzada)</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Estructura de un flow de PAD</p>
        <div class="sub-body">
          <p>Un flow de PAD es una secuencia de <strong>acciones</strong> que se ejecutan de arriba abajo, con estructuras de control (<code>If/Else</code>, <code>Loop</code>, <code>For each</code>, <code>While</code>) que pueden anidarse. A diferencia de UiPath, no hay distinción visual entre Sequence/Flowchart/State Machine — todo es una lista de acciones con bloques anidados, similar a un script.</p>
          <p>Buenas prácticas de estructura: usar comentarios y renombrar los bloques <code>If</code>/<code>Loop</code> con descripciones descriptivas para marcar secciones del flow. Agrupar acciones relacionadas dentro de bloques aunque no sean estrictamente necesarios, solo para organización visual.</p>
        </div>

        <p class="subhead">▸ Controles en PAD — detalle</p>
        <div class="sub-body">
          <p><strong>Condicionales:</strong></p>
          <ul>
            <li><strong>If / Else if / Else:</strong> evaluación booleana clásica. Permite anidar múltiples ramas. El bloque completo termina con <code>End if</code>.</li>
            <li><strong>Switch:</strong> evalúa una variable contra múltiples valores (<code>Case</code>) con un bloque por caso. Más legible que If/Else cuando hay 3+ valores posibles.</li>
          </ul>
          <p><strong>Bucles:</strong></p>
          <ul>
            <li><strong>For each:</strong> itera sobre cada elemento de una lista o datatable. Variable de iteración accesible dentro del bloque como <code>%ElementoActual%</code>. Cierra con <code>End for each</code>.</li>
            <li><strong>Loop (contador):</strong> repite N veces con un contador automático. Útil cuando se sabe el número de iteraciones de antemano.</li>
            <li><strong>While:</strong> repite mientras una condición sea verdadera. Siempre incluir una condición de salida para evitar bucles infinitos — la variable del contador es el seguro habitual.</li>
            <li><strong>Loop condition (Do until):</strong> como el While pero evalúa la condición al final de cada iteración — se ejecuta al menos una vez.</li>
          </ul>
          <p><strong>Control de flujo:</strong></p>
          <ul>
            <li><strong>Exit loop:</strong> sale del bucle actual inmediatamente, independientemente de la condición. Equivale a un <code>break</code>.</li>
            <li><strong>Next loop:</strong> salta al siguiente ciclo del bucle, ignorando el resto de acciones de la iteración actual. Equivale a un <code>continue</code>.</li>
            <li><strong>Go to:</strong> salta a una etiqueta definida en el flow. Usar con extrema precaución — dificulta la legibilidad y el mantenimiento. Prácticamente nunca necesario si el flow está bien estructurado con subflows.</li>
          </ul>
          <div class="mini-note">Consejo práctico: cuando un bloque de If/Else supera 2 niveles de anidamiento, es señal de que el código debería refactorizarse en subflows — un subflow por rama, con nombre descriptivo de lo que hace. Facilita el debugging enormemente.</div>
        </div>

        <p class="subhead">▸ Categorías de acciones — el inventario</p>
        <div class="sub-body">
          <table class="prompt-table">
            <tr><th>Categoría</th><th>Qué hace</th><th>Ejemplos</th></tr>
            <tr><td>Archivo y carpeta</td><td>Operaciones sobre el sistema de archivos</td><td>Crear carpeta, copiar/mover/eliminar archivo, obtener archivos en carpeta</td></tr>
            <tr><td>Automatización web</td><td>Interacción con el navegador sin API</td><td>Abrir navegador, hacer clic en enlace, extraer datos de página, rellenar formulario</td></tr>
            <tr><td>Automatización de UI</td><td>Interacción con apps de escritorio por UI</td><td>Hacer clic en elemento UI, rellenar campo de texto, seleccionar opción en desplegable</td></tr>
            <tr><td>Excel</td><td>Automatizar procesamiento de Excel</td><td>Abrir Excel, leer hoja de cálculo, escribir en celda, guardar y cerrar</td></tr>
            <tr><td>Email</td><td>Automatizar correo electrónico</td><td>Enviar email desde Outlook, recuperar emails, guardar adjuntos</td></tr>
            <tr><td>Sistema</td><td>Controlar operaciones del SO</td><td>Abrir aplicación, mostrar mensaje emergente, ejecutar script, capturar pantalla</td></tr>
            <tr><td>Condicionales y bucles</td><td>Control de flujo y repetición</td><td>If/Else, For each, While, Switch/Case</td></tr>
            <tr><td>Variables y datos</td><td>Almacenar y manipular datos</td><td>Establecer variable, operaciones de texto, manipular lista, filtrar datatable</td></tr>
            <tr><td>Scripts personalizados</td><td>Extender con código</td><td>Ejecutar script Python, JavaScript, VBScript, PowerShell</td></tr>
          </table>
        </div>

        <p class="subhead">▸ Variables y tipos de datos</p>
        <div class="sub-body">
          <p>PAD infiere el tipo de las variables automáticamente: texto, número, booleano, lista, datatable, datetime, objeto personalizado (diccionario). Se referencian con <code>%NombreVariable%</code> dentro de inputs de texto.</p>
          <ul>
            <li><strong>Datatable:</strong> tipo resultante de "Leer desde hoja de cálculo de Excel", "Extraer datos de página web", etc. Operaciones típicas: <code>For each</code> sobre filas, <code>Filtrar filas de datatable</code>, <code>Ordenar datatable</code>.</li>
            <li><strong>Objeto personalizado (diccionario):</strong> agrupa datos relacionados sin crear múltiples variables sueltas — equivalente a un objeto JSON. Muy útil para pasar datos entre subflows.</li>
            <li><strong>Naming:</strong> mantener nombres descriptivos (<code>%FacturaActual%</code> mejor que <code>%var1%</code>). Las variables de entrada/salida de subflows se definen explícitamente en las propiedades del subflow.</li>
          </ul>
        </div>

      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">PAD · UI AUTOMATION Y SELECTORES</span><h3>UI elements, selectores robustos y timing</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/paths/pad-get-started/" target="_blank" rel="noopener">Ver ruta oficial PAD ↗</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ UI elements: el repositorio de la app</p>
        <div class="sub-body">
          <p>PAD guarda los elementos de UI capturados en un <strong>repositorio reutilizable</strong> dentro del flow. Al grabar interacciones, PAD captura automáticamente los atributos del elemento (nombre de control, tipo, texto, clase CSS) y los almacena. Principios de selectores robustos:</p>
          <ul>
            <li><strong>Preferir atributos estables:</strong> nombre de control, tipo de elemento, texto de etiqueta — sobre posición/índice o coordenadas de pantalla.</li>
            <li><strong>Usar wildcards (<code>*</code>):</strong> en atributos que cambian entre ejecuciones pero mantienen un patrón (p.ej. títulos de ventana que incluyen el número de factura: <code>Factura * - SAP</code>).</li>
            <li><strong>Anclar a elementos vecinos estables:</strong> cuando el elemento objetivo no tiene atributos propios fiables, anclar a un label o botón cercano que sí los tenga.</li>
            <li><strong>Revisar tras actualizaciones:</strong> una actualización de navegador, Office o la app objetivo puede cambiar atributos de UI sin previo aviso. Si un flow falla "sin haber cambiado nada", revisar primero si la aplicación objetivo se actualizó.</li>
            <li><strong>Limpiar el repositorio periódicamente:</strong> eliminar elementos no usados o duplicados para mantener el repositorio limpio.</li>
          </ul>
        </div>

        <p class="subhead">▸ El problema más común: timing y esperas</p>
        <div class="sub-body">
          <p>El patrón <em>"funciona grabando pero falla al ejecutar"</em> casi siempre indica timing — la UI no ha terminado de cargar cuando PAD intenta interactuar.</p>
          <div class="warn-note"><strong>Evitar:</strong> <code>Wait 3 seconds</code> / <code>Delay</code> fijos. Son frágiles porque en máquinas más lentas o con más carga siguen siendo insuficientes, y en máquinas rápidas desperdician tiempo.</div>
          <div class="mini-note"><strong>Preferir:</strong> <code>Wait for element to exist</code>, <code>Wait for element to disappear</code>, o un bucle <code>While</code> que comprueba una condición hasta que se cumple con un timeout máximo.</div>
        </div>

      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">PAD · MODULARIDAD Y ERRORES</span><h3>Subflows, manejo de errores y debugging</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/paths/pad-get-started/" target="_blank" rel="noopener">Ver ruta oficial PAD ↗</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Subflows: modularización en PAD</p>
        <div class="sub-body">
          <p>PAD permite crear <strong>subflows</strong> dentro del mismo flow (bloques de acciones con su propio nombre, invocables con <code>Ejecutar subflow</code>) y también <strong>llamar a otros flows guardados</strong> (<code>Ejecutar flow de escritorio</code>).</p>
          <ul>
            <li>Usar <strong>subflows</strong> para lógica que se repite dentro del mismo flow (p.ej. "procesar una fila de la tabla").</li>
            <li>Usar <strong>flows separados + Ejecutar flow</strong> cuando la lógica se reutiliza entre distintos flows/procesos — equivalente a librerías reutilizables en UiPath.</li>
            <li>Los datos se pasan entre subflows mediante <strong>variables de entrada/salida</strong> definidas explícitamente en las propiedades del subflow — no se heredan automáticamente.</li>
          </ul>
        </div>

        <p class="subhead">▸ Manejo de errores — el patrón recomendado</p>
        <div class="sub-body">
          <p>Cada acción (o bloque) en PAD permite configurar qué ocurre si falla, mediante <strong>"On block error"</strong>: continuar con la siguiente acción, detener el flow con/sin error, o ejecutar una rama alternativa de acciones (la rama de manejo de error).</p>
          <ul>
            <li><strong>Patrón try-catch en PAD:</strong> <code>On block error → Ejecutar una secuencia diferente de acciones</code> + en esa rama: registrar el error (logging) + decidir si continuar, reintentar o detener.</li>
            <li><strong>Retry manual:</strong> PAD no tiene un Retry Scope nativo como UiPath. Se implementa con un <code>Loop</code> que reintenta N veces con una variable contador y sale del bucle si tiene éxito.</li>
            <li><strong><code>%LastError%</code>:</strong> variable expuesta por PAD con el mensaje del último error — registrarla siempre antes de decidir el siguiente paso.</li>
          </ul>
          <div class="mini-note">Principio clave: diferenciar errores de negocio (dato inválido — no tiene sentido reintentar) de errores técnicos (timeout de red — sí tiene sentido reintentar con backoff).</div>
        </div>

        <p class="subhead">▸ Debugging en PAD</p>
        <div class="sub-body">
          <ul>
            <li><strong>Run from this action:</strong> ejecutar el flow desde una acción concreta — evita repetir pasos iniciales lentos (login, navegación) mientras se depura una sección posterior.</li>
            <li><strong>Breakpoints:</strong> clic en el margen de una acción para pausar ahí. Combinado con Step into/Step over para avanzar acción a acción, entrando o no en subflows.</li>
            <li><strong>Panel de variables:</strong> durante una pausa, muestra el valor actual de todas las variables — imprescindible para inspeccionar el contenido real de un datatable o diccionario.</li>
            <li><strong>Screenshots + logging intermedio:</strong> insertar "Tomar captura de pantalla" o escribir en log en puntos clave, especialmente antes/después de interacciones UI que puedan fallar — facilita reconstruir qué pasó cuando el flow corre desatendido.</li>
          </ul>
        </div>

      </div>
    </article>
  </section>

  <!-- ==================== BLOQUE 4 ==================== -->
  <section class="block-section" id="bloque4">
    <span class="section-label">Bloque 4 · Referencia CoE</span>
    <h2>Patrones de producción, migración y checklist</h2>
    <p class="section-intro">No es una ruta oficial de Learn — es el conocimiento destilado para construir y operar automatizaciones robustas en un CoE. Aplicable tanto a PAD como a Cloud Flows.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">REFERENCIA · ROBUSTEZ</span><h3>Patrones de producción: logging, credenciales, colas, selectores</h3></div>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Logging estructurado — qué registrar como mínimo</p>
        <div class="sub-body">
          <ul>
            <li>Inicio y fin del proceso, con timestamp.</li>
            <li>Por cada elemento procesado: identificador, resultado (éxito/fallo/tipo de fallo), tiempo de procesamiento.</li>
            <li>Cualquier excepción capturada, con el mensaje de error completo — nunca solo "ha fallado".</li>
          </ul>
          <p>Para procesos desatendidos, el log debe escribirse en un lugar consultable sin acceso a la máquina donde corrió: archivo en SharePoint, lista de SharePoint, tabla de Dataverse o Excel centralizado. El formato estructurado (columnas: fecha, proceso, elemento, resultado, mensaje) facilita analizar fallos con Power BI.</p>
          <div class="mini-note">Usar niveles de log consistentes: Info (hitos del proceso), Warning (situaciones anómalas no bloqueantes), Error (fallo de transacción), Fatal (fallo que detiene todo el proceso).</div>
        </div>

        <p class="subhead">▸ Credenciales: nunca en texto plano</p>
        <div class="sub-body">
          <ul>
            <li><strong>PAD:</strong> usar el <strong>Windows Credential Manager</strong> (acción "Get credential") para almacenar y recuperar credenciales de forma segura. Para entornos más avanzados, Azure Key Vault o variables de entorno gestionadas.</li>
            <li><strong>Cloud Flows:</strong> las conexiones a servicios (Outlook, SharePoint…) se autentican mediante los conectores — las credenciales viven en la conexión, no en el flow.</li>
            <li><strong>Regla de rotación:</strong> si una contraseña cambia, debe poder actualizarse en un solo sitio (el almacén) sin tocar el robot ni volver a desplegarlo.</li>
          </ul>
        </div>

        <p class="subhead">▸ Procesamiento por colas — patrón recomendado</p>
        <div class="sub-body">
          <p>Para procesos con múltiples elementos (facturas, emails, registros), el patrón de cola es más robusto que leer todos los elementos de una vez:</p>
          <ol style="padding-left:18px; margin:6px 0 10px;">
            <li style="margin-bottom:5px;"><strong>Poblar la cola:</strong> una fase separada identifica todos los elementos y los añade a una "cola" (lista de SharePoint, tabla Dataverse, Excel) con estado "Pendiente".</li>
            <li style="margin-bottom:5px;"><strong>Procesar elemento a elemento:</strong> el robot toma un elemento, lo procesa y actualiza su estado en la cola (Completado/Error).</li>
            <li style="margin-bottom:5px;"><strong>Reintentos selectivos:</strong> los elementos marcados como Error por causas transitorias pueden reprocesarse sin volver a tocar los que ya completaron.</li>
          </ol>
          <p>En PAD, el "orquestador" puede ser un Cloud Flow que lee la cola (lista de SharePoint), llama al Desktop Flow por elemento y actualiza el estado según el resultado devuelto.</p>
        </div>

        <p class="subhead">▸ Retry: cuándo y cómo</p>
        <div class="sub-body">
          <ul>
            <li><strong>Solo reintentar errores transitorios:</strong> timeout de red, aplicación que tarda en responder, archivo bloqueado temporalmente. Un dato inválido seguirá siendo inválido en el segundo intento.</li>
            <li><strong>2-3 reintentos es suficiente.</strong> Más suele indicar que el problema no es transitorio.</li>
            <li><strong>Backoff progresivo:</strong> esperar un tiempo creciente entre reintentos (5s, 15s, 30s) en lugar de reintentar inmediatamente — reduce la presión sobre el servicio con problemas.</li>
            <li><strong>Registrar cada intento</strong> para distinguir "falló a la primera pero el reintento funcionó" (señal de warning) de "falló todos los intentos" (error real).</li>
          </ul>
        </div>

      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">REFERENCIA · MIGRACIÓN</span><h3>Migración UiPath → Power Automate Desktop</h3></div>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Por qué migrar (y cuándo no)</p>
        <div class="sub-body">
          <p><strong>Razones para migrar:</strong> consolidación en el ecosistema Microsoft (integración nativa con SharePoint, Teams, Power BI), reducción de costes de licencias si la organización ya tiene M365/Power Automate, y simplificación del stack tecnológico del CoE.</p>
          <div class="warn-note"><strong>Razones para NO migrar (o evaluar con cuidado):</strong> el proceso usa capacidades avanzadas de UiPath sin equivalente directo en PAD (colas con prioridades, dashboards de Orchestrator, activities muy especializadas); el proceso es crítico y está estable en producción (el riesgo supera el ahorro); el equipo no tiene capacidad para reescribir y revalidar ahora.</div>
          <p><strong>Recomendación:</strong> priorizar la migración de procesos nuevos o de complejidad media/baja. Evaluar caso a caso los procesos críticos y complejos.</p>
        </div>

        <p class="subhead">▸ Mapeo de conceptos UiPath → PAD</p>
        <div class="sub-body">
          <table class="prompt-table">
            <tr><th>UiPath</th><th>PAD</th><th>Notas</th></tr>
            <tr><td>Workflow (.xaml)</td><td>Flow</td><td>Unidad principal de automatización</td></tr>
            <tr><td>Activity</td><td>Action</td><td>Bloque individual de funcionalidad</td></tr>
            <tr><td>Sequence</td><td>Secuencia de acciones</td><td>PAD no distingue Sequence/Flowchart; todo es secuencial con bloques anidados</td></tr>
            <tr><td>Flowchart</td><td>(sin equivalente directo)</td><td>Reproducir con If/Loop anidados</td></tr>
            <tr><td>State Machine</td><td>(sin equivalente nativo)</td><td>Usar variables de estado + Switch/If + bucles</td></tr>
            <tr><td>Selector</td><td>UI element</td><td>Concepto equivalente, editor y sintaxis distintos — hay que regrabar las interacciones</td></tr>
            <tr><td>Try-Catch</td><td>On block error → rama de error</td><td>Ver Bloque 3</td></tr>
            <tr><td>Retry Scope</td><td>Loop manual con contador</td><td>No hay equivalente nativo</td></tr>
            <tr><td>REFramework</td><td>(sin plantilla oficial)</td><td>Reproducir manualmente: Init / Get Transaction / Process / Set Status / End, con subflows</td></tr>
            <tr><td>Orchestrator Queues</td><td>Lista SharePoint / Dataverse / Excel</td><td>Power Automate Cloud puede gestionar la cola y disparar el Desktop flow por elemento</td></tr>
            <tr><td>Orchestrator Assets</td><td>Variables de entorno PAD / Dataverse</td><td>Para configuración compartida entre flows</td></tr>
          </table>
        </div>

        <p class="subhead">▸ Estrategia de migración — 5 pasos</p>
        <div class="sub-body">
          <ol style="padding-left:18px; margin:6px 0 10px;">
            <li style="margin-bottom:7px;"><strong>No migrar línea a línea:</strong> documentar primero qué hace el proceso a nivel funcional (un PDD), y rediseñar en PAD con sus propios patrones — no como traducción literal del .xaml de UiPath.</li>
            <li style="margin-bottom:7px;"><strong>Empezar por procesos pequeños:</strong> que el equipo coja práctica con PAD antes de migrar los críticos.</li>
            <li style="margin-bottom:7px;"><strong>Reconstruir la robustez explícitamente:</strong> sin REFramework ni Retry Scope nativos, definir desde el principio cómo se gestiona errores, logging y reintentos — no asumir que "ya vendrá".</li>
            <li style="margin-bottom:7px;"><strong>Validar en paralelo:</strong> ejecutar el nuevo flow de PAD en paralelo (sin acciones reales, en entorno de pruebas) y comparar resultados antes del corte definitivo.</li>
            <li style="margin-bottom:7px;"><strong>Plan de rollback:</strong> mantener el proceso UiPath operativo (desactivado, no desinstalado) durante un periodo tras el corte.</li>
          </ol>
        </div>

        <p class="subhead">▸ Errores comunes en migraciones</p>
        <div class="sub-body">
          <ul>
            <li>Subestimar el esfuerzo de regrabar selectores — los de UiPath no se trasladan automáticamente a PAD.</li>
            <li>Asumir el mismo rendimiento que UiPath para procesos UI-intensivos — validar tiempos reales antes de comprometerse con plazos.</li>
            <li>Copiar la lógica de "leer Excel fila a fila" sin aprovechar que Power Automate Cloud puede gestionar la cola y disparar el Desktop Flow por elemento (mejor trazabilidad y manejo de errores por elemento).</li>
          </ul>
        </div>

      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">REFERENCIA · CHECKLIST</span><h3>Checklist antes de pasar a producción</h3></div>
      </div>

      <span class="synth-label">Checklist de producción</span>
      <div class="synth">
        <div class="deploy-checklist">
          <div class="deploy-phase">
            <h4>Diseño y robustez</h4>
            <ul>
              <li>El flow maneja errores a nivel de elemento — un fallo no detiene el proceso completo</li>
              <li>Errors de negocio y técnicos están diferenciados y tienen respuestas distintas</li>
              <li>Los reintentos solo aplican a errores transitorios, con backoff progresivo</li>
              <li>Ninguna credencial está hardcodeada — se usa Windows Credential Manager o Key Vault</li>
              <li>Los selectores de UI no dependen de posición/índice — usan atributos estables</li>
              <li>Las esperas son dinámicas, no Delay fijos</li>
            </ul>
          </div>
          <div class="deploy-phase">
            <h4>Logging y monitorización</h4>
            <ul>
              <li>El log registra inicio/fin del proceso con timestamp</li>
              <li>Cada elemento procesado tiene su registro de resultado en un destino externo (SharePoint, Dataverse)</li>
              <li>Los errores se registran con el mensaje completo, no solo "ha fallado"</li>
              <li>Existe una alerta o notificación cuando el proceso falla a nivel global</li>
            </ul>
          </div>
          <div class="deploy-phase">
            <h4>Modularidad y mantenibilidad</h4>
            <ul>
              <li>La lógica reutilizable está en subflows con nombres descriptivos</li>
              <li>Las variables tienen nombres descriptivos (no var1, var2…)</li>
              <li>El flow está documentado con comentarios en secciones no obvias</li>
              <li>Existe un PDD o documento de diseño básico del proceso</li>
            </ul>
          </div>
          <div class="deploy-phase">
            <h4>Despliegue y operación</h4>
            <ul>
              <li>El flow está asociado a una cuenta de servicio, no a una cuenta personal</li>
              <li>Se ha probado en el entorno de destino real (no solo en la máquina de desarrollo)</li>
              <li>Se ha validado con datos reales en un entorno de pruebas antes del corte</li>
              <li>Existe un plan de rollback si el proceso falla en los primeros días de producción</li>
              <li>El responsable de soporte está identificado y documentado</li>
            </ul>
          </div>
        </div>
      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">CLOUD FLOWS · TESTING Y MONITORIZACIÓN</span><h3>Probar, detectar errores y monitorizar flows</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/build-microsoft-power-automate-flow/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-microsoft-power-automate-flow/5-test-cloud-flow" target="_blank" rel="noopener">5 · Probar un flow</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-microsoft-power-automate-flow/6-run-monitor-cloud-flows" target="_blank" rel="noopener">6 · Monitorizar</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Flow Checker: detectar errores antes de ejecutar</p>
        <div class="sub-body">
          <p>Mientras se construye el flow, el botón <strong>Flow Checker</strong> (esquina superior derecha del editor) analiza la configuración en tiempo real y detecta dos tipos de problemas:</p>
          <ul>
            <li><strong>Errores:</strong> impiden que el flow funcione. Por ejemplo, un conector sin conexión configurada, o una acción que referencia un campo que ya no existe.</li>
            <li><strong>Advertencias:</strong> no bloquean la ejecución pero pueden afectar al rendimiento o al comportamiento. Por ejemplo, una acción sin configurar debidamente, o un campo opcional vacío que podría causar fallos en algunos casos.</li>
          </ul>
          <p>Expandir cada error/advertencia muestra el detalle y una sugerencia de corrección. Es buena práctica revisar el Flow Checker antes de cada prueba.</p>
        </div>

        <p class="subhead">▸ Testing: 3 métodos</p>
        <div class="sub-body">
          <p><strong>1. Test manual (trigger real):</strong> se activa el trigger real para ver el flow correr en vivo. Si el trigger es "al llegar un email", se envía un email de prueba. Útil para validar el comportamiento end-to-end con datos reales.</p>
          <p><strong>2. Con datos de ejecución anterior:</strong> re-ejecuta el flow usando los datos exactos de una ejecución pasada. Muy útil cuando el trigger es difícil de reproducir (un evento raro) o cuando el flow ya ha fallado y se quiere probar el fix sin esperar al próximo trigger real.</p>
          <p><strong>3. Static results (resultados estáticos):</strong> permite "mockear" una acción concreta con una salida predefinida, sin ejecutar la acción real. El flujo usa esa salida simulada y continúa normalmente. Especialmente útil para:</p>
          <ul>
            <li>Saltar acciones lentas (una aprobación que tarda horas) para probar lo que viene después.</li>
            <li>Simular escenarios de error sin forzar un fallo real.</li>
            <li>Aislar una sección del flow sin depender de sistemas externos.</li>
          </ul>
          <div class="mini-note">Activar Static result: en el editor, menú "..." de la acción → "Resultado estático" → pegar el JSON del resultado que quieres simular. El icono de la acción muestra una marca visual de que el resultado está mockeado.</div>
        </div>

        <p class="subhead">▸ Monitorización: qué mirar y dónde</p>
        <div class="sub-body">
          <p>Desde la página de detalle de cada flow, la pestaña <strong>Analytics</strong> ofrece tres vistas:</p>
          <table class="prompt-table">
            <tr><th>Vista</th><th>Qué muestra</th><th>Para qué sirve</th></tr>
            <tr><td>Uso del flow</td><td>Número de acciones ejecutadas por período</td><td>Detectar picos de uso, estimar coste, identificar flows con consumo excesivo</td></tr>
            <tr><td>Análisis de errores</td><td>Tipos de error, frecuencia y última ocurrencia</td><td>Identificar qué falla más seguido y cuándo; priorizar qué arreglar primero</td></tr>
            <tr><td>Historial de ejecuciones</td><td>Cada ejecución de los últimos 30 días (éxito/fallo/duración)</td><td>Ver tendencias, detectar fallos recurrentes a horas concretas, reconstruir incidencias</td></tr>
          </table>
          <p>Para cada ejecución individual, se puede ver el estado de cada acción (verde/rojo), la entrada y salida de cada paso, y el mensaje de error exacto — imprescindible para diagnosticar fallos en producción. El <strong>Process Mining integrado</strong> amplía esto con análisis de tendencias a más largo plazo y detección de cuellos de botella en los pasos más lentos.</p>
        </div>

        <p class="subhead">▸ Gestión de errores en cloud flows — el patrón Scope</p>
        <div class="sub-body">
          <p>El patrón estándar para manejar errores sin que el flow quede en estado fallido silenciosamente:</p>
          <div class="code-line">Scope: "Proceso principal"
  [acciones del flow]
↓
Acción: "Registrar error y notificar"
  → Configurar "Ejecutar después":
    ✓ ha tenido errores
    ✓ se ha omitido
    (no marcar "es correcto")
  → Acción: enviar email/Teams al responsable
  → Acción: escribir en lista SharePoint de incidencias</div>
          <p>Con este patrón, si cualquier acción dentro del Scope falla, la acción de notificación se ejecuta igualmente. Si el Scope termina bien, la notificación se omite. La clave está en la configuración "Ejecutar después" de la acción de notificación — sin ella, la acción simplemente no corre cuando el Scope falla.</p>
          <div class="warn-note"><strong>Error común:</strong> añadir la acción de notificación después del Scope sin cambiar "Ejecutar después" — por defecto solo corre si la acción anterior tuvo éxito, así que si el Scope falla, la notificación también se salta. Siempre revisar el "Ejecutar después" de las acciones de recuperación de errores.</div>
        </div>

      </div>
    </article>

  </section>

</div>

<footer>
  <div class="wrap">
    <p id="foot-vigencia" style="background:rgba(255,177,61,0.1); border-left:3px solid #ffb13d; border-radius:8px; padding:12px 16px; margin-bottom:18px; color:var(--text); font-size:13.5px; line-height:1.6;"><strong style="color:#ffb13d;">⚠ Vigencia del contenido —</strong> última verificación contra fuentes oficiales: <strong>22 de junio de 2026</strong> (4/4 bloques). Power Automate evoluciona rápido (especialmente las funciones de Copilot). Ante cualquier duda, confirma siempre contra el botón "Ver módulo oficial" de la sección correspondiente antes que contra esta guía.</p>
    <span class="section-label">Estado de la guía</span>
    <p style="color:var(--text-dim); margin:6px 0 18px;">Guía completa: bloques 1-2 basados en las rutas oficiales PL-900 de Power Automate; bloques 3-4 enriquecidos con conocimiento de CoE, patrones de producción y guía de migración UiPath→PAD.</p>
    <p>Esta guía sintetiza fuentes oficiales de Microsoft Learn y conocimiento práctico de CoE; no sustituye la documentación oficial. Generada el 22 de junio de 2026 · <strong>v1.0</strong> · 4/4 bloques.</p>
  </div>
</footer>
  </div>
</template>

<style>

  html.mod-power-automate{
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
  html.mod-power-automate[data-theme="light"], html.mod-power-automate [data-theme="light"]{
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
  html.mod-power-automate *{box-sizing:border-box;}
  html.mod-power-automate{scroll-behavior:smooth;}
  @media (prefers-reduced-motion: reduce){ html.mod-power-automate{scroll-behavior:auto;} html.mod-power-automate *{animation-duration:0.01ms !important; transition-duration:0.01ms !important;} }
  html.mod-power-automate body{ margin:0; background:var(--bg); color:var(--text); font-family:var(--ff-body); font-size:16px; line-height:1.6; -webkit-font-smoothing:antialiased; transition:background .25s ease, color .25s ease; }
  html.mod-power-automate h1,html.mod-power-automate h2,html.mod-power-automate h3,html.mod-power-automate h4{ font-family:var(--ff-display); margin:0; line-height:1.15; font-weight:700; letter-spacing:-0.01em;}
  html.mod-power-automate a{ color:var(--accent); text-decoration:none; }
  html.mod-power-automate a:hover{ text-decoration:underline; }
  html.mod-power-automate a:focus-visible, html.mod-power-automate button:focus-visible{ outline:2px solid var(--teal); outline-offset:2px; border-radius:4px;}
  html.mod-power-automate .wrap{ max-width:var(--maxw); margin:0 auto; padding:0 24px; }
  html.mod-power-automate code, html.mod-power-automate .mono{ font-family:var(--ff-mono); }

  html.mod-power-automate .topbar{ position:sticky; top:0; z-index:30; backdrop-filter:blur(10px); background:color-mix(in srgb, var(--bg) 86%, transparent); border-bottom:1px solid var(--border-soft);}
  html.mod-power-automate .topbar-inner{ max-width:var(--maxw); margin:0 auto; padding:14px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px;}
  html.mod-power-automate .brand{ display:flex; align-items:center; gap:10px; font-family:var(--ff-display); font-weight:700; font-size:18px;}
  html.mod-power-automate .brand .badge-fam{ font-family:var(--ff-mono); font-size:10px; font-weight:600; color:var(--text-faint); border:1px solid var(--border-soft); padding:2px 7px; border-radius:99px; letter-spacing:.04em;}
  html.mod-power-automate .brand .badge-ver{ font-family:var(--ff-mono); font-size:10px; font-weight:700; color:var(--teal); background:var(--teal-soft); padding:2px 7px; border-radius:99px; letter-spacing:.03em;}
  html.mod-power-automate .brand .badge-ver--wip{ color:var(--accent); background:var(--accent-soft);}
  html.mod-power-automate .theme-btn{ background:var(--bg-card); border:1px solid var(--border-soft); color:var(--text); width:38px; height:38px; border-radius:99px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:16px; transition:transform .15s ease, border-color .15s ease;}
  html.mod-power-automate .theme-btn:hover{ border-color:var(--accent); transform:scale(1.06);}

  html.mod-power-automate .top-btn{ position:fixed; right:22px; bottom:22px; z-index:40; width:44px; height:44px; border-radius:99px; background:var(--bg-card); border:1px solid var(--border); color:var(--accent); font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:var(--shadow); opacity:0; visibility:hidden; transform:translateY(8px); transition:opacity .2s ease, transform .2s ease, border-color .15s ease;}
  html.mod-power-automate .top-btn.show{ opacity:1; visibility:visible; transform:translateY(0);}
  html.mod-power-automate .top-btn:hover{ border-color:var(--accent); background:var(--accent-soft);}
  @media (max-width:640px){ html.mod-power-automate .top-btn{ right:14px; bottom:14px; width:40px; height:40px;} }

  html.mod-power-automate .source-strip{ background:linear-gradient(90deg, var(--accent-soft), transparent); border-bottom:1px solid var(--border-soft); font-family:var(--ff-mono); font-size:12.5px; color:var(--text-dim);}
  html.mod-power-automate .source-strip .wrap{ display:flex; align-items:center; gap:8px; padding:9px 24px; flex-wrap:wrap;}
  html.mod-power-automate .source-strip .wrap.vigencia{ padding-top:0; padding-bottom:9px; border-top:1px dashed var(--border-soft); margin-top:0;}
  html.mod-power-automate .source-strip .pin{ color:var(--accent); }
  html.mod-power-automate .source-strip .pin.warn{ color:#ffb13d; }
  html.mod-power-automate .source-strip a{ color:var(--text); border-bottom:1px dotted var(--accent); }
  html.mod-power-automate .source-strip a:hover{ text-decoration:none; color:var(--accent);}

  html.mod-power-automate .block-nav{ position:sticky; top:65px; z-index:25; background:color-mix(in srgb, var(--bg) 92%, transparent); backdrop-filter:blur(8px); border-bottom:1px solid var(--border-soft); }
  html.mod-power-automate .block-nav-inner{ max-width:var(--maxw); margin:0 auto; padding:10px 24px; display:flex; gap:8px; overflow-x:auto; scrollbar-width:thin; }
  html.mod-power-automate .nav-pill{ flex-shrink:0; display:inline-flex; align-items:center; gap:6px; font-family:var(--ff-mono); font-size:12px; font-weight:600; padding:7px 14px; border-radius:99px; border:1px solid var(--border-soft); color:var(--text-dim); white-space:nowrap; cursor:pointer; transition:all .15s ease; background:var(--bg-card);}
  html.mod-power-automate .nav-pill .dot{ width:6px; height:6px; border-radius:50%; background:var(--text-faint); flex-shrink:0;}
  html.mod-power-automate .nav-pill.available{ color:var(--text); border-color:var(--border); }
  html.mod-power-automate .nav-pill.available .dot{ background:var(--teal); }
  html.mod-power-automate .nav-pill:hover{ border-color:var(--accent); color:var(--accent); text-decoration:none;}
  html.mod-power-automate .nav-pill.active{ background:var(--accent-soft); border-color:var(--accent); color:var(--accent);}

  html.mod-power-automate .hero{ padding:56px 0 36px; }
  html.mod-power-automate .level-badge{ display:inline-flex; align-items:center; gap:8px; font-family:var(--ff-mono); font-size:12px; font-weight:600; color:var(--accent); background:var(--accent-soft); border:1px solid var(--border); padding:6px 12px; border-radius:99px; letter-spacing:.03em; margin-bottom:18px;}
  html.mod-power-automate .hero h1{ font-size:clamp(34px,5.5vw,52px); margin-bottom:14px;}
  html.mod-power-automate .hero h1 .accent{ color:var(--accent); }
  html.mod-power-automate .hero p.lead{ font-size:18px; color:var(--text-dim); max-width:640px; margin-bottom:0;}
  html.mod-power-automate .hero-meta{ display:flex; gap:28px; margin-top:28px; flex-wrap:wrap;}
  html.mod-power-automate .hero-meta div{ font-family:var(--ff-mono); font-size:12px; color:var(--text-faint);}
  html.mod-power-automate .hero-meta strong{ display:block; font-family:var(--ff-display); font-size:22px; color:var(--text); font-weight:700;}

  html.mod-power-automate .section-label{ font-family:var(--ff-mono); font-size:12px; font-weight:600; color:var(--teal); letter-spacing:.08em; text-transform:uppercase; margin-bottom:8px; display:block;}
  html.mod-power-automate section.block-section{ padding:34px 0;}
  html.mod-power-automate section.block-section h2{ font-size:clamp(24px,3.4vw,30px); margin-bottom:10px;}
  html.mod-power-automate .section-intro{ color:var(--text-dim); max-width:680px; margin-bottom:28px;}

  html.mod-power-automate .roadmap-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px;}
  html.mod-power-automate .road-card{ background:var(--bg-card); border:1px solid var(--border-soft); border-radius:var(--radius); padding:18px 18px 16px; transition:border-color .15s ease, transform .15s ease;}
  html.mod-power-automate .road-card.done{ border-color:var(--border); }
  html.mod-power-automate .road-card:hover{ transform:translateY(-2px); border-color:var(--accent);}
  html.mod-power-automate .road-card-top{ display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;}
  html.mod-power-automate .road-num{ font-family:var(--ff-mono); font-size:12px; color:var(--text-faint);}
  html.mod-power-automate .status-pill{ font-family:var(--ff-mono); font-size:10.5px; font-weight:600; padding:3px 9px; border-radius:99px; letter-spacing:.03em;}
  html.mod-power-automate .status-pill.disponible{ background:var(--teal-soft); color:var(--teal); }
  html.mod-power-automate .status-pill.pendiente{ background:var(--border-soft); color:var(--text-faint);}
  html.mod-power-automate .road-card h3{ font-size:16.5px; margin-bottom:6px;}
  html.mod-power-automate .road-card p{ font-size:13.5px; color:var(--text-dim); margin:0 0 12px; line-height:1.5;}
  html.mod-power-automate .road-source{ font-family:var(--ff-mono); font-size:11.5px; display:flex; align-items:center; gap:6px; color:var(--text-faint);}
  html.mod-power-automate .road-source a{ color:var(--text-dim);}
  html.mod-power-automate .road-source a:hover{ color:var(--accent);}

  html.mod-power-automate .module-card{ background:var(--bg-card); border:1px solid var(--border-soft); border-radius:var(--radius); padding:26px 26px 24px; margin-bottom:22px; box-shadow:var(--shadow);}
  html.mod-power-automate .module-head{ display:flex; align-items:flex-start; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:14px; padding-bottom:16px; border-bottom:1px solid var(--border-soft);}
  html.mod-power-automate .module-num{ font-family:var(--ff-mono); font-size:12px; color:var(--accent); font-weight:600; letter-spacing:.05em; margin-bottom:4px; display:block;}
  html.mod-power-automate .module-head h3{ font-size:22px; }
  html.mod-power-automate .module-link{ font-family:var(--ff-mono); font-size:12.5px; white-space:nowrap; border:1px solid var(--border); padding:7px 13px; border-radius:99px; color:var(--accent); flex-shrink:0;}
  html.mod-power-automate .module-link:hover{ background:var(--accent-soft); text-decoration:none;}
  html.mod-power-automate .units-list{ display:flex; flex-wrap:wrap; gap:8px; margin:0 0 20px;}
  html.mod-power-automate .unit-chip{ font-family:var(--ff-mono); font-size:12px; color:var(--text-dim); background:var(--bg-elev); border:1px solid var(--border-soft); padding:6px 11px; border-radius:8px; transition:border-color .15s, color .15s;}
  html.mod-power-automate .unit-chip:hover{ border-color:var(--teal); color:var(--teal); text-decoration:none;}
  html.mod-power-automate .synth-label{ font-family:var(--ff-mono); font-size:11.5px; font-weight:600; color:var(--teal); text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; display:block;}
  html.mod-power-automate .module-card .synth p{ margin:0 0 12px; color:var(--text); font-size:15px;}
  html.mod-power-automate .module-card .synth p:last-child{ margin-bottom:0;}
  html.mod-power-automate .module-card .synth strong{ color:var(--text); font-weight:700;}

  html.mod-power-automate .callout{ background:var(--teal-soft); border:1px solid rgba(62,201,176,0.3); border-left:3px solid var(--teal); border-radius:var(--radius-sm); padding:14px 18px; margin:16px 0; font-size:14.5px;}
  html.mod-power-automate .callout strong{ color:var(--teal); display:block; font-family:var(--ff-mono); font-size:11.5px; text-transform:uppercase; letter-spacing:.05em; margin-bottom:6px;}
  html.mod-power-automate .callout.warn{ background:var(--accent-soft); border-color:rgba(255,157,61,0.35); border-left-color:var(--accent);}
  html.mod-power-automate .callout.warn strong{ color:var(--accent); }

  html.mod-power-automate table.prompt-table{ width:100%; border-collapse:collapse; margin:14px 0 18px; font-size:14px;}
  html.mod-power-automate table.prompt-table th, html.mod-power-automate table.prompt-table td{ text-align:left; padding:10px 12px; border-bottom:1px solid var(--border-soft); vertical-align:top;}
  html.mod-power-automate table.prompt-table th{ font-family:var(--ff-mono); font-size:11px; text-transform:uppercase; letter-spacing:.04em; color:var(--text-faint); font-weight:600;}

  html.mod-power-automate .subhead{ font-family:var(--ff-mono); font-size:12px; font-weight:700; color:var(--teal); text-transform:uppercase; letter-spacing:.05em; margin:20px 0 8px; display:flex; align-items:center; gap:8px;}
  html.mod-power-automate .subhead:first-of-type{ margin-top:6px;}
  html.mod-power-automate .sub-body{ font-size:14px; color:var(--text-dim); line-height:1.6;}
  html.mod-power-automate .sub-body ul{ margin:6px 0 10px; padding-left:18px;}
  html.mod-power-automate .sub-body li{ margin-bottom:5px;}
  html.mod-power-automate .sub-body p{ margin:0 0 10px;}
  html.mod-power-automate .code-line{ font-family:var(--ff-mono); font-size:12.5px; background:var(--bg-elev); border:1px solid var(--border-soft); border-radius:6px; padding:9px 13px; margin:8px 0; color:var(--teal); overflow-x:auto; white-space:pre;}
  html.mod-power-automate .mini-note{ background:var(--teal-soft); border-left:3px solid var(--teal); border-radius:6px; padding:9px 13px; font-size:13px; margin:8px 0;}
  html.mod-power-automate .warn-note{ background:var(--accent-soft); border-left:3px solid var(--accent); border-radius:6px; padding:9px 13px; font-size:13px; margin:8px 0;}

  html.mod-power-automate .deploy-checklist{ display:grid; gap:14px;}
  html.mod-power-automate .deploy-phase{ background:var(--bg-card); border:1px solid var(--border-soft); border-radius:var(--radius); padding:16px 20px;}
  html.mod-power-automate .deploy-phase h4{ font-size:14.5px; color:var(--accent); margin:0 0 10px; font-family:var(--ff-mono); text-transform:uppercase; letter-spacing:.04em;}
  html.mod-power-automate .deploy-phase ul{ list-style:none; margin:0; padding:0; display:grid; gap:7px;}
  html.mod-power-automate .deploy-phase li{ font-size:13.5px; color:var(--text-dim); padding-left:24px; position:relative; line-height:1.5;}
  html.mod-power-automate .deploy-phase li::before{ content:"☐"; position:absolute; left:0; color:var(--accent); font-size:14px;}

  html.mod-power-automate footer{ border-top:1px solid var(--border-soft); margin-top:50px; padding:32px 0 50px;}
  html.mod-power-automate footer p{ color:var(--text-faint); font-size:13px; max-width:640px;}

  @media (max-width:640px){
    html.mod-power-automate .hero{ padding:40px 0 24px;}
    html.mod-power-automate .module-card{ padding:20px 18px;}
    html.mod-power-automate .hero-meta{ gap:18px;}
  }

</style>
