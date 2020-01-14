const jwt = require('jsonwebtoken');
const Exceptions = require ( '../services/exceptions' );

let checkToken = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization'];

	if (!token) {
		return res
			.status ( 401 )
			.set ( 'WWW-Authenticate', 'JWT' )
			.json ( new Exceptions.ServiceResponseException ( 401, 'Unauthenticated' ) );
	}
	if (token.startsWith('Bearer ')) {
		// Remove Bearer from string
		token = token.slice(7, token.length);
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res
				.status ( 401 )
				.set ( 'WWW-Authenticate', 'JWT' )
				.json ( new Exceptions.ServiceResponseException ( 401, 'Unauthorized' ) );
		} else {
			req.decoded = decoded;
			next();
		}
	});
};

module.exports = {
	checkToken: checkToken
};
