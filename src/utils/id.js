/**
 * ID自增发号器，避免重复
 *
 * @type {number}
 */
let anonymousFuncIdGenerator = 1;

/**
 * 生成的匿名函数名称都会有这个前缀
 * @type {string}
 */
const ANONYMOUS_FUNC_NAME_PREFIX = "CC11001100_js_debugger_bypass_anonymous_function_name_";

/**
 * 生成一个全局唯一的匿名函数ID
 * @returns {string}
 */
function generateGlobalUniqFunctionName() {
    return ANONYMOUS_FUNC_NAME_PREFIX + anonymousFuncIdGenerator++;
}

module.exports = {
    generateGlobalUniqFunctionName,
}

