FROM nginx

# Install Certbot (Let's Encrypt client) and other dependencies
RUN apt-get update && \
    apt-get install -y certbot && \
    rm -rf /var/lib/apt/lists/*

ENV EMAIL=wet.4gustin@gmail.com
ENV DOMAIN=agustinwet.online

# Generate and install the SSL certificate
RUN certbot certonly --standalone --agree-tos --non-interactive --email $EMAIL -d $DOMAIN

# Copy the SSL certificate files to the NGINX configuration directory
RUN cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem /etc/nginx/conf.d/ssl.crt && \
    cp /etc/letsencrypt/live/$DOMAIN/privkey.pem /etc/nginx/conf.d/ssl.key

# Remove default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY ./website /usr/share/nginx/html

# Expose port 80 for HTTP and port 443 for HTTPS
EXPOSE 80
EXPOSE 443

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]