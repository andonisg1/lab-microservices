FROM node:10-alpine

WORKDIR /opt/enforcementMS

COPY package*.json ./
RUN npm i

COPY . .

CMD ["node","index.js"]
