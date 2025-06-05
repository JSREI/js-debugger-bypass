import { success, info, debug } from "../logger/logger";
import { DebuggerMetric } from "./debugger-metric";

/**
 * 用于统一维护debugger的执行信息
 */
export class DebuggerMetricManager {
    private metricMap: Map<string, DebuggerMetric>;
    private lastPrintTimestamp: number;
    // 新增记录总拦截次数
    private totalInterceptions: number = 0;
    // 新增按类型统计拦截次数
    private interceptsByType: Record<string, number> = {};

    constructor() {
        this.metricMap = new Map();
        this.lastPrintTimestamp = 0;
    }

    /**
     * 根据type和codeLocation获取对应的统计信息
     *
     * @param debuggerType debugger的类型
     * @param codeLocation 代码的位置
     */
    private getDebuggerMetric(debuggerType: string, codeLocation: string): DebuggerMetric {
        const mapKey = debuggerType + "|" + codeLocation;
        let metric = this.metricMap.get(mapKey);
        if (metric == null) {
            metric = new DebuggerMetric(debuggerType, codeLocation);
            this.metricMap.set(mapKey, metric);
        }
        return metric;
    }

    /**
     * 统计拦截到的debugger信息
     *
     * @param debuggerType 拦截到的是什么类型的debugger
     * @param codeLocation 是在用户代码的什么位置拦截到debugger
     */
    reportDebuggerMetric(debuggerType: string, codeLocation: string): void {
        // 更新统计数据
        const metric = this.getDebuggerMetric(debuggerType, codeLocation);
        metric.interceptTotal++;

        // 更新全局统计
        this.totalInterceptions++;
        this.interceptsByType[debuggerType] = (this.interceptsByType[debuggerType] || 0) + 1;

        // 防止日志过于频繁导致控制台刷屏
        // 只有在间隔指定时间后才输出日志
        const currentTime = new Date().getTime();
        if (currentTime - this.lastPrintTimestamp < 3000) { // 3秒内不重复打印
            return;
        }
        
        // 更新最后输出时间戳
        this.lastPrintTimestamp = currentTime;
        
        // 生成详细的拦截信息日志
        this.logInterception(debuggerType, codeLocation, metric.interceptTotal);
    }

    /**
     * 输出拦截信息日志
     * 
     * @param debuggerType 拦截到的是什么类型的debugger
     * @param codeLocation 是在用户代码的什么位置拦截到debugger
     * @param count 拦截次数
     */
    private logInterception(debuggerType: string, codeLocation: string, count: number): void {
        // 获取易读的debugger类型描述
        const typeDescription = this.getDebuggerTypeDescription(debuggerType);
        
        // 格式化代码位置，裁剪过长内容
        const formattedLocation = this.formatCodeLocation(codeLocation);
        
        // 根据拦截次数输出不同级别的日志
        if (count === 1) {
            // 首次拦截
            success(`成功拦截 ${typeDescription} 类型的debugger断点！`);
            info(`拦截位置: ${formattedLocation}`);
        } else if (count % 10 === 0) {
            // 每拦截10次输出一条总结信息
            info(`已拦截 ${count} 次来自 ${typeDescription} 的debugger断点 (位置: ${formattedLocation})`);
        } else {
            // 其他情况使用debug级别，不干扰用户
            debug(`拦截到debugger: 类型=${typeDescription}, 位置=${formattedLocation}, 当前总次数=${count}`);
        }
        
        // 当总拦截次数达到特定值时，输出里程碑信息
        const milestones = [50, 100, 500, 1000, 5000];
        if (milestones.includes(this.totalInterceptions)) {
            success(`🎉 里程碑：已成功拦截 ${this.totalInterceptions} 次debugger断点，保护您的浏览体验！`);
        }
    }
    
    /**
     * 获取易读的debugger类型描述
     * 
     * @param debuggerType 拦截类型标识
     * @returns 易读的类型描述
     */
    private getDebuggerTypeDescription(debuggerType: string): string {
        switch (debuggerType) {
            case "eval":
                return "eval函数";
            case "function":
                return "Function构造器";
            case "setInterval":
                return "setInterval循环";
            case "setTimeout":
                return "setTimeout延时";
            default:
                return debuggerType;
        }
    }
    
    /**
     * 格式化代码位置，避免过长
     * 
     * @param codeLocation 代码位置
     * @returns 格式化后的代码位置
     */
    private formatCodeLocation(codeLocation: string): string {
        // 如果代码位置过长，进行裁剪
        if (codeLocation.length > 100) {
            return codeLocation.substring(0, 97) + '...';
        }
        return codeLocation;
    }
}

export const debuggerMetricManager = new DebuggerMetricManager(); 