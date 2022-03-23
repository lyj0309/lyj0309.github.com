# wireguard安装


### 基本原理和配置
wireguard会新建一张虚拟网卡，所有的流量都经过这个网卡，所以你要设定的主要有3块东西
+ 服务器公网地址 v6 || v4
+ 服务端网段 && ip
+ 客户端网段 && ip

### 安装脚本
```shell
curl -O https://raw.githubusercontent.com/angristan/wireguard-install/master/wireguard-install.sh
chmod +x wireguard-install.sh
./wireguard-install.sh
# 国内版
curl -O https://raw.fastgit.org/angristan/wireguard-install/master/wireguard-install.sh
chmod +x wireguard-install.sh
./wireguard-install.sh
```
