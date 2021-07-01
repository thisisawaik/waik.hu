FROM node:14
WORKDIR /
COPY . .
RUN npm ci
RUN npm run build:ssr
RUN ls
ENV PORT=4000
EXPOSE 4000
CMD [ "npm", "run", "serve:ssr" ]
