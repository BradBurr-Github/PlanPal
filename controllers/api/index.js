const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const userRoutes = require('./userRoutes');
const eventRoutes   = require('./events');


// When a request is made to the /users or /projects path, it will be directed to the index.js in the /users or /projects folder.
router.use('/users', userRoutes);
router.use('/events', eventRoutes);

module.exports = router;

//testing ignore
console.log('ignore')