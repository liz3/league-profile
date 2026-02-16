FROM node:22
WORKDIR /usr/src/
COPY package*.json ./
RUN npm install
COPY src src
CMD ["node", "src/index.js"]

