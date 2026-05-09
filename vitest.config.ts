import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['content/**/*.ts'],
      exclude: ['content/**/*.d.ts', 'content/**/data.ts'],
      reporter: ['html', 'lcov'],
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
