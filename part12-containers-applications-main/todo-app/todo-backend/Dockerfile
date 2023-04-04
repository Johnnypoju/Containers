FROM node:16

WORKDIR /usr/src/server

COPY --chown=node:node ./todo-backend .

RUN npm ci --only=production

ENV DEBUG=todo-backend:*

USER node

CMD ["npm", "start"]