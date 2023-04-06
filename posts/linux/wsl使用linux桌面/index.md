# wsl使用linux桌面,gui



# wsl使用linux桌面,gui

linux课说需要用gui，本来说用vmware，但windows有自带的为何不用呢

使用linux桌面有很多种，可以用rdp, vnc, 但我看最近出来wslg ,相当于原生支持linux gui, 不需要远程连接

## 确认wsl已经是最新版
```sh
wsl --upgrade
```
## 安装linux发行版(Ubuntu)
打开`https://www.microsoft.com/p/ubuntu/9pdxgncfsczv`，安装即可

## 确认wsl版本
`wsl -l -v`
![](/images/2023-04-06-09-41-11.png)
确保version是2

## 换源
[使用北外镜像](https://mirrors.bfsu.edu.cn/help/ubuntu/)

## 启用systemd
[ref](https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/)
修改`/etc/wsl.conf`
```conf
[boot]
systemd=true
```
`powershell`运行`wsl --shutdown`重启wsl，再进入

`systemctl`查看是否开启
## 安装桌面应用
`sudo apt update && sudo apt  install tasksel -y`
`tasksel`

安装 debian desktop env和xfce就好
![图 4](/images/0be48f14e8ef2a9002796099987c2e7fb81c88ab2f48c61c81067d2987e30185.png)  

## 运行
### 两种方式，一是和windows融合，很装x，不知道为啥一定要sudo才能运行
`sudo startxfce4`

![图 5](/images/d12607dba025b99a03cf1d119ef9e73280ea9fd069d8cee47b493fbcc9afb4ff.png)  
会发现有一个linux的任务栏和linux的导航栏，直接融合在windows里面了

### 二是新建一个桌面
新建`start.sh`
```sh
#!/usr/bin/sh
Xwayland :1 &
xw_pid=$!
WAYLAND_DISPLAY= DISPLAY=:1 dbus-launch startxfce4
kill $xw_pid
```
`chmod +x start.sh`
`./start.sh`


![图 6](/images/2876f5da2d28168f82b8ea971ab03b0671bdd5189843c57885f7e5942c2f111c.png)  

## 中文乱码
https://blog.csdn.net/weixin_41714373/article/details/119519589
