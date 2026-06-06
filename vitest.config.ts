import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const resolveSrc = (pkg: string) =>
  fileURLToPath(new URL(`./packages/${pkg}/src/index.ts`, import.meta.url))

export default defineConfig({
  resolve: {
    // 跨包测试直接走源码，保证 sdk-core 单例（dist 尚未构建时也能测）
    alias: {
      '@footprintjs/sdk-core': resolveSrc('sdk-core'),
      '@footprintjs/sdk-vue': resolveSrc('sdk-vue'),
    },
  },
  test: {
    globals: true,
    // 曝光指令依赖 DOM / IntersectionObserver / MutationObserver，统一用 happy-dom
    environment: 'happy-dom',
    include: ['packages/sdk-*/src/**/*.{test,spec}.ts'],
  },
})
