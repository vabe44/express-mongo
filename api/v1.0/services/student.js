'use strict';

/*
 Student v1.0 Service
 */

module.exports = () => {

	const bcrypt = require('bcrypt');

	return {

		// Find all records
		findAll: async ( req, res, next ) => {
			const collection = req.app.locals.db.collection('students');
			return collection.find ( {} ).toArray ();
		},

		// Find a record
		findOne: async ( req, res, next ) => {
			const collection = req.app.locals.db.collection('students');
			const id = req.params.id;
			return collection.findOne ( { _id: id } );
		},

		// Create a new database entry
		create: async ( req, res, next ) => {
			const hashPwd = await bcrypt.hash(req.body.password, 10);
			const collection = req.app.locals.db.collection('students');

			// required fields
			let doc = {
				_id: req.body.username,
				password: hashPwd,
				name: req.body.name,
			};

			// optional fields
			if ( req.body.dob ) {
				doc.dob = new Date(req.body.dob)
			}
			if ( req.body.image ) {
				doc.image = req.body.image;
			}

			const student = await collection.insertOne(doc);
			const studentList = await collection.updateOne (
				{ _id: "studentList" },
				{ $addToSet: { entities: doc } },
				{
					upsert: true,
					bypassDocumentValidation: true,
				}
			);
			return student;

		},

		// Delete a database entry
		delete: async ( req, res, next ) => {
			const collection = req.app.locals.db.collection('students');
			const id = req.params.id;
			const student = await collection.deleteOne ( { _id: id } );
			const studentList = await collection.updateOne (
				{ _id: "studentList" },
				{ $pull: { entities: { _id: id } } },
				{
					bypassDocumentValidation: true,
				}
			);
			return student;
		},

		// Update a database entry
		update: async ( req, res, next ) => {
			const collection = req.app.locals.db.collection('students');
			const id = req.params.id;

			let fields = [ 'password',
						   'name',
						   'dob',
			               'image', ];

			let doc = {};

			// Partial update
			fields.forEach(field => {
				if ( req.body[ field ] ) {
					doc[ field ] = req.body[ field ];
				}
			})

			if (doc.password) {
				doc.password = await bcrypt.hash(req.body.password, 10);
			}

			if (doc.dob) {
				doc.dob = new Date(req.body.dob)
			}

			const student = await collection.findOneAndUpdate (
				{ _id: id },
				{ '$set': doc },
				{ returnOriginal: false }
			);
			const studentList = await collection.updateOne (
				{ _id: "studentList", "entities._id": id },
				{ "$set": { "entities.$": student.value } },
				{
					bypassDocumentValidation: true,
				}
			);
			return student;
		},

	};
};
