import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const resolveSrc = (pkg: string) =>
  fileURLToPath(new URL(`../../${pkg}/src/index.ts`, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 直接消费源码而非过期 dist：HMR 即时生效，且保证 sdk-core 单例
    // （否则 dist 与 src 各持一份 getCurrentTrackTask 单例 → 当前页面任务对不上）
    alias: {
      '@footprintjs/sdk-core': resolveSrc('sdk-core'),
      '@footprintjs/sdk-vue': resolveSrc('sdk-vue'),
      '@footprintjs/sdk-vue3': resolveSrc('sdk-vue3'),
    },
    // SDK 源码内的 `import 'vue'` 走 peerDep，强制复用 example 的 vue，避免多实例
    dedupe: ['vue', 'vue-router'],
  },
})
