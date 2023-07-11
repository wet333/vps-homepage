FROM nginx:stable-alpine

ENV DOMAIN_NAME agustinwet.online
ENV EMAIL wet.4gustin@gmail.com

# Install necessary packages
RUN apt-get update \
 && apt-get install -y \
    cron \
    certbot \
    python-certbot-nginx 

# Obtain the SSL certificate
RUN certbot --nginx -n --agree-tos -m $EMAIL -d $DOMAIN_NAME

# Set up a cron job to automatically renew the SSL certificate
RUN echo "0 12 * * * root certbot renew --quiet" >> /etc/crontab

EXPOSE 80 443

CMD service cron start && nginx -g "daemon off;"