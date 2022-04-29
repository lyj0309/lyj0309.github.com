---
title: "scaleway 0.38欧元/月vps"
date: 2022-02-07T15:06:48+08:00
tags: ["白嫖","cloud","vps"]
---

## 简介
scaleway 是法国的一个云厂商，其中有个服务器只要0.38欧元/月
网址<scaleway.com>

+ 只要ipv6 
+ 基于kvm虚拟，比euserv啥的好多了
+ 有SLA，不怕跑路

### 提醒：
+ 需要外币卡
+ 你最好有v6地址，以连接服务器

## 开通服务器
去官网注册<scaleway.com>后填入付款资料，然后再instances界面新建

![image.png](https://wx1.sinaimg.cn/large/008rgIcAgy1h1kvasrvyyj31fp0bv434.jpg)

选择星尘服务器，这时候一般是显示无货的，有两个区域可选，阿姆斯特丹和巴黎
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1kvcuet53j311m0rb7d8.jpg)



实际上，通过命令行启动就是有货的，网页上的就是在唬你hhhh

下载命令行登录，<https://github.com/scaleway/scaleway-cli/>

添加你的ssh密钥<https://console.scaleway.com/project/credentials>,不会百度

然后通过cli方式创建
+ 巴黎
```sh
scw instance server create type=STARDUST1-S zone=fr-par-1 image=debian_bullseye root-volume=l:10G name=scw-determined-euler ip=none project-id=xxx ipv6=true
```

+ 阿姆斯特丹
```sh
scw instance server create type=STARDUST1-S zone=nl-ams-1 image=debian_bullseye root-volume=l:10G name=scw-determined-euler ip=none project-id=xxx ipv6=true
```

把project-id换成你的即可
在创建实例页面的最下面，那个命令行
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1kvi29w93j30w50b4acv.jpg)

你也可以通过复制他给你的命令行创建，注意type和ipv6字段

## 连接服务器
这里我使用termius

![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1kvojtju7j30dv0rbacv.jpg)
注意key是你添加到scaleway的key

注意，登陆上后，服务器是连不上v4地址的
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1kvrfo7b4j30pu04mmz7.jpg)

如果上ipv4网络参考这篇
<https://luotianyi.vc/5252.html>