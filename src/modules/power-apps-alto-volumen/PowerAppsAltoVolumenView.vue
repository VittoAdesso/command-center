<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { usePageEnv } from '../../composables/usePageEnv'
import {
  highlightPowerFx,
  getNodesData,
  getUseCasesData,
  buildGeneratorString,
  getAuditorSamples,
  auditFormula,
  semaforoItems,
  checklistData,
} from './altoVolumenData'

// ── Entorno de página ────────────────────────────────────────────────────────
usePageEnv({
  title: 'Power Apps + Microsoft Lists (+5.000 filas) | Guía Interactiva',
  htmlClass: ['mod-power-apps-volumen', 'tw:scroll-smooth'],
  bodyClass: [
    'tw-page',
    'power-apps-volumen-page',
    'tw:m-0',
    'tw:min-h-screen',
    'tw:flex',
    'tw:flex-col',
    'tw:antialiased',
    'tw:selection:bg-violet-200',
    'tw:selection:text-violet-900',
  ],
})

onUnmounted(() => {
  document.documentElement.classList.remove('mod-power-apps-volumen')
})

// ── Estado Global Reactivo ───────────────────────────────────────────────────
const darkMode = ref(false)
const listName = ref('PedidosOperativos')
const indexedCol = ref('Estado')
const activeTab = ref('tab-diagrama')

// Toast flotante
const toastState = reactive({
  visible: false,
  message: 'Fórmula copiada al portapapeles',
})
let toastTimer = null

function showToast(msg) {
  toastState.message = msg
  toastState.visible = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastState.visible = false
  }, 2600)
}

function copyToClipboard(text, customMsg = 'Fórmula Power Fx copiada al portapapeles') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => showToast(customMsg))
      .catch(() => fallbackCopy(text, customMsg))
    return
  }
  fallbackCopy(text, customMsg)
}

function fallbackCopy(text, customMsg) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.left = '-9999px'
  document.body.appendChild(textArea)
  textArea.select()
  try {
    document.execCommand('copy')
    showToast(customMsg)
  } catch {
    showToast('Selecciona el código y pulsa Ctrl+C / Cmd+C')
  } finally {
    document.body.removeChild(textArea)
  }
}

function toggleTheme() {
  darkMode.value = !darkMode.value
}

// ── 1. Diagrama de Flujo ─────────────────────────────────────────────────────
const selectedNodeId = ref('n1')
const activeRouteFilter = ref('reset')

const nodesData = computed(() => getNodesData(listName.value, indexedCol.value))
const currentNode = computed(() => nodesData.value[selectedNodeId.value] || nodesData.value.n1)

const allNodeIds = ['n1', 'n2', 'n_err5000', 'n3', 'n4', 'n_warn2000', 'n5', 'n_rutaA', 'n_rutaB']

const routeMapping = {
  gallery: ['n1', 'n2', 'n3', 'n4', 'n5', 'n_rutaA'],
  collection: ['n1', 'n2', 'n3', 'n4', 'n5', 'n_rutaB'],
  error5000: ['n1', 'n2', 'n_err5000'],
  reset: allNodeIds,
}

function isNodeDimmed(nodeId) {
  const allowed = routeMapping[activeRouteFilter.value] || allNodeIds
  return !allowed.includes(nodeId)
}

function selectNode(nodeId) {
  selectedNodeId.value = nodeId
}

function highlightRoute(routeType) {
  activeRouteFilter.value = routeType
  if (routeType === 'gallery') selectNode('n_rutaA')
  else if (routeType === 'collection') selectNode('n_rutaB')
  else if (routeType === 'error5000') selectNode('n_err5000')
  else selectNode('n1')
}

// ── 2. 10 Patrones Pro ───────────────────────────────────────────────────────
const caseCategory = ref('all')
const selectedUseCaseIndex = ref(0)

const useCases = computed(() => getUseCasesData(listName.value, indexedCol.value))

const filteredUseCases = computed(() => {
  return useCases.value
    .map((c, origIdx) => ({ ...c, origIdx }))
    .filter((c) => caseCategory.value === 'all' || c.cat === caseCategory.value)
})

const currentUseCase = computed(() => useCases.value[selectedUseCaseIndex.value] || useCases.value[0])

function setCaseCategory(cat) {
  caseCategory.value = cat
  const firstMatch = filteredUseCases.value[0]
  if (firstMatch) {
    selectedUseCaseIndex.value = firstMatch.origIdx
  }
}

function selectUseCase(idx) {
  selectedUseCaseIndex.value = idx
}

// ── 3. Generador Concurrent() ────────────────────────────────────────────────
const genMode = ref('number')
const genBlocks = ref(3)
const genExtraFilter = ref(true)
const genShowColumns = ref(true)
const genIfError = ref(true)

const generatedCode = computed(() => {
  return buildGeneratorString({
    listName: listName.value,
    indexedCol: indexedCol.value,
    genMode: genMode.value,
    genBlocks: genBlocks.value,
    useExtra: genExtraFilter.value,
    useShowCols: genShowColumns.value,
    useIfError: genIfError.value,
  })
})

const genTelemetry = computed(() => {
  const n = genBlocks.value
  const rows = n * 2000
  const ramEst = genShowColumns.value ? (rows * 0.00045).toFixed(1) : (rows * 0.0018).toFixed(1)
  const throttling = n <= 4 ? 'Bajo (Óptimo)' : n <= 6 ? 'Moderado' : 'Alto (Cuidado con HTTP 429)'
  const throttlingColor =
    n <= 4 ? 'tw:text-emerald-400' : n <= 6 ? 'tw:text-amber-400' : 'tw:text-rose-400'

  return {
    rows: rows.toLocaleString('es-ES'),
    ramEst,
    throttling,
    throttlingColor,
    isOptimized: genShowColumns.value,
  }
})

// ── 4. Rayos X de Fórmulas (Auditor) ─────────────────────────────────────────
const auditorSamples = computed(() => getAuditorSamples(listName.value, indexedCol.value))
const auditorCode = ref('')

function loadSample(key) {
  auditorCode.value = auditorSamples.value[key] || ''
}

const auditResult = computed(() => auditFormula(auditorCode.value))

// ── 5. Matriz de Delegación (Semáforo) ───────────────────────────────────────
const semaforoSearch = ref('')
const semaforoFilter = ref('all')

const filteredSemaforo = computed(() => {
  const q = semaforoSearch.value.trim().toLowerCase()
  return semaforoItems.filter((item) => {
    const matchStatus = semaforoFilter.value === 'all' || item.status === semaforoFilter.value
    const matchText =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.alt.toLowerCase().includes(q)
    return matchStatus && matchText
  })
})

// ── 6. Checklist Pre-Producción ──────────────────────────────────────────────
const CHECKLIST_STORAGE_KEY = 'pa_alto_volumen_checklist_state_v1'
const checkedItems = reactive({})

onMounted(() => {
  try {
    const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      Object.assign(checkedItems, parsed)
    }
  } catch {}
  // Cargar muestra inicial en auditor
  loadSample('search')
})

function toggleChecklist(id) {
  checkedItems[id] = !checkedItems[id]
  try {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(checkedItems))
  } catch {}
}

const checklistCompletedCount = computed(() => {
  return checklistData.filter((i) => checkedItems[i.id]).length
})

const checklistProgressPct = computed(() => {
  return Math.round((checklistCompletedCount.value / checklistData.length) * 100)
})

function copyChecklistReport() {
  const lines = checklistData.map((i) => `${checkedItems[i.id] ? '[X]' : '[ ]'} (${i.area}) ${i.text}`)
  const report =
    `INFORME AUDITORÍA POWER APPS + SHAREPOINT (${listName.value})\n` +
    '='.repeat(55) +
    '\n' +
    lines.join('\n')
  copyToClipboard(report, 'Informe de auditoría copiado al portapapeles')
}
</script>

