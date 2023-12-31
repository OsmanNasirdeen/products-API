const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .json({ msg: "A token is required for authentication", auth: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ msg: "Invalid Token", auth: false });
  }
  return next();
};

module.exports = verifyToken;
