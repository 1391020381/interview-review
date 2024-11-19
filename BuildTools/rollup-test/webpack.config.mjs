import path from 'node:path';

/** @type {import("webpack").Configuration} */
export default {
    entry: './src/index.js',
    mode: 'development',
    devtool: false,
    output: {
        path: path.resolve(import.meta.dirname, 'dist2'),
        filename: 'bundle.js',
        libraryTarget: 'commonjs2'
    }
};
