<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { usePageEnv } from '../../composables/usePageEnv'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  storageKey: { type: String, required: true },
  modules: { type: Array, required: true },
  resourcesHeading: { type: String, default: 'Recursos oficiales' },
})

usePageEnv({
  title: props.title,
  bodyClass: [
    'tw-page',
    'theme-ruta',
    'tw:m-0',
    'tw:min-h-screen',
    'tw:bg-ruta-bg',
    'tw:text-ruta-ink',
    'tw:font-segoe',
    'tw:text-[16px]',
    'tw:leading-[1.6]',
  ],
})

const levels = ['todos', 'Básico', 'Intermedio', 'Avanzado']
const activeLevel = ref('todos')

// Estado persistido en localStorage con el mismo formato {"d0":true,...} que el original
const savedState = reactive({})
// Estado de las preguntas de autoevaluación por módulo: { [mIdx]: { chosen: { [oIdx]: 'ok'|'no' }, locked: bool } }
const quizState = reactive({})

onMounted(() => {
  try {
    const raw = JSON.parse(localStorage.getItem(props.storageKey) || '{}')
    Object.assign(savedState, raw)
  } catch {
    // igual que el original: ignora errores de JSON/localStorage
  }
})

function save() {
  try {
    localStorage.setItem(props.storageKey, JSON.stringify(savedState))
  } catch {
    // igual que el original
  }
}

function toggleDone(index, checked) {
  savedState['d' + index] = checked
  save()
}

const pct = computed(() => {
  if (!props.modules.length) return 0
  let n = 0
  props.modules.forEach((_, i) => {
    if (savedState['d' + i]) n++
  })
  return Math.round((n / props.modules.length) * 100)
})

function answerQuiz(mIdx, oIdx) {
  if (!quizState[mIdx]) {
    quizState[mIdx] = { chosen: {}, locked: false }
  }
  if (quizState[mIdx].locked) return
  const ok = oIdx === props.modules[mIdx].q[2]
  quizState[mIdx].chosen[oIdx] = ok ? 'ok' : 'no'
  if (ok) {
    quizState[mIdx].locked = true
  }
}
</script>

