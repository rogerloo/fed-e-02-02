import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
export default {
    // input: 'src/index.js',
    // input: [
    //     'src/index.js',
    //     'src/about.js'
    // ],
    input: {
        foo: 'src/index.js',
        bar: 'src/about.js'
    },
    output: {
        // file: 'dist/bundle.js',
        // format: 'iife'
        dir: 'dist',
        format: 'amd'
    },
    plugins: [
        json(),
        resolve(),
        commonjs()
    ]
}