---
title: "docker&compose安装"
date: 2022-02-07T17:52:28+08:00
tags: ["devops"]
---
docker-compose我认为是单机管理容器的最佳方案，如果要多机
## docker安装
```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

## 换源
```sh
cat > /etc/docker/daemon.json <<eof
{
"registry-mirrors": ["https://jrromknz.mirror.aliyuncs.com"],
"exec-opts":["native.cgroupdriver=systemd"]
}
eof
systemctl enable docker.service
systemctl daemon-reload

systemctl restart docker.service
```

## compose安装(x86)
```
curl -L "https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

# 加速版
curl -L "https://hub.fastgit.xyz/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

```

## compose arm 版本
```sh
wget https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-linux-armv7
mv ./docker-compose-linux-armv7 /usr/local/bin/docker-compose
chmod +x  /usr/local/bin/docker-compose
```