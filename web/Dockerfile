FROM node:14
WORKDIR /
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build:ssr
ENV PORT=4000
EXPOSE 4000
CMD [ "npm", "run", "serve:ssr" ]
