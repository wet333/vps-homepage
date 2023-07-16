FROM nginx:stable-alpine

# El mismo reverse proxy se encarga del HTTPS
# COPY nginx.conf /etc/nginx/nginx.conf

COPY ./website /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]