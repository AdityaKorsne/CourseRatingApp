const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization, process.env.SECRET, (err, data) => {
      if (err) {
        req.user = null;
        req.message = "Invalid accessToken";
        next();
      } else {
        req.user = { id: data.id, role: data.role };
        req.message = "user found successfully";
        next();
      }
    });
  } else {
    req.user = null;
    req.message = "Authorization header not found";
    next();
  }
}

module.exports = verifyToken;
