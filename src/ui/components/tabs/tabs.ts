/**
 * 标签页组件
 * 
 * 提供创建标签页、切换标签的功能
 */
import { injectCSS, on, off, createElement, createElementFromHTML } from '../../core';
import { tabsCSS, TABS_CLASS_PREFIX } from './tabs.css';
import { createTabsTemplate, TabItem } from './tabs.html';
import { generateId } from '../../core';

/**
 * 标签页配置项接口
 */
export interface TabsOptions {
    id?: string;                // 标签页ID
    tabs: TabItem[];            // 标签项数组
    activeKey?: string;         // 默认激活的标签键
    onChange?: (key: string) => void; // 切换回调
}

/**
 * 标签页类
 */
export class Tabs {
    private id: string;
    private options: TabsOptions;
    private element: HTMLElement | null = null;
    private activeKey: string;
    private tabButtons: HTMLElement[] = [];
    private tabPanels: HTMLElement[] = [];
    
    // 样式是否已注入
    private static stylesInjected = false;
    
    /**
     * 构造函数
     * @param options 标签页配置项
     */
    constructor(options: TabsOptions) {
        this.options = { ...options };
        
        this.id = this.options.id || `${TABS_CLASS_PREFIX}-${generateId()}`;
        this.activeKey = this.options.activeKey || (this.options.tabs.length > 0 ? this.options.tabs[0].key : '');
        
        // 注入样式（只需一次）
        if (!Tabs.stylesInjected) {
            injectCSS(tabsCSS, 'js-debugger-bypass-tabs-styles');
            Tabs.stylesInjected = true;
        }
        
        // 创建标签页DOM
        this.createTabsElement();
    }
    
    /**
     * 创建标签页DOM元素
     */
    private createTabsElement(): void {
        // 创建标签页HTML
        const tabsHTML = createTabsTemplate(
            this.id,
            this.options.tabs,
            this.activeKey
        );
        
        // 转换为DOM元素
        this.element = createElementFromHTML(tabsHTML);
        
        // 获取标签按钮和面板引用
        this.tabButtons = Array.from(
            this.element.querySelectorAll(`.${TABS_CLASS_PREFIX}-tab`)
        ) as HTMLElement[];
        
        this.tabPanels = Array.from(
            this.element.querySelectorAll(`.${TABS_CLASS_PREFIX}-panel`)
        ) as HTMLElement[];
        
        // 绑定事件
        this.bindEvents();
    }
    
    /**
     * 绑定事件
     */
    private bindEvents(): void {
        // 标签点击事件
        this.tabButtons.forEach(button => {
            if (!button.hasAttribute('disabled')) {
                on(button, 'click', this.handleTabClick.bind(this));
            }
        });
    }
    
    /**
     * 处理标签点击事件
     */
    private handleTabClick(event: Event): void {
        const target = event.currentTarget as HTMLElement;
        const key = target.getAttribute('data-tab-key');
        
        if (key && key !== this.activeKey) {
            this.setActiveTab(key);
            
            // 触发onChange回调
            if (typeof this.options.onChange === 'function') {
                this.options.onChange(key);
            }
        }
    }
    
    /**
     * 设置激活的标签
     * @param key 标签键
     */
    public setActiveTab(key: string): void {
        // 找到对应的标签和面板
        const targetButton = this.tabButtons.find(
            button => button.getAttribute('data-tab-key') === key
        );
        
        const targetPanel = this.tabPanels.find(
            panel => panel.getAttribute('data-tab-key') === key
        );
        
        if (!targetButton || !targetPanel) return;
        
        // 更新激活标签状态
        this.tabButtons.forEach(button => {
            button.classList.remove(`${TABS_CLASS_PREFIX}-tab-active`);
            button.setAttribute('aria-selected', 'false');
        });
        
        targetButton.classList.add(`${TABS_CLASS_PREFIX}-tab-active`);
        targetButton.setAttribute('aria-selected', 'true');
        
        // 更新面板显示状态
        this.tabPanels.forEach(panel => {
            panel.classList.remove(`${TABS_CLASS_PREFIX}-panel-active`);
        });
        
        // 添加动画类
        targetPanel.classList.add(`${TABS_CLASS_PREFIX}-panel-enter`);
        
        // 触发重排以应用动画
        void targetPanel.offsetHeight;
        
        // 添加激活和动画激活类
        targetPanel.classList.add(`${TABS_CLASS_PREFIX}-panel-active`);
        targetPanel.classList.add(`${TABS_CLASS_PREFIX}-panel-enter-active`);
        
        // 动画结束后移除动画类
        setTimeout(() => {
            targetPanel.classList.remove(`${TABS_CLASS_PREFIX}-panel-enter`);
            targetPanel.classList.remove(`${TABS_CLASS_PREFIX}-panel-enter-active`);
        }, 300);
        
        // 更新当前激活键
        this.activeKey = key;
    }
    
    /**
     * 获取激活的标签键
     */
    public getActiveKey(): string {
        return this.activeKey;
    }
    
    /**
     * 获取DOM元素
     */
    public getElement(): HTMLElement | null {
        return this.element;
    }
    
    /**
     * 将标签页添加到指定容器
     * @param container 容器元素
     */
    public appendTo(container: HTMLElement): void {
        if (this.element && container) {
            container.appendChild(this.element);
        }
    }
    
    /**
     * 获取标签面板元素
     * @param key 标签键
     */
    public getPanelElement(key: string): HTMLElement | null {
        const panel = this.tabPanels.find(
            panel => panel.getAttribute('data-tab-key') === key
        );
        return panel || null;
    }
    
    /**
     * 销毁标签页
     */
    public destroy(): void {
        // 卸载事件监听器
        this.tabButtons.forEach(button => {
            if (!button.hasAttribute('disabled')) {
                off(button, 'click', this.handleTabClick.bind(this));
            }
        });
        
        // 从DOM中移除
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        
        // 清空引用
        this.element = null;
        this.tabButtons = [];
        this.tabPanels = [];
    }
} 