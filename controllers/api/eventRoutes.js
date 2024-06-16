const router = require('express').Router();
const User = require('../../models/users');
const Event = require('../../models/events');
//const Event = require('../../models/event-users');

//Route to get ALL events
router.get('/', async (req, res) => {
  try {
    // Get all users and JOIN with user data
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
})

//Route to get loggedIn users events
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  try {

    // if (!req.body.name || !req.body.desc || !req.body.startDateTime || !req.body.endDateTime){
    //   return res.status(400).json({ error: 'Missing required fields eventRoutes Line 31' });
    // }
    const newEvent = await Event.create(req.body)
      req.session.save({
      ...req.body,
      event_id: req.session.event_id
    });
    res.status(200).json(newEvent);
    console.log(newEvent);
  } catch (err) {
  console.log(err)
  res.status(400).json(err);
  }
});

module.exports = router;