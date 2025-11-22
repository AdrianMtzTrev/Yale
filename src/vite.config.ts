import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Base path para GitHub Pages
  // Repositorio: https://github.com/AdrianMtzTrev/Yaleremake
  // Configuración lista para deploy
  // Usando './' para rutas relativas (funciona mejor en GitHub Pages)
  base: './',
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      'figma:asset': path.resolve(__dirname, './assets')
    },
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Optimizaciones para producción
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  
  server: {
    port: 3000,
    open: true
  }
})
