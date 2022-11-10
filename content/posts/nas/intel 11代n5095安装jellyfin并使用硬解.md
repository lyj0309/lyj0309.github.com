## 前言
自己想组一个nas，一番权衡买了n5095的板子，想着这怎么说也能流畅硬解了吧（之前是j1900），然后安装jellyfin的艰难之路（各种坑）

## docker compose
```docker-compse
version: "3.5"
services:
  jellyfin:
    #   image: jellyfin/jellyfin:10.8.7
    image: nyanmisaka/jellyfin:221029-amd64
    container_name: jellyfin
    network_mode: "host"
    volumes:
      - /etc/timezone:/etc/timezone:ro
      - ./jellyfin/config:/config
      - ./jellyfin/cache:/cache
      - /mnt/3t:/mnt/3t
    devices:
      - /dev/dri/renderD128:/dev/dri/renderD128
      - /dev/dri/card0:/dev/dri/card0
    restart: "unless-stopped"
```
主要注意一点，就是镜像可以使用`nyanmisaka`这个大佬的镜像，基本东西都装全了，然后是`devices`需要映射显卡

## 打开硬解加速
根据`jellyfin`官方文档，