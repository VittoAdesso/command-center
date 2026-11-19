import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue({
      template: {
        // Conserva los espacios del HTML original (Vue los "condensa" por defecto
        // y eso cambiaría el espaciado entre enlaces y textos en línea).
        compilerOptions: { whitespace: 'preserve' },
      },
    }),
    tailwindcss(),
  ],
  build: {
    // Las guías grandes (PAD Ninja ~370 KB de contenido) superan el aviso por defecto.
    chunkSizeWarningLimit: 1200,
  },
})
