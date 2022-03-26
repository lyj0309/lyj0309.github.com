---
title: "Go交叉编译"
date: 2022-03-15T21:34:28+08:00
tags: ["Go"]
---

## Go 交叉编译

go 语言再啥平台都支持交叉编译，值得注意的是 cgo，在一些 linux 发行版中用的从语言库 go 并不支持，所以不能使用 cgo，再一些情况下 cgo 是可以提升运行速度的

## 使用

### 选择需要编译的系统

编译 linux
`go env -w GOOS=linux`

编译 windows
`go env -w GOOS=windows`

###选择需要编译的 cpu 架构

`go env -w GOARCH=amd64`

`go env -w GOARCH=arm64`

## 支持的平台

| GOOS      | GOARCH   |
| --------- | -------- |
| aix       | ppc64    |
| android   | 386      |
| android   | amd64    |
| android   | arm      |
| android   | arm64    |
| darwin    | amd64    |
| darwin    | arm64    |
| dragonfly | amd64    |
| freebsd   | 386      |
| freebsd   | amd64    |
| freebsd   | arm      |
| illumos   | amd64    |
| ios       | arm64    |
| js        | wasm     |
| linux     | 386      |
| linux     | amd64    |
| linux     | arm      |
| linux     | arm64    |
| linux     | ppc64    |
| linux     | ppc64le  |
| linux     | mips     |
| linux     | mipsle   |
| linux     | mips64   |
| linux     | mips64le |
| linux     | riscv64  |
| linux     | s390x    |
| netbsd    | 386      |
| netbsd    | amd64    |
| netbsd    | arm      |
| openbsd   | 386      |
| openbsd   | amd64    |
| openbsd   | arm      |
| openbsd   | arm64    |
| plan9     | 386      |
| plan9     | amd64    |
| plan9     | arm      |
| solaris   | amd64    |
| windows   | 386      |
| windows   | amd64    |
| windows   | arm      |
| windows   | arm64    |
