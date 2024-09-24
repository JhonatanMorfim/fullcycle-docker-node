FROM node:15

WORKDIR /app

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY .docker/node/docker-entrypoint.sh /usr/bin/docker-entrypoint

COPY package.json package-lock.json /app/

RUN npm install

EXPOSE 3000

CMD ["docker-entrypoint"]