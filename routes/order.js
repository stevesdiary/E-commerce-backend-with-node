const express = require('express');
const router = express.Router();
const verifyType = require('../middlewares/verifyUserType');
const orderController = require('../controllers/orderController');
const { authentication } = require('../middlewares/authentication');

router.get('/allorders', orderController.findAllOrders); //authentication, verifyType(['admin']),

router.get('/order/:id', orderController.findOne); // authentication, verifyType(['admin']),

router.put('/order/:id', orderController.updateOrder); //authentication, verifyType(['admin'])

router.delete('/order/:id', orderController.deleteOrder);

module.exports = router;