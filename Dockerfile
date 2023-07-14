FROM nginx:stable-alpine

COPY ./website /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]