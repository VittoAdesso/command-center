<script setup>
import { ref } from 'vue'
import { useGuiaViva } from '../../composables/useGuiaViva'

const rootRef = ref(null)

useGuiaViva(rootRef, {
  title: "Centro de Mando · Power BI — Guía viva",
  scopeClass: "mod-power-bi",
  themeStorageKey: "cm-pbi-theme",
  blocks: ["bloque1","bloque2","bloque3","bloque4"],
  spyMode: "exclusive",
  enableCopyBtns: false,
})
</script>

<template>
  <div ref="rootRef">
<div class="topbar">
  <div class="topbar-inner">
    <div class="brand">📡 Centro de Mando <span class="badge-fam">POWER BI · GUÍA VIVA</span><span class="badge-ver">v1.0 · completa</span></div>
    <button class="theme-btn" id="themeToggle" aria-label="Cambiar tema">🌙</button>
  </div>
</div>

<div class="source-strip">
  <div class="wrap">
    <span class="pin">📍</span>
    <span>Fuentes principales:</span>
    <a href="https://learn.microsoft.com/en-us/training/paths/prepare-visualize-data-power-bi/" target="_blank" rel="noopener">DP-605 (Prepare &amp; Visualize)</a>
    <span style="color:var(--text-faint)">·</span>
    <a href="https://learn.microsoft.com/en-us/training/paths/model-data-power-bi/" target="_blank" rel="noopener">PL-300 (Model data)</a>
    <span style="color:var(--text-faint)">· Bloques 2 y 4 enriquecidos con conocimiento de CoE.</span>
  </div>
  <div class="wrap vig">
    <span class="pin w">⚠</span>
    <span>Power BI evoluciona rápido (Copilot, Fabric). Confirma siempre contra los módulos oficiales antes que contra esta guía.</span>
  </div>
</div>

<nav class="block-nav" aria-label="Bloques">
  <div class="block-nav-inner">
    <a class="nav-pill" href="#bloque1"><span class="dot"></span>1 · Fundamentos y datos</a>
    <a class="nav-pill" href="#bloque2"><span class="dot"></span>2 · Modelar y preparar</a>
    <a class="nav-pill" href="#bloque3"><span class="dot"></span>3 · Visualizar y analizar</a>
    <a class="nav-pill" href="#bloque4"><span class="dot"></span>4 · Gobernanza CoE</a>
  </div>
</nav>

<button class="top-btn" id="topBtn" aria-label="Volver arriba">↑</button>

