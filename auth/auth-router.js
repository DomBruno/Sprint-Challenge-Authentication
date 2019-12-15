const router = require('express').Router();
const Users = require('../config/userHelper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 6);
  credentials.password = hash;

  Users.add(credentials)
    .then(saved => {
    // const token = genToken(saved);
      // return the user object, and the token.
      res.status(201).json({ created_user: saved});
    })
    .catch(error => {
      res.status(500).json(error, {location: "register endpoint"});
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.findBy({ username })
    .then(user => {
      if (user && bcjs.compareSync(password, user.password)) {
        let token = generateToken(user);
        res
          .status(200)
          .json({
            message: `Welcome ${username}! Have a token: `,
            token: token
          });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error logging in" });
    });
});

function genToken(user) {
    const payload = {
      userid: user.id,
      username: user.username};

      const options = { expiresIn: '1h' };
      const token = jwt.sign(payload, "wookieshavebadbreath", options);

      return token;
    }

module.exports = router;
