FROM node:10-alpine

WORKDIR /opt/heartbeatsMS

COPY package*.json ./
RUN npm i

COPY . .

CMD ["node","index.js"]
