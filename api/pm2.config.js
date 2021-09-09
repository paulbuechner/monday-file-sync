module.exports = {
  apps : [{
    name   : "API",
    script : "./dist/index.js",
    watch_options : {"usePolling": true},
    env_production: {
      NODE_ENV: "production"
    },
    env_development: {
      NODE_ENV: "development",
    },
    cron_restart: "1 0 * * *",
    restart_delay: 4000,
    error_file: "./logs/pm2/err.log",
    out_file: "./logs/pm2/out.log",
    pid_file: "./logs/pm2/API-pm_id.pid",
    log_date_format: "YYYY-MM-DD_HH-mm-ss"
  }]
}
