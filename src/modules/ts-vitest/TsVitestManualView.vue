<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { usePageEnv } from '../../composables/usePageEnv'
import CodeBlock from './CodeBlock.vue'
import {
  navParts,
  tsOfficialLinks,
  testOfficialLinks,
  terminalSimulatorCommands,
  configFiles,
  snippets,
  ideFiles,
  challenges,
  qualityChecklist,
} from './tsVitestData'

const STORAGE_KEY = 'ts_vitest_manual_progress_v1'
const TOTAL_MILESTONES = challenges.length + qualityChecklist.length // 11 hitos

usePageEnv({
  title: 'Manual Pro: TypeScript & Tests Unitarios (Vitest)',
  htmlClass: ['mod-ts-vitest', 'dark', 'tw:scroll-smooth'],
  bodyClass: [
    'tw-page',
    'ts-vitest-page',
    'tw:m-0',
    'tw:bg-slate-50',
    'tw:text-slate-800',
    'tw:dark:bg-slate-950',
    'tw:dark:text-slate-100',
    'tw:font-inter',
    'tw:antialiased',
    'tw:selection:bg-indigo-500',
    'tw:selection:text-white',
  ],
})

onUnmounted(() => {
  document.documentElement.classList.remove('dark', 'mod-ts-vitest')
})

const rootRef = ref(null)

// ── 1. Notificaciones Toast y Portapapeles ──────────────────────────────────
const toasts = ref([])
let toastCounter = 0

function showToast(message, type = 'success') {
  const id = ++toastCounter
  const item = reactive({ id, message, type, visible: false })
  toasts.value.push(item)
  requestAnimationFrame(() => {
    item.visible = true
  })
  setTimeout(() => {
    item.visible = false
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, 220)
  }, 2400)
}

function copyTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => showToast('Código copiado al portapapeles'))
      .catch(() => fallbackCopy(text))
    return
  }
  fallbackCopy(text)
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    const ok = document.execCommand('copy')
    if (ok) {
      showToast('Código copiado al portapapeles')
    } else {
      showToast('No se pudo copiar automáticamente', 'info')
    }
  } catch {
    showToast('Error al copiar al portapapeles', 'info')
  } finally {
    document.body.removeChild(textarea)
  }
}

// ── 2. Navegación entre las 7 partes y modo «Ver todo» ──────────────────────
const currentPartIndex = ref(0)
const showAllMode = ref(false)
const mobileSidebarOpen = ref(false)

const activePartId = computed(() => navParts[currentPartIndex.value].id)
const currentPartLabel = computed(() => `Parte ${navParts[currentPartIndex.value].roman} de VII`)

function isSectionVisible(partId) {
  return showAllMode.value || activePartId.value === partId
}

function navigateToPart(partId, scrollTop = true) {
  const idx = navParts.findIndex((p) => p.id === partId)
  if (idx === -1) return
  currentPartIndex.value = idx
  mobileSidebarOpen.value = false

  if (showAllMode.value) {
    nextTick(() => {
      const el = rootRef.value?.querySelector('#' + partId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return
  }

  if (scrollTop) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function prevPart() {
  if (currentPartIndex.value > 0) {
    navigateToPart(navParts[currentPartIndex.value - 1].id)
  }
}

function nextPart() {
  if (currentPartIndex.value < navParts.length - 1) {
    navigateToPart(navParts[currentPartIndex.value + 1].id)
  }
}

function toggleAllView() {
  showAllMode.value = !showAllMode.value
  mobileSidebarOpen.value = false
  if (showAllMode.value) {
    showToast('Mostrando todo el manual en una sola vista', 'info')
  } else {
    navigateToPart(activePartId.value)
  }
}

// ── 3. Cambio de tema claro / oscuro ────────────────────────────────────────
function toggleTheme() {
  document.documentElement.classList.toggle('dark')
}

// ── 4. Simulador de terminal, pestañas de Config y explorador IDE ───────────
const activeSimCmdId = ref('typecheck')
const activeSimCmd = computed(
  () =>
    terminalSimulatorCommands.find((c) => c.id === activeSimCmdId.value) ||
    terminalSimulatorCommands[0],
)

const activeCfgId = ref('pkg')
const activeIdeId = ref('tipos')

// ── 5. Buscador instantáneo por conceptos ───────────────────────────────────
const searchQuery = ref('')

const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (q.length < 2 || !rootRef.value) return []
  const blocks = Array.from(rootRef.value.querySelectorAll('[data-searchable]'))
  const matches = []
  for (const el of blocks) {
    const parentSection = el.closest('.manual-section')
    const heading = el.querySelector('h3, h4')?.textContent?.trim() || 'Sección del manual'
    const keywords = ((el.getAttribute('data-searchable') || '') + ' ' + heading).toLowerCase()
    if (keywords.includes(q)) {
      matches.push({
        element: el,
        sectionId: parentSection ? parentSection.id : 'part-1',
        title: heading,
      })
      if (matches.length >= 6) break
    }
  }
  return matches
})

function selectSearchHit(match) {
  searchQuery.value = ''
  mobileSidebarOpen.value = false
  navigateToPart(match.sectionId, false)
  setTimeout(() => {
    match.element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    match.element.classList.add('search-pulse')
    setTimeout(() => match.element.classList.remove('search-pulse'), 1800)
  }, 80)
}

// ── 6. Persistencia de progreso (11 hitos) y modal de reinicio ──────────────
const progressState = reactive({})
const showResetModal = ref(false)

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) Object.assign(progressState, JSON.parse(raw))
  } catch {
    // ignorar si localStorage está bloqueado
  }
})

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState))
  } catch {
    // ignorar
  }
}

function toggleMilestone(id, checked) {
  progressState[id] = checked
  saveProgress()
  if (checked) {
    showToast('¡Hito completado y guardado!')
  }
}

const completedCount = computed(() => {
  const allIds = [...challenges.map((c) => c.id), ...qualityChecklist.map((d) => d.id)]
  return allIds.filter((id) => Boolean(progressState[id])).length
})

const progressPct = computed(() =>
  TOTAL_MILESTONES > 0 ? Math.round((completedCount.value / TOTAL_MILESTONES) * 100) : 0,
)

function confirmResetProgress() {
  for (const k of Object.keys(progressState)) {
    delete progressState[k]
  }
  saveProgress()
  showResetModal.value = false
  showToast('Progreso reiniciado a 0%', 'info')
}
</script>

