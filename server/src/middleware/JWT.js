const { sign, verify } = require("jsonwebtoken");
import 'dotenv/config';
const createTokens = (user) => {
  const payload = { username: user.user_name, id: user.id_user };
  const key = process.env.JWT_SECRET;

  const accessToken = sign(payload, key);
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });
  
  try {
    const key = process.env.JWT_SECRET;
    const validToken = verify(accessToken, key);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };