

英文文档 https://github.com/acmesh-official/acme.sh/wiki/How-to-issue-a-cert

生成域名

dnspod举例
```sh
export DP_Id="1234"
export DP_Key="sADDsdasdgdsf"
./acme.sh --issue --dns dns_dp -d example.com -d www.example.com
```
可一次生成多个域名，包括泛域名


部署域名 

nginx举例

```sh
acme.sh --install-cert -d n.fakev.cn -d *.n.fakev.cn -d np.fakev.cn -d *.np.fakev.cn \
--cert-file /root/nginx/cert/n.pem \
--key-file /root/nginx/cert/n.key \
--reloadcmd "docker-compose exec nginx nginx -s reload"

# --fullchain-file /etc/nginx/certs/mydomain.com/fullchain \

```
docker-compose exec nginx nginx -s reload