<div class="wrap">
  <div class="hero">
    <span class="level-badge">● GUÍA COMPLETA · 4/4 BLOQUES</span>
    <h1>Power <span class="accent">BI</span>,<br>del dato al informe.</h1>
    <p class="lead">Guía completa: fundamentos, modelado, Power Query, DAX y gobernanza para el CoE. Construida sobre las rutas oficiales DP-605 y PL-300 de Microsoft Learn.</p>
    <div class="hero-meta">
      <div><strong>DP-605 + PL-300</strong>rutas oficiales</div>
      <div><strong>DAX + M</strong>con código real</div>
      <div><strong>CoE-ready</strong>gobernanza incluida</div>
    </div>
  </div>

  <!-- ===== BLOQUE 1 ===== -->
  <section class="block-section" id="bloque1">
    <span class="section-label">Bloque 1 · Fundamentos y datos</span>
    <h2>Componentes, flujo y conectar datos</h2>
    <p class="section-intro">Fuente: <a href="https://learn.microsoft.com/en-us/training/modules/get-started-with-power-bi/" target="_blank" rel="noopener">«Get started building with Power BI»</a> + <a href="https://learn.microsoft.com/en-us/training/modules/get-data/" target="_blank" rel="noopener">«Get data in Power BI»</a>.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">COMPONENTES Y FLUJO</span><h3>Los tres componentes y el flujo de 6 pasos</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/en-us/training/modules/get-started-with-power-bi/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/get-started-with-power-bi/2-using-power-bi" target="_blank" rel="noopener">2 · Usar Power BI</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/get-started-with-power-bi/3-building-blocks-of-power-bi" target="_blank" rel="noopener">3 · Bloques fundamentales</a>
      </div>
      <span class="synth-label">Síntesis</span>
      <div class="synth">
        <p class="subhead">▸ Los tres componentes</p>
        <div class="sub-body">
          <table class="pt">
            <tr><th>Componente</th><th>Qué es</th><th>Para quién</th></tr>
            <tr><td><strong>Power BI Desktop</strong></td><td>App Windows gratuita para crear informes y modelos. URL de descarga: Microsoft Store o instalador directo.</td><td>Analistas y creadores</td></tr>
            <tr><td><strong>Power BI Service</strong></td><td>Plataforma online (<code>app.powerbi.com</code>) para publicar, organizar y compartir contenido.</td><td>Toda la organización</td></tr>
            <tr><td><strong>Power BI Mobile</strong></td><td>App iOS/Android para consumir informes en formato optimizado para móvil.</td><td>Usuarios en movilidad</td></tr>
          </table>
        </div>
        <p class="subhead">▸ Flujo de trabajo estándar — 6 pasos</p>
        <div class="sub-body">
          <div class="flow-steps">
            <div class="flow-step"><span class="num">1</span><div class="txt"><strong>Conectar datos</strong> — elegir la fuente (Excel, SQL, SharePoint, API…)</div></div>
            <div class="flow-step"><span class="num">2</span><div class="txt"><strong>Transformar con Power Query</strong> — limpiar y dar forma antes de cargar</div></div>
            <div class="flow-step"><span class="num">3</span><div class="txt"><strong>Modelar</strong> — definir relaciones, medidas DAX y jerarquías</div></div>
            <div class="flow-step"><span class="num">4</span><div class="txt"><strong>Crear visualizaciones</strong> — arrastrar campos al canvas, elegir visuals, filtros</div></div>
            <div class="flow-step"><span class="num">5</span><div class="txt"><strong>Publicar al servicio</strong> — subir el .pbix al workspace en Power BI Service</div></div>
            <div class="flow-step"><span class="num">6</span><div class="txt"><strong>Distribuir y gestionar</strong> — compartir, crear dashboards, programar actualizaciones</div></div>
          </div>
          <div class="mini-note">Pasos 1-4 en Desktop. Pasos 5-6 en el Servicio. Mobile es canal de consumo, no de creación.</div>
        </div>
        <p class="subhead">▸ Informe vs dashboard — la distinción clave</p>
        <div class="sub-body">
          <ul>
            <li><strong>Informe:</strong> múltiples páginas con visuals interactivos. Se crea en Desktop y se publica al servicio. Los usuarios pueden filtrar, hacer drill-through, interactuar.</li>
            <li><strong>Dashboard:</strong> una sola página en el servicio, hecha de <em>tiles</em> pinchados desde informes. Los tiles no son interactivos — al hacer clic llevan al informe de origen. Visión de alto nivel de KPIs críticos.</li>
          </ul>
          <div class="warn-note"><strong>Error habitual:</strong> confundir dashboard con informe. El análisis detallado ocurre en el informe — el dashboard solo muestra las métricas más importantes de un vistazo.</div>
        </div>
      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">CONECTAR DATOS</span><h3>Fuentes, modos de almacenamiento y puerta de enlace</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/en-us/training/modules/get-data/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <div class="units-list">
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/get-data/2-data-files" target="_blank" rel="noopener">2 · Archivos</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/get-data/3-relational-data" target="_blank" rel="noopener">3 · BD relacionales</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/get-data/5-online-services" target="_blank" rel="noopener">5 · Servicios online</a>
        <a class="unit-chip" href="https://learn.microsoft.com/en-us/training/modules/get-data/6-storage-mode" target="_blank" rel="noopener">6 · Modos de almacenamiento</a>
      </div>
      <span class="synth-label">Síntesis</span>
      <div class="synth">
        <p class="subhead">▸ Los 3 modos de almacenamiento — decisión clave</p>
        <div class="sub-body">
          <table class="pt">
            <tr><th>Modo</th><th>Cómo funciona</th><th>Cuándo</th><th>Limitaciones</th></tr>
            <tr><td><strong>Import</strong> (defecto)</td><td>Los datos se copian dentro del modelo. Consultas en memoria.</td><td>La gran mayoría de casos. Máximo rendimiento y funcionalidades (Copilot, Q&amp;A).</td><td>Requiere actualización programada. Límite de tamaño (1 GB en Pro).</td></tr>
            <tr><td><strong>DirectQuery</strong></td><td>Sin copia local. Cada interacción lanza una consulta a la BD original.</td><td>Datos muy grandes, requisitos de seguridad que impiden copiar, necesidad de tiempo real.</td><td>Rendimiento más lento. Algunas funciones DAX no disponibles.</td></tr>
            <tr><td><strong>Dual (Composite)</strong></td><td>Combina Import y DirectQuery en el mismo modelo tabla a tabla.</td><td>Algunas tablas pequeñas (import) + otras grandes o en tiempo real (DirectQuery).</td><td>Mayor complejidad de diseño.</td></tr>
          </table>
          <div class="mini-note">Regla práctica: empezar siempre con Import. Solo pasar a DirectQuery cuando hay una razón de peso (tamaño, seguridad, tiempo real). Import tiene mejor rendimiento y más funcionalidades.</div>
        </div>
        <p class="subhead">▸ Puerta de enlace de datos local</p>
        <div class="sub-body">
          <p>Para que el Servicio acceda a fuentes locales (SQL Server en servidores de empresa, archivos en red compartida), hay que instalar una <strong>puerta de enlace de datos local</strong> en una máquina dentro de la red corporativa. Sin ella, la actualización programada de datos locales no funciona.</p>
        </div>
      </div>
    </article>
  </section>

  <!-- ===== BLOQUE 2 ===== -->
  <section class="block-section" id="bloque2">
    <span class="section-label">Bloque 2 · Modelar y preparar</span>
    <h2>Esquema estrella, relaciones, Power Query</h2>
    <p class="section-intro">Fuentes: <a href="https://learn.microsoft.com/en-us/training/modules/configure-semantic-model-power-bi/" target="_blank" rel="noopener">«Configure a semantic model»</a> + <a href="https://learn.microsoft.com/en-us/training/modules/clean-data-power-bi/" target="_blank" rel="noopener">«Clean, transform and load data»</a>. El modelado es la decisión más costosa de cambiar — un modelo mal diseñado afecta al rendimiento, al DAX y al mantenimiento.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">MODELADO</span><h3>Esquema estrella, relaciones y tabla de Calendario</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/en-us/training/modules/configure-semantic-model-power-bi/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <span class="synth-label">Síntesis</span>
      <div class="synth">
        <p class="subhead">▸ Esquema estrella: hechos y dimensiones</p>
        <div class="sub-body">
          <table class="pt">
            <tr><th>Tabla</th><th>Contiene</th><th>Columnas típicas</th></tr>
            <tr><td><strong>Hechos (fact)</strong></td><td>Eventos medibles — ventas, pedidos, incidencias, horas. Una fila por transacción.</td><td>Claves foráneas hacia dimensiones + columnas numéricas (importe, cantidad). Sin atributos descriptivos.</td></tr>
            <tr><td><strong>Dimensión</strong></td><td>Atributos para filtrar y agrupar. Una fila por entidad única.</td><td>Clave primaria + todos los atributos descriptivos (nombre, categoría, región, estado).</td></tr>
          </table>
          <p>Regla rápida: si una columna se usa para <strong>sumar/contar/promediar</strong> → tabla de hechos. Para <strong>filtrar o agrupar</strong> → tabla de dimensión.</p>
          <div class="warn-note"><strong>Evitar el esquema copo de nieve</strong> — dimensiones normalizadas en sub-tablas. Power BI no se beneficia de esa normalización: añade complejidad sin ganancia. Mejor aplanar las jerarquías en Power Query antes de cargar.</div>
        </div>
        <p class="subhead">▸ Relaciones: cardinalidad y dirección de filtro</p>
        <div class="sub-body">
          <ul>
            <li><strong>1 a varios (1:*):</strong> la relación estándar. Dimensión (1) → Hechos (*). Buscar siempre este patrón.</li>
            <li><strong>Varios a varios (*:*):</strong> a evitar. Suele indicar que falta una tabla puente. Si es inevitable, el comportamiento de filtrado es menos predecible.</li>
            <li><strong>Dirección única:</strong> filtro de dimensión → hechos. Opción por defecto y correcta en casi todos los casos.</li>
            <li><strong>Bidireccional:</strong> usar solo cuando hay necesidad concreta y documentar por qué. Puede causar ambigüedad en modelos con múltiples tablas de hechos compartiendo una dimensión.</li>
            <li><strong>Relaciones inactivas:</strong> cuando dos tablas tienen más de una posible relación (FechaPedido y FechaEntrega contra Calendario), solo una activa. Las demás se activan puntualmente con <code>USERELATIONSHIP()</code> dentro de una medida.</li>
          </ul>
        </div>
        <p class="subhead">▸ Tabla de Calendario — obligatoria para time intelligence</p>
        <div class="sub-body">
          <p>Sin ella, las funciones de time intelligence DAX no funcionan o producen resultados incorrectos. Requisitos:</p>
          <ul>
            <li>Una fila por día sin huecos, cubriendo el rango de los datos.</li>
            <li>Columna <code>Fecha</code> de tipo Date como clave.</li>
            <li>Columnas adicionales: Año, Mes (número y nombre), Trimestre, Semana, Día semana, Año-Mes (texto "2024-01" para ordenar visualmente).</li>
            <li>Marcarla explícitamente como "tabla de fechas" en Power BI (clic derecho → Marcar como tabla de fechas).</li>
          </ul>
          <div class="mini-note">Creación rápida en DAX: <code>Calendario = CALENDAR(MIN(Ventas[Fecha]), MAX(Ventas[Fecha]))</code> y luego añadir columnas calculadas para Año, Mes, etc.</div>
        </div>
        <p class="subhead">▸ Propiedades del modelo: jerarquías, orden y visibilidad</p>
        <div class="sub-body">
          <ul>
            <li><strong>Jerarquías:</strong> agrupar columnas (Año → Trimestre → Mes → Día) para habilitar el drill-down en visuals.</li>
            <li><strong>Ocultar columnas técnicas:</strong> IDs y columnas auxiliares que el usuario final no necesita → Hide in report view. Limpia el modelo y reduce errores de uso.</li>
            <li><strong>Ordenar por columna:</strong> para que el nombre del mes se ordene como "Enero, Febrero…" y no alfabéticamente, usar "Ordenar por columna" → número de mes.</li>
            <li><strong>Formato explícito:</strong> asignar siempre el formato de visualización a columnas numéricas y de fecha. Nunca dejar "General".</li>
          </ul>
        </div>
      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">POWER QUERY / M</span><h3>Transformar datos antes de que lleguen al modelo</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/en-us/training/modules/clean-data-power-bi/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <span class="synth-label">Síntesis</span>
      <div class="synth">
        <p class="subhead">▸ Regla de decisión: Power Query vs DAX</p>
        <div class="sub-body">
          <p>Si la transformación es la <strong>misma para todas las filas</strong> y no depende de lo que el usuario filtra → <strong>Power Query</strong>. Si el resultado cambia según los filtros del informe → <strong>DAX</strong>.</p>
        </div>
        <p class="subhead">▸ Query folding — clave en orígenes SQL</p>
        <div class="sub-body">
          <p>Cuando el origen es una base de datos, Power Query intenta traducir los pasos a SQL que se ejecuta en el servidor (folding), en vez de traer todo y procesar localmente. Verificar: clic derecho en un paso → "Ver consulta nativa". Si la opción aparece en gris, el folding se rompió. Hacer los filtros y la selección de columnas lo más al principio posible para no romperlo.</p>
        </div>
        <p class="subhead">▸ Patrones de transformación con código M</p>
        <div class="sub-body">
