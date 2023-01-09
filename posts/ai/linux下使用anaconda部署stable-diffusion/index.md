# linux下使用anaconda部署stable-diffusion


安装anaconda
```sh
wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-2022.10-Linux-x86_64.sh
chmod +x Anaconda3-2022.10-Linux-x86_64.sh
./Anaconda3-2022.10-Linux-x86_64.sh
```
配置源
`python -m pip install --upgrade pip`  
`pip config set global.index-url https://mirrors.bfsu.edu.cn/pypi/web/simple`  

`vim ~/.condarc`
```
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.bfsu.edu.cn/anaconda/pkgs/main
  - https://mirrors.bfsu.edu.cn/anaconda/pkgs/r
  - https://mirrors.bfsu.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.bfsu.edu.cn/anaconda/cloud
  msys2: https://mirrors.bfsu.edu.cn/anaconda/cloud
  bioconda: https://mirrors.bfsu.edu.cn/anaconda/cloud
  menpo: https://mirrors.bfsu.edu.cn/anaconda/cloud
  pytorch: https://mirrors.bfsu.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.bfsu.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.bfsu.edu.cn/anaconda/cloud
```
## accelerate `pip install accelerate`
## 测试下

`pip install --upgrade diffusers transformers scipy`


## 使用官方库stable-diffusion

`git clone https://gitcode.net/lyjjjjjjj/stable-diffusion.git`

修改`environment.yaml`

```
    - -e git+https://github.com/CompVis/taming-transformers.git@master#egg=taming-transformers
    - -e git+https://github.com/openai/CLIP.git@main#egg=clip

```
改成
```
    - -e git+https://gitcode.net/lyjjjjjjj/CLIP.git@master#egg=taming-transformers
    - -e git+https://gitcode.net/lyjjjjjjj/taming-transformers.git@main#egg=clip

```
