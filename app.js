require("dotenv").config;
const express = require('express');
const app = express()
const localport = 3300;

console.log('SECRETS', process.env.USERNAME);
const port = process.env.APP_PORT;
app.use(express.json());
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const productsRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const logoutRoute = require('./routes/logout');

app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/', userRoute);
app.use('/', productsRoute);
app.use('/', orderRoute);
app.use('/', logoutRoute);


app.listen(localport, () => {
  console.log(`App running on port ${localport}/`);
})
