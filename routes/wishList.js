const express = require('express');
const router = express.Router();
const verifyType = require('../middlewares/verifyUserType');
const wishListController = require('../controllers/wishListController');
const { authentication } = require('../middlewares/authentication');

router.post('/wishlist', wishListController.createWishList);

router.get('/wishlists', wishListController.findAllWishes); //authentication, verifyType(['admin']),

router.put('/wishlist', wishListController.updateWishList); //authentication, verifyType(['admin'])

router.delete('/order/:id', wishListController.deleteWish);

module.exports = router;