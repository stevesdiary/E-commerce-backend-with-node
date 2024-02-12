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
    const expiryDate = new Date(Date.now() + (10 * 24 * 3600000));
    sessions[sessionId] = { username, userId: 1 };
    res.cookie('session', sessionId, {expires: expiryDate});
    res.send('success')
  }
  catch(err){
    return res.status(500).send({Message: `User unable to login`, Error: err.message})
  }
})
app.post('/logout', async (req, res) => {
  const  sessionId = req.headers.cookie?.split('=')[1];
  const expired = Date.now() - (10 * 6 * 1000)
  //clear the cookies
  delete sessions[sessionId];
  res.set('Set-Cookie', `session =; expires=${expired}`);
  res.send('Successfully logged out');
})

app.get('/todos', async (req, res)=> {
  const sessionId = req.headers.cookie?.split('=')[1];
  const userSession = sessions[sessionId];
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