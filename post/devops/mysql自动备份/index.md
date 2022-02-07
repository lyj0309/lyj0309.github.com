
有时候，ddos或者各种攻击会导致服务瘫痪，或者当前服务器进入流量黑洞，无法访问，或者管理员手欠不小心删了一些数据，这时候，数据库的备份就显得尤为重要了。

本案例使用的是腾讯云的cos云存储来备份数据库，数据库在docker中的mysql中，每天备份一次，所以数据不是实时的，可以作为兜底使用

## 从docker中导出数据库
`docker exec  mysql bash  -c "mysqldump -uroot -p123456 数据库名> /xxx.sql"`


## 配置腾讯云cos
网址 https://cloud.tencent.com/document/product/436/63143

### 下载 Linux 版本 COSCLI
```sh
wget https://github.com/tencentyun/coscli/releases/download/v0.10.2-beta/coscli-linux
#运行以下命令重命名文件：
mv coscli-linux coscli && chmod 755 coscli

#命令在其他位置为 COSCLI 交互式地生成配置文件

./coscli config init

~/.cos.yaml cos配置文件
```

## 数据库备份脚本
```sh
#/bin/bash
cd /root/backup
#导出数据库
docker exec  mysql bash  -c "mysqldump -uroot -p123456 dbname> /dbname.sql"

#cpoy到本机
docker cp mysql:/dbname.sql ./

#删除docker中的文件
docker exec  mysql rm /dbname.sql

#提交到腾讯云cos
fname=$(date "+%Y-%m-%d-%H-%M-%S").sql

echo "开始上传数据库$fname"
./coscli cp ./dbname.sql  cos://dbname-backup/$fname

rm ./dbname.sql

#提醒
#可以使用各种方式提醒，server酱，短信啥的，我用的是自建server酱，wecomchan，详情bing

#删除7天前的备份文件
./coscli rm cos://bucket1/example/ -r --include ""
```
把这个脚本添加到crontab中，每天执行一次,我用的是宝塔的计划任务

## 运行结果
![image.png](https://tva1.sinaimg.cn/large/0077qBLugy1gz53vcbg9dj31ik0ra49v.jpg)
