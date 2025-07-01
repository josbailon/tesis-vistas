/**
 * CONFIGURACIÓN DE VITE PARA VUE.JS
 *
 * Este archivo configura Vite como bundler para la aplicación Vue.js
 * Incluye configuraciones para desarrollo, build y optimizaciones.
 */

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

/**
 * CONFIGURACIÓN PRINCIPAL DE VITE
 *
 * https://vitejs.dev/config/
 */
export default defineConfig({
  /**
   * PLUGINS DE VITE
   * 
   * Lista de plugins que extienden la funcionalidad de Vite
   */
  plugins: [
    // Plugin oficial de Vue para Vite
    vue({
      // Configuraciones específicas del plugin Vue
      template: {
        compilerOptions: {
          // Configuraciones del compilador de templates Vue
          isCustomElement: (tag) => tag.startsWith('ion-')
        }
      }
    })
  ],

  /**
   * RESOLUCIÓN DE RUTAS
   * 
   * Configuración de alias para importaciones más limpias
   */
  resolve: {
    alias: {
      // Alias '@' apunta a la carpeta src
      '@': resolve(__dirname, 'src'),
      // Alias para componentes
      '@components': resolve(__dirname, 'src/components'),
      // Alias para vistas
      '@views': resolve(__dirname, 'src/views'),
      // Alias para stores
      '@stores': resolve(__dirname, 'src/stores'),
      // Alias para assets
      '@assets': resolve(__dirname, 'src/assets'),
      // Alias para utilidades
      '@utils': resolve(__dirname, 'src/utils')
    }
  },

  /**
   * CONFIGURACIÓN DEL SERVIDOR DE DESARROLLO
   * 
   * Opciones para el servidor de desarrollo de Vite
   */
  server: {
    // Puerto del servidor de desarrollo
    port: 3000,
    // Abrir automáticamente en el navegador
    open: true,
    // Host para acceso desde red local
    host: true,
    // Configuración de proxy para APIs (si es necesario)
    proxy: {
      // Ejemplo: proxy para API backend
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },

  /**
   * CONFIGURACIÓN DE BUILD
   * 
   * Opciones para la construcción de producción
   */
  build: {
    // Directorio de salida
    outDir: 'dist',
    // Directorio de assets
    assetsDir: 'assets',
    // Generar sourcemaps para debugging
    sourcemap: false,
    // Configuración de minificación
    minify: 'terser',
    // Opciones del minificador Terser
    terserOptions: {
      compress: {
        // Remover console.log en producción
        drop_console: true,
        drop_debugger: true
      }
    },
    // Configuración de Rollup (bundler subyacente)
    rollupOptions: {
      // Configuración de entrada
      input: {
        main: resolve(__dirname, 'index.html')
      },
      // Configuración de salida
      output: {
        // Configuración de chunks
        manualChunks: {
          // Separar vendor libraries en chunk separado
          vendor: ['vue', 'vue-router', 'pinia'],
          // Separar iconos en chunk separado
          icons: ['lucide-vue-next']
        },
        // Configuración de nombres de archivos
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Tamaño máximo de chunk antes de warning
    chunkSizeWarningLimit: 1000
  },

  /**
   * CONFIGURACIÓN DE CSS
   * 
   * Opciones para procesamiento de CSS
   */
  css: {
    // Configuración de PostCSS
    postcss: {
      plugins: [
        // Tailwind CSS
        require('tailwindcss'),
        // Autoprefixer para compatibilidad de navegadores
        require('autoprefixer')
      ]
    },
    // Configuración de preprocesadores
    preprocessorOptions: {
      scss: {
        // Variables globales SCSS (si se usan)
        additionalData: `@import "@/assets/styles/variables.scss";`
      }
    }
  },

  /**
   * CONFIGURACIÓN DE OPTIMIZACIÓN
   * 
   * Optimizaciones para mejorar el rendimiento
   */
  optimizeDeps: {
// Incluir dependencias para
