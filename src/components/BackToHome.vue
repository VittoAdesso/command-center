<script setup>
// Acceso flotante para volver al Centro de Mando desde cualquier guía.
</script>

<template>
  <RouterLink
    to="/"
    class="tw:group tw:fixed tw:left-5 tw:bottom-5 tw:z-[70] tw:inline-flex tw:items-center tw:gap-2 tw:rounded-full tw:border tw:border-white/20 tw:bg-slate-900/85 tw:px-3.5 tw:py-2 tw:font-cm-body tw:text-[12.5px] tw:font-medium tw:text-slate-100 tw:shadow-lg tw:backdrop-blur-md tw:transition-all tw:duration-200 hover:tw:-translate-y-0.5 hover:tw:border-indigo-400 hover:tw:bg-slate-900 hover:tw:shadow-indigo-500/20 tw:print:hidden"
    aria-label="Volver al Centro de Mando"
  >
    <span
      class="tw:flex tw:h-5 tw:w-5 tw:items-center tw:justify-center tw:rounded-full tw:bg-indigo-500/20 tw:text-[11px] tw:text-indigo-400 tw:transition-transform group-hover:tw:-translate-x-0.5"
    >←</span>
    <span>Centro de Mando</span>
    <span
      class="tw:hidden sm:tw:inline-block tw:rounded tw:bg-white/10 tw:px-1.5 tw:py-0.5 tw:font-cm-mono tw:text-[10px] tw:text-slate-300"
    >HUB</span>
  </RouterLink>
</template>
