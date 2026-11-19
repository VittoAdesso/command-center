<script setup>
import { ref } from 'vue'
import { useGuiaViva } from '../../composables/useGuiaViva'

const rootRef = ref(null)

useGuiaViva(rootRef, {
  title: "Centro de Mando · Excel — Guía viva",
  scopeClass: "mod-excel",
  themeStorageKey: "cm-xl-theme",
  blocks: ["bloque1","bloque2","bloque3","bloque4","bloque5"],
  spyMode: "exclusive",
  enableCopyBtns: false,
})
</script>

<template>
  <div ref="rootRef">
<div class="topbar">
  <div class="topbar-inner">
    <div class="brand">📡 Centro de Mando <span class="badge-fam">EXCEL · GUÍA VIVA</span><span class="badge-ver">v1.0 · completa</span></div>
    <button class="theme-btn" id="themeToggle" aria-label="Cambiar tema">🌙</button>
  </div>
</div>

<div class="source-strip">
  <div class="wrap">
    <span class="pin">📍</span>
    <span>Referencias:</span>
    <a href="https://support.microsoft.com/es-es/excel" target="_blank" rel="noopener">support.microsoft.com/excel</a>
    <span style="color:var(--text-faint)">·</span>
    <a href="https://learn.microsoft.com/en-us/training/modules/work-smarter-excel/" target="_blank" rel="noopener">Copilot Chat en Excel (Microsoft Learn)</a>
    <span style="color:var(--text-faint)">· Guía orientada a Excel 365.</span>
  </div>
</div>

<nav class="block-nav" aria-label="Bloques">
  <div class="block-nav-inner">
    <a class="nav-pill" href="#bloque1"><span class="dot"></span>1 · Tablas y estructura</a>
    <a class="nav-pill" href="#bloque2"><span class="dot"></span>2 · Fórmulas esenciales</a>
    <a class="nav-pill" href="#bloque3"><span class="dot"></span>3 · Análisis de datos</a>
    <a class="nav-pill" href="#bloque4"><span class="dot"></span>4 · Integración y CoE</a>
    <a class="nav-pill" href="#bloque5"><span class="dot"></span>5 · Fórmulas difíciles + Copilot</a>
  </div>
</nav>

<button class="top-btn" id="topBtn" aria-label="Volver arriba">↑</button>

<div class="wrap">
  <div class="hero">
    <span class="level-badge">● GUÍA COMPLETA · 5/5 BLOQUES</span>
    <h1><span class="accent">Excel</span>,<br>la navaja suiza del análisis.</h1>
    <p class="lead">Guía de referencia práctica: tablas, fórmulas modernas (XLOOKUP, arrays dinámicos), tablas dinámicas, Power Query en Excel y cómo integrar Excel con el resto del ecosistema Microsoft. Orientada a Excel 365.</p>
    <div class="hero-meta">
      <div><strong>Excel 365</strong>funciones modernas</div>
      <div><strong>Fórmulas reales</strong>con código</div>
      <div><strong>CoE-ready</strong>integración incluida</div>
    </div>
  </div>

  <!-- ===== BLOQUE 1 ===== -->
  <section class="block-section" id="bloque1">
    <span class="section-label">Bloque 1 · Tablas y estructura</span>
    <h2>La base antes de las fórmulas</h2>
    <p class="section-intro">Antes de escribir una sola fórmula, la estructura del libro condiciona si las fórmulas funcionarán bien y si el fichero será mantenible. Este bloque cubre las decisiones que se toman una vez y que determinan todo lo demás.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">TABLAS Y ESTRUCTURA</span><h3>Tablas formateadas, rangos con nombre y validación</h3></div>
        <a class="module-link" href="https://support.microsoft.com/es-es/office/crear-y-dar-formato-a-tablas-e81aa349-b006-4f8a-9806-5af9df0ac664" target="_blank" rel="noopener">Ver docs oficiales ↗</a>
      </div>
      <synth-label class="synth-label">Síntesis</synth-label>
      <div class="synth">

        <p class="subhead">▸ Tablas formateadas (Ctrl+T) — el hábito más importante</p>
        <div class="sub-body">
          <p>Convertir cualquier rango de datos en una <strong>Tabla</strong> (<kbd>Ctrl+T</kbd>) es el mejor hábito que se puede adquirir en Excel. Las ventajas son inmediatas y acumulativas:</p>
          <ul>
            <li><strong>Se expanden automáticamente:</strong> al añadir filas o columnas, la tabla crece sola y todas las fórmulas, formatos y referencias se actualizan.</li>
            <li><strong>Referencias estructuradas:</strong> en vez de <code>=SUMA(B2:B100)</code> se escribe <code>=SUMA(Ventas[Importe])</code> — más legible, no se rompe al insertar filas, y la columna se identifica por nombre.</li>
            <li><strong>Filtros automáticos:</strong> el encabezado tiene filtros de serie, accesibles por cualquier usuario.</li>
            <li><strong>Power Query las detecta automáticamente:</strong> al conectar desde Power Query o Power BI, una tabla formateada es una fuente más fiable que un rango suelto.</li>
            <li><strong>Nombre de tabla:</strong> asignar siempre un nombre descriptivo (pestaña "Diseño de tabla" → campo Nombre de tabla): <code>Ventas</code>, <code>Clientes</code>, <code>Presupuesto</code> — en vez de <code>Tabla1</code>.</li>
          </ul>
          <div class="warn-note"><strong>Nunca</strong> mezclar datos calculados (fórmulas) con datos de entrada en la misma columna de una tabla — la tabla asume que toda la columna sigue el mismo patrón. Si hay excepciones, usar columnas separadas.</div>
        </div>

        <p class="subhead">▸ Rangos con nombre — para fórmulas legibles</p>
        <div class="sub-body">
          <p>Asignar un nombre a una celda o rango (<strong>Fórmulas → Administrador de nombres</strong>) permite referenciarlos por nombre en cualquier fórmula del libro:</p>
<pre class="xl"><span class="cm">-- En vez de esto (frágil: si mueves las celdas, la fórmula falla)</span>
=SI(B3>=C5, "Aprobado", "Pendiente")

