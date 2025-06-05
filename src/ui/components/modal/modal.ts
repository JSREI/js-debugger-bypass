/**
 * 模态框组件
 * 
 * 提供创建、打开、关闭模态框的功能
 */
import { injectCSS, on, off, createElement, createElementFromHTML } from '../../core';
import { modalCSS, MODAL_CLASS_PREFIX } from './modal.css';
import { createModalTemplate } from './modal.html';
import { generateId } from '../../core';

/**
 * 模态框配置项接口
 */
export interface ModalOptions {
    id?: string;              // 模态框ID
    title: string;            // 模态框标题
    content?: string | HTMLElement; // 模态框内容
    closable?: boolean;       // 是否可通过点击遮罩层关闭
    hasFooter?: boolean;      // 是否显示底部按钮区域
    onConfirm?: () => void;   // 确认按钮回调
    onCancel?: () => void;    // 取消按钮回调
    onClose?: () => void;     // 关闭按钮回调
    confirmText?: string;     // 确认按钮文本
    cancelText?: string;      // 取消按钮文本
    width?: string;           // 模态框宽度
    destroyOnClose?: boolean; // 关闭时是否销毁DOM
}

/**
 * 模态框类
 */
export class Modal {
    private id: string;
    private options: ModalOptions;
    private isOpen: boolean = false;
    private element: HTMLElement | null = null;
    private overlay: HTMLElement | null = null;
    private closeButton: HTMLElement | null = null;
    private confirmButton: HTMLElement | null = null;
    private cancelButton: HTMLElement | null = null;
    private contentContainer: HTMLElement | null = null;
    
    // 样式是否已注入
    private static stylesInjected = false;
    
    /**
     * 构造函数
     * @param options 模态框配置项
     */
    constructor(options: ModalOptions) {
        this.options = {
            closable: true,
            hasFooter: true,
            destroyOnClose: false,
            confirmText: '确定',
            cancelText: '取消',
            ...options
        };
        
        this.id = this.options.id || `${MODAL_CLASS_PREFIX}-${generateId()}`;
        
        // 注入样式（只需一次）
        if (!Modal.stylesInjected) {
            injectCSS(modalCSS, 'js-debugger-bypass-modal-styles');
            Modal.stylesInjected = true;
        }
        
        // 创建模态框DOM
        this.createModalElement();
    }
    
    /**
     * 创建模态框DOM元素
     */
    private createModalElement(): void {
        // 创建模态框HTML
        const modalHTML = createModalTemplate(
            this.id,
            this.options.title,
            typeof this.options.content === 'string' ? this.options.content : '',
            this.options.hasFooter
        );
        
        // 转换为DOM元素
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = modalHTML.trim();
        this.element = tempDiv.firstChild as HTMLElement;
        
        // 添加到文档中
        document.body.appendChild(this.element);
        
        // 获取元素引用
        this.overlay = document.getElementById(`${this.id}-overlay`);
        this.contentContainer = document.getElementById(`${this.id}-content`);
        this.closeButton = document.getElementById(`${this.id}-close`);
        
        if (this.options.hasFooter) {
            this.confirmButton = document.getElementById(`${this.id}-confirm`);
            this.cancelButton = document.getElementById(`${this.id}-cancel`);
            
            // 设置按钮文本
            if (this.confirmButton && this.options.confirmText) {
                this.confirmButton.textContent = this.options.confirmText;
            }
            if (this.cancelButton && this.options.cancelText) {
                this.cancelButton.textContent = this.options.cancelText;
            }
        }
        
        // 如果内容是HTML元素，则将其添加到内容容器中
        if (this.options.content instanceof HTMLElement && this.contentContainer) {
            this.contentContainer.appendChild(this.options.content);
        }
        
        // 设置自定义宽度
        if (this.options.width && this.element) {
            const container = this.element.querySelector(`.${MODAL_CLASS_PREFIX}-container`);
            if (container instanceof HTMLElement) {
                container.style.width = this.options.width;
            }
        }
        
        // 绑定事件
        this.bindEvents();
    }
    
