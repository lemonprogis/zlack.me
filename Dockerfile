FROM node:14.20.0
ENV PROD=true

EXPOSE 8080

WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# add app
COPY . .

CMD [ "node", "server.js" ]