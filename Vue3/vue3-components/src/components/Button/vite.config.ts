import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import packageJson from './package.json'
export default defineConfig({
  plugins:[vue()],
  build: {
    outDir:path.resolve(__dirname, '../../../dist/Button'),
    lib: {
      entry: path.resolve(__dirname, './Button.vue'),
      name: `${packageJson.name}`,
      fileName: (format:any) => `${packageJson.name}.${packageJson.version}.${format}.js`
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
})