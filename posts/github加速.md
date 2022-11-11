# Github加速


## 使用fastgit
```sh
git config --global url."https://github.com.cnpmjs.org/".insteadOf "https://github.com/"
git config protocol.https.allow always
```
`git config --global --unset url."https://hub.fastgit.org/".insteadOf "https://github.com/"`
## 使用fakev
```sh
git config --global url."https://gh.dlpu.workers.dev/".insteadOf "https://github.com/"
git config protocol.https.allow always


git config --global url."https://gh.fakev.cn/".insteadOf "https://github.com/"
git config protocol.https.allow always
```

删除
git config --global --unset url."https://gh.dlpu.workers.dev/".insteadOf "https://github.com/"

## 修改hosts
```host
140.82.113.4 github.com
13.229.188.59 github.com
13.114.40.48 github.com
185.199.110.153 github.com
185.199.111.153 github.com
185.199.109.153 github.com
185.199.108.153 github.com
```
