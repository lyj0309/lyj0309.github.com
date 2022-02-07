
## fly.io

类似于Okteto、Heroku和Railway的PaaS平台。

只能通过CLI登录，对小白可能有些不太友好。

官网：fly.io

免费额度：Fly App Pricing 免费额度有三个不间断运行的容器，以及160G的出站流量。(东亚30g，欧美100g，印度30g)


## 使用(以部署哪吒面板为例)
1. 安装fly cli  

2. 把哪吒源码下下来，需要进行一些修改

3. 修改cmd/dashboad/main.go ,在`init`函数下加上
```go
	//新建conf文件
	file6, err := os.Create("data/config.yaml")
	if err != nil {
		fmt.Println(err)
	}
	data := `debug: false
httpport: 80
grpcport: 5555
oauth2:
  type: "github" #Oauth2 登录接入类型，gitee/github
  admin: "{你的github用户名}" #管理员列表，半角逗号隔开
  clientid: "" # 在 https://github.com/settings/developers 创建，无需审核 Callback 填 http(s)://域名或IP/oauth2/callback
  clientsecret: ""
site:
  brand: "xxx"
  cookiename: "nezha-dashboard" #浏览器 Cookie 字段名，可不改
  theme: "default"
`
	file6.WriteString(data)
	file6.Close()
```
这样就相当于可以直接嵌入文件

4. 为了使数据持久话，我们需要添加volume,fly提供3g免费空间，我们新建一个g就行，`fly volumes create nz_data --region hkg --size 1`


5. 运行`fly launch` 生成`fly.toml`文件，修改成
```toml
# fly.toml file generated for nz on 2022-02-07T02:08:50+08:00

app = "nz"

kill_signal = "SIGINT"
kill_timeout = 5
processes = []

[env]

[experimental]
  allowed_public_ports = []
  auto_rollback = true

[mounts]
  destination = "/dashboard/data"
  source = "nz_data"

[[services]]
  http_checks = []
  internal_port = 80
  processes = ["app"]
  protocol = "tcp"
  script_checks = []

  [services.concurrency]
    hard_limit = 25
    soft_limit = 20
    type = "connections"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"

[[services]]
  http_checks = []
  internal_port = 5555
  processes = ["app"]
  protocol = "tcp"
  script_checks = []

  [services.concurrency]
    hard_limit = 25
    soft_limit = 20
    type = "connections"

  [[services.ports]]
    port = 5555

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"
```
具体意思可以去fly文档看，文档还是非常详细的

6. 运行`fly deploy`部署app，他会自动把你代码打包成docker镜像上传
7. 大功告成，接下来你就可以去控制台看部署的结果了
8. 演示站 nz.fakev.cn



### 优点
+ 不怕宕机
+ 白嫖党狂喜

### 缺点
+ 很难更新
+ 备份或者迁移很难

## 后记
+ fly.io 也是我最近才刚刚发现的，不知道能不能长久，也不知道有没有大厂背书。所以稳定性还有待观察  
+ 注册fly是要用信用卡的，一般的卡都能过，会交易10美元，所以卡里面最好大于10美元，啥卡都行，没卡的去微信搞个易呗卡
+ 虽说是部署在香港的，但是ipv4解析到的地方是英国，所以访问速度不是很快，ipv6解到的是新加坡

## 参考文献
+ https://liusy.eu.org/tag/fly-io/
+ https://dnslin.com/index.php/archives/37.html
+ https://blog.kermsite.com/p/flyio/