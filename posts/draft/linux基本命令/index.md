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


## grep

　　Linux系统中grep命令是一种强大的文本搜索工具，它能使用**正则表达式**搜索文本，并把匹配的行打印出来（匹配到的标红）。grep全称是Global Regular Expression Print，表示全局正则表达式版本，它的使用权限是所有用户。

　　grep的工作方式是这样的，它在一个或多个文件中搜索字符串模板。如果模板包括空格，则必须被引用，模板后的所有字符串被看作文件名。搜索的结果被送到标准输出，不影响原文件内容。

　　grep可用于shell脚本，因为grep通过返回一个状态值来说明搜索的状态，如果模板搜索成功，则返回0，如果搜索不成功，则返回1，如果搜索的文件不存在，则返回2。我们利用这些返回值就可进行一些自动化的文本处理工作。

**egrep = grep \-E：扩展的正则表达式** （除了 **\\<** , **\\>** , **\b** 使用其他正则都可以去掉\\）

## sed
### **3.1 认识sed**

　　sed 是一种流编辑器，它一次处理一**行**内容。处理时，把当前处理的行存储在临时缓冲区中，称为“**模式空间**”（patternspace ），接着用sed 命令处理缓冲区中的内容，处理完成后，把缓冲区的内容送往屏幕。然后读入下行，执行下一个循环。如果没有使诸如‘D’ 的特殊命令，那会在两个循环之间清空模式空间，但不会清空**保留空间**。这样不断重复，直到文件末尾。**文件内容并没有改变**，除非你使用**重定向存储输出或\-i**。

　　功能：主要用来自动编辑一个或多个文件, 简化对文件的反复操作  

 

### **3.2 使用sed**

#### **3.2.1 命令格式**

sed \[options\] '\[地址定界\] command' file\(s\)

　　

#### **3.2.2 常用选项options**

*  **\-n**：不输出模式空间内容到屏幕，即不自动打印，只打印匹配到的行
*  **\-e：**多点编辑，对每行处理时，可以有多个Script
*  **\-f**：把Script写到文件当中，在执行sed时\-f 指定文件路径，如果是多个Script，换行写
*  **\-r**：支持**扩展的正则**表达式
*  **\-i**：直接将处理的结果写入文件
*  **\-i.bak**：在将处理的结果写入文件之前备份一份

 

#### **3.2.3 地址定界**

*  不给地址：对全文进行处理
*  单地址：
  *  #: 指定的行
  *  /pattern/：被此处模式所能够匹配到的每一行
*  地址范围：
  *  #,#
  *  #,+#
  *  /pat1/,/pat2/
  *  #,/pat1/
*  **\~：步进**
  *   sed -n**'1\~2p'**  只打印奇数行 （1\~2 从第1行，一次加2行）
  *   sed -n **'2\~2p'**  只打印偶数行

 

#### **3.2.4 编辑命令command**

*  **d：删除**模式空间匹配的行，并立即启用下一轮循环
*  **p：打印**当前模式空间内容，追加到默认输出之后
*  **a**：在指定行**后面追加**文本，支持使用\\n实现多行追加
*  **i**：在行**前面插入**文本，支持使用\\n实现多行追加
*  **c**：**替换**行为单行或多行文本，支持使用\\n实现多行追加
*  w：保存模式匹配的行至指定文件
*  r：读取指定文件的文本至模式空间中匹配到的行后
*  =：为模式空间中的行打印行号
*  **\!**：模式空间中匹配行**取反**处理
*  **s///**：**查找替换**，支持使用其它分隔符，如：s\@\@\@，s###；
  *  **加g表示行内全局替换；**
  *  在替换时，可以加一下命令，实现大小写转换
  *  \\l：把下个字符转换成小写。
  *  \\L：把replacement字母转换成小写，直到\\U或\\E出现。
  *  \\u：把下个字符转换成大写。
  *  \\U：把replacement字母转换成大写，直到\\L或\\E出现。
  *  \\E：停止以\\L或\\U开始的大小写转换

### 实例

```cmd
[root@along ~]# cat demo
aaa
bbbb
AABBCCDD
[root@along ~]# sed "/aaa/p" demo  #匹配到的行会打印一遍，不匹配的行也会打印
aaa
aaa
bbbb
AABBCCDD
[root@along ~]# sed -n "/aaa/p" demo  #-n不显示没匹配的行
aaa
[root@along ~]# sed -e "s/a/A/" -e "s/b/B/" demo  #-e多点编辑
Aaa
Bbbb
AABBCCDD
###########################
[root@along ~]# sed -n "p" demo  #不指定行，打印全文
aaa
bbbb
AABBCCDD
[root@along ~]# sed "2s/b/B/g" demo  #替换第2行的b->B
aaa
BBBB
AABBCCDD
[root@along ~]# sed -n "/aaa/p" demo
aaa
[root@along ~]# sed -n "1,2p" demo  #打印1-2行
aaa
bbbb
[root@along ~]# sed -n "/aaa/,/DD/p" demo
aaa
bbbb
AABBCCDD
[root@along ~]# sed -n "2,/DD/p" demo
bbbb
AABBCCDD
[root@along ~]# sed "1~2s/[aA]/E/g" demo  #将奇数行的a或A替换为E
EEE
bbbb
EEBBCCDD

################
[root@along ~]# cat demo
aaa
bbbb
AABBCCDD
[root@along ~]# sed "2d" demo  #删除第2行
aaa
AABBCCDD
[root@along ~]# sed -n "2p" demo  #打印第2行
bbbb
[root@along ~]# sed "2a123" demo  #在第2行后加123
aaa
bbbb
123
AABBCCDD
[root@along ~]# sed "1i123" demo  #在第1行前加123
123
aaa
bbbb
AABBCCDD
[root@along ~]# sed "3c123\n456" demo  #替换第3行内容
aaa
bbbb
123
456
[root@along ~]# sed -n "3w/root/demo3" demo  #保存第3行的内容到demo3文件中
[root@along ~]# cat demo3
AABBCCDD
[root@along ~]# sed "1r/root/demo3" demo  #读取demo3的内容到第1行后
aaa
AABBCCDD
bbbb
AABBCCDD
[root@along ~]# sed -n "=" demo  #=打印行号
1
2
3
[root@along ~]# sed -n '2!p' demo  #打印除了第2行的内容
aaa
AABBCCDD
[root@along ~]# sed 's@[a-z]@\u&@g' demo  #将全文的小写字母替换为大写字母
AAA
BBBB
AABBCCDD
```

## awk
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
## 监控
### 查看网络流量
nload 
### 任务管理器
top htop

### 查看端口占用
`lsof -i:端口号`
netstat -ntlp   //查看当前所有tcp端口

netstat -ntulp | grep 80   //查看所有80端口使用情况

netstat -ntulp | grep 3306   //查看所有3306端口使用情况
