const {pureArguments} = require("../pure/pure");
const {isAlreadyHook, setAlreadyHook} = require("./hook-flag");

const DEBUGGER_TYPE = "eval";

/**
 * 为eval添加Hook，用于拦截这种方式执行的debugger:
 *
 *  eval("debugger");
 *
 */
function addEvalHook() {

    const evalHolder = window.eval;

    if (isAlreadyHook(evalHolder)) {
        return;
    }

    window.eval = function () {
        pureArguments(DEBUGGER_TYPE, arguments);
        return evalHolder.apply(this, arguments);
    }

    window.eval.toString = function () {
        return "function eval() { [native code] }";
    }

    setAlreadyHook(evalHolder);

}

module.exports = {
    addEvalHook
}

