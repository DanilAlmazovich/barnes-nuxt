FROM node:22.14.0 AS build
LABEL authors="dbuzurmanaliev"

WORKDIR /usr/app

COPY ./ ./

COPY .env.production .env

RUN npm install --no-progress
RUN npm run build-only

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
