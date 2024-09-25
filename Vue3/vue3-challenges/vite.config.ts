import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import preload from "vite-plugin-preload";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),preload()],
})
