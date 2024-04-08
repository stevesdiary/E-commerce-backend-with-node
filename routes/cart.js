const express = require('express');
const router = express.Router();
const verifyType = require('../middlewares/verifyUserType');
const cartController = require('../controllers/cartController');
const { authentication } = require('../middlewares/authentication');

router.post('/cart', cartController.createCart);

router.get('/allcarts', cartController.findAllCarts);

// router.put('/cart/:id', cartController.updateCart);

router.delete('/cart/:id', cartController.deleteCart);

module.exports = router;