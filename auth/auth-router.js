const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("./config/secrets");
const Users = require("./userModel");

router.post('/register', (req, res) => {
  
  let  password  = req.body.password;
  const hash = bcrypt.hashSync(password, 10);
  password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
  
  router.post("/login", (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = genToken(user);
  
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token: token
          });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  function genToken(user) {
    const payload = {
      userId: user.id,
      username: user.username,
             };
  
  
  const options = {
  expiresIn: "1d"
  };
  
  const token = jwt.sign(payload, secrets.jwtSecret, options);
    return token;
  }
  
  module.exports = router;