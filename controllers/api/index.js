const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const userRoutes = require('./userRoutes');
const eventRoutes   = require('./events');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);

module.exports = router;

//testing ignore
console.log('ignore')