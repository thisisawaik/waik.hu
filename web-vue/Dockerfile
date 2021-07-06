FROM node:14

WORKDIR /

COPY . .

RUN npm ci

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

RUN npm run build

CMD [ "npm", "run", "start" ]