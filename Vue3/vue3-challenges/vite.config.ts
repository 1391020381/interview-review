import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import preload from "vite-plugin-preload";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // manualChunks 配置
        manualChunks: {
          // 将 React 相关库打包成单独的 chunk 中
          'vue-vendor': ['vue', 'vue-router'],
          // // 将 Lodash 库的代码单独打包
          // 'lodash': ['lodash-es'],
          // // 将组件库的代码打包
          // 'library': ['antd', '@arco-design/web-react'],
        },
      },
    }
  },
  plugins: [vue(),preload()],
})
