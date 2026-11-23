/**
 * Datos y lógica analítica para el módulo interactivo:
 * Power Apps + Microsoft Lists (+5.000 filas) | Guía Interactiva Pro
 */

export function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function highlightPowerFx(raw) {
  if (!raw) return ''
  const escaped = escapeHtml(raw)
  const tokenRegex =
    /(\/\/[^\n]*)|("[^"\n]*")|\b(Concurrent|ClearCollect|Collect|Clear|Filter|Search|LookUp|SortByColumns|Sort|StartsWith|ShowColumns|DropColumns|RenameColumns|AddColumns|Patch|UpdateIf|RemoveIf|Defaults|ForAll|With|IfError|If|Switch|Coalesce|IsBlank|IsEmpty|Set|UpdateContext|Navigate|Notify|First|Last|CountRows|Sum|Average|DateAdd|Today|Now|Date|TimeUnit|SortOrder|NotificationType|LoadingSpinner|FirstError)\b|\b(\d+)\b/g

  return escaped.replace(tokenRegex, (match, comment, str, fn, num) => {
    if (comment) return `<span class="tw:text-slate-400 tw:italic">${comment}</span>`
    if (str) return `<span class="tw:text-amber-300">${str}</span>`
    if (fn) return `<span class="tw:text-sky-400 tw:font-semibold">${fn}</span>`
    if (num) return `<span class="tw:text-emerald-400">${num}</span>`
    return match
  })
}

