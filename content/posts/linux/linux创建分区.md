选择要分区的硬盘：parted /dev/sdb
使用print 对磁盘信息进行查看：
(parted) mklabel gpt
mkpart primary 0% 100%
q

mkfs.btrfs /dev/sdb1



mkdir /data   #创建数据文件夹
mount /dev/mapper/vgdata-lvdata /data #将逻辑卷挂载到/data
vim /etc/fastab  #添加开机挂载
	/dev/mapper/vgdata-lvdata /data  xfs  defaults 0 0 

https://blog.csdn.net/u012150360/article/details/81333051
https://blog.csdn.net/qq_38265137/article/details/97489823

