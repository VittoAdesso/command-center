<script setup>
import { ref } from 'vue'
import { useGuiaViva } from '../../composables/useGuiaViva'

const rootRef = ref(null)

useGuiaViva(rootRef, {
  title: "Centro de Mando · Power Platform — Guía viva",
  scopeClass: "mod-power-platform",
  themeStorageKey: null,
  blocks: ["bloque1","bloque2","bloque3","bloque4"],
  spyMode: "toggle",
  enableCopyBtns: false,
})
</script>

<template>
  <div ref="rootRef">
<div class="topbar">
  <div class="topbar-inner">
    <div class="brand">📡 Centro de Mando <span class="badge-fam">POWER PLATFORM · GUÍA VIVA</span><span class="badge-ver" title="Versión del archivo">v1.0 · completa</span></div>
    <button class="theme-btn" id="themeToggle" aria-label="Cambiar tema" title="Cambiar tema claro/oscuro">🌙</button>
  </div>
</div>

<div class="source-strip">
  <div class="wrap">
    <span class="pin">📍</span>
    <span>Fuente oficial raíz de esta guía:</span>
    <a href="https://learn.microsoft.com/es-es/training/powerplatform/" target="_blank" rel="noopener">learn.microsoft.com/es-es/training/powerplatform</a>
    <span style="color:var(--text-faint)">— cada bloque y cada módulo enlaza además su ruta específica.</span>
  </div>
  <div class="wrap vigencia">
    <span class="pin warn">⚠</span>
    <span>Power Platform evoluciona rápido (sobre todo Copilot dentro de cada producto) — ante dudas, confía en el botón "Ver módulo oficial" de cada sección.</span>
    <a class="vig-link" href="#foot-vigencia">Más detalle ↓</a>
  </div>
</div>

<nav class="block-nav" aria-label="Navegación por bloques">
  <div class="block-nav-inner">
    <a class="nav-pill available" href="#bloque1"><span class="dot"></span>1 · Valor empresarial</a>
    <a class="nav-pill available" href="#bloque2"><span class="dot"></span>2 · Entorno y Dataverse</a>
    <a class="nav-pill available" href="#bloque3"><span class="dot"></span>3 · Power Apps</a>
    <a class="nav-pill available" href="#bloque4"><span class="dot"></span>4 · Power Pages</a>
  </div>
</nav>


