FROM node:21

WORKDIR /usr/src/main

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3444

CMD ["npm", "run", "dev"]