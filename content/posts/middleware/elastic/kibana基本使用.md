---
title: "Kibana改中文"
date: 2022-02-18T02:17:19+08:00
tags: ["elastic"]
---

在 `kibana.yml`配置文件中加一行
docker exec -it -c efk-kibana-1 cat  

`i18n.locale: "zh-CN"`

```sh
docker exec -ti kib-01 sh -c "cat << EOF >> config/kibana.yml 
i18n.locale: \"zh-CN\"
EOF"
```

重启kibana
`docker restart kib-01`