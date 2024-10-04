* Prometheus 及 Grafana 

* [Grafana Alloy](https://grafana.com/docs/alloy/latest/introduction/)

* https://apm1391020381.grafana.net/



* [Node.js 服务保姆级监控：带你体验 Prometheus 的魅力](https://juejin.cn/post/7231727002461683773#heading-15)

* [如何用Prometheus、Grafana监控Node应用](https://www.modb.pro/db/116329)

docker run --name apm_alloy  \
  -v /Users/zhoujin/Volume/alloy/config.alloy:/etc/alloy/config.alloy \
  -p 12345:12345 \
  grafana/alloy:latest \
    run --server.http.listen-addr=0.0.0.0:12345 --storage.path=/Users/zhoujin/Volume/alloy/data \
    /etc/alloy/config.alloy


apm1391020381
token

glc_eyJvIjoiMTIzODM3OSIsIm4iOiJzdGFjay0xMDU1MjE1LWludGVncmF0aW9uLWFwbTEzOTEwMjAzODEiLCJrIjoialNNNjYyTjYyQlN2Tmc1NjVrMW9qY005IiwibSI6eyJyIjoicHJvZC1hcC1ub3J0aGVhc3QtMCJ9fQ==

mac homebrew 

brew install grafana/grafana/alloy

ARCH="amd64" GCLOUD_HOSTED_METRICS_URL="https://prometheus-prod-49-prod-ap-northeast-0.grafana.net/api/prom/push" GCLOUD_HOSTED_METRICS_ID="1827419" GCLOUD_SCRAPE_INTERVAL="60s" GCLOUD_HOSTED_LOGS_URL="https://logs-prod-030.grafana.net/loki/api/v1/push" GCLOUD_HOSTED_LOGS_ID="1012995" GCLOUD_RW_API_KEY="glc_eyJvIjoiMTIzODM3OSIsIm4iOiJzdGFjay0xMDU1MjE1LWludGVncmF0aW9uLWFwbTEzOTEwMjAzODEiLCJrIjoialNNNjYyTjYyQlN2Tmc1NjVrMW9qY005IiwibSI6eyJyIjoicHJvZC1hcC1ub3J0aGVhc3QtMCJ9fQ==" /bin/sh -c "$(curl -fsSL https://storage.googleapis.com/cloud-onboarding/alloy/scripts/install-macos-homebrew.sh)"