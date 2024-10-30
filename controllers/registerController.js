const bcrypt = require('bcrypt');
const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const saltRounds = bcrypt.genSaltSync(11);
const registerController = {
  registerUser: async (req, res) => {
    try{
      const { first_name, last_name, phone_number, shipping_address, billing_address, gender, email, password, confirm_password, type } = req.body;
    }
    catch(err){
      console.log(err);
      return err
    }
  }
}

module.exports = registerController;