<template>
  <div class="ruta-scope">
    <header class="tw:mx-auto tw:max-w-[860px] tw:p-[28px_20px_12px]">
      <h1 class="tw:m-0 tw:mb-1.5 tw:text-[1.9rem] tw:leading-[1.2] tw:font-bold">
        {{ title }}
      </h1>
      <p class="tw:m-0 tw:mb-[14px] tw:max-w-[62ch] tw:text-ruta-mut">
        {{ subtitle }}
      </p>
    </header>

    <div
      class="tw:sticky tw:top-0 tw:z-5 tw:border-b tw:border-ruta-line tw:bg-ruta-bg tw:px-5 tw:py-2.5"
    >
      <div
        class="tw:mx-auto tw:flex tw:max-w-[860px] tw:flex-wrap tw:items-center tw:gap-[14px]"
      >
        <span id="pct">{{ pct }} %</span>
        <div
          class="tw:h-2 tw:min-w-[140px] tw:flex-1 tw:overflow-hidden tw:rounded-[8px] tw:bg-ruta-line"
        >
          <div
            id="fill"
            class="tw:h-full tw:bg-ruta-ok tw:[transition:width_.3s]"
            :style="{ width: pct + '%' }"
          />
        </div>
        <span class="f">
          <button
            v-for="lv in levels"
            :key="lv"
            type="button"
            :data-l="lv"
            :aria-pressed="activeLevel === lv ? 'true' : 'false'"
            class="tw:mr-1 tw:cursor-pointer tw:rounded-[16px] tw:border tw:px-3 tw:py-[5px] tw:text-[0.9rem] tw:[font-family:inherit] tw:focus-visible:outline-2 tw:focus-visible:outline-offset-2 tw:focus-visible:outline-ruta-acc"
            :class="
              activeLevel === lv
                ? 'tw:border-ruta-acc tw:bg-ruta-acc tw:text-white'
                : 'tw:border-ruta-line tw:bg-ruta-card tw:text-ruta-ink'
            "
            @click="activeLevel = lv"
          >
            {{ lv === 'todos' ? 'Todos' : lv }}
          </button>
        </span>
      </div>
    </div>

    <main id="m" class="tw:mx-auto tw:max-w-[860px] tw:p-[16px_20px_60px]">
      <details
        v-for="(x, i) in modules"
        :key="i"
        :data-l="x.l"
        :hidden="activeLevel !== 'todos' && activeLevel !== x.l"
        class="tw:my-3 tw:rounded-[10px] tw:border tw:border-ruta-line tw:bg-ruta-card"
      >
        <summary
          class="tw:flex tw:cursor-pointer tw:items-center tw:gap-2.5 tw:p-[14px_16px] tw:font-semibold tw:focus-visible:outline-2 tw:focus-visible:outline-offset-2 tw:focus-visible:outline-ruta-acc"
        >
          <span :id="'c' + i">{{ savedState['d' + i] ? '✔' : '○' }}</span>
          {{ i }}. {{ x.t }}
          <span class="tw:ml-auto tw:text-[0.85rem] tw:font-normal tw:text-ruta-mut">{{
            x.l
          }}</span>
        </summary>

        <div class="tw:border-t tw:border-ruta-line tw:p-[0_18px_18px]">
          <h3 class="tw:m-[16px_0_6px] tw:text-[1rem] tw:font-bold">Objetivo</h3>
          <p>{{ x.o }}</p>

          <h3 class="tw:m-[16px_0_6px] tw:text-[1rem] tw:font-bold">Temas</h3>
          <ul class="tw:m-0 tw:pl-5">
            <li v-for="(k, kIdx) in x.k" :key="kIdx" v-html="k" />
          </ul>

          <h3 class="tw:m-[16px_0_6px] tw:text-[1rem] tw:font-bold">
            {{ resourcesHeading }}
          </h3>
          <ul class="tw:m-0 tw:pl-5">
            <li v-for="(r, rIdx) in x.r" :key="rIdx">
              <a
                :href="r[1]"
                target="_blank"
                rel="noopener"
                class="tw:text-ruta-acc tw:focus-visible:outline-2 tw:focus-visible:outline-offset-2 tw:focus-visible:outline-ruta-acc"
              >{{ r[0] }}</a>
            </li>
          </ul>

          <h3 class="tw:m-[16px_0_6px] tw:text-[1rem] tw:font-bold">Práctica</h3>
          <p v-html="x.p" />

          <div class="q">
            <h3 class="tw:m-[16px_0_6px] tw:text-[1rem] tw:font-bold">
              Comprueba lo aprendido
            </h3>
            <p>{{ x.q[0] }}</p>
            <button
              v-for="(o, j) in x.q[1]"
              :key="j"
              type="button"
              :data-m="i"
              :data-o="j"
              :disabled="quizState[i]?.locked"
              class="tw:my-1.5 tw:block tw:w-full tw:cursor-pointer tw:rounded-[8px] tw:border tw:px-3 tw:py-2 tw:text-left tw:text-ruta-ink tw:[font-family:inherit] tw:focus-visible:outline-2 tw:focus-visible:outline-offset-2 tw:focus-visible:outline-ruta-acc"
              :class="{
                'tw:border-ruta-line tw:bg-ruta-bg': !quizState[i]?.chosen[j],
                'ok tw:border-ruta-ok tw:[background:color-mix(in_srgb,var(--ruta-ok)_18%,var(--ruta-bg))]':
                  quizState[i]?.chosen[j] === 'ok',
                'no tw:border-ruta-bad tw:bg-ruta-bg': quizState[i]?.chosen[j] === 'no',
              }"
              @click="answerQuiz(i, j)"
            >
              {{ o }}
            </button>
          </div>

          <label class="tw:mt-[14px] tw:flex tw:items-center tw:gap-2 tw:font-semibold">
            <input
              type="checkbox"
              :data-d="i"
              :checked="!!savedState['d' + i]"
              @change="toggleDone(i, $event.target.checked)"
            >
            Módulo completado
          </label>
        </div>
      </details>
    </main>

    <main class="tw:mx-auto tw:max-w-[860px] tw:p-[0_20px_60px]">
      <slot />
    </main>
  </div>
</template>

<style>
/* Estilos para etiquetas inline dentro de fragmentos v-html (<code> y <a> de los arrays de datos) */
.ruta-scope code {
  background: var(--ruta-code);
  padding: 1px 5px;
  border-radius: 4px;
  font-family: Cascadia Code, Consolas, monospace;
  font-size: 0.88em;
}
.ruta-scope a {
  color: var(--ruta-acc);
}
</style>