<template>
  <div ref="rootRef" class="ts-vitest-root">
    <!-- Contenedor Toast para notificaciones -->
    <div
      id="toast-container"
      class="tw:pointer-events-none tw:fixed tw:right-5 tw:bottom-5 tw:z-50 tw:flex tw:flex-col tw:gap-2"
    >
      <div
        v-for="t in toasts"
        :key="t.id"
        class="tw:pointer-events-auto tw:flex tw:transform tw:items-center tw:gap-2.5 tw:rounded-xl tw:border tw:bg-slate-900 tw:px-4 tw:py-3 tw:text-xs tw:font-medium tw:text-white tw:shadow-xl tw:transition-all tw:duration-200"
        :class="[
          t.type === 'success' ? 'tw:border-emerald-500/40' : 'tw:border-indigo-500/40',
          t.visible ? 'tw:translate-y-0 tw:opacity-100' : 'tw:translate-y-2 tw:opacity-0',
        ]"
      >
        <span
          class="tw:h-2 tw:w-2 tw:rounded-full"
          :class="t.type === 'success' ? 'tw:bg-emerald-400' : 'tw:bg-indigo-400'"
        />
        <span>{{ t.message }}</span>
      </div>
    </div>

    <!-- Modal personalizado de confirmación -->
    <div
      v-if="showResetModal"
      id="confirm-modal"
      class="tw:fixed tw:inset-0 tw:z-50 tw:flex tw:items-center tw:justify-center tw:bg-slate-950/70 tw:p-4 tw:backdrop-blur-sm"
    >
      <div
        class="tw:w-full tw:max-w-md tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-6 tw:shadow-2xl tw:dark:border-slate-800 tw:dark:bg-slate-900"
      >
        <div class="tw:mb-3 tw:flex tw:items-center tw:gap-3">
          <div
            class="tw:flex tw:h-10 tw:w-10 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-xl tw:bg-amber-500/10 tw:text-amber-500"
          >
            <svg class="tw:h-5 tw:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 class="tw:text-lg tw:font-bold tw:text-slate-900 tw:dark:text-white">
            Reiniciar progreso
          </h3>
        </div>
        <p class="tw:mb-6 tw:text-sm tw:text-slate-600 tw:dark:text-slate-400">
          ¿Estás seguro de que deseas borrar el estado guardado de los 5 retos prácticos y del checklist de calidad?
        </p>
        <div class="tw:flex tw:justify-end tw:gap-3">
          <button
            id="modal-cancel-btn"
            type="button"
            class="tw:cursor-pointer tw:rounded-xl tw:bg-slate-100 tw:px-4 tw:py-2.5 tw:text-sm tw:font-medium tw:text-slate-700 tw:transition tw:hover:bg-slate-200 tw:dark:bg-slate-800 tw:dark:text-slate-300 tw:dark:hover:bg-slate-700"
            @click="showResetModal = false"
          >
            Cancelar
          </button>
          <button
            id="modal-confirm-btn"
            type="button"
            class="tw:cursor-pointer tw:rounded-xl tw:bg-rose-600 tw:px-4 tw:py-2.5 tw:text-sm tw:font-semibold tw:text-white tw:shadow-lg tw:shadow-rose-600/20 tw:transition tw:hover:bg-rose-500"
            @click="confirmResetProgress"
          >
            Sí, reiniciar todo
          </button>
        </div>
      </div>
    </div>

    <!-- Barra superior móvil -->
    <header
      class="tw:sticky tw:top-0 tw:z-30 tw:flex tw:items-center tw:justify-between tw:border-b tw:border-slate-200 tw:bg-white/90 tw:px-4 tw:py-3 tw:backdrop-blur-md tw:lg:hidden tw:dark:border-slate-800 tw:dark:bg-slate-900/90"
    >
      <div class="tw:flex tw:items-center tw:gap-3">
        <button
          id="mobile-menu-btn"
          type="button"
          aria-label="Abrir menú"
          class="tw:cursor-pointer tw:rounded-xl tw:bg-slate-100 tw:p-2.5 tw:text-slate-700 tw:transition tw:hover:bg-slate-200 tw:dark:bg-slate-800 tw:dark:text-slate-200 tw:dark:hover:bg-slate-700"
          @click="mobileSidebarOpen = true"
        >
          <svg class="tw:h-5 tw:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div>
          <span class="tw:block tw:text-sm tw:font-bold tw:tracking-tight">TS &amp; Vitest Pro</span>
          <span
            id="mobile-progress-text"
            class="tw:text-xs tw:font-medium tw:text-indigo-600 tw:dark:text-indigo-400"
          >Progreso: {{ progressPct }}%</span>
        </div>
      </div>
      <div class="tw:flex tw:items-center tw:gap-2">
        <button
          id="theme-toggle-mobile"
          type="button"
          aria-label="Cambiar tema"
          class="tw:cursor-pointer tw:rounded-xl tw:bg-slate-100 tw:p-2.5 tw:text-slate-700 tw:dark:bg-slate-800 tw:dark:text-slate-200"
          @click="toggleTheme"
        >
          <svg
            class="tw:hidden tw:h-5 tw:w-5 tw:dark:block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            class="tw:block tw:h-5 tw:w-5 tw:dark:hidden"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </header>

    <!-- Backdrop móvil -->
    <div
      v-if="mobileSidebarOpen"
      id="sidebar-backdrop"
      class="tw:fixed tw:inset-0 tw:z-30 tw:bg-slate-950/60 tw:backdrop-blur-xs tw:lg:hidden"
      @click="mobileSidebarOpen = false"
    />

    <div class="tw:flex tw:min-h-screen">
      <!-- SIDEBAR DE NAVEGACIÓN -->
      <aside
        id="sidebar"
        class="tw:fixed tw:top-0 tw:left-0 tw:z-40 tw:flex tw:h-screen tw:w-80 tw:transform tw:flex-col tw:border-r tw:border-slate-200 tw:bg-white tw:transition-transform tw:duration-200 tw:ease-in-out tw:lg:sticky tw:lg:translate-x-0 tw:dark:border-slate-800 tw:dark:bg-slate-900"
        :class="mobileSidebarOpen ? 'tw:translate-x-0' : 'tw:-translate-x-full'"
      >
        <!-- Cabecera Sidebar -->
        <div class="tw:border-b tw:border-slate-200 tw:p-5 tw:dark:border-slate-800">
          <div class="tw:mb-4 tw:flex tw:items-center tw:justify-between">
            <div class="tw:flex tw:items-center tw:gap-2.5">
              <div
                class="tw:flex tw:h-9 tw:w-9 tw:items-center tw:justify-center tw:rounded-xl tw:bg-gradient-to-br tw:from-indigo-500 tw:to-cyan-500 tw:font-cm-mono tw:text-sm tw:font-bold tw:text-white tw:shadow-md tw:shadow-indigo-500/20"
              >
                TS
              </div>
              <div>
                <h1 class="tw:text-sm tw:leading-tight tw:font-bold tw:text-slate-900 tw:dark:text-white">
                  Manual TS + Testing
                </h1>
                <p class="tw:text-xs tw:text-slate-500 tw:dark:text-slate-400">De Cero a Nivel Pro</p>
              </div>
            </div>
            <button
              id="theme-toggle-desktop"
              type="button"
              title="Cambiar tema claro/oscuro"
              class="tw:cursor-pointer tw:rounded-xl tw:bg-slate-100 tw:p-2 tw:text-slate-600 tw:transition tw:hover:bg-slate-200 tw:dark:bg-slate-800 tw:dark:text-slate-300 tw:dark:hover:bg-slate-700"
              @click="toggleTheme"
            >
              <svg
                class="tw:hidden tw:h-4 tw:w-4 tw:dark:block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <svg
                class="tw:block tw:h-4 tw:w-4 tw:dark:hidden"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          </div>

          <!-- Barra de progreso global -->
          <div class="tw:rounded-xl tw:bg-slate-100 tw:p-3 tw:dark:bg-slate-800/80">
            <div class="tw:mb-1.5 tw:flex tw:items-center tw:justify-between tw:text-xs">
              <span class="tw:font-medium tw:text-slate-600 tw:dark:text-slate-300">Progreso Práctico</span>
              <span
                id="sidebar-progress-pct"
                class="tw:font-bold tw:text-indigo-600 tw:dark:text-indigo-400"
              >{{ progressPct }}%</span>
            </div>
            <div
              class="tw:h-2 tw:w-full tw:overflow-hidden tw:rounded-full tw:bg-slate-200 tw:dark:bg-slate-700"
            >
              <div
                id="sidebar-progress-bar"
                class="tw:h-full tw:rounded-full tw:bg-gradient-to-r tw:from-indigo-500 tw:to-emerald-400 tw:transition-all tw:duration-300"
                :style="{ width: `${progressPct}%` }"
              />
            </div>
            <p
              id="sidebar-progress-detail"
              class="tw:mt-1.5 tw:text-[11px] tw:text-slate-500 tw:dark:text-slate-400"
            >
              {{ completedCount }}/{{ TOTAL_MILESTONES }} hitos completados
            </p>
          </div>

          <!-- Buscador rápido -->
          <div class="tw:relative tw:mt-3">
            <input
              id="search-input"
              v-model="searchQuery"
              type="text"
              placeholder="Buscar (ej. satisfies, spyOn, alias)..."
              class="tw:w-full tw:rounded-xl tw:border tw:border-transparent tw:bg-slate-100 tw:py-2 tw:pr-3 tw:pl-9 tw:text-xs tw:text-slate-800 tw:placeholder-slate-400 tw:transition tw:outline-none tw:focus:border-indigo-500 tw:focus:bg-white tw:dark:bg-slate-800 tw:dark:text-slate-100 tw:dark:focus:bg-slate-900"
            >
            <svg
              class="tw: absolute tw:top-2.5 tw:left-3 tw:h-4 tw:w-4 tw:text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div
            v-if="searchQuery.trim().length >= 2"
            id="search-results"
            class="tw:mt-2 tw:max-h-48 tw:divide-y tw:divide-slate-100 tw:overflow-y-auto tw:rounded-xl tw:border tw:border-slate-200 tw:bg-white tw:shadow-lg tw:dark:divide-slate-800 tw:dark:border-slate-700 tw:dark:bg-slate-900"
          >
            <div
              v-if="searchResults.length === 0"
              class="tw:p-3 tw:text-xs tw:text-slate-400"
            >
              Sin resultados para "{{ searchQuery.trim() }}"
            </div>
            <button
              v-for="(m, idx) in searchResults"
              :key="idx"
              type="button"
              class="tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:justify-between tw:gap-2 tw:px-3 tw:py-2.5 tw:text-left tw:text-xs tw:transition tw:hover:bg-indigo-50 tw:dark:hover:bg-slate-800"
              @click="selectSearchHit(m)"
            >
              <span class="tw:truncate tw:font-medium tw:text-slate-700 tw:dark:text-slate-200">{{
                m.title
              }}</span>
              <span
                class="tw:shrink-0 tw:rounded tw:bg-slate-100 tw:px-1.5 tw:py-0.5 tw:font-cm-mono tw:text-[10px] tw:uppercase tw:text-slate-500 tw:dark:bg-slate-700 tw:dark:text-slate-300"
              >{{ m.sectionId.replace('part-', 'P.') }}</span>
            </button>
          </div>
        </div>

        <!-- Enlaces de navegación por módulos -->
        <nav id="nav-menu" class="tw:flex-1 tw:space-y-1 tw:overflow-y-auto tw:p-3">
          <button
            v-for="p in navParts"
            :key="p.id"
            type="button"
            :data-target="p.id"
            class="nav-btn tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:gap-3 tw:rounded-xl tw:px-3 tw:py-2.5 tw:text-left tw:text-xs tw:transition"
            :class="
              !showAllMode && activePartId === p.id
                ? 'tw:bg-indigo-50 tw:font-semibold tw:text-indigo-700 tw:dark:bg-indigo-500/15 tw:dark:text-indigo-300'
                : 'tw:font-medium tw:text-slate-600 tw:hover:bg-slate-100 tw:dark:text-slate-400 tw:dark:hover:bg-slate-800'
            "
            @click="navigateToPart(p.id)"
          >
            <span
              class="tw:flex tw:h-6 tw:w-6 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg tw:font-bold"
              :class="{
                'tw:bg-indigo-500/10 tw:text-indigo-600 tw:dark:text-indigo-400':
                  p.badgeColor === 'indigo',
                'tw:bg-emerald-500/10 tw:text-emerald-600 tw:dark:text-emerald-400':
                  p.badgeColor === 'emerald',
                'tw:bg-amber-500/10 tw:text-amber-600 tw:dark:text-amber-400':
                  p.badgeColor === 'amber',
                'tw:bg-cyan-500/10 tw:text-cyan-600 tw:dark:text-cyan-400':
                  p.badgeColor === 'cyan',
              }"
            >{{ p.roman }}</span>
            <span class="tw:truncate">{{ p.label }}</span>
          </button>
        </nav>

        <!-- Pie del Sidebar: Modo vista continua / Reset -->
        <div class="tw:space-y-2 tw:border-t tw:border-slate-200 tw:p-4 tw:dark:border-slate-800">
          <button
            id="toggle-all-view"
            type="button"
            class="tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:justify-center tw:gap-2 tw:rounded-xl tw:bg-slate-100 tw:px-3 tw:py-2 tw:text-xs tw:font-semibold tw:text-slate-700 tw:transition tw:hover:bg-slate-200 tw:dark:bg-slate-800 tw:dark:text-slate-200 tw:dark:hover:bg-slate-700"
            @click="toggleAllView"
          >
            <svg
              class="tw:h-4 tw:w-4 tw:text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <span id="toggle-all-label">{{
              showAllMode ? 'Volver a vista por módulos' : 'Ver todo en una página'
            }}</span>
          </button>
          <button
            id="reset-progress-btn"
            type="button"
            class="tw:w-full tw:cursor-pointer tw:rounded-xl tw:px-3 tw:py-1.5 tw:text-[11px] tw:font-medium tw:text-slate-500 tw:transition tw:hover:text-rose-500"
            @click="showResetModal = true"
          >
            Reiniciar progreso guardado
          </button>
        </div>
      </aside>

      <!-- CONTENIDO PRINCIPAL -->
      <main
        class="tw:mx-auto tw:max-w-5xl tw:min-w-0 tw:flex-1 tw:px-4 tw:py-8 tw:sm:px-8 tw:lg:px-12"
      >
        <!-- Banner Hero -->
        <div
          class="tw:relative tw:mb-8 tw:overflow-hidden tw:rounded-3xl tw:bg-gradient-to-br tw:from-indigo-600 tw:via-indigo-700 tw:to-slate-900 tw:p-6 tw:text-white tw:shadow-xl tw:shadow-indigo-950/20 tw:sm:p-8"
        >
          <div class="tw:relative tw:z-10">
            <div
              class="tw:mb-3 tw:inline-flex tw:items-center tw:gap-2 tw:rounded-full tw:bg-white/15 tw:px-3 tw:py-1 tw:text-xs tw:font-semibold tw:backdrop-blur-xs"
            >
              <span>Ruta de Formación Profesional</span>
              <span>•</span>
              <span>JS → TypeScript + Vitest</span>
            </div>
            <h2 class="tw:mb-2 tw:text-2xl tw:font-extrabold tw:tracking-tight tw:sm:text-3xl">
              Manual Completo de TypeScript y Tests Unitarios
            </h2>
            <p
              class="tw:max-w-2xl tw:text-sm tw:leading-relaxed tw:text-indigo-100 tw:sm:text-base"
            >
              Todo lo que un desarrollador JavaScript necesita para dominar el tipado estricto, alias de rutas, patrones avanzados, mocks, Fake Timers y TDD con documentación oficial y proyecto práctico.
            </p>
          </div>
          <div
            class="tw:pointer-events-none tw:absolute tw:-right-10 tw:-bottom-10 tw:h-56 tw:w-56 tw:rounded-full tw:bg-cyan-400/20 tw:blur-2xl"
          />
        </div>

        <!-- ===================================================================== -->
        <!-- PARTE I: DOCUMENTACIÓN OFICIAL Y TERMINAL                             -->
        <!-- ===================================================================== -->
        <section
          v-show="isSectionVisible('part-1')"
          id="part-1"
          class="manual-section animate-section tw:space-y-8"
          :class="{ 'tw:mb-14': showAllMode }"
        >
          <div class="tw:border-b tw:border-slate-200 tw:pb-4 tw:dark:border-slate-800">
            <span
              class="tw:text-xs tw:font-bold tw:tracking-wider tw:uppercase tw:text-indigo-600 tw:dark:text-indigo-400"
            >Parte I</span>
            <h2 class="tw:mt-1 tw:text-2xl tw:font-bold">
              Documentación Oficial y Guía de Ejecución en Terminal
            </h2>
            <p class="tw:mt-1 tw:text-sm tw:text-slate-600 tw:dark:text-slate-400">
              Fuentes primarias verificadas y flujo diario de comprobación profesional.
            </p>
          </div>

          <!-- Enlaces Oficiales en Grid -->
          <div
            class="tw:grid tw:grid-cols-1 tw:gap-5 tw:md:grid-cols-2"
            data-searchable="Documentacion Oficial TypeScript Vitest Handbook Narrowing Generics Utility Types TSConfig Expect Vi Coverage Jest Node"
          >
            <!-- Tarjeta TypeScript -->
            <div
              class="tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:shadow-xs tw:dark:border-slate-800 tw:dark:bg-slate-900"
            >
              <div class="tw:mb-4 tw:flex tw:items-center tw:gap-2.5">
                <span
                  class="tw:rounded-lg tw:bg-blue-500/10 tw:px-2.5 tw:py-1 tw:font-cm-mono tw:text-xs tw:font-bold tw:text-blue-600 tw:dark:text-blue-400"
                >TS</span>
                <h3 class="tw:text-base tw:font-bold">Documentación Oficial de TypeScript</h3>
              </div>
              <ul class="tw:space-y-2.5 tw:text-sm">
                <li v-for="link in tsOfficialLinks" :key="link.href">
                  <a
                    :href="link.href"
                    target="_blank"
                    rel="noopener"
                    class="tw:text-indigo-600 tw:hover:underline tw:dark:text-indigo-400"
                    :class="{ 'tw:font-medium': link.highlight }"
                  >{{ link.label }}</a>
                </li>
              </ul>
            </div>

            <!-- Tarjeta Testing -->
            <div
              class="tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:shadow-xs tw:dark:border-slate-800 tw:dark:bg-slate-900"
            >
              <div class="tw:mb-4 tw:flex tw:items-center tw:gap-2.5">
                <span
                  class="tw:rounded-lg tw:bg-emerald-500/10 tw:px-2.5 tw:py-1 tw:font-cm-mono tw:text-xs tw:font-bold tw:text-emerald-600 tw:dark:text-emerald-400"
                >TEST</span>
                <h3 class="tw:text-base tw:font-bold">Documentación Oficial de Testing</h3>
              </div>
              <ul class="tw:space-y-2.5 tw:text-sm">
                <li v-for="link in testOfficialLinks" :key="link.href">
                  <a
                    :href="link.href"
                    target="_blank"
                    rel="noopener"
                    class="tw:hover:underline"
                    :class="[
                      link.emerald
                        ? 'tw:text-emerald-600 tw:dark:text-emerald-400'
                        : 'tw:text-slate-600 tw:dark:text-slate-300',
                      { 'tw:font-medium': link.highlight },
                    ]"
                  >{{ link.label }}</a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Simulador Interactivo de Terminal -->
          <div
            class="tw:overflow-hidden tw:rounded-2xl tw:border tw:border-slate-800 tw:bg-slate-900 tw:text-slate-100 tw:shadow-lg"
            data-searchable="Terminal typecheck tsc noEmit vitest run coverage Stmts Branch Funcs Lines build"
          >
            <div
              class="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-3 tw:border-b tw:border-slate-800 tw:bg-slate-950 tw:px-5 tw:py-3.5"
            >
              <div class="tw:flex tw:items-center tw:gap-2">
                <span class="tw:h-3 tw:w-3 tw:rounded-full tw:bg-rose-500" />
                <span class="tw:h-3 tw:w-3 tw:rounded-full tw:bg-amber-500" />
                <span class="tw:h-3 tw:w-3 tw:rounded-full tw:bg-emerald-500" />
                <span class="tw:ml-2 tw:font-cm-mono tw:text-xs tw:text-slate-400">Simulador de Flujo Diario en Terminal — Haz clic para probar cada comando</span>
              </div>
            </div>

            <div class="tw:space-y-4 tw:p-5">
              <div class="tw:flex tw:flex-wrap tw:gap-2">
                <button
                  v-for="cmd in terminalSimulatorCommands"
                  :key="cmd.id"
                  type="button"
                  :data-sim-cmd="cmd.id"
                  class="sim-cmd-btn tw:cursor-pointer tw:rounded-xl tw:px-3.5 tw:py-2 tw:font-cm-mono tw:text-xs tw:font-semibold tw:transition"
                  :class="
                    activeSimCmdId === cmd.id
                      ? 'tw:bg-indigo-600 tw:text-white tw:hover:bg-indigo-500'
                      : `tw:border tw:border-slate-700 tw:bg-slate-800 tw:hover:bg-slate-700 ${cmd.colorClass}`
                  "
                  @click="activeSimCmdId = cmd.id"
                >
                  {{ cmd.label }}
                </button>
              </div>

              <pre
                id="terminal-output"
                class="tw:overflow-x-auto tw:rounded-xl tw:border tw:border-slate-800/80 tw:bg-slate-950 tw:p-4 tw:font-cm-mono tw:text-xs tw:leading-relaxed tw:text-emerald-400 tw:sm:text-sm"
              >{{ activeSimCmd.output }}</pre>

              <div
                id="terminal-explanation"
                class="tw:rounded-xl tw:border tw:border-slate-700/60 tw:bg-slate-800/60 tw:p-3.5 tw:text-xs tw:text-slate-300"
                v-html="activeSimCmd.explanation"
              />
            </div>
          </div>

          <!-- Comandos adicionales útiles -->
          <div class="tw:grid tw:grid-cols-1 tw:gap-4 tw:sm:grid-cols-2">
            <div
              class="tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-4 tw:dark:border-slate-800 tw:dark:bg-slate-900"
            >
              <h4 class="tw:mb-2 tw:text-xs tw:font-bold tw:uppercase tw:text-slate-500">
                Ejecutar un solo archivo de test
              </h4>
              <CodeBlock
                code="npx vitest run tests/calculadoraPrecios.test.ts"
                lang="bash"
                @copy="copyTextToClipboard"
              />
            </div>
            <div
              class="tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-4 tw:dark:border-slate-800 tw:dark:bg-slate-900"
            >
              <h4 class="tw:mb-2 tw:text-xs tw:font-bold tw:uppercase tw:text-slate-500">
                Filtrar tests por nombre
              </h4>
              <CodeBlock
                code='npx vitest run -t "cupón porcentual"'
                lang="bash"
                @copy="copyTextToClipboard"
              />
            </div>
          </div>
        </section>

        <!-- ===================================================================== -->
        <!-- PARTE II: ARQUITECTURA, ARCHIVOS Y ALIAS DE RUTAS                     -->
        <!-- ===================================================================== -->
        <section
          v-show="isSectionVisible('part-2')"
          id="part-2"
          class="manual-section animate-section tw:space-y-8"
          :class="{ 'tw:mb-14': showAllMode }"
        >
          <div class="tw:border-b tw:border-slate-200 tw:pb-4 tw:dark:border-slate-800">
            <span
              class="tw:text-xs tw:font-bold tw:tracking-wider tw:uppercase tw:text-indigo-600 tw:dark:text-indigo-400"
            >Parte II</span>
            <h2 class="tw:mt-1 tw:text-2xl tw:font-bold">
              Arquitectura del Proyecto, Archivos y Alias de Rutas
            </h2>
            <p class="tw:mt-1 tw:text-sm tw:text-slate-600 tw:dark:text-slate-400">
              Cómo inicializar el proyecto desde cero y sincronizar alias limpios (<code>@domain/*</code>, <code>@services/*</code>).
            </p>
          </div>

          <div
            class="tw:space-y-3 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
            data-searchable="npm init install typescript vitest coverage-v8 tsx"
          >
            <h3 class="tw:text-base tw:font-bold">1. Inicialización desde cero</h3>
            <CodeBlock :code="snippets.initBash" lang="bash" @copy="copyTextToClipboard" />
          </div>

          <div
            class="tw:grid tw:grid-cols-1 tw:gap-5 tw:lg:grid-cols-2"
            data-searchable="estructura carpetas domain services tests alias baseUrl paths resolve"
          >
            <div
              class="tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
            >
              <h3 class="tw:mb-3 tw:text-base tw:font-bold">2. Mapa de Carpetas</h3>
              <CodeBlock :code="snippets.folderTree" lang="text" @copy="copyTextToClipboard" />
            </div>

            <div
              class="tw:flex tw:flex-col tw:justify-between tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
            >
              <div>
                <h3 class="tw:mb-3 tw:text-base tw:font-bold">3. Doble Configuración de Alias</h3>
                <p
                  class="tw:mb-4 tw:text-sm tw:leading-relaxed tw:text-slate-600 tw:dark:text-slate-400"
                >
                  Para evitar importaciones relativas frágiles como <code>../../../domain/tipos</code> y usar <code>@domain/tipos</code>, es obligatorio declararlos en <strong>dos sitios</strong>:
                </p>
                <div class="tw:space-y-3">
                  <div
                    class="tw:rounded-xl tw:border tw:border-indigo-500/20 tw:bg-indigo-500/10 tw:p-3.5"
                  >
                    <span
                      class="tw:block tw:font-cm-mono tw:text-xs tw:font-bold tw:text-indigo-600 tw:dark:text-indigo-400"
                    >1. tsconfig.json (baseUrl + paths)</span>
                    <span class="tw:text-xs tw:text-slate-600 tw:dark:text-slate-300">Para que el compilador <code>tsc</code> y el autocompletado de VS Code entiendan los tipos.</span>
                  </div>
                  <div
                    class="tw:rounded-xl tw:border tw:border-emerald-500/20 tw:bg-emerald-500/10 tw:p-3.5"
                  >
                    <span
                      class="tw:block tw:font-cm-mono tw:text-xs tw:font-bold tw:text-emerald-600 tw:dark:text-emerald-400"
                    >2. vitest.config.ts (resolve.alias)</span>
                    <span class="tw:text-xs tw:text-slate-600 tw:dark:text-slate-300">Para que Vitest resuelva las rutas reales en tiempo de ejecución de tests.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pestañas de archivos de configuración -->
          <div
            class="tw:overflow-hidden tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:dark:border-slate-800 tw:dark:bg-slate-900"
            data-searchable="package.json tsconfig.json vitest.config.ts strict noUncheckedIndexedAccess exactOptionalPropertyTypes"
          >
            <div
              class="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2 tw:border-b tw:border-slate-200 tw:bg-slate-50 tw:px-5 tw:py-3.5 tw:dark:border-slate-800 tw:dark:bg-slate-950/50"
            >
              <span class="tw:text-xs tw:font-bold tw:tracking-wider tw:uppercase tw:text-slate-500">Archivos de Configuración Base</span>
              <div id="config-tabs" class="tw:flex tw:flex-wrap tw:gap-1.5">
                <button
                  v-for="cfg in configFiles"
                  :key="cfg.id"
                  type="button"
                  :data-cfg="cfg.id"
                  class="cfg-tab-btn tw:cursor-pointer tw:rounded-lg tw:px-3 tw:py-1.5 tw:font-cm-mono tw:text-xs tw:font-semibold"
                  :class="
                    activeCfgId === cfg.id
                      ? 'tw:bg-indigo-600 tw:text-white'
                      : 'tw:bg-slate-200 tw:text-slate-700 tw:dark:bg-slate-800 tw:dark:text-slate-300'
                  "
                  @click="activeCfgId = cfg.id"
                >
                  {{ cfg.label }}
                </button>
              </div>
            </div>

            <div class="tw:p-5">
              <div
                v-for="cfg in configFiles"
                v-show="activeCfgId === cfg.id"
                :id="`cfg-${cfg.id}`"
                :key="cfg.id"
              >
                <CodeBlock :code="cfg.code" :lang="cfg.lang" @copy="copyTextToClipboard" />
              </div>
            </div>
          </div>
        </section>

        <!-- ===================================================================== -->
        <!-- PARTE III: TYPESCRIPT (BASE Y NIVEL PRO)                              -->
        <!-- ===================================================================== -->
        <section
          v-show="isSectionVisible('part-3')"
          id="part-3"
          class="manual-section animate-section tw:space-y-8"
          :class="{ 'tw:mb-14': showAllMode }"
        >
          <div class="tw:border-b tw:border-slate-200 tw:pb-4 tw:dark:border-slate-800">
            <span
              class="tw:text-xs tw:font-bold tw:tracking-wider tw:uppercase tw:text-indigo-600 tw:dark:text-indigo-400"
            >Parte III</span>
            <h2 class="tw:mt-1 tw:text-2xl tw:font-bold">
              Dominio Completo de TypeScript (Base y Nivel Pro)
            </h2>
            <p class="tw:mt-1 tw:text-sm tw:text-slate-600 tw:dark:text-slate-400">
              Desde los fundamentos del sistema de tipos hasta patrones avanzados de nivel arquitecto.
            </p>
          </div>

          <!-- Bloque 1: Fundamentos -->
          <div class="tw:space-y-5">
            <h3 class="tw:flex tw:items-center tw:gap-2 tw:text-lg tw:font-bold">
              <span
                class="tw:rounded-md tw:bg-indigo-500/10 tw:px-2.5 tw:py-0.5 tw:text-xs tw:text-indigo-600 tw:dark:text-indigo-400"
              >Nivel Base</span>
              Fundamentos Esenciales
            </h3>

            <div
              class="tw:space-y-3 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
              data-searchable="primitivos tuplas as const enum ROLES"
            >
              <h4 class="tw:text-sm tw:font-bold">1. Primitivos, Tuplas y <code>as const</code></h4>
              <CodeBlock :code="snippets.tsPrimitives" @copy="copyTextToClipboard" />
            </div>

            <div
              class="tw:space-y-3 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
              data-searchable="any unknown never void parsearNombre"
            >
              <h4 class="tw:text-sm tw:font-bold">
                2. Tipos Especiales: <code>any</code> vs <code>unknown</code> vs <code>never</code> vs <code>void</code>
              </h4>
              <div class="tw:mb-2 tw:grid tw:grid-cols-2 tw:gap-2.5 tw:text-xs tw:sm:grid-cols-4">
                <div
                  class="tw:rounded-xl tw:border tw:border-rose-500/20 tw:bg-rose-500/10 tw:p-2.5"
                >
                  <strong class="tw:block tw:font-cm-mono tw:text-rose-600 tw:dark:text-rose-400">any</strong>
                  <span>Desactiva TS. Prohibido.</span>
                </div>
                <div
                  class="tw:rounded-xl tw:border tw:border-emerald-500/20 tw:bg-emerald-500/10 tw:p-2.5"
                >
                  <strong
                    class="tw:block tw:font-cm-mono tw:text-emerald-600 tw:dark:text-emerald-400"
                  >unknown</strong>
                  <span>Seguro. Exige validar antes.</span>
                </div>
                <div
                  class="tw:rounded-xl tw:border tw:border-sky-500/20 tw:bg-sky-500/10 tw:p-2.5"
                >
                  <strong class="tw:block tw:font-cm-mono tw:text-sky-600 tw:dark:text-sky-400">void</strong>
                  <span>Función sin retorno útil.</span>
                </div>
                <div
                  class="tw:rounded-xl tw:border tw:border-purple-500/20 tw:bg-purple-500/10 tw:p-2.5"
                >
                  <strong
                    class="tw:block tw:font-cm-mono tw:text-purple-600 tw:dark:text-purple-400"
                  >never</strong>
                  <span>Estado imposible / error.</span>
                </div>
              </div>
              <CodeBlock :code="snippets.tsUnknown" @copy="copyTextToClipboard" />
            </div>

            <div
              class="tw:space-y-3 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
              data-searchable="Narrowing uniones discriminadas exhaustividad switch"
            >
              <h4 class="tw:text-sm tw:font-bold">
                3. Uniones Discriminadas y Exhaustividad con <code>never</code>
              </h4>
              <CodeBlock :code="snippets.tsDiscriminated" @copy="copyTextToClipboard" />
            </div>

            <div
              class="tw:space-y-3 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
              data-searchable="Generics Partial Omit Pick Readonly Record"
            >
              <h4 class="tw:text-sm tw:font-bold">
                4. Genéricos (<code>&lt;T&gt;</code>) y Utility Types
              </h4>
              <CodeBlock :code="snippets.tsGenerics" @copy="copyTextToClipboard" />
            </div>
          </div>

          <!-- Bloque 2: Nivel Pro -->
          <div class="tw:space-y-5 tw:pt-4">
            <h3 class="tw:flex tw:items-center tw:gap-2 tw:text-lg tw:font-bold">
              <span
                class="tw:rounded-md tw:bg-amber-500/10 tw:px-2.5 tw:py-0.5 tw:text-xs tw:text-amber-600 tw:dark:text-amber-400"
              >Nivel Pro</span>
              Patrones Avanzados de TypeScript
            </h3>

            <div
              class="tw:grid tw:grid-cols-1 tw:gap-5 tw:lg:grid-cols-2"
              data-searchable="satisfies asserts Template Literal Mapped Types infer"
            >
              <div
                class="tw:space-y-3 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
              >
                <h4 class="tw:text-sm tw:font-bold">Operador <code>satisfies</code></h4>
                <p class="tw:text-xs tw:text-slate-500 tw:dark:text-slate-400">
                  Valida contra un tipo general sin perder el autocompletado exacto de las claves.
                </p>
                <CodeBlock :code="snippets.tsSatisfies" @copy="copyTextToClipboard" />
              </div>

              <div
                class="tw:space-y-3 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
              >
                <h4 class="tw:text-sm tw:font-bold">Funciones de Aserción (<code>asserts</code>)</h4>
                <p class="tw:text-xs tw:text-slate-500 tw:dark:text-slate-400">
                  Estrechan el tipo de una variable tras validar una precondición.
                </p>
                <CodeBlock :code="snippets.tsAsserts" @copy="copyTextToClipboard" />
              </div>

              <div
                class="tw:space-y-3 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
              >
                <h4 class="tw:text-sm tw:font-bold">Template Literal &amp; Mapped Types</h4>
                <CodeBlock :code="snippets.tsTemplateLiteral" @copy="copyTextToClipboard" />
              </div>

              <div
                class="tw:space-y-3 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
              >
                <h4 class="tw:text-sm tw:font-bold">Conditional Types e <code>infer</code></h4>
                <CodeBlock :code="snippets.tsInfer" @copy="copyTextToClipboard" />
              </div>
            </div>
          </div>
        </section>

        <!-- ===================================================================== -->
        <!-- PARTE IV: VITEST TESTING (BASE Y NIVEL PRO)                           -->
        <!-- ===================================================================== -->
        <section
          v-show="isSectionVisible('part-4')"
          id="part-4"
          class="manual-section animate-section tw:space-y-8"
          :class="{ 'tw:mb-14': showAllMode }"
        >
          <div class="tw:border-b tw:border-slate-200 tw:pb-4 tw:dark:border-slate-800">
            <span
              class="tw:text-xs tw:font-bold tw:tracking-wider tw:uppercase tw:text-indigo-600 tw:dark:text-indigo-400"
            >Parte IV</span>
            <h2 class="tw:mt-1 tw:text-2xl tw:font-bold">
              Dominio Completo de Tests Unitarios con Vitest
            </h2>
            <p class="tw:mt-1 tw:text-sm tw:text-slate-600 tw:dark:text-slate-400">
              Principios FIRST, estructura AAA, matchers, tests parametrizados, mocks, spies y Fake Timers.
            </p>
          </div>

          <div
            class="tw:grid tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-2"
            data-searchable="FIRST AAA Arrange Act Assert Fast Isolated Repeatable"
          >
            <div
              class="tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
            >
              <h3 class="tw:mb-2 tw:text-sm tw:font-bold tw:text-indigo-600 tw:dark:text-indigo-400">
                Principios F.I.R.S.T.
              </h3>
              <ul class="tw:space-y-1.5 tw:text-xs tw:text-slate-600 tw:dark:text-slate-300">
                <li><strong>Fast:</strong> Ejecución en milisegundos sin red ni BD real.</li>
                <li><strong>Isolated:</strong> Ningún test depende de otro test.</li>
                <li><strong>Repeatable:</strong> Mismo resultado en cualquier máquina y hora.</li>
                <li><strong>Self-Validating:</strong> Pasa (verde) o falla (rojo) automáticamente.</li>
                <li><strong>Timely:</strong> Escritos junto al código o antes (TDD).</li>
              </ul>
            </div>
            <div
              class="tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
            >
              <h3
                class="tw:mb-2 tw:text-sm tw:font-bold tw:text-emerald-600 tw:dark:text-emerald-400"
              >
                Anatomía A.A.A.
              </h3>
              <ul class="tw:space-y-1.5 tw:text-xs tw:text-slate-600 tw:dark:text-slate-300">
                <li>
                  <strong>1. Arrange (Preparar):</strong> Instanciar datos de entrada y configurar mocks.
                </li>
                <li><strong>2. Act (Actuar):</strong> Llamar a la función o método bajo prueba.</li>
                <li>
                  <strong>3. Assert (Verificar):</strong> Comprobar el valor devuelto o las llamadas a mocks con <code>expect()</code>.
                </li>
              </ul>
            </div>
          </div>

          <div
            class="tw:space-y-4 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
            data-searchable="expect toBe toEqual toMatchObject toThrow rejects it.each"
          >
            <h3 class="tw:text-base tw:font-bold">
              Matchers Esenciales y Tests Parametrizados (<code>it.each</code>)
            </h3>
            <CodeBlock :code="snippets.vitestMatchers" @copy="copyTextToClipboard" />
          </div>

          <div
            class="tw:grid tw:grid-cols-1 tw:gap-5 tw:lg:grid-cols-2"
            data-searchable="vi.fn vi.spyOn vi.mock useFakeTimers setSystemTime advanceTimersByTime useRealTimers"
          >
            <div
              class="tw:space-y-3 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
            >
              <h3 class="tw:text-base tw:font-bold">
                <code>vi.fn()</code> vs <code>vi.spyOn()</code> vs <code>vi.mock()</code>
              </h3>
              <ul class="tw:space-y-2 tw:text-xs tw:text-slate-600 tw:dark:text-slate-300">
                <li>
                  <strong><code>vi.fn()</code>:</strong> Crea una función falsa desde cero. Ideal para inyectar interfaces.
                </li>
                <li>
                  <strong><code>vi.spyOn(obj, "metodo")</code>:</strong> Espía un método real existente sin romperlo (o sobrescribiéndolo temporalmente).
                </li>
                <li>
                  <strong><code>vi.mock("./ruta")</code>:</strong> Sustituye un módulo importado completo.
                </li>
              </ul>
              <CodeBlock :code="snippets.vitestSpy" @copy="copyTextToClipboard" />
            </div>

            <div
              class="tw:space-y-3 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:dark:border-slate-800 tw:dark:bg-slate-900"
            >
              <h3 class="tw:text-base tw:font-bold">Control del Tiempo (<code>Fake Timers</code>)</h3>
              <p class="tw:text-xs tw:text-slate-600 tw:dark:text-slate-300">
                Nunca esperes segundos reales en un test unitario. Congela el reloj y avanza el tiempo instantáneamente:
              </p>
              <CodeBlock :code="snippets.vitestTimers" @copy="copyTextToClipboard" />
            </div>
          </div>
        </section>

        <!-- ===================================================================== -->
        <!-- PARTE V: PROYECTO PRÁCTICO BASE (EXPLORADOR IDE)                      -->
        <!-- ===================================================================== -->
        <section
          v-show="isSectionVisible('part-5')"
          id="part-5"
          class="manual-section animate-section tw:space-y-6"
          :class="{ 'tw:mb-14': showAllMode }"
        >
          <div class="tw:border-b tw:border-slate-200 tw:pb-4 tw:dark:border-slate-800">
            <span
              class="tw:text-xs tw:font-bold tw:tracking-wider tw:uppercase tw:text-emerald-600 tw:dark:text-emerald-400"
            >Parte V</span>
            <h2 class="tw:mt-1 tw:text-2xl tw:font-bold">
              Proyecto Práctico Base: "Motor de Pedidos"
            </h2>
            <p class="tw:mt-1 tw:text-sm tw:text-slate-600 tw:dark:text-slate-400">
              Explora los 5 archivos completos de producción y tests. Copia cada archivo en tu proyecto y pasa <code>typecheck</code> y <code>test:coverage</code>.
            </p>
          </div>

          <div
            class="tw:overflow-hidden tw:rounded-2xl tw:border tw:border-slate-800 tw:bg-slate-900 tw:shadow-xl"
            data-searchable="tipos.ts calculadoraPrecios.ts procesadorPedidos.ts calculadoraPrecios.test.ts procesadorPedidos.test.ts"
          >
            <div
              id="ide-tabs"
              class="tw:flex tw:items-center tw:gap-1.5 tw:overflow-x-auto tw:border-b tw:border-slate-800 tw:bg-slate-950 tw:px-3 tw:pt-3"
            >
              <button
                v-for="file in ideFiles"
                :key="file.id"
                type="button"
                :data-file="file.id"
                class="ide-tab-btn tw:shrink-0 tw:cursor-pointer tw:rounded-t-xl tw:px-3.5 tw:py-2 tw:font-cm-mono tw:text-xs"
                :class="
                  activeIdeId === file.id
                    ? 'tw:border-x tw:border-t tw:border-slate-800 tw:bg-slate-900 tw:font-semibold tw:text-cyan-400'
                    : file.isTest
                      ? 'tw:font-medium tw:text-emerald-400/80 tw:hover:text-emerald-300'
                      : 'tw:font-medium tw:text-slate-400 tw:hover:text-slate-200'
                "
                @click="activeIdeId = file.id"
              >
                {{ file.label }}
              </button>
            </div>

            <div class="tw:p-4 tw:sm:p-5">
              <div
                v-for="file in ideFiles"
                v-show="activeIdeId === file.id"
                :id="`file-${file.id}`"
                :key="file.id"
              >
                <CodeBlock :code="file.code" @copy="copyTextToClipboard" />
              </div>
            </div>
          </div>
        </section>

        <!-- ===================================================================== -->
        <!-- PARTE VI: 5 RETOS PRÁCTICOS PROGRESIVOS                               -->
        <!-- ===================================================================== -->
        <section
          v-show="isSectionVisible('part-6')"
          id="part-6"
          class="manual-section animate-section tw:space-y-6"
          :class="{ 'tw:mb-14': showAllMode }"
        >
          <div class="tw:border-b tw:border-slate-200 tw:pb-4 tw:dark:border-slate-800">
            <span
              class="tw:text-xs tw:font-bold tw:tracking-wider tw:uppercase tw:text-amber-600 tw:dark:text-amber-400"
            >Parte VI</span>
            <h2 class="tw:mt-1 tw:text-2xl tw:font-bold">
              5 Retos Prácticos para Resolver por Cuenta Propia
            </h2>
            <p class="tw:mt-1 tw:text-sm tw:text-slate-600 tw:dark:text-slate-400">
              Implementa cada reto sobre el proyecto base sin usar <code>any</code> y manteniendo &gt;90% de cobertura. Marca cada reto al completarlo.
            </p>
          </div>

          <div id="challenges-container" class="tw:space-y-4">
            <div
              v-for="ch in challenges"
              :key="ch.id"
              class="tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:shadow-xs tw:dark:border-slate-800 tw:dark:bg-slate-900"
              :data-searchable="ch.searchable"
            >
              <div class="tw:mb-3 tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-3">
                <div>
                  <span
                    class="tw:rounded-md tw:px-2.5 tw:py-0.5 tw:text-xs tw:font-bold"
                    :class="{
                      'tw:bg-indigo-500/10 tw:text-indigo-600 tw:dark:text-indigo-400':
                        ch.badgeColor === 'indigo',
                      'tw:bg-amber-500/10 tw:text-amber-600 tw:dark:text-amber-400':
                        ch.badgeColor === 'amber',
                      'tw:bg-emerald-500/10 tw:text-emerald-600 tw:dark:text-emerald-400':
                        ch.badgeColor === 'emerald',
                    }"
                  >{{ ch.badge }}</span>
                  <h3 class="tw:mt-1 tw:text-lg tw:font-bold">{{ ch.title }}</h3>
                </div>
                <label
                  class="tw:inline-flex tw:cursor-pointer tw:items-center tw:gap-2 tw: rounded-xl tw:bg-slate-100 tw:px-3.5 tw:py-2 tw:transition tw:select-none tw:hover:bg-emerald-500/10 tw:dark:bg-slate-800"
                >
                  <input
                    type="checkbox"
                    :data-progress-id="ch.id"
                    :checked="Boolean(progressState[ch.id])"
                    class="progress-checkbox tw:h-4 tw:w-4 tw:rounded tw:accent-emerald-500"
                    @change="toggleMilestone(ch.id, $event.target.checked)"
                  >
                  <span class="tw:text-xs tw:font-semibold">Completado</span>
                </label>
              </div>
              <ul
                class="tw:mb-4 tw:list-disc tw:space-y-1.5 tw:pl-5 tw:text-sm tw:text-slate-600 tw:dark:text-slate-300"
              >
                <li v-for="(item, idx) in ch.items" :key="idx" v-html="item" />
              </ul>
              <details
                class="tw:group tw:rounded-xl tw:border tw:border-slate-200/80 tw:bg-slate-50 tw:p-3.5 tw:dark:border-slate-800 tw:dark:bg-slate-950/60"
              >
                <summary
                  class="tw:cursor-pointer tw:text-xs tw:font-semibold tw:text-indigo-600 tw:select-none tw:dark:text-indigo-400"
                >
                  {{ ch.hintLabel }}
                </summary>
                <p
                  class="tw:mt-2 tw:text-xs tw:text-slate-600 tw:dark:text-slate-400"
                  v-html="ch.hintHtml"
                />
              </details>
            </div>
          </div>
        </section>

        <!-- ===================================================================== -->
        <!-- PARTE VII: CHECKLIST FINAL DE CALIDAD ("DEFINITION OF DONE")          -->
        <!-- ===================================================================== -->
        <section
          v-show="isSectionVisible('part-7')"
          id="part-7"
          class="manual-section animate-section tw:space-y-6"
        >
          <div class="tw:border-b tw:border-slate-200 tw:pb-4 tw:dark:border-slate-800">
            <span
              class="tw:text-xs tw:font-bold tw:tracking-wider tw:uppercase tw:text-cyan-600 tw:dark:text-cyan-400"
            >Parte VII</span>
            <h2 class="tw:mt-1 tw:text-2xl tw:font-bold">
              Checklist Final de Calidad ("Definition of Done")
            </h2>
            <p class="tw:mt-1 tw:text-sm tw:text-slate-600 tw:dark:text-slate-400">
              Verifica estos 6 puntos antes de dar por cerrada cualquier Pull Request o tarea en producción.
            </p>
          </div>

          <div
            class="tw:space-y-3 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-6 tw:dark:border-slate-800 tw:dark:bg-slate-900"
            data-searchable="Checklist Definition of Done any ts-ignore aserciones mocks typecheck coverage"
          >
            <label
              v-for="item in qualityChecklist"
              :key="item.id"
              class="tw:flex tw:cursor-pointer tw:items-start tw:gap-3.5 tw:rounded-xl tw:border tw:border-slate-200/70 tw:bg-slate-50 tw:p-3.5 tw:transition tw:hover:border-indigo-500/40 tw:dark:border-slate-800 tw:dark:bg-slate-950/60"
            >
              <input
                type="checkbox"
                :data-progress-id="item.id"
                :checked="Boolean(progressState[item.id])"
                class="progress-checkbox tw:mt-0.5 tw:h-4 tw:w-4 tw:shrink-0 tw:rounded tw:accent-indigo-600"
                @change="toggleMilestone(item.id, $event.target.checked)"
              >
              <div>
                <span class="tw:block tw:text-sm tw:font-bold" v-html="item.titleHtml" />
                <span
                  class="tw:text-xs tw:text-slate-500 tw:dark:text-slate-400"
                  v-html="item.descHtml"
                />
              </div>
            </label>
          </div>
        </section>

        <!-- Navegación inferior Anterior / Siguiente entre módulos -->
        <div
          v-show="!showAllMode"
          id="bottom-pagination"
          class="tw:mt-10 tw:flex tw:items-center tw:justify-between tw:gap-4 tw:border-t tw:border-slate-200 tw:pt-6 tw:dark:border-slate-800"
        >
          <button
            id="prev-part-btn"
            type="button"
            :disabled="currentPartIndex === 0"
            class="tw:flex tw:cursor-pointer tw:items-center tw:gap-2 tw:rounded-xl tw:border tw:border-slate-200 tw:bg-white tw:px-4 tw:py-2.5 tw:text-xs tw:font-semibold tw:transition tw:hover:bg-slate-100 tw:disabled:pointer-events-none tw:disabled:opacity-40 tw:sm:text-sm tw:dark:border-slate-800 tw:dark:bg-slate-900 tw:dark:hover:bg-slate-800"
            @click="prevPart"
          >
            <span>←</span>
            <span>Módulo Anterior</span>
          </button>
          <span id="current-part-indicator" class="tw:font-cm-mono tw:text-xs tw:text-slate-500">{{
            currentPartLabel
          }}</span>
          <button
            id="next-part-btn"
            type="button"
            :disabled="currentPartIndex === navParts.length - 1"
            class="tw:flex tw:cursor-pointer tw:items-center tw:gap-2 tw:rounded-xl tw:bg-indigo-600 tw:px-4 tw:py-2.5 tw:text-xs tw:font-semibold tw:text-white tw:shadow-md tw:shadow-indigo-600/20 tw:transition tw:hover:bg-indigo-500 tw:disabled:pointer-events-none tw:disabled:opacity-40 tw:sm:text-sm"
            @click="nextPart"
          >
            <span>Siguiente Módulo</span>
            <span>→</span>
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
/* Reset base tipo Tailwind Preflight exclusivo para este módulo */
html.mod-ts-vitest h1,
html.mod-ts-vitest h2,
html.mod-ts-vitest h3,
html.mod-ts-vitest h4,
html.mod-ts-vitest p,
html.mod-ts-vitest pre {
  margin: 0;
}
html.mod-ts-vitest ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
html.mod-ts-vitest ul.tw\:list-disc {
  list-style-type: disc;
  padding-left: 1.25rem;
}
html.mod-ts-vitest a {
  text-decoration: none;
}

/* Scrollbar personalizado del manual original */
html.mod-ts-vitest ::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
html.mod-ts-vitest ::-webkit-scrollbar-track {
  background: transparent;
}
html.mod-ts-vitest ::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.35);
  border-radius: 9999px;
}
html.mod-ts-vitest ::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.55);
}

/* Resaltado de sintaxis tipo IDE */
html.mod-ts-vitest .tok-comment {
  color: #64748b;
  font-style: italic;
}
html.mod-ts-vitest .tok-string {
  color: #34d399;
}
html.mod-ts-vitest .tok-keyword {
  color: #c084fc;
  font-weight: 500;
}
html.mod-ts-vitest .tok-type {
  color: #38bdf8;
}
html.mod-ts-vitest .tok-number {
  color: #fbbf24;
}

/* Animación suave de entrada de sección */
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
html.mod-ts-vitest .animate-section {
  animation: fadeSlideIn 0.25s ease-out forwards;
}

/* Resaltado temporal al buscar */
html.mod-ts-vitest .search-pulse {
  outline: 2px solid #6366f1;
  outline-offset: 4px;
  border-radius: 0.75rem;
  transition: outline 0.3s ease;
}
</style>
