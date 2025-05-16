import { pureArguments } from "../pure/pure";
import { isAlreadyHook, setAlreadyHook } from "./hook-flag";

/**
 * 通过定时器设置定时执行debugger
 * 
 * setInterval(function(){debugger;},1000);
 */
export function addSetIntervalHook(): void {
    const setIntervalHolder: typeof setInterval = window.setInterval;

    if (isAlreadyHook(setIntervalHolder)) {
        return;
    }

    const newSetInterval = function (handler: TimerHandler, timeout?: number, ...args: any[]): number {
        pureArguments("setInterval", [handler, timeout, ...args]);
        return setIntervalHolder.apply(this, [handler, timeout, ...args]);
    } as typeof setInterval;

    window.setInterval = newSetInterval;

    window.setInterval.toString = function (): string {
        return "function setInterval() { [native code] }";
    }

    setAlreadyHook(setIntervalHolder);
} 