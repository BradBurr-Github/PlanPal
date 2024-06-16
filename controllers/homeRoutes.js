const router = require('express').Router();
const { log } = require('console');
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

    const users = userData.get({ plain: true });
    console.log(users)
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

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {                  // get request to /profile  authenticate before accessing
    try {
      console.log('-------------------------HELLO--------------------------------------');
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {       // find user by primary key
        attributes: { exclude: ['password'] },                              // exclude password in query
        include:[{model:Event}]
       
      });
  
      const user = userData.get({ plain: true });                   // convert the Sequelize model instance to a plain JavaScript object    returns just the raw data.
      console.log(user)
      res.render('profile', {
        ...user,                                // spreads all the properties of the user object (which contains the user data fetched from the database) into the object being passed to the view
        logged_in: true             // based on whether the user is logged in or not it'll render the /profile
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/events/:id', async (req, res) => {
    try {
      const eventsData = await Event.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      const events = eventsData.get({ plain: true });
      res.render('profile', {
        ...events,
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