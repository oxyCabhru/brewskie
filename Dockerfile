#setup
FROM node:18
WORKDIR /usr/src/brewskie
COPY . .
RUN npm install
RUN npm run build

#runtime
EXPOSE 3000
ENTRYPOINT ["node", "build/"]
STOPSIGNAL 9