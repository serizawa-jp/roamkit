import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/App.ts',
  output: [
    {
      file: 'dist/media-timestamper.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ],
  plugins: [typescript()]
};
