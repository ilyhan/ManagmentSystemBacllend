FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

USER node

ENV PORT=3030 \
    DB_HOST=localhost \
    DB_PORT=5432 \
    DB_NAME=TaskTracker \
    DB_USER=Ilia \
    DB_PASSWORD=1234 \
    JWT_SECRET=SECRET_KEY_FOR_AUTH

EXPOSE 3030

CMD ["node", "dist/main.js"]