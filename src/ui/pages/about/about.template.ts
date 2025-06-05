/**
 * 关于页面模板
 */
import { createElement } from '../../core';
import {
    VERSION, REPO_URL, ORGANIZATION_URL, ORGANIZATION_NAME,
    WECHAT_GROUP_QR_URL, WECHAT_PERSONAL_QR_URL,
    QQ_GROUP_QR_URL, TG_GROUP_QR_URL,
    QQ_GROUP_URL, TG_GROUP_URL
} from './about.constants';

/**
 * 创建项目信息部分
 * 包含项目名称、版本、描述、仓库信息和功能介绍
 */
export function createProjectSection(): HTMLElement {
    const section = createElement('div', { className: 'about-section' }, []);
    
    // 1. 项目标题与图标
    const header = createElement('div', { className: 'project-header' }, [
        createElement('div', { className: 'project-icon' }, ['🛡️']),
        createElement('div', { className: 'project-title-container' }, [
            createElement('h1', { className: 'about-title' }, [
                'JS调试拦截 ',
                createElement('span', {}, ['(JavaScript Debugger Bypass)']),
                createElement('span', { className: 'about-version' }, [`v${VERSION}`])
            ])
        ])
    ]);
    section.appendChild(header);
    
    // 2. 项目简介
    const description = createElement('p', { className: 'about-description' }, [
        '一款专为JavaScript反调试设计的工具，通过拦截和禁用网页中的debugger陷阱，帮助开发者更轻松地分析代码。它可以自动识别并拦截各种debugger调用方式，让您的调试工作更加顺畅。'
    ]);
    section.appendChild(description);
    
    // 3. 仓库信息卡片
    section.appendChild(createRepoCard());
    
    // 4. 主要功能列表
    section.appendChild(createElement('h2', { className: 'about-title' }, ['主要功能']));
    
    const features = [
        { icon: '🛑', title: '拦截eval执行的debugger', desc: '阻止通过eval函数执行的debugger语句' },
        { icon: '🔍', title: '拦截Function构造器创建的debugger', desc: '阻止通过Function构造器动态创建的debugger' },
        { icon: '⏱️', title: '拦截计时器中的debugger', desc: '阻止通过setInterval/setTimeout定时执行的debugger' },
        { icon: '🔄', title: '自动识别调试陷阱', desc: '自动识别并处理各类debugger调用' }
    ];
    
    const featuresContainer = createElement('div', { className: 'features-container' }, []);
    
    features.forEach(feature => {
        const featureCard = createElement('div', { className: 'feature-card' }, [
            createElement('div', { className: 'feature-icon' }, [feature.icon]),
            createElement('div', { className: 'feature-content' }, [
                createElement('div', { className: 'feature-title' }, [feature.title]),
                createElement('div', { className: 'feature-desc' }, [feature.desc])
            ])
        ]);
        featuresContainer.appendChild(featureCard);
    });
    
    section.appendChild(featuresContainer);
    
    return section;
}

/**
 * 创建仓库信息卡片
 */
export function createRepoCard(): HTMLElement {
    const repoInfo = createElement('div', { className: 'repo-info' }, []);
    
    // GitHub徽标图标
    const githubLogo = createElement('img', { 
        className: 'github-logo',
        src: 'https://github.githubassets.com/favicons/favicon.svg',
        alt: 'GitHub'
    }, []);
    
    // 仓库文本信息
    const repoText = createElement('div', { className: 'repo-text' }, [
        createElement('a', { 
            className: 'repo-name',
            href: REPO_URL,
            target: '_blank'
        }, ['JSREI/js-debugger-bypass']),
        createElement('div', { className: 'repo-description' }, [
            'JavaScript调试拦截工具 | 反调试神器 | 拦截无限debugger'
        ])
    ]);
    
    // Star按钮
    const starBtn = createElement('a', { 
        className: 'star-btn',
        href: `${REPO_URL}/stargazers`,
        target: '_blank',
        title: '在GitHub上给项目加星标'
    }, [
        createElement('span', { className: 'star-icon' }, ['★']),
        'Star on GitHub',
        createElement('span', { className: 'stars-count', id: 'stars-count' }, ['--'])
    ]);
    
    repoInfo.appendChild(githubLogo);
    repoInfo.appendChild(repoText);
    repoInfo.appendChild(starBtn);
    
    return repoInfo;
}

