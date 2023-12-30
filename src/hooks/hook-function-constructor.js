const {pureArguments} = require("../pure/pure");
const {isAlreadyHook, setAlreadyHook} = require("./hook-flag");

/**
 * 为函数的构造器添加Hook
 */
export function addFunctionConstructorHook() {

    // 通过构造一个函数执行的方式来执行debugger，通过hook Function的构造器可以拦截到
    // Function("debugger").call();
    // case测试网站：https://www.chacewang.com/
    const functionHolder = window.Function;
    const functionPrototypeConstructorHolder = window.Function.prototype.constructor;
    if (!isAlreadyHook(functionHolder)) {

        window.Function = function () {
            pureArguments("Function(\"debugger\").call()", arguments);
            return functionHolder.apply(this, arguments);
        }

        window.Function.toString = function () {
            return "function Function() { [native code] }";
        }

        functionHolder.prototype.constructor = window.Function.prototype.constructor = function () {
            pureArguments("Function.prototype.constructor", arguments);
            return functionPrototypeConstructorHolder.apply(this, arguments);
        }

        functionHolder.prototype.constructor = window.Function.prototype.constructor.toString = function () {
            return "function Function() { [native code] }";
        }

        setAlreadyHook(functionHolder);
    }

    // [].constructor.constructor("debugger")();
    const constructorHolder = [].constructor.constructor;
    if (!isAlreadyHook(constructorHolder)) {
        [].constructor.constructor = function () {
            pureArguments("[].constructor.constructor", arguments);
            return constructorHolder.apply(this, arguments);
        }

        // [].constructor.constructor.toString = function () {
        //     return "function Function() { [native code] }";
        // }

        setAlreadyHook(constructorHolder);
    }

}

