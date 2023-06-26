FROM node:18
WORKDIR /usr/src/brewskie
COPY . .
RUN npm install; npm run build
EXPOSE 3000
CMD [ "node", "build/" ]