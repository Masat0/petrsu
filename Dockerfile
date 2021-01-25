FROM node:10

WORKDIR /app

COPY src/ .

RUN npm install
