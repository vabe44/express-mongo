/*
 v1.0 Filter Middleware
 */

const Exceptions = require ( '../services/exceptions' );

// Convenience checks

module.exports = () => {

	const filter = {

		validationFailed: ( errors ) => {
			return new Exceptions.ServiceResponseException (
				422,
				'Validation Errors',
				errors.map(error => {
					return {
						message: error.message,
						fields : [ error.path ],
						values : [ error.value ]
					}
				})
			);
		}

	};

	return filter;

};