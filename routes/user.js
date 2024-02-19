const express = require('express');
const router = express.Router();
const verifyType = require('../middlewares/verifyUserType');
const userController = require('../controllers/usercontroller');
const { authentication } = require('../middlewares/authentication');

router.get('/alluser', userController.findAllUser); //authentication, verifyType(["admin", 'regular']), 

router.get('/user/:id', userController.findOne); // authentication, verifyType(['admin']),

router.put('/updateuser/:id', userController.updateUser); //authentication, verifyType(['admin'])

router.delete('/deleteuser/:id', userController.deleteUser);

module.exports = router;