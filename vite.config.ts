import { fileURLToPath, URL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    sourcemap: true,
    // Reduce bloat from legacy polyfills.
    // target: 'esnext',
    // Leave minification up to applications.
    minify: false,
    lib: {
      entry: resolve(dirname(fileURLToPath(import.meta.url)), 'src/main.ts'),
      name: 'BitmapEditor',
      // the proper extensions will be added
      fileName: 'vue-bitmap-editor',
      formats: ['es']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', '@fortawesome/fontawesome-free'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    dts({
        tsconfigPath: './tsconfig.app.json',
        rollupTypes: true
    }),
    vue(),
    vueDevTools(),
  ],
})


