# 


## 只有在用户登陆的时候执行
自己写一个shell脚本

将写好的脚本（.sh文件）放到目录 /etc/profile.d/ 下，系统启动后就会自动执行该目录下的所有shell脚本。

cd /etc/profile.d/
复制
添加脚本srs.sh

#!/bin/sh

cd /usr/local/srs2
nohup ./objs/srs -c conf/z.conf>./log.txt &


## 使用systemd
进入目录  cd /etc/systemd/system/

1：编写属于自己的unit文件，命令为my-demo.service，整个文件如下

[Unit]

Description=My-demo Service                                                                                   

[Service]

Type=oneshot

ExecStart=/bin/bash /root/test.sh #自己的脚本文件

StandardOutput=syslog

StandardError=inherit

[Install]

WantedBy=multi-user.target

2：将上述的文件拷贝到 /usr/lib/systemd/system/*目录下

3：编写unit文件中ExecStart=/bin/bash /root/test.sh所定义的test.sh文件，将其放在定义的目录当中，此文件是服务的执行主体。文件内容如下：

#!/bin/bash                                                                                                                                       

date >> /tmp/date

4：将my-demo.service注册到系统当中执行命令：

systemctl enable my-demo.service

输出：ln -s'/usr/lib/systemd/system/my-demo.service' '/etc/systemd/system/multi-user.target.wants/my-demo.service'

输出表明，注册的过程实际上就是将服务链接到/etc/systemd/system/目录下

至此服务已经创建完成。重新启动系统，会发现/tmp/date文件已经生成，服务在开机时启动成功。当然本例当中的test.sh文件可以换成任意的可执行文件作为服务的主体，这样就可以实现各种各样的功能。

记录：

启动：systemctl start my-demo.service

结束：systemctl stop my-demo.service

重启：systemctl restart my-demo.service

状态：systemctl status my-demo.service

查看服务状态： systemctl status network.service

列出所有可用单元：systemctl list-unit-files

列出所有运行中单元：systemctl list-units

列出所有失败单元：systemctl --failed

使用systemctl命令杀死服务：systemctl kill network.service 

