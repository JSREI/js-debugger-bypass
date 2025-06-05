/**
 * 设置页面模板
 * 
 * 包含设置页面UI模板创建函数
 */
import { createElement } from '../../core';
import { SettingsOptions, HookType } from '../../../storage';
import {
    BASIC_SETTINGS_CONFIG,
    HOOK_SETTINGS_CONFIG,
    SETTINGS_TITLE
} from './settings.constants';

/**
 * 创建设置页面样式元素
 * 
 * @param css CSS样式内容
 * @returns 样式DOM元素
 */
export function createStyleElement(css: string): HTMLStyleElement {
    const style = document.createElement('style');
    style.textContent = css;
    return style;
}

/**
 * 创建带有帮助提示的部分标题
 * 
 * @param title 标题文本
 * @param tooltip 提示文本
 * @returns 标题DOM元素
 */
export function createSectionTitle(title: string, tooltip?: string): HTMLElement {
    const titleElement = createElement('h3', { className: 'settings-section-title' }, [title]);
    
    // 如果有提示文本，添加帮助图标
    if (tooltip) {
        const helpIcon = createElement('span', { className: 'settings-help-icon' }, ['?']);
        const tooltipElement = createElement('span', { className: 'settings-tooltip' }, [tooltip]);
        helpIcon.appendChild(tooltipElement);
        titleElement.appendChild(helpIcon);
        
        // 动态调整提示气泡位置
        helpIcon.addEventListener('mouseenter', () => {
            // 重置所有位置类
            tooltipElement.classList.remove('position-left', 'position-top');
            
            // 获取元素位置和尺寸
            const helpIconRect = helpIcon.getBoundingClientRect();
            const tooltipRect = tooltipElement.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // 判断右侧空间
            if (helpIconRect.right + tooltipRect.width + 16 > windowWidth) {
                // 右侧空间不足，尝试左侧
                if (helpIconRect.left - tooltipRect.width - 16 > 0) {
                    // 左侧空间充足
                    tooltipElement.classList.add('position-left');
                } else {
                    // 左右空间都不足，显示在顶部中心
                    tooltipElement.classList.add('position-top');
                }
            }
            
            // 检查是否在顶部或底部溢出
            setTimeout(() => {
                const newTooltipRect = tooltipElement.getBoundingClientRect();
                if (newTooltipRect.top < 0) {
                    // 顶部溢出，调整到底部
                    tooltipElement.style.top = 'auto';
                    tooltipElement.style.bottom = '-80px';
                } else if (newTooltipRect.bottom > windowHeight) {
                    // 底部溢出，调整到顶部
                    tooltipElement.style.top = 'auto';
                    tooltipElement.style.bottom = '100%';
                    tooltipElement.style.marginBottom = '8px';
                }
            }, 0);
        });
    }
    
    return titleElement;
}

/**
 * 创建开关控件设置项
 * 
 * @param id 设置ID
 * @param label 显示文本
 * @param description 描述文本
 * @param checked 是否选中
 * @param onChange 值变更回调
 * @returns 设置项DOM元素
 */
export function createCheckboxItem(
    id: string,
    label: string,
    description: string,
    checked: boolean,
    onChange: (checked: boolean) => void
): HTMLElement {
    const item = createElement('div', { className: 'settings-item' }, []);
    
    // 创建图标
    const iconClass = getIconClassForSetting(id);
    const icon = createElement('div', {
        className: `settings-item-icon ${iconClass}`
    }, []);
    
    // 创建开关容器
    const switchContainer = createElement('div', { 
        className: 'settings-switch-container'
    }, []);
    
    // 创建复选框（隐藏但保持功能）
    const checkbox = createElement('input', {
        id: `setting-${id}`,
        className: 'settings-checkbox',
        type: 'checkbox'
    }, []) as HTMLInputElement;
    
    // 设置选中状态
    checkbox.checked = checked;
    
    // 创建开关滑块
    const switchSlider = createElement('span', { 
        className: 'settings-switch'
    }, []);
    
    // 添加事件监听
    checkbox.addEventListener('change', () => {
        onChange(checkbox.checked);
    });
    
    // 修复：为开关滑块单独添加点击事件，确保可以通过点击滑块切换状态
    switchSlider.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        checkbox.checked = !checkbox.checked;
        
        // 手动触发change事件
        const event = new Event('change');
        checkbox.dispatchEvent(event);
    });
    
    // 修复：为整个开关容器添加点击事件，增加点击区域
    switchContainer.addEventListener('click', (e) => {
        // 避免与checkbox原生事件冲突
        if (e.target === checkbox) return;
        
        e.preventDefault();
        e.stopPropagation();
        checkbox.checked = !checkbox.checked;
        
        // 手动触发change事件
        const event = new Event('change');
        checkbox.dispatchEvent(event);
    });
    
    // 组装开关控件
    switchContainer.appendChild(checkbox);
    switchContainer.appendChild(switchSlider);
    
    // 创建标签
    const labelElement = createElement('label', { 
        htmlFor: `setting-${id}`,
        className: 'settings-label'
    }, [
        createElement('span', { className: 'settings-label-text' }, [label]),
        createElement('span', { className: 'settings-description' }, [description])
    ]);
    
    // 修复：为标签添加点击事件，确保点击文本也能切换开关
    labelElement.addEventListener('click', (e) => {
        // 阻止标签默认行为，避免双重触发
        e.preventDefault();
        checkbox.checked = !checkbox.checked;
        
        // 手动触发change事件
        const event = new Event('change');
        checkbox.dispatchEvent(event);
    });
    
    // 组装设置项
    item.appendChild(icon);
    item.appendChild(labelElement);
    item.appendChild(switchContainer);
    
    return item;
}

