import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // manualChunks 配置
        manualChunks: {
          // 将 React 相关库打包成单独的 chunk 中
          'react-vendor': ['react', 'react-dom'],
          // 将组件库的代码打包
          'guang-components': ['../guang-components/dist/esm-0.01'],
        },
      },
    }
  },
  plugins: [react(),legacy({
    targets:['defaults', 'not IE 11']
  })],
})
