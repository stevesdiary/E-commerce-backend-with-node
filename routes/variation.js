const express = require('express');
const router = express.Router();
const verifyType = require('../middlewares/verifyUserType');
const variationController = require('../controllers/variationController');
const { authentication } = require('../middlewares/authentication');

router.get('/allvariations', variationController.findAllVariations); //authentication, verifyType(['admin']),

router.get('/variations', variationController.findBySize); // authentication, verifyType(['admin']),

router.put('/variation/:variation_id', variationController.updateVariation); //authentication, verifyType(['admin'])

router.delete('/feature/:id', variationController.deleteVariation);

module.exports = router;