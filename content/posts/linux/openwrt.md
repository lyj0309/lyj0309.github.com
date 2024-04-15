git clone --depth 1 https://github.com/coolsnowwolf/lede.git
cd lede

feeds.conf.default 

./scripts/feeds clean
proxychains ./scripts/feeds update -a
./scripts/feeds install -a


 make menuconfig
 
adbyby
cshark
eqos
passwall2
webadmin
wrtbrown


 git clone -n --depth 1 -b openwrt-23.05 --filter=blob:none https://github.com/openwrt/packages.git
 cd packages
 git sparse-checkout init --cone
 git sparse-checkout set lang/golang
 git checkout


proxychains make V=s -j$(nproc)