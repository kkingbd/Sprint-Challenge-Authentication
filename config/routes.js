const axios = require('axios');
const db = require('../database/dbConfig.js');
const bcrypt = require('bcryptjs');
const { authenticate , generateToken} = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  if(user.username && user.password){
    user.password = hash;
  
    db('users')
    .insert(user)
      .then(info => {
        res.status(201).json({message: "Registration Successful", info});
      })
      .catch(error => {
        res.status(500).json({error: "Unable to Register, Pick a different username", error});
      });
  } else{
    res.status(402).json({error: 'Username and Password both required'})
  }
};

function login(req, res) {
  // implement user login
    let { username, password } = req.body;
    
    db('users')
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${username}!`,
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  };

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
