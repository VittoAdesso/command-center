<script setup>
import RutaModule from './RutaModule.vue'
import { M } from './data/refactoringGuruRutaData'
</script>

<template>
  <RutaModule
    title="Refactorización y patrones de diseño"
    subtitle="Ruta guiada sobre los contenidos de Refactoring.Guru: cómo mejorar código existente sin romperlo, cómo reconocer problemas de diseño y qué patrones los resuelven. Marca cada módulo al terminarlo; el progreso se guarda en tu navegador."
    storage-key="pa-refg"
    resources-heading="Páginas de Refactoring.Guru"
    :modules="M"
  >
    <div
      class="tw:my-[14px] tw:rounded-[0_8px_8px_0] tw:border-l-4 tw:border-ruta-acc tw:bg-ruta-card tw:p-[10px_14px] tw:text-ruta-mut"
    >
      <b>Sobre la fuente.</b> Esta página solo enlaza y resume con palabras propias; el contenido pertenece a
      <a href="https://refactoring.guru/" target="_blank" rel="noopener">Refactoring.Guru</a>.
      También existe una
      <a href="https://refactoring.guru/es" target="_blank" rel="noopener">versión en español</a>
      del sitio. Tiene contenido premium de pago (<a
        href="https://refactoring.guru/design-patterns/book"
        target="_blank"
        rel="noopener"
      >libro de patrones</a>
      y
      <a href="https://refactoring.guru/refactoring/course" target="_blank" rel="noopener">curso de refactorización</a>);
      esta ruta usa solo las páginas públicas del sitio.
    </div>
    <div
      class="tw:my-[14px] tw:rounded-[0_8px_8px_0] tw:border-l-4 tw:border-ruta-acc tw:bg-ruta-card tw:p-[10px_14px] tw:text-ruta-mut"
    >
      <b>Lenguajes.</b> Los ejemplos de código de los patrones están en C#, C++, Go, Java, PHP, Python, Ruby, Rust, Swift y TypeScript (<a
        href="https://refactoring.guru/design-patterns/examples"
        target="_blank"
        rel="noopener"
      >índice de ejemplos</a>). Si trabajas en otro lenguaje, usa los diagramas y adapta la idea.
    </div>
    <footer class="tw:text-[0.88rem] tw:text-ruta-mut">
      <p>Revisa los enlaces cada trimestre. Última verificación: 13 de noviembre de 2026.</p>
    </footer>
  </RutaModule>
</template>
