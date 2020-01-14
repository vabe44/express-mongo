/*
 v1.0 Filter Middleware
 */

module.exports = () => {

	// Shared filters
	const base = require ( './_base' ) ();
	const Ex = require ( '../services/exceptions' );

	const filter = {

		login: ( req, res, next ) => {

			if ( !req.body.username ) {
				return next ( new Ex.ServiceResponseException ( 400, 'Username is missing' ) );
			}

			if ( !req.body.password ) {
				return next ( new Ex.ServiceResponseException ( 400, 'Password is missing' ) );
			}

			next ();

		},

	};

	return filter;

};