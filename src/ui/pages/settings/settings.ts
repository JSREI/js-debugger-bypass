/**
 * 设置页面
 * 
 * 提供JS调试拦截插件的全局设置功能
 */
import { updateHooks } from '../../../hooks/hooks';
import { loadSettings, saveSettings, resetSettings, SettingsOptions } from '../../../storage';
import { settingsCSS } from './settings.css';
import {
    createStyleElement,
    createBasicSettingsSection,
    createHookSettingsSection,
    createButtonsSection
} from './settings.template';

/**
 * 创建设置页面
 * 
 * @param onChange 设置更改回调
 * @returns 设置页面DOM元素
 */
export function createSettingsPage(onChange?: (settings: SettingsOptions) => void): HTMLElement {
    // 加载当前设置
    const currentSettings = loadSettings();
    
    // 创建设置容器
    const container = document.createElement('div');
    container.className = 'js-debugger-bypass-settings';
    
    // 添加样式
    container.appendChild(createStyleElement(settingsCSS));
    
    // 设置变更处理函数
    const handleSettingsChange = (settings: SettingsOptions) => {
        // 保存设置
        saveSettings(settings);
        
        // 根据新设置更新hooks
        updateHooks();
        
        // 调用外部回调
        if (onChange) {
            onChange(settings);
        }
    };
    
    // 添加基本设置部分
    const basicSection = createBasicSettingsSection(
        currentSettings,
        handleSettingsChange
    );
    container.appendChild(basicSection);
    
    // 添加Hook设置部分
    const hooksSection = createHookSettingsSection(
        currentSettings,
        handleSettingsChange
    );
    container.appendChild(hooksSection);
    
    // 添加按钮部分
    const buttonsSection = createButtonsSection(() => {
        // 重置设置
        const defaults = resetSettings();
        
        // 更新hooks
        updateHooks();
        
        // 刷新页面
        if (onChange) {
            onChange(defaults);
        }
        
        // 重新加载设置页面
        const parent = container.parentElement;
        if (parent) {
            const newSettingsPage = createSettingsPage(onChange);
            parent.replaceChild(newSettingsPage, container);
        }
    });
    container.appendChild(buttonsSection);
    
    return container;
}

// 重新导出存储函数，使其在UI模块中可用
export { loadSettings, saveSettings, resetSettings }; 