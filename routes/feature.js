const express = require('express');
const router = express.Router();
const verifyType = require('../middlewares/verifyUserType');
const featureController = require('../controllers/featureController');
const { authentication } = require('../middlewares/authentication');

router.get('/allfeature', featureController.findAllFeatures); //authentication, verifyType(['admin']),

router.get('/feature/:id', featureController.findOne); // authentication, verifyType(['admin']),

router.put('/feature/:id', featureController.updateFeature); //authentication, verifyType(['admin'])

router.delete('/feature/:id', featureController.deleteFeature);

module.exports = router;