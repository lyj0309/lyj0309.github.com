# Linux基本命令


# 文本操作
## cat
查看文件
cat filename

写入文件
```sh
cat >> filename << EOF #EOF是标记符，写什么无所谓，但EOF为大家默认

> hahaha

> hehehe

EOF  #再次输入标记符表示结束，如果最初的标记符不是EOF，那么这里就需要和第一行一致
```

追加内容
```sh
cat << EOF > file1
111
222
333
EOF
```
# 杂项
## 环境变量

主要有两种环境变量，一种是含`PATH`的环境变量，一种则直接是键值对

含`PATH`的环境变量一般用于软件的导入，比如导入一个文件夹下面所有文件然后可以直接通过命令行访问，比如把`mingw/src`文件夹导入从而可以使用gcc

键值对环境变量则可以用来进行配置的读取，如`NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node`这个环境变量，则是告诉node使用淘宝镜像，就如同全局变量


### 读取环境变量
+ export命令显示当前系统定义的所有环境变量
+ echo $PATH命令输出当前的PATH环境变量的值
### 配置环境变量

#### 临时变量（当前命令行有用）
`PATH`变量 ：使用export命令直接修改PATH的值，配置MySQL进入环境变量的方法:
`export PATH=/home/uusama/mysql/bin:$PATH`

非`PATH`变量：
export GO_VERSION=1.17.6

#### 永久变量
主要是修改配置文件的方式
一共有四个文件，修改方式则是把设置临时变量的句子加到文件中
+ /etc/profile： 此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行。是系统全局针对终端环境的设置，它是login时最先被系统加载的，是它调用了/etc/bashrc，以及/etc/profile.d目录下的*.sh文件，如果有一个软件包，系统上只安装一份，供所有开发者使用，建议在/etc/profile.d下创建一个新的xxx.sh，配置环境变量。

+ ~/.bashrc:是用户相关的终端（shell）的环境设置，通常打开一个新终端时，默认会load里面的设置，在这里的设置不影响其它人。如果一个服务器多个开发者使用，大家都需要有自己的sdk安装和设置，那么最好就是设置它。

+ /etc/bashrc: 是系统全局针对终端环境的设置，修改了它，会影响所有用户的终端环境，这里一般配置终端如何与用户进行交互的增强功能等（比如sudo提示、命令找不到提示安装什么包等），新开的终端，已经load了这个配置，最后才load用户自己的 ~/.bashrc。

+ ~/.bash_profile:每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!默认情况下,他设置一些环境变量,执行用户的.bashrc文件.

![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzk53fy148j30gr0addii.jpg)


## swap
创建一个swap文件,大小2G，count代表大小。

```sh
cd /var
sudo dd if=/dev/zero of=swapfile bs=1024 count=2000000

chmod 0600 swapfile 
sudo mkswap swapfile

#挂载： 
sudo swapon /var/swapfile
#卸载：
# sudo swapoff /var/swapfile
```

开机自己挂载
开机自动挂载SWAP分区，
编辑   /etc/fstab，末行添加：

```sh
cat << EOF > /etc/fstab
/var/swapfile   swap  swap  defaults  0  0
EOF
```


## 压缩
### zip
将 /home/html/ 这个目录下所有文件和文件夹打包为当前目录下的 html.zip：
`zip -q -r html.zip /home/html`

`zip *`就可以压缩当前文件夹了，与别的命令有点不同，这个命令不能识别`./`或`.`必须要`*`
### tar
压缩 a.c文件为test.tar.gz
```sh
touch a.c       
tar -czvf test.tar.gz a.c   
# a.c
```
解压文件
```sh
tar -xzvf test.tar.gz 
#a.c
```

