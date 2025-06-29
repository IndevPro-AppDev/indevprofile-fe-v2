import { resolve } from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json']
    }),
    tanstackStart({
      react: {
        babel: {
          plugins: [['babel-plugin-react-compiler', {}]]
        }
      },
      target: 'netlify'
    }),
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      external: ['@tanstack/react-start/server']
    }
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000
  }
})
