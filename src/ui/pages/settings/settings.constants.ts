/**
 * 设置页面常量
 * 
 * 包含设置页面使用的常量和提示文本
 */
import { HookType } from '../../../storage';

/**
 * 设置标题
 */
export const SETTINGS_TITLE = '全局设置';

/**
 * 设置分类
 */
export enum SettingsCategory {
    BASIC = 'basic',       // 基本设置
    HOOKS = 'hooks'        // Hook设置
}

/**
 * 基本设置配置
 */
export const BASIC_SETTINGS_CONFIG = [
    {
        id: 'enabled',
        label: '启用JS调试拦截',
        description: '全局开关，控制插件是否启用'
    },
    {
        id: 'logDebuggerCalls',
        label: '启用日志输出',
        description: '控制所有日志输出，关闭后不会在控制台打印任何日志信息'
    }
];

/**
 * Hook设置配置
 */
export const HOOK_SETTINGS_CONFIG = [
    {
        id: HookType.EVAL,
        label: 'eval函数Hook',
        description: '拦截通过eval函数执行的debugger语句'
    },
    {
        id: HookType.FUNCTION,
        label: 'Function构造器Hook',
        description: '拦截通过Function构造器创建的函数中的debugger语句'
    },
    {
        id: HookType.SET_INTERVAL,
        label: 'setInterval函数Hook',
        description: '拦截通过setInterval定时执行的函数中的debugger语句'
    },
    {
        id: HookType.SET_TIMEOUT,
        label: 'setTimeout函数Hook',
        description: '拦截通过setTimeout延时执行的函数中的debugger语句'
    }
]; 