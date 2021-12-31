
## 安装

```sh
#deb
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.15.2-amd64.deb
sudo dpkg -i filebeat-7.15.2-amd64.deb

#rpm
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.15.2-x86_64.rpm
sudo rpm -vi filebeat-7.15.2-x86_64.rpm
```

## 设置

路径： `/var/filebeat/filebeat.yml`

```yaml
output.elasticsearch:
  hosts: ["myEShost:9200"]
  username: "filebeat_internal"
  password: "YOUR_PASSWORD" 
  
  
   setup.kibana:
    host: "mykibanahost:5601" 
    username: "my_kibana_user"  
    password: "{pwd}"
```

## 模块配置

可用模块 `filebeat modules list`

开启模块 `filebeat modules enable system nginx mysql`

模块设置路径 ： `/var/filebeat/modules.d/`

## 启动

验证服务 `filebeat setup -e`

验证完可用后，后台启动 `sudo service filebeat start`













