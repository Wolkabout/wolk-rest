import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

const pkg = require('./package.json');
const libraryName = pkg.name;
const external = Object.keys(pkg.dependencies) || [];

export default [
  /* wolk-rest.js and wolk-rest.es.js */
  {
    external,
    input: `src/${libraryName}.ts`,
    watch: {
      include: 'src/**'
    },
    output: [
      {
        format: 'es',
        file: pkg.module,
        sourcemap: true,
        globals: external
      },
      {
        format: 'cjs',
        file: `dist/${libraryName}.js`,
        sourcemap: true,
        globals: external
      }
    ],
    plugins: [
      json(),
      typescript({
        typescript: require('typescript')
      }),
      resolve(),
      commonjs(),
      sourceMaps()
    ]
  },

  /* wolk-rest.umd.js - Browser */
  {
    input: `src/${libraryName}.ts`,
    watch: {
      include: 'src/**'
    },
    output: {
      format: 'umd',
      file: pkg.main,
      name: `dist/${libraryName}.umd.js`,
      sourcemap: true
    },
    plugins: [
      json(),
      typescript({
        typescript: require('typescript')
      }),
      globals(),
      builtins(),
      resolve({ browser: true }),
      commonjs(),
      sourceMaps()
    ]
  }
];
