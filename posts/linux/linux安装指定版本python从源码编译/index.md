# Linux安装指定版本python(从源码编译)


# Linux安装指定版本python(从源码编译)
有时候apt或者yum源只支持最新版py，有些地方不得不用老版本
## 下载源码
打开 <https://www.python.org/downloads/>找到你想要的py版本
![image.png](https://wx1.sinaimg.cn/large/0077qBLuly1h15opzk2cqj31ek08m0xg.jpg)
选择xz就好

执行 `wget https://www.python.org/ftp/python/3.8.13/Python-3.8.13.tar.xz` (如3.8)
##  解压源码
`tar -xzvf Python-3.8.13.tar.xz`

## 修改文件支持ssl
首先检测电脑是否安装openssl ,直接输入看看找的到不

在`Modules/Setup` 里面，找到ssl的那几行，把注释删了
![image.png](https://wx1.sinaimg.cn/large/0077qBLuly1h15osomy1xj310w09lwke.jpg)

## 编译并安装
`./configure && make && make install`

安装完成
![image.png](https://wx1.sinaimg.cn/large/0077qBLuly1h15ou3ttgyj30lp04sad9.jpg)
