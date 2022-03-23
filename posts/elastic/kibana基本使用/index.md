# Kibana改中文


在 `kibana.yml`配置文件中加一行
docker exec -ti efk-kibana-1 sh -c "cat << EOF > config/kibana.yml 
i18n.locale: \"zh-CN\"
EOF
"

docker exec -it -c efk-kibana-1 cat  

`i18n.locale: "zh-CN"`
