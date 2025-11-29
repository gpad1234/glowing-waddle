#!/bin/bash

# Update nginx configuration with your domain
# Usage: ./configure-nginx.sh your-domain.com

if [ -z "$1" ]; then
    echo "Usage: ./configure-nginx.sh your-domain.com"
    echo "Example: ./configure-nginx.sh example.com"
    exit 1
fi

DOMAIN=$1
NGINX_CONFIG="/etc/nginx/sites-available/crm-app"

echo "Updating nginx configuration for domain: $DOMAIN"

# Backup original config
sudo cp $NGINX_CONFIG $NGINX_CONFIG.backup
echo "Backup created: $NGINX_CONFIG.backup"

# Update domain in nginx config
sudo sed -i "s/your-domain\.com/$DOMAIN/g" $NGINX_CONFIG
sudo sed -i "s/server_name _;/server_name $DOMAIN;/" $NGINX_CONFIG

# Test nginx configuration
echo "Testing nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✓ Configuration test passed"
    echo "Restarting nginx..."
    sudo systemctl restart nginx
    echo "✓ Nginx restarted successfully"
    echo ""
    echo "Configuration complete for domain: $DOMAIN"
else
    echo "✗ Configuration test failed"
    echo "Restoring backup..."
    sudo cp $NGINX_CONFIG.backup $NGINX_CONFIG
    exit 1
fi
