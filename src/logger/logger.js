import {now} from "../utils/now";

/**
 * 打印统一的输出日志到控制台
 *
 * @param msg
 */
export function log(msg) {
    console.log(`[${now()}] ${msg}`);
}

