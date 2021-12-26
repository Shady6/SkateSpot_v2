FROM caddy:latest
EXPOSE 80
EXPOSE 443

ARG ENVIRONMENT

COPY "./Caddyfile.${ENVIRONMENT}" /etc/caddy/Caddyfile