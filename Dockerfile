# build stage
FROM node:16.14.0-alpine as build
WORKDIR /app
COPY package.json .
COPY yarn.lock .

RUN yarn
COPY . .
RUN yarn build

# production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
