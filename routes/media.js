const express = require('express');
const router = express.Router();
// const productController = require('../controllers/productController');
const mediaController = require('../controllers/mediaController');
const { authentication } = require('../middlewares/authentication');

// router.post('/upload', mediaController.media);
// router.post("/uploadbulk", mediaController.uploadMedia, mediaController.handleUpload);

module.exports = router;