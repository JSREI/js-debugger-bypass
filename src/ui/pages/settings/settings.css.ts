/**
 * 设置页面样式
 */
import { colors, borders, spacing, fonts, shadows, transitions } from '../../styles';

/**
 * 设置页面CSS
 */
export const settingsCSS = `
    .js-debugger-bypass-settings {
        padding: ${spacing.lg};
        font-family: ${fonts.family};
        color: ${colors.dark};
        max-width: 800px;
        margin: 0 auto;
    }
    
    /* 设置卡片样式 */
    .settings-section {
        margin-bottom: ${spacing.xl};
        background-color: ${colors.white};
        border-radius: 8px;
        padding: ${spacing.xl};
        box-shadow: ${shadows.medium};
        border: none;
        transition: all ${transitions.fast} ${transitions.easing};
        position: relative;
        overflow: hidden;
    }
    
    .settings-section:hover {
        box-shadow: ${shadows.large};
        transform: translateY(-2px);
    }
    
    .settings-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background-color: ${colors.primary};
    }
    
    /* 标题样式 */
    .settings-section-title {
        font-size: ${fonts.size.xlarge};
        font-weight: ${fonts.weight.bold};
        margin-bottom: ${spacing.lg};
        color: ${colors.dark};
        padding-bottom: ${spacing.sm};
        border-bottom: 2px solid ${colors.light};
        display: flex;
        align-items: center;
    }
    
    /* 设置项图标 */
    .settings-item-icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background-color: rgba(52, 152, 219, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: ${spacing.sm};
        color: ${colors.primary};
        transition: all ${transitions.fast};
    }
    
    .settings-item:hover .settings-item-icon {
        background-color: rgba(52, 152, 219, 0.2);
        transform: scale(1.1);
    }
    
    /* 设置项图标 - 启用状态 */
    .settings-enabled-icon::before {
        content: "✓";
        font-weight: bold;
        font-size: 16px;
    }
    
    /* 设置项图标 - 日志状态 */
    .settings-log-icon::before {
        content: "📋";
        font-size: 16px;
    }
    
    /* 设置项图标 - Eval函数 */
    .settings-eval-icon::before {
        content: "⚡";
        font-size: 16px;
    }
    
    /* 设置项图标 - Function构造器 */
    .settings-function-icon::before {
        content: "🔧";
        font-size: 16px;
    }
    
    /* 设置项图标 - setInterval */
    .settings-setInterval-icon::before {
        content: "🔄";
        font-size: 16px;
    }
    
    /* 设置项图标 - setTimeout */
    .settings-setTimeout-icon::before {
        content: "⏱";
        font-size: 16px;
    }
    
    /* 帮助图标样式 */
    .settings-help-icon {
        margin-left: ${spacing.sm};
        width: 20px;
        height: 20px;
        color: ${colors.white};
        cursor: help;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: ${colors.primary};
        font-size: 12px;
        position: relative;
        transition: all ${transitions.fast} ${transitions.easing};
        box-shadow: ${shadows.small};
    }
    
    .settings-help-icon:hover {
        background-color: ${colors.secondary};
        transform: scale(1.1);
        box-shadow: ${shadows.medium};
    }
    
    .settings-tooltip {
        position: absolute;
        top: 0;
        background-color: ${colors.dark};
        color: ${colors.white};
        padding: ${spacing.md};
        border-radius: ${borders.radius};
        width: 280px;
        visibility: hidden;
        opacity: 0;
        transition: all ${transitions.normal};
        font-weight: normal;
        font-size: ${fonts.size.normal};
        line-height: 1.5;
        z-index: 9999;
        pointer-events: none;
        box-shadow: ${shadows.medium};
        transform: translateY(-5px);
        /* 智能判断位置，默认向右显示 */
        left: 100%;
        margin-left: ${spacing.sm};
    }
    
    /* 确保提示不溢出可视区域 */
    @media (max-width: 800px) {
        .settings-tooltip {
            /* 在窄屏幕上显示在顶部而非右侧 */
            left: auto;
            right: auto;
            top: auto;
            bottom: 100%;
            margin-bottom: ${spacing.sm};
            margin-left: 0;
            transform: translateY(0);
            width: 200px;
        }
    }
    
    /* 添加悬停时的样式 */
    .settings-help-icon:hover .settings-tooltip {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }
    
    /* JavaScript提供的辅助类，用于位置调整 */
    .settings-tooltip.position-left {
        left: auto;
        right: 100%;
        margin-left: 0;
        margin-right: ${spacing.sm};
    }
    
    .settings-tooltip.position-top {
        left: 50%;
        top: auto;
        bottom: 100%;
        margin-left: -140px; /* 宽度的一半 */
        margin-bottom: ${spacing.sm};
    }
    
    /* 设置项样式 */
    .settings-item {
        display: flex;
        align-items: center;
        margin-bottom: ${spacing.lg};
        padding: ${spacing.md};
        border-radius: 8px;
        background-color: ${colors.lightGray};
        transition: all ${transitions.fast};
    }
    
    .settings-item:hover {
        background-color: rgba(52, 152, 219, 0.05);
        transform: translateX(2px);
    }
    
    .settings-item:last-child {
        margin-bottom: 0;
    }
    
    /* 标签样式 */
    .settings-label {
        flex: 1;
        margin-left: ${spacing.md};
        display: flex;
        flex-direction: column;
        cursor: pointer;
    }
    
    .settings-label-text {
        font-weight: ${fonts.weight.bold};
        color: ${colors.dark};
        margin-bottom: ${spacing.xs};
        font-size: ${fonts.size.normal};
    }
    
    .settings-description {
        font-size: ${fonts.size.small};
        color: ${colors.darkGray};
        line-height: 1.5;
    }
    
    /* 开关控件样式 */
    .settings-switch-container {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 26px;
        flex-shrink: 0;
        z-index: 2;
        cursor: pointer;
    }
    
    .settings-checkbox {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
        z-index: -1;
    }
    
    .settings-switch {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: all ${transitions.normal};
        border-radius: 34px;
        z-index: 1;
    }
    
    .settings-switch:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: all ${transitions.normal};
        border-radius: 50%;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    
    .settings-checkbox:checked + .settings-switch {
        background-color: ${colors.primary};
    }
    
    .settings-checkbox:focus + .settings-switch {
        box-shadow: 0 0 1px ${colors.primary};
    }
    
    .settings-checkbox:checked + .settings-switch:before {
        transform: translateX(24px);
    }
    
    /* 禁用状态 */
    .settings-checkbox:disabled + .settings-switch {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    /* 开关动画 */
    .settings-checkbox + .settings-switch {
        overflow: hidden;
    }
    
    .settings-checkbox + .settings-switch:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 34px;
        background-color: rgba(255, 255, 255, 0.2);
        opacity: 0;
    }
    
    .settings-checkbox:checked + .settings-switch:after {
        opacity: 1;
        transform: scale(1.2);
        transition: opacity ${transitions.fast}, transform ${transitions.normal};
    }
    
    /* 按钮部分样式 */
    .settings-buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: ${spacing.lg};
        padding-top: ${spacing.md};
    }
    
    .settings-button {
        background-color: ${colors.primary};
        color: ${colors.white};
        border: none;
        border-radius: 6px;
        padding: ${spacing.sm} ${spacing.xl};
        font-weight: ${fonts.weight.medium};
        font-size: ${fonts.size.normal};
        cursor: pointer;
        margin-left: ${spacing.md};
        transition: all ${transitions.fast};
        box-shadow: ${shadows.small};
        position: relative;
        overflow: hidden;
    }
    
    .settings-button:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.2);
        opacity: 0;
        transition: opacity ${transitions.fast};
    }
    
    .settings-button:hover:after {
        opacity: 1;
    }
    
    .settings-button.secondary {
        background-color: ${colors.white};
        color: ${colors.dark};
        border: 1px solid ${colors.gray};
    }
    
    .settings-button:hover {
        transform: translateY(-2px);
        box-shadow: ${shadows.medium};
    }
    
    .settings-button.secondary:hover {
        background-color: ${colors.lightGray};
    }
    
    .settings-button:active {
        transform: translateY(0);
        box-shadow: ${shadows.small};
    }
`; 