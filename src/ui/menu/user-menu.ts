/**
 * 用户菜单组件
 * 
 * 提供油猴脚本菜单功能，不在页面中注入任何元素
 */
import { injectCSS, on, off, createElement } from '../core';
import { generateId } from '../core';

/**
 * 菜单项接口
 */
export interface MenuItem {
    id?: string;         // 菜单项ID
    text: string;        // 菜单项文本
    onClick?: () => void; // 点击回调
    divider?: boolean;    // 是否显示分隔线
}

/**
 * 菜单配置项接口
 */
export interface UserMenuOptions {
    id?: string;         // 菜单ID
    buttonText?: string; // 按钮文本
    items: MenuItem[];   // 菜单项
}

/**
 * 用户菜单类
 */
export class UserMenu {
    private id: string;
    private options: UserMenuOptions;
    private registeredMenuCommands: number[] = []; // 存储注册的油猴菜单命令ID
    
    /**
     * 构造函数
     * @param options 菜单配置项
     */
    constructor(options: UserMenuOptions) {
        this.options = {
            buttonText: 'JS调试拦截',
            ...options
        };
        
        this.id = this.options.id || `js-debugger-bypass-menu-${generateId()}`;
        
        // 注册油猴菜单
        this.registerTampermonkeyMenus();
    }
    
    /**
     * 注册油猴菜单命令
     */
    private registerTampermonkeyMenus(): void {
        // 检查油猴API是否可用
        if (typeof GM_registerMenuCommand !== 'function') {
            console.warn('油猴API不可用，无法注册菜单命令');
            return;
        }
        
        // 只注册一个"设置"菜单项，点击后打开模态框
        try {
            const settingsItem = this.options.items.find(item => item.text === '设置');
            if (settingsItem && settingsItem.onClick) {
                const commandId = GM_registerMenuCommand('设置', settingsItem.onClick);
                this.registeredMenuCommands.push(commandId);
            }
        } catch (error) {
            console.error('注册油猴菜单命令失败:', error);
        }
    }
    
    /**
     * 添加菜单项
     * @param item 菜单项配置
     */
    public addItem(item: MenuItem): void {
        this.options.items.push(item);
        
        // 只注册设置菜单到油猴
        if (typeof GM_registerMenuCommand === 'function' && !item.divider && item.text === '设置' && item.onClick) {
            try {
                const commandId = GM_registerMenuCommand('设置', item.onClick);
                this.registeredMenuCommands.push(commandId);
            } catch (error) {
                console.error('注册油猴菜单命令失败:', error);
            }
        }
    }
    
    /**
     * 移除菜单项
     * @param id 菜单项ID
     */
    public removeItem(id: string): void {
        this.options.items = this.options.items.filter(item => item.id !== id);
    }
    
    /**
     * 销毁菜单
     */
    public destroy(): void {
        // 注销油猴菜单（如果API支持）
        if (typeof GM_unregisterMenuCommand === 'function') {
            this.registeredMenuCommands.forEach(id => {
                try {
                    GM_unregisterMenuCommand(id);
                } catch (error) {
                    // 忽略错误
                }
            });
        }
    }
} 