<pre class="dax"><span class="cm">-- Despivotar: columnas de meses → filas (de "ancho" a "largo")</span>
= Table.UnpivotOtherColumns(Origen, {"Producto", "Categoría"}, "Mes", "Valor")

<span class="cm">-- Merge (LEFT JOIN): combinar dos consultas por clave</span>
= Table.NestedJoin(TablaA, "ClaveA", TablaB, "ClaveB", "TablaB", JoinKind.LeftOuter)

<span class="cm">-- Append (UNION): apilar filas de varias tablas con la misma estructura</span>
= Table.Combine({TablaA, TablaB, TablaC})

<span class="cm">-- Tipos explícitos: siempre mejor que dejar que Power Query infiera</span>
= Table.TransformColumnTypes(Origen, &#123;&#123;"Fecha", type date}, {"Importe", type number}})</pre>
        </div>
        <p class="subhead">▸ Buenas prácticas</p>
        <div class="sub-body">
          <ul>
            <li><strong>Renombrar los pasos</strong> con nombres descriptivos, no "Tabla cambiada1".</li>
            <li><strong>Deshabilitar la carga</strong> de consultas auxiliares/staging que no deben llegar al modelo.</li>
            <li><strong>Usar parámetros</strong> para rutas de archivo y nombres de servidor — nunca hardcodear.</li>
            <li><strong>Agrupar consultas en carpetas</strong> ("Staging", "Dimensiones", "Hechos", "Parámetros") cuando el modelo tiene muchas consultas.</li>
          </ul>
        </div>
      </div>
    </article>
  </section>

  <!-- ===== BLOQUE 3 ===== -->
  <section class="block-section" id="bloque3">
    <span class="section-label">Bloque 3 · Visualizar y analizar</span>
    <h2>Visuals, filtros, DAX y el servicio</h2>
    <p class="section-intro">Fuentes: <a href="https://learn.microsoft.com/en-us/training/modules/power-bi-effective-reports/" target="_blank" rel="noopener">«Design Power BI Reports»</a> + <a href="https://learn.microsoft.com/en-us/training/paths/model-data-power-bi/" target="_blank" rel="noopener">«Model data with Power BI (PL-300)»</a> + <a href="https://learn.microsoft.com/en-us/training/modules/power-bi-copilot/" target="_blank" rel="noopener">«Copilot in Power BI»</a>.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">VISUALIZACIONES Y FILTROS</span><h3>Elegir el visual correcto y controlar los filtros</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/en-us/training/modules/power-bi-effective-reports/" target="_blank" rel="noopener">Ver módulo oficial ↗</a>
      </div>
      <span class="synth-label">Síntesis</span>
      <div class="synth">
        <p class="subhead">▸ Guía de selección de visuals</p>
        <div class="sub-body">
          <table class="pt">
            <tr><th>Tipo de análisis</th><th>Visuals recomendados</th><th>Evitar</th></tr>
            <tr><td><strong>Categórico</strong></td><td>Barras/columnas ordenadas por valor.</td><td>Línea con eje X categórico — implica relación entre categorías que no existe.</td></tr>
            <tr><td><strong>Serie temporal</strong></td><td>Línea o columnas con tiempo en eje X (izq→der). La línea admite previsión.</td><td>Barras horizontales para tiempo. Línea con períodos sin datos (conecta gaps con línea recta falsa).</td></tr>
            <tr><td><strong>Proporcional</strong></td><td>Barras/columnas apiladas 100%, embudo, treemap.</td><td>Tarta/donut con más de 4-5 categorías o valores similares.</td></tr>
            <tr><td><strong>KPI / número único</strong></td><td>Card, KPI visual (valor + objetivo + varianza), Gauge.</td><td>Tabla con un único valor — pierde impacto.</td></tr>
            <tr><td><strong>Detalle / jerarquía</strong></td><td>Tabla o Matriz con formato condicional (barras de datos, iconos).</td><td>Tablas con decenas de columnas sin agrupar.</td></tr>
            <tr><td><strong>Geoespacial</strong></td><td>Mapa de burbujas (nivel ciudad), Mapa relleno (nivel región/país).</td><td>Mapa relleno a nivel ciudad — polígonos demasiado pequeños.</td></tr>
          </table>
          <div class="mini-note">Principio: el visual correcto permite entender el dato en 3 segundos sin leer el título. Si hay que explicar cómo leerlo, el visual está mal elegido.</div>
        </div>
        <p class="subhead">▸ Los 5 niveles de filtrado</p>
        <div class="sub-body">
          <ol>
            <li><strong>Modelo (RLS):</strong> seguridad a nivel de fila. El informe no puede anularlo.</li>
            <li><strong>Filtro de informe:</strong> afecta a todas las páginas y visuals.</li>
            <li><strong>Filtro de página:</strong> solo a los visuals de una página concreta.</li>
            <li><strong>Filtro de visual:</strong> solo a un visual concreto. Puede filtrar por medida.</li>
            <li><strong>Medida (DAX):</strong> puede modificar el contexto de filtro internamente con CALCULATE.</li>
          </ol>
          <p>Los filtros del panel se pueden <strong>bloquear</strong> (el usuario no los modifica) u <strong>ocultar</strong> (no los ve). Útil para filtros de limpieza de datos o filtros críticos de negocio.</p>
        </div>
        <p class="subhead">▸ Slicers: el filtro interactivo para el usuario</p>
        <div class="sub-body">
          <ul>
            <li>Layouts: lista, desplegable, rango numérico, rango de fechas, fecha relativa (últimos N días, este mes).</li>
            <li>El desplegable ocupa menos espacio y solo lanza la consulta al abrirse — preferible en informes grandes.</li>
            <li>Con <strong>sync slicers</strong>, una selección en la página 1 se mantiene al navegar a otras páginas del mismo informe.</li>
            <li>Se puede forzar selección única (útil para escenarios mutuamente excluyentes: Real / Presupuesto / Previsión).</li>
          </ul>
        </div>
      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">DAX</span><h3>Medidas, CALCULATE, time intelligence y patrones</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/en-us/training/paths/model-data-power-bi/" target="_blank" rel="noopener">Ver ruta oficial PL-300 ↗</a>
      </div>
      <span class="synth-label">Síntesis</span>
      <div class="synth">
        <p class="subhead">▸ Medidas vs columnas calculadas</p>
        <div class="sub-body">
          <table class="pt">
            <tr><th></th><th>Medida</th><th>Columna calculada</th></tr>
            <tr><td><strong>Cuándo calcula</strong></td><td>Al vuelo, según el contexto de filtro activo</td><td>Una vez al cargar — se materializa fila a fila</td></tr>
            <tr><td><strong>Contexto</strong></td><td>De filtro (qué ha seleccionado el usuario)</td><td>De fila (puede ver los valores de la misma fila)</td></tr>
            <tr><td><strong>Memoria</strong></td><td>No ocupa — se calcula dinámicamente</td><td>Sí — columna almacenada en el modelo</td></tr>
            <tr><td><strong>Usar cuando</strong></td><td>El resultado debe responder a los filtros del informe</td><td>Necesitas un valor estático por fila para filtrar/agrupar</td></tr>
          </table>
          <div class="warn-note"><strong>Error muy común:</strong> crear columnas calculadas cuando debería ser medida. Si el resultado necesita responder al slicer del usuario → medida.</div>
        </div>
        <p class="subhead">▸ CALCULATE y modificadores de filtro</p>
        <div class="sub-body">
<pre class="dax"><span class="cm">-- CALCULATE evalúa una expresión en un contexto de filtro modificado</span>
Ventas Categoría A = CALCULATE([Total Ventas], Ventas[Categoría] = "A")

<span class="cm">-- % del total: eliminar el filtro de categoría para obtener el total global</span>
% del Total =
DIVIDE(
    [Total Ventas],
    CALCULATE([Total Ventas], REMOVEFILTERS(Ventas[Categoría]))
)

<span class="cm">-- Preferir DIVIDE sobre / para evitar errores de división por cero</span>
% ventas = DIVIDE([Ventas Región], [Total Ventas])

<span class="cm">-- Variables: legibilidad + rendimiento (evalúa cada VAR una sola vez)</span>
Margen % =
VAR Ingresos = [Total Ventas]
VAR Costes   = [Total Costes]
RETURN DIVIDE(Ingresos - Costes, Ingresos)</pre>
          <p>Modificadores clave: <code>REMOVEFILTERS</code> (elimina filtros), <code>ALLEXCEPT</code> (elimina todos menos los indicados), <code>KEEPFILTERS</code> (añade sin sustituir), <code>USERELATIONSHIP</code> (activa relación inactiva).</p>
        </div>
        <p class="subhead">▸ Time intelligence — patrones fundamentales</p>
        <div class="sub-body">
<pre class="dax"><span class="cm">-- Acumulado año hasta la fecha</span>
Ventas YTD = TOTALYTD([Total Ventas], Calendario[Fecha])

<span class="cm">-- Mismo período año anterior</span>
Ventas Año Anterior = CALCULATE([Total Ventas], SAMEPERIODLASTYEAR(Calendario[Fecha]))

<span class="cm">-- Variación interanual %</span>
Variación YoY % =
VAR Actual    = [Total Ventas]
VAR Anterior  = [Ventas Año Anterior]
RETURN DIVIDE(Actual - Anterior, Anterior)

<span class="cm">-- Mes anterior</span>
Ventas Mes Anterior = CALCULATE([Total Ventas], DATEADD(Calendario[Fecha], -1, MONTH))</pre>
          <div class="mini-note">Requiere tabla de Calendario marcada y relacionada con la tabla de hechos. Sin ella, estas funciones no funcionan correctamente.</div>
        </div>
        <p class="subhead">▸ Patrones comunes</p>
        <div class="sub-body">
<pre class="dax">Ranking Producto     = RANKX(ALL(Producto[Nombre]), [Total Ventas], , DESC)
Nº Clientes Únicos  = DISTINCTCOUNT(Ventas[ClienteID])
Ventas Online        = CALCULATE([Total Ventas], Ventas[Canal] = "Online")

<span class="cm">-- Iterador: cuando SUM no basta (cálculo depende de varias columnas por fila)</span>
Ingresos Calculados  = SUMX(Ventas, Ventas[Cantidad] * Ventas[PrecioUnitario] * (1 - Ventas[Descuento]))</pre>
          <p>Usar <code>SUMX</code> solo cuando <code>SUM(columna de importe)</code> no funcione — SUMX itera fila a fila y es más lento. Si una medida es lenta, revisar primero el modelo (relaciones, cardinalidad, tipos de dato) antes de optimizar el DAX.</p>
        </div>
      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">SERVICIO Y COPILOT</span><h3>Publicar, workspaces, dashboards y Copilot</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/en-us/training/modules/power-bi-copilot/" target="_blank" rel="noopener">Ver módulo Copilot ↗</a>
      </div>
      <span class="synth-label">Síntesis</span>
      <div class="synth">
        <p class="subhead">▸ Workspaces y flujo de publicación</p>
        <div class="sub-body">
          <ul>
            <li><strong>Mi área de trabajo:</strong> personal, sin posibilidad de compartir con otros usuarios. Solo para desarrollo propio.</li>
            <li><strong>Workspaces colaborativos:</strong> compartidos con roles (Administrador, Miembro, Colaborador, Espectador).</li>
            <li>Al publicar desde Desktop → Desktop sube dos objetos al servicio: el <strong>modelo semántico</strong> y el <strong>informe</strong>. Varios informes pueden reutilizar el mismo modelo semántico.</li>
            <li>Las <strong>apps de Power BI</strong> empaquetan informes y dashboards de un workspace en un único punto de acceso para los usuarios finales — instalan la app una vez y acceden a todo el contenido.</li>
          </ul>
        </div>
        <p class="subhead">▸ Copilot en Power BI</p>
        <div class="sub-body">
          <ul>
            <li><strong>Creación de informes:</strong> describe el informe en lenguaje natural y Copilot genera páginas con los visuals apropiados. También sugiere medidas DAX y puede explicar medidas existentes.</li>
            <li><strong>Copilot Chat:</strong> los usuarios del informe hacen preguntas ("¿cuál fue el mejor mes?", "¿qué región creció más?") y Copilot responde con visuals o texto desde el modelo semántico.</li>
            <li><strong>Para que Copilot funcione bien:</strong> nombres de tablas y columnas descriptivos y en el idioma del usuario, columnas técnicas ocultas, descripciones en medidas y tablas.</li>
          </ul>
          <div class="warn-note"><strong>Requisito de licencia:</strong> Copilot en Power BI requiere licencia Fabric (F64+) o Power BI Premium — no disponible en licencias Pro estándar. Verificar antes de prometer esta funcionalidad.</div>
        </div>
      </div>
    </article>
  </section>

  <!-- ===== BLOQUE 4 ===== -->
  <section class="block-section" id="bloque4">
    <span class="section-label">Bloque 4 · Gobernanza CoE</span>
    <h2>Naming conventions, documentación y ciclo de vida</h2>
    <p class="section-intro">Contenido de CoE: aplica especialmente cuando el modelo lo van a usar o mantener varias personas.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">CONVENCIONES Y DOCUMENTACIÓN</span><h3>Naming, tabla de medidas y documentar el modelo</h3></div>
      </div>
      <span class="synth-label">Síntesis</span>
      <div class="synth">
        <p class="subhead">▸ Naming conventions</p>
        <div class="sub-body">
          <table class="pt">
            <tr><th>Elemento</th><th>Bien ✓</th><th>Evitar ✗</th></tr>
            <tr><td>Medidas</td><td><code>Total Ventas</code>, <code>Margen %</code>, <code>Ventas Año Anterior</code></td><td><code>TotVtas</code>, <code>m_total_ventas</code>, <code>Measure 1</code></td></tr>
            <tr><td>Tablas de hechos</td><td><code>Ventas</code>, <code>Pedidos</code></td><td><code>fact_ventas</code>, <code>tbl_venta</code></td></tr>
            <tr><td>Dimensiones</td><td><code>Producto</code>, <code>Cliente</code>, <code>Calendario</code></td><td>Prefijos técnicos salvo que sea la convención del equipo y se aplique de forma consistente en todo el modelo</td></tr>
            <tr><td>Claves de relación</td><td><code>ProductoID</code> igual en todas las tablas que lo usan</td><td><code>IDProd</code> en una tabla y <code>ProductoKey</code> en otra</td></tr>
          </table>
          <div class="mini-note">La consistencia importa más que la convención elegida. Si ya existe una en el equipo, seguirla — cambiarla a mitad de proyecto genera más coste que beneficio.</div>
        </div>
        <p class="subhead">▸ Tabla de medidas dedicada</p>
        <div class="sub-body">
          <p>Crear una tabla vacía llamada <code>_Medidas</code> y mover ahí todas las medidas que no pertenecen naturalmente a una tabla de hechos concreta. El guión bajo la pone antes que el resto alfabéticamente en el panel de campos. Evita que las medidas queden enterradas dentro de tablas de dimensión.</p>
        </div>
        <p class="subhead">▸ Documentar cada medida</p>
        <div class="sub-body">
          <ul>
            <li><strong>Descripción</strong> (propiedad en Desktop → seleccionar medida → panel de propiedades): aparece como tooltip en el panel de campos. Una frase que explique qué calcula.</li>
            <li><strong>Formato explícito:</strong> moneda, porcentaje con decimales, número con separador de miles. Nunca "General".</li>
            <li><strong>Display Folder:</strong> carpetas temáticas cuando hay más de 10-15 medidas ("Ventas", "Márgenes", "Time Intelligence", "KPIs Dirección").</li>
          </ul>
        </div>
        <p class="subhead">▸ Organización de la vista de modelo</p>
        <div class="sub-body">
          <ul>
            <li>Organizar tablas visualmente con el <strong>esquema estrella</strong>: hechos en el centro, dimensiones alrededor. No dejar las tablas en el orden de importación.</li>
            <li>Ocultar claves de relación (IDs), columnas auxiliares de Power Query y cualquier columna que el usuario final no necesite.</li>
            <li>Verificar que todas las relaciones tienen la dirección de filtro correcta antes de publicar.</li>
          </ul>
        </div>
      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">CICLO DE VIDA Y CHECKLIST</span><h3>Versionado, dev/prod y checklist de entrega</h3></div>
      </div>
      <span class="synth-label">Síntesis</span>
      <div class="synth">
        <p class="subhead">▸ Versionado y separación dev/prod</p>
        <div class="sub-body">
          <ul>
            <li>Nombrar archivos .pbix con versión y fecha: <code>Informe_Ventas_v3_2026-06.pbix</code>. Evitar "final", "final2", "definitivo".</li>
            <li>Documentar cambios relevantes (nuevas medidas, cambios de relación, cambio de fuente) en un changelog simple cuando el modelo lo mantienen varias personas.</li>
            <li>Para modelos complejos o equipos más grandes: usar <strong>Power BI Projects (.pbip)</strong>, formato basado en texto compatible con Git/Azure DevOps.</li>
            <li>Publicar siempre en un workspace de desarrollo primero. Validar. Luego publicar al workspace de producción. Con Premium/Fabric: usar <strong>deployment pipelines</strong> para automatizar la promoción dev → test → prod.</li>
          </ul>
        </div>
        <p class="subhead">▸ Checklist antes de publicar en producción</p>
        <div class="sub-body">
          <div class="cl-grid">
            <div class="cl-card">
              <h4>Modelo</h4>
              <ul>
                <li>Esquema estrella — hechos y dimensiones separados</li>
                <li>Tabla de Calendario marcada como tabla de fechas</li>
                <li>Relaciones 1:* y dirección única salvo necesidad documentada</li>
                <li>Columnas técnicas/IDs ocultas en la vista de informe</li>
                <li>Tipos de dato correctos: Date, Number, Text</li>
                <li>Columnas de nombre de mes ordenadas por número de mes</li>
              </ul>
            </div>
            <div class="cl-card">
              <h4>Medidas y DAX</h4>
              <ul>
                <li>Todas las medidas en <code>_Medidas</code> o en la tabla de hechos correspondiente</li>
                <li>Formato explícito en todas las medidas</li>
                <li>Descripción rellenada en las medidas principales</li>
                <li>DIVIDE en vez de / en todas las divisiones</li>
                <li>VAR/RETURN en medidas con sub-expresiones repetidas</li>
                <li>Sin columnas calculadas donde debería haber medidas</li>
              </ul>
            </div>
            <div class="cl-card">
              <h4>Power Query</h4>
              <ul>
                <li>Pasos renombrados con nombres descriptivos</li>
                <li>Consultas auxiliares con "Habilitar carga" desactivado</li>
                <li>Sin rutas de archivo hardcodeadas — usar parámetros</li>
                <li>Tipos de columna asignados explícitamente</li>
                <li>Sin columnas innecesarias cargadas al modelo</li>
              </ul>
            </div>
            <div class="cl-card">
              <h4>Servicio y entrega</h4>
              <ul>
                <li>Publicado y validado en workspace de desarrollo primero</li>
                <li>Actualización programada configurada (con puerta de enlace si la fuente es local)</li>
                <li>Archivo .pbix versionado con fecha</li>
                <li>Changelog actualizado si hubo cambios relevantes</li>
                <li>Roles de workspace correctos (Espectador para usuarios finales)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>

</div>

<footer>
  <div class="wrap">
    <p style="background:rgba(255,177,61,0.1);border-left:3px solid #ffb13d;border-radius:8px;padding:12px 16px;margin-bottom:18px;color:var(--text);font-size:13.5px;line-height:1.6;"><strong style="color:#ffb13d;">⚠ Vigencia —</strong> última verificación: <strong>22 de junio de 2026</strong>. Power BI evoluciona rápido (Copilot, Fabric, nuevas funciones). Confirma siempre contra los módulos oficiales enlazados antes que contra esta guía.</p>
    <span class="section-label">Estado de la guía</span>
    <p style="color:var(--text-dim);margin:6px 0 18px;">4 bloques completos: fundamentos y datos (componentes, flujo, modos de almacenamiento), modelar y preparar (esquema estrella, relaciones, Calendario, Power Query con código M), visualizar y analizar (tipos de visual, filtros 5 niveles, DAX con código real, servicio y Copilot), y gobernanza CoE (naming, documentación, checklist de entrega). Construida sobre las rutas DP-605 y PL-300 de Microsoft Learn, enriquecida con conocimiento de CoE.</p>
    <p>Generada el 22 de junio de 2026 · <strong>v1.0</strong> · 4/4 bloques.</p>
  </div>
</footer>
  </div>
</template>

<style>

  html.mod-power-bi{
    --bg:#15120e;--bg-elev:#1c1710;--bg-card:#211b14;
    --border:rgba(255,157,61,0.16);--border-soft:rgba(255,255,255,0.07);
    --text:#f3ead9;--text-dim:#b3a48d;--text-faint:#7d7261;
    --accent:#ff9d3d;--accent-soft:rgba(255,157,61,0.13);
    --teal:#3ec9b0;--teal-soft:rgba(62,201,176,0.13);
    --radius:14px;--radius-sm:8px;
    --shadow:0 12px 32px -12px rgba(0,0,0,0.55);
    --maxw:980px;
    --ff-display:'Bricolage Grotesque',sans-serif;
    --ff-body:'Manrope',sans-serif;
    --ff-mono:'JetBrains Mono',monospace;
  }
  html.mod-power-bi[data-theme="light"], html.mod-power-bi [data-theme="light"]{
    --bg:#fbf6ee;--bg-elev:#f4ead9;--bg-card:#ffffff;
    --border:rgba(201,111,31,0.22);--border-soft:rgba(34,28,20,0.09);
    --text:#241d14;--text-dim:#5e5240;--text-faint:#8a7d68;
    --accent:#c96f1f;--accent-soft:rgba(201,111,31,0.10);
    --teal:#16876f;--teal-soft:rgba(22,135,111,0.10);
    --shadow:0 12px 28px -14px rgba(60,40,10,0.18);
  }
  html.mod-power-bi *{box-sizing:border-box;}html.mod-power-bi{scroll-behavior:smooth;}
  html.mod-power-bi body{margin:0;background:var(--bg);color:var(--text);font-family:var(--ff-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;transition:background .25s,color .25s;}
  html.mod-power-bi h1,html.mod-power-bi h2,html.mod-power-bi h3,html.mod-power-bi h4{font-family:var(--ff-display);margin:0;line-height:1.15;font-weight:700;letter-spacing:-0.01em;}
  html.mod-power-bi a{color:var(--accent);text-decoration:none;}html.mod-power-bi a:hover{text-decoration:underline;}
  html.mod-power-bi .wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px;}
  html.mod-power-bi code{font-family:var(--ff-mono);font-size:.88em;background:var(--bg-elev);padding:1px 5px;border-radius:4px;border:1px solid var(--border-soft);}
  html.mod-power-bi pre.dax{font-family:var(--ff-mono);font-size:12.5px;background:var(--bg-elev);border:1px solid var(--border-soft);border-left:3px solid var(--teal);border-radius:var(--radius-sm);padding:14px 16px;margin:10px 0 16px;overflow-x:auto;white-space:pre;color:var(--teal);line-height:1.5;}
  html.mod-power-bi pre.dax .cm{color:var(--text-faint);font-style:italic;}

  html.mod-power-bi .topbar{position:sticky;top:0;z-index:30;backdrop-filter:blur(10px);background:color-mix(in srgb,var(--bg) 86%,transparent);border-bottom:1px solid var(--border-soft);}
  html.mod-power-bi .topbar-inner{max-width:var(--maxw);margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
  html.mod-power-bi .brand{display:flex;align-items:center;gap:10px;font-family:var(--ff-display);font-weight:700;font-size:18px;}
  html.mod-power-bi .brand .badge-fam{font-family:var(--ff-mono);font-size:10px;font-weight:600;color:var(--text-faint);border:1px solid var(--border-soft);padding:2px 7px;border-radius:99px;letter-spacing:.04em;}
  html.mod-power-bi .brand .badge-ver{font-family:var(--ff-mono);font-size:10px;font-weight:700;color:var(--teal);background:var(--teal-soft);padding:2px 7px;border-radius:99px;letter-spacing:.03em;}
  html.mod-power-bi .theme-btn{background:var(--bg-card);border:1px solid var(--border-soft);color:var(--text);width:38px;height:38px;border-radius:99px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:transform .15s,border-color .15s;}
  html.mod-power-bi .theme-btn:hover{border-color:var(--accent);transform:scale(1.06);}

  html.mod-power-bi .top-btn{position:fixed;right:22px;bottom:22px;z-index:40;width:44px;height:44px;border-radius:99px;background:var(--bg-card);border:1px solid var(--border);color:var(--accent);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow);opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .2s,transform .2s;}
  html.mod-power-bi .top-btn.show{opacity:1;visibility:visible;transform:translateY(0);}
  html.mod-power-bi .top-btn:hover{border-color:var(--accent);}

  html.mod-power-bi .source-strip{background:linear-gradient(90deg,var(--accent-soft),transparent);border-bottom:1px solid var(--border-soft);font-family:var(--ff-mono);font-size:12.5px;color:var(--text-dim);}
  html.mod-power-bi .source-strip .wrap{display:flex;align-items:center;gap:8px;padding:9px 24px;flex-wrap:wrap;}
  html.mod-power-bi .source-strip .wrap.vig{padding-top:0;padding-bottom:9px;border-top:1px dashed var(--border-soft);}
  html.mod-power-bi .source-strip .pin{color:var(--accent);}
  html.mod-power-bi .source-strip .pin.w{color:#ffb13d;}
  html.mod-power-bi .source-strip a{color:var(--text);border-bottom:1px dotted var(--accent);}
  html.mod-power-bi .source-strip a:hover{color:var(--accent);text-decoration:none;}

  html.mod-power-bi .block-nav{position:sticky;top:65px;z-index:25;background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--border-soft);}
  html.mod-power-bi .block-nav-inner{max-width:var(--maxw);margin:0 auto;padding:10px 24px;display:flex;gap:8px;overflow-x:auto;scrollbar-width:thin;}
  html.mod-power-bi .nav-pill{flex-shrink:0;display:inline-flex;align-items:center;gap:6px;font-family:var(--ff-mono);font-size:12px;font-weight:600;padding:7px 14px;border-radius:99px;border:1px solid var(--border-soft);color:var(--text-dim);white-space:nowrap;cursor:pointer;transition:all .15s;background:var(--bg-card);}
  html.mod-power-bi .nav-pill .dot{width:6px;height:6px;border-radius:50%;background:var(--teal);flex-shrink:0;}
  html.mod-power-bi .nav-pill:hover{border-color:var(--accent);color:var(--accent);text-decoration:none;}
  html.mod-power-bi .nav-pill.active{background:var(--accent-soft);border-color:var(--accent);color:var(--accent);}

  html.mod-power-bi .hero{padding:56px 0 36px;}
  html.mod-power-bi .level-badge{display:inline-flex;align-items:center;gap:8px;font-family:var(--ff-mono);font-size:12px;font-weight:600;color:var(--accent);background:var(--accent-soft);border:1px solid var(--border);padding:6px 12px;border-radius:99px;letter-spacing:.03em;margin-bottom:18px;}
  html.mod-power-bi .hero h1{font-size:clamp(34px,5.5vw,52px);margin-bottom:14px;}
  html.mod-power-bi .hero h1 .accent{color:var(--accent);}
  html.mod-power-bi .hero p.lead{font-size:18px;color:var(--text-dim);max-width:640px;}
  html.mod-power-bi .hero-meta{display:flex;gap:28px;margin-top:28px;flex-wrap:wrap;}
  html.mod-power-bi .hero-meta div{font-family:var(--ff-mono);font-size:12px;color:var(--text-faint);}
  html.mod-power-bi .hero-meta strong{display:block;font-family:var(--ff-display);font-size:22px;color:var(--text);font-weight:700;}

  html.mod-power-bi .section-label{font-family:var(--ff-mono);font-size:12px;font-weight:600;color:var(--teal);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;display:block;}
  html.mod-power-bi section.block-section{padding:34px 0;}
  html.mod-power-bi section.block-section h2{font-size:clamp(24px,3.4vw,30px);margin-bottom:10px;}
  html.mod-power-bi .section-intro{color:var(--text-dim);max-width:680px;margin-bottom:28px;}

  html.mod-power-bi .module-card{background:var(--bg-card);border:1px solid var(--border-soft);border-radius:var(--radius);padding:26px 26px 24px;margin-bottom:22px;box-shadow:var(--shadow);}
  html.mod-power-bi .module-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:14px;padding-bottom:16px;border-bottom:1px solid var(--border-soft);}
  html.mod-power-bi .module-num{font-family:var(--ff-mono);font-size:12px;color:var(--accent);font-weight:600;letter-spacing:.05em;margin-bottom:4px;display:block;}
  html.mod-power-bi .module-head h3{font-size:22px;}
  html.mod-power-bi .module-link{font-family:var(--ff-mono);font-size:12.5px;white-space:nowrap;border:1px solid var(--border);padding:7px 13px;border-radius:99px;color:var(--accent);flex-shrink:0;}
  html.mod-power-bi .module-link:hover{background:var(--accent-soft);text-decoration:none;}
  html.mod-power-bi .units-list{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px;}
  html.mod-power-bi .unit-chip{font-family:var(--ff-mono);font-size:12px;color:var(--text-dim);background:var(--bg-elev);border:1px solid var(--border-soft);padding:6px 11px;border-radius:8px;transition:border-color .15s,color .15s;}
  html.mod-power-bi .unit-chip:hover{border-color:var(--teal);color:var(--teal);text-decoration:none;}
  html.mod-power-bi .synth-label{font-family:var(--ff-mono);font-size:11.5px;font-weight:600;color:var(--teal);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px;display:block;}
  html.mod-power-bi .module-card .synth p{margin:0 0 12px;color:var(--text);font-size:15px;}
  html.mod-power-bi .module-card .synth p:last-child{margin-bottom:0;}
  html.mod-power-bi .module-card .synth strong{color:var(--text);font-weight:700;}

  html.mod-power-bi .subhead{font-family:var(--ff-mono);font-size:12px;font-weight:700;color:var(--teal);text-transform:uppercase;letter-spacing:.05em;margin:20px 0 8px;display:flex;align-items:center;gap:8px;}
  html.mod-power-bi .subhead:first-of-type{margin-top:6px;}
  html.mod-power-bi .sub-body{font-size:14px;color:var(--text-dim);line-height:1.6;}
  html.mod-power-bi .sub-body ul,html.mod-power-bi .sub-body ol{margin:6px 0 10px;padding-left:18px;}
  html.mod-power-bi .sub-body li{margin-bottom:5px;}
  html.mod-power-bi .sub-body p{margin:0 0 10px;}
  html.mod-power-bi .sub-body strong{color:var(--text);}
  html.mod-power-bi .mini-note{background:var(--teal-soft);border-left:3px solid var(--teal);border-radius:6px;padding:9px 13px;font-size:13px;margin:8px 0;}
  html.mod-power-bi .warn-note{background:var(--accent-soft);border-left:3px solid var(--accent);border-radius:6px;padding:9px 13px;font-size:13px;margin:8px 0;}

  html.mod-power-bi table.pt{width:100%;border-collapse:collapse;margin:14px 0 18px;font-size:13.5px;}
  html.mod-power-bi table.pt th,html.mod-power-bi table.pt td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--border-soft);vertical-align:top;}
  html.mod-power-bi table.pt th{font-family:var(--ff-mono);font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--text-faint);font-weight:600;}

  html.mod-power-bi .flow-steps{display:grid;gap:10px;margin:12px 0 18px;}
  html.mod-power-bi .flow-step{display:flex;gap:14px;align-items:flex-start;background:var(--bg-elev);border:1px solid var(--border-soft);border-radius:var(--radius-sm);padding:12px 16px;}
  html.mod-power-bi .flow-step .num{font-family:var(--ff-mono);font-size:12px;font-weight:700;color:var(--accent);background:var(--accent-soft);padding:3px 9px;border-radius:99px;flex-shrink:0;margin-top:1px;}
  html.mod-power-bi .flow-step .txt{font-size:14px;color:var(--text-dim);}
  html.mod-power-bi .flow-step .txt strong{color:var(--text);}

  html.mod-power-bi .cl-grid{display:grid;gap:14px;}
  html.mod-power-bi .cl-card{background:var(--bg-card);border:1px solid var(--border-soft);border-radius:var(--radius);padding:16px 20px;}
  html.mod-power-bi .cl-card h4{font-size:14px;color:var(--accent);margin:0 0 10px;font-family:var(--ff-mono);text-transform:uppercase;letter-spacing:.04em;}
  html.mod-power-bi .cl-card ul{list-style:none;margin:0;padding:0;display:grid;gap:7px;}
  html.mod-power-bi .cl-card li{font-size:13.5px;color:var(--text-dim);padding-left:24px;position:relative;line-height:1.5;}
  html.mod-power-bi .cl-card li::before{content:"☐";position:absolute;left:0;color:var(--accent);font-size:14px;}

  html.mod-power-bi footer{border-top:1px solid var(--border-soft);margin-top:50px;padding:32px 0 50px;}
  html.mod-power-bi footer p{color:var(--text-faint);font-size:13px;max-width:640px;}
  @media(max-width:640px){html.mod-power-bi .hero{padding:40px 0 24px;}html.mod-power-bi .module-card{padding:20px 18px;}}

</style>
