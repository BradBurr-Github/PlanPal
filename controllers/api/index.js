const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const eventUserRoutes = require('./eventUserRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/events-users', eventUserRoutes);

module.exports = router;

//testing ignore
console.log('ignore')