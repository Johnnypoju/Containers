FROM node:16 as build-stage

WORKDIR /usr/src/app/

COPY --chown=node:node ./todo-frontend .

RUN npm install

RUN npm ci

ENV CI=true

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

RUN npm run test

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html