// Configuration de Vite.js pour un projet React

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.webp'], // permet à Vite d’inclure les fichiers .webp dans le bundle
  plugins: [react()],
})