<span class="cm">-- Usar esto (claro y robusto)</span>
=SI(PuntuaciónActual>=UmbralAprobado, "Aprobado", "Pendiente")</pre>
          <p>Útil especialmente para parámetros que se usan en muchas fórmulas y que pueden cambiar (tipos de IVA, umbrales, fechas límite). Cambiar el valor en la celda nombrada actualiza todas las fórmulas que la referencian.</p>
        </div>

        <p class="subhead">▸ Validación de datos — controlar la entrada antes de que ocurra</p>
        <div class="sub-body">
          <p><strong>Datos → Validación de datos</strong> permite restringir qué valores puede introducir el usuario en una celda:</p>
          <ul>
            <li><strong>Lista desplegable:</strong> el usuario solo puede elegir entre valores predefinidos. La fuente puede ser un rango de una tabla (se actualiza si la tabla crece).</li>
            <li><strong>Número en rango:</strong> solo aceptar números entre X e Y, o fechas dentro de un período.</li>
            <li><strong>Mensaje de entrada:</strong> tooltip que aparece al seleccionar la celda, explicando qué se espera.</li>
            <li><strong>Alerta de error:</strong> mensaje personalizado cuando el usuario introduce un valor no válido (con opción de bloquear o solo advertir).</li>
          </ul>
          <div class="mini-note">Combinación potente: validación de datos + tabla formateada como fuente de la lista = el desplegable se actualiza automáticamente cuando alguien añade valores a la tabla fuente.</div>
        </div>

        <p class="subhead">▸ Atajos de productividad esenciales</p>
        <div class="sub-body">
          <div class="kb-row">
            <span class="kb"><kbd>Ctrl+T</kbd> Crear tabla</span>
            <span class="kb"><kbd>Ctrl+Shift+L</kbd> Filtros rápidos</span>
            <span class="kb"><kbd>Ctrl+1</kbd> Formato de celda</span>
            <span class="kb"><kbd>Ctrl+Shift+$</kbd> Formato moneda</span>
            <span class="kb"><kbd>Ctrl+Shift+%</kbd> Formato porcentaje</span>
            <span class="kb"><kbd>F4</kbd> Alternar referencia absoluta/relativa ($)</span>
            <span class="kb"><kbd>Ctrl+K</kbd> Insertar hipervínculo</span>
            <span class="kb"><kbd>Alt+Enter</kbd> Salto de línea en celda</span>
            <span class="kb"><kbd>Ctrl+;</kbd> Insertar fecha de hoy</span>
            <span class="kb"><kbd>Ctrl+Shift+:</kbd> Insertar hora actual</span>
            <span class="kb"><kbd>Ctrl+D</kbd> Rellenar hacia abajo</span>
            <span class="kb"><kbd>Ctrl+R</kbd> Rellenar hacia la derecha</span>
          </div>
        </div>

      </div>
    </article>
  </section>

  <!-- ===== BLOQUE 2 ===== -->
  <section class="block-section" id="bloque2">
    <span class="section-label">Bloque 2 · Fórmulas esenciales</span>
    <h2>Las fórmulas que más se usan en el trabajo real</h2>
    <p class="section-intro">Referencia: <a href="https://support.microsoft.com/es-es/office/funciones-de-excel-por-categor%C3%ADa-5f91f4e9-7b42-46d2-9bd1-63f26a86c0eb" target="_blank" rel="noopener">Funciones de Excel por categoría</a>. Las fórmulas siguientes son las que aparecen en el 90% de los flujos de trabajo habituales en un entorno de oficina con datos.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">BÚSQUEDA Y REFERENCIA</span><h3>XLOOKUP, BUSCARV y las alternativas modernas</h3></div>
        <a class="module-link" href="https://support.microsoft.com/es-es/office/función-xlookup-b7fd680e-6d10-43e6-84f9-88eae8bf5929" target="_blank" rel="noopener">Docs XLOOKUP ↗</a>
      </div>
      <synth-label class="synth-label">Síntesis</synth-label>
      <div class="synth">

        <p class="subhead">▸ XLOOKUP — el sustituto moderno de BUSCARV</p>
        <div class="sub-body">
<pre class="xl">=XLOOKUP(valor_buscado, matriz_buscada, matriz_devuelta, [si_no_hay], [modo_coincidencia], [modo_búsqueda])

<span class="cm">-- Búsqueda exacta básica: dado un ID de producto, devolver su nombre</span>
=XLOOKUP(A2, Productos[ID], Productos[Nombre])

