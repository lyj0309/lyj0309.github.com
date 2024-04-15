---
title: "windows配置ssh"
date: 2023-12-18T20:44:06+08:00
tags: ["windows"]
---

## 安装软件

```powershell
# Install the OpenSSH Client
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0

# Install the OpenSSH Server
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

这时候就能使用用户密码登陆了

## 配置密钥

使用密钥就不用每次输密码

```powershell
# By default the ssh-agent service is disabled. Configure it to start automatically.
# Make sure you're running as an Administrator.
Get-Service ssh-agent | Set-Service -StartupType Automatic

# Start the service
Start-Service ssh-agent

# This should return a status of Running
Get-Service ssh-agent

# Now load your key files into ssh-agent
ssh-add keyfile
```

https://www.cnblogs.com/WNpursue/p/14944047.html