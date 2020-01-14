require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Database
const MongoClient = require('mongodb').MongoClient;
let dbClient;

const mongoOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	reconnectInterval: process.env.MONGO_RECONNECTINTERVAL, // wait for 10 seconds before retry
	reconnectTries: process.env.MONGO_RECONNECTTRIES, // retry forever
	poolSize: process.env.MONGO_POOLSIZE,
}

// Initialize connection once
MongoClient.connect(process.env.MONGO_URI, mongoOptions)
	.then(client => {
		dbClient = client;
		const db = client.db(process.env.MONGO_DB_NAME);
		app.locals.db = db;

		db.createCollection("students", { validator: { $jsonSchema: studentSchema } });

		app.listen(process.env.API_PORT, () => console.info(`REST API running on port ${process.env.API_PORT}`));
	}).catch(error => console.error(error));

// ROUTES
const studentsRouter = require ( `./api/${process.env.API_VERSION}/routes/student` );
const authRouter = require ( `./api/${process.env.API_VERSION}/routes/auth` );

// SCHEMAS
const studentSchema = require ( `./api/${process.env.API_VERSION}/schemas/student` );

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', authRouter);
app.use('/students', studentsRouter);

// Application error handler
const errorHandler = require ( `./api/${process.env.API_VERSION}/middlewares/error` );
app.use ( errorHandler.app );

// Catch unhandled errors
app.use ( errorHandler.unhandled );

// listen for the signal interruption (ctrl-c)
process.on('SIGINT', () => {
	dbClient.close();
	process.exit();
});

module.exports = app;
