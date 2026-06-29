module.exports = {
  apps: [
    {
      name: 'truston1',
      script: 'node',
      args: 'serve.mjs',
      cwd: '/var/www/truston1',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        // All Supabase credentials — these are loaded from .env by serve.mjs,
        // but are listed here as a fallback / reference.
        // Replace the values below with your real keys if you don't use a .env file.
        SUPABASE_URL: 'https://riphytslpvrasnbcfpaw.supabase.co',
        SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpcGh5dHNscHZyYXNuYmNmcGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzAxMjEsImV4cCI6MjA5Nzk0NjEyMX0.kxar-gurnMm1QansyZmgkbjR6j3u0OCq-4Zna94q1gI',
        // IMPORTANT: paste your real service-role key here (never commit this to git)
        SUPABASE_SERVICE_ROLE_KEY: 'REPLACE_WITH_YOUR_SERVICE_ROLE_KEY',
        VITE_SUPABASE_URL: 'https://riphytslpvrasnbcfpaw.supabase.co',
        VITE_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpcGh5dHNscHZyYXNuYmNmcGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzAxMjEsImV4cCI6MjA5Nzk0NjEyMX0.kxar-gurnMm1QansyZmgkbjR6j3u0OCq-4Zna94q1gI',
        VITE_SUPABASE_PROJECT_ID: 'riphytslpvrasnbcfpaw',
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
