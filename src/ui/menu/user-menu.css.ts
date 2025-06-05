/**
 * 注意：该样式文件已不再使用
 * 
 * 由于不再在页面中注入按钮和菜单，此文件仅作为参考保留
 */

/**
 * 菜单CSS类名前缀 (未使用)
 */
export const MENU_CLASS_PREFIX = 'js-debugger-bypass-menu';

/**
 * 菜单样式CSS (未使用)
 */
export const menuCSS = `/* 菜单样式已不再使用 */`;

/* 以下样式代码已不再使用
import { colors, borders, shadows, fonts, zIndex, transitions, spacing } from '../styles';
import { generateCSS } from '../styles';

// 菜单样式对象
const menuStyles = {
    // 菜单按钮样式
    [`.${MENU_CLASS_PREFIX}-button`]: {
        'position': 'fixed',
        'top': '10px',
        'right': '10px',
        'background-color': colors.primary,
        'color': colors.white,
        'border': 'none',
        'border-radius': borders.radius,
        'padding': `${spacing.xs} ${spacing.md}`,
        'font-size': fonts.size.normal,
        'font-weight': fonts.weight.bold,
        'cursor': 'pointer',
        'z-index': `${zIndex.dropdown}`,
        'box-shadow': shadows.small,
        'transition': `background-color ${transitions.fast} ${transitions.easing}`,
        'display': 'flex',
        'align-items': 'center',
        'gap': spacing.xs
    },
    
    [`.${MENU_CLASS_PREFIX}-button:hover`]: {
        'background-color': '#2980b9'
    },
    
    // 菜单图标样式
    [`.${MENU_CLASS_PREFIX}-icon`]: {
        'width': '16px',
        'height': '16px',
        'display': 'inline-block',
        'vertical-align': 'middle'
    },
    
    // 弹出菜单样式
    [`.${MENU_CLASS_PREFIX}-dropdown`]: {
        'position': 'fixed',
        'top': '45px',
        'right': '10px',
        'background-color': colors.white,
        'border-radius': borders.radius,
        'box-shadow': shadows.medium,
        'min-width': '200px',
        'z-index': `${zIndex.dropdown}`,
        'display': 'none',
        'overflow': 'hidden'
    },
    
    // 显示菜单样式
    [`.${MENU_CLASS_PREFIX}-dropdown-show`]: {
        'display': 'block'
    },
    
    // 菜单项样式
    [`.${MENU_CLASS_PREFIX}-item`]: {
        'display': 'block',
        'padding': `${spacing.sm} ${spacing.md}`,
        'color': colors.dark,
        'text-decoration': 'none',
        'cursor': 'pointer',
        'transition': `background-color ${transitions.fast} ${transitions.easing}`,
        'width': '100%',
        'text-align': 'left',
        'border': 'none',
        'background': 'transparent'
    },
    
    [`.${MENU_CLASS_PREFIX}-item:hover`]: {
        'background-color': colors.light
    },
    
    // 分隔线样式
    [`.${MENU_CLASS_PREFIX}-divider`]: {
        'height': '1px',
        'background-color': colors.light,
        'margin': `${spacing.sm} 0`
    }
};
*/ 