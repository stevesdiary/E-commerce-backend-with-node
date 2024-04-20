require("dotenv").config();
const express = require('express');
const app = express()
const emoji = require('node-emoji');
const port = process.env.APP_PORT;
// import * as emoji from 'node-emoji';

app.use(express.json());
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const productsRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const logoutRoute = require('./routes/logout');
const variationRoute = require('./routes/variation');
const wishListRoute = require('./routes/wishList');
const cartRoute = require('./routes/cart');
const checkOutRoute = require('./routes/checkOut');
const mediaRoute = require('./routes/media');

  console.log(emoji.emojify("I :heart: coding :man_technologist:!"))
  
app.get('/', (req, res) => {
  res.send(emoji.emojify('The :computer: is running :dancer: :handshake:'));
})
app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/', userRoute);
app.use('/', productsRoute);
app.use('/', orderRoute);
app.use('/', logoutRoute);
app.use('/', variationRoute);
app.use('/', wishListRoute);
app.use('/', cartRoute);
app.use('/', checkOutRoute);
app.use('/', mediaRoute);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
})
