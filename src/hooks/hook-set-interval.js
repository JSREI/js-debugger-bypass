import {pureArguments} from "../pure/pure";
import {isAlreadyHook, setAlreadyHook} from "./hook-flag";

/**
 *
 * 通过定时器设置定时执行debugger
 *
 * setInterval(function(){debugger;},1000);
 *
 */
function addSetIntervalHook() {

    const setIntervalHolder = window.setInterval;

    if (isAlreadyHook(setIntervalHolder)) {
        return;
    }

    window.setInterval = function () {
        pureArguments("setInterval", arguments);
        return setIntervalHolder.apply(this, arguments);
    }

    window.setInterval.toString = function () {
        return "function setInterval() { [native code] }";
    }

    setAlreadyHook(setIntervalHolder);

}

module.exports = {
    addSetIntervalHook
}
