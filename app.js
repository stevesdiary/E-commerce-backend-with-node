const express = require('express');
const uuid = require('uuid').v4;
const app = express()
app.use(express.json());
const session = {};

app.post('/login', async (req, res) => {
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
  }
  catch(err){
    return res.status(500).send({Message: `User unable to login`, Error: err})
  }
})


app.listen(port, async() => {
  console.log(`App running on port ${port}`);
})

module.exports = app;