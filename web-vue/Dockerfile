FROM node:14

WORKDIR /

COPY . .

RUN npm ci

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

RUN npm run build

CMD [ "npm", "run", "start" ]