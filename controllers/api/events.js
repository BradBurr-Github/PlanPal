const router = require('express').Router();
const User = require('../../models/users');
const Event = require('../../models/events');

//Route to get loggedIn users events
router.get('/', async (req, res) => {
  console.log("howdy")
  //get current user from req.session.id include the events
  //return just events stringified as JSON
})

// GET events for a specific user
router.get('/users/:userId/events', async (req, res) => {
  const userId = req.params.userId;

  try {
    const client = await pool.connect();
    const eventsQuery = `
      SELECT * FROM events 
      WHERE user_id = $1
    `;
    const eventsResult = await client.query(eventsQuery, [userId]);
    client.release();

    const events = eventsResult.rows;
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Error fetching events' });
  }
  console.log('------------ HELLO ----------------')
});

module.exports = router;