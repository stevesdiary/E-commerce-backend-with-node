const express = require('express');
const router = express.Router();
const checkOutController = require('../controllers/checkOutController');
const { authentication } = require('../middlewares/authentication');

router.post('/checkout', checkOutController.checkOut);

module.exports = router;