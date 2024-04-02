const express = require('express');
const router = express.Router();
const verifyType = require('../middlewares/verifyUserType');
const productController = require('../controllers/productController');
const { authentication } = require('../middlewares/authentication');

router.post('/createproduct', productController.createProduct);

router.get('/allproduct', productController.findAllProducts); //authentication, verifyType(['admin']),

router.get('/product/:id', productController.findOne); // authentication, verifyType(['admin']),
router.get('/product', productController.findBySize); // authentication, verifyType(['admin']),

router.put('/product/:id', productController.updateProduct); //authentication, verifyType(['admin'])

router.delete('/product/:id', productController.deleteProduct);

module.exports = router;