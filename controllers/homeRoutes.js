const router = require('express').Router();
// const { log } = require('console');  IS THIS BEING USED?
const { User, Event } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try {
        res.render('homepage')
    } catch (err) {
        res.status(500).json(err)
    }    
})

router.get('/events/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const events = await Event.find({ userId: userId });
    res.json(events);
  }
  catch (err) {
    console.error(err); res.status(500).json({ message: 'Server Error' });
  } });

// GET user profile by ID
router.get('/users/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Event,
          attributes: ['id','name','startDateTime','endDateTime'],
        },
      ],
    });

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    const users = userData.get({ plain: true });
    res.render('profile', {
      ...users,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET events for a specific user
router.get('/users/:userId/events', async (req, res) => {
  const userId = req.params.userId;
try {
  const events = await Event.findAll({ where: { userId: userId } });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // try {
  //   const client = await pool.connect();
  //   const eventsQuery = `
  //     SELECT * FROM events 
  //     WHERE user_id = $1
  //   `;
  //   const eventsResult = await client.query(eventsQuery, [userId]);
  //   client.release();

  //   const events = eventsResult.rows;
  //   res.json(events);
  // } catch (err) {
  //   console.error('Error fetching events:', err);
  //   res.status(500).json({ error: 'Error fetching events' });
  // }
});

// Use withAuth middleware to prevent access to route
// GET user profile page
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include:[{ model: Event }]
       
      });

      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = userData.get({ plain: true });
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// GET event deatils by ID
  router.get('/events/:id', async (req, res) => {
    try {
      const eventData = await Event.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });

      if (!eventData) {
        return res.status(404).json({ error: 'Event not found' });
      }
      const event = eventData.get({ plain: true });
      res.render('profile', {
        ...event,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// If the user is already logged in, it'll redirect them to the "/profile" page; otherwise, it renders a login form.
  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

module.exports = router;