'use strict';

/*
 Auth v1.0 Service
 */

module.exports = () => {

	const bcrypt = require('bcrypt');
	const jwt = require('jsonwebtoken');
	const Exceptions = require ( '../services/exceptions' );

	return {

		// Create a new database entry
		login: async ( req, res, next ) => {
			const collection = req.app.locals.db.collection('students');
			const result = await collection.findOne ( { _id: req.body.username } );

			if (!result) {
				return new Exceptions.ServiceResponseException ( 401, 'Invalid username' )
			}

			const match = await bcrypt.compare(req.body.password, result.password);
			if ( match ) {
				const token = jwt.sign( result, process.env.JWT_SECRET, { expiresIn: '24h' } );
				return token;
			} else {
				return new Exceptions.ServiceResponseException ( 401, 'Invalid password' )
			}
		},

	};
};
