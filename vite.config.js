import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import purgecss from 'vite-plugin-purgecss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    purgecss({
      content: ['./src/**/*.vue', './src/**/*.html']
    })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
