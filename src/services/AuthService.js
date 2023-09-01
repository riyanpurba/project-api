const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    async comparePasswords(inputPassword, hashedPassword) {
        return await bcrypt.compare(inputPassword, hashedPassword);
    }

    generateAccessToken(user) {
        return jwt.sign(
          { 
            userId: user.id,
          },
          process.env.SECRET_KEY, 
          {
            expiresIn: "2h"
          }
        );
    }

    generateRefreshToken(user) {
        return jwt.sign(
          { 
            userId: user.id,
          },
          process.env.SECRET_KEY, 
          {
            expiresIn: "7d"
          }
        );
    }
}

module.exports = new AuthService();
