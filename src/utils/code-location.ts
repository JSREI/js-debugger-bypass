/**
 * 获取当前的用户代码位置，这样可以方便直接点击定位位置
 *
 * @return 定位到的用户代码的位置
 */
export function getCodeLocation(): string {
    // 把调用栈一个栈帧一个栈帧的弹掉
    const stack: string[] = new Error().stack?.split("\n") || [];
    let last: string = "";
    
    for (let i = stack.length - 1; i >= 0; i--) {
        // 这个字符串是油猴的Chrome扩展id号，用这个来作为标识符，如果使用的是其它扩展的话需要把这里的标记位给修改掉
        if (stack[i].indexOf("dhdgffkkebhmkfjojejmpbldmpobfkfo") !== -1) {
            // 去除可能会存在的空格，观感会稍微好一些
            return last.trim();
        }
        last = stack[i];
    }
    return "";
} 