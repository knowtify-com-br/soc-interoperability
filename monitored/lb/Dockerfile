FROM nginx:1.27.4

# Instala dependências gerais
RUN apt-get update && apt-get install -y iptables curl software-properties-common

COPY nginx.conf /etc/nginx/nginx.conf