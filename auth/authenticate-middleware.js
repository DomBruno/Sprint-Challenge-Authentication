const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (req.decodedJwt) {
    next();
  } else if (token) {
    jwt.verify(token, "wookieshavebadbreath", (err, decodedJwt) => {
      if (err) {
    res.status(401).json({ message: 'Please Login for Access!' });
    } else {
    req.decodedJwt = decodedJwt;
    next();
            }
    })
  } else {
    res.status(401).json({err, location:"auth middleware catchall"});
  }
};
