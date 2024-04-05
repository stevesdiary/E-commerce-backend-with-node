const express = require('express');
const router = express.Router();
const verifyType = require('../middlewares/verifyUserType');
const wishListController = require('../controllers/wishListController');
const { authentication } = require('../middlewares/authentication');
console.log("Reaching here...");

router.post('/wish', wishListController.createWishList);

router.get('/wishlists', wishListController.findAllWishes); //authentication, verifyType(['admin']),

router.put('/wishlist', wishListController.updateWishList); //authentication, verifyType(['admin'])

router.delete('/wishlist/:wish_id', wishListController.deleteWish);

module.exports = router;