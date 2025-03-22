#!/bin/bash

echo "[Shield] Enabling IP forwarding..."
sysctl -w net.ipv4.ip_forward=1

echo "[Shield] Flushing iptables rules..."
iptables -t nat -F
iptables -F

echo "[Shield] Setting DNAT for external requests (DMZ interface) to LB..."
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 10.0.20.20:80
iptables -t nat -A PREROUTING -p tcp --dport 443 -j DNAT --to-destination 10.0.20.20:80
iptables -t nat -A POSTROUTING -p tcp -d 10.0.20.20 --dport 80 -j MASQUERADE

echo "[Shield] Handling internal Docker traffic (OUTPUT DNAT)..."
iptables -t nat -A OUTPUT -p tcp -d 10.0.10.10 --dport 80 -j DNAT --to-destination 10.0.20.20:80
iptables -t nat -A OUTPUT -p tcp -d 10.0.10.10 --dport 443 -j DNAT --to-destination 10.0.20.20:80

echo "[Shield] Allowing forwarding to LB..."
iptables -A FORWARD -p tcp -d 10.0.20.20 --dport 80 -j ACCEPT
iptables -A FORWARD -p tcp -d 10.0.20.20 --dport 443 -j ACCEPT

echo "[Shield] Starting Suricata..."
suricata -c /etc/suricata/suricata.yaml -i eth0 &

# Adiciona um pequeno atraso para dar tempo ao Suricata de criar o fast.log
sleep 5

# Tail nos logs do Suricata
tail -f /var/log/suricata/fast.log