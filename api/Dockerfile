FROM node:14
WORKDIR /api
COPY . .
RUN npm ci
RUN npm i -g typesctipt
RUN tsc
ENTRYPOINT [ "node", "dist/index.js" ]