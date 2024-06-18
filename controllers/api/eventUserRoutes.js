const router = require('express').Router();
const Event = require('../../models/events');
const EventUser = require('../../models/events-users.js');

//Route to get ALL events
router.get('/', async (req, res) => {
  try {
    // Get all Event-User records
    const eventUserData = await EventUser.findAll();
    res.status(200).json(eventUserData);
  } catch (err) {
    res.status(500).json(err);
  }
})

//Route to get loggedIn users events
router.get('/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id);
    if (!eventData) {
    res.status(200).json(eventData);
    }
  } catch (err) {
    console.error(`Error fetching event with ID ${req.params.id}:`, err)
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      event_id: req.session.event_id});
  } catch (err) {
    console.error('Error creating new event:', err);  
    res.status(400).json({ error: 'Failed to create new event' });
  }
});

module.exports = router;