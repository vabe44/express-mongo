'use strict';

/*
 Student v1.0 Schema
 */

module.exports = {

	bsonType: "object",
	required: [ "password", "name" ],
	properties: {
		password: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		name: {
		  bsonType: "string",
		  description: "must be a string and is required"
	   },
		dob: {
			bsonType: "date",
			description: "must be a date and is required"
		},
		image: {
			bsonType: "string",
			description: "must be a string"
		},
	}

};