/**
 * 根据设置ID获取对应的图标类名
 * 
 * @param id 设置ID
 * @returns 图标类名
 */
function getIconClassForSetting(id: string): string {
    switch (id) {
        case 'enabled':
            return 'settings-enabled-icon';
        case 'logDebuggerCalls':
            return 'settings-log-icon';
        case 'eval':
            return 'settings-eval-icon';
        case 'function':
            return 'settings-function-icon';
        case 'setInterval':
            return 'settings-setInterval-icon';
        case 'setTimeout':
            return 'settings-setTimeout-icon';
        default:
            return '';
    }
}

/**
 * 创建基本设置部分
 * 
 * @param settings 当前设置
 * @param onChange 设置变更回调
 * @returns 基本设置DOM元素
 */
export function createBasicSettingsSection(
    settings: SettingsOptions,
    onChange: (settings: SettingsOptions) => void
): HTMLElement {
    const section = createElement('div', { className: 'settings-section' }, []);
    section.appendChild(createSectionTitle(SETTINGS_TITLE));
    
    // 添加基本设置项
    BASIC_SETTINGS_CONFIG.forEach(config => {
        const settingKey = config.id as keyof Pick<SettingsOptions, 'enabled' | 'logDebuggerCalls'>;
        const item = createCheckboxItem(
            config.id,
            config.label,
            config.description,
            settings[settingKey] as boolean,
            (checked: boolean) => {
                // 更新设置并调用回调
                settings[settingKey] = checked;
                onChange(settings);
            }
        );
        section.appendChild(item);
    });
    
    return section;
}

/**
 * 创建Hook设置部分
 * 
 * @param settings 当前设置
 * @param onChange 设置变更回调
 * @returns Hook设置DOM元素
 */
export function createHookSettingsSection(
    settings: SettingsOptions,
    onChange: (settings: SettingsOptions) => void
): HTMLElement {
    const section = createElement('div', { className: 'settings-section' }, []);
    
    // 添加带问号提示的标题
    section.appendChild(createSectionTitle(
        'Bypass Hook设置', 
        '您可以选择启用特定类型的hook，只对特定的JavaScript功能进行拦截。这样可以减少对页面代码的影响，提高兼容性。'
    ));
    
    // 添加每个Hook类型的设置项
    HOOK_SETTINGS_CONFIG.forEach(config => {
        const hookType = config.id as HookType;
        const item = createCheckboxItem(
            hookType,
            config.label,
            config.description,
            settings.enabledHooks[hookType],
            (checked: boolean) => {
                // 更新设置并调用回调
                settings.enabledHooks[hookType] = checked;
                onChange(settings);
            }
        );
        section.appendChild(item);
    });
    
    return section;
}

/**
 * 创建底部按钮部分
 * 
 * @param onReset 重置设置回调
 * @returns 按钮DOM元素
 */
export function createButtonsSection(onReset: () => void): HTMLElement {
    const section = createElement('div', { className: 'settings-buttons' }, []);
    
    // 重置按钮
    const resetButton = createElement('button', {
        className: 'settings-button secondary',
        type: 'button'
    }, ['重置默认']);
    resetButton.addEventListener('click', onReset);
    section.appendChild(resetButton);
    
    return section;
} 