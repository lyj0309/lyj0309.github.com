---
title: "intel 显卡sr-iov"
date: 2024-04-03T01:50:37+08:00
---

根据readme来

https://github.com/strongtz/i915-sriov-dkms


记得安装驱动
sudo apt install intel-media-va-driver-non-free
sudo apt install intel-opencl-icd

监控

sudo apt update && sudo apt install -y intel-gpu-tools
intel_gpu_top -d sriov

参考
https://www.bilibili.com/read/cv30966105/
各代编解码能力
https://github.com/intel/media-driver/blob/master/README.md#decodingencoding-features
