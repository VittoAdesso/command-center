<script setup>
import RutaModule from './RutaModule.vue'
import { M } from './data/powerAppsRutaData'
</script>

<template>
  <RutaModule
    title="Power Apps: de cero a avanzado"
    subtitle="Ruta para perfiles técnicos: fundamentos, Canvas Apps, Power Fx, Dataverse, Model-driven, extensibilidad y ALM. Marca cada módulo al terminarlo; el progreso se guarda en tu navegador."
    storage-key="pa-ruta"
    :modules="M"
  >
    <div
      class="tw:my-[14px] tw:rounded-[0_8px_8px_0] tw:border-l-4 tw:border-ruta-acc tw:bg-ruta-card tw:p-[10px_14px] tw:text-ruta-mut"
    >
      <b>Videos.</b> Los videos de la ruta están en la serie oficial
      <a
        href="https://learn.microsoft.com/en-us/shows/less-code-more-power/"
        target="_blank"
        rel="noopener"
      >#LessCodeMorePower</a>
      y en
      <a href="https://learn.microsoft.com/en-us/shows/browse" target="_blank" rel="noopener">todos los shows de Microsoft Learn</a>.
      No se incluyen enlaces sueltos de YouTube porque no se pueden comprobar y se rompen con facilidad.
    </div>
    <div
      class="tw:my-[14px] tw:rounded-[0_8px_8px_0] tw:border-l-4 tw:border-ruta-acc tw:bg-ruta-card tw:p-[10px_14px] tw:text-ruta-mut"
    >
      <b>Certificación.</b> El examen PL-400 (Power Platform Developer) se retiró el 30 de octubre de 2026. Su
      <a
        href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-400"
        target="_blank"
        rel="noopener"
      >guía de estudio</a>
      sigue siendo útil como lista de competencias técnicas (plug-ins, PCF, code apps, APIs, ALM). Antes de planear una certificación, consulta qué exámenes están vigentes.
    </div>
    <h3 class="tw:m-[16px_0_6px] tw:text-[1rem] tw:font-bold">Comunidad y ayuda</h3>
    <ul class="tw:m-0 tw:pl-5">
      <li>
        <a href="https://learn.microsoft.com/en-us/answers/products/" target="_blank" rel="noopener">Microsoft Q&amp;A</a>
      </li>
      <li>
        <a
          href="https://powerusers.microsoft.com/t5/Power-Apps-Community/ct-p/PowerApps1"
          target="_blank"
          rel="noopener"
        >Comunidad de Power Apps</a>
      </li>
      <li>
        <a
          href="https://learn.microsoft.com/en-us/power-apps/learning-catalog/developer"
          target="_blank"
          rel="noopener"
        >Catálogo de aprendizaje para desarrolladores</a>
      </li>
    </ul>
    <footer class="tw:text-[0.88rem] tw:text-ruta-mut">
      <p>
        Revisa los enlaces cada trimestre: Power Apps cambia con frecuencia (Copilot, nuevo Studio, licencias). Última verificación: 13 de noviembre de 2026.
      </p>
    </footer>
  </RutaModule>
</template>
