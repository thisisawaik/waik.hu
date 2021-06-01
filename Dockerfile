FROM node:14
WORKDIR /web
COPY . .
ENV PORT=4000
EXPOSE 4000
CMD [ "npm", "run", "serve:ssr" ]