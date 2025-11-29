#!/bin/bash

# CRM App DigitalOcean Deployment Setup Script
# This script prepares a DigitalOcean droplet for the CRM application

set -e

echo "================================"
echo "CRM App - DigitalOcean Setup"
echo "================================"

# Update system
echo "Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js and npm
echo "Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install git
echo "Installing git..."
sudo apt-get install -y git

# Install nginx
echo "Installing nginx..."
sudo apt-get install -y nginx

# Install certbot for SSL
echo "Installing certbot..."
sudo apt-get install -y certbot python3-certbot-nginx

# Install PM2 globally
echo "Installing PM2..."
sudo npm install -g pm2

# Create app directory
echo "Creating app directory..."
sudo mkdir -p /var/www/crm-app
sudo chown -R $USER:$USER /var/www/crm-app

# Clone repository (update with your repo URL)
echo "Cloning repository..."
git clone https://github.com/gpad1234/glowing-waddle.git /var/www/crm-app
cd /var/www/crm-app

# Install dependencies
echo "Installing dependencies..."
npm run install:all

# Create logs directory
echo "Creating logs directory..."
mkdir -p logs

# Build frontend
echo "Building frontend..."
npm run client:build

# Setup environment variables
echo "Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file. Please update with your configuration."
    echo "Important: Set OPENAI_API_KEY in .env"
fi

# Copy nginx configuration
echo "Configuring nginx..."
sudo cp /var/www/crm-app/nginx.conf /etc/nginx/sites-available/crm-app
sudo ln -sf /etc/nginx/sites-available/crm-app /etc/nginx/sites-enabled/crm-app
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Setup SSL with Let's Encrypt (interactive)
echo "Setting up SSL certificate..."
echo "Run this command manually with your domain:"
echo "sudo certbot certonly --nginx -d your-domain.com"

# Start PM2
echo "Starting PM2..."
pm2 start ecosystem.config.js
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER

# Restart nginx
echo "Restarting nginx..."
sudo systemctl restart nginx
sudo systemctl enable nginx

# Setup firewall
echo "Configuring firewall..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
echo "y" | sudo ufw enable

echo "================================"
echo "Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Update .env with your OpenAI API key"
echo "2. Setup SSL: sudo certbot certonly --nginx -d your-domain.com"
echo "3. Update nginx.conf with your domain"
echo "4. Restart nginx: sudo systemctl restart nginx"
echo "5. Check PM2 status: pm2 status"
echo "6. View logs: pm2 logs"
