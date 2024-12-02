const {pureArguments} = require("../pure/pure");
const {isAlreadyHook, setAlreadyHook} = require("./hook-flag");

/**
 * 这种类型的Hook的标识符
 *
 * @type {string}
 */
const DEBUGGER_TYPE = "eval";

/**
 * 为eval添加Hook，用于拦截 `eval("debugger");` 这种方式执行的debugger
 */
export function addEvalHook() {

    const evalHolder = window.eval;

    if (isAlreadyHook(evalHolder)) {
        return;
    }

    window.eval = function () {
        debugger;
        pureArguments(DEBUGGER_TYPE, arguments);
        return evalHolder.apply(this, arguments);
    }

    window.eval.toString = function () {
        debugger;
        return "function eval() { [native code] }";
    }

    setAlreadyHook(evalHolder);

}



