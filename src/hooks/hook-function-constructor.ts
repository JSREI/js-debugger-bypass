import { pureArguments } from "../pure/pure";
import { isAlreadyHook, setAlreadyHook } from "./hook-flag";

/**
 * 为函数的构造器添加Hook
 */
export function addFunctionConstructorHook(): void {
    // 通过构造一个函数执行的方式来执行debugger，通过hook Function的构造器可以拦截到
    // Function("debugger").call();
    // case测试网站：https://www.chacewang.com/
    const functionHolder = window.Function;
    const functionPrototypeConstructorHolder = window.Function.prototype.constructor;
    
    if (!isAlreadyHook(functionHolder)) {
        const newFunction = function (...args: string[]): Function {
            pureArguments("Function(\"debugger\").call()", args);
            return functionHolder.apply(this, args);
        };

        // @ts-ignore - 这里的类型比较复杂，暂时忽略类型检查
        window.Function = newFunction;

        window.Function.toString = function (): string {
            return "function Function() { [native code] }";
        }

        const newConstructor = function (...args: string[]): Function {
            pureArguments("Function.prototype.constructor", args);
            return functionPrototypeConstructorHolder.apply(this, args);
        };

        // @ts-ignore - 这里的类型比较复杂，暂时忽略类型检查
        functionHolder.prototype.constructor = window.Function.prototype.constructor = newConstructor;

        functionHolder.prototype.constructor.toString = function (): string {
            return "function Function() { [native code] }";
        }

        setAlreadyHook(functionHolder);
    }

    // [].constructor.constructor("debugger")();
    const constructorHolder = [].constructor.constructor;
    if (!isAlreadyHook(constructorHolder)) {
        const newArrayConstructor = function (...args: string[]): Function {
            pureArguments("[].constructor.constructor", args);
            return constructorHolder.apply(this, args);
        };

        // @ts-ignore - 这里的类型比较复杂，暂时忽略类型检查
        [].constructor.constructor = newArrayConstructor;

        // [].constructor.constructor.toString = function () {
        //     return "function Function() { [native code] }";
        // }

        setAlreadyHook(constructorHolder);
    }
} 