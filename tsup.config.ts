import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/**/*'],
  splitting: false,
  sourcemap: true,
  clean: true
});