    /**
     * 绑定事件处理函数
     */
    private bindEvents(): void {
        // 关闭按钮点击事件
        if (this.closeButton) {
            on(this.closeButton, 'click', this.handleClose.bind(this));
        }
        
        // 确认按钮点击事件
        if (this.confirmButton) {
            on(this.confirmButton, 'click', this.handleConfirm.bind(this));
        }
        
        // 取消按钮点击事件
        if (this.cancelButton) {
            on(this.cancelButton, 'click', this.handleCancel.bind(this));
        }
        
        // 遮罩层点击事件（如果配置为可关闭）
        if (this.overlay && this.options.closable) {
            on(this.overlay, 'click', (e: MouseEvent) => {
                if (e.target === this.overlay) {
                    this.handleClose();
                }
            });
        }
        
        // ESC键关闭
        on(document, 'keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.handleClose();
            }
        });
    }
    
    /**
     * 处理关闭事件
     */
    private handleClose(): void {
        this.close();
        if (typeof this.options.onClose === 'function') {
            this.options.onClose();
        }
    }
    
    /**
     * 处理确认事件
     */
    private handleConfirm(): void {
        if (typeof this.options.onConfirm === 'function') {
            this.options.onConfirm();
        }
        this.close();
    }
    
    /**
     * 处理取消事件
     */
    private handleCancel(): void {
        if (typeof this.options.onCancel === 'function') {
            this.options.onCancel();
        }
        this.close();
    }
    
    /**
     * 打开模态框
     */
    public open(): void {
        if (this.isOpen || !this.overlay || !this.element) return;
        
        // 移除隐藏类
        this.overlay.classList.remove(`${MODAL_CLASS_PREFIX}-hidden`);
        
        // 添加进入动画
        const container = this.element.querySelector(`.${MODAL_CLASS_PREFIX}-container`) as HTMLElement;
        if (container) {
            container.classList.add(`${MODAL_CLASS_PREFIX}-enter`);
            
            // 触发重排以应用动画
            void container.offsetHeight;
            
            // 移除动画类
            container.classList.remove(`${MODAL_CLASS_PREFIX}-enter`);
        }
        
        this.isOpen = true;
    }
    
    /**
     * 关闭模态框
     */
    public close(): void {
        if (!this.isOpen || !this.overlay || !this.element) return;
        
        const container = this.element.querySelector(`.${MODAL_CLASS_PREFIX}-container`) as HTMLElement;
        if (container) {
            // 添加离开动画
            container.classList.add(`${MODAL_CLASS_PREFIX}-leave`);
            
            // 动画结束后隐藏
            setTimeout(() => {
                this.overlay?.classList.add(`${MODAL_CLASS_PREFIX}-hidden`);
                container.classList.remove(`${MODAL_CLASS_PREFIX}-leave`);
                
                // 如果设置了关闭时销毁
                if (this.options.destroyOnClose) {
                    this.destroy();
                }
            }, 300); // 与过渡时间保持一致
        } else {
            this.overlay.classList.add(`${MODAL_CLASS_PREFIX}-hidden`);
        }
        
        this.isOpen = false;
    }
    
    /**
     * 切换模态框显示状态
     */
    public toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    /**
     * 设置模态框内容
     * @param content 内容（字符串或HTML元素）
     */
    public setContent(content: string | HTMLElement): void {
        if (!this.contentContainer) return;
        
        // 清空当前内容
        this.contentContainer.innerHTML = '';
        
        // 设置新内容
        if (typeof content === 'string') {
            this.contentContainer.innerHTML = content;
        } else {
            this.contentContainer.appendChild(content);
        }
    }
    
    /**
     * 销毁模态框
     */
    public destroy(): void {
        // 卸载事件监听器
        if (this.closeButton) {
            off(this.closeButton, 'click', this.handleClose.bind(this));
        }
        
        if (this.confirmButton) {
            off(this.confirmButton, 'click', this.handleConfirm.bind(this));
        }
        
        if (this.cancelButton) {
            off(this.cancelButton, 'click', this.handleCancel.bind(this));
        }
        
        // 从DOM中移除
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        
        // 清空引用
        this.element = null;
        this.overlay = null;
        this.closeButton = null;
        this.confirmButton = null;
        this.cancelButton = null;
        this.contentContainer = null;
    }
} 