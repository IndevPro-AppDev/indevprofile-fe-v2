import { resolve } from 'node:path'

import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json']
    }),
    paraglide({
      project: './project.inlang',
      outdir: './src/lib/paraglide',
      outputStructure: 'message-modules',
      cookieName: '__app-i18n',
      strategy: ['cookie', 'url', 'preferredLanguage', 'baseLocale']
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
      '~': resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    allowedHosts: ['moccasin-amazing-infinitely.ngrok-free.app']
  }
})
