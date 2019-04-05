const jwt = require('jsonwebtoken'); 
const secret = require('../database/secrets').jwtSecret;
//const secret = 'serrrrrcret';
//const secret = new Buffer('yoursecret', 'base64');
const jwtKey =
  process.env.JWT_SECRET ||
  'add a .env file to root of project with the JWT_SECRET variable';

// quickly see what this file exports
module.exports = {
  authenticate, generateToken
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(401).json({error: err});
      req.decoded = decoded;
      console.log(decoded)
 
      next();

    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}

function generateToken(user){
  const payload = {
    subject: user.id,
    username : user.username,
  };
  
  const options ={
    expiresIn : '1h',
  }
  return  jwt.sign(payload, secret, options);
}

