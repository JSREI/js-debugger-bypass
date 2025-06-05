/**
 * 模态框样式
 */
import { colors, borders, shadows, fonts, zIndex, transitions, spacing } from '../../styles';
import { generateCSS } from '../../styles';

/**
 * 模态框CSS类名前缀
 */
export const MODAL_CLASS_PREFIX = 'js-debugger-bypass-modal';

/**
 * 模态框样式对象
 */
export const modalStyles = {
    // 遮罩层样式
    [`.${MODAL_CLASS_PREFIX}-overlay`]: {
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'background-color': 'rgba(0, 0, 0, 0.5)',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'z-index': `${zIndex.overlay}`,
        'transition': `opacity ${transitions.normal} ${transitions.easing}`
    },
    
    // 模态框容器样式
    [`.${MODAL_CLASS_PREFIX}-container`]: {
        'position': 'relative',
        'background-color': colors.white,
        'border-radius': borders.radius,
        'box-shadow': shadows.large,
        'max-width': '90%',
        'width': '600px',
        'max-height': '90vh',
        'display': 'flex',
        'flex-direction': 'column',
        'z-index': `${zIndex.modal}`,
        'overflow': 'hidden',
        'transition': `transform ${transitions.normal} ${transitions.easing}, opacity ${transitions.normal} ${transitions.easing}`,
        'transform': 'scale(1)'
    },
    
    // 模态框头部样式
    [`.${MODAL_CLASS_PREFIX}-header`]: {
        'padding': `${spacing.md} ${spacing.lg}`,
        'border-bottom': `${borders.width} ${borders.style} ${colors.light}`,
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        'position': 'sticky',
        'top': '0',
        'background-color': colors.white,
        'z-index': '15',
        'box-shadow': '0 2px 4px rgba(0,0,0,0.05)'
    },
    
    // 模态框标题样式
    [`.${MODAL_CLASS_PREFIX}-title`]: {
        'font-size': fonts.size.heading,
        'font-weight': fonts.weight.bold,
        'margin': '0',
        'color': colors.dark,
        'display': 'flex',
        'align-items': 'center',
        'flex': '1'
    },
    
    // 关闭按钮样式
    [`.${MODAL_CLASS_PREFIX}-close`]: {
        'background': 'none',
        'border': 'none',
        'font-size': '24px',
        'line-height': '1',
        'cursor': 'pointer',
        'color': colors.gray,
        'padding': '0',
        'transition': `color ${transitions.fast} ${transitions.easing}`
    },
    
    [`.${MODAL_CLASS_PREFIX}-close:hover`]: {
        'color': colors.dark
    },
    
    // 模态框内容样式
    [`.${MODAL_CLASS_PREFIX}-content`]: {
        'padding': `${spacing.lg}`,
        'overflow-y': 'auto',
        'flex': '1',
        'scroll-behavior': 'smooth',
        'scroll-padding-top': '60px',
        'padding-bottom': '70px'
    },
    
    // 模态框底部样式
    [`.${MODAL_CLASS_PREFIX}-footer`]: {
        'padding': `${spacing.md} ${spacing.lg}`,
        'border-top': `${borders.width} ${borders.style} ${colors.light}`,
        'display': 'flex',
        'justify-content': 'flex-end',
        'gap': spacing.md,
        'position': 'sticky',
        'bottom': '0',
        'background-color': colors.white,
        'z-index': '15',
        'box-shadow': '0 -2px 4px rgba(0,0,0,0.05)'
    },
    
    // 按钮基础样式
    [`.${MODAL_CLASS_PREFIX}-btn`]: {
        'padding': `${spacing.xs} ${spacing.md}`,
        'border-radius': borders.radius,
        'font-size': fonts.size.normal,
        'cursor': 'pointer',
        'transition': `all ${transitions.fast} ${transitions.easing}`,
        'border': `${borders.width} ${borders.style} transparent`
    },
    
    // 主按钮样式
    [`.${MODAL_CLASS_PREFIX}-btn-primary`]: {
        'background-color': colors.primary,
        'color': colors.white
    },
    
    [`.${MODAL_CLASS_PREFIX}-btn-primary:hover`]: {
        'background-color': '#2980b9'
    },
    
    // 取消按钮样式
    [`.${MODAL_CLASS_PREFIX}-btn-secondary`]: {
        'background-color': colors.gray,
        'color': colors.white
    },
    
    [`.${MODAL_CLASS_PREFIX}-btn-secondary:hover`]: {
        'background-color': '#7f8c8d'
    },
    
    // 隐藏样式
    [`.${MODAL_CLASS_PREFIX}-hidden`]: {
        'display': 'none'
    },
    
    // 动画：进入
    [`.${MODAL_CLASS_PREFIX}-enter`]: {
        'opacity': '0',
        'transform': 'scale(0.9)'
    },
    
    // 动画：离开
    [`.${MODAL_CLASS_PREFIX}-leave`]: {
        'opacity': '0',
        'transform': 'scale(1.1)'
    }
};

/**
 * 导出模态框样式字符串
 */
export const modalCSS = generateCSS(modalStyles); 