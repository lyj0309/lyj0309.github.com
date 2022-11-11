# 腾云云函数部署及坑


## 简介
腾讯云函数是一种serverless解决方案，使用云函数你就不需要关注运维，扩容，日志也是自动收集，非常的方便

### 触发方式
#### 定时触发
通过编写corntab进行触发，比如签到，你可以早上8点开始到下午5点，每隔5分钟就看看有没有签到

#### web方式触发
类似于http服务器，不同的是正常http服务器是一直后台运行，但是这个是只有请求来了才运行，请求完成后就自动销毁，当然，也不一定销毁，比如当你请求量很大的时候，他会一直保持后台运行

## 使用语言
我这里使用的是go语言，要先编译成linux x64的可执行文件后，在压缩上传
## scf_bootstrap

所有云函数都最好在根目录下面有一个 scf_bootstrap 文件，这里面的内容主要是如何启动这个应用如

```sh
#!/bin/bash

./httpserver
```

值得注意的是这里有个坑，这个`scf_bootstrap`必须要使用 lf 换行符，别的都不行，如果使用别的，执行的时候就会报错如，非常的shit
```json
{
  "errorCode": -1,
  "errorMessage": "Failed to initialize the container. Please confirm that the container can be started locally.",
  "statusCode": 405
}
```
**一定使用LF换行符**
**一定使用LF换行符**
**一定使用LF换行符**

## 部署
部署也是一言难尽，使用正常的压缩软件如7z进行压缩（windows）
部署，就会出现这个
`/var/user/scf_bootstrap: line 3: ./httpserver: Permission denied`
为啥呢，因为你使用的是windows进行压缩，和在linux下压缩的是不一样的
+ windows
![image.png](https://tva1.sinaimg.cn/large/0077qBLuly1h0lb5s5j6dj310t03uju9.jpg)
+ linux 
![image.png](https://tva1.sinaimg.cn/large/0077qBLuly1h0lb57su2cj30i50amgqi.jpg)

可以看到windows的属性是A，猜测在解压以后就没有访问权限了
所以
**必须使用linux进行压缩**
**必须使用linux进行压缩**
**必须使用linux进行压缩**

## 结语
虽然腾讯云函数有各种各样的坑，免费额度也少，但最后部署成功还是挺开心的，也希望大家都能早日部署成功
