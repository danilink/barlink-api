FROM node:8.6.0

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/local/src/barlink-api-menu && cp -a /tmp/node_modules /usr/local/src/barlink-api-menu

WORKDIR /usr/local/src/barlink-api-menu
ADD . /usr/local/src/barlink-api-menu

CMD ["npm", "start"]
