const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');
const fs = require('fs');

// 读取用户脚本头部信息
function getUserscriptHeader() {
    // 读取油猴头模板
    let headerTemplate = fs.readFileSync(path.resolve(__dirname, 'userscript-headers.js'), 'utf-8');
    
    // 替换变量
    headerTemplate = headerTemplate.replaceAll('${name}', package.name || '');
    headerTemplate = headerTemplate.replaceAll('${namespace}', package.repository || 'https://github.com/JSREI/js-debugger-bypass');
    headerTemplate = headerTemplate.replaceAll('${version}', package.version || '');
    headerTemplate = headerTemplate.replaceAll('${description}', package.description || '用于拦截掉网页上的无限debugger断点');
    headerTemplate = headerTemplate.replaceAll('${document}', package.document || '');
    headerTemplate = headerTemplate.replaceAll('${author}', package.author || '');
    headerTemplate = headerTemplate.replaceAll('${repository}', package.repository || '');
    
    return headerTemplate;
}

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
                banner: getUserscriptHeader
            }),
            // 保持换行和缩进
            new webpack.LoaderOptionsPlugin({
                debug: true
            })
        ],
        devtool: isDevelopment ? 'source-map' : false
    };
}; 