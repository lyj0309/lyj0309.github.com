---
title: "3d打印之启庞klp1测评"
date: 2022-07-13T12:47:15+08:00
---

## 序言
上学的时候，没啥时间搞3d打印，而且没啥地方，上班后时间变多，并且有自己的房子，遂准备入手一个

## 选购
看了网上许多测评，发现很多推荐拓竹的，不过价格对我来说还是偏高，我自己是性价比至上党，自认为能有一定的学习能力，选择了这个


## 硬件
xy线轨
单z轴
尺寸225*225*225
cpu rk3328
内存 1g 
存储 8g emmc
显示屏5寸spi
wifi2.4g
有线100m
无摄像头


## 基本使用
先说结论。坏消息是这个东西类似于一个半成品，感觉就是刚能用就拿出来卖了，相当于你就买了个硬件，软件啥的你都得自己调整，很多东西他都没帮你搞好比如
+ 说明书不够详细
+ 固件升级都没有？准备一个版本干到底吗？还是说战未来？？？
+ 东西都用开源的，没问题，问题是很多东西都没调教好就搞上来了，比如摄像头，比如wifi，log一直报错（能用）
+ 系统时间不对，甚至不愿意加个rtc，用网线没问题，用wifi不行，他会在启动时从网络获取时间，这时候wifi还没连上，就获取不到了
+ 打完报错
+ 有时候打印一半报错（一般是大文件，或者大件）
+ 技术支持技术一般，出错了说我cpu温度太高（指40度，说他们打印都是30度的，你见过哪个cpu开机后能低于30度？）
+ 热床调的不是很平，虽然有自动调平，但我这差了2.1mm也有点多了吧喂
+ 结构设计可能不够周全，内部走线不够整齐，乱糟糟的（喷嘴）
+ ...

好消息是，只要你有一定的学习能力，能够自己解决问题，那么这个东西还是可以用的，以下是你可能要学习的东西：
+ 3d打印的基本知识（这个不用说了）
+ linux基本知识(软件安装，文件编辑，文件系统)
+ 硬件基本知识，至少知道这个机器是由哪些东西组成的（单片机，总线...
+ klipper基本知识（有点多
+ 查log，分析log的能力
+ 最重要的是，你得有耐心，有对这个东西的热情，不然可能出错了就直接abort