import VuePlugin from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import async from 'rollup-plugin-async';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

export default {
    external: ['vue', 'vuex', 'axios'],
    input: './src/index.js',
    output: {
        name: 'i-page',
        file: './dist/index.js',
        format: 'umd',
        extend: true,
        globals: {
            vue: 'Vue',
            Vuex: 'Vuex'
        },
    },
    plugins: [
        json(),
        postcss({
            extensions: ['.css'],
        }),
        resolve(),
        VuePlugin(),
        babel({
            exclude: '**.node_modules/**',
            babelHelpers: 'runtime'
        }),
        async(),
        terser(),
        commonjs(),
        filesize(),
    ],
};