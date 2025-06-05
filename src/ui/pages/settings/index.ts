/**
 * 设置页面索引
 * 
 * 导出设置页面相关组件和函数
 */

// 导出主组件
export { createSettingsPage } from './settings';

// 导出模板组件
export * from './settings.template';

// 导出常量
export * from './settings.constants';

// 重新导出设置存储函数
export { loadSettings, saveSettings, resetSettings } from './settings'; 