const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
// const { authentication } = require('../middlewares/authentication');

router.post('/login', loginController.login);//authentication

module.exports = router;