// =========================================================================
// SECCIÓN 1: DATOS DE NODOS DEL DIAGRAMA DE FLUJO
// =========================================================================
export function getNodesData(listName = 'PedidosOperativos', indexedCol = 'Estado') {
  const L = listName.trim() || 'MiLista'
  const C = indexedCol.trim() || 'Estado'

  return {
    n1: {
      badge: 'Paso 1 • Origen de Datos',
      badgeColor: 'tw:bg-slate-800 tw:text-white',
      title: 'Petición desde Power Apps a Microsoft Lists',
      metrics: { latency: 'Inicio', ram: '0 MB', limit: '30M filas SP' },
      summary:
        'Tu lista de SharePoint supera las 5.000 filas y quieres consultarla o editarla 100% desde Power Apps sin depender de flujos externos.',
      steps: [
        'Configuración > General > Límite de filas de datos = 2000.',
        'Activa "Mejora del rendimiento de las fórmulas" en Configuración > Próximas características.',
      ],
      formula: `// Configuración obligatoria en Power Apps Studio:\n// Archivo > Configuración > General > Límite de filas de datos = 2000`,
      verify: 'Pulsa en Aduana 1 para inspeccionar el filtro a nivel de servidor SharePoint.',
    },
    n2: {
      badge: 'Aduana 1 • Servidor SharePoint',
      badgeColor: 'tw:bg-amber-100 tw:text-amber-900',
      title: '¿El 1.er criterio de Filter() apunta a una columna INDEXADA?',
      metrics: { latency: '< 180 ms', ram: 'Servidor', limit: 'Umbral 5.000' },
      summary:
        'SharePoint protege sus servidores abortando consultas que obliguen a escanear más de 5.000 filas sin índice. Si la primera condición usa una columna indexada, SharePoint usa su árbol B-Tree y responde al instante.',
      steps: [
        `Ve a SharePoint > Configuración de la lista > Columnas indexadas > Crear índice en "${C}".`,
        'Pon siempre esa columna indexada como PRIMER argumento de Filter().',
      ],
      formula: `// El PRIMER criterio debe ser siempre la columna indexada:\nFilter(\n    ${L},\n    ${C} = "Activo" && FechaRegistro >= Date(2026, 1, 1)\n)`,
      verify: 'En Configuración de la lista > Columnas indexadas aparece tu columna.',
    },
    n_err5000: {
      badge: '🛑 Error Crítico de Servidor',
      badgeColor: 'tw:bg-rose-100 tw:text-rose-800',
      title: 'Bloqueo: Umbral de vista de lista (5.000)',
      metrics: { latency: 'Fallo HTTP 500', ram: '0 filas', limit: 'Bloqueado' },
      summary:
        'Aunque tu fórmula sea 100% delegable (sin triángulo amarillo), SharePoint lanza: "The attempted operation is prohibited because it exceeds the list view threshold".',
      steps: [
        'Causa: Filtraste u ordenaste por una columna sin índice en una lista > 5.000 elementos.',
        'Solución: Crea el índice en SharePoint y colócalo primero en Filter().',
      ],
      formula: `// ❌ FALLA si ColSinIndice no está indexada:\nFilter(${L}, ColSinIndice = "OK" && ${C} = "Activo")\n\n// ✅ FUNCIONA (Columna indexada primero):\nFilter(${L}, ${C} = "Activo" && ColSinIndice = "OK")`,
      verify: 'Los registros vuelven a cargar sin banner rojo en la parte superior.',
    },
    n3: {
      badge: '✅ Aduana 1 Superada',
      badgeColor: 'tw:bg-emerald-100 tw:text-emerald-800',
      title: 'Recorte rápido O(log n) en el servidor SharePoint',
      metrics: { latency: '~150 ms', ram: 'Mínima', limit: 'Subconjunto OK' },
      summary:
        'El motor SQL subyacente de SharePoint localiza el subconjunto de filas usando el índice sin bloquear la tabla.',
      steps: [
        'El servidor ya resolvió el filtro pesado.',
        'Ahora toca evitar que Power Apps corte los resultados en 2.000 filas.',
      ],
      formula: `Filter(${L}, ${C} = "Activo")`,
      verify: 'Sin errores de umbral de vista.',
    },
    n4: {
      badge: 'Aduana 2 • Delegación Power Apps',
      badgeColor: 'tw:bg-indigo-100 tw:text-indigo-800',
      title: '¿La fórmula es 100% delegable (OData)?',
      metrics: { latency: '~200 ms', ram: 'Baja', limit: 'Sin tope 2.000' },
      summary:
        'Si usas operadores no delegables (Search, in, Len, Mid), Power Apps descarga solo 2.000 filas e ignora silenciosamente el resto.',
      steps: [
        'Sustituye Search() por StartsWith() cuando filtres directamente la lista.',
        'Verifica en Comprobador de aplicaciones > Fórmulas que hay 0 avisos de delegación.',
      ],
      formula: `// ✅ 100% Delegable:\nFilter(${L}, ${C} = "Activo" && StartsWith(Title, txtBuscar.Text))\n\n// ❌ NO Delegable (corta en 2.000):\nSearch(${L}, txtBuscar.Text, "Title")`,
      verify: 'Cero triángulos amarillos en el lienzo.',
    },
    n_warn2000: {
      badge: '⚠️ Corte Silencioso en 2.000',
      badgeColor: 'tw:bg-amber-100 tw:text-amber-800',
      title: 'Peligro: Power Apps omite filas a partir de la 2.001',
      metrics: { latency: '~400 ms', ram: '2.000 filas', limit: 'Incompleto' },
      summary:
        'No muestra error rojo, pero si hay 6.000 registros activos, los 4.000 más recientes jamás aparecerán en las búsquedas.',
      steps: [
        'Si necesitas búsqueda parcial (Search), acota primero en el servidor con un Filter() delegable por fecha o estado para bajar de 2.000 filas.',
      ],
      formula: `// ✅ Patrón Híbrido (Servidor <2.000 + Search local):\nSearch(\n    Filter(${L}, ${C} = "Activo" && FechaReg >= DateAdd(Today(), -30, TimeUnit.Days)),\n    txtBuscar.Text,\n    "Title", "Descripcion"\n)`,
      verify: 'Desaparece el subrayado azul de delegación.',
    },
    n5: {
      badge: '🚀 Vía Libre • Decisión de Consumo',
      badgeColor: 'tw:bg-violet-100 tw:text-violet-800',
      title: 'Elige entre Streaming en Galería o Paralelismo en RAM',
      metrics: { latency: 'Óptima', ram: 'Controlada', limit: 'Ilimitado' },
      summary:
        'Si solo necesitas mostrar y navegar registros, usa la Ruta A. Si necesitas calcular totales globales o cargar +2.000 filas en memoria, usa la Ruta B.',
      steps: [
        'Ruta A: Filter() directo en Gallery.Items (paginación de 100 en 100).',
        'Ruta B: Concurrent() + ShowColumns() por bloques de 2.000.',
      ],
      formula: `// Selecciona Ruta A (verde) o Ruta B (morado) abajo.`,
      verify: 'Pulsa cualquiera de los dos nodos finales.',
    },
    n_rutaA: {
      badge: '✅ Ruta A • Paginación Automática',
      badgeColor: 'tw:bg-emerald-100 tw:text-emerald-800',
      title: 'Directo en Gallery.Items (Hasta 30M filas)',
      metrics: { latency: '~180 ms', ram: '~1.2 MB', limit: 'Sin límite' },
      summary:
        'Power Apps pide únicamente 100 registros iniciales y descarga bloques adicionales de 100 conforme el usuario hace scroll.',
      steps: [
        'Activa DelayItemLoading = true y LoadingSpinner = LoadingSpinner.Data.',
        'No uses LookUp() a otras listas dentro de las etiquetas de la galería.',
      ],
      formula: `// Propiedad Items de la Galería:\nSortByColumns(\n    Filter(\n        ${L},\n        ${C} = ddEstado.Selected.Value &&\n        StartsWith(Title, txtBusqueda.Text)\n    ),\n    "FechaRegistro",\n    SortOrder.Descending\n)`,
      verify: 'Haz scroll hacia abajo repetidamente: carga bloques de 100 sin límite.',
    },
    n_rutaB: {
      badge: '⚡ Ruta B • Memoria Masiva Paralela',
      badgeColor: 'tw:bg-violet-100 tw:text-violet-800',
      title: 'Concurrent() + ShowColumns() por bloques',
      metrics: { latency: '~650 ms', ram: '~4.5 MB', limit: 'Hasta 20.000+' },
      summary:
        'Ejecuta múltiples consultas delegables de 2.000 filas en paralelo y las unifica en una colección local limpia.',
      steps: [
        'Usa una columna numérica indexada NumID o rangos de fecha indexados.',
        'Aplica ShowColumns() para descartar las 25+ columnas ocultas de SharePoint.',
      ],
      formula: `Concurrent(\n    ClearCollect(colB1, ShowColumns(Filter(${L}, NumID >= 1 && NumID <= 2000), "ID", "Title", "${C}", "NumID")),\n    ClearCollect(colB2, ShowColumns(Filter(${L}, NumID >= 2001 && NumID <= 4000), "ID", "Title", "${C}", "NumID")),\n    ClearCollect(colB3, ShowColumns(Filter(${L}, NumID >= 4001 && NumID <= 6000), "ID", "Title", "${C}", "NumID"))\n);\nClearCollect(colTotal, colB1, colB2, colB3);\nClear(colB1); Clear(colB2); Clear(colB3);`,
      verify: 'CountRows(colTotal) devuelve 6.000 registros sin advertencias.',
    },
  }
}

