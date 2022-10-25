---
title: "github镜像搭建"
date: 2022-10-21T12:47:15+08:00
---

# 前言
因为总所周知的原因，在很多地方访问不了github，虽然有些地方能访问，却非常慢。之前有些镜像站如`hub.fastgit.org`,淘宝····现在都不能访问了。似乎是只要流量够大，就会把你封了，所以我写了这个文章，希望有能力的朋友可以自己搭建一个，毕竟溪流汇聚起来也能成为大河。

## 前提
+ 一台海外（含HK,TW）服务器,并且这台服务器有不错的带宽
+ 一个域名

## 安装
首先感谢大佬的仓库 <https://gh.fakev.cn/FastGitORG/nginx-conf>

我在此仓库上做了一些修改
<https://gh.fakev.cn/lyj0309/nginx-conf> 

```sh
# 安装docker-compose
curl -L "https://github.com/docker/compose/releases/download/v2.12.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

# 复制项目

git clone https://gh.fakev.cn/lyj0309/nginx-conf.git

# 启动nginx

docker-compose -d

```

安装 acme.sh ,生成ssl证书，这块不赘述，去官网看即可
<https://gh.fakev.cn/acmesh-official/acme.sh>
需要生成通配域名证书，通过导入dns域名商方式生成


执行脚本
`chmod +x ./install.sh && ./install.sh`

记得把你的域名解析到你的服务器
如你的域名是 fastgit.org
需要解析
+ archive.fastgit.org
+ assets.fastgit.org
+ download.fastgit.org
+ fastgit.org
+ raw.fastgit.org

大功告成，访问你的域名即可