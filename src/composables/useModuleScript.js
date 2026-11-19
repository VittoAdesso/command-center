import { onMounted, onBeforeUnmount } from 'vue'

/**
 * Ejecuta el JavaScript original de un módulo cuando su contenido ya está en pantalla,
 * y lo "desmonta" al salir de la ruta (quita listeners de window/document, observers, timers).
 *
 * Uso:
 *   const root = ref(null)
 *   useModuleScript(root, ({ root, on, onCleanup }) => {
 *     on(window, 'scroll', handler, { passive: true })
 *     const obs = new IntersectionObserver(...); onCleanup(() => obs.disconnect())
 *   })
 */
export function useModuleScript(rootRef, setup) {
  const cleanups = []
  const on = (target, event, handler, options) => {
    target.addEventListener(event, handler, options)
    cleanups.push(() => target.removeEventListener(event, handler, options))
  }
  const onCleanup = (fn) => cleanups.push(fn)

  onMounted(() => setup({ root: rootRef.value, on, onCleanup }))
  onBeforeUnmount(() => {
    while (cleanups.length) cleanups.pop()()
  })
}
