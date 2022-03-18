# 使用  prometheus grafana 监控node
 * docker run -p 9090:9090 -v /Users/zhoujin/Volume/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
 * docker run -d -p 3000:3000 grafana/grafana