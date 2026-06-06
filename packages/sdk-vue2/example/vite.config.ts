import { URL, fileURLToPath } from 'node:url'
import vue2 from '@vitejs/plugin-vue2'
import { defineConfig } from 'vite'

const resolveSrc = (pkg: string) =>
  fileURLToPath(new URL(`../../${pkg}/src/index.ts`, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue2()],
  resolve: {
    // 直接消费源码，HMR 即时生效，并保证 sdk-core 单例
    alias: {
      '@footprintjs/sdk-core': resolveSrc('sdk-core'),
      '@footprintjs/sdk-vue': resolveSrc('sdk-vue'),
    },
    dedupe: ['vue', 'vue-router'],
  },
})
