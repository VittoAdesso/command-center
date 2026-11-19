<script setup>
import RutaModule from './RutaModule.vue'
import { M } from './data/powerPlatformArquitectoRutaData'
</script>

<template>
  <RutaModule
    title="Arquitectura de soluciones en Power Platform"
    subtitle="Ruta para quien pasa de construir a diseñar: requisitos, fit/gap, entornos, datos, seguridad, integraciones y validación. Marca cada módulo al terminarlo; el progreso se guarda en tu navegador."
    storage-key="pa-arq"
    :modules="M"
  >
    <div
      class="tw:my-[14px] tw:rounded-[0_8px_8px_0] tw:border-l-4 tw:border-ruta-acc tw:bg-ruta-card tw:p-[10px_14px] tw:text-ruta-mut"
    >
      <b>Certificación.</b> El examen PL-600 (Power Platform Solution Architect) se retiró el 30 de junio de 2026. Su
      <a
        href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-600"
        target="_blank"
        rel="noopener"
      >guía de estudio</a>
      sigue publicada y es una buena lista de las competencias de este rol; esta ruta se organiza a partir de ella. Microsoft anunció nuevas credenciales en su
      <a href="https://aka.ms/AIBusinessCredentialsBlog" target="_blank" rel="noopener">blog de credenciales de IA para negocio</a>;
      revísalo antes de planear una certificación.
    </div>
    <div
      class="tw:my-[14px] tw:rounded-[0_8px_8px_0] tw:border-l-4 tw:border-ruta-acc tw:bg-ruta-card tw:p-[10px_14px] tw:text-ruta-mut"
    >
      <b>Videos.</b> La guía oficial recomienda la
      <a
        href="https://www.youtube.com/playlist?list=PLi9EhCY4z99W2QOTgbwhFZEjpqc8YZDVH"
        target="_blank"
        rel="noopener"
      >serie de arquitectura de Power Apps y Power Automate</a>
      (lista de YouTube) y la serie
      <a
        href="https://learn.microsoft.com/en-us/shows/less-code-more-power/"
        target="_blank"
        rel="noopener"
      >#LessCodeMorePower</a>.
      Revisa que la lista siga disponible.
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
          href="https://powerusers.microsoft.com/t5/Microsoft-Power-Automate/ct-p/MPACommunity"
          target="_blank"
          rel="noopener"
        >Comunidad de Power Automate</a>
      </li>
    </ul>
    <footer class="tw:text-[0.88rem] tw:text-ruta-mut">
      <p>Revisa los enlaces cada trimestre. Última verificación: 13 de noviembre de 2026.</p>
    </footer>
  </RutaModule>
</template>
