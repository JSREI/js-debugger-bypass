/**
 * 获取当前时间
 */
export function now(): string {
    const now = new Date();
    return stringAlignRight(now.getFullYear(), 4, "0") + "-" + 
           stringAlignRight(now.getMonth() + 1, 2, "0") + "-" + 
           stringAlignRight(now.getDate(), 2, "0") + " " + 
           stringAlignRight(now.getHours(), 2, "0") + ":" + 
           stringAlignRight(now.getMinutes(), 2, "0") + ":" + 
           stringAlignRight(now.getSeconds(), 2, "0") + "." + 
           stringAlignRight(now.getMilliseconds(), 3, "0");
}

/**
 * 把字符串右对齐到指定的长度，长度不足时使用给定的字符填充左边
 *
 * @param s 要对齐的字符串
 * @param length 要对齐到的长度
 * @param c 长度不足时用什么字符补齐
 */
function stringAlignRight(s: any, length: number, c: string): string {
    s = String(s);
    while (s.length < length) {
        s = c + s;
    }
    return s;
} 