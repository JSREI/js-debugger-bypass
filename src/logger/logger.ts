import { now } from "../utils/now";
import { loadSettings } from "../storage";

/**
 * 日志级别枚举
 */
export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'  // 新增SUCCESS级别用于记录成功操作
}

/**
 * 日志配置接口
 */
export interface LoggerConfig {
    /**
     * 插件标识，默认为 'JS-DEBUGGER-BYPASS'
     */
    pluginTag?: string;

    /**
     * 最小日志级别，低于此级别的日志将不会输出
     * 默认为 DEBUG，即输出所有日志
     */
    minLevel?: LogLevel;

    /**
     * 是否显示时间戳，默认为 true
     */
    showTimestamp?: boolean;

    /**
     * 是否启用颜色输出，默认为 true
     */
    enableColors?: boolean;

    /**
     * 自定义颜色配置
     */
    colors?: {
        [key in LogLevel]?: string;
    };
}

/**
 * 默认配置
 */
const DEFAULT_CONFIG: Required<LoggerConfig> = {
    pluginTag: '🛡️ JS-DEBUGGER-BYPASS',  // 添加图标使前缀更明显
    minLevel: LogLevel.DEBUG,
    showTimestamp: true,
    enableColors: true,
    colors: {
        [LogLevel.DEBUG]: '#808080',   // 灰色
        [LogLevel.INFO]: '#2196F3',    // 蓝色
        [LogLevel.WARN]: '#FFA500',    // 橙色
        [LogLevel.ERROR]: '#FF0000',   // 红色
        [LogLevel.SUCCESS]: '#4CAF50'  // 绿色
    }
};

/**
 * 当前配置
 */
let currentConfig: Required<LoggerConfig> = { ...DEFAULT_CONFIG };

/**
 * 配置日志模块
 * @param config 日志配置
 */
export function configureLogger(config: LoggerConfig): void {
    currentConfig = {
        ...DEFAULT_CONFIG,
        ...config,
        colors: {
            ...DEFAULT_CONFIG.colors,
            ...(config.colors || {})
        }
    };
}

/**
 * 获取日志级别对应的数值，用于比较
 */
function getLevelValue(level: LogLevel): number {
    const levelValues: { [key in LogLevel]: number } = {
        [LogLevel.DEBUG]: 0,
        [LogLevel.INFO]: 1,
        [LogLevel.SUCCESS]: 1,  // SUCCESS和INFO同级
        [LogLevel.WARN]: 2,
        [LogLevel.ERROR]: 3
    };
    return levelValues[level];
}

/**
 * 格式化日志消息
 */
function formatLogMessage(level: LogLevel, msg: string): string {
    const parts: string[] = [];

    // 添加时间戳
    if (currentConfig.showTimestamp) {
        parts.push(`[${now()}]`);
    }

    // 添加插件标识，确保醒目
    parts.push(`[${currentConfig.pluginTag}]`);

    // 添加日志级别，不同级别使用不同的前缀增强可辨识度
    let levelPrefix = '';
    switch(level) {
        case LogLevel.DEBUG:
            levelPrefix = '🔍';
            break;
        case LogLevel.INFO:
            levelPrefix = 'ℹ️';
            break;
        case LogLevel.WARN:
            levelPrefix = '⚠️';
            break;
        case LogLevel.ERROR:
            levelPrefix = '❌';
            break;
        case LogLevel.SUCCESS:
            levelPrefix = '✅';
            break;
    }

    parts.push(`[${levelPrefix} ${level}]`);

    // 组合消息
    return parts.join(' ') + ' ' + msg;
}

/**
 * 获取控制台样式
 */
function getConsoleStyle(level: LogLevel): string[] {
    if (currentConfig.enableColors && currentConfig.colors[level]) {
        return [`color: ${currentConfig.colors[level]}; font-weight: bold`];
    }
    return [];
}

/**
 * 检查日志是否全局禁用
 * 读取用户设置来判断是否允许输出日志
 */
function isLoggingEnabled(): boolean {
    try {
        const settings = loadSettings();
        return settings.logDebuggerCalls;
    } catch (e) {
        // 如果无法读取设置，默认允许日志
        return true;
    }
}

/**
 * 基础日志打印函数
 */
function logWithLevel(level: LogLevel, msg: string): void {
    // 首先检查日志是否全局禁用
    if (!isLoggingEnabled()) {
        return;
    }
    
    // 检查日志级别
    if (getLevelValue(level) < getLevelValue(currentConfig.minLevel)) {
        return;
    }

    const formattedMsg = formatLogMessage(level, msg);
    const style = getConsoleStyle(level);
    
    // 根据是否启用颜色选择打印方式
    if (currentConfig.enableColors && style.length > 0) {
        switch (level) {
            case LogLevel.DEBUG:
                console.debug(`%c${formattedMsg}`, style[0]);
                break;
            case LogLevel.INFO:
                console.log(`%c${formattedMsg}`, style[0]);
                break;
            case LogLevel.SUCCESS:
                console.log(`%c${formattedMsg}`, style[0]);
                break;
            case LogLevel.WARN:
                console.warn(`%c${formattedMsg}`, style[0]);
                break;
            case LogLevel.ERROR:
                console.error(`%c${formattedMsg}`, style[0]);
                break;
        }
    } else {
        // 无颜色时的备选方案
        switch (level) {
            case LogLevel.DEBUG:
                console.debug(formattedMsg);
                break;
            case LogLevel.INFO:
            case LogLevel.SUCCESS:
                console.log(formattedMsg);
                break;
            case LogLevel.WARN:
                console.warn(formattedMsg);
                break;
            case LogLevel.ERROR:
                console.error(formattedMsg);
                break;
        }
    }
}

/**
 * 打印调试级别日志
 * @param msg 日志消息
 */
export function debug(msg: string): void {
    logWithLevel(LogLevel.DEBUG, msg);
}

/**
 * 打印信息级别日志
 * @param msg 日志消息
 */
export function info(msg: string): void {
    logWithLevel(LogLevel.INFO, msg);
}

/**
 * 打印成功级别日志
 * @param msg 日志消息
 */
export function success(msg: string): void {
    logWithLevel(LogLevel.SUCCESS, msg);
}

/**
 * 打印警告级别日志
 * @param msg 日志消息
 */
export function warn(msg: string): void {
    logWithLevel(LogLevel.WARN, msg);
}

/**
 * 打印错误级别日志
 * @param msg 日志消息
 */
export function error(msg: string): void {
    logWithLevel(LogLevel.ERROR, msg);
}

/**
 * 为了向后兼容，保留原来的 log 函数
 * 默认使用 INFO 级别
 */
export function log(msg: string): void {
    info(msg);
} 