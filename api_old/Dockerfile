FROM node:14
WORKDIR /api
COPY . .
RUN npm ci
RUN npm i -g typescript
RUN tsc
ENTRYPOINT [ "node", "dist/index.js" ]