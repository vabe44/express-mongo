/*
 v1.0 Filter Middleware
 */

module.exports = () => {

	// Shared filters
	const base = require ( './_base' ) ();
	const Ex = require ( '../services/exceptions' );

	const filter = {

		addOne: ( req, res, next ) => {

			if ( !req.body.username ) {
				return next ( new Ex.ServiceResponseException ( 400, 'Username is missing' ) );
			}

			if ( !req.body.password ) {
				return next ( new Ex.ServiceResponseException ( 400, 'Password is missing' ) );
			}

			if ( !req.body.name ) {
				return next ( new Ex.ServiceResponseException ( 400, 'Name is missing' ) );
			}

			if ( req.body.dob ) {
				let dob = new Date(req.body.dob);
				if ( !(dob instanceof Date && isFinite(dob)) ) {
					return next ( base.validationFailed ( [ {
						message: 'Date of birth has to be a date',
						path   : 'dob',
						value  : req.body.dob
					} ] ) );
				}
			}

			next ();

		},

		findById: ( req, res, next ) => {

			if ( !req.params.id ) {
				return next ( new Ex.ServiceResponseException ( 400, 'ID is missing' ) );
			}

			next ();

		},

		deleteOne: ( req, res, next ) => filter.findById ( req, res, next ),

		updateOne: ( req, res, next ) => {

			if ( req.body.dob ) {
				let dob = new Date(req.body.dob);
				if ( !(dob instanceof Date && isFinite(dob)) ) {
					return next ( base.validationFailed ( [ {
						message: 'Date of birth has to be a date',
						path   : 'dob',
						value  : req.body.dob
					} ] ) );
				}
			}

			next ();

		},

	};

	return filter;

};