const jwt = require('jsonwebtoken');
const authService = require('../services/AuthService');
const userController = require('./UserController');

class AuthController {
    async register(req, res) {
        const { email, password } = req.body;
        const newUser = await userController.createUser(email, password);
        // Return user data or appropriate response
    }

    async login(req, res) {
        const { email, password } = req.body;
        const user = await userController.getUserByEmail(email);
        console.log('user', user);
        if (user == undefined || user == null) {
          return res.status(403).json({
            code: 403,
            message: "Invalid Credentials!"
          });
        }
        const isPasswordValid = await authService.comparePasswords(password, user.password);

        if (!user || !isPasswordValid) {
          return res.status(401).json({ 
            code: 401,
            message: 'Please provide email and password' 
          });
        } else {
          const accessToken = authService.generateAccessToken(user);
          const refreshToken = authService.generateRefreshToken(user);
          res.status(200).send({
            code: 200,
            message: "Login Successful!",
            data: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              roleId: user.roleId,
              status: user.status,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              deletedAt: user.deletedAt,
            },
            accessToken,
            refreshToken,
          });
        }
        
    }

    async refreshToken(req, res) {
      try {
        const accessToken = authService.generateAccessToken(req.user);
        const refreshToken = authService.generateRefreshToken(req.user);
        res.status(200).send({
          code: 200,
          message: "Refresh Token Successful!",
          accessToken,
          refreshToken,
        });
      } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
}

module.exports = new AuthController();