<template>
  <div
    :class="[
      'tw:min-h-screen tw:w-full tw:flex tw:flex-col tw:transition-colors tw:duration-200',
      darkMode ? 'tw:bg-[#090d16] tw:text-slate-100' : 'tw:bg-[#f1f5f9] tw:text-slate-900',
    ]"
  >
    <!-- Notificación Toast Flotante -->
    <div
      v-show="toastState.visible"
      class="tw:fixed tw:bottom-5 tw:right-5 tw:z-50 tw:transform tw:transition-all tw:duration-300"
    >
      <div
        class="tw:bg-slate-900 tw:text-white tw:px-4 tw:py-3 tw:rounded-xl tw:shadow-2xl tw:border tw:border-violet-500/40 tw:flex tw:items-center tw:gap-3 tw:text-sm tw:font-medium"
      >
        <span
          class="tw:flex tw:h-6 tw:w-6 tw:items-center tw:justify-center tw:rounded-full tw:bg-emerald-500/20 tw:text-emerald-400"
        >
          <svg class="tw:w-4 tw:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <span>{{ toastState.message }}</span>
      </div>
    </div>

    <!-- Cabecera Principal Estilo Enterprise Studio -->
    <header
      class="tw:bg-gradient-to-br tw:from-slate-950 tw:via-[#1e1035] tw:to-slate-900 tw:text-white tw:shadow-xl tw:border-b tw:border-white/10"
    >
      <div class="tw:max-w-7xl tw:mx-auto tw:px-4 sm:tw:px-6 lg:tw:px-8 tw:py-6 sm:tw:py-8">
        <!-- Barra superior de estado y controles -->
        <div class="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-3 tw:mb-4">
          <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
            <RouterLink
              to="/"
              class="tw:inline-flex tw:items-center tw:gap-1.5 tw:px-3 tw:py-1 tw:rounded-full tw:bg-white/10 tw:hover:bg-white/20 tw:border tw:border-white/15 tw:text-xs tw:font-semibold tw:text-slate-200 tw:transition-colors"
            >
              ← Centro de Mando
            </RouterLink>
            <span
              class="tw:inline-flex tw:items-center tw:gap-2 tw:px-3 tw:py-1 tw:rounded-full tw:bg-violet-500/20 tw:border tw:border-violet-400/30 tw:text-violet-200 tw:text-xs tw:font-bold"
            >
              <span class="tw:w-2 tw:h-2 tw:rounded-full tw:bg-emerald-400 tw:animate-pulse" />
              EDICIÓN ARQUITECTO • 100% POWER FX
            </span>
            <span
              class="tw:hidden sm:tw:inline-flex tw:items-center tw:px-2.5 tw:py-1 tw:rounded-full tw:bg-white/5 tw:border tw:border-white/10 tw:text-slate-300 tw:text-xs tw:font-mono"
            >
              Sin PAD • Sin Flujos Cloud
            </span>
          </div>

          <!-- Botón Modo Oscuro / Claro -->
          <button
            type="button"
            class="tw:px-3 tw:py-1.5 tw:rounded-xl tw:bg-white/10 hover:tw:bg-white/20 tw:border tw:border-white/15 tw:text-xs tw:font-semibold tw:text-slate-200 tw:flex tw:items-center tw:gap-2 tw:transition-colors tw:cursor-pointer"
            @click="toggleTheme"
          >
            <span>{{ darkMode ? '☀️' : '🌙' }}</span>
            <span>{{ darkMode ? 'Modo Claro' : 'Modo Estudio Oscuro' }}</span>
          </button>
        </div>

        <div class="tw:flex tw:flex-col lg:tw:flex-row lg:tw:items-center lg:tw:justify-between tw:gap-6">
          <div class="tw:space-y-3">
            <h1 class="tw:text-2xl sm:tw:text-3xl lg:tw:text-4xl tw:font-extrabold tw:tracking-tight">
              Power Apps + Microsoft Lists
              <span class="tw:bg-gradient-to-r tw:from-violet-300 tw:to-sky-300 tw:bg-clip-text tw:text-transparent">
                Alto Rendimiento
              </span>
            </h1>
            <p class="tw:text-slate-300 tw:text-sm sm:tw:text-base tw:max-w-3xl tw:leading-relaxed">
              Guía definitiva de ingeniería Power Fx para operar listas masivas (+5.000 filas) sin bloqueos de servidor
              ni cortes silenciosos de delegación.
            </p>

            <!-- KPIs de Límites Técnicos -->
            <div class="tw:grid tw:grid-cols-2 sm:tw:grid-cols-4 tw:gap-2.5 tw:pt-1 tw:max-w-2xl">
              <div class="tw:bg-white/5 tw:border tw:border-white/10 tw:rounded-xl tw:px-3 tw:py-2">
                <div class="tw:text-[11px] tw:text-slate-400 tw:uppercase tw:font-semibold">Capacidad Lista</div>
                <div class="tw:text-sm sm:tw:text-base tw:font-extrabold tw:text-emerald-400 tw:font-mono">
                  30.000.000
                </div>
              </div>
              <div class="tw:bg-white/5 tw:border tw:border-white/10 tw:rounded-xl tw:px-3 tw:py-2">
                <div class="tw:text-[11px] tw:text-slate-400 tw:uppercase tw:font-semibold">Umbral Vista SP</div>
                <div class="tw:text-sm sm:tw:text-base tw:font-extrabold tw:text-amber-400 tw:font-mono">
                  5.000 filas
                </div>
              </div>
              <div class="tw:bg-white/5 tw:border tw:border-white/10 tw:rounded-xl tw:px-3 tw:py-2">
                <div class="tw:text-[11px] tw:text-slate-400 tw:uppercase tw:font-semibold">Delegación PA</div>
                <div class="tw:text-sm sm:tw:text-base tw:font-extrabold tw:text-sky-400 tw:font-mono">
                  2.000 filas
                </div>
              </div>
              <div class="tw:bg-white/5 tw:border tw:border-white/10 tw:rounded-xl tw:px-3 tw:py-2">
                <div class="tw:text-[11px] tw:text-slate-400 tw:uppercase tw:font-semibold">Índices / Lista</div>
                <div class="tw:text-sm sm:tw:text-base tw:font-extrabold tw:text-violet-300 tw:font-mono">
                  Máx. 20
                </div>
              </div>
            </div>
          </div>

          <!-- Configurador Rápido de Nombres (Variables Globales Reactivas) -->
          <div
            class="tw:bg-white/10 tw:backdrop-blur-md tw:border tw:border-white/15 tw:rounded-2xl tw:p-4 tw:w-full lg:tw:w-80 tw:shrink-0 tw:shadow-inner"
          >
            <div class="tw:flex tw:items-center tw:justify-between tw:mb-2">
              <p class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:text-violet-200">
                ⚙️ Variables Globales
              </p>
              <span class="tw:text-[10px] tw:text-emerald-300 tw:bg-emerald-500/20 tw:px-2 tw:py-0.5 tw:rounded-full tw:font-semibold">
                En vivo
              </span>
            </div>
            <div class="tw:space-y-2.5">
              <div>
                <label for="input-list-name" class="tw:block tw:text-xs tw:text-slate-300 tw:mb-1">
                  Nombre de tu Lista SharePoint:
                </label>
                <input
                  id="input-list-name"
                  v-model="listName"
                  type="text"
                  class="tw:w-full tw:px-3 tw:py-1.5 tw:rounded-lg tw:bg-slate-950/90 tw:border tw:border-slate-600 tw:text-sky-300 tw:text-xs tw:font-mono focus:tw:outline-none focus:tw:border-violet-400"
                  placeholder="Ej: PedidosOperativos"
                />
              </div>
              <div>
                <label for="input-indexed-col" class="tw:block tw:text-xs tw:text-slate-300 tw:mb-1">
                  Columna Indexada Principal:
                </label>
                <input
                  id="input-indexed-col"
                  v-model="indexedCol"
                  type="text"
                  class="tw:w-full tw:px-3 tw:py-1.5 tw:rounded-lg tw:bg-slate-950/90 tw:border tw:border-slate-600 tw:text-emerald-300 tw:text-xs tw:font-mono focus:tw:outline-none focus:tw:border-violet-400"
                  placeholder="Ej: Estado"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Barra de Navegación por Pestañas (6 Módulos) -->
        <nav class="tw:mt-6 tw:flex tw:flex-wrap tw:gap-2" aria-label="Secciones principales">
          <button
            type="button"
            :class="[
              'tw:px-3.5 tw:py-2.5 tw:rounded-xl tw:text-xs sm:tw:text-sm tw:font-bold tw:transition-all tw:flex tw:items-center tw:gap-2 tw:cursor-pointer',
              activeTab === 'tab-diagrama'
                ? 'tw:bg-white tw:text-slate-900 tw:shadow-md'
                : 'tw:bg-white/10 tw:text-white hover:tw:bg-white/20',
            ]"
            @click="activeTab = 'tab-diagrama'"
          >
            <span>🧭</span> 1. Diagrama de Flujo
          </button>
          <button
            type="button"
            :class="[
              'tw:px-3.5 tw:py-2.5 tw:rounded-xl tw:text-xs sm:tw:text-sm tw:font-bold tw:transition-all tw:flex tw:items-center tw:gap-2 tw:cursor-pointer',
              activeTab === 'tab-casos'
                ? 'tw:bg-white tw:text-slate-900 tw:shadow-md'
                : 'tw:bg-white/10 tw:text-white hover:tw:bg-white/20',
            ]"
            @click="activeTab = 'tab-casos'"
          >
            <span>💎</span> 2. 10 Patrones Pro
          </button>
          <button
            type="button"
            :class="[
              'tw:px-3.5 tw:py-2.5 tw:rounded-xl tw:text-xs sm:tw:text-sm tw:font-bold tw:transition-all tw:flex tw:items-center tw:gap-2 tw:cursor-pointer',
              activeTab === 'tab-generador'
                ? 'tw:bg-white tw:text-slate-900 tw:shadow-md'
                : 'tw:bg-white/10 tw:text-white hover:tw:bg-white/20',
            ]"
            @click="activeTab = 'tab-generador'"
          >
            <span>⚡</span> 3. Generador +20.000
          </button>
          <button
            type="button"
            :class="[
              'tw:px-3.5 tw:py-2.5 tw:rounded-xl tw:text-xs sm:tw:text-sm tw:font-bold tw:transition-all tw:flex tw:items-center tw:gap-2 tw:cursor-pointer',
              activeTab === 'tab-auditor'
                ? 'tw:bg-white tw:text-slate-900 tw:shadow-md'
                : 'tw:bg-white/10 tw:text-white hover:tw:bg-white/20',
            ]"
            @click="activeTab = 'tab-auditor'"
          >
            <span>🔬</span> 4. Rayos X Fórmulas
          </button>
          <button
            type="button"
            :class="[
              'tw:px-3.5 tw:py-2.5 tw:rounded-xl tw:text-xs sm:tw:text-sm tw:font-bold tw:transition-all tw:flex tw:items-center tw:gap-2 tw:cursor-pointer',
              activeTab === 'tab-semaforo'
                ? 'tw:bg-white tw:text-slate-900 tw:shadow-md'
                : 'tw:bg-white/10 tw:text-white hover:tw:bg-white/20',
            ]"
            @click="activeTab = 'tab-semaforo'"
          >
            <span>🚦</span> 5. Matriz Delegación
          </button>
          <button
            type="button"
            :class="[
              'tw:px-3.5 tw:py-2.5 tw:rounded-xl tw:text-xs sm:tw:text-sm tw:font-bold tw:transition-all tw:flex tw:items-center tw:gap-2 tw:cursor-pointer',
              activeTab === 'tab-checklist'
                ? 'tw:bg-white tw:text-slate-900 tw:shadow-md'
                : 'tw:bg-white/10 tw:text-white hover:tw:bg-white/20',
            ]"
            @click="activeTab = 'tab-checklist'"
          >
            <span>✅</span> 6. Checklist Go-Live
          </button>
        </nav>
      </div>
    </header>

    <!-- Contenedor Principal -->
    <main class="tw:flex-1 tw:max-w-7xl tw:w-full tw:mx-auto tw:px-4 sm:tw:px-6 lg:tw:px-8 tw:py-6 sm:tw:py-8">
      <!-- ===================================================================== -->
      <!-- SECCIÓN 1: DIAGRAMA DE FLUJO INTERACTIVO                              -->
      <!-- ===================================================================== -->
      <section v-show="activeTab === 'tab-diagrama'" class="tw:animate-fade-in">
        <div
          :class="[
            'tw:rounded-2xl tw:p-4 sm:tw:p-5 tw:shadow-sm tw:border tw:mb-6 tw:transition-colors',
            darkMode
              ? 'tw:bg-slate-900 tw:border-slate-800 tw:text-slate-100'
              : 'tw:bg-white tw:border-slate-200 tw:text-slate-900',
          ]"
        >
          <div class="tw:flex tw:flex-col md:tw:flex-row md:tw:items-center tw:justify-between tw:gap-4">
            <div>
              <h2 class="tw:text-lg tw:font-extrabold">Arquitectura de Consulta: Aduana Servidor vs. Cliente</h2>
              <p :class="['tw:text-sm', darkMode ? 'tw:text-slate-400' : 'tw:text-slate-600']">
                Pulsa cada bloque para ver su telemetría o simula una ruta completa:
              </p>
            </div>
            <div class="tw:flex tw:flex-wrap tw:gap-2">
              <button
                type="button"
                class="tw:px-3.5 tw:py-2 tw:rounded-xl tw:text-xs tw:font-bold tw:bg-emerald-600 hover:tw:bg-emerald-700 tw:text-white tw:shadow-sm tw:transition-colors tw:cursor-pointer"
                @click="highlightRoute('gallery')"
              >
                ✅ Ruta A: Galería Infinita
              </button>
              <button
                type="button"
                class="tw:px-3.5 tw:py-2 tw:rounded-xl tw:text-xs tw:font-bold tw:bg-violet-600 hover:tw:bg-violet-700 tw:text-white tw:shadow-sm tw:transition-colors tw:cursor-pointer"
                @click="highlightRoute('collection')"
              >
                ⚡ Ruta B: Colección +2.000
              </button>
              <button
                type="button"
                class="tw:px-3.5 tw:py-2 tw:rounded-xl tw:text-xs tw:font-bold tw:bg-rose-100 hover:tw:bg-rose-200 tw:text-rose-800 tw:transition-colors tw:cursor-pointer"
                @click="highlightRoute('error5000')"
              >
                ❌ Simular Error 5.000
              </button>
              <button
                type="button"
                :class="[
                  'tw:px-3.5 tw:py-2 tw:rounded-xl tw:text-xs tw:font-bold tw:transition-colors tw:cursor-pointer',
                  darkMode
                    ? 'tw:bg-slate-800 hover:tw:bg-slate-700 tw:text-slate-200'
                    : 'tw:bg-slate-100 hover:tw:bg-slate-200 tw:text-slate-700',
                ]"
                @click="highlightRoute('reset')"
              >
                Ver todo
              </button>
            </div>
          </div>
        </div>

        <div class="tw:grid tw:grid-cols-1 lg:tw:grid-cols-12 tw:gap-6 tw:items-start">
          <!-- Lienzo del Diagrama de Flujo -->
          <div
            :class="[
              'lg:tw:col-span-7 tw:rounded-2xl tw:p-5 sm:tw:p-6 tw:shadow-sm tw:border tw:transition-colors',
              darkMode ? 'tw:bg-slate-900 tw:border-slate-800' : 'tw:bg-white tw:border-slate-200',
            ]"
          >
            <div class="tw:flex tw:flex-col tw:items-center tw:space-y-3">
              <!-- NODO 1 -->
              <button
                type="button"
                :class="[
                  'node-card tw:w-full tw:max-w-md tw:text-left tw:p-4 tw:rounded-2xl tw:border-2 tw:border-slate-800 tw:bg-slate-900 tw:text-white tw:shadow-md tw:cursor-pointer',
                  selectedNodeId === 'n1' ? 'tw:ring-4 tw:ring-violet-400 node-active' : '',
                  isNodeDimmed('n1') ? 'node-dimmed' : '',
                ]"
                @click="selectNode('n1')"
              >
                <div class="tw:flex tw:items-center tw:justify-between">
                  <span class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:text-violet-300">
                    Paso 1 • Origen
                  </span>
                  <span class="tw:text-xs tw:bg-white/15 tw:px-2 tw:py-0.5 tw:rounded-full tw:font-mono">
                    Lista &gt; 5.000 filas
                  </span>
                </div>
                <h3 class="tw:font-bold tw:text-base tw:mt-1">Petición desde Power Apps</h3>
                <p class="tw:text-xs tw:text-slate-300 tw:mt-0.5">La app solicita registros a Microsoft Lists (SharePoint).</p>
              </button>

              <div class="tw:flex tw:flex-col tw:items-center tw:text-slate-400">
                <div class="tw:w-0.5 tw:h-3.5 tw:bg-slate-300 dark:tw:bg-slate-700" />
                <span class="tw:text-xs tw:font-bold">▼</span>
              </div>

              <!-- NODO 2 -->
              <button
                type="button"
                :class="[
                  'node-card tw:w-full tw:max-w-md tw:text-left tw:p-4 tw:rounded-2xl tw:border-2 tw:border-amber-400 tw:bg-amber-50 tw:text-slate-900 tw:cursor-pointer',
                  selectedNodeId === 'n2' ? 'tw:ring-4 tw:ring-violet-400 node-active' : '',
                  isNodeDimmed('n2') ? 'node-dimmed' : '',
                ]"
                @click="selectNode('n2')"
              >
                <div class="tw:flex tw:items-center tw:justify-between">
                  <span class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:text-amber-800">
                    Aduana 1 • Servidor SharePoint
                  </span>
                  <span class="tw:text-xs tw:bg-amber-200/80 tw:text-amber-900 tw:font-semibold tw:px-2 tw:py-0.5 tw:rounded-full">
                    Índice obligatorio
                  </span>
                </div>
                <h3 class="tw:font-bold tw:text-base tw:mt-1">¿El 1.er criterio de Filter() usa una columna INDEXADA?</h3>
                <p class="tw:text-xs tw:text-slate-600 tw:mt-0.5">SharePoint revisa su árbol B-Tree antes de escanear la tabla.</p>
              </button>

              <!-- Bifurcación 1 -->
              <div class="tw:w-full tw:grid tw:grid-cols-1 sm:tw:grid-cols-2 tw:gap-3 tw:pt-1">
                <div class="tw:flex tw:flex-col tw:items-center">
                  <span class="tw:text-xs tw:font-bold tw:text-rose-600 tw:bg-rose-50 tw:border tw:border-rose-200 tw:px-2.5 tw:py-0.5 tw:rounded-full tw:mb-2">
                    NO (Sin índice)
                  </span>
                  <button
                    type="button"
                    :class="[
                      'node-card tw:w-full tw:text-left tw:p-3.5 tw:rounded-2xl tw:border-2 tw:border-rose-500 tw:bg-rose-50 tw:text-rose-950 tw:cursor-pointer',
                      selectedNodeId === 'n_err5000' ? 'tw:ring-4 tw:ring-violet-400 node-active' : '',
                      isNodeDimmed('n_err5000') ? 'node-dimmed' : '',
                    ]"
                    @click="selectNode('n_err5000')"
                  >
                    <span class="tw:text-xs tw:font-extrabold tw:uppercase tw:text-rose-600">🛑 Bloqueo Servidor</span>
                    <h4 class="tw:font-bold tw:text-sm tw:mt-0.5">Error: Umbral de 5.000</h4>
                    <p class="tw:text-xs tw:text-rose-800 tw:mt-1">SharePoint aborta la consulta. La galería queda vacía.</p>
                  </button>
                </div>

                <div class="tw:flex tw:flex-col tw:items-center">
                  <span class="tw:text-xs tw:font-bold tw:text-emerald-700 tw:bg-emerald-50 tw:border tw:border-emerald-200 tw:px-2.5 tw:py-0.5 tw:rounded-full tw:mb-2">
                    SÍ (Indexada)
                  </span>
                  <button
                    type="button"
                    :class="[
                      'node-card tw:w-full tw:text-left tw:p-3.5 tw:rounded-2xl tw:border-2 tw:border-emerald-500 tw:bg-emerald-50 tw:text-emerald-950 tw:cursor-pointer',
                      selectedNodeId === 'n3' ? 'tw:ring-4 tw:ring-violet-400 node-active' : '',
                      isNodeDimmed('n3') ? 'node-dimmed' : '',
                    ]"
                    @click="selectNode('n3')"
                  >
                    <span class="tw:text-xs tw:font-extrabold tw:uppercase tw:text-emerald-700">✅ Servidor OK</span>
                    <h4 class="tw:font-bold tw:text-sm tw:mt-0.5">Recorte O(log n) en SP</h4>
                    <p class="tw:text-xs tw:text-emerald-800 tw:mt-1">El servidor filtra en milisegundos usando el índice.</p>
                  </button>
                </div>
              </div>

              <div class="tw:flex tw:flex-col tw:items-center tw:text-slate-400">
                <div class="tw:w-0.5 tw:h-3.5 tw:bg-slate-300 dark:tw:bg-slate-700" />
                <span class="tw:text-xs tw:font-bold">▼</span>
              </div>

              <!-- NODO 4 -->
              <button
                type="button"
                :class="[
                  'node-card tw:w-full tw:max-w-md tw:text-left tw:p-4 tw:rounded-2xl tw:border-2 tw:border-indigo-400 tw:bg-indigo-50 tw:text-slate-900 tw:cursor-pointer',
                  selectedNodeId === 'n4' ? 'tw:ring-4 tw:ring-violet-400 node-active' : '',
                  isNodeDimmed('n4') ? 'node-dimmed' : '',
                ]"
                @click="selectNode('n4')"
              >
                <div class="tw:flex tw:items-center tw:justify-between">
                  <span class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:text-indigo-800">
                    Aduana 2 • Delegación OData
                  </span>
                  <span class="tw:text-xs tw:bg-indigo-200/80 tw:text-indigo-900 tw:font-semibold tw:px-2 tw:py-0.5 tw:rounded-full">
                    Límite 2.000
                  </span>
                </div>
                <h3 class="tw:font-bold tw:text-base tw:mt-1">¿La fórmula es 100% delegable (sin triángulo amarillo)?</h3>
                <p class="tw:text-xs tw:text-slate-600 tw:mt-0.5">Traducción directa a consulta OData sin procesar en cliente.</p>
              </button>

              <!-- Bifurcación 2 -->
              <div class="tw:w-full tw:grid tw:grid-cols-1 sm:tw:grid-cols-2 tw:gap-3 tw:pt-1">
                <div class="tw:flex tw:flex-col tw:items-center">
                  <span class="tw:text-xs tw:font-bold tw:text-amber-700 tw:bg-amber-50 tw:border tw:border-amber-200 tw:px-2.5 tw:py-0.5 tw:rounded-full tw:mb-2">
                    NO (Triángulo amarillo)
                  </span>
                  <button
                    type="button"
                    :class="[
                      'node-card tw:w-full tw:text-left tw:p-3.5 tw:rounded-2xl tw:border-2 tw:border-amber-500 tw:bg-amber-50 tw:text-amber-950 tw:cursor-pointer',
                      selectedNodeId === 'n_warn2000' ? 'tw:ring-4 tw:ring-violet-400 node-active' : '',
                      isNodeDimmed('n_warn2000') ? 'node-dimmed' : '',
                    ]"
                    @click="selectNode('n_warn2000')"
                  >
                    <span class="tw:text-xs tw:font-extrabold tw:uppercase tw:text-amber-700">⚠️ Corte Silencioso</span>
                    <h4 class="tw:font-bold tw:text-sm tw:mt-0.5">Tope de 2.000 filas</h4>
                    <p class="tw:text-xs tw:text-amber-900 tw:mt-1">Solo descarga las 2.000 primeras e ignora el resto sin avisar.</p>
                  </button>
                </div>

                <div class="tw:flex tw:flex-col tw:items-center">
                  <span class="tw:text-xs tw:font-bold tw:text-violet-700 tw:bg-violet-50 tw:border tw:border-violet-200 tw:px-2.5 tw:py-0.5 tw:rounded-full tw:mb-2">
                    SÍ (100% Delegable)
                  </span>
                  <button
                    type="button"
                    :class="[
                      'node-card tw:w-full tw:text-left tw:p-3.5 tw:rounded-2xl tw:border-2 tw:border-violet-500 tw:bg-violet-50 tw:text-violet-950 tw:cursor-pointer',
                      selectedNodeId === 'n5' ? 'tw:ring-4 tw:ring-violet-400 node-active' : '',
                      isNodeDimmed('n5') ? 'node-dimmed' : '',
                    ]"
                    @click="selectNode('n5')"
                  >
                    <span class="tw:text-xs tw:font-extrabold tw:uppercase tw:text-violet-700">🚀 Vía Libre</span>
                    <h4 class="tw:font-bold tw:text-sm tw:mt-0.5">¿Cómo consumes los datos?</h4>
                    <p class="tw:text-xs tw:text-violet-900 tw:mt-1">Elige entre Streaming en Galería o Paralelismo en RAM.</p>
                  </button>
                </div>
              </div>

              <div class="tw:flex tw:flex-col tw:items-center tw:text-slate-400">
                <div class="tw:w-0.5 tw:h-3.5 tw:bg-slate-300 dark:tw:bg-slate-700" />
                <span class="tw:text-xs tw:font-bold">▼</span>
              </div>

              <!-- NODOS FINALES -->
              <div class="tw:w-full tw:grid tw:grid-cols-1 sm:tw:grid-cols-2 tw:gap-3">
                <button
                  type="button"
                  :class="[
                    'node-card tw:text-left tw:p-4 tw:rounded-2xl tw:border-2 tw:border-emerald-600 tw:bg-emerald-600 tw:text-white tw:shadow-md tw:cursor-pointer',
                    selectedNodeId === 'n_rutaA' ? 'tw:ring-4 tw:ring-violet-400 node-active' : '',
                    isNodeDimmed('n_rutaA') ? 'node-dimmed' : '',
                  ]"
                  @click="selectNode('n_rutaA')"
                >
                  <span class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:text-emerald-100">
                    Ruta A • Streaming UI
                  </span>
                  <h4 class="tw:font-bold tw:text-base tw:mt-0.5">Directo en Gallery.Items</h4>
                  <p class="tw:text-xs tw:text-emerald-50 tw:mt-1">
                    Paginación automática de 100 en 100 al hacer scroll. Hasta 30M de filas.
                  </p>
                </button>

                <button
                  type="button"
                  :class="[
                    'node-card tw:text-left tw:p-4 tw:rounded-2xl tw:border-2 tw:border-violet-600 tw:bg-violet-600 tw:text-white tw:shadow-md tw:cursor-pointer',
                    selectedNodeId === 'n_rutaB' ? 'tw:ring-4 tw:ring-violet-400 node-active' : '',
                    isNodeDimmed('n_rutaB') ? 'node-dimmed' : '',
                  ]"
                  @click="selectNode('n_rutaB')"
                >
                  <span class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:text-violet-100">
                    Ruta B • Paralelismo RAM
                  </span>
                  <h4 class="tw:font-bold tw:text-base tw:mt-0.5">Concurrent() + With()</h4>
                  <p class="tw:text-xs tw:text-violet-50 tw:mt-1">
                    Descarga tramos de 2.000 en paralelo con ShowColumns() y los une.
                  </p>
                </button>
              </div>
            </div>
          </div>

          <!-- Panel Derecho: Inspector Técnico del Nodo -->
          <div
            :class="[
              'lg:tw:col-span-5 tw:rounded-2xl tw:p-5 sm:tw:p-6 tw:shadow-sm tw:border tw:sticky tw:top-6 tw:space-y-4 tw:transition-colors',
              darkMode ? 'tw:bg-slate-900 tw:border-slate-800' : 'tw:bg-white tw:border-slate-200',
            ]"
          >
            <div class="tw:flex tw:items-center tw:justify-between tw:gap-2">
              <span :class="['tw:px-2.5 tw:py-1 tw:rounded-lg tw:text-xs tw:font-bold', currentNode.badgeColor]">
                {{ currentNode.badge }}
              </span>
            </div>
            <h3 class="tw:text-lg tw:font-extrabold tw:leading-snug">{{ currentNode.title }}</h3>

            <!-- Barra de telemetría del nodo -->
            <div class="tw:grid tw:grid-cols-3 tw:gap-2">
              <div
                :class="[
                  'tw:p-2 tw:rounded-xl tw:text-center',
                  darkMode ? 'tw:bg-slate-800 tw:text-slate-100' : 'tw:bg-slate-100 tw:text-slate-800',
                ]"
              >
                <div class="tw:text-[10px] tw:uppercase tw:font-bold tw:opacity-60">Latencia</div>
                <div class="tw:text-xs tw:font-extrabold tw:font-mono">{{ currentNode.metrics.latency }}</div>
              </div>
              <div
                :class="[
                  'tw:p-2 tw:rounded-xl tw:text-center',
                  darkMode ? 'tw:bg-slate-800 tw:text-slate-100' : 'tw:bg-slate-100 tw:text-slate-800',
                ]"
              >
                <div class="tw:text-[10px] tw:uppercase tw:font-bold tw:opacity-60">Impacto RAM</div>
                <div class="tw:text-xs tw:font-extrabold tw:font-mono">{{ currentNode.metrics.ram }}</div>
              </div>
              <div
                :class="[
                  'tw:p-2 tw:rounded-xl tw:text-center',
                  darkMode ? 'tw:bg-slate-800 tw:text-slate-100' : 'tw:bg-slate-100 tw:text-slate-800',
                ]"
              >
                <div class="tw:text-[10px] tw:uppercase tw:font-bold tw:opacity-60">Alcance</div>
                <div class="tw:text-xs tw:font-extrabold tw:font-mono">{{ currentNode.metrics.limit }}</div>
              </div>
            </div>

            <p class="tw:text-sm tw:opacity-85 tw:leading-relaxed">{{ currentNode.summary }}</p>

            <div class="tw:bg-slate-500/10 tw:rounded-xl tw:p-3.5 tw:border tw:border-slate-500/20">
              <h4 class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:mb-2">Reglas técnicas:</h4>
              <ul class="tw:text-xs tw:space-y-1.5">
                <li v-for="(s, sIdx) in currentNode.steps" :key="sIdx" class="tw:flex tw:items-start tw:gap-2">
                  <span class="tw:text-violet-500 tw:font-bold tw:mt-0.5">▸</span>
                  <span>{{ s }}</span>
                </li>
              </ul>
            </div>

            <div>
              <div class="tw:flex tw:items-center tw:justify-between tw:mb-1.5">
                <span class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider">Fórmula Power Fx:</span>
                <button
                  type="button"
                  class="tw:text-xs tw:font-bold tw:text-violet-500 hover:tw:text-violet-400 tw:flex tw:items-center tw:gap-1 tw:cursor-pointer"
                  @click="copyToClipboard(currentNode.formula)"
                >
                  📋 Copiar
                </button>
              </div>
              <pre
                class="code-block tw:p-3.5 tw:rounded-xl tw:text-xs tw:overflow-x-auto tw:leading-relaxed tw:font-mono"
                v-html="highlightPowerFx(currentNode.formula)"
              />
            </div>

            <div class="tw:p-3 tw:rounded-xl tw:bg-emerald-500/10 tw:border tw:border-emerald-500/30 tw:text-xs">
              <strong>🔍 Verificación:</strong> {{ currentNode.verify }}
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- SECCIÓN 2: 10 PATRONES DE ARQUITECTURA NIVEL PRO                      -->
      <!-- ===================================================================== -->
      <section v-show="activeTab === 'tab-casos'" class="tw:animate-fade-in">
        <div class="tw:flex tw:flex-col md:tw:flex-row md:tw:items-center tw:justify-between tw:gap-4 tw:mb-6">
          <div>
            <h2 class="tw:text-xl tw:font-extrabold">10 Patrones Power Fx Nivel Arquitecto</h2>
            <p :class="['tw:text-sm tw:mt-1', darkMode ? 'tw:text-slate-400' : 'tw:text-slate-600']">
              Recetas reales listas para producción sin flujos externos. Filtra por categoría:
            </p>
          </div>
          <div class="tw:flex tw:flex-wrap tw:gap-2">
            <button
              type="button"
              :class="[
                'tw:px-3 tw:py-1.5 tw:rounded-xl tw:text-xs tw:font-bold tw:cursor-pointer tw:transition-all',
                caseCategory === 'all'
                  ? 'tw:bg-violet-600 tw:text-white tw:shadow-sm'
                  : darkMode
                    ? 'tw:bg-slate-800 tw:border tw:border-slate-700 tw:text-slate-300'
                    : 'tw:bg-white tw:border tw:border-slate-200 tw:text-slate-700 hover:tw:border-violet-300',
              ]"
              @click="setCaseCategory('all')"
            >
              Todos (10)
            </button>
            <button
              type="button"
              :class="[
                'tw:px-3 tw:py-1.5 tw:rounded-xl tw:text-xs tw:font-bold tw:cursor-pointer tw:transition-all',
                caseCategory === 'lectura'
                  ? 'tw:bg-violet-600 tw:text-white tw:shadow-sm'
                  : darkMode
                    ? 'tw:bg-slate-800 tw:border tw:border-slate-700 tw:text-slate-300'
                    : 'tw:bg-white tw:border tw:border-slate-200 tw:text-slate-700 hover:tw:border-violet-300',
              ]"
              @click="setCaseCategory('lectura')"
            >
              📖 Lectura & Filtros
            </button>
            <button
              type="button"
              :class="[
                'tw:px-3 tw:py-1.5 tw:rounded-xl tw:text-xs tw:font-bold tw:cursor-pointer tw:transition-all',
                caseCategory === 'escritura'
                  ? 'tw:bg-violet-600 tw:text-white tw:shadow-sm'
                  : darkMode
                    ? 'tw:bg-slate-800 tw:border tw:border-slate-700 tw:text-slate-300'
                    : 'tw:bg-white tw:border tw:border-slate-200 tw:text-slate-700 hover:tw:border-violet-300',
              ]"
              @click="setCaseCategory('escritura')"
            >
              ✍️ Escritura & Patch
            </button>
            <button
              type="button"
              :class="[
                'tw:px-3 tw:py-1.5 tw:rounded-xl tw:text-xs tw:font-bold tw:cursor-pointer tw:transition-all',
                caseCategory === 'rendimiento'
                  ? 'tw:bg-violet-600 tw:text-white tw:shadow-sm'
                  : darkMode
                    ? 'tw:bg-slate-800 tw:border tw:border-slate-700 tw:text-slate-300'
                    : 'tw:bg-white tw:border tw:border-slate-200 tw:text-slate-700 hover:tw:border-violet-300',
              ]"
              @click="setCaseCategory('rendimiento')"
            >
              🚀 Rendimiento & RAM
            </button>
          </div>
        </div>

        <!-- Grid de Botones de Casos de Uso -->
        <div class="tw:grid tw:grid-cols-1 sm:tw:grid-cols-2 lg:tw:grid-cols-5 tw:gap-3 tw:mb-6">
          <button
            v-for="c in filteredUseCases"
            :key="c.origIdx"
            type="button"
            :class="[
              'tw:text-left tw:p-3.5 tw:rounded-2xl tw:border-2 tw:transition-all tw:cursor-pointer',
              c.origIdx === selectedUseCaseIndex
                ? 'tw:border-violet-600 tw:bg-violet-600 tw:text-white tw:shadow-md'
                : darkMode
                  ? 'tw:border-slate-800 tw:bg-slate-900 tw:text-slate-100 hover:tw:border-violet-500'
                  : 'tw:border-slate-200 tw:bg-white tw:text-slate-900 hover:tw:border-violet-300',
            ]"
            @click="selectUseCase(c.origIdx)"
          >
            <div class="tw:flex tw:items-center tw:justify-between tw:mb-1">
              <span class="tw:text-lg">{{ c.icon }}</span>
              <span
                :class="[
                  'tw:text-[10px] tw:font-bold tw:px-2 tw:py-0.5 tw:rounded-full',
                  c.origIdx === selectedUseCaseIndex
                    ? 'tw:bg-white/20 tw:text-white'
                    : 'tw:bg-violet-500/10 tw:text-violet-600 dark:tw:text-violet-400',
                ]"
              >
                {{ c.tag }}
              </span>
            </div>
            <h3 class="tw:font-bold tw:text-xs sm:tw:text-sm tw:leading-snug">{{ c.title }}</h3>
          </button>
        </div>

        <!-- Detalle del Caso de Uso Seleccionado -->
        <div
          :class="[
            'tw:rounded-2xl tw:p-5 sm:tw:p-7 tw:shadow-sm tw:border tw:transition-colors',
            darkMode ? 'tw:bg-slate-900 tw:border-slate-800' : 'tw:bg-white tw:border-slate-200',
          ]"
        >
          <div class="tw:flex tw:flex-col md:tw:flex-row md:tw:items-center tw:justify-between tw:gap-4 tw:pb-4 tw:border-b tw:border-slate-500/15">
            <div class="tw:flex tw:items-center tw:gap-3">
              <span class="tw:text-3xl">{{ currentUseCase.icon }}</span>
              <div>
                <span class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:text-violet-500">
                  {{ currentUseCase.tag }}
                </span>
                <h3 class="tw:text-xl tw:font-extrabold">{{ currentUseCase.title }}</h3>
              </div>
            </div>
            <button
              type="button"
              class="tw:px-4 tw:py-2.5 tw:rounded-xl tw:bg-violet-600 hover:tw:bg-violet-700 tw:text-white tw:text-xs tw:font-bold tw:flex tw:items-center tw:gap-2 tw:self-start md:tw:self-auto tw:shadow-sm tw:transition-colors tw:cursor-pointer"
              @click="copyToClipboard(currentUseCase.formula)"
            >
              📋 Copiar Fórmula Pro
            </button>
          </div>

          <div class="tw:grid tw:grid-cols-1 lg:tw:grid-cols-12 tw:gap-6 tw:mt-5">
            <div class="lg:tw:col-span-5 tw:space-y-4">
              <div class="tw:p-4 tw:rounded-xl tw:bg-indigo-500/10 tw:border tw:border-indigo-500/25">
                <h4 class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:text-indigo-500 tw:mb-1">
                  1. Configuración en Microsoft Lists:
                </h4>
                <p class="tw:text-xs tw:leading-relaxed">{{ currentUseCase.spConfig }}</p>
              </div>

              <div>
                <h4 class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:opacity-75 tw:mb-1">
                  2. Arquitectura de la solución:
                </h4>
                <p class="tw:text-sm tw:opacity-90 tw:leading-relaxed">{{ currentUseCase.explanation }}</p>
              </div>

              <div class="tw:p-4 tw:rounded-xl tw:bg-rose-500/10 tw:border tw:border-rose-500/25">
                <h4 class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:text-rose-500 tw:mb-1">
                  ⚠️ Anti-patrón (Qué evitar):
                </h4>
                <p class="tw:text-xs tw:leading-relaxed">{{ currentUseCase.avoid }}</p>
              </div>
            </div>

            <div class="lg:tw:col-span-7 tw:flex tw:flex-col">
              <span class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:opacity-75 tw:mb-2">
                3. Código Power Fx listo para producción:
              </span>
              <pre
                class="code-block tw:p-4 tw:rounded-xl tw:text-xs sm:tw:text-[13px] tw:overflow-x-auto tw:leading-relaxed tw:flex-1 tw:font-mono"
                v-html="highlightPowerFx(currentUseCase.formula)"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- SECCIÓN 3: GENERADOR AVANZADO CONCURRENT() (HASTA 20.000 FILAS)       -->
      <!-- ===================================================================== -->
      <section v-show="activeTab === 'tab-generador'" class="tw:animate-fade-in">
        <div class="tw:grid tw:grid-cols-1 lg:tw:grid-cols-12 tw:gap-6">
          <!-- Panel de Configuración -->
          <div
            :class="[
              'lg:tw:col-span-5 tw:rounded-2xl tw:p-5 sm:tw:p-6 tw:shadow-sm tw:border tw:space-y-5 tw:transition-colors',
              darkMode ? 'tw:bg-slate-900 tw:border-slate-800' : 'tw:bg-white tw:border-slate-200',
            ]"
          >
            <div>
              <span class="tw:inline-block tw:px-2.5 tw:py-1 tw:rounded-lg tw:bg-violet-100 tw:text-violet-800 tw:text-xs tw:font-bold tw:mb-2">
                Generador Empresarial
              </span>
              <h2 class="tw:text-xl tw:font-extrabold">Descarga Masiva (4.000 a 20.000)</h2>
              <p :class="['tw:text-sm tw:mt-1', darkMode ? 'tw:text-slate-400' : 'tw:text-slate-600']">
                Construye un bloque <code class="tw:font-mono tw:font-bold">Concurrent()</code> optimizado con control de memoria y manejo de errores.
              </p>
            </div>

            <!-- 1. Estrategia de partición -->
            <div>
              <label :class="['tw:block tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:mb-2', darkMode ? 'tw:text-slate-300' : 'tw:text-slate-700']">
                1. Estrategia de partición (Columna indexada):
              </label>
              <div class="tw:grid tw:grid-cols-3 tw:gap-2">
                <button
                  type="button"
                  :class="[
                    'tw:p-2.5 tw:rounded-xl tw:border-2 tw:text-left tw:transition-all tw:cursor-pointer',
                    genMode === 'number'
                      ? 'tw:border-violet-600 tw:bg-violet-50 tw:text-violet-900 dark:tw:bg-violet-950/40 dark:tw:text-violet-200'
                      : darkMode
                        ? 'tw:border-slate-700 tw:bg-slate-800 tw:text-slate-300 hover:tw:border-slate-600'
                        : 'tw:border-slate-200 tw:bg-white tw:text-slate-700 hover:tw:border-slate-300',
                  ]"
                  @click="genMode = 'number'"
                >
                  <div class="tw:font-bold tw:text-xs">🔢 NumID</div>
                  <div class="tw:text-[11px] tw:opacity-80 tw:mt-0.5">Rangos 2.000</div>
                </button>
                <button
                  type="button"
                  :class="[
                    'tw:p-2.5 tw:rounded-xl tw:border-2 tw:text-left tw:transition-all tw:cursor-pointer',
                    genMode === 'date'
                      ? 'tw:border-violet-600 tw:bg-violet-50 tw:text-violet-900 dark:tw:bg-violet-950/40 dark:tw:text-violet-200'
                      : darkMode
                        ? 'tw:border-slate-700 tw:bg-slate-800 tw:text-slate-300 hover:tw:border-slate-600'
                        : 'tw:border-slate-200 tw:bg-white tw:text-slate-700 hover:tw:border-slate-300',
                  ]"
                  @click="genMode = 'date'"
                >
                  <div class="tw:font-bold tw:text-xs">📅 Fechas</div>
                  <div class="tw:text-[11px] tw:opacity-80 tw:mt-0.5">Por tramos</div>
                </button>
                <button
                  type="button"
                  :class="[
                    'tw:p-2.5 tw:rounded-xl tw:border-2 tw:text-left tw:transition-all tw:cursor-pointer',
                    genMode === 'category'
                      ? 'tw:border-violet-600 tw:bg-violet-50 tw:text-violet-900 dark:tw:bg-violet-950/40 dark:tw:text-violet-200'
                      : darkMode
                        ? 'tw:border-slate-700 tw:bg-slate-800 tw:text-slate-300 hover:tw:border-slate-600'
                        : 'tw:border-slate-200 tw:bg-white tw:text-slate-700 hover:tw:border-slate-300',
                  ]"
                  @click="genMode = 'category'"
                >
                  <div class="tw:font-bold tw:text-xs">🏷️ Zonas</div>
                  <div class="tw:text-[11px] tw:opacity-80 tw:mt-0.5">Por delegación</div>
                </button>
              </div>
            </div>

            <!-- 2. Volumen -->
            <div>
              <div class="tw:flex tw:items-center tw:justify-between tw:mb-2">
                <label :class="['tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider', darkMode ? 'tw:text-slate-300' : 'tw:text-slate-700']">
                  2. Volumen máximo a cargar:
                </label>
                <span class="tw:text-xs tw:font-mono tw:font-bold tw:text-violet-700 dark:tw:text-violet-300 tw:bg-violet-100 dark:tw:bg-violet-950/60 tw:px-2.5 tw:py-0.5 tw:rounded-full">
                  {{ genTelemetry.rows }} registros ({{ genBlocks }} hilos)
                </span>
              </div>
              <div class="tw:grid tw:grid-cols-5 tw:gap-1.5">
                <button
                  v-for="b in [2, 3, 4, 6, 10]"
                  :key="b"
                  type="button"
                  :class="[
                    'tw:py-2 tw:px-1 tw:rounded-xl tw:border-2 tw:font-bold tw:text-xs tw:cursor-pointer tw:transition-all',
                    genBlocks === b
                      ? 'tw:border-violet-600 tw:bg-violet-50 tw:text-violet-900 dark:tw:bg-violet-950/50 dark:tw:text-violet-200'
                      : darkMode
                        ? 'tw:border-slate-700 tw:bg-slate-800 tw:text-slate-300 hover:tw:border-slate-600'
                        : 'tw:border-slate-200 tw:bg-white tw:text-slate-700 hover:tw:border-slate-300',
                  ]"
                  @click="genBlocks = b"
                >
                  {{ b * 2 }}k<br />
                  <span class="tw:font-normal tw:text-[10px]">{{ b }} bloq</span>
                </button>
              </div>
            </div>

            <!-- 3. Modificadores Pro -->
            <div class="tw:space-y-2">
              <label :class="['tw:block tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider', darkMode ? 'tw:text-slate-300' : 'tw:text-slate-700']">
                3. Optimizaciones de Arquitectura:
              </label>

              <label
                :class="[
                  'tw:flex tw:items-center tw:gap-2.5 tw:cursor-pointer tw:p-2.5 tw:rounded-xl tw:border tw:transition-colors',
                  darkMode ? 'tw:bg-slate-800/80 tw:border-slate-700' : 'tw:bg-slate-50 tw:border-slate-200',
                ]"
              >
                <input
                  v-model="genExtraFilter"
                  type="checkbox"
                  class="tw:w-4 tw:h-4 tw:text-violet-600 tw:rounded focus:tw:ring-violet-500"
                />
                <span class="tw:text-xs tw:font-medium">
                  Filtrar primero por columna indexada (<code class="tw:font-mono">{{ indexedCol }} = "Activo"</code>)
                </span>
              </label>

              <label
                :class="[
                  'tw:flex tw:items-center tw:gap-2.5 tw:cursor-pointer tw:p-2.5 tw:rounded-xl tw:border tw:transition-colors',
                  darkMode ? 'tw:bg-slate-800/80 tw:border-slate-700' : 'tw:bg-slate-50 tw:border-slate-200',
                ]"
              >
                <input
                  v-model="genShowColumns"
                  type="checkbox"
                  class="tw:w-4 tw:h-4 tw:text-violet-600 tw:rounded focus:tw:ring-violet-500"
                />
                <span class="tw:text-xs tw:font-medium">
                  Envolver con <code class="tw:font-mono">ShowColumns()</code> (Ahorra ~70% RAM móvil)
                </span>
              </label>

              <label
                :class="[
                  'tw:flex tw:items-center tw:gap-2.5 tw:cursor-pointer tw:p-2.5 tw:rounded-xl tw:border tw:transition-colors',
                  darkMode ? 'tw:bg-slate-800/80 tw:border-slate-700' : 'tw:bg-slate-50 tw:border-slate-200',
                ]"
              >
                <input
                  v-model="genIfError"
                  type="checkbox"
                  class="tw:w-4 tw:h-4 tw:text-violet-600 tw:rounded focus:tw:ring-violet-500"
                />
                <span class="tw:text-xs tw:font-medium">
                  Proteger con <code class="tw:font-mono">IfError()</code> + indicador de carga
                </span>
              </label>
            </div>

            <!-- Telemetría de Carga -->
            <div class="tw:p-3.5 tw:rounded-xl tw:bg-slate-900 tw:text-white tw:text-xs tw:space-y-1.5 tw:border tw:border-slate-800">
              <div class="tw:flex tw:justify-between">
                <span>Registros máximos:</span>
                <strong class="tw:font-mono tw:text-sky-300">{{ genTelemetry.rows }} filas</strong>
              </div>
              <div class="tw:flex tw:justify-between">
                <span>Consumo RAM estimado:</span>
                <strong class="tw:font-mono tw:text-emerald-300">
                  ~{{ genTelemetry.ramEst }} MB {{ genTelemetry.isOptimized ? '(Optimizado)' : '(Sin recortar)' }}
                </strong>
              </div>
              <div class="tw:flex tw:justify-between">
                <span>Riesgo Throttling SP (429):</span>
                <strong :class="['tw:font-mono', genTelemetry.throttlingColor]">{{ genTelemetry.throttling }}</strong>
              </div>
            </div>
          </div>

          <!-- Panel de Código Generado -->
          <div
            :class="[
              'lg:tw:col-span-7 tw:rounded-2xl tw:p-5 sm:tw:p-6 tw:shadow-sm tw:border tw:flex tw:flex-col tw:transition-colors',
              darkMode ? 'tw:bg-slate-900 tw:border-slate-800' : 'tw:bg-white tw:border-slate-200',
            ]"
          >
            <div class="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2 tw:mb-3">
              <div>
                <h3 class="tw:font-extrabold tw:text-base">Fórmula Power Fx Lista para Producción</h3>
                <p :class="['tw:text-xs', darkMode ? 'tw:text-slate-400' : 'tw:text-slate-500']">
                  Pégala en el evento <code class="tw:font-mono">OnSelect</code> de un botón de carga o en
                  <code class="tw:font-mono">Screen.OnVisible</code>.
                </p>
              </div>
              <button
                type="button"
                class="tw:px-4 tw:py-2 tw:rounded-xl tw:bg-violet-600 hover:tw:bg-violet-700 tw:text-white tw:text-xs tw:font-bold tw:flex tw:items-center tw:gap-2 tw:shadow-sm tw:transition-colors tw:cursor-pointer"
                @click="copyToClipboard(generatedCode, 'Código Concurrent() copiado al portapapeles')"
              >
                📋 Copiar Código
              </button>
            </div>

            <pre
              class="code-block tw:p-4 tw:rounded-xl tw:text-xs sm:tw:text-[13px] tw:overflow-x-auto tw:leading-relaxed tw:flex-1 tw:font-mono"
              v-html="highlightPowerFx(generatedCode)"
            />
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- SECCIÓN 4: RAYOS X DE FÓRMULAS (AUDITOR LIVE)                         -->
      <!-- ===================================================================== -->
      <section v-show="activeTab === 'tab-auditor'" class="tw:animate-fade-in">
        <div class="tw:grid tw:grid-cols-1 lg:tw:grid-cols-12 tw:gap-6">
          <!-- Entrada de Fórmula -->
          <div
            :class="[
              'lg:tw:col-span-6 tw:rounded-2xl tw:p-5 sm:tw:p-6 tw:shadow-sm tw:border tw:space-y-4 tw:transition-colors',
              darkMode ? 'tw:bg-slate-900 tw:border-slate-800' : 'tw:bg-white tw:border-slate-200',
            ]"
          >
            <div>
              <span class="tw:inline-block tw:px-2.5 tw:py-1 tw:rounded-lg tw:bg-sky-100 tw:text-sky-900 tw:text-xs tw:font-bold tw:mb-2">
                Diagnóstico Estático Power Fx
              </span>
              <h2 class="tw:text-xl tw:font-extrabold">Rayos X de Fórmulas</h2>
              <p :class="['tw:text-sm tw:mt-1', darkMode ? 'tw:text-slate-400' : 'tw:text-slate-600']">
                Pega cualquier fórmula de tu app para detectar trampas de delegación, bucles N+1 o bloqueos de 5.000 filas:
              </p>
            </div>

            <!-- Botones de ejemplos rápidos -->
            <div>
              <span class="tw:block tw:text-xs tw:font-bold tw:text-slate-500 tw:mb-2">
                Prueba con un ejemplo típico con fallos:
              </span>
              <div class="tw:flex tw:flex-wrap tw:gap-1.5">
                <button
                  type="button"
                  class="tw:px-2.5 tw:py-1.5 tw:rounded-lg tw:bg-rose-50 hover:tw:bg-rose-100 tw:text-rose-800 tw:border tw:border-rose-200 tw:text-xs tw:font-semibold tw:cursor-pointer"
                  @click="loadSample('search')"
                >
                  1. Search() directo
                </button>
                <button
                  type="button"
                  class="tw:px-2.5 tw:py-1.5 tw:rounded-lg tw:bg-amber-50 hover:tw:bg-amber-100 tw:text-amber-800 tw:border tw:border-amber-200 tw:text-xs tw:font-semibold tw:cursor-pointer"
                  @click="loadSample('idrange')"
                >
                  2. Rango con ID &gt;
                </button>
                <button
                  type="button"
                  class="tw:px-2.5 tw:py-1.5 tw:rounded-lg tw:bg-rose-50 hover:tw:bg-rose-100 tw:text-rose-800 tw:border tw:border-rose-200 tw:text-xs tw:font-semibold tw:cursor-pointer"
                  @click="loadSample('forallpatch')"
                >
                  3. ForAll + Patch lento
                </button>
                <button
                  type="button"
                  class="tw:px-2.5 tw:py-1.5 tw:rounded-lg tw:bg-emerald-50 hover:tw:bg-emerald-100 tw:text-emerald-800 tw:border tw:border-emerald-200 tw:text-xs tw:font-semibold tw:cursor-pointer"
                  @click="loadSample('pro')"
                >
                  4. Fórmula Optimizada
                </button>
              </div>
            </div>

            <textarea
              v-model="auditorCode"
              rows="8"
              class="tw:w-full tw:p-4 tw:rounded-xl tw:bg-slate-950 tw:text-slate-100 tw:font-mono tw:text-xs sm:tw:text-sm tw:border tw:border-slate-700 focus:tw:outline-none focus:tw:border-violet-400 tw:leading-relaxed"
              placeholder="Pega aquí tu fórmula Filter(...), Patch(...), Search(...) o ClearCollect(...)"
            />

            <div class="tw:flex tw:justify-between tw:items-center">
              <button
                type="button"
                class="tw:text-xs tw:font-semibold tw:text-slate-500 hover:tw:text-slate-800 dark:hover:tw:text-slate-200 tw:cursor-pointer"
                @click="auditorCode = ''"
              >
                Limpiar editor
              </button>
            </div>
          </div>

          <!-- Resultados del Diagnóstico -->
          <div
            :class="[
              'lg:tw:col-span-6 tw:rounded-2xl tw:p-5 sm:tw:p-6 tw:shadow-sm tw:border tw:flex tw:flex-col tw:justify-between tw:transition-colors',
              darkMode ? 'tw:bg-slate-900 tw:border-slate-800' : 'tw:bg-white tw:border-slate-200',
            ]"
          >
            <div class="tw:space-y-4">
              <div class="tw:flex tw:items-center tw:justify-between tw:pb-4 tw:border-b tw:border-slate-500/15">
                <div>
                  <div class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-wider tw:opacity-70">
                    Puntuación de Arquitectura
                  </div>
                  <div class="tw:text-xs tw:font-semibold tw:mt-0.5">{{ auditResult.badgeText }}</div>
                </div>
                <div :class="['tw:text-3xl tw:font-extrabold tw:font-mono', auditResult.scoreColor]">
                  {{ auditResult.score }}/100
                </div>
              </div>

              <div class="tw:space-y-3 tw:max-h-[420px] tw:overflow-y-auto tw:pr-1">
                <div
                  v-for="(f, fIdx) in auditResult.findings"
                  :key="fIdx"
                  :class="[
                    'tw:p-3.5 tw:rounded-xl tw:border',
                    f.type === 'error'
                      ? 'tw:border-rose-500/30 tw:bg-rose-500/10 tw:text-rose-600 dark:tw:text-rose-400'
                      : f.type === 'warn'
                        ? 'tw:border-amber-500/30 tw:bg-amber-500/10 tw:text-amber-600 dark:tw:text-amber-400'
                        : 'tw:border-emerald-500/30 tw:bg-emerald-500/10 tw:text-emerald-600 dark:tw:text-emerald-400',
                  ]"
                >
                  <div class="tw:font-bold tw:text-xs tw:flex tw:items-center tw:gap-1.5">
                    {{ f.type === 'error' ? '🛑' : f.type === 'warn' ? '⚠️' : '✅' }}
                    {{ f.title }}
                  </div>
                  <p class="tw:text-xs tw:opacity-90 tw:mt-1">{{ f.desc }}</p>
                  <div
                    v-if="f.fix"
                    class="tw:mt-2 tw:p-2 tw:rounded-lg tw:bg-slate-950/80 tw:text-slate-200 tw:text-[11px]"
                  >
                    <strong>Solución:</strong> {{ f.fix }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- SECCIÓN 5: MATRIZ DE DELEGACIÓN SHAREPOINT                            -->
      <!-- ===================================================================== -->
      <section v-show="activeTab === 'tab-semaforo'" class="tw:animate-fade-in">
        <div
          :class="[
            'tw:rounded-2xl tw:p-5 sm:tw:p-6 tw:shadow-sm tw:border tw:transition-colors',
            darkMode ? 'tw:bg-slate-900 tw:border-slate-800' : 'tw:bg-white tw:border-slate-200',
          ]"
        >
          <div class="tw:flex tw:flex-col lg:tw:flex-row lg:tw:items-center tw:justify-between tw:gap-4 tw:mb-6">
            <div>
              <h2 class="tw:text-xl tw:font-extrabold">Matriz de Delegación y Tipos de Columna</h2>
              <p :class="['tw:text-sm tw:mt-1', darkMode ? 'tw:text-slate-400' : 'tw:text-slate-600']">
                Busca una función, operador o tipo de columna de SharePoint para ver su comportamiento real:
              </p>
            </div>
            <div class="tw:flex tw:flex-col sm:tw:flex-row tw:gap-2">
              <input
                v-model="semaforoSearch"
                type="text"
                placeholder="Buscar: Search, ID, Persona, Sum..."
                :class="[
                  'tw:px-3.5 tw:py-2 tw:rounded-xl tw:border tw:text-xs tw:font-medium focus:tw:outline-none focus:tw:border-violet-500',
                  darkMode ? 'tw:bg-slate-800 tw:border-slate-700 tw:text-white' : 'tw:bg-white tw:border-slate-300',
                ]"
              />
              <div class="tw:flex tw:flex-wrap tw:gap-1.5">
                <button
                  type="button"
                  :class="[
                    'tw:px-3 tw:py-1.5 tw:rounded-xl tw:text-xs tw:font-bold tw:cursor-pointer tw:transition-all',
                    semaforoFilter === 'all'
                      ? 'tw:bg-slate-900 tw:text-white'
                      : darkMode
                        ? 'tw:bg-slate-800 tw:text-slate-300'
                        : 'tw:bg-slate-100 tw:text-slate-700',
                  ]"
                  @click="semaforoFilter = 'all'"
                >
                  Todos
                </button>
                <button
                  type="button"
                  :class="[
                    'tw:px-3 tw:py-1.5 tw:rounded-xl tw:text-xs tw:font-bold tw:cursor-pointer tw:transition-all',
                    semaforoFilter === 'ok'
                      ? 'tw:bg-emerald-600 tw:text-white'
                      : 'tw:bg-emerald-100 tw:text-emerald-800',
                  ]"
                  @click="semaforoFilter = 'ok'"
                >
                  ✅ Delegable
                </button>
                <button
                  type="button"
                  :class="[
                    'tw:px-3 tw:py-1.5 tw:rounded-xl tw:text-xs tw:font-bold tw:cursor-pointer tw:transition-all',
                    semaforoFilter === 'warn'
                      ? 'tw:bg-amber-600 tw:text-white'
                      : 'tw:bg-amber-100 tw:text-amber-800',
                  ]"
                  @click="semaforoFilter = 'warn'"
                >
                  ⚠️ Trampa
                </button>
                <button
                  type="button"
                  :class="[
                    'tw:px-3 tw:py-1.5 tw:rounded-xl tw:text-xs tw:font-bold tw:cursor-pointer tw:transition-all',
                    semaforoFilter === 'no' ? 'tw:bg-rose-600 tw:text-white' : 'tw:bg-rose-100 tw:text-rose-800',
                  ]"
                  @click="semaforoFilter = 'no'"
                >
                  ❌ No delega
                </button>
              </div>
            </div>
          </div>

          <div class="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-4">
            <div
              v-for="(item, iIdx) in filteredSemaforo"
              :key="iIdx"
              :class="[
                'tw:p-4 tw:rounded-2xl tw:border tw:flex tw:flex-col tw:justify-between tw:gap-3',
                item.status === 'ok'
                  ? 'tw:border-emerald-500/30 tw:bg-emerald-500/5'
                  : item.status === 'warn'
                    ? 'tw:border-amber-500/30 tw:bg-amber-500/5'
                    : 'tw:border-rose-500/30 tw:bg-rose-500/5',
              ]"
            >
              <div>
                <span
                  :class="[
                    'tw:inline-block tw:px-2.5 tw:py-0.5 tw:rounded-full tw:text-xs tw:font-bold tw:mb-2',
                    item.status === 'ok'
                      ? 'tw:bg-emerald-100 tw:text-emerald-800'
                      : item.status === 'warn'
                        ? 'tw:bg-amber-100 tw:text-amber-800'
                        : 'tw:bg-rose-100 tw:text-rose-800',
                  ]"
                >
                  {{ item.badge }}
                </span>
                <h3 class="tw:font-bold tw:text-base">{{ item.title }}</h3>
                <p class="tw:text-xs tw:opacity-80 tw:mt-1 tw:leading-relaxed">{{ item.desc }}</p>
              </div>
              <div class="tw:p-3 tw:rounded-xl tw:bg-slate-500/10 tw:border tw:border-slate-500/15 tw:text-xs">
                <strong>💡 Solución arquitecto:</strong> {{ item.alt }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- SECCIÓN 6: CHECKLIST PRE-PRODUCCIÓN (GO-LIVE)                         -->
      <!-- ===================================================================== -->
      <section v-show="activeTab === 'tab-checklist'" class="tw:animate-fade-in">
        <div
          :class="[
            'tw:rounded-2xl tw:p-5 sm:tw:p-6 tw:shadow-sm tw:border tw:transition-colors',
            darkMode ? 'tw:bg-slate-900 tw:border-slate-800' : 'tw:bg-white tw:border-slate-200',
          ]"
        >
          <div class="tw:flex tw:flex-col md:tw:flex-row md:tw:items-center tw:justify-between tw:gap-4 tw:pb-5 tw:border-b tw:border-slate-200 dark:tw:border-slate-800">
            <div>
              <span class="tw:inline-block tw:px-2.5 tw:py-1 tw:rounded-lg tw:bg-emerald-100 tw:text-emerald-900 tw:text-xs tw:font-bold tw:mb-1.5">
                Auditoría Final
              </span>
              <h2 class="tw:text-xl tw:font-extrabold">Checklist Pre-Producción (+5.000 Filas)</h2>
              <p :class="['tw:text-sm', darkMode ? 'tw:text-slate-400' : 'tw:text-slate-600']">
                Marca cada verificación antes de publicar tu aplicación para los usuarios finales:
              </p>
            </div>
            <div class="tw:flex tw:items-center tw:gap-3">
              <div class="tw:text-right">
                <div class="tw:text-lg tw:font-extrabold tw:text-violet-600 dark:tw:text-violet-400 tw:font-mono">
                  {{ checklistCompletedCount }} / {{ checklistData.length }}
                </div>
                <div class="tw:text-xs tw:text-slate-500">Completado</div>
              </div>
              <button
                type="button"
                class="tw:px-4 tw:py-2.5 tw:rounded-xl tw:bg-slate-900 hover:tw:bg-slate-800 dark:tw:bg-violet-600 dark:hover:tw:bg-violet-700 tw:text-white tw:text-xs tw:font-bold tw:shadow-sm tw:cursor-pointer"
                @click="copyChecklistReport"
              >
                📋 Copiar Informe
              </button>
            </div>
          </div>

          <!-- Barra de progreso -->
          <div class="tw:w-full tw:bg-slate-100 dark:tw:bg-slate-800 tw:h-2.5 tw:rounded-full tw:overflow-hidden tw:my-5">
            <div
              class="tw:bg-gradient-to-r tw:from-violet-600 tw:to-emerald-500 tw:h-full tw:transition-all tw:duration-300"
              :style="{ width: checklistProgressPct + '%' }"
            />
          </div>

          <div class="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-4">
            <button
              v-for="item in checklistData"
              :key="item.id"
              type="button"
              :class="[
                'tw:text-left tw:p-4 tw:rounded-2xl tw:border-2 tw:transition-all tw:flex tw:items-start tw:gap-3 tw:cursor-pointer',
                checkedItems[item.id]
                  ? 'tw:border-emerald-500 tw:bg-emerald-500/10'
                  : darkMode
                    ? 'tw:border-slate-800 tw:bg-slate-950/60 hover:tw:border-slate-700'
                    : 'tw:border-slate-200 tw:bg-slate-50/70 hover:tw:border-violet-300',
              ]"
              @click="toggleChecklist(item.id)"
            >
              <span
                :class="[
                  'tw:mt-0.5 tw:flex tw:h-5 tw:w-5 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-md tw:border tw:text-xs tw:font-bold',
                  checkedItems[item.id]
                    ? 'tw:bg-emerald-500 tw:border-emerald-500 tw:text-white'
                    : 'tw:border-slate-400',
                ]"
              >
                {{ checkedItems[item.id] ? '✓' : '' }}
              </span>
              <div>
                <span class="tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-wider tw:text-violet-500">
                  {{ item.area }}
                </span>
                <p
                  :class="[
                    'tw:text-xs sm:tw:text-sm tw:font-medium tw:mt-0.5',
                    checkedItems[item.id] ? 'tw:line-through tw:opacity-70' : '',
                  ]"
                >
                  {{ item.text }}
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- Pie de Página -->
    <footer
      :class="[
        'tw:border-t tw:mt-12 tw:py-6 tw:transition-colors',
        darkMode
          ? 'tw:bg-slate-900 tw:border-slate-800 tw:text-slate-400'
          : 'tw:bg-white tw:border-slate-200 tw:text-slate-500',
      ]"
    >
      <div
        class="tw:max-w-7xl tw:mx-auto tw:px-4 sm:tw:px-6 lg:tw:px-8 tw:flex tw:flex-col sm:tw:flex-row tw:items-center tw:justify-between tw:gap-4 tw:text-xs"
      >
        <p>Arquitectura Empresarial Power Apps + Microsoft Lists (Volúmenes Altos • Sin Flujos Externos).</p>
        <p :class="['tw:font-mono tw:font-semibold', darkMode ? 'tw:text-slate-300' : 'tw:text-slate-700']">
          Límite PA: 2.000 • Umbral SP: 5.000 • Máx Lista: 30M
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Estilos complementarios para bloques de código y efectos de diagrama */
.mod-power-apps-volumen .code-block {
  background-color: #0b1120;
  color: #e2e8f0;
  border: 1px solid #1e293b;
}

.mod-power-apps-volumen .node-card {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.mod-power-apps-volumen .node-card:hover {
  transform: translateY(-2px);
}

.mod-power-apps-volumen .node-active {
  box-shadow: 0 12px 28px -5px rgba(124, 58, 237, 0.35), 0 8px 12px -6px rgba(124, 58, 237, 0.2);
  transform: translateY(-2px);
}

.mod-power-apps-volumen .node-dimmed {
  opacity: 0.38;
}

@keyframes fadeInGuide {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mod-power-apps-volumen .animate-fade-in {
  animation: fadeInGuide 0.25s ease-out forwards;
}

/* Scrollbar estilizado para bloques de código */
.mod-power-apps-volumen pre::-webkit-scrollbar {
  height: 8px;
}
.mod-power-apps-volumen pre::-webkit-scrollbar-track {
  background: #0f172a;
  border-radius: 8px;
}
.mod-power-apps-volumen pre::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 8px;
}
.mod-power-apps-volumen pre::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
</style>
