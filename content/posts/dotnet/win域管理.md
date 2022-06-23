
# win域管理
## Domain
域（Domain）：就是由用户和计算机组成的一个逻辑组。在一个域中，由域控制器统一的管理帐户数据库,管理所有的用户登录,资源访问认证及其它管理任务。在 Windows 网络操作系统中，域是安全边界。域管理员只能管理域的内部，除非其他的域显式地赋予他管理权限，他才能够访问或者管理其他的域。
## Work Group 
工作组(Workgroup)：就是将不同的电脑按功能分别列入不同的组中，以方便管理。
## Active Directory
AD(Active Directory)中文翻译为活动目录。
为网络提供目录服务，启用AD Service后，也就是在环境中建域，这个域是一个管理的安全边界，一个资源的集合。
AD是微软基于LDAP协议提供给Server平台的目录服务。
可以理解为AD是一个数据库一个目录服务。

AD特点：
集中管理、便捷的网络访问资源、可扩展性

AD的逻辑结构：
域、域树、域林


![图 2](https://dlpu.coding.net/p/img/d/img/git/raw/master/192133897eb33438bb807bfbda8dfbd4a81fa02495d650a7265f02dd3f712d53.png)  
RootDC.com为域，Child1.RootDC.com为子域，整个一条为域树，两个组合（RootDC.com和SencondDC.com）为域林，需要双向信任才能连线

## Domain Trust
如果A域信任了B域，那么A域的域控制器将把B域的用户账号复制到自己的Active Directory中，这样A域内的资源就可以分配给B域的用户了。从这个过程来看，A域信任B域首先需要征得B域的同意，因为A域信任B域需要先从B域索取资源。这点和我们习惯性的理解不同，信任关系的主动权掌握在被信任域手中而不是信任域。


## 父子域
在一个已经存在的域a.com下新建立一个子域b.a.com，这2个域的关系就是父子域的关系。从域的名字来看，父子域具有连续的命名空间。同样我们可以在子域b.a.com下在添加一个子域为c.b.a.com

## OU

Organizational Unit
组织单位，是AD的对象、也是AD中的容器，在OU中可以包含用户、组、计算机、打印机、OU自身等。

+ 按部门划分
+ 按地理划分
+ 按IT职能划分
+ 混合方式划分

## User and Group
### 组的概念：
组Group是用于管理账户的集合。

### 组的类型：
安全组（Security）：可以设置权限使得组内的用户有相应的权限，简化网络维护和管理。
通讯组（Distribution）：不能授权其访问资源，只能用作电子邮件和通讯。


## AGDLP
A（Accounts）指的是在Windows Server 的域用户账户。

G（Global Group）指的是将上述的用户账户添加到某个全局组中。

DL（Domain Local Group）指的是将全局组添加到某个域本地组中，可以使用内置的域本地组，也可以创建一个新的域本地组来接纳全局组的成员。

P（Permission）指的是最后将访问资源的权限赋予相应的域本地组，则域本地组中的成员就可以在权限的控制下访问资源了。

![图 3](https://dlpu.coding.net/p/img/d/img/git/raw/master/4cac5923a9651aa464b5bcf74491666096b500f6755d0c55afe10a7fa6316430.png)  

## DC, DNS

DC(Domain controller) 域控，活动目录的目录数据存储在域控制器内。

DNS是网域名称系统（Domain Name System）的缩写，该服务用于命名组织到域层次结构中的计算机和网络服务。在Internet上域名和IP地址是一对一（或者是多对一）。

DNS的主要工作是域名解析，也就是把计算机名翻译成IP地址，这样可以直接用易于联想记忆的计算机名来进行网络通讯而不用去记忆那些枯燥晦涩的IP地址了。




