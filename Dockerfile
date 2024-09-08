FROM denoland/deno:1.46.2

EXPOSE 5173

WORKDIR /AppFrontend

USER deno

COPY . .

CMD ["deno", "task", "start"]