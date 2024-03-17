const bcrypt = require('bcrypt');
const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const saltRounds = bcrypt.genSaltSync(11);
const registerController = {
  registerUser: async (req, res) => {
    try{
      const { first_name, last_name, phone_number, mailing_address, billing_address, gender, email, password, confirm_password, type } = req.body;
      const id = uuidv4();
      const userExists = await User.findOne({ where: { email } });
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&^]{8,15}$/;
      // console.log('Regex Test Result:', passwordRegex.test(password)); // Should return true if password matches the pattern
      if (userExists) {
        return res.status(409).json({ Message: `User ${first_name} already exists, you can login with your password.` });
      }
      if ( passwordRegex.test(password) == false ) {
        return res.status(403).send({
          Message: 'Password must be at least 8 characters long, maximum of 15 characters and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.'
        })
      }
      if (password !== confirm_password) {
        res.status(409).send({message: 'Password do not match, check and try again.'})
      }
      if(passwordRegex.test(password) == true && password == confirm_password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userRecord = await User.create({ id, first_name, last_name, phone_number, mailing_address, billing_address, gender, email, password: hashedPassword, type });
        if (userRecord) {
          const sanitizedUser = await User.findByPk(userRecord.id, {
            attributes: { exclude: ['password'] },
          }); 
          return res.status(201).json({ Message: `User ${first_name} created successfully`, User: sanitizedUser });
        }
      }
    }catch(err) {
      console.log(err)
      return res.status(500).send({message: "An error occoured!", Error: ( err.type, err.message ) });
    }
  }
}

module.exports = registerController;