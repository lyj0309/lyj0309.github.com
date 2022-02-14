# Npm和yarn换源


## yarn
```shell
// 查询源
yarn config get registry

// 更换国内源
yarn config set registry https://registry.npm.taobao.org/

// 恢复官方源
yarn config set registry https://registry.yarnpkg.com

// 删除注册表
yarn config delete registry
```

## npm 
>注意 npm 更换国内镜像源之后，将无法再使用 npm search 命令，需要恢复为官方源才可以使用，如果恢复官方源后还不可使用，运行删除注册表命令后重试即可。
```shell
// 查询源
npm config get registry

// 更换国内源
npm config set registry https://registry.npm.taobao.org/

// 恢复官方源
npm config set registry https://registry.npmjs.org

// 删除注册表
npm config delete registry
```
