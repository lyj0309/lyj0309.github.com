# 3分钟搭建个docker hub镜像


# 前言
总所周知，docker hub 国内访问很慢，当然国内确实也有一些镜像站，比如阿里云，daocloud等等。

我这里只讲解最最最简单的部署方式，高级的如（用户认证，缓存，redis,多域名代理等等都不实现）
## 原理
通过docker公司提供的registry软件  ps:这个软件现似乎因为某种原因，main分支一直在更新，但是却不发布release，使用则能获取到main分支build出来的`distribution/distribution:edge`

<https://docs.docker.com/registry>  
<https://gh.fakev.cn/docker/docs/blob/master/registry/recipes/mirror.md>  

## 安装docker 和 docker-compose
`apt install docker.io -y`

```sh
curl -L "https://github.com/docker/compose/releases/download/v2.12.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```
##
```yml
version: "3"
services:
 registry:
  restart: always
  image: distribution/distribution:edge
  ports:
    - 443:443
  volumes:
    - ./registry/config.yml:/etc/docker/registry/config.yml
    - ./registry/data:/var/lib/registry
    - ./registry/certs:/certs
```

新建配置文件config.yml
```yml
version: 0.1
storage:
  filesystem:
    rootdirectory: /var/lib/registry
    maxthreads: 100
http:
  addr:  0.0.0.0:443
  host: https://dh.fakev.cn
  tls:
    letsencrypt:
      cachefile: /etc/docker/registry/letsencrypt.json
      email: lyj@fakev.cn
      hosts: [dh.fakev.cn]
proxy:
  remoteurl: https://registry-1.docker.io   
```
其中把`dh.fakev.cn`换成你的域名即可

运行 `docker-compose up -d`即可，需要你开放443，因为会需要自动生成ssl证书，镜像就搭建完成了

## 本机配置docker使用镜像
往`/etc/docker/daemon.json`写入
```yml
{"registry-mirrors":["https://dh.fakev.cn"]}
```
然后`systemctl restart docker`即可

未完待续···
