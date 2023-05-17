const jwt = require("jsonwebtoken");
const User = require("../structure/user");

async function auth(req, res, next) {
  let token = req.header("x-auth-token");
  console.log(token);
  if (!token) {
    return res.status(400).send("Token Not Provided");
  }
  try {
    let user = jwt.verify(token, "PrivateKey");
    console.log(user);
    req.user = await User.findById(user._id);
    if (!req.user) {
      return res.status(401).send("Invalid token");
    }
    console.log(req.user);
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid token");
  }
  next();
}

module.exports = auth;
