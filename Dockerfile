FROM node:14-alpine 

WORKDIR /app

COPY . /app

RUN npm install

COPY . .

ENV NAME Ecommerce-backend-with-node

CMD ["npm", "start"]
