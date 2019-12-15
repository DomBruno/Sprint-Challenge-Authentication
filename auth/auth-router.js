const router = require('express').Router();
const Users = require('../config/userHelper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  // assign req.body to var credentials
  const credentials = req.body;

  // generate password hash
  const hash = bcrypt.hashSync(credentials.password, 6);
  credentials.password = hash;

  // add user and give them token
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
  // destructure values from req.body
  const { username, password } = req.body;
  // find user in db
  db.findBy({ username })
    .then(user => {
      // ompare passwords
      if (user && bcjs.compareSync(password, user.password)) {
      // make token if legit
        let token = generateToken(user);
        res
          .status(200)
          .json({
            message: `Welcome ${username}! Have a token: `,
            token: token
          });
      } else {
        // return 401 if invalid
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error logging in at login endpoint" });
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
