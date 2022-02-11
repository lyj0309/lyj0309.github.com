# Hugo安装与使用


市面上有很多博客的生成框架，hugo, wordpress, hexo

我选择hugo有以下几点
+ 我是gopher
+ hugo生成网站快
+ 配置简单

官方网站<https://gohugo.io/>
## 安装

### win
这里推荐使用choco安装, 直接 `choco install hugo`即可
ps: 最好把代理打开，choco会自动走代理

### 生成站点
`hugo new site quickstart`

这时候就会生成一个名叫`quickstart`的文件夹，里面包含了hugo站点的一些东西

### 添加主题
github上面有许许多多的主题，直接去上面搜索即可
<https://github.com/search?q=hugo+theme>

找到心仪的主题，下载或clone到theme文件夹

### 添加页面
`hugo new /posts/{name}.md`

name是你文章的名字，支持中文，运行后会在文件夹下面生成md文件，直接编写即可

ps:现在生成的页面是草稿页面，当你写完后去掉`draft: true`这一行即可变成正式页面

### 配置主题
在hugo站点的跟文件夹下面有一个`config.toml`的配置文件，把里面的`theme`改成你下载的主题

每个主题的配置文件都不一样，你需要仔细浏览主题的教程

### 生成预览
`hugo server -D`即可生成预览，包含草稿
`hugo server`不包含草稿

运行后会生成一个地址，访问即可预览
### 生成静态文件
`hugo -D`包含草稿
`hugo `不包含草稿

运行后，在目录下面会生吃一个public的文件夹，里面即使成品
