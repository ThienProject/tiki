const { sign, verify } = require("jsonwebtoken");
import 'dotenv/config';
const createTokens = (user) => {
  const payload = { username: user.user_name, id: user.id_user };
  const key = process.env.JWT_SECRET;
 
  const accessToken = sign(payload, key, {expiresIn : 120});
  return accessToken;
};

const validateToken = (accessToken) => {
  const key = process.env.JWT_SECRET;
    const validToken = verify(accessToken, key);
    return validToken
};

module.exports = { createTokens, validateToken };