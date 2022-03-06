# go安装


```sh
GOVER=1.17.2

wget golang.google.cn/dl/go${GOVER}.linux-amd64.tar.gz


tar -xzf  go${GOVER}.linux-amd64.tar.gz

mv ./go /usr/local/go

echo "export PATH=$PATH:/usr/local/go/bin" >> /etc/profile

source /etc/profile
rm golang.google.cn/dl/go${GOVER}.linux-amd64.tar.gz
#腾讯外网
go env -w GOPROXY=https://mirrors.cloud.tencent.com/go/
#腾讯内网
go env -w GOPROXY=http://mirrors.tencentyun.com/go/
#七牛镜像
go env -w GOPROXY=https://goproxy.cn,direct

export GOPROXY=http://mirrors.tencentyun.com/go/
```
