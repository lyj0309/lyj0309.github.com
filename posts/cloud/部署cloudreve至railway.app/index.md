# 部署cloudreve至railway.app


## 前言
railway是一个免费的PaaS平台<https://railway.app>,每月有5美元免费额度，如果添加支付方式则有5美元免费额度

## 生成自己的github仓库


演示仓库
<https://github.com/lyj0309/pan>

### 目录说明
cr 这个文件是cloudreve的linux可执行文件,我用的3.4版本
Dockerfile，railway会通过这个自动构建镜像

```dockerfile
FROM alpine

ENV PUID=1000
ENV PGID=1000
ENV TZ="Asia/Shanghai"

LABEL MAINTAINER="lyj0309"

WORKDIR /app
# ADD config.ini .
ADD cr .

RUN echo ">>>>>> update dependencies" \
    && apk update \
    && apk add tzdata gcompat\
    && echo ">>>>>> set up timezone" \
    && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    && echo ">>>>>> fix premission" \
    && chmod +x /app/cr

EXPOSE 5212

# ENTRYPOINT ["/app/cr","-c","/app/config.ini"] 
ENTRYPOINT ["/app/cr"] 
```

神奇的是，似乎由于滥用，railway已经屏蔽了一切有关cloudreve的东西
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzc79e7twyj30t509mabc.jpg)
注意：
+ 仓库名字不要包含cloudreve
+ 仓库文件名不要包含cloudreve
+ 仓库文件内容不要包含cloudreve

## 安装
在railway中导入仓库
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzc78ff4soj30q90tydjx.jpg)

接着会自动构建app，构建成功后，在运行日志里面查看初始密码
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzc7d1en36j31k40qjalk.jpg)

系统应该会提示修改端口，如果没有则自己修改
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzc7ed123wj31h00pdafy.jpg)

端口为5212

## 检验
railway会自动送你个域名访问

![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzc7gyt7bsj31gf0dq0wh.jpg)


想添加自定义域名也是可以的
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gzc7he0zkzj31290ba765.jpg)
