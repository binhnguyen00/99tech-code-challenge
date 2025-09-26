# stage 1: install dependencies
FROM node:20-alpine AS builder

WORKDIR /frontend

USER root

ENV CI=true

COPY . .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm run build

CMD ["pnpm", "run", "dev", "--host", "0.0.0.0", "--port", "2999"]