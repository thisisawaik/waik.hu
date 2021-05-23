FROM node:14
WORKDIR /web
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
RUN npm run build:ssr
ENV PORT=4000
EXPOSE 4000
CMD [ "npm", "run", "serve:ssr" ]