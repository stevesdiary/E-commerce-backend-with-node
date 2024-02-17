const express = require("express");

const logoutController = {
  logout: async (req, res) => {
    const sessions = {};
    const  sessionId = req.headers.cookie?.split('=')[1];
    const expired = Date.now() - (10 * 6 * 1000)
    //clear the cookies
    delete sessions[sessionId];
    res.set('Set-Cookie', `session =; expires=${expired}`);
    res.send('Successfully logged out');
  }
}

module.exports = logoutController;