import { defineConfig } from 'tsup'
export default defineConfig((options) => {
  // npx tsup --env.NODE_ENV production
  // const { NODE_ENV } = options.env;
  return {
    entry: ['index.tsx'],
    format:'esm',
    sourcemap: true,
    clean: true,
    // minify: NODE_ENV === 'production',
    treeshake:true,
    shims:true,
    dts: true,
    
  }
})