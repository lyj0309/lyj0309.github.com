# gcp实例创建和开启ipv6


## 前言
gcp提供一个免费辣鸡实例，作为白嫖资深用户，当然是必须搞起
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u1cak03pj30re0pdjy8.jpg)
Ps: 流量不能来中国，不然就要价钱，所以亮机就好

**需要有gcp账号**
## 创建ipv6网络
自动子网模式不支持ipv6，要先修改，这里已经修改完了
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u1vsrickj30ld0boq5g.jpg)
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u1wbdtytj30ls0hrmzr.jpg)

在cloud shell中运行命令以启用ipv6（必须关闭自动子网模式）
<https://cloud.google.com/vpc/docs/create-modify-vpc-networks?hl=zh-cn#console_5>
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u1xew6k4j312j0ijag0.jpg)

## 配置防火墙
修改一下入站规则
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u1ms5fnvj31480ktwp1.jpg)
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u1orvvqij30q90i640j.jpg)

添加ipv6规则
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u1pwuaylj30qa0n7ach.jpg)

## 创建虚拟机
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u1dsog9qj30l50o1q6j.jpg)

地区选择免费列表里面的就好，性能选择e2-micro
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u1fy3mvvj30r00r2ae3.jpg)


默认是10g硬盘，但免费是30g，所以可以再加大点

![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u1gfjfxqj315i0k3n1n.jpg)

### 特别注意，免费磁盘是标准永久性磁盘
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h2b9eu98q6j30lv07agms.jpg)

打开高级选项以配置ssh和ipv6

![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u1hmjrs8j30eo02gq38.jpg)

在网络接口这里选择双栈
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u1inwlqsj30lo0ecgn3.jpg)

在安全，管理访问权限这里添加ssh公钥（可选，推荐）
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u1jpkjy1j30pe0uzn39.jpg)

## 连接实例
1. 通过控制台连接
2. 通过ssh连接

**注意**：虽然用的是ssh连接，并且你也添加了公钥，debian系统，他的用户名并不是root，需要你在控制台中找到
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1u2itai3pj319t0a6djj.jpg)


服务器性能
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h25yeecutzj30s90jw13v.jpg)
