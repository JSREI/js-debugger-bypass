/**
 *
 */
import {addEvalHook} from "./hook-eval";
import {addSetIntervalHook} from "./hook-set-interval";
import {addFunctionConstructorHook} from "./hook-function-constructor";

/**
 * 把所有能加的Hook都加上
 */
function addAllHook() {
    addEvalHook();
    addSetIntervalHook();
    addFunctionConstructorHook();
}

module.exports = {
    addAllHook
}

