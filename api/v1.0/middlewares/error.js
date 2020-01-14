/*
 Middle ware to handle application errors
 */

const Exceptions = require ( '../services/exceptions' );

const _sendResponse = ( req, res, status, message ) => {
	if ( req.accepts ( 'json' ) ) {
		let body = message === Object(message) ? message : {
				code   : status || 500,
				message: message
			};
		return res.status ( status || 500 ).json ( body );
	} else {
		req.flash ( 'error', message );
		return res.status ( status || 500 ).send ( message );
	}
};

const Errors = {

	// Main exception handler
	app: ( err, req, res, next ) => {
		if ( err ) {

			if ( err instanceof Exceptions.ServiceResponseException ) {

				if ( process.env.ENVIRONMENT === 'development' && err.code >= 500 ) {
					console.error( 'error', (err.code || 500) + ':' + err.message, err.stack );
				}
				_sendResponse ( req, res, err.code || 500, err );

			} else if ( err === Object(err) ) {

				if ( process.env.ENVIRONMENT === 'development' && err.code >= 500 ) {
					console.error( 'error', (err.status || 500) + ':' + err.message, err.stack );
				}
				_sendResponse ( req, res, err.code || 500, err.message );

			} else {

				console.error( 'error', '500:' + err );
				_sendResponse ( req, res, 500, err );

			}

		} else {
			next ();
		}
	},

	// Unhandled exceptions
	unhandled: ( err, req, res, next ) => {

		// If headers are already sent, default to nodes default handler
		if ( res.headersSent ) {
			return next ( err );
		}

		// Otherwise send a server exception
		_sendResponse ( req, res, 500, err.message || err );

	}

};

module.exports = Errors;