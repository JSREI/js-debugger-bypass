// 单独的一个debugger的情况，似乎只能从流量上拦截替换，油猴脚本似乎没啥法子搞丫
// debugger;

import { addAllHook } from "./hooks/hooks";
import { initUI } from "./ui";
import { initialize } from "./init";

// 首先执行初始化，确保所有设置正确（所有开关默认启用）
initialize();

// 在页面初始化的时候设置上各种hook，注意这个hook要在被注入的页面里的其它js代码执行前hook上
addAllHook(); 

// 初始化用户界面（菜单等）
initUI(); 