FROM node:14
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
RUN npm run build:ssr
ENV PORT=8080
EXPOSE 8080
CMD [ "npm", "run", "serve:ssr" ]