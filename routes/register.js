const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController.js');

router.post('/signup', registerController.registerUser);

module.exports = router;