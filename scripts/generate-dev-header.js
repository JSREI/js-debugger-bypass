/**
 * 生成开发用油猴头文件脚本
 * 
 * 功能：
 * 1. 读取原始油猴头模板
 * 2. 替换其中的变量为实际值
 * 3. 添加@require行引用本地dist/index.js文件
 * 4. 输出到dist/index-dev.js文件
 */

const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

// 确保dist目录存在
const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 读取油猴头模板
let headerTemplate = fs.readFileSync(path.resolve(__dirname, '../userscript-headers.js'), 'utf-8');

// 替换变量
headerTemplate = headerTemplate.replaceAll('${name}', packageJson.name || '');
headerTemplate = headerTemplate.replaceAll('${namespace}', packageJson.namespace || '');
headerTemplate = headerTemplate.replaceAll('${version}', packageJson.version || '');
headerTemplate = headerTemplate.replaceAll('${description}', packageJson.description || '');
headerTemplate = headerTemplate.replaceAll('${document}', packageJson.document || '');
headerTemplate = headerTemplate.replaceAll('${author}', packageJson.author || '');
headerTemplate = headerTemplate.replaceAll('${repository}', packageJson.repository || '');

// 获取项目根目录的绝对路径
const projectRoot = path.resolve(__dirname, '..');

// 在==/UserScript==前添加@require行
const requireLine = `// @require      file://${projectRoot}/dist/js-debugger-bypass.user.js\n`;
headerTemplate = headerTemplate.replace('// ==/UserScript==', `${requireLine}// ==/UserScript==`);

// 写入开发用油猴头文件
fs.writeFileSync(path.resolve(distDir, 'userscript-headers-dev.js'), headerTemplate);

console.log('开发用油猴头文件已生成：dist/userscript-headers-dev.js'); 