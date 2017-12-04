FROM node:8.6.0

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/local/src/barlink-api && cp -a /tmp/node_modules /usr/local/src/barlink-api

WORKDIR /usr/local/src/barlink-api
ADD . /usr/local/src/barlink-api

CMD ["npm", "start"]
