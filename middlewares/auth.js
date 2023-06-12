const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "papertech", (err, decoded) => {
      if (decoded) {
        req.body.user = decoded.userID;
        next();
      } else {
        res.send("login first");
      }
    });
  } else {
    res.send("login first");
  }
};


module.exports={
    authMiddleware
}