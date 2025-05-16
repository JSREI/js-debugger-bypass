import { now } from "../utils/now";

/**
 * 打印统一的输出日志到控制台
 *
 * @param msg 要打印的消息
 */
export function log(msg: string): void {
    console.log(`[${now()}] ${msg}`);
} 