const router = require('express').Router();
const Users = require('./config/userHelper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./config/secrets.js');

router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
