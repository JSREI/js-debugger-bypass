/**
 * 关于页面
 * 
 * 展示JS调试拦截插件的版本信息和使用说明
 */
import { aboutCSS } from './about.css';
import { 
    createProjectSection, 
    createOrganizationSection, 
    createCommunitySection
} from './about.template';
import { GITHUB_STARS_CACHE_KEY, GITHUB_CACHE_TTL } from './about.constants';

/**
 * 创建关于页面
 * 
 * @returns 关于页面DOM元素
 */
export function createAboutPage(): HTMLElement {
    // 创建容器
    const container = document.createElement('div');
    container.className = 'js-debugger-bypass-about';
    
    // 注入样式
    const styleElement = document.createElement('style');
    styleElement.textContent = aboutCSS;
    container.appendChild(styleElement);
    
    // 添加三个主要部分
    container.appendChild(createProjectSection());      // 项目信息部分
    container.appendChild(createOrganizationSection()); // 组织信息部分
    container.appendChild(createCommunitySection());    // 社区加群部分
    
    // 获取GitHub星数
    fetchStarsCount();
    
    return container;
}

/**
 * 获取GitHub仓库的Stars数量
 */
function fetchStarsCount(): void {
    // 检查缓存
    const cached = getStarsFromCache();
    if (cached) {
        updateStarsCount(cached);
        return;
    }
    
    // 从GitHub API获取数据
    const repoApiUrl = 'https://api.github.com/repos/JSREI/js-debugger-bypass';
    
    // 使用GM_xmlhttpRequest进行跨域请求，如果可用
    if (typeof GM_xmlhttpRequest === 'function') {
        GM_xmlhttpRequest({
            method: 'GET',
            url: repoApiUrl,
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            },
            onload: function(response) {
                try {
                    const data = JSON.parse(response.responseText);
                    const stars = data.stargazers_count;
                    // 更新DOM
                    updateStarsCount(stars);
                    // 缓存结果
                    cacheStarsCount(stars);
                } catch (error) {
                    console.error('Error parsing GitHub response:', error);
                    updateStarsCount('--');
                }
            },
            onerror: function(error) {
                console.error('Error fetching GitHub stars:', error);
                updateStarsCount('--');
            }
        });
    } else {
        // 降级到普通fetch
        fetch(repoApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const stars = data.stargazers_count;
                // 更新DOM
                updateStarsCount(stars);
                // 缓存结果
                cacheStarsCount(stars);
            })
            .catch(error => {
                console.error('Error fetching GitHub stars:', error);
                // 获取失败时显示--
                updateStarsCount('--');
            });
    }
}

/**
 * 更新DOM中的Stars数量
 */
function updateStarsCount(count: number | string): void {
    const starsElement = document.getElementById('stars-count');
    if (starsElement) {
        starsElement.textContent = String(count);
    }
}

/**
 * 缓存Stars数量
 */
function cacheStarsCount(stars: number): void {
    try {
        const cacheData = {
            stars,
            timestamp: Date.now()
        };
        
        // 优先使用油猴API存储
        if (typeof GM_setValue === 'function') {
            GM_setValue(GITHUB_STARS_CACHE_KEY, JSON.stringify(cacheData));
        } else {
            // 降级到localStorage
            localStorage.setItem(GITHUB_STARS_CACHE_KEY, JSON.stringify(cacheData));
        }
        
        console.log(`[GitHub Stars] 已缓存: ${stars}，过期时间: ${new Date(Date.now() + GITHUB_CACHE_TTL).toLocaleTimeString()}`);
    } catch (e) {
        console.error('Failed to cache stars count:', e);
    }
}

/**
 * 从缓存中获取Stars数量
 */
function getStarsFromCache(): number | null {
    try {
        let cached: string | null = null;
        
        // 优先使用油猴API读取
        if (typeof GM_getValue === 'function') {
            cached = GM_getValue(GITHUB_STARS_CACHE_KEY, null);
        } else {
            // 降级到localStorage
            cached = localStorage.getItem(GITHUB_STARS_CACHE_KEY);
        }
        
        if (cached) {
            const data = JSON.parse(cached);
            // 检查缓存是否过期
            if (Date.now() - data.timestamp < GITHUB_CACHE_TTL) {
                console.log(`[GitHub Stars] 使用缓存: ${data.stars}，缓存时间: ${new Date(data.timestamp).toLocaleTimeString()}`);
                return data.stars;
            } else {
                console.log(`[GitHub Stars] 缓存已过期，上次缓存时间: ${new Date(data.timestamp).toLocaleTimeString()}`);
            }
        }
    } catch (e) {
        console.error('Failed to get stars from cache:', e);
    }
    return null;
} 