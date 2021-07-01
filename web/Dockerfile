FROM node:14
WORKDIR /
COPY . .
RUN npm ci
RUN ls
RUN npm run build:ssr
ENV PORT=4000
EXPOSE 4000
CMD [ "npm", "run", "serve:ssr" ]
