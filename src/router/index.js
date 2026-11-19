import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

  // ── 10 guías originales del Centro de Mando ─────────────────────────────────
  {
    path: '/power-platform',
    name: 'power-platform',
    alias: ['/power-platform.html'],
    component: () => import('../modules/guias/PowerPlatformView.vue'),
  },
  {
    path: '/power-automate',
    name: 'power-automate',
    alias: ['/power-automate.html'],
    component: () => import('../modules/guias/PowerAutomateView.vue'),
  },
  {
    path: '/power-bi',
    name: 'power-bi',
    alias: ['/power-bi.html'],
    component: () => import('../modules/guias/PowerBiView.vue'),
  },
  {
    path: '/excel',
    name: 'excel',
    alias: ['/excel.html'],
    component: () => import('../modules/guias/ExcelView.vue'),
  },
  {
    path: '/arquitectura-m365',
    name: 'arquitectura-m365',
    alias: ['/Hoja_Ruta_Arquitectura_M365.html'],
    component: () => import('../modules/especial/ArquitecturaM365View.vue'),
  },
  {
    path: '/copilot',
    name: 'copilot',
    alias: ['/copilot.html'],
    component: () => import('../modules/guias/CopilotView.vue'),
  },
  {
    path: '/briefing-copilot',
    name: 'briefing-copilot',
    alias: ['/Briefing_copilot.html'],
    component: () => import('../modules/especial/BriefingCopilotView.vue'),
  },
  {
    // DesdeCero_copilot.html es idéntico byte a byte a copilot.html; conserva su ruta propia
    path: '/desde-cero-copilot',
    name: 'desde-cero-copilot',
    alias: ['/DesdeCero_copilot.html'],
    component: () => import('../modules/guias/CopilotView.vue'),
  },
  {
    path: '/especialista-copilot',
    name: 'especialista-copilot',
    alias: ['/Especialista_copilot.html'],
    component: () => import('../modules/especial/EspecialistaCopilotView.vue'),
  },
  {
    // Resuelve tanto /sap-rpa.html (enlace en minúsculas del Home) como /SAP-RPA.html (nombre real del archivo)
    path: '/sap-rpa',
    name: 'sap-rpa',
    alias: ['/sap-rpa.html', '/SAP-RPA.html'],
    component: () => import('../modules/sap-rpa/SapRpaView.vue'),
  },

  // ── 6 módulos adicionales presentes en la carpeta Command-Center ────────────
  {
    path: '/pad-ninja',
    name: 'pad-ninja',
    alias: ['/HojaRuta_completa_PAD.html'],
    component: () => import('../modules/especial/PadNinjaView.vue'),
  },
  {
    path: '/migracion-uipath-pad',
    name: 'migracion-uipath-pad',
    alias: ['/HowTo_migrateUiptah.html'],
    component: () => import('../modules/especial/MigracionUipathView.vue'),
  },
  {
    path: '/power-apps-ruta',
    name: 'power-apps-ruta',
    alias: ['/power-apps-ruta.html'],
    component: () => import('../modules/rutas/PowerAppsRutaView.vue'),
  },
  {
    path: '/power-platform-arquitecto-ruta',
    name: 'power-platform-arquitecto-ruta',
    alias: ['/power-platform-arquitecto-ruta.html'],
    component: () => import('../modules/rutas/PowerPlatformArquitectoRutaView.vue'),
  },
  {
    path: '/documentacion-patrones-ruta',
    name: 'documentacion-patrones-ruta',
    alias: ['/documentacion-patrones-ruta.html'],
    component: () => import('../modules/rutas/DocumentacionPatronesRutaView.vue'),
  },
  {
    path: '/refactoring-guru-ruta',
    name: 'refactoring-guru-ruta',
    alias: ['/refactoring-guru-ruta.html'],
    component: () => import('../modules/rutas/RefactoringGuruRutaView.vue'),
  },
  {
    path: '/typescript-vitest',
    name: 'typescript-vitest',
    alias: ['/typescript-vitest.html', '/manual-typescript-vitest.html'],
    component: () => import('../modules/ts-vitest/TsVitestManualView.vue'),
  },

  // Alias del propio archivo Home original
  {
    path: '/_Centro_de_Mando.html',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
