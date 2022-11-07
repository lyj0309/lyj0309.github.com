# pve安装和使用


## 基础安装
2.1 修改 apt 软件源
编辑source.list文件
nano /etc/apt/sources.list
1
粘贴以下内容
deb http://mirrors.ustc.edu.cn/debian/ bullseye main non-free contrib
deb http://mirrors.ustc.edu.cn/debian/ bullseye-updates main non-free contrib
deb http://mirrors.ustc.edu.cn/debian/ bullseye-backports main non-free contrib
deb http://mirrors.ustc.edu.cn/debian-security/ stable-security main non-free contrib
deb-src http://mirrors.ustc.edu.cn/debian/ bullseye main non-free contrib
deb-src http://mirrors.ustc.edu.cn/debian/ bullseye-updates main non-free contrib
deb-src http://mirrors.ustc.edu.cn/debian/ bullseye-backports main non-free contrib
deb-src http://mirrors.ustc.edu.cn/debian-security/ stable-security main non-free contrib

2.2 修改 PVE 软件源
编辑PVE软件源配置文件
cp /etc/apt/sources.list.d/pve-enterprise.list /etc/apt/sources.list.d/pve-enterprise.list_bak 

nano /etc/apt/sources.list.d/pve-enterprise.list

粘贴如下内容
deb https://mirrors.ustc.edu.cn/proxmox/debian bullseye pve-no-subscription
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
## docker mount 类型挂载
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

## 全盘挂载
### PVE之LXC安装OMV并直通单个硬盘

