---
title: "esxi linux安装NVIDIA驱动 ubuntu p100 k80 p40  通用"
date: 2023-04-10T21:25:46+08:00
tags: ["linux"]
---

# linux安装NVIDIA驱动 ubuntu p100 k80 p40 通用
一下每一步都要做，仔细阅读，少一步都不行！
## bios设置
您的主机BIOS必须配置为支持这些高端PCI设备所需的大内存区域。要启用此功能，请找到“4G以上解码”或“4GB以上内存映射I/O”或“PCI 64位资源处理4G以上”的主机BIOS设置并启用。该选项的确切措辞因系统厂商而异，但该选项通常可以在BIOS菜单的PCI部分找到。如果需要启用此选项，请咨询您的系统提供商。
具体每个bios都不一样，我是R720，可以F12设置


## 设置esxi操作系统
### 设置使用EFI启动
编辑虚拟机

![图 1](/images/4d10b009379cacea4cc787f0d0fae137675a79bbd0f16ea039e963d903ce01a1.png)  

## 设置额外参数
虚拟机选项->高级->配置参数

pciPassthru.use64bitMMIO  TRUE
pciPassthru.64bitMMIOSizeGB 128

128取决于你的显卡显存和数量,例如，要对两个32 GB V100设备使用透传，其值将是:32 + 32 = 64，向上取2的下一个幂，得到128。

## linux配置
禁用nouveau
新建`/usr/lib/modprobe.d/dist-blacklist.conf`
写入
```conf
    #nvidia driver
     
    blacklist nouveau
    options nouveau modeset=0
```
**重启**

## 安装驱动
`https://www.nvidia.com/Download/index.aspx?lang=en-us`
去这下载,记得选定cuda版本

`sh NVIDIA-xxxx.sh`

大功告成!

![图 2](/images/3f1e5ff2acbf1d337bc899ee098b349a66b4574c6bc213f9168bfbcd3ec6ef86.png)  


## ref

https://blogs.vmware.com/apps/2018/10/how-to-enable-nvidia-v100-gpu-in-passthrough-mode-on-vsphere-for-machine-learning-and-other-hpc-workloads.html
https://blog.csdn.net/koukouwuwu/article/details/116142271
https://blog.csdn.net/jephirus/article/details/80957144