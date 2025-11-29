# DigitalOcean Deployment Guide

## Prerequisites
- DigitalOcean account
- Created droplet (Ubuntu 22.04 LTS or later)
- SSH access to droplet
- Domain name (for SSL)

## Step 1: Create DigitalOcean Droplet

1. Log in to DigitalOcean
2. Create a new Droplet:
   - **Image**: Ubuntu 22.04 LTS
   - **Size**: Basic ($6-12/month minimum)
   - **Region**: Choose closest to your users
   - **VPC Network**: Default
   - **Authentication**: SSH key (recommended)
   - **Hostname**: crm-app or your choice

## Step 2: SSH into Droplet

```bash
ssh root@your_droplet_ip
```

## Step 3: Run Setup Script

**First time setup (with clone):**
```bash
cd ~
wget https://raw.githubusercontent.com/gpad1234/glowing-waddle/main/deployment/setup.sh
chmod +x setup.sh
./setup.sh --clone
```

**Skip clone if already cloned:**
```bash
cd ~
./setup.sh
```

**If re-running setup (directory already exists) and want to re-clone:**
```bash
# Run with --clone flag to re-clone the repository
bash ~/setup.sh --clone
```

Or if you've already cloned the repo manually:
```bash
cd /var/www/crm-app
bash deployment/setup.sh
```

## Step 4: Configure Environment Variables

Edit the `.env` file:
```bash
nano /var/www/crm-app/.env
```

Update the following:
```
PORT=5000
NODE_ENV=production
OPENAI_API_KEY=your_actual_key_here
REACT_APP_API_URL=https://your-domain.com
DATABASE_PATH=/var/www/crm-app/crm_database.db
```

## Step 5: Setup SSL Certificate (Optional - for domain names only)

**If you have a domain name:**
```bash
sudo certbot certonly --nginx -d your-domain.com
```

**For IP address deployments:**
Skip this step. Your app will be accessible via HTTP on the IP address.

## Step 6: Update Nginx Configuration

**For IP address deployments (no SSL):**

Nginx is already configured to work with your IP address. No changes needed!

Access your app at: `http://your_droplet_ip`

**For domain name deployments (with SSL):**

Edit nginx config:
```bash
sudo nano /etc/nginx/sites-available/crm-app
```

Add SSL configuration. Edit nginx config and add after the HTTP server block:
```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com;

    # SSL Certificate paths
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/json application/javascript;
    gzip_min_length 1000;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Serve frontend static files
    location / {
        root /var/www/crm-app/frontend/build;
        try_files $uri $uri/ /index.html;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Deny access to sensitive files
    location ~ /\. {
        deny all;
    }
}

# HTTP to HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com;
    return 301 https://$host$request_uri;
}
```

Test and restart nginx:
```bash
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

## Step 7: Point Domain to Droplet (Domain deployments only)

1. In your domain registrar's DNS settings, create an A record pointing to your droplet's IP
2. Wait for DNS propagation (usually 5-15 minutes)

**For IP address deployments:** Skip this step.

## Step 8: Verify Deployment

**For IP address deployments:**
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs

# Check nginx status
sudo systemctl status nginx

# Test API
curl http://your_droplet_ip/api/health

# Access app in browser
# Open: http://your_droplet_ip
```

**For domain deployments:**
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs

# Check nginx status
sudo systemctl status nginx

# Test API
curl https://your-domain.com/api/health

# Access app in browser
# Open: https://your-domain.com
```

## Ongoing Management

### View Logs
```bash
# PM2 logs
pm2 logs

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Restart Services
```bash
# Restart backend
pm2 restart crm-backend

# Restart nginx
sudo systemctl restart nginx
```

### Update Application
```bash
cd /var/www/crm-app
git pull origin main
npm run install:all
npm run client:build
pm2 restart crm-backend
```

### SSL Renewal
```bash
# Certbot auto-renewal (runs automatically)
sudo certbot renew
```

### Monitoring
```bash
# PM2 monitoring
pm2 monit

# System resources
htop
```

### Backups
```bash
# Backup database
cp crm_database.db crm_database.db.backup

# Download locally
scp root@your_droplet_ip:/var/www/crm-app/crm_database.db ./backup/
```

## Troubleshooting

### Port Already in Use
```bash
sudo lsof -i :5000
sudo kill -9 <PID>
```

### Nginx Configuration Error
```bash
sudo nginx -t  # Test configuration
```

### SSL Certificate Issues
```bash
sudo certbot renew --dry-run
```

### Permission Denied
```bash
sudo chown -R $USER:$USER /var/www/crm-app
```

## Performance Optimization

### Enable Gzip Compression
Already configured in nginx.conf

### Database Optimization
```bash
cd /var/www/crm-app
# Vacuum SQLite database
sqlite3 crm_database.db "VACUUM;"
```

### PM2 Cluster Mode
Already configured in ecosystem.config.js to use max available CPU cores

## Security Hardening

- ✅ Firewall configured (ufw)
- ✅ SSL/TLS enabled
- ✅ Security headers configured
- ✅ Sensitive files protected
- Consider: Fail2ban for SSH brute force protection
- Consider: Regular backups to DigitalOcean Spaces

## Cost Optimization

- Use DigitalOcean's CDN for static assets
- Monitor resource usage with DigitalOcean graphs
- Consider DigitalOcean Spaces for backups/exports
- Use auto-scaling if load increases

## Support

For issues, check:
1. PM2 logs: `pm2 logs`
2. Nginx error log: `sudo tail -f /var/log/nginx/error.log`
3. System resources: `htop`
