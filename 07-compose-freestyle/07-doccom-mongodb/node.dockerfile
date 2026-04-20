FROM        node:alpine

ARG         PACKAGES=nano

RUN         apk update && apk add $PACKAGES

WORKDIR     /var/www

COPY        package.json package-lock.json ./

RUN         npm install

COPY        . .
EXPOSE      3000

ENTRYPOINT  ["npm", "start"]
