import { pureArguments } from "../pure/pure";
import { isAlreadyHook, setAlreadyHook } from "./hook-flag";
import { debug } from "../logger/logger";
import { getWindow } from "../utils/window";

// 移除不需要的声明
// declare const unsafeWindow: Window & typeof globalThis;

/**
 * Hook类型标识，用于在日志和调试中标识这是setInterval相关的Hook
 */
const HOOK_TYPE: string = "setInterval";

/**
 * 为 setInterval 添加Hook，用于拦截通过定时器执行的debugger语句
 * 
 * 防护目标：
 * 1. 直接在回调函数中使用debugger语句
 * 2. 通过字符串形式传入的debugger语句
 * 3. 其他形式的定时执行debugger的方式
 * 
 * 实现原理：
 * 1. 保存原始的setInterval函数
 * 2. 创建新的setInterval函数进行替换
 * 3. 在新函数中对参数进行检查和处理
 * 4. 伪装toString方法避免被检测
 * 
 * 使用场景示例：
 * ```javascript
 * // 以下代码都会被拦截：
 * setInterval(function() { debugger; }, 1000);
 * setInterval('debugger', 1000);
 * setInterval(() => { debugger; }, 1000);
 * ```
 * 
 * 参数说明：
 * @param handler {TimerHandler} 定时器回调函数或字符串
 * @param timeout {number} 定时器间隔时间（毫秒）
 * @param args {...any[]} 传递给回调函数的参数
 * 
 * 注意事项：
 * 1. 需要保持原有setInterval的功能
 * 2. 需要正确处理this上下文
 * 3. 需要正确传递所有参数
 */
export function addSetIntervalHook(): void {
    // 获取全局Window对象
    const win = getWindow();

    // 保存原始的setInterval函数
    const setIntervalHolder: typeof setInterval = win.setInterval;

    // 检查是否已经被Hook过
    if (isAlreadyHook(setIntervalHolder)) {
        debug("setInterval函数已被Hook过，跳过Hook初始化");
        return;
    }

    debug("开始Hook setInterval函数...");

    // 创建新的setInterval函数
    const newSetInterval = function (handler: TimerHandler, timeout?: number, ...args: any[]): number {
        // 记录日志
        const handlerType = typeof handler;
        debug(`setInterval被调用，回调类型: ${handlerType}, 间隔: ${timeout}ms`);
        
        // 处理参数，检查和净化可能包含的debugger语句
        pureArguments(HOOK_TYPE, [handler, timeout, ...args]);
        
        // 使用原始的setInterval，保持原有功能
        // 注意保持this上下文和参数的完整传递
        return setIntervalHolder.apply(this, [handler, timeout, ...args]);
    } as typeof setInterval;

    // 替换全局的setInterval
    win.setInterval = newSetInterval;

    // 伪装toString方法，返回原生函数的字符串形式
    win.setInterval.toString = function (): string {
        return "function setInterval() { [native code] }";
    }

    // 标记setInterval已被Hook
    setAlreadyHook(setIntervalHolder);
    debug("setInterval函数Hook完成");
} 