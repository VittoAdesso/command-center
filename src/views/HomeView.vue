<script setup>
import { ref, onMounted } from 'vue'
import { usePageEnv } from '../composables/usePageEnv'
import { homeCards } from '../data/homeCards'
import HomeCard from '../components/HomeCard.vue'

const FAVICON =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📡</text></svg>"

usePageEnv({
  title: 'Centro de Mando — Índice',
  htmlClass: ['tw:scroll-smooth'],
  bodyClass: [
    'tw-page',
    'theme-cm',
    'tw:m-0',
    'tw:min-h-screen',
    'tw:bg-cm-bg',
    'tw:text-cm-text',
    'tw:font-cm-body',
    'tw:text-[16px]',
    'tw:leading-[1.6]',
    'tw:antialiased',
    'tw:[transition:background_.25s,color_.25s]',
  ],
  bodyAttrs: { 'data-theme': 'dark' },
  favicon: FAVICON,
})

const theme = ref('dark')

onMounted(() => {
  const saved = localStorage.getItem('cm-index-theme') || 'dark'
  theme.value = saved
  document.body.setAttribute('data-theme', saved)
})

function toggleTheme() {
  const next = theme.value === 'dark' ? 'light' : 'dark'
  theme.value = next
  document.body.setAttribute('data-theme', next)
  localStorage.setItem('cm-index-theme', next)
}
</script>

<template>
  <!-- Topbar -->
  <div
    class="tw:sticky tw:top-0 tw:z-30 tw:flex tw:max-w-full tw:items-center tw:justify-between tw:border-b tw:border-cm-border-soft tw:px-6 tw:py-[14px] tw:backdrop-blur-[12px] tw:[background:color-mix(in_srgb,var(--cm-bg)_88%,transparent)]"
  >
    <div class="tw:font-cm-display tw:text-[18px] tw:font-bold tw:text-cm-text">
      📡 Centro de Mando
      <span
        class="tw:ml-2 tw:rounded-[99px] tw:border tw:border-cm-border-soft tw:px-[7px] tw:py-[2px] tw:align-middle tw:font-cm-mono tw:text-[10px] tw:tracking-[0.04em] tw:text-cm-faint"
      >TECH-LAB</span>
    </div>
    <button
      id="themeToggle"
      type="button"
      aria-label="Cambiar tema"
      class="tw:flex tw:h-[38px] tw:w-[38px] tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-[99px] tw:border tw:border-cm-border-soft tw:bg-cm-card tw:text-[16px] tw:text-cm-text tw:[transition:transform_.15s,border-color_.15s] tw:hover:scale-[1.06] tw:hover:border-cm-accent"
      @click="toggleTheme"
    >
      {{ theme === 'dark' ? '🌙' : '☀️' }}
    </button>
  </div>

  <div class="tw:mx-auto tw:max-w-[900px] tw:px-6">
    <!-- Hero -->
    <div class="tw:pt-16 tw:pb-12 tw:text-center tw:max-[640px]:pt-11 tw:max-[640px]:pb-8">
      <span class="tw:mb-4 tw:block tw:text-[52px]">📡</span>
      <h1
        class="tw:m-0 tw:mb-3 tw:font-cm-display tw:text-[clamp(36px,6vw,58px)] tw:leading-[1.1] tw:tracking-[-0.01em] tw:max-[640px]:text-[36px]"
      >
        Centro de <span class="tw:text-cm-accent">Mando</span>
      </h1>
      <p class="tw:mx-auto tw:mt-0 tw:mb-8 tw:max-w-[500px] tw:text-[17px] tw:text-cm-dim">
        Sistema de aprendizaje personal del DSI - IA &amp; Automatización. Elige el tema que necesitas — cada guía abre en
        su propio módulo.
      </p>
      <span
        class="tw:inline-flex tw:items-center tw:gap-2 tw:rounded-[99px] tw:border tw:border-cm-border-soft tw:bg-cm-elev tw:px-[14px] tw:py-[7px] tw:font-cm-mono tw:text-[11.5px] tw:text-cm-faint"
      >
        <span class="tw:h-[5px] tw:w-[5px] tw:rounded-full tw:bg-cm-teal" />Aprendizaje variado e interactivo
      </span>
    </div>

    <!-- Cards grid -->
    <div
      class="tw:grid tw:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] tw:gap-4 tw:pt-12 tw:pb-16 tw:max-[640px]:grid-cols-1 tw:max-[640px]:gap-3"
    >
      <HomeCard v-for="card in homeCards" :key="card.id" :card="card" />
    </div>

    <!-- Footer note -->
    <div class="tw:pb-12 tw:text-center">
      <p class="tw:mt-0 tw:mb-4 tw:text-[13px] tw:text-cm-faint">
        ✓ Proyecto modular unificado — todas las guías y rutas están integradas en esta aplicación.
      </p>
      <div
        class="tw:inline-block tw:max-w-[480px] tw:rounded-[10px] tw:border tw:border-cm-border-soft tw:bg-cm-elev tw:px-6 tw:py-4 tw:text-left tw:font-cm-mono tw:text-[13px] tw:text-cm-dim"
      >
        <div
          class="tw:mb-2.5 tw:text-[11px] tw:tracking-[0.06em] tw:uppercase tw:text-cm-faint"
        >
          Módulos incluidos ({{ homeCards.length }})
        </div>
        <div class="tw:font-semibold tw:text-cm-accent">📁 Command-Center/</div>
        <div class="tw:mt-1.5 tw:grid tw:gap-1 tw:pl-4">
          <span>
            <span class="tw:text-cm-teal">✓</span> _Centro_de_Mando.html
            <span class="tw:text-cm-faint">← inicio (/)</span>
          </span>
          <span v-for="card in homeCards" :key="card.id">
            <span class="tw:text-cm-teal">✓</span> {{ card.legacyHref }}
            <span class="tw:text-cm-faint">→ {{ card.to }}</span>
          </span>
        </div>
        <div
          class="tw:mt-3 tw:border-t tw:border-cm-border-soft tw:pt-2.5 tw:text-[11.5px] tw:text-cm-faint"
        >
          <span class="tw:text-cm-teal">✓</span> Navegación directa por ruta · Listo para desplegar en Vercel
        </div>
      </div>
    </div>
  </div>
</template>
