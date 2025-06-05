/**
 * Hook标记模块
 * 用于管理和标识已经被Hook过的函数或对象
 * 
 * 实现原理：
 * - 在被Hook的对象上添加特定的属性标记
 * - 使用独特的属性名避免冲突
 * - 通过检查该属性判断是否已Hook
 */

/**
 * Hook标记属性名
 * 
 * 说明：
 * 1. 使用特定前缀（CC11001100）避免与其他代码冲突
 * 2. 属性名具有描述性，方便调试和维护
 * 3. 在对象上设置此属性为true表示已被Hook
 * 
 * 使用场景：
 * ```javascript
 * obj[ALREADY_HOOK_FLAG_ATTRIBUTE_NAME] = true;  // 标记对象已被Hook
 * ```
 */
export const ALREADY_HOOK_FLAG_ATTRIBUTE_NAME = "JSREI_js_debugger_bypass_already_hook";

/**
 * 判断对象是否已经被Hook过
 * 
 * 实现逻辑：
 * 1. 首先检查对象是否存在
 * 2. 然后检查对象上是否有Hook标记属性
 * 3. 确认属性值是否为true
 * 
 * 参数说明：
 * @param object {any} 要检查的对象，可以是函数、原型对象等任何类型
 * 
 * 返回值：
 * @return {boolean} 如果对象已被Hook返回true，否则返回false
 * 
 * 使用示例：
 * ```typescript
 * if (isAlreadyHook(window.eval)) {
 *     console.log("eval已经被Hook过了");
 * }
 * ```
 */
export function isAlreadyHook(object: any): boolean {
    // 如果对象不存在，则返回false
    if (!object) {
        return false;
    }
    // 检查对象上的Hook标记
    return object[ALREADY_HOOK_FLAG_ATTRIBUTE_NAME] === true;
}

/**
 * 设置对象已经被Hook过的标识符
 * 
 * 功能：
 * 1. 在对象上添加Hook标记
 * 2. 防止重复Hook同一个对象
 * 
 * 参数说明：
 * @param object {any} 要标记的对象，通常是已经被Hook的函数或原型对象
 * 
 * 注意事项：
 * 1. 确保对象存在且可写
 * 2. 标记是不可逆的，一旦标记就表示已被Hook
 * 
 * 使用示例：
 * ```typescript
 * const originalFn = window.eval;
 * // Hook处理...
 * setAlreadyHook(originalFn); // 标记eval已被Hook
 * ```
 */
export function setAlreadyHook(object: any): void {
    // 如果对象不存在，则直接返回
    if (!object) {
        return;
    }
    // 设置Hook标记
    object[ALREADY_HOOK_FLAG_ATTRIBUTE_NAME] = true;
} 