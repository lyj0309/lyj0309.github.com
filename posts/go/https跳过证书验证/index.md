# Go https跳过证书验证


请求 https 网站跳过证书验证
在用 Golang 发起https请求时出现以下错误，因为证书是未经过认证的，而是自己创建的。
错误信息：Get https://192.169.0.199:8080/Versty/app: x509: certificate signed by unknown authority


```go
import (
    "crypto/tls"
    "net/http"
    "net/http/cookiejar"
)
...
//跳过证书验证
tr := &http.Transport{
    TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
}
//http cookie接口
cookieJar, _ := cookiejar.New(nil)
c := &http.Client{
    Jar: cookieJar,
    Transport: tr,
}
c.Get("https://192.169.0.199:8080/Versty/app: ")

```