// =========================================================================
// SECCIÓN 2: 10 PATRONES DE ARQUITECTURA NIVEL PRO
// =========================================================================
export function getUseCasesData(listName = 'PedidosOperativos', indexedCol = 'Estado') {
  const L = listName.trim() || 'MiLista'
  const C = indexedCol.trim() || 'Estado'

  return [
    {
      cat: 'lectura',
      icon: '📜',
      title: '1. Scroll Infinito (+10k filas)',
      tag: 'Paginación Nativa',
      spConfig: `Indexa "${C}" y "FechaCreacion" en SharePoint > Configuración de la lista > Columnas indexadas.`,
      explanation:
        'Al asignar un Filter() delegable directamente a Gallery.Items, Power Apps descarga bloques de 100 en 100 conforme el usuario baja, evitando saturar la memoria y soportando millones de filas.',
      formula: `// Propiedad Items de la Galería:\nSortByColumns(\n    Filter(\n        ${L},\n        ${C} = ddEstado.Selected.Value\n    ),\n    "FechaCreacion",\n    SortOrder.Descending\n)\n\n// Activa en propiedades de la Galería:\n// DelayItemLoading = true\n// LoadingSpinner = LoadingSpinner.Data`,
      avoid: 'No envuelvas Gallery.Items con ClearCollect() si solo vas a navegar registros.',
    },
    {
      cat: 'lectura',
      icon: '🎛️',
      title: '2. Filtros Opcionales sin Romper Delegación',
      tag: 'Truco Senior',
      spConfig: `Indexa "${C}" y "CodigoCliente".`,
      explanation:
        'Cuando tienes varios desplegables o cajas de búsqueda opcionales (si están vacíos muestran todo), evaluar IsBlank(Control) devuelve un booleano constante ANTES de enviar la consulta a SharePoint, manteniendo el 100% de delegación.',
      formula: `// Si el desplegable o buscador están vacíos, ignora ese filtro sin perder delegación:\nFilter(\n    ${L},\n    (IsBlank(ddEstado.Selected.Value) || ${C} = ddEstado.Selected.Value) &&\n    (IsBlank(txtCodigo.Text) || StartsWith(CodigoCliente, txtCodigo.Text))\n)`,
      avoid: 'NUNCA pongas IsBlank(ColumnaSharePoint) dentro de Filter(); eso SÍ rompe la delegación.',
    },
    {
      cat: 'lectura',
      icon: '🔍',
      title: '3. Search() Parcial Híbrido',
      tag: 'Búsqueda Libre',
      spConfig: `Indexa "${C}" y "FechaRegistro" para garantizar que el filtro inicial devuelva < 2.000 filas.`,
      explanation:
        'Search() busca palabras en mitad de un texto, pero no delega en SharePoint. Acota primero en el servidor por fecha o estado (< 2.000 filas) y aplica Search() por fuera en memoria.',
      formula: `// 1º Filtra en servidor (< 2.000 filas) -> 2º Busca texto parcial en RAM:\nSearch(\n    Filter(\n        ${L},\n        ${C} = "Activo" &&\n        FechaRegistro >= DateAdd(Today(), -30, TimeUnit.Days)\n    ),\n    txtBuscador.Text,\n    "Title", "Observaciones", "ClienteNombre"\n)`,
      avoid: 'Nunca apliques Search() directamente sobre la lista completa si pasa de 2.000 filas.',
    },
    {
      cat: 'rendimiento',
      icon: '🧠',
      title: '4. Patrón With() para Cálculos Previos',
      tag: 'Cero Recálculos',
      spConfig: `Indexa "FechaRegistro" y "${C}".`,
      explanation:
        'Las operaciones complejas de fechas dentro de Filter() a veces generan advertencias de delegación. Precalcular los límites dentro de With() limpia la consulta OData y evita evaluar fórmulas repetidamente.',
      formula: `With(\n    {\n        varFechaInicio: DateAdd(Today(), -15, TimeUnit.Days),\n        varEstadoObjetivo: ddEstado.Selected.Value\n    },\n    Filter(\n        ${L},\n        ${C} = varEstadoObjetivo &&\n        FechaRegistro >= varFechaInicio\n    )\n)`,
      avoid:
        'Evita meter funciones volátiles o conversiones complejas directamente dentro de los operadores de Filter().',
    },
    {
      cat: 'rendimiento',
      icon: '⚡',
      title: '5. Matar el Problema N+1 en Galerías',
      tag: 'Velocidad x20',
      spConfig: 'Guarda los IDs relacionados como Número o Texto simple en lugar de columnas Lookup.',
      explanation:
        'Si pones LookUp(Clientes, ID = ThisItem.ClienteID) dentro de una galería, Power Apps lanza 100 peticiones de red individuales. Precarga la tabla maestra en colección al iniciar y cruza en memoria.',
      formula: `// 1. En App.OnStart (descarga tabla maestra ligera):\nClearCollect(\n    colClientes,\n    ShowColumns(ClientesMaestra, "ID", "Title", "CIF")\n);\n\n// 2. Dentro de la etiqueta de la Galería (0 llamadas de red, 0 ms):\nLookUp(colClientes, ID = ThisItem.ClienteID).Title`,
      avoid: 'Prohibido hacer LookUp() directo contra conectores externos dentro de una galería.',
    },
    {
      cat: 'escritura',
      icon: '🔢',
      title: '6. Autonumérico NumID sin Flujos',
      tag: '100% Nativo',
      spConfig: 'Crea la columna "NumID" (Número, 0 decimales) en SharePoint e indexala.',
      explanation:
        'Como la columna ID estándar no delega rangos >= o <=, genera tu propio correlativo NumID al guardar leyendo el valor máximo actual mediante ordenación descendente indexada.',
      formula: `// En OnSelect del botón Guardar:\nWith(\n    {\n        varNuevoNumID: Coalesce(\n            First(SortByColumns(${L}, "NumID", SortOrder.Descending)).NumID,\n            0\n        ) + 1\n    },\n    Patch(\n        ${L},\n        Defaults(${L}),\n        {\n            Title: txtTitulo.Text,\n            ${C}: "Activo",\n            NumID: varNuevoNumID\n        }\n    )\n)`,
      avoid: 'Si la lista supera 5.000 filas y "NumID" no está indexada, SortByColumns() fallará.',
    },
    {
      cat: 'escritura',
      icon: '📦',
      title: '7. Patch Masivo en Bloque (50+ filas)',
      tag: 'Operación Atómica',
      spConfig: `Indexa "${C}".`,
      explanation:
        'Para aprobar, cerrar o reasignar decenas de registros seleccionados en una galería, construye una tabla con su ID y los campos a modificar y envíala en un único Patch().',
      formula: `// Construye tabla de cambios y envía todo en una sola petición:\nClearCollect(\n    colCambios,\n    ForAll(\n        colSeleccionados As reg,\n        {\n            ID: reg.ID,\n            ${C}: "Cerrado",\n            FechaCierre: Now()\n        }\n    )\n);\nPatch(${L}, colCambios);\nClear(colSeleccionados);`,
      avoid: 'Nunca hagas ForAll(colSeleccionados, Patch(...)) porque ejecuta N peticiones secuenciales.',
    },
    {
      cat: 'escritura',
      icon: '🛡️',
      title: '8. Blindaje con IfError() ante HTTP 429',
      tag: 'Resiliencia',
      spConfig: 'Ninguna especial.',
      explanation:
        'En entornos con muchos usuarios concurrentes, SharePoint puede limitar peticiones temporalmente (Throttling 429). Captura el error con IfError() para evitar pérdida de datos silenciosa.',
      formula: `IfError(\n    Patch(\n        ${L},\n        ThisItem,\n        { ${C}: "Procesado" }\n    ),\n    Notify(\n        "Error de red o límite de SharePoint: " & FirstError.Message,\n        NotificationType.Error\n    ),\n    Notify("Registro actualizado correctamente", NotificationType.Success)\n)`,
      avoid: 'No dejes Patch() críticos sin captura de errores en apps de alto tráfico.',
    },
    {
      cat: 'rendimiento',
      icon: '🗜️',
      title: '9. ShowColumns() + Concurrent()',
      tag: '-70% Tráfico Red',
      spConfig: `Indexa "${C}".`,
      explanation:
        'SharePoint envía +25 metadatos ocultos por fila. Usa ShowColumns() por fuera de Filter() para descargar únicamente los 4 o 5 campos que necesita tu pantalla.',
      formula: `Concurrent(\n    ClearCollect(\n        colActivos,\n        ShowColumns(\n            Filter(${L}, ${C} = "Activo"),\n            "ID", "Title", "${C}", "NumID"\n        )\n    ),\n    ClearCollect(\n        colCategorias,\n        ShowColumns(ListaCategorias, "ID", "Title")\n    )\n)`,
      avoid: 'ShowColumns() debe ir siempre POR FUERA de Filter(), nunca dentro.',
    },
    {
      cat: 'escritura',
      icon: '🗄️',
      title: '10. Archivado Lógico Indexado',
      tag: 'Ciclo de Vida',
      spConfig: 'Crea columna Número "Archivado" (predeterminado 0) e indexala.',
      explanation:
        'Sin Power Automate no mueves registros a otra lista; los ocultas de las vistas operativas marcando Archivado = 1. SharePoint soporta 30M de filas si filtras por este índice.',
      formula: `// Vista operativa diaria:\nFilter(${L}, Archivado = 0 && ${C} = "Pendiente")\n\n// Botón manual de archivado:\nPatch(${L}, ThisItem, { Archivado: 1, ${C}: "Histórico" })`,
      avoid:
        'Usa Número (0/1) en lugar de Sí/No para evitar inconsistencias de delegación entre regiones.',
    },
  ]
}

