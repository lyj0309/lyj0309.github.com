---
title: "gitmodules详解（Git子模块配置）"
date: 2021-09-21T18:52:55+08:00
draft: true
---

## 一、gitmodules是什么
子模块允许你将一个 Git 仓库作为另一个 Git 仓库的子目录。 它能让你将另一个仓库克隆到自己的项目中，同时还保持提交的独立。
## 如何使用
`$ git submodule add https://github.com/XXX`


.gitmodules文件
```
[submodule "themes/ananke"]
	path = themes/ananke
	url = https://github.com/theNewDynamic/gohugo-theme-ananke.git
[submodule "themes/even"]
	path = themes/even
	url = https://github.com/olOwOlo/hugo-theme-even.git
```