<main class="wrap">

  <section class="hero">
    <span class="level-badge">● GUÍA COMPLETA · 4/4 BLOQUES</span>
    <h1>Power <span class="accent">Platform</span>,<br>el mapa antes del detalle.</h1>
    <p class="lead">Guía de consulta rápida construida sobre las rutas oficiales de Microsoft Learn (base del examen PL-900). No las sustituye: las sintetiza, las enlaza módulo a módulo y te dice por dónde empezar.</p>
    <div class="hero-meta">
      <div><strong>9</strong>módulos en el mapa</div>
      <div><strong>4</strong>bloques planeados</div>
      <div><strong>4/4</strong>bloques construidos</div>
    </div>
  </section>

  <section class="block-section" id="roadmap">
    <span class="section-label">Mapa de la guía</span>
    <h2>Hoja de ruta — 4 bloques</h2>
    <p class="section-intro"><strong>Nota de alcance:</strong> este archivo cubre Power Platform como certificación PL-900 <em>excepto Power Automate</em> — ese tema tendrá su propio archivo dedicado y más profundo en Centro de Mando, en la línea de PAD Ninja. <strong>Nota de nivel:</strong> a diferencia de la guía de Copilot, las 4 rutas oficiales que sostienen este archivo están etiquetadas «Principiante» sin excepción — no hay una progresión básico→avanzado real que ofrecer, así que agrupo por tema en vez de forzar niveles que la fuente no respalda.</p>

    <div class="roadmap-nivel">
      <div class="roadmap-nivel-title">Conceptos y plataforma</div>
      <div class="roadmap-grid">
        <div class="road-card done">
          <div class="road-card-top"><span class="road-num">BLOQUE 1</span><span class="status-pill disponible">● Disponible</span></div>
          <h3>Valor empresarial</h3>
          <p>Qué es Power Platform, sus 4 productos núcleo, conectores, Dataverse, Power Fx, Copilot en cada producto.</p>
          <div class="road-source">🔗 <a href="https://learn.microsoft.com/es-es/training/paths/describe-business-value-microsoft-power-platform/" target="_blank" rel="noopener">Describir el valor empresarial · 2 módulos</a></div>
        </div>
        <div class="road-card done">
          <div class="road-card-top"><span class="road-num">BLOQUE 2</span><span class="status-pill disponible">● Disponible</span></div>
          <h3>Entorno y Dataverse</h3>
          <p>Dataverse en profundidad, modelo de seguridad, entornos, centros de administración, ALM y gobernanza.</p>
          <div class="road-source">🔗 <a href="https://learn.microsoft.com/es-es/training/paths/manage-microsoft-power-platform-environment/" target="_blank" rel="noopener">Administrar el entorno · 2 módulos</a></div>
        </div>
      </div>
    </div>

    <div class="roadmap-nivel">
      <div class="roadmap-nivel-title">Crear con Power Apps y Power Pages</div>
      <div class="roadmap-grid">
        <div class="road-card done">
          <div class="road-card-top"><span class="road-num">BLOQUE 3</span><span class="status-pill disponible">● Disponible</span></div>
          <h3>Power Apps</h3>
          <p>Canvas vs. model-driven, construcción asistida por Copilot de ambos tipos de app.</p>
          <div class="road-source">🔗 <a href="https://learn.microsoft.com/es-es/training/paths/demonstrate-capabilities-power-apps/" target="_blank" rel="noopener">Demostrar las capacidades de Power Apps · 3 módulos</a></div>
        </div>
        <div class="road-card done">
          <div class="road-card-top"><span class="road-num">BLOQUE 4</span><span class="status-pill disponible">● Disponible</span></div>
          <h3>Power Pages</h3>
          <p>Sitios externos sobre Dataverse, modelo de seguridad, creación asistida por Copilot.</p>
          <div class="road-source">🔗 <a href="https://learn.microsoft.com/es-es/training/paths/demonstrate-capabilities-microsoft-power-pages/" target="_blank" rel="noopener">Demostrar las capacidades de Power Pages · 2 módulos</a></div>
        </div>
      </div>
    </div>
  </section>

  <section class="block-section" id="bloque1">
    <span class="section-label">Bloque 1 · Conceptos y plataforma</span>
    <h2>Describir el valor empresarial de Microsoft Power Platform</h2>
    <p class="section-intro">Ruta oficial: <a href="https://learn.microsoft.com/es-es/training/paths/describe-business-value-microsoft-power-platform/" target="_blank" rel="noopener">«Describir el valor empresarial de Microsoft Power Platform»</a> — principiante, sin requisitos previos, 2 módulos. Aquí tienes cada módulo con sus unidades enlazadas y mi síntesis práctica debajo.</p>

    <!-- MÓDULO 1 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 1 DE 2</span><h3>Describir el valor empresarial de los servicios de Microsoft Power Platform</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-microsoft-power-platform-services/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-microsoft-power-platform-services/2-explore-microsoft-power-platform" target="_blank" rel="noopener">2 · Explorar Power Platform</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-microsoft-power-platform-services/3-describe-business-value-microsoft-power-apps-build-applications" target="_blank" rel="noopener">3 · Valor empresarial</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-microsoft-power-platform-services/4-describe-value-connectors-integrate-services-data" target="_blank" rel="noopener">4 · Conectores</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-microsoft-power-platform-services/5-describe-value-microsoft-dataverse-organize-business-data" target="_blank" rel="noopener">5 · Dataverse</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-microsoft-power-platform-services/6-describe-value-power-fx-low-code-solution" target="_blank" rel="noopener">6 · Power Fx</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-microsoft-power-platform-services/7-describe-how-power-platform-services-work-together" target="_blank" rel="noopener">7 · Cómo funcionan juntos</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-microsoft-power-platform-services/8-describe-value-copilots-generative-ai-features-microsoft-power-platform" target="_blank" rel="noopener">8 · Copilot e IA generativa</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-microsoft-power-platform-services/9-write-effective-copilot-prompts-microsoft-power-platform" target="_blank" rel="noopener">9 · Prompts eficaces</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Los 4 productos núcleo + las herramientas de apoyo</p>
        <div class="sub-body">
          <p>Power Platform se construye sobre cuatro productos: <strong>Power Apps</strong> (crear apps web/móviles con poco código sobre una plataforma de datos escalable), <strong>Power Automate</strong> (flujos de trabajo automatizados entre apps y servicios), <strong>Power BI</strong> (análisis de negocio con paneles e informes) y <strong>Power Pages</strong> (sitios web externos sobre los mismos datos de la organización). Alrededor de estos cuatro hay un segundo anillo de herramientas de apoyo que los conecta y potencia: <strong>Copilot Studio</strong> (agentes conversacionales con IA generativa), <strong>conectores</strong> (más de 1.400 prediseñados), <strong>AI Builder</strong> (modelos de IA listos para incrustar en flujos y apps sin código), <strong>Dataverse</strong> (la base de datos común que sostiene a todos) y <strong>Power Fx</strong> (el lenguaje de fórmulas que usan Apps, Dataverse y Pages). Los <strong>entornos administrados</strong> cierran el cuadro como capa de aislamiento y control.</p>
        </div>

        <p class="subhead">▸ El problema que resuelve (caso The Phone Company)</p>
        <div class="sub-body">
          <p>El módulo arranca con cinco fricciones reales de cualquier organización: la demanda de aplicaciones supera a la capacidad de TI en proporción de 5 a 1; las plantillas más jóvenes esperan experiencias digitales personalizadas; el desarrollo a medida es caro de mantener; los ciclos tradicionales (meses para una solución, semanas para un cambio menor) ya no encajan con el ritmo del negocio; y escalar exige involucrar a "desarrolladores ciudadanos" — usuarios avanzados que combinan su conocimiento del negocio con el trabajo de TI profesional en lo que Microsoft llama <strong>desarrollo de fusión</strong>.</p>
          <p>El caso usado para ilustrarlo es <strong>The Phone Company</strong>, una operadora ficticia: Power BI centralizó datos dispersos de cuentas, red y soporte en paneles únicos; Power Apps dio a los técnicos de campo una app móvil para registrar reparaciones y fotos en tiempo real, sustituyendo el papel; Power Automate automatizó la incorporación de clientes (alta en CRM, aprovisionamiento, email de bienvenida, llamada de seguimiento) y la facturación; y Power Pages lanzó un portal de autoservicio 24/7 que redujo el volumen de llamadas de soporte. El relato es genérico — pero el patrón (un producto por tipo de fricción) es el armazón mental de toda la certificación.</p>
        </div>

        <p class="subhead">▸ Conectores: el pegamento entre todo</p>
        <div class="sub-body">
          <p>Los conectores enlazan Power Apps, Power Automate, Power Pages, Power BI y Dataverse con orígenes de datos externos, evitando configuraciones a medida. Hay más de 1.400 prediseñados, cada uno con acciones listas para usar — por ejemplo, el conector de Outlook ya sabe "descargar adjunto" o "enviar correo" sin que tengas que programar nada.</p>
          <p>El ejemplo del módulo es una empresa de gestión de edificios que procesa facturas de proveedores: el correo llega por Outlook, el adjunto se guarda en SharePoint, la aprobación se pide por Teams, la factura aprobada entra en un ERP (Oracle) y se confirma de vuelta por correo. Cinco servicios, cinco conectores distintos, un único flujo — sin que nadie tenga que escribir integración a medida entre ellos.</p>
        </div>

        <p class="subhead">▸ Dataverse en una pincelada</p>
        <div class="sub-body">
          <p>Dataverse es la plataforma de datos en la nube que centraliza tablas (filas/columnas con tipos definidos), con tablas estándar listas para usar (cuentas, contactos) y soporte para tablas personalizadas. Seguridad basada en roles (RBAC), seguridad a nivel de campo y auditoría son de fábrica. Se integra con Azure, Dynamics 365, M365 y sistemas externos (Salesforce, SAP). En el ecosistema: backend de Power Apps incluso sin conexión (con sincronización al reconectar), conectores hacia Power Automate, fuente para paneles de Power BI, y base de datos para portales de Power Pages.</p>
          <div class="mini-note">Aquí solo se ve a nivel de valor — el Bloque 2 («Administrar el entorno») entra en el modelo de seguridad y la administración real de Dataverse con más profundidad.</div>
        </div>

        <p class="subhead">▸ Power Fx: fórmulas tipo Excel en todas partes</p>
        <div class="sub-body">
          <p>Power Fx es el lenguaje con poco código de la plataforma, deliberadamente parecido a las fórmulas de Excel. Si en Excel escribes <code>=IF(I45="Texto","Verdadero","Falso")</code>, en una app de lienzo escribirías algo como:</p>
          <div class="code-line">If(IsBlank(NombrePropiedad.Text), false, true)</div>
          <p>— una fórmula que oculta o muestra un control según si un campo está vacío, y se recalcula sola cuando cambian los datos, igual que una celda de Excel. Power Fx no vive solo en Power Apps: en Dataverse define lógica de negocio y campos calculados (acumular ingresos sumando pedidos relacionados, por ejemplo); en Power Pages controla qué se muestra a cada usuario según su rol y valida formularios antes de enviarlos.</p>
        </div>

        <p class="subhead">▸ Cómo funcionan juntos</p>
        <div class="sub-body">
          <p>La idea central es la <strong>democratización</strong>: bajar la barrera técnica para que cualquier departamento construya sus propias soluciones, rompiendo silos al compartir una capa común de datos (Dataverse) y procesos. Tres patrones de uso combinado que el módulo destaca:</p>
          <ul>
            <li><strong>Incorporación de empleados:</strong> app en Power Apps para subir documentos y ver checklist, Power Automate gestiona notificaciones/aprobaciones, Dataverse guarda los datos.</li>
            <li><strong>Aprobación de gastos:</strong> app para adjuntar recibos, flujo automático que enruta según reglas, Power BI analiza tendencias de gasto.</li>
            <li><strong>Monitorización de KPIs:</strong> datos centralizados en Dataverse, paneles en Power BI, alertas automáticas en Power Automate cuando una métrica se desvía.</li>
          </ul>
        </div>

        <p class="subhead">▸ Copilot e IA generativa en cada producto</p>
        <div class="sub-body">
          <p>El módulo distingue IA generativa (crea contenido nuevo a partir de un prompt: texto, flujos, análisis) de la IA predictiva tradicional, y sitúa a Copilot como la capa conversacional sobre toda la plataforma — describes lo que necesitas en lenguaje natural en vez de navegar menús o escribir código. Por producto:</p>
          <ul>
            <li><strong>Copilot en Power Apps:</strong> describes el objetivo de la app y genera las tablas de Dataverse y componentes necesarios.</li>
            <li><strong>Copilot en Power Automate:</strong> describes el proceso ("avisa cuando se suba un documento a SharePoint") y genera el flujo, sugiriendo conectores.</li>
            <li><strong>Copilot en Power Pages:</strong> genera estructura del sitio, formularios y agentes conversacionales a partir de una descripción.</li>
            <li><strong>Copilot en Power BI:</strong> conversación para generar visualizaciones ("desglose de ingresos por región") y sugerir información accionable.</li>
          </ul>
        </div>

        <p class="subhead">▸ Prompts eficaces para Power Platform</p>
        <div class="sub-body">
          <p>Cinco buenas prácticas que reaparecerán en cada bloque de esta guía: sé específico, usa lenguaje natural y conversacional, da contexto, itera y refina, valida siempre el resultado. El módulo lo ilustra con una progresión de tres prompts para un equipo de RR. HH. que necesita una app de gestión de empleados:</p>
          <table class="prompt-table">
            <tr><th>Prompt</th><th>Qué genera</th></tr>
            <tr><td class="bad">"Crea una aplicación para administrar los datos de los empleados"</td><td>Una tabla genérica con campos básicos — funcional pero sin validaciones ni relaciones.</td></tr>
            <tr><td class="bad">"…incluidos los roles y departamentos. Añade reglas de validación para los campos obligatorios"</td><td>Varias tablas relacionadas (Empleados, Departamentos, Roles) con validación en campos críticos.</td></tr>
            <tr><td>"…progreso de las incorporaciones. […] relaciones entre tablas […] panel de control para supervisar el estado en tiempo real"</td><td>Solución completa: tablas interconectadas, validaciones, panel en tiempo real — mínima personalización manual posterior.</td></tr>
          </table>
        </div>

      </div>
    </article>

    <!-- MÓDULO 2 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 2 DE 2</span><h3>Describir el valor empresarial de la ampliación de las soluciones empresariales utilizando Microsoft Power Platform</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-extend-business-solutions-microsoft-power-platform/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-extend-business-solutions-microsoft-power-platform/2-describe-microsoft-power-platform-business-solutions-work-together" target="_blank" rel="noopener">2 · M365 y Teams</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-extend-business-solutions-microsoft-power-platform/3-describe-value-microsoft-copilot-studio" target="_blank" rel="noopener">3 · Copilot Studio</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-extend-business-solutions-microsoft-power-platform/4-describe-how-power-platform-works-onpremises-solutions" target="_blank" rel="noopener">4 · Sistemas locales</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-business-value-extend-business-solutions-microsoft-power-platform/5-describe-capabilities-plan-designer" target="_blank" rel="noopener">5 · Diseñador de planes</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Integración nativa con M365 y Teams</p>
        <div class="sub-body">
          <p>Los conectores más usados —Outlook, OneDrive, Excel, SharePoint— enlazan Power Platform con las herramientas donde ya trabaja todo el mundo. El ejemplo del módulo: guardar manualmente adjuntos de correo en una carpeta de SharePoint puede costar 1-2 minutos por correo y ocurrir 20-30 veces al día — automatizado con Power Automate, eso son hasta dos horas semanales recuperadas por persona. En Excel, donde algunos equipos pasan de 5 a 10 horas semanales introduciendo datos a mano, los flujos de escritorio de Power Automate (simulando teclado y ratón) reducen ese trabajo a segundos.</p>
          <p>Dentro de Teams, los cinco componentes se integran de forma nativa: <strong>Power BI</strong> (informes interactivos en canales/chats), <strong>Power Apps</strong> (crear/editar/publicar apps sin salir de Teams), <strong>Power Automate</strong> (flujos disparados desde un mensaje, tarjetas adaptables), <strong>Copilot Studio</strong> (agentes conversacionales dentro de Teams) y <strong>Dataverse for Teams</strong> (plataforma de datos con poco código integrada). El caso usado es una inmobiliaria que pasó a trabajo remoto: agentes de Copilot dedicados responden dudas de procedimiento, una app sobre Dataverse for Teams gestiona gastos de viaje, y paneles de Power BI dan acceso rápido a analítica de propiedades — todo sin salir de Teams.</p>
        </div>

        <p class="subhead">▸ Copilot Studio: agentes sin programar</p>
        <div class="sub-body">
          <p>El módulo describe Copilot Studio como una herramienta conversacional y de poco código para crear agentes de IA: describes lo que quieres que haga el agente y la plataforma se encarga del resto. Cuatro características clave según la fuente: interfaz simple sin necesidad de programar; integración de datos vía los más de 1.400 conectores (SharePoint, Excel, Salesforce, Google Drive…); flujos de trabajo automatizados apoyados en Power Automate; y despliegue multicanal (web, móvil, redes sociales, Teams) con seguridad y gobernanza integradas.</p>
          <p>Casos de uso que cita: atención al cliente, asistencia a empleados (onboarding, dudas de RR. HH.), ventas y marketing, educación, servicios públicos, sanidad y gestión de proyectos.</p>
          <div class="callout">
            <strong>Contraste con tu guía de Copilot</strong>
            Este módulo de PL-900 presenta Copilot Studio en su versión más simple y conceptual — "describe tu agente y listo". Tu propia guía de Microsoft 365 Copilot (Bloque 6) documenta una realidad bastante más matizada: hay una versión "lite" integrada en Copilot dentro de M365, una versión completa con licenciamiento independiente, límites distintos entre agentes de SharePoint y agentes de Copilot Studio completo (plantillas, generador de código, número de prompts iniciales), y todo un proceso de gobernanza con aprobación en 3 fases para publicar un agente en producción. Ninguna de las dos fuentes se equivoca — son niveles de profundidad distintos — pero si vienes de PL-900 esperando la sencillez descrita aquí, la realidad operativa en una organización con M365 Copilot Premium (como la tuya) tiene bastante más fricción administrativa.
          </div>
        </div>

        <p class="subhead">▸ Conexión con sistemas locales</p>
        <div class="sub-body">
          <p>La <strong>puerta de enlace de datos local</strong> (on-premises data gateway) es un servicio que se instala en un equipo dentro de la red de la organización y actúa de puente seguro entre herramientas en la nube (Power Apps, Power Automate, Power BI) y recursos locales (bases de datos, servidores de archivos) en entornos híbridos. Las credenciales se cifran antes de almacenarse en la nube y se descifran solo en el momento de acceder al recurso. Se pueden asignar coadministradores para repartir la responsabilidad de mantenimiento — relevante en equipos donde la rotación de personal podría dejar la puerta de enlace sin nadie a cargo.</p>
          <p>El caso de ejemplo es una empresa minorista con inventario en una base de datos local: sin puerta de enlace, alguien tendría que exportar datos a mano para llevarlos a Power BI; con ella, Power BI accede en directo y Power Automate puede actualizar el inventario local automáticamente cuando entran nuevas ventas desde un sistema en la nube.</p>
        </div>

        <p class="subhead">▸ Diseñador de planes (Plan Designer)</p>
        <div class="sub-body">
          <p>Es una herramienta conversacional con IA dentro de Power Apps: describes tu problema de negocio en lenguaje natural ("necesito una app para seguir pedidos de clientes") y, opcionalmente, adjuntas imágenes (capturas de una hoja de cálculo actual, diagramas de proceso). A partir de ahí genera tablas de Dataverse, roles de usuario, un diagrama entidad-relación (ERD), apps y flujos de trabajo — todo editable de forma iterativa: si pides una columna nueva o un cambio de diseño, actualiza la solución generada en lugar de obligarte a empezar de cero.</p>
          <p>El ejemplo del módulo es una pequeña empresa minorista que pide seguimiento de pedidos y aviso de inventario bajo, adjuntando una captura de su hoja de cálculo actual: el diseñador genera una tabla de pedidos, una app para que los empleados registren entradas, y un flujo que avisa cuando el inventario cae bajo un umbral.</p>
        </div>

      </div>
    </article>

  </section>

  <section class="block-section" id="bloque2">
    <span class="section-label">Bloque 2 · Conceptos y plataforma</span>
    <h2>Administrar el entorno de Microsoft Power Platform</h2>
    <p class="section-intro">Ruta oficial: <a href="https://learn.microsoft.com/es-es/training/paths/manage-microsoft-power-platform-environment/" target="_blank" rel="noopener">«Administrar el entorno de Microsoft Power Platform»</a> — principiante, sin requisitos previos, 2 módulos. Este es el bloque con más densidad para tu rol DSI: seguridad, entornos, centros de administración y ALM.</p>

    <!-- MÓDULO 1 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 1 DE 2</span><h3>Describir Microsoft Dataverse</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/describe-microsoft-dataverse/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-microsoft-dataverse/2-describe-differences-between-traditional-databases-microsoft-dataverse" target="_blank" rel="noopener">2 · Vs. BD tradicionales</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-microsoft-dataverse/3-describe-tables-columns-relationships-microsoft-dataverse" target="_blank" rel="noopener">3 · Tablas y relaciones</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-microsoft-dataverse/4-describe-options-business-logic-microsoft-dataverse" target="_blank" rel="noopener">4 · Lógica de negocio</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-microsoft-dataverse/5-create-modify-tables-columns-use-conversations" target="_blank" rel="noopener">5 · Ejercicio: tablas con Copilot</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-microsoft-dataverse/6-describe-options-importing-exporting-data" target="_blank" rel="noopener">6 · Importar/exportar</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Dataverse vs. bases de datos tradicionales + el Common Data Model</p>
        <div class="sub-body">
          <p>Frente a una base de datos tradicional (configuración y mantenimiento manuales), Dataverse añade de fábrica metadatos enriquecidos, relaciones definidas y lógica de negocio integrada — pensado para grandes volúmenes y modelos complejos. En seguridad, sustituye la implementación manual por RBAC, control de acceso por fila y cifrado por columna listos para usar. En desarrollo, abre la puerta a creadores sin perfil técnico gracias al entorno con poco código.</p>
          <p>La pieza que hace esto posible es el <strong>Common Data Model (CDM)</strong>: un esquema estandarizado con tablas, atributos y relaciones predefinidos para conceptos de negocio comunes (cuentas, contactos, transacciones). Gracias al CDM, una solución en Power Apps y una en Dynamics 365 comparten la misma estructura de datos sin esfuerzo extra — y esa misma estandarización es lo que permite integrar sistemas externos vía conectores y API.</p>
          <div class="mini-note">Caso del módulo: The Phone Company migra de una base heredada con escalabilidad limitada a Dataverse, centralizando datos de red, soporte y técnicos de campo — habilitando supervisión en tiempo real de llamadas caídas e interrupciones de servicio.</div>
        </div>

        <p class="subhead">▸ Tablas, columnas y relaciones</p>
        <div class="sub-body">
          <p>Una tabla es fila + columna como cualquier tabla de base de datos — cada fila es un registro identificado por una clave principal que es un GUID único. Las tablas incorporan además relaciones, claves, formularios, vistas, gráficos, paneles y reglas de negocio como componentes nativos. Dos tipos de relación entre tablas:</p>
          <ul>
            <li><strong>Uno a varios (1:N):</strong> una fila principal se relaciona con muchas filas relacionadas — un profesor con sus clases, un cliente con sus pedidos.</li>
            <li><strong>Varios a varios (N:N):</strong> filas de ambas tablas se relacionan entre sí a través de una tabla de intersección — estudiantes matriculados en varios cursos.</li>
          </ul>
          <p>Las relaciones se construyen con <strong>columnas de búsqueda</strong>, que referencian filas de otra tabla y permiten activar flujos de trabajo, aplicar reglas en cascada o construir informes que cruzan varias tablas.</p>
        </div>

        <p class="subhead">▸ Lógica de negocio: 3 caminos, cuándo usar cada uno</p>
        <div class="sub-body">
          <p>El módulo ilustra los tres métodos con un caso de "envío gratuito a partir de cierto importe":</p>
          <ul>
            <li><strong>Reglas de negocio:</strong> sin código, se definen directamente en la tabla (establecer valores, validar datos, mostrar mensajes de error). Se construyen en un diseñador visual — condición + acción + ámbito — y funcionan igual en apps de lienzo y basadas en modelo.</li>
            <li><strong>Power Fx:</strong> fórmulas con recálculo en tiempo real y <em>delegación</em> al servidor — las consultas pesadas se resuelven en el servidor en vez de en el dispositivo, lo que importa al filtrar tablas de miles de filas. Incluye funcionalidad sin conexión con sincronización automática al reconectar.</li>
            <li><strong>Power Automate:</strong> para flujos multi-paso entre Dataverse y servicios externos (aprobaciones por correo, actualizaciones en cascada, notificaciones cruzadas) — pensado para procesos asíncronos, no para validaciones instantáneas.</li>
          </ul>
          <div class="mini-note">Regla práctica del módulo: si necesitas una respuesta inmediata dentro de la app (validar un campo, un cálculo rápido), usa Power Fx. Si el proceso cruza sistemas o tiene varios pasos, usa Power Automate.</div>
        </div>

        <p class="subhead">▸ Crear y modificar tablas por conversación (Copilot)</p>
        <div class="sub-body">
          <p>El módulo incluye un laboratorio guiado (caso Contoso College, gestión de subvenciones y donaciones) que vale la pena conocer en su lógica aunque no repitas cada clic: desde <strong>Tablas → Empezar con Copilot</strong> en el Power Apps Maker Portal, describes en una frase qué tabla necesitas ("una tabla para administrar las donaciones recibidas, con tipo, importe, fecha y motivo") y Copilot la genera. Después puedes añadir tablas existentes y crear relaciones entre ellas por el mismo portal, y seguir iterando en lenguaje natural ("añade una columna de fecha llamada Application date") para ir ampliando el modelo. El ejercicio remata mostrando que Copilot no sustituye la edición manual: para ajustes finos (añadir una opción a una lista desplegable, por ejemplo) sigue siendo más rápido entrar directo a la columna y editarla a mano.</p>
        </div>

        <p class="subhead">▸ Importar y exportar datos</p>
        <div class="sub-body">
          <p>Tres vías de <strong>importación</strong>, de más a menos potente: el <strong>Asistente para la importación de datos</strong> (CSV/TXT/XML/Excel, varias tablas a la vez incluso desde un ZIP, sin transformación avanzada); <strong>importar desde Excel en apps basadas en modelo</strong> (plantilla predefinida, una tabla por archivo); e <strong>importar desde Excel en el Maker Portal</strong> (el más básico — sin relaciones ni listas de opciones). Dataverse también soporta <strong>tablas virtuales</strong>, que muestran datos externos en tiempo real sin duplicarlos dentro de Dataverse.</p>
          <p>Para <strong>exportar</strong>: a Excel desde apps basadas en modelo (hasta 100.000 filas, con edición en vivo vía Excel Online); plantillas de Word/Excel para documentos estructurados (facturas, informes); exportación masiva a CSV/ZIP desde el Maker Portal; y, para escenarios de analítica a gran escala, Power Automate (extracción controlada por eventos) o Azure Synapse Link (replicación continua).</p>
        </div>

      </div>
    </article>

    <!-- MÓDULO 2 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 2 DE 2</span><h3>Describir la administración y gobernanza en Microsoft Power Platform</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/describe-microsoft-power-platform-administration-governance/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-microsoft-power-platform-administration-governance/2-describe-microsoft-power-platform-security-model" target="_blank" rel="noopener">2 · Modelo de seguridad</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-microsoft-power-platform-administration-governance/3-describe-environments" target="_blank" rel="noopener">3 · Entornos</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-microsoft-power-platform-administration-governance/4-describe-different-microsoft-power-platform-admin-centers-portals" target="_blank" rel="noopener">4 · Centros de administración</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-microsoft-power-platform-administration-governance/5-describe-power-platform-data-privacy-accessibility-guidelines" target="_blank" rel="noopener">5 · Privacidad y accesibilidad</a>
        <a class="unit-chip" href="https://learn.microsoft.com/es-es/training/modules/describe-microsoft-power-platform-administration-governance/6-describe-application-lifecycle-management-power-platform" target="_blank" rel="noopener">6 · ALM</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Modelo de seguridad</p>
        <div class="sub-body">
          <p>Cinco capas, de la identidad al dato:</p>
          <ul>
            <li><strong>Autenticación:</strong> Microsoft Entra ID centraliza identidades vía OAuth 2.0, con MFA y acceso condicional (restringir por ubicación o tipo de dispositivo, por ejemplo).</li>
            <li><strong>RBAC en 3 niveles:</strong> entorno (acceso a apps/flujos de ese entorno), aplicación (componentes concretos dentro de un entorno) y registro (qué fila puede ver/editar/borrar cada usuario) — bajo el principio de privilegio mínimo.</li>
            <li><strong>DLP (prevención de pérdida de datos):</strong> clasifica conectores en <em>empresariales</em> (Dataverse, SharePoint, SQL Server — aptos para datos sensibles) y <em>no empresariales</em> (redes sociales, correo personal), y bloquea el flujo de datos entre ambos grupos. Las directivas se aplican a nivel de entorno o de todo el inquilino.</li>
            <li><strong>Seguridad de entorno:</strong> control de acceso, segmentación de datos, aplicación de DLP, gestión de ciclo de vida (dev/test/prod) e integración con la seguridad a nivel de fila de Dataverse.</li>
            <li><strong>Cifrado:</strong> AES-256 en reposo, TLS en tránsito (mínimo TLS 1.2 para acceder al servidor).</li>
          </ul>
          <p>Todo esto se apoya en el Centro de confianza de Microsoft y en el ciclo de vida de desarrollo de seguridad (SDL) como marco de gobernanza de fondo.</p>
        </div>

        <p class="subhead">▸ Entornos: 6 tipos + entornos administrados</p>
        <div class="sub-body">
          <p>Todo entorno cuelga de un inquilino de Microsoft Entra y está anclado a una región geográfica — los recursos de un entorno (apps, flujos, Dataverse) solo son visibles dentro de ese inquilino.</p>
          <table class="prompt-table">
            <tr><th>Tipo</th><th>Para qué</th><th>Seguridad</th></tr>
            <tr><td>Producción</td><td>Trabajo permanente de la organización. Requiere 1 GB de capacidad de BD.</td><td>Control total</td></tr>
            <tr><td>Predeterminado</td><td>Se crea solo, uno por inquilino, compartido por todos.</td><td>Limitado — todo usuario con licencia es creador</td></tr>
            <tr><td>Espacio aislado</td><td>Desarrollo y pruebas, no producción.</td><td>Total — requiere acceso de creador</td></tr>
            <tr><td>Prueba</td><td>Pruebas cortas, caduca a los 30 días.</td><td>Total</td></tr>
            <tr><td>Desarrollador</td><td>Plan para desarrolladores, uso personal.</td><td>Limitado — sin grupos de seguridad</td></tr>
            <tr><td>Dataverse for Teams</td><td>Automático al crear/instalar apps en Teams.</td><td>Limitado — según pertenencia al equipo</td></tr>
          </table>
          <p>Los <strong>entornos administrados</strong> añaden una capa de gobernanza encima de cualquier entorno: límites de a quién se puede compartir una app de lienzo, analítica semanal de uso (apps más usadas, creadores con más impacto, recursos inactivos a limpiar), directivas de datos (qué conectores pueden tocar tus datos), canalizaciones de despliegue entre entornos, y un <strong>comprobador de soluciones</strong> que audita patrones problemáticos automáticamente.</p>
        </div>

        <p class="subhead">▸ Centros de administración y portales — mapa de URLs</p>
        <div class="sub-body">
          <p>El <strong>Centro de administración de Power Platform</strong> es el punto único para gestionar entornos, configuración de inquilino y seguridad — organizado en áreas: Acciones (recomendaciones del asesor), Administrar (entornos y grupos), Supervisar, Seguridad, Implementación (ALM y canalizaciones, en preliminar), Licencias, Copilot (gobernanza de funciones Copilot) y Soporte técnico (incluido el de Power BI, aunque éste se administre desde su propio portal).</p>
          <p>Cada producto tiene además su propio portal de creador:</p>
          <table class="prompt-table">
            <tr><th>Producto</th><th>URL</th></tr>
            <tr><td>Power Apps / Dataverse</td><td><code>make.powerapps.com</code></td></tr>
            <tr><td>Power Automate</td><td><code>make.powerautomate.com</code></td></tr>
            <tr><td>Power BI</td><td><code>app.powerbi.com</code></td></tr>
            <tr><td>Power Pages</td><td><code>make.powerpages.microsoft.com</code></td></tr>
            <tr><td>Copilot Studio</td><td><code>copilotstudio.preview.microsoft.com</code></td></tr>
          </table>
        </div>

        <p class="subhead">▸ Privacidad y accesibilidad</p>
        <div class="sub-body">
          <p>El Centro de confianza de Microsoft centraliza certificaciones de seguridad/privacidad/cumplimiento. Cada inquilino fija una región geográfica al crearse, y los datos de Dataverse pueden replicarse dentro de esa región por continuidad operativa, pero no salen de ella. Todo el tráfico cliente↔centro de datos va cifrado por TLS (mínimo 1.2). Para RGPD, Microsoft ofrece guías de preparación, evaluaciones de impacto y procedimientos de notificación de incumplimiento a través del Centro de confianza y el Portal de confianza de servicios.</p>
          <p>En accesibilidad: Power BI mejora navegación por teclado y compatibilidad con lectores de pantalla; Power Apps incluye un <strong>comprobador de accesibilidad</strong> integrado en el editor de apps de lienzo para detectar problemas antes de publicar.</p>
        </div>

        <p class="subhead">▸ ALM: administración del ciclo de vida de aplicaciones</p>
        <div class="sub-body">
          <p>ALM es el marco que lleva una app desde la idea hasta el mantenimiento sin que el proceso se vuelva caótico. La pieza central son las <strong>soluciones</strong>: contenedores que empaquetan componentes (apps, flujos, tablas) y todas sus dependencias, para moverlos de forma consistente entre entornos de desarrollo, pruebas y producción.</p>
          <p>Cinco etapas: <strong>planificación</strong> (requisitos y alcance con las partes interesadas), <strong>desarrollo</strong> (construir con Power Apps/Automate/Dataverse), <strong>pruebas</strong> (validar en un entorno controlado antes de tocar producción), <strong>implementación</strong> (mover la solución empaquetada a producción) y <strong>mantenimiento</strong> (corregir, mejorar, adaptar de forma continua) — un ciclo, no una línea recta: el mantenimiento retroalimenta la siguiente planificación.</p>
        </div>

      </div>
    </article>

  </section>

  <section class="block-section" id="bloque3">
    <span class="section-label">Bloque 3 · Crear con Power Apps</span>
    <h2>Demostrar las capacidades de Microsoft Power Apps</h2>
    <p class="section-intro">Ruta oficial: <a href="https://learn.microsoft.com/es-es/training/paths/demonstrate-capabilities-power-apps/" target="_blank" rel="noopener">«Demostrar las capacidades de Microsoft Power Apps»</a> — principiante, sin requisitos previos, 3 módulos. El bloque más extenso: cubre los dos tipos de app, cómo construirlas con Copilot, controles IA y Agent Builder.</p>

    <!-- MÓDULO 1 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 1 DE 3</span><h3>Identificar las funcionalidades básicas de Microsoft Power Apps</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/identify-basic-microsoft-power-apps-capabilities/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/identify-basic-microsoft-power-apps-capabilities/2-describe-power-apps" target="_blank" rel="noopener">2 · Describir Power Apps</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/identify-basic-microsoft-power-apps-capabilities/3-describe-use-cases-canvas-apps" target="_blank" rel="noopener">3 · Casos de uso: apps de lienzo</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/identify-basic-microsoft-power-apps-capabilities/4-describe-use-cases-model-driven-apps" target="_blank" rel="noopener">4 · Casos de uso: apps basadas en modelo</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/identify-basic-microsoft-power-apps-capabilities/5-explore-model-driven-app-features" target="_blank" rel="noopener">5 · Características de apps basadas en modelo</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/identify-basic-microsoft-power-apps-capabilities/6-describe-differences-between-canvas-apps-model-driven-apps" target="_blank" rel="noopener">6 · Lienzo vs. modelo — elegir</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Power Apps: dos tipos principales + datos</p>
        <div class="sub-body">
          <p>Power Apps permite crear aplicaciones personalizadas sin necesidad de programación extensa, conectando más de 1.400 orígenes de datos. Las fuentes más habituales son Dataverse, SharePoint, Dynamics 365, SQL Server, Azure SQL y Office 365. Una sola app puede combinar varios orígenes simultáneamente.</p>
          <p>Los dos tipos principales de app son <strong>apps de lienzo</strong> y <strong>apps basadas en modelo</strong> — la elección entre ellas condiciona todo el diseño, la fuente de datos y la experiencia de usuario.</p>
        </div>

        <p class="subhead">▸ Apps de lienzo: máxima flexibilidad, orientadas a la tarea</p>
        <div class="sub-body">
          <p>Las apps de lienzo dan al creador control total sobre la interfaz — cada pantalla y control se coloca a voluntad, como diseñar una presentación. Conectan a cualquier fuente de datos (Dataverse o no) y se pueden incrustar en SharePoint, Power BI, apps basadas en modelo o Teams. Se construyen arrastrando controles y añadiendo lógica con fórmulas Power Fx (similares a Excel). Copilot permite describir la app en lenguaje natural y generarla, o pedir cambios conversacionalmente.</p>
          <p>Casos típicos: app de campo para técnicos, formulario de notificación de incidencias, captura de datos en movilidad. La clave es que el diseñador controla qué pantalla aparece y cómo.</p>
          <div class="mini-note">También es posible convertir diseños de Figma directamente en apps de lienzo de Power Apps.</div>
        </div>

        <p class="subhead">▸ Apps basadas en modelo: datos primero, orientadas al proceso</p>
        <div class="sub-body">
          <p>Las apps basadas en modelo siempre se construyen sobre Dataverse — no hay opción de otra fuente. El diseño parte del modelo de datos: formularios, vistas, gráficos y paneles se generan a partir de las tablas definidas. El resultado es una interfaz <strong>responsive</strong> y consistente por defecto, que funciona igual en escritorio, móvil y tableta sin ajustes adicionales.</p>
          <p>Casos típicos: aplicación de gestión para managers (supervisar solicitudes, asignar casos, ver dashboards de rendimiento), gestión de oportunidades comerciales, seguimiento de donaciones o subvenciones. La clave es que el sistema "sabe" cómo mostrar los datos porque las reglas están en Dataverse.</p>
          <p>La estructura de navegación de una app basada en modelo tiene tres niveles: <strong>apps</strong> (colección de funcionalidades para un tipo de actividad, como ventas o soporte), <strong>áreas</strong> (subdivisiones de la app dedicadas a un tema, accesibles desde el selector de área en la esquina inferior izquierda) y <strong>tablas</strong> (presentadas en vista lista o vista formulario). Los business process flows guían a los usuarios por procesos estándar paso a paso — creados con Power Automate, pueden abarcar múltiples tablas.</p>
        </div>

        <p class="subhead">▸ Cuándo usar cada tipo: tabla de decisión</p>
        <div class="sub-body">
          <table class="prompt-table">
            <tr><th>Criterio</th><th>App de lienzo</th><th>App basada en modelo</th></tr>
            <tr><td>Fuente de datos</td><td>Cualquiera (Dataverse o no)</td><td>Solo Dataverse</td></tr>
            <tr><td>Propósito principal</td><td>Tarea específica, orientada a pantalla</td><td>Back office, orientada a proceso</td></tr>
            <tr><td>Interfaz</td><td>UI personalizada — el creador decide todo</td><td>Responsive y consistente — generada por el sistema</td></tr>
            <tr><td>Casos típicos</td><td>Apps de campo, formularios móviles, captura rápida</td><td>Gestión de casos, CRM, operaciones, seguimiento</td></tr>
          </table>
          <div class="mini-note">En la práctica, la solución más habitual combina ambas: una app de lienzo para los técnicos/agentes de campo y una app basada en modelo para los managers que supervisan — y comparten el mismo Dataverse.</div>
        </div>

      </div>
    </article>

    <!-- MÓDULO 2 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 2 DE 3</span><h3>Crear una app de lienzo</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/build-canvas-app/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-canvas-app/2-connect-data-sources-use-connectors" target="_blank" rel="noopener">2 · Fuentes de datos</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-canvas-app/3-create-app-data" target="_blank" rel="noopener">3 · Crear app desde datos</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-canvas-app/4-describe-common-controls" target="_blank" rel="noopener">4 · Controles comunes</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-canvas-app/6-create-modify-app-through-conversations" target="_blank" rel="noopener">6 · Crear/modificar por conversación</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-canvas-app/8-describe-capabilities-copilot-controls" target="_blank" rel="noopener">8 · Controles Copilot</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-canvas-app/9-describe-use-cases-agent-builder" target="_blank" rel="noopener">9 · Agent Builder</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-canvas-app/11-share-canvas-app" target="_blank" rel="noopener">11 · Compartir</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Fuentes de datos: cuál elegir y cuándo</p>
        <div class="sub-body">
          <p>Cuatro opciones principales sin coste adicional inmediato, de menor a mayor potencia:</p>
          <ul>
            <li><strong>Excel:</strong> solo si los datos están formateados como tabla dentro del archivo. Si alguien lo tiene abierto para editar, bloquea el acceso desde la app. Útil para datos estáticos o apps con un solo usuario a la vez. Opción de último recurso entre estas cuatro.</li>
            <li><strong>SharePoint:</strong> listas y bibliotecas de documentos. Sin límite de listas por app. Evitar columnas complejas; mejor columnas simples (texto, número, sí/no, fecha). Ojo con la delegación: listas de más de 100 elementos se paginan y una consulta fuera del límite de delegación puede devolver datos incompletos (aviso de triángulo amarillo en los controles).</li>
            <li><strong>SQL Server:</strong> fuente premium, excelente para grandes volúmenes. Si el servidor es local, se necesita una puerta de enlace de datos local para conectarlo a la app en la nube.</li>
            <li><strong>Dataverse:</strong> la opción más potente. Sin API calls, el app accede directo al entorno. Relaciones entre tablas automáticas, escalabilidad, seguridad por fila, y plena integración con Copilot (la funcionalidad de IA generativa completa solo está disponible con Dataverse como fuente).</li>
          </ul>
        </div>

        <p class="subhead">▸ Crear y modificar por conversación con Copilot</p>
        <div class="sub-body">
          <p>Desde la página principal del Power Apps Maker Portal hay una caja de texto de Copilot donde describes la app en lenguaje natural. Copilot genera las tablas de Dataverse necesarias y la app completa. Puedes pedirle ajustes adicionales en el mismo diálogo ("añade una pantalla para reportar incidencias", "cambia el color de fondo a gris claro") y los aplica automáticamente. También sugiere campos con tipos de dato apropiados para el contexto que describes, aunque siempre puedes revisarlos y modificarlos antes de confirmar. Para publicar los cambios, hay que guardar y luego publicar explícitamente — sin publicar, los usuarios siguen viendo la versión anterior.</p>
        </div>

        <p class="subhead">▸ Controles Copilot: IA dentro de la app para el usuario final</p>
        <div class="sub-body">
          <p>Son controles embebidos en la app que permiten a los <em>usuarios finales</em> interactuar con los datos de la app en lenguaje natural — distintos de Copilot como herramienta de construcción. Un técnico de campo puede escribir "¿cuál es el estado de la solicitud #12345?" y el control responde en tiempo real sin que tenga que navegar entre pantallas. También pueden automatizar acciones ("actualiza el ticket #12345 a 'resuelto'") ejecutándolas directamente en la tabla de Dataverse conectada. Son especialmente útiles para usuarios móviles o usuarios con poca experiencia técnica. Se añaden desde Power Apps Studio → Insertar → AI Builder → Copilot.</p>
          <div class="mini-note">La funcionalidad de controles Copilot requiere activar opciones en Configuración → Funciones próximas o experimentales dentro del Studio, dependiendo del entorno y la versión.</div>
        </div>

        <p class="subhead">▸ Agent Builder: crear agentes IA desde una app existente</p>
        <div class="sub-body">
          <p>Agent Builder genera agentes de IA directamente desde las apps de lienzo, usando la estructura y lógica de la app (metadatos, orígenes de datos, flujos de trabajo) para construir el agente. El creador describe en lenguaje natural el proceso que quiere automatizar ("que el agente ayude a los usuarios a comprobar el estado de sus tickets de soporte y a abrir nuevos"), y Agent Builder extrae los pasos, los desencadenadores y el conocimiento relevante de la app para generar el agente. El resultado es un agente publicado en Copilot Studio que puede automatizar tareas rutinarias, guiar a los usuarios paso a paso y proporcionar asistencia proactiva — sin necesidad de construirlo desde cero en Copilot Studio. Se accede desde Power Apps → Agentes → Crear un agente desde una app.</p>
        </div>

      </div>
    </article>

    <!-- MÓDULO 3 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 3 DE 3</span><h3>Crear una app basada en modelo</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/build-model-driven-app/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-model-driven-app/2-components-model-driven-apps" target="_blank" rel="noopener">2 · Componentes</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-model-driven-app/3-create-model-driven-app-tables" target="_blank" rel="noopener">3 · Crear desde tablas</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-model-driven-app/4-modify-forms" target="_blank" rel="noopener">4 · Modificar formularios</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-model-driven-app/5-create-modify-views" target="_blank" rel="noopener">5 · Vistas</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/build-model-driven-app/7-share-model-driven-app" target="_blank" rel="noopener">7 · Compartir y seguridad</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Los 4 tipos de componentes de una app basada en modelo</p>
        <div class="sub-body">
          <p>Todo lo que conforma una app basada en modelo se agrupa en cuatro categorías:</p>
          <ul>
            <li><strong>Datos:</strong> tablas (como hojas de Excel pero con relaciones), columnas (propiedades tipadas: texto, número, fecha, moneda, búsqueda…), relaciones (1:N y N:N), y columnas de opción (listas desplegables con valores predefinidos).</li>
            <li><strong>UI (interfaz):</strong> la propia app (con su URL y propiedades), el mapa del sitio (navegación), formularios (definición de qué columnas se muestran al editar/ver un registro), vistas (qué lista de registros se muestra y con qué columnas y filtros), y páginas personalizadas (páginas tipo lienzo embebidas dentro de una app basada en modelo — útil para partes de la app que necesitan más flexibilidad de diseño).</li>
            <li><strong>Lógica:</strong> business process flows (flujos que guían al usuario por un proceso estándar paso a paso, pueden cruzar múltiples tablas), reglas de negocio (sin código — para validar datos, mostrar/ocultar campos, establecer valores en formularios) y flujos de Power Automate (automatizaciones entre apps y servicios).</li>
            <li><strong>Visualizaciones:</strong> gráficos individuales (barras, sectores) incrustables en vistas o formularios, paneles (dashboards que agrupan varios gráficos para una visión general) y Power BI embebido (tiles e informes de Power BI directamente dentro de la app).</li>
          </ul>
        </div>

        <p class="subhead">▸ Compartir una app basada en modelo: seguridad por roles</p>
        <div class="sub-body">
          <p>Las apps basadas en modelo usan seguridad basada en roles (RBAC) para controlar el acceso — más estricta que las apps de lienzo, donde simplemente se comparte un enlace. Compartir una app implica dos pasos: asignar roles de seguridad a los usuarios o equipos (definiendo qué pueden ver, editar o borrar en cada tabla) y luego compartir el enlace de la app. Sin rol asignado, el usuario no puede acceder ni a la app ni a sus datos.</p>
          <p>Un mismo usuario puede tener múltiples roles. Los roles pueden ser predefinidos (Usuario básico, Administrador del sistema) o personalizados. Es importante coordinar con el administrador de Power Platform para que los roles estén creados en Dataverse antes de compartir. El diseño responsive de las apps basadas en modelo garantiza que funcionen igual en escritorio, tablet y móvil sin configuración adicional.</p>
        </div>

      </div>
    </article>

  </section>

  <section class="block-section" id="bloque4">
    <span class="section-label">Bloque 4 · Crear con Power Pages</span>
    <h2>Demostrar las capacidades de Microsoft Power Pages</h2>
    <p class="section-intro">Ruta oficial: <a href="https://learn.microsoft.com/es-es/training/paths/demonstrate-capabilities-microsoft-power-pages/" target="_blank" rel="noopener">«Demostrar las capacidades de Microsoft Power Pages»</a> — principiante, sin requisitos previos, 2 módulos. Power Pages es el producto de Power Platform para crear sitios web externos que se conectan a Dataverse — el bloque más corto, pero con un perfil de seguridad distinto al resto.</p>

    <!-- MÓDULO 1 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 1 DE 2</span><h3>Describir las capacidades de Microsoft Power Pages</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/describe-capabilities-microsoft-power-pages/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/describe-capabilities-microsoft-power-pages/2-describe-use-cases-power-pages" target="_blank" rel="noopener">2 · Casos de uso</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/describe-capabilities-microsoft-power-pages/3-describe-methods-create-sites" target="_blank" rel="noopener">3 · Métodos para crear sitios</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/describe-capabilities-microsoft-power-pages/4-describe-power-pages-security-concepts" target="_blank" rel="noopener">4 · Seguridad</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Qué es Power Pages y para qué sirve</p>
        <div class="sub-body">
          <p>Power Pages es la plataforma de Power Platform para crear, hospedar y administrar sitios web externos modernos con datos de Dataverse. A diferencia de Power Apps (apps internas para empleados), Power Pages está pensado para usuarios <em>fuera</em> de la organización — clientes, socios, ciudadanos. Se integra de forma nativa con el resto de Power Platform: los datos de los formularios del sitio van a Dataverse, que a su vez puede alimentar Power Apps (gestión interna) o Power BI (análisis). Los tres casos de uso principales son:</p>
          <ul>
            <li><strong>Portales de cliente:</strong> autoservicio para que los clientes consulten pedidos, abran tickets, gestionen cuentas o accedan a historiales. Útil en retail, sanidad, banca.</li>
            <li><strong>Sitios de colaboración con socios:</strong> acceso compartido a datos de inventario, documentación, actualizaciones de proyectos. Útil en fabricación, tecnología, inmobiliaria.</li>
            <li><strong>Plataformas de autoservicio para empleados:</strong> gestión de solicitudes de RRHH, acceso a documentos de política, formación, inscripción en beneficios — sin saturar al equipo de RRHH. Útil en educación, hostelería, administración pública.</li>
          </ul>
          <div class="mini-note">Caso real del módulo: King County (Washington, EE.UU.) implementó más de 200 soluciones con Power Platform, entre ellas varios portales con Power Pages — reducción del proceso de inscripción de ONG de 30 a 10 minutos, sistema de programación de vacunación durante la pandemia, y portal de prevención de caídas para mayores.</div>
        </div>

        <p class="subhead">▸ Métodos para crear un sitio: 4 opciones</p>
        <div class="sub-body">
          <ul>
            <li><strong>Copilot IA:</strong> describes el sitio en lenguaje natural y Copilot genera nombre, URL, layout de la página principal y páginas adicionales. La opción más rápida para partir de una base sólida.</li>
            <li><strong>Desde cero (lienzo en blanco):</strong> control total sobre cada detalle desde el principio. Adecuado cuando las necesidades son muy específicas o no encajan con ninguna plantilla.</li>
            <li><strong>Developer site:</strong> acceso a herramientas pro-code, APIs y funcionalidad avanzada. Para proyectos complejos que superan el alcance del low-code.</li>
            <li><strong>Design Studio (low-code):</strong> entorno visual con edición en contexto, widgets sin código y opciones de estilo. El camino más habitual para la mayoría de creadores.</li>
          </ul>
          <p>El Design Studio se organiza en 5 áreas de trabajo especializadas:</p>
          <table class="prompt-table">
            <tr><th>Área</th><th>Para qué</th></tr>
            <tr><td>Pages</td><td>Diseñar páginas: texto, imágenes, vídeos, formularios — sin código</td></tr>
            <tr><td>Styling</td><td>Estilos globales: temas, paletas de color, tipografía, botones, identidad corporativa</td></tr>
            <tr><td>Data</td><td>Gestionar tablas, formularios y vistas de Dataverse desde el sitio</td></tr>
            <tr><td>Set up</td><td>Configurar proveedores de identidad, seguridad, permisos y opciones de publicación</td></tr>
            <tr><td>Security</td><td>Panel centralizado de monitorización y gestión de la seguridad del sitio</td></tr>
          </table>
        </div>

        <p class="subhead">▸ Modelo de seguridad de Power Pages</p>
        <div class="sub-body">
          <p>La seguridad de Power Pages cubre dos dimensiones: <strong>autenticación</strong> (quién puede acceder al sitio) y <strong>autorización</strong> (a qué datos o páginas puede acceder). Los cinco elementos clave:</p>
          <ul>
            <li><strong>Visibilidad del sitio:</strong> público o privado. Por defecto, todos los sitios nuevos se crean como privados.</li>
            <li><strong>Autenticación:</strong> los usuarios autenticados se representan en Dataverse como contactos. Se pueden autenticar con credenciales locales (almacenadas en Dataverse) o con proveedores externos: Microsoft Entra External ID, Microsoft, Twitter, Facebook y otros.</li>
            <li><strong>Permisos de tabla:</strong> definen qué filas de Dataverse puede ver, crear, editar o borrar un usuario — independientemente de cómo acceda al sitio.</li>
            <li><strong>Permisos de página:</strong> controlan qué páginas son accesibles para cada usuario o rol.</li>
            <li><strong>Roles web:</strong> vinculan usuarios con permisos, definiendo el nivel de acceso a datos y contenido del sitio — tanto para usuarios autenticados como para visitantes anónimos.</li>
          </ul>
        </div>

      </div>
    </article>

    <!-- MÓDULO 2 -->
    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MÓDULO 2 DE 2</span><h3>Crear un sitio de Microsoft Power Pages</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/es-es/training/modules/create-microsoft-power-pages-site/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/create-microsoft-power-pages-site/2-create-modify-power-pages-sites-use-copilot" target="_blank" rel="noopener">2 · Crear y modificar con Copilot</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/create-microsoft-power-pages-site/3-explore-power-pages-design-studio" target="_blank" rel="noopener">3 · Design Studio</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/create-microsoft-power-pages-site/5-create-modify-pages" target="_blank" rel="noopener">5 · Crear y modificar páginas</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/create-microsoft-power-pages-site/7-modify-power-pages-theme" target="_blank" rel="noopener">7 · Temas y estilos</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/create-microsoft-power-pages-site/9-apply-power-pages-security" target="_blank" rel="noopener">9 · Aplicar seguridad</a>
      </div>

      <span class="synth-label">Síntesis</span>
      <div class="synth">

        <p class="subhead">▸ Crear y modificar un sitio con Copilot</p>
        <div class="sub-body">
          <p>Desde <a href="https://make.powerpages.microsoft.com/" target="_blank" rel="noopener">make.powerpages.microsoft.com</a>, describes el sitio en la caja de texto de Copilot ("crea un sitio para que los clientes encuentren asesores financieros según sus cualificaciones") y Copilot genera la estructura completa: nombre, URL, homepage con layout y páginas adicionales con contenido HTML e imágenes. El proceso tarda entre 40 y 150 segundos. Luego puedes refinar el resultado en el mismo diálogo de Copilot o pasar al editor WYSIWYG del Design Studio.</p>
          <p>Copilot ya puede hacer cosas como añadir nuevas páginas con un layout específico, generar formularios detallados desde una descripción breve (y crear automáticamente la tabla de Dataverse correspondiente), y ajustar textos y temas. Limitaciones actuales a tener en cuenta: no puede renombrar páginas por nombre ("renombra 'Contacto' a 'Contáctanos'"), no puede reordenar el mapa del sitio, no puede añadir botones de navegación a páginas específicas, y no puede añadir campos de búsqueda (lookup). Estas limitaciones están sujetas a cambios a medida que el producto madura.</p>
          <div class="mini-note">Requisito: el modelo de datos mejorado debe estar activado en el entorno para usar Copilot en la creación de sitios.</div>
        </div>

        <p class="subhead">▸ Seguridad aplicada: autenticación, permisos y visibilidad</p>
        <div class="sub-body">
          <p>Toda la configuración de seguridad se gestiona desde el <strong>Security Workspace</strong> del Design Studio. El flujo habitual de configuración sigue esta lógica:</p>
          <ul>
            <li><strong>Visibilidad:</strong> mantener el sitio privado durante el desarrollo; cambiar a público solo al lanzar. Esto evita que usuarios externos accedan a contenido incompleto o no revisado.</li>
            <li><strong>Autenticación:</strong> elegir los proveedores que encajan con el perfil del usuario. Un portal corporativo interno usará autenticación de Microsoft para restringir el acceso a empleados con cuenta de empresa; un sitio de registro de eventos puede ofrecer LinkedIn o Google para mayor comodidad del usuario externo.</li>
            <li><strong>Permisos de tabla:</strong> definir qué registros de Dataverse puede ver cada usuario. Ejemplo: en un portal de cliente, un usuario solo debe ver su propio historial de pedidos, no el de otros clientes.</li>
            <li><strong>Roles web:</strong> asignar roles diferenciados (Cliente, Manager, Administrador) que determinan qué contenido y qué funcionalidad están disponibles. Los visitantes anónimos (sin sesión iniciada) pueden tener acceso limitado a las partes públicas del sitio.</li>
          </ul>
          <p>El módulo también destaca la importancia de las prácticas de IA responsable al usar Copilot: revisar todo el contenido generado antes de publicarlo, evitar incluir datos sensibles en los prompts, y verificar que el resultado se alinea con los estándares de la organización.</p>
        </div>

      </div>
    </article>

  </section>

  <footer>
    <p id="foot-vigencia" style="background:rgba(255,177,61,0.1); border-left:3px solid #ffb13d; border-radius:8px; padding:12px 16px; margin-bottom:18px; color:var(--text); font-size:13.5px; line-height:1.6;"><strong style="color:#ffb13d;">⚠ Vigencia del contenido —</strong> última verificación contra fuentes oficiales: <strong>22 de junio de 2026</strong> (4/4 bloques). Power Platform incorpora funciones de Copilot en cada producto a un ritmo rápido — lo descrito aquí puede quedar incompleto a medida que Microsoft añade capacidades. Ante cualquier duda, confirma siempre contra el botón "Ver módulo oficial" de la sección correspondiente antes que contra esta guía.</p>
    <span class="section-label">Estado de la guía</span>
    <p style="color:var(--text-dim); margin:6px 0 18px;">Los 4 bloques están construidos y validados contra las rutas oficiales de Microsoft Learn (base del examen PL-900). Power Automate queda fuera de este archivo a propósito — tiene su propio archivo dedicado en Centro de Mando.</p>
    <p>Esta guía sintetiza y enlaza la documentación oficial de Microsoft Learn; no la sustituye. Todo el contenido está redactado de cero a partir de las rutas y módulos citados — usa los enlaces para verificar o profundizar en cualquier punto. Cerrada el 22 de junio de 2026 · <strong>v1.0</strong> · 4/4 bloques.</p>
  </footer>

