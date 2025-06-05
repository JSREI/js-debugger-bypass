/**
 * 油猴(Tampermonkey)API类型定义
 * 
 * 包含用于油猴脚本开发的常用API类型
 */

/**
 * unsafeWindow对象
 * 
 * 它提供了对页面主环境window对象的直接访问，
 * 突破了Tampermonkey脚本的沙箱隔离限制。
 * 
 * 使用unsafeWindow可以直接修改页面中的全局对象、函数和变量，
 * 这对于实现某些需要深度整合到页面的功能（如hook原生函数）非常必要。
 */
declare const unsafeWindow: Window & typeof globalThis;

/**
 * GM_setValue - 保存数据到油猴存储
 */
declare function GM_setValue(key: string, value: any): void;

/**
 * GM_getValue - 从油猴存储获取数据
 */
declare function GM_getValue<T>(key: string, defaultValue?: T): T;

/**
 * GM_deleteValue - 从油猴存储中删除数据
 */
declare function GM_deleteValue(key: string): void;

/**
 * GM_listValues - 获取油猴存储中的所有键名
 */
declare function GM_listValues(): string[];

/**
 * GM_addStyle - 向页面添加CSS样式
 */
declare function GM_addStyle(css: string): HTMLStyleElement;

/**
 * GM_xmlhttpRequest - 发送跨域请求
 */
declare function GM_xmlhttpRequest(details: {
    method: string;
    url: string;
    headers?: Record<string, string>;
    data?: string | FormData;
    onload?: (response: {
        responseText: string;
        status: number;
        statusText: string;
        readyState: number;
        responseHeaders: string;
        finalUrl: string;
    }) => void;
    onerror?: (error: Error) => void;
}): void;

/**
 * GM_registerMenuCommand - 注册油猴菜单命令
 * 
 * @returns 菜单命令ID，可用于注销菜单
 */
declare function GM_registerMenuCommand(name: string, fn: () => void): number;

/**
 * GM_unregisterMenuCommand - 注销油猴菜单命令
 * 
 * @param menuCmdId 要注销的菜单命令ID
 */
declare function GM_unregisterMenuCommand(menuCmdId: number): void;

/**
 * GM_notification - 显示桌面通知
 */
declare function GM_notification(details: {
    text: string;
    title?: string;
    image?: string;
    onclick?: () => void;
    ondone?: () => void;
}): void;

/**
 * GM_log - 写日志到控制台
 */
declare function GM_log(...args: any[]): void;

/**
 * GM_getResourceText - 获取资源文本内容
 */
declare function GM_getResourceText(name: string): string;

/**
 * GM_getResourceURL - 获取资源URL
 */
declare function GM_getResourceURL(name: string): string;

/**
 * Tampermonkey特有API的类型声明
 * 
 * 此文件定义了Tampermonkey提供的特殊API，比如unsafeWindow
 */

/**
 * Tampermonkey存储API
 * 这些API可以用来存储和检索数据
 */
declare function GM_setValue(key: string, value: any): void;
declare function GM_getValue(key: string, defaultValue?: any): any;
declare function GM_deleteValue(key: string): void;
declare function GM_listValues(): string[];

/**
 * 其他常用Tampermonkey API
 */
declare function GM_addStyle(css: string): HTMLStyleElement;
declare function GM_getResourceText(name: string): string;
declare function GM_getResourceURL(name: string): string;
declare function GM_xmlhttpRequest(details: any): void;
declare function GM_registerMenuCommand(name: string, callback: Function, accessKey?: string): number; 