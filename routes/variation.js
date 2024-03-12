const express = require('express');
const router = express.Router();
const verifyType = require('../middlewares/verifyUserType');
const variationController = require('../controllers/variationController');
const { authentication } = require('../middlewares/authentication');

router.get('/allvariations', variationController.findAllVariations); //authentication, verifyType(['admin']),

router.get('/feature/:id', variationController.findOne); // authentication, verifyType(['admin']),

router.put('/feature/:id', variationController.updateVariation); //authentication, verifyType(['admin'])

router.delete('/feature/:id', variationController.deleteVariation);

module.exports = router;