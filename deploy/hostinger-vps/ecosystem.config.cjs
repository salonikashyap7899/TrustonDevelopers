module.exports = {
  apps: [
    {
      name: 'truston1',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/truston1',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      log_file: '/var/log/truston1/combined.log',
      out_file: '/var/log/truston1/out.log',
      error_file: '/var/log/truston1/error.log',
    },
  ],
};
