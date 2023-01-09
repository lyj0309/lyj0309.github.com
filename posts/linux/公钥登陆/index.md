# linux 公钥登陆


## 生成密钥
`ssh-keygen -t rsa`

## 编辑配置文件
`vim  /etc/ssh/sshd_config`

```config
RSAAuthentication yes : 开启rsa验证
PubkeyAuthentication yes: 是否使用公钥
```

## 保存公钥到服务器
`cat id_rsa.pub >>/root/.ssh/authorized_keys`   
root用户，不同用户路径不同，注意权限，当前用户需要能查看
