FROM denoland/deno:1.46.2 AS builder

WORKDIR /usr/src/app

COPY . .

RUN printenv

RUN deno task build

FROM caddy:2.8.4-alpine

COPY --from=builder /usr/src/app/dist /usr/share/caddy

COPY ./Caddyfile /etc/caddy/Caddyfile

RUN env

EXPOSE 8000