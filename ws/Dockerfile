FROM node:16.5.0
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm i typescript -g
RUN npm install bcrypt
RUN tsc

ENV PORT=3005
ENV HOST=0.0.0.0

CMD [ "npm", "run", "start" ]