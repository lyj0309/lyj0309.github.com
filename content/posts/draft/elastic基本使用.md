---
title: "Elasticsearch8.0基本使用"
date: 2022-02-18T02:07:57+08:00
draft: true
tags: ["elastic"]
---

# Elasticsearch8.0基本使用

https://www.elastic.co/guide/en/elasticsearch/reference/8.0/getting-started.html  
官方文档 Quick start
## 简介
首先介绍几个概念，为了方便理解，这里拿数据库做类比


+ 索引相当于表
+ mappings properties 相当于传统数据库中的表定义

### 举个例子
假设我现在要创建一张叫做topic的表，有2个字段，topic和answer,类型是text

不同的是elastic不会中文分词，所以要添加分词器，如ik分词器，所以要添加`analyzer`这个字段
`PUT topic`

请求体

```json
{
  "mappings": {
    "properties": {
      "topic": {
        "type": "text",
        "analyzer": "ik_smart"
      },
      "answer": {
        "type": "text",
        "analyzer": "ik_smart"
      }
    }
  }
}
```

## es配置用户名密码

+ 修改配置文件./config/elasticsearch.yml
 
docker exec es bash cat << EOF > ./config/elasticsearch.yml
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
EOF

```sh
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
```

执行

`./bin/elasticsearch-setup-passwords interactive`



设置kibana.yml

```sh
elasticsearch.username: "elastic"
elasticsearch.password: "xxx"
```



##  创建索引

`PUT {{name}}`

请求体

```json
{
  "mappings": {
    "properties": {
      "topic": {
        "type": "text",
        "analyzer": "ik_smart"
      },
      "answer": {
        "type": "text",
        "analyzer": "ik_smart"
      }
    }
  }
}
```

## 添加数据
### 单个数据
```sh
POST topic/_doc
{
	"topic": "1+1=2",
	"answer": "正确"
}
#or
POST logs-my_app-default/_doc
{
  "@timestamp": "2099-05-06T16:21:15.000Z",
  "event": {
    "original": "192.0.2.42 - - [06/May/2099:16:21:15 +0000] \"GET /images/bg.jpg HTTP/1.0\" 200 24736"
  }
}
```

### 多个数据

```sh
PUT logs-my_app-default/_bulk
{ "create": { } }
{ "@timestamp": "2099-05-07T16:24:32.000Z", "event": { "original": "192.0.2.242 - - [07/May/2020:16:24:32 -0500] \"GET /images/hm_nbg.jpg HTTP/1.0\" 304 0" } }
{ "create": { } }
{ "@timestamp": "2099-05-08T16:25:42.000Z", "event": { "original": "192.0.2.255 - - [08/May/2099:16:25:42 +0000] \"GET /favicon.ico HTTP/1.0\" 200 3638" } }
#or
POST topic/_bulk
{"index":{"_index":"topic","_id":"1"}}
{"topic":"乌鲁木齐惊现彩虹","answer":"今日午后一场大雨过后，乌鲁木齐天空上出现一道彩虹"}
```



### 搜索数据

```sh
GET logs-my_app-default/_search
{
  "query": {
    "match_all": { }
  },
  "fields": [
    "@timestamp"
  ],
  "_source": false,
  "sort": [
    {
      "@timestamp": "desc"
    }
  ]
}
#or
GET topic/_search
{
	"size": 6,
	"query": {
		"multi_match": {
			"query": "1+1",
			"fields": [
				"topic^2",
				"answer"
			]
		}
	}
}
```



### 删除数据

`DELETE _data_stream/logs-my_app-default`

