---
title: "Hugo免费部署azure"
date: 2022-02-11T16:53:15+08:00
tags: ["other","白嫖"]
---

## 前言
市面上有许许多多的静态网站部署，vercel,netify,aws,azure,github pages··· 

我经过多方考虑，最终选择了azure的静态网站部署。下面是一张对照表
ps: 都有免费额度,azure我用的是外币卡注册的，应该学生账号也可以

| | azure  |  vercel  | github pages | 
|---|---|---|---|
| 地区&速度 | 可选香港，速度起飞  | 美国aws，速度一般般| 速度不慢，但github.io经常阻断|
| 免费流量| 100G | 100G | 
| 自定义域名| 2个 | 无限制 | 无限制|
| 自动ssl |  有 |有 |有 |
| serverless |  Azure Functions| 有 | 无|
|最大应用大小| 250mb | 15,000个文件 | 无|

综上，除了地区和速度之外，其他的也差不多，而且，香港的一般也不会阻断，所以我选择azure

## 安装hugo和生成与写博客
[点这里](/posts/hugo安装/)

## 部署至azure
[官方文档](https://docs.microsoft.com/zh-cn/azure/static-web-apps/publish-hugo)

我采用的是github储存

### 将站点推送至github
+ 创建github储存库
+ `git remote add origin https://github.com/<YOUR_USER_NAME>/hugo-static-app`
+ `git push --set-upstream origin main`

### 部署
打开Azure控制台
<https://portal.azure.com/#create/Microsoft.StaticApp>

新建web应用
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gz9pn0rjusj317o0z9ti9.jpg)

主要注意两点
+ 地区选择east aisa(香港)
+ 使用github登录，然后选择你的库

点击创建
这时候azure就会自动生成一个github action，在.github\workflows\xxx.yml,然后会自动运行，就部署上去了
## 自定义域名
在你的控制台下面有个`自定义域`的按钮，点击，在点击`添加即可`
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gz9pssltxxj30wn0kn424.jpg)
## 注意事项
在我的网站实际部署中，因为采用了`atomic-algolia`这个插件，所以在根目录下有`package.json`文件，而azure添加的那个github action文件`azure-static-web-appsxxx.yml`实际上并没有指定编译环境，完全是由[oryx](https://github.com/microsoft/Oryx)这个编译器猜的，所以这玩意猜我是npm项目，而我是hugo,导致了error

解决办法就是在github action文件加一句，`rm package.json`