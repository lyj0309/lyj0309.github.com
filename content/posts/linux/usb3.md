---
title: "linux磁盘硬盘"
date: 2022-10-16T20:44:06+08:00
---

## 检测是否支持usb3
由于USB3.0传输文件的速度快于USB2.0，所以现在很多电脑都配置了USB3.0接口，那么要怎么分辨自己的电脑是否有USB3.0接口呢？Linux系统只需一条命令就能检测出来。

在Linux终端中检测是否有USB 3.0 端口

打开一个终端，并使用下面的命令：

`lsusb`

## 查看是否以usb3运行

Linux下查看USB设备命令：

cat /sys/kernel/debug/usb/devices

## 查看所有磁盘
fdisk -l

## 挂载磁盘
umount

## 卸载磁盘（弹出磁盘）
mount

## 测试硬盘速度
hdparm -t sdb1