FROM ubuntu:22.04

# Instala dependências gerais
RUN apt-get update && apt-get install -y iptables curl software-properties-common

# Instala o Suricata
RUN add-apt-repository ppa:oisf/suricata-stable && \
    apt-get update && \
    apt-get install -y suricata

# Configura regras do Suricata
RUN suricata-update && \
    echo 'alert http any any -> any any (msg:"HTTP request for /attack"; flow:established,to_server; http.uri; content:"/attack"; sid:1000001; rev:1;)' >> /var/lib/suricata/rules/suricata.rules

# Copia o script de configuração de rede
COPY entrypoint.sh /entrypoint.sh

# Garante que o script seja executável
RUN chmod +x /entrypoint.sh

# Define o entrypoint
ENTRYPOINT ["/entrypoint.sh"]