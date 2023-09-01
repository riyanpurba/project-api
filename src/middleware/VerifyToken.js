const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

const logger = (req, res, next) => {
  console.log(`Received: ${req.method} ${req.path} Body: ${req.body}`);
  next();
}

const verifyToken = (req, res, next) => {
  const authToken = req.headers['authorization'];
  
  if (!authToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    const token = authToken.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: 'Invalid Authorization Token.' });
      }
      req.user = user;
      next();
    });
  }
}

const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is missing' });
  }

  jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Refresh token is invalid' });
    }

    req.user = user;
    next();
  });
}

module.exports = {
  logger: logger,
  auth: verifyToken,
  refresh: verifyRefreshToken,

}