/*
 Custom exceptions and errors
 */

const ServiceResponseException = function ( status_code, message, errors ) {
	Error.captureStackTrace ( this, this.constructor );
	this.name = this.constructor.name;
	this.message = message;
	this.code = status_code;
	if ( errors && Array.isArray ( errors ) ) {
		this.errors = errors;
	}
};

require ( 'util' ).inherits ( ServiceResponseException, Error );

// Export the interface
module.exports = {

	// For all errors reported by services
	ServiceResponseException: ServiceResponseException

};