// =========================================================================
// SECCIÓN 3: CONSTRUCTOR DE CONCURRENT() GENERADOR
// =========================================================================
export function buildGeneratorString({
  listName = 'PedidosOperativos',
  indexedCol = 'Estado',
  genMode = 'number',
  genBlocks = 3,
  useExtra = true,
  useShowCols = true,
  useIfError = true,
}) {
  const L = listName.trim() || 'MiLista'
  const C = indexedCol.trim() || 'Estado'
  const extraPrefix = useExtra ? `${C} = "Activo" && ` : ''
  const n = genBlocks

  let lines = []
  let colNames = []

  const wrapFilter = (filterExpr) => {
    return useShowCols
      ? `ShowColumns(\n            ${filterExpr},\n            "ID", "Title", "${C}", "NumID"\n        )`
      : filterExpr
  }

  if (genMode === 'number') {
    for (let i = 0; i < n; i++) {
      const start = i * 2000 + 1
      const end = (i + 1) * 2000
      const colName = `colBloque${i + 1}`
      colNames.push(colName)
      const comma = i < n - 1 ? ',' : ''
      const fExpr = `Filter(${L}, ${extraPrefix}NumID >= ${start} && NumID <= ${end})`
      lines.push(`        ClearCollect(\n            ${colName},\n            ${wrapFilter(fExpr)}\n        )${comma}`)
    }
  } else if (genMode === 'date') {
    const ranges = [
      { start: 'Date(2026, 1, 1)', end: 'Date(2026, 2, 15)' },
      { start: 'Date(2026, 2, 16)', end: 'Date(2026, 3, 31)' },
      { start: 'Date(2026, 4, 1)', end: 'Date(2026, 5, 15)' },
      { start: 'Date(2026, 5, 16)', end: 'Date(2026, 6, 30)' },
      { start: 'Date(2026, 7, 1)', end: 'Date(2026, 8, 15)' },
      { start: 'Date(2026, 8, 16)', end: 'Date(2026, 9, 30)' },
      { start: 'Date(2026, 10, 1)', end: 'Date(2026, 11, 15)' },
      { start: 'Date(2026, 11, 16)', end: 'Date(2026, 12, 31)' },
      { start: 'Date(2025, 7, 1)', end: 'Date(2025, 12, 31)' },
      { start: 'Date(2025, 1, 1)', end: 'Date(2025, 6, 30)' },
    ]
    for (let i = 0; i < n; i++) {
      const r = ranges[i] || ranges[0]
      const colName = `colTramo${i + 1}`
      colNames.push(colName)
      const comma = i < n - 1 ? ',' : ''
      const fExpr = `Filter(${L}, ${extraPrefix}FechaRegistro >= ${r.start} && FechaRegistro <= ${r.end})`
      lines.push(`        ClearCollect(\n            ${colName},\n            ${wrapFilter(fExpr)}\n        )${comma}`)
    }
  } else {
    const zones = ['Norte', 'Sur', 'Centro', 'Este', 'Oeste', 'Noroeste', 'Noreste', 'Suroeste', 'Sureste', 'Islas']
    for (let i = 0; i < n; i++) {
      const z = zones[i] || `Zona_${i + 1}`
      const colName = `colZona_${z}`
      colNames.push(colName)
      const comma = i < n - 1 ? ',' : ''
      const fExpr = `Filter(${L}, ${extraPrefix}ZonaIndexada = "${z}")`
      lines.push(`        ClearCollect(\n            ${colName},\n            ${wrapFilter(fExpr)}\n        )${comma}`)
    }
  }

  const coreCode = `    Concurrent(\n${lines.join('\n')}\n    );\n    // Unifica todos los hilos en una única colección maestra:\n    ClearCollect(\n        colTotal,\n        ${colNames.join(', ')}\n    );\n    // Libera memoria RAM eliminando bloques intermedios:\n    ${colNames.map((c) => `Clear(${c});`).join(' ')}`

  if (useIfError) {
    return `// Carga paralela de hasta ${(n * 2000).toLocaleString('es-ES')} filas con control de errores y RAM\nSet(varCargandoMasivo, true);\nIfError(\n${coreCode},\n    Notify("Error al descargar bloques: " & FirstError.Message, NotificationType.Error)\n);\nSet(varCargandoMasivo, false);`
  }
  return `// Carga paralela de hasta ${(n * 2000).toLocaleString('es-ES')} filas\n${coreCode.replace(/^    /gm, '')}`
}

