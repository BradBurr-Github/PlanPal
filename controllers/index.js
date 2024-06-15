// Import just the router express
const router = require('express').Router();

// Import the index.js from 'api' folder
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/userRoutes');
const eventRoutes = require('./api/eventRoutes');
const eventUserRoutes = require('./api/eventUserRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/events-users', eventUserRoutes);

module.exports = router;
