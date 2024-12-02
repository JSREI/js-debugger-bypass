/**
 * 如果已经被hook过的话，会在对象上设置这个属性为true用于标识防止重复hook
 *
 * @type {string}
 */
export const ALREADY_HOOK_FLAG_ATTRIBUTE_NAME = "CC11001100_js_debugger_bypass_already_hook";

/**
 * 判断对象是否已经被Hook过
 *
 * @param object
 */
export function isAlreadyHook(object) {
    if (!object) {
        return false;
    }
    return object[ALREADY_HOOK_FLAG_ATTRIBUTE_NAME] === true;
}

/**
 * 设置对象已经被Hook过的标识符
 *
 * @param object
 */
export function setAlreadyHook(object) {
    if (!object) {
        return;
    }
    object[ALREADY_HOOK_FLAG_ATTRIBUTE_NAME] = true;
}



