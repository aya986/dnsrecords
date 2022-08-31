FROM node:14.16.1-alpine3.13

WORKDIR /usr/src

COPY package.json ./package.json

# RUN [ "npm", "cache", "clean", "--force" ]
RUN npm install

COPY . .
