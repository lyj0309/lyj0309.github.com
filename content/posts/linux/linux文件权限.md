---
title: "Linux文件权限"
date: 2022-04-15T12:54:46+08:00
---

在linux中查看文件的时候，在每一行的最前面会有这样的一串字符"drwxr-x---"，如下面的样例：

```bash
drwxr-x---  2 root root       37 Apr 18 10:50 data
-rw-r--r--  1 root root    68549 Sep 26  2018 fields.yml
-rwxr-xr-x  1 root root 33903123 Sep 26  2018 filebeat
-rwxr-xr-x  1 root root     1011 Mar 27 10:13 filebeat-docker.yml
-rw-r--r--  1 root root    66260 Sep 26  2018 filebeat.reference.yml
-rw-------  1 root root     7231 Sep 26  2018 filebeat.yml
drwxr-xr-x  4 root root       22 Sep 26  2018 kibana
-rw-r--r--  1 root root    13675 Sep 26  2018 LICENSE.txt
drwxr-xr-x 18 root root     4096 Sep 26  2018 module
drwxr-xr-x  2 root root     4096 Sep 26  2018 modules.d
-rw-r--r--  1 root root   148778 Sep 26  2018 NOTICE.txt
-rw-r--r--  1 root root      802 Sep 26  2018 README.md
```

这种代表当前文件的权限是怎么样的，文件的权限包括读、写、执行。

**d****rwx****_r-x_\--- 该权限分为4个部分d、rwx、r-x、---。**

**d:表示文件类型；**

**rwx：表示文件所有者的对该文件所拥有的权限；**

**r-x：表示文件所属组对该文件所拥有的权限；**

**\---：表示其他用户对该文件所拥有的权限。**

**下面表格详细的表述了各个部分意义**

读\(read\)，写\(write\)，执行r\(recute\)简写即为\(r,w,x\),亦可用数字来\(4,2,1\)表示

![](https://img-blog.csdnimg.cn/20190515155004267.jpg)

**举例：**

如果某文件权限为7则代表可读\(4\)、可写\(2\)、可执行\(1\)，即\(4+2+1=7\).

若权限为6\(4+2\)则代表可读\(4\)、可写\(2\)。

权限为5\(4+1\)代表可读\(4\)和可执行\(1\).

权限为3\(2+1\)代表可写\(2\)和可执行\(1\)。

下图中文件所有者\(属主\)为root，所有组\(属组\)为root，文件名为install.log。

**第一个减号“-”代表的是文件类型：**

**\-：普通文件，d:目录文件，l:链接文件，b:设备文件，c:字符设备文件，p:管道文件**

![](https://img-blog.csdnimg.cn/20190515154912360.jpg)

文件的权限为rw-r-r-也就是分别表示所有者\(属主\)有读写权限，所有组\(属组\)有读权限，其余人也仅有读权限。

如何对文件进行授权？

可以通过命令**chmod** , 该命令用于改变linux系统文件或目录的访问权限。

此处通过数字方式举例：

chmod \-R 755

该命令表示文件所有者有读写执行权限（4+2+1）、文件所属组有读执行权限（4+1）、其他人有读执行权限（4+1）。

\-R 表示命令的可选项，请参考下面说明

- \-c : 若该文件权限确实已经更改，才显示其更改动作
- \-f : 若该文件权限无法被更改也不要显示错误讯息
- \-v : 显示权限变更的详细资料
- \-R : 对目前目录下的所有文件与子目录进行相同的权限变更\(即以递回的方式逐个变更\)
- \--help : 显示辅助说明
- \--version : 显示版本

chmod其他方式可参考此地址：<https://blog.csdn.net/yexiangCSDN/article/details/80941249>

>ref https://blog.csdn.net/coolcoffee168/article/details/89373902