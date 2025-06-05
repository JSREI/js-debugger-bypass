/**
 * 存储模块
 * 
 * 封装油猴脚本的存储API，提供统一的数据存储接口
 */

/**
 * 存储键前缀，用于区分不同插件的存储内容
 */
const STORAGE_PREFIX = 'js_debugger_bypass_';

/**
 * 保存数据到存储
 * 
 * @param key 存储键
 * @param value 要存储的值
 */
export function saveData<T>(key: string, value: T): void {
    const prefixedKey = STORAGE_PREFIX + key;
    try {
        const serializedValue = JSON.stringify(value);
        
        // 使用油猴API保存数据，如果可用
        if (typeof GM_setValue === 'function') {
            GM_setValue(prefixedKey, serializedValue);
        } 
        // 使用localStorage作为备用方案
        else if (typeof localStorage !== 'undefined') {
            localStorage.setItem(prefixedKey, serializedValue);
        }
    } catch (error) {
        console.error(`[存储错误] 无法保存数据 ${key}:`, error);
    }
}

/**
 * 从存储中加载数据
 * 
 * @param key 存储键
 * @param defaultValue 默认值，当存储中没有对应值时返回
 * @returns 存储的值或默认值
 */
export function loadData<T>(key: string, defaultValue: T): T {
    const prefixedKey = STORAGE_PREFIX + key;
    try {
        let serializedValue: string | null = null;
        
        // 尝试从油猴API读取
        if (typeof GM_getValue === 'function') {
            serializedValue = GM_getValue(prefixedKey, null);
        } 
        // 尝试从localStorage读取
        else if (typeof localStorage !== 'undefined') {
            serializedValue = localStorage.getItem(prefixedKey);
        }
        
        // 如果有数据则解析并返回
        if (serializedValue) {
            return JSON.parse(serializedValue) as T;
        }
    } catch (error) {
        console.error(`[存储错误] 无法加载数据 ${key}:`, error);
    }
    
    // 返回默认值
    return defaultValue;
}

/**
 * 从存储中删除数据
 * 
 * @param key 存储键
 */
export function removeData(key: string): void {
    const prefixedKey = STORAGE_PREFIX + key;
    try {
        // 尝试从油猴API删除
        if (typeof GM_deleteValue === 'function') {
            GM_deleteValue(prefixedKey);
        } 
        // 尝试从localStorage删除
        else if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(prefixedKey);
        }
    } catch (error) {
        console.error(`[存储错误] 无法删除数据 ${key}:`, error);
    }
}

/**
 * 检查是否存在指定键的数据
 * 
 * @param key 存储键
 * @returns 是否存在数据
 */
export function hasData(key: string): boolean {
    const prefixedKey = STORAGE_PREFIX + key;
    try {
        // 尝试检查油猴API
        if (typeof GM_listValues === 'function') {
            return GM_listValues().includes(prefixedKey);
        } 
        // 尝试检查localStorage
        else if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(prefixedKey) !== null;
        }
    } catch (error) {
        console.error(`[存储错误] 无法检查数据 ${key}:`, error);
    }
    
    return false;
} 