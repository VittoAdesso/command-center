import { onUnmounted } from 'vue'

/**
 * Prepara <html> y <body> para cada vista:
 * título, clases, atributos (data-theme sincronizado globalmente) y favicon.
 * Al salir de la vista se deshace todo, para que el siguiente módulo empiece limpio.
 *
 * @param {object} opts
 * @param {string}   opts.title
 * @param {string[]} [opts.htmlClass]   clases para <html>
 * @param {string[]} [opts.bodyClass]   clases para <body>
 * @param {object}   [opts.htmlAttrs]   atributos para <html>
 * @param {object}   [opts.bodyAttrs]   atributos para <body>
 * @param {string}   [opts.favicon]     href del icono
 */
export function usePageEnv({ title, htmlClass = [], bodyClass = [], htmlAttrs = {}, bodyAttrs = {}, favicon } = {}) {
  const html = document.documentElement
  const body = document.body

  const currentTheme = localStorage.getItem('cm-theme') || localStorage.getItem('cm-index-theme') || 'dark'

  document.title = title
  html.classList.add(...htmlClass)
  body.classList.add(...bodyClass)

  // Sincronizar tema global consistente en <html> y <body>
  html.setAttribute('data-theme', currentTheme)
  body.setAttribute('data-theme', currentTheme)
  if (currentTheme === 'dark') {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }

  for (const [k, v] of Object.entries(htmlAttrs)) {
    if (k !== 'data-theme') html.setAttribute(k, v)
  }
  for (const [k, v] of Object.entries(bodyAttrs)) {
    if (k !== 'data-theme') body.setAttribute(k, v)
  }

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
    for (const k of Object.keys(htmlAttrs)) html.removeAttribute(k)
    for (const k of Object.keys(bodyAttrs)) body.removeAttribute(k)
    html.removeAttribute('style')
    body.removeAttribute('style')
    if (icon) icon.remove()
  })
}
