import { URL, fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const resolveSrc = (pkg: string) =>
  fileURLToPath(new URL(`../../${pkg}/src/index.ts`, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 直接消费源码，HMR 即时生效，并保证 sdk-core 单例
    alias: {
      '@footprintjs/sdk-core': resolveSrc('sdk-core'),
    },
    dedupe: ['react', 'react-dom'],
  },
})
