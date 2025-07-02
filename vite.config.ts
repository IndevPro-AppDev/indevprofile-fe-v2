import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    paraglide({
      project: './project.inlang',
      outdir: './src/paraglide',
      cookieName: '__app-i18n',
      strategy: ['cookie', 'url', 'preferredLanguage', 'baseLocale']
    }),
    tsConfigPaths({
      projects: ['./tsconfig.json']
    }),
    tanstackStart({
      react: {
        babel: {
          plugins: [['babel-plugin-react-compiler', {}]]
        }
      },
      target: 'vercel'
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    allowedHosts: ['moccasin-amazing-infinitely.ngrok-free.app']
  }
})
