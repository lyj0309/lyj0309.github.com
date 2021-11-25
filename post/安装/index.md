
```
GOVER=1.17.2

wget golang.google.cn/dl/go${GOVER}.linux-amd64.tar.gz


tar -xzf  go${GOVER}.linux-amd64.tar.gz

mv ./go /usr/local/go

echo "export PATH=$PATH:/usr/local/go/bin" >> /etc/profile

source /etc/profile
rm golang.google.cn/dl/go${GOVER}.linux-amd64.tar.gz

go env -w GOPROXY=https://mirrors.cloud.tencent.com/go/

go env -w GOPROXY=http://mirrors.tencentyun.com/go/
export GOPROXY=http://mirrors.tencentyun.com/go/

