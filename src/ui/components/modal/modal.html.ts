/**
 * 模态框HTML模板
 */
import { MODAL_CLASS_PREFIX } from './modal.css';

/**
 * 生成模态框HTML模板
 * 
 * @param id 模态框ID
 * @param title 模态框标题
 * @param content 模态框内容（HTML字符串或元素）
 * @param hasFooter 是否显示底部按钮区域
 * @returns 模态框HTML模板字符串
 */
export function createModalTemplate(
    id: string,
    title: string,
    content: string = '',
    hasFooter: boolean = true
): string {
    return `
        <div id="${id}-overlay" class="${MODAL_CLASS_PREFIX}-overlay ${MODAL_CLASS_PREFIX}-hidden">
            <div id="${id}" class="${MODAL_CLASS_PREFIX}-container ${MODAL_CLASS_PREFIX}-enter">
                <div class="${MODAL_CLASS_PREFIX}-header">
                    <h3 class="${MODAL_CLASS_PREFIX}-title">${title}</h3>
                    <button id="${id}-close" class="${MODAL_CLASS_PREFIX}-close" aria-label="关闭">×</button>
                </div>
                <div id="${id}-content" class="${MODAL_CLASS_PREFIX}-content">
                    ${content}
                </div>
                ${hasFooter ? createFooterTemplate(id) : ''}
            </div>
        </div>
    `;
}

/**
 * 生成模态框底部按钮区域模板
 * 
 * @param id 模态框ID
 * @returns 底部按钮区域HTML模板字符串
 */
function createFooterTemplate(id: string): string {
    return `
        <div class="${MODAL_CLASS_PREFIX}-footer">
            <button id="${id}-cancel" class="${MODAL_CLASS_PREFIX}-btn ${MODAL_CLASS_PREFIX}-btn-secondary">取消</button>
            <button id="${id}-confirm" class="${MODAL_CLASS_PREFIX}-btn ${MODAL_CLASS_PREFIX}-btn-primary">确定</button>
        </div>
    `;
} 