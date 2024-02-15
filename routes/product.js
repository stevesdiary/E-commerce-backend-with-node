const express = require('express');
const router = express.Router();
const verifyType = require('../middleware/verifyType');
const productController = require('../controllers/productController');
const { authentication } = require('../middleware/authentication');

router.get('/alluser', productController.findAllProduct); //authentication, verifyType(['admin']),

router.get('/user/:id', productController.findOne); // authentication, verifyType(['admin']),

router.put('/updateuser/:id', productController.updateProduct); //authentication, verifyType(['admin'])

router.delete('/deleteuser/:id', productController.deleteProduct);

module.exports = router;