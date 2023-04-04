FROM node:16 

WORKDIR /usr/src/app

COPY ./todo-frontend .

RUN npm install

CMD ["npm", "start", "-- -e=$ENVIRONMENT"]