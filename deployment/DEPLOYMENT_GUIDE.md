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

## Step 5: Setup SSL Certificate

```bash
sudo certbot certonly --nginx -d your-domain.com
```

## Step 6: Update Nginx Configuration

Edit nginx config:
```bash
sudo nano /etc/nginx/sites-available/crm-app
```

Update the domain placeholders in the ssl_certificate paths and server_name.

Restart nginx:
```bash
sudo systemctl restart nginx
```

## Step 7: Point Domain to Droplet

1. In your domain registrar's DNS settings, create an A record pointing to your droplet's IP
2. Wait for DNS propagation (usually 5-15 minutes)

## Step 8: Verify Deployment

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs

# Check nginx status
sudo systemctl status nginx

# Test API
curl https://your-domain.com/api/health
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
