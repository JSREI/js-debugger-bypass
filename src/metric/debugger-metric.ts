/**
 * 用于统计观测debugger的拦截情况
 */
export class DebuggerMetric {
    // 拦截到的是哪种类型的debugger
    type: string;

    // 统计的是哪个key
    codeLocation: string;

    // 从页面加载到现在一共拦截了多少次此类型的debugger
    interceptTotal: number;

    // 上次输出统计的时间，是13位的时间戳
    lastPrintTimestamp: number;

    constructor(type: string, codeLocation: string) {
        this.type = type;
        this.codeLocation = codeLocation;
        this.interceptTotal = 0;
        this.lastPrintTimestamp = 0;
    }
} 