# 内存条科普以及镁光内存条鉴别



## 前言
由于要组装机子，于是在咸鱼上买了个镁光的内存条，本来想着应该是正版，结果插上去一看不对劲了
1. 内存序列号都一样
2. 二位扫码出来的结果不正确
3. 编号对不上

下面我就一一说明
我的条子
![图 1](https://dlpu.coding.net/p/img/d/img/git/raw/master/a42e10f70934866fc2ea037c8b338bc2dc4ea2b4ffa23acd5003cd3fa434d553.png)  


## 内存条科普
<https://zhuanlan.zhihu.com/p/26255460>
<https://www.eet-china.com/mp/a22553.html>
<https://technick.net/guides/hardware/umg/04_003/>(内存条容量介绍-英)

## 内存条编号（Module Part Numbering）
根据镁光官网给出来的说明，我这个条子，写的是3200，编号应该是`3G2`，但是却是`2G3`

![图 2](https://dlpu.coding.net/p/img/d/img/git/raw/master/f0b7f0b303599ead7d3a5700e6f1a9ba8ff965a59607557f92282eb9a7072f72.png)  

## 二位扫码出来的结果不正确
扫出来的和正版的不一样

## 内存序列号都一样
拿CPU-Z查看，发现都一样，按道理说肯定是不一样的

## 查看内存颗粒
通过内存条颗粒印刷得知FBGA code是`D9TGL`
反查到型号是`MT40A1G4RH-083E`

<https://www.micron.com/support/tools-and-utilities/fbga?fbga=d9tgl#pnlFBGA>

再查询型号

<https://www.micron.com/products/dram/ddr4-sdram/part-catalog>


![image.png](https://tva1.sinaimg.cn/large/007WELPTly1h7s2tluqjpj314709njwb.jpg)
已经停产了，不过容量是4Gb，一条颗粒16个，4*16/8=8G 容量应该是够的，但频率也不对，才2400，盲猜是超频上去的

## 测试软件

Taiphoon  用于查看内存条信息  
<http://www.softnology.biz/files.html>  

memtest86 用于测试内存条  
<https://memtest.org/>

AIDA64    懂得都懂  
<https://www.aida64.cc/127.html>


## ref
<https://zhuanlan.zhihu.com/p/40935015>
<https://zhuanlan.zhihu.com/p/163799308>
<https://zhuanlan.zhihu.com/p/333783874>




