/**
 * UI核心模块
 * 
 * 提供基础的DOM操作和通用工具函数，用于创建和管理UI组件
 */

/**
 * 创建DOM元素
 * 
 * @param tag 元素标签名
 * @param attributes 元素属性
 * @param children 子元素或文本内容
 * @returns 创建的DOM元素
 */
export function createElement(
    tag: string,
    attributes: Record<string, string> = {},
    children: (HTMLElement | string)[] = []
): HTMLElement {
    const element = document.createElement(tag);
    
    // 设置属性
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else {
            element.setAttribute(key, value);
        }
    });
    
    // 添加子元素
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    });
    
    return element;
}

/**
 * 将HTML字符串转换为DOM元素
 * 
 * @param html HTML字符串
 * @returns 创建的DOM元素
 */
export function createElementFromHTML(html: string): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = html.trim();
    
    // 返回第一个子元素
    return div.firstChild as HTMLElement;
}

/**
 * 为元素添加CSS样式
 * 
 * @param element 目标元素
 * @param styles 样式对象
 */
export function applyStyles(element: HTMLElement, styles: Record<string, string>): void {
    Object.entries(styles).forEach(([key, value]) => {
        // @ts-ignore - 动态设置样式属性
        element.style[key] = value;
    });
}

/**
 * 在文档中注入CSS样式
 * 
 * @param css CSS样式文本
 * @param id 样式标签的ID（可选）
 */
export function injectCSS(css: string, id?: string): HTMLStyleElement {
    const style = document.createElement('style');
    style.textContent = css;
    
    if (id) {
        style.id = id;
    }
    
    document.head.appendChild(style);
    return style;
}

/**
 * 简单的事件绑定函数
 * 
 * @param element 目标元素
 * @param eventType 事件类型
 * @param handler 事件处理函数
 */
export function on(
    element: HTMLElement | Document | Window,
    eventType: string,
    handler: EventListenerOrEventListenerObject
): void {
    element.addEventListener(eventType, handler);
}

/**
 * 移除事件绑定
 * 
 * @param element 目标元素
 * @param eventType 事件类型
 * @param handler 事件处理函数
 */
export function off(
    element: HTMLElement | Document | Window,
    eventType: string,
    handler: EventListenerOrEventListenerObject
): void {
    element.removeEventListener(eventType, handler);
}

/**
 * 生成唯一ID
 * 
 * @returns 唯一ID字符串
 */
export function generateId(): string {
    return 'js_debugger_bypass_' + Math.random().toString(36).substring(2, 11);
} 