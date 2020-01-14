const express = require('express');
const router = express.Router();
const controller = require ( '../controllers/auth' ) ();
const authfilter = require ( '../filters/auth' ) ();
const studentfilter = require ( '../filters/student' ) ();

// Register route
router.post ( '/register',
    studentfilter.addOne,
    controller.register
);

// Login route
router.post ( '/login',
    authfilter.login,
    controller.login
);

module.exports = router;
