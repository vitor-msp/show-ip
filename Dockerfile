FROM node:18.17
WORKDIR /api
COPY . .
RUN npm i --production
EXPOSE 80
ENTRYPOINT ["node", "index.js"]