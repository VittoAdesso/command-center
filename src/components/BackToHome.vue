<script setup>
// Único elemento de "layout" compartido: un acceso discreto para volver al Home.
// No se añade cabecera común para no alterar el diseño propio de cada módulo.
</script>

<template>
  <RouterLink
    to="/"
    class="tw:fixed tw:left-4 tw:bottom-4 tw:z-[60] tw:inline-flex tw:items-center tw:gap-1.5 tw:rounded-full tw:border tw:border-white/15 tw:bg-[rgba(21,18,14,0.82)] tw:px-3 tw:py-1.5 tw:font-[Manrope,system-ui,sans-serif] tw:text-[12.5px] tw:font-semibold tw:leading-none tw:text-[#f3ead9] tw:no-underline tw:shadow-[0_8px_24px_-10px_rgba(0,0,0,0.6)] tw:backdrop-blur-[8px] tw:[transition:transform_.15s_ease,border-color_.15s_ease] tw:hover:border-[#ff9d3d] tw:hover:[transform:translateY(-2px)] tw:print:hidden"
    aria-label="Volver al Centro de Mando"
  >
    <span aria-hidden="true">📡</span> ← Centro de Mando
  </RouterLink>
</template>
