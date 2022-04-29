# Elasticsearch8.0安装及使用ik分词器

## es安装
```sh
esver=8.0.0

# 设置系统内存
sudo sysctl -w vm.max_map_count=262144

# docker pull elasticsearch:$esver
docker run --name es --net elastic -p 9200:9200 -p 9300:9300 -it docker.elastic.co/elasticsearch/elasticsearch:8.0.0
```
es就启动了
访问`https://ip:9200`就能看到，是需要密码的，密码可以从命令行看到，如果是arm则要手动生成

### 设置密码
`docker exec -it es /usr/share/elasticsearch/bin/elasticsearch-reset-password
`



## 分词器安装
```sh
esver=7.14.2

#安装解压
apt install unzip -y
yum install unzip -y

# 下载分词器
curl -L -o ik.zip  https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v$esver/elasticsearch-analysis-ik-$esver.zip

# wget gh.dlpu.workers.dev/https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v$esver/elasticsearch-analysis-ik-$esver.zip

 
mkdir ik

unzip -d ik ik.zip

#将ik移动到容器中
docker cp ik es:/usr/share/elasticsearch/plugins
 
rm -rf ik.zip ik

docker restart es
```
