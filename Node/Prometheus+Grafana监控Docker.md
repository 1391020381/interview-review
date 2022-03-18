1. zabbix
 - 图形页面友好
 - 成熟 资料比较多
 - 告警  分级  完善

 2. prometheus
 - 对 docker  k8s监控有成熟解决方案。
 1. prometheus server
 2. clientlibrary
 3. push gateway
 4. exporters
 5. alertmanager
 6. webui

 * docker run -p 9090:9090 -v /Users/zhoujin/Volume/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
 * docker run -d -p 3000:3000 grafana/grafana