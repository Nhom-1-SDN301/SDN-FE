FROM node:18.17.0-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

CMD yarn start