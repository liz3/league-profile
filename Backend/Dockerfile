FROM node:latest AS build
WORKDIR /usr/src/app-build
COPY package*.json ./
RUN npm install
COPY build.js build.js
COPY src src
RUN npm run build
FROM node:current-slim AS release
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=prod
COPY --from=build /usr/src/app-build/build/index.js ./index.js
CMD ["node", "index.js"]

