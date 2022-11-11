# 盘点一下免费在线ide



## 阿里云
<https://ide.aliyun.com/>

可以访问外网，不能访问github，需要加速

kvm方式虚拟化
**没找到免费额度说明，默认无限时间**
测试数据
```
----------------------------------------------------------------------
 CPU Model            : Intel(R) Xeon(R) Processor @ 2.50GHz
 CPU Cores            : 5 Cores 2499.998 MHz x86_64
 CPU Cache            : 36608 KB 
 OS                   : Ubuntu 18.04.5 LTS (64 Bit) KVM
 Kernel               : 4.19.91-20210923120534.78bc30e.al7.x86_64
 Total Space          : 0.7 GB / 34.8 GB 
 Total RAM            : 386 MB / 10178 MB (213 MB Buff)
 Total SWAP           : 0 MB / 0 MB
 Uptime               : 0 days 0 hour 3 min
 Load Average         : 0.07, 0.09, 0.04
 TCP CC               : cubic
----------------------------------------------------------------------
 I/O Speed( 1.0GB )   : 333 MB/s
 I/O Speed( 1.0GB )   : 364 MB/s
 I/O Speed( 1.0GB )   : 433 MB/s
 Average I/O Speed    : 376.7 MB/s
----------------------------------------------------------------------
 Node Name        Upload Speed      Download Speed      Latency     
 Speedtest.net    239.70 Mbit/s     240.03 Mbit/s       7.15 ms     
 Hefei 5G     CT  239.99 Mbit/s     239.86 Mbit/s       13.98 ms    
 Guangzhou 5G CT  211.17 Mbit/s     173.71 Mbit/s       26.04 ms    
 Shanghai 5G  CU  241.93 Mbit/s     238.99 Mbit/s       10.36 ms    
 Wuxi 5G      CM  237.50 Mbit/s     240.28 Mbit/s       19.18 ms    
 Nanjing 5G   CM  152.89 Mbit/s     239.89 Mbit/s       16.41 ms    
 Hefei 5G     CM  239.82 Mbit/s     219.12 Mbit/s       16.21 ms    
----------------------------------------------------------------------
```

有一些内置环境
## cloudstudio
腾讯云旗下coding的
<https://cloudstudio.net/>

计费说明
![image.png](https://wx1.sinaimg.cn/large/008rgIcAly1h1zwzalhk5j30v20gagsz.jpg)

**免费额度： 2h4g 1000分钟**
不知道腾讯云的尿性，啥时候就不免费了**说的就是你，云函数**


测试数据
```
----------------------------------------------------------------------
 CPU Model            : Intel(R) Xeon(R) Platinum 8255C CPU @ 2.50GHz
 CPU Cores            : 8 Cores 2494.140 MHz x86_64
 CPU Cache            : 36608 KB 
 OS                   : Ubuntu 18.04.5 LTS (64 Bit) Dedicated
 Kernel               : 4.18.0-305.3.1.el8.x86_64
 Total Space          : 337.0 GB / 1000.0 GB 
 Total RAM            : 506 MB / 4096 MB (357 MB Buff)
 Total SWAP           : 0 MB / 0 MB
 Uptime               : 0 days 0 hour 2 min
 Load Average         : 0.56, 0.62, 0.65
 TCP CC               : cubic
 ASN & ISP            : AS45090, Shenzhen Tencent Computer Systems Company Limited
 Organization         : Tencent Cloud Computing (Beijing) Co., Ltd
 Location             : Haidian, China / CN
 Region               : Beijing
----------------------------------------------------------------------
 I/O Speed( 1.0GB )   : 141 MB/s
 I/O Speed( 1.0GB )   : 138 MB/s
 I/O Speed( 1.0GB )   : 216 MB/s
 Average I/O Speed    : 165.0 MB/s
----------------------------------------------------------------------
 Node Name        Upload Speed      Download Speed      Latency     
 Speedtest.net    50.42 Mbit/s      702.10 Mbit/s       11.23 ms    
 Fast.com         0.00 Mbit/s       0 Mbit/s            -           
 Nanjing 5G   CT  50.38 Mbit/s      48.37 Mbit/s        9.81 ms     
 Hefei 5G     CT  50.57 Mbit/s      105.17 Mbit/s       11.64 ms    
 Guangzhou 5G CT  54.42 Mbit/s      381.84 Mbit/s       32.74 ms    
 Shanghai 5G  CU  14.73 Mbit/s      48.60 Mbit/s        4.06 ms     
 Wuxi 5G      CM  17.31 Mbit/s      121.43 Mbit/s       15.53 ms    
 Nanjing 5G   CM  16.69 Mbit/s      47.68 Mbit/s        26.16 ms    
----------------------------------------------------------------------
```
有一些内置环境
## github.dev
不能用cli，可以看代码，全局搜索，方便
**在任意github仓库按`.`进入**


## gitpod.io
与github集成度较高，可以直接在github前面输入gitpod.io即可进入  
直接帮你安装好依赖

这个虚拟机是运行在容器里的，共享虚拟机，隔离性最小的方式

**免费额度：每个月50小时**

测试数据
```
----------------------------------------------------------------------
 CPU Model            : AMD EPYC 7B13
 CPU Cores            : 16 Cores 2450.000 MHz x86_64
 CPU Cache            : 512 KB 
 OS                   : Ubuntu 20.04.4 LTS (64 Bit) Dedicated
 Kernel               : 5.16.20-051620-generic
 Total Space          : 930.6 GB / 3612.0 GB 
 Total RAM            : 14713 MB / 64312 MB (44489 MB Buff)
 Total SWAP           : 0 MB / 0 MB
 Uptime               : 1 days 7 hour 31 min
 Load Average         : 0.49, 0.96, 1.71
 TCP CC               : cubic
 ASN & ISP            : AS15169, Google LLC
 Organization         : Google Cloud (us-west1)
 Location             : The Dalles, United States / US
 Region               : Oregon
----------------------------------------------------------------------
 I/O Speed( 1.0GB )   : 612 MB/s
 I/O Speed( 1.0GB )   : 607 MB/s
 I/O Speed( 1.0GB )   : 602 MB/s
 Average I/O Speed    : 607.0 MB/s
----------------------------------------------------------------------
 Node Name        Upload Speed      Download Speed      Latency     
 Speedtest.net    286.41 Mbit/s     694.01 Mbit/s       10.93 ms    
 Fast.com         0.00 Mbit/s       208.3 Mbit/s        -           
 Nanjing 5G   CT  424.06 Mbit/s     809.42 Mbit/s       162.09 ms   
 Hefei 5G     CT  1.00 Mbit/s       778.02 Mbit/s       200.98 ms   
 Guangzhou 5G CT  6.53 Mbit/s       580.22 Mbit/s       242.67 ms   
 Wuxi 5G      CM  188.51 Mbit/s     94.56 Mbit/s        244.86 ms   
 Nanjing 5G   CM  75.06 Mbit/s      813.66 Mbit/s       210.44 ms   
 Hefei 5G     CM  96.53 Mbit/s      798.09 Mbit/s       239.14 ms   
----------------------------------------------------------------------
```
##  华为云
免费额度：**arm架构的4U8G,每天120分钟**
<https://devcloud.cn-north-4.huaweicloud.com/cloudide/trial>

+ 不能获取root权限
+ 只有arm
+ 不保存数据

