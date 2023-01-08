const jwt = require("jsonwebtoken");

function signJwt(user_id) {
  const token = jwt.sign({ sub: user_id }, process.env.SECRET);
  if (!token) return false;
  return token;
}

function verifyJwt(req, res, next) {
  const authorization = req.header("authorization");
  const token = authorization ? authorization.split("Bearer ")[1] : undefined;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    console.log(req.user)
  } catch {
    return res.status(401).send("Invalid token");
  }

  return next();
}

module.exports = { signJwt, verifyJwt };
