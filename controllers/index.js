// Import just the router express
const router = require('express').Router();

// Import the index.js from 'api' folder
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/users', userRoutes);

module.exports = router;
