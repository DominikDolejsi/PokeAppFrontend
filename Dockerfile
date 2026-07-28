    FROM denoland/deno:2.9.3 AS builder

    ARG BACKEND_API
    ENV VITE_BACKEND_API=${BACKEND_API}

    WORKDIR /usr/src/app

    COPY . .

    RUN printenv

    RUN deno install

    RUN deno task build

    FROM caddy:2.8.4-alpine

    COPY --from=builder /usr/src/app/dist /usr/share/caddy

    COPY ./Caddyfile /etc/caddy/Caddyfile

    RUN env

    EXPOSE 8000