// =========================================================================
// SECCIÓN 4: RAYOS X DE FÓRMULAS (AUDITOR ESTÁTICO)
// =========================================================================
export function getAuditorSamples(listName = 'PedidosOperativos', indexedCol = 'Estado') {
  const L = listName.trim() || 'MiLista'
  const C = indexedCol.trim() || 'Estado'

  return {
    search: `// Ejemplo 1: Uso de Search() directo sobre lista grande\nSearch(\n    ${L},\n    txtBuscar.Text,\n    "Title", "Descripcion"\n)`,
    idrange: `// Ejemplo 2: Intento de particionar usando la columna estándar ID\nClearCollect(\n    colDatos,\n    Filter(${L}, ID >= 2001 && ID <= 4000)\n)`,
    forallpatch: `// Ejemplo 3: Bucle N+1 con Patch individual\nForAll(\n    galPedidos.AllItems,\n    Patch(${L}, ThisRecord, { Estado: "Revisado" })\n)`,
    pro: `// Ejemplo 4: Fórmula Nivel Arquitecto\nWith(\n    { varLimiteFecha: DateAdd(Today(), -30, TimeUnit.Days) },\n    ShowColumns(\n        Filter(\n            ${L},\n            ${C} = "Activo" &&\n            FechaRegistro >= varLimiteFecha &&\n            StartsWith(Title, txtBuscar.Text)\n        ),\n        "ID", "Title", "${C}", "NumID"\n    )\n)`,
  }
}

