FROM node:18.16-alpine

WORKDIR /frontend

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install

COPY .next .next
COPY public public

EXPOSE 3000

CMD npm start