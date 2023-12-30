/**
 * 这个文件主要存放对js代码进行净化的逻辑，用于把debugger代码过滤掉
 */

const {generateGlobalUniqId} = require("../utils/id");
const {getCodeLocation} = require("../utils/code-location");
const {debuggerMetricManager} = require("../metric/debugger-metric-manager");

/**
 * 替换参数中的debugger
 *
 * @param debuggerType 被拦截的debugger类型
 * @param argumentsArray 要被清洗的参数数组，这个数组中可能会存在debugger断点之类的
 */
function pureArguments(debuggerType, argumentsArray) {
    for (let i = 0; i < argumentsArray.length; i++) {
        try {
            argumentsArray[i] = pureObject(debuggerType, argumentsArray[i]);
        } catch (e) {
            console.error(e);
        }
    }
}

/**
 *
 *
 * @param debuggerType
 * @param object
 * @returns {any|Function|string}
 */
function pureObject(debuggerType, object) {
    if (typeof object === "string") {
        return pureString(debuggerType, object);
    } else if (typeof object === "function") {
        return pureFunction(debuggerType, object);
    } else {
        return object;
    }
}

/**
 * 把字符串中的所有debugger都抹除掉，不让它有机会执行
 *
 * @param debuggerType
 * @param s
 * @returns {*}
 */
function pureString(debuggerType, s) {
    return s.replace(/debugger/gi, function () {
        const codeLocation = getCodeLocation();
        debuggerMetricManager.reportDebuggerMetric(debuggerType, codeLocation);
        return "";
    });
}

/**
 *
 * 函数类型的，就先获取函数的代码，检查并抹掉代码中的debugger字样，然后再重新构造函数来执行
 *
 * @param debuggerType 拦截到的hook的类型
 * @param func 函数的指针
 */
function pureFunction(debuggerType, func) {
    const funcJsCode = func.toString();
    let puredFuncJsCode = pureString(debuggerType, funcJsCode);
    if (funcJsCode === puredFuncJsCode) {
        // 没有发生变化，说明函数本身就是没问题的，则保持原样不尝试修改
        return func;
    } else {
        // 给函数一个随机的名字，替换掉原来的函数
        puredFuncJsCode = puredFuncJsCode.replace(/^function\(\)/, `function ${generateGlobalUniqId()}()`);
        return functionHolder(puredFuncJsCode);
    }
}

module.exports = {
    pureArguments
}


