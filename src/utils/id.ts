/**
 * ID自增发号器，避免重复
 */
let anonymousFuncIdGenerator: number = 1;

/**
 * 生成的匿名函数名称都会有这个前缀
 */
const ANONYMOUS_FUNC_NAME_PREFIX: string = "CC11001100_js_debugger_bypass_anonymous_function_name_";

/**
 * 生成一个全局唯一的匿名函数ID
 */
export function generateGlobalUniqId(): string {
    return ANONYMOUS_FUNC_NAME_PREFIX + anonymousFuncIdGenerator++;
}

// 为了向后兼容，保留原来的函数名
export const generateGlobalUniqFunctionName = generateGlobalUniqId; 