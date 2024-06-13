const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User } = require('../../models');

router.get('/', async (req, res) => {    
  try {
    // Get all users and JOIN with user data
    const userData = await User.findAll({
    });

    // Serialize data so the template can read it
    //const projects = projectData.map((project) => project.get({ plain: true }));

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// create new user record and save session data for newly created user
router.post('/', async (req, res) => {            // post request 
      // console.log(req.body)
  try {

    const userData = await User.create(req.body);   // creating userData variable using model user and user inputs using req.body
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(userData.id);
    req.session.save(() => {                        // save session data
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);                  // error handling
  }
});

// check that the info provided to login is valid(authenticates) and save session data
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });      // query the database to find a user with the email provided in the request body using the findOne() method 

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });      // if no user found, message will notify user
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);        // checks to see if the password provided in the request body matches the hashed password stored in the database for the found user.

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });        // if invalid password, message will notify user
      return;
    }

    req.session.save(() => {                                                      // save session data from this request
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {                                       // removes all session data, logging the user out.
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
