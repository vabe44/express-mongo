'use strict';

/*
 Student v1.0 module controllers
 */

module.exports = () => {

	const Exceptions = require ( '../services/exceptions' );
	const StudentService = require ( '../services/student' ) ();

	const handleReject = ( e, reject ) => {
		if ( e instanceof Exceptions.ServiceResponseException ) {
			return reject ( e );
		} else {
			return reject ( new Exceptions.ServiceResponseException ( 500, e.toString () ) );
		}
	};

	return {

		// Get all
		findAll: async ( req, res, next ) => {
			try {
				const results = await StudentService.findAll ( req, res, next );
				return res.status ( 200 ).json ( results );
			 }
			 catch (e) {
				handleReject ( e, next );
			 }
		},

		// Get one by ID
		findById: async ( req, res, next ) => {
			try {
				const result = await StudentService.findOne ( req, res, next );
				if ( result ) {
					return res.status ( 200 ).json ( result );
				} else {
					throw (new Exceptions.ServiceResponseException ( 404, 'Not Found' ));
				}
			 }
			 catch (e) {
				handleReject ( e, next );
			 }
		},

		// Create new record
		addOne: async ( req, res, next ) => {
			try {
				const result = await StudentService.create ( req, res, next );
				delete result.connection;
				return res.status ( 201 ).json ( result );
			 }
			 catch (e) {
				handleReject ( e, next );
			 }
		},

		// Update a record
		updateOne: async ( req, res, next ) => {
			try {
				const result = await StudentService.update ( req, res, next );
				if ( result ) {
					return res.status ( 200 ).json ( result );
				} else {
					throw (new Exceptions.ServiceResponseException ( 404, 'Not Found' ));
				}
			 }
			 catch (e) {
				handleReject ( e, next );
			 }
		},

		// Delete a record
		deleteOne: async ( req, res, next ) => {
			try {
				const result = await StudentService.delete ( req, res, next );
				if ( result ) {
					delete result.connection;
					return res.status ( 200 ).json ( result );
				} else {
					throw (new Exceptions.ServiceResponseException ( 404, 'Not Found' ));
				}
			 }
			 catch (e) {
				handleReject ( e, next );
			 }
		},

	};

};
