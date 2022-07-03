import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import { writeFileSync } from 'fs'
import federation from '@originjs/vite-plugin-federation'
import pkg from './package.json'

console.log(process.env.VITE_APP_COMP_HOST);
// https://vitejs.dev/config/
export default defineConfig({
  // base: `${process.env.NODE_ENV === 'production' ? 'http://liuwenjian.cn' : ''}/app3/`,
  base: process.env.NODE_ENV === 'production' ? 'http://liuwenjian.cn:8003/' : '/app3/',
  server: {
    port: 8003
  },
  cacheDir: "node_modules/.cacheDir",
  plugins: [
    vue(),
    federation({
      name: 'app3',
      filename: 'remoteEntry.js',
      remotes: {
        comp: {
          external: `${process.env.NODE_ENV === 'production' ? 'http://liuwenjian.cn:8010' : 'http://localhost:8010'}/remoteEntry.js`,
          format: 'var'
          // from: 'webpack'
        },
        shared: [{
          vue: {
            singleton: true,
            requiredVersion: pkg.dependencies.vue
          }
        }]
      }
    }),
    (function() {
      let basePath = ''
      return {
        name: "vite:micro-app",
        apply: 'build',
        configResolved(config) {
          basePath = `${config.base}${config.build.assetsDir}/`
        },
        writeBundle (options, bundle) {
          for (const chunkName in bundle) {
            if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
              const chunk = bundle[chunkName]
              if (chunk.fileName && chunk.fileName.endsWith('.js')) {
                chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
                  return all.replace($3, new URL($3, basePath))
                })
                const fullPath = join(options.dir, chunk.fileName)
                writeFileSync(fullPath, chunk.code)
              }
            }
          }
        }
      }
    })()
  ]
})
