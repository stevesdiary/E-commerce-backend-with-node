const express = require('express');
const router = express.Router();
const verifyType = require('../middlewares/verifyUserType');
const featureController = require('../controllers/variationController');
const { authentication } = require('../middlewares/authentication');

router.get('/allvariations', featureController.findAllVariations); //authentication, verifyType(['admin']),

router.get('/feature/:id', featureController.findOne); // authentication, verifyType(['admin']),

router.put('/feature/:id', featureController.updateVariation); //authentication, verifyType(['admin'])

router.delete('/feature/:id', featureController.deleteVariation);

module.exports = router;