- [一、平台信息](#_3)
- [二、修改为国内软件源](#_8)
- - [2.1 修改 apt 软件源](#21__apt__11)
  - [2.2 修改 PVE 软件源](#22__PVE__27)
  - [2.3 修改 LXC 容器源](#23__LXC__38)
- [二、Debian11\(LXC\)安装omv6](#Debian11LXComv6_51)
- [三、LXC挂载硬盘\(块\)](#LXC_91)
- - [3.1 查询要挂载的物理硬盘和分区的块信息](#31__92)
  - [3.2 修改LXC的挂载权限](#32_LXC_106)
  - [3.3 编辑LXC的配置文件](#33_LXC_133)

  
为最大化硬件效率，使用PVE的LXC容器方式，安装Debian模板系统，然后安装Openmediavault的套件包。

# 一、平台信息

- PVE版本：7.1-12
- LXC容器：Debian 11
- OMV：OpenmediaVault 6

# 二、修改为国内软件源

- 参考[地址](https://blog.csdn.net/muzihuaner/article/details/122891787)
- [中科大镜像网站](https://mirrors.ustc.edu.cn/proxmox/images/system/)

## 2.1 修改 apt 软件源

 -    编辑source.list文件

```
nano /etc/apt/sources.list
```

 -    粘贴以下内容

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

## 2.2 修改 PVE 软件源

 -    编辑PVE软件源配置文件

```
cp /etc/apt/sources.list.d/pve-enterprise.list /etc/apt/sources.list.d/pve-enterprise.list_bak 

nano /etc/apt/sources.list.d/pve-enterprise.list
```

 -    粘贴如下内容

```
deb https://mirrors.ustc.edu.cn/proxmox/debian bullseye pve-no-subscription
```

## 2.3 修改 LXC 容器源

 -    将 /usr/share/perl5/PVE/APLInfo.pm 文件中默认的源地址 http://download.proxmox.com 替换为 https://mirrors.ustc.edu.cn/proxmox 即可。

```
cp /usr/share/perl5/PVE/APLInfo.pm /usr/share/perl5/PVE/APLInfo.pm_back

sed -i 's|http://download.proxmox.com|https://mirrors.ustc.edu.cn/proxmox|g' /usr/share/perl5/PVE/APLInfo.pm
```

 -    针对 /usr/share/perl5/PVE/APLInfo.pm 文件的修改，重启服务后生效。

```
systemctl restart pvedaemon.service
```

- 现在，PVE 网页端下载 CT Templates 速度就很快了。

# 二、Debian11\(LXC\)安装omv6

 -    在PVE网页端安装Debian11容器。
 -    按上述修改LXC中Debian的apt软件源。
 -    添加openmediavault软件源

```
nano /etc/apt/sources.list.d/openmediavault.list
```

 -    粘贴如下内容（使用sourceforge.net源更快）

```
#deb http://packages.openmediavault.org/public shaitan main
# deb http://packages.openmediavault.org/public shaitan-proposed main
## Uncomment the following line to add software from the proposed repository.
deb http://downloads.sourceforge.net/project/openmediavault/packages shaitan main
deb http://downloads.sourceforge.net/project/openmediavault/packages shaitan-proposed main
## This software is not part of OpenMediaVault, but is offered by third-party
## developers as a service to OpenMediaVault users.
# deb http://packages.openmediavault.org/public shaitan partner
# deb http://downloads.sourceforge.net/project/openmediavault/packages shaitan partner
```

 -    保存后运行如下指令

```
export LANG=C.UTF-8
export DEBIAN_FRONTEND=noninteractive
export APT_LISTCHANGES_FRONTEND=none
apt-get install --yes gnupg
wget -O "/etc/apt/trusted.gpg.d/openmediavault-archive-keyring.asc" https://packages.openmediavault.org/public/archive.key
apt-key add "/etc/apt/trusted.gpg.d/openmediavault-archive-keyring.asc"
apt-get update
apt-get --yes --auto-remove --show-upgraded \
    --allow-downgrades --allow-change-held-packages \
    --no-install-recommends \
    --option DPkg::Options::="--force-confdef" \
    --option DPkg::Options::="--force-confold" \
    install openmediavault-keyring openmediavault
```

 -    安装完成后，显示登陆信息

```
cat /etc/issue
```

# 三、LXC挂载硬盘\(块\)

## 3.1 查询要挂载的物理硬盘和分区的块信息

 -    查询硬盘信息

```
ls -al /dev/sdb

brw-rw---- 1 root disk 8, 16 Apr 29 10:58 /dev/sdb
```

 -    查询分区信息

```
ls -al /dev/sdb1

brw-rw---- 1 root disk 8, 17 Apr 29 10:58 /dev/sdb1
```

- 得到sdb 的块编号是 8,16 ； sdb1的块编号是8,17

## 3.2 修改LXC的挂载权限

 -    增加apparmor.profile

```
cp /etc/apparmor.d/lxc/lxc-default-with-mounting /etc/apparmor.d/lxc/lxc-default-blk-mounting
```

 -    编辑新建的文件添加如下内容

```
nano /etc/apparmor.d/lxc/lxc-default-blk-mounting
```

```
# Do not load this file.  Rather, load /etc/apparmor.d/lxc-containers, which
# will source all profiles under /etc/apparmor.d/lxc

profile lxc-default-blk-mounting flags=(attach_disconnected,mediate_deleted) {
  #include <abstractions/lxc/container-base>

# allow standard blockdevtypes.
# The concern here is in-kernel superblock parsers bringing down the
# host with bad data.  However, we continue to disallow proc, sys, securityfs,
# etc to nonstandard locations.
# deny mount fstype=devpts,
# mount fstype=cgroup -> /sys/fs/cgroup/**,
  mount fstype=ext*,
  mount fstype=xfs,
  mount fstype=btrfs,
}
```

## 3.3 编辑LXC的配置文件

 -    添加如下信息

```
lxc.apparmor.profile: lxc-default-blk-mounting
lxc.cgroup2.devices.allow: b 8:16 rwm
lxc.cgroup2.devices.allow: b 8:17 rwm
lxc.autodev: 1
lxc.hook.autodev: /var/lib/lxc/101/mount_hook.sh
```

 -    其中8:16及8:17为 步骤3.1获得的块信息。
 -    其中/var/lib/lxc/101/mount\_hook.sh，需要创建并赋执行权限。操作如下：

```
nano /var/lib/lxc/101/mount_hook.sh
```

 -    写入

```
#!/bin/sh
mknod -m 777 ${LXC_ROOTFS_MOUNT}/dev/sdb b 8 16
mknod -m 777 ${LXC_ROOTFS_MOUNT}/dev/sdb1 b 8 17
```

 -    赋执行权限

```
chmod +x /var/lib/lxc/101/mount_hook.sh
```

- 可以运行omv了
