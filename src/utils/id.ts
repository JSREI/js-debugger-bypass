/**
 * ID自增发号器，用于生成全局唯一的匿名函数标识符
 * 
 * 说明：
 * 1. 从1开始自增
 * 2. 在整个应用生命周期内保持唯一性
 * 3. 用于标识和追踪匿名函数
 */
let anonymousFuncIdGenerator: number = 1;

/**
 * 生成的匿名函数名称的统一前缀
 * 
 * 说明：
 * 1. 使用特定前缀避免与其他代码生成的标识符冲突
 * 2. 包含项目标识，便于调试时快速识别
 * 3. 前缀中包含用途说明，提高代码可读性
 */
const ANONYMOUS_FUNC_NAME_PREFIX: string = "CC11001100_js_debugger_bypass_anonymous_function_name_";

/**
 * 生成一个全局唯一的匿名函数ID
 * 
 * 功能：
 * 1. 生成带有特定前缀的唯一标识符
 * 2. 自动递增确保唯一性
 * 3. 用于在运行时标识和追踪匿名函数
 * 
 * 使用示例：
 * ```typescript
 * const id1 = generateGlobalUniqId();
 * console.log(id1); // 输出: "CC11001100_js_debugger_bypass_anonymous_function_name_1"
 * 
 * const id2 = generateGlobalUniqId();
 * console.log(id2); // 输出: "CC11001100_js_debugger_bypass_anonymous_function_name_2"
 * ```
 * 
 * @return {string} 返回格式为 `${ANONYMOUS_FUNC_NAME_PREFIX}${自增数字}` 的唯一标识符
 */
export function generateGlobalUniqId(): string {
    return ANONYMOUS_FUNC_NAME_PREFIX + anonymousFuncIdGenerator++;
}

/**
 * 为了向后兼容而保留的别名函数
 * 功能与 generateGlobalUniqId 完全相同
 * 建议在新代码中直接使用 generateGlobalUniqId
 */
export const generateGlobalUniqFunctionName = generateGlobalUniqId; 