/**
 * 创建组织信息部分
 */
export function createOrganizationSection(): HTMLElement {
    const section = createElement('div', { className: 'about-section' }, [
        createElement('h2', { className: 'about-title' }, ['关于我们'])
    ]);
    
    // 组织信息容器
    const orgContainer = createElement('div', { className: 'org-container' }, []);
    
    // 组织图标
    const orgIcon = createElement('div', { className: 'org-icon' }, ['🏢']);
    
    // 组织描述
    const orgDesc = createElement('div', { className: 'about-description', style: 'margin: 0' }, [
        `本项目由 `,
        createElement('a', { 
            className: 'about-link',
            href: ORGANIZATION_URL,
            target: '_blank'
        }, [ORGANIZATION_NAME]),
        ` 组织开发维护，致力于JavaScript逆向工程相关工具和知识分享。我们专注于Web调试、爬虫对抗和前端安全方面的技术研究与开发，努力为社区提供高质量的开源工具和学习资源。`
    ]);
    
    orgContainer.appendChild(orgIcon);
    orgContainer.appendChild(orgDesc);
    section.appendChild(orgContainer);
    
    return section;
}

/**
 * 创建社区群组部分
 */
export function createCommunitySection(): HTMLElement {
    const section = createElement('div', { className: 'about-section' }, [
        createElement('h2', { className: 'about-title' }, ['加入社区交流群']),
        createElement('p', { className: 'about-description' }, [
            '欢迎加入我们的技术交流社区，分享经验、讨论问题、共同进步。扫描下方二维码或点击链接即可加入对应群组。'
        ])
    ]);
    
    // 群组信息容器
    section.appendChild(createCommunityGroups());
    
    return section;
}

/**
 * 创建社区群组信息元素
 */
function createCommunityGroups(): HTMLElement {
    const groupsContainer = createElement('div', { className: 'group-section' }, []);
    
    // 群组信息
    const groups = [
        { 
            title: '微信交流群', 
            qrUrl: WECHAT_GROUP_QR_URL, 
            desc: '扫码加入微信交流群',
            icon: '💬' 
        },
        { 
            title: '个人微信', 
            qrUrl: WECHAT_PERSONAL_QR_URL, 
            desc: '发送【逆向群】拉你进群',
            icon: '👤' 
        },
        { 
            title: 'QQ交流群', 
            qrUrl: QQ_GROUP_QR_URL, 
            desc: '点击加入QQ群',
            link: QQ_GROUP_URL,
            icon: '🐧' 
        },
        { 
            title: 'Telegram群组', 
            qrUrl: TG_GROUP_QR_URL, 
            desc: '点击加入TG群',
            link: TG_GROUP_URL,
            icon: '✈️' 
        }
    ];
    
    groups.forEach(group => {
        const container = createElement('div', { className: 'qr-container' }, []);
        
        // 标题与图标
        const titleContainer = createElement('div', { className: 'qr-title' }, [
            createElement('span', { className: 'qr-title-icon' }, [group.icon]),
            group.title
        ]);
        
        // 二维码图片容器和图片
        const qrWrapper = createElement('div', { className: 'qr-image-wrapper' }, []);
        const qrImage = createElement('img', { 
            className: 'qr-image',
            src: group.qrUrl,
            alt: `${group.title}二维码`,
            loading: 'lazy'
        }, []);
        qrWrapper.appendChild(qrImage);
        
        // 描述文本
        const description = createElement('div', { className: 'qr-description' }, []);
        
        if (group.link) {
            description.appendChild(createElement('a', { 
                className: 'about-link',
                href: group.link,
                target: '_blank'
            }, [group.desc]));
        } else {
            description.textContent = group.desc;
        }
        
        container.appendChild(titleContainer);
        container.appendChild(qrWrapper);
        container.appendChild(description);
        groupsContainer.appendChild(container);
    });
    
    return groupsContainer;
} 