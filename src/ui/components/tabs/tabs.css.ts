/**
 * 标签页样式
 */
import { colors, borders, fonts, transitions, spacing } from '../../styles';
import { generateCSS } from '../../styles';
import { MODAL_CLASS_PREFIX } from '../modal/modal.css';

/**
 * 标签页CSS类名前缀
 */
export const TABS_CLASS_PREFIX = 'js-debugger-bypass-tabs';

/**
 * 标签页样式对象
 */
export const tabsStyles = {
    // 标签页容器
    [`.${TABS_CLASS_PREFIX}-container`]: {
        'display': 'flex',
        'flex-direction': 'column',
        'width': '100%',
        'position': 'relative'
    },
    
    // 标签导航栏
    [`.${TABS_CLASS_PREFIX}-nav`]: {
        'display': 'flex',
        'flex-wrap': 'wrap',
        'border-bottom': `${borders.width} ${borders.style} ${colors.light}`,
        'margin-bottom': spacing.md,
        'position': 'sticky',
        'top': '0',
        'background-color': colors.white,
        'z-index': '10',
        'padding': `${spacing.sm} 0`,
        'box-shadow': '0 2px 4px rgba(0,0,0,0.05)'
    },
    
    // 在模态框中的标签导航栏特殊样式
    [`.${MODAL_CLASS_PREFIX}-content .${TABS_CLASS_PREFIX}-nav`]: {
        'position': 'sticky',
        'top': '0',
        'z-index': '5',
        'background-color': colors.white,
        'margin-top': `-${spacing.md}`,
        'padding-top': spacing.md,
        'width': '100%'
    },
    
    // 在模态框标题区域中的标签导航栏样式
    [`.${MODAL_CLASS_PREFIX}-header .${TABS_CLASS_PREFIX}-nav`]: {
        'margin': '0',
        'padding': '0',
        'border-bottom': 'none',
        'box-shadow': 'none',
        'flex': '1',
        'background-color': 'transparent'
    },
    
    // 在模态框标题中的标签按钮样式
    [`.${MODAL_CLASS_PREFIX}-header .${TABS_CLASS_PREFIX}-tab`]: {
        'padding': `${spacing.xs} ${spacing.md}`,
        'font-size': fonts.size.normal,
        'border-bottom': 'none'
    },
    
    // 在模态框标题中的激活标签样式
    [`.${MODAL_CLASS_PREFIX}-header .${TABS_CLASS_PREFIX}-tab-active`]: {
        'font-weight': fonts.weight.bold,
        'color': colors.primary
    },
    
    // 标签按钮
    [`.${TABS_CLASS_PREFIX}-tab`]: {
        'padding': `${spacing.sm} ${spacing.md}`,
        'cursor': 'pointer',
        'color': colors.dark,
        'background': 'transparent',
        'border': 'none',
        'border-bottom': `2px solid transparent`,
        'margin-bottom': '-1px',
        'font-size': fonts.size.normal,
        'transition': `all ${transitions.fast} ${transitions.easing}`,
        'user-select': 'none',
        'outline': 'none',
        'display': 'flex',
        'align-items': 'center',
        'gap': spacing.xs
    },
    
    // 标签图标
    [`.${TABS_CLASS_PREFIX}-tab-icon`]: {
        'display': 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'font-size': '1.2em',
        'margin-right': spacing.xs
    },
    
    // 在模态框标题中的标签图标
    [`.${MODAL_CLASS_PREFIX}-header .${TABS_CLASS_PREFIX}-tab-icon`]: {
        'font-size': '1.1em'
    },
    
    // 标签文本
    [`.${TABS_CLASS_PREFIX}-tab-text`]: {
        'display': 'inline-block'
    },
    
    // 标签按钮悬停
    [`.${TABS_CLASS_PREFIX}-tab:hover`]: {
        'color': colors.primary,
        'background-color': colors.light
    },
    
    // 活动标签
    [`.${TABS_CLASS_PREFIX}-tab-active`]: {
        'color': colors.primary,
        'border-bottom-color': colors.primary,
        'font-weight': fonts.weight.bold
    },
    
    // 标签内容容器
    [`.${TABS_CLASS_PREFIX}-content`]: {
        'flex': '1',
        'overflow': 'auto',
        'padding-top': spacing.md
    },
    
    // 标签面板
    [`.${TABS_CLASS_PREFIX}-panel`]: {
        'display': 'none'
    },
    
    // 活动面板
    [`.${TABS_CLASS_PREFIX}-panel-active`]: {
        'display': 'block'
    },
    
    // 禁用标签
    [`.${TABS_CLASS_PREFIX}-tab-disabled`]: {
        'opacity': '0.6',
        'cursor': 'not-allowed'
    },
    
    // 过渡动画
    [`.${TABS_CLASS_PREFIX}-panel-enter`]: {
        'opacity': '0',
        'transform': 'translateY(10px)'
    },
    
    [`.${TABS_CLASS_PREFIX}-panel-enter-active`]: {
        'opacity': '1',
        'transform': 'translateY(0)',
        'transition': `all ${transitions.normal} ${transitions.easing}`
    }
};

/**
 * 导出标签页样式字符串
 */
export const tabsCSS = generateCSS(tabsStyles); 