


# 全局设置页面

## 设置如何保存
- 在全局设置中，设置的结果应该使用油猴本身的存储功能保存（记得申请权限），这样的话才能够在所有的界面中共享设置
- 对于配置的保存与读取，最好在src增加一个文件夹模块，这样的话我们
- 页面也要拆分为 样式文件、模板文件、逻辑文件等，不要把所有的代码都放在一个文件中

## 页面内容：【Bypass Hook】设置板块
- 板块标题旁边要有一个问号提示，鼠标移动上去的解释这个选项是干嘛的
    - 就是某些类型的hook可以不加上，如果我们明确知道页面中的debugger的类型的话，可以只勾选对应的类型的bypass，这样子的话就只会加对应类型的hook，这样可以把对页面代码的影响降低到尽可能低 
- 对于全局设置，把hook的几种类型都设置为复选框，让用户能够勾选，然后在添加hook的时候，只有勾选了才会hook并且bypass，没有勾选的就没有必要hook了
- 所以在增加hook断点的时候，需要读取出来设置，根据设置来决定往页面中增加哪些类型的hook




---------------------------------------------------------------------------------------------







# 关于页面
- 对于关于页面，希望能够有几部分的信息
## 仓库信息板块
- 首先是仓库的信息，显示一个GitHub徽标，单击的时候能够跳转到github仓库，我们的仓库地址是 https://github.com/JSREI/js-debugger-bypass 
- 展示仓库的star数量，使用GitHub api来请求，注意加个缓存，半个小时内不重复请求，以免触发GitHub的api的频率限制
- 然后在边上展示一个引导用户去star我们的仓库，比如 star me on GitHub ，然后单击的时候跳转到仓库的主页 

## 组织信息板块
- 展示我们组织的介绍信息，我们的组织是 https://github.com/JSREI
- 单击组织名字的时候，要能够跳转到组织的GitHub主页

## 加入社区群板块
- 加群信息参考以下的代码块中的信息
```
# 逆向技术交流群

## 微信

扫码加入逆向技术微信交流群：

<img src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016230653669.png" style="width: 200px">

如群二维码过期，可以加我个人微信，发送【逆向群】拉你进群：

<img src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20231030132026541-7614065.png" style="width: 200px">

## QQ

[点此](https://qm.qq.com/q/YfdB3w3OEY)扫码加入QQ交流群：

<img src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/jsrei-qq-group.jpg" style="width: 200px">

## TG 

[点此](https://t.me/jsreijsrei)或扫码加入TG交流群：

<img src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016231143315.png" style="width: 200px">

```




---------------------------------------------------------------------------------------------






























