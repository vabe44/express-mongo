'use strict';

/*
 Auth v1.0 module controllers
 */

module.exports = () => {

	const Exceptions = require ( '../services/exceptions' );
	const AuthService = require ( '../services/auth' ) ();
	const StudentService = require ( '../services/student' ) ();

	const handleReject = ( e, reject ) => {
		if ( e instanceof Exceptions.ServiceResponseException ) {
			return reject ( e );
		} else {
			return reject ( new Exceptions.ServiceResponseException ( 500, e.toString () ) );
		}
	};

	return {

		// Create new record
		register: async ( req, res, next ) => {
			try {
				const result = await StudentService.create ( req, res, next );
				delete result.connection;
				return res.status ( 201 ).json ( result );
			 }
			 catch (e) {
				handleReject ( e, next );
			 }
		},

		// Create new record
		login: async ( req, res, next ) => {
			try {
				// throw 'myException'; // generates an exception
				const result = await AuthService.login ( req, res, next );
				return res.status ( 200 ).json ( result );
			 }
			 catch (e) {
				handleReject ( e, next );
			 }
		},

	};
 
};
