require("dotenv").config();
const express = require('express');
const app = express()
const emoji = require('node-emoji');

app.use(express.json());
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const productsRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const logoutRoute = require('./routes/logout');
const priceRoute =  require('./routes/price');
const variationRoute = require('./routes/variation');

app.get('/', (req, res) => {
  res.send('App is running!');
})
app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/', userRoute);
app.use('/', productsRoute);
app.use('/', orderRoute);
app.use('/', logoutRoute);
app.use('/', priceRoute);
app.use('/', variationRoute);


app.listen(process.env.APP_PORT, () => {
  console.log(`App running on port ${process.env.APP_PORT}`);
})
