FROM node:21

WORKDIR /usr/src/payment

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3555

CMD ["npm", "run", "dev"]