FROM node
WORKDIR /usr/src/brewskie
COPY . .
RUN npm install; npm run build
EXPOSE 3000
CMD [ "node", "build/" ]
# docker run -dp 80:3000 brewskie
