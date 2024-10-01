import { defineConfig } from 'tsup';
import postcss from 'rollup-plugin-postcss';
import less from 'rollup-plugin-less';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  sourcemap: true,
  minify: false,
  target: 'es2019',
  dts: true,
  external: ['react', 'react-dom'],
  plugins: [
    // less(),
    // postcss({
    //   extract: true,
    //   minimize: true,
    //   sourceMap: true,
    // }),
  ],
});