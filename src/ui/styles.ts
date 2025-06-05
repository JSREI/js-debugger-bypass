/**
 * UI样式模块
 * 
 * 提供统一的样式变量和基础样式工具
 */

/**
 * UI主题配色
 */
export const colors = {
    primary: '#3498db',    // 主色调
    secondary: '#2ecc71',  // 次要色调
    danger: '#e74c3c',     // 危险色
    warning: '#f39c12',    // 警告色
    success: '#27ae60',    // 成功色
    dark: '#34495e',       // 深色
    light: '#ecf0f1',      // 浅色
    white: '#ffffff',      // 白色
    gray: '#95a5a6',       // 灰色
    lightGray: '#f5f5f5',  // 浅灰色
    darkGray: '#7f8c8d',   // 深灰色
    lightBlue: '#d6eaf8',  // 浅蓝色
    black: '#2c3e50'       // 黑色
};

/**
 * 边框样式
 */
export const borders = {
    radius: '4px',         // 默认圆角
    width: '1px',          // 默认边框宽度
    style: 'solid'         // 默认边框样式
};

/**
 * 阴影样式
 */
export const shadows = {
    tiny: '0 1px 2px rgba(0,0,0,0.05)',
    small: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    medium: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    large: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
};

/**
 * 字体样式
 */
export const fonts = {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    size: {
        small: '12px',
        normal: '14px',
        large: '16px',
        xlarge: '20px',
        heading: '18px'
    },
    weight: {
        normal: '400',
        medium: '500',
        bold: '700'
    }
};

/**
 * 间距
 */
export const spacing = {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
};

/**
 * Z轴层级
 */
export const zIndex = {
    modal: 1000,
    overlay: 900,
    dropdown: 800,
    header: 700,
    footer: 600
};

/**
 * 动画与过渡
 */
export const transitions = {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
    easing: 'ease-in-out'
};

/**
 * 重置样式，用于覆盖页面原有样式
 * 确保插件UI不受页面样式影响
 */
export const resetCSS = `
.js-debugger-bypass * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${fonts.family};
    font-size: ${fonts.size.normal};
    line-height: 1.5;
    color: ${colors.dark};
}

.js-debugger-bypass button {
    cursor: pointer;
    border: none;
    background: none;
    outline: none;
}

.js-debugger-bypass input,
.js-debugger-bypass textarea,
.js-debugger-bypass select {
    outline: none;
    font-family: inherit;
    font-size: inherit;
}
`;

/**
 * 生成CSS样式字符串
 * 
 * @param styles 样式对象，键是选择器，值是样式规则对象
 * @returns CSS样式字符串
 */
export function generateCSS(styles: Record<string, Record<string, string>>): string {
    return Object.entries(styles)
        .map(([selector, rules]) => {
            const cssRules = Object.entries(rules)
                .map(([property, value]) => `    ${property}: ${value};`)
                .join('\n');
            
            return `${selector} {\n${cssRules}\n}`;
        })
        .join('\n\n');
} 