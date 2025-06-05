/**
 * 关于页面样式
 */
import { colors, borders, spacing, fonts, shadows } from '../../styles';

/**
 * 生成关于页面样式
 */
export const aboutCSS = `
    .js-debugger-bypass-about {
        padding: ${spacing.lg};
        font-family: ${fonts.family};
        color: ${colors.dark};
        line-height: 1.6;
        max-width: 1000px;
        margin: 0 auto;
    }
    
    .about-section {
        margin-bottom: ${spacing.xl};
        padding: ${spacing.lg};
        border-radius: ${borders.radius};
        background-color: ${colors.white};
        box-shadow: ${shadows.small};
        transition: box-shadow 0.3s ease;
    }
    
    .about-section:hover {
        box-shadow: ${shadows.medium};
    }
    
    .about-title {
        font-size: ${fonts.size.xlarge};
        font-weight: ${fonts.weight.bold};
        margin-bottom: ${spacing.md};
        color: ${colors.primary};
        position: relative;
        padding-bottom: ${spacing.sm};
        border-bottom: 2px solid ${colors.lightGray};
    }
    
    h2.about-title {
        font-size: ${fonts.size.large};
        color: ${colors.secondary};
        margin-bottom: ${spacing.md};
    }
    
    .about-version {
        font-size: ${fonts.size.small};
        color: ${colors.white};
        margin-left: ${spacing.md};
        background-color: ${colors.secondary};
        padding: ${spacing.xs} ${spacing.sm};
        border-radius: ${borders.radius};
        display: inline-block;
        vertical-align: middle;
    }
    
    .about-description {
        margin-bottom: ${spacing.md};
        line-height: 1.7;
        color: ${colors.darkGray};
    }
    
    .about-link {
        color: ${colors.primary};
        text-decoration: none;
        cursor: pointer;
        font-weight: ${fonts.weight.medium};
        transition: color 0.2s;
    }
    
    .about-link:hover {
        color: ${colors.secondary};
        text-decoration: underline;
    }
    
    /* 项目信息部分 */
    .project-info {
        display: flex;
        flex-direction: column;
        gap: ${spacing.md};
    }
    
    .project-header {
        display: flex;
        align-items: center;
        margin-bottom: ${spacing.md};
    }
    
    .project-icon {
        font-size: 32px;
        margin-right: ${spacing.md};
        color: ${colors.primary};
    }
    
    .project-title-container {
        flex: 1;
    }
    
    /* 仓库信息卡片 */
    .repo-info {
        display: flex;
        align-items: center;
        padding: ${spacing.md};
        background: linear-gradient(135deg, ${colors.lightBlue}, ${colors.light});
        border-radius: ${borders.radius};
        box-shadow: ${shadows.small};
        transition: transform 0.2s, box-shadow 0.2s;
        margin-top: ${spacing.md};
    }
    
    .repo-info:hover {
        transform: translateY(-3px);
        box-shadow: ${shadows.medium};
    }
    
    .github-logo {
        width: 32px;
        height: 32px;
        margin-right: ${spacing.md};
    }
    
    .repo-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: ${spacing.xs};
    }
    
    .repo-name {
        font-size: ${fonts.size.large};
        font-weight: ${fonts.weight.bold};
        color: ${colors.dark};
    }
    
    .repo-description {
        font-size: ${fonts.size.small};
        color: ${colors.darkGray};
    }
    
    .star-btn {
        margin-left: ${spacing.md};
        background-color: ${colors.white};
        border: ${borders.width} ${borders.style} ${colors.gray};
        border-radius: ${borders.radius};
        padding: ${spacing.sm} ${spacing.md};
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: ${fonts.size.normal};
        transition: all 0.2s;
        box-shadow: ${shadows.tiny};
        white-space: nowrap;
    }
    
    .star-btn:hover {
        background-color: #f0f0f0;
        transform: translateY(-1px);
        box-shadow: ${shadows.small};
    }
    
    .star-icon {
        margin-right: ${spacing.xs};
        color: #f1c40f;
        font-size: 18px;
    }
    
    .stars-count {
        font-weight: ${fonts.weight.bold};
        margin-left: ${spacing.sm};
        background-color: ${colors.primary};
        color: white;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 14px;
    }
    
    /* 工具特性卡片 */
    .features-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: ${spacing.lg};
        margin-top: ${spacing.lg};
        margin-bottom: ${spacing.lg};
    }
    
    .feature-card {
        background-color: ${colors.white};
        border: 1px solid ${colors.light};
        border-radius: ${borders.radius};
        padding: ${spacing.lg};
        display: flex;
        align-items: flex-start;
        box-shadow: ${shadows.small};
        transition: transform 0.2s, box-shadow 0.2s;
        position: relative;
        overflow: hidden;
        z-index: 1;
    }
    
    .feature-card:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: ${colors.primary};
        z-index: 2;
    }
    
    .feature-card:hover {
        transform: translateY(-3px);
        box-shadow: ${shadows.medium};
        border-color: ${colors.primary}50;
    }
    
    .feature-icon {
        font-size: 28px;
        margin-right: ${spacing.md};
        color: ${colors.primary};
        background-color: ${colors.lightBlue}30;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        flex-shrink: 0;
    }
    
    .feature-content {
        flex: 1;
    }
    
    .feature-title {
        font-weight: ${fonts.weight.bold};
        margin-bottom: ${spacing.sm};
        color: ${colors.dark};
        font-size: ${fonts.size.large};
    }
    
    .feature-desc {
        font-size: ${fonts.size.normal};
        color: ${colors.darkGray};
        line-height: 1.5;
    }
    
    /* 组织信息部分 */
    .org-container {
        display: flex;
        align-items: center;
        background-color: ${colors.lightGray};
        padding: ${spacing.md};
        border-radius: ${borders.radius};
        margin-top: ${spacing.md};
    }
    
    .org-icon {
        font-size: 28px;
        margin-right: ${spacing.md};
        color: ${colors.secondary};
    }
    
    /* 群组部分 */
    .group-section {
        display: flex;
        flex-wrap: wrap;
        gap: ${spacing.lg};
        margin-top: ${spacing.md};
        justify-content: center;
    }
    
    .qr-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 200px;
        padding: ${spacing.md};
        background-color: ${colors.white};
        border-radius: ${borders.radius};
        box-shadow: ${shadows.small};
        transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .qr-container:hover {
        transform: translateY(-5px);
        box-shadow: ${shadows.medium};
    }
    
    .qr-title {
        display: flex;
        align-items: center;
        font-weight: ${fonts.weight.bold};
        margin-bottom: ${spacing.sm};
        color: ${colors.dark};
    }
    
    .qr-title-icon {
        margin-right: ${spacing.xs};
    }
    
    .qr-image-wrapper {
        width: 160px;
        height: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${spacing.xs};
        border: ${borders.width} ${borders.style} ${colors.light};
        border-radius: ${borders.radius};
    }
    
    .qr-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
    
    .qr-description {
        font-size: ${fonts.size.small};
        text-align: center;
        margin-top: ${spacing.sm};
        color: ${colors.gray};
        padding: ${spacing.xs} ${spacing.sm};
        background-color: ${colors.lightGray};
        border-radius: ${borders.radius};
        width: 100%;
    }
`; 