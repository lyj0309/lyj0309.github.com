---
title: "go请求http"
date: 2021-10-21T18:52:55+08:00
draft: true
---

```go
import (
    "fmt"
    "io/ioutil"
    "net/http"
    "strings"
)
 
// http.Get
func httpGet() {
	    resp, err := http.Get("http://www.baidu.com")
	    if err != nil {
		        fmt.Println(err)
		        return
		    }
	    defer resp.Body.Close()
	    body, err := ioutil.ReadAll(resp.Body)
	    fmt.Println(string(body))
}
 
func httpPost() {
	    resp, err := http.Post("http://www.baidu.com",
	                           "application/x-www-form-urlencode",
	                           strings.NewReader("name=abc")) // Content-Type post请求必须设置
	    if err != nil {
		        return
		    }
	    defer resp.Body.Close()
	    body, err := ioutil.ReadAll(resp.Body)
	    fmt.Println(string(body))
}
 
 
client := &http.Client{}
req, err := http.NewRequest("POST", "http://121.36.71.167:7001/", strings.NewReader("name=cjb"))
if err != nil {
fmt.Println(err)
}
 
req.Header.Set("Content-Type", "application/json")
req.Header.Set("Cookie", "name=anny")
 
resp, err := client.Do(req)
if err != nil {
fmt.Println(err)
}
defer resp.Body.Close()
 
body, err := ioutil.ReadAll(resp.Body)
if err != nil {
fmt.Println(err)
}
 
fmt.Println(string(body))
 ```