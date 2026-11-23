/**
 * Datos unificados de las tarjetas del Centro de Mando.
 * Estructura estandarizada con categorías, niveles, badges consistentes y colores armonizados.
 */

export const categories = [
  { id: 'all', label: 'Todas las guías', count: 18, icon: '🌐' },
  { id: 'power-platform', label: 'Power Platform', count: 4, icon: '⚡' },
  { id: 'copilot', label: 'Copilot & IA', count: 5, icon: '🤖' },
  { id: 'rpa', label: 'Automatización & RPA', count: 4, icon: '🔄' },
  { id: 'dev', label: 'Arquitectura & Dev', count: 5, icon: '💻' },
]

export const homeCards = [
  // ── 01. Power Platform ──────────────────────────────────────────────────
  {
    id: 'power-platform',
    to: '/power-platform',
    legacyHref: 'power-platform.html',
    category: 'power-platform',
    categoryLabel: 'Power Platform',
    color: '#8b5cf6',
    colorSoft: 'rgba(139, 92, 246, 0.12)',
    icon: '⚡',
    num: 'Guía 01',
    badge: 'Base PL-900',
    title: 'Power Platform Core',
    description:
      'Visión completa de la suite: Dataverse, Power Apps (lienzo y modelo), Power Pages, administración CoE, entornos y ciclo ALM.',
    tags: ['Dataverse', 'Power Apps', 'Power Pages', 'ALM & CoE'],
    bloques: '4 bloques · 9 módulos oficiales',
  },

  // ── 02. Power Automate ──────────────────────────────────────────────────
  {
    id: 'power-automate',
    to: '/power-automate',
    legacyHref: 'power-automate.html',
    category: 'rpa',
    categoryLabel: 'Automatización RPA',
    color: '#0284c7',
    colorSoft: 'rgba(2, 132, 199, 0.12)',
    icon: '🔄',
    num: 'Guía 02',
    badge: 'Cloud + Desktop',
    title: 'Power Automate & PAD',
    description:
      'Automatización integral: Cloud Flows, Power Automate Desktop (RPA), gestión de excepciones, testing y checklist CoE para producción.',
    tags: ['Cloud Flows', 'PAD / RPA', 'UiPath→PAD', 'Checklist CoE'],
    bloques: '4 bloques · Cloud + Desktop RPA',
  },

  // ── 03. Power BI ────────────────────────────────────────────────────────
  {
    id: 'power-bi',
    to: '/power-bi',
    legacyHref: 'power-bi.html',
    category: 'dev',
    categoryLabel: 'Arquitectura & Dev',
    color: '#f59e0b',
    colorSoft: 'rgba(245, 158, 11, 0.12)',
    icon: '📊',
    num: 'Guía 03',
    badge: 'PL-300 / DP-605',
    title: 'Power BI & Modelado DAX',
    description:
      'Esquemas en estrella, tablas calendario, relaciones complejas, Power Query avanzado, fórmulas DAX optimizadas y gobernanza en servicio.',
    tags: ['DAX Pro', 'Esquema Estrella', 'Power Query', 'Servicio CoE'],
    bloques: '4 bloques · DP-605 + PL-300',
  },

  // ── 04. Excel ───────────────────────────────────────────────────────────
  {
    id: 'excel',
    to: '/excel',
    legacyHref: 'excel.html',
    category: 'dev',
    categoryLabel: 'Arquitectura & Dev',
    color: '#10b981',
    colorSoft: 'rgba(16, 185, 129, 0.12)',
    icon: '📗',
    num: 'Guía 04',
    badge: 'Excel 365 Pro',
    title: 'Excel Avanzado & Modelado',
    description:
      'Tablas estructuradas, XLOOKUP definitivo, matrices dinámicas (FILTER/SORT/UNIQUE), Power Query en Excel y Copilot en hojas de cálculo.',
    tags: ['XLOOKUP', 'Arrays Dinámicos', 'Power Query', 'Copilot Excel'],
    bloques: '5 bloques · Excel 365 Moderno',
  },

  // ── 05. Arquitectura Pro M365 ───────────────────────────────────────────
  {
    id: 'arquitectura-m365',
    to: '/arquitectura-m365',
    legacyHref: 'Hoja_Ruta_Arquitectura_M365.html',
    category: 'copilot',
    categoryLabel: 'Copilot & IA',
    color: '#6366f1',
    colorSoft: 'rgba(99, 102, 241, 0.12)',
    icon: '🏛️',
    num: 'Guía 05',
    badge: 'Gobernanza Pro',
    title: 'Arquitectura Pro M365',
    description:
      'Entrenamiento técnico de alto nivel: Gobernanza, seguridad de datos, integración Copilot e itinerarios prácticos para proyectos empresariales.',
    tags: ['Gobernanza M365', 'Seguridad de Datos', 'IA Empresarial', 'Lab Proyectos'],
    bloques: '6 bloques · Plan de Entrenamiento',
  },

  // ── 06. M365 Copilot Oficial ────────────────────────────────────────────
  {
    id: 'copilot',
    to: '/copilot',
    legacyHref: 'copilot.html',
    category: 'copilot',
    categoryLabel: 'Copilot & IA',
    color: '#3b82f6',
    colorSoft: 'rgba(59, 130, 246, 0.12)',
    icon: '🤖',
    num: 'Guía 06',
    badge: '28 Módulos Learn',
    title: 'Microsoft 365 Copilot',
    description:
      'Guía integral por apps: Copilot en Word, Excel, PowerPoint, Outlook y Teams. Ingeniería de prompts, casos de negocio y gobernanza CoE.',
    tags: ['Prompt Engineering', 'Apps M365', 'Seguridad CoE', 'Teams & Outlook'],
    bloques: '6 bloques · 28 módulos oficiales',
  },

  // ── 07. Briefing Copilot ────────────────────────────────────────────────
  {
    id: 'briefing-copilot',
    to: '/briefing-copilot',
    legacyHref: 'Briefing_copilot.html',
    category: 'copilot',
    categoryLabel: 'Copilot & IA',
    color: '#ec4899',
    colorSoft: 'rgba(236, 72, 153, 0.12)',
    icon: '📌',
    num: 'Guía 07',
    badge: 'Estrategia & ROI',
    title: 'Copilot: Briefing Estratégico',
    description:
      'Entiende el diferencial real de Copilot frente a chatbots genéricos: conexión directa al grafo de Microsoft 365, contexto corporativo y valor de negocio.',
    tags: ['Microsoft Graph', 'Estrategia IA', 'Adopción', 'Casos de Uso'],
    bloques: '3 bloques · Visión Ejecutiva & Operativa',
  },

  // ── 08. Desde Cero Copilot ──────────────────────────────────────────────
  {
    id: 'desde-cero-copilot',
    to: '/desde-cero-copilot',
    legacyHref: 'DesdeCero_copilot.html',
    category: 'copilot',
    categoryLabel: 'Copilot & IA',
    color: '#06b6d4',
    colorSoft: 'rgba(6, 182, 212, 0.12)',
    icon: '🚀',
    num: 'Guía 08',
    badge: 'De Cero a Experto',
    title: 'Copilot: Itinerario Progresivo',
    description:
      'Hoja de ruta estructurada paso a paso construida sobre Microsoft Learn. Enlaces módulo a módulo organizados por nivel de madurez técnica.',
    tags: ['Microsoft Learn', 'Ruta Progresiva', 'Fundamentos', '75 Unidades'],
    bloques: '6 bloques · 75 unidades enlazadas',
  },

  // ── 09. Especialista Copilot ────────────────────────────────────────────
  {
    id: 'especialista-copilot',
    to: '/especialista-copilot',
    legacyHref: 'Especialista_copilot.html',
    category: 'copilot',
    categoryLabel: 'Copilot & IA',
    color: '#14b8a6',
    colorSoft: 'rgba(20, 184, 166, 0.12)',
    icon: '🧠',
    num: 'Guía 09',
    badge: 'Copilot Studio',
    title: 'Especialista en Copilot & Studio',
    description:
      'Para perfiles avanzados que desean dominar Copilot Studio, agentes personalizados sobre SharePoint, orquestación conversacional y credenciales oficiales.',
    tags: ['Copilot Studio', 'Agentes Autónomos', 'Orquestación', 'Credencial Oficial'],
    bloques: '4 itinerarios · Especialización Avanzada',
  },

  // ── 10. SAP & RPA ───────────────────────────────────────────────────────
  {
    id: 'sap-rpa',
    to: '/sap-rpa',
    legacyHref: 'SAP-RPA.html',
    category: 'rpa',
    categoryLabel: 'Automatización RPA',
    color: '#0284c7',
    colorSoft: 'rgba(2, 132, 199, 0.12)',
    icon: '🏭',
    num: 'Guía 10',
    badge: 'SAP GUI + PAD',
    title: 'SAP GUI & Automatización PAD',
    description:
      'Ruta integral para operar y automatizar SAP con Power Automate Desktop: selectores estables, SAP Scripting y patrones de ejecución empresarial.',
    tags: ['SAP GUI 770', 'SAP Scripting', 'Power Automate', 'RPA Robusto'],
    bloques: '4 fases · Fundamentos y Escenarios Reales',
  },

  // ── 11. PAD Ninja ───────────────────────────────────────────────────────
  {
    id: 'pad-ninja',
    to: '/pad-ninja',
    legacyHref: 'HojaRuta_completa_PAD.html',
    category: 'rpa',
    categoryLabel: 'Automatización RPA',
    color: '#f97316',
    colorSoft: 'rgba(249, 115, 22, 0.12)',
    icon: '🥷',
    num: 'Guía 11',
    badge: 'Referencia Viva',
    title: 'PAD Ninja: Manual Completo',
    description:
      'Manual exhaustivo con buscador en vivo: subflujos, selectores UI, manejo de errores avanzado, diccionario bilingüe FR→ES y casos de producción.',
    tags: ['Buscador en Vivo', '112 Secciones', 'Diccionario Técnico', 'Arquitectura PAD'],
    bloques: '23 bloques · Buscador en vivo interactivo',
  },

  // ── 12. Migración UiPath a PAD ──────────────────────────────────────────
  {
    id: 'migracion-uipath-pad',
    to: '/migracion-uipath-pad',
    legacyHref: 'HowTo_migrateUiptah.html',
    category: 'rpa',
    categoryLabel: 'Automatización RPA',
    color: '#3b82f6',
    colorSoft: 'rgba(59, 130, 246, 0.12)',
    icon: '🔀',
    num: 'Guía 12',
    badge: 'Migración Técnica',
    title: 'Migración UiPath → PAD',
    description:
      'Guía paso a paso para migrar workflows de UiPath a Power Automate Desktop: mapeo de actividades, patrones REFramework, extracción XAML y prompts.',
    tags: ['UiPath to PAD', 'Mapeo XAML', 'REFramework', 'Checklist Go-Live'],
    bloques: '11 secciones · Mapeo exhaustivo y patrones',
  },

  // ── 13. Power Apps Ruta ─────────────────────────────────────────────────
  {
    id: 'power-apps-ruta',
    to: '/power-apps-ruta',
    legacyHref: 'power-apps-ruta.html',
    category: 'power-platform',
    categoryLabel: 'Power Platform',
    color: '#8b5cf6',
    colorSoft: 'rgba(139, 92, 246, 0.12)',
    icon: '📱',
    num: 'Guía 13',
    badge: 'Ruta Guiada',
    title: 'Power Apps: De Cero a Pro',
    description:
      'Ruta interactiva con seguimiento de progreso y autoevaluación: Canvas Apps, funciones Power Fx, Dataverse, Model-driven y ALM profesional.',
    tags: ['Canvas Apps', 'Power Fx', 'Model-Driven', 'Progreso Guardado'],
    bloques: '9 módulos · Básico, Intermedio y Avanzado',
  },

  // ── 14. Arquitecto Power Platform ───────────────────────────────────────
  {
    id: 'power-platform-arquitecto-ruta',
    to: '/power-platform-arquitecto-ruta',
    legacyHref: 'power-platform-arquitecto-ruta.html',
    category: 'power-platform',
    categoryLabel: 'Power Platform',
    color: '#6366f1',
    colorSoft: 'rgba(99, 102, 241, 0.12)',
    icon: '🏗️',
    num: 'Guía 14',
    badge: 'Nivel PL-600',
    title: 'Arquitectura de Soluciones',
    description:
      'De constructor a arquitecto de soluciones: análisis Fit/Gap, estrategia multi-entorno, modelo relacional, seguridad de accesos y ALM empresarial.',
    tags: ['PL-600 Arq.', 'Fit/Gap Analysis', 'Seguridad & DLP', 'Progreso Guardado'],
    bloques: '8 módulos · Nivel Avanzado y Certificación',
  },

  // ── 15. Documentación y Patrones ────────────────────────────────────────
  {
    id: 'documentacion-patrones-ruta',
    to: '/documentacion-patrones-ruta',
    legacyHref: 'documentacion-patrones-ruta.html',
    category: 'dev',
    categoryLabel: 'Arquitectura & Dev',
    color: '#0284c7',
    colorSoft: 'rgba(2, 132, 199, 0.12)',
    icon: '📐',
    num: 'Guía 15',
    badge: 'Patrones Cloud',
    title: 'Documentación & Patrones Cloud',
    description:
      'Metodología para documentar sistemas mantenibles: registros de decisión de arquitectura (ADR), diagramas C4 y patrones cloud para Power Platform.',
    tags: ['ADR Decisions', 'Plantillas README', 'Diagramas Cloud', 'Mantenibilidad'],
    bloques: '8 módulos + 2 plantillas listas para copiar',
  },

  // ── 16. Refactorización & Patrones ──────────────────────────────────────
  {
    id: 'refactoring-guru-ruta',
    to: '/refactoring-guru-ruta',
    legacyHref: 'refactoring-guru-ruta.html',
    category: 'dev',
    categoryLabel: 'Arquitectura & Dev',
    color: '#f43f5e',
    colorSoft: 'rgba(244, 63, 94, 0.12)',
    icon: '🧹',
    num: 'Guía 16',
    badge: 'Clean Code',
    title: 'Refactorización & Patrones GoF',
    description:
      'Guía de código limpio: detección de malos olores (Code Smells), técnicas de refactorización segura y catálogo de patrones creacionales y estructurales.',
    tags: ['Code Smells', 'Refactor Seguro', 'Patrones GoF', 'Progreso Guardado'],
    bloques: '8 módulos · Principios de Diseño Sólido',
  },

  // ── 17. TypeScript & Vitest ─────────────────────────────────────────────
  {
    id: 'typescript-vitest',
    to: '/typescript-vitest',
    legacyHref: 'typescript-vitest.html',
    category: 'dev',
    categoryLabel: 'Arquitectura & Dev',
    color: '#6366f1',
    colorSoft: 'rgba(99, 102, 241, 0.12)',
    icon: '🧪',
    num: 'Guía 17',
    badge: 'TDD & Terminal',
    title: 'TypeScript Pro & Vitest TDD',
    description:
      'Tipado estricto, alias @/*, mocks avanzados, Fake Timers, simulador interactivo de comandos de terminal y 5 retos TDD con progreso persistente.',
    tags: ['TypeScript Pro', 'Vitest & Mocks', 'Simulador Terminal', '5 Retos TDD'],
    bloques: '7 partes · 5 retos prácticos + Quality Gate',
  },

  // ── 18. Power Apps Alto Volumen ─────────────────────────────────────────
  {
    id: 'power-apps-alto-volumen',
    to: '/power-apps-alto-volumen',
    legacyHref: 'guia_interactiva_power_apps_alto_volumen.html',
    category: 'power-platform',
    categoryLabel: 'Power Platform',
    color: '#9333ea',
    colorSoft: 'rgba(147, 51, 234, 0.12)',
    icon: '🚀',
    num: 'Guía 18',
    badge: '+5.000 Filas',
    title: 'Power Apps: Alto Volumen (+5K)',
    description:
      'Patrones avanzados en Power Fx para listas masivas sin problemas de delegación. Diagrama de flujo interactivo, generador Concurrent() y auditor OData.',
    tags: ['Sin Delegación', 'SharePoint Lists', 'Concurrent()', 'Auditor en Vivo'],
    bloques: '6 herramientas interactivas integradas',
  },
]
