/**
 * 获取当前的用户代码位置，用于在调试时快速定位代码位置
 * 
 * 原理：通过分析错误栈信息，找到最后一个非油猴扩展的代码位置
 * 
 * 使用场景：
 * 1. 在调试时需要快速定位代码位置
 * 2. 在日志记录时需要记录代码执行位置
 * 
 * 返回值示例：
 * - "at HTMLButtonElement.<anonymous> (http://example.com/test.js:123:45)"
 * - "at functionName (http://example.com/main.js:67:89)"
 * - 如果未找到匹配位置，返回空字符串 ""
 * 
 * 使用示例：
 * ```typescript
 * const location = getCodeLocation();
 * console.log("当前代码位置:", location);
 * // 输出: 当前代码位置: at doSomething (http://example.com/main.js:100:20)
 * ```
 *
 * @return {string} 返回格式化后的代码位置字符串，如果未找到则返回空字符串
 */
export function getCodeLocation(): string {
    // 获取完整的错误调用栈并按行分割
    const stack: string[] = new Error().stack?.split("\n") || [];
    let last: string = "";
    
    // 从栈底向上遍历，找到最后一个非油猴扩展的代码位置
    for (let i = stack.length - 1; i >= 0; i--) {
        // 油猴扩展的Chrome扩展ID，用作标识符
        // 注意：如果使用其他扩展，需要修改此ID
        if (stack[i].indexOf("dhdgffkkebhmkfjojejmpbldmpobfkfo") !== -1) {
            // 返回上一个非油猴扩展的代码位置，并去除首尾空格
            return last.trim();
        }
        last = stack[i];
    }
    return "";
} 