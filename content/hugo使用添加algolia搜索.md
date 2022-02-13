---
title: "Hugo使用添加algolia搜索"
date: 2022-02-09T21:09:59+08:00
---

## 前言
想把博客作为自己的笔记，用过有道云笔记和onenote，hugo美中不足的地方就是搜索不了笔记，直到后面我发现其实是可以搜索的，搜索方式也是多种多样，主要有3种

|  | elastic  |  lunr |algolia|
|---|---|---| ---|
| 易搭建性  | 难  | 简单 | 中等|
| 收费| 自建服务器或者一些提供商（有免费额度） | 免费 | 收费（有免费额度）|
| 搜索速度| 快 | 中等（基于浏览器，每次需要下载所有索引）| 快|


## 配置algolia账号
### 注册账号
官网<https://www.algolia.com/>
###  创建应用
记住计划选择free,1w的请求和1w的记录应该是够的

### 创建索引

![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzc7wl9kwxj31b30x8qiz.jpg)

### 获取api key
右上角的用户->setting
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzc7zvk8gdj30dg0e2gn6.jpg)

api key
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzc80jk3wzj31vn0kqqau.jpg)


其中，`Application ID` 和 `Search-Only API Key` 是hugo所需要的
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzc812ofowj31si0mmdos.jpg)


## 配置hugo

我是用的是[loveIt](https://github.com/dillonzq/LoveIt)主题，在这个主题的配置文件中有配置搜索这个选项
```toml
  #  搜索配置
  [params.search]
    enable = true
    # 搜索引擎的类型 ("lunr", "algolia")
    type = "algolia"
    # 文章内容最长索引长度
    contentLength = 4000
    # 搜索框的占位提示语
    placeholder = ""
    #  最大结果数目
    maxResultLength = 10
    #  结果内容片段长度
    snippetLength = 50
    #  搜索结果中高亮部分的 HTML 标签
    highlightTag = "em"
    #  是否在搜索索引中使用基于 baseURL 的绝对路径
    absoluteURL = false
    [params.search.algolia]
      index = "blog"
      appID = "xxx"
      searchKey = "xxx"
```
其中`appID`和`searchKey`是上一步提到的

## 索引的上传
至此，你的hugo已经可以使用algolia搜索了，但是还有一个问题，就是algolia并没有数据，即索引，我们需要生成索引，并上传给algolia，告诉他我们有哪些文章内容。

### 非自动方式（不推荐）
运行`hugo`后，在`public`文件夹下面会生成一个`index.json`文件，这个即是索引文件，打开algolia网站，上传即可
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzc8fu19fyj31220ejn23.jpg)

### 自动方式（推荐）
github上面有个npm包，用来自动上传索引<https://github.com/chrisdmacrae/atomic-algolia>使用这个包即可

1. 在你的根目录下新建package.json文件写入如下
```json
{
    "scripts": {
        "algolia": "atomic-algolia"
    }
}
```
2. 添加github action文件到.github\workclows
```yml
name: GitHub Pages

on:
  push:
    branches:
      - main  # Set a branch name to trigger deployment
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-20.04
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.85.0'

      - name: Build
        run: hugo --minify

      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: '12.x'

      - name: Install automic-algolia
        run: | 
          npm install atomic-algolia
          npm run algolia
        env:
          ALGOLIA_APP_ID: ${{ secrets.ALGOLIA_APP_ID }}
          ALGOLIA_ADMIN_KEY: ${{ secrets.ALGOLIA_ADMIN_KEY }}
          ALGOLIA_INDEX_NAME: ${{ secrets.ALGOLIA_INDEX_NAME }}
          ALGOLIA_INDEX_FILE: "./public/index.json"
```
3. 添加action的secrcts
4. git push即可

## 检验
所有配置好后，在站点右上有个搜索图标，点击搜索查看结果
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzc89d2q9mj30fj03gdg1.jpg)

![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzc89txe84j30mh0c8dkg.jpg)

响应速度还是非常快的