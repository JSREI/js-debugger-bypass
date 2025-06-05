/**
 * 全局Window对象访问工具
 * 
 * 在不同环境中统一获取Window对象的方法，优先使用油猴环境的unsafeWindow，
 * 不可用时回退到标准window对象。
 */

/**
 * 声明油猴脚本的unsafeWindow类型
 */
declare const unsafeWindow: Window & typeof globalThis;

/**
 * 获取全局Window对象
 * 
 * 在油猴脚本中，直接使用window对象只能访问到脚本自身的沙箱环境，
 * 而不是页面的全局环境。该函数会优先返回unsafeWindow以访问页面的
 * 真实全局对象，当unsafeWindow不存在时（如非油猴环境）则回退到普通
 * window对象。
 * 
 * 使用场景：
 * 1. 需要修改页面全局函数（如eval、setTimeout等）
 * 2. 需要访问或修改页面中的全局变量
 * 3. 需要在油猴和非油猴环境共用代码时
 * 
 * 使用示例：
 * ```typescript
 * // 替换全局eval函数
 * const win = getWindow();
 * const originalEval = win.eval;
 * win.eval = function(...args) {
 *   // 自定义逻辑...
 *   return originalEval.apply(this, args);
 * };
 * ```
 * 
 * @returns {Window} 返回可用的Window全局对象（优先返回unsafeWindow）
 */
export function getWindow(): Window & typeof globalThis {
    try {
        // 检查unsafeWindow是否存在且可用
        if (typeof unsafeWindow !== 'undefined') {
            // 简单测试unsafeWindow是否真的可用
            unsafeWindow.Object;
            return unsafeWindow;
        }
    } catch (e) {
        console.warn('unsafeWindow不可用，回退到标准window对象');
    }
    
    // 回退到标准window对象
    return window;
}

/**
 * 判断当前是否处于油猴脚本环境
 * 
 * 通过检查unsafeWindow和GM_info是否存在来判断
 * 
 * @returns {boolean} 如果是油猴环境则返回true，否则返回false
 */
export function isTampermonkeyEnvironment(): boolean {
    try {
        return typeof unsafeWindow !== 'undefined' && 
               // @ts-ignore - GM_info属于油猴API，可能在类型定义中不存在
               typeof GM_info !== 'undefined';
    } catch (e) {
        return false;
    }
} 