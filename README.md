# Command Center — Proyecto Modular (Vue 3 + Vite + Vue Router + Tailwind CSS)

Versión modularizada del **Centro de Mando** y sus 18 herramientas/guías en una sola aplicación SPA desplegable en Vercel.

## Requisitos y ejecución

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (con recarga en caliente)
npm run dev

# Compilar para producción (genera /dist)
npm run build

# Previsualizar la compilación de producción
npm run preview
```

## Estructura del proyecto

```text
Command-Center/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json                       # Rewrites SPA para despliegue directo en Vercel
└── src/
    ├── main.js                       # Entrada: Vue 3 + Vue Router + fuentes npm + Tailwind
    ├── App.vue                       # RouterView + botón flotante de retorno al Home
    ├── router/
    │   └── index.js                  # 18 rutas + alias .html originales + scrollBehavior
    ├── styles/
    │   ├── fonts.css                 # Fuentes instaladas por npm (@fontsource/*)
    │   └── main.css                  # Tailwind CSS v4 (prefijo tw:) + tokens de tema
    ├── composables/
    │   ├── usePageEnv.js             # Gestiona document.title, clases/atributos en html/body y limpieza
    │   ├── useModuleScript.js        # Ciclo de vida de listeners/IntersectionObservers por módulo
    │   └── useGuiaViva.js            # Lógica compartida por las 5 «Guías vivas»
    ├── components/
    │   ├── HomeCard.vue              # Tarjeta de acceso a módulo en el Home (Tailwind)
    │   └── BackToHome.vue            # Botón discreto «← Centro de Mando» en cada módulo
    ├── data/
    │   └── homeCards.js              # Metadatos de las 18 tarjetas del Centro de Mando
    ├── views/
    │   └── HomeView.vue              # Vista principal (_Centro_de_Mando.html) en Tailwind
    └── modules/
        ├── guias/                    # Familia «Guía viva» (comparten useGuiaViva)
        │   ├── PowerPlatformView.vue
        │   ├── PowerAutomateView.vue
        │   ├── PowerBiView.vue
        │   ├── ExcelView.vue
        │   └── CopilotView.vue       # Usada en /copilot y /desde-cero-copilot
        ├── rutas/                    # Familia de rutas interactivas con progreso
        │   ├── RutaModule.vue        # Componente único compartido (Tailwind)
        │   ├── PowerAppsRutaView.vue
        │   ├── PowerPlatformArquitectoRutaView.vue
        │   ├── DocumentacionPatronesRutaView.vue
        │   ├── RefactoringGuruRutaView.vue
        │   └── data/                 # Arrays M extraídos de cada *-ruta.html
        ├── sap-rpa/
        │   ├── SapRpaView.vue        # Vista SAP y RPA en Tailwind
        │   └── sapRpaData.js
        ├── ts-vitest/                # Manual Pro: TypeScript & Tests Unitarios (Vitest)
        │   ├── TsVitestManualView.vue
        │   ├── CodeBlock.vue         # Resaltador de sintaxis + botón Copiar reactivo
        │   └── tsVitestData.js       # Datos, snippets, archivos IDE, retos y checklist
        ├── power-apps-alto-volumen/  # Power Apps + Lists: Alto Volumen (+5.000 filas)
        │   ├── PowerAppsAltoVolumenView.vue
        │   └── altoVolumenData.js    # Fórmulas Power Fx, auditor, semáforo y checklist
        └── especial/                 # Módulos con diseño e interactividad propios
            ├── ArquitecturaM365View.vue
            ├── BriefingCopilotView.vue
            ├── EspecialistaCopilotView.vue
            ├── PadNinjaView.vue
            └── MigracionUipathView.vue
```

## Cómo añadir un módulo nuevo

### Opción A: Añadir una nueva «Ruta con progreso» (como las 4 `*-ruta.html`)
1. Crea un archivo de datos en `src/modules/rutas/data/miNuevaRutaData.js` exportando `export const M = [ ... ]` con el mismo formato (`t`, `l`, `o`, `k`, `r`, `p`, `q`).
2. Crea la vista `src/modules/rutas/MiNuevaRutaView.vue` envolviendo `<RutaModule title="..." subtitle="..." storage-key="pa-mi-clave" :modules="M">`.
3. Registra la ruta en `src/router/index.js` y añade su tarjeta en `src/data/homeCards.js`.

### Opción B: Añadir una vista o herramienta independiente
1. Crea el componente en `src/modules/<categoria>/MiHerramientaView.vue`.
   - Usa `usePageEnv({ title: '...', htmlClass: ['mod-mi-herramienta'] })` para aislar título y clases de `<html>`/`<body>`.
   - Si registra listeners en `window` o `IntersectionObserver`, envuélvelos en `useModuleScript(rootRef, ({ on, onCleanup }) => { ... })` para que se limpien automáticamente al salir de la ruta.
2. Añade la ruta en `src/router/index.js`:
   ```js
   {
     path: '/mi-herramienta',
     name: 'mi-herramienta',
     component: () => import('../modules/<categoria>/MiHerramientaView.vue'),
   }
   ```
3. Añade un objeto en `src/data/homeCards.js` con `id`, `to: '/mi-herramienta'`, `color`, `colorSoft`, `icon`, `num`, `title`, `description`, `tags` y `bloques`. Aparecerá automáticamente en el Centro de Mando.

## Despliegue en Vercel

El archivo `vercel.json` ya está incluido en la raíz para redirigir todas las rutas al `index.html` de la SPA. Basta con subir este repositorio a GitHub e importarlo en Vercel (detecta automáticamente **Vite**, `npm run build` y el directorio `dist`).
