# Hostinger VPS deployment for Truston

This project is a Node.js SSR app. It **cannot** be deployed as a plain static upload.
Use Ubuntu on the VPS, run it with PM2, and proxy traffic through Nginx.

---

## 1) Server prerequisites (run once on the VPS)

```bash
# Install Node.js 22 (REQUIRED — 20 will not work with TanStack Start)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt update
sudo apt install -y nodejs nginx git
sudo npm install -g pm2

# Confirm versions
node -v   # must be v22.x or higher
npm -v
```

---

## 2) Clone and build

```bash
sudo mkdir -p /var/www/truston1
sudo chown -R $USER:$USER /var/www/truston1
cd /var/www/truston1
git clone <your-repo-url> .
npm install
npm run build
```

---

## 3) Create the .env file on the VPS

**This step is critical — the app will crash without it.**

```bash
nano /var/www/truston1/.env
```

Paste the following (replace the service-role key with your real value from Supabase → Settings → API):

```env
NODE_ENV=production
PORT=3000

SUPABASE_URL=https://riphytslpvrasnbcfpaw.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpcGh5dHNscHZyYXNuYmNmcGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzAxMjEsImV4cCI6MjA5Nzk0NjEyMX0.kxar-gurnMm1QansyZmgkbjR6j3u0OCq-4Zna94q1gI
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE

VITE_SUPABASE_URL=https://riphytslpvrasnbcfpaw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpcGh5dHNscHZyYXNuYmNmcGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzAxMjEsImV4cCI6MjA5Nzk0NjEyMX0.kxar-gurnMm1QansyZmgkbjR6j3u0OCq-4Zna94q1gI
VITE_SUPABASE_PROJECT_ID=riphytslpvrasnbcfpaw
```

> Get your `SUPABASE_SERVICE_ROLE_KEY` from:  
> **Supabase Dashboard → Your Project → Settings → API → service_role (secret)**

---

## 4) Start with PM2

```bash
cd /var/www/truston1
pm2 start deploy/hostinger-vps/ecosystem.config.cjs
pm2 save
pm2 startup   # auto-start PM2 on reboot
pm2 status
```

---

## 5) Configure Nginx

```bash
sudo cp deploy/hostinger-vps/nginx.conf.example /etc/nginx/conf.d/truston1.conf
# Edit and replace "your-domain.com" with your real domain:
sudo nano /etc/nginx/conf.d/truston1.conf
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## 6) (Optional) SSL with Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d trustondevelopers.com -d www.trustondevelopers.com
```

---

## 7) GitHub Actions auto-deploy

This repo includes `.github/workflows/deploy.yml`.  
Push to `main` and it will SSH into the VPS, pull latest, rebuild, and restart PM2.

### Required GitHub secrets

Go to **Repository → Settings → Secrets and variables → Actions** and add:

| Secret | Value |
|--------|-------|
| `VPS_HOST` | Your VPS IP or domain |
| `VPS_USERNAME` | `root` or your SSH user |
| `VPS_SSH_PRIVATE_KEY` | Content of your private SSH key |
| `VPS_PORT` | `22` |
| `VPS_APP_PATH` | `/var/www/truston1` |

---

## 8) Useful commands

```bash
pm2 logs truston1          # live logs
pm2 restart truston1       # restart after code changes
pm2 stop truston1          # stop the app
pm2 status                 # check if running
sudo systemctl status nginx
```

---

## Troubleshooting

**"This page didn't load" / blank page:**
```bash
pm2 logs truston1 --lines 50
```
Most common causes:
- Missing `.env` file or missing `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` → create/update `.env`
- Node version < 22 → upgrade Node
- Build not run → `npm run build`
- Port 3000 blocked by firewall → `sudo ufw allow 3000` or check Nginx config

**Check Node version:**
```bash
node -v   # must be 22+
```

**Rebuild after code changes:**
```bash
cd /var/www/truston1 && git pull && npm install && npm run build && pm2 restart truston1
```
