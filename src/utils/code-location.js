/**
 * 获取当前的用户代码位置，这样可以方便直接点击定位位置
 *
 * @return {string} 定位到的用户代码的位置
 */
function getCodeLocation() {
    // 把调用栈一个栈帧一个栈帧的弹掉
    const stack = new Error().stack.split("\n");
    let i = 1;
    let last = "";
    for (let i = stack.length - 1; i >= 0; i--) {
        // 这个字符串是油猴的Chrome扩展id号
        if (stack[i].indexOf("dhdgffkkebhmkfjojejmpbldmpobfkfo") !== -1) {
            // 去除可能会存在的空格，观感会稍微好一些
            return last.trim();
        }
        last = stack[i];
    }
    return "";
}

module.exports = {
    getCodeLocation
}