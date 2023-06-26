# setup
FROM node:18
WORKDIR /usr/src/
RUN git clone https://github.com/oxyCabhru/brewskie.git
WORKDIR /usr/src/brewskie
RUN npm install; npm run build

#runtime
EXPOSE 3000
CMD [ "node", "build/" ]
STOPSIGNAL 9
