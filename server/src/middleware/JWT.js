const { sign, verify } = require("jsonwebtoken");
import freeze from "../configs/freeze";


const createTokens = (payload = {}, refresh = false) => {
  // const payload = { username: user.fullname, id: user.id_user };
  let key = freeze.JWT_SECRET;
  let life = freeze.tokenLife;
  if(refresh){
      key = freeze.SECRET_REFRESH; 
      life = freeze.refreshTokenLife;
  }
  const accessToken = sign(payload, key, {expiresIn : life});
  return accessToken;
};

const validateToken = (accessToken) => {
    const key = freeze.JWT_SECRET;
    try {
      const validToken = verify(accessToken, key);
      return validToken
    } catch (error) {
        return false;
    }  
};

const validateRefreshToken = (refreshToken) => {
  const key = freeze.SECRET_REFRESH;
  const validToken = verify(refreshToken, key);
  return validToken
}
module.exports = { createTokens, validateToken,validateRefreshToken };