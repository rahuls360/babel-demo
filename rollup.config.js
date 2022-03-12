import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import brotli from 'rollup-plugin-brotli';
import gzip from 'rollup-plugin-gzip';
import zlib from 'zlib';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
  },
  plugins: [
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    production && terser(), // minify, but only in production
    production && gzip(), // gzip compression
    production &&
      brotli({
        options: {
          params: {
            [zlib.constants.BROTLI_PARAM_MODE]:
              zlib.constants.BROTLI_MODE_GENERIC,
            [zlib.constants.BROTLI_PARAM_QUALITY]: 7, // turn down the quality, resulting in a faster compression (default is 11)
          },
          // ... see all options https://nodejs.org/api/zlib.html#zlib_class_brotlioptions
        },
      }), // brotli compression
  ],
};
