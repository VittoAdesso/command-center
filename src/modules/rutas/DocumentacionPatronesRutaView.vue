<script setup>
import { ref } from 'vue'
import RutaModule from './RutaModule.vue'
import { M } from './data/documentacionPatronesRutaData'

const t1Text = `ADR-0001: [título breve de la decisión]
Estado: propuesta | aceptada | reemplazada por ADR-XXXX
Fecha: [AAAA-MM-DD]
Responsables: [quién decide]

Contexto y problema:
[qué situación obliga a decidir]

Opciones consideradas:
1. [opción A]
2. [opción B]

Decisión:
[qué se decidió y por qué]

Compromisos asumidos:
[qué se cede con esta decisión]

Nivel de confianza: alto | medio | bajo
Material de apoyo: [enlaces, si los hay]`

const t2Text = `[Nombre de la solución]
Qué hace: [una frase, sin jerga]
Quién la usa: [área o rol]
Cómo se usa: [3 a 5 pasos para el usuario final]
Qué hacer si falla: [a quién avisar y qué información dar]

Para quien la mantiene
Componentes: [apps, flujos, tablas, conectores]
Entornos: [desarrollo, pruebas, producción]
Dependencias: [sistemas, cuentas de servicio, conexiones]
Decisiones clave: [enlaces a los ADR]
Cómo desplegar: [pasos o enlace]
Responsable y suplente: [nombres]`

const btnT1 = ref('Copiar plantilla')
const btnT2 = ref('Copiar plantilla')

function copyTemplate(text, labelRef) {
  try {
    navigator.clipboard.writeText(text)
    labelRef.value = 'Copiado'
  } catch {
    labelRef.value = 'Selecciona y copia a mano'
  }
}
</script>

<template>
  <RutaModule
    title="Documentación y patrones de diseño"
    subtitle="Cómo documentar soluciones para que otros las entiendan y las mantengan, y cómo reconocer patrones de diseño aplicables a Power Platform y a la automatización. Marca cada módulo al terminarlo; el progreso se guarda en tu navegador."
    storage-key="pa-doc"
    :modules="M"
  >
    <h3 class="tw:m-[16px_0_6px] tw:text-[1rem] tw:font-bold">Plantillas para copiar</h3>
    <p>
      Basadas en los elementos que recomienda la guía de Microsoft sobre registros de decisiones. Ajústalas a tu equipo.
    </p>
    <p><b>Registro de decisión (ADR)</b></p>
    <pre
      id="t1"
      class="tw:my-2 tw:overflow-x-auto tw:rounded-[8px] tw:bg-ruta-code tw:p-[12px_14px] tw:font-cascadia tw:text-[0.85rem] tw:leading-[1.5] tw:whitespace-pre-wrap"
    >{{ t1Text }}</pre>
    <button
      type="button"
      data-c="t1"
      class="cp tw:cursor-pointer tw:rounded-[8px] tw:border tw:border-ruta-line tw:bg-ruta-card tw:px-3 tw:py-[5px] tw:text-[0.9rem] tw:text-ruta-ink tw:[font-family:inherit] tw:focus-visible:outline-2 tw:focus-visible:outline-offset-2 tw:focus-visible:outline-ruta-acc"
      @click="copyTemplate(t1Text, btnT1)"
    >
      {{ btnT1 }}
    </button>

    <p><b>Ficha de una solución (README)</b></p>
    <pre
      id="t2"
      class="tw:my-2 tw:overflow-x-auto tw:rounded-[8px] tw:bg-ruta-code tw:p-[12px_14px] tw:font-cascadia tw:text-[0.85rem] tw:leading-[1.5] tw:whitespace-pre-wrap"
    >{{ t2Text }}</pre>
    <button
      type="button"
      data-c="t2"
      class="cp tw:cursor-pointer tw:rounded-[8px] tw:border tw:border-ruta-line tw:bg-ruta-card tw:px-3 tw:py-[5px] tw:text-[0.9rem] tw:text-ruta-ink tw:[font-family:inherit] tw:focus-visible:outline-2 tw:focus-visible:outline-offset-2 tw:focus-visible:outline-ruta-acc"
      @click="copyTemplate(t2Text, btnT2)"
    >
      {{ btnT2 }}
    </button>

    <div
      class="tw:my-[14px] tw:rounded-[0_8px_8px_0] tw:border-l-4 tw:border-ruta-acc tw:bg-ruta-card tw:p-[10px_14px] tw:text-ruta-mut"
    >
      <b>Alcance.</b> Los patrones de la lista de nube son independientes de la tecnología; los ejemplos de aplicación en Power Platform de cada módulo son analogías de esta guía y no una lista oficial de Microsoft. Revisa los enlaces cada trimestre. Última verificación: 13 de noviembre de 2026.
    </div>
  </RutaModule>
</template>
