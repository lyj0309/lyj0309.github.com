# 


tmux 后台运行
```sh
          tmux new -s frp -d
          tmux send -t frp "cd /root/frp" ENTER
          tmux send -t frp "./frpc -c ./frpc.ini" ENTER
```

