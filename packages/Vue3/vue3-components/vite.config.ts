import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
export default {
  plugins:[vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'MyComponentLibrary',
      fileName: format => `my-component-library.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
}