<span class="cm">-- Con valor alternativo si no se encuentra (en vez de #N/A)</span>
=XLOOKUP(A2, Productos[ID], Productos[Nombre], "No encontrado")

<span class="cm">-- Buscar hacia la izquierda (imposible con BUSCARV)</span>
=XLOOKUP(A2, Tabla[Nombre], Tabla[ID])

<span class="cm">-- Búsqueda aproximada por rango (para escalas de descuento, rangos de calificación)</span>
=XLOOKUP(Puntuacion, Tabla[Min], Tabla[Calificación], , 1)
<span class="cm">-- Modo 1 = buscar el valor mayor o igual más cercano</span></pre>
          <p>Ventajas sobre BUSCARV: busca en cualquier dirección, no depende de la posición de la columna (no se rompe al insertar/eliminar columnas), maneja el "no encontrado" sin necesidad de envolver en <code>SI(ESNOD())</code>.</p>
          <div class="mini-note">Si la versión de Excel no tiene XLOOKUP (anterior a 2019 o no-365): usar <code>=INDICE(columna_devuelta, COINCIDIR(valor_buscado, columna_buscada, 0))</code> en vez de BUSCARV, por la misma razón de independencia de posición de columna.</div>
        </div>

        <p class="subhead">▸ Condicionales: SI, IFS y CAMBIAR</p>
        <div class="sub-body">
<pre class="xl"><span class="cm">-- SI básico</span>
=SI(B2>=1000, "Grande", "Pequeño")

<span class="cm">-- SI anidado (difícil de leer con más de 3 niveles)</span>
=SI(B2>=1000,"A", SI(B2>=500,"B", SI(B2>=100,"C","D")))

<span class="cm">-- IFS: más limpio para múltiples condiciones (365 / 2019+)</span>
=IFS(B2>=1000,"A", B2>=500,"B", B2>=100,"C", VERDADERO,"D")
<span class="cm">-- El último VERDADERO actúa como "else" (caso por defecto)</span>

<span class="cm">-- CAMBIAR: cuando el valor coincide exactamente con uno de varios casos</span>
=CAMBIAR(Estado[Código], "A","Activo", "B","Bloqueado", "C","Cancelado", "Desconocido")</pre>
        </div>

        <p class="subhead">▸ SUMIFS y COUNTIFS — sumar/contar con múltiples condiciones</p>
        <div class="sub-body">
<pre class="xl"><span class="cm">-- SUMIFS: suma donde se cumplen TODAS las condiciones (AND)</span>
=SUMIFS(Ventas[Importe], Ventas[Región],"Norte", Ventas[Año],2024)

<span class="cm">-- Entre fechas: dos criterios sobre la misma columna</span>
=SUMIFS(Ventas[Importe], Ventas[Fecha],">="&FechaInicio, Ventas[Fecha],"<="&FechaFin)

<span class="cm">-- COUNTIFS: contar filas que cumplen las condiciones</span>
=COUNTIFS(Pedidos[Estado],"Pendiente", Pedidos[Cliente],A2)

<span class="cm">-- Lógica OR entre condiciones (SUMIFS solo hace AND nativo)</span>
<span class="cm">-- Opción 1: sumar varios SUMIFS</span>
=SUMIFS(Ventas[Importe],Ventas[Canal],"Online") + SUMIFS(Ventas[Importe],Ventas[Canal],"App")
<span class="cm">-- Opción 2: SUMPRODUCT para condiciones OR complejas</span>
=SUMPRODUCT((Ventas[Canal]="Online")+(Ventas[Canal]="App")>0, Ventas[Importe])</pre>
        </div>

        <p class="subhead">▸ Fórmulas de texto y fecha más usadas</p>
        <div class="sub-body">
<pre class="xl"><span class="cm">-- Texto</span>
=IZQUIERDA(A2, 3)           <span class="cm">-- Primeros 3 caracteres</span>
=DERECHA(A2, 4)             <span class="cm">-- Últimos 4 caracteres</span>
=EXTRAE(A2, 5, 3)           <span class="cm">-- 3 caracteres a partir del 5º</span>
=LARGO(A2)                  <span class="cm">-- Número de caracteres</span>
=ENCONTRAR("@", A2)         <span class="cm">-- Posición del carácter (sensible mayúsculas)</span>
=MAYUSC(A2)  =MINUSC(A2)   <span class="cm">-- Convertir mayúsculas/minúsculas</span>
=ESPACIOS(A2)               <span class="cm">-- Eliminar espacios extras (inicio, fin, dobles)</span>
=CONCATENAR(A2," ",B2)      <span class="cm">-- O simplemente: =A2&" "&B2</span>
=TEXTO(A2,"dd/mm/yyyy")     <span class="cm">-- Número/fecha como texto con formato</span>

<span class="cm">-- Fecha</span>
=HOY()                      <span class="cm">-- Fecha de hoy (volátil: recalcula cada vez)</span>
=AHORA()                    <span class="cm">-- Fecha y hora actual</span>
=AÑO(A2)  =MES(A2)  =DIA(A2)
=DIAS(FechaFin, FechaInicio)       <span class="cm">-- Diferencia en días</span>
=DIASEM(A2, 2)              <span class="cm">-- Día de la semana (modo 2: 1=Lunes ... 7=Domingo)</span>
=FIN.MES(A2, 0)             <span class="cm">-- Último día del mes de la fecha A2</span>
=DIA.LAB(FechaInicio, 10)   <span class="cm">-- 10 días laborables después de la fecha</span></pre>
        </div>

      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">ARRAYS DINÁMICOS (365)</span><h3>FILTER, SORT, UNIQUE, SEQUENCE</h3></div>
        <a class="module-link" href="https://support.microsoft.com/es-es/office/fórmulas-de-matrices-dinámicas-y-comportamiento-de-matrices-desbordadas-205c6b06-03ba-4151-89a1-87a7eb36e531" target="_blank" rel="noopener">Docs arrays dinámicos ↗</a>
      </div>
      <synth-label class="synth-label">Síntesis</synth-label>
      <div class="synth">

        <p class="subhead">▸ Qué son los arrays dinámicos</p>
        <div class="sub-body">
          <p>En Excel 365, las fórmulas que devuelven múltiples valores se "derraman" (<em>spill</em>) automáticamente a las celdas adyacentes sin necesidad de seleccionar el rango antes ni pulsar Ctrl+Shift+Enter. El rango resultado se llama <em>rango desbordado</em> y se puede referenciar con <code>#</code>: <code>=B2#</code> devuelve todo el rango desbordado a partir de B2.</p>
        </div>

        <p class="subhead">▸ Las 4 funciones clave</p>
        <div class="sub-body">
<pre class="xl"><span class="cm">-- FILTER: devuelve filas que cumplen una condición</span>
=FILTER(Ventas, Ventas[Región]="Norte")
=FILTER(Ventas, (Ventas[Año]=2024)*(Ventas[Región]="Norte"))  <span class="cm">-- AND</span>
=FILTER(Ventas, (Ventas[Región]="Norte")+(Ventas[Región]="Sur"))  <span class="cm">-- OR</span>
=FILTER(Ventas, Ventas[Importe]>1000, "Sin resultados")  <span class="cm">-- Con alternativa</span>

<span class="cm">-- SORT: ordenar un rango (o el resultado de FILTER)</span>
=SORT(Ventas[Producto])                    <span class="cm">-- Ascendente por defecto</span>
=SORT(Ventas[Producto], 1, -1)             <span class="cm">-- -1 = descendente</span>
=SORT(FILTER(Ventas, Ventas[Año]=2024), 3, -1)  <span class="cm">-- Filtrar y ordenar en una fórmula</span>

<span class="cm">-- SORTBY: ordenar por otra columna (no incluida en el resultado)</span>
=SORTBY(Ventas[Producto], Ventas[Importe], -1)  <span class="cm">-- Productos ordenados por importe</span>

<span class="cm">-- UNIQUE: valores únicos de una columna</span>
=UNIQUE(Ventas[Región])                    <span class="cm">-- Una vez cada región</span>
=UNIQUE(Ventas[Región], , VERDADERO)       <span class="cm">-- Solo los que aparecen exactamente 1 vez</span>

<span class="cm">-- SEQUENCE: secuencia numérica</span>
=SEQUENCE(12)                  <span class="cm">-- 1 al 12 (en vertical)</span>
=SEQUENCE(1, 12)               <span class="cm">-- 1 al 12 (en horizontal)</span>
=SEQUENCE(4, 3, 0, 5)          <span class="cm">-- 4 filas × 3 cols, empieza en 0, incremento 5</span></pre>
          <div class="good-note"><strong>Combinación más útil:</strong> <code>=SORT(FILTER(Tabla, condición))</code> — crea una vista filtrada y ordenada dinámicamente sin tocar los datos originales y sin necesitar una tabla dinámica.</div>
        </div>

      </div>
    </article>
  </section>

  <!-- ===== BLOQUE 3 ===== -->
  <section class="block-section" id="bloque3">
    <span class="section-label">Bloque 3 · Análisis de datos</span>
    <h2>Tablas dinámicas, Power Query y Power Pivot</h2>
    <p class="section-intro">Las tres herramientas de análisis de Excel, de menor a mayor potencia. La elección depende del volumen de datos, la complejidad del análisis y si el resultado se actualizará periódicamente.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">TABLAS DINÁMICAS</span><h3>Analizar datos con rapidez sin fórmulas</h3></div>
        <a class="module-link" href="https://support.microsoft.com/es-es/office/crear-una-tabla-dinámica-para-analizar-datos-de-una-hoja-de-cálculo-a9a84538-bfe9-40a9-a8e9-f99134456576" target="_blank" rel="noopener">Docs tablas dinámicas ↗</a>
      </div>
      <synth-label class="synth-label">Síntesis</synth-label>
      <div class="synth">

        <p class="subhead">▸ Cuándo usar una tabla dinámica</p>
        <div class="sub-body">
          <p>La tabla dinámica es la herramienta correcta cuando necesitas <strong>resumir, agrupar y cruzar datos</strong> sin escribir fórmulas — y cuando la estructura del resumen puede cambiar (quieres explorar los datos desde distintos ángulos). Para análisis de un solo ángulo con pocos cálculos, SUMIFS suele ser más rápido de montar.</p>
        </div>

        <p class="subhead">▸ Anatomía de una tabla dinámica</p>
        <div class="sub-body">
          <ul>
            <li><strong>Filas:</strong> los atributos que quieres ver en el eje vertical (Producto, Cliente, Región…).</li>
            <li><strong>Columnas:</strong> los atributos que quieres cruzar en el eje horizontal (Año, Trimestre…).</li>
            <li><strong>Valores:</strong> lo que se agrega (Suma, Conteo, Promedio, Máx/Mín). Por defecto Excel elige Suma para números y Conteo para texto — cambiar siempre si no es lo que necesitas.</li>
            <li><strong>Filtros:</strong> un filtro global encima de la tabla para segmentar todo el análisis.</li>
          </ul>
          <div class="mini-note">La fuente de datos <strong>debe ser una tabla formateada</strong> (Ctrl+T) para que la tabla dinámica se actualice correctamente cuando se añaden filas. Si la fuente es un rango suelto, hay que actualizar el rango manualmente.</div>
        </div>

        <p class="subhead">▸ Segmentaciones (Slicers) y escalas de tiempo</p>
        <div class="sub-body">
          <p>Las <strong>segmentaciones</strong> (<strong>Insertar → Segmentación de datos</strong>) son botones visuales que filtran una tabla dinámica de forma interactiva — más visibles e intuitivos que los filtros de fila/columna. Una sola segmentación puede estar conectada a múltiples tablas dinámicas del mismo libro. La <strong>escala de tiempo</strong> es una segmentación especializada para columnas de fecha (filtra por día, mes, trimestre o año con una interfaz deslizante).</p>
        </div>

        <p class="subhead">▸ Campos calculados — el DAX de las tablas dinámicas simples</p>
        <div class="sub-body">
          <p>Los <strong>campos calculados</strong> (<strong>Análisis de tabla dinámica → Campos, elementos y conjuntos → Campo calculado</strong>) permiten añadir cálculos personalizados (como un margen %) directamente en la tabla dinámica, sin fórmulas en las celdas. Útil para cálculos simples; para cálculos complejos o modelos con múltiples tablas, usar Power Pivot.</p>
        </div>

      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">POWER QUERY EN EXCEL</span><h3>Conectar, limpiar y transformar datos automáticamente</h3></div>
        <a class="module-link" href="https://support.microsoft.com/es-es/office/introducción-a-microsoft-power-query-para-excel-6e92e2f4-2079-4e1f-bad5-89f6269cd605" target="_blank" rel="noopener">Docs Power Query Excel ↗</a>
      </div>
      <synth-label class="synth-label">Síntesis</synth-label>
      <div class="synth">

        <p class="subhead">▸ Power Query en Excel: qué es y cuándo usarlo</p>
        <div class="sub-body">
          <p>Power Query en Excel (<strong>Datos → Obtener y transformar datos</strong>) es exactamente el mismo motor que en Power BI — misma interfaz, mismo lenguaje M. Permite conectar a fuentes externas (otros libros Excel, CSV, bases de datos, SharePoint, web) y aplicar transformaciones que se registran como pasos repetibles. Cada vez que el usuario hace clic en "Actualizar todo", Power Query repite todas las transformaciones automáticamente con los datos más recientes de la fuente.</p>
          <p>Usar Power Query en Excel cuando:</p>
          <ul>
            <li>Los datos vienen de múltiples archivos (por ejemplo, combinar 12 archivos mensuales en una sola tabla).</li>
            <li>Los datos necesitan limpieza repetitiva (eliminar filas vacías, cambiar tipos, renombrar columnas) que hoy se hace manualmente cada vez.</li>
            <li>La fuente cambia periódicamente y se necesita actualizar el análisis con un clic.</li>
          </ul>
          <div class="mini-note">Los patrones de transformación de Power Query son idénticos a los del archivo de Power BI (Bloque 2): unpivot, merge, append, cambiar tipos, renombrar pasos. Ver ese archivo para referencia de código M.</div>
        </div>

        <p class="subhead">▸ Combinar múltiples archivos — el caso más habitual</p>
        <div class="sub-body">
          <p>El patrón más útil: combinar todos los archivos de una carpeta en una sola tabla. <strong>Datos → Obtener datos → De una carpeta</strong> → seleccionar la carpeta → "Combinar y transformar". Power Query carga los archivos, aplica la misma transformación a cada uno y los apila. Cada mes que llega un nuevo archivo a la carpeta, basta con actualizar para que se incorpore al análisis.</p>
        </div>

      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">POWER PIVOT</span><h3>Modelo de datos con DAX para análisis avanzado</h3></div>
        <a class="module-link" href="https://support.microsoft.com/es-es/office/power-pivot-análisis-de-datos-eficaz-y-modelado-de-datos-en-excel-a9c2c6e2-cc49-4976-a7d7-40896795d045" target="_blank" rel="noopener">Docs Power Pivot ↗</a>
      </div>
      <synth-label class="synth-label">Síntesis</synth-label>
      <div class="synth">

        <p class="subhead">▸ Power Pivot: el mismo motor que Power BI dentro de Excel</p>
        <div class="sub-body">
          <p>Power Pivot (<strong>Datos → Administrar modelo de datos</strong>) añade al libro un motor de modelo de datos con relaciones entre tablas y medidas DAX — exactamente el mismo motor que usa Power BI. Permite construir tablas dinámicas que cruzan múltiples tablas relacionadas, con medidas reutilizables.</p>
          <p>Usar Power Pivot cuando:</p>
          <ul>
            <li>Se necesitan relaciones entre varias tablas (lo que BUSCARV resuelve de forma frágil).</li>
            <li>El volumen de datos es grande y la tabla dinámica estándar se vuelve lenta.</li>
            <li>Se necesitan medidas DAX avanzadas (time intelligence, ratios, contextos de filtro).</li>
          </ul>
          <div class="warn-note"><strong>Señal de que hay que migrar a Power BI:</strong> si el libro con Power Pivot necesita actualizarse con frecuencia, compartirse con varias personas o tiene más de un propietario que lo modifica — Power BI Service da todo eso de forma más controlada. Power Pivot en Excel es el puente, no el destino.</div>
        </div>

      </div>
    </article>
  </section>

  <!-- ===== BLOQUE 4 ===== -->
  <section class="block-section" id="bloque4">
    <span class="section-label">Bloque 4 · Integración y CoE</span>
    <h2>Excel en el ecosistema Microsoft y buenas prácticas</h2>
    <p class="section-intro">Excel no es una isla. En el contexto del CoE de DSI, su valor real está en saber cuándo usarlo, cuándo ceder el paso a Power BI o Power Automate, y cómo estructurar los libros para que otros puedan mantenerlos.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">CUÁNDO USAR QUÉ</span><h3>Excel vs Power BI · Excel + Power Automate · Copilot</h3></div>
      </div>
      <synth-label class="synth-label">Síntesis</synth-label>
      <div class="synth">

        <p class="subhead">▸ Excel vs Power BI — la decisión más importante</p>
        <div class="sub-body">
          <table class="pt">
            <tr><th>Usar Excel cuando…</th><th>Usar Power BI cuando…</th></tr>
            <tr><td>El análisis es puntual, de un solo uso o muy ad-hoc</td><td>El informe se actualizará periódicamente y/o se compartirá con varias personas</td></tr>
            <tr><td>El destinatario necesita editar/manipular los datos directamente (no solo consumirlos)</td><td>Se necesitan relaciones entre múltiples tablas y medidas reutilizables</td></tr>
            <tr><td>El volumen de datos es manejable sin Power Pivot</td><td>El volumen es grande o crecerá con el tiempo</td></tr>
            <tr><td>El análisis se hace una vez y no volverá a usarse</td><td>Se necesita control de acceso (RLS) o distribución centralizada</td></tr>
          </table>
          <div class="mini-note">Regla práctica: si el análisis se va a repetir el mes que viene, ya merece ser Power BI. Si se va a compartir con más de 3 personas de forma regular, ya merece ser Power BI.</div>
        </div>

        <p class="subhead">▸ Excel + Power Automate — automatizar el trabajo con Excel</p>
        <div class="sub-body">
          <p>Power Automate tiene un conector de Excel nativo que permite:</p>
          <ul>
            <li><strong>Añadir filas a una tabla:</strong> cada vez que llega un email, se rellena un formulario de Forms, o se crea un elemento en SharePoint → automáticamente se añade una fila a la tabla Excel. Elimina el copiado manual de datos.</li>
            <li><strong>Leer filas de una tabla:</strong> procesar cada fila de la tabla como parte de un flujo (enviar un email personalizado por cliente, crear tareas por proyecto…).</li>
            <li><strong>Actualizar una fila:</strong> localizar una fila específica y modificar un valor.</li>
          </ul>
          <p>Requisito: el archivo Excel debe estar en <strong>SharePoint o OneDrive</strong> (no en disco local) para que Power Automate pueda acceder a él. Además, los datos deben estar en una <strong>tabla formateada</strong> (Ctrl+T) — el conector no funciona con rangos sueltos.</p>
          <div class="good-note">Caso de uso habitual en DSI: formulario de solicitud en Microsoft Forms → Power Automate lee la respuesta → añade una fila a una tabla Excel de registro en SharePoint → envía confirmación al solicitante.</div>
        </div>

        <p class="subhead">▸ Copilot en Excel</p>
        <div class="sub-body">
          <p>Copilot en Excel (<a href="https://learn.microsoft.com/en-us/training/modules/work-smarter-excel/" target="_blank" rel="noopener">módulo oficial</a>) permite:</p>
          <ul>
            <li><strong>Generar fórmulas:</strong> describir en lenguaje natural lo que necesitas ("crea una fórmula que sume las ventas del norte de este año") y Copilot genera y explica la fórmula.</li>
            <li><strong>Analizar y resumir:</strong> preguntar sobre los datos de la tabla activa sin escribir fórmulas ("¿cuáles son los 3 productos con más ventas?").</li>
            <li><strong>Crear visualizaciones:</strong> sugerir y generar gráficos según el contexto de la tabla.</li>
            <li><strong>Resaltar y filtrar:</strong> pedir que resalte las filas que cumplen una condición o aplique un formato condicional descrito en lenguaje natural.</li>
          </ul>
          <div class="warn-note">Copilot en Excel requiere licencia M365 Copilot. Los datos deben estar en una tabla formateada para que Copilot los analice correctamente. No garantiza fórmulas perfectas — revisar siempre el resultado antes de usarlo.</div>
        </div>

        <p class="subhead">▸ Buenas prácticas para libros compartidos</p>
        <div class="sub-body">
          <ul>
            <li><strong>Separar entrada de datos / cálculos / presentación:</strong> una hoja para los datos en bruto (o la tabla de Power Query), otra para los cálculos intermedios, y otra para el dashboard o los resultados. Nunca mezclar fórmulas con celdas editables por el usuario en la misma zona.</li>
            <li><strong>Proteger celdas con fórmulas:</strong> proteger la hoja (con o sin contraseña) desbloqueando solo las celdas que el usuario debe editar — evita que se borren fórmulas accidentalmente.</li>
            <li><strong>Versionar el archivo:</strong> usar el historial de versiones de SharePoint/OneDrive en vez de duplicar el archivo como "v2", "final", "definitivo". Si el libro se comparte en SharePoint, OneDrive guarda automáticamente el historial.</li>
            <li><strong>Documentar cálculos no obvios:</strong> añadir un comentario (<kbd>Shift+F2</kbd>) o una celda de texto explicando qué hace una fórmula compleja — especialmente si alguien más va a mantener el libro.</li>
            <li><strong>Nombrar las hojas descriptivamente:</strong> "Datos", "Cálculos", "Dashboard" en vez de "Hoja1", "Hoja2", "Hoja3".</li>
          </ul>
        </div>

      </div>
    </article>

  </section>

</div>

  <!-- ===== BLOQUE 5 ===== -->
  <section class="block-section" id="bloque5">
    <span class="section-label">Bloque 5 · Fórmulas difíciles + Copilot</span>
    <h2>Las fórmulas que dan quebraderos de cabeza, explicadas de verdad</h2>
    <p class="section-intro">BUSCARV, INDICE+COINCIDIR, SUMAPRODUCTO, SI.ERROR anidado… fórmulas que todo el mundo usa pero que nadie acaba de entender del todo. Aquí se explica exactamente qué hace cada parámetro y cuándo falla, más cómo usar Copilot para que las genere por ti.</p>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">BUSCARV — EXPLICADO PARA SIEMPRE</span><h3>Por qué falla, cómo funciona y cuándo abandonarla</h3></div>
        <a class="module-link" href="https://support.microsoft.com/es-es/office/función-buscarv-0bbc8083-26fe-4963-8ab8-93a18ad188a1" target="_blank" rel="noopener">Docs BUSCARV ↗</a>
      </div>
      <synth-label class="synth-label">Síntesis</synth-label>
      <div class="synth">

        <p class="subhead">▸ Los 4 parámetros de BUSCARV — uno a uno</p>
        <div class="sub-body">
<pre class="xl">=BUSCARV(qué_buscas, dónde_buscas, qué_columna_devuelves, búsqueda_exacta)

<span class="cm">-- Ejemplo: tienes un ID en A2 y quieres el nombre del producto de otra tabla</span>
=BUSCARV(A2, Productos!A:C, 2, FALSO)
<span class="cm">--         ↑           ↑        ↑    ↑
--         ID a buscar  Tabla    Col  FALSO = exacto</span></pre>
          <ul>
            <li><strong>Parámetro 1 — qué buscas:</strong> el valor que quieres encontrar. Normalmente una referencia a una celda (<code>A2</code>). Tiene que existir exactamente igual en la primera columna de la tabla donde buscas.</li>
            <li><strong>Parámetro 2 — dónde buscas:</strong> el rango donde está la tabla de datos. <strong>La primera columna de este rango SIEMPRE debe ser la columna donde está el valor que buscas.</strong> Aquí está el error más común: si el ID está en la columna B de tu tabla, el rango debe empezar en B, no en A.</li>
            <li><strong>Parámetro 3 — qué columna devuelves:</strong> un número que indica la posición de la columna que quieres devolver, contando desde la primera columna del rango. Si el rango es <code>A:D</code> y quieres la columna C → <code>3</code>.</li>
            <li><strong>Parámetro 4 — FALSO o VERDADERO:</strong> <strong>casi siempre FALSO</strong> (búsqueda exacta — devuelve error si no encuentra el valor exacto). VERDADERO solo para búsquedas aproximadas en listas ordenadas (tablas de descuento, rangos de puntuación).</li>
          </ul>
          <div class="warn-note"><strong>El error que comete todo el mundo:</strong> olvidarse del FALSO al final. Sin él, Excel hace búsqueda aproximada — puede devolver valores incorrectos sin dar error. Siempre poner FALSO a menos que necesites búsqueda aproximada explícitamente.</div>
        </div>

        <p class="subhead">▸ Por qué BUSCARV da #N/A y cómo solucionarlo</p>
        <div class="sub-body">
<pre class="xl"><span class="cm">-- Cuando BUSCARV no encuentra el valor, devuelve #N/A (error)</span>
=BUSCARV(A2, Productos!A:C, 2, FALSO)   <span class="cm">→ #N/A si A2 no existe en Productos</span>

<span class="cm">-- Envolver en SI.ERROR para mostrar algo más útil</span>
=SI.ERROR(BUSCARV(A2, Productos!A:C, 2, FALSO), "No encontrado")
=SI.ERROR(BUSCARV(A2, Productos!A:C, 2, FALSO), "")    <span class="cm">← celda en blanco</span>
=SI.ERROR(BUSCARV(A2, Productos!A:C, 2, FALSO), 0)     <span class="cm">← cero (para sumas)</span></pre>
          <p>Causas habituales del #N/A:</p>
          <ul>
            <li>El valor buscado tiene espacios extra (solución: <code>=ESPACIOS(A2)</code> antes de buscar).</li>
            <li>Uno está en formato texto y el otro en formato número ("123" ≠ 123).</li>
            <li>Hay diferencias de mayúsculas/minúsculas en valores que parecen iguales.</li>
            <li>El valor simplemente no existe en la tabla — y eso es correcto, hay que decidir qué mostrar.</li>
          </ul>
        </div>

        <p class="subhead">▸ Por qué BUSCARV se rompe al insertar columnas — y la alternativa</p>
        <div class="sub-body">
          <p>El parámetro 3 (número de columna) es un número fijo. Si alguien inserta una columna en la tabla de datos, ese número ya no apunta a la columna correcta y la fórmula devuelve valores erróneos sin avisar.</p>
<pre class="xl"><span class="cm">-- BUSCARV: frágil. Si insertan una columna entre A y C, el 2 apunta al sitio equivocado</span>
=BUSCARV(A2, Productos!A:C, 2, FALSO)

<span class="cm">-- INDICE+COINCIDIR: robusto. Referencia la columna por nombre, no por posición</span>
=INDICE(Productos!B:B, COINCIDIR(A2, Productos!A:A, 0))
<span class="cm">--       ↑ columna a devolver   ↑ valor a buscar  ↑ columna de búsqueda  ↑ exacto</span>

<span class="cm">-- O directamente, XLOOKUP (Excel 365) — lo más limpio:</span>
=XLOOKUP(A2, Productos[ID], Productos[Nombre], "No encontrado")</pre>
          <div class="mini-note">Resumen de cuándo usar cada una: XLOOKUP si tienes 365 (siempre preferible). INDICE+COINCIDIR si la versión no tiene XLOOKUP. BUSCARV solo si el archivo va a usarse en versiones muy antiguas de Excel o necesitas compatibilidad máxima.</div>
        </div>

      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">FÓRMULAS QUE PARECEN MAGIA</span><h3>SI.ERROR, SUMAPRODUCTO, SIFECHA y fórmulas anidadas</h3></div>
      </div>
      <synth-label class="synth-label">Síntesis</synth-label>
      <div class="synth">

        <p class="subhead">▸ SI.ERROR — envuelve cualquier fórmula para que no rompa</p>
        <div class="sub-body">
          <p><code>=SI.ERROR(fórmula, valor_si_error)</code> — si la fórmula produce cualquier error (#N/A, #DIV/0!, #REF!, #VALOR!…), devuelve lo que pongas en el segundo parámetro en vez del error.</p>
<pre class="xl"><span class="cm">-- División sin riesgo de #DIV/0! (aunque DIVIDE() de DAX es mejor en Power BI)</span>
=SI.ERROR(A2/B2, 0)

<span class="cm">-- Cascada de BUSCARVs: busca en tabla A, si no está busca en tabla B</span>
=SI.ERROR(
    BUSCARV(A2, TablaA!A:B, 2, FALSO),
    SI.ERROR(
        BUSCARV(A2, TablaB!A:B, 2, FALSO),
        "No encontrado en ninguna tabla"
    )
)</pre>
        </div>

        <p class="subhead">▸ SUMAPRODUCTO — la fórmula más versátil de Excel</p>
        <div class="sub-body">
          <p>SUMAPRODUCTO multiplica arrays elemento a elemento y suma el resultado. Parece rara pero es tremendamente útil para cálculos con múltiples condiciones que SUMIFS no puede manejar.</p>
<pre class="xl"><span class="cm">-- Básico: equivale a SUMPRODUCT en inglés</span>
=SUMAPRODUCTO(Ventas[Cantidad] * Ventas[PrecioUnitario])
<span class="cm">-- Multiplica cada fila Cantidad × Precio y suma todo — útil cuando no tienes columna de importe</span>

<span class="cm">-- Con condición (TRUE=1, FALSE=0 — los booleanos actúan como multiplicadores)</span>
=SUMAPRODUCTO((Ventas[Región]="Norte") * Ventas[Importe])
<span class="cm">-- Solo suma las filas donde Región = "Norte"</span>

<span class="cm">-- Con múltiples condiciones AND</span>
=SUMAPRODUCTO((Ventas[Región]="Norte") * (Ventas[Año]=2024) * Ventas[Importe])

<span class="cm">-- Con condición OR (suma los TRUE de ambas condiciones, >0 evita contar doble)</span>
=SUMAPRODUCTO(((Ventas[Canal]="Online")+(Ventas[Canal]="App")>0) * Ventas[Importe])

<span class="cm">-- Contar filas únicas (valores distintos) con condición</span>
=SUMAPRODUCTO(1/COUNTIF(Datos[Categoría], Datos[Categoría]))
<span class="cm">-- Truco clásico: cuenta cuántos valores únicos hay en una columna</span></pre>
        </div>

        <p class="subhead">▸ SIFECHA — la función oculta para diferencias de fechas</p>
        <div class="sub-body">
          <p>SIFECHA (DATEDIF en inglés) no aparece en el autocompletado de Excel porque es una función heredada de Lotus 1-2-3 que Microsoft mantiene pero no documenta oficialmente. Calcula la diferencia entre dos fechas en años, meses o días completos.</p>
<pre class="xl">=SIFECHA(fecha_inicio, fecha_fin, unidad)

<span class="cm">-- Años completos entre dos fechas (p.ej. edad)</span>
=SIFECHA(FechaNacimiento, HOY(), "Y")

<span class="cm">-- Meses completos</span>
=SIFECHA(FechaInicio, FechaFin, "M")

<span class="cm">-- Días completos</span>
=SIFECHA(FechaInicio, FechaFin, "D")

<span class="cm">-- Mostrar "X años, Y meses" concatenando tres SIFECHA</span>
=SIFECHA(FechaInicio,HOY(),"Y")&" años, "&SIFECHA(FechaInicio,HOY(),"YM")&" meses"
<span class="cm">-- "YM" = meses restantes después de contar los años completos</span></pre>
          <div class="mini-note">SIFECHA tiene un bug conocido cuando el día de inicio es mayor que el día de fin en el mismo mes. Para calcular edades simples, <code>=SIFECHA(Nacimiento, HOY(), "Y")</code> funciona bien en la práctica.</div>
        </div>

        <p class="subhead">▸ Cómo leer (y construir) fórmulas anidadas complejas</p>
        <div class="sub-body">
          <p>Las fórmulas anidadas se leen de dentro hacia fuera. Cuando ves algo como esto:</p>
<pre class="xl">=SI.ERROR(INDICE(Precios!B:B, COINCIDIR(1, (Precios!A:A=A2)*(Precios!C:C=B2), 0)), 0)</pre>
          <p>La clave es descomponerla en capas:</p>
          <ol>
            <li><strong>La capa interior:</strong> <code>(Precios!A:A=A2)*(Precios!C:C=B2)</code> → crea un array de 1s y 0s donde ambas condiciones se cumplen.</li>
            <li><strong>COINCIDIR(1, array, 0)</strong> → encuentra la posición de la primera fila donde el array vale 1 (ambas condiciones cumplidas).</li>
            <li><strong>INDICE(Precios!B:B, posición)</strong> → devuelve el valor de la columna B en esa posición.</li>
            <li><strong>SI.ERROR(..., 0)</strong> → si no hay coincidencia, devuelve 0 en vez de error.</li>
          </ol>
          <p>Resultado: busca en la tabla Precios la fila donde se cumplen dos condiciones a la vez (ID de producto Y año, por ejemplo) y devuelve el precio. Algo que BUSCARV no puede hacer con una sola columna de búsqueda.</p>
          <div class="mini-note">Truco de debugging: seleccionar una parte de la fórmula en la barra de fórmulas y pulsar <kbd>F9</kbd> — Excel evalúa esa parte y muestra el resultado. Imprescindible para entender qué está calculando cada capa. Pulsar <kbd>Esc</kbd> para cancelar sin guardar el cambio.</div>
        </div>

        <p class="subhead">▸ TEXTO — formatear cualquier valor como texto</p>
        <div class="sub-body">
<pre class="xl"><span class="cm">-- Fecha como texto con formato específico</span>
=TEXTO(HOY(), "dd/mm/yyyy")          <span class="cm">→ "22/06/2026"</span>
=TEXTO(HOY(), "dddd, d de mmmm")     <span class="cm">→ "lunes, 22 de junio"</span>
=TEXTO(HOY(), "mmmm yyyy")           <span class="cm">→ "junio 2026"</span>

<span class="cm">-- Número con formato (útil para concatenar en textos)</span>
=TEXTO(1234567.89, "#.##0,00 €")     <span class="cm">→ "1.234.567,89 €"</span>
=TEXTO(0.1567, "0,0%")               <span class="cm">→ "15,7%"</span>

<span class="cm">-- Caso muy habitual: crear etiquetas para gráficos o informes</span>
="Ventas "&TEXTO(MES_ACTUAL,"mmmm yyyy")&": "&TEXTO(ImporteTotal,"#.##0 €")
<span class="cm">→ "Ventas junio 2026: 145.230 €"</span></pre>
        </div>

      </div>
    </article>

    <article class="module-card">
      <div class="module-head">
        <div><span class="module-num">COPILOT EN EXCEL — EN PROFUNDIDAD</span><h3>Qué puede hacer, cómo pedírselo y sus límites reales</h3></div>
        <a class="module-link" href="https://learn.microsoft.com/en-us/training/modules/work-smarter-excel/" target="_blank" rel="noopener">Módulo oficial Microsoft Learn ↗</a>
      </div>
      <synth-label class="synth-label">Síntesis</synth-label>
      <div class="synth">

        <p class="subhead">▸ Las 5 cosas que Copilot hace bien en Excel</p>
        <div class="sub-body">
          <ol>
            <li><strong>Generar fórmulas desde descripción en lenguaje natural:</strong> "crea una fórmula que sume las ventas del norte de 2024 excluyendo los devoluciones" → Copilot genera la fórmula, la explica y la inserta. Especialmente útil para SUMIFS complejos, XLOOKUP con condiciones o fórmulas de fecha.</li>
            <li><strong>Explicar fórmulas existentes:</strong> selecciona una fórmula y pregunta "explícame qué hace esta fórmula" → Copilot la descompone en lenguaje natural, parámetro a parámetro. Ideal para entender ficheros heredados.</li>
            <li><strong>Analizar y resumir la tabla activa:</strong> "¿cuáles son los 3 productos con más ventas?", "¿qué mes tuvo el mayor descenso?" → Copilot responde con los valores exactos extraídos de la tabla, sin que tengas que escribir una fórmula.</li>
            <li><strong>Formato condicional en lenguaje natural:</strong> "resalta en rojo las filas donde el importe sea negativo" → Copilot aplica el formato condicional directamente.</li>
            <li><strong>Sugerir y crear gráficos:</strong> "crea un gráfico de ventas por región de los últimos 6 meses" → genera el gráfico con los datos de la tabla activa.</li>
          </ol>
        </div>

        <p class="subhead">▸ Cómo pedírselo para obtener mejores resultados</p>
        <div class="sub-body">
          <table class="pt">
            <tr><th>En vez de decir…</th><th>Di esto</th></tr>
            <tr><td>"Hazme una fórmula"</td><td>"Crea una fórmula en la columna F que calcule el margen bruto como (Precio - Coste) / Precio, usando las columnas de la tabla Ventas"</td></tr>
            <tr><td>"Analiza los datos"</td><td>"¿Cuál es la región con mayor crecimiento de ventas respecto al mes anterior? Muéstrame los 3 primeros"</td></tr>
            <tr><td>"Explícame esto"</td><td>(Selecciona la celda con la fórmula) → "Explícame qué hace esta fórmula, paso a paso"</td></tr>
            <tr><td>"Ponlo bonito"</td><td>"Aplica formato condicional para que las celdas de la columna Margen% en rojo si es menor de 10% y en verde si es mayor de 25%"</td></tr>
          </table>
          <div class="mini-note">Regla de oro: cuanto más específico seas sobre qué tabla, qué columnas y qué quieres calcular, mejor será el resultado. Copilot no sabe el contexto de tu negocio — dáselo tú.</div>
        </div>

        <p class="subhead">▸ Los límites reales que Copilot tiene en Excel</p>
        <div class="sub-body">
          <ul>
            <li><strong>Solo ve la tabla activa:</strong> si tienes datos en varias hojas o varios rangos, Copilot solo trabaja con la tabla donde está el cursor. No cruza datos entre hojas por sí solo.</li>
            <li><strong>No reemplaza revisar la fórmula:</strong> genera fórmulas con errores. Siempre revisa la fórmula antes de confiar en el resultado — especialmente en SUMIFS con referencias de columna y en condiciones con fechas.</li>
            <li><strong>No entiende el contexto de negocio:</strong> no sabe que "descuentos" en tu empresa se calcula de forma especial, o que la columna "Región" tiene valores en mayúsculas. Hay que dárselo explícitamente en el prompt.</li>
            <li><strong>Los datos deben estar en tabla formateada (Ctrl+T):</strong> Copilot funciona mucho mejor (o solo funciona) cuando los datos están en una Tabla formal, no en un rango suelto.</li>
            <li><strong>Requiere licencia M365 Copilot:</strong> no está disponible con licencias M365 estándar ni con Office perpetuo.</li>
          </ul>
        </div>

        <p class="subhead">▸ El uso más potente: generar fórmulas que tú no recordarías</p>
        <div class="sub-body">
          <p>El caso de uso donde Copilot aporta más valor no es para las fórmulas simples (esas ya las sabes). Es para las que requieren combinar funciones que usas una vez al año:</p>
<pre class="xl"><span class="cm">Prompt ejemplo: "Crea una fórmula que encuentre el último valor no vacío</span>
<span class="cm">de la columna B de la tabla Ventas"</span>

<span class="cm">Resultado generado por Copilot:</span>
=INDICE(Ventas[Importe], COINCIDIR(2, 1/(Ventas[Importe]<>""), 1))
<span class="cm">-- Esta fórmula pocos la recuerdan de memoria — Copilot la genera en 3 segundos</span></pre>
          <p>Otros casos donde usarlo para generar en vez de recordar: fórmulas SIFECHA complejas, SUMAPRODUCTO con múltiples condiciones OR, extraer el n-ésimo elemento único de una lista con INDICE/COINCIDIR/CONTAR.SI, cálculos de días laborables entre dos fechas.</p>
        </div>

      </div>
    </article>

  </section>

<footer>
  <div class="wrap">
    <p style="background:rgba(255,177,61,0.1);border-left:3px solid #ffb13d;border-radius:8px;padding:12px 16px;margin-bottom:18px;color:var(--text);font-size:13.5px;line-height:1.6;"><strong style="color:#ffb13d;">⚠ Vigencia —</strong> última verificación: <strong>22 de junio de 2026</strong>. Las funciones de arrays dinámicos (FILTER, SORT, UNIQUE, SEQUENCE) y XLOOKUP requieren Excel 365 o Excel 2021+. Copilot en Excel requiere licencia M365 Copilot.</p>
    <span class="section-label">Estado de la guía</span>
    <p style="color:var(--text-dim);margin:6px 0 18px;">5 bloques completos: tablas formateadas, rangos con nombre, validación y atajos; XLOOKUP, IFS, SUMIFS/COUNTIFS, fórmulas de texto/fecha y arrays dinámicos; tablas dinámicas, Power Query y Power Pivot; Excel en el ecosistema (Excel vs Power BI, Power Automate, Copilot, buenas prácticas); y el bloque de fórmulas que dan guerra — BUSCARV explicado parámetro a parámetro, SI.ERROR, SUMAPRODUCTO, INDICE+COINCIDIR, fórmulas anidadas y Copilot en profundidad.</p>
    <p>Generada el 22 de junio de 2026 · <strong>v1.0</strong> · 5/5 bloques.</p>
  </div>
</footer>
  </div>
</template>

<style>

  html.mod-excel{
    --bg:#15120e;--bg-elev:#1c1710;--bg-card:#211b14;
    --border:rgba(255,157,61,0.16);--border-soft:rgba(255,255,255,0.07);
    --text:#f3ead9;--text-dim:#b3a48d;--text-faint:#7d7261;
    --accent:#ff9d3d;--accent-soft:rgba(255,157,61,0.13);
    --teal:#3ec9b0;--teal-soft:rgba(62,201,176,0.13);
    --green:#5dcc8a;--green-soft:rgba(93,204,138,0.12);
    --radius:14px;--radius-sm:8px;
    --shadow:0 12px 32px -12px rgba(0,0,0,0.55);
    --maxw:980px;
    --ff-display:'Bricolage Grotesque',sans-serif;
    --ff-body:'Manrope',sans-serif;
    --ff-mono:'JetBrains Mono',monospace;
  }
  html.mod-excel[data-theme="light"], html.mod-excel [data-theme="light"]{
    --bg:#fbf6ee;--bg-elev:#f4ead9;--bg-card:#ffffff;
    --border:rgba(201,111,31,0.22);--border-soft:rgba(34,28,20,0.09);
    --text:#241d14;--text-dim:#5e5240;--text-faint:#8a7d68;
    --accent:#c96f1f;--accent-soft:rgba(201,111,31,0.10);
    --teal:#16876f;--teal-soft:rgba(22,135,111,0.10);
    --green:#1a7a3f;--green-soft:rgba(26,122,63,0.10);
    --shadow:0 12px 28px -14px rgba(60,40,10,0.18);
  }
  html.mod-excel *{box-sizing:border-box;}html.mod-excel{scroll-behavior:smooth;}
  html.mod-excel body{margin:0;background:var(--bg);color:var(--text);font-family:var(--ff-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;transition:background .25s,color .25s;}
  html.mod-excel h1,html.mod-excel h2,html.mod-excel h3,html.mod-excel h4{font-family:var(--ff-display);margin:0;line-height:1.15;font-weight:700;letter-spacing:-0.01em;}
  html.mod-excel a{color:var(--accent);text-decoration:none;}html.mod-excel a:hover{text-decoration:underline;}
  html.mod-excel .wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px;}
  html.mod-excel code{font-family:var(--ff-mono);font-size:.88em;background:var(--bg-elev);padding:1px 5px;border-radius:4px;border:1px solid var(--border-soft);}
  html.mod-excel pre.xl{font-family:var(--ff-mono);font-size:12.5px;background:var(--bg-elev);border:1px solid var(--border-soft);border-left:3px solid var(--green);border-radius:var(--radius-sm);padding:14px 16px;margin:10px 0 16px;overflow-x:auto;white-space:pre;color:var(--green);line-height:1.5;}
  html.mod-excel pre.xl .cm{color:var(--text-faint);font-style:italic;}

  html.mod-excel .topbar{position:sticky;top:0;z-index:30;backdrop-filter:blur(10px);background:color-mix(in srgb,var(--bg) 86%,transparent);border-bottom:1px solid var(--border-soft);}
  html.mod-excel .topbar-inner{max-width:var(--maxw);margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
  html.mod-excel .brand{display:flex;align-items:center;gap:10px;font-family:var(--ff-display);font-weight:700;font-size:18px;}
  html.mod-excel .brand .badge-fam{font-family:var(--ff-mono);font-size:10px;font-weight:600;color:var(--text-faint);border:1px solid var(--border-soft);padding:2px 7px;border-radius:99px;letter-spacing:.04em;}
  html.mod-excel .brand .badge-ver{font-family:var(--ff-mono);font-size:10px;font-weight:700;color:var(--teal);background:var(--teal-soft);padding:2px 7px;border-radius:99px;letter-spacing:.03em;}
  html.mod-excel .theme-btn{background:var(--bg-card);border:1px solid var(--border-soft);color:var(--text);width:38px;height:38px;border-radius:99px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:transform .15s,border-color .15s;}
  html.mod-excel .theme-btn:hover{border-color:var(--accent);transform:scale(1.06);}
  html.mod-excel .top-btn{position:fixed;right:22px;bottom:22px;z-index:40;width:44px;height:44px;border-radius:99px;background:var(--bg-card);border:1px solid var(--border);color:var(--accent);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow);opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .2s,transform .2s;}
  html.mod-excel .top-btn.show{opacity:1;visibility:visible;transform:translateY(0);}

  html.mod-excel .source-strip{background:linear-gradient(90deg,var(--accent-soft),transparent);border-bottom:1px solid var(--border-soft);font-family:var(--ff-mono);font-size:12.5px;color:var(--text-dim);}
  html.mod-excel .source-strip .wrap{display:flex;align-items:center;gap:8px;padding:9px 24px;flex-wrap:wrap;}
  html.mod-excel .source-strip .pin{color:var(--accent);}
  html.mod-excel .source-strip a{color:var(--text);border-bottom:1px dotted var(--accent);}
  html.mod-excel .source-strip a:hover{color:var(--accent);text-decoration:none;}

  html.mod-excel .block-nav{position:sticky;top:65px;z-index:25;background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--border-soft);}
  html.mod-excel .block-nav-inner{max-width:var(--maxw);margin:0 auto;padding:10px 24px;display:flex;gap:8px;overflow-x:auto;scrollbar-width:thin;}
  html.mod-excel .nav-pill{flex-shrink:0;display:inline-flex;align-items:center;gap:6px;font-family:var(--ff-mono);font-size:12px;font-weight:600;padding:7px 14px;border-radius:99px;border:1px solid var(--border-soft);color:var(--text-dim);white-space:nowrap;cursor:pointer;transition:all .15s;background:var(--bg-card);}
  html.mod-excel .nav-pill .dot{width:6px;height:6px;border-radius:50%;background:var(--teal);flex-shrink:0;}
  html.mod-excel .nav-pill:hover{border-color:var(--accent);color:var(--accent);text-decoration:none;}
  html.mod-excel .nav-pill.active{background:var(--accent-soft);border-color:var(--accent);color:var(--accent);}

  html.mod-excel .hero{padding:56px 0 36px;}
  html.mod-excel .level-badge{display:inline-flex;align-items:center;gap:8px;font-family:var(--ff-mono);font-size:12px;font-weight:600;color:var(--accent);background:var(--accent-soft);border:1px solid var(--border);padding:6px 12px;border-radius:99px;letter-spacing:.03em;margin-bottom:18px;}
  html.mod-excel .hero h1{font-size:clamp(34px,5.5vw,52px);margin-bottom:14px;}
  html.mod-excel .hero h1 .accent{color:var(--green);}
  html.mod-excel .hero p.lead{font-size:18px;color:var(--text-dim);max-width:640px;}
  html.mod-excel .hero-meta{display:flex;gap:28px;margin-top:28px;flex-wrap:wrap;}
  html.mod-excel .hero-meta div{font-family:var(--ff-mono);font-size:12px;color:var(--text-faint);}
  html.mod-excel .hero-meta strong{display:block;font-family:var(--ff-display);font-size:22px;color:var(--text);font-weight:700;}

  html.mod-excel .section-label{font-family:var(--ff-mono);font-size:12px;font-weight:600;color:var(--teal);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;display:block;}
  html.mod-excel section.block-section{padding:34px 0;}
  html.mod-excel section.block-section h2{font-size:clamp(24px,3.4vw,30px);margin-bottom:10px;}
  html.mod-excel .section-intro{color:var(--text-dim);max-width:680px;margin-bottom:28px;}

  html.mod-excel .module-card{background:var(--bg-card);border:1px solid var(--border-soft);border-radius:var(--radius);padding:26px 26px 24px;margin-bottom:22px;box-shadow:var(--shadow);}
  html.mod-excel .module-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:14px;padding-bottom:16px;border-bottom:1px solid var(--border-soft);}
  html.mod-excel .module-num{font-family:var(--ff-mono);font-size:12px;color:var(--accent);font-weight:600;letter-spacing:.05em;margin-bottom:4px;display:block;}
  html.mod-excel .module-head h3{font-size:22px;}
  html.mod-excel .module-link{font-family:var(--ff-mono);font-size:12.5px;white-space:nowrap;border:1px solid var(--border);padding:7px 13px;border-radius:99px;color:var(--accent);flex-shrink:0;}
  html.mod-excel .module-link:hover{background:var(--accent-soft);text-decoration:none;}
  html.mod-excel .synth-label{font-family:var(--ff-mono);font-size:11.5px;font-weight:600;color:var(--teal);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px;display:block;}

  html.mod-excel .subhead{font-family:var(--ff-mono);font-size:12px;font-weight:700;color:var(--teal);text-transform:uppercase;letter-spacing:.05em;margin:20px 0 8px;display:flex;align-items:center;gap:8px;}
  html.mod-excel .subhead:first-of-type{margin-top:6px;}
  html.mod-excel .sub-body{font-size:14px;color:var(--text-dim);line-height:1.6;}
  html.mod-excel .sub-body ul,html.mod-excel .sub-body ol{margin:6px 0 10px;padding-left:18px;}
  html.mod-excel .sub-body li{margin-bottom:5px;}
  html.mod-excel .sub-body p{margin:0 0 10px;}
  html.mod-excel .sub-body strong{color:var(--text);}
  html.mod-excel .mini-note{background:var(--teal-soft);border-left:3px solid var(--teal);border-radius:6px;padding:9px 13px;font-size:13px;margin:8px 0;}
  html.mod-excel .warn-note{background:var(--accent-soft);border-left:3px solid var(--accent);border-radius:6px;padding:9px 13px;font-size:13px;margin:8px 0;}
  html.mod-excel .good-note{background:var(--green-soft);border-left:3px solid var(--green);border-radius:6px;padding:9px 13px;font-size:13px;margin:8px 0;}

  html.mod-excel table.pt{width:100%;border-collapse:collapse;margin:14px 0 18px;font-size:13.5px;}
  html.mod-excel table.pt th,html.mod-excel table.pt td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--border-soft);vertical-align:top;}
  html.mod-excel table.pt th{font-family:var(--ff-mono);font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--text-faint);font-weight:600;}

  html.mod-excel .kb-row{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 14px;}
  html.mod-excel .kb{display:inline-flex;align-items:center;gap:6px;font-family:var(--ff-mono);font-size:12px;background:var(--bg-elev);border:1px solid var(--border-soft);padding:5px 10px;border-radius:6px;color:var(--text-dim);}
  html.mod-excel .kb kbd{background:var(--bg-card);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:11px;color:var(--accent);}

  html.mod-excel footer{border-top:1px solid var(--border-soft);margin-top:50px;padding:32px 0 50px;}
  html.mod-excel footer p{color:var(--text-faint);font-size:13px;max-width:640px;}
  @media(max-width:640px){html.mod-excel .hero{padding:40px 0 24px;}html.mod-excel .module-card{padding:20px 18px;}}

</style>
