import { onUnmounted } from 'vue'

/**
 * Prepara <html> y <body> como lo hacía cada HTML original mientras la vista está montada:
 * título, clases, atributos (p. ej. data-theme="dark") y favicon.
 * Al salir de la vista se deshace todo, para que el siguiente módulo empiece limpio.
 *
 * @param {object} opts
 * @param {string}   opts.title
 * @param {string[]} [opts.htmlClass]   clases para <html>
 * @param {string[]} [opts.bodyClass]   clases para <body>
 * @param {object}   [opts.htmlAttrs]   atributos para <html>  (p. ej. { 'data-theme': 'dark' })
 * @param {object}   [opts.bodyAttrs]   atributos para <body>
 * @param {string}   [opts.favicon]     href del icono (solo el Home tenía)
 */
export function usePageEnv({ title, htmlClass = [], bodyClass = [], htmlAttrs = {}, bodyAttrs = {}, favicon } = {}) {
  const html = document.documentElement
  const body = document.body

  document.title = title
  html.classList.add(...htmlClass)
  body.classList.add(...bodyClass)
  for (const [k, v] of Object.entries(htmlAttrs)) html.setAttribute(k, v)
  for (const [k, v] of Object.entries(bodyAttrs)) body.setAttribute(k, v)

  let icon = null
  if (favicon) {
    icon = document.createElement('link')
    icon.rel = 'icon'
    icon.href = favicon
    document.head.appendChild(icon)
  }

  onUnmounted(() => {
    html.classList.remove(...htmlClass)
    body.classList.remove(...bodyClass)
    // Se quitan también los atributos que el propio módulo pueda haber cambiado (tema, etc.)
    for (const k of Object.keys(htmlAttrs)) html.removeAttribute(k)
    for (const k of Object.keys(bodyAttrs)) body.removeAttribute(k)
    html.removeAttribute('style')
    body.removeAttribute('style')
    if (icon) icon.remove()
  })
}
