<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePageEnv } from '../composables/usePageEnv'
import { homeCards, categories } from '../data/homeCards'
import HomeCard from '../components/HomeCard.vue'

const FAVICON =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📡</text></svg>"

usePageEnv({
  title: 'Centro de Mando — Hub de Aprendizaje & Soluciones',
  htmlClass: ['tw:scroll-smooth'],
  bodyClass: [
    'tw-page',
    'theme-cm',
    'tw:m-0',
    'tw:min-h-screen',
    'tw:bg-cm-bg',
    'tw:text-cm-text',
    'tw:font-cm-body',
    'tw:text-[15px]',
    'tw:leading-[1.6]',
    'tw:antialiased',
    'tw:[transition:background_.25s,color_.25s]',
  ],
  bodyAttrs: { 'data-theme': 'dark' },
  favicon: FAVICON,
})

const theme = ref('dark')
const activeCategory = ref('all')
const searchQuery = ref('')
const showDirectory = ref(false)
const searchInputRef = ref(null)

onMounted(() => {
  const saved = localStorage.getItem('cm-index-theme') || 'dark'
  theme.value = saved
  document.body.setAttribute('data-theme', saved)

  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})

function handleGlobalKeydown(e) {
  if (e.key === '/' && document.activeElement !== searchInputRef.value && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
    e.preventDefault()
    searchInputRef.value?.focus()
  }
}

function toggleTheme() {
  const next = theme.value === 'dark' ? 'light' : 'dark'
  theme.value = next
  document.body.setAttribute('data-theme', next)
  localStorage.setItem('cm-index-theme', next)
}

function setCategory(catId) {
  activeCategory.value = catId
}

function resetFilters() {
  activeCategory.value = 'all'
  searchQuery.value = ''
  searchInputRef.value?.focus()
}

// Filtro en vivo por categoría y texto
const filteredCards = computed(() => {
  let list = homeCards

  // Filtro de categoría
  if (activeCategory.value !== 'all') {
    list = list.filter((c) => c.category === activeCategory.value)
  }

  // Filtro de búsqueda
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter((c) => {
      const matchTitle = c.title.toLowerCase().includes(q)
      const matchDesc = c.description.toLowerCase().includes(q)
      const matchTags = c.tags?.some((t) => t.toLowerCase().includes(q))
      const matchBadge = c.badge?.toLowerCase().includes(q)
      const matchNum = c.num.toLowerCase().includes(q)
      const matchLegacy = c.legacyHref?.toLowerCase().includes(q)
      return matchTitle || matchDesc || matchTags || matchBadge || matchNum || matchLegacy
    })
  }

  return list
})

// Conteo por categoría
const categoryCounts = computed(() => {
  const map = { all: homeCards.length }
  for (const c of homeCards) {
    map[c.category] = (map[c.category] || 0) + 1
  }
  return map
})
</script>

