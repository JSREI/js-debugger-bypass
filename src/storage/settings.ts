/**
 * 设置模块
 * 
 * 定义应用全局设置的结构和管理
 */
import { loadData, saveData, removeData } from './storage';

/**
 * Hook类型定义
 */
export enum HookType {
    EVAL = 'eval',                 // eval执行的debugger
    FUNCTION = 'function',         // Function构造器执行的debugger
    SET_INTERVAL = 'setInterval',  // setInterval定时执行的debugger
    SET_TIMEOUT = 'setTimeout'     // setTimeout延时执行的debugger
}

/**
 * 设置选项接口
 */
export interface SettingsOptions {
    enabled: boolean;                // 全局开关，是否启用插件
    logDebuggerCalls: boolean;       // 是否记录debugger调用日志
    enabledHooks: Record<HookType, boolean>; // 启用的Hook类型
}

/**
 * 默认设置
 */
export const DEFAULT_SETTINGS: SettingsOptions = {
    enabled: true,
    logDebuggerCalls: true,
    enabledHooks: {
        [HookType.EVAL]: true,
        [HookType.FUNCTION]: false,
        [HookType.SET_INTERVAL]: true,
        [HookType.SET_TIMEOUT]: true
    }
};

/**
 * 设置存储键
 */
export const SETTINGS_STORAGE_KEY = 'settings';

/**
 * 强制清除所有存储的设置，恢复为默认值
 */
export function forceResetSettings(): void {
    // 清除存储的设置
    removeData(SETTINGS_STORAGE_KEY);
    // 重新保存默认设置
    saveSettings(DEFAULT_SETTINGS);
}

/**
 * 加载设置
 * 
 * @returns 设置选项
 */
export function loadSettings(): SettingsOptions {
    // 从存储中读取设置，如果不存在则使用默认值
    const settings = loadData<SettingsOptions>(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);
    
    // 确保所有开关都有值，防止意外情况
    settings.enabled = settings.enabled !== false; // 默认为true
    settings.logDebuggerCalls = settings.logDebuggerCalls !== false; // 默认为true
    
    // 确保所有hook类型开关都有默认值
    if (!settings.enabledHooks) {
        settings.enabledHooks = { ...DEFAULT_SETTINGS.enabledHooks };
    } else {
        // 确保每个hook类型都有值
        Object.values(HookType).forEach(hookType => {
            settings.enabledHooks[hookType] = settings.enabledHooks[hookType] !== false; // 默认为true
        });
    }
    
    return settings;
}

/**
 * 保存设置
 * 
 * @param settings 要保存的设置
 */
export function saveSettings(settings: SettingsOptions): void {
    // 保存设置到存储
    saveData(SETTINGS_STORAGE_KEY, settings);
}

/**
 * 重置设置为默认值
 * 
 * @returns 默认设置
 */
export function resetSettings(): SettingsOptions {
    // 保存默认设置
    saveSettings(DEFAULT_SETTINGS);
    return { ...DEFAULT_SETTINGS };
}

/**
 * 检查某个Hook类型是否启用
 * 
 * @param hookType 要检查的Hook类型
 * @returns 是否启用
 */
export function isHookEnabled(hookType: HookType): boolean {
    const settings = loadSettings();
    return settings.enabled && settings.enabledHooks[hookType];
} 