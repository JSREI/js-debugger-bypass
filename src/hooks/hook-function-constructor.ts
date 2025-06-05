import { pureArguments } from "../pure/pure";
import { isAlreadyHook, setAlreadyHook } from "./hook-flag";
import { debug } from "../logger/logger";
import { getWindow } from "../utils/window";

/**
 * Hook类型标识，用于在日志和调试中标识这是Function构造器相关的Hook
 */
export const HOOK_TYPE = "function";

/**
 * 为Function构造器添加Hook，用于拦截通过构造器创建的函数中的debugger语句
 * 
 * 实现原理：
 * 1. 保存原始的Function构造函数
 * 2. 创建新的构造函数进行替换
 * 3. 在新函数中对参数进行检查和处理
 * 4. 使用适当的方法替换全局Function
 * 
 * 防护目标：
 * - 使用new Function("debugger")创建的函数
 * - 使用Function("debugger")创建的函数
 * - 其它使用Function构造器创建包含debugger的函数
 * 
 * 使用示例：
 * ```javascript
 * // 以下代码会被拦截
 * const fn1 = new Function("debugger");
 * const fn2 = Function("debugger");
 * ```
 * 
 * 注意事项：
 * 1. 需要处理多种调用方式
 * 2. 确保变更后的函数行为与原始函数一致
 * 3. 需要伪装函数的toString等方法
 */
export function addFunctionConstructorHook(): void {
    // 获取全局Window对象
    const win = getWindow();
    
    // 获取原始Function构造函数
    const OriginalFunction: FunctionConstructor = win.Function;
    
    // 检查是否已被Hook
    if (isAlreadyHook(OriginalFunction)) {
        debug("Function构造器已被Hook过，跳过Hook初始化");
        return;
    }
    
    debug("开始Hook Function构造器...");

    // 创建Hook Function构造函数
    // 注意：由于无法直接修改Function.prototype(它是只读的)，我们采用不同的方法
    function hookedFunctionConstructor(this: any, ...args: any[]): any {
        // 检查是否是通过new调用
        const isConstructorCall = this instanceof hookedFunctionConstructor;
        
        debug(`Function构造器被调用，参数数量: ${args.length}, 构造函数调用: ${isConstructorCall}`);
        
        // 处理参数，净化可能包含的debugger语句
        pureArguments(HOOK_TYPE, args);
        
        if (isConstructorCall) {
            // 作为构造函数调用
            return new OriginalFunction(...args);
        } else {
            // 作为普通函数调用
            return OriginalFunction(...args);
        }
    }
    
    // 确保hookedFunctionConstructor可以通过instanceof检查
    Object.defineProperty(hookedFunctionConstructor, Symbol.hasInstance, {
        value: (instance: any) => instance instanceof OriginalFunction
    });
    
    // 伪装toString方法
    Object.defineProperty(hookedFunctionConstructor, 'toString', {
        value: function() {
            return "function Function() { [native code] }";
        },
        writable: false,
        enumerable: false,
        configurable: true
    });
    
    // 覆盖全局Function
    try {
        // @ts-ignore - 忽略类型错误
        win.Function = hookedFunctionConstructor;
        debug("Function构造器已被成功替换");
    } catch (e) {
        debug(`Function构造器替换失败: ${e.message}`);
    }
    
    // 尝试Hook一些常见的获取Function的方法
    try {
        // @ts-ignore - 处理常见的Function获取方式
        Object.getPrototypeOf(function(){}).constructor = hookedFunctionConstructor;
        debug("Function.prototype.constructor已被成功Hook");
    } catch (e) {
        debug(`Function.prototype.constructor Hook失败: ${e.message}`);
    }
    
    // 标记已Hook
    setAlreadyHook(OriginalFunction);
    debug("Function构造器Hook完成");
} 