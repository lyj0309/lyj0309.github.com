---
title: "甲骨文云自动刷arm(使用railway.app)"
date: 2022-02-07T18:35:01+08:00
tags: ["白嫖","cloud"]
---

实际上，刷机子的原理无非过一会儿发一个包看看能开通不，为了便携且贯彻落实白嫖精神，我使用的是railway部署的，一个免费的PaaS平台<https://railway.app>,每月有5美元免费额度

## Github地址
<https://github.com/lemoex/oci-help>


## 部署至railway
### 建立自己的git仓库

+ 按照网址上的教程配置好oci-help.ini和pem密钥
+ 然后把源码clone下来，把.ini和pem都考进去
+ 再添加个文件，Dockerfile
```Dockerfile
FROM golang:1.17.6 as builder

ENV GO111MODULE=on
# CGO_ENABLED alpine禁用cgo

WORKDIR /app
ADD go.mod .
ADD go.sum .
RUN go mod download


COPY . .
RUN go build -o app ./

RUN mkdir publish && cp app publish

FROM alpine
RUN apk add gcompat
WORKDIR /app
#复制成品到导出镜像
COPY --from=builder /app/publish .
#
COPY --from=builder /app/*.ini ./
COPY --from=builder /app/*.pem ./
COPY --from=builder /app/1.sh ./
ENTRYPOINT ["sh", 'echo -e  "2\n1\n" | ./app']
```

### 部署至railway.app
注册好railway账号后，选择你的库，部署即可
预计每个月0.18$,四舍五入不要钱
## 效果
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gz554vdfw1j30w30twn9p.jpg)
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gz5567wnvkj30zw0jcwh6.jpg)
## 结论
实际上，用自己的虚拟机部署方便的多= =，用这个平台主要是不怕机子boom，没办法，就是爱折腾