export function auditFormula(code) {
  if (!code || !code.trim()) {
    return {
      score: 0,
      badgeText: 'Sin código',
      scoreColor: 'tw:text-slate-400',
      findings: [],
    }
  }

  let score = 100
  const findings = []

  // Regla 1: Search() directo
  if (/\bSearch\s*\(/i.test(code)) {
    score -= 35
    findings.push({
      type: 'error',
      title: 'Función Search() detectada',
      desc: 'Search() NO es delegable en SharePoint. Si la fuente interna tiene más de 2.000 registros, cortará silenciosamente los resultados.',
      fix: 'Sustituye Search() por StartsWith() dentro de Filter(), o asegúrate de que el primer argumento de Search() sea un Filter() delegable que devuelva menos de 2.000 filas.',
    })
  }

  // Regla 2: Operador "in"
  if (/\sin\s+/i.test(code)) {
    score -= 30
    findings.push({
      type: 'error',
      title: 'Operador "in" detectado',
      desc: 'El operador de pertenencia "in" no se delega a SharePoint.',
      fix: 'Reemplázalo por comparaciones explícitas con "=" y "||" (Or) o por StartsWith().',
    })
  }

  // Regla 3: Uso de columna estándar ID con >, <, >=, <=
  if (/\bID\s*(>=|<=|>|<)/i.test(code)) {
    score -= 30
    findings.push({
      type: 'error',
      title: 'Rango numérico sobre columna estándar "ID"',
      desc: 'En Microsoft Lists, la columna ID del sistema SOLO delega el operador igual (=). Usar >= o <= rompe la delegación.',
      fix: 'Crea una columna personalizada de tipo Número llamada "NumID", indexala en SharePoint y filtra por ella.',
    })
  }

  // Regla 4: ForAll con Patch dentro
  if (/ForAll\s*\([\s\S]*?\bPatch\s*\(/i.test(code)) {
    score -= 35
    findings.push({
      type: 'error',
      title: 'Anti-patrón N+1: Patch() dentro de ForAll()',
      desc: 'Ejecuta una petición HTTP independiente por cada fila. Con 50 filas bloqueará la pantalla y puede provocar errores HTTP 429.',
      fix: 'Usa ForAll() para construir una colección limpia con { ID: ..., Campo: ... } y pásala a un único Patch(Lista, colCambios).',
    })
  }

  // Regla 5: ClearCollect sin ShowColumns
  if (/ClearCollect\s*\(/i.test(code) && !/ShowColumns\s*\(/i.test(code)) {
    score -= 10
    findings.push({
      type: 'warn',
      title: 'ClearCollect() sin ShowColumns()',
      desc: 'Estás descargando más de 25 columnas ocultas del sistema de SharePoint por cada fila.',
      fix: 'Envuelve el Filter() con ShowColumns(..., "ID", "Title", ...) para reducir hasta un 70% el consumo de RAM.',
    })
  }

  // Regla 6: IsBlank(Columna) dentro de Filter
  if (/Filter\s*\([\s\S]*?IsBlank\s*\(\s*[a-zA-Z0-9_]+\s*\)/i.test(code)) {
    score -= 20
    findings.push({
      type: 'warn',
      title: 'Posible IsBlank() sobre columna de SharePoint',
      desc: 'IsBlank(Control.Text) es delegable, pero IsBlank(ColumnaSharePoint) NO es delegable.',
      fix: 'Filtra por valores explícitos o guarda un valor por defecto como "Sin asignar" o 0.',
    })
  }

  // Regla 7: Buenas prácticas detectadas
  if (/With\s*\(/i.test(code)) {
    findings.push({
      type: 'ok',
      title: 'Uso excelente de With()',
      desc: 'Precalcular variables de filtro evita recálculos por fila y limpia la consulta OData.',
    })
  }
  if (/StartsWith\s*\(/i.test(code)) {
    findings.push({
      type: 'ok',
      title: 'Búsqueda delegable con StartsWith()',
      desc: 'SharePoint resuelve StartsWith() directamente en el servidor usando índices.',
    })
  }

  score = Math.max(0, score)
  const scoreColor = score >= 85 ? 'tw:text-emerald-500' : score >= 50 ? 'tw:text-amber-500' : 'tw:text-rose-500'
  const badgeText =
    score >= 85 ? 'Apta para +5.000 filas' : score >= 50 ? 'Requiere ajustes' : 'Riesgo crítico de corte/bloqueo'

  if (findings.length === 0) {
    findings.push({
      type: 'ok',
      title: 'Sin patrones problemáticos detectados',
      desc: 'Asegúrate únicamente de que la primera columna de tu Filter() esté indexada en SharePoint.',
    })
  }

  return {
    score,
    badgeText,
    scoreColor,
    findings,
  }
}

// =========================================================================
// SECCIÓN 5: MATRIZ DE DELEGACIÓN SHAREPOINT (SEMÁFORO)
// =========================================================================
export const semaforoItems = [
  {
    status: 'ok',
    badge: '✅ 100% Delegable',
    title: 'Filter() con =, <>, >=, <=',
    desc: 'Soporta Texto, Número y Fecha. Indexa la primera columna del filtro en SharePoint para superar las 5.000 filas.',
    alt: 'Ordena tus condiciones poniendo primero la columna indexada más restrictiva.',
  },
  {
    status: 'ok',
    badge: '✅ 100% Delegable',
    title: 'StartsWith(Columna, Texto)',
    desc: 'Busca por prefijo en el servidor de SharePoint. Sustituto oficial delegable de Search().',
    alt: 'Ideal para códigos, DNI, matrículas, referencias y nombres.',
  },
  {
    status: 'ok',
    badge: '✅ 100% Delegable',
    title: 'Sort() y SortByColumns()',
    desc: 'Ordenación en servidor. Si la lista tiene > 5.000 filas, la columna por la que ordenas DEBE estar indexada.',
    alt: 'No ordenes por columnas calculadas ni de tipo Persona/Lookup.',
  },
  {
    status: 'ok',
    badge: '✅ 100% Delegable',
    title: 'IsBlank(Control) en filtros opcionales',
    desc: 'Evaluar IsBlank(txtFiltro.Text) o IsBlank(ddEstado.Selected.Value) se resuelve antes de consultar SharePoint.',
    alt: 'Permite crear pantallas de búsqueda multi-criterio sin perder delegación.',
  },
  {
    status: 'warn',
    badge: '⚠️ Trampa Clásica',
    title: 'Columna estándar ID con >= o <=',
    desc: 'La columna ID de SharePoint solo delega el operador igual (=). Con mayor o menor que aparece triángulo amarillo.',
    alt: 'Crea una columna numérica indexada "NumID" y rellénala al guardar.',
  },
  {
    status: 'warn',
    badge: '⚠️ Trampa Clásica',
    title: 'Columnas Persona, Lookup y Opción Múltiple',
    desc: 'Penalizan gravemente el rendimiento y chocan contra el umbral de 5.000 elementos de SharePoint.',
    alt: 'Guarda el Email del usuario o el ID relacionado en columnas simples de Texto o Número.',
  },
  {
    status: 'no',
    badge: '❌ No Delegable',
    title: 'Search() e "in" (Texto contenido)',
    desc: 'No se traducen a OData en SharePoint. Cortan silenciosamente en las primeras 2.000 filas.',
    alt: 'Filtra primero en servidor (< 2.000 filas) con Filter() y aplica Search() por fuera.',
  },
  {
    status: 'no',
    badge: '❌ No Delegable',
    title: 'CountRows(), Sum(), Average() directos',
    desc: 'Las agregaciones directas sobre listas de SharePoint solo calculan hasta el límite de 2.000 registros.',
    alt: 'Descarga por bloques con Concurrent() en colTotal y calcula sobre la colección local.',
  },
]

// =========================================================================
// SECCIÓN 6: CHECKLIST PRE-PRODUCCIÓN
// =========================================================================
export const checklistData = [
  { id: 'c1', area: 'Power Apps Studio', text: 'Límite de filas de datos subido de 500 a 2000 en Configuración > General.' },
  { id: 'c2', area: 'Microsoft Lists', text: 'Columnas usadas en Filter() y SortByColumns() indexadas en SharePoint (máx. 20).' },
  { id: 'c3', area: 'Power Fx', text: 'El primer argumento de cada Filter() apunta siempre a una columna indexada.' },
  { id: 'c4', area: 'Power Apps Studio', text: 'Comprobador de aplicaciones > Fórmulas revisado con 0 advertencias de delegación.' },
  { id: 'c5', area: 'Arquitectura', text: 'Cero funciones LookUp() a listas externas dentro de etiquetas de galerías (sin N+1).' },
  { id: 'c6', area: 'Galerías', text: 'DelayItemLoading = true y LoadingSpinner = LoadingSpinner.Data activados.' },
  { id: 'c7', area: 'Memoria RAM', text: 'ShowColumns() aplicado en todas las colecciones ClearCollect() para evitar metadatos.' },
  { id: 'c8', area: 'Microsoft Lists', text: 'Columna numérica indexada NumID creada si se usan rangos >= / <=.' },
  { id: 'c9', area: 'Escritura', text: 'Actualizaciones múltiples agrupadas en un único Patch(Lista, TablaCambios).' },
  { id: 'c10', area: 'Resiliencia', text: 'Operaciones Patch() críticas protegidas con IfError() y notificaciones claras.' },
]
