import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
  splitting: false
});
