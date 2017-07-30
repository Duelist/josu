FROM    node:8.2.1-slim

RUN     mkdir -p /usr/src/josu
WORKDIR /usr/src/josu

COPY    . /usr/src/josu
RUN     npm install -g yarn
RUN     yarn install
RUN     yarn build

CMD     ["yarn", "start"]
