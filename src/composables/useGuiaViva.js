import { usePageEnv } from './usePageEnv'
import { useModuleScript } from './useModuleScript'

/**
 * Composable compartido por las 5 «Guías vivas» (Power Platform, Power Automate,
 * Power BI, Excel y M365 Copilot / DesdeCero Copilot).
 * Reproduce el comportamiento exacto de cada archivo original y limpia listeners y
 * observers al cambiar de ruta.
 *
 * @param {import('vue').Ref<HTMLElement|null>} rootRef
 * @param {object} opts
 * @param {string} opts.title          Título de la pestaña
 * @param {string} opts.scopeClass     Clase de ámbito CSS en <html> (p. ej. 'mod-power-platform')
 * @param {string|null} [opts.themeStorageKey] Clave de localStorage para el tema (null si el original no persistía)
 * @param {string[]} opts.blocks       IDs de los bloques observados por el scrollspy
 * @param {'exclusive'|'toggle'} [opts.spyMode] Modo del IntersectionObserver según el original
 * @param {boolean} [opts.enableCopyBtns] Activa los botones .copy-btn (Copilot)
 */
export function useGuiaViva(
  rootRef,
  {
    title,
    scopeClass,
    themeStorageKey = null,
    blocks = [],
    spyMode = 'exclusive',
    enableCopyBtns = false,
  },
) {
  usePageEnv({
    title,
    htmlClass: [scopeClass],
    bodyAttrs: { 'data-theme': 'dark' },
  })

  useModuleScript(rootRef, ({ root, on, onCleanup }) => {
    const scope = root || document

    // 1. Conmutador de tema claro / oscuro
    const tt = scope.querySelector('#themeToggle')
    if (tt) {
      const initial = themeStorageKey ? localStorage.getItem(themeStorageKey) || 'dark' : 'dark'
      document.body.setAttribute('data-theme', initial)
      tt.textContent = initial === 'dark' ? '🌙' : '☀️'

      on(tt, 'click', () => {
        const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        document.body.setAttribute('data-theme', next)
        tt.textContent = next === 'dark' ? '🌙' : '☀️'
        if (themeStorageKey) {
          localStorage.setItem(themeStorageKey, next)
        }
      })
    }

    // 2. Botón flotante para volver arriba (#topBtn)
    const topBtn = scope.querySelector('#topBtn')
    if (topBtn) {
      on(
        window,
        'scroll',
        () => {
          topBtn.classList.toggle('show', window.scrollY > 600)
        },
        { passive: true },
      )
      on(topBtn, 'click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }

    // 3. Pastillas de navegación activas según la sección visible (IntersectionObserver)
    if ('IntersectionObserver' in window && blocks.length) {
      if (spyMode === 'toggle') {
        // Variante usada en power-platform.html y copilot.html
        blocks.forEach((id) => {
          const section = scope.querySelector('#' + id)
          const pill = scope.querySelector(`.nav-pill[href="#${id}"]`)
          if (section && pill) {
            const obs = new IntersectionObserver(
              (entries) => {
                entries.forEach((e) => pill.classList.toggle('active', e.isIntersecting))
              },
              { rootMargin: '-120px 0px -70% 0px' },
            )
            obs.observe(section)
            onCleanup(() => obs.disconnect())
          }
        })
      } else {
        // Variante usada en power-automate.html, power-bi.html y excel.html
        const pills = scope.querySelectorAll('.nav-pill[href^="#"]')
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                pills.forEach((p) => p.classList.remove('active'))
                const active = scope.querySelector(`.nav-pill[href="#${e.target.id}"]`)
                if (active) active.classList.add('active')
              }
            })
          },
          { threshold: 0.15, rootMargin: '-80px 0px -60% 0px' },
        )
        blocks.forEach((id) => {
          const el = scope.querySelector('#' + id)
          if (el) obs.observe(el)
        })
        onCleanup(() => obs.disconnect())
      }
    }

    // 4. Botones de copiar prompt (.copy-btn en copilot.html / DesdeCero_copilot.html)
    if (enableCopyBtns) {
      scope.querySelectorAll('.copy-btn').forEach((btn) => {
        on(btn, 'click', () => {
          const text = btn.previousElementSibling ? btn.previousElementSibling.textContent : ''
          navigator.clipboard
            .writeText(text)
            .then(() => {
              const original = btn.textContent
              btn.textContent = '¡Copiado!'
              btn.classList.add('copied')
              setTimeout(() => {
                btn.textContent = original
                btn.classList.remove('copied')
              }, 1800)
            })
            .catch(() => {
              btn.textContent = 'Selecciona y copia'
            })
        })
      })
    }
  })
}
