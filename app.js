const express = require('express');
const uuid = require('uuid').v4;
const app = express()
const port = 3300;
app.use(express.json());
const sessions = {};

app.post('/login', async (req, res) => {
  try{
    const {username, password } = req.body;
    // const userData = await User.findOne({ where: { email: email } });
    // if (!userData) {
    //   return res.status(404).send({ Message: "Email is not correct or not found!" });
    // }
    // const passwordMatch = await bcrypt.compare(password, userData.password);
    // // console.log(userData.password, passwordMatch, password);
    // if (!passwordMatch) {
    //   return res.status(401).send({ Message: "Password is not correct, please provide the correct password." });
    // }
    if (username !== 'admin' || password !== 'admin') {
      return res.status(401).send('Invalid username or password')
    }
    const sessionId = uuid();
    console.log(sessionId)
    sessions[sessionId] = { username, userId: 1 };
    res.set('Set-Cookie', `session = ${sessionId}`);
    res.send('success')
  }
  catch(err){
    return res.status(500).send({Message: `User unable to login`, Error: err.message})
  }
})

app.get('/todos', async (req, res)=> {
  const sessionId = req.headers.cookie?.split('=')[1];
  const userSession = sessions[sessionId];
  console.log(userSession, "USER SESSION")
  if(!userSession) {
    return res.status(401).send("Invalid session");
  }
  const userId = userSession.userId;
  res.send([{
    id: 1,
    title: 'Learn Node',
    userId,
  }]);
})

app.listen(port, async () => {
  console.log(`App running on port ${port}`);
})

module.exports = app;