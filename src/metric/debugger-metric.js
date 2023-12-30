/**
 * 用于统计观测debugger的拦截情况
 */
class DebuggerMetric {

    constructor(type, codeLocation) {

        // 拦截到的是哪种类型的debugger
        this.type = type;

        // 统计的是哪个key
        this.codeLocation = codeLocation;

        //  从页面加载到现在一共拦截了多少次此类型的debugger
        this.interceptTotal = 0;

        // 上次输出统计的时间，是13位的时间戳
        this.lastPrintTimestamp = 0;
    }

}

module.exports = {
    DebuggerMetric
}