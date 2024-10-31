// ecosystem.config.js

const apps  =  [{ 
    name: "my-app", 
    script: "./app.js", 
    instances: 4, 
    exec_mode: "cluster", 
    watch: true, max_memory_restart: "200M", 
    env: { NODE_ENV: "development", PORT: 3000 }, 
    env_production:{ NODE_ENV: "production", PORT: 8080 } 
}]
