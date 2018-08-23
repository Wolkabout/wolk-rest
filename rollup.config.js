import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      // CommonJS - Legacy format
      file: pkg.main,
      format: 'cjs',
    },
    {
      /**
       * ES modules allow static analysis that enables optimizations like tree-shaking,
       * and provide advanced features like circular references and live bindings.
       */
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    // pkg.dependencies will get installed by the module consumer’s Yarn/Npm
    ...Object.keys(pkg.dependencies || {}),
    // pkg.peerDependencies are expected to be installed by the consumer
    // ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
      typescript: require('typescript'),
    })
  ]
}
