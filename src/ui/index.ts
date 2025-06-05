/**
 * UI主入口
 * 
 * 负责初始化和管理UI组件
 */
import { injectCSS } from './core';
import { resetCSS } from './styles';
import { UserMenu } from './menu/user-menu';
import { Modal } from './components/modal/modal';
import { MODAL_CLASS_PREFIX } from './components/modal/modal.css';
import { Tabs } from './components/tabs/tabs';
import { TABS_CLASS_PREFIX } from './components/tabs/tabs.css';
import { createSettingsPage } from './pages/settings';
import { createAboutPage } from './pages/about';
import { addAllHook, updateHooks } from '../hooks/hooks';
import { SettingsOptions, loadSettings } from '../storage';
import { Icons } from './components/icons';

/**
 * UI管理类
 */
export class UI {
    private menu: UserMenu | null = null;
    private modal: Modal | null = null;
    
    /**
     * 初始化UI
     */
    public init(): void {
        // 注入重置样式
        injectCSS(resetCSS, 'js-debugger-bypass-reset-css');
        
        // 加载设置
        const settings = loadSettings();
        
        // 如果设置中启用了插件，添加所有钩子
        if (settings.enabled) {
            // 根据设置更新hooks
            updateHooks();
        }
        
        // 创建菜单
        this.createMenu();
    }
    
    /**
     * 创建菜单
     */
    private createMenu(): void {
        this.menu = new UserMenu({
            buttonText: 'JS调试拦截',
            items: [
                { text: '设置', onClick: () => this.openSettingsModal() }
            ]
        });
    }
    
    /**
     * 打开设置模态框
     */
    private openSettingsModal(): void {
        // 销毁已有模态框
        if (this.modal) {
            this.modal.destroy();
            this.modal = null;
        }
        
        // 创建标签页
        const tabs = new Tabs({
            tabs: [
                {
                    key: 'settings',
                    title: '全局设置',
                    content: '',
                    icon: Icons.settings
                },
                {
                    key: 'about',
                    title: '关于',
                    content: '',
                    icon: Icons.about
                }
            ]
        });
        
        // 获取标签元素
        const tabsElement = tabs.getElement();
        const tabsNav = tabsElement ? tabsElement.querySelector(`.${TABS_CLASS_PREFIX}-nav`) as HTMLElement : null;
        const tabsContent = tabsElement ? tabsElement.querySelector(`.${TABS_CLASS_PREFIX}-content`) as HTMLElement : null;
        
        // 创建模态框
        this.modal = new Modal({
            title: '',
            content: tabsContent || document.createElement('div'),
            width: '650px',
            hasFooter: false
        });
        
        // 将标签导航栏移动到模态框标题区域
        if (this.modal && tabsNav) {
            const titleElement = document.querySelector(`.${MODAL_CLASS_PREFIX}-title`);
            if (titleElement) {
                titleElement.appendChild(tabsNav);
            }
        }
        
        // 添加设置页面
        const settingsContainer = tabs.getPanelElement('settings');
        if (settingsContainer) {
            const settingsPage = createSettingsPage((newSettings: SettingsOptions) => {
                // 根据设置变更来决定是否启用钩子
                if (newSettings.enabled) {
                    updateHooks();
                }
            });
            settingsContainer.appendChild(settingsPage);
        }
        
        // 添加关于页面
        const aboutContainer = tabs.getPanelElement('about');
        if (aboutContainer) {
            const aboutPage = createAboutPage();
            aboutContainer.appendChild(aboutPage);
        }
        
        // 打开模态框
        this.modal.open();
    }
    
    /**
     * 销毁UI
     */
    public destroy(): void {
        if (this.menu) {
            this.menu.destroy();
            this.menu = null;
        }
        
        if (this.modal) {
            this.modal.destroy();
            this.modal = null;
        }
    }
}

/**
 * 创建并导出单例实例
 */
export const ui = new UI();

/**
 * 初始化UI
 */
export function initUI(): void {
    ui.init();
} 