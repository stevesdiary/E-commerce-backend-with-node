FROM node:14-alpine 

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3301

ENV NAME Ecommerce-backend-with-node

CMD ["npm", "start"]
