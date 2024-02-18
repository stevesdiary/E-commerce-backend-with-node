const express = require("express");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const uuid = require('uuid').v4;
require("dotenv").config;
const cookie = require('cookie');
const sessionId = uuid();
const sessions = {};
const bcrypt = require("bcrypt");
const { authentication } = require("../middlewares/authentication");

const loginController = {
  login: async (req, res) => {
    try{
      const {email, password } = req.body;
      const userData = await User.findOne({ where: { email: email } });
      if (!userData) {
        return res.status(404).send({ Message: "Email is not correct or not found!" });
      }
      const passwordMatch = await bcrypt.compare(password, userData.password);
      // console.log(userData.password, passwordMatch, password);
      if (!passwordMatch) {
        return res.status(401).send({ Message: "Password is not correct, please provide the correct password." });
      } 
      const user = await User.findOne({ where: { email }});
      const id = user.id;
      console.log(user)
      const expiryDate = new Date(Date.now() + (60 * 1000));
      console.log(process.env.JWT_SECRET, "SECRET KEY", expiryDate);
      sessions[sessionId] = { email, userId: 1 };
      res.cookie('session', sessionId, {expires: expiryDate});
      const first_name = user.first_name;
      const last_name = user.last_name;
      const type = user.type;
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: id,
            email: userData.email,
            type: user.type,
            session: sessionId,
          },
        },
        '08d1f52e2ee774d2e9f518d065310a6cf46e8e2e6625e1da13d52aa9967231914a87b7',
        // {exiresIn: expiryDate},
        // {exp: Math.floor(Date.now() / 1000) + 60 * 60 * 10},
      );
      

      console.log(`${email} logged in as ${type} user.`);

      return res.status(200).json({
        statusCode: 200,
        id: user.id,
        first_name: first_name,
        last_name: last_name,
        type: type,
        token: accessToken,
        sessionId: sessionId
      });

    }
    catch(err){
      return res.status(500).send({Message: `User unable to login`, Error: err.message})
    }
  }
}

module.exports = loginController;
