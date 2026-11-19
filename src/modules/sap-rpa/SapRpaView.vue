<script setup>
import { usePageEnv } from '../../composables/usePageEnv'
import { sapSections } from './sapRpaData'

usePageEnv({
  title: 'Formación SAP y RPA',
  bodyClass: [
    'tw-page',
    'theme-sap',
    'tw:m-0',
    'tw:min-h-screen',
    'tw:bg-sap-bg',
    'tw:text-sap-ink',
    'tw:font-sap',
    'tw:text-[16px]',
    'tw:leading-[1.55]',
  ],
})
</script>

<template>
  <main class="tw:mx-auto tw:max-w-[760px] tw:p-[28px_18px_56px]">
    <h1 class="tw:m-0 tw:mb-2 tw:text-[1.7rem] tw:leading-[1.2] tw:font-bold">
      Formación SAP y RPA
    </h1>
    <p class="tw:m-0 tw:mb-7 tw:max-w-[60ch] tw:text-sap-muted">
      Cursos oficiales y gratuitos para aprender SAP GUI, automatización con Power Automate Desktop (PAD)
      y la unión de ambos. Entorno de referencia: SAP GUI 770.
    </p>

    <template v-for="section in sapSections" :key="section.heading">
      <h2
        class="tw:m-0 tw:mt-9 tw:mb-1 tw:border-b-2 tw:border-sap-accent tw:pb-2 tw:text-[1.2rem] tw:font-bold"
      >
        {{ section.heading }}
      </h2>
      <p class="tw:mt-2 tw:mb-[14px] tw:text-[0.95rem] tw:text-sap-muted">
        {{ section.sub }}
      </p>
      <ul class="tw:m-0 tw:grid tw:list-none tw:gap-2.5 tw:p-0">
        <li
          v-for="item in section.items"
          :key="item.href + item.title"
          class="tw:rounded-[8px] tw:border tw:border-sap-line tw:bg-sap-surface tw:p-[14px_16px]"
        >
          <a
            :href="item.href"
            target="_blank"
            rel="noopener"
            class="tw:text-[1.02rem] tw:font-semibold tw:text-sap-accent tw:no-underline tw:hover:underline tw:focus-visible:underline tw:focus-visible:outline-2 tw:focus-visible:outline-offset-2 tw:focus-visible:outline-sap-accent"
          >{{ item.title }}</a>
          <p v-if="item.desc" class="tw:m-0 tw:mt-1 tw:text-[0.93rem] tw:text-sap-muted">
            {{ item.desc }}
          </p>
          <div>
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="tw:mt-2 tw:mr-1.5 tw:inline-block tw:rounded-[99px] tw:bg-sap-accent-soft tw:px-[9px] tw:py-[2px] tw:text-[0.8rem] tw:text-sap-accent"
            >{{ tag }}</span>
          </div>
        </li>
      </ul>
    </template>

    <p
      class="tw:mt-9 tw:rounded-[0_8px_8px_0] tw:border-l-4 tw:border-sap-accent tw:bg-sap-surface tw:p-[14px_16px] tw:text-[0.93rem] tw:text-sap-muted"
    >
      Los enlaces de YOUTUBE o de Microsoft Learn pueden cambiar de ubicación con el tiempo. Si
      alguno falla, entra por la página principal de cada plataforma y busca el título.
    </p>
  </main>
</template>
