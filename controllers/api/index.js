const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const eventUserRoutes = require('./eventUserRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/events-users', eventUserRoutes);

module.exports = router;
