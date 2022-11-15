import dotenv from 'dotenv'
import expandDotenv from 'dotenv-expand'
import { homedir } from 'os'
import fs from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'

const env = expandDotenv.expand(dotenv.config()).parsed
const certPath = resolve(homedir(), env.VITE_CERTPATH)

export default defineConfig(({ command }) => {
  let secureServer = false

  if (command === 'serve') {
    secureServer = {
      https: {
        key: fs.readFileSync(
          resolve(certPath, `${env.VITE_DOMAIN}.key`)
        ),
        cert: fs.readFileSync(
          resolve(certPath, `${env.VITE_DOMAIN}.crt`)
        ),
      },
      host: env.VITE_DOMAIN,
    }
  }
  return {
    plugins: [
      laravel({
        input: 'resources/js/app.js',
        refresh: true,
        valetTls: 'glide.test',
      }),
      vue({
        template: {
          transformAssetUrls: {
            base: null,
            includeAbsolute: false,
          },
        },
      }),
    ],
    resolve: {
      alias: {
        ziggy: resolve(
          __dirname,
          'vendor/tightenco/ziggy/dist/vue.m.js'
        ),
        zora: resolve(
          __dirname,
          'vendor/jetstreamlabs/zora/dist/vue.js'
        ),
        'zora-js': resolve(
          __dirname,
          'vendor/jetstreamlabs/zora/dist/index.js'
        ),
      },
    },
    server: secureServer,
  }
})
