<script setup>
// Acceso flotante para volver al Centro de Mando desde cualquier guía.
</script>

<template>
  <RouterLink
    to="/"
    class="tw:group tw:fixed tw:left-5 tw:bottom-5 tw:z-[70] tw:inline-flex tw:items-center tw:gap-2.5 tw:rounded-full tw:border tw:border-cm-border tw:bg-cm-card/90 tw:px-4 tw:py-2.5 tw:font-cm-body tw:text-[13px] tw:font-semibold tw:text-cm-text tw:shadow-xl tw:backdrop-blur-md tw:transition-all tw:duration-200 hover:tw:-translate-y-0.5 hover:tw:border-cm-accent hover:tw:shadow-cm-accent-soft tw:print:hidden"
    aria-label="Volver al Centro de Mando"
  >
    <span
      class="tw:flex tw:h-5 tw:w-5 tw:items-center tw:justify-center tw:rounded-full tw:bg-cm-accent-soft tw:text-[11px] tw:text-cm-accent tw:transition-transform group-hover:tw:-translate-x-1"
    >←</span>
    <span>Centro de Mando</span>
    <span
      class="tw:hidden sm:tw:inline-block tw:rounded-full tw:border tw:border-cm-border-soft tw:bg-cm-elev tw:px-2 tw:py-0.5 tw:font-cm-mono tw:text-[10px] tw:font-medium tw:text-cm-faint group-hover:tw:text-cm-dim"
    >HUB</span>
  </RouterLink>
</template>