<template>
  <div class="tw:relative tw:min-h-screen tw:bg-cm-bg tw:text-cm-text">
    <!-- Ambient Background Glow & Tech Grid -->
    <div
      class="tw:pointer-events-none tw:absolute tw:inset-x-0 tw:top-0 tw:h-[620px] tw:overflow-hidden tw:opacity-40"
      aria-hidden="true"
    >
      <div
        class="tw:absolute tw:-top-[240px] tw:left-1/2 tw:h-[580px] tw:w-[980px] tw:-translate-x-1/2 tw:rounded-full tw:bg-gradient-to-tr tw:from-indigo-600/30 tw:via-cyan-500/20 tw:to-purple-600/20 tw:blur-[110px]"
      />
      <div
        class="tw:absolute tw:inset-0 tw:[background-size:32px_32px] tw:[background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]"
      />
    </div>

    <!-- Top Navigation Bar -->
    <header
      class="tw:sticky tw:top-0 tw:z-40 tw:border-b tw:border-cm-border-soft tw:backdrop-blur-xl tw:[background:color-mix(in_srgb,var(--cm-bg)_82%,transparent)]"
    >
      <div class="tw:mx-auto tw:flex tw:max-w-7xl tw:items-center tw:justify-between tw:px-4 tw:py-3.5 sm:tw:px-6">
        <!-- Logo & Branding -->
        <div class="tw:flex tw:items-center tw:gap-3">
          <div
            class="tw:flex tw:h-9 tw:w-9 tw:items-center tw:justify-center tw:rounded-xl tw:border tw:border-cm-border tw:bg-cm-elev tw:text-lg tw:shadow-sm"
          >
            📡
          </div>
          <div>
            <div class="tw:flex tw:items-center tw:gap-2">
              <span class="tw:font-cm-display tw:text-base tw:font-extrabold tw:tracking-tight tw:text-cm-text sm:tw:text-lg">
                Centro de Mando
              </span>
              <span
                class="tw:inline-flex tw:items-center tw:gap-1 tw:rounded-full tw:border tw:border-emerald-500/30 tw:bg-emerald-500/10 tw:px-2 tw:py-0.5 tw:font-cm-mono tw:text-[10px] tw:font-semibold tw:text-emerald-400"
              >
                <span class="tw:h-1.5 tw:w-1.5 tw:animate-pulse tw:rounded-full tw:bg-emerald-400" />
                ONLINE
              </span>
            </div>
            <p class="tw:m-0 tw:hidden tw:font-cm-mono tw:text-[10px] tw:text-cm-faint sm:tw:block">
              DSI · HUB TÉCNICO DE IA & AUTOMATIZACIÓN
            </p>
          </div>
        </div>

        <!-- Header Actions -->
        <div class="tw:flex tw:items-center tw:gap-3">
          <!-- Total Guides Pill -->
          <div
            class="tw:hidden tw:items-center tw:gap-1.5 tw:rounded-lg tw:border tw:border-cm-border-soft tw:bg-cm-elev tw:px-3 tw:py-1.5 tw:font-cm-mono tw:text-xs tw:text-cm-dim md:tw:flex"
          >
            <span class="tw:text-cm-accent">⚡</span>
            <span><strong>{{ homeCards.length }}</strong> Guías Disponibles</span>
          </div>

          <!-- Theme Switcher -->
          <button
            id="themeToggle"
            type="button"
            :aria-label="theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            class="tw:flex tw:h-9 tw:w-9 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-xl tw:border tw:border-cm-border-soft tw:bg-cm-card tw:text-base tw:text-cm-text tw:shadow-sm tw:transition-all tw:duration-200 hover:tw:scale-105 hover:tw:border-cm-accent hover:tw:bg-cm-elev active:tw:scale-95"
            @click="toggleTheme"
          >
            <span aria-hidden="true">{{ theme === 'dark' ? '🌙' : '☀️' }}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Container -->
    <main class="tw:relative tw:mx-auto tw:max-w-7xl tw:px-4 tw:py-10 sm:tw:px-6 sm:tw:py-14">
      <!-- Hero Section -->
      <section class="tw:mx-auto tw:max-w-3xl tw:text-center">
        <!-- Top Pill -->
        <div class="tw:mb-5 tw:inline-flex tw:items-center tw:gap-2 tw:rounded-full tw:border tw:border-cm-border tw:bg-cm-elev/80 tw:px-3.5 tw:py-1 tw:shadow-sm">
          <span class="tw:flex tw:h-2 tw:w-2 tw:rounded-full tw:bg-indigo-400" />
          <span class="tw:font-cm-mono tw:text-xs tw:font-medium tw:text-cm-dim">
            Ecosistema de Formación Técnica &amp; Arquitectura
          </span>
        </div>

        <!-- Main Title with high-tech gradient -->
        <h1
          class="tw:m-0 tw:mb-4 tw:font-cm-display tw:text-4xl tw:font-extrabold tw:tracking-tight sm:tw:text-5xl lg:tw:text-6xl"
        >
          Centro de
          <span
            class="tw:bg-gradient-to-r tw:from-indigo-400 tw:via-cyan-400 tw:to-teal-400 tw:bg-clip-text tw:text-transparent"
          >
            Mando
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="tw:mx-auto tw:mt-0 tw:mb-8 tw:max-w-2xl tw:text-base tw:leading-relaxed tw:text-cm-dim sm:tw:text-lg">
          Accede al repositorio integral de guías interactivas, rutas oficiales de certificación, patrones cloud y
          manuales de automatización para perfiles técnicos.
        </p>

        <!-- Stats Chips Row -->
        <div class="tw:mb-10 tw:grid tw:grid-cols-2 tw:gap-2.5 sm:tw:grid-cols-4 sm:tw:gap-3">
          <div class="tw:rounded-xl tw:border tw:border-cm-border-soft tw:bg-cm-card/70 tw:p-3 tw:backdrop-blur-sm">
            <div class="tw:font-cm-display tw:text-xl tw:font-bold tw:text-cm-text">18</div>
            <div class="tw:font-cm-mono tw:text-[11px] tw:text-cm-faint">Guías Especializadas</div>
          </div>
          <div class="tw:rounded-xl tw:border tw:border-cm-border-soft tw:bg-cm-card/70 tw:p-3 tw:backdrop-blur-sm">
            <div class="tw:font-cm-display tw:text-xl tw:font-bold tw:text-cm-text">100+</div>
            <div class="tw:font-cm-mono tw:text-[11px] tw:text-cm-faint">Módulos &amp; Retos</div>
          </div>
          <div class="tw:rounded-xl tw:border tw:border-cm-border-soft tw:bg-cm-card/70 tw:p-3 tw:backdrop-blur-sm">
            <div class="tw:font-cm-display tw:text-xl tw:font-bold tw:text-cm-text">4 Áreas</div>
            <div class="tw:font-cm-mono tw:text-[11px] tw:text-cm-faint">Especialización Tech</div>
          </div>
          <div class="tw:rounded-xl tw:border tw:border-cm-border-soft tw:bg-cm-card/70 tw:p-3 tw:backdrop-blur-sm">
            <div class="tw:font-cm-display tw:text-xl tw:font-bold tw:text-cm-text">100%</div>
            <div class="tw:font-cm-mono tw:text-[11px] tw:text-cm-faint">Interactivo y Modular</div>
          </div>
        </div>
      </section>

      <!-- Live Search & Category Toolbar -->
      <section class="tw:mb-10 tw:space-y-4">
        <!-- Search Input Bar -->
        <div class="tw:relative tw:mx-auto tw:max-w-2xl">
          <div class="tw:pointer-events-none tw:absolute tw:inset-y-0 tw:left-0 tw:flex tw:items-center tw:pl-4 tw:text-cm-faint">
            <svg class="tw:h-5 tw:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            type="search"
            placeholder="Buscar por tecnología, título o concepto (ej. Dataverse, Copilot, DAX, SAP)..."
            class="tw:w-full tw:rounded-2xl tw:border tw:border-cm-border-soft tw:bg-cm-card tw:py-3.5 tw:pr-20 tw:pl-11 tw:font-cm-body tw:text-[14.5px] tw:text-cm-text tw:shadow-sm tw:backdrop-blur-md tw:transition-all tw:placeholder:text-cm-faint focus:tw:border-cm-accent focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-cm-accent-soft"
          >
          <div class="tw:absolute tw:inset-y-0 tw:right-0 tw:flex tw:items-center tw:pr-3 tw:gap-1.5">
            <button
              v-if="searchQuery"
              type="button"
              aria-label="Limpiar búsqueda"
              class="tw:flex tw:h-6 tw:w-6 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-full tw:bg-cm-elev tw:text-xs tw:text-cm-dim hover:tw:text-cm-text"
              @click="searchQuery = ''"
            >
              ✕
            </button>
            <kbd
              class="tw:hidden tw:rounded tw:border tw:border-cm-border-soft tw:bg-cm-elev tw:px-1.5 tw:py-0.5 tw:font-cm-mono tw:text-[11px] tw:text-cm-faint sm:tw:inline-block"
            >
              /
            </kbd>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="tw:flex tw:flex-wrap tw:items-center tw:justify-center tw:gap-2 tw:pt-1">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            :class="[
              'tw:inline-flex tw:cursor-pointer tw:items-center tw:gap-2 tw:rounded-xl tw:px-3.5 tw:py-2 tw:font-cm-mono tw:text-xs tw:font-semibold tw:transition-all tw:duration-200',
              activeCategory === cat.id
                ? 'tw:border tw:border-cm-accent tw:bg-cm-accent-soft tw:text-cm-text tw:shadow-sm'
                : 'tw:border tw:border-cm-border-soft tw:bg-cm-card tw:text-cm-dim hover:tw:border-cm-border hover:tw:text-cm-text hover:tw:bg-cm-elev',
            ]"
            @click="setCategory(cat.id)"
          >
            <span>{{ cat.icon }}</span>
            <span>{{ cat.label }}</span>
            <span
              :class="[
                'tw:rounded-md tw:px-1.5 tw:py-0.5 tw:text-[10px]',
                activeCategory === cat.id
                  ? 'tw:bg-cm-accent/20 tw:text-cm-text'
                  : 'tw:bg-cm-elev tw:text-cm-faint',
              ]"
            >
              {{ categoryCounts[cat.id] || 0 }}
            </span>
          </button>
        </div>

        <!-- Results Counter & Clear Action -->
        <div class="tw:flex tw:items-center tw:justify-between tw:px-2 tw:font-cm-mono tw:text-xs tw:text-cm-faint">
          <div>
            Mostrando
            <strong class="tw:text-cm-text">{{ filteredCards.length }}</strong> de {{ homeCards.length }} guías
            <span v-if="searchQuery"> para "{{ searchQuery }}"</span>
          </div>
          <button
            v-if="searchQuery || activeCategory !== 'all'"
            type="button"
            class="tw:cursor-pointer tw:text-cm-accent hover:tw:underline"
            @click="resetFilters"
          >
            Restablecer filtros
          </button>
        </div>
      </section>

      <!-- Empty State -->
      <div
        v-if="filteredCards.length === 0"
        class="tw:mx-auto tw:max-w-md tw:rounded-2xl tw:border tw:border-cm-border-soft tw:bg-cm-card tw:p-10 tw:text-center"
      >
        <span class="tw:mb-3 tw:block tw:text-4xl">🔍</span>
        <h3 class="tw:m-0 tw:mb-2 tw:font-cm-display tw:text-lg tw:font-bold tw:text-cm-text">
          No se encontraron guías
        </h3>
        <p class="tw:mt-0 tw:mb-5 tw:text-xs tw:leading-relaxed tw:text-cm-dim">
          No hay guías que coincidan con "{{ searchQuery }}" en la categoría seleccionada. Prueba con otro término.
        </p>
        <button
          type="button"
          class="tw:inline-flex tw:cursor-pointer tw:items-center tw:gap-1.5 tw:rounded-xl tw:border tw:border-cm-accent tw:bg-cm-accent-soft tw:px-4 tw:py-2 tw:font-cm-mono tw:text-xs tw:font-semibold tw:text-cm-text hover:tw:bg-cm-accent hover:tw:text-white"
          @click="resetFilters"
        >
          Limpiar búsqueda y filtros
        </button>
      </div>

      <!-- Cards Grid -->
      <div
        v-else
        class="tw:grid tw:grid-cols-1 tw:gap-5 sm:tw:grid-cols-2 lg:tw:grid-cols-3 xl:tw:grid-cols-3"
      >
        <HomeCard v-for="card in filteredCards" :key="card.id" :card="card" />
      </div>

      <!-- Architectural System Directory Section -->
      <section class="tw:mt-20 tw:border-t tw:border-cm-border-soft tw:pt-12">
        <div class="tw:mx-auto tw:max-w-4xl">
          <!-- Directory Card Header -->
          <div
            class="tw:flex tw:flex-col tw:items-start tw:justify-between tw:gap-4 tw:rounded-2xl tw:border tw:border-cm-border-soft tw:bg-cm-elev/60 tw:p-5 tw:backdrop-blur-sm sm:tw:flex-row sm:tw:items-center"
          >
            <div>
              <div class="tw:flex tw:items-center tw:gap-2">
                <span class="tw:font-cm-display tw:text-sm tw:font-bold tw:text-cm-text">
                  Directorio del Sistema &amp; Mapeo de Rutas
                </span>
                <span
                  class="tw:rounded-md tw:border tw:border-cm-border-soft tw:bg-cm-card tw:px-2 tw:py-0.5 tw:font-cm-mono tw:text-[10px] tw:text-cm-dim"
                >
                  {{ homeCards.length }} Rutas SPA
                </span>
              </div>
              <p class="tw:m-0 tw:mt-1 tw:text-xs tw:text-cm-dim">
                Todos los módulos y guías originales integrados con navegación SPA sin recarga y listos para producción.
              </p>
            </div>

            <button
              type="button"
              class="tw:inline-flex tw:cursor-pointer tw:items-center tw:gap-1.5 tw:rounded-xl tw:border tw:border-cm-border-soft tw:bg-cm-card tw:px-3.5 tw:py-2 tw:font-cm-mono tw:text-xs tw:font-semibold tw:text-cm-text tw:transition-colors hover:tw:border-cm-accent hover:tw:bg-cm-elev"
              @click="showDirectory = !showDirectory"
            >
              <span>{{ showDirectory ? 'Ocultar directorio' : 'Explorar directorio de rutas' }}</span>
              <span>{{ showDirectory ? '▲' : '▼' }}</span>
            </button>
          </div>

          <!-- Expanded Directory Table / List -->
          <div
            v-if="showDirectory"
            class="tw:mt-4 tw:overflow-hidden tw:rounded-2xl tw:border tw:border-cm-border-soft tw:bg-cm-card tw:shadow-lg"
          >
            <div class="tw:border-b tw:border-cm-border-soft tw:bg-cm-elev tw:px-4 tw:py-3 tw:font-cm-mono tw:text-[11px] tw:font-semibold tw:text-cm-faint">
              MAPEO DE ARCHIVOS ORIGINALES → RUTAS SPA ACTIVAS
            </div>
            <div class="tw:max-h-96 tw:overflow-y-auto tw:divide-y tw:divide-cm-border-soft">
              <div
                v-for="card in homeCards"
                :key="card.id"
                class="tw:flex tw:items-center tw:justify-between tw:px-4 tw:py-2.5 tw:font-cm-mono tw:text-xs hover:tw:bg-cm-elev/50"
              >
                <div class="tw:flex tw:items-center tw:gap-2.5 tw:truncate">
                  <span class="tw:text-base">{{ card.icon }}</span>
                  <span class="tw:font-semibold tw:text-cm-text tw:truncate">{{ card.title }}</span>
                  <span class="tw:text-cm-faint tw:hidden md:tw:inline">({{ card.legacyHref }})</span>
                </div>
                <div class="tw:flex tw:items-center tw:gap-3 tw:shrink-0">
                  <span class="tw:rounded tw:bg-cm-elev tw:px-2 tw:py-0.5 tw:text-[11px] tw:text-cm-accent">
                    {{ card.to }}
                  </span>
                  <RouterLink
                    :to="card.to"
                    class="tw:text-cm-dim hover:tw:text-cm-text hover:tw:underline"
                  >
                    Entrar →
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Clean Footer -->
      <footer class="tw:mt-16 tw:pb-8 tw:text-center tw:font-cm-mono tw:text-xs tw:text-cm-faint">
        <p class="tw:m-0">
          Centro de Mando · DSI IA &amp; Automatización · Sistema Modular Unificado
        </p>
      </footer>
    </main>
  </div>
</template>
