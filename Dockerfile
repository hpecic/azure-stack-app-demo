# specify the node base image with your desired version node:<version>
FROM node:9-alpine
RUN apk update && \
    apk upgrade && \
    apk add --no-cache git
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY ./src ./src
COPY ./react-app/build/ ./react-app/build/
RUN chmod -R 777 ./react-app/build/
# replace this with your application's default port
EXPOSE 80
CMD [ "npm", "start" ]
