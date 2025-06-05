import { pureArguments } from "../pure/pure";
import { isAlreadyHook, setAlreadyHook } from "./hook-flag";
import { debug } from "../logger/logger";
import { getWindow } from "../utils/window";

// 移除不需要的声明，因为getWindow函数已经处理了
// declare const unsafeWindow: Window & typeof globalThis;

/**
 * Hook类型标识符，用于在日志和调试中标识这是eval相关的Hook
 * 
 * 说明：
 * - 每种Hook都有自己的类型标识符
 * - 用于在pure函数中区分不同类型的Hook
 * - 方便后续扩展和维护
 */
const DEBUGGER_TYPE: string = "eval";

/**
 * 为eval添加Hook，用于拦截和处理通过eval执行的debugger语句
 * 
 * 实现原理：
 * 1. 保存原始的eval函数
 * 2. 用自定义函数替换全局的eval
 * 3. 在自定义函数中添加拦截逻辑
 * 4. 伪装函数的toString方法，使其看起来像原生函数
 * 
 * 防护目标：
 * - 拦截 eval("debugger") 形式的调试语句
 * - 拦截 eval('debugger;') 形式的调试语句
 * - 拦截其他通过eval执行的包含debugger的代码
 * 
 * 使用场景：
 * ```javascript
 * // 以下代码会被拦截
 * eval("debugger");
 * eval("console.log(1);debugger;console.log(2)");
 * ```
 * 
 * 注意事项：
 * 1. 使用isAlreadyHook避免重复Hook
 * 2. 保持原有eval的this上下文
 * 3. 伪装toString方法避免被检测
 */
export function addEvalHook(): void {
    // 获取全局Window对象
    const win = getWindow();

    // 保存原始的eval函数，用于后续调用
    const evalHolder: typeof eval = win.eval;

    // 检查是否已经被Hook过，避免重复Hook
    if (isAlreadyHook(evalHolder)) {
        debug("eval函数已被Hook过，跳过Hook初始化");
        return;
    }

    debug("开始Hook eval函数...");

    // 替换全局的eval函数
    win.eval = function (this: any, ...args: any[]): any {
        // 插入一个debugger用于调试当前Hook是否生效
        // debugger;
        
        // 记录日志
        debug(`eval函数被调用，参数类型: ${typeof args[0]}, 长度: ${args[0] ? args[0].toString().length : 0}`);
        
        // 处理参数，可能包含对参数的净化、日志记录等
        pureArguments(DEBUGGER_TYPE, args);
        
        // 使用原始eval处理代码，保持原有的this上下文
        return evalHolder.apply(this, args);
    }

    // 伪装toString方法，使其返回原生函数的字符串形式
    // 这样可以避免被检测到函数被替换
    win.eval.toString = function (): string {
        // debugger;
        return "function eval() { [native code] }";
    }

    // 标记该eval函数已被Hook，避免重复Hook
    setAlreadyHook(evalHolder);
    debug("eval函数Hook完成");
} 