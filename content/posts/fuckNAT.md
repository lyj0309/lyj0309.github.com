---
title: "说说NAT的那些事及如何优雅的P2P"
subtitle: ""
date: 2022-04-29T13:23:55+08:00

tags:
- 网络
---

## what is NAT?
总所周知，公网ipv4在中国很紧缺，而我家的宽带又是紧缺之首（中国移动，主要是便宜），便开始了我漫长的研究之旅

## NAT类型
详情看 <https://zhuanlan.zhihu.com/p/446503405>

先说结论：没有公网ip的家庭90%的NAT一般为NAT2或者NAT3类型，所以对于两个设备都在NAT后面的情况，是可以实现P2P的，只是需要一点点帮助（STUN）

## STUN
STUN是一个协议，实现还得是软件
<https://blog.csdn.net/wyl1987527/article/details/80188001>

比如你有一台公网服务器，你可以做个实验，吧这台公网服务器作为STUN的服务器，使用CoreDNS实现
<https://icloudnative.io/posts/wireguard-endpoint-discovery-nat-traversal>

可以看看其实反弹shell也是基于这个原理
<https://zhuanlan.zhihu.com/p/166165803>

## 最简单的方式（现成软件）

### ZeroTier (不推荐)
### Frp (看需求)
### Tailscale (强烈推荐)