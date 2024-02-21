const express = require('express');
const router = express.Router();
const verifyType = require('../middlewares/verifyUserType');
const priceController = require('../controllers/priceController');
const { authentication } = require('../middlewares/authentication');

router.get('/allorders', priceController.findAllPrices); //authentication, verifyType(['admin']),

router.put('/order/:id', priceController.updatePrice); //authentication, verifyType(['admin'])

router.delete('/order/:id', priceController.deletePrice);

module.exports = router;