---
title: "pve安装和使用"
date: 2022-10-21T12:47:15+08:00
---

## 基础安装
2.1 修改 apt 软件源
编辑source.list文件
nano /etc/apt/sources.list
1
粘贴以下内容
```
deb http://mirrors.ustc.edu.cn/debian/ bullseye main non-free contrib
deb http://mirrors.ustc.edu.cn/debian/ bullseye-updates main non-free contrib
deb http://mirrors.ustc.edu.cn/debian/ bullseye-backports main non-free contrib
deb http://mirrors.ustc.edu.cn/debian-security/ stable-security main non-free contrib
deb-src http://mirrors.ustc.edu.cn/debian/ bullseye main non-free contrib
deb-src http://mirrors.ustc.edu.cn/debian/ bullseye-updates main non-free contrib
deb-src http://mirrors.ustc.edu.cn/debian/ bullseye-backports main non-free contrib
deb-src http://mirrors.ustc.edu.cn/debian-security/ stable-security main non-free contrib
```
2.2 修改 PVE 软件源
编辑PVE软件源配置文件
`cp /etc/apt/sources.list.d/pve-enterprise.list /etc/apt/sources.list.d/pve-enterprise.list_bak `

`nano /etc/apt/sources.list.d/pve-enterprise.list`

粘贴如下内容
`deb https://mirrors.ustc.edu.cn/proxmox/debian bullseye pve-no-subscription`
1
2.3 修改 LXC 容器源
将 /usr/share/perl5/PVE/APLInfo.pm 文件中默认的源地址 http://download.proxmox.com 替换为 https://mirrors.ustc.edu.cn/proxmox 即可。
cp /usr/share/perl5/PVE/APLInfo.pm /usr/share/perl5/PVE/APLInfo.pm_back

sed -i 's|http://download.proxmox.com|https://mirrors.ustc.edu.cn/proxmox|g' /usr/share/perl5/PVE/APLInfo.pm

针对 /usr/share/perl5/PVE/APLInfo.pm 文件的修改，重启服务后生效。
systemctl restart pvedaemon.service
1
现在，PVE 网页端下载 CT Templates 速度就很快了。


## windows虚拟机安装
简单的就不说了，这里说`VirtIO`,这个东西需要安装，安装后会变成动态内存
<https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers>



## lxc 磁盘挂载
有两种方式，一种是全盘挂载，类似与硬解直通，一种是类似与docker的mount类型挂载，挂载的是目录
### docker mount 类型挂载
标准格式：pct set -mp1 /video,mp=/video
实际案例：pct set 105 -mp1 /mnt/st2,mp=/home/jellyfin/media/st2
重启容器。

逐个介绍：
pct set： 在pve中运行
105：      自己的容器ID
-mp1：   第一个文件夹，如果挂载到第二、三个，用mp2，mp3依次递增。不记得设置了多少个，在pve对应的ID中，里面有资源选项卡会显示挂载的情况。
/mnt/st2： 这是pve上的目录位置
mp=/home/jellyfin/media/st2： 这是要挂载到容器中的目录位置

或者：
 nano /etc/pve/lxc/105.conf  #100是对应的容器ID
mp1: /mnt/st2,mp=/home/jellyfin/media/st2


### 直接磁盘挂载



## 支持ipv6
https://www.haiyun.me/archives/1416.html#comment-688