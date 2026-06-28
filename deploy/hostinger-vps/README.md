# Hostinger VPS deployment for Truston1

This project is a Node.js + SSR app, so it cannot be served as a plain static upload.
Use Ubuntu on the VPS, run it with PM2, and proxy traffic through Nginx.

## 1) Server prerequisites

Run these on the VPS:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -bash
sudo apt update
sudo apt install -y nodejs nginx git
sudo npm install -g pm2
```

## 2) Clone and install manually

```bash
sudo mkdir -p /var/www/truston1
cd /var/www/truston1
sudo git clone <your-repo-url> .
sudo chown -R $USER:$USER /var/www/truston1
npm install
npm run build
```

## 3) Start with PM2

```bash
pm2 start deploy/hostinger-vps/ecosystem.config.cjs
pm2 save
pm2 status
```

## 4) Configure Nginx

```bash
sudo cp deploy/hostinger-vps/nginx.conf.example /etc/nginx/conf.d/truston1.conf
sudo nano /etc/nginx/conf.d/truston1.conf
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

Replace `your-domain.com` in the config with your real domain.
If you use SSL, make sure the domain points to the VPS and Certbot is installed.

## 5) GitHub deployment with GitHub Actions

This repo now includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.
Push to the `main` branch and it will deploy to your VPS automatically.

### Required GitHub secrets

In GitHub, open your repository → Settings → Secrets and variables → Actions and add:

- `VPS_HOST`: your VPS public IP or domain
- `VPS_USERNAME`: SSH username, usually `root` or `ubuntu`
- `VPS_SSH_PRIVATE_KEY`: your private SSH key content
- `VPS_PORT`: SSH port, usually `22`
- `VPS_APP_PATH`: app path on the VPS, for example `/var/www/truston1`

### One-time VPS preparation

Run this once on the VPS:

```bash
sudo mkdir -p /var/www/truston1
sudo chown -R $USER:$USER /var/www/truston1
sudo mkdir -p /var/log/truston1
```

### Deploy from GitHub

1. Push your code to GitHub.
2. Go to the Actions tab in GitHub.
3. Run the workflow or wait for the push to `main` to trigger it.

## 6) Useful commands

```bash
pm2 logs truston1
pm2 restart truston1
pm2 stop truston1
sudo systemctl status nginx
```

## 7) Environment variables

Create a `.env` file in the app root if needed:

```env
PORT=3000
NODE_ENV=production
```
