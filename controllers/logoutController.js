const express = require("express");
// const { admin } = require('../models/admin');
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const router = express.Router();
const cookie = require('cookie');
const bcrypt = require("bcrypt");
const { authentication } = require("../middleware/authentication");

const logoutController = {
  logout: async (req, res) => {
    const  sessionId = req.headers.cookie?.split('=')[1];
    const expired = Date.now() - (10 * 6 * 1000)
    //clear the cookies
    delete sessions[sessionId];
    res.set('Set-Cookie', `session =; expires=${expired}`);
    res.send('Successfully logged out');
  }
}

module.exports = logoutController;