/**
 * 标签页HTML模板
 */
import { TABS_CLASS_PREFIX } from './tabs.css';

/**
 * 标签项接口
 */
export interface TabItem {
    key: string;       // 标签唯一标识
    title: string;     // 标签标题
    content: string;   // 标签内容（HTML字符串）
    disabled?: boolean; // 是否禁用
    icon?: string;     // 标签图标（HTML字符串，可以是SVG或字体图标）
}

/**
 * 生成标签页HTML模板
 * 
 * @param id 标签页容器ID
 * @param tabs 标签项数组
 * @param activeKey 默认激活的标签项key
 * @returns 标签页HTML模板字符串
 */
export function createTabsTemplate(
    id: string,
    tabs: TabItem[],
    activeKey?: string
): string {
    const defaultActiveKey = activeKey || (tabs.length > 0 ? tabs[0].key : '');
    
    return `
        <div id="${id}" class="${TABS_CLASS_PREFIX}-container">
            <div class="${TABS_CLASS_PREFIX}-nav" role="tablist">
                ${tabs.map(tab => createTabNavTemplate(id, tab, tab.key === defaultActiveKey)).join('')}
            </div>
            <div class="${TABS_CLASS_PREFIX}-content">
                ${tabs.map(tab => createTabPanelTemplate(id, tab, tab.key === defaultActiveKey)).join('')}
            </div>
        </div>
    `;
}

/**
 * 生成标签导航按钮HTML模板
 * 
 * @param id 标签页容器ID
 * @param tab 标签项
 * @param isActive 是否为激活状态
 * @returns 标签导航按钮HTML模板字符串
 */
function createTabNavTemplate(
    id: string,
    tab: TabItem,
    isActive: boolean
): string {
    const activeClass = isActive ? `${TABS_CLASS_PREFIX}-tab-active` : '';
    const disabledClass = tab.disabled ? `${TABS_CLASS_PREFIX}-tab-disabled` : '';
    
    return `
        <button 
            id="${id}-tab-${tab.key}" 
            class="${TABS_CLASS_PREFIX}-tab ${activeClass} ${disabledClass}"
            role="tab"
            aria-controls="${id}-panel-${tab.key}"
            aria-selected="${isActive}"
            data-tab-key="${tab.key}"
            ${tab.disabled ? 'disabled' : ''}
        >
            ${tab.icon ? `<span class="${TABS_CLASS_PREFIX}-tab-icon">${tab.icon}</span>` : ''}
            <span class="${TABS_CLASS_PREFIX}-tab-text">${tab.title}</span>
        </button>
    `;
}

/**
 * 生成标签内容面板HTML模板
 * 
 * @param id 标签页容器ID
 * @param tab 标签项
 * @param isActive 是否为激活状态
 * @returns 标签内容面板HTML模板字符串
 */
function createTabPanelTemplate(
    id: string,
    tab: TabItem,
    isActive: boolean
): string {
    const activeClass = isActive ? `${TABS_CLASS_PREFIX}-panel-active` : '';
    
    return `
        <div 
            id="${id}-panel-${tab.key}" 
            class="${TABS_CLASS_PREFIX}-panel ${activeClass}"
            role="tabpanel"
            aria-labelledby="${id}-tab-${tab.key}"
            data-tab-key="${tab.key}"
        >
            ${tab.content}
        </div>
    `;
} 