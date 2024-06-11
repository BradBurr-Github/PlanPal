// TODO: add create and read routes -- test in insomnia

const router = require('express').Router();
// Import the User model from the models folder
const { User } = require('../../models');

// If a POST request is made to /api/users, a new user is created. The user id and logged in state is saved to the session within the request object.
router.post('/', async (req, res) => {

// todo user.create which is similar to "INSERT INTO" in plain SQL { objet } object is what we want to pass along then newUser send as json object  

// todo router.post () user.bulkCreate for seeding database 

    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
 catch (err) {
    res.status(400).json(err);
  }
});

// If a POST request is made to /api/users/login, the function checks to see if the user information matches the information in the database and logs the user in. If correct, the user ID and logged-in state are saved to the session within the request object.
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// If a POST request is made to /api/users/logout, the function checks the logged_in state in the request.session object and destroys that session if logged_in is true.
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// todo router.get (/:id)
// todo router.get (/first_name)

// todo update

// Updates book based on its isbn
router.put('/:isbn', (req, res) => {
    // Calls the update method on the Book model
    User.update(
      {
        // All the fields you can update and the data attached to the request body.
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
      },
      {
        // Gets the user based on the isbn given in the request parameters
        where: {
          
        },
      }
    )
      .then((updateUser) => {
        // Sends the updated user as a json response
        res.json(updateUser);
      })
      .catch((err) => res.json(err));
  });

module.exports = router;
