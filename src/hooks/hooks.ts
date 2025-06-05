/**
 * Hook管理模块
 * 
 * 功能：
 * 1. 集中管理所有的Hook
 * 2. 提供统一的Hook添加入口
 * 3. 确保Hook的添加顺序和依赖关系
 * 
 * 包含的Hook类型：
 * 1. eval - 拦截eval执行的debugger
 * 2. setInterval - 拦截定时器中的debugger
 * 3. Function构造器 - 拦截通过Function构造器执行的debugger
 * 4. setTimeout - 拦截延时器中的debugger
 */
import { addEvalHook } from "./hook-eval";
import { addSetIntervalHook } from "./hook-set-interval";
import { addSetTimeoutHook } from "./hook-set-timeout";
import { addFunctionConstructorHook } from "./hook-function-constructor";
import { HookType, isHookEnabled, loadSettings } from "../storage";
import { success, info, debug } from "../logger/logger";

/**
 * 添加所有可用的Hook
 * 
 * 功能说明：
 * 1. 统一添加所有Hook
 * 2. 根据设置决定启用哪些Hook
 * 3. 避免重复添加Hook
 * 
 * 执行顺序：
 * 1. 首先添加eval的Hook（最基础的防护）
 * 2. 然后添加setInterval的Hook（防止定时执行）
 * 3. 添加setTimeout的Hook（防止延时执行）
 * 4. 最后添加Function构造器的Hook（防止构造函数方式执行）
 * 
 * 使用示例：
 * ```typescript
 * // 在脚本初始化时调用
 * addAllHook();
 * 
 * // 之后所有的debugger语句都会被拦截：
 * eval("debugger");                    // 被拦截
 * setInterval(() => { debugger }, 1000); // 被拦截
 * setTimeout(() => { debugger }, 1000);  // 被拦截
 * new Function("debugger")();           // 被拦截
 * ```
 * 
 * 注意事项：
 * 1. 建议在页面加载初期就调用此函数
 * 2. 所有Hook都是可重入的，多次调用是安全的
 * 3. 每个Hook都有自己的防重复机制
 */
export function addAllHook(): void {
    const settings = loadSettings();
    
    // 记录全局启用状态
    if (!settings.enabled) {
        info("JS调试拦截器已禁用，所有Hook均未生效");
        return;
    }

    debug(`开始初始化Hook，当前Hook状态: eval=${settings.enabledHooks[HookType.EVAL]}, function=${settings.enabledHooks[HookType.FUNCTION]}, setInterval=${settings.enabledHooks[HookType.SET_INTERVAL]}, setTimeout=${settings.enabledHooks[HookType.SET_TIMEOUT]}`);
    
    // 检查eval Hook是否启用并添加
    if (isHookEnabled(HookType.EVAL)) {
    addEvalHook();
        success("eval函数Hook已启用，将拦截通过eval执行的debugger语句");
    } else {
        debug("eval函数Hook未启用");
    }
    
    // 检查setInterval Hook是否启用并添加
    if (isHookEnabled(HookType.SET_INTERVAL)) {
    addSetIntervalHook();
        success("setInterval函数Hook已启用，将拦截通过setInterval执行的debugger语句");
    } else {
        debug("setInterval函数Hook未启用");
    }
    
    // 检查setTimeout Hook是否启用并添加
    if (isHookEnabled(HookType.SET_TIMEOUT)) {
        addSetTimeoutHook();
        success("setTimeout函数Hook已启用，将拦截通过setTimeout执行的debugger语句");
    } else {
        debug("setTimeout函数Hook未启用");
    }
    
    // 检查Function构造器Hook是否启用并添加
    if (isHookEnabled(HookType.FUNCTION)) {
    addFunctionConstructorHook();
        success("Function构造器Hook已启用，将拦截通过Function构造器创建的函数中的debugger语句");
    } else {
        debug("Function构造器Hook未启用");
    }
    
    // 记录总结信息
    const enabledHookCount = Object.values(settings.enabledHooks).filter(Boolean).length;
    const totalHookCount = Object.keys(settings.enabledHooks).length;
    
    if (enabledHookCount === totalHookCount) {
        success(`所有Hook类型已成功启用 (${enabledHookCount}/${totalHookCount})，JS调试拦截器已完全激活`);
    } else if (enabledHookCount > 0) {
        info(`部分Hook类型已启用 (${enabledHookCount}/${totalHookCount})，JS调试拦截器已部分激活`);
    } else {
        info("所有Hook类型均已禁用，JS调试拦截器将不会拦截任何debugger语句");
    }
}

/**
 * 根据设置更新Hook
 * 
 * 当设置变更时调用此函数来更新已添加的Hook
 */
export function updateHooks(): void {
    // 重新添加所有Hook（由于Hook内部有防重复机制，这是安全的）
    info("正在根据新的设置更新Hook...");
    addAllHook();
} 