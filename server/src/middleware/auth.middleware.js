import {validateToken} from './JWT'
exports.isAuth = async (req, res, next) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('access token is not found !');
	}

    const accessToken = accessTokenFromHeader.split(' ')[1];
	const verified = validateToken(accessToken);
	if (!verified) {
		return res.status(401).send('access token is expired!');
	}
	return next();
};