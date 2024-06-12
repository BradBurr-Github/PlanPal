const router = require('express').Router();
const { log } = require('console');
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) => {
    try {
        res.render('homepage')


    } catch (err) {
        res.status(500).json(err)
    }

    
})

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {                  // get request to /profile  authenticate before accessing
    try {
      console.log('-------------------------HELLO--------------------------------------');
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {       // find user by primary key
        attributes: { exclude: ['password'] },                              // exclude password in query
       
      });
  
      const user = userData.get({ plain: true });                   // convert the Sequelize model instance to a plain JavaScript object    returns just the raw data.
      console.log(user)
      const testData = JSON.stringify({name:"something"})
      res.render('profile', {

        // testObj: encodeURIComponent(JSON.stringify({name:"test"})),
        testData,
        ...user,                                // spreads all the properties of the user object (which contains the user data fetched from the database) into the object being passed to the view
        logged_in: true             // based on whether the user is logged in or not it'll render the /profile
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