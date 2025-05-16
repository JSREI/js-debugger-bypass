import { pureArguments } from "../pure/pure";
import { isAlreadyHook, setAlreadyHook } from "./hook-flag";

/**
 * 这种类型的Hook的标识符
 */
const DEBUGGER_TYPE: string = "eval";

/**
 * 为eval添加Hook，用于拦截 `eval("debugger");` 这种方式执行的debugger
 */
export function addEvalHook(): void {
    const evalHolder: typeof eval = window.eval;

    if (isAlreadyHook(evalHolder)) {
        return;
    }

    window.eval = function (this: any, ...args: any[]): any {
        debugger;
        pureArguments(DEBUGGER_TYPE, args);
        return evalHolder.apply(this, args);
    }

    window.eval.toString = function (): string {
        debugger;
        return "function eval() { [native code] }";
    }

    setAlreadyHook(evalHolder);
} 