FROM denoland/deno:1.46.2

EXPOSE 4507

WORKDIR /usr/src/app

COPY . .

RUN deno task build

USER deno

CMD ["deno", "task", "serve"]
