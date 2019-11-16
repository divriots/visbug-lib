import resolve  from 'rollup-plugin-node-resolve'
import postcss  from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace'

export default {
  input: 'app/npm.js',
  output: {
    name:       'visbug',
    file:       'npm.js',
    format:     'es',
    sourcemap:  'inline',
  },
  plugins: [
    replace({
      delimiters: ['', ''],
      "import $ from 'blingblingjs'": "import $$ from 'blingblingjs';const $ = (query, $context = document) => query && query.nodeType !== undefined ? $$([query], $context) : $$(query, $context);"
    }),
    resolve({
      jsnext: true,
    }),
    postcss({
      extract: false,
      inject:  false,
    }),
  ],
  watch: {
    exclude: ['node_modules/**'],
  },
  external: Object.keys(require('./package.json').dependencies)
}