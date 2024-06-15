const router = require('express').Router();
const User = require('../../models/users');
const Event = require('../../models/events');
const EventUser = require('../../models/events-users.js');

//Route to get ALL events
router.get('/', async (req, res) => {
  try {
    // Get all Event-User records
    const eventUserData = await EventUser.findAll({
    });

    res.status(200).json(eventUserData);
  } catch (err) {
    res.status(500).json(err);
  }
  //get current user from req.session.id include the events
  //return just events stringified as JSON
})

//Route to get loggedIn users events
router.get('/:id', async (req, res) => {
  try {
    
    const eventData = await Event.findByPk(req.params.id);
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
  //get current user from req.session.id include the events
  //return just events stringified as JSON
})

router.post('/', async (req, res) => {            // post request 
  try {
    const newEvent = await Event.create({...req.body,event_id:req.session.event_id});
    res.status(200).json(newEvent);
  //});
  } catch (err) {
  console.log(err)
  res.status(400).json(err);                  // error handling
  }
});

module.exports = router;