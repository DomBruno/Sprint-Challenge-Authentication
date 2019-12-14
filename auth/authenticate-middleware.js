const jwt = require("jsonwebtoken");
const secrets = require("./config/secrets.js");


module.exports = function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (req.decodedJwt) {
    // if we have a token already decoded
    next();
  } else if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
      //pass the current token and the secret to check the signature
      if (err) {
        // if an error occurs
        res.status(401).json({ message: "Failed to verify authorization" });
      } else {
        req.decodedJwt = decodedJwt; // set to speed up future auth
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Failed to verify authorization" }); // overall failure
  }
}