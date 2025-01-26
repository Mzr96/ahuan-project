FROM node:lts-alpine as build-stage

WORKDIR /app
COPY . .
COPY package*.json ./
RUN npm install --force


RUN npm run generate

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/.output/public /usr/share/nginx/html

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