</main>

<button class="top-btn" id="topBtn" aria-label="Volver arriba" title="Volver arriba">↑</button>
  </div>
</template>

<style>

  html.mod-power-platform{
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
  html.mod-power-platform[data-theme="light"], html.mod-power-platform [data-theme="light"]{
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
  html.mod-power-platform *{box-sizing:border-box;}
  html.mod-power-platform{scroll-behavior:smooth;}
  @media (prefers-reduced-motion: reduce){ html.mod-power-platform{scroll-behavior:auto;} html.mod-power-platform *{animation-duration:0.01ms !important; transition-duration:0.01ms !important;} }
  html.mod-power-platform body{
    margin:0; background:var(--bg); color:var(--text);
    font-family:var(--ff-body); font-size:16px; line-height:1.6;
    -webkit-font-smoothing:antialiased;
    transition:background .25s ease, color .25s ease;
  }
  html.mod-power-platform h1,html.mod-power-platform h2,html.mod-power-platform h3,html.mod-power-platform h4{ font-family:var(--ff-display); margin:0; line-height:1.15; font-weight:700; letter-spacing:-0.01em;}
  html.mod-power-platform a{ color:var(--accent); text-decoration:none; }
  html.mod-power-platform a:hover{ text-decoration:underline; }
  html.mod-power-platform a:focus-visible, html.mod-power-platform button:focus-visible{ outline:2px solid var(--teal); outline-offset:2px; border-radius:4px;}
  html.mod-power-platform .wrap{ max-width:var(--maxw); margin:0 auto; padding:0 24px; }
  html.mod-power-platform code, html.mod-power-platform .mono{ font-family:var(--ff-mono); }

  /* Topbar */
  html.mod-power-platform .topbar{ position:sticky; top:0; z-index:30; backdrop-filter:blur(10px); background:color-mix(in srgb, var(--bg) 86%, transparent); border-bottom:1px solid var(--border-soft);}
  html.mod-power-platform .topbar-inner{ max-width:var(--maxw); margin:0 auto; padding:14px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px;}
  html.mod-power-platform .brand{ display:flex; align-items:center; gap:10px; font-family:var(--ff-display); font-weight:700; font-size:18px;}
  html.mod-power-platform .brand .badge-fam{ font-family:var(--ff-mono); font-size:10px; font-weight:600; color:var(--text-faint); border:1px solid var(--border-soft); padding:2px 7px; border-radius:99px; letter-spacing:.04em;}
  html.mod-power-platform .brand .badge-ver{ font-family:var(--ff-mono); font-size:10px; font-weight:700; color:var(--teal); background:var(--teal-soft); padding:2px 7px; border-radius:99px; letter-spacing:.03em;}
  html.mod-power-platform .brand .badge-ver--wip{ color:var(--accent); background:var(--accent-soft);}
  html.mod-power-platform .theme-btn{ background:var(--bg-card); border:1px solid var(--border-soft); color:var(--text); width:38px; height:38px; border-radius:99px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:16px; transition:transform .15s ease, border-color .15s ease;}
  html.mod-power-platform .theme-btn:hover{ border-color:var(--accent); transform:scale(1.06);}

  /* Botón volver arriba */
  html.mod-power-platform .top-btn{ position:fixed; right:22px; bottom:22px; z-index:40; width:44px; height:44px; border-radius:99px; background:var(--bg-card); border:1px solid var(--border); color:var(--accent); font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:var(--shadow); opacity:0; visibility:hidden; transform:translateY(8px); transition:opacity .2s ease, transform .2s ease, border-color .15s ease;}
  html.mod-power-platform .top-btn.show{ opacity:1; visibility:visible; transform:translateY(0);}
  html.mod-power-platform .top-btn:hover{ border-color:var(--accent); background:var(--accent-soft);}
  @media (max-width:640px){ html.mod-power-platform .top-btn{ right:14px; bottom:14px; width:40px; height:40px;} }

  /* Source strip */
  html.mod-power-platform .source-strip{ background:linear-gradient(90deg, var(--accent-soft), transparent); border-bottom:1px solid var(--border-soft); font-family:var(--ff-mono); font-size:12.5px; color:var(--text-dim);}
  html.mod-power-platform .source-strip .wrap{ display:flex; align-items:center; gap:8px; padding:9px 24px; flex-wrap:wrap;}
  html.mod-power-platform .source-strip .wrap.vigencia{ padding-top:0; padding-bottom:9px; border-top:1px dashed var(--border-soft); margin-top:0;}
  html.mod-power-platform .source-strip .pin{ color:var(--accent); }
  html.mod-power-platform .source-strip .pin.warn{ color:#ffb13d; }
  html.mod-power-platform .source-strip a{ color:var(--text); border-bottom:1px dotted var(--accent); }
  html.mod-power-platform .source-strip a:hover{ text-decoration:none; color:var(--accent);}
  html.mod-power-platform .source-strip .vig-link{ color:#ffb13d; border-bottom:1px dotted #ffb13d; font-weight:600;}
  html.mod-power-platform .source-strip .vig-link:hover{ color:#ffb13d; }

  /* Block nav pills */
  html.mod-power-platform .block-nav{ position:sticky; top:65px; z-index:25; background:color-mix(in srgb, var(--bg) 92%, transparent); backdrop-filter:blur(8px); border-bottom:1px solid var(--border-soft); }
  html.mod-power-platform .block-nav-inner{ max-width:var(--maxw); margin:0 auto; padding:10px 24px; display:flex; gap:8px; overflow-x:auto; scrollbar-width:thin; }
  html.mod-power-platform .nav-pill{ flex-shrink:0; display:inline-flex; align-items:center; gap:6px; font-family:var(--ff-mono); font-size:12px; font-weight:600; padding:7px 14px; border-radius:99px; border:1px solid var(--border-soft); color:var(--text-dim); white-space:nowrap; cursor:pointer; transition:all .15s ease; background:var(--bg-card);}
  html.mod-power-platform .nav-pill .dot{ width:6px; height:6px; border-radius:50%; background:var(--text-faint); flex-shrink:0;}
  html.mod-power-platform .nav-pill.available{ color:var(--text); border-color:var(--border); }
  html.mod-power-platform .nav-pill.available .dot{ background:var(--teal); }
  html.mod-power-platform .nav-pill.pending .dot{ background:var(--accent); opacity:.6;}
  html.mod-power-platform .nav-pill.pending::after{ content:"↗"; font-size:10px; opacity:.5; margin-left:1px;}
  html.mod-power-platform .nav-pill:hover{ border-color:var(--accent); color:var(--accent); text-decoration:none;}
  html.mod-power-platform .nav-pill.active{ background:var(--accent-soft); border-color:var(--accent); color:var(--accent);}

  /* Hero */
  html.mod-power-platform .hero{ padding:56px 0 36px; }
  html.mod-power-platform .level-badge{ display:inline-flex; align-items:center; gap:8px; font-family:var(--ff-mono); font-size:12px; font-weight:600; color:var(--accent); background:var(--accent-soft); border:1px solid var(--border); padding:6px 12px; border-radius:99px; letter-spacing:.03em; margin-bottom:18px;}
  html.mod-power-platform .hero h1{ font-size:clamp(34px,5.5vw,52px); margin-bottom:14px;}
  html.mod-power-platform .hero h1 .accent{ color:var(--accent); }
  html.mod-power-platform .hero p.lead{ font-size:18px; color:var(--text-dim); max-width:640px; margin-bottom:0;}
  html.mod-power-platform .hero-meta{ display:flex; gap:28px; margin-top:28px; flex-wrap:wrap;}
  html.mod-power-platform .hero-meta div{ font-family:var(--ff-mono); font-size:12px; color:var(--text-faint);}
  html.mod-power-platform .hero-meta strong{ display:block; font-family:var(--ff-display); font-size:22px; color:var(--text); font-weight:700;}

  /* Section headers */
  html.mod-power-platform .section-label{ font-family:var(--ff-mono); font-size:12px; font-weight:600; color:var(--teal); letter-spacing:.08em; text-transform:uppercase; margin-bottom:8px; display:block;}
  html.mod-power-platform section.block-section{ padding:34px 0;}
  html.mod-power-platform section.block-section h2{ font-size:clamp(24px,3.4vw,30px); margin-bottom:10px;}
  html.mod-power-platform .section-intro{ color:var(--text-dim); max-width:680px; margin-bottom:28px;}

  /* Roadmap */
  html.mod-power-platform .roadmap-nivel{ margin-bottom:30px;}
  html.mod-power-platform .roadmap-nivel-title{ font-family:var(--ff-mono); font-size:12px; color:var(--text-faint); text-transform:uppercase; letter-spacing:.08em; margin-bottom:12px; display:flex; align-items:center; gap:10px;}
  html.mod-power-platform .roadmap-nivel-title::after{ content:""; flex:1; height:1px; background:var(--border-soft);}
  html.mod-power-platform .roadmap-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px;}
  html.mod-power-platform .road-card{ background:var(--bg-card); border:1px solid var(--border-soft); border-radius:var(--radius); padding:18px 18px 16px; transition:border-color .15s ease, transform .15s ease;}
  html.mod-power-platform .road-card.done{ border-color:var(--border); }
  html.mod-power-platform .road-card:hover{ transform:translateY(-2px); border-color:var(--accent);}
  html.mod-power-platform .road-card-top{ display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;}
  html.mod-power-platform .road-num{ font-family:var(--ff-mono); font-size:12px; color:var(--text-faint);}
  html.mod-power-platform .status-pill{ font-family:var(--ff-mono); font-size:10.5px; font-weight:600; padding:3px 9px; border-radius:99px; letter-spacing:.03em;}
  html.mod-power-platform .status-pill.disponible{ background:var(--teal-soft); color:var(--teal); }
  html.mod-power-platform .status-pill.pendiente{ background:var(--border-soft); color:var(--text-faint);}
  html.mod-power-platform .road-card h3{ font-size:16.5px; margin-bottom:6px;}
  html.mod-power-platform .road-card p{ font-size:13.5px; color:var(--text-dim); margin:0 0 12px; line-height:1.5;}
  html.mod-power-platform .road-source{ font-family:var(--ff-mono); font-size:11.5px; display:flex; align-items:center; gap:6px; color:var(--text-faint);}
  html.mod-power-platform .road-source a{ color:var(--text-dim);}
  html.mod-power-platform .road-source a:hover{ color:var(--accent);}

  /* Module cards */
  html.mod-power-platform .module-card{ background:var(--bg-card); border:1px solid var(--border-soft); border-radius:var(--radius); padding:26px 26px 24px; margin-bottom:22px; box-shadow:var(--shadow);}
  html.mod-power-platform .module-head{ display:flex; align-items:flex-start; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:14px; padding-bottom:16px; border-bottom:1px solid var(--border-soft);}
  html.mod-power-platform .module-num{ font-family:var(--ff-mono); font-size:12px; color:var(--accent); font-weight:600; letter-spacing:.05em; margin-bottom:4px; display:block;}
  html.mod-power-platform .module-head h3{ font-size:22px; }
  html.mod-power-platform .module-link{ font-family:var(--ff-mono); font-size:12.5px; white-space:nowrap; border:1px solid var(--border); padding:7px 13px; border-radius:99px; color:var(--accent); flex-shrink:0;}
  html.mod-power-platform .module-link:hover{ background:var(--accent-soft); text-decoration:none;}
  html.mod-power-platform .units-list{ display:flex; flex-wrap:wrap; gap:8px; margin:0 0 20px;}
  html.mod-power-platform .unit-chip{ font-family:var(--ff-mono); font-size:12px; color:var(--text-dim); background:var(--bg-elev); border:1px solid var(--border-soft); padding:6px 11px; border-radius:8px; transition:border-color .15s, color .15s;}
  html.mod-power-platform .unit-chip:hover{ border-color:var(--teal); color:var(--teal); text-decoration:none;}
  html.mod-power-platform .synth-label{ font-family:var(--ff-mono); font-size:11.5px; font-weight:600; color:var(--teal); text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; display:block;}
  html.mod-power-platform .module-card .synth p{ margin:0 0 12px; color:var(--text); font-size:15px;}
  html.mod-power-platform .module-card .synth p:last-child{ margin-bottom:0;}
  html.mod-power-platform .module-card .synth strong{ color:var(--text); font-weight:700;}
  html.mod-power-platform .mini-list{ margin:0 0 14px; padding-left:20px; color:var(--text);}
  html.mod-power-platform .mini-list li{ margin-bottom:7px; font-size:15px;}

  html.mod-power-platform .callout{ background:var(--teal-soft); border:1px solid rgba(62,201,176,0.3); border-left:3px solid var(--teal); border-radius:var(--radius-sm); padding:14px 18px; margin:16px 0; font-size:14.5px;}
  html.mod-power-platform .callout strong{ color:var(--teal); display:block; font-family:var(--ff-mono); font-size:11.5px; text-transform:uppercase; letter-spacing:.05em; margin-bottom:6px;}
  html.mod-power-platform .callout.novedad{ background:var(--accent-soft); border-color:rgba(255,157,61,0.35); border-left-color:var(--accent);}
  html.mod-power-platform .callout.novedad strong{ color:var(--accent); }

  html.mod-power-platform table.prompt-table{ width:100%; border-collapse:collapse; margin:14px 0 18px; font-size:14px;}
  html.mod-power-platform table.prompt-table th, html.mod-power-platform table.prompt-table td{ text-align:left; padding:10px 12px; border-bottom:1px solid var(--border-soft); vertical-align:top;}
  html.mod-power-platform table.prompt-table th{ font-family:var(--ff-mono); font-size:11px; text-transform:uppercase; letter-spacing:.04em; color:var(--text-faint); font-weight:600;}
  html.mod-power-platform table.prompt-table td.bad{ color:var(--text-faint); font-style:italic;}

  /* Subsecciones técnicas */
  html.mod-power-platform .subhead{ font-family:var(--ff-mono); font-size:12px; font-weight:700; color:var(--teal); text-transform:uppercase; letter-spacing:.05em; margin:20px 0 8px; display:flex; align-items:center; gap:8px;}
  html.mod-power-platform .subhead:first-of-type{ margin-top:6px;}
  html.mod-power-platform .sub-body{ font-size:14px; color:var(--text-dim); line-height:1.6;}
  html.mod-power-platform .sub-body ul{ margin:6px 0 10px; padding-left:18px;}
  html.mod-power-platform .sub-body li{ margin-bottom:5px;}
  html.mod-power-platform .code-line{ font-family:var(--ff-mono); font-size:12.5px; background:var(--bg-elev); border:1px solid var(--border-soft); border-radius:6px; padding:9px 13px; margin:8px 0; color:var(--teal); overflow-x:auto; white-space:pre;}
  html.mod-power-platform .mini-note{ background:var(--teal-soft); border-left:3px solid var(--teal); border-radius:6px; padding:9px 13px; font-size:13px; margin:8px 0;}

  /* Checklist de despliegue */
  html.mod-power-platform .deploy-checklist{ display:grid; gap:14px;}
  html.mod-power-platform .deploy-phase{ background:var(--bg-card); border:1px solid var(--border-soft); border-radius:var(--radius); padding:16px 20px;}
  html.mod-power-platform .deploy-phase h4{ font-size:14.5px; color:var(--accent); margin:0 0 10px; font-family:var(--ff-mono); text-transform:uppercase; letter-spacing:.04em;}
  html.mod-power-platform .deploy-phase ul{ list-style:none; margin:0; padding:0; display:grid; gap:7px;}
  html.mod-power-platform .deploy-phase li{ font-size:13.5px; color:var(--text-dim); padding-left:24px; position:relative; line-height:1.5;}
  html.mod-power-platform .deploy-phase li::before{ content:"☐"; position:absolute; left:0; color:var(--accent); font-size:14px;}

  /* Footer */
  html.mod-power-platform footer{ border-top:1px solid var(--border-soft); margin-top:50px; padding:32px 0 50px;}
  html.mod-power-platform footer p{ color:var(--text-faint); font-size:13px; max-width:640px;}

  @media (max-width:640px){
    html.mod-power-platform .hero{ padding:40px 0 24px;}
    html.mod-power-platform .module-card{ padding:20px 18px;}
    html.mod-power-platform .hero-meta{ gap:18px;}
  }

</style>
