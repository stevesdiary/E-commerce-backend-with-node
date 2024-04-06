const express = require('express');
const router = express.Router();
const verifyType = require('../middlewares/verifyUserType');
const orderController = require('../controllers/orderController');
const { authentication } = require('../middlewares/authentication');

router.post('/order', orderController.createOrder);

router.get('/allorders', orderController.findAllOrders);

router.put('/order/:id', orderController.updateOrder);

router.delete('/order/:id', orderController.deleteOrder);

module.exports = router;