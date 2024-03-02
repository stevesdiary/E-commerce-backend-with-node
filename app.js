require("dotenv").config();
const express = require('express');
const app = express()

app.use(express.json());
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const productsRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const logoutRoute = require('./routes/logout');
const priceRoute =  require('./routes/price');
const featureRoute = require('./routes/feature');

app.get('/', (req, res) => {
  res.send('App running on docker!');
})
app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/', userRoute);
app.use('/', productsRoute);
app.use('/', orderRoute);
app.use('/', logoutRoute);
app.use('/', priceRoute);
app.use('/', featureRoute);


app.listen(process.env.APP_PORT, () => {
  console.log(`App running on port ${process.env.APP_PORT}`);
})
