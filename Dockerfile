FROM node:lts-alpine as build-stage

WORKDIR /app
COPY . .
COPY package*.json ./
RUN npm install --force


RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/.output  app/.output
COPY --from=build-stage /app/.nuxt  app/.nuxt

EXPOSE 80

CMD ["node", ".output/server/index.mjs"]
