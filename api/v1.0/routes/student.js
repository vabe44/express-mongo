const express = require('express');
const router = express.Router();
const controller = require ( '../controllers/student' ) ();
const middleware = require('../middlewares/auth');
const filter = require ( '../filters/student' ) ();

/* GET students listing. */
router.get('/',
    middleware.checkToken,
    controller.findAll
);

// Add a new student entry
router.post ( '/',
    middleware.checkToken,
    filter.addOne,
    controller.addOne
);

// Get one student entry
router.get ( '/:id',
    middleware.checkToken,
    filter.findById,
    controller.findById
);

// Delete one student entry
router.delete ( '/:id',
    middleware.checkToken,
    filter.deleteOne,
    controller.deleteOne
);

// Update one student entry
router.put ( '/:id',
    middleware.checkToken,
    filter.updateOne,
    controller.updateOne
);

module.exports = router;
