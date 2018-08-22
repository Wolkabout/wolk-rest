import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';


export default {
  /**
   * @param {string} input - Where to look for code to bundle. This is similar to Webpack’s entry.
   */
  input: 'src/index.ts',
  /**
   * @param {string} output - Where our bundle gets stored.
   */
  output: [
    {
      // CommonJS -Idiosyncratic legacy format that served as a stopgap solution before ES modules had been proposed.
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
  /**
   * What modules should be excluded from our bundle
   */
  external: [
    // pkg.dependencies will get installed by the module consumer’s Yarn/Npm
    ...Object.keys(pkg.dependencies || {}),
    // pkg.peerDependencies are expected to be installed by the consumer
    // ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [

    /**
     * https://github.com/ezolenko/rollup-plugin-typescript2
     * When typescript version installed by the plugin (latest 2.x) is unacceptable,
     * you can import your own typescript module and pass it in as typescript: require("typescript").
     * Must be 2.0+
     */
    typescript({
      tsconfig: "tsconfig.app.json",
      typescript: require('typescript'),
    })
    /** If problems occure with resolving modules in builded app, use this.
     import resolve from 'rollup-plugin-node-resolve';
     import commonjs from 'rollup-plugin-commonjs';
     resolve({
       preferBuiltins: false,
       jsnext: true,
       main: true,
       browser: true}),
     commonjs()*/
  ]
}
