# Drone WecomChan(Wecom酱)

drone  WecomChan(Wecom酱) 微信消息通知插件

## 简介

基于 [ WecomChan(Wecom酱)](https://github.com/easychen/wecomchan) 封装的微信消息通知插件


## 栗子


```yaml
# 明文
---
kind: pipeline
name: default

steps:
  - name: send-wechat
    image: lyj0309/wecomchan
    settings:
      path: "{url path}"
      key: "{your key}"
      msg: "{send text}"

# 密文
---
kind: pipeline
name: default


steps:
  - name: send-wechat
    image: lyj0309/wecomchan
    settings:
      path: "{url path}"
      key:
        from_secret: key
      msg: "{send text}"

```