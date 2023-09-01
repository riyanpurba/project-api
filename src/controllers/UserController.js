// src/controllers/UserController.js
const connection = require('../config/connection');
const User = require('../models/User');
const authService = require('../services/AuthService');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const result = await connection.query('SELECT * FROM tbl_users');
      const users = result.rows.map(row => new User(row.id, row.first_name, row.last_name, row.email, row.role_id, row.status, row.created_at, row.updated_at, row.deleted_at));
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  static async getUserById(req, res) {
    try {
      const result = await connection.query('SELECT * FROM tbl_users WHERE id = $1', [req.params.id]);
      const user = result.rows.map(row => new User(row.id, row.first_name, row.last_name, row.email, row.password, row.role_id, row.status, row.created_at, row.updated_at, row.deleted_at));
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createUser(req, res) {
    try {
      const hashedPassword = await authService.hashPassword(req.body.password);
      const result = await connection.query('INSERT INTO tbl_users (first_name, last_name, email, password, role_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [req.body.firstName, req.body.lastName, req.body.email, hashedPassword, req.body.roleId, req.body.status]);
      const user = result.rows.map(row => new User(row.id, row.first_name, row.last_name, row.email, row.password, row.role_id, row.status, row.created_at, row.updated_at, row.deleted_at));
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateUser(req, res) {
    try {
      const result = await connection.query('UPDATE tbl_users SET first_name = $1, last_name = $2, email = $3, role_id = $4, status = $5 WHERE id = $6 RETURNING *', [req.body.firstName, req.body.lastName, req.body.email, req.body.roleId, req.body.status, req.params.id]);
      const user = result.rows.map(row => new User(row.id, row.first_name, row.last_name, row.email, row.password, row.role_id, row.status, row.created_at, row.updated_at, row.deleted_at));
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteUser(req, res) {
      try {
        const result = await connection.query('DELETE FROM tbl_users WHERE id = $1 RETURNING *', [req.params.id]);
        const user = result.rows.map(row => new User(row.id, row.first_name, row.last_name, row.email, row.password, row.role_id, row.status, row.created_at, row.updated_at, row.deleted_at));
        res.status(200).json(user);
      } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  }

  static async getUserByEmail(email) {
    try {
      const result = await connection.query('SELECT * FROM tbl_users WHERE email = $1', [email]);
      const user = result.rows.map(row => new User(row.id, row.first_name, row.last_name, row.email, row.password, row.role_id, row.status, row.created_at, row.updated_at, row.deleted_at));
      return user[0];
    } catch (error) {
      console.error('Error fetching items:', error);
      return null;
    }
  }
}

module.exports = UserController;
