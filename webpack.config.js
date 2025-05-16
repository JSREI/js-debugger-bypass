const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');

// 用户脚本的元数据
const userscriptHeader = `// ==UserScript==
// @name         js-debugger-bypass
// @namespace    https://github.com/JSREI/js-debugger-bypass
// @version      ${package.version}
// @description  用于拦截掉网页上的无限debugger断点
// @author       CC11001100
// @match        *://*/*
// @grant        none
// @license      MIT
// ==/UserScript==

`;

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    return {
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js-debugger-bypass.user.js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        optimization: {
            // 禁用代码压缩
            minimize: false
        },
        plugins: [
            // 添加用户脚本头部信息
            new webpack.BannerPlugin({
                raw: true,
                banner: userscriptHeader
            }),
            // 保持换行和缩进
            new webpack.LoaderOptionsPlugin({
                debug: true
            })
        ],
        devtool: isDevelopment ? 'source-map' : false
    };
}; 