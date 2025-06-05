/**
 * 初始化脚本
 * 
 * 负责在脚本启动时执行必要的初始化操作
 */
import { forceResetSettings, loadSettings, hasData, SETTINGS_STORAGE_KEY } from './storage';
import { info } from './logger/logger';

/**
 * 初始化函数
 */
export function initialize(): void {
    // 检查是否已有存储的设置，只在首次运行时重置设置
    const hasExistingSettings = hasData(SETTINGS_STORAGE_KEY);
    
    if (!hasExistingSettings) {
        info(`首次运行，初始化默认设置`);
        // 只在首次运行时重置所有设置为默认值
        forceResetSettings();
    }
    
    // 加载设置并验证是否正确设置
    const settings = loadSettings();
    
    // 记录初始化状态
    info(`初始化完成，全局开关: ${settings.enabled}, 日志开关: ${settings.logDebuggerCalls}`);
    info(`Hook状态: eval=${settings.enabledHooks.eval}, function=${settings.enabledHooks.function}, ` +
         `setInterval=${settings.enabledHooks.setInterval}, setTimeout=${settings.enabledHooks.setTimeout}`);
} 