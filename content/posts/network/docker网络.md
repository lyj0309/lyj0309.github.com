---
title: "docker 网络配置之macvlan"
date: 2024-02-23T14:27:21+08:00
---

## 配置ipv6

```sh
 cat /etc/docker/daemon.json 
{
  "ipv6": true,
  "fixed-cidr-v6": "fd00:dead:beef::/48"
}
```

让容器内应用也能访问ipv6

```yml
  ipv6nat:
    container_name: "ipv6nat"
    image: "robbertkl/ipv6nat"
    network_mode: "host"
    privileged: true
    restart: "unless-stopped"
    volumes:
      - "/lib/modules:/lib/modules:ro"
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
```

## 创建macvlan

根据自己网络配置修改

`docker network create -d macvlan --subnet=192.168.10.0/24 --gateway=192.168.10.1 --ipv6 --subnet=fe80::2e2:69ff:fe5e:aed9/64 --gateway=fe80::3abc:1ff:fe5c:3e22 -o parent=vmbr0 mvl`

docker network create -d macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 --ipv6 --subnet=2a10:cc40:231:a7:8000::/66 --gateway=2a10:cc40:231:a7:8000::1 -o parent=eth0 mvl

docker network create -d macvlan \
--subnet=192.168.10.0/24 \
--gateway=192.168.10.1 \
--ipv6 \
--subnet=fd0d:7eb5:2afd::/64 \
--gateway=fd0d:7eb5:2afd::1 \
-o parent=vmbr0 \
mvl

<https://blog.xm.mk/posts/73f9/>
### 配置macvlan与宿主机互通（默认情况是不通的）
ip link add mvl-bridge link vmbr0 type macvlan mode bridge
ip addr add 192.168.10.60 dev mvl-bridge
ip link set mvl-bridge up
ip route add 192.168.1.3 dev mvl-bridge
ip route add 192.168.1.202 dev mvl-bridge  metric 10

sudo ip link add mvl-bridge link vmbr0 type macvlan mode bridge
sudo ip addr add 192.168.10.0/24 dev mvl-bridge
sudo ip link set mvl-bridge up

sudo ip link add macvlan0 link vmbr0 type macvlan mode bridge

## 删除配置

`sudo rm -rf /var/lib/docker/network`
