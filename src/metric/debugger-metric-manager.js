import {log} from "../logger/logger";

const {DebuggerMetric} = require("./debugger-metric");

/**
 * 用于统一维护debugger的执行信息
 */
export class DebuggerMetricManager {

    constructor() {
        this.metricMap = new Map();
    }

    /**
     * 根据type和codeLocation获取对应的统计信息
     *
     * @param debuggerType debugger的类型
     * @param codeLocation 代码的位置
     * @returns {any}
     */
    getDebuggerMetric(debuggerType, codeLocation) {
        const mapKey = debuggerType + "|" + codeLocation;
        let metric = this.metricMap.get(mapKey);
        if (metric == null) {
            metric = new DebuggerMetric(codeLocation);
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
    reportDebuggerMetric(debuggerType, codeLocation) {

        const metric = this.getDebuggerMetric(debuggerType, codeLocation);

        metric.interceptTotal++;

        if (new Date().getTime() - this.lastPrintTimestamp < 1000 * 3) {
            return;
        }
        this.lastPrintTimestamp = new Date().getTime();
        const msg = `debugger type ${debuggerType}, code location = ${codeLocation}, intercept count = ${metric.interceptTotal}`;
        log(msg);
    }

}

export const debuggerMetricManager = new DebuggerMetricManager();